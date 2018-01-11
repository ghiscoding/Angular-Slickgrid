import { Column } from './column.interface';

export type Filter = (searchTerm: string, columnDef: Column, params?: any) => string;
