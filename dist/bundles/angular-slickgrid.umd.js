(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('text-encoding-utf-8'), require('slickgrid/plugins/slick.cellrangedecorator'), require('slickgrid/plugins/slick.cellrangeselector'), require('slickgrid/plugins/slick.cellselectionmodel'), require('flatpickr'), require('lodash.isequal'), require('dompurify'), require('moment-mini'), require('jquery-ui-dist/jquery-ui'), require('slickgrid/lib/jquery.event.drag-2.3.0'), require('slickgrid/slick.core'), require('slickgrid/slick.grid'), require('slickgrid/slick.dataview'), require('rxjs'), require('@angular/common'), require('@angular/core'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('angular-slickgrid', ['exports', 'rxjs/operators', 'text-encoding-utf-8', 'slickgrid/plugins/slick.cellrangedecorator', 'slickgrid/plugins/slick.cellrangeselector', 'slickgrid/plugins/slick.cellselectionmodel', 'flatpickr', 'lodash.isequal', 'dompurify', 'moment-mini', 'jquery-ui-dist/jquery-ui', 'slickgrid/lib/jquery.event.drag-2.3.0', 'slickgrid/slick.core', 'slickgrid/slick.grid', 'slickgrid/slick.dataview', 'rxjs', '@angular/common', '@angular/core', '@ngx-translate/core'], factory) :
    (factory((global['angular-slickgrid'] = {}),global.rxjs.operators,global.textEncodingUtf8,null,null,null,global.flatpickr,global.lodash.isequal,global.dompurify,global.moment,null,null,null,null,null,global.rxjs,global.ng.common,global.ng.core,global['ngx-translate-core']));
}(this, (function (exports,operators,textEncodingUtf8,slick_cellrangedecorator,slick_cellrangeselector,slick_cellselectionmodel,Flatpickr,isequal_,DOMPurify_,moment_,jqueryUi,jquery_event_drag2_3_0,slick_core,slick_grid,slick_dataview,rxjs,common,core,core$1) { 'use strict';

    Flatpickr = Flatpickr && Flatpickr.hasOwnProperty('default') ? Flatpickr['default'] : Flatpickr;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var CaseType = {
        camelCase: 0,
        pascalCase: 1,
        snakeCase: 2,
    };
    CaseType[CaseType.camelCase] = 'camelCase';
    CaseType[CaseType.pascalCase] = 'pascalCase';
    CaseType[CaseType.snakeCase] = 'snakeCase';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var ExtensionName = {
        autoTooltip: 'autoTooltip',
        cellExternalCopyManager: 'cellExternalCopyManager',
        checkboxSelector: 'checkboxSelector',
        columnPicker: 'columnPicker',
        draggableGrouping: 'draggableGrouping',
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var FieldType = {
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
    FieldType[FieldType.unknown] = 'unknown';
    FieldType[FieldType.string] = 'string';
    FieldType[FieldType.boolean] = 'boolean';
    FieldType[FieldType.integer] = 'integer';
    FieldType[FieldType.float] = 'float';
    FieldType[FieldType.number] = 'number';
    FieldType[FieldType.date] = 'date';
    FieldType[FieldType.dateIso] = 'dateIso';
    FieldType[FieldType.dateUtc] = 'dateUtc';
    FieldType[FieldType.dateTime] = 'dateTime';
    FieldType[FieldType.dateTimeIso] = 'dateTimeIso';
    FieldType[FieldType.dateTimeIsoAmPm] = 'dateTimeIsoAmPm';
    FieldType[FieldType.dateTimeIsoAM_PM] = 'dateTimeIsoAM_PM';
    FieldType[FieldType.dateTimeShortIso] = 'dateTimeShortIso';
    FieldType[FieldType.dateUs] = 'dateUs';
    FieldType[FieldType.dateUsShort] = 'dateUsShort';
    FieldType[FieldType.dateTimeShortUs] = 'dateTimeShortUs';
    FieldType[FieldType.dateTimeUs] = 'dateTimeUs';
    FieldType[FieldType.dateTimeUsAmPm] = 'dateTimeUsAmPm';
    FieldType[FieldType.dateTimeUsAM_PM] = 'dateTimeUsAM_PM';
    FieldType[FieldType.dateTimeUsShort] = 'dateTimeUsShort';
    FieldType[FieldType.dateTimeUsShortAmPm] = 'dateTimeUsShortAmPm';
    FieldType[FieldType.dateTimeUsShortAM_PM] = 'dateTimeUsShortAM_PM';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var FileType = {
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var FilterMultiplePassType = {
        merge: 'merge',
        chain: 'chain',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var GridStateType = {
        columns: 'columns',
        filter: 'filter',
        pagination: 'pagination',
        sorter: 'sorter',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
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
    KeyCode[KeyCode.BACKSPACE] = 'BACKSPACE';
    KeyCode[KeyCode.DELETE] = 'DELETE';
    KeyCode[KeyCode.DOWN] = 'DOWN';
    KeyCode[KeyCode.END] = 'END';
    KeyCode[KeyCode.ENTER] = 'ENTER';
    KeyCode[KeyCode.ESCAPE] = 'ESCAPE';
    KeyCode[KeyCode.HOME] = 'HOME';
    KeyCode[KeyCode.INSERT] = 'INSERT';
    KeyCode[KeyCode.LEFT] = 'LEFT';
    KeyCode[KeyCode.PAGE_DOWN] = 'PAGE_DOWN';
    KeyCode[KeyCode.PAGE_UP] = 'PAGE_UP';
    KeyCode[KeyCode.RIGHT] = 'RIGHT';
    KeyCode[KeyCode.TAB] = 'TAB';
    KeyCode[KeyCode.UP] = 'UP';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var OperatorType = {
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var SortDirection = {
        asc: 'asc',
        ASC: 'ASC',
        desc: 'desc',
        DESC: 'DESC',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var SortDirectionNumber = {
        asc: 1,
        desc: -1,
        neutral: 0,
    };
    SortDirectionNumber[SortDirectionNumber.asc] = 'asc';
    SortDirectionNumber[SortDirectionNumber.desc] = 'desc';
    SortDirectionNumber[SortDirectionNumber.neutral] = 'neutral';

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
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment = moment_;
    /**
     * Simple function to which will loop and create as demanded the number of white spaces,
     * this will be used in the Excel export
     * @param {?} nbSpaces
     * @return {?}
     */
    function addWhiteSpaces(nbSpaces) {
        /** @type {?} */
        var result = '';
        for (var i = 0; i < nbSpaces; i++) {
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
        /** @type {?} */
        var buf = [];
        for (var i = input.length - 1; i >= 0; i--) {
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
    function arraysEqual(a, b, orderMatters) {
        if (orderMatters === void 0) {
            orderMatters = false;
        }
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
        for (var i = 0; i < a.length; ++i) {
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
    function castToPromise(input, fromServiceName) {
        if (fromServiceName === void 0) {
            fromServiceName = '';
        }
        /** @type {?} */
        var promise = input;
        if (input instanceof Promise) {
            // if it's already a Promise then return it
            return input;
        }
        else if (input instanceof rxjs.Observable) {
            promise = input.pipe(operators.first()).toPromise();
            if (!(promise instanceof Promise)) {
                promise = input.pipe(operators.take(1)).toPromise();
            }
            if (!(promise instanceof Promise)) {
                throw new Error("Something went wrong, Angular-Slickgrid " + fromServiceName + " is not able to convert the Observable into a Promise.\n        If you are using Angular HttpClient, you could try converting your http call to a Promise with \".toPromise()\"\n        for example::  this.http.post('graphql', { query: graphqlQuery }).toPromise()\n        ");
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
    function findOrDefault(array, logic, defaultVal) {
        if (defaultVal === void 0) {
            defaultVal = {};
        }
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
        /** @type {?} */
        var minDec = (minDecimal === undefined) ? 2 : minDecimal;
        /** @type {?} */
        var maxDec = (maxDecimal === undefined) ? 2 : maxDecimal;
        /** @type {?} */
        var amount = String(Math.round(+input * Math.pow(10, maxDec)) / Math.pow(10, maxDec));
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
        return path.split('.').reduce(function (acc, part) { return acc && acc[part]; }, obj);
    }
    /**
     * Get the browser's scrollbar width, this is different to each browser
     * @return {?}
     */
    function getScrollBarWidth() {
        /** @type {?} */
        var $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body');
        /** @type {?} */
        var widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
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
        /** @type {?} */
        var map;
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
        /** @type {?} */
        var map;
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
        /** @type {?} */
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
    /**
     * Mapper for query operator by a Filter Type
     * For example a multiple-select typically uses 'IN' operator
     * @param {?} fieldType
     * @return {?} string map
     */
    function mapOperatorByFieldType(fieldType) {
        /** @type {?} */
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
    /**
     * Parse a date passed as a string and return a Date object (if valid)
     * @param {?} inputDateString
     * @param {?} useUtc
     * @return {?} string date formatted
     */
    function parseUtcDate(inputDateString, useUtc) {
        /** @type {?} */
        var date = null;
        if (/^[0-9\-\/]*$/.test(inputDateString)) {
            // get the UTC datetime with moment.js but we need to decode the value so that it's valid text
            /** @type {?} */
            var dateString = decodeURIComponent(inputDateString);
            /** @type {?} */
            var dateMoment = moment(new Date(dateString));
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
        /** @type {?} */
        var temp = document.createElement('div');
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
        return str.replace(/(?:^\w|[A-Z]|\b\w|[\s+\-_\/])/g, function (match, offset) {
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
        return arr.filter(function (item, index) {
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
            subscriptions.forEach(function (subscription) {
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$1 = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /**
     * @param {?} value1
     * @param {?} value2
     * @param {?} format
     * @param {?} sortDirection
     * @param {?=} strict
     * @return {?}
     */
    function compareDates(value1, value2, format, sortDirection, strict) {
        /** @type {?} */
        var diff = 0;
        if (value1 === null || value1 === '' || !moment$1(value1, format, strict).isValid()) {
            diff = -1;
        }
        else if (value2 === null || value2 === '' || !moment$1(value2, format, strict).isValid()) {
            diff = 1;
        }
        else {
            /** @type {?} */
            var date1 = moment$1(value1, format, strict);
            /** @type {?} */
            var date2 = moment$1(value2, format, strict);
            diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
        }
        return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
    /** @type {?} */
    var dateUsShortSorter = function (value1, value2, sortDirection) {
        return compareDates(value1, value2, FORMAT, sortDirection, true);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$2 = moment_;
    /** @type {?} */
    var dateSorter = function (value1, value2, sortDirection) {
        return compareDates(value1, value2, moment$2.ISO_8601, sortDirection);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var FORMAT$1 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
    /** @type {?} */
    var dateIsoSorter = function (value1, value2, sortDirection) {
        return compareDates(value1, value2, FORMAT$1, sortDirection, true);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var FORMAT$2 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
    /** @type {?} */
    var dateUsSorter = function (value1, value2, sortDirection) {
        return compareDates(value1, value2, FORMAT$2, sortDirection, true);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var numericSorter = function (value1, value2, sortDirection) {
        /** @type {?} */
        var x = (isNaN(value1) || value1 === '' || value1 === null) ? -99e+10 : parseFloat(value1);
        /** @type {?} */
        var y = (isNaN(value2) || value2 === '' || value2 === null) ? -99e+10 : parseFloat(value2);
        return sortDirection * (x === y ? 0 : (x > y ? 1 : -1));
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var stringSorter = function (value1, value2, sortDirection) {
        /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var Sorters = {
        date: dateSorter,
        dateIso: dateIsoSorter,
        dateUs: dateUsSorter,
        dateUsShort: dateUsShortSorter,
        numeric: numericSorter,
        string: stringSorter
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} value1
     * @param {?} value2
     * @param {?} fieldType
     * @param {?} sortDirection
     * @return {?}
     */
    function sortByFieldType(value1, value2, fieldType, sortDirection) {
        /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CollectionService = /** @class */ (function () {
        function CollectionService(translate) {
            this.translate = translate;
        }
        /**
         * Filter 1 or more items from a collection
         * @param collection
         * @param filterByOptions
         */
        /**
         * Filter 1 or more items from a collection
         * @param {?} collection
         * @param {?} filterByOptions
         * @param {?=} filterResultBy
         * @return {?}
         */
        CollectionService.prototype.filterCollection = /**
         * Filter 1 or more items from a collection
         * @param {?} collection
         * @param {?} filterByOptions
         * @param {?=} filterResultBy
         * @return {?}
         */
            function (collection, filterByOptions, filterResultBy) {
                if (filterResultBy === void 0) {
                    filterResultBy = FilterMultiplePassType.chain;
                }
                var e_1, _a;
                /** @type {?} */
                var filteredCollection = [];
                // when it's array, we will use the new filtered collection after every pass
                // basically if input collection has 10 items on 1st pass and 1 item is filtered out, then on 2nd pass the input collection will be 9 items
                if (Array.isArray(filterByOptions)) {
                    filteredCollection = (filterResultBy === FilterMultiplePassType.merge) ? [] : collection;
                    try {
                        for (var filterByOptions_1 = __values(filterByOptions), filterByOptions_1_1 = filterByOptions_1.next(); !filterByOptions_1_1.done; filterByOptions_1_1 = filterByOptions_1.next()) {
                            var filter = filterByOptions_1_1.value;
                            if (filterResultBy === FilterMultiplePassType.merge) {
                                /** @type {?} */
                                var filteredPass = this.singleFilterCollection(collection, filter);
                                filteredCollection = uniqueArray(__spread(filteredCollection, filteredPass));
                            }
                            else {
                                filteredCollection = this.singleFilterCollection(filteredCollection, filter);
                            }
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (filterByOptions_1_1 && !filterByOptions_1_1.done && (_a = filterByOptions_1.return))
                                _a.call(filterByOptions_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                }
                else {
                    filteredCollection = this.singleFilterCollection(collection, filterByOptions);
                }
                return filteredCollection;
            };
        /**
         * Filter an item from a collection
         * @param collection
         * @param filterBy
         */
        /**
         * Filter an item from a collection
         * @param {?} collection
         * @param {?} filterBy
         * @return {?}
         */
        CollectionService.prototype.singleFilterCollection = /**
         * Filter an item from a collection
         * @param {?} collection
         * @param {?} filterBy
         * @return {?}
         */
            function (collection, filterBy) {
                /** @type {?} */
                var filteredCollection = [];
                if (filterBy) {
                    /** @type {?} */
                    var property_1 = filterBy.property || '';
                    /** @type {?} */
                    var operator = filterBy.operator || OperatorType.equal;
                    // just check for undefined since the filter value could be null, 0, '', false etc
                    /** @type {?} */
                    var value_1 = typeof filterBy.value === 'undefined' ? '' : filterBy.value;
                    switch (operator) {
                        case OperatorType.equal:
                            filteredCollection = collection.filter(function (item) { return item[property_1] === value_1; });
                            break;
                        case OperatorType.contains:
                            filteredCollection = collection.filter(function (item) { return item[property_1].toString().indexOf(value_1.toString()) !== -1; });
                            break;
                        case OperatorType.notContains:
                            filteredCollection = collection.filter(function (item) { return item[property_1].toString().indexOf(value_1.toString()) === -1; });
                            break;
                        case OperatorType.notEqual:
                        default:
                            filteredCollection = collection.filter(function (item) { return item[property_1] !== value_1; });
                    }
                }
                return filteredCollection;
            };
        /**
         * Sort 1 or more items in a collection
         * @param collection
         * @param sortByOptions
         * @param enableTranslateLabel
         */
        /**
         * Sort 1 or more items in a collection
         * @param {?} collection
         * @param {?} sortByOptions
         * @param {?=} enableTranslateLabel
         * @return {?}
         */
        CollectionService.prototype.sortCollection = /**
         * Sort 1 or more items in a collection
         * @param {?} collection
         * @param {?} sortByOptions
         * @param {?=} enableTranslateLabel
         * @return {?}
         */
            function (collection, sortByOptions, enableTranslateLabel) {
                var _this = this;
                /** @type {?} */
                var sortedCollection = [];
                if (sortByOptions) {
                    if (Array.isArray(sortByOptions)) {
                        // multi-sort
                        sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                            for (var i = 0, l = sortByOptions.length; i < l; i++) {
                                /** @type {?} */
                                var sortBy = sortByOptions[i];
                                if (sortBy) {
                                    /** @type {?} */
                                    var sortDirection = sortBy.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                                    /** @type {?} */
                                    var propertyName = sortBy.property || '';
                                    /** @type {?} */
                                    var fieldType = sortBy.fieldType || FieldType.string;
                                    /** @type {?} */
                                    var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                                    /** @type {?} */
                                    var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                                    /** @type {?} */
                                    var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
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
                        /** @type {?} */
                        var propertyName_1 = sortByOptions.property || '';
                        /** @type {?} */
                        var sortDirection_1 = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                        /** @type {?} */
                        var fieldType_1 = sortByOptions.fieldType || FieldType.string;
                        sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                            /** @type {?} */
                            var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[propertyName_1] || ' ') : dataRow1[propertyName_1];
                            /** @type {?} */
                            var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[propertyName_1] || ' ') : dataRow2[propertyName_1];
                            /** @type {?} */
                            var sortResult = sortByFieldType(value1, value2, fieldType_1, sortDirection_1);
                            if (sortResult !== SortDirectionNumber.neutral) {
                                return sortResult;
                            }
                            return SortDirectionNumber.neutral;
                        });
                    }
                }
                return sortedCollection;
            };
        CollectionService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CollectionService.ctorParameters = function () {
            return [
                { type: core$1.TranslateService }
            ];
        };
        return CollectionService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ExportService = /** @class */ (function () {
        function ExportService(translate) {
            this.translate = translate;
            this._lineCarriageReturn = '\n';
            this._hasGroupedItems = false;
            this.onGridBeforeExportToFile = new rxjs.Subject();
            this.onGridAfterExportToFile = new rxjs.Subject();
        }
        Object.defineProperty(ExportService.prototype, "datasetIdName", {
            get: /**
             * @private
             * @return {?}
             */ function () {
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
             */ function () {
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
                    outputData = new textEncodingUtf8.TextEncoder('utf-8').encode(csvContent);
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ExportService.ctorParameters = function () {
            return [
                { type: core$1.TranslateService }
            ];
        };
        return ExportService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Constants = /** @class */ (function () {
        function Constants() {
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
        Constants.TEXT_TOGGLE_PRE_HEADER_ROW = 'Toggle Pre-Header Row';
        Constants.VALIDATION_EDITOR_VALID_NUMBER = 'Please enter a valid number';
        Constants.VALIDATION_EDITOR_VALID_INTEGER = 'Please enter a valid integer number';
        Constants.VALIDATION_EDITOR_NUMBER_BETWEEN = 'Please enter a valid number between {{minValue}} and {{maxValue}}';
        Constants.VALIDATION_EDITOR_NUMBER_MAX = 'Please enter a valid number that is lower than {{maxValue}}';
        Constants.VALIDATION_EDITOR_NUMBER_MIN = 'Please enter a valid number that is greater than {{minValue}}';
        Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN = 'Please enter a valid number with a maximum of {{maxDecimal}} decimals';
        return Constants;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SharedService = /** @class */ (function () {
        function SharedService() {
        }
        Object.defineProperty(SharedService.prototype, "allColumns", {
            // --
            // public
            /** Getter for All Columns  in the grid (hidden/visible) */
            get: 
            // --
            // public
            /**
             * Getter for All Columns  in the grid (hidden/visible)
             * @return {?}
             */
            function () {
                return this._allColumns;
            },
            /** Setter for All Columns  in the grid (hidden/visible) */
            set: /**
             * Setter for All Columns  in the grid (hidden/visible)
             * @param {?} allColumns
             * @return {?}
             */ function (allColumns) {
                this._allColumns = allColumns;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "columnDefinitions", {
            /** Getter for the Column Definitions pulled through the Grid Object */
            get: /**
             * Getter for the Column Definitions pulled through the Grid Object
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "dataView", {
            /** Getter for SlickGrid DataView object */
            get: /**
             * Getter for SlickGrid DataView object
             * @return {?}
             */ function () {
                return this._dataView;
            },
            /** Setter for SlickGrid DataView object */
            set: /**
             * Setter for SlickGrid DataView object
             * @param {?} dataView
             * @return {?}
             */ function (dataView) {
                this._dataView = dataView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "grid", {
            /** Getter for SlickGrid Grid object */
            get: /**
             * Getter for SlickGrid Grid object
             * @return {?}
             */ function () {
                return this._grid;
            },
            /** Setter for SlickGrid Grid object */
            set: /**
             * Setter for SlickGrid Grid object
             * @param {?} grid
             * @return {?}
             */ function (grid) {
                this._grid = grid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            /** Setter for the Grid Options pulled through the Grid Object */
            set: /**
             * Setter for the Grid Options pulled through the Grid Object
             * @param {?} gridOptions
             * @return {?}
             */ function (gridOptions) {
                this.gridOptions = gridOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "groupItemMetadataProvider", {
            /** Getter for the Grid Options */
            get: /**
             * Getter for the Grid Options
             * @return {?}
             */ function () {
                return this._groupItemMetadataProvider;
            },
            /** Setter for the Grid Options */
            set: /**
             * Setter for the Grid Options
             * @param {?} groupItemMetadataProvider
             * @return {?}
             */ function (groupItemMetadataProvider) {
                this._groupItemMetadataProvider = groupItemMetadataProvider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "visibleColumns", {
            /** Getter for the Visible Columns in the grid */
            get: /**
             * Getter for the Visible Columns in the grid
             * @return {?}
             */ function () {
                return this._visibleColumns;
            },
            /** Setter for the Visible Columns in the grid */
            set: /**
             * Setter for the Visible Columns in the grid
             * @param {?} visibleColumns
             * @return {?}
             */ function (visibleColumns) {
                this._visibleColumns = visibleColumns;
            },
            enumerable: true,
            configurable: true
        });
        return SharedService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ExtensionUtility = /** @class */ (function () {
        function ExtensionUtility(sharedService, translate) {
            this.sharedService = sharedService;
            this.translate = translate;
        }
        /**
         * Remove a column from the grid by it's index in the grid
         * @param array input
         * @param index
         */
        /**
         * Remove a column from the grid by it's index in the grid
         * @param {?} array input
         * @param {?} index
         * @return {?}
         */
        ExtensionUtility.prototype.arrayRemoveItemByIndex = /**
         * Remove a column from the grid by it's index in the grid
         * @param {?} array input
         * @param {?} index
         * @return {?}
         */
            function (array, index) {
                return array.filter(function (el, i) {
                    return index !== i;
                });
            };
        /**
         * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
         * This will basically only load the extension when user enables the feature
         * @param extensionName
         */
        /**
         * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
         * This will basically only load the extension when user enables the feature
         * @param {?} extensionName
         * @return {?}
         */
        ExtensionUtility.prototype.loadExtensionDynamically = /**
         * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
         * This will basically only load the extension when user enables the feature
         * @param {?} extensionName
         * @return {?}
         */
            function (extensionName) {
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
                        case ExtensionName.draggableGrouping:
                            require('slickgrid/plugins/slick.draggablegrouping.js');
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
                catch (e) {
                    // do nothing, we fall here when using Aurelia-CLI and RequireJS
                    // if you do use RequireJS then you need to make sure to include all necessary extensions in your `aurelia.json`
                }
            };
        /**
         * From a Grid Menu object property name, we will return the correct title output string following this order
         * 1- if user provided a title, use it as the output title
         * 2- else if user provided a title key, use it to translate the output title
         * 3- else if nothing is provided use
         */
        /**
         * From a Grid Menu object property name, we will return the correct title output string following this order
         * 1- if user provided a title, use it as the output title
         * 2- else if user provided a title key, use it to translate the output title
         * 3- else if nothing is provided use
         * @param {?} propName
         * @param {?} pickerName
         * @return {?}
         */
        ExtensionUtility.prototype.getPickerTitleOutputString = /**
         * From a Grid Menu object property name, we will return the correct title output string following this order
         * 1- if user provided a title, use it as the output title
         * 2- else if user provided a title key, use it to translate the output title
         * 3- else if nothing is provided use
         * @param {?} propName
         * @param {?} pickerName
         * @return {?}
         */
            function (propName, pickerName) {
                /** @type {?} */
                var output = '';
                /** @type {?} */
                var picker = this.sharedService.gridOptions && this.sharedService.gridOptions[pickerName] || {};
                /** @type {?} */
                var enableTranslate = this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate || false;
                /** @type {?} */
                var title = picker && picker[propName];
                /** @type {?} */
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
        /**
         * Sort items in an array by a property name
         * @params items array
         * @param property name to sort with
         * @return sorted array
         */
        /**
         * Sort items in an array by a property name
         * \@params items array
         * @param {?} items
         * @param {?} propertyName
         * @return {?} sorted array
         */
        ExtensionUtility.prototype.sortItems = /**
         * Sort items in an array by a property name
         * \@params items array
         * @param {?} items
         * @param {?} propertyName
         * @return {?} sorted array
         */
            function (items, propertyName) {
                // sort the custom items by their position in the list
                items.sort(function (itemA, itemB) {
                    if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
                        return itemA[propertyName] - itemB[propertyName];
                    }
                    return 0;
                });
            };
        /** Translate the an array of items from an input key and assign to the output key */
        /**
         * Translate the an array of items from an input key and assign to the output key
         * @param {?} items
         * @param {?} inputKey
         * @param {?} outputKey
         * @return {?}
         */
        ExtensionUtility.prototype.translateItems = /**
         * Translate the an array of items from an input key and assign to the output key
         * @param {?} items
         * @param {?} inputKey
         * @param {?} outputKey
         * @return {?}
         */
            function (items, inputKey, outputKey) {
                var e_1, _a;
                try {
                    for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                        var item = items_1_1.value;
                        if (item[inputKey]) {
                            item[outputKey] = this.translate.instant(item[inputKey]);
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (items_1_1 && !items_1_1.done && (_a = items_1.return))
                            _a.call(items_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            };
        ExtensionUtility.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ExtensionUtility.ctorParameters = function () {
            return [
                { type: SharedService },
                { type: core$1.TranslateService }
            ];
        };
        return ExtensionUtility;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AutoTooltipExtension = /** @class */ (function () {
        function AutoTooltipExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
        }
        /**
         * @return {?}
         */
        AutoTooltipExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        /**
         * @return {?}
         */
        AutoTooltipExtension.prototype.register = /**
         * @return {?}
         */
            function () {
                if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                    // dynamically import the SlickGrid plugin with requireJS
                    this.extensionUtility.loadExtensionDynamically(ExtensionName.autoTooltip);
                    this._extension = new Slick.AutoTooltips(this.sharedService.gridOptions.autoTooltipOptions || {});
                    this.sharedService.grid.registerPlugin(this._extension);
                    return this._extension;
                }
                return null;
            };
        AutoTooltipExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AutoTooltipExtension.ctorParameters = function () {
            return [
                { type: ExtensionUtility },
                { type: SharedService }
            ];
        };
        return AutoTooltipExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CellExternalCopyManagerExtension = /** @class */ (function () {
        function CellExternalCopyManagerExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
        }
        /**
         * @return {?}
         */
        CellExternalCopyManagerExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        /**
         * @return {?}
         */
        CellExternalCopyManagerExtension.prototype.register = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                    // dynamically import the SlickGrid plugin with requireJS
                    this.extensionUtility.loadExtensionDynamically(ExtensionName.cellExternalCopyManager);
                    this.createUndoRedoBuffer();
                    this.hookUndoShortcutKey();
                    /** @type {?} */
                    var newRowIds_1 = 0;
                    /** @type {?} */
                    var pluginOptions = {
                        clipboardCommandHandler: function (editCommand) {
                            _this._undoRedoBuffer.queueAndExecuteCommand.call(_this._undoRedoBuffer, editCommand);
                        },
                        dataItemColumnValueExtractor: function (item, columnDef) {
                            // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
                            // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
                            if (!_this.sharedService.gridOptions.editable || !columnDef.editor) {
                                /** @type {?} */
                                var isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : (_this.sharedService.gridOptions.exportOptions && _this.sharedService.gridOptions.exportOptions.exportWithFormatter);
                                if (columnDef.formatter && isEvaluatingFormatter) {
                                    /** @type {?} */
                                    var formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, _this.sharedService.grid);
                                    if (columnDef.sanitizeDataExport || (_this.sharedService.gridOptions.exportOptions && _this.sharedService.gridOptions.exportOptions.sanitizeDataExport)) {
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
                        newRowCreator: function (count) {
                            for (var i = 0; i < count; i++) {
                                /** @type {?} */
                                var item = {
                                    id: 'newRow_' + newRowIds_1++
                                };
                                _this.sharedService.grid.getData().addItem(item);
                            }
                        }
                    };
                    this.sharedService.grid.setSelectionModel(new Slick.CellSelectionModel());
                    this._extension = new Slick.CellExternalCopyManager(pluginOptions);
                    this.sharedService.grid.registerPlugin(this._extension);
                    return this._extension;
                }
                return null;
            };
        /** Create an undo redo buffer used by the Excel like copy */
        /**
         * Create an undo redo buffer used by the Excel like copy
         * @private
         * @return {?}
         */
        CellExternalCopyManagerExtension.prototype.createUndoRedoBuffer = /**
         * Create an undo redo buffer used by the Excel like copy
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var commandQueue = [];
                /** @type {?} */
                var commandCtr = 0;
                this._undoRedoBuffer = {
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
                        /** @type {?} */
                        var command = commandQueue[commandCtr];
                        if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                            command.undo();
                        }
                    },
                    redo: function () {
                        if (commandCtr >= commandQueue.length) {
                            return;
                        }
                        /** @type {?} */
                        var command = commandQueue[commandCtr];
                        commandCtr++;
                        if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                            command.execute();
                        }
                    }
                };
            };
        /** Attach an undo shortcut key hook that will redo/undo the copy buffer */
        /**
         * Attach an undo shortcut key hook that will redo/undo the copy buffer
         * @private
         * @return {?}
         */
        CellExternalCopyManagerExtension.prototype.hookUndoShortcutKey = /**
         * Attach an undo shortcut key hook that will redo/undo the copy buffer
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                // undo shortcut
                $(document).keydown(function (e) {
                    if (e.which === 90 && (e.ctrlKey || e.metaKey)) { // CTRL + (shift) + Z
                        if (e.shiftKey) {
                            _this._undoRedoBuffer.redo();
                        }
                        else {
                            _this._undoRedoBuffer.undo();
                        }
                    }
                });
            };
        CellExternalCopyManagerExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CellExternalCopyManagerExtension.ctorParameters = function () {
            return [
                { type: ExtensionUtility },
                { type: SharedService }
            ];
        };
        return CellExternalCopyManagerExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CheckboxSelectorExtension = /** @class */ (function () {
        function CheckboxSelectorExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
        }
        /**
         * @return {?}
         */
        CheckboxSelectorExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        /**
         * Attach/Create different plugins before the Grid creation.
         * For example the multi-select have to be added to the column definition before the grid is created to work properly
         */
        /**
         * Attach/Create different plugins before the Grid creation.
         * For example the multi-select have to be added to the column definition before the grid is created to work properly
         * @param {?} columnDefinitions
         * @param {?} gridOptions
         * @return {?}
         */
        CheckboxSelectorExtension.prototype.create = /**
         * Attach/Create different plugins before the Grid creation.
         * For example the multi-select have to be added to the column definition before the grid is created to work properly
         * @param {?} columnDefinitions
         * @param {?} gridOptions
         * @return {?}
         */
            function (columnDefinitions, gridOptions) {
                if (columnDefinitions && gridOptions) {
                    // dynamically import the SlickGrid plugin with requireJS
                    this.extensionUtility.loadExtensionDynamically(ExtensionName.checkboxSelector);
                    if (!this._extension) {
                        this._extension = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
                    }
                    /** @type {?} */
                    var selectionColumn = this._extension.getColumnDefinition();
                    selectionColumn.excludeFromExport = true;
                    selectionColumn.excludeFromQuery = true;
                    selectionColumn.excludeFromHeaderMenu = true;
                    columnDefinitions.unshift(selectionColumn);
                    return this._extension;
                }
                return null;
            };
        /**
         * @param {?=} rowSelectionPlugin
         * @return {?}
         */
        CheckboxSelectorExtension.prototype.register = /**
         * @param {?=} rowSelectionPlugin
         * @return {?}
         */
            function (rowSelectionPlugin) {
                var _this = this;
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
                        setTimeout(function () { return _this._extension.selectRows(_this.sharedService.gridOptions.preselectedRows); }, 0);
                    }
                    return rowSelectionPlugin;
                }
                return null;
            };
        CheckboxSelectorExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CheckboxSelectorExtension.ctorParameters = function () {
            return [
                { type: ExtensionUtility },
                { type: SharedService }
            ];
        };
        return CheckboxSelectorExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ColumnPickerExtension = /** @class */ (function () {
        function ColumnPickerExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
            this._eventHandler = new Slick.EventHandler();
        }
        /**
         * @return {?}
         */
        ColumnPickerExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                // unsubscribe all SlickGrid events
                this._eventHandler.unsubscribeAll();
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        /**
         * @return {?}
         */
        ColumnPickerExtension.prototype.register = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                    // dynamically import the SlickGrid plugin with requireJS
                    this.extensionUtility.loadExtensionDynamically(ExtensionName.columnPicker);
                    // localization support for the picker
                    /** @type {?} */
                    var columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
                    /** @type {?} */
                    var forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
                    /** @type {?} */
                    var syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
                    this.sharedService.gridOptions.columnPicker = this.sharedService.gridOptions.columnPicker || {};
                    this.sharedService.gridOptions.columnPicker.columnTitle = this.sharedService.gridOptions.columnPicker.columnTitle || columnTitle;
                    this.sharedService.gridOptions.columnPicker.forceFitTitle = this.sharedService.gridOptions.columnPicker.forceFitTitle || forceFitTitle;
                    this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.sharedService.gridOptions.columnPicker.syncResizeTitle || syncResizeTitle;
                    this._extension = new Slick.Controls.ColumnPicker(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
                    if (this.sharedService.grid && this.sharedService.gridOptions.enableColumnPicker) {
                        this._eventHandler.subscribe(this._extension.onColumnsChanged, function (e, args) {
                            if (_this.sharedService.gridOptions.columnPicker && typeof _this.sharedService.gridOptions.columnPicker.onColumnsChanged === 'function') {
                                _this.sharedService.gridOptions.columnPicker.onColumnsChanged(e, args);
                            }
                        });
                    }
                    return this._extension;
                }
            };
        /** Translate the Column Picker and it's last 2 checkboxes */
        /**
         * Translate the Column Picker and it's last 2 checkboxes
         * @return {?}
         */
        ColumnPickerExtension.prototype.translateColumnPicker = /**
         * Translate the Column Picker and it's last 2 checkboxes
         * @return {?}
         */
            function () {
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
            };
        /**
         * @private
         * @return {?}
         */
        ColumnPickerExtension.prototype.emptyColumnPickerTitles = /**
         * @private
         * @return {?}
         */
            function () {
                if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.columnPicker) {
                    this.sharedService.gridOptions.columnPicker.columnTitle = '';
                    this.sharedService.gridOptions.columnPicker.forceFitTitle = '';
                    this.sharedService.gridOptions.columnPicker.syncResizeTitle = '';
                }
            };
        ColumnPickerExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ColumnPickerExtension.ctorParameters = function () {
            return [
                { type: ExtensionUtility },
                { type: SharedService }
            ];
        };
        return ColumnPickerExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DraggableGroupingExtension = /** @class */ (function () {
        function DraggableGroupingExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
            this._eventHandler = new Slick.EventHandler();
        }
        /**
         * @return {?}
         */
        DraggableGroupingExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                // unsubscribe all SlickGrid events
                this._eventHandler.unsubscribeAll();
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        /**
         * Attach/Create different plugins before the Grid creation.
         * For example the multi-select have to be added to the column definition before the grid is created to work properly
         */
        /**
         * Attach/Create different plugins before the Grid creation.
         * For example the multi-select have to be added to the column definition before the grid is created to work properly
         * @param {?} gridOptions
         * @return {?}
         */
        DraggableGroupingExtension.prototype.create = /**
         * Attach/Create different plugins before the Grid creation.
         * For example the multi-select have to be added to the column definition before the grid is created to work properly
         * @param {?} gridOptions
         * @return {?}
         */
            function (gridOptions) {
                // dynamically import the SlickGrid plugin with requireJS
                this.extensionUtility.loadExtensionDynamically(ExtensionName.draggableGrouping);
                if (!this._extension && gridOptions) {
                    this._extension = new Slick.DraggableGrouping(gridOptions.draggableGrouping || {});
                }
                return this._extension;
            };
        /**
         * @return {?}
         */
        DraggableGroupingExtension.prototype.register = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                    this.sharedService.grid.registerPlugin(this._extension);
                    // Events
                    if (this.sharedService.grid && this.sharedService.gridOptions.draggableGrouping) {
                        if (this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered) {
                            this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered(this._extension);
                        }
                        this._eventHandler.subscribe(this._extension.onGroupChanged, function (e, args) {
                            if (_this.sharedService.gridOptions.draggableGrouping && typeof _this.sharedService.gridOptions.draggableGrouping.onGroupChanged === 'function') {
                                _this.sharedService.gridOptions.draggableGrouping.onGroupChanged(e, args);
                            }
                        });
                    }
                    return this._extension;
                }
                return null;
            };
        DraggableGroupingExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DraggableGroupingExtension.ctorParameters = function () {
            return [
                { type: ExtensionUtility },
                { type: SharedService }
            ];
        };
        return DraggableGroupingExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} str
     * @return {?}
     */
    function parseBoolean(str) {
        return /(true|1)/i.test(str + '');
    }
    /** @type {?} */
    var booleanFilterCondition = function (options) {
        /** @type {?} */
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        return parseBoolean(options.cellValue) === parseBoolean(searchTerm);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$3 = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var dateFilterCondition = function (options) {
        /** @type {?} */
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        /** @type {?} */
        var filterSearchType = options.filterSearchType || FieldType.dateIso;
        /** @type {?} */
        var searchDateFormat = mapMomentDateFormatWithFieldType(filterSearchType);
        if (searchTerm === null || searchTerm === '' || !moment$3(options.cellValue, moment$3.ISO_8601).isValid() || !moment$3(searchTerm, searchDateFormat, true).isValid()) {
            return false;
        }
        /** @type {?} */
        var dateCell = moment$3(options.cellValue);
        /** @type {?} */
        var dateSearch = moment$3(searchTerm);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$4 = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$3 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
    /** @type {?} */
    var dateIsoFilterCondition = function (options) {
        /** @type {?} */
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        if (searchTerm === null || searchTerm === '' || !moment$4(options.cellValue, FORMAT$3, true).isValid() || !moment$4(searchTerm, FORMAT$3, true).isValid()) {
            return false;
        }
        /** @type {?} */
        var dateCell = moment$4(options.cellValue, FORMAT$3, true);
        /** @type {?} */
        var dateSearch = moment$4(searchTerm, FORMAT$3, true);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$5 = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$4 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
    /** @type {?} */
    var dateUsFilterCondition = function (options) {
        /** @type {?} */
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        if (searchTerm === null || searchTerm === '' || !moment$5(options.cellValue, FORMAT$4, true).isValid() || !moment$5(searchTerm, FORMAT$4, true).isValid()) {
            return false;
        }
        /** @type {?} */
        var dateCell = moment$5(options.cellValue, FORMAT$4, true);
        /** @type {?} */
        var dateSearch = moment$5(searchTerm, FORMAT$4, true);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$6 = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$5 = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
    /** @type {?} */
    var dateUsShortFilterCondition = function (options) {
        /** @type {?} */
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        if (searchTerm === null || searchTerm === '' || !moment$6(options.cellValue, FORMAT$5, true).isValid() || !moment$6(searchTerm, FORMAT$5, true).isValid()) {
            return false;
        }
        /** @type {?} */
        var dateCell = moment$6(options.cellValue, FORMAT$5, true);
        /** @type {?} */
        var dateSearch = moment$6(searchTerm, FORMAT$5, true);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$7 = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var dateUtcFilterCondition = function (options) {
        /** @type {?} */
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        /** @type {?} */
        var searchDateFormat = mapMomentDateFormatWithFieldType(options.filterSearchType || options.fieldType);
        if (!moment$7(options.cellValue, moment$7.ISO_8601).isValid() || !moment$7(searchTerm, searchDateFormat, true).isValid()) {
            return false;
        }
        /** @type {?} */
        var dateCell = moment$7(options.cellValue, moment$7.ISO_8601, true);
        /** @type {?} */
        var dateSearch = moment$7(searchTerm, searchDateFormat, true);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var collectionSearchFilterCondition = function (options) {
        // multiple-select will always return text, so we should make our cell values text as well
        /** @type {?} */
        var cellValue = options.cellValue + '';
        return testFilterCondition(options.operator || 'IN', cellValue, options.searchTerms || []);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var numberFilterCondition = function (options) {
        /** @type {?} */
        var cellValue = parseFloat(options.cellValue);
        /** @type {?} */
        var searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || 0;
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var stringFilterCondition = function (options) {
        // make sure the cell value is a string by casting it when possible
        options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();
        // make both the cell value and search value lower for case insensitive comparison
        /** @type {?} */
        var cellValue = options.cellValue.toLowerCase();
        /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var executeMappedCondition = function (options) {
        // when using a multi-select ('IN' operator) we will not use the field type but instead go directly with a collection search
        /** @type {?} */
        var operator = options.operator && options.operator.toUpperCase();
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    require('flatpickr');
    var CompoundDateFilter = /** @class */ (function () {
        function CompoundDateFilter(translate) {
            this.translate = translate;
            this._clearFilterTriggered = false;
        }
        Object.defineProperty(CompoundDateFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundDateFilter.prototype, "operator", {
            get: /**
             * @return {?}
             */ function () {
                return this._operator || OperatorType.empty;
            },
            set: /**
             * @param {?} op
             * @return {?}
             */ function (op) {
                this._operator = op;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
        CompoundDateFilter.prototype.init = /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
            function (args) {
                var _this = this;
                if (args) {
                    this.grid = args.grid;
                    this.callback = args.callback;
                    this.columnDef = args.columnDef;
                    this.operator = args.operator || '';
                    this.searchTerms = args.searchTerms || [];
                    // date input can only have 1 search term, so we will use the 1st array index if it exist
                    /** @type {?} */
                    var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
                    // step 1, create the DOM Element of the filter which contain the compound Operator+Input
                    // and initialize it if searchTerm is filled
                    this.$filterElm = this.createDomElement(searchTerm);
                    // step 3, subscribe to the keyup event and run the callback when that happens
                    // also add/remove "filled" class for styling purposes
                    this.$filterInputElm.keyup(function (e) {
                        _this.onTriggerEvent(e);
                    });
                    this.$selectOperatorElm.change(function (e) {
                        _this.onTriggerEvent(e);
                    });
                }
            };
        /**
         * Clear the filter value
         */
        /**
         * Clear the filter value
         * @return {?}
         */
        CompoundDateFilter.prototype.clear = /**
         * Clear the filter value
         * @return {?}
         */
            function () {
                if (this.flatInstance && this.$selectOperatorElm) {
                    this._clearFilterTriggered = true;
                    this.searchTerms = [];
                    this.$selectOperatorElm.val(0);
                    this.flatInstance.clear();
                }
            };
        /**
         * destroy the filter
         */
        /**
         * destroy the filter
         * @return {?}
         */
        CompoundDateFilter.prototype.destroy = /**
         * destroy the filter
         * @return {?}
         */
            function () {
                if (this.$filterElm) {
                    this.$filterElm.off('keyup').remove();
                }
            };
        /**
         * Set value(s) on the DOM element
         */
        /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
        CompoundDateFilter.prototype.setValues = /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
            function (values) {
                if (this.flatInstance && values && Array.isArray(values)) {
                    this.flatInstance.setDate(values[0]);
                }
            };
        //
        // private functions
        // ------------------
        //
        // private functions
        // ------------------
        /**
         * @private
         * @param {?=} searchTerm
         * @return {?}
         */
        CompoundDateFilter.prototype.buildDatePickerInput =
            //
            // private functions
            // ------------------
            /**
             * @private
             * @param {?=} searchTerm
             * @return {?}
             */
            function (searchTerm) {
                var _this = this;
                /** @type {?} */
                var inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
                /** @type {?} */
                var outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
                /** @type {?} */
                var currentLocale = this.translate.currentLang || 'en';
                if (currentLocale.length > 2) {
                    currentLocale = currentLocale.substring(0, 2);
                }
                /** @type {?} */
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
                        // when using the time picker, we can simulate a keyup event to avoid multiple backend request
                        // since backend request are only executed after user start typing, changing the time should be treated the same way
                        if (pickerOptions.enableTime) {
                            _this.onTriggerEvent(new CustomEvent('keyup'));
                        }
                        else {
                            _this.onTriggerEvent(undefined);
                        }
                    }
                };
                // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
                if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
                    pickerOptions.enableTime = true;
                }
                /** @type {?} */
                var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
                /** @type {?} */
                var $filterInputElm = $("<div class=\"flatpickr\"><input type=\"text\" class=\"form-control\" data-input placeholder=\"" + placeholder + "\"></div>");
                this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerOptions) : Flatpickr($filterInputElm, pickerOptions);
                return $filterInputElm;
            };
        /**
         * @private
         * @return {?}
         */
        CompoundDateFilter.prototype.buildSelectOperatorHtmlString = /**
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var optionValues = this.getOptionValues();
                /** @type {?} */
                var optionValueString = '';
                optionValues.forEach(function (option) {
                    optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
                });
                return "<select class=\"form-control\">" + optionValueString + "</select>";
            };
        /**
         * @private
         * @return {?}
         */
        CompoundDateFilter.prototype.getOptionValues = /**
         * @private
         * @return {?}
         */
            function () {
                return [
                    { operator: ( /** @type {?} */('')), description: '' },
                    { operator: ( /** @type {?} */('=')), description: '' },
                    { operator: ( /** @type {?} */('<')), description: '' },
                    { operator: ( /** @type {?} */('<=')), description: '' },
                    { operator: ( /** @type {?} */('>')), description: '' },
                    { operator: ( /** @type {?} */('>=')), description: '' },
                    { operator: ( /** @type {?} */('<>')), description: '' }
                ];
            };
        /**
         * Create the DOM element
         */
        /**
         * Create the DOM element
         * @private
         * @param {?=} searchTerm
         * @return {?}
         */
        CompoundDateFilter.prototype.createDomElement = /**
         * Create the DOM element
         * @private
         * @param {?=} searchTerm
         * @return {?}
         */
            function (searchTerm) {
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var $headerElm = this.grid.getHeaderRowColumn(fieldId);
                $($headerElm).empty();
                // create the DOM Select dropdown for the Operator
                this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
                this.$filterInputElm = this.buildDatePickerInput(searchTerm);
                /** @type {?} */
                var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
                /** @type {?} */
                var $containerInputGroup = $("<div class=\"input-group flatpickr\"></div>");
                /** @type {?} */
                var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
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
                $filterContainerElm.attr('id', "filter-" + fieldId);
                this.$filterInputElm.data('columnId', fieldId);
                if (this.operator) {
                    this.$selectOperatorElm.val(this.operator);
                }
                // if there's a search term, we will add the "filled" class for styling purposes
                if (searchTerm) {
                    $filterContainerElm.addClass('filled');
                    this._currentValue = ( /** @type {?} */(searchTerm));
                }
                // append the new DOM element to the header row
                if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
                    $filterContainerElm.appendTo($headerElm);
                }
                return $filterContainerElm;
            };
        /**
         * @private
         * @param {?} locale
         * @return {?}
         */
        CompoundDateFilter.prototype.loadFlatpickrLocale = /**
         * @private
         * @param {?} locale
         * @return {?}
         */
            function (locale) {
                // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
                if (this.gridOptions && this.gridOptions.params && this.gridOptions.params.flapickrLocale) {
                    return this.gridOptions.params.flapickrLocale;
                }
                else if (locale !== 'en') {
                    /** @type {?} */
                    var localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
                    return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
                }
                return 'en';
            };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        CompoundDateFilter.prototype.onTriggerEvent = /**
         * @private
         * @param {?} e
         * @return {?}
         */
            function (e) {
                if (this._clearFilterTriggered) {
                    this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
                    this._clearFilterTriggered = false; // reset flag for next use
                }
                else {
                    /** @type {?} */
                    var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
                    (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
                    this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '' });
                }
            };
        /**
         * @private
         * @return {?}
         */
        CompoundDateFilter.prototype.hide = /**
         * @private
         * @return {?}
         */
            function () {
                if (this.flatInstance && typeof this.flatInstance.close === 'function') {
                    this.flatInstance.close();
                }
            };
        /**
         * @private
         * @return {?}
         */
        CompoundDateFilter.prototype.show = /**
         * @private
         * @return {?}
         */
            function () {
                if (this.flatInstance && typeof this.flatInstance.open === 'function') {
                    this.flatInstance.open();
                }
            };
        return CompoundDateFilter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CompoundInputFilter = /** @class */ (function () {
        function CompoundInputFilter(translate) {
            this.translate = translate;
            this._clearFilterTriggered = false;
            this._inputType = 'text';
        }
        Object.defineProperty(CompoundInputFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundInputFilter.prototype, "inputType", {
            /** Getter of input type (text, number, password) */
            get: /**
             * Getter of input type (text, number, password)
             * @return {?}
             */ function () {
                return this._inputType;
            },
            /** Setter of input type (text, number, password) */
            set: /**
             * Setter of input type (text, number, password)
             * @param {?} type
             * @return {?}
             */ function (type) {
                this._inputType = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundInputFilter.prototype, "operator", {
            /** Getter of the Operator to use when doing the filter comparing */
            get: /**
             * Getter of the Operator to use when doing the filter comparing
             * @return {?}
             */ function () {
                return this._operator || OperatorType.empty;
            },
            /** Getter of the Operator to use when doing the filter comparing */
            set: /**
             * Getter of the Operator to use when doing the filter comparing
             * @param {?} op
             * @return {?}
             */ function (op) {
                this._operator = op;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
        CompoundInputFilter.prototype.init = /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
            function (args) {
                var _this = this;
                this.grid = args.grid;
                this.callback = args.callback;
                this.columnDef = args.columnDef;
                this.operator = args.operator;
                this.searchTerms = args.searchTerms || [];
                // filter input can only have 1 search term, so we will use the 1st array index if it exist
                /** @type {?} */
                var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
                // step 1, create the DOM Element of the filter which contain the compound Operator+Input
                // and initialize it if searchTerms is filled
                this.$filterElm = this.createDomElement(searchTerm);
                // step 3, subscribe to the keyup event and run the callback when that happens
                // also add/remove "filled" class for styling purposes
                this.$filterInputElm.on('keyup input change', function (e) {
                    _this.onTriggerEvent(e);
                });
                this.$selectOperatorElm.on('change', function (e) {
                    _this.onTriggerEvent(e);
                });
            };
        /**
         * Clear the filter value
         */
        /**
         * Clear the filter value
         * @return {?}
         */
        CompoundInputFilter.prototype.clear = /**
         * Clear the filter value
         * @return {?}
         */
            function () {
                if (this.$filterElm && this.$selectOperatorElm) {
                    this._clearFilterTriggered = true;
                    this.searchTerms = [];
                    this.$selectOperatorElm.val(0);
                    this.$filterInputElm.val('');
                    this.onTriggerEvent(null);
                }
            };
        /**
         * destroy the filter
         */
        /**
         * destroy the filter
         * @return {?}
         */
        CompoundInputFilter.prototype.destroy = /**
         * destroy the filter
         * @return {?}
         */
            function () {
                if (this.$filterElm && this.$selectOperatorElm) {
                    this.$filterElm.off('keyup input change').remove();
                    this.$selectOperatorElm.off('change');
                }
            };
        /**
         * Set value(s) on the DOM element
         */
        /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
        CompoundInputFilter.prototype.setValues = /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
            function (values) {
                if (values && Array.isArray(values)) {
                    this.$filterElm.val(values[0]);
                }
            };
        //
        // private functions
        // ------------------
        //
        // private functions
        // ------------------
        /**
         * @private
         * @return {?}
         */
        CompoundInputFilter.prototype.buildInputHtmlString =
            //
            // private functions
            // ------------------
            /**
             * @private
             * @return {?}
             */
            function () {
                /** @type {?} */
                var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
                return "<input class=\"form-control\" type=\"" + (this._inputType || 'text') + "\" placeholder=\"" + placeholder + "\" />";
            };
        /**
         * @private
         * @return {?}
         */
        CompoundInputFilter.prototype.buildSelectOperatorHtmlString = /**
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var optionValues = this.getOptionValues();
                /** @type {?} */
                var optionValueString = '';
                optionValues.forEach(function (option) {
                    optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
                });
                return "<select class=\"form-control\">" + optionValueString + "</select>";
            };
        /**
         * @private
         * @return {?}
         */
        CompoundInputFilter.prototype.getOptionValues = /**
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : FieldType.string;
                /** @type {?} */
                var optionValues = [];
                switch (type) {
                    case FieldType.string:
                        optionValues = [
                            { operator: ( /** @type {?} */('')), description: this.translate.instant('CONTAINS') },
                            { operator: ( /** @type {?} */('=')), description: this.translate.instant('EQUALS') },
                            { operator: ( /** @type {?} */('a*')), description: this.translate.instant('STARTS_WITH') },
                            { operator: ( /** @type {?} */('*z')), description: this.translate.instant('ENDS_WITH') },
                        ];
                        break;
                    default:
                        optionValues = [
                            { operator: ( /** @type {?} */('')), description: this.translate.instant('CONTAINS') },
                            { operator: ( /** @type {?} */('=')), description: '' },
                            { operator: ( /** @type {?} */('<')), description: '' },
                            { operator: ( /** @type {?} */('<=')), description: '' },
                            { operator: ( /** @type {?} */('>')), description: '' },
                            { operator: ( /** @type {?} */('>=')), description: '' },
                            { operator: ( /** @type {?} */('<>')), description: '' }
                        ];
                        break;
                }
                return optionValues;
            };
        /**
         * Create the DOM element
         */
        /**
         * Create the DOM element
         * @private
         * @param {?=} searchTerm
         * @return {?}
         */
        CompoundInputFilter.prototype.createDomElement = /**
         * Create the DOM element
         * @private
         * @param {?=} searchTerm
         * @return {?}
         */
            function (searchTerm) {
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var $headerElm = this.grid.getHeaderRowColumn(fieldId);
                $($headerElm).empty();
                // create the DOM Select dropdown for the Operator
                this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
                this.$filterInputElm = $(this.buildInputHtmlString());
                /** @type {?} */
                var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
                /** @type {?} */
                var $containerInputGroup = $("<div class=\"input-group\"></div>");
                /** @type {?} */
                var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
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
                $filterContainerElm.attr('id', "filter-" + fieldId);
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
            };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        CompoundInputFilter.prototype.onTriggerEvent = /**
         * @private
         * @param {?} e
         * @return {?}
         */
            function (e) {
                if (this._clearFilterTriggered) {
                    this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
                    this._clearFilterTriggered = false; // reset flag for next use
                }
                else {
                    /** @type {?} */
                    var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
                    /** @type {?} */
                    var value = this.$filterInputElm.val();
                    (value !== null && value !== undefined && value !== '') ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
                    this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
                }
            };
        return CompoundInputFilter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CompoundInputNumberFilter = /** @class */ (function (_super) {
        __extends(CompoundInputNumberFilter, _super);
        /** Initialize the Filter */
        function CompoundInputNumberFilter(translate) {
            var _this = _super.call(this, translate) || this;
            _this.translate = translate;
            _this.inputType = 'number';
            return _this;
        }
        return CompoundInputNumberFilter;
    }(CompoundInputFilter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CompoundInputPasswordFilter = /** @class */ (function (_super) {
        __extends(CompoundInputPasswordFilter, _super);
        /** Initialize the Filter */
        function CompoundInputPasswordFilter(translate) {
            var _this = _super.call(this, translate) || this;
            _this.translate = translate;
            _this.inputType = 'password';
            return _this;
        }
        return CompoundInputPasswordFilter;
    }(CompoundInputFilter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DEFAULT_MIN_VALUE = 0;
    /** @type {?} */
    var DEFAULT_MAX_VALUE = 100;
    /** @type {?} */
    var DEFAULT_STEP = 1;
    var CompoundSliderFilter = /** @class */ (function () {
        function CompoundSliderFilter() {
            this._clearFilterTriggered = false;
        }
        Object.defineProperty(CompoundSliderFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundSliderFilter.prototype, "filterParams", {
            /** Getter for the Filter Generic Params */
            get: /**
             * Getter for the Filter Generic Params
             * @private
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundSliderFilter.prototype, "filterProperties", {
            /** Getter for the `filter` properties */
            get: /**
             * Getter for the `filter` properties
             * @private
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.filter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundSliderFilter.prototype, "operator", {
            get: /**
             * @return {?}
             */ function () {
                return this._operator || OperatorType.empty;
            },
            set: /**
             * @param {?} op
             * @return {?}
             */ function (op) {
                this._operator = op;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
        CompoundSliderFilter.prototype.init = /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
            function (args) {
                var _this = this;
                if (args) {
                    this.grid = args.grid;
                    this.callback = args.callback;
                    this.columnDef = args.columnDef;
                    this.operator = args.operator || '';
                    this.searchTerms = args.searchTerms || [];
                    // define the input & slider number IDs
                    this._elementRangeInputId = "rangeInput_" + this.columnDef.field;
                    this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field;
                    // filter input can only have 1 search term, so we will use the 1st array index if it exist
                    /** @type {?} */
                    var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
                    // step 1, create the DOM Element of the filter which contain the compound Operator+Input
                    // and initialize it if searchTerm is filled
                    this.$filterElm = this.createDomElement(searchTerm);
                    // step 3, subscribe to the keyup event and run the callback when that happens
                    // also add/remove "filled" class for styling purposes
                    this.$filterInputElm.change(function (e) {
                        _this.onTriggerEvent(e);
                    });
                    this.$selectOperatorElm.change(function (e) {
                        _this.onTriggerEvent(e);
                    });
                    // if user chose to display the slider number on the right side, then update it every time it changes
                    // we need to use both "input" and "change" event to be all cross-browser
                    if (!this.filterParams.hideSliderNumber) {
                        this.$filterInputElm.on('input change', function (e) {
                            /** @type {?} */
                            var value = e && e.target && e.target.value || '';
                            if (value) {
                                document.getElementById(_this._elementRangeOutputId).innerHTML = value;
                            }
                        });
                    }
                }
            };
        /**
         * Clear the filter value
         */
        /**
         * Clear the filter value
         * @return {?}
         */
        CompoundSliderFilter.prototype.clear = /**
         * Clear the filter value
         * @return {?}
         */
            function () {
                if (this.$filterElm && this.$selectOperatorElm) {
                    this._clearFilterTriggered = true;
                    this.searchTerms = [];
                    /** @type {?} */
                    var clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
                    this.$selectOperatorElm.val(0);
                    this.$filterInputElm.val(clearedValue);
                    if (!this.filterParams.hideSliderNumber) {
                        this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(clearedValue);
                    }
                    this.onTriggerEvent(undefined);
                }
            };
        /**
         * destroy the filter
         */
        /**
         * destroy the filter
         * @return {?}
         */
        CompoundSliderFilter.prototype.destroy = /**
         * destroy the filter
         * @return {?}
         */
            function () {
                if (this.$filterElm) {
                    this.$filterElm.off('change').remove();
                }
            };
        /**
         * Set value(s) on the DOM element
         */
        /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
        CompoundSliderFilter.prototype.setValues = /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
            function (values) {
                if (values && Array.isArray(values)) {
                    this.$filterInputElm.val(values[0]);
                    this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(values[0]);
                }
            };
        //
        // private functions
        // ------------------
        /** Build HTML Template for the input range (slider) */
        //
        // private functions
        // ------------------
        /**
         * Build HTML Template for the input range (slider)
         * @private
         * @return {?}
         */
        CompoundSliderFilter.prototype.buildTemplateHtmlString =
            //
            // private functions
            // ------------------
            /**
             * Build HTML Template for the input range (slider)
             * @private
             * @return {?}
             */
            function () {
                /** @type {?} */
                var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
                /** @type {?} */
                var maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
                /** @type {?} */
                var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
                /** @type {?} */
                var step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
                return "<input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n              name=\"" + this._elementRangeInputId + "\"\n              defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n              class=\"form-control slider-filter-input range compound-slider\" />";
            };
        /** Build HTML Template for the text (number) that is shown appended to the slider */
        /**
         * Build HTML Template for the text (number) that is shown appended to the slider
         * @private
         * @return {?}
         */
        CompoundSliderFilter.prototype.buildTemplateSliderTextHtmlString = /**
         * Build HTML Template for the text (number) that is shown appended to the slider
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
                /** @type {?} */
                var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
                return "<div class=\"input-group-addon input-group-append slider-value\"><span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span></div>";
            };
        /** Build HTML Template select dropdown (operator) */
        /**
         * Build HTML Template select dropdown (operator)
         * @private
         * @return {?}
         */
        CompoundSliderFilter.prototype.buildSelectOperatorHtmlString = /**
         * Build HTML Template select dropdown (operator)
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var optionValues = this.getOptionValues();
                /** @type {?} */
                var optionValueString = '';
                optionValues.forEach(function (option) {
                    optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
                });
                return "<select class=\"form-control\">" + optionValueString + "</select>";
            };
        /** Get the available operator option values */
        /**
         * Get the available operator option values
         * @private
         * @return {?}
         */
        CompoundSliderFilter.prototype.getOptionValues = /**
         * Get the available operator option values
         * @private
         * @return {?}
         */
            function () {
                return [
                    { operator: ( /** @type {?} */('')), description: '' },
                    { operator: ( /** @type {?} */('=')), description: '' },
                    { operator: ( /** @type {?} */('<')), description: '' },
                    { operator: ( /** @type {?} */('<=')), description: '' },
                    { operator: ( /** @type {?} */('>')), description: '' },
                    { operator: ( /** @type {?} */('>=')), description: '' },
                    { operator: ( /** @type {?} */('<>')), description: '' }
                ];
            };
        /**
         * Create the DOM element
         */
        /**
         * Create the DOM element
         * @private
         * @param {?=} searchTerm
         * @return {?}
         */
        CompoundSliderFilter.prototype.createDomElement = /**
         * Create the DOM element
         * @private
         * @param {?=} searchTerm
         * @return {?}
         */
            function (searchTerm) {
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var searchTermInput = ( /** @type {?} */((searchTerm || '0')));
                /** @type {?} */
                var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
                $($headerElm).empty();
                // create the DOM Select dropdown for the Operator
                this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
                this.$filterInputElm = $(this.buildTemplateHtmlString());
                /** @type {?} */
                var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
                this.$containerInputGroupElm = $("<div class=\"input-group search-filter filter-" + fieldId + "\"></div>");
                /** @type {?} */
                var $operatorInputGroupAddon = $("<span class=\"input-group-addon input-group-prepend operator\"></span>");
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
                    /** @type {?} */
                    var $sliderTextInputAppendAddon = $(this.buildTemplateSliderTextHtmlString());
                    $sliderTextInputAppendAddon.children().html(searchTermInput);
                    this.$containerInputGroupElm.append($sliderTextInputAppendAddon);
                }
                // create the DOM element & add an ID and filter class
                $filterContainerElm.append(this.$containerInputGroupElm);
                $filterContainerElm.attr('id', "filter-" + fieldId);
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
            };
        /**
         * @private
         * @param {?} e
         * @return {?}
         */
        CompoundSliderFilter.prototype.onTriggerEvent = /**
         * @private
         * @param {?} e
         * @return {?}
         */
            function (e) {
                if (this._clearFilterTriggered) {
                    this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
                    this._clearFilterTriggered = false; // reset flag for next use
                }
                else {
                    /** @type {?} */
                    var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
                    /** @type {?} */
                    var value = this.$filterInputElm.val();
                    (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
                    this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
                }
            };
        return CompoundSliderFilter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InputFilter = /** @class */ (function () {
        function InputFilter() {
            this._clearFilterTriggered = false;
            this._inputType = 'text';
        }
        Object.defineProperty(InputFilter.prototype, "inputType", {
            /** Getter of input type (text, number, password) */
            get: /**
             * Getter of input type (text, number, password)
             * @return {?}
             */ function () {
                return this._inputType;
            },
            /** Setter of input type (text, number, password) */
            set: /**
             * Setter of input type (text, number, password)
             * @param {?} type
             * @return {?}
             */ function (type) {
                this._inputType = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InputFilter.prototype, "operator", {
            /** Getter of the Operator to use when doing the filter comparing */
            get: /**
             * Getter of the Operator to use when doing the filter comparing
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InputFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
        InputFilter.prototype.init = /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
            function (args) {
                var _this = this;
                this.grid = args.grid;
                this.callback = args.callback;
                this.columnDef = args.columnDef;
                this.searchTerms = args.searchTerms || [];
                // filter input can only have 1 search term, so we will use the 1st array index if it exist
                /** @type {?} */
                var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
                // step 1, create HTML string template
                /** @type {?} */
                var filterTemplate = this.buildTemplateHtmlString();
                // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
                this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
                // step 3, subscribe to the keyup event and run the callback when that happens
                // also add/remove "filled" class for styling purposes
                this.$filterElm.on('keyup input change', function (e) {
                    /** @type {?} */
                    var value = e && e.target && e.target.value || '';
                    if (_this._clearFilterTriggered) {
                        _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered });
                        _this._clearFilterTriggered = false; // reset flag for next use
                        _this.$filterElm.removeClass('filled');
                    }
                    else {
                        _this.$filterElm.addClass('filled');
                        _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value] });
                    }
                });
            };
        /**
         * Clear the filter value
         */
        /**
         * Clear the filter value
         * @return {?}
         */
        InputFilter.prototype.clear = /**
         * Clear the filter value
         * @return {?}
         */
            function () {
                if (this.$filterElm) {
                    this._clearFilterTriggered = true;
                    this.searchTerms = [];
                    this.$filterElm.val('');
                    this.$filterElm.trigger('keyup');
                }
            };
        /**
         * destroy the filter
         */
        /**
         * destroy the filter
         * @return {?}
         */
        InputFilter.prototype.destroy = /**
         * destroy the filter
         * @return {?}
         */
            function () {
                if (this.$filterElm) {
                    this.$filterElm.off('keyup input change').remove();
                }
            };
        /**
         * Set value(s) on the DOM element
         */
        /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
        InputFilter.prototype.setValues = /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
            function (values) {
                if (values) {
                    this.$filterElm.val(values);
                }
            };
        //
        // private functions
        // ------------------
        /**
         * Create the HTML template as a string
         */
        //
        // private functions
        // ------------------
        /**
         * Create the HTML template as a string
         * @private
         * @return {?}
         */
        InputFilter.prototype.buildTemplateHtmlString =
            //
            // private functions
            // ------------------
            /**
             * Create the HTML template as a string
             * @private
             * @return {?}
             */
            function () {
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
                return "<input type=\"" + (this._inputType || 'text') + "\" class=\"form-control search-filter filter-" + fieldId + "\" placeholder=\"" + placeholder + "\">";
            };
        /**
         * From the html template string, create a DOM element
         * @param filterTemplate
         */
        /**
         * From the html template string, create a DOM element
         * @private
         * @param {?} filterTemplate
         * @param {?=} searchTerm
         * @return {?}
         */
        InputFilter.prototype.createDomElement = /**
         * From the html template string, create a DOM element
         * @private
         * @param {?} filterTemplate
         * @param {?=} searchTerm
         * @return {?}
         */
            function (filterTemplate, searchTerm) {
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var $headerElm = this.grid.getHeaderRowColumn(fieldId);
                $($headerElm).empty();
                // create the DOM element & add an ID and filter class
                /** @type {?} */
                var $filterElm = $(filterTemplate);
                $filterElm.val(searchTerm);
                $filterElm.attr('id', "filter-" + fieldId);
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
            };
        return InputFilter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InputNumberFilter = /** @class */ (function (_super) {
        __extends(InputNumberFilter, _super);
        /** Initialize the Filter */
        function InputNumberFilter() {
            var _this = _super.call(this) || this;
            _this.inputType = 'number';
            return _this;
        }
        return InputNumberFilter;
    }(InputFilter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var InputPasswordFilter = /** @class */ (function (_super) {
        __extends(InputPasswordFilter, _super);
        /** Initialize the Filter */
        function InputPasswordFilter() {
            var _this = _super.call(this) || this;
            _this.inputType = 'password';
            return _this;
        }
        return InputPasswordFilter;
    }(InputFilter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DOMPurify = DOMPurify_;
    var SelectFilter = /** @class */ (function () {
        /**
         * Initialize the Filter
         */
        function SelectFilter(translate, collectionService, isMultipleSelect) {
            if (isMultipleSelect === void 0) {
                isMultipleSelect = true;
            }
            var _this = this;
            this.translate = translate;
            this.collectionService = collectionService;
            this.isMultipleSelect = isMultipleSelect;
            this.isFilled = false;
            this.enableTranslateLabel = false;
            this.subscriptions = [];
            // default options used by this Filter, user can overwrite any of these by passing "otions"
            /** @type {?} */
            var options = {
                autoAdjustDropHeight: true,
                autoAdjustDropPosition: true,
                autoAdjustDropWidthByTextSize: true,
                container: 'body',
                filter: false,
                // input search term on top of the select option list
                maxHeight: 275,
                single: true,
                textTemplate: function ($elm) {
                    // render HTML code or not, by default it is sanitized and won't be rendered
                    /** @type {?} */
                    var isRenderHtmlEnabled = _this.columnDef && _this.columnDef.filter && _this.columnDef.filter.enableRenderHtml || false;
                    return isRenderHtmlEnabled ? $elm.text() : $elm.html();
                },
                onClose: function () {
                    // we will subscribe to the onClose event for triggering our callback
                    // also add/remove "filled" class for styling purposes
                    /** @type {?} */
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
        Object.defineProperty(SelectFilter.prototype, "columnFilter", {
            /** Getter for the Column Filter itself */
            get: /**
             * Getter for the Column Filter itself
             * @protected
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.filter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectFilter.prototype, "collectionOptions", {
            /** Getter for the Collection Options */
            get: /**
             * Getter for the Collection Options
             * @protected
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectFilter.prototype, "customStructure", {
            /** Getter for the Custom Structure if exist */
            get: /**
             * Getter for the Custom Structure if exist
             * @protected
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @protected
             * @return {?}
             */ function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectFilter.prototype, "operator", {
            /** Getter for the filter operator */
            get: /**
             * Getter for the filter operator
             * @return {?}
             */ function () {
                if (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) {
                    return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator;
                }
                return this.isMultipleSelect ? OperatorType.in : OperatorType.equal;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the filter template
         */
        /**
         * Initialize the filter template
         * @param {?} args
         * @return {?}
         */
        SelectFilter.prototype.init = /**
         * Initialize the filter template
         * @param {?} args
         * @return {?}
         */
            function (args) {
                this.grid = args.grid;
                this.callback = args.callback;
                this.columnDef = args.columnDef;
                this.searchTerms = args.searchTerms || [];
                if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync)) {
                    throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") for the MultipleSelect/SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
                }
                this.enableTranslateLabel = this.columnFilter.enableTranslateLabel;
                this.labelName = this.customStructure && this.customStructure.label || 'label';
                this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
                this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
                this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
                this.valueName = this.customStructure && this.customStructure.value || 'value';
                if (this.enableTranslateLabel && (!this.translate || typeof this.translate.instant !== 'function')) {
                    throw new Error("[select-editor] The ngx-translate TranslateService is required for the Select Filter to work correctly");
                }
                // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
                // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
                /** @type {?} */
                var newCollection = this.columnFilter.collection || [];
                this.renderDomElement(newCollection);
                // on every Filter which have a "collection" or a "collectionAsync"
                // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
                // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
                /** @type {?} */
                var collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
                if (collectionAsync) {
                    this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
                }
            };
        /**
         * Clear the filter values
         */
        /**
         * Clear the filter values
         * @return {?}
         */
        SelectFilter.prototype.clear = /**
         * Clear the filter values
         * @return {?}
         */
            function () {
                if (this.$filterElm && this.$filterElm.multipleSelect) {
                    // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
                    this.$filterElm.multipleSelect('setSelects', []);
                    this.$filterElm.removeClass('filled');
                    this.searchTerms = [];
                    this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true });
                }
            };
        /**
         * destroy the filter
         */
        /**
         * destroy the filter
         * @return {?}
         */
        SelectFilter.prototype.destroy = /**
         * destroy the filter
         * @return {?}
         */
            function () {
                if (this.$filterElm) {
                    // remove event watcher
                    this.$filterElm.off().remove();
                }
                // also dispose of all Subscriptions
                this.subscriptions = unsubscribeAllObservables(this.subscriptions);
            };
        /**
         * Set value(s) on the DOM element
         */
        /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
        SelectFilter.prototype.setValues = /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
            function (values) {
                if (values) {
                    values = Array.isArray(values) ? values : [values];
                    this.$filterElm.multipleSelect('setSelects', values);
                }
            };
        //
        // protected functions
        // ------------------
        /**
         * user might want to filter certain items of the collection
         * @param inputCollection
         * @return outputCollection filtered and/or sorted collection
         */
        //
        // protected functions
        // ------------------
        /**
         * user might want to filter certain items of the collection
         * @protected
         * @param {?} inputCollection
         * @return {?} outputCollection filtered and/or sorted collection
         */
        SelectFilter.prototype.filterCollection =
            //
            // protected functions
            // ------------------
            /**
             * user might want to filter certain items of the collection
             * @protected
             * @param {?} inputCollection
             * @return {?} outputCollection filtered and/or sorted collection
             */
            function (inputCollection) {
                /** @type {?} */
                var outputCollection = inputCollection;
                // user might want to filter certain items of the collection
                if (this.columnDef && this.columnFilter && this.columnFilter.collectionFilterBy) {
                    /** @type {?} */
                    var filterBy = this.columnFilter.collectionFilterBy;
                    /** @type {?} */
                    var filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
                    outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
                }
                return outputCollection;
            };
        /**
         * user might want to sort the collection in a certain way
         * @param inputCollection
         * @return outputCollection filtered and/or sorted collection
         */
        /**
         * user might want to sort the collection in a certain way
         * @protected
         * @param {?} inputCollection
         * @return {?} outputCollection filtered and/or sorted collection
         */
        SelectFilter.prototype.sortCollection = /**
         * user might want to sort the collection in a certain way
         * @protected
         * @param {?} inputCollection
         * @return {?} outputCollection filtered and/or sorted collection
         */
            function (inputCollection) {
                /** @type {?} */
                var outputCollection = inputCollection;
                // user might want to sort the collection
                if (this.columnDef && this.columnFilter && this.columnFilter.collectionSortBy) {
                    /** @type {?} */
                    var sortBy = this.columnFilter.collectionSortBy;
                    outputCollection = this.collectionService.sortCollection(outputCollection, sortBy, this.enableTranslateLabel);
                }
                return outputCollection;
            };
        /**
         * @protected
         * @param {?} collectionAsync
         * @return {?}
         */
        SelectFilter.prototype.renderOptionsAsync = /**
         * @protected
         * @param {?} collectionAsync
         * @return {?}
         */
            function (collectionAsync) {
                return __awaiter(this, void 0, void 0, function () {
                    var awaitedCollection;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                awaitedCollection = [];
                                if (!collectionAsync)
                                    return [3 /*break*/, 2];
                                return [4 /*yield*/, castToPromise(collectionAsync)];
                            case 1:
                                awaitedCollection = _a.sent();
                                this.renderDomElementFromCollectionAsync(awaitedCollection);
                                // because we accept Promises & HttpClient Observable only execute once
                                // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
                                // doing this provide the user a way to call a "collectionAsync.next()"
                                this.createCollectionAsyncSubject();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            };
        /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
        /**
         * Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it
         * @protected
         * @return {?}
         */
        SelectFilter.prototype.createCollectionAsyncSubject = /**
         * Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it
         * @protected
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var newCollectionAsync = new rxjs.Subject();
                this.columnFilter.collectionAsync = newCollectionAsync;
                this.subscriptions.push(newCollectionAsync.subscribe(function (collection) { return _this.renderDomElementFromCollectionAsync(collection); }));
            };
        /**
         * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
         * and reinitialize filter collection with this new collection
         */
        /**
         * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
         * and reinitialize filter collection with this new collection
         * @protected
         * @param {?} collection
         * @return {?}
         */
        SelectFilter.prototype.renderDomElementFromCollectionAsync = /**
         * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
         * and reinitialize filter collection with this new collection
         * @protected
         * @param {?} collection
         * @return {?}
         */
            function (collection) {
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
            };
        /**
         * @protected
         * @param {?} collection
         * @return {?}
         */
        SelectFilter.prototype.renderDomElement = /**
         * @protected
         * @param {?} collection
         * @return {?}
         */
            function (collection) {
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
                /** @type {?} */
                var newCollection = collection;
                // user might want to filter and/or sort certain items of the collection
                newCollection = this.filterCollection(newCollection);
                newCollection = this.sortCollection(newCollection);
                // step 1, create HTML string template
                /** @type {?} */
                var filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);
                // step 2, create the DOM Element of the filter & pre-load search terms
                // also subscribe to the onClose event
                this.createDomElement(filterTemplate);
            };
        /**
         * Create the HTML template as a string
         */
        /**
         * Create the HTML template as a string
         * @protected
         * @param {?} optionCollection
         * @param {?} searchTerms
         * @return {?}
         */
        SelectFilter.prototype.buildTemplateHtmlString = /**
         * Create the HTML template as a string
         * @protected
         * @param {?} optionCollection
         * @param {?} searchTerms
         * @return {?}
         */
            function (optionCollection, searchTerms) {
                var _this = this;
                /** @type {?} */
                var options = '';
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
                /** @type {?} */
                var isRenderHtmlEnabled = this.columnFilter && this.columnFilter.enableRenderHtml || false;
                /** @type {?} */
                var sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
                // collection could be an Array of Strings OR Objects
                if (optionCollection.every(function (x) { return typeof x === 'string'; })) {
                    optionCollection.forEach(function (option) {
                        /** @type {?} */
                        var selected = (searchTerms.findIndex(function (term) { return term === option; }) >= 0) ? 'selected' : '';
                        options += "<option value=\"" + option + "\" label=\"" + option + "\" " + selected + ">" + option + "</option>";
                        // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                        if (selected) {
                            _this.isFilled = true;
                        }
                    });
                }
                else {
                    // array of objects will require a label/value pair unless a customStructure is passed
                    optionCollection.forEach(function (option) {
                        if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                            throw new Error("[select-filter] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')");
                        }
                        /** @type {?} */
                        var labelKey = ( /** @type {?} */((option.labelKey || option[_this.labelName])));
                        /** @type {?} */
                        var selected = (searchTerms.findIndex(function (term) { return term === option[_this.valueName]; }) >= 0) ? 'selected' : '';
                        /** @type {?} */
                        var labelText = ((option.labelKey || _this.enableTranslateLabel) && labelKey) ? _this.translate.instant(labelKey || ' ') : labelKey;
                        /** @type {?} */
                        var prefixText = option[_this.labelPrefixName] || '';
                        /** @type {?} */
                        var suffixText = option[_this.labelSuffixName] || '';
                        /** @type {?} */
                        var optionLabel = option[_this.optionLabel] || '';
                        optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                        // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                        prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this.translate.instant(prefixText || ' ') : prefixText;
                        suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this.translate.instant(suffixText || ' ') : suffixText;
                        optionLabel = (_this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? _this.translate.instant(optionLabel || ' ') : optionLabel;
                        // add to a temp array for joining purpose and filter out empty text
                        /** @type {?} */
                        var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; });
                        /** @type {?} */
                        var optionText = tmpOptionArray.join(separatorBetweenLabels);
                        // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                        // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                        if (isRenderHtmlEnabled) {
                            // sanitize any unauthorized html tags like script and others
                            // for the remaining allowed tags we'll permit all attributes
                            /** @type {?} */
                            var sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
                            optionText = htmlEncode(sanitizedText);
                        }
                        // html text of each select option
                        options += "<option value=\"" + option[_this.valueName] + "\" label=\"" + optionLabel + "\" " + selected + ">" + optionText + "</option>";
                        // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                        if (selected) {
                            _this.isFilled = true;
                        }
                    });
                }
                return "<select class=\"ms-filter search-filter filter-" + fieldId + "\" " + (this.isMultipleSelect ? 'multiple="multiple"' : '') + ">" + options + "</select>";
            };
        /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
        /**
         * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
         * @protected
         * @return {?}
         */
        SelectFilter.prototype.createBlankEntry = /**
         * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
         * @protected
         * @return {?}
         */
            function () {
                var _a;
                /** @type {?} */
                var blankEntry = (_a = {},
                    _a[this.labelName] = '',
                    _a[this.valueName] = '',
                    _a);
                if (this.labelPrefixName) {
                    blankEntry[this.labelPrefixName] = '';
                }
                if (this.labelSuffixName) {
                    blankEntry[this.labelSuffixName] = '';
                }
                return blankEntry;
            };
        /**
         * From the html template string, create a DOM element
         * Subscribe to the onClose event and run the callback when that happens
         * @param filterTemplate
         */
        /**
         * From the html template string, create a DOM element
         * Subscribe to the onClose event and run the callback when that happens
         * @protected
         * @param {?} filterTemplate
         * @return {?}
         */
        SelectFilter.prototype.createDomElement = /**
         * From the html template string, create a DOM element
         * Subscribe to the onClose event and run the callback when that happens
         * @protected
         * @param {?} filterTemplate
         * @return {?}
         */
            function (filterTemplate) {
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
                this.elementName = "filter-" + fieldId;
                this.defaultOptions.name = this.elementName;
                /** @type {?} */
                var $headerElm = this.grid.getHeaderRowColumn(fieldId);
                $($headerElm).empty();
                // create the DOM element & add an ID and filter class
                this.$filterElm = $(filterTemplate);
                if (typeof this.$filterElm.multipleSelect !== 'function') {
                    throw new Error("multiple-select.js was not found, make sure to modify your \"angular-cli.json\" file and include \"../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js\" and it's css or SASS file");
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
                /** @type {?} */
                var elementOptions = __assign({}, this.defaultOptions, this.columnFilter.filterOptions);
                this.filterElmOptions = __assign({}, this.defaultOptions, elementOptions);
                this.$filterElm = this.$filterElm.multipleSelect(this.filterElmOptions);
            };
        return SelectFilter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MultipleSelectFilter = /** @class */ (function (_super) {
        __extends(MultipleSelectFilter, _super);
        /**
         * Initialize the Filter
         */
        function MultipleSelectFilter(translate, collectionService) {
            var _this = _super.call(this, translate, collectionService, true) || this;
            _this.translate = translate;
            _this.collectionService = collectionService;
            return _this;
        }
        return MultipleSelectFilter;
    }(SelectFilter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NativeSelectFilter = /** @class */ (function () {
        function NativeSelectFilter(translate) {
            this.translate = translate;
            this._clearFilterTriggered = false;
        }
        Object.defineProperty(NativeSelectFilter.prototype, "operator", {
            get: /**
             * @return {?}
             */ function () {
                return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
        NativeSelectFilter.prototype.init = /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
            function (args) {
                var _this = this;
                this.grid = args.grid;
                this.callback = args.callback;
                this.columnDef = args.columnDef;
                this.searchTerms = args.searchTerms || [];
                // filter input can only have 1 search term, so we will use the 1st array index if it exist
                /** @type {?} */
                var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
                if (typeof searchTerm === 'boolean' || typeof searchTerm === 'number') {
                    searchTerm = "" + searchTerm;
                }
                // step 1, create HTML string template
                /** @type {?} */
                var filterTemplate = this.buildTemplateHtmlString();
                // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
                this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
                // step 3, subscribe to the change event and run the callback when that happens
                // also add/remove "filled" class for styling purposes
                this.$filterElm.change(function (e) {
                    /** @type {?} */
                    var value = e && e.target && e.target.value || '';
                    if (_this._clearFilterTriggered) {
                        _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered });
                        _this._clearFilterTriggered = false; // reset flag for next use
                        _this.$filterElm.removeClass('filled');
                    }
                    else {
                        _this.$filterElm.addClass('filled');
                        _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value] });
                    }
                });
            };
        /**
         * Clear the filter values
         */
        /**
         * Clear the filter values
         * @return {?}
         */
        NativeSelectFilter.prototype.clear = /**
         * Clear the filter values
         * @return {?}
         */
            function () {
                if (this.$filterElm) {
                    this._clearFilterTriggered = true;
                    this.searchTerms = [];
                    this.$filterElm.val('');
                    this.$filterElm.trigger('change');
                }
            };
        /**
         * destroy the filter
         */
        /**
         * destroy the filter
         * @return {?}
         */
        NativeSelectFilter.prototype.destroy = /**
         * destroy the filter
         * @return {?}
         */
            function () {
                if (this.$filterElm) {
                    this.$filterElm.off('change').remove();
                }
            };
        /**
         * Set value(s) on the DOM element
         */
        /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
        NativeSelectFilter.prototype.setValues = /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
            function (values) {
                if (values) {
                    this.$filterElm.val(values);
                }
            };
        //
        // private functions
        // ------------------
        //
        // private functions
        // ------------------
        /**
         * @private
         * @return {?}
         */
        NativeSelectFilter.prototype.buildTemplateHtmlString =
            //
            // private functions
            // ------------------
            /**
             * @private
             * @return {?}
             */
            function () {
                var _this = this;
                if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
                    throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
                }
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var optionCollection = this.columnDef.filter.collection || [];
                /** @type {?} */
                var labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
                /** @type {?} */
                var valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
                /** @type {?} */
                var options = '';
                // collection could be an Array of Strings OR Objects
                if (optionCollection.every(function (x) { return typeof x === 'string'; })) {
                    optionCollection.forEach(function (option) {
                        options += "<option value=\"" + option + "\" label=\"" + option + "\">" + option + "</option>";
                    });
                }
                else {
                    optionCollection.forEach(function (option) {
                        if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                            throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.select, collection: [ { value: '1', label: 'One' } ]')");
                        }
                        /** @type {?} */
                        var labelKey = option.labelKey || option[labelName];
                        /** @type {?} */
                        var textLabel = ((option.labelKey || _this.columnDef.filter.enableTranslateLabel) && _this.translate && typeof _this.translate.instant === 'function') ? _this.translate.instant(labelKey || ' ') : labelKey;
                        options += "<option value=\"" + option[valueName] + "\">" + textLabel + "</option>";
                    });
                }
                return "<select class=\"form-control search-filter filter-" + fieldId + "\">" + options + "</select>";
            };
        /**
         * From the html template string, create a DOM element
         * @param filterTemplate
         */
        /**
         * From the html template string, create a DOM element
         * @private
         * @param {?} filterTemplate
         * @param {?=} searchTerm
         * @return {?}
         */
        NativeSelectFilter.prototype.createDomElement = /**
         * From the html template string, create a DOM element
         * @private
         * @param {?} filterTemplate
         * @param {?=} searchTerm
         * @return {?}
         */
            function (filterTemplate, searchTerm) {
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var $headerElm = this.grid.getHeaderRowColumn(fieldId);
                $($headerElm).empty();
                // create the DOM element & add an ID and filter class
                /** @type {?} */
                var $filterElm = $(filterTemplate);
                /** @type {?} */
                var searchTermInput = ( /** @type {?} */((searchTerm || '')));
                $filterElm.val(searchTermInput);
                $filterElm.attr('id', "filter-" + fieldId);
                $filterElm.data('columnId', fieldId);
                // append the new DOM element to the header row
                if ($filterElm && typeof $filterElm.appendTo === 'function') {
                    $filterElm.appendTo($headerElm);
                }
                return $filterElm;
            };
        return NativeSelectFilter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SingleSelectFilter = /** @class */ (function (_super) {
        __extends(SingleSelectFilter, _super);
        /**
         * Initialize the Filter
         */
        function SingleSelectFilter(translate, collectionService) {
            var _this = _super.call(this, translate, collectionService, false) || this;
            _this.translate = translate;
            _this.collectionService = collectionService;
            return _this;
        }
        return SingleSelectFilter;
    }(SelectFilter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DEFAULT_MIN_VALUE$1 = 0;
    /** @type {?} */
    var DEFAULT_MAX_VALUE$1 = 100;
    /** @type {?} */
    var DEFAULT_STEP$1 = 1;
    var SliderFilter = /** @class */ (function () {
        function SliderFilter() {
            this._clearFilterTriggered = false;
        }
        Object.defineProperty(SliderFilter.prototype, "filterParams", {
            /** Getter for the Filter Generic Params */
            get: /**
             * Getter for the Filter Generic Params
             * @private
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderFilter.prototype, "filterProperties", {
            /** Getter for the `filter` properties */
            get: /**
             * Getter for the `filter` properties
             * @private
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.filter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderFilter.prototype, "operator", {
            get: /**
             * @return {?}
             */ function () {
                return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
        SliderFilter.prototype.init = /**
         * Initialize the Filter
         * @param {?} args
         * @return {?}
         */
            function (args) {
                var _this = this;
                if (!args) {
                    throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
                }
                this.grid = args.grid;
                this.callback = args.callback;
                this.columnDef = args.columnDef;
                this.searchTerms = args.searchTerms || [];
                // define the input & slider number IDs
                this._elementRangeInputId = "rangeInput_" + this.columnDef.field;
                this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field;
                // filter input can only have 1 search term, so we will use the 1st array index if it exist
                /** @type {?} */
                var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
                // step 1, create HTML string template
                /** @type {?} */
                var filterTemplate = this.buildTemplateHtmlString();
                // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
                this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
                // step 3, subscribe to the change event and run the callback when that happens
                // also add/remove "filled" class for styling purposes
                this.$filterElm.change(function (e) {
                    /** @type {?} */
                    var value = e && e.target && e.target.value || '';
                    if (_this._clearFilterTriggered) {
                        _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered });
                        _this._clearFilterTriggered = false; // reset flag for next use
                        _this.$filterElm.removeClass('filled');
                    }
                    else {
                        _this.$filterElm.addClass('filled');
                        _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value] });
                    }
                });
                // if user chose to display the slider number on the right side, then update it every time it changes
                // we need to use both "input" and "change" event to be all cross-browser
                if (!this.filterParams.hideSliderNumber) {
                    this.$filterElm.on('input change', function (e) {
                        /** @type {?} */
                        var value = e && e.target && e.target.value || '';
                        if (value) {
                            document.getElementById(_this._elementRangeOutputId).innerHTML = value;
                        }
                    });
                }
            };
        /**
         * Clear the filter value
         */
        /**
         * Clear the filter value
         * @return {?}
         */
        SliderFilter.prototype.clear = /**
         * Clear the filter value
         * @return {?}
         */
            function () {
                if (this.$filterElm) {
                    this._clearFilterTriggered = true;
                    this.searchTerms = [];
                    /** @type {?} */
                    var clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE$1;
                    this.$filterElm.children('input').val(clearedValue);
                    this.$filterElm.children('div.input-group-addon.input-group-append').children().html(clearedValue);
                    this.$filterElm.trigger('change');
                }
            };
        /**
         * destroy the filter
         */
        /**
         * destroy the filter
         * @return {?}
         */
        SliderFilter.prototype.destroy = /**
         * destroy the filter
         * @return {?}
         */
            function () {
                if (this.$filterElm) {
                    this.$filterElm.off('change').remove();
                }
            };
        /**
         * Set value(s) on the DOM element
         */
        /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
        SliderFilter.prototype.setValues = /**
         * Set value(s) on the DOM element
         * @param {?} values
         * @return {?}
         */
            function (values) {
                if (values) {
                    this.$filterElm.val(values);
                }
            };
        //
        // private functions
        // ------------------
        /**
         * Create the HTML template as a string
         */
        //
        // private functions
        // ------------------
        /**
         * Create the HTML template as a string
         * @private
         * @return {?}
         */
        SliderFilter.prototype.buildTemplateHtmlString =
            //
            // private functions
            // ------------------
            /**
             * Create the HTML template as a string
             * @private
             * @return {?}
             */
            function () {
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE$1;
                /** @type {?} */
                var maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE$1;
                /** @type {?} */
                var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
                /** @type {?} */
                var step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP$1;
                if (this.filterParams.hideSliderNumber) {
                    return "\n      <div class=\"search-filter filter-" + fieldId + "\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-filter-input range\" />\n      </div>";
                }
                return "\n      <div class=\"input-group search-filter filter-" + fieldId + "\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-filter-input range\" />\n        <div class=\"input-group-addon input-group-append slider-value\">\n          <span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span>\n        </div>\n      </div>";
            };
        /**
         * From the html template string, create a DOM element
         * @param filterTemplate
         */
        /**
         * From the html template string, create a DOM element
         * @private
         * @param {?} filterTemplate
         * @param {?=} searchTerm
         * @return {?}
         */
        SliderFilter.prototype.createDomElement = /**
         * From the html template string, create a DOM element
         * @private
         * @param {?} filterTemplate
         * @param {?=} searchTerm
         * @return {?}
         */
            function (filterTemplate, searchTerm) {
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var $headerElm = this.grid.getHeaderRowColumn(fieldId);
                $($headerElm).empty();
                // create the DOM element & add an ID and filter class
                /** @type {?} */
                var $filterElm = $(filterTemplate);
                /** @type {?} */
                var searchTermInput = ( /** @type {?} */((searchTerm || '0')));
                $filterElm.children('input').val(searchTermInput);
                $filterElm.children('div.input-group-addon.input-group-append').children().html(searchTermInput);
                $filterElm.attr('id', "filter-" + fieldId);
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
            };
        return SliderFilter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var Filters = {
        /**
         * Compound Date Filter (compound of Operator + Date picker)
         */
        compoundDate: CompoundDateFilter,
        /**
         * Alias to compoundInputText to Compound Input Filter (compound of Operator + Input Text)
         */
        compoundInput: CompoundInputFilter,
        /**
         * Compound Input Number Filter (compound of Operator + Input of type Number)
         */
        compoundInputNumber: CompoundInputNumberFilter,
        /**
         * Compound Input Password Filter (compound of Operator + Input of type Password, also note that only the text shown in the UI will be masked, filter query is still plain text)
         */
        compoundInputPassword: CompoundInputPasswordFilter,
        /**
         * Compound Input Text Filter (compound of Operator + Input Text)
         */
        compoundInputText: CompoundInputFilter,
        /**
         * Compound Slider Filter (compound of Operator + Slider)
         */
        compoundSlider: CompoundSliderFilter,
        /**
         * Alias to inputText, input type text filter
         */
        input: InputFilter,
        /**
         * Input Filter of type Number
         */
        inputNumber: InputNumberFilter,
        /**
         * Input Filter of type Password (note that only the text shown in the UI will be masked, filter query is still plain text)
         */
        inputPassword: InputPasswordFilter,
        /**
         * Default Filter, input type text filter
         */
        inputText: InputFilter,
        /**
         * Multiple Select filter, which uses 3rd party lib "multiple-select.js"
         */
        multipleSelect: MultipleSelectFilter,
        /**
         * Select filter, which uses native DOM element select
         */
        select: NativeSelectFilter,
        /**
         * Single Select filter, which uses 3rd party lib "multiple-select.js"
         */
        singleSelect: SingleSelectFilter,
        /**
         * Slider Filter
         */
        slider: SliderFilter,
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Options that can be passed to the Bootstrap-Datetimepicker directly
     * @type {?}
     */
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
        enableAutoSizeColumns: true,
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
            hideTogglePreHeaderCommand: false,
            iconCssClass: 'fa fa-bars',
            iconClearAllFiltersCommand: 'fa fa-filter text-danger',
            iconClearAllSortingCommand: 'fa fa-unsorted text-danger',
            iconExportCsvCommand: 'fa fa-download',
            iconExportTextDelimitedCommand: 'fa fa-download',
            iconRefreshDatasetCommand: 'fa fa-refresh',
            iconToggleFilterCommand: 'fa fa-random',
            iconTogglePreHeaderCommand: 'fa fa-random',
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SlickgridConfig = /** @class */ (function () {
        function SlickgridConfig() {
            this.options = GlobalGridOptions;
        }
        return SlickgridConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FilterFactory = /** @class */ (function () {
        function FilterFactory(config, translate, collectionService) {
            this.config = config;
            this.translate = translate;
            this.collectionService = collectionService;
            this._options = this.config.options;
        }
        // Uses the User model to create a new User
        // Uses the User model to create a new User
        /**
         * @param {?} columnFilter
         * @return {?}
         */
        FilterFactory.prototype.createFilter =
            // Uses the User model to create a new User
            /**
             * @param {?} columnFilter
             * @return {?}
             */
            function (columnFilter) {
                /** @type {?} */
                var filter;
                if (columnFilter && columnFilter.model) {
                    filter = typeof columnFilter.model === 'function' ? new columnFilter.model(this.translate, this.collectionService) : columnFilter.model;
                }
                // fallback to the default filter
                if (!filter && this._options.defaultFilter) {
                    filter = new this._options.defaultFilter(this.translate, this.collectionService);
                }
                return filter;
            };
        FilterFactory.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        FilterFactory.ctorParameters = function () {
            return [
                { type: SlickgridConfig },
                { type: core$1.TranslateService },
                { type: CollectionService }
            ];
        };
        return FilterFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var isequal = isequal_;
    var FilterService = /** @class */ (function () {
        function FilterService(filterFactory) {
            this.filterFactory = filterFactory;
            this._eventHandler = new Slick.EventHandler();
            this._filters = [];
            this._columnFilters = {};
            this.onFilterChanged = new rxjs.Subject();
            this.onFilterCleared = new rxjs.Subject();
        }
        Object.defineProperty(FilterService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FilterService.prototype, "_columnDefinitions", {
            /** Getter for the Column Definitions pulled through the Grid Object */
            get: /**
             * Getter for the Column Definitions pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} grid
         * @return {?}
         */
        FilterService.prototype.init = /**
         * @param {?} grid
         * @return {?}
         */
            function (grid) {
                this._grid = grid;
            };
        /**
         * Attach a backend filter hook to the grid
         * @param grid SlickGrid Grid object
         */
        /**
         * Attach a backend filter hook to the grid
         * @param {?} grid SlickGrid Grid object
         * @return {?}
         */
        FilterService.prototype.attachBackendOnFilter = /**
         * Attach a backend filter hook to the grid
         * @param {?} grid SlickGrid Grid object
         * @return {?}
         */
            function (grid) {
                var _this = this;
                this._filters = [];
                this._slickSubscriber = new Slick.Event();
                // subscribe to the SlickGrid event and call the backend execution
                this._slickSubscriber.subscribe(this.attachBackendOnFilterSubscribe.bind(this));
                // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
                this._eventHandler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
                    _this.addFilterTemplateToHeaderRow(args);
                });
            };
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        FilterService.prototype.attachBackendOnFilterSubscribe = /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
            function (event, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var backendApi, startTime, query, observableOrPromise, processResult, endTime, e_1;
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
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 4, , 5]);
                                // keep start time & end timestamps & return it after process execution
                                startTime = new Date();
                                // run a preProcess callback if defined
                                if (backendApi.preProcess) {
                                    backendApi.preProcess();
                                }
                                // call the service to get a query back
                                return [4 /*yield*/, backendApi.service.processOnFilterChanged(event, args)];
                            case 2:
                                query = _a.sent();
                                // emit an onFilterChanged event
                                if (args && !args.clearFilterTriggered) {
                                    this.emitFilterChanged('remote');
                                }
                                // the process could be an Observable (like HttpClient) or a Promise
                                // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                                observableOrPromise = backendApi.process(query);
                                return [4 /*yield*/, castToPromise(observableOrPromise)];
                            case 3:
                                processResult = _a.sent();
                                endTime = new Date();
                                // from the result, call our internal post process to update the Dataset and Pagination info
                                if (processResult && backendApi.internalPostProcess) {
                                    backendApi.internalPostProcess(processResult);
                                }
                                // send the response process to the postProcess callback
                                if (backendApi.postProcess !== undefined) {
                                    if (processResult instanceof Object) {
                                        processResult.statistics = {
                                            startTime: startTime,
                                            endTime: endTime,
                                            executionTime: endTime.valueOf() - startTime.valueOf(),
                                            totalItemCount: this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems
                                        };
                                    }
                                    backendApi.postProcess(processResult);
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _a.sent();
                                if (backendApi && backendApi.onError) {
                                    backendApi.onError(e_1);
                                }
                                else {
                                    throw e_1;
                                }
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
        /**
         * Attach a local filter hook to the grid
         * @param grid SlickGrid Grid object
         * @param dataView
         */
        /**
         * Attach a local filter hook to the grid
         * @param {?} grid SlickGrid Grid object
         * @param {?} dataView
         * @return {?}
         */
        FilterService.prototype.attachLocalOnFilter = /**
         * Attach a local filter hook to the grid
         * @param {?} grid SlickGrid Grid object
         * @param {?} dataView
         * @return {?}
         */
            function (grid, dataView) {
                var _this = this;
                this._filters = [];
                this._dataView = dataView;
                this._slickSubscriber = new Slick.Event();
                dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
                dataView.setFilter(this.customLocalFilter.bind(this, dataView));
                this._slickSubscriber.subscribe(function (e, args) {
                    /** @type {?} */
                    var columnId = args.columnId;
                    if (columnId != null) {
                        dataView.refresh();
                    }
                    if (args && !args.clearFilterTriggered) {
                        _this.emitFilterChanged('local');
                    }
                });
                // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
                this._eventHandler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
                    _this.addFilterTemplateToHeaderRow(args);
                });
            };
        /** Clear the search filters (below the column titles) */
        /**
         * Clear the search filters (below the column titles)
         * @return {?}
         */
        FilterService.prototype.clearFilters = /**
         * Clear the search filters (below the column titles)
         * @return {?}
         */
            function () {
                this._filters.forEach(function (filter) {
                    if (filter && filter.clear) {
                        // clear element and trigger a change
                        filter.clear();
                    }
                });
                // we need to loop through all columnFilters and delete them 1 by 1
                // only trying to clear columnFilter (without looping through) would not trigger a dataset change
                for (var columnId in this._columnFilters) {
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
            };
        /**
         * @param {?} dataView
         * @param {?} item
         * @param {?} args
         * @return {?}
         */
        FilterService.prototype.customLocalFilter = /**
         * @param {?} dataView
         * @param {?} item
         * @param {?} args
         * @return {?}
         */
            function (dataView, item, args) {
                var e_2, _a;
                try {
                    for (var _b = __values(Object.keys(args.columnFilters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var columnId = _c.value;
                        /** @type {?} */
                        var columnFilter = args.columnFilters[columnId];
                        /** @type {?} */
                        var columnIndex = args.grid.getColumnIndex(columnId);
                        /** @type {?} */
                        var columnDef = args.grid.getColumns()[columnIndex];
                        if (!columnDef) {
                            return false;
                        }
                        /** @type {?} */
                        var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field;
                        /** @type {?} */
                        var fieldType = columnDef.type || FieldType.string;
                        /** @type {?} */
                        var filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
                        /** @type {?} */
                        var cellValue = item[fieldName];
                        // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                        if (fieldName.indexOf('.') >= 0) {
                            cellValue = getDescendantProperty(item, fieldName);
                        }
                        // if we find searchTerms use them but make a deep copy so that we don't affect original array
                        // we might have to overwrite the value(s) locally that are returned
                        // e.g: we don't want to operator within the search value, since it will fail filter condition check trigger afterward
                        /** @type {?} */
                        var searchValues = (columnFilter && columnFilter.searchTerms) ? __spread(columnFilter.searchTerms) : null;
                        /** @type {?} */
                        var fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';
                        fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                        // make sure it's a string
                        /** @type {?} */
                        var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                        // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                        /** @type {?} */
                        var operator = columnFilter.operator || ((matches) ? matches[1] : '');
                        /** @type {?} */
                        var searchTerm = (!!matches) ? matches[2] : '';
                        /** @type {?} */
                        var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                        if (searchValues && searchValues.length > 1) {
                            fieldSearchValue = searchValues.join(',');
                        }
                        else if (typeof fieldSearchValue === 'string') {
                            // escaping the search value
                            fieldSearchValue = fieldSearchValue.replace("'", "''"); // escape single quotes by doubling them
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
                            for (var k = 0, ln = searchValues.length; k < ln; k++) {
                                // make sure all search terms are strings
                                searchValues[k] = ((searchValues[k] === undefined || searchValues[k] === null) ? '' : searchValues[k]) + '';
                            }
                        }
                        // when using localization (i18n), we should use the formatter output to search as the new cell value
                        if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
                            /** @type {?} */
                            var rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
                            cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
                        }
                        // make sure cell value is always a string
                        if (typeof cellValue === 'number') {
                            cellValue = cellValue.toString();
                        }
                        /** @type {?} */
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
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
                return true;
            };
        /**
         * @return {?}
         */
        FilterService.prototype.dispose = /**
         * @return {?}
         */
            function () {
                this.disposeColumnFilters();
                // unsubscribe all SlickGrid events
                this._eventHandler.unsubscribeAll();
                // unsubscribe local event
                if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
                    this._slickSubscriber.unsubscribe();
                }
            };
        /**
         * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
         */
        /**
         * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
         * @return {?}
         */
        FilterService.prototype.disposeColumnFilters = /**
         * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
         * @return {?}
         */
            function () {
                // we need to loop through all columnFilters and delete them 1 by 1
                // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
                for (var columnId in this._columnFilters) {
                    if (columnId && this._columnFilters[columnId]) {
                        delete this._columnFilters[columnId];
                    }
                }
                // also destroy each Filter instances
                this._filters.forEach(function (filter, index) {
                    if (filter && filter.destroy) {
                        filter.destroy(true);
                    }
                });
            };
        /**
         * @return {?}
         */
        FilterService.prototype.getColumnFilters = /**
         * @return {?}
         */
            function () {
                return this._columnFilters;
            };
        /**
         * @return {?}
         */
        FilterService.prototype.getCurrentLocalFilters = /**
         * @return {?}
         */
            function () {
                var e_3, _a;
                /** @type {?} */
                var currentFilters = [];
                if (this._columnFilters) {
                    try {
                        for (var _b = __values(Object.keys(this._columnFilters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var colId = _c.value;
                            /** @type {?} */
                            var columnFilter = this._columnFilters[colId];
                            /** @type {?} */
                            var columnDef = columnFilter.columnDef;
                            /** @type {?} */
                            var filter = ( /** @type {?} */({ columnId: colId || '' }));
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
                    catch (e_3_1) {
                        e_3 = { error: e_3_1 };
                    }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return))
                                _a.call(_b);
                        }
                        finally {
                            if (e_3)
                                throw e_3.error;
                        }
                    }
                }
                return currentFilters;
            };
        /**
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        FilterService.prototype.callbackSearchEvent = /**
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
            function (e, args) {
                if (args) {
                    /** @type {?} */
                    var searchTerm = ((e && e.target) ? (( /** @type {?} */(e.target))).value : undefined);
                    /** @type {?} */
                    var searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
                    /** @type {?} */
                    var columnDef = args.columnDef || null;
                    /** @type {?} */
                    var columnId = columnDef ? (columnDef.id || '') : '';
                    /** @type {?} */
                    var operator = args.operator || undefined;
                    /** @type {?} */
                    var hasSearchTerms = searchTerms && Array.isArray(searchTerms);
                    /** @type {?} */
                    var termsCount = hasSearchTerms && searchTerms.length;
                    /** @type {?} */
                    var oldColumnFilters = __assign({}, this._columnFilters);
                    if (!hasSearchTerms || termsCount === 0 || (termsCount === 1 && searchTerms[0] === '')) {
                        // delete the property from the columnFilters when it becomes empty
                        // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
                        delete this._columnFilters[columnId];
                    }
                    else {
                        /** @type {?} */
                        var colId = ( /** @type {?} */('' + columnId));
                        /** @type {?} */
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
                    // trigger an event only if Filters changed
                    if (!isequal(oldColumnFilters, this._columnFilters)) {
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
                }
            };
        /**
         * @param {?} args
         * @return {?}
         */
        FilterService.prototype.addFilterTemplateToHeaderRow = /**
         * @param {?} args
         * @return {?}
         */
            function (args) {
                /** @type {?} */
                var columnDef = args.column;
                /** @type {?} */
                var columnId = columnDef.id || '';
                if (columnDef && columnId !== 'selector' && columnDef.filterable) {
                    /** @type {?} */
                    var searchTerms = void 0;
                    /** @type {?} */
                    var operator = void 0;
                    /** @type {?} */
                    var filter_1 = this.filterFactory.createFilter(args.column.filter);
                    operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (filter_1 && filter_1.operator) || undefined;
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
                    /** @type {?} */
                    var filterArguments = {
                        grid: this._grid,
                        operator: operator,
                        searchTerms: searchTerms,
                        columnDef: columnDef,
                        callback: this.callbackSearchEvent.bind(this)
                    };
                    if (filter_1) {
                        filter_1.init(filterArguments);
                        /** @type {?} */
                        var filterExistIndex = this._filters.findIndex(function (filt) { return filter_1.columnDef.name === filt.columnDef.name; });
                        // add to the filters arrays or replace it when found
                        if (filterExistIndex === -1) {
                            this._filters.push(filter_1);
                        }
                        else {
                            this._filters[filterExistIndex] = filter_1;
                        }
                        // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                        // we need to also set again the values in the DOM elements if the values were set by a searchTerm(s)
                        if (searchTerms && filter_1.setValues) {
                            filter_1.setValues(searchTerms);
                        }
                    }
                }
            };
        /**
         * A simple function that is attached to the subscriber and emit a change when the sort is called.
         * Other services, like Pagination, can then subscribe to it.
         * @param sender
         */
        /**
         * A simple function that is attached to the subscriber and emit a change when the sort is called.
         * Other services, like Pagination, can then subscribe to it.
         * @param {?} sender
         * @return {?}
         */
        FilterService.prototype.emitFilterChanged = /**
         * A simple function that is attached to the subscriber and emit a change when the sort is called.
         * Other services, like Pagination, can then subscribe to it.
         * @param {?} sender
         * @return {?}
         */
            function (sender) {
                if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
                    /** @type {?} */
                    var currentFilters = [];
                    /** @type {?} */
                    var backendService = this._gridOptions.backendServiceApi.service;
                    if (backendService && backendService.getCurrentFilters) {
                        currentFilters = ( /** @type {?} */(backendService.getCurrentFilters()));
                    }
                    this.onFilterChanged.next(currentFilters);
                }
                else if (sender === 'local') {
                    this.onFilterChanged.next(this.getCurrentLocalFilters());
                }
            };
        /**
         * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
         * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
         * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
         * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
         */
        /**
         * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
         * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
         * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
         * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
         * @return {?}
         */
        FilterService.prototype.populateColumnFilterSearchTerms = /**
         * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
         * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
         * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
         * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
         * @return {?}
         */
            function () {
                if (this._gridOptions.presets && Array.isArray(this._gridOptions.presets.filters) && this._gridOptions.presets.filters.length > 0) {
                    /** @type {?} */
                    var filters_1 = this._gridOptions.presets.filters;
                    this._columnDefinitions.forEach(function (columnDef) {
                        // clear any columnDef searchTerms before applying Presets
                        if (columnDef.filter && columnDef.filter.searchTerms) {
                            delete columnDef.filter.searchTerms;
                        }
                        // from each presets, we will find the associated columnDef and apply the preset searchTerms & operator if there is
                        /** @type {?} */
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
        /**
         * @private
         * @param {?} searchTerms
         * @param {?} columnDef
         * @param {?=} operator
         * @return {?}
         */
        FilterService.prototype.updateColumnFilters = /**
         * @private
         * @param {?} searchTerms
         * @param {?} columnDef
         * @param {?=} operator
         * @return {?}
         */
            function (searchTerms, columnDef, operator) {
                if (searchTerms && columnDef) {
                    // this._columnFilters.searchTerms = searchTerms;
                    this._columnFilters[columnDef.id] = {
                        columnId: columnDef.id,
                        columnDef: columnDef,
                        searchTerms: searchTerms,
                        operator: operator
                    };
                }
            };
        /**
         * @private
         * @param {?} slickEvent
         * @param {?} args
         * @param {?} e
         * @return {?}
         */
        FilterService.prototype.triggerEvent = /**
         * @private
         * @param {?} slickEvent
         * @param {?} args
         * @param {?} e
         * @return {?}
         */
            function (slickEvent, args, e) {
                slickEvent = slickEvent || new Slick.Event();
                // event might have been created as a CustomEvent (e.g. CompoundDateFilter), without being a valid Slick.EventData.
                // if so we will create a new Slick.EventData and merge it with that CustomEvent to avoid having SlickGrid errors
                /** @type {?} */
                var event = e;
                if (e && typeof e.isPropagationStopped !== 'function') {
                    event = $.extend({}, new Slick.EventData(), e);
                }
                slickEvent.notify(args, event, args.grid);
            };
        FilterService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        FilterService.ctorParameters = function () {
            return [
                { type: FilterFactory }
            ];
        };
        return FilterService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SortService = /** @class */ (function () {
        function SortService() {
            this._currentLocalSorters = [];
            this._eventHandler = new Slick.EventHandler();
            this._isBackendGrid = false;
            this.onSortChanged = new rxjs.Subject();
            this.onSortCleared = new rxjs.Subject();
        }
        Object.defineProperty(SortService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SortService.prototype, "_columnDefinitions", {
            /** Getter for the Column Definitions pulled through the Grid Object */
            get: /**
             * Getter for the Column Definitions pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Attach a backend sort (single/multi) hook to the grid
         * @param grid SlickGrid Grid object
         * @param dataView SlickGrid DataView object
         */
        /**
         * Attach a backend sort (single/multi) hook to the grid
         * @param {?} grid SlickGrid Grid object
         * @param {?} dataView SlickGrid DataView object
         * @return {?}
         */
        SortService.prototype.attachBackendOnSort = /**
         * Attach a backend sort (single/multi) hook to the grid
         * @param {?} grid SlickGrid Grid object
         * @param {?} dataView SlickGrid DataView object
         * @return {?}
         */
            function (grid, dataView) {
                this._isBackendGrid = true;
                this._grid = grid;
                this._dataView = dataView;
                this._slickSubscriber = grid.onSort;
                // subscribe to the SlickGrid event and call the backend execution
                this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
            };
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        SortService.prototype.onBackendSortChanged = /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
            function (event, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var gridOptions, backendApi, startTime, query, observableOrPromise, processResult, endTime, e_1;
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
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                // keep start time & end timestamps & return it after process execution
                                startTime = new Date();
                                if (backendApi.preProcess) {
                                    backendApi.preProcess();
                                }
                                query = backendApi.service.processOnSortChanged(event, args);
                                this.emitSortChanged('remote');
                                // the process could be an Observable (like HttpClient) or a Promise
                                // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                                observableOrPromise = backendApi.process(query);
                                return [4 /*yield*/, castToPromise(observableOrPromise)];
                            case 2:
                                processResult = _a.sent();
                                endTime = new Date();
                                // from the result, call our internal post process to update the Dataset and Pagination info
                                if (processResult && backendApi.internalPostProcess) {
                                    backendApi.internalPostProcess(processResult);
                                }
                                // send the response process to the postProcess callback
                                if (backendApi.postProcess) {
                                    if (processResult instanceof Object) {
                                        processResult.statistics = {
                                            startTime: startTime,
                                            endTime: endTime,
                                            executionTime: endTime.valueOf() - startTime.valueOf(),
                                            totalItemCount: this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems
                                        };
                                    }
                                    backendApi.postProcess(processResult);
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                if (backendApi && backendApi.onError) {
                                    backendApi.onError(e_1);
                                }
                                else {
                                    throw e_1;
                                }
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            };
        /**
         * Attach a local sort (single/multi) hook to the grid
         * @param grid SlickGrid Grid object
         * @param gridOptions Grid Options object
         * @param dataView
         */
        /**
         * Attach a local sort (single/multi) hook to the grid
         * @param {?} grid SlickGrid Grid object
         * @param {?} dataView
         * @return {?}
         */
        SortService.prototype.attachLocalOnSort = /**
         * Attach a local sort (single/multi) hook to the grid
         * @param {?} grid SlickGrid Grid object
         * @param {?} dataView
         * @return {?}
         */
            function (grid, dataView) {
                var _this = this;
                this._isBackendGrid = false;
                this._grid = grid;
                this._dataView = dataView;
                this._slickSubscriber = grid.onSort;
                this._slickSubscriber.subscribe(function (e, args) {
                    // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
                    // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
                    /** @type {?} */
                    var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
                    // keep current sorters
                    _this._currentLocalSorters = []; // reset current local sorters
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
        /**
         * @return {?}
         */
        SortService.prototype.clearSorting = /**
         * @return {?}
         */
            function () {
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
            };
        /**
         * @return {?}
         */
        SortService.prototype.getCurrentLocalSorters = /**
         * @return {?}
         */
            function () {
                return this._currentLocalSorters;
            };
        /**
         * Get column sorts,
         * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
         * We want to know the sort prior to calling the next sorting command
         */
        /**
         * Get column sorts,
         * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
         * We want to know the sort prior to calling the next sorting command
         * @param {?=} columnId
         * @return {?}
         */
        SortService.prototype.getPreviousColumnSorts = /**
         * Get column sorts,
         * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
         * We want to know the sort prior to calling the next sorting command
         * @param {?=} columnId
         * @return {?}
         */
            function (columnId) {
                var _this = this;
                // getSortColumns() only returns sortAsc & columnId, we want the entire column definition
                /** @type {?} */
                var oldSortColumns = this._grid && this._grid.getSortColumns();
                // get the column definition but only keep column which are not equal to our current column
                if (Array.isArray(oldSortColumns)) {
                    /** @type {?} */
                    var sortedCols = oldSortColumns.reduce(function (cols, col) {
                        if (!columnId || col.columnId !== columnId) {
                            cols.push({ sortCol: _this._columnDefinitions[_this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
                        }
                        return cols;
                    }, []);
                    return sortedCols;
                }
                return [];
            };
        /**
         * load any presets if there are any
         * @param grid
         * @param dataView
         */
        /**
         * load any presets if there are any
         * @param {?} grid
         * @param {?} dataView
         * @return {?}
         */
        SortService.prototype.loadLocalPresets = /**
         * load any presets if there are any
         * @param {?} grid
         * @param {?} dataView
         * @return {?}
         */
            function (grid, dataView) {
                var _this = this;
                /** @type {?} */
                var sortCols = [];
                this._currentLocalSorters = []; // reset current local sorters
                if (this._gridOptions && this._gridOptions.presets && this._gridOptions.presets.sorters) {
                    /** @type {?} */
                    var sorters = this._gridOptions.presets.sorters;
                    sorters.forEach(function (presetSorting) {
                        /** @type {?} */
                        var gridColumn = _this._columnDefinitions.find(function (col) { return col.id === presetSorting.columnId; });
                        if (gridColumn) {
                            sortCols.push({
                                columnId: gridColumn.id,
                                sortAsc: ((presetSorting.direction.toUpperCase() === SortDirection.ASC) ? true : false),
                                sortCol: gridColumn
                            });
                            // keep current sorters
                            _this._currentLocalSorters.push({
                                columnId: gridColumn.id + '',
                                direction: ( /** @type {?} */(presetSorting.direction.toUpperCase()))
                            });
                        }
                    });
                    if (sortCols.length > 0) {
                        this.onLocalSortChanged(grid, dataView, sortCols);
                        grid.setSortColumns(sortCols); // use this to add sort icon(s) in UI
                    }
                }
            };
        /**
         * @param {?} grid
         * @param {?} dataView
         * @param {?} sortColumns
         * @return {?}
         */
        SortService.prototype.onLocalSortChanged = /**
         * @param {?} grid
         * @param {?} dataView
         * @param {?} sortColumns
         * @return {?}
         */
            function (grid, dataView, sortColumns) {
                if (grid && dataView) {
                    dataView.sort(function (dataRow1, dataRow2) {
                        for (var i = 0, l = sortColumns.length; i < l; i++) {
                            /** @type {?} */
                            var columnSortObj = sortColumns[i];
                            if (columnSortObj && columnSortObj.sortCol) {
                                /** @type {?} */
                                var sortDirection = columnSortObj.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
                                /** @type {?} */
                                var sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldFilter || columnSortObj.sortCol.field;
                                /** @type {?} */
                                var fieldType = columnSortObj.sortCol.type || FieldType.string;
                                /** @type {?} */
                                var value1 = dataRow1[sortField];
                                /** @type {?} */
                                var value2 = dataRow2[sortField];
                                // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                                if (sortField && sortField.indexOf('.') >= 0) {
                                    value1 = getDescendantProperty(dataRow1, sortField);
                                    value2 = getDescendantProperty(dataRow2, sortField);
                                }
                                /** @type {?} */
                                var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
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
            };
        /**
         * @return {?}
         */
        SortService.prototype.dispose = /**
         * @return {?}
         */
            function () {
                // unsubscribe local event
                if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
                    this._slickSubscriber.unsubscribe();
                }
                // unsubscribe all SlickGrid events
                this._eventHandler.unsubscribeAll();
            };
        /**
         * A simple function that is attached to the subscriber and emit a change when the sort is called.
         * Other services, like Pagination, can then subscribe to it.
         * @param sender
         */
        /**
         * A simple function that is attached to the subscriber and emit a change when the sort is called.
         * Other services, like Pagination, can then subscribe to it.
         * @param {?} sender
         * @return {?}
         */
        SortService.prototype.emitSortChanged = /**
         * A simple function that is attached to the subscriber and emit a change when the sort is called.
         * Other services, like Pagination, can then subscribe to it.
         * @param {?} sender
         * @return {?}
         */
            function (sender) {
                if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
                    /** @type {?} */
                    var currentSorters = [];
                    /** @type {?} */
                    var backendService = this._gridOptions.backendServiceApi.service;
                    if (backendService && backendService.getCurrentSorters) {
                        currentSorters = ( /** @type {?} */(backendService.getCurrentSorters()));
                    }
                    this.onSortChanged.next(currentSorters);
                }
                else if (sender === 'local') {
                    this.onSortChanged.next(this.getCurrentLocalSorters());
                }
            };
        return SortService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GridMenuExtension = /** @class */ (function () {
        function GridMenuExtension(exportService, extensionUtility, filterService, sharedService, sortService, translate) {
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
        GridMenuExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                // unsubscribe all SlickGrid events
                this._eventHandler.unsubscribeAll();
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        /** Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...) */
        /**
         * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
         * @return {?}
         */
        GridMenuExtension.prototype.register = /**
         * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
         * @return {?}
         */
            function () {
                var _this = this;
                // keep original user grid menu, useful when switching locale to translate
                this._userOriginalGridMenu = __assign({}, this.sharedService.gridOptions.gridMenu);
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
                    // dynamically import the SlickGrid plugin with requireJS
                    this.extensionUtility.loadExtensionDynamically(ExtensionName.gridMenu);
                    this.sharedService.gridOptions.gridMenu = __assign({}, this.getDefaultGridMenuOptions(), this.sharedService.gridOptions.gridMenu);
                    // merge original user grid menu items with internal items
                    // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
                    this.sharedService.gridOptions.gridMenu.customItems = __spread(this._userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
                    this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
                    this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
                    this._extension = new Slick.Controls.GridMenu(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
                    if (this.sharedService.grid && this.sharedService.gridOptions.gridMenu) {
                        this._eventHandler.subscribe(this._extension.onBeforeMenuShow, function (e, args) {
                            if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onBeforeMenuShow === 'function') {
                                _this.sharedService.gridOptions.gridMenu.onBeforeMenuShow(e, args);
                            }
                        });
                        this._eventHandler.subscribe(this._extension.onColumnsChanged, function (e, args) {
                            _this._areVisibleColumnDifferent = true;
                            if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onColumnsChanged === 'function') {
                                _this.sharedService.gridOptions.gridMenu.onColumnsChanged(e, args);
                            }
                        });
                        this._eventHandler.subscribe(this._extension.onCommand, function (e, args) {
                            _this.executeGridMenuInternalCustomCommands(e, args);
                            if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onCommand === 'function') {
                                _this.sharedService.gridOptions.gridMenu.onCommand(e, args);
                            }
                        });
                        this._eventHandler.subscribe(this._extension.onMenuClose, function (e, args) {
                            if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onMenuClose === 'function') {
                                _this.sharedService.gridOptions.gridMenu.onMenuClose(e, args);
                            }
                            // we also want to resize the columns if the user decided to hide certain column(s)
                            if (_this.sharedService.grid && typeof _this.sharedService.grid.autosizeColumns === 'function') {
                                // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
                                /** @type {?} */
                                var gridUid = _this.sharedService.grid.getUID();
                                if (_this._areVisibleColumnDifferent && gridUid && $("." + gridUid).length > 0) {
                                    if (_this.sharedService.gridOptions && _this.sharedService.gridOptions.enableAutoSizeColumns) {
                                        _this.sharedService.grid.autosizeColumns();
                                    }
                                    _this._areVisibleColumnDifferent = false;
                                }
                            }
                        });
                    }
                    return this._extension;
                }
                return null;
            };
        /**
        * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
        * These are the default internal custom commands
        * @param event
        * @param GridMenuItem args
        */
        /**
         * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
         * These are the default internal custom commands
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        GridMenuExtension.prototype.executeGridMenuInternalCustomCommands = /**
         * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
         * These are the default internal custom commands
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
            function (e, args) {
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
                        case 'toggle-preheader':
                            this.sharedService.grid.setPreHeaderPanelVisibility(!this.sharedService.grid.getOptions().showPreHeaderPanel);
                            break;
                        case 'refresh-dataset':
                            this.refreshBackendDataset();
                            break;
                        default:
                            break;
                    }
                }
            };
        /** Refresh the dataset through the Backend Service */
        /**
         * Refresh the dataset through the Backend Service
         * @param {?=} gridOptions
         * @return {?}
         */
        GridMenuExtension.prototype.refreshBackendDataset = /**
         * Refresh the dataset through the Backend Service
         * @param {?=} gridOptions
         * @return {?}
         */
            function (gridOptions) {
                var _this = this;
                /** @type {?} */
                var query = '';
                // user can pass new set of grid options which will override current ones
                if (gridOptions) {
                    this.sharedService.gridOptions = __assign({}, this.sharedService.gridOptions, gridOptions);
                }
                /** @type {?} */
                var backendApi = this.sharedService.gridOptions.backendServiceApi;
                if (!backendApi || !backendApi.service || !backendApi.process) {
                    throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
                }
                if (backendApi.service) {
                    query = backendApi.service.buildQuery();
                }
                if (query && query !== '') {
                    // keep start time & end timestamps & return it after process execution
                    /** @type {?} */
                    var startTime_1 = new Date();
                    if (backendApi.preProcess) {
                        backendApi.preProcess();
                    }
                    // the process could be an Observable (like HttpClient) or a Promise
                    // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                    /** @type {?} */
                    var observableOrPromise = backendApi.process(query);
                    castToPromise(observableOrPromise).then(function (processResult) {
                        /** @type {?} */
                        var endTime = new Date();
                        // from the result, call our internal post process to update the Dataset and Pagination info
                        if (processResult && backendApi && backendApi.internalPostProcess) {
                            backendApi.internalPostProcess(processResult);
                        }
                        // send the response process to the postProcess callback
                        if (backendApi && backendApi.postProcess) {
                            if (processResult instanceof Object) {
                                processResult.statistics = {
                                    startTime: startTime_1,
                                    endTime: endTime,
                                    executionTime: endTime.valueOf() - startTime_1.valueOf(),
                                    totalItemCount: _this.sharedService.gridOptions && _this.sharedService.gridOptions.pagination && _this.sharedService.gridOptions.pagination.totalItems
                                };
                            }
                            backendApi.postProcess(processResult);
                        }
                    });
                }
            };
        /** Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL) */
        /**
         * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
         * @private
         * @return {?}
         */
        GridMenuExtension.prototype.addGridMenuCustomCommands = /**
         * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
         * @private
         * @return {?}
         */
            function () {
                /** @type {?} */
                var backendApi = this.sharedService.gridOptions.backendServiceApi || null;
                /** @type {?} */
                var gridMenuCustomItems = [];
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
                if (this.sharedService.gridOptions.showPreHeaderPanel) {
                    // show grid menu: toggle pre-header row
                    if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideTogglePreHeaderCommand) {
                        gridMenuCustomItems.push({
                            iconCssClass: this.sharedService.gridOptions.gridMenu.iconTogglePreHeaderCommand || 'fa fa-random',
                            title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_PRE_HEADER_ROW') : Constants.TEXT_TOGGLE_PRE_HEADER_ROW,
                            disabled: false,
                            command: 'toggle-preheader',
                            positionOrder: 52
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
            };
        /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
        /**
         * Execute the Header Menu Commands that was triggered by the onCommand subscribe
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        GridMenuExtension.prototype.executeHeaderMenuInternalCommands = /**
         * Execute the Header Menu Commands that was triggered by the onCommand subscribe
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
            function (e, args) {
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
                            /** @type {?} */
                            var cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
                            // add to the column array, the column sorted by the header menu
                            cols.push({ sortCol: args.column, sortAsc: (args.command === 'sort-asc') });
                            if (this.sharedService.gridOptions.backendServiceApi) {
                                this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid: this.sharedService.grid });
                            }
                            else {
                                this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, cols);
                            }
                            // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                            /** @type {?} */
                            var newSortColumns = cols.map(function (col) {
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
            };
        /** Hide a column from the grid */
        /**
         * Hide a column from the grid
         * @param {?} column
         * @return {?}
         */
        GridMenuExtension.prototype.hideColumn = /**
         * Hide a column from the grid
         * @param {?} column
         * @return {?}
         */
            function (column) {
                if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
                    /** @type {?} */
                    var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
                    this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
                    this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
                }
            };
        /** Translate the Grid Menu titles and column picker */
        /**
         * Translate the Grid Menu titles and column picker
         * @return {?}
         */
        GridMenuExtension.prototype.translateGridMenu = /**
         * Translate the Grid Menu titles and column picker
         * @return {?}
         */
            function () {
                // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
                // we also need to call the control init so that it takes the new Grid object with latest values
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
                    this.sharedService.gridOptions.gridMenu.customItems = [];
                    this.emptyGridMenuTitles();
                    // merge original user grid menu items with internal items
                    // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
                    this.sharedService.gridOptions.gridMenu.customItems = __spread(this._userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
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
            };
        /**
         * @private
         * @return {?}
         */
        GridMenuExtension.prototype.emptyGridMenuTitles = /**
         * @private
         * @return {?}
         */
            function () {
                if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
                    this.sharedService.gridOptions.gridMenu.customTitle = '';
                    this.sharedService.gridOptions.gridMenu.columnTitle = '';
                    this.sharedService.gridOptions.gridMenu.forceFitTitle = '';
                    this.sharedService.gridOptions.gridMenu.syncResizeTitle = '';
                }
            };
        /**
        * @return default Grid Menu options
        */
        /**
         * @private
         * @return {?} default Grid Menu options
         */
        GridMenuExtension.prototype.getDefaultGridMenuOptions = /**
         * @private
         * @return {?} default Grid Menu options
         */
            function () {
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
            };
        GridMenuExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        GridMenuExtension.ctorParameters = function () {
            return [
                { type: ExportService },
                { type: ExtensionUtility },
                { type: FilterService },
                { type: SharedService },
                { type: SortService },
                { type: core$1.TranslateService }
            ];
        };
        return GridMenuExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GroupItemMetaProviderExtension = /** @class */ (function () {
        function GroupItemMetaProviderExtension(sharedService) {
            this.sharedService = sharedService;
        }
        /**
         * @return {?}
         */
        GroupItemMetaProviderExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        /** register the group item metadata provider to add expand/collapse group handlers */
        /**
         * register the group item metadata provider to add expand/collapse group handlers
         * @return {?}
         */
        GroupItemMetaProviderExtension.prototype.register = /**
         * register the group item metadata provider to add expand/collapse group handlers
         * @return {?}
         */
            function () {
                if (this.sharedService && this.sharedService.grid) {
                    this._extension = this.sharedService.groupItemMetadataProvider || {};
                    this.sharedService.grid.registerPlugin(this._extension);
                    return this._extension;
                }
                return null;
            };
        GroupItemMetaProviderExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        GroupItemMetaProviderExtension.ctorParameters = function () {
            return [
                { type: SharedService }
            ];
        };
        return GroupItemMetaProviderExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HeaderButtonExtension = /** @class */ (function () {
        function HeaderButtonExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
            this._eventHandler = new Slick.EventHandler();
        }
        /**
         * @return {?}
         */
        HeaderButtonExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                // unsubscribe all SlickGrid events
                this._eventHandler.unsubscribeAll();
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        // Header Button Plugin
        // Header Button Plugin
        /**
         * @return {?}
         */
        HeaderButtonExtension.prototype.register =
            // Header Button Plugin
            /**
             * @return {?}
             */
            function () {
                var _this = this;
                if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                    // dynamically import the SlickGrid plugin with requireJS
                    this.extensionUtility.loadExtensionDynamically(ExtensionName.headerButton);
                    this._extension = new Slick.Plugins.HeaderButtons(this.sharedService.gridOptions.headerButton || {});
                    this.sharedService.grid.registerPlugin(this._extension);
                    this._eventHandler.subscribe(this._extension.onCommand, function (e, args) {
                        if (_this.sharedService.gridOptions.headerButton && typeof _this.sharedService.gridOptions.headerButton.onCommand === 'function') {
                            _this.sharedService.gridOptions.headerButton.onCommand(e, args);
                        }
                    });
                    return this._extension;
                }
                return null;
            };
        HeaderButtonExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HeaderButtonExtension.ctorParameters = function () {
            return [
                { type: ExtensionUtility },
                { type: SharedService }
            ];
        };
        return HeaderButtonExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HeaderMenuExtension = /** @class */ (function () {
        function HeaderMenuExtension(extensionUtility, sharedService, sortService, translate) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
            this.sortService = sortService;
            this.translate = translate;
            this._eventHandler = new Slick.EventHandler();
        }
        /**
         * @return {?}
         */
        HeaderMenuExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                // unsubscribe all SlickGrid events
                this._eventHandler.unsubscribeAll();
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        /**
        * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
        * @param grid
        * @param dataView
        * @param columnDefinitions
        */
        /**
         * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
         * @return {?}
         */
        HeaderMenuExtension.prototype.register = /**
         * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                    // dynamically import the SlickGrid plugin with requireJS
                    this.extensionUtility.loadExtensionDynamically(ExtensionName.headerMenu);
                    this.sharedService.gridOptions.headerMenu = __assign({}, this.getDefaultHeaderMenuOptions(), this.sharedService.gridOptions.headerMenu);
                    if (this.sharedService.gridOptions.enableHeaderMenu) {
                        this.sharedService.gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this.sharedService.gridOptions, this.sharedService.columnDefinitions);
                    }
                    this._extension = new Slick.Plugins.HeaderMenu(this.sharedService.gridOptions.headerMenu);
                    this.sharedService.grid.registerPlugin(this._extension);
                    this._eventHandler.subscribe(this._extension.onCommand, function (e, args) {
                        _this.executeHeaderMenuInternalCommands(e, args);
                        if (_this.sharedService.gridOptions.headerMenu && typeof _this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
                            _this.sharedService.gridOptions.headerMenu.onCommand(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._extension.onBeforeMenuShow, function (e, args) {
                        if (_this.sharedService.gridOptions.headerMenu && typeof _this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                            _this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
                        }
                    });
                    return this._extension;
                }
                return null;
            };
        /**
         * Create Header Menu with Custom Commands if user has enabled Header Menu
         * @param options
         * @param columnDefinitions
         * @return header menu
         */
        /**
         * Create Header Menu with Custom Commands if user has enabled Header Menu
         * @private
         * @param {?} options
         * @param {?} columnDefinitions
         * @return {?} header menu
         */
        HeaderMenuExtension.prototype.addHeaderMenuCustomCommands = /**
         * Create Header Menu with Custom Commands if user has enabled Header Menu
         * @private
         * @param {?} options
         * @param {?} columnDefinitions
         * @return {?} header menu
         */
            function (options, columnDefinitions) {
                var _this = this;
                /** @type {?} */
                var headerMenuOptions = options.headerMenu || {};
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
                            /** @type {?} */
                            var columnHeaderMenuItems = columnDef && columnDef.header && columnDef.header.menu && columnDef.header.menu.items || [];
                            // Sorting Commands
                            if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
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
                            // Hide Column Command
                            if (headerMenuOptions && !headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter(function (item) { return item.command === 'hide'; }).length === 0) {
                                columnHeaderMenuItems.push({
                                    iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
                                    title: options.enableTranslate ? _this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
                                    command: 'hide',
                                    positionOrder: 52
                                });
                            }
                            _this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                            // sort the custom items by their position in the list
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
        /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
        /**
         * Execute the Header Menu Commands that was triggered by the onCommand subscribe
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
        HeaderMenuExtension.prototype.executeHeaderMenuInternalCommands = /**
         * Execute the Header Menu Commands that was triggered by the onCommand subscribe
         * @param {?} e
         * @param {?} args
         * @return {?}
         */
            function (e, args) {
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
                            /** @type {?} */
                            var cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
                            // add to the column array, the column sorted by the header menu
                            cols.push({ sortCol: args.column, sortAsc: (args.command === 'sort-asc') });
                            if (this.sharedService.gridOptions.backendServiceApi) {
                                this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid: this.sharedService.grid });
                            }
                            else if (this.sharedService.dataView) {
                                this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, cols);
                            }
                            else {
                                // when using customDataView, we will simply send it as a onSort event with notify
                                /** @type {?} */
                                var isMultiSort = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                                /** @type {?} */
                                var sortOutput = isMultiSort ? cols : cols[0];
                                args.grid.onSort.notify(sortOutput);
                            }
                            // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                            /** @type {?} */
                            var newSortColumns = cols.map(function (col) {
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
            };
        /** Hide a column from the grid */
        /**
         * Hide a column from the grid
         * @param {?} column
         * @return {?}
         */
        HeaderMenuExtension.prototype.hideColumn = /**
         * Hide a column from the grid
         * @param {?} column
         * @return {?}
         */
            function (column) {
                if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
                    /** @type {?} */
                    var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
                    this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
                    this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
                }
            };
        /**
         * Reset all the Grid Menu options which have text to translate
         * @param grid menu object
         */
        /**
         * Reset all the Grid Menu options which have text to translate
         * @param {?} columnDefinitions
         * @return {?}
         */
        HeaderMenuExtension.prototype.resetHeaderMenuTranslations = /**
         * Reset all the Grid Menu options which have text to translate
         * @param {?} columnDefinitions
         * @return {?}
         */
            function (columnDefinitions) {
                var _this = this;
                columnDefinitions.forEach(function (columnDef) {
                    if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
                        if (!columnDef.excludeFromHeaderMenu) {
                            /** @type {?} */
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
                                // re-translate if there's a "titleKey"
                                if (_this.sharedService.gridOptions && _this.sharedService.gridOptions.enableTranslate) {
                                    _this.extensionUtility.translateItems(columnHeaderMenuItems_1, 'titleKey', 'title');
                                }
                            });
                        }
                    }
                });
            };
        /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         */
        /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         * @return {?}
         */
        HeaderMenuExtension.prototype.translateHeaderMenu = /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         * @return {?}
         */
            function () {
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
                    this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
                }
            };
        /**
         * @return default Header Menu options
         */
        /**
         * @private
         * @return {?} default Header Menu options
         */
        HeaderMenuExtension.prototype.getDefaultHeaderMenuOptions = /**
         * @private
         * @return {?} default Header Menu options
         */
            function () {
                return {
                    autoAlignOffset: 12,
                    minWidth: 140,
                    hideColumnHideCommand: false,
                    hideSortCommands: false,
                    title: ''
                };
            };
        HeaderMenuExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        HeaderMenuExtension.ctorParameters = function () {
            return [
                { type: ExtensionUtility },
                { type: SharedService },
                { type: SortService },
                { type: core$1.TranslateService }
            ];
        };
        return HeaderMenuExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RowMoveManagerExtension = /** @class */ (function () {
        function RowMoveManagerExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
            this._eventHandler = new Slick.EventHandler();
        }
        /**
         * @return {?}
         */
        RowMoveManagerExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                // unsubscribe all SlickGrid events
                this._eventHandler.unsubscribeAll();
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        /**
         * @param {?=} rowSelectionPlugin
         * @return {?}
         */
        RowMoveManagerExtension.prototype.register = /**
         * @param {?=} rowSelectionPlugin
         * @return {?}
         */
            function (rowSelectionPlugin) {
                var _this = this;
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
                        this._eventHandler.subscribe(this._extension.onBeforeMoveRows, function (e, args) {
                            if (_this.sharedService.gridOptions.rowMoveManager && typeof _this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows === 'function') {
                                _this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows(e, args);
                            }
                        });
                        this._eventHandler.subscribe(this._extension.onMoveRows, function (e, args) {
                            if (_this.sharedService.gridOptions.rowMoveManager && typeof _this.sharedService.gridOptions.rowMoveManager.onMoveRows === 'function') {
                                _this.sharedService.gridOptions.rowMoveManager.onMoveRows(e, args);
                            }
                        });
                    }
                    return this._extension;
                }
                return null;
            };
        RowMoveManagerExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        RowMoveManagerExtension.ctorParameters = function () {
            return [
                { type: ExtensionUtility },
                { type: SharedService }
            ];
        };
        return RowMoveManagerExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RowSelectionExtension = /** @class */ (function () {
        function RowSelectionExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
        }
        /**
         * @return {?}
         */
        RowSelectionExtension.prototype.dispose = /**
         * @return {?}
         */
            function () {
                if (this._extension && this._extension.destroy) {
                    this._extension.destroy();
                }
            };
        /**
         * @return {?}
         */
        RowSelectionExtension.prototype.register = /**
         * @return {?}
         */
            function () {
                if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                    // dynamically import the SlickGrid plugin with requireJS
                    this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
                    this._extension = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                    this.sharedService.grid.setSelectionModel(this._extension);
                    return this._extension;
                }
                return null;
            };
        RowSelectionExtension.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        RowSelectionExtension.ctorParameters = function () {
            return [
                { type: ExtensionUtility },
                { type: SharedService }
            ];
        };
        return RowSelectionExtension;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ExtensionService = /** @class */ (function () {
        function ExtensionService(autoTooltipExtension, cellExternalCopyExtension, checkboxSelectorExtension, columnPickerExtension, draggableGroupingExtension, gridMenuExtension, groupItemMetaExtension, headerButtonExtension, headerMenuExtension, rowMoveManagerExtension, rowSelectionExtension, sharedService, translate) {
            this.autoTooltipExtension = autoTooltipExtension;
            this.cellExternalCopyExtension = cellExternalCopyExtension;
            this.checkboxSelectorExtension = checkboxSelectorExtension;
            this.columnPickerExtension = columnPickerExtension;
            this.draggableGroupingExtension = draggableGroupingExtension;
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
        /** Dispose of all the controls & plugins */
        /**
         * Dispose of all the controls & plugins
         * @return {?}
         */
        ExtensionService.prototype.dispose = /**
         * Dispose of all the controls & plugins
         * @return {?}
         */
            function () {
                this.sharedService.grid = null;
                this.sharedService.visibleColumns = [];
                // dispose of each control/plugin & reset the list
                this.extensionList.forEach(function (item) {
                    if (item && item.class && item.class.dispose) {
                        item.class.dispose();
                    }
                });
                this.extensionList = [];
            };
        /** Get all columns (includes visible and non-visible) */
        /**
         * Get all columns (includes visible and non-visible)
         * @return {?}
         */
        ExtensionService.prototype.getAllColumns = /**
         * Get all columns (includes visible and non-visible)
         * @return {?}
         */
            function () {
                return this.sharedService.allColumns || [];
            };
        /** Get only visible columns */
        /**
         * Get only visible columns
         * @return {?}
         */
        ExtensionService.prototype.getVisibleColumns = /**
         * Get only visible columns
         * @return {?}
         */
            function () {
                return this.sharedService.visibleColumns || [];
            };
        /** Get all Extensions */
        /**
         * Get all Extensions
         * @return {?}
         */
        ExtensionService.prototype.getAllExtensions = /**
         * Get all Extensions
         * @return {?}
         */
            function () {
                return this.extensionList;
            };
        /**
         * Get an Extension by it's name
         *  @param name
         */
        /**
         * Get an Extension by it's name
         * @param {?} name
         * @return {?}
         */
        ExtensionService.prototype.getExtensionByName = /**
         * Get an Extension by it's name
         * @param {?} name
         * @return {?}
         */
            function (name) {
                return this.extensionList.find(function (p) { return p.name === name; });
            };
        /** Auto-resize all the column in the grid to fit the grid width */
        /**
         * Auto-resize all the column in the grid to fit the grid width
         * @return {?}
         */
        ExtensionService.prototype.autoResizeColumns = /**
         * Auto-resize all the column in the grid to fit the grid width
         * @return {?}
         */
            function () {
                this.sharedService.grid.autosizeColumns();
            };
        /** Attach/Create different Controls or Plugins after the Grid is created */
        /**
         * Attach/Create different Controls or Plugins after the Grid is created
         * @return {?}
         */
        ExtensionService.prototype.attachDifferentExtensions = /**
         * Attach/Create different Controls or Plugins after the Grid is created
         * @return {?}
         */
            function () {
                var _this = this;
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
                // Draggable Grouping Plugin
                if (this.sharedService.gridOptions.enableDraggableGrouping) {
                    if (this.draggableGroupingExtension && this.draggableGroupingExtension.register) {
                        this.extensionList.push({ name: ExtensionName.draggableGrouping, class: this.draggableGroupingExtension, extension: this.draggableGroupingExtension.register() });
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
                        /** @type {?} */
                        var rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
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
                        this.sharedService.gridOptions.registerPlugins.forEach(function (plugin) {
                            _this.sharedService.grid.registerPlugin(plugin);
                            _this.extensionList.push({ name: ExtensionName.noname, class: null, extension: plugin });
                        });
                    }
                    else {
                        this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
                        this.extensionList.push({ name: ExtensionName.noname, class: null, extension: this.sharedService.gridOptions.registerPlugins });
                    }
                }
            };
        /**
         * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
         * Mostly because the column definitions might change after the grid creation
         * @param columnDefinitions
         * @param options
         */
        /**
         * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
         * Mostly because the column definitions might change after the grid creation
         * @param {?} columnDefinitions
         * @param {?} options
         * @return {?}
         */
        ExtensionService.prototype.createExtensionsBeforeGridCreation = /**
         * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
         * Mostly because the column definitions might change after the grid creation
         * @param {?} columnDefinitions
         * @param {?} options
         * @return {?}
         */
            function (columnDefinitions, options) {
                if (options.enableCheckboxSelector) {
                    this.checkboxSelectorExtension.create(columnDefinitions, options);
                }
                if (options.enableDraggableGrouping) {
                    /** @type {?} */
                    var plugin = this.draggableGroupingExtension.create(options);
                    options.enableColumnReorder = plugin.getSetupColumnReorder;
                }
            };
        /** Hide a column from the grid */
        /**
         * Hide a column from the grid
         * @param {?} column
         * @return {?}
         */
        ExtensionService.prototype.hideColumn = /**
         * Hide a column from the grid
         * @param {?} column
         * @return {?}
         */
            function (column) {
                if (this.sharedService && this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
                    /** @type {?} */
                    var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
                    this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
                    this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
                }
            };
        /** Refresh the dataset through the Backend Service */
        /**
         * Refresh the dataset through the Backend Service
         * @param {?=} gridOptions
         * @return {?}
         */
        ExtensionService.prototype.refreshBackendDataset = /**
         * Refresh the dataset through the Backend Service
         * @param {?=} gridOptions
         * @return {?}
         */
            function (gridOptions) {
                this.gridMenuExtension.refreshBackendDataset(gridOptions);
            };
        /**
         * Remove a column from the grid by it's index in the grid
         * @param array input
         * @param index
         */
        /**
         * Remove a column from the grid by it's index in the grid
         * @param {?} array input
         * @param {?} index
         * @return {?}
         */
        ExtensionService.prototype.removeColumnByIndex = /**
         * Remove a column from the grid by it's index in the grid
         * @param {?} array input
         * @param {?} index
         * @return {?}
         */
            function (array, index) {
                return array.filter(function (el, i) {
                    return index !== i;
                });
            };
        /** Translate the Column Picker and it's last 2 checkboxes */
        /**
         * Translate the Column Picker and it's last 2 checkboxes
         * @return {?}
         */
        ExtensionService.prototype.translateColumnPicker = /**
         * Translate the Column Picker and it's last 2 checkboxes
         * @return {?}
         */
            function () {
                if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
                    this.columnPickerExtension.translateColumnPicker();
                }
            };
        /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         */
        /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         * @return {?}
         */
        ExtensionService.prototype.translateGridMenu = /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         * @return {?}
         */
            function () {
                if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
                    this.gridMenuExtension.translateGridMenu();
                }
            };
        /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         */
        /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         * @return {?}
         */
        ExtensionService.prototype.translateHeaderMenu = /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         * @return {?}
         */
            function () {
                if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
                    this.headerMenuExtension.translateHeaderMenu();
                }
            };
        /**
         * Translate manually the header titles.
         * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
         * @param locale to use
         * @param new column definitions (optional)
         */
        /**
         * Translate manually the header titles.
         * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
         * @param {?=} locale to use
         * @param {?=} newColumnDefinitions
         * @return {?}
         */
        ExtensionService.prototype.translateColumnHeaders = /**
         * Translate manually the header titles.
         * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
         * @param {?=} locale to use
         * @param {?=} newColumnDefinitions
         * @return {?}
         */
            function (locale, newColumnDefinitions) {
                if (locale) {
                    this.translate.use(( /** @type {?} */(locale)));
                }
                /** @type {?} */
                var columnDefinitions = newColumnDefinitions || this.sharedService.columnDefinitions;
                this.translateItems(columnDefinitions, 'headerKey', 'name');
                this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
                // re-render the column headers
                this.renderColumnHeaders(columnDefinitions);
            };
        /**
         * Render (or re-render) the column headers from column definitions.
         * calling setColumns() will trigger a grid re-render
         */
        /**
         * Render (or re-render) the column headers from column definitions.
         * calling setColumns() will trigger a grid re-render
         * @param {?=} newColumnDefinitions
         * @return {?}
         */
        ExtensionService.prototype.renderColumnHeaders = /**
         * Render (or re-render) the column headers from column definitions.
         * calling setColumns() will trigger a grid re-render
         * @param {?=} newColumnDefinitions
         * @return {?}
         */
            function (newColumnDefinitions) {
                /** @type {?} */
                var collection = newColumnDefinitions || this.sharedService.columnDefinitions;
                if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
                    this.sharedService.grid.setColumns(collection);
                }
            };
        /** Translate the an array of items from an input key and assign to the output key */
        /**
         * Translate the an array of items from an input key and assign to the output key
         * @private
         * @param {?} items
         * @param {?} inputKey
         * @param {?} outputKey
         * @return {?}
         */
        ExtensionService.prototype.translateItems = /**
         * Translate the an array of items from an input key and assign to the output key
         * @private
         * @param {?} items
         * @param {?} inputKey
         * @param {?} outputKey
         * @return {?}
         */
            function (items, inputKey, outputKey) {
                var e_1, _a;
                try {
                    for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                        var item = items_1_1.value;
                        if (item[inputKey]) {
                            item[outputKey] = this.translate.instant(item[inputKey]);
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (items_1_1 && !items_1_1.done && (_a = items_1.return))
                            _a.call(items_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            };
        ExtensionService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ExtensionService.ctorParameters = function () {
            return [
                { type: AutoTooltipExtension },
                { type: CellExternalCopyManagerExtension },
                { type: CheckboxSelectorExtension },
                { type: ColumnPickerExtension },
                { type: DraggableGroupingExtension },
                { type: GridMenuExtension },
                { type: GroupItemMetaProviderExtension },
                { type: HeaderButtonExtension },
                { type: HeaderMenuExtension },
                { type: RowMoveManagerExtension },
                { type: RowSelectionExtension },
                { type: SharedService },
                { type: core$1.TranslateService }
            ];
        };
        return ExtensionService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This GraphqlQueryBuilder class is a lib that already exist
     * but was causing issues with TypeScript, RequireJS and other bundler/packagers
     * and so I rewrote it in pure TypeScript.
     *
     * The previous lib can be viewed here at this Github
     * https://github.com/codemeasandwich/graphql-query-builder
     */
    var /**
     * This GraphqlQueryBuilder class is a lib that already exist
     * but was causing issues with TypeScript, RequireJS and other bundler/packagers
     * and so I rewrote it in pure TypeScript.
     *
     * The previous lib can be viewed here at this Github
     * https://github.com/codemeasandwich/graphql-query-builder
     */ GraphqlQueryBuilder = /** @class */ (function () {
        /* Constructor, query/mutator you wish to use, and an alias or filter arguments. */
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
        /**
         * The parameters to run the query against.
         * @param filters An object mapping attribute to values
         */
        /**
         * The parameters to run the query against.
         * @template THIS
         * @this {THIS}
         * @param {?} filters An object mapping attribute to values
         * @return {THIS}
         */
        GraphqlQueryBuilder.prototype.filter = /**
         * The parameters to run the query against.
         * @template THIS
         * @this {THIS}
         * @param {?} filters An object mapping attribute to values
         * @return {THIS}
         */
            function (filters) {
                var e_1, _a;
                try {
                    for (var _b = __values(Object.keys(filters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var prop = _c.value;
                        if (typeof filters[prop] === 'function') {
                            continue;
                        }
                        /** @type {?} */
                        var val = ( /** @type {?} */(this)).getGraphQLValue(filters[prop]);
                        if (val === '{}') {
                            continue;
                        }
                        ( /** @type {?} */(this)).head.push(prop + ":" + val);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                return ( /** @type {?} */(this));
            };
        /**
         * Outlines the properties you wish to be returned from the query.
         * @param properties representing each attribute you want Returned
         */
        /**
         * Outlines the properties you wish to be returned from the query.
         * @template THIS
         * @this {THIS}
         * @param {...?} searches
         * @return {THIS}
         */
        GraphqlQueryBuilder.prototype.find = /**
         * Outlines the properties you wish to be returned from the query.
         * @template THIS
         * @this {THIS}
         * @param {...?} searches
         * @return {THIS}
         */
            function () {
                var searches = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    searches[_i] = arguments[_i];
                }
                if (!searches) {
                    throw new TypeError("find value can not be >>falsy<<");
                }
                // if its a string.. it may have other values
                // else it sould be an Object or Array of maped values
                /** @type {?} */
                var searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
                ( /** @type {?} */(this)).body = ( /** @type {?} */(this)).parceFind(searchKeys);
                return ( /** @type {?} */(this));
            };
        /**
         * set an alias for this result.
         * @param alias
         */
        /**
         * set an alias for this result.
         * @param {?} alias
         * @return {?}
         */
        GraphqlQueryBuilder.prototype.setAlias = /**
         * set an alias for this result.
         * @param {?} alias
         * @return {?}
         */
            function (alias) {
                this.alias = alias;
            };
        /**
         * Return to the formatted query string
         * @return
         */
        /**
         * Return to the formatted query string
         * @return {?}
         */
        GraphqlQueryBuilder.prototype.toString = /**
         * Return to the formatted query string
         * @return {?}
         */
            function () {
                if (this.body === undefined) {
                    throw new ReferenceError("return properties are not defined. use the 'find' function to defined them");
                }
                return ((this.alias) ? (this.alias + ':') : '') + " " + this.queryFnName + " " + ((this.head.length > 0) ? '(' + this.head.join(',') + ')' : '') + "  { " + this.body + " }";
            };
        // --
        // PRIVATE FUNCTIONS
        // -----------------
        // --
        // PRIVATE FUNCTIONS
        // -----------------
        /**
         * @private
         * @param {?} _levelA
         * @return {?}
         */
        GraphqlQueryBuilder.prototype.parceFind =
            // --
            // PRIVATE FUNCTIONS
            // -----------------
            /**
             * @private
             * @param {?} _levelA
             * @return {?}
             */
            function (_levelA) {
                /** @type {?} */
                var propsA = _levelA.map(function (currentValue, index) {
                    /** @type {?} */
                    var itemX = _levelA[index];
                    if (itemX instanceof GraphqlQueryBuilder) {
                        return itemX.toString();
                    }
                    else if (!Array.isArray(itemX) && typeof itemX === 'object') {
                        /** @type {?} */
                        var propsAA = Object.keys(itemX);
                        if (1 !== propsAA.length) {
                            throw new RangeError("Alias objects should only have one value. was passed: " + JSON.stringify(itemX));
                        }
                        /** @type {?} */
                        var propS = propsAA[0];
                        /** @type {?} */
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
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        GraphqlQueryBuilder.prototype.getGraphQLValue = /**
         * @private
         * @param {?} value
         * @return {?}
         */
            function (value) {
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
        /**
         * @private
         * @param {?} obj
         * @return {?}
         */
        GraphqlQueryBuilder.prototype.objectToString = /**
         * @private
         * @param {?} obj
         * @return {?}
         */
            function (obj) {
                var e_2, _a;
                /** @type {?} */
                var sourceA = [];
                try {
                    for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var prop = _c.value;
                        if (typeof obj[prop] === 'function') {
                            continue;
                        }
                        sourceA.push(prop + ":" + this.getGraphQLValue(obj[prop]));
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
                return "{" + sourceA.join() + "}";
            };
        return GraphqlQueryBuilder;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // timer for keeping track of user typing waits
    /** @type {?} */
    var timer;
    /** @type {?} */
    var DEFAULT_FILTER_TYPING_DEBOUNCE = 750;
    /** @type {?} */
    var DEFAULT_ITEMS_PER_PAGE = 25;
    /** @type {?} */
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
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
         * @param serviceOptions GraphqlServiceOption
         */
        /**
         * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
         * @return {?}
         */
        GraphqlService.prototype.buildQuery = /**
         * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
         * @return {?}
         */
            function () {
                var e_1, _a, e_2, _b;
                if (!this.options || !this.options.datasetName || (!this._columnDefinitions && !this.options.columnDefinitions)) {
                    throw new Error('GraphQL Service requires "datasetName" & "columnDefinitions" properties for it to work');
                }
                // get the column definitions and exclude some if they were tagged as excluded
                /** @type {?} */
                var columnDefinitions = this._columnDefinitions || this.options.columnDefinitions;
                columnDefinitions = columnDefinitions.filter(function (column) { return !column.excludeFromQuery; });
                /** @type {?} */
                var queryQb = new GraphqlQueryBuilder('query');
                /** @type {?} */
                var datasetQb = new GraphqlQueryBuilder(this.options.datasetName);
                /** @type {?} */
                var dataQb = (this.options.isWithCursor) ? new GraphqlQueryBuilder('edges') : new GraphqlQueryBuilder('nodes');
                // get all the columnds Ids for the filters to work
                /** @type {?} */
                var columnIds = [];
                if (columnDefinitions && Array.isArray(columnDefinitions)) {
                    try {
                        for (var columnDefinitions_1 = __values(columnDefinitions), columnDefinitions_1_1 = columnDefinitions_1.next(); !columnDefinitions_1_1.done; columnDefinitions_1_1 = columnDefinitions_1.next()) {
                            var column = columnDefinitions_1_1.value;
                            columnIds.push(column.field);
                            // if extra "fields" are passed, also push them to columnIds
                            if (column.fields) {
                                columnIds.push.apply(columnIds, __spread(column.fields));
                            }
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (columnDefinitions_1_1 && !columnDefinitions_1_1.done && (_a = columnDefinitions_1.return))
                                _a.call(columnDefinitions_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
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
                /** @type {?} */
                var filters = this.buildFilterQuery(columnIds);
                if (this.options.isWithCursor) {
                    // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
                    /** @type {?} */
                    var pageInfoQb = new GraphqlQueryBuilder('pageInfo');
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
                /** @type {?} */
                var datasetFilters = {};
                // only add pagination if it's enabled in the grid options
                if (this._gridOptions.enablePagination !== false) {
                    datasetFilters = __assign({}, this.options.paginationOptions, { first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first });
                    if (!this.options.isWithCursor) {
                        datasetFilters.offset = ((this.options.paginationOptions && this.options.paginationOptions.hasOwnProperty('offset')) ? +this.options.paginationOptions['offset'] : 0);
                    }
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
                    try {
                        // first: 20, ... userId: 123
                        for (var _c = __values(this.options.extraQueryArguments), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var queryArgument = _d.value;
                            datasetFilters[queryArgument.field] = queryArgument.value;
                        }
                    }
                    catch (e_2_1) {
                        e_2 = { error: e_2_1 };
                    }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return))
                                _b.call(_c);
                        }
                        finally {
                            if (e_2)
                                throw e_2.error;
                        }
                    }
                }
                // query { users(first: 20, orderBy: [], filterBy: [])}
                datasetQb.filter(datasetFilters);
                queryQb.find(datasetQb);
                /** @type {?} */
                var enumSearchProperties = ['direction:', 'field:', 'operator:'];
                return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties, this.options.keepArgumentFieldDoubleQuotes || false);
            };
        /**
         * From an input array of strings, we want to build a GraphQL query string.
         * The process has to take the dot notation and parse it into a valid GraphQL query
         * Following this SO answer https://stackoverflow.com/a/47705476/1212166
         *
         * INPUT
         *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
         * OUTPUT
         * firstName, lastName, billing{address{street, zip}}
         * @param inputArray
         */
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
        GraphqlService.prototype.buildFilterQuery = /**
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
            function (inputArray) {
                /** @type {?} */
                var set = function (o, a) {
                    if (o === void 0) {
                        o = {};
                    }
                    /** @type {?} */
                    var k = a.shift();
                    o[k] = a.length ? set(o[k], a) : null;
                    return o;
                };
                /** @type {?} */
                var output = inputArray.reduce(function (o, a) { return set(o, a.split('.')); }, {});
                return JSON.stringify(output)
                    .replace(/\"|\:|null/g, '')
                    .replace(/^\{/, '')
                    .replace(/\}$/, '');
            };
        /**
         * @param {?=} serviceOptions
         * @param {?=} pagination
         * @param {?=} grid
         * @return {?}
         */
        GraphqlService.prototype.init = /**
         * @param {?=} serviceOptions
         * @param {?=} pagination
         * @param {?=} grid
         * @return {?}
         */
            function (serviceOptions, pagination, grid) {
                this._grid = grid;
                this.options = serviceOptions || {};
                this.pagination = pagination;
                if (grid && grid.getColumns) {
                    this._columnDefinitions = serviceOptions.columnDefinitions || grid.getColumns();
                }
            };
        /**
         * Get an initialization of Pagination options
         * @return Pagination Options
         */
        /**
         * Get an initialization of Pagination options
         * @return {?} Pagination Options
         */
        GraphqlService.prototype.getInitPaginationOptions = /**
         * Get an initialization of Pagination options
         * @return {?} Pagination Options
         */
            function () {
                return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
            };
        /** Get the GraphQL dataset name */
        /**
         * Get the GraphQL dataset name
         * @return {?}
         */
        GraphqlService.prototype.getDatasetName = /**
         * Get the GraphQL dataset name
         * @return {?}
         */
            function () {
                return this.options.datasetName || '';
            };
        /** Get the Filters that are currently used by the grid */
        /**
         * Get the Filters that are currently used by the grid
         * @return {?}
         */
        GraphqlService.prototype.getCurrentFilters = /**
         * Get the Filters that are currently used by the grid
         * @return {?}
         */
            function () {
                return this._currentFilters;
            };
        /** Get the Pagination that is currently used by the grid */
        /**
         * Get the Pagination that is currently used by the grid
         * @return {?}
         */
        GraphqlService.prototype.getCurrentPagination = /**
         * Get the Pagination that is currently used by the grid
         * @return {?}
         */
            function () {
                return this._currentPagination;
            };
        /** Get the Sorters that are currently used by the grid */
        /**
         * Get the Sorters that are currently used by the grid
         * @return {?}
         */
        GraphqlService.prototype.getCurrentSorters = /**
         * Get the Sorters that are currently used by the grid
         * @return {?}
         */
            function () {
                return this._currentSorters;
            };
        /*
         * Reset the pagination options
         */
        /*
           * Reset the pagination options
           */
        /**
         * @return {?}
         */
        GraphqlService.prototype.resetPaginationOptions = /*
           * Reset the pagination options
           */
            /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var paginationOptions;
                if (this.options.isWithCursor) {
                    // first, last, after, before
                    paginationOptions = ( /** @type {?} */({
                        after: '',
                        before: undefined,
                        last: undefined
                    }));
                }
                else {
                    // first, last, offset
                    paginationOptions = ( /** @type {?} */((this.options.paginationOptions || this.getInitPaginationOptions())));
                    paginationOptions.offset = 0;
                }
                // save current pagination as Page 1 and page size as "first" set size
                this._currentPagination = {
                    pageNumber: 1,
                    pageSize: paginationOptions.first
                };
                this.updateOptions({ paginationOptions: paginationOptions });
            };
        /**
         * @param {?=} serviceOptions
         * @return {?}
         */
        GraphqlService.prototype.updateOptions = /**
         * @param {?=} serviceOptions
         * @return {?}
         */
            function (serviceOptions) {
                this.options = __assign({}, this.options, serviceOptions);
            };
        /*
         * FILTERING
         */
        /*
           * FILTERING
           */
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        GraphqlService.prototype.processOnFilterChanged = /*
           * FILTERING
           */
            /**
             * @param {?} event
             * @param {?} args
             * @return {?}
             */
            function (event, args) {
                var _this = this;
                /** @type {?} */
                var gridOptions = this._gridOptions || args.grid.getOptions();
                /** @type {?} */
                var backendApi = gridOptions.backendServiceApi;
                if (backendApi === undefined) {
                    throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
                }
                // only add a delay when user is typing, on select dropdown filter it will execute right away
                /** @type {?} */
                var debounceTypingDelay = 0;
                if (event && (event.type === 'keyup' || event.type === 'keydown')) {
                    debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
                }
                // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
                this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
                /** @type {?} */
                var promise = new Promise(function (resolve, reject) {
                    if (!args || !args.grid) {
                        throw new Error('Something went wrong when trying create the GraphQL Backend Service, it seems that "args" is not populated correctly');
                    }
                    // reset Pagination, then build the GraphQL query which we will use in the WebAPI callback
                    // wait a minimum user typing inactivity before processing any query
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        // loop through all columns to inspect filters & set the query
                        _this.updateFilters(args.columnFilters, false);
                        _this.resetPaginationOptions();
                        resolve(_this.buildQuery());
                    }, debounceTypingDelay);
                });
                return promise;
            };
        /*
         * PAGINATION
         * With cursor, the query can have 4 arguments (first, after, last, before), for example:
         *   users (first:20, after:"YXJyYXljb25uZWN0aW9uOjM=") {
         *     totalCount
         *     pageInfo {
         *       hasNextPage
         *       endCursor
         *     }
         *     edges {
         *       cursor
         *       node {
         *         name
         *         gender
         *       }
         *     }
         *   }
         * Without cursor, the query can have 3 arguments (first, last, offset), for example:
         *   users (first:20, offset: 10) {
         *     totalCount
         *     nodes {
         *       name
         *       gender
         *     }
         *   }
         */
        /*
           * PAGINATION
           * With cursor, the query can have 4 arguments (first, after, last, before), for example:
           *   users (first:20, after:"YXJyYXljb25uZWN0aW9uOjM=") {
           *     totalCount
           *     pageInfo {
           *       hasNextPage
           *       endCursor
           *     }
           *     edges {
           *       cursor
           *       node {
           *         name
           *         gender
           *       }
           *     }
           *   }
           * Without cursor, the query can have 3 arguments (first, last, offset), for example:
           *   users (first:20, offset: 10) {
           *     totalCount
           *     nodes {
           *       name
           *       gender
           *     }
           *   }
           */
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        GraphqlService.prototype.processOnPaginationChanged = /*
           * PAGINATION
           * With cursor, the query can have 4 arguments (first, after, last, before), for example:
           *   users (first:20, after:"YXJyYXljb25uZWN0aW9uOjM=") {
           *     totalCount
           *     pageInfo {
           *       hasNextPage
           *       endCursor
           *     }
           *     edges {
           *       cursor
           *       node {
           *         name
           *         gender
           *       }
           *     }
           *   }
           * Without cursor, the query can have 3 arguments (first, last, offset), for example:
           *   users (first:20, offset: 10) {
           *     totalCount
           *     nodes {
           *       name
           *       gender
           *     }
           *   }
           */
            /**
             * @param {?} event
             * @param {?} args
             * @return {?}
             */
            function (event, args) {
                /** @type {?} */
                var pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
                this.updatePagination(args.newPage, pageSize);
                // build the GraphQL query which we will use in the WebAPI callback
                return this.buildQuery();
            };
        /*
         * SORTING
         * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
         * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
         */
        /*
           * SORTING
           * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
           * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
           */
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        GraphqlService.prototype.processOnSortChanged = /*
           * SORTING
           * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
           * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
           */
            /**
             * @param {?} event
             * @param {?} args
             * @return {?}
             */
            function (event, args) {
                /** @type {?} */
                var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
                // loop through all columns to inspect sorters & set the query
                this.updateSorters(sortColumns);
                // build the GraphQL query which we will use in the WebAPI callback
                return this.buildQuery();
            };
        /**
         * loop through all columns to inspect filters & update backend service filteringOptions
         * @param columnFilters
         */
        /**
         * loop through all columns to inspect filters & update backend service filteringOptions
         * @param {?} columnFilters
         * @param {?} isUpdatedByPreset
         * @return {?}
         */
        GraphqlService.prototype.updateFilters = /**
         * loop through all columns to inspect filters & update backend service filteringOptions
         * @param {?} columnFilters
         * @param {?} isUpdatedByPreset
         * @return {?}
         */
            function (columnFilters, isUpdatedByPreset) {
                /** @type {?} */
                var searchByArray = [];
                /** @type {?} */
                var searchValue;
                var _loop_1 = function (columnId) {
                    if (columnFilters.hasOwnProperty(columnId)) {
                        /** @type {?} */
                        var columnFilter_1 = columnFilters[columnId];
                        // if user defined some "presets", then we need to find the filters from the column definitions instead
                        /** @type {?} */
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
                        /** @type {?} */
                        var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                        /** @type {?} */
                        var searchTerms = (columnFilter_1 ? columnFilter_1.searchTerms : null) || [];
                        /** @type {?} */
                        var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                        if (typeof fieldSearchValue === 'undefined') {
                            fieldSearchValue = '';
                        }
                        if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                            throw new Error("GraphQL filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                        }
                        fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                        // make sure it's a string
                        /** @type {?} */
                        var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                        // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                        /** @type {?} */
                        var operator = columnFilter_1.operator || ((matches) ? matches[1] : '');
                        searchValue = (!!matches) ? matches[2] : '';
                        /** @type {?} */
                        var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                        // no need to query if search value is empty
                        if (fieldName && searchValue === '' && searchTerms.length === 0) {
                            return "continue";
                        }
                        // when having more than 1 search term (we need to create a CSV string for GraphQL "IN" or "NOT IN" filter search)
                        if (searchTerms && searchTerms.length > 1) {
                            searchValue = searchTerms.join(',');
                        }
                        else if (typeof searchValue === 'string') {
                            // escaping the search value
                            searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
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
                };
                var this_1 = this;
                for (var columnId in columnFilters) {
                    _loop_1(columnId);
                }
                // update the service options with filters for the buildQuery() to work later
                this.updateOptions({ filteringOptions: searchByArray });
            };
        /**
         * Update the pagination component with it's new page number and size
         * @param newPage
         * @param pageSize
         */
        /**
         * Update the pagination component with it's new page number and size
         * @param {?} newPage
         * @param {?} pageSize
         * @return {?}
         */
        GraphqlService.prototype.updatePagination = /**
         * Update the pagination component with it's new page number and size
         * @param {?} newPage
         * @param {?} pageSize
         * @return {?}
         */
            function (newPage, pageSize) {
                this._currentPagination = {
                    pageNumber: newPage,
                    pageSize: pageSize
                };
                /** @type {?} */
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
        /**
         * loop through all columns to inspect sorters & update backend service sortingOptions
         * @param columnFilters
         */
        /**
         * loop through all columns to inspect sorters & update backend service sortingOptions
         * @param {?=} sortColumns
         * @param {?=} presetSorters
         * @return {?}
         */
        GraphqlService.prototype.updateSorters = /**
         * loop through all columns to inspect sorters & update backend service sortingOptions
         * @param {?=} sortColumns
         * @param {?=} presetSorters
         * @return {?}
         */
            function (sortColumns, presetSorters) {
                var _this = this;
                var e_3, _a;
                /** @type {?} */
                var currentSorters = [];
                /** @type {?} */
                var graphqlSorters = [];
                if (!sortColumns && presetSorters) {
                    // make the presets the current sorters, also make sure that all direction are in uppercase for GraphQL
                    currentSorters = presetSorters;
                    currentSorters.forEach(function (sorter) { return sorter.direction = ( /** @type {?} */(sorter.direction.toUpperCase())); });
                    // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
                    /** @type {?} */
                    var tmpSorterArray = currentSorters.map(function (sorter) {
                        /** @type {?} */
                        var columnDef = _this._columnDefinitions.find(function (column) { return column.id === sorter.columnId; });
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
                        this._grid.setSortColumns(tmpSorterArray.filter(function (sorter) { return sorter; }));
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
                            catch (e_3_1) {
                                e_3 = { error: e_3_1 };
                            }
                            finally {
                                try {
                                    if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return))
                                        _a.call(sortColumns_1);
                                }
                                finally {
                                    if (e_3)
                                        throw e_3.error;
                                }
                            }
                        }
                    }
                }
                // keep current Sorters and update the service options with the new sorting
                this._currentSorters = currentSorters;
                this.updateOptions({ sortingOptions: graphqlSorters });
            };
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
         * @param inputStr input string
         * @param enumSearchWords array of enum words to filter
         * @returns outputStr output string
         */
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
        GraphqlService.prototype.trimDoubleQuotesOnEnumField = /**
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
            function (inputStr, enumSearchWords, keepArgumentFieldDoubleQuotes) {
                /** @type {?} */
                var patternWordInQuotes = "s?((field:s*)?\".*?\")";
                /** @type {?} */
                var patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
                patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
                // the last one should also have the pattern but without the pipe "|"
                // example with (field: & direction:):  /field:s?(".*?")|direction:s?(".*?")/
                /** @type {?} */
                var reg = new RegExp(patternRegex, 'g');
                return inputStr.replace(reg, function (group1, group2, group3) {
                    // remove double quotes except when the string starts with a "field:"
                    /** @type {?} */
                    var removeDoubleQuotes = true;
                    if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
                        removeDoubleQuotes = false;
                    }
                    /** @type {?} */
                    var rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
                    return rep;
                });
            };
        //
        // private functions
        // -------------------
        /**
         * Cast provided filters (could be in multiple format) into an array of ColumnFilter
         * @param columnFilters
         */
        //
        // private functions
        // -------------------
        /**
         * Cast provided filters (could be in multiple format) into an array of ColumnFilter
         * @private
         * @param {?} columnFilters
         * @return {?}
         */
        GraphqlService.prototype.castFilterToColumnFilter =
            //
            // private functions
            // -------------------
            /**
             * Cast provided filters (could be in multiple format) into an array of ColumnFilter
             * @private
             * @param {?} columnFilters
             * @return {?}
             */
            function (columnFilters) {
                // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
                /** @type {?} */
                var filtersArray = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map(function (key) { return columnFilters[key]; }) : columnFilters;
                return filtersArray.map(function (filter) {
                    /** @type {?} */
                    var columnDef = filter.columnDef;
                    /** @type {?} */
                    var header = (columnDef) ? (columnDef.headerKey || columnDef.name || '') : '';
                    /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    String.format = function (format, args) {
        // const args = (Array.isArray(arguments[1])) ? arguments[1] : Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return (typeof args[number] !== 'undefined') ? args[number] : match;
        });
    };
    String.padZero = function (length) {
        /** @type {?} */
        var s = this;
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OdataService = /** @class */ (function () {
        function OdataService() {
            this._odataOptions = {
                filterQueue: [],
                orderBy: ''
            };
            this._defaultSortBy = '';
            this._columnFilters = {};
        }
        /*
          * Build the OData query string from all the options provided
          * @return string OData query
          */
        /*
            * Build the OData query string from all the options provided
            * @return string OData query
            */
        /**
         * @return {?}
         */
        OdataService.prototype.buildQuery = /*
            * Build the OData query string from all the options provided
            * @return string OData query
            */
            /**
             * @return {?}
             */
            function () {
                this._odataOptions.filterQueue = [];
                /** @type {?} */
                var queryTmpArray = [];
                if (this._odataOptions.top) {
                    queryTmpArray.push("$top=" + this._odataOptions.top);
                }
                if (this._odataOptions.skip) {
                    queryTmpArray.push("$skip=" + this._odataOptions.skip);
                }
                if (this._odataOptions.orderBy) {
                    /** @type {?} */
                    var argument = '';
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
                        /** @type {?} */
                        var filterStr = this._odataOptions.filter;
                        if (Array.isArray(this._odataOptions.filter)) {
                            filterStr = this._odataOptions.filter.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
                        }
                        this._odataOptions.filterQueue.push("(" + filterStr + ")");
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
                    /** @type {?} */
                    var query = this._odataOptions.filterQueue.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
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
        OdataService.prototype.getFilterByColumn = /**
         * @param {?} columnName
         * @return {?}
         */
            function (columnName) {
                return (!!this._columnFilters[columnName]) ? this._columnFilters[columnName] : null;
            };
        /**
         * @return {?}
         */
        OdataService.prototype.getFilterCount = /**
         * @return {?}
         */
            function () {
                return (this._odataOptions.filterQueue) ? this._odataOptions.filterQueue.length : 0;
            };
        Object.defineProperty(OdataService.prototype, "columnFilters", {
            get: /**
             * @return {?}
             */ function () {
                return this._columnFilters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OdataService.prototype, "options", {
            get: /**
             * @return {?}
             */ function () {
                return this._odataOptions;
            },
            set: /**
             * @param {?} options
             * @return {?}
             */ function (options) {
                this._odataOptions = options;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} fieldName
         * @return {?}
         */
        OdataService.prototype.removeColumnFilter = /**
         * @param {?} fieldName
         * @return {?}
         */
            function (fieldName) {
                delete this._columnFilters[fieldName];
            };
        /**
         * @param {?} fieldName
         * @param {?} value
         * @param {?=} searchTerms
         * @return {?}
         */
        OdataService.prototype.saveColumnFilter = /**
         * @param {?} fieldName
         * @param {?} value
         * @param {?=} searchTerms
         * @return {?}
         */
            function (fieldName, value, searchTerms) {
                this._columnFilters[fieldName] = {
                    search: searchTerms,
                    value: value
                };
            };
        /**
         * Update the filter by a list of terms usually passed manually by the user as default filters
         * @param filterOptions
         * @returns
         */
        /**
         * Update the filter by a list of terms usually passed manually by the user as default filters
         * @param {?} filterOptions
         * @return {?}
         */
        OdataService.prototype.updateFilterFromListTerms = /**
         * Update the filter by a list of terms usually passed manually by the user as default filters
         * @param {?} filterOptions
         * @return {?}
         */
            function (filterOptions) {
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
        OdataService.prototype.updateFilterFromTerm = /**
         * @param {?} filterOptions
         * @return {?}
         */
            function (filterOptions) {
                /** @type {?} */
                var searchBy = '';
                /** @type {?} */
                var tmpSearchByArray = [];
                /** @type {?} */
                var fieldName = filterOptions.fieldName;
                /** @type {?} */
                var fieldSearchTerms = filterOptions.searchTerms;
                /** @type {?} */
                var operator = filterOptions.operator;
                // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                if (!!fieldSearchTerms && fieldSearchTerms.length > 0) {
                    /** @type {?} */
                    var tmpSearchTerms = [];
                    if (operator === 'IN') {
                        // example:: (Stage eq "Expired" or Stage eq "Renewal")
                        for (var j = 0, lnj = fieldSearchTerms.length; j < lnj; j++) {
                            tmpSearchTerms.push(fieldName + " eq '" + fieldSearchTerms[j] + "'");
                        }
                        searchBy = tmpSearchTerms.join(' or ');
                        searchBy = "$(" + searchBy + ")";
                    }
                    else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                        // example:: (Stage ne "Expired" and Stage ne "Renewal")
                        for (var k = 0, lnk = fieldSearchTerms.length; k < lnk; k++) {
                            tmpSearchTerms.push(fieldName + " ne '" + fieldSearchTerms[k] + "'");
                        }
                        searchBy = tmpSearchTerms.join(' and ');
                        searchBy = "$(" + searchBy + ")";
                    }
                }
                // push to our temp array and also trim white spaces
                tmpSearchByArray.push(String.trim(searchBy));
                // add to the filter queue only if it doesn't exist in the queue
                /** @type {?} */
                var filter = (tmpSearchByArray.length > 0) ? tmpSearchByArray.join(' and ') : '';
                if (this._odataOptions.filterQueue && this._odataOptions.filterQueue.indexOf(filter) === -1) {
                    this._odataOptions.filterQueue.push(filter);
                }
            };
        /**
         * Change any OData options that will be used to build the query
         * @param object options
         */
        /**
         * Change any OData options that will be used to build the query
         * @param {?} options
         * @return {?}
         */
        OdataService.prototype.updateOptions = /**
         * Change any OData options that will be used to build the query
         * @param {?} options
         * @return {?}
         */
            function (options) {
                var e_1, _a;
                try {
                    for (var _b = __values(Object.keys(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var property = _c.value;
                        if (options.hasOwnProperty(property)) {
                            this._odataOptions[property] = options[property]; // replace of the property
                        }
                        // we need to keep the defaultSortBy for references whenever the user removes his Sorting
                        // then we would revert to the defaultSortBy and the only way is to keep a hard copy here
                        if (property === 'orderBy' || property === 'sortBy') {
                            /** @type {?} */
                            var sortBy = options[property];
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
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            };
        return OdataService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var timer$1;
    /** @type {?} */
    var DEFAULT_FILTER_TYPING_DEBOUNCE$1 = 750;
    /** @type {?} */
    var DEFAULT_ITEMS_PER_PAGE$1 = 25;
    /** @type {?} */
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
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        GridOdataService.prototype.buildQuery = /**
         * @return {?}
         */
            function () {
                return this.odataService.buildQuery();
            };
        /**
         * @param {?} options
         * @param {?=} pagination
         * @param {?=} grid
         * @return {?}
         */
        GridOdataService.prototype.init = /**
         * @param {?} options
         * @param {?=} pagination
         * @param {?=} grid
         * @return {?}
         */
            function (options, pagination, grid) {
                this._grid = grid;
                /** @type {?} */
                var mergedOptions = __assign({}, this.defaultOptions, options);
                if (pagination && pagination.pageSize) {
                    mergedOptions.top = pagination.pageSize;
                }
                this.odataService.options = __assign({}, mergedOptions, { top: mergedOptions.top || this.defaultOptions.top });
                this.options = this.odataService.options;
                this.pagination = pagination;
                // save current pagination as Page 1 and page size as "top"
                this._currentPagination = {
                    pageNumber: 1,
                    pageSize: this.odataService.options.top || this.defaultOptions.top
                };
                if (grid && grid.getColumns) {
                    this._columnDefinitions = (options && options.columnDefinitions) || grid.getColumns();
                    this._columnDefinitions = this._columnDefinitions.filter(function (column) { return !column.excludeFromQuery; });
                }
            };
        /**
         * @param {?=} serviceOptions
         * @return {?}
         */
        GridOdataService.prototype.updateOptions = /**
         * @param {?=} serviceOptions
         * @return {?}
         */
            function (serviceOptions) {
                this.options = __assign({}, this.options, serviceOptions);
            };
        /**
         * @param {?} fieldName
         * @return {?}
         */
        GridOdataService.prototype.removeColumnFilter = /**
         * @param {?} fieldName
         * @return {?}
         */
            function (fieldName) {
                this.odataService.removeColumnFilter(fieldName);
            };
        /** Get the Filters that are currently used by the grid */
        /**
         * Get the Filters that are currently used by the grid
         * @return {?}
         */
        GridOdataService.prototype.getCurrentFilters = /**
         * Get the Filters that are currently used by the grid
         * @return {?}
         */
            function () {
                return this._currentFilters;
            };
        /** Get the Pagination that is currently used by the grid */
        /**
         * Get the Pagination that is currently used by the grid
         * @return {?}
         */
        GridOdataService.prototype.getCurrentPagination = /**
         * Get the Pagination that is currently used by the grid
         * @return {?}
         */
            function () {
                return this._currentPagination;
            };
        /** Get the Sorters that are currently used by the grid */
        /**
         * Get the Sorters that are currently used by the grid
         * @return {?}
         */
        GridOdataService.prototype.getCurrentSorters = /**
         * Get the Sorters that are currently used by the grid
         * @return {?}
         */
            function () {
                return this._currentSorters;
            };
        /*
         * Reset the pagination options
         */
        /*
           * Reset the pagination options
           */
        /**
         * @return {?}
         */
        GridOdataService.prototype.resetPaginationOptions = /*
           * Reset the pagination options
           */
            /**
             * @return {?}
             */
            function () {
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
        GridOdataService.prototype.saveColumnFilter = /**
         * @param {?} fieldName
         * @param {?} value
         * @param {?=} terms
         * @return {?}
         */
            function (fieldName, value, terms) {
                this.odataService.saveColumnFilter(fieldName, value, terms);
            };
        /*
         * FILTERING
         */
        /*
           * FILTERING
           */
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        GridOdataService.prototype.processOnFilterChanged = /*
           * FILTERING
           */
            /**
             * @param {?} event
             * @param {?} args
             * @return {?}
             */
            function (event, args) {
                var _this = this;
                /** @type {?} */
                var serviceOptions = args.grid.getOptions();
                /** @type {?} */
                var backendApi = serviceOptions.backendServiceApi;
                if (backendApi === undefined) {
                    throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
                }
                // only add a delay when user is typing, on select dropdown filter it will execute right away
                /** @type {?} */
                var debounceTypingDelay = 0;
                if (event && (event.type === 'keyup' || event.type === 'keydown')) {
                    debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE$1;
                }
                // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
                this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
                /** @type {?} */
                var promise = new Promise(function (resolve, reject) {
                    // reset Pagination, then build the OData query which we will use in the WebAPI callback
                    // wait a minimum user typing inactivity before processing any query
                    clearTimeout(timer$1);
                    timer$1 = setTimeout(function () {
                        // loop through all columns to inspect filters & set the query
                        _this.updateFilters(args.columnFilters);
                        _this.resetPaginationOptions();
                        resolve(_this.odataService.buildQuery());
                    }, debounceTypingDelay);
                });
                return promise;
            };
        /*
         * PAGINATION
         */
        /*
           * PAGINATION
           */
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        GridOdataService.prototype.processOnPaginationChanged = /*
           * PAGINATION
           */
            /**
             * @param {?} event
             * @param {?} args
             * @return {?}
             */
            function (event, args) {
                /** @type {?} */
                var pageSize = +(args.pageSize || DEFAULT_PAGE_SIZE$1);
                this.updatePagination(args.newPage, pageSize);
                // build the OData query which we will use in the WebAPI callback
                return this.odataService.buildQuery();
            };
        /*
         * SORTING
         */
        /*
           * SORTING
           */
        /**
         * @param {?} event
         * @param {?} args
         * @return {?}
         */
        GridOdataService.prototype.processOnSortChanged = /*
           * SORTING
           */
            /**
             * @param {?} event
             * @param {?} args
             * @return {?}
             */
            function (event, args) {
                /** @type {?} */
                var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
                // loop through all columns to inspect sorters & set the query
                this.updateSorters(sortColumns);
                // build the OData query which we will use in the WebAPI callback
                return this.odataService.buildQuery();
            };
        /**
         * loop through all columns to inspect filters & update backend service filteringOptions
         * @param columnFilters
         */
        /**
         * loop through all columns to inspect filters & update backend service filteringOptions
         * @param {?} columnFilters
         * @param {?=} isUpdatedByPreset
         * @return {?}
         */
        GridOdataService.prototype.updateFilters = /**
         * loop through all columns to inspect filters & update backend service filteringOptions
         * @param {?} columnFilters
         * @param {?=} isUpdatedByPreset
         * @return {?}
         */
            function (columnFilters, isUpdatedByPreset) {
                /** @type {?} */
                var searchBy = '';
                /** @type {?} */
                var searchByArray = [];
                var _loop_1 = function (columnId) {
                    if (columnFilters.hasOwnProperty(columnId)) {
                        /** @type {?} */
                        var columnFilter_1 = columnFilters[columnId];
                        // if user defined some "presets", then we need to find the filters from the column definitions instead
                        /** @type {?} */
                        var columnDef = void 0;
                        if (isUpdatedByPreset && Array.isArray(this_1._columnDefinitions)) {
                            columnDef = this_1._columnDefinitions.find(function (column) {
                                return column.id === columnFilter_1.columnId;
                            });
                        }
                        else {
                            columnDef = columnFilter_1.columnDef;
                        }
                        if (!columnDef) {
                            throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                        }
                        /** @type {?} */
                        var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                        /** @type {?} */
                        var fieldType = columnDef.type || 'string';
                        /** @type {?} */
                        var searchTerms = (columnFilter_1 ? columnFilter_1.searchTerms : null) || [];
                        /** @type {?} */
                        var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                        if (typeof fieldSearchValue === 'undefined') {
                            fieldSearchValue = '';
                        }
                        if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                            throw new Error("ODdata filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                        }
                        fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                        // make sure it's a string
                        /** @type {?} */
                        var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                        // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                        /** @type {?} */
                        var operator = columnFilter_1.operator || ((matches) ? matches[1] : '');
                        /** @type {?} */
                        var searchValue = (!!matches) ? matches[2] : '';
                        /** @type {?} */
                        var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                        /** @type {?} */
                        var bypassOdataQuery = columnFilter_1.bypassBackendQuery || false;
                        // no need to query if search value is empty
                        if (fieldName && searchValue === '' && searchTerms.length === 0) {
                            this_1.removeColumnFilter(fieldName);
                            return "continue";
                        }
                        // escaping the search value
                        searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                        searchValue = encodeURIComponent(searchValue); // encode URI of the final search value
                        // extra query arguments
                        if (bypassOdataQuery) {
                            // push to our temp array and also trim white spaces
                            if (fieldName) {
                                this_1.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
                            }
                        }
                        else {
                            searchBy = '';
                            // titleCase the fieldName so that it matches the WebApi names
                            if (this_1.odataService.options.caseType === CaseType.pascalCase) {
                                fieldName = String.titleCase(fieldName || '');
                            }
                            // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                            if (searchTerms && searchTerms.length > 1) {
                                /** @type {?} */
                                var tmpSearchTerms = [];
                                if (operator === 'IN') {
                                    // example:: (Stage eq "Expired" or Stage eq "Renewal")
                                    for (var j = 0, lnj = searchTerms.length; j < lnj; j++) {
                                        tmpSearchTerms.push(fieldName + " eq '" + searchTerms[j] + "'");
                                    }
                                    searchBy = tmpSearchTerms.join(' or ');
                                    searchBy = "(" + searchBy + ")";
                                }
                                else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                                    // example:: (Stage ne "Expired" and Stage ne "Renewal")
                                    for (var k = 0, lnk = searchTerms.length; k < lnk; k++) {
                                        tmpSearchTerms.push(fieldName + " ne '" + searchTerms[k] + "'");
                                    }
                                    searchBy = tmpSearchTerms.join(' and ');
                                    searchBy = "(" + searchBy + ")";
                                }
                            }
                            else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar !== '') {
                                // first/last character is a '*' will be a startsWith or endsWith
                                searchBy = (operator === '*' || operator === '*z')
                                    ? "endswith(" + fieldName + ", '" + searchValue + "')"
                                    : "startswith(" + fieldName + ", '" + searchValue + "')";
                            }
                            else if (fieldType === FieldType.date) {
                                // date field needs to be UTC and within DateTime function
                                /** @type {?} */
                                var dateFormatted = parseUtcDate(searchValue, true);
                                if (dateFormatted) {
                                    searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " DateTime'" + dateFormatted + "'";
                                }
                            }
                            else if (fieldType === FieldType.string) {
                                // string field needs to be in single quotes
                                if (operator === '') {
                                    searchBy = "substringof('" + searchValue + "', " + fieldName + ")";
                                }
                                else {
                                    // searchBy = `substringof('${searchValue}', ${fieldNameCased}) ${this.mapOdataOperator(operator)} true`;
                                    searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " '" + searchValue + "'";
                                }
                            }
                            else {
                                // any other field type (or undefined type)
                                searchValue = fieldType === FieldType.number ? searchValue : "'" + searchValue + "'";
                                searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " " + searchValue;
                            }
                            // push to our temp array and also trim white spaces
                            if (searchBy !== '') {
                                searchByArray.push(String.trim(searchBy));
                                this_1.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
                            }
                        }
                    }
                };
                var this_1 = this;
                // loop through all columns to inspect filters
                for (var columnId in columnFilters) {
                    _loop_1(columnId);
                }
                // update the service options with filters for the buildQuery() to work later
                this.odataService.updateOptions({
                    filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
                    skip: undefined
                });
            };
        /**
         * Update the pagination component with it's new page number and size
         * @param newPage
         * @param pageSize
         */
        /**
         * Update the pagination component with it's new page number and size
         * @param {?} newPage
         * @param {?} pageSize
         * @return {?}
         */
        GridOdataService.prototype.updatePagination = /**
         * Update the pagination component with it's new page number and size
         * @param {?} newPage
         * @param {?} pageSize
         * @return {?}
         */
            function (newPage, pageSize) {
                this._currentPagination = {
                    pageNumber: newPage,
                    pageSize: pageSize
                };
                this.odataService.updateOptions({
                    top: pageSize,
                    skip: (newPage - 1) * pageSize
                });
            };
        /**
         * loop through all columns to inspect sorters & update backend service orderBy
         * @param columnFilters
         */
        /**
         * loop through all columns to inspect sorters & update backend service orderBy
         * @param {?=} sortColumns
         * @param {?=} presetSorters
         * @return {?}
         */
        GridOdataService.prototype.updateSorters = /**
         * loop through all columns to inspect sorters & update backend service orderBy
         * @param {?=} sortColumns
         * @param {?=} presetSorters
         * @return {?}
         */
            function (sortColumns, presetSorters) {
                var _this = this;
                var e_1, _a;
                /** @type {?} */
                var sortByArray = [];
                /** @type {?} */
                var sorterArray = [];
                if (!sortColumns && presetSorters) {
                    // make the presets the current sorters, also make sure that all direction are in lowercase for OData
                    sortByArray = presetSorters;
                    sortByArray.forEach(function (sorter) { return sorter.direction = ( /** @type {?} */(sorter.direction.toLowerCase())); });
                    // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
                    /** @type {?} */
                    var tmpSorterArray = sortByArray.map(function (sorter) {
                        /** @type {?} */
                        var columnDef = _this._columnDefinitions.find(function (column) { return column.id === sorter.columnId; });
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
                            try {
                                for (var sortColumns_1 = __values(sortColumns), sortColumns_1_1 = sortColumns_1.next(); !sortColumns_1_1.done; sortColumns_1_1 = sortColumns_1.next()) {
                                    var columnDef = sortColumns_1_1.value;
                                    if (columnDef.sortCol) {
                                        /** @type {?} */
                                        var fieldName = (columnDef.sortCol.queryField || columnDef.sortCol.queryFieldSorter || columnDef.sortCol.field || columnDef.sortCol.id) + '';
                                        /** @type {?} */
                                        var columnFieldName = (columnDef.sortCol.field || columnDef.sortCol.id) + '';
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
                            }
                            catch (e_1_1) {
                                e_1 = { error: e_1_1 };
                            }
                            finally {
                                try {
                                    if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return))
                                        _a.call(sortColumns_1);
                                }
                                finally {
                                    if (e_1)
                                        throw e_1.error;
                                }
                            }
                            sortByArray = sorterArray;
                        }
                    }
                }
                // transform the sortby array into a CSV string for OData
                sortByArray = ( /** @type {?} */(sortByArray));
                /** @type {?} */
                var csvString = sortByArray.map(function (sorter) { return sorter.columnId + " " + sorter.direction.toLowerCase(); }).join(',');
                this.odataService.updateOptions({
                    orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvString) : csvString
                });
                // keep current Sorters and update the service options with the new sorting
                this._currentSorters = ( /** @type {?} */(sortByArray));
                // build the OData query which we will use in the WebAPI callback
                return this.odataService.buildQuery();
            };
        //
        // private functions
        // -------------------
        /**
         * Cast provided filters (could be in multiple format) into an array of ColumnFilter
         * @param columnFilters
         */
        //
        // private functions
        // -------------------
        /**
         * Cast provided filters (could be in multiple format) into an array of ColumnFilter
         * @private
         * @param {?} columnFilters
         * @return {?}
         */
        GridOdataService.prototype.castFilterToColumnFilter =
            //
            // private functions
            // -------------------
            /**
             * Cast provided filters (could be in multiple format) into an array of ColumnFilter
             * @private
             * @param {?} columnFilters
             * @return {?}
             */
            function (columnFilters) {
                // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
                /** @type {?} */
                var filtersArray = ( /** @type {?} */(((typeof columnFilters === 'object') ? Object.keys(columnFilters).map(function (key) { return columnFilters[key]; }) : columnFilters)));
                return filtersArray.map(function (filter) {
                    /** @type {?} */
                    var columnDef = filter.columnDef;
                    /** @type {?} */
                    var header = (columnDef) ? (columnDef.headerKey || columnDef.name || '') : '';
                    /** @type {?} */
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
        /**
         * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
         * @param string operator
         * @returns string map
         */
        /**
         * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
         * @private
         * @param {?} operator
         * @return {?} string map
         */
        GridOdataService.prototype.mapOdataOperator = /**
         * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
         * @private
         * @param {?} operator
         * @return {?} string map
         */
            function (operator) {
                /** @type {?} */
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
        GridOdataService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        GridOdataService.ctorParameters = function () { return []; };
        return GridOdataService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GridEventService = /** @class */ (function () {
        function GridEventService() {
            this._eventHandler = new Slick.EventHandler();
        }
        /* OnCellChange Event */
        /* OnCellChange Event */
        /**
         * @param {?} grid
         * @param {?} dataView
         * @return {?}
         */
        GridEventService.prototype.attachOnCellChange = /* OnCellChange Event */
            /**
             * @param {?} grid
             * @param {?} dataView
             * @return {?}
             */
            function (grid, dataView) {
                // subscribe to this Slickgrid event of onCellChange
                this._eventHandler.subscribe(grid.onCellChange, function (e, args) {
                    if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                        return;
                    }
                    /** @type {?} */
                    var column = grid.getColumns()[args.cell];
                    // if the column definition has a onCellChange property (a callback function), then run it
                    if (typeof column.onCellChange === 'function') {
                        // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
                        /** @type {?} */
                        var returnedArgs = {
                            row: args.row,
                            cell: args.cell,
                            dataView: dataView,
                            gridDefinition: grid.getOptions(),
                            grid: grid,
                            columnDef: column,
                            dataContext: grid.getDataItem(args.row)
                        };
                        // finally call up the Slick.column.onCellChanges.... function
                        column.onCellChange(e, returnedArgs);
                    }
                });
            };
        /* OnClick Event */
        /* OnClick Event */
        /**
         * @param {?} grid
         * @param {?} dataView
         * @return {?}
         */
        GridEventService.prototype.attachOnClick = /* OnClick Event */
            /**
             * @param {?} grid
             * @param {?} dataView
             * @return {?}
             */
            function (grid, dataView) {
                this._eventHandler.subscribe(grid.onClick, function (e, args) {
                    if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                        return;
                    }
                    /** @type {?} */
                    var column = grid.getColumns()[args.cell];
                    // if the column definition has a onCellClick property (a callback function), then run it
                    if (typeof column.onCellClick === 'function') {
                        // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
                        /** @type {?} */
                        var returnedArgs = {
                            row: args.row,
                            cell: args.cell,
                            dataView: dataView,
                            gridDefinition: grid.getOptions(),
                            grid: grid,
                            columnDef: column,
                            dataContext: grid.getDataItem(args.row)
                        };
                        // finally call up the Slick.column.onCellClick.... function
                        column.onCellClick(e, returnedArgs);
                    }
                });
            };
        /**
         * @return {?}
         */
        GridEventService.prototype.dispose = /**
         * @return {?}
         */
            function () {
                this._eventHandler.unsubscribeAll();
            };
        return GridEventService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GridStateService = /** @class */ (function () {
        function GridStateService() {
            this._eventHandler = new Slick.EventHandler();
            this._columns = [];
            this._currentColumns = [];
            this.subscriptions = [];
            this.onGridStateChanged = new rxjs.Subject();
        }
        Object.defineProperty(GridStateService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Export Service
         * @param grid
         * @param filterService
         * @param sortService
         * @param dataView
         */
        /**
         * Initialize the Export Service
         * @param {?} grid
         * @param {?} extensionService
         * @param {?} filterService
         * @param {?} sortService
         * @return {?}
         */
        GridStateService.prototype.init = /**
         * Initialize the Export Service
         * @param {?} grid
         * @param {?} extensionService
         * @param {?} filterService
         * @param {?} sortService
         * @return {?}
         */
            function (grid, extensionService, filterService, sortService) {
                this._grid = grid;
                this.extensionService = extensionService;
                this.filterService = filterService;
                this.sortService = sortService;
                this.subscribeToAllGridChanges(grid);
            };
        /** Dispose of all the SlickGrid & Angular subscriptions */
        /**
         * Dispose of all the SlickGrid & Angular subscriptions
         * @return {?}
         */
        GridStateService.prototype.dispose = /**
         * Dispose of all the SlickGrid & Angular subscriptions
         * @return {?}
         */
            function () {
                // unsubscribe all SlickGrid events
                this._eventHandler.unsubscribeAll();
                // also unsubscribe all Angular Subscriptions
                this.subscriptions.forEach(function (subscription) {
                    if (subscription && subscription.unsubscribe) {
                        subscription.unsubscribe();
                    }
                });
                this.subscriptions = [];
            };
        /**
         * Get the current grid state (filters/sorters/pagination)
         * @return grid state
         */
        /**
         * Get the current grid state (filters/sorters/pagination)
         * @return {?} grid state
         */
        GridStateService.prototype.getCurrentGridState = /**
         * Get the current grid state (filters/sorters/pagination)
         * @return {?} grid state
         */
            function () {
                /** @type {?} */
                var gridState = {
                    columns: this.getCurrentColumns(),
                    filters: this.getCurrentFilters(),
                    sorters: this.getCurrentSorters()
                };
                /** @type {?} */
                var currentPagination = this.getCurrentPagination();
                if (currentPagination) {
                    gridState.pagination = currentPagination;
                }
                return gridState;
            };
        /**
         * Get the Columns (and their state: visibility/position) that are currently applied in the grid
         * @return current columns
         */
        /**
         * Get the Columns (and their state: visibility/position) that are currently applied in the grid
         * @return {?} current columns
         */
        GridStateService.prototype.getColumns = /**
         * Get the Columns (and their state: visibility/position) that are currently applied in the grid
         * @return {?} current columns
         */
            function () {
                return this._columns || this._grid.getColumns();
            };
        /**
         * From an array of Grid Column Definitions, get the associated Current Columns
         * @param gridColumns
         */
        /**
         * From an array of Grid Column Definitions, get the associated Current Columns
         * @param {?} gridColumns
         * @return {?}
         */
        GridStateService.prototype.getAssociatedCurrentColumns = /**
         * From an array of Grid Column Definitions, get the associated Current Columns
         * @param {?} gridColumns
         * @return {?}
         */
            function (gridColumns) {
                /** @type {?} */
                var currentColumns = [];
                if (gridColumns && Array.isArray(gridColumns)) {
                    gridColumns.forEach(function (column, index) {
                        if (column && column.id) {
                            currentColumns.push({
                                columnId: ( /** @type {?} */(column.id)),
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
        /**
         * From an array of Current Columns, get the associated Grid Column Definitions
         * @param grid
         * @param currentColumns
         */
        /**
         * From an array of Current Columns, get the associated Grid Column Definitions
         * @param {?} grid
         * @param {?} currentColumns
         * @return {?}
         */
        GridStateService.prototype.getAssociatedGridColumns = /**
         * From an array of Current Columns, get the associated Grid Column Definitions
         * @param {?} grid
         * @param {?} currentColumns
         * @return {?}
         */
            function (grid, currentColumns) {
                /** @type {?} */
                var columns = [];
                /** @type {?} */
                var gridColumns = grid.getColumns();
                if (currentColumns && Array.isArray(currentColumns)) {
                    currentColumns.forEach(function (currentColumn, index) {
                        /** @type {?} */
                        var gridColumn = gridColumns.find(function (c) { return c.id === currentColumn.columnId; });
                        if (gridColumn && gridColumn.id) {
                            columns.push(__assign({}, gridColumn, { cssClass: currentColumn.cssClass, headerCssClass: currentColumn.headerCssClass, width: currentColumn.width }));
                        }
                    });
                }
                this._columns = columns;
                return columns;
            };
        /**
         * Get the Columns (and their state: visibility/position) that are currently applied in the grid
         * @return current columns
         */
        /**
         * Get the Columns (and their state: visibility/position) that are currently applied in the grid
         * @return {?} current columns
         */
        GridStateService.prototype.getCurrentColumns = /**
         * Get the Columns (and their state: visibility/position) that are currently applied in the grid
         * @return {?} current columns
         */
            function () {
                /** @type {?} */
                var currentColumns = [];
                if (this._currentColumns && Array.isArray(this._currentColumns) && this._currentColumns.length > 0) {
                    currentColumns = this._currentColumns;
                }
                else {
                    currentColumns = this.getAssociatedCurrentColumns(this._grid.getColumns());
                }
                return currentColumns;
            };
        /**
         * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
         * @return current filters
         */
        /**
         * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
         * @return {?} current filters
         */
        GridStateService.prototype.getCurrentFilters = /**
         * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
         * @return {?} current filters
         */
            function () {
                if (this._gridOptions && this._gridOptions.backendServiceApi) {
                    /** @type {?} */
                    var backendService = this._gridOptions.backendServiceApi.service;
                    if (backendService && backendService.getCurrentFilters) {
                        return ( /** @type {?} */(backendService.getCurrentFilters()));
                    }
                }
                else if (this.filterService && this.filterService.getCurrentLocalFilters) {
                    return this.filterService.getCurrentLocalFilters();
                }
                return null;
            };
        /**
         * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
         * @return current pagination state
         */
        /**
         * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
         * @return {?} current pagination state
         */
        GridStateService.prototype.getCurrentPagination = /**
         * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
         * @return {?} current pagination state
         */
            function () {
                if (this._gridOptions && this._gridOptions.backendServiceApi) {
                    /** @type {?} */
                    var backendService = this._gridOptions.backendServiceApi.service;
                    if (backendService && backendService.getCurrentPagination) {
                        return backendService.getCurrentPagination();
                    }
                }
                return null;
            };
        /**
         * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
         * @return current sorters
         */
        /**
         * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
         * @return {?} current sorters
         */
        GridStateService.prototype.getCurrentSorters = /**
         * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
         * @return {?} current sorters
         */
            function () {
                if (this._gridOptions && this._gridOptions.backendServiceApi) {
                    /** @type {?} */
                    var backendService = this._gridOptions.backendServiceApi.service;
                    if (backendService && backendService.getCurrentSorters) {
                        return ( /** @type {?} */(backendService.getCurrentSorters()));
                    }
                }
                else if (this.sortService && this.sortService.getCurrentLocalSorters) {
                    return this.sortService.getCurrentLocalSorters();
                }
                return null;
            };
        /**
         * Hook a SlickGrid Extension Event to a Grid State change event
         * @param extension name
         * @param grid
         */
        /**
         * Hook a SlickGrid Extension Event to a Grid State change event
         * @param {?} extensionName
         * @param {?} eventName
         * @return {?}
         */
        GridStateService.prototype.hookExtensionEventToGridStateChange = /**
         * Hook a SlickGrid Extension Event to a Grid State change event
         * @param {?} extensionName
         * @param {?} eventName
         * @return {?}
         */
            function (extensionName, eventName) {
                var _this = this;
                /** @type {?} */
                var extension = this.extensionService && this.extensionService.getExtensionByName(extensionName);
                if (extension && extension.class && extension.class[eventName] && extension.class[eventName].subscribe) {
                    this._eventHandler.subscribe(extension.class[eventName], function (e, args) {
                        /** @type {?} */
                        var columns = args && args.columns;
                        /** @type {?} */
                        var currentColumns = _this.getAssociatedCurrentColumns(columns);
                        _this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: _this.getCurrentGridState() });
                    });
                }
            };
        /**
         * Hook a Grid Event to a Grid State change event
         * @param event name
         * @param grid
         */
        /**
         * Hook a Grid Event to a Grid State change event
         * @param {?} eventName
         * @param {?} grid
         * @return {?}
         */
        GridStateService.prototype.hookSlickGridEventToGridStateChange = /**
         * Hook a Grid Event to a Grid State change event
         * @param {?} eventName
         * @param {?} grid
         * @return {?}
         */
            function (eventName, grid) {
                var _this = this;
                if (grid && grid[eventName] && grid[eventName].subscribe) {
                    this._eventHandler.subscribe(grid[eventName], function (e, args) {
                        /** @type {?} */
                        var columns = grid.getColumns();
                        /** @type {?} */
                        var currentColumns = _this.getAssociatedCurrentColumns(columns);
                        _this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: _this.getCurrentGridState() });
                    });
                }
            };
        /**
         * @param {?=} columnDefinitions
         * @return {?}
         */
        GridStateService.prototype.resetColumns = /**
         * @param {?=} columnDefinitions
         * @return {?}
         */
            function (columnDefinitions) {
                /** @type {?} */
                var columns = columnDefinitions || this._columns;
                /** @type {?} */
                var currentColumns = this.getAssociatedCurrentColumns(columns);
                this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
            };
        /** if we use Row Selection or the Checkbox Selector, we need to reset any selection */
        /**
         * if we use Row Selection or the Checkbox Selector, we need to reset any selection
         * @return {?}
         */
        GridStateService.prototype.resetRowSelection = /**
         * if we use Row Selection or the Checkbox Selector, we need to reset any selection
         * @return {?}
         */
            function () {
                if (this._gridOptions.enableRowSelection || this._gridOptions.enableCheckboxSelector) {
                    // this also requires the Row Selection Model to be registered as well
                    /** @type {?} */
                    var rowSelectionExtension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(ExtensionName.rowSelection);
                    if (rowSelectionExtension && rowSelectionExtension.extension) {
                        this._grid.setSelectedRows([]);
                    }
                }
            };
        /**
         * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
         * when triggered, we will publish a Grid State Event with current Grid State
         */
        /**
         * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
         * when triggered, we will publish a Grid State Event with current Grid State
         * @param {?} grid
         * @return {?}
         */
        GridStateService.prototype.subscribeToAllGridChanges = /**
         * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
         * when triggered, we will publish a Grid State Event with current Grid State
         * @param {?} grid
         * @return {?}
         */
            function (grid) {
                var _this = this;
                // Subscribe to Event Emitter of Filter changed
                this.subscriptions.push(this.filterService.onFilterChanged.subscribe(function (currentFilters) {
                    _this.resetRowSelection();
                    _this.onGridStateChanged.next({ change: { newValues: currentFilters, type: GridStateType.filter }, gridState: _this.getCurrentGridState() });
                }));
                // Subscribe to Event Emitter of Filter cleared
                this.subscriptions.push(this.filterService.onFilterCleared.subscribe(function () {
                    _this.resetRowSelection();
                    _this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.filter }, gridState: _this.getCurrentGridState() });
                }));
                // Subscribe to Event Emitter of Sort changed
                this.subscriptions.push(this.sortService.onSortChanged.subscribe(function (currentSorters) {
                    _this.resetRowSelection();
                    _this.onGridStateChanged.next({ change: { newValues: currentSorters, type: GridStateType.sorter }, gridState: _this.getCurrentGridState() });
                }));
                // Subscribe to Event Emitter of Sort cleared
                this.subscriptions.push(this.sortService.onSortCleared.subscribe(function () {
                    _this.resetRowSelection();
                    _this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.sorter }, gridState: _this.getCurrentGridState() });
                }));
                // Subscribe to ColumnPicker and/or GridMenu for show/hide Columns visibility changes
                this.hookExtensionEventToGridStateChange(ExtensionName.columnPicker, 'onColumnsChanged');
                this.hookExtensionEventToGridStateChange(ExtensionName.gridMenu, 'onColumnsChanged');
                // subscribe to Column Resize & Reordering
                this.hookSlickGridEventToGridStateChange('onColumnsReordered', grid);
                this.hookSlickGridEventToGridStateChange('onColumnsResized', grid);
            };
        return GridStateService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GridService = /** @class */ (function () {
        function GridService(extensionService, filterService, gridStateService, sortService, translate) {
            this.extensionService = extensionService;
            this.filterService = filterService;
            this.gridStateService = gridStateService;
            this.sortService = sortService;
            this.translate = translate;
        }
        Object.defineProperty(GridService.prototype, "_columnDefinitions", {
            /** Getter for the Column Definitions pulled through the Grid Object */
            get: /**
             * Getter for the Column Definitions pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} grid
         * @param {?} dataView
         * @return {?}
         */
        GridService.prototype.init = /**
         * @param {?} grid
         * @param {?} dataView
         * @return {?}
         */
            function (grid, dataView) {
                this._grid = grid;
                this._dataView = dataView;
            };
        /**
         * From a SlickGrid Event triggered get the Column Definition and Item Data Context
         *
         * For example the SlickGrid onClick will return cell arguments when subscribing to it.
         * From these cellArgs, we want to get the Column Definition and Item Data
         * @param cell event args
         * @return object with columnDef and dataContext
         */
        /**
         * From a SlickGrid Event triggered get the Column Definition and Item Data Context
         *
         * For example the SlickGrid onClick will return cell arguments when subscribing to it.
         * From these cellArgs, we want to get the Column Definition and Item Data
         * @param {?} args
         * @return {?} object with columnDef and dataContext
         */
        GridService.prototype.getColumnFromEventArguments = /**
         * From a SlickGrid Event triggered get the Column Definition and Item Data Context
         *
         * For example the SlickGrid onClick will return cell arguments when subscribing to it.
         * From these cellArgs, we want to get the Column Definition and Item Data
         * @param {?} args
         * @return {?} object with columnDef and dataContext
         */
            function (args) {
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
        /** Get data item by it's row index number */
        /**
         * Get data item by it's row index number
         * @param {?} rowNumber
         * @return {?}
         */
        GridService.prototype.getDataItemByRowNumber = /**
         * Get data item by it's row index number
         * @param {?} rowNumber
         * @return {?}
         */
            function (rowNumber) {
                if (!this._grid || typeof this._grid.getDataItem !== 'function') {
                    throw new Error('We could not find SlickGrid Grid object');
                }
                return this._grid.getDataItem(rowNumber);
            };
        /** Chain the item Metadata with our implementation of Metadata at given row index */
        /**
         * Chain the item Metadata with our implementation of Metadata at given row index
         * @param {?} previousItemMetadata
         * @return {?}
         */
        GridService.prototype.getItemRowMetadataToHighlight = /**
         * Chain the item Metadata with our implementation of Metadata at given row index
         * @param {?} previousItemMetadata
         * @return {?}
         */
            function (previousItemMetadata) {
                var _this = this;
                return function (rowNumber) {
                    /** @type {?} */
                    var item = _this._dataView.getItem(rowNumber);
                    /** @type {?} */
                    var meta = { cssClasses: '' };
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
                        meta.cssClasses += " " + item.rowClass;
                        meta.cssClasses += " row" + rowNumber;
                    }
                    return meta;
                };
            };
        /**
         * Highlight then fade a row for x seconds.
         * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
         * @param rowNumber
         * @param fadeDelay
         */
        /**
         * Highlight then fade a row for x seconds.
         * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
         * @param {?} rowNumber
         * @param {?=} fadeDelay
         * @return {?}
         */
        GridService.prototype.highlightRow = /**
         * Highlight then fade a row for x seconds.
         * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
         * @param {?} rowNumber
         * @param {?=} fadeDelay
         * @return {?}
         */
            function (rowNumber, fadeDelay) {
                var _this = this;
                if (fadeDelay === void 0) {
                    fadeDelay = 1500;
                }
                // create a SelectionModel if there's not one yet
                if (!this._grid.getSelectionModel()) {
                    /** @type {?} */
                    var rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
                    this._grid.setSelectionModel(rowSelectionPlugin);
                }
                /** @type {?} */
                var rowIndexes = Array.isArray(rowNumber) ? rowNumber : [rowNumber];
                this._grid.setSelectedRows(rowIndexes);
                if (Array.isArray(rowNumber)) {
                    rowNumber.forEach(function (row) { return _this.highlightRowByMetadata(row, fadeDelay); });
                }
                else {
                    this.highlightRowByMetadata(rowNumber, fadeDelay);
                }
            };
        /**
         * @param {?} rowNumber
         * @param {?=} fadeDelay
         * @return {?}
         */
        GridService.prototype.highlightRowByMetadata = /**
         * @param {?} rowNumber
         * @param {?=} fadeDelay
         * @return {?}
         */
            function (rowNumber, fadeDelay) {
                var _this = this;
                if (fadeDelay === void 0) {
                    fadeDelay = 1500;
                }
                this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);
                /** @type {?} */
                var item = this._dataView.getItem(rowNumber);
                if (item && item.id) {
                    item.rowClass = 'highlight';
                    this._dataView.updateItem(item.id, item);
                    /** @type {?} */
                    var gridOptions = ( /** @type {?} */(this._grid.getOptions()));
                    // highlight the row for a user defined timeout
                    $("#" + gridOptions.gridId)
                        .find(".highlight.row" + rowNumber)
                        .first();
                    // delete the row's CSS that was attached for highlighting
                    setTimeout(function () {
                        if (item && item.id) {
                            delete item.rowClass;
                            /** @type {?} */
                            var gridIdx = _this._dataView.getIdxById(item.id);
                            if (gridIdx !== undefined) {
                                _this._dataView.updateItem(item.id, item);
                            }
                        }
                    }, fadeDelay + 10);
                }
            };
        /** Get the Data Item from a grid row index */
        /**
         * Get the Data Item from a grid row index
         * @param {?} index
         * @return {?}
         */
        GridService.prototype.getDataItemByRowIndex = /**
         * Get the Data Item from a grid row index
         * @param {?} index
         * @return {?}
         */
            function (index) {
                if (!this._grid || typeof this._grid.getDataItem !== 'function') {
                    throw new Error('We could not find SlickGrid Grid object');
                }
                return this._grid.getDataItem(index);
            };
        /** Get the Data Item from an array of grid row indexes */
        /**
         * Get the Data Item from an array of grid row indexes
         * @param {?} indexes
         * @return {?}
         */
        GridService.prototype.getDataItemByRowIndexes = /**
         * Get the Data Item from an array of grid row indexes
         * @param {?} indexes
         * @return {?}
         */
            function (indexes) {
                var _this = this;
                if (!this._grid || typeof this._grid.getDataItem !== 'function') {
                    throw new Error('We could not find SlickGrid Grid object');
                }
                /** @type {?} */
                var dataItems = [];
                if (Array.isArray(indexes)) {
                    indexes.forEach(function (idx) {
                        dataItems.push(_this._grid.getDataItem(idx));
                    });
                }
                return dataItems;
            };
        /** Get the currently selected row indexes */
        /**
         * Get the currently selected row indexes
         * @return {?}
         */
        GridService.prototype.getSelectedRows = /**
         * Get the currently selected row indexes
         * @return {?}
         */
            function () {
                return this._grid.getSelectedRows();
            };
        /** Get the currently selected rows item data */
        /**
         * Get the currently selected rows item data
         * @return {?}
         */
        GridService.prototype.getSelectedRowsDataItem = /**
         * Get the currently selected rows item data
         * @return {?}
         */
            function () {
                if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
                    throw new Error('We could not find SlickGrid Grid object');
                }
                /** @type {?} */
                var selectedRowIndexes = this._grid.getSelectedRows();
                return this.getDataItemByRowIndexes(selectedRowIndexes);
            };
        /** Select the selected row by a row index */
        /**
         * Select the selected row by a row index
         * @param {?} rowIndex
         * @return {?}
         */
        GridService.prototype.setSelectedRow = /**
         * Select the selected row by a row index
         * @param {?} rowIndex
         * @return {?}
         */
            function (rowIndex) {
                this._grid.setSelectedRows([rowIndex]);
            };
        /** Set selected rows with provided array of row indexes */
        /**
         * Set selected rows with provided array of row indexes
         * @param {?} rowIndexes
         * @return {?}
         */
        GridService.prototype.setSelectedRows = /**
         * Set selected rows with provided array of row indexes
         * @param {?} rowIndexes
         * @return {?}
         */
            function (rowIndexes) {
                this._grid.setSelectedRows(rowIndexes);
            };
        /** Re-Render the Grid */
        /**
         * Re-Render the Grid
         * @return {?}
         */
        GridService.prototype.renderGrid = /**
         * Re-Render the Grid
         * @return {?}
         */
            function () {
                if (this._grid && typeof this._grid.invalidate === 'function') {
                    this._grid.invalidate();
                    this._grid.render();
                }
            };
        /**
         * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
         * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
         * The reset will clear the Filters & Sort, then will reset the Columns to their original state
         */
        /**
         * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
         * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
         * The reset will clear the Filters & Sort, then will reset the Columns to their original state
         * @param {?=} columnDefinitions
         * @return {?}
         */
        GridService.prototype.resetGrid = /**
         * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
         * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
         * The reset will clear the Filters & Sort, then will reset the Columns to their original state
         * @param {?=} columnDefinitions
         * @return {?}
         */
            function (columnDefinitions) {
                // reset columns to original states & refresh the grid
                if (this._grid && this._dataView) {
                    /** @type {?} */
                    var originalColumns = this.extensionService.getAllColumns();
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
            };
        /**
         * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
         * @param object dataItem: item object holding all properties of that row
         * @param shouldHighlightRow do we want to highlight the row after adding item
         */
        /**
         * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
         * @param {?} item
         * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
         * @return {?}
         */
        GridService.prototype.addItemToDatagrid = /**
         * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
         * @param {?} item
         * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
         * @return {?}
         */
            function (item, shouldHighlightRow) {
                if (shouldHighlightRow === void 0) {
                    shouldHighlightRow = true;
                }
                if (!this._grid || !this._gridOptions || !this._dataView) {
                    throw new Error('We could not find SlickGrid Grid, DataView objects');
                }
                /** @type {?} */
                var row = 0;
                this._dataView.insertItem(row, item);
                this._grid.scrollRowIntoView(0); // scroll to row 0
                // highlight the row we just added, if defined
                if (shouldHighlightRow) {
                    this.highlightRow(0, 1500);
                }
                // refresh dataview & grid
                this._dataView.refresh();
            };
        /**
         * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
         * @param dataItem array: item object holding all properties of that row
         * @param shouldHighlightRow do we want to highlight the row after adding item
         */
        /**
         * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
         * @param {?} items
         * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
         * @return {?}
         */
        GridService.prototype.addItemsToDatagrid = /**
         * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
         * @param {?} items
         * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
         * @return {?}
         */
            function (items, shouldHighlightRow) {
                var _this = this;
                if (shouldHighlightRow === void 0) {
                    shouldHighlightRow = true;
                }
                if (Array.isArray(items)) {
                    items.forEach(function (item) { return _this.addItemToDatagrid(item, shouldHighlightRow); });
                }
            };
        /**
         * Delete an existing item from the datagrid (dataView)
         * @param object item: item object holding all properties of that row
         */
        /**
         * Delete an existing item from the datagrid (dataView)
         * @param {?} item
         * @return {?}
         */
        GridService.prototype.deleteDataGridItem = /**
         * Delete an existing item from the datagrid (dataView)
         * @param {?} item
         * @return {?}
         */
            function (item) {
                if (!item || !item.hasOwnProperty('id')) {
                    throw new Error("deleteDataGridItem() requires an item object which includes the \"id\" property");
                }
                /** @type {?} */
                var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
                this.deleteDataGridItemById(itemId);
            };
        /**
         * Delete an existing item from the datagrid (dataView) by it's id
         * @param itemId: item unique id
         */
        /**
         * Delete an existing item from the datagrid (dataView) by it's id
         * @param {?} itemId
         * @return {?}
         */
        GridService.prototype.deleteDataGridItemById = /**
         * Delete an existing item from the datagrid (dataView) by it's id
         * @param {?} itemId
         * @return {?}
         */
            function (itemId) {
                if (itemId === undefined) {
                    throw new Error("Cannot delete a row without a valid \"id\"");
                }
                // delete the item from the dataView
                this._dataView.deleteItem(itemId);
                this._dataView.refresh();
            };
        /**
         * Update an existing item with new properties inside the datagrid
         * @param object item: item object holding all properties of that row
         * @return grid row index
         */
        /**
         * Update an existing item with new properties inside the datagrid
         * @param {?} item
         * @param {?=} shouldHighlightRow
         * @return {?} grid row index
         */
        GridService.prototype.updateDataGridItem = /**
         * Update an existing item with new properties inside the datagrid
         * @param {?} item
         * @param {?=} shouldHighlightRow
         * @return {?} grid row index
         */
            function (item, shouldHighlightRow) {
                if (shouldHighlightRow === void 0) {
                    shouldHighlightRow = true;
                }
                /** @type {?} */
                var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
                if (itemId === undefined) {
                    throw new Error("Could not find the item in the grid or it's associated \"id\"");
                }
                return this.updateDataGridItemById(itemId, item, shouldHighlightRow);
            };
        /**
         * Update an array of existing items with new properties inside the datagrid
         * @param object item: item object holding all properties of that row
         */
        /**
         * Update an array of existing items with new properties inside the datagrid
         * @param {?} items
         * @param {?=} shouldHighlightRow
         * @return {?}
         */
        GridService.prototype.updateDataGridItems = /**
         * Update an array of existing items with new properties inside the datagrid
         * @param {?} items
         * @param {?=} shouldHighlightRow
         * @return {?}
         */
            function (items, shouldHighlightRow) {
                var _this = this;
                if (shouldHighlightRow === void 0) {
                    shouldHighlightRow = true;
                }
                if (!Array.isArray(items)) {
                    throw new Error('The function "updateDataGridItems" only support array of items, if you wish to only update 1 item then use "updateDataGridItem"');
                }
                /** @type {?} */
                var gridIndexes = [];
                items.forEach(function (item) {
                    gridIndexes.push(_this.updateDataGridItem(item, false));
                });
                // only highlight at the end, all at once
                // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
                if (shouldHighlightRow) {
                    this.highlightRow(gridIndexes);
                }
            };
        /**
         * Update an existing item in the datagrid by it's id and new properties
         * @param itemId: item unique id
         * @param object item: item object holding all properties of that row
         * @param shouldHighlightRow do we want to highlight the row after update
         * @return grid row index
         */
        /**
         * Update an existing item in the datagrid by it's id and new properties
         * @param {?} itemId
         * @param {?} item
         * @param {?=} shouldHighlightRow do we want to highlight the row after update
         * @return {?} grid row index
         */
        GridService.prototype.updateDataGridItemById = /**
         * Update an existing item in the datagrid by it's id and new properties
         * @param {?} itemId
         * @param {?} item
         * @param {?=} shouldHighlightRow do we want to highlight the row after update
         * @return {?} grid row index
         */
            function (itemId, item, shouldHighlightRow) {
                if (shouldHighlightRow === void 0) {
                    shouldHighlightRow = true;
                }
                if (itemId === undefined) {
                    throw new Error("Cannot update a row without a valid \"id\"");
                }
                /** @type {?} */
                var row = this._dataView.getRowById(itemId);
                if (!item || row === undefined) {
                    throw new Error("Could not find the item in the grid or it's associated \"id\"");
                }
                /** @type {?} */
                var gridIdx = this._dataView.getIdxById(itemId);
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
            };
        GridService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        GridService.ctorParameters = function () {
            return [
                { type: ExtensionService },
                { type: FilterService },
                { type: GridStateService },
                { type: SortService },
                { type: core$1.TranslateService }
            ];
        };
        return GridService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var GroupingAndColspanService = /** @class */ (function () {
        function GroupingAndColspanService() {
            this._eventHandler = new Slick.EventHandler();
        }
        Object.defineProperty(GroupingAndColspanService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GroupingAndColspanService.prototype, "_columnDefinitions", {
            /** Getter for the Column Definitions pulled through the Grid Object */
            get: /**
             * Getter for the Column Definitions pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} grid
         * @param {?} dataView
         * @return {?}
         */
        GroupingAndColspanService.prototype.init = /**
         * @param {?} grid
         * @param {?} dataView
         * @return {?}
         */
            function (grid, dataView) {
                var _this = this;
                this._grid = grid;
                this._dataView = dataView;
                if (grid && this._gridOptions) {
                    // When dealing with Pre-Header Grouping colspan, we need to re-create the pre-header in multiple occasions
                    // for all these occasions, we have to trigger a re-create
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
                        // also not sure why at this point, but it seems that I need to call the 1st create in a delayed execution
                        // probably some kind of timing issues and delaying it until the grid is fully ready does help
                        setTimeout(function () {
                            _this.createPreHeaderRowGroupingTitle();
                        }, 50);
                    }
                }
            };
        /**
         * @return {?}
         */
        GroupingAndColspanService.prototype.dispose = /**
         * @return {?}
         */
            function () {
                // unsubscribe all SlickGrid events
                this._eventHandler.unsubscribeAll();
            };
        /**
         * @return {?}
         */
        GroupingAndColspanService.prototype.createPreHeaderRowGroupingTitle = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var $preHeaderPanel = $(this._grid.getPreHeaderPanel())
                    .empty()
                    .addClass('slick-header-columns')
                    .css('left', '-1000px')
                    .width(this._grid.getHeadersWidth());
                $preHeaderPanel.parent().addClass('slick-header');
                /** @type {?} */
                var headerColumnWidthDiff = this._grid.getHeaderColumnWidthDiff();
                /** @type {?} */
                var m;
                /** @type {?} */
                var header;
                /** @type {?} */
                var lastColumnGroup = '';
                /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // global constants, height/width are in pixels
    /** @type {?} */
    var DATAGRID_MIN_HEIGHT = 180;
    /** @type {?} */
    var DATAGRID_MIN_WIDTH = 300;
    /** @type {?} */
    var DATAGRID_BOTTOM_PADDING = 20;
    /** @type {?} */
    var DATAGRID_PAGINATION_HEIGHT = 35;
    var ResizerService = /** @class */ (function () {
        function ResizerService() {
            this.onGridBeforeResize = new rxjs.Subject();
        }
        Object.defineProperty(ResizerService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: /**
             * Getter for the Grid Options pulled through the Grid Object
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResizerService.prototype, "_gridUid", {
            get: /**
             * @private
             * @return {?}
             */ function () {
                return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions.gridId;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} grid
         * @param {?=} fixedDimensions
         * @return {?}
         */
        ResizerService.prototype.init = /**
         * @param {?} grid
         * @param {?=} fixedDimensions
         * @return {?}
         */
            function (grid, fixedDimensions) {
                this._grid = grid;
                if (fixedDimensions) {
                    this._fixedHeight = fixedDimensions.height;
                    this._fixedWidth = fixedDimensions.width;
                }
            };
        /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
         * Options: we could also provide a % factor to resize on each height/width independently
         */
        /**
         * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
         * Options: we could also provide a % factor to resize on each height/width independently
         * @param {?=} newSizes
         * @return {?}
         */
        ResizerService.prototype.attachAutoResizeDataGrid = /**
         * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
         * Options: we could also provide a % factor to resize on each height/width independently
         * @param {?=} newSizes
         * @return {?}
         */
            function (newSizes) {
                var _this = this;
                // if we can't find the grid to resize, return without attaching anything
                /** @type {?} */
                var gridDomElm = $("#" + (this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'));
                if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
                    return null;
                }
                // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
                // -- also we add a slight delay (in ms) so that we resize after the grid render is done
                this.resizeGrid(10, newSizes);
                // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
                // -- attach auto-resize to Window object only if it exist
                $(window).on("resize.grid." + this._gridUid, function () {
                    _this.onGridBeforeResize.next(true);
                    _this.resizeGrid(0, newSizes);
                });
            };
        /**
         * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
         * object gridOptions
         */
        /**
         * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
         * object gridOptions
         * @param {?} gridOptions
         * @return {?}
         */
        ResizerService.prototype.calculateGridNewDimensions = /**
         * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
         * object gridOptions
         * @param {?} gridOptions
         * @return {?}
         */
            function (gridOptions) {
                /** @type {?} */
                var gridDomElm = $("#" + gridOptions.gridId);
                /** @type {?} */
                var autoResizeOptions = gridOptions && gridOptions.autoResize;
                /** @type {?} */
                var containerElm = (autoResizeOptions && autoResizeOptions.containerId) ? $("#" + autoResizeOptions.containerId) : $("#" + gridOptions.gridContainerId);
                /** @type {?} */
                var windowElm = $(window);
                if (windowElm === undefined || containerElm === undefined || gridDomElm === undefined) {
                    return null;
                }
                // calculate bottom padding
                // if using pagination, we need to add the pagination height to this bottom padding
                /** @type {?} */
                var bottomPadding = (autoResizeOptions && autoResizeOptions.bottomPadding) ? autoResizeOptions.bottomPadding : DATAGRID_BOTTOM_PADDING;
                if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
                    bottomPadding += DATAGRID_PAGINATION_HEIGHT;
                }
                /** @type {?} */
                var gridHeight = windowElm.height() || 0;
                /** @type {?} */
                var coordOffsetTop = gridDomElm.offset();
                /** @type {?} */
                var gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
                /** @type {?} */
                var availableHeight = gridHeight - gridOffsetTop - bottomPadding;
                /** @type {?} */
                var availableWidth = containerElm.width() || 0;
                /** @type {?} */
                var maxHeight = (autoResizeOptions && autoResizeOptions.maxHeight && autoResizeOptions.maxHeight > 0) ? autoResizeOptions.maxHeight : undefined;
                /** @type {?} */
                var minHeight = (autoResizeOptions && autoResizeOptions.minHeight && autoResizeOptions.minHeight < 0) ? autoResizeOptions.minHeight : DATAGRID_MIN_HEIGHT;
                /** @type {?} */
                var maxWidth = (autoResizeOptions && autoResizeOptions.maxWidth && autoResizeOptions.maxWidth > 0) ? autoResizeOptions.maxWidth : undefined;
                /** @type {?} */
                var minWidth = (autoResizeOptions && autoResizeOptions.minWidth && autoResizeOptions.minWidth < 0) ? autoResizeOptions.minWidth : DATAGRID_MIN_WIDTH;
                /** @type {?} */
                var newHeight = availableHeight;
                /** @type {?} */
                var newWidth = (autoResizeOptions && autoResizeOptions.sidePadding) ? availableWidth - autoResizeOptions.sidePadding : availableWidth;
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
            };
        /**
         * Dispose function when element is destroyed
         */
        /**
         * Dispose function when element is destroyed
         * @return {?}
         */
        ResizerService.prototype.dispose = /**
         * Dispose function when element is destroyed
         * @return {?}
         */
            function () {
                $(window).off("resize.grid." + this._gridUid);
            };
        /**
         * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
         * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
         * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
         * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
         */
        /**
         * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
         * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
         * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
         * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
         * @param {?} grid
         * @param {?} gridOptions
         * @return {?}
         */
        ResizerService.prototype.compensateHorizontalScroll = /**
         * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
         * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
         * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
         * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
         * @param {?} grid
         * @param {?} gridOptions
         * @return {?}
         */
            function (grid, gridOptions) {
                /** @type {?} */
                var gridElm = $("#" + gridOptions.gridId);
                /** @type {?} */
                var scrollbarDimensions = grid && grid.getScrollbarDimensions();
                /** @type {?} */
                var slickGridScrollbarWidth = scrollbarDimensions && scrollbarDimensions.width;
                /** @type {?} */
                var calculatedScrollbarWidth = getScrollBarWidth();
                // if scrollbar width is different from SlickGrid calculation to our custom calculation
                // then resize the grid with the missing pixels to remove scroll (usually only 3px)
                if (slickGridScrollbarWidth < calculatedScrollbarWidth) {
                    gridElm.width(gridElm.width() + (calculatedScrollbarWidth - slickGridScrollbarWidth));
                }
            };
        /**
         * Return the last resize dimensions used by the service
         * @return last dimensions
         */
        /**
         * Return the last resize dimensions used by the service
         * @return {?} last dimensions
         */
        ResizerService.prototype.getLastResizeDimensions = /**
         * Return the last resize dimensions used by the service
         * @return {?} last dimensions
         */
            function () {
                return this._lastDimensions;
            };
        /** Resize the datagrid to fit the browser height & width */
        /**
         * Resize the datagrid to fit the browser height & width
         * @param {?=} delay
         * @param {?=} newSizes
         * @return {?}
         */
        ResizerService.prototype.resizeGrid = /**
         * Resize the datagrid to fit the browser height & width
         * @param {?=} delay
         * @param {?=} newSizes
         * @return {?}
         */
            function (delay, newSizes) {
                var _this = this;
                if (delay === void 0) {
                    delay = 10;
                }
                if (!this._grid || !this._gridOptions) {
                    throw new Error("\n      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.\n      You can fix this by setting your gridOption to use \"enableAutoResize\" or create an instance of the ResizerService by calling attachAutoResizeDataGrid()");
                }
                return new Promise(function (resolve) {
                    // because of the javascript async nature, we might want to delay the resize a little bit
                    delay = delay || 0;
                    if (delay > 0) {
                        clearTimeout(_this._timer);
                        _this._timer = setTimeout(function () {
                            _this.resizeGridWithDimensions(newSizes);
                            resolve(_this._lastDimensions);
                        }, delay);
                    }
                    else {
                        _this.resizeGridWithDimensions(newSizes);
                        resolve(_this._lastDimensions);
                    }
                });
            };
        /**
         * @param {?=} newSizes
         * @return {?}
         */
        ResizerService.prototype.resizeGridWithDimensions = /**
         * @param {?=} newSizes
         * @return {?}
         */
            function (newSizes) {
                // calculate the available sizes with minimum height defined as a constant
                /** @type {?} */
                var availableDimensions = this.calculateGridNewDimensions(this._gridOptions);
                /** @type {?} */
                var gridElm = $("#" + this._gridOptions.gridId) || {};
                /** @type {?} */
                var gridContainerElm = $("#" + this._gridOptions.gridContainerId) || {};
                if ((newSizes || availableDimensions) && gridElm.length > 0) {
                    // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
                    // basically if user passes 1 of the dimension, let say he passes just the height,
                    // we will use the height as a fixed height but the width will be resized by it's available space
                    /** @type {?} */
                    var newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
                    /** @type {?} */
                    var newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;
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
                        if (this._gridUid && $("." + this._gridUid).length > 0) {
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
            };
        return ResizerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AvgAggregator = /** @class */ (function () {
        function AvgAggregator(field) {
            this._field = field;
        }
        /**
         * @return {?}
         */
        AvgAggregator.prototype.init = /**
         * @return {?}
         */
            function () {
                this._count = 0;
                this._nonNullCount = 0;
                this._sum = 0;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        AvgAggregator.prototype.accumulate = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var val = item[this._field];
                this._count++;
                if (val != null && val !== '' && !isNaN(val)) {
                    this._nonNullCount++;
                    this._sum += parseFloat(val);
                }
            };
        /**
         * @param {?} groupTotals
         * @return {?}
         */
        AvgAggregator.prototype.storeResult = /**
         * @param {?} groupTotals
         * @return {?}
         */
            function (groupTotals) {
                if (!groupTotals.avg) {
                    groupTotals.avg = {};
                }
                if (this._nonNullCount !== 0) {
                    groupTotals.avg[this._field] = this._sum / this._nonNullCount;
                }
            };
        return AvgAggregator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MinAggregator = /** @class */ (function () {
        function MinAggregator(field) {
            this._field = field;
        }
        /**
         * @return {?}
         */
        MinAggregator.prototype.init = /**
         * @return {?}
         */
            function () {
                this._min = null;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        MinAggregator.prototype.accumulate = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var val = item[this._field];
                if (val != null && val !== '' && !isNaN(val)) {
                    if (this._min == null || val < this._min) {
                        this._min = val;
                    }
                }
            };
        /**
         * @param {?} groupTotals
         * @return {?}
         */
        MinAggregator.prototype.storeResult = /**
         * @param {?} groupTotals
         * @return {?}
         */
            function (groupTotals) {
                if (!groupTotals.min) {
                    groupTotals.min = {};
                }
                groupTotals.min[this._field] = this._min;
            };
        return MinAggregator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MaxAggregator = /** @class */ (function () {
        function MaxAggregator(field) {
            this._field = field;
        }
        /**
         * @return {?}
         */
        MaxAggregator.prototype.init = /**
         * @return {?}
         */
            function () {
                this._max = null;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        MaxAggregator.prototype.accumulate = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var val = item[this._field];
                if (val != null && val !== '' && !isNaN(val)) {
                    if (this._max == null || val > this._max) {
                        this._max = val;
                    }
                }
            };
        /**
         * @param {?} groupTotals
         * @return {?}
         */
        MaxAggregator.prototype.storeResult = /**
         * @param {?} groupTotals
         * @return {?}
         */
            function (groupTotals) {
                if (!groupTotals.max) {
                    groupTotals.max = {};
                }
                groupTotals.max[this._field] = this._max;
            };
        return MaxAggregator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SumAggregator = /** @class */ (function () {
        function SumAggregator(field) {
            this._field = field;
        }
        /**
         * @return {?}
         */
        SumAggregator.prototype.init = /**
         * @return {?}
         */
            function () {
                this._sum = null;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        SumAggregator.prototype.accumulate = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var val = item[this._field];
                if (val != null && val !== '' && !isNaN(val)) {
                    this._sum += parseFloat(val);
                }
            };
        /**
         * @param {?} groupTotals
         * @return {?}
         */
        SumAggregator.prototype.storeResult = /**
         * @param {?} groupTotals
         * @return {?}
         */
            function (groupTotals) {
                if (!groupTotals.sum) {
                    groupTotals.sum = {};
                }
                groupTotals.sum[this._field] = this._sum;
            };
        return SumAggregator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Provides a list of different Aggregators for the Group Formatter
     * @type {?}
     */
    var Aggregators = {
        Avg: AvgAggregator,
        Min: MinAggregator,
        Max: MaxAggregator,
        Sum: SumAggregator
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */ CheckboxEditor = /** @class */ (function () {
        function CheckboxEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(CheckboxEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: /**
             * Get Column Definition object
             * @return {?}
             */ function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CheckboxEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: /**
             * Get Column Editor object
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CheckboxEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: /**
             * Get the Validator function, can be passed in Editor property or Column Definition
             * @return {?}
             */ function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        CheckboxEditor.prototype.init = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                this.$input = $("<input type=\"checkbox\" value=\"true\" class=\"editor-checkbox editor-" + fieldId + "\" />");
                this.$input.appendTo(this.args.container);
                this.$input.focus();
                // make the checkbox editor act like a regular checkbox that commit the value on click
                if (this.args.grid.getOptions().autoCommitEdit) {
                    this.$input.click(function () { return _this.args.grid.getEditorLock().commitCurrentEdit(); });
                }
            };
        /**
         * @return {?}
         */
        CheckboxEditor.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this.$input.remove();
            };
        /**
         * @return {?}
         */
        CheckboxEditor.prototype.focus = /**
         * @return {?}
         */
            function () {
                this.$input.focus();
            };
        /**
         * @return {?}
         */
        CheckboxEditor.prototype.hide = /**
         * @return {?}
         */
            function () {
                this.$input.hide();
            };
        /**
         * @return {?}
         */
        CheckboxEditor.prototype.show = /**
         * @return {?}
         */
            function () {
                this.$input.show();
            };
        /**
         * @param {?} item
         * @return {?}
         */
        CheckboxEditor.prototype.loadValue = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                this.defaultValue = !!item[this.columnDef.field];
                if (this.defaultValue) {
                    this.$input.prop('checked', true);
                }
                else {
                    this.$input.prop('checked', false);
                }
            };
        /**
         * @return {?}
         */
        CheckboxEditor.prototype.preClick = /**
         * @return {?}
         */
            function () {
                this.$input.prop('checked', !this.$input.prop('checked'));
            };
        /**
         * @return {?}
         */
        CheckboxEditor.prototype.serializeValue = /**
         * @return {?}
         */
            function () {
                return this.$input.prop('checked');
            };
        /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
        CheckboxEditor.prototype.applyValue = /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
            function (item, state) {
                item[this.columnDef.field] = state;
            };
        /**
         * @return {?}
         */
        CheckboxEditor.prototype.isValueChanged = /**
         * @return {?}
         */
            function () {
                return (this.serializeValue() !== this.defaultValue);
            };
        /**
         * @return {?}
         */
        CheckboxEditor.prototype.validate = /**
         * @return {?}
         */
            function () {
                if (this.validator) {
                    /** @type {?} */
                    var value = this.$input && this.$input.val && this.$input.val();
                    /** @type {?} */
                    var validationResults = this.validator(value, this.args);
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
            };
        return CheckboxEditor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$8 = moment_;
    require('flatpickr');
    /*
     * An example of a date picker editor using Flatpickr
     * https://chmln.github.io/flatpickr
     */
    var /*
     * An example of a date picker editor using Flatpickr
     * https://chmln.github.io/flatpickr
     */ DateEditor = /** @class */ (function () {
        function DateEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(DateEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: /**
             * Get Column Definition object
             * @return {?}
             */ function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: /**
             * Get Column Editor object
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: /**
             * Get the Validator function, can be passed in Editor property or Column Definition
             * @return {?}
             */ function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DateEditor.prototype.init = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.args && this.args.column) {
                    /** @type {?} */
                    var fieldId = this.columnDef && this.columnDef.id;
                    /** @type {?} */
                    var gridOptions = ( /** @type {?} */(this.args.grid.getOptions()));
                    this.defaultDate = (this.args.item) ? this.args.item[this.args.column.field] : null;
                    /** @type {?} */
                    var inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
                    /** @type {?} */
                    var outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || FieldType.dateUtc);
                    /** @type {?} */
                    var currentLocale = this.getCurrentLocale(this.columnDef, gridOptions);
                    if (currentLocale.length > 2) {
                        currentLocale = currentLocale.substring(0, 2);
                    }
                    /** @type {?} */
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
                    this.$input = $("<input type=\"text\" data-defaultDate=\"" + this.defaultDate + "\" class=\"editor-text flatpickr editor-" + fieldId + "\" />");
                    this.$input.appendTo(this.args.container);
                    this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerOptions) : null;
                    this.show();
                }
            };
        /**
         * @param {?} columnDef
         * @param {?} gridOptions
         * @return {?}
         */
        DateEditor.prototype.getCurrentLocale = /**
         * @param {?} columnDef
         * @param {?} gridOptions
         * @return {?}
         */
            function (columnDef, gridOptions) {
                /** @type {?} */
                var options = gridOptions || columnDef.params || {};
                if (options.i18n && options.i18n instanceof core$1.TranslateService) {
                    return options.i18n.currentLang;
                }
                return 'en';
            };
        /**
         * @param {?} locale
         * @return {?}
         */
        DateEditor.prototype.loadFlatpickrLocale = /**
         * @param {?} locale
         * @return {?}
         */
            function (locale) {
                // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
                /** @type {?} */
                var gridOptions = this.args && this.args.grid && this.args.grid.getOptions();
                if (gridOptions && gridOptions.params && gridOptions.params.flapickrLocale) {
                    return gridOptions.params.flapickrLocale;
                }
                else if (locale !== 'en') {
                    /** @type {?} */
                    var localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
                    return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
                }
                return 'en';
            };
        /**
         * @return {?}
         */
        DateEditor.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this.hide();
                // this.flatInstance.destroy();
                this.$input.remove();
            };
        /**
         * @return {?}
         */
        DateEditor.prototype.show = /**
         * @return {?}
         */
            function () {
                if (this.flatInstance && typeof this.flatInstance.open === 'function') {
                    this.flatInstance.open();
                }
            };
        /**
         * @return {?}
         */
        DateEditor.prototype.hide = /**
         * @return {?}
         */
            function () {
                if (this.flatInstance && typeof this.flatInstance.close === 'function') {
                    this.flatInstance.close();
                }
            };
        /**
         * @return {?}
         */
        DateEditor.prototype.focus = /**
         * @return {?}
         */
            function () {
                this.$input.focus();
            };
        /**
         * @return {?}
         */
        DateEditor.prototype.save = /**
         * @return {?}
         */
            function () {
                // autocommit will not focus the next editor
                /** @type {?} */
                var validation = this.validate();
                if (validation && validation.valid) {
                    if (this.args.grid.getOptions().autoCommitEdit) {
                        this.args.grid.getEditorLock().commitCurrentEdit();
                    }
                    else {
                        this.args.commitChanges();
                    }
                }
            };
        /**
         * @return {?}
         */
        DateEditor.prototype.getColumnEditor = /**
         * @return {?}
         */
            function () {
                return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        DateEditor.prototype.loadValue = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                this.defaultDate = item[this.args.column.field];
                this.flatInstance.setDate(item[this.args.column.field]);
            };
        /**
         * @return {?}
         */
        DateEditor.prototype.serializeValue = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var domValue = this.$input.val();
                if (!domValue) {
                    return '';
                }
                /** @type {?} */
                var outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
                /** @type {?} */
                var value = moment$8(domValue).format(outputFormat);
                return value;
            };
        /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
        DateEditor.prototype.applyValue = /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
            function (item, state) {
                if (!state) {
                    return;
                }
                /** @type {?} */
                var outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
                item[this.args.column.field] = moment$8(state, outputFormat).toDate();
            };
        /**
         * @return {?}
         */
        DateEditor.prototype.isValueChanged = /**
         * @return {?}
         */
            function () {
                return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
            };
        /**
         * @return {?}
         */
        DateEditor.prototype.validate = /**
         * @return {?}
         */
            function () {
                if (this.validator) {
                    /** @type {?} */
                    var value = this.$input && this.$input.val && this.$input.val();
                    /** @type {?} */
                    var validationResults = this.validator(value, this.args);
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
            };
        return DateEditor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var defaultDecimalPlaces = 0;
    /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */ FloatEditor = /** @class */ (function () {
        function FloatEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(FloatEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: /**
             * Get Column Definition object
             * @return {?}
             */ function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FloatEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: /**
             * Get Column Editor object
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FloatEditor.prototype, "hasAutoCommitEdit", {
            get: /**
             * @return {?}
             */ function () {
                return this.args.grid.getOptions().autoCommitEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FloatEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: /**
             * Get the Validator function, can be passed in Editor property or Column Definition
             * @return {?}
             */ function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        FloatEditor.prototype.init = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                this.$input = $("<input type=\"number\" class=\"editor-text editor-" + fieldId + "\" step=\"" + this.getInputDecimalSteps() + "\" />")
                    .appendTo(this.args.container)
                    .on('keydown.nav', function (e) {
                    if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                        e.stopImmediatePropagation();
                    }
                });
                // the lib does not get the focus out event for some reason
                // so register it here
                if (this.hasAutoCommitEdit) {
                    this.$input.on('focusout', function () { return _this.save(); });
                }
                setTimeout(function () {
                    _this.$input.focus().select();
                }, 50);
            };
        /**
         * @return {?}
         */
        FloatEditor.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this.$input.remove();
            };
        /**
         * @return {?}
         */
        FloatEditor.prototype.focus = /**
         * @return {?}
         */
            function () {
                this.$input.focus();
            };
        /**
         * @return {?}
         */
        FloatEditor.prototype.getColumnEditor = /**
         * @return {?}
         */
            function () {
                return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
            };
        /**
         * @return {?}
         */
        FloatEditor.prototype.getDecimalPlaces = /**
         * @return {?}
         */
            function () {
                // returns the number of fixed decimal places or null
                /** @type {?} */
                var rtn = (this.columnEditor.params && this.columnEditor.params.hasOwnProperty('decimalPlaces')) ? this.columnEditor.params.decimalPlaces : undefined;
                if (rtn === undefined) {
                    rtn = defaultDecimalPlaces;
                }
                return (!rtn && rtn !== 0 ? null : rtn);
            };
        /**
         * @return {?}
         */
        FloatEditor.prototype.getInputDecimalSteps = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var decimals = this.getDecimalPlaces();
                /** @type {?} */
                var zeroString = '';
                for (var i = 1; i < decimals; i++) {
                    zeroString += '0';
                }
                if (decimals > 0) {
                    return "0." + zeroString + "1";
                }
                return '1';
            };
        /**
         * @param {?} item
         * @return {?}
         */
        FloatEditor.prototype.loadValue = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                this.defaultValue = item[this.columnDef.field];
                /** @type {?} */
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
        /**
         * @return {?}
         */
        FloatEditor.prototype.serializeValue = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var rtn = parseFloat(this.$input.val()) || 0;
                /** @type {?} */
                var decPlaces = this.getDecimalPlaces();
                if (decPlaces !== null
                    && (rtn || rtn === 0)
                    && rtn.toFixed) {
                    rtn = parseFloat(rtn.toFixed(decPlaces));
                }
                return rtn;
            };
        /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
        FloatEditor.prototype.applyValue = /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
            function (item, state) {
                item[this.columnDef.field] = state;
            };
        /**
         * @return {?}
         */
        FloatEditor.prototype.isValueChanged = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var elmValue = this.$input.val();
                return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
            };
        /**
         * @return {?}
         */
        FloatEditor.prototype.save = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var validation = this.validate();
                if (validation && validation.valid) {
                    if (this.hasAutoCommitEdit) {
                        this.args.grid.getEditorLock().commitCurrentEdit();
                    }
                    else {
                        this.args.commitChanges();
                    }
                }
            };
        /**
         * @return {?}
         */
        FloatEditor.prototype.validate = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var elmValue = this.$input.val();
                /** @type {?} */
                var floatNumber = !isNaN(( /** @type {?} */(elmValue))) ? parseFloat(elmValue) : null;
                /** @type {?} */
                var decPlaces = this.getDecimalPlaces();
                /** @type {?} */
                var minValue = this.columnEditor.minValue;
                /** @type {?} */
                var maxValue = this.columnEditor.maxValue;
                /** @type {?} */
                var errorMsg = this.columnEditor.errorMessage;
                /** @type {?} */
                var mapValidation = {
                    '{{minValue}}': minValue,
                    '{{maxValue}}': maxValue,
                    '{{minDecimal}}': 0,
                    '{{maxDecimal}}': decPlaces
                };
                if (this.validator) {
                    /** @type {?} */
                    var validationResults = this.validator(elmValue, this.args);
                    if (!validationResults.valid) {
                        return validationResults;
                    }
                }
                else if (isNaN(( /** @type {?} */(elmValue))) || (decPlaces === 0 && !/^[-+]?(\d+(\.)?(\d)*)$/.test(elmValue))) {
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
                        msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, function (matched) { return mapValidation[matched]; })
                    };
                }
                else if (minValue !== undefined && floatNumber !== null && floatNumber <= minValue) {
                    // MIN VALUE ONLY
                    // when decimal value is bigger than 0, we only accept the decimal values as that value set
                    // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                    return {
                        valid: false,
                        msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MIN.replace(/{{minValue}}/gi, function (matched) { return mapValidation[matched]; })
                    };
                }
                else if (maxValue !== undefined && floatNumber !== null && floatNumber >= maxValue) {
                    // MAX VALUE ONLY
                    // when decimal value is bigger than 0, we only accept the decimal values as that value set
                    // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                    return {
                        valid: false,
                        msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MAX.replace(/{{maxValue}}/gi, function (matched) { return mapValidation[matched]; })
                    };
                }
                else if ((decPlaces > 0 && !new RegExp("^(\\d*(\\.)?(\\d){0," + decPlaces + "})$").test(elmValue))) {
                    // when decimal value is bigger than 0, we only accept the decimal values as that value set
                    // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                    return {
                        valid: false,
                        msg: errorMsg || Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN.replace(/{{minDecimal}}|{{maxDecimal}}/gi, function (matched) { return mapValidation[matched]; })
                    };
                }
                return {
                    valid: true,
                    msg: null
                };
            };
        return FloatEditor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */ IntegerEditor = /** @class */ (function () {
        function IntegerEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(IntegerEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: /**
             * Get Column Definition object
             * @return {?}
             */ function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IntegerEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: /**
             * Get Column Editor object
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IntegerEditor.prototype, "hasAutoCommitEdit", {
            get: /**
             * @return {?}
             */ function () {
                return this.args.grid.getOptions().autoCommitEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IntegerEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: /**
             * Get the Validator function, can be passed in Editor property or Column Definition
             * @return {?}
             */ function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        IntegerEditor.prototype.init = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                this.$input = $("<input type=\"number\" class=\"editor-text editor-" + fieldId + "\" />")
                    .appendTo(this.args.container)
                    .on('keydown.nav', function (e) {
                    if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                        e.stopImmediatePropagation();
                    }
                });
                // the lib does not get the focus out event for some reason
                // so register it here
                if (this.hasAutoCommitEdit) {
                    this.$input.on('focusout', function () { return _this.save(); });
                }
                setTimeout(function () {
                    _this.$input.focus().select();
                }, 50);
            };
        /**
         * @return {?}
         */
        IntegerEditor.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this.$input.remove();
            };
        /**
         * @return {?}
         */
        IntegerEditor.prototype.focus = /**
         * @return {?}
         */
            function () {
                this.$input.focus();
            };
        /**
         * @return {?}
         */
        IntegerEditor.prototype.getColumnEditor = /**
         * @return {?}
         */
            function () {
                return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        IntegerEditor.prototype.loadValue = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                this.defaultValue = parseInt(item[this.args.column.field], 10);
                this.$input.val(this.defaultValue);
                this.$input[0].defaultValue = this.defaultValue;
                this.$input.select();
            };
        /**
         * @return {?}
         */
        IntegerEditor.prototype.serializeValue = /**
         * @return {?}
         */
            function () {
                return parseInt(( /** @type {?} */(this.$input.val())), 10) || 0;
            };
        /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
        IntegerEditor.prototype.applyValue = /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
            function (item, state) {
                item[this.args.column.field] = state;
            };
        /**
         * @return {?}
         */
        IntegerEditor.prototype.isValueChanged = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var elmValue = this.$input.val();
                /** @type {?} */
                var value = isNaN(elmValue) ? elmValue : parseInt(elmValue, 10);
                return (!(value === '' && this.defaultValue === null)) && (value !== this.defaultValue);
            };
        /**
         * @return {?}
         */
        IntegerEditor.prototype.save = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var validation = this.validate();
                if (validation && validation.valid) {
                    if (this.hasAutoCommitEdit) {
                        this.args.grid.getEditorLock().commitCurrentEdit();
                    }
                    else {
                        this.args.commitChanges();
                    }
                }
            };
        /**
         * @return {?}
         */
        IntegerEditor.prototype.validate = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var elmValue = this.$input.val();
                /** @type {?} */
                var errorMsg = this.columnEditor.params && this.columnEditor.errorMessage;
                if (this.validator) {
                    /** @type {?} */
                    var validationResults = this.validator(elmValue, this.args);
                    if (!validationResults.valid) {
                        return validationResults;
                    }
                }
                else if (isNaN(( /** @type {?} */(elmValue))) || !/^[+-]?\d+$/.test(elmValue)) {
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*
     * An example of a 'detached' editor.
     * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var /*
     * An example of a 'detached' editor.
     * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */ LongTextEditor = /** @class */ (function () {
        function LongTextEditor(args) {
            this.args = args;
            this.gridOptions = ( /** @type {?} */(this.args.grid.getOptions()));
            /** @type {?} */
            var options = this.gridOptions || this.args.column.params || {};
            this._translate = options.i18n;
            this.init();
        }
        Object.defineProperty(LongTextEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: /**
             * Get Column Definition object
             * @return {?}
             */ function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LongTextEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: /**
             * Get Column Editor object
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LongTextEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: /**
             * Get the Validator function, can be passed in Editor property or Column Definition
             * @return {?}
             */ function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LongTextEditor.prototype, "hasAutoCommitEdit", {
            get: /**
             * @return {?}
             */ function () {
                return this.args.grid.getOptions().autoCommitEdit;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        LongTextEditor.prototype.init = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var cancelText = this._translate && this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
                /** @type {?} */
                var saveText = this._translate && this._translate.instant('SAVE') || Constants.TEXT_SAVE;
                /** @type {?} */
                var $container = $('body');
                this.$wrapper = $("<div class=\"slick-large-editor-text editor-" + fieldId + "\" />").appendTo($container);
                this.$input = $("<textarea hidefocus rows=\"5\">").appendTo(this.$wrapper);
                // the lib does not get the focus out event for some reason
                // so register it here
                if (this.hasAutoCommitEdit) {
                    this.$input.on('focusout', function () { return _this.save(); });
                }
                $("<div class=\"editor-footer\">\n          <button class=\"btn btn-primary btn-xs\">" + saveText + "</button>\n          <button class=\"btn btn-default btn-xs\">" + cancelText + "</button>\n      </div>").appendTo(this.$wrapper);
                this.$wrapper.find('button:first').on('click', function () { return _this.save(); });
                this.$wrapper.find('button:last').on('click', function () { return _this.cancel(); });
                this.$input.on('keydown', this.handleKeyDown.bind(this));
                this.position(this.args && this.args.position);
                this.$input.focus().select();
            };
        /**
         * @param {?} e
         * @return {?}
         */
        LongTextEditor.prototype.handleKeyDown = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
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
            };
        /**
         * @return {?}
         */
        LongTextEditor.prototype.save = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var validation = this.validate();
                if (validation && validation.valid) {
                    if (this.hasAutoCommitEdit) {
                        this.args.grid.getEditorLock().commitCurrentEdit();
                    }
                    else {
                        this.args.commitChanges();
                    }
                }
            };
        /**
         * @return {?}
         */
        LongTextEditor.prototype.cancel = /**
         * @return {?}
         */
            function () {
                this.$input.val(this.defaultValue);
                if (this.args && this.args.cancelChanges) {
                    this.args.cancelChanges();
                }
            };
        /**
         * @return {?}
         */
        LongTextEditor.prototype.hide = /**
         * @return {?}
         */
            function () {
                this.$wrapper.hide();
            };
        /**
         * @return {?}
         */
        LongTextEditor.prototype.show = /**
         * @return {?}
         */
            function () {
                this.$wrapper.show();
            };
        /**
         * @param {?} position
         * @return {?}
         */
        LongTextEditor.prototype.position = /**
         * @param {?} position
         * @return {?}
         */
            function (position) {
                this.$wrapper
                    .css('top', (position.top || 0) - 5)
                    .css('left', (position.left || 0) - 5);
            };
        /**
         * @return {?}
         */
        LongTextEditor.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this.$wrapper.remove();
            };
        /**
         * @return {?}
         */
        LongTextEditor.prototype.focus = /**
         * @return {?}
         */
            function () {
                this.$input.focus();
            };
        /**
         * @return {?}
         */
        LongTextEditor.prototype.getColumnEditor = /**
         * @return {?}
         */
            function () {
                return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        LongTextEditor.prototype.loadValue = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                this.$input.val(this.defaultValue = item[this.columnDef.field]);
                this.$input.select();
            };
        /**
         * @return {?}
         */
        LongTextEditor.prototype.serializeValue = /**
         * @return {?}
         */
            function () {
                return this.$input.val();
            };
        /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
        LongTextEditor.prototype.applyValue = /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
            function (item, state) {
                item[this.columnDef.field] = state;
            };
        /**
         * @return {?}
         */
        LongTextEditor.prototype.isValueChanged = /**
         * @return {?}
         */
            function () {
                return (!(this.$input.val() === '' && this.defaultValue == null)) && (this.$input.val() !== this.defaultValue);
            };
        /**
         * @return {?}
         */
        LongTextEditor.prototype.validate = /**
         * @return {?}
         */
            function () {
                if (this.validator) {
                    /** @type {?} */
                    var value = this.$input && this.$input.val && this.$input.val();
                    /** @type {?} */
                    var validationResults = this.validator(value, this.args);
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
            };
        return LongTextEditor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DOMPurify$1 = DOMPurify_;
    /**
     * Slickgrid editor class for multiple/single select lists
     */
    var /**
     * Slickgrid editor class for multiple/single select lists
     */ SelectEditor = /** @class */ (function () {
        function SelectEditor(args, isMultipleSelect) {
            var _this = this;
            this.args = args;
            this.isMultipleSelect = isMultipleSelect;
            /**
             * Observable Subscriptions
             */
            this._subscriptions = [];
            // flag to signal that the editor is destroying itself, helps prevent
            // commit changes from being called twice and erroring
            this._destroying = false;
            this.gridOptions = ( /** @type {?} */(this.args.grid.getOptions()));
            /** @type {?} */
            var gridOptions = this.gridOptions || this.args.column.params || {};
            this._translate = gridOptions.i18n;
            // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
            /** @type {?} */
            var fieldId = this.columnDef && this.columnDef.id;
            this.elementName = "editor-" + fieldId;
            /** @type {?} */
            var libOptions = {
                autoAdjustDropHeight: true,
                autoAdjustDropPosition: true,
                autoAdjustDropWidthByTextSize: true,
                container: 'body',
                filter: false,
                maxHeight: 275,
                name: this.elementName,
                single: true,
                textTemplate: function ($elm) {
                    // render HTML code or not, by default it is sanitized and won't be rendered
                    /** @type {?} */
                    var isRenderHtmlEnabled = _this.columnDef && _this.columnDef.internalColumnEditor && _this.columnDef.internalColumnEditor.enableRenderHtml || false;
                    return isRenderHtmlEnabled ? $elm.text() : $elm.html();
                },
                onBlur: function () { return _this.destroy(); },
                onClose: function () {
                    if (!_this._destroying && args.grid.getOptions().autoCommitEdit) {
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
        Object.defineProperty(SelectEditor.prototype, "collection", {
            /** Get the Collection */
            get: /**
             * Get the Collection
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "collectionOptions", {
            /** Getter for the Collection Options */
            get: /**
             * Getter for the Collection Options
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: /**
             * Get Column Definition object
             * @return {?}
             */ function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: /**
             * Get Column Editor object
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "customStructure", {
            /** Getter for the Custom Structure if exist */
            get: /**
             * Getter for the Custom Structure if exist
             * @protected
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "currentValues", {
            /**
             * The current selected values (multiple select) from the collection
             */
            get: /**
             * The current selected values (multiple select) from the collection
             * @return {?}
             */ function () {
                var _this = this;
                // collection of strings, just return the filtered string that are equals
                if (this.collection.every(function (x) { return typeof x === 'string'; })) {
                    return this.collection.filter(function (c) { return _this.$editorElm.val().indexOf(c.toString()) !== -1; });
                }
                // collection of label/value pair
                /** @type {?} */
                var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
                /** @type {?} */
                var isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
                return this.collection
                    .filter(function (c) { return _this.$editorElm.val().indexOf(c[_this.valueName].toString()) !== -1; })
                    .map(function (c) {
                    /** @type {?} */
                    var labelText = c[_this.valueName];
                    /** @type {?} */
                    var prefixText = c[_this.labelPrefixName] || '';
                    /** @type {?} */
                    var suffixText = c[_this.labelSuffixName] || '';
                    // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                    prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this._translate.instant(prefixText || ' ') : prefixText;
                    suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this._translate.instant(suffixText || ' ') : suffixText;
                    if (isIncludingPrefixSuffix) {
                        /** @type {?} */
                        var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; });
                        return tmpOptionArray.join(separatorBetweenLabels);
                    }
                    return labelText;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "currentValue", {
            /**
             * The current selected values (single select) from the collection
             */
            get: /**
             * The current selected values (single select) from the collection
             * @return {?}
             */ function () {
                var _this = this;
                // collection of strings, just return the filtered string that are equals
                if (this.collection.every(function (x) { return typeof x === 'string'; })) {
                    return findOrDefault(this.collection, function (c) { return c.toString() === _this.$editorElm.val(); });
                }
                // collection of label/value pair
                /** @type {?} */
                var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
                /** @type {?} */
                var isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
                /** @type {?} */
                var itemFound = findOrDefault(this.collection, function (c) { return c[_this.valueName].toString() === _this.$editorElm.val(); });
                if (itemFound) {
                    /** @type {?} */
                    var labelText = itemFound[this.valueName];
                    if (isIncludingPrefixSuffix) {
                        /** @type {?} */
                        var prefixText = itemFound[this.labelPrefixName] || '';
                        /** @type {?} */
                        var suffixText = itemFound[this.labelSuffixName] || '';
                        // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                        prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
                        suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
                        // add to a temp array for joining purpose and filter out empty text
                        /** @type {?} */
                        var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; });
                        return tmpOptionArray.join(separatorBetweenLabels);
                    }
                    return labelText;
                }
                return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: /**
             * Get the Validator function, can be passed in Editor property or Column Definition
             * @return {?}
             */ function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        SelectEditor.prototype.init = /**
         * @return {?}
         */
            function () {
                if (!this.args) {
                    throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
                }
                if (!this.columnDef || !this.columnDef.internalColumnEditor || (!this.columnDef.internalColumnEditor.collection && !this.columnDef.internalColumnEditor.collectionAsync)) {
                    throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") inside Column Definition Editor for the MultipleSelect/SingleSelect Editor to work correctly.\n      Also each option should include a value/label pair (or value/labelKey when using Locale).\n      For example: { editor: { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } }");
                }
                this._collectionService = new CollectionService(this._translate);
                this.enableTranslateLabel = (this.columnDef.internalColumnEditor.enableTranslateLabel) ? this.columnDef.internalColumnEditor.enableTranslateLabel : false;
                this.labelName = this.customStructure && this.customStructure.label || 'label';
                this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
                this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
                this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
                this.valueName = this.customStructure && this.customStructure.value || 'value';
                if (this.enableTranslateLabel && (!this._translate || typeof this._translate.instant !== 'function')) {
                    throw new Error("[select-editor] The ngx-translate TranslateService is required for the Select Editor to work correctly");
                }
                // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
                // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
                this.renderDomElement(this.collection);
            };
        /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
        SelectEditor.prototype.applyValue = /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
            function (item, state) {
                item[this.columnDef.field] = state;
            };
        /**
         * @return {?}
         */
        SelectEditor.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this._destroying = true;
                if (this.$editorElm && this.$editorElm.multipleSelect) {
                    this.$editorElm.multipleSelect('close');
                    this.$editorElm.remove();
                }
                this._subscriptions = unsubscribeAllObservables(this._subscriptions);
            };
        /**
         * @param {?} item
         * @return {?}
         */
        SelectEditor.prototype.loadValue = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                if (this.isMultipleSelect) {
                    this.loadMultipleValues(item);
                }
                else {
                    this.loadSingleValue(item);
                }
                this.refresh();
            };
        /**
         * @param {?} items
         * @return {?}
         */
        SelectEditor.prototype.loadMultipleValues = /**
         * @param {?} items
         * @return {?}
         */
            function (items) {
                var _this = this;
                // convert to string because that is how the DOM will return these values
                this.defaultValue = items[this.columnDef.field].map(function (i) { return i.toString(); });
                this.$editorElm.find('option').each(function (i, $e) {
                    $e.selected = (_this.defaultValue.indexOf($e.value) !== -1);
                });
            };
        /**
         * @param {?} item
         * @return {?}
         */
        SelectEditor.prototype.loadSingleValue = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                var _this = this;
                // convert to string because that is how the DOM will return these values
                // make sure the prop exists first
                this.defaultValue = item[this.columnDef.field] && item[this.columnDef.field].toString();
                this.$editorElm.find('option').each(function (i, $e) {
                    $e.selected = (_this.defaultValue === $e.value);
                });
            };
        /**
         * @return {?}
         */
        SelectEditor.prototype.serializeValue = /**
         * @return {?}
         */
            function () {
                return (this.isMultipleSelect) ? this.currentValues : this.currentValue;
            };
        /**
         * @return {?}
         */
        SelectEditor.prototype.focus = /**
         * @return {?}
         */
            function () {
                if (this.$editorElm && this.$editorElm.multipleSelect) {
                    this.$editorElm.multipleSelect('focus');
                }
            };
        /**
         * @return {?}
         */
        SelectEditor.prototype.isValueChanged = /**
         * @return {?}
         */
            function () {
                if (this.isMultipleSelect) {
                    return !arraysEqual(this.$editorElm.val(), this.defaultValue);
                }
                return this.$editorElm.val() !== this.defaultValue;
            };
        /**
         * @return {?}
         */
        SelectEditor.prototype.validate = /**
         * @return {?}
         */
            function () {
                if (this.validator) {
                    /** @type {?} */
                    var value = this.isMultipleSelect ? this.currentValues : this.currentValue;
                    /** @type {?} */
                    var validationResults = this.validator(value, this.args);
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
            };
        //
        // protected functions
        // ------------------
        /**
         * user might want to filter certain items of the collection
         * @param inputCollection
         * @return outputCollection filtered and/or sorted collection
         */
        //
        // protected functions
        // ------------------
        /**
         * user might want to filter certain items of the collection
         * @protected
         * @param {?} inputCollection
         * @return {?} outputCollection filtered and/or sorted collection
         */
        SelectEditor.prototype.filterCollection =
            //
            // protected functions
            // ------------------
            /**
             * user might want to filter certain items of the collection
             * @protected
             * @param {?} inputCollection
             * @return {?} outputCollection filtered and/or sorted collection
             */
            function (inputCollection) {
                /** @type {?} */
                var outputCollection = inputCollection;
                // user might want to filter certain items of the collection
                if (this.columnEditor && this.columnEditor.collectionFilterBy) {
                    /** @type {?} */
                    var filterBy = this.columnEditor.collectionFilterBy;
                    /** @type {?} */
                    var filterCollectionBy = this.columnEditor.collectionOptions && this.columnEditor.collectionOptions.filterAfterEachPass || null;
                    outputCollection = this._collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
                }
                return outputCollection;
            };
        /**
         * user might want to sort the collection in a certain way
         * @param inputCollection
         * @return outputCollection sorted collection
         */
        /**
         * user might want to sort the collection in a certain way
         * @protected
         * @param {?} inputCollection
         * @return {?} outputCollection sorted collection
         */
        SelectEditor.prototype.sortCollection = /**
         * user might want to sort the collection in a certain way
         * @protected
         * @param {?} inputCollection
         * @return {?} outputCollection sorted collection
         */
            function (inputCollection) {
                /** @type {?} */
                var outputCollection = inputCollection;
                // user might want to sort the collection
                if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionSortBy) {
                    /** @type {?} */
                    var sortBy = this.columnDef.internalColumnEditor.collectionSortBy;
                    outputCollection = this._collectionService.sortCollection(outputCollection, sortBy, this.enableTranslateLabel);
                }
                return outputCollection;
            };
        /**
         * @protected
         * @param {?} collection
         * @return {?}
         */
        SelectEditor.prototype.renderDomElement = /**
         * @protected
         * @param {?} collection
         * @return {?}
         */
            function (collection) {
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
                /** @type {?} */
                var newCollection = collection || [];
                // user might want to filter and/or sort certain items of the collection
                newCollection = this.filterCollection(newCollection);
                newCollection = this.sortCollection(newCollection);
                // step 1, create HTML string template
                /** @type {?} */
                var editorTemplate = this.buildTemplateHtmlString(newCollection);
                // step 2, create the DOM Element of the editor
                // also subscribe to the onClose event
                this.createDomElement(editorTemplate);
            };
        /**
         * @protected
         * @param {?} collection
         * @return {?}
         */
        SelectEditor.prototype.buildTemplateHtmlString = /**
         * @protected
         * @param {?} collection
         * @return {?}
         */
            function (collection) {
                var _this = this;
                /** @type {?} */
                var options = '';
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
                /** @type {?} */
                var isRenderHtmlEnabled = this.columnDef.internalColumnEditor.enableRenderHtml || false;
                /** @type {?} */
                var sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
                // collection could be an Array of Strings OR Objects
                if (collection.every(function (x) { return typeof x === 'string'; })) {
                    collection.forEach(function (option) {
                        options += "<option value=\"" + option + "\" label=\"" + option + "\">" + option + "</option>";
                    });
                }
                else {
                    // array of objects will require a label/value pair unless a customStructure is passed
                    collection.forEach(function (option) {
                        if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                            throw new Error("[select-editor] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example: { collection: [ { value: '1', label: 'One' } ])");
                        }
                        /** @type {?} */
                        var labelKey = ( /** @type {?} */((option.labelKey || option[_this.labelName])));
                        /** @type {?} */
                        var labelText = ((option.labelKey || _this.enableTranslateLabel) && labelKey) ? _this._translate.instant(labelKey || ' ') : labelKey;
                        /** @type {?} */
                        var prefixText = option[_this.labelPrefixName] || '';
                        /** @type {?} */
                        var suffixText = option[_this.labelSuffixName] || '';
                        /** @type {?} */
                        var optionLabel = option[_this.optionLabel] || '';
                        optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                        // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                        prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this._translate.instant(prefixText || ' ') : prefixText;
                        suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this._translate.instant(suffixText || ' ') : suffixText;
                        optionLabel = (_this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? _this._translate.instant(optionLabel || ' ') : optionLabel;
                        // add to a temp array for joining purpose and filter out empty text
                        /** @type {?} */
                        var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; });
                        /** @type {?} */
                        var optionText = tmpOptionArray.join(separatorBetweenLabels);
                        // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                        // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                        if (isRenderHtmlEnabled) {
                            // sanitize any unauthorized html tags like script and others
                            // for the remaining allowed tags we'll permit all attributes
                            /** @type {?} */
                            var sanitizedText = DOMPurify$1.sanitize(optionText, sanitizedOptions);
                            optionText = htmlEncode(sanitizedText);
                        }
                        options += "<option value=\"" + option[_this.valueName] + "\" label=\"" + optionLabel + "\">" + optionText + "</option>";
                    });
                }
                return "<select id=\"" + this.elementName + "\" class=\"ms-filter search-filter editor-" + fieldId + "\" " + (this.isMultipleSelect ? 'multiple="multiple"' : '') + ">" + options + "</select>";
            };
        /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
        /**
         * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
         * @protected
         * @return {?}
         */
        SelectEditor.prototype.createBlankEntry = /**
         * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
         * @protected
         * @return {?}
         */
            function () {
                var _a;
                /** @type {?} */
                var blankEntry = (_a = {},
                    _a[this.labelName] = '',
                    _a[this.valueName] = '',
                    _a);
                if (this.labelPrefixName) {
                    blankEntry[this.labelPrefixName] = '';
                }
                if (this.labelSuffixName) {
                    blankEntry[this.labelSuffixName] = '';
                }
                return blankEntry;
            };
        /** Build the template HTML string */
        /**
         * Build the template HTML string
         * @protected
         * @param {?} editorTemplate
         * @return {?}
         */
        SelectEditor.prototype.createDomElement = /**
         * Build the template HTML string
         * @protected
         * @param {?} editorTemplate
         * @return {?}
         */
            function (editorTemplate) {
                var _this = this;
                this.$editorElm = $(editorTemplate);
                if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
                    this.$editorElm.appendTo(this.args.container);
                }
                if (typeof this.$editorElm.multipleSelect !== 'function') {
                    // fallback to bootstrap
                    this.$editorElm.addClass('form-control');
                }
                else {
                    /** @type {?} */
                    var elementOptions = (this.columnDef.internalColumnEditor) ? this.columnDef.internalColumnEditor.elementOptions : {};
                    this.editorElmOptions = __assign({}, this.defaultOptions, elementOptions);
                    this.$editorElm = this.$editorElm.multipleSelect(this.editorElmOptions);
                    setTimeout(function () { return _this.$editorElm.multipleSelect('open'); });
                }
            };
        // refresh the jquery object because the selected checkboxes were already set
        // prior to this method being called
        // refresh the jquery object because the selected checkboxes were already set
        // prior to this method being called
        /**
         * @protected
         * @return {?}
         */
        SelectEditor.prototype.refresh =
            // refresh the jquery object because the selected checkboxes were already set
            // prior to this method being called
            /**
             * @protected
             * @return {?}
             */
            function () {
                if (typeof this.$editorElm.multipleSelect === 'function') {
                    this.$editorElm.multipleSelect('refresh');
                }
            };
        return SelectEditor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MultipleSelectEditor = /** @class */ (function (_super) {
        __extends(MultipleSelectEditor, _super);
        /**
         * Initialize the Editor
         */
        function MultipleSelectEditor(args) {
            var _this = _super.call(this, args, true) || this;
            _this.args = args;
            return _this;
        }
        return MultipleSelectEditor;
    }(SelectEditor));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SingleSelectEditor = /** @class */ (function (_super) {
        __extends(SingleSelectEditor, _super);
        /**
         * Initialize the Editor
         */
        function SingleSelectEditor(args) {
            var _this = _super.call(this, args, false) || this;
            _this.args = args;
            return _this;
        }
        return SingleSelectEditor;
    }(SelectEditor));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DEFAULT_MIN_VALUE$2 = 0;
    /** @type {?} */
    var DEFAULT_MAX_VALUE$2 = 100;
    /** @type {?} */
    var DEFAULT_STEP$2 = 1;
    var SliderEditor = /** @class */ (function () {
        function SliderEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(SliderEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: /**
             * Get Column Definition object
             * @return {?}
             */ function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: /**
             * Get Column Editor object
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderEditor.prototype, "editorParams", {
            /** Getter for the Editor Generic Params */
            get: /**
             * Getter for the Editor Generic Params
             * @private
             * @return {?}
             */ function () {
                return this.columnEditor.params || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: /**
             * Get the Validator function, can be passed in Editor property or Column Definition
             * @return {?}
             */ function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        SliderEditor.prototype.init = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var container = this.args && this.args.container;
                // define the input & slider number IDs
                /** @type {?} */
                var itemId = this.args && this.args.item && this.args.item.id;
                this._elementRangeInputId = "rangeInput_" + this.columnDef.field + "_" + itemId;
                this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field + "_" + itemId;
                // create HTML string template
                /** @type {?} */
                var editorTemplate = this.buildTemplateHtmlString();
                this.$editorElm = $(editorTemplate);
                this.$input = this.$editorElm.children('input');
                this.$sliderNumber = this.$editorElm.children('div.input-group-addon.input-group-append').children();
                // watch on change event
                this.$editorElm
                    .appendTo(container)
                    .on('mouseup', function () { return _this.save(); });
                // if user chose to display the slider number on the right side, then update it every time it changes
                // we need to use both "input" and "change" event to be all cross-browser
                if (!this.editorParams.hideSliderNumber) {
                    this.$editorElm.on('input change', function (e) {
                        /** @type {?} */
                        var value = e && e.target && e.target.value || '';
                        if (value) {
                            document.getElementById(_this._elementRangeOutputId).innerHTML = e.target.value;
                        }
                    });
                }
            };
        /**
         * @return {?}
         */
        SliderEditor.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this.$editorElm.remove();
            };
        /**
         * @return {?}
         */
        SliderEditor.prototype.focus = /**
         * @return {?}
         */
            function () {
                this.$editorElm.focus();
            };
        /**
         * @return {?}
         */
        SliderEditor.prototype.save = /**
         * @return {?}
         */
            function () {
                if (this.args.grid.getOptions().autoCommitEdit) {
                    this.args.grid.getEditorLock().commitCurrentEdit();
                }
                else {
                    this.args.commitChanges();
                }
            };
        /**
         * @return {?}
         */
        SliderEditor.prototype.cancel = /**
         * @return {?}
         */
            function () {
                this.$input.val(this.defaultValue);
                this.args.cancelChanges();
            };
        /**
         * @param {?} item
         * @return {?}
         */
        SliderEditor.prototype.loadValue = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                // this.$input.val(this.defaultValue = item[this.columnDef.field]);
                this.defaultValue = item[this.columnDef.field];
                this.$input.val(this.defaultValue);
                this.$input[0].defaultValue = this.defaultValue;
                this.$sliderNumber.html(this.defaultValue);
            };
        /**
         * @return {?}
         */
        SliderEditor.prototype.serializeValue = /**
         * @return {?}
         */
            function () {
                return parseInt(( /** @type {?} */(this.$input.val())), 10) || 0;
            };
        /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
        SliderEditor.prototype.applyValue = /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
            function (item, state) {
                item[this.columnDef.field] = state;
            };
        /**
         * @return {?}
         */
        SliderEditor.prototype.isValueChanged = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var elmValue = this.$input.val();
                return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
            };
        /**
         * @return {?}
         */
        SliderEditor.prototype.validate = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var elmValue = this.$input.val();
                /** @type {?} */
                var minValue = this.columnEditor.minValue;
                /** @type {?} */
                var maxValue = this.columnEditor.maxValue;
                /** @type {?} */
                var errorMsg = this.columnEditor.errorMessage;
                /** @type {?} */
                var mapValidation = {
                    '{{minValue}}': minValue,
                    '{{maxValue}}': maxValue
                };
                if (this.validator) {
                    /** @type {?} */
                    var validationResults = this.validator(elmValue, this.args);
                    if (!validationResults.valid) {
                        return validationResults;
                    }
                }
                else if (minValue !== undefined && (elmValue < minValue || elmValue > maxValue)) {
                    // when decimal value is bigger than 0, we only accept the decimal values as that value set
                    // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
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
        //
        // private functions
        // ------------------
        /**
         * Create the HTML template as a string
         */
        //
        // private functions
        // ------------------
        /**
         * Create the HTML template as a string
         * @private
         * @return {?}
         */
        SliderEditor.prototype.buildTemplateHtmlString =
            //
            // private functions
            // ------------------
            /**
             * Create the HTML template as a string
             * @private
             * @return {?}
             */
            function () {
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                /** @type {?} */
                var minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE$2;
                /** @type {?} */
                var maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE$2;
                /** @type {?} */
                var defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
                /** @type {?} */
                var step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP$2;
                /** @type {?} */
                var itemId = this.args && this.args.item && this.args.item.id;
                if (this.editorParams.hideSliderNumber) {
                    return "\n      <div class=\"slider-editor\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-editor-input editor-" + fieldId + " range\" />\n      </div>";
                }
                return "\n      <div class=\"input-group slider-editor\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-editor-input editor-" + fieldId + " range\" />\n        <div class=\"input-group-addon input-group-append slider-value\"><span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span></div>\n      </div>";
            };
        return SliderEditor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */ TextEditor = /** @class */ (function () {
        function TextEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(TextEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: /**
             * Get Column Definition object
             * @return {?}
             */ function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: /**
             * Get Column Editor object
             * @return {?}
             */ function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextEditor.prototype, "hasAutoCommitEdit", {
            get: /**
             * @return {?}
             */ function () {
                return this.args.grid.getOptions().autoCommitEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: /**
             * Get the Validator function, can be passed in Editor property or Column Definition
             * @return {?}
             */ function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        TextEditor.prototype.init = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var fieldId = this.columnDef && this.columnDef.id;
                this.$input = $("<input type=\"text\" class=\"editor-text editor-" + fieldId + "\" />")
                    .appendTo(this.args.container)
                    .on('keydown.nav', function (e) {
                    if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                        e.stopImmediatePropagation();
                    }
                });
                // the lib does not get the focus out event for some reason
                // so register it here
                if (this.hasAutoCommitEdit) {
                    this.$input.on('focusout', function () { return _this.save(); });
                }
                setTimeout(function () {
                    _this.$input.focus().select();
                }, 50);
            };
        /**
         * @return {?}
         */
        TextEditor.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this.$input.remove();
            };
        /**
         * @return {?}
         */
        TextEditor.prototype.focus = /**
         * @return {?}
         */
            function () {
                this.$input.focus();
            };
        /**
         * @return {?}
         */
        TextEditor.prototype.getValue = /**
         * @return {?}
         */
            function () {
                return this.$input.val();
            };
        /**
         * @param {?} val
         * @return {?}
         */
        TextEditor.prototype.setValue = /**
         * @param {?} val
         * @return {?}
         */
            function (val) {
                this.$input.val(val);
            };
        /**
         * @param {?} item
         * @return {?}
         */
        TextEditor.prototype.loadValue = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                this.defaultValue = item[this.args.column.field] || '';
                this.$input.val(this.defaultValue);
                this.$input[0].defaultValue = this.defaultValue;
                this.$input.select();
            };
        /**
         * @return {?}
         */
        TextEditor.prototype.serializeValue = /**
         * @return {?}
         */
            function () {
                return this.$input.val();
            };
        /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
        TextEditor.prototype.applyValue = /**
         * @param {?} item
         * @param {?} state
         * @return {?}
         */
            function (item, state) {
                item[this.args.column.field] = state;
            };
        /**
         * @return {?}
         */
        TextEditor.prototype.isValueChanged = /**
         * @return {?}
         */
            function () {
                return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
            };
        /**
         * @return {?}
         */
        TextEditor.prototype.save = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var validation = this.validate();
                if (validation && validation.valid) {
                    if (this.hasAutoCommitEdit) {
                        this.args.grid.getEditorLock().commitCurrentEdit();
                    }
                    else {
                        this.args.commitChanges();
                    }
                }
            };
        /**
         * @return {?}
         */
        TextEditor.prototype.validate = /**
         * @return {?}
         */
            function () {
                if (this.validator) {
                    /** @type {?} */
                    var value = this.$input && this.$input.val && this.$input.val();
                    /** @type {?} */
                    var validationResults = this.validator(value, this.args);
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
            };
        return TextEditor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var Editors = {
        /**
         * Checkbox Editor (uses native checkbox DOM element)
         */
        checkbox: CheckboxEditor,
        /**
         * Date Picker Editor (which uses 3rd party lib "flatpickr")
         */
        date: DateEditor,
        /**
         * Float Number Editor
         */
        float: FloatEditor,
        /**
         * Integer Editor
         */
        integer: IntegerEditor,
        /**
         * Long Text Editor (uses a textarea)
         */
        longText: LongTextEditor,
        /**
         * Multiple Select editor (which uses 3rd party lib "multiple-select.js")
         */
        multipleSelect: MultipleSelectEditor,
        /**
         * Single Select editor (which uses 3rd party lib "multiple-select.js")
         */
        singleSelect: SingleSelectEditor,
        /**
         * Slider Editor
         */
        slider: SliderEditor,
        /**
         * Text Editor
         */
        text: TextEditor
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var arrayObjectToCsvFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var propertyNames = columnDef && columnDef.params && columnDef.params.propertyNames;
        /** @type {?} */
        var parentObjectKeyName = columnDef && columnDef.field && columnDef.field.split('.')[0];
        if (!propertyNames || !Array.isArray(propertyNames) || !parentObjectKeyName) {
            throw new Error("Formatters.arrayObjectToCsv requires you to pass an array of \"propertyNames\" (declared in \"params\") that you want to pull the data from.\n      For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition:: { params: { propertyNames: ['firtName'] }}");
        }
        // the dataContext holds all the data, so we can find the values we want even when "value" argument might be null
        // e.g. if we want to use the propertyNames of ['firstName', 'lastName'] from the "users" array of objects
        if (dataContext[parentObjectKeyName] && Array.isArray(dataContext[parentObjectKeyName])) {
            // we will 1st get the object from the dataContext, then
            if (Array.isArray(dataContext[parentObjectKeyName])) {
                /** @type {?} */
                var outputStrings_1 = [];
                dataContext[parentObjectKeyName].forEach(function (data) {
                    /** @type {?} */
                    var strings = [];
                    // 2nd from that data loop through all propertyNames we want to use (e.g.: ['firstName', 'lastName'])
                    propertyNames.forEach(function (prop) {
                        strings.push(data[prop]);
                    });
                    // we will join these strings with spaces (e.g. 'John Doe' where 'John' was firstName and 'Doe' was lastName)
                    outputStrings_1.push(strings.join(' '));
                });
                // finally join all the output strings by CSV (e.g.: 'John Doe, Jane Doe')
                /** @type {?} */
                var output = outputStrings_1.join(', ');
                return "<span title=\"" + output + "\">" + output + "</span>";
            }
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var arrayToCsvFormatter = function (row, cell, value, columnDef, dataContext) {
        if (value && Array.isArray(value)) {
            /** @type {?} */
            var values = value.join(', ');
            return "<span title=\"" + values + "\">" + values + "</span>";
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var boldFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
        if (!isNumber) {
            return '';
        }
        else if (value >= 0) {
            return "<span style=\"font-weight: bold\">" + decimalFormatted(value, 2, 2) + "$</span>";
        }
        else {
            return "<span style=\"font-weight: bold\">" + decimalFormatted(value, 2, 2) + "$</span>";
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var checkboxFormatter = function (row, cell, value, columnDef, dataContext) {
        return value ? '&#x2611;' : '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var checkmarkFormatter = function (row, cell, value, columnDef, dataContext) {
        return value ? "<i class=\"fa fa-check checkmark-icon\" aria-hidden=\"true\"></i>" : '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * A formatter to show the label property value of a params collection
     * @type {?}
     */
    var collectionFormatter = function (row, cell, value, columnDef, dataContext) {
        if (!value || !columnDef || !columnDef.params || !columnDef.params.collection
            || !columnDef.params.collection.length) {
            return '';
        }
        var params = columnDef.params, collection = columnDef.params.collection;
        /** @type {?} */
        var labelName = (params.customStructure) ? params.customStructure.label : 'label';
        /** @type {?} */
        var valueName = (params.customStructure) ? params.customStructure.value : 'value';
        if (Array.isArray(value)) {
            return arrayToCsvFormatter(row, cell, value.map(function (v) { return findOrDefault(collection, function (c) { return c[valueName] === v; })[labelName]; }), columnDef, dataContext);
        }
        return findOrDefault(collection, function (c) { return c[valueName] === value; })[labelName] || '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * A formatter to show the label property value of an editor collection
     * @type {?}
     */
    var collectionEditorFormatter = function (row, cell, value, columnDef, dataContext) {
        if (!value || !columnDef || !columnDef.internalColumnEditor || !columnDef.internalColumnEditor.collection
            || !columnDef.internalColumnEditor.collection.length) {
            return '';
        }
        var internalColumnEditor = columnDef.internalColumnEditor, collection = columnDef.internalColumnEditor.collection;
        /** @type {?} */
        var labelName = (internalColumnEditor.customStructure) ? internalColumnEditor.customStructure.label : 'label';
        /** @type {?} */
        var valueName = (internalColumnEditor.customStructure) ? internalColumnEditor.customStructure.value : 'value';
        if (Array.isArray(value)) {
            if (collection.every(function (x) { return typeof x === 'string'; })) {
                return arrayToCsvFormatter(row, cell, value.map(function (v) { return findOrDefault(collection, function (c) { return c === v; }); }), columnDef, dataContext);
            }
            else {
                return arrayToCsvFormatter(row, cell, value.map(function (v) { return findOrDefault(collection, function (c) { return c[valueName] === v; })[labelName]; }), columnDef, dataContext);
            }
        }
        return findOrDefault(collection, function (c) { return c[valueName] === value; })[labelName] || '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var complexObjectFormatter = function (row, cell, value, columnDef, dataContext) {
        if (!columnDef) {
            return '';
        }
        /** @type {?} */
        var complexField = columnDef.field || '';
        return complexField.split('.').reduce(function (obj, i) { return (obj ? obj[i] : ''); }, dataContext);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$9 = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$6 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
    /** @type {?} */
    var dateIsoFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isDateValid = moment$9(value, FORMAT$6, false).isValid();
        return (value && isDateValid) ? moment$9(value).format(FORMAT$6) : value;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$a = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$7 = mapMomentDateFormatWithFieldType(FieldType.dateTimeIso);
    /** @type {?} */
    var dateTimeIsoFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isDateValid = moment$a(value, FORMAT$7, false).isValid();
        return (value && isDateValid) ? moment$a(value).format(FORMAT$7) : value;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$b = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$8 = mapMomentDateFormatWithFieldType(FieldType.dateTimeIsoAmPm);
    /** @type {?} */
    var dateTimeIsoAmPmFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isDateValid = moment$b(value, FORMAT$8, false).isValid();
        return (value && isDateValid) ? moment$b(value).format(FORMAT$8) : value;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$c = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$9 = mapMomentDateFormatWithFieldType(FieldType.dateTimeUsAmPm);
    /** @type {?} */
    var dateTimeUsAmPmFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isDateValid = moment$c(value, FORMAT$9, false).isValid();
        return (value && isDateValid) ? moment$c(value).format(FORMAT$9) : value;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$d = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$a = mapMomentDateFormatWithFieldType(FieldType.dateTimeUs);
    /** @type {?} */
    var dateTimeUsFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isDateValid = moment$d(value, FORMAT$a, false).isValid();
        return (value && isDateValid) ? moment$d(value).format(FORMAT$a) : value;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$e = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$b = mapMomentDateFormatWithFieldType(FieldType.dateTimeShortIso);
    /** @type {?} */
    var dateTimeShortIsoFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isDateValid = moment$e(value, FORMAT$b, false).isValid();
        return (value && isDateValid) ? moment$e(value).format(FORMAT$b) : value;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$f = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$c = mapMomentDateFormatWithFieldType(FieldType.dateTimeShortUs);
    /** @type {?} */
    var dateTimeShortUsFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isDateValid = moment$f(value, FORMAT$c, false).isValid();
        return (value && isDateValid) ? moment$f(value).format(FORMAT$c) : value;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$g = moment_;
    // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /** @type {?} */
    var FORMAT$d = mapMomentDateFormatWithFieldType(FieldType.dateUs);
    /** @type {?} */
    var dateUsFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isDateValid = moment$g(value, FORMAT$d, false).isValid();
        return (value && isDateValid) ? moment$g(value).format(FORMAT$d) : value;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var decimalFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var params = columnDef.params || {};
        /** @type {?} */
        var minDecimalPlaces = params.minDecimalPlaces || params.decimalPlaces || 2;
        /** @type {?} */
        var maxDecimalPlaces = params.maxDecimalPlaces || 2;
        /** @type {?} */
        var isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
        return !isNumber ? value : "" + decimalFormatted(value, minDecimalPlaces, maxDecimalPlaces);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var deleteIconFormatter = function (row, cell, value, columnDef, dataContext) {
        return "<i class=\"fa fa-trash pointer delete-icon\" aria-hidden=\"true\"></i>";
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var dollarColoredBoldFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
        /** @type {?} */
        var params = columnDef && columnDef.params || {};
        /** @type {?} */
        var minDecimal = params.minDecimal || 2;
        /** @type {?} */
        var maxDecimal = params.minDecimal || 4;
        /** @type {?} */
        var outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;
        if (!isNumber) {
            return '';
        }
        else if (value >= 0) {
            return "<span style=\"color:green; font-weight: bold;\">$" + outputValue + "</span>";
        }
        else {
            return "<span style=\"color:red; font-weight: bold;\">$" + outputValue + "</span>";
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var dollarColoredFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
        /** @type {?} */
        var params = columnDef && columnDef.params || {};
        /** @type {?} */
        var minDecimal = params.minDecimal || 2;
        /** @type {?} */
        var maxDecimal = params.minDecimal || 4;
        /** @type {?} */
        var outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;
        if (!isNumber) {
            return '';
        }
        else if (value >= 0) {
            return "<span style=\"color:green;\">$" + outputValue + "</span>";
        }
        else {
            return "<span style=\"color:red;\">$" + outputValue + "</span>";
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var dollarFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
        /** @type {?} */
        var params = columnDef && columnDef.params || {};
        /** @type {?} */
        var minDecimal = params.minDecimal || 2;
        /** @type {?} */
        var maxDecimal = params.minDecimal || 4;
        /** @type {?} */
        var outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;
        return !isNumber ? '' : "$" + outputValue;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var editIconFormatter = function (row, cell, value, columnDef, dataContext) {
        return "<i class=\"fa fa-pencil pointer edit-icon\" aria-hidden=\"true\"></i>";
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var hyperlinkFormatter = function (row, cell, value, columnDef, dataContext) {
        if (value && typeof value === 'string') {
            /** @type {?} */
            var matchUrl = value.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i);
            if (matchUrl && Array.isArray(matchUrl)) {
                return "<a href=\"" + matchUrl[0] + "\">' + value + '</a>";
            }
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"
     * @type {?}
     */
    var hyperlinkUriPrefixFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var infoIconFormatter = function (row, cell, value, columnDef, dataContext) {
        return "<i class=\"fa fa-info-circle pointer info-icon\" aria-hidden=\"true\"></i>";
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var lowercaseFormatter = function (row, cell, value, columnDef, dataContext) {
        // make sure the value is a string
        if (value !== undefined && typeof value !== 'string') {
            value = value + '';
        }
        return value ? value.toLowerCase() : '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Takes a value display it according to a mask provided
     * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
     * @type {?}
     */
    var maskFormatter = function (row, cell, value, columnDef, dataContext) {
        /** @type {?} */
        var params = columnDef.params || {};
        /** @type {?} */
        var mask = params.mask;
        if (!mask) {
            throw new Error("You must provide a \"mask\" via the generic \"params\" options (e.g.: { formatter: Formatters.mask, params: { mask: '000-000' }}");
        }
        if (value && mask) {
            /** @type {?} */
            var i_1 = 0;
            /** @type {?} */
            var v_1 = value.toString();
            return mask.replace(/[09A]/g, function () { return v_1[i_1++] || ''; });
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var multipleFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var e_1, _a;
        /** @type {?} */
        var params = columnDef.params || {};
        if (!params.formatters || !Array.isArray(params.formatters)) {
            throw new Error("The multiple formatter requires the \"formatters\" to be provided as a column params.\n    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }");
        }
        /** @type {?} */
        var formatters = params.formatters;
        // loop through all Formatters, the value of 1st formatter will be used by 2nd formatter and so on.
        // they are piped and executed in sequences
        /** @type {?} */
        var currentValue = value;
        try {
            for (var formatters_1 = __values(formatters), formatters_1_1 = formatters_1.next(); !formatters_1_1.done; formatters_1_1 = formatters_1.next()) {
                var formatter = formatters_1_1.value;
                currentValue = formatter(row, cell, currentValue, columnDef, dataContext, grid);
            }
        }
        catch (e_1_1) {
            e_1 = { error: e_1_1 };
        }
        finally {
            try {
                if (formatters_1_1 && !formatters_1_1.done && (_a = formatters_1.return))
                    _a.call(formatters_1);
            }
            finally {
                if (e_1)
                    throw e_1.error;
            }
        }
        return currentValue;
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var percentFormatter = function (row, cell, value, columnDef, dataContext) {
        if (value === null || value === '') {
            return '';
        }
        /** @type {?} */
        var outputValue = value > 0 ? value / 100 : 0;
        return "<span>" + outputValue + "%</span>";
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var percentCompleteBarFormatter = function (row, cell, value, columnDef, dataContext) {
        if (value === null || value === '') {
            return '';
        }
        /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var percentSymbolFormatter = function (row, cell, value, columnDef, dataContext) {
        return value ? "<span>" + value + "%</span>" : '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var progressBarFormatter = function (row, cell, value, columnDef, dataContext) {
        if (value === null || value === '') {
            return '';
        }
        /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Takes a cell value and translates it with the "ngx-translate" service
     * @type {?}
     */
    var translateFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        /** @type {?} */
        var gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
        /** @type {?} */
        var options = gridOptions || columnDef.params || {};
        /** @type {?} */
        var translate = options.i18n;
        if (!translate || typeof translate.instant !== 'function') {
            throw new Error("The translate formatter requires the \"ngx-translate\" Service to be provided as a Grid Options or Column Definition \"i18n\".\n    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }");
        }
        // make sure the value is a string (for example a boolean value would throw an error)
        if (value !== undefined && typeof value !== 'string') {
            value = value + '';
        }
        return value ? translate.instant(value) : '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Takes a boolean value, cast it to upperCase string and finally translates it with the "ngx-translate" service
     * @type {?}
     */
    var translateBooleanFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        /** @type {?} */
        var gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
        /** @type {?} */
        var options = gridOptions || columnDef.params || {};
        /** @type {?} */
        var translate = options.i18n;
        if (!translate || typeof translate.instant !== 'function') {
            throw new Error("The translate formatter requires the \"ngx-translate\" Service to be provided as a Grid Options or Column Definition \"i18n\".\n    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }");
        }
        // make sure the value is a string (for example a boolean value would throw an error)
        if (value !== undefined && typeof value !== 'string') {
            value = value + '';
        }
        return value ? translate.instant(( /** @type {?} */(value.toUpperCase()))) : '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var uppercaseFormatter = function (row, cell, value, columnDef, dataContext) {
        // make sure the value is a string
        if (value !== undefined && typeof value !== 'string') {
            value = value + '';
        }
        return value ? value.toUpperCase() : '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var yesNoFormatter = function (row, cell, value, columnDef, dataContext) {
        return value ? 'Yes' : 'No';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Provides a list of different Formatters that will change the cell value displayed in the UI
     * @type {?}
     */
    var Formatters = {
        /**
         * Takes an array of complex objects converts it to a comma delimited string.
         * Requires to pass an array of "propertyNames" in the column definition the generic "params" property
         * For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition::
         * { params: { propertyNames: ['firtName'] }}
         */
        arrayObjectToCsv: arrayObjectToCsvFormatter,
        /**
         * Takes an array of string and converts it to a comma delimited string
         */
        arrayToCsv: arrayToCsvFormatter,
        /**
         * show value in bold font weight as well
         */
        bold: boldFormatter,
        /**
         * When value is filled (true), it will display a checkbox Unicode icon
         */
        checkbox: checkboxFormatter,
        /**
         * When value is filled (true), it will display a Font-Awesome icon (fa-check)
         */
        checkmark: checkmarkFormatter,
        /**
         * Takes a complex data object and return the data under that property (for example: "user.firstName" will return the first name "John")
         */
        complexObject: complexObjectFormatter,
        /**
         * Looks up values from the columnDefinition.params.collection property and displays the label in CSV or string format
         * \@example
         * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
         * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
         * const dataset = [{ value: 1 },{ value: 2 }];
         */
        collection: collectionFormatter,
        /**
         * Looks up values from the columnDefinition.editor.collection property and displays the label in CSV or string format
         * \@example
         * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
         * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
         * const dataset = [{ value: 1 },{ value: 2 }];
         */
        collectionEditor: collectionEditorFormatter,
        /**
         * Takes a Date object and displays it as an ISO Date format
         */
        dateIso: dateIsoFormatter,
        /**
         * Takes a Date object and displays it as an ISO Date+Time format
         */
        dateTimeIso: dateTimeIsoFormatter,
        /**
         * Takes a Date object and displays it as an ISO Date+Time (without seconds) format
         */
        dateTimeShortIso: dateTimeShortIsoFormatter,
        /**
         * Takes a Date object and displays it as an ISO Date+Time+(am/pm) format
         */
        dateTimeIsoAmPm: dateTimeIsoAmPmFormatter,
        /**
         * Takes a Date object and displays it as an US Date format
         */
        dateUs: dateUsFormatter,
        /**
         * Takes a Date object and displays it as an US Date+Time format
         */
        dateTimeUs: dateTimeUsFormatter,
        /**
         * Takes a Date object and displays it as an US Date+Time (without seconds) format
         */
        dateTimeShortUs: dateTimeShortUsFormatter,
        /**
         * Takes a Date object and displays it as an US Date+Time+(am/pm) format
         */
        dateTimeUsAmPm: dateTimeUsAmPmFormatter,
        /**
         * Displays a Font-Awesome delete icon (fa-trash)
         */
        deleteIcon: deleteIconFormatter,
        /**
         * Display the value as x decimals formatted, defaults to 2 decimals.
         * You can pass "decimalPlaces" or "minDecimalPlaces" and/or "maxDecimalPlaces" to the "params" property.
         * For example:: `{ formatter: Formatters.decimal, params: { decimalPlaces: 3 }}`
         * The property "decimalPlaces" is an alias of "minDecimalPlaces"
         */
        decimal: decimalFormatter,
        /**
         * Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value
         */
        dollar: dollarFormatter,
        /**
         * Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value
         */
        dollarColored: dollarColoredFormatter,
        /**
         * Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value, show it in bold font weight as well
         */
        dollarColoredBold: dollarColoredBoldFormatter,
        /**
         * Displays a Font-Awesome edit icon (fa-pencil)
         */
        editIcon: editIconFormatter,
        /**
         * Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https). The structure will be "<a href="hyperlink">hyperlink</a>"
         */
        hyperlink: hyperlinkFormatter,
        /**
         * Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"
         */
        hyperlinkUriPrefix: hyperlinkUriPrefixFormatter,
        /**
         * Displays a Font-Awesome edit icon (fa-info-circle)
         */
        infoIcon: infoIconFormatter,
        /**
         * Takes a value and displays it all lowercase
         */
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
        /**
         * Takes a cell value number (between 0.0-1.0) and displays a red (<50) or green (>=50) bar
         */
        percent: percentFormatter,
        /**
         * Takes a cell value number (between 0.0-100) and displays a red (<50) or green (>=50) bar
         */
        percentComplete: percentCompleteFormatter,
        /**
         * Takes a cell value number (between 0-100) and displays Bootstrap "percent-complete-bar" a red (<30), silver (>30 & <70) or green (>=70) bar
         */
        percentCompleteBar: percentCompleteBarFormatter,
        /**
         * Takes a cell value number (between 0-100) and add the "%" after the number
         */
        percentSymbol: percentSymbolFormatter,
        /**
         * Takes a cell value number (between 0-100) and displays Bootstrap "progress-bar" a red (<30), silver (>30 & <70) or green (>=70) bar
         */
        progressBar: progressBarFormatter,
        /**
         * Takes a cell value and translates it (i18n). Requires an instance of the Translate Service:: `i18n: this.translate
         */
        translate: translateFormatter,
        /**
         * Takes a boolean value, cast it to upperCase string and finally translates it (i18n).
         */
        translateBoolean: translateBooleanFormatter,
        /**
         * Takes a value and displays it all uppercase
         */
        uppercase: uppercaseFormatter,
        /**
         * Takes a boolean value and display a string 'Yes' or 'No'
         */
        yesNo: yesNoFormatter
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var avgTotalsPercentageFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.avg && totals.avg[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
        var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
        if (val != null) {
            return prefix + Math.round(val) + '%' + suffix;
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var avgTotalsDollarFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.avg && totals.avg[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
        var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
        if (val != null) {
            return prefix + '$' + decimalFormatted(val, 2, 4) + suffix;
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var avgTotalsFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.avg && totals.avg[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
        var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
        if (val != null) {
            return prefix + Math.round(val) + suffix;
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var minTotalsFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.min && totals.min[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
        var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
        if (val != null) {
            return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var maxTotalsFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.max && totals.max[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
        var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
        if (val != null) {
            return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var sumTotalsColoredFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.sum && totals.sum[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var sumTotalsDollarColoredBoldFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.sum && totals.sum[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var sumTotalsDollarColoredFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.sum && totals.sum[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var sumTotalsDollarBoldFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.sum && totals.sum[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
        var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
        if (val != null) {
            return "<span style=\"font-weight: bold;\">" + (prefix + '$' + decimalFormatted(val, 2, 4) + suffix) + "</span>";
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var sumTotalsDollarFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.sum && totals.sum[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
        var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
        if (val != null) {
            return prefix + '$' + decimalFormatted(val, 2, 2) + suffix;
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var sumTotalsFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.sum && totals.sum[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
        var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
        if (val != null) {
            return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var sumTotalsBoldFormatter = function (totals, columnDef, grid) {
        /** @type {?} */
        var field = columnDef.field || '';
        /** @type {?} */
        var val = totals.sum && totals.sum[field];
        /** @type {?} */
        var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
        /** @type {?} */
        var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
        if (val != null) {
            return "<span style=\"font-weight: bold;\">" + (prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix);
        }
        return '';
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Provides a list of different Formatters that will change the cell value displayed in the UI
     * @type {?}
     */
    var GroupTotalFormatters = {
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SlickPaginationComponent = /** @class */ (function () {
        /** Constructor */
        function SlickPaginationComponent(filterService) {
            this.filterService = filterService;
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
            get: /**
             * @return {?}
             */ function () {
                return this._gridPaginationOptions;
            },
            set: /**
             * @param {?} gridPaginationOptions
             * @return {?}
             */ function (gridPaginationOptions) {
                this._gridPaginationOptions = gridPaginationOptions;
                if (this._isFirstRender || !gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
                    this.refreshPagination();
                    this._isFirstRender = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        SlickPaginationComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.dispose();
            };
        /**
         * @return {?}
         */
        SlickPaginationComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this._gridPaginationOptions = this._gridPaginationOptions;
                if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
                    this.refreshPagination();
                }
                // Subscribe to Event Emitter of Filter & Sort changed, go back to page 1 when that happen
                this._filterSubcription = this.filterService.onFilterChanged.subscribe(function (data) {
                    _this.refreshPagination(true);
                });
                // Subscribe to Filter clear and go back to page 1 when that happen
                this._filterSubcription = this.filterService.onFilterCleared.subscribe(function (data) {
                    _this.refreshPagination(true);
                });
            };
        /**
         * @param {?} number
         * @return {?}
         */
        SlickPaginationComponent.prototype.ceil = /**
         * @param {?} number
         * @return {?}
         */
            function (number) {
                return Math.ceil(number);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SlickPaginationComponent.prototype.changeToFirstPage = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.pageNumber = 1;
                this.onPageChanged(event, this.pageNumber);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SlickPaginationComponent.prototype.changeToLastPage = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.pageNumber = this.pageCount;
                this.onPageChanged(event, this.pageNumber);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SlickPaginationComponent.prototype.changeToNextPage = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.pageNumber < this.pageCount) {
                    this.pageNumber++;
                    this.onPageChanged(event, this.pageNumber);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SlickPaginationComponent.prototype.changeToPreviousPage = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.pageNumber > 0) {
                    this.pageNumber--;
                    this.onPageChanged(event, this.pageNumber);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SlickPaginationComponent.prototype.changeToCurrentPage = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.pageNumber = +event.currentTarget.value;
                if (this.pageNumber < 1) {
                    this.pageNumber = 1;
                }
                else if (this.pageNumber > this.pageCount) {
                    this.pageNumber = this.pageCount;
                }
                this.onPageChanged(event, this.pageNumber);
            };
        /**
         * @return {?}
         */
        SlickPaginationComponent.prototype.dispose = /**
         * @return {?}
         */
            function () {
                this.onPaginationChanged.unsubscribe();
                if (this._filterSubcription) {
                    this._filterSubcription.unsubscribe();
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        SlickPaginationComponent.prototype.onChangeItemPerPage = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var itemsPerPage = +event.target.value;
                this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
                this.pageNumber = (this.totalItems > 0) ? 1 : 0;
                this.itemsPerPage = itemsPerPage;
                this.onPageChanged(event, this.pageNumber);
            };
        /**
         * @param {?=} isPageNumberReset
         * @return {?}
         */
        SlickPaginationComponent.prototype.refreshPagination = /**
         * @param {?=} isPageNumberReset
         * @return {?}
         */
            function (isPageNumberReset) {
                if (isPageNumberReset === void 0) {
                    isPageNumberReset = false;
                }
                /** @type {?} */
                var backendApi = this._gridPaginationOptions.backendServiceApi;
                if (!backendApi || !backendApi.service || !backendApi.process) {
                    throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
                }
                if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
                    /** @type {?} */
                    var pagination = this._gridPaginationOptions.pagination;
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
            };
        /**
         * @param {?} event
         * @param {?} pageNumber
         * @return {?}
         */
        SlickPaginationComponent.prototype.onPageChanged = /**
         * @param {?} event
         * @param {?} pageNumber
         * @return {?}
         */
            function (event, pageNumber) {
                return __awaiter(this, void 0, void 0, function () {
                    var backendApi, itemsPerPage, startTime, query, observableOrPromise, processResult, endTime, e_1;
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
                                if (!backendApi)
                                    return [3 /*break*/, 5];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                itemsPerPage = +this.itemsPerPage;
                                // keep start time & end timestamps & return it after process execution
                                startTime = new Date();
                                if (backendApi.preProcess) {
                                    backendApi.preProcess();
                                }
                                query = backendApi.service.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                                // the process could be an Observable (like HttpClient) or a Promise
                                // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                                observableOrPromise = backendApi.process(query);
                                return [4 /*yield*/, castToPromise(observableOrPromise)];
                            case 2:
                                processResult = _a.sent();
                                endTime = new Date();
                                // from the result, call our internal post process to update the Dataset and Pagination info
                                if (processResult && backendApi.internalPostProcess) {
                                    backendApi.internalPostProcess(processResult);
                                }
                                // send the response process to the postProcess callback
                                if (backendApi.postProcess) {
                                    if (processResult instanceof Object) {
                                        processResult.statistics = {
                                            startTime: startTime,
                                            endTime: endTime,
                                            executionTime: endTime.valueOf() - startTime.valueOf(),
                                            itemCount: this.totalItems,
                                            totalItemCount: this.totalItems
                                        };
                                    }
                                    backendApi.postProcess(processResult);
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                if (backendApi && backendApi.onError) {
                                    backendApi.onError(e_1);
                                }
                                else {
                                    throw e_1;
                                }
                                return [3 /*break*/, 4];
                            case 4: return [3 /*break*/, 6];
                            case 5: throw new Error('Pagination with a backend service requires "BackendServiceApi" to be defined in your grid options');
                            case 6:
                                // emit the changes to the parent component
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
        /**
         * @return {?}
         */
        SlickPaginationComponent.prototype.recalculateFromToIndexes = /**
         * @return {?}
         */
            function () {
                if (this.totalItems === 0) {
                    this.dataFrom = 0;
                    this.dataTo = 0;
                    this.pageNumber = 0;
                }
                else {
                    this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
                    this.dataTo = (this.totalItems < this.itemsPerPage) ? this.totalItems : (this.pageNumber * this.itemsPerPage);
                }
            };
        SlickPaginationComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'slick-pagination',
                        template: "<div class=\"slick-pagination\">\n    <div class=\"slick-pagination-nav\">\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-first fa fa-angle-double-left\" aria-label=\"First\" (click)=\"changeToFirstPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-prev fa fa-angle-left\" aria-label=\"Previous\" (click)=\"changeToPreviousPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n\n        <div class=\"slick-page-number\">\n            <span [translate]=\"'PAGE'\"></span>\n            <input type=\"text\" class=\"form-control\" [value]=\"pageNumber\" size=\"1\" [readOnly]=\"totalItems === 0\" (change)=\"changeToCurrentPage($event)\">\n            <span [translate]=\"'OF'\"></span><span> {{pageCount}}</span>\n        </div>\n\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-next text-center fa fa-lg fa-angle-right\" aria-label=\"Next\" (click)=\"changeToNextPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-end fa fa-lg fa-angle-double-right\" aria-label=\"Last\" (click)=\"changeToLastPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n    </div>\n    <span class=\"slick-pagination-settings\">\n        <select id=\"items-per-page-label\" [value]=\"itemsPerPage\" (change)=\"onChangeItemPerPage($event)\">\n        <option value=\"{{pageSize}}\" *ngFor=\"let pageSize of paginationPageSizes;\">{{pageSize}}</option>\n        </select>\n        <span [translate]=\"'ITEMS_PER_PAGE'\"></span>,\n        <span class=\"slick-pagination-count\">\n            <span [translate]=\"'FROM_TO_OF_TOTAL_ITEMS'\" [translateParams]=\"{ from: dataFrom, to: dataTo, totalItems: totalItems }\"></span>\n        </span>\n    </span>\n    </div>\n"
                    }] },
            { type: core.Injectable }
        ];
        /** @nocollapse */
        SlickPaginationComponent.ctorParameters = function () {
            return [
                { type: FilterService }
            ];
        };
        SlickPaginationComponent.propDecorators = {
            onPaginationChanged: [{ type: core.Output }],
            gridPaginationOptions: [{ type: core.Input }],
            grid: [{ type: core.Input }]
        };
        return SlickPaginationComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var slickgridEventPrefix = 'sg';
    var AngularSlickgridComponent = /** @class */ (function () {
        function AngularSlickgridComponent(elm, exportService, extensionService, extensionUtility, filterService, gridService, gridEventService, gridStateService, groupingAndColspanService, resizer, sharedService, sortService, translate, forRootConfig) {
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
            this.onAngularGridCreated = new core.EventEmitter();
            this.onDataviewCreated = new core.EventEmitter();
            this.onGridCreated = new core.EventEmitter();
            this.onGridInitialized = new core.EventEmitter();
            this.onBeforeGridCreate = new core.EventEmitter();
            this.onBeforeGridDestroy = new core.EventEmitter();
            this.onAfterGridDestroyed = new core.EventEmitter();
            this.onGridStateChanged = new core.EventEmitter();
        }
        Object.defineProperty(AngularSlickgridComponent.prototype, "gridHeight", {
            set: /**
             * @param {?} height
             * @return {?}
             */ function (height) {
                this._fixedHeight = height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularSlickgridComponent.prototype, "gridWidth", {
            set: /**
             * @param {?} width
             * @return {?}
             */ function (width) {
                this._fixedWidth = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularSlickgridComponent.prototype, "columnDefinitions", {
            get: /**
             * @return {?}
             */ function () {
                return this._columnDefinitions;
            },
            set: /**
             * @param {?} columnDefinitions
             * @return {?}
             */ function (columnDefinitions) {
                this._columnDefinitions = columnDefinitions;
                if (this.isGridInitialized) {
                    this.updateColumnDefinitionsList(columnDefinitions);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularSlickgridComponent.prototype, "dataset", {
            get: /**
             * @return {?}
             */ function () {
                return this._dataView.getItems();
            },
            set: /**
             * @param {?} dataset
             * @return {?}
             */ function (dataset) {
                this._dataset = dataset;
                this.refreshGridData(dataset);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AngularSlickgridComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.onBeforeGridCreate.emit(true);
                if (this.gridOptions && !this.gridOptions.enableAutoResize && !this.gridOptions.autoResize) {
                    this.gridHeightString = this._fixedHeight + "px";
                    this.gridWidthString = this._fixedWidth + "px";
                }
            };
        /**
         * @return {?}
         */
        AngularSlickgridComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.onBeforeGridDestroy.emit(this.grid);
                this.destroy();
                this.onAfterGridDestroyed.emit(true);
            };
        /**
         * @param {?=} emptyDomElementContainer
         * @return {?}
         */
        AngularSlickgridComponent.prototype.destroy = /**
         * @param {?=} emptyDomElementContainer
         * @return {?}
         */
            function (emptyDomElementContainer) {
                if (emptyDomElementContainer === void 0) {
                    emptyDomElementContainer = false;
                }
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
            };
        /**
         * @return {?}
         */
        AngularSlickgridComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.initialization();
                this.isGridInitialized = true;
            };
        /**
         * @return {?}
         */
        AngularSlickgridComponent.prototype.initialization = /**
         * @return {?}
         */
            function () {
                var _this = this;
                // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
                this._dataset = this._dataset || [];
                this.gridOptions = this.mergeGridOptions(this.gridOptions);
                this.createBackendApiInternalPostProcessCallback(this.gridOptions);
                if (!this.customDataView) {
                    if (this.gridOptions.draggableGrouping || this.gridOptions.enableGrouping) {
                        this.extensionUtility.loadExtensionDynamically(ExtensionName.groupItemMetaProvider);
                        this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
                        this.sharedService.groupItemMetadataProvider = this.groupItemMetadataProvider;
                        this._dataView = new Slick.Data.DataView({ groupItemMetadataProvider: this.groupItemMetadataProvider });
                    }
                    else {
                        this._dataView = new Slick.Data.DataView();
                    }
                }
                // for convenience, we provide the property "editor" as an Angular-Slickgrid editor complex object
                // however "editor" is used internally by SlickGrid for it's own Editor Factory
                // so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
                // then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
                this._columnDefinitions = this._columnDefinitions.map(function (column) {
                    // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
                    if (column.editor && column.editor.collectionAsync) {
                        _this.loadEditorCollectionAsync(column);
                    }
                    return __assign({}, column, { editor: column.editor && column.editor.model, internalColumnEditor: __assign({}, column.editor) });
                });
                // save reference for all columns before they optionally become hidden/visible
                this.sharedService.allColumns = this._columnDefinitions;
                this.sharedService.visibleColumns = this._columnDefinitions;
                this.extensionService.createExtensionsBeforeGridCreation(this._columnDefinitions, this.gridOptions);
                // build SlickGrid Grid, also user might optionally pass a custom dataview (e.g. remote model)
                this.grid = new Slick.Grid("#" + this.gridId, this.customDataView || this._dataView, this._columnDefinitions, this.gridOptions);
                this.sharedService.dataView = this._dataView;
                this.sharedService.grid = this.grid;
                this.extensionService.attachDifferentExtensions();
                this.attachDifferentHooks(this.grid, this.gridOptions, this._dataView);
                // emit the Grid & DataView object to make them available in parent component
                this.onGridCreated.emit(this.grid);
                // initialize the SlickGrid grid
                this.grid.init();
                if (!this.customDataView && (this._dataView && this._dataView.beginUpdate && this._dataView.setItems && this._dataView.endUpdate)) {
                    this.onDataviewCreated.emit(this._dataView);
                    this._dataView.beginUpdate();
                    this._dataView.setItems(this._dataset, this.gridOptions.datasetIdPropertyName);
                    this._dataView.endUpdate();
                }
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
                if (this.gridOptions.createPreHeaderPanel && !this.gridOptions.enableDraggableGrouping) {
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
                    /**
                     * @deprecated please use "extensionService" instead
                     */
                    pluginService: this.extensionService,
                    resizerService: this.resizer,
                    sortService: this.sortService,
                });
            };
        /**
         * Commits the current edit to the grid
         */
        /**
         * Commits the current edit to the grid
         * @param {?} target
         * @return {?}
         */
        AngularSlickgridComponent.prototype.commitEdit = /**
         * Commits the current edit to the grid
         * @param {?} target
         * @return {?}
         */
            function (target) {
                var _this = this;
                if (this.grid.getOptions().autoCommitEdit) {
                    /** @type {?} */
                    var activeNode_1 = this.grid.getActiveCellNode();
                    // a timeout must be set or this could come into conflict when slickgrid
                    // tries to commit the edit when going from one editor to another on the grid
                    // through the click event. If the timeout was not here it would
                    // try to commit/destroy the twice, which would throw a jquery
                    // error about the element not being in the DOM
                    setTimeout(function () {
                        // make sure the target is the active editor so we do not
                        // commit prematurely
                        if (activeNode_1 && activeNode_1.contains(target) && _this.grid.getEditorLock().isActive()) {
                            _this.grid.getEditorLock().commitCurrentEdit();
                        }
                    });
                }
            };
        /**
         * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
         * For now, this is GraphQL Service only feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
         */
        /**
         * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
         * For now, this is GraphQL Service only feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
         * @param {?} gridOptions
         * @return {?}
         */
        AngularSlickgridComponent.prototype.createBackendApiInternalPostProcessCallback = /**
         * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
         * For now, this is GraphQL Service only feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
         * @param {?} gridOptions
         * @return {?}
         */
            function (gridOptions) {
                var _this = this;
                if (gridOptions && gridOptions.backendServiceApi) {
                    /** @type {?} */
                    var backendApi_1 = gridOptions.backendServiceApi;
                    // internalPostProcess only works with a GraphQL Service, so make sure it is that type
                    if (backendApi_1 && backendApi_1.service && backendApi_1.service instanceof GraphqlService) {
                        backendApi_1.internalPostProcess = function (processResult) {
                            /** @type {?} */
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
        /**
         * @param {?} grid
         * @param {?} gridOptions
         * @param {?} dataView
         * @return {?}
         */
        AngularSlickgridComponent.prototype.attachDifferentHooks = /**
         * @param {?} grid
         * @param {?} gridOptions
         * @param {?} dataView
         * @return {?}
         */
            function (grid, gridOptions, dataView) {
                var _this = this;
                // on locale change, we have to manually translate the Headers, GridMenu
                this.subscriptions.push(this.translate.onLangChange.subscribe(function (event) {
                    if (gridOptions.enableTranslate) {
                        _this.extensionService.translateColumnHeaders();
                        _this.extensionService.translateColumnPicker();
                        _this.extensionService.translateGridMenu();
                        _this.extensionService.translateHeaderMenu();
                    }
                }));
                // if user entered some Columns "presets", we need to reflect them all in the grid
                if (gridOptions.presets && Array.isArray(gridOptions.presets.columns) && gridOptions.presets.columns.length > 0) {
                    /** @type {?} */
                    var gridColumns = this.gridStateService.getAssociatedGridColumns(grid, gridOptions.presets.columns);
                    if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
                        // make sure that the checkbox selector is also visible if it is enabled
                        if (gridOptions.enableCheckboxSelector) {
                            /** @type {?} */
                            var checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
                            if (checkboxColumn && checkboxColumn.id === '_checkbox_selector' && gridColumns[0].id !== '_checkbox_selector') {
                                gridColumns.unshift(checkboxColumn);
                            }
                        }
                        // finally set the new presets columns (including checkbox selector if need be)
                        grid.setColumns(gridColumns);
                    }
                }
                // attach external sorting (backend) when available or default onSort (dataView)
                if (gridOptions.enableSorting && !this.customDataView) {
                    gridOptions.backendServiceApi ? this.sortService.attachBackendOnSort(grid, dataView) : this.sortService.attachLocalOnSort(grid, dataView);
                }
                // attach external filter (backend) when available or default onFilter (dataView)
                if (gridOptions.enableFiltering && !this.customDataView) {
                    this.filterService.init(grid);
                    // if user entered some "presets", we need to reflect them all in the DOM
                    if (gridOptions.presets && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                        this.filterService.populateColumnFilterSearchTerms();
                    }
                    gridOptions.backendServiceApi ? this.filterService.attachBackendOnFilter(grid) : this.filterService.attachLocalOnFilter(grid, this._dataView);
                }
                // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
                if (gridOptions.backendServiceApi) {
                    /** @type {?} */
                    var backendApi = gridOptions.backendServiceApi;
                    if (backendApi && backendApi.service && backendApi.service.init) {
                        backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
                    }
                }
                var _loop_1 = function (prop) {
                    if (grid.hasOwnProperty(prop) && prop.startsWith('on')) {
                        this_1._eventHandler.subscribe(grid[prop], function (e, args) {
                            return _this.dispatchCustomEvent("" + slickgridEventPrefix + titleCase(prop), { eventData: e, args: args });
                        });
                    }
                };
                var this_1 = this;
                // expose all Slick Grid Events through dispatch
                for (var prop in grid) {
                    _loop_1(prop);
                }
                var _loop_2 = function (prop) {
                    if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
                        this_2._eventHandler.subscribe(dataView[prop], function (e, args) {
                            return _this.dispatchCustomEvent("" + slickgridEventPrefix + titleCase(prop), { eventData: e, args: args });
                        });
                    }
                };
                var this_2 = this;
                // expose all Slick DataView Events through dispatch
                for (var prop in dataView) {
                    _loop_2(prop);
                }
                // expose GridState Service changes event through dispatch
                this.subscriptions.push(this.gridStateService.onGridStateChanged.subscribe(function (gridStateChange) {
                    _this.onGridStateChanged.emit(gridStateChange);
                }));
                // on cell click, mainly used with the columnDef.action callback
                this.gridEventService.attachOnCellChange(grid, dataView);
                this.gridEventService.attachOnClick(grid, dataView);
                if (dataView && grid) {
                    this._eventHandler.subscribe(dataView.onRowCountChanged, function (e, args) {
                        grid.updateRowCount();
                        grid.render();
                    });
                    this._eventHandler.subscribe(dataView.onRowsChanged, function (e, args) {
                        grid.invalidateRows(args.rows);
                        grid.render();
                    });
                }
                // does the user have a colspan callback?
                if (gridOptions.colspanCallback) {
                    this._dataView.getItemMetadata = function (rowNumber) {
                        /** @type {?} */
                        var item = _this._dataView.getItem(rowNumber);
                        return gridOptions.colspanCallback(item);
                    };
                }
            };
        /**
         * @param {?} gridOptions
         * @return {?}
         */
        AngularSlickgridComponent.prototype.attachBackendCallbackFunctions = /**
         * @param {?} gridOptions
         * @return {?}
         */
            function (gridOptions) {
                var _this = this;
                /** @type {?} */
                var backendApi = gridOptions.backendServiceApi;
                /** @type {?} */
                var serviceOptions = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
                /** @type {?} */
                var isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
                // update backend filters (if need be) before the query runs
                if (backendApi) {
                    /** @type {?} */
                    var backendService = backendApi.service;
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
                        /** @type {?} */
                        var columnFilters = this.filterService.getColumnFilters();
                        if (columnFilters && backendService && backendService.updateFilters) {
                            backendService.updateFilters(columnFilters, false);
                        }
                    }
                }
                if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
                    /** @type {?} */
                    var query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
                    /** @type {?} */
                    var observableOrPromise_1 = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);
                    // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
                    setTimeout(function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            var startTime, processResult, endTime, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        // keep start time & end timestamps & return it after process execution
                                        startTime = new Date();
                                        if (backendApi.preProcess) {
                                            backendApi.preProcess();
                                        }
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        // the process could be an Observable (like HttpClient) or a Promise
                                        // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                                        return [4 /*yield*/, castToPromise(observableOrPromise_1)];
                                    case 2:
                                        processResult = _a.sent();
                                        endTime = new Date();
                                        // define what our internal Post Process callback, only available for GraphQL Service for now
                                        // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
                                        if (processResult && backendApi && backendApi.service instanceof GraphqlService && backendApi.internalPostProcess) {
                                            backendApi.internalPostProcess(processResult);
                                        }
                                        // send the response process to the postProcess callback
                                        if (backendApi.postProcess) {
                                            if (processResult instanceof Object) {
                                                processResult.statistics = {
                                                    startTime: startTime,
                                                    endTime: endTime,
                                                    executionTime: endTime.valueOf() - startTime.valueOf(),
                                                    totalItemCount: this.gridOptions && this.gridOptions.pagination && this.gridOptions.pagination.totalItems
                                                };
                                            }
                                            backendApi.postProcess(processResult);
                                        }
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_1 = _a.sent();
                                        if (backendApi && backendApi.onError) {
                                            backendApi.onError(e_1);
                                        }
                                        else {
                                            throw e_1;
                                        }
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    });
                }
            };
        /**
         * @param {?} grid
         * @param {?} options
         * @return {?}
         */
        AngularSlickgridComponent.prototype.attachResizeHook = /**
         * @param {?} grid
         * @param {?} options
         * @return {?}
         */
            function (grid, options) {
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
            };
        /**
         * @param {?} grid
         * @param {?} gridOptions
         * @param {?} dataView
         * @return {?}
         */
        AngularSlickgridComponent.prototype.executeAfterDataviewCreated = /**
         * @param {?} grid
         * @param {?} gridOptions
         * @param {?} dataView
         * @return {?}
         */
            function (grid, gridOptions, dataView) {
                // if user entered some Sort "presets", we need to reflect them all in the DOM
                if (gridOptions.enableSorting) {
                    if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                        this.sortService.loadLocalPresets(grid, dataView);
                    }
                }
            };
        /**
         * @param {?} gridOptions
         * @return {?}
         */
        AngularSlickgridComponent.prototype.mergeGridOptions = /**
         * @param {?} gridOptions
         * @return {?}
         */
            function (gridOptions) {
                gridOptions.gridId = this.gridId;
                gridOptions.gridContainerId = "slickGridContainer-" + this.gridId;
                // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
                /** @type {?} */
                var options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);
                // also make sure to show the header row if user have enabled filtering
                this._hideHeaderRowAfterPageLoad = (options.showHeaderRow === false);
                if (options.enableFiltering && !options.showHeaderRow) {
                    options.showHeaderRow = options.enableFiltering;
                }
                return options;
            };
        /**
         * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
         * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
         */
        /**
         * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
         * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
         * @param {?} pagination
         * @return {?}
         */
        AngularSlickgridComponent.prototype.paginationChanged = /**
         * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
         * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
         * @param {?} pagination
         * @return {?}
         */
            function (pagination) {
                if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
                    this.gridService.setSelectedRows([]);
                }
                this.gridStateService.onGridStateChanged.next({
                    change: { newValues: pagination, type: GridStateType.pagination },
                    gridState: this.gridStateService.getCurrentGridState()
                });
            };
        /**
         * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
         * @param dataset
         */
        /**
         * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
         * @param {?} dataset
         * @param {?=} totalCount
         * @return {?}
         */
        AngularSlickgridComponent.prototype.refreshGridData = /**
         * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
         * @param {?} dataset
         * @param {?=} totalCount
         * @return {?}
         */
            function (dataset, totalCount) {
                if (Array.isArray(dataset) && this.grid && this._dataView && typeof this._dataView.setItems === 'function') {
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
                        if (this.gridOptions.pagination && totalCount !== undefined) {
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
                        /** @type {?} */
                        var delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
                        this.resizer.resizeGrid(delay || 10);
                    }
                }
            };
        /**
         * Dynamically change or update the column definitions list.
         * We will re-render the grid so that the new header and data shows up correctly.
         * If using i18n, we also need to trigger a re-translate of the column headers
         */
        /**
         * Dynamically change or update the column definitions list.
         * We will re-render the grid so that the new header and data shows up correctly.
         * If using i18n, we also need to trigger a re-translate of the column headers
         * @param {?} newColumnDefinitions
         * @return {?}
         */
        AngularSlickgridComponent.prototype.updateColumnDefinitionsList = /**
         * Dynamically change or update the column definitions list.
         * We will re-render the grid so that the new header and data shows up correctly.
         * If using i18n, we also need to trigger a re-translate of the column headers
         * @param {?} newColumnDefinitions
         * @return {?}
         */
            function (newColumnDefinitions) {
                if (this.gridOptions.enableTranslate) {
                    this.extensionService.translateColumnHeaders(false, newColumnDefinitions);
                }
                else {
                    this.extensionService.renderColumnHeaders(newColumnDefinitions);
                }
                if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
                    this.grid.autosizeColumns();
                }
            };
        /** Toggle the filter row displayed on first row
         * @param isShowing
         */
        /**
         * Toggle the filter row displayed on first row
         * @param {?} isShowing
         * @return {?}
         */
        AngularSlickgridComponent.prototype.showHeaderRow = /**
         * Toggle the filter row displayed on first row
         * @param {?} isShowing
         * @return {?}
         */
            function (isShowing) {
                this.grid.setHeaderRowVisibility(isShowing);
                return isShowing;
            };
        /** Toggle the filter row displayed on first row */
        /**
         * Toggle the filter row displayed on first row
         * @return {?}
         */
        AngularSlickgridComponent.prototype.toggleHeaderRow = /**
         * Toggle the filter row displayed on first row
         * @return {?}
         */
            function () {
                /** @type {?} */
                var isShowing = !this.grid.getOptions().showHeaderRow;
                this.grid.setHeaderRowVisibility(isShowing);
                return isShowing;
            };
        //
        // private functions
        // ------------------
        /** Dispatch of Custom Event, which by default will bubble & is cancelable */
        //
        // private functions
        // ------------------
        /**
         * Dispatch of Custom Event, which by default will bubble & is cancelable
         * @private
         * @param {?} eventName
         * @param {?=} data
         * @param {?=} isBubbling
         * @param {?=} isCancelable
         * @return {?}
         */
        AngularSlickgridComponent.prototype.dispatchCustomEvent =
            //
            // private functions
            // ------------------
            /**
             * Dispatch of Custom Event, which by default will bubble & is cancelable
             * @private
             * @param {?} eventName
             * @param {?=} data
             * @param {?=} isBubbling
             * @param {?=} isCancelable
             * @return {?}
             */
            function (eventName, data, isBubbling, isCancelable) {
                if (isBubbling === void 0) {
                    isBubbling = true;
                }
                if (isCancelable === void 0) {
                    isCancelable = true;
                }
                /** @type {?} */
                var eventInit = { bubbles: isBubbling, cancelable: isCancelable };
                if (data) {
                    eventInit.detail = data;
                }
                return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
            };
        /** Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves */
        /**
         * Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves
         * @private
         * @param {?} column
         * @return {?}
         */
        AngularSlickgridComponent.prototype.loadEditorCollectionAsync = /**
         * Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves
         * @private
         * @param {?} column
         * @return {?}
         */
            function (column) {
                var _this = this;
                /** @type {?} */
                var collectionAsync = column && column.editor && column.editor.collectionAsync;
                if (collectionAsync instanceof rxjs.Observable) {
                    this.subscriptions.push(collectionAsync.subscribe(function (resolvedCollection) { return _this.updateEditorCollection(column, resolvedCollection); }));
                }
            };
        /**
         * Update the Editor "collection" property from an async call resolved
         * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
         * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
         */
        /**
         * Update the Editor "collection" property from an async call resolved
         * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
         * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
         * @private
         * @param {?} column
         * @param {?} newCollection
         * @return {?}
         */
        AngularSlickgridComponent.prototype.updateEditorCollection = /**
         * Update the Editor "collection" property from an async call resolved
         * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
         * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
         * @private
         * @param {?} column
         * @param {?} newCollection
         * @return {?}
         */
            function (column, newCollection) {
                column.editor.collection = newCollection;
                // find the new column reference pointer
                /** @type {?} */
                var columns = this.grid.getColumns();
                if (Array.isArray(columns)) {
                    /** @type {?} */
                    var columnRef = columns.find(function (col) { return col.id === column.id; });
                    columnRef.internalColumnEditor = column.editor;
                }
            };
        AngularSlickgridComponent.decorators = [
            { type: core.Injectable },
            { type: core.Component, args: [{
                        selector: 'angular-slickgrid',
                        template: "<div id=\"slickGridContainer-{{gridId}}\" class=\"gridPane\" [style.width]=\"gridWidthString\">\r\n    <div attr.id='{{gridId}}' class=\"slickgrid-container\" style=\"width: 100%\" [style.height]=\"gridHeightString\">\r\n    </div>\r\n\r\n    <slick-pagination id=\"slickPagingContainer-{{gridId}}\"\r\n        *ngIf=\"showPagination\"\r\n        (onPaginationChanged)=\"paginationChanged($event)\"\r\n        [gridPaginationOptions]=\"gridPaginationOptions\">\r\n    </slick-pagination>\r\n</div>\r\n",
                        providers: [
                            // make everything transient (non-singleton)
                            AutoTooltipExtension,
                            CellExternalCopyManagerExtension,
                            CheckboxSelectorExtension,
                            ColumnPickerExtension,
                            DraggableGroupingExtension,
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
                    }] }
        ];
        /** @nocollapse */
        AngularSlickgridComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: ExportService },
                { type: ExtensionService },
                { type: ExtensionUtility },
                { type: FilterService },
                { type: GridService },
                { type: GridEventService },
                { type: GridStateService },
                { type: GroupingAndColspanService },
                { type: ResizerService },
                { type: SharedService },
                { type: SortService },
                { type: core$1.TranslateService },
                { type: undefined, decorators: [{ type: core.Inject, args: ['config',] }] }
            ];
        };
        AngularSlickgridComponent.propDecorators = {
            onAngularGridCreated: [{ type: core.Output }],
            onDataviewCreated: [{ type: core.Output }],
            onGridCreated: [{ type: core.Output }],
            onGridInitialized: [{ type: core.Output }],
            onBeforeGridCreate: [{ type: core.Output }],
            onBeforeGridDestroy: [{ type: core.Output }],
            onAfterGridDestroyed: [{ type: core.Output }],
            onGridStateChanged: [{ type: core.Output }],
            customDataView: [{ type: core.Input }],
            gridId: [{ type: core.Input }],
            gridOptions: [{ type: core.Input }],
            gridHeight: [{ type: core.Input }],
            gridWidth: [{ type: core.Input }],
            columnDefinitions: [{ type: core.Input }],
            dataset: [{ type: core.Input }]
        };
        return AngularSlickgridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AngularSlickgridModule = /** @class */ (function () {
        function AngularSlickgridModule() {
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        AngularSlickgridModule.forRoot = /**
         * @param {?=} config
         * @return {?}
         */
            function (config) {
                if (config === void 0) {
                    config = {};
                }
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
            };
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
                    },] }
        ];
        return AngularSlickgridModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.SlickgridConfig = SlickgridConfig;
    exports.SlickPaginationComponent = SlickPaginationComponent;
    exports.AngularSlickgridComponent = AngularSlickgridComponent;
    exports.AngularSlickgridModule = AngularSlickgridModule;
    exports.CaseType = CaseType;
    exports.DelimiterType = DelimiterType;
    exports.ExtensionName = ExtensionName;
    exports.FieldType = FieldType;
    exports.FileType = FileType;
    exports.FilterMultiplePassType = FilterMultiplePassType;
    exports.GridStateType = GridStateType;
    exports.KeyCode = KeyCode;
    exports.OperatorType = OperatorType;
    exports.SortDirection = SortDirection;
    exports.SortDirectionNumber = SortDirectionNumber;
    exports.CollectionService = CollectionService;
    exports.ExportService = ExportService;
    exports.ExtensionService = ExtensionService;
    exports.FilterService = FilterService;
    exports.GraphqlService = GraphqlService;
    exports.GridOdataService = GridOdataService;
    exports.GridEventService = GridEventService;
    exports.GridService = GridService;
    exports.GridStateService = GridStateService;
    exports.GroupingAndColspanService = GroupingAndColspanService;
    exports.OdataService = OdataService;
    exports.ResizerService = ResizerService;
    exports.SharedService = SharedService;
    exports.SortService = SortService;
    exports.addWhiteSpaces = addWhiteSpaces;
    exports.htmlEncode = htmlEncode;
    exports.htmlDecode = htmlDecode;
    exports.htmlEntityDecode = htmlEntityDecode;
    exports.htmlEntityEncode = htmlEntityEncode;
    exports.arraysEqual = arraysEqual;
    exports.castToPromise = castToPromise;
    exports.findOrDefault = findOrDefault;
    exports.decimalFormatted = decimalFormatted;
    exports.getDescendantProperty = getDescendantProperty;
    exports.getScrollBarWidth = getScrollBarWidth;
    exports.mapMomentDateFormatWithFieldType = mapMomentDateFormatWithFieldType;
    exports.mapFlatpickrDateFormatWithFieldType = mapFlatpickrDateFormatWithFieldType;
    exports.mapOperatorType = mapOperatorType;
    exports.mapOperatorByFieldType = mapOperatorByFieldType;
    exports.parseUtcDate = parseUtcDate;
    exports.sanitizeHtmlToText = sanitizeHtmlToText;
    exports.titleCase = titleCase;
    exports.toCamelCase = toCamelCase;
    exports.toKebabCase = toKebabCase;
    exports.uniqueArray = uniqueArray;
    exports.unsubscribeAllObservables = unsubscribeAllObservables;
    exports.Aggregators = Aggregators;
    exports.Editors = Editors;
    exports.AutoTooltipExtension = AutoTooltipExtension;
    exports.CellExternalCopyManagerExtension = CellExternalCopyManagerExtension;
    exports.CheckboxSelectorExtension = CheckboxSelectorExtension;
    exports.ColumnPickerExtension = ColumnPickerExtension;
    exports.DraggableGroupingExtension = DraggableGroupingExtension;
    exports.ExtensionUtility = ExtensionUtility;
    exports.GridMenuExtension = GridMenuExtension;
    exports.GroupItemMetaProviderExtension = GroupItemMetaProviderExtension;
    exports.HeaderButtonExtension = HeaderButtonExtension;
    exports.HeaderMenuExtension = HeaderMenuExtension;
    exports.RowMoveManagerExtension = RowMoveManagerExtension;
    exports.RowSelectionExtension = RowSelectionExtension;
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
    exports.ɵk = SelectEditor;
    exports.ɵl = SingleSelectEditor;
    exports.ɵm = SliderEditor;
    exports.ɵn = TextEditor;
    exports.ɵp = booleanFilterCondition;
    exports.ɵq = collectionSearchFilterCondition;
    exports.ɵr = dateFilterCondition;
    exports.ɵs = dateIsoFilterCondition;
    exports.ɵu = dateUsFilterCondition;
    exports.ɵv = dateUsShortFilterCondition;
    exports.ɵt = dateUtcFilterCondition;
    exports.ɵo = executeMappedCondition;
    exports.ɵy = testFilterCondition;
    exports.ɵw = numberFilterCondition;
    exports.ɵx = stringFilterCondition;
    exports.ɵz = CompoundDateFilter;
    exports.ɵba = CompoundInputFilter;
    exports.ɵbb = CompoundInputNumberFilter;
    exports.ɵbc = CompoundInputPasswordFilter;
    exports.ɵbd = CompoundSliderFilter;
    exports.ɵbe = InputFilter;
    exports.ɵbf = InputNumberFilter;
    exports.ɵbg = InputPasswordFilter;
    exports.ɵbh = MultipleSelectFilter;
    exports.ɵbj = NativeSelectFilter;
    exports.ɵbi = SelectFilter;
    exports.ɵbk = SingleSelectFilter;
    exports.ɵbl = SliderFilter;
    exports.ɵbm = arrayObjectToCsvFormatter;
    exports.ɵbn = arrayToCsvFormatter;
    exports.ɵbo = boldFormatter;
    exports.ɵbp = checkboxFormatter;
    exports.ɵbq = checkmarkFormatter;
    exports.ɵbt = collectionEditorFormatter;
    exports.ɵbs = collectionFormatter;
    exports.ɵbr = complexObjectFormatter;
    exports.ɵbu = dateIsoFormatter;
    exports.ɵbx = dateTimeIsoAmPmFormatter;
    exports.ɵbv = dateTimeIsoFormatter;
    exports.ɵbw = dateTimeShortIsoFormatter;
    exports.ɵca = dateTimeShortUsFormatter;
    exports.ɵcb = dateTimeUsAmPmFormatter;
    exports.ɵbz = dateTimeUsFormatter;
    exports.ɵby = dateUsFormatter;
    exports.ɵcd = decimalFormatter;
    exports.ɵcc = deleteIconFormatter;
    exports.ɵcg = dollarColoredBoldFormatter;
    exports.ɵcf = dollarColoredFormatter;
    exports.ɵce = dollarFormatter;
    exports.ɵch = editIconFormatter;
    exports.ɵci = hyperlinkFormatter;
    exports.ɵcj = hyperlinkUriPrefixFormatter;
    exports.ɵck = infoIconFormatter;
    exports.ɵcl = lowercaseFormatter;
    exports.ɵcm = maskFormatter;
    exports.ɵcn = multipleFormatter;
    exports.ɵcq = percentCompleteBarFormatter;
    exports.ɵcp = percentCompleteFormatter;
    exports.ɵco = percentFormatter;
    exports.ɵcr = percentSymbolFormatter;
    exports.ɵcs = progressBarFormatter;
    exports.ɵcu = translateBooleanFormatter;
    exports.ɵct = translateFormatter;
    exports.ɵcv = uppercaseFormatter;
    exports.ɵcw = yesNoFormatter;
    exports.ɵcy = avgTotalsDollarFormatter;
    exports.ɵcx = avgTotalsFormatter;
    exports.ɵcz = avgTotalsPercentageFormatter;
    exports.ɵda = maxTotalsFormatter;
    exports.ɵdb = minTotalsFormatter;
    exports.ɵdd = sumTotalsBoldFormatter;
    exports.ɵde = sumTotalsColoredFormatter;
    exports.ɵdg = sumTotalsDollarBoldFormatter;
    exports.ɵdi = sumTotalsDollarColoredBoldFormatter;
    exports.ɵdh = sumTotalsDollarColoredFormatter;
    exports.ɵdf = sumTotalsDollarFormatter;
    exports.ɵdc = sumTotalsFormatter;
    exports.ɵdk = dateIsoSorter;
    exports.ɵdj = dateSorter;
    exports.ɵdm = dateUsShortSorter;
    exports.ɵdl = dateUsSorter;
    exports.ɵdn = numericSorter;
    exports.ɵdo = stringSorter;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=angular-slickgrid.umd.js.map