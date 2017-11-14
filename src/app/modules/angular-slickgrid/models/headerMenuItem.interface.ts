export interface HeaderMenuItem {
  command?: string;       // A command identifier to be passed to the onCommand event handlers.
  disabled?: boolean;     // Whether the item is disabled.
  iconCssClass?: string;  // A CSS class to be added to the menu item icon.
  iconImage?: string;     // A url to the icon image.
  title?: string;         // Menu item text.
  tooltip?: string;       // Item tooltip.
}
