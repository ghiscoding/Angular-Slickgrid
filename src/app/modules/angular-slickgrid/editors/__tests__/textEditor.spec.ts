import { Editors } from '../index';
import { TextEditor } from '../textEditor';
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

describe('TextEditor', () => {
  let divContainer: HTMLDivElement;
  let editor: TextEditor;
  let editorArguments: EditorArguments;
  let mockColumn: Column;
  let mockItemData: any;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);

    mockColumn = { id: 'title', field: 'title', editable: true, editor: { model: Editors.text }, internalColumnEditor: {} } as Column;

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
        editor = new TextEditor(null);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.`);
        done();
      }
    });
  });

  describe('with valid Editor instance', () => {
    beforeEach(() => {
      mockItemData = { id: 1, title: 'task 1', isActive: true };
      mockColumn = { id: 'title', field: 'title', editable: true, editor: { model: Editors.text }, internalColumnEditor: {} } as Column;

      editorArguments.column = mockColumn;
      editorArguments.item = mockItemData;
    });

    afterEach(() => {
      editor.destroy();
    });

    it('should initialize the editor', () => {
      editor = new TextEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-text.editor-title').length;
      expect(editorCount).toBe(1);
    });

    it('should initialize the editor and focus on the element after a small delay', (done) => {
      const spy = jest.spyOn(editor, 'focus');
      editor = new TextEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-text.editor-title').length;

      setTimeout(() => {
        expect(editorCount).toBe(1);
        expect(spy).toHaveBeenCalled();
        done();
      }, 51);
    });

    it('should initialize the editor even when user define his own editor options', () => {
      mockColumn.internalColumnEditor.editorOptions = { minLength: 3 } as AutocompleteOption;
      editor = new TextEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-text.editor-title').length;

      expect(editorCount).toBe(1);
    });

    it('should have a placeholder when defined in its column definition', () => {
      const testValue = 'test placeholder';
      mockColumn.internalColumnEditor.placeholder = testValue;

      editor = new TextEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-text.editor-title');

      expect(editorElm.placeholder).toBe(testValue);
    });

    it('should have a title (tooltip) when defined in its column definition', () => {
      const testValue = 'test title';
      mockColumn.internalColumnEditor.title = testValue;

      editor = new TextEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-text.editor-title');

      expect(editorElm.title).toBe(testValue);
    });

    it('should call "columnEditor" GETTER and expect to equal the editor settings we provided', () => {
      mockColumn.internalColumnEditor = {
        placeholder: 'test placeholder',
        title: 'test title',
        alwaysSaveOnEnterKey: false,
      };

      editor = new TextEditor(editorArguments);

      expect(editor.columnEditor).toEqual(mockColumn.internalColumnEditor);
    });

    it('should call "setValue" and expect the DOM element value to be the same string when calling "getValue"', () => {
      editor = new TextEditor(editorArguments);
      editor.setValue('task 1');

      expect(editor.getValue()).toBe('task 1');
    });

    it('should define an item datacontext containing a string as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
      editor = new TextEditor(editorArguments);
      editor.loadValue(mockItemData);
      const editorElm = editor.editorDomElement;

      expect(editor.getValue()).toBe('task 1');
    });

    it('should dispatch a keyboard event and expect "stopImmediatePropagation()" to have been called when using Left Arrow key', () => {
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.LEFT, bubbles: true, cancelable: true });
      const spyEvent = jest.spyOn(event, 'stopImmediatePropagation');

      editor = new TextEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-title');

      editor.focus();
      editorElm.dispatchEvent(event);

      expect(spyEvent).toHaveBeenCalled();
    });

    it('should dispatch a keyboard event and expect "stopImmediatePropagation()" to have been called when using Right Arrow key', () => {
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.RIGHT, bubbles: true, cancelable: true });
      const spyEvent = jest.spyOn(event, 'stopImmediatePropagation');

      editor = new TextEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-title');

      editor.focus();
      editorElm.dispatchEvent(event);

      expect(spyEvent).toHaveBeenCalled();
    });

    describe('isValueChanged method', () => {
      it('should return True when previously dispatched keyboard event is a new char "a"', () => {
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });

        editor = new TextEditor(editorArguments);
        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-title');

        editor.focus();
        editorElm.dispatchEvent(event);

        expect(editor.isValueChanged()).toBe(true);
      });

      it('should return False when previously dispatched keyboard event is same string number as current value', () => {
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_A, bubbles: true, cancelable: true });

        editor = new TextEditor(editorArguments);
        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-title');

        editor.loadValue({ id: 1, title: 'a', isActive: true });
        editor.focus();
        editorElm.dispatchEvent(event);

        expect(editor.isValueChanged()).toBe(false);
      });

      it('should return True when previously dispatched keyboard event as ENTER and "alwaysSaveOnEnterKey" is enabled', () => {
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.ENTER, bubbles: true, cancelable: true });
        mockColumn.internalColumnEditor.alwaysSaveOnEnterKey = true;

        editor = new TextEditor(editorArguments);
        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-title');

        editor.focus();
        editorElm.dispatchEvent(event);

        expect(editor.isValueChanged()).toBe(true);
      });
    });

    describe('applyValue method', () => {
      it('should apply the value to the title property when it passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockItemData = { id: 1, title: 'task 1', isActive: true };

        editor = new TextEditor(editorArguments);
        editor.applyValue(mockItemData, 'task 2');

        expect(mockItemData).toEqual({ id: 1, title: 'task 2', isActive: true });
      });

      it('should apply the value to the title property with a field having dot notation (complex object) that passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockColumn.field = 'part.title';
        mockItemData = { id: 1, part: { title: 'task 1' }, isActive: true };

        editor = new TextEditor(editorArguments);
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

        editor = new TextEditor(editorArguments);
        editor.applyValue(mockItemData, 'task 2');

        expect(mockItemData).toEqual({ id: 1, title: '', isActive: true });
      });
    });

    describe('serializeValue method', () => {
      it('should return serialized value as a string', () => {
        mockItemData = { id: 1, title: 'task 1', isActive: true };

        editor = new TextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('task 1');
      });

      it('should return serialized value as an empty string when item value is also an empty string', () => {
        mockItemData = { id: 1, title: '', isActive: true };

        editor = new TextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('');
      });

      it('should return serialized value as an empty string when item value is null', () => {
        mockItemData = { id: 1, title: null, isActive: true };

        editor = new TextEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('');
      });

      it('should return value as a number when using a dot (.) notation for complex object', () => {
        mockColumn.field = 'task.title';
        mockItemData = { id: 1, task: { title: 'task 1' }, isActive: true };

        editor = new TextEditor(editorArguments);
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

        editor = new TextEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('task 21');
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should call "commitChanges" method when "hasAutoCommitEdit" is disabled', () => {
        mockItemData = { id: 1, title: 'task', isActive: true };
        gridOptionMock.autoCommitEdit = false;
        const spy = jest.spyOn(editorArguments, 'commitChanges');

        editor = new TextEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('task 21');
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should not call anything when the input value is empty but is required', () => {
        mockItemData = { id: 1, title: 'task', isActive: true };
        mockColumn.internalColumnEditor.required = true;
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new TextEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('');
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should call "getEditorLock" and "save" methods when "hasAutoCommitEdit" is enabled and the event "focusout" is triggered', (done) => {
        mockItemData = { id: 1, title: 'task', isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spyCommit = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new TextEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('task 21');
        const spySave = jest.spyOn(editor, 'save');
        const editorElm = editor.editorDomElement;

        editorElm.trigger('focusout');
        editorElm[0].dispatchEvent(new (window.window as any).Event('focusout'));

        setTimeout(() => {
          expect(spyCommit).toHaveBeenCalled();
          expect(spySave).toHaveBeenCalled();
          done();
        });
      });
    });

    describe('validate method', () => {
      it('should return False when field is required and field is empty', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new TextEditor(editorArguments);
        const validation = editor.validate('');

        expect(validation).toEqual({ valid: false, msg: 'Field is required' });
      });

      it('should return True when field is required and input is a valid input value', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new TextEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: null });
      });
    });
  });
});
