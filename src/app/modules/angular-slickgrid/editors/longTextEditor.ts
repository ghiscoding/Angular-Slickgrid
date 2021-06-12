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
  SlickGrid,
} from './../models/index';
import { BindingEventService } from '../services/bindingEvent.service';
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
  protected _bindEventService: BindingEventService;
  protected _defaultTextValue: any;
  protected _locales: Locale;
  protected _timer?: any;
  protected _currentLengthElm!: HTMLSpanElement;
  protected _textareaElm!: HTMLTextAreaElement;
  protected _wrapperElm!: HTMLDivElement;

  /** SlickGrid Grid object */
  grid: SlickGrid;

  /** Grid options */
  gridOptions: GridOption;

  /** The translate library */
  protected _translate?: TranslateService;

  constructor(protected readonly args: EditorArguments) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.');
    }
    this.grid = args.grid;
    this.gridOptions = args.grid.getOptions() as GridOption;
    const options = this.gridOptions || this.args.column.params || {};
    if (options && options.i18n instanceof TranslateService) {
      this._translate = options.i18n;
    }

    // get locales provided by user in forRoot or else use default English locales via the Constants
    this._locales = this.gridOptions && this.gridOptions.locales || Constants.locales;

    this._bindEventService = new BindingEventService();
    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args.column;
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef?.internalColumnEditor ?? {};
  }

  /** Getter for the Editor DOM Element */
  get editorDomElement(): HTMLTextAreaElement {
    return this._textareaElm;
  }

  get editorOptions(): LongTextEditorOption {
    return this.columnEditor?.editorOptions ?? {};
  }

  get hasAutoCommitEdit(): boolean {
    return this.gridOptions.autoCommitEdit ?? false;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator | undefined {
    return this.columnEditor?.validator ?? this.columnDef?.validator;
  }

  init(): void {
    let cancelText = '';
    let saveText = '';
    if (this._translate?.instant && this.gridOptions.enableTranslate) {
      const translationPrefix = getTranslationPrefix(this.gridOptions);
      const cancelKey = this.editorOptions.buttonTexts?.cancelKey ?? `${translationPrefix}CANCEL`;
      const saveKey = this.editorOptions.buttonTexts?.saveKey ?? `${translationPrefix}SAVE`;
      cancelText = this._translate.instant(`${translationPrefix}${cancelKey}`);
      saveText = this._translate.instant(`${translationPrefix}${saveKey}`);
    } else {
      cancelText = this.editorOptions.buttonTexts?.cancel ?? this._locales?.TEXT_CANCEL ?? 'Cancel';
      saveText = this.editorOptions.buttonTexts?.save ?? this._locales?.TEXT_SAVE ?? 'Save';
    }

    const columnId = this.columnDef?.id ?? '';
    const placeholder = this.columnEditor?.placeholder ?? '';
    const title = this.columnEditor?.title ?? '';
    const maxLength = this.columnEditor?.maxLength;
    const textAreaCols = this.editorOptions?.cols ?? 40;
    const textAreaRows = this.editorOptions?.rows ?? 4;

    const containerElm = document.body;
    this._wrapperElm = document.createElement('div');
    this._wrapperElm.className = `slick-large-editor-text editor-${columnId}`;
    this._wrapperElm.style.position = 'absolute';
    containerElm.appendChild(this._wrapperElm);

    this._textareaElm = document.createElement('textarea');
    this._textareaElm.cols = textAreaCols;
    this._textareaElm.rows = textAreaRows;
    this._textareaElm.placeholder = placeholder;
    this._textareaElm.title = title;
    this._wrapperElm.appendChild(this._textareaElm);

    const editorFooterElm = document.createElement('div');
    editorFooterElm.className = 'editor-footer';

    const countContainerElm = document.createElement('span');
    countContainerElm.className = 'counter';

    this._currentLengthElm = document.createElement('span');
    this._currentLengthElm.className = 'text-length';
    this._currentLengthElm.textContent = '0';
    countContainerElm.appendChild(this._currentLengthElm);

    if (maxLength !== undefined) {
      const maxLengthSeparatorElm = document.createElement('span');
      maxLengthSeparatorElm.className = 'separator';
      maxLengthSeparatorElm.textContent = '/';
      const maxLengthElm = document.createElement('span');
      maxLengthElm.className = 'max-length';
      maxLengthElm.textContent = `${maxLength}`;
      countContainerElm.appendChild(maxLengthSeparatorElm);
      countContainerElm.appendChild(maxLengthElm);
    }
    editorFooterElm.appendChild(countContainerElm);

    const cancelBtnElm = document.createElement('button');
    cancelBtnElm.className = 'btn btn-cancel btn-default btn-xs';
    cancelBtnElm.textContent = cancelText;
    const saveBtnElm = document.createElement('button');
    saveBtnElm.className = 'btn btn-save btn-primary btn-xs';
    saveBtnElm.textContent = saveText;
    editorFooterElm.appendChild(cancelBtnElm);
    editorFooterElm.appendChild(saveBtnElm);
    this._bindEventService.bind(cancelBtnElm, 'click', this.cancel.bind(this) as EventListener);
    this._bindEventService.bind(saveBtnElm, 'click', this.save.bind(this) as EventListener);
    this.position(this.args?.position);
    this._textareaElm.focus();
    this._textareaElm.select();
    this._wrapperElm.appendChild(editorFooterElm);

    this._bindEventService.bind(this._textareaElm, 'keydown', this.handleKeyDown.bind(this) as EventListener);
    this._bindEventService.bind(this._textareaElm, 'input', this.handleOnInputChange.bind(this) as unknown as EventListener);
    this._bindEventService.bind(this._textareaElm, 'paste', this.handleOnInputChange.bind(this) as unknown as EventListener);
  }

  cancel() {
    const value = this._defaultTextValue || '';
    this._textareaElm.value = value;
    this._currentLengthElm.textContent = `${value.length}`;
    if (this.args?.cancelChanges) {
      this.args.cancelChanges();
    }
  }

  hide() {
    this._wrapperElm.style.display = 'none';
  }

  show() {
    this._wrapperElm.style.display = 'block';
  }

  destroy() {
    this._bindEventService.unbindAll();
    this._wrapperElm?.remove?.();
  }

  focus() {
    if (this._textareaElm) {
      this._textareaElm.focus();
      this._textareaElm.select();
    }
  }

  getValue(): string {
    return this._textareaElm.value;
  }

  setValue(val: string) {
    this._textareaElm.value = val;
    this._currentLengthElm.textContent = `${val.length}`;
  }

  applyValue(item: any, state: any) {
    const fieldName = this.columnDef?.field;
    if (fieldName !== undefined) {
      const isComplexObject = fieldName?.indexOf('.') > 0; // is the field a complex object, "address.streetNumber"

      // validate the value before applying it (if not valid we'll set an empty string)
      const validation = this.validate(state);
      const newValue = (validation && validation.valid) ? state : '';

      // set the new value to the item datacontext
      if (isComplexObject) {
        // when it's a complex object, user could override the object path (where the editable object is located)
        // else we use the path provided in the Field Column Definition
        const objectPath = this.columnEditor?.complexObjectPath ?? fieldName ?? '';
        setDeepValue(item, objectPath, newValue);
      } else {
        item[fieldName] = newValue;
      }
    }
  }

  isValueChanged(): boolean {
    const elmValue = this._textareaElm.value;
    return (!(elmValue === '' && (this._defaultTextValue === null || this._defaultTextValue === undefined))) && (elmValue !== this._defaultTextValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef?.field;

    if (item && fieldName !== undefined) {
      // is the field a complex object, "address.streetNumber"
      const isComplexObject = fieldName?.indexOf('.') > 0;
      const value = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];

      this._defaultTextValue = value || '';
      this._textareaElm.value = this._defaultTextValue;
      this._currentLengthElm.textContent = this._defaultTextValue.length;
      this._textareaElm.defaultValue = this._defaultTextValue;
      this._textareaElm.select();
    }
  }

  /**
   * Reposition the LongText Editor to be right over the cell, so that it looks like we opened the editor on top of the cell when in reality we just reposition (absolute) over the cell.
   * By default we use an "auto" mode which will allow to position the LongText Editor to the best logical position in the window, also when we say position, we are talking about the relative position against the grid cell.
   * We can assume that in 80% of the time the default position is bottom right, the default is "auto" but we can also override this and use a specific position.
   * Most of the time positioning of the editor will be to the "right" of the cell is ok but if our column is completely on the right side then we'll want to change the position to "left" align.
   * Same goes for the top/bottom position, Most of the time positioning the editor to the "bottom" but we are clicking on a cell at the bottom of the grid then we might need to reposition to "top" instead.
   */
  position(parentPosition: HtmlElementPosition) {
    const containerOffset = getHtmlElementOffset(this.args.container);
    const containerHeight = this.args.container.offsetHeight;
    const containerWidth = this.args.container.offsetWidth;
    const calculatedEditorHeight = this._wrapperElm.getBoundingClientRect().height || this.args.position.height;
    const calculatedEditorWidth = this._wrapperElm.getBoundingClientRect().width || this.args.position.width;
    const calculatedBodyHeight = document.body.offsetHeight || window.innerHeight; // body height/width might be 0 if so use the window height/width
    const calculatedBodyWidth = document.body.offsetWidth || window.innerWidth;

    // first defined position will be bottom/right (which will position the editor completely over the cell)
    let newPositionTop = containerOffset?.top ?? parentPosition.top ?? 0;
    let newPositionLeft = containerOffset?.left ?? parentPosition.left ?? 0;

    // user could explicitely use a "left" position (when user knows his column is completely on the right)
    // or when using "auto" and we detect not enough available space then we'll position to the "left" of the cell
    const position = this.editorOptions?.position ?? 'auto';
    if (position === 'left' || (position === 'auto' && (newPositionLeft + calculatedEditorWidth) > calculatedBodyWidth)) {
      const marginRightAdjustment = this.editorOptions?.marginRight ?? 0;
      newPositionLeft -= (calculatedEditorWidth - containerWidth + marginRightAdjustment);
    }

    // do the same calculation/reposition with top/bottom (default is bottom of the cell or in other word starting from the cell going down)
    if (position === 'top' || (position === 'auto' && (newPositionTop + calculatedEditorHeight) > calculatedBodyHeight)) {
      newPositionTop -= (calculatedEditorHeight - containerHeight);
    }

    // reposition the editor over the cell (90% of the time this will end up using a position on the "right" of the cell)
    this._wrapperElm.style.top = `${newPositionTop}px`;
    this._wrapperElm.style.left = `${newPositionLeft}px`;
  }

  save() {
    const validation = this.validate();
    const isValid = validation?.valid ?? false;

    if (this.hasAutoCommitEdit && isValid) {
      // do not use args.commitChanges() as this sets the focus to the next row.
      // also the select list will stay shown when clicking off the grid
      this.grid.getEditorLock().commitCurrentEdit();
    } else {
      this.args.commitChanges();
    }
  }

  serializeValue() {
    return this._textareaElm.value;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const elmValue = (inputValue !== undefined) ? inputValue : this._textareaElm?.value;
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
  // protected functions
  // ------------------

  protected handleKeyDown(event: KeyboardEvent) {
    const keyCode = event.keyCode ?? event.code;

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
  protected handleOnInputChange(event: Event & { clipboardData: DataTransfer, target: HTMLTextAreaElement }) {
    const maxLength = this.columnEditor?.maxLength;

    // when user defines a maxLength, we'll make sure that it doesn't go over this limit if so then truncate the text (disregard the extra text)
    let isTruncated = false;
    if (maxLength) {
      isTruncated = this.truncateText(this._textareaElm, maxLength);
    }

    // if the text get truncated then update text length as maxLength, else update text length with actual
    if (isTruncated) {
      this._currentLengthElm.textContent = `${maxLength}`;
    } else {
      const newText = event.type === 'paste' ? event.clipboardData.getData('text') : event.target.value;
      this._currentLengthElm.textContent = `${newText.length}`;
    }
  }

  /**
   * Truncate text if the value is longer than the acceptable max length
   * @param inputElm - textarea html element
   * @param maxLength - max acceptable length
   * @returns truncated - returns True if it truncated or False otherwise
   */
  protected truncateText(inputElm: HTMLTextAreaElement, maxLength: number): boolean {
    const text = inputElm.value + '';
    if (text.length > maxLength) {
      inputElm.value = text.substring(0, maxLength);
      return true;
    }
    return false;
  }
}