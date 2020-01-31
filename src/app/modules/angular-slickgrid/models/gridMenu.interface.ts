import { Column } from './column.interface';
import { GridMenuItem } from './gridMenuItem.interface';
import { MenuCallbackArgs } from './menuCallbackArgs.interface';
import { MenuCommandItemCallbackArgs } from './menuCommandItemCallbackArgs.interface';

export interface GridMenu {
  /** Array of Custom Items (title, command, disabled, ...) */
  customItems?: Array<GridMenuItem | 'divider'>;

  /** Defaults to "Commands" which is the title that shows up over the custom commands list */
  customTitle?: string;

  /** Same as "customTitle", except that it's a translation key which can be used on page load and/or when switching locale */
  customTitleKey?: string;

  /** Defaults to "Columns" which is the title that shows up over the columns */
  columnTitle?: string;

  /** Same as "columnTitle", except that it's a translation key which can be used on page load and/or when switching locale */
  columnTitleKey?: string;

  /** Defaults to "Force fit columns" which is 1 of the last 2 checkbox title shown at the end of the picker list */
  forceFitTitle?: string;

  /** Same as "forceFitTitle", except that it's a translation key which can be used on page load and/or when switching locale */
  forceFitTitleKey?: string;

  /** Defaults to false, which will hide the "Clear all Filters" command in the Grid Menu (Grid Option "enableFiltering: true" has to be enabled) */
  hideClearAllFiltersCommand?: boolean;

  /** Defaults to false, which will hide the "Clear all Sorting" command in the Grid Menu (Grid Option "enableSorting: true" has to be enabled) */
  hideClearAllSortingCommand?: boolean;

  /** Defaults to false, which will hide the "Export to CSV" command in the Grid Menu (Grid Option "enableExport: true" has to be enabled) */
  hideExportCsvCommand?: boolean;

  /** Defaults to false, which will hide the "Export to Excel" command in the Grid Menu (Grid Option "enableExcelExport: true" has to be enabled) */
  hideExportExcelCommand?: boolean;

  /** Defaults to false, which will hide the "Export to Text Delimited" command in the Grid Menu (Grid Option "enableExport: true" has to be enabled) */
  hideExportTextDelimitedCommand?: boolean;

  /** Defaults to false, show/hide 1 of the last 2 checkbox at the end of the picker list */
  hideForceFitButton?: boolean;

  /** Defaults to false, which will hide the "Refresh Dataset" command in the Grid Menu (only works with a Backend Service API) */
  hideRefreshDatasetCommand?: boolean;

  /** Defaults to false, show/hide 1 of the last 2 checkbox at the end of the picker list */
  hideSyncResizeButton?: boolean;

  /** Defaults to false, which will hide the "Toggle Filter Row" command in the Grid Menu (Grid Option "enableFiltering: true" has to be enabled) */
  hideToggleFilterCommand?: boolean;

  /** Defaults to true, which will hide the "Toggle Pre-Header Row" (used by draggable grouping) command in the Grid Menu (Grid Option "showPreHeaderPanel: true" has to be enabled) */
  hideTogglePreHeaderCommand?: boolean;

  /** CSS class for the displaying the Grid menu icon image (basically the hamburger menu) */
  iconCssClass?: string;

  /** icon for the "Clear all Filters" command */
  iconClearAllFiltersCommand?: string;

  /** icon for the "Clear all Sorting" command */
  iconClearAllSortingCommand?: string;

  /** icon for the "Export to CSV" command */
  iconExportCsvCommand?: string;

  /** icon for the "Export to Excel" command */
  iconExportExcelCommand?: string;

  /** icon for the "Export to Text Delimited" command */
  iconExportTextDelimitedCommand?: string;

  /** Link for the displaying the Grid menu icon image (basically the hamburger menu) */
  iconImage?: string;

  /** icon for the "Refresh Dataset" command */
  iconRefreshDatasetCommand?: string;

  /** icon for the "Toggle Filter Row" command */
  iconToggleFilterCommand?: string;

  /** icon for the "Toggle Pre-Header Row" command */
  iconTogglePreHeaderCommand?: string;

  /** Defaults to False, which leads to leaving the menu open after a click */
  leaveOpen?: boolean;

  /** Defaults to 16 pixels (only the number), which is the width in pixels of the Grid Menu icon */
  menuWidth?: number;

  /** Defaults to False, which will resize the Header Row and remove the width of the Grid Menu icon from it's total width. */
  resizeOnShowHeaderRow?: boolean;

  /** Defaults to "Synchronous resize" which is 1 of the last 2 checkbox title shown at the end of the picker list */
  syncResizeTitle?: string;

  /** Same as "syncResizeTitle", except that it's a translation key which can be used on page load and/or when switching locale */
  syncResizeTitleKey?: string;

  // --
  // action/override callbacks

  /** Callback method that user can override the default behavior of enabling/disabling an item from the list. */
  menuUsabilityOverride?: (args: MenuCallbackArgs) => boolean;


  // --
  // Events

  /** Fired after extension (control) is registered by SlickGrid */
  onExtensionRegistered?: (plugin: any) => void;

  /** SlickGrid Event fired After the menu is shown. */
  onAfterMenuShow?: (e: Event, args: { grid: any; menu: any; columns: Column[] }) => void;

  /** SlickGrid Event fired Before the menu is shown. */
  onBeforeMenuShow?: (e: Event, args: { grid: any; menu: any; columns: Column[] }) => void;

  /** SlickGrid Event fired when any of the columns checkbox selection changes. */
  onColumnsChanged?: (e: Event, args: { grid; any; allColumns: Column[]; columns: Column[]; }) => void;

  /** SlickGrid Event fired when the menu is closing. */
  onMenuClose?: (e: Event, args: { grid: any; menu: any; allColumns: Column[], visibleColumns: Column[] }) => void;

  /** SlickGrid Event fired on menu option clicked from the Command items list */
  onCommand?: (e: Event, args: MenuCommandItemCallbackArgs) => void;
}
