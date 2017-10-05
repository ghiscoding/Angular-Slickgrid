import * as moment_ from 'moment';
import moment___default from 'moment';
import { Component, Injectable, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

let CaseType = {};
CaseType.camelCase = 0;
CaseType.pascalCase = 1;
CaseType.snakeCase = 2;
CaseType[CaseType.camelCase] = "camelCase";
CaseType[CaseType.pascalCase] = "pascalCase";
CaseType[CaseType.snakeCase] = "snakeCase";

let FormElementType = {};
FormElementType.input = 0;
FormElementType.multiSelect = 1;
FormElementType.select = 2;
FormElementType.textarea = 3;
FormElementType[FormElementType.input] = "input";
FormElementType[FormElementType.multiSelect] = "multiSelect";
FormElementType[FormElementType.select] = "select";
FormElementType[FormElementType.textarea] = "textarea";

let FieldType = {};
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
const booleanFilterCondition = (options) => {
    return parseBoolean(options.cellValue) === parseBoolean(options.searchTerm);
};

const mapDateFormatByFieldType = (fieldType) => {
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
const testFilterCondition = (operator, value1, value2) => {
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

const moment = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateUtcFilterCondition = (options) => {
    if (!options.filterSearchType) {
        throw new Error('Date UTC filter is a special case and requires a filterSearchType to be provided in the column option, for example: { filterable: true, type: FieldType.dateUtc, filterSearchType: FieldType.dateIso }');
    }
    const /** @type {?} */ searchDateFormat = mapDateFormatByFieldType(options.filterSearchType);
    if (!moment(options.cellValue, moment.ISO_8601).isValid() || !moment(options.searchTerm, searchDateFormat, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment(options.cellValue, moment.ISO_8601, true);
    const /** @type {?} */ dateSearch = moment(options.searchTerm, searchDateFormat, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

const moment$1 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const DATE_FORMAT = 'YYYY-MM-DD';
const dateIsoFilterCondition = (options) => {
    if (!moment$1(options.cellValue, DATE_FORMAT, true).isValid() || !moment$1(options.searchTerm, DATE_FORMAT, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment$1(options.cellValue, DATE_FORMAT, true);
    const /** @type {?} */ dateSearch = moment$1(options.searchTerm, DATE_FORMAT, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

const moment$2 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const DATE_FORMAT$1 = 'M/D/YY';
const dateUsShortFilterCondition = (options) => {
    if (!moment$2(options.cellValue, DATE_FORMAT$1, true).isValid() || !moment$2(options.searchTerm, DATE_FORMAT$1, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment$2(options.cellValue, DATE_FORMAT$1, true);
    const /** @type {?} */ dateSearch = moment$2(options.searchTerm, DATE_FORMAT$1, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

const moment$3 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const DATE_FORMAT$2 = 'M/D/YYYY';
const dateUsFilterCondition = (options) => {
    if (!moment$3(options.cellValue, DATE_FORMAT$2, true).isValid() || !moment$3(options.searchTerm, DATE_FORMAT$2, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment$3(options.cellValue, DATE_FORMAT$2, true);
    const /** @type {?} */ dateSearch = moment$3(options.searchTerm, DATE_FORMAT$2, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

const moment$4 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateFilterCondition = (options) => {
    const /** @type {?} */ filterSearchType = options.filterSearchType || FieldType.dateIso;
    const /** @type {?} */ searchDateFormat = mapDateFormatByFieldType(filterSearchType);
    if (!moment$4(options.cellValue, moment$4.ISO_8601).isValid() || !moment$4(options.searchTerm, searchDateFormat, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment$4(options.cellValue);
    const /** @type {?} */ dateSearch = moment$4(options.searchTerm);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

const numberFilterCondition = (options) => {
    return testFilterCondition(options.operator || '==', parseFloat(options.cellValue), parseFloat(options.searchTerm));
};

const stringFilterCondition = (options) => {
    // make sure the cell value is a string by casting it
    options.cellValue = options.cellValue.toString();
    if (options.operator === '*') {
        return options.cellValue.startsWith(options.searchTerm);
    }
    else if (options.operator === '' && options.cellValueLastChar === '*') {
        return options.cellValue.endsWith(options.searchTerm);
    }
    else if (options.operator === '') {
        return options.cellValue.includes(options.searchTerm);
    }
    return testFilterCondition(options.operator || '==', options.cellValue.toLowerCase(), options.searchTerm.toLowerCase());
};

const executeMappedCondition = (options) => {
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

const FilterConditions = {
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

const inputFilterTemplate = (searchTerm, columnDef) => {
    return `<input type="text" class="form-control search-filter" style="font-family: Segoe UI Symbol;" placeholder="&#128269;">`;
};

const selectFilterTemplate = (searchTerm, columnDef) => {
    if (!columnDef.filter.selectOptions) {
        throw new Error(`SelectOptions with value/label is required to populate the Select list, for example:: { filter: type: FormElementType.select, selectOptions: [ { value: '1', label: 'One' } ]')`);
    }
    let /** @type {?} */ options = '';
    columnDef.filter.selectOptions.forEach((option) => {
        options += `<option value="${option.value}">${option.label}</option>`;
    });
    return `<select id="search-${columnDef.id}" class="form-control">${options}</select>`;
};

const FilterTemplates = {
    input: inputFilterTemplate,
    select: selectFilterTemplate
};

const checkboxFormatter = (row, cell, value, columnDef, dataContext) => value ? '&#x2611;' : '';

const checkmarkFormatter = (row, cell, value, columnDef, dataContext) => value ? `<i class="fa fa-check" aria-hidden="true"></i>` : '';

const moment$5 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateIsoFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$5(value).format('YYYY-MM-DD') : '';

const moment$6 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateTimeIsoAmPmFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$6(value).format('YYYY-MM-DD h:mm:ss a') : '';

const moment$7 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateTimeUsAmPmFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$7(value).format('MM/DD/YYYY h:mm:ss a') : '';

const moment$8 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateTimeUsFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$8(value).format('MM/DD/YYYY hh:mm:ss') : '';

const moment$9 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateUsFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$9(value).format('MM/DD/YYYY') : '';

const percentCompleteFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value === null || value === '') {
        return '-';
    }
    else if (value < 50) {
        return `<span style='color:red;font-weight:bold;'>${value}%</span>`;
    }
    else {
        return `<span style='color:green'>${value}%</span>`;
    }
};

const percentCompleteBarFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value === null || value === '') {
        return '';
    }
    let /** @type {?} */ color;
    if (value < 30) {
        color = 'red';
    }
    else if (value < 70) {
        color = 'silver';
    }
    else {
        color = 'green';
    }
    return `<span class="percent-complete-bar" style="background:${color}; width:${value}%"></span>`;
};

const progressBarFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value === null || value === '') {
        return '';
    }
    let /** @type {?} */ color;
    if (value < 30) {
        color = 'danger';
    }
    else if (value < 70) {
        color = 'warning';
    }
    else {
        color = 'success';
    }
    return `<div class="progress">
    <div class="progress-bar progress-bar-${color}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${value}%;">
    ${value}%
    </div>
  </div>`;
};

const yesNoFormatter = (row, cell, value, columnDef, dataContext) => value ? 'Yes' : 'No';

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
const Formatters = {
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

const moment$10 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const DATE_FORMAT$3 = 'M/D/YY';
const dateUsShortSorter = (value1, value2, sortDirection) => {
    if (!moment$10(value1, DATE_FORMAT$3, true).isValid() || !moment$10(value2, DATE_FORMAT$3, true).isValid()) {
        return 0;
    }
    const /** @type {?} */ date1 = moment$10(value1, DATE_FORMAT$3, true);
    const /** @type {?} */ date2 = moment$10(value2, DATE_FORMAT$3, true);
    const /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};

const moment$11 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateSorter = (value1, value2, sortDirection) => {
    if (!moment$11(value1, moment$11.ISO_8601).isValid() || !moment$11(value2, moment$11.ISO_8601, true).isValid()) {
        return 0;
    }
    const /** @type {?} */ date1 = moment$11(value1);
    const /** @type {?} */ date2 = moment$11(value2);
    const /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};

const moment$12 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const DATE_FORMAT$4 = 'YYYY-MM-DD';
const dateIsoSorter = (value1, value2, sortDirection) => {
    if (!moment$12(value1, DATE_FORMAT$4, true).isValid() || !moment$12(value2, DATE_FORMAT$4, true).isValid()) {
        return 0;
    }
    const /** @type {?} */ date1 = moment$12(value1, DATE_FORMAT$4, true);
    const /** @type {?} */ date2 = moment$12(value2, DATE_FORMAT$4, true);
    const /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};

const moment$13 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const DATE_FORMAT$5 = 'M/D/YYYY';
const dateUsSorter = (value1, value2, sortDirection) => {
    if (!moment$13(value1, DATE_FORMAT$5, true).isValid() || !moment$13(value2, DATE_FORMAT$5, true).isValid()) {
        return 0;
    }
    const /** @type {?} */ date1 = moment$13(value1, DATE_FORMAT$5, true);
    const /** @type {?} */ date2 = moment$13(value2, DATE_FORMAT$5, true);
    const /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};

const numericSorter = (value1, value2, sortDirection) => {
    const /** @type {?} */ x = (isNaN(value1) || value1 === '' || value1 === null) ? -99e+10 : parseFloat(value1);
    const /** @type {?} */ y = (isNaN(value2) || value2 === '' || value2 === null) ? -99e+10 : parseFloat(value2);
    return sortDirection * (x === y ? 0 : (x > y ? 1 : -1));
};

const stringSorter = (value1, value2, sortDirection) => {
    return sortDirection * (value1 === value2 ? 0 : (value1 > value2 ? 1 : -1));
};

const Sorters = {
    date: dateSorter,
    dateIso: dateIsoSorter,
    dateUs: dateUsSorter,
    dateUsShort: dateUsShortSorter,
    numeric: numericSorter,
    string: stringSorter
};

class FilterService {
    constructor() { }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} columnDefinitions
     * @param {?} columnFilters
     * @return {?}
     */
    init(grid, gridOptions, columnDefinitions, columnFilters) {
        this._columnDefinitions = columnDefinitions;
        this._columnFilters = columnFilters;
        this._gridOptions = gridOptions;
        this._grid = grid;
    }
    /**
     * Attach a backend filter hook to the grid
     * @return {?}
     */
    attachBackendOnFilter() {
        this.subscriber = new Slick.Event();
        this.subscriber.subscribe(this._gridOptions.onFilterChanged);
        this.addFilterTemplateToHeaderRow();
    }
    /**
     * @param {?} operator
     * @param {?} value1
     * @param {?} value2
     * @return {?}
     */
    testFilterCondition(operator, value1, value2) {
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
    }
    /**
     * Attach a local filter hook to the grid
     * @param {?} dataView
     * @return {?}
     */
    attachLocalOnFilter(dataView) {
        this._dataView = dataView;
        this.subscriber = new Slick.Event();
        dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
        dataView.setFilter(this.customFilter);
        this.subscriber.subscribe((e, args) => {
            const /** @type {?} */ columnId = args.columnId;
            if (columnId != null) {
                dataView.refresh();
            }
        });
        this.addFilterTemplateToHeaderRow();
    }
    /**
     * @param {?} item
     * @param {?} args
     * @return {?}
     */
    customFilter(item, args) {
        for (const /** @type {?} */ columnId of Object.keys(args.columnFilters)) {
            const /** @type {?} */ columnFilter = args.columnFilters[columnId];
            const /** @type {?} */ columnIndex = args.grid.getColumnIndex(columnId);
            const /** @type {?} */ columnDef = args.grid.getColumns()[columnIndex];
            const /** @type {?} */ fieldName = columnDef.field || columnDef.name;
            const /** @type {?} */ fieldType = columnDef.type || FieldType.string;
            const /** @type {?} */ conditionalFilterFn = (columnDef.filter && columnDef.filter.conditionalFilter) ? columnDef.filter.conditionalFilter : null;
            const /** @type {?} */ filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
            let /** @type {?} */ cellValue = item[columnDef.field];
            let /** @type {?} */ fieldSearchValue = columnFilter.searchTerm;
            if (typeof fieldSearchValue === 'undefined') {
                fieldSearchValue = '';
            }
            fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
            const /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
            const /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
            const /** @type {?} */ searchTerm = (!!matches) ? matches[2] : '';
            const /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : '';
            // no need to query if search value is empty
            if (searchTerm === '') {
                return true;
            }
            if (typeof cellValue === 'number') {
                cellValue = cellValue.toString();
            }
            const /** @type {?} */ conditionOptions = {
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
    }
    /**
     * @return {?}
     */
    destroy() {
        this.subscriber.unsubscribe();
    }
    /**
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    callbackSearchEvent(e, args) {
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
    }
    /**
     * @return {?}
     */
    addFilterTemplateToHeaderRow() {
        for (let /** @type {?} */ i = 0; i < this._columnDefinitions.length; i++) {
            if (this._columnDefinitions[i].id !== 'selector' && this._columnDefinitions[i].filterable) {
                let /** @type {?} */ filterTemplate = '';
                let /** @type {?} */ elm = null;
                let /** @type {?} */ header;
                const /** @type {?} */ columnDef = this._columnDefinitions[i];
                const /** @type {?} */ columnId = columnDef.id;
                const /** @type {?} */ listTerm = (columnDef.filter && columnDef.filter.listTerm) ? columnDef.filter.listTerm : null;
                let /** @type {?} */ searchTerm = (columnDef.filter && columnDef.filter.searchTerm) ? columnDef.filter.searchTerm : '';
                // keep the filter in a columnFilters for later reference
                this.keepColumnFilters(searchTerm, listTerm, columnDef);
                if (!columnDef.filter) {
                    searchTerm = (columnDef.filter && columnDef.filter.searchTerm) ? columnDef.filter.searchTerm : null;
                    filterTemplate = FilterTemplates.input(searchTerm, columnDef);
                }
                else {
                    // custom Select template
                    if (columnDef.filter.type === FormElementType.select) {
                        filterTemplate = FilterTemplates.select(searchTerm, columnDef);
                    }
                }
                // create the DOM Element
                header = this._grid.getHeaderRowColumn(columnDef.id);
                $(header).empty();
                elm = $(filterTemplate);
                elm.val(searchTerm);
                elm.data('columnId', columnDef.id);
                if (elm && typeof elm.appendTo === 'function') {
                    elm.appendTo(header);
                }
                // depending on the DOM Element type, we will watch the corrent event
                const /** @type {?} */ filterType = (columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FormElementType.input;
                switch (filterType) {
                    case FormElementType.select:
                    case FormElementType.multiSelect:
                        elm.change((e) => this.callbackSearchEvent(e, { columnDef: columnDef }));
                        break;
                    case FormElementType.input:
                    default:
                        elm.keyup((e) => this.callbackSearchEvent(e, { columnDef: columnDef }));
                        break;
                }
            }
        }
    }
    /**
     * @param {?} searchTerm
     * @param {?} listTerm
     * @param {?} columnDef
     * @return {?}
     */
    keepColumnFilters(searchTerm, listTerm, columnDef) {
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
    }
    /**
     * @param {?} evt
     * @param {?} args
     * @param {?} e
     * @return {?}
     */
    triggerEvent(evt, args, e) {
        e = e || new Slick.EventData();
        return evt.notify(args, e, args.grid);
    }
}
FilterService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FilterService.ctorParameters = () => [];

class MouseService {
    /**
     * @param {?} grid
     * @return {?}
     */
    attachOnMouseHover(grid) {
        grid.onMouseEnter.subscribe((e) => {
            const /** @type {?} */ cell = grid.getCellFromEvent(e);
            if (cell && cell.row >= 0) {
                grid.setSelectedRows([cell.row]);
                e.preventDefault();
            }
        });
        grid.onMouseLeave.subscribe((e) => {
            grid.setSelectedRows([]);
            e.preventDefault();
        });
    }
}

// global constants, height/width are in pixels
const DATAGRID_MIN_HEIGHT = 180;
const DATAGRID_MIN_WIDTH = 300;
const DATAGRID_BOTTOM_PADDING = 20;
const DATAGRID_PAGINATION_HEIGHT = 35;
class ResizerService {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
    }
    /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    attachAutoResizeDataGrid(grid, gridOptions) {
        // if we can't find the grid to resize, return without attaching anything
        const /** @type {?} */ gridDomElm = $(`#${gridOptions.gridId}`);
        if (!gridDomElm || typeof gridDomElm.offset() === 'undefined') {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        this.resizeGrid(grid, gridOptions);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on('resize', () => {
            this.resizeGrid(grid, gridOptions);
        });
        // destroy the resizer on route change
        this.router.events.subscribe((event) => {
            $(window).trigger('resize').off('resize');
        });
    }
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    calculateGridNewDimensions(gridOptions) {
        let /** @type {?} */ bottomPadding = (gridOptions.autoResize && gridOptions.autoResize.bottomPadding) ? gridOptions.autoResize.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && gridOptions.enablePagination) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT; // add pagination height to bottom padding
        }
        if (typeof $(`#${gridOptions.gridId}`).offset !== 'function') {
            return;
        }
        const /** @type {?} */ availableHeight = $(window).height() - $(`#${gridOptions.gridId}`).offset().top - bottomPadding;
        const /** @type {?} */ availableWidth = (gridOptions.autoResize && gridOptions.autoResize.containerId) ? $(`#${gridOptions.autoResize.containerId}`).width() : $(`#${gridOptions.gridContainerId}`).width();
        const /** @type {?} */ minHeight = (gridOptions.autoResize && gridOptions.autoResize.minHeight < 0) ? gridOptions.autoResize.minHeight : DATAGRID_MIN_HEIGHT;
        const /** @type {?} */ minWidth = (gridOptions.autoResize && gridOptions.autoResize.minWidth < 0) ? gridOptions.autoResize.minWidth : DATAGRID_MIN_WIDTH;
        let /** @type {?} */ newHeight = availableHeight;
        let /** @type {?} */ newWidth = (gridOptions.autoResize && gridOptions.autoResize.sidePadding) ? availableWidth - gridOptions.autoResize.sidePadding : availableWidth;
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
    }
    /**
     * Resize the datagrid to fit the browser height & width
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?=} newSizes
     * @return {?}
     */
    resizeGrid(grid, gridOptions, newSizes) {
        // calculate new available sizes but with minimum height of 220px
        newSizes = newSizes || this.calculateGridNewDimensions(gridOptions);
        if (newSizes) {
            // apply these new height/width to the datagrid
            $(`#${gridOptions.gridId}`).height(newSizes.height);
            $(`#${gridOptions.gridId}`).width(newSizes.width);
            $(`#${gridOptions.gridContainerId}`).height(newSizes.height);
            $(`#${gridOptions.gridContainerId}`).width(newSizes.width);
            // resize the slickgrid canvas on all browser except some IE versions
            // exclude all IE below IE11
            // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
            if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && grid) {
                grid.resizeCanvas();
            }
            // also call the grid auto-size columns so that it takes available when going bigger
            grid.autosizeColumns();
        }
    }
}
ResizerService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ResizerService.ctorParameters = () => [
    { type: Router, },
];

class SortService {
    constructor() { }
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} gridOptions Grid Options object
     * @return {?}
     */
    attachBackendOnSort(grid, gridOptions) {
        this.subscriber = grid.onSort;
        this.subscriber.subscribe(gridOptions.onSortChanged);
    }
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} gridOptions Grid Options object
     * @param {?} dataView
     * @return {?}
     */
    attachLocalOnSort(grid, gridOptions, dataView) {
        this.subscriber = grid.onSort;
        this.subscriber.subscribe((e, args) => {
            // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
            // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
            const /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            dataView.sort(function (dataRow1, dataRow2) {
                for (let /** @type {?} */ i = 0, /** @type {?} */ l = sortColumns.length; i < l; i++) {
                    const /** @type {?} */ sortDirection = sortColumns[i].sortAsc ? 1 : -1;
                    const /** @type {?} */ sortField = sortColumns[i].sortCol.field;
                    const /** @type {?} */ value1 = dataRow1[sortField];
                    const /** @type {?} */ value2 = dataRow2[sortField];
                    let /** @type {?} */ result = 0;
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
    }
    /**
     * @return {?}
     */
    destroy() {
        this.subscriber.unsubscribe();
    }
}
SortService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
SortService.ctorParameters = () => [];

String.format = function (format, args) {
    // const args = (Array.isArray(arguments[1])) ? arguments[1] : Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
        return (typeof args[number] !== 'undefined') ? args[number] : match;
    });
};
String.padZero = function (length) {
    let /** @type {?} */ s = this;
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

class OdataService {
    constructor() {
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
    buildQuery() {
        this._odataOptions.filterQueue = [];
        let /** @type {?} */ queryTmpArray = [];
        if (this._odataOptions.top) {
            queryTmpArray.push(`$top=${this._odataOptions.top}`);
        }
        if (this._odataOptions.skip) {
            queryTmpArray.push(`$skip=${this._odataOptions.skip}`);
        }
        if (this._odataOptions.orderBy) {
            let /** @type {?} */ argument = '';
            if (Array.isArray(this._odataOptions.orderBy)) {
                argument = this._odataOptions.orderBy.join(','); // csv, that will form a query example like: $orderby=RoleName asc, Id desc
            }
            else {
                argument = this._odataOptions.orderBy;
            }
            queryTmpArray.push(`$orderby=${argument}`);
        }
        if (this._odataOptions.filterBy || this._odataOptions.filter) {
            if (this._odataOptions.filter) {
                this._odataOptions.filterQueue = [];
                let /** @type {?} */ filterStr = this._odataOptions.filter;
                if (Array.isArray(this._odataOptions.filter)) {
                    const /** @type {?} */ filterBySeparator = this._odataOptions.filterBySeparator || 'and';
                    const /** @type {?} */ separatorSpacedOut = ` ${filterBySeparator} `;
                    filterStr = this._odataOptions.filter.join(separatorSpacedOut);
                }
                this._odataOptions.filterQueue.push(`(${filterStr})`);
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
            const /** @type {?} */ filterBySeparator = this._odataOptions.filterBySeparator || 'and';
            const /** @type {?} */ separatorSpacedOut = ` ${filterBySeparator} `;
            const /** @type {?} */ query = this._odataOptions.filterQueue.join(separatorSpacedOut);
            this._odataOptions.filter = query; // overwrite with
            queryTmpArray.push(`$filter=${query}`);
        }
        // join all the odata functions by a '&'
        return queryTmpArray.join('&');
    }
    /**
     * @param {?} columnName
     * @return {?}
     */
    getFilterByColumn(columnName) {
        return (!!this._columnFilters[columnName]) ? this._columnFilters[columnName] : null;
    }
    /**
     * @return {?}
     */
    getFilterCount() {
        return (this._odataOptions.filterQueue) ? this._odataOptions.filterQueue.length : 0;
    }
    /**
     * @return {?}
     */
    get columnFilters() {
        return this._columnFilters;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._odataOptions;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        this._odataOptions = options;
    }
    /**
     * @param {?} fieldName
     * @return {?}
     */
    removeColumnFilter(fieldName) {
        delete this._columnFilters[fieldName];
    }
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} searchTerms
     * @return {?}
     */
    saveColumnFilter(fieldName, value, searchTerms) {
        this._columnFilters[fieldName] = {
            search: searchTerms,
            value: value
        };
    }
    /**
     * Update the filter by a list of terms usually passed manually by the user as default filters
     * @param {?} filterOptions
     * @return {?}
     */
    updateFilterFromListTerms(filterOptions) {
        // build the filter query
        if (Array.isArray(filterOptions)) {
            filterOptions.forEach((filterOptionObject) => {
                this.updateFilterFromTerm(filterOptionObject);
            });
        }
        else {
            this.updateFilterFromTerm(filterOptions);
        }
    }
    /**
     * @param {?} filterOptions
     * @return {?}
     */
    updateFilterFromTerm(filterOptions) {
        let /** @type {?} */ searchBy = '';
        const /** @type {?} */ tmpSearchByArray = [];
        const /** @type {?} */ fieldName = filterOptions.fieldName;
        const /** @type {?} */ fieldSearchTerms = filterOptions.listTerm;
        const /** @type {?} */ operator = filterOptions.operator;
        // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
        if (!!fieldSearchTerms && fieldSearchTerms.length > 0) {
            let /** @type {?} */ tmpSearchTerms = [];
            if (operator === 'IN') {
                // example:: (Stage eq "Expired" or Stage eq "Renewal")
                for (let /** @type {?} */ j = 0, /** @type {?} */ lnj = fieldSearchTerms.length; j < lnj; j++) {
                    tmpSearchTerms.push(`${fieldName} eq '${fieldSearchTerms[j]}'`);
                }
                searchBy = tmpSearchTerms.join(' or ');
                searchBy = `$(${searchBy})`;
            }
            else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                // example:: (Stage ne "Expired" and Stage ne "Renewal")
                for (let /** @type {?} */ k = 0, /** @type {?} */ lnk = fieldSearchTerms.length; k < lnk; k++) {
                    tmpSearchTerms.push(`${fieldName} ne '${fieldSearchTerms[k]}'`);
                }
                searchBy = tmpSearchTerms.join(' and ');
                searchBy = `$(${searchBy})`;
            }
        }
        // push to our temp array and also trim white spaces
        tmpSearchByArray.push(String.trim(searchBy));
        // add to the filter queue only if it doesn't exist in the queue
        const /** @type {?} */ filter = (tmpSearchByArray.length > 0) ? tmpSearchByArray.join(' and ') : '';
        if (this._odataOptions.filterQueue && this._odataOptions.filterQueue.indexOf(filter) === -1) {
            this._odataOptions.filterQueue.push(filter);
        }
    }
    /**
     * Change any OData options that will be used to build the query
     * @param {?} options
     * @return {?}
     */
    updateOptions(options) {
        for (const /** @type {?} */ property of Object.keys(options)) {
            if (options.hasOwnProperty(property)) {
                this._odataOptions[property] = options[property]; // replace of the property
            }
            // we need to keep the defaultSortBy for references whenever the user removes his Sorting
            // then we would revert to the defaultSortBy and the only way is to keep a hard copy here
            if (property === 'orderBy' || property === 'sortBy') {
                let /** @type {?} */ sortBy = options[property];
                // make sure first char of each orderBy field is capitalize
                if (this._odataOptions.caseType === CaseType.pascalCase) {
                    if (Array.isArray(sortBy)) {
                        sortBy.forEach((field, index, inputArray) => {
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
    }
}
OdataService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
OdataService.ctorParameters = () => [];

const moment$14 = moment___default || moment_;
class GridOdataService {
    /**
     * @param {?} odataService
     */
    constructor(odataService) {
        this.odataService = odataService;
        this.defaultSortBy = '';
        this.minUserInactivityOnFilter = 700;
    }
    /**
     * @return {?}
     */
    buildQuery() {
        return this.odataService.buildQuery();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    initOptions(options) {
        this.odataService.options = options;
    }
    /**
     * @param {?} fieldName
     * @return {?}
     */
    removeColumnFilter(fieldName) {
        this.odataService.removeColumnFilter(fieldName);
    }
    /**
     * @return {?}
     */
    resetPaginationOptions() {
        this.odataService.updateOptions({
            skip: 0
        });
    }
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} terms
     * @return {?}
     */
    saveColumnFilter(fieldName, value, terms) {
        this.odataService.saveColumnFilter(fieldName, value, terms);
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onFilterChanged(event, args) {
        let /** @type {?} */ searchBy = '';
        let /** @type {?} */ timer = 0;
        const /** @type {?} */ searchByArray = [];
        // loop through all columns to inspect filters
        for (const /** @type {?} */ columnId in args.columnFilters) {
            if (args.columnFilters.hasOwnProperty(columnId)) {
                const /** @type {?} */ columnFilter = args.columnFilters[columnId];
                const /** @type {?} */ columnDef = columnFilter.columnDef;
                const /** @type {?} */ fieldName = columnDef.field || columnDef.name;
                const /** @type {?} */ fieldType = columnDef.type || 'string';
                let /** @type {?} */ fieldSearchValue = columnFilter.searchTerm;
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string') {
                    throw new Error(`OData filter term property must be provided type "string", if you use filter with options then make sure your ids are also string. For example: filter: {type: FormElementType.select, selectOptions: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
                }
                const /** @type {?} */ searchTerms = columnFilter.listTerm || [];
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                const /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                const /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
                let /** @type {?} */ searchValue = (!!matches) ? matches[2] : fieldSearchValue;
                const /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : '';
                const /** @type {?} */ bypassOdataQuery = columnFilter.bypassBackendQuery || false;
                // no need to query if search value is empty
                if (fieldName && searchValue === '') {
                    this.removeColumnFilter(fieldName);
                    continue;
                }
                // escaping the search value
                searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
                searchValue = encodeURIComponent(searchValue); // encode URI of the final search value
                // extra query arguments
                if (bypassOdataQuery) {
                    // push to our temp array and also trim white spaces
                    if (fieldName) {
                        this.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
                    }
                }
                else {
                    let /** @type {?} */ searchBy = '';
                    // titleCase the fieldName so that it matches the WebApi names
                    const /** @type {?} */ fieldNameTitleCase = String.titleCase(fieldName || '');
                    // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                    if (searchTerms && searchTerms.length > 0) {
                        let /** @type {?} */ tmpSearchTerms = [];
                        if (operator === 'IN') {
                            // example:: (Stage eq "Expired" or Stage eq "Renewal")
                            for (let /** @type {?} */ j = 0, /** @type {?} */ lnj = searchTerms.length; j < lnj; j++) {
                                tmpSearchTerms.push(`${fieldNameTitleCase} eq '${searchTerms[j]}'`);
                            }
                            searchBy = tmpSearchTerms.join(' or ');
                            searchBy = `(${searchBy})`;
                        }
                        else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                            // example:: (Stage ne "Expired" and Stage ne "Renewal")
                            for (let /** @type {?} */ k = 0, /** @type {?} */ lnk = searchTerms.length; k < lnk; k++) {
                                tmpSearchTerms.push(`${fieldNameTitleCase} ne '${searchTerms[k]}'`);
                            }
                            searchBy = tmpSearchTerms.join(' and ');
                            searchBy = `(${searchBy})`;
                        }
                    }
                    else if (operator === '*' || lastValueChar !== '') {
                        // first/last character is a '*' will be a startsWith or endsWith
                        searchBy = operator === '*'
                            ? `endswith(${fieldNameTitleCase}, '${searchValue}')`
                            : `startswith(${fieldNameTitleCase}, '${searchValue}')`;
                    }
                    else if (fieldType === FieldType.date) {
                        // date field needs to be UTC and within DateTime function
                        const /** @type {?} */ dateFormatted = this.parseUtcDate(searchValue, true);
                        if (dateFormatted) {
                            searchBy = `${fieldNameTitleCase} ${this.mapOperator(operator)} DateTime'${dateFormatted}'`;
                        }
                    }
                    else if (fieldType === FieldType.string) {
                        // string field needs to be in single quotes
                        searchBy = `substringof('${searchValue}', ${fieldNameTitleCase})`;
                    }
                    else {
                        // any other field type (or undefined type)
                        searchValue = fieldType === FieldType.number ? searchValue : `'${searchValue}'`;
                        searchBy = `${fieldNameTitleCase} ${this.mapOperator(operator)} ${searchValue}`;
                    }
                    // push to our temp array and also trim white spaces
                    if (searchBy !== '') {
                        searchByArray.push(String.trim(searchBy));
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
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onPaginationChanged(event, args) {
        this.odataService.updateOptions({
            top: args.pageSize,
            skip: (args.newPage - 1) * args.pageSize
        });
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onSortChanged(event, args) {
        let /** @type {?} */ sortByArray = [];
        const /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // build the SortBy string, it could be multisort, example: customerNo asc, purchaserName desc
        if (sortColumns && sortColumns.length === 0) {
            sortByArray = new Array(this.defaultSortBy); // when empty, use the default sort
        }
        else {
            if (sortColumns) {
                for (let /** @type {?} */ column of sortColumns) {
                    let /** @type {?} */ fieldName = column.sortCol.field || column.sortCol.id;
                    if (this.odataService.options.caseType === CaseType.pascalCase) {
                        fieldName = String.titleCase(fieldName);
                    }
                    const /** @type {?} */ direction = column.sortAsc ? 'asc' : 'desc';
                    const /** @type {?} */ sortByColumnString = `${fieldName} ${direction}`;
                    sortByArray.push(sortByColumnString);
                }
            }
        }
        // transform the sortby array into a CSV string
        const /** @type {?} */ csvArray = sortByArray.join(',');
        this.odataService.updateOptions({
            orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvArray) : csvArray
        });
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @param {?} operator
     * @return {?} string map
     */
    mapOperator(operator) {
        let /** @type {?} */ map = '';
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
    }
    /**
     * Parse a date passed as a string and return a Date object (if valid)
     * @param {?} inputDateString
     * @param {?} useUtc
     * @return {?} object Date
     */
    parseUtcDate(inputDateString, useUtc) {
        let /** @type {?} */ date = null;
        if (/^[0-9\-\/]*$/.test(inputDateString)) {
            // get the UTC datetime with moment.js but we need to decode the value so that's it's valid text
            const /** @type {?} */ dateString = decodeURIComponent(inputDateString);
            const /** @type {?} */ dateMoment = moment$14(new Date(dateString));
            if (dateMoment.isValid() && dateMoment.year().toString().length === 4) {
                date = (useUtc) ? dateMoment.utc().format() : dateMoment.format();
            }
        }
        return date;
    }
}
GridOdataService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
GridOdataService.ctorParameters = () => [
    { type: OdataService, },
];

class SlickPaginationComponent {
    constructor() {
        this.dataFrom = 1;
        this.dataTo = 1;
        this.itemsPerPage = 25;
        this.pageCount = 0;
        this.pageNumber = 1;
        this.totalItems = 0;
        this.paginationPageSizes = [25, 75, 100];
    }
    /**
     * @param {?} gridPaginationOptions
     * @return {?}
     */
    set gridPaginationOptions(gridPaginationOptions) {
        this._gridPaginationOptions = gridPaginationOptions;
        if (!gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
        }
    }
    /**
     * @return {?}
     */
    get gridPaginationOptions() {
        return this._gridPaginationOptions;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._gridPaginationOptions = this._gridPaginationOptions;
        if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
        }
    }
    /**
     * @param {?} number
     * @return {?}
     */
    ceil(number) {
        return Math.ceil(number);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChangeItemPerPage(event) {
        const /** @type {?} */ itemsPerPage = (event.target.value);
        this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
        this.pageNumber = 1;
        this.itemsPerPage = itemsPerPage;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToFirstPage(event) {
        this.pageNumber = 1;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToLastPage(event) {
        this.pageNumber = this.pageCount;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToNextPage(event) {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber++;
            this.onPageChanged(event, this.pageNumber);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToPreviousPage(event) {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.onPageChanged(event, this.pageNumber);
        }
    }
    /**
     * @return {?}
     */
    gotoFirstPage() {
        this.pageNumber = 1;
        this.onPageChanged(undefined, this.pageNumber);
    }
    /**
     * @return {?}
     */
    refreshPagination() {
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
    }
    /**
     * @param {?=} event
     * @param {?=} pageNumber
     * @return {?}
     */
    onPageChanged(event, pageNumber) {
        this.recalculateFromToIndexes();
        if (this.dataTo > this.totalItems) {
            this.dataTo = this.totalItems;
        }
        if (typeof this.paginationCallback === 'function') {
            const /** @type {?} */ itemsPerPage = this.itemsPerPage;
            this.paginationCallback(event, { newPage: pageNumber, pageSize: itemsPerPage });
        }
    }
    /**
     * @return {?}
     */
    recalculateFromToIndexes() {
        this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
        this.dataTo = (this.pageNumber * this.itemsPerPage);
    }
}
SlickPaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'slick-pagination',
                template: `
    <div class="slick-pagination">
    <div class="slick-pagination-nav">
        <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item" [ngClass]="pageNumber === 1 ? 'disabled' : ''">
            <a class="page-link icon-seek-first fa fa-angle-double-left" aria-label="First" (click)="changeToFirstPage($event)">
            </a>
            </li>
            <li class="page-item" [ngClass]="pageNumber === 1 ? 'disabled' : ''">
            <a class="page-link icon-seek-prev fa fa-angle-left" aria-label="Previous" (click)="changeToPreviousPage($event)">
            </a>
            </li>
        </ul>
        </nav>

        <div class="slick-page-number">
        page {{pageNumber}} of {{pageCount}}
        </div>

        <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item" [ngClass]="pageNumber === pageCount ? 'disabled' : ''">
            <a class="page-link icon-seek-next fa fa-angle-right" aria-label="Next" (click)="changeToNextPage($event)">
            </a>
            </li>
            <li class="page-item" [ngClass]="pageNumber === pageCount ? 'disabled' : ''">
            <a class="page-link icon-seek-end fa fa-angle-double-right" aria-label="Last" (click)="changeToLastPage($event)">
            </a>
            </li>
        </ul>
        </nav>
    </div>
    <span class="slick-pagination-settings">
        <select id="items-per-page-label" [value]="itemsPerPage" (change)="onChangeItemPerPage($event)">
        <option value="{{pageSize}}" *ngFor="let pageSize of paginationPageSizes;">{{pageSize}}</option>
        </select>
        items per page,
        <span class="slick-pagination-count">
        {{dataFrom}}-{{dataTo}} of {{totalItems}} items
        </span>
    </span>
    </div>
  `,
                styles: [
                    `
      /* Pagination styling */
      .slick-pagination {
        border-top: 0 none;
        border-right: 0 none;
        border-bottom: 0 none;
        border-left: 0 none;
        width: 100%;
        height: 34px;
        padding-top: 4px;
        vertical-align: middle;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 13px;
        font-weight: 400;
        color: #808080;
      }
      .slick-pagination .slick-pagination-status {
        display: inline-block;
        padding: 6px;
      }
      .slick-pagination .ui-icon-container {
        display: inline-block;
        border-color: #ddd;
      }
      .slick-pagination .slick-pagination-nav {
        display: inline-block;
        padding: 2px;
        height: 34px;
      }
      .slick-pagination .slick-pagination-nav nav {
        display: inline-block;
      }
      .slick-pagination .slick-pagination-nav .slick-page-number {
        vertical-align: top;
        margin-top: 6px;
        display: inline-block;
        padding: 0 5px;
      }
      .slick-pagination .slick-pagination-nav .pagination {
        margin: 0;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-link {
        font-size: 13px;
        font-weight: bold;
        border: 1px solid #ccc;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-item {
        cursor: pointer;
        font-weight: bold;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-item a[class*="icon-seek-"] {
        text-decoration: none;
        font-size: 14px;
        border-color: silver;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-item.disabled {
        cursor: not-allowed;
        font-weight: normal;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-item.disabled > .page-link {
        font-weight: normal;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-item.disabled a[class*="icon-seek-"] {
        background-color: #f9f9f9;
        border-color: #dedede;
      }
      .slick-pagination .slick-pagination-settings {
        display: block;
        float: right;
        padding: 2px;
        vertical-align: middle;
      }
      .slick-pagination .slick-pagination-settings select {
        font-size: 12px;
        line-height: 1.5;
        height: 32px;
        width: 62px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      .slick-pagination .slick-pagination-settings .slick-pagination-count {
        padding-left: 10px;
      }
    `
                ]
            },] },
];
/**
 * @nocollapse
 */
SlickPaginationComponent.ctorParameters = () => [];
SlickPaginationComponent.propDecorators = {
    'gridPaginationOptions': [{ type: Input },],
    'grid': [{ type: Input },],
};

/**
 * Options that can be passed to the Bootstrap-Datetimepicker directly
 */
const GlobalGridOptions = {
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

class AngularSlickgridComponent {
    /**
     * @param {?} resizer
     * @param {?} mouseService
     * @param {?} filterService
     * @param {?} sortService
     */
    constructor(resizer, mouseService, filterService, sortService) {
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
    /**
     * @param {?} dataset
     * @return {?}
     */
    set dataset(dataset) {
        this._dataset = dataset;
        this.refreshGridData(dataset);
    }
    /**
     * @return {?}
     */
    get dataset() {
        return this._dataView.getItems();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.gridHeightString = `${this.gridHeight}px`;
        this.gridWidthString = `${this.gridWidth}px`;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
        this._dataset = this._dataset || [];
        this._gridOptions = this.mergeGridOptions();
        this._dataView = new Slick.Data.DataView();
        this.grid = new Slick.Grid(`#${this.gridId}`, this._dataView, this.columnDefinitions, this._gridOptions);
        this.grid.setSelectionModel(new Slick.RowSelectionModel());
        if (this._gridOptions.enableColumnPicker) {
            const /** @type {?} */ columnpicker = new Slick.Controls.ColumnPicker(this.columnDefinitions, this.grid, this._gridOptions);
        }
        this.grid.init();
        this._dataView.beginUpdate();
        this.attachDifferentHooks(this.grid, this._gridOptions, this._dataView);
        this._dataView.setItems(this._dataset);
        this._dataView.endUpdate();
        // attach resize ONLY after the dataView is ready
        this.attachResizeHook(this.grid, this._gridOptions);
    }
    /**
     * @param {?} grid
     * @param {?} options
     * @param {?} dataView
     * @return {?}
     */
    attachDifferentHooks(grid, options, dataView) {
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
        dataView.onRowCountChanged.subscribe((e, args) => {
            grid.updateRowCount();
            grid.render();
        });
        dataView.onRowsChanged.subscribe((e, args) => {
            grid.invalidateRows(args.rows);
            grid.render();
        });
    }
    /**
     * @param {?} grid
     * @param {?} options
     * @return {?}
     */
    attachResizeHook(grid, options) {
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
    }
    /**
     * @return {?}
     */
    mergeGridOptions() {
        this.gridOptions.gridId = this.gridId;
        this.gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;
        if (this.gridOptions.enableFiltering) {
            this.gridOptions.showHeaderRow = true;
        }
        const /** @type {?} */ options = Object.assign({}, GlobalGridOptions, this.gridOptions);
        return options;
    }
    /**
     * Toggle the filter row displayed on first row
     * @param {?} isShowing
     * @return {?}
     */
    showHeaderRow(isShowing) {
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    }
    /**
     * Toggle the filter row displayed on first row
     * @return {?}
     */
    toggleHeaderRow() {
        const /** @type {?} */ isShowing = !this.grid.getOptions().showHeaderRow;
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    }
    /**
     * @param {?} dataset
     * @return {?}
     */
    refreshGridData(dataset) {
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
                setTimeout(() => {
                    this.resizer.resizeGrid(this.grid, this._gridOptions);
                    this.grid.autosizeColumns();
                });
            }
        }
    }
}
AngularSlickgridComponent.decorators = [
    { type: Injectable },
    { type: Component, args: [{
                selector: 'angular-slickgrid',
                template: `
    <div id="slickGridContainer-{{gridId}}" class="gridPane">
    <div attr.id='{{gridId}}'
            class="slickgrid-container"
            [style.height]="gridHeightString"
            [style.width]="gridWidthString">
    </div>

    <slick-pagination id="slickPagingContainer-{{gridId}}" *ngIf="showPagination" [gridPaginationOptions]="gridPaginationOptions"></slick-pagination>
    </div>
  `
            },] },
];
/**
 * @nocollapse
 */
AngularSlickgridComponent.ctorParameters = () => [
    { type: ResizerService, },
    { type: MouseService, },
    { type: FilterService, },
    { type: SortService, },
];
AngularSlickgridComponent.propDecorators = {
    'gridId': [{ type: Input },],
    'columnDefinitions': [{ type: Input },],
    'gridOptions': [{ type: Input },],
    'gridHeight': [{ type: Input },],
    'gridWidth': [{ type: Input },],
    'dataset': [{ type: Input },],
};

class AngularSlickgridModule {
}
AngularSlickgridModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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
AngularSlickgridModule.ctorParameters = () => [];

/**
 * Angular library starter.
 * Build an Angular library compatible with AoT compilation & Tree shaking.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular-slickgrid
 */
/**
 * Entry point for all public APIs of the package.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CaseType, FormElementType, FieldType, FilterConditions, FilterTemplates, Formatters, Sorters, FilterService, MouseService, ResizerService, SortService, GridOdataService, SlickPaginationComponent, AngularSlickgridComponent, AngularSlickgridModule, OdataService as ɵa };
//# sourceMappingURL=angular-slickgrid.js.map
