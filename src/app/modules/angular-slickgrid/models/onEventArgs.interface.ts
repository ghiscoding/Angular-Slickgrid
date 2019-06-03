import { GridOption } from './gridOption.interface';
import { Column } from './column.interface';

export interface OnEventArgs {
  row: number;
  cell: number;
  columnDef: Column;
  dataContext: any;
  dataView: any; // TODO replace by a DataView interface
  grid: any;    // TODO replace by a SlickGrid interface
}
