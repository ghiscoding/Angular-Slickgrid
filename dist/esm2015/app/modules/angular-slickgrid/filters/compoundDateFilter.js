/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapFlatpickrDateFormatWithFieldType } from '../services/utilities';
import { FieldType, OperatorType } from './../models/index';
require('flatpickr');
export class CompoundDateFilter {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
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
     * @param {?} op
     * @return {?}
     */
    set operator(op) {
        this._operator = op;
    }
    /**
     * @return {?}
     */
    get operator() {
        return this._operator || OperatorType.empty;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        if (args) {
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.operator = args.operator || '';
            this.searchTerms = args.searchTerms || [];
            // date input can only have 1 search term, so we will use the 1st array index if it exist
            /** @type {?} */
            const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.keyup((e) => {
                this.onTriggerEvent(e);
            });
            this.$selectOperatorElm.change((e) => {
                this.onTriggerEvent(e);
            });
        }
    }
    /**
     * Clear the filter value
     * @return {?}
     */
    clear() {
        if (this.flatInstance && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            this.$selectOperatorElm.val(0);
            this.flatInstance.clear();
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('keyup').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values && Array.isArray(values)) {
            this.flatInstance.setDate(values[0]);
        }
    }
    //
    // private functions
    // ------------------
    /**
     * @private
     * @param {?=} searchTerm
     * @return {?}
     */
    buildDatePickerInput(searchTerm) {
        /** @type {?} */
        const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
        /** @type {?} */
        const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
        /** @type {?} */
        let currentLocale = this.translate.currentLang || 'en';
        if (currentLocale.length > 2) {
            currentLocale = currentLocale.substring(0, 2);
        }
        /** @type {?} */
        const pickerOptions = {
            defaultDate: searchTerm || '',
            altInput: true,
            altFormat: outputFormat,
            dateFormat: inputFormat,
            wrap: true,
            closeOnSelect: true,
            locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
            onChange: (selectedDates, dateStr, instance) => {
                this._currentValue = dateStr;
                // when using the time picker, we can simulate a keyup event to avoid multiple backend request
                // since backend request are only executed after user start typing, changing the time should be treated the same way
                if (pickerOptions.enableTime) {
                    this.onTriggerEvent(new CustomEvent('keyup'));
                }
                else {
                    this.onTriggerEvent(undefined);
                }
            }
        };
        // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
        if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
            pickerOptions.enableTime = true;
        }
        /** @type {?} */
        const placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        /** @type {?} */
        const $filterInputElm = $(`<div class="flatpickr"><input type="text" class="form-control" data-input placeholder="${placeholder}"></div>`);
        this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerOptions) : null;
        return $filterInputElm;
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
        return [
            { operator: (/** @type {?} */ ('')), description: '' },
            { operator: (/** @type {?} */ ('=')), description: '' },
            { operator: (/** @type {?} */ ('<')), description: '' },
            { operator: (/** @type {?} */ ('<=')), description: '' },
            { operator: (/** @type {?} */ ('>')), description: '' },
            { operator: (/** @type {?} */ ('>=')), description: '' },
            { operator: (/** @type {?} */ ('<>')), description: '' }
        ];
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
        this.$filterInputElm = this.buildDatePickerInput(searchTerm);
        /** @type {?} */
        const $filterContainerElm = $(`<div class="form-group search-filter filter-${fieldId}"></div>`);
        /** @type {?} */
        const $containerInputGroup = $(`<div class="input-group flatpickr"></div>`);
        /** @type {?} */
        const $operatorInputGroupAddon = $(`<div class="input-group-addon input-group-prepend operator"></div>`);
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
        $filterContainerElm.attr('id', `filter-${fieldId}`);
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
    }
    /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    loadFlatpickrLocale(locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        if (this.gridOptions && this.gridOptions.params && this.gridOptions.params.flapickrLocale) {
            return this.gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
            /** @type {?} */
            const localeDefault = require(`flatpickr/dist/l10n/${locale}.js`).default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
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
            (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '' });
        }
    }
    /**
     * @private
     * @return {?}
     */
    hide() {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    }
    /**
     * @private
     * @return {?}
     */
    show() {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmREYXRlRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2NvbXBvdW5kRGF0ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFtRCxTQUFTLEVBQThCLFlBQVksRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBSXJKLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUtyQixNQUFNLE9BQU8sa0JBQWtCOzs7O0lBYTdCLFlBQW9CLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBWnZDLDBCQUFxQixHQUFHLEtBQUssQ0FBQztJQVlhLENBQUM7Ozs7OztJQUdwRCxJQUFZLFdBQVc7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNFLENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsRUFBaUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUNELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQzlDLENBQUM7Ozs7OztJQUtELElBQUksQ0FBQyxJQUFxQjtRQUN4QixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDOUIsSUFBSSxDQUFD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QUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDcEo7SUFDSCxDQUFDOzs7OztJQUVPLElBQUk7UUFDVixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDdEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7O0lBRU8sSUFBSTtRQUNWLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7SUEzT0MsbURBQXNDOzs7OztJQUN0Qyx3Q0FBd0I7Ozs7O0lBQ3hCLDZDQUE2Qjs7Ozs7SUFDN0IsZ0RBQWdDOzs7OztJQUNoQywyQ0FBOEI7Ozs7O0lBQzlCLHVDQUFpRDs7SUFDakQsMENBQWtCOztJQUNsQixrQ0FBVTs7SUFDVix5Q0FBMEI7O0lBQzFCLHVDQUFrQjs7SUFDbEIsc0NBQXlCOzs7OztJQUViLHVDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgbWFwRmxhdHBpY2tyRGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBDb2x1bW4sIEZpbHRlciwgRmlsdGVyQXJndW1lbnRzLCBGaWx0ZXJDYWxsYmFjaywgRmllbGRUeXBlLCBHcmlkT3B0aW9uLCBPcGVyYXRvclN0cmluZywgT3BlcmF0b3JUeXBlLCBTZWFyY2hUZXJtIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLy8gaW1wb3J0aW5nIEZsYXRwaWNrciB3b3JrcyBiZXR0ZXIgd2l0aCBhICdyZXF1aXJlJ1xyXG5kZWNsYXJlIGZ1bmN0aW9uIHJlcXVpcmUobmFtZTogc3RyaW5nKTogYW55O1xyXG5yZXF1aXJlKCdmbGF0cGlja3InKTtcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvdW5kRGF0ZUZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XHJcbiAgcHJpdmF0ZSBfY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcclxuICBwcml2YXRlICRmaWx0ZXJFbG06IGFueTtcclxuICBwcml2YXRlICRmaWx0ZXJJbnB1dEVsbTogYW55O1xyXG4gIHByaXZhdGUgJHNlbGVjdE9wZXJhdG9yRWxtOiBhbnk7XHJcbiAgcHJpdmF0ZSBfY3VycmVudFZhbHVlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfb3BlcmF0b3I6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nO1xyXG4gIGZsYXRJbnN0YW5jZTogYW55O1xyXG4gIGdyaWQ6IGFueTtcclxuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xyXG4gIGNvbHVtbkRlZjogQ29sdW1uO1xyXG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IGdyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgc2V0IG9wZXJhdG9yKG9wOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZykge1xyXG4gICAgdGhpcy5fb3BlcmF0b3IgPSBvcDtcclxuICB9XHJcbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9vcGVyYXRvciB8fCBPcGVyYXRvclR5cGUuZW1wdHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcclxuICAgKi9cclxuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xyXG4gICAgaWYgKGFyZ3MpIHtcclxuICAgICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjaztcclxuICAgICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcclxuICAgICAgdGhpcy5vcGVyYXRvciA9IGFyZ3Mub3BlcmF0b3IgfHwgJyc7XHJcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xyXG5cclxuICAgICAgLy8gZGF0ZSBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcclxuICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xyXG5cclxuICAgICAgLy8gc3RlcCAxLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgd2hpY2ggY29udGFpbiB0aGUgY29tcG91bmQgT3BlcmF0b3IrSW5wdXRcclxuICAgICAgLy8gYW5kIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0pO1xyXG5cclxuICAgICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXHJcbiAgICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLmtleXVwKChlOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KGUpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uY2hhbmdlKChlOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KGUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVcclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSkge1xyXG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcclxuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKDApO1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVzdHJveSB0aGUgZmlsdGVyXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLm9mZigna2V5dXAnKS5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcclxuICAgKi9cclxuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtW10pIHtcclxuICAgIGlmICh2YWx1ZXMgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLnNldERhdGUodmFsdWVzWzBdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuICBwcml2YXRlIGJ1aWxkRGF0ZVBpY2tlcklucHV0KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XHJcbiAgICBjb25zdCBpbnB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc28pO1xyXG4gICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gbWFwRmxhdHBpY2tyRGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUodGhpcy5jb2x1bW5EZWYub3V0cHV0VHlwZSB8fCB0aGlzLmNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5kYXRlVXRjKTtcclxuICAgIGxldCBjdXJyZW50TG9jYWxlID0gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmcgfHwgJ2VuJztcclxuICAgIGlmIChjdXJyZW50TG9jYWxlLmxlbmd0aCA+IDIpIHtcclxuICAgICAgY3VycmVudExvY2FsZSA9IGN1cnJlbnRMb2NhbGUuc3Vic3RyaW5nKDAsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBpY2tlck9wdGlvbnM6IGFueSA9IHtcclxuICAgICAgZGVmYXVsdERhdGU6IHNlYXJjaFRlcm0gfHwgJycsXHJcbiAgICAgIGFsdElucHV0OiB0cnVlLFxyXG4gICAgICBhbHRGb3JtYXQ6IG91dHB1dEZvcm1hdCxcclxuICAgICAgZGF0ZUZvcm1hdDogaW5wdXRGb3JtYXQsXHJcbiAgICAgIHdyYXA6IHRydWUsXHJcbiAgICAgIGNsb3NlT25TZWxlY3Q6IHRydWUsXHJcbiAgICAgIGxvY2FsZTogKGN1cnJlbnRMb2NhbGUgIT09ICdlbicpID8gdGhpcy5sb2FkRmxhdHBpY2tyTG9jYWxlKGN1cnJlbnRMb2NhbGUpIDogJ2VuJyxcclxuICAgICAgb25DaGFuZ2U6IChzZWxlY3RlZERhdGVzOiBhbnlbXSB8IGFueSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gZGF0ZVN0cjtcclxuXHJcbiAgICAgICAgLy8gd2hlbiB1c2luZyB0aGUgdGltZSBwaWNrZXIsIHdlIGNhbiBzaW11bGF0ZSBhIGtleXVwIGV2ZW50IHRvIGF2b2lkIG11bHRpcGxlIGJhY2tlbmQgcmVxdWVzdFxyXG4gICAgICAgIC8vIHNpbmNlIGJhY2tlbmQgcmVxdWVzdCBhcmUgb25seSBleGVjdXRlZCBhZnRlciB1c2VyIHN0YXJ0IHR5cGluZywgY2hhbmdpbmcgdGhlIHRpbWUgc2hvdWxkIGJlIHRyZWF0ZWQgdGhlIHNhbWUgd2F5XHJcbiAgICAgICAgaWYgKHBpY2tlck9wdGlvbnMuZW5hYmxlVGltZSkge1xyXG4gICAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2tleXVwJykpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGFkZCB0aGUgdGltZSBwaWNrZXIgd2hlbiBmb3JtYXQgaXMgVVRDIChaKSBvciBoYXMgdGhlICdoJyAobWVhbmluZyBob3VycylcclxuICAgIGlmIChvdXRwdXRGb3JtYXQgJiYgKG91dHB1dEZvcm1hdCA9PT0gJ1onIHx8IG91dHB1dEZvcm1hdC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdoJykpKSB7XHJcbiAgICAgIHBpY2tlck9wdGlvbnMuZW5hYmxlVGltZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSAodGhpcy5ncmlkT3B0aW9ucykgPyAodGhpcy5ncmlkT3B0aW9ucy5kZWZhdWx0RmlsdGVyUGxhY2Vob2xkZXIgfHwgJycpIDogJyc7XHJcbiAgICBjb25zdCAkZmlsdGVySW5wdXRFbG06IGFueSA9ICQoYDxkaXYgY2xhc3M9XCJmbGF0cGlja3JcIj48aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGRhdGEtaW5wdXQgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiPjwvZGl2PmApO1xyXG4gICAgdGhpcy5mbGF0SW5zdGFuY2UgPSAoJGZpbHRlcklucHV0RWxtWzBdICYmIHR5cGVvZiAkZmlsdGVySW5wdXRFbG1bMF0uZmxhdHBpY2tyID09PSAnZnVuY3Rpb24nKSA/ICRmaWx0ZXJJbnB1dEVsbVswXS5mbGF0cGlja3IocGlja2VyT3B0aW9ucykgOiBudWxsO1xyXG4gICAgcmV0dXJuICRmaWx0ZXJJbnB1dEVsbTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSB7XHJcbiAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSB0aGlzLmdldE9wdGlvblZhbHVlcygpO1xyXG4gICAgbGV0IG9wdGlvblZhbHVlU3RyaW5nID0gJyc7XHJcbiAgICBvcHRpb25WYWx1ZXMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgIG9wdGlvblZhbHVlU3RyaW5nICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb24ub3BlcmF0b3J9XCIgdGl0bGU9XCIke29wdGlvbi5kZXNjcmlwdGlvbn1cIj4ke29wdGlvbi5vcGVyYXRvcn08L29wdGlvbj5gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+JHtvcHRpb25WYWx1ZVN0cmluZ308L3NlbGVjdD5gO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPcHRpb25WYWx1ZXMoKToge29wZXJhdG9yOiBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyB9W10ge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgeyBvcGVyYXRvcjogJycgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPCcgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPD0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJz4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJz49JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc8PicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBET00gZWxlbWVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4oZmllbGRJZCk7XHJcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBET00gU2VsZWN0IGRyb3Bkb3duIGZvciB0aGUgT3BlcmF0b3JcclxuICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtID0gJCh0aGlzLmJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkpO1xyXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0gPSB0aGlzLmJ1aWxkRGF0ZVBpY2tlcklucHV0KHNlYXJjaFRlcm0pO1xyXG4gICAgY29uc3QgJGZpbHRlckNvbnRhaW5lckVsbSA9ICQoYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIj48L2Rpdj5gKTtcclxuICAgIGNvbnN0ICRjb250YWluZXJJbnB1dEdyb3VwID0gJChgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGZsYXRwaWNrclwiPjwvZGl2PmApO1xyXG4gICAgY29uc3QgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uID0gJChgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLXByZXBlbmQgb3BlcmF0b3JcIj48L2Rpdj5gKTtcclxuXHJcbiAgICAvKiB0aGUgRE9NIGVsZW1lbnQgZmluYWwgc3RydWN0dXJlIHdpbGwgYmVcclxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLXByZXBlbmQgb3BlcmF0b3JcIj5cclxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L3NlbGVjdD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPWZsYXRwaWNrcj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgZGF0YS1pbnB1dD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAqL1xyXG4gICAgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uLmFwcGVuZCh0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSk7XHJcbiAgICAkY29udGFpbmVySW5wdXRHcm91cC5hcHBlbmQoJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uKTtcclxuICAgICRjb250YWluZXJJbnB1dEdyb3VwLmFwcGVuZCh0aGlzLiRmaWx0ZXJJbnB1dEVsbSk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXHJcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZCgkY29udGFpbmVySW5wdXRHcm91cCk7XHJcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2ZpZWxkSWR9YCk7XHJcbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5kYXRhKCdjb2x1bW5JZCcsIGZpZWxkSWQpO1xyXG5cclxuICAgIGlmICh0aGlzLm9wZXJhdG9yKSB7XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCh0aGlzLm9wZXJhdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB0aGVyZSdzIGEgc2VhcmNoIHRlcm0sIHdlIHdpbGwgYWRkIHRoZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICBpZiAoc2VhcmNoVGVybSkge1xyXG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gc2VhcmNoVGVybSBhcyBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcclxuICAgIGlmICgkZmlsdGVyQ29udGFpbmVyRWxtICYmIHR5cGVvZiAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kVG8oJGhlYWRlckVsbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICRmaWx0ZXJDb250YWluZXJFbG07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRGbGF0cGlja3JMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIC8vIGNoYW5nZSBsb2NhbGUgaWYgbmVlZGVkLCBGbGF0cGlja3IgcmVmZXJlbmNlOiBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvbG9jYWxpemF0aW9uL1xyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5wYXJhbXMgJiYgdGhpcy5ncmlkT3B0aW9ucy5wYXJhbXMuZmxhcGlja3JMb2NhbGUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ3JpZE9wdGlvbnMucGFyYW1zLmZsYXBpY2tyTG9jYWxlO1xyXG4gICAgfSBlbHNlIGlmIChsb2NhbGUgIT09ICdlbicpIHtcclxuICAgICAgY29uc3QgbG9jYWxlRGVmYXVsdDogYW55ID0gcmVxdWlyZShgZmxhdHBpY2tyL2Rpc3QvbDEwbi8ke2xvY2FsZX0uanNgKS5kZWZhdWx0O1xyXG4gICAgICByZXR1cm4gKGxvY2FsZURlZmF1bHQgJiYgbG9jYWxlRGVmYXVsdFtsb2NhbGVdKSA/IGxvY2FsZURlZmF1bHRbbG9jYWxlXSA6ICdlbic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ2VuJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25UcmlnZ2VyRXZlbnQoZTogRXZlbnQgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkIH0pO1xyXG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlOyAvLyByZXNldCBmbGFnIGZvciBuZXh0IHVzZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRPcGVyYXRvciA9IHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKTtcclxuICAgICAgKHRoaXMuX2N1cnJlbnRWYWx1ZSkgPyB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpIDogdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIHNlYXJjaFRlcm1zOiAodGhpcy5fY3VycmVudFZhbHVlID8gW3RoaXMuX2N1cnJlbnRWYWx1ZV0gOiBudWxsKSwgb3BlcmF0b3I6IHNlbGVjdGVkT3BlcmF0b3IgfHwgJycgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhpZGUoKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdHlwZW9mIHRoaXMuZmxhdEluc3RhbmNlLmNsb3NlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdHlwZW9mIHRoaXMuZmxhdEluc3RhbmNlLm9wZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5mbGF0SW5zdGFuY2Uub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=