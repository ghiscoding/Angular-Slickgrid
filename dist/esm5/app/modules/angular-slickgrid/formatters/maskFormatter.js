/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a value display it according to a mask provided
 * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
 * @type {?}
 */
export var maskFormatter = function (row, cell, value, columnDef, dataContext) {
    /** @type {?} */
    var params = columnDef.params || {};
    /** @type {?} */
    var mask = params.mask;
    if (!mask) {
        throw new Error("You must provide a \"mask\" via the generic \"params\" options (e.g.: { formatter: Formatters.mask, params: { mask: '000-000' }}");
    }
    if (value && mask) {
        /** @type {?} */
        var i_1 = 0;
        /** @type {?} */
        var v_1 = value.toString();
        return mask.replace(/[09A]/g, function () { return v_1[i_1++] || ''; });
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFza0Zvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9tYXNrRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU9BLE1BQU0sS0FBTyxhQUFhLEdBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCOztRQUMzRyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFOztRQUMvQixJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUk7SUFFeEIsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsa0lBQThILENBQUMsQ0FBQztLQUNqSjtJQUVELElBQUksS0FBSyxJQUFJLElBQUksRUFBRTs7WUFDYixHQUFDLEdBQUcsQ0FBQzs7WUFDSCxHQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQVosQ0FBWSxDQUFDLENBQUM7S0FDbkQ7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vKipcclxuICogVGFrZXMgYSB2YWx1ZSBkaXNwbGF5IGl0IGFjY29yZGluZyB0byBhIG1hc2sgcHJvdmlkZWRcclxuICogZS46IDEyMzQ1Njc4OTAgd2l0aCBtYXNrIFwiKDAwMCkgMDAwLTAwMDBcIiB3aWxsIGRpc3BsYXkgXCIoMTIzKSA0NTYtNzg5MFwiXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWFza0Zvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XHJcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcclxuICBjb25zdCBtYXNrID0gcGFyYW1zLm1hc2s7XHJcblxyXG4gIGlmICghbWFzaykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBZb3UgbXVzdCBwcm92aWRlIGEgXCJtYXNrXCIgdmlhIHRoZSBnZW5lcmljIFwicGFyYW1zXCIgb3B0aW9ucyAoZS5nLjogeyBmb3JtYXR0ZXI6IEZvcm1hdHRlcnMubWFzaywgcGFyYW1zOiB7IG1hc2s6ICcwMDAtMDAwJyB9fWApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHZhbHVlICYmIG1hc2spIHtcclxuICAgIGxldCBpID0gMDtcclxuICAgIGNvbnN0IHYgPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgcmV0dXJuIG1hc2sucmVwbGFjZSgvWzA5QV0vZywgKCkgPT4gdltpKytdIHx8ICcnKTtcclxuICB9XHJcbiAgcmV0dXJuICcnO1xyXG59O1xyXG4iXX0=