import { CustomGridMenu } from './customGridMenu.interface';

export interface GridMenu {
  customItems?: CustomGridMenu[];
  customTitle?: string;
  columnTitle?: string;
  iconImage?: string;
  iconCssClass?: string;
  leaveOpen?: boolean;
  menuWidth?: number;
  forceFitTitle?: string;
  resizeOnShowHeaderRow?: boolean;
  showClearAllFiltersCommand?: boolean;
  showExportCsvCommand?: boolean;
  showExportTextDelimitedCommand?: boolean;
  showRefreshDatasetCommand?: boolean;
  showToggleFilterCommand?: boolean;
  syncResizeTitle?: string;

  onBeforeMenuShow?: (e: Event, args: any) => void;
  onMenuClose?: (e: Event, args: any) => void;
  onCommand?: (e: Event, args: any) => void;
}
