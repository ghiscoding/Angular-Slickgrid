import { Column, ElementPosition } from './index';

export interface EditorArgs {
  column: Column;
  container: HTMLDivElement;
  grid: any;
  gridPosition: ElementPosition;
  item: any;
  position: ElementPosition;
  cancelChanges?: () => void;
  commitChanges?: () => void;
}
