import { Editors } from '../index';
import { AutoCompleteEditor } from '../autoCompleteEditor';
import { AutocompleteOption, Column, EditorArgs, EditorArguments, GridOption, KeyCode, FieldType } from '../../models';

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
} as GridOption;

const getEditorLockMock = {
  commitCurrentEdit: jest.fn(),
};

const gridStub = {
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getEditorLock: () => getEditorLockMock,
  getHeaderRowColumn: jest.fn(),
  render: jest.fn(),
};

describe('AutoCompleteEditor', () => {
  let divContainer: HTMLDivElement;
  let editor: AutoCompleteEditor;
  let editorArguments: EditorArguments;
  let mockColumn: Column;
  let mockItemData: any;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);

    mockColumn = { id: 'gender', field: 'gender', editable: true, editor: { model: Editors.autoComplete }, internalColumnEditor: {} } as Column;

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
        editor = new AutoCompleteEditor(null);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.`);
        done();
      }
    });

    it('should throw an error when collection is not a valid array', (done) => {
      try {
        // @ts-ignore
        mockColumn.internalColumnEditor.collection = { hello: 'world' };
        editor = new AutoCompleteEditor(editorArguments);
      } catch (e) {
        expect(e.toString()).toContain(`The "collection" passed to the Autocomplete Editor is not a valid array.`);
        done();
      }
    });
  });

  describe('with valid Editor instance', () => {
    beforeEach(() => {
      mockItemData = { id: 123, gender: 'male', isActive: true };
      mockColumn = { id: 'gender', field: 'gender', editable: true, editor: { model: Editors.autoComplete }, internalColumnEditor: {} } as Column;
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

      editorArguments.column = mockColumn;
      editorArguments.item = mockItemData;
    });

    afterEach(() => {
      editor.destroy();
    });

    it('should initialize the editor', () => {
      editor = new AutoCompleteEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-text.editor-gender').length;
      const autocompleteUlElms = document.body.querySelectorAll<HTMLUListElement>('ul.ui-autocomplete');

      expect(autocompleteUlElms.length).toBe(1);
      expect(editorCount).toBe(1);
    });

    it('should initialize the editor even when user define his own editor options', () => {
      mockColumn.internalColumnEditor.editorOptions = { minLength: 3 } as AutocompleteOption;
      editor = new AutoCompleteEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-text.editor-gender').length;
      const autocompleteUlElms = document.body.querySelectorAll<HTMLUListElement>('ul.ui-autocomplete');

      expect(autocompleteUlElms.length).toBe(1);
      expect(editorCount).toBe(1);
    });

    it('should have a placeholder when defined in its column definition', () => {
      const testValue = 'test placeholder';
      mockColumn.internalColumnEditor.placeholder = testValue;

      editor = new AutoCompleteEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-text.editor-gender');

      expect(editorElm.placeholder).toBe(testValue);
    });

    it('should have a title (tooltip) when defined in its column definition', () => {
      const testValue = 'test title';
      mockColumn.internalColumnEditor.title = testValue;

      editor = new AutoCompleteEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-text.editor-gender');

      expect(editorElm.title).toBe(testValue);
    });

    it('should call "setValue" and expect the DOM element to have the same value when calling "getValue"', () => {
      editor = new AutoCompleteEditor(editorArguments);
      editor.setValue('male');

      expect(editor.getValue()).toBe('male');
    });

    it('should define an item datacontext containing a string as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
      editor = new AutoCompleteEditor(editorArguments);
      editor.loadValue(mockItemData);

      expect(editor.getValue()).toBe('male');
    });

    it('should define an item datacontext containing a complex object as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
      mockItemData = { id: 123, gender: { value: 'male', label: 'Male' }, isActive: true };
      mockColumn.field = 'gender.value';
      editor = new AutoCompleteEditor(editorArguments);
      editor.loadValue(mockItemData);

      expect(editor.getValue()).toBe('male');
    });

    it('should dispatch a keyboard event and expect "stopImmediatePropagation()" to have been called when using Left Arrow key', () => {
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.LEFT, bubbles: true, cancelable: true });
      const spyEvent = jest.spyOn(event, 'stopImmediatePropagation');

      editor = new AutoCompleteEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-gender');

      editorElm.focus();
      editorElm.dispatchEvent(event);

      expect(spyEvent).toHaveBeenCalled();
    });

    it('should dispatch a keyboard event and expect "stopImmediatePropagation()" to have been called when using Right Arrow key', () => {
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.RIGHT, bubbles: true, cancelable: true });
      const spyEvent = jest.spyOn(event, 'stopImmediatePropagation');

      editor = new AutoCompleteEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-gender');

      editorElm.focus();
      editorElm.dispatchEvent(event);

      expect(spyEvent).toHaveBeenCalled();
    });

    it('should render the DOM element with different key/value pair when user provide its own customStructure', () => {
      mockColumn.internalColumnEditor.collection = [{ option: 'male', text: 'Male' }, { option: 'female', text: 'Female' }];
      mockColumn.internalColumnEditor.customStructure = { value: 'option', label: 'text' };
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: 109, bubbles: true, cancelable: true });

      editor = new AutoCompleteEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-gender');

      editorElm.focus();
      editorElm.dispatchEvent(event);

      expect(editor.elementCollection).toEqual([{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]);
    });

    it('should return True when calling "isValueChanged()" method with previously dispatched keyboard event being char "a"', () => {
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });

      editor = new AutoCompleteEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-gender');

      editorElm.focus();
      editorElm.dispatchEvent(event);

      expect(editor.isValueChanged()).toBe(true);
    });

    it('should return False when calling "isValueChanged()" method with previously dispatched keyboard event is same char as current value', () => {
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });

      editor = new AutoCompleteEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-gender');

      editor.loadValue({ id: 123, gender: 'a', isActive: true });
      editorElm.focus();
      editorElm.dispatchEvent(event);

      expect(editor.isValueChanged()).toBe(false);
    });

    it('should return True when calling "isValueChanged()" method with previously dispatched keyboard event as ENTER and "alwaysSaveOnEnterKey" is enabled', () => {
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.ENTER, bubbles: true, cancelable: true });
      mockColumn.internalColumnEditor.alwaysSaveOnEnterKey = true;

      editor = new AutoCompleteEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-gender');

      editorElm.focus();
      editorElm.dispatchEvent(event);

      expect(editor.isValueChanged()).toBe(true);
    });

    it('should call "focus()" method and expect the DOM element to be focused and selected', () => {
      editor = new AutoCompleteEditor(editorArguments);
      const editorElm = editor.editorDomElement;
      const spy = jest.spyOn(editorElm, 'focus');
      editor.focus();

      expect(spy).toHaveBeenCalled();
    });

    describe('applyValue method', () => {
      it('should apply the value to the gender property when it passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockItemData = { id: 123, gender: 'female', isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.applyValue(mockItemData, { value: 'female', label: 'female' });

        expect(mockItemData).toEqual({ id: 123, gender: { value: 'female', label: 'female' }, isActive: true });
      });

      it('should apply the value to the gender property with a field having dot notation (complex object) that passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockColumn.field = 'user.gender';
        mockItemData = { id: 1, user: { gender: 'female' }, isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.applyValue(mockItemData, { value: 'female', label: 'female' });

        expect(mockItemData).toEqual({ id: 1, user: { gender: { value: 'female', label: 'female' } }, isActive: true });
      });

      it('should return override the item data as a string found from the collection that passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockColumn.internalColumnEditor.collection = ['male', 'female'];
        mockItemData = { id: 123, gender: 'female', isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.applyValue(mockItemData, 'female');

        expect(mockItemData).toEqual({ id: 123, gender: 'female', isActive: true });
      });

      it('should return item data with an empty string in its value when calling "applyValue" which fails the custom validation', () => {
        mockColumn.internalColumnEditor.validator = (value: any, args: EditorArgs) => {
          if (value.label.length < 10) {
            return { valid: false, msg: 'Must be at least 10 chars long.' };
          }
          return { valid: true, msg: '' };
        };
        mockItemData = { id: 123, gender: 'female', isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.applyValue(mockItemData, 'female');

        expect(mockItemData).toEqual({ id: 123, gender: '', isActive: true });
      });
    });

    describe('forceUserInput flag', () => {
      it('should return DOM element value when "forceUserInput" is enabled and loaded value length is greater then minLength defined when calling "serializeValue"', () => {
        mockColumn.internalColumnEditor.editorOptions = { forceUserInput: true, };
        mockItemData = { id: 123, gender: { value: 'male', label: 'Male' }, isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('Female');
        const output = editor.serializeValue();

        expect(output).toBe('Female');
      });

      it('should return DOM element value when "forceUserInput" is enabled and loaded value length is greater then custom minLength defined when calling "serializeValue"', () => {
        mockColumn.internalColumnEditor.editorOptions = { forceUserInput: true, minLength: 2 } as AutocompleteOption;
        mockItemData = { id: 123, gender: { value: 'male', label: 'Male' }, isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('Female');
        const output = editor.serializeValue();

        expect(output).toBe('Female');
      });

      it('should return loaded value when "forceUserInput" is enabled and loaded value length is lower than minLength defined when calling "serializeValue"', () => {
        mockColumn.internalColumnEditor.editorOptions = { forceUserInput: true, };
        mockItemData = { id: 123, gender: { value: 'male', label: 'Male' }, isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('F');
        const output = editor.serializeValue();

        expect(output).toBe('Male');
      });
    });

    describe('serializeValue method', () => {
      it('should return correct object value even when defining a "customStructure" when calling "serializeValue"', () => {
        mockColumn.internalColumnEditor.collection = [{ option: 'male', text: 'Male' }, { option: 'female', text: 'Female' }];
        mockColumn.internalColumnEditor.customStructure = { value: 'option', label: 'text' };
        mockItemData = { id: 123, gender: { option: 'female', text: 'Female' }, isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('Female');
      });

      it('should return an object output when calling "serializeValue" with its column definition set to "FieldType.object"', () => {
        mockColumn.type = FieldType.object;
        mockColumn.internalColumnEditor.collection = [{ value: 'm', label: 'Male' }, { value: 'f', label: 'Female' }];
        mockItemData = { id: 123, gender: { value: 'f', label: 'Female' }, isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual({ value: 'f', label: 'Female' });
      });
    });

    describe('save method', () => {
      it('should call "getEditorLock" when "hasAutoCommitEdit" is enabled after calling "save()" method', () => {
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new AutoCompleteEditor(editorArguments);
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should call "commitChanges" when "hasAutoCommitEdit" is disabled after calling "save()" method', () => {
        gridOptionMock.autoCommitEdit = false;
        const spy = jest.spyOn(editorArguments, 'commitChanges');

        editor = new AutoCompleteEditor(editorArguments);
        editor.save();

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('validate method', () => {
      it('should validate and return False when field is required and field is an empty string', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('');

        expect(validation).toEqual({ valid: false, msg: 'Field is required' });
      });

      it('should validate and return True when field is required and field is a valid input value', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('gender');

        expect(validation).toEqual({ valid: true, msg: null });
      });
    });

    describe('onSelect method', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should expect "setValue" to have been called but not "autoCommitEdit" when "autoCommitEdit" is disabled', () => {
        const spyCommitEdit = jest.spyOn(gridStub, 'getEditorLock');
        gridOptionMock.autoCommitEdit = false;
        mockColumn.internalColumnEditor.collection = ['male', 'female'];
        mockItemData = { id: 123, gender: 'female', isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        const spySetValue = jest.spyOn(editor, 'setValue');
        const output = editor.onSelect(null, { item: mockItemData.gender });

        expect(output).toBe(false);
        expect(spyCommitEdit).not.toHaveBeenCalled();
        expect(spySetValue).toHaveBeenCalledWith('female');
      });

      it('should expect "setValue" and "autoCommitEdit" to have been called with a string when item provided is a string', (done) => {
        const spyCommitEdit = jest.spyOn(gridStub, 'getEditorLock');
        gridOptionMock.autoCommitEdit = true;
        mockColumn.internalColumnEditor.collection = ['male', 'female'];
        mockItemData = { id: 123, gender: 'female', isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        const spySetValue = jest.spyOn(editor, 'setValue');
        const output = editor.onSelect(null, { item: mockItemData.gender });

        // HOW DO WE TRIGGER the jQuery UI autocomplete select event? The following works only on "autocompleteselect"
        // but that doesn't trigger the "select" (onSelect) directly
        // const editorElm = editor.editorDomElement;
        // editorElm.on('autocompleteselect', (event, ui) => console.log(ui));
        // editorElm[0].dispatchEvent(new (window.window as any).CustomEvent('autocompleteselect', { detail: { item: 'female' }, bubbles: true, cancelable: true }));

        setTimeout(() => {
          expect(output).toBe(false);
          expect(spyCommitEdit).toHaveBeenCalled();
          expect(spySetValue).toHaveBeenCalledWith('female');
          done();
        });
      });

      it('should expect "setValue" and "autoCommitEdit" to have been called with the string label when item provided is an object', () => {
        const spyCommitEdit = jest.spyOn(gridStub, 'getEditorLock');
        gridOptionMock.autoCommitEdit = true;
        mockColumn.internalColumnEditor.collection = [{ value: 'm', label: 'Male' }, { value: 'f', label: 'Female' }];
        mockItemData = { id: 123, gender: { value: 'f', label: 'Female' }, isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        const spySetValue = jest.spyOn(editor, 'setValue');
        const output = editor.onSelect(null, { item: mockItemData.gender });

        expect(output).toBe(false);
        expect(spyCommitEdit).toHaveBeenCalled();
        expect(spySetValue).toHaveBeenCalledWith('Female');
      });
    });
  });
});
