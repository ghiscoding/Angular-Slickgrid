/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
var ColumnPickerExtension = /** @class */ (function () {
    function ColumnPickerExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    ColumnPickerExtension.prototype.dispose = /**
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
     * @return {?}
     */
    ColumnPickerExtension.prototype.register = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.columnPicker);
            // localization support for the picker
            /** @type {?} */
            var columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
            /** @type {?} */
            var forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
            /** @type {?} */
            var syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
            this.sharedService.gridOptions.columnPicker = this.sharedService.gridOptions.columnPicker || {};
            this.sharedService.gridOptions.columnPicker.columnTitle = this.sharedService.gridOptions.columnPicker.columnTitle || columnTitle;
            this.sharedService.gridOptions.columnPicker.forceFitTitle = this.sharedService.gridOptions.columnPicker.forceFitTitle || forceFitTitle;
            this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.sharedService.gridOptions.columnPicker.syncResizeTitle || syncResizeTitle;
            this._extension = new Slick.Controls.ColumnPicker(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
            if (this.sharedService.grid && this.sharedService.gridOptions.enableColumnPicker) {
                this._eventHandler.subscribe(this._extension.onColumnsChanged, function (e, args) {
                    if (_this.sharedService.gridOptions.columnPicker && typeof _this.sharedService.gridOptions.columnPicker.onColumnsChanged === 'function') {
                        _this.sharedService.gridOptions.columnPicker.onColumnsChanged(e, args);
                    }
                });
            }
            return this._extension;
        }
    };
    /** Translate the Column Picker and it's last 2 checkboxes */
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    ColumnPickerExtension.prototype.translateColumnPicker = /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    function () {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
            if (this.sharedService.gridOptions.columnPicker) {
                this.emptyColumnPickerTitles();
                this.sharedService.gridOptions.columnPicker.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
                this.sharedService.gridOptions.columnPicker.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
                this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
            }
            // translate all columns (including non-visible)
            this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
            // re-initialize the Column Picker, that will recreate all the list
            // doing an "init()" won't drop any existing command attached
            if (this._extension.init) {
                this._extension.init(this.sharedService.grid);
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    ColumnPickerExtension.prototype.emptyColumnPickerTitles = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.columnPicker) {
            this.sharedService.gridOptions.columnPicker.columnTitle = '';
            this.sharedService.gridOptions.columnPicker.forceFitTitle = '';
            this.sharedService.gridOptions.columnPicker.syncResizeTitle = '';
        }
    };
    ColumnPickerExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ColumnPickerExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService }
    ]; };
    return ColumnPickerExtension;
}());
export { ColumnPickerExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ColumnPickerExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    ColumnPickerExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    ColumnPickerExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    ColumnPickerExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uUGlja2VyRXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9leHRlbnNpb25zL2NvbHVtblBpY2tlckV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXVCLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUszRDtJQUtFLCtCQUNVLGdCQUFrQyxFQUNsQyxhQUE0QjtRQUQ1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTDlCLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFNbkQsQ0FBQzs7OztJQUVKLHVDQUFPOzs7SUFBUDtRQUNFLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQUVELHdDQUFROzs7SUFBUjtRQUFBLGlCQXNCQztRQXJCQyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDbkYseURBQXlEO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsWUFB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RyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDbko7WUFDQSxnREFBZ0Q7WUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEYsbUVBQW1FO1lBQ3BFLDZEQUE2RDtZQUM3RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO2dCQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9DO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUVPLHVEQUF1Qjs7OztJQUEvQjtRQUNFLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7WUFDdkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7U0FDbEU7SUFDSCxDQUFDOztnQkFwRUYsVUFBVTs7OztnQkFORixnQkFBZ0I7Z0JBQ2hCLGFBQWE7O0lBMEV0Qiw0QkFBQztDQUFBLEFBckVELElBcUVDO1NBcEVZLHFCQUFxQjs7Ozs7O0lBQ2hDLDhDQUFzRDs7Ozs7SUFDdEQsMkNBQXdCOzs7OztJQUd0QixpREFBMEM7Ozs7O0lBQzFDLDhDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2VsbEFyZ3MsIEV4dGVuc2lvbiwgRXh0ZW5zaW9uTmFtZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29sdW1uUGlja2VyRXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IGFueSA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICBwcml2YXRlIF9leHRlbnNpb246IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksXHJcbiAgICBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcbiAgKSB7fVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG4gICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gd2l0aCByZXF1aXJlSlNcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLmNvbHVtblBpY2tlcik7XHJcbiAgICAgICAvLyBsb2NhbGl6YXRpb24gc3VwcG9ydCBmb3IgdGhlIHBpY2tlclxyXG4gICAgICBjb25zdCBjb2x1bW5UaXRsZSA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnY29sdW1uVGl0bGUnLCAnY29sdW1uUGlja2VyJyk7XHJcbiAgICAgIGNvbnN0IGZvcmNlRml0VGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2ZvcmNlRml0VGl0bGUnLCAnY29sdW1uUGlja2VyJyk7XHJcbiAgICAgIGNvbnN0IHN5bmNSZXNpemVUaXRsZSA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnc3luY1Jlc2l6ZVRpdGxlJywgJ2NvbHVtblBpY2tlcicpO1xyXG4gICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlciA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIgfHwge307XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIuY29sdW1uVGl0bGUgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmNvbHVtblRpdGxlIHx8IGNvbHVtblRpdGxlO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmZvcmNlRml0VGl0bGUgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmZvcmNlRml0VGl0bGUgfHwgZm9yY2VGaXRUaXRsZTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5zeW5jUmVzaXplVGl0bGUgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLnN5bmNSZXNpemVUaXRsZSB8fCBzeW5jUmVzaXplVGl0bGU7XHJcbiAgICAgICB0aGlzLl9leHRlbnNpb24gPSBuZXcgU2xpY2suQ29udHJvbHMuQ29sdW1uUGlja2VyKHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucywgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQsIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyk7XHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQ29sdW1uUGlja2VyKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25Db2x1bW5zQ2hhbmdlZCwgKGU6IGFueSwgYXJnczogQ2VsbEFyZ3MpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLm9uQ29sdW1uc0NoYW5nZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5vbkNvbHVtbnNDaGFuZ2VkKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRyYW5zbGF0ZSB0aGUgQ29sdW1uIFBpY2tlciBhbmQgaXQncyBsYXN0IDIgY2hlY2tib3hlcyAqL1xyXG4gIHRyYW5zbGF0ZUNvbHVtblBpY2tlcigpIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIHVwZGF0ZSB0aGUgcHJvcGVydGllcyBieSBwb2ludGVycywgdGhhdCBpcyB0aGUgb25seSB3YXkgdG8gZ2V0IEdyaWQgTWVudSBDb250cm9sIHRvIHNlZSB0aGUgbmV3IHZhbHVlc1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlcikge1xyXG4gICAgICAgIHRoaXMuZW1wdHlDb2x1bW5QaWNrZXJUaXRsZXMoKTtcclxuICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5jb2x1bW5UaXRsZSA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnY29sdW1uVGl0bGUnLCAnY29sdW1uUGlja2VyJyk7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5mb3JjZUZpdFRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdmb3JjZUZpdFRpdGxlJywgJ2NvbHVtblBpY2tlcicpO1xyXG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIuc3luY1Jlc2l6ZVRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdzeW5jUmVzaXplVGl0bGUnLCAnY29sdW1uUGlja2VyJyk7XHJcbiAgICAgIH1cclxuICAgICAgIC8vIHRyYW5zbGF0ZSBhbGwgY29sdW1ucyAoaW5jbHVkaW5nIG5vbi12aXNpYmxlKVxyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xyXG4gICAgICAgLy8gcmUtaW5pdGlhbGl6ZSB0aGUgQ29sdW1uIFBpY2tlciwgdGhhdCB3aWxsIHJlY3JlYXRlIGFsbCB0aGUgbGlzdFxyXG4gICAgICAvLyBkb2luZyBhbiBcImluaXQoKVwiIHdvbid0IGRyb3AgYW55IGV4aXN0aW5nIGNvbW1hbmQgYXR0YWNoZWRcclxuICAgICAgaWYgKHRoaXMuX2V4dGVuc2lvbi5pbml0KSB7XHJcbiAgICAgICAgdGhpcy5fZXh0ZW5zaW9uLmluaXQodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtcHR5Q29sdW1uUGlja2VyVGl0bGVzKCkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlcikge1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmNvbHVtblRpdGxlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIuZm9yY2VGaXRUaXRsZSA9ICcnO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLnN5bmNSZXNpemVUaXRsZSA9ICcnO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=