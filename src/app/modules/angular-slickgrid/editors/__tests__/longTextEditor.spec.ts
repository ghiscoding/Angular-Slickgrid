import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Editors } from '../index';
import { LongTextEditor } from '../longTextEditor';
import { AutocompleteOption, Column, ColumnEditor, EditorArgs, EditorArguments, GridOption, KeyCode } from '../../models';
import * as utilities from '../../services/utilities';

const mockGetHtmlElementOffset = jest.fn();
// @ts-ignore:2540
utilities.getHtmlElementOffset = mockGetHtmlElementOffset;

const KEY_CHAR_A = 97;
const containerId = 'demo-container';

// define a <div> container to simulate the grid container
const template = `<div id="${containerId}"></div>`;

const dataViewStub = {
  refresh: jest.fn(),
};

const gridOptionMock = {
  autoCommitEdit: false,
  editable: true,
  i18n: null,
} as GridOption;

const getEditorLockMock = {
  commitCurrentEdit: jest.fn(),
};

const gridStub = {
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getEditorLock: () => getEditorLockMock,
  getHeaderRowColumn: jest.fn(),
  navigateNext: jest.fn(),
  navigatePrev: jest.fn(),
  render: jest.fn(),
};

describe('LongTextEditor', () => {
  let divContainer: HTMLDivElement;
  let editor: LongTextEditor;
  let editorArguments: EditorArguments;
  let mockColumn: Column;
  let mockItemData: any;
  let translate: TranslateService;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    divContainer.style.height = '500px';
    divContainer.style.width = '600px';
    document.body.innerHTML = '';
    document.body.style.height = '700px';
    document.body.style.width = '1024px';
    document.body.appendChild(divContainer);

    TestBed.configureTestingModule({
      providers: [],
      imports: [TranslateModule.forRoot()]
    });
    translate = TestBed.inject(TranslateService);

    translate.setTranslation('en', {
      CANCEL: 'Cancel',
      SAVE: 'Save',
    });
    translate.setTranslation('fr', {
      CANCEL: 'Annuler',
      SAVE: 'Sauvegarder',
    });
    translate.setDefaultLang('fr');
    translate.use('fr');

    mockColumn = { id: 'title', field: 'title', editable: true, editor: { model: Editors.longText }, internalColumnEditor: {} } as Column;

    editorArguments = {
      grid: gridStub,
      column: mockColumn,
      item: mockItemData,
      event: null,
      cancelChanges: jest.fn(),
      commitChanges: jest.fn(),
      container: divContainer,
      columnMetaData: null,
      dataView: dataViewStub,
      gridPosition: { top: 0, left: 0, bottom: 10, right: 10, height: 600, width: 800, visible: true },
      position: { top: 0, left: 0, bottom: 10, right: 10, height: 100, width: 100, visible: true },
    };
  });

  describe('with invalid Editor instance', () => {
    it('should throw an error when trying to call init without any arguments', (done) => {
      try {
        editor = new LongTextEditor(null);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.`);
        done();
      }
    });
  });

  describe('with valid Editor instance', () => {
    beforeEach(() => {
      mockItemData = { id: 1, title: 'task 1', isActive: true };
      mockColumn = { id: 'title', field: 'title', editable: true, editor: { model: Editors.longText }, internalColumnEditor: {} } as Column;

      editorArguments.column = mockColumn;
      editorArguments.item = mockItemData;
    });

    afterEach(() => {
      editor.destroy();
    });

    it('should initialize the editor', () => {
      gridOptionMock.i18n = translate;
      gridOptionMock.enableTranslate = true;
      editor = new LongTextEditor(editorArguments);
      const editorCount = document.body.querySelectorAll('.slick-large-editor-text.editor-title textarea').length;
      const editorTextCounter = document.body.querySelectorAll<HTMLDivElement>('.slick-large-editor-text.editor-title .editor-footer .counter');
      const currentTextLengthElm = document.body.querySelector<HTMLDivElement>('.editor-footer .text-length');
      const maxTextLengthElm = document.body.querySelector<HTMLDivElement>('.editor-footer .max-length');
      const editorFooterElm = document.body.querySelector<HTMLDivElement>('.slick-large-editor-text.editor-title .editor-footer');
      const buttonCancelElm = editorFooterElm.querySelector<HTMLButtonElement>('.btn-default');
      const buttonSaveElm = editorFooterElm.querySelector<HTMLButtonElement>('.btn-primary');

      expect(editorCount).toBe(1);
      expect(editorTextCounter.length).toBe(1);
      expect(currentTextLengthElm.textContent).toBe('0');
      expect(maxTextLengthElm).toBeNull();
      expect(buttonCancelElm.textContent).toBe('Annuler');
      expect(buttonSaveElm.textContent).toBe('Sauvegarder');
    });

    it('should initialize the editor with default constant text when translate service is not provided', () => {
      gridOptionMock.i18n = null;
      editor = new LongTextEditor(editorArguments);
      const editorCount = document.body.querySelectorAll('.slick-large-editor-text.editor-title textarea').length;
      const editorFooterElm = document.body.querySelector<HTMLDivElement>('.slick-large-editor-text.editor-title .editor-footer');
      const buttonCancelElm = editorFooterElm.querySelector<HTMLButtonElement>('.btn-default');
      const buttonSaveElm = editorFooterElm.querySelector<HTMLButtonElement>('.btn-primary');

      expect(editorCount).toBe(1);
      expect(buttonCancelElm.textContent).toBe('Cancel');
      expect(buttonSaveElm.textContent).toBe('Save');
    });

    it('should initialize the editor even when user define his own editor options', () => {
      mockColumn.internalColumnEditor.editorOptions = { minLength: 3 } as AutocompleteOption;
      editor = new LongTextEditor(editorArguments);
      const editorCount = document.body.querySelectorAll('.slick-large-editor-text.editor-title textarea').length;

      expect(editorCount).toBe(1);
    });

    it('should have a placeholder when defined in its column definition', () => {
      const testValue = 'test placeholder';
      mockColumn.internalColumnEditor.placeholder = testValue;

      editor = new LongTextEditor(editorArguments);
      const editorElm = document.body.querySelector<HTMLTextAreaElement>('.slick-large-editor-text.editor-title textarea');

      expect(editorElm.placeholder).toBe(testValue);
    });

    it('should have a title (tooltip) when defined in its column definition', () => {
      const testValue = 'test title';
      mockColumn.internalColumnEditor.title = testValue;

      editor = new LongTextEditor(editorArguments);
      const editorElm = document.body.querySelector<HTMLTextAreaElement>('.slick-large-editor-text.editor-title textarea');

      expect(editorElm.title).toBe(testValue);
    });

    it('should call "columnEditor" GETTER and expect to equal the editor settings we provided', () => {
      mockColumn.internalColumnEditor = {
        placeholder: 'test placeholder',
        title: 'test title',
      };

      editor = new LongTextEditor(editorArguments);

      expect(editor.columnEditor).toEqual(mockColumn.internalColumnEditor);
    });

    it('should call "setValue" and expect the DOM element value to be the same string when calling "getValue"', () => {
      editor = new LongTextEditor(editorArguments);
      editor.setValue('task 1');

      expect(editor.getValue()).toBe('task 1');
    });

    it('should define an item datacontext containing a string as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
      editor = new LongTextEditor(editorArguments);
      editor.loadValue(mockItemData);
      const editorElm = editor.editorDomElement;
      const currentTextLengthElm = document.body.querySelector<HTMLDivElement>('.editor-footer .text-length');
      const maxTextLengthElm = document.body.querySelector<HTMLDivElement>('.editor-footer .max-length');

      expect(currentTextLengthElm.textContent).toBe('6');
      expect(maxTextLengthElm).toBeNull();
      expect(editor.getValue()).toBe('task 1');
      expect(editorElm[0].defaultValue).toBe('task 1');
    });

    it('should hide the DOM element div wrapper when the "hide" method is called', () => {
      editor = new LongTextEditor(editorArguments);
      const wrapperElm = document.body.querySelector<HTMLDivElement>('.slick-large-editor-text.editor-title');
      editor.show();
      expect(wrapperElm.style.display).toBe('');

      editor.hide();
      expect(wrapperElm.style.display).toBe('none');
    });

    it('should show the DOM element div wrapper when the "show" method is called', () => {
      editor = new LongTextEditor(editorArguments);
      const wrapperElm = document.body.querySelector<HTMLDivElement>('.slick-large-editor-text.editor-title');

      editor.hide();
      expect(wrapperElm.style.display).toBe('none');

      editor.show();
      expect(wrapperElm.style.display).toBe('');
    });

    describe('isValueChanged method', () => {
      it('should return True when previously dispatched keyboard event is a new char "a" and it should also update the text counter accordingly', () => {
        const eventKeyDown = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });
        const eventInput = new (window.window as any).Event('input', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });
        mockColumn.internalColumnEditor.maxLength = 255;

        editor = new LongTextEditor(editorArguments);
        editor.setValue('z');
        const editorElm = document.body.querySelector<HTMLTextAreaElement>('.editor-title textarea');
        const currentTextLengthElm = document.body.querySelector<HTMLDivElement>('.editor-footer .text-length');
        const maxTextLengthElm = document.body.querySelector<HTMLDivElement>('.editor-footer .max-length');
        editor.focus();
        editorElm.dispatchEvent(eventKeyDown);
        editorElm.dispatchEvent(eventInput);

        expect(currentTextLengthElm.textContent).toBe('1');
        expect(maxTextLengthElm.textContent).toBe('255');
        expect(editor.isValueChanged()).toBe(true);
      });

      it('should return False when previously dispatched keyboard event is same string number as current value', () => {
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });

        editor = new LongTextEditor(editorArguments);
        const editorElm = document.body.querySelector<HTMLTextAreaElement>('.editor-title textarea');

        editor.loadValue({ id: 1, title: 'a', isActive: true });
        editor.focus();
        editorElm.dispatchEvent(event);

        expect(editor.isValueChanged()).toBe(false);
      });

      it('should return True when previously dispatched keyboard event ENTER', () => {
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.ENTER, bubbles: true, cancelable: true });

        editor = new LongTextEditor(editorArguments);
        editor.setValue('a');
        const editorElm = document.body.querySelector<HTMLTextAreaElement>('.editor-title textarea');

        editor.focus();
        editorElm.dispatchEvent(event);

        expect(editor.isValueChanged()).toBe(true);
      });
    });

    describe('applyValue method', () => {
      it('should apply the value to the title property when it passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockItemData = { id: 1, title: 'task 1', isActive: true };

        editor = new LongTextEditor(editorArguments);
        editor.applyValue(mockItemData, 'task 2');

        expect(mockItemData).toEqual({ id: 1, title: 'task 2', isActive: true });
      });

      it('should apply the value to the title property with a field having dot notation (complex object) that passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockColumn.field = 'part.title';
        mockItemData = { id: 1, part: { title: 'task 1' }, isActive: true };

        editor = new LongTextEditor(editorArguments);
        editor.applyValue(mockItemData, 'task 2');

        expect(mockItemData).toEqual({ id: 1, part: { title: 'task 2' }, isActive: true });
      });

      it('should return item data with an empty string in its value when it fails the custom validation', () => {
        mockColumn.internalColumnEditor.validator = (value: any, args: EditorArgs) => {
          if (value.length < 10) {
            return { valid: false, msg: 'Must be at least 10 chars long.' };
          }
          return { valid: true, msg: '' };
        };
        mockItemData = { id: 1, title: 'task 1', isActive: true };

        editor = new LongTextEditor(editorArguments);
        editor.applyValue(mockItemData, 'task 2');

        expect(mockItemData).toEqual({ id: 1, title: '', isActive: true });
      });
    });

    describe('serializeValue method', () => {
      it('should return serialized value as a string', () => {
        mockItemData = { id: 1, title: 'task 1', isActive: true };

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('task 1');
      });

      it('should return serialized value as an empty string when item value is also an empty string', () => {
        mockItemData = { id: 1, title: '', isActive: true };

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('');
      });

      it('should return serialized value as an empty string when item value is null', () => {
        mockItemData = { id: 1, title: null, isActive: true };

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('');
      });

      it('should return value as a number when using a dot (.) notation for complex object', () => {
        mockColumn.field = 'task.title';
        mockItemData = { id: 1, task: { title: 'task 1' }, isActive: true };

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('task 1');
      });
    });

    describe('save method', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should call "getEditorLock" method when "hasAutoCommitEdit" is enabled', () => {
        mockItemData = { id: 1, title: 'task', isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('task 1');
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should call "commitChanges" method when "hasAutoCommitEdit" is enabled but value is invalid', () => {
        mockItemData = { id: 1, title: 'task', isActive: true };
        gridOptionMock.autoCommitEdit = true;
        mockColumn.internalColumnEditor.validator = (value: any, args: EditorArgs) => {
          if (value.length < 10) {
            return { valid: false, msg: 'Must be at least 10 chars long.' };
          }
          return { valid: true, msg: '' };
        };
        const commitCurrentSpy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');
        const commitChangeSpy = jest.spyOn(editorArguments, 'commitChanges');

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('task 1');
        editor.save();

        expect(commitCurrentSpy).not.toHaveBeenCalled();
        expect(commitChangeSpy).toHaveBeenCalled();
      });

      it('should call "commitChanges" method when "hasAutoCommitEdit" is disabled', () => {
        mockItemData = { id: 1, title: 'task', isActive: true };
        gridOptionMock.autoCommitEdit = false;
        const spy = jest.spyOn(editorArguments, 'commitChanges');

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('task 1');
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should not call anything when the input value is empty but is required', () => {
        mockItemData = { id: 1, title: '', isActive: true };
        mockColumn.internalColumnEditor.required = true;
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('');
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('handleKeyDown private method', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should call the "save" method when the Ctrl+ENTER combination event is triggered', () => {
        mockItemData = { id: 1, title: 'task', isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spyCommit = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const spySave = jest.spyOn(editor, 'save');
        const editorElm = editor.editorDomElement;

        editorElm[0].dispatchEvent(new (window.window as any).KeyboardEvent('keydown', {
          keyCode: KeyCode.ENTER,
          ctrlKey: true,
          bubbles: true
        }));

        expect(spyCommit).toHaveBeenCalled();
        expect(spySave).toHaveBeenCalled();
      });

      it('should call the "cancel" method when the Escape keydown event is triggered', () => {
        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const spyCancel = jest.spyOn(editor, 'cancel');
        const editorElm = editor.editorDomElement;

        editorElm[0].dispatchEvent(new (window.window as any).KeyboardEvent('keydown', {
          keyCode: KeyCode.ESCAPE,
          bubbles: true
        }));

        expect(spyCancel).toHaveBeenCalled();
      });

      it('should call the grid "navigatePrev" method when the Shift+TAB combination event is triggered', () => {
        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const editorElm = editor.editorDomElement;
        const spyNavigate = jest.spyOn(gridStub, 'navigatePrev');

        editorElm[0].dispatchEvent(new (window.window as any).KeyboardEvent('keydown', {
          keyCode: KeyCode.TAB,
          shiftKey: true,
          bubbles: true
        }));

        expect(spyNavigate).toHaveBeenCalled();
      });

      it('should call the grid "navigateNext" method when the TAB (without shift) event is triggered', () => {
        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const editorElm = editor.editorDomElement;
        const spyNavigate = jest.spyOn(gridStub, 'navigateNext');

        editorElm[0].dispatchEvent(new (window.window as any).KeyboardEvent('keydown', {
          keyCode: KeyCode.TAB,
          shiftKey: false,
          bubbles: true
        }));

        expect(spyNavigate).toHaveBeenCalled();
      });
    });

    describe('on button clicked events', () => {
      it('should call "save" method when the save button is clicked', () => {
        mockItemData = { id: 1, title: 'task', isActive: true };

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const spySave = jest.spyOn(editor, 'save');
        const editorFooterElm = document.body.querySelector<HTMLDivElement>('.slick-large-editor-text.editor-title .editor-footer');
        const buttonSaveElm = editorFooterElm.querySelector<HTMLButtonElement>('.btn-primary');

        buttonSaveElm.click();

        expect(spySave).toHaveBeenCalled();
      });

      it('should call "cancel" method when the cancel button is clicked', () => {
        mockItemData = { id: 1, title: 'task', isActive: true };

        editor = new LongTextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const spyCancel = jest.spyOn(editor, 'cancel');
        const editorFooterElm = document.body.querySelector<HTMLDivElement>('.slick-large-editor-text.editor-title .editor-footer');
        const buttonCancelElm = editorFooterElm.querySelector<HTMLButtonElement>('.btn-default');

        buttonCancelElm.click();

        expect(spyCancel).toHaveBeenCalled();
      });
    });

    describe('validate method', () => {
      it('should return False when field is required and field is empty', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('');

        expect(validation).toEqual({ valid: false, msg: 'Field is required' });
      });

      it('should return True when field is required and input is a valid input value', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return False when field is lower than a minLength defined', () => {
        mockColumn.internalColumnEditor.minLength = 5;
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is at least 5 character(s)' });
      });

      it('should return False when field is lower than a minLength defined using exclusive operator', () => {
        mockColumn.internalColumnEditor.minLength = 5;
        mockColumn.internalColumnEditor.operatorConditionalType = 'exclusive';
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is more than 5 character(s)' });
      });

      it('should return True when field is equal to the minLength defined', () => {
        mockColumn.internalColumnEditor.minLength = 4;
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return False when field is greater than a maxLength defined', () => {
        mockColumn.internalColumnEditor.maxLength = 10;
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is less than or equal to 10 characters' });
      });

      it('should return False when field is greater than a maxLength defined using exclusive operator', () => {
        mockColumn.internalColumnEditor.maxLength = 10;
        mockColumn.internalColumnEditor.operatorConditionalType = 'exclusive';
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is less than 10 characters' });
      });

      it('should return True when field is equal to the maxLength defined', () => {
        mockColumn.internalColumnEditor.maxLength = 16;
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return True when field is equal to the maxLength defined and "operatorType" is set to "inclusive"', () => {
        mockColumn.internalColumnEditor.maxLength = 16;
        mockColumn.internalColumnEditor.operatorConditionalType = 'inclusive';
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return False when field is equal to the maxLength defined but "operatorType" is set to "exclusive"', () => {
        mockColumn.internalColumnEditor.maxLength = 16;
        mockColumn.internalColumnEditor.operatorConditionalType = 'exclusive';
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is less than 16 characters' });
      });

      it('should return False when field is not between minLength & maxLength defined', () => {
        mockColumn.internalColumnEditor.minLength = 0;
        mockColumn.internalColumnEditor.maxLength = 10;
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text length is between 0 and 10 characters' });
      });

      it('should return True when field is is equal to maxLength defined when both min/max values are defined', () => {
        mockColumn.internalColumnEditor.minLength = 0;
        mockColumn.internalColumnEditor.maxLength = 16;
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return True when field is is equal to minLength defined when "operatorType" is set to "inclusive" and both min/max values are defined', () => {
        mockColumn.internalColumnEditor.minLength = 4;
        mockColumn.internalColumnEditor.maxLength = 15;
        mockColumn.internalColumnEditor.operatorConditionalType = 'inclusive';
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return False when field is equal to maxLength but "operatorType" is set to "exclusive" when both min/max lengths are defined', () => {
        mockColumn.internalColumnEditor.minLength = 4;
        mockColumn.internalColumnEditor.maxLength = 16;
        mockColumn.internalColumnEditor.operatorConditionalType = 'exclusive';
        editor = new LongTextEditor(editorArguments);
        const validation1 = editor.validate('text is 16 chars');
        const validation2 = editor.validate('text');

        expect(validation1).toEqual({ valid: false, msg: 'Please make sure your text length is between 4 and 16 characters' });
        expect(validation2).toEqual({ valid: false, msg: 'Please make sure your text length is between 4 and 16 characters' });
      });

      it('should return False when field is greater than a maxValue defined', () => {
        mockColumn.internalColumnEditor.maxLength = 10;
        editor = new LongTextEditor(editorArguments);
        const validation = editor.validate('Task is longer than 10 chars');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is less than or equal to 10 characters' });
      });
    });

    describe('Truncate Text when using maxLength', () => {
      it('should truncate text to 10 chars when the provided text (with input/keydown event) is more than maxLength(10)', () => {
        const eventInput = new (window.window as any).KeyboardEvent('input', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });
        (mockColumn.internalColumnEditor as ColumnEditor).maxLength = 10;

        editor = new LongTextEditor(editorArguments);

        editor.setValue('some extra long text that is over the maxLength');
        const editorElm = document.body.querySelector('.editor-title textarea') as HTMLTextAreaElement;

        editor.focus();
        editorElm.dispatchEvent(eventInput);

        const currentTextLengthElm = document.body.querySelector('.editor-footer .text-length') as HTMLDivElement;
        const maxTextLengthElm = document.body.querySelector('.editor-footer .max-length') as HTMLDivElement;

        expect(editorElm.value).toBe('some extra');
        expect(currentTextLengthElm.textContent).toBe('10');
        expect(maxTextLengthElm.textContent).toBe('10');
        expect(editor.isValueChanged()).toBe(true);
      });

      it('should truncate text to 10 chars when the provided text (with paste event) is more than maxLength(10)', () => {
        const eventPaste = new (window.window as any).CustomEvent('paste', { bubbles: true, cancelable: true });
        (mockColumn.internalColumnEditor as ColumnEditor).maxLength = 10;

        editor = new LongTextEditor(editorArguments);

        editor.setValue('some extra long text that is over the maxLength');
        const editorElm = document.body.querySelector('.editor-title textarea') as HTMLTextAreaElement;

        editor.focus();
        editorElm.dispatchEvent(eventPaste);

        const currentTextLengthElm = document.body.querySelector('.editor-footer .text-length') as HTMLDivElement;
        const maxTextLengthElm = document.body.querySelector('.editor-footer .max-length') as HTMLDivElement;

        expect(editorElm.value).toBe('some extra');
        expect(currentTextLengthElm.textContent).toBe('10');
        expect(maxTextLengthElm.textContent).toBe('10');
        expect(editor.isValueChanged()).toBe(true);
      });
    });

    describe('Position Editor', () => {
      beforeEach(() => {
        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 600 });
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });

        // cell height/width
        editorArguments.position = { top: 0, left: 900, bottom: 10, right: 10, height: 100, width: 310, visible: true };
        Object.defineProperty(editorArguments.container, 'offsetHeight', { writable: true, configurable: true, value: 33 });
        Object.defineProperty(editorArguments.container, 'offsetWidth', { writable: true, configurable: true, value: 100 });
      });

      it('should assume editor to positioned on the right & bottom of the cell when there is enough room', () => {
        mockGetHtmlElementOffset.mockReturnValue({ top: 100, left: 200 }); // mock cell position

        editor = new LongTextEditor(editorArguments);
        const editorElm = document.body.querySelector('.slick-large-editor-text') as HTMLDivElement;

        expect(editorElm.style.top).toBe('100px');
        expect(editorElm.style.left).toBe('200px');
      });

      it('should assume editor to positioned on the right of the cell when there is NOT enough room on the left', () => {
        mockGetHtmlElementOffset.mockReturnValue({ top: 100, left: 900 }); // mock cell position that will be over max of 1024px

        editor = new LongTextEditor(editorArguments);
        const editorElm = document.body.querySelector('.slick-large-editor-text') as HTMLDivElement;

        expect(editorElm.style.top).toBe('100px');
        expect(editorElm.style.left).toBe('675px'); // cellLeftPos - (editorWidth - cellWidth + marginAdjust) => (900 - (310 - 100 + 15))
      });

      it('should assume editor to positioned on the top of the cell when there is NOT enough room on the bottom', () => {
        mockGetHtmlElementOffset.mockReturnValue({ top: 550, left: 200 }); // mock cell position that will be over max of 600px

        editor = new LongTextEditor(editorArguments);
        const editorElm = document.body.querySelector('.slick-large-editor-text') as HTMLDivElement;

        expect(editorElm.style.top).toBe('483px');
        expect(editorElm.style.left).toBe('200px'); // cellTopPos - (editorHeight - cellHeight) => (550 - (100 - 33))
      });
    });
  });
});
