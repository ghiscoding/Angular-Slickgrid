import { FilterCallback } from './filterCallback.interface';
import { Column } from './column.interface';
import { FilterArguments } from './filterArguments.interface';
export interface Filter {
    /** Column definition */
    columnDef: Column;
    /** Callback that will be run after the filter triggers */
    callback: FilterCallback;
    /** SlickGrid grid object */
    grid: any;
    /** Defined search term to pre-load */
    searchTerm?: string | number | boolean;
    /** Array of defined search terms to pre-load */
    searchTerms?: string[] | number[] | boolean[];
    /** You can use "params" to pass any types of arguments to your Filter */
    params?: any | any[];
    /** Funtion to initialize the Filter class */
    init: (args: FilterArguments) => void;
    /** Clear filter function */
    clear: () => void;
    /** Destroy filter function */
    destroy: () => void;
}
