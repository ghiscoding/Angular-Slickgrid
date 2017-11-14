import { Column } from './column.interface';

export interface MenuOption {
  tooltip: string;
}
export interface HeaderMenuOnBeforeMenuShowArgs {
  grid: any;
  column: Column;
  menu: MenuOption;
}
