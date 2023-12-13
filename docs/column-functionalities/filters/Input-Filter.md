##### updated to version `3.x`

#### Index
- [Usage](#ui-usage)
- [Filtering with Localization](#filtering-with-localization-i18n)
- [Filter Complex Object](#how-to-filter-complex-objects)
- [Update Filters Dynamically](#update-filters-dynamically)
- [Query Different Field (Filter/Sort)](#query-different-field)
- [Dynamic Query Field](#dynamic-query-field)
- [Debounce/Throttle Text Search (wait for user to stop typing before filtering)](#debouncethrottle-text-search-wait-for-user-to-stop-typing-before-filtering)
- [Ignore Locale Accent in Text Filter/Sorting](#ignore-locale-accent-in-text-filtersorting)

### Description
Input filter is the default filter when enabling filters.

### Demo
[Demo Page](https://ghiscoding.github.io/slickgrid-universal/#/example02) / [Demo Component](https://github.com/ghiscoding/slickgrid-universal/blob/master/examples/webpack-demo-vanilla-bundle/src/examples/example02.ts)

### UI Usage
All column types support the following operators: (`>`, `>=`, `<`, `<=`, `<>`, `!=`, `=`, `==`, `*`), range filters can also have 1 of these options (`rangeInclusive` or `rangeExclusive`, the inclusive is default)
Example:
- Number type
  - `>100` => bigger than 100
  - `<>100` => not include number 100
  - `15..44` => between 15 and 44 (you can also provide option `rangeInclusive` or `rangeExclusive`, inclusive is default)
- Date types
  - `>=2001-01-01` => bigger or equal than date `2001-01-01`
  - `<02/28/17` => smaller than date `02/28/17`
  - `2001-01-01..2002-02-22` => between 2001-01-01 and 2002-02-22
- String type
  - `<>John` (not include the sub-string `John`)
  - `John*` => starts with the sub-string `John`
  - `*Doe` => ends with the sub-string `Doe`
  - `ab..ef` => anything between "af" and "ef"
    - refer to ASCII table, it is however case insensitive

Note that you could do the same functionality with a Compound Filter.

#### Note
For filters to work properly (default is `string`), make sure to provide a `FieldType` (type is against the dataset, not the Formatter), for example on a Date Filters, we can set the `FieldType` of dateUtc/date (from dataset) can use an extra option of `filterSearchType` to let user filter more easily. For example, with a column having a "UTC Date" coming from the dataset but has a `formatter: Formatters.dateUs`, you can type a date in US format `>02/28/2017`, also when dealing with UTC you have to take the time difference in consideration.

### How to use Input Filter
Simply set the flag `filterable` to True and and enable the filters in the Grid Options. Here is an example with a full column definition:
```ts
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title' },
  { id: 'description', name: 'Description', field: 'description', filterable: true }
];

// you also need to enable the filters in the Grid Options
this.gridOptions = {
   enableFiltering: true
};
```

### Filtering with Localization (i18n)
When using a regular grid with a JSON dataset (that is without using Backend Service API), the filter might not working correctly on cell values that are translated (because it will try to filter against the translation key instead of the actual formatted value). So to bypass this problem, a new extra `params` was created to resolve this, you need to set `useFormatterOuputToFilter` to True and the filter will, has the name suggest, use the output of the Formatter to filter against. Example:
```ts
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'id',
    headerKey: 'TITLE',
    formatter: this.taskTranslateFormatter,  // <-- this could be a custom Formatter or the built-in translateFormatter
    filterable: true,
    params: { useFormatterOuputToFilter: true } // <-- set this flag to True
  },
  { id: 'description', name: 'Description', field: 'description', filterable: true }
];

// you also need to enable the filters in the Grid Options
this.gridOptions = {
   enableFiltering: true
};

// using a custom translate Formatter OR translateFormatter
taskTranslateFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  return this.i18n.tr('TASK_X', { x: value });
}
```

### How to Filter Complex Objects?
You can filter complex objects using the dot (.) notation inside the `field` property defined in your Columns Definition.

For example, let say that we have this dataset
```ts
const dataset = [
 { item: 'HP Desktop', buyer: { id: 1234, address: { street: '123 belleville', zip: 123456 }},
 { item: 'Lenovo Mouse', buyer: { id: 456, address: { street: '456 hollywood blvd', zip: 789123 }}
];
```

We can now filter the zip code from the buyer's address using this filter:
```ts
this.columnDefinitions = [
  {
    // the zip is a property of a complex object which is under the "buyer" property
    // it will use the "field" property to explode (from "." notation) and find the child value
    id: 'zip', name: 'ZIP', field: 'buyer.address.zip', filterable: true
   // id: 'street',  ...
];
```

### Update Filters Dynamically
You can update/change the Filters dynamically (on the fly) via the `updateFilters` method from the `FilterService`. Note that calling this method will override all filters and replace them with the new array of filters provided. For example, you could update the filters from a button click or a select dropdown list with predefined filter set.

##### View
```html
<button class="btn btn-default btn-sm" data-test="set-dynamic-filter" (click)="setFiltersDynamically()">
    Set Filters Dynamically
</button>

<angular-slickgrid gridId="grid1"
   [columnDefinitions]="columnDefinitions"
   [gridOptions]="gridOptions"
   [dataset]="dataset"
   (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>
```
##### Component
```ts
export class Example {
  angularGrid: AngularGridInstance;

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  setFiltersDynamically() {
    // we can Set Filters Dynamically (or different filters) afterward through the FilterService
    this.angularGrid.filterService.updateFilters([
      { columnId: 'duration', searchTerms: [2, 25, 48, 50] },
      { columnId: 'complete', searchTerms: [95], operator: '<' },
      { columnId: 'effort-driven', searchTerms: [true] },
      { columnId: 'start', operator: '>=', searchTerms: ['2001-02-28'] },
    ]);
  }
```

#### Extra Arguments
The `updateFilters` method has 2 extra arguments:
- 2nd argument, defaults to true, is to emit a filter changed event (the GridStateService uses this event)
  - optional and defaults to true `updateFilters([], true)`
- 3rd argument is to trigger a backend query (when using a Backend Service like OData/GraphQL), this could be useful when using updateFilters & updateSorting and you wish to only send the backend query once.
  - optional and defaults to true `updateFilters([], true, true)`

### Query Different Field
Sometime you want to display a certain column (let say `countryName`) but you want to filter from a different column (say `countryCode`), in such use case you can use 1 of these 4 optional
- `queryField`: this will affect both the Filter & Sort
- `queryFieldFilter`: this will affect only the Filter
- `queryFieldSorter`: this will affect only the Sort
- `queryFieldNameGetterFn`: dynamically change column to do Filter/Sort (see below)

### Dynamic Query Field
What if you a field that you only know which field to query only at run time and depending on the item object (`dataContext`)?
We can defined a `queryFieldNameGetterFn` callback that will be executed on each row when Filtering and/or Sorting.
```ts
queryFieldNameGetterFn: (dataContext) => {
  // do your logic and return the field name will be queried
  // for example let say that we query "profitRatio" when we have a profit else we query "lossRatio"
  return dataContext.profit > 0 ? 'profitRatio' : 'lossRatio';
},
```

### Debounce/Throttle Text Search (wait for user to stop typing before filtering)
When having a large dataset, it might be useful to add a debounce delay so that typing multiple character successively won't affect the search time, you can use the `filterTypingDebounce` grid option for that use case. What it will do is simply wait for the user to finish typing before executing the filter condition, you typically don't want to put this number too high and I find that between 250-500 is a good number.
```ts
this.gridOptions = {
   filterTypingDebounce: 250,
};
```

### Ignore Locale Accent in Text Filter/Sorting
You can ignore latin accent (or any other language accent) in text filter via the Grid Option `ignoreAccentOnStringFilterAndSort` flag (default is false)
```ts
this.gridOptions = {
   ignoreAccentOnStringFilterAndSort: true,
};
```