import { GridOption, Column } from './../models/index';

export class SharedService {
  dataView: any;
  grid: any;
  gridOptions: GridOption;
  columnDefinitions: Column[];
  groupItemMetadataProvider: any;

  init(grid: any, dataView: any, gridOptions: GridOption, columnDefinitions: Column[]) {
    this.grid = grid;
    this.dataView = dataView;
    this.gridOptions = gridOptions;
    this.columnDefinitions = columnDefinitions;
  }
}
