/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapFlatpickrDateFormatWithFieldType } from '../services/utilities';
import { FieldType, OperatorType } from './../models/index';
import Flatpickr from 'flatpickr';
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
        if (this.flatInstance && values && Array.isArray(values)) {
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
        this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerOptions) : Flatpickr($filterInputElm, pickerOptions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmREYXRlRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2NvbXBvdW5kRGF0ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFtRCxTQUFTLEVBQThCLFlBQVksRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBQ3JKLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUlsQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFLckI7SUFhRSw0QkFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFadkMsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBWWEsQ0FBQztJQUdwRCxzQkFBWSwyQ0FBVztRQUR2QixpRUFBaUU7Ozs7OztRQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMzRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHdDQUFROzs7O1FBR1o7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztRQUM5QyxDQUFDOzs7OztRQUxELFVBQWEsRUFBaUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFLRDs7T0FFRzs7Ozs7O0lBQ0gsaUNBQUk7Ozs7O0lBQUosVUFBSyxJQUFxQjtRQUExQixpQkF3QkM7UUF2QkMsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUks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O1NBQzFCO0lBQ0gsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQTVPRCxJQTRPQzs7Ozs7OztJQTNPQyxtREFBc0M7Ozs7O0lBQ3RDLHdDQUF3Qjs7Ozs7SUFDeEIsNkNBQTZCOzs7OztJQUM3QixnREFBZ0M7Ozs7O0lBQ2hDLDJDQUE4Qjs7Ozs7SUFDOUIsdUNBQWlEOztJQUNqRCwwQ0FBa0I7O0lBQ2xCLGtDQUFVOztJQUNWLHlDQUEwQjs7SUFDMUIsdUNBQWtCOztJQUNsQixzQ0FBeUI7Ozs7O0lBRWIsdUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IENvbHVtbiwgRmlsdGVyLCBGaWx0ZXJBcmd1bWVudHMsIEZpbHRlckNhbGxiYWNrLCBGaWVsZFR5cGUsIEdyaWRPcHRpb24sIE9wZXJhdG9yU3RyaW5nLCBPcGVyYXRvclR5cGUsIFNlYXJjaFRlcm0gfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCBGbGF0cGlja3IgZnJvbSAnZmxhdHBpY2tyJztcclxuXHJcbi8vIHVzZSBGbGF0cGlja3IgZnJvbSBpbXBvcnQgb3IgJ3JlcXVpcmUnLCB3aGljaGV2ZXIgd29ya3MgZmlyc3RcclxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKG5hbWU6IHN0cmluZyk6IGFueTtcclxucmVxdWlyZSgnZmxhdHBpY2tyJyk7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb3VuZERhdGVGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xyXG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSAkZmlsdGVyRWxtOiBhbnk7XHJcbiAgcHJpdmF0ZSAkZmlsdGVySW5wdXRFbG06IGFueTtcclxuICBwcml2YXRlICRzZWxlY3RPcGVyYXRvckVsbTogYW55O1xyXG4gIHByaXZhdGUgX2N1cnJlbnRWYWx1ZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgX29wZXJhdG9yOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZztcclxuICBmbGF0SW5zdGFuY2U6IGFueTtcclxuICBncmlkOiBhbnk7XHJcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcclxuICBjb2x1bW5EZWY6IENvbHVtbjtcclxuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIHNldCBvcGVyYXRvcihvcDogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcpIHtcclxuICAgIHRoaXMuX29wZXJhdG9yID0gb3A7XHJcbiAgfVxyXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVtcHR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXHJcbiAgICovXHJcbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcclxuICAgIGlmIChhcmdzKSB7XHJcbiAgICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcclxuICAgICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XHJcbiAgICAgIHRoaXMub3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yIHx8ICcnO1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcclxuXHJcbiAgICAgIC8vIGRhdGUgaW5wdXQgY2FuIG9ubHkgaGF2ZSAxIHNlYXJjaCB0ZXJtLCBzbyB3ZSB3aWxsIHVzZSB0aGUgMXN0IGFycmF5IGluZGV4IGlmIGl0IGV4aXN0XHJcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcclxuXHJcbiAgICAgIC8vIHN0ZXAgMSwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyIHdoaWNoIGNvbnRhaW4gdGhlIGNvbXBvdW5kIE9wZXJhdG9yK0lucHV0XHJcbiAgICAgIC8vIGFuZCBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm0gaXMgZmlsbGVkXHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtKTtcclxuXHJcbiAgICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBrZXl1cCBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xyXG4gICAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5rZXl1cCgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLmNoYW5nZSgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXHJcbiAgICovXHJcbiAgY2xlYXIoKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pIHtcclxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCgwKTtcclxuICAgICAgdGhpcy5mbGF0SW5zdGFuY2UuY2xlYXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2tleXVwJykucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybVtdKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdmFsdWVzICYmIEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5zZXREYXRlKHZhbHVlc1swXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgcHJpdmF0ZSBidWlsZERhdGVQaWNrZXJJbnB1dChzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xyXG4gICAgY29uc3QgaW5wdXRGb3JtYXQgPSBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5kYXRlSXNvKTtcclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLm91dHB1dFR5cGUgfHwgdGhpcy5jb2x1bW5EZWYudHlwZSB8fCBGaWVsZFR5cGUuZGF0ZVV0Yyk7XHJcbiAgICBsZXQgY3VycmVudExvY2FsZSA9IHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nIHx8ICdlbic7XHJcbiAgICBpZiAoY3VycmVudExvY2FsZS5sZW5ndGggPiAyKSB7XHJcbiAgICAgIGN1cnJlbnRMb2NhbGUgPSBjdXJyZW50TG9jYWxlLnN1YnN0cmluZygwLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwaWNrZXJPcHRpb25zOiBhbnkgPSB7XHJcbiAgICAgIGRlZmF1bHREYXRlOiBzZWFyY2hUZXJtIHx8ICcnLFxyXG4gICAgICBhbHRJbnB1dDogdHJ1ZSxcclxuICAgICAgYWx0Rm9ybWF0OiBvdXRwdXRGb3JtYXQsXHJcbiAgICAgIGRhdGVGb3JtYXQ6IGlucHV0Rm9ybWF0LFxyXG4gICAgICB3cmFwOiB0cnVlLFxyXG4gICAgICBjbG9zZU9uU2VsZWN0OiB0cnVlLFxyXG4gICAgICBsb2NhbGU6IChjdXJyZW50TG9jYWxlICE9PSAnZW4nKSA/IHRoaXMubG9hZEZsYXRwaWNrckxvY2FsZShjdXJyZW50TG9jYWxlKSA6ICdlbicsXHJcbiAgICAgIG9uQ2hhbmdlOiAoc2VsZWN0ZWREYXRlczogYW55W10gfCBhbnksIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9IGRhdGVTdHI7XHJcblxyXG4gICAgICAgIC8vIHdoZW4gdXNpbmcgdGhlIHRpbWUgcGlja2VyLCB3ZSBjYW4gc2ltdWxhdGUgYSBrZXl1cCBldmVudCB0byBhdm9pZCBtdWx0aXBsZSBiYWNrZW5kIHJlcXVlc3RcclxuICAgICAgICAvLyBzaW5jZSBiYWNrZW5kIHJlcXVlc3QgYXJlIG9ubHkgZXhlY3V0ZWQgYWZ0ZXIgdXNlciBzdGFydCB0eXBpbmcsIGNoYW5naW5nIHRoZSB0aW1lIHNob3VsZCBiZSB0cmVhdGVkIHRoZSBzYW1lIHdheVxyXG4gICAgICAgIGlmIChwaWNrZXJPcHRpb25zLmVuYWJsZVRpbWUpIHtcclxuICAgICAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdrZXl1cCcpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudCh1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIHRpbWUgcGlja2VyIHdoZW4gZm9ybWF0IGlzIFVUQyAoWikgb3IgaGFzIHRoZSAnaCcgKG1lYW5pbmcgaG91cnMpXHJcbiAgICBpZiAob3V0cHV0Rm9ybWF0ICYmIChvdXRwdXRGb3JtYXQgPT09ICdaJyB8fCBvdXRwdXRGb3JtYXQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnaCcpKSkge1xyXG4gICAgICBwaWNrZXJPcHRpb25zLmVuYWJsZVRpbWUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gKHRoaXMuZ3JpZE9wdGlvbnMpID8gKHRoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdEZpbHRlclBsYWNlaG9sZGVyIHx8ICcnKSA6ICcnO1xyXG4gICAgY29uc3QgJGZpbHRlcklucHV0RWxtOiBhbnkgPSAkKGA8ZGl2IGNsYXNzPVwiZmxhdHBpY2tyXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBkYXRhLWlucHV0IHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIj48L2Rpdj5gKTtcclxuICAgIHRoaXMuZmxhdEluc3RhbmNlID0gKCRmaWx0ZXJJbnB1dEVsbVswXSAmJiB0eXBlb2YgJGZpbHRlcklucHV0RWxtWzBdLmZsYXRwaWNrciA9PT0gJ2Z1bmN0aW9uJykgPyAkZmlsdGVySW5wdXRFbG1bMF0uZmxhdHBpY2tyKHBpY2tlck9wdGlvbnMpIDogRmxhdHBpY2tyKCRmaWx0ZXJJbnB1dEVsbSwgcGlja2VyT3B0aW9ucyk7XHJcbiAgICByZXR1cm4gJGZpbHRlcklucHV0RWxtO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZFNlbGVjdE9wZXJhdG9ySHRtbFN0cmluZygpIHtcclxuICAgIGNvbnN0IG9wdGlvblZhbHVlcyA9IHRoaXMuZ2V0T3B0aW9uVmFsdWVzKCk7XHJcbiAgICBsZXQgb3B0aW9uVmFsdWVTdHJpbmcgPSAnJztcclxuICAgIG9wdGlvblZhbHVlcy5mb3JFYWNoKChvcHRpb24pID0+IHtcclxuICAgICAgb3B0aW9uVmFsdWVTdHJpbmcgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbi5vcGVyYXRvcn1cIiB0aXRsZT1cIiR7b3B0aW9uLmRlc2NyaXB0aW9ufVwiPiR7b3B0aW9uLm9wZXJhdG9yfTwvb3B0aW9uPmA7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gYDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj4ke29wdGlvblZhbHVlU3RyaW5nfTwvc2VsZWN0PmA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE9wdGlvblZhbHVlcygpOiB7b3BlcmF0b3I6IE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nIH1bXSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7IG9wZXJhdG9yOiAnJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc8JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc8PScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPj0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJzw+JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCAkaGVhZGVyRWxtID0gdGhpcy5ncmlkLmdldEhlYWRlclJvd0NvbHVtbihmaWVsZElkKTtcclxuICAgICQoJGhlYWRlckVsbSkuZW1wdHkoKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgdGhlIERPTSBTZWxlY3QgZHJvcGRvd24gZm9yIHRoZSBPcGVyYXRvclxyXG4gICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0gPSAkKHRoaXMuYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSk7XHJcbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbSA9IHRoaXMuYnVpbGREYXRlUGlja2VySW5wdXQoc2VhcmNoVGVybSk7XHJcbiAgICBjb25zdCAkZmlsdGVyQ29udGFpbmVyRWxtID0gJChgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgc2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiPjwvZGl2PmApO1xyXG4gICAgY29uc3QgJGNvbnRhaW5lcklucHV0R3JvdXAgPSAkKGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZmxhdHBpY2tyXCI+PC9kaXY+YCk7XHJcbiAgICBjb25zdCAkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24gPSAkKGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPjwvZGl2PmApO1xyXG5cclxuICAgIC8qIHRoZSBET00gZWxlbWVudCBmaW5hbCBzdHJ1Y3R1cmUgd2lsbCBiZVxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPlxyXG4gICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPjwvc2VsZWN0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9ZmxhdHBpY2tyPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBkYXRhLWlucHV0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICovXHJcbiAgICAkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24uYXBwZW5kKHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtKTtcclxuICAgICRjb250YWluZXJJbnB1dEdyb3VwLmFwcGVuZCgkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24pO1xyXG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKHRoaXMuJGZpbHRlcklucHV0RWxtKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgdGhlIERPTSBlbGVtZW50ICYgYWRkIGFuIElEIGFuZCBmaWx0ZXIgY2xhc3NcclxuICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kKCRjb250YWluZXJJbnB1dEdyb3VwKTtcclxuICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXR0cignaWQnLCBgZmlsdGVyLSR7ZmllbGRJZH1gKTtcclxuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3BlcmF0b3IpIHtcclxuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKHRoaXMub3BlcmF0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgIGlmIChzZWFyY2hUZXJtKSB7XHJcbiAgICAgICRmaWx0ZXJDb250YWluZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSBzZWFyY2hUZXJtIGFzIHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xyXG4gICAgaWYgKCRmaWx0ZXJDb250YWluZXJFbG0gJiYgdHlwZW9mICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kVG8gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJGZpbHRlckNvbnRhaW5lckVsbTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZEZsYXRwaWNrckxvY2FsZShsb2NhbGU6IHN0cmluZykge1xyXG4gICAgLy8gY2hhbmdlIGxvY2FsZSBpZiBuZWVkZWQsIEZsYXRwaWNrciByZWZlcmVuY2U6IGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9sb2NhbGl6YXRpb24vXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLnBhcmFtcyAmJiB0aGlzLmdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ncmlkT3B0aW9ucy5wYXJhbXMuZmxhcGlja3JMb2NhbGU7XHJcbiAgICB9IGVsc2UgaWYgKGxvY2FsZSAhPT0gJ2VuJykge1xyXG4gICAgICBjb25zdCBsb2NhbGVEZWZhdWx0OiBhbnkgPSByZXF1aXJlKGBmbGF0cGlja3IvZGlzdC9sMTBuLyR7bG9jYWxlfS5qc2ApLmRlZmF1bHQ7XHJcbiAgICAgIHJldHVybiAobG9jYWxlRGVmYXVsdCAmJiBsb2NhbGVEZWZhdWx0W2xvY2FsZV0pID8gbG9jYWxlRGVmYXVsdFtsb2NhbGVdIDogJ2VuJztcclxuICAgIH1cclxuICAgIHJldHVybiAnZW4nO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblRyaWdnZXJFdmVudChlOiBFdmVudCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBjbGVhckZpbHRlclRyaWdnZXJlZDogdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgfSk7XHJcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7IC8vIHJlc2V0IGZsYWcgZm9yIG5leHQgdXNlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzZWxlY3RlZE9wZXJhdG9yID0gdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xyXG4gICAgICAodGhpcy5fY3VycmVudFZhbHVlKSA/IHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgc2VhcmNoVGVybXM6ICh0aGlzLl9jdXJyZW50VmFsdWUgPyBbdGhpcy5fY3VycmVudFZhbHVlXSA6IG51bGwpLCBvcGVyYXRvcjogc2VsZWN0ZWRPcGVyYXRvciB8fCAnJyB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGlkZSgpIHtcclxuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB0eXBlb2YgdGhpcy5mbGF0SW5zdGFuY2UuY2xvc2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5mbGF0SW5zdGFuY2UuY2xvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB0eXBlb2YgdGhpcy5mbGF0SW5zdGFuY2Uub3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5vcGVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==