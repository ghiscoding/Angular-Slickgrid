import { Column } from './column.interface';

export type FilterCallback = (e: Event | undefined, args: { columnDef: Column, operator?: string, searchTerms?: string[] | number[] }) => void;
