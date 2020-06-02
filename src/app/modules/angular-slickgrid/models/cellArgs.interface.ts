import { SlickGrid } from './slickGrid.interface';

export interface CellArgs {
  row: number;
  cell: number;
  grid: SlickGrid;
  item?: any;
}
