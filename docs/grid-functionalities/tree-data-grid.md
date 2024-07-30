#### Index
- [Parent/Child Relation Dataset](#parentchild-relation-dataset)
- [Hierarchical (Tree) Dataset](#hierarchical-tree-dataset)
- [Tree Formatter (with Collapsing icons](#tree-formatter)
- [Tree Custom Title Formatter](#tree-custom-title-formatter)
- [Exporting Options (data export to Excel/Text File)](#exporting-options-data-export-to-exceltext-file)
- [Full List of `treeDataOptions`](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/treeDataOption.interface.ts)
- Filtering Options
  - [`excludeChildrenWhenFilteringTree`](#excludechildrenwhenfilteringtree-boolean-option)
  - [`autoApproveParentItemWhenTreeColumnIsValid`](#autoapproveparentitemwhentreecolumnisvalid-boolean-option)
- [Tree Data Service Methods](#tree-data-service-methods) - extra methods to work with Tree Data
  - `getItemCount(x)`, `getToggledItems()`, `getCurrentToggleState()`, `dynamicallyToggleItemState(x)`, `applyToggledItemStateChanges(x)`, ...
- [Tree Totals with Aggregators](#tree-totals-with-aggregators)

## Description
Tree Data allows you to display a hierarchical (tree) dataset into the grid, it is visually very similar to Grouping but also very different in its implementation. A hierarchical dataset is commonly used for a parent/child relation and a great example is a Bill of Material (BOM), which you can't do with Grouping because parent/child relationship could be infinite tree level while Grouping is a defined and known level of Grouping.

## Important Notes

#### data mutation

For Tree Data to work with SlickGrid we need to **mutate** the original dataset, it will add a couple of new properties to your data, these properties are: `__treeLevel`, `__parentId` and `children` (these key names could be changed via the `treeDataOptions`). Also note that these properties become available in every Formatter (built-in and custom) which can be quite useful (especially in the tree level) in some cases... You might be thinking, could we do it without mutating the data? Probably but that would require to do a deep copy of the original data and that can be expensive on the performance side (no one it stopping you from doing a deep copy on your side though). The last thing to note is that internally for Tree Data to work, the lib always has 2 dataset (1x flat dataset and 1x hierarchical dataset which is basically a tree structure) and the lib keeps them in sync internally. So why do we do all of this? Well simply put, SlickGrid itself does not support a Tree Data structure and that is the reason we always have to keep 2 dataset structures internally because SlickGrid only works a flat dataset and nothing else.


#### Filtering is required by Tree Data

Tree Data requires and uses Filters to work, you **cannot disable Filtering**. The way it works is that when you collapse a parent group, the grid is actually using Filters to filter out child rows and so expanding/collapsing groups which is why Filtering must be enabled. If you don't want to show Filters to the user, then use `showHeaderRow: false` grid option and/or toggle it from the Grid Menu. Also, if you don't want to see the Grid Menu toggle filter command, you should also hide it from the menu via `gridMenu: { hideToggleFilterCommand: true }`

### Demo
[Demo Parent/Child Relationship](https://ghiscoding.github.io/Angular-Slickgrid/#/tree-data-parent-child) / [Component](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/grid-tree-data-parent-child.component.ts)

[Hierarchial Dataset](https://ghiscoding.github.io/Angular-Slickgrid/#/tree-data-hierarchical) / [Component](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/grid-tree-data-hierarchical.component.ts)

## Parent/Child Relation Dataset
This is the most common Tree Data to use, we only use that one in our projects, and requires you to provide a key representing the relation between the parent and children (typically a `parentId`, which the default key when nothing is provided).

For example, we can see below is that we have a regular flat dataset with items that have a `parentId` property which defines the relation between the parent and child.

###### View
```html
  <angular-slickgrid gridId="grid1"
                     [columnDefinitions]="columnDefinitions"
                     [gridOptions]="gridOptions"
                     [dataset]="dataset"
                     (onAngularGridCreated)="angularGridReady($event.detail)">
  </angular-slickgrid>
```

###### dataset sample
```ts
this.dataset = [
  { id: 0, file: 'documents', parentId: null, },
  { id: 1, file: 'vacation.txt', parentId: 0, },
  { id: 2, file: 'bills.txt', parentId: 0, },
  { id: 55: file: 'music', parentId: null, },
  { id: 60, file: 'favorite-song.mp3', parentId: 55, },
  { id: 61, file: 'blues.mp3', parentId: 61, },
];
```

_For the full list of options, refer to the [treeDataOptions](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/treeDataOption.interface.ts) interface_

###### define your grid
```ts
defineGrid() {
  this.columnDefinitions = [
    {
      id: 'title', name: 'Title', field: 'title', width: 220, cssClass: 'cell-title',
      filterable: true, sortable: true,
      formatter: Formatters.tree, exportCustomFormatter: Formatters.treeExport
    },
    // ...
  ];

  this.gridOptions = {
    enableFiltering: true,  // <<-- REQUIRED, it won't work without filtering enabled
    multiColumnSort: false, // <<-- REQUIRED to be Disabled since multi-column sorting is not currently supported with Tree Data

    treeDataOptions: {
      columnId: 'title',           // the column where you will have the Tree with collapse/expand icons
      parentPropName: 'parentId',  // the parent/child key relation in your dataset
      levelPropName: 'treeLevel',  // optionally, you can define the tree level property name, it nothing is provided it will use "__treeLevel"
      indentMarginLeft: 15,        // optionally provide the indent spacer width in pixel, for example if you provide 10 and your tree level is 2 then it will have 20px of indentation
      exportIndentMarginLeft: 4,   // similar to `indentMarginLeft` but represent a space instead of pixels for the Export CSV/Excel

      // you can optionally sort by a different column and/or sort direction
      // this is the RECOMMENDED approach, unless you are 100% that your original array is already sorted (in most cases it's not)
      initialSort: {
        columnId: 'title',         // which column are we using to do the initial sort? it doesn't have to be the tree column, it could be any column
        direction: 'ASC'
      },
    },
  };
}
```

## Hierarchical (Tree) Dataset
This is when your dataset is already in hierarchical (tree) structure, for example your items array already has a tree where the parents have a children property array that contains other items.

For example, we can see below the children are in the `files` array and the entire dataset is already in a hierarchical (tree) structure.

_For the full list of options, refer to the [treeDataOptions](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/treeDataOption.interface.ts) interface_

###### View
```html
<angular-slickgrid gridId="grid1"
                    [columnDefinitions]="columnDefinitions"
                    [gridOptions]="gridOptions"
                    [datasetHierarchical]="datasetHierarchical"
                    (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>
```

###### dataset sample
```ts
this.datasetHierarchical = [
  { id: 0, file: 'documents', files: [
      { id: 1, file: 'vacation.txt', size: 12 },
      { id: 2, file: 'bills.txt', size: 0.5 }
    ]
  },
  { id: 55: file: 'music', files: [
      { id: 60, file: 'favorite-song.mp3': size: 2.3 },
      { id: 61, file: 'blues.mp3', size: 5.5 }
    ]
  },
];
```

###### define your grid
```ts
initializeGrid() {
  this.columnDefinitions = [
    {
      id: 'file', name: 'Files', field: 'file',
      type: FieldType.string, width: 150, formatter: this.treeFormatter,
      filterable: true, sortable: true,
    },
    // ...
  ];

  this.gridOptions = {
    enableFiltering: true,  // <<-- REQUIRED, it won't work without filtering enabled
    multiColumnSort: false, // <<-- REQUIRED to be Disabled since multi-column sorting is not currently supported with Tree Data

    treeDataOptions: {
      columnId: 'file',           // the column where you will have the Tree with collapse/expand icons
      parentPropName: 'files',  // the parent/child key relation in your dataset
      levelPropName: 'treeLevel',  // optionally, you can define the tree level property name, it nothing is provided it will use "__treeLevel"

      // you can optionally sort by a different column and/or sort direction
      // this is the RECOMMENDED approach, unless you are 100% that your original array is already sorted (in most cases it's not)
      initialSort: {
        columnId: 'size',         // which column are we using to do the initial sort? it doesn't have to be the tree column, it could be any column
        direction: 'DESC'
      },
    },
  };
}
```

### Tree Custom Title Formatter
The column with the Tree already has a Formatter, so how can we add our own Formatter without impacting the Tree collapse/expand icons? You can use the `titleFormatter` in your `treeDataOptions`, it will style the text title but won't impact the collapsing icons.

###### grid options configurations
```ts
this.gridOptions = {
  enableFiltering: true,  // <<-- REQUIRED, it won't work without filtering enabled
  multiColumnSort: false, // <<-- REQUIRED to be Disabled since multi-column sorting is not currently supported with Tree Data

  treeDataOptions: {
    columnId: 'title',           // the column where you will have the Tree with collapse/expand icons
    // ...

    // we can also add a Custom Formatter just for the title text portion
    titleFormatter: (_row, _cell, value, _def, dataContext) => {
      let prefix = '';
      if (dataContext.treeLevel > 0) {
        prefix = `<span class="mdi mdi-subdirectory-arrow-right"></span>`;
      }
      return `${prefix}<span class="bold">${value}</span><span style="font-size:11px; margin-left: 15px;">(parentId: ${dataContext.parentId})</span>`;
    },
  },
};
```

### Tree Formatter

> **Note** is it mandatory to add a Formatter on the column holding the tree, the Formatter is what creates the expand/collapse icon the parents. This the biggest error that many users forget to do.

You would typically use the built-in `Formatters.tree` to show the tree but in some cases you might want to use your own Formatter and that is fine, it's like any other Custom Formatter. Here's a demo of the [Example 29](https://ghiscoding.github.io/Angular-Slickgrid/#/tree-data-hierarchical) Custom Formatter which is specific for showing the collapsing icon and folder and files icons.

```ts
treeFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
    const gridOptions = grid.getOptions() as GridOption;
    const treeLevelPropName = gridOptions?.treeDataOptions?.levelPropName || '__treeLevel';
    if (value === null || value === undefined || dataContext === undefined) {
      return '';
    }
    const dataView = grid.getData() as SlickDataView;
    const data = dataView.getItems();
    const identifierPropName = dataView.getIdPropertyName() || 'id';
    const idx = dataView.getIdxById(dataContext[identifierPropName]);
    const prefix = this.getFileIcon(value);

    value = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const spacer = `<span style="display:inline-block; width:${(15 * dataContext[treeLevelPropName])}px;"></span>`;

    if (data[idx + 1] && data[idx + 1][treeLevelPropName] > data[idx][treeLevelPropName]) {
      const folderPrefix = `<i class="mdi icon ${dataContext.__collapsed ? 'mdi-folder' : 'mdi-folder-open'}"></i>`;
      if (dataContext.__collapsed) {
        return `${spacer} <span class="slick-group-toggle collapsed" level="${dataContext[treeLevelPropName]}"></span>${folderPrefix} ${prefix}&nbsp;${value}`;
      } else {
        return `${spacer} <span class="slick-group-toggle expanded" level="${dataContext[treeLevelPropName]}"></span>${folderPrefix} ${prefix}&nbsp;${value}`;
      }
    } else {
      return `${spacer} <span class="slick-group-toggle" level="${dataContext[treeLevelPropName]}"></span>${prefix}&nbsp;${value}`;
    }
}
```

### Exporting Options (data export to Excel/Text File)
Exporting the data and keeping the tree level indentation requires a few little tricks and a few options were added to configure them. First off we need a leading character on the left because Excel will trim any spaces and so if our indentation is only spaces then everything gets trimmed and so for that we reason we have the character `·` at the start of every text and then the indentation spaces and that won't be trimmed. Here's a few of the options available.

_For the full list of options, refer to the [treeDataOptions](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/treeDataOption.interface.ts) interface_

```ts
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
```

### Filtering Options
#### `excludeChildrenWhenFilteringTree` boolean option
##### (see animated gif below for a demo)
When using Tree Data, in most cases we will want to see the content (children) of a parent item when filtering but in some cases we might actually want to exclude them and that is what this flag is for.

The full explanation of how filter works is the following
by default (unless this feature is disabled) all child nodes of the tree will be included when a parent passes a filter and a group will be included if
1- it has any children that passes the filter or
2- current parent item passes the filter or
3- current parent item filter is the Tree column and it passes that filter criteria regardless of other criteria (this is optional via the flag `autoApproveParentItemWhenTreeColumnIsValid: true`)
   *    - even when the other columns don't pass the filter criteria, as use case described below
   *    - for example if we take the Example with File Explorer (live demo) and we filter (Files = "music" and Size > 7),
   *    - then the File "Music" will always show even if it doesn't have a Size because its tree column passes the filter (which was Files = "music")
   *    - and the reason we do this is that we'll be able to show music files with "Size > 7" even though these files might not include the word "music"

#### `autoApproveParentItemWhenTreeColumnIsValid` boolean option
##### (see animated gif below for a demo)
as described in previous paragraph on the number 3), we can auto-approve item if it's the column holding the Tree structure and is a Parent that passes the first filter criteria, in other words if we are on the column holding the Tree and its filter is valid (and is also a parent), then skip any other filter(s) that exist on the same line.

For demo purpose, let's take [Example 29](https://ghiscoding.github.io/Angular-Slickgrid/#/tree-data-hierarchical) live demo, if we filter with the word `music` on the "Files" column and also a Size that is `> 15` nothing will show up unless we have this flag enabled. The reason is because none of the files have both criteria passing at the same time, however the "Files" column (which is the Tree column) does pass the filter criteria of `music` and so this flag will work and show the folder "music" because we skipped all other criteria, in our case `> 15` on that line, note however that on the following lines (all children), it will require all filters to be valid (and so we are able to see any files under the "music" folder that have a size greater than 15Mb).

![ub4bGMF8XR](https://user-images.githubusercontent.com/643976/135165158-c5111104-4578-4fa8-8a1c-53755aded53a.gif)

### Tree Data Service Methods
There are a few methods available from the `TreeDataService` (only listing the important ones below)
- `getItemCount(x)`: returns item count of a group
- `getToggledItems()`: returns all toggled items
- `getCurrentToggleState()`: get the current toggle state that includes the toggled type and toggled items
- `dynamicallyToggleItemState(x)`: dynamically toggle and change state of certain parent items by providing an array of parentIds
- `applyToggledItemStateChanges(x)`: apply different tree toggle state changes (to ALL rows, the entire dataset) by providing an array of parentIds

For example
```ts
export class Example1 {
  angularGrid?: AngularGridInstance;

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  getTreeDataState() {
    // for example get current Tree Data toggled state
    console.log(this.angularGrid.getCurrentToggleState());
  }
}
```

### Tree Totals with Aggregators

You can calculate Tree Totals by adding Aggregators to your `treeDataOptions` configuration in your grid options. The Aggregators are the same ones that can be used for both Tree Data and/or Grouping usage (they were modified internally to work for both use case). This feature also comes with other options that you can choose to enable or not, below is a list of these extra options that can be configured
- `aggregators`: list of Aggregators (one or more Aggregators), must be an array
- `autoRecalcTotalsOnFilterChange`: do we want to auto-recalculate the tree totals anytime a filter changes
   - option defaults to `false` for perf reason, so by default the totals will not be recalculated while filtering unless this option is enabled (opt-in option)
   - unless you add/remove an item, in which occasion it will recalculate every time
- `autoRecalcTotalsDebounce`: when previous option is enabled, we can also add a debounce value to avoid calling too many recalculations for each filter chars typed (this can be useful to improve perf on large tree dataset)

> **Note** if you were thinking to add both `AvgAggregator` and `SumAggregator`, well the latter can be omitted since the `AvgAggregator` will automatically give you access to the exact same tree totals properties which are `sum`, `count` and `avg` since it needs them all to calculate its average. So if you want to improve perf, you can skip the `SumAggregator` and keep only `AvgAggregator` to still gain access to all 3 totals props simply by calling the Average Aggregator (and that was intentional and not a coincidence). Incidentally, the same is true for `CountAggregator` as well.

The available Aggregators that were modified to support Tree Totals aggregations are:
- `AvgAggregator`: average of a tree
- `CountAggregator`: count all items of a tree
- `SumAggregator`: sum of a tree
- `MinAggregator`: minimum value found in the tree
- `MaxAggregator`: maximum value found in the tree

For example, let say that we want to have Sum and Average in our tree, we can use the code below
```ts
this.gridOptions = {
  treeDataOptions: {
    columnId: 'file',
    // ...

    // aggregators: [new Aggregators.Avg('size'), new Aggregators.Sum('size')],

    // OR EVEN BETTER, for better perf, you can simply use Avg to get both totals
    aggregators: [new Aggregators.Avg('size')], // produce the same as [new Aggregators.Avg('size'), new Aggregators.Sum('size')]

    // do we want to auto-recalc Tree Totals when using filters, that is anytime a filter changes
    autoRecalcTotalsOnFilterChange: true, // defaults to FALSE

    // add optional debounce time to limit number of execution that recalc is called, mostly useful on large dataset
    // autoRecalcTotalsDebounce: 250,
  },
};
```

### Tree Totals Formatter
There is also a new and optional Formatter, `Formatters.treeParseTotals`, that was created to allow the use of the same existing `GroupTotalsFormatter`, you also have the option to use your own custom Formatter, the choice is yours and Example 6 demos both. You can provide the new `treeTotalsFormatter` (or use `groupTotalsFormatter` since it's an alias) option to your column definition by providing a `GroupTotalFormatters`

#### with `Formatters.treeParseTotals`
```ts
this.columnDefinitions = [
  {
    id: 'size', name: 'Size', field: 'size', minWidth: 90,

    // Formatter option #1 (treeParseTotalFormatters)
    // if you wish to use any of the GroupTotalFormatters (or even regular Formatters), we can do so with the code below
    // use `treeTotalsFormatter` or `groupTotalsFormatter` to show totals in a Tree Data grid
    // provide any regular formatters inside the params.formatters
    formatter: Formatters.treeParseTotals,
    treeTotalsFormatter: GroupTotalFormatters.sumTotalsBold,
    // groupTotalsFormatter: GroupTotalFormatters.sumTotalsBold, // alias

    // you can add extra settings to your regular GroupTotalFormatters via the `params`
    params: {
      formatters: [
      groupFormatterSuffix: ' MB',
      minDecimal: 0,
      maxDecimal: 2,
    },
  },
];
```

#### with Custom Formatter
```ts
this.columnDefinitions = [
  {
    id: 'size', name: 'Size', field: 'size', minWidth: 90,

    // OR option #2 (custom Formatter)
    formatter: (_row, _cell, value, column, dataContext) => {
      // parent items will a "__treeTotals" property (when creating the Tree and running Aggregation, it mutates all items, all extra props starts with "__" prefix)
      const fieldId = column.field;

      // Tree Totals, if exists, will be found under `__treeTotals` prop
      if (dataContext?.__treeTotals !== undefined) {
        const treeLevel = dataContext[this.gridOptions?.treeDataOptions?.levelPropName || '__treeLevel'];
        const sumVal = dataContext?.__treeTotals?.['sum'][fieldId];
        const avgVal = dataContext?.__treeTotals?.['avg'][fieldId];

        if (avgVal !== undefined && sumVal !== undefined) {
          // when found Avg & Sum, we'll display both
          return isNaN(sumVal) ? '' : `<span class="color-primary bold">sum: ${decimalFormatted(sumVal, 0, 2)} MB</span> / <span class="avg-total">avg: ${decimalFormatted(avgVal, 0, 2)} MB</span> <span class="total-suffix">(${treeLevel === 0 ? 'total' : 'sub-total'})</span>`;
        } else if (sumVal !== undefined) {
          // or when only Sum is aggregated, then just show Sum
          return isNaN(sumVal) ? '' : `<span class="color-primary bold">sum: ${decimalFormatted(sumVal, 0, 2)} MB</span> <span class="total-suffix">(${treeLevel === 0 ? 'total' : 'sub-total'})</span>`;
        }
      }
      // reaching this line means it's a regular dataContext without totals, so regular formatter output will be used
      return !isNumber(value) ? '' : `${value} MB`;
    },
  },
];
```