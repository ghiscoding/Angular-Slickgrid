import { Column } from './column.interface';
import { HeaderMenuItem } from './headerMenuItem.interface';

export interface HeaderMenuOnCommandArgs {
  grid: any;
  column: Column;
  command: string;
  button: HeaderMenuItem;
}
