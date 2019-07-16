export interface Extension {
  /** Dispose of the extension */
  dispose: () => void;

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance: () => any;

  /**
   * Register the SlickGrid addon (control or plugin) and optionally expose all the available SlickEvent hooks that user can subscribe.
   * Note that not every SlickGrid addons have SlickEvent
   */
  register: () => any;
}
