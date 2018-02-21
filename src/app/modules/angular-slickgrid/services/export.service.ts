import { Injectable } from '@angular/core';
import {
  CellArgs,
  CustomGridMenu,
  Column,
  DelimiterType,
  ExportOption,
  FileType,
  Formatter,
  GraphqlResult,
  GridMenu,
  GridOption,
  HeaderButtonOnCommandArgs,
  HeaderMenuOnCommandArgs,
  HeaderMenuOnBeforeMenuShowArgs
} from './../models';
import $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { addWhiteSpaces, htmlEntityDecode } from './../services/utilities';
import { TextEncoder } from 'text-encoding';

// using external js modules in Angular
declare let Slick: any;
declare let $: any;

export interface ExportColumnHeader {
  key: string;
  title: string;
}

@Injectable()
export class ExportService {
  private _lineCarriageReturn = '\n';
  private _dataView: any;
  private _grid: any;
  private _exportQuoteWrapper: string;
  private _existingSlickAggregators: string[] = [];
  private _columnHeaders: ExportColumnHeader[];
  private _groupedHeaders: ExportColumnHeader[];
  private _gridOptions: GridOption;
  private _groupingDefinition: any;
  private _hasGroupedItems = false;
  private _exportOptions: ExportOption;
  defaultExportOptions: ExportOption = {
    delimiter: DelimiterType.comma,
    filename: 'export',
    format: FileType.csv,
    useUtf8WithBom: true
  };

  constructor(private translate: TranslateService) { }

  /**
   * Initialize the Export Service
   * @param grid
   * @param gridOptions
   * @param dataView
   */
  init(grid: any, gridOptions: GridOption, dataView: any): void {
    this._grid = grid;
    this._gridOptions = gridOptions;
    this._dataView = dataView;
  }

  /**
   * Function to export the Grid result to an Excel CSV format using javascript for it to produce the CSV file.
   * This is a WYSIWYG export to file output (What You See is What You Get)
   *
   * NOTES: The column position needs to match perfectly the JSON Object position because of the way we are pulling the data,
   * which means that if any column(s) got moved in the UI, it has to be reflected in the JSON array output as well
   *
   * Example: exportToFile({ format: FileType.csv, delimiter: DelimiterType.comma })
   */
  exportToFile(options: ExportOption) {
    this._exportOptions = $.extend(true, {}, this.defaultExportOptions, options);

    // get the CSV output from the grid data
    const dataOutput = this.getDataOutput();

    // trigger a download file
    this.startDownloadFile({
      filename: `${this._exportOptions.filename}.${this._exportOptions.format}`,
      csvContent: dataOutput,
      format: this._exportOptions.format,
      useUtf8WithBom: this._exportOptions.useUtf8WithBom
    });
  }

  // -----------------------
  // Private functions
  // -----------------------

  getDataOutput(): string {
    const columns = this._grid.getColumns() || [];
    const delimiter = this._exportOptions.delimiter || '';
    const format = this._exportOptions.format || '';

    // find all the Aggregators that exist inside SlickGrid
    this._existingSlickAggregators = this.getAllSlickGridAggregators() || [];

    // a CSV needs double quotes wrapper, the other types do not need any wrapper
    this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';

    // data variable which will hold all the fields data of a row
    let outputDataString = '';

    // get grouped column titles and if found, we will add a "Group by" column at the first column index
    this._groupedHeaders = this.getGroupedColumnTitles(columns) || [];
    if (this._groupedHeaders && Array.isArray(this._groupedHeaders)) {
      this._hasGroupedItems = (this._groupedHeaders.length > 0);
      outputDataString += this._groupedHeaders
        .map((header) => `${this.translate.instant('GROUP_BY')} [${header.title}]`)
        .join(delimiter);
    }

    // get all column headers
    this._columnHeaders = this.getColumnHeaders(columns) || [];
    if (this._columnHeaders && Array.isArray(this._columnHeaders)) {
      // add the header row + add a new line at the end of the row
      const outputHeaderTitles = this._columnHeaders
        .map((header) => this._exportQuoteWrapper + header.title + this._exportQuoteWrapper);
      outputDataString += (outputHeaderTitles.join(delimiter) + this._lineCarriageReturn);
    }

    // Populate the rest of the Grid Data
    outputDataString += this.getAllGridRowData(columns, this._lineCarriageReturn);

    return outputDataString;
  }

  /**
   * Get all the grid row data and return that as an output string
   */
  getAllGridRowData(columns: Column[], lineCarriageReturn: string): string {
    let outputDataString = '';
    const lineCount = this._dataView.getLength();

    // loop through all the grid rows of data
    for (let rowNumber = 0; rowNumber < lineCount; rowNumber++) {
      const itemObj = this._dataView.getItem(rowNumber);

      if (itemObj != null) {
        // Normal row (not grouped by anything) would have an ID which was predefined in the Grid Columns definition
        if (itemObj.id != null) {
          // get regular row item data
          outputDataString += this.readRegularRowData(columns, rowNumber, itemObj);
        } else if (this._hasGroupedItems && itemObj.__groupTotals === undefined) {
          // get the group row
          outputDataString += this.readGroupedTitleRow(itemObj);
        } else if (itemObj.__groupTotals) {
          // else if the row is a Group By and we have agreggators, then a property of '__groupTotals' would exist under that object
          outputDataString += this.readGroupedTotalRow(itemObj);
        }
        outputDataString += lineCarriageReturn;
      }
    }

    return outputDataString;
  }

  /**
   * Get all the Slick Aggregators that are defined in SlickGrid
   */
  getAllSlickGridAggregators(): string[] {
    let slickAggregatorCount = 0;
    const existingSlickAggregators = [];

    for (const key in Slick.Data.Aggregators) {
      if (Slick.Data.Aggregators.hasOwnProperty(key)) {
        slickAggregatorCount++;
        existingSlickAggregators.push(key.toLowerCase());
      }
    }

    return existingSlickAggregators;
  }

  /**
   * Get all header titles and their keys, translate the title when required.
   * @param columns of the grid
   */
  getColumnHeaders(columns: Column[]): ExportColumnHeader[] {
    if (!columns || !Array.isArray(columns) || columns.length === 0) {
      return null;
    }
    const columnHeaders = [];

    // Populate the Column Header, pull the name defined
    columns.forEach((columnDef) => {
      const fieldName = (columnDef.headerKey) ? this.translate.instant(columnDef.headerKey) : columnDef.name;
      const skippedField = columnDef.excludeFromExport || false;

      // if column width is 0 then it's not evaluated since that field is considered hidden should not be part of the export
      if ((columnDef.width ===  undefined || columnDef.width > 0) && !skippedField) {
        columnHeaders.push({
          key: columnDef.field || columnDef.id,
          title: fieldName
        });
      }
    });

    return columnHeaders;
  }

  /**
   * Get the data of a regular row (a row without grouping)
   * @param row
   * @param itemObj
   */
  readRegularRowData(columns: Column[], row: number, itemObj: any) {
    let idx = 0;
    let rowOutputString = '';
    const delimiter = this._exportOptions.delimiter;
    const format = this._exportOptions.format;
    const exportQuoteWrapper = this._exportQuoteWrapper || '';

    for (let col = 0, ln = columns.length; col < ln; col++) {
      const columnDef = columns[col];
      const fieldId = columnDef.field || columnDef.id || '';

      // skip excluded column
      if (columnDef.excludeFromExport) {
          continue;
      }

      // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
      if (this._hasGroupedItems && idx === 0) {
        rowOutputString += `""` + delimiter;
      }

      // does the user want to evaluate current column Formatter?
      const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._gridOptions.exportWithFormatter;

      // did the user provide a Custom Formatter for the export
      const exportCustomFormatter: Formatter = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;

      let itemData = '';

      if (exportCustomFormatter) {
        itemData = exportCustomFormatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
      } else if (isEvaluatingFormatter && !!columnDef.formatter) {
        itemData = columnDef.formatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
      } else {
        itemData = (itemObj[fieldId] === null || itemObj[fieldId] === undefined) ? '' : itemObj[fieldId];
      }

      // when CSV we also need to escape double quotes twice, so " becomes ""
      if (format === FileType.csv) {
        itemData = itemData.toString().replace(/"/gi, `""`);
      }

      // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
      // to cancel that effect we can had = in front, ex: ="1E06"
      const keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';

      rowOutputString += keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper + delimiter;
      idx++;
    }

    return rowOutputString;
  }

  /**
   * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
   * @param itemObj
   */
  readGroupedTitleRow(itemObj: any) {
    let groupName = itemObj.value;
    const exportQuoteWrapper = this._exportQuoteWrapper || '';
    const delimiter = this._exportOptions.delimiter;
    const format = this._exportOptions.format;

    groupName = addWhiteSpaces(5 * itemObj.level) + groupName;

    if (format === FileType.csv) {
      // when CSV we also need to escape double quotes twice, so " becomes ""
      groupName = groupName.toString().replace(/"/gi, `""`);
    }

    // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
    // to cancel that effect we can had = in front, ex: ="1E06"
    // const keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';

    return /*keepAsStringWrapper +*/ exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper + delimiter;
  }

  /**
   * Get the grouped totals, these are set by Slick Aggregators.
   * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
   * @param itemObj
   */
  readGroupedTotalRow(itemObj: any) {
    let exportExponentialWrapper = '';
    const delimiter = this._exportOptions.delimiter;
    const format = this._exportOptions.format;
    const exportQuoteWrapper = this._exportQuoteWrapper || '';
    const existingSlickAggregators = this._existingSlickAggregators || [];
    const columnCount = this._grid.getColumns().length;
    let output = `${exportQuoteWrapper}..${exportQuoteWrapper}${delimiter}`;

    for (let j = 0; j < columnCount; j++) {
      const fieldId = this._grid.getColumns()[j].id;
      let itemData = '';

      // cycle through all possible SlickGrid Aggregators and get their values
      for (let k = 0; k < existingSlickAggregators.length; k++) {
        if (itemObj[existingSlickAggregators[k]] !== undefined) {
          if (fieldId in itemObj[existingSlickAggregators[k]]) {
            const aggregatorName = existingSlickAggregators[k];
            const val = itemObj[existingSlickAggregators[k]][fieldId];
            if (aggregatorName.toLowerCase() === 'avg') {
              itemData = aggregatorName + ': ' + Math.round(val);
            } else if (aggregatorName.toLowerCase() === 'min' || aggregatorName.toLowerCase() === 'max' || aggregatorName.toLowerCase() === 'sum') {
              itemData = aggregatorName + ': ' + Math.round(parseFloat(val) * 1000000) / 1000000;
            } else {
              itemData = val;
            }
          }
        }
      }
      if (format === FileType.csv) {
        // when CSV we also need to escape double quotes twice, so a double quote " becomes 2x double quotes ""
        // and if we have a text of (number)E(number),
        // we don't want excel to transform it into exponential (1.0E06) to cancel that effect we can had = in front, ex: ="1E06"
        itemData = itemData.toString().replace(/"/gi, `""`);
        exportExponentialWrapper = (itemData.match(/^\s*\d+E\d+\s*$/i)) ? '=' : '';
      }
      output += exportQuoteWrapper + itemData + exportQuoteWrapper + delimiter;
    }

    return output;
  }

  /**
   * Get all grouped column titles, translate them when required.
   * For example if the grid is grouped by salesRep and then customerName, we will return their title, something like:: ['Sales Rep', 'Customer Name']
   * @param columns of the grid
   */
  getGroupedColumnTitles(columns: Column[]): ExportColumnHeader[] {
    if (!columns || !Array.isArray(columns) || columns.length === 0) {
      return null;
    }

    let groupItemId = '';
    const groupedHeaders = [];

    let hasGroupedItems = false;
    if ($.isEmptyObject(this._groupingDefinition)) {
      hasGroupedItems = false;
    } else {
      hasGroupedItems = true;
      groupItemId = $(`#${this._groupingDefinition.dropdownOptionsIds[0]}`).val();
    }

    // If we are Grouping, then pull the name of the grouped item and display it as 1st column
    columns.forEach((columnDef) => {
      // the column might be a complex object and have a '.' (ex.: person.name)
      // if so we want just the object (ex.: person.name => we want 'person')
      if (groupItemId.indexOf('.') >= 0) {
        groupItemId = groupItemId.split('.')[0];
      }

      if (hasGroupedItems && columnDef.id === groupItemId) {
        const fieldName = (columnDef.headerKey) ? this.translate.instant(columnDef.headerKey) : columnDef.name;
        groupedHeaders.push({
          key: columnDef.field || columnDef.id,
          title: fieldName
        });
      }
    });

    return groupedHeaders;
  }

  /**
   * Triggers download file with file format.
   * IE(6-10) are not supported
   * All other browsers will use plain javascript on client side to produce a file download.
   * @param options
   */
  startDownloadFile(options: { filename: string, csvContent: any, format: FileType | string, useUtf8WithBom: boolean }): void {
    // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
    if (navigator.appName === 'Microsoft Internet Explorer') {
      throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
    }

    // set the correct MIME type
    const mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';

    // make sure no html entities exist in the data
    const csvContent = htmlEntityDecode(options.csvContent);

    // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
    // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
    // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
    // Option#2: use a 3rd party extension to javascript encode into UTF-16
    let outputData = '';
    if (options.format === FileType.csv) {
      outputData = new TextEncoder('utf-16be').encode(csvContent);
    } else {
      outputData = csvContent;
    }

    // create a Blob object for the download
    const blob = new Blob([options.useUtf8WithBom ? '\uFEFF' : '', outputData], {
      type: `${mimeType};charset=utf-8;`
    });

    // when using IE/Edge, then use different download call
    if (typeof navigator.msSaveOrOpenBlob === 'function') {
      navigator.msSaveOrOpenBlob(blob, options.filename);
    } else {
      // this trick will generate a temp <a /> tag
      // the code will then trigger a hidden click for it to start downloading
      const link = document.createElement('a');
      const csvUrl = URL.createObjectURL(blob);

      link.textContent = 'download';
      link.href = csvUrl;
      link.setAttribute('download', options.filename);

      // set the visibility to hidden so there is no effect on your web-layout
      link.style.visibility = 'hidden';

      // this part will append the anchor tag, trigger a click (for download to start) and finally remove the tag once completed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
