import { Column } from './column.interface';
import { SelectedRange } from './selectedRange.interface';

export interface ExcelCopyBufferOption {
  /** defaults to "copied", sets the css className used for copied cells. */
  copiedCellStyle?: string;

  /** defaults to "copy-manager", sets the layer key for setting css values of copied cells. */
  copiedCellStyleLayerKey?: string;

  /** option to specify a custom column value extractor function */
  dataItemColumnValueExtractor?: (item: any, columnDef: Column) => any;

  /** option to specify a custom column value setter function */
  dataItemColumnValueSetter?: (item: any, columnDef: Column, value: any) => any;

  /** option to specify a custom handler for paste actions */
  clipboardCommandHandler?: (editCommand: any) => void;

  /** set to true and the plugin will take the name property from each column (which is usually what appears in your header) and put that as the first row of the text that's copied to the clipboard */
  includeHeaderWhenCopying?: boolean;

  /** option to specify a custom DOM element which to will be added the hidden textbox. It's useful if the grid is inside a modal dialog. */
  bodyElement?: HTMLElement;

  /** optional handler to run when copy action initializes */
  onCopyInit?: any;

  /** optional handler to run when copy action is complete */
  onCopySuccess?: any;

  /** function to add rows to table if paste overflows bottom of table, if this function is not provided new rows will be ignored. */
  newRowCreator?: (count: number) => void;

  /** suppresses paste */
  readOnlyMode?: boolean;

  /** option to specify a custom column header value extractor function */
  headerColumnValueExtractor?: (columnDef: Column) => any;


  // --
  // Events
  // ------------

  /** Fired after extension (plugin) is registered by SlickGrid */
  onExtensionRegistered?: (plugin: any) => void;

  /** Fired when a copy cell is triggered */
  onCopyCells?: (e: Event, args: { ranges: SelectedRange[] }) => void;

  /** Fired when the command to copy the cells is cancelled */
  onCopyCancelled?: (e: Event, args: { ranges: SelectedRange[] }) => void;

  /** Fired when the user paste cells to the grid */
  onPasteCells?: (e: Event, args: { ranges: SelectedRange[] }) => void;
}
