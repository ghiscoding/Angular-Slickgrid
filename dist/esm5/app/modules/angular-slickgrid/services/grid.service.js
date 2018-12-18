/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ExtensionService } from './extension.service';
import { FilterService } from './filter.service';
import { GridStateService } from './gridState.service';
import { SortService } from './sort.service';
var GridService = /** @class */ (function () {
    function GridService(extensionService, filterService, gridStateService, sortService, translate) {
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.gridStateService = gridStateService;
        this.sortService = sortService;
        this.translate = translate;
    }
    Object.defineProperty(GridService.prototype, "_columnDefinitions", {
        /** Getter for the Column Definitions pulled through the Grid Object */
        get: /**
         * Getter for the Column Definitions pulled through the Grid Object
         * @private
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @private
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    GridService.prototype.init = /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    };
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param cell event args
     * @return object with columnDef and dataContext
     */
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param {?} args
     * @return {?} object with columnDef and dataContext
     */
    GridService.prototype.getColumnFromEventArguments = /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param {?} args
     * @return {?} object with columnDef and dataContext
     */
    function (args) {
        if (!args || !args.grid || !args.grid.getColumns || !args.grid.getDataItem) {
            throw new Error('To get the column definition and data, we need to have these arguments passed as objects (row, cell, grid)');
        }
        return {
            row: args.row,
            cell: args.cell,
            columnDef: args.grid.getColumns()[args.cell],
            dataContext: args.grid.getDataItem(args.row),
            dataView: this._dataView,
            grid: this._grid,
            gridDefinition: this._gridOptions
        };
    };
    /** Get data item by it's row index number */
    /**
     * Get data item by it's row index number
     * @param {?} rowNumber
     * @return {?}
     */
    GridService.prototype.getDataItemByRowNumber = /**
     * Get data item by it's row index number
     * @param {?} rowNumber
     * @return {?}
     */
    function (rowNumber) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(rowNumber);
    };
    /** Chain the item Metadata with our implementation of Metadata at given row index */
    /**
     * Chain the item Metadata with our implementation of Metadata at given row index
     * @param {?} previousItemMetadata
     * @return {?}
     */
    GridService.prototype.getItemRowMetadataToHighlight = /**
     * Chain the item Metadata with our implementation of Metadata at given row index
     * @param {?} previousItemMetadata
     * @return {?}
     */
    function (previousItemMetadata) {
        var _this = this;
        return function (rowNumber) {
            /** @type {?} */
            var item = _this._dataView.getItem(rowNumber);
            /** @type {?} */
            var meta = { cssClasses: '' };
            if (typeof previousItemMetadata === 'function') {
                meta = previousItemMetadata(rowNumber);
            }
            if (item && item._dirty) {
                meta.cssClasses = (meta && meta.cssClasses || '') + ' dirty';
            }
            if (!meta) {
                meta = { cssClasses: '' };
            }
            if (item && item.rowClass && meta) {
                meta.cssClasses += " " + item.rowClass;
                meta.cssClasses += " row" + rowNumber;
            }
            return meta;
        };
    };
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param rowNumber
     * @param fadeDelay
     */
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    GridService.prototype.highlightRow = /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    function (rowNumber, fadeDelay) {
        var _this = this;
        if (fadeDelay === void 0) { fadeDelay = 1500; }
        // create a SelectionModel if there's not one yet
        if (!this._grid.getSelectionModel()) {
            /** @type {?} */
            var rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(rowSelectionPlugin);
        }
        /** @type {?} */
        var rowIndexes = Array.isArray(rowNumber) ? rowNumber : [rowNumber];
        this._grid.setSelectedRows(rowIndexes);
        if (Array.isArray(rowNumber)) {
            rowNumber.forEach(function (row) { return _this.highlightRowByMetadata(row, fadeDelay); });
        }
        else {
            this.highlightRowByMetadata(rowNumber, fadeDelay);
        }
    };
    /**
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    GridService.prototype.highlightRowByMetadata = /**
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    function (rowNumber, fadeDelay) {
        var _this = this;
        if (fadeDelay === void 0) { fadeDelay = 1500; }
        this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);
        /** @type {?} */
        var item = this._dataView.getItem(rowNumber);
        if (item && item.id) {
            item.rowClass = 'highlight';
            this._dataView.updateItem(item.id, item);
            /** @type {?} */
            var gridOptions = (/** @type {?} */ (this._grid.getOptions()));
            // highlight the row for a user defined timeout
            $("#" + gridOptions.gridId)
                .find(".highlight.row" + rowNumber)
                .first();
            // delete the row's CSS that was attached for highlighting
            setTimeout(function () {
                if (item && item.id) {
                    delete item.rowClass;
                    /** @type {?} */
                    var gridIdx = _this._dataView.getIdxById(item.id);
                    if (gridIdx !== undefined) {
                        _this._dataView.updateItem(item.id, item);
                    }
                }
            }, fadeDelay + 10);
        }
    };
    /** Get the Data Item from a grid row index */
    /**
     * Get the Data Item from a grid row index
     * @param {?} index
     * @return {?}
     */
    GridService.prototype.getDataItemByRowIndex = /**
     * Get the Data Item from a grid row index
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(index);
    };
    /** Get the Data Item from an array of grid row indexes */
    /**
     * Get the Data Item from an array of grid row indexes
     * @param {?} indexes
     * @return {?}
     */
    GridService.prototype.getDataItemByRowIndexes = /**
     * Get the Data Item from an array of grid row indexes
     * @param {?} indexes
     * @return {?}
     */
    function (indexes) {
        var _this = this;
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        /** @type {?} */
        var dataItems = [];
        if (Array.isArray(indexes)) {
            indexes.forEach(function (idx) {
                dataItems.push(_this._grid.getDataItem(idx));
            });
        }
        return dataItems;
    };
    /** Get the currently selected row indexes */
    /**
     * Get the currently selected row indexes
     * @return {?}
     */
    GridService.prototype.getSelectedRows = /**
     * Get the currently selected row indexes
     * @return {?}
     */
    function () {
        return this._grid.getSelectedRows();
    };
    /** Get the currently selected rows item data */
    /**
     * Get the currently selected rows item data
     * @return {?}
     */
    GridService.prototype.getSelectedRowsDataItem = /**
     * Get the currently selected rows item data
     * @return {?}
     */
    function () {
        if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        /** @type {?} */
        var selectedRowIndexes = this._grid.getSelectedRows();
        return this.getDataItemByRowIndexes(selectedRowIndexes);
    };
    /** Select the selected row by a row index */
    /**
     * Select the selected row by a row index
     * @param {?} rowIndex
     * @return {?}
     */
    GridService.prototype.setSelectedRow = /**
     * Select the selected row by a row index
     * @param {?} rowIndex
     * @return {?}
     */
    function (rowIndex) {
        this._grid.setSelectedRows([rowIndex]);
    };
    /** Set selected rows with provided array of row indexes */
    /**
     * Set selected rows with provided array of row indexes
     * @param {?} rowIndexes
     * @return {?}
     */
    GridService.prototype.setSelectedRows = /**
     * Set selected rows with provided array of row indexes
     * @param {?} rowIndexes
     * @return {?}
     */
    function (rowIndexes) {
        this._grid.setSelectedRows(rowIndexes);
    };
    /** Re-Render the Grid */
    /**
     * Re-Render the Grid
     * @return {?}
     */
    GridService.prototype.renderGrid = /**
     * Re-Render the Grid
     * @return {?}
     */
    function () {
        if (this._grid && typeof this._grid.invalidate === 'function') {
            this._grid.invalidate();
            this._grid.render();
        }
    };
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     */
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     * @param {?=} columnDefinitions
     * @return {?}
     */
    GridService.prototype.resetGrid = /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     * @param {?=} columnDefinitions
     * @return {?}
     */
    function (columnDefinitions) {
        // reset columns to original states & refresh the grid
        if (this._grid && this._dataView) {
            /** @type {?} */
            var originalColumns = this.extensionService.getAllColumns();
            // const originalColumns = columnDefinitions || this._columnDefinitions;
            if (Array.isArray(originalColumns) && originalColumns.length > 0) {
                // set the grid columns to it's original column definitions
                this._grid.setColumns(originalColumns);
                this._dataView.refresh();
                if (this._gridOptions && this._gridOptions.enableAutoSizeColumns) {
                    this._grid.autosizeColumns();
                }
                this.gridStateService.resetColumns(columnDefinitions);
            }
        }
        if (this.filterService && this.filterService.clearFilters) {
            this.filterService.clearFilters();
        }
        if (this.sortService && this.sortService.clearSorting) {
            this.sortService.clearSorting();
        }
    };
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param object dataItem: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after adding item
     */
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @return {?}
     */
    GridService.prototype.addItemToDatagrid = /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @return {?}
     */
    function (item, shouldHighlightRow) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (!this._grid || !this._gridOptions || !this._dataView) {
            throw new Error('We could not find SlickGrid Grid, DataView objects');
        }
        /** @type {?} */
        var row = 0;
        this._dataView.insertItem(row, item);
        this._grid.scrollRowIntoView(0); // scroll to row 0
        // highlight the row we just added, if defined
        if (shouldHighlightRow) {
            this.highlightRow(0, 1500);
        }
        // refresh dataview & grid
        this._dataView.refresh();
    };
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param dataItem array: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after adding item
     */
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} items
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @return {?}
     */
    GridService.prototype.addItemsToDatagrid = /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} items
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @return {?}
     */
    function (items, shouldHighlightRow) {
        var _this = this;
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (Array.isArray(items)) {
            items.forEach(function (item) { return _this.addItemToDatagrid(item, shouldHighlightRow); });
        }
    };
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param object item: item object holding all properties of that row
     */
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param {?} item
     * @return {?}
     */
    GridService.prototype.deleteDataGridItem = /**
     * Delete an existing item from the datagrid (dataView)
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!item || !item.hasOwnProperty('id')) {
            throw new Error("deleteDataGridItem() requires an item object which includes the \"id\" property");
        }
        /** @type {?} */
        var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        this.deleteDataGridItemById(itemId);
    };
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param itemId: item unique id
     */
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param {?} itemId
     * @return {?}
     */
    GridService.prototype.deleteDataGridItemById = /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param {?} itemId
     * @return {?}
     */
    function (itemId) {
        if (itemId === undefined) {
            throw new Error("Cannot delete a row without a valid \"id\"");
        }
        // delete the item from the dataView
        this._dataView.deleteItem(itemId);
        this._dataView.refresh();
    };
    /**
     * Update an existing item with new properties inside the datagrid
     * @param object item: item object holding all properties of that row
     * @return grid row index
     */
    /**
     * Update an existing item with new properties inside the datagrid
     * @param {?} item
     * @param {?=} shouldHighlightRow
     * @return {?} grid row index
     */
    GridService.prototype.updateDataGridItem = /**
     * Update an existing item with new properties inside the datagrid
     * @param {?} item
     * @param {?=} shouldHighlightRow
     * @return {?} grid row index
     */
    function (item, shouldHighlightRow) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        /** @type {?} */
        var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        if (itemId === undefined) {
            throw new Error("Could not find the item in the grid or it's associated \"id\"");
        }
        return this.updateDataGridItemById(itemId, item, shouldHighlightRow);
    };
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param object item: item object holding all properties of that row
     */
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param {?} items
     * @param {?=} shouldHighlightRow
     * @return {?}
     */
    GridService.prototype.updateDataGridItems = /**
     * Update an array of existing items with new properties inside the datagrid
     * @param {?} items
     * @param {?=} shouldHighlightRow
     * @return {?}
     */
    function (items, shouldHighlightRow) {
        var _this = this;
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (!Array.isArray(items)) {
            throw new Error('The function "updateDataGridItems" only support array of items, if you wish to only update 1 item then use "updateDataGridItem"');
        }
        /** @type {?} */
        var gridIndexes = [];
        items.forEach(function (item) {
            gridIndexes.push(_this.updateDataGridItem(item, false));
        });
        // only highlight at the end, all at once
        // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
        if (shouldHighlightRow) {
            this.highlightRow(gridIndexes);
        }
    };
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param itemId: item unique id
     * @param object item: item object holding all properties of that row
     * @param shouldHighlightRow do we want to highlight the row after update
     * @return grid row index
     */
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param {?} itemId
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @return {?} grid row index
     */
    GridService.prototype.updateDataGridItemById = /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param {?} itemId
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @return {?} grid row index
     */
    function (itemId, item, shouldHighlightRow) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (itemId === undefined) {
            throw new Error("Cannot update a row without a valid \"id\"");
        }
        /** @type {?} */
        var row = this._dataView.getRowById(itemId);
        if (!item || row === undefined) {
            throw new Error("Could not find the item in the grid or it's associated \"id\"");
        }
        /** @type {?} */
        var gridIdx = this._dataView.getIdxById(itemId);
        if (gridIdx !== undefined) {
            // Update the item itself inside the dataView
            this._dataView.updateItem(itemId, item);
            // highlight the row we just updated, if defined
            if (shouldHighlightRow) {
                this.highlightRow(row, 1500);
            }
            // refresh dataview & grid
            this._dataView.refresh();
            return gridIdx;
        }
    };
    GridService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridService.ctorParameters = function () { return [
        { type: ExtensionService },
        { type: FilterService },
        { type: GridStateService },
        { type: SortService },
        { type: TranslateService }
    ]; };
    return GridService;
}());
export { GridService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype._dataView;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype.extensionService;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype.filterService;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype.gridStateService;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype.sortService;
    /**
     * @type {?}
     * @private
     */
    GridService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU03QztJQUtFLHFCQUFvQixnQkFBa0MsRUFBVSxhQUE0QixFQUFVLGdCQUFrQyxFQUFVLFdBQXdCLEVBQVUsU0FBMkI7UUFBM0wscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBSSxDQUFDO0lBR3BOLHNCQUFZLDJDQUFrQjtRQUQ5Qix1RUFBdUU7Ozs7OztRQUN2RTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUdELHNCQUFZLHFDQUFZO1FBRHhCLGlFQUFpRTs7Ozs7O1FBQ2pFO1lBQ0UsT0FB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QUFHLEtBQUssU0FBUyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQTZELENBQUMsQ0FBQztTQUNoRjs7WUFFSyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ2pELElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUN6Qiw2Q0FBNkM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXhDLGdEQUFnRDtZQUNoRCxJQUFJLGtCQUFrQixFQUFFO2dCQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM5QjtZQUVELDBCQUEwQjtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXpCLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQzs7Z0JBelZGLFVBQVU7Ozs7Z0JBVEYsZ0JBQWdCO2dCQUNoQixhQUFhO2dCQUNiLGdCQUFnQjtnQkFDaEIsV0FBVztnQkFOWCxnQkFBZ0I7O0lBc1d6QixrQkFBQztDQUFBLEFBMVZELElBMFZDO1NBelZZLFdBQVc7Ozs7OztJQUN0Qiw0QkFBbUI7Ozs7O0lBQ25CLGdDQUF1Qjs7Ozs7SUFFWCx1Q0FBMEM7Ozs7O0lBQUUsb0NBQW9DOzs7OztJQUFFLHVDQUEwQzs7Ozs7SUFBRSxrQ0FBZ0M7Ozs7O0lBQUUsZ0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2VsbEFyZ3MsIENvbHVtbiwgR3JpZE9wdGlvbiwgT25FdmVudEFyZ3MgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBFeHRlbnNpb25TZXJ2aWNlIH0gZnJvbSAnLi9leHRlbnNpb24uc2VydmljZSc7XG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9maWx0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBHcmlkU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi9ncmlkU3RhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4vc29ydC5zZXJ2aWNlJztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdyaWRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uU2VydmljZTogRXh0ZW5zaW9uU2VydmljZSwgcHJpdmF0ZSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLCBwcml2YXRlIGdyaWRTdGF0ZVNlcnZpY2U6IEdyaWRTdGF0ZVNlcnZpY2UsIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlLCBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBEZWZpbml0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2NvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKSA/IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIDogW107XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgaW5pdChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIEZyb20gYSBTbGlja0dyaWQgRXZlbnQgdHJpZ2dlcmVkIGdldCB0aGUgQ29sdW1uIERlZmluaXRpb24gYW5kIEl0ZW0gRGF0YSBDb250ZXh0XG4gICAqXG4gICAqIEZvciBleGFtcGxlIHRoZSBTbGlja0dyaWQgb25DbGljayB3aWxsIHJldHVybiBjZWxsIGFyZ3VtZW50cyB3aGVuIHN1YnNjcmliaW5nIHRvIGl0LlxuICAgKiBGcm9tIHRoZXNlIGNlbGxBcmdzLCB3ZSB3YW50IHRvIGdldCB0aGUgQ29sdW1uIERlZmluaXRpb24gYW5kIEl0ZW0gRGF0YVxuICAgKiBAcGFyYW0gY2VsbCBldmVudCBhcmdzXG4gICAqIEByZXR1cm4gb2JqZWN0IHdpdGggY29sdW1uRGVmIGFuZCBkYXRhQ29udGV4dFxuICAgKi9cbiAgZ2V0Q29sdW1uRnJvbUV2ZW50QXJndW1lbnRzKGFyZ3M6IENlbGxBcmdzKTogT25FdmVudEFyZ3Mge1xuICAgIGlmICghYXJncyB8fCAhYXJncy5ncmlkIHx8ICFhcmdzLmdyaWQuZ2V0Q29sdW1ucyB8fCAhYXJncy5ncmlkLmdldERhdGFJdGVtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RvIGdldCB0aGUgY29sdW1uIGRlZmluaXRpb24gYW5kIGRhdGEsIHdlIG5lZWQgdG8gaGF2ZSB0aGVzZSBhcmd1bWVudHMgcGFzc2VkIGFzIG9iamVjdHMgKHJvdywgY2VsbCwgZ3JpZCknKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcm93OiBhcmdzLnJvdyxcbiAgICAgIGNlbGw6IGFyZ3MuY2VsbCxcbiAgICAgIGNvbHVtbkRlZjogYXJncy5ncmlkLmdldENvbHVtbnMoKVthcmdzLmNlbGxdLFxuICAgICAgZGF0YUNvbnRleHQ6IGFyZ3MuZ3JpZC5nZXREYXRhSXRlbShhcmdzLnJvdyksXG4gICAgICBkYXRhVmlldzogdGhpcy5fZGF0YVZpZXcsXG4gICAgICBncmlkOiB0aGlzLl9ncmlkLFxuICAgICAgZ3JpZERlZmluaXRpb246IHRoaXMuX2dyaWRPcHRpb25zXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBHZXQgZGF0YSBpdGVtIGJ5IGl0J3Mgcm93IGluZGV4IG51bWJlciAqL1xuICBnZXREYXRhSXRlbUJ5Um93TnVtYmVyKHJvd051bWJlcjogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8IHR5cGVvZiB0aGlzLl9ncmlkLmdldERhdGFJdGVtICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZ3JpZC5nZXREYXRhSXRlbShyb3dOdW1iZXIpO1xuICB9XG5cbiAgLyoqIENoYWluIHRoZSBpdGVtIE1ldGFkYXRhIHdpdGggb3VyIGltcGxlbWVudGF0aW9uIG9mIE1ldGFkYXRhIGF0IGdpdmVuIHJvdyBpbmRleCAqL1xuICBnZXRJdGVtUm93TWV0YWRhdGFUb0hpZ2hsaWdodChwcmV2aW91c0l0ZW1NZXRhZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIChyb3dOdW1iZXI6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2RhdGFWaWV3LmdldEl0ZW0ocm93TnVtYmVyKTtcbiAgICAgIGxldCBtZXRhID0geyBjc3NDbGFzc2VzOiAnJyB9O1xuICAgICAgaWYgKHR5cGVvZiBwcmV2aW91c0l0ZW1NZXRhZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBtZXRhID0gcHJldmlvdXNJdGVtTWV0YWRhdGEocm93TnVtYmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5fZGlydHkpIHtcbiAgICAgICAgbWV0YS5jc3NDbGFzc2VzID0gKG1ldGEgJiYgbWV0YS5jc3NDbGFzc2VzIHx8ICcnKSArICcgZGlydHknO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1ldGEpIHtcbiAgICAgICAgbWV0YSA9IHsgY3NzQ2xhc3NlczogJycgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5yb3dDbGFzcyAmJiBtZXRhKSB7XG4gICAgICAgIG1ldGEuY3NzQ2xhc3NlcyArPSBgICR7aXRlbS5yb3dDbGFzc31gO1xuICAgICAgICBtZXRhLmNzc0NsYXNzZXMgKz0gYCByb3cke3Jvd051bWJlcn1gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWV0YTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodCB0aGVuIGZhZGUgYSByb3cgZm9yIHggc2Vjb25kcy5cbiAgICogVGhlIGltcGxlbWVudGF0aW9uIGZvbGxvd3MgdGhpcyBTTyBhbnN3ZXI6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xOTk4NTE0OC8xMjEyMTY2XG4gICAqIEBwYXJhbSByb3dOdW1iZXJcbiAgICogQHBhcmFtIGZhZGVEZWxheVxuICAgKi9cbiAgaGlnaGxpZ2h0Um93KHJvd051bWJlcjogbnVtYmVyIHwgbnVtYmVyW10sIGZhZGVEZWxheTogbnVtYmVyID0gMTUwMCkge1xuICAgIC8vIGNyZWF0ZSBhIFNlbGVjdGlvbk1vZGVsIGlmIHRoZXJlJ3Mgbm90IG9uZSB5ZXRcbiAgICBpZiAoIXRoaXMuX2dyaWQuZ2V0U2VsZWN0aW9uTW9kZWwoKSkge1xuICAgICAgY29uc3Qgcm93U2VsZWN0aW9uUGx1Z2luID0gbmV3IFNsaWNrLlJvd1NlbGVjdGlvbk1vZGVsKHRoaXMuX2dyaWRPcHRpb25zLnJvd1NlbGVjdGlvbk9wdGlvbnMgfHwge30pO1xuICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3Rpb25Nb2RlbChyb3dTZWxlY3Rpb25QbHVnaW4pO1xuICAgIH1cblxuICAgIGNvbnN0IHJvd0luZGV4ZXMgPSBBcnJheS5pc0FycmF5KHJvd051bWJlcikgPyByb3dOdW1iZXIgOiBbcm93TnVtYmVyXTtcbiAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGVkUm93cyhyb3dJbmRleGVzKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHJvd051bWJlcikpIHtcbiAgICAgIHJvd051bWJlci5mb3JFYWNoKHJvdyA9PiB0aGlzLmhpZ2hsaWdodFJvd0J5TWV0YWRhdGEocm93LCBmYWRlRGVsYXkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaWdobGlnaHRSb3dCeU1ldGFkYXRhKHJvd051bWJlciwgZmFkZURlbGF5KTtcbiAgICB9XG4gIH1cblxuICBoaWdobGlnaHRSb3dCeU1ldGFkYXRhKHJvd051bWJlcjogbnVtYmVyLCBmYWRlRGVsYXk6IG51bWJlciA9IDE1MDApIHtcbiAgICB0aGlzLl9kYXRhVmlldy5nZXRJdGVtTWV0YWRhdGEgPSB0aGlzLmdldEl0ZW1Sb3dNZXRhZGF0YVRvSGlnaGxpZ2h0KHRoaXMuX2RhdGFWaWV3LmdldEl0ZW1NZXRhZGF0YSk7XG5cbiAgICBjb25zdCBpdGVtID0gdGhpcy5fZGF0YVZpZXcuZ2V0SXRlbShyb3dOdW1iZXIpO1xuICAgIGlmIChpdGVtICYmIGl0ZW0uaWQpIHtcbiAgICAgIGl0ZW0ucm93Q2xhc3MgPSAnaGlnaGxpZ2h0JztcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnVwZGF0ZUl0ZW0oaXRlbS5pZCwgaXRlbSk7XG4gICAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIGFzIEdyaWRPcHRpb247XG5cbiAgICAgIC8vIGhpZ2hsaWdodCB0aGUgcm93IGZvciBhIHVzZXIgZGVmaW5lZCB0aW1lb3V0XG4gICAgICAkKGAjJHtncmlkT3B0aW9ucy5ncmlkSWR9YClcbiAgICAgICAgICAuZmluZChgLmhpZ2hsaWdodC5yb3cke3Jvd051bWJlcn1gKVxuICAgICAgICAgIC5maXJzdCgpO1xuXG4gICAgICAvLyBkZWxldGUgdGhlIHJvdydzIENTUyB0aGF0IHdhcyBhdHRhY2hlZCBmb3IgaGlnaGxpZ2h0aW5nXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5pZCkge1xuICAgICAgICAgIGRlbGV0ZSBpdGVtLnJvd0NsYXNzO1xuICAgICAgICAgIGNvbnN0IGdyaWRJZHggPSB0aGlzLl9kYXRhVmlldy5nZXRJZHhCeUlkKGl0ZW0uaWQpO1xuICAgICAgICAgIGlmIChncmlkSWR4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnVwZGF0ZUl0ZW0oaXRlbS5pZCwgaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBmYWRlRGVsYXkgKyAxMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEdldCB0aGUgRGF0YSBJdGVtIGZyb20gYSBncmlkIHJvdyBpbmRleCAqL1xuICBnZXREYXRhSXRlbUJ5Um93SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5fZ3JpZCB8fCB0eXBlb2YgdGhpcy5fZ3JpZC5nZXREYXRhSXRlbSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCBvYmplY3QnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZ3JpZC5nZXREYXRhSXRlbShpbmRleCk7XG4gIH1cblxuICAvKiogR2V0IHRoZSBEYXRhIEl0ZW0gZnJvbSBhbiBhcnJheSBvZiBncmlkIHJvdyBpbmRleGVzICovXG4gIGdldERhdGFJdGVtQnlSb3dJbmRleGVzKGluZGV4ZXM6IG51bWJlcltdKSB7XG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8IHR5cGVvZiB0aGlzLl9ncmlkLmdldERhdGFJdGVtICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGFJdGVtcyA9IFtdO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaW5kZXhlcykpIHtcbiAgICAgIGluZGV4ZXMuZm9yRWFjaCgoaWR4KSA9PiB7XG4gICAgICAgIGRhdGFJdGVtcy5wdXNoKHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0oaWR4KSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YUl0ZW1zO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJvdyBpbmRleGVzICovXG4gIGdldFNlbGVjdGVkUm93cygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JpZC5nZXRTZWxlY3RlZFJvd3MoKTtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByb3dzIGl0ZW0gZGF0YSAqL1xuICBnZXRTZWxlY3RlZFJvd3NEYXRhSXRlbSgpIHtcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgdHlwZW9mIHRoaXMuX2dyaWQuZ2V0U2VsZWN0ZWRSb3dzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdGVkUm93SW5kZXhlcyA9IHRoaXMuX2dyaWQuZ2V0U2VsZWN0ZWRSb3dzKCk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0YUl0ZW1CeVJvd0luZGV4ZXMoc2VsZWN0ZWRSb3dJbmRleGVzKTtcbiAgfVxuXG4gIC8qKiBTZWxlY3QgdGhlIHNlbGVjdGVkIHJvdyBieSBhIHJvdyBpbmRleCAqL1xuICBzZXRTZWxlY3RlZFJvdyhyb3dJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3MoW3Jvd0luZGV4XSk7XG4gIH1cblxuICAvKiogU2V0IHNlbGVjdGVkIHJvd3Mgd2l0aCBwcm92aWRlZCBhcnJheSBvZiByb3cgaW5kZXhlcyAqL1xuICBzZXRTZWxlY3RlZFJvd3Mocm93SW5kZXhlczogbnVtYmVyW10pIHtcbiAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGVkUm93cyhyb3dJbmRleGVzKTtcbiAgfVxuXG4gIC8qKiBSZS1SZW5kZXIgdGhlIEdyaWQgKi9cbiAgcmVuZGVyR3JpZCgpIHtcbiAgICBpZiAodGhpcy5fZ3JpZCAmJiB0eXBlb2YgdGhpcy5fZ3JpZC5pbnZhbGlkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9ncmlkLmludmFsaWRhdGUoKTtcbiAgICAgIHRoaXMuX2dyaWQucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBncmlkIHRvIGl0J3Mgb3JpZ2luYWwgc3RhdGUgKGNsZWFyIGFueSBmaWx0ZXJzLCBzb3J0aW5nICYgcGFnaW5hdGlvbiBpZiBleGlzdHMpIC5cbiAgICogVGhlIGNvbHVtbiBkZWZpbml0aW9ucyBjb3VsZCBiZSBwYXNzZWQgYXMgYXJndW1lbnQgdG8gcmVzZXQgKHRoaXMgY2FuIGJlIHVzZWQgYWZ0ZXIgYSBHcmlkIFN0YXRlIHJlc2V0KVxuICAgKiBUaGUgcmVzZXQgd2lsbCBjbGVhciB0aGUgRmlsdGVycyAmIFNvcnQsIHRoZW4gd2lsbCByZXNldCB0aGUgQ29sdW1ucyB0byB0aGVpciBvcmlnaW5hbCBzdGF0ZVxuICAgKi9cbiAgcmVzZXRHcmlkKGNvbHVtbkRlZmluaXRpb25zPzogQ29sdW1uW10pIHtcbiAgICAvLyByZXNldCBjb2x1bW5zIHRvIG9yaWdpbmFsIHN0YXRlcyAmIHJlZnJlc2ggdGhlIGdyaWRcbiAgICBpZiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9kYXRhVmlldykge1xuICAgICAgY29uc3Qgb3JpZ2luYWxDb2x1bW5zID0gdGhpcy5leHRlbnNpb25TZXJ2aWNlLmdldEFsbENvbHVtbnMoKTtcbiAgICAgIC8vIGNvbnN0IG9yaWdpbmFsQ29sdW1ucyA9IGNvbHVtbkRlZmluaXRpb25zIHx8IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3JpZ2luYWxDb2x1bW5zKSAmJiBvcmlnaW5hbENvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBzZXQgdGhlIGdyaWQgY29sdW1ucyB0byBpdCdzIG9yaWdpbmFsIGNvbHVtbiBkZWZpbml0aW9uc1xuICAgICAgICB0aGlzLl9ncmlkLnNldENvbHVtbnMob3JpZ2luYWxDb2x1bW5zKTtcbiAgICAgICAgdGhpcy5fZGF0YVZpZXcucmVmcmVzaCgpO1xuICAgICAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XG4gICAgICAgICAgdGhpcy5fZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyaWRTdGF0ZVNlcnZpY2UucmVzZXRDb2x1bW5zKGNvbHVtbkRlZmluaXRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuZmlsdGVyU2VydmljZSAmJiB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJzKSB7XG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJzKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvcnRTZXJ2aWNlICYmIHRoaXMuc29ydFNlcnZpY2UuY2xlYXJTb3J0aW5nKSB7XG4gICAgICB0aGlzLnNvcnRTZXJ2aWNlLmNsZWFyU29ydGluZygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gaXRlbSAoZGF0YSBpdGVtKSB0byB0aGUgZGF0YWdyaWQsIGJ5IGRlZmF1bHQgaXQgd2lsbCBoaWdobGlnaHQgKGZsYXNoaW5nKSB0aGUgaW5zZXJ0ZWQgcm93IGJ1dCB3ZSBjYW4gZGlzYWJsZSBpdCB0b29cbiAgICogQHBhcmFtIG9iamVjdCBkYXRhSXRlbTogaXRlbSBvYmplY3QgaG9sZGluZyBhbGwgcHJvcGVydGllcyBvZiB0aGF0IHJvd1xuICAgKiBAcGFyYW0gc2hvdWxkSGlnaGxpZ2h0Um93IGRvIHdlIHdhbnQgdG8gaGlnaGxpZ2h0IHRoZSByb3cgYWZ0ZXIgYWRkaW5nIGl0ZW1cbiAgICovXG4gIGFkZEl0ZW1Ub0RhdGFncmlkKGl0ZW06IGFueSwgc2hvdWxkSGlnaGxpZ2h0Um93ID0gdHJ1ZSkge1xuICAgIGlmICghdGhpcy5fZ3JpZCB8fCAhdGhpcy5fZ3JpZE9wdGlvbnMgfHwgIXRoaXMuX2RhdGFWaWV3KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkLCBEYXRhVmlldyBvYmplY3RzJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgcm93ID0gMDtcbiAgICB0aGlzLl9kYXRhVmlldy5pbnNlcnRJdGVtKHJvdywgaXRlbSk7XG4gICAgdGhpcy5fZ3JpZC5zY3JvbGxSb3dJbnRvVmlldygwKTsgLy8gc2Nyb2xsIHRvIHJvdyAwXG5cbiAgICAvLyBoaWdobGlnaHQgdGhlIHJvdyB3ZSBqdXN0IGFkZGVkLCBpZiBkZWZpbmVkXG4gICAgaWYgKHNob3VsZEhpZ2hsaWdodFJvdykge1xuICAgICAgdGhpcy5oaWdobGlnaHRSb3coMCwgMTUwMCk7XG4gICAgfVxuXG4gICAgLy8gcmVmcmVzaCBkYXRhdmlldyAmIGdyaWRcbiAgICB0aGlzLl9kYXRhVmlldy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGl0ZW0gYXJyYXkgKGRhdGEgaXRlbSkgdG8gdGhlIGRhdGFncmlkLCBieSBkZWZhdWx0IGl0IHdpbGwgaGlnaGxpZ2h0IChmbGFzaGluZykgdGhlIGluc2VydGVkIHJvdyBidXQgd2UgY2FuIGRpc2FibGUgaXQgdG9vXG4gICAqIEBwYXJhbSBkYXRhSXRlbSBhcnJheTogaXRlbSBvYmplY3QgaG9sZGluZyBhbGwgcHJvcGVydGllcyBvZiB0aGF0IHJvd1xuICAgKiBAcGFyYW0gc2hvdWxkSGlnaGxpZ2h0Um93IGRvIHdlIHdhbnQgdG8gaGlnaGxpZ2h0IHRoZSByb3cgYWZ0ZXIgYWRkaW5nIGl0ZW1cbiAgICovXG4gIGFkZEl0ZW1zVG9EYXRhZ3JpZChpdGVtczogYW55W10sIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IGFueSkgPT4gdGhpcy5hZGRJdGVtVG9EYXRhZ3JpZChpdGVtLCBzaG91bGRIaWdobGlnaHRSb3cpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGFuIGV4aXN0aW5nIGl0ZW0gZnJvbSB0aGUgZGF0YWdyaWQgKGRhdGFWaWV3KVxuICAgKiBAcGFyYW0gb2JqZWN0IGl0ZW06IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICovXG4gIGRlbGV0ZURhdGFHcmlkSXRlbShpdGVtOiBhbnkpIHtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZGVsZXRlRGF0YUdyaWRJdGVtKCkgcmVxdWlyZXMgYW4gaXRlbSBvYmplY3Qgd2hpY2ggaW5jbHVkZXMgdGhlIFwiaWRcIiBwcm9wZXJ0eWApO1xuICAgIH1cbiAgICBjb25zdCBpdGVtSWQgPSAoIWl0ZW0gfHwgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpID8gdW5kZWZpbmVkIDogaXRlbS5pZDtcbiAgICB0aGlzLmRlbGV0ZURhdGFHcmlkSXRlbUJ5SWQoaXRlbUlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYW4gZXhpc3RpbmcgaXRlbSBmcm9tIHRoZSBkYXRhZ3JpZCAoZGF0YVZpZXcpIGJ5IGl0J3MgaWRcbiAgICogQHBhcmFtIGl0ZW1JZDogaXRlbSB1bmlxdWUgaWRcbiAgICovXG4gIGRlbGV0ZURhdGFHcmlkSXRlbUJ5SWQoaXRlbUlkOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBpZiAoaXRlbUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGRlbGV0ZSBhIHJvdyB3aXRob3V0IGEgdmFsaWQgXCJpZFwiYCk7XG4gICAgfVxuXG4gICAgLy8gZGVsZXRlIHRoZSBpdGVtIGZyb20gdGhlIGRhdGFWaWV3XG4gICAgdGhpcy5fZGF0YVZpZXcuZGVsZXRlSXRlbShpdGVtSWQpO1xuICAgIHRoaXMuX2RhdGFWaWV3LnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbSB3aXRoIG5ldyBwcm9wZXJ0aWVzIGluc2lkZSB0aGUgZGF0YWdyaWRcbiAgICogQHBhcmFtIG9iamVjdCBpdGVtOiBpdGVtIG9iamVjdCBob2xkaW5nIGFsbCBwcm9wZXJ0aWVzIG9mIHRoYXQgcm93XG4gICAqIEByZXR1cm4gZ3JpZCByb3cgaW5kZXhcbiAgICovXG4gIHVwZGF0ZURhdGFHcmlkSXRlbShpdGVtOiBhbnksIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUpIHtcbiAgICBjb25zdCBpdGVtSWQgPSAoIWl0ZW0gfHwgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpID8gdW5kZWZpbmVkIDogaXRlbS5pZDtcblxuICAgIGlmIChpdGVtSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCB0aGUgaXRlbSBpbiB0aGUgZ3JpZCBvciBpdCdzIGFzc29jaWF0ZWQgXCJpZFwiYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlRGF0YUdyaWRJdGVtQnlJZChpdGVtSWQsIGl0ZW0sIHNob3VsZEhpZ2hsaWdodFJvdyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGFycmF5IG9mIGV4aXN0aW5nIGl0ZW1zIHdpdGggbmV3IHByb3BlcnRpZXMgaW5zaWRlIHRoZSBkYXRhZ3JpZFxuICAgKiBAcGFyYW0gb2JqZWN0IGl0ZW06IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICovXG4gIHVwZGF0ZURhdGFHcmlkSXRlbXMoaXRlbXM6IGFueVtdLCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZnVuY3Rpb24gXCJ1cGRhdGVEYXRhR3JpZEl0ZW1zXCIgb25seSBzdXBwb3J0IGFycmF5IG9mIGl0ZW1zLCBpZiB5b3Ugd2lzaCB0byBvbmx5IHVwZGF0ZSAxIGl0ZW0gdGhlbiB1c2UgXCJ1cGRhdGVEYXRhR3JpZEl0ZW1cIicpO1xuICAgIH1cblxuICAgIGNvbnN0IGdyaWRJbmRleGVzOiBudW1iZXJbXSA9IFtdO1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGdyaWRJbmRleGVzLnB1c2godGhpcy51cGRhdGVEYXRhR3JpZEl0ZW0oaXRlbSwgZmFsc2UpKTtcbiAgICB9KTtcblxuICAgIC8vIG9ubHkgaGlnaGxpZ2h0IGF0IHRoZSBlbmQsIGFsbCBhdCBvbmNlXG4gICAgLy8gd2UgaGF2ZSB0byBkbyB0aGlzIGJlY2F1c2UgZG9pbmcgaGlnaGxpZ2h0IDEgYnkgMSB3b3VsZCBvbmx5IHJlLXNlbGVjdCB0aGUgbGFzdCBoaWdobGlnaHRlZCByb3cgd2hpY2ggaXMgd3JvbmcgYmVoYXZpb3JcbiAgICBpZiAoc2hvdWxkSGlnaGxpZ2h0Um93KSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodFJvdyhncmlkSW5kZXhlcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbiBleGlzdGluZyBpdGVtIGluIHRoZSBkYXRhZ3JpZCBieSBpdCdzIGlkIGFuZCBuZXcgcHJvcGVydGllc1xuICAgKiBAcGFyYW0gaXRlbUlkOiBpdGVtIHVuaXF1ZSBpZFxuICAgKiBAcGFyYW0gb2JqZWN0IGl0ZW06IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICogQHBhcmFtIHNob3VsZEhpZ2hsaWdodFJvdyBkbyB3ZSB3YW50IHRvIGhpZ2hsaWdodCB0aGUgcm93IGFmdGVyIHVwZGF0ZVxuICAgKiBAcmV0dXJuIGdyaWQgcm93IGluZGV4XG4gICAqL1xuICB1cGRhdGVEYXRhR3JpZEl0ZW1CeUlkKGl0ZW1JZDogbnVtYmVyIHwgc3RyaW5nLCBpdGVtOiBhbnksIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUpIHtcbiAgICBpZiAoaXRlbUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHVwZGF0ZSBhIHJvdyB3aXRob3V0IGEgdmFsaWQgXCJpZFwiYCk7XG4gICAgfVxuICAgIGNvbnN0IHJvdyA9IHRoaXMuX2RhdGFWaWV3LmdldFJvd0J5SWQoaXRlbUlkKTtcblxuICAgIGlmICghaXRlbSB8fCByb3cgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCB0aGUgaXRlbSBpbiB0aGUgZ3JpZCBvciBpdCdzIGFzc29jaWF0ZWQgXCJpZFwiYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZ3JpZElkeCA9IHRoaXMuX2RhdGFWaWV3LmdldElkeEJ5SWQoaXRlbUlkKTtcbiAgICBpZiAoZ3JpZElkeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBVcGRhdGUgdGhlIGl0ZW0gaXRzZWxmIGluc2lkZSB0aGUgZGF0YVZpZXdcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtKTtcblxuICAgICAgLy8gaGlnaGxpZ2h0IHRoZSByb3cgd2UganVzdCB1cGRhdGVkLCBpZiBkZWZpbmVkXG4gICAgICBpZiAoc2hvdWxkSGlnaGxpZ2h0Um93KSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KHJvdywgMTUwMCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlZnJlc2ggZGF0YXZpZXcgJiBncmlkXG4gICAgICB0aGlzLl9kYXRhVmlldy5yZWZyZXNoKCk7XG5cbiAgICAgIHJldHVybiBncmlkSWR4O1xuICAgIH1cbiAgfVxufVxuIl19