/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
var RowMoveManagerExtension = /** @class */ (function () {
    function RowMoveManagerExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    RowMoveManagerExtension.prototype.dispose = /**
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
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    RowMoveManagerExtension.prototype.register = /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    function (rowSelectionPlugin) {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.rowMoveManager);
            // this also requires the Row Selection Model to be registered as well
            if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
                rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
            }
            this._extension = new Slick.RowMoveManager(this.sharedService.gridOptions.rowMoveManager || { cancelEditOnDrag: true });
            this.sharedService.grid.registerPlugin(this._extension);
            // hook all events
            if (this.sharedService.grid && this.sharedService.gridOptions.rowMoveManager) {
                this._eventHandler.subscribe(this._extension.onBeforeMoveRows, function (e, args) {
                    if (_this.sharedService.gridOptions.rowMoveManager && typeof _this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows === 'function') {
                        _this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onMoveRows, function (e, args) {
                    if (_this.sharedService.gridOptions.rowMoveManager && typeof _this.sharedService.gridOptions.rowMoveManager.onMoveRows === 'function') {
                        _this.sharedService.gridOptions.rowMoveManager.onMoveRows(e, args);
                    }
                });
            }
            return this._extension;
        }
        return null;
    };
    RowMoveManagerExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RowMoveManagerExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService }
    ]; };
    return RowMoveManagerExtension;
}());
export { RowMoveManagerExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    RowMoveManagerExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    RowMoveManagerExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    RowMoveManagerExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    RowMoveManagerExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93TW92ZU1hbmFnZXJFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvcm93TW92ZU1hbmFnZXJFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUF1QixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFLM0Q7SUFLRSxpQ0FBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSHBGLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFHMEMsQ0FBQzs7OztJQUVqRyx5Q0FBTzs7O0lBQVA7UUFDRSxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVwQyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7O0lBRUQsMENBQVE7Ozs7SUFBUixVQUFTLGtCQUF3QjtRQUFqQyxpQkErQkM7UUE5QkMsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQ25GLHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTdFLHNFQUFzRTtZQUN0RSxJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzRSxrQkFBa0IsR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDM0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUMvRDtZQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV4RCxrQkFBa0I7WUFDbEIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUU7Z0JBQzVFLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxDQUFNLEVBQUUsSUFBYztvQkFDcEYsSUFBSSxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLElBQUksT0FBTyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEtBQUssVUFBVSxFQUFFO3dCQUN6SSxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUN6RTtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxVQUFDLENBQU0sRUFBRSxJQUFjO29CQUM5RSxJQUFJLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFBSSxPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO3dCQUNuSSxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDbkU7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Z0JBL0NGLFVBQVU7Ozs7Z0JBTkYsZ0JBQWdCO2dCQUNoQixhQUFhOztJQXFEdEIsOEJBQUM7Q0FBQSxBQWhERCxJQWdEQztTQS9DWSx1QkFBdUI7Ozs7OztJQUNsQyxnREFBc0Q7Ozs7O0lBQ3RELDZDQUF3Qjs7Ozs7SUFFWixtREFBMEM7Ozs7O0lBQUUsZ0RBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDZWxsQXJncywgRXh0ZW5zaW9uLCBFeHRlbnNpb25OYW1lIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbiBpbXBsZW1lbnRzIEV4dGVuc2lvbiB7XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSwgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuXHJcbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uICYmIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlcihyb3dTZWxlY3Rpb25QbHVnaW4/OiBhbnkpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgLy8gZHluYW1pY2FsbHkgaW1wb3J0IHRoZSBTbGlja0dyaWQgcGx1Z2luIHdpdGggcmVxdWlyZUpTXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5yb3dNb3ZlTWFuYWdlcik7XHJcblxyXG4gICAgICAvLyB0aGlzIGFsc28gcmVxdWlyZXMgdGhlIFJvdyBTZWxlY3Rpb24gTW9kZWwgdG8gYmUgcmVnaXN0ZXJlZCBhcyB3ZWxsXHJcbiAgICAgIGlmICghcm93U2VsZWN0aW9uUGx1Z2luIHx8ICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRTZWxlY3Rpb25Nb2RlbCgpKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbik7XHJcbiAgICAgICAgcm93U2VsZWN0aW9uUGx1Z2luID0gbmV3IFNsaWNrLlJvd1NlbGVjdGlvbk1vZGVsKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dTZWxlY3Rpb25PcHRpb25zIHx8IHt9KTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRTZWxlY3Rpb25Nb2RlbChyb3dTZWxlY3Rpb25QbHVnaW4pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9leHRlbnNpb24gPSBuZXcgU2xpY2suUm93TW92ZU1hbmFnZXIodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd01vdmVNYW5hZ2VyIHx8IHsgY2FuY2VsRWRpdE9uRHJhZzogdHJ1ZSB9KTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5fZXh0ZW5zaW9uKTtcclxuXHJcbiAgICAgIC8vIGhvb2sgYWxsIGV2ZW50c1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd01vdmVNYW5hZ2VyKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25CZWZvcmVNb3ZlUm93cywgKGU6IGFueSwgYXJnczogQ2VsbEFyZ3MpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93TW92ZU1hbmFnZXIgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dNb3ZlTWFuYWdlci5vbkJlZm9yZU1vdmVSb3dzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dNb3ZlTWFuYWdlci5vbkJlZm9yZU1vdmVSb3dzKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uTW92ZVJvd3MsIChlOiBhbnksIGFyZ3M6IENlbGxBcmdzKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd01vdmVNYW5hZ2VyICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93TW92ZU1hbmFnZXIub25Nb3ZlUm93cyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93TW92ZU1hbmFnZXIub25Nb3ZlUm93cyhlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==