import { ExcelWorkbook } from './../models/excelWorkbook.interface';
import { ExcelStylesheet } from './../models/excelStylesheet.interface';
import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as ExcelBuilder from 'excel-builder-webpack';
import { Subject } from 'rxjs';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670


import {
  Column,
  ExcelCellFormat,
  ExcelExportOption,
  ExcelMetadata,
  FileType,
  Formatter,
  GridOption,
  KeyTitlePair,
  Locale,
  FieldType,
  ExcelWorksheet,
} from '../models/index';
import { Constants } from '../constants';
import { addWhiteSpaces, sanitizeHtmlToText, titleCase, mapMomentDateFormatWithFieldType } from './utilities';

// using external non-typed js libraries
declare let $: any;

@Injectable()
export class ExcelExportService {
  private _fileFormat = FileType.xlsx;
  private _dataView: any;
  private _grid: any;
  private _locales: Locale;
  private _columnHeaders: KeyTitlePair[];
  private _groupedHeaders: KeyTitlePair[];
  private _hasGroupedItems = false;
  private _excelExportOptions: ExcelExportOption;
  private _sheet: ExcelWorksheet;
  private _stylesheet: ExcelStylesheet;
  private _stylesheetFormats: any;
  private _workbook: ExcelWorkbook;
  onGridBeforeExportToExcel = new Subject<boolean>();
  onGridAfterExportToExcel = new Subject<{ blob?: Blob; filename: string; format?: string; }>();

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
    if (!this._grid || !this._dataView) {
      throw new Error('[Angular-Slickgrid] it seems that the SlickGrid & DataView objects are not initialized did you forget to enable the grid option flag "enableExcelExport"?');
    }

    return new Promise((resolve, reject) => {
      this.onGridBeforeExportToExcel.next(true);
      this._excelExportOptions = $.extend(true, {}, this._gridOptions.excelExportOptions, options);
      this._fileFormat = this._excelExportOptions.format || FileType.xlsx;

      // prepare the Excel Workbook & Sheet
      this._workbook = new ExcelBuilder.Workbook();
      this._sheet = new ExcelBuilder.Worksheet({ name: this._excelExportOptions.sheetName || 'Sheet1' });

      // add any Excel Format/Stylesheet to current Workbook
      this._stylesheet = this._workbook.getStyleSheet();
      const boldFormatter = this._stylesheet.createFormat({ font: { bold: true } });
      const stringFormatter = this._stylesheet.createFormat({ format: '@' });
      const numberFormatter = this._stylesheet.createFormat({ format: '0' });
      const usdFormatter = this._stylesheet.createFormat({ format: '$#,##0.00' });
      this._stylesheetFormats = {
        boldFormatter,
        dollarFormatter: usdFormatter,
        numberFormatter,
        stringFormatter,
      };

      // get the CSV output from the grid data
      const dataOutput = this.getDataOutput();

      // trigger a download file
      // wrap it into a setTimeout so that the EventAggregator has enough time to start a pre-process like showing a spinner
      setTimeout(async () => {
        try {
          if (this._gridOptions && this._gridOptions.excelExportOptions && this._gridOptions.excelExportOptions.customExcelHeader) {
            this._gridOptions.excelExportOptions.customExcelHeader(this._workbook, this._sheet);
          }

          const currentSheetData = this._sheet.data;
          let finalOutput = currentSheetData;
          if (Array.isArray(currentSheetData) && Array.isArray(dataOutput)) {
            finalOutput = this._sheet.data.concat(dataOutput);
          }

          this._sheet.setData(finalOutput);
          this._workbook.addWorksheet(this._sheet);

          const excelBlob = await ExcelBuilder.Builder.createFile(this._workbook, { type: 'blob' });
          const downloadOptions = {
            filename: `${this._excelExportOptions.filename}.${this._fileFormat}`,
            format: this._fileFormat
          };

          // start downloading but add the Blob property only on the start download not on the event itself
          this.startDownloadFile({ ...downloadOptions, blob: excelBlob, data: this._sheet.data });
          this.onGridAfterExportToExcel.next(downloadOptions);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  /**
   * Triggers download file with file format.
   * IE(6-10) are not supported
   * All other browsers will use plain javascript on client side to produce a file download.
   * @param options
   */
  startDownloadFile(options: { filename: string, blob: Blob, data: any[] }) {
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
      const link = document && document.createElement('a');
      const url = URL.createObjectURL(options.blob);

      if (link && document) {
        link.textContent = 'download';
        link.href = url;
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

  /** use different Excel Stylesheet Format as per the Field Type */
  useCellFormatByFieldType(data: string | Date | moment_.Moment, fieldType: FieldType): ExcelCellFormat | string {
    let outputData: ExcelCellFormat | string | Date | moment_.Moment = data;
    switch (fieldType) {
      case FieldType.dateTime:
      case FieldType.dateTimeIso:
      case FieldType.dateTimeShortIso:
      case FieldType.dateTimeIsoAmPm:
      case FieldType.dateTimeIsoAM_PM:
      case FieldType.dateEuro:
      case FieldType.dateEuroShort:
      case FieldType.dateTimeEuro:
      case FieldType.dateTimeShortEuro:
      case FieldType.dateTimeEuroAmPm:
      case FieldType.dateTimeEuroAM_PM:
      case FieldType.dateTimeEuroShort:
      case FieldType.dateTimeEuroShortAmPm:
      case FieldType.dateUs:
      case FieldType.dateUsShort:
      case FieldType.dateTimeUs:
      case FieldType.dateTimeShortUs:
      case FieldType.dateTimeUsAmPm:
      case FieldType.dateTimeUsAM_PM:
      case FieldType.dateTimeUsShort:
      case FieldType.dateTimeUsShortAmPm:
      case FieldType.dateUtc:
      case FieldType.date:
      case FieldType.dateIso:
        outputData = data;
        if (data) {
          const defaultDateFormat = mapMomentDateFormatWithFieldType(fieldType);
          const isDateValid = moment(data as string, defaultDateFormat, false).isValid();
          const outputDate = (data && isDateValid) ? moment(data as string).format(defaultDateFormat) : data;
          const dateFormatter = this._stylesheet.createFormat({ format: defaultDateFormat });
          outputData = { value: outputDate, metadata: { style: dateFormatter.id } };
        }
        break;
      case FieldType.number:
        const val = isNaN(+data) ? null : data;
        outputData = { value: val, metadata: { style: this._stylesheetFormats.numberFormatter.id } };
        break;
      default:
        outputData = data;
    }
    return outputData as string;
  }

  // -----------------------
  // Private functions
  // -----------------------

  private getDataOutput(): string[][] | ExcelCellFormat[][] {
    const columns = this._grid && this._grid.getColumns && this._grid.getColumns() || [];

    // data variable which will hold all the fields data of a row
    const outputData = [];

    // get all column headers (it might include a "Group by" title at A1 cell)
    outputData.push(this.getColumnHeaderData(columns, { style: this._stylesheetFormats.boldFormatter.id }));

    // Populate the rest of the Grid Data
    this.pushAllGridRowDataToArray(outputData, columns);

    return outputData;
  }

  /** Get all column headers and format them in Bold */
  private getColumnHeaderData(columns: Column[], metadata: ExcelMetadata): string[] | ExcelCellFormat[] {
    let outputHeaderTitles: ExcelCellFormat[] = [];

    this._columnHeaders = this.getColumnHeaders(columns) || [];
    if (this._columnHeaders && Array.isArray(this._columnHeaders) && this._columnHeaders.length > 0) {
      // add the header row + add a new line at the end of the row
      outputHeaderTitles = this._columnHeaders.map((header) => ({ value: header.title, metadata }));
    }

    // do we have a Group by title?
    const groupTitle = this.getGroupColumnTitle();
    if (groupTitle) {
      outputHeaderTitles.unshift({ value: groupTitle, metadata });
    }

    return outputHeaderTitles;
  }

  private getGroupColumnTitle(): string | null {
    // Group By text, it could be set in the export options or from translation or if nothing is found then use the English constant text
    let groupByColumnHeader = this._excelExportOptions.groupingColumnHeaderTitle;
    if (!groupByColumnHeader && this._gridOptions.enableTranslate && this.translate && this.translate.instant) {
      groupByColumnHeader = this.translate.instant('GROUP_BY');
    } else if (!groupByColumnHeader) {
      groupByColumnHeader = this._locales && this._locales.TEXT_GROUP_BY;
    }

    // get grouped column titles and if found, we will add a "Group by" column at the first column index
    // if it's a CSV format, we'll escape the text in double quotes
    const grouping = this._dataView && this._dataView.getGrouping && this._dataView.getGrouping();
    if (grouping && Array.isArray(grouping) && grouping.length > 0) {
      this._hasGroupedItems = true;
      return groupByColumnHeader;
    } else {
      this._hasGroupedItems = false;
    }
    return null;
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
   * Get all the grid row data and return that as an output string
   */
  private pushAllGridRowDataToArray(originalDaraArray: string[][], columns: Column[]): string[][] | ExcelCellFormat[][] {
    const lineCount = this._dataView && this._dataView.getLength && this._dataView.getLength();

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
      const fieldType = columnDef.outputType || columnDef.type || FieldType.string;

      // skip excluded column
      if (columnDef.excludeFromExport) {
        continue;
      }

      // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
      if (this._hasGroupedItems && idx === 0) {
        rowOutputStrings.push('');
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

      let itemData: ExcelCellFormat | string = '';

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
      if (!columnDef.exportWithFormatter) {
        itemData = this.useCellFormatByFieldType(itemData as string, fieldType);
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
    const groupName = sanitizeHtmlToText(itemObj.title);

    if (this._excelExportOptions && this._excelExportOptions.addGroupIndentation) {
      const collapsedSymbol = this._excelExportOptions && this._excelExportOptions.groupCollapsedSymbol || '\u25B9';
      const expandedSymbol = this._excelExportOptions && this._excelExportOptions.groupExpandedSymbol || '\u25BF';
      const chevron = itemObj.collapsed ? collapsedSymbol : expandedSymbol;
      return chevron + ' ' + addWhiteSpaces(5 * itemObj.level) + groupName;
    }
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
