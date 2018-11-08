import { GridOption } from '../models';

// using external non-typed js libraries
declare var Slick: any;

export class AutoTooltipPlugin {
  constructor(private grid: any, private gridOptions: GridOption) {}

  register() {
    const plugin = new Slick.AutoTooltips(this.gridOptions.autoTooltipOptions || {});
    this.grid.registerPlugin(plugin);

    return plugin;
  }
}
