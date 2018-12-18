/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from './../constants';
import { KeyCode } from './../models/index';
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
var /*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
IntegerEditor = /** @class */ (function () {
    function IntegerEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(IntegerEditor.prototype, "columnDef", {
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
    Object.defineProperty(IntegerEditor.prototype, "columnEditor", {
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
    Object.defineProperty(IntegerEditor.prototype, "hasAutoCommitEdit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntegerEditor.prototype, "validator", {
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
    IntegerEditor.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        this.$input = $("<input type=\"number\" class=\"editor-text editor-" + fieldId + "\" />")
            .appendTo(this.args.container)
            .on('keydown.nav', function (e) {
            if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
                e.stopImmediatePropagation();
            }
        });
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$input.on('focusout', function () { return _this.save(); });
        }
        setTimeout(function () {
            _this.$input.focus().select();
        }, 50);
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$input.remove();
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.getColumnEditor = /**
     * @return {?}
     */
    function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    IntegerEditor.prototype.loadValue = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.defaultValue = parseInt(item[this.args.column.field], 10);
        this.$input.val(this.defaultValue);
        this.$input[0].defaultValue = this.defaultValue;
        this.$input.select();
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.serializeValue = /**
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
    IntegerEditor.prototype.applyValue = /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    function (item, state) {
        item[this.args.column.field] = state;
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elmValue = this.$input.val();
        /** @type {?} */
        var value = isNaN(elmValue) ? elmValue : parseInt(elmValue, 10);
        return (!(value === '' && this.defaultValue === null)) && (value !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    IntegerEditor.prototype.save = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var validation = this.validate();
        if (validation && validation.valid) {
            if (this.hasAutoCommitEdit) {
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
    IntegerEditor.prototype.validate = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elmValue = this.$input.val();
        /** @type {?} */
        var errorMsg = this.columnEditor.params && this.columnEditor.errorMessage;
        if (this.validator) {
            /** @type {?} */
            var validationResults = this.validator(elmValue, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        else if (isNaN((/** @type {?} */ (elmValue))) || !/^[+-]?\d+$/.test(elmValue)) {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_EDITOR_VALID_INTEGER
            };
        }
        return {
            valid: true,
            msg: null
        };
    };
    return IntegerEditor;
}());
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export { IntegerEditor };
if (false) {
    /** @type {?} */
    IntegerEditor.prototype.$input;
    /** @type {?} */
    IntegerEditor.prototype.defaultValue;
    /**
     * @type {?}
     * @private
     */
    IntegerEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlckVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZWRpdG9ycy9pbnRlZ2VyRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUEwRCxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFTcEc7Ozs7O0lBSUUsdUJBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFHRCxzQkFBSSxvQ0FBUztRQURiLG1DQUFtQzs7Ozs7UUFDbkM7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksdUNBQVk7UUFEaEIsK0JBQStCOzs7OztRQUMvQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO1FBQzVHLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQWlCOzs7O1FBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDcEQsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxvQ0FBUztRQURiLHdGQUF3Rjs7Ozs7UUFDeEY7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ2pFLENBQUM7OztPQUFBOzs7O0lBRUQsNEJBQUk7OztJ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QWlIQzs7Ozs7Ozs7SUFoSEMsK0JBQVk7O0lBQ1oscUNBQWtCOzs7OztJQUVOLDZCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IENvbHVtbiwgRWRpdG9yLCBFZGl0b3JWYWxpZGF0b3IsIEVkaXRvclZhbGlkYXRvck91dHB1dCwgS2V5Q29kZSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuXG4vKlxuICogQW4gZXhhbXBsZSBvZiBhICdkZXRhY2hlZCcgZWRpdG9yLlxuICogS2V5RG93biBldmVudHMgYXJlIGFsc28gaGFuZGxlZCB0byBwcm92aWRlIGhhbmRsaW5nIGZvciBUYWIsIFNoaWZ0LVRhYiwgRXNjIGFuZCBDdHJsLUVudGVyLlxuICovXG5leHBvcnQgY2xhc3MgSW50ZWdlckVkaXRvciBpbXBsZW1lbnRzIEVkaXRvciB7XG4gICRpbnB1dDogYW55O1xuICBkZWZhdWx0VmFsdWU6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqIEdldCBDb2x1bW4gRGVmaW5pdGlvbiBvYmplY3QgKi9cbiAgZ2V0IGNvbHVtbkRlZigpOiBDb2x1bW4ge1xuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cbiAgZ2V0IGNvbHVtbkVkaXRvcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCB7fTtcbiAgfVxuXG4gIGdldCBoYXNBdXRvQ29tbWl0RWRpdCgpIHtcbiAgICByZXR1cm4gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0O1xuICB9XG5cbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLnZhbGlkYXRvciB8fCB0aGlzLmNvbHVtbkRlZi52YWxpZGF0b3I7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcbiAgICB0aGlzLiRpbnB1dCA9ICQoYDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJlZGl0b3ItdGV4dCBlZGl0b3ItJHtmaWVsZElkfVwiIC8+YClcbiAgICAgIC5hcHBlbmRUbyh0aGlzLmFyZ3MuY29udGFpbmVyKVxuICAgICAgLm9uKCdrZXlkb3duLm5hdicsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IEtleUNvZGUuTEVGVCB8fCBlLmtleUNvZGUgPT09IEtleUNvZGUuUklHSFQpIHtcbiAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIHRoZSBsaWIgZG9lcyBub3QgZ2V0IHRoZSBmb2N1cyBvdXQgZXZlbnQgZm9yIHNvbWUgcmVhc29uXG4gICAgLy8gc28gcmVnaXN0ZXIgaXQgaGVyZVxuICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XG4gICAgICB0aGlzLiRpbnB1dC5vbignZm9jdXNvdXQnLCAoKSA9PiB0aGlzLnNhdmUoKSk7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLiRpbnB1dC5mb2N1cygpLnNlbGVjdCgpO1xuICAgIH0sIDUwKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy4kaW5wdXQucmVtb3ZlKCk7XG4gIH1cblxuICBmb2N1cygpIHtcbiAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xuICB9XG5cbiAgZ2V0Q29sdW1uRWRpdG9yKCkge1xuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuYXJncy5jb2x1bW4uaW50ZXJuYWxDb2x1bW5FZGl0b3I7XG4gIH1cblxuICBsb2FkVmFsdWUoaXRlbTogYW55KSB7XG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBwYXJzZUludChpdGVtW3RoaXMuYXJncy5jb2x1bW4uZmllbGRdLCAxMCk7XG4gICAgdGhpcy4kaW5wdXQudmFsKHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICB0aGlzLiRpbnB1dFswXS5kZWZhdWx0VmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcbiAgICB0aGlzLiRpbnB1dC5zZWxlY3QoKTtcbiAgfVxuXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xuICAgIHJldHVybiBwYXJzZUludCh0aGlzLiRpbnB1dC52YWwoKSBhcyBzdHJpbmcsIDEwKSB8fCAwO1xuICB9XG5cbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcbiAgICBpdGVtW3RoaXMuYXJncy5jb2x1bW4uZmllbGRdID0gc3RhdGU7XG4gIH1cblxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcbiAgICBjb25zdCBlbG1WYWx1ZSA9IHRoaXMuJGlucHV0LnZhbCgpO1xuICAgIGNvbnN0IHZhbHVlID0gaXNOYU4oZWxtVmFsdWUpID8gZWxtVmFsdWUgOiBwYXJzZUludChlbG1WYWx1ZSwgMTApO1xuICAgIHJldHVybiAoISh2YWx1ZSA9PT0gJycgJiYgdGhpcy5kZWZhdWx0VmFsdWUgPT09IG51bGwpKSAmJiAodmFsdWUgIT09IHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoKTtcbiAgICBpZiAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICBpZiAodGhpcy5oYXNBdXRvQ29tbWl0RWRpdCkge1xuICAgICAgICB0aGlzLmFyZ3MuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGUoKTogRWRpdG9yVmFsaWRhdG9yT3V0cHV0IHtcbiAgICBjb25zdCBlbG1WYWx1ZSA9IHRoaXMuJGlucHV0LnZhbCgpO1xuICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5jb2x1bW5FZGl0b3IucGFyYW1zICYmIHRoaXMuY29sdW1uRWRpdG9yLmVycm9yTWVzc2FnZTtcblxuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdHMgPSB0aGlzLnZhbGlkYXRvcihlbG1WYWx1ZSwgdGhpcy5hcmdzKTtcbiAgICAgIGlmICghdmFsaWRhdGlvblJlc3VsdHMudmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25SZXN1bHRzO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNOYU4oZWxtVmFsdWUgYXMgbnVtYmVyKSB8fCAhL15bKy1dP1xcZCskLy50ZXN0KGVsbVZhbHVlKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICBtc2c6IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX0VESVRPUl9WQUxJRF9JTlRFR0VSXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIG1zZzogbnVsbFxuICAgIH07XG4gIH1cbn1cbiJdfQ==