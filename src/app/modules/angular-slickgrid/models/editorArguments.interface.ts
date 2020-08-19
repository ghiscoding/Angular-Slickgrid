import { Column, ElementPosition } from './index';

export interface EditorArguments {
  /** Column Definition */
  column: Column;

  /** Column MetaData */
  columnMetaData: any;

  /** Cell Container DOM Element of where the Editor will be created */
  container: HTMLDivElement;

  /** Slick DataView */
  dataView: any;

  /** Event that was triggered */
  event: Event;

  /** Slick Grid object */
  grid: any;

  /** Grid Position */
  gridPosition: ElementPosition;

  /** Item DataContext */
  item: any;

  /** Editor Position  */
  position: ElementPosition;

  // methods

  /** Cancel the Editor Changes */
  cancelChanges: () => void;

  /** Commit the Editor Changes */
  commitChanges: () => void;
}
