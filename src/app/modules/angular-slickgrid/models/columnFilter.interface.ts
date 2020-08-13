import { Observable, Subject } from 'rxjs';

import {
  CollectionCustomStructure,
  CollectionFilterBy,
  CollectionOption,
  CollectionSortBy,
  Column,
  FieldType,
  Filter,
  MultipleSelectOption,
  OperatorString,
  OperatorType,
  SearchTerm,
} from './index';

export interface ColumnFilter {
  /** Do we want to bypass the Backend Query? Commonly used with an OData Backend Service, if we want to filter without calling the regular OData query. */
  bypassBackendQuery?: boolean;

  /**
   * Some Filter could support callbacks from their jQuery instance (for now only AutoComplete supports this), for example:
   * filter: { model:{ Filters.autoComplete }, callbacks: { _renderItem: (ul, item) => { ... } }}
   *
   * will be interpreted as $(#element).autocomplete("instance")._renderItem = (ul, item) => { ... }
   * from jQuery UI doc: https://jqueryui.com/autocomplete/#custom-data
   */
  callbacks?: any;

  /** Column ID */
  columnId?: string;

  /** Column Definition */
  columnDef?: Column;

  /** Custom Filter */
  customFilter?: Filter;

  /** Search terms to preload (collection), please note it is better to use the "presets" grid option which is more powerful. */
  searchTerms?: SearchTerm[] | undefined;

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

  /**
   * A collection of items/options (commonly used with a Select/Multi-Select Filter)
   * It can be a collection of string or label/value pair (the pair can be customized via the "customStructure" option)
   */
  collection?: any[];

  /** Options to change the behavior of the "collection" */
  collectionOptions?: CollectionOption;

  /** We could filter some 1 or more items from the collection */
  collectionFilterBy?: CollectionFilterBy | CollectionFilterBy[];

  /** We could sort the collection by 1 or more properties, or by translated value(s) when enableTranslateLabel is True */
  collectionSortBy?: CollectionSortBy | CollectionSortBy[];

  /** A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Filter */
  customStructure?: CollectionCustomStructure;

  /**
   * Defaults to false, when set it will render any HTML code instead of removing it (sanitized)
   * Currently only supported by the following Editors: AutoComplete, MultipleSelect & SingleSelect
   */
  enableRenderHtml?: boolean;

  /** Defaults to false, do we want to trim white spaces from the filter value typed by the user? */
  enableTrimWhiteSpace?: boolean;

  /** Do we want the Filter to handle translation (localization)? */
  enableTranslateLabel?: boolean;

  /**
   * Options that could be provided to the Filter, example: { container: 'body', maxHeight: 250}
   *
   * Please note that if you use options that have existed model interfaces, you should cast with "as X",
   * for example { filterOptions: {maxHeight: 250} as MultipleSelectOption }
   */
  filterOptions?: MultipleSelectOption | any;

  /**
   * Use "params" to pass any type of arguments to your Custom Filter
   * for example, to pass a second collection to a select Filter we can type this:
   * params: { options: [{ value: true, label: 'True' }, { value: true, label: 'True'} ]}
   */
  params?: any;

  /**
   * Placeholder text that can be used by some Filters.
   * Note that this will override the default placeholder configured in the global config
   */
  placeholder?: string;

  /**
   * Useful when you want to display a certain field to the UI, but you want to use another field to query when Filtering/Sorting.
   * Please note that it has higher precendence over the "field" property.
   */
  queryField?: string;

  /** What is the Field Type that can be used by the Filter (as precedence over the "type" set the column definition) */
  type?: FieldType;

  /** Step value of the filter, works only with Filters supporting it (input text, number, float, range, slider) */
  valueStep?: number | string;
}
