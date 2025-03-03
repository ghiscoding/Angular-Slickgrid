## Full list of Events by Categories

(see below for full list of events)

All the events are published with a data payload in a `CustomEvent`, so you will typically find the payload under the `detail` property of the `CustomEvent`. However please note that the events from `SlickGrid` and `SlickDataView`, shown at the bottom of the list, are published with a different structure which is also including the JS event that it was triggered with under the property `eventData` and the payload itself is under the `args` property (which follows original SlickGrid structure). To subscribe to all events, you can use your PubSub instance (if available) or add listeners on your grid container DOM element.

#### `SlickGrid` and `SlickDataView`
```ts
// 1. with PubSub instance
this.angularGrid.instances?.eventPubSubService?.subscribe('onCellChange', (payload) => console.log('PubSub, cell changed data:', payload));

// 2. with CustomEvent in the View (see html code below)
handleOnCellChange(e) {
  // `eventData` is the event it was triggered from and `args` is the data payload
  const { eventData, args } = e.detail;
  const dataContext = args?.item;
  console.log('cell changed data:', args);
}
```
```html
<!-- 2. with CustomEvent in the View -->
<angular-slickgrid
     gridId="grid2"
     [columnDefinitions]="columnDefinitions"
     [gridOptions]="gridOptions"
     [dataset]="dataset"
     (onCellChange)="handleOnCellChange($event.detail)">
</angular-slickgrid>
```

#### all other events
```ts
// 1. with PubSub instance
this.angularGrid.instances?.eventPubSubService?.subscribe('onHeaderMenuCommand', (payload) => console.log('PubSub, header menu command', payload));

// 2. with CustomEvent in the View (see html code below)
handleOnHeaderMenuCommand(e) {
  // detail is the args data payload
  const args = e.detail;
  console.log('header menu command', args);
}
```
```html
<!-- 2. with CustomEvent in the View -->
<angular-slickgrid
     gridId="grid2"
     [columnDefinitions]="columnDefinitions"
     [gridOptions]="gridOptions"
     [dataset]="dataset"
     (onHeaderMenuCommand)="handleOnHeaderMenuCommand($event.detail)">
</angular-slickgrid>
```

---

#### CellExternalCopyManager (extension)
  - `onCopyCells`
  - `onCopyCancelled`
  - `onPasteCells`
  - `onBeforePasteCell`

#### Context Menu / Cell Menu (extension)
  - `onContextMenuClearGrouping`
  - `onContextMenuCollapseAllGroups`
  - `onContextMenuExpandAllGroups`
  - **Slick Events**
    - `onAfterMenuShow`
    - `onBeforeMenuShow`
    - `onBeforeMenuClose`
    - `onCommand`
    - `onOptionSelected`

#### Column Picker (extension)
  - `onColumnPickerColumnsChanged`
  - **Slick Events**
    - `onColumnsChanged`

#### Grid Menu (extension)
  - `onGridMenuMenuClose`
  - `onGridMenuBeforeMenuShow`
  - `onGridMenuAfterMenuShow`
  - `onGridMenuClearAllPinning`
  - `onGridMenuClearAllFilters`
  - `onGridMenuClearAllSorting`
  - `onGridMenuColumnsChanged`
  - `onGridMenuCommand`
  - **Slick Events**
    - `onAfterMenuShow`
    - `onBeforeMenuShow`
    - `onBeforeMenuClose`
    - `onColumnsChanged`
    - `onMenuClose`
    - `onCommand`

#### Header Buttons (extension)
  - `onHeaderButtonCommand`

#### Header Menu (extension)
  - `onHeaderMenuHideColumns`
  - `onHeaderMenuCommand`
  - `onHeaderMenuColumnResizeByContent`
  - `onHeaderMenuBeforeMenuShow`
  - `onHeaderMenuAfterMenuShow`

#### Filter Service
   - `onBeforeFilterClear`
   - `onBeforeSearchChange`
   - `onFilterCleared`

#### Grid Service
  - `onHeaderMenuHideColumns`
  - `onItemAdded`
  - `onItemDeleted`
  - `onItemUpdated`
  - `onItemUpserted`

#### GridState Service
  - `onFullResizeByContentRequested`
  - `onGridStateChanged`

#### Pagination Service
  - `onBeforePaginationChange`
  - `onPaginationChanged`
  - `onPaginationRefreshed`
  - `onPaginationPresetsInitialized`
  - `onPaginationVisibilityChanged`
  - `onPaginationSetCursorBased` (for GraphQL only)

#### Resizer Service
  - `onGridBeforeResize`
  - `onGridAfterResize`
  - `onBeforeResizeByContent`
  - `onAfterResizeByContent`

#### Sort Service
  - `onSortCleared`
  - `onSortChanged`
  - `onBeforeSortChange`

#### TreeData Service
  - `onTreeFullToggleStart`
  - `onTreeFullToggleEnd`
  - `onTreeItemToggled`

#### Angular-Slickgrid Component
  - `onBeforeGridDestroy`
  - `onAfterGridDestroyed`
  - `onBeforeGridCreate`
  - `onDataviewCreated`
  - `onGridCreated`
  - `onAngularGridCreated`
  - `onGridStateChanged`

#### SlickGrid
  - `onActiveCellChanged`
  - `onActiveCellPositionChanged`
  - `onAddNewRow`
  - `onAfterSetColumns`
  - `onAutosizeColumns`
  - `onBeforeAppendCell`
  - `onBeforeCellEditorDestroy`
  - `onBeforeColumnsResize`
  - `onBeforeDestroy`
  - `onBeforeEditCell`
  - `onBeforeFooterRowCellDestroy`
  - `onBeforeHeaderCellDestroy`
  - `onBeforeHeaderRowCellDestroy`
  - `onBeforeRemoveCachedRow`
  - `onBeforeSetColumns`
  - `onBeforeSort`
  - `onBeforeUpdateColumns`
  - `onCellChange`
  - `onCellCssStylesChanged`
  - `onClick`
  - `onColumnsReordered`
  - `onColumnsDrag`
  - `onColumnsResized`
  - `onColumnsResizeDblClick`
  - `onCompositeEditorChange`
  - `onContextMenu`
  - `onDblClick`
  - `onDrag`
  - `onDragInit`
  - `onDragStart`
  - `onDragEnd`
  - `onFooterClick`
  - `onFooterContextMenu`
  - `onFooterRowCellRendered`
  - `onHeaderCellRendered`
  - `onHeaderClick`
  - `onHeaderContextMenu`
  - `onHeaderMouseEnter`
  - `onHeaderMouseLeave`
  - `onHeaderMouseOver`
  - `onHeaderMouseOut`
  - `onHeaderRowCellRendered`
  - `onHeaderRowMouseEnter`
  - `onHeaderRowMouseLeave`
  - `onHeaderRowMouseOver`
  - `onHeaderRowMouseOut`
  - `onKeyDown`
  - `onMouseEnter`
  - `onMouseLeave`
  - `onPreHeaderClick`
  - `onPreHeaderContextMenu`
  - `onRendered`
  - `onScroll`
  - `onSelectedRowsChanged`
  - `onSetOptions`
  - `onActivateChangedOptions`
  - `onSort`
  - `onValidationError`
  - `onViewportChanged`

#### SlickDataView
  - `onBeforePagingInfoChanged`
  - `onGroupExpanded`
  - `onGroupCollapsed`
  - `onPagingInfoChanged`
  - `onRowCountChanged`
  - `onRowsChanged`
  - `onRowsOrCountChanged`
  - `onSelectedRowIdsChanged`
  - `onSetItemsCalled`
