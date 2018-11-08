export class GroupItemMetaProviderPlugin {
  constructor(private grid: any, private groupItemMetadataProvider?: any) {}

  /** register the group item metadata provider to add expand/collapse group handlers */
  register() {
    const plugin = this.groupItemMetadataProvider || {};
    this.grid.registerPlugin(plugin);

    return plugin;
  }
}
