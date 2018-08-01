import {
  CollectionFilterBy,
  CollectionSortBy,
  Column,
  Filter,
  MultipleSelectOption,
  OperatorString,
  OperatorType,
  SearchTerm
} from './../models/index';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface ColumnFilter {
  /** Do we want to bypass the Backend Query? Commonly used with an OData Backend Service, if we want to filter without calling the regular OData query. */
  bypassBackendQuery?: boolean;

  /** Column ID */
  columnId?: string;

  /** Column Definition */
  columnDef?: Column;

  /** Custom Filter */
  customFilter?: Filter;

  /** Search terms (collection) */
  searchTerms?: SearchTerm[];

  /** Operator to use when filtering (>, >=, EQ, IN, ...) */
  operator?: OperatorType | OperatorString;

  /** Maximum value of the filter, works only with Filters supporting it (text, number, float, slider) */
  maxValue?: number | string;

  /** Minimum value of the filter, works only with Filters supporting it (text, number, float, slider) */
  minValue?: number | string;

  /** Filter to use (input, multipleSelect, singleSelect, select, custom) */
  model?: any;

  /** A collection of items/options that will be loaded asynchronously (commonly used with a Select/Multi-Select Filter) */
  collectionAsync?: Promise<any> | Observable<any> | Subject<any>;

  /** A collection of items/options (commonly used with a Select/Multi-Select Filter) */
  collection?: any[];

  /** We could filter some items from the collection */
  collectionFilterBy?: CollectionFilterBy;

  /** We could sort the collection by their value, or by translated value when enableTranslateLabel is True */
  collectionSortBy?: CollectionSortBy;

  /** Options that could be provided to the Filter, example: { container: 'body', maxHeight: 250} */
  filterOptions?: MultipleSelectOption | any;

  /**
   * Defaults to false, when set it will render any HTML code instead of removing it
   * So far only used in the MultipleSelect & SingleSelect Filters will support it
   */
  enableRenderHtml ?: boolean;

  /** Do we want the Filter to handle translation (localization)? */
  enableTranslateLabel?: boolean;

  /** A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Filter */
  customStructure?: {
    /** your custom property name to for the "label" (text displayed in the select dropdown UI) */
    label: string;

    /** your custom property name to use for the "value" (equals of the "option" in a select dropdown) */
    value: string;

    /** an optional prefix that will be prepended before the label text */
    labelPrefix?: string;

    /** an optional suffix that will be appended to the label text */
    labelSuffix?: string;

    /** defaults to false, when using label with prefix/suffix, do we want to add spaces between each? */
    addSpaceBetweenLabels?: boolean;
  };

  /**
   * Use "params" to pass any type of arguments to your Custom Filter
   * for example, to pass a second collection to a select Filter we can type this:
   * params: { options: [{ value: true, label: 'True' }, { value: true, label: 'True'} ]}
   */
  params?: any;

  /** Step value of the filter, works only with Filters supporting it (input text, number, float, range, slider) */
  valueStep?: number | string;
}
