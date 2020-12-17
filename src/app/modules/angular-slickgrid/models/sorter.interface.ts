import { Column } from './column.interface';
import { GridOption } from './gridOption.interface';
import { SortDirectionNumber } from './sortDirectionNumber.enum';

export type Sorter = (value1: any, value2: any, sortDirection: SortDirectionNumber, sortColumn?: Column, gridOptions?: GridOption) => number;
