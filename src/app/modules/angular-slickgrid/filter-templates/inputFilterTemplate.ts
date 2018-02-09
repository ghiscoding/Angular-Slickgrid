import { Column, Filter } from './../models';

export const inputFilterTemplate: Filter = (searchTerm: string | number, columnDef: Column) => {
  return `<input type="text" class="form-control search-filter" style="font-family: Segoe UI Symbol;" placeholder="&#128269;">`;
};
