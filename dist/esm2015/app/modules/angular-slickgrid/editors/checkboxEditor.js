/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CheckboxEditor {
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
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        this.$input = $(`<input type="checkbox" value="true" class="editor-checkbox editor-${fieldId}" />`);
        this.$input.appendTo(this.args.container);
        this.$input.focus();
        // make the checkbox editor act like a regular checkbox that commit the value on click
        if (this.args.grid.getOptions().autoCommitEdit) {
            this.$input.click(() => this.args.grid.getEditorLock().commitCurrentEdit());
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$input.remove();
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
    hide() {
        this.$input.hide();
    }
    /**
     * @return {?}
     */
    show() {
        this.$input.show();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultValue = !!item[this.columnDef.field];
        if (this.defaultValue) {
            this.$input.prop('checked', true);
        }
        else {
            this.$input.prop('checked', false);
        }
    }
    /**
     * @return {?}
     */
    preClick() {
        this.$input.prop('checked', !this.$input.prop('checked'));
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return this.$input.prop('checked');
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
        return (this.serializeValue() !== this.defaultValue);
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
    CheckboxEditor.prototype.$input;
    /** @type {?} */
    CheckboxEditor.prototype.defaultValue;
    /**
     * @type {?}
     * @private
     */
    CheckboxEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvY2hlY2tib3hFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFTQSxNQUFNLE9BQU8sY0FBYzs7OztJQUl6QixZQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFHRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQztJQUM1RyxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDakUsQ0FBQzs7OztJQUVELElBQUk7O2NBQ0ksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLHFFQUFxRSxPQUFPLE1BQU0sQ0FBQyxDQUFDO1FBQ3BHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVwQixzRkFBc0Y7UUFDdEYsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxjQUFjLEVBQUU7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1NBQzdFO0lBQ0gsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLElBQVM7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBUyxFQUFFLEtBQVU7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7O2tCQUNaLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFOztrQkFDM0QsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFO2dCQUM1QixPQUFPLGlCQUFpQixDQUFDO2FBQzFCO1NBQ0Y7UUFFRCx3Q0FBd0M7UUFDeEMsd0ZBQXdGO1FBQ3hGLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQztJQUNKLENBQUM7Q0FDRjs7O0lBM0ZDLGdDQUFZOztJQUNaLHNDQUFzQjs7Ozs7SUFFViw4QkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEVkaXRvciwgRWRpdG9yVmFsaWRhdG9yLCBFZGl0b3JWYWxpZGF0b3JPdXRwdXQgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuLypcbiAqIEFuIGV4YW1wbGUgb2YgYSAnZGV0YWNoZWQnIGVkaXRvci5cbiAqIEtleURvd24gZXZlbnRzIGFyZSBhbHNvIGhhbmRsZWQgdG8gcHJvdmlkZSBoYW5kbGluZyBmb3IgVGFiLCBTaGlmdC1UYWIsIEVzYyBhbmQgQ3RybC1FbnRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIENoZWNrYm94RWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcbiAgJGlucHV0OiBhbnk7XG4gIGRlZmF1bHRWYWx1ZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqIEdldCBDb2x1bW4gRGVmaW5pdGlvbiBvYmplY3QgKi9cbiAgZ2V0IGNvbHVtbkRlZigpOiBDb2x1bW4ge1xuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cbiAgZ2V0IGNvbHVtbkVkaXRvcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIFZhbGlkYXRvciBmdW5jdGlvbiwgY2FuIGJlIHBhc3NlZCBpbiBFZGl0b3IgcHJvcGVydHkgb3IgQ29sdW1uIERlZmluaXRpb24gKi9cbiAgZ2V0IHZhbGlkYXRvcigpOiBFZGl0b3JWYWxpZGF0b3Ige1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgdGhpcy4kaW5wdXQgPSAkKGA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJ0cnVlXCIgY2xhc3M9XCJlZGl0b3ItY2hlY2tib3ggZWRpdG9yLSR7ZmllbGRJZH1cIiAvPmApO1xuICAgIHRoaXMuJGlucHV0LmFwcGVuZFRvKHRoaXMuYXJncy5jb250YWluZXIpO1xuICAgIHRoaXMuJGlucHV0LmZvY3VzKCk7XG5cbiAgICAvLyBtYWtlIHRoZSBjaGVja2JveCBlZGl0b3IgYWN0IGxpa2UgYSByZWd1bGFyIGNoZWNrYm94IHRoYXQgY29tbWl0IHRoZSB2YWx1ZSBvbiBjbGlja1xuICAgIGlmICh0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQpIHtcbiAgICAgIHRoaXMuJGlucHV0LmNsaWNrKCgpID0+IHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuJGlucHV0LnJlbW92ZSgpO1xuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy4kaW5wdXQuaGlkZSgpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLiRpbnB1dC5zaG93KCk7XG4gIH1cblxuICBsb2FkVmFsdWUoaXRlbTogYW55KSB7XG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSAhIWl0ZW1bdGhpcy5jb2x1bW5EZWYuZmllbGRdO1xuICAgIGlmICh0aGlzLmRlZmF1bHRWYWx1ZSkge1xuICAgICAgdGhpcy4kaW5wdXQucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRpbnB1dC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHByZUNsaWNrKCkge1xuICAgIHRoaXMuJGlucHV0LnByb3AoJ2NoZWNrZWQnLCAhdGhpcy4kaW5wdXQucHJvcCgnY2hlY2tlZCcpKTtcbiAgfVxuXG4gIHNlcmlhbGl6ZVZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLiRpbnB1dC5wcm9wKCdjaGVja2VkJyk7XG4gIH1cblxuICBhcHBseVZhbHVlKGl0ZW06IGFueSwgc3RhdGU6IGFueSkge1xuICAgIGl0ZW1bdGhpcy5jb2x1bW5EZWYuZmllbGRdID0gc3RhdGU7XG4gIH1cblxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcbiAgICByZXR1cm4gKHRoaXMuc2VyaWFsaXplVmFsdWUoKSAhPT0gdGhpcy5kZWZhdWx0VmFsdWUpO1xuICB9XG5cbiAgdmFsaWRhdGUoKTogRWRpdG9yVmFsaWRhdG9yT3V0cHV0IHtcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy4kaW5wdXQgJiYgdGhpcy4kaW5wdXQudmFsICYmIHRoaXMuJGlucHV0LnZhbCgpO1xuICAgICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdHMgPSB0aGlzLnZhbGlkYXRvcih2YWx1ZSwgdGhpcy5hcmdzKTtcbiAgICAgIGlmICghdmFsaWRhdGlvblJlc3VsdHMudmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25SZXN1bHRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbHdheXMgdmFsaWRcbiAgICAvLyBpZiB1c2VyIHdhbnQgaXQgdG8gYmUgYSByZXF1aXJlZCBjaGVja2JveCwgaGUgd291bGQgaGF2ZSB0byBwcm92aWRlIGhpcyBvd24gdmFsaWRhdG9yXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgbXNnOiBudWxsXG4gICAgfTtcbiAgfVxufVxuIl19