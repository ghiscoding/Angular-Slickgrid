import { Column } from './../models/column.interface';
import { Filter } from './../models/filter.interface';

export const inputFilterTemplate: Filter = (searchTerm: string, columnDef: Column) => {
  return `<input type="text" class="form-control search-filter" style="font-family: Segoe UI Symbol;" placeholder="&#128269;">`;
};
