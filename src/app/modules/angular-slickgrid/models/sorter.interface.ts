import { SortDirectionNumber } from './sortDirectionNumber.enum';

export type Sorter = (value1: any, value2: any, sortDirection: SortDirectionNumber) => number;
