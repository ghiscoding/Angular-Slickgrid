import { Column } from './column.interface';

export interface MenuItemCallbackArgs<T> {
  /** Cell or column index */
  cell: number;

  /** Row index */
  row: number;

  /** Reference to the grid. */
  grid: number;

  /** Menu item selected */
  item: T;

  /** Cell Column definition */
  columnDef: Column;

  /** Cell Data Context(data object) */
  dataContext: any;

  /** Value of the cell we triggered the context menu from */
  value?: any;
}
