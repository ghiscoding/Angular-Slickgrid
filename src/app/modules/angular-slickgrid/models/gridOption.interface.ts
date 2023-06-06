import type { TranslateService } from '@ngx-translate/core';
import type { GridOption as UniversalGridOption } from '@slickgrid-universal/common';

import type { RowDetailView } from './index';

export interface GridOption extends UniversalGridOption {
  /** ngx-translate i18n translation service instance */
  i18n?: TranslateService;

  /** Row Detail View Plugin options & events (columnId, cssClass, toolTip, width) */
  rowDetailView?: RowDetailView;
}
