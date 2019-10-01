// import 3rd party lib multiple-select for the tests
import '../../../../../assets/lib/multiple-select/multiple-select';

import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Editors } from '../index';
import { SingleSelectEditor } from '../singleSelectEditor';
import { Column, EditorArguments, GridOption } from '../../models';

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
  let editor: SingleSelectEditor;
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

  describe('with valid Editor instance', () => {
    beforeEach(() => {
      mockItemData = { id: 1, gender: 'male', isActive: true };
      mockColumn = { id: 'gender', field: 'gender', editable: true, editor: { model: Editors.multipleSelect }, internalColumnEditor: {} } as Column;
      mockColumn.internalColumnEditor.collection = [{ value: '', label: '' }, { value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

      editorArguments.column = mockColumn;
      editorArguments.item = mockItemData;
    });

    afterEach(() => {
      editor.destroy();
    });

    it('should initialize the editor', () => {
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      gridOptionMock.i18n = translate;
      editor = new SingleSelectEditor(editorArguments);
      const editorCount = document.body.querySelectorAll('select.ms-filter.editor-gender').length;

      expect(editorCount).toBe(1);
    });

    it('should hide the DOM element div wrapper when the "hide" method is called', () => {
      editor = new SingleSelectEditor(editorArguments);
      const editorElm = document.body.querySelector<HTMLDivElement>('[name=editor-gender].ms-drop');

      editor.show();
      expect(editorElm.style.display).toBe('');

      editor.hide();
      expect(editorElm.style.display).toBe('none');
    });

    it('should show the DOM element div wrapper when the "show" method is called', () => {
      editor = new SingleSelectEditor(editorArguments);
      const editorElm = document.body.querySelector<HTMLDivElement>('[name=editor-gender].ms-drop');

      editor.hide();
      expect(editorElm.style.display).toBe('none');

      editor.show();
      expect(editorElm.style.display).toBe('');
    });

    it('should call "setValue" with a single string and expect the string to be returned as an single string when calling "getValue"', () => {
      editor = new SingleSelectEditor(editorArguments);
      editor.setValue('male');

      expect(editor.getValue()).toEqual('male');
    });

    describe('isValueChanged method', () => {
      it('should return True after doing a check of an option', () => {
        editor = new SingleSelectEditor(editorArguments);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=radio]`);
        editorBtnElm.click();

        // we can use property "checked" or dispatch an event
        editorListElm[0].dispatchEvent(new CustomEvent('click'));

        expect(editorListElm.length).toBe(3);
        expect(editor.isValueChanged()).toBe(true);
      });

      it('should return False after re-selecting the same option as the one loaded', () => {
        mockColumn.internalColumnEditor.collection = ['male', 'female'];
        mockItemData = { id: 1, gender: 'male', isActive: true };

        editor = new SingleSelectEditor(editorArguments);
        editor.loadValue(mockItemData);

        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=radio]`);
        editorBtnElm.click();

        // we can use property "checked" or dispatch an event
        editorListElm[0].dispatchEvent(new CustomEvent('click'));

        expect(editorListElm.length).toBe(2);
        expect(editor.isValueChanged()).toBe(false);
      });
    });

    describe('serializeValue method', () => {
      it('should return serialized value as a string', () => {
        mockItemData = { id: 1, gender: 'male', isActive: true };

        editor = new SingleSelectEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toBe('male');
      });
    });

    describe('serializeValue method', () => {
      it('should return serialized value as a string', () => {
        mockItemData = { id: 1, gender: 'male', isActive: true };

        editor = new SingleSelectEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual('male');
      });

      it('should return serialized value as an empty array when item value is also an empty string', () => {
        mockItemData = { id: 1, gender: '', isActive: true };

        editor = new SingleSelectEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual('');
      });

      it('should return serialized value as an empty string when item value is null', () => {
        mockItemData = { id: 1, gender: null, isActive: true };

        editor = new SingleSelectEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual('');
      });

      it('should return value as a string when using a dot (.) notation for complex object', () => {
        mockColumn.field = 'employee.gender';
        mockColumn.internalColumnEditor.collection = ['male', 'female'];
        mockItemData = { id: 1, employee: { gender: 'male' }, isActive: true };

        editor = new SingleSelectEditor(editorArguments);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual('male');
      });
    });

    describe('enableRenderHtml property', () => {
      it('should create the multi-select filter with a default search term and have the HTML rendered when "enableRenderHtml" is set', () => {
        mockColumn.internalColumnEditor = {
          enableRenderHtml: true,
          collection: [{ value: true, label: 'True', labelPrefix: `<i class="fa fa-check"></i> ` }, { value: false, label: 'False' }],
          customStructure: {
            value: 'isEffort',
            label: 'label',
            labelPrefix: 'labelPrefix',
          },
        };

        editor = new SingleSelectEditor(editorArguments);
        editor.setValue(false);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li span`);
        editorBtnElm.click();

        expect(editor.getValue()).toEqual(undefined);
        expect(editorListElm.length).toBe(2);
        expect(editorListElm[0].innerHTML).toBe('<i class="fa fa-check"></i> True');
      });

      it('should create the multi-select filter with a default search term and have the HTML rendered and sanitized when "enableRenderHtml" is set and has <script> tag', () => {
        mockColumn.internalColumnEditor = {
          enableRenderHtml: true,
          collection: [{ isEffort: true, label: 'True', labelPrefix: `<script>alert('test')></script><i class="fa fa-check"></i> ` }, { isEffort: false, label: 'False' }],
          collectionOptions: {
            separatorBetweenTextLabels: ': ',
            includePrefixSuffixToSelectedValues: true,
          },
          customStructure: {
            value: 'isEffort',
            label: 'label',
            labelPrefix: 'labelPrefix',
          },
        };
        mockItemData = { id: 1, gender: 'male', isEffort: false };

        editor = new SingleSelectEditor(editorArguments);
        editor.loadValue(mockItemData);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li span`);
        editorBtnElm.click();

        expect(editor.getValue()).toEqual(`<script>alert('test')></script><i class="fa fa-check"></i> : true`);
        expect(editorListElm.length).toBe(2);
        expect(editorListElm[0].innerHTML).toBe('<i class="fa fa-check"></i> : True');
      });
    });
  });
});
