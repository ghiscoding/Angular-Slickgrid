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
}
