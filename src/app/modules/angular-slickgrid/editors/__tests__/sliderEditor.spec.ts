import { Editors } from '../index';
import { SliderEditor } from '../sliderEditor';
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

describe('SliderEditor', () => {
  let divContainer: HTMLDivElement;
  let editor: SliderEditor;
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
        editor = new SliderEditor(null);
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
      editor = new SliderEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('.slider-editor input.editor-price').length;
      expect(editorCount).toBe(1);
    });

    it('should have a title (tooltip) when defined in its column definition', () => {
      const testValue = 'test title';
      mockColumn.internalColumnEditor.title = testValue;

      editor = new SliderEditor(editorArguments);
      const editorElm = divContainer.querySelector<HTMLInputElement>('.slider-editor input.editor-price');

      expect(editorElm.title).toBe(testValue);
    });

    it('should call "columnEditor" GETTER and expect to equal the editor settings we provided', () => {
      mockColumn.internalColumnEditor = {
        title: 'test title',
      };

      editor = new SliderEditor(editorArguments);

      expect(editor.columnEditor).toEqual(mockColumn.internalColumnEditor);
    });

    it('should create the input editor with defined value and a different step size when "valueStep" is provided', () => {
      mockColumn.internalColumnEditor.valueStep = 5;
      mockItemData = { id: 1, price: 15, isActive: true };

      editor = new SliderEditor(editorArguments);
      editor.loadValue(mockItemData);
      const editorNumberElm = divContainer.querySelector<HTMLInputElement>('.input-group-text');
      const editorInputElm = divContainer.querySelector<HTMLInputElement>('.slider-editor input.editor-price');

      expect(editorInputElm.step).toBe('5');
      expect(editorNumberElm.textContent).toBe('15');
      expect(editor.getValue()).toEqual('15');
    });

    it('should create the input editor with min slider values being set by editor "minValue"', () => {
      mockColumn.internalColumnEditor = {
        minValue: 4,
        maxValue: 69,
      };

      editor = new SliderEditor(editorArguments);

      const editorInputElm = divContainer.querySelector<HTMLInputElement>('.slider-editor input.editor-price');
      const editorNumberElm = divContainer.querySelector<HTMLInputElement>('.input-group-text');

      expect(editorInputElm.min).toBe('4');
      expect(editorInputElm.max).toBe('69');
      expect(editorNumberElm.textContent).toBe('4');
    });

    it('should create the input editor with min/max slider values being set by editor "sliderStartValue" through the editor params', () => {
      mockColumn.internalColumnEditor = { params: { sliderStartValue: 4 } };
      mockItemData = { id: 1, price: null, isActive: true };

      editor = new SliderEditor(editorArguments);
      editor.loadValue(mockItemData);

      const editorInputElm = divContainer.querySelector<HTMLInputElement>('.slider-editor input.editor-price');
      const editorNumberElm = divContainer.querySelector<HTMLInputElement>('.input-group-text');

      expect(editor.getValue()).toEqual('4');
      expect(editorInputElm.min).toBe('0');
      expect(editorInputElm.defaultValue).toBe('4');
      expect(editorNumberElm.textContent).toBe('4');
    });

    it('should create the input editor with default search terms range but without showing side numbers when "hideSliderNumber" is set in params', () => {
      mockColumn.internalColumnEditor.params = { hideSliderNumber: true };
      mockItemData = { id: 1, price: null, isActive: true };

      editor = new SliderEditor(editorArguments);

      const editorNumberElms = divContainer.querySelectorAll<HTMLInputElement>('.input-group-text');

      expect(editorNumberElms.length).toBe(0);
      expect(editor.getValue()).toEqual('0');
    });

    it('should call "setValue" and expect the DOM element value to be the same but as a string when calling "getValue"', () => {
      editor = new SliderEditor(editorArguments);
      editor.setValue(123);

      expect(editor.getValue()).toBe('123');
    });

    it('should call "cancel" and expect "cancelChanges" to be called in the Slickgrid editor object', () => {
      const spy = jest.spyOn(editorArguments, 'cancelChanges');
      editor = new SliderEditor(editorArguments);
      editor.cancel();

      expect(spy).toHaveBeenCalled();
    });

    it('should define an item datacontext containing a string as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
      editor = new SliderEditor(editorArguments);
      editor.loadValue(mockItemData);
      const editorElm = editor.editorDomElement;

      expect(editor.getValue()).toBe('213');
      expect(editorElm[0].defaultValue).toBe('0');
    });

    it('should update slider number every time a change event happens on the input slider', () => {
      mockColumn.internalColumnEditor.params = { hideSliderNumber: false };
      mockItemData = { id: 1, price: 32, isActive: true };
      editor = new SliderEditor(editorArguments);
      editor.loadValue(mockItemData);
      editor.setValue(17);

      const editorElm = divContainer.querySelector('.slider-container.slider-editor');
      const editorNumberElm = divContainer.querySelector<HTMLInputElement>('.input-group-text');
      const mockEvent = new Event('change');
      Object.defineProperty(mockEvent, 'target', { writable: true, configurable: true, value: { value: '13' } });
      editorElm.dispatchEvent(mockEvent);

      expect(editor.isValueChanged()).toBe(true);
      expect(editorNumberElm.textContent).toBe('13');
    });

    describe('isValueChanged method', () => {
      it('should return True when previously dispatched change event is a different slider input number', () => {
        mockColumn.internalColumnEditor.params = { sliderStartValue: 5 };
        mockItemData = { id: 1, price: 32, isActive: true };
        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(45);

        const editorElm = divContainer.querySelector<HTMLInputElement>('.slider-editor input.editor-price');
        editorElm.dispatchEvent(new CustomEvent('change'));

        expect(editor.isValueChanged()).toBe(true);
      });

      it('should return False when previously dispatched change event is the same as default (0) slider input number', () => {
        mockItemData = { id: 1, price: 0, isActive: true };
        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);

        const editorElm = divContainer.querySelector<HTMLInputElement>('.slider-editor input.editor-price');
        editorElm.dispatchEvent(new CustomEvent('change'));

        expect(editor.isValueChanged()).toBe(false);
      });

      it('should return False when previously dispatched change event is the same as default (0) slider input number but provided as a string', () => {
        mockItemData = { id: 1, price: '0', isActive: true };
        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);

        const editorElm = divContainer.querySelector<HTMLInputElement>('.slider-editor input.editor-price');
        editorElm.dispatchEvent(new CustomEvent('change'));

        expect(editor.isValueChanged()).toBe(false);
      });

      it('should return False when previously dispatched change event is the same input number as "sliderStartValue" provided by the user', () => {
        mockColumn.internalColumnEditor.params = { sliderStartValue: 5 };
        mockItemData = { id: 1, price: 5, isActive: true };
        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);

        const editorElm = divContainer.querySelector<HTMLInputElement>('.slider-editor input.editor-price');
        editorElm.dispatchEvent(new CustomEvent('change'));

        expect(editor.isValueChanged()).toBe(false);
      });
    });

    describe('applyValue method', () => {
      it('should apply the value to the price property when it passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockItemData = { id: 1, price: 456, isActive: true };

        editor = new SliderEditor(editorArguments);
        editor.applyValue(mockItemData, 78);

        expect(mockItemData).toEqual({ id: 1, price: 78, isActive: true });
      });

      it('should apply the value to the price property with a field having dot notation (complex object) that passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockColumn.field = 'part.price';
        mockItemData = { id: 1, part: { price: 456 }, isActive: true };

        editor = new SliderEditor(editorArguments);
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

        editor = new SliderEditor(editorArguments);
        editor.applyValue(mockItemData, 4);

        expect(mockItemData).toEqual({ id: 1, price: '', isActive: true });
      });
    });

    describe('serializeValue method', () => {
      it('should return serialized value as a number', () => {
        mockItemData = { id: 1, price: 33, isActive: true };

        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(33);
      });

      it('should return serialized value as a number even when the item property value is a number in a string', () => {
        mockItemData = { id: 1, price: '33', isActive: true };

        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(33);
      });

      it('should return serialized value as the default minimum number (0) when item value provided is an empty string', () => {
        mockItemData = { id: 1, price: '', isActive: true };

        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(0);
      });

      it('should return serialized value as the default minimum number (0) when item value is null', () => {
        mockItemData = { id: 1, price: null, isActive: true };

        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(0);
      });

      it('should return serialized value as the custom "sliderStartValue" number when item value is null', () => {
        mockColumn.internalColumnEditor.params = { sliderStartValue: 5 };
        mockItemData = { id: 1, price: null, isActive: true };

        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(5);
      });

      it('should return value as a number when using a dot (.) notation for complex object', () => {
        mockColumn.field = 'part.price';
        mockItemData = { id: 1, part: { price: 5 }, isActive: true };

        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe(5);
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

        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(35);
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should call "commitChanges" method when "hasAutoCommitEdit" is disabled', () => {
        mockItemData = { id: 1, price: 32, isActive: true };
        gridOptionMock.autoCommitEdit = false;
        const spy = jest.spyOn(editorArguments, 'commitChanges');

        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(35);
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should not call anything when the input value is the same as the default value', () => {
        mockItemData = { id: 1, price: 0, isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should call "getEditorLock" and "save" methods when "hasAutoCommitEdit" is enabled and the event "focusout" is triggered', (done) => {
        mockItemData = { id: 1, price: 32, isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spyCommit = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new SliderEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue(35);
        const spySave = jest.spyOn(editor, 'save');
        const editorElm = editor.editorDomElement;

        editorElm.trigger('mouseup');
        editorElm[0].dispatchEvent(new (window.window as any).Event('mouseup'));

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
        editor = new SliderEditor(editorArguments);
        const validation = editor.validate('');

        expect(validation).toEqual({ valid: false, msg: 'Field is required' });
      });

      it('should return False when field is not between minValue & maxValue defined', () => {
        mockColumn.internalColumnEditor.minValue = 10;
        mockColumn.internalColumnEditor.maxValue = 99;
        editor = new SliderEditor(editorArguments);
        const validation = editor.validate(100);

        expect(validation).toEqual({ valid: false, msg: 'Please enter a valid number between 10 and 99' });
      });
    });
  });
});
