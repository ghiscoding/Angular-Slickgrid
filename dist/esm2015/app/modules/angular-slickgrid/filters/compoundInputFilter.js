/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FieldType } from './../models/index';
import { OperatorType } from './../models/index';
export class CompoundInputFilter {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
        this._inputType = 'text';
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @private
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /**
     * Getter of input type (text, number, password)
     * @return {?}
     */
    get inputType() {
        return this._inputType;
    }
    /**
     * Setter of input type (text, number, password)
     * @param {?} type
     * @return {?}
     */
    set inputType(type) {
        this._inputType = type;
    }
    /**
     * Getter of the Operator to use when doing the filter comparing
     * @return {?}
     */
    get operator() {
        return this._operator || OperatorType.empty;
    }
    /**
     * Getter of the Operator to use when doing the filter comparing
     * @param {?} op
     * @return {?}
     */
    set operator(op) {
        this._operator = op;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.operator = args.operator;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create the DOM Element of the filter which contain the compound Operator+Input
        // and initialize it if searchTerms is filled
        this.$filterElm = this.createDomElement(searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterInputElm.on('keyup input change', (e) => {
            this.onTriggerEvent(e);
        });
        this.$selectOperatorElm.on('change', (e) => {
            this.onTriggerEvent(e);
        });
    }
    /**
     * Clear the filter value
     * @return {?}
     */
    clear() {
        if (this.$filterElm && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val('');
            this.onTriggerEvent(null);
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm && this.$selectOperatorElm) {
            this.$filterElm.off('keyup input change').remove();
            this.$selectOperatorElm.off('change');
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values && Array.isArray(values)) {
            this.$filterElm.val(values[0]);
        }
    }
    //
    // private functions
    // ------------------
    /**
     * @private
     * @return {?}
     */
    buildInputHtmlString() {
        /** @type {?} */
        const placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        return `<input class="form-control" type="${this._inputType || 'text'}" placeholder="${placeholder}" />`;
    }
    /**
     * @private
     * @return {?}
     */
    buildSelectOperatorHtmlString() {
        /** @type {?} */
        const optionValues = this.getOptionValues();
        /** @type {?} */
        let optionValueString = '';
        optionValues.forEach((option) => {
            optionValueString += `<option value="${option.operator}" title="${option.description}">${option.operator}</option>`;
        });
        return `<select class="form-control">${optionValueString}</select>`;
    }
    /**
     * @private
     * @return {?}
     */
    getOptionValues() {
        /** @type {?} */
        const type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : FieldType.string;
        /** @type {?} */
        let optionValues = [];
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
    }
    /**
     * Create the DOM element
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(searchTerm) {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildInputHtmlString());
        /** @type {?} */
        const $filterContainerElm = $(`<div class="form-group search-filter filter-${fieldId}"></div>`);
        /** @type {?} */
        const $containerInputGroup = $(`<div class="input-group"></div>`);
        /** @type {?} */
        const $operatorInputGroupAddon = $(`<div class="input-group-addon input-group-prepend operator"></div>`);
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
        $filterContainerElm.attr('id', `filter-${fieldId}`);
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
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    onTriggerEvent(e) {
        if (this._clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
            this._clearFilterTriggered = false; // reset flag for next use
        }
        else {
            /** @type {?} */
            const selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            /** @type {?} */
            const value = this.$filterInputElm.val();
            (value !== null && value !== undefined && value !== '') ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmRJbnB1dEZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVycy9jb21wb3VuZElucHV0RmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUErRSxZQUFZLEVBQWMsTUFBTSxtQkFBbUIsQ0FBQztBQUsxSSxNQUFNLE9BQU8sbUJBQW1COzs7O0lBWTlCLFlBQXNCLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBWHpDLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5QixlQUFVLEdBQUcsTUFBTSxDQUFDO0lBVXdCLENBQUM7Ozs7OztJQUdyRCxJQUFZLFdBQVc7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNFLENBQUM7Ozs7O0lBR0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7OztJQUdELElBQUksU0FBUyxDQUFDLElBQVk7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFHRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztJQUM5QyxDQUFDOzs7Ozs7SUFHRCxJQUFJLFFBQVEsQ0FBQyxFQUFpQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7Ozs7SUFLRCxJQUFJLENBQUMsSUFBcUI7UUFD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QkFBcUIsRUFBRSxDQUFDLENBQUM7WUFDbEcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxDQUFDLDBCQUEwQjtTQUMvRDthQUFNOztrQkFDQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFOztrQkFDekUsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1lBQ3hDLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMxSDtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBbE5DLG9EQUFzQzs7Ozs7SUFDdEMseUNBQTRCOzs7OztJQUM1Qix5Q0FBd0I7Ozs7O0lBQ3hCLDhDQUE2Qjs7Ozs7SUFDN0IsaURBQWdDOzs7OztJQUNoQyx3Q0FBaUQ7O0lBQ2pELG1DQUFVOztJQUNWLDBDQUEwQjs7SUFDMUIsd0NBQWtCOztJQUNsQix1Q0FBeUI7Ozs7O0lBRWIsd0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IENvbHVtbiwgRmlsdGVyLCBGaWx0ZXJBcmd1bWVudHMsIEZpbHRlckNhbGxiYWNrLCBHcmlkT3B0aW9uLCBPcGVyYXRvclN0cmluZywgT3BlcmF0b3JUeXBlLCBTZWFyY2hUZXJtIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG91bmRJbnB1dEZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XHJcbiAgcHJpdmF0ZSBfY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcclxuICBwcml2YXRlIF9pbnB1dFR5cGUgPSAndGV4dCc7XHJcbiAgcHJpdmF0ZSAkZmlsdGVyRWxtOiBhbnk7XHJcbiAgcHJpdmF0ZSAkZmlsdGVySW5wdXRFbG06IGFueTtcclxuICBwcml2YXRlICRzZWxlY3RPcGVyYXRvckVsbTogYW55O1xyXG4gIHByaXZhdGUgX29wZXJhdG9yOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZztcclxuICBncmlkOiBhbnk7XHJcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcclxuICBjb2x1bW5EZWY6IENvbHVtbjtcclxuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuZ3JpZCAmJiB0aGlzLmdyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLmdyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIG9mIGlucHV0IHR5cGUgKHRleHQsIG51bWJlciwgcGFzc3dvcmQpICovXHJcbiAgZ2V0IGlucHV0VHlwZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnB1dFR5cGU7XHJcbiAgfVxyXG5cclxuICAvKiogU2V0dGVyIG9mIGlucHV0IHR5cGUgKHRleHQsIG51bWJlciwgcGFzc3dvcmQpICovXHJcbiAgc2V0IGlucHV0VHlwZSh0eXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2lucHV0VHlwZSA9IHR5cGU7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIG9mIHRoZSBPcGVyYXRvciB0byB1c2Ugd2hlbiBkb2luZyB0aGUgZmlsdGVyIGNvbXBhcmluZyAqL1xyXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVtcHR5O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBvZiB0aGUgT3BlcmF0b3IgdG8gdXNlIHdoZW4gZG9pbmcgdGhlIGZpbHRlciBjb21wYXJpbmcgKi9cclxuICBzZXQgb3BlcmF0b3Iob3A6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nKSB7XHJcbiAgICB0aGlzLl9vcGVyYXRvciA9IG9wO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXHJcbiAgICovXHJcbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcclxuICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcclxuICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xyXG4gICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcclxuICAgIHRoaXMub3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yO1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XHJcblxyXG4gICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxyXG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xyXG5cclxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyIHdoaWNoIGNvbnRhaW4gdGhlIGNvbXBvdW5kIE9wZXJhdG9yK0lucHV0XHJcbiAgICAvLyBhbmQgaW5pdGlhbGl6ZSBpdCBpZiBzZWFyY2hUZXJtcyBpcyBmaWxsZWRcclxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtKTtcclxuXHJcbiAgICAvLyBzdGVwIDMsIHN1YnNjcmliZSB0byB0aGUga2V5dXAgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcclxuICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5vbigna2V5dXAgaW5wdXQgY2hhbmdlJywgKGU6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KGUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5vbignY2hhbmdlJywgKGU6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlXHJcbiAgICovXHJcbiAgY2xlYXIoKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtICYmIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtKSB7XHJcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xyXG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS52YWwoMCk7XHJcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbCgnJyk7XHJcbiAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQobnVsbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSkge1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCdrZXl1cCBpbnB1dCBjaGFuZ2UnKS5yZW1vdmUoKTtcclxuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0ub2ZmKCdjaGFuZ2UnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcclxuICAgKi9cclxuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtW10pIHtcclxuICAgIGlmICh2YWx1ZXMgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwodmFsdWVzWzBdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZElucHV0SHRtbFN0cmluZygpIHtcclxuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gKHRoaXMuZ3JpZE9wdGlvbnMpID8gKHRoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdEZpbHRlclBsYWNlaG9sZGVyIHx8ICcnKSA6ICcnO1xyXG4gICAgcmV0dXJuIGA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwiJHt0aGlzLl9pbnB1dFR5cGUgfHwgJ3RleHQnfVwiIHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIiAvPmA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkge1xyXG4gICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gdGhpcy5nZXRPcHRpb25WYWx1ZXMoKTtcclxuICAgIGxldCBvcHRpb25WYWx1ZVN0cmluZyA9ICcnO1xyXG4gICAgb3B0aW9uVmFsdWVzLmZvckVhY2goKG9wdGlvbikgPT4ge1xyXG4gICAgICBvcHRpb25WYWx1ZVN0cmluZyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLm9wZXJhdG9yfVwiIHRpdGxlPVwiJHtvcHRpb24uZGVzY3JpcHRpb259XCI+JHtvcHRpb24ub3BlcmF0b3J9PC9vcHRpb24+YDtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPiR7b3B0aW9uVmFsdWVTdHJpbmd9PC9zZWxlY3Q+YDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3B0aW9uVmFsdWVzKCk6IHtvcGVyYXRvcjogT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgfVtdIHtcclxuICAgIGNvbnN0IHR5cGUgPSAodGhpcy5jb2x1bW5EZWYudHlwZSAmJiB0aGlzLmNvbHVtbkRlZi50eXBlKSA/IHRoaXMuY29sdW1uRGVmLnR5cGUgOiBGaWVsZFR5cGUuc3RyaW5nO1xyXG4gICAgbGV0IG9wdGlvblZhbHVlcyA9IFtdO1xyXG5cclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlIEZpZWxkVHlwZS5zdHJpbmc6XHJcbiAgICAgICAgb3B0aW9uVmFsdWVzID0gW1xyXG4gICAgICAgICAgeyBvcGVyYXRvcjogJycgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDT05UQUlOUycpIH0sXHJcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdFUVVBTFMnKSB9LFxyXG4gICAgICAgICAgeyBvcGVyYXRvcjogJ2EqJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1NUQVJUU19XSVRIJykgfSxcclxuICAgICAgICAgIHsgb3BlcmF0b3I6ICcqeicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdFTkRTX1dJVEgnKSB9LFxyXG4gICAgICAgICAgLypcclxuICAgICAgICAgIHsgb3BlcmF0b3I6ICdJTicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdJTl9DT0xMRUNUSU9OX1NFUEVSQVRFRF9CWV9DT01NQScpIH0sXHJcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnTklOJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ05PVF9JTl9DT0xMRUNUSU9OX1NFUEVSQVRFRF9CWV9DT01NQScpIH0sXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgb3B0aW9uVmFsdWVzID0gW1xyXG4gICAgICAgICAgeyBvcGVyYXRvcjogJycgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDT05UQUlOUycpIH0sXHJcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICAgICAgeyBvcGVyYXRvcjogJzwnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgICAgIHsgb3BlcmF0b3I6ICc8PScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICAgICAgeyBvcGVyYXRvcjogJz4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgICAgIHsgb3BlcmF0b3I6ICc+PScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICAgICAgeyBvcGVyYXRvcjogJzw+JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH1dO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25WYWx1ZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCAkaGVhZGVyRWxtID0gdGhpcy5ncmlkLmdldEhlYWRlclJvd0NvbHVtbihmaWVsZElkKTtcclxuICAgICQoJGhlYWRlckVsbSkuZW1wdHkoKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgdGhlIERPTSBTZWxlY3QgZHJvcGRvd24gZm9yIHRoZSBPcGVyYXRvclxyXG4gICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0gPSAkKHRoaXMuYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSk7XHJcbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbSA9ICQodGhpcy5idWlsZElucHV0SHRtbFN0cmluZygpKTtcclxuICAgIGNvbnN0ICRmaWx0ZXJDb250YWluZXJFbG0gPSAkKGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+PC9kaXY+YCk7XHJcbiAgICBjb25zdCAkY29udGFpbmVySW5wdXRHcm91cCA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPjwvZGl2PmApO1xyXG4gICAgY29uc3QgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uID0gJChgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLXByZXBlbmQgb3BlcmF0b3JcIj48L2Rpdj5gKTtcclxuXHJcbiAgICAvKiB0aGUgRE9NIGVsZW1lbnQgZmluYWwgc3RydWN0dXJlIHdpbGwgYmVcclxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLXByZXBlbmQgb3BlcmF0b3JcIj5cclxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L3NlbGVjdD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKi9cclxuICAgICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbi5hcHBlbmQodGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pO1xyXG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKCRvcGVyYXRvcklucHV0R3JvdXBBZGRvbik7XHJcbiAgICAkY29udGFpbmVySW5wdXRHcm91cC5hcHBlbmQodGhpcy4kZmlsdGVySW5wdXRFbG0pO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xyXG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmQoJGNvbnRhaW5lcklucHV0R3JvdXApO1xyXG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xyXG5cclxuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbChzZWFyY2hUZXJtKTtcclxuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3BlcmF0b3IpIHtcclxuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKHRoaXMub3BlcmF0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgIGlmIChzZWFyY2hUZXJtKSB7XHJcbiAgICAgICRmaWx0ZXJDb250YWluZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgbmV3IERPTSBlbGVtZW50IHRvIHRoZSBoZWFkZXIgcm93XHJcbiAgICBpZiAoJGZpbHRlckNvbnRhaW5lckVsbSAmJiB0eXBlb2YgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkZmlsdGVyQ29udGFpbmVyRWxtO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblRyaWdnZXJFdmVudChlOiBFdmVudCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBjbGVhckZpbHRlclRyaWdnZXJlZDogdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgfSk7XHJcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7IC8vIHJlc2V0IGZsYWcgZm9yIG5leHQgdXNlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzZWxlY3RlZE9wZXJhdG9yID0gdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbCgpO1xyXG4gICAgICAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gJycpID8gdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKSA6IHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBzZWFyY2hUZXJtczogKHZhbHVlID8gW3ZhbHVlXSA6IG51bGwpLCBvcGVyYXRvcjogc2VsZWN0ZWRPcGVyYXRvciB8fCAnJyB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19