import { TranslateService } from '@ngx-translate/core';
import { Constants } from './../constants';
import {
  Column,
  ColumnEditor,
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
  $textarea: any;
  $wrapper: any;
  defaultValue: any;

  /** Grid options */
  gridOptions: GridOption;

  /** The translate library */
  private _translate: TranslateService;

  constructor(private args: any) {
    this.gridOptions = this.args.grid.getOptions() as GridOption;
    const options = this.gridOptions || this.args.column.params || {};
    if (options && options.i18n instanceof TranslateService) {
      this._translate = options.i18n;
    }

    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args && this.args.column || {};
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
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
    const title = this.columnEditor && this.columnEditor.title || '';
    const cancelText = this._translate && this._translate.instant && this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
    const saveText = this._translate && this._translate.instant && this._translate.instant('SAVE') || Constants.TEXT_SAVE;
    const $container = $('body');

    this.$wrapper = $(`<div class="slick-large-editor-text editor-${columnId}" />`).appendTo($container);
    this.$textarea = $(`<textarea hidefocus rows="5" placeholder="${placeholder}" title="${title}">`).appendTo(this.$wrapper);

    // the lib does not get the focus out event for some reason
    // so register it here
    if (this.hasAutoCommitEdit) {
      this.$textarea.on('focusout', () => this.save());
    }

    $(`<div class="editor-footer">
          <button class="btn btn-primary btn-xs">${saveText}</button>
          <button class="btn btn-default btn-xs">${cancelText}</button>
      </div>`).appendTo(this.$wrapper);

    this.$wrapper.find('button:first').on('click', () => this.save());
    this.$wrapper.find('button:last').on('click', () => this.cancel());
    this.$textarea.on('keydown', this.handleKeyDown.bind(this));

    this.position(this.args && this.args.position);
    this.$textarea.focus().select();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.which === KeyCode.ENTER && event.ctrlKey) {
      this.save();
    } else if (event.which === KeyCode.ESCAPE) {
      event.preventDefault();
      this.cancel();
    } else if (event.which === KeyCode.TAB && event.shiftKey) {
      event.preventDefault();
      if (this.args && this.args.grid) {
        this.args.grid.navigatePrev();
      }
    } else if (event.which === KeyCode.TAB) {
      event.preventDefault();
      if (this.args && this.args.grid) {
        this.args.grid.navigateNext();
      }
    }
  }

  cancel() {
    this.$textarea.val(this.defaultValue);
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
    this.$wrapper.off('keydown focusout').remove();
  }

  focus() {
    this.$textarea.focus();
  }

  getValue() {
    return this.$textarea.val();
  }

  setValue(val: string) {
    this.$textarea.val(val);
  }

  getColumnEditor() {
    return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
    const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
      this.defaultValue = item[fieldNameFromComplexObject || fieldName];
      this.$textarea.val(this.defaultValue);
      this.$textarea.select();
    }
  }

  serializeValue() {
    return this.$textarea.val();
  }

  applyValue(item: any, state: any) {
    const fieldName = this.columnDef && this.columnDef.field;
    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
    const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
    const validation = this.validate(state);
    item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
  }


  isValueChanged() {
    return (!(this.$textarea.val() === '' && this.defaultValue === null)) && (this.$textarea.val() !== this.defaultValue);
  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid) {
      if (this.hasAutoCommitEdit) {
        this.args.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    } else {
      this.args.commitChanges();
    }
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const isRequired = this.columnEditor.required;
    const elmValue = (inputValue !== undefined) ? inputValue : this.$textarea && this.$textarea.val && this.$textarea.val();
    const errorMsg = this.columnEditor.errorMessage;

    if (this.validator) {
      return this.validator(elmValue, this.args);
    }

    // by default the editor is almost always valid (except when it's required but not provided)
    if (isRequired && elmValue === '') {
      return {
        valid: false,
        msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
      };
    }

    return {
      valid: true,
      msg: null
    };
  }
}
