export interface DataViewOption {
  /** Defaults to false, use with great care as this will break built-in filters */
  inlineFilters?: boolean;

  /** Optionally provide a Group Item Metatadata Provider when using Grouping/DraggableGrouping feature */
  groupItemMetadataProvider?: any;
}
