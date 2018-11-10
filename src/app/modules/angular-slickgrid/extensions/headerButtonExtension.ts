import { Injectable } from '@angular/core';
import { HeaderButtonOnCommandArgs } from '../models';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class HeaderButtonExtension {
  constructor(private sharedService: SharedService) {}

  register() {
    // Header Button Plugin
    const plugin = new Slick.Plugins.HeaderButtons(this.sharedService.gridOptions.headerButton || {});
    this.sharedService.grid.registerPlugin(plugin);
    plugin.onCommand.subscribe((e: Event, args: HeaderButtonOnCommandArgs) => {
      if (this.sharedService.gridOptions.headerButton && typeof this.sharedService.gridOptions.headerButton.onCommand === 'function') {
        this.sharedService.gridOptions.headerButton.onCommand(e, args);
      }
    });

    return plugin;
  }
}
