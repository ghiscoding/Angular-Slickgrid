import { Column } from './column.interface';
import { HeaderButtonItem } from './headerButtonItem.interface';
import { SlickGrid } from './slickGrid.interface';

export interface HeaderButtonOnCommandArgs {
  grid: SlickGrid;
  column: Column;
  command: string;
  button: HeaderButtonItem;
}
