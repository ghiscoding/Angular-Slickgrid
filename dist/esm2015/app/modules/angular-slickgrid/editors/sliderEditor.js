/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from '../constants';
/** @type {?} */
const DEFAULT_MIN_VALUE = 0;
/** @type {?} */
const DEFAULT_MAX_VALUE = 100;
/** @type {?} */
const DEFAULT_STEP = 1;
export class SliderEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.init();
    }
    /**
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor || {};
    }
    /**
     * Getter for the Editor Generic Params
     * @private
     * @return {?}
     */
    get editorParams() {
        return this.columnEditor.params || {};
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    init() {
        /** @type {?} */
        const container = this.args && this.args.container;
        // define the input & slider number IDs
        /** @type {?} */
        const itemId = this.args && this.args.item && this.args.item.id;
        this._elementRangeInputId = `rangeInput_${this.columnDef.field}_${itemId}`;
        this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}_${itemId}`;
        // create HTML string template
        /** @type {?} */
        const editorTemplate = this.buildTemplateHtmlString();
        this.$editorElm = $(editorTemplate);
        this.$input = this.$editorElm.children('input');
        this.$sliderNumber = this.$editorElm.children('div.input-group-addon.input-group-append').children();
        // watch on change event
        this.$editorElm
            .appendTo(container)
            .on('mouseup', () => this.save());
        // if user chose to display the slider number on the right side, then update it every time it changes
        // we need to use both "input" and "change" event to be all cross-browser
        if (!this.editorParams.hideSliderNumber) {
            this.$editorElm.on('input change', (e) => {
                /** @type {?} */
                const value = e && e.target && e.target.value || '';
                if (value) {
                    document.getElementById(this._elementRangeOutputId).innerHTML = e.target.value;
                }
            });
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$editorElm.remove();
    }
    /**
     * @return {?}
     */
    focus() {
        this.$editorElm.focus();
    }
    /**
     * @return {?}
     */
    save() {
        if (this.args.grid.getOptions().autoCommitEdit) {
            this.args.grid.getEditorLock().commitCurrentEdit();
        }
        else {
            this.args.commitChanges();
        }
    }
    /**
     * @return {?}
     */
    cancel() {
        this.$input.val(this.defaultValue);
        this.args.cancelChanges();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        // this.$input.val(this.defaultValue = item[this.columnDef.field]);
        this.defaultValue = item[this.columnDef.field];
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$sliderNumber.html(this.defaultValue);
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return parseInt((/** @type {?} */ (this.$input.val())), 10) || 0;
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.columnDef.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        /** @type {?} */
        const elmValue = this.$input.val();
        return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    validate() {
        /** @type {?} */
        const elmValue = this.$input.val();
        /** @type {?} */
        const minValue = this.columnEditor.minValue;
        /** @type {?} */
        const maxValue = this.columnEditor.maxValue;
        /** @type {?} */
        const errorMsg = this.columnEditor.errorMessage;
        /** @type {?} */
        const mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue
        };
        if (this.validator) {
            /** @type {?} */
            const validationResults = this.validator(elmValue, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        else if (minValue !== undefined && (elmValue < minValue || elmValue > maxValue)) {
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (matched) => {
                    return mapValidation[matched];
                })
            };
        }
        return {
            valid: true,
            msg: null
        };
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
        const minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        const maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE;
        /** @type {?} */
        const defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
        /** @type {?} */
        const step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP;
        /** @type {?} */
        const itemId = this.args && this.args.item && this.args.item.id;
        if (this.editorParams.hideSliderNumber) {
            return `
      <div class="slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range" />
      </div>`;
        }
        return `
      <div class="input-group slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range" />
        <div class="input-group-addon input-group-append slider-value"><span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span></div>
      </div>`;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    SliderEditor.prototype._elementRangeInputId;
    /**
     * @type {?}
     * @private
     */
    SliderEditor.prototype._elementRangeOutputId;
    /** @type {?} */
    SliderEditor.prototype.$editorElm;
    /** @type {?} */
    SliderEditor.prototype.$input;
    /** @type {?} */
    SliderEditor.prototype.$sliderNumber;
    /** @type {?} */
    SliderEditor.prototype.defaultValue;
    /**
     * @type {?}
     * @private
     */
    SliderEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyRWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9lZGl0b3JzL3NsaWRlckVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7TUFNbkMsaUJBQWlCLEdBQUcsQ0FBQzs7TUFDckIsaUJBQWlCLEdBQUcsR0FBRzs7TUFDdkIsWUFBWSxHQUFHLENBQUM7QUFFdEIsTUFBTSxPQUFPLFlBQVk7Ozs7SUFRdkIsWUFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO0lBQ3JFLENBQUM7Ozs7OztJQUdELElBQVksWUFBWTtRQUN0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDakUsQ0FBQzs7OztJQUVELElBQUk7O2NBQ0ksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTOzs7Y0FHNUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUks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SSxDQUFDLEVBQUU7UUFFL0QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFO1lBQ3RDLE9BQU87O2tDQUVxQixJQUFJLENBQUMsb0JBQW9CO2tCQUN6QyxJQUFJLENBQUMsb0JBQW9COzBCQUNqQixZQUFZLFVBQVUsUUFBUSxVQUFVLFFBQVEsV0FBVyxJQUFJOzJEQUM5QixPQUFPO2FBQ3JELENBQUM7U0FDVDtRQUVELE9BQU87O2tDQUV1QixJQUFJLENBQUMsb0JBQW9CO2tCQUN6QyxJQUFJLENBQUMsb0JBQW9COzBCQUNqQixZQUFZLFVBQVUsUUFBUSxVQUFVLFFBQVEsV0FBVyxJQUFJOzJEQUM5QixPQUFPOzRHQUMwQyxJQUFJLENBQUMscUJBQXFCLEtBQUssWUFBWTthQUMxSSxDQUFDO0lBQ1osQ0FBQztDQUNGOzs7Ozs7SUExS0MsNENBQXFDOzs7OztJQUNyQyw2Q0FBc0M7O0lBQ3RDLGtDQUFnQjs7SUFDaEIsOEJBQVk7O0lBQ1oscUNBQW1COztJQUNuQixvQ0FBa0I7Ozs7O0lBRU4sNEJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IENvbHVtbiwgRWRpdG9yLCBFZGl0b3JWYWxpZGF0b3IsIEVkaXRvclZhbGlkYXRvck91dHB1dCB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5jb25zdCBERUZBVUxUX01JTl9WQUxVRSA9IDA7XG5jb25zdCBERUZBVUxUX01BWF9WQUxVRSA9IDEwMDtcbmNvbnN0IERFRkFVTFRfU1RFUCA9IDE7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZXJFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xuICBwcml2YXRlIF9lbGVtZW50UmFuZ2VJbnB1dElkOiBzdHJpbmc7XG4gIHByaXZhdGUgX2VsZW1lbnRSYW5nZU91dHB1dElkOiBzdHJpbmc7XG4gICRlZGl0b3JFbG06IGFueTtcbiAgJGlucHV0OiBhbnk7XG4gICRzbGlkZXJOdW1iZXI6IGFueTtcbiAgZGVmYXVsdFZhbHVlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcmdzOiBhbnkpIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKiBHZXQgQ29sdW1uIERlZmluaXRpb24gb2JqZWN0ICovXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gfHwge307XG4gIH1cblxuICAvKiogR2V0IENvbHVtbiBFZGl0b3Igb2JqZWN0ICovXG4gIGdldCBjb2x1bW5FZGl0b3IoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgRWRpdG9yIEdlbmVyaWMgUGFyYW1zICovXG4gIHByaXZhdGUgZ2V0IGVkaXRvclBhcmFtcygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci5wYXJhbXMgfHwge307XG4gIH1cblxuICAvKiogR2V0IHRoZSBWYWxpZGF0b3IgZnVuY3Rpb24sIGNhbiBiZSBwYXNzZWQgaW4gRWRpdG9yIHByb3BlcnR5IG9yIENvbHVtbiBEZWZpbml0aW9uICovXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IudmFsaWRhdG9yIHx8IHRoaXMuY29sdW1uRGVmLnZhbGlkYXRvcjtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb250YWluZXI7XG5cbiAgICAvLyBkZWZpbmUgdGhlIGlucHV0ICYgc2xpZGVyIG51bWJlciBJRHNcbiAgICBjb25zdCBpdGVtSWQgPSB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLml0ZW0gJiYgdGhpcy5hcmdzLml0ZW0uaWQ7XG4gICAgdGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZCA9IGByYW5nZUlucHV0XyR7dGhpcy5jb2x1bW5EZWYuZmllbGR9XyR7aXRlbUlkfWA7XG4gICAgdGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQgPSBgcmFuZ2VPdXRwdXRfJHt0aGlzLmNvbHVtbkRlZi5maWVsZH1fJHtpdGVtSWR9YDtcblxuICAgIC8vIGNyZWF0ZSBIVE1MIHN0cmluZyB0ZW1wbGF0ZVxuICAgIGNvbnN0IGVkaXRvclRlbXBsYXRlID0gdGhpcy5idWlsZFRlbXBsYXRlSHRtbFN0cmluZygpO1xuICAgIHRoaXMuJGVkaXRvckVsbSA9ICQoZWRpdG9yVGVtcGxhdGUpO1xuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZWRpdG9yRWxtLmNoaWxkcmVuKCdpbnB1dCcpO1xuICAgIHRoaXMuJHNsaWRlck51bWJlciA9IHRoaXMuJGVkaXRvckVsbS5jaGlsZHJlbignZGl2LmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LWdyb3VwLWFwcGVuZCcpLmNoaWxkcmVuKCk7XG5cbiAgICAvLyB3YXRjaCBvbiBjaGFuZ2UgZXZlbnRcbiAgICB0aGlzLiRlZGl0b3JFbG1cbiAgICAgIC5hcHBlbmRUbyhjb250YWluZXIpXG4gICAgICAub24oJ21vdXNldXAnLCAoKSA9PiB0aGlzLnNhdmUoKSk7XG5cbiAgICAvLyBpZiB1c2VyIGNob3NlIHRvIGRpc3BsYXkgdGhlIHNsaWRlciBudW1iZXIgb24gdGhlIHJpZ2h0IHNpZGUsIHRoZW4gdXBkYXRlIGl0IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlc1xuICAgIC8vIHdlIG5lZWQgdG8gdXNlIGJvdGggXCJpbnB1dFwiIGFuZCBcImNoYW5nZVwiIGV2ZW50IHRvIGJlIGFsbCBjcm9zcy1icm93c2VyXG4gICAgaWYgKCF0aGlzLmVkaXRvclBhcmFtcy5oaWRlU2xpZGVyTnVtYmVyKSB7XG4gICAgICB0aGlzLiRlZGl0b3JFbG0ub24oJ2lucHV0IGNoYW5nZScsIChlOiB7IHRhcmdldDogSFRNTElucHV0RWxlbWVudCB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSB8fCAnJztcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWQpLmlubmVySFRNTCA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuJGVkaXRvckVsbS5yZW1vdmUoKTtcbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuJGVkaXRvckVsbS5mb2N1cygpO1xuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBpZiAodGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0KSB7XG4gICAgICB0aGlzLmFyZ3MuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBjYW5jZWwoKSB7XG4gICAgdGhpcy4kaW5wdXQudmFsKHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICB0aGlzLmFyZ3MuY2FuY2VsQ2hhbmdlcygpO1xuICB9XG5cbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xuICAgIC8vIHRoaXMuJGlucHV0LnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSA9IGl0ZW1bdGhpcy5jb2x1bW5EZWYuZmllbGRdKTtcbiAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IGl0ZW1bdGhpcy5jb2x1bW5EZWYuZmllbGRdO1xuICAgIHRoaXMuJGlucHV0LnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSk7XG4gICAgdGhpcy4kaW5wdXRbMF0uZGVmYXVsdFZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWU7XG4gICAgdGhpcy4kc2xpZGVyTnVtYmVyLmh0bWwodGhpcy5kZWZhdWx0VmFsdWUpO1xuICB9XG5cbiAgc2VyaWFsaXplVmFsdWUoKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuJGlucHV0LnZhbCgpIGFzIHN0cmluZywgMTApIHx8IDA7XG4gIH1cblxuICBhcHBseVZhbHVlKGl0ZW06IGFueSwgc3RhdGU6IGFueSkge1xuICAgIGl0ZW1bdGhpcy5jb2x1bW5EZWYuZmllbGRdID0gc3RhdGU7XG4gIH1cblxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcbiAgICBjb25zdCBlbG1WYWx1ZSA9IHRoaXMuJGlucHV0LnZhbCgpO1xuICAgIHJldHVybiAoIShlbG1WYWx1ZSA9PT0gJycgJiYgdGhpcy5kZWZhdWx0VmFsdWUgPT09IG51bGwpKSAmJiAoZWxtVmFsdWUgIT09IHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIHZhbGlkYXRlKCk6IEVkaXRvclZhbGlkYXRvck91dHB1dCB7XG4gICAgY29uc3QgZWxtVmFsdWUgPSB0aGlzLiRpbnB1dC52YWwoKTtcbiAgICBjb25zdCBtaW5WYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLm1pblZhbHVlO1xuICAgIGNvbnN0IG1heFZhbHVlID0gdGhpcy5jb2x1bW5FZGl0b3IubWF4VmFsdWU7XG4gICAgY29uc3QgZXJyb3JNc2cgPSB0aGlzLmNvbHVtbkVkaXRvci5lcnJvck1lc3NhZ2U7XG4gICAgY29uc3QgbWFwVmFsaWRhdGlvbiA9IHtcbiAgICAgICd7e21pblZhbHVlfX0nOiBtaW5WYWx1ZSxcbiAgICAgICd7e21heFZhbHVlfX0nOiBtYXhWYWx1ZVxuICAgIH07XG5cbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHRzID0gdGhpcy52YWxpZGF0b3IoZWxtVmFsdWUsIHRoaXMuYXJncyk7XG4gICAgICBpZiAoIXZhbGlkYXRpb25SZXN1bHRzLnZhbGlkKSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uUmVzdWx0cztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1pblZhbHVlICE9PSB1bmRlZmluZWQgJiYgKGVsbVZhbHVlIDwgbWluVmFsdWUgfHwgZWxtVmFsdWUgPiBtYXhWYWx1ZSkpIHtcbiAgICAgIC8vIHdoZW4gZGVjaW1hbCB2YWx1ZSBpcyBiaWdnZXIgdGhhbiAwLCB3ZSBvbmx5IGFjY2VwdCB0aGUgZGVjaW1hbCB2YWx1ZXMgYXMgdGhhdCB2YWx1ZSBzZXRcbiAgICAgIC8vIGZvciBleGFtcGxlIGlmIHdlIHNldCBkZWNpbWFsUGxhY2VzIHRvIDIsIHdlIHdpbGwgb25seSBhY2NlcHQgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDIgZGVjaW1hbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgbXNnOiBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9FRElUT1JfTlVNQkVSX0JFVFdFRU4ucmVwbGFjZSgve3ttaW5WYWx1ZX19fHt7bWF4VmFsdWV9fS9naSwgKG1hdGNoZWQpID0+IHtcbiAgICAgICAgICByZXR1cm4gbWFwVmFsaWRhdGlvblttYXRjaGVkXTtcbiAgICAgICAgfSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgbXNnOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIC8vXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIEhUTUwgdGVtcGxhdGUgYXMgYSBzdHJpbmdcbiAgICovXG4gIHByaXZhdGUgYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0IG1pblZhbHVlID0gdGhpcy5jb2x1bW5FZGl0b3IuaGFzT3duUHJvcGVydHkoJ21pblZhbHVlJykgPyB0aGlzLmNvbHVtbkVkaXRvci5taW5WYWx1ZSA6IERFRkFVTFRfTUlOX1ZBTFVFO1xuICAgIGNvbnN0IG1heFZhbHVlID0gdGhpcy5jb2x1bW5FZGl0b3IuaGFzT3duUHJvcGVydHkoJ21heFZhbHVlJykgPyB0aGlzLmNvbHVtbkVkaXRvci5tYXhWYWx1ZSA6IERFRkFVTFRfTUFYX1ZBTFVFO1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuZWRpdG9yUGFyYW1zLmhhc093blByb3BlcnR5KCdzbGlkZXJTdGFydFZhbHVlJykgPyB0aGlzLmVkaXRvclBhcmFtcy5zbGlkZXJTdGFydFZhbHVlIDogbWluVmFsdWU7XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMuY29sdW1uRWRpdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZVN0ZXAnKSA/IHRoaXMuY29sdW1uRWRpdG9yLnZhbHVlU3RlcCA6IERFRkFVTFRfU1RFUDtcbiAgICBjb25zdCBpdGVtSWQgPSB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLml0ZW0gJiYgdGhpcy5hcmdzLml0ZW0uaWQ7XG5cbiAgICBpZiAodGhpcy5lZGl0b3JQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xuICAgICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzbGlkZXItZWRpdG9yXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxuICAgICAgICAgIG5hbWU9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU9XCIke2RlZmF1bHRWYWx1ZX1cIiBtaW49XCIke21pblZhbHVlfVwiIG1heD1cIiR7bWF4VmFsdWV9XCIgc3RlcD1cIiR7c3RlcH1cIlxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHNsaWRlci1lZGl0b3ItaW5wdXQgZWRpdG9yLSR7ZmllbGRJZH0gcmFuZ2VcIiAvPlxuICAgICAgPC9kaXY+YDtcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIHNsaWRlci1lZGl0b3JcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkfVwiXG4gICAgICAgICAgbmFtZT1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIiR7ZGVmYXVsdFZhbHVlfVwiIG1pbj1cIiR7bWluVmFsdWV9XCIgbWF4PVwiJHttYXhWYWx1ZX1cIiBzdGVwPVwiJHtzdGVwfVwiXG4gICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgc2xpZGVyLWVkaXRvci1pbnB1dCBlZGl0b3ItJHtmaWVsZElkfSByYW5nZVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1hcHBlbmQgc2xpZGVyLXZhbHVlXCI+PHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZU91dHB1dElkfVwiPiR7ZGVmYXVsdFZhbHVlfTwvc3Bhbj48L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gIH1cbn1cbiJdfQ==