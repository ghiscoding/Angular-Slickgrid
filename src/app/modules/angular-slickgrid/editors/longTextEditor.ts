import { TranslateService } from '@ngx-translate/core';
import { Constants } from './../constants';
import {
  Column,
  ColumnEditor,
  Editor,
  EditorArguments,
  EditorValidator,
  EditorValidatorOutput,
  GridOption,
  HtmlElementPosition,
  KeyCode,
  Locale,
} from './../models/index';
import { getDescendantProperty, setDeepValue } from '../services/utilities';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class LongTextEditor implements Editor {
  private _locales: Locale;
  private _$textarea: any;
  private _$wrapper: any;
  defaultValue: any;

  /** SlickGrid Grid object */
  grid: any;

  /** Grid options */
  gridOptions: GridOption;

  /** The translate library */
  private _translate: TranslateService;

  constructor(private args: EditorArguments) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.');
    }
    this.grid = args.grid;
    this.gridOptions = args.grid && args.grid.getOptions() as GridOption;
    const options = this.gridOptions || this.args.column.params || {};
    if (options && options.i18n instanceof TranslateService) {
      this._translate = options.i18n;
    }
    // get locales provided by user in forRoot or else use default English locales via the Constants
    this._locales = this.gridOptions && this.gridOptions.locales || Constants.locales;

    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column | undefined {
    return this.args && this.args.column;
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef && this.columnDef.internalColumnEditor || {};
  }

  /** Get the Editor DOM Element */
  get editorDomElement(): any {
    return this._$textarea;
  }

  get hasAutoCommitEdit() {
    return this.grid.getOptions().autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    const columnId = this.columnDef && this.columnDef.id;
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
    const title = this.columnEditor && this.columnEditor.title || '';
    const cancelText = this._translate && this._translate.instant && this._translate.instant('CANCEL') || this._locales && this._locales.TEXT_CANCEL;
    const saveText = this._translate && this._translate.instant && this._translate.instant('SAVE') || this._locales && this._locales.TEXT_SAVE;
    const $container = $('body');

    this._$wrapper = $(`<div class="slick-large-editor-text editor-${columnId}" />`).appendTo($container);
    this._$textarea = $(`<textarea hidefocus rows="5" placeholder="${placeholder}" title="${title}">`).appendTo(this._$wrapper);

    // the lib does not get the focus out event for some reason
    // so register it here
    if (this.hasAutoCommitEdit) {
      this._$textarea.on('focusout', () => this.save());
    }

    $(`<div class="editor-footer">
          <button class="btn btn-save btn-primary btn-xs">${saveText}</button>
          <button class="btn btn-cancel btn-default btn-xs">${cancelText}</button>
      </div>`).appendTo(this._$wrapper);

    this._$wrapper.find('.btn-save').on('click', () => this.save());
    this._$wrapper.find('.btn-cancel').on('click', () => this.cancel());
    this._$textarea.on('keydown', this.handleKeyDown.bind(this));

    this.position(this.args && this.args.position);
    this._$textarea.focus().select();
  }

  cancel() {
    this._$textarea.val(this.defaultValue);
    if (this.args && this.args.cancelChanges) {
      this.args.cancelChanges();
    }
  }

  hide() {
    this._$wrapper.hide();
  }

  show() {
    this._$wrapper.show();
  }

  destroy() {
    this._$wrapper.off('keydown focusout').remove();
  }

  focus() {
    this._$textarea.focus();
  }

  getValue(): string {
    return this._$textarea.val();
  }

  setValue(val: string) {
    this._$textarea.val(val);
  }

  applyValue(item: any, state: any) {
    const fieldName = this.columnDef && this.columnDef.field;
    const isComplexObject = fieldName.indexOf('.') > 0; // is the field a complex object, "address.streetNumber"

    // validate the value before applying it (if not valid we'll set an empty string)
    const validation = this.validate(state);
    const newValue = (validation && validation.valid) ? state : '';

    // set the new value to the item datacontext
    if (isComplexObject) {
      setDeepValue(item, fieldName, newValue);
    } else {
      item[fieldName] = newValue;
    }
  }

  isValueChanged() {
    return (!(this._$textarea.val() === '' && this.defaultValue === null)) && (this._$textarea.val() !== this.defaultValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    // is the field a complex object, "address.streetNumber"
    const isComplexObject = fieldName.indexOf('.') > 0;

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || isComplexObject)) {
      const value = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];
      this.defaultValue = value;
      this._$textarea.val(this.defaultValue);
      this._$textarea[0].defaultValue = this.defaultValue;
      this._$textarea.select();
    }
  }

  position(position: HtmlElementPosition) {
    this._$wrapper
      .css('top', (position.top || 0) - 5)
      .css('left', (position.left || 0) - 5);
  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid && this.isValueChanged()) {
      if (this.hasAutoCommitEdit) {
        this.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  serializeValue() {
    return this._$textarea.val();
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const isRequired = this.columnEditor.required;
    const elmValue = (inputValue !== undefined) ? inputValue : this._$textarea && this._$textarea.val && this._$textarea.val();
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

  // --
  // private functions
  // ------------------

  private handleKeyDown(event: KeyboardEvent) {
    const keyCode = event.keyCode || event.code;
    if (keyCode === KeyCode.ENTER && event.ctrlKey) {
      this.save();
    } else if (keyCode === KeyCode.ESCAPE) {
      event.preventDefault();
      this.cancel();
    } else if (keyCode === KeyCode.TAB && event.shiftKey) {
      event.preventDefault();
      if (this.args && this.grid) {
        this.grid.navigatePrev();
      }
    } else if (keyCode === KeyCode.TAB) {
      event.preventDefault();
      if (this.args && this.grid) {
        this.grid.navigateNext();
      }
    }
  }
}
