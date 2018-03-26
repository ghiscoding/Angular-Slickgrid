import { Column } from './column.interface';
export declare type GroupFormatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string;
