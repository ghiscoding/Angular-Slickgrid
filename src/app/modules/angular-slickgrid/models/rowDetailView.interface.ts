import type { Type } from '@angular/core';
import type { RowDetailView as UniversalRowDetailView } from '@slickgrid-universal/common';

export interface RowDetailView extends UniversalRowDetailView {
  /**
   * Optionally pass your Parent Component reference to your Child Component (row detail component).
   * note:: If anyone finds a better way of passing the parent to the row detail extension, please reach out and/or create a PR
   */
  parent?: any;

  /** View Component of the preload template (typically a spinner) which shows after opening on the row detail but before the row detail is ready */
  preloadComponent?: Type<object>;

  /** View Component that will be loaded in the row detail after the async function completed */
  viewComponent: Type<object>;
}
