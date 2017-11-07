export interface HeaderButton {
    cssClass?: string;
    image?: string;
    tooltip?: string;
    showOnHover?: boolean;
    handler?: (e: Event) => void;
    command?: string;
}
