import { OperatorString } from './operatorString';
import { Column } from './column.interface';
export interface FilterCallbackArg {
    columnDef: Column;
    operator?: OperatorString;
    searchTerm?: string | number | boolean;
    searchTerms?: number[] | string[] | boolean[];
}
export declare type FilterCallback = (e: Event | undefined, args: FilterCallbackArg) => void;
