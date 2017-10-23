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

let OperatorType = {};
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

let SortDirection = {};
SortDirection.ASC = /** @type {?} */ ('ASC');
SortDirection.DESC = /** @type {?} */ ('DESC');
SortDirection[SortDirection.ASC] = "ASC";
SortDirection[SortDirection.DESC] = "DESC";

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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
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
!function(a,b){module.exports=b();}(commonjsGlobal,function(){"use strict";function a(){return sd.apply(null,arguments)}function b(a){sd=a;}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return null!=a&&"[object Object]"===Object.prototype.toString.call(a)}function e(a){var b;for(b in a)return!1;return!0}function f(a){return void 0===a}function g(a){return"number"==typeof a||"[object Number]"===Object.prototype.toString.call(a)}function h(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function i(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function j(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function k(a,b){for(var c in b)j(b,c)&&(a[c]=b[c]);return j(b,"toString")&&(a.toString=b.toString),j(b,"valueOf")&&(a.valueOf=b.valueOf),a}function l(a,b,c,d){return sb(a,b,c,d,!0).utc()}function m(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}}function n(a){return null==a._pf&&(a._pf=m()),a._pf}function o(a){if(null==a._isValid){var b=n(a),c=ud.call(b.parsedDateParts,function(a){return null!=a}),d=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c);if(a._strict&&(d=d&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour),null!=Object.isFrozen&&Object.isFrozen(a))return d;a._isValid=d;}return a._isValid}function p(a){var b=l(NaN);return null!=a?k(n(b),a):n(b).userInvalidated=!0,b}function q(a,b){var c,d,e;if(f(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),f(b._i)||(a._i=b._i),f(b._f)||(a._f=b._f),f(b._l)||(a._l=b._l),f(b._strict)||(a._strict=b._strict),f(b._tzm)||(a._tzm=b._tzm),f(b._isUTC)||(a._isUTC=b._isUTC),f(b._offset)||(a._offset=b._offset),f(b._pf)||(a._pf=n(b)),f(b._locale)||(a._locale=b._locale),vd.length>0)for(c=0;c<vd.length;c++)d=vd[c],e=b[d],f(e)||(a[d]=e);return a}function r(b){q(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),wd===!1&&(wd=!0,a.updateOffset(this),wd=!1);}function s(a){return a instanceof r||null!=a&&null!=a._isAMomentObject}function t(a){return a<0?Math.ceil(a)||0:Math.floor(a)}function u(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=t(b)),c}function v(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;d<e;d++)(c&&a[d]!==b[d]||!c&&u(a[d])!==u(b[d]))&&g++;return g+f}function w(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b);}function x(b,c){var d=!0;return k(function(){if(null!=a.deprecationHandler&&a.deprecationHandler(null,b),d){for(var e,f=[],g=0;g<arguments.length;g++){if(e="","object"==typeof arguments[g]){e+="\n["+g+"] ";for(var h in arguments[0])e+=h+": "+arguments[0][h]+", ";e=e.slice(0,-2);}else e=arguments[g];f.push(e);}w(b+"\nArguments: "+Array.prototype.slice.call(f).join("")+"\n"+(new Error).stack),d=!1;}return c.apply(this,arguments)},c)}function y(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),xd[b]||(w(c),xd[b]=!0);}function z(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function A(a){var b,c;for(c in a)b=a[c],z(b)?this[c]=b:this["_"+c]=b;this._config=a,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source);}function B(a,b){var c,e=k({},a);for(c in b)j(b,c)&&(d(a[c])&&d(b[c])?(e[c]={},k(e[c],a[c]),k(e[c],b[c])):null!=b[c]?e[c]=b[c]:delete e[c]);for(c in a)j(a,c)&&!j(b,c)&&d(a[c])&&(e[c]=k({},e[c]));return e}function C(a){null!=a&&this.set(a);}function D(a,b,c){var d=this._calendar[a]||this._calendar.sameElse;return z(d)?d.call(b,c):d}function E(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function F(){return this._invalidDate}function G(a){return this._ordinal.replace("%d",a)}function H(a,b,c,d){var e=this._relativeTime[c];return z(e)?e(a,b,c,d):e.replace(/%d/i,a)}function I(a,b){var c=this._relativeTime[a>0?"future":"past"];return z(c)?c(b):c.replace(/%s/i,b)}function J(a,b){var c=a.toLowerCase();Hd[c]=Hd[c+"s"]=Hd[b]=a;}function K(a){return"string"==typeof a?Hd[a]||Hd[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)j(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(a,b){Id[a]=b;}function N(a){var b=[];for(var c in a)b.push({unit:c,priority:Id[c]});return b.sort(function(a,b){return a.priority-b.priority}),b}function O(b,c){return function(d){return null!=d?(Q(this,b,d),a.updateOffset(this,c),this):P(this,b)}}function P(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function Q(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c);}function R(a){return a=K(a),z(this[a])?this[a]():this}function S(a,b){if("object"==typeof a){a=L(a);for(var c=N(a),d=0;d<c.length;d++)this[c[d].unit](a[c[d].unit]);}else if(a=K(a),z(this[a]))return this[a](b);return this}function T(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function U(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Md[a]=e),b&&(Md[b[0]]=function(){return T(e.apply(this,arguments),b[1],b[2])}),c&&(Md[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)});}function V(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function W(a){var b,c,d=a.match(Jd);for(b=0,c=d.length;b<c;b++)Md[d[b]]?d[b]=Md[d[b]]:d[b]=V(d[b]);return function(b){var e,f="";for(e=0;e<c;e++)f+=z(d[e])?d[e].call(b,a):d[e];return f}}function X(a,b){return a.isValid()?(b=Y(b,a.localeData()),Ld[b]=Ld[b]||W(b),Ld[b](a)):a.localeData().invalidDate()}function Y(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Kd.lastIndex=0;d>=0&&Kd.test(a);)a=a.replace(Kd,c),Kd.lastIndex=0,d-=1;return a}function Z(a,b,c){ce[a]=z(b)?b:function(a,d){return a&&c?c:b};}function $(a,b){return j(ce,a)?ce[a](b._strict,b._locale):new RegExp(_(a))}function _(a){return aa(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function aa(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function ba(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),g(b)&&(d=function(a,c){c[b]=u(a);}),c=0;c<a.length;c++)de[a[c]]=d;}function ca(a,b){ba(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e);});}function da(a,b,c){null!=b&&j(de,a)&&de[a](b,c._a,c,a);}function ea(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function fa(a,b){return a?c(this._months)?this._months[a.month()]:this._months[(this._months.isFormat||oe).test(b)?"format":"standalone"][a.month()]:c(this._months)?this._months:this._months.standalone}function ga(a,b){return a?c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[oe.test(b)?"format":"standalone"][a.month()]:c(this._monthsShort)?this._monthsShort:this._monthsShort.standalone}function ha(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;d<12;++d)f=l([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=ne.call(this._shortMonthsParse,g),e!==-1?e:null):(e=ne.call(this._longMonthsParse,g),e!==-1?e:null):"MMM"===b?(e=ne.call(this._shortMonthsParse,g),e!==-1?e:(e=ne.call(this._longMonthsParse,g),e!==-1?e:null)):(e=ne.call(this._longMonthsParse,g),e!==-1?e:(e=ne.call(this._shortMonthsParse,g),e!==-1?e:null))}function ia(a,b,c){var d,e,f;if(this._monthsParseExact)return ha.call(this,a,b,c);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;d<12;d++){if(e=l([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function ja(a,b){var c;if(!a.isValid())return a;if("string"==typeof b)if(/^\d+$/.test(b))b=u(b);else if(b=a.localeData().monthsParse(b),!g(b))return a;return c=Math.min(a.date(),ea(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ka(b){return null!=b?(ja(this,b),a.updateOffset(this,!0),this):P(this,"Month")}function la(){return ea(this.year(),this.month())}function ma(a){return this._monthsParseExact?(j(this,"_monthsRegex")||oa.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):(j(this,"_monthsShortRegex")||(this._monthsShortRegex=re),this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex)}function na(a){return this._monthsParseExact?(j(this,"_monthsRegex")||oa.call(this),a?this._monthsStrictRegex:this._monthsRegex):(j(this,"_monthsRegex")||(this._monthsRegex=se),this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex)}function oa(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;b<12;b++)c=l([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;b<12;b++)d[b]=aa(d[b]),e[b]=aa(e[b]);for(b=0;b<24;b++)f[b]=aa(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i");}function pa(a){return qa(a)?366:365}function qa(a){return a%4===0&&a%100!==0||a%400===0}function ra(){return qa(this.year())}function sa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return a<100&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function ta(a){var b=new Date(Date.UTC.apply(null,arguments));return a<100&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function ua(a,b,c){var d=7+b-c,e=(7+ta(a,0,d).getUTCDay()-b)%7;return-e+d-1}function va(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ua(a,d,e),j=1+7*(b-1)+h+i;return j<=0?(f=a-1,g=pa(f)+j):j>pa(a)?(f=a+1,g=j-pa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function wa(a,b,c){var d,e,f=ua(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return g<1?(e=a.year()-1,d=g+xa(e,b,c)):g>xa(a.year(),b,c)?(d=g-xa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function xa(a,b,c){var d=ua(a,b,c),e=ua(a+1,b,c);return(pa(a)-d+e)/7}function ya(a){return wa(a,this._week.dow,this._week.doy).week}function za(){return this._week.dow}function Aa(){return this._week.doy}function Ba(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function Ca(a){var b=wa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function Da(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Ea(a,b){return"string"==typeof a?b.weekdaysParse(a)%7||7:isNaN(a)?null:a}function Fa(a,b){return a?c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]:c(this._weekdays)?this._weekdays:this._weekdays.standalone}function Ga(a){return a?this._weekdaysShort[a.day()]:this._weekdaysShort}function Ha(a){return a?this._weekdaysMin[a.day()]:this._weekdaysMin}function Ia(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;d<7;++d)f=l([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=ne.call(this._weekdaysParse,g),e!==-1?e:null):"ddd"===b?(e=ne.call(this._shortWeekdaysParse,g),e!==-1?e:null):(e=ne.call(this._minWeekdaysParse,g),e!==-1?e:null):"dddd"===b?(e=ne.call(this._weekdaysParse,g),e!==-1?e:(e=ne.call(this._shortWeekdaysParse,g),e!==-1?e:(e=ne.call(this._minWeekdaysParse,g),e!==-1?e:null))):"ddd"===b?(e=ne.call(this._shortWeekdaysParse,g),e!==-1?e:(e=ne.call(this._weekdaysParse,g),e!==-1?e:(e=ne.call(this._minWeekdaysParse,g),e!==-1?e:null))):(e=ne.call(this._minWeekdaysParse,g),e!==-1?e:(e=ne.call(this._weekdaysParse,g),e!==-1?e:(e=ne.call(this._shortWeekdaysParse,g),e!==-1?e:null)))}function Ja(a,b,c){var d,e,f;if(this._weekdaysParseExact)return Ia.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;d<7;d++){if(e=l([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function Ka(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Da(a,this.localeData()),this.add(a-b,"d")):b}function La(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Ma(a){if(!this.isValid())return null!=a?this:NaN;if(null!=a){var b=Ea(a,this.localeData());return this.day(this.day()%7?b:b-7)}return this.day()||7}function Na(a){return this._weekdaysParseExact?(j(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):(j(this,"_weekdaysRegex")||(this._weekdaysRegex=ye),this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex)}function Oa(a){return this._weekdaysParseExact?(j(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(j(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=ze),this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)}function Pa(a){return this._weekdaysParseExact?(j(this,"_weekdaysRegex")||Qa.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(j(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Ae),this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)}function Qa(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],h=[],i=[],j=[];for(b=0;b<7;b++)c=l([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),h.push(e),i.push(f),j.push(d),j.push(e),j.push(f);for(g.sort(a),h.sort(a),i.sort(a),j.sort(a),b=0;b<7;b++)h[b]=aa(h[b]),i[b]=aa(i[b]),j[b]=aa(j[b]);this._weekdaysRegex=new RegExp("^("+j.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+h.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i");}function Ra(){return this.hours()%12||12}function Sa(){return this.hours()||24}function Ta(a,b){U(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)});}function Ua(a,b){return b._meridiemParse}function Va(a){return"p"===(a+"").toLowerCase().charAt(0)}function Wa(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function Xa(a){return a?a.toLowerCase().replace("_","-"):a}function Ya(a){for(var b,c,d,e,f=0;f<a.length;){for(e=Xa(a[f]).split("-"),b=e.length,c=Xa(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=Za(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&v(e,c,!0)>=b-1)break;b--;}f++;}return null}function Za(a){var b=null;if(!Fe[a]&&"undefined"!='object'&&module&&module.exports)try{b=Be._abbr,commonjsRequire("./locale/"+a),$a(b);}catch(a){}return Fe[a]}function $a(a,b){var c;return a&&(c=f(b)?bb(a):_a(a,b),c&&(Be=c)),Be._abbr}function _a(a,b){if(null!==b){var c=Ee;if(b.abbr=a,null!=Fe[a])y("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),c=Fe[a]._config;else if(null!=b.parentLocale){if(null==Fe[b.parentLocale])return Ge[b.parentLocale]||(Ge[b.parentLocale]=[]),Ge[b.parentLocale].push({name:a,config:b}),null;c=Fe[b.parentLocale]._config;}return Fe[a]=new C(B(c,b)),Ge[a]&&Ge[a].forEach(function(a){_a(a.name,a.config);}),$a(a),Fe[a]}return delete Fe[a],null}function ab(a,b){if(null!=b){var c,d=Ee;null!=Fe[a]&&(d=Fe[a]._config),b=B(d,b),c=new C(b),c.parentLocale=Fe[a],Fe[a]=c,$a(a);}else null!=Fe[a]&&(null!=Fe[a].parentLocale?Fe[a]=Fe[a].parentLocale:null!=Fe[a]&&delete Fe[a]);return Fe[a]}function bb(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Be;if(!c(a)){if(b=Za(a))return b;a=[a];}return Ya(a)}function cb(){return Ad(Fe)}function db(a){var b,c=a._a;return c&&n(a).overflow===-2&&(b=c[fe]<0||c[fe]>11?fe:c[ge]<1||c[ge]>ea(c[ee],c[fe])?ge:c[he]<0||c[he]>24||24===c[he]&&(0!==c[ie]||0!==c[je]||0!==c[ke])?he:c[ie]<0||c[ie]>59?ie:c[je]<0||c[je]>59?je:c[ke]<0||c[ke]>999?ke:-1,n(a)._overflowDayOfYear&&(b<ee||b>ge)&&(b=ge),n(a)._overflowWeeks&&b===-1&&(b=le),n(a)._overflowWeekday&&b===-1&&(b=me),n(a).overflow=b),a}function eb(a){var b,c,d,e,f,g,h=a._i,i=He.exec(h)||Ie.exec(h);if(i){for(n(a).iso=!0,b=0,c=Ke.length;b<c;b++)if(Ke[b][1].exec(i[1])){e=Ke[b][0],d=Ke[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=Le.length;b<c;b++)if(Le[b][1].exec(i[3])){f=(i[2]||" ")+Le[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Je.exec(i[4]))return void(a._isValid=!1);g="Z";}a._f=e+(f||"")+(g||""),lb(a);}else a._isValid=!1;}function fb(a){var b,c,d,e,f,g,h,i,j={" GMT":" +0000"," EDT":" -0400"," EST":" -0500"," CDT":" -0500"," CST":" -0600"," MDT":" -0600"," MST":" -0700"," PDT":" -0700"," PST":" -0800"},k="YXWVUTSRQPONZABCDEFGHIKLM";if(b=a._i.replace(/\([^\)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s|\s$/g,""),c=Ne.exec(b)){if(d=c[1]?"ddd"+(5===c[1].length?", ":" "):"",e="D MMM "+(c[2].length>10?"YYYY ":"YY "),f="HH:mm"+(c[4]?":ss":""),c[1]){var l=new Date(c[2]),m=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][l.getDay()];if(c[1].substr(0,3)!==m)return n(a).weekdayMismatch=!0,void(a._isValid=!1)}switch(c[5].length){case 2:0===i?h=" +0000":(i=k.indexOf(c[5][1].toUpperCase())-12,h=(i<0?" -":" +")+(""+i).replace(/^-?/,"0").match(/..$/)[0]+"00");break;case 4:h=j[c[5]];break;default:h=j[" GMT"];}c[5]=h,a._i=c.splice(1).join(""),g=" ZZ",a._f=d+e+f+g,lb(a),n(a).rfc2822=!0;}else a._isValid=!1;}function gb(b){var c=Me.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(eb(b),void(b._isValid===!1&&(delete b._isValid,fb(b),b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b)))))}function hb(a,b,c){return null!=a?a:null!=b?b:c}function ib(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function jb(a){var b,c,d,e,f=[];if(!a._d){for(d=ib(a),a._w&&null==a._a[ge]&&null==a._a[fe]&&kb(a),null!=a._dayOfYear&&(e=hb(a._a[ee],d[ee]),(a._dayOfYear>pa(e)||0===a._dayOfYear)&&(n(a)._overflowDayOfYear=!0),c=ta(e,0,a._dayOfYear),a._a[fe]=c.getUTCMonth(),a._a[ge]=c.getUTCDate()),b=0;b<3&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;b<7;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[he]&&0===a._a[ie]&&0===a._a[je]&&0===a._a[ke]&&(a._nextDay=!0,a._a[he]=0),a._d=(a._useUTC?ta:sa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[he]=24);}}function kb(a){var b,c,d,e,f,g,h,i;if(b=a._w,null!=b.GG||null!=b.W||null!=b.E)f=1,g=4,c=hb(b.GG,a._a[ee],wa(tb(),1,4).year),d=hb(b.W,1),e=hb(b.E,1),(e<1||e>7)&&(i=!0);else{f=a._locale._week.dow,g=a._locale._week.doy;var j=wa(tb(),f,g);c=hb(b.gg,a._a[ee],j.year),d=hb(b.w,j.week),null!=b.d?(e=b.d,(e<0||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f;}d<1||d>xa(c,f,g)?n(a)._overflowWeeks=!0:null!=i?n(a)._overflowWeekday=!0:(h=va(c,d,e,f,g),a._a[ee]=h.year,a._dayOfYear=h.dayOfYear);}function lb(b){if(b._f===a.ISO_8601)return void eb(b);if(b._f===a.RFC_2822)return void fb(b);b._a=[],n(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,j=0;for(e=Y(b._f,b._locale).match(Jd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match($(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&n(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),j+=d.length),Md[f]?(d?n(b).empty=!1:n(b).unusedTokens.push(f),da(f,d,b)):b._strict&&!d&&n(b).unusedTokens.push(f);n(b).charsLeftOver=i-j,h.length>0&&n(b).unusedInput.push(h),b._a[he]<=12&&n(b).bigHour===!0&&b._a[he]>0&&(n(b).bigHour=void 0),n(b).parsedDateParts=b._a.slice(0),n(b).meridiem=b._meridiem,b._a[he]=mb(b._locale,b._a[he],b._meridiem),jb(b),db(b);}function mb(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&b<12&&(b+=12),d||12!==b||(b=0),b):b}function nb(a){var b,c,d,e,f;if(0===a._f.length)return n(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=q({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],lb(b),o(b)&&(f+=n(b).charsLeftOver,f+=10*n(b).unusedTokens.length,n(b).score=f,(null==d||f<d)&&(d=f,c=b));k(a,c||b);}function ob(a){if(!a._d){var b=L(a._i);a._a=i([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),jb(a);}}function pb(a){var b=new r(db(qb(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function qb(a){var b=a._i,d=a._f;return a._locale=a._locale||bb(a._l),null===b||void 0===d&&""===b?p({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),s(b)?new r(db(b)):(h(b)?a._d=b:c(d)?nb(a):d?lb(a):rb(a),o(a)||(a._d=null),a))}function rb(b){var e=b._i;f(e)?b._d=new Date(a.now()):h(e)?b._d=new Date(e.valueOf()):"string"==typeof e?gb(b):c(e)?(b._a=i(e.slice(0),function(a){return parseInt(a,10)}),jb(b)):d(e)?ob(b):g(e)?b._d=new Date(e):a.createFromInputFallback(b);}function sb(a,b,f,g,h){var i={};return f!==!0&&f!==!1||(g=f,f=void 0),(d(a)&&e(a)||c(a)&&0===a.length)&&(a=void 0),i._isAMomentObject=!0,i._useUTC=i._isUTC=h,i._l=f,i._i=a,i._f=b,i._strict=g,pb(i)}function tb(a,b,c,d){return sb(a,b,c,d,!1)}function ub(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return tb();for(d=b[0],e=1;e<b.length;++e)b[e].isValid()&&!b[e][a](d)||(d=b[e]);return d}function vb(){var a=[].slice.call(arguments,0);return ub("isBefore",a)}function wb(){var a=[].slice.call(arguments,0);return ub("isAfter",a)}function xb(a){for(var b in a)if(Re.indexOf(b)===-1||null!=a[b]&&isNaN(a[b]))return!1;for(var c=!1,d=0;d<Re.length;++d)if(a[Re[d]]){if(c)return!1;parseFloat(a[Re[d]])!==u(a[Re[d]])&&(c=!0);}return!0}function yb(){return this._isValid}function zb(){return Sb(NaN)}function Ab(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._isValid=xb(b),this._milliseconds=+k+1e3*j+6e4*i+1e3*h*60*60,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=bb(),this._bubble();}function Bb(a){return a instanceof Ab}function Cb(a){return a<0?Math.round(-1*a)*-1:Math.round(a)}function Db(a,b){U(a,0,0,function(){var a=this.utcOffset(),c="+";return a<0&&(a=-a,c="-"),c+T(~~(a/60),2)+b+T(~~a%60,2)});}function Eb(a,b){var c=(b||"").match(a);if(null===c)return null;var d=c[c.length-1]||[],e=(d+"").match(Se)||["-",0,0],f=+(60*e[1])+u(e[2]);return 0===f?0:"+"===e[0]?f:-f}function Fb(b,c){var d,e;return c._isUTC?(d=c.clone(),e=(s(b)||h(b)?b.valueOf():tb(b).valueOf())-d.valueOf(),d._d.setTime(d._d.valueOf()+e),a.updateOffset(d,!1),d):tb(b).local()}function Gb(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Hb(b,c,d){var e,f=this._offset||0;if(!this.isValid())return null!=b?this:NaN;if(null!=b){if("string"==typeof b){if(b=Eb(_d,b),null===b)return this}else Math.abs(b)<16&&!d&&(b=60*b);return!this._isUTC&&c&&(e=Gb(this)),this._offset=b,this._isUTC=!0,null!=e&&this.add(e,"m"),f!==b&&(!c||this._changeInProgress?Xb(this,Sb(b-f,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?f:Gb(this)}function Ib(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Jb(a){return this.utcOffset(0,a)}function Kb(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Gb(this),"m")),this}function Lb(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var a=Eb($d,this._i);null!=a?this.utcOffset(a):this.utcOffset(0,!0);}return this}function Mb(a){return!!this.isValid()&&(a=a?tb(a).utcOffset():0,(this.utcOffset()-a)%60===0)}function Nb(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ob(){if(!f(this._isDSTShifted))return this._isDSTShifted;var a={};if(q(a,this),a=qb(a),a._a){var b=a._isUTC?l(a._a):tb(a._a);this._isDSTShifted=this.isValid()&&v(a._a,b.toArray())>0;}else this._isDSTShifted=!1;return this._isDSTShifted}function Pb(){return!!this.isValid()&&!this._isUTC}function Qb(){return!!this.isValid()&&this._isUTC}function Rb(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function Sb(a,b){var c,d,e,f=a,h=null;return Bb(a)?f={ms:a._milliseconds,d:a._days,M:a._months}:g(a)?(f={},b?f[b]=a:f.milliseconds=a):(h=Te.exec(a))?(c="-"===h[1]?-1:1,f={y:0,d:u(h[ge])*c,h:u(h[he])*c,m:u(h[ie])*c,s:u(h[je])*c,ms:u(Cb(1e3*h[ke]))*c}):(h=Ue.exec(a))?(c="-"===h[1]?-1:1,f={y:Tb(h[2],c),M:Tb(h[3],c),w:Tb(h[4],c),d:Tb(h[5],c),h:Tb(h[6],c),m:Tb(h[7],c),s:Tb(h[8],c)}):null==f?f={}:"object"==typeof f&&("from"in f||"to"in f)&&(e=Vb(tb(f.from),tb(f.to)),f={},f.ms=e.milliseconds,f.M=e.months),d=new Ab(f),Bb(a)&&j(a,"_locale")&&(d._locale=a._locale),d}function Tb(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function Ub(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Vb(a,b){var c;return a.isValid()&&b.isValid()?(b=Fb(b,a),a.isBefore(b)?c=Ub(a,b):(c=Ub(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function Wb(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(y(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Sb(c,d),Xb(this,e,a),this}}function Xb(b,c,d,e){var f=c._milliseconds,g=Cb(c._days),h=Cb(c._months);b.isValid()&&(e=null==e||e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&Q(b,"Date",P(b,"Date")+g*d),h&&ja(b,P(b,"Month")+h*d),e&&a.updateOffset(b,g||h));}function Yb(a,b){var c=a.diff(b,"days",!0);return c<-6?"sameElse":c<-1?"lastWeek":c<0?"lastDay":c<1?"sameDay":c<2?"nextDay":c<7?"nextWeek":"sameElse"}function Zb(b,c){var d=b||tb(),e=Fb(d,this).startOf("day"),f=a.calendarFormat(this,e)||"sameElse",g=c&&(z(c[f])?c[f].call(this,d):c[f]);return this.format(g||this.localeData().calendar(f,this,tb(d)))}function $b(){return new r(this)}function _b(a,b){var c=s(a)?a:tb(a);return!(!this.isValid()||!c.isValid())&&(b=K(f(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf())}function ac(a,b){var c=s(a)?a:tb(a);return!(!this.isValid()||!c.isValid())&&(b=K(f(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf())}function bc(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function cc(a,b){var c,d=s(a)?a:tb(a);return!(!this.isValid()||!d.isValid())&&(b=K(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf()))}function dc(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function ec(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function fc(a,b,c){var d,e,f,g;return this.isValid()?(d=Fb(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=gc(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:t(g)):NaN):NaN}function gc(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return b-f<0?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function hc(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ic(){if(!this.isValid())return null;var a=this.clone().utc();return a.year()<0||a.year()>9999?X(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):z(Date.prototype.toISOString)?this.toDate().toISOString():X(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function jc(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var a="moment",b="";this.isLocal()||(a=0===this.utcOffset()?"moment.utc":"moment.parseZone",b="Z");var c="["+a+'("]',d=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",e="-MM-DD[T]HH:mm:ss.SSS",f=b+'[")]';return this.format(c+d+e+f)}function kc(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=X(this,b);return this.localeData().postformat(c)}function lc(a,b){return this.isValid()&&(s(a)&&a.isValid()||tb(a).isValid())?Sb({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function mc(a){return this.from(tb(),a)}function nc(a,b){return this.isValid()&&(s(a)&&a.isValid()||tb(a).isValid())?Sb({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function oc(a){return this.to(tb(),a)}function pc(a){var b;return void 0===a?this._locale._abbr:(b=bb(a),null!=b&&(this._locale=b),this)}function qc(){return this._locale}function rc(a){switch(a=K(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0);}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function sc(a){return a=K(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function tc(){return this._d.valueOf()-6e4*(this._offset||0)}function uc(){return Math.floor(this.valueOf()/1e3)}function vc(){return new Date(this.valueOf())}function wc(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function xc(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function yc(){return this.isValid()?this.toISOString():null}function zc(){return o(this)}function Ac(){
return k({},n(this))}function Bc(){return n(this).overflow}function Cc(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Dc(a,b){U(0,[a,a.length],0,b);}function Ec(a){return Ic.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Fc(a){return Ic.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Gc(){return xa(this.year(),1,4)}function Hc(){var a=this.localeData()._week;return xa(this.year(),a.dow,a.doy)}function Ic(a,b,c,d,e){var f;return null==a?wa(this,d,e).year:(f=xa(a,d,e),b>f&&(b=f),Jc.call(this,a,b,c,d,e))}function Jc(a,b,c,d,e){var f=va(a,b,c,d,e),g=ta(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Kc(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Lc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function Mc(a,b){b[ke]=u(1e3*("0."+a));}function Nc(){return this._isUTC?"UTC":""}function Oc(){return this._isUTC?"Coordinated Universal Time":""}function Pc(a){return tb(1e3*a)}function Qc(){return tb.apply(null,arguments).parseZone()}function Rc(a){return a}function Sc(a,b,c,d){var e=bb(),f=l().set(d,b);return e[c](f,a)}function Tc(a,b,c){if(g(a)&&(b=a,a=void 0),a=a||"",null!=b)return Sc(a,b,c,"month");var d,e=[];for(d=0;d<12;d++)e[d]=Sc(a,d,c,"month");return e}function Uc(a,b,c,d){"boolean"==typeof a?(g(b)&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,g(b)&&(c=b,b=void 0),b=b||"");var e=bb(),f=a?e._week.dow:0;if(null!=c)return Sc(b,(c+f)%7,d,"day");var h,i=[];for(h=0;h<7;h++)i[h]=Sc(b,(h+f)%7,d,"day");return i}function Vc(a,b){return Tc(a,b,"months")}function Wc(a,b){return Tc(a,b,"monthsShort")}function Xc(a,b,c){return Uc(a,b,c,"weekdays")}function Yc(a,b,c){return Uc(a,b,c,"weekdaysShort")}function Zc(a,b,c){return Uc(a,b,c,"weekdaysMin")}function $c(){var a=this._data;return this._milliseconds=df(this._milliseconds),this._days=df(this._days),this._months=df(this._months),a.milliseconds=df(a.milliseconds),a.seconds=df(a.seconds),a.minutes=df(a.minutes),a.hours=df(a.hours),a.months=df(a.months),a.years=df(a.years),this}function _c(a,b,c,d){var e=Sb(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function ad(a,b){return _c(this,a,b,1)}function bd(a,b){return _c(this,a,b,-1)}function cd(a){return a<0?Math.floor(a):Math.ceil(a)}function dd(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||f<=0&&g<=0&&h<=0||(f+=864e5*cd(fd(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=t(f/1e3),i.seconds=a%60,b=t(a/60),i.minutes=b%60,c=t(b/60),i.hours=c%24,g+=t(c/24),e=t(ed(g)),h+=e,g-=cd(fd(e)),d=t(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function ed(a){return 4800*a/146097}function fd(a){return 146097*a/4800}function gd(a){if(!this.isValid())return NaN;var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+ed(b),"month"===a?c:c/12;switch(b=this._days+Math.round(fd(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function hd(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*u(this._months/12):NaN}function id(a){return function(){return this.as(a)}}function jd(a){return a=K(a),this.isValid()?this[a+"s"]():NaN}function kd(a){return function(){return this.isValid()?this._data[a]:NaN}}function ld(){return t(this.days()/7)}function md(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function nd(a,b,c){var d=Sb(a).abs(),e=uf(d.as("s")),f=uf(d.as("m")),g=uf(d.as("h")),h=uf(d.as("d")),i=uf(d.as("M")),j=uf(d.as("y")),k=e<=vf.ss&&["s",e]||e<vf.s&&["ss",e]||f<=1&&["m"]||f<vf.m&&["mm",f]||g<=1&&["h"]||g<vf.h&&["hh",g]||h<=1&&["d"]||h<vf.d&&["dd",h]||i<=1&&["M"]||i<vf.M&&["MM",i]||j<=1&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,md.apply(null,k)}function od(a){return void 0===a?uf:"function"==typeof a&&(uf=a,!0)}function pd(a,b){return void 0!==vf[a]&&(void 0===b?vf[a]:(vf[a]=b,"s"===a&&(vf.ss=b-1),!0))}function qd(a){if(!this.isValid())return this.localeData().invalidDate();var b=this.localeData(),c=nd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function rd(){if(!this.isValid())return this.localeData().invalidDate();var a,b,c,d=wf(this._milliseconds)/1e3,e=wf(this._days),f=wf(this._months);a=t(d/60),b=t(a/60),d%=60,a%=60,c=t(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(m<0?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var sd,td;td=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;d<c;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};var ud=td,vd=a.momentProperties=[],wd=!1,xd={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var yd;yd=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)j(a,b)&&c.push(b);return c};var zd,Ad=yd,Bd={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Cd={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Dd="Invalid date",Ed="%d",Fd=/\d{1,2}/,Gd={future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Hd={},Id={},Jd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Kd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Ld={},Md={},Nd=/\d/,Od=/\d\d/,Pd=/\d{3}/,Qd=/\d{4}/,Rd=/[+-]?\d{6}/,Sd=/\d\d?/,Td=/\d\d\d\d?/,Ud=/\d\d\d\d\d\d?/,Vd=/\d{1,3}/,Wd=/\d{1,4}/,Xd=/[+-]?\d{1,6}/,Yd=/\d+/,Zd=/[+-]?\d+/,$d=/Z|[+-]\d\d:?\d\d/gi,_d=/Z|[+-]\d\d(?::?\d\d)?/gi,ae=/[+-]?\d+(\.\d{1,3})?/,be=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,ce={},de={},ee=0,fe=1,ge=2,he=3,ie=4,je=5,ke=6,le=7,me=8;zd=Array.prototype.indexOf?Array.prototype.indexOf:function(a){var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1};var ne=zd;U("M",["MM",2],"Mo",function(){return this.month()+1}),U("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),U("MMMM",0,0,function(a){return this.localeData().months(this,a)}),J("month","M"),M("month",8),Z("M",Sd),Z("MM",Sd,Od),Z("MMM",function(a,b){return b.monthsShortRegex(a)}),Z("MMMM",function(a,b){return b.monthsRegex(a)}),ba(["M","MM"],function(a,b){b[fe]=u(a)-1;}),ba(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[fe]=e:n(c).invalidMonth=a;});var oe=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,pe="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),qe="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),re=be,se=be;U("Y",0,0,function(){var a=this.year();return a<=9999?""+a:"+"+a}),U(0,["YY",2],0,function(){return this.year()%100}),U(0,["YYYY",4],0,"year"),U(0,["YYYYY",5],0,"year"),U(0,["YYYYYY",6,!0],0,"year"),J("year","y"),M("year",1),Z("Y",Zd),Z("YY",Sd,Od),Z("YYYY",Wd,Qd),Z("YYYYY",Xd,Rd),Z("YYYYYY",Xd,Rd),ba(["YYYYY","YYYYYY"],ee),ba("YYYY",function(b,c){c[ee]=2===b.length?a.parseTwoDigitYear(b):u(b);}),ba("YY",function(b,c){c[ee]=a.parseTwoDigitYear(b);}),ba("Y",function(a,b){b[ee]=parseInt(a,10);}),a.parseTwoDigitYear=function(a){return u(a)+(u(a)>68?1900:2e3)};var te=O("FullYear",!0);U("w",["ww",2],"wo","week"),U("W",["WW",2],"Wo","isoWeek"),J("week","w"),J("isoWeek","W"),M("week",5),M("isoWeek",5),Z("w",Sd),Z("ww",Sd,Od),Z("W",Sd),Z("WW",Sd,Od),ca(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=u(a);});var ue={dow:0,doy:6};U("d",0,"do","day"),U("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),U("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),U("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),U("e",0,0,"weekday"),U("E",0,0,"isoWeekday"),J("day","d"),J("weekday","e"),J("isoWeekday","E"),M("day",11),M("weekday",11),M("isoWeekday",11),Z("d",Sd),Z("e",Sd),Z("E",Sd),Z("dd",function(a,b){return b.weekdaysMinRegex(a)}),Z("ddd",function(a,b){return b.weekdaysShortRegex(a)}),Z("dddd",function(a,b){return b.weekdaysRegex(a)}),ca(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:n(c).invalidWeekday=a;}),ca(["d","e","E"],function(a,b,c,d){b[d]=u(a);});var ve="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),we="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),xe="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),ye=be,ze=be,Ae=be;U("H",["HH",2],0,"hour"),U("h",["hh",2],0,Ra),U("k",["kk",2],0,Sa),U("hmm",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)}),U("hmmss",0,0,function(){return""+Ra.apply(this)+T(this.minutes(),2)+T(this.seconds(),2)}),U("Hmm",0,0,function(){return""+this.hours()+T(this.minutes(),2)}),U("Hmmss",0,0,function(){return""+this.hours()+T(this.minutes(),2)+T(this.seconds(),2)}),Ta("a",!0),Ta("A",!1),J("hour","h"),M("hour",13),Z("a",Ua),Z("A",Ua),Z("H",Sd),Z("h",Sd),Z("k",Sd),Z("HH",Sd,Od),Z("hh",Sd,Od),Z("kk",Sd,Od),Z("hmm",Td),Z("hmmss",Ud),Z("Hmm",Td),Z("Hmmss",Ud),ba(["H","HH"],he),ba(["k","kk"],function(a,b,c){var d=u(a);b[he]=24===d?0:d;}),ba(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a;}),ba(["h","hh"],function(a,b,c){b[he]=u(a),n(c).bigHour=!0;}),ba("hmm",function(a,b,c){var d=a.length-2;b[he]=u(a.substr(0,d)),b[ie]=u(a.substr(d)),n(c).bigHour=!0;}),ba("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[he]=u(a.substr(0,d)),b[ie]=u(a.substr(d,2)),b[je]=u(a.substr(e)),n(c).bigHour=!0;}),ba("Hmm",function(a,b,c){var d=a.length-2;b[he]=u(a.substr(0,d)),b[ie]=u(a.substr(d));}),ba("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[he]=u(a.substr(0,d)),b[ie]=u(a.substr(d,2)),b[je]=u(a.substr(e));});var Be,Ce=/[ap]\.?m?\.?/i,De=O("Hours",!0),Ee={calendar:Bd,longDateFormat:Cd,invalidDate:Dd,ordinal:Ed,dayOfMonthOrdinalParse:Fd,relativeTime:Gd,months:pe,monthsShort:qe,week:ue,weekdays:ve,weekdaysMin:xe,weekdaysShort:we,meridiemParse:Ce},Fe={},Ge={},He=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ie=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Je=/Z|[+-]\d\d(?::?\d\d)?/,Ke=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Le=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Me=/^\/?Date\((\-?\d+)/i,Ne=/^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;a.createFromInputFallback=x("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""));}),a.ISO_8601=function(){},a.RFC_2822=function(){};var Oe=x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=tb.apply(null,arguments);return this.isValid()&&a.isValid()?a<this?this:a:p()}),Pe=x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var a=tb.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:p()}),Qe=function(){return Date.now?Date.now():+new Date},Re=["year","quarter","month","week","day","hour","minute","second","millisecond"];Db("Z",":"),Db("ZZ",""),Z("Z",_d),Z("ZZ",_d),ba(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Eb(_d,a);});var Se=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var Te=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Ue=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;Sb.fn=Ab.prototype,Sb.invalid=zb;var Ve=Wb(1,"add"),We=Wb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Xe=x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});U(0,["gg",2],0,function(){return this.weekYear()%100}),U(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Dc("gggg","weekYear"),Dc("ggggg","weekYear"),Dc("GGGG","isoWeekYear"),Dc("GGGGG","isoWeekYear"),J("weekYear","gg"),J("isoWeekYear","GG"),M("weekYear",1),M("isoWeekYear",1),Z("G",Zd),Z("g",Zd),Z("GG",Sd,Od),Z("gg",Sd,Od),Z("GGGG",Wd,Qd),Z("gggg",Wd,Qd),Z("GGGGG",Xd,Rd),Z("ggggg",Xd,Rd),ca(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=u(a);}),ca(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b);}),U("Q",0,"Qo","quarter"),J("quarter","Q"),M("quarter",7),Z("Q",Nd),ba("Q",function(a,b){b[fe]=3*(u(a)-1);}),U("D",["DD",2],"Do","date"),J("date","D"),M("date",9),Z("D",Sd),Z("DD",Sd,Od),Z("Do",function(a,b){return a?b._dayOfMonthOrdinalParse||b._ordinalParse:b._dayOfMonthOrdinalParseLenient}),ba(["D","DD"],ge),ba("Do",function(a,b){b[ge]=u(a.match(Sd)[0],10);});var Ye=O("Date",!0);U("DDD",["DDDD",3],"DDDo","dayOfYear"),J("dayOfYear","DDD"),M("dayOfYear",4),Z("DDD",Vd),Z("DDDD",Pd),ba(["DDD","DDDD"],function(a,b,c){c._dayOfYear=u(a);}),U("m",["mm",2],0,"minute"),J("minute","m"),M("minute",14),Z("m",Sd),Z("mm",Sd,Od),ba(["m","mm"],ie);var Ze=O("Minutes",!1);U("s",["ss",2],0,"second"),J("second","s"),M("second",15),Z("s",Sd),Z("ss",Sd,Od),ba(["s","ss"],je);var $e=O("Seconds",!1);U("S",0,0,function(){return~~(this.millisecond()/100)}),U(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),U(0,["SSS",3],0,"millisecond"),U(0,["SSSS",4],0,function(){return 10*this.millisecond()}),U(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),U(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),U(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),U(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),U(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),J("millisecond","ms"),M("millisecond",16),Z("S",Vd,Nd),Z("SS",Vd,Od),Z("SSS",Vd,Pd);var _e;for(_e="SSSS";_e.length<=9;_e+="S")Z(_e,Yd);for(_e="S";_e.length<=9;_e+="S")ba(_e,Mc);var af=O("Milliseconds",!1);U("z",0,0,"zoneAbbr"),U("zz",0,0,"zoneName");var bf=r.prototype;bf.add=Ve,bf.calendar=Zb,bf.clone=$b,bf.diff=fc,bf.endOf=sc,bf.format=kc,bf.from=lc,bf.fromNow=mc,bf.to=nc,bf.toNow=oc,bf.get=R,bf.invalidAt=Bc,bf.isAfter=_b,bf.isBefore=ac,bf.isBetween=bc,bf.isSame=cc,bf.isSameOrAfter=dc,bf.isSameOrBefore=ec,bf.isValid=zc,bf.lang=Xe,bf.locale=pc,bf.localeData=qc,bf.max=Pe,bf.min=Oe,bf.parsingFlags=Ac,bf.set=S,bf.startOf=rc,bf.subtract=We,bf.toArray=wc,bf.toObject=xc,bf.toDate=vc,bf.toISOString=ic,bf.inspect=jc,bf.toJSON=yc,bf.toString=hc,bf.unix=uc,bf.valueOf=tc,bf.creationData=Cc,bf.year=te,bf.isLeapYear=ra,bf.weekYear=Ec,bf.isoWeekYear=Fc,bf.quarter=bf.quarters=Kc,bf.month=ka,bf.daysInMonth=la,bf.week=bf.weeks=Ba,bf.isoWeek=bf.isoWeeks=Ca,bf.weeksInYear=Hc,bf.isoWeeksInYear=Gc,bf.date=Ye,bf.day=bf.days=Ka,bf.weekday=La,bf.isoWeekday=Ma,bf.dayOfYear=Lc,bf.hour=bf.hours=De,bf.minute=bf.minutes=Ze,bf.second=bf.seconds=$e,bf.millisecond=bf.milliseconds=af,bf.utcOffset=Hb,bf.utc=Jb,bf.local=Kb,bf.parseZone=Lb,bf.hasAlignedHourOffset=Mb,bf.isDST=Nb,bf.isLocal=Pb,bf.isUtcOffset=Qb,bf.isUtc=Rb,bf.isUTC=Rb,bf.zoneAbbr=Nc,bf.zoneName=Oc,bf.dates=x("dates accessor is deprecated. Use date instead.",Ye),bf.months=x("months accessor is deprecated. Use month instead",ka),bf.years=x("years accessor is deprecated. Use year instead",te),bf.zone=x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",Ib),bf.isDSTShifted=x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",Ob);var cf=C.prototype;cf.calendar=D,cf.longDateFormat=E,cf.invalidDate=F,cf.ordinal=G,cf.preparse=Rc,cf.postformat=Rc,cf.relativeTime=H,cf.pastFuture=I,cf.set=A,cf.months=fa,cf.monthsShort=ga,cf.monthsParse=ia,cf.monthsRegex=na,cf.monthsShortRegex=ma,cf.week=ya,cf.firstDayOfYear=Aa,cf.firstDayOfWeek=za,cf.weekdays=Fa,cf.weekdaysMin=Ha,cf.weekdaysShort=Ga,cf.weekdaysParse=Ja,cf.weekdaysRegex=Na,cf.weekdaysShortRegex=Oa,cf.weekdaysMinRegex=Pa,cf.isPM=Va,cf.meridiem=Wa,$a("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===u(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=x("moment.lang is deprecated. Use moment.locale instead.",$a),a.langData=x("moment.langData is deprecated. Use moment.localeData instead.",bb);var df=Math.abs,ef=id("ms"),ff=id("s"),gf=id("m"),hf=id("h"),jf=id("d"),kf=id("w"),lf=id("M"),mf=id("y"),nf=kd("milliseconds"),of=kd("seconds"),pf=kd("minutes"),qf=kd("hours"),rf=kd("days"),sf=kd("months"),tf=kd("years"),uf=Math.round,vf={ss:44,s:45,m:45,h:22,d:26,M:11},wf=Math.abs,xf=Ab.prototype;return xf.isValid=yb,xf.abs=$c,xf.add=ad,xf.subtract=bd,xf.as=gd,xf.asMilliseconds=ef,xf.asSeconds=ff,xf.asMinutes=gf,xf.asHours=hf,xf.asDays=jf,xf.asWeeks=kf,xf.asMonths=lf,xf.asYears=mf,xf.valueOf=hd,xf._bubble=dd,xf.get=jd,xf.milliseconds=nf,xf.seconds=of,xf.minutes=pf,xf.hours=qf,xf.days=rf,xf.weeks=ld,xf.months=sf,xf.years=tf,xf.humanize=qd,xf.toISOString=rd,xf.toString=rd,xf.toJSON=rd,xf.locale=pc,xf.localeData=qc,xf.toIsoString=x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",rd),xf.lang=Xe,U("X",0,0,"unix"),U("x",0,0,"valueOf"),Z("x",Zd),Z("X",ae),ba("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10));}),ba("x",function(a,b,c){c._d=new Date(u(a));}),a.version="2.18.1",b(tb),a.fn=bf,a.min=vb,a.max=wb,a.now=Qe,a.utc=l,a.unix=Pc,a.months=Vc,a.isDate=h,a.locale=$a,a.invalid=p,a.duration=Sb,a.isMoment=s,a.weekdays=Xc,a.parseZone=Qc,a.localeData=bb,a.isDuration=Bb,a.monthsShort=Wc,a.weekdaysMin=Zc,a.defineLocale=_a,a.updateLocale=ab,a.locales=cb,a.weekdaysShort=Yc,a.normalizeUnits=K,a.relativeTimeRounding=od,a.relativeTimeThreshold=pd,a.calendarFormat=Yb,a.prototype=bf,a});
});



var moment_ = Object.freeze({
	default: moment_min,
	__moduleExports: moment_min
});

const moment = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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

const moment$1 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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

const moment$2 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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

const moment$3 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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

const moment$4 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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

const moment$5 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateIsoFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$5(value).format('YYYY-MM-DD') : '';

const moment$6 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateTimeIsoAmPmFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$6(value).format('YYYY-MM-DD h:mm:ss a') : '';

const moment$7 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateTimeUsAmPmFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$7(value).format('MM/DD/YYYY h:mm:ss a') : '';

const moment$8 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateTimeUsFormatter = (row, cell, value, columnDef, dataContext) => value ? moment$8(value).format('MM/DD/YYYY hh:mm:ss') : '';

const moment$9 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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
    yesNoFormatter: yesNoFormatter
};

const moment$10 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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

const moment$11 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const dateSorter = (value1, value2, sortDirection) => {
    if (!moment$11(value1, moment$11.ISO_8601).isValid() || !moment$11(value2, moment$11.ISO_8601, true).isValid()) {
        return 0;
    }
    const /** @type {?} */ date1 = moment$11(value1);
    const /** @type {?} */ date2 = moment$11(value2);
    const /** @type {?} */ diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};

const moment$12 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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

const moment$13 = moment_min || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class FilterService {
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
     * @param {?} grid SlickGrid Grid object
     * @param {?} options
     * @return {?}
     */
    attachBackendOnFilter(grid, options) {
        this.subscriber = new Slick.Event();
        this.subscriber.subscribe(this.attachBackendOnFilterSubscribe);
        this.addFilterTemplateToHeaderRow();
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
            const /** @type {?} */ serviceOptions = args.grid.getOptions();
            if (!serviceOptions || !serviceOptions.onBackendEventChanged.process || !serviceOptions.onBackendEventChanged.service) {
                throw new Error(`onBackendEventChanged requires at least a "process" function and a "service" defined`);
            }
            if (serviceOptions.onBackendEventChanged.preProcess) {
                serviceOptions.onBackendEventChanged.preProcess();
            }
            const /** @type {?} */ query = yield serviceOptions.onBackendEventChanged.service.onFilterChanged(event, args);
            const /** @type {?} */ responseProcess = yield (serviceOptions.onBackendEventChanged.process(query));
            if (serviceOptions.onBackendEventChanged.postProcess) {
                serviceOptions.onBackendEventChanged.postProcess(responseProcess);
            }
        });
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
            serviceOptions: this._onFilterChangedOptions,
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
                // depending on the DOM Element type, we will watch the correct event
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

class MouseService {
    /**
     * @param {?} grid
     * @return {?}
     */
    attachOnMouseHover(grid) {
        grid.onMouseEnter.subscribe(function (e) {
            const /** @type {?} */ cell = grid.getCellFromEvent(e);
            if (cell && cell.row >= 0) {
                grid.setSelectedRows([cell.row]);
                e.preventDefault();
            }
        });
        grid.onMouseLeave.subscribe(function (e) {
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
    constructor(router$$1) {
        this.router = router$$1;
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
        $(window).on('resize.grid', () => {
            this.resizeGrid(grid, gridOptions);
        });
        // destroy the resizer on route change
        this.router.events.subscribe((event) => {
            this.destroy();
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
     * Destroy function when element is destroyed
     * @return {?}
     */
    destroy() {
        $(window).trigger('resize.grid').off('resize');
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

var __awaiter$1 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SortService {
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} gridOptions Grid Options object
     * @return {?}
     */
    attachBackendOnSort(grid, gridOptions) {
        this.subscriber = grid.onSort;
        this.subscriber.subscribe(this.attachBackendOnSortSubscribe);
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    attachBackendOnSortSubscribe(event, args) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying to attach the "attachBackendOnSortSubscribe(event, args)" function, it seems that "args" is not populated correctly');
            }
            const /** @type {?} */ serviceOptions = args.grid.getOptions();
            if (!serviceOptions || !serviceOptions.onBackendEventChanged.process || !serviceOptions.onBackendEventChanged.service) {
                throw new Error(`onBackendEventChanged requires at least a "process" function and a "service" defined`);
            }
            if (serviceOptions.onBackendEventChanged.preProcess) {
                serviceOptions.onBackendEventChanged.preProcess();
            }
            const /** @type {?} */ query = serviceOptions.onBackendEventChanged.service.onSortChanged(event, args);
            const /** @type {?} */ responseProcess = yield (serviceOptions.onBackendEventChanged.process(query));
            if (serviceOptions.onBackendEventChanged.postProcess) {
                serviceOptions.onBackendEventChanged.postProcess(responseProcess);
            }
        });
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
                    const /** @type {?} */ fieldType = sortColumns[i].sortCol.type || 'string';
                    const /** @type {?} */ value1 = dataRow1[sortField];
                    const /** @type {?} */ value2 = dataRow2[sortField];
                    let /** @type {?} */ result = 0;
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
    }
    /**
     * @return {?}
     */
    destroy() {
        this.subscriber.unsubscribe();
    }
}

const moment$14 = moment_min || moment_;
/**
 * Parse a date passed as a string and return a Date object (if valid)
 * @param {?} inputDateString
 * @param {?} useUtc
 * @return {?} object Date
 */
function parseUtcDate(inputDateString, useUtc) {
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
/**
 * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
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
        default:
            map = OperatorType.equal;
            break;
    }
    return map;
}

"use strict";

//=====================================================
//============================ parce properties to find
//=====================================================

function parceFind(_levelA) {
    
//+++++++++++++++++++++++++++++++++++ work over Array
//++++++++++++++++++++++++++++++++++++++++++++++++++++
     
    let propsA = _levelA.map(function(currentValue, index) {
        
        let itemX = _levelA[index];
        
        if( itemX instanceof Query){
            return itemX.toString();
        } else if ( ! Array.isArray(itemX) && "object" === typeof itemX ) {
            let propsA = Object.keys(itemX);
            if ( 1 !== propsA.length) {
                throw new RangeError("Alias objects should only have one value. was passed: "+JSON.stringify(itemX));
            }
            let propS = propsA[0];
            let item = itemX[propS];
            // contributor: https://github.com/charlierudolph/graphql-query-builder/commit/878328e857e92d140f5ba6f7cfe07837620ec490
            if (Array.isArray(item)) {
              return new Query(propS).find(item)
            }
            return `${propS} : ${item} `;
        } else if ( "string" === typeof itemX ) {
            return itemX;
        } else {
            throw new RangeError("cannot handle Find value of "+itemX);
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
      } else if (Array.isArray(value)) {
        value = value.map(item => {
            return getGraphQLValue(item);
            }).join();
        value = `[${value}]`;
      } else if ("object" === typeof value) {
      /*if (value.toSource)
            value = value.toSource().slice(2,-2);
        else*/
            value = objectToString(value);
            //console.error("No toSource!!",value);
      }
      return value;
}

function objectToString(obj) {
    
  let sourceA = [];
  
  for(let prop in obj){
    if ("function" === typeof obj[prop]) {
      continue;
    }
   // if ("object" === typeof obj[prop]) {
        sourceA.push(`${prop}:${getGraphQLValue(obj[prop])}`);
   // } else {
   //      sourceA.push(`${prop}:${obj[prop]}`);
   // }
  }
  return `{${sourceA.join()}}`;
}




//=====================================================
//========================================= Query Class
//=====================================================

function Query(_fnNameS, _aliasS_OR_Filter){
    
    this.fnNameS = _fnNameS;
    this.headA = [];
    
    this.filter = (filtersO) => {
 
        for(let propS in filtersO){
            if ("function" === typeof filtersO[propS]) {
              continue;
            }
            let val = getGraphQLValue(filtersO[propS]);
            if ("{}" === val) {
              continue;
            }
            this.headA.push( `${propS}:${val}` );
         } 
        return this;
    };
    
    if ("string" === typeof _aliasS_OR_Filter) {
      this.aliasS = _aliasS_OR_Filter;
    } else if ("object" === typeof _aliasS_OR_Filter) {
        this.filter(_aliasS_OR_Filter);
    } else if (undefined === _aliasS_OR_Filter && 2 === arguments.length){
        throw new TypeError("You have passed undefined as Second argument to 'Query'");
    } else if (undefined !== _aliasS_OR_Filter){
        throw new TypeError("Second argument to 'Query' should be an alias name(String) or filter arguments(Object). was passed "+_aliasS_OR_Filter);
    }

    this.setAlias = (_aliasS) =>{
       this.aliasS = _aliasS;
        return this;
    };
    
    this.find = function(findA) { // THIS NEED TO BE A "FUNCTION" to scope 'arguments'
        if( ! findA){
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
    
    toString : function(){
        if (undefined === this.bodyS) {
            throw new ReferenceError("return properties are not defined. use the 'find' function to defined them");
        }
        
        return `${ (this.aliasS) ? (this.aliasS + ":") : "" } ${this.fnNameS } ${ (0 < this.headA.length)?"("+this.headA.join(",")+")":"" }  { ${ this.bodyS } }`;
    }
};

var graphqlQueryBuilder = Query;

let timer;
class GraphqlService {
    constructor() {
        this.serviceOptions = {};
        this.defaultOrderBy = { field: 'id', direction: SortDirection.ASC };
    }
    /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @param {?=} serviceOptions GraphqlServiceOption
     * @return {?}
     */
    buildQuery(serviceOptions) {
        if (!this.serviceOptions.datasetName || !this.serviceOptions.dataFilters) {
            throw new Error('GraphQL Service requires "datasetName" & "dataFilters" properties for it to work');
        }
        const /** @type {?} */ queryQb = new graphqlQueryBuilder('query');
        const /** @type {?} */ datasetQb = new graphqlQueryBuilder(this.serviceOptions.datasetName);
        const /** @type {?} */ pageInfoQb = new graphqlQueryBuilder('pageInfo');
        const /** @type {?} */ dataQb = (this.serviceOptions.isWithCursor) ? new graphqlQueryBuilder('edges') : new graphqlQueryBuilder('nodes');
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
        const /** @type {?} */ datasetFilters = this.serviceOptions.paginationOptions;
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
        const /** @type {?} */ enumSearchProperties = ['direction:', 'field:', 'operator:'];
        return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties);
    }
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    buildPaginationQuery(serviceOptions) {
    }
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    buildSortingQuery(serviceOptions) {
    }
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    initOptions(serviceOptions) {
        this.serviceOptions = serviceOptions || {};
    }
    /**
     * @param {?} fieldName
     * @return {?}
     */
    removeColumnFilter(fieldName) {
    }
    /**
     * @return {?}
     */
    resetPaginationOptions() {
        let /** @type {?} */ paginationOptions;
        if (this.serviceOptions.isWithCursor) {
            // first, last, after, before
            paginationOptions = {
                after: '',
                before: undefined,
                last: undefined
            };
        }
        else {
            // first, last, offset
            paginationOptions = {
                offset: 0
            };
        }
        this.updateOptions({ paginationOptions: paginationOptions });
    }
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    updateOptions(serviceOptions) {
        this.serviceOptions = Object.assign({}, this.serviceOptions, serviceOptions);
    }
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} terms
     * @return {?}
     */
    saveColumnFilter(fieldName, value, terms) {
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    filterChanged(event, args) {
        console.log(event, args);
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    sorterChanged(event, args) {
        console.log(event, args);
        return 'this is the query';
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onFilterChanged(event, args) {
        let /** @type {?} */ searchByArray = [];
        const /** @type {?} */ serviceOptions = args.grid.getOptions();
        let /** @type {?} */ debounceTypingDelay = 0;
        if (event.type === 'keyup' || event.type === 'keydown') {
            debounceTypingDelay = serviceOptions.onBackendEventChanged.filterTypingDebounce || 700;
        }
        const /** @type {?} */ promise = new Promise((resolve, reject) => {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
            }
            // loop through all columns to inspect filters
            for (const /** @type {?} */ columnId in args.columnFilters) {
                if (args.columnFilters.hasOwnProperty(columnId)) {
                    const /** @type {?} */ columnFilter = args.columnFilters[columnId];
                    const /** @type {?} */ columnDef = columnFilter.columnDef;
                    const /** @type {?} */ fieldName = columnDef.field || columnDef.name;
                    let /** @type {?} */ fieldSearchValue = columnFilter.searchTerm;
                    if (typeof fieldSearchValue === 'undefined') {
                        fieldSearchValue = '';
                    }
                    if (typeof fieldSearchValue !== 'string') {
                        throw new Error(`GraphQL filter term property must be provided type "string", if you use filter with options then make sure your ids are also string. For example: filter: {type: FormElementType.select, selectOptions: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
                    }
                    fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                    const /** @type {?} */ matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                    let /** @type {?} */ operator = columnFilter.operator || ((matches) ? matches[1] : '');
                    let /** @type {?} */ searchValue = (!!matches) ? matches[2] : '';
                    const /** @type {?} */ lastValueChar = (!!matches) ? matches[3] : '';
                    // no need to query if search value is empty
                    if (fieldName && searchValue === '') {
                        this.removeColumnFilter(fieldName);
                        continue;
                    }
                    // escaping the search value
                    searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
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
            this.updateOptions({ filteringOptions: searchByArray });
            // reset Pagination, then build the GraphQL query which we will use in the WebAPI callback
            // wait a minimum user typing inactivity before processing any query
            clearTimeout(timer);
            timer = setTimeout(() => {
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
        let /** @type {?} */ paginationOptions;
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
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onSortChanged(event, args) {
        let /** @type {?} */ sortByArray = [];
        const /** @type {?} */ sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // build the orderBy array, it could be multisort, example
        // orderBy:[{sort: lastName, direction: ASC}, {sort: firstName, direction: DESC}]
        if (sortColumns && sortColumns.length === 0) {
            sortByArray = new Array(this.defaultOrderBy); // when empty, use the default sort
        }
        else {
            if (sortColumns) {
                for (const /** @type {?} */ column of sortColumns) {
                    const /** @type {?} */ fieldName = column.sortCol.field || column.sortCol.id;
                    const /** @type {?} */ direction = column.sortAsc ? SortDirection.ASC : SortDirection.DESC;
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
    }
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
    trimDoubleQuotesOnEnumField(inputStr, enumSearchWords) {
        const /** @type {?} */ patternWordInQuotes = `\s?(".*?")`;
        let /** @type {?} */ patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
        patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
        // example with (sort: & direction:):  /sort:s?(".*?")|direction:s?(".*?")/
        const /** @type {?} */ reg = new RegExp(patternRegex, 'g');
        return inputStr.replace(reg, function (group1, group2, group3) {
            const /** @type {?} */ rep = group1.replace(/"/g, '');
            return rep;
        });
    }
}

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

let timer$1;
class GridOdataService {
    /**
     * @param {?} odataService
     */
    constructor(odataService) {
        this.odataService = odataService;
        this.serviceOptions = {};
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
     * @param {?=} options
     * @return {?}
     */
    updateOptions(options) {
        this.serviceOptions = Object.assign({}, this.serviceOptions, options);
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
        const /** @type {?} */ searchByArray = [];
        const /** @type {?} */ serviceOptions = args.grid.getOptions();
        let /** @type {?} */ debounceTypingDelay = 0;
        if (event.type === 'keyup' || event.type === 'keydown') {
            debounceTypingDelay = serviceOptions.onBackendEventChanged.filterTypingDebounce || 700;
        }
        const /** @type {?} */ promise = new Promise((resolve, reject) => {
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
                    let /** @type {?} */ searchValue = (!!matches) ? matches[2] : '';
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
                            const /** @type {?} */ dateFormatted = parseUtcDate(searchValue, true);
                            if (dateFormatted) {
                                searchBy = `${fieldNameTitleCase} ${this.mapOdataOperator(operator)} DateTime'${dateFormatted}'`;
                            }
                        }
                        else if (fieldType === FieldType.string) {
                            // string field needs to be in single quotes
                            searchBy = `substringof('${searchValue}', ${fieldNameTitleCase})`;
                        }
                        else {
                            // any other field type (or undefined type)
                            searchValue = fieldType === FieldType.number ? searchValue : `'${searchValue}'`;
                            searchBy = `${fieldNameTitleCase} ${this.mapOdataOperator(operator)} ${searchValue}`;
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
            // wait a minimum user typing inactivity before processing any query
            clearTimeout(timer$1);
            timer$1 = setTimeout(() => {
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
/**
 * @nocollapse
 */
GridOdataService.ctorParameters = () => [
    { type: OdataService, },
];

var __awaiter$2 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter$2(this, void 0, void 0, function* () {
            this.recalculateFromToIndexes();
            if (this.dataTo > this.totalItems) {
                this.dataTo = this.totalItems;
            }
            if (this._gridPaginationOptions.onBackendEventChanged) {
                const /** @type {?} */ itemsPerPage = this.itemsPerPage;
                if (!this._gridPaginationOptions.onBackendEventChanged.process || !this._gridPaginationOptions.onBackendEventChanged.service) {
                    throw new Error(`onBackendEventChanged requires at least a "process" function and a "service" defined`);
                }
                if (this._gridPaginationOptions.onBackendEventChanged.preProcess) {
                    this._gridPaginationOptions.onBackendEventChanged.preProcess();
                }
                const /** @type {?} */ query = this._gridPaginationOptions.onBackendEventChanged.service.onPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                const /** @type {?} */ responseProcess = yield (this._gridPaginationOptions.onBackendEventChanged.process(query));
                if (this._gridPaginationOptions.onBackendEventChanged.postProcess) {
                    this._gridPaginationOptions.onBackendEventChanged.postProcess(responseProcess);
                }
            }
            else {
                throw new Error('Pagination with a backend service requires "onBackendEventChanged" to be defined in your grid options');
            }
        });
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
            items per page,
            <span class="slick-pagination-count">
            {{dataFrom}}-{{dataTo}} of {{totalItems}} items
            </span>
        </span>
        </div>
  `
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
        const /** @type {?} */ columnpicker = new Slick.Controls.ColumnPicker(this.columnDefinitions, this.grid, this._gridOptions);
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
            (options.onBackendEventChanged) ? this.sortService.attachBackendOnSort(grid, options) : this.sortService.attachLocalOnSort(grid, options, this._dataView);
        }
        // attach external filter (backend) when available or default onSort (dataView)
        if (options.enableFiltering) {
            this.filterService.init(grid, options, this.columnDefinitions, this._columnFilters);
            (options.onBackendEventChanged) ? this.filterService.attachBackendOnFilter(grid, options) : this.filterService.attachLocalOnFilter(this._dataView);
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
AngularSlickgridModule.ctorParameters = () => [];

// Public classes.

/**
 * Generated bundle index. Do not edit.
 */

export { CaseType, FormElementType, FieldType, FilterConditions, FilterTemplates, Formatters, Sorters, FilterService, MouseService, ResizerService, SortService, GraphqlService, GridOdataService, SlickPaginationComponent, AngularSlickgridComponent, AngularSlickgridModule, FilterService as ɵd, MouseService as ɵc, ResizerService as ɵb, SortService as ɵe, OdataService as ɵa };
//# sourceMappingURL=angular-slickgrid.js.map
