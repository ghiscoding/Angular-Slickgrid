#### index
- [Demo](#demo)
- [Description](#description)
- [Setup](#setup)
- [Draggable Dropzone Location](#draggable-dropzone-location)
- [Aggregators](#aggregators)
- [SortComparers](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/sortComparers/sortComparers.index.ts)
- [GroupTotalsFormatter](#group-totals-formatter)
- [Custom GroupTotalsFormatter](#custom-grouptotalsformatter)
- [Set a Grouping](#set-a-grouping)
- [Clear Grouping / Collapse All / Expand All](#clear-grouping--collapse-all--expand-all)
- [Styling - Change Icons](#styling-change-icons)

## Demo
##### Regular Grouping
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/grouping) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-grouping.component.ts)

##### Draggable Grouping
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/draggrouping) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-draggrouping.component.ts)

### Description
Fully dynamic and interactive multi-level grouping with filtering and aggregates that is achieved with the help of the `DataView` object in `SlickGrid`. Each grouping level can have its own aggregates (over child rows, child groups, or all descendant rows). An aggregate can be seen as sub-totals, totals, average, ... or any defined group(s).

How does it work in `SlickGrid`?
The important thing to understand while working with `SlickGrid` is that Grouping requires you to provide 2 things, if you omit 1 of them, it will simply not work. These 2 things are
1. You will need to define which type of aggregate (accumulator) you want to use
   - Angular-Slickgrid provides the following built-in `Aggregators`: `Avg`, `Min`, `Max`, `Sum`
2. You need to add a `groupTotalsFormatter` on the column definition you want it to be calculated
   - this is very similar to a Formatter, except that they are designed to show aggregate results, e.g:: `Total: 142.50$`

These 2 steps go hands in hands, a `groupTotalsFormatter` would have nothing to show if it does not have an `Aggregator`.

### Setup
One of the very first thing that you need to do is to provide the `SlickGrid DataView` object to your `ViewModel`. The `DataView` is where we will define all of our Grouping. You can get the `dataView` object through an Event Emitter `onDataviewCreated` like so:

##### View
```html
<angular-slickgrid
    gridId="grid2"
    [columnDefinitions]="columnDefinitions"
    [gridOptions]="gridOptions"
    [dataset]="dataset"
    (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>
```
##### Component

```typescript

@Component({
  templateUrl: './grid-grouping.component.html'
})
export class GridGroupingComponent implements OnInit, OnDestroy {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataviewObj: any;

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.dataViewObj = angularGrid.dataView;
  }
}
```

### Draggable Dropzone Location

The Draggable Grouping can be located in either the Top-Header or the Pre-Header as described below.

#### Pre-Heaader
Draggable Grouping can be located in either the Pre-Header of the Top-Header, however when it is located in the Pre-Header then the Header Grouping will not be available (because both of them would conflict with each other). Note that prior to the version 8.1 of Angular-Slickgrid, the Pre-Header was the default and only available option.

```ts
this.gridOptions = {
  createPreHeaderPanel: true,
  showPreHeaderPanel: true,
  preHeaderPanelHeight: 26,
  draggableGrouping: {
    // ... any draggable plugin option
  },
}
```

#### Top-Heaader
##### requires v8.1 and higher
This is the preferred section since the Top-Header is on top of all headers (including pre-header) and it will always be the full grid width. Using the Top-Header also frees up the Pre-Header section for the potential use of Header Grouping.

When using Draggable Grouping and Header Grouping together, you need to enable both top-header and pre-header.
```ts
this.gridOptions = {
    // we'll use top-header for the Draggable Grouping
  createTopHeaderPanel: true,
  showTopHeaderPanel: true,
  topHeaderPanelHeight: 35,

  // pre-header will include our Header Grouping (i.e. "Common Factor")
  createPreHeaderPanel: true,
  showPreHeaderPanel: true,
  preHeaderPanelHeight: 26,
}
```

### Aggregators
The `Aggregators` is basically the accumulator, the logic that will do the sum (or any other aggregate we defined). We simply need to instantiate the `Aggregator` by passing the column definition `field` that will be used to accumulate. For example, if we have a column definition of Cost and we want to calculate it's sum, we can call the `Aggregator` as follow
```ts
new Aggregators.Sum('cost')
```
The available built-in `Aggregators` are
- `Aggregators.Avg` (calculate the Average of a group)
- `Aggregators.Min` (returns the Minimum value of a group)
- `Aggregators.Max` (returns the Maximum value of a group)
- `Aggregators.Sum` (calculate the Sum of a group)
- `Aggregators.Clone` (will clone the same grouped text and display it in as an aggregated value)
- `Aggregators.Distinct` (will show distinct value)

### Group Totals Formatter
When defining your column definitions, you will need to decide which of the column will have an aggregate. Once that decision is made, you will add a `groupTotalsFormatter` to that column definition in question (a Formatter for the group total). For example, let say that we have a cost and we want a total sum grouped by a duration, the code would look like below.

##### Available Group Total Formatters
You can see the full list under [`groupingFormatters.index.ts`](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/grouping-formatters/groupingFormatters.index.ts)
Note: the Group Total Formatters named as currency will have these extra `params` (`groupFormatterPrefix`, `groupFormatterSuffix`, `groupFormatterCurrencyPrefix`, `groupFormatterCurrencySuffix`) and also the other common Formatter `params` (`minDecimal`, `maxDecimal`, `decimalSeparator`, `thousandSeparator`, `displayNegativeNumberWithParentheses`).

- `avgTotalsPercentageFormatter`
- `avgTotalsDollarFormatter`
- `avgTotalsCurrencyFormatter`
- `avgTotalsFormatter`
- `minTotalsFormatter`
- `maxTotalsFormatter`
- `sumTotalsColoredFormatter`
- `sumTotalsCurrencyFormatter`
- `sumTotalsCurrencyColoredFormatter`
- `sumTotalsDollarColoredBoldFormatter`
- `sumTotalsDollarColoredFormatter`
- `sumTotalsDollarBoldFormatter`
- `sumTotalsDollarFormatter`
- `sumTotalsFormatter`
- `sumTotalsBoldFormatter`

##### ViewModel
```typescript
export class GridGroupingComponent implements OnInit, OnDestroy {
  this.columnDefinitions = [
      {
        id: 'title', name: 'Title', field: 'title'
      },
      {
        id: 'duration', name: 'Duration', field: 'duration',
        type: FieldType.number,
        groupTotalsFormatter: GroupTotalFormatters.sumTotals,
        params: { groupFormatterPrefix: 'Total: ' }
      },
      {
        id: 'cost', name: 'Cost', field: 'cost',
        exportWithFormatter: true,    // for a Dollar Formatter, we also want it to be displayed in the export to file
        formatter: Formatters.dollar,
        groupTotalsFormatter: GroupTotalFormatters.sumTotalsDollar,
        params: { groupFormatterPrefix: '<b>Total</b>: ' /*, groupFormatterSuffix: ' USD'*/ }
      }
  ];

    this.gridOptions = {
      enableGrouping: true,        // don't forget to enable the grouping
      exportOptions: {
        sanitizeDataExport: true   // you can also sanitize the exported data (it will remove any HTML tags)
      }
    };
}
```

#### Prefix/Suffix to a `groupTotalsFormatter`
We can also pass prefix and/or suffix to each `groupTotalsFormatter` by adding them to the `params` object. Also note that you can also type HTML to be interpreted. For example, let say we would like `Total:` to show as bold and a suffix of 'USD' , you can write it this way:

**Note** prefix/suffix are concatenated without spaces, if you require a space then make sure to add it in accordingly.

##### ViewModel
```ts
{
  id: 'cost', name: 'Cost', field: 'cost',
  groupTotalsFormatter: GroupTotalFormatters.sumTotalsDollar,
  params: { groupFormatterPrefix: '<b>Total</b>: ', groupFormatterSuffix: ' USD' }
}
```

### Custom `groupTotalsFormatter`
You can also create a custom `groupTotalsFormatter` similarly to a Formatter, just a create a function that will return a string, for example:

##### ViewModel
```typescript
defineGrid() {
  this.columnDefinitions = [
      {
        id: 'cost', name: 'Cost', field: 'cost',
        groupTotalsFormatter: this.sumTotalsFormatter
      }
  ];
}

sumTotalsFormatter(totals, columnDef) {
  const val = totals.sum && totals.sum[columnDef.field];
  if (val != null) {
    return 'total: ' + ((Math.round(parseFloat(val) * 100) / 100));
  }
  return '';
}
```

### Set a Grouping
Once you have added a `groupTotalsFormatter` and defined which aggregate you want to use, you will want to create a grouping function. If we take again our example of a grid with multiple task and we want to group our task by duration and calculate the duration average and the cost total sum, we can write the following function

##### ViewModel
```ts
groupByDuration() {
    this.dataviewObj.setGrouping({
      getter: 'duration',  // the column `field` to group by
      formatter: (g) => {
        // (required) what will be displayed on top of each group
        return `Duration:  ${g.value} <span style="color:green">(${g.count} items)</span>`;
      },
      comparer: (a, b) => {
        // (optional) comparer is helpful to sort the grouped data
        // code below will sort the grouped value in ascending order
        return SortComparers.numeric(a.value, b.value, SortDirectionNumber.asc);
      },
      aggregators: [
        // (optional), what aggregators (accumulator) to use and on which field to do so
        new Aggregators.Avg('percentComplete'),
        new Aggregators.Sum('cost')
      ],
      aggregateCollapsed: false,  // (optional), do we want our aggregator to be collapsed?
      lazyTotalsCalculation: true // (optional), do we want to lazily calculate the totals? True is commonly used
    });
  }
```

### Clear Grouping / Collapse All / Expand All
To "Clear all Grouping", "Collapse all Groups" and "Expand all Groups", we can simply call the associated `DataView` function, like so:

##### ViewModel
```ts
  clearGrouping() {
    this.dataviewObj.setGrouping([]);
  }

  collapseAllGroups() {
    this.dataviewObj.collapseAllGroups();
  }

  expandAllGroups() {
    this.dataviewObj.expandAllGroups();
  }
```

### Styling (change icons)
The current icons are chevron (right/down), however if you wish to use +/- icons. You can simply update the SASS variables to use whichever SVG icon paths. The SASS variables you can change are
```css
$slick-icon-group-color:                    $primary-color;
$slick-icon-group-expanded-svg-path:        "M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z";
$slick-icon-group-collapsed-svg-path:       "M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M17,11V13H7V11H17Z";
$slick-icon-group-font-size:                20px;
$slick-icon-group-font-weight:              bold;
$slick-icon-group-margin-right:             2px;

/* Grouping Totals Formatter */
$slick-group-totals-formatter-color:        gray;
$slick-group-totals-formatter-bgcolor:      white;
$slick-group-totals-formatter-font-size:    14px;
```

For more info on SASS styling and variables, please read the [Wiki - SASS Styling](../styling/styling.md),