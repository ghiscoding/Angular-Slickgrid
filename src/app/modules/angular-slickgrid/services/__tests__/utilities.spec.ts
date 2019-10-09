import {
  addToArrayWhenNotExists,
  addWhiteSpaces,
  castToPromise,
  charArraysEqual,
  decimalFormatted,
  findOrDefault,
  formatNumber,
  getDescendantProperty,
  htmlDecode,
  htmlEncode,
  htmlEntityDecode,
  htmlEntityEncode,
  mapMomentDateFormatWithFieldType,
  mapFlatpickrDateFormatWithFieldType,
  mapOperatorType,
  mapOperatorByFieldType,
  parseBoolean,
  parseUtcDate,
  sanitizeHtmlToText,
  setDeepValue,
  titleCase,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  uniqueArray,
  uniqueObjectArray,
  unsubscribeAllObservables,
} from '../utilities';
import { FieldType, OperatorType } from '../../models';
import { of, Subscription } from 'rxjs';

describe('Service/Utilies', () => {
  describe('addToArrayWhenNotExists', () => {
    it('should add an item to the array when input item has an "id" and is not in the array', () => {
      const array = [{ id: 1, firstName: 'John' }];
      addToArrayWhenNotExists(array, { id: 2, firstName: 'Jane' });
      expect(array).toEqual([{ id: 1, firstName: 'John' }, { id: 2, firstName: 'Jane' }]);
    });

    it('should add an item to the array when input item is not an object and and is not in the array', () => {
      const array = ['John'];
      addToArrayWhenNotExists(array, 'Jane');
      expect(array).toEqual(['John', 'Jane']);
    });

    it('should NOT add an item to the array when input item has an "id" and is not in the array', () => {
      const array = [{ id: 1, firstName: 'John' }];
      addToArrayWhenNotExists(array, { id: 1, firstName: 'John' });
      expect(array).toEqual([{ id: 1, firstName: 'John' }]);
    });

    it('should NOT add an item to the array when input item is not an object and and is not in the array', () => {
      const array = [0];
      addToArrayWhenNotExists(array, 0);
      expect(array).toEqual([0]);
    });
  });

  describe('addWhiteSpaces method', () => {
    it('should return the an empty string when argument provided is lower or equal to 0', () => {
      expect(addWhiteSpaces(-2)).toBe('');
      expect(addWhiteSpaces(0)).toBe('');
    });

    it('should return the a simple string with x spaces only where x is the number of spaces provided as argument', () => {
      expect(addWhiteSpaces(5)).toBe('     ');
    });
  });

  describe('htmlDecode method', () => {
    it('should return a decoded HTML string', () => {
      const result = htmlDecode(`&lt;div class=&quot;color: blue&quot;&gt;Something&lt;/div&gt;`);
      expect(result).toBe(`<div class="color: blue">Something</div>`);
    });

    it('should return a decoded HTML string with single quotes encoded as well', () => {
      const result = htmlDecode(`&lt;div class=&#39;color: blue&#39;&gt;Something&lt;/div&gt;`);
      expect(result).toBe(`<div class='color: blue'>Something</div>`);
    });

    it('should use jQuery and return a decoded HTML string with single quotes encoded as well when DOMParser is not available in older browser', () => {
      DOMParser = undefined;
      const result = htmlDecode(`&lt;div class=&#39;color: blue&#39;&gt;Something&lt;/div&gt;`);
      expect(result).toBe(`<div class='color: blue'>Something</div>`);
    });
  });

  describe('htmlEncode method', () => {
    it('should return a encoded HTML string', () => {
      const result = htmlEncode(`<div class="color: blue">Something</div>`);
      expect(result).toBe(`&lt;div class=&quot;color: blue&quot;&gt;Something&lt;/div&gt;`);
    });

    it('should return a encoded HTML string with single quotes encoded as well', () => {
      const result = htmlEncode(`<div class='color: blue'>Something</div>`);
      expect(result).toBe(`&lt;div class=&#39;color: blue&#39;&gt;Something&lt;/div&gt;`);
    });
  });

  describe('htmlEntityDecode method', () => {
    it('should be able to decode HTML entity of an HTML string', () => {
      const result = htmlEntityDecode(`&#60;&#100;&#105;&#118;&#62;&#97;&#60;&#47;&#100;&#105;&#118;&#62;`);
      expect(result).toBe(`<div>a</div>`);
    });

    it('should be able to decode unicode characters and also latin accents', () => {
      const result = htmlEntityDecode(`&#83;&#97;&#109;&#39;&#115;&#32;&#55357;&#56960;&#55358;&#56708;&#32;&#101;&#115;&#112;&#97;&#241;&#111;&#108;`);
      expect(result).toBe(`Sam's 🚀🦄 español`);
    });
  });

  describe('htmlEntityEncode method', () => {
    it('should be able to encode HTML entity of an HTML string', () => {
      const result = htmlEntityEncode(`<div>a</div>`);
      expect(result).toBe(`&#60;&#100;&#105;&#118;&#62;&#97;&#60;&#47;&#100;&#105;&#118;&#62;`);
    });

    it('should be able to encode unicode characters and also latin accents', () => {
      const result = htmlEntityEncode(`Sam's 🚀🦄 español`);
      expect(result).toBe(`&#83;&#97;&#109;&#39;&#115;&#32;&#55357;&#56960;&#55358;&#56708;&#32;&#101;&#115;&#112;&#97;&#241;&#111;&#108;`);
    });
  });

  describe('arraysEqual method', () => {
    it('should return false when at least 1 input is not an array', () => {
      const array1 = null;
      const array2 = [];
      const isEqual = charArraysEqual(array1, array2);
      expect(isEqual).toBe(false);
    });

    it('should compare 2 empty arrays and return true', () => {
      const array1 = [];
      const array2 = [];
      const isEqual = charArraysEqual(array1, array2);
      expect(isEqual).toBe(true);
    });

    it('should compare 2 arrays of chars with different length and return false', () => {
      const array1 = ['a', 'b'];
      const array2 = ['a', 'b', 'c'];
      const isEqual = charArraysEqual(array1, array2);
      expect(isEqual).toBe(false);
    });

    it('should compare 2 arrays of chars with same content in different order and return true', () => {
      const array1 = ['a', 'b', 'c'];
      const array2 = ['a', 'c', 'b'];
      const isEqual = charArraysEqual(array1, array2);
      expect(isEqual).toBe(true);
    });

    it('should compare 2 arrays of chars with same content in different order and return true', () => {
      const array1 = ['a', 'b', 'c'];
      const array2 = ['a', 'c', 'b'];
      const array3 = ['a', 'b', 'c'];

      expect(charArraysEqual(array1, array2, true)).toBe(false);
      expect(charArraysEqual(array1, array3, true)).toBe(true);
    });

    it('should not work when comparing 2 arrays of objects and return false', () => {
      const array1 = [{ id: 1, name: 'a', order: 3 }, { id: 2, name: 'def', order: 45 }];
      const array2 = [{ id: 1, name: 'a', order: 3 }, { id: 2, name: 'def', order: 45 }];
      const isEqual = charArraysEqual(array1, array2);
      expect(isEqual).toBe(false);
    });
  });

  describe('castToPromise method', () => {
    it('should throw an error when argument provided is not a Promise neither an Observable', async () => {
      expect(() => castToPromise(null)).toThrowError('Something went wrong,');
    });

    it('should return original Promise when argument is already a Promise', async () => {
      const promise = new Promise((resolve) => setTimeout(() => resolve('hello'), 1));
      const castPromise = castToPromise(promise);
      expect(promise).toBe(castPromise);
    });

    it('should be able to cast an Observable to a Promise', () => {
      const inputArray = ['hello', 'world'];
      const observable = of(inputArray);

      castToPromise(observable).then((outputArray) => {
        expect(outputArray).toBe(inputArray);
      });
    });
  });

  describe('findOrDefault method', () => {
    it('should find an element in the array given a provided logic to find such element', () => {
      const collection = ['a', 'c', 'b', 1];
      const searchValue = 'c';
      const output = findOrDefault(collection, (val) => val === searchValue);
      expect(output).toBe(searchValue);
    });

    it('should find an object in an array of objects given a provided logic to find such element', () => {
      const collection = [{ id: 1, name: 'a', order: 3 }, { id: 2, name: 'def', order: 45 }, { id: 3, name: 'xyz', order: 99 }];
      const searchProperty = 'id';
      const searchId = 2;

      const output = findOrDefault(collection, (item) => {
        if (item && item.hasOwnProperty(searchProperty)) {
          return item[searchProperty] === searchId;
        }
        return false;
      });

      expect(output).toEqual({ id: 2, name: 'def', order: 45 });
    });

    it('should return default value when element is not found in the array', () => {
      const collection = ['a', 'c', 'b', 1];
      const searchValue = 'z';
      const defaultValue = 'a';
      const output = findOrDefault(collection, ((val) => val === searchValue), defaultValue);
      expect(output).toBe(defaultValue);
    });
  });

  describe('decimalFormatted method', () => {
    it('should return original input when the argument is not a number', () => {
      const input = 'abc';
      const output = decimalFormatted(input, 2, 2);
      expect(output).toBe(input);
    });

    it('should return a string with a number formatted with 2 decimals when only a number is provided', () => {
      const input = 123;
      const output = decimalFormatted(input);
      expect(output).toBe('123.00');
    });

    it('should return a string with a number formatted with 2 decimals when the number provided is a string', () => {
      const input = '456';
      const output = decimalFormatted(input);
      expect(output).toBe('456.00');
    });

    it('should return a string without any decimals when the minDecimal is set to 0 and the provided is an integer', () => {
      const input = '456';
      const output = decimalFormatted(input, 0);
      expect(output).toBe('456');
    });

    it('should return a string with a number formatted and rounded to 4 decimals when maxDecimal is set to 4 and the number provided has extra decimals', () => {
      const input = 456.4567899;
      const output = decimalFormatted(input, 0, 4);
      expect(output).toBe('456.4568');
    });

    it('should return a string with a number formatted to 2 decimals minDecimal is set to 2 and maxDecimal is set to any number greater than 2', () => {
      const input = 456.4;
      const output = decimalFormatted(input, 2, 4);
      expect(output).toBe('456.40');
    });

    it('should return a string with a negative number formatted to 2 decimals minDecimal is set to 2', () => {
      const input = -456.4;
      const output = decimalFormatted(input, 2, 4);
      expect(output).toBe('-456.40');
    });
  });

  describe('formatNumber method', () => {
    it('should return original value when input provided is not a number', () => {
      const input = 'abc';
      const output = formatNumber(input);
      expect(output).toBe(input);
    });

    it('should return a string with a number formatted to 2 decimals when minDecimal is set to 2', () => {
      const input = 123;
      const output = formatNumber(input, 2);
      expect(output).toBe('123.00');
    });

    it('should return a string with a number formatted and rounded to 4 decimals when maxDecimal is set to 4 and the number provided has extra decimals', () => {
      const input = 456.4567899;
      const output = formatNumber(input, 0, 4);
      expect(output).toBe('456.4568');
    });

    it('should return a string without decimals when these arguments are null or undefined and the input provided is an integer', () => {
      const input = 456;
      const output1 = formatNumber(input);
      const output2 = formatNumber(input, null, null);
      const output3 = formatNumber(input, undefined, undefined);

      expect(output1).toBe('456');
      expect(output2).toBe('456');
      expect(output3).toBe('456');
    });

    it('should return a formatted string wrapped in parentheses when the input number is negative and the displayNegativeNumberWithParentheses argument is enabled', () => {
      const input = -123;
      const displayNegativeNumberWithParentheses = true;
      const output = formatNumber(input, 2, 2, displayNegativeNumberWithParentheses);
      expect(output).toBe('(123.00)');
    });

    it('should return a formatted currency string when the input number is negative and symbol prefix is provided', () => {
      const input = -123;
      const displayNegativeNumberWithParentheses = false;
      const currencyPrefix = '$';
      const output = formatNumber(input, 2, 2, displayNegativeNumberWithParentheses, currencyPrefix);
      expect(output).toBe('-$123.00');
    });

    it('should return a formatted currency string with symbol prefix/suffix wrapped in parentheses when the input number is negative, when all necessary arguments are filled', () => {
      const input = -123;
      const displayNegativeNumberWithParentheses = true;
      const currencyPrefix = '$';
      const currencySuffix = ' CAD';
      const output = formatNumber(input, 2, 2, displayNegativeNumberWithParentheses, currencyPrefix, currencySuffix);
      expect(output).toBe('($123.00 CAD)');
    });

    it('should return a formatted currency string with symbol prefix/suffix but without decimals when these arguments are not provided, then wrapped in parentheses when the input number is negative, when all necessary arguments are filled', () => {
      const input = -123;
      const displayNegativeNumberWithParentheses = true;
      const currencyPrefix = '$';
      const currencySuffix = ' CAD';
      const output = formatNumber(input, null, null, displayNegativeNumberWithParentheses, currencyPrefix, currencySuffix);
      expect(output).toBe('($123 CAD)');
    });
  });

  describe('getDescendantProperty method', () => {
    let obj = {};
    beforeEach(() => {
      obj = { id: 1, user: { firstName: 'John', lastName: 'Doe', address: { number: 123, street: 'Broadway' } } };
    });

    it('should return undefined when search argument is not part of the input object', () => {
      const output = getDescendantProperty(obj, 'users');
      expect(output).toBe(undefined);
    });

    it('should return the object descendant even when path given is not a dot notation', () => {
      const output = getDescendantProperty(obj, 'user');
      expect(output).toEqual(obj['user']);
    });

    it('should return the object descendant when using dot notation', () => {
      const output = getDescendantProperty(obj, 'user.firstName');
      expect(output).toEqual('John');
    });

    it('should return the object descendant when using multiple levels of dot notation', () => {
      const output = getDescendantProperty(obj, 'user.address.street');
      expect(output).toEqual('Broadway');
    });
  });

  describe('mapMomentDateFormatWithFieldType method', () => {
    it('should return a moment.js dateTime/dateTimeIso format', () => {
      const output1 = mapMomentDateFormatWithFieldType(FieldType.dateTime);
      const output2 = mapMomentDateFormatWithFieldType(FieldType.dateTimeIso);
      expect(output1).toBe('YYYY-MM-DD HH:mm:ss');
      expect(output2).toBe('YYYY-MM-DD HH:mm:ss');
    });

    it('should return a moment.js dateTimeShortIso format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeShortIso);
      expect(output).toBe('YYYY-MM-DD HH:mm');
    });

    it('should return a moment.js dateTimeIsoAmPm format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeIsoAmPm);
      expect(output).toBe('YYYY-MM-DD hh:mm:ss a');
    });

    it('should return a moment.js dateTimeIsoAM_PM format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeIsoAM_PM);
      expect(output).toBe('YYYY-MM-DD hh:mm:ss A');
    });

    it('should return a moment.js dateEuro format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateEuro);
      expect(output).toBe('DD/MM/YYYY');
    });

    it('should return a moment.js dateEuroShort format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateEuroShort);
      expect(output).toBe('D/M/YY');
    });

    it('should return a moment.js dateTimeEuro format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeEuro);
      expect(output).toBe('DD/MM/YYYY HH:mm:ss');
    });

    it('should return a moment.js dateTimeShortEuro format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeShortEuro);
      expect(output).toBe('DD/MM/YYYY HH:mm');
    });

    it('should return a moment.js dateTimeEuroAmPm format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeEuroAmPm);
      expect(output).toBe('DD/MM/YYYY hh:mm:ss a');
    });

    it('should return a moment.js dateTimeEuroAM_PM format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeEuroAM_PM);
      expect(output).toBe('DD/MM/YYYY hh:mm:ss A');
    });

    it('should return a moment.js dateTimeEuroShort format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeEuroShort);
      expect(output).toBe('D/M/YY H:m:s');
    });

    it('should return a moment.js dateTimeEuroShortAmPm format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeEuroShortAmPm);
      expect(output).toBe('D/M/YY h:m:s a');
    });

    it('should return a moment.js dateUs format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateUs);
      expect(output).toBe('MM/DD/YYYY');
    });

    it('should return a moment.js dateUsShort format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);
      expect(output).toBe('M/D/YY');
    });

    it('should return a moment.js dateTimeUs format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeUs);
      expect(output).toBe('MM/DD/YYYY HH:mm:ss');
    });

    it('should return a moment.js dateTimeShortUs format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeShortUs);
      expect(output).toBe('MM/DD/YYYY HH:mm');
    });

    it('should return a moment.js dateTimeUsAmPm format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeUsAmPm);
      expect(output).toBe('MM/DD/YYYY hh:mm:ss a');
    });

    it('should return a moment.js dateTimeUsAM_PM format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeUsAM_PM);
      expect(output).toBe('MM/DD/YYYY hh:mm:ss A');
    });

    it('should return a moment.js dateTimeUsShort format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeUsShort);
      expect(output).toBe('M/D/YY H:m:s');
    });

    it('should return a moment.js dateTimeUsShortAmPm format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateTimeUsShortAmPm);
      expect(output).toBe('M/D/YY h:m:s a');
    });

    it('should return a moment.js dateUtc format', () => {
      const output = mapMomentDateFormatWithFieldType(FieldType.dateUtc);
      expect(output).toBe('YYYY-MM-DDTHH:mm:ss.SSSZ');
    });

    it('should return a moment.js date/dateIso format', () => {
      const output1 = mapMomentDateFormatWithFieldType(FieldType.date);
      const output2 = mapMomentDateFormatWithFieldType(FieldType.dateIso);
      expect(output1).toBe('YYYY-MM-DD');
      expect(output2).toBe('YYYY-MM-DD');
    });
  });

  describe('mapFlatpickrDateFormatWithFieldType method', () => {
    it('should return a Flatpickr dateTime format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTime);
      expect(output).toBe('Y-m-d H:i:S');
    });

    it('should return a Flatpickr dateTimeShortIso format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeShortIso);
      expect(output).toBe('Y-m-d H:i');
    });

    it('should return a Flatpickr dateTimeIsoAmPm/dateTimeIsoAM_PM format', () => {
      const output1 = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeIsoAmPm);
      const output2 = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeIsoAM_PM);
      expect(output1).toBe('Y-m-d h:i:S K');
      expect(output2).toBe('Y-m-d h:i:S K');
    });

    it('should return a Flatpickr dateEuro format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateEuro);
      expect(output).toBe('d/m/Y');
    });

    it('should return a Flatpickr dateEuroShort format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateEuroShort);
      expect(output).toBe('d/m/y');
    });

    it('should return a Flatpickr dateTimeEuro format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeEuro);
      expect(output).toBe('d/m/Y H:i:S');
    });

    it('should return a Flatpickr dateTimeShortEuro format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeShortEuro);
      expect(output).toBe('d/m/y H:i');
    });

    it('should return a Flatpickr dateTimeEuroAmPm format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeEuroAmPm);
      expect(output).toBe('d/m/Y h:i:S K');
    });

    it('should return a Flatpickr dateTimeEuroAM_PM format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeEuroAM_PM);
      expect(output).toBe('d/m/Y h:i:s K');
    });

    it('should return a Flatpickr dateTimeEuroShort format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeEuroShort);
      expect(output).toBe('d/m/y H:i:s');
    });

    it('should return a Flatpickr dateTimeEuroShortAmPm format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeEuroShortAmPm);
      expect(output).toBe('d/m/y h:i:s K');
    });

    it('should return a Flatpickr dateUs format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateUs);
      expect(output).toBe('m/d/Y');
    });

    it('should return a Flatpickr dateUsShort format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateUsShort);
      expect(output).toBe('m/d/y');
    });

    it('should return a Flatpickr dateTimeUs format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeUs);
      expect(output).toBe('m/d/Y H:i:S');
    });

    it('should return a Flatpickr dateTimeShortUs format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeShortUs);
      expect(output).toBe('m/d/y H:i');
    });

    it('should return a Flatpickr dateTimeUsAmPm format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeUsAmPm);
      expect(output).toBe('m/d/Y h:i:S K');
    });

    it('should return a Flatpickr dateTimeUsAM_PM format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeUsAM_PM);
      expect(output).toBe('m/d/Y h:i:s K');
    });

    it('should return a Flatpickr dateTimeUsShort format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeUsShort);
      expect(output).toBe('m/d/y H:i:s');
    });

    it('should return a Flatpickr dateTimeUsShortAmPm format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateTimeUsShortAmPm);
      expect(output).toBe('m/d/y h:i:s K');
    });

    it('should return a Flatpickr dateUtc format', () => {
      const output = mapFlatpickrDateFormatWithFieldType(FieldType.dateUtc);
      expect(output).toBe('Z');
    });

    it('should return a Flatpickr dateédateIso format', () => {
      const output1 = mapFlatpickrDateFormatWithFieldType(FieldType.date);
      const output2 = mapFlatpickrDateFormatWithFieldType(FieldType.dateIso);
      expect(output1).toBe('Y-m-d');
      expect(output2).toBe('Y-m-d');
    });
  });

  describe('mapOperatorType method', () => {
    it('should return OperatoryType associated to "<"', () => {
      const output = mapOperatorType('<');
      expect(output).toBe(OperatorType.lessThan);
    });

    it('should return OperatoryType associated to "<="', () => {
      const output = mapOperatorType('<=');
      expect(output).toBe(OperatorType.lessThanOrEqual);
    });

    it('should return OperatoryType associated to ">"', () => {
      const output = mapOperatorType('>');
      expect(output).toBe(OperatorType.greaterThan);
    });

    it('should return OperatoryType associated to ">="', () => {
      const output = mapOperatorType('>=');
      expect(output).toBe(OperatorType.greaterThanOrEqual);
    });

    it('should return OperatoryType associated to "<>", "!=", "neq" or "NEQ"', () => {
      const output1 = mapOperatorType('<>');
      const output2 = mapOperatorType('!=');
      const output3 = mapOperatorType('neq');
      const output4 = mapOperatorType('NEQ');

      expect(output1).toBe(OperatorType.notEqual);
      expect(output2).toBe(OperatorType.notEqual);
      expect(output3).toBe(OperatorType.notEqual);
      expect(output4).toBe(OperatorType.notEqual);
    });

    it('should return OperatoryType associated to "*", "a*", ".*", "startsWith"', () => {
      const output1 = mapOperatorType('*');
      const output2 = mapOperatorType('.*');
      const output3 = mapOperatorType('a*');
      const output4 = mapOperatorType('startsWith');
      const output5 = mapOperatorType('StartsWith');

      expect(output1).toBe(OperatorType.startsWith);
      expect(output2).toBe(OperatorType.startsWith);
      expect(output3).toBe(OperatorType.startsWith);
      expect(output4).toBe(OperatorType.startsWith);
      expect(output5).toBe(OperatorType.startsWith);
    });

    it('should return OperatoryType associated to "*.", "*z", "endsWith"', () => {
      const output1 = mapOperatorType('*.');
      const output2 = mapOperatorType('*z');
      const output3 = mapOperatorType('endsWith');
      const output4 = mapOperatorType('EndsWith');

      expect(output1).toBe(OperatorType.endsWith);
      expect(output2).toBe(OperatorType.endsWith);
      expect(output3).toBe(OperatorType.endsWith);
      expect(output4).toBe(OperatorType.endsWith);
    });

    it('should return OperatoryType associated to "=", "==", "eq" or "EQ"', () => {
      const output1 = mapOperatorType('=');
      const output2 = mapOperatorType('==');
      const output3 = mapOperatorType('eq');
      const output4 = mapOperatorType('EQ');

      expect(output1).toBe(OperatorType.equal);
      expect(output2).toBe(OperatorType.equal);
      expect(output3).toBe(OperatorType.equal);
      expect(output4).toBe(OperatorType.equal);
    });

    it('should return OperatoryType associated to "in", "IN"', () => {
      const output1 = mapOperatorType('in');
      const output2 = mapOperatorType('IN');

      expect(output1).toBe(OperatorType.in);
      expect(output2).toBe(OperatorType.in);
    });

    it('should return OperatoryType associated to "notIn", "NIN", "NOT_IN"', () => {
      const output1 = mapOperatorType('notIn');
      const output2 = mapOperatorType('NIN');
      const output3 = mapOperatorType('NOT_IN');

      expect(output1).toBe(OperatorType.notIn);
      expect(output2).toBe(OperatorType.notIn);
      expect(output3).toBe(OperatorType.notIn);
    });

    it('should return OperatoryType associated to "not_contains", "Not_Contains", "notContains"', () => {
      const output1 = mapOperatorType('not_contains');
      const output2 = mapOperatorType('Not_Contains');
      const output3 = mapOperatorType('notContains');
      const output4 = mapOperatorType('NotContains');
      const output5 = mapOperatorType('NOT_CONTAINS');

      expect(output1).toBe(OperatorType.notContains);
      expect(output2).toBe(OperatorType.notContains);
      expect(output3).toBe(OperatorType.notContains);
      expect(output4).toBe(OperatorType.notContains);
      expect(output5).toBe(OperatorType.notContains);
    });

    it('should return default OperatoryType associated to contains', () => {
      const output1 = mapOperatorType('');
      const output2 = mapOperatorType('Contains');
      const output3 = mapOperatorType('CONTAINS');

      expect(output1).toBe(OperatorType.contains);
      expect(output2).toBe(OperatorType.contains);
      expect(output3).toBe(OperatorType.contains);
    });
  });

  describe('mapOperatorByFieldType method', () => {
    it('should return default OperatoryType associated to contains', () => {
      const output1 = mapOperatorByFieldType(FieldType.string);
      const output2 = mapOperatorByFieldType(FieldType.unknown);

      expect(output1).toBe(OperatorType.contains);
      expect(output2).toBe(OperatorType.contains);
    });

    it('should return default OperatoryType associated to equal', () => {
      const output2 = mapOperatorByFieldType(FieldType.float);
      const output3 = mapOperatorByFieldType(FieldType.number);
      const output4 = mapOperatorByFieldType(FieldType.date);
      const output5 = mapOperatorByFieldType(FieldType.dateIso);
      const output6 = mapOperatorByFieldType(FieldType.date);
      const output7 = mapOperatorByFieldType(FieldType.dateUtc);
      const output8 = mapOperatorByFieldType(FieldType.dateTime);
      const output9 = mapOperatorByFieldType(FieldType.dateTimeIso);
      const output10 = mapOperatorByFieldType(FieldType.dateTimeIsoAmPm);
      const output11 = mapOperatorByFieldType(FieldType.dateTimeIsoAM_PM);
      const output12 = mapOperatorByFieldType(FieldType.dateEuro);
      const output13 = mapOperatorByFieldType(FieldType.dateEuroShort);
      const output14 = mapOperatorByFieldType(FieldType.dateTimeEuro);
      const output15 = mapOperatorByFieldType(FieldType.dateTimeEuroAmPm);
      const output16 = mapOperatorByFieldType(FieldType.dateTimeEuroAM_PM);
      const output17 = mapOperatorByFieldType(FieldType.dateTimeEuroShort);
      const output18 = mapOperatorByFieldType(FieldType.dateTimeEuroShortAmPm);
      const output19 = mapOperatorByFieldType(FieldType.dateTimeEuroShortAM_PM);
      const output20 = mapOperatorByFieldType(FieldType.dateUs);
      const output21 = mapOperatorByFieldType(FieldType.dateUsShort);
      const output22 = mapOperatorByFieldType(FieldType.dateTimeUs);
      const output23 = mapOperatorByFieldType(FieldType.dateTimeUsAmPm);
      const output24 = mapOperatorByFieldType(FieldType.dateTimeUsAM_PM);
      const output25 = mapOperatorByFieldType(FieldType.dateTimeUsShort);
      const output26 = mapOperatorByFieldType(FieldType.dateTimeUsShortAmPm);
      const output27 = mapOperatorByFieldType(FieldType.dateTimeUsShortAM_PM);

      expect(output2).toBe(OperatorType.equal);
      expect(output3).toBe(OperatorType.equal);
      expect(output4).toBe(OperatorType.equal);
      expect(output5).toBe(OperatorType.equal);
      expect(output6).toBe(OperatorType.equal);
      expect(output7).toBe(OperatorType.equal);
      expect(output8).toBe(OperatorType.equal);
      expect(output9).toBe(OperatorType.equal);
      expect(output10).toBe(OperatorType.equal);
      expect(output11).toBe(OperatorType.equal);
      expect(output12).toBe(OperatorType.equal);
      expect(output13).toBe(OperatorType.equal);
      expect(output14).toBe(OperatorType.equal);
      expect(output15).toBe(OperatorType.equal);
      expect(output16).toBe(OperatorType.equal);
      expect(output17).toBe(OperatorType.equal);
      expect(output18).toBe(OperatorType.equal);
      expect(output19).toBe(OperatorType.equal);
      expect(output20).toBe(OperatorType.equal);
      expect(output21).toBe(OperatorType.equal);
      expect(output22).toBe(OperatorType.equal);
      expect(output23).toBe(OperatorType.equal);
      expect(output24).toBe(OperatorType.equal);
      expect(output25).toBe(OperatorType.equal);
      expect(output26).toBe(OperatorType.equal);
      expect(output27).toBe(OperatorType.equal);
    });

    it('should return default OperatoryType associated to contains', () => {
      const output = mapOperatorByFieldType('');
      expect(output).toBe(OperatorType.equal);
    });
  });

  describe('parseBoolean method', () => {
    it('should return false when input value is not parseable to a boolean', () => {
      const output = parseBoolean('abc');
      expect(output).toBe(false);
    });

    it('should return false when input value the string "false"', () => {
      const output = parseBoolean('false');
      expect(output).toBe(false);
    });

    it('should return true when input value the string "true" case insensitive', () => {
      const output1 = parseBoolean('true');
      const output2 = parseBoolean('TRUE');

      expect(output1).toBe(true);
      expect(output2).toBe(true);
    });

    it('should return true when input value is the boolean true', () => {
      const output = parseBoolean(true);
      expect(output).toBe(true);
    });

    it('should return true when input value is number 1', () => {
      const output = parseBoolean(1);
      expect(output).toBe(true);
    });

    it('should return false when input value is 0 or any other number', () => {
      const output1 = parseBoolean(0);
      const output2 = parseBoolean(2);
      const output3 = parseBoolean(-4);

      expect(output1).toBe(false);
      expect(output2).toBe(false);
      expect(output3).toBe(false);
    });
  });

  describe('parseUtcDate method', () => {
    it('should return null when date provided is not an ISO date (date only accepted)', () => {
      const input1 = '2012-01-01 02:02:02';
      const input2 = '2012-01-01T02:02:02Z';

      const output1 = parseUtcDate(input1);
      const output2 = parseUtcDate(input2);

      expect(output1).toBeNull();
      expect(output2).toBeNull();
    });

    it('should return a date parsed as UTC when input is a date (without time) of ISO format', () => {
      const input = '2012-01-01';
      const output = parseUtcDate(input, true);
      expect(output).toBe('2012-01-01T00:00:00Z');
    });
  });

  describe('sanitizeHtmlToText method', () => {
    it('should return original value when input does not include any HTML tags', () => {
      const input = 'foo bar';
      const output = sanitizeHtmlToText(input);
      expect(output).toBe('foo bar');
    });

    it('should return a string with only the HTML text content without any HTML tags', () => {
      const input = '<div class="color: blue">Something</div>';
      const output = sanitizeHtmlToText(input);
      expect(output).toBe('Something');
    });

    it('should return the script content without javascript script tags when a script is provided', () => {
      const input = '<script>alert("Hello World")</script>';
      const output = sanitizeHtmlToText(input);
      expect(output).toBe('alert("Hello World")');
    });
  });

  describe('setDeepValue method', () => {
    let obj = {};
    beforeEach(() => {
      obj = { id: 1, user: { firstName: 'John', lastName: 'Doe', address: { number: 123, street: 'Broadway' } } };
    });

    it('should be able to update an object at 2nd level deep property', () => {
      setDeepValue(obj, 'user.firstName', 'Jane');
      expect(obj['user'].firstName).toBe('Jane');
    });

    it('should be able to update an object at 3rd level deep property', () => {
      setDeepValue(obj, 'user.address.number', 78);
      expect(obj['user']['address']['number']).toBe(78);
    });

    it('should be able to update a property that is not a complex object', () => {
      setDeepValue(obj, 'id', 76);
      expect(obj['id']).toBe(76);
    });
  });

  describe('titleCase method', () => {
    const sentence = 'the quick brown fox';

    it('should return empty string when input is empty', () => {
      const output = titleCase('');
      expect(output).toBe('');
    });

    it('should return empty string when input is null', () => {
      const input = null;
      const output = titleCase(input);
      expect(output).toBe(null);
    });

    it('should return title case string that will uppercase each first char of every word', () => {
      const output = titleCase(sentence);
      expect(output).toBe('The quick brown fox');
    });

    it('should return title case string that will uppercase each first char of every word', () => {
      const caseEveryWords = true;
      const output = titleCase(sentence, caseEveryWords);
      expect(output).toBe('The Quick Brown Fox');
    });
  });

  describe('toCamelCase method', () => {
    const sentence = 'the quick brown fox';

    it('should return empty string when input is empty', () => {
      const output = toCamelCase('');
      expect(output).toBe('');
    });

    it('should return empty string when input is null', () => {
      const input = null;
      const output = toCamelCase(input);
      expect(output).toBe(null);
    });

    it('should return a camelCase string when input is a sentence', () => {
      const output = toCamelCase(sentence);
      expect(output).toBe('theQuickBrownFox');
    });

    it('should return a camelCase string when input is a sentence that may include numbers with next char being uppercase', () => {
      const output = toCamelCase(sentence + ' 123 ' + ' apples');
      expect(output).toBe('theQuickBrownFox123Apples');
    });
  });

  describe('toKebabCase method', () => {
    const sentence = 'the quick brown fox';

    it('should return empty string when input is empty', () => {
      const output = toKebabCase('');
      expect(output).toBe('');
    });

    it('should return empty string when input is null', () => {
      const input = null;
      const output = toKebabCase(input);
      expect(output).toBe(null);
    });

    it('should return a kebab-case string when input is a sentence', () => {
      const output = toKebabCase(sentence);
      expect(output).toBe('the-quick-brown-fox');
    });

    it('should return a kebab-case string when input is a sentence that may include numbers with only following char having the dash', () => {
      const output = toKebabCase(sentence + ' 123 ' + ' apples');
      expect(output).toBe('the-quick-brown-fox123-apples');
    });
  });

  describe('toSnakeCase method', () => {
    const sentence = 'the quick brown fox';

    it('should return empty string when input is empty', () => {
      const output = toSnakeCase('');
      expect(output).toBe('');
    });

    it('should return empty string when input is null', () => {
      const input = null;
      const output = toSnakeCase(input);
      expect(output).toBe(null);
    });

    it('should return a snake-case string when input is a sentence', () => {
      const output = toSnakeCase(sentence);
      expect(output).toBe('the_quick_brown_fox');
    });

    it('should return a snake_case string when input is a sentence that may include numbers with only following char having the dash', () => {
      const output = toSnakeCase(sentence + ' 123 ' + ' apples');
      expect(output).toBe('the_quick_brown_fox123_apples');
    });
  });

  describe('uniqueArray method', () => {
    it('should return original value when input is not an array', () => {
      const output1 = uniqueArray(null);
      const output2 = uniqueArray(undefined);

      expect(output1).toBeNull();
      expect(output2).toBe(undefined);
    });

    it('should return original array when array is empty', () => {
      const output = uniqueArray([]);
      expect(output).toEqual([]);
    });

    it('should return unique values when input array has duplicate string values', () => {
      const output = uniqueArray(['a', 'b', 'a']);
      expect(output).toEqual(['a', 'b']);
    });

    it('should return unique values when input array has duplicate number values', () => {
      const output = uniqueArray([1, 5, 2, 1, 5]);
      expect(output).toEqual([1, 5, 2]);
    });
  });

  describe('uniqueObjectArray method', () => {
    it('should return original value when input is not an array', () => {
      const output1 = uniqueObjectArray(null);
      const output2 = uniqueObjectArray(undefined);

      expect(output1).toBeNull();
      expect(output2).toBe(undefined);
    });

    it('should return original array when array is empty', () => {
      const output = uniqueObjectArray([]);
      expect(output).toEqual([]);
    });

    it('should return unique values when input array has duplicate objects', () => {
      const collection = [{ id: 9, name: 'a', order: 3 }, { id: 22, name: 'def', order: 45 }, { id: 9, name: 'a', order: 3 }];
      const output = uniqueObjectArray(collection, 'id');
      expect(output).toHaveLength(2);
    });
  });

  describe('unsubscribeAllObservables method', () => {
    it('should return original array when array of subscriptions is empty', () => {
      const output = unsubscribeAllObservables([]);
      expect(output).toEqual([]);
    });

    it('should return unique values when input array has duplicate objects', () => {
      const subscriptions: Subscription[] = [];
      const observable1 = of([1, 2]);
      const observable2 = of([1, 2]);
      subscriptions.push(observable1.subscribe(), observable2.subscribe());
      const output = unsubscribeAllObservables(subscriptions);
      expect(output).toHaveLength(0);
    });
  });
});
