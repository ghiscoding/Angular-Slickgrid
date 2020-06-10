import { Column } from './column.interface';
import { SlickDataView } from './slickDataView.interface';
import { SlickGrid } from './slickGrid.interface';

export interface OnEventArgs {
  row: number;
  cell: number;
  columnDef: Column;
  dataContext: any;
  dataView: SlickDataView;
  grid: SlickGrid;
}
