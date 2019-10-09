import { Column } from './column.interface';
import { FormatterResultObject } from './formatterResultObject.interface';

export declare type Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid?: any) => string | FormatterResultObject;
