import { TranslateService } from '@ngx-translate/core';
import { GridOption as UniversalGridOption } from '@slickgrid-universal/common';

import { RowDetailView } from './index';

export interface GridOption extends UniversalGridOption {
  /** ngx-translate i18n translation service instance */
  i18n?: TranslateService;

  /** Row Detail View Plugin options & events (columnId, cssClass, toolTip, width) */
  rowDetailView?: RowDetailView;
}
