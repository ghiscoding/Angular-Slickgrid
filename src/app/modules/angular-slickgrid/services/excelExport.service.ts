import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TextEncoder } from 'text-encoding-utf-8';
import { Subject } from 'rxjs';

import {
  Column,
  ExcelExportOption,
  FileType,
  Formatter,
  GridOption,
  Locale,
  FieldType,
} from '../models/index';
import { Constants } from '../constants';
import { addWhiteSpaces, htmlEntityDecode, sanitizeHtmlToText, titleCase } from './utilities';
import { ExportColumnHeader } from './export.service';
import * as ExcelBuilder from 'excel-builder-webpack';

// using external non-typed js libraries
declare let $: any;

export interface ExcelMetadata {
  style: any;
}

@Injectable()
export class ExcelExportService {
  private _fileFormat = FileType.xlsx;
  private _dataView: any;
  private _grid: any;
  private _locales: Locale;
  private _columnHeaders: ExportColumnHeader[];
  private _groupedHeaders: ExportColumnHeader[];
  private _hasGroupedItems = false;
  private _excelExportOptions: ExcelExportOption;
  private _stylesheetFormats: any;
  onGridBeforeExportToExcel = new Subject<boolean>();
  onGridAfterExportToExcel = new Subject<{ blob?: Blob; filename: string; format?: string; useUtf8WithBom?: boolean; }>();

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
   * Example: exportToExcel({ format: FileType.csv, delimiter: DelimiterType.comma })
   */
  exportToExcel(options: ExcelExportOption): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.onGridBeforeExportToExcel.next(true);
      this._excelExportOptions = $.extend(true, {}, this._gridOptions.exportOptions, options);
      this._fileFormat = this._excelExportOptions.format || FileType.xlsx;

      // prepare the Excel Workbook & Sheet
      const workbook = new ExcelBuilder.Workbook();
      const sheet = new ExcelBuilder.Worksheet({ name: this._excelExportOptions.sheetName || 'Sheet1' });

      // add any Excel Format/Stylesheet to current Workbook
      const stylesheet = workbook.getStyleSheet();
      const boldFormatter = stylesheet.createFormat({ font: { bold: true } });
      const numberFormatter = stylesheet.createFormat({ format: '0' });
      const usdFormatter = stylesheet.createFormat({ format: '$#,##0.00' });
      this._stylesheetFormats = {
        boldFormatter,
        dollarFormatter: usdFormatter,
        numberFormatter,
      };

      // get the CSV output from the grid data
      const dataOutput = this.getDataOutput();

      // trigger a download file
      // wrap it into a setTimeout so that the EventAggregator has enough time to start a pre-process like showing a spinner
      setTimeout(async () => {
        try {

          sheet.setData(dataOutput);
          workbook.addWorksheet(sheet);

          const result = await ExcelBuilder.Builder.createFile(workbook, { type: 'blob' });
          const downloadOptions = {
            filename: `${this._excelExportOptions.filename}.${this._fileFormat}`,
            useUtf8WithBom: this._excelExportOptions.hasOwnProperty('useUtf8WithBom') ? this._excelExportOptions.useUtf8WithBom : true
          };

          // start downloading but add the Blob property only on the start download not on the event itself
          this.startDownloadFile({ ...downloadOptions, blob: result });
          this.onGridAfterExportToExcel.next(downloadOptions);
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
  startDownloadFile(options: { filename: string, blob: Blob, useUtf8WithBom?: boolean }) {
    // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
    if (navigator.appName === 'Microsoft Internet Explorer') {
      throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to Excel. Please upgrade your browser.');
    }

    // when using IE/Edge, then use different download call
    if (typeof navigator.msSaveOrOpenBlob === 'function') {
      navigator.msSaveOrOpenBlob(options.blob, options.filename);
    } else {
      // this trick will generate a temp <a /> tag
      // the code will then trigger a hidden click for it to start downloading
      const link = document.createElement('a');
      const csvUrl = URL.createObjectURL(options.blob);

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

  private getDataOutput(): string[][] | { value: any, metadata: ExcelMetadata }[][] {
    const columns = this._grid.getColumns() || [];

    // data variable which will hold all the fields data of a row
    const outputData = [];

    // get all column headers
    outputData.push(this.getColumnHeaderData(columns, { style: this._stylesheetFormats.boldFormatter.id }));

    const groupColumnTitles = this.getGroupColumnTitles();
    if (groupColumnTitles) {
      outputData.push(groupColumnTitles);
    }


    // Populate the rest of the Grid Data
    this.pushAllGridRowDataToArray(outputData, columns);

    return outputData;
  }

  /** Get all column headers and format them in Bold */
  private getColumnHeaderData(columns: Column[], metadata: ExcelMetadata): string[] | { value: any, metadata: ExcelMetadata }[] {
    this._columnHeaders = this.getColumnHeaders(columns) || [];
    if (this._columnHeaders && Array.isArray(this._columnHeaders) && this._columnHeaders.length > 0) {
      // add the header row + add a new line at the end of the row
      const outputHeaderTitles = this._columnHeaders.map((header) => {
        return { value: header.title, metadata };
      });
      return outputHeaderTitles;
    }
    return [];
  }

  private getGroupColumnTitles(): string[] | null {
    // Group By text, it could be set in the export options or from translation or if nothing is found then use the English constant text
    let groupByColumnHeader = this._excelExportOptions.groupingColumnHeaderTitle;
    if (!groupByColumnHeader && this._gridOptions.enableTranslate && this.translate && this.translate.instant) {
      groupByColumnHeader = this.translate.instant('GROUP_BY');
    } else if (!groupByColumnHeader) {
      groupByColumnHeader = this._locales && this._locales.TEXT_GROUP_BY;
    }


    // get grouped column titles and if found, we will add a "Group by" column at the first column index
    // if it's a CSV format, we'll escape the text in double quotes
    const grouping = this._dataView.getGrouping();
    if (grouping && Array.isArray(grouping) && grouping.length > 0) {
      this._hasGroupedItems = true;
      return [`"${groupByColumnHeader}"`];
    } else {
      this._hasGroupedItems = false;
    }
    return null;
  }

  /**
   * Get all header titles and their keys, translate the title when required.
   * @param columns of the grid
   */
  private getColumnHeaders(columns: Column[]): ExportColumnHeader[] {
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
   * Get all the grid row data and return that as an output string
   */
  private pushAllGridRowDataToArray(originalDaraArray: string[][], columns: Column[]): string[][] | { value: any, metadata: ExcelMetadata }[][] {
    const lineCount = this._dataView.getLength();

    // loop through all the grid rows of data
    for (let rowNumber = 0; rowNumber < lineCount; rowNumber++) {
      const itemObj = this._dataView.getItem(rowNumber);
      if (itemObj != null) {
        // Normal row (not grouped by anything) would have an ID which was predefined in the Grid Columns definition
        if (itemObj[this.datasetIdName] != null) {
          // get regular row item data
          originalDaraArray.push(this.readRegularRowData(columns, rowNumber, itemObj));
        } else if (this._hasGroupedItems && itemObj.__groupTotals === undefined) {
          // get the group row
          originalDaraArray.push([this.readGroupedTitleRow(itemObj)]);
        } else if (itemObj.__groupTotals) {
          // else if the row is a Group By and we have agreggators, then a property of '__groupTotals' would exist under that object
          originalDaraArray.push(this.readGroupedTotalRow(columns, itemObj));
        }
      }
    }
    return originalDaraArray;
  }

  /**
   * Get the data of a regular row (a row without grouping)
   * @param row
   * @param itemObj
   */
  private readRegularRowData(columns: Column[], row: number, itemObj: any): string[] {
    let idx = 0;
    const rowOutputStrings = [];

    for (let col = 0, ln = columns.length; col < ln; col++) {
      const columnDef = columns[col];
      const fieldId = columnDef.field || columnDef.id || '';
      const fieldType = columnDef.type || FieldType.string;

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
      const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._excelExportOptions.exportWithFormatter;

      // did the user provide a Custom Formatter for the export
      const exportCustomFormatter: Formatter | undefined = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;

      // does the field have the dot (.) notation and is a complex object? if so pull the first property name
      let fieldProperty = fieldId;
      if (typeof fieldId === 'string' && fieldId.indexOf('.') > 0) {
        const props = fieldId.split('.');
        fieldProperty = (props.length > 0) ? props[0] : fieldId;
      }

      let itemData: string | { value: any; metadata: ExcelMetadata; } = '';

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
      if (columnDef.sanitizeDataExport || this._excelExportOptions.sanitizeDataExport) {
        itemData = sanitizeHtmlToText(itemData as string);
      }

      // use different Excel Stylesheet Format as per the Field Type
      switch (fieldType) {
        case FieldType.number:
          itemData = { value: +itemData, metadata: { style: this._stylesheetFormats.numberFormatter.id } };
          break;
      }

      rowOutputStrings.push(itemData);
      idx++;
    }

    return rowOutputStrings;
  }

  /**
   * Get the grouped title(s) and its group title formatter, for example if we grouped by salesRep, the returned result would be:: 'Sales Rep: John Dow (2 items)'
   * @param itemObj
   */
  private readGroupedTitleRow(itemObj: any): string {
    let groupName = sanitizeHtmlToText(itemObj.title);

    groupName = addWhiteSpaces(5 * itemObj.level) + groupName;

    return groupName;
  }

  /**
   * Get the grouped totals (below the regular rows), these are set by Slick Aggregators.
   * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
   * @param itemObj
   */
  private readGroupedTotalRow(columns: Column[], itemObj: any): string[] {
    const groupingAggregatorRowText = this._excelExportOptions.groupingAggregatorRowText || '';
    const outputStrings = [groupingAggregatorRowText];

    columns.forEach((columnDef) => {
      let itemData = '';

      const skippedField = columnDef.excludeFromExport || false;

      // if there's a groupTotalsFormatter, we will re-run it to get the exact same output as what is shown in UI
      if (columnDef.groupTotalsFormatter) {
        itemData = columnDef.groupTotalsFormatter(itemObj, columnDef);
      }

      // does the user want to sanitize the output data (remove HTML tags)?
      if (columnDef.sanitizeDataExport || this._excelExportOptions.sanitizeDataExport) {
        itemData = sanitizeHtmlToText(itemData);
      }

      // add the column (unless user wants to skip it)
      if ((columnDef.width === undefined || columnDef.width > 0) && !skippedField) {
        outputStrings.push(itemData);
      }
    });

    return outputStrings;
  }
}
