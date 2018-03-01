import { CustomGridMenu } from './customGridMenu.interface';
export interface GridMenu {
    /** Array of Custom Items (title, command, disabled, ...) */
    customItems?: CustomGridMenu[];
    /** Defaults to "Commands" which is the title that shows up over the custom commands list */
    customTitle?: string;
    /** Defaults to "Columns" which is the title that shows up over the columns */
    columnTitle?: string;
    /** Link for the displaying the Grid menu icon image (basically the hamburger menu) */
    iconImage?: string;
    /** CSS class for the displaying the Grid menu icon image (basically the hamburger menu) */
    iconCssClass?: string;
    /** Defaults to False, which leads to leaving the menu open after a click */
    leaveOpen?: boolean;
    /** Defaults to 16 pixels (only the number), which is the width in pixels of the Grid Menu icon */
    menuWidth?: number;
    /** Defaults to "Force fit columns" which is 1 of the last 2 checkbox title shown at the end of the picker list */
    forceFitTitle?: string;
    /** Defaults to True, show/hide 1 of the last 2 checkbox at the end of the picker list */
    hideForceFitButton?: boolean;
    /** Defaults to True, show/hide 1 of the last 2 checkbox at the end of the picker list */
    hideSyncResizeButton?: boolean;
    /** Defaults to False, which will resize the Header Row and remove the width of the Grid Menu icon from it's total width. */
    resizeOnShowHeaderRow?: boolean;
    /** Defaults to True, which will show the "Clear All Filter" command in the Grid Menu (Grid Option "enableFiltering: true" has to be enabled) */
    showClearAllFiltersCommand?: boolean;
    /** Defaults to True, which will show the "Export to CSV" command in the Grid Menu (Grid Option "enableExport: true" has to be enabled) */
    showExportCsvCommand?: boolean;
    /** Defaults to True, which will show the "Export to Text Delimited" command in the Grid Menu (Grid Option "enableExport: true" has to be enabled) */
    showExportTextDelimitedCommand?: boolean;
    /** Defaults to True, which will show the "Refresh Dataset" command in the Grid Menu (only works with a Backend Service API) */
    showRefreshDatasetCommand?: boolean;
    /** Defaults to True, which will show the "Toggle Filter Row" command in the Grid Menu (Grid Option "enableFiltering: true" has to be enabled) */
    showToggleFilterCommand?: boolean;
    /** Defaults to "Synchronous resize" which is 1 of the last 2 checkbox title shown at the end of the picker list */
    syncResizeTitle?: string;
    /** SlickGrid Event fired before the menu is shown. */
    onBeforeMenuShow?: (e: Event, args: any) => void;
    /** SlickGrid Event fired when any of the columns checkbox selection changes. */
    onColumnsChanged?: (e: Event, args: any) => void;
    /** SlickGrid Event fired when the menu is closing. */
    onMenuClose?: (e: Event, args: any) => void;
    /** SlickGrid Event fired on menu item click for buttons with 'command' specified. */
    onCommand?: (e: Event, args: any) => void;
}
