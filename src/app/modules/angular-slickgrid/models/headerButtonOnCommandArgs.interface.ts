import { Column } from './column.interface';
import { HeaderButtonItem } from './headerButtonItem.interface';

export interface HeaderButtonOnCommandArgs {
  grid: any;
  column: Column;
  command: string;
  button: HeaderButtonItem;
}
