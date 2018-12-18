/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as moment_ from 'moment-mini';
/** @type {?} */
const moment = moment_;
// patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} format
 * @param {?} sortDirection
 * @param {?=} strict
 * @return {?}
 */
export function compareDates(value1, value2, format, sortDirection, strict) {
    /** @type {?} */
    let diff = 0;
    if (value1 === null || value1 === '' || !moment(value1, format, strict).isValid()) {
        diff = -1;
    }
    else if (value2 === null || value2 === '' || !moment(value2, format, strict).isValid()) {
        diff = 1;
    }
    else {
        /** @type {?} */
        const date1 = moment(value1, format, strict);
        /** @type {?} */
        const date2 = moment(value2, format, strict);
        diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
    }
    return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFyZURhdGVVdGlsaXR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL2NvbXBhcmVEYXRlVXRpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxLQUFLLE9BQU8sTUFBTSxhQUFhLENBQUM7O01BQ2pDLE1BQU0sR0FBRyxPQUFPOzs7Ozs7Ozs7O0FBRXRCLE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQWdCOztRQUM5RSxJQUFJLEdBQUcsQ0FBQztJQUVaLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDakYsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ1g7U0FBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3hGLElBQUksR0FBRyxDQUFDLENBQUM7S0FDVjtTQUFNOztjQUNDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7O2NBQ3RDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDNUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzFFO0lBRUQsT0FBTyxhQUFhLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50LW1pbmknO1xyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIFwibW9tZW50IGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiIGlzc3VlLCBkb2N1bWVudCBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2lzc3Vlcy82NzBcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlRGF0ZXModmFsdWUxLCB2YWx1ZTIsIGZvcm1hdCwgc29ydERpcmVjdGlvbiwgc3RyaWN0PzogYm9vbGVhbikge1xyXG4gIGxldCBkaWZmID0gMDtcclxuXHJcbiAgaWYgKHZhbHVlMSA9PT0gbnVsbCB8fCB2YWx1ZTEgPT09ICcnIHx8ICFtb21lbnQodmFsdWUxLCBmb3JtYXQsIHN0cmljdCkuaXNWYWxpZCgpKSB7XHJcbiAgICBkaWZmID0gLTE7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZTIgPT09IG51bGwgfHwgdmFsdWUyID09PSAnJyB8fCAhbW9tZW50KHZhbHVlMiwgZm9ybWF0LCBzdHJpY3QpLmlzVmFsaWQoKSkge1xyXG4gICAgZGlmZiA9IDE7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IGRhdGUxID0gbW9tZW50KHZhbHVlMSwgZm9ybWF0LCBzdHJpY3QpO1xyXG4gICAgY29uc3QgZGF0ZTIgPSBtb21lbnQodmFsdWUyLCBmb3JtYXQsIHN0cmljdCk7XHJcbiAgICBkaWZmID0gcGFyc2VJbnQoZGF0ZTEuZm9ybWF0KCdYJyksIDEwKSAtIHBhcnNlSW50KGRhdGUyLmZvcm1hdCgnWCcpLCAxMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc29ydERpcmVjdGlvbiAqIChkaWZmID09PSAwID8gMCA6IChkaWZmID4gMCA/IDEgOiAtMSkpO1xyXG59XHJcbiJdfQ==