import { MenuItemCallbackArgs } from './menuItemCallbackArgs.interface';

export interface MenuItem {
  /** A CSS class to be added to the menu item container. */
  cssClass?: string;

  /** Defaults to false, whether the item is disabled. */
  disabled?: boolean;

  /** Defaults to false, whether the command is actually a divider (separator). */
  divider?: boolean | string;

  /** CSS class to be added to the menu item icon. */
  iconCssClass?: string;

  /** URL pointing to the icon image. */
  iconImage?: string;

  /** position order in the list, a lower number will make it on top of the list. Internal commands starts at 50. */
  positionOrder?: number;

  /** CSS class to be added to the menu item text. */
  textCssClass?: string;

  /** Menu item text to show in the list. */
  title?: string;

  /** Same as "title", except that it's a translation key which can be used on page load and/or when switching locale */
  titleKey?: string;

  /** Item tooltip to show while hovering the command. */
  tooltip?: string;

  // --
  // action/override callbacks

  /** Callback method that user can override the default behavior of showing/hiding an item from the list. */
  itemVisibilityOverride?: (row: number, dataContext: any, grid: any) => boolean;

  /** Callback method that user can override the default behavior of enabling/disabling an item from the list. */
  itemUsabilityOverride?: (row: number, dataContext: any, grid: any) => boolean;
}
