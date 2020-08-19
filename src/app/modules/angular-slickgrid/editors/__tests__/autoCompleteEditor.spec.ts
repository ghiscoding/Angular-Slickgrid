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

      expect(editor.instance).toBeTruthy();
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

      expect(editor.elementCollection).toEqual([{ value: 'male', label: 'Male', labelPrefix: '', labelSuffix: '' }, { value: 'female', label: 'Female', labelPrefix: '', labelSuffix: '' }]);
    });

    it('should return True when calling "isValueChanged()" method with previously dispatched keyboard event being char "a"', () => {
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });

      editor = new AutoCompleteEditor(editorArguments);
      editor.setValue('z');
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
        mockColumn.internalColumnEditor.editorOptions = { forceUserInput: true, } as AutocompleteOption;
        mockItemData = { id: 123, gender: { value: 'male', label: 'Male' }, isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('F');
        const output = editor.serializeValue();

        expect(output).toBe('male');
      });
    });

    describe('openSearchListOnFocus flag', () => {
      it('should open the search list by calling the AutoComplete "search" event with an empty string when there are no search term provided', () => {
        mockColumn.internalColumnEditor.collection = [{ value: 'm', label: 'Male' }, { value: 'f', label: 'Female' }];
        mockColumn.internalColumnEditor.editorOptions = { openSearchListOnFocus: true, } as AutocompleteOption;

        const event = new (window.window as any).KeyboardEvent('click', { keyCode: KeyCode.LEFT, bubbles: true, cancelable: true });

        editor = new AutoCompleteEditor(editorArguments);
        const autoCompleteSpy = jest.spyOn(editor.editorDomElement, 'autocomplete');

        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-gender');
        editorElm.focus();
        editorElm.dispatchEvent(event);

        expect(autoCompleteSpy).toHaveBeenCalledWith('search', '');
      });

      it('should open the search list by calling the AutoComplete "search" event with the same search term string that was provided', () => {
        mockColumn.internalColumnEditor.collection = [{ value: 'm', label: 'Male' }, { value: 'f', label: 'Female' }];
        mockColumn.internalColumnEditor.editorOptions = { openSearchListOnFocus: true, } as AutocompleteOption;
        mockItemData = { id: 123, gender: { value: 'f', label: 'Female' }, isActive: true };

        const event = new (window.window as any).KeyboardEvent('click', { keyCode: KeyCode.LEFT, bubbles: true, cancelable: true });

        editor = new AutoCompleteEditor(editorArguments);
        const autoCompleteSpy = jest.spyOn(editor.editorDomElement, 'autocomplete');
        editor.loadValue(mockItemData);
        editor.setValue('Female');

        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-gender');
        editorElm.focus();
        editorElm.dispatchEvent(event);

        expect(autoCompleteSpy).toHaveBeenCalledWith('search', 'Female');
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

        expect(output).toBe('female');
      });

      it('should return an object output when calling "serializeValue" with its column definition set to "FieldType.object" with default label/value', () => {
        mockColumn.type = FieldType.object;
        mockColumn.internalColumnEditor.collection = [{ value: 'm', label: 'Male' }, { value: 'f', label: 'Female' }];
        mockItemData = { id: 123, gender: { value: 'f', label: 'Female' }, isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual({ value: 'f', label: 'Female' });
      });

      it('should return an object output when calling "serializeValue" with its column definition set to "FieldType.object" with custom dataKey/labelKey pair', () => {
        mockColumn.type = FieldType.object;
        mockColumn.internalColumnEditor.collection = [{ value: 'm', label: 'Male' }, { value: 'f', label: 'Female' }];
        mockColumn.dataKey = 'id';
        mockColumn.labelKey = 'name';
        mockItemData = { id: 123, gender: { value: 'f', label: 'Female' }, isActive: true };

        editor = new AutoCompleteEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual({ id: 'f', name: 'Female' });
      });
    });

    describe('save method', () => {
      it('should call "getEditorLock" when "hasAutoCommitEdit" is enabled after calling "save()" method', () => {
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new AutoCompleteEditor(editorArguments);
        editor.setValue('a');
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should call "commitChanges" when "hasAutoCommitEdit" is disabled after calling "save()" method', () => {
        gridOptionMock.autoCommitEdit = false;
        const spy = jest.spyOn(editorArguments, 'commitChanges');

        editor = new AutoCompleteEditor(editorArguments);
        editor.setValue('a');
        editor.save();

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('validate method', () => {
      it('should return False when field is required and field is empty', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('');

        expect(validation).toEqual({ valid: false, msg: 'Field is required' });
      });

      it('should return True when field is required and input is a valid input value', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return False when field is lower than a minLength defined', () => {
        mockColumn.internalColumnEditor.minLength = 5;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is at least 5 character(s)' });
      });

      it('should return False when field is lower than a minLength defined using exclusive operator', () => {
        mockColumn.internalColumnEditor.minLength = 5;
        mockColumn.internalColumnEditor.operatorConditionalType = 'exclusive';
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is more than 5 character(s)' });
      });

      it('should return True when field is equal to the minLength defined', () => {
        mockColumn.internalColumnEditor.minLength = 4;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return False when field is greater than a maxLength defined', () => {
        mockColumn.internalColumnEditor.maxLength = 10;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is less than or equal to 10 characters' });
      });

      it('should return False when field is greater than a maxLength defined using exclusive operator', () => {
        mockColumn.internalColumnEditor.maxLength = 10;
        mockColumn.internalColumnEditor.operatorConditionalType = 'exclusive';
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is less than 10 characters' });
      });

      it('should return True when field is equal to the maxLength defined', () => {
        mockColumn.internalColumnEditor.maxLength = 16;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return True when field is equal to the maxLength defined and "operatorType" is set to "inclusive"', () => {
        mockColumn.internalColumnEditor.maxLength = 16;
        mockColumn.internalColumnEditor.operatorConditionalType = 'inclusive';
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return False when field is equal to the maxLength defined but "operatorType" is set to "exclusive"', () => {
        mockColumn.internalColumnEditor.maxLength = 16;
        mockColumn.internalColumnEditor.operatorConditionalType = 'exclusive';
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is less than 16 characters' });
      });

      it('should return False when field is not between minLength & maxLength defined', () => {
        mockColumn.internalColumnEditor.minLength = 0;
        mockColumn.internalColumnEditor.maxLength = 10;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text length is between 0 and 10 characters' });
      });

      it('should return True when field is is equal to maxLength defined when both min/max values are defined', () => {
        mockColumn.internalColumnEditor.minLength = 0;
        mockColumn.internalColumnEditor.maxLength = 16;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text is 16 chars');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return True when field is is equal to minLength defined when "operatorType" is set to "inclusive" and both min/max values are defined', () => {
        mockColumn.internalColumnEditor.minLength = 4;
        mockColumn.internalColumnEditor.maxLength = 15;
        mockColumn.internalColumnEditor.operatorConditionalType = 'inclusive';
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return False when field is equal to maxLength but "operatorType" is set to "exclusive" when both min/max lengths are defined', () => {
        mockColumn.internalColumnEditor.minLength = 4;
        mockColumn.internalColumnEditor.maxLength = 16;
        mockColumn.internalColumnEditor.operatorConditionalType = 'exclusive';
        editor = new AutoCompleteEditor(editorArguments);
        const validation1 = editor.validate('text is 16 chars');
        const validation2 = editor.validate('text');

        expect(validation1).toEqual({ valid: false, msg: 'Please make sure your text length is between 4 and 16 characters' });
        expect(validation2).toEqual({ valid: false, msg: 'Please make sure your text length is between 4 and 16 characters' });
      });

      it('should return False when field is greater than a maxValue defined', () => {
        mockColumn.internalColumnEditor.maxLength = 10;
        editor = new AutoCompleteEditor(editorArguments);
        const validation = editor.validate('Task is longer than 10 chars');

        expect(validation).toEqual({ valid: false, msg: 'Please make sure your text is less than or equal to 10 characters' });
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

      it('should expect the "onSelect" method to be called when the callback method is triggered when user provide his own filterOptions', () => {
        gridOptionMock.autoCommitEdit = true;
        mockColumn.internalColumnEditor.editorOptions = { source: [], minLength: 3 } as AutocompleteOption;

        const event = new CustomEvent('change');
        editor = new AutoCompleteEditor(editorArguments);
        const spy = jest.spyOn(editor, 'onSelect');
        editor.autoCompleteOptions.select(event, { item: 'fem' });

        expect(spy).toHaveBeenCalledWith(event, { item: 'fem' });
      });

      it('should expect the "onSelect" method to be called when the callback method is triggered', () => {
        gridOptionMock.autoCommitEdit = true;
        mockColumn.internalColumnEditor.collection = [{ value: 'm', label: 'Male' }, { value: 'f', label: 'Female' }];
        mockItemData = { id: 123, gender: { value: 'f', label: 'Female' }, isActive: true };

        const event = new CustomEvent('change');
        editor = new AutoCompleteEditor(editorArguments);
        const spy = jest.spyOn(editor, 'onSelect');
        editor.autoCompleteOptions.select(event, { item: 'fem' });

        expect(spy).toHaveBeenCalledWith(event, { item: 'fem' });
      });

      it('should initialize the editor with editorOptions and expect the "onSelect" method to be called when the callback method is triggered', (done) => {
        gridOptionMock.autoCommitEdit = true;
        mockColumn.internalColumnEditor.collection = [{ value: 'm', label: 'Male' }, { value: 'f', label: 'Female' }];
        mockColumn.internalColumnEditor.editorOptions = { minLength: 3 } as AutocompleteOption;
        mockItemData = { id: 123, gender: { value: 'f', label: 'Female' }, isActive: true };

        const event = new CustomEvent('change');
        editor = new AutoCompleteEditor(editorArguments);
        const onSelectSpy = jest.spyOn(editor, 'onSelect');
        const focusSpy = jest.spyOn(editor, 'focus');
        editor.autoCompleteOptions.select(event, { item: 'fem' });

        expect(onSelectSpy).toHaveBeenCalledWith(event, { item: 'fem' });
        setTimeout(() => {
          expect(focusSpy).toHaveBeenCalled();
          done();
        }, 51);
      });
    });

    describe('renderItem callback method', () => {
      it('should be able to override any jQuery UI callback method', () => {
        const mockCallback = (ul: HTMLElement, item: any) => {
          return $('<li></li>')
            .data('item.autocomplete', item)
            .append(`<div>Hello World`)
            .appendTo(ul);
        };
        mockColumn.internalColumnEditor = {
          editorOptions: {
            source: [],
            classes: { 'ui-autocomplete': 'autocomplete-custom-four-corners' },
          } as AutocompleteOption,
          callbacks: { _renderItem: mockCallback },
        };

        editor = new AutoCompleteEditor(editorArguments);

        expect(editor.instance).toBeTruthy();
        expect(editor.instance._renderItem).toEqual(mockCallback);
      });

      it('should provide "renderItem" in the "filterOptions" and expect the jQueryUI "_renderItem" to be overriden', () => {
        const mockTemplateString = `<div>Hello World</div>`;
        const mockTemplateCallback = (item) => mockTemplateString;
        mockColumn.internalColumnEditor = {
          editorOptions: {
            source: [],
            renderItem: {
              layout: 'fourCorners',
              templateCallback: mockTemplateCallback
            },
          } as AutocompleteOption,
        };
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.LEFT, bubbles: true, cancelable: true });
        editor = new AutoCompleteEditor(editorArguments);
        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-gender');
        const autoCompleteSpy = jest.spyOn(editor.editorDomElement, 'autocomplete');
        editorElm.focus();
        editorElm.dispatchEvent(event);

        expect(editor.editorDomElement).toBeTruthy();
        expect(editor.instance).toBeTruthy();
        expect(editor.autoCompleteOptions).toEqual(expect.objectContaining({ classes: { 'ui-autocomplete': 'autocomplete-custom-four-corners' } }));
        expect(autoCompleteSpy).toHaveBeenCalledWith('instance');
        expect(editor.instance._renderItem).toEqual(expect.any(Function));

        const ulElm = document.createElement('ul');
        editor.instance._renderItem(ulElm, { name: 'John' });

        const liElm = ulElm.querySelector<HTMLLIElement>('li');
        expect(liElm.innerHTML).toBe(mockTemplateString);
      });
    });
  });
});
