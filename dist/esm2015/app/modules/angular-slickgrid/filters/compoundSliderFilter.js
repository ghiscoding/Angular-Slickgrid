/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType } from './../models/index';
/** @type {?} */
const DEFAULT_MIN_VALUE = 0;
/** @type {?} */
const DEFAULT_MAX_VALUE = 100;
/** @type {?} */
const DEFAULT_STEP = 1;
export class CompoundSliderFilter {
    constructor() {
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
            // define the input & slider number IDs
            this._elementRangeInputId = `rangeInput_${this.columnDef.field}`;
            this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}`;
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            /** @type {?} */
            const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.change((e) => {
                this.onTriggerEvent(e);
            });
            this.$selectOperatorElm.change((e) => {
                this.onTriggerEvent(e);
            });
            // if user chose to display the slider number on the right side, then update it every time it changes
            // we need to use both "input" and "change" event to be all cross-browser
            if (!this.filterParams.hideSliderNumber) {
                this.$filterInputElm.on('input change', (e) => {
                    /** @type {?} */
                    const value = e && e.target && e.target.value || '';
                    if (value) {
                        document.getElementById(this._elementRangeOutputId).innerHTML = value;
                    }
                });
            }
        }
    }
    /**
     * Clear the filter value
     * @return {?}
     */
    clear() {
        if (this.$filterElm && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            /** @type {?} */
            const clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val(clearedValue);
            if (!this.filterParams.hideSliderNumber) {
                this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(clearedValue);
            }
            this.onTriggerEvent(undefined);
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
        if (values && Array.isArray(values)) {
            this.$filterInputElm.val(values[0]);
            this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(values[0]);
        }
    }
    //
    // private functions
    // ------------------
    /**
     * Build HTML Template for the input range (slider)
     * @private
     * @return {?}
     */
    buildTemplateHtmlString() {
        /** @type {?} */
        const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        const maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
        /** @type {?} */
        const defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        /** @type {?} */
        const step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
        return `<input type="range" id="${this._elementRangeInputId}"
              name="${this._elementRangeInputId}"
              defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
              class="form-control slider-filter-input range compound-slider" />`;
    }
    /**
     * Build HTML Template for the text (number) that is shown appended to the slider
     * @private
     * @return {?}
     */
    buildTemplateSliderTextHtmlString() {
        /** @type {?} */
        const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        const defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        return `<div class="input-group-addon input-group-append slider-value"><span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span></div>`;
    }
    /**
     * Build HTML Template select dropdown (operator)
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
     * Get the available operator option values
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
        const searchTermInput = (/** @type {?} */ ((searchTerm || '0')));
        /** @type {?} */
        const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildTemplateHtmlString());
        /** @type {?} */
        const $filterContainerElm = $(`<div class="form-group search-filter filter-${fieldId}"></div>`);
        this.$containerInputGroupElm = $(`<div class="input-group search-filter filter-${fieldId}"></div>`);
        /** @type {?} */
        const $operatorInputGroupAddon = $(`<span class="input-group-addon input-group-prepend operator"></span>`);
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
            const $sliderTextInputAppendAddon = $(this.buildTemplateSliderTextHtmlString());
            $sliderTextInputAppendAddon.children().html(searchTermInput);
            this.$containerInputGroupElm.append($sliderTextInputAppendAddon);
        }
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append(this.$containerInputGroupElm);
        $filterContainerElm.attr('id', `filter-${fieldId}`);
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
            (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmRTbGlkZXJGaWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlcnMvY29tcG91bmRTbGlkZXJGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFRTCxZQUFZLEVBRWIsTUFBTSxtQkFBbUIsQ0FBQzs7TUFLckIsaUJBQWlCLEdBQUcsQ0FBQzs7TUFDckIsaUJBQWlCLEdBQUcsR0FBRzs7TUFDdkIsWUFBWSxHQUFHLENBQUM7QUFFdEIsTUFBTSxPQUFPLG9CQUFvQjtJQWMvQjtRQWJRLDBCQUFxQixHQUFHLEtBQUssQ0FBQztJQWF0QixDQUFDOzs7Ozs7SUFHakIsSUFBWSxXQUFXO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzRSxDQUFDOzs7Ozs7SUFHRCxJQUFZLFlBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDdkYsQ0FBQzs7Ozs7O0lBR0QsSUFBWSxnQkFBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsRUFBaUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxZQUFZ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SUFDSCxDQUFDO0NBQ0Y7Ozs7OztJQTVPQyxxREFBc0M7Ozs7O0lBQ3RDLG9EQUFxQzs7Ozs7SUFDckMscURBQXNDOzs7OztJQUN0Qyx5Q0FBaUQ7Ozs7O0lBQ2pELHVEQUFxQzs7Ozs7SUFDckMsMENBQXdCOzs7OztJQUN4QiwrQ0FBNkI7Ozs7O0lBQzdCLGtEQUFnQzs7SUFDaEMsb0NBQVU7O0lBQ1YsMkNBQTBCOztJQUMxQix5Q0FBa0I7O0lBQ2xCLHdDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbHVtbixcbiAgQ29sdW1uRmlsdGVyLFxuICBGaWx0ZXIsXG4gIEZpbHRlckFyZ3VtZW50cyxcbiAgRmlsdGVyQ2FsbGJhY2ssXG4gIEdyaWRPcHRpb24sXG4gIE9wZXJhdG9yU3RyaW5nLFxuICBPcGVyYXRvclR5cGUsXG4gIFNlYXJjaFRlcm1cbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbmNvbnN0IERFRkFVTFRfTUlOX1ZBTFVFID0gMDtcbmNvbnN0IERFRkFVTFRfTUFYX1ZBTFVFID0gMTAwO1xuY29uc3QgREVGQVVMVF9TVEVQID0gMTtcblxuZXhwb3J0IGNsYXNzIENvbXBvdW5kU2xpZGVyRmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcbiAgcHJpdmF0ZSBfY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZWxlbWVudFJhbmdlSW5wdXRJZDogc3RyaW5nO1xuICBwcml2YXRlIF9lbGVtZW50UmFuZ2VPdXRwdXRJZDogc3RyaW5nO1xuICBwcml2YXRlIF9vcGVyYXRvcjogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmc7XG4gIHByaXZhdGUgJGNvbnRhaW5lcklucHV0R3JvdXBFbG06IGFueTtcbiAgcHJpdmF0ZSAkZmlsdGVyRWxtOiBhbnk7XG4gIHByaXZhdGUgJGZpbHRlcklucHV0RWxtOiBhbnk7XG4gIHByaXZhdGUgJHNlbGVjdE9wZXJhdG9yRWxtOiBhbnk7XG4gIGdyaWQ6IGFueTtcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcbiAgY29sdW1uRGVmOiBDb2x1bW47XG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IGdyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBGaWx0ZXIgR2VuZXJpYyBQYXJhbXMgKi9cbiAgcHJpdmF0ZSBnZXQgZmlsdGVyUGFyYW1zKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIucGFyYW1zIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIGBmaWx0ZXJgIHByb3BlcnRpZXMgKi9cbiAgcHJpdmF0ZSBnZXQgZmlsdGVyUHJvcGVydGllcygpOiBDb2x1bW5GaWx0ZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXI7XG4gIH1cblxuICBzZXQgb3BlcmF0b3Iob3A6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nKSB7XG4gICAgdGhpcy5fb3BlcmF0b3IgPSBvcDtcbiAgfVxuXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX29wZXJhdG9yIHx8IE9wZXJhdG9yVHlwZS5lbXB0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcbiAgICovXG4gIGluaXQoYXJnczogRmlsdGVyQXJndW1lbnRzKSB7XG4gICAgaWYgKGFyZ3MpIHtcbiAgICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcbiAgICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xuICAgICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcbiAgICAgIHRoaXMub3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yIHx8ICcnO1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XG5cbiAgICAgIC8vIGRlZmluZSB0aGUgaW5wdXQgJiBzbGlkZXIgbnVtYmVyIElEc1xuICAgICAgdGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZCA9IGByYW5nZUlucHV0XyR7dGhpcy5jb2x1bW5EZWYuZmllbGR9YDtcbiAgICAgIHRoaXMuX2VsZW1lbnRSYW5nZU91dHB1dElkID0gYHJhbmdlT3V0cHV0XyR7dGhpcy5jb2x1bW5EZWYuZmllbGR9YDtcblxuICAgICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxuICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xuXG4gICAgICAvLyBzdGVwIDEsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciB3aGljaCBjb250YWluIHRoZSBjb21wb3VuZCBPcGVyYXRvcitJbnB1dFxuICAgICAgLy8gYW5kIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcbiAgICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtKTtcblxuICAgICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXG4gICAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgICAgdGhpcy4kZmlsdGVySW5wdXRFbG0uY2hhbmdlKChlOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0uY2hhbmdlKChlOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBpZiB1c2VyIGNob3NlIHRvIGRpc3BsYXkgdGhlIHNsaWRlciBudW1iZXIgb24gdGhlIHJpZ2h0IHNpZGUsIHRoZW4gdXBkYXRlIGl0IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlc1xuICAgICAgLy8gd2UgbmVlZCB0byB1c2UgYm90aCBcImlucHV0XCIgYW5kIFwiY2hhbmdlXCIgZXZlbnQgdG8gYmUgYWxsIGNyb3NzLWJyb3dzZXJcbiAgICAgIGlmICghdGhpcy5maWx0ZXJQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xuICAgICAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5vbignaW5wdXQgY2hhbmdlJywgKGU6IHsgdGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50IH0pID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgfHwgJyc7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZCkuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciB2YWx1ZVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSkge1xuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xuICAgICAgY29uc3QgY2xlYXJlZFZhbHVlID0gdGhpcy5maWx0ZXJQYXJhbXMuaGFzT3duUHJvcGVydHkoJ3NsaWRlclN0YXJ0VmFsdWUnKSA/IHRoaXMuZmlsdGVyUGFyYW1zLnNsaWRlclN0YXJ0VmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCgwKTtcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbChjbGVhcmVkVmFsdWUpO1xuICAgICAgaWYgKCF0aGlzLmZpbHRlclBhcmFtcy5oaWRlU2xpZGVyTnVtYmVyKSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uY2hpbGRyZW4oJ2Rpdi5pbnB1dC1ncm91cC1hZGRvbi5pbnB1dC1ncm91cC1hcHBlbmQnKS5jaGlsZHJlbigpLmxhc3QoKS5odG1sKGNsZWFyZWRWYWx1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCdjaGFuZ2UnKS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbHVlKHMpIG9uIHRoZSBET00gZWxlbWVudFxuICAgKi9cbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybVtdKSB7XG4gICAgaWYgKHZhbHVlcyAmJiBBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbCh2YWx1ZXNbMF0pO1xuICAgICAgdGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbS5jaGlsZHJlbignZGl2LmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LWdyb3VwLWFwcGVuZCcpLmNoaWxkcmVuKCkubGFzdCgpLmh0bWwodmFsdWVzWzBdKTtcbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKiogQnVpbGQgSFRNTCBUZW1wbGF0ZSBmb3IgdGhlIGlucHV0IHJhbmdlIChzbGlkZXIpICovXG4gIHByaXZhdGUgYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKSB7XG4gICAgY29uc3QgbWluVmFsdWUgPSB0aGlzLmZpbHRlclByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ21pblZhbHVlJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMubWluVmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgnbWF4VmFsdWUnKSA/IHRoaXMuZmlsdGVyUHJvcGVydGllcy5tYXhWYWx1ZSA6IERFRkFVTFRfTUFYX1ZBTFVFO1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuZmlsdGVyUGFyYW1zLmhhc093blByb3BlcnR5KCdzbGlkZXJTdGFydFZhbHVlJykgPyB0aGlzLmZpbHRlclBhcmFtcy5zbGlkZXJTdGFydFZhbHVlIDogbWluVmFsdWU7XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndmFsdWVTdGVwJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMudmFsdWVTdGVwIDogREVGQVVMVF9TVEVQO1xuXG4gICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcbiAgICAgICAgICAgICAgbmFtZT1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9XCIke2RlZmF1bHRWYWx1ZX1cIiBtaW49XCIke21pblZhbHVlfVwiIG1heD1cIiR7bWF4VmFsdWV9XCIgc3RlcD1cIiR7c3RlcH1cIlxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBzbGlkZXItZmlsdGVyLWlucHV0IHJhbmdlIGNvbXBvdW5kLXNsaWRlclwiIC8+YDtcbiAgfVxuXG4gIC8qKiBCdWlsZCBIVE1MIFRlbXBsYXRlIGZvciB0aGUgdGV4dCAobnVtYmVyKSB0aGF0IGlzIHNob3duIGFwcGVuZGVkIHRvIHRoZSBzbGlkZXIgKi9cbiAgcHJpdmF0ZSBidWlsZFRlbXBsYXRlU2xpZGVyVGV4dEh0bWxTdHJpbmcoKSB7XG4gICAgY29uc3QgbWluVmFsdWUgPSB0aGlzLmZpbHRlclByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ21pblZhbHVlJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMubWluVmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmZpbHRlclBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnc2xpZGVyU3RhcnRWYWx1ZScpID8gdGhpcy5maWx0ZXJQYXJhbXMuc2xpZGVyU3RhcnRWYWx1ZSA6IG1pblZhbHVlO1xuXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtYXBwZW5kIHNsaWRlci12YWx1ZVwiPjxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZH1cIj4ke2RlZmF1bHRWYWx1ZX08L3NwYW4+PC9kaXY+YDtcbiAgfVxuXG4gIC8qKiBCdWlsZCBIVE1MIFRlbXBsYXRlIHNlbGVjdCBkcm9wZG93biAob3BlcmF0b3IpICovXG4gIHByaXZhdGUgYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSB7XG4gICAgY29uc3Qgb3B0aW9uVmFsdWVzID0gdGhpcy5nZXRPcHRpb25WYWx1ZXMoKTtcbiAgICBsZXQgb3B0aW9uVmFsdWVTdHJpbmcgPSAnJztcbiAgICBvcHRpb25WYWx1ZXMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBvcHRpb25WYWx1ZVN0cmluZyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uLm9wZXJhdG9yfVwiIHRpdGxlPVwiJHtvcHRpb24uZGVzY3JpcHRpb259XCI+JHtvcHRpb24ub3BlcmF0b3J9PC9vcHRpb24+YDtcbiAgICB9KTtcblxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiPiR7b3B0aW9uVmFsdWVTdHJpbmd9PC9zZWxlY3Q+YDtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIGF2YWlsYWJsZSBvcGVyYXRvciBvcHRpb24gdmFsdWVzICovXG4gIHByaXZhdGUgZ2V0T3B0aW9uVmFsdWVzKCk6IHsgb3BlcmF0b3I6IE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nIH1bXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHsgb3BlcmF0b3I6ICcnIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcbiAgICAgIHsgb3BlcmF0b3I6ICc9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICB7IG9wZXJhdG9yOiAnPCcgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgeyBvcGVyYXRvcjogJzw9JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICB7IG9wZXJhdG9yOiAnPicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgeyBvcGVyYXRvcjogJz49JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICB7IG9wZXJhdG9yOiAnPD4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfVxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBET00gZWxlbWVudFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0IHNlYXJjaFRlcm1JbnB1dCA9IChzZWFyY2hUZXJtIHx8ICcwJykgYXMgc3RyaW5nO1xuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKHRoaXMuY29sdW1uRGVmLmlkKTtcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XG5cbiAgICAvLyBjcmVhdGUgdGhlIERPTSBTZWxlY3QgZHJvcGRvd24gZm9yIHRoZSBPcGVyYXRvclxuICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtID0gJCh0aGlzLmJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkpO1xuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtID0gJCh0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCkpO1xuICAgIGNvbnN0ICRmaWx0ZXJDb250YWluZXJFbG0gPSAkKGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+PC9kaXY+YCk7XG4gICAgdGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbSA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+PC9kaXY+YCk7XG4gICAgY29uc3QgJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uID0gJChgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+PC9zcGFuPmApO1xuXG4gICAgLyogdGhlIERPTSBlbGVtZW50IGZpbmFsIHN0cnVjdHVyZSB3aWxsIGJlXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLXByZXBlbmQgb3BlcmF0b3JcIj5cbiAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kXCIgaWQ9XCJyYW5nZU91cHV0X3BlcmNlbnRDb21wbGV0ZVwiPjxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPjA8L3NwYW4+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAqL1xuICAgICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbi5hcHBlbmQodGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pO1xuICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uYXBwZW5kKCRvcGVyYXRvcklucHV0R3JvdXBBZGRvbik7XG4gICAgdGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbS5hcHBlbmQodGhpcy4kZmlsdGVySW5wdXRFbG0pO1xuICAgIGlmICghdGhpcy5maWx0ZXJQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xuICAgICAgY29uc3QgJHNsaWRlclRleHRJbnB1dEFwcGVuZEFkZG9uID0gJCh0aGlzLmJ1aWxkVGVtcGxhdGVTbGlkZXJUZXh0SHRtbFN0cmluZygpKTtcbiAgICAgICRzbGlkZXJUZXh0SW5wdXRBcHBlbmRBZGRvbi5jaGlsZHJlbigpLmh0bWwoc2VhcmNoVGVybUlucHV0KTtcbiAgICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uYXBwZW5kKCRzbGlkZXJUZXh0SW5wdXRBcHBlbmRBZGRvbik7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmQodGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbSk7XG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xuXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKHNlYXJjaFRlcm1JbnB1dCk7XG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcblxuICAgIGlmICh0aGlzLm9wZXJhdG9yKSB7XG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS52YWwodGhpcy5vcGVyYXRvcik7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgIGlmIChzZWFyY2hUZXJtKSB7XG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xuICAgIGlmICgkZmlsdGVyQ29udGFpbmVyRWxtICYmIHR5cGVvZiAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xuICAgIH1cblxuICAgIHJldHVybiAkZmlsdGVyQ29udGFpbmVyRWxtO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRyaWdnZXJFdmVudChlOiBFdmVudCB8IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCB9KTtcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7IC8vIHJlc2V0IGZsYWcgZm9yIG5leHQgdXNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3BlcmF0b3IgPSB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS50ZXh0KCk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbCgpO1xuICAgICAgKHZhbHVlKSA/IHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIHNlYXJjaFRlcm1zOiAodmFsdWUgPyBbdmFsdWVdIDogbnVsbCksIG9wZXJhdG9yOiBzZWxlY3RlZE9wZXJhdG9yIHx8ICcnIH0pO1xuICAgIH1cbiAgfVxufVxuIl19