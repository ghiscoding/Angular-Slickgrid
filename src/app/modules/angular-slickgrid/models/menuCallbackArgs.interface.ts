import { Column } from './column.interface';

export interface MenuCallbackArgs {
  /** Cell or column index */
  cell: number;

  /** Row index */
  row: number;

  /** Reference to the grid. */
  grid: any;

  /** Cell Column definition */
  columnDef: Column;

  /** Cell Data Context(data object) */
  dataContext: any;
}
