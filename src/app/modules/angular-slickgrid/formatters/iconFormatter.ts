import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const iconFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const columnParams = columnDef && columnDef.params || {};
  const icon = columnParams.icon || columnParams.formatterIcon;

  if (!icon) {
    throw new Error(`You must provide the "icon" or "formatterIcon" via the generic "params" options (e.g.: { formatter: Formatters.icon, params: { formatterIcon: 'fa fa-search' }}`);
  }
  return `<i class="${icon}" aria-hidden="true"></i>`;
};
