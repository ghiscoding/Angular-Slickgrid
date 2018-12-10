import { Grouping } from './grouping.interface';

export interface DraggableGrouping {
  /** an extra CSS class to add to the delete button (default undefined), if deleteIconCssClass && deleteIconImage undefined then slick-groupby-remove-image class will be added */
  deleteIconCssClass?: string;

  /** a url to the delete button image (default undefined) */
  deleteIconImage?: string;

  /** option to specify set own placeholder note text */
  dropPlaceHolderText?: string;

  /** an extra CSS class to add to the grouping field hint  (default undefined) */
  groupIconCssClass?: string;

  /** a url to the grouping field hint image (default undefined) */
  groupIconImage?: string;

  //
  // Events
  // ---------
  /** Fired when grouped columns changed */
  onGroupChanged?: (e: Event, args: { caller?: string; groupColumns: Grouping[] }) => void;

  /** Fired after extension (plugin) is registered by SlickGrid */
  onExtensionRegistered?: (plugin: any) => void;

  //
  // Methods
  // ---------
  /** provide option to set default grouping on loading */
  setDroppedGroups?: (groupingInfo: any[]) => void;

  /** provide option to clear grouping */
  clearDroppedGroups?: () => void;

  /** its function to setup draggable feature agains Header Column, should be passed on grid option. Also possible to pass custom function */
  getSetupColumnReorder?: () => void;
}
