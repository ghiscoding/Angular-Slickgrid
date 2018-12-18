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
export class GridService {
    /**
     * @param {?} extensionService
     * @param {?} filterService
     * @param {?} gridStateService
     * @param {?} sortService
     * @param {?} translate
     */
    constructor(extensionService, filterService, gridStateService, sortService, translate) {
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.gridStateService = gridStateService;
        this.sortService = sortService;
        this.translate = translate;
    }
    /**
     * Getter for the Column Definitions pulled through the Grid Object
     * @private
     * @return {?}
     */
    get _columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @private
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    init(grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    }
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param {?} args
     * @return {?} object with columnDef and dataContext
     */
    getColumnFromEventArguments(args) {
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
    }
    /**
     * Get data item by it's row index number
     * @param {?} rowNumber
     * @return {?}
     */
    getDataItemByRowNumber(rowNumber) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(rowNumber);
    }
    /**
     * Chain the item Metadata with our implementation of Metadata at given row index
     * @param {?} previousItemMetadata
     * @return {?}
     */
    getItemRowMetadataToHighlight(previousItemMetadata) {
        return (rowNumber) => {
            /** @type {?} */
            const item = this._dataView.getItem(rowNumber);
            /** @type {?} */
            let meta = { cssClasses: '' };
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
                meta.cssClasses += ` ${item.rowClass}`;
                meta.cssClasses += ` row${rowNumber}`;
            }
            return meta;
        };
    }
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    highlightRow(rowNumber, fadeDelay = 1500) {
        // create a SelectionModel if there's not one yet
        if (!this._grid.getSelectionModel()) {
            /** @type {?} */
            const rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(rowSelectionPlugin);
        }
        /** @type {?} */
        const rowIndexes = Array.isArray(rowNumber) ? rowNumber : [rowNumber];
        this._grid.setSelectedRows(rowIndexes);
        if (Array.isArray(rowNumber)) {
            rowNumber.forEach(row => this.highlightRowByMetadata(row, fadeDelay));
        }
        else {
            this.highlightRowByMetadata(rowNumber, fadeDelay);
        }
    }
    /**
     * @param {?} rowNumber
     * @param {?=} fadeDelay
     * @return {?}
     */
    highlightRowByMetadata(rowNumber, fadeDelay = 1500) {
        this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);
        /** @type {?} */
        const item = this._dataView.getItem(rowNumber);
        if (item && item.id) {
            item.rowClass = 'highlight';
            this._dataView.updateItem(item.id, item);
            /** @type {?} */
            const gridOptions = (/** @type {?} */ (this._grid.getOptions()));
            // highlight the row for a user defined timeout
            $(`#${gridOptions.gridId}`)
                .find(`.highlight.row${rowNumber}`)
                .first();
            // delete the row's CSS that was attached for highlighting
            setTimeout(() => {
                if (item && item.id) {
                    delete item.rowClass;
                    /** @type {?} */
                    const gridIdx = this._dataView.getIdxById(item.id);
                    if (gridIdx !== undefined) {
                        this._dataView.updateItem(item.id, item);
                    }
                }
            }, fadeDelay + 10);
        }
    }
    /**
     * Get the Data Item from a grid row index
     * @param {?} index
     * @return {?}
     */
    getDataItemByRowIndex(index) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        return this._grid.getDataItem(index);
    }
    /**
     * Get the Data Item from an array of grid row indexes
     * @param {?} indexes
     * @return {?}
     */
    getDataItemByRowIndexes(indexes) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        /** @type {?} */
        const dataItems = [];
        if (Array.isArray(indexes)) {
            indexes.forEach((idx) => {
                dataItems.push(this._grid.getDataItem(idx));
            });
        }
        return dataItems;
    }
    /**
     * Get the currently selected row indexes
     * @return {?}
     */
    getSelectedRows() {
        return this._grid.getSelectedRows();
    }
    /**
     * Get the currently selected rows item data
     * @return {?}
     */
    getSelectedRowsDataItem() {
        if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
            throw new Error('We could not find SlickGrid Grid object');
        }
        /** @type {?} */
        const selectedRowIndexes = this._grid.getSelectedRows();
        return this.getDataItemByRowIndexes(selectedRowIndexes);
    }
    /**
     * Select the selected row by a row index
     * @param {?} rowIndex
     * @return {?}
     */
    setSelectedRow(rowIndex) {
        this._grid.setSelectedRows([rowIndex]);
    }
    /**
     * Set selected rows with provided array of row indexes
     * @param {?} rowIndexes
     * @return {?}
     */
    setSelectedRows(rowIndexes) {
        this._grid.setSelectedRows(rowIndexes);
    }
    /**
     * Re-Render the Grid
     * @return {?}
     */
    renderGrid() {
        if (this._grid && typeof this._grid.invalidate === 'function') {
            this._grid.invalidate();
            this._grid.render();
        }
    }
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     * @param {?=} columnDefinitions
     * @return {?}
     */
    resetGrid(columnDefinitions) {
        // reset columns to original states & refresh the grid
        if (this._grid && this._dataView) {
            /** @type {?} */
            const originalColumns = this.extensionService.getAllColumns();
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
    }
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @return {?}
     */
    addItemToDatagrid(item, shouldHighlightRow = true) {
        if (!this._grid || !this._gridOptions || !this._dataView) {
            throw new Error('We could not find SlickGrid Grid, DataView objects');
        }
        /** @type {?} */
        const row = 0;
        this._dataView.insertItem(row, item);
        this._grid.scrollRowIntoView(0); // scroll to row 0
        // highlight the row we just added, if defined
        if (shouldHighlightRow) {
            this.highlightRow(0, 1500);
        }
        // refresh dataview & grid
        this._dataView.refresh();
    }
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param {?} items
     * @param {?=} shouldHighlightRow do we want to highlight the row after adding item
     * @return {?}
     */
    addItemsToDatagrid(items, shouldHighlightRow = true) {
        if (Array.isArray(items)) {
            items.forEach((item) => this.addItemToDatagrid(item, shouldHighlightRow));
        }
    }
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param {?} item
     * @return {?}
     */
    deleteDataGridItem(item) {
        if (!item || !item.hasOwnProperty('id')) {
            throw new Error(`deleteDataGridItem() requires an item object which includes the "id" property`);
        }
        /** @type {?} */
        const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        this.deleteDataGridItemById(itemId);
    }
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param {?} itemId
     * @return {?}
     */
    deleteDataGridItemById(itemId) {
        if (itemId === undefined) {
            throw new Error(`Cannot delete a row without a valid "id"`);
        }
        // delete the item from the dataView
        this._dataView.deleteItem(itemId);
        this._dataView.refresh();
    }
    /**
     * Update an existing item with new properties inside the datagrid
     * @param {?} item
     * @param {?=} shouldHighlightRow
     * @return {?} grid row index
     */
    updateDataGridItem(item, shouldHighlightRow = true) {
        /** @type {?} */
        const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        if (itemId === undefined) {
            throw new Error(`Could not find the item in the grid or it's associated "id"`);
        }
        return this.updateDataGridItemById(itemId, item, shouldHighlightRow);
    }
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param {?} items
     * @param {?=} shouldHighlightRow
     * @return {?}
     */
    updateDataGridItems(items, shouldHighlightRow = true) {
        if (!Array.isArray(items)) {
            throw new Error('The function "updateDataGridItems" only support array of items, if you wish to only update 1 item then use "updateDataGridItem"');
        }
        /** @type {?} */
        const gridIndexes = [];
        items.forEach((item) => {
            gridIndexes.push(this.updateDataGridItem(item, false));
        });
        // only highlight at the end, all at once
        // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
        if (shouldHighlightRow) {
            this.highlightRow(gridIndexes);
        }
    }
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param {?} itemId
     * @param {?} item
     * @param {?=} shouldHighlightRow do we want to highlight the row after update
     * @return {?} grid row index
     */
    updateDataGridItemById(itemId, item, shouldHighlightRow = true) {
        if (itemId === undefined) {
            throw new Error(`Cannot update a row without a valid "id"`);
        }
        /** @type {?} */
        const row = this._dataView.getRowById(itemId);
        if (!item || row === undefined) {
            throw new Error(`Could not find the item in the grid or it's associated "id"`);
        }
        /** @type {?} */
        const gridIdx = this._dataView.getIdxById(itemId);
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
    }
}
GridService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GridService.ctorParameters = () => [
    { type: ExtensionService },
    { type: FilterService },
    { type: GridStateService },
    { type: SortService },
    { type: TranslateService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU83QyxNQUFNLE9BQU8sV0FBVzs7Ozs7Ozs7SUFJdEIsWUFBb0IsZ0JBQWtDLEVBQVUsYUFBNEIsRUFBVSxnQkFBa0MsRUFBVSxXQUF3QixFQUFVLFNBQTJCO1FBQTNMLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQUksQ0FBQzs7Ozs7O0lBR3BOLElBQVksa0JBQWtCO1FBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5RSxDQUFDOzs7Ozs7SUFHRCxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElB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ICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENlbGxBcmdzLCBDb2x1bW4sIEdyaWRPcHRpb24sIE9uRXZlbnRBcmdzIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uU2VydmljZSB9IGZyb20gJy4vZXh0ZW5zaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4vZmlsdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JpZFN0YXRlU2VydmljZSB9IGZyb20gJy4vZ3JpZFN0YXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU29ydFNlcnZpY2UgfSBmcm9tICcuL3NvcnQuc2VydmljZSc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcmlkU2VydmljZSB7XG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVuc2lvblNlcnZpY2U6IEV4dGVuc2lvblNlcnZpY2UsIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSwgcHJpdmF0ZSBncmlkU3RhdGVTZXJ2aWNlOiBHcmlkU3RhdGVTZXJ2aWNlLCBwcml2YXRlIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZSwgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9jb2x1bW5EZWZpbml0aW9ucygpOiBDb2x1bW5bXSB7XG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0Q29sdW1ucykgPyB0aGlzLl9ncmlkLmdldENvbHVtbnMoKSA6IFtdO1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIGluaXQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIGEgU2xpY2tHcmlkIEV2ZW50IHRyaWdnZXJlZCBnZXQgdGhlIENvbHVtbiBEZWZpbml0aW9uIGFuZCBJdGVtIERhdGEgQ29udGV4dFxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSB0aGUgU2xpY2tHcmlkIG9uQ2xpY2sgd2lsbCByZXR1cm4gY2VsbCBhcmd1bWVudHMgd2hlbiBzdWJzY3JpYmluZyB0byBpdC5cbiAgICogRnJvbSB0aGVzZSBjZWxsQXJncywgd2Ugd2FudCB0byBnZXQgdGhlIENvbHVtbiBEZWZpbml0aW9uIGFuZCBJdGVtIERhdGFcbiAgICogQHBhcmFtIGNlbGwgZXZlbnQgYXJnc1xuICAgKiBAcmV0dXJuIG9iamVjdCB3aXRoIGNvbHVtbkRlZiBhbmQgZGF0YUNvbnRleHRcbiAgICovXG4gIGdldENvbHVtbkZyb21FdmVudEFyZ3VtZW50cyhhcmdzOiBDZWxsQXJncyk6IE9uRXZlbnRBcmdzIHtcbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuZ3JpZCB8fCAhYXJncy5ncmlkLmdldENvbHVtbnMgfHwgIWFyZ3MuZ3JpZC5nZXREYXRhSXRlbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyBnZXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGFuZCBkYXRhLCB3ZSBuZWVkIHRvIGhhdmUgdGhlc2UgYXJndW1lbnRzIHBhc3NlZCBhcyBvYmplY3RzIChyb3csIGNlbGwsIGdyaWQpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJvdzogYXJncy5yb3csXG4gICAgICBjZWxsOiBhcmdzLmNlbGwsXG4gICAgICBjb2x1bW5EZWY6IGFyZ3MuZ3JpZC5nZXRDb2x1bW5zKClbYXJncy5jZWxsXSxcbiAgICAgIGRhdGFDb250ZXh0OiBhcmdzLmdyaWQuZ2V0RGF0YUl0ZW0oYXJncy5yb3cpLFxuICAgICAgZGF0YVZpZXc6IHRoaXMuX2RhdGFWaWV3LFxuICAgICAgZ3JpZDogdGhpcy5fZ3JpZCxcbiAgICAgIGdyaWREZWZpbml0aW9uOiB0aGlzLl9ncmlkT3B0aW9uc1xuICAgIH07XG4gIH1cblxuICAvKiogR2V0IGRhdGEgaXRlbSBieSBpdCdzIHJvdyBpbmRleCBudW1iZXIgKi9cbiAgZ2V0RGF0YUl0ZW1CeVJvd051bWJlcihyb3dOdW1iZXI6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5fZ3JpZCB8fCB0eXBlb2YgdGhpcy5fZ3JpZC5nZXREYXRhSXRlbSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCBvYmplY3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0ocm93TnVtYmVyKTtcbiAgfVxuXG4gIC8qKiBDaGFpbiB0aGUgaXRlbSBNZXRhZGF0YSB3aXRoIG91ciBpbXBsZW1lbnRhdGlvbiBvZiBNZXRhZGF0YSBhdCBnaXZlbiByb3cgaW5kZXggKi9cbiAgZ2V0SXRlbVJvd01ldGFkYXRhVG9IaWdobGlnaHQocHJldmlvdXNJdGVtTWV0YWRhdGE6IGFueSkge1xuICAgIHJldHVybiAocm93TnVtYmVyOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9kYXRhVmlldy5nZXRJdGVtKHJvd051bWJlcik7XG4gICAgICBsZXQgbWV0YSA9IHsgY3NzQ2xhc3NlczogJycgfTtcbiAgICAgIGlmICh0eXBlb2YgcHJldmlvdXNJdGVtTWV0YWRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbWV0YSA9IHByZXZpb3VzSXRlbU1ldGFkYXRhKHJvd051bWJlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtICYmIGl0ZW0uX2RpcnR5KSB7XG4gICAgICAgIG1ldGEuY3NzQ2xhc3NlcyA9IChtZXRhICYmIG1ldGEuY3NzQ2xhc3NlcyB8fCAnJykgKyAnIGRpcnR5JztcbiAgICAgIH1cblxuICAgICAgaWYgKCFtZXRhKSB7XG4gICAgICAgIG1ldGEgPSB7IGNzc0NsYXNzZXM6ICcnIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtICYmIGl0ZW0ucm93Q2xhc3MgJiYgbWV0YSkge1xuICAgICAgICBtZXRhLmNzc0NsYXNzZXMgKz0gYCAke2l0ZW0ucm93Q2xhc3N9YDtcbiAgICAgICAgbWV0YS5jc3NDbGFzc2VzICs9IGAgcm93JHtyb3dOdW1iZXJ9YDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1ldGE7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWdobGlnaHQgdGhlbiBmYWRlIGEgcm93IGZvciB4IHNlY29uZHMuXG4gICAqIFRoZSBpbXBsZW1lbnRhdGlvbiBmb2xsb3dzIHRoaXMgU08gYW5zd2VyOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTk5ODUxNDgvMTIxMjE2NlxuICAgKiBAcGFyYW0gcm93TnVtYmVyXG4gICAqIEBwYXJhbSBmYWRlRGVsYXlcbiAgICovXG4gIGhpZ2hsaWdodFJvdyhyb3dOdW1iZXI6IG51bWJlciB8IG51bWJlcltdLCBmYWRlRGVsYXk6IG51bWJlciA9IDE1MDApIHtcbiAgICAvLyBjcmVhdGUgYSBTZWxlY3Rpb25Nb2RlbCBpZiB0aGVyZSdzIG5vdCBvbmUgeWV0XG4gICAgaWYgKCF0aGlzLl9ncmlkLmdldFNlbGVjdGlvbk1vZGVsKCkpIHtcbiAgICAgIGNvbnN0IHJvd1NlbGVjdGlvblBsdWdpbiA9IG5ldyBTbGljay5Sb3dTZWxlY3Rpb25Nb2RlbCh0aGlzLl9ncmlkT3B0aW9ucy5yb3dTZWxlY3Rpb25PcHRpb25zIHx8IHt9KTtcbiAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0aW9uTW9kZWwocm93U2VsZWN0aW9uUGx1Z2luKTtcbiAgICB9XG5cbiAgICBjb25zdCByb3dJbmRleGVzID0gQXJyYXkuaXNBcnJheShyb3dOdW1iZXIpID8gcm93TnVtYmVyIDogW3Jvd051bWJlcl07XG4gICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3Mocm93SW5kZXhlcyk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShyb3dOdW1iZXIpKSB7XG4gICAgICByb3dOdW1iZXIuZm9yRWFjaChyb3cgPT4gdGhpcy5oaWdobGlnaHRSb3dCeU1ldGFkYXRhKHJvdywgZmFkZURlbGF5KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Um93QnlNZXRhZGF0YShyb3dOdW1iZXIsIGZhZGVEZWxheSk7XG4gICAgfVxuICB9XG5cbiAgaGlnaGxpZ2h0Um93QnlNZXRhZGF0YShyb3dOdW1iZXI6IG51bWJlciwgZmFkZURlbGF5OiBudW1iZXIgPSAxNTAwKSB7XG4gICAgdGhpcy5fZGF0YVZpZXcuZ2V0SXRlbU1ldGFkYXRhID0gdGhpcy5nZXRJdGVtUm93TWV0YWRhdGFUb0hpZ2hsaWdodCh0aGlzLl9kYXRhVmlldy5nZXRJdGVtTWV0YWRhdGEpO1xuXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuX2RhdGFWaWV3LmdldEl0ZW0ocm93TnVtYmVyKTtcbiAgICBpZiAoaXRlbSAmJiBpdGVtLmlkKSB7XG4gICAgICBpdGVtLnJvd0NsYXNzID0gJ2hpZ2hsaWdodCc7XG4gICAgICB0aGlzLl9kYXRhVmlldy51cGRhdGVJdGVtKGl0ZW0uaWQsIGl0ZW0pO1xuICAgICAgY29uc3QgZ3JpZE9wdGlvbnMgPSB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSBhcyBHcmlkT3B0aW9uO1xuXG4gICAgICAvLyBoaWdobGlnaHQgdGhlIHJvdyBmb3IgYSB1c2VyIGRlZmluZWQgdGltZW91dFxuICAgICAgJChgIyR7Z3JpZE9wdGlvbnMuZ3JpZElkfWApXG4gICAgICAgICAgLmZpbmQoYC5oaWdobGlnaHQucm93JHtyb3dOdW1iZXJ9YClcbiAgICAgICAgICAuZmlyc3QoKTtcblxuICAgICAgLy8gZGVsZXRlIHRoZSByb3cncyBDU1MgdGhhdCB3YXMgYXR0YWNoZWQgZm9yIGhpZ2hsaWdodGluZ1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0uaWQpIHtcbiAgICAgICAgICBkZWxldGUgaXRlbS5yb3dDbGFzcztcbiAgICAgICAgICBjb25zdCBncmlkSWR4ID0gdGhpcy5fZGF0YVZpZXcuZ2V0SWR4QnlJZChpdGVtLmlkKTtcbiAgICAgICAgICBpZiAoZ3JpZElkeCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhVmlldy51cGRhdGVJdGVtKGl0ZW0uaWQsIGl0ZW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgZmFkZURlbGF5ICsgMTApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBHZXQgdGhlIERhdGEgSXRlbSBmcm9tIGEgZ3JpZCByb3cgaW5kZXggKi9cbiAgZ2V0RGF0YUl0ZW1CeVJvd0luZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgdHlwZW9mIHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2UgY291bGQgbm90IGZpbmQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0oaW5kZXgpO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgRGF0YSBJdGVtIGZyb20gYW4gYXJyYXkgb2YgZ3JpZCByb3cgaW5kZXhlcyAqL1xuICBnZXREYXRhSXRlbUJ5Um93SW5kZXhlcyhpbmRleGVzOiBudW1iZXJbXSkge1xuICAgIGlmICghdGhpcy5fZ3JpZCB8fCB0eXBlb2YgdGhpcy5fZ3JpZC5nZXREYXRhSXRlbSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhSXRlbXMgPSBbXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGluZGV4ZXMpKSB7XG4gICAgICBpbmRleGVzLmZvckVhY2goKGlkeCkgPT4ge1xuICAgICAgICBkYXRhSXRlbXMucHVzaCh0aGlzLl9ncmlkLmdldERhdGFJdGVtKGlkeCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGFJdGVtcztcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByb3cgaW5kZXhlcyAqL1xuICBnZXRTZWxlY3RlZFJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWQuZ2V0U2VsZWN0ZWRSb3dzKCk7XG4gIH1cblxuICAvKiogR2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcm93cyBpdGVtIGRhdGEgKi9cbiAgZ2V0U2VsZWN0ZWRSb3dzRGF0YUl0ZW0oKSB7XG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8IHR5cGVvZiB0aGlzLl9ncmlkLmdldFNlbGVjdGVkUm93cyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ZXMgPSB0aGlzLl9ncmlkLmdldFNlbGVjdGVkUm93cygpO1xuICAgIHJldHVybiB0aGlzLmdldERhdGFJdGVtQnlSb3dJbmRleGVzKHNlbGVjdGVkUm93SW5kZXhlcyk7XG4gIH1cblxuICAvKiogU2VsZWN0IHRoZSBzZWxlY3RlZCByb3cgYnkgYSByb3cgaW5kZXggKi9cbiAgc2V0U2VsZWN0ZWRSb3cocm93SW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKFtyb3dJbmRleF0pO1xuICB9XG5cbiAgLyoqIFNldCBzZWxlY3RlZCByb3dzIHdpdGggcHJvdmlkZWQgYXJyYXkgb2Ygcm93IGluZGV4ZXMgKi9cbiAgc2V0U2VsZWN0ZWRSb3dzKHJvd0luZGV4ZXM6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3Mocm93SW5kZXhlcyk7XG4gIH1cblxuICAvKiogUmUtUmVuZGVyIHRoZSBHcmlkICovXG4gIHJlbmRlckdyaWQoKSB7XG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdHlwZW9mIHRoaXMuX2dyaWQuaW52YWxpZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fZ3JpZC5pbnZhbGlkYXRlKCk7XG4gICAgICB0aGlzLl9ncmlkLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgZ3JpZCB0byBpdCdzIG9yaWdpbmFsIHN0YXRlIChjbGVhciBhbnkgZmlsdGVycywgc29ydGluZyAmIHBhZ2luYXRpb24gaWYgZXhpc3RzKSAuXG4gICAqIFRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgY291bGQgYmUgcGFzc2VkIGFzIGFyZ3VtZW50IHRvIHJlc2V0ICh0aGlzIGNhbiBiZSB1c2VkIGFmdGVyIGEgR3JpZCBTdGF0ZSByZXNldClcbiAgICogVGhlIHJlc2V0IHdpbGwgY2xlYXIgdGhlIEZpbHRlcnMgJiBTb3J0LCB0aGVuIHdpbGwgcmVzZXQgdGhlIENvbHVtbnMgdG8gdGhlaXIgb3JpZ2luYWwgc3RhdGVcbiAgICovXG4gIHJlc2V0R3JpZChjb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdKSB7XG4gICAgLy8gcmVzZXQgY29sdW1ucyB0byBvcmlnaW5hbCBzdGF0ZXMgJiByZWZyZXNoIHRoZSBncmlkXG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdGhpcy5fZGF0YVZpZXcpIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsQ29sdW1ucyA9IHRoaXMuZXh0ZW5zaW9uU2VydmljZS5nZXRBbGxDb2x1bW5zKCk7XG4gICAgICAvLyBjb25zdCBvcmlnaW5hbENvbHVtbnMgPSBjb2x1bW5EZWZpbml0aW9ucyB8fCB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucztcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9yaWdpbmFsQ29sdW1ucykgJiYgb3JpZ2luYWxDb2x1bW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gc2V0IHRoZSBncmlkIGNvbHVtbnMgdG8gaXQncyBvcmlnaW5hbCBjb2x1bW4gZGVmaW5pdGlvbnNcbiAgICAgICAgdGhpcy5fZ3JpZC5zZXRDb2x1bW5zKG9yaWdpbmFsQ29sdW1ucyk7XG4gICAgICAgIHRoaXMuX2RhdGFWaWV3LnJlZnJlc2goKTtcbiAgICAgICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xuICAgICAgICAgIHRoaXMuX2dyaWQuYXV0b3NpemVDb2x1bW5zKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLnJlc2V0Q29sdW1ucyhjb2x1bW5EZWZpbml0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmZpbHRlclNlcnZpY2UgJiYgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVycykge1xuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVycygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zb3J0U2VydmljZSAmJiB0aGlzLnNvcnRTZXJ2aWNlLmNsZWFyU29ydGluZykge1xuICAgICAgdGhpcy5zb3J0U2VydmljZS5jbGVhclNvcnRpbmcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIGl0ZW0gKGRhdGEgaXRlbSkgdG8gdGhlIGRhdGFncmlkLCBieSBkZWZhdWx0IGl0IHdpbGwgaGlnaGxpZ2h0IChmbGFzaGluZykgdGhlIGluc2VydGVkIHJvdyBidXQgd2UgY2FuIGRpc2FibGUgaXQgdG9vXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YUl0ZW06IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICogQHBhcmFtIHNob3VsZEhpZ2hsaWdodFJvdyBkbyB3ZSB3YW50IHRvIGhpZ2hsaWdodCB0aGUgcm93IGFmdGVyIGFkZGluZyBpdGVtXG4gICAqL1xuICBhZGRJdGVtVG9EYXRhZ3JpZChpdGVtOiBhbnksIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUpIHtcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgIXRoaXMuX2dyaWRPcHRpb25zIHx8ICF0aGlzLl9kYXRhVmlldykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCwgRGF0YVZpZXcgb2JqZWN0cycpO1xuICAgIH1cblxuICAgIGNvbnN0IHJvdyA9IDA7XG4gICAgdGhpcy5fZGF0YVZpZXcuaW5zZXJ0SXRlbShyb3csIGl0ZW0pO1xuICAgIHRoaXMuX2dyaWQuc2Nyb2xsUm93SW50b1ZpZXcoMCk7IC8vIHNjcm9sbCB0byByb3cgMFxuXG4gICAgLy8gaGlnaGxpZ2h0IHRoZSByb3cgd2UganVzdCBhZGRlZCwgaWYgZGVmaW5lZFxuICAgIGlmIChzaG91bGRIaWdobGlnaHRSb3cpIHtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KDAsIDE1MDApO1xuICAgIH1cblxuICAgIC8vIHJlZnJlc2ggZGF0YXZpZXcgJiBncmlkXG4gICAgdGhpcy5fZGF0YVZpZXcucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpdGVtIGFycmF5IChkYXRhIGl0ZW0pIHRvIHRoZSBkYXRhZ3JpZCwgYnkgZGVmYXVsdCBpdCB3aWxsIGhpZ2hsaWdodCAoZmxhc2hpbmcpIHRoZSBpbnNlcnRlZCByb3cgYnV0IHdlIGNhbiBkaXNhYmxlIGl0IHRvb1xuICAgKiBAcGFyYW0gZGF0YUl0ZW0gYXJyYXk6IGl0ZW0gb2JqZWN0IGhvbGRpbmcgYWxsIHByb3BlcnRpZXMgb2YgdGhhdCByb3dcbiAgICogQHBhcmFtIHNob3VsZEhpZ2hsaWdodFJvdyBkbyB3ZSB3YW50IHRvIGhpZ2hsaWdodCB0aGUgcm93IGFmdGVyIGFkZGluZyBpdGVtXG4gICAqL1xuICBhZGRJdGVtc1RvRGF0YWdyaWQoaXRlbXM6IGFueVtdLCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHRoaXMuYWRkSXRlbVRvRGF0YWdyaWQoaXRlbSwgc2hvdWxkSGlnaGxpZ2h0Um93KSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBleGlzdGluZyBpdGVtIGZyb20gdGhlIGRhdGFncmlkIChkYXRhVmlldylcbiAgICogQHBhcmFtIG9iamVjdCBpdGVtOiBpdGVtIG9iamVjdCBob2xkaW5nIGFsbCBwcm9wZXJ0aWVzIG9mIHRoYXQgcm93XG4gICAqL1xuICBkZWxldGVEYXRhR3JpZEl0ZW0oaXRlbTogYW55KSB7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGRlbGV0ZURhdGFHcmlkSXRlbSgpIHJlcXVpcmVzIGFuIGl0ZW0gb2JqZWN0IHdoaWNoIGluY2x1ZGVzIHRoZSBcImlkXCIgcHJvcGVydHlgKTtcbiAgICB9XG4gICAgY29uc3QgaXRlbUlkID0gKCFpdGVtIHx8ICFpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSA/IHVuZGVmaW5lZCA6IGl0ZW0uaWQ7XG4gICAgdGhpcy5kZWxldGVEYXRhR3JpZEl0ZW1CeUlkKGl0ZW1JZCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGFuIGV4aXN0aW5nIGl0ZW0gZnJvbSB0aGUgZGF0YWdyaWQgKGRhdGFWaWV3KSBieSBpdCdzIGlkXG4gICAqIEBwYXJhbSBpdGVtSWQ6IGl0ZW0gdW5pcXVlIGlkXG4gICAqL1xuICBkZWxldGVEYXRhR3JpZEl0ZW1CeUlkKGl0ZW1JZDogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgaWYgKGl0ZW1JZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBkZWxldGUgYSByb3cgd2l0aG91dCBhIHZhbGlkIFwiaWRcImApO1xuICAgIH1cblxuICAgIC8vIGRlbGV0ZSB0aGUgaXRlbSBmcm9tIHRoZSBkYXRhVmlld1xuICAgIHRoaXMuX2RhdGFWaWV3LmRlbGV0ZUl0ZW0oaXRlbUlkKTtcbiAgICB0aGlzLl9kYXRhVmlldy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGV4aXN0aW5nIGl0ZW0gd2l0aCBuZXcgcHJvcGVydGllcyBpbnNpZGUgdGhlIGRhdGFncmlkXG4gICAqIEBwYXJhbSBvYmplY3QgaXRlbTogaXRlbSBvYmplY3QgaG9sZGluZyBhbGwgcHJvcGVydGllcyBvZiB0aGF0IHJvd1xuICAgKiBAcmV0dXJuIGdyaWQgcm93IGluZGV4XG4gICAqL1xuICB1cGRhdGVEYXRhR3JpZEl0ZW0oaXRlbTogYW55LCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlKSB7XG4gICAgY29uc3QgaXRlbUlkID0gKCFpdGVtIHx8ICFpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSA/IHVuZGVmaW5lZCA6IGl0ZW0uaWQ7XG5cbiAgICBpZiAoaXRlbUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgdGhlIGl0ZW0gaW4gdGhlIGdyaWQgb3IgaXQncyBhc3NvY2lhdGVkIFwiaWRcImApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnVwZGF0ZURhdGFHcmlkSXRlbUJ5SWQoaXRlbUlkLCBpdGVtLCBzaG91bGRIaWdobGlnaHRSb3cpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbiBhcnJheSBvZiBleGlzdGluZyBpdGVtcyB3aXRoIG5ldyBwcm9wZXJ0aWVzIGluc2lkZSB0aGUgZGF0YWdyaWRcbiAgICogQHBhcmFtIG9iamVjdCBpdGVtOiBpdGVtIG9iamVjdCBob2xkaW5nIGFsbCBwcm9wZXJ0aWVzIG9mIHRoYXQgcm93XG4gICAqL1xuICB1cGRhdGVEYXRhR3JpZEl0ZW1zKGl0ZW1zOiBhbnlbXSwgc2hvdWxkSGlnaGxpZ2h0Um93ID0gdHJ1ZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGZ1bmN0aW9uIFwidXBkYXRlRGF0YUdyaWRJdGVtc1wiIG9ubHkgc3VwcG9ydCBhcnJheSBvZiBpdGVtcywgaWYgeW91IHdpc2ggdG8gb25seSB1cGRhdGUgMSBpdGVtIHRoZW4gdXNlIFwidXBkYXRlRGF0YUdyaWRJdGVtXCInKTtcbiAgICB9XG5cbiAgICBjb25zdCBncmlkSW5kZXhlczogbnVtYmVyW10gPSBbXTtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBncmlkSW5kZXhlcy5wdXNoKHRoaXMudXBkYXRlRGF0YUdyaWRJdGVtKGl0ZW0sIGZhbHNlKSk7XG4gICAgfSk7XG5cbiAgICAvLyBvbmx5IGhpZ2hsaWdodCBhdCB0aGUgZW5kLCBhbGwgYXQgb25jZVxuICAgIC8vIHdlIGhhdmUgdG8gZG8gdGhpcyBiZWNhdXNlIGRvaW5nIGhpZ2hsaWdodCAxIGJ5IDEgd291bGQgb25seSByZS1zZWxlY3QgdGhlIGxhc3QgaGlnaGxpZ2h0ZWQgcm93IHdoaWNoIGlzIHdyb25nIGJlaGF2aW9yXG4gICAgaWYgKHNob3VsZEhpZ2hsaWdodFJvdykge1xuICAgICAgdGhpcy5oaWdobGlnaHRSb3coZ3JpZEluZGV4ZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbSBpbiB0aGUgZGF0YWdyaWQgYnkgaXQncyBpZCBhbmQgbmV3IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIGl0ZW1JZDogaXRlbSB1bmlxdWUgaWRcbiAgICogQHBhcmFtIG9iamVjdCBpdGVtOiBpdGVtIG9iamVjdCBob2xkaW5nIGFsbCBwcm9wZXJ0aWVzIG9mIHRoYXQgcm93XG4gICAqIEBwYXJhbSBzaG91bGRIaWdobGlnaHRSb3cgZG8gd2Ugd2FudCB0byBoaWdobGlnaHQgdGhlIHJvdyBhZnRlciB1cGRhdGVcbiAgICogQHJldHVybiBncmlkIHJvdyBpbmRleFxuICAgKi9cbiAgdXBkYXRlRGF0YUdyaWRJdGVtQnlJZChpdGVtSWQ6IG51bWJlciB8IHN0cmluZywgaXRlbTogYW55LCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlKSB7XG4gICAgaWYgKGl0ZW1JZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCB1cGRhdGUgYSByb3cgd2l0aG91dCBhIHZhbGlkIFwiaWRcImApO1xuICAgIH1cbiAgICBjb25zdCByb3cgPSB0aGlzLl9kYXRhVmlldy5nZXRSb3dCeUlkKGl0ZW1JZCk7XG5cbiAgICBpZiAoIWl0ZW0gfHwgcm93ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgdGhlIGl0ZW0gaW4gdGhlIGdyaWQgb3IgaXQncyBhc3NvY2lhdGVkIFwiaWRcImApO1xuICAgIH1cblxuICAgIGNvbnN0IGdyaWRJZHggPSB0aGlzLl9kYXRhVmlldy5nZXRJZHhCeUlkKGl0ZW1JZCk7XG4gICAgaWYgKGdyaWRJZHggIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gVXBkYXRlIHRoZSBpdGVtIGl0c2VsZiBpbnNpZGUgdGhlIGRhdGFWaWV3XG4gICAgICB0aGlzLl9kYXRhVmlldy51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XG5cbiAgICAgIC8vIGhpZ2hsaWdodCB0aGUgcm93IHdlIGp1c3QgdXBkYXRlZCwgaWYgZGVmaW5lZFxuICAgICAgaWYgKHNob3VsZEhpZ2hsaWdodFJvdykge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodFJvdyhyb3csIDE1MDApO1xuICAgICAgfVxuXG4gICAgICAvLyByZWZyZXNoIGRhdGF2aWV3ICYgZ3JpZFxuICAgICAgdGhpcy5fZGF0YVZpZXcucmVmcmVzaCgpO1xuXG4gICAgICByZXR1cm4gZ3JpZElkeDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==