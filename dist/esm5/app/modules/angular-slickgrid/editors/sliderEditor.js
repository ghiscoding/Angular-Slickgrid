/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from '../constants';
/** @type {?} */
var DEFAULT_MIN_VALUE = 0;
/** @type {?} */
var DEFAULT_MAX_VALUE = 100;
/** @type {?} */
var DEFAULT_STEP = 1;
var SliderEditor = /** @class */ (function () {
    function SliderEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(SliderEditor.prototype, "columnDef", {
        /** Get Column Definition object */
        get: /**
         * Get Column Definition object
         * @return {?}
         */
        function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderEditor.prototype, "columnEditor", {
        /** Get Column Editor object */
        get: /**
         * Get Column Editor object
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderEditor.prototype, "editorParams", {
        /** Getter for the Editor Generic Params */
        get: /**
         * Getter for the Editor Generic Params
         * @private
         * @return {?}
         */
        function () {
            return this.columnEditor.params || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderEditor.prototype, "validator", {
        /** Get the Validator function, can be passed in Editor property or Column Definition */
        get: /**
         * Get the Validator function, can be passed in Editor property or Column Definition
         * @return {?}
         */
        function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SliderEditor.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var container = this.args && this.args.container;
        // define the input & slider number IDs
        /** @type {?} */
        var itemId = this.args && this.args.item && this.args.item.id;
        this._elementRangeInputId = "rangeInput_" + this.columnDef.field + "_" + itemId;
        this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field + "_" + itemId;
        // create HTML string template
        /** @type {?} */
        var editorTemplate = this.buildTemplateHtmlString();
        this.$editorElm = $(editorTemplate);
        this.$input = this.$editorElm.children('input');
        this.$sliderNumber = this.$editorElm.children('div.input-group-addon.input-group-append').children();
        // watch on change event
        this.$editorElm
            .appendTo(container)
            .on('mouseup', function () { return _this.save(); });
        // if user chose to display the slider number on the right side, then update it every time it changes
        // we need to use both "input" and "change" event to be all cross-browser
        if (!this.editorParams.hideSliderNumber) {
            this.$editorElm.on('input change', function (e) {
                /** @type {?} */
                var value = e && e.target && e.target.value || '';
                if (value) {
                    document.getElementById(_this._elementRangeOutputId).innerHTML = e.target.value;
                }
            });
        }
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$editorElm.remove();
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$editorElm.focus();
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.save = /**
     * @return {?}
     */
    function () {
        if (this.args.grid.getOptions().autoCommitEdit) {
            this.args.grid.getEditorLock().commitCurrentEdit();
        }
        else {
            this.args.commitChanges();
        }
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.$input.val(this.defaultValue);
        this.args.cancelChanges();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SliderEditor.prototype.loadValue = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // this.$input.val(this.defaultValue = item[this.columnDef.field]);
        this.defaultValue = item[this.columnDef.field];
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$sliderNumber.html(this.defaultValue);
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        return parseInt((/** @type {?} */ (this.$input.val())), 10) || 0;
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    SliderEditor.prototype.applyValue = /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    function (item, state) {
        item[this.columnDef.field] = state;
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elmValue = this.$input.val();
        return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    SliderEditor.prototype.validate = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elmValue = this.$input.val();
        /** @type {?} */
        var minValue = this.columnEditor.minValue;
        /** @type {?} */
        var maxValue = this.columnEditor.maxValue;
        /** @type {?} */
        var errorMsg = this.columnEditor.errorMessage;
        /** @type {?} */
        var mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue
        };
        if (this.validator) {
            /** @type {?} */
            var validationResults = this.validator(elmValue, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        else if (minValue !== undefined && (elmValue < minValue || elmValue > maxValue)) {
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, function (matched) {
                    return mapValidation[matched];
                })
            };
        }
        return {
            valid: true,
            msg: null
        };
    };
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     */
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    SliderEditor.prototype.buildTemplateHtmlString = 
    //
    // private functions
    // ------------------
    /**
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE;
        /** @type {?} */
        var maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE;
        /** @type {?} */
        var defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
        /** @type {?} */
        var step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP;
        /** @type {?} */
        var itemId = this.args && this.args.item && this.args.item.id;
        if (this.editorParams.hideSliderNumber) {
            return "\n      <div class=\"slider-editor\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-editor-input editor-" + fieldId + " range\" />\n      </div>";
        }
        return "\n      <div class=\"input-group slider-editor\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-editor-input editor-" + fieldId + " range\" />\n        <div class=\"input-group-addon input-group-append slider-value\"><span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span></div>\n      </div>";
    };
    return SliderEditor;
}());
export { SliderEditor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyRWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9lZGl0b3JzL3NsaWRlckVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7SUFNbkMsaUJBQWlCLEdBQUcsQ0FBQzs7SUFDckIsaUJBQWlCLEdBQUcsR0FBRzs7SUFDdkIsWUFBWSxHQUFHLENBQUM7QUFFdEI7SUFRRSxzQkFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUdELHNCQUFJLG1DQUFTO1FBRGIsbUNBQW1DOzs7OztRQUNuQztZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxzQ0FBWTtRQURoQiwrQkFBK0I7Ozs7O1FBQy9CO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO1FBQ3JFLENBQUM7OztPQUFBO0lBR0Qsc0JBQVksc0NBQVk7UUFEeEIsMkNBQTJDOzs7Ozs7UUFDM0M7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLG1DQUFTO1FBRGIsd0ZBQXdGOzs7OztRQUN4RjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDakUsQ0FBQzs7O09BQUE7Ozs7SUFFRCwyQkFBSTs7O0lBQUo7UUFBQSxpQkE2QkM7O1lB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QyxDQUFDLENBQUMsUUFBUTs7WUFDbkgsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWTs7WUFDakcsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUUvRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUU7WUFDdEMsT0FBTywrRUFFcUIsSUFBSSxDQUFDLG9CQUFvQiw2QkFDekMsSUFBSSxDQUFDLG9CQUFvQixxQ0FDakIsWUFBWSxpQkFBVSxRQUFRLGlCQUFVLFFBQVEsa0JBQVcsSUFBSSxzRUFDOUIsT0FBTyw4QkFDckQsQ0FBQztTQUNUO1FBRUQsT0FBTywyRkFFdUIsSUFBSSxDQUFDLG9CQUFvQiw2QkFDekMsSUFBSSxDQUFDLG9CQUFvQixxQ0FDakIsWUFBWSxpQkFBVSxRQUFRLGlCQUFVLFFBQVEsa0JBQVcsSUFBSSxzRUFDOUIsT0FBTyxvSUFDMEMsSUFBSSxDQUFDLHFCQUFxQixXQUFLLFlBQVksZ0NBQzFJLENBQUM7SUFDWixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBM0tELElBMktDOzs7Ozs7O0lBMUtDLDRDQUFxQzs7Ozs7SUFDckMsNkNBQXNDOztJQUN0QyxrQ0FBZ0I7O0lBQ2hCLDhCQUFZOztJQUNaLHFDQUFtQjs7SUFDbkIsb0NBQWtCOzs7OztJQUVOLDRCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDb2x1bW4sIEVkaXRvciwgRWRpdG9yVmFsaWRhdG9yLCBFZGl0b3JWYWxpZGF0b3JPdXRwdXQgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuY29uc3QgREVGQVVMVF9NSU5fVkFMVUUgPSAwO1xuY29uc3QgREVGQVVMVF9NQVhfVkFMVUUgPSAxMDA7XG5jb25zdCBERUZBVUxUX1NURVAgPSAxO1xuXG5leHBvcnQgY2xhc3MgU2xpZGVyRWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcbiAgcHJpdmF0ZSBfZWxlbWVudFJhbmdlSW5wdXRJZDogc3RyaW5nO1xuICBwcml2YXRlIF9lbGVtZW50UmFuZ2VPdXRwdXRJZDogc3RyaW5nO1xuICAkZWRpdG9yRWxtOiBhbnk7XG4gICRpbnB1dDogYW55O1xuICAkc2xpZGVyTnVtYmVyOiBhbnk7XG4gIGRlZmF1bHRWYWx1ZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXJnczogYW55KSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xuICBnZXQgY29sdW1uRGVmKCk6IENvbHVtbiB7XG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xuICBnZXQgY29sdW1uRWRpdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEVkaXRvciBHZW5lcmljIFBhcmFtcyAqL1xuICBwcml2YXRlIGdldCBlZGl0b3JQYXJhbXMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IucGFyYW1zIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLnZhbGlkYXRvciB8fCB0aGlzLmNvbHVtbkRlZi52YWxpZGF0b3I7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29udGFpbmVyO1xuXG4gICAgLy8gZGVmaW5lIHRoZSBpbnB1dCAmIHNsaWRlciBudW1iZXIgSURzXG4gICAgY29uc3QgaXRlbUlkID0gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5pdGVtICYmIHRoaXMuYXJncy5pdGVtLmlkO1xuICAgIHRoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWQgPSBgcmFuZ2VJbnB1dF8ke3RoaXMuY29sdW1uRGVmLmZpZWxkfV8ke2l0ZW1JZH1gO1xuICAgIHRoaXMuX2VsZW1lbnRSYW5nZU91dHB1dElkID0gYHJhbmdlT3V0cHV0XyR7dGhpcy5jb2x1bW5EZWYuZmllbGR9XyR7aXRlbUlkfWA7XG5cbiAgICAvLyBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcbiAgICBjb25zdCBlZGl0b3JUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKTtcbiAgICB0aGlzLiRlZGl0b3JFbG0gPSAkKGVkaXRvclRlbXBsYXRlKTtcbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGVkaXRvckVsbS5jaGlsZHJlbignaW5wdXQnKTtcbiAgICB0aGlzLiRzbGlkZXJOdW1iZXIgPSB0aGlzLiRlZGl0b3JFbG0uY2hpbGRyZW4oJ2Rpdi5pbnB1dC1ncm91cC1hZGRvbi5pbnB1dC1ncm91cC1hcHBlbmQnKS5jaGlsZHJlbigpO1xuXG4gICAgLy8gd2F0Y2ggb24gY2hhbmdlIGV2ZW50XG4gICAgdGhpcy4kZWRpdG9yRWxtXG4gICAgICAuYXBwZW5kVG8oY29udGFpbmVyKVxuICAgICAgLm9uKCdtb3VzZXVwJywgKCkgPT4gdGhpcy5zYXZlKCkpO1xuXG4gICAgLy8gaWYgdXNlciBjaG9zZSB0byBkaXNwbGF5IHRoZSBzbGlkZXIgbnVtYmVyIG9uIHRoZSByaWdodCBzaWRlLCB0aGVuIHVwZGF0ZSBpdCBldmVyeSB0aW1lIGl0IGNoYW5nZXNcbiAgICAvLyB3ZSBuZWVkIHRvIHVzZSBib3RoIFwiaW5wdXRcIiBhbmQgXCJjaGFuZ2VcIiBldmVudCB0byBiZSBhbGwgY3Jvc3MtYnJvd3NlclxuICAgIGlmICghdGhpcy5lZGl0b3JQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xuICAgICAgdGhpcy4kZWRpdG9yRWxtLm9uKCdpbnB1dCBjaGFuZ2UnLCAoZTogeyB0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQgfSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgfHwgJyc7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuX2VsZW1lbnRSYW5nZU91dHB1dElkKS5pbm5lckhUTUwgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlZGl0b3JFbG0ucmVtb3ZlKCk7XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLiRlZGl0b3JFbG0uZm9jdXMoKTtcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgaWYgKHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdCkge1xuICAgICAgdGhpcy5hcmdzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmNvbW1pdEN1cnJlbnRFZGl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMuJGlucHV0LnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSk7XG4gICAgdGhpcy5hcmdzLmNhbmNlbENoYW5nZXMoKTtcbiAgfVxuXG4gIGxvYWRWYWx1ZShpdGVtOiBhbnkpIHtcbiAgICAvLyB0aGlzLiRpbnB1dC52YWwodGhpcy5kZWZhdWx0VmFsdWUgPSBpdGVtW3RoaXMuY29sdW1uRGVmLmZpZWxkXSk7XG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBpdGVtW3RoaXMuY29sdW1uRGVmLmZpZWxkXTtcbiAgICB0aGlzLiRpbnB1dC52YWwodGhpcy5kZWZhdWx0VmFsdWUpO1xuICAgIHRoaXMuJGlucHV0WzBdLmRlZmF1bHRWYWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xuICAgIHRoaXMuJHNsaWRlck51bWJlci5odG1sKHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xuICAgIHJldHVybiBwYXJzZUludCh0aGlzLiRpbnB1dC52YWwoKSBhcyBzdHJpbmcsIDEwKSB8fCAwO1xuICB9XG5cbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcbiAgICBpdGVtW3RoaXMuY29sdW1uRGVmLmZpZWxkXSA9IHN0YXRlO1xuICB9XG5cbiAgaXNWYWx1ZUNoYW5nZWQoKSB7XG4gICAgY29uc3QgZWxtVmFsdWUgPSB0aGlzLiRpbnB1dC52YWwoKTtcbiAgICByZXR1cm4gKCEoZWxtVmFsdWUgPT09ICcnICYmIHRoaXMuZGVmYXVsdFZhbHVlID09PSBudWxsKSkgJiYgKGVsbVZhbHVlICE9PSB0aGlzLmRlZmF1bHRWYWx1ZSk7XG4gIH1cblxuICB2YWxpZGF0ZSgpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xuICAgIGNvbnN0IGVsbVZhbHVlID0gdGhpcy4kaW5wdXQudmFsKCk7XG4gICAgY29uc3QgbWluVmFsdWUgPSB0aGlzLmNvbHVtbkVkaXRvci5taW5WYWx1ZTtcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLm1heFZhbHVlO1xuICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5jb2x1bW5FZGl0b3IuZXJyb3JNZXNzYWdlO1xuICAgIGNvbnN0IG1hcFZhbGlkYXRpb24gPSB7XG4gICAgICAne3ttaW5WYWx1ZX19JzogbWluVmFsdWUsXG4gICAgICAne3ttYXhWYWx1ZX19JzogbWF4VmFsdWVcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMudmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uUmVzdWx0cyA9IHRoaXMudmFsaWRhdG9yKGVsbVZhbHVlLCB0aGlzLmFyZ3MpO1xuICAgICAgaWYgKCF2YWxpZGF0aW9uUmVzdWx0cy52YWxpZCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGlvblJlc3VsdHM7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtaW5WYWx1ZSAhPT0gdW5kZWZpbmVkICYmIChlbG1WYWx1ZSA8IG1pblZhbHVlIHx8IGVsbVZhbHVlID4gbWF4VmFsdWUpKSB7XG4gICAgICAvLyB3aGVuIGRlY2ltYWwgdmFsdWUgaXMgYmlnZ2VyIHRoYW4gMCwgd2Ugb25seSBhY2NlcHQgdGhlIGRlY2ltYWwgdmFsdWVzIGFzIHRoYXQgdmFsdWUgc2V0XG4gICAgICAvLyBmb3IgZXhhbXBsZSBpZiB3ZSBzZXQgZGVjaW1hbFBsYWNlcyB0byAyLCB3ZSB3aWxsIG9ubHkgYWNjZXB0IG51bWJlcnMgYmV0d2VlbiAwIGFuZCAyIGRlY2ltYWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgIG1zZzogZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fRURJVE9SX05VTUJFUl9CRVRXRUVOLnJlcGxhY2UoL3t7bWluVmFsdWV9fXx7e21heFZhbHVlfX0vZ2ksIChtYXRjaGVkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG1hcFZhbGlkYXRpb25bbWF0Y2hlZF07XG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIG1zZzogbnVsbFxuICAgIH07XG4gIH1cblxuICAvL1xuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBIVE1MIHRlbXBsYXRlIGFzIGEgc3RyaW5nXG4gICAqL1xuICBwcml2YXRlIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcbiAgICBjb25zdCBtaW5WYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLmhhc093blByb3BlcnR5KCdtaW5WYWx1ZScpID8gdGhpcy5jb2x1bW5FZGl0b3IubWluVmFsdWUgOiBERUZBVUxUX01JTl9WQUxVRTtcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLmhhc093blByb3BlcnR5KCdtYXhWYWx1ZScpID8gdGhpcy5jb2x1bW5FZGl0b3IubWF4VmFsdWUgOiBERUZBVUxUX01BWF9WQUxVRTtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmVkaXRvclBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnc2xpZGVyU3RhcnRWYWx1ZScpID8gdGhpcy5lZGl0b3JQYXJhbXMuc2xpZGVyU3RhcnRWYWx1ZSA6IG1pblZhbHVlO1xuICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmNvbHVtbkVkaXRvci5oYXNPd25Qcm9wZXJ0eSgndmFsdWVTdGVwJykgPyB0aGlzLmNvbHVtbkVkaXRvci52YWx1ZVN0ZXAgOiBERUZBVUxUX1NURVA7XG4gICAgY29uc3QgaXRlbUlkID0gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5pdGVtICYmIHRoaXMuYXJncy5pdGVtLmlkO1xuXG4gICAgaWYgKHRoaXMuZWRpdG9yUGFyYW1zLmhpZGVTbGlkZXJOdW1iZXIpIHtcbiAgICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2xpZGVyLWVkaXRvclwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcbiAgICAgICAgICBuYW1lPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkfVwiXG4gICAgICAgICAgZGVmYXVsdFZhbHVlPVwiJHtkZWZhdWx0VmFsdWV9XCIgbWluPVwiJHttaW5WYWx1ZX1cIiBtYXg9XCIke21heFZhbHVlfVwiIHN0ZXA9XCIke3N0ZXB9XCJcbiAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBzbGlkZXItZWRpdG9yLWlucHV0IGVkaXRvci0ke2ZpZWxkSWR9IHJhbmdlXCIgLz5cbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBzbGlkZXItZWRpdG9yXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBpZD1cIiR7dGhpcy5fZWxlbWVudFJhbmdlSW5wdXRJZH1cIlxuICAgICAgICAgIG5hbWU9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU9XCIke2RlZmF1bHRWYWx1ZX1cIiBtaW49XCIke21pblZhbHVlfVwiIG1heD1cIiR7bWF4VmFsdWV9XCIgc3RlcD1cIiR7c3RlcH1cIlxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHNsaWRlci1lZGl0b3ItaW5wdXQgZWRpdG9yLSR7ZmllbGRJZH0gcmFuZ2VcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtYXBwZW5kIHNsaWRlci12YWx1ZVwiPjxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiIGlkPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZH1cIj4ke2RlZmF1bHRWYWx1ZX08L3NwYW4+PC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICB9XG59XG4iXX0=