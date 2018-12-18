/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName, } from '../models/index';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { ExtensionUtility } from './extensionUtility';
export class HeaderMenuExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     * @param {?} sortService
     * @param {?} translate
     */
    constructor(extensionUtility, sharedService, sortService, translate) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.headerMenu);
            this.sharedService.gridOptions.headerMenu = Object.assign({}, this.getDefaultHeaderMenuOptions(), this.sharedService.gridOptions.headerMenu);
            if (this.sharedService.gridOptions.enableHeaderMenu) {
                this.sharedService.gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this.sharedService.gridOptions, this.sharedService.columnDefinitions);
            }
            this._extension = new Slick.Plugins.HeaderMenu(this.sharedService.gridOptions.headerMenu);
            this.sharedService.grid.registerPlugin(this._extension);
            this._eventHandler.subscribe(this._extension.onCommand, (e, args) => {
                this.executeHeaderMenuInternalCommands(e, args);
                if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
                    this.sharedService.gridOptions.headerMenu.onCommand(e, args);
                }
            });
            this._eventHandler.subscribe(this._extension.onBeforeMenuShow, (e, args) => {
                if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                    this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
                }
            });
            return this._extension;
        }
        return null;
    }
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @private
     * @param {?} options
     * @param {?} columnDefinitions
     * @return {?} header menu
     */
    addHeaderMenuCustomCommands(options, columnDefinitions) {
        /** @type {?} */
        const headerMenuOptions = options.headerMenu || {};
        if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
            columnDefinitions.forEach((columnDef) => {
                if (columnDef && !columnDef.excludeFromHeaderMenu) {
                    if (!columnDef.header || !columnDef.header.menu) {
                        columnDef.header = {
                            menu: {
                                items: []
                            }
                        };
                    }
                    /** @type {?} */
                    const columnHeaderMenuItems = columnDef && columnDef.header && columnDef.header.menu && columnDef.header.menu.items || [];
                    // Sorting Commands
                    if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
                        if (columnHeaderMenuItems.filter((item) => item.command === 'sort-asc').length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                                title: options.enableTranslate ? this.translate.instant('SORT_ASCENDING') : Constants.TEXT_SORT_ASCENDING,
                                command: 'sort-asc',
                                positionOrder: 50
                            });
                        }
                        if (columnHeaderMenuItems.filter((item) => item.command === 'sort-desc').length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                                title: options.enableTranslate ? this.translate.instant('SORT_DESCENDING') : Constants.TEXT_SORT_DESCENDING,
                                command: 'sort-desc',
                                positionOrder: 51
                            });
                        }
                    }
                    // Hide Column Command
                    if (headerMenuOptions && !headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter((item) => item.command === 'hide').length === 0) {
                        columnHeaderMenuItems.push({
                            iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
                            title: options.enableTranslate ? this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
                            command: 'hide',
                            positionOrder: 52
                        });
                    }
                    this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                    // sort the custom items by their position in the list
                    columnHeaderMenuItems.sort((itemA, itemB) => {
                        if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
                            return itemA.positionOrder - itemB.positionOrder;
                        }
                        return 0;
                    });
                }
            });
        }
        return headerMenuOptions;
    }
    /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    executeHeaderMenuInternalCommands(e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'hide':
                    this.hideColumn(args.column);
                    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                        this.sharedService.grid.autosizeColumns();
                    }
                    break;
                case 'sort-asc':
                case 'sort-desc':
                    // get previously sorted columns
                    /** @type {?} */
                    const cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
                    // add to the column array, the column sorted by the header menu
                    cols.push({ sortCol: args.column, sortAsc: (args.command === 'sort-asc') });
                    if (this.sharedService.gridOptions.backendServiceApi) {
                        this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid: this.sharedService.grid });
                    }
                    else if (this.sharedService.dataView) {
                        this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, cols);
                    }
                    else {
                        // when using customDataView, we will simply send it as a onSort event with notify
                        /** @type {?} */
                        const isMultiSort = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                        /** @type {?} */
                        const sortOutput = isMultiSort ? cols : cols[0];
                        args.grid.onSort.notify(sortOutput);
                    }
                    // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                    /** @type {?} */
                    const newSortColumns = cols.map((col) => {
                        return {
                            columnId: col && col.sortCol && col.sortCol.id,
                            sortAsc: col && col.sortAsc
                        };
                    });
                    this.sharedService.grid.setSortColumns(newSortColumns); // add sort icon in UI
                    break;
                default:
                    break;
            }
        }
    }
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    hideColumn(column) {
        if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            /** @type {?} */
            const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    }
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param {?} columnDefinitions
     * @return {?}
     */
    resetHeaderMenuTranslations(columnDefinitions) {
        columnDefinitions.forEach((columnDef) => {
            if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
                if (!columnDef.excludeFromHeaderMenu) {
                    /** @type {?} */
                    const columnHeaderMenuItems = columnDef.header.menu.items || [];
                    columnHeaderMenuItems.forEach((item) => {
                        switch (item.command) {
                            case 'sort-asc':
                                item.title = this.translate.instant('SORT_ASCENDING') || Constants.TEXT_SORT_ASCENDING;
                                break;
                            case 'sort-desc':
                                item.title = this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                                break;
                            case 'hide':
                                item.title = this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                                break;
                        }
                        // re-translate if there's a "titleKey"
                        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate) {
                            this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                        }
                    });
                }
            }
        });
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    translateHeaderMenu() {
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
            this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
        }
    }
    /**
     * @private
     * @return {?} default Header Menu options
     */
    getDefaultHeaderMenuOptions() {
        return {
            autoAlignOffset: 12,
            minWidth: 140,
            hideColumnHideCommand: false,
            hideSortCommands: false,
            title: ''
        };
    }
}
HeaderMenuExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HeaderMenuExtension.ctorParameters = () => [
    { type: ExtensionUtility },
    { type: SharedService },
    { type: SortService },
    { type: TranslateService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype.sharedService;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype.sortService;
    /**
     * @type {?}
     * @private
     */
    HeaderMenuExtension.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyTWVudUV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9oZWFkZXJNZW51RXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUlMLGFBQWEsR0FNZCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFNdEQsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7OztJQUk5QixZQUNVLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixXQUF3QixFQUN4QixTQUEyQjtRQUgzQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBUDdCLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFRbEQsQ0FBQzs7OztJQUVMLE9BQU87UUFDTCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFP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K0NBQTBDOzs7OztJQUMxQyw0Q0FBb0M7Ozs7O0lBQ3BDLDBDQUFnQzs7Ozs7SUFDaEMsd0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIENvbHVtbixcbiAgQ29sdW1uU29ydCxcbiAgRXh0ZW5zaW9uLFxuICBFeHRlbnNpb25OYW1lLFxuICBHcmlkT3B0aW9uLFxuICBIZWFkZXJNZW51LFxuICBIZWFkZXJNZW51SXRlbSxcbiAgSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MsXG4gIEhlYWRlck1lbnVPbkJlZm9yZU1lbnVTaG93QXJncyxcbn0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc29ydC5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XG5pbXBvcnQgeyBFeHRlbnNpb25VdGlsaXR5IH0gZnJvbSAnLi9leHRlbnNpb25VdGlsaXR5JztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhlYWRlck1lbnVFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IGFueSA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LFxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcbiAgICBwcml2YXRlIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZSxcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcbiAgKSB7IH1cblxuICBkaXNwb3NlKCkge1xuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XG4gICAgaWYgKHRoaXMuX2V4dGVuc2lvbiAmJiB0aGlzLl9leHRlbnNpb24uZGVzdHJveSkge1xuICAgICAgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBDcmVhdGUgdGhlIEhlYWRlciBNZW51IGFuZCBleHBvc2UgYWxsIHRoZSBhdmFpbGFibGUgaG9va3MgdGhhdCB1c2VyIGNhbiBzdWJzY3JpYmUgKG9uQ29tbWFuZCwgb25CZWZvcmVNZW51U2hvdywgLi4uKVxuICAqIEBwYXJhbSBncmlkXG4gICogQHBhcmFtIGRhdGFWaWV3XG4gICogQHBhcmFtIGNvbHVtbkRlZmluaXRpb25zXG4gICovXG4gIHJlZ2lzdGVyKCk6IGFueSB7XG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpIHtcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLmhlYWRlck1lbnUpO1xuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUgPSB7IC4uLnRoaXMuZ2V0RGVmYXVsdEhlYWRlck1lbnVPcHRpb25zKCksIC4uLnRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51IH07XG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlck1lbnUpIHtcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUgPSB0aGlzLmFkZEhlYWRlck1lbnVDdXN0b21Db21tYW5kcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMsIHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5QbHVnaW5zLkhlYWRlck1lbnUodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUpO1xuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5fZXh0ZW5zaW9uKTtcbiAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQ29tbWFuZCwgKGU6IGFueSwgYXJnczogSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MpID0+IHtcbiAgICAgICAgdGhpcy5leGVjdXRlSGVhZGVyTWVudUludGVybmFsQ29tbWFuZHMoZSwgYXJncyk7XG4gICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25Db21tYW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25Db21tYW5kKGUsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25CZWZvcmVNZW51U2hvdywgKGU6IGFueSwgYXJnczogSGVhZGVyTWVudU9uQmVmb3JlTWVudVNob3dBcmdzKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25CZWZvcmVNZW51U2hvdyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uQmVmb3JlTWVudVNob3coZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gLyoqXG4gICogQ3JlYXRlIEhlYWRlciBNZW51IHdpdGggQ3VzdG9tIENvbW1hbmRzIGlmIHVzZXIgaGFzIGVuYWJsZWQgSGVhZGVyIE1lbnVcbiAgKiBAcGFyYW0gb3B0aW9uc1xuICAqIEBwYXJhbSBjb2x1bW5EZWZpbml0aW9uc1xuICAqIEByZXR1cm4gaGVhZGVyIG1lbnVcbiAgKi9cbiAgcHJpdmF0ZSBhZGRIZWFkZXJNZW51Q3VzdG9tQ29tbWFuZHMob3B0aW9uczogR3JpZE9wdGlvbiwgY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdKTogSGVhZGVyTWVudSB7XG4gICAgY29uc3QgaGVhZGVyTWVudU9wdGlvbnMgPSBvcHRpb25zLmhlYWRlck1lbnUgfHwge307XG5cbiAgICBpZiAoY29sdW1uRGVmaW5pdGlvbnMgJiYgQXJyYXkuaXNBcnJheShjb2x1bW5EZWZpbml0aW9ucykgJiYgb3B0aW9ucy5lbmFibGVIZWFkZXJNZW51KSB7XG4gICAgICBjb2x1bW5EZWZpbml0aW9ucy5mb3JFYWNoKChjb2x1bW5EZWY6IENvbHVtbikgPT4ge1xuICAgICAgICBpZiAoY29sdW1uRGVmICYmICFjb2x1bW5EZWYuZXhjbHVkZUZyb21IZWFkZXJNZW51KSB7XG4gICAgICAgICAgaWYgKCFjb2x1bW5EZWYuaGVhZGVyIHx8ICFjb2x1bW5EZWYuaGVhZGVyLm1lbnUpIHtcbiAgICAgICAgICAgIGNvbHVtbkRlZi5oZWFkZXIgPSB7XG4gICAgICAgICAgICAgIG1lbnU6IHtcbiAgICAgICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjb2x1bW5IZWFkZXJNZW51SXRlbXM6IEhlYWRlck1lbnVJdGVtW10gPSBjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmhlYWRlciAmJiBjb2x1bW5EZWYuaGVhZGVyLm1lbnUgJiYgY29sdW1uRGVmLmhlYWRlci5tZW51Lml0ZW1zIHx8IFtdO1xuXG4gICAgICAgICAgLy8gU29ydGluZyBDb21tYW5kc1xuICAgICAgICAgIGlmIChvcHRpb25zLmVuYWJsZVNvcnRpbmcgJiYgY29sdW1uRGVmLnNvcnRhYmxlICYmIGhlYWRlck1lbnVPcHRpb25zICYmICFoZWFkZXJNZW51T3B0aW9ucy5oaWRlU29ydENvbW1hbmRzKSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZpbHRlcigoaXRlbTogSGVhZGVyTWVudUl0ZW0pID0+IGl0ZW0uY29tbWFuZCA9PT0gJ3NvcnQtYXNjJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IGhlYWRlck1lbnVPcHRpb25zLmljb25Tb3J0QXNjQ29tbWFuZCB8fCAnZmEgZmEtc29ydC1hc2MnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBvcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1NPUlRfQVNDRU5ESU5HJykgOiBDb25zdGFudHMuVEVYVF9TT1JUX0FTQ0VORElORyxcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnc29ydC1hc2MnLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUwXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbHVtbkhlYWRlck1lbnVJdGVtcy5maWx0ZXIoKGl0ZW06IEhlYWRlck1lbnVJdGVtKSA9PiBpdGVtLmNvbW1hbmQgPT09ICdzb3J0LWRlc2MnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIGljb25Dc3NDbGFzczogaGVhZGVyTWVudU9wdGlvbnMuaWNvblNvcnREZXNjQ29tbWFuZCB8fCAnZmEgZmEtc29ydC1kZXNjJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogb3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTT1JUX0RFU0NFTkRJTkcnKSA6IENvbnN0YW50cy5URVhUX1NPUlRfREVTQ0VORElORyxcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnc29ydC1kZXNjJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBIaWRlIENvbHVtbiBDb21tYW5kXG4gICAgICAgICAgaWYgKGhlYWRlck1lbnVPcHRpb25zICYmICFoZWFkZXJNZW51T3B0aW9ucy5oaWRlQ29sdW1uSGlkZUNvbW1hbmQgJiYgY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZpbHRlcigoaXRlbTogSGVhZGVyTWVudUl0ZW0pID0+IGl0ZW0uY29tbWFuZCA9PT0gJ2hpZGUnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBoZWFkZXJNZW51T3B0aW9ucy5pY29uQ29sdW1uSGlkZUNvbW1hbmQgfHwgJ2ZhIGZhLXRpbWVzJyxcbiAgICAgICAgICAgICAgdGl0bGU6IG9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnSElERV9DT0xVTU4nKSA6IENvbnN0YW50cy5URVhUX0hJREVfQ09MVU1OLFxuICAgICAgICAgICAgICBjb21tYW5kOiAnaGlkZScsXG4gICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXMoY29sdW1uSGVhZGVyTWVudUl0ZW1zLCAndGl0bGVLZXknLCAndGl0bGUnKTtcbiAgICAgICAgICAvLyBzb3J0IHRoZSBjdXN0b20gaXRlbXMgYnkgdGhlaXIgcG9zaXRpb24gaW4gdGhlIGxpc3RcbiAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMuc29ydCgoaXRlbUE6IGFueSwgaXRlbUI6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW1BICYmIGl0ZW1CICYmIGl0ZW1BLmhhc093blByb3BlcnR5KCdwb3NpdGlvbk9yZGVyJykgJiYgaXRlbUIuaGFzT3duUHJvcGVydHkoJ3Bvc2l0aW9uT3JkZXInKSkge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbUEucG9zaXRpb25PcmRlciAtIGl0ZW1CLnBvc2l0aW9uT3JkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJNZW51T3B0aW9ucztcbiAgfVxuXG4gIC8qKiBFeGVjdXRlIHRoZSBIZWFkZXIgTWVudSBDb21tYW5kcyB0aGF0IHdhcyB0cmlnZ2VyZWQgYnkgdGhlIG9uQ29tbWFuZCBzdWJzY3JpYmUgKi9cbiAgZXhlY3V0ZUhlYWRlck1lbnVJbnRlcm5hbENvbW1hbmRzKGU6IEV2ZW50LCBhcmdzOiBIZWFkZXJNZW51T25Db21tYW5kQXJncykge1xuICAgIGlmIChhcmdzICYmIGFyZ3MuY29tbWFuZCkge1xuICAgICAgc3dpdGNoIChhcmdzLmNvbW1hbmQpIHtcbiAgICAgICAgY2FzZSAnaGlkZSc6XG4gICAgICAgICAgdGhpcy5oaWRlQ29sdW1uKGFyZ3MuY29sdW1uKTtcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc29ydC1hc2MnOlxuICAgICAgICBjYXNlICdzb3J0LWRlc2MnOlxuICAgICAgICAgIC8vIGdldCBwcmV2aW91c2x5IHNvcnRlZCBjb2x1bW5zXG4gICAgICAgICAgY29uc3QgY29sczogQ29sdW1uU29ydFtdID0gdGhpcy5zb3J0U2VydmljZS5nZXRQcmV2aW91c0NvbHVtblNvcnRzKGFyZ3MuY29sdW1uLmlkICsgJycpO1xuXG4gICAgICAgICAgLy8gYWRkIHRvIHRoZSBjb2x1bW4gYXJyYXksIHRoZSBjb2x1bW4gc29ydGVkIGJ5IHRoZSBoZWFkZXIgbWVudVxuICAgICAgICAgIGNvbHMucHVzaCh7IHNvcnRDb2w6IGFyZ3MuY29sdW1uLCBzb3J0QXNjOiAoYXJncy5jb21tYW5kID09PSAnc29ydC1hc2MnKSB9KTtcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uQmFja2VuZFNvcnRDaGFuZ2VkKGUsIHsgbXVsdGlDb2x1bW5Tb3J0OiB0cnVlLCBzb3J0Q29sczogY29scywgZ3JpZDogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Mb2NhbFNvcnRDaGFuZ2VkKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLCB0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcsIGNvbHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3aGVuIHVzaW5nIGN1c3RvbURhdGFWaWV3LCB3ZSB3aWxsIHNpbXBseSBzZW5kIGl0IGFzIGEgb25Tb3J0IGV2ZW50IHdpdGggbm90aWZ5XG4gICAgICAgICAgICBjb25zdCBpc011bHRpU29ydCA9IHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLm11bHRpQ29sdW1uU29ydCB8fCBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IHNvcnRPdXRwdXQgPSBpc011bHRpU29ydCA/IGNvbHMgOiBjb2xzWzBdO1xuICAgICAgICAgICAgYXJncy5ncmlkLm9uU29ydC5ub3RpZnkoc29ydE91dHB1dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9iaiBzb3J0Q29sdW1ucyBhcnJheSB3aGljaCB3aWxsIGF0IHRoZSBzYW1lIGFkZCB0aGUgdmlzdWFsIHNvcnQgaWNvbihzKSBvbiB0aGUgVUlcbiAgICAgICAgICBjb25zdCBuZXdTb3J0Q29sdW1uczogQ29sdW1uU29ydFtdID0gY29scy5tYXAoKGNvbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sdW1uSWQ6IGNvbCAmJiBjb2wuc29ydENvbCAmJiBjb2wuc29ydENvbC5pZCxcbiAgICAgICAgICAgICAgc29ydEFzYzogY29sICYmIGNvbC5zb3J0QXNjXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNvcnRDb2x1bW5zKG5ld1NvcnRDb2x1bW5zKTsgLy8gYWRkIHNvcnQgaWNvbiBpbiBVSVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBIaWRlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgKi9cbiAgaGlkZUNvbHVtbihjb2x1bW46IENvbHVtbikge1xuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnMpIHtcbiAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1uSW5kZXgoY29sdW1uLmlkKTtcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5hcnJheVJlbW92ZUl0ZW1CeUluZGV4KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMoKSwgY29sdW1uSW5kZXgpO1xuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucyh0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBhbGwgdGhlIEdyaWQgTWVudSBvcHRpb25zIHdoaWNoIGhhdmUgdGV4dCB0byB0cmFuc2xhdGVcbiAgICogQHBhcmFtIGdyaWQgbWVudSBvYmplY3RcbiAgICovXG4gIHJlc2V0SGVhZGVyTWVudVRyYW5zbGF0aW9ucyhjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10pIHtcbiAgICBjb2x1bW5EZWZpbml0aW9ucy5mb3JFYWNoKChjb2x1bW5EZWY6IENvbHVtbikgPT4ge1xuICAgICAgaWYgKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYuaGVhZGVyICYmIGNvbHVtbkRlZi5oZWFkZXIgJiYgY29sdW1uRGVmLmhlYWRlci5tZW51ICYmIGNvbHVtbkRlZi5oZWFkZXIubWVudS5pdGVtcykge1xuICAgICAgICBpZiAoIWNvbHVtbkRlZi5leGNsdWRlRnJvbUhlYWRlck1lbnUpIHtcbiAgICAgICAgICBjb25zdCBjb2x1bW5IZWFkZXJNZW51SXRlbXM6IEhlYWRlck1lbnVJdGVtW10gPSBjb2x1bW5EZWYuaGVhZGVyLm1lbnUuaXRlbXMgfHwgW107XG4gICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ3NvcnQtYXNjJzpcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU09SVF9BU0NFTkRJTkcnKSB8fCBDb25zdGFudHMuVEVYVF9TT1JUX0FTQ0VORElORztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnc29ydC1kZXNjJzpcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU09SVF9ERVNDRU5ESU5HJykgfHwgQ29uc3RhbnRzLlRFWFRfU09SVF9ERVNDRU5ESU5HO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdoaWRlJzpcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnSElERV9DT0xVTU4nKSB8fCBDb25zdGFudHMuVEVYVF9ISURFX0NPTFVNTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmUtdHJhbnNsYXRlIGlmIHRoZXJlJ3MgYSBcInRpdGxlS2V5XCJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXMoY29sdW1uSGVhZGVyTWVudUl0ZW1zLCAndGl0bGVLZXknLCAndGl0bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSB0aGUgSGVhZGVyIE1lbnUgdGl0bGVzLCB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uIGRlZmluaXRpb24gdG8gcmUtdHJhbnNsYXRlIHRoZW1cbiAgICovXG4gIHRyYW5zbGF0ZUhlYWRlck1lbnUoKSB7XG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5yZXNldEhlYWRlck1lbnVUcmFuc2xhdGlvbnModGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiBkZWZhdWx0IEhlYWRlciBNZW51IG9wdGlvbnNcbiAgICovXG4gIHByaXZhdGUgZ2V0RGVmYXVsdEhlYWRlck1lbnVPcHRpb25zKCk6IEhlYWRlck1lbnUge1xuICAgIHJldHVybiB7XG4gICAgICBhdXRvQWxpZ25PZmZzZXQ6IDEyLFxuICAgICAgbWluV2lkdGg6IDE0MCxcbiAgICAgIGhpZGVDb2x1bW5IaWRlQ29tbWFuZDogZmFsc2UsXG4gICAgICBoaWRlU29ydENvbW1hbmRzOiBmYWxzZSxcbiAgICAgIHRpdGxlOiAnJ1xuICAgIH07XG4gIH1cbn1cbiJdfQ==