import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Editors } from '../index';
import { DateEditor } from '../dateEditor';
import { Column, EditorArguments, GridOption, FieldType, ColumnEditor } from '../../models';
import * as moment from 'moment-mini';

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
} as unknown as GridOption;

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

describe('DateEditor', () => {
  let divContainer: HTMLDivElement;
  let editor: DateEditor;
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
    translate = TestBed.inject(TranslateService);

    translate.setTranslation('en', {
      CANCEL: 'Cancel',
      SAVE: 'Save',
    });
    translate.setTranslation('fr', {
      CANCEL: 'Annuler',
      SAVE: 'Sauvegarder',
    });
    translate.setDefaultLang('en');
    translate.use('en');

    mockColumn = { id: 'startDate', field: 'startDate', editable: true, editor: { model: Editors.date }, internalColumnEditor: {} } as Column;

    editorArguments = {
      grid: gridStub,
      column: mockColumn,
      item: mockItemData,
      event: null as any,
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
        editor = new DateEditor(null as any);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.`);
        done();
      }
    });
  });

  describe('with valid Editor instance', () => {
    beforeEach(() => {
      mockItemData = { id: 1, startDate: '2001-01-02T11:02:02.000Z', isActive: true };
      mockColumn = { id: 'startDate', field: 'startDate', editable: true, editor: { model: Editors.date }, internalColumnEditor: {} } as Column;

      editorArguments.column = mockColumn;
      editorArguments.item = mockItemData;
    });

    afterEach(() => {
      editor.destroy();
    });

    it('should initialize the editor', () => {
      gridOptionMock.i18n = translate;
      editor = new DateEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-text.editor-startDate').length;
      expect(editorCount).toBe(1);
    });

    it('should initialize the editor and focus on the element after a small delay', (done) => {
      const focusSpy = jest.spyOn(editor, 'focus');
      const showSpy = jest.spyOn(editor, 'focus');
      editor = new DateEditor(editorArguments);
      const editorCount = divContainer.querySelectorAll('input.editor-text.editor-startDate').length;

      setTimeout(() => {
        expect(editorCount).toBe(1);
        expect(focusSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        done();
      }, 51);
    });

    it('should have a placeholder when defined in its column definition', () => {
      const testValue = 'test placeholder';
      (mockColumn.internalColumnEditor as ColumnEditor).placeholder = testValue;

      editor = new DateEditor(editorArguments);
      const editorElm = divContainer.querySelector('input.editor-text.editor-startDate') as HTMLInputElement;

      expect(editorElm.placeholder).toBe(testValue);
    });

    it('should have a title (tooltip) when defined in its column definition', () => {
      const testValue = 'test title';
      (mockColumn.internalColumnEditor as ColumnEditor).title = testValue;

      editor = new DateEditor(editorArguments);
      const editorElm = divContainer.querySelector('input.editor-text.editor-startDate') as HTMLInputElement;

      expect(editorElm.title).toBe(testValue);
    });

    it('should call "columnEditor" GETTER and expect to equal the editor settings we provided', () => {
      mockColumn.internalColumnEditor = {
        placeholder: 'test placeholder',
        title: 'test title',
      };

      editor = new DateEditor(editorArguments);

      expect(editor.columnEditor).toEqual(mockColumn.internalColumnEditor);
    });

    it('should call "setValue" and expect the DOM element value to be the same string when calling "getValue"', () => {
      editor = new DateEditor(editorArguments);
      editor.setValue('2001-01-02T11:02:02.000Z');

      expect(editor.getValue()).toBe('2001-01-02T11:02:02.000Z');
    });

    it('should define an item datacontext containing a string as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
      mockItemData = { id: 1, startDate: '2001-01-02T11:02:02.000Z', isActive: true };
      editor = new DateEditor(editorArguments);
      editor.loadValue(mockItemData);
      const editorElm = editor.editorDomElement;

      expect(editor.getValue()).toBe('2001-01-02T11:02:02.000Z');
      expect(editorElm.defaultValue).toBe('2001-01-02T11:02:02.000Z');
    });

    it('should hide the DOM element when the "hide" method is called', () => {
      editor = new DateEditor(editorArguments);
      const spy = jest.spyOn(editor.flatInstance, 'close');
      const calendarElm = document.body.querySelector<HTMLDivElement>('.flatpickr-calendar');
      editor.hide();

      expect(calendarElm).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    });

    it('should show the DOM element when the "show" method is called', () => {
      editor = new DateEditor(editorArguments);
      const spy = jest.spyOn(editor.flatInstance, 'open');
      const calendarElm = document.body.querySelector<HTMLDivElement>('.flatpickr-calendar');
      editor.show();
      editor.focus();

      expect(calendarElm).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    });

    describe('isValueChanged method', () => {
      it('should return True when date is changed in the picker', () => {
        // change to allow input value only for testing purposes & use the regular flatpickr input to test that one too
        (mockColumn.internalColumnEditor as ColumnEditor).editorOptions = { allowInput: true, altInput: false };
        mockItemData = { id: 1, startDate: '2001-01-02T11:02:02.000Z', isActive: true };

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.focus();
        const editorInputElm = divContainer.querySelector('.flatpickr input') as HTMLInputElement;
        editorInputElm.value = '2024-04-02T16:02:02.239Z';
        editorInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 13, bubbles: true, cancelable: true }));

        expect(editor.isValueChanged()).toBe(true);
      });

      it('should return True when date is reset by the clear date button', () => {
        // change to allow input value only for testing purposes & use the regular flatpickr input to test that one too
        (mockColumn.internalColumnEditor as ColumnEditor).editorOptions = { allowInput: true, altInput: false };
        mockItemData = { id: 1, startDate: '2001-01-02T11:02:02.000Z', isActive: true };

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.focus();
        const clearBtnElm = divContainer.querySelector('.btn.icon-clear') as HTMLInputElement;
        const editorInputElm = divContainer.querySelector('.flatpickr input') as HTMLInputElement;
        clearBtnElm.click();
        editorInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 13, bubbles: true, cancelable: true }));

        expect(editorInputElm.value).toBe('');
        expect(editor.isValueChanged()).toBe(true);
      });

      it('should return False when date in the picker is the same as the current date', () => {
        mockItemData = { id: 1, startDate: '2001-01-02T11:02:02.000Z', isActive: true };
        (mockColumn.internalColumnEditor as ColumnEditor).editorOptions = { allowInput: true }; // change to allow input value only for testing purposes

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        const editorInputElm = divContainer.querySelector('input.flatpickr-alt-input') as HTMLInputElement;
        editorInputElm.value = '2001-01-02T11:02:02.000Z';
        editorInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 13, bubbles: true, cancelable: true }));

        expect(editor.isValueChanged()).toBe(false);
      });

      it('should return False when input date is invalid', () => {
        mockItemData = { id: 1, startDate: '1900-02-32', isActive: true };
        mockColumn.type = FieldType.dateUs;
        (mockColumn.internalColumnEditor as ColumnEditor).editorOptions = { allowInput: true }; // change to allow input value only for testing purposes

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        const editorInputElm = divContainer.querySelector('input.flatpickr-alt-input') as HTMLInputElement;
        editorInputElm.value = '1900-02-32';
        editorInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 13, bubbles: true, cancelable: true }));

        expect(editor.isValueChanged()).toBe(false);
      });
    });

    describe('applyValue method', () => {
      it('should apply the value to the startDate property with ISO format when no "outputType" is defined and when it passes validation', () => {
        (mockColumn.internalColumnEditor as ColumnEditor).validator = null as any;
        mockColumn.type = FieldType.date;
        mockItemData = { id: 1, startDate: '2001-04-05T11:33:42.000Z', isActive: true };

        const newDate = new Date(Date.UTC(2001, 0, 2, 16, 2, 2, 0));
        editor = new DateEditor(editorArguments);
        editor.applyValue(mockItemData, newDate);

        expect(mockItemData).toEqual({ id: 1, startDate: moment(newDate).format('YYYY-MM-DD'), isActive: true });
      });

      it('should apply the value to the startDate property with "outputType" format with a field having dot notation (complex object) that passes validation', () => {
        (mockColumn.internalColumnEditor as ColumnEditor).validator = null as any;
        mockColumn.type = FieldType.date;
        mockColumn.outputType = FieldType.dateTimeIsoAmPm;
        mockColumn.field = 'employee.startDate';
        mockItemData = { id: 1, employee: { startDate: '2001-04-05T11:33:42.000Z' }, isActive: true };

        const newDate = new Date(Date.UTC(2001, 0, 2, 16, 2, 2, 0));
        editor = new DateEditor(editorArguments);
        editor.applyValue(mockItemData, newDate);

        expect(mockItemData).toEqual({ id: 1, employee: { startDate: moment(newDate).format('YYYY-MM-DD hh:mm:ss a') }, isActive: true });
      });

      it('should apply the value to the startDate property with output format defined by "saveOutputType" when it passes validation', () => {
        (mockColumn.internalColumnEditor as ColumnEditor).validator = null as any;
        mockColumn.type = FieldType.date;
        mockColumn.saveOutputType = FieldType.dateTimeIsoAmPm;
        mockItemData = { id: 1, startDate: '2001-04-05T11:33:42.000Z', isActive: true };

        const newDate = new Date(Date.UTC(2001, 0, 2, 16, 2, 2, 0));
        editor = new DateEditor(editorArguments);
        editor.applyValue(mockItemData, newDate);

        expect(mockItemData).toEqual({ id: 1, startDate: moment(newDate).format('YYYY-MM-DD hh:mm:ss a'), isActive: true });
      });

      it('should return item data with an empty string in its value when it fails the custom validation', () => {
        (mockColumn.internalColumnEditor as ColumnEditor).validator = (value: any) => {
          if (value.length > 10) {
            return { valid: false, msg: 'Must be at least 10 chars long.' };
          }
          return { valid: true, msg: '' };
        };
        mockItemData = { id: 1, startDate: '2001-04-05T11:33:42.000Z', isActive: true };

        editor = new DateEditor(editorArguments);
        editor.applyValue(mockItemData, '2001-01-02T16:02:02.000+05:00');

        expect(mockItemData).toEqual({ id: 1, startDate: '', isActive: true });
      });
    });

    describe('serializeValue method', () => {
      it('should return serialized value as a date string', () => {
        mockColumn.type = FieldType.dateIso;
        mockItemData = { id: 1, startDate: '2001-01-02T16:02:02.000+05:00', isActive: true };

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('2001-01-02');
      });

      it('should return serialized value as an empty string when item value is also an empty string', () => {
        mockItemData = { id: 1, startDate: '', isActive: true };

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('');
      });

      it('should return serialized value as an empty string when item value is null', () => {
        mockItemData = { id: 1, startDate: null, isActive: true };

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('');
      });

      it('should return serialized value as a date string when using a dot (.) notation for complex object', () => {
        mockColumn.type = FieldType.dateIso;
        mockColumn.field = 'employee.startDate';
        mockItemData = { id: 1, employee: { startDate: '2001-01-02T16:02:02.000+05:00' }, isActive: true };

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('2001-01-02');
      });
    });

    describe('save method', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should call "getEditorLock" method when "hasAutoCommitEdit" is enabled', () => {
        mockItemData = { id: 1, startDate: '2001-01-02T16:02:02.000+05:00', isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('2022-03-02T16:02:02.000+05:00');
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should call "commitChanges" method when "hasAutoCommitEdit" is disabled', () => {
        mockItemData = { id: 1, startDate: '2001-01-02T16:02:02.000+05:00', isActive: true };
        gridOptionMock.autoCommitEdit = false;
        const spy = jest.spyOn(editorArguments, 'commitChanges');

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.setValue('2022-03-02T16:02:02.000+05:00');
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should not call anything when the input value is empty but is required', () => {
        mockItemData = { id: 1, startDate: '', isActive: true };
        (mockColumn.internalColumnEditor as ColumnEditor).required = true;
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should not throw any error when date is invalid when lower than required "minDate" defined in the "editorOptions" and "autoCommitEdit" is enabled', () => {
        // change to allow input value only for testing purposes & use the regular flatpickr input to test that one too
        (mockColumn.internalColumnEditor as ColumnEditor).editorOptions = { minDate: 'today', altInput: true };
        mockItemData = { id: 1, startDate: '500-01-02T11:02:02.000Z', isActive: true };
        gridOptionMock.autoCommitEdit = true;
        gridOptionMock.autoEdit = true;
        gridOptionMock.editable = true;

        editor = new DateEditor(editorArguments);
        editor.loadValue(mockItemData);
        editor.flatInstance.toggle();
        const editorInputElm = divContainer.querySelector('.flatpickr input') as HTMLInputElement;

        expect(editor.pickerOptions).toBeTruthy();
        expect(editorInputElm.value).toBe('');
        expect(editor.serializeValue()).toBe('');
      });
    });

    describe('validate method', () => {
      it('should return False when field is required and field is empty', () => {
        (mockColumn.internalColumnEditor as ColumnEditor).required = true;
        editor = new DateEditor(editorArguments);
        const validation = editor.validate('');

        expect(validation).toEqual({ valid: false, msg: 'Field is required' });
      });

      it('should return True when field is required and input is a valid input value', () => {
        (mockColumn.internalColumnEditor as ColumnEditor).required = true;
        editor = new DateEditor(editorArguments);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: null });
      });
    });

    describe('with different locale', () => {
      it('should display a console warning when locale is not previously imported', (done) => {
        const consoleSpy = jest.spyOn(global.console, 'warn').mockReturnValue();

        gridOptionMock.i18n = translate;
        translate.use('zz-yy'); // will be trimmed to 2 chars "zz"
        editor = new DateEditor(editorArguments);
        setTimeout(() => {
          expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(`[Angular-Slickgrid] Flatpickr missing locale imports (zz), will revert to English as the default locale.`));
          done();
        });
      });

      it('should display text in new locale', async () => {
        await (await import('flatpickr/dist/l10n/fr')).French;

        gridOptionMock.i18n = translate;
        translate.use('fr');
        editor = new DateEditor(editorArguments);

        const spy = jest.spyOn(editor.flatInstance, 'open');
        const calendarElm = document.body.querySelector('.flatpickr-calendar') as HTMLDivElement;
        const selectonOptionElms = calendarElm.querySelectorAll<HTMLSelectElement>(' .flatpickr-monthDropdown-months option');

        editor.show();

        expect(calendarElm).toBeTruthy();
        expect(selectonOptionElms.length).toBe(12);
        expect(selectonOptionElms[0].textContent).toBe('janvier');
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
