/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const stringSorter = (value1, value2, sortDirection) => {
    /** @type {?} */
    let position;
    if (value1 === null) {
        position = -1;
    }
    else if (value2 === null) {
        position = 1;
    }
    else if (value1 === value2) {
        position = 0;
    }
    else if (sortDirection) {
        position = value1 < value2 ? -1 : 1;
    }
    else if (!sortDirection) {
        position = value1 < value2 ? 1 : -1;
    }
    return sortDirection * position;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nU29ydGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL3N0cmluZ1NvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sT0FBTyxZQUFZLEdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFOztRQUNoRSxRQUFRO0lBQ1osSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1FBQ25CLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNmO1NBQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1FBQzFCLFFBQVEsR0FBRyxDQUFDLENBQUM7S0FDZDtTQUFNLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtRQUM1QixRQUFRLEdBQUcsQ0FBQyxDQUFDO0tBQ2Q7U0FBTSxJQUFJLGFBQWEsRUFBRTtRQUN4QixRQUFRLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyQztTQUFNLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDekIsUUFBUSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckM7SUFDRCxPQUFPLGFBQWEsR0FBRyxRQUFRLENBQUM7QUFDbEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvcnRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmV4cG9ydCBjb25zdCBzdHJpbmdTb3J0ZXI6IFNvcnRlciA9ICh2YWx1ZTEsIHZhbHVlMiwgc29ydERpcmVjdGlvbikgPT4ge1xyXG4gIGxldCBwb3NpdGlvbjtcclxuICBpZiAodmFsdWUxID09PSBudWxsKSB7XHJcbiAgICBwb3NpdGlvbiA9IC0xO1xyXG4gIH0gZWxzZSBpZiAodmFsdWUyID09PSBudWxsKSB7XHJcbiAgICBwb3NpdGlvbiA9IDE7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZTEgPT09IHZhbHVlMikge1xyXG4gICAgcG9zaXRpb24gPSAwO1xyXG4gIH0gZWxzZSBpZiAoc29ydERpcmVjdGlvbikge1xyXG4gICAgcG9zaXRpb24gPSB2YWx1ZTEgPCB2YWx1ZTIgPyAtMSA6IDE7XHJcbiAgfSBlbHNlIGlmICghc29ydERpcmVjdGlvbikge1xyXG4gICAgcG9zaXRpb24gPSB2YWx1ZTEgPCB2YWx1ZTIgPyAxIDogLTE7XHJcbiAgfVxyXG4gIHJldHVybiBzb3J0RGlyZWN0aW9uICogcG9zaXRpb247XHJcbn07XHJcbiJdfQ==