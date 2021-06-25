import { Column, FormatterResultObject, SlickGrid } from '@slickgrid-universal/common';

export declare type Formatter<T = any> = (row: number, cell: number, value: any, columnDef: Column<T>, dataContext: T, grid: SlickGrid) => string | FormatterResultObject;
