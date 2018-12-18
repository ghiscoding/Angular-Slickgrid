/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName } from '../models/index';
import { SharedService } from '../services/shared.service';
var ExtensionUtility = /** @class */ (function () {
    function ExtensionUtility(sharedService, translate) {
        this.sharedService = sharedService;
        this.translate = translate;
    }
    /**
     * Remove a column from the grid by it's index in the grid
     * @param array input
     * @param index
     */
    /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    ExtensionUtility.prototype.arrayRemoveItemByIndex = /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    function (array, index) {
        return array.filter(function (el, i) {
            return index !== i;
        });
    };
    /**
     * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
     * This will basically only load the extension when user enables the feature
     * @param extensionName
     */
    /**
     * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
     * This will basically only load the extension when user enables the feature
     * @param {?} extensionName
     * @return {?}
     */
    ExtensionUtility.prototype.loadExtensionDynamically = /**
     * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
     * This will basically only load the extension when user enables the feature
     * @param {?} extensionName
     * @return {?}
     */
    function (extensionName) {
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
    };
    /**
     * From a Grid Menu object property name, we will return the correct title output string following this order
     * 1- if user provided a title, use it as the output title
     * 2- else if user provided a title key, use it to translate the output title
     * 3- else if nothing is provided use
     */
    /**
     * From a Grid Menu object property name, we will return the correct title output string following this order
     * 1- if user provided a title, use it as the output title
     * 2- else if user provided a title key, use it to translate the output title
     * 3- else if nothing is provided use
     * @param {?} propName
     * @param {?} pickerName
     * @return {?}
     */
    ExtensionUtility.prototype.getPickerTitleOutputString = /**
     * From a Grid Menu object property name, we will return the correct title output string following this order
     * 1- if user provided a title, use it as the output title
     * 2- else if user provided a title key, use it to translate the output title
     * 3- else if nothing is provided use
     * @param {?} propName
     * @param {?} pickerName
     * @return {?}
     */
    function (propName, pickerName) {
        /** @type {?} */
        var output = '';
        /** @type {?} */
        var picker = this.sharedService.gridOptions && this.sharedService.gridOptions[pickerName] || {};
        /** @type {?} */
        var enableTranslate = this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate || false;
        /** @type {?} */
        var title = picker && picker[propName];
        /** @type {?} */
        var titleKey = picker && picker[propName + "Key"];
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
    };
    /**
     * Sort items in an array by a property name
     * @params items array
     * @param property name to sort with
     * @return sorted array
     */
    /**
     * Sort items in an array by a property name
     * \@params items array
     * @param {?} items
     * @param {?} propertyName
     * @return {?} sorted array
     */
    ExtensionUtility.prototype.sortItems = /**
     * Sort items in an array by a property name
     * \@params items array
     * @param {?} items
     * @param {?} propertyName
     * @return {?} sorted array
     */
    function (items, propertyName) {
        // sort the custom items by their position in the list
        items.sort(function (itemA, itemB) {
            if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
                return itemA[propertyName] - itemB[propertyName];
            }
            return 0;
        });
    };
    /** Translate the an array of items from an input key and assign to the output key */
    /**
     * Translate the an array of items from an input key and assign to the output key
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    ExtensionUtility.prototype.translateItems = /**
     * Translate the an array of items from an input key and assign to the output key
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    function (items, inputKey, outputKey) {
        var e_1, _a;
        try {
            for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (item[inputKey]) {
                    item[outputKey] = this.translate.instant(item[inputKey]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ExtensionUtility.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ExtensionUtility.ctorParameters = function () { return [
        { type: SharedService },
        { type: TranslateService }
    ]; };
    return ExtensionUtility;
}());
export { ExtensionUtility };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uVXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9leHRlbnNpb25VdGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJM0Q7SUFFRSwwQkFBb0IsYUFBNEIsRUFBVSxTQUEyQjtRQUFqRSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQUksQ0FBQztJQUUxRjs7OztPQUlHOzs7Ozs7O0lBQ0gsaURBQXNCOzs7Ozs7SUFBdEIsVUFBdUIsS0FBWSxFQUFFLEtBQWE7UUFDaEQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsRUFBTyxFQUFFLENBQVM7WUFDckMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxtREFBd0I7Ozs7OztJQUF4QixVQUF5QixhQUE0QjtRQUNuRCxJQUFJO1lBQ0YsUUFBUSxhQUFhLEVBQUU7Z0JBQ3JCLEtBQUssYUFBYSxDQUFDLFdBQVc7b0JBQzVCLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO29CQUNoRCxNQUFNO2dCQUNSLEtBQUssYUFBYSxDQUFDLHVCQUF1QjtvQkFDeEMsT0FBTyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7b0JBQzNELE1B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Ozs7O0lBQ2YseUNBQW9DOzs7OztJQUFFLHFDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25OYW1lIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcclxuXHJcbmRlY2xhcmUgZnVuY3Rpb24gcmVxdWlyZShuYW1lOiBzdHJpbmcpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uVXRpbGl0eSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkIGJ5IGl0J3MgaW5kZXggaW4gdGhlIGdyaWRcclxuICAgKiBAcGFyYW0gYXJyYXkgaW5wdXRcclxuICAgKiBAcGFyYW0gaW5kZXhcclxuICAgKi9cclxuICBhcnJheVJlbW92ZUl0ZW1CeUluZGV4KGFycmF5OiBhbnlbXSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGFycmF5LmZpbHRlcigoZWw6IGFueSwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgIHJldHVybiBpbmRleCAhPT0gaTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBTbGlja0dyaWQgRXh0ZW5zaW9uIChDb250cm9sL1BsdWdpbikgZHluYW1pY2FsbHkgKG9uIGRlbWFuZClcclxuICAgKiBUaGlzIHdpbGwgYmFzaWNhbGx5IG9ubHkgbG9hZCB0aGUgZXh0ZW5zaW9uIHdoZW4gdXNlciBlbmFibGVzIHRoZSBmZWF0dXJlXHJcbiAgICogQHBhcmFtIGV4dGVuc2lvbk5hbWVcclxuICAgKi9cclxuICBsb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoZXh0ZW5zaW9uTmFtZTogRXh0ZW5zaW9uTmFtZSk6IGFueSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBzd2l0Y2ggKGV4dGVuc2lvbk5hbWUpIHtcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuYXV0b1Rvb2x0aXA6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5hdXRvdG9vbHRpcHMnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5jZWxsRXh0ZXJuYWxDb3B5TWFuYWdlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmNlbGxleHRlcm5hbGNvcHltYW5hZ2VyJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuY2hlY2tib3hTZWxlY3RvcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmNoZWNrYm94c2VsZWN0Y29sdW1uJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL2NvbnRyb2xzL3NsaWNrLmNvbHVtbnBpY2tlcicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmRyYWdnYWJsZUdyb3VwaW5nOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suZHJhZ2dhYmxlZ3JvdXBpbmcuanMnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5ncmlkTWVudTpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9jb250cm9scy9zbGljay5ncmlkbWVudScpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmdyb3VwSXRlbU1ldGFQcm92aWRlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9zbGljay5ncm91cGl0ZW1tZXRhZGF0YXByb3ZpZGVyJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuaGVhZGVyQnV0dG9uOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suaGVhZGVyYnV0dG9ucycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmhlYWRlck1lbnU6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5oZWFkZXJtZW51Jyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2sucm93c2VsZWN0aW9ubW9kZWwnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5yb3dNb3ZlTWFuYWdlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLnJvd21vdmVtYW5hZ2VyLmpzJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvLyBkbyBub3RoaW5nLCB3ZSBmYWxsIGhlcmUgd2hlbiB1c2luZyBBdXJlbGlhLUNMSSBhbmQgUmVxdWlyZUpTXHJcbiAgICAgIC8vIGlmIHlvdSBkbyB1c2UgUmVxdWlyZUpTIHRoZW4geW91IG5lZWQgdG8gbWFrZSBzdXJlIHRvIGluY2x1ZGUgYWxsIG5lY2Vzc2FyeSBleHRlbnNpb25zIGluIHlvdXIgYGF1cmVsaWEuanNvbmBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyb20gYSBHcmlkIE1lbnUgb2JqZWN0IHByb3BlcnR5IG5hbWUsIHdlIHdpbGwgcmV0dXJuIHRoZSBjb3JyZWN0IHRpdGxlIG91dHB1dCBzdHJpbmcgZm9sbG93aW5nIHRoaXMgb3JkZXJcclxuICAgKiAxLSBpZiB1c2VyIHByb3ZpZGVkIGEgdGl0bGUsIHVzZSBpdCBhcyB0aGUgb3V0cHV0IHRpdGxlXHJcbiAgICogMi0gZWxzZSBpZiB1c2VyIHByb3ZpZGVkIGEgdGl0bGUga2V5LCB1c2UgaXQgdG8gdHJhbnNsYXRlIHRoZSBvdXRwdXQgdGl0bGVcclxuICAgKiAzLSBlbHNlIGlmIG5vdGhpbmcgaXMgcHJvdmlkZWQgdXNlXHJcbiAgICovXHJcbiAgZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcocHJvcE5hbWU6IHN0cmluZywgcGlja2VyTmFtZTogJ2dyaWRNZW51JyB8ICdjb2x1bW5QaWNrZXInKSB7XHJcbiAgICBsZXQgb3V0cHV0ID0gJyc7XHJcbiAgICBjb25zdCBwaWNrZXIgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zW3BpY2tlck5hbWVdIHx8IHt9O1xyXG4gICAgY29uc3QgZW5hYmxlVHJhbnNsYXRlID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgfHwgZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBwaWNrZXIgJiYgcGlja2VyW3Byb3BOYW1lXTtcclxuICAgIGNvbnN0IHRpdGxlS2V5ID0gcGlja2VyICYmIHBpY2tlcltgJHtwcm9wTmFtZX1LZXlgXTtcclxuXHJcbiAgICBpZiAodGl0bGVLZXkpIHtcclxuICAgICAgb3V0cHV0ID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCh0aXRsZUtleSB8fCAnICcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dpdGNoIChwcm9wTmFtZSkge1xyXG4gICAgICAgIGNhc2UgJ2N1c3RvbVRpdGxlJzpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlIHx8IChlbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDT01NQU5EUycpIDogQ29uc3RhbnRzLlRFWFRfQ09NTUFORFMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY29sdW1uVGl0bGUnOlxyXG4gICAgICAgICAgb3V0cHV0ID0gdGl0bGUgfHwgKGVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTFVNTlMnKSA6IENvbnN0YW50cy5URVhUX0NPTFVNTlMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZm9yY2VGaXRUaXRsZSc6XHJcbiAgICAgICAgICBvdXRwdXQgPSB0aXRsZSB8fCAoZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnRk9SQ0VfRklUX0NPTFVNTlMnKSA6IENvbnN0YW50cy5URVhUX0ZPUkNFX0ZJVF9DT0xVTU5TKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3N5bmNSZXNpemVUaXRsZSc6XHJcbiAgICAgICAgICBvdXRwdXQgPSB0aXRsZSB8fCAoZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU1lOQ0hST05PVVNfUkVTSVpFJykgOiBDb25zdGFudHMuVEVYVF9TWU5DSFJPTk9VU19SRVNJWkUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IGl0ZW1zIGluIGFuIGFycmF5IGJ5IGEgcHJvcGVydHkgbmFtZVxyXG4gICAqIEBwYXJhbXMgaXRlbXMgYXJyYXlcclxuICAgKiBAcGFyYW0gcHJvcGVydHkgbmFtZSB0byBzb3J0IHdpdGhcclxuICAgKiBAcmV0dXJuIHNvcnRlZCBhcnJheVxyXG4gICAqL1xyXG4gIHNvcnRJdGVtcyhpdGVtczogYW55W10sIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAvLyBzb3J0IHRoZSBjdXN0b20gaXRlbXMgYnkgdGhlaXIgcG9zaXRpb24gaW4gdGhlIGxpc3RcclxuICAgIGl0ZW1zLnNvcnQoKGl0ZW1BOiBhbnksIGl0ZW1COiBhbnkpID0+IHtcclxuICAgICAgaWYgKGl0ZW1BICYmIGl0ZW1CICYmIGl0ZW1BLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkgJiYgaXRlbUIuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtQVtwcm9wZXJ0eU5hbWVdIC0gaXRlbUJbcHJvcGVydHlOYW1lXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRyYW5zbGF0ZSB0aGUgYW4gYXJyYXkgb2YgaXRlbXMgZnJvbSBhbiBpbnB1dCBrZXkgYW5kIGFzc2lnbiB0byB0aGUgb3V0cHV0IGtleSAqL1xyXG4gIHRyYW5zbGF0ZUl0ZW1zKGl0ZW1zOiBhbnlbXSwgaW5wdXRLZXk6IHN0cmluZywgb3V0cHV0S2V5OiBzdHJpbmcpIHtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICBpZiAoaXRlbVtpbnB1dEtleV0pIHtcclxuICAgICAgICBpdGVtW291dHB1dEtleV0gPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGl0ZW1baW5wdXRLZXldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=