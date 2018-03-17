import { Column, Formatter } from './../models/index';

/** Takes a boolean value, cast it to upperCase string and finally translates it with the "ngx-translate" service */
export const translateBooleanFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  const gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
  const columnParams = columnDef.params || {};
  const gridParams = gridOptions.params || {};
  const translate = gridParams.i18n || columnParams.i18n;

  if (!translate || typeof translate.instant !== 'function') {
    throw new Error(`The translate formatter requires the "ngx-translate" Service to be provided as a Grid Options or Column Definition "params".
    For example: this.gridOptions = { enableTranslate: true, params: { i18n: this.translate }}`);
  }

  // make sure the value is a string (for example a boolean value would throw an error)
  if (value !== undefined && typeof value !== 'string') {
    value = value + '';
  }
  return value ? translate.instant(value.toUpperCase() as string) : '';
};
