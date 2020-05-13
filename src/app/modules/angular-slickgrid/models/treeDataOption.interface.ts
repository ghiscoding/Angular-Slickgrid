import { Aggregator } from './aggregator.interface';
import { SortDirection, SortDirectionString } from './index';

export interface TreeDataOption {
  /** Column Id of which column in the column definitions has the Tree Data, there can only be one with a Tree Data. */
  columnId: string;

  /** Grouping Aggregators array */
  aggregators?: Aggregator[];

  /** Optionally define the initial sort column and direction */
  initialSort?: {
    /** Column Id of the initial Sort */
    columnId: string;

    /** Direction of the initial Sort (ASC/DESC) */
    direction: SortDirection | SortDirectionString;
  }

  /** Defaults to "children", object property name used to designate the Children array */
  childrenPropName?: string;

  /** Defaults to "__collapsed", object property name used to designate the Collapsed flag */
  collapsedPropName?: string;

  /** Defaults to "id", object property name used to designate the Id field */
  identifierPropName?: string;

  /** Defaults to "__parentId", object property name used to designate the Parent Id */
  parentPropName?: string;

  /** Defaults to "__treeLevel", object property name used to designate the Tree Level depth number */
  levelPropName?: string;

  /** Defaults to "__hasChildren", object property name used to designate if the item has Children flag */
  hasChildrenFlagPropName?: string;

  /**
   * Defaults to 15px, margin to add from the left (calculated by the tree level multiplied by this number).
   * For example if tree depth level is 2, the calculation will be (2 * 15 = 30), so the column will be displayed 30px from the left
   */
  indentMarginLeft?: number;
}
