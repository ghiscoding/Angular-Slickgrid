import { Column, SlickGrid } from './index';

export type ColumnReorderFunction = (grid: SlickGrid, headers: HTMLElement[], headerColumnWidthDiff: any, setColumns: (col: Column) => void, setupColumnResize: () => void, columns: Column[], getColumnIndex: number, uid: string, trigger: boolean) => void;
