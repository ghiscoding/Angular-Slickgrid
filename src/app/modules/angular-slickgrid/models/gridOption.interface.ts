import type { TranslateService } from '@ngx-translate/core';
import type { Column, GridOption as UniversalGridOption } from '@slickgrid-universal/common';

import type { RowDetailView } from './index';

export interface GridOption<C extends Column = Column> extends UniversalGridOption<C> {
  /** ngx-translate i18n translation service instance */
  i18n?: TranslateService;

  /** Row Detail View Plugin options & events (columnId, cssClass, toolTip, width) */
  rowDetailView?: RowDetailView;
}
