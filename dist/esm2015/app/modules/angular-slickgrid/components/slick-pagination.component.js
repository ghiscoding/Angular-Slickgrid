/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { castToPromise } from './../services/utilities';
import { FilterService } from './../services/index';
export class SlickPaginationComponent {
    /**
     * Constructor
     * @param {?} filterService
     */
    constructor(filterService) {
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
    /**
     * @param {?} gridPaginationOptions
     * @return {?}
     */
    set gridPaginationOptions(gridPaginationOptions) {
        this._gridPaginationOptions = gridPaginationOptions;
        if (this._isFirstRender || !gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
            this._isFirstRender = false;
        }
    }
    /**
     * @return {?}
     */
    get gridPaginationOptions() {
        return this._gridPaginationOptions;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.dispose();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._gridPaginationOptions = this._gridPaginationOptions;
        if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
            this.refreshPagination();
        }
        // Subscribe to Event Emitter of Filter & Sort changed, go back to page 1 when that happen
        this._filterSubcription = this.filterService.onFilterChanged.subscribe((data) => {
            this.refreshPagination(true);
        });
        // Subscribe to Filter clear and go back to page 1 when that happen
        this._filterSubcription = this.filterService.onFilterCleared.subscribe((data) => {
            this.refreshPagination(true);
        });
    }
    /**
     * @param {?} number
     * @return {?}
     */
    ceil(number) {
        return Math.ceil(number);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToFirstPage(event) {
        this.pageNumber = 1;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToLastPage(event) {
        this.pageNumber = this.pageCount;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToNextPage(event) {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber++;
            this.onPageChanged(event, this.pageNumber);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToPreviousPage(event) {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.onPageChanged(event, this.pageNumber);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeToCurrentPage(event) {
        this.pageNumber = +event.currentTarget.value;
        if (this.pageNumber < 1) {
            this.pageNumber = 1;
        }
        else if (this.pageNumber > this.pageCount) {
            this.pageNumber = this.pageCount;
        }
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @return {?}
     */
    dispose() {
        this.onPaginationChanged.unsubscribe();
        if (this._filterSubcription) {
            this._filterSubcription.unsubscribe();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChangeItemPerPage(event) {
        /** @type {?} */
        const itemsPerPage = +event.target.value;
        this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
        this.pageNumber = (this.totalItems > 0) ? 1 : 0;
        this.itemsPerPage = itemsPerPage;
        this.onPageChanged(event, this.pageNumber);
    }
    /**
     * @param {?=} isPageNumberReset
     * @return {?}
     */
    refreshPagination(isPageNumberReset = false) {
        /** @type {?} */
        const backendApi = this._gridPaginationOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
            /** @type {?} */
            const pagination = this._gridPaginationOptions.pagination;
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
    }
    /**
     * @param {?} event
     * @param {?} pageNumber
     * @return {?}
     */
    onPageChanged(event, pageNumber) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.recalculateFromToIndexes();
            /** @type {?} */
            const backendApi = this._gridPaginationOptions.backendServiceApi;
            if (!backendApi || !backendApi.service || !backendApi.process) {
                throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
            }
            if (this.dataTo > this.totalItems) {
                this.dataTo = this.totalItems;
            }
            else if (this.totalItems < this.itemsPerPage) {
                this.dataTo = this.totalItems;
            }
            if (backendApi) {
                try {
                    /** @type {?} */
                    const itemsPerPage = +this.itemsPerPage;
                    // keep start time & end timestamps & return it after process execution
                    /** @type {?} */
                    const startTime = new Date();
                    if (backendApi.preProcess) {
                        backendApi.preProcess();
                    }
                    /** @type {?} */
                    const query = backendApi.service.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                    // the process could be an Observable (like HttpClient) or a Promise
                    // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                    /** @type {?} */
                    const observableOrPromise = backendApi.process(query);
                    /** @type {?} */
                    const processResult = yield castToPromise(observableOrPromise);
                    /** @type {?} */
                    const endTime = new Date();
                    // from the result, call our internal post process to update the Dataset and Pagination info
                    if (processResult && backendApi.internalPostProcess) {
                        backendApi.internalPostProcess(processResult);
                    }
                    // send the response process to the postProcess callback
                    if (backendApi.postProcess) {
                        if (processResult instanceof Object) {
                            processResult.statistics = {
                                startTime,
                                endTime,
                                executionTime: endTime.valueOf() - startTime.valueOf(),
                                itemCount: this.totalItems,
                                totalItemCount: this.totalItems
                            };
                        }
                        backendApi.postProcess(processResult);
                    }
                }
                catch (e) {
                    if (backendApi && backendApi.onError) {
                        backendApi.onError(e);
                    }
                    else {
                        throw e;
                    }
                }
            }
            else {
                throw new Error('Pagination with a backend service requires "BackendServiceApi" to be defined in your grid options');
            }
            // emit the changes to the parent component
            this.onPaginationChanged.emit({
                pageNumber: this.pageNumber,
                pageSizes: this.paginationPageSizes,
                pageSize: this.itemsPerPage,
                totalItems: this.totalItems
            });
        });
    }
    /**
     * @return {?}
     */
    recalculateFromToIndexes() {
        if (this.totalItems === 0) {
            this.dataFrom = 0;
            this.dataTo = 0;
            this.pageNumber = 0;
        }
        else {
            this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
            this.dataTo = (this.totalItems < this.itemsPerPage) ? this.totalItems : (this.pageNumber * this.itemsPerPage);
        }
    }
}
SlickPaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'slick-pagination',
                template: "<div class=\"slick-pagination\">\n    <div class=\"slick-pagination-nav\">\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-first fa fa-angle-double-left\" aria-label=\"First\" (click)=\"changeToFirstPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-prev fa fa-angle-left\" aria-label=\"Previous\" (click)=\"changeToPreviousPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n\n        <div class=\"slick-page-number\">\n            <span [translate]=\"'PAGE'\"></span>\n            <input type=\"text\" class=\"form-control\" [value]=\"pageNumber\" size=\"1\" [readOnly]=\"totalItems === 0\" (change)=\"changeToCurrentPage($event)\">\n            <span [translate]=\"'OF'\"></span><span> {{pageCount}}</span>\n        </div>\n\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-next text-center fa fa-lg fa-angle-right\" aria-label=\"Next\" (click)=\"changeToNextPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-end fa fa-lg fa-angle-double-right\" aria-label=\"Last\" (click)=\"changeToLastPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n    </div>\n    <span class=\"slick-pagination-settings\">\n        <select id=\"items-per-page-label\" [value]=\"itemsPerPage\" (change)=\"onChangeItemPerPage($event)\">\n        <option value=\"{{pageSize}}\" *ngFor=\"let pageSize of paginationPageSizes;\">{{pageSize}}</option>\n        </select>\n        <span [translate]=\"'ITEMS_PER_PAGE'\"></span>,\n        <span class=\"slick-pagination-count\">\n            <span [translate]=\"'FROM_TO_OF_TOTAL_ITEMS'\" [translateParams]=\"{ from: dataFrom, to: dataTo, totalItems: totalItems }\"></span>\n        </span>\n    </span>\n    </div>\n"
            }] },
    { type: Injectable }
];
/** @nocollapse */
SlickPaginationComponent.ctorParameters = () => [
    { type: FilterService }
];
SlickPaginationComponent.propDecorators = {
    onPaginationChanged: [{ type: Output }],
    gridPaginationOptions: [{ type: Input }],
    grid: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2NvbXBvbmVudHMvc2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVFwRCxNQUFNLE9BQU8sd0JBQXdCOzs7OztJQTZCbkMsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUExQnhDLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7UUFjL0QsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFFWCxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFZix3QkFBbUIsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsaUJBQVksR0FBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFHdEMsQ0FBQzs7Ozs7SUF2QnJELElBQ0kscUJBQXFCLENBQUMscUJBQWlDO1FBQ3pELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxxQkFBcUIsQ0FBQztRQUNw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QUc5RSxpREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi8uLi9tb2RlbHMvcGFnaW5hdGlvbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGNhc3RUb1Byb21pc2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IEdyaWRPcHRpb24gfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2luZGV4JztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NsaWNrLXBhZ2luYXRpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbGljay1wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTbGlja1BhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2ZpbHRlclN1YmNyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBfZ3JpZFBhZ2luYXRpb25PcHRpb25zOiBHcmlkT3B0aW9uO1xyXG4gIHByaXZhdGUgX2lzRmlyc3RSZW5kZXIgPSB0cnVlO1xyXG4gIEBPdXRwdXQoKSBvblBhZ2luYXRpb25DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdpbmF0aW9uPigpO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBncmlkUGFnaW5hdGlvbk9wdGlvbnMoZ3JpZFBhZ2luYXRpb25PcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMgPSBncmlkUGFnaW5hdGlvbk9wdGlvbnM7XHJcbiAgICBpZiAodGhpcy5faXNGaXJzdFJlbmRlciB8fCAhZ3JpZFBhZ2luYXRpb25PcHRpb25zIHx8ICFncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbiB8fCAoZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtcyAhPT0gdGhpcy50b3RhbEl0ZW1zKSkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hQYWdpbmF0aW9uKCk7XHJcbiAgICAgIHRoaXMuX2lzRmlyc3RSZW5kZXIgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0IGdyaWRQYWdpbmF0aW9uT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnM7XHJcbiAgfVxyXG4gIEBJbnB1dCgpIGdyaWQ6IGFueTtcclxuICBkYXRhRnJvbSA9IDE7XHJcbiAgZGF0YVRvID0gMTtcclxuICBpdGVtc1BlclBhZ2U6IG51bWJlcjtcclxuICBwYWdlQ291bnQgPSAwO1xyXG4gIHBhZ2VOdW1iZXIgPSAxO1xyXG4gIHRvdGFsSXRlbXMgPSAwO1xyXG4gIHBhZ2luYXRpb25DYWxsYmFjazogRnVuY3Rpb247XHJcbiAgcGFnaW5hdGlvblBhZ2VTaXplcyA9IFsyNSwgNzUsIDEwMF07XHJcbiAgZnJvbVRvUGFyYW1zOiBhbnkgPSB7IGZyb206IHRoaXMuZGF0YUZyb20sIHRvOiB0aGlzLmRhdGFUbywgdG90YWxJdGVtczogdGhpcy50b3RhbEl0ZW1zIH07XHJcblxyXG4gIC8qKiBDb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSkgeyB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5kaXNwb3NlKCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnM7XHJcbiAgICBpZiAoIXRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucyB8fCAhdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb24gfHwgKHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXMgIT09IHRoaXMudG90YWxJdGVtcykpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoUGFnaW5hdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIEZpbHRlciAmIFNvcnQgY2hhbmdlZCwgZ28gYmFjayB0byBwYWdlIDEgd2hlbiB0aGF0IGhhcHBlblxyXG4gICAgdGhpcy5fZmlsdGVyU3ViY3JpcHRpb24gPSB0aGlzLmZpbHRlclNlcnZpY2Uub25GaWx0ZXJDaGFuZ2VkLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xyXG4gICAgICB0aGlzLnJlZnJlc2hQYWdpbmF0aW9uKHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gRmlsdGVyIGNsZWFyIGFuZCBnbyBiYWNrIHRvIHBhZ2UgMSB3aGVuIHRoYXQgaGFwcGVuXHJcbiAgICB0aGlzLl9maWx0ZXJTdWJjcmlwdGlvbiA9IHRoaXMuZmlsdGVyU2VydmljZS5vbkZpbHRlckNsZWFyZWQuc3Vic2NyaWJlKChkYXRhKSA9PiB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFBhZ2luYXRpb24odHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNlaWwobnVtYmVyOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVRvRmlyc3RQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucGFnZU51bWJlciA9IDE7XHJcbiAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUb0xhc3RQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucGFnZU51bWJlciA9IHRoaXMucGFnZUNvdW50O1xyXG4gICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVG9OZXh0UGFnZShldmVudDogYW55KSB7XHJcbiAgICBpZiAodGhpcy5wYWdlTnVtYmVyIDwgdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgdGhpcy5wYWdlTnVtYmVyKys7XHJcbiAgICAgIHRoaXMub25QYWdlQ2hhbmdlZChldmVudCwgdGhpcy5wYWdlTnVtYmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZVRvUHJldmlvdXNQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLnBhZ2VOdW1iZXIgPiAwKSB7XHJcbiAgICAgIHRoaXMucGFnZU51bWJlci0tO1xyXG4gICAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUb0N1cnJlbnRQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucGFnZU51bWJlciA9ICtldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG4gICAgaWYgKHRoaXMucGFnZU51bWJlciA8IDEpIHtcclxuICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlTnVtYmVyID4gdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgdGhpcy5wYWdlTnVtYmVyID0gdGhpcy5wYWdlQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xyXG4gIH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMub25QYWdpbmF0aW9uQ2hhbmdlZC51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYgKHRoaXMuX2ZpbHRlclN1YmNyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2ZpbHRlclN1YmNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZUl0ZW1QZXJQYWdlKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IGl0ZW1zUGVyUGFnZSA9ICtldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICB0aGlzLnBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGlzLnRvdGFsSXRlbXMgLyBpdGVtc1BlclBhZ2UpO1xyXG4gICAgdGhpcy5wYWdlTnVtYmVyID0gKHRoaXMudG90YWxJdGVtcyA+IDApID8gMSA6IDA7XHJcbiAgICB0aGlzLml0ZW1zUGVyUGFnZSA9IGl0ZW1zUGVyUGFnZTtcclxuICAgIHRoaXMub25QYWdlQ2hhbmdlZChldmVudCwgdGhpcy5wYWdlTnVtYmVyKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hQYWdpbmF0aW9uKGlzUGFnZU51bWJlclJlc2V0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkuc2VydmljZSB8fCAhYmFja2VuZEFwaS5wcm9jZXNzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucyAmJiB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbikge1xyXG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb247XHJcbiAgICAgIC8vIHNldCB0aGUgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlIGlmIG5vdCBhbHJlYWR5IHNldFxyXG4gICAgICBpZiAoIXRoaXMuaXRlbXNQZXJQYWdlKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPSArKChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkub3B0aW9ucyAmJiBiYWNrZW5kQXBpLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMgJiYgYmFja2VuZEFwaS5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zLmZpcnN0KSA/IGJhY2tlbmRBcGkub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucy5maXJzdCA6IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaWYgdG90YWxJdGVtcyBjaGFuZ2VkLCB3ZSBzaG91bGQgYWx3YXlzIGdvIGJhY2sgdG8gdGhlIGZpcnN0IHBhZ2UgYW5kIHJlY2FsY3VsYXRpb24gdGhlIEZyb20tVG8gaW5kZXhlc1xyXG4gICAgICBpZiAoaXNQYWdlTnVtYmVyUmVzZXQgfHwgdGhpcy50b3RhbEl0ZW1zICE9PSBwYWdpbmF0aW9uLnRvdGFsSXRlbXMpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNGaXJzdFJlbmRlciAmJiBwYWdpbmF0aW9uLnBhZ2VOdW1iZXIgJiYgcGFnaW5hdGlvbi5wYWdlTnVtYmVyID4gMSkge1xyXG4gICAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gcGFnaW5hdGlvbi5wYWdlTnVtYmVyIHx8IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB3aGVuIHBhZ2UgbnVtYmVyIGlzIHNldCB0byAxIHRoZW4gYWxzbyByZXNldCB0aGUgXCJvZmZzZXRcIiBvZiBiYWNrZW5kIHNlcnZpY2VcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID09PSAxKSB7XHJcbiAgICAgICAgICBiYWNrZW5kQXBpLnNlcnZpY2UucmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2FsY3VsYXRlIGFuZCByZWZyZXNoIHRoZSBtdWx0aXBsZSBwcm9wZXJ0aWVzIG9mIHRoZSBwYWdpbmF0aW9uIFVJXHJcbiAgICAgIHRoaXMucGFnaW5hdGlvblBhZ2VTaXplcyA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcztcclxuICAgICAgdGhpcy50b3RhbEl0ZW1zID0gdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtcztcclxuICAgICAgdGhpcy5yZWNhbGN1bGF0ZUZyb21Ub0luZGV4ZXMoKTtcclxuICAgIH1cclxuICAgIHRoaXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIHRoaXMuaXRlbXNQZXJQYWdlKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uUGFnZUNoYW5nZWQoZXZlbnQ6IEV2ZW50IHwgdW5kZWZpbmVkLCBwYWdlTnVtYmVyOiBudW1iZXIpIHtcclxuICAgIHRoaXMucmVjYWxjdWxhdGVGcm9tVG9JbmRleGVzKCk7XHJcblxyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuICAgIGlmICghYmFja2VuZEFwaSB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlIHx8ICFiYWNrZW5kQXBpLnByb2Nlc3MpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWNrZW5kU2VydmljZUFwaSByZXF1aXJlcyBhdCBsZWFzdCBhIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGFuZCBhIFwic2VydmljZVwiIGRlZmluZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kYXRhVG8gPiB0aGlzLnRvdGFsSXRlbXMpIHtcclxuICAgICAgdGhpcy5kYXRhVG8gPSB0aGlzLnRvdGFsSXRlbXM7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxJdGVtcyA8IHRoaXMuaXRlbXNQZXJQYWdlKSB7XHJcbiAgICAgIHRoaXMuZGF0YVRvID0gdGhpcy50b3RhbEl0ZW1zO1xyXG4gICAgfVxyXG4gICAgaWYgKGJhY2tlbmRBcGkpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBpdGVtc1BlclBhZ2UgPSArdGhpcy5pdGVtc1BlclBhZ2U7XHJcblxyXG4gICAgICAgIC8vIGtlZXAgc3RhcnQgdGltZSAmIGVuZCB0aW1lc3RhbXBzICYgcmV0dXJuIGl0IGFmdGVyIHByb2Nlc3MgZXhlY3V0aW9uXHJcbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xyXG4gICAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBxdWVyeSA9IGJhY2tlbmRBcGkuc2VydmljZS5wcm9jZXNzT25QYWdpbmF0aW9uQ2hhbmdlZChldmVudCwgeyBuZXdQYWdlOiBwYWdlTnVtYmVyLCBwYWdlU2l6ZTogaXRlbXNQZXJQYWdlIH0pO1xyXG5cclxuICAgICAgICAvLyB0aGUgcHJvY2VzcyBjb3VsZCBiZSBhbiBPYnNlcnZhYmxlIChsaWtlIEh0dHBDbGllbnQpIG9yIGEgUHJvbWlzZVxyXG4gICAgICAgIC8vIGluIGFueSBjYXNlLCB3ZSBuZWVkIHRvIGhhdmUgYSBQcm9taXNlIHNvIHRoYXQgd2UgY2FuIGF3YWl0IG9uIGl0IChpZiBhbiBPYnNlcnZhYmxlLCBjb252ZXJ0IGl0IHRvIFByb21pc2UpXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZU9yUHJvbWlzZSA9IGJhY2tlbmRBcGkucHJvY2VzcyhxdWVyeSk7XHJcbiAgICAgICAgY29uc3QgcHJvY2Vzc1Jlc3VsdCA9IGF3YWl0IGNhc3RUb1Byb21pc2Uob2JzZXJ2YWJsZU9yUHJvbWlzZSk7XHJcbiAgICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgIC8vIGZyb20gdGhlIHJlc3VsdCwgY2FsbCBvdXIgaW50ZXJuYWwgcG9zdCBwcm9jZXNzIHRvIHVwZGF0ZSB0aGUgRGF0YXNldCBhbmQgUGFnaW5hdGlvbiBpbmZvXHJcbiAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgJiYgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKSB7XHJcbiAgICAgICAgICBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZW5kIHRoZSByZXNwb25zZSBwcm9jZXNzIHRvIHRoZSBwb3N0UHJvY2VzcyBjYWxsYmFja1xyXG4gICAgICAgIGlmIChiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKSB7XHJcbiAgICAgICAgICBpZiAocHJvY2Vzc1Jlc3VsdCBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgICBwcm9jZXNzUmVzdWx0LnN0YXRpc3RpY3MgPSB7XHJcbiAgICAgICAgICAgICAgc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgIGVuZFRpbWUsXHJcbiAgICAgICAgICAgICAgZXhlY3V0aW9uVGltZTogZW5kVGltZS52YWx1ZU9mKCkgLSBzdGFydFRpbWUudmFsdWVPZigpLFxyXG4gICAgICAgICAgICAgIGl0ZW1Db3VudDogdGhpcy50b3RhbEl0ZW1zLFxyXG4gICAgICAgICAgICAgIHRvdGFsSXRlbUNvdW50OiB0aGlzLnRvdGFsSXRlbXNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJhY2tlbmRBcGkucG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5vbkVycm9yKSB7XHJcbiAgICAgICAgICBiYWNrZW5kQXBpLm9uRXJyb3IoZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhZ2luYXRpb24gd2l0aCBhIGJhY2tlbmQgc2VydmljZSByZXF1aXJlcyBcIkJhY2tlbmRTZXJ2aWNlQXBpXCIgdG8gYmUgZGVmaW5lZCBpbiB5b3VyIGdyaWQgb3B0aW9ucycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVtaXQgdGhlIGNoYW5nZXMgdG8gdGhlIHBhcmVudCBjb21wb25lbnRcclxuICAgIHRoaXMub25QYWdpbmF0aW9uQ2hhbmdlZC5lbWl0KHtcclxuICAgICAgcGFnZU51bWJlcjogdGhpcy5wYWdlTnVtYmVyLFxyXG4gICAgICBwYWdlU2l6ZXM6IHRoaXMucGFnaW5hdGlvblBhZ2VTaXplcyxcclxuICAgICAgcGFnZVNpemU6IHRoaXMuaXRlbXNQZXJQYWdlLFxyXG4gICAgICB0b3RhbEl0ZW1zOiB0aGlzLnRvdGFsSXRlbXNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVjYWxjdWxhdGVGcm9tVG9JbmRleGVzKCkge1xyXG4gICAgaWYgKHRoaXMudG90YWxJdGVtcyA9PT0gMCkge1xyXG4gICAgICB0aGlzLmRhdGFGcm9tID0gMDtcclxuICAgICAgdGhpcy5kYXRhVG8gPSAwO1xyXG4gICAgICB0aGlzLnBhZ2VOdW1iZXIgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kYXRhRnJvbSA9ICh0aGlzLnBhZ2VOdW1iZXIgKiB0aGlzLml0ZW1zUGVyUGFnZSkgLSB0aGlzLml0ZW1zUGVyUGFnZSArIDE7XHJcbiAgICAgIHRoaXMuZGF0YVRvID0gKHRoaXMudG90YWxJdGVtcyA8IHRoaXMuaXRlbXNQZXJQYWdlKSA/IHRoaXMudG90YWxJdGVtcyA6ICh0aGlzLnBhZ2VOdW1iZXIgKiB0aGlzLml0ZW1zUGVyUGFnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==