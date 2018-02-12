import { Column } from './column.interface';
import { Filter } from './filter.interface';
import { FormElementType } from './formElementType';

export interface ColumnFilter {
  /** Do we want to bypass the Backend Query? Commonly used with an OData Backend Service, if we want to filter without calling the regular OData query. */
  bypassBackendQuery?: boolean;

  /** Column ID */
  columnId?: string;

  /** Column Definition */
  columnDef?: Column;

  /** Custom Filter */
  customFilter?: Filter;

  /** Search term (singular) */
  searchTerm?: string | number;

  /** Search terms (collection) */
  searchTerms?: string[] | number[];

  /** Operator to use when filtering (>, >=, EQ, IN, ...) */
  operator?: string;

  /** Type of Filter to use (input, select, multi-select, custom) */
  type?: FormElementType;

  /** A collection of items/options (commonly used with a Select/Multi-Select Filter) */
  collection?: any[];

  /** Options that could be provided to the Filter, example: { container: 'body', maxHeight: 250} */
  options?: any;

  /** DEPRECATED, please use "collection" instead which is more generic and not specific to a Select Filter. Refer to the Select Filter Wiki page for more info: https://github.com/ghiscoding/Angular-Slickgrid/wiki/Select-Filter  */
  selectOptions?: any[];

  /** Do we want the Filter to handle translation (localization)? */
  enableTranslateLabel?: boolean;

  /** A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Filter */
  customStructure?: {
    label: string;
    value: string;
  };

  /**
   * Use "params" to pass any type of arguments to your Custom Filter (type: FormElementType.custom)
   * for example, to pass the option collection to a select Filter we can type this:
   * params: { options: [{ value: true, label: 'True' }, { value: true, label: 'True'} ]}
   * */
  params?: any;
}
