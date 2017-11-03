import { OnEventArgs, CellArgs, GridOption } from './../models/index';

export class GridEventService {
  /* OnMouseHover (Enter/Leave) Events */
  attachOnMouseHover(grid: any) {
    grid.onMouseEnter.subscribe((e: any) => {
      const cell = grid.getCellFromEvent(e);
      if (cell && cell.row >= 0) {
        grid.setSelectedRows([cell.row]);
        e.preventDefault();
      }
    });
    grid.onMouseLeave.subscribe((e: any) => {
      grid.setSelectedRows([]);
      e.preventDefault();
    });
  }

  /* OnCellChange Event */
  attachOnCellChange(grid: any, gridOptions: GridOption, dataView: any) {
    // subscribe to this Slickgrid event of onCellChange
    grid.onCellChange.subscribe((e: Event, args: CellArgs) => {
      if (!e || !args || !args.grid || args.cell === undefined || !args.grid.getColumns || !args.grid.getDataItem) {
        return;
      }
      const column = args.grid.getColumns()[args.cell];

      // if the column definition has a onCellChange property (a callback function), then run it
      if (typeof column.onCellChange === 'function') {
        // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
        const returnedArgs: OnEventArgs = {
          dataView,
          gridDefinition: gridOptions,
          grid,
          columnDef: column,
          dataContext: args.grid.getDataItem(args.row)
        };

        // finally call up the Slick.column.onCellChanges.... function
        column.onCellChange(returnedArgs);
        // e.stopImmediatePropagation();
      }
    });
  }
  /* OnClick Event */
  attachOnClick(grid: any, gridOptions: GridOption, dataView: any) {

    grid.onClick.subscribe((e: Event, args: CellArgs) => {
      if (!e || !args || !args.grid || args.cell === undefined || !args.grid.getColumns || !args.grid.getDataItem) {
        return;
      }
      const column = args.grid.getColumns()[args.cell];

      // if the column definition has a onCellClick property (a callback function), then run it
      if (typeof column.onCellClick === 'function') {
        // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
        const returnedArgs: OnEventArgs = {
          dataView,
          gridDefinition: gridOptions,
          grid,
          columnDef: column,
          dataContext: args.grid.getDataItem(args.row)
        };

        // finally call up the Slick.column.onCellClick.... function
        column.onCellClick(returnedArgs);
        e.stopImmediatePropagation();
      }

      // stop the click event bubbling
      // NOTE: We don't want to stop bubbling when doing an input edit, if we do the autoEdit which has intent of doing singleClick edit will become doubleClick edit
      if (grid.getOptions && !grid.getOptions().autoEdit) {
        // e.stopImmediatePropagation();
      }
    });
  }
}
