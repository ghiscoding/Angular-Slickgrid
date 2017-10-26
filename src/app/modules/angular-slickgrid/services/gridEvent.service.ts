import { ActionArgs, CellArgs, GridOption } from './../models';

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

  /* OnClick Event */
  attachOnClick(grid: any, gridOptions: GridOption, dataView: any) {
    grid.onClick.subscribe((e, args: CellArgs) => {
      if (!e || !args || !args.grid || !args.cell || !args.grid.getColumns || !args.grid.getDataItem) {
        return;
      }
      const column = args.grid.getColumns()[args.cell];
      const action = column.action;

      // so if the columns definition does have an action property (a function attached), then run it
      if (typeof action === 'function') {
        // attach both "this._gridOptions" and "_slickDataViewObj" since we'll need them inside the AJAX action
        const actionArgs: ActionArgs = {
          dataView,
          gridDefinition: gridOptions,
          grid,
          columnDef: args.grid.getColumns()[args.cell],
          dataContext: args.grid.getDataItem(args.row)
        };

        // AngularJS with SlickGrid action is possible via a few defined arguments passed as an object
        // args.angular = (this._gridOptions.hasOwnProperty('angular')) ? this._gridOptions.angular : null;

        // finally call up the Slick.Actions.... function
        action(actionArgs);
        e.stopImmediatePropagation();
      }

      // stop the click event bubbling
      // NOTE: We don't want to stop bubbling when doing an input edit, if we do the autoEdit which has intent of doing singleClick edit will become doubleClick edit
      if (grid && grid.getOptions && grid.getOptions().autoEdit) {
        e.stopImmediatePropagation();
      }
    });
  }
}
