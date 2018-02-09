import { Column } from './column.interface';
import { FormElementType } from './formElementType';

export interface ColumnFilter {
  bypassBackendQuery?: boolean;
  columnId?: string;
  columnDef?: Column;
  searchTerm?: string | number;
  searchTerms?: string[] | number[];
  listTerm?: string[] | number[];
  operator?: string;
  type?: FormElementType;
  selectOptions?: any[];
  enableTranslateLabel?: boolean;
  customStructure?: {
    label: string;
    value: string;
  };
}
