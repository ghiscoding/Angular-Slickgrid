import { SlickGrid as UniversalSlickGrid } from '@slickgrid-universal/common';
import { GridOption } from './gridOption.interface';

export interface SlickGrid extends UniversalSlickGrid {
  /** Returns an object containing all of the Grid options set on the grid. See a list of Grid Options here.  */
  getOptions(): GridOption;
}
