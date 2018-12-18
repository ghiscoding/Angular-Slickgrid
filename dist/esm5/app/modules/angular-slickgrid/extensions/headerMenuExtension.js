/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName, } from '../models/index';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { ExtensionUtility } from './extensionUtility';
var HeaderMenuExtension = /** @class */ (function () {
    function HeaderMenuExtension(extensionUtility, sharedService, sortService, translate) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    HeaderMenuExtension.prototype.dispose = /**
     * @return {?}
     */
    function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    };
    /**
    * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
    * @param grid
    * @param dataView
    * @param columnDefinitions
    */
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    HeaderMenuExtension.prototype.register = /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.headerMenu);
            this.sharedService.gridOptions.headerMenu = tslib_1.__assign({}, this.getDefaultHeaderMenuOptions(), this.sharedService.gridOptions.headerMenu);
            if (this.sharedService.gridOptions.enableHeaderMenu) {
                this.sharedService.gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this.sharedService.gridOptions, this.sharedService.columnDefinitions);
            }
            this._extension = new Slick.Plugins.HeaderMenu(this.sharedService.gridOptions.headerMenu);
            this.sharedService.grid.registerPlugin(this._extension);
            this._eventHandler.subscribe(this._extension.onCommand, function (e, args) {
                _this.executeHeaderMenuInternalCommands(e, args);
                if (_this.sharedService.gridOptions.headerMenu && typeof _this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
                    _this.sharedService.gridOptions.headerMenu.onCommand(e, args);
                }
            });
            this._eventHandler.subscribe(this._extension.onBeforeMenuShow, function (e, args) {
                if (_this.sharedService.gridOptions.headerMenu && typeof _this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                    _this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
                }
            });
            return this._extension;
        }
        return null;
    };
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @param options
     * @param columnDefinitions
     * @return header menu
     */
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @private
     * @param {?} options
     * @param {?} columnDefinitions
     * @return {?} header menu
     */
    HeaderMenuExtension.prototype.addHeaderMenuCustomCommands = /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @private
     * @param {?} options
     * @param {?} columnDefinitions
     * @return {?} header menu
     */
    function (options, columnDefinitions) {
        var _this = this;
        /** @type {?} */
        var headerMenuOptions = options.headerMenu || {};
        if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
            columnDefinitions.forEach(function (columnDef) {
                if (columnDef && !columnDef.excludeFromHeaderMenu) {
                    if (!columnDef.header || !columnDef.header.menu) {
                        columnDef.header = {
                            menu: {
                                items: []
                            }
                        };
                    }
                    /** @type {?} */
                    var columnHeaderMenuItems = columnDef && columnDef.header && columnDef.header.menu && columnDef.header.menu.items || [];
                    // Sorting Commands
                    if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
                        if (columnHeaderMenuItems.filter(function (item) { return item.command === 'sort-asc'; }).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                                title: options.enableTranslate ? _this.translate.instant('SORT_ASCENDING') : Constants.TEXT_SORT_ASCENDING,
                                command: 'sort-asc',
                                positionOrder: 50
                            });
                        }
                        if (columnHeaderMenuItems.filter(function (item) { return item.command === 'sort-desc'; }).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                                title: options.enableTranslate ? _this.translate.instant('SORT_DESCENDING') : Constants.TEXT_SORT_DESCENDING,
                                command: 'sort-desc',
                                positionOrder: 51
                            });
                        }
                    }
                    // Hide Column Command
                    if (headerMenuOptions && !headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter(function (item) { return item.command === 'hide'; }).length === 0) {
                        columnHeaderMenuItems.push({
                            iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
                            title: options.enableTranslate ? _this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
                            command: 'hide',
                            positionOrder: 52
                        });
                    }
                    _this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                    // sort the custom items by their position in the list
                    columnHeaderMenuItems.sort(function (itemA, itemB) {
                        if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
                            return itemA.positionOrder - itemB.positionOrder;
                        }
                        return 0;
                    });
                }
            });
        }
        return headerMenuOptions;
    };
    /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
    /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    HeaderMenuExtension.prototype.executeHeaderMenuInternalCommands = /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    function (e, args) {
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
                    var cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
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
                        var isMultiSort = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                        /** @type {?} */
                        var sortOutput = isMultiSort ? cols : cols[0];
                        args.grid.onSort.notify(sortOutput);
                    }
                    // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                    /** @type {?} */
                    var newSortColumns = cols.map(function (col) {
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
    };
    /** Hide a column from the grid */
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    HeaderMenuExtension.prototype.hideColumn = /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            /** @type {?} */
            var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    };
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param grid menu object
     */
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param {?} columnDefinitions
     * @return {?}
     */
    HeaderMenuExtension.prototype.resetHeaderMenuTranslations = /**
     * Reset all the Grid Menu options which have text to translate
     * @param {?} columnDefinitions
     * @return {?}
     */
    function (columnDefinitions) {
        var _this = this;
        columnDefinitions.forEach(function (columnDef) {
            if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
                if (!columnDef.excludeFromHeaderMenu) {
                    /** @type {?} */
                    var columnHeaderMenuItems_1 = columnDef.header.menu.items || [];
                    columnHeaderMenuItems_1.forEach(function (item) {
                        switch (item.command) {
                            case 'sort-asc':
                                item.title = _this.translate.instant('SORT_ASCENDING') || Constants.TEXT_SORT_ASCENDING;
                                break;
                            case 'sort-desc':
                                item.title = _this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                                break;
                            case 'hide':
                                item.title = _this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                                break;
                        }
                        // re-translate if there's a "titleKey"
                        if (_this.sharedService.gridOptions && _this.sharedService.gridOptions.enableTranslate) {
                            _this.extensionUtility.translateItems(columnHeaderMenuItems_1, 'titleKey', 'title');
                        }
                    });
                }
            }
        });
    };
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    HeaderMenuExtension.prototype.translateHeaderMenu = /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    function () {
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
            this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
        }
    };
    /**
     * @return default Header Menu options
     */
    /**
     * @private
     * @return {?} default Header Menu options
     */
    HeaderMenuExtension.prototype.getDefaultHeaderMenuOptions = /**
     * @private
     * @return {?} default Header Menu options
     */
    function () {
        return {
            autoAlignOffset: 12,
            minWidth: 140,
            hideColumnHideCommand: false,
            hideSortCommands: false,
            title: ''
        };
    };
    HeaderMenuExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HeaderMenuExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService },
        { type: SortService },
        { type: TranslateService }
    ]; };
    return HeaderMenuExtension;
}());
export { HeaderMenuExtension };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyTWVudUV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9oZWFkZXJNZW51RXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFJTCxhQUFhLEdBTWQsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBS3REO0lBS0UsNkJBQ1UsZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLFNBQTJCO1FBSDNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFQN0Isa0JBQWEsR0FBUSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQVFsRCxDQUFDOzs7O0lBRUwscUNBQU87OztJQUFQO1FBQ0UsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDcEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FD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RSxFQUFFO1NBQ1YsQ0FBQztJQUNKLENBQUM7O2dCQWpPRixVQUFVOzs7O2dCQUxGLGdCQUFnQjtnQkFEaEIsYUFBYTtnQkFEYixXQUFXO2dCQWJYLGdCQUFnQjs7SUFzUHpCLDBCQUFDO0NBQUEsQUFsT0QsSUFrT0M7U0FqT1ksbUJBQW1COzs7Ozs7SUFDOUIsNENBQXNEOzs7OztJQUN0RCx5Q0FBd0I7Ozs7O0lBR3RCLCtDQUEwQzs7Ozs7SUFDMUMsNENBQW9DOzs7OztJQUNwQywwQ0FBZ0M7Ozs7O0lBQ2hDLHdDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQge1xuICBDb2x1bW4sXG4gIENvbHVtblNvcnQsXG4gIEV4dGVuc2lvbixcbiAgRXh0ZW5zaW9uTmFtZSxcbiAgR3JpZE9wdGlvbixcbiAgSGVhZGVyTWVudSxcbiAgSGVhZGVyTWVudUl0ZW0sXG4gIEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzLFxuICBIZWFkZXJNZW51T25CZWZvcmVNZW51U2hvd0FyZ3MsXG59IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWFkZXJNZW51RXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XG4gIHByaXZhdGUgX2V4dGVuc2lvbjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSxcbiAgICBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzb3J0U2VydmljZTogU29ydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXG4gICkgeyB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xuICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogQ3JlYXRlIHRoZSBIZWFkZXIgTWVudSBhbmQgZXhwb3NlIGFsbCB0aGUgYXZhaWxhYmxlIGhvb2tzIHRoYXQgdXNlciBjYW4gc3Vic2NyaWJlIChvbkNvbW1hbmQsIG9uQmVmb3JlTWVudVNob3csIC4uLilcbiAgKiBAcGFyYW0gZ3JpZFxuICAqIEBwYXJhbSBkYXRhVmlld1xuICAqIEBwYXJhbSBjb2x1bW5EZWZpbml0aW9uc1xuICAqL1xuICByZWdpc3RlcigpOiBhbnkge1xuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gd2l0aCByZXF1aXJlSlNcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5oZWFkZXJNZW51KTtcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51ID0geyAuLi50aGlzLmdldERlZmF1bHRIZWFkZXJNZW51T3B0aW9ucygpLCAuLi50aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSB9O1xuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVIZWFkZXJNZW51KSB7XG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51ID0gdGhpcy5hZGRIZWFkZXJNZW51Q3VzdG9tQ29tbWFuZHModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLCB0aGlzLnNoYXJlZFNlcnZpY2UuY29sdW1uRGVmaW5pdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9leHRlbnNpb24gPSBuZXcgU2xpY2suUGx1Z2lucy5IZWFkZXJNZW51KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51KTtcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2V4dGVuc2lvbik7XG4gICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkNvbW1hbmQsIChlOiBhbnksIGFyZ3M6IEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzKSA9PiB7XG4gICAgICAgIHRoaXMuZXhlY3V0ZUhlYWRlck1lbnVJbnRlcm5hbENvbW1hbmRzKGUsIGFyZ3MpO1xuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uQ29tbWFuZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uQ29tbWFuZChlLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQmVmb3JlTWVudVNob3csIChlOiBhbnksIGFyZ3M6IEhlYWRlck1lbnVPbkJlZm9yZU1lbnVTaG93QXJncykgPT4ge1xuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uQmVmb3JlTWVudVNob3cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudS5vbkJlZm9yZU1lbnVTaG93KGUsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuIC8qKlxuICAqIENyZWF0ZSBIZWFkZXIgTWVudSB3aXRoIEN1c3RvbSBDb21tYW5kcyBpZiB1c2VyIGhhcyBlbmFibGVkIEhlYWRlciBNZW51XG4gICogQHBhcmFtIG9wdGlvbnNcbiAgKiBAcGFyYW0gY29sdW1uRGVmaW5pdGlvbnNcbiAgKiBAcmV0dXJuIGhlYWRlciBtZW51XG4gICovXG4gIHByaXZhdGUgYWRkSGVhZGVyTWVudUN1c3RvbUNvbW1hbmRzKG9wdGlvbnM6IEdyaWRPcHRpb24sIGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSk6IEhlYWRlck1lbnUge1xuICAgIGNvbnN0IGhlYWRlck1lbnVPcHRpb25zID0gb3B0aW9ucy5oZWFkZXJNZW51IHx8IHt9O1xuXG4gICAgaWYgKGNvbHVtbkRlZmluaXRpb25zICYmIEFycmF5LmlzQXJyYXkoY29sdW1uRGVmaW5pdGlvbnMpICYmIG9wdGlvbnMuZW5hYmxlSGVhZGVyTWVudSkge1xuICAgICAgY29sdW1uRGVmaW5pdGlvbnMuZm9yRWFjaCgoY29sdW1uRGVmOiBDb2x1bW4pID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbkRlZiAmJiAhY29sdW1uRGVmLmV4Y2x1ZGVGcm9tSGVhZGVyTWVudSkge1xuICAgICAgICAgIGlmICghY29sdW1uRGVmLmhlYWRlciB8fCAhY29sdW1uRGVmLmhlYWRlci5tZW51KSB7XG4gICAgICAgICAgICBjb2x1bW5EZWYuaGVhZGVyID0ge1xuICAgICAgICAgICAgICBtZW51OiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY29sdW1uSGVhZGVyTWVudUl0ZW1zOiBIZWFkZXJNZW51SXRlbVtdID0gY29sdW1uRGVmICYmIGNvbHVtbkRlZi5oZWFkZXIgJiYgY29sdW1uRGVmLmhlYWRlci5tZW51ICYmIGNvbHVtbkRlZi5oZWFkZXIubWVudS5pdGVtcyB8fCBbXTtcblxuICAgICAgICAgIC8vIFNvcnRpbmcgQ29tbWFuZHNcbiAgICAgICAgICBpZiAob3B0aW9ucy5lbmFibGVTb3J0aW5nICYmIGNvbHVtbkRlZi5zb3J0YWJsZSAmJiBoZWFkZXJNZW51T3B0aW9ucyAmJiAhaGVhZGVyTWVudU9wdGlvbnMuaGlkZVNvcnRDb21tYW5kcykge1xuICAgICAgICAgICAgaWYgKGNvbHVtbkhlYWRlck1lbnVJdGVtcy5maWx0ZXIoKGl0ZW06IEhlYWRlck1lbnVJdGVtKSA9PiBpdGVtLmNvbW1hbmQgPT09ICdzb3J0LWFzYycpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBoZWFkZXJNZW51T3B0aW9ucy5pY29uU29ydEFzY0NvbW1hbmQgfHwgJ2ZhIGZhLXNvcnQtYXNjJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogb3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTT1JUX0FTQ0VORElORycpIDogQ29uc3RhbnRzLlRFWFRfU09SVF9BU0NFTkRJTkcsXG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ3NvcnQtYXNjJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2x1bW5IZWFkZXJNZW51SXRlbXMuZmlsdGVyKChpdGVtOiBIZWFkZXJNZW51SXRlbSkgPT4gaXRlbS5jb21tYW5kID09PSAnc29ydC1kZXNjJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IGhlYWRlck1lbnVPcHRpb25zLmljb25Tb3J0RGVzY0NvbW1hbmQgfHwgJ2ZhIGZhLXNvcnQtZGVzYycsXG4gICAgICAgICAgICAgICAgdGl0bGU6IG9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU09SVF9ERVNDRU5ESU5HJykgOiBDb25zdGFudHMuVEVYVF9TT1JUX0RFU0NFTkRJTkcsXG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ3NvcnQtZGVzYycsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTFcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSGlkZSBDb2x1bW4gQ29tbWFuZFxuICAgICAgICAgIGlmIChoZWFkZXJNZW51T3B0aW9ucyAmJiAhaGVhZGVyTWVudU9wdGlvbnMuaGlkZUNvbHVtbkhpZGVDb21tYW5kICYmIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5maWx0ZXIoKGl0ZW06IEhlYWRlck1lbnVJdGVtKSA9PiBpdGVtLmNvbW1hbmQgPT09ICdoaWRlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgIGljb25Dc3NDbGFzczogaGVhZGVyTWVudU9wdGlvbnMuaWNvbkNvbHVtbkhpZGVDb21tYW5kIHx8ICdmYSBmYS10aW1lcycsXG4gICAgICAgICAgICAgIHRpdGxlOiBvcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0hJREVfQ09MVU1OJykgOiBDb25zdGFudHMuVEVYVF9ISURFX0NPTFVNTixcbiAgICAgICAgICAgICAgY29tbWFuZDogJ2hpZGUnLFxuICAgICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnRyYW5zbGF0ZUl0ZW1zKGNvbHVtbkhlYWRlck1lbnVJdGVtcywgJ3RpdGxlS2V5JywgJ3RpdGxlJyk7XG4gICAgICAgICAgLy8gc29ydCB0aGUgY3VzdG9tIGl0ZW1zIGJ5IHRoZWlyIHBvc2l0aW9uIGluIHRoZSBsaXN0XG4gICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLnNvcnQoKGl0ZW1BOiBhbnksIGl0ZW1COiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtQSAmJiBpdGVtQiAmJiBpdGVtQS5oYXNPd25Qcm9wZXJ0eSgncG9zaXRpb25PcmRlcicpICYmIGl0ZW1CLmhhc093blByb3BlcnR5KCdwb3NpdGlvbk9yZGVyJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1BLnBvc2l0aW9uT3JkZXIgLSBpdGVtQi5wb3NpdGlvbk9yZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gaGVhZGVyTWVudU9wdGlvbnM7XG4gIH1cblxuICAvKiogRXhlY3V0ZSB0aGUgSGVhZGVyIE1lbnUgQ29tbWFuZHMgdGhhdCB3YXMgdHJpZ2dlcmVkIGJ5IHRoZSBvbkNvbW1hbmQgc3Vic2NyaWJlICovXG4gIGV4ZWN1dGVIZWFkZXJNZW51SW50ZXJuYWxDb21tYW5kcyhlOiBFdmVudCwgYXJnczogSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MpIHtcbiAgICBpZiAoYXJncyAmJiBhcmdzLmNvbW1hbmQpIHtcbiAgICAgIHN3aXRjaCAoYXJncy5jb21tYW5kKSB7XG4gICAgICAgIGNhc2UgJ2hpZGUnOlxuICAgICAgICAgIHRoaXMuaGlkZUNvbHVtbihhcmdzLmNvbHVtbik7XG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NvcnQtYXNjJzpcbiAgICAgICAgY2FzZSAnc29ydC1kZXNjJzpcbiAgICAgICAgICAvLyBnZXQgcHJldmlvdXNseSBzb3J0ZWQgY29sdW1uc1xuICAgICAgICAgIGNvbnN0IGNvbHM6IENvbHVtblNvcnRbXSA9IHRoaXMuc29ydFNlcnZpY2UuZ2V0UHJldmlvdXNDb2x1bW5Tb3J0cyhhcmdzLmNvbHVtbi5pZCArICcnKTtcblxuICAgICAgICAgIC8vIGFkZCB0byB0aGUgY29sdW1uIGFycmF5LCB0aGUgY29sdW1uIHNvcnRlZCBieSB0aGUgaGVhZGVyIG1lbnVcbiAgICAgICAgICBjb2xzLnB1c2goeyBzb3J0Q29sOiBhcmdzLmNvbHVtbiwgc29ydEFzYzogKGFyZ3MuY29tbWFuZCA9PT0gJ3NvcnQtYXNjJykgfSk7XG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0U2VydmljZS5vbkJhY2tlbmRTb3J0Q2hhbmdlZChlLCB7IG11bHRpQ29sdW1uU29ydDogdHJ1ZSwgc29ydENvbHM6IGNvbHMsIGdyaWQ6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uTG9jYWxTb3J0Q2hhbmdlZCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCwgdGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3LCBjb2xzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gd2hlbiB1c2luZyBjdXN0b21EYXRhVmlldywgd2Ugd2lsbCBzaW1wbHkgc2VuZCBpdCBhcyBhIG9uU29ydCBldmVudCB3aXRoIG5vdGlmeVxuICAgICAgICAgICAgY29uc3QgaXNNdWx0aVNvcnQgPSB0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5tdWx0aUNvbHVtblNvcnQgfHwgZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBzb3J0T3V0cHV0ID0gaXNNdWx0aVNvcnQgPyBjb2xzIDogY29sc1swXTtcbiAgICAgICAgICAgIGFyZ3MuZ3JpZC5vblNvcnQubm90aWZ5KHNvcnRPdXRwdXQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPYmogc29ydENvbHVtbnMgYXJyYXkgd2hpY2ggd2lsbCBhdCB0aGUgc2FtZSBhZGQgdGhlIHZpc3VhbCBzb3J0IGljb24ocykgb24gdGhlIFVJXG4gICAgICAgICAgY29uc3QgbmV3U29ydENvbHVtbnM6IENvbHVtblNvcnRbXSA9IGNvbHMubWFwKChjb2wpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbHVtbklkOiBjb2wgJiYgY29sLnNvcnRDb2wgJiYgY29sLnNvcnRDb2wuaWQsXG4gICAgICAgICAgICAgIHNvcnRBc2M6IGNvbCAmJiBjb2wuc29ydEFzY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRTb3J0Q29sdW1ucyhuZXdTb3J0Q29sdW1ucyk7IC8vIGFkZCBzb3J0IGljb24gaW4gVUlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogSGlkZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkICovXG4gIGhpZGVDb2x1bW4oY29sdW1uOiBDb2x1bW4pIHtcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKSB7XG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbkluZGV4KGNvbHVtbi5pZCk7XG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuYXJyYXlSZW1vdmVJdGVtQnlJbmRleCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5zKCksIGNvbHVtbkluZGV4KTtcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnModGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgYWxsIHRoZSBHcmlkIE1lbnUgb3B0aW9ucyB3aGljaCBoYXZlIHRleHQgdG8gdHJhbnNsYXRlXG4gICAqIEBwYXJhbSBncmlkIG1lbnUgb2JqZWN0XG4gICAqL1xuICByZXNldEhlYWRlck1lbnVUcmFuc2xhdGlvbnMoY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdKSB7XG4gICAgY29sdW1uRGVmaW5pdGlvbnMuZm9yRWFjaCgoY29sdW1uRGVmOiBDb2x1bW4pID0+IHtcbiAgICAgIGlmIChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmhlYWRlciAmJiBjb2x1bW5EZWYuaGVhZGVyICYmIGNvbHVtbkRlZi5oZWFkZXIubWVudSAmJiBjb2x1bW5EZWYuaGVhZGVyLm1lbnUuaXRlbXMpIHtcbiAgICAgICAgaWYgKCFjb2x1bW5EZWYuZXhjbHVkZUZyb21IZWFkZXJNZW51KSB7XG4gICAgICAgICAgY29uc3QgY29sdW1uSGVhZGVyTWVudUl0ZW1zOiBIZWFkZXJNZW51SXRlbVtdID0gY29sdW1uRGVmLmhlYWRlci5tZW51Lml0ZW1zIHx8IFtdO1xuICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgICBjYXNlICdzb3J0LWFzYyc6XG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1NPUlRfQVNDRU5ESU5HJykgfHwgQ29uc3RhbnRzLlRFWFRfU09SVF9BU0NFTkRJTkc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ3NvcnQtZGVzYyc6XG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1NPUlRfREVTQ0VORElORycpIHx8IENvbnN0YW50cy5URVhUX1NPUlRfREVTQ0VORElORztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnaGlkZSc6XG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0hJREVfQ09MVU1OJykgfHwgQ29uc3RhbnRzLlRFWFRfSElERV9DT0xVTU47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlLXRyYW5zbGF0ZSBpZiB0aGVyZSdzIGEgXCJ0aXRsZUtleVwiXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUpIHtcbiAgICAgICAgICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnRyYW5zbGF0ZUl0ZW1zKGNvbHVtbkhlYWRlck1lbnVJdGVtcywgJ3RpdGxlS2V5JywgJ3RpdGxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgdGhlIEhlYWRlciBNZW51IHRpdGxlcywgd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbiBkZWZpbml0aW9uIHRvIHJlLXRyYW5zbGF0ZSB0aGVtXG4gICAqL1xuICB0cmFuc2xhdGVIZWFkZXJNZW51KCkge1xuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUpIHtcbiAgICAgIHRoaXMucmVzZXRIZWFkZXJNZW51VHJhbnNsYXRpb25zKHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4gZGVmYXVsdCBIZWFkZXIgTWVudSBvcHRpb25zXG4gICAqL1xuICBwcml2YXRlIGdldERlZmF1bHRIZWFkZXJNZW51T3B0aW9ucygpOiBIZWFkZXJNZW51IHtcbiAgICByZXR1cm4ge1xuICAgICAgYXV0b0FsaWduT2Zmc2V0OiAxMixcbiAgICAgIG1pbldpZHRoOiAxNDAsXG4gICAgICBoaWRlQ29sdW1uSGlkZUNvbW1hbmQ6IGZhbHNlLFxuICAgICAgaGlkZVNvcnRDb21tYW5kczogZmFsc2UsXG4gICAgICB0aXRsZTogJydcbiAgICB9O1xuICB9XG59XG4iXX0=