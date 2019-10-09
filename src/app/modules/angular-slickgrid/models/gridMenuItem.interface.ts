export interface GridMenuItem {
  /** Menu item text to show in the list. */
  title?: string;

  /** Same as "title", except that it's a translation key which can be used on page load and/or when switching locale */
  titleKey?: string;

  /** A command identifier to be passed to the onCommand event callback handlers. */
  command: string;

  /** Defaults to false, whether the item is disabled. */
  disabled?: boolean;

  /** Defaults to false, whether the command is actually a divider (separator). */
  divider?: boolean;

  /** CSS class to be added to the menu item icon. */
  iconCssClass?: string;

  /** URL pointing to the icon image. */
  iconImage?: string;

  /** position order in the list, a lower number will make it on top of the list. Internal commands starts at 50. */
  positionOrder?: number;

  /** Item tooltip to show while hovering the command. */
  tooltip?: string;
}
