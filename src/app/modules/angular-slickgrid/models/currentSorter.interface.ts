import { SortDirection, SortDirectionString } from './../models/index';

export interface CurrentSorter {
  /**
   * Column Id that is defined as a Column in the Columns Definition (using the "field" property).
   * It will also work with a field that is not defined in the Columns Definition, the only drawback is that it won't add the sort icon.
   * Also note that it will still check if there's a "queryField" and/or "queryFieldSorter" defined and use if exists
   */
  columnId: string | number;

  /** Direction of the sort ASC/DESC */
  direction: SortDirection | SortDirectionString;
}
