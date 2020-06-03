import { Column } from './column.interface';
import { ColumnFilters } from './columnFilters.interface';
import { OperatorString } from './operatorString';
import { OperatorType } from './operatorType.enum';
import { SearchTerm } from './searchTerm.type';
import { SlickGrid } from './slickGrid.interface';

export interface FilterChangedArgs {
  clearFilterTriggered?: boolean;
  columnDef: Column;
  columnFilters: ColumnFilters;
  grid: SlickGrid;
  operator: OperatorType | OperatorString;
  searchTerms: SearchTerm[];
  shouldTriggerQuery?: boolean;
}
