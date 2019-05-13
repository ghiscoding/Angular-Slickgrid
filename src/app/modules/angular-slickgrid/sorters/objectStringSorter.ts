import { Column, Sorter, SortDirectionNumber } from './../models/index';

export const objectStringSorter: Sorter = (value1: any, value2: any, sortDirection: number | SortDirectionNumber, sortColumn: Column) => {
  if (!sortColumn || !sortColumn.dataKey) {
    throw new Error('Sorting a "FieldType.object" requires you to provide the "dataKey" (object property name) of the object so that we can use it to sort correctly');
  }

  const stringValue1 = value1.hasOwnProperty(sortColumn.dataKey) ? value1[sortColumn.dataKey] : value1;
  const stringValue2 = value2.hasOwnProperty(sortColumn.dataKey) ? value2[sortColumn.dataKey] : value2;
  if (sortDirection === undefined || sortDirection === null) {
    sortDirection = SortDirectionNumber.neutral;
  }

  let position = 0;
  if (typeof value1 !== 'object') {
    position = -99e+10;
  } else if (typeof value2 !== 'object') {
    position = 99e+10;
  } else if (!stringValue1) {
    position = -1;
  } else if (!stringValue2) {
    position = 1;
  } else if (stringValue1 === stringValue2) {
    position = 0;
  } else if (sortDirection) {
    position = stringValue1 < stringValue2 ? -1 : 1;
  } else {
    position = stringValue1 < stringValue2 ? 1 : -1;
  }

  return sortDirection * position;
};
