import { Column } from './column.interface';

export type GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => string;
