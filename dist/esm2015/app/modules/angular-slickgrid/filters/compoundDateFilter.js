/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapFlatpickrDateFormatWithFieldType } from '../services/utilities';
import { FieldType, OperatorType } from './../models/index';
import Flatpickr from 'flatpickr';
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
        if (this.flatInstance && values && Array.isArray(values)) {
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
        this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerOptions) : Flatpickr($filterInputElm, pickerOptions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmREYXRlRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2NvbXBvdW5kRGF0ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFtRCxTQUFTLEVBQThCLFlBQVksRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBQ3JKLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUlsQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFLckIsTUFBTSxPQUFPLGtCQUFrQjs7OztJQWE3QixZQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVp2QywwQkFBcUIsR0FBRyxLQUFLLENBQUM7SUFZYSxDQUFDOzs7Ozs7SUFHcEQsSUFBWSxXQUFXO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzRSxDQUFDOzs7OztJQUVELElBQUksUUFBUSxDQUFDLEVBQWlDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFDRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztJQUM5QyxDQUFDOzs7Ozs7SUFLRCxJQUFJLENBQUMsSUFBcUI7UUFDeEIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7OztrQkFHcEMsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFFakYseUZBQXlGO1lBQ3pGLDRDQUE0QztZQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVwRCw4RUFBOEU7WUFDOUUsc0RBQXNEO1lBQ3RELElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7O0lBS0QsS0FBSztRQUNILElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDaEQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7OztJQUtELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDOzs7Ozs7SUFLRCxTQUFTLENBQUMsTUFBb0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3hELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7Ozs7Ozs7O0lBS08sb0JBQW9CLENBQUMsVUFBdUI7O2NBQzVDLFdBQVcsR0FBRyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDOztjQUMzRixZQUFZLEdBQUcsbUNBQW1DLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQzs7WUFDM0gsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxJQUFJLElBQUk7UUFDdEQsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM1QixhQUFhLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0M7O2NBRUssYUFBYSxHQUFRO1lBQ3pCLFdBQVcsRUFBRSxVQUFVLElBQUksRUFBRTtZQUM3QixRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLElBQUksRUFBRSxJQUFJO1lBQ1YsYUFBYSxFQUFFLElBQUk7WUFDbkIsTUFBTSxFQUFFLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDakYsUUFBUSxFQUFFLENBQUMsYUFBMEIsRUFBRSxPQUFlLEVBQUUsUUFBYSxFQUFFLEVBQUU7Z0JBQ3ZFLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO2dCQUU3Qiw4RkFBOEY7Z0JBQzlGLG9IQUFvSDtnQkFDcEgsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFO29CQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQy9DO3FCQUFNO29CQUNMLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ2hDO1lBQ0gsQ0FBQztTQUNGO1FBRUQsNEVBQTRFO1FBQzVFLElBQUksWUFBWSxJQUFJLENBQUMsWUFBWSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDdEYsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDakM7O2NBRUssV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7O2NBQ3pGLGVBQWUsR0FBUSxDQUFDLENBQUMsMEZBQTBGLFdBQVcsVUFBVSxDQUFDO1FBQy9JLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3pMLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRU8sNkJBQTZCOztjQUM3QixZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTs7WUFDdkMsaUJBQWlCLEdBQUcsRUFBRTtRQUMxQixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDOUIsaUJBQWlCLElBQUksa0JBQWtCLE1BQU0sQ0FBQyxRQUFRLFlBQVksTUFBTSxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUMsUUFBUSxXQUFXLENBQUM7UUFDdEgsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGdDQUFnQyxpQkFBaUIsV0FBVyxDQUFDO0lBQ3RFLENBQUM7Ozs7O0lBRU8sZUFBZTtRQUNyQixPQUFPO1lBQ0wsRUFBRSxRQUFRLEVBQUUsbUJBQUEsRUFBRSxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDbkQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsR0FBRyxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDcEQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsR0FBRyxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDcEQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsSUFBSSxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDckQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsR0FBRyxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDcEQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsSUFBSSxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDckQsRUFBRSxRQUFRLEVBQUUsbUJBQUEsSUFBSSxFQUFrQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7U0FDdEQsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7SUFLTyxnQkFBZ0IsQ0FBQyxVQUF1Qjs7Y0FDeEMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOztjQUM3QyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7UUFDeEQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXRCLGtEQUFrRDtRQUNsRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7O2NBQ3ZELG1CQUFtQixHQUFHLENBQUMsQ0FBQywrQ0FBK0MsT0FBTyxVQUFVLENBQUM7O2NBQ3pGLG9CQUFvQixHQUFHLENBQUMsQ0FBQywyQ0FBMkMsQ0FBQzs7Y0FDckUsd0JBQXdCLEdBQUcsQ0FBQyxDQUFDLG9FQUFvRSxDQUFDO1FBRXhHOzs7Ozs7Ozs7VUFTRTtRQUNGLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN6RCxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0RCxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWxELHNEQUFzRDtRQUN0RCxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNqRCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFL0MsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsZ0ZBQWdGO1FBQ2hGLElBQUksVUFBVSxFQUFFO1lBQ2QsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsbUJBQUEsVUFBVSxFQUFVLENBQUM7U0FDM0M7UUFFRCwrQ0FBK0M7UUFDL0MsSUFBSSxtQkFBbUIsSUFBSSxPQUFPLG1CQUFtQixDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDN0UsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsT0FBTyxtQkFBbUIsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFFTyxtQkFBbUIsQ0FBQyxNQUFjO1FBQ3hDLGdHQUFnRztRQUNoRyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO1lBQ3pGLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1NBQy9DO2FBQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFOztrQkFDcEIsYUFBYSxHQUFRLE9BQU8sQ0FBQyx1QkFBdUIsTUFBTSxLQUFLLENBQUMsQ0FBQyxPQUFPO1lBQzlFLE9BQU8sQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ2hGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsQ0FBb0I7UUFDekMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsQ0FBQywwQkFBMEI7U0FDL0Q7YUFBTTs7a0JBQ0MsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRTtZQUMvRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3BKO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxJQUFJO1FBQ1YsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQ3RFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7OztJQUVPLElBQUk7UUFDVixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7WUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBM09DLG1EQUFzQzs7Ozs7SUFDdEMsd0NBQXdCOzs7OztJQUN4Qiw2Q0FBNkI7Ozs7O0lBQzdCLGdEQUFnQzs7Ozs7SUFDaEMsMkNBQThCOzs7OztJQUM5Qix1Q0FBaUQ7O0lBQ2pELDBDQUFrQjs7SUFDbEIsa0NBQVU7O0lBQ1YseUNBQTBCOztJQUMxQix1Q0FBa0I7O0lBQ2xCLHNDQUF5Qjs7Ozs7SUFFYix1Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBDb2x1bW4sIEZpbHRlciwgRmlsdGVyQXJndW1lbnRzLCBGaWx0ZXJDYWxsYmFjaywgRmllbGRUeXBlLCBHcmlkT3B0aW9uLCBPcGVyYXRvclN0cmluZywgT3BlcmF0b3JUeXBlLCBTZWFyY2hUZXJtIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IEZsYXRwaWNrciBmcm9tICdmbGF0cGlja3InO1xuXG4vLyB1c2UgRmxhdHBpY2tyIGZyb20gaW1wb3J0IG9yICdyZXF1aXJlJywgd2hpY2hldmVyIHdvcmtzIGZpcnN0XG5kZWNsYXJlIGZ1bmN0aW9uIHJlcXVpcmUobmFtZTogc3RyaW5nKTogYW55O1xucmVxdWlyZSgnZmxhdHBpY2tyJyk7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuZXhwb3J0IGNsYXNzIENvbXBvdW5kRGF0ZUZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gIHByaXZhdGUgJGZpbHRlckVsbTogYW55O1xuICBwcml2YXRlICRmaWx0ZXJJbnB1dEVsbTogYW55O1xuICBwcml2YXRlICRzZWxlY3RPcGVyYXRvckVsbTogYW55O1xuICBwcml2YXRlIF9jdXJyZW50VmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfb3BlcmF0b3I6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nO1xuICBmbGF0SW5zdGFuY2U6IGFueTtcbiAgZ3JpZDogYW55O1xuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xuICBjb2x1bW5EZWY6IENvbHVtbjtcbiAgY2FsbGJhY2s6IEZpbHRlckNhbGxiYWNrO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBwcml2YXRlIGdldCBncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuZ3JpZCAmJiB0aGlzLmdyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLmdyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICBzZXQgb3BlcmF0b3Iob3A6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nKSB7XG4gICAgdGhpcy5fb3BlcmF0b3IgPSBvcDtcbiAgfVxuICBnZXQgb3BlcmF0b3IoKTogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9vcGVyYXRvciB8fCBPcGVyYXRvclR5cGUuZW1wdHk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXG4gICAqL1xuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xuICAgIGlmIChhcmdzKSB7XG4gICAgICB0aGlzLmdyaWQgPSBhcmdzLmdyaWQ7XG4gICAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjaztcbiAgICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XG4gICAgICB0aGlzLm9wZXJhdG9yID0gYXJncy5vcGVyYXRvciB8fCAnJztcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xuXG4gICAgICAvLyBkYXRlIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxuICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xuXG4gICAgICAvLyBzdGVwIDEsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciB3aGljaCBjb250YWluIHRoZSBjb21wb3VuZCBPcGVyYXRvcitJbnB1dFxuICAgICAgLy8gYW5kIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcbiAgICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtKTtcblxuICAgICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXG4gICAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgICAgdGhpcy4kZmlsdGVySW5wdXRFbG0ua2V5dXAoKGU6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KGUpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5jaGFuZ2UoKGU6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVcbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSkge1xuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKDApO1xuICAgICAgdGhpcy5mbGF0SW5zdGFuY2UuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzdHJveSB0aGUgZmlsdGVyXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2tleXVwJykucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcbiAgICovXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm1bXSkge1xuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB2YWx1ZXMgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5zZXREYXRlKHZhbHVlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHByaXZhdGUgYnVpbGREYXRlUGlja2VySW5wdXQoc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcbiAgICBjb25zdCBpbnB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc28pO1xuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLm91dHB1dFR5cGUgfHwgdGhpcy5jb2x1bW5EZWYudHlwZSB8fCBGaWVsZFR5cGUuZGF0ZVV0Yyk7XG4gICAgbGV0IGN1cnJlbnRMb2NhbGUgPSB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZyB8fCAnZW4nO1xuICAgIGlmIChjdXJyZW50TG9jYWxlLmxlbmd0aCA+IDIpIHtcbiAgICAgIGN1cnJlbnRMb2NhbGUgPSBjdXJyZW50TG9jYWxlLnN1YnN0cmluZygwLCAyKTtcbiAgICB9XG5cbiAgICBjb25zdCBwaWNrZXJPcHRpb25zOiBhbnkgPSB7XG4gICAgICBkZWZhdWx0RGF0ZTogc2VhcmNoVGVybSB8fCAnJyxcbiAgICAgIGFsdElucHV0OiB0cnVlLFxuICAgICAgYWx0Rm9ybWF0OiBvdXRwdXRGb3JtYXQsXG4gICAgICBkYXRlRm9ybWF0OiBpbnB1dEZvcm1hdCxcbiAgICAgIHdyYXA6IHRydWUsXG4gICAgICBjbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgICAgbG9jYWxlOiAoY3VycmVudExvY2FsZSAhPT0gJ2VuJykgPyB0aGlzLmxvYWRGbGF0cGlja3JMb2NhbGUoY3VycmVudExvY2FsZSkgOiAnZW4nLFxuICAgICAgb25DaGFuZ2U6IChzZWxlY3RlZERhdGVzOiBhbnlbXSB8IGFueSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9IGRhdGVTdHI7XG5cbiAgICAgICAgLy8gd2hlbiB1c2luZyB0aGUgdGltZSBwaWNrZXIsIHdlIGNhbiBzaW11bGF0ZSBhIGtleXVwIGV2ZW50IHRvIGF2b2lkIG11bHRpcGxlIGJhY2tlbmQgcmVxdWVzdFxuICAgICAgICAvLyBzaW5jZSBiYWNrZW5kIHJlcXVlc3QgYXJlIG9ubHkgZXhlY3V0ZWQgYWZ0ZXIgdXNlciBzdGFydCB0eXBpbmcsIGNoYW5naW5nIHRoZSB0aW1lIHNob3VsZCBiZSB0cmVhdGVkIHRoZSBzYW1lIHdheVxuICAgICAgICBpZiAocGlja2VyT3B0aW9ucy5lbmFibGVUaW1lKSB7XG4gICAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2tleXVwJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBhZGQgdGhlIHRpbWUgcGlja2VyIHdoZW4gZm9ybWF0IGlzIFVUQyAoWikgb3IgaGFzIHRoZSAnaCcgKG1lYW5pbmcgaG91cnMpXG4gICAgaWYgKG91dHB1dEZvcm1hdCAmJiAob3V0cHV0Rm9ybWF0ID09PSAnWicgfHwgb3V0cHV0Rm9ybWF0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2gnKSkpIHtcbiAgICAgIHBpY2tlck9wdGlvbnMuZW5hYmxlVGltZSA9IHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSAodGhpcy5ncmlkT3B0aW9ucykgPyAodGhpcy5ncmlkT3B0aW9ucy5kZWZhdWx0RmlsdGVyUGxhY2Vob2xkZXIgfHwgJycpIDogJyc7XG4gICAgY29uc3QgJGZpbHRlcklucHV0RWxtOiBhbnkgPSAkKGA8ZGl2IGNsYXNzPVwiZmxhdHBpY2tyXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBkYXRhLWlucHV0IHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIj48L2Rpdj5gKTtcbiAgICB0aGlzLmZsYXRJbnN0YW5jZSA9ICgkZmlsdGVySW5wdXRFbG1bMF0gJiYgdHlwZW9mICRmaWx0ZXJJbnB1dEVsbVswXS5mbGF0cGlja3IgPT09ICdmdW5jdGlvbicpID8gJGZpbHRlcklucHV0RWxtWzBdLmZsYXRwaWNrcihwaWNrZXJPcHRpb25zKSA6IEZsYXRwaWNrcigkZmlsdGVySW5wdXRFbG0sIHBpY2tlck9wdGlvbnMpO1xuICAgIHJldHVybiAkZmlsdGVySW5wdXRFbG07XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkge1xuICAgIGNvbnN0IG9wdGlvblZhbHVlcyA9IHRoaXMuZ2V0T3B0aW9uVmFsdWVzKCk7XG4gICAgbGV0IG9wdGlvblZhbHVlU3RyaW5nID0gJyc7XG4gICAgb3B0aW9uVmFsdWVzLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgb3B0aW9uVmFsdWVTdHJpbmcgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbi5vcGVyYXRvcn1cIiB0aXRsZT1cIiR7b3B0aW9uLmRlc2NyaXB0aW9ufVwiPiR7b3B0aW9uLm9wZXJhdG9yfTwvb3B0aW9uPmA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj4ke29wdGlvblZhbHVlU3RyaW5nfTwvc2VsZWN0PmA7XG4gIH1cblxuICBwcml2YXRlIGdldE9wdGlvblZhbHVlcygpOiB7b3BlcmF0b3I6IE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nIH1bXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHsgb3BlcmF0b3I6ICcnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcbiAgICAgIHsgb3BlcmF0b3I6ICc9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICB7IG9wZXJhdG9yOiAnPCcgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgeyBvcGVyYXRvcjogJzw9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICB7IG9wZXJhdG9yOiAnPicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgeyBvcGVyYXRvcjogJz49JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICB7IG9wZXJhdG9yOiAnPD4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfVxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBET00gZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xuICAgICQoJGhlYWRlckVsbSkuZW1wdHkoKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIFNlbGVjdCBkcm9wZG93biBmb3IgdGhlIE9wZXJhdG9yXG4gICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0gPSAkKHRoaXMuYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSk7XG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0gPSB0aGlzLmJ1aWxkRGF0ZVBpY2tlcklucHV0KHNlYXJjaFRlcm0pO1xuICAgIGNvbnN0ICRmaWx0ZXJDb250YWluZXJFbG0gPSAkKGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+PC9kaXY+YCk7XG4gICAgY29uc3QgJGNvbnRhaW5lcklucHV0R3JvdXAgPSAkKGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZmxhdHBpY2tyXCI+PC9kaXY+YCk7XG4gICAgY29uc3QgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uID0gJChgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLXByZXBlbmQgb3BlcmF0b3JcIj48L2Rpdj5gKTtcblxuICAgIC8qIHRoZSBET00gZWxlbWVudCBmaW5hbCBzdHJ1Y3R1cmUgd2lsbCBiZVxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+XG4gICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPjwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1mbGF0cGlja3I+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBkYXRhLWlucHV0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICovXG4gICAgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uLmFwcGVuZCh0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSk7XG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKCRvcGVyYXRvcklucHV0R3JvdXBBZGRvbik7XG4gICAgJGNvbnRhaW5lcklucHV0R3JvdXAuYXBwZW5kKHRoaXMuJGZpbHRlcklucHV0RWxtKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xuICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kKCRjb250YWluZXJJbnB1dEdyb3VwKTtcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2ZpZWxkSWR9YCk7XG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcblxuICAgIGlmICh0aGlzLm9wZXJhdG9yKSB7XG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS52YWwodGhpcy5vcGVyYXRvcik7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgIGlmIChzZWFyY2hUZXJtKSB7XG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICAgIHRoaXMuX2N1cnJlbnRWYWx1ZSA9IHNlYXJjaFRlcm0gYXMgc3RyaW5nO1xuICAgIH1cblxuICAgIC8vIGFwcGVuZCB0aGUgbmV3IERPTSBlbGVtZW50IHRvIHRoZSBoZWFkZXIgcm93XG4gICAgaWYgKCRmaWx0ZXJDb250YWluZXJFbG0gJiYgdHlwZW9mICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kVG8gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXBwZW5kVG8oJGhlYWRlckVsbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRmaWx0ZXJDb250YWluZXJFbG07XG4gIH1cblxuICBwcml2YXRlIGxvYWRGbGF0cGlja3JMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcbiAgICAvLyBjaGFuZ2UgbG9jYWxlIGlmIG5lZWRlZCwgRmxhdHBpY2tyIHJlZmVyZW5jZTogaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2xvY2FsaXphdGlvbi9cbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLnBhcmFtcyAmJiB0aGlzLmdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ3JpZE9wdGlvbnMucGFyYW1zLmZsYXBpY2tyTG9jYWxlO1xuICAgIH0gZWxzZSBpZiAobG9jYWxlICE9PSAnZW4nKSB7XG4gICAgICBjb25zdCBsb2NhbGVEZWZhdWx0OiBhbnkgPSByZXF1aXJlKGBmbGF0cGlja3IvZGlzdC9sMTBuLyR7bG9jYWxlfS5qc2ApLmRlZmF1bHQ7XG4gICAgICByZXR1cm4gKGxvY2FsZURlZmF1bHQgJiYgbG9jYWxlRGVmYXVsdFtsb2NhbGVdKSA/IGxvY2FsZURlZmF1bHRbbG9jYWxlXSA6ICdlbic7XG4gICAgfVxuICAgIHJldHVybiAnZW4nO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRyaWdnZXJFdmVudChlOiBFdmVudCB8IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCB9KTtcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7IC8vIHJlc2V0IGZsYWcgZm9yIG5leHQgdXNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3BlcmF0b3IgPSB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS50ZXh0KCk7XG4gICAgICAodGhpcy5fY3VycmVudFZhbHVlKSA/IHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIHNlYXJjaFRlcm1zOiAodGhpcy5fY3VycmVudFZhbHVlID8gW3RoaXMuX2N1cnJlbnRWYWx1ZV0gOiBudWxsKSwgb3BlcmF0b3I6IHNlbGVjdGVkT3BlcmF0b3IgfHwgJycgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWRlKCkge1xuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB0eXBlb2YgdGhpcy5mbGF0SW5zdGFuY2UuY2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzaG93KCkge1xuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB0eXBlb2YgdGhpcy5mbGF0SW5zdGFuY2Uub3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5mbGF0SW5zdGFuY2Uub3BlbigpO1xuICAgIH1cbiAgfVxufVxuIl19