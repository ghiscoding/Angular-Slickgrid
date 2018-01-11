import { Column, Filter } from './../models';
import { TranslateService } from '@ngx-translate/core';

export const selectFilterTemplate: Filter = (searchTerm: string, columnDef: Column, i18n?: TranslateService) => {
  if (!columnDef.filter.selectOptions) {
    throw new Error(`SelectOptions with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FormElementType.select, selectOptions: [ { value: '1', label: 'One' } ]')`);
  }
  let options = '';
  columnDef.filter.selectOptions.forEach((option: any) => {
    if (!option || (option.label === undefined && option.labelKey === undefined)) {
      throw new Error(`SelectOptions with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FormElementType.select, selectOptions: [ { value: '1', label: 'One' } ]')`);
    }
    const textLabel = (option.labelKey && i18n && typeof i18n.instant === 'function') ? i18n.instant(option.labelKey) : option.label;
    options += `<option value="${option.value}">${textLabel}</option>`;
  });
  return `<select class="form-control search-filter">${options}</select>`;
};
