/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilterMultiplePassType, FieldType, OperatorType, SortDirectionNumber, } from './../models/index';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { uniqueArray } from './utilities';
export class CollectionService {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
    }
    /**
     * Filter 1 or more items from a collection
     * @param {?} collection
     * @param {?} filterByOptions
     * @param {?=} filterResultBy
     * @return {?}
     */
    filterCollection(collection, filterByOptions, filterResultBy = FilterMultiplePassType.chain) {
        /** @type {?} */
        let filteredCollection = [];
        // when it's array, we will use the new filtered collection after every pass
        // basically if input collection has 10 items on 1st pass and 1 item is filtered out, then on 2nd pass the input collection will be 9 items
        if (Array.isArray(filterByOptions)) {
            filteredCollection = (filterResultBy === FilterMultiplePassType.merge) ? [] : collection;
            for (const filter of filterByOptions) {
                if (filterResultBy === FilterMultiplePassType.merge) {
                    /** @type {?} */
                    const filteredPass = this.singleFilterCollection(collection, filter);
                    filteredCollection = uniqueArray([...filteredCollection, ...filteredPass]);
                }
                else {
                    filteredCollection = this.singleFilterCollection(filteredCollection, filter);
                }
            }
        }
        else {
            filteredCollection = this.singleFilterCollection(collection, filterByOptions);
        }
        return filteredCollection;
    }
    /**
     * Filter an item from a collection
     * @param {?} collection
     * @param {?} filterBy
     * @return {?}
     */
    singleFilterCollection(collection, filterBy) {
        /** @type {?} */
        let filteredCollection = [];
        if (filterBy) {
            /** @type {?} */
            const property = filterBy.property || '';
            /** @type {?} */
            const operator = filterBy.operator || OperatorType.equal;
            // just check for undefined since the filter value could be null, 0, '', false etc
            /** @type {?} */
            const value = typeof filterBy.value === 'undefined' ? '' : filterBy.value;
            switch (operator) {
                case OperatorType.equal:
                    filteredCollection = collection.filter((item) => item[property] === value);
                    break;
                case OperatorType.contains:
                    filteredCollection = collection.filter((item) => item[property].toString().indexOf(value.toString()) !== -1);
                    break;
                case OperatorType.notContains:
                    filteredCollection = collection.filter((item) => item[property].toString().indexOf(value.toString()) === -1);
                    break;
                case OperatorType.notEqual:
                default:
                    filteredCollection = collection.filter((item) => item[property] !== value);
            }
        }
        return filteredCollection;
    }
    /**
     * Sort 1 or more items in a collection
     * @param {?} collection
     * @param {?} sortByOptions
     * @param {?=} enableTranslateLabel
     * @return {?}
     */
    sortCollection(collection, sortByOptions, enableTranslateLabel) {
        /** @type {?} */
        let sortedCollection = [];
        if (sortByOptions) {
            if (Array.isArray(sortByOptions)) {
                // multi-sort
                sortedCollection = collection.sort((dataRow1, dataRow2) => {
                    for (let i = 0, l = sortByOptions.length; i < l; i++) {
                        /** @type {?} */
                        const sortBy = sortByOptions[i];
                        if (sortBy) {
                            /** @type {?} */
                            const sortDirection = sortBy.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                            /** @type {?} */
                            const propertyName = sortBy.property || '';
                            /** @type {?} */
                            const fieldType = sortBy.fieldType || FieldType.string;
                            /** @type {?} */
                            const value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                            /** @type {?} */
                            const value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                            /** @type {?} */
                            const sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
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
                const propertyName = sortByOptions.property || '';
                /** @type {?} */
                const sortDirection = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                /** @type {?} */
                const fieldType = sortByOptions.fieldType || FieldType.string;
                sortedCollection = collection.sort((dataRow1, dataRow2) => {
                    /** @type {?} */
                    const value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                    /** @type {?} */
                    const value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                    /** @type {?} */
                    const sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
                    if (sortResult !== SortDirectionNumber.neutral) {
                        return sortResult;
                    }
                    return SortDirectionNumber.neutral;
                });
            }
        }
        return sortedCollection;
    }
}
CollectionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CollectionService.ctorParameters = () => [
    { type: TranslateService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    CollectionService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUdMLHNCQUFzQixFQUV0QixTQUFTLEVBQ1QsWUFBWSxFQUNaLG1CQUFtQixHQUNwQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRzFDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFDNUIsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBSSxDQUFDOzs7Ozs7OztJQU9wRCxnQkFBZ0IsQ0FBQyxVQUFpQixFQUFFLGVBQTBELEVBQUUsaUJBQStFLHNCQUFzQixDQUFDLEtBQUs7O1lBQ3JNLGtCQUFrQixHQUFVLEVBQUU7UUFFbEMsNEVBQTRFO1FBQzVFLDJJQUEySTtRQUMzSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDbEMsa0JBQWtCLEdBQUcsQ0FBQyxjQUFjLEtBQUssc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBRXpGLEtBQUssTUFBTSxNQUFNLElBQUksZUFBZSxFQUFFO2dCQUNwQyxJQUFJLGNBQWMsS0FBSyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUU7OzBCQUM3QyxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFD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QUFNLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7OzBCQUNoSCxNQUFNLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7OzBCQUNoSCxVQUFVLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQztvQkFDNUUsSUFBSSxVQUFVLEtBQUssbUJBQW1CLENBQUMsT0FBTyxFQUFFO3dCQUM5QyxPQUFPLFVBQVUsQ0FBQztxQkFDbkI7b0JBQ0QsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUVELE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQzs7O1lBbkhGLFVBQVU7Ozs7WUFiRixnQkFBZ0I7Ozs7Ozs7SUFlWCxzQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb2xsZWN0aW9uRmlsdGVyQnksXHJcbiAgQ29sbGVjdGlvblNvcnRCeSxcclxuICBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlLFxyXG4gIEZpbHRlck11bHRpcGxlUGFzc1R5cGVTdHJpbmcsXHJcbiAgRmllbGRUeXBlLFxyXG4gIE9wZXJhdG9yVHlwZSxcclxuICBTb3J0RGlyZWN0aW9uTnVtYmVyLFxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgc29ydEJ5RmllbGRUeXBlIH0gZnJvbSAnLi4vc29ydGVycy9zb3J0ZXJVdGlsaXRpZXMnO1xyXG5pbXBvcnQgeyB1bmlxdWVBcnJheSB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25TZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciAxIG9yIG1vcmUgaXRlbXMgZnJvbSBhIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBmaWx0ZXJCeU9wdGlvbnNcclxuICAgKi9cclxuICBmaWx0ZXJDb2xsZWN0aW9uKGNvbGxlY3Rpb246IGFueVtdLCBmaWx0ZXJCeU9wdGlvbnM6IENvbGxlY3Rpb25GaWx0ZXJCeSB8IENvbGxlY3Rpb25GaWx0ZXJCeVtdLCBmaWx0ZXJSZXN1bHRCeTogRmlsdGVyTXVsdGlwbGVQYXNzVHlwZSB8IEZpbHRlck11bHRpcGxlUGFzc1R5cGVTdHJpbmcgfCBudWxsID0gRmlsdGVyTXVsdGlwbGVQYXNzVHlwZS5jaGFpbik6IGFueVtdIHtcclxuICAgIGxldCBmaWx0ZXJlZENvbGxlY3Rpb246IGFueVtdID0gW107XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGFycmF5LCB3ZSB3aWxsIHVzZSB0aGUgbmV3IGZpbHRlcmVkIGNvbGxlY3Rpb24gYWZ0ZXIgZXZlcnkgcGFzc1xyXG4gICAgLy8gYmFzaWNhbGx5IGlmIGlucHV0IGNvbGxlY3Rpb24gaGFzIDEwIGl0ZW1zIG9uIDFzdCBwYXNzIGFuZCAxIGl0ZW0gaXMgZmlsdGVyZWQgb3V0LCB0aGVuIG9uIDJuZCBwYXNzIHRoZSBpbnB1dCBjb2xsZWN0aW9uIHdpbGwgYmUgOSBpdGVtc1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyQnlPcHRpb25zKSkge1xyXG4gICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSAoZmlsdGVyUmVzdWx0QnkgPT09IEZpbHRlck11bHRpcGxlUGFzc1R5cGUubWVyZ2UpID8gW10gOiBjb2xsZWN0aW9uO1xyXG5cclxuICAgICAgZm9yIChjb25zdCBmaWx0ZXIgb2YgZmlsdGVyQnlPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKGZpbHRlclJlc3VsdEJ5ID09PSBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlLm1lcmdlKSB7XHJcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZFBhc3MgPSB0aGlzLnNpbmdsZUZpbHRlckNvbGxlY3Rpb24oY29sbGVjdGlvbiwgZmlsdGVyKTtcclxuICAgICAgICAgIGZpbHRlcmVkQ29sbGVjdGlvbiA9IHVuaXF1ZUFycmF5KFsuLi5maWx0ZXJlZENvbGxlY3Rpb24sIC4uLmZpbHRlcmVkUGFzc10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSB0aGlzLnNpbmdsZUZpbHRlckNvbGxlY3Rpb24oZmlsdGVyZWRDb2xsZWN0aW9uLCBmaWx0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gdGhpcy5zaW5nbGVGaWx0ZXJDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIGZpbHRlckJ5T3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcmVkQ29sbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciBhbiBpdGVtIGZyb20gYSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gZmlsdGVyQnlcclxuICAgKi9cclxuICBzaW5nbGVGaWx0ZXJDb2xsZWN0aW9uKGNvbGxlY3Rpb246IGFueVtdLCBmaWx0ZXJCeTogQ29sbGVjdGlvbkZpbHRlckJ5KTogYW55W10ge1xyXG4gICAgbGV0IGZpbHRlcmVkQ29sbGVjdGlvbjogYW55W10gPSBbXTtcclxuXHJcbiAgICBpZiAoZmlsdGVyQnkpIHtcclxuICAgICAgY29uc3QgcHJvcGVydHkgPSBmaWx0ZXJCeS5wcm9wZXJ0eSB8fCAnJztcclxuICAgICAgY29uc3Qgb3BlcmF0b3IgPSBmaWx0ZXJCeS5vcGVyYXRvciB8fCBPcGVyYXRvclR5cGUuZXF1YWw7XHJcbiAgICAgIC8vIGp1c3QgY2hlY2sgZm9yIHVuZGVmaW5lZCBzaW5jZSB0aGUgZmlsdGVyIHZhbHVlIGNvdWxkIGJlIG51bGwsIDAsICcnLCBmYWxzZSBldGNcclxuICAgICAgY29uc3QgdmFsdWUgPSB0eXBlb2YgZmlsdGVyQnkudmFsdWUgPT09ICd1bmRlZmluZWQnID8gJycgOiBmaWx0ZXJCeS52YWx1ZTtcclxuXHJcbiAgICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcclxuICAgICAgICBjYXNlIE9wZXJhdG9yVHlwZS5lcXVhbDpcclxuICAgICAgICAgIGZpbHRlcmVkQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uZmlsdGVyKChpdGVtKSA9PiBpdGVtW3Byb3BlcnR5XSA9PT0gdmFsdWUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBPcGVyYXRvclR5cGUuY29udGFpbnM6XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbVtwcm9wZXJ0eV0udG9TdHJpbmcoKS5pbmRleE9mKHZhbHVlLnRvU3RyaW5nKCkpICE9PSAtMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIE9wZXJhdG9yVHlwZS5ub3RDb250YWluczpcclxuICAgICAgICAgIGZpbHRlcmVkQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uZmlsdGVyKChpdGVtKSA9PiBpdGVtW3Byb3BlcnR5XS50b1N0cmluZygpLmluZGV4T2YodmFsdWUudG9TdHJpbmcoKSkgPT09IC0xKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgT3BlcmF0b3JUeXBlLm5vdEVxdWFsOlxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbVtwcm9wZXJ0eV0gIT09IHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaWx0ZXJlZENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IDEgb3IgbW9yZSBpdGVtcyBpbiBhIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBzb3J0QnlPcHRpb25zXHJcbiAgICogQHBhcmFtIGVuYWJsZVRyYW5zbGF0ZUxhYmVsXHJcbiAgICovXHJcbiAgc29ydENvbGxlY3Rpb24oY29sbGVjdGlvbjogYW55W10sIHNvcnRCeU9wdGlvbnM6IENvbGxlY3Rpb25Tb3J0QnkgfCBDb2xsZWN0aW9uU29ydEJ5W10sIGVuYWJsZVRyYW5zbGF0ZUxhYmVsPzogYm9vbGVhbik6IGFueVtdIHtcclxuICAgIGxldCBzb3J0ZWRDb2xsZWN0aW9uOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIGlmIChzb3J0QnlPcHRpb25zKSB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNvcnRCeU9wdGlvbnMpKSB7XHJcbiAgICAgICAgLy8gbXVsdGktc29ydFxyXG4gICAgICAgIHNvcnRlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLnNvcnQoKGRhdGFSb3cxOiBhbnksIGRhdGFSb3cyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc29ydEJ5T3B0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgc29ydEJ5ID0gc29ydEJ5T3B0aW9uc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzb3J0QnkpIHtcclxuICAgICAgICAgICAgICBjb25zdCBzb3J0RGlyZWN0aW9uID0gc29ydEJ5LnNvcnREZXNjID8gU29ydERpcmVjdGlvbk51bWJlci5kZXNjIDogU29ydERpcmVjdGlvbk51bWJlci5hc2M7XHJcbiAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lID0gc29ydEJ5LnByb3BlcnR5IHx8ICcnO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IHNvcnRCeS5maWVsZFR5cGUgfHwgRmllbGRUeXBlLnN0cmluZztcclxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZTEgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93MVtwcm9wZXJ0eU5hbWVdIHx8ICcgJykgOiBkYXRhUm93MVtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlMiA9IChlbmFibGVUcmFuc2xhdGVMYWJlbCkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGRhdGFSb3cyW3Byb3BlcnR5TmFtZV0gfHwgJyAnKSA6IGRhdGFSb3cyW3Byb3BlcnR5TmFtZV07XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IHNvcnRSZXN1bHQgPSBzb3J0QnlGaWVsZFR5cGUodmFsdWUxLCB2YWx1ZTIsIGZpZWxkVHlwZSwgc29ydERpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgaWYgKHNvcnRSZXN1bHQgIT09IFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvcnRSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHNpbmdsZSBzb3J0XHJcbiAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lID0gc29ydEJ5T3B0aW9ucy5wcm9wZXJ0eSB8fCAnJztcclxuICAgICAgICBjb25zdCBzb3J0RGlyZWN0aW9uID0gc29ydEJ5T3B0aW9ucy5zb3J0RGVzYyA/IFNvcnREaXJlY3Rpb25OdW1iZXIuZGVzYyA6IFNvcnREaXJlY3Rpb25OdW1iZXIuYXNjO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IHNvcnRCeU9wdGlvbnMuZmllbGRUeXBlIHx8IEZpZWxkVHlwZS5zdHJpbmc7XHJcblxyXG4gICAgICAgIHNvcnRlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLnNvcnQoKGRhdGFSb3cxOiBhbnksIGRhdGFSb3cyOiBhbnkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHZhbHVlMSA9IChlbmFibGVUcmFuc2xhdGVMYWJlbCkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGRhdGFSb3cxW3Byb3BlcnR5TmFtZV0gfHwgJyAnKSA6IGRhdGFSb3cxW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZTIgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93Mltwcm9wZXJ0eU5hbWVdIHx8ICcgJykgOiBkYXRhUm93Mltwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgY29uc3Qgc29ydFJlc3VsdCA9IHNvcnRCeUZpZWxkVHlwZSh2YWx1ZTEsIHZhbHVlMiwgZmllbGRUeXBlLCBzb3J0RGlyZWN0aW9uKTtcclxuICAgICAgICAgIGlmIChzb3J0UmVzdWx0ICE9PSBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNvcnRSZXN1bHQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNvcnRlZENvbGxlY3Rpb247XHJcbiAgfVxyXG59XHJcbiJdfQ==