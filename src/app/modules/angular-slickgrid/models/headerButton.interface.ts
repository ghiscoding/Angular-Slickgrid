import { HeaderButtonOnCommandArgs } from './headerButtonOnCommandArgs.interface';

export interface HeaderButton {
  /** an extra CSS class to add to the menu button */
  buttonCssClass?: string;

  // --
  // Events
  // ------------

  /** Fired after extension (plugin) is registered by SlickGrid */
  onExtensionRegistered?: (plugin: any) => void;

  /** Fired when a command is clicked */
  onCommand?: (e: Event, args: HeaderButtonOnCommandArgs) => void;
}
