/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { KeyCode } from './../models/index';
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class TextEditor {
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
     * @return {?}
     */
    get hasAutoCommitEdit() {
        return this.args.grid.getOptions().autoCommitEdit;
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
        this.$input = $(`<input type="text" class="editor-text editor-${fieldId}" />`)
            .appendTo(this.args.container)
            .on('keydown.nav', (e) => {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        });
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$input.on('focusout', () => this.save());
        }
        setTimeout(() => {
            this.$input.focus().select();
        }, 50);
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
    getValue() {
        return this.$input.val();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setValue(val) {
        this.$input.val(val);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.defaultValue = item[this.args.column.field] || '';
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$input.select();
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return this.$input.val();
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.args.column.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
    }
    /**
     * @return {?}
     */
    save() {
        /** @type {?} */
        const validation = this.validate();
        if (validation && validation.valid) {
            if (this.hasAutoCommitEdit) {
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
    TextEditor.prototype.$input;
    /** @type {?} */
    TextEditor.prototype.defaultValue;
    /**
     * @type {?}
     * @private
     */
    TextEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZWRpdG9ycy90ZXh0RWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQTBELE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQVNwRyxNQUFNLE9BQU8sVUFBVTs7OztJQUlyQixZQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFHRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQztJQUM1RyxDQUFDOzs7O0lBRUQsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxjQUFjLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxJQUFJOztjQUNJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxnREFBZ0QsT0FBTyxNQUFNLENBQUM7YUFDM0UsUUFBUSxDQUFD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SSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTs7a0JBQzNELGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRTtnQkFDNUIsT0FBTyxpQkFBaUIsQ0FBQzthQUMxQjtTQUNGO1FBRUQsd0NBQXdDO1FBQ3hDLHdGQUF3RjtRQUN4RixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtTQUNWLENBQUM7SUFDSixDQUFDO0NBQ0Y7OztJQTdHQyw0QkFBWTs7SUFDWixrQ0FBa0I7Ozs7O0lBRU4sMEJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBFZGl0b3IsIEVkaXRvclZhbGlkYXRvciwgRWRpdG9yVmFsaWRhdG9yT3V0cHV0LCBLZXlDb2RlIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbi8qXG4gKiBBbiBleGFtcGxlIG9mIGEgJ2RldGFjaGVkJyBlZGl0b3IuXG4gKiBLZXlEb3duIGV2ZW50cyBhcmUgYWxzbyBoYW5kbGVkIHRvIHByb3ZpZGUgaGFuZGxpbmcgZm9yIFRhYiwgU2hpZnQtVGFiLCBFc2MgYW5kIEN0cmwtRW50ZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXh0RWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcbiAgJGlucHV0OiBhbnk7XG4gIGRlZmF1bHRWYWx1ZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXJnczogYW55KSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xuICBnZXQgY29sdW1uRGVmKCk6IENvbHVtbiB7XG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xuICBnZXQgY29sdW1uRWRpdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8IHt9O1xuICB9XG5cbiAgZ2V0IGhhc0F1dG9Db21taXRFZGl0KCkge1xuICAgIHJldHVybiB0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQ7XG4gIH1cblxuICAvKiogR2V0IHRoZSBWYWxpZGF0b3IgZnVuY3Rpb24sIGNhbiBiZSBwYXNzZWQgaW4gRWRpdG9yIHByb3BlcnR5IG9yIENvbHVtbiBEZWZpbml0aW9uICovXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IudmFsaWRhdG9yIHx8IHRoaXMuY29sdW1uRGVmLnZhbGlkYXRvcjtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIHRoaXMuJGlucHV0ID0gJChgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJlZGl0b3ItdGV4dCBlZGl0b3ItJHtmaWVsZElkfVwiIC8+YClcbiAgICAgIC5hcHBlbmRUbyh0aGlzLmFyZ3MuY29udGFpbmVyKVxuICAgICAgLm9uKCdrZXlkb3duLm5hdicsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtleUNvZGUuTEVGVCB8fCBlLmtleUNvZGUgPT09IEtleUNvZGUuUklHSFQpIHtcbiAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIHRoZSBsaWIgZG9lcyBub3QgZ2V0IHRoZSBmb2N1cyBvdXQgZXZlbnQgZm9yIHNvbWUgcmVhc29uXG4gICAgLy8gc28gcmVnaXN0ZXIgaXQgaGVyZVxuICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XG4gICAgICB0aGlzLiRpbnB1dC5vbignZm9jdXNvdXQnLCAoKSA9PiB0aGlzLnNhdmUoKSk7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLiRpbnB1dC5mb2N1cygpLnNlbGVjdCgpO1xuICAgIH0sIDUwKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kaW5wdXQucmVtb3ZlKCk7XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuJGlucHV0LnZhbCgpO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLiRpbnB1dC52YWwodmFsKTtcbiAgfVxuXG4gIGxvYWRWYWx1ZShpdGVtOiBhbnkpIHtcbiAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IGl0ZW1bdGhpcy5hcmdzLmNvbHVtbi5maWVsZF0gfHwgJyc7XG4gICAgdGhpcy4kaW5wdXQudmFsKHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICB0aGlzLiRpbnB1dFswXS5kZWZhdWx0VmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcbiAgICB0aGlzLiRpbnB1dC5zZWxlY3QoKTtcbiAgfVxuXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLiRpbnB1dC52YWwoKTtcbiAgfVxuXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KSB7XG4gICAgaXRlbVt0aGlzLmFyZ3MuY29sdW1uLmZpZWxkXSA9IHN0YXRlO1xuICB9XG5cbiAgaXNWYWx1ZUNoYW5nZWQoKSB7XG4gICAgcmV0dXJuICghKHRoaXMuJGlucHV0LnZhbCgpID09PSAnJyAmJiB0aGlzLmRlZmF1bHRWYWx1ZSA9PT0gbnVsbCkpICYmICh0aGlzLiRpbnB1dC52YWwoKSAhPT0gdGhpcy5kZWZhdWx0VmFsdWUpO1xuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZSgpO1xuICAgIGlmICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZSgpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLiRpbnB1dCAmJiB0aGlzLiRpbnB1dC52YWwgJiYgdGhpcy4kaW5wdXQudmFsKCk7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uUmVzdWx0cyA9IHRoaXMudmFsaWRhdG9yKHZhbHVlLCB0aGlzLmFyZ3MpO1xuICAgICAgaWYgKCF2YWxpZGF0aW9uUmVzdWx0cy52YWxpZCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGlvblJlc3VsdHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYnkgZGVmYXVsdCB0aGUgZWRpdG9yIGlzIGFsd2F5cyB2YWxpZFxuICAgIC8vIGlmIHVzZXIgd2FudCBpdCB0byBiZSBhIHJlcXVpcmVkIGNoZWNrYm94LCBoZSB3b3VsZCBoYXZlIHRvIHByb3ZpZGUgaGlzIG93biB2YWxpZGF0b3JcbiAgICByZXR1cm4ge1xuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBtc2c6IG51bGxcbiAgICB9O1xuICB9XG59XG4iXX0=