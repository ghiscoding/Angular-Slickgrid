import { CustomGridMenu } from './customGridMenu.interface';

export interface GridMenu {
  customTitle?: string;
  columnTitle?: string;
  iconImage?: string;
  iconCssClass?: string;
  leaveOpen?: boolean;
  menuWidth?: number;
  resizeOnShowHeaderRow?: boolean;
  customItems?: CustomGridMenu[];

  onBeforeMenuShow?: (e: Event, args: any) => void;
  onMenuClose?: (e: Event, args: any) => void;
  onCommand?: (e: Event, args: any) => void;
}
