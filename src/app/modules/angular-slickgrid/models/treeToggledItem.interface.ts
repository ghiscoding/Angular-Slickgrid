export interface TreeToggledItem {
  /** Id of the item that was toggled (could be expanded/collapsed) */
  itemId: number | string;

  /** is the parent id collapsed or not? */
  isCollapsed: boolean;
}