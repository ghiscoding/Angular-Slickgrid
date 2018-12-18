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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2NvbXBvbmVudHMvc2xpY2stcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVFwRCxNQUFNLE9BQU8sd0JBQXdCOzs7OztJQTZCbkMsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUExQnhDLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7UUFjL0QsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFFWCxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFZix3QkFBbUIsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsaUJBQVksR0FBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFHdEMsQ0FBQzs7Ozs7SUF2QnJELElBQ0kscUJBQXFCLENBQUMscUJBQWlDO1FBQ3pELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxxQkFBcUIsQ0FBQztRQUNw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QUc5RSxpREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi8uLi9tb2RlbHMvcGFnaW5hdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY2FzdFRvUHJvbWlzZSB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcbmltcG9ydCB7IEdyaWRPcHRpb24gfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9pbmRleCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2xpY2stcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zbGljay1wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJ1xufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTbGlja1BhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9maWx0ZXJTdWJjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9ncmlkUGFnaW5hdGlvbk9wdGlvbnM6IEdyaWRPcHRpb247XG4gIHByaXZhdGUgX2lzRmlyc3RSZW5kZXIgPSB0cnVlO1xuICBAT3V0cHV0KCkgb25QYWdpbmF0aW9uQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnaW5hdGlvbj4oKTtcblxuICBASW5wdXQoKVxuICBzZXQgZ3JpZFBhZ2luYXRpb25PcHRpb25zKGdyaWRQYWdpbmF0aW9uT3B0aW9uczogR3JpZE9wdGlvbikge1xuICAgIHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucyA9IGdyaWRQYWdpbmF0aW9uT3B0aW9ucztcbiAgICBpZiAodGhpcy5faXNGaXJzdFJlbmRlciB8fCAhZ3JpZFBhZ2luYXRpb25PcHRpb25zIHx8ICFncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbiB8fCAoZ3JpZFBhZ2luYXRpb25PcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtcyAhPT0gdGhpcy50b3RhbEl0ZW1zKSkge1xuICAgICAgdGhpcy5yZWZyZXNoUGFnaW5hdGlvbigpO1xuICAgICAgdGhpcy5faXNGaXJzdFJlbmRlciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBnZXQgZ3JpZFBhZ2luYXRpb25PcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnM7XG4gIH1cbiAgQElucHV0KCkgZ3JpZDogYW55O1xuICBkYXRhRnJvbSA9IDE7XG4gIGRhdGFUbyA9IDE7XG4gIGl0ZW1zUGVyUGFnZTogbnVtYmVyO1xuICBwYWdlQ291bnQgPSAwO1xuICBwYWdlTnVtYmVyID0gMTtcbiAgdG90YWxJdGVtcyA9IDA7XG4gIHBhZ2luYXRpb25DYWxsYmFjazogRnVuY3Rpb247XG4gIHBhZ2luYXRpb25QYWdlU2l6ZXMgPSBbMjUsIDc1LCAxMDBdO1xuICBmcm9tVG9QYXJhbXM6IGFueSA9IHsgZnJvbTogdGhpcy5kYXRhRnJvbSwgdG86IHRoaXMuZGF0YVRvLCB0b3RhbEl0ZW1zOiB0aGlzLnRvdGFsSXRlbXMgfTtcblxuICAvKiogQ29uc3RydWN0b3IgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlKSB7IH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnM7XG4gICAgaWYgKCF0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMgfHwgIXRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uIHx8ICh0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zICE9PSB0aGlzLnRvdGFsSXRlbXMpKSB7XG4gICAgICB0aGlzLnJlZnJlc2hQYWdpbmF0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gU3Vic2NyaWJlIHRvIEV2ZW50IEVtaXR0ZXIgb2YgRmlsdGVyICYgU29ydCBjaGFuZ2VkLCBnbyBiYWNrIHRvIHBhZ2UgMSB3aGVuIHRoYXQgaGFwcGVuXG4gICAgdGhpcy5fZmlsdGVyU3ViY3JpcHRpb24gPSB0aGlzLmZpbHRlclNlcnZpY2Uub25GaWx0ZXJDaGFuZ2VkLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5yZWZyZXNoUGFnaW5hdGlvbih0cnVlKTtcbiAgICB9KTtcbiAgICAvLyBTdWJzY3JpYmUgdG8gRmlsdGVyIGNsZWFyIGFuZCBnbyBiYWNrIHRvIHBhZ2UgMSB3aGVuIHRoYXQgaGFwcGVuXG4gICAgdGhpcy5fZmlsdGVyU3ViY3JpcHRpb24gPSB0aGlzLmZpbHRlclNlcnZpY2Uub25GaWx0ZXJDbGVhcmVkLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5yZWZyZXNoUGFnaW5hdGlvbih0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNlaWwobnVtYmVyOiBudW1iZXIpIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKG51bWJlcik7XG4gIH1cblxuICBjaGFuZ2VUb0ZpcnN0UGFnZShldmVudDogYW55KSB7XG4gICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcbiAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XG4gIH1cblxuICBjaGFuZ2VUb0xhc3RQYWdlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnBhZ2VOdW1iZXIgPSB0aGlzLnBhZ2VDb3VudDtcbiAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XG4gIH1cblxuICBjaGFuZ2VUb05leHRQYWdlKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5wYWdlTnVtYmVyIDwgdGhpcy5wYWdlQ291bnQpIHtcbiAgICAgIHRoaXMucGFnZU51bWJlcisrO1xuICAgICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZVRvUHJldmlvdXNQYWdlKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5wYWdlTnVtYmVyID4gMCkge1xuICAgICAgdGhpcy5wYWdlTnVtYmVyLS07XG4gICAgICB0aGlzLm9uUGFnZUNoYW5nZWQoZXZlbnQsIHRoaXMucGFnZU51bWJlcik7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlVG9DdXJyZW50UGFnZShldmVudDogYW55KSB7XG4gICAgdGhpcy5wYWdlTnVtYmVyID0gK2V2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgaWYgKHRoaXMucGFnZU51bWJlciA8IDEpIHtcbiAgICAgIHRoaXMucGFnZU51bWJlciA9IDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhZ2VOdW1iZXIgPiB0aGlzLnBhZ2VDb3VudCkge1xuICAgICAgdGhpcy5wYWdlTnVtYmVyID0gdGhpcy5wYWdlQ291bnQ7XG4gICAgfVxuXG4gICAgdGhpcy5vblBhZ2VDaGFuZ2VkKGV2ZW50LCB0aGlzLnBhZ2VOdW1iZXIpO1xuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLm9uUGFnaW5hdGlvbkNoYW5nZWQudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5fZmlsdGVyU3ViY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX2ZpbHRlclN1YmNyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgb25DaGFuZ2VJdGVtUGVyUGFnZShldmVudDogYW55KSB7XG4gICAgY29uc3QgaXRlbXNQZXJQYWdlID0gK2V2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGlzLnRvdGFsSXRlbXMgLyBpdGVtc1BlclBhZ2UpO1xuICAgIHRoaXMucGFnZU51bWJlciA9ICh0aGlzLnRvdGFsSXRlbXMgPiAwKSA/IDEgOiAwO1xuICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gaXRlbXNQZXJQYWdlO1xuICAgIHRoaXMub25QYWdlQ2hhbmdlZChldmVudCwgdGhpcy5wYWdlTnVtYmVyKTtcbiAgfVxuXG4gIHJlZnJlc2hQYWdpbmF0aW9uKGlzUGFnZU51bWJlclJlc2V0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xuICAgIGlmICghYmFja2VuZEFwaSB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlIHx8ICFiYWNrZW5kQXBpLnByb2Nlc3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucyAmJiB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbikge1xuICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IHRoaXMuX2dyaWRQYWdpbmF0aW9uT3B0aW9ucy5wYWdpbmF0aW9uO1xuICAgICAgLy8gc2V0IHRoZSBudW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2UgaWYgbm90IGFscmVhZHkgc2V0XG4gICAgICBpZiAoIXRoaXMuaXRlbXNQZXJQYWdlKSB7XG4gICAgICAgIHRoaXMuaXRlbXNQZXJQYWdlID0gKygoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLm9wdGlvbnMgJiYgYmFja2VuZEFwaS5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zICYmIGJhY2tlbmRBcGkub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucy5maXJzdCkgPyBiYWNrZW5kQXBpLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMuZmlyc3QgOiB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbi5wYWdlU2l6ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRvdGFsSXRlbXMgY2hhbmdlZCwgd2Ugc2hvdWxkIGFsd2F5cyBnbyBiYWNrIHRvIHRoZSBmaXJzdCBwYWdlIGFuZCByZWNhbGN1bGF0aW9uIHRoZSBGcm9tLVRvIGluZGV4ZXNcbiAgICAgIGlmIChpc1BhZ2VOdW1iZXJSZXNldCB8fCB0aGlzLnRvdGFsSXRlbXMgIT09IHBhZ2luYXRpb24udG90YWxJdGVtcykge1xuICAgICAgICBpZiAodGhpcy5faXNGaXJzdFJlbmRlciAmJiBwYWdpbmF0aW9uLnBhZ2VOdW1iZXIgJiYgcGFnaW5hdGlvbi5wYWdlTnVtYmVyID4gMSkge1xuICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IHBhZ2luYXRpb24ucGFnZU51bWJlciB8fCAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIHBhZ2UgbnVtYmVyIGlzIHNldCB0byAxIHRoZW4gYWxzbyByZXNldCB0aGUgXCJvZmZzZXRcIiBvZiBiYWNrZW5kIHNlcnZpY2VcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA9PT0gMSkge1xuICAgICAgICAgIGJhY2tlbmRBcGkuc2VydmljZS5yZXNldFBhZ2luYXRpb25PcHRpb25zKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2FsY3VsYXRlIGFuZCByZWZyZXNoIHRoZSBtdWx0aXBsZSBwcm9wZXJ0aWVzIG9mIHRoZSBwYWdpbmF0aW9uIFVJXG4gICAgICB0aGlzLnBhZ2luYXRpb25QYWdlU2l6ZXMgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbi5wYWdlU2l6ZXM7XG4gICAgICB0aGlzLnRvdGFsSXRlbXMgPSB0aGlzLl9ncmlkUGFnaW5hdGlvbk9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zO1xuICAgICAgdGhpcy5yZWNhbGN1bGF0ZUZyb21Ub0luZGV4ZXMoKTtcbiAgICB9XG4gICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy50b3RhbEl0ZW1zIC8gdGhpcy5pdGVtc1BlclBhZ2UpO1xuICB9XG5cbiAgYXN5bmMgb25QYWdlQ2hhbmdlZChldmVudDogRXZlbnQgfCB1bmRlZmluZWQsIHBhZ2VOdW1iZXI6IG51bWJlcikge1xuICAgIHRoaXMucmVjYWxjdWxhdGVGcm9tVG9JbmRleGVzKCk7XG5cbiAgICBjb25zdCBiYWNrZW5kQXBpID0gdGhpcy5fZ3JpZFBhZ2luYXRpb25PcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xuICAgIGlmICghYmFja2VuZEFwaSB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlIHx8ICFiYWNrZW5kQXBpLnByb2Nlc3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGF0YVRvID4gdGhpcy50b3RhbEl0ZW1zKSB7XG4gICAgICB0aGlzLmRhdGFUbyA9IHRoaXMudG90YWxJdGVtcztcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxJdGVtcyA8IHRoaXMuaXRlbXNQZXJQYWdlKSB7XG4gICAgICB0aGlzLmRhdGFUbyA9IHRoaXMudG90YWxJdGVtcztcbiAgICB9XG4gICAgaWYgKGJhY2tlbmRBcGkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zUGVyUGFnZSA9ICt0aGlzLml0ZW1zUGVyUGFnZTtcblxuICAgICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxuICAgICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIGlmIChiYWNrZW5kQXBpLnByZVByb2Nlc3MpIHtcbiAgICAgICAgICBiYWNrZW5kQXBpLnByZVByb2Nlc3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gYmFja2VuZEFwaS5zZXJ2aWNlLnByb2Nlc3NPblBhZ2luYXRpb25DaGFuZ2VkKGV2ZW50LCB7IG5ld1BhZ2U6IHBhZ2VOdW1iZXIsIHBhZ2VTaXplOiBpdGVtc1BlclBhZ2UgfSk7XG5cbiAgICAgICAgLy8gdGhlIHByb2Nlc3MgY291bGQgYmUgYW4gT2JzZXJ2YWJsZSAobGlrZSBIdHRwQ2xpZW50KSBvciBhIFByb21pc2VcbiAgICAgICAgLy8gaW4gYW55IGNhc2UsIHdlIG5lZWQgdG8gaGF2ZSBhIFByb21pc2Ugc28gdGhhdCB3ZSBjYW4gYXdhaXQgb24gaXQgKGlmIGFuIE9ic2VydmFibGUsIGNvbnZlcnQgaXQgdG8gUHJvbWlzZSlcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZU9yUHJvbWlzZSA9IGJhY2tlbmRBcGkucHJvY2VzcyhxdWVyeSk7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NSZXN1bHQgPSBhd2FpdCBjYXN0VG9Qcm9taXNlKG9ic2VydmFibGVPclByb21pc2UpO1xuICAgICAgICBjb25zdCBlbmRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgICAgICAvLyBmcm9tIHRoZSByZXN1bHQsIGNhbGwgb3VyIGludGVybmFsIHBvc3QgcHJvY2VzcyB0byB1cGRhdGUgdGhlIERhdGFzZXQgYW5kIFBhZ2luYXRpb24gaW5mb1xuICAgICAgICBpZiAocHJvY2Vzc1Jlc3VsdCAmJiBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MpIHtcbiAgICAgICAgICBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZW5kIHRoZSByZXNwb25zZSBwcm9jZXNzIHRvIHRoZSBwb3N0UHJvY2VzcyBjYWxsYmFja1xuICAgICAgICBpZiAoYmFja2VuZEFwaS5wb3N0UHJvY2Vzcykge1xuICAgICAgICAgIGlmIChwcm9jZXNzUmVzdWx0IGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBwcm9jZXNzUmVzdWx0LnN0YXRpc3RpY3MgPSB7XG4gICAgICAgICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgZW5kVGltZSxcbiAgICAgICAgICAgICAgZXhlY3V0aW9uVGltZTogZW5kVGltZS52YWx1ZU9mKCkgLSBzdGFydFRpbWUudmFsdWVPZigpLFxuICAgICAgICAgICAgICBpdGVtQ291bnQ6IHRoaXMudG90YWxJdGVtcyxcbiAgICAgICAgICAgICAgdG90YWxJdGVtQ291bnQ6IHRoaXMudG90YWxJdGVtc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYmFja2VuZEFwaS5wb3N0UHJvY2Vzcyhwcm9jZXNzUmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLm9uRXJyb3IpIHtcbiAgICAgICAgICBiYWNrZW5kQXBpLm9uRXJyb3IoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhZ2luYXRpb24gd2l0aCBhIGJhY2tlbmQgc2VydmljZSByZXF1aXJlcyBcIkJhY2tlbmRTZXJ2aWNlQXBpXCIgdG8gYmUgZGVmaW5lZCBpbiB5b3VyIGdyaWQgb3B0aW9ucycpO1xuICAgIH1cblxuICAgIC8vIGVtaXQgdGhlIGNoYW5nZXMgdG8gdGhlIHBhcmVudCBjb21wb25lbnRcbiAgICB0aGlzLm9uUGFnaW5hdGlvbkNoYW5nZWQuZW1pdCh7XG4gICAgICBwYWdlTnVtYmVyOiB0aGlzLnBhZ2VOdW1iZXIsXG4gICAgICBwYWdlU2l6ZXM6IHRoaXMucGFnaW5hdGlvblBhZ2VTaXplcyxcbiAgICAgIHBhZ2VTaXplOiB0aGlzLml0ZW1zUGVyUGFnZSxcbiAgICAgIHRvdGFsSXRlbXM6IHRoaXMudG90YWxJdGVtc1xuICAgIH0pO1xuICB9XG5cbiAgcmVjYWxjdWxhdGVGcm9tVG9JbmRleGVzKCkge1xuICAgIGlmICh0aGlzLnRvdGFsSXRlbXMgPT09IDApIHtcbiAgICAgIHRoaXMuZGF0YUZyb20gPSAwO1xuICAgICAgdGhpcy5kYXRhVG8gPSAwO1xuICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRhRnJvbSA9ICh0aGlzLnBhZ2VOdW1iZXIgKiB0aGlzLml0ZW1zUGVyUGFnZSkgLSB0aGlzLml0ZW1zUGVyUGFnZSArIDE7XG4gICAgICB0aGlzLmRhdGFUbyA9ICh0aGlzLnRvdGFsSXRlbXMgPCB0aGlzLml0ZW1zUGVyUGFnZSkgPyB0aGlzLnRvdGFsSXRlbXMgOiAodGhpcy5wYWdlTnVtYmVyICogdGhpcy5pdGVtc1BlclBhZ2UpO1xuICAgIH1cbiAgfVxufVxuIl19