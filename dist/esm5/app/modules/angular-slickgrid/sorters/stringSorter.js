/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var stringSorter = function (value1, value2, sortDirection) {
    /** @type {?} */
    var position;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nU29ydGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zb3J0ZXJzL3N0cmluZ1NvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sS0FBTyxZQUFZLEdBQVcsVUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWE7O1FBQzVELFFBQVE7SUFDWixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDbkIsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2Y7U0FBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDMUIsUUFBUSxHQUFHLENBQUMsQ0FBQztLQUNkO1NBQU0sSUFBSSxNQUFNLEtBQUssTUFBTSxFQUFFO1FBQzVCLFFBQVEsR0FBRyxDQUFDLENBQUM7S0FDZDtTQUFNLElBQUksYUFBYSxFQUFFO1FBQ3hCLFFBQVEsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO1NBQU0sSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUN6QixRQUFRLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyQztJQUNELE9BQU8sYUFBYSxHQUFHLFFBQVEsQ0FBQztBQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29ydGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHN0cmluZ1NvcnRlcjogU29ydGVyID0gKHZhbHVlMSwgdmFsdWUyLCBzb3J0RGlyZWN0aW9uKSA9PiB7XHJcbiAgbGV0IHBvc2l0aW9uO1xyXG4gIGlmICh2YWx1ZTEgPT09IG51bGwpIHtcclxuICAgIHBvc2l0aW9uID0gLTE7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZTIgPT09IG51bGwpIHtcclxuICAgIHBvc2l0aW9uID0gMTtcclxuICB9IGVsc2UgaWYgKHZhbHVlMSA9PT0gdmFsdWUyKSB7XHJcbiAgICBwb3NpdGlvbiA9IDA7XHJcbiAgfSBlbHNlIGlmIChzb3J0RGlyZWN0aW9uKSB7XHJcbiAgICBwb3NpdGlvbiA9IHZhbHVlMSA8IHZhbHVlMiA/IC0xIDogMTtcclxuICB9IGVsc2UgaWYgKCFzb3J0RGlyZWN0aW9uKSB7XHJcbiAgICBwb3NpdGlvbiA9IHZhbHVlMSA8IHZhbHVlMiA/IDEgOiAtMTtcclxuICB9XHJcbiAgcmV0dXJuIHNvcnREaXJlY3Rpb24gKiBwb3NpdGlvbjtcclxufTtcclxuIl19