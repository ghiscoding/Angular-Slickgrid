import {Column} from './column.interface';
export declare type Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string | { text: string; removeClasses: string; addClasses: string; };
