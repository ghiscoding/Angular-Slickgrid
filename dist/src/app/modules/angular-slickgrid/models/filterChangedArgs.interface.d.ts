import { ColumnFilters } from './columnFilters.interface';
export interface FilterChangedArgs {
    columnFilters: ColumnFilters;
    grid: any;
    searchTerm: string | number;
    searchTerms: string[] | number[];
}
