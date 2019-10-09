import { arrayToCsvFormatter } from './arrayToCsvFormatter';
import { Column, Formatter } from './../models/index';
import { findOrDefault } from '../services/utilities';

/**
 * A formatter to show the label property value of a params collection
 */
export const collectionFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  if (!value || !columnDef || !columnDef.params || !columnDef.params.collection
    || !columnDef.params.collection.length) {
    return value;
  }

  const { params, params: { collection } } = columnDef;
  const labelName = (params.customStructure) ? params.customStructure.label : 'label';
  const valueName = (params.customStructure) ? params.customStructure.value : 'value';

  if (Array.isArray(value)) {
    return arrayToCsvFormatter(row,
      cell,
      value.map((v: any) => findOrDefault(collection, (c: any) => c[valueName] === v)[labelName]),
      columnDef,
      dataContext);
  }

  return findOrDefault(collection, (c: any) => c[valueName] === value)[labelName] || '';
};
