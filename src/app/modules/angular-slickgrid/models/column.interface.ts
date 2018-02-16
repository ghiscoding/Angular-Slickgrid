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

  /** By default the Export will use Formatter output, if you don't want that behavior set this False */
  exportWithFormatter?: boolean;

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
