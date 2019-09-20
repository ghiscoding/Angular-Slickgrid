import { Editors } from '../index';
import { AutoCompleteEditor } from '../autoCompleteEditor';
import { AutocompleteOption, Column, FieldType, EditorArguments, GridOption, OperatorType, KeyCode } from '../../models';

const containerId = 'demo-container';

// define a <div> container to simulate the grid container
const template = `<div id="${containerId}"></div>`;

const dataViewStub = {
  refresh: jest.fn(),
};

const gridOptionMock = {
  enableeditoring: true,
  enableeditorTrimWhiteSpace: true,
} as GridOption;

const gridStub = {
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
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
      const editorElm = editor.editorDomElement;

      expect(editor.getValue()).toBe('male');
      expect(editorElm[0].defaultValue).toBe('male');
    });

    it('should define an item datacontext containing a complex object as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
      mockItemData = { id: 123, gender: { value: 'male', label: 'Male' }, isActive: true };
      mockColumn.field = 'gender.value';
      editor = new AutoCompleteEditor(editorArguments);
      editor.loadValue(mockItemData);
      const editorElm = editor.editorDomElement;

      expect(editor.getValue()).toBe('Male');
      expect(editorElm[0].defaultValue).toBe('Male');
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
  });
});
