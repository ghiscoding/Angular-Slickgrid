import { Column } from './column.interface';

export type Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
