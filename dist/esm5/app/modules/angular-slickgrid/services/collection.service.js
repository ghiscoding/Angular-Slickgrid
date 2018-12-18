/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilterMultiplePassType, FieldType, OperatorType, SortDirectionNumber, } from './../models/index';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { uniqueArray } from './utilities';
var CollectionService = /** @class */ (function () {
    function CollectionService(translate) {
        this.translate = translate;
    }
    /**
     * Filter 1 or more items from a collection
     * @param collection
     * @param filterByOptions
     */
    /**
     * Filter 1 or more items from a collection
     * @param {?} collection
     * @param {?} filterByOptions
     * @param {?=} filterResultBy
     * @return {?}
     */
    CollectionService.prototype.filterCollection = /**
     * Filter 1 or more items from a collection
     * @param {?} collection
     * @param {?} filterByOptions
     * @param {?=} filterResultBy
     * @return {?}
     */
    function (collection, filterByOptions, filterResultBy) {
        if (filterResultBy === void 0) { filterResultBy = FilterMultiplePassType.chain; }
        var e_1, _a;
        /** @type {?} */
        var filteredCollection = [];
        // when it's array, we will use the new filtered collection after every pass
        // basically if input collection has 10 items on 1st pass and 1 item is filtered out, then on 2nd pass the input collection will be 9 items
        if (Array.isArray(filterByOptions)) {
            filteredCollection = (filterResultBy === FilterMultiplePassType.merge) ? [] : collection;
            try {
                for (var filterByOptions_1 = tslib_1.__values(filterByOptions), filterByOptions_1_1 = filterByOptions_1.next(); !filterByOptions_1_1.done; filterByOptions_1_1 = filterByOptions_1.next()) {
                    var filter = filterByOptions_1_1.value;
                    if (filterResultBy === FilterMultiplePassType.merge) {
                        /** @type {?} */
                        var filteredPass = this.singleFilterCollection(collection, filter);
                        filteredCollection = uniqueArray(tslib_1.__spread(filteredCollection, filteredPass));
                    }
                    else {
                        filteredCollection = this.singleFilterCollection(filteredCollection, filter);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (filterByOptions_1_1 && !filterByOptions_1_1.done && (_a = filterByOptions_1.return)) _a.call(filterByOptions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            filteredCollection = this.singleFilterCollection(collection, filterByOptions);
        }
        return filteredCollection;
    };
    /**
     * Filter an item from a collection
     * @param collection
     * @param filterBy
     */
    /**
     * Filter an item from a collection
     * @param {?} collection
     * @param {?} filterBy
     * @return {?}
     */
    CollectionService.prototype.singleFilterCollection = /**
     * Filter an item from a collection
     * @param {?} collection
     * @param {?} filterBy
     * @return {?}
     */
    function (collection, filterBy) {
        /** @type {?} */
        var filteredCollection = [];
        if (filterBy) {
            /** @type {?} */
            var property_1 = filterBy.property || '';
            /** @type {?} */
            var operator = filterBy.operator || OperatorType.equal;
            // just check for undefined since the filter value could be null, 0, '', false etc
            /** @type {?} */
            var value_1 = typeof filterBy.value === 'undefined' ? '' : filterBy.value;
            switch (operator) {
                case OperatorType.equal:
                    filteredCollection = collection.filter(function (item) { return item[property_1] === value_1; });
                    break;
                case OperatorType.contains:
                    filteredCollection = collection.filter(function (item) { return item[property_1].toString().indexOf(value_1.toString()) !== -1; });
                    break;
                case OperatorType.notContains:
                    filteredCollection = collection.filter(function (item) { return item[property_1].toString().indexOf(value_1.toString()) === -1; });
                    break;
                case OperatorType.notEqual:
                default:
                    filteredCollection = collection.filter(function (item) { return item[property_1] !== value_1; });
            }
        }
        return filteredCollection;
    };
    /**
     * Sort 1 or more items in a collection
     * @param collection
     * @param sortByOptions
     * @param enableTranslateLabel
     */
    /**
     * Sort 1 or more items in a collection
     * @param {?} collection
     * @param {?} sortByOptions
     * @param {?=} enableTranslateLabel
     * @return {?}
     */
    CollectionService.prototype.sortCollection = /**
     * Sort 1 or more items in a collection
     * @param {?} collection
     * @param {?} sortByOptions
     * @param {?=} enableTranslateLabel
     * @return {?}
     */
    function (collection, sortByOptions, enableTranslateLabel) {
        var _this = this;
        /** @type {?} */
        var sortedCollection = [];
        if (sortByOptions) {
            if (Array.isArray(sortByOptions)) {
                // multi-sort
                sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                    for (var i = 0, l = sortByOptions.length; i < l; i++) {
                        /** @type {?} */
                        var sortBy = sortByOptions[i];
                        if (sortBy) {
                            /** @type {?} */
                            var sortDirection = sortBy.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                            /** @type {?} */
                            var propertyName = sortBy.property || '';
                            /** @type {?} */
                            var fieldType = sortBy.fieldType || FieldType.string;
                            /** @type {?} */
                            var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                            /** @type {?} */
                            var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                            /** @type {?} */
                            var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
                            if (sortResult !== SortDirectionNumber.neutral) {
                                return sortResult;
                            }
                        }
                    }
                    return SortDirectionNumber.neutral;
                });
            }
            else {
                // single sort
                /** @type {?} */
                var propertyName_1 = sortByOptions.property || '';
                /** @type {?} */
                var sortDirection_1 = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                /** @type {?} */
                var fieldType_1 = sortByOptions.fieldType || FieldType.string;
                sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                    /** @type {?} */
                    var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[propertyName_1] || ' ') : dataRow1[propertyName_1];
                    /** @type {?} */
                    var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[propertyName_1] || ' ') : dataRow2[propertyName_1];
                    /** @type {?} */
                    var sortResult = sortByFieldType(value1, value2, fieldType_1, sortDirection_1);
                    if (sortResult !== SortDirectionNumber.neutral) {
                        return sortResult;
                    }
                    return SortDirectionNumber.neutral;
                });
            }
        }
        return sortedCollection;
    };
    CollectionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CollectionService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    return CollectionService;
}());
export { CollectionService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CollectionService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxzQkFBc0IsRUFFdEIsU0FBUyxFQUNULFlBQVksRUFDWixtQkFBbUIsR0FDcEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUxQztJQUVFLDJCQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUFJLENBQUM7SUFFcEQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCw0Q0FBZ0I7Ozs7Ozs7SUFBaEIsVUFBaUIsVUFBaUIsRUFBRSxlQUEwRCxFQUFFLGNBQTJHO1FBQTNHLCtCQUFBLEVBQUEsaUJBQStFLHNCQUFzQixDQUFDLEtBQUs7OztZQUNyTSxrQkFBa0IsR0FBVSxFQUFFO1FBRWxDLDRFQUE0RTtRQUM1RSwySUFBMkk7UUFDM0ksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2xDLGtCQUFrQixHQUFHLENBQUMsY0FBYyxLQUFLLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzs7Z0JBRXpGLEtBQXFCLElBQUEsb0JBQUEsaUJBQUEsZUFBZSxDQUFBLGdEQUFBLDZFQUFFO29CQUFqQyxJQUFNLE1BQU0sNEJBQUE7b0JBQ2YsSUFBSSxj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LENBQUMsR0FBRzs7b0JBQzNGLFdBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNO2dCQUU3RCxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBYSxFQUFFLFFBQWE7O3dCQUN4RCxNQUFNLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBWSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFZLENBQUM7O3dCQUNoSCxNQUFNLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBWSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFZLENBQUM7O3dCQUNoSCxVQUFVLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBUyxFQUFFLGVBQWEsQ0FBQztvQkFDNUUsSUFBSSxVQUFVLEtBQUssbUJBQW1CLENBQUMsT0FBTyxFQUFFO3dCQUM5QyxPQUFPLFVBQVUsQ0FBQztxQkFDbkI7b0JBQ0QsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUVELE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQzs7Z0JBbkhGLFVBQVU7Ozs7Z0JBYkYsZ0JBQWdCOztJQWlJekIsd0JBQUM7Q0FBQSxBQXBIRCxJQW9IQztTQW5IWSxpQkFBaUI7Ozs7OztJQUNoQixzQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb2xsZWN0aW9uRmlsdGVyQnksXHJcbiAgQ29sbGVjdGlvblNvcnRCeSxcclxuICBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlLFxyXG4gIEZpbHRlck11bHRpcGxlUGFzc1R5cGVTdHJpbmcsXHJcbiAgRmllbGRUeXBlLFxyXG4gIE9wZXJhdG9yVHlwZSxcclxuICBTb3J0RGlyZWN0aW9uTnVtYmVyLFxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgc29ydEJ5RmllbGRUeXBlIH0gZnJvbSAnLi4vc29ydGVycy9zb3J0ZXJVdGlsaXRpZXMnO1xyXG5pbXBvcnQgeyB1bmlxdWVBcnJheSB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25TZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciAxIG9yIG1vcmUgaXRlbXMgZnJvbSBhIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBmaWx0ZXJCeU9wdGlvbnNcclxuICAgKi9cclxuICBmaWx0ZXJDb2xsZWN0aW9uKGNvbGxlY3Rpb246IGFueVtdLCBmaWx0ZXJCeU9wdGlvbnM6IENvbGxlY3Rpb25GaWx0ZXJCeSB8IENvbGxlY3Rpb25GaWx0ZXJCeVtdLCBmaWx0ZXJSZXN1bHRCeTogRmlsdGVyTXVsdGlwbGVQYXNzVHlwZSB8IEZpbHRlck11bHRpcGxlUGFzc1R5cGVTdHJpbmcgfCBudWxsID0gRmlsdGVyTXVsdGlwbGVQYXNzVHlwZS5jaGFpbik6IGFueVtdIHtcclxuICAgIGxldCBmaWx0ZXJlZENvbGxlY3Rpb246IGFueVtdID0gW107XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGFycmF5LCB3ZSB3aWxsIHVzZSB0aGUgbmV3IGZpbHRlcmVkIGNvbGxlY3Rpb24gYWZ0ZXIgZXZlcnkgcGFzc1xyXG4gICAgLy8gYmFzaWNhbGx5IGlmIGlucHV0IGNvbGxlY3Rpb24gaGFzIDEwIGl0ZW1zIG9uIDFzdCBwYXNzIGFuZCAxIGl0ZW0gaXMgZmlsdGVyZWQgb3V0LCB0aGVuIG9uIDJuZCBwYXNzIHRoZSBpbnB1dCBjb2xsZWN0aW9uIHdpbGwgYmUgOSBpdGVtc1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyQnlPcHRpb25zKSkge1xyXG4gICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSAoZmlsdGVyUmVzdWx0QnkgPT09IEZpbHRlck11bHRpcGxlUGFzc1R5cGUubWVyZ2UpID8gW10gOiBjb2xsZWN0aW9uO1xyXG5cclxuICAgICAgZm9yIChjb25zdCBmaWx0ZXIgb2YgZmlsdGVyQnlPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKGZpbHRlclJlc3VsdEJ5ID09PSBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlLm1lcmdlKSB7XHJcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZFBhc3MgPSB0aGlzLnNpbmdsZUZpbHRlckNvbGxlY3Rpb24oY29sbGVjdGlvbiwgZmlsdGVyKTtcclxuICAgICAgICAgIGZpbHRlcmVkQ29sbGVjdGlvbiA9IHVuaXF1ZUFycmF5KFsuLi5maWx0ZXJlZENvbGxlY3Rpb24sIC4uLmZpbHRlcmVkUGFzc10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSB0aGlzLnNpbmdsZUZpbHRlckNvbGxlY3Rpb24oZmlsdGVyZWRDb2xsZWN0aW9uLCBmaWx0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gdGhpcy5zaW5nbGVGaWx0ZXJDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIGZpbHRlckJ5T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcmVkQ29sbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciBhbiBpdGVtIGZyb20gYSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gZmlsdGVyQnlcclxuICAgKi9cclxuICBzaW5nbGVGaWx0ZXJDb2xsZWN0aW9uKGNvbGxlY3Rpb246IGFueVtdLCBmaWx0ZXJCeTogQ29sbGVjdGlvbkZpbHRlckJ5KTogYW55W10ge1xyXG4gICAgbGV0IGZpbHRlcmVkQ29sbGVjdGlvbjogYW55W10gPSBbXTtcclxuXHJcbiAgICBpZiAoZmlsdGVyQnkpIHtcclxuICAgICAgY29uc3QgcHJvcGVydHkgPSBmaWx0ZXJCeS5wcm9wZXJ0eSB8fCAnJztcclxuICAgICAgY29uc3Qgb3BlcmF0b3IgPSBmaWx0ZXJCeS5vcGVyYXRvciB8fCBPcGVyYXRvclR5cGUuZXF1YWw7XHJcbiAgICAgIC8vIGp1c3QgY2hlY2sgZm9yIHVuZGVmaW5lZCBzaW5jZSB0aGUgZmlsdGVyIHZhbHVlIGNvdWxkIGJlIG51bGwsIDAsICcnLCBmYWxzZSBldGNcclxuICAgICAgY29uc3QgdmFsdWUgPSB0eXBlb2YgZmlsdGVyQnkudmFsdWUgPT09ICd1bmRlZmluZWQnID8gJycgOiBmaWx0ZXJCeS52YWx1ZTtcclxuXHJcbiAgICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcclxuICAgICAgICBjYXNlIE9wZXJhdG9yVHlwZS5lcXVhbDpcclxuICAgICAgICAgIGZpbHRlcmVkQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uZmlsdGVyKChpdGVtKSA9PiBpdGVtW3Byb3BlcnR5XSA9PT0gdmFsdWUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBPcGVyYXRvclR5cGUuY29udGFpbnM6XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbVtwcm9wZXJ0eV0udG9TdHJpbmcoKS5pbmRleE9mKHZhbHVlLnRvU3RyaW5nKCkpICE9PSAtMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIE9wZXJhdG9yVHlwZS5ub3RDb250YWluczpcclxuICAgICAgICAgIGZpbHRlcmVkQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uZmlsdGVyKChpdGVtKSA9PiBpdGVtW3Byb3BlcnR5XS50b1N0cmluZygpLmluZGV4T2YodmFsdWUudG9TdHJpbmcoKSkgPT09IC0xKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgT3BlcmF0b3JUeXBlLm5vdEVxdWFsOlxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbVtwcm9wZXJ0eV0gIT09IHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaWx0ZXJlZENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IDEgb3IgbW9yZSBpdGVtcyBpbiBhIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBzb3J0QnlPcHRpb25zXHJcbiAgICogQHBhcmFtIGVuYWJsZVRyYW5zbGF0ZUxhYmVsXHJcbiAgICovXHJcbiAgc29ydENvbGxlY3Rpb24oY29sbGVjdGlvbjogYW55W10sIHNvcnRCeU9wdGlvbnM6IENvbGxlY3Rpb25Tb3J0QnkgfCBDb2xsZWN0aW9uU29ydEJ5W10sIGVuYWJsZVRyYW5zbGF0ZUxhYmVsPzogYm9vbGVhbik6IGFueVtdIHtcclxuICAgIGxldCBzb3J0ZWRDb2xsZWN0aW9uOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIGlmIChzb3J0QnlPcHRpb25zKSB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNvcnRCeU9wdGlvbnMpKSB7XHJcbiAgICAgICAgLy8gbXVsdGktc29ydFxyXG4gICAgICAgIHNvcnRlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLnNvcnQoKGRhdGFSb3cxOiBhbnksIGRhdGFSb3cyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc29ydEJ5T3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgc29ydEJ5ID0gc29ydEJ5T3B0aW9uc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzb3J0QnkpIHtcclxuICAgICAgICAgICAgICBjb25zdCBzb3J0RGlyZWN0aW9uID0gc29ydEJ5LnNvcnREZXNjID8gU29ydERpcmVjdGlvbk51bWJlci5kZXNjIDogU29ydERpcmVjdGlvbk51bWJlci5hc2M7XHJcbiAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lID0gc29ydEJ5LnByb3BlcnR5IHx8ICcnO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IHNvcnRCeS5maWVsZFR5cGUgfHwgRmllbGRUeXBlLnN0cmluZztcclxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZTEgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93MVtwcm9wZXJ0eU5hbWVdIHx8ICcgJykgOiBkYXRhUm93MVtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlMiA9IChlbmFibGVUcmFuc2xhdGVMYWJlbCkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGRhdGFSb3cyW3Byb3BlcnR5TmFtZV0gfHwgJyAnKSA6IGRhdGFSb3cyW3Byb3BlcnR5TmFtZV07XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IHNvcnRSZXN1bHQgPSBzb3J0QnlGaWVsZFR5cGUodmFsdWUxLCB2YWx1ZTIsIGZpZWxkVHlwZSwgc29ydERpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgaWYgKHNvcnRSZXN1bHQgIT09IFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvcnRSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHNpbmdsZSBzb3J0XHJcbiAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lID0gc29ydEJ5T3B0aW9ucy5wcm9wZXJ0eSB8fCAnJztcclxuICAgICAgICBjb25zdCBzb3J0RGlyZWN0aW9uID0gc29ydEJ5T3B0aW9ucy5zb3J0RGVzYyA/IFNvcnREaXJlY3Rpb25OdW1iZXIuZGVzYyA6IFNvcnREaXJlY3Rpb25OdW1iZXIuYXNjO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IHNvcnRCeU9wdGlvbnMuZmllbGRUeXBlIHx8IEZpZWxkVHlwZS5zdHJpbmc7XHJcblxyXG4gICAgICAgIHNvcnRlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLnNvcnQoKGRhdGFSb3cxOiBhbnksIGRhdGFSb3cyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHZhbHVlMSA9IChlbmFibGVUcmFuc2xhdGVMYWJlbCkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGRhdGFSb3cxW3Byb3BlcnR5TmFtZV0gfHwgJyAnKSA6IGRhdGFSb3cxW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZTIgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93Mltwcm9wZXJ0eU5hbWVdIHx8ICcgJykgOiBkYXRhUm93Mltwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgY29uc3Qgc29ydFJlc3VsdCA9IHNvcnRCeUZpZWxkVHlwZSh2YWx1ZTEsIHZhbHVlMiwgZmllbGRUeXBlLCBzb3J0RGlyZWN0aW9uKTtcclxuICAgICAgICAgIGlmIChzb3J0UmVzdWx0ICE9PSBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNvcnRSZXN1bHQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNvcnRlZENvbGxlY3Rpb247XHJcbiAgfVxyXG59XHJcbiJdfQ==