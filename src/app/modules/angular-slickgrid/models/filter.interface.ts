import { Column } from './column.interface';

export type Filter = (searchTerms: string | number | string[] | number[], columnDef: Column, params?: any) => string;
