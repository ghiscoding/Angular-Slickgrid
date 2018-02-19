import { ColumnFilter } from './columnFilter.interface';
import { Editor } from './editor.interface';
import { FieldType } from './fieldType';
import { Formatter } from './formatter.interface';
import { HeaderButtonItem } from './headerButtonItem.interface';
import { HeaderMenuItem } from './headerMenuItem.interface';
import { OnEventArgs } from './onEventArgs.interface';
import { Sorter } from './sorter.interface';

export interface Column {
  /** async background post-rendering formatter */
  asyncPostRender?: (domCellNode: any, row: number, dataContext: any, columnDef: Column) => void;
  cannotTriggerInsert?: boolean;

  /** CSS class to add to the column cell */
  cssClass?: string;

  /** Column span in pixels or `*`, only input the number value */
  colspan?: number | '*';

  /** Do we want default sort to be ascending? True by default */
  defaultSortAsc?: boolean;

  /** Inline editor for the cell value */
  editor?: Editor | any;

  /** Defaults to false, which leads to Formatters being evaluated on export */
  exportWithFormatter?: boolean;

  /**
   * Do we want to force the cell value to be a string?
   * When set to True, it will wrap the cell value in double quotes and add an equal sign (=) at the beginning of the cell to force Excel to evaluate it as a string and not change it's format.
   * For example, without this flag a cell value with "1E06" would be interpreted as a number becoming (1.0E06) by Excel.
   * When set this flag to True, the cell value will be wrapped with an equal sign and double quotes, which forces Excel to evaluate it as a string. The output will be:: ="1E06" */
  exportForceToKeepAsString?: boolean;

  field: string;
  filter?: ColumnFilter;
  filterable?: boolean;
  filterSearchType?: FieldType;
  filterTemplate?: any;
  focusable?: boolean;
  formatter?: Formatter;
  header?: {
    buttons?: HeaderButtonItem[];
    menu?: {
      items: HeaderMenuItem[];
    };
  };
  headerCssClass?: string;
  headerKey?: string;
  id: number | string;
  isEditable?: boolean;
  isHidden?: boolean;
  json?: any; // catchall for meta info - TODO: rm
  key?: string;
  manuallySized?: boolean;
  maxWidth?: number;
  minWidth?: number;
  name?: string;
  onCellChange?: (args: OnEventArgs) => void;
  onCellClick?: (args: OnEventArgs) => void;
  outputType?: FieldType;
  params?: any;
  previousWidth?: number;
  queryField?: string;
  resizable?: boolean;
  rerenderOnResize?: boolean;
  showHidden?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  sorter?: Sorter;
  toolTip?: string;
  type?: FieldType;
  // validator?: Validator;
  validator?: any;
  width?: number;
  // groupTotalsFormatter?(item: GroupTotals, columnDef: Column): string;
}
