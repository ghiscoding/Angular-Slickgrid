import { GridOption, HeaderButtonOnCommandArgs } from '../models';

// using external non-typed js libraries
declare var Slick: any;

export class HeaderButtonExtension {
  constructor(private grid: any, private gridOptions: GridOption) {}

  register() {
    // Header Button Plugin
    const plugin = new Slick.Plugins.HeaderButtons(this.gridOptions.headerButton || {});
    this.grid.registerPlugin(plugin);
    plugin.onCommand.subscribe((e: Event, args: HeaderButtonOnCommandArgs) => {
      if (this.gridOptions.headerButton && typeof this.gridOptions.headerButton.onCommand === 'function') {
        this.gridOptions.headerButton.onCommand(e, args);
      }
    });

    return plugin;
  }
}
