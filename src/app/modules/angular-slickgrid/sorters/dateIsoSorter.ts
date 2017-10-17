import { Sorter } from './../models';
import * as moment_ from 'moment-mini';
const moment: any = (<any>moment_).default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

const DATE_FORMAT = 'YYYY-MM-DD';

export const dateIsoSorter: Sorter = (value1, value2, sortDirection) => {
  if (!moment(value1, DATE_FORMAT, true).isValid() || !moment(value2, DATE_FORMAT, true).isValid()) {
    return 0;
  }
  const date1 = moment(value1, DATE_FORMAT, true);
  const date2 = moment(value2, DATE_FORMAT, true);
  const diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);

  return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
};
