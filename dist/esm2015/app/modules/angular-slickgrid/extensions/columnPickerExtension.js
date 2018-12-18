/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
export class ColumnPickerExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
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
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.columnPicker);
            // localization support for the picker
            /** @type {?} */
            const columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
            /** @type {?} */
            const forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
            /** @type {?} */
            const syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
            this.sharedService.gridOptions.columnPicker = this.sharedService.gridOptions.columnPicker || {};
            this.sharedService.gridOptions.columnPicker.columnTitle = this.sharedService.gridOptions.columnPicker.columnTitle || columnTitle;
            this.sharedService.gridOptions.columnPicker.forceFitTitle = this.sharedService.gridOptions.columnPicker.forceFitTitle || forceFitTitle;
            this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.sharedService.gridOptions.columnPicker.syncResizeTitle || syncResizeTitle;
            this._extension = new Slick.Controls.ColumnPicker(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
            if (this.sharedService.grid && this.sharedService.gridOptions.enableColumnPicker) {
                this._eventHandler.subscribe(this._extension.onColumnsChanged, (e, args) => {
                    if (this.sharedService.gridOptions.columnPicker && typeof this.sharedService.gridOptions.columnPicker.onColumnsChanged === 'function') {
                        this.sharedService.gridOptions.columnPicker.onColumnsChanged(e, args);
                    }
                });
            }
            return this._extension;
        }
    }
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    translateColumnPicker() {
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
    }
    /**
     * @private
     * @return {?}
     */
    emptyColumnPickerTitles() {
        if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.columnPicker) {
            this.sharedService.gridOptions.columnPicker.columnTitle = '';
            this.sharedService.gridOptions.columnPicker.forceFitTitle = '';
            this.sharedService.gridOptions.columnPicker.syncResizeTitle = '';
        }
    }
}
ColumnPickerExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ColumnPickerExtension.ctorParameters = () => [
    { type: ExtensionUtility },
    { type: SharedService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uUGlja2VyRXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9leHRlbnNpb25zL2NvbHVtblBpY2tlckV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXVCLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU0zRCxNQUFNLE9BQU8scUJBQXFCOzs7OztJQUloQyxZQUNVLGdCQUFrQyxFQUNsQyxhQUE0QjtRQUQ1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTDlCLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFNbkQsQ0FBQzs7OztJQUVKLE9BQU87UUFDTCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQ25GLHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxD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Q0FBQywwQkFBMEIsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUNuSjtZQUNBLGdEQUFnRDtZQUNqRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN4RixtRUFBbUU7WUFDcEUsNkRBQTZEO1lBQzdELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0M7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU8sdUJBQXVCO1FBQzdCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7WUFDdkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7U0FDbEU7SUFDSCxDQUFDOzs7WUFwRUYsVUFBVTs7OztZQU5GLGdCQUFnQjtZQUNoQixhQUFhOzs7Ozs7O0lBT3BCLDhDQUFzRDs7Ozs7SUFDdEQsMkNBQXdCOzs7OztJQUd0QixpREFBMEM7Ozs7O0lBQzFDLDhDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2VsbEFyZ3MsIEV4dGVuc2lvbiwgRXh0ZW5zaW9uTmFtZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29sdW1uUGlja2VyRXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IGFueSA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICBwcml2YXRlIF9leHRlbnNpb246IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksXHJcbiAgICBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcbiAgKSB7fVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG4gICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gd2l0aCByZXF1aXJlSlNcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLmNvbHVtblBpY2tlcik7XHJcbiAgICAgICAvLyBsb2NhbGl6YXRpb24gc3VwcG9ydCBmb3IgdGhlIHBpY2tlclxyXG4gICAgICBjb25zdCBjb2x1bW5UaXRsZSA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnY29sdW1uVGl0bGUnLCAnY29sdW1uUGlja2VyJyk7XHJcbiAgICAgIGNvbnN0IGZvcmNlRml0VGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2ZvcmNlRml0VGl0bGUnLCAnY29sdW1uUGlja2VyJyk7XHJcbiAgICAgIGNvbnN0IHN5bmNSZXNpemVUaXRsZSA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnc3luY1Jlc2l6ZVRpdGxlJywgJ2NvbHVtblBpY2tlcicpO1xyXG4gICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlciA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIgfHwge307XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIuY29sdW1uVGl0bGUgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmNvbHVtblRpdGxlIHx8IGNvbHVtblRpdGxlO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmZvcmNlRml0VGl0bGUgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmZvcmNlRml0VGl0bGUgfHwgZm9yY2VGaXRUaXRsZTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5zeW5jUmVzaXplVGl0bGUgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLnN5bmNSZXNpemVUaXRsZSB8fCBzeW5jUmVzaXplVGl0bGU7XHJcbiAgICAgICB0aGlzLl9leHRlbnNpb24gPSBuZXcgU2xpY2suQ29udHJvbHMuQ29sdW1uUGlja2VyKHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucywgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQsIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyk7XHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQ29sdW1uUGlja2VyKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25Db2x1bW5zQ2hhbmdlZCwgKGU6IGFueSwgYXJnczogQ2VsbEFyZ3MpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLm9uQ29sdW1uc0NoYW5nZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5vbkNvbHVtbnNDaGFuZ2VkKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRyYW5zbGF0ZSB0aGUgQ29sdW1uIFBpY2tlciBhbmQgaXQncyBsYXN0IDIgY2hlY2tib3hlcyAqL1xyXG4gIHRyYW5zbGF0ZUNvbHVtblBpY2tlcigpIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIHVwZGF0ZSB0aGUgcHJvcGVydGllcyBieSBwb2ludGVycywgdGhhdCBpcyB0aGUgb25seSB3YXkgdG8gZ2V0IEdyaWQgTWVudSBDb250cm9sIHRvIHNlZSB0aGUgbmV3IHZhbHVlc1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlcikge1xyXG4gICAgICAgIHRoaXMuZW1wdHlDb2x1bW5QaWNrZXJUaXRsZXMoKTtcclxuICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5jb2x1bW5UaXRsZSA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnY29sdW1uVGl0bGUnLCAnY29sdW1uUGlja2VyJyk7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlci5mb3JjZUZpdFRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdmb3JjZUZpdFRpdGxlJywgJ2NvbHVtblBpY2tlcicpO1xyXG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIuc3luY1Jlc2l6ZVRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdzeW5jUmVzaXplVGl0bGUnLCAnY29sdW1uUGlja2VyJyk7XHJcbiAgICAgIH1cclxuICAgICAgIC8vIHRyYW5zbGF0ZSBhbGwgY29sdW1ucyAoaW5jbHVkaW5nIG5vbi12aXNpYmxlKVxyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xyXG4gICAgICAgLy8gcmUtaW5pdGlhbGl6ZSB0aGUgQ29sdW1uIFBpY2tlciwgdGhhdCB3aWxsIHJlY3JlYXRlIGFsbCB0aGUgbGlzdFxyXG4gICAgICAvLyBkb2luZyBhbiBcImluaXQoKVwiIHdvbid0IGRyb3AgYW55IGV4aXN0aW5nIGNvbW1hbmQgYXR0YWNoZWRcclxuICAgICAgaWYgKHRoaXMuX2V4dGVuc2lvbi5pbml0KSB7XHJcbiAgICAgICAgdGhpcy5fZXh0ZW5zaW9uLmluaXQodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtcHR5Q29sdW1uUGlja2VyVGl0bGVzKCkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmNvbHVtblBpY2tlcikge1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLmNvbHVtblRpdGxlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5jb2x1bW5QaWNrZXIuZm9yY2VGaXRUaXRsZSA9ICcnO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuY29sdW1uUGlja2VyLnN5bmNSZXNpemVUaXRsZSA9ICcnO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=