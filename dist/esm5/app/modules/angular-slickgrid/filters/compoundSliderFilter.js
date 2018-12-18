/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType } from './../models/index';
/** @type {?} */
var DEFAULT_MIN_VALUE = 0;
/** @type {?} */
var DEFAULT_MAX_VALUE = 100;
/** @type {?} */
var DEFAULT_STEP = 1;
var CompoundSliderFilter = /** @class */ (function () {
    function CompoundSliderFilter() {
        this._clearFilterTriggered = false;
    }
    Object.defineProperty(CompoundSliderFilter.prototype, "gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @private
         * @return {?}
         */
        function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundSliderFilter.prototype, "filterParams", {
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
    Object.defineProperty(CompoundSliderFilter.prototype, "filterProperties", {
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
    Object.defineProperty(CompoundSliderFilter.prototype, "operator", {
        get: /**
         * @return {?}
         */
        function () {
            return this._operator || OperatorType.empty;
        },
        set: /**
         * @param {?} op
         * @return {?}
         */
        function (op) {
            this._operator = op;
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
    CompoundSliderFilter.prototype.init = /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        if (args) {
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.operator = args.operator || '';
            this.searchTerms = args.searchTerms || [];
            // define the input & slider number IDs
            this._elementRangeInputId = "rangeInput_" + this.columnDef.field;
            this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field;
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            /** @type {?} */
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.change(function (e) {
                _this.onTriggerEvent(e);
            });
            this.$selectOperatorElm.change(function (e) {
                _this.onTriggerEvent(e);
            });
            // if user chose to display the slider number on the right side, then update it every time it changes
            // we need to use both "input" and "change" event to be all cross-browser
            if (!this.filterParams.hideSliderNumber) {
                this.$filterInputElm.on('input change', function (e) {
                    /** @type {?} */
                    var value = e && e.target && e.target.value || '';
                    if (value) {
                        document.getElementById(_this._elementRangeOutputId).innerHTML = value;
                    }
                });
            }
        }
    };
    /**
     * Clear the filter value
     */
    /**
     * Clear the filter value
     * @return {?}
     */
    CompoundSliderFilter.prototype.clear = /**
     * Clear the filter value
     * @return {?}
     */
    function () {
        if (this.$filterElm && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            /** @type {?} */
            var clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val(clearedValue);
            if (!this.filterParams.hideSliderNumber) {
                this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(clearedValue);
            }
            this.onTriggerEvent(undefined);
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    CompoundSliderFilter.prototype.destroy = /**
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
    CompoundSliderFilter.prototype.setValues = /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values && Array.isArray(values)) {
            this.$filterInputElm.val(values[0]);
            this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(values[0]);
        }
    };
    //
    // private functions
    // ------------------
    /** Build HTML Template for the input range (slider) */
    //
    // private functions
    // ------------------
    /**
     * Build HTML Template for the input range (slider)
     * @private
     * @return {?}
     */
    CompoundSliderFilter.prototype.buildTemplateHtmlString = 
    //
    // private functions
    // ------------------
    /**
     * Build HTML Template for the input range (slider)
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        var maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
        /** @type {?} */
        var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        /** @type {?} */
        var step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
        return "<input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n              name=\"" + this._elementRangeInputId + "\"\n              defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n              class=\"form-control slider-filter-input range compound-slider\" />";
    };
    /** Build HTML Template for the text (number) that is shown appended to the slider */
    /**
     * Build HTML Template for the text (number) that is shown appended to the slider
     * @private
     * @return {?}
     */
    CompoundSliderFilter.prototype.buildTemplateSliderTextHtmlString = /**
     * Build HTML Template for the text (number) that is shown appended to the slider
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        return "<div class=\"input-group-addon input-group-append slider-value\"><span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span></div>";
    };
    /** Build HTML Template select dropdown (operator) */
    /**
     * Build HTML Template select dropdown (operator)
     * @private
     * @return {?}
     */
    CompoundSliderFilter.prototype.buildSelectOperatorHtmlString = /**
     * Build HTML Template select dropdown (operator)
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var optionValues = this.getOptionValues();
        /** @type {?} */
        var optionValueString = '';
        optionValues.forEach(function (option) {
            optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
        });
        return "<select class=\"form-control\">" + optionValueString + "</select>";
    };
    /** Get the available operator option values */
    /**
     * Get the available operator option values
     * @private
     * @return {?}
     */
    CompoundSliderFilter.prototype.getOptionValues = /**
     * Get the available operator option values
     * @private
     * @return {?}
     */
    function () {
        return [
            { operator: (/** @type {?} */ ('')), description: '' },
            { operator: (/** @type {?} */ ('=')), description: '' },
            { operator: (/** @type {?} */ ('<')), description: '' },
            { operator: (/** @type {?} */ ('<=')), description: '' },
            { operator: (/** @type {?} */ ('>')), description: '' },
            { operator: (/** @type {?} */ ('>=')), description: '' },
            { operator: (/** @type {?} */ ('<>')), description: '' }
        ];
    };
    /**
     * Create the DOM element
     */
    /**
     * Create the DOM element
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    CompoundSliderFilter.prototype.createDomElement = /**
     * Create the DOM element
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    function (searchTerm) {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var searchTermInput = (/** @type {?} */ ((searchTerm || '0')));
        /** @type {?} */
        var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildTemplateHtmlString());
        /** @type {?} */
        var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
        this.$containerInputGroupElm = $("<div class=\"input-group search-filter filter-" + fieldId + "\"></div>");
        /** @type {?} */
        var $operatorInputGroupAddon = $("<span class=\"input-group-addon input-group-prepend operator\"></span>");
        /* the DOM element final structure will be
          <div class="input-group">
            <div class="input-group-addon input-group-prepend operator">
              <select class="form-control"></select>
            </div>
            <input class="form-control" type="text" />
            <div class="input-group-addon input-group-prepend" id="rangeOuput_percentComplete"><span class="input-group-text">0</span></div>
          </div>
        */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        this.$containerInputGroupElm.append($operatorInputGroupAddon);
        this.$containerInputGroupElm.append(this.$filterInputElm);
        if (!this.filterParams.hideSliderNumber) {
            /** @type {?} */
            var $sliderTextInputAppendAddon = $(this.buildTemplateSliderTextHtmlString());
            $sliderTextInputAppendAddon.children().html(searchTermInput);
            this.$containerInputGroupElm.append($sliderTextInputAppendAddon);
        }
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append(this.$containerInputGroupElm);
        $filterContainerElm.attr('id', "filter-" + fieldId);
        this.$filterInputElm.val(searchTermInput);
        this.$filterInputElm.data('columnId', fieldId);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
            $filterContainerElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    CompoundSliderFilter.prototype.onTriggerEvent = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this._clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
            this._clearFilterTriggered = false; // reset flag for next use
        }
        else {
            /** @type {?} */
            var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            /** @type {?} */
            var value = this.$filterInputElm.val();
            (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
        }
    };
    return CompoundSliderFilter;
}());
export { CompoundSliderFilter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype._elementRangeInputId;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype._elementRangeOutputId;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype._operator;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype.$containerInputGroupElm;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype.$filterElm;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype.$filterInputElm;
    /**
     * @type {?}
     * @private
     */
    CompoundSliderFilter.prototype.$selectOperatorElm;
    /** @type {?} */
    CompoundSliderFilter.prototype.grid;
    /** @type {?} */
    CompoundSliderFilter.prototype.searchTerms;
    /** @type {?} */
    CompoundSliderFilter.prototype.columnDef;
    /** @type {?} */
    CompoundSliderFilter.prototype.callback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmRTbGlkZXJGaWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlcnMvY29tcG91bmRTbGlkZXJGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFRTCxZQUFZLEVBRWIsTUFBTSxtQkFBbUIsQ0FBQzs7SUFLckIsaUJBQWlCLEdBQUcsQ0FBQzs7SUFDckIsaUJBQWlCLEdBQUcsR0FBRzs7SUFDdkIsWUFBWSxHQUFHLENBQUM7QUFFdEI7SUFjRTtRQWJRLDBCQUFxQixHQUFHLEtBQUssQ0FBQztJQWF0QixDQUFDO0lBR2pCLHNCQUFZLDZDQUFXO1FBRHZCLGlFQUFpRTs7Ozs7O1FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNFLENBQUM7OztPQUFBO0lBR0Qsc0JBQVksOENBQVk7UUFEeEIsMkNBQTJDOzs7Ozs7UUFDM0M7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN2RixDQUFDOzs7T0FBQTtJQUdELHNCQUFZLGtEQUFnQjtRQUQ1Qix5Q0FBeUM7Ozs7OztRQUN6QztZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBDQUFROzs7O1FBSVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLEtB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QVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzFIO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQTdPRCxJQTZPQzs7Ozs7OztJQTVPQyxxREFBc0M7Ozs7O0lBQ3RDLG9EQUFxQzs7Ozs7SUFDckMscURBQXNDOzs7OztJQUN0Qyx5Q0FBaUQ7Ozs7O0lBQ2pELHVEQUFxQzs7Ozs7SUFDckMsMENBQXdCOzs7OztJQUN4QiwrQ0FBNkI7Ozs7O0lBQzdCLGtEQUFnQzs7SUFDaEMsb0NBQVU7O0lBQ1YsMkNBQTBCOztJQUMxQix5Q0FBa0I7O0lBQ2xCLHdDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbHVtbixcbiAgQ29sdW1uRmlsdGVyLFxuICBGaWx0ZXIsXG4gIEZpbHRlckFyZ3VtZW50cyxcbiAgRmlsdGVyQ2FsbGJhY2ssXG4gIEdyaWRPcHRpb24sXG4gIE9wZXJhdG9yU3RyaW5nLFxuICBPcGVyYXRvclR5cGUsXG4gIFNlYXJjaFRlcm1cbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbmNvbnN0IERFRkFVTFRfTUlOX1ZBTFVFID0gMDtcbmNvbnN0IERFRkFVTFRfTUFYX1ZBTFVFID0gMTAwO1xuY29uc3QgREVGQVVMVF9TVEVQID0gMTtcblxuZXhwb3J0IGNsYXNzIENvbXBvdW5kU2xpZGVyRmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcbiAgcHJpdmF0ZSBfY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZWxlbWVudFJhbmdlSW5wdXRJZDogc3RyaW5nO1xuICBwcml2YXRlIF9lbGVtZW50UmFuZ2VPdXRwdXRJZDogc3RyaW5nO1xuICBwcml2YXRlIF9vcGVyYXRvcjogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmc7XG4gIHByaXZhdGUgJGNvbnRhaW5lcklucHV0R3JvdXBFbG06IGFueTtcbiAgcHJpdmF0ZSAkZmlsdGVyRWxtOiBhbnk7XG4gIHByaXZhdGUgJGZpbHRlcklucHV0RWxtOiBhbnk7XG4gIHByaXZhdGUgJHNlbGVjdE9wZXJhdG9yRWxtOiBhbnk7XG4gIGdyaWQ6IGFueTtcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcbiAgY29sdW1uRGVmOiBDb2x1bW47XG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IGdyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBGaWx0ZXIgR2VuZXJpYyBQYXJhbXMgKi9cbiAgcHJpdmF0ZSBnZXQgZmlsdGVyUGFyYW1zKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIucGFyYW1zIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIGBmaWx0ZXJgIHByb3BlcnRpZXMgKi9cbiAgcHJpdmF0ZSBnZXQgZmlsdGVyUHJvcGVydGllcygpOiBDb2x1bW5GaWx0ZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXI7XG4gIH1cblxuICBzZXQgb3BlcmF0b3Iob3A6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nKSB7XG4gICAgdGhpcy5fb3BlcmF0b3IgPSBvcDtcbiAgfVxuXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX29wZXJhdG9yIHx8IE9wZXJhdG9yVHlwZS5lbXB0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcbiAgICovXG4gIGluaXQoYXJnczogRmlsdGVyQXJndW1lbnRzKSB7XG4gICAgaWYgKGFyZ3MpIHtcbiAgICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcbiAgICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xuICAgICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcbiAgICAgIHRoaXMub3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yIHx8ICcnO1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XG5cbiAgICAgIC8vIGRlZmluZSB0aGUgaW5wdXQgJiBzbGlkZXIgbnVtYmVyIElEc1xuICAgICAgdGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZCA9IGByYW5nZUlucHV0XyR7dGhpcy5jb2x1bW5EZWYuZmllbGR9YDtcbiAgICAgIHRoaXMuX2VsZW1lbnRSYW5nZU91dHB1dElkID0gYHJhbmdlT3V0cHV0XyR7dGhpcy5jb2x1bW5EZWYuZmllbGR9YDtcblxuICAgICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxuICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xuXG4gICAgICAvLyBzdGVwIDEsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciB3aGljaCBjb250YWluIHRoZSBjb21wb3VuZCBPcGVyYXRvcitJbnB1dFxuICAgICAgLy8gYW5kIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcbiAgICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtKTtcblxuICAgICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXG4gICAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgICAgdGhpcy4kZmlsdGVySW5wdXRFbG0uY2hhbmdlKChlOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uY2hhbmdlKChlOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBpZiB1c2VyIGNob3NlIHRvIGRpc3BsYXkgdGhlIHNsaWRlciBudW1iZXIgb24gdGhlIHJpZ2h0IHNpZGUsIHRoZW4gdXBkYXRlIGl0IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlc1xuICAgICAgLy8gd2UgbmVlZCB0byB1c2UgYm90aCBcImlucHV0XCIgYW5kIFwiY2hhbmdlXCIgZXZlbnQgdG8gYmUgYWxsIGNyb3NzLWJyb3dzZXJcbiAgICAgIGlmICghdGhpcy5maWx0ZXJQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xuICAgICAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5vbignaW5wdXQgY2hhbmdlJywgKGU6IHsgdGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50IH0pID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgfHwgJyc7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZCkuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciB2YWx1ZVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSkge1xuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xuICAgICAgY29uc3QgY2xlYXJlZFZhbHVlID0gdGhpcy5maWx0ZXJQYXJhbXMuaGFzT3duUHJvcGVydHkoJ3NsaWRlclN0YXJ0VmFsdWUnKSA/IHRoaXMuZmlsdGVyUGFyYW1zLnNsaWRlclN0YXJ0VmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCgwKTtcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbChjbGVhcmVkVmFsdWUpO1xuICAgICAgaWYgKCF0aGlzLmZpbHRlclBhcmFtcy5oaWRlU2xpZGVyTnVtYmVyKSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uY2hpbGRyZW4oJ2Rpdi5pbnB1dC1ncm91cC1hZGRvbi5pbnB1dC1ncm91cC1hcHBlbmQnKS5jaGlsZHJlbigpLmxhc3QoKS5odG1sKGNsZWFyZWRWYWx1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCdjaGFuZ2UnKS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbHVlKHMpIG9uIHRoZSBET00gZWxlbWVudFxuICAgKi9cbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybVtdKSB7XG4gICAgaWYgKHZhbHVlcyAmJiBBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbCh2YWx1ZXNbMF0pO1xuICAgICAgdGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbS5jaGlsZHJlbignZGl2LmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LWdyb3VwLWFwcGVuZCcpLmNoaWxkcmVuKCkubGFzdCgpLmh0bWwodmFsdWVzWzBdKTtcbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKiogQnVpbGQgSFRNTCBUZW1wbGF0ZSBmb3IgdGhlIGlucHV0IHJhbmdlIChzbGlkZXIpICovXG4gIHByaXZhdGUgYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKSB7XG4gICAgY29uc3QgbWluVmFsdWUgPSB0aGlzLmZpbHRlclByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ21pblZhbHVlJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMubWluVmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgnbWF4VmFsdWUnKSA/IHRoaXMuZmlsdGVyUHJvcGVydGllcy5tYXhWYWx1ZSA6IERFRkFVTFRfTUFYX1ZBTFVFO1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuZmlsdGVyUGFyYW1zLmhhc093blByb3BlcnR5KCdzbGlkZXJTdGFydFZhbHVlJykgPyB0aGlzLmZpbHRlclBhcmFtcy5zbGlkZXJTdGFydFZhbHVlIDogbWluVmFsdWU7XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndmFsdWVTdGVwJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMudmFsdWVTdGVwIDogREVGQVVMVF9TVEVQO1xuXG4gICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcbiAgICAgICAgICAgICAgbmFtZT1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9XCIke2RlZmF1bHRWYWx1ZX1cIiBtaW49XCIke21pblZhbHVlfVwiIG1heD1cIiR7bWF4VmFsdWV9XCIgc3RlcD1cIiR7c3RlcH1cIlxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBzbGlkZXItZmlsdGVyLWlucHV0IHJhbmdlIGNvbXBvdW5kLXNsaWRlclwiIC8+YDtcbiAgfVxuXG4gIC8qKiBCdWlsZCBIVE1MIFRlbXBsYXRlIGZvciB0aGUgdGV4dCAobnVtYmVyKSB0aGF0IGlzIHNob3duIGFwcGVuZGVkIHRvIHRoZSBzbGlkZXIgKi9cbiAgcHJpdmF0ZSBidWlsZFRlbXBsYXRlU2xpZGVyVGV4dEh0bWxTdHJpbmcoKSB7XG4gICAgY29uc3QgbWluVmFsdWUgPSB0aGlzLmZpbHRlclByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ21pblZhbHVlJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMubWluVmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmZpbHRlclBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnc2xpZGVyU3RhcnRWYWx1ZScpID8gdGhpcy5maWx0ZXJQYXJhbXMuc2xpZGVyU3RhcnRWYWx1ZSA6IG1pblZhbHVlO1xuXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtYXBwZW5kIHNsaWRlci12YWx1ZVwiPjxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZH1cIj4ke2RlZmF1bHRWYWx1ZX08L3NwYW4+PC9kaXY+YDtcbiAgfVxuXG4gIC8qKiBCdWlsZCBIVE1MIFRlbXBsYXRlIHNlbGVjdCBkcm9wZG93biAob3BlcmF0b3IpICovXG4gIHByaXZhdGUgYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSB7XG4gICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gdGhpcy5nZXRPcHRpb25WYWx1ZXMoKTtcbiAgICBsZXQgb3B0aW9uVmFsdWVTdHJpbmcgPSAnJztcbiAgICBvcHRpb25WYWx1ZXMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBvcHRpb25WYWx1ZVN0cmluZyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLm9wZXJhdG9yfVwiIHRpdGxlPVwiJHtvcHRpb24uZGVzY3JpcHRpb259XCI+JHtvcHRpb24ub3BlcmF0b3J9PC9vcHRpb24+YDtcbiAgICB9KTtcblxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPiR7b3B0aW9uVmFsdWVTdHJpbmd9PC9zZWxlY3Q+YDtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIGF2YWlsYWJsZSBvcGVyYXRvciBvcHRpb24gdmFsdWVzICovXG4gIHByaXZhdGUgZ2V0T3B0aW9uVmFsdWVzKCk6IHsgb3BlcmF0b3I6IE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nIH1bXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHsgb3BlcmF0b3I6ICcnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcbiAgICAgIHsgb3BlcmF0b3I6ICc9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICB7IG9wZXJhdG9yOiAnPCcgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgeyBvcGVyYXRvcjogJzw9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICB7IG9wZXJhdG9yOiAnPicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgeyBvcGVyYXRvcjogJz49JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICB7IG9wZXJhdG9yOiAnPD4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfVxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBET00gZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0IHNlYXJjaFRlcm1JbnB1dCA9IChzZWFyY2hUZXJtIHx8ICcwJykgYXMgc3RyaW5nO1xuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKHRoaXMuY29sdW1uRGVmLmlkKTtcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XG5cbiAgICAvLyBjcmVhdGUgdGhlIERPTSBTZWxlY3QgZHJvcGRvd24gZm9yIHRoZSBPcGVyYXRvclxuICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtID0gJCh0aGlzLmJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkpO1xuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtID0gJCh0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCkpO1xuICAgIGNvbnN0ICRmaWx0ZXJDb250YWluZXJFbG0gPSAkKGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+PC9kaXY+YCk7XG4gICAgdGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbSA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+PC9kaXY+YCk7XG4gICAgY29uc3QgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uID0gJChgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+PC9zcGFuPmApO1xuXG4gICAgLyogdGhlIERPTSBlbGVtZW50IGZpbmFsIHN0cnVjdHVyZSB3aWxsIGJlXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLXByZXBlbmQgb3BlcmF0b3JcIj5cbiAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kXCIgaWQ9XCJyYW5nZU91cHV0X3BlcmNlbnRDb21wbGV0ZVwiPjxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPjA8L3NwYW4+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAqL1xuICAgICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbi5hcHBlbmQodGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pO1xuICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uYXBwZW5kKCRvcGVyYXRvcklucHV0R3JvdXBBZGRvbik7XG4gICAgdGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbS5hcHBlbmQodGhpcy4kZmlsdGVySW5wdXRFbG0pO1xuICAgIGlmICghdGhpcy5maWx0ZXJQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xuICAgICAgY29uc3QgJHNsaWRlclRleHRJbnB1dEFwcGVuZEFkZG9uID0gJCh0aGlzLmJ1aWxkVGVtcGxhdGVTbGlkZXJUZXh0SHRtbFN0cmluZygpKTtcbiAgICAgICRzbGlkZXJUZXh0SW5wdXRBcHBlbmRBZGRvbi5jaGlsZHJlbigpLmh0bWwoc2VhcmNoVGVybUlucHV0KTtcbiAgICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uYXBwZW5kKCRzbGlkZXJUZXh0SW5wdXRBcHBlbmRBZGRvbik7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmQodGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbSk7XG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xuXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKHNlYXJjaFRlcm1JbnB1dCk7XG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcblxuICAgIGlmICh0aGlzLm9wZXJhdG9yKSB7XG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS52YWwodGhpcy5vcGVyYXRvcik7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgIGlmIChzZWFyY2hUZXJtKSB7XG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xuICAgIGlmICgkZmlsdGVyQ29udGFpbmVyRWxtICYmIHR5cGVvZiAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xuICAgIH1cblxuICAgIHJldHVybiAkZmlsdGVyQ29udGFpbmVyRWxtO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRyaWdnZXJFdmVudChlOiBFdmVudCB8IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCB9KTtcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7IC8vIHJlc2V0IGZsYWcgZm9yIG5leHQgdXNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3BlcmF0b3IgPSB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS50ZXh0KCk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbCgpO1xuICAgICAgKHZhbHVlKSA/IHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIHNlYXJjaFRlcm1zOiAodmFsdWUgPyBbdmFsdWVdIDogbnVsbCksIG9wZXJhdG9yOiBzZWxlY3RlZE9wZXJhdG9yIHx8ICcnIH0pO1xuICAgIH1cbiAgfVxufVxuIl19