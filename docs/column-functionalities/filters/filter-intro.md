#### Index
- [How to use Filter?](#how-to-use-filter)
- [Filtering with Localization](input-filter.md#how-to-hide-filter-header-row)
- [Filtering with Localization](input-filter.md#filtering-with-localization-i18n)
- [Filter Complex Object](input-filter.md#how-to-filter-complex-objects)
- [Update Filters Dynamically](input-filter.md#update-filters-dynamically)
- [Query Different Field (Filter/Sort)](input-filter.md#query-different-field)
- [Dynamic Query Field](input-filter.md#dynamic-query-field)
- [Debounce/Throttle Text Search (wait for user to stop typing before filtering)](input-filter.md#debouncethrottle-text-search-wait-for-user-to-stop-typing-before-filtering)
- [Ignore Locale Accent in Text Filter/Sorting](input-filter.md#ignore-locale-accent-in-text-filtersorting)
- [Custom Filter Predicate](input-filter.md#custom-filter-predicate)
- [Filter Shortcuts](input-filter.md#filter-shortcuts)

### Description

Filtering is a big part of a data grid, Slickgrid-Universal provides a few built-in Filters that you can use in your grids. You need to tell the grid that you want to use Filtering (via Grid Options) and you also need to enable the filter for every column that you need filtering (via Column Definitions).

### How to use Filter?
You simply need to set the flag `filterable` for each column that you want filtering and then also enable the filters in the Grid Options. Here is an example with a full column definitions:
```ts
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title' }, // without filter
  { id: 'description', name: 'Description', field: 'description', filterable: true } // with filter
];

// you also need to enable the filters in the Grid Options
this.gridOptions = {
  enableFiltering: true
};
```

### How to hide Filter Header Row?
There are 2 ways to hide Filters from the user, you could disable it completely OR you could hide the Filter Header Row.

##### You could disable the Filters completely,
```ts
angularGridReady(angularGrid: AngularGridInstance) {
  this.angularGrid = angularGrid;
}

disableFilters() {
  this.gridOptions = {
     enableFiltering: false
  };

  // you could re-enable it later
  this.angularGrid.setOptions({ enableFiltering: true });
}
```

##### You could also enable Filters but Hide them from the user in the UI
This can be useful for features that require Filtering but you wish to hide the filters for example Tree Data.

```ts
this.gridOptions = {
  enableFiltering: true,
  showHeaderRow: false,
};
```

Also, if you don't want to see the Grid Menu toggle filter row command, you should also hide it from the menu via

```ts
angularGridReady(angularGrid: AngularGridInstance) {
  this.angularGrid = angularGrid;
}

hideFilterRow() {
  this.gridOptions = {
    enableFiltering: true,
    showHeaderRow: false,
    gridMenu: {
      hideToggleFilterCommand: true
    },
  };

  // you can show toggle the filter header row dynamically
  this.angularGrid.setHeaderRowVisibility(true);
}
```