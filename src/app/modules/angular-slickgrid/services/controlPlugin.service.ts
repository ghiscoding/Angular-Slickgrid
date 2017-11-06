import { CellArgs, Column, GridOption } from './../models';

// using external js modules in Angular
declare var Slick: any;

export class ControlPluginService {
  attachDifferentControlOrPlugins(grid: any, columnDefinitions: Column[], options: GridOption, dataView: any) {
    if (options.enableColumnPicker) {
      const columnPickerControl = new Slick.Controls.ColumnPicker(columnDefinitions, grid, options);
    }
    if (options.enableGridMenu) {
      options.gridMenu = options.gridMenu || {};
      options.gridMenu.columnTitle = options.gridMenu.columnTitle || 'Columns';
      options.gridMenu.iconCssClass = options.gridMenu.iconCssClass || 'fa fa-bars';
      options.gridMenu.menuWidth = options.gridMenu.menuWidth || 18;
      options.gridMenu.resizeOnShowHeaderRow = options.showHeaderRow;

      const gridMenuControl = new Slick.Controls.GridMenu(columnDefinitions, grid, options);
      gridMenuControl.onCommand.subscribe((e: Event, args: CellArgs) => {
        if (typeof options.onGridMenuCommand === 'function') {
          options.onGridMenuCommand(e, args);
        }
      });
    }
    if (options.enableAutoTooltip) {
      grid.registerPlugin(new Slick.AutoTooltips(options.autoTooltipOptions || {}));
    }
    if (options.enableRowSelection) {
      grid.setSelectionModel(new Slick.RowSelectionModel(options.rowSelectionOptions || {}));
    }
    if (options.enableHeaderButton) {
      const headerButtonsPlugin = new Slick.Plugins.HeaderButtons(options.headerButtonOptions || {});
      grid.registerPlugin(headerButtonsPlugin);
      headerButtonsPlugin.onCommand.subscribe((e: Event, args: CellArgs) => {
        if (typeof options.onHeaderButtonCommand === 'function') {
          options.onHeaderButtonCommand(e, args);
        }
      });
    }
    if (options.enableHeaderMenu) {
      const headerMenuPlugin = new Slick.Plugins.HeaderMenu(options.headerMenuOptions || {});
      grid.registerPlugin(headerMenuPlugin);
      headerMenuPlugin.onCommand.subscribe((e: Event, args: CellArgs) => {
        if (typeof options.onHeaderMenuCommand === 'function') {
          options.onHeaderMenuCommand(e, args);
        }
      });
    }
    if (options.registerPlugins !== undefined) {
      if (Array.isArray(options.registerPlugins)) {
        options.registerPlugins.forEach((plugin) => {
          grid.registerPlugin(plugin);
        });
      } else {
        grid.registerPlugin(options.registerPlugins);
      }
    }
  }
}
