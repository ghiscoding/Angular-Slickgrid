/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
var CheckboxSelectorExtension = /** @class */ (function () {
    function CheckboxSelectorExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    CheckboxSelectorExtension.prototype.dispose = /**
     * @return {?}
     */
    function () {
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
     * @param {?} columnDefinitions
     * @param {?} gridOptions
     * @return {?}
     */
    CheckboxSelectorExtension.prototype.create = /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} columnDefinitions
     * @param {?} gridOptions
     * @return {?}
     */
    function (columnDefinitions, gridOptions) {
        if (columnDefinitions && gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.checkboxSelector);
            if (!this._extension) {
                this._extension = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
            }
            /** @type {?} */
            var selectionColumn = this._extension.getColumnDefinition();
            selectionColumn.excludeFromExport = true;
            selectionColumn.excludeFromQuery = true;
            selectionColumn.excludeFromHeaderMenu = true;
            columnDefinitions.unshift(selectionColumn);
            return this._extension;
        }
        return null;
    };
    /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    CheckboxSelectorExtension.prototype.register = /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    function (rowSelectionPlugin) {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // when enabling the Checkbox Selector Plugin, we need to also watch onClick events to perform certain actions
            // the selector column has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
            this.sharedService.grid.registerPlugin(this._extension);
            // this also requires the Row Selection Model to be registered as well
            if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
                rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
            }
            // user might want to pre-select some rows
            // the setTimeout is because of timing issue with styling (row selection happen but rows aren't highlighted properly)
            if (this.sharedService.gridOptions.preselectedRows && rowSelectionPlugin && this.sharedService.grid.getSelectionModel()) {
                setTimeout(function () { return _this._extension.selectRows(_this.sharedService.gridOptions.preselectedRows); }, 0);
            }
            return rowSelectionPlugin;
        }
        return null;
    };
    CheckboxSelectorExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CheckboxSelectorExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService }
    ]; };
    return CheckboxSelectorExtension;
}());
export { CheckboxSelectorExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CheckboxSelectorExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    CheckboxSelectorExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    CheckboxSelectorExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBcUIsYUFBYSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSzNEO0lBSUUsbUNBQW9CLGdCQUFrQyxFQUFVLGFBQTRCO1FBQXhFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFJLENBQUM7Ozs7SUFFakcsMkNBQU87OztJQUFQO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7OztJQUNILDBDQUFNOzs7Ozs7O0lBQU4sVUFBTyxpQkFBMkIsRUFBRSxXQUF1QjtRQUN6RCxJQUFJLGlCQUFpQixJQUFJLFdBQVcsRUFBRTtZQUNwQyx5REFBeUQ7WUFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN0Rjs7Z0JBQ0ssZUFBZSxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUU7WUFDckUsZUFBZSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUN6QyxlQUFlLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLGVBQWUsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7WUFDN0MsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFRCw0Q0FBUTs7OztJQUFSLFVBQVMsa0JBQXdCO1FBQWpDLGlCQW1CQztRQWxCQyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDbkYsOEdBQThHO1lBQzlHLDZJQUE2STtZQUM3SSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZELHNFQUFzRTtZQUN2RSxJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzRSxrQkFBa0IsR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDM0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUMvRDtZQUNBLDBDQUEwQztZQUMzQyxxSEFBcUg7WUFDckgsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLElBQUksa0JBQWtCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtnQkFDdkgsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsRUFBMUUsQ0FBMEUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNqRztZQUNBLE9BQU8sa0JBQWtCLENBQUM7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7O2dCQXBERixVQUFVOzs7O2dCQU5GLGdCQUFnQjtnQkFDaEIsYUFBYTs7SUEwRHRCLGdDQUFDO0NBQUEsQUFyREQsSUFxREM7U0FwRFkseUJBQXlCOzs7Ozs7SUFDcEMsK0NBQXdCOzs7OztJQUVaLHFEQUEwQzs7Ozs7SUFBRSxrREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbHVtbiwgRXh0ZW5zaW9uLCBFeHRlbnNpb25OYW1lLCBHcmlkT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9leHRlbnNpb246IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LCBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UpIHsgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgaWYgKHRoaXMuX2V4dGVuc2lvbiAmJiB0aGlzLl9leHRlbnNpb24uZGVzdHJveSkge1xyXG4gICAgICB0aGlzLl9leHRlbnNpb24uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoL0NyZWF0ZSBkaWZmZXJlbnQgcGx1Z2lucyBiZWZvcmUgdGhlIEdyaWQgY3JlYXRpb24uXHJcbiAgICogRm9yIGV4YW1wbGUgdGhlIG11bHRpLXNlbGVjdCBoYXZlIHRvIGJlIGFkZGVkIHRvIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBiZWZvcmUgdGhlIGdyaWQgaXMgY3JlYXRlZCB0byB3b3JrIHByb3Blcmx5XHJcbiAgICovXHJcbiAgY3JlYXRlKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pIHtcclxuICAgIGlmIChjb2x1bW5EZWZpbml0aW9ucyAmJiBncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gd2l0aCByZXF1aXJlSlNcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLmNoZWNrYm94U2VsZWN0b3IpO1xyXG4gICAgICAgaWYgKCF0aGlzLl9leHRlbnNpb24pIHtcclxuICAgICAgICB0aGlzLl9leHRlbnNpb24gPSBuZXcgU2xpY2suQ2hlY2tib3hTZWxlY3RDb2x1bW4oZ3JpZE9wdGlvbnMuY2hlY2tib3hTZWxlY3RvciB8fCB7fSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc2VsZWN0aW9uQ29sdW1uOiBDb2x1bW4gPSB0aGlzLl9leHRlbnNpb24uZ2V0Q29sdW1uRGVmaW5pdGlvbigpO1xyXG4gICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21FeHBvcnQgPSB0cnVlO1xyXG4gICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21RdWVyeSA9IHRydWU7XHJcbiAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbUhlYWRlck1lbnUgPSB0cnVlO1xyXG4gICAgICBjb2x1bW5EZWZpbml0aW9ucy51bnNoaWZ0KHNlbGVjdGlvbkNvbHVtbik7XHJcbiAgICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyKHJvd1NlbGVjdGlvblBsdWdpbj86IGFueSkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgLy8gd2hlbiBlbmFibGluZyB0aGUgQ2hlY2tib3ggU2VsZWN0b3IgUGx1Z2luLCB3ZSBuZWVkIHRvIGFsc28gd2F0Y2ggb25DbGljayBldmVudHMgdG8gcGVyZm9ybSBjZXJ0YWluIGFjdGlvbnNcclxuICAgICAgLy8gdGhlIHNlbGVjdG9yIGNvbHVtbiBoYXMgdG8gYmUgY3JlYXRlZCBCRUZPUkUgdGhlIGdyaWQgKGVsc2UgaXQgYmVoYXZlcyBvZGRseSksIGJ1dCB3ZSBjYW4gb25seSB3YXRjaCBncmlkIGV2ZW50cyBBRlRFUiB0aGUgZ3JpZCBpcyBjcmVhdGVkXHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2V4dGVuc2lvbik7XHJcbiAgICAgICAvLyB0aGlzIGFsc28gcmVxdWlyZXMgdGhlIFJvdyBTZWxlY3Rpb24gTW9kZWwgdG8gYmUgcmVnaXN0ZXJlZCBhcyB3ZWxsXHJcbiAgICAgIGlmICghcm93U2VsZWN0aW9uUGx1Z2luIHx8ICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRTZWxlY3Rpb25Nb2RlbCgpKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbik7XHJcbiAgICAgICAgcm93U2VsZWN0aW9uUGx1Z2luID0gbmV3IFNsaWNrLlJvd1NlbGVjdGlvbk1vZGVsKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dTZWxlY3Rpb25PcHRpb25zIHx8IHt9KTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRTZWxlY3Rpb25Nb2RlbChyb3dTZWxlY3Rpb25QbHVnaW4pO1xyXG4gICAgICB9XHJcbiAgICAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gcHJlLXNlbGVjdCBzb21lIHJvd3NcclxuICAgICAgLy8gdGhlIHNldFRpbWVvdXQgaXMgYmVjYXVzZSBvZiB0aW1pbmcgaXNzdWUgd2l0aCBzdHlsaW5nIChyb3cgc2VsZWN0aW9uIGhhcHBlbiBidXQgcm93cyBhcmVuJ3QgaGlnaGxpZ2h0ZWQgcHJvcGVybHkpXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucHJlc2VsZWN0ZWRSb3dzICYmIHJvd1NlbGVjdGlvblBsdWdpbiAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRTZWxlY3Rpb25Nb2RlbCgpKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9leHRlbnNpb24uc2VsZWN0Um93cyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucHJlc2VsZWN0ZWRSb3dzKSwgMCk7XHJcbiAgICAgIH1cclxuICAgICAgIHJldHVybiByb3dTZWxlY3Rpb25QbHVnaW47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIl19