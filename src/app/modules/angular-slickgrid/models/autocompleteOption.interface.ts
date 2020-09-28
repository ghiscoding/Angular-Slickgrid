export type JQueryAjaxFn = (request: any, response: any) => void;

export interface AutoCompleteRenderItemDefinition {
  /** which custom Layout to use? We created 2 custom styled layouts "twoRows" and "fourCorners", both layouts also support an optional icon on the left. */
  layout: 'twoRows' | 'fourCorners';

  /** templateCallback must be a callback function returning the renderItem template string that is used to dislay each row of the AutoComplete result */
  templateCallback: (item: any) => string;
}

export interface AutocompleteOption {
  /**
   * The classes option is used to map structural class names to theme-related class names that you define
   * For example: classes: { "ui-autocomplete": "custom-red" }
   * This means that wherever jQuery UI applies the ui-autocomplete class it should also apply "custom-red" class
   */
  classes?: { [className: string]: string };

  /** Delay to wait before showing the autocomplete list */
  delay?: number;

  /**
   * Minimum length to type in the input search value before the autocomplete starts showing and querying,
   * to avoid queries that would return too many results
   */
  minLength?: number;

  /** Source for the autocomplete list */
  source: string | any[] | JQueryAjaxFn;

  // --
  // Extra Option (outside of jQuery UI)
  // -----------------------------------

  /** defaults to false, force the user to start typing a value in the search input */
  forceUserInput?: boolean;

  /**
   * Defaults to false, will open the search list (should really only be used with a defined collection list).
   * Also note that if you wish to display even when the autoComplete is an empty string, you will need to adjust the "minLength" to 0.
   */
  openSearchListOnFocus?: boolean;

  /**
   * renderItem option is to simply provide a Template and decide which custom Layout to use
   *
   * Note that this "renderItem" is just a shortcut and can be done with the following code:
   * editor: { editorOptions: { classes: { 'ui-autocomplete': 'autocomplete-custom-2rows',  }, callbacks: { _renderItem: (ul: HTMLElement, item: any) => this.renderItemCallbackWith2Rows(ul, item) }}
   */
  renderItem?: AutoCompleteRenderItemDefinition;

  // --
  // Events / Methods
  // -----------------

  /** Triggered when the input value becomes in focus */
  focus?: (e: Event, ui: { item: any; }) => boolean;

  /** Triggered when user enters a search value */
  search?: (e: Event, ui: { item: any; }) => boolean;

  /** Triggered when a value is selected from the autocomplete list */
  select?: (e: Event, ui: { item: any; }) => boolean;
}
