import { SearchTerm } from './searchTerm.type';
import { ColumnFilters } from './columnFilters.interface';

export interface FilterChangedArgs {
  columnFilters: ColumnFilters;
  grid: any;
  searchTerm: SearchTerm;
  searchTerms: SearchTerm[];
}
