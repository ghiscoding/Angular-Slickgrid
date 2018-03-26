import { GridOption } from './gridOption.interface';
import { Column } from './column.interface';
export interface OnEventArgs {
    row: number;
    cell: number;
    columnDef: Column;
    dataContext: any;
    dataView: any;
    grid: any;
    gridDefinition: GridOption;
}
