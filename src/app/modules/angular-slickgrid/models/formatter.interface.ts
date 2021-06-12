import { SlickGrid } from '@slickgrid-universal/common';
import { Column } from './column.interface';
import { FormatterResultObject } from './formatterResultObject.interface';

export declare type Formatter<T = any> = (row: number, cell: number, value: any, columnDef: Column<T>, dataContext: T, grid: SlickGrid) => string | FormatterResultObject;
