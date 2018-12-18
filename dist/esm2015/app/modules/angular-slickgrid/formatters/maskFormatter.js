/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a value display it according to a mask provided
 * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
 * @type {?}
 */
export const maskFormatter = (row, cell, value, columnDef, dataContext) => {
    /** @type {?} */
    const params = columnDef.params || {};
    /** @type {?} */
    const mask = params.mask;
    if (!mask) {
        throw new Error(`You must provide a "mask" via the generic "params" options (e.g.: { formatter: Formatters.mask, params: { mask: '000-000' }}`);
    }
    if (value && mask) {
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        const v = value.toString();
        return mask.replace(/[09A]/g, () => v[i++] || '');
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFza0Zvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9tYXNrRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU9BLE1BQU0sT0FBTyxhQUFhLEdBQWMsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQUUsRUFBRTs7VUFDL0csTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTs7VUFDL0IsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJO0lBRXhCLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLDhIQUE4SCxDQUFDLENBQUM7S0FDako7SUFFRCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7O1lBQ2IsQ0FBQyxHQUFHLENBQUM7O2NBQ0gsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNuRDtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhIHZhbHVlIGRpc3BsYXkgaXQgYWNjb3JkaW5nIHRvIGEgbWFzayBwcm92aWRlZFxyXG4gKiBlLjogMTIzNDU2Nzg5MCB3aXRoIG1hc2sgXCIoMDAwKSAwMDAtMDAwMFwiIHdpbGwgZGlzcGxheSBcIigxMjMpIDQ1Ni03ODkwXCJcclxuICovXHJcbmV4cG9ydCBjb25zdCBtYXNrRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcclxuICBjb25zdCBwYXJhbXMgPSBjb2x1bW5EZWYucGFyYW1zIHx8IHt9O1xyXG4gIGNvbnN0IG1hc2sgPSBwYXJhbXMubWFzaztcclxuXHJcbiAgaWYgKCFtYXNrKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFlvdSBtdXN0IHByb3ZpZGUgYSBcIm1hc2tcIiB2aWEgdGhlIGdlbmVyaWMgXCJwYXJhbXNcIiBvcHRpb25zIChlLmcuOiB7IGZvcm1hdHRlcjogRm9ybWF0dGVycy5tYXNrLCBwYXJhbXM6IHsgbWFzazogJzAwMC0wMDAnIH19YCk7XHJcbiAgfVxyXG5cclxuICBpZiAodmFsdWUgJiYgbWFzaykge1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgY29uc3QgdiA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICByZXR1cm4gbWFzay5yZXBsYWNlKC9bMDlBXS9nLCAoKSA9PiB2W2krK10gfHwgJycpO1xyXG4gIH1cclxuICByZXR1cm4gJyc7XHJcbn07XHJcbiJdfQ==