/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Constants } from './../constants';
import { KeyCode } from './../models/index';
/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class LongTextEditor {
    /**
     * @param {?} args
     */
    constructor(args) {
        this.args = args;
        this.gridOptions = (/** @type {?} */ (this.args.grid.getOptions()));
        /** @type {?} */
        const options = this.gridOptions || this.args.column.params || {};
        this._translate = options.i18n;
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
    get hasAutoCommitEdit() {
        return this.args.grid.getOptions().autoCommitEdit;
    }
    /**
     * @return {?}
     */
    init() {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const cancelText = this._translate && this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
        /** @type {?} */
        const saveText = this._translate && this._translate.instant('SAVE') || Constants.TEXT_SAVE;
        /** @type {?} */
        const $container = $('body');
        this.$wrapper = $(`<div class="slick-large-editor-text editor-${fieldId}" />`).appendTo($container);
        this.$input = $(`<textarea hidefocus rows="5">`).appendTo(this.$wrapper);
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$input.on('focusout', () => this.save());
        }
        $(`<div class="editor-footer">
          <button class="btn btn-primary btn-xs">${saveText}</button>
          <button class="btn btn-default btn-xs">${cancelText}</button>
      </div>`).appendTo(this.$wrapper);
        this.$wrapper.find('button:first').on('click', () => this.save());
        this.$wrapper.find('button:last').on('click', () => this.cancel());
        this.$input.on('keydown', this.handleKeyDown.bind(this));
        this.position(this.args && this.args.position);
        this.$input.focus().select();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleKeyDown(e) {
        if (e.which === KeyCode.ENTER && e.ctrlKey) {
            this.save();
        }
        else if (e.which === KeyCode.ESCAPE) {
            e.preventDefault();
            this.cancel();
        }
        else if (e.which === KeyCode.TAB && e.shiftKey) {
            e.preventDefault();
            if (this.args && this.args.grid) {
                this.args.grid.navigatePrev();
            }
        }
        else if (e.which === KeyCode.TAB) {
            e.preventDefault();
            if (this.args && this.args.grid) {
                this.args.grid.navigateNext();
            }
        }
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
    cancel() {
        this.$input.val(this.defaultValue);
        if (this.args && this.args.cancelChanges) {
            this.args.cancelChanges();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this.$wrapper.hide();
    }
    /**
     * @return {?}
     */
    show() {
        this.$wrapper.show();
    }
    /**
     * @param {?} position
     * @return {?}
     */
    position(position) {
        this.$wrapper
            .css('top', (position.top || 0) - 5)
            .css('left', (position.left || 0) - 5);
    }
    /**
     * @return {?}
     */
    destroy() {
        this.$wrapper.remove();
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
    getColumnEditor() {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        this.$input.val(this.defaultValue = item[this.columnDef.field]);
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
        item[this.columnDef.field] = state;
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        return (!(this.$input.val() === '' && this.defaultValue == null)) && (this.$input.val() !== this.defaultValue);
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
    LongTextEditor.prototype.$input;
    /** @type {?} */
    LongTextEditor.prototype.$wrapper;
    /** @type {?} */
    LongTextEditor.prototype.defaultValue;
    /**
     * Grid options
     * @type {?}
     */
    LongTextEditor.prototype.gridOptions;
    /**
     * The translate library
     * @type {?}
     * @private
     */
    LongTextEditor.prototype._translate;
    /**
     * @type {?}
     * @private
     */
    LongTextEditor.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZ1RleHRFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvbG9uZ1RleHRFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBT0wsT0FBTyxFQUNSLE1BQU0sbUJBQW1CLENBQUM7Ozs7OztBQVUzQixNQUFNLE9BQU8sY0FBYzs7OztJQVd6QixZQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFjLENBQUM7O2NBQ3ZELE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFO1FBQ2pFLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7Ozs7SUFHRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQztJQUM1RyxDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFT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QUFDLEdBQUcsRUFBRSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTs7a0JBQ1osS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7O2tCQUMzRCxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7Z0JBQzVCLE9BQU8saUJBQWlCLENBQUM7YUFDMUI7U0FDRjtRQUVELHdDQUF3QztRQUN4Qyx3RkFBd0Y7UUFDeEYsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7U0FDVixDQUFDO0lBQ0osQ0FBQztDQUNGOzs7SUFqS0MsZ0NBQVk7O0lBQ1osa0NBQWM7O0lBQ2Qsc0NBQWtCOzs7OztJQUdsQixxQ0FBd0I7Ozs7OztJQUd4QixvQ0FBcUM7Ozs7O0lBRXpCLDhCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vLi4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIENvbHVtbixcbiAgRWRpdG9yLFxuICBFZGl0b3JWYWxpZGF0b3IsXG4gIEVkaXRvclZhbGlkYXRvck91dHB1dCxcbiAgR3JpZE9wdGlvbixcbiAgSHRtbEVsZW1lbnRQb3NpdGlvbixcbiAgS2V5Q29kZVxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuLypcbiAqIEFuIGV4YW1wbGUgb2YgYSAnZGV0YWNoZWQnIGVkaXRvci5cbiAqIFRoZSBVSSBpcyBhZGRlZCBvbnRvIGRvY3VtZW50IEJPRFkgYW5kIC5wb3NpdGlvbigpLCAuc2hvdygpIGFuZCAuaGlkZSgpIGFyZSBpbXBsZW1lbnRlZC5cbiAqIEtleURvd24gZXZlbnRzIGFyZSBhbHNvIGhhbmRsZWQgdG8gcHJvdmlkZSBoYW5kbGluZyBmb3IgVGFiLCBTaGlmdC1UYWIsIEVzYyBhbmQgQ3RybC1FbnRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIExvbmdUZXh0RWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcbiAgJGlucHV0OiBhbnk7XG4gICR3cmFwcGVyOiBhbnk7XG4gIGRlZmF1bHRWYWx1ZTogYW55O1xuXG4gIC8qKiBHcmlkIG9wdGlvbnMgKi9cbiAgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb247XG5cbiAgLyoqIFRoZSB0cmFuc2xhdGUgbGlicmFyeSAqL1xuICBwcml2YXRlIF90cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcmdzOiBhbnkpIHtcbiAgICB0aGlzLmdyaWRPcHRpb25zID0gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpIGFzIEdyaWRPcHRpb247XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ3JpZE9wdGlvbnMgfHwgdGhpcy5hcmdzLmNvbHVtbi5wYXJhbXMgfHwge307XG4gICAgdGhpcy5fdHJhbnNsYXRlID0gb3B0aW9ucy5pMThuO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xuICBnZXQgY29sdW1uRGVmKCk6IENvbHVtbiB7XG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xuICBnZXQgY29sdW1uRWRpdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLnZhbGlkYXRvciB8fCB0aGlzLmNvbHVtbkRlZi52YWxpZGF0b3I7XG4gIH1cblxuICBnZXQgaGFzQXV0b0NvbW1pdEVkaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdDtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0IGNhbmNlbFRleHQgPSB0aGlzLl90cmFuc2xhdGUgJiYgdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQoJ0NBTkNFTCcpIHx8IENvbnN0YW50cy5URVhUX0NBTkNFTDtcbiAgICBjb25zdCBzYXZlVGV4dCA9IHRoaXMuX3RyYW5zbGF0ZSAmJiB0aGlzLl90cmFuc2xhdGUuaW5zdGFudCgnU0FWRScpIHx8IENvbnN0YW50cy5URVhUX1NBVkU7XG4gICAgY29uc3QgJGNvbnRhaW5lciA9ICQoJ2JvZHknKTtcblxuICAgIHRoaXMuJHdyYXBwZXIgPSAkKGA8ZGl2IGNsYXNzPVwic2xpY2stbGFyZ2UtZWRpdG9yLXRleHQgZWRpdG9yLSR7ZmllbGRJZH1cIiAvPmApLmFwcGVuZFRvKCRjb250YWluZXIpO1xuICAgIHRoaXMuJGlucHV0ID0gJChgPHRleHRhcmVhIGhpZGVmb2N1cyByb3dzPVwiNVwiPmApLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xuXG4gICAgLy8gdGhlIGxpYiBkb2VzIG5vdCBnZXQgdGhlIGZvY3VzIG91dCBldmVudCBmb3Igc29tZSByZWFzb25cbiAgICAvLyBzbyByZWdpc3RlciBpdCBoZXJlXG4gICAgaWYgKHRoaXMuaGFzQXV0b0NvbW1pdEVkaXQpIHtcbiAgICAgIHRoaXMuJGlucHV0Lm9uKCdmb2N1c291dCcsICgpID0+IHRoaXMuc2F2ZSgpKTtcbiAgICB9XG5cbiAgICAkKGA8ZGl2IGNsYXNzPVwiZWRpdG9yLWZvb3RlclwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXhzXCI+JHtzYXZlVGV4dH08L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14c1wiPiR7Y2FuY2VsVGV4dH08L2J1dHRvbj5cbiAgICAgIDwvZGl2PmApLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xuXG4gICAgdGhpcy4kd3JhcHBlci5maW5kKCdidXR0b246Zmlyc3QnKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNhdmUoKSk7XG4gICAgdGhpcy4kd3JhcHBlci5maW5kKCdidXR0b246bGFzdCcpLm9uKCdjbGljaycsICgpID0+IHRoaXMuY2FuY2VsKCkpO1xuICAgIHRoaXMuJGlucHV0Lm9uKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5wb3NpdGlvbih0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLnBvc2l0aW9uKTtcbiAgICB0aGlzLiRpbnB1dC5mb2N1cygpLnNlbGVjdCgpO1xuICB9XG5cbiAgaGFuZGxlS2V5RG93bihlOiBhbnkpIHtcbiAgICBpZiAoZS53aGljaCA9PT0gS2V5Q29kZS5FTlRFUiAmJiBlLmN0cmxLZXkpIHtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gS2V5Q29kZS5FU0NBUEUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgfSBlbHNlIGlmIChlLndoaWNoID09PSBLZXlDb2RlLlRBQiAmJiBlLnNoaWZ0S2V5KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy5hcmdzICYmIHRoaXMuYXJncy5ncmlkKSB7XG4gICAgICAgIHRoaXMuYXJncy5ncmlkLm5hdmlnYXRlUHJldigpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gS2V5Q29kZS5UQUIpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICh0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmdyaWQpIHtcbiAgICAgICAgdGhpcy5hcmdzLmdyaWQubmF2aWdhdGVOZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZSgpO1xuICAgIGlmICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjYW5jZWwoKSB7XG4gICAgdGhpcy4kaW5wdXQudmFsKHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICBpZiAodGhpcy5hcmdzICYmIHRoaXMuYXJncy5jYW5jZWxDaGFuZ2VzKSB7XG4gICAgICB0aGlzLmFyZ3MuY2FuY2VsQ2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy4kd3JhcHBlci5oaWRlKCk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuJHdyYXBwZXIuc2hvdygpO1xuICB9XG5cbiAgcG9zaXRpb24ocG9zaXRpb246IEh0bWxFbGVtZW50UG9zaXRpb24pIHtcbiAgICB0aGlzLiR3cmFwcGVyXG4gICAgICAuY3NzKCd0b3AnLCAocG9zaXRpb24udG9wIHx8IDApIC0gNSlcbiAgICAgIC5jc3MoJ2xlZnQnLCAocG9zaXRpb24ubGVmdCB8fCAwKSAtIDUpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLiR3cmFwcGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIGdldENvbHVtbkVkaXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gJiYgdGhpcy5hcmdzLmNvbHVtbi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yO1xuICB9XG5cbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xuICAgIHRoaXMuJGlucHV0LnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSA9IGl0ZW1bdGhpcy5jb2x1bW5EZWYuZmllbGRdKTtcbiAgICB0aGlzLiRpbnB1dC5zZWxlY3QoKTtcbiAgfVxuXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLiRpbnB1dC52YWwoKTtcbiAgfVxuXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KSB7XG4gICAgaXRlbVt0aGlzLmNvbHVtbkRlZi5maWVsZF0gPSBzdGF0ZTtcbiAgfVxuXG4gIGlzVmFsdWVDaGFuZ2VkKCkge1xuICAgIHJldHVybiAoISh0aGlzLiRpbnB1dC52YWwoKSA9PT0gJycgJiYgdGhpcy5kZWZhdWx0VmFsdWUgPT0gbnVsbCkpICYmICh0aGlzLiRpbnB1dC52YWwoKSAhPT0gdGhpcy5kZWZhdWx0VmFsdWUpO1xuICB9XG5cbiAgdmFsaWRhdGUoKTogRWRpdG9yVmFsaWRhdG9yT3V0cHV0IHtcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy4kaW5wdXQgJiYgdGhpcy4kaW5wdXQudmFsICYmIHRoaXMuJGlucHV0LnZhbCgpO1xuICAgICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdHMgPSB0aGlzLnZhbGlkYXRvcih2YWx1ZSwgdGhpcy5hcmdzKTtcbiAgICAgIGlmICghdmFsaWRhdGlvblJlc3VsdHMudmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25SZXN1bHRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbHdheXMgdmFsaWRcbiAgICAvLyBpZiB1c2VyIHdhbnQgaXQgdG8gYmUgYSByZXF1aXJlZCBjaGVja2JveCwgaGUgd291bGQgaGF2ZSB0byBwcm92aWRlIGhpcyBvd24gdmFsaWRhdG9yXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgbXNnOiBudWxsXG4gICAgfTtcbiAgfVxufVxuIl19