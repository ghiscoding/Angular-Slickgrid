/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
export class CheckboxSelectorExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {?} columnDefinitions
     * @param {?} gridOptions
     * @return {?}
     */
    create(columnDefinitions, gridOptions) {
        if (columnDefinitions && gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.checkboxSelector);
            if (!this._extension) {
                this._extension = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
            }
            /** @type {?} */
            const selectionColumn = this._extension.getColumnDefinition();
            selectionColumn.excludeFromExport = true;
            selectionColumn.excludeFromQuery = true;
            selectionColumn.excludeFromHeaderMenu = true;
            columnDefinitions.unshift(selectionColumn);
            return this._extension;
        }
        return null;
    }
    /**
     * @param {?=} rowSelectionPlugin
     * @return {?}
     */
    register(rowSelectionPlugin) {
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
                setTimeout(() => this._extension.selectRows(this.sharedService.gridOptions.preselectedRows), 0);
            }
            return rowSelectionPlugin;
        }
        return null;
    }
}
CheckboxSelectorExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CheckboxSelectorExtension.ctorParameters = () => [
    { type: ExtensionUtility },
    { type: SharedService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBcUIsYUFBYSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTTNELE1BQU0sT0FBTyx5QkFBeUI7Ozs7O0lBR3BDLFlBQW9CLGdCQUFrQyxFQUFVLGFBQTRCO1FBQXhFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFJLENBQUM7Ozs7SUFFakcsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFNRCxNQUFNLENBQUMsaUJBQTJCLEVBQUUsV0FBdUI7UUFDekQsSUFBSSxpQkFBaUIsSUFBSSxXQUFXLEVBQUU7WUFDcEMseURBQXlEO1lBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdEY7O2tCQUNLLGVBQWUsR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFO1lBQ3JFLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDekMsZUFBZSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUN4QyxlQUFlLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1lBQzdDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLGtCQUF3QjtRQUMvQixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDbkYsOEdBQThHO1lBQzlHLDZJQUE2STtZQUM3SSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZELHNFQUFzRTtZQUN2RSxJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzRSxrQkFBa0IsR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDM0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUMvRDtZQUNBLDBDQUEwQztZQUMzQyxxSEFBcUg7WUFDckgsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLElBQUksa0JBQWtCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtnQkFDdkgsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pHO1lBQ0EsT0FBTyxrQkFBa0IsQ0FBQztTQUM1QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7O1lBcERGLFVBQVU7Ozs7WUFORixnQkFBZ0I7WUFDaEIsYUFBYTs7Ozs7OztJQU9wQiwrQ0FBd0I7Ozs7O0lBRVoscURBQTBDOzs7OztJQUFFLGtEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29sdW1uLCBFeHRlbnNpb24sIEV4dGVuc2lvbk5hbWUsIEdyaWRPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25VdGlsaXR5IH0gZnJvbSAnLi9leHRlbnNpb25VdGlsaXR5JztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xyXG4gIHByaXZhdGUgX2V4dGVuc2lvbjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSkgeyB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uICYmIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2gvQ3JlYXRlIGRpZmZlcmVudCBwbHVnaW5zIGJlZm9yZSB0aGUgR3JpZCBjcmVhdGlvbi5cclxuICAgKiBGb3IgZXhhbXBsZSB0aGUgbXVsdGktc2VsZWN0IGhhdmUgdG8gYmUgYWRkZWQgdG8gdGhlIGNvbHVtbiBkZWZpbml0aW9uIGJlZm9yZSB0aGUgZ3JpZCBpcyBjcmVhdGVkIHRvIHdvcmsgcHJvcGVybHlcclxuICAgKi9cclxuICBjcmVhdGUoY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdLCBncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgaWYgKGNvbHVtbkRlZmluaXRpb25zICYmIGdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuY2hlY2tib3hTZWxlY3Rvcik7XHJcbiAgICAgICBpZiAoIXRoaXMuX2V4dGVuc2lvbikge1xyXG4gICAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5DaGVja2JveFNlbGVjdENvbHVtbihncmlkT3B0aW9ucy5jaGVja2JveFNlbGVjdG9yIHx8IHt9KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBzZWxlY3Rpb25Db2x1bW46IENvbHVtbiA9IHRoaXMuX2V4dGVuc2lvbi5nZXRDb2x1bW5EZWZpbml0aW9uKCk7XHJcbiAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbUV4cG9ydCA9IHRydWU7XHJcbiAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbVF1ZXJ5ID0gdHJ1ZTtcclxuICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tSGVhZGVyTWVudSA9IHRydWU7XHJcbiAgICAgIGNvbHVtbkRlZmluaXRpb25zLnVuc2hpZnQoc2VsZWN0aW9uQ29sdW1uKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXIocm93U2VsZWN0aW9uUGx1Z2luPzogYW55KSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyB3aGVuIGVuYWJsaW5nIHRoZSBDaGVja2JveCBTZWxlY3RvciBQbHVnaW4sIHdlIG5lZWQgdG8gYWxzbyB3YXRjaCBvbkNsaWNrIGV2ZW50cyB0byBwZXJmb3JtIGNlcnRhaW4gYWN0aW9uc1xyXG4gICAgICAvLyB0aGUgc2VsZWN0b3IgY29sdW1uIGhhcyB0byBiZSBjcmVhdGVkIEJFRk9SRSB0aGUgZ3JpZCAoZWxzZSBpdCBiZWhhdmVzIG9kZGx5KSwgYnV0IHdlIGNhbiBvbmx5IHdhdGNoIGdyaWQgZXZlbnRzIEFGVEVSIHRoZSBncmlkIGlzIGNyZWF0ZWRcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5fZXh0ZW5zaW9uKTtcclxuICAgICAgIC8vIHRoaXMgYWxzbyByZXF1aXJlcyB0aGUgUm93IFNlbGVjdGlvbiBNb2RlbCB0byBiZSByZWdpc3RlcmVkIGFzIHdlbGxcclxuICAgICAgaWYgKCFyb3dTZWxlY3Rpb25QbHVnaW4gfHwgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldFNlbGVjdGlvbk1vZGVsKCkpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uKTtcclxuICAgICAgICByb3dTZWxlY3Rpb25QbHVnaW4gPSBuZXcgU2xpY2suUm93U2VsZWN0aW9uTW9kZWwodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd1NlbGVjdGlvbk9wdGlvbnMgfHwge30pO1xyXG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNlbGVjdGlvbk1vZGVsKHJvd1NlbGVjdGlvblBsdWdpbik7XHJcbiAgICAgIH1cclxuICAgICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBwcmUtc2VsZWN0IHNvbWUgcm93c1xyXG4gICAgICAvLyB0aGUgc2V0VGltZW91dCBpcyBiZWNhdXNlIG9mIHRpbWluZyBpc3N1ZSB3aXRoIHN0eWxpbmcgKHJvdyBzZWxlY3Rpb24gaGFwcGVuIGJ1dCByb3dzIGFyZW4ndCBoaWdobGlnaHRlZCBwcm9wZXJseSlcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5wcmVzZWxlY3RlZFJvd3MgJiYgcm93U2VsZWN0aW9uUGx1Z2luICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldFNlbGVjdGlvbk1vZGVsKCkpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2V4dGVuc2lvbi5zZWxlY3RSb3dzKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5wcmVzZWxlY3RlZFJvd3MpLCAwKTtcclxuICAgICAgfVxyXG4gICAgICAgcmV0dXJuIHJvd1NlbGVjdGlvblBsdWdpbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=