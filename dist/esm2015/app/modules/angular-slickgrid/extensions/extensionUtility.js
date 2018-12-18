/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName } from '../models/index';
import { SharedService } from '../services/shared.service';
export class ExtensionUtility {
    /**
     * @param {?} sharedService
     * @param {?} translate
     */
    constructor(sharedService, translate) {
        this.sharedService = sharedService;
        this.translate = translate;
    }
    /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    arrayRemoveItemByIndex(array, index) {
        return array.filter((el, i) => {
            return index !== i;
        });
    }
    /**
     * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
     * This will basically only load the extension when user enables the feature
     * @param {?} extensionName
     * @return {?}
     */
    loadExtensionDynamically(extensionName) {
        try {
            switch (extensionName) {
                case ExtensionName.autoTooltip:
                    require('slickgrid/plugins/slick.autotooltips');
                    break;
                case ExtensionName.cellExternalCopyManager:
                    require('slickgrid/plugins/slick.cellexternalcopymanager');
                    break;
                case ExtensionName.checkboxSelector:
                    require('slickgrid/plugins/slick.checkboxselectcolumn');
                    break;
                case ExtensionName.columnPicker:
                    require('slickgrid/controls/slick.columnpicker');
                    break;
                case ExtensionName.draggableGrouping:
                    require('slickgrid/plugins/slick.draggablegrouping.js');
                    break;
                case ExtensionName.gridMenu:
                    require('slickgrid/controls/slick.gridmenu');
                    break;
                case ExtensionName.groupItemMetaProvider:
                    require('slickgrid/slick.groupitemmetadataprovider');
                    break;
                case ExtensionName.headerButton:
                    require('slickgrid/plugins/slick.headerbuttons');
                    break;
                case ExtensionName.headerMenu:
                    require('slickgrid/plugins/slick.headermenu');
                    break;
                case ExtensionName.rowSelection:
                    require('slickgrid/plugins/slick.rowselectionmodel');
                    break;
                case ExtensionName.rowMoveManager:
                    require('slickgrid/plugins/slick.rowmovemanager.js');
                    break;
            }
        }
        catch (e) {
            // do nothing, we fall here when using Aurelia-CLI and RequireJS
            // if you do use RequireJS then you need to make sure to include all necessary extensions in your `aurelia.json`
        }
    }
    /**
     * From a Grid Menu object property name, we will return the correct title output string following this order
     * 1- if user provided a title, use it as the output title
     * 2- else if user provided a title key, use it to translate the output title
     * 3- else if nothing is provided use
     * @param {?} propName
     * @param {?} pickerName
     * @return {?}
     */
    getPickerTitleOutputString(propName, pickerName) {
        /** @type {?} */
        let output = '';
        /** @type {?} */
        const picker = this.sharedService.gridOptions && this.sharedService.gridOptions[pickerName] || {};
        /** @type {?} */
        const enableTranslate = this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate || false;
        /** @type {?} */
        const title = picker && picker[propName];
        /** @type {?} */
        const titleKey = picker && picker[`${propName}Key`];
        if (titleKey) {
            output = this.translate.instant(titleKey || ' ');
        }
        else {
            switch (propName) {
                case 'customTitle':
                    output = title || (enableTranslate ? this.translate.instant('COMMANDS') : Constants.TEXT_COMMANDS);
                    break;
                case 'columnTitle':
                    output = title || (enableTranslate ? this.translate.instant('COLUMNS') : Constants.TEXT_COLUMNS);
                    break;
                case 'forceFitTitle':
                    output = title || (enableTranslate ? this.translate.instant('FORCE_FIT_COLUMNS') : Constants.TEXT_FORCE_FIT_COLUMNS);
                    break;
                case 'syncResizeTitle':
                    output = title || (enableTranslate ? this.translate.instant('SYNCHRONOUS_RESIZE') : Constants.TEXT_SYNCHRONOUS_RESIZE);
                    break;
                default:
                    output = title;
                    break;
            }
        }
        return output;
    }
    /**
     * Sort items in an array by a property name
     * \@params items array
     * @param {?} items
     * @param {?} propertyName
     * @return {?} sorted array
     */
    sortItems(items, propertyName) {
        // sort the custom items by their position in the list
        items.sort((itemA, itemB) => {
            if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
                return itemA[propertyName] - itemB[propertyName];
            }
            return 0;
        });
    }
    /**
     * Translate the an array of items from an input key and assign to the output key
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    translateItems(items, inputKey, outputKey) {
        for (const item of items) {
            if (item[inputKey]) {
                item[outputKey] = this.translate.instant(item[inputKey]);
            }
        }
    }
}
ExtensionUtility.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ExtensionUtility.ctorParameters = () => [
    { type: SharedService },
    { type: TranslateService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ExtensionUtility.prototype.sharedService;
    /**
     * @type {?}
     * @private
     */
    ExtensionUtility.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uVXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9leHRlbnNpb25VdGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUszRCxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQUMzQixZQUFvQixhQUE0QixFQUFVLFNBQTJCO1FBQWpFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBSSxDQUFDOzs7Ozs7O0lBTzFGLHNCQUFzQixDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2hELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQU8sRUFBRSxDQUFTLEVBQUUsRUFBRTtZQUN6QyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBT0Qsd0JBQXdCLENBQUMsYUFBNEI7UUFDbkQsSUFBSTtZQUNGLFFBQVEsYUFBYSxFQUFFO2dCQUNyQixLQUFLLGFBQWEsQ0FBQyxXQUFXO29CQUM1QixPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQztvQkFDaEQsTUFBTTtnQkFDUixLQUFLLGFBQWEsQ0FBQyx1QkFBdUI7b0JBQ3hDLE9BQU8sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO29CQUMzRCxNQUFNO2dCQUNSLEtBQUssYUFBYSxD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QUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDdkgsTUFBTTtnQkFDUjtvQkFDRSxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNmLE1BQU07YUFDVDtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7Ozs7SUFRRCxTQUFTLENBQUMsS0FBWSxFQUFFLFlBQW9CO1FBQzFDLHNEQUFzRDtRQUN0RCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBVSxFQUFFLEtBQVUsRUFBRSxFQUFFO1lBQ3BDLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQzlGLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNsRDtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7OztJQUdELGNBQWMsQ0FBQyxLQUFZLEVBQUUsUUFBZ0IsRUFBRSxTQUFpQjtRQUM5RCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Y7SUFDSCxDQUFDOzs7WUE1SEYsVUFBVTs7OztZQUpGLGFBQWE7WUFIYixnQkFBZ0I7Ozs7Ozs7SUFTWCx5Q0FBb0M7Ozs7O0lBQUUscUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEV4dGVuc2lvbk5hbWUgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKG5hbWU6IHN0cmluZyk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25VdGlsaXR5IHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgYnkgaXQncyBpbmRleCBpbiB0aGUgZ3JpZFxyXG4gICAqIEBwYXJhbSBhcnJheSBpbnB1dFxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqL1xyXG4gIGFycmF5UmVtb3ZlSXRlbUJ5SW5kZXgoYXJyYXk6IGFueVtdLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKChlbDogYW55LCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgcmV0dXJuIGluZGV4ICE9PSBpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMb2FkIFNsaWNrR3JpZCBFeHRlbnNpb24gKENvbnRyb2wvUGx1Z2luKSBkeW5hbWljYWxseSAob24gZGVtYW5kKVxyXG4gICAqIFRoaXMgd2lsbCBiYXNpY2FsbHkgb25seSBsb2FkIHRoZSBleHRlbnNpb24gd2hlbiB1c2VyIGVuYWJsZXMgdGhlIGZlYXR1cmVcclxuICAgKiBAcGFyYW0gZXh0ZW5zaW9uTmFtZVxyXG4gICAqL1xyXG4gIGxvYWRFeHRlbnNpb25EeW5hbWljYWxseShleHRlbnNpb25OYW1lOiBFeHRlbnNpb25OYW1lKTogYW55IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHN3aXRjaCAoZXh0ZW5zaW9uTmFtZSkge1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5hdXRvVG9vbHRpcDpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmF1dG90b29sdGlwcycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmNlbGxFeHRlcm5hbENvcHlNYW5hZ2VyOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbGV4dGVybmFsY29weW1hbmFnZXInKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5jaGVja2JveFNlbGVjdG9yOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2hlY2tib3hzZWxlY3Rjb2x1bW4nKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5jb2x1bW5QaWNrZXI6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvY29udHJvbHMvc2xpY2suY29sdW1ucGlja2VyJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuZHJhZ2dhYmxlR3JvdXBpbmc6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5kcmFnZ2FibGVncm91cGluZy5qcycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmdyaWRNZW51OlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL2NvbnRyb2xzL3NsaWNrLmdyaWRtZW51Jyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuZ3JvdXBJdGVtTWV0YVByb3ZpZGVyOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3NsaWNrLmdyb3VwaXRlbW1ldGFkYXRhcHJvdmlkZXInKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5oZWFkZXJCdXR0b246XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5oZWFkZXJidXR0b25zJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuaGVhZGVyTWVudTpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmhlYWRlcm1lbnUnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb246XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5yb3dzZWxlY3Rpb25tb2RlbCcpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLnJvd01vdmVNYW5hZ2VyOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2sucm93bW92ZW1hbmFnZXIuanMnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIGRvIG5vdGhpbmcsIHdlIGZhbGwgaGVyZSB3aGVuIHVzaW5nIEF1cmVsaWEtQ0xJIGFuZCBSZXF1aXJlSlNcclxuICAgICAgLy8gaWYgeW91IGRvIHVzZSBSZXF1aXJlSlMgdGhlbiB5b3UgbmVlZCB0byBtYWtlIHN1cmUgdG8gaW5jbHVkZSBhbGwgbmVjZXNzYXJ5IGV4dGVuc2lvbnMgaW4geW91ciBgYXVyZWxpYS5qc29uYFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnJvbSBhIEdyaWQgTWVudSBvYmplY3QgcHJvcGVydHkgbmFtZSwgd2Ugd2lsbCByZXR1cm4gdGhlIGNvcnJlY3QgdGl0bGUgb3V0cHV0IHN0cmluZyBmb2xsb3dpbmcgdGhpcyBvcmRlclxyXG4gICAqIDEtIGlmIHVzZXIgcHJvdmlkZWQgYSB0aXRsZSwgdXNlIGl0IGFzIHRoZSBvdXRwdXQgdGl0bGVcclxuICAgKiAyLSBlbHNlIGlmIHVzZXIgcHJvdmlkZWQgYSB0aXRsZSBrZXksIHVzZSBpdCB0byB0cmFuc2xhdGUgdGhlIG91dHB1dCB0aXRsZVxyXG4gICAqIDMtIGVsc2UgaWYgbm90aGluZyBpcyBwcm92aWRlZCB1c2VcclxuICAgKi9cclxuICBnZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZyhwcm9wTmFtZTogc3RyaW5nLCBwaWNrZXJOYW1lOiAnZ3JpZE1lbnUnIHwgJ2NvbHVtblBpY2tlcicpIHtcclxuICAgIGxldCBvdXRwdXQgPSAnJztcclxuICAgIGNvbnN0IHBpY2tlciA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnNbcGlja2VyTmFtZV0gfHwge307XHJcbiAgICBjb25zdCBlbmFibGVUcmFuc2xhdGUgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSB8fCBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IHBpY2tlciAmJiBwaWNrZXJbcHJvcE5hbWVdO1xyXG4gICAgY29uc3QgdGl0bGVLZXkgPSBwaWNrZXIgJiYgcGlja2VyW2Ake3Byb3BOYW1lfUtleWBdO1xyXG5cclxuICAgIGlmICh0aXRsZUtleSkge1xyXG4gICAgICBvdXRwdXQgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHRpdGxlS2V5IHx8ICcgJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2l0Y2ggKHByb3BOYW1lKSB7XHJcbiAgICAgICAgY2FzZSAnY3VzdG9tVGl0bGUnOlxyXG4gICAgICAgICAgb3V0cHV0ID0gdGl0bGUgfHwgKGVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTU1BTkRTJykgOiBDb25zdGFudHMuVEVYVF9DT01NQU5EUyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjb2x1bW5UaXRsZSc6XHJcbiAgICAgICAgICBvdXRwdXQgPSB0aXRsZSB8fCAoZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnQ09MVU1OUycpIDogQ29uc3RhbnRzLlRFWFRfQ09MVU1OUyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdmb3JjZUZpdFRpdGxlJzpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlIHx8IChlbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdGT1JDRV9GSVRfQ09MVU1OUycpIDogQ29uc3RhbnRzLlRFWFRfRk9SQ0VfRklUX0NPTFVNTlMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc3luY1Jlc2l6ZVRpdGxlJzpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlIHx8IChlbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTWU5DSFJPTk9VU19SRVNJWkUnKSA6IENvbnN0YW50cy5URVhUX1NZTkNIUk9OT1VTX1JFU0laRSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgb3V0cHV0ID0gdGl0bGU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgaXRlbXMgaW4gYW4gYXJyYXkgYnkgYSBwcm9wZXJ0eSBuYW1lXHJcbiAgICogQHBhcmFtcyBpdGVtcyBhcnJheVxyXG4gICAqIEBwYXJhbSBwcm9wZXJ0eSBuYW1lIHRvIHNvcnQgd2l0aFxyXG4gICAqIEByZXR1cm4gc29ydGVkIGFycmF5XHJcbiAgICovXHJcbiAgc29ydEl0ZW1zKGl0ZW1zOiBhbnlbXSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgIC8vIHNvcnQgdGhlIGN1c3RvbSBpdGVtcyBieSB0aGVpciBwb3NpdGlvbiBpbiB0aGUgbGlzdFxyXG4gICAgaXRlbXMuc29ydCgoaXRlbUE6IGFueSwgaXRlbUI6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbUEgJiYgaXRlbUIgJiYgaXRlbUEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSAmJiBpdGVtQi5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1BW3Byb3BlcnR5TmFtZV0gLSBpdGVtQltwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogVHJhbnNsYXRlIHRoZSBhbiBhcnJheSBvZiBpdGVtcyBmcm9tIGFuIGlucHV0IGtleSBhbmQgYXNzaWduIHRvIHRoZSBvdXRwdXQga2V5ICovXHJcbiAgdHJhbnNsYXRlSXRlbXMoaXRlbXM6IGFueVtdLCBpbnB1dEtleTogc3RyaW5nLCBvdXRwdXRLZXk6IHN0cmluZykge1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgIGlmIChpdGVtW2lucHV0S2V5XSkge1xyXG4gICAgICAgIGl0ZW1bb3V0cHV0S2V5XSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoaXRlbVtpbnB1dEtleV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==