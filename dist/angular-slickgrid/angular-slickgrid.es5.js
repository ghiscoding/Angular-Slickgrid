var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
import { Observable as Observable$1 } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import { Component, Injectable, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
var OperatorType = {};
OperatorType.contains = /** @type {?} */ ('Contains');
OperatorType.lessThan = /** @type {?} */ ('LT');
OperatorType.lessThanOrEqual = /** @type {?} */ ('LE');
OperatorType.greaterThan = /** @type {?} */ ('GT');
OperatorType.greaterThanOrEqual = /** @type {?} */ ('GE');
OperatorType.notEqual = /** @type {?} */ ('NE');
OperatorType.equal = /** @type {?} */ ('EQ');
OperatorType.endsWith = /** @type {?} */ ('EndsWith');
OperatorType.startsWith = /** @type {?} */ ('StartsWith');
OperatorType.in = /** @type {?} */ ('IN');
OperatorType.notIn = /** @type {?} */ ('NIN');
OperatorType[OperatorType.contains] = "contains";
OperatorType[OperatorType.lessThan] = "lessThan";
OperatorType[OperatorType.lessThanOrEqual] = "lessThanOrEqual";
OperatorType[OperatorType.greaterThan] = "greaterThan";
OperatorType[OperatorType.greaterThanOrEqual] = "greaterThanOrEqual";
OperatorType[OperatorType.notEqual] = "notEqual";
OperatorType[OperatorType.equal] = "equal";
OperatorType[OperatorType.endsWith] = "endsWith";
OperatorType[OperatorType.startsWith] = "startsWith";
OperatorType[OperatorType.in] = "in";
OperatorType[OperatorType.notIn] = "notIn";
var SortDirection = {};
SortDirection.ASC = /** @type {?} */ ('ASC');
SortDirection.DESC = /** @type {?} */ ('DESC');
SortDirection[SortDirection.ASC] = "ASC";
SortDirection[SortDirection.DESC] = "DESC";
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
var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function commonjsRequire() {
    throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}
function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var moment_min = createCommonjsModule(function (module, exports) {
    //! moment.js
    //! version : 2.18.1
    //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
    //! license : MIT
    //! momentjs.com
    !function (a, b) { module.exports = b(); }(commonjsGlobal, function () {
        "use strict";
        function a() { return sd.apply(null, arguments); }
        function b(a) { sd = a; }
        function c(a) { return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a); }
        function d(a) { return null != a && "[object Object]" === Object.prototype.toString.call(a); }
        function e(a) { var b; for (b in a)
            return !1; return !0; }
        function f(a) { return void 0 === a; }
        function g(a) { return "number" == typeof a || "[object Number]" === Object.prototype.toString.call(a); }
        function h(a) { return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a); }
        function i(a, b) { var c, d = []; for (c = 0; c < a.length; ++c)
            d.push(b(a[c], c)); return d; }
        function j(a, b) { return Object.prototype.hasOwnProperty.call(a, b); }
        function k(a, b) { for (var c in b)
            j(b, c) && (a[c] = b[c]); return j(b, "toString") && (a.toString = b.toString), j(b, "valueOf") && (a.valueOf = b.valueOf), a; }
        function l(a, b, c, d) { return sb(a, b, c, d, !0).utc(); }
        function m() { return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], meridiem: null, rfc2822: !1, weekdayMismatch: !1 }; }
        function n(a) { return null == a._pf && (a._pf = m()), a._pf; }
        function o(a) { if (null == a._isValid) {
            var b = n(a), c = ud.call(b.parsedDateParts, function (a) { return null != a; }), d = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c);
            if (a._strict && (d = d && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour), null != Object.isFrozen && Object.isFrozen(a))
                return d;
            a._isValid = d;
        } return a._isValid; }
        function p(a) { var b = l(NaN); return null != a ? k(n(b), a) : n(b).userInvalidated = !0, b; }
        function q(a, b) { var c, d, e; if (f(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), f(b._i) || (a._i = b._i), f(b._f) || (a._f = b._f), f(b._l) || (a._l = b._l), f(b._strict) || (a._strict = b._strict), f(b._tzm) || (a._tzm = b._tzm), f(b._isUTC) || (a._isUTC = b._isUTC), f(b._offset) || (a._offset = b._offset), f(b._pf) || (a._pf = n(b)), f(b._locale) || (a._locale = b._locale), vd.length > 0)
            for (c = 0; c < vd.length; c++)
                d = vd[c], e = b[d], f(e) || (a[d] = e); return a; }
        function r(b) { q(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), wd === !1 && (wd = !0, a.updateOffset(this), wd = !1); }
        function s(a) { return a instanceof r || null != a && null != a._isAMomentObject; }
        function t(a) { return a < 0 ? Math.ceil(a) || 0 : Math.floor(a); }
        function u(a) { var b = +a, c = 0; return 0 !== b && isFinite(b) && (c = t(b)), c; }
        function v(a, b, c) { var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0; for (d = 0; d < e; d++)
            (c && a[d] !== b[d] || !c && u(a[d]) !== u(b[d])) && g++; return g + f; }
        function w(b) { a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b); }
        function x(b, c) { var d = !0; return k(function () { if (null != a.deprecationHandler && a.deprecationHandler(null, b), d) {
            for (var e, f = [], g = 0; g < arguments.length; g++) {
                if (e = "", "object" == typeof arguments[g]) {
                    e += "\n[" + g + "] ";
                    for (var h in arguments[0])
                        e += h + ": " + arguments[0][h] + ", ";
                    e = e.slice(0, -2);
                }
                else
                    e = arguments[g];
                f.push(e);
            }
            w(b + "\nArguments: " + Array.prototype.slice.call(f).join("") + "\n" + (new Error).stack), d = !1;
        } return c.apply(this, arguments); }, c); }
        function y(b, c) { null != a.deprecationHandler && a.deprecationHandler(b, c), xd[b] || (w(c), xd[b] = !0); }
        function z(a) { return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a); }
        function A(a) { var b, c; for (c in a)
            b = a[c], z(b) ? this[c] = b : this["_" + c] = b; this._config = a, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source); }
        function B(a, b) { var c, e = k({}, a); for (c in b)
            j(b, c) && (d(a[c]) && d(b[c]) ? (e[c] = {}, k(e[c], a[c]), k(e[c], b[c])) : null != b[c] ? e[c] = b[c] : delete e[c]); for (c in a)
            j(a, c) && !j(b, c) && d(a[c]) && (e[c] = k({}, e[c])); return e; }
        function C(a) { null != a && this.set(a); }
        function D(a, b, c) { var d = this._calendar[a] || this._calendar.sameElse; return z(d) ? d.call(b, c) : d; }
        function E(a) { var b = this._longDateFormat[a], c = this._longDateFormat[a.toUpperCase()]; return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) { return a.slice(1); }), this._longDateFormat[a]); }
        function F() { return this._invalidDate; }
        function G(a) { return this._ordinal.replace("%d", a); }
        function H(a, b, c, d) { var e = this._relativeTime[c]; return z(e) ? e(a, b, c, d) : e.replace(/%d/i, a); }
        function I(a, b) { var c = this._relativeTime[a > 0 ? "future" : "past"]; return z(c) ? c(b) : c.replace(/%s/i, b); }
        function J(a, b) { var c = a.toLowerCase(); Hd[c] = Hd[c + "s"] = Hd[b] = a; }
        function K(a) { return "string" == typeof a ? Hd[a] || Hd[a.toLowerCase()] : void 0; }
        function L(a) { var b, c, d = {}; for (c in a)
            j(a, c) && (b = K(c), b && (d[b] = a[c])); return d; }
        function M(a, b) { Id[a] = b; }
        function N(a) { var b = []; for (var c in a)
            b.push({ unit: c, priority: Id[c] }); return b.sort(function (a, b) { return a.priority - b.priority; }), b; }
        function O(b, c) { return function (d) { return null != d ? (Q(this, b, d), a.updateOffset(this, c), this) : P(this, b); }; }
        function P(a, b) { return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN; }
        function Q(a, b, c) { a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c); }
        function R(a) { return a = K(a), z(this[a]) ? this[a]() : this; }
        function S(a, b) { if ("object" == typeof a) {
            a = L(a);
            for (var c = N(a), d = 0; d < c.length; d++)
                this[c[d].unit](a[c[d].unit]);
        }
        else if (a = K(a), z(this[a]))
            return this[a](b); return this; }
        function T(a, b, c) { var d = "" + Math.abs(a), e = b - d.length, f = a >= 0; return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d; }
        function U(a, b, c, d) { var e = d; "string" == typeof d && (e = function () { return this[d](); }), a && (Md[a] = e), b && (Md[b[0]] = function () { return T(e.apply(this, arguments), b[1], b[2]); }), c && (Md[c] = function () { return this.localeData().ordinal(e.apply(this, arguments), a); }); }
        function V(a) { return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, ""); }
        function W(a) { var b, c, d = a.match(Jd); for (b = 0, c = d.length; b < c; b++)
            Md[d[b]] ? d[b] = Md[d[b]] : d[b] = V(d[b]); return function (b) { var e, f = ""; for (e = 0; e < c; e++)
            f += z(d[e]) ? d[e].call(b, a) : d[e]; return f; }; }
        function X(a, b) { return a.isValid() ? (b = Y(b, a.localeData()), Ld[b] = Ld[b] || W(b), Ld[b](a)) : a.localeData().invalidDate(); }
        function Y(a, b) { function c(a) { return b.longDateFormat(a) || a; } var d = 5; for (Kd.lastIndex = 0; d >= 0 && Kd.test(a);)
            a = a.replace(Kd, c), Kd.lastIndex = 0, d -= 1; return a; }
        function Z(a, b, c) { ce[a] = z(b) ? b : function (a, d) { return a && c ? c : b; }; }
        function $(a, b) { return j(ce, a) ? ce[a](b._strict, b._locale) : new RegExp(_(a)); }
        function _(a) { return aa(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) { return b || c || d || e; })); }
        function aa(a) { return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); }
        function ba(a, b) { var c, d = b; for ("string" == typeof a && (a = [a]), g(b) && (d = function (a, c) { c[b] = u(a); }), c = 0; c < a.length; c++)
            de[a[c]] = d; }
        function ca(a, b) { ba(a, function (a, c, d, e) { d._w = d._w || {}, b(a, d._w, d, e); }); }
        function da(a, b, c) { null != b && j(de, a) && de[a](b, c._a, c, a); }
        function ea(a, b) { return new Date(Date.UTC(a, b + 1, 0)).getUTCDate(); }
        function fa(a, b) { return a ? c(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || oe).test(b) ? "format" : "standalone"][a.month()] : c(this._months) ? this._months : this._months.standalone; }
        function ga(a, b) { return a ? c(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[oe.test(b) ? "format" : "standalone"][a.month()] : c(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone; }
        function ha(a, b, c) { var d, e, f, g = a.toLocaleLowerCase(); if (!this._monthsParse)
            for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; d < 12; ++d)
                f = l([2e3, d]), this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(), this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase(); return c ? "MMM" === b ? (e = ne.call(this._shortMonthsParse, g), e !== -1 ? e : null) : (e = ne.call(this._longMonthsParse, g), e !== -1 ? e : null) : "MMM" === b ? (e = ne.call(this._shortMonthsParse, g), e !== -1 ? e : (e = ne.call(this._longMonthsParse, g), e !== -1 ? e : null)) : (e = ne.call(this._longMonthsParse, g), e !== -1 ? e : (e = ne.call(this._shortMonthsParse, g), e !== -1 ? e : null)); }
        function ia(a, b, c) { var d, e, f; if (this._monthsParseExact)
            return ha.call(this, a, b, c); for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; d < 12; d++) {
            if (e = l([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a))
                return d;
            if (c && "MMM" === b && this._shortMonthsParse[d].test(a))
                return d;
            if (!c && this._monthsParse[d].test(a))
                return d;
        } }
        function ja(a, b) { var c; if (!a.isValid())
            return a; if ("string" == typeof b)
            if (/^\d+$/.test(b))
                b = u(b);
            else if (b = a.localeData().monthsParse(b), !g(b))
                return a; return c = Math.min(a.date(), ea(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a; }
        function ka(b) { return null != b ? (ja(this, b), a.updateOffset(this, !0), this) : P(this, "Month"); }
        function la() { return ea(this.year(), this.month()); }
        function ma(a) { return this._monthsParseExact ? (j(this, "_monthsRegex") || oa.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : (j(this, "_monthsShortRegex") || (this._monthsShortRegex = re), this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex); }
        function na(a) { return this._monthsParseExact ? (j(this, "_monthsRegex") || oa.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : (j(this, "_monthsRegex") || (this._monthsRegex = se), this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex); }
        function oa() { function a(a, b) { return b.length - a.length; } var b, c, d = [], e = [], f = []; for (b = 0; b < 12; b++)
            c = l([2e3, b]), d.push(this.monthsShort(c, "")), e.push(this.months(c, "")), f.push(this.months(c, "")), f.push(this.monthsShort(c, "")); for (d.sort(a), e.sort(a), f.sort(a), b = 0; b < 12; b++)
            d[b] = aa(d[b]), e[b] = aa(e[b]); for (b = 0; b < 24; b++)
            f[b] = aa(f[b]); this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i"); }
        function pa(a) { return qa(a) ? 366 : 365; }
        function qa(a) { return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0; }
        function ra() { return qa(this.year()); }
        function sa(a, b, c, d, e, f, g) { var h = new Date(a, b, c, d, e, f, g); return a < 100 && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h; }
        function ta(a) { var b = new Date(Date.UTC.apply(null, arguments)); return a < 100 && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b; }
        function ua(a, b, c) { var d = 7 + b - c, e = (7 + ta(a, 0, d).getUTCDay() - b) % 7; return -e + d - 1; }
        function va(a, b, c, d, e) { var f, g, h = (7 + c - d) % 7, i = ua(a, d, e), j = 1 + 7 * (b - 1) + h + i; return j <= 0 ? (f = a - 1, g = pa(f) + j) : j > pa(a) ? (f = a + 1, g = j - pa(a)) : (f = a, g = j), { year: f, dayOfYear: g }; }
        function wa(a, b, c) { var d, e, f = ua(a.year(), b, c), g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1; return g < 1 ? (e = a.year() - 1, d = g + xa(e, b, c)) : g > xa(a.year(), b, c) ? (d = g - xa(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g), { week: d, year: e }; }
        function xa(a, b, c) { var d = ua(a, b, c), e = ua(a + 1, b, c); return (pa(a) - d + e) / 7; }
        function ya(a) { return wa(a, this._week.dow, this._week.doy).week; }
        function za() { return this._week.dow; }
        function Aa() { return this._week.doy; }
        function Ba(a) { var b = this.localeData().week(this); return null == a ? b : this.add(7 * (a - b), "d"); }
        function Ca(a) { var b = wa(this, 1, 4).week; return null == a ? b : this.add(7 * (a - b), "d"); }
        function Da(a, b) { return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10); }
        function Ea(a, b) { return "string" == typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a; }
        function Fa(a, b) { return a ? c(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()] : c(this._weekdays) ? this._weekdays : this._weekdays.standalone; }
        function Ga(a) { return a ? this._weekdaysShort[a.day()] : this._weekdaysShort; }
        function Ha(a) { return a ? this._weekdaysMin[a.day()] : this._weekdaysMin; }
        function Ia(a, b, c) { var d, e, f, g = a.toLocaleLowerCase(); if (!this._weekdaysParse)
            for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; d < 7; ++d)
                f = l([2e3, 1]).day(d), this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(), this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(), this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase(); return c ? "dddd" === b ? (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : null) : "ddd" === b ? (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : null) : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : null) : "dddd" === b ? (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : null))) : "ddd" === b ? (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : null))) : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : null))); }
        function Ja(a, b, c) { var d, e, f; if (this._weekdaysParseExact)
            return Ia.call(this, a, b, c); for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; d < 7; d++) {
            if (e = l([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a))
                return d;
            if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a))
                return d;
            if (c && "dd" === b && this._minWeekdaysParse[d].test(a))
                return d;
            if (!c && this._weekdaysParse[d].test(a))
                return d;
        } }
        function Ka(a) { if (!this.isValid())
            return null != a ? this : NaN; var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay(); return null != a ? (a = Da(a, this.localeData()), this.add(a - b, "d")) : b; }
        function La(a) { if (!this.isValid())
            return null != a ? this : NaN; var b = (this.day() + 7 - this.localeData()._week.dow) % 7; return null == a ? b : this.add(a - b, "d"); }
        function Ma(a) { if (!this.isValid())
            return null != a ? this : NaN; if (null != a) {
            var b = Ea(a, this.localeData());
            return this.day(this.day() % 7 ? b : b - 7);
        } return this.day() || 7; }
        function Na(a) { return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Qa.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : (j(this, "_weekdaysRegex") || (this._weekdaysRegex = ye), this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex); }
        function Oa(a) { return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Qa.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (j(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = ze), this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex); }
        function Pa(a) { return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Qa.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (j(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ae), this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex); }
        function Qa() { function a(a, b) { return b.length - a.length; } var b, c, d, e, f, g = [], h = [], i = [], j = []; for (b = 0; b < 7; b++)
            c = l([2e3, 1]).day(b), d = this.weekdaysMin(c, ""), e = this.weekdaysShort(c, ""), f = this.weekdays(c, ""), g.push(d), h.push(e), i.push(f), j.push(d), j.push(e), j.push(f); for (g.sort(a), h.sort(a), i.sort(a), j.sort(a), b = 0; b < 7; b++)
            h[b] = aa(h[b]), i[b] = aa(i[b]), j[b] = aa(j[b]); this._weekdaysRegex = new RegExp("^(" + j.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + g.join("|") + ")", "i"); }
        function Ra() { return this.hours() % 12 || 12; }
        function Sa() { return this.hours() || 24; }
        function Ta(a, b) { U(a, 0, 0, function () { return this.localeData().meridiem(this.hours(), this.minutes(), b); }); }
        function Ua(a, b) { return b._meridiemParse; }
        function Va(a) { return "p" === (a + "").toLowerCase().charAt(0); }
        function Wa(a, b, c) { return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"; }
        function Xa(a) { return a ? a.toLowerCase().replace("_", "-") : a; }
        function Ya(a) { for (var b, c, d, e, f = 0; f < a.length;) {
            for (e = Xa(a[f]).split("-"), b = e.length, c = Xa(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
                if (d = Za(e.slice(0, b).join("-")))
                    return d;
                if (c && c.length >= b && v(e, c, !0) >= b - 1)
                    break;
                b--;
            }
            f++;
        } return null; }
        function Za(a) { var b = null; if (!Fe[a] && "undefined" != 'object' && module && module.exports)
            try {
                b = Be._abbr, commonjsRequire("./locale/" + a), $a(b);
            }
            catch (a) { } return Fe[a]; }
        function $a(a, b) { var c; return a && (c = f(b) ? bb(a) : _a(a, b), c && (Be = c)), Be._abbr; }
        function _a(a, b) { if (null !== b) {
            var c = Ee;
            if (b.abbr = a, null != Fe[a])
                y("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), c = Fe[a]._config;
            else if (null != b.parentLocale) {
                if (null == Fe[b.parentLocale])
                    return Ge[b.parentLocale] || (Ge[b.parentLocale] = []), Ge[b.parentLocale].push({ name: a, config: b }), null;
                c = Fe[b.parentLocale]._config;
            }
            return Fe[a] = new C(B(c, b)), Ge[a] && Ge[a].forEach(function (a) { _a(a.name, a.config); }), $a(a), Fe[a];
        } return delete Fe[a], null; }
        function ab(a, b) { if (null != b) {
            var c, d = Ee;
            null != Fe[a] && (d = Fe[a]._config), b = B(d, b), c = new C(b), c.parentLocale = Fe[a], Fe[a] = c, $a(a);
        }
        else
            null != Fe[a] && (null != Fe[a].parentLocale ? Fe[a] = Fe[a].parentLocale : null != Fe[a] && delete Fe[a]); return Fe[a]; }
        function bb(a) { var b; if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a)
            return Be; if (!c(a)) {
            if (b = Za(a))
                return b;
            a = [a];
        } return Ya(a); }
        function cb() { return Ad(Fe); }
        function db(a) { var b, c = a._a; return c && n(a).overflow === -2 && (b = c[fe] < 0 || c[fe] > 11 ? fe : c[ge] < 1 || c[ge] > ea(c[ee], c[fe]) ? ge : c[he] < 0 || c[he] > 24 || 24 === c[he] && (0 !== c[ie] || 0 !== c[je] || 0 !== c[ke]) ? he : c[ie] < 0 || c[ie] > 59 ? ie : c[je] < 0 || c[je] > 59 ? je : c[ke] < 0 || c[ke] > 999 ? ke : -1, n(a)._overflowDayOfYear && (b < ee || b > ge) && (b = ge), n(a)._overflowWeeks && b === -1 && (b = le), n(a)._overflowWeekday && b === -1 && (b = me), n(a).overflow = b), a; }
        function eb(a) { var b, c, d, e, f, g, h = a._i, i = He.exec(h) || Ie.exec(h); if (i) {
            for (n(a).iso = !0, b = 0, c = Ke.length; b < c; b++)
                if (Ke[b][1].exec(i[1])) {
                    e = Ke[b][0], d = Ke[b][2] !== !1;
                    break;
                }
            if (null == e)
                return void (a._isValid = !1);
            if (i[3]) {
                for (b = 0, c = Le.length; b < c; b++)
                    if (Le[b][1].exec(i[3])) {
                        f = (i[2] || " ") + Le[b][0];
                        break;
                    }
                if (null == f)
                    return void (a._isValid = !1);
            }
            if (!d && null != f)
                return void (a._isValid = !1);
            if (i[4]) {
                if (!Je.exec(i[4]))
                    return void (a._isValid = !1);
                g = "Z";
            }
            a._f = e + (f || "") + (g || ""), lb(a);
        }
        else
            a._isValid = !1; }
        function fb(a) { var b, c, d, e, f, g, h, i, j = { " GMT": " +0000", " EDT": " -0400", " EST": " -0500", " CDT": " -0500", " CST": " -0600", " MDT": " -0600", " MST": " -0700", " PDT": " -0700", " PST": " -0800" }, k = "YXWVUTSRQPONZABCDEFGHIKLM"; if (b = a._i.replace(/\([^\)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s|\s$/g, ""), c = Ne.exec(b)) {
            if (d = c[1] ? "ddd" + (5 === c[1].length ? ", " : " ") : "", e = "D MMM " + (c[2].length > 10 ? "YYYY " : "YY "), f = "HH:mm" + (c[4] ? ":ss" : ""), c[1]) {
                var l = new Date(c[2]), m = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][l.getDay()];
                if (c[1].substr(0, 3) !== m)
                    return n(a).weekdayMismatch = !0, void (a._isValid = !1);
            }
            switch (c[5].length) {
                case 2:
                    0 === i ? h = " +0000" : (i = k.indexOf(c[5][1].toUpperCase()) - 12, h = (i < 0 ? " -" : " +") + ("" + i).replace(/^-?/, "0").match(/..$/)[0] + "00");
                    break;
                case 4:
                    h = j[c[5]];
                    break;
                default: h = j[" GMT"];
            }
            c[5] = h, a._i = c.splice(1).join(""), g = " ZZ", a._f = d + e + f + g, lb(a), n(a).rfc2822 = !0;
        }
        else
            a._isValid = !1; }
        function gb(b) { var c = Me.exec(b._i); return null !== c ? void (b._d = new Date(+c[1])) : (eb(b), void (b._isValid === !1 && (delete b._isValid, fb(b), b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b))))); }
        function hb(a, b, c) { return null != a ? a : null != b ? b : c; }
        function ib(b) { var c = new Date(a.now()); return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()]; }
        function jb(a) { var b, c, d, e, f = []; if (!a._d) {
            for (d = ib(a), a._w && null == a._a[ge] && null == a._a[fe] && kb(a), null != a._dayOfYear && (e = hb(a._a[ee], d[ee]), (a._dayOfYear > pa(e) || 0 === a._dayOfYear) && (n(a)._overflowDayOfYear = !0), c = ta(e, 0, a._dayOfYear), a._a[fe] = c.getUTCMonth(), a._a[ge] = c.getUTCDate()), b = 0; b < 3 && null == a._a[b]; ++b)
                a._a[b] = f[b] = d[b];
            for (; b < 7; b++)
                a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
            24 === a._a[he] && 0 === a._a[ie] && 0 === a._a[je] && 0 === a._a[ke] && (a._nextDay = !0, a._a[he] = 0), a._d = (a._useUTC ? ta : sa).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[he] = 24);
        } }
        function kb(a) { var b, c, d, e, f, g, h, i; if (b = a._w, null != b.GG || null != b.W || null != b.E)
            f = 1, g = 4, c = hb(b.GG, a._a[ee], wa(tb(), 1, 4).year), d = hb(b.W, 1), e = hb(b.E, 1), (e < 1 || e > 7) && (i = !0);
        else {
            f = a._locale._week.dow, g = a._locale._week.doy;
            var j = wa(tb(), f, g);
            c = hb(b.gg, a._a[ee], j.year), d = hb(b.w, j.week), null != b.d ? (e = b.d, (e < 0 || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f;
        } d < 1 || d > xa(c, f, g) ? n(a)._overflowWeeks = !0 : null != i ? n(a)._overflowWeekday = !0 : (h = va(c, d, e, f, g), a._a[ee] = h.year, a._dayOfYear = h.dayOfYear); }
        function lb(b) { if (b._f === a.ISO_8601)
            return void eb(b); if (b._f === a.RFC_2822)
            return void fb(b); b._a = [], n(b).empty = !0; var c, d, e, f, g, h = "" + b._i, i = h.length, j = 0; for (e = Y(b._f, b._locale).match(Jd) || [], c = 0; c < e.length; c++)
            f = e[c], d = (h.match($(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && n(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length), Md[f] ? (d ? n(b).empty = !1 : n(b).unusedTokens.push(f), da(f, d, b)) : b._strict && !d && n(b).unusedTokens.push(f); n(b).charsLeftOver = i - j, h.length > 0 && n(b).unusedInput.push(h), b._a[he] <= 12 && n(b).bigHour === !0 && b._a[he] > 0 && (n(b).bigHour = void 0), n(b).parsedDateParts = b._a.slice(0), n(b).meridiem = b._meridiem, b._a[he] = mb(b._locale, b._a[he], b._meridiem), jb(b), db(b); }
        function mb(a, b, c) { var d; return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && b < 12 && (b += 12), d || 12 !== b || (b = 0), b) : b; }
        function nb(a) { var b, c, d, e, f; if (0 === a._f.length)
            return n(a).invalidFormat = !0, void (a._d = new Date(NaN)); for (e = 0; e < a._f.length; e++)
            f = 0, b = q({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], lb(b), o(b) && (f += n(b).charsLeftOver, f += 10 * n(b).unusedTokens.length, n(b).score = f, (null == d || f < d) && (d = f, c = b)); k(a, c || b); }
        function ob(a) { if (!a._d) {
            var b = L(a._i);
            a._a = i([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) { return a && parseInt(a, 10); }), jb(a);
        } }
        function pb(a) { var b = new r(db(qb(a))); return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b; }
        function qb(a) { var b = a._i, d = a._f; return a._locale = a._locale || bb(a._l), null === b || void 0 === d && "" === b ? p({ nullInput: !0 }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), s(b) ? new r(db(b)) : (h(b) ? a._d = b : c(d) ? nb(a) : d ? lb(a) : rb(a), o(a) || (a._d = null), a)); }
        function rb(b) { var e = b._i; f(e) ? b._d = new Date(a.now()) : h(e) ? b._d = new Date(e.valueOf()) : "string" == typeof e ? gb(b) : c(e) ? (b._a = i(e.slice(0), function (a) { return parseInt(a, 10); }), jb(b)) : d(e) ? ob(b) : g(e) ? b._d = new Date(e) : a.createFromInputFallback(b); }
        function sb(a, b, f, g, h) { var i = {}; return f !== !0 && f !== !1 || (g = f, f = void 0), (d(a) && e(a) || c(a) && 0 === a.length) && (a = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = h, i._l = f, i._i = a, i._f = b, i._strict = g, pb(i); }
        function tb(a, b, c, d) { return sb(a, b, c, d, !1); }
        function ub(a, b) { var d, e; if (1 === b.length && c(b[0]) && (b = b[0]), !b.length)
            return tb(); for (d = b[0], e = 1; e < b.length; ++e)
            b[e].isValid() && !b[e][a](d) || (d = b[e]); return d; }
        function vb() { var a = [].slice.call(arguments, 0); return ub("isBefore", a); }
        function wb() { var a = [].slice.call(arguments, 0); return ub("isAfter", a); }
        function xb(a) { for (var b in a)
            if (Re.indexOf(b) === -1 || null != a[b] && isNaN(a[b]))
                return !1; for (var c = !1, d = 0; d < Re.length; ++d)
            if (a[Re[d]]) {
                if (c)
                    return !1;
                parseFloat(a[Re[d]]) !== u(a[Re[d]]) && (c = !0);
            } return !0; }
        function yb() { return this._isValid; }
        function zb() { return Sb(NaN); }
        function Ab(a) { var b = L(a), c = b.year || 0, d = b.quarter || 0, e = b.month || 0, f = b.week || 0, g = b.day || 0, h = b.hour || 0, i = b.minute || 0, j = b.second || 0, k = b.millisecond || 0; this._isValid = xb(b), this._milliseconds = +k + 1e3 * j + 6e4 * i + 1e3 * h * 60 * 60, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = bb(), this._bubble(); }
        function Bb(a) { return a instanceof Ab; }
        function Cb(a) { return a < 0 ? Math.round(-1 * a) * -1 : Math.round(a); }
        function Db(a, b) { U(a, 0, 0, function () { var a = this.utcOffset(), c = "+"; return a < 0 && (a = -a, c = "-"), c + T(~~(a / 60), 2) + b + T(~~a % 60, 2); }); }
        function Eb(a, b) { var c = (b || "").match(a); if (null === c)
            return null; var d = c[c.length - 1] || [], e = (d + "").match(Se) || ["-", 0, 0], f = +(60 * e[1]) + u(e[2]); return 0 === f ? 0 : "+" === e[0] ? f : -f; }
        function Fb(b, c) { var d, e; return c._isUTC ? (d = c.clone(), e = (s(b) || h(b) ? b.valueOf() : tb(b).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + e), a.updateOffset(d, !1), d) : tb(b).local(); }
        function Gb(a) { return 15 * -Math.round(a._d.getTimezoneOffset() / 15); }
        function Hb(b, c, d) { var e, f = this._offset || 0; if (!this.isValid())
            return null != b ? this : NaN; if (null != b) {
            if ("string" == typeof b) {
                if (b = Eb(_d, b), null === b)
                    return this;
            }
            else
                Math.abs(b) < 16 && !d && (b = 60 * b);
            return !this._isUTC && c && (e = Gb(this)), this._offset = b, this._isUTC = !0, null != e && this.add(e, "m"), f !== b && (!c || this._changeInProgress ? Xb(this, Sb(b - f, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this;
        } return this._isUTC ? f : Gb(this); }
        function Ib(a, b) { return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset(); }
        function Jb(a) { return this.utcOffset(0, a); }
        function Kb(a) { return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Gb(this), "m")), this; }
        function Lb() { if (null != this._tzm)
            this.utcOffset(this._tzm, !1, !0);
        else if ("string" == typeof this._i) {
            var a = Eb($d, this._i);
            null != a ? this.utcOffset(a) : this.utcOffset(0, !0);
        } return this; }
        function Mb(a) { return !!this.isValid() && (a = a ? tb(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0); }
        function Nb() { return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset(); }
        function Ob() { if (!f(this._isDSTShifted))
            return this._isDSTShifted; var a = {}; if (q(a, this), a = qb(a), a._a) {
            var b = a._isUTC ? l(a._a) : tb(a._a);
            this._isDSTShifted = this.isValid() && v(a._a, b.toArray()) > 0;
        }
        else
            this._isDSTShifted = !1; return this._isDSTShifted; }
        function Pb() { return !!this.isValid() && !this._isUTC; }
        function Qb() { return !!this.isValid() && this._isUTC; }
        function Rb() { return !!this.isValid() && (this._isUTC && 0 === this._offset); }
        function Sb(a, b) { var c, d, e, f = a, h = null; return Bb(a) ? f = { ms: a._milliseconds, d: a._days, M: a._months } : g(a) ? (f = {}, b ? f[b] = a : f.milliseconds = a) : (h = Te.exec(a)) ? (c = "-" === h[1] ? -1 : 1, f = { y: 0, d: u(h[ge]) * c, h: u(h[he]) * c, m: u(h[ie]) * c, s: u(h[je]) * c, ms: u(Cb(1e3 * h[ke])) * c }) : (h = Ue.exec(a)) ? (c = "-" === h[1] ? -1 : 1, f = { y: Tb(h[2], c), M: Tb(h[3], c), w: Tb(h[4], c), d: Tb(h[5], c), h: Tb(h[6], c), m: Tb(h[7], c), s: Tb(h[8], c) }) : null == f ? f = {} : "object" == typeof f && ("from" in f || "to" in f) && (e = Vb(tb(f.from), tb(f.to)), f = {}, f.ms = e.milliseconds, f.M = e.months), d = new Ab(f), Bb(a) && j(a, "_locale") && (d._locale = a._locale), d; }
        function Tb(a, b) { var c = a && parseFloat(a.replace(",", ".")); return (isNaN(c) ? 0 : c) * b; }
        function Ub(a, b) { var c = { milliseconds: 0, months: 0 }; return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c; }
        function Vb(a, b) { var c; return a.isValid() && b.isValid() ? (b = Fb(b, a), a.isBefore(b) ? c = Ub(a, b) : (c = Ub(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : { milliseconds: 0, months: 0 }; }
        function Wb(a, b) { return function (c, d) { var e, f; return null === d || isNaN(+d) || (y(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Sb(c, d), Xb(this, e, a), this; }; }
        function Xb(b, c, d, e) { var f = c._milliseconds, g = Cb(c._days), h = Cb(c._months); b.isValid() && (e = null == e || e, f && b._d.setTime(b._d.valueOf() + f * d), g && Q(b, "Date", P(b, "Date") + g * d), h && ja(b, P(b, "Month") + h * d), e && a.updateOffset(b, g || h)); }
        function Yb(a, b) { var c = a.diff(b, "days", !0); return c < -6 ? "sameElse" : c < -1 ? "lastWeek" : c < 0 ? "lastDay" : c < 1 ? "sameDay" : c < 2 ? "nextDay" : c < 7 ? "nextWeek" : "sameElse"; }
        function Zb(b, c) { var d = b || tb(), e = Fb(d, this).startOf("day"), f = a.calendarFormat(this, e) || "sameElse", g = c && (z(c[f]) ? c[f].call(this, d) : c[f]); return this.format(g || this.localeData().calendar(f, this, tb(d))); }
        function $b() { return new r(this); }
        function _b(a, b) { var c = s(a) ? a : tb(a); return !(!this.isValid() || !c.isValid()) && (b = K(f(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf()); }
        function ac(a, b) { var c = s(a) ? a : tb(a); return !(!this.isValid() || !c.isValid()) && (b = K(f(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf()); }
        function bc(a, b, c, d) { return d = d || "()", ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c)); }
        function cc(a, b) { var c, d = s(a) ? a : tb(a); return !(!this.isValid() || !d.isValid()) && (b = K(b || "millisecond"), "millisecond" === b ? this.valueOf() === d.valueOf() : (c = d.valueOf(), this.clone().startOf(b).valueOf() <= c && c <= this.clone().endOf(b).valueOf())); }
        function dc(a, b) { return this.isSame(a, b) || this.isAfter(a, b); }
        function ec(a, b) { return this.isSame(a, b) || this.isBefore(a, b); }
        function fc(a, b, c) { var d, e, f, g; return this.isValid() ? (d = Fb(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = K(b), "year" === b || "month" === b || "quarter" === b ? (g = gc(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : t(g)) : NaN) : NaN; }
        function gc(a, b) { var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()), f = a.clone().add(e, "months"); return b - f < 0 ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d) || 0; }
        function hc() { return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"); }
        function ic() { if (!this.isValid())
            return null; var a = this.clone().utc(); return a.year() < 0 || a.year() > 9999 ? X(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : z(Date.prototype.toISOString) ? this.toDate().toISOString() : X(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"); }
        function jc() { if (!this.isValid())
            return "moment.invalid(/* " + this._i + " */)"; var a = "moment", b = ""; this.isLocal() || (a = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", b = "Z"); var c = "[" + a + '("]', d = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", e = "-MM-DD[T]HH:mm:ss.SSS", f = b + '[")]'; return this.format(c + d + e + f); }
        function kc(b) { b || (b = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat); var c = X(this, b); return this.localeData().postformat(c); }
        function lc(a, b) { return this.isValid() && (s(a) && a.isValid() || tb(a).isValid()) ? Sb({ to: this, from: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate(); }
        function mc(a) { return this.from(tb(), a); }
        function nc(a, b) { return this.isValid() && (s(a) && a.isValid() || tb(a).isValid()) ? Sb({ from: this, to: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate(); }
        function oc(a) { return this.to(tb(), a); }
        function pc(a) { var b; return void 0 === a ? this._locale._abbr : (b = bb(a), null != b && (this._locale = b), this); }
        function qc() { return this._locale; }
        function rc(a) { switch (a = K(a)) {
            case "year": this.month(0);
            case "quarter":
            case "month": this.date(1);
            case "week":
            case "isoWeek":
            case "day":
            case "date": this.hours(0);
            case "hour": this.minutes(0);
            case "minute": this.seconds(0);
            case "second": this.milliseconds(0);
        } return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this; }
        function sc(a) { return a = K(a), void 0 === a || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms")); }
        function tc() { return this._d.valueOf() - 6e4 * (this._offset || 0); }
        function uc() { return Math.floor(this.valueOf() / 1e3); }
        function vc() { return new Date(this.valueOf()); }
        function wc() { var a = this; return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]; }
        function xc() { var a = this; return { years: a.year(), months: a.month(), date: a.date(), hours: a.hours(), minutes: a.minutes(), seconds: a.seconds(), milliseconds: a.milliseconds() }; }
        function yc() { return this.isValid() ? this.toISOString() : null; }
        function zc() { return o(this); }
        function Ac() {
            return k({}, n(this));
        }
        function Bc() { return n(this).overflow; }
        function Cc() { return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict }; }
        function Dc(a, b) { U(0, [a, a.length], 0, b); }
        function Ec(a) { return Ic.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy); }
        function Fc(a) { return Ic.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4); }
        function Gc() { return xa(this.year(), 1, 4); }
        function Hc() { var a = this.localeData()._week; return xa(this.year(), a.dow, a.doy); }
        function Ic(a, b, c, d, e) { var f; return null == a ? wa(this, d, e).year : (f = xa(a, d, e), b > f && (b = f), Jc.call(this, a, b, c, d, e)); }
        function Jc(a, b, c, d, e) { var f = va(a, b, c, d, e), g = ta(f.year, 0, f.dayOfYear); return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this; }
        function Kc(a) { return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3); }
        function Lc(a) { var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1; return null == a ? b : this.add(a - b, "d"); }
        function Mc(a, b) { b[ke] = u(1e3 * ("0." + a)); }
        function Nc() { return this._isUTC ? "UTC" : ""; }
        function Oc() { return this._isUTC ? "Coordinated Universal Time" : ""; }
        function Pc(a) { return tb(1e3 * a); }
        function Qc() { return tb.apply(null, arguments).parseZone(); }
        function Rc(a) { return a; }
        function Sc(a, b, c, d) { var e = bb(), f = l().set(d, b); return e[c](f, a); }
        function Tc(a, b, c) { if (g(a) && (b = a, a = void 0), a = a || "", null != b)
            return Sc(a, b, c, "month"); var d, e = []; for (d = 0; d < 12; d++)
            e[d] = Sc(a, d, c, "month"); return e; }
        function Uc(a, b, c, d) { "boolean" == typeof a ? (g(b) && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, g(b) && (c = b, b = void 0), b = b || ""); var e = bb(), f = a ? e._week.dow : 0; if (null != c)
            return Sc(b, (c + f) % 7, d, "day"); var h, i = []; for (h = 0; h < 7; h++)
            i[h] = Sc(b, (h + f) % 7, d, "day"); return i; }
        function Vc(a, b) { return Tc(a, b, "months"); }
        function Wc(a, b) { return Tc(a, b, "monthsShort"); }
        function Xc(a, b, c) { return Uc(a, b, c, "weekdays"); }
        function Yc(a, b, c) { return Uc(a, b, c, "weekdaysShort"); }
        function Zc(a, b, c) { return Uc(a, b, c, "weekdaysMin"); }
        function $c() { var a = this._data; return this._milliseconds = df(this._milliseconds), this._days = df(this._days), this._months = df(this._months), a.milliseconds = df(a.milliseconds), a.seconds = df(a.seconds), a.minutes = df(a.minutes), a.hours = df(a.hours), a.months = df(a.months), a.years = df(a.years), this; }
        function _c(a, b, c, d) { var e = Sb(b, c); return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble(); }
        function ad(a, b) { return _c(this, a, b, 1); }
        function bd(a, b) { return _c(this, a, b, -1); }
        function cd(a) { return a < 0 ? Math.floor(a) : Math.ceil(a); }
        function dd() { var a, b, c, d, e, f = this._milliseconds, g = this._days, h = this._months, i = this._data; return f >= 0 && g >= 0 && h >= 0 || f <= 0 && g <= 0 && h <= 0 || (f += 864e5 * cd(fd(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = t(f / 1e3), i.seconds = a % 60, b = t(a / 60), i.minutes = b % 60, c = t(b / 60), i.hours = c % 24, g += t(c / 24), e = t(ed(g)), h += e, g -= cd(fd(e)), d = t(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this; }
        function ed(a) { return 4800 * a / 146097; }
        function fd(a) { return 146097 * a / 4800; }
        function gd(a) { if (!this.isValid())
            return NaN; var b, c, d = this._milliseconds; if (a = K(a), "month" === a || "year" === a)
            return b = this._days + d / 864e5, c = this._months + ed(b), "month" === a ? c : c / 12; switch (b = this._days + Math.round(fd(this._months)), a) {
            case "week": return b / 7 + d / 6048e5;
            case "day": return b + d / 864e5;
            case "hour": return 24 * b + d / 36e5;
            case "minute": return 1440 * b + d / 6e4;
            case "second": return 86400 * b + d / 1e3;
            case "millisecond": return Math.floor(864e5 * b) + d;
            default: throw new Error("Unknown unit " + a);
        } }
        function hd() { return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * u(this._months / 12) : NaN; }
        function id(a) { return function () { return this.as(a); }; }
        function jd(a) { return a = K(a), this.isValid() ? this[a + "s"]() : NaN; }
        function kd(a) { return function () { return this.isValid() ? this._data[a] : NaN; }; }
        function ld() { return t(this.days() / 7); }
        function md(a, b, c, d, e) { return e.relativeTime(b || 1, !!c, a, d); }
        function nd(a, b, c) { var d = Sb(a).abs(), e = uf(d.as("s")), f = uf(d.as("m")), g = uf(d.as("h")), h = uf(d.as("d")), i = uf(d.as("M")), j = uf(d.as("y")), k = e <= vf.ss && ["s", e] || e < vf.s && ["ss", e] || f <= 1 && ["m"] || f < vf.m && ["mm", f] || g <= 1 && ["h"] || g < vf.h && ["hh", g] || h <= 1 && ["d"] || h < vf.d && ["dd", h] || i <= 1 && ["M"] || i < vf.M && ["MM", i] || j <= 1 && ["y"] || ["yy", j]; return k[2] = b, k[3] = +a > 0, k[4] = c, md.apply(null, k); }
        function od(a) { return void 0 === a ? uf : "function" == typeof a && (uf = a, !0); }
        function pd(a, b) { return void 0 !== vf[a] && (void 0 === b ? vf[a] : (vf[a] = b, "s" === a && (vf.ss = b - 1), !0)); }
        function qd(a) { if (!this.isValid())
            return this.localeData().invalidDate(); var b = this.localeData(), c = nd(this, !a, b); return a && (c = b.pastFuture(+this, c)), b.postformat(c); }
        function rd() { if (!this.isValid())
            return this.localeData().invalidDate(); var a, b, c, d = wf(this._milliseconds) / 1e3, e = wf(this._days), f = wf(this._months); a = t(d / 60), b = t(a / 60), d %= 60, a %= 60, c = t(f / 12), f %= 12; var g = c, h = f, i = e, j = b, k = a, l = d, m = this.asSeconds(); return m ? (m < 0 ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D"; }
        var sd, td;
        td = Array.prototype.some ? Array.prototype.some : function (a) { for (var b = Object(this), c = b.length >>> 0, d = 0; d < c; d++)
            if (d in b && a.call(this, b[d], d, b))
                return !0; return !1; };
        var ud = td, vd = a.momentProperties = [], wd = !1, xd = {};
        a.suppressDeprecationWarnings = !1, a.deprecationHandler = null;
        var yd;
        yd = Object.keys ? Object.keys : function (a) { var b, c = []; for (b in a)
            j(a, b) && c.push(b); return c; };
        var zd, Ad = yd, Bd = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, Cd = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, Dd = "Invalid date", Ed = "%d", Fd = /\d{1,2}/, Gd = { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, Hd = {}, Id = {}, Jd = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Kd = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Ld = {}, Md = {}, Nd = /\d/, Od = /\d\d/, Pd = /\d{3}/, Qd = /\d{4}/, Rd = /[+-]?\d{6}/, Sd = /\d\d?/, Td = /\d\d\d\d?/, Ud = /\d\d\d\d\d\d?/, Vd = /\d{1,3}/, Wd = /\d{1,4}/, Xd = /[+-]?\d{1,6}/, Yd = /\d+/, Zd = /[+-]?\d+/, $d = /Z|[+-]\d\d:?\d\d/gi, _d = /Z|[+-]\d\d(?::?\d\d)?/gi, ae = /[+-]?\d+(\.\d{1,3})?/, be = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, ce = {}, de = {}, ee = 0, fe = 1, ge = 2, he = 3, ie = 4, je = 5, ke = 6, le = 7, me = 8;
        zd = Array.prototype.indexOf ? Array.prototype.indexOf : function (a) { var b; for (b = 0; b < this.length; ++b)
            if (this[b] === a)
                return b; return -1; };
        var ne = zd;
        U("M", ["MM", 2], "Mo", function () { return this.month() + 1; }), U("MMM", 0, 0, function (a) { return this.localeData().monthsShort(this, a); }), U("MMMM", 0, 0, function (a) { return this.localeData().months(this, a); }), J("month", "M"), M("month", 8), Z("M", Sd), Z("MM", Sd, Od), Z("MMM", function (a, b) { return b.monthsShortRegex(a); }), Z("MMMM", function (a, b) { return b.monthsRegex(a); }), ba(["M", "MM"], function (a, b) { b[fe] = u(a) - 1; }), ba(["MMM", "MMMM"], function (a, b, c, d) { var e = c._locale.monthsParse(a, d, c._strict); null != e ? b[fe] = e : n(c).invalidMonth = a; });
        var oe = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, pe = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), qe = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), re = be, se = be;
        U("Y", 0, 0, function () { var a = this.year(); return a <= 9999 ? "" + a : "+" + a; }), U(0, ["YY", 2], 0, function () { return this.year() % 100; }), U(0, ["YYYY", 4], 0, "year"), U(0, ["YYYYY", 5], 0, "year"), U(0, ["YYYYYY", 6, !0], 0, "year"), J("year", "y"), M("year", 1), Z("Y", Zd), Z("YY", Sd, Od), Z("YYYY", Wd, Qd), Z("YYYYY", Xd, Rd), Z("YYYYYY", Xd, Rd), ba(["YYYYY", "YYYYYY"], ee), ba("YYYY", function (b, c) { c[ee] = 2 === b.length ? a.parseTwoDigitYear(b) : u(b); }), ba("YY", function (b, c) { c[ee] = a.parseTwoDigitYear(b); }), ba("Y", function (a, b) { b[ee] = parseInt(a, 10); }), a.parseTwoDigitYear = function (a) { return u(a) + (u(a) > 68 ? 1900 : 2e3); };
        var te = O("FullYear", !0);
        U("w", ["ww", 2], "wo", "week"), U("W", ["WW", 2], "Wo", "isoWeek"), J("week", "w"), J("isoWeek", "W"), M("week", 5), M("isoWeek", 5), Z("w", Sd), Z("ww", Sd, Od), Z("W", Sd), Z("WW", Sd, Od), ca(["w", "ww", "W", "WW"], function (a, b, c, d) { b[d.substr(0, 1)] = u(a); });
        var ue = { dow: 0, doy: 6 };
        U("d", 0, "do", "day"), U("dd", 0, 0, function (a) { return this.localeData().weekdaysMin(this, a); }), U("ddd", 0, 0, function (a) { return this.localeData().weekdaysShort(this, a); }), U("dddd", 0, 0, function (a) { return this.localeData().weekdays(this, a); }), U("e", 0, 0, "weekday"), U("E", 0, 0, "isoWeekday"), J("day", "d"), J("weekday", "e"), J("isoWeekday", "E"), M("day", 11), M("weekday", 11), M("isoWeekday", 11), Z("d", Sd), Z("e", Sd), Z("E", Sd), Z("dd", function (a, b) { return b.weekdaysMinRegex(a); }), Z("ddd", function (a, b) { return b.weekdaysShortRegex(a); }), Z("dddd", function (a, b) { return b.weekdaysRegex(a); }), ca(["dd", "ddd", "dddd"], function (a, b, c, d) { var e = c._locale.weekdaysParse(a, d, c._strict); null != e ? b.d = e : n(c).invalidWeekday = a; }), ca(["d", "e", "E"], function (a, b, c, d) { b[d] = u(a); });
        var ve = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), we = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), xe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ye = be, ze = be, Ae = be;
        U("H", ["HH", 2], 0, "hour"), U("h", ["hh", 2], 0, Ra), U("k", ["kk", 2], 0, Sa), U("hmm", 0, 0, function () { return "" + Ra.apply(this) + T(this.minutes(), 2); }), U("hmmss", 0, 0, function () { return "" + Ra.apply(this) + T(this.minutes(), 2) + T(this.seconds(), 2); }), U("Hmm", 0, 0, function () { return "" + this.hours() + T(this.minutes(), 2); }), U("Hmmss", 0, 0, function () { return "" + this.hours() + T(this.minutes(), 2) + T(this.seconds(), 2); }), Ta("a", !0), Ta("A", !1), J("hour", "h"), M("hour", 13), Z("a", Ua), Z("A", Ua), Z("H", Sd), Z("h", Sd), Z("k", Sd), Z("HH", Sd, Od), Z("hh", Sd, Od), Z("kk", Sd, Od), Z("hmm", Td), Z("hmmss", Ud), Z("Hmm", Td), Z("Hmmss", Ud), ba(["H", "HH"], he), ba(["k", "kk"], function (a, b, c) { var d = u(a); b[he] = 24 === d ? 0 : d; }), ba(["a", "A"], function (a, b, c) { c._isPm = c._locale.isPM(a), c._meridiem = a; }), ba(["h", "hh"], function (a, b, c) { b[he] = u(a), n(c).bigHour = !0; }), ba("hmm", function (a, b, c) { var d = a.length - 2; b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d)), n(c).bigHour = !0; }), ba("hmmss", function (a, b, c) { var d = a.length - 4, e = a.length - 2; b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d, 2)), b[je] = u(a.substr(e)), n(c).bigHour = !0; }), ba("Hmm", function (a, b, c) { var d = a.length - 2; b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d)); }), ba("Hmmss", function (a, b, c) { var d = a.length - 4, e = a.length - 2; b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d, 2)), b[je] = u(a.substr(e)); });
        var Be, Ce = /[ap]\.?m?\.?/i, De = O("Hours", !0), Ee = { calendar: Bd, longDateFormat: Cd, invalidDate: Dd, ordinal: Ed, dayOfMonthOrdinalParse: Fd, relativeTime: Gd, months: pe, monthsShort: qe, week: ue, weekdays: ve, weekdaysMin: xe, weekdaysShort: we, meridiemParse: Ce }, Fe = {}, Ge = {}, He = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ie = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Je = /Z|[+-]\d\d(?::?\d\d)?/, Ke = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], Le = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], Me = /^\/?Date\((\-?\d+)/i, Ne = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;
        a.createFromInputFallback = x("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (a) { a._d = new Date(a._i + (a._useUTC ? " UTC" : "")); }), a.ISO_8601 = function () { }, a.RFC_2822 = function () { };
        var Oe = x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var a = tb.apply(null, arguments); return this.isValid() && a.isValid() ? a < this ? this : a : p(); }), Pe = x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var a = tb.apply(null, arguments); return this.isValid() && a.isValid() ? a > this ? this : a : p(); }), Qe = function () { return Date.now ? Date.now() : +new Date; }, Re = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
        Db("Z", ":"), Db("ZZ", ""), Z("Z", _d), Z("ZZ", _d), ba(["Z", "ZZ"], function (a, b, c) { c._useUTC = !0, c._tzm = Eb(_d, a); });
        var Se = /([\+\-]|\d\d)/gi;
        a.updateOffset = function () { };
        var Te = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/, Ue = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
        Sb.fn = Ab.prototype, Sb.invalid = zb;
        var Ve = Wb(1, "add"), We = Wb(-1, "subtract");
        a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        var Xe = x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) { return void 0 === a ? this.localeData() : this.locale(a); });
        U(0, ["gg", 2], 0, function () { return this.weekYear() % 100; }), U(0, ["GG", 2], 0, function () { return this.isoWeekYear() % 100; }), Dc("gggg", "weekYear"), Dc("ggggg", "weekYear"), Dc("GGGG", "isoWeekYear"), Dc("GGGGG", "isoWeekYear"), J("weekYear", "gg"), J("isoWeekYear", "GG"), M("weekYear", 1), M("isoWeekYear", 1), Z("G", Zd), Z("g", Zd), Z("GG", Sd, Od), Z("gg", Sd, Od), Z("GGGG", Wd, Qd), Z("gggg", Wd, Qd), Z("GGGGG", Xd, Rd), Z("ggggg", Xd, Rd), ca(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) { b[d.substr(0, 2)] = u(a); }), ca(["gg", "GG"], function (b, c, d, e) { c[e] = a.parseTwoDigitYear(b); }), U("Q", 0, "Qo", "quarter"), J("quarter", "Q"), M("quarter", 7), Z("Q", Nd), ba("Q", function (a, b) { b[fe] = 3 * (u(a) - 1); }), U("D", ["DD", 2], "Do", "date"), J("date", "D"), M("date", 9), Z("D", Sd), Z("DD", Sd, Od), Z("Do", function (a, b) { return a ? b._dayOfMonthOrdinalParse || b._ordinalParse : b._dayOfMonthOrdinalParseLenient; }), ba(["D", "DD"], ge), ba("Do", function (a, b) { b[ge] = u(a.match(Sd)[0], 10); });
        var Ye = O("Date", !0);
        U("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), J("dayOfYear", "DDD"), M("dayOfYear", 4), Z("DDD", Vd), Z("DDDD", Pd), ba(["DDD", "DDDD"], function (a, b, c) { c._dayOfYear = u(a); }), U("m", ["mm", 2], 0, "minute"), J("minute", "m"), M("minute", 14), Z("m", Sd), Z("mm", Sd, Od), ba(["m", "mm"], ie);
        var Ze = O("Minutes", !1);
        U("s", ["ss", 2], 0, "second"), J("second", "s"), M("second", 15), Z("s", Sd), Z("ss", Sd, Od), ba(["s", "ss"], je);
        var $e = O("Seconds", !1);
        U("S", 0, 0, function () { return ~~(this.millisecond() / 100); }), U(0, ["SS", 2], 0, function () { return ~~(this.millisecond() / 10); }), U(0, ["SSS", 3], 0, "millisecond"), U(0, ["SSSS", 4], 0, function () { return 10 * this.millisecond(); }), U(0, ["SSSSS", 5], 0, function () { return 100 * this.millisecond(); }), U(0, ["SSSSSS", 6], 0, function () { return 1e3 * this.millisecond(); }), U(0, ["SSSSSSS", 7], 0, function () { return 1e4 * this.millisecond(); }), U(0, ["SSSSSSSS", 8], 0, function () { return 1e5 * this.millisecond(); }), U(0, ["SSSSSSSSS", 9], 0, function () { return 1e6 * this.millisecond(); }), J("millisecond", "ms"), M("millisecond", 16), Z("S", Vd, Nd), Z("SS", Vd, Od), Z("SSS", Vd, Pd);
        var _e;
        for (_e = "SSSS"; _e.length <= 9; _e += "S")
            Z(_e, Yd);
        for (_e = "S"; _e.length <= 9; _e += "S")
            ba(_e, Mc);
        var af = O("Milliseconds", !1);
        U("z", 0, 0, "zoneAbbr"), U("zz", 0, 0, "zoneName");
        var bf = r.prototype;
        bf.add = Ve, bf.calendar = Zb, bf.clone = $b, bf.diff = fc, bf.endOf = sc, bf.format = kc, bf.from = lc, bf.fromNow = mc, bf.to = nc, bf.toNow = oc, bf.get = R, bf.invalidAt = Bc, bf.isAfter = _b, bf.isBefore = ac, bf.isBetween = bc, bf.isSame = cc, bf.isSameOrAfter = dc, bf.isSameOrBefore = ec, bf.isValid = zc, bf.lang = Xe, bf.locale = pc, bf.localeData = qc, bf.max = Pe, bf.min = Oe, bf.parsingFlags = Ac, bf.set = S, bf.startOf = rc, bf.subtract = We, bf.toArray = wc, bf.toObject = xc, bf.toDate = vc, bf.toISOString = ic, bf.inspect = jc, bf.toJSON = yc, bf.toString = hc, bf.unix = uc, bf.valueOf = tc, bf.creationData = Cc, bf.year = te, bf.isLeapYear = ra, bf.weekYear = Ec, bf.isoWeekYear = Fc, bf.quarter = bf.quarters = Kc, bf.month = ka, bf.daysInMonth = la, bf.week = bf.weeks = Ba, bf.isoWeek = bf.isoWeeks = Ca, bf.weeksInYear = Hc, bf.isoWeeksInYear = Gc, bf.date = Ye, bf.day = bf.days = Ka, bf.weekday = La, bf.isoWeekday = Ma, bf.dayOfYear = Lc, bf.hour = bf.hours = De, bf.minute = bf.minutes = Ze, bf.second = bf.seconds = $e, bf.millisecond = bf.milliseconds = af, bf.utcOffset = Hb, bf.utc = Jb, bf.local = Kb, bf.parseZone = Lb, bf.hasAlignedHourOffset = Mb, bf.isDST = Nb, bf.isLocal = Pb, bf.isUtcOffset = Qb, bf.isUtc = Rb, bf.isUTC = Rb, bf.zoneAbbr = Nc, bf.zoneName = Oc, bf.dates = x("dates accessor is deprecated. Use date instead.", Ye), bf.months = x("months accessor is deprecated. Use month instead", ka), bf.years = x("years accessor is deprecated. Use year instead", te), bf.zone = x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Ib), bf.isDSTShifted = x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Ob);
        var cf = C.prototype;
        cf.calendar = D, cf.longDateFormat = E, cf.invalidDate = F, cf.ordinal = G, cf.preparse = Rc, cf.postformat = Rc, cf.relativeTime = H, cf.pastFuture = I, cf.set = A, cf.months = fa, cf.monthsShort = ga, cf.monthsParse = ia, cf.monthsRegex = na, cf.monthsShortRegex = ma, cf.week = ya, cf.firstDayOfYear = Aa, cf.firstDayOfWeek = za, cf.weekdays = Fa, cf.weekdaysMin = Ha, cf.weekdaysShort = Ga, cf.weekdaysParse = Ja, cf.weekdaysRegex = Na, cf.weekdaysShortRegex = Oa, cf.weekdaysMinRegex = Pa, cf.isPM = Va, cf.meridiem = Wa, $a("en", { dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (a) { var b = a % 10, c = 1 === u(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th"; return a + c; } }), a.lang = x("moment.lang is deprecated. Use moment.locale instead.", $a), a.langData = x("moment.langData is deprecated. Use moment.localeData instead.", bb);
        var df = Math.abs, ef = id("ms"), ff = id("s"), gf = id("m"), hf = id("h"), jf = id("d"), kf = id("w"), lf = id("M"), mf = id("y"), nf = kd("milliseconds"), of = kd("seconds"), pf = kd("minutes"), qf = kd("hours"), rf = kd("days"), sf = kd("months"), tf = kd("years"), uf = Math.round, vf = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 }, wf = Math.abs, xf = Ab.prototype;
        return xf.isValid = yb, xf.abs = $c, xf.add = ad, xf.subtract = bd, xf.as = gd, xf.asMilliseconds = ef, xf.asSeconds = ff, xf.asMinutes = gf, xf.asHours = hf, xf.asDays = jf, xf.asWeeks = kf, xf.asMonths = lf, xf.asYears = mf, xf.valueOf = hd, xf._bubble = dd, xf.get = jd, xf.milliseconds = nf, xf.seconds = of, xf.minutes = pf, xf.hours = qf, xf.days = rf, xf.weeks = ld, xf.months = sf, xf.years = tf, xf.humanize = qd, xf.toISOString = rd, xf.toString = rd, xf.toJSON = rd, xf.locale = pc, xf.localeData = qc, xf.toIsoString = x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", rd), xf.lang = Xe, U("X", 0, 0, "unix"), U("x", 0, 0, "valueOf"), Z("x", Zd), Z("X", ae), ba("X", function (a, b, c) { c._d = new Date(1e3 * parseFloat(a, 10)); }), ba("x", function (a, b, c) { c._d = new Date(u(a)); }), a.version = "2.18.1", b(tb), a.fn = bf, a.min = vb, a.max = wb, a.now = Qe, a.utc = l, a.unix = Pc, a.months = Vc, a.isDate = h, a.locale = $a, a.invalid = p, a.duration = Sb, a.isMoment = s, a.weekdays = Xc, a.parseZone = Qc, a.localeData = bb, a.isDuration = Bb, a.monthsShort = Wc, a.weekdaysMin = Zc, a.defineLocale = _a, a.updateLocale = ab, a.locales = cb, a.weekdaysShort = Yc, a.normalizeUnits = K, a.relativeTimeRounding = od, a.relativeTimeThreshold = pd, a.calendarFormat = Yb, a.prototype = bf, a;
    });
});
var moment_ = Object.freeze({
    default: moment_min,
    __moduleExports: moment_min
});
var moment = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
var moment$1 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
var moment$2 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
var moment$3 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
var moment$4 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
var moment$5 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateIsoFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$5(value).format('YYYY-MM-DD') : ''; };
var moment$6 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateTimeIsoAmPmFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$6(value).format('YYYY-MM-DD h:mm:ss a') : ''; };
var moment$7 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateTimeUsAmPmFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$7(value).format('MM/DD/YYYY h:mm:ss a') : ''; };
var moment$8 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateTimeUsFormatter = function (row, cell, value, columnDef, dataContext) { return value ? moment$8(value).format('MM/DD/YYYY hh:mm:ss') : ''; };
var moment$9 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
    yesNoFormatter: yesNoFormatter
};
var moment$10 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
var moment$11 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
var dateSorter = function (value1, value2, sortDirection) {
    if (!moment$11(value1, moment$11.ISO_8601).isValid() || !moment$11(value2, moment$11.ISO_8601, true).isValid()) {
        return 0;
    }
    var /** @type {?} */ date1 = moment$11(value1);
    var /** @type {?} */ date2 = moment$11(value2);
    var /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};
var moment$12 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
var moment$13 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
var moment$14 = moment_min || moment_;
/**
 * Try casting an input of type Promise | Observable into a Promise type.
 * @param {?} input object which could be of type Promise or Observable
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
    else if (input instanceof Observable$1) {
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
            map = OperatorType.equal;
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
 * @return {?} object Date
 */
function parseUtcDate(inputDateString, useUtc) {
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
}
var jquery = createCommonjsModule(function (module) {
    /*!
     * jQuery JavaScript Library v3.2.1
     * https://jquery.com/
     *
     * Includes Sizzle.js
     * https://sizzlejs.com/
     *
     * Copyright JS Foundation and other contributors
     * Released under the MIT license
     * https://jquery.org/license
     *
     * Date: 2017-03-20T18:59Z
     */
    (function (global, factory) {
        "use strict";
        {
            // For CommonJS and CommonJS-like environments where a proper `window`
            // is present, execute the factory and get jQuery.
            // For environments that do not have a `window` with a `document`
            // (such as Node.js), expose a factory as module.exports.
            // This accentuates the need for the creation of a real `window`.
            // e.g. var jQuery = require("jquery")(window);
            // See ticket #14549 for more info.
            module.exports = global.document ?
                factory(global, true) :
                function (w) {
                    if (!w.document) {
                        throw new Error("jQuery requires a window with a document");
                    }
                    return factory(w);
                };
        }
        // Pass this if window is not defined yet
    })(typeof window !== "undefined" ? window : commonjsGlobal, function (window, noGlobal) {
        // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
        // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
        // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
        // enough that all such attempts are guarded in a try block.
        "use strict";
        var arr = [];
        var document = window.document;
        var getProto = Object.getPrototypeOf;
        var slice = arr.slice;
        var concat = arr.concat;
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var fnToString = hasOwn.toString;
        var ObjectFunctionString = fnToString.call(Object);
        var support = {};
        function DOMEval(code, doc) {
            doc = doc || document;
            var script = doc.createElement("script");
            script.text = code;
            doc.head.appendChild(script).parentNode.removeChild(script);
        }
        /* global Symbol */
        // Defining this global in .eslintrc.json would create a danger of using the global
        // unguarded in another place, it seems safer to define global only for this module
        var version = "3.2.1", 
        // Define a local copy of jQuery
        jQuery = function (selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        }, 
        // Support: Android <=4.0 only
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, 
        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g, 
        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function (all, letter) {
            return letter.toUpperCase();
        };
        jQuery.fn = jQuery.prototype = {
            // The current version of jQuery being used
            jquery: version,
            constructor: jQuery,
            // The default length of a jQuery object is 0
            length: 0,
            toArray: function () {
                return slice.call(this);
            },
            // Get the Nth element in the matched element set OR
            // Get the whole matched element set as a clean array
            get: function (num) {
                // Return all the elements in a clean array
                if (num == null) {
                    return slice.call(this);
                }
                // Return just the one element from the set
                return num < 0 ? this[num + this.length] : this[num];
            },
            // Take an array of elements and push it onto the stack
            // (returning the new matched element set)
            pushStack: function (elems) {
                // Build a new jQuery matched element set
                var ret = jQuery.merge(this.constructor(), elems);
                // Add the old object onto the stack (as a reference)
                ret.prevObject = this;
                // Return the newly-formed element set
                return ret;
            },
            // Execute a callback for every element in the matched set.
            each: function (callback) {
                return jQuery.each(this, callback);
            },
            map: function (callback) {
                return this.pushStack(jQuery.map(this, function (elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },
            slice: function () {
                return this.pushStack(slice.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (i) {
                var len = this.length, j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            // For internal use only.
            // Behaves like an Array's method, not like a jQuery method.
            push: push,
            sort: arr.sort,
            splice: arr.splice
        };
        jQuery.extend = jQuery.fn.extend = function () {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
            // Handle a deep copy situation
            if (typeof target === "boolean") {
                deep = target;
                // Skip the boolean and the target
                target = arguments[i] || {};
                i++;
            }
            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }
            // Extend jQuery itself if only one argument is passed
            if (i === length) {
                target = this;
                i--;
            }
            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }
                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && (jQuery.isPlainObject(copy) ||
                            (copyIsArray = Array.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && Array.isArray(src) ? src : [];
                            }
                            else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            // Never move original objects, clone them
                            target[name] = jQuery.extend(deep, clone, copy);
                            // Don't bring in undefined values
                        }
                        else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            // Return the modified object
            return target;
        };
        jQuery.extend({
            // Unique for each copy of jQuery on the page
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            // Assume jQuery is ready without the ready module
            isReady: true,
            error: function (msg) {
                throw new Error(msg);
            },
            noop: function () { },
            isFunction: function (obj) {
                return jQuery.type(obj) === "function";
            },
            isWindow: function (obj) {
                return obj != null && obj === obj.window;
            },
            isNumeric: function (obj) {
                // As of jQuery 3.0, isNumeric is limited to
                // strings and numbers (primitives or objects)
                // that can be coerced to finite numbers (gh-2662)
                var type = jQuery.type(obj);
                return (type === "number" || type === "string") &&
                    // parseFloat NaNs numeric-cast false positives ("")
                    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                    // subtraction forces infinities to NaN
                    !isNaN(obj - parseFloat(obj));
            },
            isPlainObject: function (obj) {
                var proto, Ctor;
                // Detect obvious negatives
                // Use toString instead of jQuery.type to catch host objects
                if (!obj || toString.call(obj) !== "[object Object]") {
                    return false;
                }
                proto = getProto(obj);
                // Objects with no prototype (e.g., `Object.create( null )`) are plain
                if (!proto) {
                    return true;
                }
                // Objects with prototype are plain iff they were constructed by a global Object function
                Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
                return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
            },
            isEmptyObject: function (obj) {
                /* eslint-disable no-unused-vars */
                // See https://github.com/eslint/eslint/issues/6125
                var name;
                for (name in obj) {
                    return false;
                }
                return true;
            },
            type: function (obj) {
                if (obj == null) {
                    return obj + "";
                }
                // Support: Android <=2.3 only (functionish RegExp)
                return typeof obj === "object" || typeof obj === "function" ?
                    class2type[toString.call(obj)] || "object" :
                    typeof obj;
            },
            // Evaluates a script in a global context
            globalEval: function (code) {
                DOMEval(code);
            },
            // Convert dashed to camelCase; used by the css and data modules
            // Support: IE <=9 - 11, Edge 12 - 13
            // Microsoft forgot to hump their vendor prefix (#9572)
            camelCase: function (string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
            },
            each: function (obj, callback) {
                var length, i = 0;
                if (isArrayLike(obj)) {
                    length = obj.length;
                    for (; i < length; i++) {
                        if (callback.call(obj[i], i, obj[i]) === false) {
                            break;
                        }
                    }
                }
                else {
                    for (i in obj) {
                        if (callback.call(obj[i], i, obj[i]) === false) {
                            break;
                        }
                    }
                }
                return obj;
            },
            // Support: Android <=4.0 only
            trim: function (text) {
                return text == null ?
                    "" :
                    (text + "").replace(rtrim, "");
            },
            // results is for internal usage only
            makeArray: function (arr, results) {
                var ret = results || [];
                if (arr != null) {
                    if (isArrayLike(Object(arr))) {
                        jQuery.merge(ret, typeof arr === "string" ?
                            [arr] : arr);
                    }
                    else {
                        push.call(ret, arr);
                    }
                }
                return ret;
            },
            inArray: function (elem, arr, i) {
                return arr == null ? -1 : indexOf.call(arr, elem, i);
            },
            // Support: Android <=4.0 only, PhantomJS 1 only
            // push.apply(_, arraylike) throws on ancient WebKit
            merge: function (first$$1, second) {
                var len = +second.length, j = 0, i = first$$1.length;
                for (; j < len; j++) {
                    first$$1[i++] = second[j];
                }
                first$$1.length = i;
                return first$$1;
            },
            grep: function (elems, callback, invert) {
                var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
                // Go through the array, only saving the items
                // that pass the validator function
                for (; i < length; i++) {
                    callbackInverse = !callback(elems[i], i);
                    if (callbackInverse !== callbackExpect) {
                        matches.push(elems[i]);
                    }
                }
                return matches;
            },
            // arg is for internal usage only
            map: function (elems, callback, arg) {
                var length, value, i = 0, ret = [];
                // Go through the array, translating each of the items to their new values
                if (isArrayLike(elems)) {
                    length = elems.length;
                    for (; i < length; i++) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value);
                        }
                    }
                    // Go through every key on the object,
                }
                else {
                    for (i in elems) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value);
                        }
                    }
                }
                // Flatten any nested arrays
                return concat.apply([], ret);
            },
            // A global GUID counter for objects
            guid: 1,
            // Bind a function to a context, optionally partially applying any
            // arguments.
            proxy: function (fn, context) {
                var tmp, args, proxy;
                if (typeof context === "string") {
                    tmp = fn[context];
                    context = fn;
                    fn = tmp;
                }
                // Quick check to determine if target is callable, in the spec
                // this throws a TypeError, but we will just return undefined.
                if (!jQuery.isFunction(fn)) {
                    return undefined;
                }
                // Simulated bind
                args = slice.call(arguments, 2);
                proxy = function () {
                    return fn.apply(context || this, args.concat(slice.call(arguments)));
                };
                // Set the guid of unique handler to the same of original handler, so it can be removed
                proxy.guid = fn.guid = fn.guid || jQuery.guid++;
                return proxy;
            },
            now: Date.now,
            // jQuery.support is not used in Core but other projects attach their
            // properties to it so it needs to exist.
            support: support
        });
        if (typeof Symbol === "function") {
            jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
        }
        // Populate the class2type map
        jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        function isArrayLike(obj) {
            // Support: real iOS 8.2 only (not reproducible in simulator)
            // `in` check used to prevent JIT error (gh-2145)
            // hasOwn isn't used here due to false negatives
            // regarding Nodelist length in IE
            var length = !!obj && "length" in obj && obj.length, type = jQuery.type(obj);
            if (type === "function" || jQuery.isWindow(obj)) {
                return false;
            }
            return type === "array" || length === 0 ||
                typeof length === "number" && length > 0 && (length - 1) in obj;
        }
        var Sizzle = 
        /*!
         * Sizzle CSS Selector Engine v2.3.3
         * https://sizzlejs.com/
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2016-08-08
         */
        (function (window) {
            var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, 
            // Local document vars
            setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, 
            // Instance-specific data
            expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                }
                return 0;
            }, 
            // Instance methods
            hasOwn = ({}).hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, 
            // Use a stripped-down indexOf as it's faster than native
            // https://jsperf.com/thor-indexof-vs-for/5
            indexOf = function (list, elem) {
                var i = 0, len = list.length;
                for (; i < len; i++) {
                    if (list[i] === elem) {
                        return i;
                    }
                }
                return -1;
            }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", 
            // Regular expressions
            // http://www.w3.org/TR/css3-selectors/#whitespace
            whitespace = "[\\x20\\t\\r\\n\\f]", 
            // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
            identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", 
            // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
            attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                // Operator (capture 2)
                "*([*^$|!~]?=)" + whitespace +
                // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                "*\\]", pseudos = ":(" + identifier + ")(?:\\((" +
                // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                // 1. quoted (capture 3; capture 4 or capture 5)
                "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                // 2. simple (capture 6)
                "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                // 3. anything else (capture 2)
                ".*" +
                ")\\)|)", 
            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
            rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
                "ID": new RegExp("^#(" + identifier + ")"),
                "CLASS": new RegExp("^\\.(" + identifier + ")"),
                "TAG": new RegExp("^(" + identifier + "|[*])"),
                "ATTR": new RegExp("^" + attributes),
                "PSEUDO": new RegExp("^" + pseudos),
                "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                    "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                    "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                // For use in libraries implementing .is()
                // We use this for POS matching in `select`
                "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, 
            // Easily-parseable/retrievable ID or TAG or CLASS selectors
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, 
            // CSS escapes
            // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
            runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function (_, escaped, escapedWhitespace) {
                var high = "0x" + escaped - 0x10000;
                // NaN means non-codepoint
                // Support: Firefox<24
                // Workaround erroneous numeric interpretation of +"0x"
                return high !== high || escapedWhitespace ?
                    escaped :
                    high < 0 ?
                        // BMP codepoint
                        String.fromCharCode(high + 0x10000) :
                        // Supplemental Plane codepoint (surrogate pair)
                        String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
            }, 
            // CSS string/identifier serialization
            // https://drafts.csswg.org/cssom/#common-serializing-idioms
            rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function (ch, asCodePoint) {
                if (asCodePoint) {
                    // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                    if (ch === "\0") {
                        return "\uFFFD";
                    }
                    // Control characters and (dependent upon position) numbers get escaped as code points
                    return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
                }
                // Other potentially-special ASCII characters get backslash-escaped
                return "\\" + ch;
            }, 
            // Used for iframes
            // See setDocument()
            // Removing the function wrapper causes a "Permission Denied"
            // error in IE
            unloadHandler = function () {
                setDocument();
            }, disabledAncestor = addCombinator(function (elem) {
                return elem.disabled === true && ("form" in elem || "label" in elem);
            }, { dir: "parentNode", next: "legend" });
            // Optimize for push.apply( _, NodeList )
            try {
                push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[preferredDoc.childNodes.length].nodeType;
            }
            catch (e) {
                push = { apply: arr.length ?
                        // Leverage slice if possible
                        function (target, els) {
                            push_native.apply(target, slice.call(els));
                        } :
                        // Support: IE<9
                        // Otherwise append directly
                        function (target, els) {
                            var j = target.length, i = 0;
                            // Can't trust NodeList.length
                            while ((target[j++] = els[i++])) { }
                            target.length = j - 1;
                        }
                };
            }
            function Sizzle(selector, context, results, seed) {
                var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, 
                // nodeType defaults to 9, since context defaults to document
                nodeType = context ? context.nodeType : 9;
                results = results || [];
                // Return early from calls with invalid selector or context
                if (typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                    return results;
                }
                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if (!seed) {
                    if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                        setDocument(context);
                    }
                    context = context || document;
                    if (documentIsHTML) {
                        // If the selector is sufficiently simple, try using a "get*By*" DOM method
                        // (excepting DocumentFragment context, where the methods don't exist)
                        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                            // ID selector
                            if ((m = match[1])) {
                                // Document context
                                if (nodeType === 9) {
                                    if ((elem = context.getElementById(m))) {
                                        // Support: IE, Opera, Webkit
                                        // TODO: identify versions
                                        // getElementById can match elements by name instead of ID
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    }
                                    else {
                                        return results;
                                    }
                                    // Element context
                                }
                                else {
                                    // Support: IE, Opera, Webkit
                                    // TODO: identify versions
                                    // getElementById can match elements by name instead of ID
                                    if (newContext && (elem = newContext.getElementById(m)) &&
                                        contains(context, elem) &&
                                        elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                }
                                // Type selector
                            }
                            else if (match[2]) {
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;
                                // Class selector
                            }
                            else if ((m = match[3]) && support.getElementsByClassName &&
                                context.getElementsByClassName) {
                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }
                        // Take advantage of querySelectorAll
                        if (support.qsa &&
                            !compilerCache[selector + " "] &&
                            (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                            if (nodeType !== 1) {
                                newContext = context;
                                newSelector = selector;
                                // qSA looks outside Element context, which is not what we want
                                // Thanks to Andrew Dupont for this workaround technique
                                // Support: IE <=8
                                // Exclude object elements
                            }
                            else if (context.nodeName.toLowerCase() !== "object") {
                                // Capture the context ID, setting it first if necessary
                                if ((nid = context.getAttribute("id"))) {
                                    nid = nid.replace(rcssescape, fcssescape);
                                }
                                else {
                                    context.setAttribute("id", (nid = expando));
                                }
                                // Prefix every selector in the list
                                groups = tokenize(selector);
                                i = groups.length;
                                while (i--) {
                                    groups[i] = "#" + nid + " " + toSelector(groups[i]);
                                }
                                newSelector = groups.join(",");
                                // Expand context for sibling selectors
                                newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                                    context;
                            }
                            if (newSelector) {
                                try {
                                    push.apply(results, newContext.querySelectorAll(newSelector));
                                    return results;
                                }
                                catch (qsaError) {
                                }
                                finally {
                                    if (nid === expando) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }
                }
                // All others
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }
            /**
             * Create key-value caches of limited size
             * @returns {function(string, object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];
                function cache(key, value) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        // Only keep the most recent entries
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }
                return cache;
            }
            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }
            /**
             * Support testing using an element
             * @param {Function} fn Passed the created element and returns a boolean result
             */
            function assert(fn) {
                var el = document.createElement("fieldset");
                try {
                    return !!fn(el);
                }
                catch (e) {
                    return false;
                }
                finally {
                    // Remove from its parent by default
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                    // release memory in IE
                    el = null;
                }
            }
            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"), i = arr.length;
                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }
            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck(a, b) {
                var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                    a.sourceIndex - b.sourceIndex;
                // Use IE sourceIndex if available on both nodes
                if (diff) {
                    return diff;
                }
                // Check if b follows a
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }
                return a ? 1 : -1;
            }
            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }
            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo(type) {
                return function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }
            /**
             * Returns a function to use in pseudos for :enabled/:disabled
             * @param {Boolean} disabled true for :disabled; false for :enabled
             */
            function createDisabledPseudo(disabled) {
                // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                return function (elem) {
                    // Only certain elements can match :enabled or :disabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                    if ("form" in elem) {
                        // Check for inherited disabledness on relevant non-disabled elements:
                        // * listed form-associated elements in a disabled fieldset
                        //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                        // * option elements in a disabled optgroup
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                        // All such elements have a "form" property.
                        if (elem.parentNode && elem.disabled === false) {
                            // Option elements defer to a parent optgroup if present
                            if ("label" in elem) {
                                if ("label" in elem.parentNode) {
                                    return elem.parentNode.disabled === disabled;
                                }
                                else {
                                    return elem.disabled === disabled;
                                }
                            }
                            // Support: IE 6 - 11
                            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                            return elem.isDisabled === disabled ||
                                // Where there is no isDisabled, check manually
                                /* jshint -W018 */
                                elem.isDisabled !== !disabled &&
                                    disabledAncestor(elem) === disabled;
                        }
                        return elem.disabled === disabled;
                        // Try to winnow out elements that can't be disabled before trusting the disabled property.
                        // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                        // even exist on them, let alone have a boolean value.
                    }
                    else if ("label" in elem) {
                        return elem.disabled === disabled;
                    }
                    // Remaining elements are neither :enabled nor :disabled
                    return false;
                };
            }
            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo(fn) {
                return markFunction(function (argument) {
                    argument = +argument;
                    return markFunction(function (seed, matches) {
                        var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                        // Match elements found at the specified indexes
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }
            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }
            // Expose support vars for convenience
            support = Sizzle.support = {};
            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function (elem) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };
            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function (node) {
                var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
                // Return early if doc is invalid or already selected
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }
                // Update global variables
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML(document);
                // Support: IE 9-11, Edge
                // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                if (preferredDoc !== document &&
                    (subWindow = document.defaultView) && subWindow.top !== subWindow) {
                    // Support: IE 11, Edge
                    if (subWindow.addEventListener) {
                        subWindow.addEventListener("unload", unloadHandler, false);
                        // Support: IE 9 - 10 only
                    }
                    else if (subWindow.attachEvent) {
                        subWindow.attachEvent("onunload", unloadHandler);
                    }
                }
                /* Attributes
                ---------------------------------------------------------------------- */
                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function (el) {
                    el.className = "i";
                    return !el.getAttribute("className");
                });
                /* getElement(s)By*
                ---------------------------------------------------------------------- */
                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function (el) {
                    el.appendChild(document.createComment(""));
                    return !el.getElementsByTagName("*").length;
                });
                // Support: IE<9
                support.getElementsByClassName = rnative.test(document.getElementsByClassName);
                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programmatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function (el) {
                    docElem.appendChild(el).id = expando;
                    return !document.getElementsByName || !document.getElementsByName(expando).length;
                });
                // ID filter and find
                if (support.getById) {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var elem = context.getElementById(id);
                            return elem ? [elem] : [];
                        }
                    };
                }
                else {
                    Expr.filter["ID"] = function (id) {
                        var attrId = id.replace(runescape, funescape);
                        return function (elem) {
                            var node = typeof elem.getAttributeNode !== "undefined" &&
                                elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                    // Support: IE 6 - 7 only
                    // getElementById is not reliable as a find shortcut
                    Expr.find["ID"] = function (id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var node, i, elems, elem = context.getElementById(id);
                            if (elem) {
                                // Verify the id attribute
                                node = elem.getAttributeNode("id");
                                if (node && node.value === id) {
                                    return [elem];
                                }
                                // Fall back on getElementsByName
                                elems = context.getElementsByName(id);
                                i = 0;
                                while ((elem = elems[i++])) {
                                    node = elem.getAttributeNode("id");
                                    if (node && node.value === id) {
                                        return [elem];
                                    }
                                }
                            }
                            return [];
                        }
                    };
                }
                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function (tag, context) {
                        if (typeof context.getElementsByTagName !== "undefined") {
                            return context.getElementsByTagName(tag);
                            // DocumentFragment nodes don't have gEBTN
                        }
                        else if (support.qsa) {
                            return context.querySelectorAll(tag);
                        }
                    } :
                    function (tag, context) {
                        var elem, tmp = [], i = 0, 
                        // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                        results = context.getElementsByTagName(tag);
                        // Filter out possible comments
                        if (tag === "*") {
                            while ((elem = results[i++])) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }
                            return tmp;
                        }
                        return results;
                    };
                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                    if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                        return context.getElementsByClassName(className);
                    }
                };
                /* QSA/matchesSelector
                ---------------------------------------------------------------------- */
                // QSA and matchesSelector support
                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];
                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See https://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];
                if ((support.qsa = rnative.test(document.querySelectorAll))) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function (el) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // https://bugs.jquery.com/ticket/12359
                        docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" +
                            "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                            "<option selected=''></option></select>";
                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if (el.querySelectorAll("[msallowcapture^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                        }
                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if (!el.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                        }
                        // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                        if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                            rbuggyQSA.push("~=");
                        }
                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if (!el.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked");
                        }
                        // Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibling-combinator selector` fails
                        if (!el.querySelectorAll("a#" + expando + "+*").length) {
                            rbuggyQSA.push(".#.+[+~]");
                        }
                    });
                    assert(function (el) {
                        el.innerHTML = "<a href='' disabled='disabled'></a>" +
                            "<select disabled='disabled'><option/></select>";
                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = document.createElement("input");
                        input.setAttribute("type", "hidden");
                        el.appendChild(input).setAttribute("name", "D");
                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if (el.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                        }
                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if (el.querySelectorAll(":enabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }
                        // Support: IE9-11+
                        // IE's :disabled selector does not pick up the children of disabled fieldsets
                        docElem.appendChild(el).disabled = true;
                        if (el.querySelectorAll(":disabled").length !== 2) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }
                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        el.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }
                if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
                    docElem.webkitMatchesSelector ||
                    docElem.mozMatchesSelector ||
                    docElem.oMatchesSelector ||
                    docElem.msMatchesSelector)))) {
                    assert(function (el) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call(el, "*");
                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call(el, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos);
                    });
                }
                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
                /* Contains
                ---------------------------------------------------------------------- */
                hasCompare = rnative.test(docElem.compareDocumentPosition);
                // Element contains another
                // Purposefully self-exclusive
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test(docElem.contains) ?
                    function (a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ?
                            adown.contains(bup) :
                            a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
                    } :
                    function (a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };
                /* Sorting
                ---------------------------------------------------------------------- */
                // Document order sorting
                sortOrder = hasCompare ?
                    function (a, b) {
                        // Flag for duplicate removal
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }
                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (compare) {
                            return compare;
                        }
                        // Calculate position if both inputs belong to the same document
                        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                            a.compareDocumentPosition(b) :
                            // Otherwise we know they are disconnected
                            1;
                        // Disconnected nodes
                        if (compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                            // Choose the first element that is related to our preferred document
                            if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                return -1;
                            }
                            if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                return 1;
                            }
                            // Maintain original order
                            return sortInput ?
                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                0;
                        }
                        return compare & 4 ? -1 : 1;
                    } :
                    function (a, b) {
                        // Exit early if the nodes are identical
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }
                        var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
                        // Parentless nodes are either documents or disconnected
                        if (!aup || !bup) {
                            return a === document ? -1 :
                                b === document ? 1 :
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                                0;
                            // If the nodes are siblings, we can do a quick check
                        }
                        else if (aup === bup) {
                            return siblingCheck(a, b);
                        }
                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ((cur = cur.parentNode)) {
                            ap.unshift(cur);
                        }
                        cur = b;
                        while ((cur = cur.parentNode)) {
                            bp.unshift(cur);
                        }
                        // Walk down the tree looking for a discrepancy
                        while (ap[i] === bp[i]) {
                            i++;
                        }
                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck(ap[i], bp[i]) :
                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                    0;
                    };
                return document;
            };
            Sizzle.matches = function (expr, elements) {
                return Sizzle(expr, null, null, elements);
            };
            Sizzle.matchesSelector = function (elem, expr) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }
                // Make sure that attribute selectors are quoted
                expr = expr.replace(rattributeQuotes, "='$1']");
                if (support.matchesSelector && documentIsHTML &&
                    !compilerCache[expr + " "] &&
                    (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                    (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                    try {
                        var ret = matches.call(elem, expr);
                        // IE 9's matchesSelector returns false on disconnected nodes
                        if (ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    }
                    catch (e) { }
                }
                return Sizzle(expr, document, null, [elem]).length > 0;
            };
            Sizzle.contains = function (context, elem) {
                // Set document vars if needed
                if ((context.ownerDocument || context) !== document) {
                    setDocument(context);
                }
                return contains(context, elem);
            };
            Sizzle.attr = function (elem, name) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }
                var fn = Expr.attrHandle[name.toLowerCase()], 
                // Don't get fooled by Object.prototype properties (jQuery #13807)
                val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                    fn(elem, name, !documentIsHTML) :
                    undefined;
                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute(name) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
            };
            Sizzle.escape = function (sel) {
                return (sel + "").replace(rcssescape, fcssescape);
            };
            Sizzle.error = function (msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };
            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function (results) {
                var elem, duplicates = [], j = 0, i = 0;
                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);
                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1);
                    }
                }
                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;
                return results;
            };
            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function (elem) {
                var node, ret = "", i = 0, nodeType = elem.nodeType;
                if (!nodeType) {
                    // If no nodeType, this is expected to be an array
                    while ((node = elem[i++])) {
                        // Do not traverse comment nodes
                        ret += getText(node);
                    }
                }
                else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    }
                    else {
                        // Traverse its children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                }
                else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes
                return ret;
            };
            Expr = Sizzle.selectors = {
                // Can be adjusted by the user
                cacheLength: 50,
                createPseudo: markFunction,
                match: matchExpr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": { dir: "parentNode", first: true },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: true },
                    "~": { dir: "previousSibling" }
                },
                preFilter: {
                    "ATTR": function (match) {
                        match[1] = match[1].replace(runescape, funescape);
                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }
                        return match.slice(0, 4);
                    },
                    "CHILD": function (match) {
                        /* matches from matchExpr["CHILD"]
                            1 type (only|nth|...)
                            2 what (child|of-type)
                            3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                            4 xn-component of xn+y argument ([+-]?\d*n|)
                            5 sign of xn-component
                            6 x of xn-component
                            7 sign of y-component
                            8 y of y-component
                        */
                        match[1] = match[1].toLowerCase();
                        if (match[1].slice(0, 3) === "nth") {
                            // nth-* requires argument
                            if (!match[3]) {
                                Sizzle.error(match[0]);
                            }
                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +((match[7] + match[8]) || match[3] === "odd");
                            // other types prohibit arguments
                        }
                        else if (match[3]) {
                            Sizzle.error(match[0]);
                        }
                        return match;
                    },
                    "PSEUDO": function (match) {
                        var excess, unquoted = !match[6] && match[2];
                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }
                        // Accept quoted arguments as-is
                        if (match[3]) {
                            match[2] = match[4] || match[5] || "";
                            // Strip excess characters from unquoted arguments
                        }
                        else if (unquoted && rpseudo.test(unquoted) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                            // excess is a negative index
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }
                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice(0, 3);
                    }
                },
                filter: {
                    "TAG": function (nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function () { return true; } :
                            function (elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },
                    "CLASS": function (className) {
                        var pattern = classCache[className + " "];
                        return pattern ||
                            (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                                classCache(className, function (elem) {
                                    return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                                });
                    },
                    "ATTR": function (name, operator, check) {
                        return function (elem) {
                            var result = Sizzle.attr(elem, name);
                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }
                            result += "";
                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf(check) === 0 :
                                        operator === "*=" ? check && result.indexOf(check) > -1 :
                                            operator === "$=" ? check && result.slice(-check.length) === check :
                                                operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                                                    operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                                        false;
                        };
                    },
                    "CHILD": function (type, what, argument, first$$1, last) {
                        var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                        return first$$1 === 1 && last === 0 ?
                            // Shortcut for :nth-*(n)
                            function (elem) {
                                return !!elem.parentNode;
                            } :
                            function (elem, context, xml) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                                if (parent) {
                                    // :(first|last|only)-(child|of-type)
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) {
                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }
                                    start = [forward ? parent.firstChild : parent.lastChild];
                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if (forward && useCache) {
                                        // Seek `elem` from a previously-cached index
                                        // ...in a gzip-friendly way
                                        node = parent;
                                        outerCache = node[expando] || (node[expando] = {});
                                        // Support: IE <9 only
                                        // Defend against cloned attroperties (jQuery gh-1709)
                                        uniqueCache = outerCache[node.uniqueID] ||
                                            (outerCache[node.uniqueID] = {});
                                        cache = uniqueCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];
                                        while ((node = ++nodeIndex && node && node[dir] ||
                                            // Fallback to seeking `elem` from the start
                                            (diff = nodeIndex = 0) || start.pop())) {
                                            // When found, cache indexes on `parent` and break
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        // Use previously-cached element index if available
                                        if (useCache) {
                                            // ...in a gzip-friendly way
                                            node = elem;
                                            outerCache = node[expando] || (node[expando] = {});
                                            // Support: IE <9 only
                                            // Defend against cloned attroperties (jQuery gh-1709)
                                            uniqueCache = outerCache[node.uniqueID] ||
                                                (outerCache[node.uniqueID] = {});
                                            cache = uniqueCache[type] || [];
                                            nodeIndex = cache[0] === dirruns && cache[1];
                                            diff = nodeIndex;
                                        }
                                        // xml :nth-child(...)
                                        // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                        if (diff === false) {
                                            // Use the same loop as above to seek `elem` from the start
                                            while ((node = ++nodeIndex && node && node[dir] ||
                                                (diff = nodeIndex = 0) || start.pop())) {
                                                if ((ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) &&
                                                    ++diff) {
                                                    // Cache the index of each encountered element
                                                    if (useCache) {
                                                        outerCache = node[expando] || (node[expando] = {});
                                                        // Support: IE <9 only
                                                        // Defend against cloned attroperties (jQuery gh-1709)
                                                        uniqueCache = outerCache[node.uniqueID] ||
                                                            (outerCache[node.uniqueID] = {});
                                                        uniqueCache[type] = [dirruns, diff];
                                                    }
                                                    if (node === elem) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first$$1 || (diff % first$$1 === 0 && diff / first$$1 >= 0);
                                }
                            };
                    },
                    "PSEUDO": function (pseudo, argument) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                            Sizzle.error("unsupported pseudo: " + pseudo);
                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if (fn[expando]) {
                            return fn(argument);
                        }
                        // But maintain support for old signatures
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function (seed, matches) {
                                    var idx, matched = fn(seed, argument), i = matched.length;
                                    while (i--) {
                                        idx = indexOf(seed, matched[i]);
                                        seed[idx] = !(matches[idx] = matched[i]);
                                    }
                                }) :
                                function (elem) {
                                    return fn(elem, 0, args);
                                };
                        }
                        return fn;
                    }
                },
                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function (selector) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                        return matcher[expando] ?
                            markFunction(function (seed, matches, context, xml) {
                                var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                                // Match elements unmatched by `matcher`
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function (elem, context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                // Don't keep the element (issue #299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),
                    "has": markFunction(function (selector) {
                        return function (elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),
                    "contains": markFunction(function (text) {
                        text = text.replace(runescape, funescape);
                        return function (elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                        };
                    }),
                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction(function (lang) {
                        // lang value must be a valid identifier
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function (elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                    elem.lang :
                                    elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),
                    // Miscellaneous
                    "target": function (elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },
                    "root": function (elem) {
                        return elem === docElem;
                    },
                    "focus": function (elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },
                    // Boolean properties
                    "enabled": createDisabledPseudo(false),
                    "disabled": createDisabledPseudo(true),
                    "checked": function (elem) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },
                    "selected": function (elem) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex;
                        }
                        return elem.selected === true;
                    },
                    // Contents
                    "empty": function (elem) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },
                    "parent": function (elem) {
                        return !Expr.pseudos["empty"](elem);
                    },
                    // Element/input types
                    "header": function (elem) {
                        return rheader.test(elem.nodeName);
                    },
                    "input": function (elem) {
                        return rinputs.test(elem.nodeName);
                    },
                    "button": function (elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },
                    "text": function (elem) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&
                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                    },
                    // Position-in-collection
                    "first": createPositionalPseudo(function () {
                        return [0];
                    }),
                    "last": createPositionalPseudo(function (matchIndexes, length) {
                        return [length - 1];
                    }),
                    "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument];
                    }),
                    "even": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    "odd": createPositionalPseudo(function (matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };
            Expr.pseudos["nth"] = Expr.pseudos["eq"];
            // Add button/input type pseudos
            for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in { submit: true, reset: true }) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }
            // Easy API for creating new setFilters
            function setFilters() { }
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();
            tokenize = Sizzle.tokenize = function (selector, parseOnly) {
                var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }
                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;
                while (soFar) {
                    // Comma and first run
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push((tokens = []));
                    }
                    matched = false;
                    // Combinators
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }
                    // Filters
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                            (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }
                    if (!matched) {
                        break;
                    }
                }
                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error(selector) :
                        // Cache the tokens
                        tokenCache(selector, groups).slice(0);
            };
            function toSelector(tokens) {
                var i = 0, len = tokens.length, selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }
            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && key === "parentNode", doneName = done++;
                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function (elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                        return false;
                    } :
                    // Check against all ancestor/preceding elements
                    function (elem, context, xml) {
                        var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        }
                        else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});
                                    // Support: IE <9 only
                                    // Defend against cloned attroperties (jQuery gh-1709)
                                    uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                                    if (skip && skip === elem.nodeName.toLowerCase()) {
                                        elem = elem[dir] || elem;
                                    }
                                    else if ((oldCache = uniqueCache[key]) &&
                                        oldCache[0] === dirruns && oldCache[1] === doneName) {
                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[2] = oldCache[2]);
                                    }
                                    else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        uniqueCache[key] = newCache;
                                        // A match means we're done; a fail means we have to keep checking
                                        if ((newCache[2] = matcher(elem, context, xml))) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                        return false;
                    };
            }
            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function (elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }
            function multipleContexts(selector, contexts, results) {
                var i = 0, len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results);
                }
                return results;
            }
            function condense(unmatched, map, filter, context, xml) {
                var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }
                return newUnmatched;
            }
            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function (seed, results, context, xml) {
                    var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, 
                    // Get initial elements from seed or context
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), 
                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
                    matcherIn = preFilter && (seed || !selector) ?
                        condense(elems, preMap, preFilter, context, xml) :
                        elems, matcherOut = matcher ?
                        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                        postFinder || (seed ? preFilter : preexisting || postFilter) ?
                            // ...intermediate processing is necessary
                            [] :
                            // ...otherwise use results directly
                            results :
                        matcherIn;
                    // Find primary matches
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml);
                    }
                    // Apply postFilter
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);
                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }
                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push((matcherIn[i] = elem));
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml);
                            }
                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }
                        // Add elements to results, through postFinder if defined
                    }
                    else {
                        matcherOut = condense(matcherOut === results ?
                            matcherOut.splice(preexisting, matcherOut.length) :
                            matcherOut);
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        }
                        else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }
            function matcherFromTokens(tokens) {
                var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, 
                // The foundational matcher ensures that elements are reachable from top-level context(s)
                matchContext = addCombinator(function (elem) {
                    return elem === checkContext;
                }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
                    return indexOf(checkContext, elem) > -1;
                }, implicitRelative, true), matchers = [function (elem, context, xml) {
                        var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ?
                            matchContext(elem, context, xml) :
                            matchAnyContext(elem, context, xml));
                        // Avoid hanging onto element (issue #299)
                        checkContext = null;
                        return ret;
                    }];
                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    }
                    else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                        // Return special upon seeing a positional matcher
                        if (matcher[expando]) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
                            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                            tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
                        }
                        matchers.push(matcher);
                    }
                }
                return elementMatcher(matchers);
            }
            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, outermost) {
                    var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, 
                    // We must always have either seed elements or outermost context
                    elems = seed || byElement && Expr.find["TAG"]("*", outermost), 
                    // Use integer dirruns iff this is the outermost matcher
                    dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1), len = elems.length;
                    if (outermost) {
                        outermostContext = context === document || context || outermost;
                    }
                    // Add elements passing elementMatchers directly to results
                    // Support: IE<9, Safari
                    // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                    for (; i !== len && (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            if (!context && elem.ownerDocument !== document) {
                                setDocument(elem);
                                xml = !documentIsHTML;
                            }
                            while ((matcher = elementMatchers[j++])) {
                                if (matcher(elem, context || document, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                            }
                        }
                        // Track unmatched elements for set filters
                        if (bySet) {
                            // They will have gone through all possible matchers
                            if ((elem = !matcher && elem)) {
                                matchedCount--;
                            }
                            // Lengthen the array for every element, matched or not
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }
                    // `i` is now the count of elements visited above, and adding it to `matchedCount`
                    // makes the latter nonnegative.
                    matchedCount += i;
                    // Apply set filters to unmatched elements
                    // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                    // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                    // no element matchers and no seed.
                    // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                    // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                    // numerically zero.
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while ((matcher = setMatchers[j++])) {
                            matcher(unmatched, setMatched, context, xml);
                        }
                        if (seed) {
                            // Reintegrate element matches to eliminate the need for sorting
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }
                            // Discard index placeholder values to get only actual matches
                            setMatched = condense(setMatched);
                        }
                        // Add matches to results
                        push.apply(results, setMatched);
                        // Seedless set matches succeeding multiple successful matchers stipulate sorting
                        if (outermost && !seed && setMatched.length > 0 &&
                            (matchedCount + setMatchers.length) > 1) {
                            Sizzle.uniqueSort(results);
                        }
                    }
                    // Override manipulation of globals by nested matchers
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }
                    return unmatched;
                };
                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher;
            }
            compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
                var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
                if (!cached) {
                    // Generate a function of recursive functions that can be used to check each element
                    if (!match) {
                        match = tokenize(selector);
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        }
                        else {
                            elementMatchers.push(cached);
                        }
                    }
                    // Cache the compiled function
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };
            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function (selector, context, results, seed) {
                var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize((selector = compiled.selector || selector));
                results = results || [];
                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if (match.length === 1) {
                    // Reduce context if the leading compound selector is an ID
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                        context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results;
                            // Precompiled matchers will still verify ancestry, so step up a level
                        }
                        else if (compiled) {
                            context = context.parentNode;
                        }
                        selector = selector.slice(tokens.shift().value.length);
                    }
                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];
                        // Abort if we hit a combinator
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            // Search, expanding context for leading sibling combinators
                            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results;
                                }
                                break;
                            }
                        }
                    }
                }
                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
                return results;
            };
            // One-time assignments
            // Sort stability
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
            // Support: Chrome 14-35+
            // Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;
            // Initialize against the default document
            setDocument();
            // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
            // Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function (el) {
                // Should return 1, but returns 4 (following)
                return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
            });
            // Support: IE<8
            // Prevent attribute/property "interpolation"
            // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if (!assert(function (el) {
                el.innerHTML = "<a href='#'></a>";
                return el.firstChild.getAttribute("href") === "#";
            })) {
                addHandle("type|href|height|width", function (elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }
            // Support: IE<9
            // Use defaultValue in place of getAttribute("value")
            if (!support.attributes || !assert(function (el) {
                el.innerHTML = "<input/>";
                el.firstChild.setAttribute("value", "");
                return el.firstChild.getAttribute("value") === "";
            })) {
                addHandle("value", function (elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue;
                    }
                });
            }
            // Support: IE<9
            // Use getAttributeNode to fetch booleans when getAttribute lies
            if (!assert(function (el) {
                return el.getAttribute("disabled") == null;
            })) {
                addHandle(booleans, function (elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode(name)) && val.specified ?
                                val.value :
                                null;
                    }
                });
            }
            return Sizzle;
        })(window);
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        // Deprecated
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
        jQuery.escapeSelector = Sizzle.escape;
        var dir = function (elem, dir, until) {
            var matched = [], truncate = until !== undefined;
            while ((elem = elem[dir]) && elem.nodeType !== 9) {
                if (elem.nodeType === 1) {
                    if (truncate && jQuery(elem).is(until)) {
                        break;
                    }
                    matched.push(elem);
                }
            }
            return matched;
        };
        var siblings = function (n, elem) {
            var matched = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    matched.push(n);
                }
            }
            return matched;
        };
        var rneedsContext = jQuery.expr.match.needsContext;
        function nodeName(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }
        var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);
        var risSimple = /^.[^:#\[\.,]*$/;
        // Implement the identical functionality for filter and not
        function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) {
                return jQuery.grep(elements, function (elem, i) {
                    return !!qualifier.call(elem, i, elem) !== not;
                });
            }
            // Single element
            if (qualifier.nodeType) {
                return jQuery.grep(elements, function (elem) {
                    return (elem === qualifier) !== not;
                });
            }
            // Arraylike of elements (jQuery, arguments, Array)
            if (typeof qualifier !== "string") {
                return jQuery.grep(elements, function (elem) {
                    return (indexOf.call(qualifier, elem) > -1) !== not;
                });
            }
            // Simple selector that can be filtered directly, removing non-Elements
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }
            // Complex selector, compare the two sets, removing non-Elements
            qualifier = jQuery.filter(qualifier, elements);
            return jQuery.grep(elements, function (elem) {
                return (indexOf.call(qualifier, elem) > -1) !== not && elem.nodeType === 1;
            });
        }
        jQuery.filter = function (expr, elems, not) {
            var elem = elems[0];
            if (not) {
                expr = ":not(" + expr + ")";
            }
            if (elems.length === 1 && elem.nodeType === 1) {
                return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
            }
            return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
                return elem.nodeType === 1;
            }));
        };
        jQuery.fn.extend({
            find: function (selector) {
                var i, ret, len = this.length, self = this;
                if (typeof selector !== "string") {
                    return this.pushStack(jQuery(selector).filter(function () {
                        for (i = 0; i < len; i++) {
                            if (jQuery.contains(self[i], this)) {
                                return true;
                            }
                        }
                    }));
                }
                ret = this.pushStack([]);
                for (i = 0; i < len; i++) {
                    jQuery.find(selector, self[i], ret);
                }
                return len > 1 ? jQuery.uniqueSort(ret) : ret;
            },
            filter: function (selector) {
                return this.pushStack(winnow(this, selector || [], false));
            },
            not: function (selector) {
                return this.pushStack(winnow(this, selector || [], true));
            },
            is: function (selector) {
                return !!winnow(this, 
                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test(selector) ?
                    jQuery(selector) :
                    selector || [], false).length;
            }
        });
        // Initialize a jQuery object
        // A central reference to the root jQuery(document)
        var rootjQuery, 
        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        // Shortcut simple #id case for speed
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function (selector, context, root) {
            var match, elem;
            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }
            // Method init() accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;
            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector[0] === "<" &&
                    selector[selector.length - 1] === ">" &&
                    selector.length >= 3) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [null, selector, null];
                }
                else {
                    match = rquickExpr.exec(selector);
                }
                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {
                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                // Properties of context are called as methods if possible
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);
                                    // ...and otherwise set as attributes
                                }
                                else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }
                        return this;
                        // HANDLE: $(#id)
                    }
                    else {
                        elem = document.getElementById(match[2]);
                        if (elem) {
                            // Inject the element directly into the jQuery object
                            this[0] = elem;
                            this.length = 1;
                        }
                        return this;
                    }
                    // HANDLE: $(expr, $(...))
                }
                else if (!context || context.jquery) {
                    return (context || root).find(selector);
                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                }
                else {
                    return this.constructor(context).find(selector);
                }
                // HANDLE: $(DOMElement)
            }
            else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;
                // HANDLE: $(function)
                // Shortcut for document ready
            }
            else if (jQuery.isFunction(selector)) {
                return root.ready !== undefined ?
                    root.ready(selector) :
                    // Execute immediately if ready is not present
                    selector(jQuery);
            }
            return jQuery.makeArray(selector, this);
        };
        // Give the init function the jQuery prototype for later instantiation
        init.prototype = jQuery.fn;
        // Initialize central reference
        rootjQuery = jQuery(document);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, 
        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
        jQuery.fn.extend({
            has: function (target) {
                var targets = jQuery(target, this), l = targets.length;
                return this.filter(function () {
                    var i = 0;
                    for (; i < l; i++) {
                        if (jQuery.contains(this, targets[i])) {
                            return true;
                        }
                    }
                });
            },
            closest: function (selectors, context) {
                var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
                // Positional selectors never match, since there's no _selection_ context
                if (!rneedsContext.test(selectors)) {
                    for (; i < l; i++) {
                        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                            // Always skip document fragments
                            if (cur.nodeType < 11 && (targets ?
                                targets.index(cur) > -1 :
                                // Don't pass non-elements to Sizzle
                                cur.nodeType === 1 &&
                                    jQuery.find.matchesSelector(cur, selectors))) {
                                matched.push(cur);
                                break;
                            }
                        }
                    }
                }
                return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
            },
            // Determine the position of an element within the set
            index: function (elem) {
                // No argument, return index in parent
                if (!elem) {
                    return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
                }
                // Index in selector
                if (typeof elem === "string") {
                    return indexOf.call(jQuery(elem), this[0]);
                }
                // Locate the position of the desired element
                return indexOf.call(this, 
                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem);
            },
            add: function (selector, context) {
                return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
            },
            addBack: function (selector) {
                return this.add(selector == null ?
                    this.prevObject : this.prevObject.filter(selector));
            }
        });
        function sibling(cur, dir) {
            while ((cur = cur[dir]) && cur.nodeType !== 1) { }
            return cur;
        }
        jQuery.each({
            parent: function (elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            },
            parents: function (elem) {
                return dir(elem, "parentNode");
            },
            parentsUntil: function (elem, i, until) {
                return dir(elem, "parentNode", until);
            },
            next: function (elem) {
                return sibling(elem, "nextSibling");
            },
            prev: function (elem) {
                return sibling(elem, "previousSibling");
            },
            nextAll: function (elem) {
                return dir(elem, "nextSibling");
            },
            prevAll: function (elem) {
                return dir(elem, "previousSibling");
            },
            nextUntil: function (elem, i, until) {
                return dir(elem, "nextSibling", until);
            },
            prevUntil: function (elem, i, until) {
                return dir(elem, "previousSibling", until);
            },
            siblings: function (elem) {
                return siblings((elem.parentNode || {}).firstChild, elem);
            },
            children: function (elem) {
                return siblings(elem.firstChild);
            },
            contents: function (elem) {
                if (nodeName(elem, "iframe")) {
                    return elem.contentDocument;
                }
                // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
                // Treat the template element as a regular one in browsers that
                // don't support it.
                if (nodeName(elem, "template")) {
                    elem = elem.content || elem;
                }
                return jQuery.merge([], elem.childNodes);
            }
        }, function (name, fn) {
            jQuery.fn[name] = function (until, selector) {
                var matched = jQuery.map(this, fn, until);
                if (name.slice(-5) !== "Until") {
                    selector = until;
                }
                if (selector && typeof selector === "string") {
                    matched = jQuery.filter(selector, matched);
                }
                if (this.length > 1) {
                    // Remove duplicates
                    if (!guaranteedUnique[name]) {
                        jQuery.uniqueSort(matched);
                    }
                    // Reverse order for parents* and prev-derivatives
                    if (rparentsprev.test(name)) {
                        matched.reverse();
                    }
                }
                return this.pushStack(matched);
            };
        });
        var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);
        // Convert String-formatted options into Object-formatted ones
        function createOptions(options) {
            var object = {};
            jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
                object[flag] = true;
            });
            return object;
        }
        /*
         * Create a callback list using the following parameters:
         *
         *	options: an optional list of space-separated options that will change how
         *			the callback list behaves or a more traditional option object
         *
         * By default a callback list will act like an event callback list and can be
         * "fired" multiple times.
         *
         * Possible options:
         *
         *	once:			will ensure the callback list can only be fired once (like a Deferred)
         *
         *	memory:			will keep track of previous values and will call any callback added
         *					after the list has been fired right away with the latest "memorized"
         *					values (like a Deferred)
         *
         *	unique:			will ensure a callback can only be added once (no duplicate in the list)
         *
         *	stopOnFalse:	interrupt callings when a callback returns false
         *
         */
        jQuery.Callbacks = function (options) {
            // Convert options from String-formatted to Object-formatted if needed
            // (we check in cache first)
            options = typeof options === "string" ?
                createOptions(options) :
                jQuery.extend({}, options);
            var // Flag to know if list is currently firing
            firing, 
            // Last fire value for non-forgettable lists
            memory, 
            // Flag to know if list was already fired
            fired, 
            // Flag to prevent firing
            locked, 
            // Actual callback list
            list = [], 
            // Queue of execution data for repeatable lists
            queue = [], 
            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1, 
            // Fire callbacks
            fire = function () {
                // Enforce single-firing
                locked = locked || options.once;
                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {
                        // Run callback and check for early termination
                        if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                            options.stopOnFalse) {
                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }
                // Forget the data if we're done with it
                if (!options.memory) {
                    memory = false;
                }
                firing = false;
                // Clean up if we're done firing for good
                if (locked) {
                    // Keep an empty list if we have data for future add calls
                    if (memory) {
                        list = [];
                        // Otherwise, this object is spent
                    }
                    else {
                        list = "";
                    }
                }
            }, 
            // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list) {
                        // If we have memory from a past run, we should fire after adding
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory);
                        }
                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                if (jQuery.isFunction(arg)) {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                }
                                else if (arg && arg.length && jQuery.type(arg) !== "string") {
                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);
                        if (memory && !firing) {
                            fire();
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function () {
                    jQuery.each(arguments, function (_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            // Handle firing indexes
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    });
                    return this;
                },
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn) {
                    return fn ?
                        jQuery.inArray(fn, list) > -1 :
                        list.length > 0;
                },
                // Remove all callbacks from the list
                empty: function () {
                    if (list) {
                        list = [];
                    }
                    return this;
                },
                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function () {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function () {
                    return !list;
                },
                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function () {
                    locked = queue = [];
                    if (!memory && !firing) {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function () {
                    return !!locked;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        queue.push(args);
                        if (!firing) {
                            fire();
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired;
                }
            };
            return self;
        };
        function Identity(v) {
            return v;
        }
        function Thrower(ex) {
            throw ex;
        }
        function adoptValue(value, resolve, reject, noValue) {
            var method;
            try {
                // Check for promise aspect first to privilege synchronous behavior
                if (value && jQuery.isFunction((method = value.promise))) {
                    method.call(value).done(resolve).fail(reject);
                    // Other thenables
                }
                else if (value && jQuery.isFunction((method = value.then))) {
                    method.call(value, resolve, reject);
                    // Other non-thenables
                }
                else {
                    // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                    // * false: [ value ].slice( 0 ) => resolve( value )
                    // * true: [ value ].slice( 1 ) => resolve()
                    resolve.apply(undefined, [value].slice(noValue));
                }
                // For Promises/A+, convert exceptions into rejections
                // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
                // Deferred#then to conditionally suppress rejection.
            }
            catch (value) {
                // Support: Android 4.0 only
                // Strict mode functions invoked without .call/.apply get global-object context
                reject.apply(undefined, [value]);
            }
        }
        jQuery.extend({
            Deferred: function (func) {
                var tuples = [
                    // action, add listener, callbacks,
                    // ... .then handlers, argument index, [final state]
                    ["notify", "progress", jQuery.Callbacks("memory"),
                        jQuery.Callbacks("memory"), 2],
                    ["resolve", "done", jQuery.Callbacks("once memory"),
                        jQuery.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"),
                        jQuery.Callbacks("once memory"), 1, "rejected"]
                ], state = "pending", promise = {
                    state: function () {
                        return state;
                    },
                    always: function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    "catch": function (fn) {
                        return promise.then(null, fn);
                    },
                    // Keep pipe for back-compat
                    pipe: function () {
                        var fns = arguments;
                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {
                                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                                var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];
                                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                                deferred[tuple[1]](function () {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise()
                                            .progress(newDefer.notify)
                                            .done(newDefer.resolve)
                                            .fail(newDefer.reject);
                                    }
                                    else {
                                        newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    then: function (onFulfilled, onRejected, onProgress) {
                        var maxDepth = 0;
                        function resolve(depth, deferred, handler, special) {
                            return function () {
                                var that = this, args = arguments, mightThrow = function () {
                                    var returned, then;
                                    // Support: Promises/A+ section 2.3.3.3.3
                                    // https://promisesaplus.com/#point-59
                                    // Ignore double-resolution attempts
                                    if (depth < maxDepth) {
                                        return;
                                    }
                                    returned = handler.apply(that, args);
                                    // Support: Promises/A+ section 2.3.1
                                    // https://promisesaplus.com/#point-48
                                    if (returned === deferred.promise()) {
                                        throw new TypeError("Thenable self-resolution");
                                    }
                                    // Support: Promises/A+ sections 2.3.3.1, 3.5
                                    // https://promisesaplus.com/#point-54
                                    // https://promisesaplus.com/#point-75
                                    // Retrieve `then` only once
                                    then = returned &&
                                        // Support: Promises/A+ section 2.3.4
                                        // https://promisesaplus.com/#point-64
                                        // Only check objects and functions for thenability
                                        (typeof returned === "object" ||
                                            typeof returned === "function") &&
                                        returned.then;
                                    // Handle a returned thenable
                                    if (jQuery.isFunction(then)) {
                                        // Special processors (notify) just wait for resolution
                                        if (special) {
                                            then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
                                            // Normal processors (resolve) also hook into progress
                                        }
                                        else {
                                            // ...and disregard older resolution values
                                            maxDepth++;
                                            then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                                        }
                                        // Handle all other returned values
                                    }
                                    else {
                                        // Only substitute handlers pass on context
                                        // and multiple values (non-spec behavior)
                                        if (handler !== Identity) {
                                            that = undefined;
                                            args = [returned];
                                        }
                                        // Process the value(s)
                                        // Default process is resolve
                                        (special || deferred.resolveWith)(that, args);
                                    }
                                }, 
                                // Only normal processors (resolve) catch and reject exceptions
                                process = special ?
                                    mightThrow :
                                    function () {
                                        try {
                                            mightThrow();
                                        }
                                        catch (e) {
                                            if (jQuery.Deferred.exceptionHook) {
                                                jQuery.Deferred.exceptionHook(e, process.stackTrace);
                                            }
                                            // Support: Promises/A+ section 2.3.3.3.4.1
                                            // https://promisesaplus.com/#point-61
                                            // Ignore post-resolution exceptions
                                            if (depth + 1 >= maxDepth) {
                                                // Only substitute handlers pass on context
                                                // and multiple values (non-spec behavior)
                                                if (handler !== Thrower) {
                                                    that = undefined;
                                                    args = [e];
                                                }
                                                deferred.rejectWith(that, args);
                                            }
                                        }
                                    };
                                // Support: Promises/A+ section 2.3.3.3.1
                                // https://promisesaplus.com/#point-57
                                // Re-resolve promises immediately to dodge false rejection from
                                // subsequent errors
                                if (depth) {
                                    process();
                                }
                                else {
                                    // Call an optional hook to record the stack, in case of exception
                                    // since it's otherwise lost when execution goes async
                                    if (jQuery.Deferred.getStackHook) {
                                        process.stackTrace = jQuery.Deferred.getStackHook();
                                    }
                                    window.setTimeout(process);
                                }
                            };
                        }
                        return jQuery.Deferred(function (newDefer) {
                            // progress_handlers.add( ... )
                            tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ?
                                onProgress :
                                Identity, newDefer.notifyWith));
                            // fulfilled_handlers.add( ... )
                            tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ?
                                onFulfilled :
                                Identity));
                            // rejected_handlers.add( ... )
                            tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ?
                                onRejected :
                                Thrower));
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                }, deferred = {};
                // Add list-specific methods
                jQuery.each(tuples, function (i, tuple) {
                    var list = tuple[2], stateString = tuple[5];
                    // promise.progress = list.add
                    // promise.done = list.add
                    // promise.fail = list.add
                    promise[tuple[1]] = list.add;
                    // Handle state
                    if (stateString) {
                        list.add(function () {
                            // state = "resolved" (i.e., fulfilled)
                            // state = "rejected"
                            state = stateString;
                        }, 
                        // rejected_callbacks.disable
                        // fulfilled_callbacks.disable
                        tuples[3 - i][2].disable, 
                        // progress_callbacks.lock
                        tuples[0][2].lock);
                    }
                    // progress_handlers.fire
                    // fulfilled_handlers.fire
                    // rejected_handlers.fire
                    list.add(tuple[3].fire);
                    // deferred.notify = function() { deferred.notifyWith(...) }
                    // deferred.resolve = function() { deferred.resolveWith(...) }
                    // deferred.reject = function() { deferred.rejectWith(...) }
                    deferred[tuple[0]] = function () {
                        deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
                        return this;
                    };
                    // deferred.notifyWith = list.fireWith
                    // deferred.resolveWith = list.fireWith
                    // deferred.rejectWith = list.fireWith
                    deferred[tuple[0] + "With"] = list.fireWith;
                });
                // Make the deferred a promise
                promise.promise(deferred);
                // Call given func if any
                if (func) {
                    func.call(deferred, deferred);
                }
                // All done!
                return deferred;
            },
            // Deferred helper
            when: function (singleValue) {
                var 
                // count of uncompleted subordinates
                remaining = arguments.length, 
                // count of unprocessed arguments
                i = remaining, 
                // subordinate fulfillment data
                resolveContexts = Array(i), resolveValues = slice.call(arguments), 
                // the master Deferred
                master = jQuery.Deferred(), 
                // subordinate callback factory
                updateFunc = function (i) {
                    return function (value) {
                        resolveContexts[i] = this;
                        resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (!(--remaining)) {
                            master.resolveWith(resolveContexts, resolveValues);
                        }
                    };
                };
                // Single- and empty arguments are adopted like Promise.resolve
                if (remaining <= 1) {
                    adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);
                    // Use .then() to unwrap secondary thenables (cf. gh-3000)
                    if (master.state() === "pending" ||
                        jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {
                        return master.then();
                    }
                }
                // Multiple arguments are aggregated like Promise.all array elements
                while (i--) {
                    adoptValue(resolveValues[i], updateFunc(i), master.reject);
                }
                return master.promise();
            }
        });
        // These usually indicate a programmer mistake during development,
        // warn about them ASAP rather than swallowing them by default.
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery.Deferred.exceptionHook = function (error, stack) {
            // Support: IE 8 - 9 only
            // Console exists when dev tools are open, which can happen at any time
            if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
                window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
            }
        };
        jQuery.readyException = function (error) {
            window.setTimeout(function () {
                throw error;
            });
        };
        // The deferred used on DOM ready
        var readyList = jQuery.Deferred();
        jQuery.fn.ready = function (fn) {
            readyList
                .then(fn)
                .catch(function (error) {
                jQuery.readyException(error);
            });
            return this;
        };
        jQuery.extend({
            // Is the DOM ready to be used? Set to true once it occurs.
            isReady: false,
            // A counter to track how many items to wait for before
            // the ready event fires. See #6781
            readyWait: 1,
            // Handle when the DOM is ready
            ready: function (wait) {
                // Abort if there are pending holds or we're already ready
                if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                    return;
                }
                // Remember that the DOM is ready
                jQuery.isReady = true;
                // If a normal DOM Ready event fired, decrement, and wait if need be
                if (wait !== true && --jQuery.readyWait > 0) {
                    return;
                }
                // If there are functions bound, to execute
                readyList.resolveWith(document, [jQuery]);
            }
        });
        jQuery.ready.then = readyList.then;
        // The ready event handler and self cleanup method
        function completed() {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
            jQuery.ready();
        }
        // Catch cases where $(document).ready() is called
        // after the browser event has already occurred.
        // Support: IE <=9 - 10 only
        // Older IE sometimes signals "interactive" too soon
        if (document.readyState === "complete" ||
            (document.readyState !== "loading" && !document.documentElement.doScroll)) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            window.setTimeout(jQuery.ready);
        }
        else {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", completed);
            // A fallback to window.onload, that will always work
            window.addEventListener("load", completed);
        }
        // Multifunctional method to get and set values of a collection
        // The value/s can optionally be executed if it's a function
        var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0, len = elems.length, bulk = key == null;
            // Sets many values
            if (jQuery.type(key) === "object") {
                chainable = true;
                for (i in key) {
                    access(elems, fn, i, key[i], true, emptyGet, raw);
                }
                // Sets one value
            }
            else if (value !== undefined) {
                chainable = true;
                if (!jQuery.isFunction(value)) {
                    raw = true;
                }
                if (bulk) {
                    // Bulk operations run against the entire set
                    if (raw) {
                        fn.call(elems, value);
                        fn = null;
                        // ...except when executing function values
                    }
                    else {
                        bulk = fn;
                        fn = function (elem, key, value) {
                            return bulk.call(jQuery(elem), value);
                        };
                    }
                }
                if (fn) {
                    for (; i < len; i++) {
                        fn(elems[i], key, raw ?
                            value :
                            value.call(elems[i], i, fn(elems[i], key)));
                    }
                }
            }
            if (chainable) {
                return elems;
            }
            // Gets
            if (bulk) {
                return fn.call(elems);
            }
            return len ? fn(elems[0], key) : emptyGet;
        };
        var acceptData = function (owner) {
            // Accepts only:
            //  - Node
            //    - Node.ELEMENT_NODE
            //    - Node.DOCUMENT_NODE
            //  - Object
            //    - Any
            return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
        };
        function Data() {
            this.expando = jQuery.expando + Data.uid++;
        }
        Data.uid = 1;
        Data.prototype = {
            cache: function (owner) {
                // Check if the owner object already has a cache
                var value = owner[this.expando];
                // If not, create one
                if (!value) {
                    value = {};
                    // We can accept data for non-element nodes in modern browsers,
                    // but we should not, see #8335.
                    // Always return an empty object.
                    if (acceptData(owner)) {
                        // If it is a node unlikely to be stringify-ed or looped over
                        // use plain assignment
                        if (owner.nodeType) {
                            owner[this.expando] = value;
                            // Otherwise secure it in a non-enumerable property
                            // configurable must be true to allow the property to be
                            // deleted when data is removed
                        }
                        else {
                            Object.defineProperty(owner, this.expando, {
                                value: value,
                                configurable: true
                            });
                        }
                    }
                }
                return value;
            },
            set: function (owner, data, value) {
                var prop, cache = this.cache(owner);
                // Handle: [ owner, key, value ] args
                // Always use camelCase key (gh-2257)
                if (typeof data === "string") {
                    cache[jQuery.camelCase(data)] = value;
                    // Handle: [ owner, { properties } ] args
                }
                else {
                    // Copy the properties one-by-one to the cache object
                    for (prop in data) {
                        cache[jQuery.camelCase(prop)] = data[prop];
                    }
                }
                return cache;
            },
            get: function (owner, key) {
                return key === undefined ?
                    this.cache(owner) :
                    // Always use camelCase key (gh-2257)
                    owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
            },
            access: function (owner, key, value) {
                // In cases where either:
                //
                //   1. No key was specified
                //   2. A string key was specified, but no value provided
                //
                // Take the "read" path and allow the get method to determine
                // which value to return, respectively either:
                //
                //   1. The entire cache object
                //   2. The data stored at the key
                //
                if (key === undefined ||
                    ((key && typeof key === "string") && value === undefined)) {
                    return this.get(owner, key);
                }
                // When the key is not a string, or both a key and value
                // are specified, set or extend (existing objects) with either:
                //
                //   1. An object of properties
                //   2. A key and value
                //
                this.set(owner, key, value);
                // Since the "set" path can have two possible entry points
                // return the expected data based on which path was taken[*]
                return value !== undefined ? value : key;
            },
            remove: function (owner, key) {
                var i, cache = owner[this.expando];
                if (cache === undefined) {
                    return;
                }
                if (key !== undefined) {
                    // Support array or space separated string of keys
                    if (Array.isArray(key)) {
                        // If key is an array of keys...
                        // We always set camelCase keys, so remove that.
                        key = key.map(jQuery.camelCase);
                    }
                    else {
                        key = jQuery.camelCase(key);
                        // If a key with the spaces exists, use it.
                        // Otherwise, create an array by matching non-whitespace
                        key = key in cache ?
                            [key] :
                            (key.match(rnothtmlwhite) || []);
                    }
                    i = key.length;
                    while (i--) {
                        delete cache[key[i]];
                    }
                }
                // Remove the expando if there's no more data
                if (key === undefined || jQuery.isEmptyObject(cache)) {
                    // Support: Chrome <=35 - 45
                    // Webkit & Blink performance suffers when deleting properties
                    // from DOM nodes, so set to undefined instead
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                    if (owner.nodeType) {
                        owner[this.expando] = undefined;
                    }
                    else {
                        delete owner[this.expando];
                    }
                }
            },
            hasData: function (owner) {
                var cache = owner[this.expando];
                return cache !== undefined && !jQuery.isEmptyObject(cache);
            }
        };
        var dataPriv = new Data();
        var dataUser = new Data();
        //	Implementation Summary
        //
        //	1. Enforce API surface and semantic compatibility with 1.9.x branch
        //	2. Improve the module's maintainability by reducing the storage
        //		paths to a single mechanism.
        //	3. Use the same single mechanism to support "private" and "user" data.
        //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
        //	5. Avoid exposing implementation details on user objects (eg. expando properties)
        //	6. Provide a clear path for implementation upgrade to WeakMap in 2014
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        function getData(data) {
            if (data === "true") {
                return true;
            }
            if (data === "false") {
                return false;
            }
            if (data === "null") {
                return null;
            }
            // Only convert to a number if it doesn't change the string
            if (data === +data + "") {
                return +data;
            }
            if (rbrace.test(data)) {
                return JSON.parse(data);
            }
            return data;
        }
        function dataAttr(elem, key, data) {
            var name;
            // If nothing was found internally, try to fetch any
            // data from the HTML5 data-* attribute
            if (data === undefined && elem.nodeType === 1) {
                name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
                data = elem.getAttribute(name);
                if (typeof data === "string") {
                    try {
                        data = getData(data);
                    }
                    catch (e) { }
                    // Make sure we set the data so it isn't changed later
                    dataUser.set(elem, key, data);
                }
                else {
                    data = undefined;
                }
            }
            return data;
        }
        jQuery.extend({
            hasData: function (elem) {
                return dataUser.hasData(elem) || dataPriv.hasData(elem);
            },
            data: function (elem, name, data) {
                return dataUser.access(elem, name, data);
            },
            removeData: function (elem, name) {
                dataUser.remove(elem, name);
            },
            // TODO: Now that all calls to _data and _removeData have been replaced
            // with direct calls to dataPriv methods, these can be deprecated.
            _data: function (elem, name, data) {
                return dataPriv.access(elem, name, data);
            },
            _removeData: function (elem, name) {
                dataPriv.remove(elem, name);
            }
        });
        jQuery.fn.extend({
            data: function (key, value) {
                var i, name, data, elem = this[0], attrs = elem && elem.attributes;
                // Gets all values
                if (key === undefined) {
                    if (this.length) {
                        data = dataUser.get(elem);
                        if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                            i = attrs.length;
                            while (i--) {
                                // Support: IE 11 only
                                // The attrs elements can be null (#14894)
                                if (attrs[i]) {
                                    name = attrs[i].name;
                                    if (name.indexOf("data-") === 0) {
                                        name = jQuery.camelCase(name.slice(5));
                                        dataAttr(elem, name, data[name]);
                                    }
                                }
                            }
                            dataPriv.set(elem, "hasDataAttrs", true);
                        }
                    }
                    return data;
                }
                // Sets multiple values
                if (typeof key === "object") {
                    return this.each(function () {
                        dataUser.set(this, key);
                    });
                }
                return access(this, function (value) {
                    var data;
                    // The calling jQuery object (element matches) is not empty
                    // (and therefore has an element appears at this[ 0 ]) and the
                    // `value` parameter was not undefined. An empty jQuery object
                    // will result in `undefined` for elem = this[ 0 ] which will
                    // throw an exception if an attempt to read a data cache is made.
                    if (elem && value === undefined) {
                        // Attempt to get data from the cache
                        // The key will always be camelCased in Data
                        data = dataUser.get(elem, key);
                        if (data !== undefined) {
                            return data;
                        }
                        // Attempt to "discover" the data in
                        // HTML5 custom data-* attrs
                        data = dataAttr(elem, key);
                        if (data !== undefined) {
                            return data;
                        }
                        // We tried really hard, but the data doesn't exist.
                        return;
                    }
                    // Set the data...
                    this.each(function () {
                        // We always store the camelCased key
                        dataUser.set(this, key, value);
                    });
                }, null, value, arguments.length > 1, null, true);
            },
            removeData: function (key) {
                return this.each(function () {
                    dataUser.remove(this, key);
                });
            }
        });
        jQuery.extend({
            queue: function (elem, type, data) {
                var queue;
                if (elem) {
                    type = (type || "fx") + "queue";
                    queue = dataPriv.get(elem, type);
                    // Speed up dequeue by getting out quickly if this is just a lookup
                    if (data) {
                        if (!queue || Array.isArray(data)) {
                            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                        }
                        else {
                            queue.push(data);
                        }
                    }
                    return queue || [];
                }
            },
            dequeue: function (elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
                    jQuery.dequeue(elem, type);
                };
                // If the fx queue is dequeued, always remove the progress sentinel
                if (fn === "inprogress") {
                    fn = queue.shift();
                    startLength--;
                }
                if (fn) {
                    // Add a progress sentinel to prevent the fx queue from being
                    // automatically dequeued
                    if (type === "fx") {
                        queue.unshift("inprogress");
                    }
                    // Clear up the last queue stop function
                    delete hooks.stop;
                    fn.call(elem, next, hooks);
                }
                if (!startLength && hooks) {
                    hooks.empty.fire();
                }
            },
            // Not public - generate a queueHooks object, or return the current one
            _queueHooks: function (elem, type) {
                var key = type + "queueHooks";
                return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function () {
                        dataPriv.remove(elem, [type + "queue", key]);
                    })
                });
            }
        });
        jQuery.fn.extend({
            queue: function (type, data) {
                var setter = 2;
                if (typeof type !== "string") {
                    data = type;
                    type = "fx";
                    setter--;
                }
                if (arguments.length < setter) {
                    return jQuery.queue(this[0], type);
                }
                return data === undefined ?
                    this :
                    this.each(function () {
                        var queue = jQuery.queue(this, type, data);
                        // Ensure a hooks for this queue
                        jQuery._queueHooks(this, type);
                        if (type === "fx" && queue[0] !== "inprogress") {
                            jQuery.dequeue(this, type);
                        }
                    });
            },
            dequeue: function (type) {
                return this.each(function () {
                    jQuery.dequeue(this, type);
                });
            },
            clearQueue: function (type) {
                return this.queue(type || "fx", []);
            },
            // Get a promise resolved when queues of a certain type
            // are emptied (fx is the type by default)
            promise: function (type, obj) {
                var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };
                if (typeof type !== "string") {
                    obj = type;
                    type = undefined;
                }
                type = type || "fx";
                while (i--) {
                    tmp = dataPriv.get(elements[i], type + "queueHooks");
                    if (tmp && tmp.empty) {
                        count++;
                        tmp.empty.add(resolve);
                    }
                }
                resolve();
                return defer.promise(obj);
            }
        });
        var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
        var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var isHiddenWithinTree = function (elem, el) {
            // isHiddenWithinTree might be called from jQuery#filter function;
            // in that case, element will be second argument
            elem = el || elem;
            // Inline style trumps all
            return elem.style.display === "none" ||
                elem.style.display === "" &&
                    // Otherwise, check computed style
                    // Support: Firefox <=43 - 45
                    // Disconnected elements can have computed display: none, so first confirm that elem is
                    // in the document.
                    jQuery.contains(elem.ownerDocument, elem) &&
                    jQuery.css(elem, "display") === "none";
        };
        var swap = function (elem, options, callback, args) {
            var ret, name, old = {};
            // Remember the old values, and insert the new ones
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.apply(elem, args || []);
            // Revert the old values
            for (name in options) {
                elem.style[name] = old[name];
            }
            return ret;
        };
        function adjustCSS(elem, prop, valueParts, tween) {
            var adjusted, scale = 1, maxIterations = 20, currentValue = tween ?
                function () {
                    return tween.cur();
                } :
                function () {
                    return jQuery.css(elem, prop, "");
                }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), 
            // Starting value computation is required for potential unit mismatches
            initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
                rcssNum.exec(jQuery.css(elem, prop));
            if (initialInUnit && initialInUnit[3] !== unit) {
                // Trust units reported by jQuery.css
                unit = unit || initialInUnit[3];
                // Make sure we update the tween properties later on
                valueParts = valueParts || [];
                // Iteratively approximate from a nonzero starting point
                initialInUnit = +initial || 1;
                do {
                    // If previous iteration zeroed out, double until we get *something*.
                    // Use string for doubling so we don't accidentally see scale as unchanged below
                    scale = scale || ".5";
                    // Adjust and apply
                    initialInUnit = initialInUnit / scale;
                    jQuery.style(elem, prop, initialInUnit + unit);
                    // Update scale, tolerating zero or NaN from tween.cur()
                    // Break the loop if scale is unchanged or perfect, or if we've just had enough.
                } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
            }
            if (valueParts) {
                initialInUnit = +initialInUnit || +initial || 0;
                // Apply relative offset (+=/-=) if specified
                adjusted = valueParts[1] ?
                    initialInUnit + (valueParts[1] + 1) * valueParts[2] :
                    +valueParts[2];
                if (tween) {
                    tween.unit = unit;
                    tween.start = initialInUnit;
                    tween.end = adjusted;
                }
            }
            return adjusted;
        }
        var defaultDisplayMap = {};
        function getDefaultDisplay(elem) {
            var temp, doc = elem.ownerDocument, nodeName = elem.nodeName, display = defaultDisplayMap[nodeName];
            if (display) {
                return display;
            }
            temp = doc.body.appendChild(doc.createElement(nodeName));
            display = jQuery.css(temp, "display");
            temp.parentNode.removeChild(temp);
            if (display === "none") {
                display = "block";
            }
            defaultDisplayMap[nodeName] = display;
            return display;
        }
        function showHide(elements, show) {
            var display, elem, values = [], index = 0, length = elements.length;
            // Determine new display value for elements that need to change
            for (; index < length; index++) {
                elem = elements[index];
                if (!elem.style) {
                    continue;
                }
                display = elem.style.display;
                if (show) {
                    // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                    // check is required in this first loop unless we have a nonempty display value (either
                    // inline or about-to-be-restored)
                    if (display === "none") {
                        values[index] = dataPriv.get(elem, "display") || null;
                        if (!values[index]) {
                            elem.style.display = "";
                        }
                    }
                    if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                        values[index] = getDefaultDisplay(elem);
                    }
                }
                else {
                    if (display !== "none") {
                        values[index] = "none";
                        // Remember what we're overwriting
                        dataPriv.set(elem, "display", display);
                    }
                }
            }
            // Set the display of the elements in a second loop to avoid constant reflow
            for (index = 0; index < length; index++) {
                if (values[index] != null) {
                    elements[index].style.display = values[index];
                }
            }
            return elements;
        }
        jQuery.fn.extend({
            show: function () {
                return showHide(this, true);
            },
            hide: function () {
                return showHide(this);
            },
            toggle: function (state) {
                if (typeof state === "boolean") {
                    return state ? this.show() : this.hide();
                }
                return this.each(function () {
                    if (isHiddenWithinTree(this)) {
                        jQuery(this).show();
                    }
                    else {
                        jQuery(this).hide();
                    }
                });
            }
        });
        var rcheckableType = (/^(?:checkbox|radio)$/i);
        var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]+)/i);
        var rscriptType = (/^$|\/(?:java|ecma)script/i);
        // We have to close these tags to support XHTML (#13200)
        var wrapMap = {
            // Support: IE <=9 only
            option: [1, "<select multiple='multiple'>", "</select>"],
            // XHTML parsers do not magically insert elements in the
            // same way that tag soup parsers do. So we cannot shorten
            // this by omitting <tbody> or other required elements.
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        // Support: IE <=9 only
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        function getAll(context, tag) {
            // Support: IE <=9 - 11 only
            // Use typeof to avoid zero-argument method invocation on host objects (#15151)
            var ret;
            if (typeof context.getElementsByTagName !== "undefined") {
                ret = context.getElementsByTagName(tag || "*");
            }
            else if (typeof context.querySelectorAll !== "undefined") {
                ret = context.querySelectorAll(tag || "*");
            }
            else {
                ret = [];
            }
            if (tag === undefined || tag && nodeName(context, tag)) {
                return jQuery.merge([context], ret);
            }
            return ret;
        }
        // Mark scripts as having already been evaluated
        function setGlobalEval(elems, refElements) {
            var i = 0, l = elems.length;
            for (; i < l; i++) {
                dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
            }
        }
        var rhtml = /<|&#?\w+;/;
        function buildFragment(elems, context, scripts, selection, ignored) {
            var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
            for (; i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    // Add nodes directly
                    if (jQuery.type(elem) === "object") {
                        // Support: Android <=4.0 only, PhantomJS 1 only
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                        // Convert non-html into a text node
                    }
                    else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                        // Convert html into DOM nodes
                    }
                    else {
                        tmp = tmp || fragment.appendChild(context.createElement("div"));
                        // Deserialize a standard representation
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                        // Descend through wrappers to the right content
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        // Support: Android <=4.0 only, PhantomJS 1 only
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery.merge(nodes, tmp.childNodes);
                        // Remember the top-level container
                        tmp = fragment.firstChild;
                        // Ensure the created nodes are orphaned (#12392)
                        tmp.textContent = "";
                    }
                }
            }
            // Remove wrapper from fragment
            fragment.textContent = "";
            i = 0;
            while ((elem = nodes[i++])) {
                // Skip elements already in the context collection (trac-4087)
                if (selection && jQuery.inArray(elem, selection) > -1) {
                    if (ignored) {
                        ignored.push(elem);
                    }
                    continue;
                }
                contains = jQuery.contains(elem.ownerDocument, elem);
                // Append to fragment
                tmp = getAll(fragment.appendChild(elem), "script");
                // Preserve script evaluation history
                if (contains) {
                    setGlobalEval(tmp);
                }
                // Capture executables
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++])) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            return fragment;
        }
        (function () {
            var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
            // Support: Android 4.0 - 4.3 only
            // Check state lost if the name is set (#11217)
            // Support: Windows Web Apps (WWA)
            // `name` and `type` must use .setAttribute for WWA (#14901)
            input.setAttribute("type", "radio");
            input.setAttribute("checked", "checked");
            input.setAttribute("name", "t");
            div.appendChild(input);
            // Support: Android <=4.1 only
            // Older WebKit doesn't clone checked state correctly in fragments
            support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
            // Support: IE <=11 only
            // Make sure textarea (and checkbox) defaultValue is properly cloned
            div.innerHTML = "<textarea>x</textarea>";
            support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
        })();
        var documentElement = document.documentElement;
        var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        function returnTrue() {
            return true;
        }
        function returnFalse() {
            return false;
        }
        // Support: IE <=9 only
        // See #13393 for more info
        function safeActiveElement() {
            try {
                return document.activeElement;
            }
            catch (err) { }
        }
        function on(elem, types, selector, data, fn, one) {
            var origFn, type;
            // Types can be a map of types/handlers
            if (typeof types === "object") {
                // ( types-Object, selector, data )
                if (typeof selector !== "string") {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    on(elem, type, selector, data, types[type], one);
                }
                return elem;
            }
            if (data == null && fn == null) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            }
            else if (fn == null) {
                if (typeof selector === "string") {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                }
                else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            }
            else if (!fn) {
                return elem;
            }
            if (one === 1) {
                origFn = fn;
                fn = function (event) {
                    // Can use an empty set, since event contains the info
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return elem.each(function () {
                jQuery.event.add(this, types, fn, data, selector);
            });
        }
        /*
         * Helper functions for managing events -- not part of the public interface.
         * Props to Dean Edwards' addEvent library for many of the ideas.
         */
        jQuery.event = {
            global: {},
            add: function (elem, types, handler, data, selector) {
                var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
                // Don't attach events to noData or text/comment nodes (but allow plain objects)
                if (!elemData) {
                    return;
                }
                // Caller can pass in an object of custom data in lieu of the handler
                if (handler.handler) {
                    handleObjIn = handler;
                    handler = handleObjIn.handler;
                    selector = handleObjIn.selector;
                }
                // Ensure that invalid selectors throw exceptions at attach time
                // Evaluate against documentElement in case elem is a non-element node (e.g., document)
                if (selector) {
                    jQuery.find.matchesSelector(documentElement, selector);
                }
                // Make sure that the handler has a unique ID, used to find/remove it later
                if (!handler.guid) {
                    handler.guid = jQuery.guid++;
                }
                // Init the element's event structure and main handler, if this is the first
                if (!(events = elemData.events)) {
                    events = elemData.events = {};
                }
                if (!(eventHandle = elemData.handle)) {
                    eventHandle = elemData.handle = function (e) {
                        // Discard the second event of a jQuery.event.trigger() and
                        // when an event is called after a page has unloaded
                        return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                            jQuery.event.dispatch.apply(elem, arguments) : undefined;
                    };
                }
                // Handle multiple events separated by a space
                types = (types || "").match(rnothtmlwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    // There *must* be a type, no attaching namespace-only handlers
                    if (!type) {
                        continue;
                    }
                    // If event changes its type, use the special event handlers for the changed type
                    special = jQuery.event.special[type] || {};
                    // If selector defined, determine special event api type, otherwise given type
                    type = (selector ? special.delegateType : special.bindType) || type;
                    // Update special based on newly reset type
                    special = jQuery.event.special[type] || {};
                    // handleObj is passed to all event handlers
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn);
                    // Init the event handler queue if we're the first
                    if (!(handlers = events[type])) {
                        handlers = events[type] = [];
                        handlers.delegateCount = 0;
                        // Only use addEventListener if the special events handler returns false
                        if (!special.setup ||
                            special.setup.call(elem, data, namespaces, eventHandle) === false) {
                            if (elem.addEventListener) {
                                elem.addEventListener(type, eventHandle);
                            }
                        }
                    }
                    if (special.add) {
                        special.add.call(elem, handleObj);
                        if (!handleObj.handler.guid) {
                            handleObj.handler.guid = handler.guid;
                        }
                    }
                    // Add to the element's handler list, delegates in front
                    if (selector) {
                        handlers.splice(handlers.delegateCount++, 0, handleObj);
                    }
                    else {
                        handlers.push(handleObj);
                    }
                    // Keep track of which events have ever been used, for event optimization
                    jQuery.event.global[type] = true;
                }
            },
            // Detach an event or set of events from an element
            remove: function (elem, types, handler, selector, mappedTypes) {
                var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
                if (!elemData || !(events = elemData.events)) {
                    return;
                }
                // Once for each type.namespace in types; type may be omitted
                types = (types || "").match(rnothtmlwhite) || [""];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    // Unbind all events (on this namespace, if provided) for the element
                    if (!type) {
                        for (type in events) {
                            jQuery.event.remove(elem, type + types[t], handler, selector, true);
                        }
                        continue;
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ? special.delegateType : special.bindType) || type;
                    handlers = events[type] || [];
                    tmp = tmp[2] &&
                        new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    // Remove matching events
                    origCount = j = handlers.length;
                    while (j--) {
                        handleObj = handlers[j];
                        if ((mappedTypes || origType === handleObj.origType) &&
                            (!handler || handler.guid === handleObj.guid) &&
                            (!tmp || tmp.test(handleObj.namespace)) &&
                            (!selector || selector === handleObj.selector ||
                                selector === "**" && handleObj.selector)) {
                            handlers.splice(j, 1);
                            if (handleObj.selector) {
                                handlers.delegateCount--;
                            }
                            if (special.remove) {
                                special.remove.call(elem, handleObj);
                            }
                        }
                    }
                    // Remove generic event handler if we removed something and no more handlers exist
                    // (avoids potential for endless recursion during removal of special event handlers)
                    if (origCount && !handlers.length) {
                        if (!special.teardown ||
                            special.teardown.call(elem, namespaces, elemData.handle) === false) {
                            jQuery.removeEvent(elem, type, elemData.handle);
                        }
                        delete events[type];
                    }
                }
                // Remove data and the expando if it's no longer used
                if (jQuery.isEmptyObject(events)) {
                    dataPriv.remove(elem, "handle events");
                }
            },
            dispatch: function (nativeEvent) {
                // Make a writable jQuery.Event from the native event object
                var event = jQuery.event.fix(nativeEvent);
                var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), handlers = (dataPriv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
                // Use the fix-ed jQuery.Event rather than the (read-only) native event
                args[0] = event;
                for (i = 1; i < arguments.length; i++) {
                    args[i] = arguments[i];
                }
                event.delegateTarget = this;
                // Call the preDispatch hook for the mapped type, and let it bail if desired
                if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                    return;
                }
                // Determine handlers
                handlerQueue = jQuery.event.handlers.call(this, event, handlers);
                // Run delegates first; they may want to stop propagation beneath us
                i = 0;
                while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                    event.currentTarget = matched.elem;
                    j = 0;
                    while ((handleObj = matched.handlers[j++]) &&
                        !event.isImmediatePropagationStopped()) {
                        // Triggered event must either 1) have no namespace, or 2) have namespace(s)
                        // a subset or equal to those in the bound event (both can have no namespace).
                        if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
                            event.handleObj = handleObj;
                            event.data = handleObj.data;
                            ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
                                handleObj.handler).apply(matched.elem, args);
                            if (ret !== undefined) {
                                if ((event.result = ret) === false) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }
                        }
                    }
                }
                // Call the postDispatch hook for the mapped type
                if (special.postDispatch) {
                    special.postDispatch.call(this, event);
                }
                return event.result;
            },
            handlers: function (event, handlers) {
                var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
                // Find delegate handlers
                if (delegateCount &&
                    // Support: IE <=9
                    // Black-hole SVG <use> instance trees (trac-13180)
                    cur.nodeType &&
                    // Support: Firefox <=42
                    // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                    // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                    // Support: IE 11 only
                    // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                    !(event.type === "click" && event.button >= 1)) {
                    for (; cur !== this; cur = cur.parentNode || this) {
                        // Don't check non-elements (#13208)
                        // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                        if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                            matchedHandlers = [];
                            matchedSelectors = {};
                            for (i = 0; i < delegateCount; i++) {
                                handleObj = handlers[i];
                                // Don't conflict with Object.prototype properties (#13203)
                                sel = handleObj.selector + " ";
                                if (matchedSelectors[sel] === undefined) {
                                    matchedSelectors[sel] = handleObj.needsContext ?
                                        jQuery(sel, this).index(cur) > -1 :
                                        jQuery.find(sel, this, null, [cur]).length;
                                }
                                if (matchedSelectors[sel]) {
                                    matchedHandlers.push(handleObj);
                                }
                            }
                            if (matchedHandlers.length) {
                                handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                            }
                        }
                    }
                }
                // Add the remaining (directly-bound) handlers
                cur = this;
                if (delegateCount < handlers.length) {
                    handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
                }
                return handlerQueue;
            },
            addProp: function (name, hook) {
                Object.defineProperty(jQuery.Event.prototype, name, {
                    enumerable: true,
                    configurable: true,
                    get: jQuery.isFunction(hook) ?
                        function () {
                            if (this.originalEvent) {
                                return hook(this.originalEvent);
                            }
                        } :
                        function () {
                            if (this.originalEvent) {
                                return this.originalEvent[name];
                            }
                        },
                    set: function (value) {
                        Object.defineProperty(this, name, {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value: value
                        });
                    }
                });
            },
            fix: function (originalEvent) {
                return originalEvent[jQuery.expando] ?
                    originalEvent :
                    new jQuery.Event(originalEvent);
            },
            special: {
                load: {
                    // Prevent triggered image.load events from bubbling to window.load
                    noBubble: true
                },
                focus: {
                    // Fire native event if possible so blur/focus sequence is correct
                    trigger: function () {
                        if (this !== safeActiveElement() && this.focus) {
                            this.focus();
                            return false;
                        }
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function () {
                        if (this === safeActiveElement() && this.blur) {
                            this.blur();
                            return false;
                        }
                    },
                    delegateType: "focusout"
                },
                click: {
                    // For checkbox, fire native event so checked state will be right
                    trigger: function () {
                        if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
                            this.click();
                            return false;
                        }
                    },
                    // For cross-browser consistency, don't fire native .click() on links
                    _default: function (event) {
                        return nodeName(event.target, "a");
                    }
                },
                beforeunload: {
                    postDispatch: function (event) {
                        // Support: Firefox 20+
                        // Firefox doesn't alert if the returnValue field is not set.
                        if (event.result !== undefined && event.originalEvent) {
                            event.originalEvent.returnValue = event.result;
                        }
                    }
                }
            }
        };
        jQuery.removeEvent = function (elem, type, handle) {
            // This "if" is needed for plain objects
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle);
            }
        };
        jQuery.Event = function (src, props) {
            // Allow instantiation without the 'new' keyword
            if (!(this instanceof jQuery.Event)) {
                return new jQuery.Event(src, props);
            }
            // Event object
            if (src && src.type) {
                this.originalEvent = src;
                this.type = src.type;
                // Events bubbling up the document may have been marked as prevented
                // by a handler lower down the tree; reflect the correct value.
                this.isDefaultPrevented = src.defaultPrevented ||
                    src.defaultPrevented === undefined &&
                        // Support: Android <=2.3 only
                        src.returnValue === false ?
                    returnTrue :
                    returnFalse;
                // Create target properties
                // Support: Safari <=6 - 7 only
                // Target should not be a text node (#504, #13143)
                this.target = (src.target && src.target.nodeType === 3) ?
                    src.target.parentNode :
                    src.target;
                this.currentTarget = src.currentTarget;
                this.relatedTarget = src.relatedTarget;
                // Event type
            }
            else {
                this.type = src;
            }
            // Put explicitly provided properties onto the event object
            if (props) {
                jQuery.extend(this, props);
            }
            // Create a timestamp if incoming event doesn't have one
            this.timeStamp = src && src.timeStamp || jQuery.now();
            // Mark it as fixed
            this[jQuery.expando] = true;
        };
        // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
        // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
        jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            isSimulated: false,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue;
                if (e && !this.isSimulated) {
                    e.preventDefault();
                }
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue;
                if (e && !this.isSimulated) {
                    e.stopPropagation();
                }
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue;
                if (e && !this.isSimulated) {
                    e.stopImmediatePropagation();
                }
                this.stopPropagation();
            }
        };
        // Includes all common event props including KeyEvent and MouseEvent specific props
        jQuery.each({
            altKey: true,
            bubbles: true,
            cancelable: true,
            changedTouches: true,
            ctrlKey: true,
            detail: true,
            eventPhase: true,
            metaKey: true,
            pageX: true,
            pageY: true,
            shiftKey: true,
            view: true,
            "char": true,
            charCode: true,
            key: true,
            keyCode: true,
            button: true,
            buttons: true,
            clientX: true,
            clientY: true,
            offsetX: true,
            offsetY: true,
            pointerId: true,
            pointerType: true,
            screenX: true,
            screenY: true,
            targetTouches: true,
            toElement: true,
            touches: true,
            which: function (event) {
                var button = event.button;
                // Add which for key events
                if (event.which == null && rkeyEvent.test(event.type)) {
                    return event.charCode != null ? event.charCode : event.keyCode;
                }
                // Add which for click: 1 === left; 2 === middle; 3 === right
                if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
                    if (button & 1) {
                        return 1;
                    }
                    if (button & 2) {
                        return 3;
                    }
                    if (button & 4) {
                        return 2;
                    }
                    return 0;
                }
                return event.which;
            }
        }, jQuery.event.addProp);
        // Create mouseenter/leave events using mouseover/out and event-time checks
        // so that event delegation works in jQuery.
        // Do the same for pointerenter/pointerleave and pointerover/pointerout
        //
        // Support: Safari 7 only
        // Safari sends mouseenter too often; see:
        // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
        // for the description of the bug (it existed in older Chrome versions as well).
        jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function (event) {
                    var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                    // For mouseenter/leave call the handler if related is outside the target.
                    // NB: No relatedTarget if the mouse left/entered the browser window
                    if (!related || (related !== target && !jQuery.contains(target, related))) {
                        event.type = handleObj.origType;
                        ret = handleObj.handler.apply(this, arguments);
                        event.type = fix;
                    }
                    return ret;
                }
            };
        });
        jQuery.fn.extend({
            on: function (types, selector, data, fn) {
                return on(this, types, selector, data, fn);
            },
            one: function (types, selector, data, fn) {
                return on(this, types, selector, data, fn, 1);
            },
            off: function (types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) {
                    // ( event )  dispatched jQuery.Event
                    handleObj = types.handleObj;
                    jQuery(types.delegateTarget).off(handleObj.namespace ?
                        handleObj.origType + "." + handleObj.namespace :
                        handleObj.origType, handleObj.selector, handleObj.handler);
                    return this;
                }
                if (typeof types === "object") {
                    // ( types-object [, selector] )
                    for (type in types) {
                        this.off(type, selector, types[type]);
                    }
                    return this;
                }
                if (selector === false || typeof selector === "function") {
                    // ( types [, fn] )
                    fn = selector;
                    selector = undefined;
                }
                if (fn === false) {
                    fn = returnFalse;
                }
                return this.each(function () {
                    jQuery.event.remove(this, types, fn, selector);
                });
            }
        });
        var 
        /* eslint-disable max-len */
        // See https://github.com/eslint/eslint/issues/3229
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, 
        /* eslint-enable */
        // Support: IE <=10 - 11, Edge 12 - 13
        // In IE/Edge using regex groups here causes severe slowdowns.
        // See https://connect.microsoft.com/IE/feedback/details/1736512/
        rnoInnerhtml = /<script|<style|<link/i, 
        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        // Prefer a tbody over its parent table for containing new rows
        function manipulationTarget(elem, content) {
            if (nodeName(elem, "table") &&
                nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
                return jQuery(">tbody", elem)[0] || elem;
            }
            return elem;
        }
        // Replace/restore the type attribute of script elements for safe DOM manipulation
        function disableScript(elem) {
            elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
            return elem;
        }
        function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            if (match) {
                elem.type = match[1];
            }
            else {
                elem.removeAttribute("type");
            }
            return elem;
        }
        function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
            if (dest.nodeType !== 1) {
                return;
            }
            // 1. Copy private data: events, handlers, etc.
            if (dataPriv.hasData(src)) {
                pdataOld = dataPriv.access(src);
                pdataCur = dataPriv.set(dest, pdataOld);
                events = pdataOld.events;
                if (events) {
                    delete pdataCur.handle;
                    pdataCur.events = {};
                    for (type in events) {
                        for (i = 0, l = events[type].length; i < l; i++) {
                            jQuery.event.add(dest, type, events[type][i]);
                        }
                    }
                }
            }
            // 2. Copy user data
            if (dataUser.hasData(src)) {
                udataOld = dataUser.access(src);
                udataCur = jQuery.extend({}, udataOld);
                dataUser.set(dest, udataCur);
            }
        }
        // Fix IE bugs, see support tests
        function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();
            // Fails to persist the checked state of a cloned checkbox or radio button.
            if (nodeName === "input" && rcheckableType.test(src.type)) {
                dest.checked = src.checked;
                // Fails to return the selected option to the default selected state when cloning options
            }
            else if (nodeName === "input" || nodeName === "textarea") {
                dest.defaultValue = src.defaultValue;
            }
        }
        function domManip(collection, args, callback, ignored) {
            // Flatten any nested arrays
            args = concat.apply([], args);
            var fragment, first$$1, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            // We can't cloneNode fragments that contain checked, in WebKit
            if (isFunction ||
                (l > 1 && typeof value === "string" &&
                    !support.checkClone && rchecked.test(value))) {
                return collection.each(function (index) {
                    var self = collection.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    domManip(self, args, callback, ignored);
                });
            }
            if (l) {
                fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
                first$$1 = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first$$1;
                }
                // Require either new content or an interest in ignored elements to invoke the callback
                if (first$$1 || ignored) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    // Use the original fragment for the last item
                    // instead of the first because it can end up
                    // being emptied incorrectly in certain situations (#8070).
                    for (; i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            // Keep references to cloned scripts for later restoration
                            if (hasScripts) {
                                // Support: Android <=4.0 only, PhantomJS 1 only
                                // push.apply(_, arraylike) throws on ancient WebKit
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(collection[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        // Reenable scripts
                        jQuery.map(scripts, restoreScript);
                        // Evaluate executable scripts on first document insertion
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") &&
                                !dataPriv.access(node, "globalEval") &&
                                jQuery.contains(doc, node)) {
                                if (node.src) {
                                    // Optional AJAX dependency, but won't run scripts if not present
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src);
                                    }
                                }
                                else {
                                    DOMEval(node.textContent.replace(rcleanScript, ""), doc);
                                }
                            }
                        }
                    }
                }
            }
            return collection;
        }
        function remove(elem, selector, keepData) {
            var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
            for (; (node = nodes[i]) != null; i++) {
                if (!keepData && node.nodeType === 1) {
                    jQuery.cleanData(getAll(node));
                }
                if (node.parentNode) {
                    if (keepData && jQuery.contains(node.ownerDocument, node)) {
                        setGlobalEval(getAll(node, "script"));
                    }
                    node.parentNode.removeChild(node);
                }
            }
            return elem;
        }
        jQuery.extend({
            htmlPrefilter: function (html) {
                return html.replace(rxhtmlTag, "<$1></$2>");
            },
            clone: function (elem, dataAndEvents, deepDataAndEvents) {
                var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
                // Fix IE cloning issues
                if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
                    !jQuery.isXMLDoc(elem)) {
                    // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                    destElements = getAll(clone);
                    srcElements = getAll(elem);
                    for (i = 0, l = srcElements.length; i < l; i++) {
                        fixInput(srcElements[i], destElements[i]);
                    }
                }
                // Copy the events from the original to the clone
                if (dataAndEvents) {
                    if (deepDataAndEvents) {
                        srcElements = srcElements || getAll(elem);
                        destElements = destElements || getAll(clone);
                        for (i = 0, l = srcElements.length; i < l; i++) {
                            cloneCopyEvent(srcElements[i], destElements[i]);
                        }
                    }
                    else {
                        cloneCopyEvent(elem, clone);
                    }
                }
                // Preserve script evaluation history
                destElements = getAll(clone, "script");
                if (destElements.length > 0) {
                    setGlobalEval(destElements, !inPage && getAll(elem, "script"));
                }
                // Return the cloned set
                return clone;
            },
            cleanData: function (elems) {
                var data, elem, type, special = jQuery.event.special, i = 0;
                for (; (elem = elems[i]) !== undefined; i++) {
                    if (acceptData(elem)) {
                        if ((data = elem[dataPriv.expando])) {
                            if (data.events) {
                                for (type in data.events) {
                                    if (special[type]) {
                                        jQuery.event.remove(elem, type);
                                        // This is a shortcut to avoid jQuery.event.remove's overhead
                                    }
                                    else {
                                        jQuery.removeEvent(elem, type, data.handle);
                                    }
                                }
                            }
                            // Support: Chrome <=35 - 45+
                            // Assign undefined instead of using delete, see Data#remove
                            elem[dataPriv.expando] = undefined;
                        }
                        if (elem[dataUser.expando]) {
                            // Support: Chrome <=35 - 45+
                            // Assign undefined instead of using delete, see Data#remove
                            elem[dataUser.expando] = undefined;
                        }
                    }
                }
            }
        });
        jQuery.fn.extend({
            detach: function (selector) {
                return remove(this, selector, true);
            },
            remove: function (selector) {
                return remove(this, selector);
            },
            text: function (value) {
                return access(this, function (value) {
                    return value === undefined ?
                        jQuery.text(this) :
                        this.empty().each(function () {
                            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                this.textContent = value;
                            }
                        });
                }, null, value, arguments.length);
            },
            append: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem);
                    }
                });
            },
            prepend: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild);
                    }
                });
            },
            before: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this);
                    }
                });
            },
            after: function () {
                return domManip(this, arguments, function (elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this.nextSibling);
                    }
                });
            },
            empty: function () {
                var elem, i = 0;
                for (; (elem = this[i]) != null; i++) {
                    if (elem.nodeType === 1) {
                        // Prevent memory leaks
                        jQuery.cleanData(getAll(elem, false));
                        // Remove any remaining nodes
                        elem.textContent = "";
                    }
                }
                return this;
            },
            clone: function (dataAndEvents, deepDataAndEvents) {
                dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
                return this.map(function () {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
                });
            },
            html: function (value) {
                return access(this, function (value) {
                    var elem = this[0] || {}, i = 0, l = this.length;
                    if (value === undefined && elem.nodeType === 1) {
                        return elem.innerHTML;
                    }
                    // See if we can take a shortcut and just use innerHTML
                    if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                        !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                        value = jQuery.htmlPrefilter(value);
                        try {
                            for (; i < l; i++) {
                                elem = this[i] || {};
                                // Remove element nodes and prevent memory leaks
                                if (elem.nodeType === 1) {
                                    jQuery.cleanData(getAll(elem, false));
                                    elem.innerHTML = value;
                                }
                            }
                            elem = 0;
                            // If using innerHTML throws an exception, use the fallback method
                        }
                        catch (e) { }
                    }
                    if (elem) {
                        this.empty().append(value);
                    }
                }, null, value, arguments.length);
            },
            replaceWith: function () {
                var ignored = [];
                // Make the changes, replacing each non-ignored context element with the new content
                return domManip(this, arguments, function (elem) {
                    var parent = this.parentNode;
                    if (jQuery.inArray(this, ignored) < 0) {
                        jQuery.cleanData(getAll(this));
                        if (parent) {
                            parent.replaceChild(elem, this);
                        }
                    }
                    // Force callback invocation
                }, ignored);
            }
        });
        jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (name, original) {
            jQuery.fn[name] = function (selector) {
                var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
                for (; i <= last; i++) {
                    elems = i === last ? this : this.clone(true);
                    jQuery(insert[i])[original](elems);
                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // .get() because push.apply(_, arraylike) throws on ancient WebKit
                    push.apply(ret, elems.get());
                }
                return this.pushStack(ret);
            };
        });
        var rmargin = (/^margin/);
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var getStyles = function (elem) {
            // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            var view = elem.ownerDocument.defaultView;
            if (!view || !view.opener) {
                view = window;
            }
            return view.getComputedStyle(elem);
        };
        (function () {
            // Executing both pixelPosition & boxSizingReliable tests require only one layout
            // so they're executed at the same time to save the second computation.
            function computeStyleTests() {
                // This is a singleton, we need to execute it only once
                if (!div) {
                    return;
                }
                div.style.cssText =
                    "box-sizing:border-box;" +
                        "position:relative;display:block;" +
                        "margin:auto;border:1px;padding:1px;" +
                        "top:1%;width:50%";
                div.innerHTML = "";
                documentElement.appendChild(container);
                var divStyle = window.getComputedStyle(div);
                pixelPositionVal = divStyle.top !== "1%";
                // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
                reliableMarginLeftVal = divStyle.marginLeft === "2px";
                boxSizingReliableVal = divStyle.width === "4px";
                // Support: Android 4.0 - 4.3 only
                // Some styles come back with percentage values, even though they shouldn't
                div.style.marginRight = "50%";
                pixelMarginRightVal = divStyle.marginRight === "4px";
                documentElement.removeChild(container);
                // Nullify the div so it wouldn't be stored in the memory and
                // it will also be a sign that checks already performed
                div = null;
            }
            var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
            // Finish early in limited (non-browser) environments
            if (!div.style) {
                return;
            }
            // Support: IE <=9 - 11 only
            // Style of cloned element affects source element cloned (#8908)
            div.style.backgroundClip = "content-box";
            div.cloneNode(true).style.backgroundClip = "";
            support.clearCloneStyle = div.style.backgroundClip === "content-box";
            container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
                "padding:0;margin-top:1px;position:absolute";
            container.appendChild(div);
            jQuery.extend(support, {
                pixelPosition: function () {
                    computeStyleTests();
                    return pixelPositionVal;
                },
                boxSizingReliable: function () {
                    computeStyleTests();
                    return boxSizingReliableVal;
                },
                pixelMarginRight: function () {
                    computeStyleTests();
                    return pixelMarginRightVal;
                },
                reliableMarginLeft: function () {
                    computeStyleTests();
                    return reliableMarginLeftVal;
                }
            });
        })();
        function curCSS(elem, name, computed) {
            var width, minWidth, maxWidth, ret, 
            // Support: Firefox 51+
            // Retrieving style before computed somehow
            // fixes an issue with getting wrong values
            // on detached elements
            style = elem.style;
            computed = computed || getStyles(elem);
            // getPropertyValue is needed for:
            //   .css('filter') (IE 9 only, #12537)
            //   .css('--customProperty) (#3144)
            if (computed) {
                ret = computed.getPropertyValue(name) || computed[name];
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name);
                }
                // A tribute to the "awesome hack by Dean Edwards"
                // Android Browser returns percentage for some values,
                // but width seems to be reliably pixels.
                // This is against the CSSOM draft spec:
                // https://drafts.csswg.org/cssom/#resolved-values
                if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
                    // Remember the original values
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    // Put in the new values to get a computed value out
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    // Revert the changed values
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            return ret !== undefined ?
                // Support: IE <=9 - 11 only
                // IE returns zIndex value as an integer.
                ret + "" :
                ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
            // Define the hook, we'll check on the first run if it's really needed.
            return {
                get: function () {
                    if (conditionFn()) {
                        // Hook not needed (or it's not possible to use it due
                        // to missing dependency), remove it.
                        delete this.get;
                        return;
                    }
                    // Hook needed; redefine it so that the support test is not executed again.
                    return (this.get = hookFn).apply(this, arguments);
                }
            };
        }
        var 
        // Swappable if display is none or starts with table
        // except "table", "table-cell", or "table-caption"
        // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/, rcustomProp = /^--/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        }, cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document.createElement("div").style;
        // Return a css property mapped to a potentially vendor prefixed property
        function vendorPropName(name) {
            // Shortcut for names that are not vendor prefixed
            if (name in emptyStyle) {
                return name;
            }
            // Check for vendor prefixed names
            var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
            while (i--) {
                name = cssPrefixes[i] + capName;
                if (name in emptyStyle) {
                    return name;
                }
            }
        }
        // Return a property mapped along what jQuery.cssProps suggests or to
        // a vendor prefixed property.
        function finalPropName(name) {
            var ret = jQuery.cssProps[name];
            if (!ret) {
                ret = jQuery.cssProps[name] = vendorPropName(name) || name;
            }
            return ret;
        }
        function setPositiveNumber(elem, value, subtract) {
            // Any relative (+/-) values have already been
            // normalized at this point
            var matches = rcssNum.exec(value);
            return matches ?
                // Guard against undefined "subtract", e.g., when used as in cssHooks
                Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
                value;
        }
        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            var i, val = 0;
            // If we already have the right measurement, avoid augmentation
            if (extra === (isBorderBox ? "border" : "content")) {
                i = 4;
                // Otherwise initialize for horizontal or vertical properties
            }
            else {
                i = name === "width" ? 1 : 0;
            }
            for (; i < 4; i += 2) {
                // Both box models exclude margin, so add it if we want it
                if (extra === "margin") {
                    val += jQuery.css(elem, extra + cssExpand[i], true, styles);
                }
                if (isBorderBox) {
                    // border-box includes padding, so remove it if we want content
                    if (extra === "content") {
                        val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                    }
                    // At this point, extra isn't border nor margin, so remove border
                    if (extra !== "margin") {
                        val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    }
                }
                else {
                    // At this point, extra isn't content, so add padding
                    val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                    // At this point, extra isn't content nor padding, so add border
                    if (extra !== "padding") {
                        val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    }
                }
            }
            return val;
        }
        function getWidthOrHeight(elem, name, extra) {
            // Start with computed style
            var valueIsBorderBox, styles = getStyles(elem), val = curCSS(elem, name, styles), isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
            // Computed unit is not pixels. Stop here and return.
            if (rnumnonpx.test(val)) {
                return val;
            }
            // Check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox &&
                (support.boxSizingReliable() || val === elem.style[name]);
            // Fall back to offsetWidth/Height when value is "auto"
            // This happens for inline elements with no explicit setting (gh-3571)
            if (val === "auto") {
                val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
            }
            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;
            // Use the active box-sizing model to add/subtract irrelevant styles
            return (val +
                augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
        }
        jQuery.extend({
            // Add in style property hooks for overriding the default
            // behavior of getting and setting a style property
            cssHooks: {
                opacity: {
                    get: function (elem, computed) {
                        if (computed) {
                            // We should always get a number back from opacity
                            var ret = curCSS(elem, "opacity");
                            return ret === "" ? "1" : ret;
                        }
                    }
                }
            },
            // Don't automatically add "px" to these possibly-unitless properties
            cssNumber: {
                "animationIterationCount": true,
                "columnCount": true,
                "fillOpacity": true,
                "flexGrow": true,
                "flexShrink": true,
                "fontWeight": true,
                "lineHeight": true,
                "opacity": true,
                "order": true,
                "orphans": true,
                "widows": true,
                "zIndex": true,
                "zoom": true
            },
            // Add in properties whose names you wish to fix before
            // setting or getting the value
            cssProps: {
                "float": "cssFloat"
            },
            // Get and set the style property on a DOM Node
            style: function (elem, name, value, extra) {
                // Don't set styles on text and comment nodes
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                    return;
                }
                // Make sure that we're working with the right name
                var ret, type, hooks, origName = jQuery.camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
                // Make sure that we're working with the right name. We don't
                // want to query the value if it is a CSS custom property
                // since they are user-defined.
                if (!isCustomProp) {
                    name = finalPropName(origName);
                }
                // Gets hook for the prefixed version, then unprefixed version
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                // Check if we're setting a value
                if (value !== undefined) {
                    type = typeof value;
                    // Convert "+=" or "-=" to relative numbers (#7345)
                    if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                        value = adjustCSS(elem, name, ret);
                        // Fixes bug #9237
                        type = "number";
                    }
                    // Make sure that null and NaN values aren't set (#7116)
                    if (value == null || value !== value) {
                        return;
                    }
                    // If a number was passed in, add the unit (except for certain CSS properties)
                    if (type === "number") {
                        value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
                    }
                    // background-* props affect original clone's values
                    if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                        style[name] = "inherit";
                    }
                    // If a hook was provided, use that value, otherwise just set the specified value
                    if (!hooks || !("set" in hooks) ||
                        (value = hooks.set(elem, value, extra)) !== undefined) {
                        if (isCustomProp) {
                            style.setProperty(name, value);
                        }
                        else {
                            style[name] = value;
                        }
                    }
                }
                else {
                    // If a hook was provided get the non-computed value from there
                    if (hooks && "get" in hooks &&
                        (ret = hooks.get(elem, false, extra)) !== undefined) {
                        return ret;
                    }
                    // Otherwise just get the value from the style object
                    return style[name];
                }
            },
            css: function (elem, name, extra, styles) {
                var val, num, hooks, origName = jQuery.camelCase(name), isCustomProp = rcustomProp.test(name);
                // Make sure that we're working with the right name. We don't
                // want to modify the value if it is a CSS custom property
                // since they are user-defined.
                if (!isCustomProp) {
                    name = finalPropName(origName);
                }
                // Try prefixed name followed by the unprefixed name
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                // If a hook was provided get the computed value from there
                if (hooks && "get" in hooks) {
                    val = hooks.get(elem, true, extra);
                }
                // Otherwise, if a way to get the computed value exists, use that
                if (val === undefined) {
                    val = curCSS(elem, name, styles);
                }
                // Convert "normal" to computed value
                if (val === "normal" && name in cssNormalTransform) {
                    val = cssNormalTransform[name];
                }
                // Make numeric if forced or a qualifier was provided and val looks numeric
                if (extra === "" || extra) {
                    num = parseFloat(val);
                    return extra === true || isFinite(num) ? num || 0 : val;
                }
                return val;
            }
        });
        jQuery.each(["height", "width"], function (i, name) {
            jQuery.cssHooks[name] = {
                get: function (elem, computed, extra) {
                    if (computed) {
                        // Certain elements can have dimension info if we invisibly show them
                        // but it must have a current display style that would benefit
                        return rdisplayswap.test(jQuery.css(elem, "display")) &&
                            // Support: Safari 8+
                            // Table columns in Safari have non-zero offsetWidth & zero
                            // getBoundingClientRect().width unless display is changed.
                            // Support: IE <=11 only
                            // Running getBoundingClientRect on a disconnected node
                            // in IE throws an error.
                            (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
                            swap(elem, cssShow, function () {
                                return getWidthOrHeight(elem, name, extra);
                            }) :
                            getWidthOrHeight(elem, name, extra);
                    }
                },
                set: function (elem, value, extra) {
                    var matches, styles = extra && getStyles(elem), subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
                    // Convert to pixels if value adjustment is needed
                    if (subtract && (matches = rcssNum.exec(value)) &&
                        (matches[3] || "px") !== "px") {
                        elem.style[name] = value;
                        value = jQuery.css(elem, name);
                    }
                    return setPositiveNumber(elem, value, subtract);
                }
            };
        });
        jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
            if (computed) {
                return (parseFloat(curCSS(elem, "marginLeft")) ||
                    elem.getBoundingClientRect().left -
                        swap(elem, { marginLeft: 0 }, function () {
                            return elem.getBoundingClientRect().left;
                        })) + "px";
            }
        });
        // These hooks are used by animate to expand properties
        jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function (value) {
                    var i = 0, expanded = {}, 
                    // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [value];
                    for (; i < 4; i++) {
                        expanded[prefix + cssExpand[i] + suffix] =
                            parts[i] || parts[i - 2] || parts[0];
                    }
                    return expanded;
                }
            };
            if (!rmargin.test(prefix)) {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
            }
        });
        jQuery.fn.extend({
            css: function (name, value) {
                return access(this, function (elem, name, value) {
                    var styles, len, map = {}, i = 0;
                    if (Array.isArray(name)) {
                        styles = getStyles(elem);
                        len = name.length;
                        for (; i < len; i++) {
                            map[name[i]] = jQuery.css(elem, name[i], false, styles);
                        }
                        return map;
                    }
                    return value !== undefined ?
                        jQuery.style(elem, name, value) :
                        jQuery.css(elem, name);
                }, name, value, arguments.length > 1);
            }
        });
        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing);
        }
        jQuery.Tween = Tween;
        Tween.prototype = {
            constructor: Tween,
            init: function (elem, options, prop, end, easing, unit) {
                this.elem = elem;
                this.prop = prop;
                this.easing = easing || jQuery.easing._default;
                this.options = options;
                this.start = this.now = this.cur();
                this.end = end;
                this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
            },
            cur: function () {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ?
                    hooks.get(this) :
                    Tween.propHooks._default.get(this);
            },
            run: function (percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                if (this.options.duration) {
                    this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
                }
                else {
                    this.pos = eased = percent;
                }
                this.now = (this.end - this.start) * eased + this.start;
                if (this.options.step) {
                    this.options.step.call(this.elem, this.now, this);
                }
                if (hooks && hooks.set) {
                    hooks.set(this);
                }
                else {
                    Tween.propHooks._default.set(this);
                }
                return this;
            }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
            _default: {
                get: function (tween) {
                    var result;
                    // Use a property on the element directly when it is not a DOM element,
                    // or when there is no matching style property that exists.
                    if (tween.elem.nodeType !== 1 ||
                        tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                        return tween.elem[tween.prop];
                    }
                    // Passing an empty string as a 3rd parameter to .css will automatically
                    // attempt a parseFloat and fallback to a string if the parse fails.
                    // Simple values such as "10px" are parsed to Float;
                    // complex values such as "rotate(1rad)" are returned as-is.
                    result = jQuery.css(tween.elem, tween.prop, "");
                    // Empty strings, null, undefined and "auto" are converted to 0.
                    return !result || result === "auto" ? 0 : result;
                },
                set: function (tween) {
                    // Use step hook for back compat.
                    // Use cssHook if its there.
                    // Use .style if available and use plain properties where available.
                    if (jQuery.fx.step[tween.prop]) {
                        jQuery.fx.step[tween.prop](tween);
                    }
                    else if (tween.elem.nodeType === 1 &&
                        (tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
                            jQuery.cssHooks[tween.prop])) {
                        jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                    }
                    else {
                        tween.elem[tween.prop] = tween.now;
                    }
                }
            }
        };
        // Support: IE <=9 only
        // Panic based approach to setting things on disconnected nodes
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function (tween) {
                if (tween.elem.nodeType && tween.elem.parentNode) {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        };
        jQuery.easing = {
            linear: function (p) {
                return p;
            },
            swing: function (p) {
                return 0.5 - Math.cos(p * Math.PI) / 2;
            },
            _default: "swing"
        };
        jQuery.fx = Tween.prototype.init;
        // Back compat <1.8 extension point
        jQuery.fx.step = {};
        var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
        function schedule() {
            if (inProgress) {
                if (document.hidden === false && window.requestAnimationFrame) {
                    window.requestAnimationFrame(schedule);
                }
                else {
                    window.setTimeout(schedule, jQuery.fx.interval);
                }
                jQuery.fx.tick();
            }
        }
        // Animations created synchronously will run synchronously
        function createFxNow() {
            window.setTimeout(function () {
                fxNow = undefined;
            });
            return (fxNow = jQuery.now());
        }
        // Generate parameters to create a standard animation
        function genFx(type, includeWidth) {
            var which, i = 0, attrs = { height: type };
            // If we include width, step value is 1 to do all cssExpand values,
            // otherwise step value is 2 to skip over Left and Right
            includeWidth = includeWidth ? 1 : 0;
            for (; i < 4; i += 2 - includeWidth) {
                which = cssExpand[i];
                attrs["margin" + which] = attrs["padding" + which] = type;
            }
            if (includeWidth) {
                attrs.opacity = attrs.width = type;
            }
            return attrs;
        }
        function createTween(value, prop, animation) {
            var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
            for (; index < length; index++) {
                if ((tween = collection[index].call(animation, prop, value))) {
                    // We're done with this property
                    return tween;
                }
            }
        }
        function defaultPrefilter(elem, props, opts) {
            var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
            // Queue-skipping animations hijack the fx hooks
            if (!opts.queue) {
                hooks = jQuery._queueHooks(elem, "fx");
                if (hooks.unqueued == null) {
                    hooks.unqueued = 0;
                    oldfire = hooks.empty.fire;
                    hooks.empty.fire = function () {
                        if (!hooks.unqueued) {
                            oldfire();
                        }
                    };
                }
                hooks.unqueued++;
                anim.always(function () {
                    // Ensure the complete handler is called before this completes
                    anim.always(function () {
                        hooks.unqueued--;
                        if (!jQuery.queue(elem, "fx").length) {
                            hooks.empty.fire();
                        }
                    });
                });
            }
            // Detect show/hide animations
            for (prop in props) {
                value = props[prop];
                if (rfxtypes.test(value)) {
                    delete props[prop];
                    toggle = toggle || value === "toggle";
                    if (value === (hidden ? "hide" : "show")) {
                        // Pretend to be hidden if this is a "show" and
                        // there is still data from a stopped show/hide
                        if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                            hidden = true;
                            // Ignore all other no-op show/hide data
                        }
                        else {
                            continue;
                        }
                    }
                    orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
                }
            }
            // Bail out if this is a no-op like .hide().hide()
            propTween = !jQuery.isEmptyObject(props);
            if (!propTween && jQuery.isEmptyObject(orig)) {
                return;
            }
            // Restrict "overflow" and "display" styles during box animations
            if (isBox && elem.nodeType === 1) {
                // Support: IE <=9 - 11, Edge 12 - 13
                // Record all 3 overflow attributes because IE does not infer the shorthand
                // from identically-valued overflowX and overflowY
                opts.overflow = [style.overflow, style.overflowX, style.overflowY];
                // Identify a display type, preferring old show/hide data over the CSS cascade
                restoreDisplay = dataShow && dataShow.display;
                if (restoreDisplay == null) {
                    restoreDisplay = dataPriv.get(elem, "display");
                }
                display = jQuery.css(elem, "display");
                if (display === "none") {
                    if (restoreDisplay) {
                        display = restoreDisplay;
                    }
                    else {
                        // Get nonempty value(s) by temporarily forcing visibility
                        showHide([elem], true);
                        restoreDisplay = elem.style.display || restoreDisplay;
                        display = jQuery.css(elem, "display");
                        showHide([elem]);
                    }
                }
                // Animate inline elements as inline-block
                if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                    if (jQuery.css(elem, "float") === "none") {
                        // Restore the original display value at the end of pure show/hide animations
                        if (!propTween) {
                            anim.done(function () {
                                style.display = restoreDisplay;
                            });
                            if (restoreDisplay == null) {
                                display = style.display;
                                restoreDisplay = display === "none" ? "" : display;
                            }
                        }
                        style.display = "inline-block";
                    }
                }
            }
            if (opts.overflow) {
                style.overflow = "hidden";
                anim.always(function () {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
            // Implement show/hide animations
            propTween = false;
            for (prop in orig) {
                // General show/hide setup for this element animation
                if (!propTween) {
                    if (dataShow) {
                        if ("hidden" in dataShow) {
                            hidden = dataShow.hidden;
                        }
                    }
                    else {
                        dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
                    }
                    // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                    if (toggle) {
                        dataShow.hidden = !hidden;
                    }
                    // Show elements before animating them
                    if (hidden) {
                        showHide([elem], true);
                    }
                    /* eslint-disable no-loop-func */
                    anim.done(function () {
                        /* eslint-enable no-loop-func */
                        // The final step of a "hide" animation is actually hiding the element
                        if (!hidden) {
                            showHide([elem]);
                        }
                        dataPriv.remove(elem, "fxshow");
                        for (prop in orig) {
                            jQuery.style(elem, prop, orig[prop]);
                        }
                    });
                }
                // Per-property setup
                propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = propTween.start;
                    if (hidden) {
                        propTween.end = propTween.start;
                        propTween.start = 0;
                    }
                }
            }
        }
        function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;
            // camelCase, specialEasing and expand cssHook pass
            for (index in props) {
                name = jQuery.camelCase(index);
                easing = specialEasing[name];
                value = props[index];
                if (Array.isArray(value)) {
                    easing = value[1];
                    value = props[index] = value[0];
                }
                if (index !== name) {
                    props[name] = value;
                    delete props[index];
                }
                hooks = jQuery.cssHooks[name];
                if (hooks && "expand" in hooks) {
                    value = hooks.expand(value);
                    delete props[name];
                    // Not quite $.extend, this won't overwrite existing keys.
                    // Reusing 'index' because we have the correct "name"
                    for (index in value) {
                        if (!(index in props)) {
                            props[index] = value[index];
                            specialEasing[index] = easing;
                        }
                    }
                }
                else {
                    specialEasing[name] = easing;
                }
            }
        }
        function Animation(elem, properties, options) {
            var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function () {
                // Don't match elem in the :animated selector
                delete tick.elem;
            }), tick = function () {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), 
                // Support: Android 2.3 only
                // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }
                deferred.notifyWith(elem, [animation, percent, remaining]);
                // If there's more to do, yield
                if (percent < 1 && length) {
                    return remaining;
                }
                // If this was an empty animation, synthesize a final progress notification
                if (!length) {
                    deferred.notifyWith(elem, [animation, 1, 0]);
                }
                // Resolve the animation and report its conclusion
                deferred.resolveWith(elem, [animation]);
                return false;
            }, animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function (gotoEnd) {
                    var index = 0, 
                    // If we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                    length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }
                    // Resolve when we played the last frame; otherwise, reject
                    if (gotoEnd) {
                        deferred.notifyWith(elem, [animation, 1, 0]);
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    }
                    else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }), props = animation.props;
            propFilter(props, animation.opts.specialEasing);
            for (; index < length; index++) {
                result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
                if (result) {
                    if (jQuery.isFunction(result.stop)) {
                        jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
                            jQuery.proxy(result.stop, result);
                    }
                    return result;
                }
            }
            jQuery.map(props, createTween, animation);
            if (jQuery.isFunction(animation.opts.start)) {
                animation.opts.start.call(elem, animation);
            }
            // Attach callbacks from options
            animation
                .progress(animation.opts.progress)
                .done(animation.opts.done, animation.opts.complete)
                .fail(animation.opts.fail)
                .always(animation.opts.always);
            jQuery.fx.timer(jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            }));
            return animation;
        }
        jQuery.Animation = jQuery.extend(Animation, {
            tweeners: {
                "*": [function (prop, value) {
                        var tween = this.createTween(prop, value);
                        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                        return tween;
                    }]
            },
            tweener: function (props, callback) {
                if (jQuery.isFunction(props)) {
                    callback = props;
                    props = ["*"];
                }
                else {
                    props = props.match(rnothtmlwhite);
                }
                var prop, index = 0, length = props.length;
                for (; index < length; index++) {
                    prop = props[index];
                    Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                    Animation.tweeners[prop].unshift(callback);
                }
            },
            prefilters: [defaultPrefilter],
            prefilter: function (callback, prepend) {
                if (prepend) {
                    Animation.prefilters.unshift(callback);
                }
                else {
                    Animation.prefilters.push(callback);
                }
            }
        });
        jQuery.speed = function (speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing ||
                    jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            // Go to the end state if fx are off
            if (jQuery.fx.off) {
                opt.duration = 0;
            }
            else {
                if (typeof opt.duration !== "number") {
                    if (opt.duration in jQuery.fx.speeds) {
                        opt.duration = jQuery.fx.speeds[opt.duration];
                    }
                    else {
                        opt.duration = jQuery.fx.speeds._default;
                    }
                }
            }
            // Normalize opt.queue - true/undefined/null -> "fx"
            if (opt.queue == null || opt.queue === true) {
                opt.queue = "fx";
            }
            // Queueing
            opt.old = opt.complete;
            opt.complete = function () {
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }
                if (opt.queue) {
                    jQuery.dequeue(this, opt.queue);
                }
            };
            return opt;
        };
        jQuery.fn.extend({
            fadeTo: function (speed, to, easing, callback) {
                // Show any hidden elements after setting opacity to 0
                return this.filter(isHiddenWithinTree).css("opacity", 0).show()
                    .end().animate({ opacity: to }, speed, easing, callback);
            },
            animate: function (prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    // Empty animations, or finishing resolves immediately
                    if (empty || dataPriv.get(this, "finish")) {
                        anim.stop(true);
                    }
                };
                doAnimation.finish = doAnimation;
                return empty || optall.queue === false ?
                    this.each(doAnimation) :
                    this.queue(optall.queue, doAnimation);
            },
            stop: function (type, clearQueue, gotoEnd) {
                var stopQueue = function (hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop;
                    stop(gotoEnd);
                };
                if (typeof type !== "string") {
                    gotoEnd = clearQueue;
                    clearQueue = type;
                    type = undefined;
                }
                if (clearQueue && type !== false) {
                    this.queue(type || "fx", []);
                }
                return this.each(function () {
                    var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
                    if (index) {
                        if (data[index] && data[index].stop) {
                            stopQueue(data[index]);
                        }
                    }
                    else {
                        for (index in data) {
                            if (data[index] && data[index].stop && rrun.test(index)) {
                                stopQueue(data[index]);
                            }
                        }
                    }
                    for (index = timers.length; index--;) {
                        if (timers[index].elem === this &&
                            (type == null || timers[index].queue === type)) {
                            timers[index].anim.stop(gotoEnd);
                            dequeue = false;
                            timers.splice(index, 1);
                        }
                    }
                    // Start the next in the queue if the last step wasn't forced.
                    // Timers currently will call their complete callbacks, which
                    // will dequeue but only if they were gotoEnd.
                    if (dequeue || !gotoEnd) {
                        jQuery.dequeue(this, type);
                    }
                });
            },
            finish: function (type) {
                if (type !== false) {
                    type = type || "fx";
                }
                return this.each(function () {
                    var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                    // Enable finishing flag on private data
                    data.finish = true;
                    // Empty the queue first
                    jQuery.queue(this, type, []);
                    if (hooks && hooks.stop) {
                        hooks.stop.call(this, true);
                    }
                    // Look for any active animations, and finish them
                    for (index = timers.length; index--;) {
                        if (timers[index].elem === this && timers[index].queue === type) {
                            timers[index].anim.stop(true);
                            timers.splice(index, 1);
                        }
                    }
                    // Look for any animations in the old queue and finish them
                    for (index = 0; index < length; index++) {
                        if (queue[index] && queue[index].finish) {
                            queue[index].finish.call(this);
                        }
                    }
                    // Turn off finishing flag
                    delete data.finish;
                });
            }
        });
        jQuery.each(["toggle", "show", "hide"], function (i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function (speed, easing, callback) {
                return speed == null || typeof speed === "boolean" ?
                    cssFn.apply(this, arguments) :
                    this.animate(genFx(name, true), speed, easing, callback);
            };
        });
        // Generate shortcuts for custom animations
        jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: { opacity: "show" },
            fadeOut: { opacity: "hide" },
            fadeToggle: { opacity: "toggle" }
        }, function (name, props) {
            jQuery.fn[name] = function (speed, easing, callback) {
                return this.animate(props, speed, easing, callback);
            };
        });
        jQuery.timers = [];
        jQuery.fx.tick = function () {
            var timer, i = 0, timers = jQuery.timers;
            fxNow = jQuery.now();
            for (; i < timers.length; i++) {
                timer = timers[i];
                // Run the timer and safely remove it when done (allowing for external removal)
                if (!timer() && timers[i] === timer) {
                    timers.splice(i--, 1);
                }
            }
            if (!timers.length) {
                jQuery.fx.stop();
            }
            fxNow = undefined;
        };
        jQuery.fx.timer = function (timer) {
            jQuery.timers.push(timer);
            jQuery.fx.start();
        };
        jQuery.fx.interval = 13;
        jQuery.fx.start = function () {
            if (inProgress) {
                return;
            }
            inProgress = true;
            schedule();
        };
        jQuery.fx.stop = function () {
            inProgress = null;
        };
        jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            // Default speed
            _default: 400
        };
        // Based off of the plugin by Clint Helfers, with permission.
        // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
        jQuery.fn.delay = function (time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function (next, hooks) {
                var timeout = window.setTimeout(next, time);
                hooks.stop = function () {
                    window.clearTimeout(timeout);
                };
            });
        };
        (function () {
            var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
            input.type = "checkbox";
            // Support: Android <=4.3 only
            // Default value for a checkbox should be "on"
            support.checkOn = input.value !== "";
            // Support: IE <=11 only
            // Must access selectedIndex to make default options select
            support.optSelected = opt.selected;
            // Support: IE <=11 only
            // An input loses its value after becoming a radio
            input = document.createElement("input");
            input.value = "t";
            input.type = "radio";
            support.radioValue = input.value === "t";
        })();
        var boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
            attr: function (name, value) {
                return access(this, jQuery.attr, name, value, arguments.length > 1);
            },
            removeAttr: function (name) {
                return this.each(function () {
                    jQuery.removeAttr(this, name);
                });
            }
        });
        jQuery.extend({
            attr: function (elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                // Don't get/set attributes on text, comment and attribute nodes
                if (nType === 3 || nType === 8 || nType === 2) {
                    return;
                }
                // Fallback to prop when attributes are not supported
                if (typeof elem.getAttribute === "undefined") {
                    return jQuery.prop(elem, name, value);
                }
                // Attribute hooks are determined by the lowercase version
                // Grab necessary hook if one is defined
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    hooks = jQuery.attrHooks[name.toLowerCase()] ||
                        (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
                }
                if (value !== undefined) {
                    if (value === null) {
                        jQuery.removeAttr(elem, name);
                        return;
                    }
                    if (hooks && "set" in hooks &&
                        (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret;
                    }
                    elem.setAttribute(name, value + "");
                    return value;
                }
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                }
                ret = jQuery.find.attr(elem, name);
                // Non-existent attributes return null, we normalize to undefined
                return ret == null ? undefined : ret;
            },
            attrHooks: {
                type: {
                    set: function (elem, value) {
                        if (!support.radioValue && value === "radio" &&
                            nodeName(elem, "input")) {
                            var val = elem.value;
                            elem.setAttribute("type", value);
                            if (val) {
                                elem.value = val;
                            }
                            return value;
                        }
                    }
                }
            },
            removeAttr: function (elem, value) {
                var name, i = 0, 
                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match(rnothtmlwhite);
                if (attrNames && elem.nodeType === 1) {
                    while ((name = attrNames[i++])) {
                        elem.removeAttribute(name);
                    }
                }
            }
        });
        // Hooks for boolean attributes
        boolHook = {
            set: function (elem, value, name) {
                if (value === false) {
                    // Remove boolean attributes when set to false
                    jQuery.removeAttr(elem, name);
                }
                else {
                    elem.setAttribute(name, name);
                }
                return name;
            }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = function (elem, name, isXML) {
                var ret, handle, lowercaseName = name.toLowerCase();
                if (!isXML) {
                    // Avoid an infinite loop by temporarily removing this function from the getter
                    handle = attrHandle[lowercaseName];
                    attrHandle[lowercaseName] = ret;
                    ret = getter(elem, name, isXML) != null ?
                        lowercaseName :
                        null;
                    attrHandle[lowercaseName] = handle;
                }
                return ret;
            };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
        jQuery.fn.extend({
            prop: function (name, value) {
                return access(this, jQuery.prop, name, value, arguments.length > 1);
            },
            removeProp: function (name) {
                return this.each(function () {
                    delete this[jQuery.propFix[name] || name];
                });
            }
        });
        jQuery.extend({
            prop: function (elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                // Don't get/set properties on text, comment and attribute nodes
                if (nType === 3 || nType === 8 || nType === 2) {
                    return;
                }
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    // Fix name and attach hooks
                    name = jQuery.propFix[name] || name;
                    hooks = jQuery.propHooks[name];
                }
                if (value !== undefined) {
                    if (hooks && "set" in hooks &&
                        (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret;
                    }
                    return (elem[name] = value);
                }
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                }
                return elem[name];
            },
            propHooks: {
                tabIndex: {
                    get: function (elem) {
                        // Support: IE <=9 - 11 only
                        // elem.tabIndex doesn't always return the
                        // correct value when it hasn't been explicitly set
                        // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                        // Use proper attribute retrieval(#12072)
                        var tabindex = jQuery.find.attr(elem, "tabindex");
                        if (tabindex) {
                            return parseInt(tabindex, 10);
                        }
                        if (rfocusable.test(elem.nodeName) ||
                            rclickable.test(elem.nodeName) &&
                                elem.href) {
                            return 0;
                        }
                        return -1;
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        });
        // Support: IE <=11 only
        // Accessing the selectedIndex property
        // forces the browser to respect setting selected
        // on the option
        // The getter ensures a default option is selected
        // when in an optgroup
        // eslint rule "no-unused-expressions" is disabled for this code
        // since it considers such accessions noop
        if (!support.optSelected) {
            jQuery.propHooks.selected = {
                get: function (elem) {
                    /* eslint no-unused-expressions: "off" */
                    var parent = elem.parentNode;
                    if (parent && parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                    return null;
                },
                set: function (elem) {
                    /* eslint no-unused-expressions: "off" */
                    var parent = elem.parentNode;
                    if (parent) {
                        parent.selectedIndex;
                        if (parent.parentNode) {
                            parent.parentNode.selectedIndex;
                        }
                    }
                }
            };
        }
        jQuery.each([
            "tabIndex",
            "readOnly",
            "maxLength",
            "cellSpacing",
            "cellPadding",
            "rowSpan",
            "colSpan",
            "useMap",
            "frameBorder",
            "contentEditable"
        ], function () {
            jQuery.propFix[this.toLowerCase()] = this;
        });
        // Strip and collapse whitespace according to HTML spec
        // https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
        function stripAndCollapse(value) {
            var tokens = value.match(rnothtmlwhite) || [];
            return tokens.join(" ");
        }
        function getClass(elem) {
            return elem.getAttribute && elem.getAttribute("class") || "";
        }
        jQuery.fn.extend({
            addClass: function (value) {
                var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                if (jQuery.isFunction(value)) {
                    return this.each(function (j) {
                        jQuery(this).addClass(value.call(this, j, getClass(this)));
                    });
                }
                if (typeof value === "string" && value) {
                    classes = value.match(rnothtmlwhite) || [];
                    while ((elem = this[i++])) {
                        curValue = getClass(elem);
                        cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                        if (cur) {
                            j = 0;
                            while ((clazz = classes[j++])) {
                                if (cur.indexOf(" " + clazz + " ") < 0) {
                                    cur += clazz + " ";
                                }
                            }
                            // Only assign if different to avoid unneeded rendering.
                            finalValue = stripAndCollapse(cur);
                            if (curValue !== finalValue) {
                                elem.setAttribute("class", finalValue);
                            }
                        }
                    }
                }
                return this;
            },
            removeClass: function (value) {
                var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                if (jQuery.isFunction(value)) {
                    return this.each(function (j) {
                        jQuery(this).removeClass(value.call(this, j, getClass(this)));
                    });
                }
                if (!arguments.length) {
                    return this.attr("class", "");
                }
                if (typeof value === "string" && value) {
                    classes = value.match(rnothtmlwhite) || [];
                    while ((elem = this[i++])) {
                        curValue = getClass(elem);
                        // This expression is here for better compressibility (see addClass)
                        cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                        if (cur) {
                            j = 0;
                            while ((clazz = classes[j++])) {
                                // Remove *all* instances
                                while (cur.indexOf(" " + clazz + " ") > -1) {
                                    cur = cur.replace(" " + clazz + " ", " ");
                                }
                            }
                            // Only assign if different to avoid unneeded rendering.
                            finalValue = stripAndCollapse(cur);
                            if (curValue !== finalValue) {
                                elem.setAttribute("class", finalValue);
                            }
                        }
                    }
                }
                return this;
            },
            toggleClass: function (value, stateVal) {
                var type = typeof value;
                if (typeof stateVal === "boolean" && type === "string") {
                    return stateVal ? this.addClass(value) : this.removeClass(value);
                }
                if (jQuery.isFunction(value)) {
                    return this.each(function (i) {
                        jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
                    });
                }
                return this.each(function () {
                    var className, i, self, classNames;
                    if (type === "string") {
                        // Toggle individual class names
                        i = 0;
                        self = jQuery(this);
                        classNames = value.match(rnothtmlwhite) || [];
                        while ((className = classNames[i++])) {
                            // Check each className given, space separated list
                            if (self.hasClass(className)) {
                                self.removeClass(className);
                            }
                            else {
                                self.addClass(className);
                            }
                        }
                        // Toggle whole class name
                    }
                    else if (value === undefined || type === "boolean") {
                        className = getClass(this);
                        if (className) {
                            // Store className if set
                            dataPriv.set(this, "__className__", className);
                        }
                        // If the element has a class name or if we're passed `false`,
                        // then remove the whole classname (if there was one, the above saved it).
                        // Otherwise bring back whatever was previously saved (if anything),
                        // falling back to the empty string if nothing was stored.
                        if (this.setAttribute) {
                            this.setAttribute("class", className || value === false ?
                                "" :
                                dataPriv.get(this, "__className__") || "");
                        }
                    }
                });
            },
            hasClass: function (selector) {
                var className, elem, i = 0;
                className = " " + selector + " ";
                while ((elem = this[i++])) {
                    if (elem.nodeType === 1 &&
                        (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                        return true;
                    }
                }
                return false;
            }
        });
        var rreturn = /\r/g;
        jQuery.fn.extend({
            val: function (value) {
                var hooks, ret, isFunction, elem = this[0];
                if (!arguments.length) {
                    if (elem) {
                        hooks = jQuery.valHooks[elem.type] ||
                            jQuery.valHooks[elem.nodeName.toLowerCase()];
                        if (hooks &&
                            "get" in hooks &&
                            (ret = hooks.get(elem, "value")) !== undefined) {
                            return ret;
                        }
                        ret = elem.value;
                        // Handle most common string cases
                        if (typeof ret === "string") {
                            return ret.replace(rreturn, "");
                        }
                        // Handle cases where value is null/undef or number
                        return ret == null ? "" : ret;
                    }
                    return;
                }
                isFunction = jQuery.isFunction(value);
                return this.each(function (i) {
                    var val;
                    if (this.nodeType !== 1) {
                        return;
                    }
                    if (isFunction) {
                        val = value.call(this, i, jQuery(this).val());
                    }
                    else {
                        val = value;
                    }
                    // Treat null/undefined as ""; convert numbers to string
                    if (val == null) {
                        val = "";
                    }
                    else if (typeof val === "number") {
                        val += "";
                    }
                    else if (Array.isArray(val)) {
                        val = jQuery.map(val, function (value) {
                            return value == null ? "" : value + "";
                        });
                    }
                    hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                    // If set returns undefined, fall back to normal setting
                    if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                        this.value = val;
                    }
                });
            }
        });
        jQuery.extend({
            valHooks: {
                option: {
                    get: function (elem) {
                        var val = jQuery.find.attr(elem, "value");
                        return val != null ?
                            val :
                            // Support: IE <=10 - 11 only
                            // option.text throws exceptions (#14686, #14858)
                            // Strip and collapse whitespace
                            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                            stripAndCollapse(jQuery.text(elem));
                    }
                },
                select: {
                    get: function (elem) {
                        var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
                        if (index < 0) {
                            i = max;
                        }
                        else {
                            i = one ? index : 0;
                        }
                        // Loop through all the selected options
                        for (; i < max; i++) {
                            option = options[i];
                            // Support: IE <=9 only
                            // IE8-9 doesn't update selected after form reset (#2551)
                            if ((option.selected || i === index) &&
                                // Don't return options that are disabled or in a disabled optgroup
                                !option.disabled &&
                                (!option.parentNode.disabled ||
                                    !nodeName(option.parentNode, "optgroup"))) {
                                // Get the specific value for the option
                                value = jQuery(option).val();
                                // We don't need an array for one selects
                                if (one) {
                                    return value;
                                }
                                // Multi-Selects return an array
                                values.push(value);
                            }
                        }
                        return values;
                    },
                    set: function (elem, value) {
                        var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                        while (i--) {
                            option = options[i];
                            /* eslint-disable no-cond-assign */
                            if (option.selected =
                                jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                                optionSet = true;
                            }
                            /* eslint-enable no-cond-assign */
                        }
                        // Force browsers to behave consistently when non-matching value is set
                        if (!optionSet) {
                            elem.selectedIndex = -1;
                        }
                        return values;
                    }
                }
            }
        });
        // Radios and checkboxes getter/setter
        jQuery.each(["radio", "checkbox"], function () {
            jQuery.valHooks[this] = {
                set: function (elem, value) {
                    if (Array.isArray(value)) {
                        return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
                    }
                }
            };
            if (!support.checkOn) {
                jQuery.valHooks[this].get = function (elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                };
            }
        });
        // Return jQuery for attributes-only inclusion
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
        jQuery.extend(jQuery.event, {
            trigger: function (event, data, elem, onlyHandlers) {
                var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                cur = tmp = elem = elem || document;
                // Don't do events on text and comment nodes
                if (elem.nodeType === 3 || elem.nodeType === 8) {
                    return;
                }
                // focus/blur morphs to focusin/out; ensure we're not firing them right now
                if (rfocusMorph.test(type + jQuery.event.triggered)) {
                    return;
                }
                if (type.indexOf(".") > -1) {
                    // Namespaced trigger; create a regexp to match event type in handle()
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespaces.sort();
                }
                ontype = type.indexOf(":") < 0 && "on" + type;
                // Caller can pass in a jQuery.Event object, Object, or just an event type string
                event = event[jQuery.expando] ?
                    event :
                    new jQuery.Event(type, typeof event === "object" && event);
                // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
                event.isTrigger = onlyHandlers ? 2 : 3;
                event.namespace = namespaces.join(".");
                event.rnamespace = event.namespace ?
                    new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                    null;
                // Clean up the event in case it is being reused
                event.result = undefined;
                if (!event.target) {
                    event.target = elem;
                }
                // Clone any incoming data and prepend the event, creating the handler arg list
                data = data == null ?
                    [event] :
                    jQuery.makeArray(data, [event]);
                // Allow special events to draw outside the lines
                special = jQuery.event.special[type] || {};
                if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                    return;
                }
                // Determine event propagation path in advance, per W3C events spec (#9951)
                // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    bubbleType = special.delegateType || type;
                    if (!rfocusMorph.test(bubbleType + type)) {
                        cur = cur.parentNode;
                    }
                    for (; cur; cur = cur.parentNode) {
                        eventPath.push(cur);
                        tmp = cur;
                    }
                    // Only add window if we got to document (e.g., not plain obj or detached DOM)
                    if (tmp === (elem.ownerDocument || document)) {
                        eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                    }
                }
                // Fire handlers on the event path
                i = 0;
                while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                    event.type = i > 1 ?
                        bubbleType :
                        special.bindType || type;
                    // jQuery handler
                    handle = (dataPriv.get(cur, "events") || {})[event.type] &&
                        dataPriv.get(cur, "handle");
                    if (handle) {
                        handle.apply(cur, data);
                    }
                    // Native handler
                    handle = ontype && cur[ontype];
                    if (handle && handle.apply && acceptData(cur)) {
                        event.result = handle.apply(cur, data);
                        if (event.result === false) {
                            event.preventDefault();
                        }
                    }
                }
                event.type = type;
                // If nobody prevented the default action, do it now
                if (!onlyHandlers && !event.isDefaultPrevented()) {
                    if ((!special._default ||
                        special._default.apply(eventPath.pop(), data) === false) &&
                        acceptData(elem)) {
                        // Call a native DOM method on the target with the same name as the event.
                        // Don't do default actions on window, that's where global variables be (#6170)
                        if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                            // Don't re-trigger an onFOO event when we call its FOO() method
                            tmp = elem[ontype];
                            if (tmp) {
                                elem[ontype] = null;
                            }
                            // Prevent re-triggering of the same event, since we already bubbled it above
                            jQuery.event.triggered = type;
                            elem[type]();
                            jQuery.event.triggered = undefined;
                            if (tmp) {
                                elem[ontype] = tmp;
                            }
                        }
                    }
                }
                return event.result;
            },
            // Piggyback on a donor event to simulate a different one
            // Used only for `focus(in | out)` events
            simulate: function (type, elem, event) {
                var e = jQuery.extend(new jQuery.Event(), event, {
                    type: type,
                    isSimulated: true
                });
                jQuery.event.trigger(e, null, elem);
            }
        });
        jQuery.fn.extend({
            trigger: function (type, data) {
                return this.each(function () {
                    jQuery.event.trigger(type, data, this);
                });
            },
            triggerHandler: function (type, data) {
                var elem = this[0];
                if (elem) {
                    return jQuery.event.trigger(type, data, elem, true);
                }
            }
        });
        jQuery.each(("blur focus focusin focusout resize scroll click dblclick " +
            "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
            "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {
            // Handle event binding
            jQuery.fn[name] = function (data, fn) {
                return arguments.length > 0 ?
                    this.on(name, null, data, fn) :
                    this.trigger(name);
            };
        });
        jQuery.fn.extend({
            hover: function (fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
            }
        });
        support.focusin = "onfocusin" in window;
        // Support: Firefox <=44
        // Firefox doesn't have focus(in | out) events
        // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
        //
        // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
        // focus(in | out) events fire after focus & blur events,
        // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
        // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
        if (!support.focusin) {
            jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {
                // Attach a single capturing handler on the document while someone wants focusin/focusout
                var handler = function (event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
                };
                jQuery.event.special[fix] = {
                    setup: function () {
                        var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix);
                        if (!attaches) {
                            doc.addEventListener(orig, handler, true);
                        }
                        dataPriv.access(doc, fix, (attaches || 0) + 1);
                    },
                    teardown: function () {
                        var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix) - 1;
                        if (!attaches) {
                            doc.removeEventListener(orig, handler, true);
                            dataPriv.remove(doc, fix);
                        }
                        else {
                            dataPriv.access(doc, fix, attaches);
                        }
                    }
                };
            });
        }
        var location = window.location;
        var nonce = jQuery.now();
        var rquery = (/\?/);
        // Cross-browser xml parsing
        jQuery.parseXML = function (data) {
            var xml;
            if (!data || typeof data !== "string") {
                return null;
            }
            // Support: IE 9 - 11 only
            // IE throws on parseFromString with invalid input.
            try {
                xml = (new window.DOMParser()).parseFromString(data, "text/xml");
            }
            catch (e) {
                xml = undefined;
            }
            if (!xml || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data);
            }
            return xml;
        };
        var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (Array.isArray(obj)) {
                // Serialize array item.
                jQuery.each(obj, function (i, v) {
                    if (traditional || rbracket.test(prefix)) {
                        // Treat each array item as a scalar.
                        add(prefix, v);
                    }
                    else {
                        // Item is non-scalar (array or object), encode its numeric index.
                        buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
                    }
                });
            }
            else if (!traditional && jQuery.type(obj) === "object") {
                // Serialize object item.
                for (name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                }
            }
            else {
                // Serialize scalar item.
                add(prefix, obj);
            }
        }
        // Serialize an array of form elements or a set of
        // key/values into a query string
        jQuery.param = function (a, traditional) {
            var prefix, s = [], add = function (key, valueOrFunction) {
                // If value is a function, invoke it and use its return value
                var value = jQuery.isFunction(valueOrFunction) ?
                    valueOrFunction() :
                    valueOrFunction;
                s[s.length] = encodeURIComponent(key) + "=" +
                    encodeURIComponent(value == null ? "" : value);
            };
            // If an array was passed in, assume that it is an array of form elements.
            if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                // Serialize the form elements
                jQuery.each(a, function () {
                    add(this.name, this.value);
                });
            }
            else {
                // If traditional, encode the "old" way (the way 1.3.2 or older
                // did it), otherwise encode params recursively.
                for (prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add);
                }
            }
            // Return the resulting serialization
            return s.join("&");
        };
        jQuery.fn.extend({
            serialize: function () {
                return jQuery.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    // Can add propHook for "elements" to filter or add form elements
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this;
                })
                    .filter(function () {
                    var type = this.type;
                    // Use .is( ":disabled" ) so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        (this.checked || !rcheckableType.test(type));
                })
                    .map(function (i, elem) {
                    var val = jQuery(this).val();
                    if (val == null) {
                        return null;
                    }
                    if (Array.isArray(val)) {
                        return jQuery.map(val, function (val) {
                            return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                        });
                    }
                    return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                }).get();
            }
        });
        var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, 
        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, 
        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {}, 
        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {}, 
        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*"), 
        // Anchor tag for parsing the document origin
        originAnchor = document.createElement("a");
        originAnchor.href = location.href;
        // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
        function addToPrefiltersOrTransports(structure) {
            // dataTypeExpression is optional and defaults to "*"
            return function (dataTypeExpression, func) {
                if (typeof dataTypeExpression !== "string") {
                    func = dataTypeExpression;
                    dataTypeExpression = "*";
                }
                var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
                if (jQuery.isFunction(func)) {
                    // For each dataType in the dataTypeExpression
                    while ((dataType = dataTypes[i++])) {
                        // Prepend if requested
                        if (dataType[0] === "+") {
                            dataType = dataType.slice(1) || "*";
                            (structure[dataType] = structure[dataType] || []).unshift(func);
                            // Otherwise append
                        }
                        else {
                            (structure[dataType] = structure[dataType] || []).push(func);
                        }
                    }
                }
            };
        }
        // Base inspection function for prefilters and transports
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            var inspected = {}, seekingTransport = (structure === transports);
            function inspect(dataType) {
                var selected;
                inspected[dataType] = true;
                jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    if (typeof dataTypeOrTransport === "string" &&
                        !seekingTransport && !inspected[dataTypeOrTransport]) {
                        options.dataTypes.unshift(dataTypeOrTransport);
                        inspect(dataTypeOrTransport);
                        return false;
                    }
                    else if (seekingTransport) {
                        return !(selected = dataTypeOrTransport);
                    }
                });
                return selected;
            }
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        // A special extend for ajax options
        // that takes "flat" options (not to be deep extended)
        // Fixes #9887
        function ajaxExtend(target, src) {
            var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) {
                if (src[key] !== undefined) {
                    (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
                }
            }
            if (deep) {
                jQuery.extend(true, target, deep);
            }
            return target;
        }
        /* Handles responses to an ajax request:
         * - finds the right dataType (mediates between content-type and expected dataType)
         * - returns the corresponding response
         */
        function ajaxHandleResponses(s, jqXHR, responses) {
            var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
            // Remove auto dataType and get content-type in the process
            while (dataTypes[0] === "*") {
                dataTypes.shift();
                if (ct === undefined) {
                    ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
                }
            }
            // Check if we're dealing with a known content-type
            if (ct) {
                for (type in contents) {
                    if (contents[type] && contents[type].test(ct)) {
                        dataTypes.unshift(type);
                        break;
                    }
                }
            }
            // Check to see if we have a response for the expected dataType
            if (dataTypes[0] in responses) {
                finalDataType = dataTypes[0];
            }
            else {
                // Try convertible dataTypes
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break;
                    }
                    if (!firstDataType) {
                        firstDataType = type;
                    }
                }
                // Or just use first one
                finalDataType = finalDataType || firstDataType;
            }
            // If we found a dataType
            // We add the dataType to the list if needed
            // and return the corresponding response
            if (finalDataType) {
                if (finalDataType !== dataTypes[0]) {
                    dataTypes.unshift(finalDataType);
                }
                return responses[finalDataType];
            }
        }
        /* Chain conversions given the request and the original response
         * Also sets the responseXXX fields on the jqXHR instance
         */
        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev, converters = {}, 
            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();
            // Create converters map with lowercased keys
            if (dataTypes[1]) {
                for (conv in s.converters) {
                    converters[conv.toLowerCase()] = s.converters[conv];
                }
            }
            current = dataTypes.shift();
            // Convert to each sequential dataType
            while (current) {
                if (s.responseFields[current]) {
                    jqXHR[s.responseFields[current]] = response;
                }
                // Apply the dataFilter if provided
                if (!prev && isSuccess && s.dataFilter) {
                    response = s.dataFilter(response, s.dataType);
                }
                prev = current;
                current = dataTypes.shift();
                if (current) {
                    // There's only work to do if current dataType is non-auto
                    if (current === "*") {
                        current = prev;
                        // Convert response if prev dataType is non-auto and differs from current
                    }
                    else if (prev !== "*" && prev !== current) {
                        // Seek a direct converter
                        conv = converters[prev + " " + current] || converters["* " + current];
                        // If none found, seek a pair
                        if (!conv) {
                            for (conv2 in converters) {
                                // If conv2 outputs current
                                tmp = conv2.split(" ");
                                if (tmp[1] === current) {
                                    // If prev can be converted to accepted input
                                    conv = converters[prev + " " + tmp[0]] ||
                                        converters["* " + tmp[0]];
                                    if (conv) {
                                        // Condense equivalence converters
                                        if (conv === true) {
                                            conv = converters[conv2];
                                            // Otherwise, insert the intermediate dataType
                                        }
                                        else if (converters[conv2] !== true) {
                                            current = tmp[0];
                                            dataTypes.unshift(tmp[1]);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        // Apply converter (if not an equivalence)
                        if (conv !== true) {
                            // Unless errors are allowed to bubble, catch and return them
                            if (conv && s.throws) {
                                response = conv(response);
                            }
                            else {
                                try {
                                    response = conv(response);
                                }
                                catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: conv ? e : "No conversion from " + prev + " to " + current
                                    };
                                }
                            }
                        }
                    }
                }
            }
            return { state: "success", data: response };
        }
        jQuery.extend({
            // Counter for holding the number of active queries
            active: 0,
            // Last-Modified header cache for next request
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: location.href,
                type: "GET",
                isLocal: rlocalProtocol.test(location.protocol),
                global: true,
                processData: true,
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                /*
                timeout: 0,
                data: null,
                dataType: null,
                username: null,
                password: null,
                cache: null,
                throws: false,
                traditional: false,
                headers: {},
                */
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                // Data converters
                // Keys separate source (or catchall "*") and destination types with a single space
                converters: {
                    // Convert anything to text
                    "* text": String,
                    // Text to html (true = no transformation)
                    "text html": true,
                    // Evaluate text as a json expression
                    "text json": JSON.parse,
                    // Parse text as xml
                    "text xml": jQuery.parseXML
                },
                // For options that shouldn't be deep extended:
                // you can add your own custom options here if
                // and when you create one that shouldn't be
                // deep extended (see ajaxExtend)
                flatOptions: {
                    url: true,
                    context: true
                }
            },
            // Creates a full fledged settings object into target
            // with both ajaxSettings and settings fields.
            // If target is omitted, writes into ajaxSettings.
            ajaxSetup: function (target, settings) {
                return settings ?
                    // Building a settings object
                    ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
                    // Extending ajaxSettings
                    ajaxExtend(jQuery.ajaxSettings, target);
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            // Main method
            ajax: function (url, options) {
                // If url is an object, simulate pre-1.5 signature
                if (typeof url === "object") {
                    options = url;
                    url = undefined;
                }
                // Force options to be an object
                options = options || {};
                var transport, 
                // URL without anti-cache param
                cacheURL, 
                // Response headers
                responseHeadersString, responseHeaders, 
                // timeout handle
                timeoutTimer, 
                // Url cleanup var
                urlAnchor, 
                // Request state (becomes false upon send and true upon completion)
                completed, 
                // To know if global events are to be dispatched
                fireGlobals, 
                // Loop variable
                i, 
                // uncached part of the url
                uncached, 
                // Create the final options object
                s = jQuery.ajaxSetup({}, options), 
                // Callbacks context
                callbackContext = s.context || s, 
                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context &&
                    (callbackContext.nodeType || callbackContext.jquery) ?
                    jQuery(callbackContext) :
                    jQuery.event, 
                // Deferreds
                deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), 
                // Status-dependent callbacks
                statusCode = s.statusCode || {}, 
                // Headers (they are sent all at once)
                requestHeaders = {}, requestHeadersNames = {}, 
                // Default abort message
                strAbort = "canceled", 
                // Fake xhr
                jqXHR = {
                    readyState: 0,
                    // Builds headers hashtable if needed
                    getResponseHeader: function (key) {
                        var match;
                        if (completed) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },
                    // Raw string
                    getAllResponseHeaders: function () {
                        return completed ? responseHeadersString : null;
                    },
                    // Caches the header
                    setRequestHeader: function (name, value) {
                        if (completed == null) {
                            name = requestHeadersNames[name.toLowerCase()] =
                                requestHeadersNames[name.toLowerCase()] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    // Overrides response content-type header
                    overrideMimeType: function (type) {
                        if (completed == null) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    // Status-dependent callbacks
                    statusCode: function (map) {
                        var code;
                        if (map) {
                            if (completed) {
                                // Execute the appropriate callbacks
                                jqXHR.always(map[jqXHR.status]);
                            }
                            else {
                                // Lazy-add the new callbacks in a way that preserves old ones
                                for (code in map) {
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            }
                        }
                        return this;
                    },
                    // Cancel the request
                    abort: function (statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };
                // Attach deferreds
                deferred.promise(jqXHR);
                // Add protocol if not provided (prefilters might expect it)
                // Handle falsy url in the settings object (#10093: consistency with old signature)
                // We also use the url parameter if available
                s.url = ((url || s.url || location.href) + "")
                    .replace(rprotocol, location.protocol + "//");
                // Alias method option to type as per ticket #12004
                s.type = options.method || options.type || s.method || s.type;
                // Extract dataTypes list
                s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
                // A cross-domain request is in order when the origin doesn't match the current origin.
                if (s.crossDomain == null) {
                    urlAnchor = document.createElement("a");
                    // Support: IE <=8 - 11, Edge 12 - 13
                    // IE throws exception on accessing the href property if url is malformed,
                    // e.g. http://example.com:80x/
                    try {
                        urlAnchor.href = s.url;
                        // Support: IE <=8 - 11 only
                        // Anchor's host property isn't correctly set when s.url is relative
                        urlAnchor.href = urlAnchor.href;
                        s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                            urlAnchor.protocol + "//" + urlAnchor.host;
                    }
                    catch (e) {
                        // If there is an error parsing the URL, assume it is crossDomain,
                        // it can be rejected by the transport if it is invalid
                        s.crossDomain = true;
                    }
                }
                // Convert data if not already a string
                if (s.data && s.processData && typeof s.data !== "string") {
                    s.data = jQuery.param(s.data, s.traditional);
                }
                // Apply prefilters
                inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
                // If request was aborted inside a prefilter, stop there
                if (completed) {
                    return jqXHR;
                }
                // We can fire global events as of now if asked to
                // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
                fireGlobals = jQuery.event && s.global;
                // Watch for a new set of requests
                if (fireGlobals && jQuery.active++ === 0) {
                    jQuery.event.trigger("ajaxStart");
                }
                // Uppercase the type
                s.type = s.type.toUpperCase();
                // Determine if request has content
                s.hasContent = !rnoContent.test(s.type);
                // Save the URL in case we're toying with the If-Modified-Since
                // and/or If-None-Match header later on
                // Remove hash to simplify url manipulation
                cacheURL = s.url.replace(rhash, "");
                // More options handling for requests with no content
                if (!s.hasContent) {
                    // Remember the hash so we can put it back
                    uncached = s.url.slice(cacheURL.length);
                    // If data is available, append data to url
                    if (s.data) {
                        cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                        // #9682: remove data so that it's not used in an eventual retry
                        delete s.data;
                    }
                    // Add or update anti-cache param if needed
                    if (s.cache === false) {
                        cacheURL = cacheURL.replace(rantiCache, "$1");
                        uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce++) + uncached;
                    }
                    // Put hash and anti-cache on the URL that will be requested (gh-1732)
                    s.url = cacheURL + uncached;
                    // Change '%20' to '+' if this is encoded form body content (gh-2658)
                }
                else if (s.data && s.processData &&
                    (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                    s.data = s.data.replace(r20, "+");
                }
                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                if (s.ifModified) {
                    if (jQuery.lastModified[cacheURL]) {
                        jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                    }
                    if (jQuery.etag[cacheURL]) {
                        jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                    }
                }
                // Set the correct header, if data is being sent
                if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                    jqXHR.setRequestHeader("Content-Type", s.contentType);
                }
                // Set the Accepts header for the server, depending on the dataType
                jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                    s.accepts[s.dataTypes[0]] +
                        (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
                    s.accepts["*"]);
                // Check for headers option
                for (i in s.headers) {
                    jqXHR.setRequestHeader(i, s.headers[i]);
                }
                // Allow custom headers/mimetypes and early abort
                if (s.beforeSend &&
                    (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
                    // Abort if not done already and return
                    return jqXHR.abort();
                }
                // Aborting is no longer a cancellation
                strAbort = "abort";
                // Install callbacks on deferreds
                completeDeferred.add(s.complete);
                jqXHR.done(s.success);
                jqXHR.fail(s.error);
                // Get transport
                transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
                // If no transport, we auto-abort
                if (!transport) {
                    done(-1, "No Transport");
                }
                else {
                    jqXHR.readyState = 1;
                    // Send global event
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                    }
                    // If request was aborted inside ajaxSend, stop there
                    if (completed) {
                        return jqXHR;
                    }
                    // Timeout
                    if (s.async && s.timeout > 0) {
                        timeoutTimer = window.setTimeout(function () {
                            jqXHR.abort("timeout");
                        }, s.timeout);
                    }
                    try {
                        completed = false;
                        transport.send(requestHeaders, done);
                    }
                    catch (e) {
                        // Rethrow post-completion exceptions
                        if (completed) {
                            throw e;
                        }
                        // Propagate others as results
                        done(-1, e);
                    }
                }
                // Callback for when everything is done
                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                    // Ignore repeat invocations
                    if (completed) {
                        return;
                    }
                    completed = true;
                    // Clear timeout if it exists
                    if (timeoutTimer) {
                        window.clearTimeout(timeoutTimer);
                    }
                    // Dereference transport for early garbage collection
                    // (no matter how long the jqXHR object will be used)
                    transport = undefined;
                    // Cache response headers
                    responseHeadersString = headers || "";
                    // Set readyState
                    jqXHR.readyState = status > 0 ? 4 : 0;
                    // Determine if successful
                    isSuccess = status >= 200 && status < 300 || status === 304;
                    // Get response data
                    if (responses) {
                        response = ajaxHandleResponses(s, jqXHR, responses);
                    }
                    // Convert no matter what (that way responseXXX fields are always set)
                    response = ajaxConvert(s, response, jqXHR, isSuccess);
                    // If successful, handle type chaining
                    if (isSuccess) {
                        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                        if (s.ifModified) {
                            modified = jqXHR.getResponseHeader("Last-Modified");
                            if (modified) {
                                jQuery.lastModified[cacheURL] = modified;
                            }
                            modified = jqXHR.getResponseHeader("etag");
                            if (modified) {
                                jQuery.etag[cacheURL] = modified;
                            }
                        }
                        // if no content
                        if (status === 204 || s.type === "HEAD") {
                            statusText = "nocontent";
                            // if not modified
                        }
                        else if (status === 304) {
                            statusText = "notmodified";
                            // If we have data, let's convert it
                        }
                        else {
                            statusText = response.state;
                            success = response.data;
                            error = response.error;
                            isSuccess = !error;
                        }
                    }
                    else {
                        // Extract error from statusText and normalize for non-aborts
                        error = statusText;
                        if (status || !statusText) {
                            statusText = "error";
                            if (status < 0) {
                                status = 0;
                            }
                        }
                    }
                    // Set data for the fake xhr object
                    jqXHR.status = status;
                    jqXHR.statusText = (nativeStatusText || statusText) + "";
                    // Success/Error
                    if (isSuccess) {
                        deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                    }
                    else {
                        deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                    }
                    // Status-dependent callbacks
                    jqXHR.statusCode(statusCode);
                    statusCode = undefined;
                    if (fireGlobals) {
                        globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                    }
                    // Complete
                    completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                        // Handle the global AJAX counter
                        if (!(--jQuery.active)) {
                            jQuery.event.trigger("ajaxStop");
                        }
                    }
                }
                return jqXHR;
            },
            getJSON: function (url, data, callback) {
                return jQuery.get(url, data, callback, "json");
            },
            getScript: function (url, callback) {
                return jQuery.get(url, undefined, callback, "script");
            }
        });
        jQuery.each(["get", "post"], function (i, method) {
            jQuery[method] = function (url, data, callback, type) {
                // Shift arguments if data argument was omitted
                if (jQuery.isFunction(data)) {
                    type = type || callback;
                    callback = data;
                    data = undefined;
                }
                // The url can be an options object (which then must have .url)
                return jQuery.ajax(jQuery.extend({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                }, jQuery.isPlainObject(url) && url));
            };
        });
        jQuery._evalUrl = function (url) {
            return jQuery.ajax({
                url: url,
                // Make this explicit, since user can override this through ajaxSetup (#11264)
                type: "GET",
                dataType: "script",
                cache: true,
                async: false,
                global: false,
                "throws": true
            });
        };
        jQuery.fn.extend({
            wrapAll: function (html) {
                var wrap;
                if (this[0]) {
                    if (jQuery.isFunction(html)) {
                        html = html.call(this[0]);
                    }
                    // The elements to wrap the target around
                    wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                    if (this[0].parentNode) {
                        wrap.insertBefore(this[0]);
                    }
                    wrap.map(function () {
                        var elem = this;
                        while (elem.firstElementChild) {
                            elem = elem.firstElementChild;
                        }
                        return elem;
                    }).append(this);
                }
                return this;
            },
            wrapInner: function (html) {
                if (jQuery.isFunction(html)) {
                    return this.each(function (i) {
                        jQuery(this).wrapInner(html.call(this, i));
                    });
                }
                return this.each(function () {
                    var self = jQuery(this), contents = self.contents();
                    if (contents.length) {
                        contents.wrapAll(html);
                    }
                    else {
                        self.append(html);
                    }
                });
            },
            wrap: function (html) {
                var isFunction = jQuery.isFunction(html);
                return this.each(function (i) {
                    jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
                });
            },
            unwrap: function (selector) {
                this.parent(selector).not("body").each(function () {
                    jQuery(this).replaceWith(this.childNodes);
                });
                return this;
            }
        });
        jQuery.expr.pseudos.hidden = function (elem) {
            return !jQuery.expr.pseudos.visible(elem);
        };
        jQuery.expr.pseudos.visible = function (elem) {
            return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        };
        jQuery.ajaxSettings.xhr = function () {
            try {
                return new window.XMLHttpRequest();
            }
            catch (e) { }
        };
        var xhrSuccessStatus = {
            // File protocol always yields status code 0, assume 200
            0: 200,
            // Support: IE <=9 only
            // #1450: sometimes IE returns 1223 when it should be 204
            1223: 204
        }, xhrSupported = jQuery.ajaxSettings.xhr();
        support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery.ajaxTransport(function (options) {
            var callback, errorCallback;
            // Cross domain only allowed if supported through XMLHttpRequest
            if (support.cors || xhrSupported && !options.crossDomain) {
                return {
                    send: function (headers, complete) {
                        var i, xhr = options.xhr();
                        xhr.open(options.type, options.url, options.async, options.username, options.password);
                        // Apply custom fields if provided
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }
                        // Override mime type if needed
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }
                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        // Set headers
                        for (i in headers) {
                            xhr.setRequestHeader(i, headers[i]);
                        }
                        // Callback
                        callback = function (type) {
                            return function () {
                                if (callback) {
                                    callback = errorCallback = xhr.onload =
                                        xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                                    if (type === "abort") {
                                        xhr.abort();
                                    }
                                    else if (type === "error") {
                                        // Support: IE <=9 only
                                        // On a manual native abort, IE9 throws
                                        // errors on any property access that is not readyState
                                        if (typeof xhr.status !== "number") {
                                            complete(0, "error");
                                        }
                                        else {
                                            complete(
                                            // File: protocol always yields status 0; see #8605, #14207
                                            xhr.status, xhr.statusText);
                                        }
                                    }
                                    else {
                                        complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, 
                                        // Support: IE <=9 only
                                        // IE9 has no XHR2 but throws on binary (trac-11426)
                                        // For XHR2 non-text, let the caller handle it (gh-2498)
                                        (xhr.responseType || "text") !== "text" ||
                                            typeof xhr.responseText !== "string" ?
                                            { binary: xhr.response } :
                                            { text: xhr.responseText }, xhr.getAllResponseHeaders());
                                    }
                                }
                            };
                        };
                        // Listen to events
                        xhr.onload = callback();
                        errorCallback = xhr.onerror = callback("error");
                        // Support: IE 9 only
                        // Use onreadystatechange to replace onabort
                        // to handle uncaught aborts
                        if (xhr.onabort !== undefined) {
                            xhr.onabort = errorCallback;
                        }
                        else {
                            xhr.onreadystatechange = function () {
                                // Check readyState before timeout as it changes
                                if (xhr.readyState === 4) {
                                    // Allow onerror to be called first,
                                    // but that will not handle a native abort
                                    // Also, save errorCallback to a variable
                                    // as xhr.onerror cannot be accessed
                                    window.setTimeout(function () {
                                        if (callback) {
                                            errorCallback();
                                        }
                                    });
                                }
                            };
                        }
                        // Create the abort callback
                        callback = callback("abort");
                        try {
                            // Do send the request (this may raise an exception)
                            xhr.send(options.hasContent && options.data || null);
                        }
                        catch (e) {
                            // #14683: Only rethrow if this hasn't been notified as an error yet
                            if (callback) {
                                throw e;
                            }
                        }
                    },
                    abort: function () {
                        if (callback) {
                            callback();
                        }
                    }
                };
            }
        });
        // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
        jQuery.ajaxPrefilter(function (s) {
            if (s.crossDomain) {
                s.contents.script = false;
            }
        });
        // Install script dataType
        jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, " +
                    "application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function (text) {
                    jQuery.globalEval(text);
                    return text;
                }
            }
        });
        // Handle cache's special case and crossDomain
        jQuery.ajaxPrefilter("script", function (s) {
            if (s.cache === undefined) {
                s.cache = false;
            }
            if (s.crossDomain) {
                s.type = "GET";
            }
        });
        // Bind script tag hack transport
        jQuery.ajaxTransport("script", function (s) {
            // This transport only deals with cross domain requests
            if (s.crossDomain) {
                var script, callback;
                return {
                    send: function (_, complete) {
                        script = jQuery("<script>").prop({
                            charset: s.scriptCharset,
                            src: s.url
                        }).on("load error", callback = function (evt) {
                            script.remove();
                            callback = null;
                            if (evt) {
                                complete(evt.type === "error" ? 404 : 200, evt.type);
                            }
                        });
                        // Use native DOM manipulation to avoid our domManip AJAX trickery
                        document.head.appendChild(script[0]);
                    },
                    abort: function () {
                        if (callback) {
                            callback();
                        }
                    }
                };
            }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        // Default jsonp settings
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
                this[callback] = true;
                return callback;
            }
        });
        // Detect, normalize options and install callbacks for jsonp requests
        jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
            var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                "url" :
                typeof s.data === "string" &&
                    (s.contentType || "")
                        .indexOf("application/x-www-form-urlencoded") === 0 &&
                    rjsonp.test(s.data) && "data");
            // Handle iff the expected data type is "jsonp" or we have a parameter to set
            if (jsonProp || s.dataTypes[0] === "jsonp") {
                // Get callback name, remembering preexisting value associated with it
                callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
                    s.jsonpCallback() :
                    s.jsonpCallback;
                // Insert callback into url or form data
                if (jsonProp) {
                    s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
                }
                else if (s.jsonp !== false) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
                }
                // Use data converter to retrieve json after script execution
                s.converters["script json"] = function () {
                    if (!responseContainer) {
                        jQuery.error(callbackName + " was not called");
                    }
                    return responseContainer[0];
                };
                // Force json dataType
                s.dataTypes[0] = "json";
                // Install callback
                overwritten = window[callbackName];
                window[callbackName] = function () {
                    responseContainer = arguments;
                };
                // Clean-up function (fires after converters)
                jqXHR.always(function () {
                    // If previous value didn't exist - remove it
                    if (overwritten === undefined) {
                        jQuery(window).removeProp(callbackName);
                        // Otherwise restore preexisting value
                    }
                    else {
                        window[callbackName] = overwritten;
                    }
                    // Save back as free
                    if (s[callbackName]) {
                        // Make sure that re-using the options doesn't screw things around
                        s.jsonpCallback = originalSettings.jsonpCallback;
                        // Save the callback name for future use
                        oldCallbacks.push(callbackName);
                    }
                    // Call if it was a function and we have a response
                    if (responseContainer && jQuery.isFunction(overwritten)) {
                        overwritten(responseContainer[0]);
                    }
                    responseContainer = overwritten = undefined;
                });
                // Delegate to script
                return "script";
            }
        });
        // Support: Safari 8 only
        // In Safari 8 documents created via document.implementation.createHTMLDocument
        // collapse sibling forms: the second one becomes a child of the first one.
        // Because of that, this security measure has to be disabled in Safari 8.
        // https://bugs.webkit.org/show_bug.cgi?id=137337
        support.createHTMLDocument = (function () {
            var body = document.implementation.createHTMLDocument("").body;
            body.innerHTML = "<form></form><form></form>";
            return body.childNodes.length === 2;
        })();
        // Argument "data" should be string of html
        // context (optional): If specified, the fragment will be created in this context,
        // defaults to document
        // keepScripts (optional): If true, will include scripts passed in the html string
        jQuery.parseHTML = function (data, context, keepScripts) {
            if (typeof data !== "string") {
                return [];
            }
            if (typeof context === "boolean") {
                keepScripts = context;
                context = false;
            }
            var base, parsed, scripts;
            if (!context) {
                // Stop scripts or inline event handlers from being executed immediately
                // by using document.implementation
                if (support.createHTMLDocument) {
                    context = document.implementation.createHTMLDocument("");
                    // Set the base href for the created document
                    // so any parsed elements with URLs
                    // are based on the document's URL (gh-2965)
                    base = context.createElement("base");
                    base.href = document.location.href;
                    context.head.appendChild(base);
                }
                else {
                    context = document;
                }
            }
            parsed = rsingleTag.exec(data);
            scripts = !keepScripts && [];
            // Single tag
            if (parsed) {
                return [context.createElement(parsed[1])];
            }
            parsed = buildFragment([data], context, scripts);
            if (scripts && scripts.length) {
                jQuery(scripts).remove();
            }
            return jQuery.merge([], parsed.childNodes);
        };
        /**
         * Load a url into a page
         */
        jQuery.fn.load = function (url, params, callback) {
            var selector, type, response, self = this, off = url.indexOf(" ");
            if (off > -1) {
                selector = stripAndCollapse(url.slice(off));
                url = url.slice(0, off);
            }
            // If it's a function
            if (jQuery.isFunction(params)) {
                // We assume that it's the callback
                callback = params;
                params = undefined;
                // Otherwise, build a param string
            }
            else if (params && typeof params === "object") {
                type = "POST";
            }
            // If we have elements to modify, make the request
            if (self.length > 0) {
                jQuery.ajax({
                    url: url,
                    // If "type" variable is undefined, then "GET" method will be used.
                    // Make value of this field explicit since
                    // user can override it through ajaxSetup method
                    type: type || "GET",
                    dataType: "html",
                    data: params
                }).done(function (responseText) {
                    // Save response for use in complete callback
                    response = arguments;
                    self.html(selector ?
                        // If a selector was specified, locate the right elements in a dummy div
                        // Exclude scripts to avoid IE 'Permission Denied' errors
                        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
                        // Otherwise use the full result
                        responseText);
                    // If the request succeeds, this function gets "data", "status", "jqXHR"
                    // but they are ignored because response was set above.
                    // If it fails, this function gets "jqXHR", "status", "error"
                }).always(callback && function (jqXHR, status) {
                    self.each(function () {
                        callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                    });
                });
            }
            return this;
        };
        // Attach a bunch of functions for handling common AJAX events
        jQuery.each([
            "ajaxStart",
            "ajaxStop",
            "ajaxComplete",
            "ajaxError",
            "ajaxSuccess",
            "ajaxSend"
        ], function (i, type) {
            jQuery.fn[type] = function (fn) {
                return this.on(type, fn);
            };
        });
        jQuery.expr.pseudos.animated = function (elem) {
            return jQuery.grep(jQuery.timers, function (fn) {
                return elem === fn.elem;
            }).length;
        };
        jQuery.offset = {
            setOffset: function (elem, options, i) {
                var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
                // Set position first, in-case top/left are set even on static elem
                if (position === "static") {
                    elem.style.position = "relative";
                }
                curOffset = curElem.offset();
                curCSSTop = jQuery.css(elem, "top");
                curCSSLeft = jQuery.css(elem, "left");
                calculatePosition = (position === "absolute" || position === "fixed") &&
                    (curCSSTop + curCSSLeft).indexOf("auto") > -1;
                // Need to be able to calculate position if either
                // top or left is auto and position is either absolute or fixed
                if (calculatePosition) {
                    curPosition = curElem.position();
                    curTop = curPosition.top;
                    curLeft = curPosition.left;
                }
                else {
                    curTop = parseFloat(curCSSTop) || 0;
                    curLeft = parseFloat(curCSSLeft) || 0;
                }
                if (jQuery.isFunction(options)) {
                    // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                    options = options.call(elem, i, jQuery.extend({}, curOffset));
                }
                if (options.top != null) {
                    props.top = (options.top - curOffset.top) + curTop;
                }
                if (options.left != null) {
                    props.left = (options.left - curOffset.left) + curLeft;
                }
                if ("using" in options) {
                    options.using.call(elem, props);
                }
                else {
                    curElem.css(props);
                }
            }
        };
        jQuery.fn.extend({
            offset: function (options) {
                // Preserve chaining for setter
                if (arguments.length) {
                    return options === undefined ?
                        this :
                        this.each(function (i) {
                            jQuery.offset.setOffset(this, options, i);
                        });
                }
                var doc, docElem, rect, win, elem = this[0];
                if (!elem) {
                    return;
                }
                // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
                // Support: IE <=11 only
                // Running getBoundingClientRect on a
                // disconnected node in IE throws an error
                if (!elem.getClientRects().length) {
                    return { top: 0, left: 0 };
                }
                rect = elem.getBoundingClientRect();
                doc = elem.ownerDocument;
                docElem = doc.documentElement;
                win = doc.defaultView;
                return {
                    top: rect.top + win.pageYOffset - docElem.clientTop,
                    left: rect.left + win.pageXOffset - docElem.clientLeft
                };
            },
            position: function () {
                if (!this[0]) {
                    return;
                }
                var offsetParent, offset, elem = this[0], parentOffset = { top: 0, left: 0 };
                // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
                // because it is its only offset parent
                if (jQuery.css(elem, "position") === "fixed") {
                    // Assume getBoundingClientRect is there when computed position is fixed
                    offset = elem.getBoundingClientRect();
                }
                else {
                    // Get *real* offsetParent
                    offsetParent = this.offsetParent();
                    // Get correct offsets
                    offset = this.offset();
                    if (!nodeName(offsetParent[0], "html")) {
                        parentOffset = offsetParent.offset();
                    }
                    // Add offsetParent borders
                    parentOffset = {
                        top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
                        left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
                    };
                }
                // Subtract parent offsets and element margins
                return {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
                };
            },
            // This method will return documentElement in the following cases:
            // 1) For the element inside the iframe without offsetParent, this method will return
            //    documentElement of the parent window
            // 2) For the hidden or detached element
            // 3) For body or html element, i.e. in case of the html node - it will return itself
            //
            // but those exceptions were never presented as a real life use-cases
            // and might be considered as more preferable results.
            //
            // This logic, however, is not guaranteed and can change at any point in the future
            offsetParent: function () {
                return this.map(function () {
                    var offsetParent = this.offsetParent;
                    while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                        offsetParent = offsetParent.offsetParent;
                    }
                    return offsetParent || documentElement;
                });
            }
        });
        // Create scrollLeft and scrollTop methods
        jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
            var top = "pageYOffset" === prop;
            jQuery.fn[method] = function (val) {
                return access(this, function (elem, method, val) {
                    // Coalesce documents and windows
                    var win;
                    if (jQuery.isWindow(elem)) {
                        win = elem;
                    }
                    else if (elem.nodeType === 9) {
                        win = elem.defaultView;
                    }
                    if (val === undefined) {
                        return win ? win[prop] : elem[method];
                    }
                    if (win) {
                        win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
                    }
                    else {
                        elem[method] = val;
                    }
                }, method, val, arguments.length);
            };
        });
        // Support: Safari <=7 - 9.1, Chrome <=37 - 49
        // Add the top/left cssHooks using jQuery.fn.position
        // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
        // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
        // getComputedStyle returns percent when specified for top/left/bottom/right;
        // rather than make the css module depend on the offset module, just check for it here
        jQuery.each(["top", "left"], function (i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);
                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test(computed) ?
                        jQuery(elem).position()[prop] + "px" :
                        computed;
                }
            });
        });
        // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
        jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
            jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {
                // Margin is only for outerHeight, outerWidth
                jQuery.fn[funcName] = function (margin, value) {
                    var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                    return access(this, function (elem, type, value) {
                        var doc;
                        if (jQuery.isWindow(elem)) {
                            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                            return funcName.indexOf("outer") === 0 ?
                                elem["inner" + name] :
                                elem.document.documentElement["client" + name];
                        }
                        // Get document width or height
                        if (elem.nodeType === 9) {
                            doc = elem.documentElement;
                            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                            // whichever is greatest
                            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                        }
                        return value === undefined ?
                            // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css(elem, type, extra) :
                            // Set width or height on the element
                            jQuery.style(elem, type, value, extra);
                    }, type, chainable ? margin : undefined, chainable);
                };
            });
        });
        jQuery.fn.extend({
            bind: function (types, data, fn) {
                return this.on(types, null, data, fn);
            },
            unbind: function (types, fn) {
                return this.off(types, null, fn);
            },
            delegate: function (selector, types, data, fn) {
                return this.on(types, selector, data, fn);
            },
            undelegate: function (selector, types, fn) {
                // ( namespace ) or ( selector, types [, fn] )
                return arguments.length === 1 ?
                    this.off(selector, "**") :
                    this.off(types, selector || "**", fn);
            }
        });
        jQuery.holdReady = function (hold) {
            if (hold) {
                jQuery.readyWait++;
            }
            else {
                jQuery.ready(true);
            }
        };
        jQuery.isArray = Array.isArray;
        jQuery.parseJSON = JSON.parse;
        jQuery.nodeName = nodeName;
        // Register as a named AMD module, since jQuery can be concatenated with other
        // files that may use define, but not via a proper concatenation script that
        // understands anonymous AMD modules. A named AMD is safest and most robust
        // way to register. Lowercase jquery is used because AMD module names are
        // derived from file names, and jQuery is normally delivered in a lowercase
        // file name. Do this after creating the global so that if an AMD module wants
        // to call noConflict to hide this version of jQuery, it will work.
        // Note that for maximum portability, libraries that are not jQuery should
        // declare themselves as anonymous modules, and avoid setting a global if an
        // AMD loader is present. jQuery is a special case. For more information, see
        // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
        if (typeof undefined === "function" && undefined.amd) {
            undefined("jquery", [], function () {
                return jQuery;
            });
        }
        var 
        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery, 
        // Map over the $ in case of overwrite
        _$ = window.$;
        jQuery.noConflict = function (deep) {
            if (window.$ === jQuery) {
                window.$ = _$;
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery;
            }
            return jQuery;
        };
        // Expose jQuery and $ identifiers, even in AMD
        // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
        // and CommonJS for browser emulators (#13566)
        if (!noGlobal) {
            window.jQuery = window.$ = jQuery;
        }
        return jQuery;
    });
});
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
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
};
var FilterService = /** @class */ (function () {
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
     * @param {?} grid SlickGrid Grid object
     * @param {?} options
     * @return {?}
     */
    FilterService.prototype.attachBackendOnFilter = function (grid, options) {
        this.subscriber = new Slick.Event();
        this.subscriber.subscribe(this.attachBackendOnFilterSubscribe);
        this.addFilterTemplateToHeaderRow();
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.attachBackendOnFilterSubscribe = function (event, args) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceOptions, backendApi, query, observableOrPromise, responseProcess;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!args || !args.grid) {
                            throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
                        }
                        serviceOptions = args.grid.getOptions();
                        if (!serviceOptions || !serviceOptions.onBackendEventApi.process || !serviceOptions.onBackendEventApi.service) {
                            throw new Error("onBackendEventApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        backendApi = serviceOptions.onBackendEventApi;
                        // run a preProcess callback if defined
                        if (backendApi.preProcess) {
                            backendApi.preProcess();
                        }
                        return [4 /*yield*/, backendApi.service.onFilterChanged(event, args)];
                    case 1:
                        query = _g.sent();
                        observableOrPromise = backendApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 2:
                        responseProcess = _g.sent();
                        // send the response process to the postProcess callback
                        if (backendApi.postProcess) {
                            backendApi.postProcess(responseProcess);
                        }
                        return [2 /*return*/];
                }
            });
        });
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
        for (var _g = 0, _h = Object.keys(args.columnFilters); _g < _h.length; _g++) {
            var columnId = _h[_g];
            var /** @type {?} */ columnFilter = args.columnFilters[columnId];
            var /** @type {?} */ columnIndex = args.grid.getColumnIndex(columnId);
            var /** @type {?} */ columnDef = args.grid.getColumns()[columnIndex];
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
            serviceOptions: this._onFilterChangedOptions,
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
                jquery(header).empty();
                elm = jquery(filterTemplate);
                elm.val(searchTerm);
                elm.data('columnId', columnDef_1.id);
                if (elm && typeof elm.appendTo === 'function') {
                    elm.appendTo(header);
                }
                // depending on the DOM Element type, we will watch the correct event
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
var MouseService = /** @class */ (function () {
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
var ResizerService = /** @class */ (function () {
    /**
     * @param {?} router
     */
    function ResizerService(router$$1) {
        this.router = router$$1;
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
        var /** @type {?} */ gridDomElm = jquery("#" + gridOptions.gridId);
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        this.resizeGrid(grid, gridOptions);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        jquery(window).on('resize.grid', function () {
            // for some yet unknown reason, calling the resize twice removes any stuttering/flickering when changing the height and makes it much smoother
            _this.resizeGrid(grid, gridOptions);
            _this.resizeGrid(grid, gridOptions);
        });
        // destroy the resizer on route change
        this.router.events.subscribe(function (event) {
            _this.destroy();
        });
    };
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    ResizerService.prototype.calculateGridNewDimensions = function (gridOptions) {
        var /** @type {?} */ gridDomElm = jquery("#" + gridOptions.gridId);
        var /** @type {?} */ containerElm = (gridOptions.autoResize && gridOptions.autoResize.containerId) ? jquery("#" + gridOptions.autoResize.containerId) : jquery("#" + gridOptions.gridContainerId);
        var /** @type {?} */ windowElm = jquery(window);
        if (windowElm === undefined || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        var /** @type {?} */ bottomPadding = (gridOptions.autoResize && gridOptions.autoResize.bottomPadding) ? gridOptions.autoResize.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && gridOptions.enablePagination) {
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
        jquery(window).trigger('resize.grid').off('resize');
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
            jquery("#" + gridOptions.gridId).height(newSizes.height);
            jquery("#" + gridOptions.gridId).width(newSizes.width);
            jquery("#" + gridOptions.gridContainerId).height(newSizes.height);
            jquery("#" + gridOptions.gridContainerId).width(newSizes.width);
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
    { type: Injectable },
];
/**
 * @nocollapse
 */
ResizerService.ctorParameters = function () { return [
    { type: Router, },
]; };
var __awaiter$1 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
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
};
var SortService = /** @class */ (function () {
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
        this.subscriber.subscribe(this.attachBackendOnSortSubscribe);
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    SortService.prototype.attachBackendOnSortSubscribe = function (event, args) {
        return __awaiter$1(this, void 0, void 0, function () {
            var serviceOptions, query, observableOrPromise, responseProcess;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!args || !args.grid) {
                            throw new Error('Something went wrong when trying to attach the "attachBackendOnSortSubscribe(event, args)" function, it seems that "args" is not populated correctly');
                        }
                        serviceOptions = args.grid.getOptions();
                        if (!serviceOptions || !serviceOptions.onBackendEventApi.process || !serviceOptions.onBackendEventApi.service) {
                            throw new Error("onBackendEventApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        if (serviceOptions.onBackendEventApi.preProcess) {
                            serviceOptions.onBackendEventApi.preProcess();
                        }
                        query = serviceOptions.onBackendEventApi.service.onSortChanged(event, args);
                        observableOrPromise = serviceOptions.onBackendEventApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 1:
                        responseProcess = _g.sent();
                        // send the response process to the postProcess callback
                        if (serviceOptions.onBackendEventApi.postProcess) {
                            serviceOptions.onBackendEventApi.postProcess(responseProcess);
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
        this.subscriber.subscribe(function (e, args) {
            // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
            // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
            var /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            dataView.sort(function (dataRow1, dataRow2) {
                for (var /** @type {?} */ i = 0, /** @type {?} */ l = sortColumns.length; i < l; i++) {
                    var /** @type {?} */ sortDirection = sortColumns[i].sortAsc ? 1 : -1;
                    var /** @type {?} */ sortField = sortColumns[i].sortCol.field;
                    var /** @type {?} */ fieldType = sortColumns[i].sortCol.type || 'string';
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
        this.subscriber.unsubscribe();
    };
    return SortService;
}());
"use strict";
//=====================================================
//============================ parce properties to find
//=====================================================
function parceFind(_levelA) {
    //+++++++++++++++++++++++++++++++++++ work over Array
    //++++++++++++++++++++++++++++++++++++++++++++++++++++
    var propsA = _levelA.map(function (currentValue, index) {
        var itemX = _levelA[index];
        if (itemX instanceof Query) {
            return itemX.toString();
        }
        else if (!Array.isArray(itemX) && "object" === typeof itemX) {
            var propsA_1 = Object.keys(itemX);
            if (1 !== propsA_1.length) {
                throw new RangeError("Alias objects should only have one value. was passed: " + JSON.stringify(itemX));
            }
            var propS = propsA_1[0];
            var item = itemX[propS];
            // contributor: https://github.com/charlierudolph/graphql-query-builder/commit/878328e857e92d140f5ba6f7cfe07837620ec490
            if (Array.isArray(item)) {
                return new Query(propS).find(item);
            }
            return propS + " : " + item + " ";
        }
        else if ("string" === typeof itemX) {
            return itemX;
        }
        else {
            throw new RangeError("cannot handle Find value of " + itemX);
        }
    });
    return propsA.join(",");
}
//=====================================================
//=================================== get GraphQL Value
//=====================================================
function getGraphQLValue(value) {
    if ("string" === typeof value) {
        value = JSON.stringify(value);
    }
    else if (Array.isArray(value)) {
        value = value.map(function (item) {
            return getGraphQLValue(item);
        }).join();
        value = "[" + value + "]";
    }
    else if ("object" === typeof value) {
        /*if (value.toSource)
              value = value.toSource().slice(2,-2);
          else*/
        value = objectToString(value);
        //console.error("No toSource!!",value);
    }
    return value;
}
function objectToString(obj) {
    var sourceA = [];
    for (var prop in obj) {
        if ("function" === typeof obj[prop]) {
            continue;
        }
        // if ("object" === typeof obj[prop]) {
        sourceA.push(prop + ":" + getGraphQLValue(obj[prop]));
        // } else {
        //      sourceA.push(`${prop}:${obj[prop]}`);
        // }
    }
    return "{" + sourceA.join() + "}";
}
//=====================================================
//========================================= Query Class
//=====================================================
function Query(_fnNameS, _aliasS_OR_Filter) {
    var _this = this;
    this.fnNameS = _fnNameS;
    this.headA = [];
    this.filter = function (filtersO) {
        for (var propS in filtersO) {
            if ("function" === typeof filtersO[propS]) {
                continue;
            }
            var val = getGraphQLValue(filtersO[propS]);
            if ("{}" === val) {
                continue;
            }
            _this.headA.push(propS + ":" + val);
        }
        return _this;
    };
    if ("string" === typeof _aliasS_OR_Filter) {
        this.aliasS = _aliasS_OR_Filter;
    }
    else if ("object" === typeof _aliasS_OR_Filter) {
        this.filter(_aliasS_OR_Filter);
    }
    else if (undefined === _aliasS_OR_Filter && 2 === arguments.length) {
        throw new TypeError("You have passed undefined as Second argument to 'Query'");
    }
    else if (undefined !== _aliasS_OR_Filter) {
        throw new TypeError("Second argument to 'Query' should be an alias name(String) or filter arguments(Object). was passed " + _aliasS_OR_Filter);
    }
    this.setAlias = function (_aliasS) {
        _this.aliasS = _aliasS;
        return _this;
    };
    this.find = function (findA) {
        if (!findA) {
            throw new TypeError("find value can not be >>falsy<<");
        }
        // if its a string.. it may have other values
        // else it sould be an Object or Array of maped values
        this.bodyS = parceFind((Array.isArray(findA)) ? findA : Array.from(arguments));
        return this;
    };
}
//=====================================================
//===================================== Query prototype
//=====================================================
Query.prototype = {
    toString: function () {
        if (undefined === this.bodyS) {
            throw new ReferenceError("return properties are not defined. use the 'find' function to defined them");
        }
        return ((this.aliasS) ? (this.aliasS + ":") : "") + " " + this.fnNameS + " " + ((0 < this.headA.length) ? "(" + this.headA.join(",") + ")" : "") + "  { " + this.bodyS + " }";
    }
};
var graphqlQueryBuilder = Query;
var timer;
var GraphqlService = /** @class */ (function () {
    function GraphqlService() {
        this.serviceOptions = {};
        this.defaultOrderBy = { field: 'id', direction: SortDirection.ASC };
    }
    /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @param {?=} serviceOptions GraphqlServiceOption
     * @return {?}
     */
    GraphqlService.prototype.buildQuery = function (serviceOptions) {
        if (!this.serviceOptions.datasetName || !this.serviceOptions.dataFilters) {
            throw new Error('GraphQL Service requires "datasetName" & "dataFilters" properties for it to work');
        }
        var /** @type {?} */ queryQb = new graphqlQueryBuilder('query');
        var /** @type {?} */ datasetQb = new graphqlQueryBuilder(this.serviceOptions.datasetName);
        var /** @type {?} */ pageInfoQb = new graphqlQueryBuilder('pageInfo');
        var /** @type {?} */ dataQb = (this.serviceOptions.isWithCursor) ? new graphqlQueryBuilder('edges') : new graphqlQueryBuilder('nodes');
        if (this.serviceOptions.isWithCursor) {
            // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
            pageInfoQb.find('hasNextPage', 'endCursor');
            dataQb.find(['cursor', { 'node': this.serviceOptions.dataFilters }]);
        }
        else {
            // ...pageInfo { hasNextPage }, nodes { _filters_ }
            pageInfoQb.find('hasNextPage');
            dataQb.find(this.serviceOptions.dataFilters);
        }
        datasetQb.find(['totalCount', pageInfoQb, dataQb]);
        // add dataset filters, could be Pagination and SortingFilters and/or FieldFilters
        var /** @type {?} */ datasetFilters = this.serviceOptions.paginationOptions;
        if (this.serviceOptions.sortingOptions) {
            // orderBy: [{ field:x, direction: 'ASC' }]
            datasetFilters.orderBy = this.serviceOptions.sortingOptions;
        }
        if (this.serviceOptions.filteringOptions) {
            // filterBy: [{ fieldName: date, fieldOperator: '>', fieldValue: '2000-10-10' }]
            datasetFilters.filterBy = this.serviceOptions.filteringOptions;
        }
        // query { users(first: 20, orderBy: [], filterBy: [])}
        datasetQb.filter(datasetFilters);
        queryQb.find(datasetQb);
        var /** @type {?} */ enumSearchProperties = ['direction:', 'field:', 'operator:'];
        return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties);
    };
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    GraphqlService.prototype.buildPaginationQuery = function (serviceOptions) {
    };
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    GraphqlService.prototype.buildSortingQuery = function (serviceOptions) {
    };
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    GraphqlService.prototype.initOptions = function (serviceOptions) {
        this.serviceOptions = serviceOptions || {};
    };
    /**
     * @param {?} fieldName
     * @return {?}
     */
    GraphqlService.prototype.removeColumnFilter = function (fieldName) {
    };
    /**
     * @return {?}
     */
    GraphqlService.prototype.resetPaginationOptions = function () {
        var /** @type {?} */ paginationOptions;
        if (this.serviceOptions.isWithCursor) {
            // first, last, after, before
            paginationOptions = /** @type {?} */ ({
                after: '',
                before: undefined,
                last: undefined
            });
        }
        else {
            // first, last, offset
            paginationOptions = /** @type {?} */ (this.serviceOptions.paginationOptions);
            paginationOptions.offset = 0;
        }
        this.updateOptions({ paginationOptions: paginationOptions });
    };
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    GraphqlService.prototype.updateOptions = function (serviceOptions) {
        this.serviceOptions = Object.assign({}, this.serviceOptions, serviceOptions);
    };
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} terms
     * @return {?}
     */
    GraphqlService.prototype.saveColumnFilter = function (fieldName, value, terms) {
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GraphqlService.prototype.filterChanged = function (event, args) {
        console.log(event, args);
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GraphqlService.prototype.sorterChanged = function (event, args) {
        console.log(event, args);
        return 'this is the query';
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
        var /** @type {?} */ debounceTypingDelay = 0;
        if (event.type === 'keyup' || event.type === 'keydown') {
            debounceTypingDelay = serviceOptions.onBackendEventApi.filterTypingDebounce || 700;
        }
        var /** @type {?} */ promise = new Promise(function (resolve, reject) {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
            }
            // loop through all columns to inspect filters
            for (var /** @type {?} */ columnId in args.columnFilters) {
                if (args.columnFilters.hasOwnProperty(columnId)) {
                    var /** @type {?} */ columnFilter = args.columnFilters[columnId];
                    var /** @type {?} */ columnDef = columnFilter.columnDef;
                    var /** @type {?} */ fieldName = columnDef.field || columnDef.name;
                    var /** @type {?} */ fieldSearchValue = columnFilter.searchTerm;
                    if (typeof fieldSearchValue === 'undefined') {
                        fieldSearchValue = '';
                    }
                    if (typeof fieldSearchValue !== 'string') {
                        throw new Error("GraphQL filter term property must be provided type \"string\", if you use filter with options then make sure your ids are also string. For example: filter: {type: FormElementType.select, selectOptions: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                    }
                    fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                    var /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                    var /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
                    var /** @type {?} */ searchValue = (!!matches) ? matches[2] : '';
                    var /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : '';
                    // no need to query if search value is empty
                    if (fieldName && searchValue === '') {
                        _this.removeColumnFilter(fieldName);
                        continue;
                    }
                    // escaping the search value
                    searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                    searchValue = encodeURIComponent(searchValue); // encode URI of the final search value
                    if (operator === '*' || lastValueChar === '*') {
                        operator = (operator === '*') ? 'endsWith' : 'startsWith';
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
        if (this.serviceOptions.isWithCursor) {
            paginationOptions = {
                first: args.pageSize
            };
        }
        else {
            paginationOptions = {
                first: args.pageSize,
                offset: (args.newPage - 1) * args.pageSize
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
        // orderBy:[{sort: lastName, direction: ASC}, {sort: firstName, direction: DESC}]
        if (sortColumns && sortColumns.length === 0) {
            sortByArray = new Array(this.defaultOrderBy); // when empty, use the default sort
        }
        else {
            if (sortColumns) {
                for (var _g = 0, sortColumns_1 = sortColumns; _g < sortColumns_1.length; _g++) {
                    var column = sortColumns_1[_g];
                    var /** @type {?} */ fieldName = column.sortCol.field || column.sortCol.id;
                    var /** @type {?} */ direction = column.sortAsc ? SortDirection.ASC : SortDirection.DESC;
                    sortByArray.push({
                        field: fieldName,
                        direction: direction
                    });
                }
            }
        }
        this.updateOptions({ sortingOptions: sortByArray });
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    };
    /**
     * A function which takes an input string and removes double quotes only
     * on certain fields are identified as GraphQL enums
     * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
     * then the result will be:
     * FROM
     * query { users (orderBy:[{sort:"firstName", direction:"ASC"} }
     * TO
     * query { users (orderBy:[{sort: firstName, direction: ASC}}
     * @param {?} inputStr input string
     * @param {?} enumSearchWords array of enum words to filter
     * @return {?} outputStr output string
     */
    GraphqlService.prototype.trimDoubleQuotesOnEnumField = function (inputStr, enumSearchWords) {
        var /** @type {?} */ patternWordInQuotes = "s?(\".*?\")";
        var /** @type {?} */ patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
        patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
        // example with (sort: & direction:):  /sort:s?(".*?")|direction:s?(".*?")/
        var /** @type {?} */ reg = new RegExp(patternRegex, 'g');
        return inputStr.replace(reg, function (group1, group2, group3) {
            var /** @type {?} */ rep = group1.replace(/"/g, '');
            return rep;
        });
    };
    return GraphqlService;
}());
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
        for (var _g = 0, _h = Object.keys(options); _g < _h.length; _g++) {
            var property = _h[_g];
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
var timer$1;
var GridOdataService = /** @class */ (function () {
    /**
     * @param {?} odataService
     */
    function GridOdataService(odataService) {
        this.odataService = odataService;
        this.serviceOptions = {};
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
     * @param {?=} options
     * @return {?}
     */
    GridOdataService.prototype.updateOptions = function (options) {
        this.serviceOptions = Object.assign({}, this.serviceOptions, options);
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
        var /** @type {?} */ searchByArray = [];
        var /** @type {?} */ serviceOptions = args.grid.getOptions();
        var /** @type {?} */ debounceTypingDelay = 0;
        if (event.type === 'keyup' || event.type === 'keydown') {
            debounceTypingDelay = serviceOptions.onBackendEventApi.filterTypingDebounce || 700;
        }
        var /** @type {?} */ promise = new Promise(function (resolve, reject) {
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
                        var /** @type {?} */ searchBy = '';
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
                for (var _g = 0, sortColumns_2 = sortColumns; _g < sortColumns_2.length; _g++) {
                    var column = sortColumns_2[_g];
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
/**
 * @nocollapse
 */
GridOdataService.ctorParameters = function () { return [
    { type: OdataService, },
]; };
var __awaiter$2 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
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
};
var SlickPaginationComponent = /** @class */ (function () {
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
        return __awaiter$2(this, void 0, void 0, function () {
            var itemsPerPage, query, observableOrPromise, responseProcess;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.recalculateFromToIndexes();
                        if (this.dataTo > this.totalItems) {
                            this.dataTo = this.totalItems;
                        }
                        if (!this._gridPaginationOptions.onBackendEventApi) return [3 /*break*/, 2];
                        itemsPerPage = this.itemsPerPage;
                        if (!this._gridPaginationOptions.onBackendEventApi.process || !this._gridPaginationOptions.onBackendEventApi.service) {
                            throw new Error("onBackendEventApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        if (this._gridPaginationOptions.onBackendEventApi.preProcess) {
                            this._gridPaginationOptions.onBackendEventApi.preProcess();
                        }
                        query = this._gridPaginationOptions.onBackendEventApi.service.onPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                        observableOrPromise = this._gridPaginationOptions.onBackendEventApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 1:
                        responseProcess = _g.sent();
                        // send the response process to the postProcess callback
                        if (this._gridPaginationOptions.onBackendEventApi.postProcess) {
                            this._gridPaginationOptions.onBackendEventApi.postProcess(responseProcess);
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
                template: "\n    <div class=\"slick-pagination\">\n        <div class=\"slick-pagination-nav\">\n            <nav aria-label=\"Page navigation\">\n            <ul class=\"pagination\">\n                <li class=\"page-item\" [ngClass]=\"pageNumber === 1 ? 'disabled' : ''\">\n                <a class=\"page-link icon-seek-first fa fa-angle-double-left\" aria-label=\"First\" (click)=\"changeToFirstPage($event)\">\n                </a>\n                </li>\n                <li class=\"page-item\" [ngClass]=\"pageNumber === 1 ? 'disabled' : ''\">\n                <a class=\"page-link icon-seek-prev fa fa-angle-left\" aria-label=\"Previous\" (click)=\"changeToPreviousPage($event)\">\n                </a>\n                </li>\n            </ul>\n            </nav>\n\n            <div class=\"slick-page-number\">\n            page {{pageNumber}} of {{pageCount}}\n            </div>\n\n            <nav aria-label=\"Page navigation\">\n            <ul class=\"pagination\">\n                <li class=\"page-item\" [ngClass]=\"pageNumber === pageCount ? 'disabled' : ''\">\n                <a class=\"page-link icon-seek-next text-center fa fa-lg fa-angle-right\" aria-label=\"Next\" (click)=\"changeToNextPage($event)\">\n                </a>\n                </li>\n                <li class=\"page-item\" [ngClass]=\"pageNumber === pageCount ? 'disabled' : ''\">\n                <a class=\"page-link icon-seek-end fa fa-lg fa-angle-double-right\" aria-label=\"Last\" (click)=\"changeToLastPage($event)\">\n                </a>\n                </li>\n            </ul>\n            </nav>\n        </div>\n        <span class=\"slick-pagination-settings\">\n            <select id=\"items-per-page-label\" [value]=\"itemsPerPage\" (change)=\"onChangeItemPerPage($event)\">\n            <option value=\"{{pageSize}}\" *ngFor=\"let pageSize of paginationPageSizes;\">{{pageSize}}</option>\n            </select>\n            items per page,\n            <span class=\"slick-pagination-count\">\n            {{dataFrom}}-{{dataTo}} of {{totalItems}} items\n            </span>\n        </span>\n        </div>\n  "
            },] },
];
/**
 * @nocollapse
 */
SlickPaginationComponent.ctorParameters = function () { return []; };
SlickPaginationComponent.propDecorators = {
    'gridPaginationOptions': [{ type: Input },],
    'grid': [{ type: Input },],
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
var __awaiter$3 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
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
};
var AngularSlickgridComponent = /** @class */ (function () {
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
        var /** @type {?} */ columnpicker = new Slick.Controls.ColumnPicker(this.columnDefinitions, this.grid, this._gridOptions);
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
        var _this = this;
        // attach external sorting (backend) when available or default onSort (dataView)
        if (options.enableSorting) {
            (options.onBackendEventApi) ? this.sortService.attachBackendOnSort(grid, options) : this.sortService.attachLocalOnSort(grid, options, this._dataView);
        }
        // attach external filter (backend) when available or default onFilter (dataView)
        if (options.enableFiltering) {
            this.filterService.init(grid, options, this.columnDefinitions, this._columnFilters);
            (options.onBackendEventApi) ? this.filterService.attachBackendOnFilter(grid, options) : this.filterService.attachLocalOnFilter(this._dataView);
        }
        if (options.onBackendEventApi && options.onBackendEventApi.onInit) {
            var /** @type {?} */ backendApi_1 = options.onBackendEventApi;
            var /** @type {?} */ query_1 = backendApi_1.service.buildQuery();
            // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
            setTimeout(function () { return __awaiter$3(_this, void 0, void 0, function () {
                var observableOrPromise, responseProcess;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            observableOrPromise = options.onBackendEventApi.onInit(query_1);
                            return [4 /*yield*/, castToPromise(observableOrPromise)];
                        case 1:
                            responseProcess = _g.sent();
                            // send the response process to the postProcess callback
                            if (backendApi_1.postProcess) {
                                backendApi_1.postProcess(responseProcess);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
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
                    // this.grid.autosizeColumns();
                });
            }
        }
    };
    return AngularSlickgridComponent;
}());
AngularSlickgridComponent.decorators = [
    { type: Injectable },
    { type: Component, args: [{
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
    'gridId': [{ type: Input },],
    'columnDefinitions': [{ type: Input },],
    'gridOptions': [{ type: Input },],
    'gridHeight': [{ type: Input },],
    'gridWidth': [{ type: Input },],
    'dataset': [{ type: Input },],
};
var AngularSlickgridModule = /** @class */ (function () {
    function AngularSlickgridModule() {
    }
    return AngularSlickgridModule;
}());
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
                    GraphqlService,
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
// Public classes.
/**
 * Generated bundle index. Do not edit.
 */
export { CaseType, FormElementType, FieldType, FilterConditions, FilterTemplates, Formatters, Sorters, FilterService, MouseService, ResizerService, SortService, GraphqlService, GridOdataService, SlickPaginationComponent, AngularSlickgridComponent, AngularSlickgridModule, FilterService as ɵd, MouseService as ɵc, ResizerService as ɵb, SortService as ɵe, OdataService as ɵa };
//# sourceMappingURL=angular-slickgrid.es5.js.map
