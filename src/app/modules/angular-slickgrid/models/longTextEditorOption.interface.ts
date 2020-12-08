export interface LongTextEditorOption {
  /**
   * Defaults to 40, that is the visible width of the textarea control, in average character widths.
   * Note: this only applies to Inline Editing, when using the Composite Editor it will auto-adjust by available width.
   */
  cols?: number;

  /**
   * Defaults to 6, that is the number of visible text lines for the textarea control.
   * Note: this only applies to Inline Editing and will not have any effect when using the Composite Editor modal window which will be fixed to 3 rows.
   */
  rows?: number;

  /**
   * Defaults to "auto", allows to position the LongText Editor to the best logical position in the window, also when we say position, we are talking about the relative position against the grid cell.
   * We can assume that in 80% of the time the default position is bottom right, the default is "auto" but we can also override this and use a specific position.
   * Most of the time positioning of the editor will be to the "right" of the cell is ok but if our column is completely on the right side then we'll want to change the position to "left" align.
   * Same goes for the top/bottom position, Most of the time positioning the editor to the "bottom" but we are clicking on a cell at the bottom of the grid then we might need to reposition to "top" instead.
   * NOTE: this only applies to Inline Editing and will not have any effect when using the Composite Editor modal window.
   */
  position?: 'auto' | 'top' | 'bottom' | 'left' | 'right';

  /**
   * Defaults to 15, when using the position "left" (or "auto" which could end up using a "left" position),
   * we might need to tweak the right margin and add an extra margin (in pixel) depending on some CSS styling.
   */
  marginRight?: number;

  /** Configurable Button Texts */
  buttonTexts?: {
    /** Cancel button text, defaults to "Cancel" */
    cancel?: string;

    /** Cancel button translation key, defaults to "CANCEL" */
    cancelKey?: string;

    /** Save button text, defaults to "Save" */
    save?: string;

    /** Save button translation key, defaults to "SAVE" */
    saveKey?: string;
  };
}
