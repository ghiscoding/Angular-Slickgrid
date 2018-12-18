/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"
 * @type {?}
 */
export const hyperlinkUriPrefixFormatter = (row, cell, value, columnDef, dataContext) => {
    /** @type {?} */
    let uriPrefix = (columnDef && columnDef.params && columnDef.params.uriPrefix) ? columnDef.params.uriPrefix : '';
    if (!uriPrefix) {
        throw new Error(`HyperlinkUriPrefix Formatter require a "uriPrefix" that can be passed through params. e.g.:: formatter: Formatters.hyperlinkUriPrefix, params: { uriPrefix: '/users/' }`);
    }
    if (value && uriPrefix && typeof uriPrefix === 'string' && !uriPrefix.includes('<script>')) {
        uriPrefix += value;
        return '<a href="' + uriPrefix + '">' + value + '</a>';
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rVXJpUHJlZml4Rm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL2h5cGVybGlua1VyaVByZWZpeEZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLE1BQU0sT0FBTywyQkFBMkIsR0FBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxFQUFFOztRQUMvSCxTQUFTLEdBQUcsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUMvRyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5S0FBeUssQ0FBQyxDQUFDO0tBQzVMO0lBQ0QsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDMUYsU0FBUyxJQUFJLEtBQUssQ0FBQztRQUNuQixPQUFPLFdBQVcsR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDeEQ7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8qKiBUYWtlcyBhbiBoeXBlcmxpbmsgVVJJIHByZWZpeCAocGFzc2VkIGluIGNvbHVtbiBkZWZpbml0aW9uIFwicGFyYW1zLnVyaVByZWZpeFwiKSBhbmQgYWRkcyB0aGUgY2VsbCB2YWx1ZS4gVGhlIHN0cnVjdHVyZSB3aWxsIGJlIFwiPGEgaHJlZj1cInVyaVByZWZpeFwiPnZhbHVlPC9hPlwiICAqL1xyXG5leHBvcnQgY29uc3QgaHlwZXJsaW5rVXJpUHJlZml4Rm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcclxuICBsZXQgdXJpUHJlZml4ID0gKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMudXJpUHJlZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMudXJpUHJlZml4IDogJyc7XHJcbiAgaWYgKCF1cmlQcmVmaXgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgSHlwZXJsaW5rVXJpUHJlZml4IEZvcm1hdHRlciByZXF1aXJlIGEgXCJ1cmlQcmVmaXhcIiB0aGF0IGNhbiBiZSBwYXNzZWQgdGhyb3VnaCBwYXJhbXMuIGUuZy46OiBmb3JtYXR0ZXI6IEZvcm1hdHRlcnMuaHlwZXJsaW5rVXJpUHJlZml4LCBwYXJhbXM6IHsgdXJpUHJlZml4OiAnL3VzZXJzLycgfWApO1xyXG4gIH1cclxuICBpZiAodmFsdWUgJiYgdXJpUHJlZml4ICYmIHR5cGVvZiB1cmlQcmVmaXggPT09ICdzdHJpbmcnICYmICF1cmlQcmVmaXguaW5jbHVkZXMoJzxzY3JpcHQ+JykpIHtcclxuICAgIHVyaVByZWZpeCArPSB2YWx1ZTtcclxuICAgIHJldHVybiAnPGEgaHJlZj1cIicgKyB1cmlQcmVmaXggKyAnXCI+JyArIHZhbHVlICsgJzwvYT4nO1xyXG4gIH1cclxuICByZXR1cm4gJyc7XHJcbn07XHJcbiJdfQ==