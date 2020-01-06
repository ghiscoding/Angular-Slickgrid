import { Column } from './column.interface';

export interface MenuOption {
  tooltip: string;
}
export interface MenuOnBeforeMenuShowArgs {
  /** Cell or column index */
  cell?: number;

  /** Row index */
  row?: number;

  /** Reference to the grid. */
  grid: any;

  /** Cell Column definition */
  column: Column;

  /** Menu DOM element */
  menu: MenuOption;
}
