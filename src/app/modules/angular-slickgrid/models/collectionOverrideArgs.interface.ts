import { Column, SlickGrid } from './index';

export interface CollectionOverrideArgs {
  /** Column Definition */
  column: Column;

  /** item data context object */
  dataContext: any;

  /** Slick Grid object */
  grid: SlickGrid;
}
