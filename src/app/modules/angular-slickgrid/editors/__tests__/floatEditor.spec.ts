import { Editors } from '../index';
import { FloatEditor } from '../floatEditor';
import { AutocompleteOption, Column, EditorArgs, EditorArguments, GridOption, KeyCode } from '../../models';

const KEY_CHAR_0 = 48;
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

describe('FloatEditor', () => {
  let divContainer: HTMLDivElement;
  let editor: FloatEditor;
  let editorArguments: EditorArguments;
  let mockColumn: Column;
  let mockItemData: any;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);

    mockColumn = { id: 'price', field: 'price', editable: true, editor: { model: Editors.float }, internalColumnEditor: {} } as Column;

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
        editor = new FloatEditor(null);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.`);
        done();
      }
    });
  });

  describe('with valid Editor instance', () => {
    beforeEach(() => {
      mockItemData = { id: 1, price: 213, isActive: true };
      mockColumn = { id: 'price', field: 'price', editable: true, editor: { model: Editors.float }, internalColumnEditor: {} } as Column;

      editorArguments.column = mockColumn;
      editorArguments.item = mockItemData;
    });

    afterEach(() => {
      editor.destroy();
    });

    it('should initialize the editor', () => {
      editor = new FloatEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-text.editor-price').length;
      expect(editorCount).toBe(1);
    });

    it('should initialize the editor and focus on the element after a small delay', (done) => {
      const spy = jest.spyOn(editor, 'focus');
      editor = new FloatEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-text.editor-price').length;

      setTimeout(() => {
        expect(editorCount).toBe(1);
        expect(spy).toHaveBeenCalled();
        done();
      }, 51);
    });

    it('should have a placeholder when defined in its column definition', () => {
      const testValue = 'test placeholder';
      mockColumn.internalColumnEditor.placeholder = testValue;

      editor = new FloatEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-text.editor-price');

      expect(editorElm.placeholder).toBe(testValue);
    });

    it('should have a title (tooltip) when defined in its column definition', () => {
      const testValue = 'test title';
      mockColumn.internalColumnEditor.title = testValue;

      editor = new FloatEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-text.editor-price');

      expect(editorElm.title).toBe(testValue);
    });

    it('should call "columnEditor" GETTER and expect to equal the editor settings we provided', () => {
      mockColumn.internalColumnEditor = {
        placeholder: 'test placeholder',
        title: 'test title',
        alwaysSaveOnEnterKey: false,
      };

      editor = new FloatEditor(editorArguments);

      expect(editor.columnEditor).toEqual(mockColumn.internalColumnEditor);
    });

    it('should call "setValue" and expect the DOM element value to be the same but as a string when calling "getValue"', () => {
      editor = new FloatEditor(editorArguments);
      editor.setValue(123);

      expect(editor.getValue()).toBe('123');
    });

    it('should define an item datacontext containing a string as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
      editor = new FloatEditor(editorArguments);
      editor.loadValue(mockItemData);
      const editorElm = editor.editorDomElement;

      expect(editor.getValue()).toBe('213');
    });

    it('should dispatch a keyboard event and expect "stopImmediatePropagation()" to have been called when using Left Arrow key', () => {
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.LEFT, bubbles: true, cancelable: true });
      const spyEvent = jest.spyOn(event, 'stopImmediatePropagation');

      editor = new FloatEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-price');

      editor.focus();
      editorElm.dispatchEvent(event);

      expect(spyEvent).toHaveBeenCalled();
    });

    it('should dispatch a keyboard event and expect "stopImmediatePropagation()" to have been called when using Right Arrow key', () => {
      const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.RIGHT, bubbles: true, cancelable: true });
      const spyEvent = jest.spyOn(event, 'stopImmediatePropagation');

      editor = new FloatEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-price');

      editor.focus();
      editorElm.dispatchEvent(event);

      expect(spyEvent).toHaveBeenCalled();
    });

    describe('isValueChanged method', () => {
      it('should return True when previously dispatched keyboard event is a new char 0', () => {
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_0, bubbles: true, cancelable: true });

        editor = new FloatEditor(editorArguments);
        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-price');

        editor.focus();
        editorElm.dispatchEvent(event);

        expect(editor.isValueChanged()).toBe(true);
      });

      it('should return False when previously dispatched keyboard event is same number as current value', () => {
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_0, bubbles: true, cancelable: true });

        editor = new FloatEditor(editorArguments);
        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-price');

        editor.loadValue({ id: 1, price: 0, isActive: true });
        editor.focus();
        editorElm.dispatchEvent(event);

        expect(editor.isValueChanged()).toBe(false);
      });

      it('should return False when previously dispatched keyboard event is same string number as current value', () => {
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KEY_CHAR_0, bubbles: true, cancelable: true });

        editor = new FloatEditor(editorArguments);
        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-price');

        editor.loadValue({ id: 1, price: '0', isActive: true });
        editor.focus();
        editorElm.dispatchEvent(event);

        expect(editor.isValueChanged()).toBe(false);
      });

      it('should return True when previously dispatched keyboard event as ENTER and "alwaysSaveOnEnterKey" is enabled', () => {
        const event = new (window.window as any).KeyboardEvent('keydown', { keyCode: KeyCode.ENTER, bubbles: true, cancelable: true });
        mockColumn.internalColumnEditor.alwaysSaveOnEnterKey = true;

        editor = new FloatEditor(editorArguments);
        const editorElm = divContainer.querySelector<HTMLInputElement>('input.editor-price');

        editor.focus();
        editorElm.dispatchEvent(event);

        expect(editor.isValueChanged()).toBe(true);
      });
    });

    describe('applyValue method', () => {
      it('should apply the value to the price property when it passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockItemData = { id: 1, price: 456, isActive: true };

        editor = new FloatEditor(editorArguments);
        editor.applyValue(mockItemData, 78);

        expect(mockItemData).toEqual({ id: 1, price: 78, isActive: true });
      });

      it('should apply the value to the price property with a field having dot notation (complex object) that passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockColumn.field = 'part.price';
        mockItemData = { id: 1, part: { price: 456 }, isActive: true };

        editor = new FloatEditor(editorArguments);
        editor.applyValue(mockItemData, 78);

        expect(mockItemData).toEqual({ id: 1, part: { price: 78 }, isActive: true });
      });

      it('should return item data with an empty string in its value when it fails the custom validation', () => {
        mockColumn.internalColumnEditor.validator = (value: any, args: EditorArgs) => {
          if (+value < 10) {
            return { valid: false, msg: 'Value must be over 10.' };
          }
          return { valid: true, msg: '' };
        };
        mockItemData = { id: 1, price: 32, isActive: true };

        editor = new FloatEditor(editorArguments);
        editor.applyValue(mockItemData, 4);

        expect(mockItemData).toEqual({ id: 1, price: '', isActive: true });
      });
    });

    describe('serializeValue method', () => {
      it('should return serialized value as a number', () => {
        mockItemData = { id: 1, price: 33, isActive: true };

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(editor.getDecimalPlaces()).toBe(0);
        expect(output).toBe(33);
      });

      it('should return serialized value as a float number when "decimalPlaces" is set to 2', () => {
        mockItemData = { id: 1, price: 32.7, isActive: true };
        mockColumn.internalColumnEditor.params = { decimalPlaces: 2 };

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(editor.getDecimalPlaces()).toBe(2);
        expect(output).toBe(32.7);
      });

      it('should return serialized value as a number even when the item property value is a number in a string', () => {
        mockItemData = { id: 1, price: '33', isActive: true };

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(33);
      });

      it('should return a rounded number when a float is provided without any decimal place defined', () => {
        mockItemData = { id: 1, price: '32.7', isActive: true };

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(editor.getDecimalPlaces()).toBe(0);
        expect(output).toBe(33);
      });

      it('should return serialized value as an empty string when item value is also an empty string', () => {
        mockItemData = { id: 1, price: '', isActive: true };

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('');
      });

      it('should return serialized value as an empty string when item value is null', () => {
        mockItemData = { id: 1, price: null, isActive: true };

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(editor.getDecimalPlaces()).toBe(0);
        expect(output).toBe('');
      });

      it('should return value as a number when using a dot (.) notation for complex object', () => {
        mockColumn.field = 'part.price';
        mockItemData = { id: 1, part: { price: 5 }, isActive: true };

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(5);
      });
    });

    describe('getInputDecimalSteps method', () => {
      it('should return decimal step as 1 increment when decimalPlaces is not set', () => {
        mockItemData = { id: 1, price: 33, isActive: true };

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);

        expect(editor.getInputDecimalSteps()).toBe('1');
      });

      it('should return decimal step as 0.1 increment when decimalPlaces is set to 1 decimal', () => {
        mockItemData = { id: 1, price: 32.7, isActive: true };
        mockColumn.internalColumnEditor.params = { decimalPlaces: 1 };

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);

        expect(editor.getInputDecimalSteps()).toBe('0.1');
      });

      it('should return decimal step as 0.01 increment when decimalPlaces is set to 2 decimal', () => {
        mockItemData = { id: 1, price: 32.7, isActive: true };
        mockColumn.internalColumnEditor.params = { decimalPlaces: 2 };

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);

        expect(editor.getInputDecimalSteps()).toBe('0.01');
      });
    });

    describe('save method', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should call "getEditorLock" method when "hasAutoCommitEdit" is enabled', () => {
        mockItemData = { id: 1, price: 32, isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(35);
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should call "commitChanges" method when "hasAutoCommitEdit" is disabled', () => {
        mockItemData = { id: 1, price: 32, isActive: true };
        gridOptionMock.autoCommitEdit = false;
        const spy = jest.spyOn(editorArguments, 'commitChanges');

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(35);
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should not call anything when the input value is not a valid float number', () => {
        mockItemData = { id: 1, price: '.', isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('.');
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should call "getEditorLock" and "save" methods when "hasAutoCommitEdit" is enabled and the event "focusout" is triggered', (done) => {
        mockItemData = { id: 1, price: 32, isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spyCommit = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new FloatEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(35);
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
        editor = new FloatEditor(editorArguments);
        const validation = editor.validate('');

        expect(validation).toEqual({ valid: false, msg: 'Field is required' });
      });

      it('should return False when field is not a valid float number', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new FloatEditor(editorArguments);
        const validation = editor.validate('abc');

        expect(validation).toEqual({ valid: false, msg: 'Please enter a valid number' });
      });

      it('should return False when field is lower than a minValue defined', () => {
        mockColumn.internalColumnEditor.minValue = 10.2;
        editor = new FloatEditor(editorArguments);
        const validation = editor.validate(10);

        expect(validation).toEqual({ valid: false, msg: 'Please enter a valid number that is greater than 10.2' });
      });

      it('should return False when field is greater than a maxValue defined', () => {
        mockColumn.internalColumnEditor.maxValue = 10.2;
        editor = new FloatEditor(editorArguments);
        const validation = editor.validate(10.22);

        expect(validation).toEqual({ valid: false, msg: 'Please enter a valid number that is lower than 10.2' });
      });

      it('should return False when field is not between minValue & maxValue defined', () => {
        mockColumn.internalColumnEditor.minValue = 10.5;
        mockColumn.internalColumnEditor.maxValue = 99.5;
        editor = new FloatEditor(editorArguments);
        const validation = editor.validate(99.6);

        expect(validation).toEqual({ valid: false, msg: 'Please enter a valid number between 10.5 and 99.5' });
      });

      it('should return False when field has more decimals than the "decimalPlaces" which is the maximum decimal allowed', () => {
        mockColumn.internalColumnEditor.params = { decimalPlaces: 2 };

        editor = new FloatEditor(editorArguments);
        const validation = editor.validate(99.6433);

        expect(validation).toEqual({ valid: false, msg: 'Please enter a valid number with a maximum of 2 decimals' });
      });

      it('should return True when field has less decimals than the "decimalPlaces" which is valid', () => {
        mockColumn.internalColumnEditor.params = { decimalPlaces: 2 };

        editor = new FloatEditor(editorArguments);
        const validation = editor.validate(99.6);

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return True when field has same number of decimals than the "decimalPlaces" which is also valid', () => {
        mockColumn.internalColumnEditor.params = { decimalPlaces: 2 };

        editor = new FloatEditor(editorArguments);
        const validation = editor.validate(99.65);

        expect(validation).toEqual({ valid: true, msg: '' });
      });

      it('should return True when field is required and field is a valid input value', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new FloatEditor(editorArguments);
        const validation = editor.validate(2.5);

        expect(validation).toEqual({ valid: true, msg: '' });
      });
    });
  });
});
