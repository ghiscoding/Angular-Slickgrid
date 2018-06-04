import { OperatorString, OperatorType, SearchTerm } from './../models/index';

export interface CurrentColumn {
  /** Column id (in the column definitions) */
  columnId: string;

  /** Column CSS Class  */
  cssClass?: string;

  /** Header CSS Class  */
  headerCssClass?: string;

  /** Column width */
  width?: number;
}
