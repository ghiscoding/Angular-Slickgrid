import { MenuCallbackArgs } from './menuCallbackArgs.interface';
import { MenuCommandItem } from './menuCommandItem.interface';
import { MenuCommandItemCallbackArgs } from './menuCommandItemCallbackArgs.interface';
import { MenuOptionItem } from './menuOptionItem.interface';
import { MenuOptionItemCallbackArgs } from './menuOptionItemCallbackArgs.interface';

export interface CellMenu {
  /** Defaults to true, Auto-align dropup or dropdown menu to the left or right depending on grid viewport available space */
  autoAdjustDrop?: boolean;

  /** Defaults to 0, Optionally add an offset to the auto-align of the drop menu */
  autoAdjustDropOffset?: string;

  /** Defaults to true, Auto-align drop menu to the left or right depending on grid viewport available space */
  autoAlignSide?: boolean;

  /** Defaults to 0, Optionally add an offset to the left/right side auto-align */
  autoAlignSideOffset?: string;

  /** Array of Command Items (title, command, disabled, ...) */
  commandItems?: Array<MenuCommandItem | 'divider'>;

  /** Defaults to "Commands" which is the title that shows up over the commands list */
  commandTitle?: string;

  /** Same as "commandTitle", except that it's a translation key which can be used on page load and/or when switching locale */
  commandTitleKey?: string;

  /** Defaults to false, Hide the Close button on top right */
  hideCloseButton?: boolean;

  /** Defaults to false, Hide the Commands section even when the commandItems array is filled */
  hideCommandSection?: boolean;

  /** Defaults to true, do we want to hide the Cell Menu when a scrolling event occurs? */
  hideMenuOnScroll?: boolean;

  /** Defaults to false, Hide the Options section even when the optionItems array is filled */
  hideOptionSection?: boolean;

  /** Maximum height that the drop menu will have, can be a number (250) or text ("none") */
  maxHeight?: number | string;

  /** Width that the drop menu can have */
  width?: number | string;

  /** Array of Option Items (title, option, disabled, ...) */
  optionItems?: Array<MenuOptionItem | 'divider'>;

  /** Title of the Option section */
  optionTitle?: string;

  /** Same as "optionTitle", except that it's a translation key which can be used on page load and/or when switching locale */
  optionTitleKey?: string;

  // --
  // action/override callbacks

  /** Callback method that user can override the default behavior of enabling/disabling an item from the list. */
  menuUsabilityOverride?: (args: MenuCallbackArgs) => boolean;

  // --
  // Events

  /** Fired after extension (control) is registered by SlickGrid */
  onExtensionRegistered?: (plugin: any) => void;

  /** SlickGrid Event fired before the menu is shown. */
  onBeforeMenuShow?: (e: Event, args: any) => void;

  /** SlickGrid Event fired when any of the columns checkbox selection changes. */
  onColumnsChanged?: (e: Event, args: any) => void;

  /** SlickGrid Event fired when the menu is closing. */
  onBeforeMenuClose?: (e: Event, args: any) => void;

  /** SlickGrid Event fired on menu option clicked from the Command items list */
  onCommand?: (e: Event, args: MenuCommandItemCallbackArgs) => void;

  /** SlickGrid Event fired on menu option selected from the Option items list. */
  onOptionSelected?: (e: Event, args: MenuOptionItemCallbackArgs) => void;
}
