export interface HeaderButtonItem {
    command?: string;
    cssClass?: string;
    handler?: (e: Event) => void;
    image?: string;
    showOnHover?: boolean;
    tooltip?: string;
}
