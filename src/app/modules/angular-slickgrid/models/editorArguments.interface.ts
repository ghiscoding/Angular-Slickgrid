import { Column, ElementPosition } from './index';

export interface EditorArguments {
  column: Column;
  columnMetaData: any;
  container: HTMLDivElement;
  dataView: any;
  event: Event;
  grid: any;
  gridPosition: ElementPosition;
  item: any;
  position: ElementPosition;

  // methods
  cancelChanges: () => void;
  commitChanges: () => void;
}
