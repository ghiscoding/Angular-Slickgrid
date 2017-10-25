import { OperatorType } from '../models/operatorType';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
/**
 * Try casting an input of type Promise | Observable into a Promise type.
 * @param input object which could be of type Promise or Observable
 * @param fromServiceName string representing the caller service name and will be used if we throw a casting problem error
 */
export declare function castToPromise(input: Promise<any> | Observable<any>, fromServiceName?: string): Promise<any> | Observable<any>;
/**
  * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
  * @param string operator
  * @returns string map
  */
export declare function mapOperatorType(operator: string): OperatorType;
/**
 * Parse a date passed as a string and return a Date object (if valid)
 * @param string inputDateString
 * @returns object Date
 */
export declare function parseUtcDate(inputDateString: string, useUtc: boolean): Date;
