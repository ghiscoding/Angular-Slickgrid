import { Column } from './column.interface';
export declare type Filter = (searchTerm: string, columnDef: Column, params?: any) => string;
