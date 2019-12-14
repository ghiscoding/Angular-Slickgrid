import { MenuOptionItem } from './menuOptionItem.interface';
import { MenuCallbackArgs } from './menuCallbackArgs.interface';

export interface MenuOptionItemCallbackArgs extends MenuCallbackArgs {
  /** A command identifier to be passed to the onCommand event callback handler (when using "commandItems"). */
  option: string;

  /** Menu item selected */
  item: MenuOptionItem;

  /** Value of the cell we triggered the context menu from */
  value?: any;
}
