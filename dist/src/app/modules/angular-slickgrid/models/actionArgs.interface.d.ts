import { GridOption } from './gridOption.interface';
import { Column } from './column.interface';
export interface ActionArgs {
    columnDef: Column;
    dataContext: any;
    dataView: any;
    grid: any;
    gridDefinition: GridOption;
}
