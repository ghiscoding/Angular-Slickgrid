import * as tslib_1 from "tslib";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import * as moment_ from 'moment-mini';
import moment___default from 'moment-mini';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Injectable, EventEmitter, Component, Input, Inject, Output, NgModule } from '@angular/core';
import { TextEncoder } from 'text-encoding';
import { __awaiter } from 'tslib';
import 'slickgrid/lib/jquery-ui-1.11.3';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.grid';
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
var CaseType = {
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
 * @suppress {checkTypes} checked by tsc
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
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var FilterType = {
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
};
FilterType[FilterType.input] = "input";
FilterType[FilterType.select] = "select";
FilterType[FilterType.multipleSelect] = "multipleSelect";
FilterType[FilterType.singleSelect] = "singleSelect";
FilterType[FilterType.custom] = "custom";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var FormElementType = {
    input: 0,
    select: 1,
    multipleSelect: 2,
    singleSelect: 3,
    custom: 4,
    textarea: 5,
};
FormElementType[FormElementType.input] = "input";
FormElementType[FormElementType.select] = "select";
FormElementType[FormElementType.multipleSelect] = "multipleSelect";
FormElementType[FormElementType.singleSelect] = "singleSelect";
FormElementType[FormElementType.custom] = "custom";
FormElementType[FormElementType.textarea] = "textarea";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
var OperatorType = {
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
var SortDirection = {
    ASC: 'ASC',
    DESC: 'DESC',
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CheckboxEditor = /** @class */ (function () {
    /**
     * @param {?} args
     */
    function CheckboxEditor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.init = function () {
        this.$input = $("<input type=\"checkbox\" value=\"true\" class=\"editor-checkbox\" />");
        this.$input.appendTo(this.args.container);
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.destroy = function () {
        this.$input.remove();
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.focus = function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.hide = function () {
        this.$input.hide();
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.show = function () {
        this.$input.show();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CheckboxEditor.prototype.loadValue = function (item) {
        this.defaultValue = !!item[this.args.column.field];
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
    CheckboxEditor.prototype.preClick = function () {
        this.$input.prop('checked', !this.$input.prop('checked'));
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.serializeValue = function () {
        return this.$input.prop('checked');
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    CheckboxEditor.prototype.applyValue = function (item, state) {
        item[this.args.column.field] = state;
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.isValueChanged = function () {
        return (this.serializeValue() !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.validate = function () {
        return {
            valid: true,
            msg: null
        };
    };
    return CheckboxEditor;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment = moment___default || moment_;
/**
 * Simple function to which will loop and create as demanded the number of white spaces,
 * this will be used in the Excel export
 * @param {?} nbSpaces
 * @return {?}
 */
function addWhiteSpaces(nbSpaces) {
    var /** @type {?} */ result = '';
    for (var /** @type {?} */ i = 0; i < nbSpaces; i++) {
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
/**
 * Try casting an input of type Promise | Observable into a Promise type.
 * @template T
 * @param {?} input
 * @param {?=} fromServiceName string representing the caller service name and will be used if we throw a casting problem error
 * @return {?}
 */
function castToPromise(input, fromServiceName) {
    if (fromServiceName === void 0) { fromServiceName = ''; }
    var /** @type {?} */ promise = input;
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
            throw new Error("Something went wrong, Angular-Slickgrid " + fromServiceName + " is not able to convert the Observable into a Promise.\n        If you are using Angular HttpClient, you could try converting your http call to a Promise with \".toPromise()\"\n        for example::  this.http.post('graphql', { query: graphqlQuery }).toPromise()\n        ");
        }
    }
    return promise;
}
/**
 * From a Date FieldType, return it's equivalent moment.js format
 * refer to moment.js for the format standard used: https://momentjs.com/docs/#/parsing/string-format/
 * @param {?} fieldType
 * @return {?}
 */
function mapMomentDateFormatWithFieldType(fieldType) {
    var /** @type {?} */ map;
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
    var /** @type {?} */ map;
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
            map = 'M/D/YY';
            break;
        case FieldType.dateTimeUs:
            map = 'm/d/Y H:i:S';
            break;
        case FieldType.dateTimeUsAmPm:
            map = 'm/d/Y h:i:S K'; // there is no lowercase in Flatpickr :(
            break;
        case FieldType.dateTimeUsAM_PM:
            map = 'M/D/YY h:i:s K';
            break;
        case FieldType.dateTimeUsShort:
            map = 'M/D/YY H:i:s';
            break;
        case FieldType.dateTimeUsShortAmPm:
            map = 'M/D/YY h:i:s K'; // there is no lowercase in Flatpickr :(
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
 * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
 * @param {?} operator
 * @return {?} string map
 */
function mapOperatorType(operator) {
    var /** @type {?} */ map;
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
 * Parse a date passed as a string and return a Date object (if valid)
 * @param {?} inputDateString
 * @param {?} useUtc
 * @return {?} string date formatted
 */
function parseUtcDate(inputDateString, useUtc) {
    var /** @type {?} */ date = null;
    if (/^[0-9\-\/]*$/.test(inputDateString)) {
        // get the UTC datetime with moment.js but we need to decode the value so that it's valid text
        var /** @type {?} */ dateString = decodeURIComponent(inputDateString);
        var /** @type {?} */ dateMoment = moment(new Date(dateString));
        if (dateMoment.isValid() && dateMoment.year().toString().length === 4) {
            date = (useUtc) ? dateMoment.utc().format() : dateMoment.format();
        }
    }
    return date;
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
require('flatpickr');
var DateEditor = /** @class */ (function () {
    /**
     * @param {?} args
     */
    function DateEditor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    DateEditor.prototype.init = function () {
        var _this = this;
        var /** @type {?} */ gridOptions = (this.args.grid.getOptions());
        this.defaultDate = this.args.item[this.args.column.field] || null;
        var /** @type {?} */ inputFormat = mapFlatpickrDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        var /** @type {?} */ outputFormat = mapFlatpickrDateFormatWithFieldType(this.args.column.outputType || FieldType.dateUtc);
        var /** @type {?} */ currentLocale = this.getCurrentLocale(this.args.column, gridOptions);
        var /** @type {?} */ pickerOptions = {
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
    };
    /**
     * @param {?} columnDef
     * @param {?} gridOptions
     * @return {?}
     */
    DateEditor.prototype.getCurrentLocale = function (columnDef, gridOptions) {
        var /** @type {?} */ params = columnDef.params || {};
        if (params.i18n && params.i18n instanceof TranslateService) {
            return params.i18n.currentLang;
        }
        return 'en';
    };
    /**
     * @param {?} locale
     * @return {?}
     */
    DateEditor.prototype.loadFlatpickrLocale = function (locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        if (locale !== 'en') {
            var /** @type {?} */ localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.destroy = function () {
        this.hide();
        // this.flatInstance.destroy();
        this.$input.remove();
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.show = function () {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.hide = function () {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.focus = function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.save = function () {
        this.args.commitChanges();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DateEditor.prototype.loadValue = function (item) {
        this.defaultDate = item[this.args.column.field];
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.serializeValue = function () {
        return this.$input.val();
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    DateEditor.prototype.applyValue = function (item, state) {
        item[this.args.column.field] = state;
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.isValueChanged = function () {
        return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.validate = function () {
        if (this.args.column.validator) {
            var /** @type {?} */ validationResults = this.args.column.validator(this.$input.val(), this.args);
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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var defaultDecimalPlaces = 0;
var FloatEditor = /** @class */ (function () {
    /**
     * @param {?} args
     */
    function FloatEditor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    FloatEditor.prototype.init = function () {
        this.$input = $("<input type=\"text\" class='editor-text' />")
            .appendTo(this.args.container)
            .on('keydown.nav', function (e) {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        })
            .focus()
            .select();
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.destroy = function () {
        this.$input.remove();
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.focus = function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.getDecimalPlaces = function () {
        // returns the number of fixed decimal places or null
        var /** @type {?} */ rtn = this.args.column.editorFixedDecimalPlaces;
        if (rtn === undefined) {
            rtn = defaultDecimalPlaces;
        }
        return (!rtn && rtn !== 0 ? null : rtn);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FloatEditor.prototype.loadValue = function (item) {
        this.defaultValue = item[this.args.column.field];
        var /** @type {?} */ decPlaces = this.getDecimalPlaces();
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
    FloatEditor.prototype.serializeValue = function () {
        var /** @type {?} */ rtn = parseFloat(this.$input.val()) || 0;
        var /** @type {?} */ decPlaces = this.getDecimalPlaces();
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
    FloatEditor.prototype.applyValue = function (item, state) {
        item[this.args.column.field] = state;
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.isValueChanged = function () {
        return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    FloatEditor.prototype.validate = function () {
        if (isNaN(this.$input.val())) {
            return {
                valid: false,
                msg: 'Please enter a valid number'
            };
        }
        if (this.args.column.validator) {
            var /** @type {?} */ validationResults = this.args.column.validator(this.$input.val());
            if (!validationResults.valid) {
                return validationResults;
            }
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
 * @suppress {checkTypes} checked by tsc
 */
var IntegerEditor = /** @class */ (function () {
    /**
     * @param {?} args
     */
    function IntegerEditor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    IntegerEditor.prototype.init = function () {
        this.$input = $("<input type=\"text\" class='editor-text' />")
            .appendTo(this.args.container)
            .on('keydown.nav', function (e) {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        })
            .focus()
            .select();
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.destroy = function () {
        this.$input.remove();
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.focus = function () {
        this.$input.focus();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    IntegerEditor.prototype.loadValue = function (item) {
        this.defaultValue = item[this.args.column.field];
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$input.select();
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.serializeValue = function () {
        return parseInt(/** @type {?} */ (this.$input.val()), 10) || 0;
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    IntegerEditor.prototype.applyValue = function (item, state) {
        item[this.args.column.field] = state;
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.isValueChanged = function () {
        return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.validate = function () {
        if (isNaN(/** @type {?} */ (this.$input.val()))) {
            return {
                valid: false,
                msg: 'Please enter a valid integer'
            };
        }
        if (this.args.column.validator) {
            var /** @type {?} */ validationResults = this.args.column.validator(this.$input.val());
            if (!validationResults.valid) {
                return validationResults;
            }
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
 * @suppress {checkTypes} checked by tsc
 */
var LongTextEditor = /** @class */ (function () {
    /**
     * @param {?} args
     */
    function LongTextEditor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    LongTextEditor.prototype.init = function () {
        var _this = this;
        var /** @type {?} */ $container = $('body');
        this.$wrapper = $("<div class=\"slick-large-editor-text\" />").appendTo($container);
        this.$input = $("<textarea hidefocus rows=\"5\">").appendTo(this.$wrapper);
        $("<div class=\"editor-footer\">\n        <button class=\"btn btn-primary btn-xs\">Save</button>\n        <button class=\"btn btn-default btn-xs\">Cancel</button>\n      </div>").appendTo(this.$wrapper);
        this.$wrapper.find('button:first').on('click', function (event) { return _this.save(); });
        this.$wrapper.find('button:last').on('click', function (event) { return _this.cancel(); });
        this.$input.on('keydown', this.handleKeyDown);
        this.position(this.args.position);
        this.$input.focus().select();
    };
    /**
     * @param {?} e
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    LongTextEditor.prototype.save = function () {
        this.args.commitChanges();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.cancel = function () {
        this.$input.val(this.defaultValue);
        this.args.cancelChanges();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.hide = function () {
        this.$wrapper.hide();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.show = function () {
        this.$wrapper.show();
    };
    /**
     * @param {?} position
     * @return {?}
     */
    LongTextEditor.prototype.position = function (position) {
        this.$wrapper
            .css('top', (position.top || 0) - 5)
            .css('left', (position.left || 0) - 5);
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.destroy = function () {
        this.$wrapper.remove();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.focus = function () {
        this.$input.focus();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    LongTextEditor.prototype.loadValue = function (item) {
        this.$input.val(this.defaultValue = item[this.args.column.field]);
        this.$input.select();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.serializeValue = function () {
        return this.$input.val();
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    LongTextEditor.prototype.applyValue = function (item, state) {
        item[this.args.column.field] = state;
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.isValueChanged = function () {
        return (!(this.$input.val() === '' && this.defaultValue == null)) && (this.$input.val() !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.validate = function () {
        var /** @type {?} */ valid = true;
        var /** @type {?} */ msg = null;
        if (this.args.column.validator) {
            var /** @type {?} */ validationResults = this.args.column.validator(this.$input.val(), this.args);
            valid = validationResults.valid;
            msg = validationResults.msg;
        }
        return {
            valid: valid,
            msg: msg
        };
    };
    return LongTextEditor;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TextEditor = /** @class */ (function () {
    /**
     * @param {?} args
     */
    function TextEditor(args) {
        this.args = args;
        this.init();
    }
    /**
     * @return {?}
     */
    TextEditor.prototype.init = function () {
        this.$input = $("<input type=\"text\" class='editor-text' />")
            .appendTo(this.args.container)
            .on('keydown.nav', function (e) {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        })
            .focus()
            .select();
    };
    /**
     * @return {?}
     */
    TextEditor.prototype.destroy = function () {
        this.$input.remove();
    };
    /**
     * @return {?}
     */
    TextEditor.prototype.focus = function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    TextEditor.prototype.getValue = function () {
        return this.$input.val();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    TextEditor.prototype.setValue = function (val) {
        this.$input.val(val);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TextEditor.prototype.loadValue = function (item) {
        this.defaultValue = item[this.args.column.field] || '';
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$input.select();
    };
    /**
     * @return {?}
     */
    TextEditor.prototype.serializeValue = function () {
        return this.$input.val();
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    TextEditor.prototype.applyValue = function (item, state) {
        item[this.args.column.field] = state;
    };
    /**
     * @return {?}
     */
    TextEditor.prototype.isValueChanged = function () {
        return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    TextEditor.prototype.validate = function () {
        if (this.args.column.validator) {
            var /** @type {?} */ validationResults = this.args.column.validator(this.$input.val());
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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Editors = {
    checkbox: CheckboxEditor,
    date: DateEditor,
    float: FloatEditor,
    integer: IntegerEditor,
    longText: LongTextEditor,
    text: TextEditor
};
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
var booleanFilterCondition = function (options) {
    return parseBoolean(options.cellValue) === parseBoolean(options.searchTerm);
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
    }
    return true;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$1 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateFilterCondition = function (options) {
    var /** @type {?} */ filterSearchType = options.filterSearchType || FieldType.dateIso;
    var /** @type {?} */ searchDateFormat = mapMomentDateFormatWithFieldType(filterSearchType);
    if (!moment$1(options.cellValue, moment$1.ISO_8601).isValid() || !moment$1(options.searchTerm, searchDateFormat, true).isValid()) {
        return true;
    }
    var /** @type {?} */ dateCell = moment$1(options.cellValue);
    var /** @type {?} */ dateSearch = moment$1(options.searchTerm);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$2 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateIso);
var dateIsoFilterCondition = function (options) {
    if (!moment$2(options.cellValue, FORMAT, true).isValid() || !moment$2(options.searchTerm, FORMAT, true).isValid()) {
        return true;
    }
    var /** @type {?} */ dateCell = moment$2(options.cellValue, FORMAT, true);
    var /** @type {?} */ dateSearch = moment$2(options.searchTerm, FORMAT, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$3 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT$1 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
var dateUsFilterCondition = function (options) {
    if (!moment$3(options.cellValue, FORMAT$1, true).isValid() || !moment$3(options.searchTerm, FORMAT$1, true).isValid()) {
        return true;
    }
    var /** @type {?} */ dateCell = moment$3(options.cellValue, FORMAT$1, true);
    var /** @type {?} */ dateSearch = moment$3(options.searchTerm, FORMAT$1, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$4 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT$2 = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
var dateUsShortFilterCondition = function (options) {
    if (!moment$4(options.cellValue, FORMAT$2, true).isValid() || !moment$4(options.searchTerm, FORMAT$2, true).isValid()) {
        return true;
    }
    var /** @type {?} */ dateCell = moment$4(options.cellValue, FORMAT$2, true);
    var /** @type {?} */ dateSearch = moment$4(options.searchTerm, FORMAT$2, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$5 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateUtcFilterCondition = function (options) {
    if (!options.filterSearchType) {
        throw new Error('Date UTC filter is a special case and requires a filterSearchType to be provided in the column option, for example: { filterable: true, type: FieldType.dateUtc, filterSearchType: FieldType.dateIso }');
    }
    var /** @type {?} */ searchDateFormat = mapMomentDateFormatWithFieldType(options.filterSearchType);
    if (!moment$5(options.cellValue, moment$5.ISO_8601).isValid() || !moment$5(options.searchTerm, searchDateFormat, true).isValid()) {
        return true;
    }
    var /** @type {?} */ dateCell = moment$5(options.cellValue, moment$5.ISO_8601, true);
    var /** @type {?} */ dateSearch = moment$5(options.searchTerm, searchDateFormat, true);
    // run the filter condition with date in Unix Timestamp format
    return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var collectionSearchFilterCondition = function (options) {
    // multiple-select will always return text, so we should make our cell values text as well
    var /** @type {?} */ cellValue = options.cellValue + '';
    return testFilterCondition(options.operator || 'IN', cellValue, options.searchTerms || []);
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var numberFilterCondition = function (options) {
    var /** @type {?} */ cellValue = parseFloat(options.cellValue);
    var /** @type {?} */ searchTerm = (typeof options.searchTerm === 'string') ? parseFloat(options.searchTerm) : options.searchTerm;
    return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var stringFilterCondition = function (options) {
    // make sure the cell value is a string by casting it when possible
    options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();
    // make both the cell value and search value lower for case insensitive comparison
    var /** @type {?} */ cellValue = options.cellValue.toLowerCase();
    var /** @type {?} */ searchTerm = (typeof options.searchTerm === 'string') ? options.searchTerm.toLowerCase() : options.searchTerm;
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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var executeMappedCondition = function (options) {
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
 * @suppress {checkTypes} checked by tsc
 */
var InputFilter = /** @class */ (function () {
    function InputFilter() {
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    InputFilter.prototype.init = function (args) {
        var _this = this;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerm = args.searchTerm;
        // step 1, create HTML string template
        var /** @type {?} */ filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.keyup(function (e) {
            (e && e.target && e.target.value) ? _this.$filterElm.addClass('filled') : _this.$filterElm.removeClass('filled');
            _this.callback(e, { columnDef: _this.columnDef });
        });
    };
    /**
     * Clear the filter value
     * @param {?=} triggerFilterKeyup
     * @return {?}
     */
    InputFilter.prototype.clear = function (triggerFilterKeyup) {
        if (triggerFilterKeyup === void 0) { triggerFilterKeyup = true; }
        if (this.$filterElm) {
            this.$filterElm.val('');
            if (triggerFilterKeyup) {
                this.$filterElm.trigger('keyup');
            }
        }
    };
    /**
     * destroy the filter
     * @return {?}
     */
    InputFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
        }
    };
    /**
     * Create the HTML template as a string
     * @return {?}
     */
    InputFilter.prototype.buildTemplateHtmlString = function () {
        return "<input type=\"text\" class=\"form-control search-filter\" style=\"font-family: Segoe UI Symbol;\" placeholder=\"&#128269;\">";
    };
    /**
     * From the html template string, create a DOM element
     * @param {?} filterTemplate
     * @return {?}
     */
    InputFilter.prototype.createDomElement = function (filterTemplate) {
        var /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        var /** @type {?} */ $filterElm = $(filterTemplate);
        var /** @type {?} */ searchTerm = (typeof this.searchTerm === 'boolean') ? "" + this.searchTerm : this.searchTerm;
        $filterElm.val(searchTerm);
        $filterElm.attr('id', "filter-" + this.columnDef.id);
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
    };
    return InputFilter;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MultipleSelectFilter = /** @class */ (function () {
    /**
     * Initialize the Filter
     * @param {?} translate
     */
    function MultipleSelectFilter(translate) {
        var _this = this;
        this.translate = translate;
        this.isFilled = false;
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
            onClose: function () {
                var /** @type {?} */ selectedItems = _this.$filterElm.multipleSelect('getSelects');
                if (Array.isArray(selectedItems) && selectedItems.length > 0) {
                    _this.isFilled = true;
                    _this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    _this.isFilled = false;
                    _this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
                }
                _this.callback(undefined, { columnDef: _this.columnDef, operator: 'IN', searchTerms: selectedItems });
            }
        };
    }
    /**
     * Initialize the filter template
     * @param {?} args
     * @return {?}
     */
    MultipleSelectFilter.prototype.init = function (args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // step 1, create HTML string template
        var /** @type {?} */ filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & pre-load search terms
        // also subscribe to the onClose event
        this.createDomElement(filterTemplate);
    };
    /**
     * Clear the filter values
     * @param {?=} triggerFilterChange
     * @return {?}
     */
    MultipleSelectFilter.prototype.clear = function (triggerFilterChange) {
        if (triggerFilterChange === void 0) { triggerFilterChange = true; }
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
            // this.$filterElm = $(`#${this.$filterElm[0].id}`);
            this.$filterElm.multipleSelect('setSelects', []);
            if (triggerFilterChange) {
                this.$filterElm.removeClass('filled');
                this.callback(undefined, { columnDef: this.columnDef, operator: 'IN', searchTerms: [] });
            }
        }
    };
    /**
     * destroy the filter
     * @return {?}
     */
    MultipleSelectFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off().remove();
        }
    };
    /**
     * Create the HTML template as a string
     * @return {?}
     */
    MultipleSelectFilter.prototype.buildTemplateHtmlString = function () {
        var _this = this;
        if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" for the MultipleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: type: FilterType.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        var /** @type {?} */ optionCollection = this.columnDef.filter.collection || [];
        var /** @type {?} */ labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        var /** @type {?} */ valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        var /** @type {?} */ options = '';
        optionCollection.forEach(function (option) {
            if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FilterType.multipleSelect, collection: [ { value: '1', label: 'One' } ]')");
            }
            var /** @type {?} */ labelKey = ((option.labelKey || option[labelName]));
            var /** @type {?} */ selected = (_this.findValueInSearchTerms(option[valueName]) >= 0) ? 'selected' : '';
            var /** @type {?} */ textLabel = ((option.labelKey || _this.columnDef.filter.enableTranslateLabel) && _this.translate && typeof _this.translate.instant === 'function') ? _this.translate.instant(labelKey || ' ') : labelKey;
            // html text of each select option
            options += "<option value=\"" + option[valueName] + "\" " + selected + ">" + textLabel + "</option>";
            // if there's a search term, we will add the "filled" class for styling purposes
            if (selected) {
                _this.isFilled = true;
            }
        });
        return "<select class=\"ms-filter search-filter\" multiple=\"multiple\">" + options + "</select>";
    };
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param {?} filterTemplate
     * @return {?}
     */
    MultipleSelectFilter.prototype.createDomElement = function (filterTemplate) {
        var /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error("multiple-select.js was not found, make sure to modify your \"angular-cli.json\" file and include \"../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js\" and it's css or SASS file");
        }
        this.$filterElm.attr('id', "filter-" + this.columnDef.id);
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
        var /** @type {?} */ options = Object.assign({}, this.defaultOptions, this.columnDef.filter.filterOptions);
        this.$filterElm = this.$filterElm.multipleSelect(options);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MultipleSelectFilter.prototype.findValueInSearchTerms = function (value) {
        if (this.searchTerms && Array.isArray(this.searchTerms)) {
            for (var /** @type {?} */ i = 0; i < this.searchTerms.length; i++) {
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
    { type: Injectable },
];
/** @nocollapse */
MultipleSelectFilter.ctorParameters = function () { return [
    { type: TranslateService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SelectFilter = /** @class */ (function () {
    /**
     * @param {?} translate
     */
    function SelectFilter(translate) {
        this.translate = translate;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    SelectFilter.prototype.init = function (args) {
        var _this = this;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerm = args.searchTerm;
        // step 1, create HTML string template
        var /** @type {?} */ filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change(function (e) {
            (e && e.target && e.target.value) ? _this.$filterElm.addClass('filled') : _this.$filterElm.removeClass('filled');
            _this.callback(e, { columnDef: _this.columnDef, operator: 'EQ' });
        });
    };
    /**
     * Clear the filter values
     * @param {?=} triggerFilterChange
     * @return {?}
     */
    SelectFilter.prototype.clear = function (triggerFilterChange) {
        if (triggerFilterChange === void 0) { triggerFilterChange = true; }
        if (this.$filterElm) {
            this.$filterElm.val('');
            if (triggerFilterChange) {
                this.$filterElm.trigger('change');
            }
        }
    };
    /**
     * destroy the filter
     * @return {?}
     */
    SelectFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
        }
    };
    /**
     * @return {?}
     */
    SelectFilter.prototype.buildTemplateHtmlString = function () {
        var _this = this;
        if (!this.columnDef || !this.columnDef.filter || (!this.columnDef.filter.collection && !this.columnDef.filter.selectOptions)) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: type: FilterType.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        if (!this.columnDef.filter.collection && this.columnDef.filter.selectOptions) {
            console.warn("[Angular-SlickGrid] The Select Filter \"selectOptions\" property will de deprecated in future version. Please use the new \"collection\" property which is more generic and can be used with other Filters (not just Select).");
        }
        var /** @type {?} */ optionCollection = this.columnDef.filter.collection || this.columnDef.filter.selectOptions || [];
        var /** @type {?} */ labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        var /** @type {?} */ valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        var /** @type {?} */ options = '';
        optionCollection.forEach(function (option) {
            if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FilterType.select, collection: [ { value: '1', label: 'One' } ]')");
            }
            var /** @type {?} */ labelKey = option.labelKey || option[labelName];
            var /** @type {?} */ textLabel = ((option.labelKey || _this.columnDef.filter.enableTranslateLabel) && _this.translate && typeof _this.translate.instant === 'function') ? _this.translate.instant(labelKey || ' ') : labelKey;
            options += "<option value=\"" + option[valueName] + "\">" + textLabel + "</option>";
        });
        return "<select class=\"form-control search-filter\">" + options + "</select>";
    };
    /**
     * From the html template string, create a DOM element
     * @param {?} filterTemplate
     * @return {?}
     */
    SelectFilter.prototype.createDomElement = function (filterTemplate) {
        var /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        var /** @type {?} */ $filterElm = $(filterTemplate);
        var /** @type {?} */ searchTerm = (typeof this.searchTerm === 'boolean') ? "" + this.searchTerm : this.searchTerm;
        $filterElm.val(searchTerm);
        $filterElm.attr('id', "filter-" + this.columnDef.id);
        $filterElm.data('columnId', this.columnDef.id);
        // append the new DOM element to the header row
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    };
    return SelectFilter;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SingleSelectFilter = /** @class */ (function () {
    /**
     * @param {?} translate
     */
    function SingleSelectFilter(translate) {
        this.translate = translate;
        // default options used by this Filter, user can overwrite any of these by passing "otions"
        this.defaultOptions = {
            container: 'body',
            filter: false,
            // input search term on top of the select option list
            maxHeight: 200,
            single: true
        };
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    SingleSelectFilter.prototype.init = function (args) {
        var _this = this;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerm = args.searchTerm;
        // step 1, create HTML string template
        var /** @type {?} */ filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & pre-load search term
        this.createDomElement(filterTemplate);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change(function (e) {
            if (e && e.target && e.target.value) {
                _this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
            }
            else {
                _this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
            }
            _this.callback(e, { columnDef: _this.columnDef, operator: 'EQ' });
        });
    };
    /**
     * Clear the filter values
     * @param {?=} triggerFilterChange
     * @return {?}
     */
    SingleSelectFilter.prototype.clear = function (triggerFilterChange) {
        if (triggerFilterChange === void 0) { triggerFilterChange = true; }
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
            // this.$filterElm = $(`#${this.$filterElm[0].id}`);
            this.$filterElm.multipleSelect('setSelects', []);
            if (triggerFilterChange) {
                this.callback(undefined, { columnDef: this.columnDef, operator: 'IN', searchTerm: undefined });
            }
        }
    };
    /**
     * destroy the filter
     * @return {?}
     */
    SingleSelectFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off().remove();
        }
    };
    /**
     * Create the HTML template as a string
     * @return {?}
     */
    SingleSelectFilter.prototype.buildTemplateHtmlString = function () {
        var _this = this;
        if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" for the SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: type: FilterType.singleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        var /** @type {?} */ optionCollection = this.columnDef.filter.collection || [];
        var /** @type {?} */ labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        var /** @type {?} */ valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        var /** @type {?} */ options = '';
        optionCollection.forEach(function (option) {
            if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FilterType.singleSelect, collection: [ { value: '1', label: 'One' } ]')");
            }
            var /** @type {?} */ labelKey = ((option.labelKey || option[labelName]));
            var /** @type {?} */ selected = (option[valueName] === _this.searchTerm) ? 'selected' : '';
            var /** @type {?} */ textLabel = ((option.labelKey || _this.columnDef.filter.enableTranslateLabel) && _this.translate && typeof _this.translate.instant === 'function') ? _this.translate.instant(labelKey || ' ') : labelKey;
            // html text of each select option
            options += "<option value=\"" + option[valueName] + "\" " + selected + ">" + textLabel + "</option>";
        });
        return "<select class=\"ms-filter search-filter\">" + options + "</select>";
    };
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param {?} filterTemplate
     * @return {?}
     */
    SingleSelectFilter.prototype.createDomElement = function (filterTemplate) {
        var /** @type {?} */ $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error("multiple-select.js was not found, make sure to modify your \"angular-cli.json\" file and include \"../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js\" and it's css or SASS file");
        }
        this.$filterElm.attr('id', "filter-" + this.columnDef.id);
        this.$filterElm.data('columnId', this.columnDef.id);
        // append the new DOM element to the header row
        if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
            this.$filterElm.appendTo($headerElm);
        }
        // merge options & attach multiSelect
        var /** @type {?} */ options = Object.assign({}, this.defaultOptions, this.columnDef.filter.filterOptions);
        this.$filterElm = this.$filterElm.multipleSelect(options);
    };
    return SingleSelectFilter;
}());
SingleSelectFilter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SingleSelectFilter.ctorParameters = function () { return [
    { type: TranslateService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Filters = {
    input: InputFilter,
    multipleSelect: MultipleSelectFilter,
    singleSelect: SingleSelectFilter,
    select: SelectFilter
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var arrayToCsvFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value && Array.isArray(value)) {
        return value.join(', ');
    }
    return '';
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var checkboxFormatter = function (row, cell, value, columnDef, dataContext) { return value ? '&#x2611;' : ''; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var checkmarkFormatter = function (row, cell, value, columnDef, dataContext) { return value ? "<i class=\"fa fa-check checkmark-icon\" aria-hidden=\"true\"></i>" : ''; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var complexObjectFormatter = function (row, cell, value, columnDef, dataContext) {
    if (!columnDef) {
        return '';
    }
    var /** @type {?} */ complexField = columnDef.field || '';
    return complexField.split('.').reduce(function (obj, i) { return obj[i]; }, dataContext);
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$6 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT$3 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
var dateIsoFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$6(value).format(FORMAT$3) : ''; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$7 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT$4 = mapMomentDateFormatWithFieldType(FieldType.dateTimeIsoAmPm);
var dateTimeIsoAmPmFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$7(value).format(FORMAT$4) : ''; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$8 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT$5 = mapMomentDateFormatWithFieldType(FieldType.dateTimeUsAmPm);
var dateTimeUsAmPmFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$8(value).format(FORMAT$5) : ''; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$9 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT$6 = mapMomentDateFormatWithFieldType(FieldType.dateTimeUs);
var dateTimeUsFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$9(value).format(FORMAT$6) : ''; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$10 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT$7 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
var dateUsFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$10(value).format(FORMAT$7) : ''; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var deleteIconFormatter = function (row, cell, value, columnDef, dataContext) { return "<i class=\"fa fa-trash pointer delete-icon\" aria-hidden=\"true\"></i>"; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var editIconFormatter = function (row, cell, value, columnDef, dataContext) { return "<i class=\"fa fa-pencil pointer edit-icon\" aria-hidden=\"true\"></i>"; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var hyperlinkFormatter = function (row, cell, value, columnDef, dataContext) {
    var /** @type {?} */ matchUrl = value.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/, 'i');
    if (matchUrl && Array.isArray(matchUrl)) {
        return "<a href=\"" + matchUrl[0] + "\">' + value + '</a>";
    }
    return '';
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var infoIconFormatter = function (row, cell, value, columnDef, dataContext) { return "<i class=\"fa fa-info-circle pointer info-icon\" aria-hidden=\"true\"></i>"; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
 * @suppress {checkTypes} checked by tsc
 */
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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var translateFormatter = function (row, cell, value, columnDef, dataContext, grid) {
    var /** @type {?} */ gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
    var /** @type {?} */ columnParams = columnDef.params || {};
    var /** @type {?} */ gridParams = gridOptions.params || {};
    if ((!columnParams.i18n || !(columnParams.i18n instanceof TranslateService)) && (!gridParams.i18n || !(gridParams.i18n instanceof TranslateService))) {
        throw new Error("The translate formatter requires the ngx-translate \"TranslateService\" to be provided as a Column Definition params or a Grid Option params.\n    For example: this.gridOptions = { enableTranslate: true, params: { i18n: this.translateService }}");
    }
    var /** @type {?} */ translate = gridParams.i18n || columnParams.i18n;
    // make sure the value is a string (for example a boolean value would throw an error)
    if (typeof value !== 'string') {
        value = value + '';
    }
    return value ? translate.instant(value) : '';
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var yesNoFormatter = function (row, cell, value, columnDef, dataContext) { return value ? 'Yes' : 'No'; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
export interface GroupFormatter {
  (row: number, cell: number, value: any, columnDef: Column, dataContext: Group): string
}
export interface GroupTotalsFormatter {
  (row: number, cell: number, value: any, columnDef: Column, dataContext: GroupTotals): string
}
*/
var Formatters = {
    arrayToCsv: arrayToCsvFormatter,
    checkbox: checkboxFormatter,
    checkmark: checkmarkFormatter,
    complexObject: complexObjectFormatter,
    dateIso: dateIsoFormatter,
    dateTimeIso: dateIsoFormatter,
    dateTimeIsoAmPm: dateTimeIsoAmPmFormatter,
    dateUs: dateUsFormatter,
    dateTimeUs: dateTimeUsFormatter,
    dateTimeUsAmPm: dateTimeUsAmPmFormatter,
    deleteIcon: deleteIconFormatter,
    editIcon: editIconFormatter,
    hyperlink: hyperlinkFormatter,
    infoIcon: infoIconFormatter,
    percentComplete: percentCompleteFormatter,
    percentCompleteBar: percentCompleteBarFormatter,
    progressBar: progressBarFormatter,
    translate: translateFormatter,
    yesNo: yesNoFormatter
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$11 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT$8 = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
var dateUsShortSorter = function (value1, value2, sortDirection) {
    if (!moment$11(value1, FORMAT$8, true).isValid() || !moment$11(value2, FORMAT$8, true).isValid()) {
        return 0;
    }
    var /** @type {?} */ date1 = moment$11(value1, FORMAT$8, true);
    var /** @type {?} */ date2 = moment$11(value2, FORMAT$8, true);
    var /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$12 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateSorter = function (value1, value2, sortDirection) {
    if (!moment$12(value1, moment$12.ISO_8601).isValid() || !moment$12(value2, moment$12.ISO_8601, true).isValid()) {
        return 0;
    }
    var /** @type {?} */ date1 = moment$12(value1);
    var /** @type {?} */ date2 = moment$12(value2);
    var /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$13 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT$9 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
var dateIsoSorter = function (value1, value2, sortDirection) {
    if (!moment$13(value1, FORMAT$9, true).isValid() || !moment$13(value2, FORMAT$9, true).isValid()) {
        return 0;
    }
    var /** @type {?} */ date1 = moment$13(value1, FORMAT$9, true);
    var /** @type {?} */ date2 = moment$13(value2, FORMAT$9, true);
    var /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var moment$14 = moment___default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var FORMAT$10 = mapMomentDateFormatWithFieldType(FieldType.dateUs);
var dateUsSorter = function (value1, value2, sortDirection) {
    if (!moment$14(value1, FORMAT$10, true).isValid() || !moment$14(value2, FORMAT$10, true).isValid()) {
        return 0;
    }
    var /** @type {?} */ date1 = moment$14(value1, FORMAT$10, true);
    var /** @type {?} */ date2 = moment$14(value2, FORMAT$10, true);
    var /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var numericSorter = function (value1, value2, sortDirection) {
    var /** @type {?} */ x = (isNaN(value1) || value1 === '' || value1 === null) ? -99e+10 : parseFloat(value1);
    var /** @type {?} */ y = (isNaN(value2) || value2 === '' || value2 === null) ? -99e+10 : parseFloat(value2);
    return sortDirection * (x === y ? 0 : (x > y ? 1 : -1));
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var stringSorter = function (value1, value2, sortDirection) {
    var /** @type {?} */ position;
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
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
var ExportService = /** @class */ (function () {
    /**
     * @param {?} translate
     */
    function ExportService(translate) {
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
    ExportService.prototype.init = function (grid, gridOptions, dataView) {
        this._grid = grid;
        this._gridOptions = gridOptions;
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
     * @param {?} options
     * @return {?}
     */
    ExportService.prototype.exportToFile = function (options) {
        this._exportOptions = $.extend(true, {}, this.defaultExportOptions, options);
        // get the CSV output from the grid data
        var /** @type {?} */ dataOutput = this.getDataOutput();
        // trigger a download file
        this.startDownloadFile({
            filename: this._exportOptions.filename + "." + this._exportOptions.format,
            csvContent: dataOutput,
            format: this._exportOptions.format,
            useUtf8WithBom: this._exportOptions.useUtf8WithBom
        });
    };
    /**
     * @return {?}
     */
    ExportService.prototype.getDataOutput = function () {
        var _this = this;
        var /** @type {?} */ columns = this._grid.getColumns() || [];
        var /** @type {?} */ delimiter = this._exportOptions.delimiter || '';
        var /** @type {?} */ format = this._exportOptions.format || '';
        // find all the Aggregators that exist inside SlickGrid
        this._existingSlickAggregators = this.getAllSlickGridAggregators() || [];
        // a CSV needs double quotes wrapper, the other types do not need any wrapper
        this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';
        // data variable which will hold all the fields data of a row
        var /** @type {?} */ outputDataString = '';
        // get grouped column titles and if found, we will add a "Group by" column at the first column index
        this._groupedHeaders = this.getGroupedColumnTitles(columns) || [];
        if (this._groupedHeaders && Array.isArray(this._groupedHeaders)) {
            this._hasGroupedItems = (this._groupedHeaders.length > 0);
            outputDataString += this._groupedHeaders
                .map(function (header) { return _this.translate.instant('GROUP_BY') + " [" + header.title + "]"; })
                .join(delimiter);
        }
        // get all column headers
        this._columnHeaders = this.getColumnHeaders(columns) || [];
        if (this._columnHeaders && Array.isArray(this._columnHeaders)) {
            // add the header row + add a new line at the end of the row
            var /** @type {?} */ outputHeaderTitles = this._columnHeaders
                .map(function (header) { return _this._exportQuoteWrapper + header.title + _this._exportQuoteWrapper; });
            outputDataString += (outputHeaderTitles.join(delimiter) + this._lineCarriageReturn);
        }
        // Populate the rest of the Grid Data
        outputDataString += this.getAllGridRowData(columns, this._lineCarriageReturn);
        return outputDataString;
    };
    /**
     * Get all the grid row data and return that as an output string
     * @param {?} columns
     * @param {?} lineCarriageReturn
     * @return {?}
     */
    ExportService.prototype.getAllGridRowData = function (columns, lineCarriageReturn) {
        var /** @type {?} */ outputDataString = '';
        var /** @type {?} */ lineCount = this._dataView.getLength();
        // loop through all the grid rows of data
        for (var /** @type {?} */ rowNumber = 0; rowNumber < lineCount; rowNumber++) {
            var /** @type {?} */ itemObj = this._dataView.getItem(rowNumber);
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
    };
    /**
     * Get all the Slick Aggregators that are defined in SlickGrid
     * @return {?}
     */
    ExportService.prototype.getAllSlickGridAggregators = function () {
        var /** @type {?} */ existingSlickAggregators = [];
        for (var /** @type {?} */ key in Slick.Data.Aggregators) {
            if (Slick.Data.Aggregators.hasOwnProperty(key)) {
                existingSlickAggregators.push(key.toLowerCase());
            }
        }
        return existingSlickAggregators;
    };
    /**
     * Get all header titles and their keys, translate the title when required.
     * @param {?} columns of the grid
     * @return {?}
     */
    ExportService.prototype.getColumnHeaders = function (columns) {
        var _this = this;
        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return null;
        }
        var /** @type {?} */ columnHeaders = [];
        // Populate the Column Header, pull the name defined
        columns.forEach(function (columnDef) {
            var /** @type {?} */ fieldName = (columnDef.headerKey) ? _this.translate.instant(columnDef.headerKey) : columnDef.name;
            var /** @type {?} */ skippedField = columnDef.excludeFromExport || false;
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
     * @param {?} columns
     * @param {?} row
     * @param {?} itemObj
     * @return {?}
     */
    ExportService.prototype.readRegularRowData = function (columns, row, itemObj) {
        var /** @type {?} */ idx = 0;
        var /** @type {?} */ rowOutputString = '';
        var /** @type {?} */ delimiter = this._exportOptions.delimiter;
        var /** @type {?} */ format = this._exportOptions.format;
        var /** @type {?} */ exportQuoteWrapper = this._exportQuoteWrapper || '';
        for (var /** @type {?} */ col = 0, /** @type {?} */ ln = columns.length; col < ln; col++) {
            var /** @type {?} */ columnDef = columns[col];
            var /** @type {?} */ fieldId = columnDef.field || columnDef.id || '';
            // skip excluded column
            if (columnDef.excludeFromExport) {
                continue;
            }
            // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
            if (this._hasGroupedItems && idx === 0) {
                rowOutputString += "\"\"" + delimiter;
            }
            // does the user want to evaluate current column Formatter?
            var /** @type {?} */ isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._gridOptions.exportWithFormatter;
            // did the user provide a Custom Formatter for the export
            var /** @type {?} */ exportCustomFormatter = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;
            var /** @type {?} */ itemData = '';
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
                itemData = itemData.toString().replace(/"/gi, "\"\"");
            }
            // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
            // to cancel that effect we can had = in front, ex: ="1E06"
            var /** @type {?} */ keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
            rowOutputString += keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper + delimiter;
            idx++;
        }
        return rowOutputString;
    };
    /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param {?} itemObj
     * @return {?}
     */
    ExportService.prototype.readGroupedTitleRow = function (itemObj) {
        var /** @type {?} */ groupName = itemObj.value;
        var /** @type {?} */ exportQuoteWrapper = this._exportQuoteWrapper || '';
        var /** @type {?} */ delimiter = this._exportOptions.delimiter;
        var /** @type {?} */ format = this._exportOptions.format;
        groupName = addWhiteSpaces(5 * itemObj.level) + groupName;
        if (format === FileType.csv) {
            // when CSV we also need to escape double quotes twice, so " becomes ""
            groupName = groupName.toString().replace(/"/gi, "\"\"");
        }
        // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
        // to cancel that effect we can had = in front, ex: ="1E06"
        // const keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
        return /*keepAsStringWrapper +*/ /*keepAsStringWrapper +*/ exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper + delimiter;
    };
    /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param {?} itemObj
     * @return {?}
     */
    ExportService.prototype.readGroupedTotalRow = function (itemObj) {
        var /** @type {?} */ exportExponentialWrapper = '';
        var /** @type {?} */ delimiter = this._exportOptions.delimiter;
        var /** @type {?} */ format = this._exportOptions.format;
        var /** @type {?} */ exportQuoteWrapper = this._exportQuoteWrapper || '';
        var /** @type {?} */ existingSlickAggregators = this._existingSlickAggregators || [];
        var /** @type {?} */ columnCount = this._grid.getColumns().length;
        var /** @type {?} */ output = exportQuoteWrapper + ".." + exportQuoteWrapper + delimiter;
        for (var /** @type {?} */ j = 0; j < columnCount; j++) {
            var /** @type {?} */ fieldId = this._grid.getColumns()[j].id;
            var /** @type {?} */ itemData = '';
            // cycle through all possible SlickGrid Aggregators and get their values
            for (var /** @type {?} */ k = 0; k < existingSlickAggregators.length; k++) {
                if (itemObj[existingSlickAggregators[k]] !== undefined) {
                    if (fieldId in itemObj[existingSlickAggregators[k]]) {
                        var /** @type {?} */ aggregatorName = existingSlickAggregators[k];
                        var /** @type {?} */ val = itemObj[existingSlickAggregators[k]][fieldId];
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
                itemData = itemData.toString().replace(/"/gi, "\"\"");
                exportExponentialWrapper = (itemData.match(/^\s*\d+E\d+\s*$/i)) ? '=' : '';
            }
            output += exportQuoteWrapper + itemData + exportQuoteWrapper + delimiter;
        }
        return output;
    };
    /**
     * Get all grouped column titles, translate them when required.
     * For example if the grid is grouped by salesRep and then customerName, we will return their title, something like:: ['Sales Rep', 'Customer Name']
     * @param {?} columns of the grid
     * @return {?}
     */
    ExportService.prototype.getGroupedColumnTitles = function (columns) {
        var _this = this;
        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return null;
        }
        var /** @type {?} */ groupItemId = '';
        var /** @type {?} */ groupedHeaders = [];
        var /** @type {?} */ hasGroupedItems = false;
        if ($.isEmptyObject(this._groupingDefinition)) {
            hasGroupedItems = false;
        }
        else {
            hasGroupedItems = true;
            groupItemId = $("#" + this._groupingDefinition.dropdownOptionsIds[0]).val();
        }
        // If we are Grouping, then pull the name of the grouped item and display it as 1st column
        columns.forEach(function (columnDef) {
            // the column might be a complex object and have a '.' (ex.: person.name)
            // if so we want just the object (ex.: person.name => we want 'person')
            if (groupItemId.indexOf('.') >= 0) {
                groupItemId = groupItemId.split('.')[0];
            }
            if (hasGroupedItems && columnDef.id === groupItemId) {
                var /** @type {?} */ fieldName = (columnDef.headerKey) ? _this.translate.instant(columnDef.headerKey) : columnDef.name;
                groupedHeaders.push({
                    key: columnDef.field || columnDef.id,
                    title: fieldName
                });
            }
        });
        return groupedHeaders;
    };
    /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param {?} options
     * @return {?}
     */
    ExportService.prototype.startDownloadFile = function (options) {
        // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
        if (navigator.appName === 'Microsoft Internet Explorer') {
            throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
        }
        // set the correct MIME type
        var /** @type {?} */ mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';
        // make sure no html entities exist in the data
        var /** @type {?} */ csvContent = htmlEntityDecode(options.csvContent);
        // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
        // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
        // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
        // Option#2: use a 3rd party extension to javascript encode into UTF-16
        var /** @type {?} */ outputData = '';
        if (options.format === FileType.csv) {
            outputData = new TextEncoder('utf-16be').encode(csvContent);
        }
        else {
            outputData = csvContent;
        }
        // create a Blob object for the download
        var /** @type {?} */ blob = new Blob([options.useUtf8WithBom ? '\uFEFF' : '', outputData], {
            type: mimeType + ";charset=utf-8;"
        });
        // when using IE/Edge, then use different download call
        if (typeof navigator.msSaveOrOpenBlob === 'function') {
            navigator.msSaveOrOpenBlob(blob, options.filename);
        }
        else {
            // this trick will generate a temp <a /> tag
            // the code will then trigger a hidden click for it to start downloading
            var /** @type {?} */ link = document.createElement('a');
            var /** @type {?} */ csvUrl = URL.createObjectURL(blob);
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
    return ExportService;
}());
ExportService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ExportService.ctorParameters = function () { return [
    { type: TranslateService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FilterService = /** @class */ (function () {
    /**
     * @param {?} translate
     */
    function FilterService(translate) {
        this.translate = translate;
        this._filters = [];
        this._columnFilters = {};
        this.onFilterChanged = new EventEmitter();
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} columnDefinitions
     * @return {?}
     */
    FilterService.prototype.init = function (grid, gridOptions, columnDefinitions) {
        this._grid = grid;
    };
    /**
     * Attach a backend filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} options
     * @return {?}
     */
    FilterService.prototype.attachBackendOnFilter = function (grid, options) {
        var _this = this;
        this.subscriber = new Slick.Event();
        this.emitFilterChangedBy('remote');
        this.subscriber.subscribe(this.attachBackendOnFilterSubscribe);
        this._filters = [];
        grid.onHeaderRowCellRendered.subscribe(function (e, args) {
            _this.addFilterTemplateToHeaderRow(args);
        });
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.attachBackendOnFilterSubscribe = function (event, args) {
        return __awaiter(this, void 0, void 0, function () {
            var gridOptions, backendApi, query, observableOrPromise, processResult;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args || !args.grid) {
                            throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
                        }
                        gridOptions = args.grid.getOptions() || {};
                        backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
                        if (!backendApi || !backendApi.process || !backendApi.service) {
                            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        // run a preProcess callback if defined
                        if (backendApi.preProcess) {
                            backendApi.preProcess();
                        }
                        return [4 /*yield*/, backendApi.service.onFilterChanged(event, args)];
                    case 1:
                        query = _a.sent();
                        observableOrPromise = backendApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 2:
                        processResult = _a.sent();
                        // from the result, call our internal post process to update the Dataset and Pagination info
                        if (processResult && backendApi.internalPostProcess) {
                            backendApi.internalPostProcess(processResult);
                        }
                        // send the response process to the postProcess callback
                        if (backendApi.postProcess !== undefined) {
                            backendApi.postProcess(processResult);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Clear the search filters (below the column titles)
     * @return {?}
     */
    FilterService.prototype.clearFilters = function () {
        this._filters.forEach(function (filter, index) {
            if (filter && filter.clear) {
                // clear element and trigger a change
                filter.clear(true);
            }
        });
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to clear columnFilter (without looping through) would not trigger a dataset change
        for (var /** @type {?} */ columnId in this._columnFilters) {
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
    };
    /**
     * Attach a local filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} options
     * @param {?} dataView
     * @return {?}
     */
    FilterService.prototype.attachLocalOnFilter = function (grid, options, dataView) {
        var _this = this;
        this._dataView = dataView;
        this.subscriber = new Slick.Event();
        this.emitFilterChangedBy('local');
        dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
        dataView.setFilter(this.customLocalFilter.bind(this, dataView));
        this.subscriber.subscribe(function (e, args) {
            var /** @type {?} */ columnId = args.columnId;
            if (columnId != null) {
                dataView.refresh();
            }
        });
        this._filters = [];
        grid.onHeaderRowCellRendered.subscribe(function (e, args) {
            _this.addFilterTemplateToHeaderRow(args);
        });
    };
    /**
     * @param {?} dataView
     * @param {?} item
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.customLocalFilter = function (dataView, item, args) {
        try {
            for (var _a = tslib_1.__values(Object.keys(args.columnFilters)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var columnId = _b.value;
                var /** @type {?} */ columnFilter = args.columnFilters[columnId];
                var /** @type {?} */ columnIndex = args.grid.getColumnIndex(columnId);
                var /** @type {?} */ columnDef = args.grid.getColumns()[columnIndex];
                var /** @type {?} */ fieldType = columnDef.type || FieldType.string;
                var /** @type {?} */ conditionalFilterFn = (columnDef.filter && columnDef.filter.conditionalFilter) ? columnDef.filter.conditionalFilter : null;
                var /** @type {?} */ filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
                var /** @type {?} */ cellValue = item[columnDef.queryField || columnDef.field];
                var /** @type {?} */ searchTerms = (columnFilter && columnFilter.searchTerms) ? columnFilter.searchTerms : null;
                var /** @type {?} */ fieldSearchValue = (columnFilter && (columnFilter.searchTerm !== undefined || columnFilter.searchTerm !== null)) ? columnFilter.searchTerm : undefined;
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                var /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                var /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
                var /** @type {?} */ searchTerm = (!!matches) ? matches[2] : '';
                var /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : '';
                // when using a Filter that is not a custom type, we want to make sure that we have a default operator type
                // for example a multiple-select should always be using IN, while a single select will use an EQ
                var /** @type {?} */ filterType = (columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input;
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
                // filter search terms should always be string (even though we permit the end user to input numbers)
                // so make sure each term are strings
                // run a query if user has some default search terms
                if (searchTerms && Array.isArray(searchTerms)) {
                    for (var /** @type {?} */ k = 0, /** @type {?} */ ln = searchTerms.length; k < ln; k++) {
                        // make sure all search terms are strings
                        searchTerms[k] = ((searchTerms[k] === undefined || searchTerms[k] === null) ? '' : searchTerms[k]) + '';
                    }
                }
                // when using localization (i18n), we should use the formatter output to search as the new cell value
                if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
                    var /** @type {?} */ rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
                    cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
                }
                // make sure cell value is always a string
                if (typeof cellValue === 'number') {
                    cellValue = cellValue.toString();
                }
                var /** @type {?} */ conditionOptions = {
                    fieldType: fieldType,
                    searchTerms: searchTerms,
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
    /**
     * @return {?}
     */
    FilterService.prototype.destroy = function () {
        this.destroyFilters();
        if (this.subscriber && typeof this.subscriber.unsubscribe === 'function') {
            this.subscriber.unsubscribe();
        }
    };
    /**
     * Destroy the filters, since it's a singleton, we don't want to affect other grids with same columns
     * @return {?}
     */
    FilterService.prototype.destroyFilters = function () {
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
        for (var /** @type {?} */ columnId in this._columnFilters) {
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
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.callbackSearchEvent = function (e, args) {
        var /** @type {?} */ targetValue = (e && e.target) ? ((e.target)).value : undefined;
        var /** @type {?} */ searchTerms = (args && args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : [];
        var /** @type {?} */ columnId = (args && args.columnDef) ? args.columnDef.id || '' : '';
        if (!targetValue && searchTerms.length === 0) {
            // delete the property from the columnFilters when it becomes empty
            // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
            delete this._columnFilters[columnId];
        }
        else {
            var /** @type {?} */ colId = ('' + columnId);
            this._columnFilters[colId] = {
                columnId: colId,
                columnDef: args.columnDef || null,
                searchTerms: args.searchTerms || undefined,
                searchTerm: ((e && e.target) ? ((e.target)).value : null),
                operator: args.operator || null
            };
        }
        this.triggerEvent(this.subscriber, {
            columnId: columnId,
            columnDef: args.columnDef || null,
            columnFilters: this._columnFilters,
            searchTerms: args.searchTerms || undefined,
            searchTerm: ((e && e.target) ? ((e.target)).value : null),
            serviceOptions: this._onFilterChangedOptions,
            grid: this._grid
        }, e);
    };
    /**
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.addFilterTemplateToHeaderRow = function (args) {
        var /** @type {?} */ columnDef = args.column;
        var /** @type {?} */ columnId = columnDef.id || '';
        if (columnDef && columnId !== 'selector' && columnDef.filterable) {
            var /** @type {?} */ searchTerms = (columnDef.filter && columnDef.filter.searchTerms) ? columnDef.filter.searchTerms : null;
            var /** @type {?} */ searchTerm = (columnDef.filter && (columnDef.filter.searchTerm !== undefined || columnDef.filter.searchTerm !== null)) ? columnDef.filter.searchTerm : '';
            // keep the filter in a columnFilters for later reference
            this.keepColumnFilters(searchTerm, searchTerms, columnDef);
            // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
            // because of that we need to first get searchTerm(s) from the columnFilters (that is what the user last entered)
            // if nothing is found, we can then use the optional searchTerm(s) passed to the Grid Option (that is couple of lines earlier)
            searchTerm = (this._columnFilters[columnDef.id]) ? this._columnFilters[columnDef.id].searchTerm : searchTerm || null;
            searchTerms = (this._columnFilters[columnDef.id]) ? this._columnFilters[columnDef.id].searchTerms : searchTerms || null;
            var /** @type {?} */ filterArguments = {
                grid: this._grid,
                searchTerm: searchTerm,
                searchTerms: searchTerms,
                columnDef: columnDef,
                callback: this.callbackSearchEvent.bind(this)
            };
            // depending on the Filter type, we will watch the correct event
            var /** @type {?} */ filterType = (columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input;
            var /** @type {?} */ filter_1;
            switch (filterType) {
                case FilterType.custom:
                    if (columnDef && columnDef.filter && columnDef.filter.customFilter) {
                        filter_1 = columnDef.filter.customFilter;
                    }
                    break;
                case FilterType.select:
                    filter_1 = new Filters.select(this.translate);
                    break;
                case FilterType.multipleSelect:
                    filter_1 = new Filters.multipleSelect(this.translate);
                    break;
                case FilterType.singleSelect:
                    filter_1 = new Filters.singleSelect(this.translate);
                    break;
                case FilterType.input:
                default:
                    filter_1 = new Filters.input();
                    break;
            }
            if (filter_1) {
                filter_1.init(filterArguments);
                var /** @type {?} */ filterExistIndex = this._filters.findIndex(function (filt) { return filter_1.columnDef.name === filt.columnDef.name; });
                // add to the filters arrays or replace it when found
                if (filterExistIndex === -1) {
                    this._filters.push(filter_1);
                }
                else {
                    this._filters[filterExistIndex] = filter_1;
                }
            }
        }
    };
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    FilterService.prototype.emitFilterChangedBy = function (sender) {
        var _this = this;
        this.subscriber.subscribe(function () { return _this.onFilterChanged.emit("onFilterChanged by " + sender); });
    };
    /**
     * @param {?} searchTerm
     * @param {?} searchTerms
     * @param {?} columnDef
     * @return {?}
     */
    FilterService.prototype.keepColumnFilters = function (searchTerm, searchTerms, columnDef) {
        if (searchTerm !== undefined && searchTerm !== null && searchTerm !== '') {
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef: columnDef,
                searchTerm: searchTerm,
                type: (columnDef && columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input
            };
        }
        if (searchTerms) {
            // this._columnFilters.searchTerms = searchTerms;
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef: columnDef,
                searchTerms: searchTerms,
                type: (columnDef && columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input
            };
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
    { type: Injectable },
];
/** @nocollapse */
FilterService.ctorParameters = function () { return [
    { type: TranslateService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SortService = /** @class */ (function () {
    function SortService() {
        this.onSortChanged = new EventEmitter();
    }
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} gridOptions Grid Options object
     * @return {?}
     */
    SortService.prototype.attachBackendOnSort = function (grid, gridOptions) {
        this.subscriber = grid.onSort;
        this.emitSortChangedBy('remote');
        this.subscriber.subscribe(this.attachBackendOnSortSubscribe);
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    SortService.prototype.attachBackendOnSortSubscribe = function (event, args) {
        return __awaiter(this, void 0, void 0, function () {
            var gridOptions, backendApi, query, observableOrPromise, processResult;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args || !args.grid) {
                            throw new Error('Something went wrong when trying to attach the "attachBackendOnSortSubscribe(event, args)" function, it seems that "args" is not populated correctly');
                        }
                        gridOptions = args.grid.getOptions() || {};
                        backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
                        if (!backendApi || !backendApi.process || !backendApi.service) {
                            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        if (backendApi.preProcess) {
                            backendApi.preProcess();
                        }
                        query = backendApi.service.onSortChanged(event, args);
                        observableOrPromise = backendApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 1:
                        processResult = _a.sent();
                        // from the result, call our internal post process to update the Dataset and Pagination info
                        if (processResult && backendApi.internalPostProcess) {
                            backendApi.internalPostProcess(processResult);
                        }
                        // send the response process to the postProcess callback
                        if (backendApi.postProcess) {
                            backendApi.postProcess(processResult);
                        }
                        return [2 /*return*/];
                }
            });
        });
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
        this.emitSortChangedBy('local');
        this.subscriber.subscribe(function (e, args) {
            // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
            // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
            var /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            dataView.sort(function (dataRow1, dataRow2) {
                for (var /** @type {?} */ i = 0, /** @type {?} */ l = sortColumns.length; i < l; i++) {
                    var /** @type {?} */ columnSortObj = sortColumns[i];
                    var /** @type {?} */ sortDirection = columnSortObj.sortAsc ? 1 : -1;
                    var /** @type {?} */ sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.field;
                    var /** @type {?} */ fieldType = columnSortObj.sortCol.type || 'string';
                    var /** @type {?} */ value1 = dataRow1[sortField];
                    var /** @type {?} */ value2 = dataRow2[sortField];
                    var /** @type {?} */ result = 0;
                    switch (fieldType) {
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
        if (this.subscriber && typeof this.subscriber.unsubscribe === 'function') {
            this.subscriber.unsubscribe();
        }
    };
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    SortService.prototype.emitSortChangedBy = function (sender) {
        var _this = this;
        this.subscriber.subscribe(function () { return _this.onSortChanged.emit("onSortChanged by " + sender); });
    };
    return SortService;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GridEventService = /** @class */ (function () {
    function GridEventService() {
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    GridEventService.prototype.attachOnCellChange = function (grid, gridOptions, dataView) {
        // subscribe to this Slickgrid event of onCellChange
        grid.onCellChange.subscribe(function (e, args) {
            if (!e || !args || !args.grid || args.cell === undefined || !args.grid.getColumns || !args.grid.getDataItem) {
                return;
            }
            var /** @type {?} */ column = args.grid.getColumns()[args.cell];
            // if the column definition has a onCellChange property (a callback function), then run it
            if (typeof column.onCellChange === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
                var /** @type {?} */ returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView: dataView,
                    gridDefinition: gridOptions,
                    grid: grid,
                    columnDef: column,
                    dataContext: args.grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellChanges.... function
                column.onCellChange(returnedArgs);
                // e.stopImmediatePropagation();
            }
        });
    };
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    GridEventService.prototype.attachOnClick = function (grid, gridOptions, dataView) {
        grid.onClick.subscribe(function (e, args) {
            if (!e || !args || !args.grid || args.cell === undefined || !args.grid.getColumns || !args.grid.getDataItem) {
                return;
            }
            var /** @type {?} */ column = args.grid.getColumns()[args.cell];
            // if the column definition has a onCellClick property (a callback function), then run it
            if (typeof column.onCellClick === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
                var /** @type {?} */ returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView: dataView,
                    gridDefinition: gridOptions,
                    grid: grid,
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
    };
    return GridEventService;
}());
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
var GraphqlQueryBuilder = /** @class */ (function () {
    /**
     * @param {?} queryFnName
     * @param {?=} aliasOrFilter
     */
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
     * @param {?} filters An object mapping attribute to values
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.filter = function (filters) {
        try {
            for (var _a = tslib_1.__values(Object.keys(filters)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var prop = _b.value;
                if (typeof filters[prop] === 'function') {
                    continue;
                }
                var /** @type {?} */ val = this.getGraphQLValue(filters[prop]);
                if (val === '{}') {
                    continue;
                }
                this.head.push(prop + ":" + val);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return this;
        var e_2, _c;
    };
    /**
     * Outlines the properties you wish to be returned from the query.
     * @param {...?} searches
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.find = function () {
        var searches = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            searches[_i] = arguments[_i];
        }
        // THIS NEED TO BE A "FUNCTION" to scope 'arguments'
        if (!searches) {
            throw new TypeError("find value can not be >>falsy<<");
        }
        // if its a string.. it may have other values
        // else it sould be an Object or Array of maped values
        var /** @type {?} */ searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
        this.body = this.parceFind(searchKeys);
        return this;
    };
    /**
     * set an alias for this result.
     * @param {?} alias
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.setAlias = function (alias) {
        this.alias = alias;
    };
    /**
     * Return to the formatted query string
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.toString = function () {
        if (this.body === undefined) {
            throw new ReferenceError("return properties are not defined. use the 'find' function to defined them");
        }
        return ((this.alias) ? (this.alias + ':') : '') + " " + this.queryFnName + " " + ((this.head.length > 0) ? '(' + this.head.join(',') + ')' : '') + "  { " + this.body + " }";
    };
    /**
     * @param {?} _levelA
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.parceFind = function (_levelA) {
        var /** @type {?} */ propsA = _levelA.map(function (currentValue, index) {
            var /** @type {?} */ itemX = _levelA[index];
            if (itemX instanceof GraphqlQueryBuilder) {
                return itemX.toString();
            }
            else if (!Array.isArray(itemX) && typeof itemX === 'object') {
                var /** @type {?} */ propsAA = Object.keys(itemX);
                if (1 !== propsAA.length) {
                    throw new RangeError("Alias objects should only have one value. was passed: " + JSON.stringify(itemX));
                }
                var /** @type {?} */ propS = propsAA[0];
                var /** @type {?} */ item = itemX[propS];
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
     * @param {?} value
     * @return {?}
     */
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
    /**
     * @param {?} obj
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.objectToString = function (obj) {
        var /** @type {?} */ sourceA = [];
        try {
            for (var _a = tslib_1.__values(Object.keys(obj)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var prop = _b.value;
                if (typeof obj[prop] === 'function') {
                    continue;
                }
                sourceA.push(prop + ":" + this.getGraphQLValue(obj[prop]));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return "{" + sourceA.join() + "}";
        var e_3, _c;
    };
    return GraphqlQueryBuilder;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var timer;
var DEFAULT_FILTER_TYPING_DEBOUNCE = 750;
var DEFAULT_ITEMS_PER_PAGE = 25;
var GraphqlService = /** @class */ (function () {
    /**
     * @param {?} translate
     */
    function GraphqlService(translate) {
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
    GraphqlService.prototype.buildQuery = function () {
        if (!this.options || !this.options.datasetName || (!this.options.columnIds && !this.options.dataFilters && !this.options.columnDefinitions)) {
            throw new Error('GraphQL Service requires "datasetName" & ("dataFilters" or "columnDefinitions") properties for it to work');
        }
        var /** @type {?} */ queryQb = new GraphqlQueryBuilder('query');
        var /** @type {?} */ datasetQb = new GraphqlQueryBuilder(this.options.datasetName);
        var /** @type {?} */ pageInfoQb = new GraphqlQueryBuilder('pageInfo');
        var /** @type {?} */ dataQb = (this.options.isWithCursor) ? new GraphqlQueryBuilder('edges') : new GraphqlQueryBuilder('nodes');
        // get all the columnds Ids for the filters to work
        var /** @type {?} */ columnIds;
        if (this.options.columnDefinitions) {
            columnIds = Array.isArray(this.options.columnDefinitions) ? this.options.columnDefinitions.map(function (column) { return column.field; }) : [];
        }
        else {
            columnIds = this.options.columnIds || this.options.dataFilters || [];
        }
        // Slickgrid also requires the "id" field to be part of DataView
        // push it to the GraphQL query if it wasn't already part of the list
        if (columnIds.indexOf('id') === -1) {
            columnIds.push('id');
        }
        var /** @type {?} */ filters = this.buildFilterQuery(columnIds);
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
        var /** @type {?} */ datasetFilters = Object.assign({}, this.options.paginationOptions, { first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first });
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
        var /** @type {?} */ enumSearchProperties = ['direction:', 'field:', 'operator:'];
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
     * @param {?} inputArray
     * @return {?}
     */
    GraphqlService.prototype.buildFilterQuery = function (inputArray) {
        var /** @type {?} */ set = function (o, a) {
            if (o === void 0) { o = {}; }
            var /** @type {?} */ k = a.shift();
            o[k] = a.length ? set(o[k], a) : null;
            return o;
        };
        var /** @type {?} */ output = inputArray.reduce(function (o, a) { return set(o, a.split('.')); }, {});
        return JSON.stringify(output)
            .replace(/\"|\:|null/g, '')
            .replace(/^\{/, '')
            .replace(/\}$/, '');
    };
    /**
     * @param {?=} serviceOptions
     * @param {?=} pagination
     * @return {?}
     */
    GraphqlService.prototype.initOptions = function (serviceOptions, pagination) {
        this.options = serviceOptions || {};
        this.pagination = pagination;
    };
    /**
     * Get an initialization of Pagination options
     * @return {?} Pagination Options
     */
    GraphqlService.prototype.getInitPaginationOptions = function () {
        return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
    };
    /**
     * @return {?}
     */
    GraphqlService.prototype.getDatasetName = function () {
        return this.options.datasetName || '';
    };
    /**
     * @return {?}
     */
    GraphqlService.prototype.resetPaginationOptions = function () {
        var /** @type {?} */ paginationOptions;
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
        this.updateOptions({ paginationOptions: paginationOptions });
    };
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    GraphqlService.prototype.updateOptions = function (serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GraphqlService.prototype.onFilterChanged = function (event, args) {
        var _this = this;
        var /** @type {?} */ searchByArray = [];
        var /** @type {?} */ serviceOptions = args.grid.getOptions();
        var /** @type {?} */ backendApi = serviceOptions.backendServiceApi || serviceOptions.onBackendEventApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
        }
        // only add a delay when user is typing, on select dropdown filter it will execute right away
        var /** @type {?} */ debounceTypingDelay = 0;
        if (event.type === 'keyup' || event.type === 'keydown') {
            debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
        }
        var /** @type {?} */ promise = new Promise(function (resolve, reject) {
            var /** @type {?} */ searchValue;
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying create the GraphQL Backend Service, it seems that "args" is not populated correctly');
            }
            // loop through all columns to inspect filters
            for (var /** @type {?} */ columnId in args.columnFilters) {
                if (args.columnFilters.hasOwnProperty(columnId)) {
                    var /** @type {?} */ columnFilter = args.columnFilters[columnId];
                    var /** @type {?} */ columnDef = columnFilter.columnDef;
                    var /** @type {?} */ fieldName = columnDef.queryField || columnDef.field || columnDef.name || '';
                    var /** @type {?} */ searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
                    var /** @type {?} */ fieldSearchValue = columnFilter.searchTerm;
                    if (typeof fieldSearchValue === 'undefined') {
                        fieldSearchValue = '';
                    }
                    if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                        throw new Error("GraphQL filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {type: FilterType.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                    }
                    fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                    var /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                    var /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
                    searchValue = (!!matches) ? matches[2] : '';
                    var /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : '';
                    // no need to query if search value is empty
                    if (fieldName && searchValue === '' && searchTerms.length === 0) {
                        continue;
                    }
                    // when having more than 1 search term (we need to create a CSV string for GraphQL "IN" or "NOT IN" filter search)
                    if (searchTerms && searchTerms.length > 0) {
                        searchValue = searchTerms.join(',');
                    }
                    else {
                        // escaping the search value
                        searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                        if (operator === '*' || lastValueChar === '*') {
                            operator = (operator === '*') ? 'endsWith' : 'startsWith';
                        }
                    }
                    searchByArray.push({
                        field: fieldName,
                        operator: mapOperatorType(operator),
                        value: searchValue
                    });
                }
            }
            _this.updateOptions({ filteringOptions: searchByArray });
            // reset Pagination, then build the GraphQL query which we will use in the WebAPI callback
            // wait a minimum user typing inactivity before processing any query
            clearTimeout(timer);
            timer = setTimeout(function () {
                _this.resetPaginationOptions();
                resolve(_this.buildQuery());
            }, debounceTypingDelay);
        });
        return promise;
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GraphqlService.prototype.onPaginationChanged = function (event, args) {
        var /** @type {?} */ paginationOptions;
        var /** @type {?} */ pageSize = +args.pageSize || 20;
        if (this.options.isWithCursor) {
            paginationOptions = {
                first: pageSize
            };
        }
        else {
            paginationOptions = {
                first: pageSize,
                offset: (args.newPage - 1) * pageSize
            };
        }
        this.updateOptions({ paginationOptions: paginationOptions });
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GraphqlService.prototype.onSortChanged = function (event, args) {
        var /** @type {?} */ sortByArray = [];
        var /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // build the orderBy array, it could be multisort, example
        // orderBy:[{field: lastName, direction: ASC}, {field: firstName, direction: DESC}]
        if (sortColumns && sortColumns.length === 0) {
            sortByArray = new Array(this.defaultOrderBy); // when empty, use the default sort
        }
        else {
            if (sortColumns) {
                try {
                    for (var sortColumns_1 = tslib_1.__values(sortColumns), sortColumns_1_1 = sortColumns_1.next(); !sortColumns_1_1.done; sortColumns_1_1 = sortColumns_1.next()) {
                        var column = sortColumns_1_1.value;
                        var /** @type {?} */ fieldName = column.sortCol.queryField || column.sortCol.field || column.sortCol.id;
                        var /** @type {?} */ direction = column.sortAsc ? SortDirection.ASC : SortDirection.DESC;
                        sortByArray.push({
                            field: fieldName,
                            direction: direction
                        });
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return)) _a.call(sortColumns_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        this.updateOptions({ sortingOptions: sortByArray });
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
        var e_4, _a;
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
     * @param {?} inputStr input string
     * @param {?} enumSearchWords array of enum words to filter
     * @param {?} keepArgumentFieldDoubleQuotes
     * @return {?} outputStr output string
     */
    GraphqlService.prototype.trimDoubleQuotesOnEnumField = function (inputStr, enumSearchWords, keepArgumentFieldDoubleQuotes) {
        var /** @type {?} */ patternWordInQuotes = "s?((field:s*)?\".*?\")";
        var /** @type {?} */ patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
        patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
        // example with (field: & direction:):  /field:s?(".*?")|direction:s?(".*?")/
        var /** @type {?} */ reg = new RegExp(patternRegex, 'g');
        return inputStr.replace(reg, function (group1, group2, group3) {
            // remove double quotes except when the string starts with a "field:"
            var /** @type {?} */ removeDoubleQuotes = true;
            if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
                removeDoubleQuotes = false;
            }
            var /** @type {?} */ rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
            return rep;
        });
    };
    return GraphqlService;
}());
GraphqlService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GraphqlService.ctorParameters = function () { return [
    { type: TranslateService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GridExtraService = /** @class */ (function () {
    function GridExtraService() {
    }
    /**
     * @param {?} grid
     * @param {?} columnDefinition
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    GridExtraService.prototype.init = function (grid, columnDefinition, gridOptions, dataView) {
        this._grid = grid;
        this._gridOptions = gridOptions;
        this._dataView = dataView;
    };
    /**
     * @param {?} rowNumber
     * @return {?}
     */
    GridExtraService.prototype.getDataItemByRowNumber = function (rowNumber) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(rowNumber);
    };
    /**
     * Chain the item Metadata with our implementation of Metadata at given row index
     * @param {?} previousItemMetadata
     * @return {?}
     */
    GridExtraService.prototype.getItemRowMetadata = function (previousItemMetadata) {
        var _this = this;
        return function (rowNumber) {
            var /** @type {?} */ item = _this._dataView.getItem(rowNumber);
            var /** @type {?} */ meta = {
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
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    GridExtraService.prototype.highlightRow = function (rowNumber, fadeDelay) {
        var _this = this;
        if (fadeDelay === void 0) { fadeDelay = 1500; }
        // create a SelectionModel if there's not one yet
        if (!this._grid.getSelectionModel()) {
            var /** @type {?} */ rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(rowSelectionPlugin);
        }
        this._grid.setSelectedRows([rowNumber]);
        this._dataView.getItemMetadata = this.getItemRowMetadata(this._dataView.getItemMetadata);
        var /** @type {?} */ item = this._dataView.getItem(rowNumber);
        if (item && item.id) {
            item.rowClass = 'highlight';
            this._dataView.updateItem(item.id, item);
            var /** @type {?} */ gridOptions = (this._grid.getOptions());
            // highlight the row for a user defined timeout
            $("#" + gridOptions.gridId)
                .find(".highlight.row" + rowNumber)
                .first();
            // delete the row's CSS that was attached for highlighting
            setTimeout(function () {
                if (item && item.id) {
                    delete item.rowClass;
                    var /** @type {?} */ gridIdx = _this._dataView.getIdxById(item.id);
                    if (gridIdx !== undefined) {
                        _this._dataView.updateItem(item.id, item);
                    }
                }
            }, fadeDelay + 10);
        }
    };
    /**
     * @return {?}
     */
    GridExtraService.prototype.getSelectedRows = function () {
        return this._grid.getSelectedRows();
    };
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    GridExtraService.prototype.setSelectedRow = function (rowIndex) {
        this._grid.setSelectedRows([rowIndex]);
    };
    /**
     * @param {?} rowIndexes
     * @return {?}
     */
    GridExtraService.prototype.setSelectedRows = function (rowIndexes) {
        this._grid.setSelectedRows(rowIndexes);
    };
    /**
     * @return {?}
     */
    GridExtraService.prototype.renderGrid = function () {
        if (this._grid && typeof this._grid.invalidate === 'function') {
            this._grid.invalidate();
            this._grid.render();
        }
    };
    /**
     * Add an item (data item) to the datagrid
     * @param {?} item
     * @return {?}
     */
    GridExtraService.prototype.addItemToDatagrid = function (item) {
        if (!this._grid || !this._gridOptions || !this._dataView) {
            throw new Error('We could not find SlickGrid Grid, DataView objects');
        }
        if (!this._gridOptions || (!this._gridOptions.enableCheckboxSelector && !this._gridOptions.enableRowSelection)) {
            throw new Error('addItemToDatagrid() requires to have a valid Slickgrid Selection Model. You can overcome this issue by enabling enableCheckboxSelector or enableRowSelection to True');
        }
        var /** @type {?} */ row = 0;
        this._dataView.insertItem(row, item);
        this._grid.scrollRowIntoView(0); // scroll to row 0
        this.highlightRow(0, 1500);
        // refresh dataview & grid
        this._dataView.refresh();
    };
    /**
     * Update an existing item with new properties inside the datagrid
     * @param {?} item
     * @return {?}
     */
    GridExtraService.prototype.updateDataGridItem = function (item) {
        var /** @type {?} */ row = this._dataView.getRowById(item.id);
        var /** @type {?} */ itemId = (!item || !item.hasOwnProperty('id')) ? -1 : item.id;
        if (itemId === -1) {
            throw new Error("Could not find the item in the item in the grid or it's associated \"id\"");
        }
        var /** @type {?} */ gridIdx = this._dataView.getIdxById(itemId);
        if (gridIdx !== undefined) {
            // Update the item itself inside the dataView
            this._dataView.updateItem(itemId, item);
            // highlight the row we just updated
            this.highlightRow(row, 1500);
            // refresh dataview & grid
            this._dataView.refresh();
        }
    };
    return GridExtraService;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GridExtraUtils = /** @class */ (function () {
    function GridExtraUtils() {
    }
    /**
     * @param {?} args
     * @return {?}
     */
    GridExtraUtils.getColumnDefinitionAndData = function (args) {
        if (!args || !args.grid || !args.grid.getColumns || !args.grid.getDataItem) {
            throw new Error('To get the column definition and data, we need to have these arguments passed (row, cell, grid)');
        }
        return {
            columnDef: args.grid.getColumns()[args.cell],
            dataContext: args.grid.getDataItem(args.row)
        };
    };
    return GridExtraUtils;
}());
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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            var /** @type {?} */ query = this._odataOptions.filterQueue.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
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
        var /** @type {?} */ fieldSearchTerms = filterOptions.searchTerms;
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
        try {
            for (var _a = tslib_1.__values(Object.keys(options)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var property = _b.value;
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
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var e_5, _c;
    };
    return OdataService;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var timer$1;
var DEFAULT_FILTER_TYPING_DEBOUNCE$1 = 750;
var DEFAULT_ITEMS_PER_PAGE$1 = 25;
var GridOdataService = /** @class */ (function () {
    /**
     * @param {?} odataService
     */
    function GridOdataService(odataService) {
        this.odataService = odataService;
        this.defaultOptions = {
            top: DEFAULT_ITEMS_PER_PAGE$1,
            orderBy: ''
        };
    }
    /**
     * @return {?}
     */
    GridOdataService.prototype.buildQuery = function () {
        return this.odataService.buildQuery();
    };
    /**
     * @param {?} options
     * @param {?=} pagination
     * @return {?}
     */
    GridOdataService.prototype.initOptions = function (options, pagination) {
        this.odataService.options = Object.assign({}, this.defaultOptions, options, { top: options.top || (pagination ? pagination.pageSize : null) || this.defaultOptions.top });
        this.options = options;
        this.pagination = pagination;
    };
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    GridOdataService.prototype.updateOptions = function (serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
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
        var _this = this;
        var /** @type {?} */ searchBy = '';
        var /** @type {?} */ searchByArray = [];
        var /** @type {?} */ serviceOptions = args.grid.getOptions();
        var /** @type {?} */ backendApi = serviceOptions.backendServiceApi || serviceOptions.onBackendEventApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
        }
        // only add a delay when user is typing, on select dropdown filter it will execute right away
        var /** @type {?} */ debounceTypingDelay = 0;
        if (event.type === 'keyup' || event.type === 'keydown') {
            debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE$1;
        }
        var /** @type {?} */ promise = new Promise(function (resolve, reject) {
            // loop through all columns to inspect filters
            for (var /** @type {?} */ columnId in args.columnFilters) {
                if (args.columnFilters.hasOwnProperty(columnId)) {
                    var /** @type {?} */ columnFilter = args.columnFilters[columnId];
                    var /** @type {?} */ columnDef = columnFilter.columnDef;
                    var /** @type {?} */ fieldName = columnDef.queryField || columnDef.field || columnDef.name;
                    var /** @type {?} */ fieldType = columnDef.type || 'string';
                    var /** @type {?} */ searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
                    var /** @type {?} */ fieldSearchValue = columnFilter.searchTerm;
                    if (typeof fieldSearchValue === 'undefined') {
                        fieldSearchValue = '';
                    }
                    if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                        throw new Error("ODdata filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {type: FilterType.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                    }
                    fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                    var /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                    var /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
                    var /** @type {?} */ searchValue = (!!matches) ? matches[2] : '';
                    var /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : '';
                    var /** @type {?} */ bypassOdataQuery = columnFilter.bypassBackendQuery || false;
                    // no need to query if search value is empty
                    if (fieldName && searchValue === '') {
                        _this.removeColumnFilter(fieldName);
                        continue;
                    }
                    // escaping the search value
                    searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                    searchValue = encodeURIComponent(searchValue); // encode URI of the final search value
                    // extra query arguments
                    if (bypassOdataQuery) {
                        // push to our temp array and also trim white spaces
                        if (fieldName) {
                            _this.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
                        }
                    }
                    else {
                        searchBy = '';
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
                                searchBy = tmpSearchTerms.join(' or ');
                                searchBy = "(" + searchBy + ")";
                            }
                            else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                                // example:: (Stage ne "Expired" and Stage ne "Renewal")
                                for (var /** @type {?} */ k = 0, /** @type {?} */ lnk = searchTerms.length; k < lnk; k++) {
                                    tmpSearchTerms.push(fieldNameTitleCase + " ne '" + searchTerms[k] + "'");
                                }
                                searchBy = tmpSearchTerms.join(' and ');
                                searchBy = "(" + searchBy + ")";
                            }
                        }
                        else if (operator === '*' || lastValueChar !== '') {
                            // first/last character is a '*' will be a startsWith or endsWith
                            searchBy = operator === '*'
                                ? "endswith(" + fieldNameTitleCase + ", '" + searchValue + "')"
                                : "startswith(" + fieldNameTitleCase + ", '" + searchValue + "')";
                        }
                        else if (fieldType === FieldType.date) {
                            // date field needs to be UTC and within DateTime function
                            var /** @type {?} */ dateFormatted = parseUtcDate(searchValue, true);
                            if (dateFormatted) {
                                searchBy = fieldNameTitleCase + " " + _this.mapOdataOperator(operator) + " DateTime'" + dateFormatted + "'";
                            }
                        }
                        else if (fieldType === FieldType.string) {
                            // string field needs to be in single quotes
                            searchBy = "substringof('" + searchValue + "', " + fieldNameTitleCase + ")";
                        }
                        else {
                            // any other field type (or undefined type)
                            searchValue = fieldType === FieldType.number ? searchValue : "'" + searchValue + "'";
                            searchBy = fieldNameTitleCase + " " + _this.mapOdataOperator(operator) + " " + searchValue;
                        }
                        // push to our temp array and also trim white spaces
                        if (searchBy !== '') {
                            searchByArray.push(String.trim(searchBy));
                            _this.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
                        }
                    }
                }
            }
            // build the filter query
            _this.odataService.updateOptions({
                filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
                skip: undefined
            });
            // reset Pagination, then build the OData query which we will use in the WebAPI callback
            // wait a minimum user typing inactivity before processing any query
            clearTimeout(timer$1);
            timer$1 = setTimeout(function () {
                _this.resetPaginationOptions();
                resolve(_this.odataService.buildQuery());
            }, debounceTypingDelay);
        });
        return promise;
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GridOdataService.prototype.onPaginationChanged = function (event, args) {
        var /** @type {?} */ pageSize = +args.pageSize || 20;
        this.odataService.updateOptions({
            top: pageSize,
            skip: (args.newPage - 1) * pageSize
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
            sortByArray = new Array(this.defaultOptions.orderBy); // when empty, use the default sort
        }
        else {
            if (sortColumns) {
                try {
                    for (var sortColumns_2 = tslib_1.__values(sortColumns), sortColumns_2_1 = sortColumns_2.next(); !sortColumns_2_1.done; sortColumns_2_1 = sortColumns_2.next()) {
                        var column = sortColumns_2_1.value;
                        var /** @type {?} */ fieldName = column.sortCol.queryField || column.sortCol.field || column.sortCol.id;
                        if (this.odataService.options.caseType === CaseType.pascalCase) {
                            fieldName = String.titleCase(fieldName);
                        }
                        var /** @type {?} */ direction = column.sortAsc ? 'asc' : 'desc';
                        var /** @type {?} */ sortByColumnString = fieldName + " " + direction;
                        sortByArray.push(sortByColumnString);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (sortColumns_2_1 && !sortColumns_2_1.done && (_a = sortColumns_2.return)) _a.call(sortColumns_2);
                    }
                    finally { if (e_6) throw e_6.error; }
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
        var e_6, _a;
    };
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @param {?} operator
     * @return {?} string map
     */
    GridOdataService.prototype.mapOdataOperator = function (operator) {
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
    return GridOdataService;
}());
GridOdataService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GridOdataService.ctorParameters = function () { return [
    { type: OdataService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// global constants, height/width are in pixels
var DATAGRID_MIN_HEIGHT = 180;
var DATAGRID_MIN_WIDTH = 300;
var DATAGRID_BOTTOM_PADDING = 20;
var DATAGRID_PAGINATION_HEIGHT = 35;
var timer$2;
var ResizerService = /** @class */ (function () {
    function ResizerService() {
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    ResizerService.prototype.init = function (grid, gridOptions) {
        this._grid = grid;
        this._gridOptions = gridOptions;
    };
    /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @return {?}
     */
    ResizerService.prototype.attachAutoResizeDataGrid = function () {
        var _this = this;
        // if we can't find the grid to resize, return without attaching anything
        var /** @type {?} */ gridDomElm = $("#" + (this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'));
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        this.resizeGrid();
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on('resize.grid', function () {
            // for some yet unknown reason, calling the resize twice removes any stuttering/flickering when changing the height and makes it much smoother
            _this.resizeGrid();
            _this.resizeGrid();
        });
    };
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    ResizerService.prototype.calculateGridNewDimensions = function (gridOptions) {
        var /** @type {?} */ gridDomElm = $("#" + gridOptions.gridId);
        var /** @type {?} */ containerElm = (gridOptions.autoResize && gridOptions.autoResize.containerId) ? $("#" + gridOptions.autoResize.containerId) : $("#" + gridOptions.gridContainerId);
        var /** @type {?} */ windowElm = $(window);
        if (windowElm === undefined || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        var /** @type {?} */ bottomPadding = (gridOptions.autoResize && gridOptions.autoResize.bottomPadding) ? gridOptions.autoResize.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        var /** @type {?} */ gridHeight = windowElm.height() || 0;
        var /** @type {?} */ coordOffsetTop = gridDomElm.offset();
        var /** @type {?} */ gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        var /** @type {?} */ availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        var /** @type {?} */ availableWidth = containerElm.width() || 0;
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
     * Destroy function when element is destroyed
     * @return {?}
     */
    ResizerService.prototype.destroy = function () {
        $(window).off('resize.grid');
    };
    /**
     * Resize the datagrid to fit the browser height & width
     * @param {?=} delay
     * @param {?=} newSizes
     * @return {?}
     */
    ResizerService.prototype.resizeGrid = function (delay, newSizes) {
        var _this = this;
        if (!this._grid || !this._gridOptions) {
            throw new Error("\n      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.\n      You can fix this by setting your gridOption to use \"enableAutoResize\" or create an instance of the ResizerService by calling attachAutoResizeDataGrid()");
        }
        // because of the javascript async nature, we might want to delay the resize a little bit
        delay = delay || 0;
        clearTimeout(timer$2);
        timer$2 = setTimeout(function () {
            // calculate new available sizes but with minimum height of 220px
            newSizes = newSizes || _this.calculateGridNewDimensions(_this._gridOptions);
            var /** @type {?} */ gridElm = $("#" + _this._gridOptions.gridId) || {};
            var /** @type {?} */ gridContainerElm = $("#" + _this._gridOptions.gridContainerId) || {};
            if (newSizes && gridElm.length > 0) {
                // apply these new height/width to the datagrid
                gridElm.height(newSizes.height);
                gridElm.width(newSizes.width);
                gridContainerElm.height(newSizes.height);
                gridContainerElm.width(newSizes.width);
                // resize the slickgrid canvas on all browser except some IE versions
                // exclude all IE below IE11
                // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
                if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && _this._grid) {
                    _this._grid.resizeCanvas();
                }
                // also call the grid auto-size columns so that it takes available when going bigger
                _this._grid.autosizeColumns();
            }
        }, delay);
    };
    return ResizerService;
}());
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ControlAndPluginService = /** @class */ (function () {
    /**
     * @param {?} exportService
     * @param {?} filterService
     * @param {?} translate
     */
    function ControlAndPluginService(exportService, filterService, translate) {
        this.exportService = exportService;
        this.filterService = filterService;
        this.translate = translate;
    }
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @param {?} grid
     * @param {?} columnDefinitions
     * @param {?} options
     * @param {?} dataView
     * @return {?}
     */
    ControlAndPluginService.prototype.attachDifferentControlOrPlugins = function (grid, columnDefinitions, options, dataView) {
        this._grid = grid;
        this._gridOptions = options;
        this._dataView = dataView;
        this._columnDefinitions = columnDefinitions;
        this.visibleColumns = columnDefinitions;
        if (options.enableColumnPicker) {
            this.columnPickerControl = this.createColumnPicker(grid, columnDefinitions, options);
        }
        if (options.enableGridMenu) {
            this.gridMenuControl = this.createGridMenu(grid, columnDefinitions, options);
        }
        if (options.enableAutoTooltip) {
            this.autoTooltipPlugin = new Slick.AutoTooltips(options.autoTooltipOptions || {});
            grid.registerPlugin(this.autoTooltipPlugin);
        }
        if (options.enableCheckboxSelector) {
            // when enabling the Checkbox Selector Plugin, we need to also watch onClick events to perform certain actions
            // the selector column has to be create BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
            grid.registerPlugin(this.checkboxSelectorPlugin);
            // this also requires the Row Selection Model to be registered as well
            if (!this.rowSelectionPlugin) {
                this.rowSelectionPlugin = new Slick.RowSelectionModel(options.rowSelectionOptions || {});
                grid.setSelectionModel(this.rowSelectionPlugin);
            }
        }
        if (options.enableRowSelection) {
            this.rowSelectionPlugin = new Slick.RowSelectionModel(options.rowSelectionOptions || {});
            grid.setSelectionModel(this.rowSelectionPlugin);
        }
        if (options.enableHeaderButton) {
            this.headerButtonsPlugin = new Slick.Plugins.HeaderButtons(options.headerButton || {});
            grid.registerPlugin(this.headerButtonsPlugin);
            this.headerButtonsPlugin.onCommand.subscribe(function (e, args) {
                if (options.headerButton && typeof options.headerButton.onCommand === 'function') {
                    options.headerButton.onCommand(e, args);
                }
            });
        }
        if (options.enableHeaderMenu) {
            this.headerMenuPlugin = new Slick.Plugins.HeaderMenu(options.headerMenu || {});
            grid.registerPlugin(this.headerMenuPlugin);
            this.headerMenuPlugin.onCommand.subscribe(function (e, args) {
                if (options.headerMenu && typeof options.headerMenu.onCommand === 'function') {
                    options.headerMenu.onCommand(e, args);
                }
            });
            this.headerMenuPlugin.onCommand.subscribe(function (e, args) {
                if (options.headerMenu && typeof options.headerMenu.onBeforeMenuShow === 'function') {
                    options.headerMenu.onBeforeMenuShow(e, args);
                }
            });
        }
        if (options.registerPlugins !== undefined) {
            if (Array.isArray(options.registerPlugins)) {
                options.registerPlugins.forEach(function (plugin) {
                    grid.registerPlugin(plugin);
                });
            }
            else {
                grid.registerPlugin(options.registerPlugins);
            }
        }
    };
    /**
     * @param {?} grid
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    ControlAndPluginService.prototype.createColumnPicker = function (grid, columnDefinitions, options) {
        // localization support for the picker
        var /** @type {?} */ forceFitTitle = options.enableTranslate ? this.translate.instant('FORCE_FIT_COLUMNS') : 'Force fit columns';
        var /** @type {?} */ syncResizeTitle = options.enableTranslate ? this.translate.instant('SYNCHRONOUS_RESIZE') : 'Synchronous resize';
        options.columnPicker = options.columnPicker || {};
        options.columnPicker.forceFitTitle = options.columnPicker.forceFitTitle || forceFitTitle;
        options.columnPicker.syncResizeTitle = options.columnPicker.syncResizeTitle || syncResizeTitle;
        this.columnPickerControl = new Slick.Controls.ColumnPicker(columnDefinitions, grid, options);
    };
    /**
     * Create (or re-create) Grid Menu and expose all the available hooks that user can subscribe (onCommand, onMenuClose, ...)
     * @param {?} grid
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    ControlAndPluginService.prototype.createGridMenu = function (grid, columnDefinitions, options) {
        options.gridMenu = Object.assign({}, this.getDefaultGridMenuOptions(), options.gridMenu);
        this.addGridMenuCustomCommands(grid, options);
        var /** @type {?} */ gridMenuControl = new Slick.Controls.GridMenu(columnDefinitions, grid, options);
        if (grid && options.gridMenu) {
            gridMenuControl.onBeforeMenuShow.subscribe(function (e, args) {
                if (options.gridMenu && typeof options.gridMenu.onBeforeMenuShow === 'function') {
                    options.gridMenu.onBeforeMenuShow(e, args);
                }
            });
            gridMenuControl.onCommand.subscribe(function (e, args) {
                if (options.gridMenu && typeof options.gridMenu.onCommand === 'function') {
                    options.gridMenu.onCommand(e, args);
                }
            });
            gridMenuControl.onMenuClose.subscribe(function (e, args) {
                if (options.gridMenu && typeof options.gridMenu.onMenuClose === 'function') {
                    options.gridMenu.onMenuClose(e, args);
                }
                // we also want to resize the columns if the user decided to hide certain column(s)
                if (grid && typeof grid.autosizeColumns === 'function') {
                    // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
                    var /** @type {?} */ gridUid = grid.getUID();
                    if (gridUid && $("." + gridUid).length > 0) {
                        grid.autosizeColumns();
                    }
                }
            });
        }
        return gridMenuControl;
    };
    /**
     * @param {?} column
     * @return {?}
     */
    ControlAndPluginService.prototype.hideColumn = function (column) {
        if (this._grid && this.visibleColumns) {
            var /** @type {?} */ columnIndex = this._grid.getColumnIndex(column.id);
            this.visibleColumns = this.removeColumnByIndex(this.visibleColumns, columnIndex);
            this._grid.setColumns(this.visibleColumns);
        }
    };
    /**
     * @param {?} array
     * @param {?} index
     * @return {?}
     */
    ControlAndPluginService.prototype.removeColumnByIndex = function (array, index) {
        return array.filter(function (el, i) {
            return index !== i;
        });
    };
    /**
     * @return {?}
     */
    ControlAndPluginService.prototype.autoResizeColumns = function () {
        this._grid.autosizeColumns();
    };
    /**
     * @return {?}
     */
    ControlAndPluginService.prototype.destroy = function () {
        this._grid = null;
        this._dataView = null;
        this.visibleColumns = [];
        if (this.columnPickerControl) {
            this.columnPickerControl.destroy();
            this.columnPickerControl = null;
        }
        if (this.gridMenuControl) {
            this.gridMenuControl.onBeforeMenuShow.unsubscribe();
            this.gridMenuControl.onCommand.unsubscribe();
            this.gridMenuControl.onMenuClose.unsubscribe();
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
    };
    /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @param {?} grid
     * @param {?} options
     * @return {?}
     */
    ControlAndPluginService.prototype.addGridMenuCustomCommands = function (grid, options) {
        var _this = this;
        var /** @type {?} */ backendApi = options.backendServiceApi || options.onBackendEventApi || null;
        if (options.enableFiltering) {
            // show grid menu: clear all filters
            if (options && options.gridMenu && options.gridMenu.showClearAllFiltersCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter(function (item) { return item.command === 'clear-filter'; }).length === 0) {
                options.gridMenu.customItems.push({
                    iconCssClass: 'fa fa-filter text-danger',
                    title: options.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : 'Clear All Filters',
                    disabled: false,
                    command: 'clear-filter',
                    positionOrder: 50
                });
            }
            // show grid menu: toggle filter row
            if (options && options.gridMenu && options.gridMenu.showToggleFilterCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter(function (item) { return item.command === 'toggle-filter'; }).length === 0) {
                options.gridMenu.customItems.push({
                    iconCssClass: 'fa fa-random',
                    title: options.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : 'Toggle Filter Row',
                    disabled: false,
                    command: 'toggle-filter',
                    positionOrder: 51
                });
            }
            // show grid menu: refresh dataset
            if (options && options.gridMenu && options.gridMenu.showRefreshDatasetCommand && backendApi && options.gridMenu.customItems && options.gridMenu.customItems.filter(function (item) { return item.command === 'refresh-dataset'; }).length === 0) {
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
        if (options && options.gridMenu && options.gridMenu.showExportCsvCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter(function (item) { return item.command === 'export-csv'; }).length === 0) {
            options.gridMenu.customItems.push({
                iconCssClass: 'fa fa-download',
                title: options.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : 'Export in CSV format',
                disabled: false,
                command: 'export-csv',
                positionOrder: 52
            });
        }
        // show grid menu: export to text file as tab delimited
        if (options && options.gridMenu && options.gridMenu.showExportTextDelimitedCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter(function (item) { return item.command === 'export-text-delimited'; }).length === 0) {
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
            options.gridMenu.onCommand = function (e, args) {
                if (args && args.command) {
                    switch (args.command) {
                        case 'clear-filter':
                            _this.filterService.clearFilters();
                            _this._dataView.refresh();
                            break;
                        case 'export-csv':
                            _this.exportService.exportToFile({
                                delimiter: DelimiterType.comma,
                                filename: 'export',
                                format: FileType.csv,
                                useUtf8WithBom: true
                            });
                            break;
                        case 'export-text-delimited':
                            _this.exportService.exportToFile({
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
                            _this.filterService.clearFilters();
                            _this._dataView.refresh();
                            break;
                        case 'refresh-dataset':
                            _this.refreshBackendDataset(options);
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
            var /** @type {?} */ customTitle = options.enableTranslate ? this.translate.instant('COMMANDS') : 'Commands';
            options.gridMenu.customTitle = options.gridMenu.customTitle || customTitle;
            // sort the custom items by their position in the list
            options.gridMenu.customItems.sort(function (itemA, itemB) {
                if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
                    return itemA.positionOrder - itemB.positionOrder;
                }
                return 0;
            });
        }
    };
    /**
     * @return {?} default Grid Menu options
     */
    ControlAndPluginService.prototype.getDefaultGridMenuOptions = function () {
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
    };
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    ControlAndPluginService.prototype.refreshBackendDataset = function (gridOptions) {
        var /** @type {?} */ query;
        var /** @type {?} */ backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
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
            // the process could be an Observable (like HttpClient) or a Promise
            // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
            var /** @type {?} */ observableOrPromise = backendApi.process(query);
            castToPromise(observableOrPromise).then(function (processResult) {
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
    };
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param {?} gridMenu
     * @return {?}
     */
    ControlAndPluginService.prototype.resetGridMenuTranslations = function (gridMenu) {
        // we will reset the custom items array since the commands title have to be translated too (no worries, we will re-create it later)
        gridMenu.customItems = [];
        delete gridMenu.customTitle;
        gridMenu.columnTitle = this.translate.instant('COLUMNS') || 'Columns';
        gridMenu.forceFitTitle = this.translate.instant('FORCE_FIT_COLUMNS') || 'Force fit columns';
        gridMenu.syncResizeTitle = this.translate.instant('SYNCHRONOUS_RESIZE') || 'Synchronous resize';
        return gridMenu;
    };
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * Note that the only way that seems to work is to destroy and re-create the Column Picker
     * Changing only the columnPicker.columnTitle with i18n translate was not enough.
     * @return {?}
     */
    ControlAndPluginService.prototype.translateColumnPicker = function () {
        // destroy and re-create the Column Picker which seems to be the only way to translate properly
        if (this.columnPickerControl) {
            this.columnPickerControl.destroy();
            this.columnPickerControl = null;
        }
        this._gridOptions.columnPicker = undefined;
        this.createColumnPicker(this._grid, this.visibleColumns, this._gridOptions);
    };
    /**
     * Translate the Grid Menu ColumnTitle and CustomTitle.
     * Note that the only way that seems to work is to destroy and re-create the Grid Menu
     * Changing only the gridMenu.columnTitle with i18n translate was not enough.
     * @return {?}
     */
    ControlAndPluginService.prototype.translateGridMenu = function () {
        // destroy and re-create the Grid Menu which seems to be the only way to translate properly
        this.gridMenuControl.destroy();
        // reset all Grid Menu options that have translation text & then re-create the Grid Menu and also the custom items array
        if (this._gridOptions && this._gridOptions.gridMenu) {
            this._gridOptions.gridMenu = this.resetGridMenuTranslations(this._gridOptions.gridMenu);
        }
        this.createGridMenu(this._grid, this.visibleColumns, this._gridOptions);
    };
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param {?=} locale locale to use
     * @return {?}
     */
    ControlAndPluginService.prototype.translateHeaders = function (locale) {
        if (locale) {
            this.translate.use(locale);
        }
        try {
            for (var _a = tslib_1.__values(this._columnDefinitions), _b = _a.next(); !_b.done; _b = _a.next()) {
                var column = _b.value;
                if (column.headerKey) {
                    column.name = this.translate.instant(column.headerKey);
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_7) throw e_7.error; }
        }
        // calling setColumns() will trigger a grid re-render
        this._grid.setColumns(this._columnDefinitions);
        var e_7, _c;
    };
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    ControlAndPluginService.prototype.createPluginBeforeGridCreation = function (columnDefinitions, options) {
        if (options.enableCheckboxSelector) {
            this.checkboxSelectorPlugin = new Slick.CheckboxSelectColumn(options.checkboxSelector || {});
            var /** @type {?} */ selectionColumn = this.checkboxSelectorPlugin.getColumnDefinition();
            selectionColumn.excludeFromExport = true;
            columnDefinitions.unshift(selectionColumn);
        }
    };
    return ControlAndPluginService;
}());
ControlAndPluginService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ControlAndPluginService.ctorParameters = function () { return [
    { type: ExportService, },
    { type: FilterService, },
    { type: TranslateService, },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SlickPaginationComponent = /** @class */ (function () {
    /**
     * @param {?} filterService
     * @param {?} sortService
     */
    function SlickPaginationComponent(filterService, sortService) {
        this.filterService = filterService;
        this.sortService = sortService;
        this._isFirstRender = true;
        this.dataFrom = 1;
        this.dataTo = 1;
        this.pageCount = 0;
        this.pageNumber = 1;
        this.totalItems = 0;
        this.paginationPageSizes = [25, 75, 100];
        this.fromToParams = { from: this.dataFrom, to: this.dataTo, totalItems: this.totalItems };
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
    SlickPaginationComponent.prototype.ngOnInit = function () {
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._gridPaginationOptions = this._gridPaginationOptions;
        if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
        }
        // Subscribe to Event Emitter of Filter & Sort changed, go back to page 1 when that happen
        this.filterService.onFilterChanged.subscribe(function (data) {
            _this.refreshPagination(true);
        });
        this.sortService.onSortChanged.subscribe(function (data) {
            _this.refreshPagination(true);
        });
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
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.onChangeItemPerPage = function (event) {
        var /** @type {?} */ itemsPerPage = +event.target.value;
        this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
        this.pageNumber = 1;
        this.itemsPerPage = itemsPerPage;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?=} isPageNumberReset
     * @return {?}
     */
    SlickPaginationComponent.prototype.refreshPagination = function (isPageNumberReset) {
        var /** @type {?} */ backendApi = this._gridPaginationOptions.backendServiceApi || this._gridPaginationOptions.onBackendEventApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
            // set the number of items per page if not already set
            if (!this.itemsPerPage) {
                this.itemsPerPage = +((backendApi && backendApi.options && backendApi.options.paginationOptions && backendApi.options.paginationOptions.first) ? backendApi.options.paginationOptions.first : this._gridPaginationOptions.pagination.pageSize);
            }
            // if totalItems changed, we should always go back to the first page and recalculation the From-To indexes
            if (isPageNumberReset || this.totalItems !== this._gridPaginationOptions.pagination.totalItems) {
                this.pageNumber = 1;
                this.recalculateFromToIndexes();
                // also reset the "offset" of backend service
                backendApi.service.resetPaginationOptions();
            }
            // calculate and refresh the multiple properties of the pagination UI
            this.paginationPageSizes = this._gridPaginationOptions.pagination.pageSizes;
            this.totalItems = this._gridPaginationOptions.pagination.totalItems;
            this.dataTo = (this.totalItems < this.itemsPerPage) ? this.totalItems : this.itemsPerPage;
        }
        this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    };
    /**
     * @param {?} event
     * @param {?} pageNumber
     * @return {?}
     */
    SlickPaginationComponent.prototype.onPageChanged = function (event, pageNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var backendApi, itemsPerPage, query, observableOrPromise, processResult;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.recalculateFromToIndexes();
                        backendApi = this._gridPaginationOptions.backendServiceApi || this._gridPaginationOptions.onBackendEventApi;
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
                        query = backendApi.service.onPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                        observableOrPromise = backendApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 1:
                        processResult = _a.sent();
                        // from the result, call our internal post process to update the Dataset and Pagination info
                        if (processResult && backendApi.internalPostProcess) {
                            backendApi.internalPostProcess(processResult);
                        }
                        // send the response process to the postProcess callback
                        if (backendApi.postProcess) {
                            backendApi.postProcess(processResult);
                        }
                        return [3 /*break*/, 3];
                    case 2: throw new Error('Pagination with a backend service requires "onBackendEventApi" to be defined in your grid options');
                    case 3: return [2 /*return*/];
                }
            });
        });
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
    { type: Component, args: [{
                selector: 'slick-pagination',
                template: "<div class=\"slick-pagination\">\n    <div class=\"slick-pagination-nav\">\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"pageNumber === 1 ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-first fa fa-angle-double-left\" aria-label=\"First\" (click)=\"changeToFirstPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"pageNumber === 1 ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-prev fa fa-angle-left\" aria-label=\"Previous\" (click)=\"changeToPreviousPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n        <div class=\"slick-page-number\">\n            <span [translate]=\"'PAGE_X_OF_Y'\" [translateParams]=\"{ x: pageNumber, y: pageCount }\"></span>\n        </div>\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"pageNumber === pageCount ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-next text-center fa fa-lg fa-angle-right\" aria-label=\"Next\" (click)=\"changeToNextPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"pageNumber === pageCount ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-end fa fa-lg fa-angle-double-right\" aria-label=\"Last\" (click)=\"changeToLastPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n    </div>\n    <span class=\"slick-pagination-settings\">\n        <select id=\"items-per-page-label\" [value]=\"itemsPerPage\" (change)=\"onChangeItemPerPage($event)\">\n        <option value=\"{{pageSize}}\" *ngFor=\"let pageSize of paginationPageSizes;\">{{pageSize}}</option>\n        </select>\n        <span [translate]=\"'ITEMS_PER_PAGE'\"></span>,\n        <span class=\"slick-pagination-count\">\n            <span [translate]=\"'FROM_TO_OF_TOTAL_ITEMS'\" [translateParams]=\"{ from: dataFrom, to: dataTo, totalItems: totalItems }\"></span>\n        </span>\n    </span>\n    </div>\n"
            },] },
    { type: Injectable },
];
/** @nocollapse */
SlickPaginationComponent.ctorParameters = function () { return [
    { type: FilterService, },
    { type: SortService, },
]; };
SlickPaginationComponent.propDecorators = {
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
    cellHighlightCssClass: 'slick-cell-modified',
    checkboxSelector: {
        cssClass: 'slick-cell-checkboxsel'
    },
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
var AngularSlickgridComponent = /** @class */ (function () {
    /**
     * @param {?} controlAndPluginService
     * @param {?} exportService
     * @param {?} filterService
     * @param {?} gridExtraService
     * @param {?} gridEventService
     * @param {?} resizer
     * @param {?} sortService
     * @param {?} translate
     * @param {?} forRootConfig
     */
    function AngularSlickgridComponent(controlAndPluginService, exportService, filterService, gridExtraService, gridEventService, resizer, sortService, translate, forRootConfig) {
        this.controlAndPluginService = controlAndPluginService;
        this.exportService = exportService;
        this.filterService = filterService;
        this.gridExtraService = gridExtraService;
        this.gridEventService = gridEventService;
        this.resizer = resizer;
        this.sortService = sortService;
        this.translate = translate;
        this.forRootConfig = forRootConfig;
        this.groupingDefinition = {};
        this.showPagination = false;
        this.dataviewChanged = new EventEmitter();
        this.gridChanged = new EventEmitter();
        this.onDataviewCreated = new EventEmitter();
        this.onGridCreated = new EventEmitter();
        this.onBeforeGridCreate = new EventEmitter();
        this.onBeforeGridDestroy = new EventEmitter();
        this.onAfterGridDestroyed = new EventEmitter();
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
        this.onBeforeGridCreate.emit(true);
        this.gridHeightString = this.gridHeight + "px";
        this.gridWidthString = this.gridWidth + "px";
    };
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.ngOnDestroy = function () {
        this.onBeforeGridDestroy.emit(this.grid);
        this.destroy();
        this.onAfterGridDestroyed.emit(true);
    };
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.destroy = function () {
        this._dataView = [];
        this._gridOptions = {};
        this.grid.destroy();
        this.controlAndPluginService.destroy();
        this.filterService.destroy();
        this.resizer.destroy();
        this.sortService.destroy();
    };
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.ngAfterViewInit = function () {
        // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
        this._dataset = this._dataset || [];
        this._gridOptions = this.mergeGridOptions();
        this.createBackendApiInternalPostProcessCallback(this._gridOptions);
        this._dataView = new Slick.Data.DataView();
        this.controlAndPluginService.createPluginBeforeGridCreation(this.columnDefinitions, this._gridOptions);
        this.grid = new Slick.Grid("#" + this.gridId, this._dataView, this.columnDefinitions, this._gridOptions);
        this.controlAndPluginService.attachDifferentControlOrPlugins(this.grid, this.columnDefinitions, this._gridOptions, this._dataView);
        this.attachDifferentHooks(this.grid, this._gridOptions, this._dataView);
        // emit the Grid & DataView object to make them available in parent component
        this.onGridCreated.emit(this.grid);
        this.onDataviewCreated.emit(this._dataView);
        // OBSOLETE in future releases, previous emitter functions (decided to rename them with onX prefix)
        this.gridChanged.emit('DEPRECATED and replaced by "onGridCreated" Event Emitter.');
        this.dataviewChanged.emit('DEPRECATED and replaced by "onDataviewCreated" Event Emitter.');
        this.grid.init();
        this._dataView.beginUpdate();
        this._dataView.setItems(this._dataset);
        this._dataView.endUpdate();
        // attach resize ONLY after the dataView is ready
        this.attachResizeHook(this.grid, this._gridOptions);
        // attach grid extra service
        this.gridExtraService.init(this.grid, this.columnDefinitions, this._gridOptions, this._dataView);
        // when user enables translation, we need to translate Headers on first pass & subsequently in the attachDifferentHooks
        if (this._gridOptions.enableTranslate) {
            this.controlAndPluginService.translateHeaders();
        }
        // if Export is enabled, initialize the service with the necessary grid and other objects
        if (this._gridOptions.enableExport) {
            this.exportService.init(this.grid, this._gridOptions, this._dataView);
        }
    };
    /**
     * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service only feautre and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     * @param {?} gridOptions
     * @return {?}
     */
    AngularSlickgridComponent.prototype.createBackendApiInternalPostProcessCallback = function (gridOptions) {
        var _this = this;
        if (gridOptions && (gridOptions.backendServiceApi || gridOptions.onBackendEventApi)) {
            var /** @type {?} */ backendApi_1 = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
            // internalPostProcess only works with a GraphQL Service, so make sure it is that type
            if (backendApi_1 && backendApi_1.service && backendApi_1.service instanceof GraphqlService) {
                backendApi_1.internalPostProcess = function (processResult) {
                    var /** @type {?} */ datasetName = (backendApi_1 && backendApi_1.service && typeof backendApi_1.service.getDatasetName === 'function') ? backendApi_1.service.getDatasetName() : '';
                    if (!processResult || !processResult.data || !processResult.data[datasetName]) {
                        throw new Error("Your GraphQL result is invalid and/or does not follow the required result structure. Please check the result and/or review structure to use in Angular-Slickgrid Wiki in the GraphQL section.");
                    }
                    _this._dataset = processResult.data[datasetName].nodes;
                    _this.refreshGridData(_this._dataset, processResult.data[datasetName].totalCount);
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
    AngularSlickgridComponent.prototype.attachDifferentHooks = function (grid, gridOptions, dataView) {
        var _this = this;
        // on locale change, we have to manually translate the Headers, GridMenu
        this.translate.onLangChange.subscribe(function (event) {
            if (gridOptions.enableTranslate) {
                _this.controlAndPluginService.translateHeaders();
                _this.controlAndPluginService.translateColumnPicker();
                _this.controlAndPluginService.translateGridMenu();
            }
        });
        // attach external sorting (backend) when available or default onSort (dataView)
        if (gridOptions.enableSorting) {
            (gridOptions.backendServiceApi || gridOptions.onBackendEventApi) ? this.sortService.attachBackendOnSort(grid, gridOptions) : this.sortService.attachLocalOnSort(grid, gridOptions, this._dataView);
        }
        // attach external filter (backend) when available or default onFilter (dataView)
        if (gridOptions.enableFiltering) {
            this.filterService.init(grid, gridOptions, this.columnDefinitions);
            (gridOptions.backendServiceApi || gridOptions.onBackendEventApi) ? this.filterService.attachBackendOnFilter(grid, gridOptions) : this.filterService.attachLocalOnFilter(grid, gridOptions, this._dataView);
        }
        // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
        if (gridOptions.backendServiceApi || gridOptions.onBackendEventApi) {
            if (gridOptions.onBackendEventApi) {
                console.warn("\"onBackendEventApi\" has been DEPRECATED, please consider using \"backendServiceApi\" in the short term since \"onBackendEventApi\" will be removed in future versions. You can take look at the Angular-Slickgrid Wikis for OData/GraphQL Services implementation");
            }
            if (gridOptions.backendServiceApi && gridOptions.backendServiceApi.service) {
                gridOptions.backendServiceApi.service.initOptions(gridOptions.backendServiceApi.options || {}, gridOptions.pagination);
            }
            var /** @type {?} */ backendApi_2 = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
            var /** @type {?} */ serviceOptions = (backendApi_2 && backendApi_2.service && backendApi_2.service.options) ? backendApi_2.service.options : {};
            var /** @type {?} */ isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
            if (backendApi_2 && backendApi_2.service && (backendApi_2.onInit || isExecuteCommandOnInit)) {
                var /** @type {?} */ query = (typeof backendApi_2.service.buildQuery === 'function') ? backendApi_2.service.buildQuery() : '';
                var /** @type {?} */ observableOrPromise_1 = (isExecuteCommandOnInit) ? backendApi_2.process(query) : backendApi_2.onInit(query);
                // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var processResult;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (backendApi_2.preProcess) {
                                    backendApi_2.preProcess();
                                }
                                return [4 /*yield*/, castToPromise(observableOrPromise_1)];
                            case 1:
                                processResult = _a.sent();
                                // define what our internal Post Process callback, only available for GraphQL Service for now
                                // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
                                if (processResult && backendApi_2 && backendApi_2.service instanceof GraphqlService && backendApi_2.internalPostProcess) {
                                    backendApi_2.internalPostProcess(processResult);
                                }
                                // send the response process to the postProcess callback
                                if (backendApi_2.postProcess) {
                                    backendApi_2.postProcess(processResult);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
        }
        // on cell click, mainly used with the columnDef.action callback
        this.gridEventService.attachOnCellChange(grid, this._gridOptions, dataView);
        this.gridEventService.attachOnClick(grid, this._gridOptions, dataView);
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
    };
    /**
     * @return {?}
     */
    AngularSlickgridComponent.prototype.mergeGridOptions = function () {
        this.gridOptions.gridId = this.gridId;
        this.gridOptions.gridContainerId = "slickGridContainer-" + this.gridId;
        if (this.gridOptions.enableFiltering || this.forRootConfig.enableFiltering) {
            this.gridOptions.showHeaderRow = true;
        }
        // use jquery extend to deep merge and avoid immutable properties changed in GlobalGridOptions after route change
        return $.extend(true, {}, GlobalGridOptions, this.forRootConfig, this.gridOptions);
    };
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param {?} dataset
     * @param {?=} totalCount
     * @return {?}
     */
    AngularSlickgridComponent.prototype.refreshGridData = function (dataset, totalCount) {
        if (dataset && this.grid) {
            this._dataView.setItems(dataset);
            // this.grid.setData(dataset);
            this.grid.invalidate();
            this.grid.render();
            if (this._gridOptions.enablePagination || this._gridOptions.backendServiceApi) {
                // do we want to show pagination?
                // if we have a backendServiceApi and the enablePagination is undefined, we'll assume that we do want to see it, else get that defined value
                this.showPagination = ((this._gridOptions.backendServiceApi && this._gridOptions.enablePagination === undefined) ? true : this._gridOptions.enablePagination) || false;
                // before merging the grid options, make sure that it has the totalItems count
                // once we have that, we can merge and pass all these options to the pagination component
                if (!this.gridOptions.pagination) {
                    this.gridOptions.pagination = (this._gridOptions.pagination) ? this._gridOptions.pagination : undefined;
                }
                if (this.gridOptions.pagination && totalCount) {
                    this.gridOptions.pagination.totalItems = totalCount;
                }
                this.gridPaginationOptions = this.mergeGridOptions();
            }
            if (this.grid && this._gridOptions.enableAutoResize) {
                // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
                this.resizer.resizeGrid(10);
                // this.grid.autosizeColumns();
            }
        }
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
    return AngularSlickgridComponent;
}());
AngularSlickgridComponent.decorators = [
    { type: Injectable },
    { type: Component, args: [{
                selector: 'angular-slickgrid',
                template: "\n    <div id=\"slickGridContainer-{{gridId}}\" class=\"gridPane\">\n    <div attr.id='{{gridId}}'\n            class=\"slickgrid-container\"\n            [style.height]=\"gridHeightString\"\n            [style.width]=\"gridWidthString\">\n    </div>\n    <slick-pagination id=\"slickPagingContainer-{{gridId}}\" *ngIf=\"showPagination\" [gridPaginationOptions]=\"gridPaginationOptions\"></slick-pagination>\n    </div>\n  "
            },] },
];
/** @nocollapse */
AngularSlickgridComponent.ctorParameters = function () { return [
    { type: ControlAndPluginService, },
    { type: ExportService, },
    { type: FilterService, },
    { type: GridExtraService, },
    { type: GridEventService, },
    { type: ResizerService, },
    { type: SortService, },
    { type: TranslateService, },
    { type: undefined, decorators: [{ type: Inject, args: ['config',] },] },
]; };
AngularSlickgridComponent.propDecorators = {
    "dataviewChanged": [{ type: Output },],
    "gridChanged": [{ type: Output },],
    "onDataviewCreated": [{ type: Output },],
    "onGridCreated": [{ type: Output },],
    "onBeforeGridCreate": [{ type: Output },],
    "onBeforeGridDestroy": [{ type: Output },],
    "onAfterGridDestroyed": [{ type: Output },],
    "gridId": [{ type: Input },],
    "columnDefinitions": [{ type: Input },],
    "gridOptions": [{ type: Input },],
    "gridHeight": [{ type: Input },],
    "gridWidth": [{ type: Input },],
    "dataset": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AngularSlickgridModule = /** @class */ (function () {
    function AngularSlickgridModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    AngularSlickgridModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: AngularSlickgridModule,
            providers: [
                { provide: 'config', useValue: config },
                ControlAndPluginService,
                ExportService,
                FilterService,
                GraphqlService,
                GridEventService,
                GridExtraService,
                GridOdataService,
                OdataService,
                ResizerService,
                SortService
            ]
        };
    };
    return AngularSlickgridModule;
}());
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
AngularSlickgridModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export { CaseType, DelimiterType, FieldType, FileType, FilterType, FormElementType, KeyCode, OperatorType, SortDirection, Editors, FilterConditions, Filters, Formatters, Sorters, ExportService, FilterService, SortService, GridEventService, GraphqlService, GridExtraService, GridExtraUtils, GridOdataService, OdataService, ResizerService, ControlAndPluginService, SlickPaginationComponent, AngularSlickgridComponent, AngularSlickgridModule, CheckboxEditor as ɵa, DateEditor as ɵb, FloatEditor as ɵc, IntegerEditor as ɵd, LongTextEditor as ɵe, TextEditor as ɵf, booleanFilterCondition as ɵh, collectionSearchFilterCondition as ɵi, dateFilterCondition as ɵj, dateIsoFilterCondition as ɵk, dateUsFilterCondition as ɵm, dateUsShortFilterCondition as ɵn, dateUtcFilterCondition as ɵl, executeMappedCondition as ɵg, testFilterCondition as ɵq, numberFilterCondition as ɵo, stringFilterCondition as ɵp, InputFilter as ɵr, MultipleSelectFilter as ɵs, SelectFilter as ɵu, SingleSelectFilter as ɵt, arrayToCsvFormatter as ɵv, checkboxFormatter as ɵw, checkmarkFormatter as ɵx, complexObjectFormatter as ɵy, dateIsoFormatter as ɵz, dateTimeIsoAmPmFormatter as ɵba, dateTimeUsAmPmFormatter as ɵbd, dateTimeUsFormatter as ɵbc, dateUsFormatter as ɵbb, deleteIconFormatter as ɵbe, editIconFormatter as ɵbf, hyperlinkFormatter as ɵbg, infoIconFormatter as ɵbh, percentCompleteBarFormatter as ɵbj, percentCompleteFormatter as ɵbi, progressBarFormatter as ɵbk, translateFormatter as ɵbl, yesNoFormatter as ɵbm, dateIsoSorter as ɵbo, dateSorter as ɵbn, dateUsShortSorter as ɵbq, dateUsSorter as ɵbp, numericSorter as ɵbr, stringSorter as ɵbs };
//# sourceMappingURL=angular-slickgrid.js.map
