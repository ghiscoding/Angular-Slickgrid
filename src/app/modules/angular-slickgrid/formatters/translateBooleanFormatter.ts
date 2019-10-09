import { Column, Formatter } from './../models/index';

/** Takes a boolean value, cast it to upperCase string and finally translates it with the "ngx-translate" service */
export const translateBooleanFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  const gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
  const translate = gridOptions.i18n || (columnDef && columnDef.params && columnDef.params.i18n);

  if (!translate || typeof translate.instant !== 'function') {
    throw new Error(`The translate formatter requires the "ngx-translate" Service to be provided as a Grid Options or Column Definition "i18n".
    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }`);
  }

  // make sure the value is a string (for example a boolean value would throw an error)
  if (value !== undefined && value !== null && typeof value !== 'string') {
    value = value + '';
  }
  return value ? translate.instant(value.toUpperCase() as string) : '';
};
