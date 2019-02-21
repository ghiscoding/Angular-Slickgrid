import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const complexObjectFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  if (!columnDef) {
    return '';
  }

  const columnParams = columnDef.params || {};
  const complexFieldLabel = columnParams && columnParams.complexFieldLabel || columnDef.field;

  if (!complexFieldLabel) {
    throw new Error(`For the Formatters.complexObject to work properly, you need to tell it which property of the complex object to use.
      You can provide via 2 ways:
      1- via the generic "params" with a "complexFieldLabel" property on your Column Definition, example: this.columnDefs = [{ id: 'user', field: 'user', params: { complexFieldLabel: 'user.firstName' } }]
      2- via the field name that includes a dot notation, example: this.columnDefs = [{ id: 'user', field: 'user.firstName'}] `);
  }

  if (columnDef.labelKey) {
    return dataContext[complexFieldLabel] && dataContext[complexFieldLabel][columnDef.labelKey];
  }

  return complexFieldLabel.split('.').reduce((obj, i) => (obj ? obj[i] : ''), dataContext);
};
