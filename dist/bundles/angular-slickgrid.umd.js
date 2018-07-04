(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/Observable'), require('rxjs/add/operator/first'), require('rxjs/add/operator/take'), require('rxjs/add/operator/toPromise'), require('moment-mini'), require('@angular/core'), require('@ngx-translate/core'), require('rxjs/Subject'), require('text-encoding-utf-8'), require('jquery-ui-dist/jquery-ui'), require('slickgrid/lib/jquery.event.drag-2.3.0'), require('slickgrid/slick.core'), require('slickgrid/slick.dataview'), require('slickgrid/slick.grid'), require('slickgrid/slick.groupitemmetadataprovider'), require('slickgrid/controls/slick.columnpicker'), require('slickgrid/controls/slick.gridmenu'), require('slickgrid/controls/slick.pager'), require('slickgrid/plugins/slick.autotooltips'), require('slickgrid/plugins/slick.cellexternalcopymanager'), require('slickgrid/plugins/slick.cellrangedecorator'), require('slickgrid/plugins/slick.cellrangeselector'), require('slickgrid/plugins/slick.cellselectionmodel'), require('slickgrid/plugins/slick.checkboxselectcolumn'), require('slickgrid/plugins/slick.headerbuttons'), require('slickgrid/plugins/slick.headermenu'), require('slickgrid/plugins/slick.rowmovemanager'), require('slickgrid/plugins/slick.rowselectionmodel'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('angular-slickgrid', ['exports', 'rxjs/Observable', 'rxjs/add/operator/first', 'rxjs/add/operator/take', 'rxjs/add/operator/toPromise', 'moment-mini', '@angular/core', '@ngx-translate/core', 'rxjs/Subject', 'text-encoding-utf-8', 'jquery-ui-dist/jquery-ui', 'slickgrid/lib/jquery.event.drag-2.3.0', 'slickgrid/slick.core', 'slickgrid/slick.dataview', 'slickgrid/slick.grid', 'slickgrid/slick.groupitemmetadataprovider', 'slickgrid/controls/slick.columnpicker', 'slickgrid/controls/slick.gridmenu', 'slickgrid/controls/slick.pager', 'slickgrid/plugins/slick.autotooltips', 'slickgrid/plugins/slick.cellexternalcopymanager', 'slickgrid/plugins/slick.cellrangedecorator', 'slickgrid/plugins/slick.cellrangeselector', 'slickgrid/plugins/slick.cellselectionmodel', 'slickgrid/plugins/slick.checkboxselectcolumn', 'slickgrid/plugins/slick.headerbuttons', 'slickgrid/plugins/slick.headermenu', 'slickgrid/plugins/slick.rowmovemanager', 'slickgrid/plugins/slick.rowselectionmodel', '@angular/common'], factory) :
	(factory((global['angular-slickgrid'] = {}),global.Rx,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.moment,global.ng.core,global['ngx-translate-core'],global.Rx,global.textEncodingUtf8,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,global.ng.common));
}(this, (function (exports,Observable,first,take,toPromise,moment_,core,core$1,Subject,textEncodingUtf8,jqueryUi,jquery_event_drag2_3_0,slick_core,slick_dataview,slick_grid,slick_groupitemmetadataprovider,slick_columnpicker,slick_gridmenu,slick_pager,slick_autotooltips,slick_cellexternalcopymanager,slick_cellrangedecorator,slick_cellrangeselector,slick_cellselectionmodel,slick_checkboxselectcolumn,slick_headerbuttons,slick_headermenu,slick_rowmovemanager,slick_rowselectionmodel,common) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */






function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var CaseType = {
    camelCase: 0,
    pascalCase: 1,
    snakeCase: 2,
};
CaseType[CaseType.camelCase] = "camelCase";
CaseType[CaseType.pascalCase] = "pascalCase";
CaseType[CaseType.snakeCase] = "snakeCase";
var DelimiterType = {
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
var FieldType = {
    unknown: 0,
    string: 1,
    boolean: 2,
    integer: 3,
    float: 4,
    number: 5,
    date: 6,
    dateIso: 7,
    dateUtc: 8,
    dateTime: 9,
    dateTimeIso: 10,
    dateTimeIsoAmPm: 11,
    dateTimeIsoAM_PM: 12,
    dateUs: 13,
    dateUsShort: 14,
    dateTimeUs: 15,
    dateTimeUsAmPm: 16,
    dateTimeUsAM_PM: 17,
    dateTimeUsShort: 18,
    dateTimeUsShortAmPm: 19,
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
var FileType = {
    csv: 'csv',
    doc: 'doc',
    docx: 'docx',
    pdf: 'pdf',
    txt: 'txt',
    xls: 'xls',
    xlsx: 'xlsx',
};
var GridStateType = {
    columns: 'columns',
    filter: 'filter',
    pagination: 'pagination',
    sorter: 'sorter',
};
var KeyCode = {
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
var OperatorType = {
    empty: '',
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
    notIn: 'NOT_IN',
    inContains: 'IN_CONTAINS',
    notInContains: 'NOT_IN_CONTAINS',
};
var SortDirection = {
    asc: 'asc',
    ASC: 'ASC',
    desc: 'desc',
    DESC: 'DESC',
};
var SortDirectionNumber = {
    asc: 1,
    desc: -1,
    neutral: 0,
};
SortDirectionNumber[SortDirectionNumber.asc] = "asc";
SortDirectionNumber[SortDirectionNumber.desc] = "desc";
SortDirectionNumber[SortDirectionNumber.neutral] = "neutral";
var moment = moment_;
function addWhiteSpaces(nbSpaces) {
    var result = '';
    for (var i = 0; i < nbSpaces; i++) {
        result += ' ';
    }
    return result;
}
function htmlEntityDecode(input) {
    return input.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
}
function htmlEntityEncode(input) {
    var buf = [];
    for (var i = input.length - 1; i >= 0; i--) {
        buf.unshift(['&#', input[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('');
}
function arraysEqual(a, b, orderMatters) {
    if (orderMatters === void 0) { orderMatters = false; }
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
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
function castToPromise(input, fromServiceName) {
    if (fromServiceName === void 0) { fromServiceName = ''; }
    var promise = input;
    if (input instanceof Promise) {
        return input;
    }
    else if (input instanceof Observable.Observable) {
        promise = input.first().toPromise();
        if (!(promise instanceof Promise)) {
            promise = input.take(1).toPromise();
        }
        if (!(promise instanceof Promise)) {
            throw new Error("Something went wrong, Angular-Slickgrid " + fromServiceName + " is not able to convert the Observable into a Promise.\n        If you are using Angular HttpClient, you could try converting your http call to a Promise with \".toPromise()\"\n        for example::  this.http.post('graphql', { query: graphqlQuery }).toPromise()\n        ");
        }
    }
    return promise;
}
function findOrDefault(array, logic, defaultVal) {
    if (defaultVal === void 0) { defaultVal = {}; }
    return array.find(logic) || defaultVal;
}
function decimalFormatted(input, minDecimal, maxDecimal) {
    if (isNaN(+input)) {
        return input;
    }
    var minDec = (minDecimal === undefined) ? 2 : minDecimal;
    var maxDec = (maxDecimal === undefined) ? 2 : maxDecimal;
    var amount = String(Math.round(+input * Math.pow(10, maxDec)) / Math.pow(10, maxDec));
    if (amount.indexOf('.') < 0) {
        amount += '.';
    }
    while ((amount.length - amount.indexOf('.')) <= minDec) {
        amount += '0';
    }
    return amount;
}
function mapMomentDateFormatWithFieldType(fieldType) {
    var map;
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
function mapFlatpickrDateFormatWithFieldType(fieldType) {
    var map;
    switch (fieldType) {
        case FieldType.dateTime:
        case FieldType.dateTimeIso:
            map = 'Y-m-d H:i:S';
            break;
        case FieldType.dateTimeIsoAmPm:
            map = 'Y-m-d h:i:S K';
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
            map = 'm/d/Y h:i:S K';
            break;
        case FieldType.dateTimeUsAM_PM:
            map = 'm/d/Y h:i:s K';
            break;
        case FieldType.dateTimeUsShort:
            map = 'm/d/y H:i:s';
            break;
        case FieldType.dateTimeUsShortAmPm:
            map = 'm/d/y h:i:s K';
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
function mapOperatorType(operator) {
    var map;
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
function mapOperatorByFieldType(fieldType) {
    var map;
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
function parseUtcDate(inputDateString, useUtc) {
    var date = null;
    if (/^[0-9\-\/]*$/.test(inputDateString)) {
        var dateString = decodeURIComponent(inputDateString);
        var dateMoment = moment(new Date(dateString));
        if (dateMoment.isValid() && dateMoment.year().toString().length === 4) {
            date = (useUtc) ? dateMoment.utc().format() : dateMoment.format();
        }
    }
    return date;
}
function sanitizeHtmlToText(htmlString) {
    var temp = document.createElement('div');
    temp.innerHTML = htmlString;
    return temp.textContent || temp.innerText;
}
function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|[\s+\-_\/])/g, function (match, offset) {
        if (/[\s+\-_\/]/.test(match)) {
            return '';
        }
        return offset === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
function toKebabCase(str) {
    return toCamelCase(str).replace(/([A-Z])/g, '-$1').toLowerCase();
}
var moment$1 = moment_;
function compareDates(value1, value2, format, sortDirection, strict) {
    var diff = 0;
    if (value1 === null || value1 === '' || !moment$1(value1, format, strict).isValid()) {
        diff = -1;
    }
    else if (value2 === null || value2 === '' || !moment$1(value2, format, strict).isValid()) {
        diff = 1;
    }
    else {
        var date1 = moment$1(value1, format, strict);
        var date2 = moment$1(value2, format, strict);
        diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    }
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
}
var FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
var dateUsShortSorter = function (value1, value2, sortDirection) {
    return compareDates(value1, value2, FORMAT, sortDirection, true);
};
var moment$2 = moment_;
var dateSorter = function (value1, value2, sortDirection) {
    return compareDates(value1, value2, moment$2.ISO_8601, sortDirection);
};
var FORMAT$1 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
var dateIsoSorter = function (value1, value2, sortDirection) {
    return compareDates(value1, value2, FORMAT$1, sortDirection, true);
};
var FORMAT$2 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
var dateUsSorter = function (value1, value2, sortDirection) {
    return compareDates(value1, value2, FORMAT$2, sortDirection, true);
};
var numericSorter = function (value1, value2, sortDirection) {
    var x = (isNaN(value1) || value1 === '' || value1 === null) ? -99e+10 : parseFloat(value1);
    var y = (isNaN(value2) || value2 === '' || value2 === null) ? -99e+10 : parseFloat(value2);
    return sortDirection * (x === y ? 0 : (x > y ? 1 : -1));
};
var stringSorter = function (value1, value2, sortDirection) {
    var position;
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
var Sorters = {
    date: dateSorter,
    dateIso: dateIsoSorter,
    dateUs: dateUsSorter,
    dateUsShort: dateUsShortSorter,
    numeric: numericSorter,
    string: stringSorter
};
function sortByFieldType(value1, value2, fieldType, sortDirection) {
    var sortResult = 0;
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
var CollectionService = /** @class */ (function () {
    function CollectionService(translate) {
        this.translate = translate;
    }
    CollectionService.prototype.filterCollection = function (collection, filterBy) {
        var filteredCollection = [];
        if (filterBy) {
            var property_1 = filterBy.property || '';
            var operator = filterBy.operator || OperatorType.equal;
            var value_1 = typeof filterBy.value === 'undefined' ? '' : filterBy.value;
            switch (operator) {
                case OperatorType.equal:
                    filteredCollection = collection.filter(function (item) { return item[property_1] === value_1; });
                    break;
                case OperatorType.in:
                    filteredCollection = collection.filter(function (item) { return item[property_1].indexOf(value_1) !== -1; });
                    break;
                case OperatorType.notIn:
                    filteredCollection = collection.filter(function (item) { return item[property_1].indexOf(value_1) === -1; });
                    break;
                case OperatorType.contains:
                    filteredCollection = collection.filter(function (item) { return value_1.indexOf(item[property_1]) !== -1; });
                    break;
                default:
                    filteredCollection = collection.filter(function (item) { return item[property_1] !== value_1; });
            }
        }
        return filteredCollection;
    };
    CollectionService.prototype.sortCollection = function (collection, sortBy, enableTranslateLabel) {
        var _this = this;
        var sortedCollection = [];
        if (sortBy) {
            var property_2 = sortBy.property || '';
            var sortDirection_1 = sortBy.hasOwnProperty('sortDesc') ? (sortBy.sortDesc ? -1 : 1) : 1;
            var fieldType_1 = sortBy.fieldType || FieldType.string;
            sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[property_2] || ' ') : dataRow1[property_2];
                var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[property_2] || ' ') : dataRow2[property_2];
                var result = sortByFieldType(value1, value2, fieldType_1, sortDirection_1);
                return result;
            });
        }
        return sortedCollection;
    };
    return CollectionService;
}());
CollectionService.decorators = [
    { type: core.Injectable },
];
CollectionService.ctorParameters = function () { return [
    { type: core$1.TranslateService, },
]; };
function parseBoolean(str) {
    return /(true|1)/i.test(str + '');
}
var booleanFilterCondition = function (options) {
    var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    return parseBoolean(options.cellValue) === parseBoolean(searchTerm);
};
var testFilterCondition = function (operator, value1, value2) {
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
                return ((value2.findIndex(function (val) { return value1.indexOf(val) > -1; })) > -1);
            }
            return false;
        case 'NIN_CONTAINS':
        case 'NOT_IN_CONTAINS':
            if (value2 && Array.isArray(value2) && value2.findIndex) {
                return !((value2.findIndex(function (val) { return value1.indexOf(val) > -1; })) > -1);
            }
            return false;
    }
    return true;
};
var moment$3 = moment_;
var dateFilterCondition = function (options) {
    var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    var filterSearchType = options.filterSearchType || FieldType.dateIso;
    var searchDateFormat = mapMomentDateFormatWithFieldType(filterSearchType);
    if (searchTerm === null || searchTerm === '' || !moment$3(options.cellValue, moment$3.ISO_8601).isValid() || !moment$3(searchTerm, searchDateFormat, true).isValid()) {
        return false;
    }
    var dateCell = moment$3(options.cellValue);
    var dateSearch = moment$3(searchTerm);
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
var moment$4 = moment_;
var FORMAT$3 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
var dateIsoFilterCondition = function (options) {
    var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    if (searchTerm === null || searchTerm === '' || !moment$4(options.cellValue, FORMAT$3, true).isValid() || !moment$4(searchTerm, FORMAT$3, true).isValid()) {
        return false;
    }
    var dateCell = moment$4(options.cellValue, FORMAT$3, true);
    var dateSearch = moment$4(searchTerm, FORMAT$3, true);
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
var moment$5 = moment_;
var FORMAT$4 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
var dateUsFilterCondition = function (options) {
    var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    if (searchTerm === null || searchTerm === '' || !moment$5(options.cellValue, FORMAT$4, true).isValid() || !moment$5(searchTerm, FORMAT$4, true).isValid()) {
        return false;
    }
    var dateCell = moment$5(options.cellValue, FORMAT$4, true);
    var dateSearch = moment$5(searchTerm, FORMAT$4, true);
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
var moment$6 = moment_;
var FORMAT$5 = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
var dateUsShortFilterCondition = function (options) {
    var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
    if (searchTerm === null || searchTerm === '' || !moment$6(options.cellValue, FORMAT$5, true).isValid() || !moment$6(searchTerm, FORMAT$5, true).isValid()) {
        return false;
    }
    var dateCell = moment$6(options.cellValue, FORMAT$5, true);
    var dateSearch = moment$6(searchTerm, FORMAT$5, true);
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
var moment$7 = moment_;
var dateUtcFilterCondition = function (options) {
    var searchTerms = Array.isArray(options.searchTerms) && options.searchTerms[0] || [];
    var searchDateFormat = mapMomentDateFormatWithFieldType(options.filterSearchType || options.fieldType);
    if (!moment$7(options.cellValue, moment$7.ISO_8601).isValid() || !moment$7(searchTerms[0], searchDateFormat, true).isValid()) {
        return true;
    }
    var dateCell = moment$7(options.cellValue, moment$7.ISO_8601, true);
    var dateSearch = moment$7(searchTerms[0], searchDateFormat, true);
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
var collectionSearchFilterCondition = function (options) {
    var cellValue = options.cellValue + '';
    return testFilterCondition(options.operator || 'IN', cellValue, options.searchTerms || []);
};
var numberFilterCondition = function (options) {
    var cellValue = parseFloat(options.cellValue);
    var searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || 0;
    if (typeof searchTerm === 'string') {
        searchTerm = parseFloat(searchTerm);
    }
    if (!searchTerm && (!options.operator || options.operator === '')) {
        return true;
    }
    return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};
var stringFilterCondition = function (options) {
    options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();
    var cellValue = options.cellValue.toLowerCase();
    var searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || '';
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
var executeMappedCondition = function (options) {
    var operator = options.operator && options.operator.toUpperCase();
    if (options && options.operator && (operator === 'IN' || operator === 'NIN' || operator === 'IN_CONTAINS' || operator === 'NIN_CONTAINS')) {
        return collectionSearchFilterCondition(options);
    }
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
require('flatpickr');
var CompoundDateFilter = /** @class */ (function () {
    function CompoundDateFilter(translate) {
        this.translate = translate;
    }
    Object.defineProperty(CompoundDateFilter.prototype, "gridOptions", {
        get: function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundDateFilter.prototype, "operator", {
        get: function () {
            return this._operator || OperatorType.empty;
        },
        set: function (op) {
            this._operator = op;
        },
        enumerable: true,
        configurable: true
    });
    CompoundDateFilter.prototype.init = function (args) {
        var _this = this;
        if (args) {
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.operator = args.operator || '';
            this.searchTerms = args.searchTerms || [];
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            this.$filterElm = this.createDomElement(searchTerm);
            this.$filterInputElm.keyup(function (e) {
                _this.onTriggerEvent(e);
            });
            this.$selectOperatorElm.change(function (e) {
                _this.onTriggerEvent(e);
            });
        }
    };
    CompoundDateFilter.prototype.clear = function () {
        if (this.flatInstance && this.$selectOperatorElm) {
            this.$selectOperatorElm.val(0);
            this.flatInstance.clear();
        }
    };
    CompoundDateFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
        }
    };
    CompoundDateFilter.prototype.setValues = function (values) {
        if (values && Array.isArray(values)) {
            this.flatInstance.setDate(values[0]);
        }
    };
    CompoundDateFilter.prototype.buildDatePickerInput = function (searchTerm) {
        var _this = this;
        var inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
        var outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
        var currentLocale = this.translate.currentLang || 'en';
        if (currentLocale.length > 2) {
            currentLocale = currentLocale.substring(0, 2);
        }
        var pickerOptions = {
            defaultDate: searchTerm || '',
            altInput: true,
            altFormat: outputFormat,
            dateFormat: inputFormat,
            wrap: true,
            closeOnSelect: true,
            locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
            onChange: function (selectedDates, dateStr, instance) {
                _this._currentValue = dateStr;
                if (pickerOptions.enableTime) {
                    _this.onTriggerEvent(new CustomEvent('keyup'), dateStr === '');
                }
                else {
                    _this.onTriggerEvent(undefined, dateStr === '');
                }
            }
        };
        if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
            pickerOptions.enableTime = true;
        }
        var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        var $filterInputElm = $("<div class=\"flatpickr\"><input type=\"text\" class=\"form-control\" data-input placeholder=\"" + placeholder + "\"></div>");
        this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerOptions) : null;
        return $filterInputElm;
    };
    CompoundDateFilter.prototype.buildSelectOperatorHtmlString = function () {
        var optionValues = this.getOptionValues();
        var optionValueString = '';
        optionValues.forEach(function (option) {
            optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
        });
        return "<select class=\"form-control\">" + optionValueString + "</select>";
    };
    CompoundDateFilter.prototype.getOptionValues = function () {
        return [
            { operator: (''), description: '' },
            { operator: ('='), description: '' },
            { operator: ('<'), description: '' },
            { operator: ('<='), description: '' },
            { operator: ('>'), description: '' },
            { operator: ('>='), description: '' },
            { operator: ('<>'), description: '' }
        ];
    };
    CompoundDateFilter.prototype.createDomElement = function (searchTerm) {
        var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = this.buildDatePickerInput(searchTerm);
        var $filterContainerElm = $("<div class=\"form-group search-filter\"></div>");
        var $containerInputGroup = $("<div class=\"input-group flatpickr\"></div>");
        var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        $containerInputGroup.append($operatorInputGroupAddon);
        $containerInputGroup.append(this.$filterInputElm);
        $filterContainerElm.append($containerInputGroup);
        $filterContainerElm.attr('id', "filter-" + this.columnDef.id);
        this.$filterInputElm.data('columnId', this.columnDef.id);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        if (searchTerm) {
            $filterContainerElm.addClass('filled');
            this._currentValue = (searchTerm);
        }
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    };
    CompoundDateFilter.prototype.loadFlatpickrLocale = function (locale) {
        if (locale !== 'en') {
            var localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    };
    CompoundDateFilter.prototype.onTriggerEvent = function (e, clearFilterTriggered) {
        if (clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: true });
        }
        else {
            var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '' });
        }
    };
    CompoundDateFilter.prototype.hide = function () {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    };
    CompoundDateFilter.prototype.show = function () {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    };
    return CompoundDateFilter;
}());
CompoundDateFilter.decorators = [
    { type: core.Injectable },
];
CompoundDateFilter.ctorParameters = function () { return [
    { type: core$1.TranslateService, },
]; };
var CompoundInputFilter = /** @class */ (function () {
    function CompoundInputFilter(translate) {
        this.translate = translate;
    }
    Object.defineProperty(CompoundInputFilter.prototype, "gridOptions", {
        get: function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundInputFilter.prototype, "operator", {
        get: function () {
            return this._operator || OperatorType.empty;
        },
        set: function (op) {
            this._operator = op;
        },
        enumerable: true,
        configurable: true
    });
    CompoundInputFilter.prototype.init = function (args) {
        var _this = this;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.operator = args.operator;
        this.searchTerms = args.searchTerms || [];
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        this.$filterElm = this.createDomElement(searchTerm);
        this.$filterInputElm.keyup(function (e) {
            _this.onTriggerEvent(e);
        });
        this.$selectOperatorElm.change(function (e) {
            _this.onTriggerEvent(e);
        });
    };
    CompoundInputFilter.prototype.clear = function () {
        if (this.$filterElm && this.$selectOperatorElm) {
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val('');
            this.onTriggerEvent(null, true);
        }
    };
    CompoundInputFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
            this.$selectOperatorElm.off('change').remove();
        }
    };
    CompoundInputFilter.prototype.setValues = function (values) {
        if (values && Array.isArray(values)) {
            this.$filterElm.val(values[0]);
        }
    };
    CompoundInputFilter.prototype.buildInputHtmlString = function () {
        var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        return "<input class=\"form-control\" type=\"text\" placeholder=\"" + placeholder + "\" />";
    };
    CompoundInputFilter.prototype.buildSelectOperatorHtmlString = function () {
        var optionValues = this.getOptionValues();
        var optionValueString = '';
        optionValues.forEach(function (option) {
            optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
        });
        return "<select class=\"form-control\">" + optionValueString + "</select>";
    };
    CompoundInputFilter.prototype.getOptionValues = function () {
        var type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : FieldType.string;
        var optionValues = [];
        switch (type) {
            case FieldType.string:
                optionValues = [
                    { operator: (''), description: this.translate.instant('CONTAINS') },
                    { operator: ('='), description: this.translate.instant('EQUALS') },
                    { operator: ('a*'), description: this.translate.instant('STARTS_WITH') },
                    { operator: ('*z'), description: this.translate.instant('ENDS_WITH') },
                ];
                break;
            default:
                optionValues = [
                    { operator: (''), description: this.translate.instant('CONTAINS') },
                    { operator: ('='), description: '' },
                    { operator: ('<'), description: '' },
                    { operator: ('<='), description: '' },
                    { operator: ('>'), description: '' },
                    { operator: ('>='), description: '' },
                    { operator: ('<>'), description: '' }
                ];
                break;
        }
        return optionValues;
    };
    CompoundInputFilter.prototype.createDomElement = function (searchTerm) {
        var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildInputHtmlString());
        var $filterContainerElm = $("<div class=\"form-group search-filter\"></div>");
        var $containerInputGroup = $("<div class=\"input-group\"></div>");
        var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        $containerInputGroup.append($operatorInputGroupAddon);
        $containerInputGroup.append(this.$filterInputElm);
        $filterContainerElm.append($containerInputGroup);
        $filterContainerElm.attr('id', "filter-" + this.columnDef.id);
        this.$filterInputElm.val(searchTerm);
        this.$filterInputElm.data('columnId', this.columnDef.id);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        if (searchTerm) {
            $filterContainerElm.addClass('filled');
        }
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    };
    CompoundInputFilter.prototype.onTriggerEvent = function (e, clearFilterTriggered) {
        if (clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: true });
        }
        else {
            var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            var value = this.$filterInputElm.val();
            (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
        }
    };
    return CompoundInputFilter;
}());
CompoundInputFilter.decorators = [
    { type: core.Inject, args: [core$1.TranslateService,] },
];
CompoundInputFilter.ctorParameters = function () { return [
    { type: core$1.TranslateService, },
]; };
var DEFAULT_MIN_VALUE = 0;
var DEFAULT_MAX_VALUE = 100;
var DEFAULT_STEP = 1;
var CompoundSliderFilter = /** @class */ (function () {
    function CompoundSliderFilter() {
    }
    Object.defineProperty(CompoundSliderFilter.prototype, "gridOptions", {
        get: function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundSliderFilter.prototype, "filterParams", {
        get: function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundSliderFilter.prototype, "filterProperties", {
        get: function () {
            return this.columnDef && this.columnDef.filter || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundSliderFilter.prototype, "operator", {
        get: function () {
            return this._operator || OperatorType.empty;
        },
        set: function (op) {
            this._operator = op;
        },
        enumerable: true,
        configurable: true
    });
    CompoundSliderFilter.prototype.init = function (args) {
        var _this = this;
        if (args) {
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.operator = args.operator || '';
            this.searchTerms = args.searchTerms || [];
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            this.$filterElm = this.createDomElement(searchTerm);
            this.$filterInputElm.change(function (e) {
                _this.onTriggerEvent(e);
            });
            this.$selectOperatorElm.change(function (e) {
                _this.onTriggerEvent(e);
            });
        }
    };
    CompoundSliderFilter.prototype.clear = function () {
        if (this.$filterElm && this.$selectOperatorElm) {
            var clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val(clearedValue);
            if (!this.filterParams.hideSliderNumber) {
                this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(clearedValue);
            }
            this.onTriggerEvent(undefined, true);
        }
    };
    CompoundSliderFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
        }
    };
    CompoundSliderFilter.prototype.setValues = function (values) {
        if (values && Array.isArray(values)) {
            this.$filterInputElm.val(values[0]);
            this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(values[0]);
        }
    };
    CompoundSliderFilter.prototype.buildTemplateHtmlString = function () {
        var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        var maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
        var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        var step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
        return "<input type=\"range\" id=\"rangeInput_" + this.columnDef.field + "\"\n              name=\"rangeInput_" + this.columnDef.field + "\"\n              defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n              class=\"form-control slider-filter-input range compound-slider\"\n              onmousemove=\"document.getElementById('rangeOuput_" + this.columnDef.field + "').innerHTML = rangeInput_" + this.columnDef.field + ".value\" />";
    };
    CompoundSliderFilter.prototype.buildTemplateSliderTextHtmlString = function () {
        var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        return "<div class=\"input-group-addon input-group-append slider-value\"><span class=\"input-group-text\" id=\"rangeOuput_" + this.columnDef.field + "\">" + defaultValue + "</span></div>";
    };
    CompoundSliderFilter.prototype.buildSelectOperatorHtmlString = function () {
        var optionValues = this.getOptionValues();
        var optionValueString = '';
        optionValues.forEach(function (option) {
            optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
        });
        return "<select class=\"form-control\">" + optionValueString + "</select>";
    };
    CompoundSliderFilter.prototype.getOptionValues = function () {
        return [
            { operator: (''), description: '' },
            { operator: ('='), description: '' },
            { operator: ('<'), description: '' },
            { operator: ('<='), description: '' },
            { operator: ('>'), description: '' },
            { operator: ('>='), description: '' },
            { operator: ('<>'), description: '' }
        ];
    };
    CompoundSliderFilter.prototype.createDomElement = function (searchTerm) {
        var searchTermInput = ((searchTerm || '0'));
        var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildTemplateHtmlString());
        var $filterContainerElm = $("<div class=\"form-group search-filter\"></div>");
        this.$containerInputGroupElm = $("<div class=\"input-group search-filter\"></div>");
        var $operatorInputGroupAddon = $("<span class=\"input-group-addon input-group-prepend operator\"></span>");
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        this.$containerInputGroupElm.append($operatorInputGroupAddon);
        this.$containerInputGroupElm.append(this.$filterInputElm);
        if (!this.filterParams.hideSliderNumber) {
            var $sliderTextInputAppendAddon = $(this.buildTemplateSliderTextHtmlString());
            $sliderTextInputAppendAddon.children().html(searchTermInput);
            this.$containerInputGroupElm.append($sliderTextInputAppendAddon);
        }
        $filterContainerElm.append(this.$containerInputGroupElm);
        $filterContainerElm.attr('id', "filter-" + this.columnDef.field);
        this.$filterInputElm.val(searchTermInput);
        this.$filterInputElm.data('columnId', this.columnDef.field);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        if (searchTerm) {
            $filterContainerElm.addClass('filled');
        }
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    };
    CompoundSliderFilter.prototype.onTriggerEvent = function (e, clearFilterTriggered) {
        if (clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: true });
        }
        else {
            var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            var value = this.$filterInputElm.val();
            (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
        }
    };
    return CompoundSliderFilter;
}());
CompoundSliderFilter.decorators = [
    { type: core.Injectable },
];
CompoundSliderFilter.ctorParameters = function () { return []; };
var InputFilter = /** @class */ (function () {
    function InputFilter() {
    }
    Object.defineProperty(InputFilter.prototype, "gridOptions", {
        get: function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputFilter.prototype, "operator", {
        get: function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || '';
        },
        enumerable: true,
        configurable: true
    });
    InputFilter.prototype.init = function (args) {
        var _this = this;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        var filterTemplate = this.buildTemplateHtmlString();
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        this.$filterElm.keyup(function (e) {
            var value = e && e.target && e.target.value || '';
            if (!value || value === '') {
                _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: true });
                _this.$filterElm.removeClass('filled');
            }
            else {
                _this.$filterElm.addClass('filled');
                _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value] });
            }
        });
    };
    InputFilter.prototype.clear = function () {
        if (this.$filterElm) {
            this.$filterElm.val('');
            this.$filterElm.trigger('keyup');
        }
    };
    InputFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
        }
    };
    InputFilter.prototype.setValues = function (values) {
        if (values) {
            this.$filterElm.val(values);
        }
    };
    InputFilter.prototype.buildTemplateHtmlString = function () {
        var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        return "<input type=\"text\" class=\"form-control search-filter\" placeholder=\"" + placeholder + "\">";
    };
    InputFilter.prototype.createDomElement = function (filterTemplate, searchTerm) {
        var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        var $filterElm = $(filterTemplate);
        $filterElm.val(searchTerm);
        $filterElm.attr('id', "filter-" + this.columnDef.id);
        $filterElm.data('columnId', this.columnDef.id);
        if (searchTerm) {
            $filterElm.addClass('filled');
        }
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    };
    return InputFilter;
}());
var MultipleSelectFilter = /** @class */ (function () {
    function MultipleSelectFilter(translate, collectionService) {
        var _this = this;
        this.translate = translate;
        this.collectionService = collectionService;
        this.isFilled = false;
        this.enableTranslateLabel = false;
        this.defaultOptions = {
            container: 'body',
            filter: false,
            maxHeight: 200,
            okButton: true,
            addTitle: true,
            countSelected: this.translate.instant('X_OF_Y_SELECTED'),
            allSelected: this.translate.instant('ALL_SELECTED'),
            selectAllText: this.translate.instant('SELECT_ALL'),
            selectAllDelimiter: ['', ''],
            onClose: function () {
                var selectedItems = _this.$filterElm.multipleSelect('getSelects');
                if (Array.isArray(selectedItems) && selectedItems.length > 0) {
                    _this.isFilled = true;
                    _this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    _this.isFilled = false;
                    _this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
                }
                _this.callback(undefined, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: selectedItems });
            }
        };
    }
    Object.defineProperty(MultipleSelectFilter.prototype, "gridOptions", {
        get: function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultipleSelectFilter.prototype, "operator", {
        get: function () {
            return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.in;
        },
        enumerable: true,
        configurable: true
    });
    MultipleSelectFilter.prototype.init = function (args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        if (!this.grid || !this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" for the MultipleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        this.enableTranslateLabel = this.columnDef.filter.enableTranslateLabel;
        this.labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        this.valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        var newCollection = this.columnDef.filter.collection || [];
        if (this.gridOptions.params && this.columnDef.filter.collectionFilterBy) {
            var filterBy = this.columnDef.filter.collectionFilterBy;
            newCollection = this.collectionService.filterCollection(newCollection, filterBy);
        }
        if (this.columnDef.filter && this.columnDef.filter.collectionSortBy) {
            var sortBy = this.columnDef.filter.collectionSortBy;
            newCollection = this.collectionService.sortCollection(newCollection, sortBy, this.enableTranslateLabel);
        }
        var filterTemplate = this.buildTemplateHtmlString(newCollection);
        this.createDomElement(filterTemplate);
    };
    MultipleSelectFilter.prototype.clear = function () {
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            this.$filterElm.multipleSelect('setSelects', []);
            this.$filterElm.removeClass('filled');
            this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true });
        }
    };
    MultipleSelectFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off().remove();
        }
    };
    MultipleSelectFilter.prototype.setValues = function (values) {
        if (values) {
            this.$filterElm.multipleSelect('setSelects', values);
        }
    };
    MultipleSelectFilter.prototype.buildTemplateHtmlString = function (optionCollection) {
        var _this = this;
        var options = '';
        optionCollection.forEach(function (option) {
            if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')");
            }
            var labelKey = ((option.labelKey || option[_this.labelName]));
            var selected = (_this.findValueInSearchTerms(option[_this.valueName]) >= 0) ? 'selected' : '';
            var textLabel = ((option.labelKey || _this.enableTranslateLabel) && _this.translate && typeof _this.translate.instant === 'function') ? _this.translate.instant(labelKey || ' ') : labelKey;
            options += "<option value=\"" + option[_this.valueName] + "\" " + selected + ">" + textLabel + "</option>";
            if (selected) {
                _this.isFilled = true;
            }
        });
        return "<select class=\"ms-filter search-filter\" multiple=\"multiple\">" + options + "</select>";
    };
    MultipleSelectFilter.prototype.createDomElement = function (filterTemplate) {
        var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error("multiple-select.js was not found, make sure to modify your \"angular-cli.json\" file and include \"../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js\" and it's css or SASS file");
        }
        this.$filterElm.attr('id', "filter-" + this.columnDef.id);
        this.$filterElm.data('columnId', this.columnDef.id);
        if (this.isFilled) {
            this.$filterElm.addClass('filled');
        }
        if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
            this.$filterElm.appendTo($headerElm);
        }
        var options = Object.assign({}, this.defaultOptions, this.columnDef.filter.filterOptions);
        this.$filterElm = this.$filterElm.multipleSelect(options);
    };
    MultipleSelectFilter.prototype.findValueInSearchTerms = function (value) {
        if (this.searchTerms && Array.isArray(this.searchTerms)) {
            for (var i = 0; i < this.searchTerms.length; i++) {
                if (this.searchTerms[i] && this.searchTerms[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    };
    return MultipleSelectFilter;
}());
MultipleSelectFilter.decorators = [
    { type: core.Injectable },
];
MultipleSelectFilter.ctorParameters = function () { return [
    { type: core$1.TranslateService, },
    { type: CollectionService, },
]; };
var SelectFilter = /** @class */ (function () {
    function SelectFilter(translate) {
        this.translate = translate;
    }
    Object.defineProperty(SelectFilter.prototype, "operator", {
        get: function () {
            return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
        },
        enumerable: true,
        configurable: true
    });
    SelectFilter.prototype.init = function (args) {
        var _this = this;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        if (typeof searchTerm === 'boolean' || typeof searchTerm === 'number') {
            searchTerm = "" + searchTerm;
        }
        var filterTemplate = this.buildTemplateHtmlString();
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        this.$filterElm.change(function (e) {
            var value = e && e.target && e.target.value || '';
            if (!value || value === '') {
                _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: true });
                _this.$filterElm.removeClass('filled');
            }
            else {
                _this.$filterElm.addClass('filled');
                _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value] });
            }
        });
    };
    SelectFilter.prototype.clear = function () {
        if (this.$filterElm) {
            this.$filterElm.val('');
            this.$filterElm.trigger('change');
        }
    };
    SelectFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
        }
    };
    SelectFilter.prototype.setValues = function (values) {
        if (values) {
            this.$filterElm.val(values);
        }
    };
    SelectFilter.prototype.buildTemplateHtmlString = function () {
        var _this = this;
        if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        var optionCollection = this.columnDef.filter.collection || [];
        var labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        var valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        var options = '';
        optionCollection.forEach(function (option) {
            if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.select, collection: [ { value: '1', label: 'One' } ]')");
            }
            var labelKey = option.labelKey || option[labelName];
            var textLabel = ((option.labelKey || _this.columnDef.filter.enableTranslateLabel) && _this.translate && typeof _this.translate.instant === 'function') ? _this.translate.instant(labelKey || ' ') : labelKey;
            options += "<option value=\"" + option[valueName] + "\">" + textLabel + "</option>";
        });
        return "<select class=\"form-control search-filter\">" + options + "</select>";
    };
    SelectFilter.prototype.createDomElement = function (filterTemplate, searchTerm) {
        var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        var $filterElm = $(filterTemplate);
        var searchTermInput = ((searchTerm || ''));
        $filterElm.val(searchTermInput);
        $filterElm.attr('id', "filter-" + this.columnDef.id);
        $filterElm.data('columnId', this.columnDef.id);
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    };
    return SelectFilter;
}());
SelectFilter.decorators = [
    { type: core.Injectable },
];
SelectFilter.ctorParameters = function () { return [
    { type: core$1.TranslateService, },
]; };
var SingleSelectFilter = /** @class */ (function () {
    function SingleSelectFilter(translate, collectionService) {
        var _this = this;
        this.translate = translate;
        this.collectionService = collectionService;
        this.isFilled = false;
        this.enableTranslateLabel = false;
        this.defaultOptions = {
            container: 'body',
            filter: false,
            maxHeight: 200,
            single: true,
            onClose: function () {
                var selectedItems = _this.$filterElm.multipleSelect('getSelects');
                var selectedItem = '';
                if (Array.isArray(selectedItems) && selectedItems.length > 0) {
                    selectedItem = selectedItems[0] || null;
                    _this.isFilled = true;
                    _this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    _this.isFilled = false;
                    _this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
                }
                _this.callback(undefined, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: (selectedItem ? [selectedItem] : null) });
            }
        };
    }
    Object.defineProperty(SingleSelectFilter.prototype, "operator", {
        get: function () {
            return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SingleSelectFilter.prototype, "gridOptions", {
        get: function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    SingleSelectFilter.prototype.init = function (args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms;
        if (!this.grid || !this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" for the MultipleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        this.enableTranslateLabel = this.columnDef.filter.enableTranslateLabel;
        this.labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        this.valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        var newCollection = this.columnDef.filter.collection || [];
        if (this.gridOptions.params && this.columnDef.filter.collectionFilterBy) {
            var filterBy = this.columnDef.filter.collectionFilterBy;
            newCollection = this.collectionService.filterCollection(newCollection, filterBy);
        }
        if (this.columnDef.filter && this.columnDef.filter.collectionSortBy) {
            var sortBy = this.columnDef.filter.collectionSortBy;
            newCollection = this.collectionService.sortCollection(newCollection, sortBy, this.enableTranslateLabel);
        }
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        if (typeof searchTerm === 'boolean' || typeof searchTerm === 'number') {
            searchTerm = "" + searchTerm;
        }
        var filterTemplate = this.buildTemplateHtmlString(newCollection || [], searchTerm);
        this.createDomElement(filterTemplate);
    };
    SingleSelectFilter.prototype.clear = function () {
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            this.$filterElm.multipleSelect('setSelects', []);
            this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true });
        }
    };
    SingleSelectFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off().remove();
        }
    };
    SingleSelectFilter.prototype.setValues = function (values) {
        if (values) {
            values = Array.isArray(values) ? values : [values];
            this.$filterElm.multipleSelect('setSelects', values);
        }
    };
    SingleSelectFilter.prototype.buildTemplateHtmlString = function (optionCollection, searchTerm) {
        var _this = this;
        var options = '';
        optionCollection.forEach(function (option) {
            if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.singleSelect, collection: [ { value: '1', label: 'One' } ]')");
            }
            var labelKey = ((option.labelKey || option[_this.labelName]));
            var selected = (option[_this.valueName] === searchTerm) ? 'selected' : '';
            var textLabel = ((option.labelKey || _this.columnDef.filter.enableTranslateLabel) && _this.translate && typeof _this.translate.instant === 'function') ? _this.translate.instant(labelKey || ' ') : labelKey;
            options += "<option value=\"" + option[_this.valueName] + "\" " + selected + ">" + textLabel + "</option>";
            if (selected) {
                _this.isFilled = true;
            }
        });
        return "<select class=\"ms-filter search-filter\">" + options + "</select>";
    };
    SingleSelectFilter.prototype.createDomElement = function (filterTemplate) {
        var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error("multiple-select.js was not found, make sure to modify your \"angular-cli.json\" file and include \"../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js\" and it's css or SASS file");
        }
        this.$filterElm.attr('id', "filter-" + this.columnDef.id);
        this.$filterElm.data('columnId', this.columnDef.id);
        if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
            this.$filterElm.appendTo($headerElm);
        }
        var options = Object.assign({}, this.defaultOptions, this.columnDef.filter.filterOptions);
        this.$filterElm = this.$filterElm.multipleSelect(options);
    };
    return SingleSelectFilter;
}());
SingleSelectFilter.decorators = [
    { type: core.Injectable },
];
SingleSelectFilter.ctorParameters = function () { return [
    { type: core$1.TranslateService, },
    { type: CollectionService, },
]; };
var DEFAULT_MIN_VALUE$1 = 0;
var DEFAULT_MAX_VALUE$1 = 100;
var DEFAULT_STEP$1 = 1;
var SliderFilter = /** @class */ (function () {
    function SliderFilter() {
    }
    Object.defineProperty(SliderFilter.prototype, "filterParams", {
        get: function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderFilter.prototype, "filterProperties", {
        get: function () {
            return this.columnDef && this.columnDef.filter || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderFilter.prototype, "operator", {
        get: function () {
            return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
        },
        enumerable: true,
        configurable: true
    });
    SliderFilter.prototype.init = function (args) {
        var _this = this;
        if (!args) {
            throw new Error('[Aurelia-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        var filterTemplate = this.buildTemplateHtmlString();
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        this.$filterElm.change(function (e) {
            var value = e && e.target && e.target.value || '';
            if (!value || value === '') {
                _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: true });
                _this.$filterElm.removeClass('filled');
            }
            else {
                _this.$filterElm.addClass('filled');
                _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value] });
            }
        });
    };
    SliderFilter.prototype.clear = function () {
        if (this.$filterElm) {
            var clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE$1;
            this.$filterElm.children('input').val(clearedValue);
            this.$filterElm.children('div.input-group-addon.input-group-append').children().html(clearedValue);
            this.$filterElm.trigger('change');
        }
    };
    SliderFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
        }
    };
    SliderFilter.prototype.setValues = function (values) {
        if (values) {
            this.$filterElm.val(values);
        }
    };
    SliderFilter.prototype.buildTemplateHtmlString = function () {
        var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE$1;
        var maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE$1;
        var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        var step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP$1;
        if (this.filterParams.hideSliderNumber) {
            return "\n      <div class=\"search-filter\">\n        <input type=\"range\" id=\"rangeInput_" + this.columnDef.field + "\"\n          name=\"rangeInput_" + this.columnDef.field + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-filter-input range\" />\n      </div>";
        }
        return "\n      <div class=\"input-group search-filter\">\n        <input type=\"range\" id=\"rangeInput_" + this.columnDef.field + "\"\n          name=\"rangeInput_" + this.columnDef.field + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-filter-input range\"\n          onmousemove=\"document.getElementById('rangeOuput_" + this.columnDef.field + "').innerHTML = rangeInput_" + this.columnDef.field + ".value\" />\n        <div class=\"input-group-addon input-group-append slider-value\">\n          <span class=\"input-group-text\" id=\"rangeOuput_" + this.columnDef.field + "\">" + defaultValue + "</span>\n        </div>\n      </div>";
    };
    SliderFilter.prototype.createDomElement = function (filterTemplate, searchTerm) {
        var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        var $filterElm = $(filterTemplate);
        var searchTermInput = ((searchTerm || '0'));
        $filterElm.children('input').val(searchTermInput);
        $filterElm.children('div.input-group-addon.input-group-append').children().html(searchTermInput);
        $filterElm.attr('id', "filter-" + this.columnDef.id);
        $filterElm.data('columnId', this.columnDef.id);
        if (searchTerm) {
            $filterElm.addClass('filled');
        }
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    };
    return SliderFilter;
}());
var Filters = {
    compoundDate: CompoundDateFilter,
    compoundInput: CompoundInputFilter,
    compoundSlider: CompoundSliderFilter,
    input: InputFilter,
    slider: SliderFilter,
    multipleSelect: MultipleSelectFilter,
    singleSelect: SingleSelectFilter,
    select: SelectFilter
};
var GlobalGridOptions = {
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
    enableCellNavigation: false,
    enableColumnPicker: true,
    enableColumnReorder: true,
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
    showHeaderRow: false,
    topPanelHeight: 35
};
var SlickgridConfig = /** @class */ (function () {
    function SlickgridConfig() {
        this.options = GlobalGridOptions;
    }
    return SlickgridConfig;
}());
var FilterFactory = /** @class */ (function () {
    function FilterFactory(injector, config, translate, collectionService) {
        this.injector = injector;
        this.config = config;
        this.translate = translate;
        this.collectionService = collectionService;
        this._options = this.config.options;
    }
    FilterFactory.prototype.createFilter = function (columnFilter) {
        var filter;
        if (columnFilter && columnFilter.model) {
            var filterInstance = columnFilter.model;
            var filterName = typeof columnFilter.model === 'function' ? filterInstance.name : '';
            filter = typeof columnFilter.model === 'function' ? new columnFilter.model(this.translate, this.collectionService) : columnFilter.model;
        }
        if (!filter && this._options.defaultFilter) {
            filter = new this._options.defaultFilter(this.translate, this.collectionService);
        }
        return filter;
    };
    FilterFactory.prototype.createInjector = function (service) {
        var injector = core.Injector.create([{ provide: service, deps: [core$1.TranslateService] }]);
        return injector.get(service);
    };
    return FilterFactory;
}());
FilterFactory.decorators = [
    { type: core.Injectable },
];
FilterFactory.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: SlickgridConfig, },
    { type: core$1.TranslateService, },
    { type: CollectionService, },
]; };
var FilterService = /** @class */ (function () {
    function FilterService(filterFactory) {
        this.filterFactory = filterFactory;
        this._eventHandler = new Slick.EventHandler();
        this._filters = [];
        this._columnFilters = {};
        this.onFilterChanged = new Subject.Subject();
        this.onFilterCleared = new Subject.Subject();
    }
    Object.defineProperty(FilterService.prototype, "_gridOptions", {
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterService.prototype, "_columnDefinitions", {
        get: function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    FilterService.prototype.init = function (grid) {
        this._grid = grid;
    };
    FilterService.prototype.attachBackendOnFilter = function (grid) {
        var _this = this;
        this._filters = [];
        this._slickSubscriber = new Slick.Event();
        this._slickSubscriber.subscribe(this.attachBackendOnFilterSubscribe.bind(this));
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
            _this.addFilterTemplateToHeaderRow(args);
        });
    };
    FilterService.prototype.attachBackendOnFilterSubscribe = function (event, args) {
        return __awaiter(this, void 0, void 0, function () {
            var backendApi, query, observableOrPromise, processResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args || !args.grid) {
                            throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
                        }
                        backendApi = this._gridOptions.backendServiceApi;
                        if (!backendApi || !backendApi.process || !backendApi.service) {
                            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        if (backendApi.preProcess) {
                            backendApi.preProcess();
                        }
                        return [4 /*yield*/, backendApi.service.processOnFilterChanged(event, args)];
                    case 1:
                        query = _a.sent();
                        if (args && !args.clearFilterTriggered) {
                            this.emitFilterChanged('remote');
                        }
                        observableOrPromise = backendApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 2:
                        processResult = _a.sent();
                        if (processResult && backendApi.internalPostProcess) {
                            backendApi.internalPostProcess(processResult);
                        }
                        if (backendApi.postProcess !== undefined) {
                            backendApi.postProcess(processResult);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FilterService.prototype.attachLocalOnFilter = function (grid, dataView) {
        var _this = this;
        this._filters = [];
        this._dataView = dataView;
        this._slickSubscriber = new Slick.Event();
        dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
        dataView.setFilter(this.customLocalFilter.bind(this, dataView));
        this._slickSubscriber.subscribe(function (e, args) {
            var columnId = args.columnId;
            if (columnId != null) {
                dataView.refresh();
            }
            if (args && !args.clearFilterTriggered) {
                _this.emitFilterChanged('local');
            }
        });
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
            _this.addFilterTemplateToHeaderRow(args);
        });
    };
    FilterService.prototype.clearFilters = function () {
        this._filters.forEach(function (filter) {
            if (filter && filter.clear) {
                filter.clear();
            }
        });
        for (var columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        if (this._dataView) {
            this._dataView.refresh();
            this._grid.invalidate();
            this._grid.render();
        }
        this.onFilterCleared.next(true);
    };
    FilterService.prototype.customLocalFilter = function (dataView, item, args) {
        try {
            for (var _a = __values(Object.keys(args.columnFilters)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var columnId = _b.value;
                var columnFilter = args.columnFilters[columnId];
                var columnIndex = args.grid.getColumnIndex(columnId);
                var columnDef = args.grid.getColumns()[columnIndex];
                if (!columnDef) {
                    return false;
                }
                var fieldType = columnDef.type || FieldType.string;
                var filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
                var cellValue = item[columnDef.queryField || columnDef.queryFieldFilter || columnDef.field];
                var searchValues = (columnFilter && columnFilter.searchTerms) ? __spread(columnFilter.searchTerms) : null;
                var fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';
                fieldSearchValue = '' + fieldSearchValue;
                var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                var operator = columnFilter.operator || ((matches) ? matches[1] : '');
                var searchTerm = (!!matches) ? matches[2] : '';
                var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                if (searchValues && searchValues.length > 1) {
                    fieldSearchValue = searchValues.join(',');
                }
                else if (typeof fieldSearchValue === 'string') {
                    fieldSearchValue = fieldSearchValue.replace("'", "''");
                    if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                        operator = (operator === '*' || operator === '*z') ? OperatorType.endsWith : OperatorType.startsWith;
                    }
                }
                if (searchTerm === '' && (!searchValues || (Array.isArray(searchValues) && searchValues.length === 0))) {
                    return true;
                }
                if (Array.isArray(matches) && matches.length >= 1 && (Array.isArray(searchValues) && searchValues.length === 1)) {
                    searchValues[0] = searchTerm;
                }
                if (searchValues && Array.isArray(searchValues)) {
                    for (var k = 0, ln = searchValues.length; k < ln; k++) {
                        searchValues[k] = ((searchValues[k] === undefined || searchValues[k] === null) ? '' : searchValues[k]) + '';
                    }
                }
                if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
                    var rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
                    cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
                }
                if (typeof cellValue === 'number') {
                    cellValue = cellValue.toString();
                }
                var conditionOptions = {
                    fieldType: fieldType,
                    searchTerms: searchValues,
                    cellValue: cellValue,
                    operator: operator,
                    cellValueLastChar: lastValueChar,
                    filterSearchType: filterSearchType
                };
                if (!FilterConditions.executeMappedCondition(conditionOptions)) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
        var e_1, _c;
    };
    FilterService.prototype.dispose = function () {
        this.disposeColumnFilters();
        this._eventHandler.unsubscribeAll();
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
    };
    FilterService.prototype.disposeColumnFilters = function () {
        for (var columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        this._filters.forEach(function (filter, index) {
            if (filter && filter.destroy) {
                filter.destroy(true);
            }
        });
    };
    FilterService.prototype.getColumnFilters = function () {
        return this._columnFilters;
    };
    FilterService.prototype.getCurrentLocalFilters = function () {
        var currentFilters = [];
        if (this._columnFilters) {
            try {
                for (var _a = __values(Object.keys(this._columnFilters)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var colId = _b.value;
                    var columnFilter = this._columnFilters[colId];
                    var columnDef = columnFilter.columnDef;
                    var filter = ({ columnId: colId || '' });
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
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return currentFilters;
        var e_2, _c;
    };
    FilterService.prototype.callbackSearchEvent = function (e, args) {
        if (args) {
            var searchTerm = ((e && e.target) ? ((e.target)).value : undefined);
            var searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
            var columnDef = args.columnDef || null;
            var columnId = columnDef ? (columnDef.id || '') : '';
            var operator = args.operator || undefined;
            if (!searchTerms || (Array.isArray(searchTerms) && searchTerms.length === 0)) {
                delete this._columnFilters[columnId];
            }
            else {
                var colId = ('' + columnId);
                var colFilter = {
                    columnId: colId,
                    columnDef: columnDef,
                    searchTerms: searchTerms,
                };
                if (operator) {
                    colFilter.operator = operator;
                }
                this._columnFilters[colId] = colFilter;
            }
            this.triggerEvent(this._slickSubscriber, {
                clearFilterTriggered: args && args.clearFilterTriggered,
                columnId: columnId,
                columnDef: args.columnDef || null,
                columnFilters: this._columnFilters,
                operator: operator,
                searchTerms: searchTerms,
                serviceOptions: this._onFilterChangedOptions,
                grid: this._grid
            }, e);
        }
    };
    FilterService.prototype.addFilterTemplateToHeaderRow = function (args) {
        var columnDef = args.column;
        var columnId = columnDef.id || '';
        if (columnDef && columnId !== 'selector' && columnDef.filterable) {
            var searchTerms = void 0;
            var operator = void 0;
            var filter_1 = this.filterFactory.createFilter(args.column.filter);
            operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (filter_1 && filter_1.operator) || undefined;
            if (this._columnFilters[columnDef.id]) {
                searchTerms = this._columnFilters[columnDef.id].searchTerms || undefined;
                operator = this._columnFilters[columnDef.id].operator || undefined;
            }
            else if (columnDef.filter) {
                searchTerms = columnDef.filter.searchTerms || undefined;
                this.updateColumnFilters(searchTerms, columnDef, operator);
            }
            var filterArguments = {
                grid: this._grid,
                operator: operator,
                searchTerms: searchTerms,
                columnDef: columnDef,
                callback: this.callbackSearchEvent.bind(this)
            };
            if (filter_1) {
                filter_1.init(filterArguments);
                var filterExistIndex = this._filters.findIndex(function (filt) { return filter_1.columnDef.name === filt.columnDef.name; });
                if (filterExistIndex === -1) {
                    this._filters.push(filter_1);
                }
                else {
                    this._filters[filterExistIndex] = filter_1;
                }
                if (searchTerms && filter_1.setValues) {
                    filter_1.setValues(searchTerms);
                }
            }
        }
    };
    FilterService.prototype.emitFilterChanged = function (sender) {
        if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
            var currentFilters = [];
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                currentFilters = (backendService.getCurrentFilters());
            }
            this.onFilterChanged.next(currentFilters);
        }
        else if (sender === 'local') {
            this.onFilterChanged.next(this.getCurrentLocalFilters());
        }
    };
    FilterService.prototype.populateColumnFilterSearchTerms = function () {
        if (this._gridOptions.presets && Array.isArray(this._gridOptions.presets.filters) && this._gridOptions.presets.filters.length > 0) {
            var filters_1 = this._gridOptions.presets.filters;
            this._columnDefinitions.forEach(function (columnDef) {
                if (columnDef.filter && columnDef.filter.searchTerms) {
                    delete columnDef.filter.searchTerms;
                }
                var columnPreset = filters_1.find(function (presetFilter) {
                    return presetFilter.columnId === columnDef.id;
                });
                if (columnPreset && columnPreset.searchTerms && Array.isArray(columnPreset.searchTerms)) {
                    columnDef.filter = columnDef.filter || {};
                    columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || '';
                    columnDef.filter.searchTerms = columnPreset.searchTerms;
                }
            });
        }
    };
    FilterService.prototype.updateColumnFilters = function (searchTerms, columnDef, operator) {
        if (searchTerms && columnDef) {
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef: columnDef,
                searchTerms: searchTerms,
                operator: operator
            };
        }
    };
    FilterService.prototype.triggerEvent = function (slickEvent, args, e) {
        slickEvent = slickEvent || new Slick.Event();
        var event = e;
        if (e && typeof e.isPropagationStopped !== 'function') {
            event = $.extend({}, new Slick.EventData(), e);
        }
        slickEvent.notify(args, event, args.grid);
    };
    return FilterService;
}());
FilterService.decorators = [
    { type: core.Injectable },
];
FilterService.ctorParameters = function () { return [
    { type: FilterFactory, },
]; };
var ExportService = /** @class */ (function () {
    function ExportService(translate) {
        this.translate = translate;
        this._lineCarriageReturn = '\n';
        this._hasGroupedItems = false;
        this.onGridBeforeExportToFile = new Subject.Subject();
        this.onGridAfterExportToFile = new Subject.Subject();
    }
    Object.defineProperty(ExportService.prototype, "_gridOptions", {
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    ExportService.prototype.init = function (grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    };
    ExportService.prototype.exportToFile = function (options) {
        var _this = this;
        this.onGridBeforeExportToFile.next(true);
        this._exportOptions = $.extend(true, {}, this._gridOptions.exportOptions, options);
        var dataOutput = this.getDataOutput();
        setTimeout(function () {
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
    ExportService.prototype.getDataOutput = function () {
        var _this = this;
        var columns = this._grid.getColumns() || [];
        var delimiter = this._exportOptions.delimiter || '';
        var format = this._exportOptions.format || '';
        var groupByColumnHeader = this._exportOptions.groupingColumnHeaderTitle || this.translate.instant('GROUP_BY');
        this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';
        var outputDataString = '';
        var grouping = this._dataView.getGrouping();
        if (grouping && Array.isArray(grouping) && grouping.length > 0) {
            this._hasGroupedItems = true;
            outputDataString += "" + groupByColumnHeader + delimiter;
        }
        else {
            this._hasGroupedItems = false;
        }
        this._columnHeaders = this.getColumnHeaders(columns) || [];
        if (this._columnHeaders && Array.isArray(this._columnHeaders) && this._columnHeaders.length > 0) {
            var outputHeaderTitles = this._columnHeaders.map(function (header) {
                return _this._exportQuoteWrapper + header.title + _this._exportQuoteWrapper;
            });
            outputDataString += (outputHeaderTitles.join(delimiter) + this._lineCarriageReturn);
        }
        outputDataString += this.getAllGridRowData(columns, this._lineCarriageReturn);
        return outputDataString;
    };
    ExportService.prototype.getAllGridRowData = function (columns, lineCarriageReturn) {
        var outputDataString = '';
        var lineCount = this._dataView.getLength();
        for (var rowNumber = 0; rowNumber < lineCount; rowNumber++) {
            var itemObj = this._dataView.getItem(rowNumber);
            if (itemObj != null) {
                if (itemObj.id != null) {
                    outputDataString += this.readRegularRowData(columns, rowNumber, itemObj);
                }
                else if (this._hasGroupedItems && itemObj.__groupTotals === undefined) {
                    outputDataString += this.readGroupedTitleRow(itemObj) + this._exportOptions.delimiter;
                }
                else if (itemObj.__groupTotals) {
                    outputDataString += this.readGroupedTotalRow(columns, itemObj) + this._exportOptions.delimiter;
                }
                outputDataString += lineCarriageReturn;
            }
        }
        return outputDataString;
    };
    ExportService.prototype.getColumnHeaders = function (columns) {
        var _this = this;
        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return null;
        }
        var columnHeaders = [];
        columns.forEach(function (columnDef) {
            var fieldName = (columnDef.headerKey) ? _this.translate.instant(columnDef.headerKey) : columnDef.name;
            var skippedField = columnDef.excludeFromExport || false;
            if ((columnDef.width === undefined || columnDef.width > 0) && !skippedField) {
                columnHeaders.push({
                    key: columnDef.field || columnDef.id,
                    title: fieldName
                });
            }
        });
        return columnHeaders;
    };
    ExportService.prototype.readRegularRowData = function (columns, row, itemObj) {
        var idx = 0;
        var rowOutputString = '';
        var delimiter = this._exportOptions.delimiter;
        var format = this._exportOptions.format;
        var exportQuoteWrapper = this._exportQuoteWrapper || '';
        for (var col = 0, ln = columns.length; col < ln; col++) {
            var columnDef = columns[col];
            var fieldId = columnDef.field || columnDef.id || '';
            if (columnDef.excludeFromExport) {
                continue;
            }
            if (this._hasGroupedItems && idx === 0) {
                rowOutputString += "\"\"" + delimiter;
            }
            var isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._exportOptions.exportWithFormatter;
            var exportCustomFormatter = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;
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
            if (columnDef.sanitizeDataExport || this._exportOptions.sanitizeDataExport) {
                itemData = sanitizeHtmlToText(itemData);
            }
            if (format === FileType.csv) {
                itemData = itemData.toString().replace(/"/gi, "\"\"");
            }
            var keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
            rowOutputString += keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper + delimiter;
            idx++;
        }
        return rowOutputString;
    };
    ExportService.prototype.readGroupedTitleRow = function (itemObj) {
        var groupName = sanitizeHtmlToText(itemObj.title);
        var exportQuoteWrapper = this._exportQuoteWrapper || '';
        var delimiter = this._exportOptions.delimiter;
        var format = this._exportOptions.format;
        groupName = addWhiteSpaces(5 * itemObj.level) + groupName;
        if (format === FileType.csv) {
            groupName = groupName.toString().replace(/"/gi, "\"\"");
        }
        return exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper + delimiter;
    };
    ExportService.prototype.readGroupedTotalRow = function (columns, itemObj) {
        var _this = this;
        var exportExponentialWrapper = '';
        var delimiter = this._exportOptions.delimiter;
        var format = this._exportOptions.format;
        var groupingAggregatorRowText = this._exportOptions.groupingAggregatorRowText || '';
        var exportQuoteWrapper = this._exportQuoteWrapper || '';
        var output = "" + exportQuoteWrapper + groupingAggregatorRowText + exportQuoteWrapper + delimiter;
        columns.forEach(function (columnDef) {
            var itemData = '';
            if (columnDef.groupTotalsFormatter) {
                itemData = columnDef.groupTotalsFormatter(itemObj, columnDef);
            }
            if (columnDef.sanitizeDataExport || _this._exportOptions.sanitizeDataExport) {
                itemData = sanitizeHtmlToText(itemData);
            }
            if (format === FileType.csv) {
                itemData = itemData.toString().replace(/"/gi, "\"\"");
                exportExponentialWrapper = (itemData.match(/^\s*\d+E\d+\s*$/i)) ? '=' : '';
            }
            output += exportQuoteWrapper + itemData + exportQuoteWrapper + delimiter;
        });
        return output;
    };
    ExportService.prototype.startDownloadFile = function (options) {
        if (navigator.appName === 'Microsoft Internet Explorer') {
            throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
        }
        var mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';
        var csvContent = htmlEntityDecode(options.csvContent);
        var outputData;
        if (options.format === FileType.csv) {
            outputData = new textEncodingUtf8.TextEncoder('utf-8').encode(csvContent);
        }
        else {
            outputData = csvContent;
        }
        var blob = new Blob([options.useUtf8WithBom ? '\uFEFF' : '', outputData], {
            type: mimeType + ";charset=utf-8;"
        });
        if (typeof navigator.msSaveOrOpenBlob === 'function') {
            navigator.msSaveOrOpenBlob(blob, options.filename);
        }
        else {
            var link = document.createElement('a');
            var csvUrl = URL.createObjectURL(blob);
            link.textContent = 'download';
            link.href = csvUrl;
            link.setAttribute('download', options.filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    return ExportService;
}());
ExportService.decorators = [
    { type: core.Injectable },
];
ExportService.ctorParameters = function () { return [
    { type: core$1.TranslateService, },
]; };
var SortService = /** @class */ (function () {
    function SortService() {
        this._currentLocalSorters = [];
        this._eventHandler = new Slick.EventHandler();
        this._isBackendGrid = false;
        this.onSortChanged = new Subject.Subject();
        this.onSortCleared = new Subject.Subject();
    }
    Object.defineProperty(SortService.prototype, "_gridOptions", {
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortService.prototype, "_columnDefinitions", {
        get: function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    SortService.prototype.attachBackendOnSort = function (grid, dataView) {
        this._isBackendGrid = true;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
    };
    SortService.prototype.onBackendSortChanged = function (event, args) {
        return __awaiter(this, void 0, void 0, function () {
            var gridOptions, backendApi, query, observableOrPromise, processResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args || !args.grid) {
                            throw new Error('Something went wrong when trying to attach the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
                        }
                        gridOptions = args.grid.getOptions() || {};
                        backendApi = gridOptions.backendServiceApi;
                        if (!backendApi || !backendApi.process || !backendApi.service) {
                            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        if (backendApi.preProcess) {
                            backendApi.preProcess();
                        }
                        query = backendApi.service.processOnSortChanged(event, args);
                        this.emitSortChanged('remote');
                        observableOrPromise = backendApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 1:
                        processResult = _a.sent();
                        if (processResult && backendApi.internalPostProcess) {
                            backendApi.internalPostProcess(processResult);
                        }
                        if (backendApi.postProcess) {
                            backendApi.postProcess(processResult);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SortService.prototype.attachLocalOnSort = function (grid, dataView) {
        var _this = this;
        this._isBackendGrid = false;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        this._slickSubscriber.subscribe(function (e, args) {
            var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            _this._currentLocalSorters = [];
            if (Array.isArray(sortColumns)) {
                sortColumns.forEach(function (sortColumn) {
                    if (sortColumn.sortCol) {
                        _this._currentLocalSorters.push({
                            columnId: sortColumn.sortCol.id,
                            direction: sortColumn.sortAsc ? SortDirection.ASC : SortDirection.DESC
                        });
                    }
                });
            }
            _this.onLocalSortChanged(grid, dataView, sortColumns);
            _this.emitSortChanged('local');
        });
    };
    SortService.prototype.clearSorting = function () {
        if (this._grid && this._gridOptions && this._dataView) {
            this._grid.setSortColumns([]);
            if (this._isBackendGrid) {
                this.onBackendSortChanged(undefined, { grid: this._grid, sortCols: [] });
            }
            else {
                if (this._columnDefinitions && Array.isArray(this._columnDefinitions)) {
                    this.onLocalSortChanged(this._grid, this._dataView, new Array({ sortAsc: true, sortCol: this._columnDefinitions[0] }));
                }
            }
        }
        this._currentLocalSorters = [];
        this.onSortCleared.next(true);
    };
    SortService.prototype.getCurrentLocalSorters = function () {
        return this._currentLocalSorters;
    };
    SortService.prototype.getPreviousColumnSorts = function (columnId) {
        var _this = this;
        var oldSortColumns = this._grid.getSortColumns();
        var sortedCols = oldSortColumns.reduce(function (cols, col) {
            if (!columnId || col.columnId !== columnId) {
                cols.push({ sortCol: _this._columnDefinitions[_this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
            }
            return cols;
        }, []);
        return sortedCols;
    };
    SortService.prototype.loadLocalPresets = function (grid, dataView) {
        var _this = this;
        var sortCols = [];
        this._currentLocalSorters = [];
        if (this._gridOptions && this._gridOptions.presets && this._gridOptions.presets.sorters) {
            var sorters = this._gridOptions.presets.sorters;
            sorters.forEach(function (presetSorting) {
                var gridColumn = _this._columnDefinitions.find(function (col) { return col.id === presetSorting.columnId; });
                if (gridColumn) {
                    sortCols.push({
                        columnId: gridColumn.id,
                        sortAsc: ((presetSorting.direction.toUpperCase() === SortDirection.ASC) ? true : false),
                        sortCol: gridColumn
                    });
                    _this._currentLocalSorters.push({
                        columnId: gridColumn.id + '',
                        direction: (presetSorting.direction.toUpperCase())
                    });
                }
            });
            if (sortCols.length > 0) {
                this.onLocalSortChanged(grid, dataView, sortCols);
                grid.setSortColumns(sortCols);
            }
        }
    };
    SortService.prototype.onLocalSortChanged = function (grid, dataView, sortColumns) {
        dataView.sort(function (dataRow1, dataRow2) {
            for (var i = 0, l = sortColumns.length; i < l; i++) {
                var columnSortObj = sortColumns[i];
                if (columnSortObj && columnSortObj.sortCol) {
                    var sortDirection = columnSortObj.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
                    var sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldFilter || columnSortObj.sortCol.field;
                    var fieldType = columnSortObj.sortCol.type || FieldType.string;
                    var value1 = dataRow1[sortField];
                    var value2 = dataRow2[sortField];
                    var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
                    if (sortResult !== SortDirectionNumber.neutral) {
                        return sortResult;
                    }
                }
            }
            return 0;
        });
        grid.invalidate();
        grid.render();
    };
    SortService.prototype.dispose = function () {
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
        this._eventHandler.unsubscribeAll();
    };
    SortService.prototype.emitSortChanged = function (sender) {
        if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
            var currentSorters = [];
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                currentSorters = (backendService.getCurrentSorters());
            }
            this.onSortChanged.next(currentSorters);
        }
        else if (sender === 'local') {
            this.onSortChanged.next(this.getCurrentLocalSorters());
        }
    };
    return SortService;
}());
var Constants = /** @class */ (function () {
    function Constants() {
    }
    return Constants;
}());
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
Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN = 'Please enter a valid number with a maximum of {{maxDecimal}} decimals';
var ControlAndPluginService = /** @class */ (function () {
    function ControlAndPluginService(exportService, filterService, sortService, translate) {
        this.exportService = exportService;
        this.filterService = filterService;
        this.sortService = sortService;
        this.translate = translate;
        this.areVisibleColumnDifferent = false;
        this.extensionList = [];
    }
    Object.defineProperty(ControlAndPluginService.prototype, "_gridOptions", {
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlAndPluginService.prototype, "_columnDefinitions", {
        get: function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    ControlAndPluginService.prototype.getAllColumns = function () {
        return this.allColumns || [];
    };
    ControlAndPluginService.prototype.getVisibleColumns = function () {
        return this.visibleColumns || [];
    };
    ControlAndPluginService.prototype.getAllExtensions = function () {
        return this.extensionList;
    };
    ControlAndPluginService.prototype.getExtensionByName = function (name) {
        return this.extensionList.find(function (p) { return p.name === name; });
    };
    ControlAndPluginService.prototype.autoResizeColumns = function () {
        this._grid.autosizeColumns();
    };
    ControlAndPluginService.prototype.attachDifferentControlOrPlugins = function (grid, dataView, groupItemMetadataProvider) {
        var _this = this;
        this._grid = grid;
        this._dataView = dataView;
        this.allColumns = this._columnDefinitions;
        this.visibleColumns = this._columnDefinitions;
        if (this._gridOptions.enableTranslate) {
            this.translateItems(this.allColumns, 'headerKey', 'name');
        }
        if (this._gridOptions.enableColumnPicker) {
            this.columnPickerControl = this.createColumnPicker(this._grid, this._columnDefinitions);
            this.extensionList.push({ name: 'ColumnPicker', service: this.columnPickerControl });
        }
        if (this._gridOptions.enableGridMenu) {
            this.userOriginalGridMenu = Object.assign({}, this._gridOptions.gridMenu);
            this.gridMenuControl = this.createGridMenu(this._grid, this._columnDefinitions);
            this.extensionList.push({ name: 'GridMenu', service: this.gridMenuControl });
        }
        if (this._gridOptions.enableAutoTooltip) {
            this.autoTooltipPlugin = new Slick.AutoTooltips(this._gridOptions.autoTooltipOptions || {});
            this._grid.registerPlugin(this.autoTooltipPlugin);
            this.extensionList.push({ name: 'AutoTooltip', service: this.autoTooltipPlugin });
        }
        if (this._gridOptions.enableGrouping) {
            this.groupItemMetaProviderPlugin = groupItemMetadataProvider || {};
            this._grid.registerPlugin(this.groupItemMetaProviderPlugin);
            this.extensionList.push({ name: 'GroupItemMetaProvider', service: this.groupItemMetaProviderPlugin });
        }
        if (this._gridOptions.enableCheckboxSelector) {
            this._grid.registerPlugin(this.checkboxSelectorPlugin);
            this.extensionList.push({ name: 'CheckboxSelector', service: this.checkboxSelectorPlugin });
            if (!this.rowSelectionPlugin || !this._grid.getSelectionModel()) {
                this.rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
                this._grid.setSelectionModel(this.rowSelectionPlugin);
            }
            if (this._gridOptions.preselectedRows && this.rowSelectionPlugin && this._grid.getSelectionModel()) {
                setTimeout(function () { return _this.checkboxSelectorPlugin.selectRows(_this._gridOptions.preselectedRows); }, 0);
            }
        }
        if (!this._gridOptions.enableCheckboxSelector && this._gridOptions.enableRowSelection) {
            this.rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(this.rowSelectionPlugin);
        }
        if (this._gridOptions.enableHeaderButton) {
            this.headerButtonsPlugin = new Slick.Plugins.HeaderButtons(this._gridOptions.headerButton || {});
            this._grid.registerPlugin(this.headerButtonsPlugin);
            this.extensionList.push({ name: 'HeaderButtons', service: this.headerButtonsPlugin });
            this.headerButtonsPlugin.onCommand.subscribe(function (e, args) {
                if (_this._gridOptions.headerButton && typeof _this._gridOptions.headerButton.onCommand === 'function') {
                    _this._gridOptions.headerButton.onCommand(e, args);
                }
            });
        }
        if (this._gridOptions.enableHeaderMenu) {
            this.headerMenuPlugin = this.createHeaderMenu(this._grid, this._dataView, this._columnDefinitions);
        }
        if (this._gridOptions.enableExcelCopyBuffer) {
            this.createUndoRedoBuffer();
            this.hookUndoShortcutKey();
            this.createCellExternalCopyManagerPlugin(this._grid);
        }
        if (this._gridOptions.registerPlugins !== undefined) {
            if (Array.isArray(this._gridOptions.registerPlugins)) {
                this._gridOptions.registerPlugins.forEach(function (plugin) {
                    _this._grid.registerPlugin(plugin);
                    _this.extensionList.push({ name: 'generic', service: plugin });
                });
            }
            else {
                this._grid.registerPlugin(this._gridOptions.registerPlugins);
                this.extensionList.push({ name: 'generic', service: this._gridOptions.registerPlugins });
            }
        }
    };
    ControlAndPluginService.prototype.createCheckboxPluginBeforeGridCreation = function (columnDefinitions, options) {
        if (options.enableCheckboxSelector) {
            if (!this.checkboxSelectorPlugin) {
                this.checkboxSelectorPlugin = new Slick.CheckboxSelectColumn(options.checkboxSelector || {});
            }
            var selectionColumn = this.checkboxSelectorPlugin.getColumnDefinition();
            selectionColumn.excludeFromExport = true;
            selectionColumn.excludeFromQuery = true;
            selectionColumn.excludeFromHeaderMenu = true;
            columnDefinitions.unshift(selectionColumn);
        }
    };
    ControlAndPluginService.prototype.createCellExternalCopyManagerPlugin = function (grid) {
        var _this = this;
        var newRowIds = 0;
        var pluginOptions = {
            clipboardCommandHandler: function (editCommand) {
                _this.undoRedoBuffer.queueAndExecuteCommand.call(_this.undoRedoBuffer, editCommand);
            },
            dataItemColumnValueExtractor: function (item, columnDef) {
                if (!_this._gridOptions.editable || !columnDef.editor) {
                    var isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : _this._gridOptions.exportOptions.exportWithFormatter;
                    if (columnDef.formatter && isEvaluatingFormatter) {
                        var formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, _this._grid);
                        if (columnDef.sanitizeDataExport || (_this._gridOptions.exportOptions && _this._gridOptions.exportOptions.sanitizeDataExport)) {
                            return sanitizeHtmlToText(formattedOutput);
                        }
                        return formattedOutput;
                    }
                }
                return null;
            },
            readOnlyMode: false,
            includeHeaderWhenCopying: false,
            newRowCreator: function (count) {
                for (var i = 0; i < count; i++) {
                    var item = {
                        id: 'newRow_' + newRowIds++
                    };
                    grid.getData().addItem(item);
                }
            }
        };
        grid.setSelectionModel(new Slick.CellSelectionModel());
        this.cellExternalCopyManagerPlugin = new Slick.CellExternalCopyManager(pluginOptions);
        grid.registerPlugin(this.cellExternalCopyManagerPlugin);
        this.extensionList.push({ name: 'CellExternalCopyManager', service: this.cellExternalCopyManagerPlugin });
    };
    ControlAndPluginService.prototype.createColumnPicker = function (grid, columnDefinitions) {
        var _this = this;
        var columnTitle = this.getPickerTitleOutputString('columnTitle', 'columnPicker');
        var forceFitTitle = this.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
        var syncResizeTitle = this.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
        this._gridOptions.columnPicker = this._gridOptions.columnPicker || {};
        this._gridOptions.columnPicker.columnTitle = this._gridOptions.columnPicker.columnTitle || columnTitle;
        this._gridOptions.columnPicker.forceFitTitle = this._gridOptions.columnPicker.forceFitTitle || forceFitTitle;
        this._gridOptions.columnPicker.syncResizeTitle = this._gridOptions.columnPicker.syncResizeTitle || syncResizeTitle;
        this.columnPickerControl = new Slick.Controls.ColumnPicker(columnDefinitions, grid, this._gridOptions);
        if (grid && this._gridOptions.enableColumnPicker) {
            this.columnPickerControl.onColumnsChanged.subscribe(function (e, args) {
                if (_this._gridOptions.columnPicker && typeof _this._gridOptions.columnPicker.onColumnsChanged === 'function') {
                    _this._gridOptions.columnPicker.onColumnsChanged(e, args);
                }
            });
        }
        return this.columnPickerControl;
    };
    ControlAndPluginService.prototype.createGridMenu = function (grid, columnDefinitions) {
        var _this = this;
        if (this._gridOptions && this._gridOptions.gridMenu) {
            this._gridOptions.gridMenu = Object.assign({}, this.getDefaultGridMenuOptions(), this._gridOptions.gridMenu);
            this._gridOptions.gridMenu.customItems = __spread(this.userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
            this.translateItems(this._gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.sortItems(this._gridOptions.gridMenu.customItems, 'positionOrder');
            var gridMenuControl = new Slick.Controls.GridMenu(columnDefinitions, grid, this._gridOptions);
            if (grid && this._gridOptions.gridMenu) {
                gridMenuControl.onBeforeMenuShow.subscribe(function (e, args) {
                    if (_this._gridOptions.gridMenu && typeof _this._gridOptions.gridMenu.onBeforeMenuShow === 'function') {
                        _this._gridOptions.gridMenu.onBeforeMenuShow(e, args);
                    }
                });
                gridMenuControl.onColumnsChanged.subscribe(function (e, args) {
                    _this.areVisibleColumnDifferent = true;
                    if (_this._gridOptions.gridMenu && typeof _this._gridOptions.gridMenu.onColumnsChanged === 'function') {
                        _this._gridOptions.gridMenu.onColumnsChanged(e, args);
                    }
                });
                gridMenuControl.onCommand.subscribe(function (e, args) {
                    _this.executeGridMenuInternalCustomCommands(e, args);
                    if (_this._gridOptions.gridMenu && typeof _this._gridOptions.gridMenu.onCommand === 'function') {
                        _this._gridOptions.gridMenu.onCommand(e, args);
                    }
                });
                gridMenuControl.onMenuClose.subscribe(function (e, args) {
                    if (_this._gridOptions.gridMenu && typeof _this._gridOptions.gridMenu.onMenuClose === 'function') {
                        _this._gridOptions.gridMenu.onMenuClose(e, args);
                    }
                    if (grid && typeof grid.autosizeColumns === 'function') {
                        var gridUid = grid.getUID();
                        if (_this.areVisibleColumnDifferent && gridUid && $("." + gridUid).length > 0) {
                            grid.autosizeColumns();
                            _this.areVisibleColumnDifferent = false;
                        }
                    }
                });
            }
            return gridMenuControl;
        }
        return null;
    };
    ControlAndPluginService.prototype.createHeaderMenu = function (grid, dataView, columnDefinitions) {
        var _this = this;
        this._gridOptions.headerMenu = Object.assign({}, this.getDefaultHeaderMenuOptions(), this._gridOptions.headerMenu);
        if (this._gridOptions.enableHeaderMenu) {
            this._gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this._gridOptions, columnDefinitions);
        }
        var headerMenuPlugin = new Slick.Plugins.HeaderMenu(this._gridOptions.headerMenu);
        grid.registerPlugin(headerMenuPlugin);
        headerMenuPlugin.onCommand.subscribe(function (e, args) {
            _this.executeHeaderMenuInternalCommands(e, args);
            if (_this._gridOptions.headerMenu && typeof _this._gridOptions.headerMenu.onCommand === 'function') {
                _this._gridOptions.headerMenu.onCommand(e, args);
            }
        });
        headerMenuPlugin.onBeforeMenuShow.subscribe(function (e, args) {
            if (_this._gridOptions.headerMenu && typeof _this._gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                _this._gridOptions.headerMenu.onBeforeMenuShow(e, args);
            }
        });
        return headerMenuPlugin;
    };
    ControlAndPluginService.prototype.createUndoRedoBuffer = function () {
        var commandQueue = [];
        var commandCtr = 0;
        this.undoRedoBuffer = {
            queueAndExecuteCommand: function (editCommand) {
                commandQueue[commandCtr] = editCommand;
                commandCtr++;
                editCommand.execute();
            },
            undo: function () {
                if (commandCtr === 0) {
                    return;
                }
                commandCtr--;
                var command = commandQueue[commandCtr];
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.undo();
                }
            },
            redo: function () {
                if (commandCtr >= commandQueue.length) {
                    return;
                }
                var command = commandQueue[commandCtr];
                commandCtr++;
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.execute();
                }
            }
        };
    };
    ControlAndPluginService.prototype.hideColumn = function (column) {
        if (this._grid && this.visibleColumns) {
            var columnIndex = this._grid.getColumnIndex(column.id);
            this.visibleColumns = this.removeColumnByIndex(this.visibleColumns, columnIndex);
            this._grid.setColumns(this.visibleColumns);
        }
    };
    ControlAndPluginService.prototype.hookUndoShortcutKey = function () {
        var _this = this;
        $(document).keydown(function (e) {
            if (e.which === 90 && (e.ctrlKey || e.metaKey)) {
                if (e.shiftKey) {
                    _this.undoRedoBuffer.redo();
                }
                else {
                    _this.undoRedoBuffer.undo();
                }
            }
        });
    };
    ControlAndPluginService.prototype.dispose = function () {
        this._grid = null;
        this._dataView = null;
        this.visibleColumns = [];
        this.extensionList.forEach(function (item) {
            if (item && item.service && item.service.destroy) {
                item.service.destroy();
            }
        });
        this.extensionList = [];
    };
    ControlAndPluginService.prototype.addGridMenuCustomCommands = function () {
        var backendApi = this._gridOptions.backendServiceApi || null;
        var gridMenuCustomItems = [];
        if (this._gridOptions && this._gridOptions.enableFiltering) {
            if (this._gridOptions && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideClearAllFiltersCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this._gridOptions.gridMenu.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
                    title: this._gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : Constants.TEXT_CLEAR_ALL_FILTERS,
                    disabled: false,
                    command: 'clear-filter',
                    positionOrder: 50
                });
            }
            if (this._gridOptions && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideToggleFilterCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this._gridOptions.gridMenu.iconToggleFilterCommand || 'fa fa-random',
                    title: this._gridOptions.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : Constants.TEXT_TOGGLE_FILTER_ROW,
                    disabled: false,
                    command: 'toggle-filter',
                    positionOrder: 52
                });
            }
            if (this._gridOptions && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideRefreshDatasetCommand && backendApi) {
                gridMenuCustomItems.push({
                    iconCssClass: this._gridOptions.gridMenu.iconRefreshDatasetCommand || 'fa fa-refresh',
                    title: this._gridOptions.enableTranslate ? this.translate.instant('REFRESH_DATASET') : Constants.TEXT_REFRESH_DATASET,
                    disabled: false,
                    command: 'refresh-dataset',
                    positionOrder: 54
                });
            }
        }
        if (this._gridOptions.enableSorting) {
            if (this._gridOptions && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideClearAllSortingCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this._gridOptions.gridMenu.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
                    title: this._gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_SORTING') : Constants.TEXT_CLEAR_ALL_SORTING,
                    disabled: false,
                    command: 'clear-sorting',
                    positionOrder: 51
                });
            }
        }
        if (this._gridOptions && this._gridOptions.enableExport && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideExportCsvCommand) {
            gridMenuCustomItems.push({
                iconCssClass: this._gridOptions.gridMenu.iconExportCsvCommand || 'fa fa-download',
                title: this._gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : Constants.TEXT_EXPORT_IN_CSV_FORMAT,
                disabled: false,
                command: 'export-csv',
                positionOrder: 53
            });
        }
        if (this._gridOptions && this._gridOptions.enableExport && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideExportTextDelimitedCommand) {
            gridMenuCustomItems.push({
                iconCssClass: this._gridOptions.gridMenu.iconExportTextDelimitedCommand || 'fa fa-download',
                title: this._gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : Constants.TEXT_EXPORT_IN_TEXT_FORMAT,
                disabled: false,
                command: 'export-text-delimited',
                positionOrder: 54
            });
        }
        if (this._gridOptions && this._gridOptions.gridMenu && (gridMenuCustomItems.length > 0 || this._gridOptions.gridMenu.customItems.length > 0)) {
            this._gridOptions.gridMenu.customTitle = this._gridOptions.gridMenu.customTitle || this.getPickerTitleOutputString('customTitle', 'gridMenu');
        }
        return gridMenuCustomItems;
    };
    ControlAndPluginService.prototype.addHeaderMenuCustomCommands = function (options, columnDefinitions) {
        var _this = this;
        var headerMenuOptions = options.headerMenu;
        if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
            columnDefinitions.forEach(function (columnDef) {
                if (columnDef && !columnDef.excludeFromHeaderMenu) {
                    if (!columnDef.header || !columnDef.header.menu) {
                        columnDef.header = {
                            menu: {
                                items: []
                            }
                        };
                    }
                    var columnHeaderMenuItems = columnDef.header.menu.items || [];
                    if (options.enableSorting && columnDef.sortable && !headerMenuOptions.hideSortCommands) {
                        if (columnHeaderMenuItems.filter(function (item) { return item.command === 'sort-asc'; }).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                                title: options.enableTranslate ? _this.translate.instant('SORT_ASCENDING') : Constants.TEXT_SORT_ASCENDING,
                                command: 'sort-asc',
                                positionOrder: 50
                            });
                        }
                        if (columnHeaderMenuItems.filter(function (item) { return item.command === 'sort-desc'; }).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                                title: options.enableTranslate ? _this.translate.instant('SORT_DESCENDING') : Constants.TEXT_SORT_DESCENDING,
                                command: 'sort-desc',
                                positionOrder: 51
                            });
                        }
                    }
                    if (!headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter(function (item) { return item.command === 'hide'; }).length === 0) {
                        columnHeaderMenuItems.push({
                            iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
                            title: options.enableTranslate ? _this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
                            command: 'hide',
                            positionOrder: 52
                        });
                    }
                    _this.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                    columnHeaderMenuItems.sort(function (itemA, itemB) {
                        if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
                            return itemA.positionOrder - itemB.positionOrder;
                        }
                        return 0;
                    });
                }
            });
        }
        return headerMenuOptions;
    };
    ControlAndPluginService.prototype.executeHeaderMenuInternalCommands = function (e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'hide':
                    this.hideColumn(args.column);
                    this.autoResizeColumns();
                    break;
                case 'sort-asc':
                case 'sort-desc':
                    var cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
                    cols.push({ sortCol: args.column, sortAsc: (args.command === 'sort-asc') });
                    if (this._gridOptions.backendServiceApi) {
                        this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid: this._grid });
                    }
                    else {
                        this.sortService.onLocalSortChanged(this._grid, this._dataView, cols);
                    }
                    var newSortColumns = cols.map(function (col) {
                        return { columnId: col.sortCol.id, sortAsc: col.sortAsc };
                    });
                    this._grid.setSortColumns(newSortColumns);
                    break;
                default:
                    break;
            }
        }
    };
    ControlAndPluginService.prototype.executeGridMenuInternalCustomCommands = function (e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'clear-filter':
                    this.filterService.clearFilters();
                    this._dataView.refresh();
                    break;
                case 'clear-sorting':
                    this.sortService.clearSorting();
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
                    this._grid.setHeaderRowVisibility(!this._grid.getOptions().showHeaderRow);
                    break;
                case 'toggle-toppanel':
                    this._grid.setTopPanelVisibility(!this._grid.getOptions().showTopPanel);
                    break;
                case 'refresh-dataset':
                    this.refreshBackendDataset();
                    break;
                default:
                    break;
            }
        }
    };
    ControlAndPluginService.prototype.refreshBackendDataset = function () {
        var query;
        var backendApi = this._gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        if (backendApi.service) {
            query = backendApi.service.buildQuery();
        }
        if (query && query !== '') {
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            var observableOrPromise = backendApi.process(query);
            castToPromise(observableOrPromise).then(function (processResult) {
                if (processResult && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                if (backendApi.postProcess) {
                    backendApi.postProcess(processResult);
                }
            });
        }
    };
    ControlAndPluginService.prototype.removeColumnByIndex = function (array, index) {
        return array.filter(function (el, i) {
            return index !== i;
        });
    };
    ControlAndPluginService.prototype.translateColumnPicker = function () {
        if (this._gridOptions && this._gridOptions.columnPicker) {
            this.emptyColumnPickerTitles();
            this._gridOptions.columnPicker.columnTitle = this.getPickerTitleOutputString('columnTitle', 'columnPicker');
            this._gridOptions.columnPicker.forceFitTitle = this.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
            this._gridOptions.columnPicker.syncResizeTitle = this.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
        }
        this.translateItems(this.allColumns, 'headerKey', 'name');
        if (this.columnPickerControl.init) {
            this.columnPickerControl.init(this._grid);
        }
    };
    ControlAndPluginService.prototype.translateGridMenu = function () {
        if (this._gridOptions && this._gridOptions.gridMenu) {
            this._gridOptions.gridMenu.customItems = [];
            this.emptyGridMenuTitles();
            this._gridOptions.gridMenu.customItems = __spread(this.userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
            this.translateItems(this._gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.sortItems(this._gridOptions.gridMenu.customItems, 'positionOrder');
            this._gridOptions.gridMenu.columnTitle = this.getPickerTitleOutputString('columnTitle', 'gridMenu');
            this._gridOptions.gridMenu.forceFitTitle = this.getPickerTitleOutputString('forceFitTitle', 'gridMenu');
            this._gridOptions.gridMenu.syncResizeTitle = this.getPickerTitleOutputString('syncResizeTitle', 'gridMenu');
            this.translateItems(this.allColumns, 'headerKey', 'name');
            if (this.gridMenuControl.init) {
                this.gridMenuControl.init(this._grid);
            }
        }
    };
    ControlAndPluginService.prototype.translateHeaderMenu = function () {
        if (this._gridOptions && this._gridOptions.headerMenu) {
            this.resetHeaderMenuTranslations(this.visibleColumns);
        }
    };
    ControlAndPluginService.prototype.translateColumnHeaders = function (locale, newColumnDefinitions) {
        if (locale) {
            this.translate.use((locale));
        }
        var columnDefinitions = newColumnDefinitions || this._columnDefinitions;
        this.translateItems(columnDefinitions, 'headerKey', 'name');
        this.translateItems(this.allColumns, 'headerKey', 'name');
        this.renderColumnHeaders(columnDefinitions);
    };
    ControlAndPluginService.prototype.renderColumnHeaders = function (newColumnDefinitions) {
        var collection = newColumnDefinitions || this._columnDefinitions;
        if (Array.isArray(collection) && this._grid && this._grid.setColumns) {
            this._grid.setColumns(collection);
        }
    };
    ControlAndPluginService.prototype.emptyColumnPickerTitles = function () {
        this._gridOptions.columnPicker.columnTitle = '';
        this._gridOptions.columnPicker.forceFitTitle = '';
        this._gridOptions.columnPicker.syncResizeTitle = '';
    };
    ControlAndPluginService.prototype.emptyGridMenuTitles = function () {
        this._gridOptions.gridMenu.customTitle = '';
        this._gridOptions.gridMenu.columnTitle = '';
        this._gridOptions.gridMenu.forceFitTitle = '';
        this._gridOptions.gridMenu.syncResizeTitle = '';
    };
    ControlAndPluginService.prototype.getDefaultGridMenuOptions = function () {
        return {
            customTitle: undefined,
            columnTitle: this.getPickerTitleOutputString('columnTitle', 'gridMenu'),
            forceFitTitle: this.getPickerTitleOutputString('forceFitTitle', 'gridMenu'),
            syncResizeTitle: this.getPickerTitleOutputString('syncResizeTitle', 'gridMenu'),
            iconCssClass: 'fa fa-bars',
            menuWidth: 18,
            customItems: [],
            hideClearAllFiltersCommand: false,
            hideRefreshDatasetCommand: false,
            hideToggleFilterCommand: false,
        };
    };
    ControlAndPluginService.prototype.getDefaultHeaderMenuOptions = function () {
        return {
            autoAlignOffset: 12,
            minWidth: 140,
            hideColumnHideCommand: false,
            hideSortCommands: false,
            title: ''
        };
    };
    ControlAndPluginService.prototype.getPickerTitleOutputString = function (propName, pickerName) {
        var output = '';
        var picker = this._gridOptions && this._gridOptions[pickerName] || {};
        var enableTranslate = this._gridOptions && this._gridOptions.enableTranslate || false;
        var title = picker && picker[propName];
        var titleKey = picker && picker[propName + "Key"];
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
    };
    ControlAndPluginService.prototype.resetHeaderMenuTranslations = function (columnDefinitions) {
        var _this = this;
        columnDefinitions.forEach(function (columnDef) {
            if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
                if (!columnDef.excludeFromHeaderMenu) {
                    var columnHeaderMenuItems_1 = columnDef.header.menu.items || [];
                    columnHeaderMenuItems_1.forEach(function (item) {
                        switch (item.command) {
                            case 'sort-asc':
                                item.title = _this.translate.instant('SORT_ASCENDING') || Constants.TEXT_SORT_ASCENDING;
                                break;
                            case 'sort-desc':
                                item.title = _this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                                break;
                            case 'hide':
                                item.title = _this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                                break;
                        }
                        if (_this._gridOptions && _this._gridOptions.enableTranslate) {
                            _this.translateItems(columnHeaderMenuItems_1, 'titleKey', 'title');
                        }
                    });
                }
            }
        });
    };
    ControlAndPluginService.prototype.sortItems = function (items, propertyName) {
        items.sort(function (itemA, itemB) {
            if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
                return itemA[propertyName] - itemB[propertyName];
            }
            return 0;
        });
    };
    ControlAndPluginService.prototype.translateItems = function (items, inputKey, outputKey) {
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (item[inputKey]) {
                    item[outputKey] = this.translate.instant(item[inputKey]);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var e_3, _a;
    };
    return ControlAndPluginService;
}());
ControlAndPluginService.decorators = [
    { type: core.Injectable },
];
ControlAndPluginService.ctorParameters = function () { return [
    { type: ExportService, },
    { type: FilterService, },
    { type: SortService, },
    { type: core$1.TranslateService, },
]; };
var GraphqlQueryBuilder = /** @class */ (function () {
    function GraphqlQueryBuilder(queryFnName, aliasOrFilter) {
        this.queryFnName = queryFnName;
        this.head = [];
        if (typeof aliasOrFilter === 'function') {
            this.alias = aliasOrFilter;
        }
        else if (typeof aliasOrFilter === 'object') {
            this.filter(aliasOrFilter);
        }
        else if (undefined === aliasOrFilter && 2 === arguments.length) {
            throw new TypeError("You have passed undefined as Second argument to \"Query\"");
        }
        else if (undefined !== aliasOrFilter) {
            throw new TypeError("Second argument to \"Query\" should be an alias name(String) or filter arguments(Object). was passed " + aliasOrFilter);
        }
    }
    GraphqlQueryBuilder.prototype.filter = function (filters) {
        try {
            for (var _a = __values(Object.keys(filters)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var prop = _b.value;
                if (typeof filters[prop] === 'function') {
                    continue;
                }
                var val = this.getGraphQLValue(filters[prop]);
                if (val === '{}') {
                    continue;
                }
                this.head.push(prop + ":" + val);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return this;
        var e_4, _c;
    };
    GraphqlQueryBuilder.prototype.find = function () {
        var searches = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            searches[_i] = arguments[_i];
        }
        if (!searches) {
            throw new TypeError("find value can not be >>falsy<<");
        }
        var searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
        this.body = this.parceFind(searchKeys);
        return this;
    };
    GraphqlQueryBuilder.prototype.setAlias = function (alias) {
        this.alias = alias;
    };
    GraphqlQueryBuilder.prototype.toString = function () {
        if (this.body === undefined) {
            throw new ReferenceError("return properties are not defined. use the 'find' function to defined them");
        }
        return ((this.alias) ? (this.alias + ':') : '') + " " + this.queryFnName + " " + ((this.head.length > 0) ? '(' + this.head.join(',') + ')' : '') + "  { " + this.body + " }";
    };
    GraphqlQueryBuilder.prototype.parceFind = function (_levelA) {
        var propsA = _levelA.map(function (currentValue, index) {
            var itemX = _levelA[index];
            if (itemX instanceof GraphqlQueryBuilder) {
                return itemX.toString();
            }
            else if (!Array.isArray(itemX) && typeof itemX === 'object') {
                var propsAA = Object.keys(itemX);
                if (1 !== propsAA.length) {
                    throw new RangeError("Alias objects should only have one value. was passed: " + JSON.stringify(itemX));
                }
                var propS = propsAA[0];
                var item = itemX[propS];
                if (Array.isArray(item)) {
                    return new GraphqlQueryBuilder(propS).find(item);
                }
                return propS + " : " + item + " ";
            }
            else if (typeof itemX === 'string') {
                return itemX;
            }
            else {
                throw new RangeError("cannot handle Find value of " + itemX);
            }
        });
        return propsA.join(',');
    };
    GraphqlQueryBuilder.prototype.getGraphQLValue = function (value) {
        var _this = this;
        if (typeof value === 'string') {
            value = JSON.stringify(value);
        }
        else if (Array.isArray(value)) {
            value = value.map(function (item) {
                return _this.getGraphQLValue(item);
            }).join();
            value = "[" + value + "]";
        }
        else if (value instanceof Date) {
            value = JSON.stringify(value);
        }
        else if (value !== null && typeof value === 'object') {
            value = this.objectToString(value);
        }
        return value;
    };
    GraphqlQueryBuilder.prototype.objectToString = function (obj) {
        var sourceA = [];
        try {
            for (var _a = __values(Object.keys(obj)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var prop = _b.value;
                if (typeof obj[prop] === 'function') {
                    continue;
                }
                sourceA.push(prop + ":" + this.getGraphQLValue(obj[prop]));
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return "{" + sourceA.join() + "}";
        var e_5, _c;
    };
    return GraphqlQueryBuilder;
}());
var timer;
var DEFAULT_FILTER_TYPING_DEBOUNCE = 750;
var DEFAULT_ITEMS_PER_PAGE = 25;
var DEFAULT_PAGE_SIZE = 20;
var GraphqlService = /** @class */ (function () {
    function GraphqlService() {
        this.defaultOrderBy = { field: 'id', direction: SortDirection.ASC };
        this.defaultPaginationOptions = {
            first: DEFAULT_ITEMS_PER_PAGE,
            offset: 0
        };
    }
    Object.defineProperty(GraphqlService.prototype, "_gridOptions", {
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    GraphqlService.prototype.buildQuery = function () {
        if (!this.options || !this.options.datasetName || (!this._columnDefinitions && !this.options.columnDefinitions)) {
            throw new Error('GraphQL Service requires "datasetName" & "columnDefinitions" properties for it to work');
        }
        var columnDefinitions = this._columnDefinitions || this.options.columnDefinitions;
        columnDefinitions = columnDefinitions.filter(function (column) { return !column.excludeFromQuery; });
        var queryQb = new GraphqlQueryBuilder('query');
        var datasetQb = new GraphqlQueryBuilder(this.options.datasetName);
        var dataQb = (this.options.isWithCursor) ? new GraphqlQueryBuilder('edges') : new GraphqlQueryBuilder('nodes');
        var columnIds = [];
        if (columnDefinitions && Array.isArray(columnDefinitions)) {
            try {
                for (var columnDefinitions_1 = __values(columnDefinitions), columnDefinitions_1_1 = columnDefinitions_1.next(); !columnDefinitions_1_1.done; columnDefinitions_1_1 = columnDefinitions_1.next()) {
                    var column = columnDefinitions_1_1.value;
                    columnIds.push(column.field);
                    if (column.fields) {
                        columnIds.push.apply(columnIds, __spread(column.fields));
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (columnDefinitions_1_1 && !columnDefinitions_1_1.done && (_a = columnDefinitions_1.return)) _a.call(columnDefinitions_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        else {
            columnIds = this.options.columnIds || [];
        }
        if (columnIds.indexOf('id') === -1) {
            columnIds.unshift('id');
        }
        var filters = this.buildFilterQuery(columnIds);
        if (this.options.isWithCursor) {
            var pageInfoQb = new GraphqlQueryBuilder('pageInfo');
            pageInfoQb.find('hasNextPage', 'endCursor');
            dataQb.find(['cursor', { node: filters }]);
            datasetQb.find(['totalCount', pageInfoQb, dataQb]);
        }
        else {
            dataQb.find(filters);
            datasetQb.find(['totalCount', dataQb]);
        }
        var datasetFilters = Object.assign({}, this.options.paginationOptions, { first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first });
        if (!this.options.isWithCursor) {
            datasetFilters.offset = ((this.options.paginationOptions && this.options.paginationOptions.hasOwnProperty('offset')) ? +this.options.paginationOptions['offset'] : 0);
        }
        if (this.options.sortingOptions && Array.isArray(this.options.sortingOptions) && this.options.sortingOptions.length > 0) {
            datasetFilters.orderBy = this.options.sortingOptions;
        }
        if (this.options.filteringOptions && Array.isArray(this.options.filteringOptions) && this.options.filteringOptions.length > 0) {
            datasetFilters.filterBy = this.options.filteringOptions;
        }
        if (this.options.addLocaleIntoQuery) {
            datasetFilters.locale = this._gridOptions && this._gridOptions.i18n && this._gridOptions.i18n.currentLang || 'en';
        }
        if (this.options.extraQueryArguments) {
            try {
                for (var _b = __values(this.options.extraQueryArguments), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var queryArgument = _c.value;
                    datasetFilters[queryArgument.field] = queryArgument.value;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        datasetQb.filter(datasetFilters);
        queryQb.find(datasetQb);
        var enumSearchProperties = ['direction:', 'field:', 'operator:'];
        return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties, this.options.keepArgumentFieldDoubleQuotes || false);
        var e_6, _a, e_7, _d;
    };
    GraphqlService.prototype.buildFilterQuery = function (inputArray) {
        var set = function (o, a) {
            if (o === void 0) { o = {}; }
            var k = a.shift();
            o[k] = a.length ? set(o[k], a) : null;
            return o;
        };
        var output = inputArray.reduce(function (o, a) { return set(o, a.split('.')); }, {});
        return JSON.stringify(output)
            .replace(/\"|\:|null/g, '')
            .replace(/^\{/, '')
            .replace(/\}$/, '');
    };
    GraphqlService.prototype.init = function (serviceOptions, pagination, grid) {
        this._grid = grid;
        this.options = serviceOptions || {};
        this.pagination = pagination;
        if (grid && grid.getColumns && grid.getOptions) {
            this._columnDefinitions = grid.getColumns();
        }
    };
    GraphqlService.prototype.getInitPaginationOptions = function () {
        return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
    };
    GraphqlService.prototype.getDatasetName = function () {
        return this.options.datasetName || '';
    };
    GraphqlService.prototype.getCurrentFilters = function () {
        return this._currentFilters;
    };
    GraphqlService.prototype.getCurrentPagination = function () {
        return this._currentPagination;
    };
    GraphqlService.prototype.getCurrentSorters = function () {
        return this._currentSorters;
    };
    GraphqlService.prototype.resetPaginationOptions = function () {
        var paginationOptions;
        if (this.options.isWithCursor) {
            paginationOptions = ({
                after: '',
                before: undefined,
                last: undefined
            });
        }
        else {
            paginationOptions = ((this.options.paginationOptions || this.getInitPaginationOptions()));
            paginationOptions.offset = 0;
        }
        this._currentPagination = {
            pageNumber: 1,
            pageSize: paginationOptions.first
        };
        this.updateOptions({ paginationOptions: paginationOptions });
    };
    GraphqlService.prototype.updateOptions = function (serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
    };
    GraphqlService.prototype.processOnFilterChanged = function (event, args) {
        var _this = this;
        var gridOptions = this._gridOptions || args.grid.getOptions();
        var backendApi = gridOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
        }
        var debounceTypingDelay = 0;
        if (event && (event.type === 'keyup' || event.type === 'keydown')) {
            debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
        }
        this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
        var promise = new Promise(function (resolve, reject) {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying create the GraphQL Backend Service, it seems that "args" is not populated correctly');
            }
            clearTimeout(timer);
            timer = setTimeout(function () {
                _this.updateFilters(args.columnFilters, false);
                _this.resetPaginationOptions();
                resolve(_this.buildQuery());
            }, debounceTypingDelay);
        });
        return promise;
    };
    GraphqlService.prototype.processOnPaginationChanged = function (event, args) {
        var pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
        this.updatePagination(args.newPage, pageSize);
        return this.buildQuery();
    };
    GraphqlService.prototype.processOnSortChanged = function (event, args) {
        var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        this.updateSorters(sortColumns);
        return this.buildQuery();
    };
    GraphqlService.prototype.updateFilters = function (columnFilters, isUpdatedByPreset) {
        var searchByArray = [];
        var searchValue;
        var _loop_1 = function (columnId) {
            if (columnFilters.hasOwnProperty(columnId)) {
                var columnFilter_1 = columnFilters[columnId];
                var columnDef = void 0;
                if (isUpdatedByPreset && Array.isArray(this_1._columnDefinitions)) {
                    columnDef = this_1._columnDefinitions.find(function (column) { return column.id === columnFilter_1.columnId; });
                }
                else {
                    columnDef = columnFilter_1.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                var searchTerms = (columnFilter_1 ? columnFilter_1.searchTerms : null) || [];
                var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error("GraphQL filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                }
                fieldSearchValue = '' + fieldSearchValue;
                var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                var operator = columnFilter_1.operator || ((matches) ? matches[1] : '');
                searchValue = (!!matches) ? matches[2] : '';
                var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    return "continue";
                }
                if (searchTerms && searchTerms.length > 1) {
                    searchValue = searchTerms.join(',');
                }
                else if (typeof searchValue === 'string') {
                    searchValue = searchValue.replace("'", "''");
                    if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                        operator = (operator === '*' || operator === '*z') ? 'endsWith' : 'startsWith';
                    }
                }
                if (!operator && columnDef.filter) {
                    operator = columnDef.filter.operator;
                }
                if (!operator) {
                    operator = mapOperatorByFieldType(columnDef.type || FieldType.string);
                }
                searchByArray.push({
                    field: fieldName,
                    operator: mapOperatorType(operator),
                    value: searchValue
                });
            }
        };
        var this_1 = this;
        for (var columnId in columnFilters) {
            _loop_1(columnId);
        }
        this.updateOptions({ filteringOptions: searchByArray });
    };
    GraphqlService.prototype.updatePagination = function (newPage, pageSize) {
        this._currentPagination = {
            pageNumber: newPage,
            pageSize: pageSize
        };
        var paginationOptions;
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
        this.updateOptions({ paginationOptions: paginationOptions });
    };
    GraphqlService.prototype.updateSorters = function (sortColumns, presetSorters) {
        var _this = this;
        var currentSorters = [];
        var graphqlSorters = [];
        if (!sortColumns && presetSorters) {
            currentSorters = presetSorters;
            currentSorters.forEach(function (sorter) { return sorter.direction = (sorter.direction.toUpperCase()); });
            var tmpSorterArray = currentSorters.map(function (sorter) {
                var columnDef = _this._columnDefinitions.find(function (column) { return column.id === sorter.columnId; });
                if (columnDef) {
                    graphqlSorters.push({
                        field: (columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '',
                        direction: sorter.direction
                    });
                }
                return {
                    columnId: sorter.columnId,
                    sortAsc: sorter.direction.toUpperCase() === SortDirection.ASC
                };
            });
            this._grid.setSortColumns(tmpSorterArray);
        }
        else if (sortColumns && !presetSorters) {
            if (sortColumns && sortColumns.length === 0) {
                graphqlSorters = new Array(this.defaultOrderBy);
                currentSorters = new Array({ columnId: this.defaultOrderBy.field, direction: this.defaultOrderBy.direction });
            }
            else {
                if (sortColumns) {
                    try {
                        for (var sortColumns_1 = __values(sortColumns), sortColumns_1_1 = sortColumns_1.next(); !sortColumns_1_1.done; sortColumns_1_1 = sortColumns_1.next()) {
                            var column = sortColumns_1_1.value;
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
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return)) _a.call(sortColumns_1);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                }
            }
        }
        this._currentSorters = currentSorters;
        this.updateOptions({ sortingOptions: graphqlSorters });
        var e_8, _a;
    };
    GraphqlService.prototype.trimDoubleQuotesOnEnumField = function (inputStr, enumSearchWords, keepArgumentFieldDoubleQuotes) {
        var patternWordInQuotes = "s?((field:s*)?\".*?\")";
        var patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
        patternRegex += patternWordInQuotes;
        var reg = new RegExp(patternRegex, 'g');
        return inputStr.replace(reg, function (group1, group2, group3) {
            var removeDoubleQuotes = true;
            if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
                removeDoubleQuotes = false;
            }
            var rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
            return rep;
        });
    };
    GraphqlService.prototype.castFilterToColumnFilter = function (columnFilters) {
        var filtersArray = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map(function (key) { return columnFilters[key]; }) : columnFilters;
        return filtersArray.map(function (filter) {
            var columnDef = filter.columnDef;
            var header = (columnDef) ? (columnDef.headerKey || columnDef.name || '') : '';
            var tmpFilter = { columnId: filter.columnId || '' };
            if (filter.operator) {
                tmpFilter.operator = filter.operator;
            }
            if (Array.isArray(filter.searchTerms)) {
                tmpFilter.searchTerms = filter.searchTerms;
            }
            return tmpFilter;
        });
    };
    return GraphqlService;
}());
String.format = function (format, args) {
    return format.replace(/{(\d+)}/g, function (match, number) {
        return (typeof args[number] !== 'undefined') ? args[number] : match;
    });
};
String.padZero = function (length) {
    var s = this;
    while (s.length < length) {
        s = '0' + s;
    }
    return s;
};
String.trim = function (inputStr) {
    return inputStr ? inputStr.replace(/\s+/g, ' ') : inputStr;
};
String.allTitleCase = function (inputStr) {
    return inputStr.replace(/\w\S*/g, function (outputStr) {
        return outputStr.charAt(0).toUpperCase() + outputStr.substr(1).toLowerCase();
    });
};
String.titleCase = function (inputStr) {
    return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
};
var OdataService = /** @class */ (function () {
    function OdataService() {
        this._odataOptions = {
            filterQueue: [],
            orderBy: ''
        };
        this._defaultSortBy = '';
        this._columnFilters = {};
    }
    OdataService.prototype.buildQuery = function () {
        this._odataOptions.filterQueue = [];
        var queryTmpArray = [];
        if (this._odataOptions.top) {
            queryTmpArray.push("$top=" + this._odataOptions.top);
        }
        if (this._odataOptions.skip) {
            queryTmpArray.push("$skip=" + this._odataOptions.skip);
        }
        if (this._odataOptions.orderBy) {
            var argument = '';
            if (Array.isArray(this._odataOptions.orderBy)) {
                argument = this._odataOptions.orderBy.join(',');
            }
            else {
                argument = this._odataOptions.orderBy;
            }
            queryTmpArray.push("$orderby=" + argument);
        }
        if (this._odataOptions.filterBy || this._odataOptions.filter) {
            if (this._odataOptions.filter) {
                this._odataOptions.filterQueue = [];
                var filterStr = this._odataOptions.filter;
                if (Array.isArray(this._odataOptions.filter)) {
                    filterStr = this._odataOptions.filter.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
                }
                this._odataOptions.filterQueue.push("(" + filterStr + ")");
            }
            if (!!this._odataOptions.filterBy && !!this._odataOptions.filterBy.fieldName && !this._columnFilters[this._odataOptions.filterBy.fieldName.toLowerCase()]) {
                if (this._odataOptions.filterBy.searchTerm !== '') {
                    this.saveColumnFilter(this._odataOptions.filterBy.fieldName.toLowerCase(), this._odataOptions.filterBy.searchTerm, this._odataOptions.filterBy.searchTerms);
                    this.updateFilterFromListTerms(this._odataOptions.filterBy);
                }
            }
        }
        if (this._odataOptions.filterQueue.length > 0) {
            var query = this._odataOptions.filterQueue.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
            this._odataOptions.filter = query;
            queryTmpArray.push("$filter=" + query);
        }
        return queryTmpArray.join('&');
    };
    OdataService.prototype.getFilterByColumn = function (columnName) {
        return (!!this._columnFilters[columnName]) ? this._columnFilters[columnName] : null;
    };
    OdataService.prototype.getFilterCount = function () {
        return (this._odataOptions.filterQueue) ? this._odataOptions.filterQueue.length : 0;
    };
    Object.defineProperty(OdataService.prototype, "columnFilters", {
        get: function () {
            return this._columnFilters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OdataService.prototype, "options", {
        get: function () {
            return this._odataOptions;
        },
        set: function (options) {
            this._odataOptions = options;
        },
        enumerable: true,
        configurable: true
    });
    OdataService.prototype.removeColumnFilter = function (fieldName) {
        delete this._columnFilters[fieldName];
    };
    OdataService.prototype.saveColumnFilter = function (fieldName, value, searchTerms) {
        this._columnFilters[fieldName] = {
            search: searchTerms,
            value: value
        };
    };
    OdataService.prototype.updateFilterFromListTerms = function (filterOptions) {
        var _this = this;
        if (Array.isArray(filterOptions)) {
            filterOptions.forEach(function (filterOptionObject) {
                _this.updateFilterFromTerm(filterOptionObject);
            });
        }
        else {
            this.updateFilterFromTerm(filterOptions);
        }
    };
    OdataService.prototype.updateFilterFromTerm = function (filterOptions) {
        var searchBy = '';
        var tmpSearchByArray = [];
        var fieldName = filterOptions.fieldName;
        var fieldSearchTerms = filterOptions.searchTerms;
        var operator = filterOptions.operator;
        if (!!fieldSearchTerms && fieldSearchTerms.length > 0) {
            var tmpSearchTerms = [];
            if (operator === 'IN') {
                for (var j = 0, lnj = fieldSearchTerms.length; j < lnj; j++) {
                    tmpSearchTerms.push(fieldName + " eq '" + fieldSearchTerms[j] + "'");
                }
                searchBy = tmpSearchTerms.join(' or ');
                searchBy = "$(" + searchBy + ")";
            }
            else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                for (var k = 0, lnk = fieldSearchTerms.length; k < lnk; k++) {
                    tmpSearchTerms.push(fieldName + " ne '" + fieldSearchTerms[k] + "'");
                }
                searchBy = tmpSearchTerms.join(' and ');
                searchBy = "$(" + searchBy + ")";
            }
        }
        tmpSearchByArray.push(String.trim(searchBy));
        var filter = (tmpSearchByArray.length > 0) ? tmpSearchByArray.join(' and ') : '';
        if (this._odataOptions.filterQueue && this._odataOptions.filterQueue.indexOf(filter) === -1) {
            this._odataOptions.filterQueue.push(filter);
        }
    };
    OdataService.prototype.updateOptions = function (options) {
        try {
            for (var _a = __values(Object.keys(options)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var property = _b.value;
                if (options.hasOwnProperty(property)) {
                    this._odataOptions[property] = options[property];
                }
                if (property === 'orderBy' || property === 'sortBy') {
                    var sortBy = options[property];
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
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_9) throw e_9.error; }
        }
        var e_9, _c;
    };
    return OdataService;
}());
var timer$1;
var DEFAULT_FILTER_TYPING_DEBOUNCE$1 = 750;
var DEFAULT_ITEMS_PER_PAGE$1 = 25;
var DEFAULT_PAGE_SIZE$1 = 20;
var GridOdataService = /** @class */ (function () {
    function GridOdataService() {
        this.defaultOptions = {
            top: DEFAULT_ITEMS_PER_PAGE$1,
            orderBy: '',
            caseType: CaseType.pascalCase
        };
        this.odataService = new OdataService();
    }
    Object.defineProperty(GridOdataService.prototype, "_gridOptions", {
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    GridOdataService.prototype.buildQuery = function () {
        return this.odataService.buildQuery();
    };
    GridOdataService.prototype.init = function (options, pagination, grid) {
        this._grid = grid;
        var mergedOptions = Object.assign({}, this.defaultOptions, options);
        if (pagination && pagination.pageSize) {
            mergedOptions.top = pagination.pageSize;
        }
        this.odataService.options = Object.assign({}, mergedOptions, { top: mergedOptions.top || this.defaultOptions.top });
        this.options = this.odataService.options;
        this.pagination = pagination;
        this._currentPagination = {
            pageNumber: 1,
            pageSize: this.odataService.options.top || this.defaultOptions.top
        };
        if (grid && grid.getColumns && grid.getOptions) {
            this._columnDefinitions = grid.getColumns() || options["columnDefinitions"];
            this._columnDefinitions = this._columnDefinitions.filter(function (column) { return !column.excludeFromQuery; });
        }
    };
    GridOdataService.prototype.updateOptions = function (serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
    };
    GridOdataService.prototype.removeColumnFilter = function (fieldName) {
        this.odataService.removeColumnFilter(fieldName);
    };
    GridOdataService.prototype.getCurrentFilters = function () {
        return this._currentFilters;
    };
    GridOdataService.prototype.getCurrentPagination = function () {
        return this._currentPagination;
    };
    GridOdataService.prototype.getCurrentSorters = function () {
        return this._currentSorters;
    };
    GridOdataService.prototype.resetPaginationOptions = function () {
        this.odataService.updateOptions({
            skip: 0
        });
    };
    GridOdataService.prototype.saveColumnFilter = function (fieldName, value, terms) {
        this.odataService.saveColumnFilter(fieldName, value, terms);
    };
    GridOdataService.prototype.processOnFilterChanged = function (event, args) {
        var _this = this;
        var serviceOptions = args.grid.getOptions();
        var backendApi = serviceOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
        }
        var debounceTypingDelay = 0;
        if (event && (event.type === 'keyup' || event.type === 'keydown')) {
            debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE$1;
        }
        this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
        var promise = new Promise(function (resolve, reject) {
            clearTimeout(timer$1);
            timer$1 = setTimeout(function () {
                _this.updateFilters(args.columnFilters);
                _this.resetPaginationOptions();
                resolve(_this.odataService.buildQuery());
            }, debounceTypingDelay);
        });
        return promise;
    };
    GridOdataService.prototype.processOnPaginationChanged = function (event, args) {
        var pageSize = +(args.pageSize || DEFAULT_PAGE_SIZE$1);
        this.updatePagination(args.newPage, pageSize);
        return this.odataService.buildQuery();
    };
    GridOdataService.prototype.processOnSortChanged = function (event, args) {
        var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        this.updateSorters(sortColumns);
        return this.odataService.buildQuery();
    };
    GridOdataService.prototype.updateFilters = function (columnFilters, isUpdatedByPreset) {
        var searchBy = '';
        var searchByArray = [];
        var _loop_2 = function (columnId) {
            if (columnFilters.hasOwnProperty(columnId)) {
                var columnFilter_2 = columnFilters[columnId];
                var columnDef = void 0;
                if (isUpdatedByPreset && Array.isArray(this_2._columnDefinitions)) {
                    columnDef = this_2._columnDefinitions.find(function (column) {
                        return column.id === columnFilter_2.columnId;
                    });
                }
                else {
                    columnDef = columnFilter_2.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                var fieldType = columnDef.type || 'string';
                var searchTerms = (columnFilter_2 ? columnFilter_2.searchTerms : null) || [];
                var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error("ODdata filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                }
                fieldSearchValue = '' + fieldSearchValue;
                var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                var operator = columnFilter_2.operator || ((matches) ? matches[1] : '');
                var searchValue = (!!matches) ? matches[2] : '';
                var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                var bypassOdataQuery = columnFilter_2.bypassBackendQuery || false;
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    this_2.removeColumnFilter(fieldName);
                    return "continue";
                }
                searchValue = searchValue.replace("'", "''");
                searchValue = encodeURIComponent(searchValue);
                if (bypassOdataQuery) {
                    if (fieldName) {
                        this_2.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
                    }
                }
                else {
                    searchBy = '';
                    if (this_2.odataService.options.caseType === CaseType.pascalCase) {
                        fieldName = String.titleCase(fieldName || '');
                    }
                    if (searchTerms && searchTerms.length > 1) {
                        var tmpSearchTerms = [];
                        if (operator === 'IN') {
                            for (var j = 0, lnj = searchTerms.length; j < lnj; j++) {
                                tmpSearchTerms.push(fieldName + " eq '" + searchTerms[j] + "'");
                            }
                            searchBy = tmpSearchTerms.join(' or ');
                            searchBy = "(" + searchBy + ")";
                        }
                        else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                            for (var k = 0, lnk = searchTerms.length; k < lnk; k++) {
                                tmpSearchTerms.push(fieldName + " ne '" + searchTerms[k] + "'");
                            }
                            searchBy = tmpSearchTerms.join(' and ');
                            searchBy = "(" + searchBy + ")";
                        }
                    }
                    else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar !== '') {
                        searchBy = (operator === '*' || operator === '*z')
                            ? "endswith(" + fieldName + ", '" + searchValue + "')"
                            : "startswith(" + fieldName + ", '" + searchValue + "')";
                    }
                    else if (fieldType === FieldType.date) {
                        var dateFormatted = parseUtcDate(searchValue, true);
                        if (dateFormatted) {
                            searchBy = fieldName + " " + this_2.mapOdataOperator(operator) + " DateTime'" + dateFormatted + "'";
                        }
                    }
                    else if (fieldType === FieldType.string) {
                        if (operator === '') {
                            searchBy = "substringof('" + searchValue + "', " + fieldName + ")";
                        }
                        else {
                            searchBy = fieldName + " " + this_2.mapOdataOperator(operator) + " '" + searchValue + "'";
                        }
                    }
                    else {
                        searchValue = fieldType === FieldType.number ? searchValue : "'" + searchValue + "'";
                        searchBy = fieldName + " " + this_2.mapOdataOperator(operator) + " " + searchValue;
                    }
                    if (searchBy !== '') {
                        searchByArray.push(String.trim(searchBy));
                        this_2.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
                    }
                }
            }
        };
        var this_2 = this;
        for (var columnId in columnFilters) {
            _loop_2(columnId);
        }
        this.odataService.updateOptions({
            filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
            skip: undefined
        });
    };
    GridOdataService.prototype.updatePagination = function (newPage, pageSize) {
        this._currentPagination = {
            pageNumber: newPage,
            pageSize: pageSize
        };
        this.odataService.updateOptions({
            top: pageSize,
            skip: (newPage - 1) * pageSize
        });
    };
    GridOdataService.prototype.updateSorters = function (sortColumns, presetSorters) {
        var sortByArray = [];
        var sorterArray = [];
        if (!sortColumns && presetSorters) {
            sortByArray = presetSorters;
            sortByArray.forEach(function (sorter) { return sorter.direction = (sorter.direction.toLowerCase()); });
            var tmpSorterArray = sortByArray.map(function (sorter) {
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
            if (sortColumns && sortColumns.length === 0) {
                sortByArray = new Array(this.defaultOptions.orderBy);
            }
            else {
                if (sortColumns) {
                    try {
                        for (var sortColumns_2 = __values(sortColumns), sortColumns_2_1 = sortColumns_2.next(); !sortColumns_2_1.done; sortColumns_2_1 = sortColumns_2.next()) {
                            var column = sortColumns_2_1.value;
                            if (column.sortCol) {
                                var fieldName = (column.sortCol.queryField || column.sortCol.queryFieldSorter || column.sortCol.field || column.sortCol.id) + '';
                                var columnFieldName = (column.sortCol.field || column.sortCol.id) + '';
                                if (this.odataService.options.caseType === CaseType.pascalCase) {
                                    fieldName = String.titleCase(fieldName);
                                    columnFieldName = String.titleCase(columnFieldName);
                                }
                                sorterArray.push({
                                    columnId: columnFieldName,
                                    direction: column.sortAsc ? 'asc' : 'desc'
                                });
                            }
                        }
                    }
                    catch (e_10_1) { e_10 = { error: e_10_1 }; }
                    finally {
                        try {
                            if (sortColumns_2_1 && !sortColumns_2_1.done && (_a = sortColumns_2.return)) _a.call(sortColumns_2);
                        }
                        finally { if (e_10) throw e_10.error; }
                    }
                    sortByArray = sorterArray;
                }
            }
        }
        sortByArray = (sortByArray);
        var csvString = sortByArray.map(function (sorter) { return sorter.columnId + " " + sorter.direction.toLowerCase(); }).join(',');
        this.odataService.updateOptions({
            orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvString) : csvString
        });
        this._currentSorters = (sortByArray);
        return this.odataService.buildQuery();
        var e_10, _a;
    };
    GridOdataService.prototype.castFilterToColumnFilter = function (columnFilters) {
        var filtersArray = (((typeof columnFilters === 'object') ? Object.keys(columnFilters).map(function (key) { return columnFilters[key]; }) : columnFilters));
        return filtersArray.map(function (filter) {
            var columnDef = filter.columnDef;
            var header = (columnDef) ? (columnDef.headerKey || columnDef.name || '') : '';
            var tmpFilter = { columnId: filter.columnId || '' };
            if (filter.operator) {
                tmpFilter.operator = filter.operator;
            }
            if (Array.isArray(filter.searchTerms)) {
                tmpFilter.searchTerms = filter.searchTerms;
            }
            return tmpFilter;
        });
    };
    GridOdataService.prototype.mapOdataOperator = function (operator) {
        var map = '';
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
    return GridOdataService;
}());
GridOdataService.decorators = [
    { type: core.Injectable },
];
GridOdataService.ctorParameters = function () { return []; };
var GridEventService = /** @class */ (function () {
    function GridEventService() {
        this._eventHandler = new Slick.EventHandler();
    }
    GridEventService.prototype.attachOnCellChange = function (grid, dataView) {
        this._eventHandler.subscribe(grid.onCellChange, function (e, args) {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            var column = grid.getColumns()[args.cell];
            if (typeof column.onCellChange === 'function') {
                var returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView: dataView,
                    gridDefinition: grid.getOptions(),
                    grid: grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                column.onCellChange(e, returnedArgs);
            }
        });
    };
    GridEventService.prototype.attachOnClick = function (grid, dataView) {
        this._eventHandler.subscribe(grid.onClick, function (e, args) {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            var column = grid.getColumns()[args.cell];
            if (typeof column.onCellClick === 'function') {
                var returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView: dataView,
                    gridDefinition: grid.getOptions(),
                    grid: grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                column.onCellClick(e, returnedArgs);
            }
        });
    };
    GridEventService.prototype.dispose = function () {
        this._eventHandler.unsubscribeAll();
    };
    return GridEventService;
}());
var GridStateService = /** @class */ (function () {
    function GridStateService() {
        this._eventHandler = new Slick.EventHandler();
        this._columns = [];
        this._currentColumns = [];
        this.subscriptions = [];
        this.onGridStateChanged = new Subject.Subject();
    }
    Object.defineProperty(GridStateService.prototype, "_gridOptions", {
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    GridStateService.prototype.init = function (grid, controlAndPluginService, filterService, sortService) {
        this._grid = grid;
        this.controlAndPluginService = controlAndPluginService;
        this.filterService = filterService;
        this.sortService = sortService;
        this.subscribeToAllGridChanges(grid);
    };
    GridStateService.prototype.dispose = function () {
        this._eventHandler.unsubscribeAll();
        this.subscriptions.forEach(function (subscription) {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        });
        this.subscriptions = [];
    };
    GridStateService.prototype.getCurrentGridState = function () {
        var gridState = {
            columns: this.getCurrentColumns(),
            filters: this.getCurrentFilters(),
            sorters: this.getCurrentSorters()
        };
        var currentPagination = this.getCurrentPagination();
        if (currentPagination) {
            gridState.pagination = currentPagination;
        }
        return gridState;
    };
    GridStateService.prototype.getColumns = function () {
        return this._columns || this._grid.getColumns();
    };
    GridStateService.prototype.getAssociatedCurrentColumns = function (gridColumns) {
        var currentColumns = [];
        if (gridColumns && Array.isArray(gridColumns)) {
            gridColumns.forEach(function (column, index) {
                if (column && column.id) {
                    currentColumns.push({
                        columnId: (column.id),
                        cssClass: column.cssClass || '',
                        headerCssClass: column.headerCssClass || '',
                        width: column.width || 0
                    });
                }
            });
        }
        this._currentColumns = currentColumns;
        return currentColumns;
    };
    GridStateService.prototype.getAssociatedGridColumns = function (grid, currentColumns) {
        var columns = [];
        var gridColumns = grid.getColumns();
        if (currentColumns && Array.isArray(currentColumns)) {
            currentColumns.forEach(function (currentColumn, index) {
                var gridColumn = gridColumns.find(function (c) { return c.id === currentColumn.columnId; });
                if (gridColumn && gridColumn.id) {
                    columns.push(Object.assign({}, gridColumn, { cssClass: currentColumn.cssClass, headerCssClass: currentColumn.headerCssClass, width: currentColumn.width }));
                }
            });
        }
        this._columns = columns;
        return columns;
    };
    GridStateService.prototype.getCurrentColumns = function () {
        var currentColumns = [];
        if (this._currentColumns && Array.isArray(this._currentColumns) && this._currentColumns.length > 0) {
            currentColumns = this._currentColumns;
        }
        else {
            currentColumns = this.getAssociatedCurrentColumns(this._grid.getColumns());
        }
        return currentColumns;
    };
    GridStateService.prototype.getCurrentFilters = function () {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                return (backendService.getCurrentFilters());
            }
        }
        else if (this.filterService && this.filterService.getCurrentLocalFilters) {
            return this.filterService.getCurrentLocalFilters();
        }
        return null;
    };
    GridStateService.prototype.getCurrentPagination = function () {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentPagination) {
                return backendService.getCurrentPagination();
            }
        }
        else {
        }
        return null;
    };
    GridStateService.prototype.getCurrentSorters = function () {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                return (backendService.getCurrentSorters());
            }
        }
        else if (this.sortService && this.sortService.getCurrentLocalSorters) {
            return this.sortService.getCurrentLocalSorters();
        }
        return null;
    };
    GridStateService.prototype.hookExtensionEventToGridStateChange = function (extensionName, eventName) {
        var _this = this;
        var extension = this.controlAndPluginService && this.controlAndPluginService.getExtensionByName(extensionName);
        if (extension && extension.service && extension.service[eventName] && extension.service[eventName].subscribe) {
            this._eventHandler.subscribe(extension.service[eventName], function (e, args) {
                var columns = args && args.columns;
                var currentColumns = _this.getAssociatedCurrentColumns(columns);
                _this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: _this.getCurrentGridState() });
            });
        }
    };
    GridStateService.prototype.hookSlickGridEventToGridStateChange = function (eventName, grid) {
        var _this = this;
        if (grid && grid[eventName] && grid[eventName].subscribe) {
            this._eventHandler.subscribe(grid[eventName], function (e, args) {
                var columns = grid.getColumns();
                var currentColumns = _this.getAssociatedCurrentColumns(columns);
                _this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: _this.getCurrentGridState() });
            });
        }
    };
    GridStateService.prototype.resetColumns = function (columnDefinitions) {
        var columns = columnDefinitions || this._columns;
        var currentColumns = this.getAssociatedCurrentColumns(columns);
        this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
    };
    GridStateService.prototype.subscribeToAllGridChanges = function (grid) {
        var _this = this;
        this.subscriptions.push(this.filterService.onFilterChanged.subscribe(function (currentFilters) {
            _this.onGridStateChanged.next({ change: { newValues: currentFilters, type: GridStateType.filter }, gridState: _this.getCurrentGridState() });
        }));
        this.subscriptions.push(this.filterService.onFilterCleared.subscribe(function () {
            _this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.filter }, gridState: _this.getCurrentGridState() });
        }));
        this.subscriptions.push(this.sortService.onSortChanged.subscribe(function (currentSorters) {
            _this.onGridStateChanged.next({ change: { newValues: currentSorters, type: GridStateType.sorter }, gridState: _this.getCurrentGridState() });
        }));
        this.subscriptions.push(this.sortService.onSortCleared.subscribe(function () {
            _this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.sorter }, gridState: _this.getCurrentGridState() });
        }));
        this.hookExtensionEventToGridStateChange('ColumnPicker', 'onColumnsChanged');
        this.hookExtensionEventToGridStateChange('GridMenu', 'onColumnsChanged');
        this.hookSlickGridEventToGridStateChange('onColumnsReordered', grid);
        this.hookSlickGridEventToGridStateChange('onColumnsResized', grid);
    };
    return GridStateService;
}());
var GridService = /** @class */ (function () {
    function GridService(controlAndPluginService, filterService, gridStateService, sortService, translate) {
        this.controlAndPluginService = controlAndPluginService;
        this.filterService = filterService;
        this.gridStateService = gridStateService;
        this.sortService = sortService;
        this.translate = translate;
    }
    Object.defineProperty(GridService.prototype, "_columnDefinitions", {
        get: function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridService.prototype, "_gridOptions", {
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    GridService.prototype.init = function (grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    };
    GridService.prototype.getColumnFromEventArguments = function (args) {
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
    };
    GridService.prototype.getDataItemByRowNumber = function (rowNumber) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(rowNumber);
    };
    GridService.prototype.getItemRowMetadata = function (previousItemMetadata) {
        var _this = this;
        return function (rowNumber) {
            var item = _this._dataView.getItem(rowNumber);
            var meta = {
                cssClasses: ''
            };
            if (typeof previousItemMetadata === 'object' && !$.isEmptyObject(previousItemMetadata)) {
                meta = previousItemMetadata(rowNumber);
            }
            if (item && item._dirty) {
                meta.cssClasses = (meta.cssClasses || '') + ' dirty';
            }
            if (item && item.rowClass) {
                meta.cssClasses += " " + item.rowClass;
                meta.cssClasses += " row" + rowNumber;
            }
            return meta;
        };
    };
    GridService.prototype.highlightRow = function (rowNumber, fadeDelay) {
        var _this = this;
        if (fadeDelay === void 0) { fadeDelay = 1500; }
        if (!this._grid.getSelectionModel()) {
            var rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(rowSelectionPlugin);
        }
        this._grid.setSelectedRows([rowNumber]);
        this._dataView.getItemMetadata = this.getItemRowMetadata(this._dataView.getItemMetadata);
        var item = this._dataView.getItem(rowNumber);
        if (item && item.id) {
            item.rowClass = 'highlight';
            this._dataView.updateItem(item.id, item);
            var gridOptions = (this._grid.getOptions());
            $("#" + gridOptions.gridId)
                .find(".highlight.row" + rowNumber)
                .first();
            setTimeout(function () {
                if (item && item.id) {
                    delete item.rowClass;
                    var gridIdx = _this._dataView.getIdxById(item.id);
                    if (gridIdx !== undefined) {
                        _this._dataView.updateItem(item.id, item);
                    }
                }
            }, fadeDelay + 10);
        }
    };
    GridService.prototype.getSelectedRows = function () {
        return this._grid.getSelectedRows();
    };
    GridService.prototype.setSelectedRow = function (rowIndex) {
        this._grid.setSelectedRows([rowIndex]);
    };
    GridService.prototype.setSelectedRows = function (rowIndexes) {
        this._grid.setSelectedRows(rowIndexes);
    };
    GridService.prototype.renderGrid = function () {
        if (this._grid && typeof this._grid.invalidate === 'function') {
            this._grid.invalidate();
            this._grid.render();
        }
    };
    GridService.prototype.resetGrid = function (columnDefinitions) {
        if (this._grid && this._dataView) {
            var originalColumns = this.controlAndPluginService.getAllColumns();
            if (Array.isArray(originalColumns) && originalColumns.length > 0) {
                this._grid.setColumns(originalColumns);
                this._dataView.refresh();
                this._grid.autosizeColumns();
                this.gridStateService.resetColumns(columnDefinitions);
            }
        }
        if (this.filterService && this.filterService.clearFilters) {
            this.filterService.clearFilters();
        }
        if (this.sortService && this.sortService.clearSorting) {
            this.sortService.clearSorting();
        }
    };
    GridService.prototype.addItemToDatagrid = function (item, shouldHighlightRow) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (!this._grid || !this._gridOptions || !this._dataView) {
            throw new Error('We could not find SlickGrid Grid, DataView objects');
        }
        if (!this._gridOptions || (!this._gridOptions.enableCheckboxSelector && !this._gridOptions.enableRowSelection)) {
            throw new Error('addItemToDatagrid() requires to have a valid Slickgrid Selection Model. You can overcome this issue by enabling enableCheckboxSelector or enableRowSelection to True');
        }
        var row = 0;
        this._dataView.insertItem(row, item);
        this._grid.scrollRowIntoView(0);
        if (shouldHighlightRow) {
            this.highlightRow(0, 1500);
        }
        this._dataView.refresh();
    };
    GridService.prototype.deleteDataGridItem = function (item) {
        if (!item || !item.hasOwnProperty('id')) {
            throw new Error("deleteDataGridItem() requires an item object which includes the \"id\" property");
        }
        var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        this.deleteDataGridItemById(itemId);
    };
    GridService.prototype.deleteDataGridItemById = function (itemId) {
        if (itemId === undefined) {
            throw new Error("Cannot delete a row without a valid \"id\"");
        }
        if (this._dataView.getRowById(itemId) === undefined) {
            throw new Error("Could not find the item in the grid by it's associated \"id\"");
        }
        this._dataView.deleteItem(itemId);
        this._dataView.refresh();
    };
    GridService.prototype.updateDataGridItem = function (item) {
        var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        if (itemId === undefined) {
            throw new Error("Could not find the item in the grid or it's associated \"id\"");
        }
        this.updateDataGridItemById(itemId, item);
    };
    GridService.prototype.updateDataGridItemById = function (itemId, item, shouldHighlightRow) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (itemId === undefined) {
            throw new Error("Cannot update a row without a valid \"id\"");
        }
        var row = this._dataView.getRowById(itemId);
        if (!item || row === undefined) {
            throw new Error("Could not find the item in the grid or it's associated \"id\"");
        }
        var gridIdx = this._dataView.getIdxById(itemId);
        if (gridIdx !== undefined) {
            this._dataView.updateItem(itemId, item);
            if (shouldHighlightRow) {
                this.highlightRow(row, 1500);
            }
            this._dataView.refresh();
        }
    };
    return GridService;
}());
GridService.decorators = [
    { type: core.Injectable },
];
GridService.ctorParameters = function () { return [
    { type: ControlAndPluginService, },
    { type: FilterService, },
    { type: GridStateService, },
    { type: SortService, },
    { type: core$1.TranslateService, },
]; };
var GroupingAndColspanService = /** @class */ (function () {
    function GroupingAndColspanService() {
        this._eventHandler = new Slick.EventHandler();
    }
    Object.defineProperty(GroupingAndColspanService.prototype, "_gridOptions", {
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupingAndColspanService.prototype, "_columnDefinitions", {
        get: function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    GroupingAndColspanService.prototype.init = function (grid, dataView) {
        var _this = this;
        this._grid = grid;
        this._dataView = dataView;
        if (grid && this._gridOptions) {
            if (this._gridOptions.createPreHeaderPanel) {
                this._eventHandler.subscribe(grid.onSort, function (e, args) {
                    _this.createPreHeaderRowGroupingTitle();
                });
                this._eventHandler.subscribe(grid.onColumnsResized, function (e, args) {
                    _this.createPreHeaderRowGroupingTitle();
                });
                this._eventHandler.subscribe(dataView.onRowCountChanged, function (e, args) {
                    _this.createPreHeaderRowGroupingTitle();
                });
                setTimeout(function () {
                    _this.createPreHeaderRowGroupingTitle();
                }, 50);
            }
        }
    };
    GroupingAndColspanService.prototype.dispose = function () {
        this._eventHandler.unsubscribeAll();
    };
    GroupingAndColspanService.prototype.createPreHeaderRowGroupingTitle = function () {
        var $preHeaderPanel = $(this._grid.getPreHeaderPanel())
            .empty()
            .addClass('slick-header-columns')
            .css('left', '-1000px')
            .width(this._grid.getHeadersWidth());
        $preHeaderPanel.parent().addClass('slick-header');
        var headerColumnWidthDiff = this._grid.getHeaderColumnWidthDiff();
        var m;
        var header;
        var lastColumnGroup = '';
        var widthTotal = 0;
        for (var i = 0; i < this._columnDefinitions.length; i++) {
            m = this._columnDefinitions[i];
            if (lastColumnGroup === m.columnGroup && i > 0) {
                widthTotal += m.width;
                header.width(widthTotal - headerColumnWidthDiff);
            }
            else {
                widthTotal = m.width;
                header = $("<div class=\"ui-state-default slick-header-column\" />")
                    .html("<span class=\"slick-column-name\">" + (m.columnGroup || '') + "</span>")
                    .width(m.width - headerColumnWidthDiff)
                    .appendTo($preHeaderPanel);
            }
            lastColumnGroup = m.columnGroup;
        }
    };
    return GroupingAndColspanService;
}());
var DATAGRID_MIN_HEIGHT = 180;
var DATAGRID_MIN_WIDTH = 300;
var DATAGRID_BOTTOM_PADDING = 20;
var DATAGRID_PAGINATION_HEIGHT = 35;
var timer$2;
var ResizerService = /** @class */ (function () {
    function ResizerService() {
        this.onGridBeforeResize = new Subject.Subject();
    }
    Object.defineProperty(ResizerService.prototype, "_gridOptions", {
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizerService.prototype, "_gridUid", {
        get: function () {
            return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions.gridId;
        },
        enumerable: true,
        configurable: true
    });
    ResizerService.prototype.init = function (grid) {
        this._grid = grid;
    };
    ResizerService.prototype.attachAutoResizeDataGrid = function (newSizes) {
        var _this = this;
        var gridDomElm = $("#" + (this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'));
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        this.resizeGrid(0, newSizes);
        $(window).on("resize.grid." + this._gridUid, function () {
            _this.onGridBeforeResize.next(true);
            _this.resizeGrid(0, newSizes);
            _this.resizeGrid(0, newSizes);
        });
    };
    ResizerService.prototype.calculateGridNewDimensions = function (gridOptions) {
        var gridDomElm = $("#" + gridOptions.gridId);
        var containerElm = (gridOptions.autoResize && gridOptions.autoResize.containerId) ? $("#" + gridOptions.autoResize.containerId) : $("#" + gridOptions.gridContainerId);
        var windowElm = $(window);
        if (windowElm === undefined || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        var bottomPadding = (gridOptions.autoResize && gridOptions.autoResize.bottomPadding) ? gridOptions.autoResize.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        var gridHeight = windowElm.height() || 0;
        var coordOffsetTop = gridDomElm.offset();
        var gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        var availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        var availableWidth = containerElm.width() || 0;
        var minHeight = (gridOptions.autoResize && gridOptions.autoResize.minHeight < 0) ? gridOptions.autoResize.minHeight : DATAGRID_MIN_HEIGHT;
        var minWidth = (gridOptions.autoResize && gridOptions.autoResize.minWidth < 0) ? gridOptions.autoResize.minWidth : DATAGRID_MIN_WIDTH;
        var newHeight = availableHeight;
        var newWidth = (gridOptions.autoResize && gridOptions.autoResize.sidePadding) ? availableWidth - gridOptions.autoResize.sidePadding : availableWidth;
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
    ResizerService.prototype.dispose = function () {
        $(window).off("resize.grid." + this._gridUid);
    };
    ResizerService.prototype.getLastResizeDimensions = function () {
        return this._lastDimensions;
    };
    ResizerService.prototype.resizeGrid = function (delay, newSizes) {
        var _this = this;
        if (!this._grid || !this._gridOptions) {
            throw new Error("\n      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.\n      You can fix this by setting your gridOption to use \"enableAutoResize\" or create an instance of the ResizerService by calling attachAutoResizeDataGrid()");
        }
        delay = delay || 0;
        clearTimeout(timer$2);
        timer$2 = setTimeout(function () {
            var availableDimensions = _this.calculateGridNewDimensions(_this._gridOptions);
            var gridElm = $("#" + _this._gridOptions.gridId) || {};
            var gridContainerElm = $("#" + _this._gridOptions.gridContainerId) || {};
            if ((newSizes || availableDimensions) && gridElm.length > 0) {
                var newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
                var newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;
                gridElm.height(newHeight);
                gridElm.width(newWidth);
                gridContainerElm.height(newHeight);
                gridContainerElm.width(newWidth);
                _this._lastDimensions = {
                    height: newHeight,
                    width: newWidth
                };
                if ((_this._gridOptions.enablePagination || _this._gridOptions.backendServiceApi)) {
                    _this._lastDimensions.heightWithPagination = newHeight + DATAGRID_PAGINATION_HEIGHT;
                }
                if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && _this._grid) {
                    _this._grid.resizeCanvas();
                }
                _this._grid.autosizeColumns();
            }
        }, delay);
    };
    return ResizerService;
}());
var AvgAggregator = /** @class */ (function () {
    function AvgAggregator(field) {
        this._field = field;
    }
    AvgAggregator.prototype.init = function () {
        this._count = 0;
        this._nonNullCount = 0;
        this._sum = 0;
    };
    AvgAggregator.prototype.accumulate = function (item) {
        var val = item[this._field];
        this._count++;
        if (val != null && val !== '' && !isNaN(val)) {
            this._nonNullCount++;
            this._sum += parseFloat(val);
        }
    };
    AvgAggregator.prototype.storeResult = function (groupTotals) {
        if (!groupTotals.avg) {
            groupTotals.avg = {};
        }
        if (this._nonNullCount !== 0) {
            groupTotals.avg[this._field] = this._sum / this._nonNullCount;
        }
    };
    return AvgAggregator;
}());
var MinAggregator = /** @class */ (function () {
    function MinAggregator(field) {
        this._field = field;
    }
    MinAggregator.prototype.init = function () {
        this._min = null;
    };
    MinAggregator.prototype.accumulate = function (item) {
        var val = item[this._field];
        if (val != null && val !== '' && !isNaN(val)) {
            if (this._min == null || val < this._min) {
                this._min = val;
            }
        }
    };
    MinAggregator.prototype.storeResult = function (groupTotals) {
        if (!groupTotals.min) {
            groupTotals.min = {};
        }
        groupTotals.min[this._field] = this._min;
    };
    return MinAggregator;
}());
var MaxAggregator = /** @class */ (function () {
    function MaxAggregator(field) {
        this._field = field;
    }
    MaxAggregator.prototype.init = function () {
        this._max = null;
    };
    MaxAggregator.prototype.accumulate = function (item) {
        var val = item[this._field];
        if (val != null && val !== '' && !isNaN(val)) {
            if (this._max == null || val > this._max) {
                this._max = val;
            }
        }
    };
    MaxAggregator.prototype.storeResult = function (groupTotals) {
        if (!groupTotals.max) {
            groupTotals.max = {};
        }
        groupTotals.max[this._field] = this._max;
    };
    return MaxAggregator;
}());
var SumAggregator = /** @class */ (function () {
    function SumAggregator(field) {
        this._field = field;
    }
    SumAggregator.prototype.init = function () {
        this._sum = null;
    };
    SumAggregator.prototype.accumulate = function (item) {
        var val = item[this._field];
        if (val != null && val !== '' && !isNaN(val)) {
            this._sum += parseFloat(val);
        }
    };
    SumAggregator.prototype.storeResult = function (groupTotals) {
        if (!groupTotals.sum) {
            groupTotals.sum = {};
        }
        groupTotals.sum[this._field] = this._sum;
    };
    return SumAggregator;
}());
var Aggregators = {
    Avg: AvgAggregator,
    Min: MinAggregator,
    Max: MaxAggregator,
    Sum: SumAggregator
};
var CheckboxEditor = /** @class */ (function () {
    function CheckboxEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(CheckboxEditor.prototype, "columnDef", {
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxEditor.prototype, "columnEditor", {
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxEditor.prototype, "validator", {
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxEditor.prototype.init = function () {
        this.$input = $("<input type=\"checkbox\" value=\"true\" class=\"editor-checkbox\" />");
        this.$input.appendTo(this.args.container);
        this.$input.focus();
    };
    CheckboxEditor.prototype.destroy = function () {
        this.$input.remove();
    };
    CheckboxEditor.prototype.focus = function () {
        this.$input.focus();
    };
    CheckboxEditor.prototype.hide = function () {
        this.$input.hide();
    };
    CheckboxEditor.prototype.show = function () {
        this.$input.show();
    };
    CheckboxEditor.prototype.loadValue = function (item) {
        this.defaultValue = !!item[this.columnDef.field];
        if (this.defaultValue) {
            this.$input.prop('checked', true);
        }
        else {
            this.$input.prop('checked', false);
        }
    };
    CheckboxEditor.prototype.preClick = function () {
        this.$input.prop('checked', !this.$input.prop('checked'));
    };
    CheckboxEditor.prototype.serializeValue = function () {
        return this.$input.prop('checked');
    };
    CheckboxEditor.prototype.applyValue = function (item, state) {
        item[this.columnDef.field] = state;
    };
    CheckboxEditor.prototype.isValueChanged = function () {
        return (this.serializeValue() !== this.defaultValue);
    };
    CheckboxEditor.prototype.validate = function () {
        if (this.validator) {
            var validationResults = this.validator(this.$input.val());
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    };
    return CheckboxEditor;
}());
var moment$8 = moment_;
require('flatpickr');
var DateEditor = /** @class */ (function () {
    function DateEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(DateEditor.prototype, "columnDef", {
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateEditor.prototype, "columnEditor", {
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateEditor.prototype, "validator", {
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    DateEditor.prototype.init = function () {
        var _this = this;
        if (this.args && this.args.column) {
            var gridOptions = (this.args.grid.getOptions());
            this.defaultDate = (this.args.item) ? this.args.item[this.args.column.field] : null;
            var inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
            var outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || FieldType.dateUtc);
            var currentLocale = this.getCurrentLocale(this.columnDef, gridOptions);
            if (currentLocale.length > 2) {
                currentLocale = currentLocale.substring(0, 2);
            }
            var pickerOptions = {
                defaultDate: this.defaultDate,
                altInput: true,
                altFormat: inputFormat,
                dateFormat: outputFormat,
                closeOnSelect: false,
                locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
                onChange: function (selectedDates, dateStr, instance) {
                    _this.save();
                },
            };
            this.$input = $("<input type=\"text\" data-defaultDate=\"" + this.defaultDate + "\" class=\"editor-text flatpickr\" />");
            this.$input.appendTo(this.args.container);
            this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerOptions) : null;
            this.show();
        }
    };
    DateEditor.prototype.getCurrentLocale = function (columnDef, gridOptions) {
        var options = gridOptions || columnDef.params || {};
        if (options.i18n && options.i18n instanceof core$1.TranslateService) {
            return options.i18n.currentLang;
        }
        return 'en';
    };
    DateEditor.prototype.loadFlatpickrLocale = function (locale) {
        if (locale !== 'en') {
            var localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    };
    DateEditor.prototype.destroy = function () {
        this.hide();
        this.$input.remove();
    };
    DateEditor.prototype.show = function () {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    };
    DateEditor.prototype.hide = function () {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    };
    DateEditor.prototype.focus = function () {
        this.$input.focus();
    };
    DateEditor.prototype.save = function () {
        this.args.commitChanges();
    };
    DateEditor.prototype.getColumnEditor = function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    DateEditor.prototype.loadValue = function (item) {
        this.defaultDate = item[this.args.column.field];
        this.flatInstance.setDate(item[this.args.column.field]);
    };
    DateEditor.prototype.serializeValue = function () {
        var domValue = this.$input.val();
        if (!domValue) {
            return '';
        }
        var outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        var value = moment$8(domValue).format(outputFormat);
        return value;
    };
    DateEditor.prototype.applyValue = function (item, state) {
        if (!state) {
            return;
        }
        var outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        item[this.args.column.field] = moment$8(state, outputFormat).toDate();
    };
    DateEditor.prototype.isValueChanged = function () {
        return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
    };
    DateEditor.prototype.validate = function () {
        if (this.validator) {
            var validationResults = this.validator(this.$input.val());
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    };
    return DateEditor;
}());
var defaultDecimalPlaces = 0;
var FloatEditor = /** @class */ (function () {
    function FloatEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(FloatEditor.prototype, "columnDef", {
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FloatEditor.prototype, "columnEditor", {
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FloatEditor.prototype, "validator", {
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    FloatEditor.prototype.init = function () {
        var _this = this;
        this.$input = $("<input type=\"number\" class=\"editor-text\" step=\"" + this.getInputDecimalSteps() + "\" />")
            .appendTo(this.args.container)
            .on('keydown.nav', function (e) {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        });
        setTimeout(function () {
            _this.$input.focus().select();
        }, 50);
    };
    FloatEditor.prototype.destroy = function () {
        this.$input.remove();
    };
    FloatEditor.prototype.focus = function () {
        this.$input.focus();
    };
    FloatEditor.prototype.getColumnEditor = function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    FloatEditor.prototype.getDecimalPlaces = function () {
        var rtn = (this.columnEditor.params && this.columnEditor.params.hasOwnProperty('decimalPlaces')) ? this.columnEditor.params.decimalPlaces : undefined;
        if (rtn === undefined) {
            rtn = defaultDecimalPlaces;
        }
        return (!rtn && rtn !== 0 ? null : rtn);
    };
    FloatEditor.prototype.getInputDecimalSteps = function () {
        var decimals = this.getDecimalPlaces();
        var zeroString = '';
        for (var i = 1; i < decimals; i++) {
            zeroString += '0';
        }
        if (decimals > 0) {
            return "0." + zeroString + "1";
        }
        return '1';
    };
    FloatEditor.prototype.loadValue = function (item) {
        this.defaultValue = item[this.columnDef.field];
        var decPlaces = this.getDecimalPlaces();
        if (decPlaces !== null
            && (this.defaultValue || this.defaultValue === 0)
            && this.defaultValue.toFixed) {
            this.defaultValue = this.defaultValue.toFixed(decPlaces);
        }
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$input.select();
    };
    FloatEditor.prototype.serializeValue = function () {
        var rtn = parseFloat(this.$input.val()) || 0;
        var decPlaces = this.getDecimalPlaces();
        if (decPlaces !== null
            && (rtn || rtn === 0)
            && rtn.toFixed) {
            rtn = parseFloat(rtn.toFixed(decPlaces));
        }
        return rtn;
    };
    FloatEditor.prototype.applyValue = function (item, state) {
        item[this.columnDef.field] = state;
    };
    FloatEditor.prototype.isValueChanged = function () {
        var elmValue = this.$input.val();
        return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
    };
    FloatEditor.prototype.validate = function () {
        var elmValue = this.$input.val();
        var decPlaces = this.getDecimalPlaces();
        var minValue = this.columnEditor.minValue;
        var maxValue = this.columnEditor.maxValue;
        var errorMsg = this.columnEditor.errorMessage;
        var mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue,
            '{{minDecimal}}': 0,
            '{{maxDecimal}}': decPlaces
        };
        if (this.validator) {
            var validationResults = this.validator(elmValue);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        else if (isNaN((elmValue)) || (decPlaces === 0 && !/^(\d+(\.)?(\d)*)$/.test(elmValue))) {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_VALID_NUMBER
            };
        }
        else if (minValue !== undefined && (elmValue < minValue || elmValue > maxValue)) {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, function (matched) {
                    return mapValidation[matched];
                })
            };
        }
        else if ((decPlaces > 0 && !new RegExp("^(\\d+(\\.)?(\\d){0," + decPlaces + "})$").test(elmValue))) {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN.replace(/{{minDecimal}}|{{maxDecimal}}/gi, function (matched) {
                    return mapValidation[matched];
                })
            };
        }
        return {
            valid: true,
            msg: null
        };
    };
    return FloatEditor;
}());
var IntegerEditor = /** @class */ (function () {
    function IntegerEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(IntegerEditor.prototype, "columnDef", {
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntegerEditor.prototype, "columnEditor", {
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntegerEditor.prototype, "validator", {
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    IntegerEditor.prototype.init = function () {
        var _this = this;
        this.$input = $("<input type=\"number\" class='editor-text' />")
            .appendTo(this.args.container)
            .on('keydown.nav', function (e) {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        });
        setTimeout(function () {
            _this.$input.focus().select();
        }, 50);
    };
    IntegerEditor.prototype.destroy = function () {
        this.$input.remove();
    };
    IntegerEditor.prototype.focus = function () {
        this.$input.focus();
    };
    IntegerEditor.prototype.getColumnEditor = function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    IntegerEditor.prototype.loadValue = function (item) {
        this.defaultValue = parseInt(item[this.args.column.field], 10);
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$input.select();
    };
    IntegerEditor.prototype.serializeValue = function () {
        return parseInt((this.$input.val()), 10) || 0;
    };
    IntegerEditor.prototype.applyValue = function (item, state) {
        item[this.args.column.field] = state;
    };
    IntegerEditor.prototype.isValueChanged = function () {
        var elmValue = this.$input.val();
        var value = isNaN(elmValue) ? elmValue : parseInt(elmValue, 10);
        return (!(value === '' && this.defaultValue === null)) && (value !== this.defaultValue);
    };
    IntegerEditor.prototype.validate = function () {
        var elmValue = this.$input.val();
        var errorMsg = this.columnEditor.params && this.columnEditor.errorMessage;
        if (this.validator) {
            var validationResults = this.validator(elmValue);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        else if (isNaN((elmValue)) || !/^[+-]?\d+$/.test(elmValue)) {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_VALID_INTEGER
            };
        }
        return {
            valid: true,
            msg: null
        };
    };
    return IntegerEditor;
}());
var LongTextEditor = /** @class */ (function () {
    function LongTextEditor(args) {
        this.args = args;
        this.gridOptions = (this.args.grid.getOptions());
        var options = this.gridOptions || this.args.column.params || {};
        this._translate = options.i18n;
        this.init();
    }
    Object.defineProperty(LongTextEditor.prototype, "columnDef", {
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongTextEditor.prototype, "columnEditor", {
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongTextEditor.prototype, "validator", {
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    LongTextEditor.prototype.init = function () {
        var _this = this;
        var cancelText = this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
        var saveText = this._translate.instant('SAVE') || Constants.TEXT_SAVE;
        var $container = $('body');
        this.$wrapper = $("<div class=\"slick-large-editor-text\" />").appendTo($container);
        this.$input = $("<textarea hidefocus rows=\"5\">").appendTo(this.$wrapper);
        $("<div class=\"editor-footer\">\n          <button class=\"btn btn-primary btn-xs\">" + saveText + "</button>\n          <button class=\"btn btn-default btn-xs\">" + cancelText + "</button>\n      </div>").appendTo(this.$wrapper);
        this.$wrapper.find('button:first').on('click', function (event) { return _this.save(); });
        this.$wrapper.find('button:last').on('click', function (event) { return _this.cancel(); });
        this.$input.on('keydown', this.handleKeyDown);
        this.position(this.args.position);
        this.$input.focus().select();
    };
    LongTextEditor.prototype.handleKeyDown = function (e) {
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
    };
    LongTextEditor.prototype.save = function () {
        this.args.commitChanges();
    };
    LongTextEditor.prototype.cancel = function () {
        this.$input.val(this.defaultValue);
        this.args.cancelChanges();
    };
    LongTextEditor.prototype.hide = function () {
        this.$wrapper.hide();
    };
    LongTextEditor.prototype.show = function () {
        this.$wrapper.show();
    };
    LongTextEditor.prototype.position = function (position) {
        this.$wrapper
            .css('top', (position.top || 0) - 5)
            .css('left', (position.left || 0) - 5);
    };
    LongTextEditor.prototype.destroy = function () {
        this.$wrapper.remove();
    };
    LongTextEditor.prototype.focus = function () {
        this.$input.focus();
    };
    LongTextEditor.prototype.getColumnEditor = function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    LongTextEditor.prototype.loadValue = function (item) {
        this.$input.val(this.defaultValue = item[this.columnDef.field]);
        this.$input.select();
    };
    LongTextEditor.prototype.serializeValue = function () {
        return this.$input.val();
    };
    LongTextEditor.prototype.applyValue = function (item, state) {
        item[this.columnDef.field] = state;
    };
    LongTextEditor.prototype.isValueChanged = function () {
        return (!(this.$input.val() === '' && this.defaultValue == null)) && (this.$input.val() !== this.defaultValue);
    };
    LongTextEditor.prototype.validate = function () {
        if (this.validator) {
            var validationResults = this.validator(this.$input.val());
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    };
    return LongTextEditor;
}());
var SELECT_ELEMENT_HEIGHT = 26;
var MultipleSelectEditor = /** @class */ (function () {
    function MultipleSelectEditor(args) {
        var _this = this;
        this.args = args;
        this.collection = [];
        this.gridOptions = (this.args.grid.getOptions());
        var options = this.gridOptions || this.args.column.params || {};
        this._translate = options.i18n;
        this.defaultOptions = {
            container: 'body',
            filter: false,
            maxHeight: 200,
            addTitle: true,
            okButton: true,
            selectAllDelimiter: ['', ''],
            width: 150,
            offsetLeft: 20,
            onOpen: function () { return _this.autoAdjustDropPosition(_this.$editorElm, _this.editorElmOptions); },
        };
        if (this._translate) {
            this.defaultOptions.countSelected = this._translate.instant('X_OF_Y_SELECTED');
            this.defaultOptions.allSelected = this._translate.instant('ALL_SELECTED');
            this.defaultOptions.selectAllText = this._translate.instant('SELECT_ALL');
        }
        this.init();
    }
    Object.defineProperty(MultipleSelectEditor.prototype, "columnDef", {
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultipleSelectEditor.prototype, "columnEditor", {
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultipleSelectEditor.prototype, "currentValues", {
        get: function () {
            var _this = this;
            return this.collection
                .filter(function (c) { return _this.$editorElm.val().indexOf(c[_this.valueName].toString()) !== -1; })
                .map(function (c) { return c[_this.valueName]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultipleSelectEditor.prototype, "validator", {
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    MultipleSelectEditor.prototype.init = function () {
        if (!this.args) {
            throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
        }
        if (!this.columnDef || !this.columnDef.internalColumnEditor || !this.columnDef.internalColumnEditor.collection) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" inside Column Definition Editor for the MultipleSelect Editor to work correctly.\n      Also each option should include a value/label pair (or value/labelKey when using Locale).\n      For example: { editor: { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } }");
        }
        var collectionService = new CollectionService(this._translate);
        this.enableTranslateLabel = (this.columnDef.internalColumnEditor.enableTranslateLabel) ? this.columnDef.internalColumnEditor.enableTranslateLabel : false;
        var newCollection = this.columnDef.internalColumnEditor.collection || [];
        this.labelName = (this.columnDef.internalColumnEditor.customStructure) ? this.columnDef.internalColumnEditor.customStructure.label : 'label';
        this.valueName = (this.columnDef.internalColumnEditor.customStructure) ? this.columnDef.internalColumnEditor.customStructure.value : 'value';
        if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionSortBy) {
            var filterBy = this.columnDef.internalColumnEditor.collectionFilterBy;
            newCollection = collectionService.filterCollection(newCollection, filterBy);
        }
        if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionSortBy) {
            var sortBy = this.columnDef.internalColumnEditor.collectionSortBy;
            newCollection = collectionService.sortCollection(newCollection, sortBy, this.enableTranslateLabel);
        }
        this.collection = newCollection;
        var editorTemplate = this.buildTemplateHtmlString(newCollection);
        this.createDomElement(editorTemplate);
    };
    MultipleSelectEditor.prototype.applyValue = function (item, state) {
        item[this.columnDef.field] = state;
    };
    MultipleSelectEditor.prototype.destroy = function () {
        this.$editorElm.remove();
    };
    MultipleSelectEditor.prototype.loadValue = function (item) {
        var _this = this;
        this.defaultValue = item[this.columnDef.field].map(function (i) { return i.toString(); });
        this.$editorElm.find('option').each(function (i, $e) {
            if (_this.defaultValue.indexOf($e.value) !== -1) {
                $e.selected = true;
            }
            else {
                $e.selected = false;
            }
        });
        this.refresh();
    };
    MultipleSelectEditor.prototype.serializeValue = function () {
        return this.currentValues;
    };
    MultipleSelectEditor.prototype.focus = function () {
        this.$editorElm.focus();
    };
    MultipleSelectEditor.prototype.isValueChanged = function () {
        return !arraysEqual(this.$editorElm.val(), this.defaultValue);
    };
    MultipleSelectEditor.prototype.validate = function () {
        if (this.validator) {
            var validationResults = this.validator(this.currentValues);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    };
    MultipleSelectEditor.prototype.buildTemplateHtmlString = function (collection) {
        var _this = this;
        var options = '';
        collection.forEach(function (option) {
            if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example: { collection: [ { value: '1', label: 'One' } ])");
            }
            var labelKey = ((option.labelKey || option[_this.labelName]));
            var textLabel = ((option.labelKey || _this.enableTranslateLabel) && _this._translate && typeof _this._translate.instant === 'function') ? _this._translate.instant(labelKey || ' ') : labelKey;
            options += "<option value=\"" + option[_this.valueName] + "\">" + textLabel + "</option>";
        });
        return "<select class=\"ms-filter search-filter\" multiple=\"multiple\">" + options + "</select>";
    };
    MultipleSelectEditor.prototype.autoAdjustDropPosition = function (multipleSelectDomElement, multipleSelectOptions) {
        var selectElmHeight = SELECT_ELEMENT_HEIGHT;
        var windowHeight = $(window).innerHeight() || 300;
        var pageScroll = $('body').scrollTop() || 0;
        var $msDropContainer = multipleSelectOptions.container ? $(multipleSelectOptions.container) : multipleSelectDomElement;
        var $msDrop = $msDropContainer.find('.ms-drop');
        var msDropHeight = $msDrop.height() || 0;
        var msDropOffsetTop = $msDrop.offset().top;
        var space = windowHeight - (msDropOffsetTop - pageScroll);
        if (space < msDropHeight) {
            if (multipleSelectOptions.container) {
                var newOffsetTop = (msDropOffsetTop - msDropHeight - selectElmHeight);
                if (newOffsetTop > 0) {
                    $msDrop.offset({ top: newOffsetTop < 0 ? 0 : newOffsetTop });
                }
            }
            else {
                $msDrop.addClass('top');
            }
            $msDrop.removeClass('bottom');
        }
        else {
            $msDrop.addClass('bottom');
            $msDrop.removeClass('top');
        }
    };
    MultipleSelectEditor.prototype.createDomElement = function (editorTemplate) {
        var _this = this;
        this.$editorElm = $(editorTemplate);
        if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
            this.$editorElm.appendTo(this.args.container);
        }
        if (typeof this.$editorElm.multipleSelect !== 'function') {
            this.$editorElm.addClass('form-control');
        }
        else {
            var elementOptions = (this.columnDef.internalColumnEditor) ? this.columnDef.internalColumnEditor.elementOptions : {};
            this.editorElmOptions = Object.assign({}, this.defaultOptions, elementOptions);
            this.$editorElm = this.$editorElm.multipleSelect(this.editorElmOptions);
            setTimeout(function () { return _this.$editorElm.multipleSelect('open'); });
        }
    };
    MultipleSelectEditor.prototype.refresh = function () {
        if (typeof this.$editorElm.multipleSelect === 'function') {
            this.$editorElm.multipleSelect('refresh');
        }
    };
    return MultipleSelectEditor;
}());
var SELECT_ELEMENT_HEIGHT$1 = 26;
var SingleSelectEditor = /** @class */ (function () {
    function SingleSelectEditor(args) {
        var _this = this;
        this.args = args;
        this.collection = [];
        this.gridOptions = (this.args.grid.getOptions());
        var options = this.gridOptions || this.args.column.params || {};
        this._translate = options.i18n;
        this.defaultOptions = {
            container: 'body',
            filter: false,
            maxHeight: 200,
            width: 150,
            offsetLeft: 20,
            single: true,
            onOpen: function () { return _this.autoAdjustDropPosition(_this.$editorElm, _this.editorElmOptions); },
        };
        this.init();
    }
    Object.defineProperty(SingleSelectEditor.prototype, "columnDef", {
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SingleSelectEditor.prototype, "columnEditor", {
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SingleSelectEditor.prototype, "currentValue", {
        get: function () {
            var _this = this;
            return findOrDefault(this.collection, function (c) { return c[_this.valueName].toString() === _this.$editorElm.val(); })[this.valueName];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SingleSelectEditor.prototype, "validator", {
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    SingleSelectEditor.prototype.init = function () {
        if (!this.args) {
            throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
        }
        if (!this.columnDef || !this.columnDef.internalColumnEditor || !this.columnDef.internalColumnEditor.collection) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" inside Column Definition Editor for the SingleSelect Editor to work correctly.\n      Also each option should include a value/label pair (or value/labelKey when using Locale).\n      For example: { editor: { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } }");
        }
        var collectionService = new CollectionService(this._translate);
        this.enableTranslateLabel = (this.columnDef.internalColumnEditor.enableTranslateLabel) ? this.columnDef.internalColumnEditor.enableTranslateLabel : false;
        var newCollection = this.columnDef.internalColumnEditor.collection || [];
        this.labelName = (this.columnDef.internalColumnEditor.customStructure) ? this.columnDef.internalColumnEditor.customStructure.label : 'label';
        this.valueName = (this.columnDef.internalColumnEditor.customStructure) ? this.columnDef.internalColumnEditor.customStructure.value : 'value';
        if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionFilterBy) {
            var filterBy = this.columnDef.internalColumnEditor.collectionFilterBy;
            newCollection = collectionService.filterCollection(newCollection, filterBy);
        }
        if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionSortBy) {
            var sortBy = this.columnDef.internalColumnEditor.collectionSortBy;
            newCollection = collectionService.sortCollection(newCollection, sortBy, this.enableTranslateLabel);
        }
        this.collection = newCollection;
        var editorTemplate = this.buildTemplateHtmlString(newCollection);
        this.createDomElement(editorTemplate);
    };
    SingleSelectEditor.prototype.applyValue = function (item, state) {
        item[this.columnDef.field] = state;
    };
    SingleSelectEditor.prototype.destroy = function () {
        this.$editorElm.remove();
    };
    SingleSelectEditor.prototype.loadValue = function (item) {
        var _this = this;
        this.defaultValue = item[this.columnDef.field] && item[this.columnDef.field].toString();
        this.$editorElm.find('option').each(function (i, $e) {
            if (_this.defaultValue === $e.value) {
                $e.selected = true;
            }
            else {
                $e.selected = false;
            }
        });
        this.refresh();
    };
    SingleSelectEditor.prototype.serializeValue = function () {
        return this.currentValue;
    };
    SingleSelectEditor.prototype.focus = function () {
        this.$editorElm.focus();
    };
    SingleSelectEditor.prototype.isValueChanged = function () {
        return this.$editorElm.val() !== this.defaultValue;
    };
    SingleSelectEditor.prototype.validate = function () {
        if (this.validator) {
            var validationResults = this.validator(this.currentValue);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    };
    SingleSelectEditor.prototype.buildTemplateHtmlString = function (collection) {
        var _this = this;
        var options = '';
        collection.forEach(function (option) {
            if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                throw new Error('A collection with value/label (or value/labelKey when using ' +
                    'Locale) is required to populate the Select list, for example: { params: { ' +
                    '{ collection: [ { value: \'1\', label: \'One\' } ] } } }');
            }
            var labelKey = ((option.labelKey || option[_this.labelName]));
            var textLabel = ((option.labelKey || _this.enableTranslateLabel) && _this._translate && typeof _this._translate.instant === 'function') ? _this._translate.instant(labelKey || ' ') : labelKey;
            options += "<option value=\"" + option[_this.valueName] + "\">" + textLabel + "</option>";
        });
        return "<select class=\"ms-filter search-filter\">" + options + "</select>";
    };
    SingleSelectEditor.prototype.autoAdjustDropPosition = function (multipleSelectDomElement, multipleSelectOptions) {
        var selectElmHeight = SELECT_ELEMENT_HEIGHT$1;
        var windowHeight = $(window).innerHeight() || 300;
        var pageScroll = $('body').scrollTop() || 0;
        var $msDropContainer = multipleSelectOptions.container ? $(multipleSelectOptions.container) : multipleSelectDomElement;
        var $msDrop = $msDropContainer.find('.ms-drop');
        var msDropHeight = $msDrop.height() || 0;
        var msDropOffsetTop = $msDrop.offset().top;
        var space = windowHeight - (msDropOffsetTop - pageScroll);
        if (space < msDropHeight) {
            if (multipleSelectOptions.container) {
                var newOffsetTop = (msDropOffsetTop - msDropHeight - selectElmHeight);
                if (newOffsetTop > 0) {
                    $msDrop.offset({ top: newOffsetTop < 0 ? 0 : newOffsetTop });
                }
            }
            else {
                $msDrop.addClass('top');
            }
            $msDrop.removeClass('bottom');
        }
        else {
            $msDrop.addClass('bottom');
            $msDrop.removeClass('top');
        }
    };
    SingleSelectEditor.prototype.createDomElement = function (editorTemplate) {
        var _this = this;
        this.$editorElm = $(editorTemplate);
        if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
            this.$editorElm.appendTo(this.args.container);
        }
        if (typeof this.$editorElm.multipleSelect !== 'function') {
            this.$editorElm.addClass('form-control');
        }
        else {
            var elementOptions = (this.columnDef.params) ? this.columnDef.params.elementOptions : {};
            this.editorElmOptions = Object.assign({}, this.defaultOptions, elementOptions);
            this.$editorElm = this.$editorElm.multipleSelect(this.editorElmOptions);
            setTimeout(function () { return _this.$editorElm.multipleSelect('open'); });
        }
    };
    SingleSelectEditor.prototype.refresh = function () {
        if (typeof this.$editorElm.multipleSelect === 'function') {
            this.$editorElm.multipleSelect('refresh');
        }
    };
    return SingleSelectEditor;
}());
SingleSelectEditor.decorators = [
    { type: core.Injectable },
];
SingleSelectEditor.ctorParameters = function () { return [
    null,
]; };
var DEFAULT_MIN_VALUE$2 = 0;
var DEFAULT_MAX_VALUE$2 = 100;
var DEFAULT_STEP$2 = 1;
var SliderEditor = /** @class */ (function () {
    function SliderEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(SliderEditor.prototype, "columnDef", {
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderEditor.prototype, "columnEditor", {
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderEditor.prototype, "editorParams", {
        get: function () {
            return this.columnEditor.params || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderEditor.prototype, "validator", {
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    SliderEditor.prototype.init = function () {
        var _this = this;
        var container = this.args.container;
        var editorTemplate = this.buildTemplateHtmlString();
        this.$editorElm = $(editorTemplate);
        this.$input = this.$editorElm.children('input');
        this.$sliderNumber = this.$editorElm.children('div.input-group-addon.input-group-append').children();
        this.$editorElm
            .appendTo(this.args.container)
            .on('change', function (event) { return _this.save(); });
    };
    SliderEditor.prototype.destroy = function () {
        this.$editorElm.remove();
    };
    SliderEditor.prototype.focus = function () {
        this.$editorElm.focus();
    };
    SliderEditor.prototype.save = function () {
        this.args.commitChanges();
    };
    SliderEditor.prototype.cancel = function () {
        this.$input.val(this.defaultValue);
        this.args.cancelChanges();
    };
    SliderEditor.prototype.loadValue = function (item) {
        this.defaultValue = item[this.columnDef.field];
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$sliderNumber.html(this.defaultValue);
    };
    SliderEditor.prototype.serializeValue = function () {
        return parseInt((this.$input.val()), 10) || 0;
    };
    SliderEditor.prototype.applyValue = function (item, state) {
        item[this.columnDef.field] = state;
    };
    SliderEditor.prototype.isValueChanged = function () {
        var elmValue = this.$input.val();
        console.log(elmValue);
        return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
    };
    SliderEditor.prototype.validate = function () {
        var elmValue = this.$input.val();
        var minValue = this.columnEditor.minValue;
        var maxValue = this.columnEditor.maxValue;
        var errorMsg = this.columnEditor.errorMessage;
        var mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue
        };
        if (this.validator) {
            var validationResults = this.validator(elmValue);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        else if (minValue !== undefined && (elmValue < minValue || elmValue > maxValue)) {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, function (matched) {
                    return mapValidation[matched];
                })
            };
        }
        return {
            valid: true,
            msg: null
        };
    };
    SliderEditor.prototype.buildTemplateHtmlString = function () {
        var minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE$2;
        var maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE$2;
        var defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
        var step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP$2;
        var itemId = this.args && this.args.item && this.args.item.id;
        if (this.editorParams.hideSliderNumber) {
            return "\n      <div class=\"slider-editor\">\n        <input type=\"range\" id=\"rangeInput_" + this.columnDef.field + "_" + itemId + "\"\n          name=\"rangeInput_" + this.columnDef.field + "_" + itemId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-editor-input range\" />\n      </div>";
        }
        return "\n      <div class=\"input-group slider-editor\">\n        <input type=\"range\" id=\"rangeInput_" + this.columnDef.field + "_" + itemId + "\"\n          name=\"rangeInput_" + this.columnDef.field + "_" + itemId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-editor-input range\"\n          onmousemove=\"document.getElementById('rangeOuput_" + this.columnDef.field + "_" + itemId + "').innerHTML = rangeInput_" + this.columnDef.field + "_" + itemId + ".value\" />\n        <div class=\"input-group-addon input-group-prepend slider-value\"><span class=\"input-group-text\" id=\"rangeOuput_" + this.columnDef.field + "_" + itemId + "\">" + defaultValue + "</span></div>\n      </div>";
    };
    return SliderEditor;
}());
var TextEditor = /** @class */ (function () {
    function TextEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(TextEditor.prototype, "columnDef", {
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextEditor.prototype, "columnEditor", {
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextEditor.prototype, "validator", {
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    TextEditor.prototype.init = function () {
        var _this = this;
        this.$input = $("<input type=\"text\" class=\"editor-text\" />")
            .appendTo(this.args.container)
            .on('keydown.nav', function (e) {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        });
        setTimeout(function () {
            _this.$input.focus().select();
        }, 50);
    };
    TextEditor.prototype.destroy = function () {
        this.$input.remove();
    };
    TextEditor.prototype.focus = function () {
        this.$input.focus();
    };
    TextEditor.prototype.getValue = function () {
        return this.$input.val();
    };
    TextEditor.prototype.setValue = function (val) {
        this.$input.val(val);
    };
    TextEditor.prototype.loadValue = function (item) {
        this.defaultValue = item[this.args.column.field] || '';
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$input.select();
    };
    TextEditor.prototype.serializeValue = function () {
        return this.$input.val();
    };
    TextEditor.prototype.applyValue = function (item, state) {
        item[this.args.column.field] = state;
    };
    TextEditor.prototype.isValueChanged = function () {
        return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
    };
    TextEditor.prototype.validate = function () {
        if (this.validator) {
            var validationResults = this.validator(this.$input.val());
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        return {
            valid: true,
            msg: null
        };
    };
    return TextEditor;
}());
var Editors = {
    checkbox: CheckboxEditor,
    date: DateEditor,
    float: FloatEditor,
    integer: IntegerEditor,
    longText: LongTextEditor,
    multipleSelect: MultipleSelectEditor,
    singleSelect: SingleSelectEditor,
    slider: SliderEditor,
    text: TextEditor
};
var arrayToCsvFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value && Array.isArray(value)) {
        var values = value.join(', ');
        return "<span title=\"" + values + "\">" + values + "</span>";
    }
    return '';
};
var boldFormatter = function (row, cell, value, columnDef, dataContext) {
    if (!isNaN(+value)) {
        return '';
    }
    else if (value >= 0) {
        return "<span style=\"font-weight: bold\">" + decimalFormatted(value, 2, 2) + "$</span>";
    }
    else {
        return "<span style=\"font-weight: bold\">" + decimalFormatted(value, 2, 2) + "$</span>";
    }
};
var checkboxFormatter = function (row, cell, value, columnDef, dataContext) { return value ? '&#x2611;' : ''; };
var checkmarkFormatter = function (row, cell, value, columnDef, dataContext) { return value ? "<i class=\"fa fa-check checkmark-icon\" aria-hidden=\"true\"></i>" : ''; };
var collectionFormatter = function (row, cell, value, columnDef, dataContext) {
    if (!value || !columnDef || !columnDef.params || !columnDef.params.collection
        || !columnDef.params.collection.length) {
        return '';
    }
    var params = columnDef.params, collection = columnDef.params.collection;
    var labelName = (params.customStructure) ? params.customStructure.label : 'label';
    var valueName = (params.customStructure) ? params.customStructure.value : 'value';
    if (Array.isArray(value)) {
        return arrayToCsvFormatter(row, cell, value.map(function (v) { return findOrDefault(collection, function (c) { return c[valueName] === v; })[labelName]; }), columnDef, dataContext);
    }
    return findOrDefault(collection, function (c) { return c[valueName] === value; })[labelName] || '';
};
var collectionEditorFormatter = function (row, cell, value, columnDef, dataContext) {
    if (!value || !columnDef || !columnDef.internalColumnEditor || !columnDef.internalColumnEditor.collection
        || !columnDef.internalColumnEditor.collection.length) {
        return '';
    }
    var internalColumnEditor = columnDef.internalColumnEditor, collection = columnDef.internalColumnEditor.collection;
    var labelName = (internalColumnEditor.customStructure) ? internalColumnEditor.customStructure.label : 'label';
    var valueName = (internalColumnEditor.customStructure) ? internalColumnEditor.customStructure.value : 'value';
    if (Array.isArray(value)) {
        return arrayToCsvFormatter(row, cell, value.map(function (v) { return findOrDefault(collection, function (c) { return c[valueName] === v; })[labelName]; }), columnDef, dataContext);
    }
    return findOrDefault(collection, function (c) { return c[valueName] === value; })[labelName] || '';
};
var complexObjectFormatter = function (row, cell, value, columnDef, dataContext) {
    if (!columnDef) {
        return '';
    }
    var complexField = columnDef.field || '';
    return complexField.split('.').reduce(function (obj, i) { return (obj ? obj[i] : ''); }, dataContext);
};
var moment$9 = moment_;
var FORMAT$6 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
var dateIsoFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$9(value).format(FORMAT$6) : ''; };
var moment$10 = moment_;
var FORMAT$7 = mapMomentDateFormatWithFieldType(FieldType.dateTimeIso);
var dateTimeIsoFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$10(value).format(FORMAT$7) : ''; };
var moment$11 = moment_;
var FORMAT$8 = mapMomentDateFormatWithFieldType(FieldType.dateTimeIsoAmPm);
var dateTimeIsoAmPmFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$11(value).format(FORMAT$8) : ''; };
var moment$12 = moment_;
var FORMAT$9 = mapMomentDateFormatWithFieldType(FieldType.dateTimeUsAmPm);
var dateTimeUsAmPmFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$12(value).format(FORMAT$9) : ''; };
var moment$13 = moment_;
var FORMAT$10 = mapMomentDateFormatWithFieldType(FieldType.dateTimeUs);
var dateTimeUsFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$13(value).format(FORMAT$10) : ''; };
var moment$14 = moment_;
var FORMAT$11 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
var dateUsFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$14(value).format(FORMAT$11) : ''; };
var decimalFormatter = function (row, cell, value, columnDef, dataContext) {
    var params = columnDef.params || {};
    var minDecimalPlaces = params.minDecimalPlaces || params.decimalPlaces || 2;
    var maxDecimalPlaces = params.maxDecimalPlaces || 2;
    return isNaN(+value) ? value : "" + decimalFormatted(value, minDecimalPlaces, maxDecimalPlaces);
};
var deleteIconFormatter = function (row, cell, value, columnDef, dataContext) { return "<i class=\"fa fa-trash pointer delete-icon\" aria-hidden=\"true\"></i>"; };
var dollarColoredBoldFormatter = function (row, cell, value, columnDef, dataContext) {
    if (isNaN(+value)) {
        return '';
    }
    else if (value >= 0) {
        return "<span style=\"color:green; font-weight: bold;\">$" + decimalFormatted(value, 2, 2) + "</span>";
    }
    else {
        return "<span style=\"color:red; font-weight: bold;\">$" + decimalFormatted(value, 2, 2) + "</span>";
    }
};
var dollarColoredFormatter = function (row, cell, value, columnDef, dataContext) {
    if (isNaN(+value)) {
        return '';
    }
    else if (value >= 0) {
        return "<span style=\"color:green;\">$" + decimalFormatted(value, 2, 2) + "</span>";
    }
    else {
        return "<span style=\"color:red;\">$" + decimalFormatted(value, 2, 2) + "</span>";
    }
};
var dollarFormatter = function (row, cell, value, columnDef, dataContext) { return isNaN(+value) ? '' : "$" + decimalFormatted(value, 2, 4); };
var editIconFormatter = function (row, cell, value, columnDef, dataContext) { return "<i class=\"fa fa-pencil pointer edit-icon\" aria-hidden=\"true\"></i>"; };
var hyperlinkFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value && typeof value === 'string') {
        var matchUrl = value.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i);
        if (matchUrl && Array.isArray(matchUrl)) {
            return "<a href=\"" + matchUrl[0] + "\">' + value + '</a>";
        }
    }
    return '';
};
var hyperlinkUriPrefixFormatter = function (row, cell, value, columnDef, dataContext) {
    var uriPrefix = (columnDef && columnDef.params && columnDef.params.uriPrefix) ? columnDef.params.uriPrefix : '';
    if (!uriPrefix) {
        throw new Error("HyperlinkUriPrefix Formatter require a \"uriPrefix\" that can be passed through params. e.g.:: formatter: Formatters.hyperlinkUriPrefix, params: { uriPrefix: '/users/' }");
    }
    if (value && uriPrefix && typeof uriPrefix === 'string' && !uriPrefix.includes('<script>')) {
        uriPrefix += value;
        return '<a href="' + uriPrefix + '">' + value + '</a>';
    }
    return '';
};
var infoIconFormatter = function (row, cell, value, columnDef, dataContext) { return "<i class=\"fa fa-info-circle pointer info-icon\" aria-hidden=\"true\"></i>"; };
var lowercaseFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? value.toLowerCase() : '';
};
var maskFormatter = function (row, cell, value, columnDef, dataContext) {
    var params = columnDef.params || {};
    var mask = params.mask;
    if (!mask) {
        throw new Error("You must provide a \"mask\" via the generic \"params\" options (e.g.: { formatter: Formatters.mask, params: { mask: '000-000' }}");
    }
    if (value && mask) {
        var i_1 = 0;
        var v_1 = value.toString();
        return mask.replace(/[09A]/g, function () { return v_1[i_1++] || ''; });
    }
    return '';
};
var multipleFormatter = function (row, cell, value, columnDef, dataContext, grid) {
    var params = columnDef.params || {};
    if (!params.formatters || !Array.isArray(params.formatters)) {
        throw new Error("The multiple formatter requires the \"formatters\" to be provided as a column params.\n    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }");
    }
    var formatters = params.formatters;
    var currentValue = value;
    try {
        for (var formatters_1 = __values(formatters), formatters_1_1 = formatters_1.next(); !formatters_1_1.done; formatters_1_1 = formatters_1.next()) {
            var formatter = formatters_1_1.value;
            currentValue = formatter(row, cell, currentValue, columnDef, dataContext, grid);
        }
    }
    catch (e_11_1) { e_11 = { error: e_11_1 }; }
    finally {
        try {
            if (formatters_1_1 && !formatters_1_1.done && (_a = formatters_1.return)) _a.call(formatters_1);
        }
        finally { if (e_11) throw e_11.error; }
    }
    return currentValue;
    var e_11, _a;
};
var percentFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value === null || value === '') {
        return '';
    }
    var outputValue = value > 0 ? value / 100 : 0;
    return "<span>" + outputValue + "%</span>";
};
var percentCompleteBarFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value === null || value === '') {
        return '';
    }
    var color;
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
var percentSymbolFormatter = function (row, cell, value, columnDef, dataContext) {
    return value ? "<span>" + value + "%</span>" : '';
};
var progressBarFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value === null || value === '') {
        return '';
    }
    var color;
    if (value < 30) {
        color = 'danger';
    }
    else if (value < 70) {
        color = 'warning';
    }
    else {
        color = 'success';
    }
    return "<div class=\"progress\">\n    <div class=\"progress-bar progress-bar-" + color + " bg-" + color + "\" role=\"progressbar\" aria-valuenow=\"" + value + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"min-width: 2em; width: " + value + "%;\">\n    " + value + "%\n    </div>\n  </div>";
};
var translateFormatter = function (row, cell, value, columnDef, dataContext, grid) {
    var gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
    var options = gridOptions || columnDef.params || {};
    var translate = options.i18n;
    if (!translate || typeof translate.instant !== 'function') {
        throw new Error("The translate formatter requires the \"ngx-translate\" Service to be provided as a Grid Options or Column Definition \"i18n\".\n    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }");
    }
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? translate.instant(value) : '';
};
var translateBooleanFormatter = function (row, cell, value, columnDef, dataContext, grid) {
    var gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
    var options = gridOptions || columnDef.params || {};
    var translate = options.i18n;
    if (!translate || typeof translate.instant !== 'function') {
        throw new Error("The translate formatter requires the \"ngx-translate\" Service to be provided as a Grid Options or Column Definition \"i18n\".\n    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }");
    }
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? translate.instant((value.toUpperCase())) : '';
};
var uppercaseFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? value.toUpperCase() : '';
};
var yesNoFormatter = function (row, cell, value, columnDef, dataContext) { return value ? 'Yes' : 'No'; };
var Formatters = {
    arrayToCsv: arrayToCsvFormatter,
    bold: boldFormatter,
    checkbox: checkboxFormatter,
    checkmark: checkmarkFormatter,
    complexObject: complexObjectFormatter,
    collection: collectionFormatter,
    collectionEditor: collectionEditorFormatter,
    dateIso: dateIsoFormatter,
    dateTimeIso: dateTimeIsoFormatter,
    dateTimeIsoAmPm: dateTimeIsoAmPmFormatter,
    dateUs: dateUsFormatter,
    dateTimeUs: dateTimeUsFormatter,
    dateTimeUsAmPm: dateTimeUsAmPmFormatter,
    deleteIcon: deleteIconFormatter,
    decimal: decimalFormatter,
    dollar: dollarFormatter,
    dollarColored: dollarColoredFormatter,
    dollarColoredBold: dollarColoredBoldFormatter,
    editIcon: editIconFormatter,
    hyperlink: hyperlinkFormatter,
    hyperlinkUriPrefix: hyperlinkUriPrefixFormatter,
    infoIcon: infoIconFormatter,
    lowercase: lowercaseFormatter,
    mask: maskFormatter,
    multiple: multipleFormatter,
    percent: percentFormatter,
    percentComplete: percentCompleteFormatter,
    percentCompleteBar: percentCompleteBarFormatter,
    percentSymbol: percentSymbolFormatter,
    progressBar: progressBarFormatter,
    translate: translateFormatter,
    translateBoolean: translateBooleanFormatter,
    uppercase: uppercaseFormatter,
    yesNo: yesNoFormatter
};
var avgTotalsPercentageFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.avg && totals.avg[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + Math.round(val) + '%' + suffix;
    }
    return '';
};
var avgTotalsDollarFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.avg && totals.avg[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + '$' + decimalFormatted(val, 2, 4) + suffix;
    }
    return '';
};
var avgTotalsFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.avg && totals.avg[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + Math.round(val) + suffix;
    }
    return '';
};
var minTotalsFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.min && totals.min[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
    }
    return '';
};
var maxTotalsFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.max && totals.max[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
    }
    return '';
};
var sumTotalsColoredFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.sum && totals.sum[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (isNaN(+val)) {
        return '';
    }
    else if (val >= 0) {
        return "<span style=\"color:green;\">" + (prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix) + "</span>";
    }
    else {
        return "<span style=\"color:red;\">" + (prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix) + "</span>";
    }
};
var sumTotalsDollarColoredBoldFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.sum && totals.sum[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (isNaN(+val)) {
        return '';
    }
    else if (val >= 0) {
        return "<span style=\"color:green; font-weight: bold;\">" + (prefix + '$' + decimalFormatted(val, 2, 2) + suffix) + "</span>";
    }
    else {
        return "<span style=\"color:red; font-weight: bold;\">" + (prefix + '$' + decimalFormatted(val, 2, 2) + suffix) + "</span>";
    }
};
var sumTotalsDollarColoredFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.sum && totals.sum[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (isNaN(+val)) {
        return '';
    }
    else if (val >= 0) {
        return "<span style=\"color:green;\">" + (prefix + '$' + decimalFormatted(val, 2, 2) + suffix) + "</span>";
    }
    else {
        return "<span style=\"color:red;\">" + (prefix + '$' + decimalFormatted(val, 2, 2) + suffix) + "</span>";
    }
};
var sumTotalsDollarBoldFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.sum && totals.sum[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return "<span style=\"font-weight: bold;\">" + (prefix + '$' + decimalFormatted(val, 2, 4) + suffix) + "</span>";
    }
    return '';
};
var sumTotalsDollarFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.sum && totals.sum[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + '$' + decimalFormatted(val, 2, 2) + suffix;
    }
    return '';
};
var sumTotalsFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.sum && totals.sum[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
    }
    return '';
};
var sumTotalsBoldFormatter = function (totals, columnDef, grid) {
    var field = columnDef.field || '';
    var val = totals.sum && totals.sum[field];
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return "<span style=\"font-weight: bold;\">" + (prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix);
    }
    return '';
};
var GroupTotalFormatters = {
    avgTotals: avgTotalsFormatter,
    avgTotalsDollar: avgTotalsDollarFormatter,
    avgTotalsPercentage: avgTotalsPercentageFormatter,
    maxTotals: maxTotalsFormatter,
    minTotals: minTotalsFormatter,
    sumTotals: sumTotalsFormatter,
    sumTotalsBold: sumTotalsBoldFormatter,
    sumTotalsColored: sumTotalsColoredFormatter,
    sumTotalsDollar: sumTotalsDollarFormatter,
    sumTotalsDollarBold: sumTotalsDollarBoldFormatter,
    sumTotalsDollarColored: sumTotalsDollarColoredFormatter,
    sumTotalsDollarColoredBold: sumTotalsDollarColoredBoldFormatter,
};
var SlickPaginationComponent = /** @class */ (function () {
    function SlickPaginationComponent(filterService, sortService) {
        this.filterService = filterService;
        this.sortService = sortService;
        this._isFirstRender = true;
        this.onPaginationChanged = new core.EventEmitter();
        this.dataFrom = 1;
        this.dataTo = 1;
        this.pageCount = 0;
        this.pageNumber = 1;
        this.totalItems = 0;
        this.paginationPageSizes = [25, 75, 100];
        this.fromToParams = { from: this.dataFrom, to: this.dataTo, totalItems: this.totalItems };
    }
    Object.defineProperty(SlickPaginationComponent.prototype, "gridPaginationOptions", {
        get: function () {
            return this._gridPaginationOptions;
        },
        set: function (gridPaginationOptions) {
            this._gridPaginationOptions = gridPaginationOptions;
            if (this._isFirstRender || !gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
                this.refreshPagination();
                this._isFirstRender = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    SlickPaginationComponent.prototype.ngOnDestroy = function () {
        this.dispose();
    };
    SlickPaginationComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._gridPaginationOptions = this._gridPaginationOptions;
        if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
        }
        this._filterSubcription = this.filterService.onFilterChanged.subscribe(function (data) {
            _this.refreshPagination(true);
        });
        this._filterSubcription = this.filterService.onFilterCleared.subscribe(function (data) {
            _this.refreshPagination(true);
        });
    };
    SlickPaginationComponent.prototype.ceil = function (number) {
        return Math.ceil(number);
    };
    SlickPaginationComponent.prototype.changeToFirstPage = function (event) {
        this.pageNumber = 1;
        this.onPageChanged(event, this.pageNumber);
    };
    SlickPaginationComponent.prototype.changeToLastPage = function (event) {
        this.pageNumber = this.pageCount;
        this.onPageChanged(event, this.pageNumber);
    };
    SlickPaginationComponent.prototype.changeToNextPage = function (event) {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber++;
            this.onPageChanged(event, this.pageNumber);
        }
    };
    SlickPaginationComponent.prototype.changeToPreviousPage = function (event) {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.onPageChanged(event, this.pageNumber);
        }
    };
    SlickPaginationComponent.prototype.changeToCurrentPage = function (event) {
        this.pageNumber = event.currentTarget.value;
        if (this.pageNumber < 1) {
            this.pageNumber = 1;
        }
        else if (this.pageNumber > this.pageCount) {
            this.pageNumber = this.pageCount;
        }
        this.onPageChanged(event, this.pageNumber);
    };
    SlickPaginationComponent.prototype.dispose = function () {
        this.onPaginationChanged.unsubscribe();
        if (this._filterSubcription) {
            this._filterSubcription.unsubscribe();
        }
    };
    SlickPaginationComponent.prototype.onChangeItemPerPage = function (event) {
        var itemsPerPage = +event.target.value;
        this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
        this.pageNumber = 1;
        this.itemsPerPage = itemsPerPage;
        this.onPageChanged(event, this.pageNumber);
    };
    SlickPaginationComponent.prototype.refreshPagination = function (isPageNumberReset) {
        if (isPageNumberReset === void 0) { isPageNumberReset = false; }
        var backendApi = this._gridPaginationOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
            var pagination = this._gridPaginationOptions.pagination;
            if (!this.itemsPerPage) {
                this.itemsPerPage = +((backendApi && backendApi.options && backendApi.options.paginationOptions && backendApi.options.paginationOptions.first) ? backendApi.options.paginationOptions.first : this._gridPaginationOptions.pagination.pageSize);
            }
            if (isPageNumberReset || this.totalItems !== pagination.totalItems) {
                if (this._isFirstRender && pagination.pageNumber && pagination.pageNumber > 1) {
                    this.pageNumber = pagination.pageNumber || 1;
                }
                else {
                    this.pageNumber = 1;
                }
                if (this.pageNumber === 1) {
                    backendApi.service.resetPaginationOptions();
                }
            }
            this.paginationPageSizes = this._gridPaginationOptions.pagination.pageSizes;
            this.totalItems = this._gridPaginationOptions.pagination.totalItems;
            this.recalculateFromToIndexes();
        }
        this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    };
    SlickPaginationComponent.prototype.onPageChanged = function (event, pageNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var backendApi, itemsPerPage, query, observableOrPromise, processResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.recalculateFromToIndexes();
                        backendApi = this._gridPaginationOptions.backendServiceApi;
                        if (!backendApi || !backendApi.service || !backendApi.process) {
                            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        if (this.dataTo > this.totalItems) {
                            this.dataTo = this.totalItems;
                        }
                        else if (this.totalItems < this.itemsPerPage) {
                            this.dataTo = this.totalItems;
                        }
                        if (!backendApi) return [3 /*break*/, 2];
                        itemsPerPage = +this.itemsPerPage;
                        if (backendApi.preProcess) {
                            backendApi.preProcess();
                        }
                        query = backendApi.service.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                        observableOrPromise = backendApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 1:
                        processResult = _a.sent();
                        if (processResult && backendApi.internalPostProcess) {
                            backendApi.internalPostProcess(processResult);
                        }
                        if (backendApi.postProcess) {
                            backendApi.postProcess(processResult);
                        }
                        return [3 /*break*/, 3];
                    case 2: throw new Error('Pagination with a backend service requires "BackendServiceApi" to be defined in your grid options');
                    case 3:
                        this.onPaginationChanged.emit({
                            pageNumber: this.pageNumber,
                            pageSizes: this.paginationPageSizes,
                            pageSize: this.itemsPerPage,
                            totalItems: this.totalItems
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SlickPaginationComponent.prototype.recalculateFromToIndexes = function () {
        this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
        this.dataTo = (this.totalItems < this.itemsPerPage) ? this.totalItems : (this.pageNumber * this.itemsPerPage);
    };
    return SlickPaginationComponent;
}());
SlickPaginationComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'slick-pagination',
                template: "<div class=\"slick-pagination\">\n    <div class=\"slick-pagination-nav\">\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"pageNumber === 1 ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-first fa fa-angle-double-left\" aria-label=\"First\" (click)=\"changeToFirstPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"pageNumber === 1 ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-prev fa fa-angle-left\" aria-label=\"Previous\" (click)=\"changeToPreviousPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n        <div class=\"slick-page-number\">\n            <span [translate]=\"'PAGE'\"></span>\n            <input type=\"text\" class=\"form-control\" value=\"{{pageNumber}}\" size=\"1\"  (change)=\"changeToCurrentPage($event)\">\n            <span [translate]=\"'OF'\"></span><span> {{pageCount}}</span>\n        </div>\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"pageNumber === pageCount ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-next text-center fa fa-lg fa-angle-right\" aria-label=\"Next\" (click)=\"changeToNextPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"pageNumber === pageCount ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-end fa fa-lg fa-angle-double-right\" aria-label=\"Last\" (click)=\"changeToLastPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n    </div>\n    <span class=\"slick-pagination-settings\">\n        <select id=\"items-per-page-label\" [value]=\"itemsPerPage\" (change)=\"onChangeItemPerPage($event)\">\n        <option value=\"{{pageSize}}\" *ngFor=\"let pageSize of paginationPageSizes;\">{{pageSize}}</option>\n        </select>\n        <span [translate]=\"'ITEMS_PER_PAGE'\"></span>,\n        <span class=\"slick-pagination-count\">\n            <span [translate]=\"'FROM_TO_OF_TOTAL_ITEMS'\" [translateParams]=\"{ from: dataFrom, to: dataTo, totalItems: totalItems }\"></span>\n        </span>\n    </span>\n    </div>\n"
            },] },
    { type: core.Injectable },
];
SlickPaginationComponent.ctorParameters = function () { return [
    { type: FilterService, },
    { type: SortService, },
]; };
SlickPaginationComponent.propDecorators = {
    "onPaginationChanged": [{ type: core.Output },],
    "gridPaginationOptions": [{ type: core.Input },],
    "grid": [{ type: core.Input },],
};
var slickgridEventPrefix = 'sg';
var AngularSlickgridComponent = /** @class */ (function () {
    function AngularSlickgridComponent(controlAndPluginService, exportService, filterService, gridService, gridEventService, gridStateService, groupingAndColspanService, resizer, sortService, translate, forRootConfig) {
        this.controlAndPluginService = controlAndPluginService;
        this.exportService = exportService;
        this.filterService = filterService;
        this.gridService = gridService;
        this.gridEventService = gridEventService;
        this.gridStateService = gridStateService;
        this.groupingAndColspanService = groupingAndColspanService;
        this.resizer = resizer;
        this.sortService = sortService;
        this.translate = translate;
        this.forRootConfig = forRootConfig;
        this._eventHandler = new Slick.EventHandler();
        this.groupingDefinition = {};
        this.showPagination = false;
        this.isGridInitialized = false;
        this.subscriptions = [];
        this.onAngularGridCreated = new core.EventEmitter();
        this.onDataviewCreated = new core.EventEmitter();
        this.onGridCreated = new core.EventEmitter();
        this.onGridInitialized = new core.EventEmitter();
        this.onBeforeGridCreate = new core.EventEmitter();
        this.onBeforeGridDestroy = new core.EventEmitter();
        this.onAfterGridDestroyed = new core.EventEmitter();
        this.onGridStateChanged = new core.EventEmitter();
        this.gridHeight = 0;
        this.gridWidth = 0;
    }
    Object.defineProperty(AngularSlickgridComponent.prototype, "columnDefinitions", {
        get: function () {
            return this._columnDefinitions;
        },
        set: function (columnDefinitions) {
            this._columnDefinitions = columnDefinitions;
            if (this.isGridInitialized) {
                this.updateColumnDefinitionsList(columnDefinitions);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularSlickgridComponent.prototype, "dataset", {
        get: function () {
            return this._dataView.getItems();
        },
        set: function (dataset) {
            this._dataset = dataset;
            this.refreshGridData(dataset);
        },
        enumerable: true,
        configurable: true
    });
    AngularSlickgridComponent.prototype.ngOnInit = function () {
        this.onBeforeGridCreate.emit(true);
        if (!this.gridOptions.enableAutoResize && !this.gridOptions.autoResize) {
            this.gridHeightString = this.gridHeight + "px";
            this.gridWidthString = this.gridWidth + "px";
        }
    };
    AngularSlickgridComponent.prototype.ngOnDestroy = function () {
        this.onBeforeGridDestroy.emit(this.grid);
        this.destroy();
        this.onAfterGridDestroyed.emit(true);
    };
    AngularSlickgridComponent.prototype.destroy = function () {
        this._dataView = [];
        this.gridOptions = {};
        this._eventHandler.unsubscribeAll();
        this.controlAndPluginService.dispose();
        this.filterService.dispose();
        this.gridEventService.dispose();
        this.gridStateService.dispose();
        this.groupingAndColspanService.dispose();
        this.resizer.dispose();
        this.sortService.dispose();
        this.grid.destroy();
        this.subscriptions.forEach(function (subscription) {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        });
        this.subscriptions = [];
    };
    AngularSlickgridComponent.prototype.ngAfterViewInit = function () {
        this.initialization();
        this.isGridInitialized = true;
    };
    AngularSlickgridComponent.prototype.initialization = function () {
        this._dataset = this._dataset || [];
        this.gridOptions = this.mergeGridOptions(this.gridOptions);
        this.createBackendApiInternalPostProcessCallback(this.gridOptions);
        if (this.gridOptions.enableGrouping) {
            this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
            this._dataView = new Slick.Data.DataView({
                groupItemMetadataProvider: this.groupItemMetadataProvider,
                inlineFilters: true
            });
        }
        else {
            this._dataView = new Slick.Data.DataView();
        }
        this._columnDefinitions = this._columnDefinitions.map(function (c) { return (Object.assign({}, c, { editor: c.editor && c.editor.model, internalColumnEditor: Object.assign({}, c.editor) })); }), this.controlAndPluginService.createCheckboxPluginBeforeGridCreation(this._columnDefinitions, this.gridOptions);
        this.grid = new Slick.Grid("#" + this.gridId, this._dataView, this._columnDefinitions, this.gridOptions);
        this.controlAndPluginService.attachDifferentControlOrPlugins(this.grid, this._dataView, this.groupItemMetadataProvider);
        this.attachDifferentHooks(this.grid, this.gridOptions, this._dataView);
        this.onGridCreated.emit(this.grid);
        this.onDataviewCreated.emit(this._dataView);
        this.grid.init();
        this._dataView.beginUpdate();
        this._dataView.setItems(this._dataset, this.gridOptions.datasetIdPropertyName);
        this._dataView.endUpdate();
        this.executeAfterDataviewCreated(this.grid, this.gridOptions, this._dataView);
        this.attachResizeHook(this.grid, this.gridOptions);
        if (this.gridOptions.createPreHeaderPanel) {
            this.groupingAndColspanService.init(this.grid, this._dataView);
        }
        this.gridService.init(this.grid, this._dataView);
        if (this.gridOptions.enableTranslate) {
            this.controlAndPluginService.translateColumnHeaders();
        }
        if (this.gridOptions.enableExport) {
            this.exportService.init(this.grid, this._dataView);
        }
        this.onGridInitialized.emit(this.grid);
        if (this.gridOptions && this.gridOptions.backendServiceApi) {
            this.attachBackendCallbackFunctions(this.gridOptions);
        }
        this.gridStateService.init(this.grid, this.controlAndPluginService, this.filterService, this.sortService);
        this.onAngularGridCreated.emit({
            dataView: this._dataView,
            slickGrid: this.grid,
            backendService: this.gridOptions && this.gridOptions.backendServiceApi && this.gridOptions.backendServiceApi.service,
            exportService: this.exportService,
            filterService: this.filterService,
            gridEventService: this.gridEventService,
            gridStateService: this.gridStateService,
            gridService: this.gridService,
            groupingService: this.groupingAndColspanService,
            pluginService: this.controlAndPluginService,
            resizerService: this.resizer,
            sortService: this.sortService,
        });
    };
    AngularSlickgridComponent.prototype.createBackendApiInternalPostProcessCallback = function (gridOptions) {
        var _this = this;
        if (gridOptions && gridOptions.backendServiceApi) {
            var backendApi_1 = gridOptions.backendServiceApi;
            if (backendApi_1 && backendApi_1.service && backendApi_1.service instanceof GraphqlService) {
                backendApi_1.internalPostProcess = function (processResult) {
                    var datasetName = (backendApi_1 && backendApi_1.service && typeof backendApi_1.service.getDatasetName === 'function') ? backendApi_1.service.getDatasetName() : '';
                    if (processResult && processResult.data && processResult.data[datasetName]) {
                        _this._dataset = processResult.data[datasetName].nodes;
                        _this.refreshGridData(_this._dataset, processResult.data[datasetName].totalCount);
                    }
                    else {
                        _this._dataset = [];
                    }
                };
            }
        }
    };
    AngularSlickgridComponent.prototype.attachDifferentHooks = function (grid, gridOptions, dataView) {
        var _this = this;
        this.subscriptions.push(this.translate.onLangChange.subscribe(function (event) {
            if (gridOptions.enableTranslate) {
                _this.controlAndPluginService.translateColumnHeaders();
                _this.controlAndPluginService.translateColumnPicker();
                _this.controlAndPluginService.translateGridMenu();
                _this.controlAndPluginService.translateHeaderMenu();
            }
        }));
        if (gridOptions.presets && Array.isArray(gridOptions.presets.columns) && gridOptions.presets.columns.length > 0) {
            var gridColumns = this.gridStateService.getAssociatedGridColumns(grid, gridOptions.presets.columns);
            if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
                if (gridOptions.enableCheckboxSelector) {
                    var checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
                    if (checkboxColumn && checkboxColumn.id === '_checkbox_selector' && gridColumns[0].id !== '_checkbox_selector') {
                        gridColumns.unshift(checkboxColumn);
                    }
                }
                grid.setColumns(gridColumns);
            }
        }
        if (gridOptions.enableSorting) {
            gridOptions.backendServiceApi ? this.sortService.attachBackendOnSort(grid, dataView) : this.sortService.attachLocalOnSort(grid, dataView);
        }
        if (gridOptions.enableFiltering) {
            this.filterService.init(grid);
            if (gridOptions.presets && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                this.filterService.populateColumnFilterSearchTerms();
            }
            gridOptions.backendServiceApi ? this.filterService.attachBackendOnFilter(grid) : this.filterService.attachLocalOnFilter(grid, this._dataView);
        }
        if (gridOptions.backendServiceApi) {
            var backendApi = gridOptions.backendServiceApi;
            if (backendApi && backendApi.service && backendApi.service.init) {
                backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
            }
        }
        var _loop_3 = function (prop) {
            if (grid.hasOwnProperty(prop) && prop.startsWith('on')) {
                this_3._eventHandler.subscribe(grid[prop], function (e, args) {
                    _this.dispatchCustomEvent("" + slickgridEventPrefix + titleCase(prop), { eventData: e, args: args });
                });
            }
        };
        var this_3 = this;
        for (var prop in grid) {
            _loop_3(prop);
        }
        var _loop_4 = function (prop) {
            if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
                this_4._eventHandler.subscribe(dataView[prop], function (e, args) {
                    _this.dispatchCustomEvent("" + slickgridEventPrefix + titleCase(prop), { eventData: e, args: args });
                });
            }
        };
        var this_4 = this;
        for (var prop in dataView) {
            _loop_4(prop);
        }
        this.subscriptions.push(this.gridStateService.onGridStateChanged.subscribe(function (gridStateChange) {
            _this.onGridStateChanged.emit(gridStateChange);
        }));
        this.gridEventService.attachOnCellChange(grid, dataView);
        this.gridEventService.attachOnClick(grid, dataView);
        this._eventHandler.subscribe(dataView.onRowCountChanged, function (e, args) {
            grid.updateRowCount();
            grid.render();
        });
        this._eventHandler.subscribe(dataView.onRowsChanged, function (e, args) {
            grid.invalidateRows(args.rows);
            grid.render();
        });
        if (gridOptions.colspanCallback) {
            this._dataView.getItemMetadata = function (rowNumber) {
                var item = _this._dataView.getItem(rowNumber);
                return gridOptions.colspanCallback(item);
            };
        }
    };
    AngularSlickgridComponent.prototype.attachBackendCallbackFunctions = function (gridOptions) {
        var _this = this;
        var backendApi = gridOptions.backendServiceApi;
        var serviceOptions = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
        var isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
        if (backendApi) {
            var backendService = backendApi.service;
            if (gridOptions && gridOptions.presets) {
                if (backendService && backendService.updateFilters && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                    backendService.updateFilters(gridOptions.presets.filters, true);
                }
                if (backendService && backendService.updateSorters && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                    backendService.updateSorters(undefined, gridOptions.presets.sorters);
                }
                if (backendService && backendService.updatePagination && gridOptions.presets.pagination) {
                    backendService.updatePagination(gridOptions.presets.pagination.pageNumber, gridOptions.presets.pagination.pageSize);
                }
            }
            else {
                var columnFilters = this.filterService.getColumnFilters();
                if (columnFilters && backendService && backendService.updateFilters) {
                    backendService.updateFilters(columnFilters, false);
                }
            }
        }
        if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
            var query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
            var observableOrPromise_1 = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                var processResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (backendApi.preProcess) {
                                backendApi.preProcess();
                            }
                            return [4 /*yield*/, castToPromise(observableOrPromise_1)];
                        case 1:
                            processResult = _a.sent();
                            if (processResult && backendApi && backendApi.service instanceof GraphqlService && backendApi.internalPostProcess) {
                                backendApi.internalPostProcess(processResult);
                            }
                            if (backendApi.postProcess) {
                                backendApi.postProcess(processResult);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    AngularSlickgridComponent.prototype.attachResizeHook = function (grid, options) {
        if (grid && options.autoFitColumnsOnFirstLoad) {
            grid.autosizeColumns();
        }
        this.resizer.init(grid);
        if (options.enableAutoResize) {
            this.resizer.attachAutoResizeDataGrid({ height: this.gridHeight, width: this.gridWidth });
            if (grid && options.autoFitColumnsOnFirstLoad) {
                grid.autosizeColumns();
            }
        }
    };
    AngularSlickgridComponent.prototype.executeAfterDataviewCreated = function (grid, gridOptions, dataView) {
        if (gridOptions.enableSorting) {
            if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                this.sortService.loadLocalPresets(grid, dataView);
            }
        }
    };
    AngularSlickgridComponent.prototype.mergeGridOptions = function (gridOptions) {
        gridOptions.gridId = this.gridId;
        gridOptions.gridContainerId = "slickGridContainer-" + this.gridId;
        if (gridOptions.enableFiltering || this.forRootConfig.enableFiltering) {
            gridOptions.showHeaderRow = true;
        }
        return $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);
    };
    AngularSlickgridComponent.prototype.paginationChanged = function (pagination) {
        this.gridStateService.onGridStateChanged.next({
            change: { newValues: pagination, type: GridStateType.pagination },
            gridState: this.gridStateService.getCurrentGridState()
        });
    };
    AngularSlickgridComponent.prototype.refreshGridData = function (dataset, totalCount) {
        if (dataset && this.grid && this._dataView && typeof this._dataView.setItems === 'function') {
            this._dataView.setItems(dataset, this.gridOptions.datasetIdPropertyName);
            this._dataView.reSort();
            this.grid.invalidate();
            this.grid.render();
            if (this.gridOptions.enablePagination || this.gridOptions.backendServiceApi) {
                this.showPagination = ((this.gridOptions.backendServiceApi && this.gridOptions.enablePagination === undefined) ? true : this.gridOptions.enablePagination) || false;
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
                this.resizer.resizeGrid(10, { height: this.gridHeight, width: this.gridWidth });
            }
        }
    };
    AngularSlickgridComponent.prototype.updateColumnDefinitionsList = function (newColumnDefinitions) {
        if (this.gridOptions.enableTranslate) {
            this.controlAndPluginService.translateColumnHeaders(false, newColumnDefinitions);
        }
        else {
            this.controlAndPluginService.renderColumnHeaders(newColumnDefinitions);
        }
        this.grid.autosizeColumns();
    };
    AngularSlickgridComponent.prototype.showHeaderRow = function (isShowing) {
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    };
    AngularSlickgridComponent.prototype.toggleHeaderRow = function () {
        var isShowing = !this.grid.getOptions().showHeaderRow;
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    };
    AngularSlickgridComponent.prototype.dispatchCustomEvent = function (eventName, data, isBubbling) {
        if (isBubbling === void 0) { isBubbling = true; }
        var eventInit = { bubbles: isBubbling };
        if (data) {
            eventInit.detail = data;
        }
        this.customElm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
    };
    return AngularSlickgridComponent;
}());
AngularSlickgridComponent.decorators = [
    { type: core.Injectable },
    { type: core.Component, args: [{
                selector: 'angular-slickgrid',
                template: "<div id=\"slickGridContainer-{{gridId}}\" #customElm class=\"gridPane\" [style.width]=\"gridWidthString\">\n    <div attr.id='{{gridId}}' class=\"slickgrid-container\" style=\"width: 100%\" [style.height]=\"gridHeightString\">\n    </div>\n    <slick-pagination id=\"slickPagingContainer-{{gridId}}\"\n        *ngIf=\"showPagination\"\n        (onPaginationChanged)=\"paginationChanged($event)\"\n        [gridPaginationOptions]=\"gridPaginationOptions\">\n    </slick-pagination>\n</div>\n",
                providers: [
                    CompoundDateFilter,
                    CompoundInputFilter,
                    InputFilter,
                    MultipleSelectFilter,
                    SingleSelectFilter,
                    SelectFilter,
                    ControlAndPluginService,
                    ExportService,
                    FilterFactory,
                    FilterService,
                    GraphqlService,
                    GridEventService,
                    GridService,
                    GridStateService,
                    GroupingAndColspanService,
                    ResizerService,
                    SortService,
                    SlickgridConfig
                ]
            },] },
];
AngularSlickgridComponent.ctorParameters = function () { return [
    { type: ControlAndPluginService, },
    { type: ExportService, },
    { type: FilterService, },
    { type: GridService, },
    { type: GridEventService, },
    { type: GridStateService, },
    { type: GroupingAndColspanService, },
    { type: ResizerService, },
    { type: SortService, },
    { type: core$1.TranslateService, },
    { type: undefined, decorators: [{ type: core.Inject, args: ['config',] },] },
]; };
AngularSlickgridComponent.propDecorators = {
    "customElm": [{ type: core.ViewChild, args: ['customElm', { read: core.ElementRef },] },],
    "onAngularGridCreated": [{ type: core.Output },],
    "onDataviewCreated": [{ type: core.Output },],
    "onGridCreated": [{ type: core.Output },],
    "onGridInitialized": [{ type: core.Output },],
    "onBeforeGridCreate": [{ type: core.Output },],
    "onBeforeGridDestroy": [{ type: core.Output },],
    "onAfterGridDestroyed": [{ type: core.Output },],
    "onGridStateChanged": [{ type: core.Output },],
    "gridId": [{ type: core.Input },],
    "gridOptions": [{ type: core.Input },],
    "gridHeight": [{ type: core.Input },],
    "gridWidth": [{ type: core.Input },],
    "columnDefinitions": [{ type: core.Input },],
    "dataset": [{ type: core.Input },],
};
var AngularSlickgridModule = /** @class */ (function () {
    function AngularSlickgridModule() {
    }
    AngularSlickgridModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: AngularSlickgridModule,
            providers: [
                { provide: 'config', useValue: config },
                CollectionService,
                GraphqlService,
                GridOdataService
            ]
        };
    };
    return AngularSlickgridModule;
}());
AngularSlickgridModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    core$1.TranslateModule
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
AngularSlickgridModule.ctorParameters = function () { return []; };

exports.SlickgridConfig = SlickgridConfig;
exports.SlickPaginationComponent = SlickPaginationComponent;
exports.AngularSlickgridComponent = AngularSlickgridComponent;
exports.AngularSlickgridModule = AngularSlickgridModule;
exports.CaseType = CaseType;
exports.DelimiterType = DelimiterType;
exports.FieldType = FieldType;
exports.FileType = FileType;
exports.GridStateType = GridStateType;
exports.KeyCode = KeyCode;
exports.OperatorType = OperatorType;
exports.SortDirection = SortDirection;
exports.SortDirectionNumber = SortDirectionNumber;
exports.CollectionService = CollectionService;
exports.ControlAndPluginService = ControlAndPluginService;
exports.ExportService = ExportService;
exports.FilterService = FilterService;
exports.GraphqlService = GraphqlService;
exports.GridOdataService = GridOdataService;
exports.GridEventService = GridEventService;
exports.GridService = GridService;
exports.GridStateService = GridStateService;
exports.GroupingAndColspanService = GroupingAndColspanService;
exports.OdataService = OdataService;
exports.ResizerService = ResizerService;
exports.SortService = SortService;
exports.addWhiteSpaces = addWhiteSpaces;
exports.htmlEntityDecode = htmlEntityDecode;
exports.htmlEntityEncode = htmlEntityEncode;
exports.arraysEqual = arraysEqual;
exports.castToPromise = castToPromise;
exports.findOrDefault = findOrDefault;
exports.decimalFormatted = decimalFormatted;
exports.mapMomentDateFormatWithFieldType = mapMomentDateFormatWithFieldType;
exports.mapFlatpickrDateFormatWithFieldType = mapFlatpickrDateFormatWithFieldType;
exports.mapOperatorType = mapOperatorType;
exports.mapOperatorByFieldType = mapOperatorByFieldType;
exports.parseUtcDate = parseUtcDate;
exports.sanitizeHtmlToText = sanitizeHtmlToText;
exports.titleCase = titleCase;
exports.toCamelCase = toCamelCase;
exports.toKebabCase = toKebabCase;
exports.Aggregators = Aggregators;
exports.Editors = Editors;
exports.FilterConditions = FilterConditions;
exports.Filters = Filters;
exports.FilterFactory = FilterFactory;
exports.Formatters = Formatters;
exports.GroupTotalFormatters = GroupTotalFormatters;
exports.Sorters = Sorters;
exports.ɵa = AvgAggregator;
exports.ɵc = MaxAggregator;
exports.ɵb = MinAggregator;
exports.ɵd = SumAggregator;
exports.ɵe = CheckboxEditor;
exports.ɵf = DateEditor;
exports.ɵg = FloatEditor;
exports.ɵh = IntegerEditor;
exports.ɵi = LongTextEditor;
exports.ɵj = MultipleSelectEditor;
exports.ɵk = SingleSelectEditor;
exports.ɵl = SliderEditor;
exports.ɵm = TextEditor;
exports.ɵo = booleanFilterCondition;
exports.ɵp = collectionSearchFilterCondition;
exports.ɵq = dateFilterCondition;
exports.ɵr = dateIsoFilterCondition;
exports.ɵt = dateUsFilterCondition;
exports.ɵu = dateUsShortFilterCondition;
exports.ɵs = dateUtcFilterCondition;
exports.ɵn = executeMappedCondition;
exports.ɵx = testFilterCondition;
exports.ɵv = numberFilterCondition;
exports.ɵw = stringFilterCondition;
exports.ɵy = CompoundDateFilter;
exports.ɵz = CompoundInputFilter;
exports.ɵba = CompoundSliderFilter;
exports.ɵbb = InputFilter;
exports.ɵbd = MultipleSelectFilter;
exports.ɵbf = SelectFilter;
exports.ɵbe = SingleSelectFilter;
exports.ɵbc = SliderFilter;
exports.ɵbg = arrayToCsvFormatter;
exports.ɵbh = boldFormatter;
exports.ɵbi = checkboxFormatter;
exports.ɵbj = checkmarkFormatter;
exports.ɵbm = collectionEditorFormatter;
exports.ɵbl = collectionFormatter;
exports.ɵbk = complexObjectFormatter;
exports.ɵbn = dateIsoFormatter;
exports.ɵbp = dateTimeIsoAmPmFormatter;
exports.ɵbo = dateTimeIsoFormatter;
exports.ɵbs = dateTimeUsAmPmFormatter;
exports.ɵbr = dateTimeUsFormatter;
exports.ɵbq = dateUsFormatter;
exports.ɵbu = decimalFormatter;
exports.ɵbt = deleteIconFormatter;
exports.ɵbx = dollarColoredBoldFormatter;
exports.ɵbw = dollarColoredFormatter;
exports.ɵbv = dollarFormatter;
exports.ɵby = editIconFormatter;
exports.ɵbz = hyperlinkFormatter;
exports.ɵca = hyperlinkUriPrefixFormatter;
exports.ɵcb = infoIconFormatter;
exports.ɵcc = lowercaseFormatter;
exports.ɵcd = maskFormatter;
exports.ɵce = multipleFormatter;
exports.ɵch = percentCompleteBarFormatter;
exports.ɵcg = percentCompleteFormatter;
exports.ɵcf = percentFormatter;
exports.ɵci = percentSymbolFormatter;
exports.ɵcj = progressBarFormatter;
exports.ɵcl = translateBooleanFormatter;
exports.ɵck = translateFormatter;
exports.ɵcm = uppercaseFormatter;
exports.ɵcn = yesNoFormatter;
exports.ɵcp = avgTotalsDollarFormatter;
exports.ɵco = avgTotalsFormatter;
exports.ɵcq = avgTotalsPercentageFormatter;
exports.ɵcr = maxTotalsFormatter;
exports.ɵcs = minTotalsFormatter;
exports.ɵcu = sumTotalsBoldFormatter;
exports.ɵcv = sumTotalsColoredFormatter;
exports.ɵcx = sumTotalsDollarBoldFormatter;
exports.ɵcz = sumTotalsDollarColoredBoldFormatter;
exports.ɵcy = sumTotalsDollarColoredFormatter;
exports.ɵcw = sumTotalsDollarFormatter;
exports.ɵct = sumTotalsFormatter;
exports.ɵdb = dateIsoSorter;
exports.ɵda = dateSorter;
exports.ɵdd = dateUsShortSorter;
exports.ɵdc = dateUsSorter;
exports.ɵde = numericSorter;
exports.ɵdf = stringSorter;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-slickgrid.umd.js.map
