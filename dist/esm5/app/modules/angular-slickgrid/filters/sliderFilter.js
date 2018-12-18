/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType, } from './../models/index';
/** @type {?} */
var DEFAULT_MIN_VALUE = 0;
/** @type {?} */
var DEFAULT_MAX_VALUE = 100;
/** @type {?} */
var DEFAULT_STEP = 1;
var SliderFilter = /** @class */ (function () {
    function SliderFilter() {
        this._clearFilterTriggered = false;
    }
    Object.defineProperty(SliderFilter.prototype, "filterParams", {
        /** Getter for the Filter Generic Params */
        get: /**
         * Getter for the Filter Generic Params
         * @private
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderFilter.prototype, "filterProperties", {
        /** Getter for the `filter` properties */
        get: /**
         * Getter for the `filter` properties
         * @private
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderFilter.prototype, "operator", {
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
    SliderFilter.prototype.init = /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        if (!args) {
            throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // define the input & slider number IDs
        this._elementRangeInputId = "rangeInput_" + this.columnDef.field;
        this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field;
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
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
        // if user chose to display the slider number on the right side, then update it every time it changes
        // we need to use both "input" and "change" event to be all cross-browser
        if (!this.filterParams.hideSliderNumber) {
            this.$filterElm.on('input change', function (e) {
                /** @type {?} */
                var value = e && e.target && e.target.value || '';
                if (value) {
                    document.getElementById(_this._elementRangeOutputId).innerHTML = value;
                }
            });
        }
    };
    /**
     * Clear the filter value
     */
    /**
     * Clear the filter value
     * @return {?}
     */
    SliderFilter.prototype.clear = /**
     * Clear the filter value
     * @return {?}
     */
    function () {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            /** @type {?} */
            var clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
            this.$filterElm.children('input').val(clearedValue);
            this.$filterElm.children('div.input-group-addon.input-group-append').children().html(clearedValue);
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
    SliderFilter.prototype.destroy = /**
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
    SliderFilter.prototype.setValues = /**
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
    /**
     * Create the HTML template as a string
     */
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    SliderFilter.prototype.buildTemplateHtmlString = 
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        var maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
        /** @type {?} */
        var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        /** @type {?} */
        var step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
        if (this.filterParams.hideSliderNumber) {
            return "\n      <div class=\"search-filter filter-" + fieldId + "\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-filter-input range\" />\n      </div>";
        }
        return "\n      <div class=\"input-group search-filter filter-" + fieldId + "\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-filter-input range\" />\n        <div class=\"input-group-addon input-group-append slider-value\">\n          <span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span>\n        </div>\n      </div>";
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
    SliderFilter.prototype.createDomElement = /**
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
        var searchTermInput = (/** @type {?} */ ((searchTerm || '0')));
        $filterElm.children('input').val(searchTermInput);
        $filterElm.children('div.input-group-addon.input-group-append').children().html(searchTermInput);
        $filterElm.attr('id', "filter-" + fieldId);
        $filterElm.data('columnId', fieldId);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
            $filterElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    };
    return SliderFilter;
}());
export { SliderFilter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SliderFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    SliderFilter.prototype._elementRangeInputId;
    /**
     * @type {?}
     * @private
     */
    SliderFilter.prototype._elementRangeOutputId;
    /**
     * @type {?}
     * @private
     */
    SliderFilter.prototype.$filterElm;
    /** @type {?} */
    SliderFilter.prototype.grid;
    /** @type {?} */
    SliderFilter.prototype.searchTerms;
    /** @type {?} */
    SliderFilter.prototype.columnDef;
    /** @type {?} */
    SliderFilter.prototype.callback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL3NsaWRlckZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQU1MLFlBQVksR0FHYixNQUFNLG1CQUFtQixDQUFDOztJQUtyQixpQkFBaUIsR0FBRyxDQUFDOztJQUNyQixpQkFBaUIsR0FBRyxHQUFHOztJQUN2QixZQUFZLEdBQUcsQ0FBQztBQUV0QjtJQUFBO1FBQ1UsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBNEt4QyxDQUFDO0lBbEtDLHNCQUFZLHNDQUFZO1FBRHhCLDJDQUEyQzs7Ozs7O1FBQzNDO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDdkYsQ0FBQzs7O09BQUE7SUFHRCxzQkFBWSwwQ0FBZ0I7UUFENUIseUNBQXlDOzs7Ozs7UUFDekM7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrQ0FBUTs7OztRQUFaO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztRQUMzRyxDQUFDOzs7T0FBQTtJQUVEOztPQUVHOzs7Ozs7SUFDSCwyQkFBSTs7Ozs7SUFBSixVQUFLLElBQXFCO1FBQTFCLGlCQThDQztRQTdDQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtB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QyxDQUFDLGNBQWMsQ0FBQzs7WUFDOUIsZUFBZSxHQUFHLG1CQUFBLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxFQUFVO1FBRXJELFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxRQUFRLENBQUMsMENBQTBDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDakcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBVSxPQUFTLENBQUMsQ0FBQztRQUMzQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVyQyxnRkFBZ0Y7UUFDaEYsSUFBSSxVQUFVLEVBQUU7WUFDZCxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsK0NBQStDO1FBQy9DLElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDM0QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUE3S0QsSUE2S0M7Ozs7Ozs7SUE1S0MsNkNBQXNDOzs7OztJQUN0Qyw0Q0FBcUM7Ozs7O0lBQ3JDLDZDQUFzQzs7Ozs7SUFDdEMsa0NBQXdCOztJQUN4Qiw0QkFBVTs7SUFDVixtQ0FBMEI7O0lBQzFCLGlDQUFrQjs7SUFDbEIsZ0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBDb2x1bW5GaWx0ZXIsXG4gIEZpbHRlcixcbiAgRmlsdGVyQXJndW1lbnRzLFxuICBGaWx0ZXJDYWxsYmFjayxcbiAgT3BlcmF0b3JUeXBlLFxuICBPcGVyYXRvclN0cmluZyxcbiAgU2VhcmNoVGVybSxcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbmNvbnN0IERFRkFVTFRfTUlOX1ZBTFVFID0gMDtcbmNvbnN0IERFRkFVTFRfTUFYX1ZBTFVFID0gMTAwO1xuY29uc3QgREVGQVVMVF9TVEVQID0gMTtcblxuZXhwb3J0IGNsYXNzIFNsaWRlckZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gIHByaXZhdGUgX2VsZW1lbnRSYW5nZUlucHV0SWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfZWxlbWVudFJhbmdlT3V0cHV0SWQ6IHN0cmluZztcbiAgcHJpdmF0ZSAkZmlsdGVyRWxtOiBhbnk7XG4gIGdyaWQ6IGFueTtcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcbiAgY29sdW1uRGVmOiBDb2x1bW47XG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcblxuICAvKiogR2V0dGVyIGZvciB0aGUgRmlsdGVyIEdlbmVyaWMgUGFyYW1zICovXG4gIHByaXZhdGUgZ2V0IGZpbHRlclBhcmFtcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLnBhcmFtcyB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBgZmlsdGVyYCBwcm9wZXJ0aWVzICovXG4gIHByaXZhdGUgZ2V0IGZpbHRlclByb3BlcnRpZXMoKTogQ29sdW1uRmlsdGVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyO1xuICB9XG5cbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IpIHx8IE9wZXJhdG9yVHlwZS5lcXVhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcbiAgICovXG4gIGluaXQoYXJnczogRmlsdGVyQXJndW1lbnRzKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tBbmd1bGFyLVNsaWNrR3JpZF0gQSBmaWx0ZXIgbXVzdCBhbHdheXMgaGF2ZSBhbiBcImluaXQoKVwiIHdpdGggdmFsaWQgYXJndW1lbnRzLicpO1xuICAgIH1cbiAgICB0aGlzLmdyaWQgPSBhcmdzLmdyaWQ7XG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XG4gICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcbiAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcblxuICAgIC8vIGRlZmluZSB0aGUgaW5wdXQgJiBzbGlkZXIgbnVtYmVyIElEc1xuICAgIHRoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWQgPSBgcmFuZ2VJbnB1dF8ke3RoaXMuY29sdW1uRGVmLmZpZWxkfWA7XG4gICAgdGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQgPSBgcmFuZ2VPdXRwdXRfJHt0aGlzLmNvbHVtbkRlZi5maWVsZH1gO1xuXG4gICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxuICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcblxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIEhUTUwgc3RyaW5nIHRlbXBsYXRlXG4gICAgY29uc3QgZmlsdGVyVGVtcGxhdGUgPSB0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCk7XG5cbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcbiAgICB0aGlzLiRmaWx0ZXJFbG0gPSB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGUsIHNlYXJjaFRlcm0pO1xuXG4gICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGNoYW5nZSBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xuICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXG4gICAgdGhpcy4kZmlsdGVyRWxtLmNoYW5nZSgoZTogYW55KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgfHwgJyc7XG4gICAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCB9KTtcbiAgICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTsgLy8gcmVzZXQgZmxhZyBmb3IgbmV4dCB1c2VcbiAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IFt2YWx1ZV0gfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpZiB1c2VyIGNob3NlIHRvIGRpc3BsYXkgdGhlIHNsaWRlciBudW1iZXIgb24gdGhlIHJpZ2h0IHNpZGUsIHRoZW4gdXBkYXRlIGl0IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlc1xuICAgIC8vIHdlIG5lZWQgdG8gdXNlIGJvdGggXCJpbnB1dFwiIGFuZCBcImNoYW5nZVwiIGV2ZW50IHRvIGJlIGFsbCBjcm9zcy1icm93c2VyXG4gICAgaWYgKCF0aGlzLmZpbHRlclBhcmFtcy5oaWRlU2xpZGVyTnVtYmVyKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub24oJ2lucHV0IGNoYW5nZScsIChlOiB7IHRhcmdldDogSFRNTElucHV0RWxlbWVudCB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSB8fCAnJztcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQpLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciB2YWx1ZVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xuICAgICAgY29uc3QgY2xlYXJlZFZhbHVlID0gdGhpcy5maWx0ZXJQYXJhbXMuaGFzT3duUHJvcGVydHkoJ3NsaWRlclN0YXJ0VmFsdWUnKSA/IHRoaXMuZmlsdGVyUGFyYW1zLnNsaWRlclN0YXJ0VmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5jaGlsZHJlbignaW5wdXQnKS52YWwoY2xlYXJlZFZhbHVlKTtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5jaGlsZHJlbignZGl2LmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LWdyb3VwLWFwcGVuZCcpLmNoaWxkcmVuKCkuaHRtbChjbGVhcmVkVmFsdWUpO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLm9mZignY2hhbmdlJykucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcbiAgICovXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm0pIHtcbiAgICBpZiAodmFsdWVzKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKHZhbHVlcyk7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgSFRNTCB0ZW1wbGF0ZSBhcyBhIHN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBidWlsZFRlbXBsYXRlSHRtbFN0cmluZygpIHtcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgY29uc3QgbWluVmFsdWUgPSB0aGlzLmZpbHRlclByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ21pblZhbHVlJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMubWluVmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgnbWF4VmFsdWUnKSA/IHRoaXMuZmlsdGVyUHJvcGVydGllcy5tYXhWYWx1ZSA6IERFRkFVTFRfTUFYX1ZBTFVFO1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuZmlsdGVyUGFyYW1zLmhhc093blByb3BlcnR5KCdzbGlkZXJTdGFydFZhbHVlJykgPyB0aGlzLmZpbHRlclBhcmFtcy5zbGlkZXJTdGFydFZhbHVlIDogbWluVmFsdWU7XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndmFsdWVTdGVwJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMudmFsdWVTdGVwIDogREVGQVVMVF9TVEVQO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyUGFyYW1zLmhpZGVTbGlkZXJOdW1iZXIpIHtcbiAgICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcbiAgICAgICAgICBuYW1lPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkfVwiXG4gICAgICAgICAgZGVmYXVsdFZhbHVlPVwiJHtkZWZhdWx0VmFsdWV9XCIgbWluPVwiJHttaW5WYWx1ZX1cIiBtYXg9XCIke21heFZhbHVlfVwiIHN0ZXA9XCIke3N0ZXB9XCJcbiAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBzbGlkZXItZmlsdGVyLWlucHV0IHJhbmdlXCIgLz5cbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxuICAgICAgICAgIG5hbWU9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU9XCIke2RlZmF1bHRWYWx1ZX1cIiBtaW49XCIke21pblZhbHVlfVwiIG1heD1cIiR7bWF4VmFsdWV9XCIgc3RlcD1cIiR7c3RlcH1cIlxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHNsaWRlci1maWx0ZXItaW5wdXQgcmFuZ2VcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtYXBwZW5kIHNsaWRlci12YWx1ZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZH1cIj4ke2RlZmF1bHRWYWx1ZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIGZpbHRlclRlbXBsYXRlXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGU6IHN0cmluZywgc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4oZmllbGRJZCk7XG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXG4gICAgY29uc3QgJGZpbHRlckVsbSA9ICQoZmlsdGVyVGVtcGxhdGUpO1xuICAgIGNvbnN0IHNlYXJjaFRlcm1JbnB1dCA9IChzZWFyY2hUZXJtIHx8ICcwJykgYXMgc3RyaW5nO1xuXG4gICAgJGZpbHRlckVsbS5jaGlsZHJlbignaW5wdXQnKS52YWwoc2VhcmNoVGVybUlucHV0KTtcbiAgICAkZmlsdGVyRWxtLmNoaWxkcmVuKCdkaXYuaW5wdXQtZ3JvdXAtYWRkb24uaW5wdXQtZ3JvdXAtYXBwZW5kJykuY2hpbGRyZW4oKS5odG1sKHNlYXJjaFRlcm1JbnB1dCk7XG4gICAgJGZpbHRlckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xuICAgICRmaWx0ZXJFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcblxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICBpZiAoc2VhcmNoVGVybSkge1xuICAgICAgJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcbiAgICBpZiAoJGZpbHRlckVsbSAmJiB0eXBlb2YgJGZpbHRlckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgJGZpbHRlckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJGZpbHRlckVsbTtcbiAgfVxufVxuIl19