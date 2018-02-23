import { Column, FilterArguments, FilterCallback, SearchTerm } from './../models/index';

// export type Filter = (searchTerms: string | number | string[] | number[], columnDef: Column, params?: any) => string;
export interface Filter {
  // Properties which must be Public

  /** Column definition */
  columnDef: Column;

  /** Callback that will be run after the filter triggers */
  callback: FilterCallback;

  /** SlickGrid grid object */
  grid: any;

  /** Defined search term to pre-load */
  searchTerm?: SearchTerm;

  /** Array of defined search terms to pre-load */
  searchTerms?: SearchTerm[];

  /** You can use "params" to pass any types of arguments to your Filter */
  params?: any | any[];

  /** Funtion to initialize the Filter class */
  init: (args: FilterArguments) => void;

  /** Clear filter function */
  clear: () => void;

  /** Destroy filter function */
  destroy: () => void;
}
