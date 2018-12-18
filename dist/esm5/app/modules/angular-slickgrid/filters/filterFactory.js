/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SlickgridConfig } from '../slickgrid-config';
import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from '../services/collection.service';
var FilterFactory = /** @class */ (function () {
    function FilterFactory(config, translate, collectionService) {
        this.config = config;
        this.translate = translate;
        this.collectionService = collectionService;
        this._options = this.config.options;
    }
    // Uses the User model to create a new User
    // Uses the User model to create a new User
    /**
     * @param {?} columnFilter
     * @return {?}
     */
    FilterFactory.prototype.createFilter = 
    // Uses the User model to create a new User
    /**
     * @param {?} columnFilter
     * @return {?}
     */
    function (columnFilter) {
        /** @type {?} */
        var filter;
        if (columnFilter && columnFilter.model) {
            filter = typeof columnFilter.model === 'function' ? new columnFilter.model(this.translate, this.collectionService) : columnFilter.model;
        }
        // fallback to the default filter
        if (!filter && this._options.defaultFilter) {
            filter = new this._options.defaultFilter(this.translate, this.collectionService);
        }
        return filter;
    };
    FilterFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilterFactory.ctorParameters = function () { return [
        { type: SlickgridConfig },
        { type: TranslateService },
        { type: CollectionService }
    ]; };
    return FilterFactory;
}());
export { FilterFactory };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVycy9maWx0ZXJGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQVksVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVuRTtJQU9FLHVCQUFvQixNQUF1QixFQUFVLFNBQTJCLEVBQVUsaUJBQW9DO1FBQTFHLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQzVILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUVELDJDQUEyQzs7Ozs7O0lBQzNDLG9DQUFZOzs7Ozs7SUFBWixVQUFhLFlBQXNDOztZQUM3QyxNQUEwQjtRQUU5QixJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQ3RDLE1BQU0sR0FBRyxPQUFPLFlBQVksQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztTQUN6STtRQUVELGlDQUFpQztRQUNqQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQzFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDbEY7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztnQkF6QkYsVUFBVTs7OztnQkFKRixlQUFlO2dCQUNmLGdCQUFnQjtnQkFDaEIsaUJBQWlCOztJQTRCMUIsb0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXpCWSxhQUFhOzs7Ozs7O0lBSXhCLGlDQUFzQjs7Ozs7SUFFViwrQkFBK0I7Ozs7O0lBQUUsa0NBQW1DOzs7OztJQUFFLDBDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdG9yLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4uL21vZGVscy9maWx0ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQ29sdW1uRmlsdGVyIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgU2xpY2tncmlkQ29uZmlnIH0gZnJvbSAnLi4vc2xpY2tncmlkLWNvbmZpZyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyRmFjdG9yeSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIG9wdGlvbnMgZnJvbSB0aGUgU2xpY2tncmlkQ29uZmlnXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogU2xpY2tncmlkQ29uZmlnLCBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSwgcHJpdmF0ZSBjb2xsZWN0aW9uU2VydmljZTogQ29sbGVjdGlvblNlcnZpY2UpIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgLy8gVXNlcyB0aGUgVXNlciBtb2RlbCB0byBjcmVhdGUgYSBuZXcgVXNlclxyXG4gIGNyZWF0ZUZpbHRlcihjb2x1bW5GaWx0ZXI6IENvbHVtbkZpbHRlciB8IHVuZGVmaW5lZCk6IEZpbHRlciB8IHVuZGVmaW5lZCB7XHJcbiAgICBsZXQgZmlsdGVyOiBGaWx0ZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgaWYgKGNvbHVtbkZpbHRlciAmJiBjb2x1bW5GaWx0ZXIubW9kZWwpIHtcclxuICAgICAgZmlsdGVyID0gdHlwZW9mIGNvbHVtbkZpbHRlci5tb2RlbCA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBjb2x1bW5GaWx0ZXIubW9kZWwodGhpcy50cmFuc2xhdGUsIHRoaXMuY29sbGVjdGlvblNlcnZpY2UpIDogY29sdW1uRmlsdGVyLm1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZhbGxiYWNrIHRvIHRoZSBkZWZhdWx0IGZpbHRlclxyXG4gICAgaWYgKCFmaWx0ZXIgJiYgdGhpcy5fb3B0aW9ucy5kZWZhdWx0RmlsdGVyKSB7XHJcbiAgICAgIGZpbHRlciA9IG5ldyB0aGlzLl9vcHRpb25zLmRlZmF1bHRGaWx0ZXIodGhpcy50cmFuc2xhdGUsIHRoaXMuY29sbGVjdGlvblNlcnZpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaWx0ZXI7XHJcbiAgfVxyXG59XHJcbiJdfQ==