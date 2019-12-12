import { MenuItem } from './menuItem.interface';
import { MenuItemCallbackArgs } from './menuItemCallbackArgs.interface';

export interface MenuOptionItem extends MenuItem {
  /** An option to be passed to the onOptionSelected event callback handler (when using "optionItems"). */
  option: any;

  // --
  // action/override callbacks

  /** Optionally define a callback function that gets executed when item is chosen (and/or use the onCommand event) */
  action?: (event: Event, callbackArgs: MenuItemCallbackArgs<MenuOptionItem>) => void;
}
