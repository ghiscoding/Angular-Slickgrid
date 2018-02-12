import { OperatorString } from './operatorString';
import { Column } from './column.interface';

export type FilterCallback = (e: Event | undefined, args: { columnDef: Column, operator?: OperatorString, searchTerms?: string[] | number[] }) => void;
