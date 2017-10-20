import { OperatorType } from '../models/operatorType';
import * as moment_ from 'moment-mini';
const moment: any = (<any>moment_).default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

/**
 * Parse a date passed as a string and return a Date object (if valid)
 * @param string inputDateString
 * @returns object Date
 */
export function parseUtcDate(inputDateString: string, useUtc: boolean): Date {
  let date = null;

  if (/^[0-9\-\/]*$/.test(inputDateString)) {
    // get the UTC datetime with moment.js but we need to decode the value so that's it's valid text
    const dateString = decodeURIComponent(inputDateString);
    const dateMoment = moment(new Date(dateString));
    if (dateMoment.isValid() && dateMoment.year().toString().length === 4) {
      date = (useUtc) ? dateMoment.utc().format() : dateMoment.format();
    }
  }

  return date;
}

/**
  * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
  * @param string operator
  * @returns string map
  */
export function mapOperatorType(operator: string): OperatorType {
  let map: OperatorType;
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
