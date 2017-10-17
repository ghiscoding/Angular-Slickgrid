import { Column } from './column.interface';

export type Filter = (searchTerm: string, columnDef: Column) => string;
