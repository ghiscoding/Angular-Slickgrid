import { Column } from './../models/column.interface';
import { Filter } from './../models/filter.interface';

export const selectFilterTemplate: Filter = (searchTerm: string, columnDef: Column) => {
  if (!columnDef.filter.selectOptions) {
    throw new Error(`SelectOptions with value/label is required to populate the Select list, for example:: { filter: type: FormElementType.select, selectOptions: [ { value: '1', label: 'One' } ]')`);
  }
  let options = '';
  columnDef.filter.selectOptions.forEach((option: any) => {
    options += `<option value="${option.value}">${option.label}</option>`;
  });
  return `<select id="search-${columnDef.id}" class="form-control">${options}</select>`;
};
