import { OperatorType } from '../models/operatorType';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import * as moment_ from 'moment-mini';
const moment: any = (<any>moment_).default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

/**
 * Try casting an input of type Promise | Observable into a Promise type.
 * @param input object which could be of type Promise or Observable
 * @param fromServiceName string representing the caller service name and will be used if we throw a casting problem error
 */
export function castToPromise(input: Promise<any> | Observable<any>, fromServiceName: string = '') {
  let promise = input;

  if (input instanceof Promise) {
    // if it's already a Promise then return it
    return input;
  } else if (input instanceof Observable) {
    promise = input.first().toPromise();
    if (!(promise instanceof Promise)) {
      promise = input.take(1).toPromise();
    }
    if (!(promise instanceof Promise)) {
      throw new Error(
        `Something went wrong, Angular-Slickgrid ${fromServiceName} is not able to convert the Observable into a Promise.
        If you are using Angular HttpClient, you could try converting your http call to a Promise with ".toPromise()"
        for example::  this.http.post('graphql', { query: graphqlQuery }).toPromise()
        `);
    }
  }

  return promise;
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
