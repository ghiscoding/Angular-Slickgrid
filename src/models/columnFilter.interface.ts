import { Column } from './column.interface';

export interface ColumnFilter {
  bypassBackendQuery?: boolean;
  columnId?: string;
  columnDef: Column;
  searchTerm: string | number;
  listTerm?: any[];
  operator?: string;
}
