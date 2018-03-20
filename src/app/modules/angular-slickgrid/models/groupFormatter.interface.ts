import { Column } from './column.interface';

export type GroupFormatter = (totals: any, columnDef: Column) => string;
