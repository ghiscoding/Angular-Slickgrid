/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SharedService } from '../services/shared.service';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { Injectable } from '@angular/core';
var DraggableGroupingExtension = /** @class */ (function () {
    function DraggableGroupingExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    DraggableGroupingExtension.prototype.dispose = /**
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
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     */
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} gridOptions
     * @return {?}
     */
    DraggableGroupingExtension.prototype.create = /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        // dynamically import the SlickGrid plugin with requireJS
        this.extensionUtility.loadExtensionDynamically(ExtensionName.draggableGrouping);
        if (!this._extension && gridOptions) {
            this._extension = new Slick.DraggableGrouping(gridOptions.draggableGrouping || {});
        }
        return this._extension;
    };
    /**
     * @return {?}
     */
    DraggableGroupingExtension.prototype.register = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            this.sharedService.grid.registerPlugin(this._extension);
            // Events
            if (this.sharedService.grid && this.sharedService.gridOptions.draggableGrouping) {
                if (this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered) {
                    this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered(this._extension);
                }
                this._eventHandler.subscribe(this._extension.onGroupChanged, function (e, args) {
                    if (_this.sharedService.gridOptions.draggableGrouping && typeof _this.sharedService.gridOptions.draggableGrouping.onGroupChanged === 'function') {
                        _this.sharedService.gridOptions.draggableGrouping.onGroupChanged(e, args);
                    }
                });
            }
            return this._extension;
        }
        return null;
    };
    DraggableGroupingExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DraggableGroupingExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService }
    ]; };
    return DraggableGroupingExtension;
}());
export { DraggableGroupingExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DraggableGroupingExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    DraggableGroupingExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    DraggableGroupingExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    DraggableGroupingExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQWEsYUFBYSxFQUF3QixNQUFNLGlCQUFpQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLM0M7SUFLRSxvQ0FBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSHBGLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFHMEMsQ0FBQzs7OztJQUVqRyw0Q0FBTzs7O0lBQVA7UUFDRSxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVwQyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCwyQ0FBTTs7Ozs7O0lBQU4sVUFBTyxXQUF1QjtRQUM1Qix5REFBeUQ7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWhGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLFdBQVcsRUFBRTtZQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNwRjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsNkNBQVE7OztJQUFSO1FBQUEsaUJBbUJDO1FBbEJDLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUNuRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhELFNBQVM7WUFDVCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFO2dCQUMvRSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixFQUFFO29CQUMxRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3pGO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLFVBQUMsQ0FBTSxFQUFFLElBQW1EO29CQUN2SCxJQUFJLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixJQUFJLE9BQU8sS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsY0FBYyxLQUFLLFVBQVUsRUFBRTt3QkFDN0ksS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDMUU7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Z0JBakRGLFVBQVU7Ozs7Z0JBTkYsZ0JBQWdCO2dCQUZoQixhQUFhOztJQTBEdEIsaUNBQUM7Q0FBQSxBQWxERCxJQWtEQztTQWpEWSwwQkFBMEI7Ozs7OztJQUNyQyxtREFBc0Q7Ozs7O0lBQ3RELGdEQUF3Qjs7Ozs7SUFFWixzREFBMEM7Ozs7O0lBQUUsbURBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uLCBFeHRlbnNpb25OYW1lLCBHcmlkT3B0aW9uLCBHcm91cGluZyB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBFeHRlbnNpb25VdGlsaXR5IH0gZnJvbSAnLi9leHRlbnNpb25VdGlsaXR5JztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XG4gIHByaXZhdGUgX2V4dGVuc2lvbjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSwgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlKSB7IH1cblxuICBkaXNwb3NlKCkge1xuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XG5cbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uICYmIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KSB7XG4gICAgICB0aGlzLl9leHRlbnNpb24uZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2gvQ3JlYXRlIGRpZmZlcmVudCBwbHVnaW5zIGJlZm9yZSB0aGUgR3JpZCBjcmVhdGlvbi5cbiAgICogRm9yIGV4YW1wbGUgdGhlIG11bHRpLXNlbGVjdCBoYXZlIHRvIGJlIGFkZGVkIHRvIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBiZWZvcmUgdGhlIGdyaWQgaXMgY3JlYXRlZCB0byB3b3JrIHByb3Blcmx5XG4gICAqL1xuICBjcmVhdGUoZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pIHtcbiAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gd2l0aCByZXF1aXJlSlNcbiAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuZHJhZ2dhYmxlR3JvdXBpbmcpO1xuXG4gICAgaWYgKCF0aGlzLl9leHRlbnNpb24gJiYgZ3JpZE9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5EcmFnZ2FibGVHcm91cGluZyhncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZyB8fCB7fSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XG4gIH1cblxuICByZWdpc3RlcigpOiBhbnkge1xuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5yZWdpc3RlclBsdWdpbih0aGlzLl9leHRlbnNpb24pO1xuXG4gICAgICAvLyBFdmVudHNcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZy5vbkV4dGVuc2lvblJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcub25FeHRlbnNpb25SZWdpc3RlcmVkKHRoaXMuX2V4dGVuc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25Hcm91cENoYW5nZWQsIChlOiBhbnksIGFyZ3M6IHsgY2FsbGVyPzogc3RyaW5nOyBncm91cENvbHVtbnM6IEdyb3VwaW5nW10gfSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZy5vbkdyb3VwQ2hhbmdlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmRyYWdnYWJsZUdyb3VwaW5nLm9uR3JvdXBDaGFuZ2VkKGUsIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=