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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy91dGlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk3QyxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQzs7SUFDakMsTUFBTSxHQUFHLE9BQU87Ozs7Ozs7QUFTdEIsTUFBTSxVQUFVLGNBQWMsQ0FBQyxRQUFROztRQUNqQyxNQUFNLEdBQUcsRUFBRTtJQUVmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsTUFBTSxJQUFJLEdBQUcsQ0FBQztLQUNmO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7Ozs7O0FBR0QsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUFLO0lBQzlCLGtGQUFrRjtJQUNsRiw4RUFBOEU7SUFDOUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3hDLENBQUM7Ozs7OztBQUdELE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBSztJQUM5QixPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDeEMsQ0FBQzs7Ozs7O0FBTUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQWE7SUFDNUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxVQUFVLEtBQUssRUFBRSxHQUFHO1FBQ3BELE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7Ozs7OztBQU1ELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFVOztRQUNuQyxHQUFHLEdBQUcsRUFBRTtJQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMxRDtJQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QixDQUFDOzs7Ozs7OztBQVNELE1BQU0sVUFBVSxXQUFXLENBQUMsQ0FBUSxFQUFFLENBQVEsRUFBRSxZQUE2QjtJQUE3Qiw2QkFBQSxFQUFBLG9CQUE2QjtJQUMzRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDWCxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNaLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUN6QixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDVjtJQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ2pDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQixPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7Ozs7Ozs7O0FBT0QsTUFBTSxVQUFVLGFBQWEsQ0FBSSxLQUFpQyxFQUFFLGVBQTRCO0lBQTVCLGdDQUFBLEVBQUEsb0JBQTRCOztRQUMxRixPQUFPLEdBQVEsS0FBSztJQUV4QixJQUFJLEtBQUssWUFBWSxPQUFPLEVBQUU7UUFDNUIsMkNBQTJDO1FBQzNDLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7U0FBTSxJQUFJLEtBQUssWUFBWSxVQUFVLEVBQUU7UUFDdEMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksT0FBTyxDQUFDLEVBQUU7WUFDakMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDM0M7UUFDRCxJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksT0FBTyxDQUFDLEVBQUU7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FDYiw2Q0FBMkMsZUFBZSxxUkFHekQsQ0FBQyxDQUFDO1NBQ047S0FDRjtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7OztBQVVELE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBWSxFQUFFLEtBQTZCLEVBQUUsVUFBZTtJQUFmLDJCQUFBLEVBQUEsZUFBZTtJQUN4RixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDO0FBQ3pDLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQXNCLEVBQUUsVUFBbUIsRUFBRSxVQUFtQjtJQUMvRixJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7O1FBRUssTUFBTSxHQUFHLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7O1FBQ3BELE1BQU0sR0FBRyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVOztRQUN0RCxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVyRixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzNCLE1BQU0sSUFBSSxHQUFHLENBQUM7S0FDZjtJQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLEVBQUU7UUFDdEQsTUFBTSxJQUFJLEdBQUcsQ0FBQztLQUNmO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7Ozs7OztBQUdELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxHQUFRLEVBQUUsSUFBWTtJQUMxRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLElBQUksSUFBSyxPQUFBLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQWhCLENBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdEUsQ0FBQzs7Ozs7QUFHRCxNQUFNLFVBQVUsaUJBQWlCOztRQUN6QixNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDOztRQUNsRyxlQUFlLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUU7SUFDdkYsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUM7QUFDMUMsQ0FBQzs7Ozs7OztBQU9ELE1BQU0sVUFBVSxnQ0FBZ0MsQ0FBQyxTQUFvQjs7UUFDL0QsR0FBVztJQUNmLFFBQVEsU0FBUyxFQUFFO1FBQ2pCLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUN4QixLQUFLLFNBQVMsQ0FBQyxXQUFXO1lBQ3hCLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQztZQUM1QixNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsZ0JBQWdCO1lBQzdCLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQztZQUN6QixNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsZUFBZTtZQUM1QixHQUFHLEdBQUcsdUJBQXVCLENBQUM7WUFDOUIsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLGdCQUFnQjtZQUM3QixHQUFHLEdBQUcsdUJBQXVCLENBQUM7WUFDOUIsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLE1BQU07WUFDbkIsR0FBRyxHQUFHLFlBQVksQ0FBQztZQUNuQixNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsV0FBVztZQUN4QixHQUFHLEdBQUcsUUFBUSxDQUFDO1lBQ2YsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLFVBQVU7WUFDdkIsR0FBRyxHQUFHLHFCQUFxQixDQUFDO1lBQzVCLE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQyxlQUFlO1lBQzVCLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQztZQUN6QixNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsY0FBYztZQUMzQixHQUFHLEdBQUcsdUJBQXVCLENBQUM7WUFDOUIsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLGVBQWU7WUFDNUIsR0FBRyxHQUFHLHVCQUF1QixDQUFDO1lBQzlCLE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQyxlQUFlO1lBQzVCLEdBQUcsR0FBRyxjQUFjLENBQUM7WUFDckIsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLG1CQUFtQjtZQUNoQyxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7WUFDdkIsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLE9BQU87WUFDcEIsR0FBRyxHQUFHLDBCQUEwQixDQUFDO1lBQ2pDLE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDcEIsS0FBSyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3ZCO1lBQ0UsR0FBRyxHQUFHLFlBQVksQ0FBQztZQUNuQixNQUFNO0tBQ1Q7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLG1DQUFtQyxDQUFDLFNBQW9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXNCbEUsR0FBVztJQUNmLFFBQVEsU0FBUyxFQUFFO1FBQ2pCLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUN4QixLQUFLLFNBQVMsQ0FBQyxXQUFXO1lBQ3hCLEdBQUcsR0FBRyxhQUFhLENBQUM7WUFDcEIsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLGVBQWU7WUFDNUIsR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDLHdDQUF3QztZQUMvRCxNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsZ0JBQWdCO1lBQzdCLEdBQUcsR0FBRyxlQUFlLENBQUM7WUFDdEIsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLE1BQU07WUFDbkIsR0FBRyxHQUFHLE9BQU8sQ0FBQztZQUNkLE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQyxXQUFXO1lBQ3hCLEdBQUcsR0FBRyxPQUFPLENBQUM7WUFDZCxNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsVUFBVTtZQUN2QixHQUFHLEdBQUcsYUFBYSxDQUFDO1lBQ3BCLE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQyxjQUFjO1lBQzNCLEdBQUcsR0FBRyxlQUFlLENBQUMsQ0FBQyx3Q0FBd0M7WUFDL0QsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLGVBQWU7WUFDNUIsR0FBRyxHQUFHLGVBQWUsQ0FBQztZQUN0QixNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsZUFBZTtZQUM1QixHQUFHLEdBQUcsYUFBYSxDQUFDO1lBQ3BCLE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQyxtQkFBbUI7WUFDaEMsR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDLHdDQUF3QztZQUMvRCxNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsT0FBTztZQUNwQixHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ1YsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQztRQUNwQixLQUFLLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDdkI7WUFDRSxHQUFHLEdBQUcsT0FBTyxDQUFDO1lBQ2QsTUFBTTtLQUNUO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsZUFBZSxDQUFDLFFBQWdCOztRQUMxQyxHQUFpQjtJQUVyQixRQUFRLFFBQVEsRUFBRTtRQUNoQixLQUFLLEdBQUc7WUFDTixHQUFHLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUM1QixNQUFNO1FBQ1IsS0FBSyxJQUFJO1lBQ1AsR0FBRyxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUM7WUFDbkMsTUFBTTtRQUNSLEtBQUssR0FBRztZQUNOLEdBQUcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDO1lBQy9CLE1BQU07UUFDUixLQUFLLElBQUk7WUFDUCxHQUFHLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQ3RDLE1BQU07UUFDUixLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssSUFBSSxDQUFDO1FBQ1YsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUs7WUFDUixHQUFHLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUM1QixNQUFNO1FBQ1IsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssWUFBWTtZQUNmLEdBQUcsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQzlCLE1BQU07UUFDUixLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssVUFBVTtZQUNiLEdBQUcsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQzVCLE1BQU07UUFDUixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssSUFBSSxDQUFDO1FBQ1YsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLElBQUk7WUFDUCxHQUFHLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNO1FBQ1IsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLElBQUk7WUFDUCxHQUFHLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQztZQUN0QixNQUFNO1FBQ1IsS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssUUFBUTtZQUNYLEdBQUcsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3pCLE1BQU07UUFDUjtZQUNFLEdBQUcsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQzVCLE1BQU07S0FDVDtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQzs7Ozs7OztBQVFELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxTQUE2Qjs7UUFDOUQsR0FBaUI7SUFFckIsUUFBUSxTQUFTLEVBQUU7UUFDakIsS0FBSyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3RCLEtBQUssU0FBUyxDQUFDLE9BQU87WUFDcEIsR0FBRyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDNUIsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNyQixLQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDdEIsS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3BCLEtBQUssU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUN2QixLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDcEIsS0FBSyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3ZCLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUN4QixLQUFLLFNBQVMsQ0FBQyxXQUFXLENBQUM7UUFDM0IsS0FBSyxTQUFTLENBQUMsZUFBZSxDQUFDO1FBQy9CLEtBQUssU0FBUyxDQUFDLGdCQUFnQixDQUFDO1FBQ2hDLEtBQUssU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN0QixLQUFLLFNBQVMsQ0FBQyxXQUFXLENBQUM7UUFDM0IsS0FBSyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBQzFCLEtBQUssU0FBUyxDQUFDLGNBQWMsQ0FBQztRQUM5QixLQUFLLFNBQVMsQ0FBQyxlQUFlLENBQUM7UUFDL0IsS0FBSyxTQUFTLENBQUMsZUFBZSxDQUFDO1FBQy9CLEtBQUssU0FBUyxDQUFDLG1CQUFtQixDQUFDO1FBQ25DLEtBQUssU0FBUyxDQUFDLG9CQUFvQixDQUFDO1FBQ3BDO1lBQ0UsR0FBRyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDekIsTUFBTTtLQUNUO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOzs7Ozs7O0FBT0QsTUFBTSxVQUFVLFlBQVksQ0FBQyxlQUF1QixFQUFFLE1BQWU7O1FBQy9ELElBQUksR0FBRyxJQUFJO0lBRWYsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFOzs7WUFFbEMsVUFBVSxHQUFHLGtCQUFrQixDQUFDLGVBQWUsQ0FBQzs7WUFDaEQsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNyRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkU7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQzs7Ozs7OztBQU9ELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxVQUFrQjs7UUFDN0MsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0lBQzVCLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQzVDLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSxTQUFTLENBQUMsTUFBTTtJQUM5QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRCxDQUFDOzs7Ozs7QUFPRCxNQUFNLFVBQVUsV0FBVyxDQUFDLEdBQVc7SUFDckMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFLFVBQUMsS0FBYSxFQUFFLE1BQWM7UUFDakYsOENBQThDO1FBQzlDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsT0FBTyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBVztJQUNyQyxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25FLENBQUM7Ozs7OztBQU9ELE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBVTtJQUNwQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFTLEVBQUUsS0FBYTtRQUN6QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7OztBQU9ELE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxhQUE2QjtJQUNyRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDaEMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQTBCO1lBQy9DLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUU7Z0JBQzVDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM1QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsYUFBYSxHQUFHLEVBQUUsQ0FBQztLQUNwQjtJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZFR5cGUsIE9wZXJhdG9yVHlwZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0LCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cblxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQtbWluaSc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIFwibW9tZW50IGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiIGlzc3VlLCBkb2N1bWVudCBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2lzc3Vlcy82NzBcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuXG4vKiogU2ltcGxlIGZ1bmN0aW9uIHRvIHdoaWNoIHdpbGwgbG9vcCBhbmQgY3JlYXRlIGFzIGRlbWFuZGVkIHRoZSBudW1iZXIgb2Ygd2hpdGUgc3BhY2VzLFxuICogdGhpcyB3aWxsIGJlIHVzZWQgaW4gdGhlIEV4Y2VsIGV4cG9ydFxuICogQHBhcmFtIGludCBuYlNwYWNlczogbnVtYmVyIG9mIHdoaXRlIHNwYWNlcyB0byBjcmVhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFdoaXRlU3BhY2VzKG5iU3BhY2VzKTogc3RyaW5nIHtcbiAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmJTcGFjZXM7IGkrKykge1xuICAgIHJlc3VsdCArPSAnICc7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIEhUTUwgZW5jb2RlIHVzaW5nIGpRdWVyeSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGh0bWxFbmNvZGUodmFsdWUpIHtcbiAgLy8gY3JlYXRlIGEgaW4tbWVtb3J5IGRpdiwgc2V0IGl0J3MgaW5uZXIgdGV4dCh3aGljaCBqUXVlcnkgYXV0b21hdGljYWxseSBlbmNvZGVzKVxuICAvLyB0aGVuIGdyYWIgdGhlIGVuY29kZWQgY29udGVudHMgYmFjayBvdXQuICBUaGUgZGl2IG5ldmVyIGV4aXN0cyBvbiB0aGUgcGFnZS5cbiAgcmV0dXJuICQoJzxkaXYvPicpLnRleHQodmFsdWUpLmh0bWwoKTtcbn1cblxuLyoqIEhUTUwgZGVjb2RlIHVzaW5nIGpRdWVyeSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGh0bWxEZWNvZGUodmFsdWUpIHtcbiAgcmV0dXJuICQoJzxkaXYvPicpLmh0bWwodmFsdWUpLnRleHQoKTtcbn1cblxuLyoqIGRlY29kZSB0ZXh0IGludG8gaHRtbCBlbnRpdHlcbiAqIEBwYXJhbSBzdHJpbmcgdGV4dDogaW5wdXQgdGV4dFxuICogQHBhcmFtIHN0cmluZyB0ZXh0OiBvdXRwdXQgdGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gaHRtbEVudGl0eURlY29kZShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoLyYjKFxcZCspOy9nLCBmdW5jdGlvbiAobWF0Y2gsIGRlYykge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGRlYyk7XG4gIH0pO1xufVxuXG4vKiogZGVjb2RlIHRleHQgaW50byBodG1sIGVudGl0eVxuICogQHBhcmFtIHN0cmluZyB0ZXh0OiBpbnB1dCB0ZXh0XG4gKiBAcGFyYW0gc3RyaW5nIHRleHQ6IG91dHB1dCB0ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBodG1sRW50aXR5RW5jb2RlKGlucHV0OiBhbnkpOiBzdHJpbmcge1xuICBjb25zdCBidWYgPSBbXTtcbiAgZm9yIChsZXQgaSA9IGlucHV0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgYnVmLnVuc2hpZnQoWycmIycsIGlucHV0W2ldLmNoYXJDb2RlQXQoKSwgJzsnXS5qb2luKCcnKSk7XG4gIH1cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyB0d28gYXJyYXlzIHRvIGRldGVybWluZSBpZiBhbGwgdGhlIGl0ZW1zIGFyZSBlcXVhbFxuICogQHBhcmFtIGEgZmlyc3QgYXJyYXlcbiAqIEBwYXJhbSBiIHNlY29uZCBhcnJheSB0byBjb21wYXJlIHdpdGggYVxuICogQHBhcmFtIFtvcmRlck1hdHRlcnM9ZmFsc2VdIGZsYWcgaWYgdGhlIG9yZGVyIG1hdHRlcnMsIGlmIG5vdCBhcnJheXMgd2lsbCBiZSBzb3J0ZWRcbiAqIEByZXR1cm4gYm9vbGVhbiB0cnVlIGlmIGVxdWFsLCBlbHNlIGZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcnJheXNFcXVhbChhOiBhbnlbXSwgYjogYW55W10sIG9yZGVyTWF0dGVyczogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoIWEgfHwgIWIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFvcmRlck1hdHRlcnMpIHtcbiAgICBhLnNvcnQoKTtcbiAgICBiLnNvcnQoKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogVHJ5IGNhc3RpbmcgYW4gaW5wdXQgb2YgdHlwZSBQcm9taXNlIHwgT2JzZXJ2YWJsZSBpbnRvIGEgUHJvbWlzZSB0eXBlLlxuICogQHBhcmFtIG9iamVjdCB3aGljaCBjb3VsZCBiZSBvZiB0eXBlIFByb21pc2Ugb3IgT2JzZXJ2YWJsZVxuICogQHBhcmFtIGZyb21TZXJ2aWNlTmFtZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjYWxsZXIgc2VydmljZSBuYW1lIGFuZCB3aWxsIGJlIHVzZWQgaWYgd2UgdGhyb3cgYSBjYXN0aW5nIHByb2JsZW0gZXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhc3RUb1Byb21pc2U8VD4oaW5wdXQ6IFByb21pc2U8VD4gfCBPYnNlcnZhYmxlPFQ+LCBmcm9tU2VydmljZU5hbWU6IHN0cmluZyA9ICcnKTogUHJvbWlzZTxUPiB7XG4gIGxldCBwcm9taXNlOiBhbnkgPSBpbnB1dDtcblxuICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgLy8gaWYgaXQncyBhbHJlYWR5IGEgUHJvbWlzZSB0aGVuIHJldHVybiBpdFxuICAgIHJldHVybiBpbnB1dDtcbiAgfSBlbHNlIGlmIChpbnB1dCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICBwcm9taXNlID0gaW5wdXQucGlwZShmaXJzdCgpKS50b1Byb21pc2UoKTtcbiAgICBpZiAoIShwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgIHByb21pc2UgPSBpbnB1dC5waXBlKHRha2UoMSkpLnRvUHJvbWlzZSgpO1xuICAgIH1cbiAgICBpZiAoIShwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFNvbWV0aGluZyB3ZW50IHdyb25nLCBBbmd1bGFyLVNsaWNrZ3JpZCAke2Zyb21TZXJ2aWNlTmFtZX0gaXMgbm90IGFibGUgdG8gY29udmVydCB0aGUgT2JzZXJ2YWJsZSBpbnRvIGEgUHJvbWlzZS5cbiAgICAgICAgSWYgeW91IGFyZSB1c2luZyBBbmd1bGFyIEh0dHBDbGllbnQsIHlvdSBjb3VsZCB0cnkgY29udmVydGluZyB5b3VyIGh0dHAgY2FsbCB0byBhIFByb21pc2Ugd2l0aCBcIi50b1Byb21pc2UoKVwiXG4gICAgICAgIGZvciBleGFtcGxlOjogIHRoaXMuaHR0cC5wb3N0KCdncmFwaHFsJywgeyBxdWVyeTogZ3JhcGhxbFF1ZXJ5IH0pLnRvUHJvbWlzZSgpXG4gICAgICAgIGApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufVxuXG4vKipcbiAqIFVzZXMgdGhlIGxvZ2ljIGZ1bmN0aW9uIHRvIGZpbmQgYW4gaXRlbSBpbiBhbiBhcnJheSBvciByZXR1cm5zIHRoZSBkZWZhdWx0XG4gKiB2YWx1ZSBwcm92aWRlZCAoZW1wdHkgb2JqZWN0IGJ5IGRlZmF1bHQpXG4gKiBAcGFyYW0gYW55W10gYXJyYXkgdGhlIGFycmF5IHRvIGZpbHRlclxuICogQHBhcmFtIGZ1bmN0aW9uIGxvZ2ljIHRoZSBsb2dpYyB0byBmaW5kIHRoZSBpdGVtXG4gKiBAcGFyYW0gYW55IFtkZWZhdWx0VmFsPXt9XSB0aGUgZGVmYXVsdCB2YWx1ZSB0byByZXR1cm5cbiAqIEByZXR1cm4gb2JqZWN0IHRoZSBmb3VuZCBvYmplY3Qgb3IgZGVmYXVsdCB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE9yRGVmYXVsdChhcnJheTogYW55W10sIGxvZ2ljOiAoaXRlbTogYW55KSA9PiBib29sZWFuLCBkZWZhdWx0VmFsID0ge30pOiBhbnkge1xuICByZXR1cm4gYXJyYXkuZmluZChsb2dpYykgfHwgZGVmYXVsdFZhbDtcbn1cblxuLyoqXG4gICogVGFrZSBhIG51bWJlciAob3IgYSBzdHJpbmcpIGFuZCBkaXNwbGF5IGl0IGFzIGEgZm9ybWF0dGVkIGRlY2ltYWwgc3RyaW5nIHdpdGggZGVmaW5lZCBtaW5pbXVtIGFuZCBtYXhpbXVtIGRlY2ltYWxzXG4gICogQHBhcmFtIGlucHV0XG4gICogQHBhcmFtIG1pbkRlY2ltYWxcbiAgKiBAcGFyYW0gbWF4RGVjaW1hbFxuICAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY2ltYWxGb3JtYXR0ZWQoaW5wdXQ6IG51bWJlciB8IHN0cmluZywgbWluRGVjaW1hbD86IG51bWJlciwgbWF4RGVjaW1hbD86IG51bWJlcikge1xuICBpZiAoaXNOYU4oK2lucHV0KSkge1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuXG4gIGNvbnN0IG1pbkRlYyA9IChtaW5EZWNpbWFsID09PSB1bmRlZmluZWQpID8gMiA6IG1pbkRlY2ltYWw7XG4gIGNvbnN0IG1heERlYyA9IChtYXhEZWNpbWFsID09PSB1bmRlZmluZWQpID8gMiA6IG1heERlY2ltYWw7XG4gIGxldCBhbW91bnQgPSBTdHJpbmcoTWF0aC5yb3VuZCgraW5wdXQgKiBNYXRoLnBvdygxMCwgbWF4RGVjKSkgLyBNYXRoLnBvdygxMCwgbWF4RGVjKSk7XG5cbiAgaWYgKGFtb3VudC5pbmRleE9mKCcuJykgPCAwKSB7XG4gICAgYW1vdW50ICs9ICcuJztcbiAgfVxuICB3aGlsZSAoKGFtb3VudC5sZW5ndGggLSBhbW91bnQuaW5kZXhPZignLicpKSA8PSBtaW5EZWMpIHtcbiAgICBhbW91bnQgKz0gJzAnO1xuICB9XG4gIHJldHVybiBhbW91bnQ7XG59XG5cbi8qKiBGcm9tIGEgZG90ICguKSBub3RhdGlvbiBmaW5kIGFuZCByZXR1cm4gYSBwcm9wZXJ0eSB3aXRoaW4gYW4gb2JqZWN0IGdpdmVuIGEgcGF0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlc2NlbmRhbnRQcm9wZXJ0eShvYmo6IGFueSwgcGF0aDogc3RyaW5nKSB7XG4gIHJldHVybiBwYXRoLnNwbGl0KCcuJykucmVkdWNlKChhY2MsIHBhcnQpID0+IGFjYyAmJiBhY2NbcGFydF0sIG9iaik7XG59XG5cbi8qKiBHZXQgdGhlIGJyb3dzZXIncyBzY3JvbGxiYXIgd2lkdGgsIHRoaXMgaXMgZGlmZmVyZW50IHRvIGVhY2ggYnJvd3NlciAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbEJhcldpZHRoKCkge1xuICBjb25zdCAkb3V0ZXIgPSAkKCc8ZGl2PicpLmNzcyh7IHZpc2liaWxpdHk6ICdoaWRkZW4nLCB3aWR0aDogMTAwLCBvdmVyZmxvdzogJ3Njcm9sbCcgfSkuYXBwZW5kVG8oJ2JvZHknKTtcbiAgY29uc3Qgd2lkdGhXaXRoU2Nyb2xsID0gJCgnPGRpdj4nKS5jc3MoeyB3aWR0aDogJzEwMCUnIH0pLmFwcGVuZFRvKCRvdXRlcikub3V0ZXJXaWR0aCgpO1xuICAkb3V0ZXIucmVtb3ZlKCk7XG4gIHJldHVybiBNYXRoLmNlaWwoMTAwIC0gd2lkdGhXaXRoU2Nyb2xsKTtcbn1cblxuLyoqXG4gKiBGcm9tIGEgRGF0ZSBGaWVsZFR5cGUsIHJldHVybiBpdCdzIGVxdWl2YWxlbnQgbW9tZW50LmpzIGZvcm1hdFxuICogcmVmZXIgdG8gbW9tZW50LmpzIGZvciB0aGUgZm9ybWF0IHN0YW5kYXJkIHVzZWQ6IGh0dHBzOi8vbW9tZW50anMuY29tL2RvY3MvIy9wYXJzaW5nL3N0cmluZy1mb3JtYXQvXG4gKiBAcGFyYW0gZmllbGRUeXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZShmaWVsZFR5cGU6IEZpZWxkVHlwZSk6IHN0cmluZyB7XG4gIGxldCBtYXA6IHN0cmluZztcbiAgc3dpdGNoIChmaWVsZFR5cGUpIHtcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZTpcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzbzpcbiAgICAgIG1hcCA9ICdZWVlZLU1NLUREIEhIOm1tOnNzJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lU2hvcnRJc286XG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERCBISDptbSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FtUG06XG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERCBoaDptbTpzcyBhJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lSXNvQU1fUE06XG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERCBoaDptbTpzcyBBJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVczpcbiAgICAgIG1hcCA9ICdNTS9ERC9ZWVlZJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVc1Nob3J0OlxuICAgICAgbWFwID0gJ00vRC9ZWSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzOlxuICAgICAgbWFwID0gJ01NL0REL1lZWVkgSEg6bW06c3MnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVTaG9ydFVzOlxuICAgICAgbWFwID0gJ01NL0REL1lZWVkgSEg6bW0nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc0FtUG06XG4gICAgICBtYXAgPSAnTU0vREQvWVlZWSBoaDptbTpzcyBhJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBTV9QTTpcbiAgICAgIG1hcCA9ICdNTS9ERC9ZWVlZIGhoOm1tOnNzIEEnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0OlxuICAgICAgbWFwID0gJ00vRC9ZWSBIOm06cyc7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnRBbVBtOlxuICAgICAgbWFwID0gJ00vRC9ZWSBoOm06cyBhJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVdGM6XG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGU6XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUlzbzpcbiAgICBkZWZhdWx0OlxuICAgICAgbWFwID0gJ1lZWVktTU0tREQnO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn1cblxuLyoqXG4gKiBGcm9tIGEgRGF0ZSBGaWVsZFR5cGUsIHJldHVybiBpdCdzIGVxdWl2YWxlbnQgRmxhdHBpY2tyIGZvcm1hdFxuICogcmVmZXIgdG8gRmxhdHBpY2tyIGZvciB0aGUgZm9ybWF0IHN0YW5kYXJkIHVzZWQ6IGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9mb3JtYXR0aW5nLyNkYXRlLWZvcm1hdHRpbmctdG9rZW5zXG4gKiBhbHNvIG5vdGUgdGhhdCB0aGV5IHNlZW0gdmVyeSBzaW1pbGFyIHRvIFBIUCBmb3JtYXQgKGV4Y2VwdCBmb3IgYW0vcG0pOiBodHRwOi8vcGhwLm5ldC9tYW51YWwvZW4vZnVuY3Rpb24uZGF0ZS5waHBcbiAqIEBwYXJhbSBmaWVsZFR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKGZpZWxkVHlwZTogRmllbGRUeXBlKTogc3RyaW5nIHtcbiAgLypcbiAgICBkOiBEYXkgb2YgdGhlIG1vbnRoLCAyIGRpZ2l0cyB3aXRoIGxlYWRpbmcgemVyb3NcdDAxIHRvIDMxXG4gICAgRDogQSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgZGF5XHRNb24gdGhyb3VnaCBTdW5cbiAgICBsOiAobG93ZXJjYXNlICdMJylcdEEgZnVsbCB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgb2YgdGhlIHdlZWtcdFN1bmRheSB0aHJvdWdoIFNhdHVyZGF5XG4gICAgajogRGF5IG9mIHRoZSBtb250aCB3aXRob3V0IGxlYWRpbmcgemVyb3NcdDEgdG8gMzFcbiAgICBKOiBEYXkgb2YgdGhlIG1vbnRoIHdpdGhvdXQgbGVhZGluZyB6ZXJvcyBhbmQgb3JkaW5hbCBzdWZmaXhcdDFzdCwgMm5kLCB0byAzMXN0XG4gICAgdzogTnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF5IG9mIHRoZSB3ZWVrXHQwIChmb3IgU3VuZGF5KSB0aHJvdWdoIDYgKGZvciBTYXR1cmRheSlcbiAgICBGOiBBIGZ1bGwgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIG1vbnRoXHRKYW51YXJ5IHRocm91Z2ggRGVjZW1iZXJcbiAgICBtOiBOdW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGgsIHdpdGggbGVhZGluZyB6ZXJvXHQwMSB0aHJvdWdoIDEyXG4gICAgbjogTnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiBhIG1vbnRoLCB3aXRob3V0IGxlYWRpbmcgemVyb3NcdDEgdGhyb3VnaCAxMlxuICAgIE06IEEgc2hvcnQgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIG1vbnRoXHRKYW4gdGhyb3VnaCBEZWNcbiAgICBVOiBUaGUgbnVtYmVyIG9mIHNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2hcdDE0MTM3MDQ5OTNcbiAgICB5OiBBIHR3byBkaWdpdCByZXByZXNlbnRhdGlvbiBvZiBhIHllYXJcdDk5IG9yIDAzXG4gICAgWTogQSBmdWxsIG51bWVyaWMgcmVwcmVzZW50YXRpb24gb2YgYSB5ZWFyLCA0IGRpZ2l0c1x0MTk5OSBvciAyMDAzXG4gICAgSDogSG91cnMgKDI0IGhvdXJzKVx0MDAgdG8gMjNcbiAgICBoOiBIb3Vyc1x0MSB0byAxMlxuICAgIGk6IE1pbnV0ZXNcdDAwIHRvIDU5XG4gICAgUzogU2Vjb25kcywgMiBkaWdpdHNcdDAwIHRvIDU5XG4gICAgczogU2Vjb25kc1x0MCwgMSB0byA1OVxuICAgIEs6IEFNL1BNXHRBTSBvciBQTVxuICAqL1xuICBsZXQgbWFwOiBzdHJpbmc7XG4gIHN3aXRjaCAoZmllbGRUeXBlKSB7XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWU6XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc286XG4gICAgICBtYXAgPSAnWS1tLWQgSDppOlMnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc29BbVBtOlxuICAgICAgbWFwID0gJ1ktbS1kIGg6aTpTIEsnOyAvLyB0aGVyZSBpcyBubyBsb3dlcmNhc2UgaW4gRmxhdHBpY2tyIDooXG4gICAgICBicmVhaztcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FNX1BNOlxuICAgICAgbWFwID0gJ1ktbS1kIGg6aTpTIEsnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzOlxuICAgICAgbWFwID0gJ20vZC9ZJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVc1Nob3J0OlxuICAgICAgbWFwID0gJ20vZC95JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXM6XG4gICAgICBtYXAgPSAnbS9kL1kgSDppOlMnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc0FtUG06XG4gICAgICBtYXAgPSAnbS9kL1kgaDppOlMgSyc7IC8vIHRoZXJlIGlzIG5vIGxvd2VyY2FzZSBpbiBGbGF0cGlja3IgOihcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBTV9QTTpcbiAgICAgIG1hcCA9ICdtL2QvWSBoOmk6cyBLJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNTaG9ydDpcbiAgICAgIG1hcCA9ICdtL2QveSBIOmk6cyc7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnRBbVBtOlxuICAgICAgbWFwID0gJ20vZC95IGg6aTpzIEsnOyAvLyB0aGVyZSBpcyBubyBsb3dlcmNhc2UgaW4gRmxhdHBpY2tyIDooXG4gICAgICBicmVhaztcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXRjOlxuICAgICAgbWFwID0gJ1onO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZTpcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlSXNvOlxuICAgIGRlZmF1bHQ6XG4gICAgICBtYXAgPSAnWS1tLWQnO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn1cblxuLyoqXG4gKiBNYXBwZXIgZm9yIHF1ZXJ5IG9wZXJhdG9ycyAoZXguOiA8PSBpcyBcImxlXCIsID4gaXMgXCJndFwiKVxuICogQHBhcmFtIHN0cmluZyBvcGVyYXRvclxuICogQHJldHVybnMgc3RyaW5nIG1hcFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwT3BlcmF0b3JUeXBlKG9wZXJhdG9yOiBzdHJpbmcpOiBPcGVyYXRvclR5cGUge1xuICBsZXQgbWFwOiBPcGVyYXRvclR5cGU7XG5cbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgJzwnOlxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmxlc3NUaGFuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnPD0nOlxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmxlc3NUaGFuT3JFcXVhbDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJz4nOlxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmdyZWF0ZXJUaGFuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnPj0nOlxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmdyZWF0ZXJUaGFuT3JFcXVhbDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJzw+JzpcbiAgICBjYXNlICchPSc6XG4gICAgY2FzZSAnbmVxJzpcbiAgICBjYXNlICdORVEnOlxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLm5vdEVxdWFsO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnKic6XG4gICAgY2FzZSAnLionOlxuICAgIGNhc2UgJ3N0YXJ0c1dpdGgnOlxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLnN0YXJ0c1dpdGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICcqLic6XG4gICAgY2FzZSAnZW5kc1dpdGgnOlxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmVuZHNXaXRoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnPSc6XG4gICAgY2FzZSAnPT0nOlxuICAgIGNhc2UgJ2VxJzpcbiAgICBjYXNlICdFUSc6XG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuZXF1YWw7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbic6XG4gICAgY2FzZSAnSU4nOlxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmluO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbm90SW4nOlxuICAgIGNhc2UgJ05JTic6XG4gICAgY2FzZSAnTk9UX0lOJzpcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5ub3RJbjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuY29udGFpbnM7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBtYXA7XG59XG5cbi8qKlxuICogTWFwcGVyIGZvciBxdWVyeSBvcGVyYXRvciBieSBhIEZpbHRlciBUeXBlXG4gKiBGb3IgZXhhbXBsZSBhIG11bHRpcGxlLXNlbGVjdCB0eXBpY2FsbHkgdXNlcyAnSU4nIG9wZXJhdG9yXG4gKiBAcGFyYW0gb3BlcmF0b3JcbiAqIEByZXR1cm5zIHN0cmluZyBtYXBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcE9wZXJhdG9yQnlGaWVsZFR5cGUoZmllbGRUeXBlOiBGaWVsZFR5cGUgfCBzdHJpbmcpOiBPcGVyYXRvclR5cGUge1xuICBsZXQgbWFwOiBPcGVyYXRvclR5cGU7XG5cbiAgc3dpdGNoIChmaWVsZFR5cGUpIHtcbiAgICBjYXNlIEZpZWxkVHlwZS5zdHJpbmc6XG4gICAgY2FzZSBGaWVsZFR5cGUudW5rbm93bjpcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5jb250YWlucztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgRmllbGRUeXBlLmZsb2F0OlxuICAgIGNhc2UgRmllbGRUeXBlLm51bWJlcjpcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlOlxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVJc286XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZTpcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXRjOlxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lOlxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lSXNvOlxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lSXNvQW1QbTpcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FNX1BNOlxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVczpcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXNTaG9ydDpcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzOlxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBbVBtOlxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBTV9QTTpcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnQ6XG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0QW1QbTpcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnRBTV9QTTpcbiAgICBkZWZhdWx0OlxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmVxdWFsO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gbWFwO1xufVxuXG4vKipcbiAqIFBhcnNlIGEgZGF0ZSBwYXNzZWQgYXMgYSBzdHJpbmcgYW5kIHJldHVybiBhIERhdGUgb2JqZWN0IChpZiB2YWxpZClcbiAqIEBwYXJhbSBpbnB1dERhdGVTdHJpbmdcbiAqIEByZXR1cm5zIHN0cmluZyBkYXRlIGZvcm1hdHRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVdGNEYXRlKGlucHV0RGF0ZVN0cmluZzogc3RyaW5nLCB1c2VVdGM6IGJvb2xlYW4pOiBzdHJpbmcgfCBudWxsIHtcbiAgbGV0IGRhdGUgPSBudWxsO1xuXG4gIGlmICgvXlswLTlcXC1cXC9dKiQvLnRlc3QoaW5wdXREYXRlU3RyaW5nKSkge1xuICAgIC8vIGdldCB0aGUgVVRDIGRhdGV0aW1lIHdpdGggbW9tZW50LmpzIGJ1dCB3ZSBuZWVkIHRvIGRlY29kZSB0aGUgdmFsdWUgc28gdGhhdCBpdCdzIHZhbGlkIHRleHRcbiAgICBjb25zdCBkYXRlU3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0RGF0ZVN0cmluZyk7XG4gICAgY29uc3QgZGF0ZU1vbWVudCA9IG1vbWVudChuZXcgRGF0ZShkYXRlU3RyaW5nKSk7XG4gICAgaWYgKGRhdGVNb21lbnQuaXNWYWxpZCgpICYmIGRhdGVNb21lbnQueWVhcigpLnRvU3RyaW5nKCkubGVuZ3RoID09PSA0KSB7XG4gICAgICBkYXRlID0gKHVzZVV0YykgPyBkYXRlTW9tZW50LnV0YygpLmZvcm1hdCgpIDogZGF0ZU1vbWVudC5mb3JtYXQoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0ZTtcbn1cblxuLyoqXG4gKiBTYW5pdGl6ZSwgcmV0dXJuIG9ubHkgdGhlIHRleHQgd2l0aG91dCBIVE1MIHRhZ3NcbiAqIEBpbnB1dCBodG1sU3RyaW5nXG4gKiBAcmV0dXJuIHRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplSHRtbFRvVGV4dChodG1sU3RyaW5nOiBzdHJpbmcpIHtcbiAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0ZW1wLmlubmVySFRNTCA9IGh0bWxTdHJpbmc7XG4gIHJldHVybiB0ZW1wLnRleHRDb250ZW50IHx8IHRlbXAuaW5uZXJUZXh0O1xufVxuXG4vKipcbiAqIFRpdGxlIGNhc2UgdGhlIGNvbXBsZXRlIHNlbnRlbmNlICh1cHBlciBjYXNlIGZpcnN0IGNoYXIgb2YgZWFjaCB3b3JkIHdoaWxlIGNoYW5naW5nIGV2ZXJ5dGhpbmcgZWxzZSB0byBsb3dlciBjYXNlKVxuICogQHBhcmFtIHN0cmluZ1xuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aXRsZUNhc2Uoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBzdHJpbmcgdG8gY2FtZWwgY2FzZVxuICogQHBhcmFtIHN0ciB0aGUgc3RyaW5nIHRvIGNvbnZlcnRcbiAqIEByZXR1cm4gdGhlIHN0cmluZyBpbiBjYW1lbCBjYXNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvKD86Xlxcd3xbQS1aXXxcXGJcXHd8W1xccytcXC1fXFwvXSkvZywgKG1hdGNoOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKSA9PiB7XG4gICAgLy8gcmVtb3ZlIHdoaXRlIHNwYWNlIG9yIGh5cGVucyBvciB1bmRlcnNjb3Jlc1xuICAgIGlmICgvW1xccytcXC1fXFwvXS8udGVzdChtYXRjaCkpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0ID09PSAwID8gbWF0Y2gudG9Mb3dlckNhc2UoKSA6IG1hdGNoLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGtlYmFiIChoeXBlbikgY2FzZVxuICogQHBhcmFtIHN0ciB0aGUgc3RyaW5nIHRvIGNvbnZlcnRcbiAqIEByZXR1cm4gdGhlIHN0cmluZyBpbiBrZWJhYiBjYXNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0tlYmFiQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB0b0NhbWVsQ2FzZShzdHIpLnJlcGxhY2UoLyhbQS1aXSkvZywgJy0kMScpLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8qKlxuICogVGFrZXMgYW4gaW5wdXQgYXJyYXkgYW5kIG1ha2VzIHN1cmUgdGhlIGFycmF5IGhhcyB1bmlxdWUgdmFsdWVzIGJ5IHJlbW92aW5nIGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSBhcnJheSBpbnB1dCB3aXRoIHBvc3NpYmxlIGR1cGxpY2F0ZXNcbiAqIEByZXR1cm4gYXJyYXkgb3V0cHV0IHdpdGhvdXQgZHVwbGljYXRlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcbiAgcmV0dXJuIGFyci5maWx0ZXIoKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBhcnIuaW5kZXhPZihpdGVtKSA+PSBpbmRleDtcbiAgfSk7XG59XG5cbi8qKlxuICogVW5zdWJzY3JpYmUgYWxsIE9ic2VydmFibGVzIFN1YnNjcmlwdGlvbnNcbiAqIEl0IHdpbGwgcmV0dXJuIGFuIGVtcHR5IGFycmF5IGlmIGl0IGFsbCB3ZW50IHdlbGxcbiAqIEBwYXJhbSBzdWJzY3JpcHRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdKTogU3Vic2NyaXB0aW9uW10ge1xuICBpZiAoQXJyYXkuaXNBcnJheShzdWJzY3JpcHRpb25zKSkge1xuICAgIHN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pID0+IHtcbiAgICAgIGlmIChzdWJzY3JpcHRpb24gJiYgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgfVxuXG4gIHJldHVybiBzdWJzY3JpcHRpb25zO1xufVxuIl19