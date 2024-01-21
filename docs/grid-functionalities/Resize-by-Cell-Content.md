##### index
- [Usage Demo](#usage)
- [Resize by Content - Grid Options](#resize-by-content---grid-options)
- [Resize by Content - Column Options](#resize-by-content---column-options)

### Demo
[Demo](https://ghiscoding.github.io/Angular-Slickgrid/#/resize-by-content) / [Demo Component](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/grid-resize-by-content.component.ts)

### Description
The default of Slickgrid-Universal is to fit all columns in the container viewport and for the most part that is a good resize to use and it's fast. However if your grid has a lot of columns then doing a fit to viewport is not exactly great, you have lot of columns a few of these columns will become too small (we strongly suggest adding `minWidth` to every column) and you'll start seeing ellipsis to a few of these columns.

The Auto-Resize by Cell Content will fix the problem described in previous paragraph, however it will come with a cost. It will read through all the cell content of all your items (because this could slow down the grid a lot, there's a default to not go over a 1000 rows but that could be overridden if you wish). For that reason the **resize by cell content** is an **opt-in** feature.

How does it work? It loop through the dataset and try to calculate the best possible width, it does so by assuming a few things. For example we assume the a character is by default 7 pixels wide (via `resizeCellCharWidthInPx`), we also assume that not every data will be the same width for example string type might be a little less wide (with chars like "i", "l", "j" are thinner) compare to numbers which are always the same width and so have some ratio option for that (via `resizeDefaultRatioForStringType` and `resizeCalcWidthRatio`).

There are a few configuration options you can use
- ratio (`resizeDefaultRatioForStringType` and `resizeCalcWidthRatio`)
- extra padding (`resizeExtraWidthPadding`)
- char width
- padding (`resizeCellPaddingWidthInPx`, `resizeFormatterPaddingWidthInPx`, `resizeExtraWidthPadding`)
- max width threshold (`resizeMaxWidthThreshold`)
... and more

### Usage

```ts
defineGrid() {
  this.columnDefinitions = [
    { id: 'action', field: 'action', name: 'Action', width: 50, maxWidth: 50 },
    { id: 'firstName', field: 'firstName', name: 'First Name', mindWidth: 100 },
    { id: 'lastName', field: 'lastName', name: 'First Name', mindWidth: 100, resizeExtraWidthPadding: 10 },
    // ...
  ];

  this.gridOptions = {
    // ...
    enableAutoResize: true,

    // resizing by cell content is opt-in
    // we first need to disable the 2 default flags to disable autoFit/autosize
    autoFitColumnsOnFirstLoad: false,
    enableAutoSizeColumns: false,

    // then enable resize by content with these 2 flags
    autosizeColumnsByCellContentOnFirstLoad: true,
    enableAutoResizeColumnsByCellContent: true,
  };
}
```

### Resize by Content - Grid Options
There a few grid options that you can change to override the default resize options. We listed the grid options below for the resize and they should all be there but just in case, you should also check the [GridOption](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/gridOption.interface.ts) and [ResizeByContentOption](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/resizeByContentOption.interface.ts) interface.

```ts
export interface GridOption {
  //...

  /**
   * defaults to true, do we want to resize the grid by content only on the first page or anytime the data changes?
   * Requires `enableAutoResizeColumnsByCellContent` to be set.
   * Also don't get confused with `autosizeColumnsByCellContentOnFirstLoad` that flag won't block resize by content after the first load while `resizeByContentOnlyOnFirstLoad`
   */
  resizeByContentOnlyOnFirstLoad?: boolean;

  /** Resize by Content multiple options */
  resizeByContentOptions?: ResizeByContentOption;
}
```
and

```ts
export interface ResizeByContentOption {
  /** defaults to false, if a column `width` is provided (or was previously calculated) should we recalculate it or not when resizing by cell content? */
  alwaysRecalculateColumnWidth?: boolean;

  /**
   * Defaults to 7, width in pixels of a string character which is used by the resize columns by its content, this can vary depending on which font family/size is used & cell padding.
   * This is only used when resizing the columns width by their content, we need to know the width of a character in pixel to do all calculations.
   * Requires `enableAutoResizeColumnsByCellContent` to be set.
   */
  cellCharWidthInPx?: number;

  /** Defaults to 6, cell padding width to add to the calculation when resizing columns by their cell text content (requires `enableAutoResizeColumnsByCellContent` to be set) */
  cellPaddingWidthInPx?: number;

  /** Defaults to around ~0.9, what is the ratio to use (on field `type` "string" only) in the calculation when resizing columns by their cell text content (requires `enableAutoResizeColumnsByCellContent` to be set). */
  defaultRatioForStringType?: number;

  /** Defaults to 6, padding width to add to the calculation when using a Formatter and resizing columns by their cell text content (requires `enableAutoResizeColumnsByCellContent` to be set). */
  formatterPaddingWidthInPx?: number;

  /**
   * Defaults to 1000, how many rows are we going to inspect cell content width?
   * This is use when calculating all column width by their cell content, it requires `enableAutoResizeColumnsByCellContent` to be set.
   */
  maxItemToInspectCellContentWidth?: number;

  /**
   * Defaults to 5000, how many rows (of a single column) are we going to inspect cell content width?
   * This is use when calculating column width by their cell content when calling "Resize by Content" (from header menu and/or double-click to resize single column)
   */
  maxItemToInspectSingleColumnWidthByContent?: number;

  /** Defaults to 50, what width to remove from new column width when the grid is a frozen (pinned) grid and its column width exceeds the viewport full width. */
  widthToRemoveFromExceededWidthReadjustment?: number;
}
```

### Resize by Content - Column Options
We listed the column definition options below for the resize and they should all be there but just in case, you should also check the [Column](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/column.interface.ts) interface.

```ts
export interface Column {
  /** defaults to false, if a column `width` is provided (or was previously calculated) should we recalculate it or not when resizing by cell content? */
  resizeAlwaysRecalculateWidth?: boolean;

  /**
   * Defaults to 1, a column width ratio to use in the calculation when resizing columns by their cell content.
   * We have this ratio number so that if we know that the cell content has lots of thin character (like 1, i, t, ...) we can lower the ratio to take up less space.
   * In other words and depending on which font family you use, each character will have different width, characters like (i, t, 1) takes a lot less space compare to (W, H, Q),
   * unless of course we use a monospace font family which will have the exact same size for each characters and in that case we leave it to 1 but that rarely happens.
   * NOTE: the default ratio is 1, except for string where we use a ratio of around ~0.9 since we have more various thinner characters like (i, l, t, ...).
   */
  resizeCalcWidthRatio?: number;

  /**
   * no defaults, a character width to use when resizing columns by their cell content.
   * If nothing is provided it will use `resizeCellCharWidthInPx` defined in the grid options.
   */
  resizeCharWidthInPx?: number;

  /** no defaults, what is the column max width threshold to not go over when resizing columns by their cell content */
  resizeMaxWidthThreshold?: number;

  /** no defaults, what is optional extra width padding to add to the calculation when resizing columns by their cell content */
  resizeExtraWidthPadding?: number;
}
```