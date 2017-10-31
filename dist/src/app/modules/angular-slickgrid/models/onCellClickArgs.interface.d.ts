import { GridOption } from './gridOption.interface';
import { Column } from './column.interface';
export interface OnCellClickArgs {
    columnDef: Column;
    dataContext: any;
    dataView: any;
    grid: any;
    gridDefinition: GridOption;
}
