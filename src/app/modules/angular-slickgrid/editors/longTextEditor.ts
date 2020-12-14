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
  LongTextEditorOption,
} from './../models/index';
import { getDescendantProperty, getHtmlElementOffset, getTranslationPrefix, setDeepValue } from '../services/utilities';
import { textValidator } from '../editorValidators/textValidator';

// using external non-typed js libraries
declare const $: any;

/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class LongTextEditor implements Editor {
  private _locales: Locale;
  private _$textarea: any;
  private _$currentLengthElm: any;
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

  get editorOptions(): LongTextEditorOption {
    return this.columnEditor && this.columnEditor.editorOptions || {};
  }

  get hasAutoCommitEdit() {
    return this.grid.getOptions().autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator | undefined {
    return (this.columnEditor && this.columnEditor.validator) || (this.columnDef && this.columnDef.validator);
  }

  init(): void {
    let cancelText = '';
    let saveText = '';

    if (this._translate && this._translate.instant && this.gridOptions.enableTranslate) {
      const translationPrefix = getTranslationPrefix(this.gridOptions);
      const cancelKey = this.editorOptions.buttonTexts && this.editorOptions.buttonTexts.cancelKey || `${translationPrefix}CANCEL`;
      const saveKey = this.editorOptions.buttonTexts && this.editorOptions.buttonTexts.saveKey || `${translationPrefix}SAVE`;
      cancelText = this._translate.instant(`${translationPrefix}${cancelKey}`);
      saveText = this._translate.instant(`${translationPrefix}${saveKey}`);
    } else {
      cancelText = this.editorOptions.buttonTexts && this.editorOptions.buttonTexts.cancel || this._locales && this._locales.TEXT_CANCEL || 'Cancel';
      saveText = this.editorOptions.buttonTexts && this.editorOptions.buttonTexts.save || this._locales && this._locales.TEXT_SAVE || 'Save';
    }

    const columnId = this.columnDef && this.columnDef.id;
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
    const title = this.columnEditor && this.columnEditor.title || '';
    const maxLength = this.columnEditor && this.columnEditor.maxLength;
    const textAreaCols = this.editorOptions && this.editorOptions.cols || 40;
    const textAreaRows = this.editorOptions && this.editorOptions.rows || 4;

    const $container = $('body');
    this._$wrapper = $(`<div class="slick-large-editor-text editor-${columnId}" />`).appendTo($container);
    this._$textarea = $(`<textarea hidefocus cols="${textAreaCols}" rows="${textAreaRows}" placeholder="${placeholder}" title="${title}">`).appendTo(this._$wrapper);

    const editorFooterElm = $(`<div class="editor-footer"/>`);
    const countContainerElm = $(`<span class="counter"/>`);
    this._$currentLengthElm = $(`<span class="text-length">0</span>`);
    this._$currentLengthElm.appendTo(countContainerElm);
    if (maxLength !== undefined) {
      const textMaxLengthElm = $(`<span class="separator">/</span><span class="max-length">${maxLength}</span>`);
      textMaxLengthElm.appendTo(countContainerElm);
    }

    const cancelBtnElm = $(`<button class="btn btn-cancel btn-default btn-xs">${cancelText}</button>`);
    const saveBtnElm = $(`<button class="btn btn-save btn-primary btn-xs">${saveText}</button>`);
    countContainerElm.appendTo(editorFooterElm);
    cancelBtnElm.appendTo(editorFooterElm);
    saveBtnElm.appendTo(editorFooterElm);
    editorFooterElm.appendTo(this._$wrapper);

    this._$wrapper.find('.btn-save').on('click', () => this.save());
    this._$wrapper.find('.btn-cancel').on('click', () => this.cancel());
    this._$textarea.on('keydown', this.handleKeyDown.bind(this));
    this._$textarea.on('input', this.handleOnInputChange.bind(this));
    this._$textarea.on('paste', this.handleOnInputChange.bind(this));

    this.position(this.args && this.args.position);
    this._$textarea.focus().select();
  }

  cancel() {
    const value = this.defaultValue || '';
    this._$textarea.val(value);
    this._$currentLengthElm.text(value.length);
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
    if (this._$textarea) {
      this._$textarea.off('keydown');
      this._$textarea.off('input');
      this._$textarea.off('paste');
    }
    if (this._$wrapper) {
      this._$wrapper.find('.btn-save').off('click');
      this._$wrapper.find('.btn-cancel').off('click');
      this._$wrapper.remove();
    }
    this._$wrapper = null;
  }

  focus() {
    this._$textarea.focus();
  }

  getValue(): string {
    return this._$textarea.val();
  }

  setValue(val: string) {
    this._$textarea.val(val);
    this._$currentLengthElm.text(val.length);
  }

  applyValue(item: any, state: any) {
    const fieldName = this.columnDef && this.columnDef.field;
    const isComplexObject = fieldName && fieldName.indexOf('.') > 0; // is the field a complex object, "address.streetNumber"

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

  isValueChanged(): boolean {
    const elmValue = this._$textarea.val();
    return (!(elmValue === '' && (this.defaultValue === null || this.defaultValue === undefined))) && (elmValue !== this.defaultValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    if (item && fieldName !== undefined) {
      // is the field a complex object, "address.streetNumber"
      const isComplexObject = fieldName && fieldName.indexOf('.') > 0;
      const value = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];

      this.defaultValue = value || '';
      this._$textarea.val(this.defaultValue);
      this._$currentLengthElm.text(this.defaultValue.length);
      this._$textarea[0].defaultValue = this.defaultValue;
      this._$textarea.select();
    }
  }

  /**
   * Reposition the LongText Editor to be right over the cell, so that it looks like we opened the editor on top of the cell when in reality we just reposition (absolute) over the cell.
   * By default we use an "auto" mode which will allow to position the LongText Editor to the best logical position in the window, also when we say position, we are talking about the relative position against the grid cell.
   * We can assume that in 80% of the time the default position is bottom right, the default is "auto" but we can also override this and use a specific position.
   * Most of the time positioning of the editor will be to the "right" of the cell is ok but if our column is completely on the right side then we'll want to change the position to "left" align.
   * Same goes for the top/bottom position, Most of the time positioning the editor to the "bottom" but we are clicking on a cell at the bottom of the grid then we might need to reposition to "top" instead.
   * NOTE: this only applies to Inline Editing and will not have any effect when using the Composite Editor modal window.
   */
  position(parentPosition: HtmlElementPosition) {
    const containerOffset = getHtmlElementOffset(this.args.container);
    const containerHeight = this.args.container.offsetHeight;
    const containerWidth = this.args.container.offsetWidth;
    const calculatedEditorHeight = this._$wrapper.height() || this.args.position.height;
    const calculatedEditorWidth = this._$wrapper.width() || this.args.position.width;
    const calculatedBodyHeight = document.body.offsetHeight || window.innerHeight; // body height/width might be 0 if so use the window height/width
    const calculatedBodyWidth = document.body.offsetWidth || window.innerWidth;

    // first defined position will be bottom/right (which will position the editor completely over the cell)
    let newPositionTop = containerOffset !== undefined && containerOffset.top || parentPosition.top || 0;
    let newPositionLeft = containerOffset !== undefined && containerOffset.left || parentPosition.left || 0;

    // user could explicitely use a "left" position (when user knows his column is completely on the right)
    // or when using "auto" and we detect not enough available space then we'll position to the "left" of the cell
    const position = this.editorOptions && this.editorOptions.position || 'auto';
    if (position === 'left' || (position === 'auto' && (newPositionLeft + calculatedEditorWidth) > calculatedBodyWidth)) {
      const marginRightAdjustment = this.editorOptions && this.editorOptions.marginRight || 15;
      newPositionLeft -= (calculatedEditorWidth - containerWidth + marginRightAdjustment);
    }

    // do the same calculation/reposition with top/bottom (default is bottom of the cell or in other word starting from the cell going down)
    if (position === 'top' || (position === 'auto' && (newPositionTop + calculatedEditorHeight) > calculatedBodyHeight)) {
      newPositionTop -= (calculatedEditorHeight - containerHeight);
    }


    // reposition the editor over the cell (90% of the time this will end up using a position on the "right" of the cell)
    this._$wrapper
      .css('top', newPositionTop)
      .css('left', newPositionLeft);
  }

  save() {
    const validation = this.validate();
    const isValid = (validation && validation.valid) || false;

    if (this.hasAutoCommitEdit && isValid) {
      // do not use args.commitChanges() as this sets the focus to the next row.
      // also the select list will stay shown when clicking off the grid
      this.grid.getEditorLock().commitCurrentEdit();
    } else {
      this.args.commitChanges();
    }
  }

  serializeValue() {
    return this._$textarea.val();
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const elmValue = (inputValue !== undefined) ? inputValue : this._$textarea && this._$textarea.val && this._$textarea.val();
    return textValidator(elmValue, {
      editorArgs: this.args,
      errorMessage: this.columnEditor.errorMessage,
      minLength: this.columnEditor.minLength,
      maxLength: this.columnEditor.maxLength,
      operatorConditionalType: this.columnEditor.operatorConditionalType,
      required: this.columnEditor.required,
      validator: this.validator,
    });
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

  /** On every input change event, we'll update the current text length counter */
  private handleOnInputChange(event: JQuery.Event & { originalEvent: any, target: HTMLTextAreaElement }) {
    const maxLength = this.columnEditor && this.columnEditor.maxLength;

    // when user defines a maxLength, we'll make sure that it doesn't go over this limit if so then truncate the text (disregard the extra text)
    let isTruncated = false;
    if (maxLength) {
      isTruncated = this.truncateText(this._$textarea, maxLength);
    }

    // if the text get truncated then update text length as maxLength, else update text length with actual
    if (isTruncated) {
      this._$currentLengthElm.text(maxLength);
    } else {
      const newText = event.type === 'paste' ? event.originalEvent.clipboardData.getData('text') : event.target.value;
      this._$currentLengthElm.text(newText.length);
    }
  }

  /**
   * Truncate text if the value is longer than the acceptable max length
   * @param $inputElm - textarea jQuery element
   * @param maxLength - max acceptable length
   * @returns truncated - returns True if it truncated or False otherwise
   */
  private truncateText($inputElm: JQuery<HTMLTextAreaElement>, maxLength: number): boolean {
    const text = $inputElm.val() + '';
    if (text.length > maxLength) {
      $inputElm.val(text.substring(0, maxLength));
      return true;
    }
    return false;
  }
}
