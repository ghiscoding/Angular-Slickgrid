/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const hyperlinkFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value && typeof value === 'string') {
        /** @type {?} */
        const matchUrl = value.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i);
        if (matchUrl && Array.isArray(matchUrl)) {
            return `<a href="${matchUrl[0]}">' + value + '</a>`;
        }
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL2h5cGVybGlua0Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE1BQU0sT0FBTyxrQkFBa0IsR0FBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxFQUFFO0lBQzFILElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTs7Y0FDaEMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsbUdBQW1HLENBQUM7UUFDakksSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN2QyxPQUFPLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztTQUNyRDtLQUNGO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSAnLi8uLi9tb2RlbHMvY29sdW1uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2Zvcm1hdHRlci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGh5cGVybGlua0Zvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XHJcbiAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIGNvbnN0IG1hdGNoVXJsID0gdmFsdWUubWF0Y2goL14oaHR0cHxmdHB8aHR0cHMpOlxcL1xcL1tcXHdcXC1fXSsoXFwuW1xcd1xcLV9dKykrKFtcXHdcXC1cXC4sQD9ePSUmYW1wOzpcXC9+XFwrI10qW1xcd1xcLVxcQD9ePSUmYW1wO1xcL35cXCsjXSk/L2kpO1xyXG4gICAgaWYgKG1hdGNoVXJsICYmIEFycmF5LmlzQXJyYXkobWF0Y2hVcmwpKSB7XHJcbiAgICAgIHJldHVybiBgPGEgaHJlZj1cIiR7bWF0Y2hVcmxbMF19XCI+JyArIHZhbHVlICsgJzwvYT5gO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gJyc7XHJcbn07XHJcbiJdfQ==