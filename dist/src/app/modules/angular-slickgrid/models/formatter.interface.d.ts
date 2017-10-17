import { Column } from './column.interface';
export declare type Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => string;
