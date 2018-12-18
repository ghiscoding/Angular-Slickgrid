/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapFlatpickrDateFormatWithFieldType, mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import { TranslateService } from '@ngx-translate/core';
import * as moment_ from 'moment-mini';
/** @type {?} */
const moment = moment_;
require('flatpickr');
/*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
export class DateEditor {
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
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
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
        if (this.args && this.args.column) {
            /** @type {?} */
            const fieldId = this.columnDef && this.columnDef.id;
            /** @type {?} */
            const gridOptions = (/** @type {?} */ (this.args.grid.getOptions()));
            this.defaultDate = (this.args.item) ? this.args.item[this.args.column.field] : null;
            /** @type {?} */
            const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
            /** @type {?} */
            const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || FieldType.dateUtc);
            /** @type {?} */
            let currentLocale = this.getCurrentLocale(this.columnDef, gridOptions);
            if (currentLocale.length > 2) {
                currentLocale = currentLocale.substring(0, 2);
            }
            /** @type {?} */
            const pickerOptions = {
                defaultDate: this.defaultDate,
                altInput: true,
                altFormat: inputFormat,
                dateFormat: outputFormat,
                closeOnSelect: false,
                locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
                onChange: (selectedDates, dateStr, instance) => {
                    this.save();
                },
            };
            this.$input = $(`<input type="text" data-defaultDate="${this.defaultDate}" class="editor-text flatpickr editor-${fieldId}" />`);
            this.$input.appendTo(this.args.container);
            this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerOptions) : null;
            this.show();
        }
    }
    /**
     * @param {?} columnDef
     * @param {?} gridOptions
     * @return {?}
     */
    getCurrentLocale(columnDef, gridOptions) {
        /** @type {?} */
        const options = gridOptions || columnDef.params || {};
        if (options.i18n && options.i18n instanceof TranslateService) {
            return options.i18n.currentLang;
        }
        return 'en';
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    loadFlatpickrLocale(locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        /** @type {?} */
        const gridOptions = this.args && this.args.grid && this.args.grid.getOptions();
        if (gridOptions && gridOptions.params && gridOptions.params.flapickrLocale) {
            return gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
            /** @type {?} */
            const localeDefault = require(`flatpickr/dist/l10n/${locale}.js`).default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    }
    /**
     * @return {?}
     */
    destroy() {
        this.hide();
        // this.flatInstance.destroy();
        this.$input.remove();
    }
    /**
     * @return {?}
     */
    show() {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        this.$input.focus();
    }
    /**
     * @return {?}
     */
    save() {
        // autocommit will not focus the next editor
        /** @type {?} */
        const validation = this.validate();
        if (validation && validation.valid) {
            if (this.args.grid.getOptions().autoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    }
    /**
     * @return {?}
     */
    getColumnEditor() {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultDate = item[this.args.column.field];
        this.flatInstance.setDate(item[this.args.column.field]);
    }
    /**
     * @return {?}
     */
    serializeValue() {
        /** @type {?} */
        const domValue = this.$input.val();
        if (!domValue) {
            return '';
        }
        /** @type {?} */
        const outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        /** @type {?} */
        const value = moment(domValue).format(outputFormat);
        return value;
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        if (!state) {
            return;
        }
        /** @type {?} */
        const outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        item[this.args.column.field] = moment(state, outputFormat).toDate();
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
    }
    /**
     * @return {?}
     */
    validate() {
        if (this.validator) {
            /** @type {?} */
            const value = this.$input && this.$input.val && this.$input.val();
            /** @type {?} */
            const validationResults = this.validator(value, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        // by default the editor is always valid
        // if user want it to be a required checkbox, he would have to provide his own validator
        return {
            valid: true,
            msg: null
        };
    }
}
if (false) {
    /** @type {?} */
    DateEditor.prototype.$input;
    /** @type {?} */
    DateEditor.prototype.flatInstance;
    /** @type {?} */
    DateEditor.prototype.defaultDate;
    /**
     * @type {?}
     * @private
     */
    DateEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZWRpdG9ycy9kYXRlRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoSCxPQUFPLEVBQTBELFNBQVMsRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBQ2xILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sS0FBSyxPQUFPLE1BQU0sYUFBYSxDQUFDOztNQUNqQyxNQUFNLEdBQUcsT0FBTztBQUd0QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7O0FBU3JCLE1BQU0sT0FBTyxVQUFVOzs7O0lBS3JCLFlBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7Ozs7O0lBR0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUdELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO0lBQzVHLENBQUM7Ozs7O0lBR0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMs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O0lBRVIsMEJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWFwRmxhdHBpY2tyRGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUsIG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBDb2x1bW4sIEVkaXRvciwgRWRpdG9yVmFsaWRhdG9yLCBFZGl0b3JWYWxpZGF0b3JPdXRwdXQsIEZpZWxkVHlwZSwgR3JpZE9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudC1taW5pJztcclxuY29uc3QgbW9tZW50ID0gbW9tZW50XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCBcIm1vbWVudCBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIiBpc3N1ZSwgZG9jdW1lbnQgaGVyZSBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvNjcwXHJcblxyXG5kZWNsYXJlIGZ1bmN0aW9uIHJlcXVpcmUobmFtZTogc3RyaW5nKTtcclxucmVxdWlyZSgnZmxhdHBpY2tyJyk7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbi8qXHJcbiAqIEFuIGV4YW1wbGUgb2YgYSBkYXRlIHBpY2tlciBlZGl0b3IgdXNpbmcgRmxhdHBpY2tyXHJcbiAqIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhdGVFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xyXG4gICRpbnB1dDogYW55O1xyXG4gIGZsYXRJbnN0YW5jZTogYW55O1xyXG4gIGRlZmF1bHREYXRlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXJnczogYW55KSB7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIERlZmluaXRpb24gb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkRlZigpOiBDb2x1bW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5FZGl0b3IoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFZhbGlkYXRvciBmdW5jdGlvbiwgY2FuIGJlIHBhc3NlZCBpbiBFZGl0b3IgcHJvcGVydHkgb3IgQ29sdW1uIERlZmluaXRpb24gKi9cclxuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IudmFsaWRhdG9yIHx8IHRoaXMuY29sdW1uRGVmLnZhbGlkYXRvcjtcclxuICB9XHJcblxyXG4gIGluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4pIHtcclxuICAgICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKSBhcyBHcmlkT3B0aW9uO1xyXG4gICAgICB0aGlzLmRlZmF1bHREYXRlID0gKHRoaXMuYXJncy5pdGVtKSA/IHRoaXMuYXJncy5pdGVtW3RoaXMuYXJncy5jb2x1bW4uZmllbGRdIDogbnVsbDtcclxuICAgICAgY29uc3QgaW5wdXRGb3JtYXQgPSBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5kYXRlSXNvKTtcclxuICAgICAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gbWFwRmxhdHBpY2tyRGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUodGhpcy5jb2x1bW5EZWYub3V0cHV0VHlwZSB8fCBGaWVsZFR5cGUuZGF0ZVV0Yyk7XHJcbiAgICAgIGxldCBjdXJyZW50TG9jYWxlID0gdGhpcy5nZXRDdXJyZW50TG9jYWxlKHRoaXMuY29sdW1uRGVmLCBncmlkT3B0aW9ucyk7XHJcbiAgICAgIGlmIChjdXJyZW50TG9jYWxlLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICBjdXJyZW50TG9jYWxlID0gY3VycmVudExvY2FsZS5zdWJzdHJpbmcoMCwgMik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBpY2tlck9wdGlvbnM6IGFueSA9IHtcclxuICAgICAgICBkZWZhdWx0RGF0ZTogdGhpcy5kZWZhdWx0RGF0ZSxcclxuICAgICAgICBhbHRJbnB1dDogdHJ1ZSxcclxuICAgICAgICBhbHRGb3JtYXQ6IGlucHV0Rm9ybWF0LFxyXG4gICAgICAgIGRhdGVGb3JtYXQ6IG91dHB1dEZvcm1hdCxcclxuICAgICAgICBjbG9zZU9uU2VsZWN0OiBmYWxzZSxcclxuICAgICAgICBsb2NhbGU6IChjdXJyZW50TG9jYWxlICE9PSAnZW4nKSA/IHRoaXMubG9hZEZsYXRwaWNrckxvY2FsZShjdXJyZW50TG9jYWxlKSA6ICdlbicsXHJcbiAgICAgICAgb25DaGFuZ2U6IChzZWxlY3RlZERhdGVzOiBhbnlbXSB8IGFueSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy4kaW5wdXQgPSAkKGA8aW5wdXQgdHlwZT1cInRleHRcIiBkYXRhLWRlZmF1bHREYXRlPVwiJHt0aGlzLmRlZmF1bHREYXRlfVwiIGNsYXNzPVwiZWRpdG9yLXRleHQgZmxhdHBpY2tyIGVkaXRvci0ke2ZpZWxkSWR9XCIgLz5gKTtcclxuICAgICAgdGhpcy4kaW5wdXQuYXBwZW5kVG8odGhpcy5hcmdzLmNvbnRhaW5lcik7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlID0gKHRoaXMuJGlucHV0WzBdICYmIHR5cGVvZiB0aGlzLiRpbnB1dFswXS5mbGF0cGlja3IgPT09ICdmdW5jdGlvbicpID8gdGhpcy4kaW5wdXRbMF0uZmxhdHBpY2tyKHBpY2tlck9wdGlvbnMpIDogbnVsbDtcclxuICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDdXJyZW50TG9jYWxlKGNvbHVtbkRlZjogQ29sdW1uLCBncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IGdyaWRPcHRpb25zIHx8IGNvbHVtbkRlZi5wYXJhbXMgfHwge307XHJcbiAgICBpZiAob3B0aW9ucy5pMThuICYmIG9wdGlvbnMuaTE4biBpbnN0YW5jZW9mIFRyYW5zbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuaTE4bi5jdXJyZW50TGFuZztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJ2VuJztcclxuICB9XHJcblxyXG4gIGxvYWRGbGF0cGlja3JMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIC8vIGNoYW5nZSBsb2NhbGUgaWYgbmVlZGVkLCBGbGF0cGlja3IgcmVmZXJlbmNlOiBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvbG9jYWxpemF0aW9uL1xyXG4gICAgY29uc3QgZ3JpZE9wdGlvbnMgPSB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmdyaWQgJiYgdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpO1xyXG4gICAgaWYgKGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLnBhcmFtcyAmJiBncmlkT3B0aW9ucy5wYXJhbXMuZmxhcGlja3JMb2NhbGUpIHtcclxuICAgICAgcmV0dXJuIGdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZTtcclxuICAgIH0gZWxzZSBpZiAobG9jYWxlICE9PSAnZW4nKSB7XHJcbiAgICAgIGNvbnN0IGxvY2FsZURlZmF1bHQ6IGFueSA9IHJlcXVpcmUoYGZsYXRwaWNrci9kaXN0L2wxMG4vJHtsb2NhbGV9LmpzYCkuZGVmYXVsdDtcclxuICAgICAgcmV0dXJuIChsb2NhbGVEZWZhdWx0ICYmIGxvY2FsZURlZmF1bHRbbG9jYWxlXSkgPyBsb2NhbGVEZWZhdWx0W2xvY2FsZV0gOiAnZW4nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdlbic7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5oaWRlKCk7XHJcbiAgICAvLyB0aGlzLmZsYXRJbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICB0aGlzLiRpbnB1dC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy5mbGF0SW5zdGFuY2UgJiYgdHlwZW9mIHRoaXMuZmxhdEluc3RhbmNlLm9wZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5mbGF0SW5zdGFuY2Uub3BlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB0eXBlb2YgdGhpcy5mbGF0SW5zdGFuY2UuY2xvc2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5mbGF0SW5zdGFuY2UuY2xvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvY3VzKCkge1xyXG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICAvLyBhdXRvY29tbWl0IHdpbGwgbm90IGZvY3VzIHRoZSBuZXh0IGVkaXRvclxyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoKTtcclxuICAgIGlmICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpIHtcclxuICAgICAgaWYgKHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbHVtbkVkaXRvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuYXJncy5jb2x1bW4uaW50ZXJuYWxDb2x1bW5FZGl0b3I7XHJcbiAgfVxyXG5cclxuICBsb2FkVmFsdWUoaXRlbTogYW55KSB7XHJcbiAgICB0aGlzLmRlZmF1bHREYXRlID0gaXRlbVt0aGlzLmFyZ3MuY29sdW1uLmZpZWxkXTtcclxuICAgIHRoaXMuZmxhdEluc3RhbmNlLnNldERhdGUoaXRlbVt0aGlzLmFyZ3MuY29sdW1uLmZpZWxkXSk7XHJcbiAgfVxyXG5cclxuICBzZXJpYWxpemVWYWx1ZSgpIHtcclxuICAgIGNvbnN0IGRvbVZhbHVlOiBzdHJpbmcgPSB0aGlzLiRpbnB1dC52YWwoKTtcclxuXHJcbiAgICBpZiAoIWRvbVZhbHVlKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmFyZ3MuY29sdW1uLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc28pO1xyXG4gICAgY29uc3QgdmFsdWUgPSBtb21lbnQoZG9tVmFsdWUpLmZvcm1hdChvdXRwdXRGb3JtYXQpO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KSB7XHJcbiAgICBpZiAoIXN0YXRlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmFyZ3MuY29sdW1uLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc28pO1xyXG4gICAgaXRlbVt0aGlzLmFyZ3MuY29sdW1uLmZpZWxkXSA9IG1vbWVudChzdGF0ZSwgb3V0cHV0Rm9ybWF0KS50b0RhdGUoKTtcclxuICB9XHJcblxyXG4gIGlzVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgcmV0dXJuICghKHRoaXMuJGlucHV0LnZhbCgpID09PSAnJyAmJiB0aGlzLmRlZmF1bHREYXRlID09IG51bGwpKSAmJiAodGhpcy4kaW5wdXQudmFsKCkgIT09IHRoaXMuZGVmYXVsdERhdGUpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoKTogRWRpdG9yVmFsaWRhdG9yT3V0cHV0IHtcclxuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuJGlucHV0ICYmIHRoaXMuJGlucHV0LnZhbCAmJiB0aGlzLiRpbnB1dC52YWwoKTtcclxuICAgICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdHMgPSB0aGlzLnZhbGlkYXRvcih2YWx1ZSwgdGhpcy5hcmdzKTtcclxuICAgICAgaWYgKCF2YWxpZGF0aW9uUmVzdWx0cy52YWxpZCkge1xyXG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uUmVzdWx0cztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbHdheXMgdmFsaWRcclxuICAgIC8vIGlmIHVzZXIgd2FudCBpdCB0byBiZSBhIHJlcXVpcmVkIGNoZWNrYm94LCBoZSB3b3VsZCBoYXZlIHRvIHByb3ZpZGUgaGlzIG93biB2YWxpZGF0b3JcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHZhbGlkOiB0cnVlLFxyXG4gICAgICBtc2c6IG51bGxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==