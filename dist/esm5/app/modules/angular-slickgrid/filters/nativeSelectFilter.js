/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType, } from './../models/index';
var NativeSelectFilter = /** @class */ (function () {
    function NativeSelectFilter(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
    }
    Object.defineProperty(NativeSelectFilter.prototype, "operator", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the Filter
     */
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    NativeSelectFilter.prototype.init = /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        if (typeof searchTerm === 'boolean' || typeof searchTerm === 'number') {
            searchTerm = "" + searchTerm;
        }
        // step 1, create HTML string template
        /** @type {?} */
        var filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change(function (e) {
            /** @type {?} */
            var value = e && e.target && e.target.value || '';
            if (_this._clearFilterTriggered) {
                _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered });
                _this._clearFilterTriggered = false; // reset flag for next use
                _this.$filterElm.removeClass('filled');
            }
            else {
                _this.$filterElm.addClass('filled');
                _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value] });
            }
        });
    };
    /**
     * Clear the filter values
     */
    /**
     * Clear the filter values
     * @return {?}
     */
    NativeSelectFilter.prototype.clear = /**
     * Clear the filter values
     * @return {?}
     */
    function () {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            this.$filterElm.val('');
            this.$filterElm.trigger('change');
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    NativeSelectFilter.prototype.destroy = /**
     * destroy the filter
     * @return {?}
     */
    function () {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
        }
    };
    /**
     * Set value(s) on the DOM element
     */
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    NativeSelectFilter.prototype.setValues = /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values) {
            this.$filterElm.val(values);
        }
    };
    //
    // private functions
    // ------------------
    //
    // private functions
    // ------------------
    /**
     * @private
     * @return {?}
     */
    NativeSelectFilter.prototype.buildTemplateHtmlString = 
    //
    // private functions
    // ------------------
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var optionCollection = this.columnDef.filter.collection || [];
        /** @type {?} */
        var labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        /** @type {?} */
        var valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        /** @type {?} */
        var options = '';
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every(function (x) { return typeof x === 'string'; })) {
            optionCollection.forEach(function (option) {
                options += "<option value=\"" + option + "\" label=\"" + option + "\">" + option + "</option>";
            });
        }
        else {
            optionCollection.forEach(function (option) {
                if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.select, collection: [ { value: '1', label: 'One' } ]')");
                }
                /** @type {?} */
                var labelKey = option.labelKey || option[labelName];
                /** @type {?} */
                var textLabel = ((option.labelKey || _this.columnDef.filter.enableTranslateLabel) && _this.translate && typeof _this.translate.instant === 'function') ? _this.translate.instant(labelKey || ' ') : labelKey;
                options += "<option value=\"" + option[valueName] + "\">" + textLabel + "</option>";
            });
        }
        return "<select class=\"form-control search-filter filter-" + fieldId + "\">" + options + "</select>";
    };
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    /**
     * From the html template string, create a DOM element
     * @private
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    NativeSelectFilter.prototype.createDomElement = /**
     * From the html template string, create a DOM element
     * @private
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    function (filterTemplate, searchTerm) {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        /** @type {?} */
        var $filterElm = $(filterTemplate);
        /** @type {?} */
        var searchTermInput = (/** @type {?} */ ((searchTerm || '')));
        $filterElm.val(searchTermInput);
        $filterElm.attr('id', "filter-" + fieldId);
        $filterElm.data('columnId', fieldId);
        // append the new DOM element to the header row
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    };
    return NativeSelectFilter;
}());
export { NativeSelectFilter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NativeSelectFilter.prototype._clearFilterTriggered;
    /** @type {?} */
    NativeSelectFilter.prototype.$filterElm;
    /** @type {?} */
    NativeSelectFilter.prototype.grid;
    /** @type {?} */
    NativeSelectFilter.prototype.searchTerms;
    /** @type {?} */
    NativeSelectFilter.prototype.columnDef;
    /** @type {?} */
    NativeSelectFilter.prototype.callback;
    /**
     * @type {?}
     * @private
     */
    NativeSelectFilter.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlU2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL25hdGl2ZVNlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUtMLFlBQVksR0FHYixNQUFNLG1CQUFtQixDQUFDO0FBSzNCO0lBUUUsNEJBQW9CLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBUHZDLDBCQUFxQixHQUFHLEtBQUssQ0FBQztJQU9ZLENBQUM7SUFFbkQsc0JBQUksd0NBQVE7Ozs7UUFBWjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDM0csQ0FBQzs7O09BQUE7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsaUNBQUk7Ozs7O0lBQUosVUFBSyxJQUFxQjtRQUExQixpQkErQkM7UUE5QkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQzs7O1lBR3RDLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO1FBQy9FLElBQUksT0FBTyxVQUFVLEtBQUssU0FBUyxJQUFJLE9BQU8sVUFB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QixrQ0FBVTs7SUFDVix5Q0FBMEI7O0lBQzFCLHVDQUFrQjs7SUFDbEIsc0NBQXlCOzs7OztJQUViLHVDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7XG4gIENvbHVtbixcbiAgRmlsdGVyLFxuICBGaWx0ZXJBcmd1bWVudHMsXG4gIEZpbHRlckNhbGxiYWNrLFxuICBPcGVyYXRvclR5cGUsXG4gIE9wZXJhdG9yU3RyaW5nLFxuICBTZWFyY2hUZXJtLFxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuZXhwb3J0IGNsYXNzIE5hdGl2ZVNlbGVjdEZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gICRmaWx0ZXJFbG06IGFueTtcbiAgZ3JpZDogYW55O1xuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xuICBjb2x1bW5EZWY6IENvbHVtbjtcbiAgY2FsbGJhY2s6IEZpbHRlckNhbGxiYWNrO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7fVxuXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yKSB8fCBPcGVyYXRvclR5cGUuZXF1YWw7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXG4gICAqL1xuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xuICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcbiAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjaztcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xuICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xuXG4gICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxuICAgIGxldCBzZWFyY2hUZXJtID0gKEFycmF5LmlzQXJyYXkodGhpcy5zZWFyY2hUZXJtcykgJiYgdGhpcy5zZWFyY2hUZXJtc1swXSkgfHwgJyc7XG4gICAgaWYgKHR5cGVvZiBzZWFyY2hUZXJtID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIHNlYXJjaFRlcm0gPT09ICdudW1iZXInKSB7XG4gICAgICBzZWFyY2hUZXJtID0gYCR7c2VhcmNoVGVybX1gO1xuICAgIH1cblxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIEhUTUwgc3RyaW5nIHRlbXBsYXRlXG4gICAgY29uc3QgZmlsdGVyVGVtcGxhdGUgPSB0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCk7XG5cbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcbiAgICB0aGlzLiRmaWx0ZXJFbG0gPSB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGUsIHNlYXJjaFRlcm0pO1xuXG4gICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGNoYW5nZSBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xuICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXG4gICAgdGhpcy4kZmlsdGVyRWxtLmNoYW5nZSgoZTogYW55KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgfHwgJyc7XG4gICAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCB9KTtcbiAgICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTsgLy8gcmVzZXQgZmxhZyBmb3IgbmV4dCB1c2VcbiAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IFt2YWx1ZV0gfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciB2YWx1ZXNcbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwoJycpO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLm9mZignY2hhbmdlJykucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcbiAgICovXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm0gfCBTZWFyY2hUZXJtW10pIHtcbiAgICBpZiAodmFsdWVzKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKHZhbHVlcyk7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcHJpdmF0ZSBidWlsZFRlbXBsYXRlSHRtbFN0cmluZygpIHtcbiAgICBpZiAoIXRoaXMuY29sdW1uRGVmIHx8ICF0aGlzLmNvbHVtbkRlZi5maWx0ZXIgfHwgIXRoaXMuY29sdW1uRGVmLmZpbHRlci5jb2xsZWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtBbmd1bGFyLVNsaWNrR3JpZF0gWW91IG5lZWQgdG8gcGFzcyBhIFwiY29sbGVjdGlvblwiIGZvciB0aGUgU2VsZWN0IEZpbHRlciB0byB3b3JrIGNvcnJlY3RseS4gQWxzbyBlYWNoIG9wdGlvbiBzaG91bGQgaW5jbHVkZSBhIHZhbHVlL2xhYmVsIHBhaXIgKG9yIHZhbHVlL2xhYmVsS2V5IHdoZW4gdXNpbmcgTG9jYWxlKS4gRm9yIGV4YW1wbGU6OiB7IGZpbHRlcjogbW9kZWw6IEZpbHRlcnMuc2VsZWN0LCBjb2xsZWN0aW9uOiBbeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6ICdUcnVlJyB9LCB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6ICdGYWxzZSd9XSB9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0IG9wdGlvbkNvbGxlY3Rpb24gPSB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY29sbGVjdGlvbiB8fCBbXTtcbiAgICBjb25zdCBsYWJlbE5hbWUgPSAodGhpcy5jb2x1bW5EZWYuZmlsdGVyLmN1c3RvbVN0cnVjdHVyZSkgPyB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY3VzdG9tU3RydWN0dXJlLmxhYmVsIDogJ2xhYmVsJztcbiAgICBjb25zdCB2YWx1ZU5hbWUgPSAodGhpcy5jb2x1bW5EZWYuZmlsdGVyLmN1c3RvbVN0cnVjdHVyZSkgPyB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY3VzdG9tU3RydWN0dXJlLnZhbHVlIDogJ3ZhbHVlJztcblxuICAgIGxldCBvcHRpb25zID0gJyc7XG5cbiAgICAvLyBjb2xsZWN0aW9uIGNvdWxkIGJlIGFuIEFycmF5IG9mIFN0cmluZ3MgT1IgT2JqZWN0c1xuICAgIGlmIChvcHRpb25Db2xsZWN0aW9uLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09ICdzdHJpbmcnKSkge1xuICAgICAgb3B0aW9uQ29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IHN0cmluZykgPT4ge1xuICAgICAgICBvcHRpb25zICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb259XCIgbGFiZWw9XCIke29wdGlvbn1cIj4ke29wdGlvbn08L29wdGlvbj5gO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbkNvbGxlY3Rpb24uZm9yRWFjaCgob3B0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFvcHRpb24gfHwgKG9wdGlvbltsYWJlbE5hbWVdID09PSB1bmRlZmluZWQgJiYgb3B0aW9uLmxhYmVsS2V5ID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBIGNvbGxlY3Rpb24gd2l0aCB2YWx1ZS9sYWJlbCAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpIGlzIHJlcXVpcmVkIHRvIHBvcHVsYXRlIHRoZSBTZWxlY3QgbGlzdCwgZm9yIGV4YW1wbGU6OiB7IGZpbHRlcjogbW9kZWw6IEZpbHRlcnMuc2VsZWN0LCBjb2xsZWN0aW9uOiBbIHsgdmFsdWU6ICcxJywgbGFiZWw6ICdPbmUnIH0gXScpYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGFiZWxLZXkgPSBvcHRpb24ubGFiZWxLZXkgfHwgb3B0aW9uW2xhYmVsTmFtZV07XG4gICAgICAgIGNvbnN0IHRleHRMYWJlbCA9ICgob3B0aW9uLmxhYmVsS2V5IHx8IHRoaXMuY29sdW1uRGVmLmZpbHRlci5lbmFibGVUcmFuc2xhdGVMYWJlbCkgJiYgdGhpcy50cmFuc2xhdGUgJiYgdHlwZW9mIHRoaXMudHJhbnNsYXRlLmluc3RhbnQgPT09ICdmdW5jdGlvbicpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChsYWJlbEtleSB8fCAnICcpIDogbGFiZWxLZXk7XG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvblt2YWx1ZU5hbWVdfVwiPiR7dGV4dExhYmVsfTwvb3B0aW9uPmA7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIj4ke29wdGlvbnN9PC9zZWxlY3Q+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIGZpbHRlclRlbXBsYXRlXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGU6IHN0cmluZywgc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4oZmllbGRJZCk7XG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXG4gICAgY29uc3QgJGZpbHRlckVsbSA9ICQoZmlsdGVyVGVtcGxhdGUpO1xuICAgIGNvbnN0IHNlYXJjaFRlcm1JbnB1dCA9IChzZWFyY2hUZXJtIHx8ICcnKSBhcyBzdHJpbmc7XG5cbiAgICAkZmlsdGVyRWxtLnZhbChzZWFyY2hUZXJtSW5wdXQpO1xuICAgICRmaWx0ZXJFbG0uYXR0cignaWQnLCBgZmlsdGVyLSR7ZmllbGRJZH1gKTtcbiAgICAkZmlsdGVyRWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XG5cbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xuICAgIGlmICgkZmlsdGVyRWxtICYmIHR5cGVvZiAkZmlsdGVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAkZmlsdGVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xuICAgIH1cblxuICAgIHJldHVybiAkZmlsdGVyRWxtO1xuICB9XG59XG4iXX0=