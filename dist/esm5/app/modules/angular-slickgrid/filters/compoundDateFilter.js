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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmREYXRlRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2NvbXBvdW5kRGF0ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFtRCxTQUFTLEVBQThCLFlBQVksRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBQ3JKLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUlsQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFLckI7SUFhRSw0QkFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFadkMsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBWWEsQ0FBQztJQUdwRCxzQkFBWSwyQ0FBVztRQUR2QixpRUFBaUU7Ozs7OztRQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMzRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHdDQUFROzs7O1FBR1o7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztRQUM5QyxDQUFDOzs7OztRQUxELFVBQWEsRUFBaUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFLRDs7T0FFRzs7Ozs7O0lBQ0gsaUNBQUk7Ozs7O0lBQUosVUFBSyxJQUFxQjtRQUExQixpQkF3QkM7UUF2QkMsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUks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O1NBQzFCO0lBQ0gsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQTVPRCxJQTRPQzs7Ozs7OztJQTNPQyxtREFBc0M7Ozs7O0lBQ3RDLHdDQUF3Qjs7Ozs7SUFDeEIsNkNBQTZCOzs7OztJQUM3QixnREFBZ0M7Ozs7O0lBQ2hDLDJDQUE4Qjs7Ozs7SUFDOUIsdUNBQWlEOztJQUNqRCwwQ0FBa0I7O0lBQ2xCLGtDQUFVOztJQUNWLHlDQUEwQjs7SUFDMUIsdUNBQWtCOztJQUNsQixzQ0FBeUI7Ozs7O0lBRWIsdUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgbWFwRmxhdHBpY2tyRGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xuaW1wb3J0IHsgQ29sdW1uLCBGaWx0ZXIsIEZpbHRlckFyZ3VtZW50cywgRmlsdGVyQ2FsbGJhY2ssIEZpZWxkVHlwZSwgR3JpZE9wdGlvbiwgT3BlcmF0b3JTdHJpbmcsIE9wZXJhdG9yVHlwZSwgU2VhcmNoVGVybSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCBGbGF0cGlja3IgZnJvbSAnZmxhdHBpY2tyJztcblxuLy8gdXNlIEZsYXRwaWNrciBmcm9tIGltcG9ydCBvciAncmVxdWlyZScsIHdoaWNoZXZlciB3b3JrcyBmaXJzdFxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKG5hbWU6IHN0cmluZyk6IGFueTtcbnJlcXVpcmUoJ2ZsYXRwaWNrcicpO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBDb21wb3VuZERhdGVGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xuICBwcml2YXRlIF9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xuICBwcml2YXRlICRmaWx0ZXJFbG06IGFueTtcbiAgcHJpdmF0ZSAkZmlsdGVySW5wdXRFbG06IGFueTtcbiAgcHJpdmF0ZSAkc2VsZWN0T3BlcmF0b3JFbG06IGFueTtcbiAgcHJpdmF0ZSBfY3VycmVudFZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgX29wZXJhdG9yOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZztcbiAgZmxhdEluc3RhbmNlOiBhbnk7XG4gIGdyaWQ6IGFueTtcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcbiAgY29sdW1uRGVmOiBDb2x1bW47XG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgc2V0IG9wZXJhdG9yKG9wOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZykge1xuICAgIHRoaXMuX29wZXJhdG9yID0gb3A7XG4gIH1cbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fb3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVtcHR5O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIEZpbHRlclxuICAgKi9cbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcbiAgICBpZiAoYXJncykge1xuICAgICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xuICAgICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XG4gICAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xuICAgICAgdGhpcy5vcGVyYXRvciA9IGFyZ3Mub3BlcmF0b3IgfHwgJyc7XG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcblxuICAgICAgLy8gZGF0ZSBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcblxuICAgICAgLy8gc3RlcCAxLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgd2hpY2ggY29udGFpbiB0aGUgY29tcG91bmQgT3BlcmF0b3IrSW5wdXRcbiAgICAgIC8vIGFuZCBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm0gaXMgZmlsbGVkXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0gPSB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoc2VhcmNoVGVybSk7XG5cbiAgICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBrZXl1cCBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xuICAgICAgLy8gYWxzbyBhZGQvcmVtb3ZlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLmtleXVwKChlOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uY2hhbmdlKChlOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pIHtcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCgwKTtcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCdrZXl1cCcpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XG4gICAqL1xuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtW10pIHtcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdmFsdWVzICYmIEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgdGhpcy5mbGF0SW5zdGFuY2Uuc2V0RGF0ZSh2YWx1ZXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuICBwcml2YXRlIGJ1aWxkRGF0ZVBpY2tlcklucHV0KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XG4gICAgY29uc3QgaW5wdXRGb3JtYXQgPSBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5kYXRlSXNvKTtcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmNvbHVtbkRlZi5vdXRwdXRUeXBlIHx8IHRoaXMuY29sdW1uRGVmLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVVdGMpO1xuICAgIGxldCBjdXJyZW50TG9jYWxlID0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcgfHwgJ2VuJztcbiAgICBpZiAoY3VycmVudExvY2FsZS5sZW5ndGggPiAyKSB7XG4gICAgICBjdXJyZW50TG9jYWxlID0gY3VycmVudExvY2FsZS5zdWJzdHJpbmcoMCwgMik7XG4gICAgfVxuXG4gICAgY29uc3QgcGlja2VyT3B0aW9uczogYW55ID0ge1xuICAgICAgZGVmYXVsdERhdGU6IHNlYXJjaFRlcm0gfHwgJycsXG4gICAgICBhbHRJbnB1dDogdHJ1ZSxcbiAgICAgIGFsdEZvcm1hdDogb3V0cHV0Rm9ybWF0LFxuICAgICAgZGF0ZUZvcm1hdDogaW5wdXRGb3JtYXQsXG4gICAgICB3cmFwOiB0cnVlLFxuICAgICAgY2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICAgIGxvY2FsZTogKGN1cnJlbnRMb2NhbGUgIT09ICdlbicpID8gdGhpcy5sb2FkRmxhdHBpY2tyTG9jYWxlKGN1cnJlbnRMb2NhbGUpIDogJ2VuJyxcbiAgICAgIG9uQ2hhbmdlOiAoc2VsZWN0ZWREYXRlczogYW55W10gfCBhbnksIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSBkYXRlU3RyO1xuXG4gICAgICAgIC8vIHdoZW4gdXNpbmcgdGhlIHRpbWUgcGlja2VyLCB3ZSBjYW4gc2ltdWxhdGUgYSBrZXl1cCBldmVudCB0byBhdm9pZCBtdWx0aXBsZSBiYWNrZW5kIHJlcXVlc3RcbiAgICAgICAgLy8gc2luY2UgYmFja2VuZCByZXF1ZXN0IGFyZSBvbmx5IGV4ZWN1dGVkIGFmdGVyIHVzZXIgc3RhcnQgdHlwaW5nLCBjaGFuZ2luZyB0aGUgdGltZSBzaG91bGQgYmUgdHJlYXRlZCB0aGUgc2FtZSB3YXlcbiAgICAgICAgaWYgKHBpY2tlck9wdGlvbnMuZW5hYmxlVGltZSkge1xuICAgICAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdrZXl1cCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gYWRkIHRoZSB0aW1lIHBpY2tlciB3aGVuIGZvcm1hdCBpcyBVVEMgKFopIG9yIGhhcyB0aGUgJ2gnIChtZWFuaW5nIGhvdXJzKVxuICAgIGlmIChvdXRwdXRGb3JtYXQgJiYgKG91dHB1dEZvcm1hdCA9PT0gJ1onIHx8IG91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdoJykpKSB7XG4gICAgICBwaWNrZXJPcHRpb25zLmVuYWJsZVRpbWUgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gKHRoaXMuZ3JpZE9wdGlvbnMpID8gKHRoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdEZpbHRlclBsYWNlaG9sZGVyIHx8ICcnKSA6ICcnO1xuICAgIGNvbnN0ICRmaWx0ZXJJbnB1dEVsbTogYW55ID0gJChgPGRpdiBjbGFzcz1cImZsYXRwaWNrclwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgZGF0YS1pbnB1dCBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCI+PC9kaXY+YCk7XG4gICAgdGhpcy5mbGF0SW5zdGFuY2UgPSAoJGZpbHRlcklucHV0RWxtWzBdICYmIHR5cGVvZiAkZmlsdGVySW5wdXRFbG1bMF0uZmxhdHBpY2tyID09PSAnZnVuY3Rpb24nKSA/ICRmaWx0ZXJJbnB1dEVsbVswXS5mbGF0cGlja3IocGlja2VyT3B0aW9ucykgOiBGbGF0cGlja3IoJGZpbHRlcklucHV0RWxtLCBwaWNrZXJPcHRpb25zKTtcbiAgICByZXR1cm4gJGZpbHRlcklucHV0RWxtO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFNlbGVjdE9wZXJhdG9ySHRtbFN0cmluZygpIHtcbiAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSB0aGlzLmdldE9wdGlvblZhbHVlcygpO1xuICAgIGxldCBvcHRpb25WYWx1ZVN0cmluZyA9ICcnO1xuICAgIG9wdGlvblZhbHVlcy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIG9wdGlvblZhbHVlU3RyaW5nICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb24ub3BlcmF0b3J9XCIgdGl0bGU9XCIke29wdGlvbi5kZXNjcmlwdGlvbn1cIj4ke29wdGlvbi5vcGVyYXRvcn08L29wdGlvbj5gO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+JHtvcHRpb25WYWx1ZVN0cmluZ308L3NlbGVjdD5gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcHRpb25WYWx1ZXMoKToge29wZXJhdG9yOiBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyB9W10ge1xuICAgIHJldHVybiBbXG4gICAgICB7IG9wZXJhdG9yOiAnJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICB7IG9wZXJhdG9yOiAnPScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgeyBvcGVyYXRvcjogJzwnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcbiAgICAgIHsgb3BlcmF0b3I6ICc8PScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgeyBvcGVyYXRvcjogJz4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcbiAgICAgIHsgb3BlcmF0b3I6ICc+PScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgeyBvcGVyYXRvcjogJzw+JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH1cbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgRE9NIGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcbiAgICBjb25zdCAkaGVhZGVyRWxtID0gdGhpcy5ncmlkLmdldEhlYWRlclJvd0NvbHVtbihmaWVsZElkKTtcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XG5cbiAgICAvLyBjcmVhdGUgdGhlIERPTSBTZWxlY3QgZHJvcGRvd24gZm9yIHRoZSBPcGVyYXRvclxuICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtID0gJCh0aGlzLmJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkpO1xuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtID0gdGhpcy5idWlsZERhdGVQaWNrZXJJbnB1dChzZWFyY2hUZXJtKTtcbiAgICBjb25zdCAkZmlsdGVyQ29udGFpbmVyRWxtID0gJChgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgc2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiPjwvZGl2PmApO1xuICAgIGNvbnN0ICRjb250YWluZXJJbnB1dEdyb3VwID0gJChgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGZsYXRwaWNrclwiPjwvZGl2PmApO1xuICAgIGNvbnN0ICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbiA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+PC9kaXY+YCk7XG5cbiAgICAvKiB0aGUgRE9NIGVsZW1lbnQgZmluYWwgc3RydWN0dXJlIHdpbGwgYmVcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9ZmxhdHBpY2tyPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgZGF0YS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAqL1xuICAgICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbi5hcHBlbmQodGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pO1xuICAgICRjb250YWluZXJJbnB1dEdyb3VwLmFwcGVuZCgkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24pO1xuICAgICRjb250YWluZXJJbnB1dEdyb3VwLmFwcGVuZCh0aGlzLiRmaWx0ZXJJbnB1dEVsbSk7XG5cbiAgICAvLyBjcmVhdGUgdGhlIERPTSBlbGVtZW50ICYgYWRkIGFuIElEIGFuZCBmaWx0ZXIgY2xhc3NcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZCgkY29udGFpbmVySW5wdXRHcm91cCk7XG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XG5cbiAgICBpZiAodGhpcy5vcGVyYXRvcikge1xuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKHRoaXMub3BlcmF0b3IpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICBpZiAoc2VhcmNoVGVybSkge1xuICAgICAgJGZpbHRlckNvbnRhaW5lckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSBzZWFyY2hUZXJtIGFzIHN0cmluZztcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xuICAgIGlmICgkZmlsdGVyQ29udGFpbmVyRWxtICYmIHR5cGVvZiAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xuICAgIH1cblxuICAgIHJldHVybiAkZmlsdGVyQ29udGFpbmVyRWxtO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRmxhdHBpY2tyTG9jYWxlKGxvY2FsZTogc3RyaW5nKSB7XG4gICAgLy8gY2hhbmdlIGxvY2FsZSBpZiBuZWVkZWQsIEZsYXRwaWNrciByZWZlcmVuY2U6IGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9sb2NhbGl6YXRpb24vXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5wYXJhbXMgJiYgdGhpcy5ncmlkT3B0aW9ucy5wYXJhbXMuZmxhcGlja3JMb2NhbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZTtcbiAgICB9IGVsc2UgaWYgKGxvY2FsZSAhPT0gJ2VuJykge1xuICAgICAgY29uc3QgbG9jYWxlRGVmYXVsdDogYW55ID0gcmVxdWlyZShgZmxhdHBpY2tyL2Rpc3QvbDEwbi8ke2xvY2FsZX0uanNgKS5kZWZhdWx0O1xuICAgICAgcmV0dXJuIChsb2NhbGVEZWZhdWx0ICYmIGxvY2FsZURlZmF1bHRbbG9jYWxlXSkgPyBsb2NhbGVEZWZhdWx0W2xvY2FsZV0gOiAnZW4nO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbiAgfVxuXG4gIHByaXZhdGUgb25UcmlnZ2VyRXZlbnQoZTogRXZlbnQgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBjbGVhckZpbHRlclRyaWdnZXJlZDogdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgfSk7XG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlOyAvLyByZXNldCBmbGFnIGZvciBuZXh0IHVzZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWxlY3RlZE9wZXJhdG9yID0gdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xuICAgICAgKHRoaXMuX2N1cnJlbnRWYWx1ZSkgPyB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpIDogdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBzZWFyY2hUZXJtczogKHRoaXMuX2N1cnJlbnRWYWx1ZSA/IFt0aGlzLl9jdXJyZW50VmFsdWVdIDogbnVsbCksIG9wZXJhdG9yOiBzZWxlY3RlZE9wZXJhdG9yIHx8ICcnIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdHlwZW9mIHRoaXMuZmxhdEluc3RhbmNlLmNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvdygpIHtcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdHlwZW9mIHRoaXMuZmxhdEluc3RhbmNlLm9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLm9wZW4oKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==