/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { castToPromise } from './../services/utilities';
import { FilterService } from './../services/index';
var SlickPaginationComponent = /** @class */ (function () {
    /** Constructor */
    function SlickPaginationComponent(filterService) {
        this.filterService = filterService;
        this._isFirstRender = true;
        this.onPaginationChanged = new EventEmitter();
        this.dataFrom = 1;
        this.dataTo = 1;
        this.pageCount = 0;
        this.pageNumber = 1;
        this.totalItems = 0;
        this.paginationPageSizes = [25, 75, 100];
        this.fromToParams = { from: this.dataFrom, to: this.dataTo, totalItems: this.totalItems };
    }
    Object.defineProperty(SlickPaginationComponent.prototype, "gridPaginationOptions", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gridPaginationOptions;
        },
        set: /**
         * @param {?} gridPaginationOptions
         * @return {?}
         */
        function (gridPaginationOptions) {
            this._gridPaginationOptions = gridPaginationOptions;
            if (this._isFirstRender || !gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
                this.refreshPagination();
                this._isFirstRender = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.dispose();
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._gridPaginationOptions = this._gridPaginationOptions;
        if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
        }
        // Subscribe to Event Emitter of Filter & Sort changed, go back to page 1 when that happen
        this._filterSubcription = this.filterService.onFilterChanged.subscribe(function (data) {
            _this.refreshPagination(true);
        });
        // Subscribe to Filter clear and go back to page 1 when that happen
        this._filterSubcription = this.filterService.onFilterCleared.subscribe(function (data) {
            _this.refreshPagination(true);
        });
    };
    /**
     * @param {?} number
     * @return {?}
     */
    SlickPaginationComponent.prototype.ceil = /**
     * @param {?} number
     * @return {?}
     */
    function (number) {
        return Math.ceil(number);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToFirstPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.pageNumber = 1;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToLastPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.pageNumber = this.pageCount;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToNextPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber++;
            this.onPageChanged(event, this.pageNumber);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToPreviousPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.onPageChanged(event, this.pageNumber);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.changeToCurrentPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.pageNumber = +event.currentTarget.value;
        if (this.pageNumber < 1) {
            this.pageNumber = 1;
        }
        else if (this.pageNumber > this.pageCount) {
            this.pageNumber = this.pageCount;
        }
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this.onPaginationChanged.unsubscribe();
        if (this._filterSubcription) {
            this._filterSubcription.unsubscribe();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SlickPaginationComponent.prototype.onChangeItemPerPage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var itemsPerPage = +event.target.value;
        this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
        this.pageNumber = (this.totalItems > 0) ? 1 : 0;
        this.itemsPerPage = itemsPerPage;
        this.onPageChanged(event, this.pageNumber);
    };
    /**
     * @param {?=} isPageNumberReset
     * @return {?}
     */
    SlickPaginationComponent.prototype.refreshPagination = /**
     * @param {?=} isPageNumberReset
     * @return {?}
     */
    function (isPageNumberReset) {
        if (isPageNumberReset === void 0) { isPageNumberReset = false; }
        /** @type {?} */
        var backendApi = this._gridPaginationOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
            /** @type {?} */
            var pagination = this._gridPaginationOptions.pagination;
            // set the number of items per page if not already set
            if (!this.itemsPerPage) {
                this.itemsPerPage = +((backendApi && backendApi.options && backendApi.options.paginationOptions && backendApi.options.paginationOptions.first) ? backendApi.options.paginationOptions.first : this._gridPaginationOptions.pagination.pageSize);
            }
            // if totalItems changed, we should always go back to the first page and recalculation the From-To indexes
            if (isPageNumberReset || this.totalItems !== pagination.totalItems) {
                if (this._isFirstRender && pagination.pageNumber && pagination.pageNumber > 1) {
                    this.pageNumber = pagination.pageNumber || 1;
                }
                else {
                    this.pageNumber = 1;
                }
                // when page number is set to 1 then also reset the "offset" of backend service
                if (this.pageNumber === 1) {
                    backendApi.service.resetPaginationOptions();
                }
            }
            // calculate and refresh the multiple properties of the pagination UI
            this.paginationPageSizes = this._gridPaginationOptions.pagination.pageSizes;
            this.totalItems = this._gridPaginationOptions.pagination.totalItems;
            this.recalculateFromToIndexes();
        }
        this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    };
    /**
     * @param {?} event
     * @param {?} pageNumber
     * @return {?}
     */
    SlickPaginationComponent.prototype.onPageChanged = /**
     * @param {?} event
     * @param {?} pageNumber
     * @return {?}
     */
    function (event, pageNumber) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var backendApi, itemsPerPage, startTime, query, observableOrPromise, processResult, endTime, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.recalculateFromToIndexes();
                        backendApi = this._gridPaginationOptions.backendServiceApi;
                        if (!backendApi || !backendApi.service || !backendApi.process) {
                            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        if (this.dataTo > this.totalItems) {
                            this.dataTo = this.totalItems;
                        }
                        else if (this.totalItems < this.itemsPerPage) {
                            this.dataTo = this.totalItems;
                        }
                        if (!backendApi) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        itemsPerPage = +this.itemsPerPage;
                        // keep start time & end timestamps & return it after process execution
                        startTime = new Date();
                        if (backendApi.preProcess) {
                            backendApi.preProcess();
                        }
                        query = backendApi.service.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                        // the process could be an Observable (like HttpClient) or a Promise
                        // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                        observableOrPromise = backendApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 2:
                        processResult = _a.sent();
                        endTime = new Date();
                        // from the result, call our internal post process to update the Dataset and Pagination info
                        if (processResult && backendApi.internalPostProcess) {
                            backendApi.internalPostProcess(processResult);
                        }
                        // send the response process to the postProcess callback
                        if (backendApi.postProcess) {
                            if (processResult instanceof Object) {
                                processResult.statistics = {
                                    startTime: startTime,
                                    endTime: endTime,
                                    executionTime: endTime.valueOf() - startTime.valueOf(),
                                    itemCount: this.totalItems,
                                    totalItemCount: this.totalItems
                                };
                            }
                            backendApi.postProcess(processResult);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (backendApi && backendApi.onError) {
                            backendApi.onError(e_1);
                        }
                        else {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5: throw new Error('Pagination with a backend service requires "BackendServiceApi" to be defined in your grid options');
                    case 6:
                        // emit the changes to the parent component
                        this.onPaginationChanged.emit({
                            pageNumber: this.pageNumber,
                            pageSizes: this.paginationPageSizes,
                            pageSize: this.itemsPerPage,
                            totalItems: this.totalItems
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    SlickPaginationComponent.prototype.recalculateFromToIndexes = /**
     * @return {?}
     */
    function () {
        if (this.totalItems === 0) {
            this.dataFrom = 0;
            this.dataTo = 0;
            this.pageNumber = 0;
        }
        else {
            this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
            this.dataTo = (this.totalItems < this.itemsPerPage) ? this.totalItems : (this.pageNumber * this.itemsPerPage);
        }
    };
    SlickPaginationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slick-pagination',
                    template: "<div class=\"slick-pagination\">\n    <div class=\"slick-pagination-nav\">\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-first fa fa-angle-double-left\" aria-label=\"First\" (click)=\"changeToFirstPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-prev fa fa-angle-left\" aria-label=\"Previous\" (click)=\"changeToPreviousPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n\n        <div class=\"slick-page-number\">\n            <span [translate]=\"'PAGE'\"></span>\n            <input type=\"text\" class=\"form-control\" [value]=\"pageNumber\" size=\"1\" [readOnly]=\"totalItems === 0\" (change)=\"changeToCurrentPage($event)\">\n            <span [translate]=\"'OF'\"></span><span> {{pageCount}}</span>\n        </div>\n\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-next text-center fa fa-lg fa-angle-right\" aria-label=\"Next\" (click)=\"changeToNextPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-end fa fa-lg fa-angle-double-right\" aria-label=\"Last\" (click)=\"changeToLastPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n    </div>\n    <span class=\"slick-pagination-settings\">\n        <select id=\"items-per-page-label\" [value]=\"itemsPerPage\" (change)=\"onChangeItemPerPage($event)\">\n        <option value=\"{{pageSize}}\" *ngFor=\"let pageSize of paginationPageSizes;\">{{pageSize}}</option>\n        </select>\n        <span [translate]=\"'ITEMS_PER_PAGE'\"></span>,\n        <span class=\"slick-pagination-count\">\n            <span [translate]=\"'FROM_TO_OF_TOTAL_ITEMS'\" [translateParams]=\"{ from: dataFrom, to: dataTo, totalItems: totalItems }\"></span>\n        </span>\n    </span>\n    </div>\n"
                }] },
        { type: Injectable }
    ];
    /** @nocollapse */
    SlickPaginationComponent.ctorParameters = function () { return [
        { type: FilterService }
    ]; };
    SlickPaginationComponent.propDecorators = {
        onPaginationChanged: [{ type: Output }],
        gridPaginationOptions: [{ type: Input }],
        grid: [{ type: Input }]
    };
    return SlickPaginationComponent;
}());
export { SlickPaginationComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SlickPaginationComponent.prototype._filterSubcription;
    /**
     * @type {?}
     * @private
     */
    SlickPaginationComponent.prototype._gridPaginationOptions;
    /**
     * @type {?}
     * @private
     */
    SlickPaginationComponent.prototype._isFirstRender;
    /** @type {?} */
    SlickPaginationComponent.prototype.onPaginationChanged;
    /** @type {?} */
    SlickPaginationComponent.prototype.grid;
    /** @type {?} */
    SlickPaginationComponent.prototype.dataFrom;
    /** @type {?} */
    SlickPaginationComponent.prototype.dataTo;
    /** @type {?} */
    SlickPaginationComponent.prototype.itemsPerPage;
    /** @type {?} */
    SlickPaginationComponent.prototype.pageCount;
    /** @type {?} */
    SlickPaginationComponent.prototype.pageNumber;
    /** @type {?} */
    SlickPaginationComponent.prototype.totalItems;
    /** @type {?} */
    SlickPaginationComponent.prototype.paginationCallback;
    /** @type {?} */
    SlickPaginationComponent.prototype.paginationPageSizes;
    /** @type {?} */
    SlickPaginationComponent.prototype.fromToParams;
    /**
     * @type {?}
     * @private
     */
    SlickPaginationComponent.prototype.filterService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2NvbXBvbmVudHMvc2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUdwRDtJQWlDRSxrQkFBa0I7SUFDbEIsa0NBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBMUJ4QyxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUNwQix3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBYy9ELGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRVgsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRWYsd0JBQW1CLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLGlCQUFZLEdBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBR3RDLENBQUM7SUF2QnJELHNCQUNJLDJEQUFxQjs7OztRQU96QjtZQUNFLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBQ3JDLENBQUM7Ozs7O1FBVkQsVUFDMEIs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REFBOEI7O0lBQzlCLHVEQUErRDs7SUFhL0Qsd0NBQW1COztJQUNuQiw0Q0FBYTs7SUFDYiwwQ0FBVzs7SUFDWCxnREFBcUI7O0lBQ3JCLDZDQUFjOztJQUNkLDhDQUFlOztJQUNmLDhDQUFlOztJQUNmLHNEQUE2Qjs7SUFDN0IsdURBQW9DOztJQUNwQyxnREFBMEY7Ozs7O0lBRzlFLGlEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICcuLy4uL21vZGVscy9wYWdpbmF0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjYXN0VG9Qcm9taXNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xuaW1wb3J0IHsgR3JpZE9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2luZGV4JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbGljay1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NsaWNrLXBhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwnXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNsaWNrUGFnaW5hdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2ZpbHRlclN1YmNyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX2dyaWRQYWdpbmF0aW9uT3B0aW9uczogR3JpZE9wdGlvbjtcbiAgcHJpdmF0ZSBfaXNGaXJzdFJlbmRlciA9IHRydWU7XG4gIEBPdXRwdXQoKSBvblBhZ2luYXRpb25DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdpbmF0aW9uPigpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBncmlkUGFnaW5hdGlvbk9wdGlvbnMoZ3JpZFBhZ2luYXRpb25PcHRpb25zOiBHcmlkT3B0aW9uKSB7XG4gICAgdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zID0gZ3JpZFBhZ2luYXRpb25PcHRpb25zO1xuICAgIGlmICh0aGlzLl9pc0ZpcnN0UmVuZGVyIHx8ICFncmlkUGFnaW5hdGlvbk9wdGlvbnMgfHwgIWdyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uIHx8IChncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zICE9PSB0aGlzLnRvdGFsSXRlbXMpKSB7XG4gICAgICB0aGlzLnJlZnJlc2hQYWdpbmF0aW9uKCk7XG4gICAgICB0aGlzLl9pc0ZpcnN0UmVuZGVyID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGdldCBncmlkUGFnaW5hdGlvbk9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucztcbiAgfVxuICBASW5wdXQoKSBncmlkOiBhbnk7XG4gIGRhdGFGcm9tID0gMTtcbiAgZGF0YVRvID0gMTtcbiAgaXRlbXNQZXJQYWdlOiBudW1iZXI7XG4gIHBhZ2VDb3VudCA9IDA7XG4gIHBhZ2VOdW1iZXIgPSAxO1xuICB0b3RhbEl0ZW1zID0gMDtcbiAgcGFnaW5hdGlvbkNhbGxiYWNrOiBGdW5jdGlvbjtcbiAgcGFnaW5hdGlvblBhZ2VTaXplcyA9IFsyNSwgNzUsIDEwMF07XG4gIGZyb21Ub1BhcmFtczogYW55ID0geyBmcm9tOiB0aGlzLmRhdGFGcm9tLCB0bzogdGhpcy5kYXRhVG8sIHRvdGFsSXRlbXM6IHRoaXMudG90YWxJdGVtcyB9O1xuXG4gIC8qKiBDb25zdHJ1Y3RvciAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UpIHsgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucyA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucztcbiAgICBpZiAoIXRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucyB8fCAhdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb24gfHwgKHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXMgIT09IHRoaXMudG90YWxJdGVtcykpIHtcbiAgICAgIHRoaXMucmVmcmVzaFBhZ2luYXRpb24oKTtcbiAgICB9XG5cbiAgICAvLyBTdWJzY3JpYmUgdG8gRXZlbnQgRW1pdHRlciBvZiBGaWx0ZXIgJiBTb3J0IGNoYW5nZWQsIGdvIGJhY2sgdG8gcGFnZSAxIHdoZW4gdGhhdCBoYXBwZW5cbiAgICB0aGlzLl9maWx0ZXJTdWJjcmlwdGlvbiA9IHRoaXMuZmlsdGVyU2VydmljZS5vbkZpbHRlckNoYW5nZWQuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnJlZnJlc2hQYWdpbmF0aW9uKHRydWUpO1xuICAgIH0pO1xuICAgIC8vIFN1YnNjcmliZSB0byBGaWx0ZXIgY2xlYXIgYW5kIGdvIGJhY2sgdG8gcGFnZSAxIHdoZW4gdGhhdCBoYXBwZW5cbiAgICB0aGlzLl9maWx0ZXJTdWJjcmlwdGlvbiA9IHRoaXMuZmlsdGVyU2VydmljZS5vbkZpbHRlckNsZWFyZWQuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnJlZnJlc2hQYWdpbmF0aW9uKHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgY2VpbChudW1iZXI6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcbiAgfVxuXG4gIGNoYW5nZVRvRmlyc3RQYWdlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnBhZ2VOdW1iZXIgPSAxO1xuICAgIHRoaXMub25QYWdlQ2hhbmdlZChldmVudCwgdGhpcy5wYWdlTnVtYmVyKTtcbiAgfVxuXG4gIGNoYW5nZVRvTGFzdFBhZ2UoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMucGFnZU51bWJlciA9IHRoaXMucGFnZUNvdW50O1xuICAgIHRoaXMub25QYWdlQ2hhbmdlZChldmVudCwgdGhpcy5wYWdlTnVtYmVyKTtcbiAgfVxuXG4gIGNoYW5nZVRvTmV4dFBhZ2UoZXZlbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLnBhZ2VOdW1iZXIgPCB0aGlzLnBhZ2VDb3VudCkge1xuICAgICAgdGhpcy5wYWdlTnVtYmVyKys7XG4gICAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlVG9QcmV2aW91c1BhZ2UoZXZlbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLnBhZ2VOdW1iZXIgPiAwKSB7XG4gICAgICB0aGlzLnBhZ2VOdW1iZXItLTtcbiAgICAgIHRoaXMub25QYWdlQ2hhbmdlZChldmVudCwgdGhpcy5wYWdlTnVtYmVyKTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VUb0N1cnJlbnRQYWdlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnBhZ2VOdW1iZXIgPSArZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZTtcbiAgICBpZiAodGhpcy5wYWdlTnVtYmVyIDwgMSkge1xuICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFnZU51bWJlciA+IHRoaXMucGFnZUNvdW50KSB7XG4gICAgICB0aGlzLnBhZ2VOdW1iZXIgPSB0aGlzLnBhZ2VDb3VudDtcbiAgICB9XG5cbiAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMub25QYWdpbmF0aW9uQ2hhbmdlZC51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLl9maWx0ZXJTdWJjcmlwdGlvbikge1xuICAgICAgdGhpcy5fZmlsdGVyU3ViY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZUl0ZW1QZXJQYWdlKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBpdGVtc1BlclBhZ2UgPSArZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIGl0ZW1zUGVyUGFnZSk7XG4gICAgdGhpcy5wYWdlTnVtYmVyID0gKHRoaXMudG90YWxJdGVtcyA+IDApID8gMSA6IDA7XG4gICAgdGhpcy5pdGVtc1BlclBhZ2UgPSBpdGVtc1BlclBhZ2U7XG4gICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xuICB9XG5cbiAgcmVmcmVzaFBhZ2luYXRpb24oaXNQYWdlTnVtYmVyUmVzZXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XG4gICAgaWYgKCFiYWNrZW5kQXBpIHx8ICFiYWNrZW5kQXBpLnNlcnZpY2UgfHwgIWJhY2tlbmRBcGkucHJvY2Vzcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWNrZW5kU2VydmljZUFwaSByZXF1aXJlcyBhdCBsZWFzdCBhIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGFuZCBhIFwic2VydmljZVwiIGRlZmluZWRgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zICYmIHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uKSB7XG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb247XG4gICAgICAvLyBzZXQgdGhlIG51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBpZiBub3QgYWxyZWFkeSBzZXRcbiAgICAgIGlmICghdGhpcy5pdGVtc1BlclBhZ2UpIHtcbiAgICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSArKChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkub3B0aW9ucyAmJiBiYWNrZW5kQXBpLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMgJiYgYmFja2VuZEFwaS5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zLmZpcnN0KSA/IGJhY2tlbmRBcGkub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucy5maXJzdCA6IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdG90YWxJdGVtcyBjaGFuZ2VkLCB3ZSBzaG91bGQgYWx3YXlzIGdvIGJhY2sgdG8gdGhlIGZpcnN0IHBhZ2UgYW5kIHJlY2FsY3VsYXRpb24gdGhlIEZyb20tVG8gaW5kZXhlc1xuICAgICAgaWYgKGlzUGFnZU51bWJlclJlc2V0IHx8IHRoaXMudG90YWxJdGVtcyAhPT0gcGFnaW5hdGlvbi50b3RhbEl0ZW1zKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZpcnN0UmVuZGVyICYmIHBhZ2luYXRpb24ucGFnZU51bWJlciAmJiBwYWdpbmF0aW9uLnBhZ2VOdW1iZXIgPiAxKSB7XG4gICAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gcGFnaW5hdGlvbi5wYWdlTnVtYmVyIHx8IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdoZW4gcGFnZSBudW1iZXIgaXMgc2V0IHRvIDEgdGhlbiBhbHNvIHJlc2V0IHRoZSBcIm9mZnNldFwiIG9mIGJhY2tlbmQgc2VydmljZVxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID09PSAxKSB7XG4gICAgICAgICAgYmFja2VuZEFwaS5zZXJ2aWNlLnJlc2V0UGFnaW5hdGlvbk9wdGlvbnMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjYWxjdWxhdGUgYW5kIHJlZnJlc2ggdGhlIG11bHRpcGxlIHByb3BlcnRpZXMgb2YgdGhlIHBhZ2luYXRpb24gVUlcbiAgICAgIHRoaXMucGFnaW5hdGlvblBhZ2VTaXplcyA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcztcbiAgICAgIHRoaXMudG90YWxJdGVtcyA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXM7XG4gICAgICB0aGlzLnJlY2FsY3VsYXRlRnJvbVRvSW5kZXhlcygpO1xuICAgIH1cbiAgICB0aGlzLnBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGlzLnRvdGFsSXRlbXMgLyB0aGlzLml0ZW1zUGVyUGFnZSk7XG4gIH1cblxuICBhc3luYyBvblBhZ2VDaGFuZ2VkKGV2ZW50OiBFdmVudCB8IHVuZGVmaW5lZCwgcGFnZU51bWJlcjogbnVtYmVyKSB7XG4gICAgdGhpcy5yZWNhbGN1bGF0ZUZyb21Ub0luZGV4ZXMoKTtcblxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XG4gICAgaWYgKCFiYWNrZW5kQXBpIHx8ICFiYWNrZW5kQXBpLnNlcnZpY2UgfHwgIWJhY2tlbmRBcGkucHJvY2Vzcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWNrZW5kU2VydmljZUFwaSByZXF1aXJlcyBhdCBsZWFzdCBhIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGFuZCBhIFwic2VydmljZVwiIGRlZmluZWRgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRhVG8gPiB0aGlzLnRvdGFsSXRlbXMpIHtcbiAgICAgIHRoaXMuZGF0YVRvID0gdGhpcy50b3RhbEl0ZW1zO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbEl0ZW1zIDwgdGhpcy5pdGVtc1BlclBhZ2UpIHtcbiAgICAgIHRoaXMuZGF0YVRvID0gdGhpcy50b3RhbEl0ZW1zO1xuICAgIH1cbiAgICBpZiAoYmFja2VuZEFwaSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaXRlbXNQZXJQYWdlID0gK3RoaXMuaXRlbXNQZXJQYWdlO1xuXG4gICAgICAgIC8vIGtlZXAgc3RhcnQgdGltZSAmIGVuZCB0aW1lc3RhbXBzICYgcmV0dXJuIGl0IGFmdGVyIHByb2Nlc3MgZXhlY3V0aW9uXG4gICAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xuICAgICAgICAgIGJhY2tlbmRBcGkucHJlUHJvY2VzcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcXVlcnkgPSBiYWNrZW5kQXBpLnNlcnZpY2UucHJvY2Vzc09uUGFnaW5hdGlvbkNoYW5nZWQoZXZlbnQsIHsgbmV3UGFnZTogcGFnZU51bWJlciwgcGFnZVNpemU6IGl0ZW1zUGVyUGFnZSB9KTtcblxuICAgICAgICAvLyB0aGUgcHJvY2VzcyBjb3VsZCBiZSBhbiBPYnNlcnZhYmxlIChsaWtlIEh0dHBDbGllbnQpIG9yIGEgUHJvbWlzZVxuICAgICAgICAvLyBpbiBhbnkgY2FzZSwgd2UgbmVlZCB0byBoYXZlIGEgUHJvbWlzZSBzbyB0aGF0IHdlIGNhbiBhd2FpdCBvbiBpdCAoaWYgYW4gT2JzZXJ2YWJsZSwgY29udmVydCBpdCB0byBQcm9taXNlKVxuICAgICAgICBjb25zdCBvYnNlcnZhYmxlT3JQcm9taXNlID0gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc1Jlc3VsdCA9IGF3YWl0IGNhc3RUb1Byb21pc2Uob2JzZXJ2YWJsZU9yUHJvbWlzZSk7XG4gICAgICAgIGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8vIGZyb20gdGhlIHJlc3VsdCwgY2FsbCBvdXIgaW50ZXJuYWwgcG9zdCBwcm9jZXNzIHRvIHVwZGF0ZSB0aGUgRGF0YXNldCBhbmQgUGFnaW5hdGlvbiBpbmZvXG4gICAgICAgIGlmIChwcm9jZXNzUmVzdWx0ICYmIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2Vzcykge1xuICAgICAgICAgIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2Vzcyhwcm9jZXNzUmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlbmQgdGhlIHJlc3BvbnNlIHByb2Nlc3MgdG8gdGhlIHBvc3RQcm9jZXNzIGNhbGxiYWNrXG4gICAgICAgIGlmIChiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIHByb2Nlc3NSZXN1bHQuc3RhdGlzdGljcyA9IHtcbiAgICAgICAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICAgICAgICBlbmRUaW1lLFxuICAgICAgICAgICAgICBleGVjdXRpb25UaW1lOiBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCksXG4gICAgICAgICAgICAgIGl0ZW1Db3VudDogdGhpcy50b3RhbEl0ZW1zLFxuICAgICAgICAgICAgICB0b3RhbEl0ZW1Db3VudDogdGhpcy50b3RhbEl0ZW1zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkub25FcnJvcikge1xuICAgICAgICAgIGJhY2tlbmRBcGkub25FcnJvcihlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFnaW5hdGlvbiB3aXRoIGEgYmFja2VuZCBzZXJ2aWNlIHJlcXVpcmVzIFwiQmFja2VuZFNlcnZpY2VBcGlcIiB0byBiZSBkZWZpbmVkIGluIHlvdXIgZ3JpZCBvcHRpb25zJyk7XG4gICAgfVxuXG4gICAgLy8gZW1pdCB0aGUgY2hhbmdlcyB0byB0aGUgcGFyZW50IGNvbXBvbmVudFxuICAgIHRoaXMub25QYWdpbmF0aW9uQ2hhbmdlZC5lbWl0KHtcbiAgICAgIHBhZ2VOdW1iZXI6IHRoaXMucGFnZU51bWJlcixcbiAgICAgIHBhZ2VTaXplczogdGhpcy5wYWdpbmF0aW9uUGFnZVNpemVzLFxuICAgICAgcGFnZVNpemU6IHRoaXMuaXRlbXNQZXJQYWdlLFxuICAgICAgdG90YWxJdGVtczogdGhpcy50b3RhbEl0ZW1zXG4gICAgfSk7XG4gIH1cblxuICByZWNhbGN1bGF0ZUZyb21Ub0luZGV4ZXMoKSB7XG4gICAgaWYgKHRoaXMudG90YWxJdGVtcyA9PT0gMCkge1xuICAgICAgdGhpcy5kYXRhRnJvbSA9IDA7XG4gICAgICB0aGlzLmRhdGFUbyA9IDA7XG4gICAgICB0aGlzLnBhZ2VOdW1iZXIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGFGcm9tID0gKHRoaXMucGFnZU51bWJlciAqIHRoaXMuaXRlbXNQZXJQYWdlKSAtIHRoaXMuaXRlbXNQZXJQYWdlICsgMTtcbiAgICAgIHRoaXMuZGF0YVRvID0gKHRoaXMudG90YWxJdGVtcyA8IHRoaXMuaXRlbXNQZXJQYWdlKSA/IHRoaXMudG90YWxJdGVtcyA6ICh0aGlzLnBhZ2VOdW1iZXIgKiB0aGlzLml0ZW1zUGVyUGFnZSk7XG4gICAgfVxuICB9XG59XG4iXX0=