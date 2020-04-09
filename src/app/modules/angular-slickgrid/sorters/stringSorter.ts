import { Column, Sorter, SortDirectionNumber } from './../models/index';

export const stringSorter: Sorter = (value1: any, value2: any, sortDirection: number | SortDirectionNumber, sortColumn?: Column) => {
  if (sortDirection === undefined || sortDirection === null) {
    sortDirection = SortDirectionNumber.neutral;
  }
  let position = 0;
  const checkForUndefinedValues = sortColumn && sortColumn.valueCouldBeUndefined || false;

  if (value1 === value2) {
    position = 0;
  } else if (value1 === null || (checkForUndefinedValues && value1 === undefined)) {
    position = -1;
  } else if (value2 === null || (checkForUndefinedValues && value2 === undefined)) {
    position = 1;
  } else if (sortDirection) {
    position = value1 < value2 ? -1 : 1;
  } else {
    position = value1 < value2 ? 1 : -1;
  }
  return sortDirection * position;
};
