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
var ExportService = /** @class */ (function () {
    function ExportService(translate) {
        this.translate = translate;
        this._lineCarriageReturn = '\n';
        this._hasGroupedItems = false;
        this.onGridBeforeExportToFile = new Subject();
        this.onGridAfterExportToFile = new Subject();
    }
    Object.defineProperty(ExportService.prototype, "datasetIdName", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._gridOptions && this._gridOptions.datasetIdPropertyName || 'id';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @private
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the Export Service
     * @param grid
     * @param gridOptions
     * @param dataView
     */
    /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    ExportService.prototype.init = /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    };
    /**
     * Function to export the Grid result to an Excel CSV format using javascript for it to produce the CSV file.
     * This is a WYSIWYG export to file output (What You See is What You Get)
     *
     * NOTES: The column position needs to match perfectly the JSON Object position because of the way we are pulling the data,
     * which means that if any column(s) got moved in the UI, it has to be reflected in the JSON array output as well
     *
     * Example: exportToFile({ format: FileType.csv, delimiter: DelimiterType.comma })
     */
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
    ExportService.prototype.exportToFile = /**
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
    function (options) {
        var _this = this;
        this.onGridBeforeExportToFile.next(true);
        this._exportOptions = $.extend(true, {}, this._gridOptions.exportOptions, options);
        // get the CSV output from the grid data
        /** @type {?} */
        var dataOutput = this.getDataOutput();
        // trigger a download file
        // wrap it into a setTimeout so that the EventAggregator has enough time to start a pre-process like showing a spinner
        setTimeout(function () {
            /** @type {?} */
            var downloadOptions = {
                filename: _this._exportOptions.filename + "." + _this._exportOptions.format,
                csvContent: dataOutput,
                format: _this._exportOptions.format,
                useUtf8WithBom: _this._exportOptions.useUtf8WithBom
            };
            _this.startDownloadFile(downloadOptions);
            _this.onGridAfterExportToFile.next({ options: downloadOptions });
        }, 0);
    };
    // -----------------------
    // Private functions
    // -----------------------
    // -----------------------
    // Private functions
    // -----------------------
    /**
     * @return {?}
     */
    ExportService.prototype.getDataOutput = 
    // -----------------------
    // Private functions
    // -----------------------
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var columns = this._grid.getColumns() || [];
        /** @type {?} */
        var delimiter = this._exportOptions.delimiter || '';
        /** @type {?} */
        var format = this._exportOptions.format || '';
        /** @type {?} */
        var groupByColumnHeader = this._exportOptions.groupingColumnHeaderTitle || this.translate.instant('GROUP_BY');
        // a CSV needs double quotes wrapper, the other types do not need any wrapper
        this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';
        // data variable which will hold all the fields data of a row
        /** @type {?} */
        var outputDataString = '';
        // get grouped column titles and if found, we will add a "Group by" column at the first column index
        /** @type {?} */
        var grouping = this._dataView.getGrouping();
        if (grouping && Array.isArray(grouping) && grouping.length > 0) {
            this._hasGroupedItems = true;
            outputDataString += "" + groupByColumnHeader + delimiter;
        }
        else {
            this._hasGroupedItems = false;
        }
        // get all column headers
        this._columnHeaders = this.getColumnHeaders(columns) || [];
        if (this._columnHeaders && Array.isArray(this._columnHeaders) && this._columnHeaders.length > 0) {
            // add the header row + add a new line at the end of the row
            /** @type {?} */
            var outputHeaderTitles = this._columnHeaders.map(function (header) {
                return _this._exportQuoteWrapper + header.title + _this._exportQuoteWrapper;
            });
            outputDataString += (outputHeaderTitles.join(delimiter) + this._lineCarriageReturn);
        }
        // Populate the rest of the Grid Data
        outputDataString += this.getAllGridRowData(columns, this._lineCarriageReturn);
        return outputDataString;
    };
    /**
     * Get all the grid row data and return that as an output string
     */
    /**
     * Get all the grid row data and return that as an output string
     * @param {?} columns
     * @param {?} lineCarriageReturn
     * @return {?}
     */
    ExportService.prototype.getAllGridRowData = /**
     * Get all the grid row data and return that as an output string
     * @param {?} columns
     * @param {?} lineCarriageReturn
     * @return {?}
     */
    function (columns, lineCarriageReturn) {
        /** @type {?} */
        var outputDataStrings = [];
        /** @type {?} */
        var lineCount = this._dataView.getLength();
        // loop through all the grid rows of data
        for (var rowNumber = 0; rowNumber < lineCount; rowNumber++) {
            /** @type {?} */
            var itemObj = this._dataView.getItem(rowNumber);
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
    };
    /**
     * Get all header titles and their keys, translate the title when required.
     * @param columns of the grid
     */
    /**
     * Get all header titles and their keys, translate the title when required.
     * @param {?} columns of the grid
     * @return {?}
     */
    ExportService.prototype.getColumnHeaders = /**
     * Get all header titles and their keys, translate the title when required.
     * @param {?} columns of the grid
     * @return {?}
     */
    function (columns) {
        var _this = this;
        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return null;
        }
        /** @type {?} */
        var columnHeaders = [];
        // Populate the Column Header, pull the name defined
        columns.forEach(function (columnDef) {
            /** @type {?} */
            var fieldName = (columnDef.headerKey) ? _this.translate.instant(columnDef.headerKey) : columnDef.name;
            /** @type {?} */
            var skippedField = columnDef.excludeFromExport || false;
            // if column width is 0 then it's not evaluated since that field is considered hidden should not be part of the export
            if ((columnDef.width === undefined || columnDef.width > 0) && !skippedField) {
                columnHeaders.push({
                    key: columnDef.field || columnDef.id,
                    title: fieldName
                });
            }
        });
        return columnHeaders;
    };
    /**
     * Get the data of a regular row (a row without grouping)
     * @param row
     * @param itemObj
     */
    /**
     * Get the data of a regular row (a row without grouping)
     * @param {?} columns
     * @param {?} row
     * @param {?} itemObj
     * @return {?}
     */
    ExportService.prototype.readRegularRowData = /**
     * Get the data of a regular row (a row without grouping)
     * @param {?} columns
     * @param {?} row
     * @param {?} itemObj
     * @return {?}
     */
    function (columns, row, itemObj) {
        /** @type {?} */
        var idx = 0;
        /** @type {?} */
        var rowOutputStrings = [];
        /** @type {?} */
        var delimiter = this._exportOptions.delimiter;
        /** @type {?} */
        var format = this._exportOptions.format;
        /** @type {?} */
        var exportQuoteWrapper = this._exportQuoteWrapper || '';
        for (var col = 0, ln = columns.length; col < ln; col++) {
            /** @type {?} */
            var columnDef = columns[col];
            /** @type {?} */
            var fieldId = columnDef.field || columnDef.id || '';
            // skip excluded column
            if (columnDef.excludeFromExport) {
                continue;
            }
            // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
            if (this._hasGroupedItems && idx === 0) {
                rowOutputStrings.push("\"\"");
            }
            // does the user want to evaluate current column Formatter?
            /** @type {?} */
            var isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._exportOptions.exportWithFormatter;
            // did the user provide a Custom Formatter for the export
            /** @type {?} */
            var exportCustomFormatter = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;
            /** @type {?} */
            var itemData = '';
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
                itemData = itemData.toString().replace(/"/gi, "\"\"");
            }
            // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
            // to cancel that effect we can had = in front, ex: ="1E06"
            /** @type {?} */
            var keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
            rowOutputStrings.push(keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper);
            idx++;
        }
        return rowOutputStrings.join(delimiter);
    };
    /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param itemObj
     */
    /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param {?} itemObj
     * @return {?}
     */
    ExportService.prototype.readGroupedTitleRow = /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param {?} itemObj
     * @return {?}
     */
    function (itemObj) {
        /** @type {?} */
        var groupName = sanitizeHtmlToText(itemObj.title);
        /** @type {?} */
        var exportQuoteWrapper = this._exportQuoteWrapper || '';
        /** @type {?} */
        var format = this._exportOptions.format;
        groupName = addWhiteSpaces(5 * itemObj.level) + groupName;
        if (format === FileType.csv) {
            // when CSV we also need to escape double quotes twice, so " becomes ""
            groupName = groupName.toString().replace(/"/gi, "\"\"");
        }
        return exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper;
    };
    /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param itemObj
     */
    /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param {?} columns
     * @param {?} itemObj
     * @return {?}
     */
    ExportService.prototype.readGroupedTotalRow = /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param {?} columns
     * @param {?} itemObj
     * @return {?}
     */
    function (columns, itemObj) {
        var _this = this;
        /** @type {?} */
        var delimiter = this._exportOptions.delimiter;
        /** @type {?} */
        var format = this._exportOptions.format;
        /** @type {?} */
        var groupingAggregatorRowText = this._exportOptions.groupingAggregatorRowText || '';
        /** @type {?} */
        var exportQuoteWrapper = this._exportQuoteWrapper || '';
        /** @type {?} */
        var outputStrings = ["" + exportQuoteWrapper + groupingAggregatorRowText + exportQuoteWrapper];
        columns.forEach(function (columnDef) {
            /** @type {?} */
            var itemData = '';
            // if there's a groupTotalsFormatter, we will re-run it to get the exact same output as what is shown in UI
            if (columnDef.groupTotalsFormatter) {
                itemData = columnDef.groupTotalsFormatter(itemObj, columnDef);
            }
            // does the user want to sanitize the output data (remove HTML tags)?
            if (columnDef.sanitizeDataExport || _this._exportOptions.sanitizeDataExport) {
                itemData = sanitizeHtmlToText(itemData);
            }
            if (format === FileType.csv) {
                // when CSV we also need to escape double quotes twice, so a double quote " becomes 2x double quotes ""
                itemData = itemData.toString().replace(/"/gi, "\"\"");
            }
            outputStrings.push(exportQuoteWrapper + itemData + exportQuoteWrapper);
        });
        return outputStrings.join(delimiter);
    };
    /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param options
     */
    /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param {?} options
     * @return {?}
     */
    ExportService.prototype.startDownloadFile = /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param {?} options
     * @return {?}
     */
    function (options) {
        // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
        if (navigator.appName === 'Microsoft Internet Explorer') {
            throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
        }
        // set the correct MIME type
        /** @type {?} */
        var mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';
        // make sure no html entities exist in the data
        /** @type {?} */
        var csvContent = htmlEntityDecode(options.csvContent);
        // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
        // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
        // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
        // Option#2: use a 3rd party extension to javascript encode into UTF-16
        /** @type {?} */
        var outputData;
        if (options.format === FileType.csv) {
            outputData = new TextEncoder('utf-8').encode(csvContent);
        }
        else {
            outputData = csvContent;
        }
        // create a Blob object for the download
        /** @type {?} */
        var blob = new Blob([options.useUtf8WithBom ? '\uFEFF' : '', outputData], {
            type: mimeType + ";charset=utf-8;"
        });
        // when using IE/Edge, then use different download call
        if (typeof navigator.msSaveOrOpenBlob === 'function') {
            navigator.msSaveOrOpenBlob(blob, options.filename);
        }
        else {
            // this trick will generate a temp <a /> tag
            // the code will then trigger a hidden click for it to start downloading
            /** @type {?} */
            var link = document.createElement('a');
            /** @type {?} */
            var csvUrl = URL.createObjectURL(blob);
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
    };
    ExportService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ExportService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    return ExportService;
}());
export { ExportService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4cG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxRQUFRLEVBR1QsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0YsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFLbEQsd0NBR0M7OztJQUZDLGlDQUFZOztJQUNaLG1DQUFjOztBQUdoQjtJQWFFLHVCQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVh2Qyx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFNM0IscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRWpDLDZCQUF3QixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDbEQsNEJBQXVCLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7SUFFUCxDQUFDO0lBRXBELHNCQUFZLHdDQUFhOzs7OztRQUF6QjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUdELHNCQUFZLHVDQUFZO1FBRHhCLGlFQUFpRTs7Ozs7O1FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUss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RSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFaEQsd0VBQXdFO1lBQ3hFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztZQUVqQywwSEFBMEg7WUFDMUgsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOztnQkE3VUYsVUFBVTs7OztnQkFwQkYsZ0JBQWdCOztJQWtXekIsb0JBQUM7Q0FBQSxBQTlVRCxJQThVQztTQTdVWSxhQUFhOzs7Ozs7SUFDeEIsNENBQW1DOzs7OztJQUNuQyxrQ0FBdUI7Ozs7O0lBQ3ZCLDhCQUFtQjs7Ozs7SUFDbkIsNENBQW9DOzs7OztJQUNwQyx1Q0FBNkM7Ozs7O0lBQzdDLHdDQUE4Qzs7Ozs7SUFDOUMseUNBQWlDOzs7OztJQUNqQyx1Q0FBcUM7O0lBQ3JDLGlEQUFrRDs7SUFDbEQsZ0RBQTBEOzs7OztJQUU5QyxrQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgRXhwb3J0T3B0aW9uLFxyXG4gIEZpbGVUeXBlLFxyXG4gIEZvcm1hdHRlcixcclxuICBHcmlkT3B0aW9uXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBhZGRXaGl0ZVNwYWNlcywgaHRtbEVudGl0eURlY29kZSwgc2FuaXRpemVIdG1sVG9UZXh0IH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFRleHRFbmNvZGVyIH0gZnJvbSAndGV4dC1lbmNvZGluZy11dGYtOCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhwb3J0Q29sdW1uSGVhZGVyIHtcclxuICBrZXk6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFeHBvcnRTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9saW5lQ2FycmlhZ2VSZXR1cm4gPSAnXFxuJztcclxuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xyXG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcclxuICBwcml2YXRlIF9leHBvcnRRdW90ZVdyYXBwZXI6IHN0cmluZztcclxuICBwcml2YXRlIF9jb2x1bW5IZWFkZXJzOiBFeHBvcnRDb2x1bW5IZWFkZXJbXTtcclxuICBwcml2YXRlIF9ncm91cGVkSGVhZGVyczogRXhwb3J0Q29sdW1uSGVhZGVyW107XHJcbiAgcHJpdmF0ZSBfaGFzR3JvdXBlZEl0ZW1zID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfZXhwb3J0T3B0aW9uczogRXhwb3J0T3B0aW9uO1xyXG4gIG9uR3JpZEJlZm9yZUV4cG9ydFRvRmlsZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XHJcbiAgb25HcmlkQWZ0ZXJFeHBvcnRUb0ZpbGUgPSBuZXcgU3ViamVjdDx7IG9wdGlvbnM6IGFueSB9PigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IGRhdGFzZXRJZE5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5kYXRhc2V0SWRQcm9wZXJ0eU5hbWUgfHwgJ2lkJztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRXhwb3J0IFNlcnZpY2VcclxuICAgKiBAcGFyYW0gZ3JpZFxyXG4gICAqIEBwYXJhbSBncmlkT3B0aW9uc1xyXG4gICAqIEBwYXJhbSBkYXRhVmlld1xyXG4gICAqL1xyXG4gIGluaXQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0byBleHBvcnQgdGhlIEdyaWQgcmVzdWx0IHRvIGFuIEV4Y2VsIENTViBmb3JtYXQgdXNpbmcgamF2YXNjcmlwdCBmb3IgaXQgdG8gcHJvZHVjZSB0aGUgQ1NWIGZpbGUuXHJcbiAgICogVGhpcyBpcyBhIFdZU0lXWUcgZXhwb3J0IHRvIGZpbGUgb3V0cHV0IChXaGF0IFlvdSBTZWUgaXMgV2hhdCBZb3UgR2V0KVxyXG4gICAqXHJcbiAgICogTk9URVM6IFRoZSBjb2x1bW4gcG9zaXRpb24gbmVlZHMgdG8gbWF0Y2ggcGVyZmVjdGx5IHRoZSBKU09OIE9iamVjdCBwb3NpdGlvbiBiZWNhdXNlIG9mIHRoZSB3YXkgd2UgYXJlIHB1bGxpbmcgdGhlIGRhdGEsXHJcbiAgICogd2hpY2ggbWVhbnMgdGhhdCBpZiBhbnkgY29sdW1uKHMpIGdvdCBtb3ZlZCBpbiB0aGUgVUksIGl0IGhhcyB0byBiZSByZWZsZWN0ZWQgaW4gdGhlIEpTT04gYXJyYXkgb3V0cHV0IGFzIHdlbGxcclxuICAgKlxyXG4gICAqIEV4YW1wbGU6IGV4cG9ydFRvRmlsZSh7IGZvcm1hdDogRmlsZVR5cGUuY3N2LCBkZWxpbWl0ZXI6IERlbGltaXRlclR5cGUuY29tbWEgfSlcclxuICAgKi9cclxuICBleHBvcnRUb0ZpbGUob3B0aW9uczogRXhwb3J0T3B0aW9uKSB7XHJcbiAgICB0aGlzLm9uR3JpZEJlZm9yZUV4cG9ydFRvRmlsZS5uZXh0KHRydWUpO1xyXG4gICAgdGhpcy5fZXhwb3J0T3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIENTViBvdXRwdXQgZnJvbSB0aGUgZ3JpZCBkYXRhXHJcbiAgICBjb25zdCBkYXRhT3V0cHV0ID0gdGhpcy5nZXREYXRhT3V0cHV0KCk7XHJcblxyXG4gICAgLy8gdHJpZ2dlciBhIGRvd25sb2FkIGZpbGVcclxuICAgIC8vIHdyYXAgaXQgaW50byBhIHNldFRpbWVvdXQgc28gdGhhdCB0aGUgRXZlbnRBZ2dyZWdhdG9yIGhhcyBlbm91Z2ggdGltZSB0byBzdGFydCBhIHByZS1wcm9jZXNzIGxpa2Ugc2hvd2luZyBhIHNwaW5uZXJcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjb25zdCBkb3dubG9hZE9wdGlvbnMgPSB7XHJcbiAgICAgICAgZmlsZW5hbWU6IGAke3RoaXMuX2V4cG9ydE9wdGlvbnMuZmlsZW5hbWV9LiR7dGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXR9YCxcclxuICAgICAgICBjc3ZDb250ZW50OiBkYXRhT3V0cHV0LFxyXG4gICAgICAgIGZvcm1hdDogdGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXQsXHJcbiAgICAgICAgdXNlVXRmOFdpdGhCb206IHRoaXMuX2V4cG9ydE9wdGlvbnMudXNlVXRmOFdpdGhCb21cclxuICAgICAgfTtcclxuICAgICAgdGhpcy5zdGFydERvd25sb2FkRmlsZShkb3dubG9hZE9wdGlvbnMpO1xyXG4gICAgICB0aGlzLm9uR3JpZEFmdGVyRXhwb3J0VG9GaWxlLm5leHQoeyBvcHRpb25zOiBkb3dubG9hZE9wdGlvbnMgfSk7XHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBnZXREYXRhT3V0cHV0KCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgfHwgW107XHJcbiAgICBjb25zdCBkZWxpbWl0ZXIgPSB0aGlzLl9leHBvcnRPcHRpb25zLmRlbGltaXRlciB8fCAnJztcclxuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0IHx8ICcnO1xyXG4gICAgY29uc3QgZ3JvdXBCeUNvbHVtbkhlYWRlciA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZ3JvdXBpbmdDb2x1bW5IZWFkZXJUaXRsZSB8fCB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdHUk9VUF9CWScpO1xyXG5cclxuICAgIC8vIGEgQ1NWIG5lZWRzIGRvdWJsZSBxdW90ZXMgd3JhcHBlciwgdGhlIG90aGVyIHR5cGVzIGRvIG5vdCBuZWVkIGFueSB3cmFwcGVyXHJcbiAgICB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgPSAoZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YpID8gJ1wiJyA6ICcnO1xyXG5cclxuICAgIC8vIGRhdGEgdmFyaWFibGUgd2hpY2ggd2lsbCBob2xkIGFsbCB0aGUgZmllbGRzIGRhdGEgb2YgYSByb3dcclxuICAgIGxldCBvdXRwdXREYXRhU3RyaW5nID0gJyc7XHJcblxyXG4gICAgLy8gZ2V0IGdyb3VwZWQgY29sdW1uIHRpdGxlcyBhbmQgaWYgZm91bmQsIHdlIHdpbGwgYWRkIGEgXCJHcm91cCBieVwiIGNvbHVtbiBhdCB0aGUgZmlyc3QgY29sdW1uIGluZGV4XHJcbiAgICBjb25zdCBncm91cGluZyA9IHRoaXMuX2RhdGFWaWV3LmdldEdyb3VwaW5nKCk7XHJcbiAgICBpZiAoZ3JvdXBpbmcgJiYgQXJyYXkuaXNBcnJheShncm91cGluZykgJiYgZ3JvdXBpbmcubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLl9oYXNHcm91cGVkSXRlbXMgPSB0cnVlO1xyXG4gICAgICBvdXRwdXREYXRhU3RyaW5nICs9IGAke2dyb3VwQnlDb2x1bW5IZWFkZXJ9YCArIGRlbGltaXRlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2hhc0dyb3VwZWRJdGVtcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldCBhbGwgY29sdW1uIGhlYWRlcnNcclxuICAgIHRoaXMuX2NvbHVtbkhlYWRlcnMgPSB0aGlzLmdldENvbHVtbkhlYWRlcnMoY29sdW1ucykgfHwgW107XHJcbiAgICBpZiAodGhpcy5fY29sdW1uSGVhZGVycyAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2NvbHVtbkhlYWRlcnMpICYmIHRoaXMuX2NvbHVtbkhlYWRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyBhZGQgdGhlIGhlYWRlciByb3cgKyBhZGQgYSBuZXcgbGluZSBhdCB0aGUgZW5kIG9mIHRoZSByb3dcclxuICAgICAgY29uc3Qgb3V0cHV0SGVhZGVyVGl0bGVzID0gdGhpcy5fY29sdW1uSGVhZGVycy5tYXAoKGhlYWRlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgKyBoZWFkZXIudGl0bGUgKyB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXI7XHJcbiAgICAgIH0pO1xyXG4gICAgICBvdXRwdXREYXRhU3RyaW5nICs9IChvdXRwdXRIZWFkZXJUaXRsZXMuam9pbihkZWxpbWl0ZXIpICsgdGhpcy5fbGluZUNhcnJpYWdlUmV0dXJuKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQb3B1bGF0ZSB0aGUgcmVzdCBvZiB0aGUgR3JpZCBEYXRhXHJcbiAgICBvdXRwdXREYXRhU3RyaW5nICs9IHRoaXMuZ2V0QWxsR3JpZFJvd0RhdGEoY29sdW1ucywgdGhpcy5fbGluZUNhcnJpYWdlUmV0dXJuKTtcclxuXHJcbiAgICByZXR1cm4gb3V0cHV0RGF0YVN0cmluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbGwgdGhlIGdyaWQgcm93IGRhdGEgYW5kIHJldHVybiB0aGF0IGFzIGFuIG91dHB1dCBzdHJpbmdcclxuICAgKi9cclxuICBnZXRBbGxHcmlkUm93RGF0YShjb2x1bW5zOiBDb2x1bW5bXSwgbGluZUNhcnJpYWdlUmV0dXJuOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3V0cHV0RGF0YVN0cmluZ3MgPSBbXTtcclxuICAgIGNvbnN0IGxpbmVDb3VudCA9IHRoaXMuX2RhdGFWaWV3LmdldExlbmd0aCgpO1xyXG5cclxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIGdyaWQgcm93cyBvZiBkYXRhXHJcbiAgICBmb3IgKGxldCByb3dOdW1iZXIgPSAwOyByb3dOdW1iZXIgPCBsaW5lQ291bnQ7IHJvd051bWJlcisrKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1PYmogPSB0aGlzLl9kYXRhVmlldy5nZXRJdGVtKHJvd051bWJlcik7XHJcblxyXG4gICAgICBpZiAoaXRlbU9iaiAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gTm9ybWFsIHJvdyAobm90IGdyb3VwZWQgYnkgYW55dGhpbmcpIHdvdWxkIGhhdmUgYW4gSUQgd2hpY2ggd2FzIHByZWRlZmluZWQgaW4gdGhlIEdyaWQgQ29sdW1ucyBkZWZpbml0aW9uXHJcbiAgICAgICAgaWYgKGl0ZW1PYmpbdGhpcy5kYXRhc2V0SWROYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAvLyBnZXQgcmVndWxhciByb3cgaXRlbSBkYXRhXHJcbiAgICAgICAgICBvdXRwdXREYXRhU3RyaW5ncy5wdXNoKHRoaXMucmVhZFJlZ3VsYXJSb3dEYXRhKGNvbHVtbnMsIHJvd051bWJlciwgaXRlbU9iaikpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzR3JvdXBlZEl0ZW1zICYmIGl0ZW1PYmouX19ncm91cFRvdGFscyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAvLyBnZXQgdGhlIGdyb3VwIHJvd1xyXG4gICAgICAgICAgb3V0cHV0RGF0YVN0cmluZ3MucHVzaCh0aGlzLnJlYWRHcm91cGVkVGl0bGVSb3coaXRlbU9iaikpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbU9iai5fX2dyb3VwVG90YWxzKSB7XHJcbiAgICAgICAgICAvLyBlbHNlIGlmIHRoZSByb3cgaXMgYSBHcm91cCBCeSBhbmQgd2UgaGF2ZSBhZ3JlZ2dhdG9ycywgdGhlbiBhIHByb3BlcnR5IG9mICdfX2dyb3VwVG90YWxzJyB3b3VsZCBleGlzdCB1bmRlciB0aGF0IG9iamVjdFxyXG4gICAgICAgICAgb3V0cHV0RGF0YVN0cmluZ3MucHVzaCh0aGlzLnJlYWRHcm91cGVkVG90YWxSb3coY29sdW1ucywgaXRlbU9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXRwdXREYXRhU3RyaW5ncy5qb2luKHRoaXMuX2xpbmVDYXJyaWFnZVJldHVybik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIGhlYWRlciB0aXRsZXMgYW5kIHRoZWlyIGtleXMsIHRyYW5zbGF0ZSB0aGUgdGl0bGUgd2hlbiByZXF1aXJlZC5cclxuICAgKiBAcGFyYW0gY29sdW1ucyBvZiB0aGUgZ3JpZFxyXG4gICAqL1xyXG4gIGdldENvbHVtbkhlYWRlcnMoY29sdW1uczogQ29sdW1uW10pOiBFeHBvcnRDb2x1bW5IZWFkZXJbXSB7XHJcbiAgICBpZiAoIWNvbHVtbnMgfHwgIUFycmF5LmlzQXJyYXkoY29sdW1ucykgfHwgY29sdW1ucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb2x1bW5IZWFkZXJzID0gW107XHJcblxyXG4gICAgLy8gUG9wdWxhdGUgdGhlIENvbHVtbiBIZWFkZXIsIHB1bGwgdGhlIG5hbWUgZGVmaW5lZFxyXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW5EZWYpID0+IHtcclxuICAgICAgY29uc3QgZmllbGROYW1lID0gKGNvbHVtbkRlZi5oZWFkZXJLZXkpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChjb2x1bW5EZWYuaGVhZGVyS2V5KSA6IGNvbHVtbkRlZi5uYW1lO1xyXG4gICAgICBjb25zdCBza2lwcGVkRmllbGQgPSBjb2x1bW5EZWYuZXhjbHVkZUZyb21FeHBvcnQgfHwgZmFsc2U7XHJcblxyXG4gICAgICAvLyBpZiBjb2x1bW4gd2lkdGggaXMgMCB0aGVuIGl0J3Mgbm90IGV2YWx1YXRlZCBzaW5jZSB0aGF0IGZpZWxkIGlzIGNvbnNpZGVyZWQgaGlkZGVuIHNob3VsZCBub3QgYmUgcGFydCBvZiB0aGUgZXhwb3J0XHJcbiAgICAgIGlmICgoY29sdW1uRGVmLndpZHRoID09PSAgdW5kZWZpbmVkIHx8IGNvbHVtbkRlZi53aWR0aCA+IDApICYmICFza2lwcGVkRmllbGQpIHtcclxuICAgICAgICBjb2x1bW5IZWFkZXJzLnB1c2goe1xyXG4gICAgICAgICAga2V5OiBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLmlkLFxyXG4gICAgICAgICAgdGl0bGU6IGZpZWxkTmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY29sdW1uSGVhZGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZGF0YSBvZiBhIHJlZ3VsYXIgcm93IChhIHJvdyB3aXRob3V0IGdyb3VwaW5nKVxyXG4gICAqIEBwYXJhbSByb3dcclxuICAgKiBAcGFyYW0gaXRlbU9ialxyXG4gICAqL1xyXG4gIHJlYWRSZWd1bGFyUm93RGF0YShjb2x1bW5zOiBDb2x1bW5bXSwgcm93OiBudW1iZXIsIGl0ZW1PYmo6IGFueSkge1xyXG4gICAgbGV0IGlkeCA9IDA7XHJcbiAgICBjb25zdCByb3dPdXRwdXRTdHJpbmdzID0gW107XHJcbiAgICBjb25zdCBkZWxpbWl0ZXIgPSB0aGlzLl9leHBvcnRPcHRpb25zLmRlbGltaXRlcjtcclxuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0O1xyXG4gICAgY29uc3QgZXhwb3J0UXVvdGVXcmFwcGVyID0gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyIHx8ICcnO1xyXG5cclxuICAgIGZvciAobGV0IGNvbCA9IDAsIGxuID0gY29sdW1ucy5sZW5ndGg7IGNvbCA8IGxuOyBjb2wrKykge1xyXG4gICAgICBjb25zdCBjb2x1bW5EZWYgPSBjb2x1bW5zW2NvbF07XHJcbiAgICAgIGNvbnN0IGZpZWxkSWQgPSBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLmlkIHx8ICcnO1xyXG5cclxuICAgICAgLy8gc2tpcCBleGNsdWRlZCBjb2x1bW5cclxuICAgICAgaWYgKGNvbHVtbkRlZi5leGNsdWRlRnJvbUV4cG9ydCkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIHdlIGFyZSBncm91cGluZyBhbmQgYXJlIG9uIDFzdCBjb2x1bW4gaW5kZXgsIHdlIG5lZWQgdG8gc2tpcCB0aGlzIGNvbHVtbiBzaW5jZSBpdCB3aWxsIGJlIHVzZWQgbGF0ZXIgYnkgdGhlIGdyb3VwaW5nIHRleHQ6OiBHcm91cCBieSBbY29sdW1uWF1cclxuICAgICAgaWYgKHRoaXMuX2hhc0dyb3VwZWRJdGVtcyAmJiBpZHggPT09IDApIHtcclxuICAgICAgICByb3dPdXRwdXRTdHJpbmdzLnB1c2goYFwiXCJgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZG9lcyB0aGUgdXNlciB3YW50IHRvIGV2YWx1YXRlIGN1cnJlbnQgY29sdW1uIEZvcm1hdHRlcj9cclxuICAgICAgY29uc3QgaXNFdmFsdWF0aW5nRm9ybWF0dGVyID0gKGNvbHVtbkRlZi5leHBvcnRXaXRoRm9ybWF0dGVyICE9PSB1bmRlZmluZWQpID8gY29sdW1uRGVmLmV4cG9ydFdpdGhGb3JtYXR0ZXIgOiB0aGlzLl9leHBvcnRPcHRpb25zLmV4cG9ydFdpdGhGb3JtYXR0ZXI7XHJcblxyXG4gICAgICAvLyBkaWQgdGhlIHVzZXIgcHJvdmlkZSBhIEN1c3RvbSBGb3JtYXR0ZXIgZm9yIHRoZSBleHBvcnRcclxuICAgICAgY29uc3QgZXhwb3J0Q3VzdG9tRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAoY29sdW1uRGVmLmV4cG9ydEN1c3RvbUZvcm1hdHRlciAhPT0gdW5kZWZpbmVkKSA/IGNvbHVtbkRlZi5leHBvcnRDdXN0b21Gb3JtYXR0ZXIgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICBsZXQgaXRlbURhdGEgPSAnJztcclxuXHJcbiAgICAgIGlmIChleHBvcnRDdXN0b21Gb3JtYXR0ZXIpIHtcclxuICAgICAgICBpdGVtRGF0YSA9IGV4cG9ydEN1c3RvbUZvcm1hdHRlcihyb3csIGNvbCwgaXRlbU9ialtmaWVsZElkXSwgY29sdW1uRGVmLCBpdGVtT2JqLCB0aGlzLl9ncmlkKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0V2YWx1YXRpbmdGb3JtYXR0ZXIgJiYgISFjb2x1bW5EZWYuZm9ybWF0dGVyKSB7XHJcbiAgICAgICAgaXRlbURhdGEgPSBjb2x1bW5EZWYuZm9ybWF0dGVyKHJvdywgY29sLCBpdGVtT2JqW2ZpZWxkSWRdLCBjb2x1bW5EZWYsIGl0ZW1PYmosIHRoaXMuX2dyaWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGl0ZW1EYXRhID0gKGl0ZW1PYmpbZmllbGRJZF0gPT09IG51bGwgfHwgaXRlbU9ialtmaWVsZElkXSA9PT0gdW5kZWZpbmVkKSA/ICcnIDogaXRlbU9ialtmaWVsZElkXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZG9lcyB0aGUgdXNlciB3YW50IHRvIHNhbml0aXplIHRoZSBvdXRwdXQgZGF0YSAocmVtb3ZlIEhUTUwgdGFncyk/XHJcbiAgICAgIGlmIChjb2x1bW5EZWYuc2FuaXRpemVEYXRhRXhwb3J0IHx8IHRoaXMuX2V4cG9ydE9wdGlvbnMuc2FuaXRpemVEYXRhRXhwb3J0KSB7XHJcbiAgICAgICAgaXRlbURhdGEgPSBzYW5pdGl6ZUh0bWxUb1RleHQoaXRlbURhdGEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB3aGVuIENTViB3ZSBhbHNvIG5lZWQgdG8gZXNjYXBlIGRvdWJsZSBxdW90ZXMgdHdpY2UsIHNvIFwiIGJlY29tZXMgXCJcIlxyXG4gICAgICBpZiAoZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YgJiYgaXRlbURhdGEpIHtcclxuICAgICAgICBpdGVtRGF0YSA9IGl0ZW1EYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXCIvZ2ksIGBcIlwiYCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRvIHdlIGhhdmUgYSB3cmFwcGVyIHRvIGtlZXAgYXMgYSBzdHJpbmc/IGluIGNlcnRhaW4gY2FzZXMgbGlrZSBcIjFFMDZcIiwgd2UgZG9uJ3Qgd2FudCBleGNlbCB0byB0cmFuc2Zvcm0gaXQgaW50byBleHBvbmVudGlhbCAoMS4wRTA2KVxyXG4gICAgICAvLyB0byBjYW5jZWwgdGhhdCBlZmZlY3Qgd2UgY2FuIGhhZCA9IGluIGZyb250LCBleDogPVwiMUUwNlwiXHJcbiAgICAgIGNvbnN0IGtlZXBBc1N0cmluZ1dyYXBwZXIgPSAoY29sdW1uRGVmICYmIGNvbHVtbkRlZi5leHBvcnRDc3ZGb3JjZVRvS2VlcEFzU3RyaW5nKSA/ICc9JyA6ICcnO1xyXG5cclxuICAgICAgcm93T3V0cHV0U3RyaW5ncy5wdXNoKGtlZXBBc1N0cmluZ1dyYXBwZXIgKyBleHBvcnRRdW90ZVdyYXBwZXIgKyBpdGVtRGF0YSArIGV4cG9ydFF1b3RlV3JhcHBlcik7XHJcbiAgICAgIGlkeCsrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByb3dPdXRwdXRTdHJpbmdzLmpvaW4oZGVsaW1pdGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZ3JvdXBlZCB0aXRsZShzKSwgZm9yIGV4YW1wbGUgaWYgd2UgZ3JvdXBlZCBieSBzYWxlc1JlcCwgdGhlIHJldHVybmVkIHJlc3VsdCB3b3VsZCBiZTo6ICdTYWxlcyBSZXAnXHJcbiAgICogQHBhcmFtIGl0ZW1PYmpcclxuICAgKi9cclxuICByZWFkR3JvdXBlZFRpdGxlUm93KGl0ZW1PYmo6IGFueSkge1xyXG4gICAgbGV0IGdyb3VwTmFtZSA9IHNhbml0aXplSHRtbFRvVGV4dChpdGVtT2JqLnRpdGxlKTtcclxuICAgIGNvbnN0IGV4cG9ydFF1b3RlV3JhcHBlciA9IHRoaXMuX2V4cG9ydFF1b3RlV3JhcHBlciB8fCAnJztcclxuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0O1xyXG5cclxuICAgIGdyb3VwTmFtZSA9IGFkZFdoaXRlU3BhY2VzKDUgKiBpdGVtT2JqLmxldmVsKSArIGdyb3VwTmFtZTtcclxuXHJcbiAgICBpZiAoZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YpIHtcclxuICAgICAgLy8gd2hlbiBDU1Ygd2UgYWxzbyBuZWVkIHRvIGVzY2FwZSBkb3VibGUgcXVvdGVzIHR3aWNlLCBzbyBcIiBiZWNvbWVzIFwiXCJcclxuICAgICAgZ3JvdXBOYW1lID0gZ3JvdXBOYW1lLnRvU3RyaW5nKCkucmVwbGFjZSgvXCIvZ2ksIGBcIlwiYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXhwb3J0UXVvdGVXcmFwcGVyICsgJyAnICsgZ3JvdXBOYW1lICsgZXhwb3J0UXVvdGVXcmFwcGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBncm91cGVkIHRvdGFscywgdGhlc2UgYXJlIHNldCBieSBTbGljayBBZ2dyZWdhdG9ycy5cclxuICAgKiBGb3IgZXhhbXBsZSBpZiB3ZSBncm91cGVkIGJ5IFwic2FsZXNSZXBcIiBhbmQgd2UgaGF2ZSBhIFN1bSBBZ2dyZWdhdG9yIG9uIFwic2FsZXNcIiwgdGhlbiB0aGUgcmV0dXJuZWQgb3V0cHV0IHdvdWxkIGJlOjogW1wiU3VtIDEyMyRcIl1cclxuICAgKiBAcGFyYW0gaXRlbU9ialxyXG4gICAqL1xyXG4gIHJlYWRHcm91cGVkVG90YWxSb3coY29sdW1uczogQ29sdW1uW10sIGl0ZW1PYmo6IGFueSkge1xyXG4gICAgY29uc3QgZGVsaW1pdGVyID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5kZWxpbWl0ZXI7XHJcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdDtcclxuICAgIGNvbnN0IGdyb3VwaW5nQWdncmVnYXRvclJvd1RleHQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmdyb3VwaW5nQWdncmVnYXRvclJvd1RleHQgfHwgJyc7XHJcbiAgICBjb25zdCBleHBvcnRRdW90ZVdyYXBwZXIgPSB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgfHwgJyc7XHJcbiAgICBjb25zdCBvdXRwdXRTdHJpbmdzID0gW2Ake2V4cG9ydFF1b3RlV3JhcHBlcn0ke2dyb3VwaW5nQWdncmVnYXRvclJvd1RleHR9JHtleHBvcnRRdW90ZVdyYXBwZXJ9YF07XHJcblxyXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW5EZWYpID0+IHtcclxuICAgICAgbGV0IGl0ZW1EYXRhID0gJyc7XHJcblxyXG4gICAgICAvLyBpZiB0aGVyZSdzIGEgZ3JvdXBUb3RhbHNGb3JtYXR0ZXIsIHdlIHdpbGwgcmUtcnVuIGl0IHRvIGdldCB0aGUgZXhhY3Qgc2FtZSBvdXRwdXQgYXMgd2hhdCBpcyBzaG93biBpbiBVSVxyXG4gICAgICBpZiAoY29sdW1uRGVmLmdyb3VwVG90YWxzRm9ybWF0dGVyKSB7XHJcbiAgICAgICAgaXRlbURhdGEgPSBjb2x1bW5EZWYuZ3JvdXBUb3RhbHNGb3JtYXR0ZXIoaXRlbU9iaiwgY29sdW1uRGVmKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZG9lcyB0aGUgdXNlciB3YW50IHRvIHNhbml0aXplIHRoZSBvdXRwdXQgZGF0YSAocmVtb3ZlIEhUTUwgdGFncyk/XHJcbiAgICAgIGlmIChjb2x1bW5EZWYuc2FuaXRpemVEYXRhRXhwb3J0IHx8IHRoaXMuX2V4cG9ydE9wdGlvbnMuc2FuaXRpemVEYXRhRXhwb3J0KSB7XHJcbiAgICAgICAgaXRlbURhdGEgPSBzYW5pdGl6ZUh0bWxUb1RleHQoaXRlbURhdGEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YpIHtcclxuICAgICAgICAvLyB3aGVuIENTViB3ZSBhbHNvIG5lZWQgdG8gZXNjYXBlIGRvdWJsZSBxdW90ZXMgdHdpY2UsIHNvIGEgZG91YmxlIHF1b3RlIFwiIGJlY29tZXMgMnggZG91YmxlIHF1b3RlcyBcIlwiXHJcbiAgICAgICAgaXRlbURhdGEgPSBpdGVtRGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1wiL2dpLCBgXCJcImApO1xyXG4gICAgICB9XHJcbiAgICAgIG91dHB1dFN0cmluZ3MucHVzaChleHBvcnRRdW90ZVdyYXBwZXIgKyBpdGVtRGF0YSArIGV4cG9ydFF1b3RlV3JhcHBlcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gb3V0cHV0U3RyaW5ncy5qb2luKGRlbGltaXRlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmlnZ2VycyBkb3dubG9hZCBmaWxlIHdpdGggZmlsZSBmb3JtYXQuXHJcbiAgICogSUUoNi0xMCkgYXJlIG5vdCBzdXBwb3J0ZWRcclxuICAgKiBBbGwgb3RoZXIgYnJvd3NlcnMgd2lsbCB1c2UgcGxhaW4gamF2YXNjcmlwdCBvbiBjbGllbnQgc2lkZSB0byBwcm9kdWNlIGEgZmlsZSBkb3dubG9hZC5cclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIHN0YXJ0RG93bmxvYWRGaWxlKG9wdGlvbnM6IHsgZmlsZW5hbWU6IHN0cmluZywgY3N2Q29udGVudDogYW55LCBmb3JtYXQ6IEZpbGVUeXBlIHwgc3RyaW5nLCB1c2VVdGY4V2l0aEJvbTogYm9vbGVhbiB9KTogdm9pZCB7XHJcbiAgICAvLyBJRSg2LTEwKSBkb24ndCBzdXBwb3J0IGphdmFzY3JpcHQgZG93bmxvYWQgYW5kIG91ciBzZXJ2aWNlIGRvZXNuJ3Qgc3VwcG9ydCBlaXRoZXIgc28gdGhyb3cgYW4gZXJyb3IsIHdlIGhhdmUgdG8gbWFrZSBhIHJvdW5kIHRyaXAgdG8gdGhlIFdlYiBTZXJ2ZXIgZm9yIGV4cG9ydGluZ1xyXG4gICAgaWYgKG5hdmlnYXRvci5hcHBOYW1lID09PSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlciA2IHRvIDEwIGRvIG5vdCBzdXBwb3J0IGphdmFzY3JpcHQgZXhwb3J0IHRvIENTVi4gUGxlYXNlIHVwZ3JhZGUgeW91ciBicm93c2VyLicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldCB0aGUgY29ycmVjdCBNSU1FIHR5cGVcclxuICAgIGNvbnN0IG1pbWVUeXBlID0gKG9wdGlvbnMuZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YpID8gJ3RleHQvY3N2JyA6ICd0ZXh0L3BsYWluJztcclxuXHJcbiAgICAvLyBtYWtlIHN1cmUgbm8gaHRtbCBlbnRpdGllcyBleGlzdCBpbiB0aGUgZGF0YVxyXG4gICAgY29uc3QgY3N2Q29udGVudCA9IGh0bWxFbnRpdHlEZWNvZGUob3B0aW9ucy5jc3ZDb250ZW50KTtcclxuXHJcbiAgICAvLyBkZWFsaW5nIHdpdGggRXhjZWwgQ1NWIGV4cG9ydCBhbmQgVVRGLTggaXMgYSBsaXR0bGUgdHJpY2t5Li4gV2Ugd2lsbCB1c2UgT3B0aW9uICMyIHRvIGNvdmVyIG9sZGVyIEV4Y2VsIHZlcnNpb25zXHJcbiAgICAvLyBPcHRpb24gIzE6IHdlIG5lZWQgdG8gbWFrZSBFeGNlbCBrbm93aW5nIHRoYXQgaXQncyBkZWFsaW5nIHdpdGggYW4gVVRGLTgsIEEgY29ycmVjdGx5IGZvcm1hdHRlZCBVVEY4IGZpbGUgY2FuIGhhdmUgYSBCeXRlIE9yZGVyIE1hcmsgYXMgaXRzIGZpcnN0IHRocmVlIG9jdGV0c1xyXG4gICAgLy8gcmVmZXJlbmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE1NTA5Ny9taWNyb3NvZnQtZXhjZWwtbWFuZ2xlcy1kaWFjcml0aWNzLWluLWNzdi1maWxlc1xyXG4gICAgLy8gT3B0aW9uIzI6IHVzZSBhIDNyZCBwYXJ0eSBleHRlbnNpb24gdG8gamF2YXNjcmlwdCBlbmNvZGUgaW50byBVVEYtMTZcclxuICAgIGxldCBvdXRwdXREYXRhOiBVaW50OEFycmF5IHwgc3RyaW5nO1xyXG4gICAgaWYgKG9wdGlvbnMuZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YpIHtcclxuICAgICAgb3V0cHV0RGF0YSA9IG5ldyBUZXh0RW5jb2RlcigndXRmLTgnKS5lbmNvZGUoY3N2Q29udGVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvdXRwdXREYXRhID0gY3N2Q29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGUgYSBCbG9iIG9iamVjdCBmb3IgdGhlIGRvd25sb2FkXHJcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW29wdGlvbnMudXNlVXRmOFdpdGhCb20gPyAnXFx1RkVGRicgOiAnJywgb3V0cHV0RGF0YV0sIHtcclxuICAgICAgdHlwZTogYCR7bWltZVR5cGV9O2NoYXJzZXQ9dXRmLTg7YFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gd2hlbiB1c2luZyBJRS9FZGdlLCB0aGVuIHVzZSBkaWZmZXJlbnQgZG93bmxvYWQgY2FsbFxyXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihibG9iLCBvcHRpb25zLmZpbGVuYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHRoaXMgdHJpY2sgd2lsbCBnZW5lcmF0ZSBhIHRlbXAgPGEgLz4gdGFnXHJcbiAgICAgIC8vIHRoZSBjb2RlIHdpbGwgdGhlbiB0cmlnZ2VyIGEgaGlkZGVuIGNsaWNrIGZvciBpdCB0byBzdGFydCBkb3dubG9hZGluZ1xyXG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICBjb25zdCBjc3ZVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuICAgICAgbGluay50ZXh0Q29udGVudCA9ICdkb3dubG9hZCc7XHJcbiAgICAgIGxpbmsuaHJlZiA9IGNzdlVybDtcclxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgb3B0aW9ucy5maWxlbmFtZSk7XHJcblxyXG4gICAgICAvLyBzZXQgdGhlIHZpc2liaWxpdHkgdG8gaGlkZGVuIHNvIHRoZXJlIGlzIG5vIGVmZmVjdCBvbiB5b3VyIHdlYi1sYXlvdXRcclxuICAgICAgbGluay5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAvLyB0aGlzIHBhcnQgd2lsbCBhcHBlbmQgdGhlIGFuY2hvciB0YWcsIHRyaWdnZXIgYSBjbGljayAoZm9yIGRvd25sb2FkIHRvIHN0YXJ0KSBhbmQgZmluYWxseSByZW1vdmUgdGhlIHRhZyBvbmNlIGNvbXBsZXRlZFxyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xyXG4gICAgICBsaW5rLmNsaWNrKCk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==