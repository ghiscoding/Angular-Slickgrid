/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from './../models/index';
import { OperatorType } from './../models/index';
var CompoundInputFilter = /** @class */ (function () {
    function CompoundInputFilter(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
        this._inputType = 'text';
    }
    Object.defineProperty(CompoundInputFilter.prototype, "gridOptions", {
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
    Object.defineProperty(CompoundInputFilter.prototype, "inputType", {
        /** Getter of input type (text, number, password) */
        get: /**
         * Getter of input type (text, number, password)
         * @return {?}
         */
        function () {
            return this._inputType;
        },
        /** Setter of input type (text, number, password) */
        set: /**
         * Setter of input type (text, number, password)
         * @param {?} type
         * @return {?}
         */
        function (type) {
            this._inputType = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundInputFilter.prototype, "operator", {
        /** Getter of the Operator to use when doing the filter comparing */
        get: /**
         * Getter of the Operator to use when doing the filter comparing
         * @return {?}
         */
        function () {
            return this._operator || OperatorType.empty;
        },
        /** Getter of the Operator to use when doing the filter comparing */
        set: /**
         * Getter of the Operator to use when doing the filter comparing
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
    CompoundInputFilter.prototype.init = /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.operator = args.operator;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create the DOM Element of the filter which contain the compound Operator+Input
        // and initialize it if searchTerms is filled
        this.$filterElm = this.createDomElement(searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterInputElm.on('keyup input change', function (e) {
            _this.onTriggerEvent(e);
        });
        this.$selectOperatorElm.on('change', function (e) {
            _this.onTriggerEvent(e);
        });
    };
    /**
     * Clear the filter value
     */
    /**
     * Clear the filter value
     * @return {?}
     */
    CompoundInputFilter.prototype.clear = /**
     * Clear the filter value
     * @return {?}
     */
    function () {
        if (this.$filterElm && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val('');
            this.onTriggerEvent(null);
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    CompoundInputFilter.prototype.destroy = /**
     * destroy the filter
     * @return {?}
     */
    function () {
        if (this.$filterElm && this.$selectOperatorElm) {
            this.$filterElm.off('keyup input change').remove();
            this.$selectOperatorElm.off('change');
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
    CompoundInputFilter.prototype.setValues = /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values && Array.isArray(values)) {
            this.$filterElm.val(values[0]);
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
    CompoundInputFilter.prototype.buildInputHtmlString = 
    //
    // private functions
    // ------------------
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        return "<input class=\"form-control\" type=\"" + (this._inputType || 'text') + "\" placeholder=\"" + placeholder + "\" />";
    };
    /**
     * @private
     * @return {?}
     */
    CompoundInputFilter.prototype.buildSelectOperatorHtmlString = /**
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
    CompoundInputFilter.prototype.getOptionValues = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : FieldType.string;
        /** @type {?} */
        var optionValues = [];
        switch (type) {
            case FieldType.string:
                optionValues = [
                    { operator: (/** @type {?} */ ('')), description: this.translate.instant('CONTAINS') },
                    { operator: (/** @type {?} */ ('=')), description: this.translate.instant('EQUALS') },
                    { operator: (/** @type {?} */ ('a*')), description: this.translate.instant('STARTS_WITH') },
                    { operator: (/** @type {?} */ ('*z')), description: this.translate.instant('ENDS_WITH') },
                ];
                break;
            default:
                optionValues = [
                    { operator: (/** @type {?} */ ('')), description: this.translate.instant('CONTAINS') },
                    { operator: (/** @type {?} */ ('=')), description: '' },
                    { operator: (/** @type {?} */ ('<')), description: '' },
                    { operator: (/** @type {?} */ ('<=')), description: '' },
                    { operator: (/** @type {?} */ ('>')), description: '' },
                    { operator: (/** @type {?} */ ('>=')), description: '' },
                    { operator: (/** @type {?} */ ('<>')), description: '' }
                ];
                break;
        }
        return optionValues;
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
    CompoundInputFilter.prototype.createDomElement = /**
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
        this.$filterInputElm = $(this.buildInputHtmlString());
        /** @type {?} */
        var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
        /** @type {?} */
        var $containerInputGroup = $("<div class=\"input-group\"></div>");
        /** @type {?} */
        var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
        /* the DOM element final structure will be
          <div class="input-group">
            <div class="input-group-addon input-group-prepend operator">
              <select class="form-control"></select>
            </div>
            <input class="form-control" type="text" />
          </div>
        */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        $containerInputGroup.append($operatorInputGroupAddon);
        $containerInputGroup.append(this.$filterInputElm);
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append($containerInputGroup);
        $filterContainerElm.attr('id', "filter-" + fieldId);
        this.$filterInputElm.val(searchTerm);
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
    CompoundInputFilter.prototype.onTriggerEvent = /**
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
            (value !== null && value !== undefined && value !== '') ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
        }
    };
    return CompoundInputFilter;
}());
export { CompoundInputFilter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype._inputType;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype.$filterElm;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype.$filterInputElm;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype.$selectOperatorElm;
    /**
     * @type {?}
     * @private
     */
    CompoundInputFilter.prototype._operator;
    /** @type {?} */
    CompoundInputFilter.prototype.grid;
    /** @type {?} */
    CompoundInputFilter.prototype.searchTerms;
    /** @type {?} */
    CompoundInputFilter.prototype.columnDef;
    /** @type {?} */
    CompoundInputFilter.prototype.callback;
    /**
     * @type {?}
     * @protected
     */
    CompoundInputFilter.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmRJbnB1dEZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVycy9jb21wb3VuZElucHV0RmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUErRSxZQUFZLEVBQWMsTUFBTSxtQkFBbUIsQ0FBQztBQUsxSTtJQVlFLDZCQUFzQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVh6QywwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIsZUFBVSxHQUFHLE1BQU0sQ0FBQztJQVV3QixDQUFDO0lBR3JELHNCQUFZLDRDQUFXO1FBRHZCLGlFQUFpRTs7Ozs7O1FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNFLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksMENBQVM7UUFEYixvREFBb0Q7Ozs7O1FBQ3BEO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxvREFBb0Q7Ozs7OztRQUNwRCxVQUFjLElBQVk7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQzs7O09BTEE7SUFRRCxzQkFBSSx5Q0FBUTtRQURaLG9FQUFvRTs7Ozs7UUFDcEU7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztRQUM5QyxDQUFDO1FBRUQsb0VBQW9FOzs7Ozs7UUFDcEUsVUFBYSxFQUFpQztZQUM1QyxJQUFJLENBQUMs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Ozs7O0lBQzVCLHlDQUF3Qjs7Ozs7SUFDeEIsOENBQTZCOzs7OztJQUM3QixpREFBZ0M7Ozs7O0lBQ2hDLHdDQUFpRDs7SUFDakQsbUNBQVU7O0lBQ1YsMENBQTBCOztJQUMxQix3Q0FBa0I7O0lBQ2xCLHVDQUF5Qjs7Ozs7SUFFYix3Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgQ29sdW1uLCBGaWx0ZXIsIEZpbHRlckFyZ3VtZW50cywgRmlsdGVyQ2FsbGJhY2ssIEdyaWRPcHRpb24sIE9wZXJhdG9yU3RyaW5nLCBPcGVyYXRvclR5cGUsIFNlYXJjaFRlcm0gfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb3VuZElucHV0RmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcclxuICBwcml2YXRlIF9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2lucHV0VHlwZSA9ICd0ZXh0JztcclxuICBwcml2YXRlICRmaWx0ZXJFbG06IGFueTtcclxuICBwcml2YXRlICRmaWx0ZXJJbnB1dEVsbTogYW55O1xyXG4gIHByaXZhdGUgJHNlbGVjdE9wZXJhdG9yRWxtOiBhbnk7XHJcbiAgcHJpdmF0ZSBfb3BlcmF0b3I6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nO1xyXG4gIGdyaWQ6IGFueTtcclxuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xyXG4gIGNvbHVtbkRlZjogQ29sdW1uO1xyXG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge31cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgb2YgaW5wdXQgdHlwZSAodGV4dCwgbnVtYmVyLCBwYXNzd29yZCkgKi9cclxuICBnZXQgaW5wdXRUeXBlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lucHV0VHlwZTtcclxuICB9XHJcblxyXG4gIC8qKiBTZXR0ZXIgb2YgaW5wdXQgdHlwZSAodGV4dCwgbnVtYmVyLCBwYXNzd29yZCkgKi9cclxuICBzZXQgaW5wdXRUeXBlKHR5cGU6IHN0cmluZykge1xyXG4gICAgdGhpcy5faW5wdXRUeXBlID0gdHlwZTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgb2YgdGhlIE9wZXJhdG9yIHRvIHVzZSB3aGVuIGRvaW5nIHRoZSBmaWx0ZXIgY29tcGFyaW5nICovXHJcbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9vcGVyYXRvciB8fCBPcGVyYXRvclR5cGUuZW1wdHk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIG9mIHRoZSBPcGVyYXRvciB0byB1c2Ugd2hlbiBkb2luZyB0aGUgZmlsdGVyIGNvbXBhcmluZyAqL1xyXG4gIHNldCBvcGVyYXRvcihvcDogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcpIHtcclxuICAgIHRoaXMuX29wZXJhdG9yID0gb3A7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcclxuICAgKi9cclxuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xyXG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xyXG4gICAgdGhpcy5vcGVyYXRvciA9IGFyZ3Mub3BlcmF0b3I7XHJcbiAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcclxuXHJcbiAgICAvLyBmaWx0ZXIgaW5wdXQgY2FuIG9ubHkgaGF2ZSAxIHNlYXJjaCB0ZXJtLCBzbyB3ZSB3aWxsIHVzZSB0aGUgMXN0IGFycmF5IGluZGV4IGlmIGl0IGV4aXN0XHJcbiAgICBjb25zdCBzZWFyY2hUZXJtID0gKEFycmF5LmlzQXJyYXkodGhpcy5zZWFyY2hUZXJtcykgJiYgdGhpcy5zZWFyY2hUZXJtc1swXSkgfHwgJyc7XHJcblxyXG4gICAgLy8gc3RlcCAxLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgd2hpY2ggY29udGFpbiB0aGUgY29tcG91bmQgT3BlcmF0b3IrSW5wdXRcclxuICAgIC8vIGFuZCBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm1zIGlzIGZpbGxlZFxyXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0pO1xyXG5cclxuICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBrZXl1cCBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xyXG4gICAgLy8gYWxzbyBhZGQvcmVtb3ZlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLm9uKCdrZXl1cCBpbnB1dCBjaGFuZ2UnLCAoZTogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQoZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLm9uKCdjaGFuZ2UnLCAoZTogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQoZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVcclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0gJiYgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pIHtcclxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCgwKTtcclxuICAgICAgdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKCcnKTtcclxuICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChudWxsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtICYmIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2tleXVwIGlucHV0IGNoYW5nZScpLnJlbW92ZSgpO1xyXG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5vZmYoJ2NoYW5nZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHZhbHVlKHMpIG9uIHRoZSBET00gZWxlbWVudFxyXG4gICAqL1xyXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm1bXSkge1xyXG4gICAgaWYgKHZhbHVlcyAmJiBBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbCh2YWx1ZXNbMF0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwcml2YXRlIGJ1aWxkSW5wdXRIdG1sU3RyaW5nKCkge1xyXG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSAodGhpcy5ncmlkT3B0aW9ucykgPyAodGhpcy5ncmlkT3B0aW9ucy5kZWZhdWx0RmlsdGVyUGxhY2Vob2xkZXIgfHwgJycpIDogJyc7XHJcbiAgICByZXR1cm4gYDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCIke3RoaXMuX2lucHV0VHlwZSB8fCAndGV4dCd9XCIgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiIC8+YDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSB7XHJcbiAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSB0aGlzLmdldE9wdGlvblZhbHVlcygpO1xyXG4gICAgbGV0IG9wdGlvblZhbHVlU3RyaW5nID0gJyc7XHJcbiAgICBvcHRpb25WYWx1ZXMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgIG9wdGlvblZhbHVlU3RyaW5nICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb24ub3BlcmF0b3J9XCIgdGl0bGU9XCIke29wdGlvbi5kZXNjcmlwdGlvbn1cIj4ke29wdGlvbi5vcGVyYXRvcn08L29wdGlvbj5gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+JHtvcHRpb25WYWx1ZVN0cmluZ308L3NlbGVjdD5gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPcHRpb25WYWx1ZXMoKToge29wZXJhdG9yOiBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyB9W10ge1xyXG4gICAgY29uc3QgdHlwZSA9ICh0aGlzLmNvbHVtbkRlZi50eXBlICYmIHRoaXMuY29sdW1uRGVmLnR5cGUpID8gdGhpcy5jb2x1bW5EZWYudHlwZSA6IEZpZWxkVHlwZS5zdHJpbmc7XHJcbiAgICBsZXQgb3B0aW9uVmFsdWVzID0gW107XHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgRmllbGRUeXBlLnN0cmluZzpcclxuICAgICAgICBvcHRpb25WYWx1ZXMgPSBbXHJcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTlRBSU5TJykgfSxcclxuICAgICAgICAgIHsgb3BlcmF0b3I6ICc9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0VRVUFMUycpIH0sXHJcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnYSonIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU1RBUlRTX1dJVEgnKSB9LFxyXG4gICAgICAgICAgeyBvcGVyYXRvcjogJyp6JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0VORFNfV0lUSCcpIH0sXHJcbiAgICAgICAgICAvKlxyXG4gICAgICAgICAgeyBvcGVyYXRvcjogJ0lOJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0lOX0NPTExFQ1RJT05fU0VQRVJBVEVEX0JZX0NPTU1BJykgfSxcclxuICAgICAgICAgIHsgb3BlcmF0b3I6ICdOSU4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnTk9UX0lOX0NPTExFQ1RJT05fU0VQRVJBVEVEX0JZX0NPTU1BJykgfSxcclxuICAgICAgICAgICovXHJcbiAgICAgICAgXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBvcHRpb25WYWx1ZXMgPSBbXHJcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTlRBSU5TJykgfSxcclxuICAgICAgICAgIHsgb3BlcmF0b3I6ICc9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPCcgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICAgICAgeyBvcGVyYXRvcjogJzw9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICAgICAgeyBvcGVyYXRvcjogJz49JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPD4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvblZhbHVlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgRE9NIGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZURvbUVsZW1lbnQoc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xyXG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIFNlbGVjdCBkcm9wZG93biBmb3IgdGhlIE9wZXJhdG9yXHJcbiAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSA9ICQodGhpcy5idWlsZFNlbGVjdE9wZXJhdG9ySHRtbFN0cmluZygpKTtcclxuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtID0gJCh0aGlzLmJ1aWxkSW5wdXRIdG1sU3RyaW5nKCkpO1xyXG4gICAgY29uc3QgJGZpbHRlckNvbnRhaW5lckVsbSA9ICQoYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIj48L2Rpdj5gKTtcclxuICAgIGNvbnN0ICRjb250YWluZXJJbnB1dEdyb3VwID0gJChgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+PC9kaXY+YCk7XHJcbiAgICBjb25zdCAkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24gPSAkKGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPjwvZGl2PmApO1xyXG5cclxuICAgIC8qIHRoZSBET00gZWxlbWVudCBmaW5hbCBzdHJ1Y3R1cmUgd2lsbCBiZVxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPlxyXG4gICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPjwvc2VsZWN0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAqL1xyXG4gICAgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uLmFwcGVuZCh0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSk7XHJcbiAgICAkY29udGFpbmVySW5wdXRHcm91cC5hcHBlbmQoJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uKTtcclxuICAgICRjb250YWluZXJJbnB1dEdyb3VwLmFwcGVuZCh0aGlzLiRmaWx0ZXJJbnB1dEVsbSk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXHJcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZCgkY29udGFpbmVySW5wdXRHcm91cCk7XHJcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2ZpZWxkSWR9YCk7XHJcblxyXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKHNlYXJjaFRlcm0pO1xyXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcGVyYXRvcikge1xyXG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS52YWwodGhpcy5vcGVyYXRvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgaWYgKHNlYXJjaFRlcm0pIHtcclxuICAgICAgJGZpbHRlckNvbnRhaW5lckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcclxuICAgIGlmICgkZmlsdGVyQ29udGFpbmVyRWxtICYmIHR5cGVvZiAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kVG8oJGhlYWRlckVsbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICRmaWx0ZXJDb250YWluZXJFbG07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uVHJpZ2dlckV2ZW50KGU6IEV2ZW50IHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcclxuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCB9KTtcclxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTsgLy8gcmVzZXQgZmxhZyBmb3IgbmV4dCB1c2VcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3BlcmF0b3IgPSB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS50ZXh0KCk7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKCk7XHJcbiAgICAgICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJykgPyB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpIDogdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIHNlYXJjaFRlcm1zOiAodmFsdWUgPyBbdmFsdWVdIDogbnVsbCksIG9wZXJhdG9yOiBzZWxlY3RlZE9wZXJhdG9yIHx8ICcnIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=