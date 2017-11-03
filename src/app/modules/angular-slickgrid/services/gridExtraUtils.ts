import { CellArgs } from './../models';

export class GridExtraUtils {
  static getColumnDefinitionAndData(args: CellArgs) {
    if (!args || !args.grid || !args.grid.getColumns || !args.grid.getDataItem) {
      throw new Error('To get the column definition and data, we need to have these arguments passed (row, cell, grid)');
    }
    return {
      columnDef: args.grid.getColumns()[args.cell],
      dataContext: args.grid.getDataItem(args.row)
    }
  }
}
