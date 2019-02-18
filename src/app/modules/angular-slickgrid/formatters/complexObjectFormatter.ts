import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const complexObjectFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  if (!columnDef) {
    return '';
  }

  const columnParams = columnDef.params || {};
  const complexField = columnParams && columnParams.complexField || columnDef.field;

  if (columnDef.labelKey) {
    return dataContext[complexField] && dataContext[complexField][columnDef.labelKey];
  }

  return complexField.split('.').reduce((obj, i) => (obj ? obj[i] : ''), dataContext);
};
