import { Column, ElementPosition, SlickDataView, SlickGrid } from './index';

export interface EditorArguments {
  column: Column;
  columnMetaData: any;
  container: HTMLDivElement;
  dataView: SlickDataView;
  event: Event;
  grid: SlickGrid;
  gridPosition: ElementPosition;
  item: any;
  position: ElementPosition;

  // methods
  cancelChanges: () => void;
  commitChanges: () => void;
}
