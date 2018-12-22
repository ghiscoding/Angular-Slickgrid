/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType, OperatorType } from '../models/index';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';
import * as moment_ from 'moment-mini';
/** @type {?} */
var moment = moment_;
/**
 * Simple function to which will loop and create as demanded the number of white spaces,
 * this will be used in the Excel export
 * @param {?} nbSpaces
 * @return {?}
 */
export function addWhiteSpaces(nbSpaces) {
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
export function htmlEncode(value) {
    // create a in-memory div, set it's inner text(which jQuery automatically encodes)
    // then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}
/**
 * HTML decode using jQuery
 * @param {?} value
 * @return {?}
 */
export function htmlDecode(value) {
    return $('<div/>').html(value).text();
}
/**
 * decode text into html entity
 * @param {?} input
 * @return {?}
 */
export function htmlEntityDecode(input) {
    return input.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
}
/**
 * decode text into html entity
 * @param {?} input
 * @return {?}
 */
export function htmlEntityEncode(input) {
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
export function arraysEqual(a, b, orderMatters) {
    if (orderMatters === void 0) { orderMatters = false; }
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
export function castToPromise(input, fromServiceName) {
    if (fromServiceName === void 0) { fromServiceName = ''; }
    /** @type {?} */
    var promise = input;
    if (input instanceof Promise) {
        // if it's already a Promise then return it
        return input;
    }
    else if (input instanceof Observable) {
        promise = input.pipe(first()).toPromise();
        if (!(promise instanceof Promise)) {
            promise = input.pipe(take(1)).toPromise();
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
export function findOrDefault(array, logic, defaultVal) {
    if (defaultVal === void 0) { defaultVal = {}; }
    return array.find(logic) || defaultVal;
}
/**
 * Take a number (or a string) and display it as a formatted decimal string with defined minimum and maximum decimals
 * @param {?} input
 * @param {?=} minDecimal
 * @param {?=} maxDecimal
 * @return {?}
 */
export function decimalFormatted(input, minDecimal, maxDecimal) {
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
export function getDescendantProperty(obj, path) {
    return path.split('.').reduce(function (acc, part) { return acc && acc[part]; }, obj);
}
/**
 * Get the browser's scrollbar width, this is different to each browser
 * @return {?}
 */
export function getScrollBarWidth() {
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
export function mapMomentDateFormatWithFieldType(fieldType) {
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
export function mapFlatpickrDateFormatWithFieldType(fieldType) {
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
export function mapOperatorType(operator) {
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
export function mapOperatorByFieldType(fieldType) {
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
export function parseUtcDate(inputDateString, useUtc) {
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
export function sanitizeHtmlToText(htmlString) {
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
export function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Converts a string to camel case
 * @param {?} str the string to convert
 * @return {?} the string in camel case
 */
export function toCamelCase(str) {
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
export function toKebabCase(str) {
    return toCamelCase(str).replace(/([A-Z])/g, '-$1').toLowerCase();
}
/**
 * Takes an input array and makes sure the array has unique values by removing duplicates
 * @param {?} arr
 * @return {?} array output without duplicates
 */
export function uniqueArray(arr) {
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
export function unsubscribeAllObservables(subscriptions) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy91dGlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk3QyxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQzs7SUFDakMsTUFBTSxHQUFHLE9BQU87Ozs7Ozs7QUFTdEIsTUFBTSxVQUFVLGNBQWMsQ0FBQyxRQUFROztRQUNqQyxNQUFNLEdBQUcsRUFBRTtJQUVmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsTUFBTSxJQUFJLEdBQUcsQ0FBQztLQUNmO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7Ozs7O0FBR0QsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUFLO0lBQzlCLGtGQUFrRjtJQUNsRiw4RUFBOEU7SUFDOUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3hDLENBQUM7Ozs7OztBQUdELE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBSztJQUM5QixPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDeEMsQ0FBQzs7Ozs7O0FBTUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQWE7SUFDNUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFD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RSxDQUFDO0FBQ25FLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBVTtJQUNwQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFTLEVBQUUsS0FBYTtRQUN6QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7OztBQU9ELE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxhQUE2QjtJQUNyRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDaEMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQTBCO1lBQy9DLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUU7Z0JBQzVDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM1QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsYUFBYSxHQUFHLEVBQUUsQ0FBQztLQUNwQjtJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZFR5cGUsIE9wZXJhdG9yVHlwZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaXJzdCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcblxyXG5cclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQtbWluaSc7XHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgXCJtb21lbnQgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIgaXNzdWUsIGRvY3VtZW50IGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzY3MFxyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG4vKiogU2ltcGxlIGZ1bmN0aW9uIHRvIHdoaWNoIHdpbGwgbG9vcCBhbmQgY3JlYXRlIGFzIGRlbWFuZGVkIHRoZSBudW1iZXIgb2Ygd2hpdGUgc3BhY2VzLFxyXG4gKiB0aGlzIHdpbGwgYmUgdXNlZCBpbiB0aGUgRXhjZWwgZXhwb3J0XHJcbiAqIEBwYXJhbSBpbnQgbmJTcGFjZXM6IG51bWJlciBvZiB3aGl0ZSBzcGFjZXMgdG8gY3JlYXRlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkV2hpdGVTcGFjZXMobmJTcGFjZXMpOiBzdHJpbmcge1xyXG4gIGxldCByZXN1bHQgPSAnJztcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYlNwYWNlczsgaSsrKSB7XHJcbiAgICByZXN1bHQgKz0gJyAnO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKiogSFRNTCBlbmNvZGUgdXNpbmcgalF1ZXJ5ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBodG1sRW5jb2RlKHZhbHVlKSB7XHJcbiAgLy8gY3JlYXRlIGEgaW4tbWVtb3J5IGRpdiwgc2V0IGl0J3MgaW5uZXIgdGV4dCh3aGljaCBqUXVlcnkgYXV0b21hdGljYWxseSBlbmNvZGVzKVxyXG4gIC8vIHRoZW4gZ3JhYiB0aGUgZW5jb2RlZCBjb250ZW50cyBiYWNrIG91dC4gIFRoZSBkaXYgbmV2ZXIgZXhpc3RzIG9uIHRoZSBwYWdlLlxyXG4gIHJldHVybiAkKCc8ZGl2Lz4nKS50ZXh0KHZhbHVlKS5odG1sKCk7XHJcbn1cclxuXHJcbi8qKiBIVE1MIGRlY29kZSB1c2luZyBqUXVlcnkgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxEZWNvZGUodmFsdWUpIHtcclxuICByZXR1cm4gJCgnPGRpdi8+JykuaHRtbCh2YWx1ZSkudGV4dCgpO1xyXG59XHJcblxyXG4vKiogZGVjb2RlIHRleHQgaW50byBodG1sIGVudGl0eVxyXG4gKiBAcGFyYW0gc3RyaW5nIHRleHQ6IGlucHV0IHRleHRcclxuICogQHBhcmFtIHN0cmluZyB0ZXh0OiBvdXRwdXQgdGV4dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxFbnRpdHlEZWNvZGUoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoLyYjKFxcZCspOy9nLCBmdW5jdGlvbiAobWF0Y2gsIGRlYykge1xyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZGVjKTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqIGRlY29kZSB0ZXh0IGludG8gaHRtbCBlbnRpdHlcclxuICogQHBhcmFtIHN0cmluZyB0ZXh0OiBpbnB1dCB0ZXh0XHJcbiAqIEBwYXJhbSBzdHJpbmcgdGV4dDogb3V0cHV0IHRleHRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBodG1sRW50aXR5RW5jb2RlKGlucHV0OiBhbnkpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGJ1ZiA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSBpbnB1dC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgYnVmLnVuc2hpZnQoWycmIycsIGlucHV0W2ldLmNoYXJDb2RlQXQoKSwgJzsnXS5qb2luKCcnKSk7XHJcbiAgfVxyXG4gIHJldHVybiBidWYuam9pbignJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJlcyB0d28gYXJyYXlzIHRvIGRldGVybWluZSBpZiBhbGwgdGhlIGl0ZW1zIGFyZSBlcXVhbFxyXG4gKiBAcGFyYW0gYSBmaXJzdCBhcnJheVxyXG4gKiBAcGFyYW0gYiBzZWNvbmQgYXJyYXkgdG8gY29tcGFyZSB3aXRoIGFcclxuICogQHBhcmFtIFtvcmRlck1hdHRlcnM9ZmFsc2VdIGZsYWcgaWYgdGhlIG9yZGVyIG1hdHRlcnMsIGlmIG5vdCBhcnJheXMgd2lsbCBiZSBzb3J0ZWRcclxuICogQHJldHVybiBib29sZWFuIHRydWUgaWYgZXF1YWwsIGVsc2UgZmFsc2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcnJheXNFcXVhbChhOiBhbnlbXSwgYjogYW55W10sIG9yZGVyTWF0dGVyczogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XHJcbiAgaWYgKGEgPT09IGIpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFhIHx8ICFiKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoIW9yZGVyTWF0dGVycykge1xyXG4gICAgYS5zb3J0KCk7XHJcbiAgICBiLnNvcnQoKTtcclxuICB9XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xyXG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgY2FzdGluZyBhbiBpbnB1dCBvZiB0eXBlIFByb21pc2UgfCBPYnNlcnZhYmxlIGludG8gYSBQcm9taXNlIHR5cGUuXHJcbiAqIEBwYXJhbSBvYmplY3Qgd2hpY2ggY291bGQgYmUgb2YgdHlwZSBQcm9taXNlIG9yIE9ic2VydmFibGVcclxuICogQHBhcmFtIGZyb21TZXJ2aWNlTmFtZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjYWxsZXIgc2VydmljZSBuYW1lIGFuZCB3aWxsIGJlIHVzZWQgaWYgd2UgdGhyb3cgYSBjYXN0aW5nIHByb2JsZW0gZXJyb3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjYXN0VG9Qcm9taXNlPFQ+KGlucHV0OiBQcm9taXNlPFQ+IHwgT2JzZXJ2YWJsZTxUPiwgZnJvbVNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnJyk6IFByb21pc2U8VD4ge1xyXG4gIGxldCBwcm9taXNlOiBhbnkgPSBpbnB1dDtcclxuXHJcbiAgaWYgKGlucHV0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgLy8gaWYgaXQncyBhbHJlYWR5IGEgUHJvbWlzZSB0aGVuIHJldHVybiBpdFxyXG4gICAgcmV0dXJuIGlucHV0O1xyXG4gIH0gZWxzZSBpZiAoaW5wdXQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XHJcbiAgICBwcm9taXNlID0gaW5wdXQucGlwZShmaXJzdCgpKS50b1Byb21pc2UoKTtcclxuICAgIGlmICghKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xyXG4gICAgICBwcm9taXNlID0gaW5wdXQucGlwZSh0YWtlKDEpKS50b1Byb21pc2UoKTtcclxuICAgIH1cclxuICAgIGlmICghKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYFNvbWV0aGluZyB3ZW50IHdyb25nLCBBbmd1bGFyLVNsaWNrZ3JpZCAke2Zyb21TZXJ2aWNlTmFtZX0gaXMgbm90IGFibGUgdG8gY29udmVydCB0aGUgT2JzZXJ2YWJsZSBpbnRvIGEgUHJvbWlzZS5cclxuICAgICAgICBJZiB5b3UgYXJlIHVzaW5nIEFuZ3VsYXIgSHR0cENsaWVudCwgeW91IGNvdWxkIHRyeSBjb252ZXJ0aW5nIHlvdXIgaHR0cCBjYWxsIHRvIGEgUHJvbWlzZSB3aXRoIFwiLnRvUHJvbWlzZSgpXCJcclxuICAgICAgICBmb3IgZXhhbXBsZTo6ICB0aGlzLmh0dHAucG9zdCgnZ3JhcGhxbCcsIHsgcXVlcnk6IGdyYXBocWxRdWVyeSB9KS50b1Byb21pc2UoKVxyXG4gICAgICAgIGApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHByb21pc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVc2VzIHRoZSBsb2dpYyBmdW5jdGlvbiB0byBmaW5kIGFuIGl0ZW0gaW4gYW4gYXJyYXkgb3IgcmV0dXJucyB0aGUgZGVmYXVsdFxyXG4gKiB2YWx1ZSBwcm92aWRlZCAoZW1wdHkgb2JqZWN0IGJ5IGRlZmF1bHQpXHJcbiAqIEBwYXJhbSBhbnlbXSBhcnJheSB0aGUgYXJyYXkgdG8gZmlsdGVyXHJcbiAqIEBwYXJhbSBmdW5jdGlvbiBsb2dpYyB0aGUgbG9naWMgdG8gZmluZCB0aGUgaXRlbVxyXG4gKiBAcGFyYW0gYW55IFtkZWZhdWx0VmFsPXt9XSB0aGUgZGVmYXVsdCB2YWx1ZSB0byByZXR1cm5cclxuICogQHJldHVybiBvYmplY3QgdGhlIGZvdW5kIG9iamVjdCBvciBkZWZhdWx0IHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmluZE9yRGVmYXVsdChhcnJheTogYW55W10sIGxvZ2ljOiAoaXRlbTogYW55KSA9PiBib29sZWFuLCBkZWZhdWx0VmFsID0ge30pOiBhbnkge1xyXG4gIHJldHVybiBhcnJheS5maW5kKGxvZ2ljKSB8fCBkZWZhdWx0VmFsO1xyXG59XHJcblxyXG4vKipcclxuICAqIFRha2UgYSBudW1iZXIgKG9yIGEgc3RyaW5nKSBhbmQgZGlzcGxheSBpdCBhcyBhIGZvcm1hdHRlZCBkZWNpbWFsIHN0cmluZyB3aXRoIGRlZmluZWQgbWluaW11bSBhbmQgbWF4aW11bSBkZWNpbWFsc1xyXG4gICogQHBhcmFtIGlucHV0XHJcbiAgKiBAcGFyYW0gbWluRGVjaW1hbFxyXG4gICogQHBhcmFtIG1heERlY2ltYWxcclxuICAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVjaW1hbEZvcm1hdHRlZChpbnB1dDogbnVtYmVyIHwgc3RyaW5nLCBtaW5EZWNpbWFsPzogbnVtYmVyLCBtYXhEZWNpbWFsPzogbnVtYmVyKSB7XHJcbiAgaWYgKGlzTmFOKCtpbnB1dCkpIHtcclxuICAgIHJldHVybiBpbnB1dDtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1pbkRlYyA9IChtaW5EZWNpbWFsID09PSB1bmRlZmluZWQpID8gMiA6IG1pbkRlY2ltYWw7XHJcbiAgY29uc3QgbWF4RGVjID0gKG1heERlY2ltYWwgPT09IHVuZGVmaW5lZCkgPyAyIDogbWF4RGVjaW1hbDtcclxuICBsZXQgYW1vdW50ID0gU3RyaW5nKE1hdGgucm91bmQoK2lucHV0ICogTWF0aC5wb3coMTAsIG1heERlYykpIC8gTWF0aC5wb3coMTAsIG1heERlYykpO1xyXG5cclxuICBpZiAoYW1vdW50LmluZGV4T2YoJy4nKSA8IDApIHtcclxuICAgIGFtb3VudCArPSAnLic7XHJcbiAgfVxyXG4gIHdoaWxlICgoYW1vdW50Lmxlbmd0aCAtIGFtb3VudC5pbmRleE9mKCcuJykpIDw9IG1pbkRlYykge1xyXG4gICAgYW1vdW50ICs9ICcwJztcclxuICB9XHJcbiAgcmV0dXJuIGFtb3VudDtcclxufVxyXG5cclxuLyoqIEZyb20gYSBkb3QgKC4pIG5vdGF0aW9uIGZpbmQgYW5kIHJldHVybiBhIHByb3BlcnR5IHdpdGhpbiBhbiBvYmplY3QgZ2l2ZW4gYSBwYXRoICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREZXNjZW5kYW50UHJvcGVydHkob2JqOiBhbnksIHBhdGg6IHN0cmluZykge1xyXG4gIHJldHVybiBwYXRoLnNwbGl0KCcuJykucmVkdWNlKChhY2MsIHBhcnQpID0+IGFjYyAmJiBhY2NbcGFydF0sIG9iaik7XHJcbn1cclxuXHJcbi8qKiBHZXQgdGhlIGJyb3dzZXIncyBzY3JvbGxiYXIgd2lkdGgsIHRoaXMgaXMgZGlmZmVyZW50IHRvIGVhY2ggYnJvd3NlciAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsQmFyV2lkdGgoKSB7XHJcbiAgY29uc3QgJG91dGVyID0gJCgnPGRpdj4nKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgd2lkdGg6IDEwMCwgb3ZlcmZsb3c6ICdzY3JvbGwnIH0pLmFwcGVuZFRvKCdib2R5Jyk7XHJcbiAgY29uc3Qgd2lkdGhXaXRoU2Nyb2xsID0gJCgnPGRpdj4nKS5jc3MoeyB3aWR0aDogJzEwMCUnIH0pLmFwcGVuZFRvKCRvdXRlcikub3V0ZXJXaWR0aCgpO1xyXG4gICRvdXRlci5yZW1vdmUoKTtcclxuICByZXR1cm4gTWF0aC5jZWlsKDEwMCAtIHdpZHRoV2l0aFNjcm9sbCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGcm9tIGEgRGF0ZSBGaWVsZFR5cGUsIHJldHVybiBpdCdzIGVxdWl2YWxlbnQgbW9tZW50LmpzIGZvcm1hdFxyXG4gKiByZWZlciB0byBtb21lbnQuanMgZm9yIHRoZSBmb3JtYXQgc3RhbmRhcmQgdXNlZDogaHR0cHM6Ly9tb21lbnRqcy5jb20vZG9jcy8jL3BhcnNpbmcvc3RyaW5nLWZvcm1hdC9cclxuICogQHBhcmFtIGZpZWxkVHlwZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKGZpZWxkVHlwZTogRmllbGRUeXBlKTogc3RyaW5nIHtcclxuICBsZXQgbWFwOiBzdHJpbmc7XHJcbiAgc3dpdGNoIChmaWVsZFR5cGUpIHtcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc286XHJcbiAgICAgIG1hcCA9ICdZWVlZLU1NLUREIEhIOm1tOnNzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVNob3J0SXNvOlxyXG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERCBISDptbSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc29BbVBtOlxyXG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERCBoaDptbTpzcyBhJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FNX1BNOlxyXG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERCBoaDptbTpzcyBBJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXM6XHJcbiAgICAgIG1hcCA9ICdNTS9ERC9ZWVlZJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXNTaG9ydDpcclxuICAgICAgbWFwID0gJ00vRC9ZWSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVczpcclxuICAgICAgbWFwID0gJ01NL0REL1lZWVkgSEg6bW06c3MnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lU2hvcnRVczpcclxuICAgICAgbWFwID0gJ01NL0REL1lZWVkgSEg6bW0nO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBbVBtOlxyXG4gICAgICBtYXAgPSAnTU0vREQvWVlZWSBoaDptbTpzcyBhJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzQU1fUE06XHJcbiAgICAgIG1hcCA9ICdNTS9ERC9ZWVlZIGhoOm1tOnNzIEEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNTaG9ydDpcclxuICAgICAgbWFwID0gJ00vRC9ZWSBIOm06cyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0QW1QbTpcclxuICAgICAgbWFwID0gJ00vRC9ZWSBoOm06cyBhJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXRjOlxyXG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUlzbzpcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIG1hcCA9ICdZWVlZLU1NLUREJztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIHJldHVybiBtYXA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGcm9tIGEgRGF0ZSBGaWVsZFR5cGUsIHJldHVybiBpdCdzIGVxdWl2YWxlbnQgRmxhdHBpY2tyIGZvcm1hdFxyXG4gKiByZWZlciB0byBGbGF0cGlja3IgZm9yIHRoZSBmb3JtYXQgc3RhbmRhcmQgdXNlZDogaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2Zvcm1hdHRpbmcvI2RhdGUtZm9ybWF0dGluZy10b2tlbnNcclxuICogYWxzbyBub3RlIHRoYXQgdGhleSBzZWVtIHZlcnkgc2ltaWxhciB0byBQSFAgZm9ybWF0IChleGNlcHQgZm9yIGFtL3BtKTogaHR0cDovL3BocC5uZXQvbWFudWFsL2VuL2Z1bmN0aW9uLmRhdGUucGhwXHJcbiAqIEBwYXJhbSBmaWVsZFR5cGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZShmaWVsZFR5cGU6IEZpZWxkVHlwZSk6IHN0cmluZyB7XHJcbiAgLypcclxuICAgIGQ6IERheSBvZiB0aGUgbW9udGgsIDIgZGlnaXRzIHdpdGggbGVhZGluZyB6ZXJvc1x0MDEgdG8gMzFcclxuICAgIEQ6IEEgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIGRheVx0TW9uIHRocm91Z2ggU3VuXHJcbiAgICBsOiAobG93ZXJjYXNlICdMJylcdEEgZnVsbCB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgb2YgdGhlIHdlZWtcdFN1bmRheSB0aHJvdWdoIFNhdHVyZGF5XHJcbiAgICBqOiBEYXkgb2YgdGhlIG1vbnRoIHdpdGhvdXQgbGVhZGluZyB6ZXJvc1x0MSB0byAzMVxyXG4gICAgSjogRGF5IG9mIHRoZSBtb250aCB3aXRob3V0IGxlYWRpbmcgemVyb3MgYW5kIG9yZGluYWwgc3VmZml4XHQxc3QsIDJuZCwgdG8gMzFzdFxyXG4gICAgdzogTnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF5IG9mIHRoZSB3ZWVrXHQwIChmb3IgU3VuZGF5KSB0aHJvdWdoIDYgKGZvciBTYXR1cmRheSlcclxuICAgIEY6IEEgZnVsbCB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGhcdEphbnVhcnkgdGhyb3VnaCBEZWNlbWJlclxyXG4gICAgbTogTnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiBhIG1vbnRoLCB3aXRoIGxlYWRpbmcgemVyb1x0MDEgdGhyb3VnaCAxMlxyXG4gICAgbjogTnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiBhIG1vbnRoLCB3aXRob3V0IGxlYWRpbmcgemVyb3NcdDEgdGhyb3VnaCAxMlxyXG4gICAgTTogQSBzaG9ydCB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGhcdEphbiB0aHJvdWdoIERlY1xyXG4gICAgVTogVGhlIG51bWJlciBvZiBzZWNvbmRzIHNpbmNlIHRoZSBVbml4IEVwb2NoXHQxNDEzNzA0OTkzXHJcbiAgICB5OiBBIHR3byBkaWdpdCByZXByZXNlbnRhdGlvbiBvZiBhIHllYXJcdDk5IG9yIDAzXHJcbiAgICBZOiBBIGZ1bGwgbnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiBhIHllYXIsIDQgZGlnaXRzXHQxOTk5IG9yIDIwMDNcclxuICAgIEg6IEhvdXJzICgyNCBob3VycylcdDAwIHRvIDIzXHJcbiAgICBoOiBIb3Vyc1x0MSB0byAxMlxyXG4gICAgaTogTWludXRlc1x0MDAgdG8gNTlcclxuICAgIFM6IFNlY29uZHMsIDIgZGlnaXRzXHQwMCB0byA1OVxyXG4gICAgczogU2Vjb25kc1x0MCwgMSB0byA1OVxyXG4gICAgSzogQU0vUE1cdEFNIG9yIFBNXHJcbiAgKi9cclxuICBsZXQgbWFwOiBzdHJpbmc7XHJcbiAgc3dpdGNoIChmaWVsZFR5cGUpIHtcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc286XHJcbiAgICAgIG1hcCA9ICdZLW0tZCBIOmk6Uyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc29BbVBtOlxyXG4gICAgICBtYXAgPSAnWS1tLWQgaDppOlMgSyc7IC8vIHRoZXJlIGlzIG5vIGxvd2VyY2FzZSBpbiBGbGF0cGlja3IgOihcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FNX1BNOlxyXG4gICAgICBtYXAgPSAnWS1tLWQgaDppOlMgSyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzOlxyXG4gICAgICBtYXAgPSAnbS9kL1knO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVc1Nob3J0OlxyXG4gICAgICBtYXAgPSAnbS9kL3knO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXM6XHJcbiAgICAgIG1hcCA9ICdtL2QvWSBIOmk6Uyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc0FtUG06XHJcbiAgICAgIG1hcCA9ICdtL2QvWSBoOmk6UyBLJzsgLy8gdGhlcmUgaXMgbm8gbG93ZXJjYXNlIGluIEZsYXRwaWNrciA6KFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBTV9QTTpcclxuICAgICAgbWFwID0gJ20vZC9ZIGg6aTpzIEsnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNTaG9ydDpcclxuICAgICAgbWFwID0gJ20vZC95IEg6aTpzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnRBbVBtOlxyXG4gICAgICBtYXAgPSAnbS9kL3kgaDppOnMgSyc7IC8vIHRoZXJlIGlzIG5vIGxvd2VyY2FzZSBpbiBGbGF0cGlja3IgOihcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXRjOlxyXG4gICAgICBtYXAgPSAnWic7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVJc286XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBtYXAgPSAnWS1tLWQnO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgcmV0dXJuIG1hcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1hcHBlciBmb3IgcXVlcnkgb3BlcmF0b3JzIChleC46IDw9IGlzIFwibGVcIiwgPiBpcyBcImd0XCIpXHJcbiAqIEBwYXJhbSBzdHJpbmcgb3BlcmF0b3JcclxuICogQHJldHVybnMgc3RyaW5nIG1hcFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcE9wZXJhdG9yVHlwZShvcGVyYXRvcjogc3RyaW5nKTogT3BlcmF0b3JUeXBlIHtcclxuICBsZXQgbWFwOiBPcGVyYXRvclR5cGU7XHJcblxyXG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcclxuICAgIGNhc2UgJzwnOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUubGVzc1RoYW47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnPD0nOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUubGVzc1RoYW5PckVxdWFsO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJz4nOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuZ3JlYXRlclRoYW47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnPj0nOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuZ3JlYXRlclRoYW5PckVxdWFsO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzw+JzpcclxuICAgIGNhc2UgJyE9JzpcclxuICAgIGNhc2UgJ25lcSc6XHJcbiAgICBjYXNlICdORVEnOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUubm90RXF1YWw7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnKic6XHJcbiAgICBjYXNlICcuKic6XHJcbiAgICBjYXNlICdzdGFydHNXaXRoJzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLnN0YXJ0c1dpdGg7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnKi4nOlxyXG4gICAgY2FzZSAnZW5kc1dpdGgnOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuZW5kc1dpdGg7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnPSc6XHJcbiAgICBjYXNlICc9PSc6XHJcbiAgICBjYXNlICdlcSc6XHJcbiAgICBjYXNlICdFUSc6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5lcXVhbDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdpbic6XHJcbiAgICBjYXNlICdJTic6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5pbjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdub3RJbic6XHJcbiAgICBjYXNlICdOSU4nOlxyXG4gICAgY2FzZSAnTk9UX0lOJzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLm5vdEluO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5jb250YWlucztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWFwO1xyXG59XHJcblxyXG4vKipcclxuICogTWFwcGVyIGZvciBxdWVyeSBvcGVyYXRvciBieSBhIEZpbHRlciBUeXBlXHJcbiAqIEZvciBleGFtcGxlIGEgbXVsdGlwbGUtc2VsZWN0IHR5cGljYWxseSB1c2VzICdJTicgb3BlcmF0b3JcclxuICogQHBhcmFtIG9wZXJhdG9yXHJcbiAqIEByZXR1cm5zIHN0cmluZyBtYXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBPcGVyYXRvckJ5RmllbGRUeXBlKGZpZWxkVHlwZTogRmllbGRUeXBlIHwgc3RyaW5nKTogT3BlcmF0b3JUeXBlIHtcclxuICBsZXQgbWFwOiBPcGVyYXRvclR5cGU7XHJcblxyXG4gIHN3aXRjaCAoZmllbGRUeXBlKSB7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5zdHJpbmc6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS51bmtub3duOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuY29udGFpbnM7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZmxvYXQ6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5udW1iZXI6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUlzbzpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGU6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXRjOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWU6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzbzpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lSXNvQW1QbTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lSXNvQU1fUE06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXM6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXNTaG9ydDpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXM6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzQW1QbTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBTV9QTTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNTaG9ydDpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNTaG9ydEFtUG06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnRBTV9QTTpcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5lcXVhbDtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWFwO1xyXG59XHJcblxyXG4vKipcclxuICogUGFyc2UgYSBkYXRlIHBhc3NlZCBhcyBhIHN0cmluZyBhbmQgcmV0dXJuIGEgRGF0ZSBvYmplY3QgKGlmIHZhbGlkKVxyXG4gKiBAcGFyYW0gaW5wdXREYXRlU3RyaW5nXHJcbiAqIEByZXR1cm5zIHN0cmluZyBkYXRlIGZvcm1hdHRlZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVXRjRGF0ZShpbnB1dERhdGVTdHJpbmc6IHN0cmluZywgdXNlVXRjOiBib29sZWFuKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgbGV0IGRhdGUgPSBudWxsO1xyXG5cclxuICBpZiAoL15bMC05XFwtXFwvXSokLy50ZXN0KGlucHV0RGF0ZVN0cmluZykpIHtcclxuICAgIC8vIGdldCB0aGUgVVRDIGRhdGV0aW1lIHdpdGggbW9tZW50LmpzIGJ1dCB3ZSBuZWVkIHRvIGRlY29kZSB0aGUgdmFsdWUgc28gdGhhdCBpdCdzIHZhbGlkIHRleHRcclxuICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBkZWNvZGVVUklDb21wb25lbnQoaW5wdXREYXRlU3RyaW5nKTtcclxuICAgIGNvbnN0IGRhdGVNb21lbnQgPSBtb21lbnQobmV3IERhdGUoZGF0ZVN0cmluZykpO1xyXG4gICAgaWYgKGRhdGVNb21lbnQuaXNWYWxpZCgpICYmIGRhdGVNb21lbnQueWVhcigpLnRvU3RyaW5nKCkubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgIGRhdGUgPSAodXNlVXRjKSA/IGRhdGVNb21lbnQudXRjKCkuZm9ybWF0KCkgOiBkYXRlTW9tZW50LmZvcm1hdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRhdGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTYW5pdGl6ZSwgcmV0dXJuIG9ubHkgdGhlIHRleHQgd2l0aG91dCBIVE1MIHRhZ3NcclxuICogQGlucHV0IGh0bWxTdHJpbmdcclxuICogQHJldHVybiB0ZXh0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVIdG1sVG9UZXh0KGh0bWxTdHJpbmc6IHN0cmluZykge1xyXG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICB0ZW1wLmlubmVySFRNTCA9IGh0bWxTdHJpbmc7XHJcbiAgcmV0dXJuIHRlbXAudGV4dENvbnRlbnQgfHwgdGVtcC5pbm5lclRleHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaXRsZSBjYXNlIHRoZSBjb21wbGV0ZSBzZW50ZW5jZSAodXBwZXIgY2FzZSBmaXJzdCBjaGFyIG9mIGVhY2ggd29yZCB3aGlsZSBjaGFuZ2luZyBldmVyeXRoaW5nIGVsc2UgdG8gbG93ZXIgY2FzZSlcclxuICogQHBhcmFtIHN0cmluZ1xyXG4gKiBAcmV0dXJucyBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0aXRsZUNhc2Uoc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGNhbWVsIGNhc2VcclxuICogQHBhcmFtIHN0ciB0aGUgc3RyaW5nIHRvIGNvbnZlcnRcclxuICogQHJldHVybiB0aGUgc3RyaW5nIGluIGNhbWVsIGNhc2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oPzpeXFx3fFtBLVpdfFxcYlxcd3xbXFxzK1xcLV9cXC9dKS9nLCAobWF0Y2g6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpID0+IHtcclxuICAgIC8vIHJlbW92ZSB3aGl0ZSBzcGFjZSBvciBoeXBlbnMgb3IgdW5kZXJzY29yZXNcclxuICAgIGlmICgvW1xccytcXC1fXFwvXS8udGVzdChtYXRjaCkpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvZmZzZXQgPT09IDAgPyBtYXRjaC50b0xvd2VyQ2FzZSgpIDogbWF0Y2gudG9VcHBlckNhc2UoKTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGtlYmFiIChoeXBlbikgY2FzZVxyXG4gKiBAcGFyYW0gc3RyIHRoZSBzdHJpbmcgdG8gY29udmVydFxyXG4gKiBAcmV0dXJuIHRoZSBzdHJpbmcgaW4ga2ViYWIgY2FzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvS2ViYWJDYXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gdG9DYW1lbENhc2Uoc3RyKS5yZXBsYWNlKC8oW0EtWl0pL2csICctJDEnKS50b0xvd2VyQ2FzZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogVGFrZXMgYW4gaW5wdXQgYXJyYXkgYW5kIG1ha2VzIHN1cmUgdGhlIGFycmF5IGhhcyB1bmlxdWUgdmFsdWVzIGJ5IHJlbW92aW5nIGR1cGxpY2F0ZXNcclxuICogQHBhcmFtIGFycmF5IGlucHV0IHdpdGggcG9zc2libGUgZHVwbGljYXRlc1xyXG4gKiBAcmV0dXJuIGFycmF5IG91dHB1dCB3aXRob3V0IGR1cGxpY2F0ZXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVBcnJheShhcnI6IGFueVtdKTogYW55W10ge1xyXG4gIHJldHVybiBhcnIuZmlsdGVyKChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIHJldHVybiBhcnIuaW5kZXhPZihpdGVtKSA+PSBpbmRleDtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVuc3Vic2NyaWJlIGFsbCBPYnNlcnZhYmxlcyBTdWJzY3JpcHRpb25zXHJcbiAqIEl0IHdpbGwgcmV0dXJuIGFuIGVtcHR5IGFycmF5IGlmIGl0IGFsbCB3ZW50IHdlbGxcclxuICogQHBhcmFtIHN1YnNjcmlwdGlvbnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdKTogU3Vic2NyaXB0aW9uW10ge1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHN1YnNjcmlwdGlvbnMpKSB7XHJcbiAgICBzdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSA9PiB7XHJcbiAgICAgIGlmIChzdWJzY3JpcHRpb24gJiYgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKSB7XHJcbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc3Vic2NyaXB0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN1YnNjcmlwdGlvbnM7XHJcbn1cclxuIl19