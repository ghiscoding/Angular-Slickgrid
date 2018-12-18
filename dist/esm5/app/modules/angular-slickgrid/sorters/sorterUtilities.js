/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from './../models/index';
import { Sorters } from './index';
/**
 * @param {?} value1
 * @param {?} value2
 * @param {?} fieldType
 * @param {?} sortDirection
 * @return {?}
 */
export function sortByFieldType(value1, value2, fieldType, sortDirection) {
    /** @type {?} */
    var sortResult = 0;
    switch (fieldType) {
        case FieldType.number:
            sortResult = Sorters.numeric(value1, value2, sortDirection);
            break;
        case FieldType.date:
            sortResult = Sorters.date(value1, value2, sortDirection);
            break;
        case FieldType.dateIso:
            sortResult = Sorters.dateIso(value1, value2, sortDirection);
            break;
        case FieldType.dateUs:
            sortResult = Sorters.dateUs(value1, value2, sortDirection);
            break;
        case FieldType.dateUsShort:
            sortResult = Sorters.dateUsShort(value1, value2, sortDirection);
            break;
        default:
            sortResult = Sorters.string(value1, value2, sortDirection);
            break;
    }
    return sortResult;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVyVXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL3NvcnRlclV0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7Ozs7O0FBRWxDLE1BQU0sVUFBVSxlQUFlLENBQUMsTUFBVyxFQUFFLE1BQVcsRUFBRSxTQUFvQixFQUFFLGFBQXFCOztRQUMvRixVQUFVLEdBQUcsQ0FBQztJQUVsQixRQUFRLFNBQVMsRUFBRTtRQUNqQixLQUFLLFNBQVMsQ0FBQyxNQUFNO1lBQ25CLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDNUQsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLElBQUk7WUFDakIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN6RCxNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUMsT0FBTztZQUNwQixVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzVELE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQyxNQUFNO1lBQ25CLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDM0QsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDLFdBQVc7WUFDeEIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNoRSxNQUFNO1FBQ1I7WUFDRSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzNELE1BQU07S0FDVDtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IFNvcnRlcnMgfSBmcm9tICcuL2luZGV4JztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlGaWVsZFR5cGUodmFsdWUxOiBhbnksIHZhbHVlMjogYW55LCBmaWVsZFR5cGU6IEZpZWxkVHlwZSwgc29ydERpcmVjdGlvbjogbnVtYmVyKSB7XHJcbiAgbGV0IHNvcnRSZXN1bHQgPSAwO1xyXG5cclxuICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xyXG4gICAgY2FzZSBGaWVsZFR5cGUubnVtYmVyOlxyXG4gICAgICBzb3J0UmVzdWx0ID0gU29ydGVycy5udW1lcmljKHZhbHVlMSwgdmFsdWUyLCBzb3J0RGlyZWN0aW9uKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlOlxyXG4gICAgICBzb3J0UmVzdWx0ID0gU29ydGVycy5kYXRlKHZhbHVlMSwgdmFsdWUyLCBzb3J0RGlyZWN0aW9uKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlSXNvOlxyXG4gICAgICBzb3J0UmVzdWx0ID0gU29ydGVycy5kYXRlSXNvKHZhbHVlMSwgdmFsdWUyLCBzb3J0RGlyZWN0aW9uKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXM6XHJcbiAgICAgIHNvcnRSZXN1bHQgPSBTb3J0ZXJzLmRhdGVVcyh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzU2hvcnQ6XHJcbiAgICAgIHNvcnRSZXN1bHQgPSBTb3J0ZXJzLmRhdGVVc1Nob3J0KHZhbHVlMSwgdmFsdWUyLCBzb3J0RGlyZWN0aW9uKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBzb3J0UmVzdWx0ID0gU29ydGVycy5zdHJpbmcodmFsdWUxLCB2YWx1ZTIsIHNvcnREaXJlY3Rpb24pO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcblxyXG4gIHJldHVybiBzb3J0UmVzdWx0O1xyXG59XHJcbiJdfQ==