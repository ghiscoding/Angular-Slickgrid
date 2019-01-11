import { Sorter } from './../models/sorter.interface';
import { Column } from '../models/column.interface';

export const objectStringSorter: Sorter = (value1: any, value2: any, sortDirection: number, sortColumn: Column) => {
  if (!sortColumn || !sortColumn.dataKey) {
    throw new Error('Sorting a "FieldType.object" requires you to provide the "dataKey" (object property name) of the object so that we can use it to sort correctly');
  }

  const stringValue1 = value1.hasOwnProperty(sortColumn.dataKey) ? value1[sortColumn.dataKey] : value1;
  const stringValue2 = value2.hasOwnProperty(sortColumn.dataKey) ? value2[sortColumn.dataKey] : value2;

  let position = 0;
  if (stringValue1 === null) {
    position = -1;
  } else if (stringValue2 === null) {
    position = 1;
  } else if (stringValue1 === stringValue2) {
    position = 0;
  } else if (sortDirection) {
    position = stringValue1 < stringValue2 ? -1 : 1;
  } else if (!sortDirection) {
    position = stringValue1 < stringValue2 ? 1 : -1;
  }
  return sortDirection * position;
};
