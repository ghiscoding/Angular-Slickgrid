/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var hyperlinkFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value && typeof value === 'string') {
        /** @type {?} */
        var matchUrl = value.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i);
        if (matchUrl && Array.isArray(matchUrl)) {
            return "<a href=\"" + matchUrl[0] + "\">' + value + '</a>";
        }
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwZXJsaW5rRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL2h5cGVybGlua0Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE1BQU0sS0FBTyxrQkFBa0IsR0FBYyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0I7SUFDdEgsSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFOztZQUNoQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxtR0FBbUcsQ0FBQztRQUNqSSxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sZUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDLHlCQUFxQixDQUFDO1NBQ3JEO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4gfSBmcm9tICcuLy4uL21vZGVscy9jb2x1bW4uaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvZm9ybWF0dGVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY29uc3QgaHlwZXJsaW5rRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcclxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgY29uc3QgbWF0Y2hVcmwgPSB2YWx1ZS5tYXRjaCgvXihodHRwfGZ0cHxodHRwcyk6XFwvXFwvW1xcd1xcLV9dKyhcXC5bXFx3XFwtX10rKSsoW1xcd1xcLVxcLixAP149JSZhbXA7OlxcL35cXCsjXSpbXFx3XFwtXFxAP149JSZhbXA7XFwvflxcKyNdKT8vaSk7XHJcbiAgICBpZiAobWF0Y2hVcmwgJiYgQXJyYXkuaXNBcnJheShtYXRjaFVybCkpIHtcclxuICAgICAgcmV0dXJuIGA8YSBocmVmPVwiJHttYXRjaFVybFswXX1cIj4nICsgdmFsdWUgKyAnPC9hPmA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAnJztcclxufTtcclxuIl19