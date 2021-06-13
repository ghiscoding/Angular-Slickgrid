import { ToggleStateChangeType, ToggleStateChangeTypeString, TreeToggledItem } from '../models/index';

export interface TreeToggleStateChange {
  /** Optional, what was the item Id that triggered the toggle? Only available when a parent item got toggled within the grid */
  fromItemId: number | string;

  /** What is the Type of toggle that just triggered the change event? */
  type: ToggleStateChangeType | ToggleStateChangeTypeString;

  /** What are the toggled items? This will be `null` when a full toggle is requested. */
  toggledItems: TreeToggledItem[] | null;

  /**
   * What was the previous/last full toggle type?
   * This will help us identify if the tree was fully collapsed or expanded when toggling items in the grid.
   */
  previousFullToggleType: Exclude<ToggleStateChangeType, 'toggle'> | Exclude<ToggleStateChangeTypeString, 'toggle'>;
}