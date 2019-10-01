import { Editors } from '../index';
import { CheckboxEditor } from '../checkboxEditor';
import { AutocompleteOption, Column, EditorArgs, EditorArguments, GridOption, KeyCode } from '../../models';

const KEY_CHAR_SPACE = 32;
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

describe('CheckboxEditor', () => {
  let divContainer: HTMLDivElement;
  let editor: CheckboxEditor;
  let editorArguments: EditorArguments;
  let mockColumn: Column;
  let mockItemData: any;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);

    mockColumn = { id: 'isActive', field: 'isActive', editable: true, editor: { model: Editors.checkbox }, internalColumnEditor: {} } as Column;

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
        editor = new CheckboxEditor(null);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.`);
        done();
      }
    });
  });

  describe('with valid Editor instance', () => {
    beforeEach(() => {
      mockItemData = { id: 1, title: 'task 1', isActive: true };
      mockColumn = { id: 'isActive', field: 'isActive', editable: true, editor: { model: Editors.checkbox }, internalColumnEditor: {} } as Column;

      editorArguments.column = mockColumn;
      editorArguments.item = mockItemData;
    });

    afterEach(() => {
      editor.destroy();
    });

    it('should initialize the editor', () => {
      editor = new CheckboxEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-checkbox.editor-isActive').length;
      expect(editorCount).toBe(1);
    });

    it('should initialize the editor even when user define his own editor options', () => {
      mockColumn.internalColumnEditor.editorOptions = { minLength: 3 } as AutocompleteOption;
      editor = new CheckboxEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-checkbox.editor-isActive').length;

      expect(editorCount).toBe(1);
    });

    it('should have a title (tooltip) when defined in its column definition', () => {
      const testValue = 'test title';
      mockColumn.internalColumnEditor.title = testValue;

      editor = new CheckboxEditor(editorArguments);
      const editorElmJquery = editor.editorDomElement;
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-checkbox.editor-isActive');

      expect(editorElm.title).toBe(testValue);
      expect(editorElmJquery[0].title).toBe(testValue);
    });

    it('should call "columnEditor" GETTER and expect to equal the editor settings we provided', () => {
      mockColumn.internalColumnEditor = {
        title: 'test title',
      };

      editor = new CheckboxEditor(editorArguments);

      expect(editor.columnEditor).toEqual(mockColumn.internalColumnEditor);
    });

    it('should call "setValue" with true and expect the DOM element value to return true (representing checked)', () => {
      editor = new CheckboxEditor(editorArguments);
      editor.setValue(true);

      expect(editor.getValue()).toBe(true);
    });

    it('should call "setValue" with any value and still expect the DOM element value to return true (representing checked)', () => {
      editor = new CheckboxEditor(editorArguments);
      editor.setValue('anything');

      expect(editor.getValue()).toBe(true);
    });

    it('should call "setValue" with false and expect the DOM element value to return false (representing unchecked)', () => {
      editor = new CheckboxEditor(editorArguments);
      editor.setValue(false);

      expect(editor.getValue()).toBe(false);
    });

    it('should define an item datacontext containing a string as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
      editor = new CheckboxEditor(editorArguments);
      editor.loadValue(mockItemData);

      expect(editor.getValue()).toBe(true);
    });

    describe('isValueChanged method', () => {
      it('should return True when previous event is a click event', () => {
        gridOptionMock.autoCommitEdit = true;
        editor = new CheckboxEditor(editorArguments);
        const spy = jest.spyOn(editor, 'save');
        editor.loadValue({ id: 2, title: 'task 1', isActive: true });

        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-isActive');
        editorElm.dispatchEvent(new (window.window as any).CustomEvent('click'));

        expect(editor.isValueChanged()).toBe(true);
        expect(spy).toHaveBeenCalled();
      });

      it('should return False when previous event is not a click event', () => {
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_SPACE, bubbles: true, cancelable: true });

        editor = new CheckboxEditor(editorArguments);
        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-isActive');

        editor.loadValue({ id: 1, title: 'task 1', isActive: true });
        editor.focus();
        editorElm.dispatchEvent(event);

        expect(editor.isValueChanged()).toBe(false);
      });
    });

    describe('applyValue method', () => {
      it('should apply the value to the isActive property when it passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockItemData = { id: 1, title: 'task 1', isActive: true };

        editor = new CheckboxEditor(editorArguments);
        editor.applyValue(mockItemData, false);

        expect(mockItemData).toEqual({ id: 1, title: 'task 1', isActive: false });
      });

      it('should apply the value to the title property with a field having dot notation (complex object) that passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockColumn.field = 'part.isActive';
        mockItemData = { id: 1, part: { isActive: true } };

        editor = new CheckboxEditor(editorArguments);
        editor.applyValue(mockItemData, false);

        expect(mockItemData).toEqual({ id: 1, part: { isActive: false } });
      });
    });

    describe('serializeValue method', () => {
      it('should return serialized value as a boolean true when provided a true boolean input', () => {
        mockItemData = { id: 1, title: 'task 1', isActive: true };

        editor = new CheckboxEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(true);
      });

      it('should return serialized value as a boolean true when provided a true string input', () => {
        mockItemData = { id: 1, title: 'task 1', isActive: 'true' };

        editor = new CheckboxEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(true);
      });

      it('should return serialized value as a boolean False when provided a false boolean input', () => {
        mockItemData = { id: 1, title: 'task 1', isActive: false };

        editor = new CheckboxEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(false);
      });

      it('should return serialized value as a boolean True when provided any string', () => {
        mockItemData = { id: 1, title: 'task 1', isActive: 'checked' };

        editor = new CheckboxEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(true);
      });

      it('should return serialized value as False when item value is null', () => {
        mockItemData = { id: 1, title: null, isActive: null };

        editor = new CheckboxEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(false);
      });

      it('should return value as a number when using a dot (.) notation for complex object', () => {
        mockColumn.field = 'task.isActive';
        mockItemData = { id: 1, task: { isActive: true } };

        editor = new CheckboxEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(true);
      });
    });

    describe('save method', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should call "getEditorLock" method when "hasAutoCommitEdit" is enabled', () => {
        mockItemData = { id: 1, title: 'task', isActive: false };
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new CheckboxEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(true);
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should call "commitChanges" method when "hasAutoCommitEdit" is disabled', () => {
        mockItemData = { id: 1, title: 'task', isActive: false };
        gridOptionMock.autoCommitEdit = false;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new CheckboxEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(true);
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should not call anything when the input value is false but is required', () => {
        mockItemData = { id: 1, title: 'task 1', isActive: false };
        mockColumn.internalColumnEditor.required = true;
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new CheckboxEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(false);
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should not call anything when the input value is null but is required', () => {
        mockItemData = { id: 1, title: 'task 1', isActive: null };
        mockColumn.internalColumnEditor.required = true;
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new CheckboxEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(false);
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should not save when custom validation fails', () => {
        mockColumn.internalColumnEditor.validator = (value: any, args: EditorArgs) => {
          if (!value) {
            return { valid: false, msg: 'This must be accepted' };
          }
          return { valid: true, msg: '' };
        };
        mockItemData = { id: 1, title: 'task 1', isActive: false };
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new CheckboxEditor(editorArguments);
        editor.applyValue(mockItemData, false);
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('validate method', () => {
      it('should return False when field is required and field is empty, null or false', () => {
        const expectation = { valid: false, msg: 'Field is required' };
        mockColumn.internalColumnEditor.required = true;
        editor = new CheckboxEditor(editorArguments);
        const validation1 = editor.validate('');
        const validation2 = editor.validate(null);
        const validation3 = editor.validate(false);

        expect(validation1).toEqual(expectation);
        expect(validation2).toEqual(expectation);
        expect(validation3).toEqual(expectation);
      });

      it('should return True when field is required and input is provided with True', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new CheckboxEditor(editorArguments);
        const validation = editor.validate(true);

        expect(validation).toEqual({ valid: true, msg: null });
      });

      it('should return True when field is required and input is provided with any text', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new CheckboxEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: null });
      });
    });
  });
});
