import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import * as moment_ from 'moment-mini';
import { Injectable, Component, EventEmitter, Input, Output, Inject, NgModule } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TextEncoder } from 'text-encoding-utf-8';
import { __awaiter } from 'tslib';
import { Subject } from 'rxjs/Subject';
import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.groupitemmetadataprovider.js';
import 'slickgrid/controls/slick.columnpicker';
import 'slickgrid/controls/slick.gridmenu';
import 'slickgrid/controls/slick.pager';
import 'slickgrid/plugins/slick.autotooltips';
import 'slickgrid/plugins/slick.cellcopymanager';
import 'slickgrid/plugins/slick.cellexternalcopymanager';
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import 'slickgrid/plugins/slick.checkboxselectcolumn';
import 'slickgrid/plugins/slick.headerbuttons';
import 'slickgrid/plugins/slick.headermenu';
import 'slickgrid/plugins/slick.rowmovemanager';
import 'slickgrid/plugins/slick.rowselectionmodel';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const CaseType = {
    camelCase: 0,
    pascalCase: 1,
    snakeCase: 2,
};
CaseType[CaseType.camelCase] = "camelCase";
CaseType[CaseType.pascalCase] = "pascalCase";
CaseType[CaseType.snakeCase] = "snakeCase";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const DelimiterType = {
    colon: ':',
    comma: ',',
    equalSign: '=',
    pipe: '|',
    semicolon: ';',
    space: ' ',
    tab: '\t',
    doubleColon: '::',
    doublePipe: '||',
    doubleSemicolon: ';;',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const FieldType = {
    unknown: 0,
    string: 1,
    boolean: 2,
    integer: 3,
    float: 4,
    /** number includes Integer and Float */
    number: 5,
    /** new Date(), javascript Date object */
    date: 6,
    /** Format: 'YYYY-MM-DD' => 2001-01-01 */
    dateIso: 7,
    /** Format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' => 2001-01-01T14:00:00.123Z */
    dateUtc: 8,
    /** new Date(), javacript Date Object with Time */
    dateTime: 9,
    /** Format: 'YYYY-MM-DD HH:mm:ss' => 2001-01-01 14:01:01 */
    dateTimeIso: 10,
    /** Format: 'YYYY-MM-DD h:mm:ss a' => 2001-01-01 11:01:01 pm */
    dateTimeIsoAmPm: 11,
    /** Format: 'YYYY-MM-DD h:mm:ss A' => 2001-01-01 11:01:01 PM */
    dateTimeIsoAM_PM: 12,
    /** Format: 'MM/DD/YYYY' => 02/28/2001 */
    dateUs: 13,
    /** Format: 'M/D/YY' => 2/28/12 */
    dateUsShort: 14,
    /** Format: 'MM/DD/YYYY HH:mm:ss' => 02/28/2001 13:01:01 */
    dateTimeUs: 15,
    /** Format: 'MM/DD/YYYY hh:mm:ss a' => 02/28/2001 11:01:01 pm */
    dateTimeUsAmPm: 16,
    /** Format: 'MM/DD/YYYY hh:mm:ss A' => 02/28/2001 11:01:01 PM */
    dateTimeUsAM_PM: 17,
    /** Format: 'M/D/YY H:m:s' => 2/28/14 14:1:2 */
    dateTimeUsShort: 18,
    /** Format: 'M/D/YY h:m:s a' => 2/28/14 1:2:10 pm */
    dateTimeUsShortAmPm: 19,
    /** Format: 'M/D/YY h:m:s A' => 2/28/14 14:1:1 PM */
    dateTimeUsShortAM_PM: 20,
};
FieldType[FieldType.unknown] = "unknown";
FieldType[FieldType.string] = "string";
FieldType[FieldType.boolean] = "boolean";
FieldType[FieldType.integer] = "integer";
FieldType[FieldType.float] = "float";
FieldType[FieldType.number] = "number";
FieldType[FieldType.date] = "date";
FieldType[FieldType.dateIso] = "dateIso";
FieldType[FieldType.dateUtc] = "dateUtc";
FieldType[FieldType.dateTime] = "dateTime";
FieldType[FieldType.dateTimeIso] = "dateTimeIso";
FieldType[FieldType.dateTimeIsoAmPm] = "dateTimeIsoAmPm";
FieldType[FieldType.dateTimeIsoAM_PM] = "dateTimeIsoAM_PM";
FieldType[FieldType.dateUs] = "dateUs";
FieldType[FieldType.dateUsShort] = "dateUsShort";
FieldType[FieldType.dateTimeUs] = "dateTimeUs";
FieldType[FieldType.dateTimeUsAmPm] = "dateTimeUsAmPm";
FieldType[FieldType.dateTimeUsAM_PM] = "dateTimeUsAM_PM";
FieldType[FieldType.dateTimeUsShort] = "dateTimeUsShort";
FieldType[FieldType.dateTimeUsShortAmPm] = "dateTimeUsShortAmPm";
FieldType[FieldType.dateTimeUsShortAM_PM] = "dateTimeUsShortAM_PM";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const FileType = {
    csv: 'csv',
    doc: 'doc',
    docx: 'docx',
    pdf: 'pdf',
    txt: 'txt',
    xls: 'xls',
    xlsx: 'xlsx',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const FilterType = {
    /** Input Filter type, with a magnifying glass as placeholder */
    input: 0,
    /** Select Filter type, just a regular select dropdown. You might want to try "singleSelect" which has a nicer look and feel. */
    select: 1,
    /** Multiple-Select Filter type */
    multipleSelect: 2,
    /** Single Filter type */
    singleSelect: 3,
    /** Custom Filter type */
    custom: 4,
    /** Compound Date Filter (compound of Operator + Date picker) */
    compoundDate: 5,
    /** Compound Input Filter (compound of Operator + Input) */
    compoundInput: 6,
};
FilterType[FilterType.input] = "input";
FilterType[FilterType.select] = "select";
FilterType[FilterType.multipleSelect] = "multipleSelect";
FilterType[FilterType.singleSelect] = "singleSelect";
FilterType[FilterType.custom] = "custom";
FilterType[FilterType.compoundDate] = "compoundDate";
FilterType[FilterType.compoundInput] = "compoundInput";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const FormElementType = {
    /** Input Filter type */
    input: 0,
    /** Select Filter type, just a regular select dropdown. You might want to try "singleSelect" which has a nicer look and feel. */
    select: 1,
    /** Multiple-Select Filter type */
    multipleSelect: 2,
    /** Single Filter type */
    singleSelect: 3,
    /** Custom Filter type */
    custom: 4,
    /** Input Filter type */
    inputNoPlaceholder: 5,
    /** TextArea element type */
    textarea: 6,
};
FormElementType[FormElementType.input] = "input";
FormElementType[FormElementType.select] = "select";
FormElementType[FormElementType.multipleSelect] = "multipleSelect";
FormElementType[FormElementType.singleSelect] = "singleSelect";
FormElementType[FormElementType.custom] = "custom";
FormElementType[FormElementType.inputNoPlaceholder] = "inputNoPlaceholder";
FormElementType[FormElementType.textarea] = "textarea";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const GridStateType = {
    filter: 'filter',
    pagination: 'pagination',
    sorter: 'sorter',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const KeyCode = {
    BACKSPACE: 8,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    INSERT: 45,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    RIGHT: 39,
    TAB: 9,
    UP: 38,
};
KeyCode[KeyCode.BACKSPACE] = "BACKSPACE";
KeyCode[KeyCode.DELETE] = "DELETE";
KeyCode[KeyCode.DOWN] = "DOWN";
KeyCode[KeyCode.END] = "END";
KeyCode[KeyCode.ENTER] = "ENTER";
KeyCode[KeyCode.ESCAPE] = "ESCAPE";
KeyCode[KeyCode.HOME] = "HOME";
KeyCode[KeyCode.INSERT] = "INSERT";
KeyCode[KeyCode.LEFT] = "LEFT";
KeyCode[KeyCode.PAGE_DOWN] = "PAGE_DOWN";
KeyCode[KeyCode.PAGE_UP] = "PAGE_UP";
KeyCode[KeyCode.RIGHT] = "RIGHT";
KeyCode[KeyCode.TAB] = "TAB";
KeyCode[KeyCode.UP] = "UP";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const OperatorType = {
    contains: 'Contains',
    lessThan: 'LT',
    lessThanOrEqual: 'LE',
    greaterThan: 'GT',
    greaterThanOrEqual: 'GE',
    notEqual: 'NE',
    equal: 'EQ',
    endsWith: 'EndsWith',
    startsWith: 'StartsWith',
    in: 'IN',
    notIn: 'NIN',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const SortDirection = {
    asc: 'asc',
    ASC: 'ASC',
    desc: 'desc',
    DESC: 'DESC',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment = moment_;
/**
 * Simple function to which will loop and create as demanded the number of white spaces,
 * this will be used in the Excel export
 * @param {?} nbSpaces
 * @return {?}
 */
function addWhiteSpaces(nbSpaces) {
    let /** @type {?} */ result = '';
    for (let /** @type {?} */ i = 0; i < nbSpaces; i++) {
        result += ' ';
    }
    return result;
}
/**
 * decode text into html entity
 * @param {?} input
 * @return {?}
 */
function htmlEntityDecode(input) {
    return input.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
}
/**
 * decode text into html entity
 * @param {?} input
 * @return {?}
 */
function htmlEntityEncode(input) {
    const /** @type {?} */ buf = [];
    for (let /** @type {?} */ i = input.length - 1; i >= 0; i--) {
        buf.unshift(['&#', input[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('');
}
/**
 * Compares two arrays to determine if all the items are equal
 * @param {?} a first array
 * @param {?} b second array to compare with a
 * @param {?=} orderMatters
 * @return {?} boolean true if equal, else false
 */
function arraysEqual(a, b, orderMatters = false) {
    if (a === b) {
        return true;
    }
    if (a === null || b === null) {
        return false;
    }
    if (a.length !== b.length) {
        return false;
    }
    if (!orderMatters) {
        a.sort();
        b.sort();
    }
    for (let /** @type {?} */ i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Try casting an input of type Promise | Observable into a Promise type.
 * @template T
 * @param {?} input
 * @param {?=} fromServiceName string representing the caller service name and will be used if we throw a casting problem error
 * @return {?}
 */
function castToPromise(input, fromServiceName = '') {
    let /** @type {?} */ promise = input;
    if (input instanceof Promise) {
        // if it's already a Promise then return it
        return input;
    }
    else if (input instanceof Observable) {
        promise = input.first().toPromise();
        if (!(promise instanceof Promise)) {
            promise = input.take(1).toPromise();
        }
        if (!(promise instanceof Promise)) {
            throw new Error(`Something went wrong, Angular-Slickgrid ${fromServiceName} is not able to convert the Observable into a Promise.
        If you are using Angular HttpClient, you could try converting your http call to a Promise with ".toPromise()"
        for example::  this.http.post('graphql', { query: graphqlQuery }).toPromise()
        `);
        }
    }
    return promise;
}
/**
 * Uses the logic function to find an item in an array or returns the default
 * value provided (empty object by default)
 * @param {?} array
 * @param {?} logic
 * @param {?=} defaultVal
 * @return {?} object the found object or deafult value
 */
function findOrDefault(array, logic, defaultVal = {}) {
    return array.find(logic) || defaultVal;
}
/**
 * From a Date FieldType, return it's equivalent moment.js format
 * refer to moment.js for the format standard used: https://momentjs.com/docs/#/parsing/string-format/
 * @param {?} fieldType
 * @return {?}
 */
function mapMomentDateFormatWithFieldType(fieldType) {
    let /** @type {?} */ map;
    switch (fieldType) {
        case FieldType.dateTime:
        case FieldType.dateTimeIso:
            map = 'YYYY-MM-DD HH:mm:ss';
            break;
        case FieldType.dateTimeIsoAmPm:
            map = 'YYYY-MM-DD hh:mm:ss a';
            break;
        case FieldType.dateTimeIsoAM_PM:
            map = 'YYYY-MM-DD hh:mm:ss A';
            break;
        case FieldType.dateUs:
            map = 'MM/DD/YYYY';
            break;
        case FieldType.dateUsShort:
            map = 'M/D/YY';
            break;
        case FieldType.dateTimeUs:
            map = 'MM/DD/YYYY HH:mm:ss';
            break;
        case FieldType.dateTimeUsAmPm:
            map = 'MM/DD/YYYY hh:mm:ss a';
            break;
        case FieldType.dateTimeUsAM_PM:
            map = 'MM/DD/YYYY hh:mm:ss A';
            break;
        case FieldType.dateTimeUsShort:
            map = 'M/D/YY H:m:s';
            break;
        case FieldType.dateTimeUsShortAmPm:
            map = 'M/D/YY h:m:s a';
            break;
        case FieldType.dateUtc:
            map = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
            break;
        case FieldType.date:
        case FieldType.dateIso:
        default:
            map = 'YYYY-MM-DD';
            break;
    }
    return map;
}
/**
 * From a Date FieldType, return it's equivalent Flatpickr format
 * refer to Flatpickr for the format standard used: https://chmln.github.io/flatpickr/formatting/#date-formatting-tokens
 * also note that they seem very similar to PHP format (except for am/pm): http://php.net/manual/en/function.date.php
 * @param {?} fieldType
 * @return {?}
 */
function mapFlatpickrDateFormatWithFieldType(fieldType) {
    /*
        d: Day of the month, 2 digits with leading zeros	01 to 31
        D: A textual representation of a day	Mon through Sun
        l: (lowercase 'L')	A full textual representation of the day of the week	Sunday through Saturday
        j: Day of the month without leading zeros	1 to 31
        J: Day of the month without leading zeros and ordinal suffix	1st, 2nd, to 31st
        w: Numeric representation of the day of the week	0 (for Sunday) through 6 (for Saturday)
        F: A full textual representation of a month	January through December
        m: Numeric representation of a month, with leading zero	01 through 12
        n: Numeric representation of a month, without leading zeros	1 through 12
        M: A short textual representation of a month	Jan through Dec
        U: The number of seconds since the Unix Epoch	1413704993
        y: A two digit representation of a year	99 or 03
        Y: A full numeric representation of a year, 4 digits	1999 or 2003
        H: Hours (24 hours)	00 to 23
        h: Hours	1 to 12
        i: Minutes	00 to 59
        S: Seconds, 2 digits	00 to 59
        s: Seconds	0, 1 to 59
        K: AM/PM	AM or PM
      */
    let /** @type {?} */ map;
    switch (fieldType) {
        case FieldType.dateTime:
        case FieldType.dateTimeIso:
            map = 'Y-m-d H:i:S';
            break;
        case FieldType.dateTimeIsoAmPm:
            map = 'Y-m-d h:i:S K'; // there is no lowercase in Flatpickr :(
            break;
        case FieldType.dateTimeIsoAM_PM:
            map = 'Y-m-d h:i:S K';
            break;
        case FieldType.dateUs:
            map = 'm/d/Y';
            break;
        case FieldType.dateUsShort:
            map = 'm/d/y';
            break;
        case FieldType.dateTimeUs:
            map = 'm/d/Y H:i:S';
            break;
        case FieldType.dateTimeUsAmPm:
            map = 'm/d/Y h:i:S K'; // there is no lowercase in Flatpickr :(
            break;
        case FieldType.dateTimeUsAM_PM:
            map = 'm/d/Y h:i:s K';
            break;
        case FieldType.dateTimeUsShort:
            map = 'm/d/y H:i:s';
            break;
        case FieldType.dateTimeUsShortAmPm:
            map = 'm/d/y h:i:s K'; // there is no lowercase in Flatpickr :(
            break;
        case FieldType.dateUtc:
            map = 'Z';
            break;
        case FieldType.date:
        case FieldType.dateIso:
        default:
            map = 'Y-m-d';
            break;
    }
    return map;
}
/**
 * Mapper for query operators (ex.: <= is "le", > is "gt")
 * @param {?} operator
 * @return {?} string map
 */
function mapOperatorType(operator) {
    let /** @type {?} */ map;
    switch (operator) {
        case '<':
            map = OperatorType.lessThan;
            break;
        case '<=':
            map = OperatorType.lessThanOrEqual;
            break;
        case '>':
            map = OperatorType.greaterThan;
            break;
        case '>=':
            map = OperatorType.greaterThanOrEqual;
            break;
        case '<>':
        case '!=':
        case 'neq':
        case 'NEQ':
            map = OperatorType.notEqual;
            break;
        case '*':
        case '.*':
        case 'startsWith':
            map = OperatorType.startsWith;
            break;
        case '*.':
        case 'endsWith':
            map = OperatorType.endsWith;
            break;
        case '=':
        case '==':
        case 'eq':
        case 'EQ':
            map = OperatorType.equal;
            break;
        case 'in':
        case 'IN':
            map = OperatorType.in;
            break;
        case 'notIn':
        case 'NIN':
        case 'NOT_IN':
            map = OperatorType.notIn;
            break;
        default:
            map = OperatorType.contains;
            break;
    }
    return map;
}
/**
 * Mapper for query operator by a Filter Type
 * For example a multiple-select typically uses 'IN' operator
 * @param {?} fieldType
 * @return {?} string map
 */
function mapOperatorByFieldType(fieldType) {
    let /** @type {?} */ map;
    switch (fieldType) {
        case FieldType.string:
        case FieldType.unknown:
            map = OperatorType.contains;
            break;
        case FieldType.float:
        case FieldType.number:
        case FieldType.date:
        case FieldType.dateIso:
        case FieldType.date:
        case FieldType.dateUtc:
        case FieldType.dateTime:
        case FieldType.dateTimeIso:
        case FieldType.dateTimeIsoAmPm:
        case FieldType.dateTimeIsoAM_PM:
        case FieldType.dateUs:
        case FieldType.dateUsShort:
        case FieldType.dateTimeUs:
        case FieldType.dateTimeUsAmPm:
        case FieldType.dateTimeUsAM_PM:
        case FieldType.dateTimeUsShort:
        case FieldType.dateTimeUsShortAmPm:
        case FieldType.dateTimeUsShortAM_PM:
        default:
            map = OperatorType.equal;
            break;
    }
    return map;
}
/**
 * Mapper for query operator by a Filter Type
 * For example a multiple-select typically uses 'IN' operator
 * @param {?} filterType
 * @return {?} string map
 */
function mapOperatorByFilterType(filterType) {
    let /** @type {?} */ map;
    switch (filterType) {
        case FilterType.multipleSelect:
            map = OperatorType.in;
            break;
        case FilterType.singleSelect:
            map = OperatorType.equal;
            break;
        default:
            break;
    }
    return map;
}
/**
 * Parse a date passed as a string and return a Date object (if valid)
 * @param {?} inputDateString
 * @param {?} useUtc
 * @return {?} string date formatted
 */
function parseUtcDate(inputDateString, useUtc) {
    let /** @type {?} */ date = null;
    if (/^[0-9\-\/]*$/.test(inputDateString)) {
        // get the UTC datetime with moment.js but we need to decode the value so that it's valid text
        const /** @type {?} */ dateString = decodeURIComponent(inputDateString);
        const /** @type {?} */ dateMoment = moment(new Date(dateString));
        if (dateMoment.isValid() && dateMoment.year().toString().length === 4) {
            date = (useUtc) ? dateMoment.utc().format() : dateMoment.format();
        }
    }
    return date;
}
/**
 * Converts a string to camel case
 * @param {?} str the string to convert
 * @return {?} the string in camel case
 */
function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|[\s+\-_\/])/g, (match, offset) => {
        // remove white space or hypens or underscores
        if (/[\s+\-_\/]/.test(match)) {
            return '';
        }
        return offset === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
/**
 * Converts a string to kebab (hypen) case
 * @param {?} str the string to convert
 * @return {?} the string in kebab case
 */
function toKebabCase(str) {
    return toCamelCase(str).replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$1 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
const dateUsShortSorter = (value1, value2, sortDirection) => {
    if (!moment$1(value1, FORMAT, true).isValid() || !moment$1(value2, FORMAT, true).isValid()) {
        return 0;
    }
    const /** @type {?} */ date1 = moment$1(value1, FORMAT, true);
    const /** @type {?} */ date2 = moment$1(value2, FORMAT, true);
    const /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$2 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateSorter = (value1, value2, sortDirection) => {
    if (!moment$2(value1, moment$2.ISO_8601).isValid() || !moment$2(value2, moment$2.ISO_8601, true).isValid()) {
        return 0;
    }
    const /** @type {?} */ date1 = moment$2(value1);
    const /** @type {?} */ date2 = moment$2(value2);
    const /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$3 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$1 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
const dateIsoSorter = (value1, value2, sortDirection) => {
    if (!moment$3(value1, FORMAT$1, true).isValid() || !moment$3(value2, FORMAT$1, true).isValid()) {
        return 0;
    }
    const /** @type {?} */ date1 = moment$3(value1, FORMAT$1, true);
    const /** @type {?} */ date2 = moment$3(value2, FORMAT$1, true);
    const /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$4 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$2 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
const dateUsSorter = (value1, value2, sortDirection) => {
    if (!moment$4(value1, FORMAT$2, true).isValid() || !moment$4(value2, FORMAT$2, true).isValid()) {
        return 0;
    }
    const /** @type {?} */ date1 = moment$4(value1, FORMAT$2, true);
    const /** @type {?} */ date2 = moment$4(value2, FORMAT$2, true);
    const /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const numericSorter = (value1, value2, sortDirection) => {
    const /** @type {?} */ x = (isNaN(value1) || value1 === '' || value1 === null) ? -99e+10 : parseFloat(value1);
    const /** @type {?} */ y = (isNaN(value2) || value2 === '' || value2 === null) ? -99e+10 : parseFloat(value2);
    return sortDirection * (x === y ? 0 : (x > y ? 1 : -1));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const stringSorter = (value1, value2, sortDirection) => {
    let /** @type {?} */ position;
    if (value1 === null) {
        position = -1;
    }
    else if (value2 === null) {
        position = 1;
    }
    else if (value1 === value2) {
        position = 0;
    }
    else if (sortDirection) {
        position = value1 < value2 ? -1 : 1;
    }
    else if (!sortDirection) {
        position = value1 < value2 ? 1 : -1;
    }
    return sortDirection * position;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const Sorters = {
    date: dateSorter,
    dateIso: dateIsoSorter,
    dateUs: dateUsSorter,
    dateUsShort: dateUsShortSorter,
    numeric: numericSorter,
    string: stringSorter
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} fieldType
 * @param {?} sortDirection
 * @return {?}
 */
function sortByFieldType(value1, value2, fieldType, sortDirection) {
    let /** @type {?} */ sortResult = 0;
    switch (fieldType) {
        case FieldType.number:
            sortResult = Sorters.numeric(value1, value2, sortDirection);
            break;
        case FieldType.date:
            sortResult = Sorters.date(value1, value2, sortDirection);
            break;
        case FieldType.dateIso:
            sortResult = Sorters.dateIso(value1, value2, sortDirection);
            break;
        case FieldType.dateUs:
            sortResult = Sorters.dateUs(value1, value2, sortDirection);
            break;
        case FieldType.dateUsShort:
            sortResult = Sorters.dateUsShort(value1, value2, sortDirection);
            break;
        default:
            sortResult = Sorters.string(value1, value2, sortDirection);
            break;
    }
    return sortResult;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CollectionService {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
    }
    /**
     * Filter items from a collection
     * @param {?} collection
     * @param {?} filterBy
     * @return {?}
     */
    filterCollection(collection, filterBy) {
        let /** @type {?} */ filteredCollection;
        if (filterBy) {
            const /** @type {?} */ property = filterBy.property || '';
            const /** @type {?} */ operator = filterBy.operator || OperatorType.equal;
            const /** @type {?} */ value = filterBy.value || '';
            if (operator === OperatorType.equal) {
                filteredCollection = collection.filter((item) => item[property] !== value);
            }
            else {
                filteredCollection = collection.filter((item) => item[property] === value);
            }
        }
        return filteredCollection;
    }
    /**
     * Sort items in a collection
     * @param {?} collection
     * @param {?} sortBy
     * @param {?=} enableTranslateLabel
     * @return {?}
     */
    sortCollection(collection, sortBy, enableTranslateLabel) {
        let /** @type {?} */ sortedCollection;
        if (sortBy) {
            const /** @type {?} */ property = sortBy.property || '';
            const /** @type {?} */ sortDirection = sortBy.hasOwnProperty('sortDesc') ? (sortBy.sortDesc ? -1 : 1) : 1;
            const /** @type {?} */ fieldType = sortBy.fieldType || FieldType.string;
            sortedCollection = collection.sort((dataRow1, dataRow2) => {
                const /** @type {?} */ value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1[property] || ' ') : dataRow1[property];
                const /** @type {?} */ value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2[property] || ' ') : dataRow2[property];
                const /** @type {?} */ result = sortByFieldType(value1, value2, fieldType, sortDirection);
                return result;
            });
        }
        return sortedCollection;
    }
}
CollectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CollectionService.ctorParameters = () => [
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

class ExportService {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._lineCarriageReturn = '\n';
        this._existingSlickAggregators = [];
        this._hasGroupedItems = false;
        this.defaultExportOptions = {
            delimiter: DelimiterType.comma,
            filename: 'export',
            format: FileType.csv,
            useUtf8WithBom: true
        };
    }
    /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    init(grid, gridOptions, dataView) {
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
     * @param {?} options
     * @return {?}
     */
    exportToFile(options) {
        this._exportOptions = $.extend(true, {}, this.defaultExportOptions, options);
        // get the CSV output from the grid data
        const /** @type {?} */ dataOutput = this.getDataOutput();
        // trigger a download file
        this.startDownloadFile({
            filename: `${this._exportOptions.filename}.${this._exportOptions.format}`,
            csvContent: dataOutput,
            format: this._exportOptions.format,
            useUtf8WithBom: this._exportOptions.useUtf8WithBom
        });
    }
    /**
     * @return {?}
     */
    getDataOutput() {
        const /** @type {?} */ columns = this._grid.getColumns() || [];
        const /** @type {?} */ delimiter = this._exportOptions.delimiter || '';
        const /** @type {?} */ format = this._exportOptions.format || '';
        // find all the Aggregators that exist inside SlickGrid
        this._existingSlickAggregators = this.getAllSlickGridAggregators() || [];
        // a CSV needs double quotes wrapper, the other types do not need any wrapper
        this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';
        // data variable which will hold all the fields data of a row
        let /** @type {?} */ outputDataString = '';
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
            const /** @type {?} */ outputHeaderTitles = this._columnHeaders
                .map((header) => this._exportQuoteWrapper + header.title + this._exportQuoteWrapper);
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
        let /** @type {?} */ outputDataString = '';
        const /** @type {?} */ lineCount = this._dataView.getLength();
        // loop through all the grid rows of data
        for (let /** @type {?} */ rowNumber = 0; rowNumber < lineCount; rowNumber++) {
            const /** @type {?} */ itemObj = this._dataView.getItem(rowNumber);
            if (itemObj != null) {
                // Normal row (not grouped by anything) would have an ID which was predefined in the Grid Columns definition
                if (itemObj.id != null) {
                    // get regular row item data
                    outputDataString += this.readRegularRowData(columns, rowNumber, itemObj);
                }
                else if (this._hasGroupedItems && itemObj.__groupTotals === undefined) {
                    // get the group row
                    outputDataString += this.readGroupedTitleRow(itemObj);
                }
                else if (itemObj.__groupTotals) {
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
     * @return {?}
     */
    getAllSlickGridAggregators() {
        const /** @type {?} */ existingSlickAggregators = [];
        for (const /** @type {?} */ key in Slick.Data.Aggregators) {
            if (Slick.Data.Aggregators.hasOwnProperty(key)) {
                existingSlickAggregators.push(key.toLowerCase());
            }
        }
        return existingSlickAggregators;
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
        const /** @type {?} */ columnHeaders = [];
        // Populate the Column Header, pull the name defined
        columns.forEach((columnDef) => {
            const /** @type {?} */ fieldName = (columnDef.headerKey) ? this.translate.instant(columnDef.headerKey) : columnDef.name;
            const /** @type {?} */ skippedField = columnDef.excludeFromExport || false;
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
        let /** @type {?} */ idx = 0;
        let /** @type {?} */ rowOutputString = '';
        const /** @type {?} */ delimiter = this._exportOptions.delimiter;
        const /** @type {?} */ format = this._exportOptions.format;
        const /** @type {?} */ exportQuoteWrapper = this._exportQuoteWrapper || '';
        for (let /** @type {?} */ col = 0, /** @type {?} */ ln = columns.length; col < ln; col++) {
            const /** @type {?} */ columnDef = columns[col];
            const /** @type {?} */ fieldId = columnDef.field || columnDef.id || '';
            // skip excluded column
            if (columnDef.excludeFromExport) {
                continue;
            }
            // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
            if (this._hasGroupedItems && idx === 0) {
                rowOutputString += `""` + delimiter;
            }
            // does the user want to evaluate current column Formatter?
            const /** @type {?} */ isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._gridOptions.exportWithFormatter;
            // did the user provide a Custom Formatter for the export
            const /** @type {?} */ exportCustomFormatter = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;
            let /** @type {?} */ itemData = '';
            if (exportCustomFormatter) {
                itemData = exportCustomFormatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
            }
            else if (isEvaluatingFormatter && !!columnDef.formatter) {
                itemData = columnDef.formatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
            }
            else {
                itemData = (itemObj[fieldId] === null || itemObj[fieldId] === undefined) ? '' : itemObj[fieldId];
            }
            // when CSV we also need to escape double quotes twice, so " becomes ""
            if (format === FileType.csv) {
                itemData = itemData.toString().replace(/"/gi, `""`);
            }
            // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
            // to cancel that effect we can had = in front, ex: ="1E06"
            const /** @type {?} */ keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
            rowOutputString += keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper + delimiter;
            idx++;
        }
        return rowOutputString;
    }
    /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param {?} itemObj
     * @return {?}
     */
    readGroupedTitleRow(itemObj) {
        let /** @type {?} */ groupName = itemObj.value;
        const /** @type {?} */ exportQuoteWrapper = this._exportQuoteWrapper || '';
        const /** @type {?} */ delimiter = this._exportOptions.delimiter;
        const /** @type {?} */ format = this._exportOptions.format;
        groupName = addWhiteSpaces(5 * itemObj.level) + groupName;
        if (format === FileType.csv) {
            // when CSV we also need to escape double quotes twice, so " becomes ""
            groupName = groupName.toString().replace(/"/gi, `""`);
        }
        // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
        // to cancel that effect we can had = in front, ex: ="1E06"
        // const keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
        return /*keepAsStringWrapper +*/ /*keepAsStringWrapper +*/ exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper + delimiter;
    }
    /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param {?} itemObj
     * @return {?}
     */
    readGroupedTotalRow(itemObj) {
        let /** @type {?} */ exportExponentialWrapper = '';
        const /** @type {?} */ delimiter = this._exportOptions.delimiter;
        const /** @type {?} */ format = this._exportOptions.format;
        const /** @type {?} */ exportQuoteWrapper = this._exportQuoteWrapper || '';
        const /** @type {?} */ existingSlickAggregators = this._existingSlickAggregators || [];
        const /** @type {?} */ columnCount = this._grid.getColumns().length;
        let /** @type {?} */ output = `${exportQuoteWrapper}..${exportQuoteWrapper}${delimiter}`;
        for (let /** @type {?} */ j = 0; j < columnCount; j++) {
            const /** @type {?} */ fieldId = this._grid.getColumns()[j].id;
            let /** @type {?} */ itemData = '';
            // cycle through all possible SlickGrid Aggregators and get their values
            for (let /** @type {?} */ k = 0; k < existingSlickAggregators.length; k++) {
                if (itemObj[existingSlickAggregators[k]] !== undefined) {
                    if (fieldId in itemObj[existingSlickAggregators[k]]) {
                        const /** @type {?} */ aggregatorName = existingSlickAggregators[k];
                        const /** @type {?} */ val = itemObj[existingSlickAggregators[k]][fieldId];
                        if (aggregatorName.toLowerCase() === 'avg') {
                            itemData = aggregatorName + ': ' + Math.round(val);
                        }
                        else if (aggregatorName.toLowerCase() === 'min' || aggregatorName.toLowerCase() === 'max' || aggregatorName.toLowerCase() === 'sum') {
                            itemData = aggregatorName + ': ' + Math.round(parseFloat(val) * 1000000) / 1000000;
                        }
                        else {
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
     * @param {?} columns of the grid
     * @return {?}
     */
    getGroupedColumnTitles(columns) {
        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return null;
        }
        let /** @type {?} */ groupItemId = '';
        const /** @type {?} */ groupedHeaders = [];
        let /** @type {?} */ hasGroupedItems = false;
        if ($.isEmptyObject(this._groupingDefinition)) {
            hasGroupedItems = false;
        }
        else {
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
                const /** @type {?} */ fieldName = (columnDef.headerKey) ? this.translate.instant(columnDef.headerKey) : columnDef.name;
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
     * @param {?} options
     * @return {?}
     */
    startDownloadFile(options) {
        // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
        if (navigator.appName === 'Microsoft Internet Explorer') {
            throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
        }
        // set the correct MIME type
        const /** @type {?} */ mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';
        // make sure no html entities exist in the data
        const /** @type {?} */ csvContent = htmlEntityDecode(options.csvContent);
        // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
        // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
        // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
        // Option#2: use a 3rd party extension to javascript encode into UTF-16
        let /** @type {?} */ outputData;
        if (options.format === FileType.csv) {
            outputData = new TextEncoder('utf-8').encode(csvContent);
        }
        else {
            outputData = csvContent;
        }
        // create a Blob object for the download
        const /** @type {?} */ blob = new Blob([options.useUtf8WithBom ? '\uFEFF' : '', outputData], {
            type: `${mimeType};charset=utf-8;`
        });
        // when using IE/Edge, then use different download call
        if (typeof navigator.msSaveOrOpenBlob === 'function') {
            navigator.msSaveOrOpenBlob(blob, options.filename);
        }
        else {
            // this trick will generate a temp <a /> tag
            // the code will then trigger a hidden click for it to start downloading
            const /** @type {?} */ link = document.createElement('a');
            const /** @type {?} */ csvUrl = URL.createObjectURL(blob);
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
    { type: Injectable },
];
/** @nocollapse */
ExportService.ctorParameters = () => [
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} str
 * @return {?}
 */
function parseBoolean(str) {
    return /(true|1)/i.test(str + '');
}
const booleanFilterCondition = (options) => {
    return parseBoolean(options.cellValue) === parseBoolean(options.searchTerm);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const testFilterCondition = (operator, value1, value2) => {
    switch (operator) {
        case '<':
        case 'LT': return (value1 < value2);
        case '<=':
        case 'LE': return (value1 <= value2);
        case '>':
        case 'GT': return (value1 > value2);
        case '>=':
        case 'GE': return (value1 >= value2);
        case '!=':
        case '<>':
        case 'NE': return (value1 !== value2);
        case '=':
        case '==':
        case 'EQ': return (value1 === value2);
        case 'IN': return ((value2 && value2.includes) ? (value2.includes(value1)) : false);
    }
    return true;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$5 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateFilterCondition = (options) => {
    const /** @type {?} */ filterSearchType = options.filterSearchType || FieldType.dateIso;
    const /** @type {?} */ searchDateFormat = mapMomentDateFormatWithFieldType(filterSearchType);
    if (!moment$5(options.cellValue, moment$5.ISO_8601).isValid() || !moment$5(options.searchTerm, searchDateFormat, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment$5(options.cellValue);
    const /** @type {?} */ dateSearch = moment$5(options.searchTerm);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$6 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$3 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
const dateIsoFilterCondition = (options) => {
    if (!moment$6(options.cellValue, FORMAT$3, true).isValid() || !moment$6(options.searchTerm, FORMAT$3, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment$6(options.cellValue, FORMAT$3, true);
    const /** @type {?} */ dateSearch = moment$6(options.searchTerm, FORMAT$3, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$7 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$4 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
const dateUsFilterCondition = (options) => {
    if (!moment$7(options.cellValue, FORMAT$4, true).isValid() || !moment$7(options.searchTerm, FORMAT$4, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment$7(options.cellValue, FORMAT$4, true);
    const /** @type {?} */ dateSearch = moment$7(options.searchTerm, FORMAT$4, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$8 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$5 = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
const dateUsShortFilterCondition = (options) => {
    if (!moment$8(options.cellValue, FORMAT$5, true).isValid() || !moment$8(options.searchTerm, FORMAT$5, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment$8(options.cellValue, FORMAT$5, true);
    const /** @type {?} */ dateSearch = moment$8(options.searchTerm, FORMAT$5, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$9 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateUtcFilterCondition = (options) => {
    const /** @type {?} */ searchDateFormat = mapMomentDateFormatWithFieldType(options.filterSearchType || options.fieldType);
    if (!moment$9(options.cellValue, moment$9.ISO_8601).isValid() || !moment$9(options.searchTerm, searchDateFormat, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment$9(options.cellValue, moment$9.ISO_8601, true);
    const /** @type {?} */ dateSearch = moment$9(options.searchTerm, searchDateFormat, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const collectionSearchFilterCondition = (options) => {
    // multiple-select will always return text, so we should make our cell values text as well
    const /** @type {?} */ cellValue = options.cellValue + '';
    return testFilterCondition(options.operator || 'IN', cellValue, options.searchTerms || []);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const numberFilterCondition = (options) => {
    const /** @type {?} */ cellValue = parseFloat(options.cellValue);
    const /** @type {?} */ searchTerm = (typeof options.searchTerm === 'string') ? parseFloat(options.searchTerm) : options.searchTerm;
    return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const stringFilterCondition = (options) => {
    // make sure the cell value is a string by casting it when possible
    options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();
    // make both the cell value and search value lower for case insensitive comparison
    const /** @type {?} */ cellValue = options.cellValue.toLowerCase();
    const /** @type {?} */ searchTerm = (typeof options.searchTerm === 'string') ? options.searchTerm.toLowerCase() : options.searchTerm;
    if (options.operator === '*' || options.operator === OperatorType.endsWith) {
        return cellValue.endsWith(searchTerm);
    }
    else if ((options.operator === '' && options.cellValueLastChar === '*') || options.operator === OperatorType.startsWith) {
        return cellValue.startsWith(searchTerm);
    }
    else if (options.operator === '') {
        return cellValue.includes(searchTerm);
    }
    return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const executeMappedCondition = (options) => {
    // when using a multi-select ('IN' operator) we will not use the field type but instead go directly with a collection search
    if (options && options.operator && options.operator.toUpperCase() === 'IN') {
        return collectionSearchFilterCondition(options);
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const FilterConditions = {
    executeMappedCondition,
    booleanFilter: booleanFilterCondition,
    collectionSearchFilter: collectionSearchFilterCondition,
    dateFilter: dateFilterCondition,
    dateIsoFilter: dateIsoFilterCondition,
    dateUtcFilter: dateUtcFilterCondition,
    dateUsFilter: dateUsFilterCondition,
    dateUsShortFilter: dateUsShortFilterCondition,
    numberFilter: numberFilterCondition,
    stringFilter: stringFilterCondition,
    testFilter: testFilterCondition
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
require('flatpickr');
class CompoundDateFilter {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.operator = args.operator;
        this.searchTerm = args.searchTerm;
        if (this.grid && typeof this.grid.getOptions === 'function') {
            this.gridOptions = this.grid.getOptions();
        }
        // step 1, create the DOM Element of the filter which contain the compound Operator+Input
        // and initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement();
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterInputElm.keyup((e) => {
            this.onTriggerEvent(e);
        });
        this.$selectOperatorElm.change((e) => {
            this.onTriggerEvent(e);
        });
    }
    /**
     * Clear the filter value
     * @param {?=} triggerFilterKeyup
     * @return {?}
     */
    clear(triggerFilterKeyup = true) {
        if (this.flatInstance && this.$selectOperatorElm) {
            this.$selectOperatorElm.val(0);
            this.flatInstance.clear();
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
            this.$selectOperatorElm.off('change').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values) {
            this.flatInstance.setDate(values);
        }
    }
    /**
     * @param {?} searchTerm
     * @return {?}
     */
    buildDatePickerInput(searchTerm) {
        const /** @type {?} */ inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
        const /** @type {?} */ outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
        let /** @type {?} */ currentLocale = this.getCurrentLocale(this.columnDef, this.gridOptions) || '';
        if (currentLocale.length > 2) {
            currentLocale = currentLocale.substring(0, 2);
        }
        const /** @type {?} */ pickerOptions = {
            defaultDate: searchTerm || '',
            altInput: true,
            altFormat: outputFormat,
            dateFormat: inputFormat,
            wrap: true,
            closeOnSelect: true,
            locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
            onChange: (selectedDates, dateStr, instance) => {
                this._currentValue = dateStr;
                // when using the time picker, we can simulate a keyup event to avoid multiple backend request
                // since backend request are only executed after user start typing, changing the time should be treated the same way
                if (pickerOptions.enableTime) {
                    this.onTriggerEvent(new CustomEvent('keyup'));
                }
                else {
                    this.onTriggerEvent(undefined);
                }
            },
        };
        // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
        if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
            pickerOptions.enableTime = true;
        }
        const /** @type {?} */ placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        const /** @type {?} */ $filterInputElm = $(`<div class=flatpickr><input type="text" class="form-control" data-input placeholder="${placeholder}"></div>`);
        this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerOptions) : null;
        return $filterInputElm;
    }
    /**
     * @return {?}
     */
    buildSelectOperatorHtmlString() {
        const /** @type {?} */ optionValues = this.getOptionValues();
        let /** @type {?} */ optionValueString = '';
        optionValues.forEach((option) => {
            optionValueString += `<option value="${option.operator}" title="${option.description}">${option.operator}</option>`;
        });
        return `<select class="form-control">${optionValueString}</select>`;
    }
    /**
     * @return {?}
     */
    getOptionValues() {
        return [
            { operator: /** @type {?} */ (''), description: '' },
            { operator: /** @type {?} */ ('='), description: '' },
            { operator: /** @type {?} */ ('<'), description: '' },
            { operator: /** @type {?} */ ('<='), description: '' },
            { operator: /** @type {?} */ ('>'), description: '' },
            { operator: /** @type {?} */ ('>='), description: '' },
            { operator: /** @type {?} */ ('<>'), description: '' }
        ];
    }
    /**
     * Create the DOM element
     * @return {?}
     */
    createDomElement() {
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        const /** @type {?} */ searchTerm = /** @type {?} */ ((this.searchTerm || ''));
        if (searchTerm) {
            this._currentValue = searchTerm;
        }
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = this.buildDatePickerInput(searchTerm);
        const /** @type {?} */ $filterContainerElm = $(`<div class="form-group search-filter"></div>`);
        const /** @type {?} */ $containerInputGroup = $(`<div class="input-group flatpickr"></div>`);
        const /** @type {?} */ $operatorInputGroupAddon = $(`<div class="input-group-addon operator"></div>`);
        /* the DOM element final structure will be
              <div class="input-group">
                <div class="input-group-addon operator">
                  <select class="form-control"></select>
                </div>
                <div class=flatpickr>
                  <input type="text" class="form-control" data-input>
                </div>
              </div>
            */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        $containerInputGroup.append($operatorInputGroupAddon);
        $containerInputGroup.append(this.$filterInputElm);
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append($containerInputGroup);
        $filterContainerElm.attr('id', `filter-${this.columnDef.id}`);
        this.$filterInputElm.data('columnId', this.columnDef.id);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        // if there's a search term, we will add the "filled" class for styling purposes
        if (this.searchTerm) {
            $filterContainerElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    }
    /**
     * @param {?} columnDef
     * @param {?} gridOptions
     * @return {?}
     */
    getCurrentLocale(columnDef, gridOptions) {
        const /** @type {?} */ params = gridOptions.params || columnDef.params || {};
        if (params.i18n && params.i18n instanceof TranslateService) {
            return params.i18n.currentLang;
        }
        return 'en';
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    loadFlatpickrLocale(locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        if (locale !== 'en') {
            const /** @type {?} */ localeDefault = require(`flatpickr/dist/l10n/${locale}.js`).default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onTriggerEvent(e) {
        const /** @type {?} */ selectedOperator = this.$selectOperatorElm.find('option:selected').text();
        (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
        this.callback(e, { columnDef: this.columnDef, searchTerm: this._currentValue, operator: selectedOperator || '=' });
    }
    /**
     * @return {?}
     */
    hide() {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    }
    /**
     * @return {?}
     */
    show() {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    }
}
CompoundDateFilter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CompoundDateFilter.ctorParameters = () => [
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CompoundInputFilter {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.operator = args.operator;
        this.searchTerm = args.searchTerm;
        if (this.grid && typeof this.grid.getOptions === 'function') {
            this.gridOptions = this.grid.getOptions();
        }
        // step 1, create the DOM Element of the filter which contain the compound Operator+Input
        // and initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement();
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterInputElm.keyup((e) => {
            this.onTriggerEvent(e);
        });
        this.$selectOperatorElm.change((e) => {
            this.onTriggerEvent(e);
        });
    }
    /**
     * Clear the filter value
     * @param {?=} triggerFilterKeyup
     * @return {?}
     */
    clear(triggerFilterKeyup = true) {
        if (this.$filterElm && this.$selectOperatorElm) {
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val('');
            if (triggerFilterKeyup) {
                this.$filterElm.trigger('keyup');
            }
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
            this.$selectOperatorElm.off('change').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values) {
            this.$filterElm.val(values);
        }
    }
    /**
     * @return {?}
     */
    buildInputHtmlString() {
        const /** @type {?} */ placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        return `<input class="form-control" type="text" placeholder="${placeholder}" />`;
    }
    /**
     * @return {?}
     */
    buildSelectOperatorHtmlString() {
        const /** @type {?} */ optionValues = this.getOptionValues();
        let /** @type {?} */ optionValueString = '';
        optionValues.forEach((option) => {
            optionValueString += `<option value="${option.operator}" title="${option.description}">${option.operator}</option>`;
        });
        return `<select class="form-control">${optionValueString}</select>`;
    }
    /**
     * @return {?}
     */
    getOptionValues() {
        const /** @type {?} */ type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : FieldType.string;
        let /** @type {?} */ optionValues = [];
        switch (type) {
            case FieldType.string:
                optionValues = [
                    { operator: /** @type {?} */ (''), description: this.translate.instant('CONTAINS') },
                    { operator: /** @type {?} */ ('='), description: this.translate.instant('EQUALS') },
                    { operator: /** @type {?} */ ('a*'), description: this.translate.instant('STARTS_WITH') },
                    { operator: /** @type {?} */ ('*z'), description: this.translate.instant('ENDS_WITH') },
                ];
                break;
            default:
                optionValues = [
                    { operator: /** @type {?} */ (''), description: this.translate.instant('CONTAINS') },
                    { operator: /** @type {?} */ ('='), description: '' },
                    { operator: /** @type {?} */ ('<'), description: '' },
                    { operator: /** @type {?} */ ('<='), description: '' },
                    { operator: /** @type {?} */ ('>'), description: '' },
                    { operator: /** @type {?} */ ('>='), description: '' },
                    { operator: /** @type {?} */ ('<>'), description: '' }
                ];
                break;
        }
        return optionValues;
    }
    /**
     * Create the DOM element
     * @return {?}
     */
    createDomElement() {
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildInputHtmlString());
        const /** @type {?} */ $filterContainerElm = $(`<div class="form-group search-filter"></div>`);
        const /** @type {?} */ $containerInputGroup = $(`<div class="input-group"></div>`);
        const /** @type {?} */ $operatorInputGroupAddon = $(`<div class="input-group-addon operator"></div>`);
        /* the DOM element final structure will be
              <div class="input-group">
                <div class="input-group-addon operator">
                  <select class="form-control"></select>
                </div>
                <input class="form-control" type="text" />
              </div>
            */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        $containerInputGroup.append($operatorInputGroupAddon);
        $containerInputGroup.append(this.$filterInputElm);
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append($containerInputGroup);
        $filterContainerElm.attr('id', `filter-${this.columnDef.id}`);
        const /** @type {?} */ searchTerm = (typeof this.searchTerm === 'boolean') ? `${this.searchTerm}` : this.searchTerm;
        this.$filterInputElm.val(searchTerm);
        this.$filterInputElm.data('columnId', this.columnDef.id);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        // if there's a search term, we will add the "filled" class for styling purposes
        if (this.searchTerm) {
            $filterContainerElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onTriggerEvent(e) {
        const /** @type {?} */ selectedOperator = this.$selectOperatorElm.find('option:selected').text();
        const /** @type {?} */ value = this.$filterInputElm.val();
        (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
        this.callback(e, { columnDef: this.columnDef, searchTerm: value, operator: selectedOperator || '' });
    }
}
CompoundInputFilter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CompoundInputFilter.ctorParameters = () => [
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InputFilter {
    constructor() { }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerm = args.searchTerm;
        if (this.grid && typeof this.grid.getOptions === 'function') {
            this.gridOptions = this.grid.getOptions();
        }
        // step 1, create HTML string template
        const /** @type {?} */ filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.keyup((e) => {
            (e && e.target && e.target.value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef });
        });
    }
    /**
     * Clear the filter value
     * @param {?=} triggerFilterKeyup
     * @return {?}
     */
    clear(triggerFilterKeyup = true) {
        if (this.$filterElm) {
            this.$filterElm.val('');
            if (triggerFilterKeyup) {
                this.$filterElm.trigger('keyup');
            }
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values) {
            this.$filterElm.val(values);
        }
    }
    /**
     * Create the HTML template as a string
     * @return {?}
     */
    buildTemplateHtmlString() {
        const /** @type {?} */ placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        return `<input type="text" class="form-control search-filter" placeholder="${placeholder}">`;
    }
    /**
     * From the html template string, create a DOM element
     * @param {?} filterTemplate
     * @return {?}
     */
    createDomElement(filterTemplate) {
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        const /** @type {?} */ $filterElm = $(filterTemplate);
        const /** @type {?} */ searchTerm = (typeof this.searchTerm === 'boolean') ? `${this.searchTerm}` : this.searchTerm;
        $filterElm.val(searchTerm);
        $filterElm.attr('id', `filter-${this.columnDef.id}`);
        $filterElm.data('columnId', this.columnDef.id);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (this.searchTerm) {
            $filterElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MultipleSelectFilter {
    /**
     * Initialize the Filter
     * @param {?} collectionService
     * @param {?} translate
     */
    constructor(collectionService, translate) {
        this.collectionService = collectionService;
        this.translate = translate;
        this.isFilled = false;
        this.enableTranslateLabel = false;
        // default options used by this Filter, user can overwrite any of these by passing "otions"
        this.defaultOptions = {
            container: 'body',
            filter: false,
            // input search term on top of the select option list
            maxHeight: 200,
            okButton: true,
            addTitle: true,
            // show tooltip of all selected items while hovering the filter
            countSelected: this.translate.instant('X_OF_Y_SELECTED'),
            allSelected: this.translate.instant('ALL_SELECTED'),
            selectAllText: this.translate.instant('SELECT_ALL'),
            selectAllDelimiter: ['', ''],
            // remove default square brackets of default text "[Select All]" => "Select All"
            // we will subscribe to the onClose event for triggering our callback
            // also add/remove "filled" class for styling purposes
            onClose: () => {
                const /** @type {?} */ selectedItems = this.$filterElm.multipleSelect('getSelects');
                if (Array.isArray(selectedItems) && selectedItems.length > 0) {
                    this.isFilled = true;
                    this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    this.isFilled = false;
                    this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
                }
                this.callback(undefined, { columnDef: this.columnDef, operator: 'IN', searchTerms: selectedItems });
            }
        };
    }
    /**
     * Initialize the filter template
     * @param {?} args
     * @return {?}
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        if (!this.grid || !this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the MultipleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: type: FilterType.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        this.enableTranslateLabel = this.columnDef.filter.enableTranslateLabel;
        this.labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        this.valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        let /** @type {?} */ newCollection = this.columnDef.filter.collection || [];
        this.gridOptions = this.grid.getOptions();
        // user might want to filter certain items of the collection
        if (this.gridOptions.params && this.columnDef.filter.collectionFilterBy) {
            const /** @type {?} */ filterBy = this.columnDef.filter.collectionFilterBy;
            newCollection = this.collectionService.filterCollection(newCollection, filterBy);
        }
        // user might want to sort the collection
        if (this.gridOptions.params && this.columnDef.filter.collectionSortBy) {
            const /** @type {?} */ sortBy = this.columnDef.filter.collectionSortBy;
            newCollection = this.collectionService.sortCollection(newCollection, sortBy, this.enableTranslateLabel);
        }
        // step 1, create HTML string template
        const /** @type {?} */ filterTemplate = this.buildTemplateHtmlString(newCollection);
        // step 2, create the DOM Element of the filter & pre-load search terms
        // also subscribe to the onClose event
        this.createDomElement(filterTemplate);
    }
    /**
     * Clear the filter values
     * @param {?=} triggerFilterChange
     * @return {?}
     */
    clear(triggerFilterChange = true) {
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
            // this.$filterElm = $(`#${this.$filterElm[0].id}`);
            this.$filterElm.multipleSelect('setSelects', []);
            if (triggerFilterChange) {
                this.$filterElm.removeClass('filled');
                this.callback(undefined, { columnDef: this.columnDef, operator: 'IN', searchTerms: [] });
            }
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off().remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values) {
            this.$filterElm.multipleSelect('setSelects', values);
        }
    }
    /**
     * Create the HTML template as a string
     * @param {?} optionCollection
     * @return {?}
     */
    buildTemplateHtmlString(optionCollection) {
        let /** @type {?} */ options = '';
        optionCollection.forEach((option) => {
            if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
                throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FilterType.multipleSelect, collection: [ { value: '1', label: 'One' } ]')`);
            }
            const /** @type {?} */ labelKey = /** @type {?} */ ((option.labelKey || option[this.labelName]));
            const /** @type {?} */ selected = (this.findValueInSearchTerms(option[this.valueName]) >= 0) ? 'selected' : '';
            const /** @type {?} */ textLabel = ((option.labelKey || this.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;
            // html text of each select option
            options += `<option value="${option[this.valueName]}" ${selected}>${textLabel}</option>`;
            // if there's a search term, we will add the "filled" class for styling purposes
            if (selected) {
                this.isFilled = true;
            }
        });
        return `<select class="ms-filter search-filter" multiple="multiple">${options}</select>`;
    }
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param {?} filterTemplate
     * @return {?}
     */
    createDomElement(filterTemplate) {
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error(`multiple-select.js was not found, make sure to modify your "angular-cli.json" file and include "../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js" and it's css or SASS file`);
        }
        this.$filterElm.attr('id', `filter-${this.columnDef.id}`);
        this.$filterElm.data('columnId', this.columnDef.id);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (this.isFilled) {
            this.$filterElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
            this.$filterElm.appendTo($headerElm);
        }
        // merge options & attach multiSelect
        const /** @type {?} */ options = Object.assign({}, this.defaultOptions, this.columnDef.filter.filterOptions);
        this.$filterElm = this.$filterElm.multipleSelect(options);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    findValueInSearchTerms(value) {
        if (this.searchTerms && Array.isArray(this.searchTerms)) {
            for (let /** @type {?} */ i = 0; i < this.searchTerms.length; i++) {
                if (this.searchTerms[i] && this.searchTerms[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }
}
MultipleSelectFilter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MultipleSelectFilter.ctorParameters = () => [
    { type: CollectionService, },
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectFilter {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerm = args.searchTerm;
        // step 1, create HTML string template
        const /** @type {?} */ filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change((e) => {
            (e && e.target && e.target.value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, operator: 'EQ' });
        });
    }
    /**
     * Clear the filter values
     * @param {?=} triggerFilterChange
     * @return {?}
     */
    clear(triggerFilterChange = true) {
        if (this.$filterElm) {
            this.$filterElm.val('');
            if (triggerFilterChange) {
                this.$filterElm.trigger('change');
            }
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values) {
            this.$filterElm.val(values);
        }
    }
    /**
     * @return {?}
     */
    buildTemplateHtmlString() {
        if (!this.columnDef || !this.columnDef.filter || (!this.columnDef.filter.collection && !this.columnDef.filter.selectOptions)) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: type: FilterType.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        if (!this.columnDef.filter.collection && this.columnDef.filter.selectOptions) {
            console.warn(`[Angular-SlickGrid] The Select Filter "selectOptions" property will de deprecated in future version. Please use the new "collection" property which is more generic and can be used with other Filters (not just Select).`);
        }
        const /** @type {?} */ optionCollection = this.columnDef.filter.collection || this.columnDef.filter.selectOptions || [];
        const /** @type {?} */ labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        const /** @type {?} */ valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        let /** @type {?} */ options = '';
        optionCollection.forEach((option) => {
            if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FilterType.select, collection: [ { value: '1', label: 'One' } ]')`);
            }
            const /** @type {?} */ labelKey = option.labelKey || option[labelName];
            const /** @type {?} */ textLabel = ((option.labelKey || this.columnDef.filter.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;
            options += `<option value="${option[valueName]}">${textLabel}</option>`;
        });
        return `<select class="form-control search-filter">${options}</select>`;
    }
    /**
     * From the html template string, create a DOM element
     * @param {?} filterTemplate
     * @return {?}
     */
    createDomElement(filterTemplate) {
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        const /** @type {?} */ $filterElm = $(filterTemplate);
        const /** @type {?} */ searchTerm = (typeof this.searchTerm === 'boolean') ? `${this.searchTerm}` : this.searchTerm;
        $filterElm.val(searchTerm);
        $filterElm.attr('id', `filter-${this.columnDef.id}`);
        $filterElm.data('columnId', this.columnDef.id);
        // append the new DOM element to the header row
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SingleSelectFilter {
    /**
     * @param {?} collectionService
     * @param {?} translate
     */
    constructor(collectionService, translate) {
        this.collectionService = collectionService;
        this.translate = translate;
        this.isFilled = false;
        this.enableTranslateLabel = false;
        // default options used by this Filter, user can overwrite any of these by passing "otions"
        this.defaultOptions = {
            container: 'body',
            filter: false,
            // input search term on top of the select option list
            maxHeight: 200,
            single: true,
            onClose: () => {
                const /** @type {?} */ selectedItems = this.$filterElm.multipleSelect('getSelects');
                let /** @type {?} */ selectedItem = '';
                if (Array.isArray(selectedItems) && selectedItems.length > 0) {
                    selectedItem = selectedItems[0];
                    this.isFilled = true;
                    this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    this.isFilled = false;
                    this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
                }
                this.callback(undefined, { columnDef: this.columnDef, operator: 'EQ', searchTerm: selectedItem });
            }
        };
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerm = args.searchTerm;
        if (!this.grid || !this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the MultipleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: type: FilterType.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        this.enableTranslateLabel = this.columnDef.filter.enableTranslateLabel;
        this.labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        this.valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        let /** @type {?} */ newCollection = this.columnDef.filter.collection || [];
        this.gridOptions = this.grid.getOptions();
        // user might want to filter certain items of the collection
        if (this.gridOptions.params && this.columnDef.filter.collectionFilterBy) {
            const /** @type {?} */ filterBy = this.columnDef.filter.collectionFilterBy;
            newCollection = this.collectionService.filterCollection(newCollection, filterBy);
        }
        // user might want to sort the collection
        if (this.gridOptions.params && this.columnDef.filter.collectionSortBy) {
            const /** @type {?} */ sortBy = this.columnDef.filter.collectionSortBy;
            newCollection = this.collectionService.sortCollection(newCollection, sortBy, this.enableTranslateLabel);
        }
        // step 1, create HTML string template
        const /** @type {?} */ filterTemplate = this.buildTemplateHtmlString(newCollection || []);
        // step 2, create the DOM Element of the filter & pre-load search term
        this.createDomElement(filterTemplate);
    }
    /**
     * Clear the filter values
     * @param {?=} triggerFilterChange
     * @return {?}
     */
    clear(triggerFilterChange = true) {
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
            // this.$filterElm = $(`#${this.$filterElm[0].id}`);
            this.$filterElm.multipleSelect('setSelects', []);
            if (triggerFilterChange) {
                this.callback(undefined, { columnDef: this.columnDef, operator: 'IN', searchTerm: undefined });
            }
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off().remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values) {
            values = Array.isArray(values) ? values : [values];
            this.$filterElm.multipleSelect('setSelects', values);
        }
    }
    /**
     * Create the HTML template as a string
     * @param {?} optionCollection
     * @return {?}
     */
    buildTemplateHtmlString(optionCollection) {
        let /** @type {?} */ options = '';
        optionCollection.forEach((option) => {
            if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
                throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FilterType.singleSelect, collection: [ { value: '1', label: 'One' } ]')`);
            }
            const /** @type {?} */ labelKey = /** @type {?} */ ((option.labelKey || option[this.labelName]));
            const /** @type {?} */ selected = (option[this.valueName] === this.searchTerm) ? 'selected' : '';
            const /** @type {?} */ textLabel = ((option.labelKey || this.columnDef.filter.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;
            // html text of each select option
            options += `<option value="${option[this.valueName]}" ${selected}>${textLabel}</option>`;
            // if there's a search term, we will add the "filled" class for styling purposes
            if (selected) {
                this.isFilled = true;
            }
        });
        return `<select class="ms-filter search-filter">${options}</select>`;
    }
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param {?} filterTemplate
     * @return {?}
     */
    createDomElement(filterTemplate) {
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error(`multiple-select.js was not found, make sure to modify your "angular-cli.json" file and include "../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js" and it's css or SASS file`);
        }
        this.$filterElm.attr('id', `filter-${this.columnDef.id}`);
        this.$filterElm.data('columnId', this.columnDef.id);
        // append the new DOM element to the header row
        if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
            this.$filterElm.appendTo($headerElm);
        }
        // merge options & attach multiSelect
        const /** @type {?} */ options = Object.assign({}, this.defaultOptions, this.columnDef.filter.filterOptions);
        this.$filterElm = this.$filterElm.multipleSelect(options);
    }
}
SingleSelectFilter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SingleSelectFilter.ctorParameters = () => [
    { type: CollectionService, },
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const Filters = {
    /** Default Filter, input type text filter with a magnifying glass placeholder */
    input: InputFilter,
    /** Multiple Select filter, which uses 3rd party lib "multiple-select.js" */
    multipleSelect: MultipleSelectFilter,
    /** Single Select filter, which uses 3rd party lib "multiple-select.js" */
    singleSelect: SingleSelectFilter,
    /** Select filter, which uses native DOM element select */
    select: SelectFilter,
    /** Compound Date Filter (compound of Operator + Date picker) */
    compoundDate: CompoundDateFilter,
    /** Compound Input Filter (compound of Operator + Input) */
    compoundInput: CompoundInputFilter,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FilterService {
    /**
     * @param {?} collectionService
     * @param {?} translate
     */
    constructor(collectionService, translate) {
        this.collectionService = collectionService;
        this.translate = translate;
        this._eventHandler = new Slick.EventHandler();
        this._filters = [];
        this._columnFilters = {};
        this._isFirstQuery = true;
        this.onFilterChanged = new Subject();
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} columnDefinitions
     * @return {?}
     */
    init(grid, gridOptions, columnDefinitions) {
        this._grid = grid;
        this._gridOptions = gridOptions;
    }
    /**
     * Attach a backend filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} options
     * @return {?}
     */
    attachBackendOnFilter(grid, options) {
        this._filters = [];
        this._slickSubscriber = new Slick.Event();
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.attachBackendOnFilterSubscribe.bind(this));
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (e, args) => {
            this.addFilterTemplateToHeaderRow(args);
        });
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    attachBackendOnFilterSubscribe(event, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
            }
            const /** @type {?} */ gridOptions = args.grid.getOptions() || {};
            const /** @type {?} */ backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
            if (!backendApi || !backendApi.process || !backendApi.service) {
                throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
            }
            // run a preProcess callback if defined
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // call the service to get a query back
            const /** @type {?} */ query = yield backendApi.service.onFilterChanged(event, args);
            // emit an onFilterChanged event
            this.emitFilterChanged('remote');
            // the process could be an Observable (like HttpClient) or a Promise
            // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
            const /** @type {?} */ observableOrPromise = backendApi.process(query);
            const /** @type {?} */ processResult = yield castToPromise(observableOrPromise);
            // from the result, call our internal post process to update the Dataset and Pagination info
            if (processResult && backendApi.internalPostProcess) {
                backendApi.internalPostProcess(processResult);
            }
            // send the response process to the postProcess callback
            if (backendApi.postProcess !== undefined) {
                backendApi.postProcess(processResult);
            }
        });
    }
    /**
     * Attach a local filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} options
     * @param {?} dataView
     * @return {?}
     */
    attachLocalOnFilter(grid, options, dataView) {
        this._filters = [];
        this._dataView = dataView;
        this._slickSubscriber = new Slick.Event();
        dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
        dataView.setFilter(this.customLocalFilter.bind(this, dataView));
        this._slickSubscriber.subscribe((e, args) => {
            const /** @type {?} */ columnId = args.columnId;
            if (columnId != null) {
                dataView.refresh();
            }
            this.emitFilterChanged('local');
        });
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (e, args) => {
            this.addFilterTemplateToHeaderRow(args);
        });
    }
    /**
     * Clear the search filters (below the column titles)
     * @return {?}
     */
    clearFilters() {
        this._filters.forEach((filter, index) => {
            if (filter && filter.clear) {
                // clear element and trigger a change
                filter.clear(true);
            }
        });
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to clear columnFilter (without looping through) would not trigger a dataset change
        for (const /** @type {?} */ columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        // we also need to refresh the dataView and optionally the grid (it's optional since we use DataView)
        if (this._dataView) {
            this._dataView.refresh();
            this._grid.invalidate();
            this._grid.render();
        }
    }
    /**
     * @param {?} dataView
     * @param {?} item
     * @param {?} args
     * @return {?}
     */
    customLocalFilter(dataView, item, args) {
        for (const /** @type {?} */ columnId of Object.keys(args.columnFilters)) {
            const /** @type {?} */ columnFilter = args.columnFilters[columnId];
            const /** @type {?} */ columnIndex = args.grid.getColumnIndex(columnId);
            const /** @type {?} */ columnDef = args.grid.getColumns()[columnIndex];
            if (!columnDef) {
                return false;
            }
            const /** @type {?} */ fieldType = columnDef.type || FieldType.string;
            const /** @type {?} */ filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
            let /** @type {?} */ cellValue = item[columnDef.queryField || columnDef.queryFieldFilter || columnDef.field];
            const /** @type {?} */ searchTerms = (columnFilter && columnFilter.searchTerms) ? columnFilter.searchTerms : null;
            let /** @type {?} */ fieldSearchValue = (columnFilter && (columnFilter.searchTerm !== undefined || columnFilter.searchTerm !== null)) ? columnFilter.searchTerm : undefined;
            if (typeof fieldSearchValue === 'undefined') {
                fieldSearchValue = '';
            }
            fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
            const /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
            let /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
            const /** @type {?} */ searchTerm = (!!matches) ? matches[2] : '';
            const /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
            if (searchTerms && searchTerms.length > 0) {
                fieldSearchValue = searchTerms.join(',');
            }
            else if (typeof fieldSearchValue === 'string') {
                // escaping the search value
                fieldSearchValue = fieldSearchValue.replace(`'`, `''`); // escape single quotes by doubling them
                if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                    operator = (operator === '*' || operator === '*z') ? OperatorType.endsWith : OperatorType.startsWith;
                }
            }
            // when using a Filter that is not a custom type, we want to make sure that we have a default operator type
            // for example a multiple-select should always be using IN, while a single select will use an EQ
            const /** @type {?} */ filterType = (columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input;
            if (!operator && filterType !== FilterType.custom) {
                switch (filterType) {
                    case FilterType.select:
                    case FilterType.multipleSelect:
                        operator = 'IN';
                        break;
                    case FilterType.singleSelect:
                        operator = 'EQ';
                        break;
                    default:
                        operator = operator;
                        break;
                }
            }
            // no need to query if search value is empty
            if (searchTerm === '' && !searchTerms) {
                return true;
            }
            // filter search terms should always be string type (even though we permit the end user to input numbers)
            // so make sure each term are strings, if user has some default search terms, we will cast them to string
            if (searchTerms && Array.isArray(searchTerms)) {
                for (let /** @type {?} */ k = 0, /** @type {?} */ ln = searchTerms.length; k < ln; k++) {
                    // make sure all search terms are strings
                    searchTerms[k] = ((searchTerms[k] === undefined || searchTerms[k] === null) ? '' : searchTerms[k]) + '';
                }
            }
            // when using localization (i18n), we should use the formatter output to search as the new cell value
            if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
                const /** @type {?} */ rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
                cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
            }
            // make sure cell value is always a string
            if (typeof cellValue === 'number') {
                cellValue = cellValue.toString();
            }
            const /** @type {?} */ conditionOptions = {
                fieldType,
                searchTerms,
                searchTerm,
                cellValue,
                operator,
                cellValueLastChar: lastValueChar,
                filterSearchType
            };
            if (!FilterConditions.executeMappedCondition(conditionOptions)) {
                return false;
            }
        }
        return true;
    }
    /**
     * @return {?}
     */
    dispose() {
        this.disposeColumnFilters();
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
    }
    /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     * @return {?}
     */
    disposeColumnFilters() {
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
        for (const /** @type {?} */ columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        // also destroy each Filter instances
        this._filters.forEach((filter, index) => {
            if (filter && filter.destroy) {
                filter.destroy(true);
            }
        });
    }
    /**
     * @return {?}
     */
    getColumnFilters() {
        return this._columnFilters;
    }
    /**
     * @return {?}
     */
    getCurrentLocalFilters() {
        const /** @type {?} */ currentFilters = [];
        if (this._columnFilters) {
            for (const /** @type {?} */ colId of Object.keys(this._columnFilters)) {
                const /** @type {?} */ columnFilter = this._columnFilters[colId];
                const /** @type {?} */ columnDef = columnFilter.columnDef;
                const /** @type {?} */ filter = /** @type {?} */ ({ columnId: colId || '' });
                if (columnFilter && columnFilter.searchTerms) {
                    filter.searchTerms = columnFilter.searchTerms;
                }
                else {
                    filter.searchTerm = (columnFilter && (columnFilter.searchTerm !== undefined || columnFilter.searchTerm !== null)) ? columnFilter.searchTerm : undefined;
                }
                if (columnFilter.operator) {
                    filter.operator = columnFilter.operator;
                }
                currentFilters.push(filter);
            }
        }
        return currentFilters;
    }
    /**
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    callbackSearchEvent(e, args) {
        if (args) {
            const /** @type {?} */ searchTerm = args.searchTerm ? args.searchTerm : ((e && e.target) ? (/** @type {?} */ (e.target)).value : undefined);
            const /** @type {?} */ searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : undefined;
            const /** @type {?} */ columnDef = args.columnDef || null;
            const /** @type {?} */ columnId = columnDef ? (columnDef.id || '') : '';
            const /** @type {?} */ operator = args.operator || undefined;
            if (!searchTerm && (!searchTerms || (Array.isArray(searchTerms) && searchTerms.length === 0))) {
                // delete the property from the columnFilters when it becomes empty
                // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
                delete this._columnFilters[columnId];
            }
            else {
                const /** @type {?} */ colId = /** @type {?} */ ('' + columnId);
                const /** @type {?} */ colFilter = {
                    columnId: colId,
                    columnDef,
                    searchTerm,
                    searchTerms,
                };
                if (operator) {
                    colFilter.operator = operator;
                }
                this._columnFilters[colId] = colFilter;
            }
            this.triggerEvent(this._slickSubscriber, {
                columnId,
                columnDef: args.columnDef || null,
                columnFilters: this._columnFilters,
                operator,
                searchTerm,
                searchTerms,
                serviceOptions: this._onFilterChangedOptions,
                grid: this._grid
            }, e);
        }
    }
    /**
     * @param {?} args
     * @return {?}
     */
    addFilterTemplateToHeaderRow(args) {
        const /** @type {?} */ columnDef = args.column;
        const /** @type {?} */ columnId = columnDef.id || '';
        if (columnDef && columnId !== 'selector' && columnDef.filterable) {
            let /** @type {?} */ searchTerms;
            let /** @type {?} */ searchTerm;
            let /** @type {?} */ operator;
            if (this._columnFilters[columnDef.id]) {
                searchTerm = this._columnFilters[columnDef.id].searchTerm || undefined;
                searchTerms = this._columnFilters[columnDef.id].searchTerms || undefined;
                operator = this._columnFilters[columnDef.id].operator || undefined;
            }
            else if (columnDef.filter) {
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // because of that we need to first get searchTerm(s) from the columnFilters (that is what the user last entered)
                searchTerms = columnDef.filter.searchTerms || undefined;
                searchTerm = columnDef.filter.searchTerm || undefined;
                operator = columnDef.filter.operator || undefined;
                this.updateColumnFilters(searchTerm, searchTerms, columnDef);
            }
            const /** @type {?} */ filterArguments = {
                grid: this._grid,
                operator,
                searchTerm,
                searchTerms,
                columnDef,
                callback: this.callbackSearchEvent.bind(this)
            };
            // depending on the Filter type, we will watch the correct event
            // or use the global default when no filter type is provided
            let /** @type {?} */ filterType = (columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input;
            if (!filterType) {
                filterType = this._gridOptions.defaultFilterType;
            }
            let /** @type {?} */ filter;
            switch (filterType) {
                case FilterType.custom:
                    if (columnDef && columnDef.filter && columnDef.filter.customFilter) {
                        filter = columnDef.filter.customFilter;
                    }
                    break;
                case FilterType.select:
                    filter = new Filters.select(this.translate);
                    break;
                case FilterType.multipleSelect:
                    filter = new Filters.multipleSelect(this.collectionService, this.translate);
                    break;
                case FilterType.singleSelect:
                    filter = new Filters.singleSelect(this.collectionService, this.translate);
                    break;
                case FilterType.compoundDate:
                    filter = new Filters.compoundDate(this.translate);
                    break;
                case FilterType.compoundInput:
                    filter = new Filters.compoundInput(this.translate);
                    break;
                case FilterType.input:
                default:
                    filter = new Filters.input();
                    break;
            }
            if (filter) {
                filter.init(filterArguments);
                const /** @type {?} */ filterExistIndex = this._filters.findIndex((filt) => filter.columnDef.name === filt.columnDef.name);
                // add to the filters arrays or replace it when found
                if (filterExistIndex === -1) {
                    this._filters.push(filter);
                }
                else {
                    this._filters[filterExistIndex] = filter;
                }
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // we need to also set again the values in the DOM elements if the values were set by a searchTerm(s)
                if ((searchTerm || searchTerms) && filter.setValues) {
                    filter.setValues(searchTerm || searchTerms);
                }
            }
        }
    }
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    emitFilterChanged(sender) {
        if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
            let /** @type {?} */ currentFilters = [];
            const /** @type {?} */ backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                currentFilters = /** @type {?} */ (backendService.getCurrentFilters());
            }
            this.onFilterChanged.next(currentFilters);
        }
        else if (sender === 'local') {
            this.onFilterChanged.next(this.getCurrentLocalFilters());
        }
    }
    /**
     * When user passes an array of preset filters, we need to pre-polulate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     * @param {?} gridOptions
     * @param {?} columnDefinitions
     * @return {?}
     */
    populateColumnFilterSearchTerms(gridOptions, columnDefinitions) {
        if (gridOptions.presets && gridOptions.presets.filters) {
            const /** @type {?} */ filters = gridOptions.presets.filters;
            columnDefinitions.forEach((columnDef) => {
                const /** @type {?} */ columnPreset = filters.find((presetFilter) => {
                    return presetFilter.columnId === columnDef.id;
                });
                if (columnPreset && columnPreset.searchTerm) {
                    columnDef.filter = columnDef.filter || {};
                    columnDef.filter.operator = columnPreset.operator;
                    columnDef.filter.searchTerm = columnPreset.searchTerm;
                }
                if (columnPreset && columnPreset.searchTerms) {
                    columnDef.filter = columnDef.filter || {};
                    columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || OperatorType.in;
                    columnDef.filter.searchTerms = columnPreset.searchTerms;
                }
            });
        }
        return columnDefinitions;
    }
    /**
     * @param {?} searchTerm
     * @param {?} searchTerms
     * @param {?} columnDef
     * @return {?}
     */
    updateColumnFilters(searchTerm, searchTerms, columnDef) {
        if (searchTerm !== undefined && searchTerm !== null && searchTerm !== '') {
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef,
                searchTerm,
                operator: (columnDef && columnDef.filter && columnDef.filter.operator) ? columnDef.filter.operator : null,
                type: (columnDef && columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input
            };
        }
        if (searchTerms) {
            // this._columnFilters.searchTerms = searchTerms;
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef,
                searchTerms,
                operator: (columnDef && columnDef.filter && columnDef.filter.operator) ? columnDef.filter.operator : null,
                type: (columnDef && columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input
            };
        }
    }
    /**
     * @param {?} slickEvent
     * @param {?} args
     * @param {?} e
     * @return {?}
     */
    triggerEvent(slickEvent, args, e) {
        slickEvent = slickEvent || new Slick.Event();
        // event might have been created as a CustomEvent (e.g. CompoundDateFilter), without being a valid Slick.EventData.
        // if so we will create a new Slick.EventData and merge it with that CustomEvent to avoid having SlickGrid errors
        let /** @type {?} */ event = e;
        if (e && typeof e.isPropagationStopped !== 'function') {
            event = $.extend({}, new Slick.EventData(), e);
        }
        slickEvent.notify(args, event, args.grid);
    }
}
FilterService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FilterService.ctorParameters = () => [
    { type: CollectionService, },
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SharedService {
    /**
     * @param {?} grid
     * @param {?} dataView
     * @param {?} gridOptions
     * @param {?} columnDefinitions
     * @return {?}
     */
    init(grid, dataView, gridOptions, columnDefinitions) {
        this.grid = grid;
        this.dataView = dataView;
        this.gridOptions = gridOptions;
        this.columnDefinitions = columnDefinitions;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ControlAndPluginService {
    /**
     * @param {?} exportService
     * @param {?} filterService
     * @param {?} sharedService
     * @param {?} translate
     */
    constructor(exportService, filterService, sharedService, translate) {
        this.exportService = exportService;
        this.filterService = filterService;
        this.sharedService = sharedService;
        this.translate = translate;
    }
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @return {?}
     */
    attachDifferentControlOrPlugins() {
        this._grid = this.sharedService.grid;
        this._gridOptions = this.sharedService.gridOptions;
        this._dataView = this.sharedService.dataView;
        this._columnDefinitions = this.sharedService.columnDefinitions;
        this.visibleColumns = this.sharedService.columnDefinitions;
        if (this._gridOptions.enableColumnPicker) {
            this.columnPickerControl = this.createColumnPicker(this._grid, this._columnDefinitions, this._gridOptions);
        }
        if (this._gridOptions.enableGridMenu) {
            this.gridMenuControl = this.createGridMenu(this._grid, this._columnDefinitions, this._gridOptions);
        }
        if (this._gridOptions.enableAutoTooltip) {
            this.autoTooltipPlugin = new Slick.AutoTooltips(this._gridOptions.autoTooltipOptions || {});
            this._grid.registerPlugin(this.autoTooltipPlugin);
        }
        // register the group item metadata provider to add expand/collapse group handlers
        if (this._gridOptions.enableGrouping) {
            const /** @type {?} */ groupItemMetaProvider = this.sharedService.groupItemMetadataProvider || {};
            this._grid.registerPlugin(groupItemMetaProvider);
        }
        if (this._gridOptions.enableCheckboxSelector) {
            // when enabling the Checkbox Selector Plugin, we need to also watch onClick events to perform certain actions
            // the selector column has to be create BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
            this._grid.registerPlugin(this.checkboxSelectorPlugin);
            // this also requires the Row Selection Model to be registered as well
            if (!this.rowSelectionPlugin) {
                this.rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
                this._grid.setSelectionModel(this.rowSelectionPlugin);
            }
        }
        if (this._gridOptions.enableRowSelection) {
            this.rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(this.rowSelectionPlugin);
        }
        if (this._gridOptions.enableHeaderButton) {
            this.headerButtonsPlugin = new Slick.Plugins.HeaderButtons(this._gridOptions.headerButton || {});
            this._grid.registerPlugin(this.headerButtonsPlugin);
            this.headerButtonsPlugin.onCommand.subscribe((e, args) => {
                if (this._gridOptions.headerButton && typeof this._gridOptions.headerButton.onCommand === 'function') {
                    this._gridOptions.headerButton.onCommand(e, args);
                }
            });
        }
        if (this._gridOptions.enableHeaderMenu) {
            const /** @type {?} */ headerMenuOptions = this._gridOptions.headerMenu || {};
            headerMenuOptions.minWidth = headerMenuOptions.minWidth || 140;
            headerMenuOptions.autoAlignOffset = headerMenuOptions.autoAlignOffset || 12;
            this.headerMenuPlugin = new Slick.Plugins.HeaderMenu(headerMenuOptions);
            this._grid.registerPlugin(this.headerMenuPlugin);
            this.headerMenuPlugin.onCommand.subscribe((e, args) => {
                if (this._gridOptions.headerMenu && typeof this._gridOptions.headerMenu.onCommand === 'function') {
                    this._gridOptions.headerMenu.onCommand(e, args);
                }
            });
            this.headerMenuPlugin.onCommand.subscribe((e, args) => {
                if (this._gridOptions.headerMenu && typeof this._gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                    this._gridOptions.headerMenu.onBeforeMenuShow(e, args);
                }
            });
        }
        if (this._gridOptions.registerPlugins !== undefined) {
            if (Array.isArray(this._gridOptions.registerPlugins)) {
                this._gridOptions.registerPlugins.forEach((plugin) => {
                    this._grid.registerPlugin(plugin);
                });
            }
            else {
                this._grid.registerPlugin(this._gridOptions.registerPlugins);
            }
        }
    }
    /**
     * @param {?} grid
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    createColumnPicker(grid, columnDefinitions, options) {
        // localization support for the picker
        const /** @type {?} */ forceFitTitle = options.enableTranslate ? this.translate.instant('FORCE_FIT_COLUMNS') : 'Force fit columns';
        const /** @type {?} */ syncResizeTitle = options.enableTranslate ? this.translate.instant('SYNCHRONOUS_RESIZE') : 'Synchronous resize';
        options.columnPicker = options.columnPicker || {};
        options.columnPicker.forceFitTitle = options.columnPicker.forceFitTitle || forceFitTitle;
        options.columnPicker.syncResizeTitle = options.columnPicker.syncResizeTitle || syncResizeTitle;
        this.columnPickerControl = new Slick.Controls.ColumnPicker(columnDefinitions, grid, options);
        if (grid && options.enableColumnPicker) {
            this.columnPickerControl.onColumnsChanged.subscribe((e, args) => {
                if (options.columnPicker && typeof options.columnPicker.onColumnsChanged === 'function') {
                    options.columnPicker.onColumnsChanged(e, args);
                }
            });
        }
    }
    /**
     * Create (or re-create) Grid Menu and expose all the available hooks that user can subscribe (onCommand, onMenuClose, ...)
     * @param {?} grid
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    createGridMenu(grid, columnDefinitions, options) {
        options.gridMenu = Object.assign({}, this.getDefaultGridMenuOptions(), options.gridMenu);
        this.addGridMenuCustomCommands(grid, options);
        const /** @type {?} */ gridMenuControl = new Slick.Controls.GridMenu(columnDefinitions, grid, options);
        if (grid && options.gridMenu) {
            gridMenuControl.onBeforeMenuShow.subscribe((e, args) => {
                if (options.gridMenu && typeof options.gridMenu.onBeforeMenuShow === 'function') {
                    options.gridMenu.onBeforeMenuShow(e, args);
                }
            });
            gridMenuControl.onColumnsChanged.subscribe((e, args) => {
                if (options.gridMenu && typeof options.gridMenu.onColumnsChanged === 'function') {
                    options.gridMenu.onColumnsChanged(e, args);
                }
            });
            gridMenuControl.onCommand.subscribe((e, args) => {
                if (options.gridMenu && typeof options.gridMenu.onCommand === 'function') {
                    options.gridMenu.onCommand(e, args);
                }
            });
            gridMenuControl.onMenuClose.subscribe((e, args) => {
                if (options.gridMenu && typeof options.gridMenu.onMenuClose === 'function') {
                    options.gridMenu.onMenuClose(e, args);
                }
                // we also want to resize the columns if the user decided to hide certain column(s)
                if (grid && typeof grid.autosizeColumns === 'function') {
                    // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
                    const /** @type {?} */ gridUid = grid.getUID();
                    if (gridUid && $(`.${gridUid}`).length > 0) {
                        grid.autosizeColumns();
                    }
                }
            });
        }
        return gridMenuControl;
    }
    /**
     * @param {?} column
     * @return {?}
     */
    hideColumn(column) {
        if (this._grid && this.visibleColumns) {
            const /** @type {?} */ columnIndex = this._grid.getColumnIndex(column.id);
            this.visibleColumns = this.removeColumnByIndex(this.visibleColumns, columnIndex);
            this._grid.setColumns(this.visibleColumns);
        }
    }
    /**
     * @param {?} array
     * @param {?} index
     * @return {?}
     */
    removeColumnByIndex(array, index) {
        return array.filter((el, i) => {
            return index !== i;
        });
    }
    /**
     * @return {?}
     */
    autoResizeColumns() {
        this._grid.autosizeColumns();
    }
    /**
     * @return {?}
     */
    dispose() {
        this._grid = null;
        this._dataView = null;
        this.visibleColumns = [];
        if (this.columnPickerControl) {
            this.columnPickerControl.destroy();
            this.columnPickerControl = null;
        }
        if (this.gridMenuControl) {
            this.gridMenuControl.destroy();
            this.gridMenuControl = null;
        }
        if (this.rowSelectionPlugin) {
            this.rowSelectionPlugin.destroy();
            this.rowSelectionPlugin = null;
        }
        if (this.checkboxSelectorPlugin) {
            this.checkboxSelectorPlugin.destroy();
            this.checkboxSelectorPlugin = null;
        }
        if (this.autoTooltipPlugin) {
            this.autoTooltipPlugin.destroy();
            this.autoTooltipPlugin = null;
        }
        if (this.headerButtonsPlugin) {
            this.headerButtonsPlugin.destroy();
            this.headerButtonsPlugin = null;
        }
        if (this.headerMenuPlugin) {
            this.headerMenuPlugin.destroy();
            this.headerMenuPlugin = null;
        }
    }
    /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @param {?} grid
     * @param {?} options
     * @return {?}
     */
    addGridMenuCustomCommands(grid, options) {
        const /** @type {?} */ backendApi = options.backendServiceApi || options.onBackendEventApi || null;
        if (options.enableFiltering) {
            // show grid menu: clear all filters
            if (options && options.gridMenu && options.gridMenu.showClearAllFiltersCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item) => item.command === 'clear-filter').length === 0) {
                options.gridMenu.customItems.push({
                    iconCssClass: 'fa fa-filter text-danger',
                    title: options.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : 'Clear All Filters',
                    disabled: false,
                    command: 'clear-filter',
                    positionOrder: 50
                });
            }
            // show grid menu: toggle filter row
            if (options && options.gridMenu && options.gridMenu.showToggleFilterCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item) => item.command === 'toggle-filter').length === 0) {
                options.gridMenu.customItems.push({
                    iconCssClass: 'fa fa-random',
                    title: options.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : 'Toggle Filter Row',
                    disabled: false,
                    command: 'toggle-filter',
                    positionOrder: 51
                });
            }
            // show grid menu: refresh dataset
            if (options && options.gridMenu && options.gridMenu.showRefreshDatasetCommand && backendApi && options.gridMenu.customItems && options.gridMenu.customItems.filter((item) => item.command === 'refresh-dataset').length === 0) {
                options.gridMenu.customItems.push({
                    iconCssClass: 'fa fa-refresh',
                    title: options.enableTranslate ? this.translate.instant('REFRESH_DATASET') : 'Refresh Dataset',
                    disabled: false,
                    command: 'refresh-dataset',
                    positionOrder: 54
                });
            }
        }
        // show grid menu: export to file
        if (options && options.enableExport && options.gridMenu && options.gridMenu.showExportCsvCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item) => item.command === 'export-csv').length === 0) {
            options.gridMenu.customItems.push({
                iconCssClass: 'fa fa-download',
                title: options.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : 'Export in CSV format',
                disabled: false,
                command: 'export-csv',
                positionOrder: 52
            });
        }
        // show grid menu: export to text file as tab delimited
        if (options && options.enableExport && options.gridMenu && options.gridMenu.showExportTextDelimitedCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item) => item.command === 'export-text-delimited').length === 0) {
            options.gridMenu.customItems.push({
                iconCssClass: 'fa fa-download',
                title: options.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : 'Export in Text format (Tab delimited)',
                disabled: false,
                command: 'export-text-delimited',
                positionOrder: 53
            });
        }
        // Command callback, what will be executed after command is clicked
        if (options.gridMenu && options.gridMenu.customItems.length > 0) {
            options.gridMenu.onCommand = (e, args) => {
                if (args && args.command) {
                    switch (args.command) {
                        case 'clear-filter':
                            this.filterService.clearFilters();
                            this._dataView.refresh();
                            break;
                        case 'export-csv':
                            this.exportService.exportToFile({
                                delimiter: DelimiterType.comma,
                                filename: 'export',
                                format: FileType.csv,
                                useUtf8WithBom: true
                            });
                            break;
                        case 'export-text-delimited':
                            this.exportService.exportToFile({
                                delimiter: DelimiterType.tab,
                                filename: 'export',
                                format: FileType.txt,
                                useUtf8WithBom: true
                            });
                            break;
                        case 'toggle-filter':
                            grid.setHeaderRowVisibility(!grid.getOptions().showHeaderRow);
                            break;
                        case 'toggle-toppanel':
                            grid.setTopPanelVisibility(!grid.getOptions().showTopPanel);
                            break;
                        case 'clear-filter':
                            this.filterService.clearFilters();
                            this._dataView.refresh();
                            break;
                        case 'refresh-dataset':
                            this.refreshBackendDataset(options);
                            break;
                        default:
                            alert('Command: ' + args.command);
                            break;
                    }
                }
            };
        }
        // add the custom "Commands" title if there are any commands
        if (options && options.gridMenu && options.gridMenu.customItems && options.gridMenu.customItems.length > 0) {
            const /** @type {?} */ customTitle = options.enableTranslate ? this.translate.instant('COMMANDS') : 'Commands';
            options.gridMenu.customTitle = options.gridMenu.customTitle || customTitle;
            // sort the custom items by their position in the list
            options.gridMenu.customItems.sort((itemA, itemB) => {
                if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
                    return itemA.positionOrder - itemB.positionOrder;
                }
                return 0;
            });
        }
    }
    /**
     * @return {?} default Grid Menu options
     */
    getDefaultGridMenuOptions() {
        return {
            columnTitle: this.translate.instant('COLUMNS') || 'Columns',
            forceFitTitle: this.translate.instant('FORCE_FIT_COLUMNS') || 'Force fit columns',
            syncResizeTitle: this.translate.instant('SYNCHRONOUS_RESIZE') || 'Synchronous resize',
            iconCssClass: 'fa fa-bars',
            menuWidth: 18,
            customTitle: undefined,
            customItems: [],
            showClearAllFiltersCommand: true,
            showRefreshDatasetCommand: true,
            showToggleFilterCommand: true
        };
    }
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    refreshBackendDataset(gridOptions) {
        let /** @type {?} */ query;
        const /** @type {?} */ backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        if (backendApi.service) {
            query = backendApi.service.buildQuery();
        }
        if (query && query !== '') {
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // the process could be an Observable (like HttpClient) or a Promise
            // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
            const /** @type {?} */ observableOrPromise = backendApi.process(query);
            castToPromise(observableOrPromise).then((processResult) => {
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi.postProcess) {
                    backendApi.postProcess(processResult);
                }
            });
        }
    }
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param {?} gridMenu
     * @return {?}
     */
    resetGridMenuTranslations(gridMenu) {
        // we will reset the custom items array since the commands title have to be translated too (no worries, we will re-create it later)
        gridMenu.customItems = [];
        delete gridMenu.customTitle;
        gridMenu.columnTitle = this.translate.instant('COLUMNS') || 'Columns';
        gridMenu.forceFitTitle = this.translate.instant('FORCE_FIT_COLUMNS') || 'Force fit columns';
        gridMenu.syncResizeTitle = this.translate.instant('SYNCHRONOUS_RESIZE') || 'Synchronous resize';
        return gridMenu;
    }
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * Note that the only way that seems to work is to destroy and re-create the Column Picker
     * Changing only the columnPicker.columnTitle with i18n translate was not enough.
     * @return {?}
     */
    translateColumnPicker() {
        // destroy and re-create the Column Picker which seems to be the only way to translate properly
        if (this.columnPickerControl) {
            this.columnPickerControl.destroy();
            this.columnPickerControl = null;
        }
        this._gridOptions.columnPicker = undefined;
        this.createColumnPicker(this._grid, this.visibleColumns, this._gridOptions);
    }
    /**
     * Translate the Grid Menu ColumnTitle and CustomTitle.
     * Note that the only way that seems to work is to destroy and re-create the Grid Menu
     * Changing only the gridMenu.columnTitle with i18n translate was not enough.
     * @return {?}
     */
    translateGridMenu() {
        // destroy and re-create the Grid Menu which seems to be the only way to translate properly
        this.gridMenuControl.destroy();
        // reset all Grid Menu options that have translation text & then re-create the Grid Menu and also the custom items array
        if (this._gridOptions && this._gridOptions.gridMenu) {
            this._gridOptions.gridMenu = this.resetGridMenuTranslations(this._gridOptions.gridMenu);
        }
        this.createGridMenu(this._grid, this.visibleColumns, this._gridOptions);
    }
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param {?=} locale locale to use
     * @return {?}
     */
    translateHeaders(locale) {
        if (locale) {
            this.translate.use(locale);
        }
        for (const /** @type {?} */ column of this._columnDefinitions) {
            if (column.headerKey) {
                column.name = this.translate.instant(column.headerKey);
            }
        }
        // calling setColumns() will trigger a grid re-render
        this._grid.setColumns(this._columnDefinitions);
    }
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    createPluginBeforeGridCreation(columnDefinitions, options) {
        if (options.enableCheckboxSelector) {
            this.checkboxSelectorPlugin = new Slick.CheckboxSelectColumn(options.checkboxSelector || {});
            const /** @type {?} */ selectionColumn = this.checkboxSelectorPlugin.getColumnDefinition();
            selectionColumn.excludeFromExport = true;
            selectionColumn.excludeFromQuery = true;
            columnDefinitions.unshift(selectionColumn);
        }
    }
}
ControlAndPluginService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ControlAndPluginService.ctorParameters = () => [
    { type: ExportService, },
    { type: FilterService, },
    { type: SharedService, },
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
class GraphqlQueryBuilder {
    /**
     * @param {?} queryFnName
     * @param {?=} aliasOrFilter
     */
    constructor(queryFnName, aliasOrFilter) {
        this.queryFnName = queryFnName;
        this.head = [];
        if (typeof aliasOrFilter === 'function') {
            this.alias = aliasOrFilter;
        }
        else if (typeof aliasOrFilter === 'object') {
            this.filter(aliasOrFilter);
        }
        else if (undefined === aliasOrFilter && 2 === arguments.length) {
            throw new TypeError(`You have passed undefined as Second argument to "Query"`);
        }
        else if (undefined !== aliasOrFilter) {
            throw new TypeError(`Second argument to "Query" should be an alias name(String) or filter arguments(Object). was passed ${aliasOrFilter}`);
        }
    }
    /**
     * The parameters to run the query against.
     * @param {?} filters An object mapping attribute to values
     * @return {?}
     */
    filter(filters) {
        for (const /** @type {?} */ prop of Object.keys(filters)) {
            if (typeof filters[prop] === 'function') {
                continue;
            }
            const /** @type {?} */ val = this.getGraphQLValue(filters[prop]);
            if (val === '{}') {
                continue;
            }
            this.head.push(`${prop}:${val}`);
        }
        return this;
    }
    /**
     * Outlines the properties you wish to be returned from the query.
     * @param {...?} searches
     * @return {?}
     */
    find(...searches) {
        // THIS NEED TO BE A "FUNCTION" to scope 'arguments'
        if (!searches) {
            throw new TypeError(`find value can not be >>falsy<<`);
        }
        // if its a string.. it may have other values
        // else it sould be an Object or Array of maped values
        const /** @type {?} */ searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
        this.body = this.parceFind(searchKeys);
        return this;
    }
    /**
     * set an alias for this result.
     * @param {?} alias
     * @return {?}
     */
    setAlias(alias) {
        this.alias = alias;
    }
    /**
     * Return to the formatted query string
     * @return {?}
     */
    toString() {
        if (this.body === undefined) {
            throw new ReferenceError(`return properties are not defined. use the 'find' function to defined them`);
        }
        return `${(this.alias) ? (this.alias + ':') : ''} ${this.queryFnName} ${(this.head.length > 0) ? '(' + this.head.join(',') + ')' : ''}  { ${this.body} }`;
    }
    /**
     * @param {?} _levelA
     * @return {?}
     */
    parceFind(_levelA) {
        const /** @type {?} */ propsA = _levelA.map((currentValue, index) => {
            const /** @type {?} */ itemX = _levelA[index];
            if (itemX instanceof GraphqlQueryBuilder) {
                return itemX.toString();
            }
            else if (!Array.isArray(itemX) && typeof itemX === 'object') {
                const /** @type {?} */ propsAA = Object.keys(itemX);
                if (1 !== propsAA.length) {
                    throw new RangeError(`Alias objects should only have one value. was passed: ${JSON.stringify(itemX)}`);
                }
                const /** @type {?} */ propS = propsAA[0];
                const /** @type {?} */ item = itemX[propS];
                if (Array.isArray(item)) {
                    return new GraphqlQueryBuilder(propS).find(item);
                }
                return `${propS} : ${item} `;
            }
            else if (typeof itemX === 'string') {
                return itemX;
            }
            else {
                throw new RangeError(`cannot handle Find value of ${itemX}`);
            }
        });
        return propsA.join(',');
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getGraphQLValue(value) {
        if (typeof value === 'string') {
            value = JSON.stringify(value);
        }
        else if (Array.isArray(value)) {
            value = value.map(item => {
                return this.getGraphQLValue(item);
            }).join();
            value = `[${value}]`;
        }
        else if (value instanceof Date) {
            value = JSON.stringify(value);
        }
        else if (value !== null && typeof value === 'object') {
            value = this.objectToString(value);
        }
        return value;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    objectToString(obj) {
        const /** @type {?} */ sourceA = [];
        for (const /** @type {?} */ prop of Object.keys(obj)) {
            if (typeof obj[prop] === 'function') {
                continue;
            }
            sourceA.push(`${prop}:${this.getGraphQLValue(obj[prop])}`);
        }
        return `{${sourceA.join()}}`;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// timer for keeping track of user typing waits
let timer;
const DEFAULT_FILTER_TYPING_DEBOUNCE = 750;
const DEFAULT_ITEMS_PER_PAGE = 25;
const DEFAULT_PAGE_SIZE = 20;
class GraphqlService {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this.defaultOrderBy = { field: 'id', direction: SortDirection.ASC };
        this.defaultPaginationOptions = {
            first: DEFAULT_ITEMS_PER_PAGE,
            offset: 0
        };
    }
    /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @return {?}
     */
    buildQuery() {
        if (!this.options || !this.options.datasetName || (!this._columnDefinitions && !this.options.columnDefinitions)) {
            throw new Error('GraphQL Service requires "datasetName" & "columnDefinitions" properties for it to work');
        }
        // get the column definitions and exclude some if they were tagged as excluded
        let /** @type {?} */ columnDefinitions = this._columnDefinitions || this.options.columnDefinitions;
        columnDefinitions = columnDefinitions.filter((column) => !column.excludeFromQuery);
        const /** @type {?} */ queryQb = new GraphqlQueryBuilder('query');
        const /** @type {?} */ datasetQb = new GraphqlQueryBuilder(this.options.datasetName);
        const /** @type {?} */ pageInfoQb = new GraphqlQueryBuilder('pageInfo');
        const /** @type {?} */ dataQb = (this.options.isWithCursor) ? new GraphqlQueryBuilder('edges') : new GraphqlQueryBuilder('nodes');
        // get all the columnds Ids for the filters to work
        let /** @type {?} */ columnIds = [];
        if (columnDefinitions && Array.isArray(columnDefinitions)) {
            for (const /** @type {?} */ column of columnDefinitions) {
                columnIds.push(column.field);
                // if extra "fields" are passed, also push them to columnIds
                if (column.fields) {
                    columnIds.push(...column.fields);
                }
            }
            // columnIds = columnDefinitions.map((column) => column.field);
        }
        else {
            columnIds = this.options.columnIds || [];
        }
        // Slickgrid also requires the "id" field to be part of DataView
        // add it to the GraphQL query if it wasn't already part of the list
        if (columnIds.indexOf('id') === -1) {
            columnIds.unshift('id');
        }
        const /** @type {?} */ filters = this.buildFilterQuery(columnIds);
        if (this.options.isWithCursor) {
            // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
            pageInfoQb.find('hasNextPage', 'endCursor');
            dataQb.find(['cursor', { node: filters }]);
        }
        else {
            // ...pageInfo { hasNextPage }, nodes { _filters_ }
            pageInfoQb.find('hasNextPage');
            dataQb.find(filters);
        }
        datasetQb.find(['totalCount', pageInfoQb, dataQb]);
        // add dataset filters, could be Pagination and SortingFilters and/or FieldFilters
        const /** @type {?} */ datasetFilters = Object.assign({}, this.options.paginationOptions, { first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first });
        if (!this.options.isWithCursor) {
            datasetFilters.offset = ((this.options.paginationOptions && this.options.paginationOptions.hasOwnProperty('offset')) ? +this.options.paginationOptions['offset'] : 0);
        }
        if (this.options.sortingOptions && Array.isArray(this.options.sortingOptions) && this.options.sortingOptions.length > 0) {
            // orderBy: [{ field:x, direction: 'ASC' }]
            datasetFilters.orderBy = this.options.sortingOptions;
        }
        if (this.options.filteringOptions && Array.isArray(this.options.filteringOptions) && this.options.filteringOptions.length > 0) {
            // filterBy: [{ field: date, operator: '>', value: '2000-10-10' }]
            datasetFilters.filterBy = this.options.filteringOptions;
        }
        if (this.options.addLocaleIntoQuery) {
            // first: 20, ... locale: "en-CA"
            datasetFilters.locale = this.translate.currentLang || 'en';
        }
        // query { users(first: 20, orderBy: [], filterBy: [])}
        datasetQb.filter(datasetFilters);
        queryQb.find(datasetQb);
        const /** @type {?} */ enumSearchProperties = ['direction:', 'field:', 'operator:'];
        return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties, this.options.keepArgumentFieldDoubleQuotes || false);
    }
    /**
     * From an input array of strings, we want to build a GraphQL query string.
     * The process has to take the dot notation and parse it into a valid GraphQL query
     * Following this SO answer https://stackoverflow.com/a/47705476/1212166
     *
     * INPUT
     *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
     * OUTPUT
     * firstName, lastName, billing{address{street, zip}}
     * @param {?} inputArray
     * @return {?}
     */
    buildFilterQuery(inputArray) {
        const /** @type {?} */ set = (o = {}, a) => {
            const /** @type {?} */ k = a.shift();
            o[k] = a.length ? set(o[k], a) : null;
            return o;
        };
        const /** @type {?} */ output = inputArray.reduce((o, a) => set(o, a.split('.')), {});
        return JSON.stringify(output)
            .replace(/\"|\:|null/g, '')
            .replace(/^\{/, '')
            .replace(/\}$/, '');
    }
    /**
     * @param {?=} serviceOptions
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    init(serviceOptions, pagination, grid) {
        this._grid = grid;
        this.options = serviceOptions || {};
        this.pagination = pagination;
        if (grid && grid.getColumns && grid.getOptions) {
            this._columnDefinitions = grid.getColumns();
            this._gridOptions = grid.getOptions();
        }
    }
    /**
     * Get an initialization of Pagination options
     * @return {?} Pagination Options
     */
    getInitPaginationOptions() {
        return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
    }
    /**
     * Get the GraphQL dataset name
     * @return {?}
     */
    getDatasetName() {
        return this.options.datasetName || '';
    }
    /**
     * Get the Filters that are currently used by the grid
     * @return {?}
     */
    getCurrentFilters() {
        return this._currentFilters;
    }
    /**
     * Get the Pagination that is currently used by the grid
     * @return {?}
     */
    getCurrentPagination() {
        return this._currentPagination;
    }
    /**
     * Get the Sorters that are currently used by the grid
     * @return {?}
     */
    getCurrentSorters() {
        return this._currentSorters;
    }
    /**
     * @return {?}
     */
    resetPaginationOptions() {
        let /** @type {?} */ paginationOptions;
        if (this.options.isWithCursor) {
            // first, last, after, before
            paginationOptions = /** @type {?} */ ({
                after: '',
                before: undefined,
                last: undefined
            });
        }
        else {
            // first, last, offset
            paginationOptions = /** @type {?} */ ((this.options.paginationOptions || this.getInitPaginationOptions()));
            paginationOptions.offset = 0;
        }
        // save current pagination as Page 1 and page size as "first" set size
        this._currentPagination = {
            pageNumber: 1,
            pageSize: paginationOptions.first
        };
        this.updateOptions({ paginationOptions });
    }
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    updateOptions(serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onFilterChanged(event, args) {
        const /** @type {?} */ gridOptions = this._gridOptions || args.grid.getOptions();
        const /** @type {?} */ backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
        }
        // only add a delay when user is typing, on select dropdown filter it will execute right away
        let /** @type {?} */ debounceTypingDelay = 0;
        if (event && (event.type === 'keyup' || event.type === 'keydown')) {
            debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
        }
        const /** @type {?} */ promise = new Promise((resolve, reject) => {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying create the GraphQL Backend Service, it seems that "args" is not populated correctly');
            }
            // reset Pagination, then build the GraphQL query which we will use in the WebAPI callback
            // wait a minimum user typing inactivity before processing any query
            clearTimeout(timer);
            timer = setTimeout(() => {
                // loop through all columns to inspect filters & set the query
                this.updateFilters(args.columnFilters, false);
                this.resetPaginationOptions();
                resolve(this.buildQuery());
            }, debounceTypingDelay);
        });
        return promise;
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onPaginationChanged(event, args) {
        const /** @type {?} */ pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
        this.updatePagination(args.newPage, pageSize);
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onSortChanged(event, args) {
        const /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // loop through all columns to inspect sorters & set the query
        this.updateSorters(sortColumns);
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    }
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?} isUpdatedByPreset
     * @return {?}
     */
    updateFilters(columnFilters, isUpdatedByPreset) {
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        this._currentFilters = this.castFilterToColumnFilter(columnFilters);
        const /** @type {?} */ searchByArray = [];
        let /** @type {?} */ searchValue;
        for (const /** @type {?} */ columnId in columnFilters) {
            if (columnFilters.hasOwnProperty(columnId)) {
                const /** @type {?} */ columnFilter = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                let /** @type {?} */ columnDef;
                if (isUpdatedByPreset && Array.isArray(this._columnDefinitions)) {
                    columnDef = this._columnDefinitions.find((column) => {
                        return column.id === columnFilter.columnId;
                    });
                }
                else {
                    columnDef = columnFilter.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                const /** @type {?} */ fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                const /** @type {?} */ searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
                let /** @type {?} */ fieldSearchValue = columnFilter.searchTerm;
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error(`GraphQL filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {type: FilterType.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                const /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                let /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
                searchValue = (!!matches) ? matches[2] : '';
                const /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    continue;
                }
                // when having more than 1 search term (we need to create a CSV string for GraphQL "IN" or "NOT IN" filter search)
                if (searchTerms && searchTerms.length > 0) {
                    searchValue = searchTerms.join(',');
                }
                else if (typeof searchValue === 'string') {
                    // escaping the search value
                    searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
                    if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                        operator = (operator === '*' || operator === '*z') ? 'endsWith' : 'startsWith';
                    }
                }
                // if we didn't find an Operator but we have a Filter Type, we should use default Operator
                // multipleSelect is "IN", while singleSelect is "EQ", else don't map any operator
                if (!operator && columnDef.filter) {
                    operator = mapOperatorByFilterType(columnDef.filter.type || '');
                }
                // if we still don't have an operator find the proper Operator to use by it's field type
                if (!operator) {
                    operator = mapOperatorByFieldType(columnDef.type || FieldType.string);
                }
                searchByArray.push({
                    field: fieldName,
                    operator: mapOperatorType(operator),
                    value: searchValue
                });
            }
        }
        // update the service options with filters for the buildQuery() to work later
        this.updateOptions({ filteringOptions: searchByArray });
    }
    /**
     * Update the pagination component with it's new page number and size
     * @param {?} newPage
     * @param {?} pageSize
     * @return {?}
     */
    updatePagination(newPage, pageSize) {
        this._currentPagination = {
            pageNumber: newPage,
            pageSize
        };
        let /** @type {?} */ paginationOptions;
        if (this.options.isWithCursor) {
            paginationOptions = {
                first: pageSize
            };
        }
        else {
            paginationOptions = {
                first: pageSize,
                offset: (newPage - 1) * pageSize
            };
        }
        this.updateOptions({ paginationOptions });
    }
    /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    updateSorters(sortColumns, presetSorters) {
        let /** @type {?} */ currentSorters = [];
        let /** @type {?} */ graphqlSorters = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in uppercase for GraphQL
            currentSorters = presetSorters;
            currentSorters.forEach((sorter) => sorter.direction = /** @type {?} */ (sorter.direction.toUpperCase()));
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            const /** @type {?} */ tmpSorterArray = currentSorters.map((sorter) => {
                graphqlSorters.push({
                    field: sorter.columnId + '',
                    direction: sorter.direction
                });
                return {
                    columnId: sorter.columnId,
                    sortAsc: sorter.direction.toUpperCase() === SortDirection.ASC
                };
            });
            this._grid.setSortColumns(tmpSorterArray);
        }
        else if (sortColumns && !presetSorters) {
            // build the orderBy array, it could be multisort, example
            // orderBy:[{field: lastName, direction: ASC}, {field: firstName, direction: DESC}]
            if (sortColumns && sortColumns.length === 0) {
                graphqlSorters = new Array(this.defaultOrderBy); // when empty, use the default sort
                currentSorters = new Array({ columnId: this.defaultOrderBy.direction, direction: this.defaultOrderBy.direction });
            }
            else {
                if (sortColumns) {
                    for (const /** @type {?} */ column of sortColumns) {
                        if (column && column.sortCol) {
                            currentSorters.push({
                                columnId: (column.sortCol.queryField || column.sortCol.queryFieldSorter || column.sortCol.field || column.sortCol.id) + '',
                                direction: column.sortAsc ? SortDirection.ASC : SortDirection.DESC
                            });
                            graphqlSorters.push({
                                field: (column.sortCol.queryField || column.sortCol.queryFieldSorter || column.sortCol.field || column.sortCol.id) + '',
                                direction: column.sortAsc ? SortDirection.ASC : SortDirection.DESC
                            });
                        }
                    }
                }
            }
        }
        // keep current Sorters and update the service options with the new sorting
        this._currentSorters = currentSorters;
        this.updateOptions({ sortingOptions: graphqlSorters });
    }
    /**
     * A function which takes an input string and removes double quotes only
     * on certain fields are identified as GraphQL enums (except fields with dot notation)
     * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
     * then the result will be:
     * FROM
     * query { users (orderBy:[{field:"firstName", direction:"ASC"} }]) }
     * TO
     * query { users (orderBy:[{field: firstName, direction: ASC}})}
     *
     * EXCEPTIONS (fields with dot notation "." which are inside a "field:")
     * these fields will keep double quotes while everything else will be stripped of double quotes
     * query { users (orderBy:[{field:"billing.street.name", direction: "ASC"} }
     * TO
     * query { users (orderBy:[{field:"billing.street.name", direction: ASC}}
     * @param {?} inputStr input string
     * @param {?} enumSearchWords array of enum words to filter
     * @param {?} keepArgumentFieldDoubleQuotes
     * @return {?} outputStr output string
     */
    trimDoubleQuotesOnEnumField(inputStr, enumSearchWords, keepArgumentFieldDoubleQuotes) {
        const /** @type {?} */ patternWordInQuotes = `\s?((field:\s*)?".*?")`;
        let /** @type {?} */ patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
        patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
        // example with (field: & direction:):  /field:s?(".*?")|direction:s?(".*?")/
        const /** @type {?} */ reg = new RegExp(patternRegex, 'g');
        return inputStr.replace(reg, (group1, group2, group3) => {
            // remove double quotes except when the string starts with a "field:"
            let /** @type {?} */ removeDoubleQuotes = true;
            if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
                removeDoubleQuotes = false;
            }
            const /** @type {?} */ rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
            return rep;
        });
    }
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @param {?} columnFilters
     * @return {?}
     */
    castFilterToColumnFilter(columnFilters) {
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        const /** @type {?} */ filtersArray = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map(key => columnFilters[key]) : columnFilters;
        return filtersArray.map((filter) => {
            const /** @type {?} */ columnDef = filter.columnDef;
            const /** @type {?} */ header = (columnDef) ? (columnDef.headerKey || columnDef.name || '') : '';
            const /** @type {?} */ tmpFilter = { columnId: filter.columnId || '' };
            if (filter.operator) {
                tmpFilter.operator = filter.operator;
            }
            if (Array.isArray(filter.searchTerms)) {
                tmpFilter.searchTerms = filter.searchTerms;
            }
            else {
                tmpFilter.searchTerm = filter.searchTerm;
            }
            return tmpFilter;
        });
    }
}
GraphqlService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GraphqlService.ctorParameters = () => [
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        const /** @type {?} */ queryTmpArray = [];
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
                    filterStr = this._odataOptions.filter.join(` ${this._odataOptions.filterBySeparator || 'and'} `);
                }
                this._odataOptions.filterQueue.push(`(${filterStr})`);
            }
            // filterBy are passed manually by the user, however we will only add it if the column wasn't yet filtered
            if (!!this._odataOptions.filterBy && !!this._odataOptions.filterBy.fieldName && !this._columnFilters[this._odataOptions.filterBy.fieldName.toLowerCase()]) {
                if (this._odataOptions.filterBy.searchTerm !== '') {
                    this.saveColumnFilter(this._odataOptions.filterBy.fieldName.toLowerCase(), this._odataOptions.filterBy.searchTerm, this._odataOptions.filterBy.searchTerms);
                    this.updateFilterFromListTerms(this._odataOptions.filterBy);
                }
            }
        }
        if (this._odataOptions.filterQueue.length > 0) {
            const /** @type {?} */ query = this._odataOptions.filterQueue.join(` ${this._odataOptions.filterBySeparator || 'and'} `);
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
            value
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
        const /** @type {?} */ fieldSearchTerms = filterOptions.searchTerms;
        const /** @type {?} */ operator = filterOptions.operator;
        // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
        if (!!fieldSearchTerms && fieldSearchTerms.length > 0) {
            const /** @type {?} */ tmpSearchTerms = [];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let timer$1;
const DEFAULT_FILTER_TYPING_DEBOUNCE$1 = 750;
const DEFAULT_ITEMS_PER_PAGE$1 = 25;
const DEFAULT_PAGE_SIZE$1 = 20;
class GridOdataService {
    /**
     * @param {?} odataService
     */
    constructor(odataService) {
        this.odataService = odataService;
        this.defaultOptions = {
            top: DEFAULT_ITEMS_PER_PAGE$1,
            orderBy: '',
            caseType: CaseType.pascalCase
        };
    }
    /**
     * @return {?}
     */
    buildQuery() {
        return this.odataService.buildQuery();
    }
    /**
     * @param {?} options
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    init(options, pagination, grid) {
        this._grid = grid;
        const /** @type {?} */ mergedOptions = Object.assign({}, this.defaultOptions, options);
        if (pagination && pagination.pageSize) {
            mergedOptions.top = pagination.pageSize;
        }
        this.odataService.options = Object.assign({}, mergedOptions, { top: mergedOptions.top || this.defaultOptions.top });
        this.options = this.odataService.options;
        this.pagination = pagination;
        // save current pagination as Page 1 and page size as "top"
        this._currentPagination = {
            pageNumber: 1,
            pageSize: this.odataService.options.top || this.defaultOptions.top
        };
        if (grid && grid.getColumns && grid.getOptions) {
            this._columnDefinitions = grid.getColumns() || options["columnDefinitions"];
            this._columnDefinitions = this._columnDefinitions.filter((column) => !column.excludeFromQuery);
            this._gridOptions = grid.getOptions();
        }
    }
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    updateOptions(serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
    }
    /**
     * @param {?} fieldName
     * @return {?}
     */
    removeColumnFilter(fieldName) {
        this.odataService.removeColumnFilter(fieldName);
    }
    /**
     * Get the Filters that are currently used by the grid
     * @return {?}
     */
    getCurrentFilters() {
        return this._currentFilters;
    }
    /**
     * Get the Pagination that is currently used by the grid
     * @return {?}
     */
    getCurrentPagination() {
        return this._currentPagination;
    }
    /**
     * Get the Sorters that are currently used by the grid
     * @return {?}
     */
    getCurrentSorters() {
        return this._currentSorters;
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
        const /** @type {?} */ serviceOptions = args.grid.getOptions();
        const /** @type {?} */ backendApi = serviceOptions.backendServiceApi || serviceOptions.onBackendEventApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
        }
        // only add a delay when user is typing, on select dropdown filter it will execute right away
        let /** @type {?} */ debounceTypingDelay = 0;
        if (event && (event.type === 'keyup' || event.type === 'keydown')) {
            debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE$1;
        }
        const /** @type {?} */ promise = new Promise((resolve, reject) => {
            // reset Pagination, then build the OData query which we will use in the WebAPI callback
            // wait a minimum user typing inactivity before processing any query
            clearTimeout(timer$1);
            timer$1 = setTimeout(() => {
                // loop through all columns to inspect filters & set the query
                this.updateFilters(args.columnFilters);
                this.resetPaginationOptions();
                resolve(this.odataService.buildQuery());
            }, debounceTypingDelay);
        });
        return promise;
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onPaginationChanged(event, args) {
        const /** @type {?} */ pageSize = +(args.pageSize || DEFAULT_PAGE_SIZE$1);
        this.updatePagination(args.newPage, pageSize);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onSortChanged(event, args) {
        const /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // loop through all columns to inspect sorters & set the query
        this.updateSorters(sortColumns);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?=} isUpdatedByPreset
     * @return {?}
     */
    updateFilters(columnFilters, isUpdatedByPreset) {
        this._currentFilters = this.castFilterToColumnFilter(columnFilters);
        let /** @type {?} */ searchBy = '';
        const /** @type {?} */ searchByArray = [];
        // loop through all columns to inspect filters
        for (const /** @type {?} */ columnId in columnFilters) {
            if (columnFilters.hasOwnProperty(columnId)) {
                const /** @type {?} */ columnFilter = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                let /** @type {?} */ columnDef;
                if (isUpdatedByPreset && Array.isArray(this._columnDefinitions)) {
                    columnDef = this._columnDefinitions.find((column) => {
                        return column.id === columnFilter.columnId;
                    });
                }
                else {
                    columnDef = columnFilter.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                let /** @type {?} */ fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                const /** @type {?} */ fieldType = columnDef.type || 'string';
                const /** @type {?} */ searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
                let /** @type {?} */ fieldSearchValue = columnFilter.searchTerm;
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error(`ODdata filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {type: FilterType.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                const /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                const /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
                let /** @type {?} */ searchValue = (!!matches) ? matches[2] : '';
                const /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
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
                    searchBy = '';
                    // titleCase the fieldName so that it matches the WebApi names
                    if (this.odataService.options.caseType === CaseType.pascalCase) {
                        fieldName = String.titleCase(fieldName || '');
                    }
                    // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                    if (searchTerms && searchTerms.length > 0) {
                        const /** @type {?} */ tmpSearchTerms = [];
                        if (operator === 'IN') {
                            // example:: (Stage eq "Expired" or Stage eq "Renewal")
                            for (let /** @type {?} */ j = 0, /** @type {?} */ lnj = searchTerms.length; j < lnj; j++) {
                                tmpSearchTerms.push(`${fieldName} eq '${searchTerms[j]}'`);
                            }
                            searchBy = tmpSearchTerms.join(' or ');
                            searchBy = `(${searchBy})`;
                        }
                        else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                            // example:: (Stage ne "Expired" and Stage ne "Renewal")
                            for (let /** @type {?} */ k = 0, /** @type {?} */ lnk = searchTerms.length; k < lnk; k++) {
                                tmpSearchTerms.push(`${fieldName} ne '${searchTerms[k]}'`);
                            }
                            searchBy = tmpSearchTerms.join(' and ');
                            searchBy = `(${searchBy})`;
                        }
                    }
                    else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar !== '') {
                        // first/last character is a '*' will be a startsWith or endsWith
                        searchBy = (operator === '*' || operator === '*z')
                            ? `endswith(${fieldName}, '${searchValue}')`
                            : `startswith(${fieldName}, '${searchValue}')`;
                    }
                    else if (fieldType === FieldType.date) {
                        // date field needs to be UTC and within DateTime function
                        const /** @type {?} */ dateFormatted = parseUtcDate(searchValue, true);
                        if (dateFormatted) {
                            searchBy = `${fieldName} ${this.mapOdataOperator(operator)} DateTime'${dateFormatted}'`;
                        }
                    }
                    else if (fieldType === FieldType.string) {
                        // string field needs to be in single quotes
                        if (operator === '') {
                            searchBy = `substringof('${searchValue}', ${fieldName})`;
                        }
                        else {
                            // searchBy = `substringof('${searchValue}', ${fieldNameCased}) ${this.mapOdataOperator(operator)} true`;
                            searchBy = `${fieldName} ${this.mapOdataOperator(operator)} '${searchValue}'`;
                        }
                    }
                    else {
                        // any other field type (or undefined type)
                        searchValue = fieldType === FieldType.number ? searchValue : `'${searchValue}'`;
                        searchBy = `${fieldName} ${this.mapOdataOperator(operator)} ${searchValue}`;
                    }
                    // push to our temp array and also trim white spaces
                    if (searchBy !== '') {
                        searchByArray.push(String.trim(searchBy));
                        this.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
                    }
                }
            }
        }
        // update the service options with filters for the buildQuery() to work later
        this.odataService.updateOptions({
            filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
            skip: undefined
        });
    }
    /**
     * Update the pagination component with it's new page number and size
     * @param {?} newPage
     * @param {?} pageSize
     * @return {?}
     */
    updatePagination(newPage, pageSize) {
        this._currentPagination = {
            pageNumber: newPage,
            pageSize
        };
        this.odataService.updateOptions({
            top: pageSize,
            skip: (newPage - 1) * pageSize
        });
    }
    /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    updateSorters(sortColumns, presetSorters) {
        let /** @type {?} */ sortByArray = [];
        const /** @type {?} */ sorterArray = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in lowercase for OData
            sortByArray = presetSorters;
            sortByArray.forEach((sorter) => sorter.direction = /** @type {?} */ (sorter.direction.toLowerCase()));
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            const /** @type {?} */ tmpSorterArray = sortByArray.map((sorter) => {
                sorterArray.push({
                    columnId: sorter.columnId + '',
                    direction: sorter.direction
                });
                return {
                    columnId: sorter.columnId,
                    sortAsc: sorter.direction.toUpperCase() === SortDirection.ASC
                };
            });
            this._grid.setSortColumns(tmpSorterArray);
        }
        else if (sortColumns && !presetSorters) {
            // build the SortBy string, it could be multisort, example: customerNo asc, purchaserName desc
            if (sortColumns && sortColumns.length === 0) {
                sortByArray = new Array(this.defaultOptions.orderBy); // when empty, use the default sort
            }
            else {
                if (sortColumns) {
                    for (const /** @type {?} */ column of sortColumns) {
                        if (column.sortCol) {
                            let /** @type {?} */ fieldName = (column.sortCol.queryField || column.sortCol.queryFieldSorter || column.sortCol.field || column.sortCol.id) + '';
                            if (this.odataService.options.caseType === CaseType.pascalCase) {
                                fieldName = String.titleCase(fieldName);
                            }
                            sorterArray.push({
                                columnId: fieldName,
                                direction: column.sortAsc ? 'asc' : 'desc'
                            });
                        }
                    }
                    sortByArray = sorterArray;
                }
            }
        }
        // transform the sortby array into a CSV string for OData
        sortByArray = /** @type {?} */ (sortByArray);
        const /** @type {?} */ csvString = sortByArray.map((sorter) => `${sorter.columnId} ${sorter.direction.toLowerCase()}`).join(',');
        this.odataService.updateOptions({
            orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvString) : csvString
        });
        // keep current Sorters and update the service options with the new sorting
        this._currentSorters = /** @type {?} */ (sortByArray);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @param {?} columnFilters
     * @return {?}
     */
    castFilterToColumnFilter(columnFilters) {
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        const /** @type {?} */ filtersArray = /** @type {?} */ (((typeof columnFilters === 'object') ? Object.keys(columnFilters).map(key => columnFilters[key]) : columnFilters));
        return filtersArray.map((filter) => {
            const /** @type {?} */ columnDef = filter.columnDef;
            const /** @type {?} */ header = (columnDef) ? (columnDef.headerKey || columnDef.name || '') : '';
            const /** @type {?} */ tmpFilter = { columnId: filter.columnId || '' };
            if (filter.operator) {
                tmpFilter.operator = filter.operator;
            }
            if (Array.isArray(filter.searchTerms)) {
                tmpFilter.searchTerms = filter.searchTerms;
            }
            else {
                tmpFilter.searchTerm = filter.searchTerm;
            }
            return tmpFilter;
        });
    }
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @param {?} operator
     * @return {?} string map
     */
    mapOdataOperator(operator) {
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
}
GridOdataService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GridOdataService.ctorParameters = () => [
    { type: OdataService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GridEventService {
    constructor() {
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    attachOnCellChange(grid, gridOptions, dataView) {
        // subscribe to this Slickgrid event of onCellChange
        this._eventHandler.subscribe(grid.onCellChange, (e, args) => {
            if (!e || !args || !args.grid || args.cell === undefined || !args.grid.getColumns || !args.grid.getDataItem) {
                return;
            }
            const /** @type {?} */ column = args.grid.getColumns()[args.cell];
            // if the column definition has a onCellChange property (a callback function), then run it
            if (typeof column.onCellChange === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
                const /** @type {?} */ returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView,
                    gridDefinition: gridOptions,
                    grid,
                    columnDef: column,
                    dataContext: args.grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellChanges.... function
                column.onCellChange(returnedArgs);
                // e.stopImmediatePropagation();
            }
        });
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    attachOnClick(grid, gridOptions, dataView) {
        this._eventHandler.subscribe(grid.onClick, (e, args) => {
            if (!e || !args || !args.grid || args.cell === undefined || !args.grid.getColumns || !args.grid.getDataItem) {
                return;
            }
            const /** @type {?} */ column = args.grid.getColumns()[args.cell];
            // if the column definition has a onCellClick property (a callback function), then run it
            if (typeof column.onCellClick === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
                const /** @type {?} */ returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView,
                    gridDefinition: gridOptions,
                    grid,
                    columnDef: column,
                    dataContext: args.grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellClick.... function
                column.onCellClick(returnedArgs);
                e.stopImmediatePropagation();
            }
            // stop the click event bubbling
            // NOTE: We don't want to stop bubbling when doing an input edit, if we do the autoEdit which has intent of doing singleClick edit will become doubleClick edit
            if (grid.getOptions && !grid.getOptions().autoEdit) {
                // e.stopImmediatePropagation();
            }
        });
    }
    /**
     * @return {?}
     */
    dispose() {
        this._eventHandler.unsubscribeAll();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GridExtraService {
    /**
     * @param {?} grid
     * @param {?} columnDefinition
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    init(grid, columnDefinition, gridOptions, dataView) {
        this._grid = grid;
        this._gridOptions = gridOptions;
        this._dataView = dataView;
    }
    /**
     * @param {?} rowNumber
     * @return {?}
     */
    getDataItemByRowNumber(rowNumber) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(rowNumber);
    }
    /**
     * Chain the item Metadata with our implementation of Metadata at given row index
     * @param {?} previousItemMetadata
     * @return {?}
     */
    getItemRowMetadata(previousItemMetadata) {
        return (rowNumber) => {
            const /** @type {?} */ item = this._dataView.getItem(rowNumber);
            let /** @type {?} */ meta = {
                cssClasses: ''
            };
            if (typeof previousItemMetadata === 'object' && !$.isEmptyObject(previousItemMetadata)) {
                meta = previousItemMetadata(rowNumber);
            }
            if (item && item._dirty) {
                meta.cssClasses = (meta.cssClasses || '') + ' dirty';
            }
            if (item && item.rowClass) {
                meta.cssClasses += ` ${item.rowClass}`;
                meta.cssClasses += ` row${rowNumber}`;
            }
            return meta;
        };
    }
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    highlightRow(rowNumber, fadeDelay = 1500) {
        // create a SelectionModel if there's not one yet
        if (!this._grid.getSelectionModel()) {
            const /** @type {?} */ rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(rowSelectionPlugin);
        }
        this._grid.setSelectedRows([rowNumber]);
        this._dataView.getItemMetadata = this.getItemRowMetadata(this._dataView.getItemMetadata);
        const /** @type {?} */ item = this._dataView.getItem(rowNumber);
        if (item && item.id) {
            item.rowClass = 'highlight';
            this._dataView.updateItem(item.id, item);
            const /** @type {?} */ gridOptions = /** @type {?} */ (this._grid.getOptions());
            // highlight the row for a user defined timeout
            $(`#${gridOptions.gridId}`)
                .find(`.highlight.row${rowNumber}`)
                .first();
            // delete the row's CSS that was attached for highlighting
            setTimeout(() => {
                if (item && item.id) {
                    delete item.rowClass;
                    const /** @type {?} */ gridIdx = this._dataView.getIdxById(item.id);
                    if (gridIdx !== undefined) {
                        this._dataView.updateItem(item.id, item);
                    }
                }
            }, fadeDelay + 10);
        }
    }
    /**
     * @return {?}
     */
    getSelectedRows() {
        return this._grid.getSelectedRows();
    }
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    setSelectedRow(rowIndex) {
        this._grid.setSelectedRows([rowIndex]);
    }
    /**
     * @param {?} rowIndexes
     * @return {?}
     */
    setSelectedRows(rowIndexes) {
        this._grid.setSelectedRows(rowIndexes);
    }
    /**
     * @return {?}
     */
    renderGrid() {
        if (this._grid && typeof this._grid.invalidate === 'function') {
            this._grid.invalidate();
            this._grid.render();
        }
    }
    /**
     * Add an item (data item) to the datagrid
     * @param {?} item
     * @return {?}
     */
    addItemToDatagrid(item) {
        if (!this._grid || !this._gridOptions || !this._dataView) {
            throw new Error('We could not find SlickGrid Grid, DataView objects');
        }
        if (!this._gridOptions || (!this._gridOptions.enableCheckboxSelector && !this._gridOptions.enableRowSelection)) {
            throw new Error('addItemToDatagrid() requires to have a valid Slickgrid Selection Model. You can overcome this issue by enabling enableCheckboxSelector or enableRowSelection to True');
        }
        const /** @type {?} */ row = 0;
        this._dataView.insertItem(row, item);
        this._grid.scrollRowIntoView(0); // scroll to row 0
        this.highlightRow(0, 1500);
        // refresh dataview & grid
        this._dataView.refresh();
    }
    /**
     * Update an existing item with new properties inside the datagrid
     * @param {?} item
     * @return {?}
     */
    updateDataGridItem(item) {
        const /** @type {?} */ row = this._dataView.getRowById(item.id);
        const /** @type {?} */ itemId = (!item || !item.hasOwnProperty('id')) ? -1 : item.id;
        if (itemId === -1) {
            throw new Error(`Could not find the item in the item in the grid or it's associated "id"`);
        }
        const /** @type {?} */ gridIdx = this._dataView.getIdxById(itemId);
        if (gridIdx !== undefined) {
            // Update the item itself inside the dataView
            this._dataView.updateItem(itemId, item);
            // highlight the row we just updated
            this.highlightRow(row, 1500);
            // refresh dataview & grid
            this._dataView.refresh();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GridExtraUtils {
    /**
     * @param {?} args
     * @return {?}
     */
    static getColumnDefinitionAndData(args) {
        if (!args || !args.grid || !args.grid.getColumns || !args.grid.getDataItem) {
            throw new Error('To get the column definition and data, we need to have these arguments passed (row, cell, grid)');
        }
        return {
            columnDef: args.grid.getColumns()[args.cell],
            dataContext: args.grid.getDataItem(args.row)
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GridStateService {
    constructor() {
        this.onGridStateChanged = new Subject();
    }
    /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} filterService
     * @param {?} sortService
     * @return {?}
     */
    init(grid, filterService, sortService) {
        this._grid = grid;
        this.filterService = filterService;
        this.sortService = sortService;
        this._gridOptions = (grid && grid.getOptions) ? grid.getOptions() : {};
        // Subscribe to Event Emitter of Filter & Sort changed, go back to page 1 when that happen
        this._filterSubcription = this.filterService.onFilterChanged.subscribe((currentFilters) => {
            this.onGridStateChanged.next({ change: { newValues: currentFilters, type: GridStateType.filter }, gridState: this.getCurrentGridState() });
        });
        this._sorterSubcription = this.sortService.onSortChanged.subscribe((currentSorters) => {
            this.onGridStateChanged.next({ change: { newValues: currentSorters, type: GridStateType.sorter }, gridState: this.getCurrentGridState() });
        });
    }
    /**
     * @return {?}
     */
    dispose() {
        this._filterSubcription.unsubscribe();
        this._sorterSubcription.unsubscribe();
    }
    /**
     * Get the current grid state (filters/sorters/pagination)
     * @return {?} grid state
     */
    getCurrentGridState() {
        const /** @type {?} */ gridState = {
            filters: this.getCurrentFilters(),
            sorters: this.getCurrentSorters()
        };
        const /** @type {?} */ currentPagination = this.getCurrentPagination();
        if (currentPagination) {
            gridState.pagination = currentPagination;
        }
        return gridState;
    }
    /**
     * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
     * @return {?} current filters
     */
    getCurrentFilters() {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            const /** @type {?} */ backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                return /** @type {?} */ (backendService.getCurrentFilters());
            }
        }
        else if (this.filterService && this.filterService.getCurrentLocalFilters) {
            return this.filterService.getCurrentLocalFilters();
        }
        return null;
    }
    /**
     * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
     * @return {?} current pagination state
     */
    getCurrentPagination() {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            const /** @type {?} */ backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentPagination) {
                return backendService.getCurrentPagination();
            }
        }
        else {
            // TODO implement this whenever local pagination gets implemented
        }
        return null;
    }
    /**
     * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
     * @return {?} current sorters
     */
    getCurrentSorters() {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            const /** @type {?} */ backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                return /** @type {?} */ (backendService.getCurrentSorters());
            }
        }
        else if (this.sortService && this.sortService.getCurrentLocalSorters) {
            return this.sortService.getCurrentLocalSorters();
        }
        return null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// global constants, height/width are in pixels
const DATAGRID_MIN_HEIGHT = 180;
const DATAGRID_MIN_WIDTH = 300;
const DATAGRID_BOTTOM_PADDING = 20;
const DATAGRID_PAGINATION_HEIGHT = 35;
let timer$2;
class ResizerService {
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    init(grid, gridOptions) {
        this._grid = grid;
        this._gridOptions = gridOptions;
    }
    /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @return {?}
     */
    attachAutoResizeDataGrid() {
        // if we can't find the grid to resize, return without attaching anything
        const /** @type {?} */ gridDomElm = $(`#${this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'}`);
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        this.resizeGrid();
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on('resize.grid', () => {
            // for some yet unknown reason, calling the resize twice removes any stuttering/flickering when changing the height and makes it much smoother
            this.resizeGrid();
            this.resizeGrid();
        });
    }
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    calculateGridNewDimensions(gridOptions) {
        const /** @type {?} */ gridDomElm = $(`#${gridOptions.gridId}`);
        const /** @type {?} */ containerElm = (gridOptions.autoResize && gridOptions.autoResize.containerId) ? $(`#${gridOptions.autoResize.containerId}`) : $(`#${gridOptions.gridContainerId}`);
        const /** @type {?} */ windowElm = $(window);
        if (windowElm === undefined || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        let /** @type {?} */ bottomPadding = (gridOptions.autoResize && gridOptions.autoResize.bottomPadding) ? gridOptions.autoResize.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        const /** @type {?} */ gridHeight = windowElm.height() || 0;
        const /** @type {?} */ coordOffsetTop = gridDomElm.offset();
        const /** @type {?} */ gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        const /** @type {?} */ availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        const /** @type {?} */ availableWidth = containerElm.width() || 0;
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
     * Dispose function when element is destroyed
     * @return {?}
     */
    dispose() {
        $(window).off('resize.grid');
    }
    /**
     * Resize the datagrid to fit the browser height & width
     * @param {?=} delay
     * @param {?=} newSizes
     * @return {?}
     */
    resizeGrid(delay, newSizes) {
        if (!this._grid || !this._gridOptions) {
            throw new Error(`
      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.
      You can fix this by setting your gridOption to use "enableAutoResize" or create an instance of the ResizerService by calling attachAutoResizeDataGrid()`);
        }
        // because of the javascript async nature, we might want to delay the resize a little bit
        delay = delay || 0;
        clearTimeout(timer$2);
        timer$2 = setTimeout(() => {
            // calculate new available sizes but with minimum height of 220px
            newSizes = newSizes || this.calculateGridNewDimensions(this._gridOptions);
            const /** @type {?} */ gridElm = $(`#${this._gridOptions.gridId}`) || {};
            const /** @type {?} */ gridContainerElm = $(`#${this._gridOptions.gridContainerId}`) || {};
            if (newSizes && gridElm.length > 0) {
                // apply these new height/width to the datagrid
                gridElm.height(newSizes.height);
                gridElm.width(newSizes.width);
                gridContainerElm.height(newSizes.height);
                gridContainerElm.width(newSizes.width);
                // resize the slickgrid canvas on all browser except some IE versions
                // exclude all IE below IE11
                // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
                if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && this._grid) {
                    this._grid.resizeCanvas();
                }
                // also call the grid auto-size columns so that it takes available when going bigger
                this._grid.autosizeColumns();
            }
        }, delay);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SortService {
    constructor() {
        this._currentLocalSorters = [];
        this._eventHandler = new Slick.EventHandler();
        this.onSortChanged = new Subject();
    }
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} gridOptions Grid Options object
     * @return {?}
     */
    attachBackendOnSort(grid, gridOptions) {
        this._grid = grid;
        this._gridOptions = gridOptions;
        this._slickSubscriber = grid.onSort;
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.attachBackendOnSortSubscribe.bind(this));
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    attachBackendOnSortSubscribe(event, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying to attach the "attachBackendOnSortSubscribe(event, args)" function, it seems that "args" is not populated correctly');
            }
            const /** @type {?} */ gridOptions = args.grid.getOptions() || {};
            const /** @type {?} */ backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
            if (!backendApi || !backendApi.process || !backendApi.service) {
                throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
            }
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            const /** @type {?} */ query = backendApi.service.onSortChanged(event, args);
            this.emitSortChanged('remote');
            // the process could be an Observable (like HttpClient) or a Promise
            // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
            const /** @type {?} */ observableOrPromise = backendApi.process(query);
            const /** @type {?} */ processResult = yield castToPromise(observableOrPromise);
            // from the result, call our internal post process to update the Dataset and Pagination info
            if (processResult && backendApi.internalPostProcess) {
                backendApi.internalPostProcess(processResult);
            }
            // send the response process to the postProcess callback
            if (backendApi.postProcess) {
                backendApi.postProcess(processResult);
            }
        });
    }
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} gridOptions Grid Options object
     * @param {?} dataView
     * @param {?} columnDefinitions
     * @return {?}
     */
    attachLocalOnSort(grid, gridOptions, dataView, columnDefinitions) {
        this._grid = grid;
        this._gridOptions = gridOptions;
        this._slickSubscriber = grid.onSort;
        this._slickSubscriber.subscribe((e, args) => {
            // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
            // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
            const /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            // keep current sorters
            this._currentLocalSorters = []; // reset current local sorters
            if (Array.isArray(sortColumns)) {
                sortColumns.forEach((sortColumn) => {
                    if (sortColumn.sortCol) {
                        this._currentLocalSorters.push({
                            columnId: sortColumn.sortCol.id,
                            direction: sortColumn.sortAsc ? SortDirection.ASC : SortDirection.DESC
                        });
                    }
                });
            }
            this.onLocalSortChanged(grid, gridOptions, dataView, sortColumns);
            this.emitSortChanged('local');
        });
        this._eventHandler.subscribe(dataView.onRowCountChanged, (e, args) => {
            // load any presets if there are any
            if (args.current > 0) {
                this.loadLocalPresets(grid, gridOptions, dataView, columnDefinitions);
            }
        });
    }
    /**
     * @return {?}
     */
    getCurrentLocalSorters() {
        return this._currentLocalSorters;
    }
    /**
     * load any presets if there are any
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @param {?} columnDefinitions
     * @return {?}
     */
    loadLocalPresets(grid, gridOptions, dataView, columnDefinitions) {
        const /** @type {?} */ sortCols = [];
        this._currentLocalSorters = []; // reset current local sorters
        if (gridOptions && gridOptions.presets && gridOptions.presets.sorters) {
            const /** @type {?} */ sorters = gridOptions.presets.sorters;
            columnDefinitions.forEach((columnDef) => {
                const /** @type {?} */ columnPreset = sorters.find((currentSorter) => {
                    return currentSorter.columnId === columnDef.id;
                });
                if (columnPreset) {
                    sortCols.push({
                        columnId: columnDef.id,
                        sortAsc: ((columnPreset.direction.toUpperCase() === SortDirection.ASC) ? true : false),
                        sortCol: columnDef
                    });
                    // keep current sorters
                    this._currentLocalSorters.push({
                        columnId: columnDef.id + '',
                        direction: /** @type {?} */ (columnPreset.direction.toUpperCase())
                    });
                }
            });
            if (sortCols.length > 0) {
                this.onLocalSortChanged(grid, gridOptions, dataView, sortCols);
                grid.setSortColumns(sortCols);
            }
        }
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @param {?} sortColumns
     * @return {?}
     */
    onLocalSortChanged(grid, gridOptions, dataView, sortColumns) {
        dataView.sort((dataRow1, dataRow2) => {
            for (let /** @type {?} */ i = 0, /** @type {?} */ l = sortColumns.length; i < l; i++) {
                const /** @type {?} */ columnSortObj = sortColumns[i];
                if (columnSortObj && columnSortObj.sortCol) {
                    const /** @type {?} */ sortDirection = columnSortObj.sortAsc ? 1 : -1;
                    const /** @type {?} */ sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldFilter || columnSortObj.sortCol.field;
                    const /** @type {?} */ fieldType = columnSortObj.sortCol.type || FieldType.string;
                    const /** @type {?} */ value1 = dataRow1[sortField];
                    const /** @type {?} */ value2 = dataRow2[sortField];
                    return sortByFieldType(value1, value2, fieldType, sortDirection);
                }
            }
            return 0;
        });
        grid.invalidate();
        grid.render();
    }
    /**
     * @return {?}
     */
    dispose() {
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    }
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    emitSortChanged(sender) {
        if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
            let /** @type {?} */ currentSorters = [];
            const /** @type {?} */ backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                currentSorters = /** @type {?} */ (backendService.getCurrentSorters());
            }
            this.onSortChanged.next(currentSorters);
        }
        else if (sender === 'local') {
            this.onSortChanged.next(this.getCurrentLocalSorters());
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CheckboxEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    init() {
        this.$input = $(`<input type="checkbox" value="true" class="editor-checkbox" />`);
        this.$input.appendTo(this.args.container);
        this.$input.focus();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$input.remove();
    }
    /**
     * @return {?}
     */
    focus() {
        this.$input.focus();
    }
    /**
     * @return {?}
     */
    hide() {
        this.$input.hide();
    }
    /**
     * @return {?}
     */
    show() {
        this.$input.show();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultValue = !!item[this.args.column.field];
        if (this.defaultValue) {
            this.$input.prop('checked', true);
        }
        else {
            this.$input.prop('checked', false);
        }
    }
    /**
     * @return {?}
     */
    preClick() {
        this.$input.prop('checked', !this.$input.prop('checked'));
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return this.$input.prop('checked');
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.args.column.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return (this.serializeValue() !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    validate() {
        return {
            valid: true,
            msg: null
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
require('flatpickr');
class DateEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    init() {
        const /** @type {?} */ gridOptions = /** @type {?} */ (this.args.grid.getOptions());
        this.defaultDate = this.args.item[this.args.column.field] || null;
        const /** @type {?} */ inputFormat = mapFlatpickrDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        const /** @type {?} */ outputFormat = mapFlatpickrDateFormatWithFieldType(this.args.column.outputType || FieldType.dateUtc);
        let /** @type {?} */ currentLocale = this.getCurrentLocale(this.args.column, gridOptions);
        if (currentLocale.length > 2) {
            currentLocale = currentLocale.substring(0, 2);
        }
        const /** @type {?} */ pickerOptions = {
            defaultDate: this.defaultDate,
            altInput: true,
            altFormat: inputFormat,
            dateFormat: outputFormat,
            closeOnSelect: false,
            locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
            onChange: (selectedDates, dateStr, instance) => {
                this.save();
            },
        };
        this.$input = $(`<input type="text" data-defaultDate="${this.defaultDate}" class="editor-text flatpickr" />`);
        this.$input.appendTo(this.args.container);
        this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerOptions) : null;
        this.show();
    }
    /**
     * @param {?} columnDef
     * @param {?} gridOptions
     * @return {?}
     */
    getCurrentLocale(columnDef, gridOptions) {
        const /** @type {?} */ params = gridOptions.params || columnDef.params || {};
        if (params.i18n && params.i18n instanceof TranslateService) {
            return params.i18n.currentLang;
        }
        return 'en';
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    loadFlatpickrLocale(locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        if (locale !== 'en') {
            const /** @type {?} */ localeDefault = require(`flatpickr/dist/l10n/${locale}.js`).default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    }
    /**
     * @return {?}
     */
    destroy() {
        this.hide();
        // this.flatInstance.destroy();
        this.$input.remove();
    }
    /**
     * @return {?}
     */
    show() {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        this.$input.focus();
    }
    /**
     * @return {?}
     */
    save() {
        this.args.commitChanges();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultDate = item[this.args.column.field];
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return this.$input.val();
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.args.column.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
    }
    /**
     * @return {?}
     */
    validate() {
        if (this.args.column.validator) {
            const /** @type {?} */ validationResults = this.args.column.validator(this.$input.val(), this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const defaultDecimalPlaces = 0;
class FloatEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    init() {
        this.$input = $(`<input type="text" class='editor-text' />`)
            .appendTo(this.args.container)
            .on('keydown.nav', (e) => {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        })
            .focus()
            .select();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$input.remove();
    }
    /**
     * @return {?}
     */
    focus() {
        this.$input.focus();
    }
    /**
     * @return {?}
     */
    getDecimalPlaces() {
        // returns the number of fixed decimal places or null
        let /** @type {?} */ rtn = this.args.column.editorFixedDecimalPlaces;
        if (rtn === undefined) {
            rtn = defaultDecimalPlaces;
        }
        return (!rtn && rtn !== 0 ? null : rtn);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultValue = item[this.args.column.field];
        const /** @type {?} */ decPlaces = this.getDecimalPlaces();
        if (decPlaces !== null
            && (this.defaultValue || this.defaultValue === 0)
            && this.defaultValue.toFixed) {
            this.defaultValue = this.defaultValue.toFixed(decPlaces);
        }
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$input.select();
    }
    /**
     * @return {?}
     */
    serializeValue() {
        let /** @type {?} */ rtn = parseFloat(this.$input.val()) || 0;
        const /** @type {?} */ decPlaces = this.getDecimalPlaces();
        if (decPlaces !== null
            && (rtn || rtn === 0)
            && rtn.toFixed) {
            rtn = parseFloat(rtn.toFixed(decPlaces));
        }
        return rtn;
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.args.column.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    validate() {
        if (isNaN(this.$input.val())) {
            return {
                valid: false,
                msg: 'Please enter a valid number'
            };
        }
        if (this.args.column.validator) {
            const /** @type {?} */ validationResults = this.args.column.validator(this.$input.val());
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IntegerEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    init() {
        this.$input = $(`<input type="text" class='editor-text' />`)
            .appendTo(this.args.container)
            .on('keydown.nav', (e) => {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        })
            .focus()
            .select();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$input.remove();
    }
    /**
     * @return {?}
     */
    focus() {
        this.$input.focus();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultValue = item[this.args.column.field];
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$input.select();
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return parseInt(/** @type {?} */ (this.$input.val()), 10) || 0;
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.args.column.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    validate() {
        if (isNaN(/** @type {?} */ (this.$input.val()))) {
            return {
                valid: false,
                msg: 'Please enter a valid integer'
            };
        }
        if (this.args.column.validator) {
            const /** @type {?} */ validationResults = this.args.column.validator(this.$input.val());
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LongTextEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    init() {
        const /** @type {?} */ $container = $('body');
        this.$wrapper = $(`<div class="slick-large-editor-text" />`).appendTo($container);
        this.$input = $(`<textarea hidefocus rows="5">`).appendTo(this.$wrapper);
        $(`<div class="editor-footer">
        <button class="btn btn-primary btn-xs">Save</button>
        <button class="btn btn-default btn-xs">Cancel</button>
      </div>`).appendTo(this.$wrapper);
        this.$wrapper.find('button:first').on('click', (event) => this.save());
        this.$wrapper.find('button:last').on('click', (event) => this.cancel());
        this.$input.on('keydown', this.handleKeyDown);
        this.position(this.args.position);
        this.$input.focus().select();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleKeyDown(e) {
        if (e.which === KeyCode.ENTER && e.ctrlKey) {
            this.save();
        }
        else if (e.which === KeyCode.ESCAPE) {
            e.preventDefault();
            this.cancel();
        }
        else if (e.which === KeyCode.TAB && e.shiftKey) {
            e.preventDefault();
            this.args.grid.navigatePrev();
        }
        else if (e.which === KeyCode.TAB) {
            e.preventDefault();
            this.args.grid.navigateNext();
        }
    }
    /**
     * @return {?}
     */
    save() {
        this.args.commitChanges();
    }
    /**
     * @return {?}
     */
    cancel() {
        this.$input.val(this.defaultValue);
        this.args.cancelChanges();
    }
    /**
     * @return {?}
     */
    hide() {
        this.$wrapper.hide();
    }
    /**
     * @return {?}
     */
    show() {
        this.$wrapper.show();
    }
    /**
     * @param {?} position
     * @return {?}
     */
    position(position) {
        this.$wrapper
            .css('top', (position.top || 0) - 5)
            .css('left', (position.left || 0) - 5);
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$wrapper.remove();
    }
    /**
     * @return {?}
     */
    focus() {
        this.$input.focus();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.$input.val(this.defaultValue = item[this.args.column.field]);
        this.$input.select();
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return this.$input.val();
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.args.column.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return (!(this.$input.val() === '' && this.defaultValue == null)) && (this.$input.val() !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    validate() {
        let /** @type {?} */ valid = true;
        let /** @type {?} */ msg = null;
        if (this.args.column.validator) {
            const /** @type {?} */ validationResults = this.args.column.validator(this.$input.val(), this.args);
            valid = validationResults.valid;
            msg = validationResults.msg;
        }
        return {
            valid,
            msg
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Slickgrid editor class for multiple select lists
 */
class MultipleSelectEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        /**
         * The options label/value object to use in the select list
         */
        this.collection = [];
        this.gridOptions = /** @type {?} */ (this.args.grid.getOptions());
        const /** @type {?} */ params = this.gridOptions.params || this.args.column.params || {};
        this._translate = params.i18n;
        this.defaultOptions = {
            container: 'body',
            filter: false,
            maxHeight: 200,
            addTitle: true,
            okButton: true,
            selectAllDelimiter: ['', ''],
            width: 150,
            offsetLeft: 20
        };
        if (this._translate) {
            this.defaultOptions.countSelected = this._translate.instant('X_OF_Y_SELECTED');
            this.defaultOptions.allSelected = this._translate.instant('ALL_SELECTED');
            this.defaultOptions.selectAllText = this._translate.instant('SELECT_ALL');
        }
        this.init();
    }
    /**
     * The current selected values from the collection
     * @return {?}
     */
    get currentValues() {
        return this.collection
            .filter(c => this.$editorElm.val().indexOf(c[this.valueName].toString()) !== -1)
            .map(c => c[this.valueName]);
    }
    /**
     * @return {?}
     */
    init() {
        if (!this.args) {
            throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
        }
        this.columnDef = this.args.column;
        if (!this.columnDef || !this.columnDef.params || !this.columnDef.params.collection) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" on the params property in the column definition for the MultipleSelect Editor to work correctly.
      Also each option should include a value/label pair (or value/labelKey when using Locale).
      For example: { params: { { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } } }`);
        }
        const /** @type {?} */ collectionService = new CollectionService(this._translate);
        this.enableTranslateLabel = (this.columnDef.params.enableTranslateLabel) ? this.columnDef.params.enableTranslateLabel : false;
        let /** @type {?} */ newCollection = this.columnDef.params.collection || [];
        this.labelName = (this.columnDef.params.customStructure) ? this.columnDef.params.customStructure.label : 'label';
        this.valueName = (this.columnDef.params.customStructure) ? this.columnDef.params.customStructure.value : 'value';
        // user might want to filter certain items of the collection
        if (this.gridOptions.params && this.columnDef.params.collectionFilterBy) {
            const /** @type {?} */ filterBy = this.columnDef.params.collectionFilterBy;
            newCollection = collectionService.filterCollection(newCollection, filterBy);
        }
        // user might want to sort the collection
        if (this.gridOptions.params && this.columnDef.params.collectionSortBy) {
            const /** @type {?} */ sortBy = this.columnDef.params.collectionSortBy;
            newCollection = collectionService.sortCollection(newCollection, sortBy, this.enableTranslateLabel);
        }
        const /** @type {?} */ editorTemplate = this.buildTemplateHtmlString(newCollection);
        this.createDomElement(editorTemplate);
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.args.column.field] = state;
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$editorElm.remove();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        // convert to string because that is how the DOM will return these values
        this.defaultValue = item[this.columnDef.field].map((i) => i.toString());
        this.$editorElm.find('option').each((i, $e) => {
            if (this.defaultValue.indexOf($e.value) !== -1) {
                $e.selected = true;
            }
            else {
                $e.selected = false;
            }
        });
        this.refresh();
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return this.currentValues;
    }
    /**
     * @return {?}
     */
    focus() {
        this.$editorElm.focus();
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return !arraysEqual(this.$editorElm.val(), this.defaultValue);
    }
    /**
     * @return {?}
     */
    validate() {
        if (this.args.column.validator) {
            const /** @type {?} */ validationResults = this.args.column.validator(this.currentValues, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    buildTemplateHtmlString(collection) {
        let /** @type {?} */ options = '';
        collection.forEach((option) => {
            if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
                throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example: { collection: [ { value: '1', label: 'One' } ])`);
            }
            const /** @type {?} */ labelKey = /** @type {?} */ ((option.labelKey || option[this.labelName]));
            const /** @type {?} */ textLabel = ((option.labelKey || this.enableTranslateLabel) && this._translate && typeof this._translate.instant === 'function') ? this._translate.instant(labelKey || ' ') : labelKey;
            options += `<option value="${option[this.valueName]}">${textLabel}</option>`;
        });
        return `<select class="ms-filter search-filter" multiple="multiple">${options}</select>`;
    }
    /**
     * @param {?} editorTemplate
     * @return {?}
     */
    createDomElement(editorTemplate) {
        this.$editorElm = $(editorTemplate);
        if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
            this.$editorElm.appendTo(this.args.container);
        }
        if (typeof this.$editorElm.multipleSelect !== 'function') {
            // fallback to bootstrap
            this.$editorElm.addClass('form-control');
        }
        else {
            const /** @type {?} */ elementOptions = (this.columnDef.params) ? this.columnDef.params.elementOptions : {};
            const /** @type {?} */ options = Object.assign({}, this.defaultOptions, elementOptions);
            this.$editorElm = this.$editorElm.multipleSelect(options);
            setTimeout(() => this.$editorElm.multipleSelect('open'));
        }
    }
    /**
     * @return {?}
     */
    refresh() {
        if (typeof this.$editorElm.multipleSelect === 'function') {
            this.$editorElm.multipleSelect('refresh');
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Slickgrid editor class for single select lists
 */
class SingleSelectEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        /**
         * The options label/value object to use in the select list
         */
        this.collection = [];
        this.gridOptions = /** @type {?} */ (this.args.grid.getOptions());
        const /** @type {?} */ params = this.gridOptions.params || this.args.column.params || {};
        this._translate = params.i18n;
        this.defaultOptions = {
            container: 'body',
            filter: false,
            maxHeight: 200,
            width: 150,
            offsetLeft: 20,
            single: true
        };
        this.init();
    }
    /**
     * The current selected value from the collection
     * @return {?}
     */
    get currentValue() {
        return findOrDefault(this.collection, (c) => c[this.valueName].toString() === this.$editorElm.val())[this.valueName];
    }
    /**
     * @return {?}
     */
    init() {
        if (!this.args) {
            throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
        }
        this.columnDef = this.args.column;
        if (!this.columnDef || !this.columnDef.params || !this.columnDef.params.collection) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" on the params property in the column definition for the MultipleSelect Editor to work correctly.
      Also each option should include a value/label pair (or value/labelKey when using Locale).
      For example: { params: { { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } } }`);
        }
        const /** @type {?} */ collectionService = new CollectionService(this._translate);
        this.enableTranslateLabel = (this.columnDef.params.enableTranslateLabel) ? this.columnDef.params.enableTranslateLabel : false;
        let /** @type {?} */ newCollection = this.columnDef.params.collection || [];
        this.labelName = (this.columnDef.params.customStructure) ? this.columnDef.params.customStructure.label : 'label';
        this.valueName = (this.columnDef.params.customStructure) ? this.columnDef.params.customStructure.value : 'value';
        // user might want to filter certain items of the collection
        if (this.gridOptions.params && this.columnDef.params.collectionFilterBy) {
            const /** @type {?} */ filterBy = this.columnDef.params.collectionFilterBy;
            newCollection = collectionService.filterCollection(newCollection, filterBy);
        }
        // user might want to sort the collection
        if (this.gridOptions.params && this.columnDef.params.collectionSortBy) {
            const /** @type {?} */ sortBy = this.columnDef.params.collectionSortBy;
            newCollection = collectionService.sortCollection(newCollection, sortBy, this.enableTranslateLabel);
        }
        const /** @type {?} */ editorTemplate = this.buildTemplateHtmlString(newCollection);
        this.createDomElement(editorTemplate);
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.args.column.field] = state;
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$editorElm.remove();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        // convert to string because that is how the DOM will return these values
        this.defaultValue = item[this.columnDef.field].toString();
        this.$editorElm.find('option').each((i, $e) => {
            if (this.defaultValue.indexOf($e.value) !== -1) {
                $e.selected = true;
            }
            else {
                $e.selected = false;
            }
        });
        this.refresh();
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return this.currentValue;
    }
    /**
     * @return {?}
     */
    focus() {
        this.$editorElm.focus();
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return this.$editorElm.val() !== this.defaultValue;
    }
    /**
     * @return {?}
     */
    validate() {
        if (this.args.column.validator) {
            const /** @type {?} */ validationResults = this.args.column.validator(this.currentValue, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    buildTemplateHtmlString(collection) {
        let /** @type {?} */ options = '';
        collection.forEach((option) => {
            if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
                throw new Error('A collection with value/label (or value/labelKey when using ' +
                    'Locale) is required to populate the Select list, for example: { params: { ' +
                    '{ collection: [ { value: \'1\', label: \'One\' } ] } } }');
            }
            const /** @type {?} */ labelKey = /** @type {?} */ ((option.labelKey || option[this.labelName]));
            const /** @type {?} */ textLabel = ((option.labelKey || this.enableTranslateLabel) && this._translate && typeof this._translate.instant === 'function') ? this._translate.instant(labelKey || ' ') : labelKey;
            options += `<option value="${option[this.valueName]}">${textLabel}</option>`;
        });
        return `<select class="ms-filter search-filter">${options}</select>`;
    }
    /**
     * @param {?} editorTemplate
     * @return {?}
     */
    createDomElement(editorTemplate) {
        this.$editorElm = $(editorTemplate);
        if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
            this.$editorElm.appendTo(this.args.container);
        }
        if (typeof this.$editorElm.multipleSelect !== 'function') {
            // fallback to bootstrap
            this.$editorElm.addClass('form-control');
        }
        else {
            const /** @type {?} */ elementOptions = (this.columnDef.params) ? this.columnDef.params.elementOptions : {};
            const /** @type {?} */ options = Object.assign({}, this.defaultOptions, elementOptions);
            this.$editorElm = this.$editorElm.multipleSelect(options);
            setTimeout(() => this.$editorElm.multipleSelect('open'));
        }
    }
    /**
     * @return {?}
     */
    refresh() {
        if (typeof this.$editorElm.multipleSelect === 'function') {
            this.$editorElm.multipleSelect('refresh');
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TextEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    init() {
        this.$input = $(`<input type="text" class='editor-text' />`)
            .appendTo(this.args.container)
            .on('keydown.nav', (e) => {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        })
            .focus()
            .select();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$input.remove();
    }
    /**
     * @return {?}
     */
    focus() {
        this.$input.focus();
    }
    /**
     * @return {?}
     */
    getValue() {
        return this.$input.val();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setValue(val) {
        this.$input.val(val);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultValue = item[this.args.column.field] || '';
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$input.select();
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return this.$input.val();
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.args.column.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    validate() {
        if (this.args.column.validator) {
            const /** @type {?} */ validationResults = this.args.column.validator(this.$input.val());
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const Editors = {
    checkbox: CheckboxEditor,
    date: DateEditor,
    float: FloatEditor,
    integer: IntegerEditor,
    longText: LongTextEditor,
    multipleSelect: MultipleSelectEditor,
    singleSelect: SingleSelectEditor,
    text: TextEditor
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const arrayToCsvFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value && Array.isArray(value)) {
        const /** @type {?} */ values = value.join(', ');
        return `<span title="${values}">${values}</span>`;
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const checkboxFormatter = (row, cell, value, columnDef, dataContext) => value ? '&#x2611;' : '';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const checkmarkFormatter = (row, cell, value, columnDef, dataContext) => value ? `<i class="fa fa-check checkmark-icon" aria-hidden="true"></i>` : '';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * A formatter to show the label property value of a params collection
 */
const collectionFormatter = (row, cell, value, columnDef, dataContext) => {
    if (!value || !columnDef || !columnDef.params || !columnDef.params.collection
        || !columnDef.params.collection.length) {
        return '';
    }
    const { params, params: { collection } } = columnDef;
    const /** @type {?} */ labelName = (params.customStructure) ? params.customStructure.label : 'label';
    const /** @type {?} */ valueName = (params.customStructure) ? params.customStructure.value : 'value';
    if (Array.isArray(value)) {
        return arrayToCsvFormatter(row, cell, value.map((v) => findOrDefault(collection, (c) => c[valueName] === v)[labelName]), columnDef, dataContext);
    }
    return findOrDefault(collection, (c) => c[valueName] === value)[labelName] || '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const complexObjectFormatter = (row, cell, value, columnDef, dataContext) => {
    if (!columnDef) {
        return '';
    }
    const /** @type {?} */ complexField = columnDef.field || '';
    return complexField.split('.').reduce((obj, i) => obj[i], dataContext);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$10 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$6 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
const dateIsoFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$10(value).format(FORMAT$6) : '';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$11 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$7 = mapMomentDateFormatWithFieldType(FieldType.dateTimeIso);
const dateTimeIsoFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$11(value).format(FORMAT$7) : '';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$12 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$8 = mapMomentDateFormatWithFieldType(FieldType.dateTimeIsoAmPm);
const dateTimeIsoAmPmFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$12(value).format(FORMAT$8) : '';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$13 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$9 = mapMomentDateFormatWithFieldType(FieldType.dateTimeUsAmPm);
const dateTimeUsAmPmFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$13(value).format(FORMAT$9) : '';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$14 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$10 = mapMomentDateFormatWithFieldType(FieldType.dateTimeUs);
const dateTimeUsFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$14(value).format(FORMAT$10) : '';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$15 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$11 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
const dateUsFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$15(value).format(FORMAT$11) : '';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const deleteIconFormatter = (row, cell, value, columnDef, dataContext) => `<i class="fa fa-trash pointer delete-icon" aria-hidden="true"></i>`;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const editIconFormatter = (row, cell, value, columnDef, dataContext) => `<i class="fa fa-pencil pointer edit-icon" aria-hidden="true"></i>`;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const hyperlinkFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value && typeof value === 'string') {
        const /** @type {?} */ matchUrl = value.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i);
        if (matchUrl && Array.isArray(matchUrl)) {
            return `<a href="${matchUrl[0]}">' + value + '</a>`;
        }
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"
 */
const hyperlinkUriPrefixFormatter = (row, cell, value, columnDef, dataContext) => {
    let /** @type {?} */ uriPrefix = (columnDef && columnDef.params && columnDef.params.uriPrefix) ? columnDef.params.uriPrefix : '';
    if (!uriPrefix) {
        throw new Error(`HyperlinkUriPrefix Formatter require a "uriPrefix" that can be passed through params. e.g.:: formatter: Formatters.hyperlinkUriPrefix, params: { uriPrefix: '/users/' }`);
    }
    if (value && uriPrefix && typeof uriPrefix === 'string' && !uriPrefix.includes('<script>')) {
        uriPrefix += value;
        return '<a href="' + uriPrefix + '">' + value + '</a>';
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const infoIconFormatter = (row, cell, value, columnDef, dataContext) => `<i class="fa fa-info-circle pointer info-icon" aria-hidden="true"></i>`;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const lowercaseFormatter = (row, cell, value, columnDef, dataContext) => {
    // make sure the value is a string
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? value.toLowerCase() : '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const multipleFormatter = (row, cell, value, columnDef, dataContext, grid) => {
    const /** @type {?} */ params = columnDef.params || {};
    if (!params.formatters || !Array.isArray(params.formatters)) {
        throw new Error(`The multiple formatter requires the "formatters" to be provided as a column params.
    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }`);
    }
    const /** @type {?} */ formatters = params.formatters;
    // loop through all Formatters, the value of 1st formatter will be used by 2nd formatter and so on.
    // they are piped and executed in sequences
    let /** @type {?} */ currentValue = value;
    for (const /** @type {?} */ formatter of formatters) {
        currentValue = formatter(row, cell, currentValue, columnDef, dataContext, grid);
    }
    return currentValue;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Takes a cell value and translates it with the "ngx-translate" service
 */
const translateFormatter = (row, cell, value, columnDef, dataContext, grid) => {
    const /** @type {?} */ gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
    const /** @type {?} */ columnParams = columnDef.params || {};
    const /** @type {?} */ gridParams = gridOptions.params || {};
    const /** @type {?} */ translate = gridParams.i18n || columnParams.i18n;
    if (!translate || typeof translate.instant !== 'function') {
        throw new Error(`The translate formatter requires the "ngx-translate" Service to be provided as a Grid Options or Column Definition "params".
    For example: this.gridOptions = { enableTranslate: true, params: { i18n: this.translate }}`);
    }
    // make sure the value is a string (for example a boolean value would throw an error)
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? translate.instant(value) : '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Takes a boolean value, cast it to upperCase string and finally translates it with the "ngx-translate" service
 */
const translateBooleanFormatter = (row, cell, value, columnDef, dataContext, grid) => {
    const /** @type {?} */ gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
    const /** @type {?} */ columnParams = columnDef.params || {};
    const /** @type {?} */ gridParams = gridOptions.params || {};
    const /** @type {?} */ translate = gridParams.i18n || columnParams.i18n;
    if (!translate || typeof translate.instant !== 'function') {
        throw new Error(`The translate formatter requires the "ngx-translate" Service to be provided as a Grid Options or Column Definition "params".
    For example: this.gridOptions = { enableTranslate: true, params: { i18n: this.translate }}`);
    }
    // make sure the value is a string (for example a boolean value would throw an error)
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? translate.instant(/** @type {?} */ (value.toUpperCase())) : '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const uppercaseFormatter = (row, cell, value, columnDef, dataContext) => {
    // make sure the value is a string
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? value.toUpperCase() : '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const yesNoFormatter = (row, cell, value, columnDef, dataContext) => value ? 'Yes' : 'No';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provides a list of different Formatters that will change the cell value displayed in the UI
 */
const Formatters = {
    /** Takes an array of string and converts it to a comma delimited string */
    arrayToCsv: arrayToCsvFormatter,
    /** When value is filled (true), it will display a checkbox Unicode icon */
    checkbox: checkboxFormatter,
    /** When value is filled (true), it will display a Font-Awesome icon (fa-check) */
    checkmark: checkmarkFormatter,
    /** Takes a complex data object and return the data under that property (for example: "user.firstName" will return the first name "John") */
    complexObject: complexObjectFormatter,
    /**
       * Looks up values from the columnDefinition.params.collection property and displays the label in CSV or string format
       * @example
       * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
       * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
       * const dataset = [{ value: 1 },{ value: 2 }];
       */
    collection: collectionFormatter,
    /** Takes a Date object and displays it as an ISO Date format */
    dateIso: dateIsoFormatter,
    /** Takes a Date object and displays it as an ISO Date+Time format */
    dateTimeIso: dateTimeIsoFormatter,
    /** Takes a Date object and displays it as an ISO Date+Time+(am/pm) format */
    dateTimeIsoAmPm: dateTimeIsoAmPmFormatter,
    /** Takes a Date object and displays it as an US Date format */
    dateUs: dateUsFormatter,
    /** Takes a Date object and displays it as an US Date+Time format */
    dateTimeUs: dateTimeUsFormatter,
    /** Takes a Date object and displays it as an US Date+Time+(am/pm) format */
    dateTimeUsAmPm: dateTimeUsAmPmFormatter,
    /** Displays a Font-Awesome delete icon (fa-trash) */
    deleteIcon: deleteIconFormatter,
    /** Displays a Font-Awesome edit icon (fa-pencil) */
    editIcon: editIconFormatter,
    /** Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https). The structure will be "<a href="hyperlink">hyperlink</a>" */
    hyperlink: hyperlinkFormatter,
    /** Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"  */
    hyperlinkUriPrefix: hyperlinkUriPrefixFormatter,
    /** Displays a Font-Awesome edit icon (fa-info-circle) */
    infoIcon: infoIconFormatter,
    /** Takes a value and displays it all lowercase */
    lowercase: lowercaseFormatter,
    /**
       * You can pipe multiple formatters (executed in sequence), use params to pass the list of formatters. For example::
       * { field: 'title', formatter: Formatters.multiple, params: { formatters: [ Formatters.lowercase, Formatters.uppercase ] }
       */
    multiple: multipleFormatter,
    /** Takes a cell value number (between 0-100) and displays a red (<50) or green (>=50) bar */
    percentComplete: percentCompleteFormatter,
    /** Takes a cell value number (between 0-100) and displays Bootstrap "percent-complete-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
    percentCompleteBar: percentCompleteBarFormatter,
    /** Takes a cell value number (between 0-100) and displays Bootstrap "progress-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
    progressBar: progressBarFormatter,
    /** Takes a cell value and translates it (i18n). Requires an instance of the Translate Service:: `params: { i18n: this.translate } */
    translate: translateFormatter,
    /** Takes a boolean value, cast it to upperCase string and finally translates it (i18n). */
    translateBoolean: translateBooleanFormatter,
    /** Takes a value and displays it all uppercase */
    uppercase: uppercaseFormatter,
    /** Takes a boolean value and display a string 'Yes' or 'No' */
    yesNo: yesNoFormatter
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlickPaginationComponent {
    /**
     * Constructor
     * @param {?} filterService
     * @param {?} sortService
     */
    constructor(filterService, sortService) {
        this.filterService = filterService;
        this.sortService = sortService;
        this._isFirstRender = true;
        this.onPaginationChanged = new EventEmitter();
        this.dataFrom = 1;
        this.dataTo = 1;
        this.pageCount = 0;
        this.pageNumber = 1;
        this.totalItems = 0;
        this.paginationPageSizes = [25, 75, 100];
        this.fromToParams = { from: this.dataFrom, to: this.dataTo, totalItems: this.totalItems };
    }
    /**
     * @param {?} gridPaginationOptions
     * @return {?}
     */
    set gridPaginationOptions(gridPaginationOptions) {
        this._gridPaginationOptions = gridPaginationOptions;
        if (this._isFirstRender || !gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
            this._isFirstRender = false;
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
    ngOnDestroy() {
        this.dispose();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._gridPaginationOptions = this._gridPaginationOptions;
        if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
        }
        // Subscribe to Event Emitter of Filter & Sort changed, go back to page 1 when that happen
        this._filterSubcription = this.filterService.onFilterChanged.subscribe((data) => {
            this.refreshPagination(true);
        });
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
     * @param {?} event
     * @return {?}
     */
    changeToCurrentPage(event) {
        this.pageNumber = event.currentTarget.value;
        if (this.pageNumber < 1) {
            this.pageNumber = 1;
        }
        else if (this.pageNumber > this.pageCount) {
            this.pageNumber = this.pageCount;
        }
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @return {?}
     */
    dispose() {
        this.onPaginationChanged.unsubscribe();
        if (this._filterSubcription) {
            this._filterSubcription.unsubscribe();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChangeItemPerPage(event) {
        const /** @type {?} */ itemsPerPage = +event.target.value;
        this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
        this.pageNumber = 1;
        this.itemsPerPage = itemsPerPage;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?=} isPageNumberReset
     * @return {?}
     */
    refreshPagination(isPageNumberReset = false) {
        const /** @type {?} */ backendApi = this._gridPaginationOptions.backendServiceApi || this._gridPaginationOptions.onBackendEventApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
            const /** @type {?} */ pagination = this._gridPaginationOptions.pagination;
            // set the number of items per page if not already set
            if (!this.itemsPerPage) {
                this.itemsPerPage = +((backendApi && backendApi.options && backendApi.options.paginationOptions && backendApi.options.paginationOptions.first) ? backendApi.options.paginationOptions.first : this._gridPaginationOptions.pagination.pageSize);
            }
            // if totalItems changed, we should always go back to the first page and recalculation the From-To indexes
            if (isPageNumberReset || this.totalItems !== pagination.totalItems) {
                if (this._isFirstRender && pagination.pageNumber && pagination.pageNumber > 1) {
                    this.pageNumber = pagination.pageNumber || 1;
                }
                else {
                    this.pageNumber = 1;
                }
                // when page number is set to 1 then also reset the "offset" of backend service
                if (this.pageNumber === 1) {
                    backendApi.service.resetPaginationOptions();
                }
            }
            // calculate and refresh the multiple properties of the pagination UI
            this.paginationPageSizes = this._gridPaginationOptions.pagination.pageSizes;
            this.totalItems = this._gridPaginationOptions.pagination.totalItems;
            this.recalculateFromToIndexes();
        }
        this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    }
    /**
     * @param {?} event
     * @param {?} pageNumber
     * @return {?}
     */
    onPageChanged(event, pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            this.recalculateFromToIndexes();
            const /** @type {?} */ backendApi = this._gridPaginationOptions.backendServiceApi || this._gridPaginationOptions.onBackendEventApi;
            if (!backendApi || !backendApi.service || !backendApi.process) {
                throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
            }
            if (this.dataTo > this.totalItems) {
                this.dataTo = this.totalItems;
            }
            else if (this.totalItems < this.itemsPerPage) {
                this.dataTo = this.totalItems;
            }
            if (backendApi) {
                const /** @type {?} */ itemsPerPage = +this.itemsPerPage;
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                const /** @type {?} */ query = backendApi.service.onPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                // the process could be an Observable (like HttpClient) or a Promise
                // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                const /** @type {?} */ observableOrPromise = backendApi.process(query);
                const /** @type {?} */ processResult = yield castToPromise(observableOrPromise);
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi.postProcess) {
                    backendApi.postProcess(processResult);
                }
            }
            else {
                throw new Error('Pagination with a backend service requires "BackendServiceApi" to be defined in your grid options');
            }
            // emit the changes to the parent component
            this.onPaginationChanged.emit({
                pageNumber: this.pageNumber,
                pageSizes: this.paginationPageSizes,
                pageSize: this.itemsPerPage,
                totalItems: this.totalItems
            });
        });
    }
    /**
     * @return {?}
     */
    recalculateFromToIndexes() {
        this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
        this.dataTo = (this.totalItems < this.itemsPerPage) ? this.totalItems : (this.pageNumber * this.itemsPerPage);
    }
}
SlickPaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'slick-pagination',
                template: `<div class="slick-pagination">
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
            <span [translate]="'PAGE'"></span>
            <input type="text" class="form-control" value="{{pageNumber}}" size="1"  (change)="changeToCurrentPage($event)">
            <span [translate]="'OF'"></span><span> {{pageCount}}</span>
        </div>
        <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item" [ngClass]="pageNumber === pageCount ? 'disabled' : ''">
            <a class="page-link icon-seek-next text-center fa fa-lg fa-angle-right" aria-label="Next" (click)="changeToNextPage($event)">
            </a>
            </li>
            <li class="page-item" [ngClass]="pageNumber === pageCount ? 'disabled' : ''">
            <a class="page-link icon-seek-end fa fa-lg fa-angle-double-right" aria-label="Last" (click)="changeToLastPage($event)">
            </a>
            </li>
        </ul>
        </nav>
    </div>
    <span class="slick-pagination-settings">
        <select id="items-per-page-label" [value]="itemsPerPage" (change)="onChangeItemPerPage($event)">
        <option value="{{pageSize}}" *ngFor="let pageSize of paginationPageSizes;">{{pageSize}}</option>
        </select>
        <span [translate]="'ITEMS_PER_PAGE'"></span>,
        <span class="slick-pagination-count">
            <span [translate]="'FROM_TO_OF_TOTAL_ITEMS'" [translateParams]="{ from: dataFrom, to: dataTo, totalItems: totalItems }"></span>
        </span>
    </span>
    </div>
`
            },] },
    { type: Injectable },
];
/** @nocollapse */
SlickPaginationComponent.ctorParameters = () => [
    { type: FilterService, },
    { type: SortService, },
];
SlickPaginationComponent.propDecorators = {
    "onPaginationChanged": [{ type: Output },],
    "gridPaginationOptions": [{ type: Input },],
    "grid": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
    cellHighlightCssClass: 'slick-cell-modified',
    checkboxSelector: {
        cssClass: 'slick-cell-checkboxsel'
    },
    columnPicker: {
        hideForceFitButton: false,
        hideSyncResizeButton: true
    },
    datasetIdPropertyName: 'id',
    defaultFilterPlaceholder: '&#128269;',
    defaultFilterType: FilterType.input,
    editable: false,
    enableAutoResize: true,
    enableCellNavigation: false,
    enableColumnPicker: true,
    enableColumnReorder: true,
    enableExport: true,
    enableGridMenu: true,
    enableMouseHoverHighlightRow: true,
    enableSorting: true,
    enableTextSelectionOnCells: true,
    explicitInitialization: true,
    exportWithFormatter: false,
    forceFitColumns: false,
    gridMenu: {
        hideForceFitButton: false,
        hideSyncResizeButton: true,
        iconCssClass: 'fa fa-bars',
        menuWidth: 16,
        resizeOnShowHeaderRow: false,
        showClearAllFiltersCommand: true,
        showExportCsvCommand: true,
        showRefreshDatasetCommand: true,
        showToggleFilterCommand: true
    },
    headerRowHeight: 35,
    multiColumnSort: true,
    pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: 25,
        totalItems: 0
    },
    rowHeight: 35,
    showHeaderRow: false,
    topPanelHeight: 35
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularSlickgridComponent {
    /**
     * @param {?} controlAndPluginService
     * @param {?} exportService
     * @param {?} filterService
     * @param {?} gridExtraService
     * @param {?} gridEventService
     * @param {?} gridStateService
     * @param {?} resizer
     * @param {?} sharedService
     * @param {?} sortService
     * @param {?} translate
     * @param {?} forRootConfig
     */
    constructor(controlAndPluginService, exportService, filterService, gridExtraService, gridEventService, gridStateService, resizer, sharedService, sortService, translate, forRootConfig) {
        this.controlAndPluginService = controlAndPluginService;
        this.exportService = exportService;
        this.filterService = filterService;
        this.gridExtraService = gridExtraService;
        this.gridEventService = gridEventService;
        this.gridStateService = gridStateService;
        this.resizer = resizer;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this.forRootConfig = forRootConfig;
        this._eventHandler = new Slick.EventHandler();
        this.groupingDefinition = {};
        this.showPagination = false;
        this.isGridInitialized = false;
        this.onDataviewCreated = new EventEmitter();
        this.onGridCreated = new EventEmitter();
        this.onGridInitialized = new EventEmitter();
        this.onBeforeGridCreate = new EventEmitter();
        this.onBeforeGridDestroy = new EventEmitter();
        this.onAfterGridDestroyed = new EventEmitter();
        this.onGridStateServiceChanged = new EventEmitter();
        this.gridHeight = 100;
        this.gridWidth = 600;
    }
    /**
     * @param {?} columnDefinitions
     * @return {?}
     */
    set columnDefinitions(columnDefinitions) {
        this._columnDefinitions = columnDefinitions;
        if (this.isGridInitialized) {
            this.updateColumnDefinitionsList(columnDefinitions);
        }
    }
    /**
     * @return {?}
     */
    get columnDefinitions() {
        return this._columnDefinitions;
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
        this.onBeforeGridCreate.emit(true);
        this.gridHeightString = `${this.gridHeight}px`;
        this.gridWidthString = `${this.gridWidth}px`;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.onBeforeGridDestroy.emit(this.grid);
        this.destroy();
        this.onAfterGridDestroyed.emit(true);
    }
    /**
     * @return {?}
     */
    destroy() {
        this._dataView = [];
        this.gridOptions = {};
        this._eventHandler.unsubscribeAll();
        this.controlAndPluginService.dispose();
        this.filterService.dispose();
        this.gridEventService.dispose();
        this.gridStateService.dispose();
        this.resizer.dispose();
        this.sortService.dispose();
        this.grid.destroy();
        if (this._translateSubscriber) {
            this._translateSubscriber.unsubscribe();
        }
        if (this._gridStateSubscriber) {
            this._gridStateSubscriber.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initialization();
        this.isGridInitialized = true;
    }
    /**
     * @return {?}
     */
    initialization() {
        // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
        this._dataset = this._dataset || [];
        this.gridOptions = this.mergeGridOptions(this.gridOptions);
        this.createBackendApiInternalPostProcessCallback(this.gridOptions);
        if (this.gridOptions.enableGrouping) {
            this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
            this.sharedService.groupItemMetadataProvider = this.groupItemMetadataProvider;
            this._dataView = new Slick.Data.DataView({
                groupItemMetadataProvider: this.groupItemMetadataProvider,
                inlineFilters: true
            });
        }
        else {
            this._dataView = new Slick.Data.DataView();
        }
        this.controlAndPluginService.createPluginBeforeGridCreation(this._columnDefinitions, this.gridOptions);
        this.grid = new Slick.Grid(`#${this.gridId}`, this._dataView, this._columnDefinitions, this.gridOptions);
        // pass all necessary options to the shared service
        this.sharedService.init(this.grid, this._dataView, this.gridOptions, this._columnDefinitions);
        this.controlAndPluginService.attachDifferentControlOrPlugins();
        this.attachDifferentHooks(this.grid, this.gridOptions, this._dataView);
        // emit the Grid & DataView object to make them available in parent component
        this.onGridCreated.emit(this.grid);
        this.onDataviewCreated.emit(this._dataView);
        this.grid.init();
        this._dataView.beginUpdate();
        this._dataView.setItems(this._dataset, this.gridOptions.datasetIdPropertyName);
        this._dataView.endUpdate();
        // attach resize ONLY after the dataView is ready
        this.attachResizeHook(this.grid, this.gridOptions);
        // attach grid extra service
        this.gridExtraService.init(this.grid, this._columnDefinitions, this.gridOptions, this._dataView);
        // when user enables translation, we need to translate Headers on first pass & subsequently in the attachDifferentHooks
        if (this.gridOptions.enableTranslate) {
            this.controlAndPluginService.translateHeaders();
        }
        // if Export is enabled, initialize the service with the necessary grid and other objects
        if (this.gridOptions.enableExport) {
            this.exportService.init(this.grid, this.gridOptions, this._dataView);
        }
        // once all hooks are in placed and the grid is initialized, we can emit an event
        this.onGridInitialized.emit(this.grid);
        // attach the Backend Service API callback functions only after the grid is initialized
        // because the preProcess() and onInit() might get triggered
        if (this.gridOptions && (this.gridOptions.backendServiceApi || this.gridOptions.onBackendEventApi)) {
            this.attachBackendCallbackFunctions(this.gridOptions);
        }
        this.gridStateService.init(this.grid, this.filterService, this.sortService);
    }
    /**
     * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service only feautre and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     * @param {?} gridOptions
     * @return {?}
     */
    createBackendApiInternalPostProcessCallback(gridOptions) {
        if (gridOptions && (gridOptions.backendServiceApi || gridOptions.onBackendEventApi)) {
            const /** @type {?} */ backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
            // internalPostProcess only works with a GraphQL Service, so make sure it is that type
            if (backendApi && backendApi.service && backendApi.service instanceof GraphqlService) {
                backendApi.internalPostProcess = (processResult) => {
                    const /** @type {?} */ datasetName = (backendApi && backendApi.service && typeof backendApi.service.getDatasetName === 'function') ? backendApi.service.getDatasetName() : '';
                    if (processResult && processResult.data && processResult.data[datasetName]) {
                        this._dataset = processResult.data[datasetName].nodes;
                        this.refreshGridData(this._dataset, processResult.data[datasetName].totalCount);
                    }
                    else {
                        this._dataset = [];
                    }
                };
            }
        }
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    attachDifferentHooks(grid, gridOptions, dataView) {
        // on locale change, we have to manually translate the Headers, GridMenu
        this._translateSubscriber = this.translate.onLangChange.subscribe((event) => {
            if (gridOptions.enableTranslate) {
                this.controlAndPluginService.translateHeaders();
                this.controlAndPluginService.translateColumnPicker();
                this.controlAndPluginService.translateGridMenu();
            }
        });
        // attach external sorting (backend) when available or default onSort (dataView)
        if (gridOptions.enableSorting) {
            (gridOptions.backendServiceApi || gridOptions.onBackendEventApi) ? this.sortService.attachBackendOnSort(grid, gridOptions) : this.sortService.attachLocalOnSort(grid, gridOptions, this._dataView, this._columnDefinitions);
        }
        // attach external filter (backend) when available or default onFilter (dataView)
        if (gridOptions.enableFiltering) {
            this.filterService.init(grid, gridOptions, this._columnDefinitions);
            // if user entered some "presets", we need to reflect them all in the DOM
            if (gridOptions.presets && gridOptions.presets.filters) {
                this.filterService.populateColumnFilterSearchTerms(gridOptions, this._columnDefinitions);
            }
            (gridOptions.backendServiceApi || gridOptions.onBackendEventApi) ? this.filterService.attachBackendOnFilter(grid, gridOptions) : this.filterService.attachLocalOnFilter(grid, gridOptions, this._dataView);
        }
        // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
        if (gridOptions.backendServiceApi || gridOptions.onBackendEventApi) {
            const /** @type {?} */ backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
            if (gridOptions.onBackendEventApi) {
                console.warn(`"onBackendEventApi" has been DEPRECATED, please consider using "backendServiceApi" in the short term since "onBackendEventApi" will be removed in future versions. You can take look at the Angular-Slickgrid Wikis for OData/GraphQL Services implementation`);
            }
            if (backendApi && backendApi.service && backendApi.service.init) {
                backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
            }
        }
        // expose GridState Service changes event through dispatch
        this._gridStateSubscriber = this.gridStateService.onGridStateChanged.subscribe((gridStateChange) => {
            this.onGridStateServiceChanged.emit(gridStateChange);
        });
        // on cell click, mainly used with the columnDef.action callback
        this.gridEventService.attachOnCellChange(grid, this.gridOptions, dataView);
        this.gridEventService.attachOnClick(grid, this.gridOptions, dataView);
        this._eventHandler.subscribe(dataView.onRowCountChanged, (e, args) => {
            grid.updateRowCount();
            grid.render();
        });
        this._eventHandler.subscribe(dataView.onRowsChanged, (e, args) => {
            grid.invalidateRows(args.rows);
            grid.render();
        });
    }
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    attachBackendCallbackFunctions(gridOptions) {
        const /** @type {?} */ backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
        const /** @type {?} */ serviceOptions = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
        const /** @type {?} */ isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
        // update backend filters (if need be) before the query runs
        if (backendApi) {
            const /** @type {?} */ backendService = backendApi.service;
            if (gridOptions && gridOptions.presets) {
                if (backendService && backendService.updateFilters && gridOptions.presets.filters) {
                    backendService.updateFilters(gridOptions.presets.filters, true);
                }
                if (backendService && backendService.updateSorters && gridOptions.presets.sorters) {
                    backendService.updateSorters(undefined, gridOptions.presets.sorters);
                }
                if (backendService && backendService.updatePagination && gridOptions.presets.pagination) {
                    backendService.updatePagination(gridOptions.presets.pagination.pageNumber, gridOptions.presets.pagination.pageSize);
                }
            }
            else {
                const /** @type {?} */ columnFilters = this.filterService.getColumnFilters();
                if (columnFilters && backendService && backendService.updateFilters) {
                    backendService.updateFilters(columnFilters, false);
                }
            }
        }
        if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
            const /** @type {?} */ query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
            const /** @type {?} */ observableOrPromise = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);
            // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                // the process could be an Observable (like HttpClient) or a Promise
                // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                const /** @type {?} */ processResult = yield castToPromise(observableOrPromise);
                // define what our internal Post Process callback, only available for GraphQL Service for now
                // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
                if (processResult && backendApi && backendApi.service instanceof GraphqlService && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi.postProcess) {
                    backendApi.postProcess(processResult);
                }
            }));
        }
    }
    /**
     * @param {?} grid
     * @param {?} options
     * @return {?}
     */
    attachResizeHook(grid, options) {
        // expand/autofit columns on first page load
        if (grid && options.autoFitColumnsOnFirstLoad) {
            grid.autosizeColumns();
        }
        // auto-resize grid on browser resize
        this.resizer.init(grid, options);
        if (options.enableAutoResize) {
            this.resizer.attachAutoResizeDataGrid();
            if (grid && options.autoFitColumnsOnFirstLoad) {
                grid.autosizeColumns();
            }
        }
        else {
            this.resizer.resizeGrid(0, { height: this.gridHeight, width: this.gridWidth });
        }
    }
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    mergeGridOptions(gridOptions) {
        gridOptions.gridId = this.gridId;
        gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;
        if (gridOptions.enableFiltering || this.forRootConfig.enableFiltering) {
            gridOptions.showHeaderRow = true;
        }
        // use jquery extend to deep merge and avoid immutable properties changed in GlobalGridOptions after route change
        return $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);
    }
    /**
     * @param {?} pagination
     * @return {?}
     */
    paginationChanged(pagination) {
        this.gridStateService.onGridStateChanged.next({
            change: { newValues: pagination, type: GridStateType.pagination },
            gridState: this.gridStateService.getCurrentGridState()
        });
    }
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param {?} dataset
     * @param {?=} totalCount
     * @return {?}
     */
    refreshGridData(dataset, totalCount) {
        if (dataset && this.grid && this._dataView && typeof this._dataView.setItems === 'function') {
            this._dataView.setItems(dataset, this.gridOptions.datasetIdPropertyName);
            // this.grid.setData(dataset);
            this.grid.invalidate();
            this.grid.render();
            if (this.gridOptions.enablePagination || this.gridOptions.backendServiceApi) {
                // do we want to show pagination?
                // if we have a backendServiceApi and the enablePagination is undefined, we'll assume that we do want to see it, else get that defined value
                this.showPagination = ((this.gridOptions.backendServiceApi && this.gridOptions.enablePagination === undefined) ? true : this.gridOptions.enablePagination) || false;
                // before merging the grid options, make sure that it has the totalItems count
                // once we have that, we can merge and pass all these options to the pagination component
                if (!this.gridOptions.pagination) {
                    this.gridOptions.pagination = (this.gridOptions.pagination) ? this.gridOptions.pagination : undefined;
                }
                if (this.gridOptions.pagination && totalCount) {
                    this.gridOptions.pagination.totalItems = totalCount;
                }
                if (this.gridOptions.presets && this.gridOptions.presets.pagination && this.gridOptions.pagination) {
                    this.gridOptions.pagination.pageSize = this.gridOptions.presets.pagination.pageSize;
                    this.gridOptions.pagination.pageNumber = this.gridOptions.presets.pagination.pageNumber;
                }
                this.gridPaginationOptions = this.mergeGridOptions(this.gridOptions);
            }
            if (this.grid && this.gridOptions.enableAutoResize) {
                // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
                this.resizer.resizeGrid(10);
                // this.grid.autosizeColumns();
            }
        }
    }
    /**
     * @param {?} dynamicColumns
     * @return {?}
     */
    updateColumnDefinitionsList(dynamicColumns) {
        this.grid.setColumns(dynamicColumns);
        if (this.gridOptions.enableTranslate) {
            this.controlAndPluginService.translateHeaders();
        }
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
}
AngularSlickgridComponent.decorators = [
    { type: Injectable },
    { type: Component, args: [{
                selector: 'angular-slickgrid',
                template: `<div id="slickGridContainer-{{gridId}}" class="gridPane">
    <div attr.id='{{gridId}}' class="slickgrid-container" [style.height]="gridHeightString" [style.width]="gridWidthString">
    </div>
    <slick-pagination id="slickPagingContainer-{{gridId}}"
        *ngIf="showPagination"
        (onPaginationChanged)="paginationChanged($event)"
        [gridPaginationOptions]="gridPaginationOptions">
    </slick-pagination>
</div>
`
            },] },
];
/** @nocollapse */
AngularSlickgridComponent.ctorParameters = () => [
    { type: ControlAndPluginService, },
    { type: ExportService, },
    { type: FilterService, },
    { type: GridExtraService, },
    { type: GridEventService, },
    { type: GridStateService, },
    { type: ResizerService, },
    { type: SharedService, },
    { type: SortService, },
    { type: TranslateService, },
    { type: undefined, decorators: [{ type: Inject, args: ['config',] },] },
];
AngularSlickgridComponent.propDecorators = {
    "onDataviewCreated": [{ type: Output },],
    "onGridCreated": [{ type: Output },],
    "onGridInitialized": [{ type: Output },],
    "onBeforeGridCreate": [{ type: Output },],
    "onBeforeGridDestroy": [{ type: Output },],
    "onAfterGridDestroyed": [{ type: Output },],
    "onGridStateServiceChanged": [{ type: Output },],
    "gridId": [{ type: Input },],
    "gridOptions": [{ type: Input },],
    "gridHeight": [{ type: Input },],
    "gridWidth": [{ type: Input },],
    "columnDefinitions": [{ type: Input },],
    "dataset": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularSlickgridModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: AngularSlickgridModule,
            providers: [
                { provide: 'config', useValue: config },
                CollectionService,
                ControlAndPluginService,
                ExportService,
                FilterService,
                GraphqlService,
                GridEventService,
                GridExtraService,
                GridOdataService,
                GridStateService,
                OdataService,
                ResizerService,
                SharedService,
                SortService
            ]
        };
    }
}
AngularSlickgridModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    TranslateModule
                ],
                declarations: [
                    AngularSlickgridComponent,
                    SlickPaginationComponent
                ],
                exports: [
                    AngularSlickgridComponent,
                    SlickPaginationComponent
                ]
            },] },
];
/** @nocollapse */
AngularSlickgridModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Public classes.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { SlickPaginationComponent, AngularSlickgridComponent, AngularSlickgridModule, CaseType, DelimiterType, FieldType, FileType, FilterType, FormElementType, GridStateType, KeyCode, OperatorType, SortDirection, CollectionService, ControlAndPluginService, ExportService, FilterService, GraphqlService, GridOdataService, GridEventService, GridExtraService, GridExtraUtils, GridStateService, OdataService, ResizerService, SortService, addWhiteSpaces, htmlEntityDecode, htmlEntityEncode, arraysEqual, castToPromise, findOrDefault, mapMomentDateFormatWithFieldType, mapFlatpickrDateFormatWithFieldType, mapOperatorType, mapOperatorByFieldType, mapOperatorByFilterType, parseUtcDate, toCamelCase, toKebabCase, Editors, FilterConditions, Filters, Formatters, Sorters, CheckboxEditor as ɵb, DateEditor as ɵc, FloatEditor as ɵd, IntegerEditor as ɵe, LongTextEditor as ɵf, MultipleSelectEditor as ɵg, SingleSelectEditor as ɵh, TextEditor as ɵi, booleanFilterCondition as ɵk, collectionSearchFilterCondition as ɵl, dateFilterCondition as ɵm, dateIsoFilterCondition as ɵn, dateUsFilterCondition as ɵp, dateUsShortFilterCondition as ɵq, dateUtcFilterCondition as ɵo, executeMappedCondition as ɵj, testFilterCondition as ɵt, numberFilterCondition as ɵr, stringFilterCondition as ɵs, CompoundDateFilter as ɵy, CompoundInputFilter as ɵz, InputFilter as ɵu, MultipleSelectFilter as ɵv, SelectFilter as ɵx, SingleSelectFilter as ɵw, arrayToCsvFormatter as ɵba, checkboxFormatter as ɵbb, checkmarkFormatter as ɵbc, collectionFormatter as ɵbe, complexObjectFormatter as ɵbd, dateIsoFormatter as ɵbf, dateTimeIsoAmPmFormatter as ɵbh, dateTimeIsoFormatter as ɵbg, dateTimeUsAmPmFormatter as ɵbk, dateTimeUsFormatter as ɵbj, dateUsFormatter as ɵbi, deleteIconFormatter as ɵbl, editIconFormatter as ɵbm, hyperlinkFormatter as ɵbn, hyperlinkUriPrefixFormatter as ɵbo, infoIconFormatter as ɵbp, lowercaseFormatter as ɵbq, multipleFormatter as ɵbr, percentCompleteBarFormatter as ɵbt, percentCompleteFormatter as ɵbs, progressBarFormatter as ɵbu, translateBooleanFormatter as ɵbw, translateFormatter as ɵbv, uppercaseFormatter as ɵbx, yesNoFormatter as ɵby, SharedService as ɵa, dateIsoSorter as ɵca, dateSorter as ɵbz, dateUsShortSorter as ɵcc, dateUsSorter as ɵcb, numericSorter as ɵcd, stringSorter as ɵce };
//# sourceMappingURL=angular-slickgrid.js.map
