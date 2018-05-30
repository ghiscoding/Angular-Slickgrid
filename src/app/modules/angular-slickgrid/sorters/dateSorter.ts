import { Sorter } from './../models/index';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
import { compareDates } from './compareDateUtility';

export const dateSorter: Sorter = (value1, value2, sortDirection) => {
  return compareDates(value1, value2, moment.ISO_8601, sortDirection);
};
