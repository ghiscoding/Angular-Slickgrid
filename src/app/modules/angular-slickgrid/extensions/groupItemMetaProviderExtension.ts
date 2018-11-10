import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Injectable()
export class GroupItemMetaProviderExtension {
  constructor(private sharedService: SharedService) {}

  /** register the group item metadata provider to add expand/collapse group handlers */
  register() {
    const plugin = this.sharedService.groupItemMetadataProvider || {};
    this.sharedService.grid.registerPlugin(plugin);

    return plugin;
  }
}
