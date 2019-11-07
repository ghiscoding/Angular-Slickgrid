import { ColumnEditor } from './columnEditor.interface';
import { ColumnFilter } from './columnFilter.interface';
import { EditorValidator } from './editorValidator.interface';
import { FieldType } from './fieldType.enum';
import { Formatter } from './formatter.interface';
import { Grouping } from './grouping.interface';
import { GroupTotalsFormatter } from './groupTotalsFormatter.interface';
import { HeaderButtonItem } from './headerButtonItem.interface';
import { HeaderMenuItem } from './headerMenuItem.interface';
import { OnEventArgs } from './onEventArgs.interface';
import { Sorter } from './sorter.interface';

export interface Column {
  /** async background post-rendering formatter */
  asyncPostRender?: (domCellNode: any, row: number, dataContext: any, columnDef: Column) => void;

  /** Row Move Behavior, used by the Row Move Manager Plugin */
  behavior?: string;

  /** Block event triggering of an insert? */
  cannotTriggerInsert?: boolean;

  /** Column group name for grouping of column headers spanning accross multiple columns */
  columnGroup?: string;

  /** CSS class to add to the column cell */
  cssClass?: string;

  /** Column span in pixels or `*`, only input the number value */
  colspan?: number | '*';

  /** Data key, for example this could be used as a property key for complex object comparison (e.g. dataKey: 'id') */
  dataKey?: any;

  /** Do we want default sort to be ascending? True by default */
  defaultSortAsc?: boolean;

  /** Any inline editor function that implements Editor for the cell value or ColumnEditor */
  editor?: any | ColumnEditor;

  /** Default to false, which leads to exclude the column title from the Column Picker. */
  excludeFromColumnPicker?: boolean;

  /** Default to false, which leads to exclude the column from the export. */
  excludeFromExport?: boolean;

  /** Default to false, which leads to exclude the column title from the Grid Menu. */
  excludeFromGridMenu?: boolean;

  /** Defaults to false, which leads to exclude the field from the query (typically a backend service query) */
  excludeFromQuery?: boolean;

  /** Defaults to false, which leads to exclude the column from getting a header menu. For example, the checkbox row selection should not have a header menu. */
  excludeFromHeaderMenu?: boolean;

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

  /**
   * Field property name to use from the dataset that is used to display the column data.
   * For example: { id: 'firstName', field: 'firstName' }
   *
   * NOTE: a field with dot notation (.) will be considered a complex object.
   * For example: { id: 'Users', field: 'user.firstName' }
   */
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

  /** Grouping option used by a Draggable Grouping Column */
  grouping?: Grouping;

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

  /**
   * @reserved This is a RESERVED property and is used internally by the library to copy over the Column Editor Options.
   * You can read this property if you wish, but DO NOT override this property (unless you know what you're doing) as it will cause other issues with your editors.
   */
  internalColumnEditor?: ColumnEditor;

  /** Label key, for example this could be used as a property key for complex object label display (e.g. dataKey: 'name') */
  labelKey?: any;

  /** Maximum Width of the column in pixels (number only). */
  maxWidth?: number;

  /** Minimum Width of the column in pixels (number only). */
  minWidth?: number;

  /** Field Name to be displayed in the Grid (UI) */
  name?: string;

  /** an event that can be used for triggering an action after a cell change */
  onCellChange?: (e: KeyboardEvent | MouseEvent, args: OnEventArgs) => void;

  /** an event that can be used for triggering an action after a cell click */
  onCellClick?: (e: KeyboardEvent | MouseEvent, args: OnEventArgs) => void;

  /** column output type */
  outputType?: FieldType;

  /** if you want to pass custom paramaters to your Formatter/Editor or anything else */
  params?: any | any[];

  /** The previous column width in pixels (number only) */
  previousWidth?: number;

  /**
   * Useful when you want to display a certain field to the UI, but you want to use another field to query when Filtering/Sorting.
   * Please note that it has higher precendence over the "field" property.
   */
  queryField?: string;

  /**
   * Similar to "queryField" but only used when Filtering (please note that it has higher precendence over "queryField").
   * Useful when you want to display a certain field to the UI, but you want to use another field to query for Filtering.
   */
  queryFieldFilter?: string;

  /**
   * Similar to "queryField" but only used when Sorting (please note that it has higher precendence over "queryField").
   * Useful when you want to display a certain field to the UI, but you want to use another field to query for Sorting.
   */
  queryFieldSorter?: string;

  /** Is the column resizable, can we make it wider/thinner? A resize cursor will show on the right side of the column when enabled. */
  resizable?: boolean;

  /** Do we want to re-render the grid on a grid resize */
  rerenderOnResize?: boolean;

  /** Defaults to false, which leads to Sanitizing all data (striping out any HTML tags) when being evaluated on export. */
  sanitizeDataExport?: boolean;

  /** Is the column selectable? Goes with grid option "enableCellNavigation: true". */
  selectable?: boolean;

  /** Is the column sortable? Goes with grid option "enableSorting: true". */
  sortable?: boolean;

  /** Custom Sorter function that can be provided to the column */
  sorter?: Sorter;

  /** Custom Tooltip that can ben shown to the column */
  toolTip?: string;

  /** What is the Field Type, this can be used in the Formatters/Editors/... */
  type?: FieldType;

  /** Defaults to false, when set to True will lead to the column being unselected in the UI */
  unselectable?: boolean;

  /** Editor Validator */
  validator?: EditorValidator;

  /** Width of the column in pixels (number only). */
  width?: number;
}
