/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType, } from './../models/index';
/** @type {?} */
const DEFAULT_MIN_VALUE = 0;
/** @type {?} */
const DEFAULT_MAX_VALUE = 100;
/** @type {?} */
const DEFAULT_STEP = 1;
export class SliderFilter {
    constructor() {
        this._clearFilterTriggered = false;
    }
    /**
     * Getter for the Filter Generic Params
     * @private
     * @return {?}
     */
    get filterParams() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
    }
    /**
     * Getter for the `filter` properties
     * @private
     * @return {?}
     */
    get filterProperties() {
        return this.columnDef && this.columnDef.filter;
    }
    /**
     * @return {?}
     */
    get operator() {
        return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        if (!args) {
            throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // define the input & slider number IDs
        this._elementRangeInputId = `rangeInput_${this.columnDef.field}`;
        this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}`;
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        /** @type {?} */
        const filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change((e) => {
            /** @type {?} */
            const value = e && e.target && e.target.value || '';
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
                this._clearFilterTriggered = false; // reset flag for next use
                this.$filterElm.removeClass('filled');
            }
            else {
                this.$filterElm.addClass('filled');
                this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value] });
            }
        });
        // if user chose to display the slider number on the right side, then update it every time it changes
        // we need to use both "input" and "change" event to be all cross-browser
        if (!this.filterParams.hideSliderNumber) {
            this.$filterElm.on('input change', (e) => {
                /** @type {?} */
                const value = e && e.target && e.target.value || '';
                if (value) {
                    document.getElementById(this._elementRangeOutputId).innerHTML = value;
                }
            });
        }
    }
    /**
     * Clear the filter value
     * @return {?}
     */
    clear() {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            /** @type {?} */
            const clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
            this.$filterElm.children('input').val(clearedValue);
            this.$filterElm.children('div.input-group-addon.input-group-append').children().html(clearedValue);
            this.$filterElm.trigger('change');
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values) {
            this.$filterElm.val(values);
        }
    }
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    buildTemplateHtmlString() {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        const maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
        /** @type {?} */
        const defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        /** @type {?} */
        const step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
        if (this.filterParams.hideSliderNumber) {
            return `
      <div class="search-filter filter-${fieldId}">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-filter-input range" />
      </div>`;
        }
        return `
      <div class="input-group search-filter filter-${fieldId}">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-filter-input range" />
        <div class="input-group-addon input-group-append slider-value">
          <span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span>
        </div>
      </div>`;
    }
    /**
     * From the html template string, create a DOM element
     * @private
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(filterTemplate, searchTerm) {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        /** @type {?} */
        const $filterElm = $(filterTemplate);
        /** @type {?} */
        const searchTermInput = (/** @type {?} */ ((searchTerm || '0')));
        $filterElm.children('input').val(searchTermInput);
        $filterElm.children('div.input-group-addon.input-group-append').children().html(searchTermInput);
        $filterElm.attr('id', `filter-${fieldId}`);
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL3NsaWRlckZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQU1MLFlBQVksR0FHYixNQUFNLG1CQUFtQixDQUFDOztNQUtyQixpQkFBaUIsR0FBRyxDQUFDOztNQUNyQixpQkFBaUIsR0FBRyxHQUFHOztNQUN2QixZQUFZLEdBQUcsQ0FBQztBQUV0QixNQUFNLE9BQU8sWUFBWTtJQUF6QjtRQUNVLDBCQUFxQixHQUFHLEtBQUssQ0FBQztJQTRLeEMsQ0FBQzs7Ozs7O0lBbEtDLElBQVksWUFBWTtRQUN0QixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUN2RixDQUFDOzs7Ozs7SUFHRCxJQUFZLGdCQUFnQjtRQUMxQixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDakQsQ0FBQzs7OztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDM0csQ0FBQzs7Ozs7O0lBS0QsSUFBSSxDQUFDLElBQXFCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLGlGQUFpRixDQUFDLENBQUM7U0FDcEc7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBRTFDLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsY0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxlQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7OztjQUc3RCxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTs7O2NBRzNFLGNBQWMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7UUFFckQsdUZBQXVGO1FBQ3ZGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVwRSwrRUFBK0U7UUFDL0Usc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7O2tCQUMxQixLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLENBQUMsMEJBQTBCO2dCQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDaEc7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILHFHQUFxRztRQUNyRyx5RUFBeUU7UUFDekUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBK0IsRUFBRSxFQUFFOztzQkFDL0QsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ25ELElBQUksS0FBSyxFQUFFO29CQUNULFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDdkU7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxLQUFLO1FBQ0gsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7O2tCQUNoQixZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsaUJBQWlCO1lBQ2xJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7Ozs7O0lBS0QsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN4QztJQUNILENBQUM7Ozs7OztJQUtELFNBQVMsQ0FBQyxNQUFrQjtRQUMxQixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Ozs7Ozs7O0lBU08sdUJBQXVCOztjQUN2QixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O2NBQzdDLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7O2NBQ2hILFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7O2NBQ2hILFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxRQUFROztjQUNuSCxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWTtRQUUvRyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUU7WUFDdEMsT0FBTzt5Q0FDNEIsT0FBTztrQ0FDZCxJQUFJLENBQUMsb0JBQW9CO2tCQUN6QyxJQUFJLENBQUMsb0JBQW9COzBCQUNqQixZQUFZLFVBQVUsUUFBUSxVQUFVLFFBQVEsV0FBVyxJQUFJOzthQUU1RSxDQUFDO1NBQ1Q7UUFFRCxPQUFPO3FEQUMwQyxPQUFPO2tDQUMxQixJQUFJLENBQUMsb0JBQW9CO2tCQUN6QyxJQUFJLENBQUMsb0JBQW9COzBCQUNqQixZQUFZLFVBQVUsUUFBUSxVQUFVLFFBQVEsV0FBVyxJQUFJOzs7K0NBRzFDLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxZQUFZOzthQUU3RSxDQUFDO0lBQ1osQ0FBQzs7Ozs7Ozs7SUFNTyxnQkFBZ0IsQ0FBQyxjQUFzQixFQUFFLFVBQXVCOztjQUNoRSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O2NBQzdDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztRQUN4RCxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7OztjQUdoQixVQUFVLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQzs7Y0FDOUIsZUFBZSxHQUFHLG1CQUFBLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxFQUFVO1FBRXJELFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxRQUFRLENBQUMsMENBQTBDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDakcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXJDLGdGQUFnRjtRQUNoRixJQUFJLFVBQVUsRUFBRTtZQUNkLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0I7UUFFRCwrQ0FBK0M7UUFDL0MsSUFBSSxVQUFVLElBQUksT0FBTyxVQUFVLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRTtZQUMzRCxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGOzs7Ozs7SUE1S0MsNkNBQXNDOzs7OztJQUN0Qyw0Q0FBcUM7Ozs7O0lBQ3JDLDZDQUFzQzs7Ozs7SUFDdEMsa0NBQXdCOztJQUN4Qiw0QkFBVTs7SUFDVixtQ0FBMEI7O0lBQzFCLGlDQUFrQjs7SUFDbEIsZ0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBDb2x1bW5GaWx0ZXIsXG4gIEZpbHRlcixcbiAgRmlsdGVyQXJndW1lbnRzLFxuICBGaWx0ZXJDYWxsYmFjayxcbiAgT3BlcmF0b3JUeXBlLFxuICBPcGVyYXRvclN0cmluZyxcbiAgU2VhcmNoVGVybSxcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbmNvbnN0IERFRkFVTFRfTUlOX1ZBTFVFID0gMDtcbmNvbnN0IERFRkFVTFRfTUFYX1ZBTFVFID0gMTAwO1xuY29uc3QgREVGQVVMVF9TVEVQID0gMTtcblxuZXhwb3J0IGNsYXNzIFNsaWRlckZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gIHByaXZhdGUgX2VsZW1lbnRSYW5nZUlucHV0SWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfZWxlbWVudFJhbmdlT3V0cHV0SWQ6IHN0cmluZztcbiAgcHJpdmF0ZSAkZmlsdGVyRWxtOiBhbnk7XG4gIGdyaWQ6IGFueTtcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcbiAgY29sdW1uRGVmOiBDb2x1bW47XG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcblxuICAvKiogR2V0dGVyIGZvciB0aGUgRmlsdGVyIEdlbmVyaWMgUGFyYW1zICovXG4gIHByaXZhdGUgZ2V0IGZpbHRlclBhcmFtcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLnBhcmFtcyB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBgZmlsdGVyYCBwcm9wZXJ0aWVzICovXG4gIHByaXZhdGUgZ2V0IGZpbHRlclByb3BlcnRpZXMoKTogQ29sdW1uRmlsdGVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyO1xuICB9XG5cbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IpIHx8IE9wZXJhdG9yVHlwZS5lcXVhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcbiAgICovXG4gIGluaXQoYXJnczogRmlsdGVyQXJndW1lbnRzKSB7XG4gICAgaWYgKCFhcmdzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tBbmd1bGFyLVNsaWNrR3JpZF0gQSBmaWx0ZXIgbXVzdCBhbHdheXMgaGF2ZSBhbiBcImluaXQoKVwiIHdpdGggdmFsaWQgYXJndW1lbnRzLicpO1xuICAgIH1cbiAgICB0aGlzLmdyaWQgPSBhcmdzLmdyaWQ7XG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XG4gICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcbiAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcblxuICAgIC8vIGRlZmluZSB0aGUgaW5wdXQgJiBzbGlkZXIgbnVtYmVyIElEc1xuICAgIHRoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWQgPSBgcmFuZ2VJbnB1dF8ke3RoaXMuY29sdW1uRGVmLmZpZWxkfWA7XG4gICAgdGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQgPSBgcmFuZ2VPdXRwdXRfJHt0aGlzLmNvbHVtbkRlZi5maWVsZH1gO1xuXG4gICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxuICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcblxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIEhUTUwgc3RyaW5nIHRlbXBsYXRlXG4gICAgY29uc3QgZmlsdGVyVGVtcGxhdGUgPSB0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCk7XG5cbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcbiAgICB0aGlzLiRmaWx0ZXJFbG0gPSB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGUsIHNlYXJjaFRlcm0pO1xuXG4gICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGNoYW5nZSBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xuICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXG4gICAgdGhpcy4kZmlsdGVyRWxtLmNoYW5nZSgoZTogYW55KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgfHwgJyc7XG4gICAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCB9KTtcbiAgICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTsgLy8gcmVzZXQgZmxhZyBmb3IgbmV4dCB1c2VcbiAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IFt2YWx1ZV0gfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpZiB1c2VyIGNob3NlIHRvIGRpc3BsYXkgdGhlIHNsaWRlciBudW1iZXIgb24gdGhlIHJpZ2h0IHNpZGUsIHRoZW4gdXBkYXRlIGl0IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlc1xuICAgIC8vIHdlIG5lZWQgdG8gdXNlIGJvdGggXCJpbnB1dFwiIGFuZCBcImNoYW5nZVwiIGV2ZW50IHRvIGJlIGFsbCBjcm9zcy1icm93c2VyXG4gICAgaWYgKCF0aGlzLmZpbHRlclBhcmFtcy5oaWRlU2xpZGVyTnVtYmVyKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub24oJ2lucHV0IGNoYW5nZScsIChlOiB7IHRhcmdldDogSFRNTElucHV0RWxlbWVudCB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSB8fCAnJztcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQpLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciB2YWx1ZVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xuICAgICAgY29uc3QgY2xlYXJlZFZhbHVlID0gdGhpcy5maWx0ZXJQYXJhbXMuaGFzT3duUHJvcGVydHkoJ3NsaWRlclN0YXJ0VmFsdWUnKSA/IHRoaXMuZmlsdGVyUGFyYW1zLnNsaWRlclN0YXJ0VmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5jaGlsZHJlbignaW5wdXQnKS52YWwoY2xlYXJlZFZhbHVlKTtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5jaGlsZHJlbignZGl2LmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LWdyb3VwLWFwcGVuZCcpLmNoaWxkcmVuKCkuaHRtbChjbGVhcmVkVmFsdWUpO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLm9mZignY2hhbmdlJykucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcbiAgICovXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm0pIHtcbiAgICBpZiAodmFsdWVzKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKHZhbHVlcyk7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgSFRNTCB0ZW1wbGF0ZSBhcyBhIHN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBidWlsZFRlbXBsYXRlSHRtbFN0cmluZygpIHtcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgY29uc3QgbWluVmFsdWUgPSB0aGlzLmZpbHRlclByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ21pblZhbHVlJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMubWluVmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgnbWF4VmFsdWUnKSA/IHRoaXMuZmlsdGVyUHJvcGVydGllcy5tYXhWYWx1ZSA6IERFRkFVTFRfTUFYX1ZBTFVFO1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuZmlsdGVyUGFyYW1zLmhhc093blByb3BlcnR5KCdzbGlkZXJTdGFydFZhbHVlJykgPyB0aGlzLmZpbHRlclBhcmFtcy5zbGlkZXJTdGFydFZhbHVlIDogbWluVmFsdWU7XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndmFsdWVTdGVwJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMudmFsdWVTdGVwIDogREVGQVVMVF9TVEVQO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyUGFyYW1zLmhpZGVTbGlkZXJOdW1iZXIpIHtcbiAgICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcbiAgICAgICAgICBuYW1lPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkfVwiXG4gICAgICAgICAgZGVmYXVsdFZhbHVlPVwiJHtkZWZhdWx0VmFsdWV9XCIgbWluPVwiJHttaW5WYWx1ZX1cIiBtYXg9XCIke21heFZhbHVlfVwiIHN0ZXA9XCIke3N0ZXB9XCJcbiAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBzbGlkZXItZmlsdGVyLWlucHV0IHJhbmdlXCIgLz5cbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxuICAgICAgICAgIG5hbWU9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU9XCIke2RlZmF1bHRWYWx1ZX1cIiBtaW49XCIke21pblZhbHVlfVwiIG1heD1cIiR7bWF4VmFsdWV9XCIgc3RlcD1cIiR7c3RlcH1cIlxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHNsaWRlci1maWx0ZXItaW5wdXQgcmFuZ2VcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtYXBwZW5kIHNsaWRlci12YWx1ZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZH1cIj4ke2RlZmF1bHRWYWx1ZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIGZpbHRlclRlbXBsYXRlXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGU6IHN0cmluZywgc2VhcmNoVGVybT86IFNlYXJjaFRlcm0pIHtcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4oZmllbGRJZCk7XG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXG4gICAgY29uc3QgJGZpbHRlckVsbSA9ICQoZmlsdGVyVGVtcGxhdGUpO1xuICAgIGNvbnN0IHNlYXJjaFRlcm1JbnB1dCA9IChzZWFyY2hUZXJtIHx8ICcwJykgYXMgc3RyaW5nO1xuXG4gICAgJGZpbHRlckVsbS5jaGlsZHJlbignaW5wdXQnKS52YWwoc2VhcmNoVGVybUlucHV0KTtcbiAgICAkZmlsdGVyRWxtLmNoaWxkcmVuKCdkaXYuaW5wdXQtZ3JvdXAtYWRkb24uaW5wdXQtZ3JvdXAtYXBwZW5kJykuY2hpbGRyZW4oKS5odG1sKHNlYXJjaFRlcm1JbnB1dCk7XG4gICAgJGZpbHRlckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xuICAgICRmaWx0ZXJFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcblxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICBpZiAoc2VhcmNoVGVybSkge1xuICAgICAgJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcbiAgICBpZiAoJGZpbHRlckVsbSAmJiB0eXBlb2YgJGZpbHRlckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgJGZpbHRlckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJGZpbHRlckVsbTtcbiAgfVxufVxuIl19