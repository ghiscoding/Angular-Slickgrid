/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SlickgridConfig } from '../slickgrid-config';
import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from '../services/collection.service';
export class FilterFactory {
    /**
     * @param {?} config
     * @param {?} translate
     * @param {?} collectionService
     */
    constructor(config, translate, collectionService) {
        this.config = config;
        this.translate = translate;
        this.collectionService = collectionService;
        this._options = this.config.options;
    }
    // Uses the User model to create a new User
    /**
     * @param {?} columnFilter
     * @return {?}
     */
    createFilter(columnFilter) {
        /** @type {?} */
        let filter;
        if (columnFilter && columnFilter.model) {
            filter = typeof columnFilter.model === 'function' ? new columnFilter.model(this.translate, this.collectionService) : columnFilter.model;
        }
        // fallback to the default filter
        if (!filter && this._options.defaultFilter) {
            filter = new this._options.defaultFilter(this.translate, this.collectionService);
        }
        return filter;
    }
}
FilterFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FilterFactory.ctorParameters = () => [
    { type: SlickgridConfig },
    { type: TranslateService },
    { type: CollectionService }
];
if (false) {
    /**
     * The options from the SlickgridConfig
     * @type {?}
     * @private
     */
    FilterFactory.prototype._options;
    /**
     * @type {?}
     * @private
     */
    FilterFactory.prototype.config;
    /**
     * @type {?}
     * @private
     */
    FilterFactory.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    FilterFactory.prototype.collectionService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVycy9maWx0ZXJGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQVksVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUduRSxNQUFNLE9BQU8sYUFBYTs7Ozs7O0lBTXhCLFlBQW9CLE1BQXVCLEVBQVUsU0FBMkIsRUFBVSxpQkFBb0M7UUFBMUcsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDNUgsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN0QyxDQUFDOzs7Ozs7SUFHRCxZQUFZLENBQUMsWUFBc0M7O1lBQzdDLE1BQTBCO1FBRTlCLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUU7WUFDdEMsTUFBTSxHQUFHLE9BQU8sWUFBWSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1NBQ3pJO1FBRUQsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDMUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNsRjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7OztZQXpCRixVQUFVOzs7O1lBSkYsZUFBZTtZQUNmLGdCQUFnQjtZQUNoQixpQkFBaUI7Ozs7Ozs7O0lBT3hCLGlDQUFzQjs7Ozs7SUFFViwrQkFBK0I7Ozs7O0lBQUUsa0NBQW1DOzs7OztJQUFFLDBDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdG9yLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4uL21vZGVscy9maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29sdW1uRmlsdGVyIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgU2xpY2tncmlkQ29uZmlnIH0gZnJvbSAnLi4vc2xpY2tncmlkLWNvbmZpZyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyRmFjdG9yeSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIG9wdGlvbnMgZnJvbSB0aGUgU2xpY2tncmlkQ29uZmlnXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogU2xpY2tncmlkQ29uZmlnLCBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSBjb2xsZWN0aW9uU2VydmljZTogQ29sbGVjdGlvblNlcnZpY2UpIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgLy8gVXNlcyB0aGUgVXNlciBtb2RlbCB0byBjcmVhdGUgYSBuZXcgVXNlclxyXG4gIGNyZWF0ZUZpbHRlcihjb2x1bW5GaWx0ZXI6IENvbHVtbkZpbHRlciB8IHVuZGVmaW5lZCk6IEZpbHRlciB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgZmlsdGVyOiBGaWx0ZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgaWYgKGNvbHVtbkZpbHRlciAmJiBjb2x1bW5GaWx0ZXIubW9kZWwpIHtcclxuICAgICAgZmlsdGVyID0gdHlwZW9mIGNvbHVtbkZpbHRlci5tb2RlbCA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBjb2x1bW5GaWx0ZXIubW9kZWwodGhpcy50cmFuc2xhdGUsIHRoaXMuY29sbGVjdGlvblNlcnZpY2UpIDogY29sdW1uRmlsdGVyLm1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZhbGxiYWNrIHRvIHRoZSBkZWZhdWx0IGZpbHRlclxyXG4gICAgaWYgKCFmaWx0ZXIgJiYgdGhpcy5fb3B0aW9ucy5kZWZhdWx0RmlsdGVyKSB7XHJcbiAgICAgIGZpbHRlciA9IG5ldyB0aGlzLl9vcHRpb25zLmRlZmF1bHRGaWx0ZXIodGhpcy50cmFuc2xhdGUsIHRoaXMuY29sbGVjdGlvblNlcnZpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaWx0ZXI7XHJcbiAgfVxyXG59XHJcbiJdfQ==