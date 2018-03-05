import { Column, FilterArguments, FilterCallback, SearchTerm } from './../models/index';
export interface Filter {
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
    /** Set value(s) on the DOM element */
    setValues: (values: SearchTerm | SearchTerm[] | undefined) => void;
}
