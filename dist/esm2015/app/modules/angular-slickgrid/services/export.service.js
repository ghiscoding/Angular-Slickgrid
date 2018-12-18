/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FileType } from './../models/index';
import { addWhiteSpaces, htmlEntityDecode, sanitizeHtmlToText } from './../services/utilities';
import { Subject } from 'rxjs';
import { TextEncoder } from 'text-encoding-utf-8';
/**
 * @record
 */
export function ExportColumnHeader() { }
if (false) {
    /** @type {?} */
    ExportColumnHeader.prototype.key;
    /** @type {?} */
    ExportColumnHeader.prototype.title;
}
export class ExportService {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._lineCarriageReturn = '\n';
        this._hasGroupedItems = false;
        this.onGridBeforeExportToFile = new Subject();
        this.onGridAfterExportToFile = new Subject();
    }
    /**
     * @private
     * @return {?}
     */
    get datasetIdName() {
        return this._gridOptions && this._gridOptions.datasetIdPropertyName || 'id';
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @private
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    init(grid, dataView) {
        this._grid = grid;
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
     * @param {?} options
     * @return {?}
     */
    exportToFile(options) {
        this.onGridBeforeExportToFile.next(true);
        this._exportOptions = $.extend(true, {}, this._gridOptions.exportOptions, options);
        // get the CSV output from the grid data
        /** @type {?} */
        const dataOutput = this.getDataOutput();
        // trigger a download file
        // wrap it into a setTimeout so that the EventAggregator has enough time to start a pre-process like showing a spinner
        setTimeout(() => {
            /** @type {?} */
            const downloadOptions = {
                filename: `${this._exportOptions.filename}.${this._exportOptions.format}`,
                csvContent: dataOutput,
                format: this._exportOptions.format,
                useUtf8WithBom: this._exportOptions.useUtf8WithBom
            };
            this.startDownloadFile(downloadOptions);
            this.onGridAfterExportToFile.next({ options: downloadOptions });
        }, 0);
    }
    // -----------------------
    // Private functions
    // -----------------------
    /**
     * @return {?}
     */
    getDataOutput() {
        /** @type {?} */
        const columns = this._grid.getColumns() || [];
        /** @type {?} */
        const delimiter = this._exportOptions.delimiter || '';
        /** @type {?} */
        const format = this._exportOptions.format || '';
        /** @type {?} */
        const groupByColumnHeader = this._exportOptions.groupingColumnHeaderTitle || this.translate.instant('GROUP_BY');
        // a CSV needs double quotes wrapper, the other types do not need any wrapper
        this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';
        // data variable which will hold all the fields data of a row
        /** @type {?} */
        let outputDataString = '';
        // get grouped column titles and if found, we will add a "Group by" column at the first column index
        /** @type {?} */
        const grouping = this._dataView.getGrouping();
        if (grouping && Array.isArray(grouping) && grouping.length > 0) {
            this._hasGroupedItems = true;
            outputDataString += `${groupByColumnHeader}` + delimiter;
        }
        else {
            this._hasGroupedItems = false;
        }
        // get all column headers
        this._columnHeaders = this.getColumnHeaders(columns) || [];
        if (this._columnHeaders && Array.isArray(this._columnHeaders) && this._columnHeaders.length > 0) {
            // add the header row + add a new line at the end of the row
            /** @type {?} */
            const outputHeaderTitles = this._columnHeaders.map((header) => {
                return this._exportQuoteWrapper + header.title + this._exportQuoteWrapper;
            });
            outputDataString += (outputHeaderTitles.join(delimiter) + this._lineCarriageReturn);
        }
        // Populate the rest of the Grid Data
        outputDataString += this.getAllGridRowData(columns, this._lineCarriageReturn);
        return outputDataString;
    }
    /**
     * Get all the grid row data and return that as an output string
     * @param {?} columns
     * @param {?} lineCarriageReturn
     * @return {?}
     */
    getAllGridRowData(columns, lineCarriageReturn) {
        /** @type {?} */
        const outputDataStrings = [];
        /** @type {?} */
        const lineCount = this._dataView.getLength();
        // loop through all the grid rows of data
        for (let rowNumber = 0; rowNumber < lineCount; rowNumber++) {
            /** @type {?} */
            const itemObj = this._dataView.getItem(rowNumber);
            if (itemObj != null) {
                // Normal row (not grouped by anything) would have an ID which was predefined in the Grid Columns definition
                if (itemObj[this.datasetIdName] != null) {
                    // get regular row item data
                    outputDataStrings.push(this.readRegularRowData(columns, rowNumber, itemObj));
                }
                else if (this._hasGroupedItems && itemObj.__groupTotals === undefined) {
                    // get the group row
                    outputDataStrings.push(this.readGroupedTitleRow(itemObj));
                }
                else if (itemObj.__groupTotals) {
                    // else if the row is a Group By and we have agreggators, then a property of '__groupTotals' would exist under that object
                    outputDataStrings.push(this.readGroupedTotalRow(columns, itemObj));
                }
            }
        }
        return outputDataStrings.join(this._lineCarriageReturn);
    }
    /**
     * Get all header titles and their keys, translate the title when required.
     * @param {?} columns of the grid
     * @return {?}
     */
    getColumnHeaders(columns) {
        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return null;
        }
        /** @type {?} */
        const columnHeaders = [];
        // Populate the Column Header, pull the name defined
        columns.forEach((columnDef) => {
            /** @type {?} */
            const fieldName = (columnDef.headerKey) ? this.translate.instant(columnDef.headerKey) : columnDef.name;
            /** @type {?} */
            const skippedField = columnDef.excludeFromExport || false;
            // if column width is 0 then it's not evaluated since that field is considered hidden should not be part of the export
            if ((columnDef.width === undefined || columnDef.width > 0) && !skippedField) {
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
     * @param {?} columns
     * @param {?} row
     * @param {?} itemObj
     * @return {?}
     */
    readRegularRowData(columns, row, itemObj) {
        /** @type {?} */
        let idx = 0;
        /** @type {?} */
        const rowOutputStrings = [];
        /** @type {?} */
        const delimiter = this._exportOptions.delimiter;
        /** @type {?} */
        const format = this._exportOptions.format;
        /** @type {?} */
        const exportQuoteWrapper = this._exportQuoteWrapper || '';
        for (let col = 0, ln = columns.length; col < ln; col++) {
            /** @type {?} */
            const columnDef = columns[col];
            /** @type {?} */
            const fieldId = columnDef.field || columnDef.id || '';
            // skip excluded column
            if (columnDef.excludeFromExport) {
                continue;
            }
            // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
            if (this._hasGroupedItems && idx === 0) {
                rowOutputStrings.push(`""`);
            }
            // does the user want to evaluate current column Formatter?
            /** @type {?} */
            const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._exportOptions.exportWithFormatter;
            // did the user provide a Custom Formatter for the export
            /** @type {?} */
            const exportCustomFormatter = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;
            /** @type {?} */
            let itemData = '';
            if (exportCustomFormatter) {
                itemData = exportCustomFormatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
            }
            else if (isEvaluatingFormatter && !!columnDef.formatter) {
                itemData = columnDef.formatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
            }
            else {
                itemData = (itemObj[fieldId] === null || itemObj[fieldId] === undefined) ? '' : itemObj[fieldId];
            }
            // does the user want to sanitize the output data (remove HTML tags)?
            if (columnDef.sanitizeDataExport || this._exportOptions.sanitizeDataExport) {
                itemData = sanitizeHtmlToText(itemData);
            }
            // when CSV we also need to escape double quotes twice, so " becomes ""
            if (format === FileType.csv && itemData) {
                itemData = itemData.toString().replace(/"/gi, `""`);
            }
            // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
            // to cancel that effect we can had = in front, ex: ="1E06"
            /** @type {?} */
            const keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
            rowOutputStrings.push(keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper);
            idx++;
        }
        return rowOutputStrings.join(delimiter);
    }
    /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param {?} itemObj
     * @return {?}
     */
    readGroupedTitleRow(itemObj) {
        /** @type {?} */
        let groupName = sanitizeHtmlToText(itemObj.title);
        /** @type {?} */
        const exportQuoteWrapper = this._exportQuoteWrapper || '';
        /** @type {?} */
        const format = this._exportOptions.format;
        groupName = addWhiteSpaces(5 * itemObj.level) + groupName;
        if (format === FileType.csv) {
            // when CSV we also need to escape double quotes twice, so " becomes ""
            groupName = groupName.toString().replace(/"/gi, `""`);
        }
        return exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper;
    }
    /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param {?} columns
     * @param {?} itemObj
     * @return {?}
     */
    readGroupedTotalRow(columns, itemObj) {
        /** @type {?} */
        const delimiter = this._exportOptions.delimiter;
        /** @type {?} */
        const format = this._exportOptions.format;
        /** @type {?} */
        const groupingAggregatorRowText = this._exportOptions.groupingAggregatorRowText || '';
        /** @type {?} */
        const exportQuoteWrapper = this._exportQuoteWrapper || '';
        /** @type {?} */
        const outputStrings = [`${exportQuoteWrapper}${groupingAggregatorRowText}${exportQuoteWrapper}`];
        columns.forEach((columnDef) => {
            /** @type {?} */
            let itemData = '';
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
            outputStrings.push(exportQuoteWrapper + itemData + exportQuoteWrapper);
        });
        return outputStrings.join(delimiter);
    }
    /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param {?} options
     * @return {?}
     */
    startDownloadFile(options) {
        // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
        if (navigator.appName === 'Microsoft Internet Explorer') {
            throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
        }
        // set the correct MIME type
        /** @type {?} */
        const mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';
        // make sure no html entities exist in the data
        /** @type {?} */
        const csvContent = htmlEntityDecode(options.csvContent);
        // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
        // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
        // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
        // Option#2: use a 3rd party extension to javascript encode into UTF-16
        /** @type {?} */
        let outputData;
        if (options.format === FileType.csv) {
            outputData = new TextEncoder('utf-8').encode(csvContent);
        }
        else {
            outputData = csvContent;
        }
        // create a Blob object for the download
        /** @type {?} */
        const blob = new Blob([options.useUtf8WithBom ? '\uFEFF' : '', outputData], {
            type: `${mimeType};charset=utf-8;`
        });
        // when using IE/Edge, then use different download call
        if (typeof navigator.msSaveOrOpenBlob === 'function') {
            navigator.msSaveOrOpenBlob(blob, options.filename);
        }
        else {
            // this trick will generate a temp <a /> tag
            // the code will then trigger a hidden click for it to start downloading
            /** @type {?} */
            const link = document.createElement('a');
            /** @type {?} */
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
ExportService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ExportService.ctorParameters = () => [
    { type: TranslateService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._lineCarriageReturn;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._dataView;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._exportQuoteWrapper;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._columnHeaders;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._groupedHeaders;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._hasGroupedItems;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype._exportOptions;
    /** @type {?} */
    ExportService.prototype.onGridBeforeExportToFile;
    /** @type {?} */
    ExportService.prototype.onGridAfterExportToFile;
    /**
     * @type {?}
     * @private
     */
    ExportService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4cG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxRQUFRLEVBR1QsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0YsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFLbEQsd0NBR0M7OztJQUZDLGlDQUFZOztJQUNaLG1DQUFjOztBQUloQixNQUFNLE9BQU8sYUFBYTs7OztJQVl4QixZQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVh2Qyx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFNM0IscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRWpDLDZCQUF3QixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDbEQsNEJBQXVCLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7SUFFUCxDQUFDOzs7OztJQUVwRCxJQUFZLGFBQWE7UUFDdkIsT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDO0lBQzlFLENBQUM7Ozs7OztJQUdELElBQVksWUFBWTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUUsQ0FBQzs7Ozs7OztJQVFELElBQUksQ0FBQyxJQUFTLEVBQUUsUUFBYTtRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDOzs7Ozs7Ozs7Ozs7SUFXRCxZQUFZLENBQUMsT0FBcUI7UUFDaEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7O2NBRzdFLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1FBRXZDLDBCQUEwQjtRQUMxQixzSEFBc0g7UUFDdEgsVUFBVSxDQUFDLEdBQUcsRUFBRTs7a0JBQ1IsZUFBZSxHQUFHO2dCQUN0QixRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtnQkFDekUsVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07Z0JBQ2xDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWM7YUFDbkQ7WUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7Ozs7Ozs7SUFNRCxhQUFhOztjQUNMLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUU7O2NBQ3ZDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsSUFBSSxFQUFFOztjQUMvQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksRUFBRTs7Y0FDekMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyx5QkFBeUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFFL0csNkVBQTZFO1FBQzdFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzs7WUFHNUQsZ0JBQWdCLEdBQUcsRUFBRTs7O2NBR25CLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUM3QyxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDN0IsZ0JBQWdCLElBQUksR0FBRyxtQkFBbUIsRUFBRSxHQUFHLFNBQVMsQ0FBQztTQUMxRDthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztTQUMvQjtRQUVELHlCQUF5QjtRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7O2tCQUV6RixrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM1RCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUM1RSxDQUFDLENBQUM7WUFDRixnQkFBZ0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNyRjtRQUVELHFDQUFxQztRQUNyQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTlFLE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQzs7Ozs7OztJQUtELGlCQUFpQixDQUFDLE9BQWlCLEVBQUUsa0JBQTBCOztjQUN2RCxpQkFBaUIsR0FBRyxFQUFFOztjQUN0QixTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7UUFFNUMseUNBQXlDO1FBQ3pDLEtBQUssSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUU7O2tCQUNwRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBRWpELElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDbkIsNEdBQTRHO2dCQUM1RyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxFQUFFO29CQUN2Qyw0QkFBNEI7b0JBQzVCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUM5RTtxQkFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtvQkFDdkUsb0JBQW9CO29CQUNwQixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQzNEO3FCQUFNLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRTtvQkFDaEMsMEhBQTBIO29CQUMxSCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNwRTthQUNGO1NBQ0Y7UUFFRCxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7Ozs7SUFNRCxnQkFBZ0IsQ0FBQyxPQUFpQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMvRCxPQUFPLElBQUksQ0FBQztTQUNiOztjQUNLLGFBQWEsR0FBRyxFQUFFO1FBRXhCLG9EQUFvRDtRQUNwRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7O2tCQUN0QixTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUk7O2tCQUNoRyxZQUFZLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixJQUFJLEtBQUs7WUFFekQsc0hBQXNIO1lBQ3RILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFNLFNBQVMsSUFBSSxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUM1RSxhQUFhLENBQUMsSUFBSSxDQUFDO29CQUNqQixHQUFHLEVBQUUsU0FBUyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsRUFBRTtvQkFDcEMsS0FBSyxFQUFFLFNBQVM7aUJBQ2pCLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDOzs7Ozs7OztJQU9ELGtCQUFrQixDQUFDLE9BQWlCLEVBQUUsR0FBVyxFQUFFLE9BQVk7O1lBQ3pELEdBQUcsR0FBRyxDQUFDOztjQUNMLGdCQUFnQixHQUFHLEVBQUU7O2NBQ3JCLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVM7O2NBQ3pDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07O2NBQ25DLGtCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFO1FBRXpELEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7O2tCQUNoRCxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7a0JBQ3hCLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRTtZQUVyRCx1QkFBdUI7WUFDdkIsSUFBSSxTQUFTLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzdCLFNBQVM7YUFDWjtZQUVELG9KQUFvSjtZQUNwSixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO2dCQUN0QyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7OztrQkFHSyxxQkFBcUIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQjs7O2tCQUcvSSxxQkFBcUIsR0FBYyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxTQUFTOztnQkFFbEksUUFBUSxHQUFHLEVBQUU7WUFFakIsSUFBSSxxQkFBcUIsRUFBRTtnQkFDekIsUUFBUSxHQUFHLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlGO2lCQUFNLElBQUkscUJBQXFCLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3pELFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVGO2lCQUFNO2dCQUNMLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsRztZQUVELHFFQUFxRTtZQUNyRSxJQUFJLFNBQVMsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFO2dCQUMxRSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFFRCx1RUFBdUU7WUFDdkUsSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLEdBQUcsSUFBSSxRQUFRLEVBQUU7Z0JBQ3ZDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyRDs7OztrQkFJSyxtQkFBbUIsR0FBRyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBRTVGLGdCQUFnQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztZQUNoRyxHQUFHLEVBQUUsQ0FBQztTQUNQO1FBRUQsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7O0lBTUQsbUJBQW1CLENBQUMsT0FBWTs7WUFDMUIsU0FBUyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7O2NBQzNDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFOztjQUNuRCxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO1FBRXpDLFNBQVMsR0FBRyxjQUFjLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUM7UUFFMUQsSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUMzQix1RUFBdUU7WUFDdkUsU0FBUyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsT0FBTyxrQkFBa0IsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLGtCQUFrQixDQUFDO0lBQ25FLENBQUM7Ozs7Ozs7O0lBT0QsbUJBQW1CLENBQUMsT0FBaUIsRUFBRSxPQUFZOztjQUMzQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTOztjQUN6QyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNOztjQUNuQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLHlCQUF5QixJQUFJLEVBQUU7O2NBQy9FLGtCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxFQUFFOztjQUNuRCxhQUFhLEdBQUcsQ0FBQyxHQUFHLGtCQUFrQixHQUFHLHlCQUF5QixHQUFHLGtCQUFrQixFQUFFLENBQUM7UUFFaEcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFOztnQkFDeEIsUUFBUSxHQUFHLEVBQUU7WUFFakIsMkdBQTJHO1lBQzNHLElBQUksU0FBUyxDQUFDLG9CQUFvQixFQUFFO2dCQUNsQyxRQUFRLEdBQUcsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzthQUMvRDtZQUVELHFFQUFxRTtZQUNyRSxJQUFJLFNBQVMsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFO2dCQUMxRSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFFRCxJQUFJLE1BQU0sS0FBSyxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUMzQix1R0FBdUc7Z0JBQ3ZHLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyRDtZQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLGtCQUFrQixDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7Ozs7SUFRRCxpQkFBaUIsQ0FBQyxPQUFrRztRQUNsSCxvS0FBb0s7UUFDcEssSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLDZCQUE2QixFQUFFO1lBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsMkdBQTJHLENBQUMsQ0FBQztTQUM5SDs7O2NBR0ssUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWTs7O2NBR3hFLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDOzs7Ozs7WUFNbkQsVUFBK0I7UUFDbkMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDbkMsVUFBVSxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxRDthQUFNO1lBQ0wsVUFBVSxHQUFHLFVBQVUsQ0FBQztTQUN6Qjs7O2NBR0ssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDMUUsSUFBSSxFQUFFLEdBQUcsUUFBUSxpQkFBaUI7U0FDbkMsQ0FBQztRQUVGLHVEQUF1RDtRQUN2RCxJQUFJLE9BQU8sU0FBUyxDQUFDLGdCQUFnQixLQUFLLFVBQVUsRUFBRTtZQUNwRCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRDthQUFNOzs7O2tCQUdDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQzs7a0JBQ2xDLE1BQU0sR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUV4QyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFaEQsd0VBQXdFO1lBQ3hFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztZQUVqQywwSEFBMEg7WUFDMUgsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7WUE3VUYsVUFBVTs7OztZQXBCRixnQkFBZ0I7Ozs7Ozs7SUFzQnZCLDRDQUFtQzs7Ozs7SUFDbkMsa0NBQXVCOzs7OztJQUN2Qiw4QkFBbUI7Ozs7O0lBQ25CLDRDQUFvQzs7Ozs7SUFDcEMsdUNBQTZDOzs7OztJQUM3Qyx3Q0FBOEM7Ozs7O0lBQzlDLHlDQUFpQzs7Ozs7SUFDakMsdUNBQXFDOztJQUNyQyxpREFBa0Q7O0lBQ2xELGdEQUEwRDs7Ozs7SUFFOUMsa0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIEV4cG9ydE9wdGlvbixcclxuICBGaWxlVHlwZSxcclxuICBGb3JtYXR0ZXIsXHJcbiAgR3JpZE9wdGlvblxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgYWRkV2hpdGVTcGFjZXMsIGh0bWxFbnRpdHlEZWNvZGUsIHNhbml0aXplSHRtbFRvVGV4dCB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBUZXh0RW5jb2RlciB9IGZyb20gJ3RleHQtZW5jb2RpbmctdXRmLTgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIGxldCAkOiBhbnk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEV4cG9ydENvbHVtbkhlYWRlciB7XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRXhwb3J0U2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfbGluZUNhcnJpYWdlUmV0dXJuID0gJ1xcbic7XHJcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfZXhwb3J0UXVvdGVXcmFwcGVyOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfY29sdW1uSGVhZGVyczogRXhwb3J0Q29sdW1uSGVhZGVyW107XHJcbiAgcHJpdmF0ZSBfZ3JvdXBlZEhlYWRlcnM6IEV4cG9ydENvbHVtbkhlYWRlcltdO1xyXG4gIHByaXZhdGUgX2hhc0dyb3VwZWRJdGVtcyA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2V4cG9ydE9wdGlvbnM6IEV4cG9ydE9wdGlvbjtcclxuICBvbkdyaWRCZWZvcmVFeHBvcnRUb0ZpbGUgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG4gIG9uR3JpZEFmdGVyRXhwb3J0VG9GaWxlID0gbmV3IFN1YmplY3Q8eyBvcHRpb25zOiBhbnkgfT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICBwcml2YXRlIGdldCBkYXRhc2V0SWROYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuZGF0YXNldElkUHJvcGVydHlOYW1lIHx8ICdpZCc7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIEV4cG9ydCBTZXJ2aWNlXHJcbiAgICogQHBhcmFtIGdyaWRcclxuICAgKiBAcGFyYW0gZ3JpZE9wdGlvbnNcclxuICAgKiBAcGFyYW0gZGF0YVZpZXdcclxuICAgKi9cclxuICBpbml0KGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gdG8gZXhwb3J0IHRoZSBHcmlkIHJlc3VsdCB0byBhbiBFeGNlbCBDU1YgZm9ybWF0IHVzaW5nIGphdmFzY3JpcHQgZm9yIGl0IHRvIHByb2R1Y2UgdGhlIENTViBmaWxlLlxyXG4gICAqIFRoaXMgaXMgYSBXWVNJV1lHIGV4cG9ydCB0byBmaWxlIG91dHB1dCAoV2hhdCBZb3UgU2VlIGlzIFdoYXQgWW91IEdldClcclxuICAgKlxyXG4gICAqIE5PVEVTOiBUaGUgY29sdW1uIHBvc2l0aW9uIG5lZWRzIHRvIG1hdGNoIHBlcmZlY3RseSB0aGUgSlNPTiBPYmplY3QgcG9zaXRpb24gYmVjYXVzZSBvZiB0aGUgd2F5IHdlIGFyZSBwdWxsaW5nIHRoZSBkYXRhLFxyXG4gICAqIHdoaWNoIG1lYW5zIHRoYXQgaWYgYW55IGNvbHVtbihzKSBnb3QgbW92ZWQgaW4gdGhlIFVJLCBpdCBoYXMgdG8gYmUgcmVmbGVjdGVkIGluIHRoZSBKU09OIGFycmF5IG91dHB1dCBhcyB3ZWxsXHJcbiAgICpcclxuICAgKiBFeGFtcGxlOiBleHBvcnRUb0ZpbGUoeyBmb3JtYXQ6IEZpbGVUeXBlLmNzdiwgZGVsaW1pdGVyOiBEZWxpbWl0ZXJUeXBlLmNvbW1hIH0pXHJcbiAgICovXHJcbiAgZXhwb3J0VG9GaWxlKG9wdGlvbnM6IEV4cG9ydE9wdGlvbikge1xyXG4gICAgdGhpcy5vbkdyaWRCZWZvcmVFeHBvcnRUb0ZpbGUubmV4dCh0cnVlKTtcclxuICAgIHRoaXMuX2V4cG9ydE9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBDU1Ygb3V0cHV0IGZyb20gdGhlIGdyaWQgZGF0YVxyXG4gICAgY29uc3QgZGF0YU91dHB1dCA9IHRoaXMuZ2V0RGF0YU91dHB1dCgpO1xyXG5cclxuICAgIC8vIHRyaWdnZXIgYSBkb3dubG9hZCBmaWxlXHJcbiAgICAvLyB3cmFwIGl0IGludG8gYSBzZXRUaW1lb3V0IHNvIHRoYXQgdGhlIEV2ZW50QWdncmVnYXRvciBoYXMgZW5vdWdoIHRpbWUgdG8gc3RhcnQgYSBwcmUtcHJvY2VzcyBsaWtlIHNob3dpbmcgYSBzcGlubmVyXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgZG93bmxvYWRPcHRpb25zID0ge1xyXG4gICAgICAgIGZpbGVuYW1lOiBgJHt0aGlzLl9leHBvcnRPcHRpb25zLmZpbGVuYW1lfS4ke3RoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0fWAsXHJcbiAgICAgICAgY3N2Q29udGVudDogZGF0YU91dHB1dCxcclxuICAgICAgICBmb3JtYXQ6IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0LFxyXG4gICAgICAgIHVzZVV0ZjhXaXRoQm9tOiB0aGlzLl9leHBvcnRPcHRpb25zLnVzZVV0ZjhXaXRoQm9tXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuc3RhcnREb3dubG9hZEZpbGUoZG93bmxvYWRPcHRpb25zKTtcclxuICAgICAgdGhpcy5vbkdyaWRBZnRlckV4cG9ydFRvRmlsZS5uZXh0KHsgb3B0aW9uczogZG93bmxvYWRPcHRpb25zIH0pO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgZ2V0RGF0YU91dHB1dCgpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIHx8IFtdO1xyXG4gICAgY29uc3QgZGVsaW1pdGVyID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5kZWxpbWl0ZXIgfHwgJyc7XHJcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdCB8fCAnJztcclxuICAgIGNvbnN0IGdyb3VwQnlDb2x1bW5IZWFkZXIgPSB0aGlzLl9leHBvcnRPcHRpb25zLmdyb3VwaW5nQ29sdW1uSGVhZGVyVGl0bGUgfHwgdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnR1JPVVBfQlknKTtcclxuXHJcbiAgICAvLyBhIENTViBuZWVkcyBkb3VibGUgcXVvdGVzIHdyYXBwZXIsIHRoZSBvdGhlciB0eXBlcyBkbyBub3QgbmVlZCBhbnkgd3JhcHBlclxyXG4gICAgdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyID0gKGZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSA/ICdcIicgOiAnJztcclxuXHJcbiAgICAvLyBkYXRhIHZhcmlhYmxlIHdoaWNoIHdpbGwgaG9sZCBhbGwgdGhlIGZpZWxkcyBkYXRhIG9mIGEgcm93XHJcbiAgICBsZXQgb3V0cHV0RGF0YVN0cmluZyA9ICcnO1xyXG5cclxuICAgIC8vIGdldCBncm91cGVkIGNvbHVtbiB0aXRsZXMgYW5kIGlmIGZvdW5kLCB3ZSB3aWxsIGFkZCBhIFwiR3JvdXAgYnlcIiBjb2x1bW4gYXQgdGhlIGZpcnN0IGNvbHVtbiBpbmRleFxyXG4gICAgY29uc3QgZ3JvdXBpbmcgPSB0aGlzLl9kYXRhVmlldy5nZXRHcm91cGluZygpO1xyXG4gICAgaWYgKGdyb3VwaW5nICYmIEFycmF5LmlzQXJyYXkoZ3JvdXBpbmcpICYmIGdyb3VwaW5nLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5faGFzR3JvdXBlZEl0ZW1zID0gdHJ1ZTtcclxuICAgICAgb3V0cHV0RGF0YVN0cmluZyArPSBgJHtncm91cEJ5Q29sdW1uSGVhZGVyfWAgKyBkZWxpbWl0ZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9oYXNHcm91cGVkSXRlbXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgYWxsIGNvbHVtbiBoZWFkZXJzXHJcbiAgICB0aGlzLl9jb2x1bW5IZWFkZXJzID0gdGhpcy5nZXRDb2x1bW5IZWFkZXJzKGNvbHVtbnMpIHx8IFtdO1xyXG4gICAgaWYgKHRoaXMuX2NvbHVtbkhlYWRlcnMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5IZWFkZXJzKSAmJiB0aGlzLl9jb2x1bW5IZWFkZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gYWRkIHRoZSBoZWFkZXIgcm93ICsgYWRkIGEgbmV3IGxpbmUgYXQgdGhlIGVuZCBvZiB0aGUgcm93XHJcbiAgICAgIGNvbnN0IG91dHB1dEhlYWRlclRpdGxlcyA9IHRoaXMuX2NvbHVtbkhlYWRlcnMubWFwKChoZWFkZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyICsgaGVhZGVyLnRpdGxlICsgdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyO1xyXG4gICAgICB9KTtcclxuICAgICAgb3V0cHV0RGF0YVN0cmluZyArPSAob3V0cHV0SGVhZGVyVGl0bGVzLmpvaW4oZGVsaW1pdGVyKSArIHRoaXMuX2xpbmVDYXJyaWFnZVJldHVybik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUG9wdWxhdGUgdGhlIHJlc3Qgb2YgdGhlIEdyaWQgRGF0YVxyXG4gICAgb3V0cHV0RGF0YVN0cmluZyArPSB0aGlzLmdldEFsbEdyaWRSb3dEYXRhKGNvbHVtbnMsIHRoaXMuX2xpbmVDYXJyaWFnZVJldHVybik7XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dERhdGFTdHJpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIHRoZSBncmlkIHJvdyBkYXRhIGFuZCByZXR1cm4gdGhhdCBhcyBhbiBvdXRwdXQgc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0QWxsR3JpZFJvd0RhdGEoY29sdW1uczogQ29sdW1uW10sIGxpbmVDYXJyaWFnZVJldHVybjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG91dHB1dERhdGFTdHJpbmdzID0gW107XHJcbiAgICBjb25zdCBsaW5lQ291bnQgPSB0aGlzLl9kYXRhVmlldy5nZXRMZW5ndGgoKTtcclxuXHJcbiAgICAvLyBsb29wIHRocm91Z2ggYWxsIHRoZSBncmlkIHJvd3Mgb2YgZGF0YVxyXG4gICAgZm9yIChsZXQgcm93TnVtYmVyID0gMDsgcm93TnVtYmVyIDwgbGluZUNvdW50OyByb3dOdW1iZXIrKykge1xyXG4gICAgICBjb25zdCBpdGVtT2JqID0gdGhpcy5fZGF0YVZpZXcuZ2V0SXRlbShyb3dOdW1iZXIpO1xyXG5cclxuICAgICAgaWYgKGl0ZW1PYmogIT0gbnVsbCkge1xyXG4gICAgICAgIC8vIE5vcm1hbCByb3cgKG5vdCBncm91cGVkIGJ5IGFueXRoaW5nKSB3b3VsZCBoYXZlIGFuIElEIHdoaWNoIHdhcyBwcmVkZWZpbmVkIGluIHRoZSBHcmlkIENvbHVtbnMgZGVmaW5pdGlvblxyXG4gICAgICAgIGlmIChpdGVtT2JqW3RoaXMuZGF0YXNldElkTmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgLy8gZ2V0IHJlZ3VsYXIgcm93IGl0ZW0gZGF0YVxyXG4gICAgICAgICAgb3V0cHV0RGF0YVN0cmluZ3MucHVzaCh0aGlzLnJlYWRSZWd1bGFyUm93RGF0YShjb2x1bW5zLCByb3dOdW1iZXIsIGl0ZW1PYmopKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc0dyb3VwZWRJdGVtcyAmJiBpdGVtT2JqLl9fZ3JvdXBUb3RhbHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgLy8gZ2V0IHRoZSBncm91cCByb3dcclxuICAgICAgICAgIG91dHB1dERhdGFTdHJpbmdzLnB1c2godGhpcy5yZWFkR3JvdXBlZFRpdGxlUm93KGl0ZW1PYmopKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1PYmouX19ncm91cFRvdGFscykge1xyXG4gICAgICAgICAgLy8gZWxzZSBpZiB0aGUgcm93IGlzIGEgR3JvdXAgQnkgYW5kIHdlIGhhdmUgYWdyZWdnYXRvcnMsIHRoZW4gYSBwcm9wZXJ0eSBvZiAnX19ncm91cFRvdGFscycgd291bGQgZXhpc3QgdW5kZXIgdGhhdCBvYmplY3RcclxuICAgICAgICAgIG91dHB1dERhdGFTdHJpbmdzLnB1c2godGhpcy5yZWFkR3JvdXBlZFRvdGFsUm93KGNvbHVtbnMsIGl0ZW1PYmopKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0cHV0RGF0YVN0cmluZ3Muam9pbih0aGlzLl9saW5lQ2FycmlhZ2VSZXR1cm4pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCBoZWFkZXIgdGl0bGVzIGFuZCB0aGVpciBrZXlzLCB0cmFuc2xhdGUgdGhlIHRpdGxlIHdoZW4gcmVxdWlyZWQuXHJcbiAgICogQHBhcmFtIGNvbHVtbnMgb2YgdGhlIGdyaWRcclxuICAgKi9cclxuICBnZXRDb2x1bW5IZWFkZXJzKGNvbHVtbnM6IENvbHVtbltdKTogRXhwb3J0Q29sdW1uSGVhZGVyW10ge1xyXG4gICAgaWYgKCFjb2x1bW5zIHx8ICFBcnJheS5pc0FycmF5KGNvbHVtbnMpIHx8IGNvbHVtbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29sdW1uSGVhZGVycyA9IFtdO1xyXG5cclxuICAgIC8vIFBvcHVsYXRlIHRoZSBDb2x1bW4gSGVhZGVyLCBwdWxsIHRoZSBuYW1lIGRlZmluZWRcclxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uRGVmKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IChjb2x1bW5EZWYuaGVhZGVyS2V5KSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoY29sdW1uRGVmLmhlYWRlcktleSkgOiBjb2x1bW5EZWYubmFtZTtcclxuICAgICAgY29uc3Qgc2tpcHBlZEZpZWxkID0gY29sdW1uRGVmLmV4Y2x1ZGVGcm9tRXhwb3J0IHx8IGZhbHNlO1xyXG5cclxuICAgICAgLy8gaWYgY29sdW1uIHdpZHRoIGlzIDAgdGhlbiBpdCdzIG5vdCBldmFsdWF0ZWQgc2luY2UgdGhhdCBmaWVsZCBpcyBjb25zaWRlcmVkIGhpZGRlbiBzaG91bGQgbm90IGJlIHBhcnQgb2YgdGhlIGV4cG9ydFxyXG4gICAgICBpZiAoKGNvbHVtbkRlZi53aWR0aCA9PT0gIHVuZGVmaW5lZCB8fCBjb2x1bW5EZWYud2lkdGggPiAwKSAmJiAhc2tpcHBlZEZpZWxkKSB7XHJcbiAgICAgICAgY29sdW1uSGVhZGVycy5wdXNoKHtcclxuICAgICAgICAgIGtleTogY29sdW1uRGVmLmZpZWxkIHx8IGNvbHVtbkRlZi5pZCxcclxuICAgICAgICAgIHRpdGxlOiBmaWVsZE5hbWVcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbHVtbkhlYWRlcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRhdGEgb2YgYSByZWd1bGFyIHJvdyAoYSByb3cgd2l0aG91dCBncm91cGluZylcclxuICAgKiBAcGFyYW0gcm93XHJcbiAgICogQHBhcmFtIGl0ZW1PYmpcclxuICAgKi9cclxuICByZWFkUmVndWxhclJvd0RhdGEoY29sdW1uczogQ29sdW1uW10sIHJvdzogbnVtYmVyLCBpdGVtT2JqOiBhbnkpIHtcclxuICAgIGxldCBpZHggPSAwO1xyXG4gICAgY29uc3Qgcm93T3V0cHV0U3RyaW5ncyA9IFtdO1xyXG4gICAgY29uc3QgZGVsaW1pdGVyID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5kZWxpbWl0ZXI7XHJcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdDtcclxuICAgIGNvbnN0IGV4cG9ydFF1b3RlV3JhcHBlciA9IHRoaXMuX2V4cG9ydFF1b3RlV3JhcHBlciB8fCAnJztcclxuXHJcbiAgICBmb3IgKGxldCBjb2wgPSAwLCBsbiA9IGNvbHVtbnMubGVuZ3RoOyBjb2wgPCBsbjsgY29sKyspIHtcclxuICAgICAgY29uc3QgY29sdW1uRGVmID0gY29sdW1uc1tjb2xdO1xyXG4gICAgICBjb25zdCBmaWVsZElkID0gY29sdW1uRGVmLmZpZWxkIHx8IGNvbHVtbkRlZi5pZCB8fCAnJztcclxuXHJcbiAgICAgIC8vIHNraXAgZXhjbHVkZWQgY29sdW1uXHJcbiAgICAgIGlmIChjb2x1bW5EZWYuZXhjbHVkZUZyb21FeHBvcnQpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiB3ZSBhcmUgZ3JvdXBpbmcgYW5kIGFyZSBvbiAxc3QgY29sdW1uIGluZGV4LCB3ZSBuZWVkIHRvIHNraXAgdGhpcyBjb2x1bW4gc2luY2UgaXQgd2lsbCBiZSB1c2VkIGxhdGVyIGJ5IHRoZSBncm91cGluZyB0ZXh0OjogR3JvdXAgYnkgW2NvbHVtblhdXHJcbiAgICAgIGlmICh0aGlzLl9oYXNHcm91cGVkSXRlbXMgJiYgaWR4ID09PSAwKSB7XHJcbiAgICAgICAgcm93T3V0cHV0U3RyaW5ncy5wdXNoKGBcIlwiYCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRvZXMgdGhlIHVzZXIgd2FudCB0byBldmFsdWF0ZSBjdXJyZW50IGNvbHVtbiBGb3JtYXR0ZXI/XHJcbiAgICAgIGNvbnN0IGlzRXZhbHVhdGluZ0Zvcm1hdHRlciA9IChjb2x1bW5EZWYuZXhwb3J0V2l0aEZvcm1hdHRlciAhPT0gdW5kZWZpbmVkKSA/IGNvbHVtbkRlZi5leHBvcnRXaXRoRm9ybWF0dGVyIDogdGhpcy5fZXhwb3J0T3B0aW9ucy5leHBvcnRXaXRoRm9ybWF0dGVyO1xyXG5cclxuICAgICAgLy8gZGlkIHRoZSB1c2VyIHByb3ZpZGUgYSBDdXN0b20gRm9ybWF0dGVyIGZvciB0aGUgZXhwb3J0XHJcbiAgICAgIGNvbnN0IGV4cG9ydEN1c3RvbUZvcm1hdHRlcjogRm9ybWF0dGVyID0gKGNvbHVtbkRlZi5leHBvcnRDdXN0b21Gb3JtYXR0ZXIgIT09IHVuZGVmaW5lZCkgPyBjb2x1bW5EZWYuZXhwb3J0Q3VzdG9tRm9ybWF0dGVyIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgbGV0IGl0ZW1EYXRhID0gJyc7XHJcblxyXG4gICAgICBpZiAoZXhwb3J0Q3VzdG9tRm9ybWF0dGVyKSB7XHJcbiAgICAgICAgaXRlbURhdGEgPSBleHBvcnRDdXN0b21Gb3JtYXR0ZXIocm93LCBjb2wsIGl0ZW1PYmpbZmllbGRJZF0sIGNvbHVtbkRlZiwgaXRlbU9iaiwgdGhpcy5fZ3JpZCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXNFdmFsdWF0aW5nRm9ybWF0dGVyICYmICEhY29sdW1uRGVmLmZvcm1hdHRlcikge1xyXG4gICAgICAgIGl0ZW1EYXRhID0gY29sdW1uRGVmLmZvcm1hdHRlcihyb3csIGNvbCwgaXRlbU9ialtmaWVsZElkXSwgY29sdW1uRGVmLCBpdGVtT2JqLCB0aGlzLl9ncmlkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpdGVtRGF0YSA9IChpdGVtT2JqW2ZpZWxkSWRdID09PSBudWxsIHx8IGl0ZW1PYmpbZmllbGRJZF0gPT09IHVuZGVmaW5lZCkgPyAnJyA6IGl0ZW1PYmpbZmllbGRJZF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRvZXMgdGhlIHVzZXIgd2FudCB0byBzYW5pdGl6ZSB0aGUgb3V0cHV0IGRhdGEgKHJlbW92ZSBIVE1MIHRhZ3MpP1xyXG4gICAgICBpZiAoY29sdW1uRGVmLnNhbml0aXplRGF0YUV4cG9ydCB8fCB0aGlzLl9leHBvcnRPcHRpb25zLnNhbml0aXplRGF0YUV4cG9ydCkge1xyXG4gICAgICAgIGl0ZW1EYXRhID0gc2FuaXRpemVIdG1sVG9UZXh0KGl0ZW1EYXRhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gd2hlbiBDU1Ygd2UgYWxzbyBuZWVkIHRvIGVzY2FwZSBkb3VibGUgcXVvdGVzIHR3aWNlLCBzbyBcIiBiZWNvbWVzIFwiXCJcclxuICAgICAgaWYgKGZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2ICYmIGl0ZW1EYXRhKSB7XHJcbiAgICAgICAgaXRlbURhdGEgPSBpdGVtRGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1wiL2dpLCBgXCJcImApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBkbyB3ZSBoYXZlIGEgd3JhcHBlciB0byBrZWVwIGFzIGEgc3RyaW5nPyBpbiBjZXJ0YWluIGNhc2VzIGxpa2UgXCIxRTA2XCIsIHdlIGRvbid0IHdhbnQgZXhjZWwgdG8gdHJhbnNmb3JtIGl0IGludG8gZXhwb25lbnRpYWwgKDEuMEUwNilcclxuICAgICAgLy8gdG8gY2FuY2VsIHRoYXQgZWZmZWN0IHdlIGNhbiBoYWQgPSBpbiBmcm9udCwgZXg6ID1cIjFFMDZcIlxyXG4gICAgICBjb25zdCBrZWVwQXNTdHJpbmdXcmFwcGVyID0gKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYuZXhwb3J0Q3N2Rm9yY2VUb0tlZXBBc1N0cmluZykgPyAnPScgOiAnJztcclxuXHJcbiAgICAgIHJvd091dHB1dFN0cmluZ3MucHVzaChrZWVwQXNTdHJpbmdXcmFwcGVyICsgZXhwb3J0UXVvdGVXcmFwcGVyICsgaXRlbURhdGEgKyBleHBvcnRRdW90ZVdyYXBwZXIpO1xyXG4gICAgICBpZHgrKztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm93T3V0cHV0U3RyaW5ncy5qb2luKGRlbGltaXRlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGdyb3VwZWQgdGl0bGUocyksIGZvciBleGFtcGxlIGlmIHdlIGdyb3VwZWQgYnkgc2FsZXNSZXAsIHRoZSByZXR1cm5lZCByZXN1bHQgd291bGQgYmU6OiAnU2FsZXMgUmVwJ1xyXG4gICAqIEBwYXJhbSBpdGVtT2JqXHJcbiAgICovXHJcbiAgcmVhZEdyb3VwZWRUaXRsZVJvdyhpdGVtT2JqOiBhbnkpIHtcclxuICAgIGxldCBncm91cE5hbWUgPSBzYW5pdGl6ZUh0bWxUb1RleHQoaXRlbU9iai50aXRsZSk7XHJcbiAgICBjb25zdCBleHBvcnRRdW90ZVdyYXBwZXIgPSB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgfHwgJyc7XHJcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdDtcclxuXHJcbiAgICBncm91cE5hbWUgPSBhZGRXaGl0ZVNwYWNlcyg1ICogaXRlbU9iai5sZXZlbCkgKyBncm91cE5hbWU7XHJcblxyXG4gICAgaWYgKGZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSB7XHJcbiAgICAgIC8vIHdoZW4gQ1NWIHdlIGFsc28gbmVlZCB0byBlc2NhcGUgZG91YmxlIHF1b3RlcyB0d2ljZSwgc28gXCIgYmVjb21lcyBcIlwiXHJcbiAgICAgIGdyb3VwTmFtZSA9IGdyb3VwTmFtZS50b1N0cmluZygpLnJlcGxhY2UoL1wiL2dpLCBgXCJcImApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGV4cG9ydFF1b3RlV3JhcHBlciArICcgJyArIGdyb3VwTmFtZSArIGV4cG9ydFF1b3RlV3JhcHBlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZ3JvdXBlZCB0b3RhbHMsIHRoZXNlIGFyZSBzZXQgYnkgU2xpY2sgQWdncmVnYXRvcnMuXHJcbiAgICogRm9yIGV4YW1wbGUgaWYgd2UgZ3JvdXBlZCBieSBcInNhbGVzUmVwXCIgYW5kIHdlIGhhdmUgYSBTdW0gQWdncmVnYXRvciBvbiBcInNhbGVzXCIsIHRoZW4gdGhlIHJldHVybmVkIG91dHB1dCB3b3VsZCBiZTo6IFtcIlN1bSAxMjMkXCJdXHJcbiAgICogQHBhcmFtIGl0ZW1PYmpcclxuICAgKi9cclxuICByZWFkR3JvdXBlZFRvdGFsUm93KGNvbHVtbnM6IENvbHVtbltdLCBpdGVtT2JqOiBhbnkpIHtcclxuICAgIGNvbnN0IGRlbGltaXRlciA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZGVsaW1pdGVyO1xyXG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXQ7XHJcbiAgICBjb25zdCBncm91cGluZ0FnZ3JlZ2F0b3JSb3dUZXh0ID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5ncm91cGluZ0FnZ3JlZ2F0b3JSb3dUZXh0IHx8ICcnO1xyXG4gICAgY29uc3QgZXhwb3J0UXVvdGVXcmFwcGVyID0gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyIHx8ICcnO1xyXG4gICAgY29uc3Qgb3V0cHV0U3RyaW5ncyA9IFtgJHtleHBvcnRRdW90ZVdyYXBwZXJ9JHtncm91cGluZ0FnZ3JlZ2F0b3JSb3dUZXh0fSR7ZXhwb3J0UXVvdGVXcmFwcGVyfWBdO1xyXG5cclxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uRGVmKSA9PiB7XHJcbiAgICAgIGxldCBpdGVtRGF0YSA9ICcnO1xyXG5cclxuICAgICAgLy8gaWYgdGhlcmUncyBhIGdyb3VwVG90YWxzRm9ybWF0dGVyLCB3ZSB3aWxsIHJlLXJ1biBpdCB0byBnZXQgdGhlIGV4YWN0IHNhbWUgb3V0cHV0IGFzIHdoYXQgaXMgc2hvd24gaW4gVUlcclxuICAgICAgaWYgKGNvbHVtbkRlZi5ncm91cFRvdGFsc0Zvcm1hdHRlcikge1xyXG4gICAgICAgIGl0ZW1EYXRhID0gY29sdW1uRGVmLmdyb3VwVG90YWxzRm9ybWF0dGVyKGl0ZW1PYmosIGNvbHVtbkRlZik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRvZXMgdGhlIHVzZXIgd2FudCB0byBzYW5pdGl6ZSB0aGUgb3V0cHV0IGRhdGEgKHJlbW92ZSBIVE1MIHRhZ3MpP1xyXG4gICAgICBpZiAoY29sdW1uRGVmLnNhbml0aXplRGF0YUV4cG9ydCB8fCB0aGlzLl9leHBvcnRPcHRpb25zLnNhbml0aXplRGF0YUV4cG9ydCkge1xyXG4gICAgICAgIGl0ZW1EYXRhID0gc2FuaXRpemVIdG1sVG9UZXh0KGl0ZW1EYXRhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSB7XHJcbiAgICAgICAgLy8gd2hlbiBDU1Ygd2UgYWxzbyBuZWVkIHRvIGVzY2FwZSBkb3VibGUgcXVvdGVzIHR3aWNlLCBzbyBhIGRvdWJsZSBxdW90ZSBcIiBiZWNvbWVzIDJ4IGRvdWJsZSBxdW90ZXMgXCJcIlxyXG4gICAgICAgIGl0ZW1EYXRhID0gaXRlbURhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cIi9naSwgYFwiXCJgKTtcclxuICAgICAgfVxyXG4gICAgICBvdXRwdXRTdHJpbmdzLnB1c2goZXhwb3J0UXVvdGVXcmFwcGVyICsgaXRlbURhdGEgKyBleHBvcnRRdW90ZVdyYXBwZXIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dFN0cmluZ3Muam9pbihkZWxpbWl0ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJpZ2dlcnMgZG93bmxvYWQgZmlsZSB3aXRoIGZpbGUgZm9ybWF0LlxyXG4gICAqIElFKDYtMTApIGFyZSBub3Qgc3VwcG9ydGVkXHJcbiAgICogQWxsIG90aGVyIGJyb3dzZXJzIHdpbGwgdXNlIHBsYWluIGphdmFzY3JpcHQgb24gY2xpZW50IHNpZGUgdG8gcHJvZHVjZSBhIGZpbGUgZG93bmxvYWQuXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKi9cclxuICBzdGFydERvd25sb2FkRmlsZShvcHRpb25zOiB7IGZpbGVuYW1lOiBzdHJpbmcsIGNzdkNvbnRlbnQ6IGFueSwgZm9ybWF0OiBGaWxlVHlwZSB8IHN0cmluZywgdXNlVXRmOFdpdGhCb206IGJvb2xlYW4gfSk6IHZvaWQge1xyXG4gICAgLy8gSUUoNi0xMCkgZG9uJ3Qgc3VwcG9ydCBqYXZhc2NyaXB0IGRvd25sb2FkIGFuZCBvdXIgc2VydmljZSBkb2Vzbid0IHN1cHBvcnQgZWl0aGVyIHNvIHRocm93IGFuIGVycm9yLCB3ZSBoYXZlIHRvIG1ha2UgYSByb3VuZCB0cmlwIHRvIHRoZSBXZWIgU2VydmVyIGZvciBleHBvcnRpbmdcclxuICAgIGlmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcicpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXIgNiB0byAxMCBkbyBub3Qgc3VwcG9ydCBqYXZhc2NyaXB0IGV4cG9ydCB0byBDU1YuIFBsZWFzZSB1cGdyYWRlIHlvdXIgYnJvd3Nlci4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgdGhlIGNvcnJlY3QgTUlNRSB0eXBlXHJcbiAgICBjb25zdCBtaW1lVHlwZSA9IChvcHRpb25zLmZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSA/ICd0ZXh0L2NzdicgOiAndGV4dC9wbGFpbic7XHJcblxyXG4gICAgLy8gbWFrZSBzdXJlIG5vIGh0bWwgZW50aXRpZXMgZXhpc3QgaW4gdGhlIGRhdGFcclxuICAgIGNvbnN0IGNzdkNvbnRlbnQgPSBodG1sRW50aXR5RGVjb2RlKG9wdGlvbnMuY3N2Q29udGVudCk7XHJcblxyXG4gICAgLy8gZGVhbGluZyB3aXRoIEV4Y2VsIENTViBleHBvcnQgYW5kIFVURi04IGlzIGEgbGl0dGxlIHRyaWNreS4uIFdlIHdpbGwgdXNlIE9wdGlvbiAjMiB0byBjb3ZlciBvbGRlciBFeGNlbCB2ZXJzaW9uc1xyXG4gICAgLy8gT3B0aW9uICMxOiB3ZSBuZWVkIHRvIG1ha2UgRXhjZWwga25vd2luZyB0aGF0IGl0J3MgZGVhbGluZyB3aXRoIGFuIFVURi04LCBBIGNvcnJlY3RseSBmb3JtYXR0ZWQgVVRGOCBmaWxlIGNhbiBoYXZlIGEgQnl0ZSBPcmRlciBNYXJrIGFzIGl0cyBmaXJzdCB0aHJlZSBvY3RldHNcclxuICAgIC8vIHJlZmVyZW5jZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNTUwOTcvbWljcm9zb2Z0LWV4Y2VsLW1hbmdsZXMtZGlhY3JpdGljcy1pbi1jc3YtZmlsZXNcclxuICAgIC8vIE9wdGlvbiMyOiB1c2UgYSAzcmQgcGFydHkgZXh0ZW5zaW9uIHRvIGphdmFzY3JpcHQgZW5jb2RlIGludG8gVVRGLTE2XHJcbiAgICBsZXQgb3V0cHV0RGF0YTogVWludDhBcnJheSB8IHN0cmluZztcclxuICAgIGlmIChvcHRpb25zLmZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSB7XHJcbiAgICAgIG91dHB1dERhdGEgPSBuZXcgVGV4dEVuY29kZXIoJ3V0Zi04JykuZW5jb2RlKGNzdkNvbnRlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0cHV0RGF0YSA9IGNzdkNvbnRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIGEgQmxvYiBvYmplY3QgZm9yIHRoZSBkb3dubG9hZFxyXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtvcHRpb25zLnVzZVV0ZjhXaXRoQm9tID8gJ1xcdUZFRkYnIDogJycsIG91dHB1dERhdGFdLCB7XHJcbiAgICAgIHR5cGU6IGAke21pbWVUeXBlfTtjaGFyc2V0PXV0Zi04O2BcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHdoZW4gdXNpbmcgSUUvRWRnZSwgdGhlbiB1c2UgZGlmZmVyZW50IGRvd25sb2FkIGNhbGxcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYmxvYiwgb3B0aW9ucy5maWxlbmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB0aGlzIHRyaWNrIHdpbGwgZ2VuZXJhdGUgYSB0ZW1wIDxhIC8+IHRhZ1xyXG4gICAgICAvLyB0aGUgY29kZSB3aWxsIHRoZW4gdHJpZ2dlciBhIGhpZGRlbiBjbGljayBmb3IgaXQgdG8gc3RhcnQgZG93bmxvYWRpbmdcclxuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgY29uc3QgY3N2VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcbiAgICAgIGxpbmsudGV4dENvbnRlbnQgPSAnZG93bmxvYWQnO1xyXG4gICAgICBsaW5rLmhyZWYgPSBjc3ZVcmw7XHJcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIG9wdGlvbnMuZmlsZW5hbWUpO1xyXG5cclxuICAgICAgLy8gc2V0IHRoZSB2aXNpYmlsaXR5IHRvIGhpZGRlbiBzbyB0aGVyZSBpcyBubyBlZmZlY3Qgb24geW91ciB3ZWItbGF5b3V0XHJcbiAgICAgIGxpbmsuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgLy8gdGhpcyBwYXJ0IHdpbGwgYXBwZW5kIHRoZSBhbmNob3IgdGFnLCB0cmlnZ2VyIGEgY2xpY2sgKGZvciBkb3dubG9hZCB0byBzdGFydCkgYW5kIGZpbmFsbHkgcmVtb3ZlIHRoZSB0YWcgb25jZSBjb21wbGV0ZWRcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcclxuICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=