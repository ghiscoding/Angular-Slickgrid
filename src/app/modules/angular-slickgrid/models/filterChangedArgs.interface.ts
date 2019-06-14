import { SearchTerm } from './searchTerm.type';
import { Column } from './column.interface';
import { ColumnFilters } from './columnFilters.interface';
import { OperatorType } from './operatorType.enum';
import { OperatorString } from 'dist/public_api';

export interface FilterChangedArgs {
  clearFilterTriggered?: boolean;
  columnDef: Column;
  columnFilters: ColumnFilters;
  grid: any;
  operator: OperatorType | OperatorString;
  searchTerms: SearchTerm[];
  shouldTriggerQuery?: boolean;
}
