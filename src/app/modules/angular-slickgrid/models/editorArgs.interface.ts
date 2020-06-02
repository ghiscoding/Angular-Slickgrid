import { Column, ElementPosition, SlickGrid } from './index';

export interface EditorArgs {
  column: Column;
  container: HTMLDivElement;
  grid: SlickGrid;
  gridPosition: ElementPosition;
  item: any;
  position: ElementPosition;
  cancelChanges?: () => void;
  commitChanges?: () => void;
}
