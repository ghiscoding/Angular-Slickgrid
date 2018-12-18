/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { avgTotalsPercentageFormatter } from './avgTotalsPercentageFormatter';
import { avgTotalsDollarFormatter } from './avgTotalsDollarFormatter';
import { avgTotalsFormatter } from './avgTotalsFormatter';
import { minTotalsFormatter } from './minTotalsFormatter';
import { maxTotalsFormatter } from './maxTotalsFormatter';
import { sumTotalsColoredFormatter } from './sumTotalsColoredFormatter';
import { sumTotalsDollarColoredBoldFormatter } from './sumTotalsDollarColoredBoldFormatter';
import { sumTotalsDollarColoredFormatter } from './sumTotalsDollarColoredFormatter';
import { sumTotalsDollarBoldFormatter } from './sumTotalsDollarBoldFormatter';
import { sumTotalsDollarFormatter } from './sumTotalsDollarFormatter';
import { sumTotalsFormatter } from './sumTotalsFormatter';
import { sumTotalsBoldFormatter } from './sumTotalsBoldFormatter';
/**
 * Provides a list of different Formatters that will change the cell value displayed in the UI
 * @type {?}
 */
export const GroupTotalFormatters = {
    /**
     * Average all the column totals
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    avgTotals: avgTotalsFormatter,
    /**
     * Average all the column totals and display '$' at the end of the value
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    avgTotalsDollar: avgTotalsDollarFormatter,
    /**
     * Average all the column totals and display '%' at the end of the value
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    avgTotalsPercentage: avgTotalsPercentageFormatter,
    /**
     * Show max value of all the column totals
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    maxTotals: maxTotalsFormatter,
    /**
     * Show min value of all the column totals
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    minTotals: minTotalsFormatter,
    /**
     * Sums up all the column totals
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    sumTotals: sumTotalsFormatter,
    /**
     * Sums up all the column totals and display it in bold font weight
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    sumTotalsBold: sumTotalsBoldFormatter,
    /**
     * Sums up all the column totals, change color of text to red/green on negative/positive value
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    sumTotalsColored: sumTotalsColoredFormatter,
    /**
     * Sums up all the column totals and display dollar sign
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    sumTotalsDollar: sumTotalsDollarFormatter,
    /**
     * Sums up all the column totals and display dollar sign and show it in bold font weight
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    sumTotalsDollarBold: sumTotalsDollarBoldFormatter,
    /**
     * Sums up all the column totals, change color of text to red/green on negative/positive value
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    sumTotalsDollarColored: sumTotalsDollarColoredFormatter,
    /**
     * Sums up all the column totals, change color of text to red/green on negative/positive value, show it in bold font weight as well
     * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
     */
    sumTotalsDollarColoredBold: sumTotalsDollarColoredBoldFormatter,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2dyb3VwaW5nLWZvcm1hdHRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQUdsRSxNQUFNLE9BQU8sb0JBQW9CLEdBQUc7Ozs7O0lBS2xDLFNBQVMsRUFBRSxrQkFBa0I7Ozs7O0lBTTdCLGVBQWUsRUFBRSx3QkFBd0I7Ozs7O0lBTXpDLG1CQUFtQixFQUFFLDRCQUE0Qjs7Ozs7SUFNakQsU0FBUyxFQUFFLGtCQUFrQjs7Ozs7SUFNN0IsU0FBUyxFQUFFLGtCQUFrQjs7Ozs7SUFNN0IsU0FBUyxFQUFFLGtCQUFrQjs7Ozs7SUFNN0IsYUFBYSxFQUFFLHNCQUFzQjs7Ozs7SUFNckMsZ0JBQWdCLEVBQUUseUJBQXlCOzs7OztJQU0zQyxlQUFlLEVBQUUsd0JBQXdCOzs7OztJQU16QyxtQkFBbUIsRUFBRSw0QkFBNEI7Ozs7O0lBTWpELHNCQUFzQixFQUFFLCtCQUErQjs7Ozs7SUFNdkQsMEJBQTBCLEVBQUUsbUNBQW1DO0NBQ2hFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBhdmdUb3RhbHNQZXJjZW50YWdlRm9ybWF0dGVyIH0gZnJvbSAnLi9hdmdUb3RhbHNQZXJjZW50YWdlRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgYXZnVG90YWxzRG9sbGFyRm9ybWF0dGVyIH0gZnJvbSAnLi9hdmdUb3RhbHNEb2xsYXJGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBhdmdUb3RhbHNGb3JtYXR0ZXIgfSBmcm9tICcuL2F2Z1RvdGFsc0Zvcm1hdHRlcic7XHJcbmltcG9ydCB7IG1pblRvdGFsc0Zvcm1hdHRlciB9IGZyb20gJy4vbWluVG90YWxzRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgbWF4VG90YWxzRm9ybWF0dGVyIH0gZnJvbSAnLi9tYXhUb3RhbHNGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBzdW1Ub3RhbHNDb2xvcmVkRm9ybWF0dGVyIH0gZnJvbSAnLi9zdW1Ub3RhbHNDb2xvcmVkRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgc3VtVG90YWxzRG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIgfSBmcm9tICcuL3N1bVRvdGFsc0RvbGxhckNvbG9yZWRCb2xkRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgc3VtVG90YWxzRG9sbGFyQ29sb3JlZEZvcm1hdHRlciB9IGZyb20gJy4vc3VtVG90YWxzRG9sbGFyQ29sb3JlZEZvcm1hdHRlcic7XHJcbmltcG9ydCB7IHN1bVRvdGFsc0RvbGxhckJvbGRGb3JtYXR0ZXIgfSBmcm9tICcuL3N1bVRvdGFsc0RvbGxhckJvbGRGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBzdW1Ub3RhbHNEb2xsYXJGb3JtYXR0ZXIgfSBmcm9tICcuL3N1bVRvdGFsc0RvbGxhckZvcm1hdHRlcic7XHJcbmltcG9ydCB7IHN1bVRvdGFsc0Zvcm1hdHRlciB9IGZyb20gJy4vc3VtVG90YWxzRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgc3VtVG90YWxzQm9sZEZvcm1hdHRlciB9IGZyb20gJy4vc3VtVG90YWxzQm9sZEZvcm1hdHRlcic7XHJcblxyXG4vKiogUHJvdmlkZXMgYSBsaXN0IG9mIGRpZmZlcmVudCBGb3JtYXR0ZXJzIHRoYXQgd2lsbCBjaGFuZ2UgdGhlIGNlbGwgdmFsdWUgZGlzcGxheWVkIGluIHRoZSBVSSAqL1xyXG5leHBvcnQgY29uc3QgR3JvdXBUb3RhbEZvcm1hdHRlcnMgPSB7XHJcbiAgLyoqXHJcbiAgICogQXZlcmFnZSBhbGwgdGhlIGNvbHVtbiB0b3RhbHNcclxuICAgKiBFeHRyYSBvcHRpb25zIGF2YWlsYWJsZSBpbiBcInBhcmFtc1wiOjogXCJncm91cEZvcm1hdHRlclByZWZpeFwiIGFuZCBcImdyb3VwRm9ybWF0dGVyU3VmZml4XCIsIGUuZy46IHBhcmFtczogeyBncm91cEZvcm1hdHRlclByZWZpeDogJzxpPlRvdGFsPC9pPjogJywgZ3JvdXBGb3JtYXR0ZXJTdWZmaXg6ICckJyB9XHJcbiAgICovXHJcbiAgYXZnVG90YWxzOiBhdmdUb3RhbHNGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKlxyXG4gICAqIEF2ZXJhZ2UgYWxsIHRoZSBjb2x1bW4gdG90YWxzIGFuZCBkaXNwbGF5ICckJyBhdCB0aGUgZW5kIG9mIHRoZSB2YWx1ZVxyXG4gICAqIEV4dHJhIG9wdGlvbnMgYXZhaWxhYmxlIGluIFwicGFyYW1zXCI6OiBcImdyb3VwRm9ybWF0dGVyUHJlZml4XCIgYW5kIFwiZ3JvdXBGb3JtYXR0ZXJTdWZmaXhcIiwgZS5nLjogcGFyYW1zOiB7IGdyb3VwRm9ybWF0dGVyUHJlZml4OiAnPGk+VG90YWw8L2k+OiAnLCBncm91cEZvcm1hdHRlclN1ZmZpeDogJyQnIH1cclxuICAgKi9cclxuICBhdmdUb3RhbHNEb2xsYXI6IGF2Z1RvdGFsc0RvbGxhckZvcm1hdHRlcixcclxuXHJcbiAgLyoqXHJcbiAgICogQXZlcmFnZSBhbGwgdGhlIGNvbHVtbiB0b3RhbHMgYW5kIGRpc3BsYXkgJyUnIGF0IHRoZSBlbmQgb2YgdGhlIHZhbHVlXHJcbiAgICogRXh0cmEgb3B0aW9ucyBhdmFpbGFibGUgaW4gXCJwYXJhbXNcIjo6IFwiZ3JvdXBGb3JtYXR0ZXJQcmVmaXhcIiBhbmQgXCJncm91cEZvcm1hdHRlclN1ZmZpeFwiLCBlLmcuOiBwYXJhbXM6IHsgZ3JvdXBGb3JtYXR0ZXJQcmVmaXg6ICc8aT5Ub3RhbDwvaT46ICcsIGdyb3VwRm9ybWF0dGVyU3VmZml4OiAnJCcgfVxyXG4gICAqL1xyXG4gIGF2Z1RvdGFsc1BlcmNlbnRhZ2U6IGF2Z1RvdGFsc1BlcmNlbnRhZ2VGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgbWF4IHZhbHVlIG9mIGFsbCB0aGUgY29sdW1uIHRvdGFsc1xyXG4gICAqIEV4dHJhIG9wdGlvbnMgYXZhaWxhYmxlIGluIFwicGFyYW1zXCI6OiBcImdyb3VwRm9ybWF0dGVyUHJlZml4XCIgYW5kIFwiZ3JvdXBGb3JtYXR0ZXJTdWZmaXhcIiwgZS5nLjogcGFyYW1zOiB7IGdyb3VwRm9ybWF0dGVyUHJlZml4OiAnPGk+VG90YWw8L2k+OiAnLCBncm91cEZvcm1hdHRlclN1ZmZpeDogJyQnIH1cclxuICAgKi9cclxuICBtYXhUb3RhbHM6IG1heFRvdGFsc0Zvcm1hdHRlcixcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBtaW4gdmFsdWUgb2YgYWxsIHRoZSBjb2x1bW4gdG90YWxzXHJcbiAgICogRXh0cmEgb3B0aW9ucyBhdmFpbGFibGUgaW4gXCJwYXJhbXNcIjo6IFwiZ3JvdXBGb3JtYXR0ZXJQcmVmaXhcIiBhbmQgXCJncm91cEZvcm1hdHRlclN1ZmZpeFwiLCBlLmcuOiBwYXJhbXM6IHsgZ3JvdXBGb3JtYXR0ZXJQcmVmaXg6ICc8aT5Ub3RhbDwvaT46ICcsIGdyb3VwRm9ybWF0dGVyU3VmZml4OiAnJCcgfVxyXG4gICAqL1xyXG4gIG1pblRvdGFsczogbWluVG90YWxzRm9ybWF0dGVyLFxyXG5cclxuICAvKipcclxuICAgKiBTdW1zIHVwIGFsbCB0aGUgY29sdW1uIHRvdGFsc1xyXG4gICAqIEV4dHJhIG9wdGlvbnMgYXZhaWxhYmxlIGluIFwicGFyYW1zXCI6OiBcImdyb3VwRm9ybWF0dGVyUHJlZml4XCIgYW5kIFwiZ3JvdXBGb3JtYXR0ZXJTdWZmaXhcIiwgZS5nLjogcGFyYW1zOiB7IGdyb3VwRm9ybWF0dGVyUHJlZml4OiAnPGk+VG90YWw8L2k+OiAnLCBncm91cEZvcm1hdHRlclN1ZmZpeDogJyQnIH1cclxuICAgKi9cclxuICBzdW1Ub3RhbHM6IHN1bVRvdGFsc0Zvcm1hdHRlcixcclxuXHJcbiAgLyoqXHJcbiAgICogU3VtcyB1cCBhbGwgdGhlIGNvbHVtbiB0b3RhbHMgYW5kIGRpc3BsYXkgaXQgaW4gYm9sZCBmb250IHdlaWdodFxyXG4gICAqIEV4dHJhIG9wdGlvbnMgYXZhaWxhYmxlIGluIFwicGFyYW1zXCI6OiBcImdyb3VwRm9ybWF0dGVyUHJlZml4XCIgYW5kIFwiZ3JvdXBGb3JtYXR0ZXJTdWZmaXhcIiwgZS5nOiBwYXJhbXM6IHsgZ3JvdXBGb3JtYXR0ZXJQcmVmaXg6ICc8aT5Ub3RhbDwvaT46ICcsIGdyb3VwRm9ybWF0dGVyU3VmZml4OiAnJCcgfVxyXG4gICAqL1xyXG4gIHN1bVRvdGFsc0JvbGQ6IHN1bVRvdGFsc0JvbGRGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKlxyXG4gICAqIFN1bXMgdXAgYWxsIHRoZSBjb2x1bW4gdG90YWxzLCBjaGFuZ2UgY29sb3Igb2YgdGV4dCB0byByZWQvZ3JlZW4gb24gbmVnYXRpdmUvcG9zaXRpdmUgdmFsdWVcclxuICAgKiBFeHRyYSBvcHRpb25zIGF2YWlsYWJsZSBpbiBcInBhcmFtc1wiOjogXCJncm91cEZvcm1hdHRlclByZWZpeFwiIGFuZCBcImdyb3VwRm9ybWF0dGVyU3VmZml4XCIsIGUuZzogcGFyYW1zOiB7IGdyb3VwRm9ybWF0dGVyUHJlZml4OiAnPGk+VG90YWw8L2k+OiAnLCBncm91cEZvcm1hdHRlclN1ZmZpeDogJyQnIH1cclxuICAgKi9cclxuICBzdW1Ub3RhbHNDb2xvcmVkOiBzdW1Ub3RhbHNDb2xvcmVkRm9ybWF0dGVyLFxyXG5cclxuICAvKipcclxuICAgKiBTdW1zIHVwIGFsbCB0aGUgY29sdW1uIHRvdGFscyBhbmQgZGlzcGxheSBkb2xsYXIgc2lnblxyXG4gICAqIEV4dHJhIG9wdGlvbnMgYXZhaWxhYmxlIGluIFwicGFyYW1zXCI6OiBcImdyb3VwRm9ybWF0dGVyUHJlZml4XCIgYW5kIFwiZ3JvdXBGb3JtYXR0ZXJTdWZmaXhcIiwgZS5nOiBwYXJhbXM6IHsgZ3JvdXBGb3JtYXR0ZXJQcmVmaXg6ICc8aT5Ub3RhbDwvaT46ICcsIGdyb3VwRm9ybWF0dGVyU3VmZml4OiAnJCcgfVxyXG4gICAqL1xyXG4gIHN1bVRvdGFsc0RvbGxhcjogc3VtVG90YWxzRG9sbGFyRm9ybWF0dGVyLFxyXG5cclxuICAvKipcclxuICAgKiBTdW1zIHVwIGFsbCB0aGUgY29sdW1uIHRvdGFscyBhbmQgZGlzcGxheSBkb2xsYXIgc2lnbiBhbmQgc2hvdyBpdCBpbiBib2xkIGZvbnQgd2VpZ2h0XHJcbiAgICogRXh0cmEgb3B0aW9ucyBhdmFpbGFibGUgaW4gXCJwYXJhbXNcIjo6IFwiZ3JvdXBGb3JtYXR0ZXJQcmVmaXhcIiBhbmQgXCJncm91cEZvcm1hdHRlclN1ZmZpeFwiLCBlLmc6IHBhcmFtczogeyBncm91cEZvcm1hdHRlclByZWZpeDogJzxpPlRvdGFsPC9pPjogJywgZ3JvdXBGb3JtYXR0ZXJTdWZmaXg6ICckJyB9XHJcbiAgICovXHJcbiAgc3VtVG90YWxzRG9sbGFyQm9sZDogc3VtVG90YWxzRG9sbGFyQm9sZEZvcm1hdHRlcixcclxuXHJcbiAgLyoqXHJcbiAgICogU3VtcyB1cCBhbGwgdGhlIGNvbHVtbiB0b3RhbHMsIGNoYW5nZSBjb2xvciBvZiB0ZXh0IHRvIHJlZC9ncmVlbiBvbiBuZWdhdGl2ZS9wb3NpdGl2ZSB2YWx1ZVxyXG4gICAqIEV4dHJhIG9wdGlvbnMgYXZhaWxhYmxlIGluIFwicGFyYW1zXCI6OiBcImdyb3VwRm9ybWF0dGVyUHJlZml4XCIgYW5kIFwiZ3JvdXBGb3JtYXR0ZXJTdWZmaXhcIiwgZS5nOiBwYXJhbXM6IHsgZ3JvdXBGb3JtYXR0ZXJQcmVmaXg6ICc8aT5Ub3RhbDwvaT46ICcsIGdyb3VwRm9ybWF0dGVyU3VmZml4OiAnJCcgfVxyXG4gICAqL1xyXG4gIHN1bVRvdGFsc0RvbGxhckNvbG9yZWQ6IHN1bVRvdGFsc0RvbGxhckNvbG9yZWRGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKlxyXG4gICAqIFN1bXMgdXAgYWxsIHRoZSBjb2x1bW4gdG90YWxzLCBjaGFuZ2UgY29sb3Igb2YgdGV4dCB0byByZWQvZ3JlZW4gb24gbmVnYXRpdmUvcG9zaXRpdmUgdmFsdWUsIHNob3cgaXQgaW4gYm9sZCBmb250IHdlaWdodCBhcyB3ZWxsXHJcbiAgICogRXh0cmEgb3B0aW9ucyBhdmFpbGFibGUgaW4gXCJwYXJhbXNcIjo6IFwiZ3JvdXBGb3JtYXR0ZXJQcmVmaXhcIiBhbmQgXCJncm91cEZvcm1hdHRlclN1ZmZpeFwiLCBlLmc6IHBhcmFtczogeyBncm91cEZvcm1hdHRlclByZWZpeDogJzxpPlRvdGFsPC9pPjogJywgZ3JvdXBGb3JtYXR0ZXJTdWZmaXg6ICckJyB9XHJcbiAgICovXHJcbiAgc3VtVG90YWxzRG9sbGFyQ29sb3JlZEJvbGQ6IHN1bVRvdGFsc0RvbGxhckNvbG9yZWRCb2xkRm9ybWF0dGVyLFxyXG59O1xyXG4iXX0=