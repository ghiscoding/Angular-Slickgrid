/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapFlatpickrDateFormatWithFieldType, mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import { TranslateService } from '@ngx-translate/core';
import * as moment_ from 'moment-mini';
/** @type {?} */
var moment = moment_;
require('flatpickr');
/*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
var /*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
DateEditor = /** @class */ (function () {
    function DateEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(DateEditor.prototype, "columnDef", {
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
    Object.defineProperty(DateEditor.prototype, "columnEditor", {
        /** Get Column Editor object */
        get: /**
         * Get Column Editor object
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateEditor.prototype, "validator", {
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
    DateEditor.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.args && this.args.column) {
            /** @type {?} */
            var fieldId = this.columnDef && this.columnDef.id;
            /** @type {?} */
            var gridOptions = (/** @type {?} */ (this.args.grid.getOptions()));
            this.defaultDate = (this.args.item) ? this.args.item[this.args.column.field] : null;
            /** @type {?} */
            var inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
            /** @type {?} */
            var outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || FieldType.dateUtc);
            /** @type {?} */
            var currentLocale = this.getCurrentLocale(this.columnDef, gridOptions);
            if (currentLocale.length > 2) {
                currentLocale = currentLocale.substring(0, 2);
            }
            /** @type {?} */
            var pickerOptions = {
                defaultDate: this.defaultDate,
                altInput: true,
                altFormat: inputFormat,
                dateFormat: outputFormat,
                closeOnSelect: false,
                locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
                onChange: function (selectedDates, dateStr, instance) {
                    _this.save();
                },
            };
            this.$input = $("<input type=\"text\" data-defaultDate=\"" + this.defaultDate + "\" class=\"editor-text flatpickr editor-" + fieldId + "\" />");
            this.$input.appendTo(this.args.container);
            this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerOptions) : null;
            this.show();
        }
    };
    /**
     * @param {?} columnDef
     * @param {?} gridOptions
     * @return {?}
     */
    DateEditor.prototype.getCurrentLocale = /**
     * @param {?} columnDef
     * @param {?} gridOptions
     * @return {?}
     */
    function (columnDef, gridOptions) {
        /** @type {?} */
        var options = gridOptions || columnDef.params || {};
        if (options.i18n && options.i18n instanceof TranslateService) {
            return options.i18n.currentLang;
        }
        return 'en';
    };
    /**
     * @param {?} locale
     * @return {?}
     */
    DateEditor.prototype.loadFlatpickrLocale = /**
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        /** @type {?} */
        var gridOptions = this.args && this.args.grid && this.args.grid.getOptions();
        if (gridOptions && gridOptions.params && gridOptions.params.flapickrLocale) {
            return gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
            /** @type {?} */
            var localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.hide();
        // this.flatInstance.destroy();
        this.$input.remove();
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.show = /**
     * @return {?}
     */
    function () {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.hide = /**
     * @return {?}
     */
    function () {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.save = /**
     * @return {?}
     */
    function () {
        // autocommit will not focus the next editor
        /** @type {?} */
        var validation = this.validate();
        if (validation && validation.valid) {
            if (this.args.grid.getOptions().autoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.getColumnEditor = /**
     * @return {?}
     */
    function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DateEditor.prototype.loadValue = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.defaultDate = item[this.args.column.field];
        this.flatInstance.setDate(item[this.args.column.field]);
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var domValue = this.$input.val();
        if (!domValue) {
            return '';
        }
        /** @type {?} */
        var outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        /** @type {?} */
        var value = moment(domValue).format(outputFormat);
        return value;
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    DateEditor.prototype.applyValue = /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    function (item, state) {
        if (!state) {
            return;
        }
        /** @type {?} */
        var outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        item[this.args.column.field] = moment(state, outputFormat).toDate();
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
    };
    /**
     * @return {?}
     */
    DateEditor.prototype.validate = /**
     * @return {?}
     */
    function () {
        if (this.validator) {
            /** @type {?} */
            var value = this.$input && this.$input.val && this.$input.val();
            /** @type {?} */
            var validationResults = this.validator(value, this.args);
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
    };
    return DateEditor;
}());
/*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
export { DateEditor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZWRpdG9ycy9kYXRlRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoSCxPQUFPLEVBQTBELFNBQVMsRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBQ2xILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sS0FBSyxPQUFPLE1BQU0sYUFBYSxDQUFDOztJQUNqQyxNQUFNLEdBQUcsT0FBTztBQUd0QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7O0FBU3JCOzs7OztJQUtFLG9CQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBR0Qsc0JBQUksaUNBQVM7UUFEYixtQ0FBbUM7Ozs7O1FBQ25DO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLG9DQUFZO1FBRGhCLCtCQUErQjs7Ozs7UUFDL0I7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQztRQUM1RyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLGlDQUFTO1FBRGIsd0ZBQXdGOzs7OztRQUN4RjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFD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LEtBQUssRUFBRTtnQkFDNUIsT0FBTyxpQkFBaUIsQ0FBQzthQUMxQjtTQUNGO1FBRUQsd0NBQXdDO1FBQ3hDLHdGQUF3RjtRQUN4RixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtTQUNWLENBQUM7SUFDSixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBaktELElBaUtDOzs7Ozs7OztJQWhLQyw0QkFBWTs7SUFDWixrQ0FBa0I7O0lBQ2xCLGlDQUFvQjs7Ozs7SUFFUiwwQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSwgbWFwTW9tZW50RGF0ZUZvcm1hdFdpdGhGaWVsZFR5cGUgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IENvbHVtbiwgRWRpdG9yLCBFZGl0b3JWYWxpZGF0b3IsIEVkaXRvclZhbGlkYXRvck91dHB1dCwgRmllbGRUeXBlLCBHcmlkT3B0aW9uIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50LW1pbmknO1xyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIFwibW9tZW50IGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiIGlzc3VlLCBkb2N1bWVudCBoZXJlIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2lzc3Vlcy82NzBcclxuXHJcbmRlY2xhcmUgZnVuY3Rpb24gcmVxdWlyZShuYW1lOiBzdHJpbmcpO1xyXG5yZXF1aXJlKCdmbGF0cGlja3InKTtcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLypcclxuICogQW4gZXhhbXBsZSBvZiBhIGRhdGUgcGlja2VyIGVkaXRvciB1c2luZyBGbGF0cGlja3JcclxuICogaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGF0ZUVkaXRvciBpbXBsZW1lbnRzIEVkaXRvciB7XHJcbiAgJGlucHV0OiBhbnk7XHJcbiAgZmxhdEluc3RhbmNlOiBhbnk7XHJcbiAgZGVmYXVsdERhdGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcmdzOiBhbnkpIHtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRGVmaW5pdGlvbiBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRGVmKCk6IENvbHVtbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBFZGl0b3Igb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkVkaXRvcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xyXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbikge1xyXG4gICAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICAgIGNvbnN0IGdyaWRPcHRpb25zID0gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpIGFzIEdyaWRPcHRpb247XHJcbiAgICAgIHRoaXMuZGVmYXVsdERhdGUgPSAodGhpcy5hcmdzLml0ZW0pID8gdGhpcy5hcmdzLml0ZW1bdGhpcy5hcmdzLmNvbHVtbi5maWVsZF0gOiBudWxsO1xyXG4gICAgICBjb25zdCBpbnB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc28pO1xyXG4gICAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmNvbHVtbkRlZi5vdXRwdXRUeXBlIHx8IEZpZWxkVHlwZS5kYXRlVXRjKTtcclxuICAgICAgbGV0IGN1cnJlbnRMb2NhbGUgPSB0aGlzLmdldEN1cnJlbnRMb2NhbGUodGhpcy5jb2x1bW5EZWYsIGdyaWRPcHRpb25zKTtcclxuICAgICAgaWYgKGN1cnJlbnRMb2NhbGUubGVuZ3RoID4gMikge1xyXG4gICAgICAgIGN1cnJlbnRMb2NhbGUgPSBjdXJyZW50TG9jYWxlLnN1YnN0cmluZygwLCAyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGlja2VyT3B0aW9uczogYW55ID0ge1xyXG4gICAgICAgIGRlZmF1bHREYXRlOiB0aGlzLmRlZmF1bHREYXRlLFxyXG4gICAgICAgIGFsdElucHV0OiB0cnVlLFxyXG4gICAgICAgIGFsdEZvcm1hdDogaW5wdXRGb3JtYXQsXHJcbiAgICAgICAgZGF0ZUZvcm1hdDogb3V0cHV0Rm9ybWF0LFxyXG4gICAgICAgIGNsb3NlT25TZWxlY3Q6IGZhbHNlLFxyXG4gICAgICAgIGxvY2FsZTogKGN1cnJlbnRMb2NhbGUgIT09ICdlbicpID8gdGhpcy5sb2FkRmxhdHBpY2tyTG9jYWxlKGN1cnJlbnRMb2NhbGUpIDogJ2VuJyxcclxuICAgICAgICBvbkNoYW5nZTogKHNlbGVjdGVkRGF0ZXM6IGFueVtdIHwgYW55LCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLiRpbnB1dCA9ICQoYDxpbnB1dCB0eXBlPVwidGV4dFwiIGRhdGEtZGVmYXVsdERhdGU9XCIke3RoaXMuZGVmYXVsdERhdGV9XCIgY2xhc3M9XCJlZGl0b3ItdGV4dCBmbGF0cGlja3IgZWRpdG9yLSR7ZmllbGRJZH1cIiAvPmApO1xyXG4gICAgICB0aGlzLiRpbnB1dC5hcHBlbmRUbyh0aGlzLmFyZ3MuY29udGFpbmVyKTtcclxuICAgICAgdGhpcy5mbGF0SW5zdGFuY2UgPSAodGhpcy4kaW5wdXRbMF0gJiYgdHlwZW9mIHRoaXMuJGlucHV0WzBdLmZsYXRwaWNrciA9PT0gJ2Z1bmN0aW9uJykgPyB0aGlzLiRpbnB1dFswXS5mbGF0cGlja3IocGlja2VyT3B0aW9ucykgOiBudWxsO1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEN1cnJlbnRMb2NhbGUoY29sdW1uRGVmOiBDb2x1bW4sIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gZ3JpZE9wdGlvbnMgfHwgY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcclxuICAgIGlmIChvcHRpb25zLmkxOG4gJiYgb3B0aW9ucy5pMThuIGluc3RhbmNlb2YgVHJhbnNsYXRlU2VydmljZSkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucy5pMThuLmN1cnJlbnRMYW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAnZW4nO1xyXG4gIH1cclxuXHJcbiAgbG9hZEZsYXRwaWNrckxvY2FsZShsb2NhbGU6IHN0cmluZykge1xyXG4gICAgLy8gY2hhbmdlIGxvY2FsZSBpZiBuZWVkZWQsIEZsYXRwaWNrciByZWZlcmVuY2U6IGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9sb2NhbGl6YXRpb24vXHJcbiAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuZ3JpZCAmJiB0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCk7XHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMucGFyYW1zICYmIGdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZSkge1xyXG4gICAgICByZXR1cm4gZ3JpZE9wdGlvbnMucGFyYW1zLmZsYXBpY2tyTG9jYWxlO1xyXG4gICAgfSBlbHNlIGlmIChsb2NhbGUgIT09ICdlbicpIHtcclxuICAgICAgY29uc3QgbG9jYWxlRGVmYXVsdDogYW55ID0gcmVxdWlyZShgZmxhdHBpY2tyL2Rpc3QvbDEwbi8ke2xvY2FsZX0uanNgKS5kZWZhdWx0O1xyXG4gICAgICByZXR1cm4gKGxvY2FsZURlZmF1bHQgJiYgbG9jYWxlRGVmYXVsdFtsb2NhbGVdKSA/IGxvY2FsZURlZmF1bHRbbG9jYWxlXSA6ICdlbic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ2VuJztcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmhpZGUoKTtcclxuICAgIC8vIHRoaXMuZmxhdEluc3RhbmNlLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuJGlucHV0LnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB0eXBlb2YgdGhpcy5mbGF0SW5zdGFuY2Uub3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5vcGVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdEluc3RhbmNlICYmIHR5cGVvZiB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXMoKSB7XHJcbiAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIC8vIGF1dG9jb21taXQgd2lsbCBub3QgZm9jdXMgdGhlIG5leHQgZWRpdG9yXHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgaWYgKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkge1xyXG4gICAgICBpZiAodGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmNvbW1pdEN1cnJlbnRFZGl0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Q29sdW1uRWRpdG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uICYmIHRoaXMuYXJncy5jb2x1bW4uaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5hcmdzLmNvbHVtbi5pbnRlcm5hbENvbHVtbkVkaXRvcjtcclxuICB9XHJcblxyXG4gIGxvYWRWYWx1ZShpdGVtOiBhbnkpIHtcclxuICAgIHRoaXMuZGVmYXVsdERhdGUgPSBpdGVtW3RoaXMuYXJncy5jb2x1bW4uZmllbGRdO1xyXG4gICAgdGhpcy5mbGF0SW5zdGFuY2Uuc2V0RGF0ZShpdGVtW3RoaXMuYXJncy5jb2x1bW4uZmllbGRdKTtcclxuICB9XHJcblxyXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xyXG4gICAgY29uc3QgZG9tVmFsdWU6IHN0cmluZyA9IHRoaXMuJGlucHV0LnZhbCgpO1xyXG5cclxuICAgIGlmICghZG9tVmFsdWUpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuYXJncy5jb2x1bW4udHlwZSB8fCBGaWVsZFR5cGUuZGF0ZUlzbyk7XHJcbiAgICBjb25zdCB2YWx1ZSA9IG1vbWVudChkb21WYWx1ZSkuZm9ybWF0KG91dHB1dEZvcm1hdCk7XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcclxuICAgIGlmICghc3RhdGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuYXJncy5jb2x1bW4udHlwZSB8fCBGaWVsZFR5cGUuZGF0ZUlzbyk7XHJcbiAgICBpdGVtW3RoaXMuYXJncy5jb2x1bW4uZmllbGRdID0gbW9tZW50KHN0YXRlLCBvdXRwdXRGb3JtYXQpLnRvRGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgaXNWYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICByZXR1cm4gKCEodGhpcy4kaW5wdXQudmFsKCkgPT09ICcnICYmIHRoaXMuZGVmYXVsdERhdGUgPT0gbnVsbCkpICYmICh0aGlzLiRpbnB1dC52YWwoKSAhPT0gdGhpcy5kZWZhdWx0RGF0ZSk7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZSgpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xyXG4gICAgaWYgKHRoaXMudmFsaWRhdG9yKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy4kaW5wdXQgJiYgdGhpcy4kaW5wdXQudmFsICYmIHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gICAgICBjb25zdCB2YWxpZGF0aW9uUmVzdWx0cyA9IHRoaXMudmFsaWRhdG9yKHZhbHVlLCB0aGlzLmFyZ3MpO1xyXG4gICAgICBpZiAoIXZhbGlkYXRpb25SZXN1bHRzLnZhbGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25SZXN1bHRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnkgZGVmYXVsdCB0aGUgZWRpdG9yIGlzIGFsd2F5cyB2YWxpZFxyXG4gICAgLy8gaWYgdXNlciB3YW50IGl0IHRvIGJlIGEgcmVxdWlyZWQgY2hlY2tib3gsIGhlIHdvdWxkIGhhdmUgdG8gcHJvdmlkZSBoaXMgb3duIHZhbGlkYXRvclxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsaWQ6IHRydWUsXHJcbiAgICAgIG1zZzogbnVsbFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19