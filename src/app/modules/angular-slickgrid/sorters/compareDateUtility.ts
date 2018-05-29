import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

export function compareDates(value1, value2, format, sortDirection, strict?: boolean) {
  let diff = 0;

  if (value1 === null || value1 === '' || !moment(value1, format, strict).isValid()) {
    diff = -1;
  } else if (value2 === null || value2 === '' || !moment(value2, format, strict).isValid()) {
    diff = 1;
  } else {
    const date1 = moment(value1, format, strict);
    const date2 = moment(value2, format, strict);
    diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
  }

  return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
}
