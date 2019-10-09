// import 3rd party lib multiple-select for the tests
import '../../../../../assets/lib/multiple-select/multiple-select';

import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Editors } from '../index';
import { MultipleSelectEditor } from '../multipleSelectEditor';
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
  let editor: MultipleSelectEditor;
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
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

      editorArguments.column = mockColumn;
      editorArguments.item = mockItemData;
    });

    afterEach(() => {
      editor.destroy();
    });

    it('should initialize the editor', (done) => {
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      gridOptionMock.i18n = translate;
      editor = new MultipleSelectEditor(editorArguments);
      const editorCount = document.body.querySelectorAll('select.ms-filter.editor-gender').length;
      const spy = jest.spyOn(editor, 'show');

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        expect(editorCount).toBe(1);
        done();
      });
    });

    it('should call "setValue" with a single string and expect the string to be returned as an array when calling "getValue"', () => {
      editor = new MultipleSelectEditor(editorArguments);
      editor.setValue(['male']);

      expect(editor.getValue()).toEqual(['male']);
    });

    it('should hide the DOM element div wrapper when the "hide" method is called', () => {
      editor = new MultipleSelectEditor(editorArguments);
      const editorElm = document.body.querySelector<HTMLDivElement>('[name=editor-gender].ms-drop');

      editor.show();
      expect(editorElm.style.display).toBe('');

      editor.hide();
      expect(editorElm.style.display).toBe('none');
    });

    it('should show the DOM element div wrapper when the "show" method is called', () => {
      editor = new MultipleSelectEditor(editorArguments);
      const editorElm = document.body.querySelector<HTMLDivElement>('[name=editor-gender].ms-drop');

      editor.hide();
      expect(editorElm.style.display).toBe('none');

      editor.show();
      expect(editorElm.style.display).toBe('');
    });
  });
});
