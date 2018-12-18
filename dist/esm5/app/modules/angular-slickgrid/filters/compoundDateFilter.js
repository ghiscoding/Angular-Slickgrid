/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapFlatpickrDateFormatWithFieldType } from '../services/utilities';
import { FieldType, OperatorType } from './../models/index';
require('flatpickr');
var CompoundDateFilter = /** @class */ (function () {
    function CompoundDateFilter(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
    }
    Object.defineProperty(CompoundDateFilter.prototype, "gridOptions", {
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
    Object.defineProperty(CompoundDateFilter.prototype, "operator", {
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
    CompoundDateFilter.prototype.init = /**
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
            // date input can only have 1 search term, so we will use the 1st array index if it exist
            /** @type {?} */
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.keyup(function (e) {
                _this.onTriggerEvent(e);
            });
            this.$selectOperatorElm.change(function (e) {
                _this.onTriggerEvent(e);
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
    CompoundDateFilter.prototype.clear = /**
     * Clear the filter value
     * @return {?}
     */
    function () {
        if (this.flatInstance && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            this.$selectOperatorElm.val(0);
            this.flatInstance.clear();
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    CompoundDateFilter.prototype.destroy = /**
     * destroy the filter
     * @return {?}
     */
    function () {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
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
    CompoundDateFilter.prototype.setValues = /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values && Array.isArray(values)) {
            this.flatInstance.setDate(values[0]);
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
     * @param {?=} searchTerm
     * @return {?}
     */
    CompoundDateFilter.prototype.buildDatePickerInput = 
    //
    // private functions
    // ------------------
    /**
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    function (searchTerm) {
        var _this = this;
        /** @type {?} */
        var inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
        /** @type {?} */
        var outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
        /** @type {?} */
        var currentLocale = this.translate.currentLang || 'en';
        if (currentLocale.length > 2) {
            currentLocale = currentLocale.substring(0, 2);
        }
        /** @type {?} */
        var pickerOptions = {
            defaultDate: searchTerm || '',
            altInput: true,
            altFormat: outputFormat,
            dateFormat: inputFormat,
            wrap: true,
            closeOnSelect: true,
            locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
            onChange: function (selectedDates, dateStr, instance) {
                _this._currentValue = dateStr;
                // when using the time picker, we can simulate a keyup event to avoid multiple backend request
                // since backend request are only executed after user start typing, changing the time should be treated the same way
                if (pickerOptions.enableTime) {
                    _this.onTriggerEvent(new CustomEvent('keyup'));
                }
                else {
                    _this.onTriggerEvent(undefined);
                }
            }
        };
        // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
        if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
            pickerOptions.enableTime = true;
        }
        /** @type {?} */
        var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        /** @type {?} */
        var $filterInputElm = $("<div class=\"flatpickr\"><input type=\"text\" class=\"form-control\" data-input placeholder=\"" + placeholder + "\"></div>");
        this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerOptions) : null;
        return $filterInputElm;
    };
    /**
     * @private
     * @return {?}
     */
    CompoundDateFilter.prototype.buildSelectOperatorHtmlString = /**
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
    /**
     * @private
     * @return {?}
     */
    CompoundDateFilter.prototype.getOptionValues = /**
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
    CompoundDateFilter.prototype.createDomElement = /**
     * Create the DOM element
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    function (searchTerm) {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = this.buildDatePickerInput(searchTerm);
        /** @type {?} */
        var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
        /** @type {?} */
        var $containerInputGroup = $("<div class=\"input-group flatpickr\"></div>");
        /** @type {?} */
        var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
        /* the DOM element final structure will be
          <div class="input-group">
            <div class="input-group-addon input-group-prepend operator">
              <select class="form-control"></select>
            </div>
            <div class=flatpickr>
              <input type="text" class="form-control" data-input>
            </div>
          </div>
        */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        $containerInputGroup.append($operatorInputGroupAddon);
        $containerInputGroup.append(this.$filterInputElm);
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append($containerInputGroup);
        $filterContainerElm.attr('id', "filter-" + fieldId);
        this.$filterInputElm.data('columnId', fieldId);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
            $filterContainerElm.addClass('filled');
            this._currentValue = (/** @type {?} */ (searchTerm));
        }
        // append the new DOM element to the header row
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    };
    /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    CompoundDateFilter.prototype.loadFlatpickrLocale = /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        if (this.gridOptions && this.gridOptions.params && this.gridOptions.params.flapickrLocale) {
            return this.gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
            /** @type {?} */
            var localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    CompoundDateFilter.prototype.onTriggerEvent = /**
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
            (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '' });
        }
    };
    /**
     * @private
     * @return {?}
     */
    CompoundDateFilter.prototype.hide = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    };
    /**
     * @private
     * @return {?}
     */
    CompoundDateFilter.prototype.show = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    };
    return CompoundDateFilter;
}());
export { CompoundDateFilter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype.$filterElm;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype.$filterInputElm;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype.$selectOperatorElm;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype._currentValue;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype._operator;
    /** @type {?} */
    CompoundDateFilter.prototype.flatInstance;
    /** @type {?} */
    CompoundDateFilter.prototype.grid;
    /** @type {?} */
    CompoundDateFilter.prototype.searchTerms;
    /** @type {?} */
    CompoundDateFilter.prototype.columnDef;
    /** @type {?} */
    CompoundDateFilter.prototype.callback;
    /**
     * @type {?}
     * @private
     */
    CompoundDateFilter.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmREYXRlRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2NvbXBvdW5kRGF0ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFtRCxTQUFTLEVBQThCLFlBQVksRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBSXJKLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUtyQjtJQWFFLDRCQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVp2QywwQkFBcUIsR0FBRyxLQUFLLENBQUM7SUFZYSxDQUFDO0lBR3BELHNCQUFZLDJDQUFXO1FBRHZCLGlFQUFpRTs7Ozs7O1FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNFLENBQUM7OztPQUFBO0lBRUQsc0JBQUksd0NBQVE7Ozs7UUFHWjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzlDLENBQUM7Ozs7O1FBTEQsVUFBYSxFQUFpQztZQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUtEOztPQUVHOzs7Ozs7SUFDSCxpQ0FBSTs7Ozs7SUFBSixVQUFLLElBQXFCO1FBQTFCLGlCQXdCQztRQXZCQyxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQzs7O2dCQUdwQyxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUVqRix5RkFBeUY7WUFDekYsNENBQTRDO1lBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXBELDhFQUE4RTtZQUM5RSxzREFBc0Q7WUFDdEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFNO2dCQUNoQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQU07Z0JBQ3BDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxrQ0FBSzs7OztJQUFMO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNoRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxvQ0FBTzs7OztJQUFQO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCxzQ0FBUzs7Ozs7SUFBVCxVQUFVLE1BQW9CO1FBQzVCLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0lBRUQsRUFBRTtJQUNGLG9CQUFvQjtJQUNwQixxQkFBcUI7Ozs7Ozs7OztJQUNiLGlEQUFvQjs7Ozs7Ozs7O0lBQTVCLFVBQTZCLFVBQXVCO1FBQXBELGlCQXNDQzs7WUFyQ08sV0FBVyxHQUFHLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUM7O1lBQzNGLFlBQVksR0FBRyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDOztZQUMzSCxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLElBQUksSUFBSTtRQUN0RCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLGFBQWEsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMvQzs7WUFFSyxhQUFhLEdBQVE7WUFDekIsV0FBVyxFQUFFLFVBQVUsSUFBSSxFQUFFO1lBQzdCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLFlBQVk7WUFDdkIsVUFBVSxFQUFFLFdBQVc7WUFDdkIsSUFBSSxFQUFFLElBQUk7WUFDVixhQUFhLEVBQUUsSUFBSTtZQUNuQixNQUFNLEVBQUUsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNqRixRQUFRLEVBQUUsVUFBQyxhQUEwQixFQUFFLE9BQWUsRUFBRSxRQUFhO2dCQUNuRSxLQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztnQkFFN0IsOEZBQThGO2dCQUM5RixvSEFBb0g7Z0JBQ3BILElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRTtvQkFDNUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTTtvQkFDTCxLQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNoQztZQUNILENBQUM7U0FDRjtRQUVELDRFQUE0RTtRQUM1RSxJQUFJLFlBQVksSUFBSSxDQUFDLFlBQVksS0FBSyxHQUFHLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3RGLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ2pDOztZQUVLLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUN6RixlQUFlLEdBQVEsQ0FBQyxDQUFDLG1HQUEwRixXQUFXLGNBQVUsQ0FBQztRQUMvSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3BKLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRU8sMERBQTZCOzs7O0lBQXJDOztZQUNRLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFOztZQUN2QyxpQkFBaUIsR0FBRyxFQUFFO1FBQzFCLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQzFCLGlCQUFpQixJQUFJLHFCQUFrQixNQUFNLENBQUMsUUFBUSxtQkFBWSxNQUFNLENBQUMsV0FBVyxXQUFLLE1BQU0sQ0FBQyxRQUFRLGNBQVcsQ0FBQztRQUN0SCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sb0NBQWdDLGlCQUFpQixjQUFXLENBQUM7SUFDdEUsQ0FBQzs7Ozs7SUFFTyw0Q0FBZTs7OztJQUF2QjtRQUNFLE9BQU87WUFDTCxFQUFFLFFBQVEsRUFBRSxtQkFBQSxFQUFFLEVBQWtCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUNuRCxFQUFFLFFBQVEsRUFBRSxtQkFBQSxHQUFHLEVBQWtCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUNwRCxFQUFFLFFBQVEsRUFBRSxtQkFBQSxHQUFHLEVBQWtCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUNwRCxFQUFFLFFBQVEsRUFBRSxtQkFBQSxJQUFJLEVBQWtCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUNyRCxFQUFFLFFBQVEsRUFBRSxtQkFBQSxHQUFHLEVBQWtCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUNwRCxFQUFFLFFBQVEsRUFBRSxtQkFBQSxJQUFJLEVBQWtCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUNyRCxFQUFFLFFBQVEsRUFBRSxtQkFBQSxJQUFJLEVBQWtCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtTQUN0RCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0ssNkNBQWdCOzs7Ozs7SUFBeEIsVUFBeUIsVUFBdUI7O1lBQ3hDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs7WUFDN0MsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUV0QixrREFBa0Q7UUFDbEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDOztZQUN2RCxtQkFBbUIsR0FBRyxDQUFDLENBQUMsa0RBQStDLE9BQU8sY0FBVSxDQUFDOztZQUN6RixvQkFBb0IsR0FBRyxDQUFDLENBQUMsNkNBQTJDLENBQUM7O1lBQ3JFLHdCQUF3QixHQUFHLENBQUMsQ0FBQyxzRUFBb0UsQ0FBQztRQUV4Rzs7Ozs7Ozs7O1VBU0U7UUFDRix3QkFBd0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDekQsb0JBQW9CLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdEQsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVsRCxzREFBc0Q7UUFDdEQsbUJBQW1CLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFVLE9BQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUvQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUM7UUFFRCxnRkFBZ0Y7UUFDaEYsSUFBSSxVQUFVLEVBQUU7WUFDZCxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxtQkFBQSxVQUFVLEVBQVUsQ0FBQztTQUMzQztRQUVELCtDQUErQztRQUMvQyxJQUFJLG1CQUFtQixJQUFJLE9BQU8sbUJBQW1CLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRTtZQUM3RSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUM7UUFFRCxPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7Ozs7OztJQUVPLGdEQUFtQjs7Ozs7SUFBM0IsVUFBNEIsTUFBYztRQUN4QyxnR0FBZ0c7UUFDaEcsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtZQUN6RixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztTQUMvQzthQUFNLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTs7Z0JBQ3BCLGFBQWEsR0FBUSxPQUFPLENBQUMseUJBQXVCLE1BQU0sUUFBSyxDQUFDLENBQUMsT0FBTztZQUM5RSxPQUFPLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNoRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0lBRU8sMkNBQWM7Ozs7O0lBQXRCLFVBQXVCLENBQW9CO1FBQ3pDLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQztZQUNsRyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLENBQUMsMEJBQTBCO1NBQy9EO2FBQU07O2dCQUNDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDL0UsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNwSjtJQUNILENBQUM7Ozs7O0lBRU8saUNBQUk7Ozs7SUFBWjtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTtZQUN0RSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxpQ0FBSTs7OztJQUFaO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBNU9ELElBNE9DOzs7Ozs7O0lBM09DLG1EQUFzQzs7Ozs7SUFDdEMsd0NBQXdCOzs7OztJQUN4Qiw2Q0FBNkI7Ozs7O0lBQzdCLGdEQUFnQzs7Ozs7SUFDaEMsMkNBQThCOzs7OztJQUM5Qix1Q0FBaUQ7O0lBQ2pELDBDQUFrQjs7SUFDbEIsa0NBQVU7O0lBQ1YseUNBQTBCOztJQUMxQix1Q0FBa0I7O0lBQ2xCLHNDQUF5Qjs7Ozs7SUFFYix1Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgQ29sdW1uLCBGaWx0ZXIsIEZpbHRlckFyZ3VtZW50cywgRmlsdGVyQ2FsbGJhY2ssIEZpZWxkVHlwZSwgR3JpZE9wdGlvbiwgT3BlcmF0b3JTdHJpbmcsIE9wZXJhdG9yVHlwZSwgU2VhcmNoVGVybSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8vIGltcG9ydGluZyBGbGF0cGlja3Igd29ya3MgYmV0dGVyIHdpdGggYSAncmVxdWlyZSdcclxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKG5hbWU6IHN0cmluZyk6IGFueTtcclxucmVxdWlyZSgnZmxhdHBpY2tyJyk7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb3VuZERhdGVGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xyXG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSAkZmlsdGVyRWxtOiBhbnk7XHJcbiAgcHJpdmF0ZSAkZmlsdGVySW5wdXRFbG06IGFueTtcclxuICBwcml2YXRlICRzZWxlY3RPcGVyYXRvckVsbTogYW55O1xyXG4gIHByaXZhdGUgX2N1cnJlbnRWYWx1ZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgX29wZXJhdG9yOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZztcclxuICBmbGF0SW5zdGFuY2U6IGFueTtcclxuICBncmlkOiBhbnk7XHJcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcclxuICBjb2x1bW5EZWY6IENvbHVtbjtcclxuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIHNldCBvcGVyYXRvcihvcDogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcpIHtcclxuICAgIHRoaXMuX29wZXJhdG9yID0gb3A7XHJcbiAgfVxyXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVtcHR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXHJcbiAgICovXHJcbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcclxuICAgIGlmIChhcmdzKSB7XHJcbiAgICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcclxuICAgICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XHJcbiAgICAgIHRoaXMub3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yIHx8ICcnO1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcclxuXHJcbiAgICAgIC8vIGRhdGUgaW5wdXQgY2FuIG9ubHkgaGF2ZSAxIHNlYXJjaCB0ZXJtLCBzbyB3ZSB3aWxsIHVzZSB0aGUgMXN0IGFycmF5IGluZGV4IGlmIGl0IGV4aXN0XHJcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcclxuXHJcbiAgICAgIC8vIHN0ZXAgMSwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyIHdoaWNoIGNvbnRhaW4gdGhlIGNvbXBvdW5kIE9wZXJhdG9yK0lucHV0XHJcbiAgICAgIC8vIGFuZCBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm0gaXMgZmlsbGVkXHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtKTtcclxuXHJcbiAgICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBrZXl1cCBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xyXG4gICAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5rZXl1cCgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLmNoYW5nZSgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXHJcbiAgICovXHJcbiAgY2xlYXIoKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pIHtcclxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCgwKTtcclxuICAgICAgdGhpcy5mbGF0SW5zdGFuY2UuY2xlYXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2tleXVwJykucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybVtdKSB7XHJcbiAgICBpZiAodmFsdWVzICYmIEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5zZXREYXRlKHZhbHVlc1swXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgcHJpdmF0ZSBidWlsZERhdGVQaWNrZXJJbnB1dChzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xyXG4gICAgY29uc3QgaW5wdXRGb3JtYXQgPSBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5kYXRlSXNvKTtcclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLm91dHB1dFR5cGUgfHwgdGhpcy5jb2x1bW5EZWYudHlwZSB8fCBGaWVsZFR5cGUuZGF0ZVV0Yyk7XHJcbiAgICBsZXQgY3VycmVudExvY2FsZSA9IHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nIHx8ICdlbic7XHJcbiAgICBpZiAoY3VycmVudExvY2FsZS5sZW5ndGggPiAyKSB7XHJcbiAgICAgIGN1cnJlbnRMb2NhbGUgPSBjdXJyZW50TG9jYWxlLnN1YnN0cmluZygwLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwaWNrZXJPcHRpb25zOiBhbnkgPSB7XHJcbiAgICAgIGRlZmF1bHREYXRlOiBzZWFyY2hUZXJtIHx8ICcnLFxyXG4gICAgICBhbHRJbnB1dDogdHJ1ZSxcclxuICAgICAgYWx0Rm9ybWF0OiBvdXRwdXRGb3JtYXQsXHJcbiAgICAgIGRhdGVGb3JtYXQ6IGlucHV0Rm9ybWF0LFxyXG4gICAgICB3cmFwOiB0cnVlLFxyXG4gICAgICBjbG9zZU9uU2VsZWN0OiB0cnVlLFxyXG4gICAgICBsb2NhbGU6IChjdXJyZW50TG9jYWxlICE9PSAnZW4nKSA/IHRoaXMubG9hZEZsYXRwaWNrckxvY2FsZShjdXJyZW50TG9jYWxlKSA6ICdlbicsXHJcbiAgICAgIG9uQ2hhbmdlOiAoc2VsZWN0ZWREYXRlczogYW55W10gfCBhbnksIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9IGRhdGVTdHI7XHJcblxyXG4gICAgICAgIC8vIHdoZW4gdXNpbmcgdGhlIHRpbWUgcGlja2VyLCB3ZSBjYW4gc2ltdWxhdGUgYSBrZXl1cCBldmVudCB0byBhdm9pZCBtdWx0aXBsZSBiYWNrZW5kIHJlcXVlc3RcclxuICAgICAgICAvLyBzaW5jZSBiYWNrZW5kIHJlcXVlc3QgYXJlIG9ubHkgZXhlY3V0ZWQgYWZ0ZXIgdXNlciBzdGFydCB0eXBpbmcsIGNoYW5naW5nIHRoZSB0aW1lIHNob3VsZCBiZSB0cmVhdGVkIHRoZSBzYW1lIHdheVxyXG4gICAgICAgIGlmIChwaWNrZXJPcHRpb25zLmVuYWJsZVRpbWUpIHtcclxuICAgICAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdrZXl1cCcpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudCh1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIHRpbWUgcGlja2VyIHdoZW4gZm9ybWF0IGlzIFVUQyAoWikgb3IgaGFzIHRoZSAnaCcgKG1lYW5pbmcgaG91cnMpXHJcbiAgICBpZiAob3V0cHV0Rm9ybWF0ICYmIChvdXRwdXRGb3JtYXQgPT09ICdaJyB8fCBvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnaCcpKSkge1xyXG4gICAgICBwaWNrZXJPcHRpb25zLmVuYWJsZVRpbWUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gKHRoaXMuZ3JpZE9wdGlvbnMpID8gKHRoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdEZpbHRlclBsYWNlaG9sZGVyIHx8ICcnKSA6ICcnO1xyXG4gICAgY29uc3QgJGZpbHRlcklucHV0RWxtOiBhbnkgPSAkKGA8ZGl2IGNsYXNzPVwiZmxhdHBpY2tyXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBkYXRhLWlucHV0IHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIj48L2Rpdj5gKTtcclxuICAgIHRoaXMuZmxhdEluc3RhbmNlID0gKCRmaWx0ZXJJbnB1dEVsbVswXSAmJiB0eXBlb2YgJGZpbHRlcklucHV0RWxtWzBdLmZsYXRwaWNrciA9PT0gJ2Z1bmN0aW9uJykgPyAkZmlsdGVySW5wdXRFbG1bMF0uZmxhdHBpY2tyKHBpY2tlck9wdGlvbnMpIDogbnVsbDtcclxuICAgIHJldHVybiAkZmlsdGVySW5wdXRFbG07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkge1xyXG4gICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gdGhpcy5nZXRPcHRpb25WYWx1ZXMoKTtcclxuICAgIGxldCBvcHRpb25WYWx1ZVN0cmluZyA9ICcnO1xyXG4gICAgb3B0aW9uVmFsdWVzLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICBvcHRpb25WYWx1ZVN0cmluZyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLm9wZXJhdG9yfVwiIHRpdGxlPVwiJHtvcHRpb24uZGVzY3JpcHRpb259XCI+JHtvcHRpb24ub3BlcmF0b3J9PC9vcHRpb24+YDtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPiR7b3B0aW9uVmFsdWVTdHJpbmd9PC9zZWxlY3Q+YDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3B0aW9uVmFsdWVzKCk6IHtvcGVyYXRvcjogT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgfVtdIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHsgb3BlcmF0b3I6ICcnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJz0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJzwnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJzw9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc+JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc+PScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPD4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgRE9NIGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURvbUVsZW1lbnQoc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xyXG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIFNlbGVjdCBkcm9wZG93biBmb3IgdGhlIE9wZXJhdG9yXHJcbiAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSA9ICQodGhpcy5idWlsZFNlbGVjdE9wZXJhdG9ySHRtbFN0cmluZygpKTtcclxuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtID0gdGhpcy5idWlsZERhdGVQaWNrZXJJbnB1dChzZWFyY2hUZXJtKTtcclxuICAgIGNvbnN0ICRmaWx0ZXJDb250YWluZXJFbG0gPSAkKGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+PC9kaXY+YCk7XHJcbiAgICBjb25zdCAkY29udGFpbmVySW5wdXRHcm91cCA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBmbGF0cGlja3JcIj48L2Rpdj5gKTtcclxuICAgIGNvbnN0ICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbiA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+PC9kaXY+YCk7XHJcblxyXG4gICAgLyogdGhlIERPTSBlbGVtZW50IGZpbmFsIHN0cnVjdHVyZSB3aWxsIGJlXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+XHJcbiAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9zZWxlY3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1mbGF0cGlja3I+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGRhdGEtaW5wdXQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKi9cclxuICAgICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbi5hcHBlbmQodGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pO1xyXG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKCRvcGVyYXRvcklucHV0R3JvdXBBZGRvbik7XHJcbiAgICAkY29udGFpbmVySW5wdXRHcm91cC5hcHBlbmQodGhpcy4kZmlsdGVySW5wdXRFbG0pO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xyXG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmQoJGNvbnRhaW5lcklucHV0R3JvdXApO1xyXG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xyXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcGVyYXRvcikge1xyXG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS52YWwodGhpcy5vcGVyYXRvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgaWYgKHNlYXJjaFRlcm0pIHtcclxuICAgICAgJGZpbHRlckNvbnRhaW5lckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9IHNlYXJjaFRlcm0gYXMgc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgbmV3IERPTSBlbGVtZW50IHRvIHRoZSBoZWFkZXIgcm93XHJcbiAgICBpZiAoJGZpbHRlckNvbnRhaW5lckVsbSAmJiB0eXBlb2YgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkZmlsdGVyQ29udGFpbmVyRWxtO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2FkRmxhdHBpY2tyTG9jYWxlKGxvY2FsZTogc3RyaW5nKSB7XHJcbiAgICAvLyBjaGFuZ2UgbG9jYWxlIGlmIG5lZWRlZCwgRmxhdHBpY2tyIHJlZmVyZW5jZTogaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2xvY2FsaXphdGlvbi9cclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMucGFyYW1zICYmIHRoaXMuZ3JpZE9wdGlvbnMucGFyYW1zLmZsYXBpY2tyTG9jYWxlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZTtcclxuICAgIH0gZWxzZSBpZiAobG9jYWxlICE9PSAnZW4nKSB7XHJcbiAgICAgIGNvbnN0IGxvY2FsZURlZmF1bHQ6IGFueSA9IHJlcXVpcmUoYGZsYXRwaWNrci9kaXN0L2wxMG4vJHtsb2NhbGV9LmpzYCkuZGVmYXVsdDtcclxuICAgICAgcmV0dXJuIChsb2NhbGVEZWZhdWx0ICYmIGxvY2FsZURlZmF1bHRbbG9jYWxlXSkgPyBsb2NhbGVEZWZhdWx0W2xvY2FsZV0gOiAnZW4nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdlbic7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uVHJpZ2dlckV2ZW50KGU6IEV2ZW50IHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcclxuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCB9KTtcclxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTsgLy8gcmVzZXQgZmxhZyBmb3IgbmV4dCB1c2VcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3BlcmF0b3IgPSB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS50ZXh0KCk7XHJcbiAgICAgICh0aGlzLl9jdXJyZW50VmFsdWUpID8gdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKSA6IHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBzZWFyY2hUZXJtczogKHRoaXMuX2N1cnJlbnRWYWx1ZSA/IFt0aGlzLl9jdXJyZW50VmFsdWVdIDogbnVsbCksIG9wZXJhdG9yOiBzZWxlY3RlZE9wZXJhdG9yIHx8ICcnIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoaWRlKCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdEluc3RhbmNlICYmIHR5cGVvZiB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93KCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdEluc3RhbmNlICYmIHR5cGVvZiB0aGlzLmZsYXRJbnN0YW5jZS5vcGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLm9wZW4oKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19