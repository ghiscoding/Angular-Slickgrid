import { TranslateService } from '@ngx-translate/core';
import { Constants } from './../constants';
import {
  Column,
  Editor,
  EditorValidator,
  EditorValidatorOutput,
  GridOption,
  HtmlElementPosition,
  KeyCode
} from './../models/index';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class LongTextEditor implements Editor {
  $input: any;
  $wrapper: any;
  defaultValue: any;

  /** Grid options */
  gridOptions: GridOption;

  /** The translate library */
  private _translate: TranslateService;

  constructor(private args: any) {
    this.gridOptions = this.args.grid.getOptions() as GridOption;
    const options = this.gridOptions || this.args.column.params || {};
    this._translate = options.i18n;

    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args && this.args.column || {};
  }

  /** Get Column Editor object */
  get columnEditor(): any {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  get hasAutoCommitEdit() {
    return this.args.grid.getOptions().autoCommitEdit;
  }

  init(): void {
    const columnId = this.columnDef && this.columnDef.id;
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
    const cancelText = this._translate && this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
    const saveText = this._translate && this._translate.instant('SAVE') || Constants.TEXT_SAVE;
    const $container = $('body');

    this.$wrapper = $(`<div class="slick-large-editor-text editor-${columnId}" placeholder="${placeholder}" />`).appendTo($container);
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

  handleKeyDown(e: any) {
    if (e.which === KeyCode.ENTER && e.ctrlKey) {
      this.save();
    } else if (e.which === KeyCode.ESCAPE) {
      e.preventDefault();
      this.cancel();
    } else if (e.which === KeyCode.TAB && e.shiftKey) {
      e.preventDefault();
      if (this.args && this.args.grid) {
        this.args.grid.navigatePrev();
      }
    } else if (e.which === KeyCode.TAB) {
      e.preventDefault();
      if (this.args && this.args.grid) {
        this.args.grid.navigateNext();
      }
    }
  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid) {
      if (this.hasAutoCommitEdit) {
        this.args.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  cancel() {
    this.$input.val(this.defaultValue);
    if (this.args && this.args.cancelChanges) {
      this.args.cancelChanges();
    }
  }

  hide() {
    this.$wrapper.hide();
  }

  show() {
    this.$wrapper.show();
  }

  position(position: HtmlElementPosition) {
    this.$wrapper
      .css('top', (position.top || 0) - 5)
      .css('left', (position.left || 0) - 5);
  }

  destroy() {
    this.$wrapper.remove();
  }

  focus() {
    this.$input.focus();
  }

  getColumnEditor() {
    return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
  }

  loadValue(item: any) {
    this.$input.val(this.defaultValue = item[this.columnDef.field]);
    this.$input.select();
  }

  serializeValue() {
    return this.$input.val();
  }

  applyValue(item: any, state: any) {
    item[this.columnDef.field] = state;
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this.defaultValue == null)) && (this.$input.val() !== this.defaultValue);
  }

  validate(): EditorValidatorOutput {
    if (this.validator) {
      const value = this.$input && this.$input.val && this.$input.val();
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
