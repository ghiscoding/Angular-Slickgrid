import { Column, Formatter } from './../models/index';
import { TranslateService } from '@ngx-translate/core';

export const translateFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  const gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
  const columnParams = columnDef.params || {};
  const gridParams = gridOptions.params || {};

  if ((!columnParams.i18n || !(columnParams.i18n instanceof TranslateService)) && (!gridParams.i18n || !(gridParams.i18n instanceof TranslateService))) {
    throw new Error(`The translate formatter requires the ngx-translate "TranslateService" to be provided as a Column Definition params or a Grid Option params.
    For example: this.gridOptions = { enableTranslate: true, params: { i18n: this.translateService }}`);
  }

  const translate = gridParams.i18n || columnParams.i18n;

  // make sure the value is a string (for example a boolean value would throw an error)
  if (typeof value !== 'string') {
    value = value + '';
  }

  return value ? translate.instant(value) : '';
};
