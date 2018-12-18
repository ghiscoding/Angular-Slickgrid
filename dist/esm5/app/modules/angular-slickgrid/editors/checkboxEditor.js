/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
var /*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
CheckboxEditor = /** @class */ (function () {
    function CheckboxEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(CheckboxEditor.prototype, "columnDef", {
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
    Object.defineProperty(CheckboxEditor.prototype, "columnEditor", {
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
    Object.defineProperty(CheckboxEditor.prototype, "validator", {
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
    CheckboxEditor.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        this.$input = $("<input type=\"checkbox\" value=\"true\" class=\"editor-checkbox editor-" + fieldId + "\" />");
        this.$input.appendTo(this.args.container);
        this.$input.focus();
        // make the checkbox editor act like a regular checkbox that commit the value on click
        if (this.args.grid.getOptions().autoCommitEdit) {
            this.$input.click(function () { return _this.args.grid.getEditorLock().commitCurrentEdit(); });
        }
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$input.remove();
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.$input.hide();
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.show = /**
     * @return {?}
     */
    function () {
        this.$input.show();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CheckboxEditor.prototype.loadValue = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.defaultValue = !!item[this.columnDef.field];
        if (this.defaultValue) {
            this.$input.prop('checked', true);
        }
        else {
            this.$input.prop('checked', false);
        }
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.preClick = /**
     * @return {?}
     */
    function () {
        this.$input.prop('checked', !this.$input.prop('checked'));
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        return this.$input.prop('checked');
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    CheckboxEditor.prototype.applyValue = /**
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
    CheckboxEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        return (this.serializeValue() !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    CheckboxEditor.prototype.validate = /**
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
    return CheckboxEditor;
}());
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export { CheckboxEditor };
if (false) {
    /** @type {?} */
    CheckboxEditor.prototype.$input;
    /** @type {?} */
    CheckboxEditor.prototype.defaultValue;
    /**
     * @type {?}
     * @private
     */
    CheckboxEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvY2hlY2tib3hFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFTQTs7Ozs7SUFJRSx3QkFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUdELHNCQUFJLHFDQUFTO1FBRGIsbUNBQW1DOzs7OztRQUNuQztZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSx3Q0FBWTtRQURoQiwrQkFBK0I7Ozs7O1FBQy9CO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxFQUFFLENBQUM7UUFDNUcsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxxQ0FBUztRQURiLHdGQUF3Rjs7Ozs7UUFDeEY7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ2pFLENBQUM7OztPQUFBOzs7O0lBRUQsNkJBQUk7OztJQUFKO1FBQUEsaUJBVUM7O1lBVE8sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLDRFQUFxRSxPQUFPLFVBQU0sQ0FBQyxDQUFDO1FBQ3BHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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ciwgRWRpdG9yVmFsaWRhdG9yLCBFZGl0b3JWYWxpZGF0b3JPdXRwdXQgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuLypcbiAqIEFuIGV4YW1wbGUgb2YgYSAnZGV0YWNoZWQnIGVkaXRvci5cbiAqIEtleURvd24gZXZlbnRzIGFyZSBhbHNvIGhhbmRsZWQgdG8gcHJvdmlkZSBoYW5kbGluZyBmb3IgVGFiLCBTaGlmdC1UYWIsIEVzYyBhbmQgQ3RybC1FbnRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIENoZWNrYm94RWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcbiAgJGlucHV0OiBhbnk7XG4gIGRlZmF1bHRWYWx1ZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqIEdldCBDb2x1bW4gRGVmaW5pdGlvbiBvYmplY3QgKi9cbiAgZ2V0IGNvbHVtbkRlZigpOiBDb2x1bW4ge1xuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cbiAgZ2V0IGNvbHVtbkVkaXRvcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIFZhbGlkYXRvciBmdW5jdGlvbiwgY2FuIGJlIHBhc3NlZCBpbiBFZGl0b3IgcHJvcGVydHkgb3IgQ29sdW1uIERlZmluaXRpb24gKi9cbiAgZ2V0IHZhbGlkYXRvcigpOiBFZGl0b3JWYWxpZGF0b3Ige1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgdGhpcy4kaW5wdXQgPSAkKGA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJ0cnVlXCIgY2xhc3M9XCJlZGl0b3ItY2hlY2tib3ggZWRpdG9yLSR7ZmllbGRJZH1cIiAvPmApO1xuICAgIHRoaXMuJGlucHV0LmFwcGVuZFRvKHRoaXMuYXJncy5jb250YWluZXIpO1xuICAgIHRoaXMuJGlucHV0LmZvY3VzKCk7XG5cbiAgICAvLyBtYWtlIHRoZSBjaGVja2JveCBlZGl0b3IgYWN0IGxpa2UgYSByZWd1bGFyIGNoZWNrYm94IHRoYXQgY29tbWl0IHRoZSB2YWx1ZSBvbiBjbGlja1xuICAgIGlmICh0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQpIHtcbiAgICAgIHRoaXMuJGlucHV0LmNsaWNrKCgpID0+IHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGlucHV0LnJlbW92ZSgpO1xuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy4kaW5wdXQuaGlkZSgpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLiRpbnB1dC5zaG93KCk7XG4gIH1cblxuICBsb2FkVmFsdWUoaXRlbTogYW55KSB7XG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSAhIWl0ZW1bdGhpcy5jb2x1bW5EZWYuZmllbGRdO1xuICAgIGlmICh0aGlzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgdGhpcy4kaW5wdXQucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRpbnB1dC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHByZUNsaWNrKCkge1xuICAgIHRoaXMuJGlucHV0LnByb3AoJ2NoZWNrZWQnLCAhdGhpcy4kaW5wdXQucHJvcCgnY2hlY2tlZCcpKTtcbiAgfVxuXG4gIHNlcmlhbGl6ZVZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLiRpbnB1dC5wcm9wKCdjaGVja2VkJyk7XG4gIH1cblxuICBhcHBseVZhbHVlKGl0ZW06IGFueSwgc3RhdGU6IGFueSkge1xuICAgIGl0ZW1bdGhpcy5jb2x1bW5EZWYuZmllbGRdID0gc3RhdGU7XG4gIH1cblxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcbiAgICByZXR1cm4gKHRoaXMuc2VyaWFsaXplVmFsdWUoKSAhPT0gdGhpcy5kZWZhdWx0VmFsdWUpO1xuICB9XG5cbiAgdmFsaWRhdGUoKTogRWRpdG9yVmFsaWRhdG9yT3V0cHV0IHtcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy4kaW5wdXQgJiYgdGhpcy4kaW5wdXQudmFsICYmIHRoaXMuJGlucHV0LnZhbCgpO1xuICAgICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdHMgPSB0aGlzLnZhbGlkYXRvcih2YWx1ZSwgdGhpcy5hcmdzKTtcbiAgICAgIGlmICghdmFsaWRhdGlvblJlc3VsdHMudmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25SZXN1bHRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbHdheXMgdmFsaWRcbiAgICAvLyBpZiB1c2VyIHdhbnQgaXQgdG8gYmUgYSByZXF1aXJlZCBjaGVja2JveCwgaGUgd291bGQgaGF2ZSB0byBwcm92aWRlIGhpcyBvd24gdmFsaWRhdG9yXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgbXNnOiBudWxsXG4gICAgfTtcbiAgfVxufVxuIl19