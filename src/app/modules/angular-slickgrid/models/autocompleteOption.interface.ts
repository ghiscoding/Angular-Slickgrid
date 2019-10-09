export type JQueryAjaxFn = (request: any, response: any) => any[];

export interface AutocompleteOption {
  /** Delay to wait before showing the autocomplete list */
  delay?: number;

  /** defaults to false, force the user to start typing a value in the search input */
  forceUserInput?: true;

  /**
   * Minimum length to type in the input search value before the autocomplete starts showing and querying,
   * to avoid queries that would return too many results
   */
  minLength?: number;

  /** Source for the autocomplete list */
  source: string | any[] | JQueryAjaxFn;

  // --
  // Events / Methods
  // -----------------

  /** Triggered when the input value becomes in focus */
  focus?: (e: Event, ui: any) => boolean;

  /** Triggered when user enters a search value */
  search?: (e: Event, ui: any) => boolean;

  /** Triggered when a value is selected from the autocomplete list */
  select?: (e: Event, ui: any) => boolean;
}
