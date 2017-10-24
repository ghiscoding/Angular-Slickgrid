import { OperatorType } from '../models/operatorType';
/**
 * Parse a date passed as a string and return a Date object (if valid)
 * @param string inputDateString
 * @returns object Date
 */
export declare function parseUtcDate(inputDateString: string, useUtc: boolean): Date;
/**
  * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
  * @param string operator
  * @returns string map
  */
export declare function mapOperatorType(operator: string): OperatorType;
