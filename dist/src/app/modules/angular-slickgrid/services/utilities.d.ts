import { FieldType, OperatorType, FilterType, FormElementType } from '../models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
/** Simple function to which will loop and create as demanded the number of white spaces,
 * this will be used in the Excel export
 * @param int nbSpaces: number of white spaces to create
 */
export declare function addWhiteSpaces(nbSpaces: any): string;
/** decode text into html entity
 * @param string text: input text
 * @param string text: output text
 */
export declare function htmlEntityDecode(input: string): string;
/** decode text into html entity
 * @param string text: input text
 * @param string text: output text
 */
export declare function htmlEntityEncode(input: any): string;
/**
 * Try casting an input of type Promise | Observable into a Promise type.
 * @param object which could be of type Promise or Observable
 * @param fromServiceName string representing the caller service name and will be used if we throw a casting problem error
 */
export declare function castToPromise<T>(input: Promise<T> | Observable<T>, fromServiceName?: string): Promise<T>;
/**
 * From a Date FieldType, return it's equivalent moment.js format
 * refer to moment.js for the format standard used: https://momentjs.com/docs/#/parsing/string-format/
 * @param fieldType
 */
export declare function mapMomentDateFormatWithFieldType(fieldType: FieldType): string;
/**
 * From a Date FieldType, return it's equivalent Flatpickr format
 * refer to Flatpickr for the format standard used: https://chmln.github.io/flatpickr/formatting/#date-formatting-tokens
 * also note that they seem very similar to PHP format (except for am/pm): http://php.net/manual/en/function.date.php
 * @param fieldType
 */
export declare function mapFlatpickrDateFormatWithFieldType(fieldType: FieldType): string;
/**
 * Mapper for query operators (ex.: <= is "le", > is "gt")
 * @param string operator
 * @returns string map
 */
export declare function mapOperatorType(operator: string): OperatorType;
/**
 * Mapper for query operator by a Filter Type
 * For example a multiple-select typically uses 'IN' operator
 * @param operator
 * @returns string map
 */
export declare function mapOperatorByFieldType(fieldType: FieldType | string): OperatorType;
/**
 * Mapper for query operator by a Filter Type
 * For example a multiple-select typically uses 'IN' operator
 * @param operator
 * @returns string map
 */
export declare function mapOperatorByFilterType(filterType: FilterType | FormElementType | string): OperatorType;
/**
 * Parse a date passed as a string and return a Date object (if valid)
 * @param inputDateString
 * @returns string date formatted
 */
export declare function parseUtcDate(inputDateString: string, useUtc: boolean): string | null;
/**
 * Converts a string to camel case
 * @param str the string to convert
 * @return the string in camel case
 */
export declare function toCamelCase(str: string): string;
/**
 * Converts a string to kebab (hypen) case
 * @param str the string to convert
 * @return the string in kebab case
 */
export declare function toKebabCase(str: string): string;
