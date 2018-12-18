/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export var sumTotalsDollarFormatter = function (totals, columnDef, grid) {
    /** @type {?} */
    var field = columnDef.field || '';
    /** @type {?} */
    var val = totals.sum && totals.sum[field];
    /** @type {?} */
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    /** @type {?} */
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + '$' + decimalFormatted(val, 2, 2) + suffix;
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtVG90YWxzRG9sbGFyRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9ncm91cGluZy1mb3JtYXR0ZXJzL3N1bVRvdGFsc0RvbGxhckZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRTNELE1BQU0sS0FBTyx3QkFBd0IsR0FBeUIsVUFBQyxNQUFXLEVBQUUsU0FBaUIsRUFBRSxJQUFVOztRQUNqRyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFOztRQUM3QixHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7UUFDckMsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1FBQ2pILE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFO0lBRXZILElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtRQUNmLE9BQU8sTUFBTSxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztLQUM1RDtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgR3JvdXBUb3RhbHNGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGRlY2ltYWxGb3JtYXR0ZWQgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcblxyXG5leHBvcnQgY29uc3Qgc3VtVG90YWxzRG9sbGFyRm9ybWF0dGVyOiBHcm91cFRvdGFsc0Zvcm1hdHRlciA9ICh0b3RhbHM6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGdyaWQ/OiBhbnkpID0+IHtcclxuICBjb25zdCBmaWVsZCA9IGNvbHVtbkRlZi5maWVsZCB8fCAnJztcclxuICBjb25zdCB2YWwgPSB0b3RhbHMuc3VtICYmIHRvdGFscy5zdW1bZmllbGRdO1xyXG4gIGNvbnN0IHByZWZpeCA9IChjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJQcmVmaXgpID8gY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclByZWZpeCA6ICcnO1xyXG4gIGNvbnN0IHN1ZmZpeCA9IChjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJTdWZmaXgpID8gY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclN1ZmZpeCA6ICcnO1xyXG5cclxuICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgIHJldHVybiBwcmVmaXggKyAnJCcgKyBkZWNpbWFsRm9ybWF0dGVkKHZhbCwgMiwgMikgKyBzdWZmaXg7XHJcbiAgfVxyXG4gIHJldHVybiAnJztcclxufTtcclxuIl19