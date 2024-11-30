import type { TranslateService } from '@ngx-translate/core';
import type { BasePaginationComponent, Column, GridOption as UniversalGridOption } from '@slickgrid-universal/common';

import type { RowDetailView } from './rowDetailView.interface';

export interface GridOption<C extends Column = Column> extends UniversalGridOption<C> {
  /** External Custom Pagination Component that can be provided by the user */
  customPaginationComponent?: typeof BasePaginationComponent;

  /** ngx-translate i18n translation service instance */
  i18n?: TranslateService;

  /** Row Detail View Plugin options & events (columnId, cssClass, toolTip, width) */
  rowDetailView?: RowDetailView;
}
