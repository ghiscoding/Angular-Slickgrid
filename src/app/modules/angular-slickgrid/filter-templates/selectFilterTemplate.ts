import { Column, Filter } from './../models';
import { TranslateService } from '@ngx-translate/core';

export const selectFilterTemplate: Filter = (searchTerm: string, columnDef: Column, i18n?: TranslateService) => {
  if (!columnDef.filter.selectOptions) {
    throw new Error(`SelectOptions with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FormElementType.select, selectOptions: [ { value: '1', label: 'One' } ]')`);
  }
  let options = '';
  const labelName = (columnDef.filter.customStructure) ? columnDef.filter.customStructure.label : 'label';
  const valueName = (columnDef.filter.customStructure) ? columnDef.filter.customStructure.value : 'value';

  columnDef.filter.selectOptions.forEach((option: any) => {
    if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
      throw new Error(`SelectOptions with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FormElementType.select, selectOptions: [ { value: '1', label: 'One' } ]')`);
    }
    const labelKey = option.labelKey || option[labelName];
    const textLabel = ((option.labelKey || columnDef.filter.enableTranslateLabel) && i18n && typeof i18n.instant === 'function') ? i18n.instant(labelKey || ' ') : labelKey;
    options += `<option value="${option[valueName]}">${textLabel}</option>`;
  });
  return `<select class="form-control search-filter">${options}</select>`;
};
