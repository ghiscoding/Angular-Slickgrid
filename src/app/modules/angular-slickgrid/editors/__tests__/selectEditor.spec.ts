// import 3rd party lib multiple-select for the tests
import '../../../../../assets/lib/multiple-select/multiple-select';

import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Editors } from '../index';
import { SelectEditor } from '../selectEditor';
import { AutocompleteOption, Column, EditorArgs, EditorArguments, GridOption, KeyCode } from '../../models';

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

describe('SelectEditor', () => {
  let divContainer: HTMLDivElement;
  let editor: SelectEditor;
  let editorArguments: EditorArguments;
  let mockColumn: Column;
  let mockItemData: any;
  let translate: TranslateService;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);

    TestBed.configureTestingModule({
      providers: [],
      imports: [TranslateModule.forRoot()]
    });
    translate = TestBed.get(TranslateService);

    translate.setTranslation('en', {
      CANCEL: 'Cancel',
      SAVE: 'Save',
    });
    translate.setTranslation('fr', {
      CANCEL: 'Annuler',
      SAVE: 'Sauvegarder',
    });
    translate.setDefaultLang('fr');

    mockColumn = { id: 'gender', field: 'gender', editable: true, editor: { model: Editors.multipleSelect }, internalColumnEditor: {} } as Column;

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
      gridPosition: { top: 0, left: 0, bottom: 10, right: 10, height: 100, width: 100, visible: true },
      position: { top: 0, left: 0, bottom: 10, right: 10, height: 100, width: 100, visible: true },
    };
  });

  describe('with invalid Editor instance', () => {
    it('should throw an error when trying to call init without any arguments', (done) => {
      try {
        editor = new SelectEditor(null, true);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.`);
        done();
      }
    });

    it('should throw an error when there is no collection provided in the editor property', (done) => {
      try {
        mockColumn.internalColumnEditor.collection = undefined;
        editor = new SelectEditor(editorArguments, true);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") inside Column Definition Editor for the MultipleSelect/SingleSelect Editor to work correctly.`);
        done();
      }
    });

    it('should throw an error when collection is not a valid array', (done) => {
      try {
        // @ts-ignore
        mockColumn.internalColumnEditor.collection = { hello: 'world' };
        editor = new SelectEditor(editorArguments, true);
      } catch (e) {
        expect(e.toString()).toContain(`The "collection" passed to the Select Editor is not a valid array.`);
        done();
      }
    });

    it('should throw an error when collection is not a valid value/label pair array', (done) => {
      try {
        mockColumn.internalColumnEditor.collection = [{ hello: 'world' }];
        editor = new SelectEditor(editorArguments, true);
      } catch (e) {
        expect(e.toString()).toContain(`[select-editor] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list`);
        done();
      }
    });

    it('should throw an error when "enableTranslateLabel" is set without a valid TranslateService', (done) => {
      try {
        translate = undefined;
        mockColumn.internalColumnEditor.enableTranslateLabel = true;
        mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
        editor = new SelectEditor(editorArguments, true);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.`);
        done();
      }
    });
  });

  describe('with valid Editor instance', () => {
    beforeEach(() => {
      mockItemData = { id: 1, gender: 'male', isActive: true };
      mockColumn = { id: 'gender', field: 'gender', editable: true, editor: { model: Editors.multipleSelect }, internalColumnEditor: {} } as Column;
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

      editorArguments.column = mockColumn;
      editorArguments.item = mockItemData;
    });

    afterEach(() => {
      editor.destroy();
    });

    it('should initialize the editor', () => {
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      gridOptionMock.i18n = translate;
      editor = new SelectEditor(editorArguments, true);
      const editorCount = document.body.querySelectorAll('select.ms-filter.editor-gender').length;

      expect(editorCount).toBe(1);
    });

    it('should initialize the editor even when user define his own editor options', () => {
      mockColumn.internalColumnEditor.editorOptions = { minLength: 3 } as AutocompleteOption;
      editor = new SelectEditor(editorArguments, true);
      const editorCount = document.body.querySelectorAll('select.ms-filter.editor-gender').length;

      expect(editorCount).toBe(1);
    });

    it('should have a placeholder when defined in its column definition', () => {
      const testValue = 'test placeholder';
      mockColumn.internalColumnEditor.placeholder = testValue;
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

      editor = new SelectEditor(editorArguments, true);
      const editorElm = divContainer.querySelector<HTMLSpanElement>('.ms-filter.editor-gender .placeholder');

      expect(editorElm.innerHTML).toBe(testValue);
    });

    it('should call "columnEditor" GETTER and expect to equal the editor settings we provided', () => {
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      mockColumn.internalColumnEditor.placeholder = 'test placeholder';

      editor = new SelectEditor(editorArguments, true);

      expect(editor.columnEditor).toEqual(mockColumn.internalColumnEditor);
    });

    // xit('should call "setValue" and expect the DOM element value to be the same string when calling "getValue"', () => {
    //   editor = new SelectEditor(editorArguments, true);
    //   editor.setValue('male');

    //   expect(editor.getValue()).toBe('male');
    // });

    // xit('should define an item datacontext containing a string as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
    //   editor = new SelectEditor(editorArguments, true);
    //   editor.loadValue(mockItemData);
    //   const editorElm = editor.editorDomElement;

    //   expect(editor.getValue()).toBe('male');
    //   expect(editorElm[0].defaultValue).toBe('male');
    // });

    // describe('isValueChanged method', () => {
    //   xit('should return True when previously dispatched keyboard event being char "a"', () => {
    //     const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });

    //     editor = new SelectEditor(editorArguments, true);
    //     const editorElm = document.body.querySelector<HTMLTextAreaElement>('.editor-gender textarea');

    //     editor.focus();
    //     editorElm.dispatchEvent(event);

    //     expect(editor.isValueChanged()).toBe(true);
    //   });

    //   xit('should return False when previously dispatched keyboard event is same string number as current value', () => {
    //     const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });

    //     editor = new SelectEditor(editorArguments, true);
    //     const editorElm = document.body.querySelector<HTMLTextAreaElement>('.editor-gender textarea');

    //     editor.loadValue({ id: 1, gender: 'a', isActive: true });
    //     editor.focus();
    //     editorElm.dispatchEvent(event);

    //     expect(editor.isValueChanged()).toBe(false);
    //   });

    //   xit('should return True when previously dispatched keyboard event ENTER', () => {
    //     const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.ENTER, bubbles: true, cancelable: true });

    //     editor = new SelectEditor(editorArguments, true);
    //     const editorElm = document.body.querySelector<HTMLTextAreaElement>('.editor-gender textarea');

    //     editor.focus();
    //     editorElm.dispatchEvent(event);

    //     expect(editor.isValueChanged()).toBe(true);
    //   });
    // });

    // describe('applyValue method', () => {
    //   xit('should apply the value to the gender property when it passes validation', () => {
    //     mockColumn.internalColumnEditor.validator = null;
    //     mockItemData = { id: 1, gender: 'male', isActive: true };

    //     editor = new SelectEditor(editorArguments, true);
    //     editor.applyValue(mockItemData, 'female');

    //     expect(mockItemData).toEqual({ id: 1, gender: 'female', isActive: true });
    //   });

    //   xit('should apply the value to the gender property with a field having dot notation (complex object) that passes validation', () => {
    //     mockColumn.internalColumnEditor.validator = null;
    //     mockColumn.field = 'part.gender';
    //     mockItemData = { id: 1, part: { gender: 'male' }, isActive: true };

    //     editor = new SelectEditor(editorArguments, true);
    //     editor.applyValue(mockItemData, 'female');

    //     expect(mockItemData).toEqual({ id: 1, part: { gender: 'female' }, isActive: true });
    //   });

    //   xit('should return item data with an empty string in its value when it fails the custom validation', () => {
    //     mockColumn.internalColumnEditor.validator = (value: any, args: EditorArgs) => {
    //       if (value.length < 10) {
    //         return { valid: false, msg: 'Must be at least 10 chars long.' };
    //       }
    //       return { valid: true, msg: '' };
    //     };
    //     mockItemData = { id: 1, gender: 'male', isActive: true };

    //     editor = new SelectEditor(editorArguments, true);
    //     editor.applyValue(mockItemData, 'female');

    //     expect(mockItemData).toEqual({ id: 1, gender: '', isActive: true });
    //   });
    // });

    // describe('serializeValue method', () => {
    //   xit('should return serialized value as a string', () => {
    //     mockItemData = { id: 1, gender: 'male', isActive: true };

    //     editor = new SelectEditor(editorArguments, true);
    //     editor.loadValue(mockItemData);
    //     const output = editor.serializeValue();

    //     expect(output).toBe('male');
    //   });

    //   xit('should return serialized value as an empty string when item value is also an empty string', () => {
    //     mockItemData = { id: 1, gender: '', isActive: true };

    //     editor = new SelectEditor(editorArguments, true);
    //     editor.loadValue(mockItemData);
    //     const output = editor.serializeValue();

    //     expect(output).toBe('');
    //   });

    //   xit('should return serialized value as an empty string when item value is null', () => {
    //     mockItemData = { id: 1, gender: null, isActive: true };

    //     editor = new SelectEditor(editorArguments, true);
    //     editor.loadValue(mockItemData);
    //     const output = editor.serializeValue();

    //     expect(output).toBe('');
    //   });

    //   xit('should return value as a number when using a dot (.) notation for complex object', () => {
    //     mockColumn.field = 'task.gender';
    //     mockItemData = { id: 1, task: { gender: 'male' }, isActive: true };

    //     editor = new SelectEditor(editorArguments, true);
    //     editor.loadValue(mockItemData);
    //     const output = editor.serializeValue();

    //     expect(output).toBe('male');
    //   });
    // });

    describe('save method', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should call "getEditorLock" method when "hasAutoCommitEdit" is enabled', () => {
        mockItemData = { id: 1, gender: 'task', isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should not call anything when "hasAutoCommitEdit" is disabled', () => {
        mockItemData = { id: 1, gender: 'task', isActive: true };
        gridOptionMock.autoCommitEdit = false;
        const spy = jest.spyOn(editorArguments, 'commitChanges');

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should not call anything when the input value is empty but is required', () => {
        mockItemData = { id: 1, gender: '', isActive: true };
        mockColumn.internalColumnEditor.required = true;
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('validate method', () => {
      it('should return False when field is required and field is empty', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new SelectEditor(editorArguments, true);
        const validation = editor.validate('');

        expect(validation).toEqual({ valid: false, msg: 'Field is required' });
      });

      it('should return True when field is required and input is a valid input value', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new SelectEditor(editorArguments, true);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: null });
      });
    });
  });
});
