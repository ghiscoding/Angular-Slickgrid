import { Column } from './column.interface';
import { DataView } from './dataView.interface';
import { SlickGrid } from './slickGrid.interface';

export interface OnEventArgs {
  row: number;
  cell: number;
  columnDef: Column;
  dataContext: any;
  dataView: DataView;
  grid: SlickGrid;
}
