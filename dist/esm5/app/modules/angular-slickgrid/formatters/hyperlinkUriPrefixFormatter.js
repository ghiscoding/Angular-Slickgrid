/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"
 * @type {?}
 */
export var hyperlinkUriPrefixFormatter = function (row, cell, value, columnDef, dataContext) {
    /** @type {?} */
    var uriPrefix = (columnDef && columnDef.params && columnDef.params.uriPrefix) ? columnDef.params.uriPrefix : '';
    if (!uriPrefix) {
        throw new Error("HyperlinkUriPrefix Formatter require a \"uriPrefix\" that can be passed through params. e.g.:: formatter: Formatters.hyperlinkUriPrefix, params: { uriPrefix: '/users/' }");
    }
    if (value && uriPrefix && typeof uriPrefix === 'string' && !uriPrefix.includes('<script>')) {
        uriPrefix += value;
        return '<a href="' + uriPrefix + '">' + value + '</a>';
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rVXJpUHJlZml4Rm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL2h5cGVybGlua1VyaVByZWZpeEZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLE1BQU0sS0FBTywyQkFBMkIsR0FBYyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0I7O1FBQzNILFNBQVMsR0FBRyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQy9HLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLDJLQUF5SyxDQUFDLENBQUM7S0FDNUw7SUFDRCxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMxRixTQUFTLElBQUksS0FBSyxDQUFDO1FBQ25CLE9BQU8sV0FBVyxHQUFHLFNBQVMsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQztLQUN4RDtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLyoqIFRha2VzIGFuIGh5cGVybGluayBVUkkgcHJlZml4IChwYXNzZWQgaW4gY29sdW1uIGRlZmluaXRpb24gXCJwYXJhbXMudXJpUHJlZml4XCIpIGFuZCBhZGRzIHRoZSBjZWxsIHZhbHVlLiBUaGUgc3RydWN0dXJlIHdpbGwgYmUgXCI8YSBocmVmPVwidXJpUHJlZml4XCI+dmFsdWU8L2E+XCIgICovXHJcbmV4cG9ydCBjb25zdCBoeXBlcmxpbmtVcmlQcmVmaXhGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSkgPT4ge1xyXG4gIGxldCB1cmlQcmVmaXggPSAoY29sdW1uRGVmICYmIGNvbHVtbkRlZi5wYXJhbXMgJiYgY29sdW1uRGVmLnBhcmFtcy51cmlQcmVmaXgpID8gY29sdW1uRGVmLnBhcmFtcy51cmlQcmVmaXggOiAnJztcclxuICBpZiAoIXVyaVByZWZpeCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBIeXBlcmxpbmtVcmlQcmVmaXggRm9ybWF0dGVyIHJlcXVpcmUgYSBcInVyaVByZWZpeFwiIHRoYXQgY2FuIGJlIHBhc3NlZCB0aHJvdWdoIHBhcmFtcy4gZS5nLjo6IGZvcm1hdHRlcjogRm9ybWF0dGVycy5oeXBlcmxpbmtVcmlQcmVmaXgsIHBhcmFtczogeyB1cmlQcmVmaXg6ICcvdXNlcnMvJyB9YCk7XHJcbiAgfVxyXG4gIGlmICh2YWx1ZSAmJiB1cmlQcmVmaXggJiYgdHlwZW9mIHVyaVByZWZpeCA9PT0gJ3N0cmluZycgJiYgIXVyaVByZWZpeC5pbmNsdWRlcygnPHNjcmlwdD4nKSkge1xyXG4gICAgdXJpUHJlZml4ICs9IHZhbHVlO1xyXG4gICAgcmV0dXJuICc8YSBocmVmPVwiJyArIHVyaVByZWZpeCArICdcIj4nICsgdmFsdWUgKyAnPC9hPic7XHJcbiAgfVxyXG4gIHJldHVybiAnJztcclxufTtcclxuIl19