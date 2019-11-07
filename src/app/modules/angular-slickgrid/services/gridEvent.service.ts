import { CellArgs, Column, GridOption, OnEventArgs, SlickEventHandler } from './../models/index';

// using external non-typed js libraries
declare var Slick: any;

export class GridEventService {
  private _eventHandler: SlickEventHandler;

  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  constructor() {
    this._eventHandler = new Slick.EventHandler();
  }

  /* OnCellChange Event */
  bindOnCellChange(grid: any, dataView: any) {
    // subscribe to this Slickgrid event of onCellChange
    this._eventHandler.subscribe(grid.onCellChange, (e: KeyboardEvent | MouseEvent, args: CellArgs) => {
      if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
        return;
      }
      const column: Column = grid.getColumns()[args.cell];

      // if the column definition has a onCellChange property (a callback function), then run it
      if (typeof column.onCellChange === 'function') {
        // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
        const returnedArgs: OnEventArgs = {
          row: args.row,
          cell: args.cell,
          dataView,
          grid,
          columnDef: column,
          dataContext: grid.getDataItem(args.row)
        };

        // finally call up the Slick.column.onCellChanges.... function
        column.onCellChange(e, returnedArgs);
      }
    });
  }

  /* OnClick Event */
  bindOnClick(grid: any, dataView: any) {
    this._eventHandler.subscribe(grid.onClick, (e: KeyboardEvent | MouseEvent, args: CellArgs) => {
      if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
        return;
      }
      const column: Column = grid && grid.getColumns && grid.getColumns()[args.cell];
      const gridOptions: GridOption = grid && grid.getOptions && grid.getOptions() || {};

      // only when using autoCommitEdit, we will make the cell active (in focus) when clicked
      // setting the cell as active as a side effect and if autoCommitEdit is set to false then the Editors won't save correctly
      if (gridOptions.enableCellNavigation && (!gridOptions.editable || (gridOptions.editable && gridOptions.autoCommitEdit))) {
        grid.setActiveCell(args.row, args.cell);
      }

      // if the column definition has a onCellClick property (a callback function), then run it
      if (typeof column.onCellClick === 'function') {
        // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
        const returnedArgs: OnEventArgs = {
          row: args.row,
          cell: args.cell,
          dataView,
          grid,
          columnDef: column,
          dataContext: grid.getDataItem(args.row)
        };

        // finally call up the Slick.column.onCellClick.... function
        column.onCellClick(e, returnedArgs);
      }
    });
  }

  dispose() {
    this._eventHandler.unsubscribeAll();
  }
}
