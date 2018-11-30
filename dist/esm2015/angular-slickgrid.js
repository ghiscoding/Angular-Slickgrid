import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import * as moment_ from 'moment-mini';
import { Injectable, Component, EventEmitter, Input, Output, ElementRef, Inject, NgModule } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { TextEncoder } from 'text-encoding-utf-8';
import { __awaiter } from 'tslib';
import * as DOMPurify_ from 'dompurify';
import * as isequal_ from 'lodash.isequal';
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';
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
/** @enum {string} */
const ExtensionName = {
    autoTooltip: 'autoTooltip',
    cellExternalCopyManager: 'cellExternalCopyManager',
    checkboxSelector: 'checkboxSelector',
    columnPicker: 'columnPicker',
    groupItemMetaProvider: 'groupItemMetaProvider',
    gridMenu: 'gridMenu',
    headerButton: 'headerButton',
    headerMenu: 'headerMenu',
    noname: 'noname',
    rowMoveManager: 'rowMoveManager',
    rowSelection: 'rowSelection',
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
    /** Format: 'YYYY-MM-DD HH:mm' => 2001-01-01 14:01 */
    dateTimeShortIso: 13,
    /** Format: 'MM/DD/YYYY' => 02/28/2001 */
    dateUs: 14,
    /** Format: 'M/D/YY' => 2/28/12 */
    dateUsShort: 15,
    /** Format: 'MM/DD/YYYY HH:mm' => 02/28/2001 13:01 */
    dateTimeShortUs: 16,
    /** Format: 'MM/DD/YYYY HH:mm:ss' => 02/28/2001 13:01:01 */
    dateTimeUs: 17,
    /** Format: 'MM/DD/YYYY hh:mm:ss a' => 02/28/2001 11:01:01 pm */
    dateTimeUsAmPm: 18,
    /** Format: 'MM/DD/YYYY hh:mm:ss A' => 02/28/2001 11:01:01 PM */
    dateTimeUsAM_PM: 19,
    /** Format: 'M/D/YY H:m:s' => 2/28/14 14:1:2 */
    dateTimeUsShort: 20,
    /** Format: 'M/D/YY h:m:s a' => 2/28/14 1:2:10 pm */
    dateTimeUsShortAmPm: 21,
    /** Format: 'M/D/YY h:m:s A' => 2/28/14 14:1:1 PM */
    dateTimeUsShortAM_PM: 22,
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
FieldType[FieldType.dateTimeShortIso] = "dateTimeShortIso";
FieldType[FieldType.dateUs] = "dateUs";
FieldType[FieldType.dateUsShort] = "dateUsShort";
FieldType[FieldType.dateTimeShortUs] = "dateTimeShortUs";
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
/** @enum {string} */
const FilterMultiplePassType = {
    merge: 'merge',
    chain: 'chain',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
const GridStateType = {
    columns: 'columns',
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
    /** value is empty */
    empty: '',
    /** value contains x */
    contains: 'Contains',
    /** value not contains x (inversed of contains) */
    notContains: 'Not_Contains',
    /** value less than x */
    lessThan: 'LT',
    /** value less than or equal to x */
    lessThanOrEqual: 'LE',
    /** value greater than x */
    greaterThan: 'GT',
    /** value great than or equal to x */
    greaterThanOrEqual: 'GE',
    /** value not equal to x */
    notEqual: 'NE',
    /** value equal to x */
    equal: 'EQ',
    /** String ends with value */
    endsWith: 'EndsWith',
    /** String starts with value */
    startsWith: 'StartsWith',
    /** Find an equal match inside a collection */
    in: 'IN',
    /** Inverse (Not In) of an equal match inside a collection */
    notIn: 'NOT_IN',
    /**
       * Find a substring contained inside a collection
       * For example, this condition would return True with "IN_CONTAINS":: value='Task2,Task3', collection=['Task2','Task3']
       * This would have returned False with "IN" because 'Task2' does not equal 'Task2,Task3'. However 'Task2' is contained in 'Task2,Task3'
       */
    inContains: 'IN_CONTAINS',
    /** Inversed (Not In) of substring contained inside a collection */
    notInContains: 'NOT_IN_CONTAINS',
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
/** @enum {number} */
const SortDirectionNumber = {
    asc: 1,
    desc: -1,
    neutral: 0,
};
SortDirectionNumber[SortDirectionNumber.asc] = "asc";
SortDirectionNumber[SortDirectionNumber.desc] = "desc";
SortDirectionNumber[SortDirectionNumber.neutral] = "neutral";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
 * HTML encode using jQuery
 * @param {?} value
 * @return {?}
 */
function htmlEncode(value) {
    // create a in-memory div, set it's inner text(which jQuery automatically encodes)
    // then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}
/**
 * HTML decode using jQuery
 * @param {?} value
 * @return {?}
 */
function htmlDecode(value) {
    return $('<div/>').html(value).text();
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
    if (!a || !b) {
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
 * @return {?} object the found object or default value
 */
function findOrDefault(array, logic, defaultVal = {}) {
    return array.find(logic) || defaultVal;
}
/**
 * Take a number (or a string) and display it as a formatted decimal string with defined minimum and maximum decimals
 * @param {?} input
 * @param {?=} minDecimal
 * @param {?=} maxDecimal
 * @return {?}
 */
function decimalFormatted(input, minDecimal, maxDecimal) {
    if (isNaN(+input)) {
        return input;
    }
    const /** @type {?} */ minDec = (minDecimal === undefined) ? 2 : minDecimal;
    const /** @type {?} */ maxDec = (maxDecimal === undefined) ? 2 : maxDecimal;
    let /** @type {?} */ amount = String(Math.round(+input * Math.pow(10, maxDec)) / Math.pow(10, maxDec));
    if (amount.indexOf('.') < 0) {
        amount += '.';
    }
    while ((amount.length - amount.indexOf('.')) <= minDec) {
        amount += '0';
    }
    return amount;
}
/**
 * From a dot (.) notation find and return a property within an object given a path
 * @param {?} obj
 * @param {?} path
 * @return {?}
 */
function getDescendantProperty(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
/**
 * Get the browser's scrollbar width, this is different to each browser
 * @return {?}
 */
function getScrollBarWidth() {
    const /** @type {?} */ $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body');
    const /** @type {?} */ widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
    $outer.remove();
    return Math.ceil(100 - widthWithScroll);
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
        case FieldType.dateTimeShortIso:
            map = 'YYYY-MM-DD HH:mm';
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
        case FieldType.dateTimeShortUs:
            map = 'MM/DD/YYYY HH:mm';
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
 * Sanitize, return only the text without HTML tags
 * \@input htmlString
 * @param {?} htmlString
 * @return {?} text
 */
function sanitizeHtmlToText(htmlString) {
    const /** @type {?} */ temp = document.createElement('div');
    temp.innerHTML = htmlString;
    return temp.textContent || temp.innerText;
}
/**
 * Title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param {?} string
 * @return {?} string
 */
function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
 * Takes an input array and makes sure the array has unique values by removing duplicates
 * @param {?} arr
 * @return {?} array output without duplicates
 */
function uniqueArray(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) >= index;
    });
}
/**
 * Unsubscribe all Observables Subscriptions
 * It will return an empty array if it all went well
 * @param {?} subscriptions
 * @return {?}
 */
function unsubscribeAllObservables(subscriptions) {
    if (Array.isArray(subscriptions)) {
        subscriptions.forEach((subscription) => {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        });
        subscriptions = [];
    }
    return subscriptions;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$1 = moment_;
/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} format
 * @param {?} sortDirection
 * @param {?=} strict
 * @return {?}
 */
function compareDates(value1, value2, format, sortDirection, strict) {
    let /** @type {?} */ diff = 0;
    if (value1 === null || value1 === '' || !moment$1(value1, format, strict).isValid()) {
        diff = -1;
    }
    else if (value2 === null || value2 === '' || !moment$1(value2, format, strict).isValid()) {
        diff = 1;
    }
    else {
        const /** @type {?} */ date1 = moment$1(value1, format, strict);
        const /** @type {?} */ date2 = moment$1(value2, format, strict);
        diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    }
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
const dateUsShortSorter = (value1, value2, sortDirection) => {
    return compareDates(value1, value2, FORMAT, sortDirection, true);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$2 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateSorter = (value1, value2, sortDirection) => {
    return compareDates(value1, value2, moment$2.ISO_8601, sortDirection);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const FORMAT$1 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
const dateIsoSorter = (value1, value2, sortDirection) => {
    return compareDates(value1, value2, FORMAT$1, sortDirection, true);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const FORMAT$2 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
const dateUsSorter = (value1, value2, sortDirection) => {
    return compareDates(value1, value2, FORMAT$2, sortDirection, true);
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
     * Filter 1 or more items from a collection
     * @param {?} collection
     * @param {?} filterByOptions
     * @param {?=} filterResultBy
     * @return {?}
     */
    filterCollection(collection, filterByOptions, filterResultBy = FilterMultiplePassType.chain) {
        let /** @type {?} */ filteredCollection = [];
        // when it's array, we will use the new filtered collection after every pass
        // basically if input collection has 10 items on 1st pass and 1 item is filtered out, then on 2nd pass the input collection will be 9 items
        if (Array.isArray(filterByOptions)) {
            filteredCollection = (filterResultBy === FilterMultiplePassType.merge) ? [] : collection;
            for (const /** @type {?} */ filter of filterByOptions) {
                if (filterResultBy === FilterMultiplePassType.merge) {
                    const /** @type {?} */ filteredPass = this.singleFilterCollection(collection, filter);
                    filteredCollection = uniqueArray([...filteredCollection, ...filteredPass]);
                }
                else {
                    filteredCollection = this.singleFilterCollection(filteredCollection, filter);
                }
            }
        }
        else {
            filteredCollection = this.singleFilterCollection(collection, filterByOptions);
        }
        return filteredCollection;
    }
    /**
     * Filter an item from a collection
     * @param {?} collection
     * @param {?} filterBy
     * @return {?}
     */
    singleFilterCollection(collection, filterBy) {
        let /** @type {?} */ filteredCollection = [];
        if (filterBy) {
            const /** @type {?} */ property = filterBy.property || '';
            const /** @type {?} */ operator = filterBy.operator || OperatorType.equal;
            // just check for undefined since the filter value could be null, 0, '', false etc
            const /** @type {?} */ value = typeof filterBy.value === 'undefined' ? '' : filterBy.value;
            switch (operator) {
                case OperatorType.equal:
                    filteredCollection = collection.filter((item) => item[property] === value);
                    break;
                case OperatorType.contains:
                    filteredCollection = collection.filter((item) => item[property].toString().indexOf(value.toString()) !== -1);
                    break;
                case OperatorType.notContains:
                    filteredCollection = collection.filter((item) => item[property].toString().indexOf(value.toString()) === -1);
                    break;
                case OperatorType.notEqual:
                default:
                    filteredCollection = collection.filter((item) => item[property] !== value);
            }
        }
        return filteredCollection;
    }
    /**
     * Sort 1 or more items in a collection
     * @param {?} collection
     * @param {?} sortByOptions
     * @param {?=} enableTranslateLabel
     * @return {?}
     */
    sortCollection(collection, sortByOptions, enableTranslateLabel) {
        let /** @type {?} */ sortedCollection = [];
        if (sortByOptions) {
            if (Array.isArray(sortByOptions)) {
                // multi-sort
                sortedCollection = collection.sort((dataRow1, dataRow2) => {
                    for (let /** @type {?} */ i = 0, /** @type {?} */ l = sortByOptions.length; i < l; i++) {
                        const /** @type {?} */ sortBy = sortByOptions[i];
                        if (sortBy) {
                            const /** @type {?} */ sortDirection = sortBy.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                            const /** @type {?} */ propertyName = sortBy.property || '';
                            const /** @type {?} */ fieldType = sortBy.fieldType || FieldType.string;
                            const /** @type {?} */ value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                            const /** @type {?} */ value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                            const /** @type {?} */ sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
                            if (sortResult !== SortDirectionNumber.neutral) {
                                return sortResult;
                            }
                        }
                    }
                    return SortDirectionNumber.neutral;
                });
            }
            else {
                // single sort
                const /** @type {?} */ propertyName = sortByOptions.property || '';
                const /** @type {?} */ sortDirection = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                const /** @type {?} */ fieldType = sortByOptions.fieldType || FieldType.string;
                sortedCollection = collection.sort((dataRow1, dataRow2) => {
                    const /** @type {?} */ value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                    const /** @type {?} */ value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                    const /** @type {?} */ sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
                    if (sortResult !== SortDirectionNumber.neutral) {
                        return sortResult;
                    }
                    return SortDirectionNumber.neutral;
                });
            }
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
        this._hasGroupedItems = false;
        this.onGridBeforeExportToFile = new Subject();
        this.onGridAfterExportToFile = new Subject();
    }
    /**
     * @return {?}
     */
    get datasetIdName() {
        return this._gridOptions && this._gridOptions.datasetIdPropertyName || 'id';
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
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
        const /** @type {?} */ dataOutput = this.getDataOutput();
        // trigger a download file
        // wrap it into a setTimeout so that the EventAggregator has enough time to start a pre-process like showing a spinner
        setTimeout(() => {
            const /** @type {?} */ downloadOptions = {
                filename: `${this._exportOptions.filename}.${this._exportOptions.format}`,
                csvContent: dataOutput,
                format: this._exportOptions.format,
                useUtf8WithBom: this._exportOptions.useUtf8WithBom
            };
            this.startDownloadFile(downloadOptions);
            this.onGridAfterExportToFile.next({ options: downloadOptions });
        }, 0);
    }
    /**
     * @return {?}
     */
    getDataOutput() {
        const /** @type {?} */ columns = this._grid.getColumns() || [];
        const /** @type {?} */ delimiter = this._exportOptions.delimiter || '';
        const /** @type {?} */ format = this._exportOptions.format || '';
        const /** @type {?} */ groupByColumnHeader = this._exportOptions.groupingColumnHeaderTitle || this.translate.instant('GROUP_BY');
        // a CSV needs double quotes wrapper, the other types do not need any wrapper
        this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';
        // data variable which will hold all the fields data of a row
        let /** @type {?} */ outputDataString = '';
        // get grouped column titles and if found, we will add a "Group by" column at the first column index
        const /** @type {?} */ grouping = this._dataView.getGrouping();
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
            const /** @type {?} */ outputHeaderTitles = this._columnHeaders.map((header) => {
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
        const /** @type {?} */ outputDataStrings = [];
        const /** @type {?} */ lineCount = this._dataView.getLength();
        // loop through all the grid rows of data
        for (let /** @type {?} */ rowNumber = 0; rowNumber < lineCount; rowNumber++) {
            const /** @type {?} */ itemObj = this._dataView.getItem(rowNumber);
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
        const /** @type {?} */ rowOutputStrings = [];
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
                rowOutputStrings.push(`""`);
            }
            // does the user want to evaluate current column Formatter?
            const /** @type {?} */ isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._exportOptions.exportWithFormatter;
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
            const /** @type {?} */ keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
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
        let /** @type {?} */ groupName = sanitizeHtmlToText(itemObj.title);
        const /** @type {?} */ exportQuoteWrapper = this._exportQuoteWrapper || '';
        const /** @type {?} */ format = this._exportOptions.format;
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
        const /** @type {?} */ delimiter = this._exportOptions.delimiter;
        const /** @type {?} */ format = this._exportOptions.format;
        const /** @type {?} */ groupingAggregatorRowText = this._exportOptions.groupingAggregatorRowText || '';
        const /** @type {?} */ exportQuoteWrapper = this._exportQuoteWrapper || '';
        const /** @type {?} */ outputStrings = [`${exportQuoteWrapper}${groupingAggregatorRowText}${exportQuoteWrapper}`];
        columns.forEach((columnDef) => {
            let /** @type {?} */ itemData = '';
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
class Constants {
}
Constants.TEXT_CANCEL = 'Cancel';
Constants.TEXT_CLEAR_ALL_FILTERS = 'Clear All Filters';
Constants.TEXT_CLEAR_ALL_SORTING = 'Clear All Sorting';
Constants.TEXT_COLUMNS = 'Columns';
Constants.TEXT_COMMANDS = 'Commands';
Constants.TEXT_EXPORT_IN_CSV_FORMAT = 'Export in CSV format';
Constants.TEXT_EXPORT_IN_TEXT_FORMAT = 'Export in Text format (Tab delimited)';
Constants.TEXT_FORCE_FIT_COLUMNS = 'Force fit columns';
Constants.TEXT_HIDE_COLUMN = 'Hide Column';
Constants.TEXT_REFRESH_DATASET = 'Refresh Dataset';
Constants.TEXT_SAVE = 'Save';
Constants.TEXT_SYNCHRONOUS_RESIZE = 'Synchronous resize';
Constants.TEXT_SORT_ASCENDING = 'Sort Ascending';
Constants.TEXT_SORT_DESCENDING = 'Sort Descending';
Constants.TEXT_TOGGLE_FILTER_ROW = 'Toggle Filter Row';
Constants.VALIDATION_EDITOR_VALID_NUMBER = 'Please enter a valid number';
Constants.VALIDATION_EDITOR_VALID_INTEGER = 'Please enter a valid integer number';
Constants.VALIDATION_EDITOR_NUMBER_BETWEEN = 'Please enter a valid number between {{minValue}} and {{maxValue}}';
Constants.VALIDATION_EDITOR_NUMBER_MAX = 'Please enter a valid number that is lower than {{maxValue}}';
Constants.VALIDATION_EDITOR_NUMBER_MIN = 'Please enter a valid number that is greater than {{minValue}}';
Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN = 'Please enter a valid number with a maximum of {{maxDecimal}} decimals';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SharedService {
    /**
     * Getter for All Columns  in the grid (hidden/visible)
     * @return {?}
     */
    get allColumns() {
        return this._allColumns;
    }
    /**
     * Setter for All Columns  in the grid (hidden/visible)
     * @param {?} allColumns
     * @return {?}
     */
    set allColumns(allColumns) {
        this._allColumns = allColumns;
    }
    /**
     * Getter for the Column Definitions pulled through the Grid Object
     * @return {?}
     */
    get columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /**
     * Getter for SlickGrid DataView object
     * @return {?}
     */
    get dataView() {
        return this._dataView;
    }
    /**
     * Setter for SlickGrid DataView object
     * @param {?} dataView
     * @return {?}
     */
    set dataView(dataView) {
        this._dataView = dataView;
    }
    /**
     * Getter for SlickGrid Grid object
     * @return {?}
     */
    get grid() {
        return this._grid;
    }
    /**
     * Setter for SlickGrid Grid object
     * @param {?} grid
     * @return {?}
     */
    set grid(grid) {
        this._grid = grid;
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * Setter for the Grid Options pulled through the Grid Object
     * @param {?} gridOptions
     * @return {?}
     */
    set gridOptions(gridOptions) {
        this.gridOptions = gridOptions;
    }
    /**
     * Getter for the Grid Options
     * @return {?}
     */
    get groupItemMetadataProvider() {
        return this._groupItemMetadataProvider;
    }
    /**
     * Setter for the Grid Options
     * @param {?} groupItemMetadataProvider
     * @return {?}
     */
    set groupItemMetadataProvider(groupItemMetadataProvider) {
        this._groupItemMetadataProvider = groupItemMetadataProvider;
    }
    /**
     * Getter for the Visible Columns in the grid
     * @return {?}
     */
    get visibleColumns() {
        return this._visibleColumns;
    }
    /**
     * Setter for the Visible Columns in the grid
     * @param {?} visibleColumns
     * @return {?}
     */
    set visibleColumns(visibleColumns) {
        this._visibleColumns = visibleColumns;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ExtensionUtility {
    /**
     * @param {?} sharedService
     * @param {?} translate
     */
    constructor(sharedService, translate) {
        this.sharedService = sharedService;
        this.translate = translate;
    }
    /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    arrayRemoveItemByIndex(array, index) {
        return array.filter((el, i) => {
            return index !== i;
        });
    }
    /**
     * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
     * This will basically only load the extension when user enables the feature
     * @param {?} extensionName
     * @return {?}
     */
    loadExtensionDynamically(extensionName) {
        try {
            switch (extensionName) {
                case ExtensionName.autoTooltip:
                    require('slickgrid/plugins/slick.autotooltips');
                    break;
                case ExtensionName.cellExternalCopyManager:
                    require('slickgrid/plugins/slick.cellexternalcopymanager');
                    break;
                case ExtensionName.checkboxSelector:
                    require('slickgrid/plugins/slick.checkboxselectcolumn');
                    break;
                case ExtensionName.columnPicker:
                    require('slickgrid/controls/slick.columnpicker');
                    break;
                case ExtensionName.gridMenu:
                    require('slickgrid/controls/slick.gridmenu');
                    break;
                case ExtensionName.groupItemMetaProvider:
                    require('slickgrid/slick.groupitemmetadataprovider');
                    break;
                case ExtensionName.headerButton:
                    require('slickgrid/plugins/slick.headerbuttons');
                    break;
                case ExtensionName.headerMenu:
                    require('slickgrid/plugins/slick.headermenu');
                    break;
                case ExtensionName.rowSelection:
                    require('slickgrid/plugins/slick.rowselectionmodel');
                    break;
                case ExtensionName.rowMoveManager:
                    require('slickgrid/plugins/slick.rowmovemanager.js');
                    break;
            }
        }
        catch (/** @type {?} */ e) {
            // do nothing, we fall here when using Aurelia-CLI and RequireJS
            // if you do use RequireJS then you need to make sure to include all necessary extensions in your `aurelia.json`
        }
    }
    /**
     * From a Grid Menu object property name, we will return the correct title output string following this order
     * 1- if user provided a title, use it as the output title
     * 2- else if user provided a title key, use it to translate the output title
     * 3- else if nothing is provided use
     * @param {?} propName
     * @param {?} pickerName
     * @return {?}
     */
    getPickerTitleOutputString(propName, pickerName) {
        let /** @type {?} */ output = '';
        const /** @type {?} */ picker = this.sharedService.gridOptions && this.sharedService.gridOptions[pickerName] || {};
        const /** @type {?} */ enableTranslate = this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate || false;
        const /** @type {?} */ title = picker && picker[propName];
        const /** @type {?} */ titleKey = picker && picker[`${propName}Key`];
        if (titleKey) {
            output = this.translate.instant(titleKey || ' ');
        }
        else {
            switch (propName) {
                case 'customTitle':
                    output = title || (enableTranslate ? this.translate.instant('COMMANDS') : Constants.TEXT_COMMANDS);
                    break;
                case 'columnTitle':
                    output = title || (enableTranslate ? this.translate.instant('COLUMNS') : Constants.TEXT_COLUMNS);
                    break;
                case 'forceFitTitle':
                    output = title || (enableTranslate ? this.translate.instant('FORCE_FIT_COLUMNS') : Constants.TEXT_FORCE_FIT_COLUMNS);
                    break;
                case 'syncResizeTitle':
                    output = title || (enableTranslate ? this.translate.instant('SYNCHRONOUS_RESIZE') : Constants.TEXT_SYNCHRONOUS_RESIZE);
                    break;
                default:
                    output = title;
                    break;
            }
        }
        return output;
    }
    /**
     * Sort items in an array by a property name
     * \@params items array
     * @param {?} items
     * @param {?} propertyName
     * @return {?} sorted array
     */
    sortItems(items, propertyName) {
        // sort the custom items by their position in the list
        items.sort((itemA, itemB) => {
            if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
                return itemA[propertyName] - itemB[propertyName];
            }
            return 0;
        });
    }
    /**
     * Translate the an array of items from an input key and assign to the output key
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    translateItems(items, inputKey, outputKey) {
        for (const /** @type {?} */ item of items) {
            if (item[inputKey]) {
                item[outputKey] = this.translate.instant(item[inputKey]);
            }
        }
    }
}
ExtensionUtility.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ExtensionUtility.ctorParameters = () => [
    { type: SharedService, },
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutoTooltipExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.autoTooltip);
            this._extension = new Slick.AutoTooltips(this.sharedService.gridOptions.autoTooltipOptions || {});
            this.sharedService.grid.registerPlugin(this._extension);
            return this._extension;
        }
        return null;
    }
}
AutoTooltipExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AutoTooltipExtension.ctorParameters = () => [
    { type: ExtensionUtility, },
    { type: SharedService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CellExternalCopyManagerExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.cellExternalCopyManager);
            this.createUndoRedoBuffer();
            this.hookUndoShortcutKey();
            let /** @type {?} */ newRowIds = 0;
            const /** @type {?} */ pluginOptions = {
                clipboardCommandHandler: (editCommand) => {
                    this._undoRedoBuffer.queueAndExecuteCommand.call(this._undoRedoBuffer, editCommand);
                },
                dataItemColumnValueExtractor: (item, columnDef) => {
                    // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
                    // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
                    if (!this.sharedService.gridOptions.editable || !columnDef.editor) {
                        const /** @type {?} */ isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : (this.sharedService.gridOptions.exportOptions && this.sharedService.gridOptions.exportOptions.exportWithFormatter);
                        if (columnDef.formatter && isEvaluatingFormatter) {
                            const /** @type {?} */ formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, this.sharedService.grid);
                            if (columnDef.sanitizeDataExport || (this.sharedService.gridOptions.exportOptions && this.sharedService.gridOptions.exportOptions.sanitizeDataExport)) {
                                return sanitizeHtmlToText(formattedOutput);
                            }
                            return formattedOutput;
                        }
                    }
                    // else use the default "dataItemColumnValueExtractor" from the plugin itself
                    // we can do that by setting back the getter with null
                    return null;
                },
                readOnlyMode: false,
                includeHeaderWhenCopying: false,
                newRowCreator: (count) => {
                    for (let /** @type {?} */ i = 0; i < count; i++) {
                        const /** @type {?} */ item = {
                            id: 'newRow_' + newRowIds++
                        };
                        this.sharedService.grid.getData().addItem(item);
                    }
                }
            };
            this.sharedService.grid.setSelectionModel(new Slick.CellSelectionModel());
            this._extension = new Slick.CellExternalCopyManager(pluginOptions);
            this.sharedService.grid.registerPlugin(this._extension);
            return this._extension;
        }
        return null;
    }
    /**
     * Create an undo redo buffer used by the Excel like copy
     * @return {?}
     */
    createUndoRedoBuffer() {
        const /** @type {?} */ commandQueue = [];
        let /** @type {?} */ commandCtr = 0;
        this._undoRedoBuffer = {
            queueAndExecuteCommand: (editCommand) => {
                commandQueue[commandCtr] = editCommand;
                commandCtr++;
                editCommand.execute();
            },
            undo: () => {
                if (commandCtr === 0) {
                    return;
                }
                commandCtr--;
                const /** @type {?} */ command = commandQueue[commandCtr];
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.undo();
                }
            },
            redo: () => {
                if (commandCtr >= commandQueue.length) {
                    return;
                }
                const /** @type {?} */ command = commandQueue[commandCtr];
                commandCtr++;
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.execute();
                }
            }
        };
    }
    /**
     * Attach an undo shortcut key hook that will redo/undo the copy buffer
     * @return {?}
     */
    hookUndoShortcutKey() {
        // undo shortcut
        $(document).keydown((e) => {
            if (e.which === 90 && (e.ctrlKey || e.metaKey)) {
                // CTRL + (shift) + Z
                if (e.shiftKey) {
                    this._undoRedoBuffer.redo();
                }
                else {
                    this._undoRedoBuffer.undo();
                }
            }
        });
    }
}
CellExternalCopyManagerExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CellExternalCopyManagerExtension.ctorParameters = () => [
    { type: ExtensionUtility, },
    { type: SharedService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CheckboxSelectorExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} columnDefinitions
     * @param {?} gridOptions
     * @return {?}
     */
    create(columnDefinitions, gridOptions) {
        if (columnDefinitions && gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.checkboxSelector);
            if (!this._extension) {
                this._extension = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
            }
            const /** @type {?} */ selectionColumn = this._extension.getColumnDefinition();
            selectionColumn.excludeFromExport = true;
            selectionColumn.excludeFromQuery = true;
            selectionColumn.excludeFromHeaderMenu = true;
            columnDefinitions.unshift(selectionColumn);
            return this._extension;
        }
        return null;
    }
    /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    register(rowSelectionPlugin) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // when enabling the Checkbox Selector Plugin, we need to also watch onClick events to perform certain actions
            // the selector column has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
            this.sharedService.grid.registerPlugin(this._extension);
            // this also requires the Row Selection Model to be registered as well
            if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
                rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
            }
            // user might want to pre-select some rows
            // the setTimeout is because of timing issue with styling (row selection happen but rows aren't highlighted properly)
            if (this.sharedService.gridOptions.preselectedRows && rowSelectionPlugin && this.sharedService.grid.getSelectionModel()) {
                setTimeout(() => this._extension.selectRows(this.sharedService.gridOptions.preselectedRows), 0);
            }
            return rowSelectionPlugin;
        }
        return null;
    }
}
CheckboxSelectorExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CheckboxSelectorExtension.ctorParameters = () => [
    { type: ExtensionUtility, },
    { type: SharedService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ColumnPickerExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.columnPicker);
            // localization support for the picker
            const /** @type {?} */ columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
            const /** @type {?} */ forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
            const /** @type {?} */ syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
            this.sharedService.gridOptions.columnPicker = this.sharedService.gridOptions.columnPicker || {};
            this.sharedService.gridOptions.columnPicker.columnTitle = this.sharedService.gridOptions.columnPicker.columnTitle || columnTitle;
            this.sharedService.gridOptions.columnPicker.forceFitTitle = this.sharedService.gridOptions.columnPicker.forceFitTitle || forceFitTitle;
            this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.sharedService.gridOptions.columnPicker.syncResizeTitle || syncResizeTitle;
            this._extension = new Slick.Controls.ColumnPicker(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
            if (this.sharedService.grid && this.sharedService.gridOptions.enableColumnPicker) {
                this._eventHandler.subscribe(this._extension.onColumnsChanged, (e, args) => {
                    if (this.sharedService.gridOptions.columnPicker && typeof this.sharedService.gridOptions.columnPicker.onColumnsChanged === 'function') {
                        this.sharedService.gridOptions.columnPicker.onColumnsChanged(e, args);
                    }
                });
            }
            return this._extension;
        }
    }
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    translateColumnPicker() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
            if (this.sharedService.gridOptions.columnPicker) {
                this.emptyColumnPickerTitles();
                this.sharedService.gridOptions.columnPicker.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
                this.sharedService.gridOptions.columnPicker.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
                this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
            }
            // translate all columns (including non-visible)
            this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
            // re-initialize the Column Picker, that will recreate all the list
            // doing an "init()" won't drop any existing command attached
            if (this._extension.init) {
                this._extension.init(this.sharedService.grid);
            }
        }
    }
    /**
     * @return {?}
     */
    emptyColumnPickerTitles() {
        if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.columnPicker) {
            this.sharedService.gridOptions.columnPicker.columnTitle = '';
            this.sharedService.gridOptions.columnPicker.forceFitTitle = '';
            this.sharedService.gridOptions.columnPicker.syncResizeTitle = '';
        }
    }
}
ColumnPickerExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ColumnPickerExtension.ctorParameters = () => [
    { type: ExtensionUtility, },
    { type: SharedService, },
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
    const /** @type {?} */ searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    return parseBoolean(options.cellValue) === parseBoolean(searchTerm);
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
        case 'NIN':
        case 'NOT_IN':
            return ((value2 && value2.includes) ? (!value2.includes(value1)) : false);
        case 'IN_CONTAINS':
            if (value2 && Array.isArray(value2) && value2.findIndex) {
                return ((value2.findIndex((val) => value1.indexOf(val) > -1)) > -1);
            }
            return false;
        case 'NIN_CONTAINS':
        case 'NOT_IN_CONTAINS':
            if (value2 && Array.isArray(value2) && value2.findIndex) {
                return !((value2.findIndex((val) => value1.indexOf(val) > -1)) > -1);
            }
            return false;
    }
    return true;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$3 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateFilterCondition = (options) => {
    const /** @type {?} */ searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    const /** @type {?} */ filterSearchType = options.filterSearchType || FieldType.dateIso;
    const /** @type {?} */ searchDateFormat = mapMomentDateFormatWithFieldType(filterSearchType);
    if (searchTerm === null || searchTerm === '' || !moment$3(options.cellValue, moment$3.ISO_8601).isValid() || !moment$3(searchTerm, searchDateFormat, true).isValid()) {
        return false;
    }
    const /** @type {?} */ dateCell = moment$3(options.cellValue);
    const /** @type {?} */ dateSearch = moment$3(searchTerm);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$4 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$3 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
const dateIsoFilterCondition = (options) => {
    const /** @type {?} */ searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    if (searchTerm === null || searchTerm === '' || !moment$4(options.cellValue, FORMAT$3, true).isValid() || !moment$4(searchTerm, FORMAT$3, true).isValid()) {
        return false;
    }
    const /** @type {?} */ dateCell = moment$4(options.cellValue, FORMAT$3, true);
    const /** @type {?} */ dateSearch = moment$4(searchTerm, FORMAT$3, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$5 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$4 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
const dateUsFilterCondition = (options) => {
    const /** @type {?} */ searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    if (searchTerm === null || searchTerm === '' || !moment$5(options.cellValue, FORMAT$4, true).isValid() || !moment$5(searchTerm, FORMAT$4, true).isValid()) {
        return false;
    }
    const /** @type {?} */ dateCell = moment$5(options.cellValue, FORMAT$4, true);
    const /** @type {?} */ dateSearch = moment$5(searchTerm, FORMAT$4, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$6 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$5 = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
const dateUsShortFilterCondition = (options) => {
    const /** @type {?} */ searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    if (searchTerm === null || searchTerm === '' || !moment$6(options.cellValue, FORMAT$5, true).isValid() || !moment$6(searchTerm, FORMAT$5, true).isValid()) {
        return false;
    }
    const /** @type {?} */ dateCell = moment$6(options.cellValue, FORMAT$5, true);
    const /** @type {?} */ dateSearch = moment$6(searchTerm, FORMAT$5, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$7 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateUtcFilterCondition = (options) => {
    const /** @type {?} */ searchTerms = Array.isArray(options.searchTerms) && options.searchTerms[0] || [];
    const /** @type {?} */ searchDateFormat = mapMomentDateFormatWithFieldType(options.filterSearchType || options.fieldType);
    if (!moment$7(options.cellValue, moment$7.ISO_8601).isValid() || !moment$7(searchTerms[0], searchDateFormat, true).isValid()) {
        return true;
    }
    const /** @type {?} */ dateCell = moment$7(options.cellValue, moment$7.ISO_8601, true);
    const /** @type {?} */ dateSearch = moment$7(searchTerms[0], searchDateFormat, true);
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
    let /** @type {?} */ searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || 0;
    if (typeof searchTerm === 'string') {
        searchTerm = parseFloat(searchTerm);
    }
    if (!searchTerm && (!options.operator || options.operator === '')) {
        return true;
    }
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
    let /** @type {?} */ searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || '';
    if (typeof searchTerm === 'string') {
        searchTerm = searchTerm.toLowerCase();
    }
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
    const /** @type {?} */ operator = options.operator && options.operator.toUpperCase();
    if (options && options.operator && (operator === 'IN' || operator === 'NIN' || operator === 'IN_CONTAINS' || operator === 'NIN_CONTAINS')) {
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
        this._clearFilterTriggered = false;
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /**
     * @param {?} op
     * @return {?}
     */
    set operator(op) {
        this._operator = op;
    }
    /**
     * @return {?}
     */
    get operator() {
        return this._operator || OperatorType.empty;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        if (args) {
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.operator = args.operator || '';
            this.searchTerms = args.searchTerms || [];
            // date input can only have 1 search term, so we will use the 1st array index if it exist
            const /** @type {?} */ searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.keyup((e) => {
                this.onTriggerEvent(e);
            });
            this.$selectOperatorElm.change((e) => {
                this.onTriggerEvent(e);
            });
        }
    }
    /**
     * Clear the filter value
     * @return {?}
     */
    clear() {
        if (this.flatInstance && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
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
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values && Array.isArray(values)) {
            this.flatInstance.setDate(values[0]);
        }
    }
    /**
     * @param {?=} searchTerm
     * @return {?}
     */
    buildDatePickerInput(searchTerm) {
        const /** @type {?} */ inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
        const /** @type {?} */ outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
        let /** @type {?} */ currentLocale = this.translate.currentLang || 'en';
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
            }
        };
        // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
        if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
            pickerOptions.enableTime = true;
        }
        const /** @type {?} */ placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        const /** @type {?} */ $filterInputElm = $(`<div class="flatpickr"><input type="text" class="form-control" data-input placeholder="${placeholder}"></div>`);
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
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(searchTerm) {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = this.buildDatePickerInput(searchTerm);
        const /** @type {?} */ $filterContainerElm = $(`<div class="form-group search-filter filter-${fieldId}"></div>`);
        const /** @type {?} */ $containerInputGroup = $(`<div class="input-group flatpickr"></div>`);
        const /** @type {?} */ $operatorInputGroupAddon = $(`<div class="input-group-addon input-group-prepend operator"></div>`);
        /* the DOM element final structure will be
              <div class="input-group">
                <div class="input-group-addon input-group-prepend operator">
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
        $filterContainerElm.attr('id', `filter-${fieldId}`);
        this.$filterInputElm.data('columnId', fieldId);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
            $filterContainerElm.addClass('filled');
            this._currentValue = /** @type {?} */ (searchTerm);
        }
        // append the new DOM element to the header row
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    loadFlatpickrLocale(locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        if (this.gridOptions && this.gridOptions.params && this.gridOptions.params.flapickrLocale) {
            return this.gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
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
        if (this._clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
            this._clearFilterTriggered = false; // reset flag for next use
        }
        else {
            const /** @type {?} */ selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '' });
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
    show() {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    }
}

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
        this._clearFilterTriggered = false;
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /**
     * @param {?} op
     * @return {?}
     */
    set operator(op) {
        this._operator = op;
    }
    /**
     * @return {?}
     */
    get operator() {
        return this._operator || OperatorType.empty;
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
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        const /** @type {?} */ searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create the DOM Element of the filter which contain the compound Operator+Input
        // and initialize it if searchTerms is filled
        this.$filterElm = this.createDomElement(searchTerm);
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
     * @return {?}
     */
    clear() {
        if (this.$filterElm && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val('');
            this.onTriggerEvent(null);
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
        if (values && Array.isArray(values)) {
            this.$filterElm.val(values[0]);
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
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(searchTerm) {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildInputHtmlString());
        const /** @type {?} */ $filterContainerElm = $(`<div class="form-group search-filter filter-${fieldId}"></div>`);
        const /** @type {?} */ $containerInputGroup = $(`<div class="input-group"></div>`);
        const /** @type {?} */ $operatorInputGroupAddon = $(`<div class="input-group-addon input-group-prepend operator"></div>`);
        /* the DOM element final structure will be
              <div class="input-group">
                <div class="input-group-addon input-group-prepend operator">
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
        $filterContainerElm.attr('id', `filter-${fieldId}`);
        this.$filterInputElm.val(searchTerm);
        this.$filterInputElm.data('columnId', fieldId);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
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
        if (this._clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
            this._clearFilterTriggered = false; // reset flag for next use
        }
        else {
            const /** @type {?} */ selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            const /** @type {?} */ value = this.$filterInputElm.val();
            (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;
class CompoundSliderFilter {
    constructor() {
        this._clearFilterTriggered = false;
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /**
     * Getter for the Filter Generic Params
     * @return {?}
     */
    get filterParams() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
    }
    /**
     * Getter for the `filter` properties
     * @return {?}
     */
    get filterProperties() {
        return this.columnDef && this.columnDef.filter;
    }
    /**
     * @param {?} op
     * @return {?}
     */
    set operator(op) {
        this._operator = op;
    }
    /**
     * @return {?}
     */
    get operator() {
        return this._operator || OperatorType.empty;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        if (args) {
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.operator = args.operator || '';
            this.searchTerms = args.searchTerms || [];
            // define the input & slider number IDs
            this._elementRangeInputId = `rangeInput_${this.columnDef.field}`;
            this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}`;
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            const /** @type {?} */ searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.change((e) => {
                this.onTriggerEvent(e);
            });
            this.$selectOperatorElm.change((e) => {
                this.onTriggerEvent(e);
            });
            // if user chose to display the slider number on the right side, then update it every time it changes
            // we need to use both "input" and "change" event to be all cross-browser
            if (!this.filterParams.hideSliderNumber) {
                this.$filterInputElm.on('input change', (e) => {
                    const /** @type {?} */ value = e && e.target && e.target.value || '';
                    if (value) {
                        document.getElementById(this._elementRangeOutputId).innerHTML = value;
                    }
                });
            }
        }
    }
    /**
     * Clear the filter value
     * @return {?}
     */
    clear() {
        if (this.$filterElm && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            const /** @type {?} */ clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val(clearedValue);
            if (!this.filterParams.hideSliderNumber) {
                this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(clearedValue);
            }
            this.onTriggerEvent(undefined);
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
        if (values && Array.isArray(values)) {
            this.$filterInputElm.val(values[0]);
            this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(values[0]);
        }
    }
    /**
     * Build HTML Template for the input range (slider)
     * @return {?}
     */
    buildTemplateHtmlString() {
        const /** @type {?} */ minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        const /** @type {?} */ maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
        const /** @type {?} */ defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        const /** @type {?} */ step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
        return `<input type="range" id="${this._elementRangeInputId}"
              name="${this._elementRangeInputId}"
              defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
              class="form-control slider-filter-input range compound-slider" />`;
    }
    /**
     * Build HTML Template for the text (number) that is shown appended to the slider
     * @return {?}
     */
    buildTemplateSliderTextHtmlString() {
        const /** @type {?} */ minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        const /** @type {?} */ defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        return `<div class="input-group-addon input-group-append slider-value"><span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span></div>`;
    }
    /**
     * Build HTML Template select dropdown (operator)
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
     * Get the available operator option values
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
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(searchTerm) {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ searchTermInput = /** @type {?} */ ((searchTerm || '0'));
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildTemplateHtmlString());
        const /** @type {?} */ $filterContainerElm = $(`<div class="form-group search-filter filter-${fieldId}"></div>`);
        this.$containerInputGroupElm = $(`<div class="input-group search-filter filter-${fieldId}"></div>`);
        const /** @type {?} */ $operatorInputGroupAddon = $(`<span class="input-group-addon input-group-prepend operator"></span>`);
        /* the DOM element final structure will be
              <div class="input-group">
                <div class="input-group-addon input-group-prepend operator">
                  <select class="form-control"></select>
                </div>
                <input class="form-control" type="text" />
                <div class="input-group-addon input-group-prepend" id="rangeOuput_percentComplete"><span class="input-group-text">0</span></div>
              </div>
            */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        this.$containerInputGroupElm.append($operatorInputGroupAddon);
        this.$containerInputGroupElm.append(this.$filterInputElm);
        if (!this.filterParams.hideSliderNumber) {
            const /** @type {?} */ $sliderTextInputAppendAddon = $(this.buildTemplateSliderTextHtmlString());
            $sliderTextInputAppendAddon.children().html(searchTermInput);
            this.$containerInputGroupElm.append($sliderTextInputAppendAddon);
        }
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append(this.$containerInputGroupElm);
        $filterContainerElm.attr('id', `filter-${fieldId}`);
        this.$filterInputElm.val(searchTermInput);
        this.$filterInputElm.data('columnId', fieldId);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
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
        if (this._clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
            this._clearFilterTriggered = false; // reset flag for next use
        }
        else {
            const /** @type {?} */ selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            const /** @type {?} */ value = this.$filterInputElm.val();
            (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InputFilter {
    constructor() {
        this._clearFilterTriggered = false;
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /**
     * @return {?}
     */
    get operator() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || '';
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
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        const /** @type {?} */ searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        const /** @type {?} */ filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.keyup((e) => {
            const /** @type {?} */ value = e && e.target && e.target.value || '';
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
                this._clearFilterTriggered = false; // reset flag for next use
                this.$filterElm.removeClass('filled');
            }
            else {
                this.$filterElm.addClass('filled');
                this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value] });
            }
        });
    }
    /**
     * Clear the filter value
     * @return {?}
     */
    clear() {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            this.$filterElm.val('');
            this.$filterElm.trigger('keyup');
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
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        return `<input type="text" class="form-control search-filter filter-${fieldId}" placeholder="${placeholder}">`;
    }
    /**
     * From the html template string, create a DOM element
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(filterTemplate, searchTerm) {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        const /** @type {?} */ $filterElm = $(filterTemplate);
        $filterElm.val(searchTerm);
        $filterElm.attr('id', `filter-${fieldId}`);
        $filterElm.data('columnId', fieldId);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
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
const DOMPurify = DOMPurify_; // patch to fix rollup to work
class SelectFilter {
    /**
     * Initialize the Filter
     * @param {?} translate
     * @param {?} collectionService
     * @param {?=} isMultipleSelect
     */
    constructor(translate, collectionService, isMultipleSelect = true) {
        this.translate = translate;
        this.collectionService = collectionService;
        this.isMultipleSelect = isMultipleSelect;
        this.isFilled = false;
        this.enableTranslateLabel = false;
        this.subscriptions = [];
        // default options used by this Filter, user can overwrite any of these by passing "otions"
        const /** @type {?} */ options = {
            autoAdjustDropHeight: true,
            autoAdjustDropPosition: true,
            autoAdjustDropWidthByTextSize: true,
            container: 'body',
            filter: false,
            // input search term on top of the select option list
            maxHeight: 275,
            single: true,
            textTemplate: ($elm) => {
                // render HTML code or not, by default it is sanitized and won't be rendered
                const /** @type {?} */ isRenderHtmlEnabled = this.columnDef && this.columnDef.filter && this.columnDef.filter.enableRenderHtml || false;
                return isRenderHtmlEnabled ? $elm.text() : $elm.html();
            },
            onClose: () => {
                // we will subscribe to the onClose event for triggering our callback
                // also add/remove "filled" class for styling purposes
                const /** @type {?} */ selectedItems = this.$filterElm.multipleSelect('getSelects');
                if (Array.isArray(selectedItems) && selectedItems.length > 0) {
                    this.isFilled = true;
                    this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    this.isFilled = false;
                    this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
                }
                this.callback(undefined, { columnDef: this.columnDef, operator: this.operator, searchTerms: selectedItems });
            }
        };
        if (this.isMultipleSelect) {
            options.single = false;
            options.okButton = true;
            options.addTitle = true; // show tooltip of all selected items while hovering the filter
            options.countSelected = this.translate.instant('X_OF_Y_SELECTED');
            options.allSelected = this.translate.instant('ALL_SELECTED');
            options.selectAllText = this.translate.instant('SELECT_ALL');
            options.selectAllDelimiter = ['', '']; // remove default square brackets of default text "[Select All]" => "Select All"
        }
        this.defaultOptions = options;
    }
    /**
     * Getter for the Column Filter itself
     * @return {?}
     */
    get columnFilter() {
        return this.columnDef && this.columnDef.filter;
    }
    /**
     * Getter for the Collection Options
     * @return {?}
     */
    get collectionOptions() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions;
    }
    /**
     * Getter for the Custom Structure if exist
     * @return {?}
     */
    get customStructure() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /**
     * Getter for the filter operator
     * @return {?}
     */
    get operator() {
        if (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator;
        }
        return this.isMultipleSelect ? OperatorType.in : OperatorType.equal;
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
        if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync)) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") for the MultipleSelect/SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        this.enableTranslateLabel = this.columnFilter.enableTranslateLabel;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
        this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
        this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        if (this.enableTranslateLabel && (!this.translate || typeof this.translate.instant !== 'function')) {
            throw new Error(`[select-editor] The ngx-translate TranslateService is required for the Select Filter to work correctly`);
        }
        // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
        // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
        const /** @type {?} */ newCollection = this.columnFilter.collection || [];
        this.renderDomElement(newCollection);
        // on every Filter which have a "collection" or a "collectionAsync"
        // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
        // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
        const /** @type {?} */ collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
        if (collectionAsync) {
            this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
        }
    }
    /**
     * Clear the filter values
     * @return {?}
     */
    clear() {
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
            this.$filterElm.multipleSelect('setSelects', []);
            this.$filterElm.removeClass('filled');
            this.searchTerms = [];
            this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true });
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            // remove event watcher
            this.$filterElm.off().remove();
        }
        // also dispose of all Subscriptions
        this.subscriptions = unsubscribeAllObservables(this.subscriptions);
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
     * user might want to filter certain items of the collection
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    filterCollection(inputCollection) {
        let /** @type {?} */ outputCollection = inputCollection;
        // user might want to filter certain items of the collection
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionFilterBy) {
            const /** @type {?} */ filterBy = this.columnFilter.collectionFilterBy;
            const /** @type {?} */ filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
            outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    }
    /**
     * user might want to sort the collection in a certain way
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    sortCollection(inputCollection) {
        let /** @type {?} */ outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionSortBy) {
            const /** @type {?} */ sortBy = this.columnFilter.collectionSortBy;
            outputCollection = this.collectionService.sortCollection(outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    }
    /**
     * @param {?} collectionAsync
     * @return {?}
     */
    renderOptionsAsync(collectionAsync) {
        return __awaiter(this, void 0, void 0, function* () {
            let /** @type {?} */ awaitedCollection = [];
            if (collectionAsync) {
                awaitedCollection = yield castToPromise(collectionAsync);
                this.renderDomElementFromCollectionAsync(awaitedCollection);
                // because we accept Promises & HttpClient Observable only execute once
                // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
                // doing this provide the user a way to call a "collectionAsync.next()"
                this.createCollectionAsyncSubject();
            }
        });
    }
    /**
     * Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it
     * @return {?}
     */
    createCollectionAsyncSubject() {
        const /** @type {?} */ newCollectionAsync = new Subject();
        this.columnFilter.collectionAsync = newCollectionAsync;
        this.subscriptions.push(newCollectionAsync.subscribe(collection => this.renderDomElementFromCollectionAsync(collection)));
    }
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     * @param {?} collection
     * @return {?}
     */
    renderDomElementFromCollectionAsync(collection) {
        if (this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the Select Filter, the collection is not a valid array.');
        }
        // copy over the array received from the async call to the "collection" as the new collection to use
        // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
        this.columnFilter.collection = collection;
        // recreate Multiple Select after getting async collection
        this.renderDomElement(collection);
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    renderDomElement(collection) {
        if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('The "collection" passed to the Select Filter is not a valid array');
        }
        // user can optionally add a blank entry at the beginning of the collection
        if (this.collectionOptions && this.collectionOptions.addBlankEntry) {
            collection.unshift(this.createBlankEntry());
        }
        let /** @type {?} */ newCollection = collection;
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // step 1, create HTML string template
        const /** @type {?} */ filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);
        // step 2, create the DOM Element of the filter & pre-load search terms
        // also subscribe to the onClose event
        this.createDomElement(filterTemplate);
    }
    /**
     * Create the HTML template as a string
     * @param {?} optionCollection
     * @param {?} searchTerms
     * @return {?}
     */
    buildTemplateHtmlString(optionCollection, searchTerms) {
        let /** @type {?} */ options = '';
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        const /** @type {?} */ isRenderHtmlEnabled = this.columnFilter && this.columnFilter.enableRenderHtml || false;
        const /** @type {?} */ sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every(x => typeof x === 'string')) {
            optionCollection.forEach((option) => {
                const /** @type {?} */ selected = (searchTerms.findIndex((term) => term === option) >= 0) ? 'selected' : '';
                options += `<option value="${option}" label="${option}" ${selected}>${option}</option>`;
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    this.isFilled = true;
                }
            });
        }
        else {
            // array of objects will require a label/value pair unless a customStructure is passed
            optionCollection.forEach((option) => {
                if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error(`[select-filter] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')`);
                }
                const /** @type {?} */ labelKey = /** @type {?} */ ((option.labelKey || option[this.labelName]));
                const /** @type {?} */ selected = (searchTerms.findIndex((term) => term === option[this.valueName]) >= 0) ? 'selected' : '';
                const /** @type {?} */ labelText = ((option.labelKey || this.enableTranslateLabel) && labelKey) ? this.translate.instant(labelKey || ' ') : labelKey;
                let /** @type {?} */ prefixText = option[this.labelPrefixName] || '';
                let /** @type {?} */ suffixText = option[this.labelSuffixName] || '';
                let /** @type {?} */ optionLabel = option[this.optionLabel] || '';
                optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this.translate.instant(prefixText || ' ') : prefixText;
                suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this.translate.instant(suffixText || ' ') : suffixText;
                optionLabel = (this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? this.translate.instant(optionLabel || ' ') : optionLabel;
                // add to a temp array for joining purpose and filter out empty text
                const /** @type {?} */ tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text);
                let /** @type {?} */ optionText = tmpOptionArray.join(separatorBetweenLabels);
                // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                if (isRenderHtmlEnabled) {
                    // sanitize any unauthorized html tags like script and others
                    // for the remaining allowed tags we'll permit all attributes
                    const /** @type {?} */ sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
                    optionText = htmlEncode(sanitizedText);
                }
                // html text of each select option
                options += `<option value="${option[this.valueName]}" label="${optionLabel}" ${selected}>${optionText}</option>`;
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    this.isFilled = true;
                }
            });
        }
        return `<select class="ms-filter search-filter filter-${fieldId}" ${this.isMultipleSelect ? 'multiple="multiple"' : ''}>${options}</select>`;
    }
    /**
     * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
     * @return {?}
     */
    createBlankEntry() {
        const /** @type {?} */ blankEntry = {
            [this.labelName]: '',
            [this.valueName]: ''
        };
        if (this.labelPrefixName) {
            blankEntry[this.labelPrefixName] = '';
        }
        if (this.labelSuffixName) {
            blankEntry[this.labelSuffixName] = '';
        }
        return blankEntry;
    }
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param {?} filterTemplate
     * @return {?}
     */
    createDomElement(filterTemplate) {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
        this.elementName = `filter-${fieldId}`;
        this.defaultOptions.name = this.elementName;
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error(`multiple-select.js was not found, make sure to modify your "angular-cli.json" file and include "../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js" and it's css or SASS file`);
        }
        this.$filterElm.attr('id', this.elementName);
        this.$filterElm.data('columnId', fieldId);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (this.isFilled) {
            this.$filterElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
            this.$filterElm.appendTo($headerElm);
        }
        // merge options & attach multiSelect
        const /** @type {?} */ elementOptions = Object.assign({}, this.defaultOptions, this.columnFilter.filterOptions);
        this.filterElmOptions = Object.assign({}, this.defaultOptions, elementOptions);
        this.$filterElm = this.$filterElm.multipleSelect(this.filterElmOptions);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MultipleSelectFilter extends SelectFilter {
    /**
     * Initialize the Filter
     * @param {?} translate
     * @param {?} collectionService
     */
    constructor(translate, collectionService) {
        super(translate, collectionService, true);
        this.translate = translate;
        this.collectionService = collectionService;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NativeSelectFilter {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
    }
    /**
     * @return {?}
     */
    get operator() {
        return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
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
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        let /** @type {?} */ searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        if (typeof searchTerm === 'boolean' || typeof searchTerm === 'number') {
            searchTerm = `${searchTerm}`;
        }
        // step 1, create HTML string template
        const /** @type {?} */ filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change((e) => {
            const /** @type {?} */ value = e && e.target && e.target.value || '';
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
                this._clearFilterTriggered = false; // reset flag for next use
                this.$filterElm.removeClass('filled');
            }
            else {
                this.$filterElm.addClass('filled');
                this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value] });
            }
        });
    }
    /**
     * Clear the filter values
     * @return {?}
     */
    clear() {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            this.$filterElm.val('');
            this.$filterElm.trigger('change');
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
        if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ optionCollection = this.columnDef.filter.collection || [];
        const /** @type {?} */ labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        const /** @type {?} */ valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        let /** @type {?} */ options = '';
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every(x => typeof x === 'string')) {
            optionCollection.forEach((option) => {
                options += `<option value="${option}" label="${option}">${option}</option>`;
            });
        }
        else {
            optionCollection.forEach((option) => {
                if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.select, collection: [ { value: '1', label: 'One' } ]')`);
                }
                const /** @type {?} */ labelKey = option.labelKey || option[labelName];
                const /** @type {?} */ textLabel = ((option.labelKey || this.columnDef.filter.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;
                options += `<option value="${option[valueName]}">${textLabel}</option>`;
            });
        }
        return `<select class="form-control search-filter filter-${fieldId}">${options}</select>`;
    }
    /**
     * From the html template string, create a DOM element
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(filterTemplate, searchTerm) {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        const /** @type {?} */ $filterElm = $(filterTemplate);
        const /** @type {?} */ searchTermInput = /** @type {?} */ ((searchTerm || ''));
        $filterElm.val(searchTermInput);
        $filterElm.attr('id', `filter-${fieldId}`);
        $filterElm.data('columnId', fieldId);
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
class SingleSelectFilter extends SelectFilter {
    /**
     * Initialize the Filter
     * @param {?} translate
     * @param {?} collectionService
     */
    constructor(translate, collectionService) {
        super(translate, collectionService, false);
        this.translate = translate;
        this.collectionService = collectionService;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const DEFAULT_MIN_VALUE$1 = 0;
const DEFAULT_MAX_VALUE$1 = 100;
const DEFAULT_STEP$1 = 1;
class SliderFilter {
    constructor() {
        this._clearFilterTriggered = false;
    }
    /**
     * Getter for the Filter Generic Params
     * @return {?}
     */
    get filterParams() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
    }
    /**
     * Getter for the `filter` properties
     * @return {?}
     */
    get filterProperties() {
        return this.columnDef && this.columnDef.filter;
    }
    /**
     * @return {?}
     */
    get operator() {
        return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        if (!args) {
            throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // define the input & slider number IDs
        this._elementRangeInputId = `rangeInput_${this.columnDef.field}`;
        this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}`;
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        const /** @type {?} */ searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        const /** @type {?} */ filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change((e) => {
            const /** @type {?} */ value = e && e.target && e.target.value || '';
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
                this._clearFilterTriggered = false; // reset flag for next use
                this.$filterElm.removeClass('filled');
            }
            else {
                this.$filterElm.addClass('filled');
                this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value] });
            }
        });
        // if user chose to display the slider number on the right side, then update it every time it changes
        // we need to use both "input" and "change" event to be all cross-browser
        if (!this.filterParams.hideSliderNumber) {
            this.$filterElm.on('input change', (e) => {
                const /** @type {?} */ value = e && e.target && e.target.value || '';
                if (value) {
                    document.getElementById(this._elementRangeOutputId).innerHTML = value;
                }
            });
        }
    }
    /**
     * Clear the filter value
     * @return {?}
     */
    clear() {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            const /** @type {?} */ clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE$1;
            this.$filterElm.children('input').val(clearedValue);
            this.$filterElm.children('div.input-group-addon.input-group-append').children().html(clearedValue);
            this.$filterElm.trigger('change');
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
     * Create the HTML template as a string
     * @return {?}
     */
    buildTemplateHtmlString() {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE$1;
        const /** @type {?} */ maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE$1;
        const /** @type {?} */ defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        const /** @type {?} */ step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP$1;
        if (this.filterParams.hideSliderNumber) {
            return `
      <div class="search-filter filter-${fieldId}">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-filter-input range" />
      </div>`;
        }
        return `
      <div class="input-group search-filter filter-${fieldId}">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-filter-input range" />
        <div class="input-group-addon input-group-append slider-value">
          <span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span>
        </div>
      </div>`;
    }
    /**
     * From the html template string, create a DOM element
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(filterTemplate, searchTerm) {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        const /** @type {?} */ $filterElm = $(filterTemplate);
        const /** @type {?} */ searchTermInput = /** @type {?} */ ((searchTerm || '0'));
        $filterElm.children('input').val(searchTermInput);
        $filterElm.children('div.input-group-addon.input-group-append').children().html(searchTermInput);
        $filterElm.attr('id', `filter-${fieldId}`);
        $filterElm.data('columnId', fieldId);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
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
const Filters = {
    /** Compound Date Filter (compound of Operator + Date picker) */
    compoundDate: CompoundDateFilter,
    /** Compound Input Filter (compound of Operator + Input) */
    compoundInput: CompoundInputFilter,
    /** Compound Slider Filter (compound of Operator + Slider) */
    compoundSlider: CompoundSliderFilter,
    /** Default Filter, input type text filter */
    input: InputFilter,
    /** Slider Filter */
    slider: SliderFilter,
    /** Multiple Select filter, which uses 3rd party lib "multiple-select.js" */
    multipleSelect: MultipleSelectFilter,
    /** Single Select filter, which uses 3rd party lib "multiple-select.js" */
    singleSelect: SingleSelectFilter,
    /** Select filter, which uses native DOM element select */
    select: NativeSelectFilter
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Options that can be passed to the Bootstrap-Datetimepicker directly
 */
const GlobalGridOptions = {
    alwaysShowVerticalScroll: true,
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
    defaultFilter: Filters.input,
    editable: false,
    enableAutoResize: true,
    enableAutoSizeColumns: true,
    enableCellNavigation: false,
    enableColumnPicker: true,
    enableColumnReorder: true,
    enableCustomDataView: false,
    enableExport: true,
    enableGridMenu: true,
    enableHeaderMenu: true,
    enableMouseHoverHighlightRow: true,
    enableSorting: true,
    enableTextSelectionOnCells: true,
    explicitInitialization: true,
    exportOptions: {
        delimiter: DelimiterType.comma,
        exportWithFormatter: false,
        filename: 'export',
        format: FileType.csv,
        groupingAggregatorRowText: '',
        sanitizeDataExport: false,
        useUtf8WithBom: true
    },
    forceFitColumns: false,
    gridMenu: {
        hideClearAllFiltersCommand: false,
        hideClearAllSortingCommand: false,
        hideExportCsvCommand: false,
        hideExportTextDelimitedCommand: true,
        hideForceFitButton: false,
        hideRefreshDatasetCommand: false,
        hideSyncResizeButton: true,
        hideToggleFilterCommand: false,
        iconCssClass: 'fa fa-bars',
        iconClearAllFiltersCommand: 'fa fa-filter text-danger',
        iconClearAllSortingCommand: 'fa fa-unsorted text-danger',
        iconExportCsvCommand: 'fa fa-download',
        iconExportTextDelimitedCommand: 'fa fa-download',
        iconRefreshDatasetCommand: 'fa fa-refresh',
        iconToggleFilterCommand: 'fa fa-random',
        menuWidth: 16,
        resizeOnShowHeaderRow: true
    },
    headerMenu: {
        autoAlign: true,
        autoAlignOffset: 12,
        minWidth: 140,
        iconSortAscCommand: 'fa fa-sort-asc',
        iconSortDescCommand: 'fa fa-sort-desc',
        iconColumnHideCommand: 'fa fa-times',
        hideColumnHideCommand: false,
        hideSortCommands: false
    },
    headerRowHeight: 35,
    multiColumnSort: true,
    numberedMultiColumnSort: true,
    tristateMultiColumnSort: false,
    sortColNumberInSeparateSpan: true,
    suppressActiveCellChangeOnEdit: true,
    pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: 25,
        totalItems: 0
    },
    rowHeight: 35,
    topPanelHeight: 35
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlickgridConfig {
    constructor() {
        this.options = GlobalGridOptions;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FilterFactory {
    /**
     * @param {?} config
     * @param {?} translate
     * @param {?} collectionService
     */
    constructor(config, translate, collectionService) {
        this.config = config;
        this.translate = translate;
        this.collectionService = collectionService;
        this._options = this.config.options;
    }
    /**
     * @param {?} columnFilter
     * @return {?}
     */
    createFilter(columnFilter) {
        let /** @type {?} */ filter;
        if (columnFilter && columnFilter.model) {
            filter = typeof columnFilter.model === 'function' ? new columnFilter.model(this.translate, this.collectionService) : columnFilter.model;
        }
        // fallback to the default filter
        if (!filter && this._options.defaultFilter) {
            filter = new this._options.defaultFilter(this.translate, this.collectionService);
        }
        return filter;
    }
}
FilterFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FilterFactory.ctorParameters = () => [
    { type: SlickgridConfig, },
    { type: TranslateService, },
    { type: CollectionService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const isequal = isequal_; // patch to fix rollup to work
class FilterService {
    /**
     * @param {?} filterFactory
     */
    constructor(filterFactory) {
        this.filterFactory = filterFactory;
        this._eventHandler = new Slick.EventHandler();
        this._filters = [];
        this._columnFilters = {};
        this.onFilterChanged = new Subject();
        this.onFilterCleared = new Subject();
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * Getter for the Column Definitions pulled through the Grid Object
     * @return {?}
     */
    get _columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /**
     * @param {?} grid
     * @return {?}
     */
    init(grid) {
        this._grid = grid;
    }
    /**
     * Attach a backend filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @return {?}
     */
    attachBackendOnFilter(grid) {
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
            const /** @type {?} */ backendApi = this._gridOptions.backendServiceApi;
            if (!backendApi || !backendApi.process || !backendApi.service) {
                throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
            }
            try {
                // keep start time & end timestamps & return it after process execution
                const /** @type {?} */ startTime = new Date();
                // run a preProcess callback if defined
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                // call the service to get a query back
                const /** @type {?} */ query = yield backendApi.service.processOnFilterChanged(event, args);
                // emit an onFilterChanged event
                if (args && !args.clearFilterTriggered) {
                    this.emitFilterChanged('remote');
                }
                // the process could be an Observable (like HttpClient) or a Promise
                // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                const /** @type {?} */ observableOrPromise = backendApi.process(query);
                const /** @type {?} */ processResult = yield castToPromise(observableOrPromise);
                const /** @type {?} */ endTime = new Date();
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi.postProcess !== undefined) {
                    if (processResult instanceof Object) {
                        processResult.statistics = {
                            startTime,
                            endTime,
                            executionTime: endTime.valueOf() - startTime.valueOf(),
                            totalItemCount: this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems
                        };
                    }
                    backendApi.postProcess(processResult);
                }
            }
            catch (/** @type {?} */ e) {
                if (backendApi && backendApi.onError) {
                    backendApi.onError(e);
                }
                else {
                    throw e;
                }
            }
        });
    }
    /**
     * Attach a local filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    attachLocalOnFilter(grid, dataView) {
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
            if (args && !args.clearFilterTriggered) {
                this.emitFilterChanged('local');
            }
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
        this._filters.forEach((filter) => {
            if (filter && filter.clear) {
                // clear element and trigger a change
                filter.clear();
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
        // emit an event when filters are all cleared
        this.onFilterCleared.next(true);
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
            const /** @type {?} */ fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field;
            const /** @type {?} */ fieldType = columnDef.type || FieldType.string;
            const /** @type {?} */ filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
            let /** @type {?} */ cellValue = item[fieldName];
            // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
            if (fieldName.indexOf('.') >= 0) {
                cellValue = getDescendantProperty(item, fieldName);
            }
            // if we find searchTerms use them but make a deep copy so that we don't affect original array
            // we might have to overwrite the value(s) locally that are returned
            // e.g: we don't want to operator within the search value, since it will fail filter condition check trigger afterward
            const /** @type {?} */ searchValues = (columnFilter && columnFilter.searchTerms) ? [...columnFilter.searchTerms] : null;
            let /** @type {?} */ fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';
            fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
            const /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
            let /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
            const /** @type {?} */ searchTerm = (!!matches) ? matches[2] : '';
            const /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
            if (searchValues && searchValues.length > 1) {
                fieldSearchValue = searchValues.join(',');
            }
            else if (typeof fieldSearchValue === 'string') {
                // escaping the search value
                fieldSearchValue = fieldSearchValue.replace(`'`, `''`); // escape single quotes by doubling them
                if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                    operator = (operator === '*' || operator === '*z') ? OperatorType.endsWith : OperatorType.startsWith;
                }
            }
            // no need to query if search value is empty
            if (searchTerm === '' && (!searchValues || (Array.isArray(searchValues) && searchValues.length === 0))) {
                return true;
            }
            // if search value has a regex match we will only keep the value without the operator
            // in this case we need to overwrite the returned search values to truncate operator from the string search
            if (Array.isArray(matches) && matches.length >= 1 && (Array.isArray(searchValues) && searchValues.length === 1)) {
                searchValues[0] = searchTerm;
            }
            // filter search terms should always be string type (even though we permit the end user to input numbers)
            // so make sure each term are strings, if user has some default search terms, we will cast them to string
            if (searchValues && Array.isArray(searchValues)) {
                for (let /** @type {?} */ k = 0, /** @type {?} */ ln = searchValues.length; k < ln; k++) {
                    // make sure all search terms are strings
                    searchValues[k] = ((searchValues[k] === undefined || searchValues[k] === null) ? '' : searchValues[k]) + '';
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
                searchTerms: searchValues,
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
                if (columnFilter.operator) {
                    filter.operator = columnFilter.operator;
                }
                if (Array.isArray(filter.searchTerms) && filter.searchTerms.length > 0 && filter.searchTerms[0] !== '') {
                    currentFilters.push(filter);
                }
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
            const /** @type {?} */ searchTerm = ((e && e.target) ? (/** @type {?} */ (e.target)).value : undefined);
            const /** @type {?} */ searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
            const /** @type {?} */ columnDef = args.columnDef || null;
            const /** @type {?} */ columnId = columnDef ? (columnDef.id || '') : '';
            const /** @type {?} */ operator = args.operator || undefined;
            const /** @type {?} */ hasSearchTerms = searchTerms && Array.isArray(searchTerms);
            const /** @type {?} */ termsCount = hasSearchTerms && searchTerms.length;
            const /** @type {?} */ oldColumnFilters = Object.assign({}, this._columnFilters);
            if (!hasSearchTerms || termsCount === 0 || (termsCount === 1 && searchTerms[0] === '')) {
                // delete the property from the columnFilters when it becomes empty
                // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
                delete this._columnFilters[columnId];
            }
            else {
                const /** @type {?} */ colId = /** @type {?} */ ('' + columnId);
                const /** @type {?} */ colFilter = {
                    columnId: colId,
                    columnDef,
                    searchTerms,
                };
                if (operator) {
                    colFilter.operator = operator;
                }
                this._columnFilters[colId] = colFilter;
            }
            // trigger an event only if Filters changed
            if (!isequal(oldColumnFilters, this._columnFilters)) {
                this.triggerEvent(this._slickSubscriber, {
                    clearFilterTriggered: args && args.clearFilterTriggered,
                    columnId,
                    columnDef: args.columnDef || null,
                    columnFilters: this._columnFilters,
                    operator,
                    searchTerms,
                    serviceOptions: this._onFilterChangedOptions,
                    grid: this._grid
                }, e);
            }
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
            let /** @type {?} */ operator;
            const /** @type {?} */ filter = this.filterFactory.createFilter(args.column.filter);
            operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (filter && filter.operator) || undefined;
            if (this._columnFilters[columnDef.id]) {
                searchTerms = this._columnFilters[columnDef.id].searchTerms || undefined;
                operator = this._columnFilters[columnDef.id].operator || undefined;
            }
            else if (columnDef.filter) {
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // because of that we need to first get searchTerm(s) from the columnFilters (that is what the user last entered)
                searchTerms = columnDef.filter.searchTerms || undefined;
                this.updateColumnFilters(searchTerms, columnDef, operator);
            }
            const /** @type {?} */ filterArguments = {
                grid: this._grid,
                operator,
                searchTerms,
                columnDef,
                callback: this.callbackSearchEvent.bind(this)
            };
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
                if (searchTerms && filter.setValues) {
                    filter.setValues(searchTerms);
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
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     * @return {?}
     */
    populateColumnFilterSearchTerms() {
        if (this._gridOptions.presets && Array.isArray(this._gridOptions.presets.filters) && this._gridOptions.presets.filters.length > 0) {
            const /** @type {?} */ filters = this._gridOptions.presets.filters;
            this._columnDefinitions.forEach((columnDef) => {
                // clear any columnDef searchTerms before applying Presets
                if (columnDef.filter && columnDef.filter.searchTerms) {
                    delete columnDef.filter.searchTerms;
                }
                // from each presets, we will find the associated columnDef and apply the preset searchTerms & operator if there is
                const /** @type {?} */ columnPreset = filters.find((presetFilter) => {
                    return presetFilter.columnId === columnDef.id;
                });
                if (columnPreset && columnPreset.searchTerms && Array.isArray(columnPreset.searchTerms)) {
                    columnDef.filter = columnDef.filter || {};
                    columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || '';
                    columnDef.filter.searchTerms = columnPreset.searchTerms;
                }
            });
        }
    }
    /**
     * @param {?} searchTerms
     * @param {?} columnDef
     * @param {?=} operator
     * @return {?}
     */
    updateColumnFilters(searchTerms, columnDef, operator) {
        if (searchTerms && columnDef) {
            // this._columnFilters.searchTerms = searchTerms;
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef,
                searchTerms,
                operator
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
    { type: FilterFactory, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SortService {
    constructor() {
        this._currentLocalSorters = [];
        this._eventHandler = new Slick.EventHandler();
        this._isBackendGrid = false;
        this.onSortChanged = new Subject();
        this.onSortCleared = new Subject();
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * Getter for the Column Definitions pulled through the Grid Object
     * @return {?}
     */
    get _columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView SlickGrid DataView object
     * @return {?}
     */
    attachBackendOnSort(grid, dataView) {
        this._isBackendGrid = true;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onBackendSortChanged(event, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying to attach the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
            }
            const /** @type {?} */ gridOptions = args.grid.getOptions() || {};
            const /** @type {?} */ backendApi = gridOptions.backendServiceApi;
            if (!backendApi || !backendApi.process || !backendApi.service) {
                throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
            }
            try {
                // keep start time & end timestamps & return it after process execution
                const /** @type {?} */ startTime = new Date();
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                const /** @type {?} */ query = backendApi.service.processOnSortChanged(event, args);
                this.emitSortChanged('remote');
                // the process could be an Observable (like HttpClient) or a Promise
                // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                const /** @type {?} */ observableOrPromise = backendApi.process(query);
                const /** @type {?} */ processResult = yield castToPromise(observableOrPromise);
                const /** @type {?} */ endTime = new Date();
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi.postProcess) {
                    if (processResult instanceof Object) {
                        processResult.statistics = {
                            startTime,
                            endTime,
                            executionTime: endTime.valueOf() - startTime.valueOf(),
                            totalItemCount: this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems
                        };
                    }
                    backendApi.postProcess(processResult);
                }
            }
            catch (/** @type {?} */ e) {
                if (backendApi && backendApi.onError) {
                    backendApi.onError(e);
                }
                else {
                    throw e;
                }
            }
        });
    }
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    attachLocalOnSort(grid, dataView) {
        this._isBackendGrid = false;
        this._grid = grid;
        this._dataView = dataView;
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
            this.onLocalSortChanged(grid, dataView, sortColumns);
            this.emitSortChanged('local');
        });
    }
    /**
     * @return {?}
     */
    clearSorting() {
        if (this._grid && this._gridOptions && this._dataView) {
            // remove any sort icons (this setSortColumns function call really does only that)
            this._grid.setSortColumns([]);
            // we also need to trigger a sort change
            // for a backend grid, we will trigger a backend sort changed with an empty sort columns array
            // however for a local grid, we need to pass a sort column and so we will sort by the 1st column
            if (this._isBackendGrid) {
                this.onBackendSortChanged(undefined, { grid: this._grid, sortCols: [] });
            }
            else {
                if (this._columnDefinitions && Array.isArray(this._columnDefinitions)) {
                    this.onLocalSortChanged(this._grid, this._dataView, new Array({ sortAsc: true, sortCol: this._columnDefinitions[0] }));
                }
            }
        }
        // set current sorter to empty & emit a sort changed event
        this._currentLocalSorters = [];
        // emit an event when filters are all cleared
        this.onSortCleared.next(true);
    }
    /**
     * @return {?}
     */
    getCurrentLocalSorters() {
        return this._currentLocalSorters;
    }
    /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     * @param {?=} columnId
     * @return {?}
     */
    getPreviousColumnSorts(columnId) {
        // getSortColumns() only returns sortAsc & columnId, we want the entire column definition
        const /** @type {?} */ oldSortColumns = this._grid.getSortColumns();
        // get the column definition but only keep column which are not equal to our current column
        const /** @type {?} */ sortedCols = oldSortColumns.reduce((cols, col) => {
            if (!columnId || col.columnId !== columnId) {
                cols.push({ sortCol: this._columnDefinitions[this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
            }
            return cols;
        }, []);
        return sortedCols;
    }
    /**
     * load any presets if there are any
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    loadLocalPresets(grid, dataView) {
        const /** @type {?} */ sortCols = [];
        this._currentLocalSorters = []; // reset current local sorters
        if (this._gridOptions && this._gridOptions.presets && this._gridOptions.presets.sorters) {
            const /** @type {?} */ sorters = this._gridOptions.presets.sorters;
            sorters.forEach((presetSorting) => {
                const /** @type {?} */ gridColumn = this._columnDefinitions.find((col) => col.id === presetSorting.columnId);
                if (gridColumn) {
                    sortCols.push({
                        columnId: gridColumn.id,
                        sortAsc: ((presetSorting.direction.toUpperCase() === SortDirection.ASC) ? true : false),
                        sortCol: gridColumn
                    });
                    // keep current sorters
                    this._currentLocalSorters.push({
                        columnId: gridColumn.id + '',
                        direction: /** @type {?} */ (presetSorting.direction.toUpperCase())
                    });
                }
            });
            if (sortCols.length > 0) {
                this.onLocalSortChanged(grid, dataView, sortCols);
                grid.setSortColumns(sortCols); // use this to add sort icon(s) in UI
            }
        }
    }
    /**
     * @param {?} grid
     * @param {?} dataView
     * @param {?} sortColumns
     * @return {?}
     */
    onLocalSortChanged(grid, dataView, sortColumns) {
        dataView.sort((dataRow1, dataRow2) => {
            for (let /** @type {?} */ i = 0, /** @type {?} */ l = sortColumns.length; i < l; i++) {
                const /** @type {?} */ columnSortObj = sortColumns[i];
                if (columnSortObj && columnSortObj.sortCol) {
                    const /** @type {?} */ sortDirection = columnSortObj.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
                    const /** @type {?} */ sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldFilter || columnSortObj.sortCol.field;
                    const /** @type {?} */ fieldType = columnSortObj.sortCol.type || FieldType.string;
                    let /** @type {?} */ value1 = dataRow1[sortField];
                    let /** @type {?} */ value2 = dataRow2[sortField];
                    // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                    if (sortField && sortField.indexOf('.') >= 0) {
                        value1 = getDescendantProperty(dataRow1, sortField);
                        value2 = getDescendantProperty(dataRow2, sortField);
                    }
                    const /** @type {?} */ sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
                    if (sortResult !== SortDirectionNumber.neutral) {
                        return sortResult;
                    }
                }
            }
            return SortDirectionNumber.neutral;
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
class GridMenuExtension {
    /**
     * @param {?} exportService
     * @param {?} extensionUtility
     * @param {?} filterService
     * @param {?} sharedService
     * @param {?} sortService
     * @param {?} translate
     */
    constructor(exportService, extensionUtility, filterService, sharedService, sortService, translate) {
        this.exportService = exportService;
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this._areVisibleColumnDifferent = false;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    register() {
        // keep original user grid menu, useful when switching locale to translate
        this._userOriginalGridMenu = Object.assign({}, this.sharedService.gridOptions.gridMenu);
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.gridMenu);
            this.sharedService.gridOptions.gridMenu = Object.assign({}, this.getDefaultGridMenuOptions(), this.sharedService.gridOptions.gridMenu);
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = [...this._userOriginalGridMenu.customItems || [], ...this.addGridMenuCustomCommands()];
            this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
            this._extension = new Slick.Controls.GridMenu(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
            if (this.sharedService.grid && this.sharedService.gridOptions.gridMenu) {
                this._eventHandler.subscribe(this._extension.onBeforeMenuShow, (e, args) => {
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onBeforeMenuShow === 'function') {
                        this.sharedService.gridOptions.gridMenu.onBeforeMenuShow(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onColumnsChanged, (e, args) => {
                    this._areVisibleColumnDifferent = true;
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onColumnsChanged === 'function') {
                        this.sharedService.gridOptions.gridMenu.onColumnsChanged(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onCommand, (e, args) => {
                    this.executeGridMenuInternalCustomCommands(e, args);
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onCommand === 'function') {
                        this.sharedService.gridOptions.gridMenu.onCommand(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onMenuClose, (e, args) => {
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onMenuClose === 'function') {
                        this.sharedService.gridOptions.gridMenu.onMenuClose(e, args);
                    }
                    // we also want to resize the columns if the user decided to hide certain column(s)
                    if (this.sharedService.grid && typeof this.sharedService.grid.autosizeColumns === 'function') {
                        // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
                        const /** @type {?} */ gridUid = this.sharedService.grid.getUID();
                        if (this._areVisibleColumnDifferent && gridUid && $(`.${gridUid}`).length > 0) {
                            if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                                this.sharedService.grid.autosizeColumns();
                            }
                            this._areVisibleColumnDifferent = false;
                        }
                    }
                });
            }
            return this._extension;
        }
        return null;
    }
    /**
     * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
     * These are the default internal custom commands
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    executeGridMenuInternalCustomCommands(e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'clear-filter':
                    this.filterService.clearFilters();
                    this.sharedService.dataView.refresh();
                    break;
                case 'clear-sorting':
                    this.sortService.clearSorting();
                    this.sharedService.dataView.refresh();
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
                    this.sharedService.grid.setHeaderRowVisibility(!this.sharedService.grid.getOptions().showHeaderRow);
                    break;
                case 'toggle-toppanel':
                    this.sharedService.grid.setTopPanelVisibility(!this.sharedService.grid.getOptions().showTopPanel);
                    break;
                case 'refresh-dataset':
                    this.refreshBackendDataset();
                    break;
                default:
                    break;
            }
        }
    }
    /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    refreshBackendDataset(gridOptions) {
        let /** @type {?} */ query = '';
        // user can pass new set of grid options which will override current ones
        if (gridOptions) {
            this.sharedService.gridOptions = Object.assign({}, this.sharedService.gridOptions, gridOptions);
        }
        const /** @type {?} */ backendApi = this.sharedService.gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        if (backendApi.service) {
            query = backendApi.service.buildQuery();
        }
        if (query && query !== '') {
            // keep start time & end timestamps & return it after process execution
            const /** @type {?} */ startTime = new Date();
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // the process could be an Observable (like HttpClient) or a Promise
            // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
            const /** @type {?} */ observableOrPromise = backendApi.process(query);
            castToPromise(observableOrPromise).then((processResult) => {
                const /** @type {?} */ endTime = new Date();
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi && backendApi.postProcess) {
                    if (processResult instanceof Object) {
                        processResult.statistics = {
                            startTime,
                            endTime,
                            executionTime: endTime.valueOf() - startTime.valueOf(),
                            totalItemCount: this.sharedService.gridOptions && this.sharedService.gridOptions.pagination && this.sharedService.gridOptions.pagination.totalItems
                        };
                    }
                    backendApi.postProcess(processResult);
                }
            });
        }
    }
    /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @return {?}
     */
    addGridMenuCustomCommands() {
        const /** @type {?} */ backendApi = this.sharedService.gridOptions.backendServiceApi || null;
        const /** @type {?} */ gridMenuCustomItems = [];
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableFiltering) {
            // show grid menu: clear all filters
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllFiltersCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : Constants.TEXT_CLEAR_ALL_FILTERS,
                    disabled: false,
                    command: 'clear-filter',
                    positionOrder: 50
                });
            }
            // show grid menu: toggle filter row
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideToggleFilterCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconToggleFilterCommand || 'fa fa-random',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : Constants.TEXT_TOGGLE_FILTER_ROW,
                    disabled: false,
                    command: 'toggle-filter',
                    positionOrder: 52
                });
            }
            // show grid menu: refresh dataset
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideRefreshDatasetCommand && backendApi) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconRefreshDatasetCommand || 'fa fa-refresh',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('REFRESH_DATASET') : Constants.TEXT_REFRESH_DATASET,
                    disabled: false,
                    command: 'refresh-dataset',
                    positionOrder: 54
                });
            }
        }
        if (this.sharedService.gridOptions.enableSorting) {
            // show grid menu: clear all sorting
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllSortingCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_SORTING') : Constants.TEXT_CLEAR_ALL_SORTING,
                    disabled: false,
                    command: 'clear-sorting',
                    positionOrder: 51
                });
            }
        }
        // show grid menu: export to file
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportCsvCommand) {
            gridMenuCustomItems.push({
                iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportCsvCommand || 'fa fa-download',
                title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : Constants.TEXT_EXPORT_IN_CSV_FORMAT,
                disabled: false,
                command: 'export-csv',
                positionOrder: 53
            });
        }
        // show grid menu: export to text file as tab delimited
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportTextDelimitedCommand) {
            gridMenuCustomItems.push({
                iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportTextDelimitedCommand || 'fa fa-download',
                title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : Constants.TEXT_EXPORT_IN_TEXT_FORMAT,
                disabled: false,
                command: 'export-text-delimited',
                positionOrder: 54
            });
        }
        // add the custom "Commands" title if there are any commands
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && (gridMenuCustomItems.length > 0 || (this.sharedService.gridOptions.gridMenu.customItems && this.sharedService.gridOptions.gridMenu.customItems.length > 0))) {
            this.sharedService.gridOptions.gridMenu.customTitle = this.sharedService.gridOptions.gridMenu.customTitle || this.extensionUtility.getPickerTitleOutputString('customTitle', 'gridMenu');
        }
        return gridMenuCustomItems;
    }
    /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    executeHeaderMenuInternalCommands(e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'hide':
                    this.hideColumn(args.column);
                    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                        this.sharedService.grid.autosizeColumns();
                    }
                    break;
                case 'sort-asc':
                case 'sort-desc':
                    // get previously sorted columns
                    const /** @type {?} */ cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
                    // add to the column array, the column sorted by the header menu
                    cols.push({ sortCol: args.column, sortAsc: (args.command === 'sort-asc') });
                    if (this.sharedService.gridOptions.backendServiceApi) {
                        this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid: this.sharedService.grid });
                    }
                    else {
                        this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, cols);
                    }
                    // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                    const /** @type {?} */ newSortColumns = cols.map((col) => {
                        return {
                            columnId: col && col.sortCol && col.sortCol.id,
                            sortAsc: col && col.sortAsc
                        };
                    });
                    this.sharedService.grid.setSortColumns(newSortColumns); // add sort icon in UI
                    break;
                default:
                    break;
            }
        }
    }
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    hideColumn(column) {
        if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            const /** @type {?} */ columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    }
    /**
     * Translate the Grid Menu titles and column picker
     * @return {?}
     */
    translateGridMenu() {
        // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
        // we also need to call the control init so that it takes the new Grid object with latest values
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customItems = [];
            this.emptyGridMenuTitles();
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = [...this._userOriginalGridMenu.customItems || [], ...this.addGridMenuCustomCommands()];
            this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
            this.sharedService.gridOptions.gridMenu.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu');
            this.sharedService.gridOptions.gridMenu.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu');
            this.sharedService.gridOptions.gridMenu.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu');
            // translate all columns (including non-visible)
            this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
            // re-initialize the Grid Menu, that will recreate all the menus & list
            // doing an "init()" won't drop any existing command attached
            if (this._extension.init) {
                this._extension.init(this.sharedService.grid);
            }
        }
    }
    /**
     * @return {?}
     */
    emptyGridMenuTitles() {
        if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customTitle = '';
            this.sharedService.gridOptions.gridMenu.columnTitle = '';
            this.sharedService.gridOptions.gridMenu.forceFitTitle = '';
            this.sharedService.gridOptions.gridMenu.syncResizeTitle = '';
        }
    }
    /**
     * @return {?} default Grid Menu options
     */
    getDefaultGridMenuOptions() {
        return {
            customTitle: undefined,
            columnTitle: this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu'),
            forceFitTitle: this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu'),
            syncResizeTitle: this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu'),
            iconCssClass: 'fa fa-bars',
            menuWidth: 18,
            customItems: [],
            hideClearAllFiltersCommand: false,
            hideRefreshDatasetCommand: false,
            hideToggleFilterCommand: false,
        };
    }
}
GridMenuExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GridMenuExtension.ctorParameters = () => [
    { type: ExportService, },
    { type: ExtensionUtility, },
    { type: FilterService, },
    { type: SharedService, },
    { type: SortService, },
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupItemMetaProviderExtension {
    /**
     * @param {?} sharedService
     */
    constructor(sharedService) {
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * register the group item metadata provider to add expand/collapse group handlers
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid) {
            this._extension = this.sharedService.groupItemMetadataProvider || {};
            this.sharedService.grid.registerPlugin(this._extension);
            return this._extension;
        }
        return null;
    }
}
GroupItemMetaProviderExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GroupItemMetaProviderExtension.ctorParameters = () => [
    { type: SharedService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HeaderButtonExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.headerButton);
            this._extension = new Slick.Plugins.HeaderButtons(this.sharedService.gridOptions.headerButton || {});
            this.sharedService.grid.registerPlugin(this._extension);
            this._eventHandler.subscribe(this._extension.onCommand, (e, args) => {
                if (this.sharedService.gridOptions.headerButton && typeof this.sharedService.gridOptions.headerButton.onCommand === 'function') {
                    this.sharedService.gridOptions.headerButton.onCommand(e, args);
                }
            });
            return this._extension;
        }
        return null;
    }
}
HeaderButtonExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HeaderButtonExtension.ctorParameters = () => [
    { type: ExtensionUtility, },
    { type: SharedService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HeaderMenuExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     * @param {?} sortService
     * @param {?} translate
     */
    constructor(extensionUtility, sharedService, sortService, translate) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.headerMenu);
            this.sharedService.gridOptions.headerMenu = Object.assign({}, this.getDefaultHeaderMenuOptions(), this.sharedService.gridOptions.headerMenu);
            if (this.sharedService.gridOptions.enableHeaderMenu) {
                this.sharedService.gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this.sharedService.gridOptions, this.sharedService.columnDefinitions);
            }
            this._extension = new Slick.Plugins.HeaderMenu(this.sharedService.gridOptions.headerMenu);
            this.sharedService.grid.registerPlugin(this._extension);
            this._eventHandler.subscribe(this._extension.onCommand, (e, args) => {
                this.executeHeaderMenuInternalCommands(e, args);
                if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
                    this.sharedService.gridOptions.headerMenu.onCommand(e, args);
                }
            });
            this._eventHandler.subscribe(this._extension.onBeforeMenuShow, (e, args) => {
                if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                    this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
                }
            });
            return this._extension;
        }
        return null;
    }
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @param {?} options
     * @param {?} columnDefinitions
     * @return {?} header menu
     */
    addHeaderMenuCustomCommands(options, columnDefinitions) {
        const /** @type {?} */ headerMenuOptions = options.headerMenu || {};
        if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
            columnDefinitions.forEach((columnDef) => {
                if (columnDef && !columnDef.excludeFromHeaderMenu) {
                    if (!columnDef.header || !columnDef.header.menu) {
                        columnDef.header = {
                            menu: {
                                items: []
                            }
                        };
                    }
                    const /** @type {?} */ columnHeaderMenuItems = columnDef && columnDef.header && columnDef.header.menu && columnDef.header.menu.items || [];
                    // Sorting Commands
                    if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
                        if (columnHeaderMenuItems.filter((item) => item.command === 'sort-asc').length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                                title: options.enableTranslate ? this.translate.instant('SORT_ASCENDING') : Constants.TEXT_SORT_ASCENDING,
                                command: 'sort-asc',
                                positionOrder: 50
                            });
                        }
                        if (columnHeaderMenuItems.filter((item) => item.command === 'sort-desc').length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                                title: options.enableTranslate ? this.translate.instant('SORT_DESCENDING') : Constants.TEXT_SORT_DESCENDING,
                                command: 'sort-desc',
                                positionOrder: 51
                            });
                        }
                    }
                    // Hide Column Command
                    if (headerMenuOptions && !headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter((item) => item.command === 'hide').length === 0) {
                        columnHeaderMenuItems.push({
                            iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
                            title: options.enableTranslate ? this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
                            command: 'hide',
                            positionOrder: 52
                        });
                    }
                    this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                    // sort the custom items by their position in the list
                    columnHeaderMenuItems.sort((itemA, itemB) => {
                        if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
                            return itemA.positionOrder - itemB.positionOrder;
                        }
                        return 0;
                    });
                }
            });
        }
        return headerMenuOptions;
    }
    /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    executeHeaderMenuInternalCommands(e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'hide':
                    this.hideColumn(args.column);
                    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                        this.sharedService.grid.autosizeColumns();
                    }
                    break;
                case 'sort-asc':
                case 'sort-desc':
                    // get previously sorted columns
                    const /** @type {?} */ cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
                    // add to the column array, the column sorted by the header menu
                    cols.push({ sortCol: args.column, sortAsc: (args.command === 'sort-asc') });
                    if (this.sharedService.gridOptions.backendServiceApi) {
                        this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid: this.sharedService.grid });
                    }
                    else {
                        this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, cols);
                    }
                    // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                    const /** @type {?} */ newSortColumns = cols.map((col) => {
                        return {
                            columnId: col && col.sortCol && col.sortCol.id,
                            sortAsc: col && col.sortAsc
                        };
                    });
                    this.sharedService.grid.setSortColumns(newSortColumns); // add sort icon in UI
                    break;
                default:
                    break;
            }
        }
    }
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    hideColumn(column) {
        if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            const /** @type {?} */ columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    }
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param {?} columnDefinitions
     * @return {?}
     */
    resetHeaderMenuTranslations(columnDefinitions) {
        columnDefinitions.forEach((columnDef) => {
            if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
                if (!columnDef.excludeFromHeaderMenu) {
                    const /** @type {?} */ columnHeaderMenuItems = columnDef.header.menu.items || [];
                    columnHeaderMenuItems.forEach((item) => {
                        switch (item.command) {
                            case 'sort-asc':
                                item.title = this.translate.instant('SORT_ASCENDING') || Constants.TEXT_SORT_ASCENDING;
                                break;
                            case 'sort-desc':
                                item.title = this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                                break;
                            case 'hide':
                                item.title = this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                                break;
                        }
                        // re-translate if there's a "titleKey"
                        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate) {
                            this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                        }
                    });
                }
            }
        });
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    translateHeaderMenu() {
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
            this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
        }
    }
    /**
     * @return {?} default Header Menu options
     */
    getDefaultHeaderMenuOptions() {
        return {
            autoAlignOffset: 12,
            minWidth: 140,
            hideColumnHideCommand: false,
            hideSortCommands: false,
            title: ''
        };
    }
}
HeaderMenuExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HeaderMenuExtension.ctorParameters = () => [
    { type: ExtensionUtility, },
    { type: SharedService, },
    { type: SortService, },
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RowMoveManagerExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    register(rowSelectionPlugin) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.rowMoveManager);
            // this also requires the Row Selection Model to be registered as well
            if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
                rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
            }
            this._extension = new Slick.RowMoveManager(this.sharedService.gridOptions.rowMoveManager || { cancelEditOnDrag: true });
            this.sharedService.grid.registerPlugin(this._extension);
            // hook all events
            if (this.sharedService.grid && this.sharedService.gridOptions.rowMoveManager) {
                this._eventHandler.subscribe(this._extension.onBeforeMoveRows, (e, args) => {
                    if (this.sharedService.gridOptions.rowMoveManager && typeof this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows === 'function') {
                        this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onMoveRows, (e, args) => {
                    if (this.sharedService.gridOptions.rowMoveManager && typeof this.sharedService.gridOptions.rowMoveManager.onMoveRows === 'function') {
                        this.sharedService.gridOptions.rowMoveManager.onMoveRows(e, args);
                    }
                });
            }
            return this._extension;
        }
        return null;
    }
}
RowMoveManagerExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RowMoveManagerExtension.ctorParameters = () => [
    { type: ExtensionUtility, },
    { type: SharedService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RowSelectionExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
            this._extension = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
            this.sharedService.grid.setSelectionModel(this._extension);
            return this._extension;
        }
        return null;
    }
}
RowSelectionExtension.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RowSelectionExtension.ctorParameters = () => [
    { type: ExtensionUtility, },
    { type: SharedService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ExtensionService {
    /**
     * @param {?} autoTooltipExtension
     * @param {?} cellExternalCopyExtension
     * @param {?} checkboxSelectorExtension
     * @param {?} columnPickerExtension
     * @param {?} gridMenuExtension
     * @param {?} groupItemMetaExtension
     * @param {?} headerButtonExtension
     * @param {?} headerMenuExtension
     * @param {?} rowMoveManagerExtension
     * @param {?} rowSelectionExtension
     * @param {?} sharedService
     * @param {?} translate
     */
    constructor(autoTooltipExtension, cellExternalCopyExtension, checkboxSelectorExtension, columnPickerExtension, gridMenuExtension, groupItemMetaExtension, headerButtonExtension, headerMenuExtension, rowMoveManagerExtension, rowSelectionExtension, sharedService, translate) {
        this.autoTooltipExtension = autoTooltipExtension;
        this.cellExternalCopyExtension = cellExternalCopyExtension;
        this.checkboxSelectorExtension = checkboxSelectorExtension;
        this.columnPickerExtension = columnPickerExtension;
        this.gridMenuExtension = gridMenuExtension;
        this.groupItemMetaExtension = groupItemMetaExtension;
        this.headerButtonExtension = headerButtonExtension;
        this.headerMenuExtension = headerMenuExtension;
        this.rowMoveManagerExtension = rowMoveManagerExtension;
        this.rowSelectionExtension = rowSelectionExtension;
        this.sharedService = sharedService;
        this.translate = translate;
        this.extensionList = [];
    }
    /**
     * Dispose of all the controls & plugins
     * @return {?}
     */
    dispose() {
        this.sharedService.grid = null;
        this.sharedService.visibleColumns = [];
        // dispose of each control/plugin & reset the list
        this.extensionList.forEach((item) => {
            if (item && item.class && item.class.dispose) {
                item.class.dispose();
            }
        });
        this.extensionList = [];
    }
    /**
     * Get all columns (includes visible and non-visible)
     * @return {?}
     */
    getAllColumns() {
        return this.sharedService.allColumns || [];
    }
    /**
     * Get only visible columns
     * @return {?}
     */
    getVisibleColumns() {
        return this.sharedService.visibleColumns || [];
    }
    /**
     * Get all Extensions
     * @return {?}
     */
    getAllExtensions() {
        return this.extensionList;
    }
    /**
     * Get an Extension by it's name
     *  \@param name
     * @param {?} name
     * @return {?}
     */
    getExtensionByName(name) {
        return this.extensionList.find((p) => p.name === name);
    }
    /**
     * Auto-resize all the column in the grid to fit the grid width
     * @return {?}
     */
    autoResizeColumns() {
        this.sharedService.grid.autosizeColumns();
    }
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @return {?}
     */
    attachDifferentExtensions() {
        // make sure all columns are translated before creating ColumnPicker/GridMenu Controls
        // this is to avoid having hidden columns not being translated on first load
        if (this.sharedService.gridOptions.enableTranslate) {
            this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        }
        // Auto Tooltip Plugin
        if (this.sharedService.gridOptions.enableAutoTooltip) {
            if (this.autoTooltipExtension && this.autoTooltipExtension.register) {
                this.extensionList.push({ name: ExtensionName.autoTooltip, class: this.autoTooltipExtension, extension: this.autoTooltipExtension.register() });
            }
        }
        // Column Picker Control
        if (this.sharedService.gridOptions.enableColumnPicker) {
            if (this.columnPickerExtension && this.columnPickerExtension.register) {
                this.extensionList.push({ name: ExtensionName.columnPicker, class: this.columnPickerExtension, extension: this.columnPickerExtension.register() });
            }
        }
        // Grid Menu Control
        if (this.sharedService.gridOptions.enableGridMenu) {
            if (this.gridMenuExtension && this.gridMenuExtension.register) {
                this.extensionList.push({ name: ExtensionName.gridMenu, class: this.gridMenuExtension, extension: this.gridMenuExtension.register() });
            }
        }
        // Grouping Plugin
        // register the group item metadata provider to add expand/collapse group handlers
        if (this.sharedService.gridOptions.enableGrouping) {
            if (this.groupItemMetaExtension && this.groupItemMetaExtension.register) {
                this.extensionList.push({ name: ExtensionName.groupItemMetaProvider, class: this.groupItemMetaExtension, extension: this.groupItemMetaExtension.register() });
            }
        }
        // Checkbox Selector Plugin
        if (this.sharedService.gridOptions.enableCheckboxSelector) {
            if (this.checkboxSelectorExtension && this.checkboxSelectorExtension.register) {
                const /** @type {?} */ rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
                this.extensionList.push({ name: ExtensionName.checkboxSelector, class: this.checkboxSelectorExtension, extension: this.checkboxSelectorExtension.register(rowSelectionExtension) });
            }
        }
        // Row Move Manager Plugin
        if (this.sharedService.gridOptions.enableRowMoveManager) {
            if (this.rowMoveManagerExtension && this.rowMoveManagerExtension.register) {
                this.extensionList.push({ name: ExtensionName.rowMoveManager, class: this.rowMoveManagerExtension, extension: this.rowMoveManagerExtension.register() });
            }
        }
        // Row Selection Plugin
        if (!this.sharedService.gridOptions.enableCheckboxSelector && this.sharedService.gridOptions.enableRowSelection) {
            if (this.rowSelectionExtension && this.rowSelectionExtension.register) {
                this.extensionList.push({ name: ExtensionName.rowSelection, class: this.rowSelectionExtension, extension: this.rowSelectionExtension.register() });
            }
        }
        // Header Button Plugin
        if (this.sharedService.gridOptions.enableHeaderButton) {
            if (this.headerButtonExtension && this.headerButtonExtension.register) {
                this.extensionList.push({ name: ExtensionName.headerButton, class: this.headerButtonExtension, extension: this.headerButtonExtension.register() });
            }
        }
        // Header Menu Plugin
        if (this.sharedService.gridOptions.enableHeaderMenu) {
            if (this.headerMenuExtension && this.headerMenuExtension.register) {
                this.extensionList.push({ name: ExtensionName.headerMenu, class: this.headerMenuExtension, extension: this.headerMenuExtension.register() });
            }
        }
        // Cell External Copy Manager Plugin (Excel Like)
        if (this.sharedService.gridOptions.enableExcelCopyBuffer) {
            if (this.cellExternalCopyExtension && this.cellExternalCopyExtension.register) {
                this.extensionList.push({ name: ExtensionName.cellExternalCopyManager, class: this.cellExternalCopyExtension, extension: this.cellExternalCopyExtension.register() });
            }
        }
        // manually register other plugins
        if (this.sharedService.gridOptions.registerPlugins !== undefined) {
            if (Array.isArray(this.sharedService.gridOptions.registerPlugins)) {
                this.sharedService.gridOptions.registerPlugins.forEach((plugin) => {
                    this.sharedService.grid.registerPlugin(plugin);
                    this.extensionList.push({ name: ExtensionName.noname, class: null, extension: plugin });
                });
            }
            else {
                this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
                this.extensionList.push({ name: ExtensionName.noname, class: null, extension: this.sharedService.gridOptions.registerPlugins });
            }
        }
    }
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    createCheckboxPluginBeforeGridCreation(columnDefinitions, options) {
        if (options.enableCheckboxSelector) {
            this.checkboxSelectorExtension.create(columnDefinitions, options);
        }
    }
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    hideColumn(column) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            const /** @type {?} */ columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    }
    /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    refreshBackendDataset(gridOptions) {
        this.gridMenuExtension.refreshBackendDataset(gridOptions);
    }
    /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    removeColumnByIndex(array, index) {
        return array.filter((el, i) => {
            return index !== i;
        });
    }
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    translateColumnPicker() {
        if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
            this.columnPickerExtension.translateColumnPicker();
        }
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    translateGridMenu() {
        if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
            this.gridMenuExtension.translateGridMenu();
        }
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    translateHeaderMenu() {
        if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
            this.headerMenuExtension.translateHeaderMenu();
        }
    }
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param {?=} locale to use
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    translateColumnHeaders(locale, newColumnDefinitions) {
        if (locale) {
            this.translate.use(/** @type {?} */ (locale));
        }
        const /** @type {?} */ columnDefinitions = newColumnDefinitions || this.sharedService.columnDefinitions;
        this.translateItems(columnDefinitions, 'headerKey', 'name');
        this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        // re-render the column headers
        this.renderColumnHeaders(columnDefinitions);
    }
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    renderColumnHeaders(newColumnDefinitions) {
        const /** @type {?} */ collection = newColumnDefinitions || this.sharedService.columnDefinitions;
        if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
            this.sharedService.grid.setColumns(collection);
        }
    }
    /**
     * Translate the an array of items from an input key and assign to the output key
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    translateItems(items, inputKey, outputKey) {
        for (const /** @type {?} */ item of items) {
            if (item[inputKey]) {
                item[outputKey] = this.translate.instant(item[inputKey]);
            }
        }
    }
}
ExtensionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ExtensionService.ctorParameters = () => [
    { type: AutoTooltipExtension, },
    { type: CellExternalCopyManagerExtension, },
    { type: CheckboxSelectorExtension, },
    { type: ColumnPickerExtension, },
    { type: GridMenuExtension, },
    { type: GroupItemMetaProviderExtension, },
    { type: HeaderButtonExtension, },
    { type: HeaderMenuExtension, },
    { type: RowMoveManagerExtension, },
    { type: RowSelectionExtension, },
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
    constructor() {
        this.defaultOrderBy = { field: 'id', direction: SortDirection.ASC };
        this.defaultPaginationOptions = {
            first: DEFAULT_ITEMS_PER_PAGE,
            offset: 0
        };
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
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
            const /** @type {?} */ pageInfoQb = new GraphqlQueryBuilder('pageInfo');
            pageInfoQb.find('hasNextPage', 'endCursor');
            dataQb.find(['cursor', { node: filters }]);
            datasetQb.find(['totalCount', pageInfoQb, dataQb]);
        }
        else {
            // ...nodes { _filters_ }
            dataQb.find(filters);
            datasetQb.find(['totalCount', dataQb]);
        }
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
            datasetFilters.locale = this._gridOptions && this._gridOptions.i18n && this._gridOptions.i18n.currentLang || 'en';
        }
        if (this.options.extraQueryArguments) {
            // first: 20, ... userId: 123
            for (const /** @type {?} */ queryArgument of this.options.extraQueryArguments) {
                datasetFilters[queryArgument.field] = queryArgument.value;
            }
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
        if (grid && grid.getColumns) {
            this._columnDefinitions = serviceOptions.columnDefinitions || grid.getColumns();
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
    processOnFilterChanged(event, args) {
        const /** @type {?} */ gridOptions = this._gridOptions || args.grid.getOptions();
        const /** @type {?} */ backendApi = gridOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
        }
        // only add a delay when user is typing, on select dropdown filter it will execute right away
        let /** @type {?} */ debounceTypingDelay = 0;
        if (event && (event.type === 'keyup' || event.type === 'keydown')) {
            debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
        }
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
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
    processOnPaginationChanged(event, args) {
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
    processOnSortChanged(event, args) {
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
        const /** @type {?} */ searchByArray = [];
        let /** @type {?} */ searchValue;
        for (const /** @type {?} */ columnId in columnFilters) {
            if (columnFilters.hasOwnProperty(columnId)) {
                const /** @type {?} */ columnFilter = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                let /** @type {?} */ columnDef;
                if (isUpdatedByPreset && Array.isArray(this._columnDefinitions)) {
                    columnDef = this._columnDefinitions.find((column) => column.id === columnFilter.columnId);
                }
                else {
                    columnDef = columnFilter.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                const /** @type {?} */ fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                const /** @type {?} */ searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
                let /** @type {?} */ fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error(`GraphQL filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
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
                if (searchTerms && searchTerms.length > 1) {
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
                    operator = columnDef.filter.operator;
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
                const /** @type {?} */ columnDef = this._columnDefinitions.find((column) => column.id === sorter.columnId);
                graphqlSorters.push({
                    field: columnDef ? ((columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '') : (sorter.columnId + ''),
                    direction: sorter.direction
                });
                // return only the column(s) found in the Column Definitions ELSE null
                if (columnDef) {
                    return {
                        columnId: sorter.columnId,
                        sortAsc: sorter.direction.toUpperCase() === SortDirection.ASC
                    };
                }
                return null;
            });
            // set the sort icons, but also make sure to filter out null values (happens when no columnDef found)
            if (Array.isArray(tmpSorterArray)) {
                this._grid.setSortColumns(tmpSorterArray.filter((sorter) => sorter));
            }
        }
        else if (sortColumns && !presetSorters) {
            // build the orderBy array, it could be multisort, example
            // orderBy:[{field: lastName, direction: ASC}, {field: firstName, direction: DESC}]
            if (sortColumns && sortColumns.length === 0) {
                graphqlSorters = new Array(this.defaultOrderBy); // when empty, use the default sort
                currentSorters = new Array({ columnId: this.defaultOrderBy.field, direction: this.defaultOrderBy.direction });
            }
            else {
                if (sortColumns) {
                    for (const /** @type {?} */ column of sortColumns) {
                        if (column && column.sortCol) {
                            currentSorters.push({
                                columnId: column.sortCol.id + '',
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
            return tmpFilter;
        });
    }
}

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
    constructor() {
        this.defaultOptions = {
            top: DEFAULT_ITEMS_PER_PAGE$1,
            orderBy: '',
            caseType: CaseType.pascalCase
        };
        this.odataService = new OdataService();
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
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
        if (grid && grid.getColumns) {
            this._columnDefinitions = (options && options["columnDefinitions"]) || grid.getColumns();
            this._columnDefinitions = this._columnDefinitions.filter((column) => !column.excludeFromQuery);
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
    processOnFilterChanged(event, args) {
        const /** @type {?} */ serviceOptions = args.grid.getOptions();
        const /** @type {?} */ backendApi = serviceOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
        }
        // only add a delay when user is typing, on select dropdown filter it will execute right away
        let /** @type {?} */ debounceTypingDelay = 0;
        if (event && (event.type === 'keyup' || event.type === 'keydown')) {
            debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE$1;
        }
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
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
    processOnPaginationChanged(event, args) {
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
    processOnSortChanged(event, args) {
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
                let /** @type {?} */ fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error(`ODdata filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                const /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                const /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
                let /** @type {?} */ searchValue = (!!matches) ? matches[2] : '';
                const /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                const /** @type {?} */ bypassOdataQuery = columnFilter.bypassBackendQuery || false;
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
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
                    if (searchTerms && searchTerms.length > 1) {
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
                const /** @type {?} */ columnDef = this._columnDefinitions.find((column) => column.id === sorter.columnId);
                sorterArray.push({
                    columnId: columnDef ? ((columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '') : (sorter.columnId + ''),
                    direction: sorter.direction
                });
                // return only the column(s) found in the Column Definitions ELSE null
                if (columnDef) {
                    return {
                        columnId: sorter.columnId,
                        sortAsc: sorter.direction.toUpperCase() === SortDirection.ASC
                    };
                }
                return null;
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
                    for (const /** @type {?} */ columnDef of sortColumns) {
                        if (columnDef.sortCol) {
                            let /** @type {?} */ fieldName = (columnDef.sortCol.queryField || columnDef.sortCol.queryFieldSorter || columnDef.sortCol.field || columnDef.sortCol.id) + '';
                            let /** @type {?} */ columnFieldName = (columnDef.sortCol.field || columnDef.sortCol.id) + '';
                            if (this.odataService.options.caseType === CaseType.pascalCase) {
                                fieldName = String.titleCase(fieldName);
                                columnFieldName = String.titleCase(columnFieldName);
                            }
                            sorterArray.push({
                                columnId: columnFieldName,
                                direction: columnDef.sortAsc ? 'asc' : 'desc'
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
GridOdataService.ctorParameters = () => [];

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
     * @param {?} dataView
     * @return {?}
     */
    attachOnCellChange(grid, dataView) {
        // subscribe to this Slickgrid event of onCellChange
        this._eventHandler.subscribe(grid.onCellChange, (e, args) => {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            const /** @type {?} */ column = grid.getColumns()[args.cell];
            // if the column definition has a onCellChange property (a callback function), then run it
            if (typeof column.onCellChange === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
                const /** @type {?} */ returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView,
                    gridDefinition: grid.getOptions(),
                    grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellChanges.... function
                column.onCellChange(e, returnedArgs);
            }
        });
    }
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    attachOnClick(grid, dataView) {
        this._eventHandler.subscribe(grid.onClick, (e, args) => {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            const /** @type {?} */ column = grid.getColumns()[args.cell];
            // if the column definition has a onCellClick property (a callback function), then run it
            if (typeof column.onCellClick === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
                const /** @type {?} */ returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView,
                    gridDefinition: grid.getOptions(),
                    grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellClick.... function
                column.onCellClick(e, returnedArgs);
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
class GridStateService {
    constructor() {
        this._eventHandler = new Slick.EventHandler();
        this._columns = [];
        this._currentColumns = [];
        this.subscriptions = [];
        this.onGridStateChanged = new Subject();
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} extensionService
     * @param {?} filterService
     * @param {?} sortService
     * @return {?}
     */
    init(grid, extensionService, filterService, sortService) {
        this._grid = grid;
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.sortService = sortService;
        this.subscribeToAllGridChanges(grid);
    }
    /**
     * Dispose of all the SlickGrid & Angular subscriptions
     * @return {?}
     */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // also unsubscribe all Angular Subscriptions
        this.subscriptions.forEach((subscription) => {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        });
        this.subscriptions = [];
    }
    /**
     * Get the current grid state (filters/sorters/pagination)
     * @return {?} grid state
     */
    getCurrentGridState() {
        const /** @type {?} */ gridState = {
            columns: this.getCurrentColumns(),
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
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return {?} current columns
     */
    getColumns() {
        return this._columns || this._grid.getColumns();
    }
    /**
     * From an array of Grid Column Definitions, get the associated Current Columns
     * @param {?} gridColumns
     * @return {?}
     */
    getAssociatedCurrentColumns(gridColumns) {
        const /** @type {?} */ currentColumns = [];
        if (gridColumns && Array.isArray(gridColumns)) {
            gridColumns.forEach((column, index) => {
                if (column && column.id) {
                    currentColumns.push({
                        columnId: /** @type {?} */ (column.id),
                        cssClass: column.cssClass || '',
                        headerCssClass: column.headerCssClass || '',
                        width: column.width || 0
                    });
                }
            });
        }
        this._currentColumns = currentColumns;
        return currentColumns;
    }
    /**
     * From an array of Current Columns, get the associated Grid Column Definitions
     * @param {?} grid
     * @param {?} currentColumns
     * @return {?}
     */
    getAssociatedGridColumns(grid, currentColumns) {
        const /** @type {?} */ columns = [];
        const /** @type {?} */ gridColumns = grid.getColumns();
        if (currentColumns && Array.isArray(currentColumns)) {
            currentColumns.forEach((currentColumn, index) => {
                const /** @type {?} */ gridColumn = gridColumns.find((c) => c.id === currentColumn.columnId);
                if (gridColumn && gridColumn.id) {
                    columns.push(Object.assign({}, gridColumn, { cssClass: currentColumn.cssClass, headerCssClass: currentColumn.headerCssClass, width: currentColumn.width }));
                }
            });
        }
        this._columns = columns;
        return columns;
    }
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return {?} current columns
     */
    getCurrentColumns() {
        let /** @type {?} */ currentColumns = [];
        if (this._currentColumns && Array.isArray(this._currentColumns) && this._currentColumns.length > 0) {
            currentColumns = this._currentColumns;
        }
        else {
            currentColumns = this.getAssociatedCurrentColumns(this._grid.getColumns());
        }
        return currentColumns;
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
    /**
     * Hook a SlickGrid Extension Event to a Grid State change event
     * @param {?} extensionName
     * @param {?} eventName
     * @return {?}
     */
    hookExtensionEventToGridStateChange(extensionName, eventName) {
        const /** @type {?} */ extension = this.extensionService && this.extensionService.getExtensionByName(extensionName);
        if (extension && extension.class && extension.class[eventName] && extension.class[eventName].subscribe) {
            this._eventHandler.subscribe(extension.class[eventName], (e, args) => {
                const /** @type {?} */ columns = args && args.columns;
                const /** @type {?} */ currentColumns = this.getAssociatedCurrentColumns(columns);
                this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
            });
        }
    }
    /**
     * Hook a Grid Event to a Grid State change event
     * @param {?} eventName
     * @param {?} grid
     * @return {?}
     */
    hookSlickGridEventToGridStateChange(eventName, grid) {
        if (grid && grid[eventName] && grid[eventName].subscribe) {
            this._eventHandler.subscribe(grid[eventName], (e, args) => {
                const /** @type {?} */ columns = grid.getColumns();
                const /** @type {?} */ currentColumns = this.getAssociatedCurrentColumns(columns);
                this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
            });
        }
    }
    /**
     * @param {?=} columnDefinitions
     * @return {?}
     */
    resetColumns(columnDefinitions) {
        const /** @type {?} */ columns = columnDefinitions || this._columns;
        const /** @type {?} */ currentColumns = this.getAssociatedCurrentColumns(columns);
        this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
    }
    /**
     * if we use Row Selection or the Checkbox Selector, we need to reset any selection
     * @return {?}
     */
    resetRowSelection() {
        if (this._gridOptions.enableRowSelection || this._gridOptions.enableCheckboxSelector) {
            // this also requires the Row Selection Model to be registered as well
            const /** @type {?} */ rowSelectionExtension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(ExtensionName.rowSelection);
            if (rowSelectionExtension && rowSelectionExtension.extension) {
                this._grid.setSelectedRows([]);
            }
        }
    }
    /**
     * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
     * when triggered, we will publish a Grid State Event with current Grid State
     * @param {?} grid
     * @return {?}
     */
    subscribeToAllGridChanges(grid) {
        // Subscribe to Event Emitter of Filter changed
        this.subscriptions.push(this.filterService.onFilterChanged.subscribe((currentFilters) => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: currentFilters, type: GridStateType.filter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Filter cleared
        this.subscriptions.push(this.filterService.onFilterCleared.subscribe(() => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.filter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Sort changed
        this.subscriptions.push(this.sortService.onSortChanged.subscribe((currentSorters) => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: currentSorters, type: GridStateType.sorter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Sort cleared
        this.subscriptions.push(this.sortService.onSortCleared.subscribe(() => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.sorter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to ColumnPicker and/or GridMenu for show/hide Columns visibility changes
        this.hookExtensionEventToGridStateChange(ExtensionName.columnPicker, 'onColumnsChanged');
        this.hookExtensionEventToGridStateChange(ExtensionName.gridMenu, 'onColumnsChanged');
        // subscribe to Column Resize & Reordering
        this.hookSlickGridEventToGridStateChange('onColumnsReordered', grid);
        this.hookSlickGridEventToGridStateChange('onColumnsResized', grid);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GridService {
    /**
     * @param {?} extensionService
     * @param {?} filterService
     * @param {?} gridStateService
     * @param {?} sortService
     * @param {?} translate
     */
    constructor(extensionService, filterService, gridStateService, sortService, translate) {
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.gridStateService = gridStateService;
        this.sortService = sortService;
        this.translate = translate;
    }
    /**
     * Getter for the Column Definitions pulled through the Grid Object
     * @return {?}
     */
    get _columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    init(grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    }
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param {?} args
     * @return {?} object with columnDef and dataContext
     */
    getColumnFromEventArguments(args) {
        if (!args || !args.grid || !args.grid.getColumns || !args.grid.getDataItem) {
            throw new Error('To get the column definition and data, we need to have these arguments passed as objects (row, cell, grid)');
        }
        return {
            row: args.row,
            cell: args.cell,
            columnDef: args.grid.getColumns()[args.cell],
            dataContext: args.grid.getDataItem(args.row),
            dataView: this._dataView,
            grid: this._grid,
            gridDefinition: this._gridOptions
        };
    }
    /**
     * Get data item by it's row index number
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
    getItemRowMetadataToHighlight(previousItemMetadata) {
        return (rowNumber) => {
            const /** @type {?} */ item = this._dataView.getItem(rowNumber);
            let /** @type {?} */ meta = { cssClasses: '' };
            if (typeof previousItemMetadata === 'function') {
                meta = previousItemMetadata(rowNumber);
            }
            if (item && item._dirty) {
                meta.cssClasses = (meta && meta.cssClasses || '') + ' dirty';
            }
            if (!meta) {
                meta = { cssClasses: '' };
            }
            if (item && item.rowClass && meta) {
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
        const /** @type {?} */ rowIndexes = Array.isArray(rowNumber) ? rowNumber : [rowNumber];
        this._grid.setSelectedRows(rowIndexes);
        if (Array.isArray(rowNumber)) {
            rowNumber.forEach(row => this.highlightRowByMetadata(row, fadeDelay));
        }
        else {
            this.highlightRowByMetadata(rowNumber, fadeDelay);
        }
    }
    /**
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    highlightRowByMetadata(rowNumber, fadeDelay = 1500) {
        this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);
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
     * Get the Data Item from a grid row index
     * @param {?} index
     * @return {?}
     */
    getDataItemByRowIndex(index) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(index);
    }
    /**
     * Get the Data Item from an array of grid row indexes
     * @param {?} indexes
     * @return {?}
     */
    getDataItemByRowIndexes(indexes) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        const /** @type {?} */ dataItems = [];
        if (Array.isArray(indexes)) {
            indexes.forEach((idx) => {
                dataItems.push(this._grid.getDataItem(idx));
            });
        }
        return dataItems;
    }
    /**
     * Get the currently selected row indexes
     * @return {?}
     */
    getSelectedRows() {
        return this._grid.getSelectedRows();
    }
    /**
     * Get the currently selected rows item data
     * @return {?}
     */
    getSelectedRowsDataItem() {
        if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        const /** @type {?} */ selectedRowIndexes = this._grid.getSelectedRows();
        return this.getDataItemByRowIndexes(selectedRowIndexes);
    }
    /**
     * Select the selected row by a row index
     * @param {?} rowIndex
     * @return {?}
     */
    setSelectedRow(rowIndex) {
        this._grid.setSelectedRows([rowIndex]);
    }
    /**
     * Set selected rows with provided array of row indexes
     * @param {?} rowIndexes
     * @return {?}
     */
    setSelectedRows(rowIndexes) {
        this._grid.setSelectedRows(rowIndexes);
    }
    /**
     * Re-Render the Grid
     * @return {?}
     */
    renderGrid() {
        if (this._grid && typeof this._grid.invalidate === 'function') {
            this._grid.invalidate();
            this._grid.render();
        }
    }
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     * @param {?=} columnDefinitions
     * @return {?}
     */
    resetGrid(columnDefinitions) {
        // reset columns to original states & refresh the grid
        if (this._grid && this._dataView) {
            const /** @type {?} */ originalColumns = this.extensionService.getAllColumns();
            // const originalColumns = columnDefinitions || this._columnDefinitions;
            if (Array.isArray(originalColumns) && originalColumns.length > 0) {
                // set the grid columns to it's original column definitions
                this._grid.setColumns(originalColumns);
                this._dataView.refresh();
                if (this._gridOptions && this._gridOptions.enableAutoSizeColumns) {
                    this._grid.autosizeColumns();
                }
                this.gridStateService.resetColumns(columnDefinitions);
            }
        }
        if (this.filterService && this.filterService.clearFilters) {
            this.filterService.clearFilters();
        }
        if (this.sortService && this.sortService.clearSorting) {
            this.sortService.clearSorting();
        }
    }
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @return {?}
     */
    addItemToDatagrid(item, shouldHighlightRow = true) {
        if (!this._grid || !this._gridOptions || !this._dataView) {
            throw new Error('We could not find SlickGrid Grid, DataView objects');
        }
        const /** @type {?} */ row = 0;
        this._dataView.insertItem(row, item);
        this._grid.scrollRowIntoView(0); // scroll to row 0
        // highlight the row we just added, if defined
        if (shouldHighlightRow) {
            this.highlightRow(0, 1500);
        }
        // refresh dataview & grid
        this._dataView.refresh();
    }
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} items
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @return {?}
     */
    addItemsToDatagrid(items, shouldHighlightRow = true) {
        if (Array.isArray(items)) {
            items.forEach((item) => this.addItemToDatagrid(item, shouldHighlightRow));
        }
    }
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param {?} item
     * @return {?}
     */
    deleteDataGridItem(item) {
        if (!item || !item.hasOwnProperty('id')) {
            throw new Error(`deleteDataGridItem() requires an item object which includes the "id" property`);
        }
        const /** @type {?} */ itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        this.deleteDataGridItemById(itemId);
    }
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param {?} itemId
     * @return {?}
     */
    deleteDataGridItemById(itemId) {
        if (itemId === undefined) {
            throw new Error(`Cannot delete a row without a valid "id"`);
        }
        // delete the item from the dataView
        this._dataView.deleteItem(itemId);
        this._dataView.refresh();
    }
    /**
     * Update an existing item with new properties inside the datagrid
     * @param {?} item
     * @param {?=} shouldHighlightRow
     * @return {?} grid row index
     */
    updateDataGridItem(item, shouldHighlightRow = true) {
        const /** @type {?} */ itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        if (itemId === undefined) {
            throw new Error(`Could not find the item in the grid or it's associated "id"`);
        }
        return this.updateDataGridItemById(itemId, item, shouldHighlightRow);
    }
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param {?} items
     * @param {?=} shouldHighlightRow
     * @return {?}
     */
    updateDataGridItems(items, shouldHighlightRow = true) {
        if (!Array.isArray(items)) {
            throw new Error('The function "updateDataGridItems" only support array of items, if you wish to only update 1 item then use "updateDataGridItem"');
        }
        const /** @type {?} */ gridIndexes = [];
        items.forEach((item) => {
            gridIndexes.push(this.updateDataGridItem(item, false));
        });
        // only highlight at the end, all at once
        // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
        if (shouldHighlightRow) {
            this.highlightRow(gridIndexes);
        }
    }
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param {?} itemId
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @return {?} grid row index
     */
    updateDataGridItemById(itemId, item, shouldHighlightRow = true) {
        if (itemId === undefined) {
            throw new Error(`Cannot update a row without a valid "id"`);
        }
        const /** @type {?} */ row = this._dataView.getRowById(itemId);
        if (!item || row === undefined) {
            throw new Error(`Could not find the item in the grid or it's associated "id"`);
        }
        const /** @type {?} */ gridIdx = this._dataView.getIdxById(itemId);
        if (gridIdx !== undefined) {
            // Update the item itself inside the dataView
            this._dataView.updateItem(itemId, item);
            // highlight the row we just updated, if defined
            if (shouldHighlightRow) {
                this.highlightRow(row, 1500);
            }
            // refresh dataview & grid
            this._dataView.refresh();
            return gridIdx;
        }
    }
}
GridService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GridService.ctorParameters = () => [
    { type: ExtensionService, },
    { type: FilterService, },
    { type: GridStateService, },
    { type: SortService, },
    { type: TranslateService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GroupingAndColspanService {
    constructor() {
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * Getter for the Column Definitions pulled through the Grid Object
     * @return {?}
     */
    get _columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    init(grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
        if (grid && this._gridOptions) {
            // When dealing with Pre-Header Grouping colspan, we need to re-create the pre-header in multiple occasions
            // for all these occasions, we have to trigger a re-create
            if (this._gridOptions.createPreHeaderPanel) {
                this._eventHandler.subscribe(grid.onSort, (e, args) => {
                    this.createPreHeaderRowGroupingTitle();
                });
                this._eventHandler.subscribe(grid.onColumnsResized, (e, args) => {
                    this.createPreHeaderRowGroupingTitle();
                });
                this._eventHandler.subscribe(dataView.onRowCountChanged, (e, args) => {
                    this.createPreHeaderRowGroupingTitle();
                });
                // also not sure why at this point, but it seems that I need to call the 1st create in a delayed execution
                // probably some kind of timing issues and delaying it until the grid is fully ready does help
                setTimeout(() => {
                    this.createPreHeaderRowGroupingTitle();
                }, 50);
            }
        }
    }
    /**
     * @return {?}
     */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    }
    /**
     * @return {?}
     */
    createPreHeaderRowGroupingTitle() {
        const /** @type {?} */ $preHeaderPanel = $(this._grid.getPreHeaderPanel())
            .empty()
            .addClass('slick-header-columns')
            .css('left', '-1000px')
            .width(this._grid.getHeadersWidth());
        $preHeaderPanel.parent().addClass('slick-header');
        const /** @type {?} */ headerColumnWidthDiff = this._grid.getHeaderColumnWidthDiff();
        let /** @type {?} */ m;
        let /** @type {?} */ header;
        let /** @type {?} */ lastColumnGroup = '';
        let /** @type {?} */ widthTotal = 0;
        for (let /** @type {?} */ i = 0; i < this._columnDefinitions.length; i++) {
            m = this._columnDefinitions[i];
            if (lastColumnGroup === m.columnGroup && i > 0) {
                widthTotal += m.width;
                header.width(widthTotal - headerColumnWidthDiff);
            }
            else {
                widthTotal = m.width;
                header = $(`<div class="ui-state-default slick-header-column" />`)
                    .html(`<span class="slick-column-name">${m.columnGroup || ''}</span>`)
                    .width(m.width - headerColumnWidthDiff)
                    .appendTo($preHeaderPanel);
            }
            lastColumnGroup = m.columnGroup;
        }
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
/**
 * @record
 */

class ResizerService {
    constructor() {
        this.onGridBeforeResize = new Subject();
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * @return {?}
     */
    get _gridUid() {
        return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions.gridId;
    }
    /**
     * @param {?} grid
     * @param {?=} fixedDimensions
     * @return {?}
     */
    init(grid, fixedDimensions) {
        this._grid = grid;
        if (fixedDimensions) {
            this._fixedHeight = fixedDimensions.height;
            this._fixedWidth = fixedDimensions.width;
        }
    }
    /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @param {?=} newSizes
     * @return {?}
     */
    attachAutoResizeDataGrid(newSizes) {
        // if we can't find the grid to resize, return without attaching anything
        const /** @type {?} */ gridDomElm = $(`#${this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'}`);
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        // -- also we add a slight delay (in ms) so that we resize after the grid render is done
        this.resizeGrid(10, newSizes);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on(`resize.grid.${this._gridUid}`, () => {
            this.onGridBeforeResize.next(true);
            this.resizeGrid(0, newSizes);
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
        const /** @type {?} */ autoResizeOptions = gridOptions && gridOptions.autoResize;
        const /** @type {?} */ containerElm = (autoResizeOptions && autoResizeOptions.containerId) ? $(`#${autoResizeOptions.containerId}`) : $(`#${gridOptions.gridContainerId}`);
        const /** @type {?} */ windowElm = $(window);
        if (windowElm === undefined || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        let /** @type {?} */ bottomPadding = (autoResizeOptions && autoResizeOptions.bottomPadding) ? autoResizeOptions.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        const /** @type {?} */ gridHeight = windowElm.height() || 0;
        const /** @type {?} */ coordOffsetTop = gridDomElm.offset();
        const /** @type {?} */ gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        const /** @type {?} */ availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        const /** @type {?} */ availableWidth = containerElm.width() || 0;
        const /** @type {?} */ maxHeight = (autoResizeOptions && autoResizeOptions.maxHeight && autoResizeOptions.maxHeight > 0) ? autoResizeOptions.maxHeight : undefined;
        const /** @type {?} */ minHeight = (autoResizeOptions && autoResizeOptions.minHeight && autoResizeOptions.minHeight < 0) ? autoResizeOptions.minHeight : DATAGRID_MIN_HEIGHT;
        const /** @type {?} */ maxWidth = (autoResizeOptions && autoResizeOptions.maxWidth && autoResizeOptions.maxWidth > 0) ? autoResizeOptions.maxWidth : undefined;
        const /** @type {?} */ minWidth = (autoResizeOptions && autoResizeOptions.minWidth && autoResizeOptions.minWidth < 0) ? autoResizeOptions.minWidth : DATAGRID_MIN_WIDTH;
        let /** @type {?} */ newHeight = availableHeight;
        let /** @type {?} */ newWidth = (autoResizeOptions && autoResizeOptions.sidePadding) ? availableWidth - autoResizeOptions.sidePadding : availableWidth;
        // optionally (when defined), make sure that grid height & width are within their thresholds
        if (newHeight < minHeight) {
            newHeight = minHeight;
        }
        if (maxHeight && newHeight > maxHeight) {
            newHeight = maxHeight;
        }
        if (newWidth < minWidth) {
            newWidth = minWidth;
        }
        if (maxWidth && newWidth > maxWidth) {
            newWidth = maxWidth;
        }
        // return the new dimensions unless a fixed height/width was defined
        return {
            height: this._fixedHeight || newHeight,
            width: this._fixedWidth || newWidth
        };
    }
    /**
     * Dispose function when element is destroyed
     * @return {?}
     */
    dispose() {
        $(window).off(`resize.grid.${this._gridUid}`);
    }
    /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    compensateHorizontalScroll(grid, gridOptions) {
        const /** @type {?} */ gridElm = $(`#${gridOptions.gridId}`);
        const /** @type {?} */ scrollbarDimensions = grid && grid.getScrollbarDimensions();
        const /** @type {?} */ slickGridScrollbarWidth = scrollbarDimensions && scrollbarDimensions.width;
        const /** @type {?} */ calculatedScrollbarWidth = getScrollBarWidth();
        // if scrollbar width is different from SlickGrid calculation to our custom calculation
        // then resize the grid with the missing pixels to remove scroll (usually only 3px)
        if (slickGridScrollbarWidth < calculatedScrollbarWidth) {
            gridElm.width(gridElm.width() + (calculatedScrollbarWidth - slickGridScrollbarWidth));
        }
    }
    /**
     * Return the last resize dimensions used by the service
     * @return {?} last dimensions
     */
    getLastResizeDimensions() {
        return this._lastDimensions;
    }
    /**
     * Resize the datagrid to fit the browser height & width
     * @param {?=} delay
     * @param {?=} newSizes
     * @return {?}
     */
    resizeGrid(delay = 10, newSizes) {
        if (!this._grid || !this._gridOptions) {
            throw new Error(`
      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.
      You can fix this by setting your gridOption to use "enableAutoResize" or create an instance of the ResizerService by calling attachAutoResizeDataGrid()`);
        }
        return new Promise((resolve) => {
            // because of the javascript async nature, we might want to delay the resize a little bit
            delay = delay || 0;
            if (delay > 0) {
                clearTimeout(this._timer);
                this._timer = setTimeout(() => {
                    this.resizeGridWithDimensions(newSizes);
                    resolve(this._lastDimensions);
                }, delay);
            }
            else {
                this.resizeGridWithDimensions(newSizes);
                resolve(this._lastDimensions);
            }
        });
    }
    /**
     * @param {?=} newSizes
     * @return {?}
     */
    resizeGridWithDimensions(newSizes) {
        // calculate the available sizes with minimum height defined as a constant
        const /** @type {?} */ availableDimensions = this.calculateGridNewDimensions(this._gridOptions);
        const /** @type {?} */ gridElm = $(`#${this._gridOptions.gridId}`) || {};
        const /** @type {?} */ gridContainerElm = $(`#${this._gridOptions.gridContainerId}`) || {};
        if ((newSizes || availableDimensions) && gridElm.length > 0) {
            // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
            // basically if user passes 1 of the dimension, let say he passes just the height,
            // we will use the height as a fixed height but the width will be resized by it's available space
            const /** @type {?} */ newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
            const /** @type {?} */ newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;
            // apply these new height/width to the datagrid
            gridElm.height(newHeight);
            gridElm.width(newWidth);
            gridContainerElm.height(newHeight);
            gridContainerElm.width(newWidth);
            // resize the slickgrid canvas on all browser except some IE versions
            // exclude all IE below IE11
            // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
            if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && this._grid && this._grid.resizeCanvas) {
                this._grid.resizeCanvas();
            }
            // also call the grid auto-size columns so that it takes available when going bigger
            if (this._gridOptions && this._gridOptions.enableAutoSizeColumns && typeof this._grid.autosizeColumns) {
                // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree) to avoid SlickGrid error "missing stylesheet"
                if (this._gridUid && $(`.${this._gridUid}`).length > 0) {
                    this._grid.autosizeColumns();
                }
                // compensate anytime SlickGrid measureScrollbar is incorrect
                this.compensateHorizontalScroll(this._grid, this._gridOptions);
            }
            // keep last resized dimensions & resolve them to the Promise
            this._lastDimensions = {
                height: newHeight,
                width: newWidth
            };
            if ((this._gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
                this._lastDimensions.heightWithPagination = newHeight + DATAGRID_PAGINATION_HEIGHT;
            }
        }
        return this._lastDimensions;
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
class AvgAggregator {
    /**
     * @param {?} field
     */
    constructor(field) {
        this._field = field;
    }
    /**
     * @return {?}
     */
    init() {
        this._count = 0;
        this._nonNullCount = 0;
        this._sum = 0;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    accumulate(item) {
        const /** @type {?} */ val = item[this._field];
        this._count++;
        if (val != null && val !== '' && !isNaN(val)) {
            this._nonNullCount++;
            this._sum += parseFloat(val);
        }
    }
    /**
     * @param {?} groupTotals
     * @return {?}
     */
    storeResult(groupTotals) {
        if (!groupTotals.avg) {
            groupTotals.avg = {};
        }
        if (this._nonNullCount !== 0) {
            groupTotals.avg[this._field] = this._sum / this._nonNullCount;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MinAggregator {
    /**
     * @param {?} field
     */
    constructor(field) {
        this._field = field;
    }
    /**
     * @return {?}
     */
    init() {
        this._min = null;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    accumulate(item) {
        const /** @type {?} */ val = item[this._field];
        if (val != null && val !== '' && !isNaN(val)) {
            if (this._min == null || val < this._min) {
                this._min = val;
            }
        }
    }
    /**
     * @param {?} groupTotals
     * @return {?}
     */
    storeResult(groupTotals) {
        if (!groupTotals.min) {
            groupTotals.min = {};
        }
        groupTotals.min[this._field] = this._min;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MaxAggregator {
    /**
     * @param {?} field
     */
    constructor(field) {
        this._field = field;
    }
    /**
     * @return {?}
     */
    init() {
        this._max = null;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    accumulate(item) {
        const /** @type {?} */ val = item[this._field];
        if (val != null && val !== '' && !isNaN(val)) {
            if (this._max == null || val > this._max) {
                this._max = val;
            }
        }
    }
    /**
     * @param {?} groupTotals
     * @return {?}
     */
    storeResult(groupTotals) {
        if (!groupTotals.max) {
            groupTotals.max = {};
        }
        groupTotals.max[this._field] = this._max;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SumAggregator {
    /**
     * @param {?} field
     */
    constructor(field) {
        this._field = field;
    }
    /**
     * @return {?}
     */
    init() {
        this._sum = null;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    accumulate(item) {
        const /** @type {?} */ val = item[this._field];
        if (val != null && val !== '' && !isNaN(val)) {
            this._sum += parseFloat(val);
        }
    }
    /**
     * @param {?} groupTotals
     * @return {?}
     */
    storeResult(groupTotals) {
        if (!groupTotals.sum) {
            groupTotals.sum = {};
        }
        groupTotals.sum[this._field] = this._sum;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provides a list of different Aggregators for the Group Formatter
 */
const Aggregators = {
    Avg: AvgAggregator,
    Min: MinAggregator,
    Max: MaxAggregator,
    Sum: SumAggregator
};

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
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    init() {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        this.$input = $(`<input type="checkbox" value="true" class="editor-checkbox editor-${fieldId}" />`);
        this.$input.appendTo(this.args.container);
        this.$input.focus();
        // make the checkbox editor act like a regular checkbox that commit the value on click
        if (this.args.grid.getOptions().autoCommitEdit) {
            this.$input.click(() => this.args.grid.getEditorLock().commitCurrentEdit());
        }
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
        this.defaultValue = !!item[this.columnDef.field];
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
        item[this.columnDef.field] = state;
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
        if (this.validator) {
            const /** @type {?} */ value = this.$input && this.$input.val && this.$input.val();
            const /** @type {?} */ validationResults = this.validator(value, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        // by default the editor is always valid
        // if user want it to be a required checkbox, he would have to provide his own validator
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
const moment$8 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    init() {
        if (this.args && this.args.column) {
            const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
            const /** @type {?} */ gridOptions = /** @type {?} */ (this.args.grid.getOptions());
            this.defaultDate = (this.args.item) ? this.args.item[this.args.column.field] : null;
            const /** @type {?} */ inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
            const /** @type {?} */ outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || FieldType.dateUtc);
            let /** @type {?} */ currentLocale = this.getCurrentLocale(this.columnDef, gridOptions);
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
            this.$input = $(`<input type="text" data-defaultDate="${this.defaultDate}" class="editor-text flatpickr editor-${fieldId}" />`);
            this.$input.appendTo(this.args.container);
            this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerOptions) : null;
            this.show();
        }
    }
    /**
     * @param {?} columnDef
     * @param {?} gridOptions
     * @return {?}
     */
    getCurrentLocale(columnDef, gridOptions) {
        const /** @type {?} */ options = gridOptions || columnDef.params || {};
        if (options.i18n && options.i18n instanceof TranslateService) {
            return options.i18n.currentLang;
        }
        return 'en';
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    loadFlatpickrLocale(locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        const /** @type {?} */ gridOptions = this.args && this.args.grid && this.args.grid.getOptions();
        if (gridOptions && gridOptions.params && gridOptions.params.flapickrLocale) {
            return gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
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
        // autocommit will not focus the next editor
        const /** @type {?} */ validation = this.validate();
        if (validation && validation.valid) {
            if (this.args.grid.getOptions().autoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    }
    /**
     * @return {?}
     */
    getColumnEditor() {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultDate = item[this.args.column.field];
        this.flatInstance.setDate(item[this.args.column.field]);
    }
    /**
     * @return {?}
     */
    serializeValue() {
        const /** @type {?} */ domValue = this.$input.val();
        if (!domValue) {
            return '';
        }
        const /** @type {?} */ outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        const /** @type {?} */ value = moment$8(domValue).format(outputFormat);
        return value;
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        if (!state) {
            return;
        }
        const /** @type {?} */ outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        item[this.args.column.field] = moment$8(state, outputFormat).toDate();
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
        if (this.validator) {
            const /** @type {?} */ value = this.$input && this.$input.val && this.$input.val();
            const /** @type {?} */ validationResults = this.validator(value, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        // by default the editor is always valid
        // if user want it to be a required checkbox, he would have to provide his own validator
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
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor || {};
    }
    /**
     * @return {?}
     */
    get hasAutoCommitEdit() {
        return this.args.grid.getOptions().autoCommitEdit;
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    init() {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        this.$input = $(`<input type="number" class="editor-text editor-${fieldId}" step="${this.getInputDecimalSteps()}" />`)
            .appendTo(this.args.container)
            .on('keydown.nav', (e) => {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        });
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$input.on('focusout', () => this.save());
        }
        setTimeout(() => {
            this.$input.focus().select();
        }, 50);
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
    getColumnEditor() {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    }
    /**
     * @return {?}
     */
    getDecimalPlaces() {
        // returns the number of fixed decimal places or null
        let /** @type {?} */ rtn = (this.columnEditor.params && this.columnEditor.params.hasOwnProperty('decimalPlaces')) ? this.columnEditor.params.decimalPlaces : undefined;
        if (rtn === undefined) {
            rtn = defaultDecimalPlaces;
        }
        return (!rtn && rtn !== 0 ? null : rtn);
    }
    /**
     * @return {?}
     */
    getInputDecimalSteps() {
        const /** @type {?} */ decimals = this.getDecimalPlaces();
        let /** @type {?} */ zeroString = '';
        for (let /** @type {?} */ i = 1; i < decimals; i++) {
            zeroString += '0';
        }
        if (decimals > 0) {
            return `0.${zeroString}1`;
        }
        return '1';
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultValue = item[this.columnDef.field];
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
        item[this.columnDef.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        const /** @type {?} */ elmValue = this.$input.val();
        return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    save() {
        const /** @type {?} */ validation = this.validate();
        if (validation && validation.valid) {
            if (this.hasAutoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    }
    /**
     * @return {?}
     */
    validate() {
        const /** @type {?} */ elmValue = this.$input.val();
        const /** @type {?} */ floatNumber = !isNaN(/** @type {?} */ (elmValue)) ? parseFloat(elmValue) : null;
        const /** @type {?} */ decPlaces = this.getDecimalPlaces();
        const /** @type {?} */ minValue = this.columnEditor.minValue;
        const /** @type {?} */ maxValue = this.columnEditor.maxValue;
        const /** @type {?} */ errorMsg = this.columnEditor.errorMessage;
        const /** @type {?} */ mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue,
            '{{minDecimal}}': 0,
            '{{maxDecimal}}': decPlaces
        };
        if (this.validator) {
            const /** @type {?} */ validationResults = this.validator(elmValue, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        else if (isNaN(/** @type {?} */ (elmValue)) || (decPlaces === 0 && !/^[-+]?(\d+(\.)?(\d)*)$/.test(elmValue))) {
            // when decimal value is 0 (which is the default), we accept 0 or more decimal values
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_VALID_NUMBER
            };
        }
        else if (minValue !== undefined && maxValue !== undefined && floatNumber !== null && (floatNumber < minValue || floatNumber > maxValue)) {
            // MIN & MAX Values provided
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (matched) => mapValidation[matched])
            };
        }
        else if (minValue !== undefined && floatNumber !== null && floatNumber <= minValue) {
            // MIN VALUE ONLY
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MIN.replace(/{{minValue}}/gi, (matched) => mapValidation[matched])
            };
        }
        else if (maxValue !== undefined && floatNumber !== null && floatNumber >= maxValue) {
            // MAX VALUE ONLY
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MAX.replace(/{{maxValue}}/gi, (matched) => mapValidation[matched])
            };
        }
        else if ((decPlaces > 0 && !new RegExp(`^(\\d*(\\.)?(\\d){0,${decPlaces}})$`).test(elmValue))) {
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN.replace(/{{minDecimal}}|{{maxDecimal}}/gi, (matched) => mapValidation[matched])
            };
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
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
    }
    /**
     * @return {?}
     */
    get hasAutoCommitEdit() {
        return this.args.grid.getOptions().autoCommitEdit;
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    init() {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        this.$input = $(`<input type="number" class="editor-text editor-${fieldId}" />`)
            .appendTo(this.args.container)
            .on('keydown.nav', (e) => {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        });
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$input.on('focusout', () => this.save());
        }
        setTimeout(() => {
            this.$input.focus().select();
        }, 50);
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
    getColumnEditor() {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultValue = parseInt(item[this.args.column.field], 10);
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
        const /** @type {?} */ elmValue = this.$input.val();
        const /** @type {?} */ value = isNaN(elmValue) ? elmValue : parseInt(elmValue, 10);
        return (!(value === '' && this.defaultValue === null)) && (value !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    save() {
        const /** @type {?} */ validation = this.validate();
        if (validation && validation.valid) {
            if (this.hasAutoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    }
    /**
     * @return {?}
     */
    validate() {
        const /** @type {?} */ elmValue = this.$input.val();
        const /** @type {?} */ errorMsg = this.columnEditor.params && this.columnEditor.errorMessage;
        if (this.validator) {
            const /** @type {?} */ validationResults = this.validator(elmValue, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        else if (isNaN(/** @type {?} */ (elmValue)) || !/^[+-]?\d+$/.test(elmValue)) {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_VALID_INTEGER
            };
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
        this.gridOptions = /** @type {?} */ (this.args.grid.getOptions());
        const /** @type {?} */ options = this.gridOptions || this.args.column.params || {};
        this._translate = options.i18n;
        this.init();
    }
    /**
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    get hasAutoCommitEdit() {
        return this.args.grid.getOptions().autoCommitEdit;
    }
    /**
     * @return {?}
     */
    init() {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ cancelText = this._translate && this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
        const /** @type {?} */ saveText = this._translate && this._translate.instant('SAVE') || Constants.TEXT_SAVE;
        const /** @type {?} */ $container = $('body');
        this.$wrapper = $(`<div class="slick-large-editor-text editor-${fieldId}" />`).appendTo($container);
        this.$input = $(`<textarea hidefocus rows="5">`).appendTo(this.$wrapper);
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$input.on('focusout', () => this.save());
        }
        $(`<div class="editor-footer">
          <button class="btn btn-primary btn-xs">${saveText}</button>
          <button class="btn btn-default btn-xs">${cancelText}</button>
      </div>`).appendTo(this.$wrapper);
        this.$wrapper.find('button:first').on('click', () => this.save());
        this.$wrapper.find('button:last').on('click', () => this.cancel());
        this.$input.on('keydown', this.handleKeyDown.bind(this));
        this.position(this.args && this.args.position);
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
            if (this.args && this.args.grid) {
                this.args.grid.navigatePrev();
            }
        }
        else if (e.which === KeyCode.TAB) {
            e.preventDefault();
            if (this.args && this.args.grid) {
                this.args.grid.navigateNext();
            }
        }
    }
    /**
     * @return {?}
     */
    save() {
        const /** @type {?} */ validation = this.validate();
        if (validation && validation.valid) {
            if (this.hasAutoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    }
    /**
     * @return {?}
     */
    cancel() {
        this.$input.val(this.defaultValue);
        if (this.args && this.args.cancelChanges) {
            this.args.cancelChanges();
        }
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
     * @return {?}
     */
    getColumnEditor() {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.$input.val(this.defaultValue = item[this.columnDef.field]);
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
        item[this.columnDef.field] = state;
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
        if (this.validator) {
            const /** @type {?} */ value = this.$input && this.$input.val && this.$input.val();
            const /** @type {?} */ validationResults = this.validator(value, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        // by default the editor is always valid
        // if user want it to be a required checkbox, he would have to provide his own validator
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
const DOMPurify$1 = DOMPurify_; // patch to fix rollup to work
/**
 * Slickgrid editor class for multiple/single select lists
 */
class SelectEditor {
    /**
     * @param {?} args
     * @param {?} isMultipleSelect
     */
    constructor(args, isMultipleSelect) {
        this.args = args;
        this.isMultipleSelect = isMultipleSelect;
        /**
         * Observable Subscriptions
         */
        this._subscriptions = [];
        // flag to signal that the editor is destroying itself, helps prevent
        // commit changes from being called twice and erroring
        this._destroying = false;
        this.gridOptions = /** @type {?} */ (this.args.grid.getOptions());
        const /** @type {?} */ gridOptions = this.gridOptions || this.args.column.params || {};
        this._translate = gridOptions.i18n;
        // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        this.elementName = `editor-${fieldId}`;
        const /** @type {?} */ libOptions = {
            autoAdjustDropHeight: true,
            autoAdjustDropPosition: true,
            autoAdjustDropWidthByTextSize: true,
            container: 'body',
            filter: false,
            maxHeight: 275,
            name: this.elementName,
            single: true,
            textTemplate: ($elm) => {
                // render HTML code or not, by default it is sanitized and won't be rendered
                const /** @type {?} */ isRenderHtmlEnabled = this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.enableRenderHtml || false;
                return isRenderHtmlEnabled ? $elm.text() : $elm.html();
            },
            onBlur: () => this.destroy(),
            onClose: () => {
                if (!this._destroying && args.grid.getOptions().autoCommitEdit) {
                    // do not use args.commitChanges() as this sets the focus to the next
                    // row. Also the select list will stay shown when clicking off the grid
                    args.grid.getEditorLock().commitCurrentEdit();
                }
            }
        };
        if (isMultipleSelect) {
            libOptions.single = false;
            libOptions.addTitle = true;
            libOptions.okButton = true;
            libOptions.selectAllDelimiter = ['', ''];
            if (this._translate) {
                libOptions.countSelected = this._translate.instant('X_OF_Y_SELECTED');
                libOptions.allSelected = this._translate.instant('ALL_SELECTED');
                libOptions.selectAllText = this._translate.instant('SELECT_ALL');
            }
        }
        // assign the multiple select lib options
        this.defaultOptions = libOptions;
        this.init();
    }
    /**
     * Get the Collection
     * @return {?}
     */
    get collection() {
        return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
    }
    /**
     * Getter for the Collection Options
     * @return {?}
     */
    get collectionOptions() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionOptions;
    }
    /**
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
    }
    /**
     * Getter for the Custom Structure if exist
     * @return {?}
     */
    get customStructure() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
    }
    /**
     * The current selected values (multiple select) from the collection
     * @return {?}
     */
    get currentValues() {
        // collection of strings, just return the filtered string that are equals
        if (this.collection.every(x => typeof x === 'string')) {
            return this.collection.filter(c => this.$editorElm.val().indexOf(c.toString()) !== -1);
        }
        // collection of label/value pair
        const /** @type {?} */ separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        const /** @type {?} */ isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
        return this.collection
            .filter(c => this.$editorElm.val().indexOf(c[this.valueName].toString()) !== -1)
            .map(c => {
            const /** @type {?} */ labelText = c[this.valueName];
            let /** @type {?} */ prefixText = c[this.labelPrefixName] || '';
            let /** @type {?} */ suffixText = c[this.labelSuffixName] || '';
            // also translate prefix/suffix if enableTranslateLabel is true and text is a string
            prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
            suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
            if (isIncludingPrefixSuffix) {
                const /** @type {?} */ tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text); // add to a temp array for joining purpose and filter out empty text
                return tmpOptionArray.join(separatorBetweenLabels);
            }
            return labelText;
        });
    }
    /**
     * The current selected values (single select) from the collection
     * @return {?}
     */
    get currentValue() {
        // collection of strings, just return the filtered string that are equals
        if (this.collection.every(x => typeof x === 'string')) {
            return findOrDefault(this.collection, (c) => c.toString() === this.$editorElm.val());
        }
        // collection of label/value pair
        const /** @type {?} */ separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        const /** @type {?} */ isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
        const /** @type {?} */ itemFound = findOrDefault(this.collection, (c) => c[this.valueName].toString() === this.$editorElm.val());
        if (itemFound) {
            const /** @type {?} */ labelText = itemFound[this.valueName];
            if (isIncludingPrefixSuffix) {
                let /** @type {?} */ prefixText = itemFound[this.labelPrefixName] || '';
                let /** @type {?} */ suffixText = itemFound[this.labelSuffixName] || '';
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
                suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
                // add to a temp array for joining purpose and filter out empty text
                const /** @type {?} */ tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text);
                return tmpOptionArray.join(separatorBetweenLabels);
            }
            return labelText;
        }
        return '';
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    init() {
        if (!this.args) {
            throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
        }
        if (!this.columnDef || !this.columnDef.internalColumnEditor || (!this.columnDef.internalColumnEditor.collection && !this.columnDef.internalColumnEditor.collectionAsync)) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") inside Column Definition Editor for the MultipleSelect/SingleSelect Editor to work correctly.
      Also each option should include a value/label pair (or value/labelKey when using Locale).
      For example: { editor: { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } }`);
        }
        this._collectionService = new CollectionService(this._translate);
        this.enableTranslateLabel = (this.columnDef.internalColumnEditor.enableTranslateLabel) ? this.columnDef.internalColumnEditor.enableTranslateLabel : false;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
        this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
        this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        if (this.enableTranslateLabel && (!this._translate || typeof this._translate.instant !== 'function')) {
            throw new Error(`[select-editor] The ngx-translate TranslateService is required for the Select Editor to work correctly`);
        }
        // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
        // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
        this.renderDomElement(this.collection);
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.columnDef.field] = state;
    }
    /**
     * @return {?}
     */
    destroy() {
        this._destroying = true;
        if (this.$editorElm && this.$editorElm.multipleSelect) {
            this.$editorElm.multipleSelect('close');
            this.$editorElm.remove();
        }
        this._subscriptions = unsubscribeAllObservables(this._subscriptions);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        if (this.isMultipleSelect) {
            this.loadMultipleValues(item);
        }
        else {
            this.loadSingleValue(item);
        }
        this.refresh();
    }
    /**
     * @param {?} items
     * @return {?}
     */
    loadMultipleValues(items) {
        // convert to string because that is how the DOM will return these values
        this.defaultValue = items[this.columnDef.field].map((i) => i.toString());
        this.$editorElm.find('option').each((i, $e) => {
            $e.selected = (this.defaultValue.indexOf($e.value) !== -1);
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadSingleValue(item) {
        // convert to string because that is how the DOM will return these values
        // make sure the prop exists first
        this.defaultValue = item[this.columnDef.field] && item[this.columnDef.field].toString();
        this.$editorElm.find('option').each((i, $e) => {
            $e.selected = (this.defaultValue === $e.value);
        });
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return (this.isMultipleSelect) ? this.currentValues : this.currentValue;
    }
    /**
     * @return {?}
     */
    focus() {
        if (this.$editorElm && this.$editorElm.multipleSelect) {
            this.$editorElm.multipleSelect('focus');
        }
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        if (this.isMultipleSelect) {
            return !arraysEqual(this.$editorElm.val(), this.defaultValue);
        }
        return this.$editorElm.val() !== this.defaultValue;
    }
    /**
     * @return {?}
     */
    validate() {
        if (this.validator) {
            const /** @type {?} */ value = this.isMultipleSelect ? this.currentValues : this.currentValue;
            const /** @type {?} */ validationResults = this.validator(value, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        // by default the editor is always valid
        // if user want it to be a required checkbox, he would have to provide his own validator
        return {
            valid: true,
            msg: null
        };
    }
    /**
     * user might want to filter certain items of the collection
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    filterCollection(inputCollection) {
        let /** @type {?} */ outputCollection = inputCollection;
        // user might want to filter certain items of the collection
        if (this.columnEditor && this.columnEditor.collectionFilterBy) {
            const /** @type {?} */ filterBy = this.columnEditor.collectionFilterBy;
            const /** @type {?} */ filterCollectionBy = this.columnEditor.collectionOptions && this.columnEditor.collectionOptions.filterAfterEachPass || null;
            outputCollection = this._collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    }
    /**
     * user might want to sort the collection in a certain way
     * @param {?} inputCollection
     * @return {?} outputCollection sorted collection
     */
    sortCollection(inputCollection) {
        let /** @type {?} */ outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionSortBy) {
            const /** @type {?} */ sortBy = this.columnDef.internalColumnEditor.collectionSortBy;
            outputCollection = this._collectionService.sortCollection(outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    renderDomElement(collection) {
        if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('The "collection" passed to the Select Editor is not a valid array');
        }
        // user can optionally add a blank entry at the beginning of the collection
        if (this.collectionOptions && this.collectionOptions.addBlankEntry) {
            collection.unshift(this.createBlankEntry());
        }
        let /** @type {?} */ newCollection = collection || [];
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // step 1, create HTML string template
        const /** @type {?} */ editorTemplate = this.buildTemplateHtmlString(newCollection);
        // step 2, create the DOM Element of the editor
        // also subscribe to the onClose event
        this.createDomElement(editorTemplate);
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    buildTemplateHtmlString(collection) {
        let /** @type {?} */ options = '';
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        const /** @type {?} */ isRenderHtmlEnabled = this.columnDef.internalColumnEditor.enableRenderHtml || false;
        const /** @type {?} */ sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
        // collection could be an Array of Strings OR Objects
        if (collection.every(x => typeof x === 'string')) {
            collection.forEach((option) => {
                options += `<option value="${option}" label="${option}">${option}</option>`;
            });
        }
        else {
            // array of objects will require a label/value pair unless a customStructure is passed
            collection.forEach((option) => {
                if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error(`[select-editor] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example: { collection: [ { value: '1', label: 'One' } ])`);
                }
                const /** @type {?} */ labelKey = /** @type {?} */ ((option.labelKey || option[this.labelName]));
                const /** @type {?} */ labelText = ((option.labelKey || this.enableTranslateLabel) && labelKey) ? this._translate.instant(labelKey || ' ') : labelKey;
                let /** @type {?} */ prefixText = option[this.labelPrefixName] || '';
                let /** @type {?} */ suffixText = option[this.labelSuffixName] || '';
                let /** @type {?} */ optionLabel = option[this.optionLabel] || '';
                optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
                suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
                optionLabel = (this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? this._translate.instant(optionLabel || ' ') : optionLabel;
                // add to a temp array for joining purpose and filter out empty text
                const /** @type {?} */ tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text);
                let /** @type {?} */ optionText = tmpOptionArray.join(separatorBetweenLabels);
                // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                if (isRenderHtmlEnabled) {
                    // sanitize any unauthorized html tags like script and others
                    // for the remaining allowed tags we'll permit all attributes
                    const /** @type {?} */ sanitizedText = DOMPurify$1.sanitize(optionText, sanitizedOptions);
                    optionText = htmlEncode(sanitizedText);
                }
                options += `<option value="${option[this.valueName]}" label="${optionLabel}">${optionText}</option>`;
            });
        }
        return `<select id="${this.elementName}" class="ms-filter search-filter editor-${fieldId}" ${this.isMultipleSelect ? 'multiple="multiple"' : ''}>${options}</select>`;
    }
    /**
     * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
     * @return {?}
     */
    createBlankEntry() {
        const /** @type {?} */ blankEntry = {
            [this.labelName]: '',
            [this.valueName]: ''
        };
        if (this.labelPrefixName) {
            blankEntry[this.labelPrefixName] = '';
        }
        if (this.labelSuffixName) {
            blankEntry[this.labelSuffixName] = '';
        }
        return blankEntry;
    }
    /**
     * Build the template HTML string
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
            const /** @type {?} */ elementOptions = (this.columnDef.internalColumnEditor) ? this.columnDef.internalColumnEditor.elementOptions : {};
            this.editorElmOptions = Object.assign({}, this.defaultOptions, elementOptions);
            this.$editorElm = this.$editorElm.multipleSelect(this.editorElmOptions);
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
class MultipleSelectEditor extends SelectEditor {
    /**
     * Initialize the Editor
     * @param {?} args
     */
    constructor(args) {
        super(args, true);
        this.args = args;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SingleSelectEditor extends SelectEditor {
    /**
     * Initialize the Editor
     * @param {?} args
     */
    constructor(args) {
        super(args, false);
        this.args = args;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const DEFAULT_MIN_VALUE$2 = 0;
const DEFAULT_MAX_VALUE$2 = 100;
const DEFAULT_STEP$2 = 1;
class SliderEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.init();
    }
    /**
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor || {};
    }
    /**
     * Getter for the Editor Generic Params
     * @return {?}
     */
    get editorParams() {
        return this.columnEditor.params || {};
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    init() {
        const /** @type {?} */ container = this.args && this.args.container;
        // define the input & slider number IDs
        const /** @type {?} */ itemId = this.args && this.args.item && this.args.item.id;
        this._elementRangeInputId = `rangeInput_${this.columnDef.field}_${itemId}`;
        this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}_${itemId}`;
        // create HTML string template
        const /** @type {?} */ editorTemplate = this.buildTemplateHtmlString();
        this.$editorElm = $(editorTemplate);
        this.$input = this.$editorElm.children('input');
        this.$sliderNumber = this.$editorElm.children('div.input-group-addon.input-group-append').children();
        // watch on change event
        this.$editorElm
            .appendTo(container)
            .on('mouseup', () => this.save());
        // if user chose to display the slider number on the right side, then update it every time it changes
        // we need to use both "input" and "change" event to be all cross-browser
        if (!this.editorParams.hideSliderNumber) {
            this.$editorElm.on('input change', (e) => {
                const /** @type {?} */ value = e && e.target && e.target.value || '';
                if (value) {
                    document.getElementById(this._elementRangeOutputId).innerHTML = e.target.value;
                }
            });
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$editorElm.remove();
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
    save() {
        if (this.args.grid.getOptions().autoCommitEdit) {
            this.args.grid.getEditorLock().commitCurrentEdit();
        }
        else {
            this.args.commitChanges();
        }
    }
    /**
     * @return {?}
     */
    cancel() {
        this.$input.val(this.defaultValue);
        this.args.cancelChanges();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        // this.$input.val(this.defaultValue = item[this.columnDef.field]);
        this.defaultValue = item[this.columnDef.field];
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$sliderNumber.html(this.defaultValue);
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
        item[this.columnDef.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        const /** @type {?} */ elmValue = this.$input.val();
        return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    validate() {
        const /** @type {?} */ elmValue = this.$input.val();
        const /** @type {?} */ minValue = this.columnEditor.minValue;
        const /** @type {?} */ maxValue = this.columnEditor.maxValue;
        const /** @type {?} */ errorMsg = this.columnEditor.errorMessage;
        const /** @type {?} */ mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue
        };
        if (this.validator) {
            const /** @type {?} */ validationResults = this.validator(elmValue, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        else if (minValue !== undefined && (elmValue < minValue || elmValue > maxValue)) {
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (matched) => {
                    return mapValidation[matched];
                })
            };
        }
        return {
            valid: true,
            msg: null
        };
    }
    /**
     * Create the HTML template as a string
     * @return {?}
     */
    buildTemplateHtmlString() {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        const /** @type {?} */ minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE$2;
        const /** @type {?} */ maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE$2;
        const /** @type {?} */ defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
        const /** @type {?} */ step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP$2;
        const /** @type {?} */ itemId = this.args && this.args.item && this.args.item.id;
        if (this.editorParams.hideSliderNumber) {
            return `
      <div class="slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range" />
      </div>`;
        }
        return `
      <div class="input-group slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range" />
        <div class="input-group-addon input-group-append slider-value"><span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span></div>
      </div>`;
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
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
    }
    /**
     * @return {?}
     */
    get hasAutoCommitEdit() {
        return this.args.grid.getOptions().autoCommitEdit;
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    init() {
        const /** @type {?} */ fieldId = this.columnDef && this.columnDef.id;
        this.$input = $(`<input type="text" class="editor-text editor-${fieldId}" />`)
            .appendTo(this.args.container)
            .on('keydown.nav', (e) => {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        });
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$input.on('focusout', () => this.save());
        }
        setTimeout(() => {
            this.$input.focus().select();
        }, 50);
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
    save() {
        const /** @type {?} */ validation = this.validate();
        if (validation && validation.valid) {
            if (this.hasAutoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    }
    /**
     * @return {?}
     */
    validate() {
        if (this.validator) {
            const /** @type {?} */ value = this.$input && this.$input.val && this.$input.val();
            const /** @type {?} */ validationResults = this.validator(value, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        // by default the editor is always valid
        // if user want it to be a required checkbox, he would have to provide his own validator
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
    /** Checkbox Editor (uses native checkbox DOM element) */
    checkbox: CheckboxEditor,
    /** Date Picker Editor (which uses 3rd party lib "flatpickr") */
    date: DateEditor,
    /** Float Number Editor */
    float: FloatEditor,
    /** Integer Editor */
    integer: IntegerEditor,
    /** Long Text Editor (uses a textarea) */
    longText: LongTextEditor,
    /** Multiple Select editor (which uses 3rd party lib "multiple-select.js") */
    multipleSelect: MultipleSelectEditor,
    /** Single Select editor (which uses 3rd party lib "multiple-select.js") */
    singleSelect: SingleSelectEditor,
    /** Slider Editor */
    slider: SliderEditor,
    /** Text Editor */
    text: TextEditor
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const arrayObjectToCsvFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ propertyNames = columnDef && columnDef.params && columnDef.params.propertyNames;
    const /** @type {?} */ parentObjectKeyName = columnDef && columnDef.field && columnDef.field.split('.')[0]; // e.g. "users.roles" would be "users"
    if (!propertyNames || !Array.isArray(propertyNames) || !parentObjectKeyName) {
        throw new Error(`Formatters.arrayObjectToCsv requires you to pass an array of "propertyNames" (declared in "params") that you want to pull the data from.
      For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition:: { params: { propertyNames: ['firtName'] }}`);
    }
    // the dataContext holds all the data, so we can find the values we want even when "value" argument might be null
    // e.g. if we want to use the propertyNames of ['firstName', 'lastName'] from the "users" array of objects
    if (dataContext[parentObjectKeyName] && Array.isArray(dataContext[parentObjectKeyName])) {
        // we will 1st get the object from the dataContext, then
        if (Array.isArray(dataContext[parentObjectKeyName])) {
            const /** @type {?} */ outputStrings = [];
            dataContext[parentObjectKeyName].forEach((data) => {
                const /** @type {?} */ strings = [];
                // 2nd from that data loop through all propertyNames we want to use (e.g.: ['firstName', 'lastName'])
                propertyNames.forEach((prop) => {
                    strings.push(data[prop]);
                });
                // we will join these strings with spaces (e.g. 'John Doe' where 'John' was firstName and 'Doe' was lastName)
                outputStrings.push(strings.join(' '));
            });
            // finally join all the output strings by CSV (e.g.: 'John Doe, Jane Doe')
            const /** @type {?} */ output = outputStrings.join(', ');
            return `<span title="${output}">${output}</span>`;
        }
    }
    return '';
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
const boldFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
    if (!isNumber) {
        return '';
    }
    else if (value >= 0) {
        return `<span style="font-weight: bold">${decimalFormatted(value, 2, 2)}$</span>`;
    }
    else {
        return `<span style="font-weight: bold">${decimalFormatted(value, 2, 2)}$</span>`;
    }
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
/**
 * A formatter to show the label property value of an editor collection
 */
const collectionEditorFormatter = (row, cell, value, columnDef, dataContext) => {
    if (!value || !columnDef || !columnDef.internalColumnEditor || !columnDef.internalColumnEditor.collection
        || !columnDef.internalColumnEditor.collection.length) {
        return '';
    }
    const { internalColumnEditor, internalColumnEditor: { collection } } = columnDef;
    const /** @type {?} */ labelName = (internalColumnEditor.customStructure) ? internalColumnEditor.customStructure.label : 'label';
    const /** @type {?} */ valueName = (internalColumnEditor.customStructure) ? internalColumnEditor.customStructure.value : 'value';
    if (Array.isArray(value)) {
        if (collection.every(x => typeof x === 'string')) {
            return arrayToCsvFormatter(row, cell, value.map((v) => findOrDefault(collection, (c) => c === v)), columnDef, dataContext);
        }
        else {
            return arrayToCsvFormatter(row, cell, value.map((v) => findOrDefault(collection, (c) => c[valueName] === v)[labelName]), columnDef, dataContext);
        }
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
    return complexField.split('.').reduce((obj, i) => (obj ? obj[i] : ''), dataContext);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$9 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$6 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
const dateIsoFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isDateValid = moment$9(value, FORMAT$6, false).isValid();
    return (value && isDateValid) ? moment$9(value).format(FORMAT$6) : value;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$10 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$7 = mapMomentDateFormatWithFieldType(FieldType.dateTimeIso);
const dateTimeIsoFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isDateValid = moment$10(value, FORMAT$7, false).isValid();
    return (value && isDateValid) ? moment$10(value).format(FORMAT$7) : value;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$11 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$8 = mapMomentDateFormatWithFieldType(FieldType.dateTimeIsoAmPm);
const dateTimeIsoAmPmFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isDateValid = moment$11(value, FORMAT$8, false).isValid();
    return (value && isDateValid) ? moment$11(value).format(FORMAT$8) : value;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$12 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$9 = mapMomentDateFormatWithFieldType(FieldType.dateTimeUsAmPm);
const dateTimeUsAmPmFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isDateValid = moment$12(value, FORMAT$9, false).isValid();
    return (value && isDateValid) ? moment$12(value).format(FORMAT$9) : value;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$13 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$10 = mapMomentDateFormatWithFieldType(FieldType.dateTimeUs);
const dateTimeUsFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isDateValid = moment$13(value, FORMAT$10, false).isValid();
    return (value && isDateValid) ? moment$13(value).format(FORMAT$10) : value;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$14 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$11 = mapMomentDateFormatWithFieldType(FieldType.dateTimeShortIso);
const dateTimeShortIsoFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isDateValid = moment$14(value, FORMAT$11, false).isValid();
    return (value && isDateValid) ? moment$14(value).format(FORMAT$11) : value;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$15 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$12 = mapMomentDateFormatWithFieldType(FieldType.dateTimeShortUs);
const dateTimeShortUsFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isDateValid = moment$15(value, FORMAT$12, false).isValid();
    return (value && isDateValid) ? moment$15(value).format(FORMAT$12) : value;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const moment$16 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT$13 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
const dateUsFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isDateValid = moment$16(value, FORMAT$13, false).isValid();
    return (value && isDateValid) ? moment$16(value).format(FORMAT$13) : value;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const decimalFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ params = columnDef.params || {};
    const /** @type {?} */ minDecimalPlaces = params.minDecimalPlaces || params.decimalPlaces || 2;
    const /** @type {?} */ maxDecimalPlaces = params.maxDecimalPlaces || 2;
    const /** @type {?} */ isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
    return !isNumber ? value : `${decimalFormatted(value, minDecimalPlaces, maxDecimalPlaces)}`;
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const deleteIconFormatter = (row, cell, value, columnDef, dataContext) => `<i class="fa fa-trash pointer delete-icon" aria-hidden="true"></i>`;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const dollarColoredBoldFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
    const /** @type {?} */ params = columnDef && columnDef.params || {};
    const /** @type {?} */ minDecimal = params.minDecimal || 2;
    const /** @type {?} */ maxDecimal = params.minDecimal || 4;
    const /** @type {?} */ outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;
    if (!isNumber) {
        return '';
    }
    else if (value >= 0) {
        return `<span style="color:green; font-weight: bold;">$${outputValue}</span>`;
    }
    else {
        return `<span style="color:red; font-weight: bold;">$${outputValue}</span>`;
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const dollarColoredFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
    const /** @type {?} */ params = columnDef && columnDef.params || {};
    const /** @type {?} */ minDecimal = params.minDecimal || 2;
    const /** @type {?} */ maxDecimal = params.minDecimal || 4;
    const /** @type {?} */ outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;
    if (!isNumber) {
        return '';
    }
    else if (value >= 0) {
        return `<span style="color:green;">$${outputValue}</span>`;
    }
    else {
        return `<span style="color:red;">$${outputValue}</span>`;
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const dollarFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
    const /** @type {?} */ params = columnDef && columnDef.params || {};
    const /** @type {?} */ minDecimal = params.minDecimal || 2;
    const /** @type {?} */ maxDecimal = params.minDecimal || 4;
    const /** @type {?} */ outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;
    return !isNumber ? '' : `$${outputValue}`;
};

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
/**
 * Takes a value display it according to a mask provided
 * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
 */
const maskFormatter = (row, cell, value, columnDef, dataContext) => {
    const /** @type {?} */ params = columnDef.params || {};
    const /** @type {?} */ mask = params.mask;
    if (!mask) {
        throw new Error(`You must provide a "mask" via the generic "params" options (e.g.: { formatter: Formatters.mask, params: { mask: '000-000' }}`);
    }
    if (value && mask) {
        let /** @type {?} */ i = 0;
        const /** @type {?} */ v = value.toString();
        return mask.replace(/[09A]/g, () => v[i++] || '');
    }
    return '';
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
const percentFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value === null || value === '') {
        return '';
    }
    const /** @type {?} */ outputValue = value > 0 ? value / 100 : 0;
    return `<span>${outputValue}%</span>`;
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
const percentSymbolFormatter = (row, cell, value, columnDef, dataContext) => {
    return value ? `<span>${value}%</span>` : '';
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
    <div class="progress-bar progress-bar-${color} bg-${color}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${value}%;">
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
    const /** @type {?} */ options = gridOptions || columnDef.params || {};
    const /** @type {?} */ translate = options.i18n;
    if (!translate || typeof translate.instant !== 'function') {
        throw new Error(`The translate formatter requires the "ngx-translate" Service to be provided as a Grid Options or Column Definition "i18n".
    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }`);
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
    const /** @type {?} */ options = gridOptions || columnDef.params || {};
    const /** @type {?} */ translate = options.i18n;
    if (!translate || typeof translate.instant !== 'function') {
        throw new Error(`The translate formatter requires the "ngx-translate" Service to be provided as a Grid Options or Column Definition "i18n".
    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }`);
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
    /**
       * Takes an array of complex objects converts it to a comma delimited string.
       * Requires to pass an array of "propertyNames" in the column definition the generic "params" property
       * For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition::
       * { params: { propertyNames: ['firtName'] }}
       */
    arrayObjectToCsv: arrayObjectToCsvFormatter,
    /** Takes an array of string and converts it to a comma delimited string */
    arrayToCsv: arrayToCsvFormatter,
    /** show value in bold font weight as well */
    bold: boldFormatter,
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
    /**
       * Looks up values from the columnDefinition.editor.collection property and displays the label in CSV or string format
       * @example
       * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
       * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
       * const dataset = [{ value: 1 },{ value: 2 }];
       */
    collectionEditor: collectionEditorFormatter,
    /** Takes a Date object and displays it as an ISO Date format */
    dateIso: dateIsoFormatter,
    /** Takes a Date object and displays it as an ISO Date+Time format */
    dateTimeIso: dateTimeIsoFormatter,
    /** Takes a Date object and displays it as an ISO Date+Time (without seconds) format */
    dateTimeShortIso: dateTimeShortIsoFormatter,
    /** Takes a Date object and displays it as an ISO Date+Time+(am/pm) format */
    dateTimeIsoAmPm: dateTimeIsoAmPmFormatter,
    /** Takes a Date object and displays it as an US Date format */
    dateUs: dateUsFormatter,
    /** Takes a Date object and displays it as an US Date+Time format */
    dateTimeUs: dateTimeUsFormatter,
    /** Takes a Date object and displays it as an US Date+Time (without seconds) format */
    dateTimeShortUs: dateTimeShortUsFormatter,
    /** Takes a Date object and displays it as an US Date+Time+(am/pm) format */
    dateTimeUsAmPm: dateTimeUsAmPmFormatter,
    /** Displays a Font-Awesome delete icon (fa-trash) */
    deleteIcon: deleteIconFormatter,
    /**
       * Display the value as x decimals formatted, defaults to 2 decimals.
       * You can pass "decimalPlaces" or "minDecimalPlaces" and/or "maxDecimalPlaces" to the "params" property.
       * For example:: `{ formatter: Formatters.decimal, params: { decimalPlaces: 3 }}`
       * The property "decimalPlaces" is an alias of "minDecimalPlaces"
       */
    decimal: decimalFormatter,
    /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value */
    dollar: dollarFormatter,
    /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value */
    dollarColored: dollarColoredFormatter,
    /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value, show it in bold font weight as well */
    dollarColoredBold: dollarColoredBoldFormatter,
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
       * Takes a value display it according to a mask provided
       * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
       */
    mask: maskFormatter,
    /**
       * You can pipe multiple formatters (executed in sequence), use params to pass the list of formatters.
       * Requires to pass an array of "formatters" in the column definition the generic "params" property
       * For example::
       * { field: 'title', formatter: Formatters.multiple, params: { formatters: [ Formatters.lowercase, Formatters.uppercase ] }
       */
    multiple: multipleFormatter,
    /** Takes a cell value number (between 0.0-1.0) and displays a red (<50) or green (>=50) bar */
    percent: percentFormatter,
    /** Takes a cell value number (between 0.0-100) and displays a red (<50) or green (>=50) bar */
    percentComplete: percentCompleteFormatter,
    /** Takes a cell value number (between 0-100) and displays Bootstrap "percent-complete-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
    percentCompleteBar: percentCompleteBarFormatter,
    /** Takes a cell value number (between 0-100) and add the "%" after the number */
    percentSymbol: percentSymbolFormatter,
    /** Takes a cell value number (between 0-100) and displays Bootstrap "progress-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
    progressBar: progressBarFormatter,
    /** Takes a cell value and translates it (i18n). Requires an instance of the Translate Service:: `i18n: this.translate */
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
const avgTotalsPercentageFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.avg && totals.avg[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + Math.round(val) + '%' + suffix;
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const avgTotalsDollarFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.avg && totals.avg[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + '$' + decimalFormatted(val, 2, 4) + suffix;
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const avgTotalsFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.avg && totals.avg[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + Math.round(val) + suffix;
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const minTotalsFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.min && totals.min[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const maxTotalsFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.max && totals.max[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const sumTotalsColoredFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.sum && totals.sum[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (isNaN(+val)) {
        return '';
    }
    else if (val >= 0) {
        return `<span style="color:green;">${prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix}</span>`;
    }
    else {
        return `<span style="color:red;">${prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix}</span>`;
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const sumTotalsDollarColoredBoldFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.sum && totals.sum[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (isNaN(+val)) {
        return '';
    }
    else if (val >= 0) {
        return `<span style="color:green; font-weight: bold;">${prefix + '$' + decimalFormatted(val, 2, 2) + suffix}</span>`;
    }
    else {
        return `<span style="color:red; font-weight: bold;">${prefix + '$' + decimalFormatted(val, 2, 2) + suffix}</span>`;
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const sumTotalsDollarColoredFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.sum && totals.sum[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (isNaN(+val)) {
        return '';
    }
    else if (val >= 0) {
        return `<span style="color:green;">${prefix + '$' + decimalFormatted(val, 2, 2) + suffix}</span>`;
    }
    else {
        return `<span style="color:red;">${prefix + '$' + decimalFormatted(val, 2, 2) + suffix}</span>`;
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const sumTotalsDollarBoldFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.sum && totals.sum[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return `<span style="font-weight: bold;">${prefix + '$' + decimalFormatted(val, 2, 4) + suffix}</span>`;
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const sumTotalsDollarFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.sum && totals.sum[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + '$' + decimalFormatted(val, 2, 2) + suffix;
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const sumTotalsFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.sum && totals.sum[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const sumTotalsBoldFormatter = (totals, columnDef, grid) => {
    const /** @type {?} */ field = columnDef.field || '';
    const /** @type {?} */ val = totals.sum && totals.sum[field];
    const /** @type {?} */ prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    const /** @type {?} */ suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return `<span style="font-weight: bold;">${prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix}`;
    }
    return '';
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provides a list of different Formatters that will change the cell value displayed in the UI
 */
const GroupTotalFormatters = {
    /**
       * Average all the column totals
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    avgTotals: avgTotalsFormatter,
    /**
       * Average all the column totals and display '$' at the end of the value
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    avgTotalsDollar: avgTotalsDollarFormatter,
    /**
       * Average all the column totals and display '%' at the end of the value
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    avgTotalsPercentage: avgTotalsPercentageFormatter,
    /**
       * Show max value of all the column totals
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    maxTotals: maxTotalsFormatter,
    /**
       * Show min value of all the column totals
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    minTotals: minTotalsFormatter,
    /**
       * Sums up all the column totals
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    sumTotals: sumTotalsFormatter,
    /**
       * Sums up all the column totals and display it in bold font weight
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    sumTotalsBold: sumTotalsBoldFormatter,
    /**
       * Sums up all the column totals, change color of text to red/green on negative/positive value
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    sumTotalsColored: sumTotalsColoredFormatter,
    /**
       * Sums up all the column totals and display dollar sign
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    sumTotalsDollar: sumTotalsDollarFormatter,
    /**
       * Sums up all the column totals and display dollar sign and show it in bold font weight
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    sumTotalsDollarBold: sumTotalsDollarBoldFormatter,
    /**
       * Sums up all the column totals, change color of text to red/green on negative/positive value
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    sumTotalsDollarColored: sumTotalsDollarColoredFormatter,
    /**
       * Sums up all the column totals, change color of text to red/green on negative/positive value, show it in bold font weight as well
       * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
       */
    sumTotalsDollarColoredBold: sumTotalsDollarColoredBoldFormatter,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SlickPaginationComponent {
    /**
     * Constructor
     * @param {?} filterService
     */
    constructor(filterService) {
        this.filterService = filterService;
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
        // Subscribe to Filter clear and go back to page 1 when that happen
        this._filterSubcription = this.filterService.onFilterCleared.subscribe((data) => {
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
        const /** @type {?} */ backendApi = this._gridPaginationOptions.backendServiceApi;
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
            const /** @type {?} */ backendApi = this._gridPaginationOptions.backendServiceApi;
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
                try {
                    const /** @type {?} */ itemsPerPage = +this.itemsPerPage;
                    // keep start time & end timestamps & return it after process execution
                    const /** @type {?} */ startTime = new Date();
                    if (backendApi.preProcess) {
                        backendApi.preProcess();
                    }
                    const /** @type {?} */ query = backendApi.service.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                    // the process could be an Observable (like HttpClient) or a Promise
                    // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                    const /** @type {?} */ observableOrPromise = backendApi.process(query);
                    const /** @type {?} */ processResult = yield castToPromise(observableOrPromise);
                    const /** @type {?} */ endTime = new Date();
                    // from the result, call our internal post process to update the Dataset and Pagination info
                    if (processResult && backendApi.internalPostProcess) {
                        backendApi.internalPostProcess(processResult);
                    }
                    // send the response process to the postProcess callback
                    if (backendApi.postProcess) {
                        if (processResult instanceof Object) {
                            processResult.statistics = {
                                startTime,
                                endTime,
                                executionTime: endTime.valueOf() - startTime.valueOf(),
                                itemCount: this.totalItems,
                                totalItemCount: this.totalItems
                            };
                        }
                        backendApi.postProcess(processResult);
                    }
                }
                catch (/** @type {?} */ e) {
                    if (backendApi && backendApi.onError) {
                        backendApi.onError(e);
                    }
                    else {
                        throw e;
                    }
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
const slickgridEventPrefix = 'sg';
class AngularSlickgridComponent {
    /**
     * @param {?} elm
     * @param {?} exportService
     * @param {?} extensionService
     * @param {?} extensionUtility
     * @param {?} filterService
     * @param {?} gridService
     * @param {?} gridEventService
     * @param {?} gridStateService
     * @param {?} groupingAndColspanService
     * @param {?} resizer
     * @param {?} sharedService
     * @param {?} sortService
     * @param {?} translate
     * @param {?} forRootConfig
     */
    constructor(elm, exportService, extensionService, extensionUtility, filterService, gridService, gridEventService, gridStateService, groupingAndColspanService, resizer, sharedService, sortService, translate, forRootConfig) {
        this.elm = elm;
        this.exportService = exportService;
        this.extensionService = extensionService;
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.gridService = gridService;
        this.gridEventService = gridEventService;
        this.gridStateService = gridStateService;
        this.groupingAndColspanService = groupingAndColspanService;
        this.resizer = resizer;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this.forRootConfig = forRootConfig;
        this._eventHandler = new Slick.EventHandler();
        this._hideHeaderRowAfterPageLoad = false;
        this.groupingDefinition = {};
        this.showPagination = false;
        this.isGridInitialized = false;
        this.subscriptions = [];
        this.onAngularGridCreated = new EventEmitter();
        this.onDataviewCreated = new EventEmitter();
        this.onGridCreated = new EventEmitter();
        this.onGridInitialized = new EventEmitter();
        this.onBeforeGridCreate = new EventEmitter();
        this.onBeforeGridDestroy = new EventEmitter();
        this.onAfterGridDestroyed = new EventEmitter();
        this.onGridStateChanged = new EventEmitter();
    }
    /**
     * @param {?} height
     * @return {?}
     */
    set gridHeight(height) {
        this._fixedHeight = height;
    }
    /**
     * @param {?} width
     * @return {?}
     */
    set gridWidth(width) {
        this._fixedWidth = width;
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
        if (this.gridOptions && !this.gridOptions.enableAutoResize && !this.gridOptions.autoResize) {
            this.gridHeightString = `${this._fixedHeight}px`;
            this.gridWidthString = `${this._fixedWidth}px`;
        }
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
     * @param {?=} emptyDomElementContainer
     * @return {?}
     */
    destroy(emptyDomElementContainer = false) {
        this._dataView = [];
        this.gridOptions = {};
        this._eventHandler.unsubscribeAll();
        this.extensionService.dispose();
        this.filterService.dispose();
        this.gridEventService.dispose();
        this.gridStateService.dispose();
        this.groupingAndColspanService.dispose();
        this.resizer.dispose();
        this.sortService.dispose();
        this.grid.destroy();
        if (emptyDomElementContainer) {
            $(this.gridOptions.gridContainerId).empty();
        }
        // also unsubscribe all RxJS subscriptions
        this.subscriptions = unsubscribeAllObservables(this.subscriptions);
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
            this.extensionUtility.loadExtensionDynamically(ExtensionName.groupItemMetaProvider);
            this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
            this.sharedService.groupItemMetadataProvider = this.groupItemMetadataProvider;
            this._dataView = new Slick.Data.DataView({ groupItemMetadataProvider: this.groupItemMetadataProvider });
        }
        else {
            this._dataView = new Slick.Data.DataView();
        }
        // for convenience, we provide the property "editor" as an Angular-Slickgrid editor complex object
        // however "editor" is used internally by SlickGrid for it's own Editor Factory
        // so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
        // then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
        this._columnDefinitions = this._columnDefinitions.map((column) => {
            // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
            if (column.editor && column.editor.collectionAsync) {
                this.loadEditorCollectionAsync(column);
            }
            return Object.assign({}, column, { editor: column.editor && column.editor.model, internalColumnEditor: Object.assign({}, column.editor) });
        });
        // save reference for all columns before they optionally become hidden/visible
        this.sharedService.allColumns = this._columnDefinitions;
        this.sharedService.visibleColumns = this._columnDefinitions;
        this.extensionService.createCheckboxPluginBeforeGridCreation(this._columnDefinitions, this.gridOptions);
        if (this.gridOptions && this.gridOptions.enableCustomDataView) {
            this.grid = new Slick.Grid(`#${this.gridId}`, this.customDataView, this._columnDefinitions, this.gridOptions);
        }
        else {
            this.grid = new Slick.Grid(`#${this.gridId}`, this._dataView, this._columnDefinitions, this.gridOptions);
        }
        this.sharedService.dataView = this._dataView;
        this.sharedService.grid = this.grid;
        this.extensionService.attachDifferentExtensions();
        this.attachDifferentHooks(this.grid, this.gridOptions, this._dataView);
        // emit the Grid & DataView object to make them available in parent component
        this.onGridCreated.emit(this.grid);
        this.onDataviewCreated.emit(this._dataView);
        this.grid.init();
        this._dataView.beginUpdate();
        this._dataView.setItems(this._dataset, this.gridOptions.datasetIdPropertyName);
        this._dataView.endUpdate();
        // user might want to hide the header row on page load but still have `enableFiltering: true`
        // if that is the case, we need to hide the headerRow ONLY AFTER all filters got created & dataView exist
        if (this._hideHeaderRowAfterPageLoad) {
            this.showHeaderRow(false);
        }
        // after the DataView is created & updated execute some processes
        this.executeAfterDataviewCreated(this.grid, this.gridOptions, this._dataView);
        // attach resize ONLY after the dataView is ready
        this.attachResizeHook(this.grid, this.gridOptions);
        // attach grouping and header grouping colspan service
        if (this.gridOptions.createPreHeaderPanel) {
            this.groupingAndColspanService.init(this.grid, this._dataView);
        }
        // attach grid  service
        this.gridService.init(this.grid, this._dataView);
        // when user enables translation, we need to translate Headers on first pass & subsequently in the attachDifferentHooks
        if (this.gridOptions.enableTranslate) {
            this.extensionService.translateColumnHeaders();
        }
        // if Export is enabled, initialize the service with the necessary grid and other objects
        if (this.gridOptions.enableExport) {
            this.exportService.init(this.grid, this._dataView);
        }
        // once all hooks are in placed and the grid is initialized, we can emit an event
        this.onGridInitialized.emit(this.grid);
        // attach the Backend Service API callback functions only after the grid is initialized
        // because the preProcess() and onInit() might get triggered
        if (this.gridOptions && this.gridOptions.backendServiceApi) {
            this.attachBackendCallbackFunctions(this.gridOptions);
        }
        this.gridStateService.init(this.grid, this.extensionService, this.filterService, this.sortService);
        this.onAngularGridCreated.emit({
            // Slick Grid & DataView objects
            dataView: this._dataView,
            slickGrid: this.grid,
            // public methods
            destroy: this.destroy.bind(this),
            // return all available Services (non-singleton)
            backendService: this.gridOptions && this.gridOptions.backendServiceApi && this.gridOptions.backendServiceApi.service,
            exportService: this.exportService,
            filterService: this.filterService,
            gridEventService: this.gridEventService,
            gridStateService: this.gridStateService,
            gridService: this.gridService,
            groupingService: this.groupingAndColspanService,
            extensionService: this.extensionService,
            /** @deprecated please use "extensionService" instead */
            pluginService: this.extensionService,
            resizerService: this.resizer,
            sortService: this.sortService,
        });
    }
    /**
     * Commits the current edit to the grid
     * @param {?} target
     * @return {?}
     */
    commitEdit(target) {
        if (this.grid.getOptions().autoCommitEdit) {
            const /** @type {?} */ activeNode = this.grid.getActiveCellNode();
            // a timeout must be set or this could come into conflict when slickgrid
            // tries to commit the edit when going from one editor to another on the grid
            // through the click event. If the timeout was not here it would
            // try to commit/destroy the twice, which would throw a jquery
            // error about the element not being in the DOM
            setTimeout(() => {
                // make sure the target is the active editor so we do not
                // commit prematurely
                if (activeNode && activeNode.contains(target) && this.grid.getEditorLock().isActive()) {
                    this.grid.getEditorLock().commitCurrentEdit();
                }
            });
        }
    }
    /**
     * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service only feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     * @param {?} gridOptions
     * @return {?}
     */
    createBackendApiInternalPostProcessCallback(gridOptions) {
        if (gridOptions && gridOptions.backendServiceApi) {
            const /** @type {?} */ backendApi = gridOptions.backendServiceApi;
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
        this.subscriptions.push(this.translate.onLangChange.subscribe((event) => {
            if (gridOptions.enableTranslate) {
                this.extensionService.translateColumnHeaders();
                this.extensionService.translateColumnPicker();
                this.extensionService.translateGridMenu();
                this.extensionService.translateHeaderMenu();
            }
        }));
        // if user entered some Columns "presets", we need to reflect them all in the grid
        if (gridOptions.presets && Array.isArray(gridOptions.presets.columns) && gridOptions.presets.columns.length > 0) {
            const /** @type {?} */ gridColumns = this.gridStateService.getAssociatedGridColumns(grid, gridOptions.presets.columns);
            if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
                // make sure that the checkbox selector is also visible if it is enabled
                if (gridOptions.enableCheckboxSelector) {
                    const /** @type {?} */ checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
                    if (checkboxColumn && checkboxColumn.id === '_checkbox_selector' && gridColumns[0].id !== '_checkbox_selector') {
                        gridColumns.unshift(checkboxColumn);
                    }
                }
                // finally set the new presets columns (including checkbox selector if need be)
                grid.setColumns(gridColumns);
            }
        }
        // attach external sorting (backend) when available or default onSort (dataView)
        if (gridOptions.enableSorting && !gridOptions.enableCustomDataView) {
            gridOptions.backendServiceApi ? this.sortService.attachBackendOnSort(grid, dataView) : this.sortService.attachLocalOnSort(grid, dataView);
        }
        // attach external filter (backend) when available or default onFilter (dataView)
        if (gridOptions.enableFiltering && !gridOptions.enableCustomDataView) {
            this.filterService.init(grid);
            // if user entered some "presets", we need to reflect them all in the DOM
            if (gridOptions.presets && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                this.filterService.populateColumnFilterSearchTerms();
            }
            gridOptions.backendServiceApi ? this.filterService.attachBackendOnFilter(grid) : this.filterService.attachLocalOnFilter(grid, this._dataView);
        }
        // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
        if (gridOptions.backendServiceApi) {
            const /** @type {?} */ backendApi = gridOptions.backendServiceApi;
            if (backendApi && backendApi.service && backendApi.service.init) {
                backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
            }
        }
        // expose all Slick Grid Events through dispatch
        for (const /** @type {?} */ prop in grid) {
            if (grid.hasOwnProperty(prop) && prop.startsWith('on')) {
                this._eventHandler.subscribe(grid[prop], (e, args) => {
                    return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: e, args });
                });
            }
        }
        // expose all Slick DataView Events through dispatch
        for (const /** @type {?} */ prop in dataView) {
            if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
                this._eventHandler.subscribe(dataView[prop], (e, args) => {
                    return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: e, args });
                });
            }
        }
        // expose GridState Service changes event through dispatch
        this.subscriptions.push(this.gridStateService.onGridStateChanged.subscribe((gridStateChange) => {
            this.onGridStateChanged.emit(gridStateChange);
        }));
        // on cell click, mainly used with the columnDef.action callback
        this.gridEventService.attachOnCellChange(grid, dataView);
        this.gridEventService.attachOnClick(grid, dataView);
        this._eventHandler.subscribe(dataView.onRowCountChanged, (e, args) => {
            grid.updateRowCount();
            grid.render();
        });
        this._eventHandler.subscribe(dataView.onRowsChanged, (e, args) => {
            grid.invalidateRows(args.rows);
            grid.render();
        });
        // does the user have a colspan callback?
        if (gridOptions.colspanCallback) {
            this._dataView.getItemMetadata = (rowNumber) => {
                const /** @type {?} */ item = this._dataView.getItem(rowNumber);
                return gridOptions.colspanCallback(item);
            };
        }
    }
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    attachBackendCallbackFunctions(gridOptions) {
        const /** @type {?} */ backendApi = gridOptions.backendServiceApi;
        const /** @type {?} */ serviceOptions = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
        const /** @type {?} */ isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
        // update backend filters (if need be) before the query runs
        if (backendApi) {
            const /** @type {?} */ backendService = backendApi.service;
            // if user entered some any "presets", we need to reflect them all in the grid
            if (gridOptions && gridOptions.presets) {
                // Filters "presets"
                if (backendService && backendService.updateFilters && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                    backendService.updateFilters(gridOptions.presets.filters, true);
                }
                // Sorters "presets"
                if (backendService && backendService.updateSorters && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                    backendService.updateSorters(undefined, gridOptions.presets.sorters);
                }
                // Pagination "presets"
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
                // keep start time & end timestamps & return it after process execution
                const /** @type {?} */ startTime = new Date();
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                try {
                    // the process could be an Observable (like HttpClient) or a Promise
                    // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                    const /** @type {?} */ processResult = yield castToPromise(observableOrPromise);
                    const /** @type {?} */ endTime = new Date();
                    // define what our internal Post Process callback, only available for GraphQL Service for now
                    // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
                    if (processResult && backendApi && backendApi.service instanceof GraphqlService && backendApi.internalPostProcess) {
                        backendApi.internalPostProcess(processResult);
                    }
                    // send the response process to the postProcess callback
                    if (backendApi.postProcess) {
                        if (processResult instanceof Object) {
                            processResult.statistics = {
                                startTime,
                                endTime,
                                executionTime: endTime.valueOf() - startTime.valueOf(),
                                totalItemCount: this.gridOptions && this.gridOptions.pagination && this.gridOptions.pagination.totalItems
                            };
                        }
                        backendApi.postProcess(processResult);
                    }
                }
                catch (/** @type {?} */ e) {
                    if (backendApi && backendApi.onError) {
                        backendApi.onError(e);
                    }
                    else {
                        throw e;
                    }
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
        if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
            grid.autosizeColumns();
            // compensate anytime SlickGrid measureScrollbar is incorrect (only seems to happen in Chrome 1/5 computers)
            this.resizer.compensateHorizontalScroll(this.grid, this.gridOptions);
        }
        // auto-resize grid on browser resize
        if (this._fixedHeight || this._fixedWidth) {
            this.resizer.init(grid, { height: this._fixedHeight, width: this._fixedWidth });
        }
        else {
            this.resizer.init(grid);
        }
        if (options.enableAutoResize) {
            this.resizer.attachAutoResizeDataGrid();
            if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
                grid.autosizeColumns();
            }
        }
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    executeAfterDataviewCreated(grid, gridOptions, dataView) {
        // if user entered some Sort "presets", we need to reflect them all in the DOM
        if (gridOptions.enableSorting) {
            if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                this.sortService.loadLocalPresets(grid, dataView);
            }
        }
    }
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    mergeGridOptions(gridOptions) {
        gridOptions.gridId = this.gridId;
        gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;
        // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
        const /** @type {?} */ options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);
        // also make sure to show the header row if user have enabled filtering
        this._hideHeaderRowAfterPageLoad = (options.showHeaderRow === false);
        if (options.enableFiltering && !options.showHeaderRow) {
            options.showHeaderRow = options.enableFiltering;
        }
        return options;
    }
    /**
     * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
     * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
     * @param {?} pagination
     * @return {?}
     */
    paginationChanged(pagination) {
        if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
            this.gridService.setSelectedRows([]);
        }
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
            if (!this.gridOptions.backendServiceApi) {
                this._dataView.reSort();
            }
            // this.grid.setData(dataset);
            this.grid.invalidate();
            this.grid.render();
            if (this.gridOptions.backendServiceApi) {
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
            // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
            if (this.grid && this.gridOptions.enableAutoResize) {
                const /** @type {?} */ delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
                this.resizer.resizeGrid(delay || 10);
            }
        }
    }
    /**
     * Dynamically change or update the column definitions list.
     * We will re-render the grid so that the new header and data shows up correctly.
     * If using i18n, we also need to trigger a re-translate of the column headers
     * @param {?} newColumnDefinitions
     * @return {?}
     */
    updateColumnDefinitionsList(newColumnDefinitions) {
        if (this.gridOptions.enableTranslate) {
            this.extensionService.translateColumnHeaders(false, newColumnDefinitions);
        }
        else {
            this.extensionService.renderColumnHeaders(newColumnDefinitions);
        }
        if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
            this.grid.autosizeColumns();
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
    /**
     * Dispatch of Custom Event, which by default will bubble & is cancelable
     * @param {?} eventName
     * @param {?=} data
     * @param {?=} isBubbling
     * @param {?=} isCancelable
     * @return {?}
     */
    dispatchCustomEvent(eventName, data, isBubbling = true, isCancelable = true) {
        const /** @type {?} */ eventInit = { bubbles: isBubbling, cancelable: isCancelable };
        if (data) {
            eventInit.detail = data;
        }
        return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
    }
    /**
     * Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves
     * @param {?} column
     * @return {?}
     */
    loadEditorCollectionAsync(column) {
        const /** @type {?} */ collectionAsync = column && column.editor && column.editor.collectionAsync;
        if (collectionAsync instanceof Observable) {
            this.subscriptions.push(collectionAsync.subscribe((resolvedCollection) => this.updateEditorCollection(column, resolvedCollection)));
        }
    }
    /**
     * Update the Editor "collection" property from an async call resolved
     * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
     * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
     * @param {?} column
     * @param {?} newCollection
     * @return {?}
     */
    updateEditorCollection(column, newCollection) {
        column.editor.collection = newCollection;
        // find the new column reference pointer
        const /** @type {?} */ columns = this.grid.getColumns();
        if (Array.isArray(columns)) {
            const /** @type {?} */ columnRef = columns.find((col) => col.id === column.id);
            columnRef.internalColumnEditor = column.editor;
        }
    }
}
AngularSlickgridComponent.decorators = [
    { type: Injectable },
    { type: Component, args: [{
                selector: 'angular-slickgrid',
                template: `<div id="slickGridContainer-{{gridId}}" class="gridPane" [style.width]="gridWidthString">
    <div attr.id='{{gridId}}' class="slickgrid-container" style="width: 100%" [style.height]="gridHeightString">
    </div>

    <slick-pagination id="slickPagingContainer-{{gridId}}"
        *ngIf="showPagination"
        (onPaginationChanged)="paginationChanged($event)"
        [gridPaginationOptions]="gridPaginationOptions">
    </slick-pagination>
</div>
`,
                providers: [
                    AutoTooltipExtension,
                    CellExternalCopyManagerExtension,
                    CheckboxSelectorExtension,
                    ColumnPickerExtension,
                    ExtensionService,
                    ExportService,
                    ExtensionUtility,
                    FilterFactory,
                    FilterService,
                    GraphqlService,
                    GridEventService,
                    GridMenuExtension,
                    GridService,
                    GridStateService,
                    GroupingAndColspanService,
                    GroupItemMetaProviderExtension,
                    HeaderButtonExtension,
                    HeaderMenuExtension,
                    ResizerService,
                    RowMoveManagerExtension,
                    RowSelectionExtension,
                    SharedService,
                    SortService,
                    SlickgridConfig
                ]
            },] },
];
/** @nocollapse */
AngularSlickgridComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ExportService, },
    { type: ExtensionService, },
    { type: ExtensionUtility, },
    { type: FilterService, },
    { type: GridService, },
    { type: GridEventService, },
    { type: GridStateService, },
    { type: GroupingAndColspanService, },
    { type: ResizerService, },
    { type: SharedService, },
    { type: SortService, },
    { type: TranslateService, },
    { type: undefined, decorators: [{ type: Inject, args: ['config',] },] },
];
AngularSlickgridComponent.propDecorators = {
    "onAngularGridCreated": [{ type: Output },],
    "onDataviewCreated": [{ type: Output },],
    "onGridCreated": [{ type: Output },],
    "onGridInitialized": [{ type: Output },],
    "onBeforeGridCreate": [{ type: Output },],
    "onBeforeGridDestroy": [{ type: Output },],
    "onAfterGridDestroyed": [{ type: Output },],
    "onGridStateChanged": [{ type: Output },],
    "customDataView": [{ type: Input },],
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
                FilterFactory,
                GraphqlService,
                GridOdataService
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
                ],
                entryComponents: [AngularSlickgridComponent]
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

export { SlickgridConfig, SlickPaginationComponent, AngularSlickgridComponent, AngularSlickgridModule, CaseType, DelimiterType, ExtensionName, FieldType, FileType, FilterMultiplePassType, GridStateType, KeyCode, OperatorType, SortDirection, SortDirectionNumber, CollectionService, ExportService, ExtensionService, FilterService, GraphqlService, GridOdataService, GridEventService, GridService, GridStateService, GroupingAndColspanService, OdataService, ResizerService, SharedService, SortService, addWhiteSpaces, htmlEncode, htmlDecode, htmlEntityDecode, htmlEntityEncode, arraysEqual, castToPromise, findOrDefault, decimalFormatted, getDescendantProperty, getScrollBarWidth, mapMomentDateFormatWithFieldType, mapFlatpickrDateFormatWithFieldType, mapOperatorType, mapOperatorByFieldType, parseUtcDate, sanitizeHtmlToText, titleCase, toCamelCase, toKebabCase, uniqueArray, unsubscribeAllObservables, Aggregators, Editors, AutoTooltipExtension, CellExternalCopyManagerExtension, CheckboxSelectorExtension, ColumnPickerExtension, ExtensionUtility, GridMenuExtension, GroupItemMetaProviderExtension, HeaderButtonExtension, HeaderMenuExtension, RowMoveManagerExtension, RowSelectionExtension, FilterConditions, Filters, FilterFactory, Formatters, GroupTotalFormatters, Sorters, AvgAggregator as ɵa, MaxAggregator as ɵc, MinAggregator as ɵb, SumAggregator as ɵd, CheckboxEditor as ɵe, DateEditor as ɵf, FloatEditor as ɵg, IntegerEditor as ɵh, LongTextEditor as ɵi, MultipleSelectEditor as ɵj, SelectEditor as ɵk, SingleSelectEditor as ɵl, SliderEditor as ɵm, TextEditor as ɵn, booleanFilterCondition as ɵp, collectionSearchFilterCondition as ɵq, dateFilterCondition as ɵr, dateIsoFilterCondition as ɵs, dateUsFilterCondition as ɵu, dateUsShortFilterCondition as ɵv, dateUtcFilterCondition as ɵt, executeMappedCondition as ɵo, testFilterCondition as ɵy, numberFilterCondition as ɵw, stringFilterCondition as ɵx, CompoundDateFilter as ɵz, CompoundInputFilter as ɵba, CompoundSliderFilter as ɵbb, InputFilter as ɵbc, MultipleSelectFilter as ɵbe, NativeSelectFilter as ɵbh, SelectFilter as ɵbf, SingleSelectFilter as ɵbg, SliderFilter as ɵbd, arrayObjectToCsvFormatter as ɵbi, arrayToCsvFormatter as ɵbj, boldFormatter as ɵbk, checkboxFormatter as ɵbl, checkmarkFormatter as ɵbm, collectionEditorFormatter as ɵbp, collectionFormatter as ɵbo, complexObjectFormatter as ɵbn, dateIsoFormatter as ɵbq, dateTimeIsoAmPmFormatter as ɵbt, dateTimeIsoFormatter as ɵbr, dateTimeShortIsoFormatter as ɵbs, dateTimeShortUsFormatter as ɵbw, dateTimeUsAmPmFormatter as ɵbx, dateTimeUsFormatter as ɵbv, dateUsFormatter as ɵbu, decimalFormatter as ɵbz, deleteIconFormatter as ɵby, dollarColoredBoldFormatter as ɵcc, dollarColoredFormatter as ɵcb, dollarFormatter as ɵca, editIconFormatter as ɵcd, hyperlinkFormatter as ɵce, hyperlinkUriPrefixFormatter as ɵcf, infoIconFormatter as ɵcg, lowercaseFormatter as ɵch, maskFormatter as ɵci, multipleFormatter as ɵcj, percentCompleteBarFormatter as ɵcm, percentCompleteFormatter as ɵcl, percentFormatter as ɵck, percentSymbolFormatter as ɵcn, progressBarFormatter as ɵco, translateBooleanFormatter as ɵcq, translateFormatter as ɵcp, uppercaseFormatter as ɵcr, yesNoFormatter as ɵcs, avgTotalsDollarFormatter as ɵcu, avgTotalsFormatter as ɵct, avgTotalsPercentageFormatter as ɵcv, maxTotalsFormatter as ɵcw, minTotalsFormatter as ɵcx, sumTotalsBoldFormatter as ɵcz, sumTotalsColoredFormatter as ɵda, sumTotalsDollarBoldFormatter as ɵdc, sumTotalsDollarColoredBoldFormatter as ɵde, sumTotalsDollarColoredFormatter as ɵdd, sumTotalsDollarFormatter as ɵdb, sumTotalsFormatter as ɵcy, dateIsoSorter as ɵdg, dateSorter as ɵdf, dateUsShortSorter as ɵdi, dateUsSorter as ɵdh, numericSorter as ɵdj, stringSorter as ɵdk };
//# sourceMappingURL=angular-slickgrid.js.map
