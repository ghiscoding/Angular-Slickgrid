import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TextEncoder } from 'text-encoding-utf-8';
import { Subject } from 'rxjs';

import {
  Column,
  ExportOption,
  FileType,
  Formatter,
  GridOption,
  KeyTitlePair,
  Locale,
} from './../models/index';
import { Constants } from './../constants';
import { addWhiteSpaces, htmlEntityDecode, sanitizeHtmlToText, titleCase } from './../services/utilities';

// using external non-typed js libraries
declare let $: any;

@Injectable()
export class ExportService {
  private _delimiter = ',';
  private _fileFormat = FileType.csv;
  private _lineCarriageReturn = '\n';
  private _dataView: any;
  private _grid: any;
  private _locales: Locale;
  private _exportQuoteWrapper = '';
  private _columnHeaders: KeyTitlePair[];
  private _groupedHeaders: KeyTitlePair[];
  private _hasGroupedItems = false;
  private _exportOptions: ExportOption;
  onGridBeforeExportToFile = new Subject<boolean>();
  onGridAfterExportToFile = new Subject<{ content?: string; filename: string; format: string; useUtf8WithBom: boolean; }>();

  constructor(@Optional() private translate: TranslateService) { }

  private get datasetIdName(): string {
    return this._gridOptions && this._gridOptions.datasetIdPropertyName || 'id';
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  /**
   * Initialize the Export Service
   * @param grid
   * @param gridOptions
   * @param dataView
   */
  init(grid: any, dataView: any): void {
    this._grid = grid;
    this._dataView = dataView;

    // get locales provided by user in forRoot or else use default English locales via the Constants
    this._locales = this._gridOptions && this._gridOptions.locales || Constants.locales;

    if (this._gridOptions.enableTranslate && (!this.translate || !this.translate.instant)) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }
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
  exportToFile(options: ExportOption): Promise<boolean> {
    if (!this._grid || !this._dataView) {
      throw new Error('[Angular-Slickgrid] it seems that the SlickGrid & DataView objects are not initialized did you forget to enable the grid option flag "enableExcelExport"?');
    }

    return new Promise((resolve, reject) => {
      this.onGridBeforeExportToFile.next(true);
      this._exportOptions = $.extend(true, {}, this._gridOptions.exportOptions, options);
      this._delimiter = this._exportOptions.delimiterOverride || this._exportOptions.delimiter || '';
      this._fileFormat = this._exportOptions.format || FileType.csv;

      // get the CSV output from the grid data
      const dataOutput = this.getDataOutput();

      // trigger a download file
      // wrap it into a setTimeout so that the EventAggregator has enough time to start a pre-process like showing a spinner
      setTimeout(() => {
        try {
          const downloadOptions = {
            filename: `${this._exportOptions.filename}.${this._fileFormat}`,
            format: this._fileFormat,
            useUtf8WithBom: this._exportOptions.hasOwnProperty('useUtf8WithBom') ? this._exportOptions.useUtf8WithBom : true
          };

          // start downloading but add the content property only on the start download not on the event itself
          this.startDownloadFile({ ...downloadOptions, content: dataOutput }); // add content property
          this.onGridAfterExportToFile.next(downloadOptions);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  }

  /**
   * Triggers download file with file format.
   * IE(6-10) are not supported
   * All other browsers will use plain javascript on client side to produce a file download.
   * @param options
   */
  startDownloadFile(options: { filename: string, content: string, format: FileType | string, useUtf8WithBom: boolean }) {
    // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
    if (navigator.appName === 'Microsoft Internet Explorer') {
      throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
    }

    // set the correct MIME type
    const mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';

    // make sure no html entities exist in the data
    const dataContent = htmlEntityDecode(options.content);

    // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
    // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
    // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
    // Option#2: use a 3rd party extension to javascript encode into UTF-16
    let outputData: Uint8Array | string;
    if (options.format === FileType.csv) {
      outputData = new TextEncoder('utf-8').encode(dataContent);
    } else {
      outputData = dataContent;
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

  // -----------------------
  // Private functions
  // -----------------------

  private getDataOutput(): string {
    const columns = this._grid.getColumns() || [];

    // Group By text, it could be set in the export options or from translation or if nothing is found then use the English constant text
    let groupByColumnHeader = this._exportOptions.groupingColumnHeaderTitle;
    if (!groupByColumnHeader && this._gridOptions.enableTranslate && this.translate && this.translate.instant) {
      groupByColumnHeader = this.translate.instant('GROUP_BY');
    } else if (!groupByColumnHeader) {
      groupByColumnHeader = this._locales && this._locales.TEXT_GROUP_BY;
    }

    // a CSV needs double quotes wrapper, the other types do not need any wrapper
    this._exportQuoteWrapper = (this._fileFormat === FileType.csv) ? '"' : '';

    // data variable which will hold all the fields data of a row
    let outputDataString = '';

    // get grouped column titles and if found, we will add a "Group by" column at the first column index
    // if it's a CSV format, we'll escape the text in double quotes
    const grouping = this._dataView.getGrouping();
    if (grouping && Array.isArray(grouping) && grouping.length > 0) {
      this._hasGroupedItems = true;
      outputDataString += (this._fileFormat === FileType.csv) ? `"${groupByColumnHeader}"${this._delimiter}` : `${groupByColumnHeader}${this._delimiter}`;
    } else {
      this._hasGroupedItems = false;
    }

    // get all column headers
    this._columnHeaders = this.getColumnHeaders(columns) || [];
    if (this._columnHeaders && Array.isArray(this._columnHeaders) && this._columnHeaders.length > 0) {
      // add the header row + add a new line at the end of the row
      const outputHeaderTitles = this._columnHeaders.map((header) => {
        return this._exportQuoteWrapper + header.title + this._exportQuoteWrapper;
      });
      outputDataString += (outputHeaderTitles.join(this._delimiter) + this._lineCarriageReturn);
    }

    // Populate the rest of the Grid Data
    outputDataString += this.getAllGridRowData(columns, this._lineCarriageReturn);

    return outputDataString;
  }

  /**
   * Get all the grid row data and return that as an output string
   */
  private getAllGridRowData(columns: Column[], lineCarriageReturn: string): string {
    const outputDataStrings = [];
    const lineCount = this._dataView.getLength();

    // loop through all the grid rows of data
    for (let rowNumber = 0; rowNumber < lineCount; rowNumber++) {
      const itemObj = this._dataView.getItem(rowNumber);
      if (itemObj != null) {
        // Normal row (not grouped by anything) would have an ID which was predefined in the Grid Columns definition
        if (itemObj[this.datasetIdName] != null) {
          // get regular row item data
          outputDataStrings.push(this.readRegularRowData(columns, rowNumber, itemObj));
        } else if (this._hasGroupedItems && itemObj.__groupTotals === undefined) {
          // get the group row
          outputDataStrings.push(this.readGroupedTitleRow(itemObj));
        } else if (itemObj.__groupTotals) {
          // else if the row is a Group By and we have agreggators, then a property of '__groupTotals' would exist under that object
          outputDataStrings.push(this.readGroupedTotalRow(columns, itemObj));
        }
      }
    }

    return outputDataStrings.join(lineCarriageReturn);
  }

  /**
   * Get all header titles and their keys, translate the title when required.
   * @param columns of the grid
   */
  private getColumnHeaders(columns: Column[]): KeyTitlePair[] {
    if (!columns || !Array.isArray(columns) || columns.length === 0) {
      return null;
    }
    const columnHeaders = [];

    // Populate the Column Header, pull the name defined
    columns.forEach((columnDef) => {
      let headerTitle = '';
      if (columnDef.headerKey && this._gridOptions.enableTranslate && this.translate && this.translate.instant) {
        headerTitle = this.translate.instant(columnDef.headerKey);
      } else {
        headerTitle = columnDef.name || titleCase(columnDef.field);
      }
      const skippedField = columnDef.excludeFromExport || false;

      // if column width is 0, then we consider that field as a hidden field and should not be part of the export
      if ((columnDef.width === undefined || columnDef.width > 0) && !skippedField) {
        columnHeaders.push({
          key: columnDef.field || columnDef.id,
          title: headerTitle
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
  private readRegularRowData(columns: Column[], row: number, itemObj: any) {
    let idx = 0;
    const rowOutputStrings = [];
    const exportQuoteWrapper = this._exportQuoteWrapper;

    for (let col = 0, ln = columns.length; col < ln; col++) {
      const columnDef = columns[col];
      const fieldId = columnDef.field || columnDef.id || '';

      // skip excluded column
      if (columnDef.excludeFromExport) {
        continue;
      }

      // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
      if (this._hasGroupedItems && idx === 0) {
        const emptyValue = this._fileFormat === FileType.csv ? `""` : '';
        rowOutputStrings.push(emptyValue);
      }

      // does the user want to evaluate current column Formatter?
      const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._exportOptions.exportWithFormatter;

      // did the user provide a Custom Formatter for the export
      const exportCustomFormatter: Formatter | undefined = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;

      // does the field have the dot (.) notation and is a complex object? if so pull the first property name
      let fieldProperty = fieldId;
      if (typeof fieldId === 'string' && fieldId.indexOf('.') > 0) {
        const props = fieldId.split('.');
        fieldProperty = (props.length > 0) ? props[0] : fieldId;
      }

      let itemData = '';

      if (itemObj && itemObj.hasOwnProperty(fieldProperty) && exportCustomFormatter !== undefined && exportCustomFormatter !== undefined) {
        const formattedData = exportCustomFormatter(row, col, itemObj[fieldProperty], columnDef, itemObj, this._grid);
        itemData = formattedData as string;
        if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
          itemData = formattedData.text;
        }
        if (itemData === null || itemData === undefined) {
          itemData = '';
        }
      } else if (isEvaluatingFormatter && itemObj.hasOwnProperty(fieldProperty) && columnDef.formatter) {
        const formattedData = columnDef.formatter(row, col, itemObj[fieldProperty], columnDef, itemObj, this._grid);
        itemData = formattedData as string;
        if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
          itemData = formattedData.text;
        }
        if (itemData === null || itemData === undefined) {
          itemData = '';
        }
      } else {
        itemData = (!itemObj.hasOwnProperty(fieldProperty)) ? '' : itemObj[fieldProperty];
        if (itemData === null || itemData === undefined) {
          itemData = '';
        }
      }

      // does the user want to sanitize the output data (remove HTML tags)?
      if (columnDef.sanitizeDataExport || this._exportOptions.sanitizeDataExport) {
        itemData = sanitizeHtmlToText(itemData);
      }

      // when CSV we also need to escape double quotes twice, so " becomes ""
      if (this._fileFormat === FileType.csv && itemData) {
        itemData = itemData.toString().replace(/"/gi, `""`);
      }

      // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
      // to cancel that effect we can had = in front, ex: ="1E06"
      const keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';

      rowOutputStrings.push(keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper);
      idx++;
    }

    return rowOutputStrings.join(this._delimiter);
  }

  /**
   * Get the grouped title(s) and its group title formatter, for example if we grouped by salesRep, the returned result would be:: 'Sales Rep: John Dow (2 items)'
   * @param itemObj
   */
  private readGroupedTitleRow(itemObj: any) {
    let groupName = sanitizeHtmlToText(itemObj.title);
    const exportQuoteWrapper = this._exportQuoteWrapper;

    groupName = addWhiteSpaces(5 * itemObj.level) + groupName;

    if (this._fileFormat === FileType.csv) {
      // when CSV we also need to escape double quotes twice, so " becomes ""
      groupName = groupName.toString().replace(/"/gi, `""`);
    }
    return exportQuoteWrapper + groupName + exportQuoteWrapper;
  }

  /**
   * Get the grouped totals (below the regular rows), these are set by Slick Aggregators.
   * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
   * @param itemObj
   */
  private readGroupedTotalRow(columns: Column[], itemObj: any) {
    const delimiter = this._exportOptions.delimiter;
    const format = this._exportOptions.format;
    const groupingAggregatorRowText = this._exportOptions.groupingAggregatorRowText || '';
    const exportQuoteWrapper = this._exportQuoteWrapper;
    const outputStrings = [`${exportQuoteWrapper}${groupingAggregatorRowText}${exportQuoteWrapper}`];

    columns.forEach((columnDef) => {
      let itemData = '';

      const skippedField = columnDef.excludeFromExport || false;

      // if there's a groupTotalsFormatter, we will re-run it to get the exact same output as what is shown in UI
      if (columnDef.groupTotalsFormatter) {
        itemData = columnDef.groupTotalsFormatter(itemObj, columnDef);
      }

      // does the user want to sanitize the output data (remove HTML tags)?
      if (columnDef.sanitizeDataExport || this._exportOptions.sanitizeDataExport) {
        itemData = sanitizeHtmlToText(itemData);
      }

      if (format === FileType.csv) {
        // when CSV we also need to escape double quotes twice, so a double quote " becomes 2x double quotes ""
        itemData = itemData.toString().replace(/"/gi, `""`);
      }

      // add the column (unless user wants to skip it)
      if ((columnDef.width === undefined || columnDef.width > 0) && !skippedField) {
        outputStrings.push(exportQuoteWrapper + itemData + exportQuoteWrapper);
      }
    });

    return outputStrings.join(delimiter);
  }
}
