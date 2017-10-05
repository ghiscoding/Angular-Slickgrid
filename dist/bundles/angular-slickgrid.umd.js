(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('moment'), require('@angular/core'), require('@angular/router'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', 'moment', '@angular/core', '@angular/router', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.angularLibraryStarter = global.ng.angularLibraryStarter || {}),global.moment,global.ng.core,global.ng.router,global.ng.common));
}(this, (function (exports,moment___default,_angular_core,_angular_router,_angular_common) { 'use strict';

var moment___default__default = moment___default['default'];

var CaseType = {};
CaseType.camelCase = 0;
CaseType.pascalCase = 1;
CaseType.snakeCase = 2;
CaseType[CaseType.camelCase] = "camelCase";
CaseType[CaseType.pascalCase] = "pascalCase";
CaseType[CaseType.snakeCase] = "snakeCase";
var FormElementType = {};
FormElementType.input = 0;
FormElementType.multiSelect = 1;
FormElementType.select = 2;
FormElementType.textarea = 3;
FormElementType[FormElementType.input] = "input";
FormElementType[FormElementType.multiSelect] = "multiSelect";
FormElementType[FormElementType.select] = "select";
FormElementType[FormElementType.textarea] = "textarea";
var FieldType = {};
FieldType.unknown = 0;
FieldType.string = 1;
FieldType.boolean = 2;
FieldType.number = 3;
FieldType.date = 4;
FieldType.dateIso = 5;
FieldType.dateUtc = 6;
FieldType.dateTime = 7;
FieldType.dateTimeIso = 8;
FieldType.dateUs = 9;
FieldType.dateUsShort = 10;
FieldType.dateTimeUs = 11;
FieldType.dateTimeUsShort = 12;
FieldType[FieldType.unknown] = "unknown";
FieldType[FieldType.string] = "string";
FieldType[FieldType.boolean] = "boolean";
FieldType[FieldType.number] = "number";
FieldType[FieldType.date] = "date";
FieldType[FieldType.dateIso] = "dateIso";
FieldType[FieldType.dateUtc] = "dateUtc";
FieldType[FieldType.dateTime] = "dateTime";
FieldType[FieldType.dateTimeIso] = "dateTimeIso";
FieldType[FieldType.dateUs] = "dateUs";
FieldType[FieldType.dateUsShort] = "dateUsShort";
FieldType[FieldType.dateTimeUs] = "dateTimeUs";
FieldType[FieldType.dateTimeUsShort] = "dateTimeUsShort";
/**
 * @param {?} str
 * @return {?}
 */
function parseBoolean(str) {
    return /(true|1)/i.test(str);
}
var booleanFilterCondition = function (options) {
    return parseBoolean(options.cellValue) === parseBoolean(options.searchTerm);
};
var mapDateFormatByFieldType = function (fieldType) {
    switch (fieldType) {
        case FieldType.dateUs:
            return 'M/D/YYYY';
        case FieldType.dateTimeUs:
            return 'M/D/YYYY h:m:s';
        case FieldType.dateUsShort:
            return 'M/D/YY';
        case FieldType.dateTimeUsShort:
            return 'M/D/YY h:m:s';
        case FieldType.dateTimeIso:
            return 'YYYY-MM-DD h:m:s';
        case FieldType.dateIso:
        default:
            return 'YYYY-MM-DD';
    }
};
var testFilterCondition = function (operator, value1, value2) {
    switch (operator) {
        case '<': return (value1 < value2);
        case '<=': return (value1 <= value2);
        case '>': return (value1 > value2);
        case '>=': return (value1 >= value2);
        case '!=':
        case '<>': return (value1 !== value2);
        case '=':
        case '==': return (value1 === value2);
    }
    return true;
};
var moment = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateUtcFilterCondition = function (options) {
    if (!options.filterSearchType) {
        throw new Error('Date UTC filter is a special case and requires a filterSearchType to be provided in the column option, for example: { filterable: true, type: FieldType.dateUtc, filterSearchType: FieldType.dateIso }');
    }
    var /** @type {?} */ searchDateFormat = mapDateFormatByFieldType(options.filterSearchType);
    if (!moment(options.cellValue, moment.ISO_8601).isValid() || !moment(options.searchTerm, searchDateFormat, true).isValid()) {
        return true;
    }
    var /** @type {?} */ dateCell = moment(options.cellValue, moment.ISO_8601, true);
    var /** @type {?} */ dateSearch = moment(options.searchTerm, searchDateFormat, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
var moment$1 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var DATE_FORMAT = 'YYYY-MM-DD';
var dateIsoFilterCondition = function (options) {
    if (!moment$1(options.cellValue, DATE_FORMAT, true).isValid() || !moment$1(options.searchTerm, DATE_FORMAT, true).isValid()) {
        return true;
    }
    var /** @type {?} */ dateCell = moment$1(options.cellValue, DATE_FORMAT, true);
    var /** @type {?} */ dateSearch = moment$1(options.searchTerm, DATE_FORMAT, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
var moment$2 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var DATE_FORMAT$1 = 'M/D/YY';
var dateUsShortFilterCondition = function (options) {
    if (!moment$2(options.cellValue, DATE_FORMAT$1, true).isValid() || !moment$2(options.searchTerm, DATE_FORMAT$1, true).isValid()) {
        return true;
    }
    var /** @type {?} */ dateCell = moment$2(options.cellValue, DATE_FORMAT$1, true);
    var /** @type {?} */ dateSearch = moment$2(options.searchTerm, DATE_FORMAT$1, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
var moment$3 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var DATE_FORMAT$2 = 'M/D/YYYY';
var dateUsFilterCondition = function (options) {
    if (!moment$3(options.cellValue, DATE_FORMAT$2, true).isValid() || !moment$3(options.searchTerm, DATE_FORMAT$2, true).isValid()) {
        return true;
    }
    var /** @type {?} */ dateCell = moment$3(options.cellValue, DATE_FORMAT$2, true);
    var /** @type {?} */ dateSearch = moment$3(options.searchTerm, DATE_FORMAT$2, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
var moment$4 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateFilterCondition = function (options) {
    var /** @type {?} */ filterSearchType = options.filterSearchType || FieldType.dateIso;
    var /** @type {?} */ searchDateFormat = mapDateFormatByFieldType(filterSearchType);
    if (!moment$4(options.cellValue, moment$4.ISO_8601).isValid() || !moment$4(options.searchTerm, searchDateFormat, true).isValid()) {
        return true;
    }
    var /** @type {?} */ dateCell = moment$4(options.cellValue);
    var /** @type {?} */ dateSearch = moment$4(options.searchTerm);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
var numberFilterCondition = function (options) {
    return testFilterCondition(options.operator || '==', parseFloat(options.cellValue), parseFloat(options.searchTerm));
};
var stringFilterCondition = function (options) {
    // make sure the both search & cell value are string
    // and make them lower case for case insensitive filtering
    var /** @type {?} */ cellValue = options.cellValue.toString().toLowerCase();
    var /** @type {?} */ searchTerm = options.searchTerm.toString().toLowerCase();
    if (options.operator === '*') {
        return cellValue.endsWith(searchTerm);
    }
    else if (options.operator === '' && options.cellValueLastChar === '*') {
        return cellValue.startsWith(searchTerm);
    }
    else if (options.operator === '') {
        return cellValue.includes(searchTerm);
    }
    return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};
var executeMappedCondition = function (options) {
    // execute the mapped type, or default to String condition check
    switch (options.fieldType) {
        case FieldType.boolean:
            return booleanFilterCondition(options);
        case FieldType.date:
            return dateFilterCondition(options);
        case FieldType.dateUtc:
            return dateUtcFilterCondition(options);
        case FieldType.dateIso:
            return dateIsoFilterCondition(options);
        case FieldType.dateUs:
        case FieldType.dateTimeUs:
            return dateUsFilterCondition(options);
        case FieldType.dateUsShort:
        case FieldType.dateTimeUsShort:
            return dateUsShortFilterCondition(options);
        case FieldType.number:
            return numberFilterCondition(options);
        case FieldType.string:
        default:
            return stringFilterCondition(options);
    }
};
var FilterConditions = {
    executeMappedCondition: executeMappedCondition,
    booleanFilter: booleanFilterCondition,
    dateFilter: dateFilterCondition,
    dateIsoFilter: dateIsoFilterCondition,
    dateUtcFilter: dateUtcFilterCondition,
    dateUsFilter: dateUsFilterCondition,
    dateUsShortFilter: dateUsShortFilterCondition,
    numberFilter: numberFilterCondition,
    stringFilter: stringFilterCondition,
    testFilter: testFilterCondition
};
var inputFilterTemplate = function (searchTerm, columnDef) {
    return "<input type=\"text\" class=\"form-control search-filter\" style=\"font-family: Segoe UI Symbol;\" placeholder=\"&#128269;\">";
};
var selectFilterTemplate = function (searchTerm, columnDef) {
    if (!columnDef.filter.selectOptions) {
        throw new Error("SelectOptions with value/label is required to populate the Select list, for example:: { filter: type: FormElementType.select, selectOptions: [ { value: '1', label: 'One' } ]')");
    }
    var /** @type {?} */ options = '';
    columnDef.filter.selectOptions.forEach(function (option) {
        options += "<option value=\"" + option.value + "\">" + option.label + "</option>";
    });
    return "<select id=\"search-" + columnDef.id + "\" class=\"form-control\">" + options + "</select>";
};
var FilterTemplates = {
    input: inputFilterTemplate,
    select: selectFilterTemplate
};
var checkboxFormatter = function (row, cell, value, columnDef, dataContext) { return value ? '&#x2611;' : ''; };
var checkmarkFormatter = function (row, cell, value, columnDef, dataContext) { return value ? "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>" : ''; };
var moment$5 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateIsoFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$5(value).format('YYYY-MM-DD') : ''; };
var moment$6 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateTimeIsoAmPmFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$6(value).format('YYYY-MM-DD h:mm:ss a') : ''; };
var moment$7 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateTimeUsAmPmFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$7(value).format('MM/DD/YYYY h:mm:ss a') : ''; };
var moment$8 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateTimeUsFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$8(value).format('MM/DD/YYYY hh:mm:ss') : ''; };
var moment$9 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateUsFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$9(value).format('MM/DD/YYYY') : ''; };
var percentCompleteFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value === null || value === '') {
        return '-';
    }
    else if (value < 50) {
        return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
    }
    else {
        return "<span style='color:green'>" + value + "%</span>";
    }
};
var percentCompleteBarFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value === null || value === '') {
        return '';
    }
    var /** @type {?} */ color;
    if (value < 30) {
        color = 'red';
    }
    else if (value < 70) {
        color = 'silver';
    }
    else {
        color = 'green';
    }
    return "<span class=\"percent-complete-bar\" style=\"background:" + color + "; width:" + value + "%\"></span>";
};
var progressBarFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value === null || value === '') {
        return '';
    }
    var /** @type {?} */ color;
    if (value < 30) {
        color = 'danger';
    }
    else if (value < 70) {
        color = 'warning';
    }
    else {
        color = 'success';
    }
    return "<div class=\"progress\">\n    <div class=\"progress-bar progress-bar-" + color + "\" role=\"progressbar\" aria-valuenow=\"" + value + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"min-width: 2em; width: " + value + "%;\">\n    " + value + "%\n    </div>\n  </div>";
};
var yesNoFormatter = function (row, cell, value, columnDef, dataContext) { return value ? 'Yes' : 'No'; };
// import { Group, GroupTotals } from '../core'
// import { Item } from '../dataview'
/*
export interface GroupFormatter {
  (row: number, cell: number, value: any, columnDef: Column, dataContext: Group): string
}

export interface GroupTotalsFormatter {
  (row: number, cell: number, value: any, columnDef: Column, dataContext: GroupTotals): string
}
*/
var Formatters = {
    checkbox: checkboxFormatter,
    checkmark: checkmarkFormatter,
    dateIso: dateIsoFormatter,
    dateTimeIso: dateIsoFormatter,
    dateTimeIsoAmPm: dateTimeIsoAmPmFormatter,
    dateUs: dateUsFormatter,
    dateTimeUs: dateTimeUsFormatter,
    dateTimeUsAmPm: dateTimeUsAmPmFormatter,
    percentComplete: percentCompleteFormatter,
    percentCompleteBar: percentCompleteBarFormatter,
    progressBar: progressBarFormatter,
    yesNo: yesNoFormatter
};
var moment$10 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var DATE_FORMAT$3 = 'M/D/YY';
var dateUsShortSorter = function (value1, value2, sortDirection) {
    if (!moment$10(value1, DATE_FORMAT$3, true).isValid() || !moment$10(value2, DATE_FORMAT$3, true).isValid()) {
        return 0;
    }
    var /** @type {?} */ date1 = moment$10(value1, DATE_FORMAT$3, true);
    var /** @type {?} */ date2 = moment$10(value2, DATE_FORMAT$3, true);
    var /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};
var moment$11 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateSorter = function (value1, value2, sortDirection) {
    if (!moment$11(value1, moment$11.ISO_8601).isValid() || !moment$11(value2, moment$11.ISO_8601, true).isValid()) {
        return 0;
    }
    var /** @type {?} */ date1 = moment$11(value1);
    var /** @type {?} */ date2 = moment$11(value2);
    var /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};
var moment$12 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var DATE_FORMAT$4 = 'YYYY-MM-DD';
var dateIsoSorter = function (value1, value2, sortDirection) {
    if (!moment$12(value1, DATE_FORMAT$4, true).isValid() || !moment$12(value2, DATE_FORMAT$4, true).isValid()) {
        return 0;
    }
    var /** @type {?} */ date1 = moment$12(value1, DATE_FORMAT$4, true);
    var /** @type {?} */ date2 = moment$12(value2, DATE_FORMAT$4, true);
    var /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};
var moment$13 = moment___default__default || moment___default; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var DATE_FORMAT$5 = 'M/D/YYYY';
var dateUsSorter = function (value1, value2, sortDirection) {
    if (!moment$13(value1, DATE_FORMAT$5, true).isValid() || !moment$13(value2, DATE_FORMAT$5, true).isValid()) {
        return 0;
    }
    var /** @type {?} */ date1 = moment$13(value1, DATE_FORMAT$5, true);
    var /** @type {?} */ date2 = moment$13(value2, DATE_FORMAT$5, true);
    var /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};
var numericSorter = function (value1, value2, sortDirection) {
    var /** @type {?} */ x = (isNaN(value1) || value1 === '' || value1 === null) ? -99e+10 : parseFloat(value1);
    var /** @type {?} */ y = (isNaN(value2) || value2 === '' || value2 === null) ? -99e+10 : parseFloat(value2);
    return sortDirection * (x === y ? 0 : (x > y ? 1 : -1));
};
var stringSorter = function (value1, value2, sortDirection) {
    return sortDirection * (value1 === value2 ? 0 : (value1 > value2 ? 1 : -1));
};
var Sorters = {
    date: dateSorter,
    dateIso: dateIsoSorter,
    dateUs: dateUsSorter,
    dateUsShort: dateUsShortSorter,
    numeric: numericSorter,
    string: stringSorter
};
var FilterService = (function () {
    function FilterService() {
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} columnDefinitions
     * @param {?} columnFilters
     * @return {?}
     */
    FilterService.prototype.init = function (grid, gridOptions, columnDefinitions, columnFilters) {
        this._columnDefinitions = columnDefinitions;
        this._columnFilters = columnFilters;
        this._gridOptions = gridOptions;
        this._grid = grid;
    };
    /**
     * Attach a backend filter hook to the grid
     * @return {?}
     */
    FilterService.prototype.attachBackendOnFilter = function () {
        this.subscriber = new Slick.Event();
        this.subscriber.subscribe(this._gridOptions.onFilterChanged);
        this.addFilterTemplateToHeaderRow();
    };
    /**
     * @param {?} operator
     * @param {?} value1
     * @param {?} value2
     * @return {?}
     */
    FilterService.prototype.testFilterCondition = function (operator, value1, value2) {
        switch (operator) {
            case '<': return (value1 < value2) ? true : false;
            case '<=': return (value1 <= value2) ? true : false;
            case '>': return (value1 > value2) ? true : false;
            case '>=': return (value1 >= value2) ? true : false;
            case '!=':
            case '<>': return (value1 !== value2) ? true : false;
            case '=':
            case '==': return (value1 === value2) ? true : false;
        }
    };
    /**
     * Attach a local filter hook to the grid
     * @param {?} dataView
     * @return {?}
     */
    FilterService.prototype.attachLocalOnFilter = function (dataView) {
        this._dataView = dataView;
        this.subscriber = new Slick.Event();
        dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
        dataView.setFilter(this.customFilter);
        this.subscriber.subscribe(function (e, args) {
            var /** @type {?} */ columnId = args.columnId;
            if (columnId != null) {
                dataView.refresh();
            }
        });
        this.addFilterTemplateToHeaderRow();
    };
    /**
     * @param {?} item
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.customFilter = function (item, args) {
        for (var _i = 0, _a = Object.keys(args.columnFilters); _i < _a.length; _i++) {
            var columnId = _a[_i];
            var /** @type {?} */ columnFilter = args.columnFilters[columnId];
            var /** @type {?} */ columnIndex = args.grid.getColumnIndex(columnId);
            var /** @type {?} */ columnDef = args.grid.getColumns()[columnIndex];
            var /** @type {?} */ fieldName = columnDef.field || columnDef.name;
            var /** @type {?} */ fieldType = columnDef.type || FieldType.string;
            var /** @type {?} */ conditionalFilterFn = (columnDef.filter && columnDef.filter.conditionalFilter) ? columnDef.filter.conditionalFilter : null;
            var /** @type {?} */ filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
            var /** @type {?} */ cellValue = item[columnDef.field];
            var /** @type {?} */ fieldSearchValue = columnFilter.searchTerm;
            if (typeof fieldSearchValue === 'undefined') {
                fieldSearchValue = '';
            }
            fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
            var /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
            var /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
            var /** @type {?} */ searchTerm = (!!matches) ? matches[2] : '';
            var /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : '';
            // no need to query if search value is empty
            if (searchTerm === '') {
                return true;
            }
            if (typeof cellValue === 'number') {
                cellValue = cellValue.toString();
            }
            var /** @type {?} */ conditionOptions = {
                fieldType: fieldType,
                searchTerm: searchTerm,
                cellValue: cellValue,
                operator: operator,
                cellValueLastChar: lastValueChar,
                filterSearchType: filterSearchType
            };
            if (conditionalFilterFn && typeof conditionalFilterFn === 'function') {
                conditionalFilterFn(conditionOptions);
            }
            if (!FilterConditions.executeMappedCondition(conditionOptions)) {
                return false;
            }
        }
        return true;
    };
    /**
     * @return {?}
     */
    FilterService.prototype.destroy = function () {
        this.subscriber.unsubscribe();
    };
    /**
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.callbackSearchEvent = function (e, args) {
        this._columnFilters[args.columnDef.id] = {
            columnId: args.columnDef.id,
            columnDef: args.columnDef,
            searchTerm: e.target.value
        };
        this.triggerEvent(this.subscriber, {
            columnId: args.columnDef.id,
            columnDef: args.columnDef,
            columnFilters: this._columnFilters,
            searchTerm: e.target.value,
            grid: this._grid
        }, e);
    };
    /**
     * @return {?}
     */
    FilterService.prototype.addFilterTemplateToHeaderRow = function () {
        var _this = this;
        var _loop_1 = function (i) {
            if (this_1._columnDefinitions[i].id !== 'selector' && this_1._columnDefinitions[i].filterable) {
                var /** @type {?} */ filterTemplate = '';
                var /** @type {?} */ elm = null;
                var /** @type {?} */ header = void 0;
                var /** @type {?} */ columnDef_1 = this_1._columnDefinitions[i];
                var /** @type {?} */ columnId = columnDef_1.id;
                var /** @type {?} */ listTerm = (columnDef_1.filter && columnDef_1.filter.listTerm) ? columnDef_1.filter.listTerm : null;
                var /** @type {?} */ searchTerm = (columnDef_1.filter && columnDef_1.filter.searchTerm) ? columnDef_1.filter.searchTerm : '';
                // keep the filter in a columnFilters for later reference
                this_1.keepColumnFilters(searchTerm, listTerm, columnDef_1);
                if (!columnDef_1.filter) {
                    searchTerm = (columnDef_1.filter && columnDef_1.filter.searchTerm) ? columnDef_1.filter.searchTerm : null;
                    filterTemplate = FilterTemplates.input(searchTerm, columnDef_1);
                }
                else {
                    // custom Select template
                    if (columnDef_1.filter.type === FormElementType.select) {
                        filterTemplate = FilterTemplates.select(searchTerm, columnDef_1);
                    }
                }
                // create the DOM Element
                header = this_1._grid.getHeaderRowColumn(columnDef_1.id);
                $(header).empty();
                elm = $(filterTemplate);
                elm.val(searchTerm);
                elm.data('columnId', columnDef_1.id);
                if (elm && typeof elm.appendTo === 'function') {
                    elm.appendTo(header);
                }
                // depending on the DOM Element type, we will watch the corrent event
                var /** @type {?} */ filterType = (columnDef_1.filter && columnDef_1.filter.type) ? columnDef_1.filter.type : FormElementType.input;
                switch (filterType) {
                    case FormElementType.select:
                    case FormElementType.multiSelect:
                        elm.change(function (e) { return _this.callbackSearchEvent(e, { columnDef: columnDef_1 }); });
                        break;
                    case FormElementType.input:
                    default:
                        elm.keyup(function (e) { return _this.callbackSearchEvent(e, { columnDef: columnDef_1 }); });
                        break;
                }
            }
        };
        var this_1 = this;
        for (var /** @type {?} */ i = 0; i < this._columnDefinitions.length; i++) {
            _loop_1(/** @type {?} */ i);
        }
    };
    /**
     * @param {?} searchTerm
     * @param {?} listTerm
     * @param {?} columnDef
     * @return {?}
     */
    FilterService.prototype.keepColumnFilters = function (searchTerm, listTerm, columnDef) {
        if (searchTerm) {
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef: columnDef,
                searchTerm: searchTerm
            };
            if (listTerm) {
                this._columnFilters.listTerm = listTerm;
            }
        }
    };
    /**
     * @param {?} evt
     * @param {?} args
     * @param {?} e
     * @return {?}
     */
    FilterService.prototype.triggerEvent = function (evt, args, e) {
        e = e || new Slick.EventData();
        return evt.notify(args, e, args.grid);
    };
    return FilterService;
}());
FilterService.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
FilterService.ctorParameters = function () { return []; };
var MouseService = (function () {
    function MouseService() {
    }
    /**
     * @param {?} grid
     * @return {?}
     */
    MouseService.prototype.attachOnMouseHover = function (grid) {
        grid.onMouseEnter.subscribe(function (e) {
            var /** @type {?} */ cell = grid.getCellFromEvent(e);
            if (cell && cell.row >= 0) {
                grid.setSelectedRows([cell.row]);
                e.preventDefault();
            }
        });
        grid.onMouseLeave.subscribe(function (e) {
            grid.setSelectedRows([]);
            e.preventDefault();
        });
    };
    return MouseService;
}());
// global constants, height/width are in pixels
var DATAGRID_MIN_HEIGHT = 180;
var DATAGRID_MIN_WIDTH = 300;
var DATAGRID_BOTTOM_PADDING = 20;
var DATAGRID_PAGINATION_HEIGHT = 35;
var ResizerService = (function () {
    /**
     * @param {?} router
     */
    function ResizerService(router) {
        this.router = router;
    }
    /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    ResizerService.prototype.attachAutoResizeDataGrid = function (grid, gridOptions) {
        var _this = this;
        // if we can't find the grid to resize, return without attaching anything
        var /** @type {?} */ gridDomElm = $("#" + gridOptions.gridId);
        if (!gridDomElm || typeof gridDomElm.offset() === 'undefined') {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        this.resizeGrid(grid, gridOptions);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on('resize', function () {
            _this.resizeGrid(grid, gridOptions);
        });
        // destroy the resizer on route change
        this.router.events.subscribe(function (event) {
            $(window).trigger('resize').off('resize');
        });
    };
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    ResizerService.prototype.calculateGridNewDimensions = function (gridOptions) {
        var /** @type {?} */ bottomPadding = (gridOptions.autoResize && gridOptions.autoResize.bottomPadding) ? gridOptions.autoResize.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && gridOptions.enablePagination) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT; // add pagination height to bottom padding
        }
        if (typeof $("#" + gridOptions.gridId).offset !== 'function') {
            return;
        }
        var /** @type {?} */ availableHeight = $(window).height() - $("#" + gridOptions.gridId).offset().top - bottomPadding;
        var /** @type {?} */ availableWidth = (gridOptions.autoResize && gridOptions.autoResize.containerId) ? $("#" + gridOptions.autoResize.containerId).width() : $("#" + gridOptions.gridContainerId).width();
        var /** @type {?} */ minHeight = (gridOptions.autoResize && gridOptions.autoResize.minHeight < 0) ? gridOptions.autoResize.minHeight : DATAGRID_MIN_HEIGHT;
        var /** @type {?} */ minWidth = (gridOptions.autoResize && gridOptions.autoResize.minWidth < 0) ? gridOptions.autoResize.minWidth : DATAGRID_MIN_WIDTH;
        var /** @type {?} */ newHeight = availableHeight;
        var /** @type {?} */ newWidth = (gridOptions.autoResize && gridOptions.autoResize.sidePadding) ? availableWidth - gridOptions.autoResize.sidePadding : availableWidth;
        if (newHeight < minHeight) {
            newHeight = minHeight;
        }
        if (newWidth < minWidth) {
            newWidth = minWidth;
        }
        return {
            height: newHeight,
            width: newWidth
        };
    };
    /**
     * Resize the datagrid to fit the browser height & width
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?=} newSizes
     * @return {?}
     */
    ResizerService.prototype.resizeGrid = function (grid, gridOptions, newSizes) {
        // calculate new available sizes but with minimum height of 220px
        newSizes = newSizes || this.calculateGridNewDimensions(gridOptions);
        if (newSizes) {
            // apply these new height/width to the datagrid
            $("#" + gridOptions.gridId).height(newSizes.height);
            $("#" + gridOptions.gridId).width(newSizes.width);
            $("#" + gridOptions.gridContainerId).height(newSizes.height);
            $("#" + gridOptions.gridContainerId).width(newSizes.width);
            // resize the slickgrid canvas on all browser except some IE versions
            // exclude all IE below IE11
            // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
            if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && grid) {
                grid.resizeCanvas();
            }
            // also call the grid auto-size columns so that it takes available when going bigger
            grid.autosizeColumns();
        }
    };
    return ResizerService;
}());
ResizerService.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
ResizerService.ctorParameters = function () { return [
    { type: _angular_router.Router, },
]; };
var SortService = (function () {
    function SortService() {
    }
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} gridOptions Grid Options object
     * @return {?}
     */
    SortService.prototype.attachBackendOnSort = function (grid, gridOptions) {
        this.subscriber = grid.onSort;
        this.subscriber.subscribe(gridOptions.onSortChanged);
    };
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} gridOptions Grid Options object
     * @param {?} dataView
     * @return {?}
     */
    SortService.prototype.attachLocalOnSort = function (grid, gridOptions, dataView) {
        this.subscriber = grid.onSort;
        this.subscriber.subscribe(function (e, args) {
            // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
            // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
            var /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            dataView.sort(function (dataRow1, dataRow2) {
                for (var /** @type {?} */ i = 0, /** @type {?} */ l = sortColumns.length; i < l; i++) {
                    var /** @type {?} */ sortDirection = sortColumns[i].sortAsc ? 1 : -1;
                    var /** @type {?} */ sortField = sortColumns[i].sortCol.field;
                    var /** @type {?} */ value1 = dataRow1[sortField];
                    var /** @type {?} */ value2 = dataRow2[sortField];
                    var /** @type {?} */ result = 0;
                    if (typeof sortColumns[i].sortCol.type !== 'undefined') {
                        switch (sortColumns[i].sortCol.type) {
                            case FieldType.number:
                                result = Sorters.numeric(value1, value2, sortDirection);
                                break;
                            case FieldType.date:
                                result = Sorters.date(value1, value2, sortDirection);
                                break;
                            case FieldType.dateIso:
                                result = Sorters.dateIso(value1, value2, sortDirection);
                                break;
                            case FieldType.dateUs:
                                result = Sorters.dateUs(value1, value2, sortDirection);
                                break;
                            case FieldType.dateUsShort:
                                result = Sorters.dateUsShort(value1, value2, sortDirection);
                                break;
                            default:
                                result = Sorters.string(value1, value2, sortDirection);
                                break;
                        }
                    }
                    if (result !== 0) {
                        return result;
                    }
                }
                return 0;
            });
            grid.invalidate();
            grid.render();
        });
    };
    /**
     * @return {?}
     */
    SortService.prototype.destroy = function () {
        this.subscriber.unsubscribe();
    };
    return SortService;
}());
SortService.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
SortService.ctorParameters = function () { return []; };
String.format = function (format, args) {
    // const args = (Array.isArray(arguments[1])) ? arguments[1] : Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
        return (typeof args[number] !== 'undefined') ? args[number] : match;
    });
};
String.padZero = function (length) {
    var /** @type {?} */ s = this;
    while (s.length < length) {
        s = '0' + s;
    }
    return s;
};
/**
 * Trim any extra white space from the string
 * @param string inputStr
 * @returns string outputStr
 */
String.trim = function (inputStr) {
    return inputStr ? inputStr.replace(/\s+/g, ' ') : inputStr;
};
/**
 * Title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param string inputStr
 * @returns string outputStr
 */
String.allTitleCase = function (inputStr) {
    return inputStr.replace(/\w\S*/g, function (outputStr) {
        return outputStr.charAt(0).toUpperCase() + outputStr.substr(1).toLowerCase();
    });
};
/**
 * Title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param string inputStr
 * @returns string outputStr
*/
String.titleCase = function (inputStr) {
    return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
};
var OdataService = (function () {
    function OdataService() {
        this._odataOptions = {
            filterQueue: [],
            orderBy: ''
        };
        this._defaultSortBy = '';
        this._columnFilters = {};
    }
    /**
     * @return {?}
     */
    OdataService.prototype.buildQuery = function () {
        this._odataOptions.filterQueue = [];
        var /** @type {?} */ queryTmpArray = [];
        if (this._odataOptions.top) {
            queryTmpArray.push("$top=" + this._odataOptions.top);
        }
        if (this._odataOptions.skip) {
            queryTmpArray.push("$skip=" + this._odataOptions.skip);
        }
        if (this._odataOptions.orderBy) {
            var /** @type {?} */ argument = '';
            if (Array.isArray(this._odataOptions.orderBy)) {
                argument = this._odataOptions.orderBy.join(','); // csv, that will form a query example like: $orderby=RoleName asc, Id desc
            }
            else {
                argument = this._odataOptions.orderBy;
            }
            queryTmpArray.push("$orderby=" + argument);
        }
        if (this._odataOptions.filterBy || this._odataOptions.filter) {
            if (this._odataOptions.filter) {
                this._odataOptions.filterQueue = [];
                var /** @type {?} */ filterStr = this._odataOptions.filter;
                if (Array.isArray(this._odataOptions.filter)) {
                    var /** @type {?} */ filterBySeparator = this._odataOptions.filterBySeparator || 'and';
                    var /** @type {?} */ separatorSpacedOut = " " + filterBySeparator + " ";
                    filterStr = this._odataOptions.filter.join(separatorSpacedOut);
                }
                this._odataOptions.filterQueue.push("(" + filterStr + ")");
            }
            // filterBy are passed manually by the user, however we will only add it if the column wasn't yet filtered
            if (!!this._odataOptions.filterBy && !!this._odataOptions.filterBy.fieldName && !this._columnFilters[this._odataOptions.filterBy.fieldName.toLowerCase()]) {
                if (this._odataOptions.filterBy.searchTerm !== '') {
                    this.saveColumnFilter(this._odataOptions.filterBy.fieldName.toLowerCase(), this._odataOptions.filterBy.searchTerm, this._odataOptions.filterBy.listTerm);
                    this.updateFilterFromListTerms(this._odataOptions.filterBy);
                }
            }
        }
        if (this._odataOptions.filterQueue.length > 0) {
            var /** @type {?} */ filterBySeparator = this._odataOptions.filterBySeparator || 'and';
            var /** @type {?} */ separatorSpacedOut = " " + filterBySeparator + " ";
            var /** @type {?} */ query = this._odataOptions.filterQueue.join(separatorSpacedOut);
            this._odataOptions.filter = query; // overwrite with
            queryTmpArray.push("$filter=" + query);
        }
        // join all the odata functions by a '&'
        return queryTmpArray.join('&');
    };
    /**
     * @param {?} columnName
     * @return {?}
     */
    OdataService.prototype.getFilterByColumn = function (columnName) {
        return (!!this._columnFilters[columnName]) ? this._columnFilters[columnName] : null;
    };
    /**
     * @return {?}
     */
    OdataService.prototype.getFilterCount = function () {
        return (this._odataOptions.filterQueue) ? this._odataOptions.filterQueue.length : 0;
    };
    Object.defineProperty(OdataService.prototype, "columnFilters", {
        /**
         * @return {?}
         */
        get: function () {
            return this._columnFilters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OdataService.prototype, "options", {
        /**
         * @return {?}
         */
        get: function () {
            return this._odataOptions;
        },
        /**
         * @param {?} options
         * @return {?}
         */
        set: function (options) {
            this._odataOptions = options;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} fieldName
     * @return {?}
     */
    OdataService.prototype.removeColumnFilter = function (fieldName) {
        delete this._columnFilters[fieldName];
    };
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} searchTerms
     * @return {?}
     */
    OdataService.prototype.saveColumnFilter = function (fieldName, value, searchTerms) {
        this._columnFilters[fieldName] = {
            search: searchTerms,
            value: value
        };
    };
    /**
     * Update the filter by a list of terms usually passed manually by the user as default filters
     * @param {?} filterOptions
     * @return {?}
     */
    OdataService.prototype.updateFilterFromListTerms = function (filterOptions) {
        var _this = this;
        // build the filter query
        if (Array.isArray(filterOptions)) {
            filterOptions.forEach(function (filterOptionObject) {
                _this.updateFilterFromTerm(filterOptionObject);
            });
        }
        else {
            this.updateFilterFromTerm(filterOptions);
        }
    };
    /**
     * @param {?} filterOptions
     * @return {?}
     */
    OdataService.prototype.updateFilterFromTerm = function (filterOptions) {
        var /** @type {?} */ searchBy = '';
        var /** @type {?} */ tmpSearchByArray = [];
        var /** @type {?} */ fieldName = filterOptions.fieldName;
        var /** @type {?} */ fieldSearchTerms = filterOptions.listTerm;
        var /** @type {?} */ operator = filterOptions.operator;
        // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
        if (!!fieldSearchTerms && fieldSearchTerms.length > 0) {
            var /** @type {?} */ tmpSearchTerms = [];
            if (operator === 'IN') {
                // example:: (Stage eq "Expired" or Stage eq "Renewal")
                for (var /** @type {?} */ j = 0, /** @type {?} */ lnj = fieldSearchTerms.length; j < lnj; j++) {
                    tmpSearchTerms.push(fieldName + " eq '" + fieldSearchTerms[j] + "'");
                }
                searchBy = tmpSearchTerms.join(' or ');
                searchBy = "$(" + searchBy + ")";
            }
            else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                // example:: (Stage ne "Expired" and Stage ne "Renewal")
                for (var /** @type {?} */ k = 0, /** @type {?} */ lnk = fieldSearchTerms.length; k < lnk; k++) {
                    tmpSearchTerms.push(fieldName + " ne '" + fieldSearchTerms[k] + "'");
                }
                searchBy = tmpSearchTerms.join(' and ');
                searchBy = "$(" + searchBy + ")";
            }
        }
        // push to our temp array and also trim white spaces
        tmpSearchByArray.push(String.trim(searchBy));
        // add to the filter queue only if it doesn't exist in the queue
        var /** @type {?} */ filter = (tmpSearchByArray.length > 0) ? tmpSearchByArray.join(' and ') : '';
        if (this._odataOptions.filterQueue && this._odataOptions.filterQueue.indexOf(filter) === -1) {
            this._odataOptions.filterQueue.push(filter);
        }
    };
    /**
     * Change any OData options that will be used to build the query
     * @param {?} options
     * @return {?}
     */
    OdataService.prototype.updateOptions = function (options) {
        for (var _i = 0, _a = Object.keys(options); _i < _a.length; _i++) {
            var property = _a[_i];
            if (options.hasOwnProperty(property)) {
                this._odataOptions[property] = options[property]; // replace of the property
            }
            // we need to keep the defaultSortBy for references whenever the user removes his Sorting
            // then we would revert to the defaultSortBy and the only way is to keep a hard copy here
            if (property === 'orderBy' || property === 'sortBy') {
                var /** @type {?} */ sortBy = options[property];
                // make sure first char of each orderBy field is capitalize
                if (this._odataOptions.caseType === CaseType.pascalCase) {
                    if (Array.isArray(sortBy)) {
                        sortBy.forEach(function (field, index, inputArray) {
                            inputArray[index] = String.titleCase(field);
                        });
                    }
                    else {
                        sortBy = String.titleCase(options[property]);
                    }
                }
                this._odataOptions.orderBy = sortBy;
                this._defaultSortBy = sortBy;
            }
        }
    };
    return OdataService;
}());
OdataService.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
OdataService.ctorParameters = function () { return []; };
var moment$14 = moment___default__default || moment___default;
var GridOdataService = (function () {
    /**
     * @param {?} odataService
     */
    function GridOdataService(odataService) {
        this.odataService = odataService;
        this.defaultSortBy = '';
        this.minUserInactivityOnFilter = 700;
    }
    /**
     * @return {?}
     */
    GridOdataService.prototype.buildQuery = function () {
        return this.odataService.buildQuery();
    };
    /**
     * @param {?} options
     * @return {?}
     */
    GridOdataService.prototype.initOptions = function (options) {
        this.odataService.options = options;
    };
    /**
     * @param {?} fieldName
     * @return {?}
     */
    GridOdataService.prototype.removeColumnFilter = function (fieldName) {
        this.odataService.removeColumnFilter(fieldName);
    };
    /**
     * @return {?}
     */
    GridOdataService.prototype.resetPaginationOptions = function () {
        this.odataService.updateOptions({
            skip: 0
        });
    };
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} terms
     * @return {?}
     */
    GridOdataService.prototype.saveColumnFilter = function (fieldName, value, terms) {
        this.odataService.saveColumnFilter(fieldName, value, terms);
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GridOdataService.prototype.onFilterChanged = function (event, args) {
        var /** @type {?} */ searchBy = '';
        var /** @type {?} */ timer = 0;
        var /** @type {?} */ searchByArray = [];
        // loop through all columns to inspect filters
        for (var /** @type {?} */ columnId in args.columnFilters) {
            if (args.columnFilters.hasOwnProperty(columnId)) {
                var /** @type {?} */ columnFilter = args.columnFilters[columnId];
                var /** @type {?} */ columnDef = columnFilter.columnDef;
                var /** @type {?} */ fieldName = columnDef.field || columnDef.name;
                var /** @type {?} */ fieldType = columnDef.type || 'string';
                var /** @type {?} */ fieldSearchValue = columnFilter.searchTerm;
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string') {
                    throw new Error("OData filter term property must be provided type \"string\", if you use filter with options then make sure your ids are also string. For example: filter: {type: FormElementType.select, selectOptions: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                }
                var /** @type {?} */ searchTerms = columnFilter.listTerm || [];
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                var /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                var /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
                var /** @type {?} */ searchValue = (!!matches) ? matches[2] : fieldSearchValue;
                var /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : '';
                var /** @type {?} */ bypassOdataQuery = columnFilter.bypassBackendQuery || false;
                // no need to query if search value is empty
                if (fieldName && searchValue === '') {
                    this.removeColumnFilter(fieldName);
                    continue;
                }
                // escaping the search value
                searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                searchValue = encodeURIComponent(searchValue); // encode URI of the final search value
                // extra query arguments
                if (bypassOdataQuery) {
                    // push to our temp array and also trim white spaces
                    if (fieldName) {
                        this.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
                    }
                }
                else {
                    var /** @type {?} */ searchBy_1 = '';
                    // titleCase the fieldName so that it matches the WebApi names
                    var /** @type {?} */ fieldNameTitleCase = String.titleCase(fieldName || '');
                    // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                    if (searchTerms && searchTerms.length > 0) {
                        var /** @type {?} */ tmpSearchTerms = [];
                        if (operator === 'IN') {
                            // example:: (Stage eq "Expired" or Stage eq "Renewal")
                            for (var /** @type {?} */ j = 0, /** @type {?} */ lnj = searchTerms.length; j < lnj; j++) {
                                tmpSearchTerms.push(fieldNameTitleCase + " eq '" + searchTerms[j] + "'");
                            }
                            searchBy_1 = tmpSearchTerms.join(' or ');
                            searchBy_1 = "(" + searchBy_1 + ")";
                        }
                        else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                            // example:: (Stage ne "Expired" and Stage ne "Renewal")
                            for (var /** @type {?} */ k = 0, /** @type {?} */ lnk = searchTerms.length; k < lnk; k++) {
                                tmpSearchTerms.push(fieldNameTitleCase + " ne '" + searchTerms[k] + "'");
                            }
                            searchBy_1 = tmpSearchTerms.join(' and ');
                            searchBy_1 = "(" + searchBy_1 + ")";
                        }
                    }
                    else if (operator === '*' || lastValueChar !== '') {
                        // first/last character is a '*' will be a startsWith or endsWith
                        searchBy_1 = operator === '*'
                            ? "endswith(" + fieldNameTitleCase + ", '" + searchValue + "')"
                            : "startswith(" + fieldNameTitleCase + ", '" + searchValue + "')";
                    }
                    else if (fieldType === FieldType.date) {
                        // date field needs to be UTC and within DateTime function
                        var /** @type {?} */ dateFormatted = this.parseUtcDate(searchValue, true);
                        if (dateFormatted) {
                            searchBy_1 = fieldNameTitleCase + " " + this.mapOperator(operator) + " DateTime'" + dateFormatted + "'";
                        }
                    }
                    else if (fieldType === FieldType.string) {
                        // string field needs to be in single quotes
                        searchBy_1 = "substringof('" + searchValue + "', " + fieldNameTitleCase + ")";
                    }
                    else {
                        // any other field type (or undefined type)
                        searchValue = fieldType === FieldType.number ? searchValue : "'" + searchValue + "'";
                        searchBy_1 = fieldNameTitleCase + " " + this.mapOperator(operator) + " " + searchValue;
                    }
                    // push to our temp array and also trim white spaces
                    if (searchBy_1 !== '') {
                        searchByArray.push(String.trim(searchBy_1));
                        this.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
                    }
                }
            }
        }
        // build the filter query
        this.odataService.updateOptions({
            filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
            skip: undefined
        });
        // reset Pagination, then build the OData query which we will use in the WebAPI callback
        this.resetPaginationOptions();
        return this.odataService.buildQuery();
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GridOdataService.prototype.onPaginationChanged = function (event, args) {
        this.odataService.updateOptions({
            top: args.pageSize,
            skip: (args.newPage - 1) * args.pageSize
        });
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GridOdataService.prototype.onSortChanged = function (event, args) {
        var /** @type {?} */ sortByArray = [];
        var /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // build the SortBy string, it could be multisort, example: customerNo asc, purchaserName desc
        if (sortColumns && sortColumns.length === 0) {
            sortByArray = new Array(this.defaultSortBy); // when empty, use the default sort
        }
        else {
            if (sortColumns) {
                for (var _i = 0, sortColumns_1 = sortColumns; _i < sortColumns_1.length; _i++) {
                    var column = sortColumns_1[_i];
                    var /** @type {?} */ fieldName = column.sortCol.field || column.sortCol.id;
                    if (this.odataService.options.caseType === CaseType.pascalCase) {
                        fieldName = String.titleCase(fieldName);
                    }
                    var /** @type {?} */ direction = column.sortAsc ? 'asc' : 'desc';
                    var /** @type {?} */ sortByColumnString = fieldName + " " + direction;
                    sortByArray.push(sortByColumnString);
                }
            }
        }
        // transform the sortby array into a CSV string
        var /** @type {?} */ csvArray = sortByArray.join(',');
        this.odataService.updateOptions({
            orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvArray) : csvArray
        });
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    };
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @param {?} operator
     * @return {?} string map
     */
    GridOdataService.prototype.mapOperator = function (operator) {
        var /** @type {?} */ map = '';
        switch (operator) {
            case '<':
                map = 'lt';
                break;
            case '<=':
                map = 'le';
                break;
            case '>':
                map = 'gt';
                break;
            case '>=':
                map = 'ge';
                break;
            case '<>':
            case '!=':
                map = 'ne';
                break;
            case '=':
            case '==':
            default:
                map = 'eq';
                break;
        }
        return map;
    };
    /**
     * Parse a date passed as a string and return a Date object (if valid)
     * @param {?} inputDateString
     * @param {?} useUtc
     * @return {?} object Date
     */
    GridOdataService.prototype.parseUtcDate = function (inputDateString, useUtc) {
        var /** @type {?} */ date = null;
        if (/^[0-9\-\/]*$/.test(inputDateString)) {
            // get the UTC datetime with moment.js but we need to decode the value so that's it's valid text
            var /** @type {?} */ dateString = decodeURIComponent(inputDateString);
            var /** @type {?} */ dateMoment = moment$14(new Date(dateString));
            if (dateMoment.isValid() && dateMoment.year().toString().length === 4) {
                date = (useUtc) ? dateMoment.utc().format() : dateMoment.format();
            }
        }
        return date;
    };
    return GridOdataService;
}());
GridOdataService.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
GridOdataService.ctorParameters = function () { return [
    { type: OdataService, },
]; };
var SlickPaginationComponent = (function () {
    function SlickPaginationComponent() {
        this.dataFrom = 1;
        this.dataTo = 1;
        this.itemsPerPage = 25;
        this.pageCount = 0;
        this.pageNumber = 1;
        this.totalItems = 0;
        this.paginationPageSizes = [25, 75, 100];
    }
    Object.defineProperty(SlickPaginationComponent.prototype, "gridPaginationOptions", {
        /**
         * @return {?}
         */
        get: function () {
            return this._gridPaginationOptions;
        },
        /**
         * @param {?} gridPaginationOptions
         * @return {?}
         */
        set: function (gridPaginationOptions) {
            this._gridPaginationOptions = gridPaginationOptions;
            if (!gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
                this.refreshPagination();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.ngOnInit = function () {
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.ngAfterViewInit = function () {
        this._gridPaginationOptions = this._gridPaginationOptions;
        if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
        }
    };
    /**
     * @param {?} number
     * @return {?}
     */
    SlickPaginationComponent.prototype.ceil = function (number) {
        return Math.ceil(number);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.onChangeItemPerPage = function (event) {
        var /** @type {?} */ itemsPerPage = (event.target.value);
        this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
        this.pageNumber = 1;
        this.itemsPerPage = itemsPerPage;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToFirstPage = function (event) {
        this.pageNumber = 1;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToLastPage = function (event) {
        this.pageNumber = this.pageCount;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToNextPage = function (event) {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber++;
            this.onPageChanged(event, this.pageNumber);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToPreviousPage = function (event) {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.onPageChanged(event, this.pageNumber);
        }
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.gotoFirstPage = function () {
        this.pageNumber = 1;
        this.onPageChanged(undefined, this.pageNumber);
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.refreshPagination = function () {
        if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
            // if totalItems changed, we should always go back to the first page and recalculation the From-To indexes
            if (this.totalItems !== this._gridPaginationOptions.pagination.totalItems) {
                this.pageNumber = 1;
                this.recalculateFromToIndexes();
            }
            // calculate and refresh the multiple properties of the pagination UI
            this.paginationPageSizes = this._gridPaginationOptions.pagination.pageSizes;
            this.itemsPerPage = this._gridPaginationOptions.pagination.pageSize;
            if (this._gridPaginationOptions.onPaginationChanged) {
                this.paginationCallback = this._gridPaginationOptions.onPaginationChanged;
            }
            this.totalItems = this._gridPaginationOptions.pagination.totalItems;
            this.dataTo = this.itemsPerPage;
        }
        this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    };
    /**
     * @param {?=} event
     * @param {?=} pageNumber
     * @return {?}
     */
    SlickPaginationComponent.prototype.onPageChanged = function (event, pageNumber) {
        this.recalculateFromToIndexes();
        if (this.dataTo > this.totalItems) {
            this.dataTo = this.totalItems;
        }
        if (typeof this.paginationCallback === 'function') {
            var /** @type {?} */ itemsPerPage = this.itemsPerPage;
            this.paginationCallback(event, { newPage: pageNumber, pageSize: itemsPerPage });
        }
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.recalculateFromToIndexes = function () {
        this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
        this.dataTo = (this.pageNumber * this.itemsPerPage);
    };
    return SlickPaginationComponent;
}());
SlickPaginationComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'slick-pagination',
                template: "\n    <div class=\"slick-pagination\">\n    <div class=\"slick-pagination-nav\">\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"pageNumber === 1 ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-first fa fa-angle-double-left\" aria-label=\"First\" (click)=\"changeToFirstPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"pageNumber === 1 ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-prev fa fa-angle-left\" aria-label=\"Previous\" (click)=\"changeToPreviousPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n\n        <div class=\"slick-page-number\">\n        page {{pageNumber}} of {{pageCount}}\n        </div>\n\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"pageNumber === pageCount ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-next fa fa-angle-right\" aria-label=\"Next\" (click)=\"changeToNextPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"pageNumber === pageCount ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-end fa fa-angle-double-right\" aria-label=\"Last\" (click)=\"changeToLastPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n    </div>\n    <span class=\"slick-pagination-settings\">\n        <select id=\"items-per-page-label\" [value]=\"itemsPerPage\" (change)=\"onChangeItemPerPage($event)\">\n        <option value=\"{{pageSize}}\" *ngFor=\"let pageSize of paginationPageSizes;\">{{pageSize}}</option>\n        </select>\n        items per page,\n        <span class=\"slick-pagination-count\">\n        {{dataFrom}}-{{dataTo}} of {{totalItems}} items\n        </span>\n    </span>\n    </div>\n  ",
                styles: [
                    "\n      /* Pagination styling */\n      .slick-pagination {\n        border-top: 0 none;\n        border-right: 0 none;\n        border-bottom: 0 none;\n        border-left: 0 none;\n        width: 100%;\n        height: 34px;\n        padding-top: 4px;\n        vertical-align: middle;\n        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n        font-size: 13px;\n        font-weight: 400;\n        color: #808080;\n      }\n      .slick-pagination .slick-pagination-status {\n        display: inline-block;\n        padding: 6px;\n      }\n      .slick-pagination .ui-icon-container {\n        display: inline-block;\n        border-color: #ddd;\n      }\n      .slick-pagination .slick-pagination-nav {\n        display: inline-block;\n        padding: 2px;\n        height: 34px;\n      }\n      .slick-pagination .slick-pagination-nav nav {\n        display: inline-block;\n      }\n      .slick-pagination .slick-pagination-nav .slick-page-number {\n        vertical-align: top;\n        margin-top: 6px;\n        display: inline-block;\n        padding: 0 5px;\n      }\n      .slick-pagination .slick-pagination-nav .pagination {\n        margin: 0;\n      }\n      .slick-pagination .slick-pagination-nav .pagination .page-link {\n        font-size: 13px;\n        font-weight: bold;\n        border: 1px solid #ccc;\n      }\n      .slick-pagination .slick-pagination-nav .pagination .page-item {\n        cursor: pointer;\n        font-weight: bold;\n      }\n      .slick-pagination .slick-pagination-nav .pagination .page-item a[class*=\"icon-seek-\"] {\n        text-decoration: none;\n        font-size: 14px;\n        border-color: silver;\n      }\n      .slick-pagination .slick-pagination-nav .pagination .page-item.disabled {\n        cursor: not-allowed;\n        font-weight: normal;\n      }\n      .slick-pagination .slick-pagination-nav .pagination .page-item.disabled > .page-link {\n        font-weight: normal;\n      }\n      .slick-pagination .slick-pagination-nav .pagination .page-item.disabled a[class*=\"icon-seek-\"] {\n        background-color: #f9f9f9;\n        border-color: #dedede;\n      }\n      .slick-pagination .slick-pagination-settings {\n        display: block;\n        float: right;\n        padding: 2px;\n        vertical-align: middle;\n      }\n      .slick-pagination .slick-pagination-settings select {\n        font-size: 12px;\n        line-height: 1.5;\n        height: 32px;\n        width: 62px;\n        padding: 5px;\n        border: 1px solid #ccc;\n        border-radius: 3px;\n      }\n      .slick-pagination .slick-pagination-settings .slick-pagination-count {\n        padding-left: 10px;\n      }\n    "
                ]
            },] },
];
/**
 * @nocollapse
 */
SlickPaginationComponent.ctorParameters = function () { return []; };
SlickPaginationComponent.propDecorators = {
    'gridPaginationOptions': [{ type: _angular_core.Input },],
    'grid': [{ type: _angular_core.Input },],
};
/**
 * Options that can be passed to the Bootstrap-Datetimepicker directly
 */
var GlobalGridOptions = {
    autoEdit: false,
    asyncEditorLoading: false,
    autoFitColumnsOnFirstLoad: true,
    autoResize: {
        bottomPadding: 20,
        minHeight: 180,
        minWidth: 300,
        sidePadding: 0
    },
    enableAutoResize: true,
    cellHighlightCssClass: 'slick-cell-modified',
    editable: false,
    enableCellNavigation: false,
    enableColumnPicker: true,
    enableColumnReorder: true,
    enableMouseOverRow: true,
    enablePagination: false,
    enableSorting: true,
    enableTextSelectionOnCells: true,
    explicitInitialization: false,
    forceFitColumns: false,
    headerRowHeight: 35,
    multiColumnSort: true,
    pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: 25,
        totalItems: 0
    },
    rowHeight: 35,
    showHeaderRow: false,
    topPanelHeight: 25
};
var AngularSlickgridComponent = (function () {
    /**
     * @param {?} resizer
     * @param {?} mouseService
     * @param {?} filterService
     * @param {?} sortService
     */
    function AngularSlickgridComponent(resizer, mouseService, filterService, sortService) {
        this.resizer = resizer;
        this.mouseService = mouseService;
        this.filterService = filterService;
        this.sortService = sortService;
        this._columnFilters = {};
        this.showPagination = false;
        this.onFilter = new Slick.Event();
        this.gridHeight = 100;
        this.gridWidth = 600;
    }
    Object.defineProperty(AngularSlickgridComponent.prototype, "dataset", {
        /**
         * @return {?}
         */
        get: function () {
            return this._dataView.getItems();
        },
        /**
         * @param {?} dataset
         * @return {?}
         */
        set: function (dataset) {
            this._dataset = dataset;
            this.refreshGridData(dataset);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.ngOnInit = function () {
        this.gridHeightString = this.gridHeight + "px";
        this.gridWidthString = this.gridWidth + "px";
    };
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.ngAfterViewInit = function () {
        // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
        this._dataset = this._dataset || [];
        this._gridOptions = this.mergeGridOptions();
        this._dataView = new Slick.Data.DataView();
        this.grid = new Slick.Grid("#" + this.gridId, this._dataView, this.columnDefinitions, this._gridOptions);
        this.grid.setSelectionModel(new Slick.RowSelectionModel());
        if (this._gridOptions.enableColumnPicker) {
            var /** @type {?} */ columnpicker = new Slick.Controls.ColumnPicker(this.columnDefinitions, this.grid, this._gridOptions);
        }
        this.grid.init();
        this._dataView.beginUpdate();
        this.attachDifferentHooks(this.grid, this._gridOptions, this._dataView);
        this._dataView.setItems(this._dataset);
        this._dataView.endUpdate();
        // attach resize ONLY after the dataView is ready
        this.attachResizeHook(this.grid, this._gridOptions);
    };
    /**
     * @param {?} grid
     * @param {?} options
     * @param {?} dataView
     * @return {?}
     */
    AngularSlickgridComponent.prototype.attachDifferentHooks = function (grid, options, dataView) {
        // attach external sorting (backend) when available or default onSort (dataView)
        if (options.enableSorting) {
            (typeof options.onSortChanged === 'function') ? this.sortService.attachBackendOnSort(grid, options) : this.sortService.attachLocalOnSort(grid, options, this._dataView);
        }
        // attach external filter (backend) when available or default onSort (dataView)
        if (options.enableFiltering) {
            this.filterService.init(grid, options, this.columnDefinitions, this._columnFilters);
            (typeof options.onFilterChanged === 'function') ? this.filterService.attachBackendOnFilter() : this.filterService.attachLocalOnFilter(this._dataView);
        }
        // if enable, change background color on mouse over
        if (options.enableMouseOverRow) {
            this.mouseService.attachOnMouseHover(grid);
        }
        dataView.onRowCountChanged.subscribe(function (e, args) {
            grid.updateRowCount();
            grid.render();
        });
        dataView.onRowsChanged.subscribe(function (e, args) {
            grid.invalidateRows(args.rows);
            grid.render();
        });
    };
    /**
     * @param {?} grid
     * @param {?} options
     * @return {?}
     */
    AngularSlickgridComponent.prototype.attachResizeHook = function (grid, options) {
        // expand/autofit columns on first page load
        if (this._gridOptions.autoFitColumnsOnFirstLoad) {
            this.grid.autosizeColumns();
        }
        // auto-resize grid on browser resize
        if (options.enableAutoResize) {
            this.resizer.attachAutoResizeDataGrid(grid, options);
            if (options.autoFitColumnsOnFirstLoad) {
                grid.autosizeColumns();
            }
        }
        else {
            this.resizer.resizeGrid(grid, options, { height: this.gridHeight, width: this.gridWidth });
        }
    };
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.mergeGridOptions = function () {
        this.gridOptions.gridId = this.gridId;
        this.gridOptions.gridContainerId = "slickGridContainer-" + this.gridId;
        if (this.gridOptions.enableFiltering) {
            this.gridOptions.showHeaderRow = true;
        }
        var /** @type {?} */ options = Object.assign({}, GlobalGridOptions, this.gridOptions);
        return options;
    };
    /**
     * Toggle the filter row displayed on first row
     * @param {?} isShowing
     * @return {?}
     */
    AngularSlickgridComponent.prototype.showHeaderRow = function (isShowing) {
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    };
    /**
     * Toggle the filter row displayed on first row
     * @return {?}
     */
    AngularSlickgridComponent.prototype.toggleHeaderRow = function () {
        var /** @type {?} */ isShowing = !this.grid.getOptions().showHeaderRow;
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    };
    /**
     * @param {?} dataset
     * @return {?}
     */
    AngularSlickgridComponent.prototype.refreshGridData = function (dataset) {
        var _this = this;
        if (dataset && this.grid) {
            this._dataView.setItems(dataset);
            // this.grid.setData(dataset);
            this.grid.invalidate();
            this.grid.render();
            if (this._gridOptions.enablePagination) {
                this.showPagination = true;
                this.gridPaginationOptions = this.mergeGridOptions();
            }
            if (this._gridOptions.enableAutoResize) {
                // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
                setTimeout(function () {
                    _this.resizer.resizeGrid(_this.grid, _this._gridOptions);
                    _this.grid.autosizeColumns();
                });
            }
        }
    };
    return AngularSlickgridComponent;
}());
AngularSlickgridComponent.decorators = [
    { type: _angular_core.Injectable },
    { type: _angular_core.Component, args: [{
                selector: 'angular-slickgrid',
                template: "\n    <div id=\"slickGridContainer-{{gridId}}\" class=\"gridPane\">\n    <div attr.id='{{gridId}}'\n            class=\"slickgrid-container\"\n            [style.height]=\"gridHeightString\"\n            [style.width]=\"gridWidthString\">\n    </div>\n\n    <slick-pagination id=\"slickPagingContainer-{{gridId}}\" *ngIf=\"showPagination\" [gridPaginationOptions]=\"gridPaginationOptions\"></slick-pagination>\n    </div>\n  "
            },] },
];
/**
 * @nocollapse
 */
AngularSlickgridComponent.ctorParameters = function () { return [
    { type: ResizerService, },
    { type: MouseService, },
    { type: FilterService, },
    { type: SortService, },
]; };
AngularSlickgridComponent.propDecorators = {
    'gridId': [{ type: _angular_core.Input },],
    'columnDefinitions': [{ type: _angular_core.Input },],
    'gridOptions': [{ type: _angular_core.Input },],
    'gridHeight': [{ type: _angular_core.Input },],
    'gridWidth': [{ type: _angular_core.Input },],
    'dataset': [{ type: _angular_core.Input },],
};
var AngularSlickgridModule = (function () {
    function AngularSlickgridModule() {
    }
    return AngularSlickgridModule;
}());
AngularSlickgridModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule
                ],
                declarations: [
                    AngularSlickgridComponent,
                    SlickPaginationComponent
                ],
                exports: [
                    AngularSlickgridComponent,
                    SlickPaginationComponent
                ],
                providers: [
                    MouseService,
                    OdataService,
                    FilterService,
                    SortService,
                    ResizerService
                ]
            },] },
];
/**
 * @nocollapse
 */
AngularSlickgridModule.ctorParameters = function () { return []; };

exports.CaseType = CaseType;
exports.FormElementType = FormElementType;
exports.FieldType = FieldType;
exports.FilterConditions = FilterConditions;
exports.FilterTemplates = FilterTemplates;
exports.Formatters = Formatters;
exports.Sorters = Sorters;
exports.FilterService = FilterService;
exports.MouseService = MouseService;
exports.ResizerService = ResizerService;
exports.SortService = SortService;
exports.GridOdataService = GridOdataService;
exports.SlickPaginationComponent = SlickPaginationComponent;
exports.AngularSlickgridComponent = AngularSlickgridComponent;
exports.AngularSlickgridModule = AngularSlickgridModule;
exports.ɵa = OdataService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-slickgrid.umd.js.map
