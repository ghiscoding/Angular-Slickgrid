import { HeaderMenuOnBeforeMenuShowArgs } from './headerMenuOnBeforeMenuShowArgs.interface';
import { HeaderButtonOnCommandArgs } from './headerButtonOnCommandArgs.interface';

export interface HeaderMenu {
  /** Auto-align drop menu to the left when not enough viewport space to show on the right */
  autoAlign?: boolean;

  /** When drop menu is aligned to the left, it might not be perfectly aligned with the header menu icon, if that is the case you can add an offset (positive/negative number to move right/left) */
  autoAlignOffset?: number;

  /** an extra CSS class to add to the menu button */
  buttonCssClass?: string;

  /** a url to the menu button image (default '../images/down.gif') */
  buttonImage?: string;

  /** A command identifier to be passed to the onCommand event handlers. */
  command?: string;

  /** Whether the item is disabled. */
  disabled?: boolean;

  /** Defaults to false, which will hide the "Remove Filter" command in the Header Menu (Grid Option "enableHeaderMenu: true" has to be enabled) */
  hideClearFilterCommand?: boolean;

  /** Defaults to false, which will hide the "Remove Sort" command in the Header Menu (Grid Option "enableHeaderMenu: true" has to be enabled) */
  hideClearSortCommand?: boolean;

  /** Defaults to false, which will hide the Clear Filter command in the Header Menu (Grid Option "enableHeaderMenu: true" has to be enabled) */
  hideFilterCommands?: boolean;

  /** Defaults to false, which will hide Sort (Asc/Desc & Clear Sort) commands in the Header Menu (Grid Option "enableHeaderMenu: true" has to be enabled) */
  hideSortCommands?: boolean;

  /** Defaults to false, which will hide the "Hide Column" command in the Header Menu (Grid Option "enableHeaderMenu: true" has to be enabled) */
  hideColumnHideCommand?: boolean;

  /** A CSS class to be added to the menu item icon. */
  iconCssClass?: string;

  /** A url to the icon image. */
  iconImage?: string;

  /** icon for the "Remove Filter" command */
  iconClearFilterCommand?: string;

  /** icon for the "Remove Sort" command */
  iconClearSortCommand?: string;

  /** icon for the "Hide Column" command */
  iconColumnHideCommand?: string;

  /** icon for the "Sort Ascending" command */
  iconSortAscCommand?: string;

  /** icon for the "Sort Descending" command */
  iconSortDescCommand?: string;

  /** Minimum width that the drop menu will have */
  minWidth?: number;

  /** Menu item text. */
  title?: string;

  /** Item tooltip. */
  tooltip?: string;

  // --
  // Events
  // ------------

  /** Fired after extension (plugin) is registered by SlickGrid */
  onExtensionRegistered?: (plugin: any) => void;

  /** Fired before the header menu shows up. */
  onBeforeMenuShow?: (e: Event, args: HeaderMenuOnBeforeMenuShowArgs) => void;

  /** Fired when a command is clicked */
  onCommand?: (e: Event, args: HeaderButtonOnCommandArgs) => void;
}
