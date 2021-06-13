// import { Aggregator } from './aggregator.interface';
import { Formatter, SortDirection, SortDirectionString } from './index';

export interface TreeDataOption {
  /** Column Id of which column in the column definitions has the Tree Data, there can only be one with a Tree Data. */
  columnId: string;

  /** Grouping Aggregators array */
  // NOT YET IMPLEMENTED
  // aggregators?: Aggregator[];

  /** Optionally define the initial sort column and direction */
  initialSort?: {
    /** Column Id of the initial Sort */
    columnId: string;

    /** Direction of the initial Sort (ASC/DESC) */
    direction: SortDirection | SortDirectionString;
  };

  /** Defaults to False, will the Tree be collapsed on first load? */
  initiallyCollapsed?: boolean;

  /** Defaults to "children", object property name used to designate the Children array */
  childrenPropName?: string;

  /** Defaults to "__collapsed", object property name used to designate the Collapsed flag */
  collapsedPropName?: string;

  /** Defaults to "__hasChildren", object property name used to designate if the item has children or not (boolean) */
  hasChildrenPropName?: string;

  /**
   * Defaults to "id", object property name used to designate the Id field (you would rarely override this property, it is mostly used for internal usage).
   * NOTE: by default it will read the `datasetIdPropertyName` from the grid option, so it's typically better NOT to override this property.
   */
  identifierPropName?: string;

  /** Defaults to "__parentId", object property name used to designate the Parent Id */
  parentPropName?: string;

  /** Defaults to "__treeLevel", object property name used to designate the Tree Level depth number */
  levelPropName?: string;

  /**
   * Defaults to 15px, margin to add from the left (calculated by the tree level multiplied by this number).
   * For example if tree depth level is 2, the calculation will be (2 * 15 = 30), so the column will be displayed 30px from the left
   */
  indentMarginLeft?: number;

  /**
   * Defaults to 5, indentation spaces to add from the left (calculated by the tree level multiplied by this number).
   * For example if tree depth level is 2, the calculation will be (2 * 15 = 30), so the column will be displayed 30px from the left
   */
  exportIndentMarginLeft?: number;

  /**
   * Defaults to centered dot (·), we added this because Excel seems to trim spaces leading character
   * and if we add a regular character like a dot then it keeps all tree level indentation spaces
   */
  exportIndentationLeadingChar?: string;

  /**
   * Defaults to 3, when using a collapsing icon then we need to add some extra spaces to compensate on parent level.
   * If you don't want collapsing icon in your export then you probably want to put this option at 0.
   */
  exportIndentationLeadingSpaceCount?: number;

  /** Optional Title Formatter (allows you to format/style the title text differently) */
  titleFormatter?: Formatter;
}
