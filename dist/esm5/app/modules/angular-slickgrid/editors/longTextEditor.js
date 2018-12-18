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
var /*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
LongTextEditor = /** @class */ (function () {
    function LongTextEditor(args) {
        this.args = args;
        this.gridOptions = (/** @type {?} */ (this.args.grid.getOptions()));
        /** @type {?} */
        var options = this.gridOptions || this.args.column.params || {};
        this._translate = options.i18n;
        this.init();
    }
    Object.defineProperty(LongTextEditor.prototype, "columnDef", {
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
    Object.defineProperty(LongTextEditor.prototype, "columnEditor", {
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
    Object.defineProperty(LongTextEditor.prototype, "validator", {
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
    Object.defineProperty(LongTextEditor.prototype, "hasAutoCommitEdit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    LongTextEditor.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var cancelText = this._translate && this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
        /** @type {?} */
        var saveText = this._translate && this._translate.instant('SAVE') || Constants.TEXT_SAVE;
        /** @type {?} */
        var $container = $('body');
        this.$wrapper = $("<div class=\"slick-large-editor-text editor-" + fieldId + "\" />").appendTo($container);
        this.$input = $("<textarea hidefocus rows=\"5\">").appendTo(this.$wrapper);
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$input.on('focusout', function () { return _this.save(); });
        }
        $("<div class=\"editor-footer\">\n          <button class=\"btn btn-primary btn-xs\">" + saveText + "</button>\n          <button class=\"btn btn-default btn-xs\">" + cancelText + "</button>\n      </div>").appendTo(this.$wrapper);
        this.$wrapper.find('button:first').on('click', function () { return _this.save(); });
        this.$wrapper.find('button:last').on('click', function () { return _this.cancel(); });
        this.$input.on('keydown', this.handleKeyDown.bind(this));
        this.position(this.args && this.args.position);
        this.$input.focus().select();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    LongTextEditor.prototype.handleKeyDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
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
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.save = /**
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
    LongTextEditor.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.$input.val(this.defaultValue);
        if (this.args && this.args.cancelChanges) {
            this.args.cancelChanges();
        }
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.$wrapper.hide();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.show = /**
     * @return {?}
     */
    function () {
        this.$wrapper.show();
    };
    /**
     * @param {?} position
     * @return {?}
     */
    LongTextEditor.prototype.position = /**
     * @param {?} position
     * @return {?}
     */
    function (position) {
        this.$wrapper
            .css('top', (position.top || 0) - 5)
            .css('left', (position.left || 0) - 5);
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.$wrapper.remove();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.$input.focus();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.getColumnEditor = /**
     * @return {?}
     */
    function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    LongTextEditor.prototype.loadValue = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.$input.val(this.defaultValue = item[this.columnDef.field]);
        this.$input.select();
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.serializeValue = /**
     * @return {?}
     */
    function () {
        return this.$input.val();
    };
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    LongTextEditor.prototype.applyValue = /**
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
    LongTextEditor.prototype.isValueChanged = /**
     * @return {?}
     */
    function () {
        return (!(this.$input.val() === '' && this.defaultValue == null)) && (this.$input.val() !== this.defaultValue);
    };
    /**
     * @return {?}
     */
    LongTextEditor.prototype.validate = /**
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
    return LongTextEditor;
}());
/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export { LongTextEditor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZ1RleHRFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvbG9uZ1RleHRFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBT0wsT0FBTyxFQUNSLE1BQU0sbUJBQW1CLENBQUM7Ozs7OztBQVUzQjs7Ozs7O0lBV0Usd0JBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQWMsQ0FBQzs7WUFDdkQsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDakUsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBRS9CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFHRCxzQkFBSSxxQ0FBUztRQURiLG1DQUFtQzs7Ozs7UUFDbkM7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksd0NBQVk7UUFEaEIsK0JBQStCOzs7OztRQUMvQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO1FBQzVHLENBQUM7OztPQUFBO0lBR0Qsc0JBQUkscUNBQVM7UUFEYix3RkFBd0Y7Ozs7O1FBQ3hGO1lB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QUFVO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUNyQyxDQUFDOzs7O0lBRUQsdUNBQWM7OztJQUFkO1FBQ0UsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqSCxDQUFDOzs7O0lBRUQsaUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFOztnQkFDWixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTs7Z0JBQzNELGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDMUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRTtnQkFDNUIsT0FBTyxpQkFBaUIsQ0FBQzthQUMxQjtTQUNGO1FBRUQsd0NBQXdDO1FBQ3hDLHdGQUF3RjtRQUN4RixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtTQUNWLENBQUM7SUFDSixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBbEtELElBa0tDOzs7Ozs7Ozs7SUFqS0MsZ0NBQVk7O0lBQ1osa0NBQWM7O0lBQ2Qsc0NBQWtCOzs7OztJQUdsQixxQ0FBd0I7Ozs7OztJQUd4QixvQ0FBcUM7Ozs7O0lBRXpCLDhCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vLi4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIENvbHVtbixcbiAgRWRpdG9yLFxuICBFZGl0b3JWYWxpZGF0b3IsXG4gIEVkaXRvclZhbGlkYXRvck91dHB1dCxcbiAgR3JpZE9wdGlvbixcbiAgSHRtbEVsZW1lbnRQb3NpdGlvbixcbiAgS2V5Q29kZVxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuLypcbiAqIEFuIGV4YW1wbGUgb2YgYSAnZGV0YWNoZWQnIGVkaXRvci5cbiAqIFRoZSBVSSBpcyBhZGRlZCBvbnRvIGRvY3VtZW50IEJPRFkgYW5kIC5wb3NpdGlvbigpLCAuc2hvdygpIGFuZCAuaGlkZSgpIGFyZSBpbXBsZW1lbnRlZC5cbiAqIEtleURvd24gZXZlbnRzIGFyZSBhbHNvIGhhbmRsZWQgdG8gcHJvdmlkZSBoYW5kbGluZyBmb3IgVGFiLCBTaGlmdC1UYWIsIEVzYyBhbmQgQ3RybC1FbnRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIExvbmdUZXh0RWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcbiAgJGlucHV0OiBhbnk7XG4gICR3cmFwcGVyOiBhbnk7XG4gIGRlZmF1bHRWYWx1ZTogYW55O1xuXG4gIC8qKiBHcmlkIG9wdGlvbnMgKi9cbiAgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb247XG5cbiAgLyoqIFRoZSB0cmFuc2xhdGUgbGlicmFyeSAqL1xuICBwcml2YXRlIF90cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcmdzOiBhbnkpIHtcbiAgICB0aGlzLmdyaWRPcHRpb25zID0gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpIGFzIEdyaWRPcHRpb247XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ3JpZE9wdGlvbnMgfHwgdGhpcy5hcmdzLmNvbHVtbi5wYXJhbXMgfHwge307XG4gICAgdGhpcy5fdHJhbnNsYXRlID0gb3B0aW9ucy5pMThuO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xuICBnZXQgY29sdW1uRGVmKCk6IENvbHVtbiB7XG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xuICBnZXQgY29sdW1uRWRpdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLnZhbGlkYXRvciB8fCB0aGlzLmNvbHVtbkRlZi52YWxpZGF0b3I7XG4gIH1cblxuICBnZXQgaGFzQXV0b0NvbW1pdEVkaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdDtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0IGNhbmNlbFRleHQgPSB0aGlzLl90cmFuc2xhdGUgJiYgdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQoJ0NBTkNFTCcpIHx8IENvbnN0YW50cy5URVhUX0NBTkNFTDtcbiAgICBjb25zdCBzYXZlVGV4dCA9IHRoaXMuX3RyYW5zbGF0ZSAmJiB0aGlzLl90cmFuc2xhdGUuaW5zdGFudCgnU0FWRScpIHx8IENvbnN0YW50cy5URVhUX1NBVkU7XG4gICAgY29uc3QgJGNvbnRhaW5lciA9ICQoJ2JvZHknKTtcblxuICAgIHRoaXMuJHdyYXBwZXIgPSAkKGA8ZGl2IGNsYXNzPVwic2xpY2stbGFyZ2UtZWRpdG9yLXRleHQgZWRpdG9yLSR7ZmllbGRJZH1cIiAvPmApLmFwcGVuZFRvKCRjb250YWluZXIpO1xuICAgIHRoaXMuJGlucHV0ID0gJChgPHRleHRhcmVhIGhpZGVmb2N1cyByb3dzPVwiNVwiPmApLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xuXG4gICAgLy8gdGhlIGxpYiBkb2VzIG5vdCBnZXQgdGhlIGZvY3VzIG91dCBldmVudCBmb3Igc29tZSByZWFzb25cbiAgICAvLyBzbyByZWdpc3RlciBpdCBoZXJlXG4gICAgaWYgKHRoaXMuaGFzQXV0b0NvbW1pdEVkaXQpIHtcbiAgICAgIHRoaXMuJGlucHV0Lm9uKCdmb2N1c291dCcsICgpID0+IHRoaXMuc2F2ZSgpKTtcbiAgICB9XG5cbiAgICAkKGA8ZGl2IGNsYXNzPVwiZWRpdG9yLWZvb3RlclwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXhzXCI+JHtzYXZlVGV4dH08L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi14c1wiPiR7Y2FuY2VsVGV4dH08L2J1dHRvbj5cbiAgICAgIDwvZGl2PmApLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xuXG4gICAgdGhpcy4kd3JhcHBlci5maW5kKCdidXR0b246Zmlyc3QnKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNhdmUoKSk7XG4gICAgdGhpcy4kd3JhcHBlci5maW5kKCdidXR0b246bGFzdCcpLm9uKCdjbGljaycsICgpID0+IHRoaXMuY2FuY2VsKCkpO1xuICAgIHRoaXMuJGlucHV0Lm9uKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5wb3NpdGlvbih0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLnBvc2l0aW9uKTtcbiAgICB0aGlzLiRpbnB1dC5mb2N1cygpLnNlbGVjdCgpO1xuICB9XG5cbiAgaGFuZGxlS2V5RG93bihlOiBhbnkpIHtcbiAgICBpZiAoZS53aGljaCA9PT0gS2V5Q29kZS5FTlRFUiAmJiBlLmN0cmxLZXkpIHtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gS2V5Q29kZS5FU0NBUEUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgfSBlbHNlIGlmIChlLndoaWNoID09PSBLZXlDb2RlLlRBQiAmJiBlLnNoaWZ0S2V5KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy5hcmdzICYmIHRoaXMuYXJncy5ncmlkKSB7XG4gICAgICAgIHRoaXMuYXJncy5ncmlkLm5hdmlnYXRlUHJldigpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS53aGljaCA9PT0gS2V5Q29kZS5UQUIpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICh0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmdyaWQpIHtcbiAgICAgICAgdGhpcy5hcmdzLmdyaWQubmF2aWdhdGVOZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZSgpO1xuICAgIGlmICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgIGlmICh0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hcmdzLmNvbW1pdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjYW5jZWwoKSB7XG4gICAgdGhpcy4kaW5wdXQudmFsKHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICBpZiAodGhpcy5hcmdzICYmIHRoaXMuYXJncy5jYW5jZWxDaGFuZ2VzKSB7XG4gICAgICB0aGlzLmFyZ3MuY2FuY2VsQ2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy4kd3JhcHBlci5oaWRlKCk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuJHdyYXBwZXIuc2hvdygpO1xuICB9XG5cbiAgcG9zaXRpb24ocG9zaXRpb246IEh0bWxFbGVtZW50UG9zaXRpb24pIHtcbiAgICB0aGlzLiR3cmFwcGVyXG4gICAgICAuY3NzKCd0b3AnLCAocG9zaXRpb24udG9wIHx8IDApIC0gNSlcbiAgICAgIC5jc3MoJ2xlZnQnLCAocG9zaXRpb24ubGVmdCB8fCAwKSAtIDUpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLiR3cmFwcGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcbiAgfVxuXG4gIGdldENvbHVtbkVkaXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gJiYgdGhpcy5hcmdzLmNvbHVtbi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yO1xuICB9XG5cbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xuICAgIHRoaXMuJGlucHV0LnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSA9IGl0ZW1bdGhpcy5jb2x1bW5EZWYuZmllbGRdKTtcbiAgICB0aGlzLiRpbnB1dC5zZWxlY3QoKTtcbiAgfVxuXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLiRpbnB1dC52YWwoKTtcbiAgfVxuXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KSB7XG4gICAgaXRlbVt0aGlzLmNvbHVtbkRlZi5maWVsZF0gPSBzdGF0ZTtcbiAgfVxuXG4gIGlzVmFsdWVDaGFuZ2VkKCkge1xuICAgIHJldHVybiAoISh0aGlzLiRpbnB1dC52YWwoKSA9PT0gJycgJiYgdGhpcy5kZWZhdWx0VmFsdWUgPT0gbnVsbCkpICYmICh0aGlzLiRpbnB1dC52YWwoKSAhPT0gdGhpcy5kZWZhdWx0VmFsdWUpO1xuICB9XG5cbiAgdmFsaWRhdGUoKTogRWRpdG9yVmFsaWRhdG9yT3V0cHV0IHtcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy4kaW5wdXQgJiYgdGhpcy4kaW5wdXQudmFsICYmIHRoaXMuJGlucHV0LnZhbCgpO1xuICAgICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdHMgPSB0aGlzLnZhbGlkYXRvcih2YWx1ZSwgdGhpcy5hcmdzKTtcbiAgICAgIGlmICghdmFsaWRhdGlvblJlc3VsdHMudmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25SZXN1bHRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbHdheXMgdmFsaWRcbiAgICAvLyBpZiB1c2VyIHdhbnQgaXQgdG8gYmUgYSByZXF1aXJlZCBjaGVja2JveCwgaGUgd291bGQgaGF2ZSB0byBwcm92aWRlIGhpcyBvd24gdmFsaWRhdG9yXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgbXNnOiBudWxsXG4gICAgfTtcbiAgfVxufVxuIl19