export interface CustomGridMenu {
    /** Menu item text to show in the list. */
    title: string;
    /** A command identifier to be passed to the onCommand event callback handlers. */
    command: string;
    /** Defaults to false, whether the item is disabled. */
    disabled?: boolean;
    /** CSS class to be added to the menu item icon. */
    iconCssClass?: string;
    /** URL pointing to the icon image. */
    iconImage?: string;
    /** position order in the list, a lower number will make it on top of the list. Internal commands starts at 50. */
    positionOrder?: number;
    /** Item tooltip to show while hovering the command. */
    tooltip?: string;
}
