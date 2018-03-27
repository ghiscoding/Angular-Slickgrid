import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
export declare const Sorters: {
    date: (value1: any, value2: any, sortDirection: SortDirectionNumber) => number;
    dateIso: (value1: any, value2: any, sortDirection: SortDirectionNumber) => number;
    dateUs: (value1: any, value2: any, sortDirection: SortDirectionNumber) => number;
    dateUsShort: (value1: any, value2: any, sortDirection: SortDirectionNumber) => number;
    numeric: (value1: any, value2: any, sortDirection: SortDirectionNumber) => number;
    string: (value1: any, value2: any, sortDirection: SortDirectionNumber) => number;
};
