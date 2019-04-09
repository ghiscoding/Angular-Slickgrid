export interface CheckboxSelector {
  /** Defaults to "_checkbox_selector", you can provide a different column id used as the column header id */
  columnId?: string;

  /** Provide a CSS class used by each row selection check boxes */
  cssClass?: string;

  /** default to false, do we want to hide the "Select All" checkbox? */
  hideSelectAllCheckbox?: boolean;

  /** defaults to false, do we want to hide the "Select All" checkbox from the Column Header Title Row? */
  hideInColumnTitleRow?: boolean;

  /** defaults to true, do we want to hide the "Select All" checkbox from the Column Header Filter Row? */
  hideInFilterHeaderRow?: boolean;

  /** Defaults to "Select/Deselect All", provide a tooltip that will be shown over the "Select All" checkbox */
  toolTip?: string;

  /** Defaults to 30, width of the Row Selection checkbox column */
  width?: number;

  /** Override the logic for showing (or not) the expand icon (use case example: only every 2nd row is expandable) */
  selectableOverride?: (row: number, dataContext: any, grid: any) => boolean;
}
