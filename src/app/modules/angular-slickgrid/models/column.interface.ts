import { ColumnFilter } from './columnFilter.interface';
import { Editor } from './editor.interface';
import { FieldType } from './fieldType';
import { Formatter } from './formatter.interface';
import { GroupTotalsFormatter } from './groupTotalsFormatter.interface';
import { HeaderButtonItem } from './headerButtonItem.interface';
import { HeaderMenuItem } from './headerMenuItem.interface';
import { OnEventArgs } from './onEventArgs.interface';
import { Sorter } from './sorter.interface';

export interface Column {
  /** async background post-rendering formatter */
  asyncPostRender?: (domCellNode: any, row: number, dataContext: any, columnDef: Column) => void;

  /** Block event triggering of an insert? */
  cannotTriggerInsert?: boolean;

  /** CSS class to add to the column cell */
  cssClass?: string;

  /** Column span in pixels or `*`, only input the number value */
  colspan?: number | '*';

  /** Do we want default sort to be ascending? True by default */
  defaultSortAsc?: boolean;

  /** Inline editor for the cell value */
  editor?: Editor | any;

  /** Default to false, do we want this column excluded from the export? */
  excludeFromExport?: boolean;

  /** Defaults to false, do we want to exclude this field from the query (mostly a backend service query) */
  excludeFromQuery?: boolean;

  /**
   * Export with a Custom Formatter, useful when we want to use a different Formatter for the export.
   * For example, we might have a boolean field with "Formatters.checkmark" but we would like see a translated value for (True/False).
   */
  exportCustomFormatter?: Formatter;

  /**
   * Defaults to false, which leads to Formatters being evaluated on export.
   * Most often used with dates that are stored as UTC but displayed as Date ISO (or any other format) with a Formatter.
   */
  exportWithFormatter?: boolean;

  /**
   * Do we want to force the cell value to be a string?
   * When set to True, it will wrap the cell value in double quotes and add an equal sign (=) at the beginning of the cell to force Excel to evaluate it as a string and not change it's format.
   * For example, without this flag a cell value with "1E06" would be interpreted as a number becoming (1.0E06) by Excel.
   * When set this flag to True, the cell value will be wrapped with an equal sign and double quotes, which forces Excel to evaluate it as a string. The output will be:: ="1E06" */
  exportCsvForceToKeepAsString?: boolean;

  /** Field property name to use from the dataset that is used to display the column data.  */
  field: string;

  /**
   * Only used by Backend Services since the query is built using the column definitions, this is a way to pass extra properties to the backend query.
   * It can help in getting more fields for a Formatter without adding a new column definition every time that we don't want to display.
   * For example: { id: 'Users', field: 'user.firstName', fields: ['user.lastName', 'user.middleName'], formatter: fullNameFormatter }
   */
  fields?: string[];

  /** Filter class to use when filtering this column */
  filter?: ColumnFilter;

  /** is the column filterable? Goes with grid option "enableFiltering: true". */
  filterable?: boolean;

  /** Extra option to filter more easily. For example, a "UTC Date" field can use a search format of US Format like ">02/28/2017" */
  filterSearchType?: FieldType;

  /** are we allowed to focus on the column? */
  focusable?: boolean;

  /** Formatter function that can be used to change and format certain column(s) in the grid */
  formatter?: Formatter;

  /** Group Totals Formatter function that can be used to add grouping totals in the grid */
  groupTotalsFormatter?: GroupTotalsFormatter;

  /** Options that can be provide to the Header Menu Plugin */
  header?: {
    /** list of Buttons to show in the header */
    buttons?: HeaderButtonItem[];
    menu?: {
      items: HeaderMenuItem[];
    };
  };

  /** CSS class that can be added to the column header */
  headerCssClass?: string;

  /** Column header translation key that can be used by the Translate Service (i18n) */
  headerKey?: string;

  /** ID of the column, each row have to be unique or SlickGrid will throw an error. */
  id: number | string;

  /** is the column editable? Goes with grid option "editable: true". */
  isEditable?: boolean;

  /** is the field hidden? (part of the dataset but not shown in the grid/UI) */
  isHidden?: boolean;

  /** catchall for meta info */
  json?: any;

  /** a column key */
  key?: string;

  /** is the column manually sizable? */
  manuallySized?: boolean;

  /** Maximum Width of the column in pixels (number only). */
  maxWidth?: number;

  /** Minimum Width of the column in pixels (number only). */
  minWidth?: number;

  /** Field Name to be displayed in the Grid (UI) */
  name?: string;

  /** an event that can be used for triggering an action after a cell change */
  onCellChange?: (args: OnEventArgs) => void;

  /** an event that can be used for triggering an action after a cell click */
  onCellClick?: (args: OnEventArgs) => void;

  /** column output type */
  outputType?: FieldType;

  /** if you want to pass custom paramaters to your Formatter/Editor or anything else */
  params?: any | any[];

  /** The previous column width in pixels (number only) */
  previousWidth?: number;

  /** Useful when you want to display a certain field to the UI, but you want to use another field to query for Filtering/Sorting. */
  queryField?: string;

  /** Similar to "queryField" but only used with Filtering. Useful when you want to display a certain field to the UI, but you want to use another field to query for Filtering. */
  queryFieldFilter?: string;

  /** Similar to "queryField" but only used with Sorting. Useful when you want to display a certain field to the UI, but you want to use another field to query for Sorting. */
  queryFieldSorter?: string;

  /** Is the column resizable, can we make it wider/thinner? A resize cursor will show on the right side of the column when enabled. */
  resizable?: boolean;

  /** Do we want to re-render the grid on a grid resize */
  rerenderOnResize?: boolean;

  /** Defaults to false, which leads to Sanitizing all data (striping out any HTML tags) when being evaluated on export. */
  sanitizeDataExport?: boolean;

  /** Is the column selectable? Goes with grid option "enableCellNavigation: true". */
  selectable?: boolean;

  /** do we show hidden column? */
  showHidden?: boolean;

  /** Is the column sortable? Goes with grid option "enableSorting: true". */
  sortable?: boolean;

  /** Custom Sorter function that can be provided to the column */
  sorter?: Sorter;

  /** Custom Tooltip that can ben shown to the column */
  toolTip?: string;

  /** What is the Field Type, this can be used in the Formatters/Editors/... */
  type?: FieldType;

  // validator?: Validator;
  validator?: any;

  /** Width of the column in pixels (number only). */
  width?: number;
}
