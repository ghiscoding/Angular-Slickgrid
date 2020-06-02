import { Column } from './column.interface';
import { SlickGrid } from './slickGrid.interface';

export interface MenuCallbackArgs {
  /** Cell or column index */
  cell?: number;

  /** Row index */
  row?: number;

  /** Reference to the grid. */
  grid: SlickGrid;

  /** Cell Column definition */
  column: Column;

  /** Cell Data Context(data object) */
  dataContext?: any;
}
