// import 3rd party lib multiple-select for the tests
import '../../../../../assets/lib/multiple-select/multiple-select';

import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Editors } from '../index';
import { SelectEditor } from '../selectEditor';
import { AutocompleteOption, Column, EditorArgs, EditorArguments, GridOption, FieldType, OperatorType } from '../../models';

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
  let editor: SelectEditor;
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

  describe('with invalid Editor instance', () => {
    it('should throw an error when trying to call init without any arguments', (done) => {
      try {
        editor = new SelectEditor(null, true);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.`);
        done();
      }
    });

    it('should throw an error when there is no collection provided in the editor property', (done) => {
      try {
        mockColumn.internalColumnEditor.collection = undefined;
        editor = new SelectEditor(editorArguments, true);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") inside Column Definition Editor for the MultipleSelect/SingleSelect Editor to work correctly.`);
        done();
      }
    });

    it('should throw an error when collection is not a valid array', (done) => {
      try {
        // @ts-ignore
        mockColumn.internalColumnEditor.collection = { hello: 'world' };
        editor = new SelectEditor(editorArguments, true);
      } catch (e) {
        expect(e.toString()).toContain(`The "collection" passed to the Select Editor is not a valid array.`);
        done();
      }
    });

    it('should throw an error when collection is not a valid value/label pair array', (done) => {
      try {
        mockColumn.internalColumnEditor.collection = [{ hello: 'world' }];
        editor = new SelectEditor(editorArguments, true);
      } catch (e) {
        expect(e.toString()).toContain(`[select-editor] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list`);
        done();
      }
    });

    it('should throw an error when "enableTranslateLabel" is set without a valid TranslateService', (done) => {
      try {
        translate = undefined;
        mockColumn.internalColumnEditor.enableTranslateLabel = true;
        mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
        editor = new SelectEditor(editorArguments, true);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.`);
        done();
      }
    });
  });

  describe('with valid Editor instance', () => {
    beforeEach(() => {
      mockItemData = { id: 1, gender: 'male', isActive: true };
      mockColumn = { id: 'gender', field: 'gender', editable: true, editor: { model: Editors.multipleSelect }, internalColumnEditor: {} } as Column;
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }, { value: 'other', label: 'other' }];

      editorArguments.column = mockColumn;
      editorArguments.item = mockItemData;
    });

    afterEach(() => {
      editor.destroy();
    });

    it('should initialize the editor', () => {
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      gridOptionMock.i18n = translate;
      editor = new SelectEditor(editorArguments, true);
      editor.focus();
      const editorCount = document.body.querySelectorAll('select.ms-filter.editor-gender').length;

      expect(editorCount).toBe(1);
    });

    it('should initialize the editor even when user define his own editor options', () => {
      mockColumn.internalColumnEditor.editorOptions = { minLength: 3 } as AutocompleteOption;
      editor = new SelectEditor(editorArguments, true);
      const editorCount = document.body.querySelectorAll('select.ms-filter.editor-gender').length;

      expect(editorCount).toBe(1);
    });

    it('should have a placeholder when defined in its column definition', () => {
      const testValue = 'test placeholder';
      mockColumn.internalColumnEditor.placeholder = testValue;
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

      editor = new SelectEditor(editorArguments, true);
      const editorElm = divContainer.querySelector<HTMLSpanElement>('.ms-filter.editor-gender .placeholder');

      expect(editorElm.innerHTML).toBe(testValue);
    });

    it('should call "columnEditor" GETTER and expect to equal the editor settings we provided', () => {
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      mockColumn.internalColumnEditor.placeholder = 'test placeholder';

      editor = new SelectEditor(editorArguments, true);

      expect(editor.columnEditor).toEqual(mockColumn.internalColumnEditor);
    });

    it('should call "setValue" with a single string and expect the string to be returned in a single string array when calling "getValue" when using single select', () => {
      editor = new SelectEditor(editorArguments, true);
      editor.setValue(['male']);

      expect(editor.getValue()).toEqual(['male']);
    });

    it('should define an item datacontext containing a string as cell value and expect this value to be loaded in the editor when calling "loadValue"', () => {
      editor = new SelectEditor(editorArguments, true);
      editor.loadValue(mockItemData);
      const editorElm = editor.editorDomElement;

      expect(editor.getValue()).toEqual(['male']);
      expect(editorElm[0].value).toEqual('male');
    });

    it('should create the multi-select filter with a blank entry at the beginning of the collection when "addBlankEntry" is set in the "collectionOptions" property', () => {
      mockColumn.internalColumnEditor.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      mockColumn.internalColumnEditor.collectionOptions = { addBlankEntry: true };

      editor = new SelectEditor(editorArguments, true);
      const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
      const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=checkbox]`);
      const editorOkElm = divContainer.querySelector<HTMLButtonElement>(`[name=editor-gender].ms-drop .ms-ok-button`);
      editorBtnElm.click();
      editorOkElm.click();

      expect(editorListElm.length).toBe(3);
      expect(editorListElm[1].textContent).toBe('');
    });

    describe('isValueChanged method', () => {
      it('should return True after doing a check of an option and clicking on the OK button', () => {
        editor = new SelectEditor(editorArguments, true);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=checkbox]`);
        const editorOkElm = divContainer.querySelector<HTMLButtonElement>(`[name=editor-gender].ms-drop .ms-ok-button`);
        editorBtnElm.click();

        // we can use property "checked" or dispatch an event
        editorListElm[0].dispatchEvent(new CustomEvent('click'));
        editorOkElm.click();

        expect(editorListElm.length).toBe(3);
        expect(editor.isValueChanged()).toBe(true);
      });

      it('should return False after doing a check & uncheck of the same option and clicking on the OK button', () => {
        editor = new SelectEditor(editorArguments, true);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=checkbox]`);
        const editorOkElm = divContainer.querySelector<HTMLButtonElement>(`[name=editor-gender].ms-drop .ms-ok-button`);
        editorBtnElm.click();

        // we can use property "checked" or dispatch an event
        // check and uncheck the same option
        editorListElm[0].checked = true;
        editorListElm[0].checked = false;
        editorOkElm.click();

        expect(editorListElm.length).toBe(3);
        expect(editor.isValueChanged()).toBe(true);
      });
    });

    describe('applyValue method', () => {
      it('should apply the value to the gender property when it passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockItemData = { id: 1, gender: 'male', isActive: true };

        editor = new SelectEditor(editorArguments, true);
        editor.applyValue(mockItemData, 'female');

        expect(mockItemData).toEqual({ id: 1, gender: 'female', isActive: true });
      });

      it('should apply the value to the gender (last property) when field has a dot notation (complex object) that passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockColumn.field = 'person.bio.gender';
        mockItemData = { id: 1, person: { bio: { gender: 'male' } }, isActive: true };

        editor = new SelectEditor(editorArguments, true);
        editor.applyValue(mockItemData, 'female');

        expect(mockItemData).toEqual({ id: 1, person: { bio: { gender: 'female' } }, isActive: true });
      });

      it('should apply the value to the bio property (second last) when field has a dot notation (complex object) value provided is an object and it that passes validation', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockColumn.internalColumnEditor.complexObjectPath = 'person.bio';
        mockColumn.field = 'person.bio.gender';
        mockItemData = { id: 1, person: { bio: { gender: 'male' } }, isActive: true };

        editor = new SelectEditor(editorArguments, true);
        editor.applyValue(mockItemData, { gender: 'female' });

        expect(mockItemData).toEqual({ id: 1, person: { bio: { gender: 'female' } }, isActive: true });
      });

      it('should return item data with an empty string in its value when it fails the custom validation', () => {
        mockColumn.internalColumnEditor.validator = (value: any, args: EditorArgs) => {
          if (value.length < 10) {
            return { valid: false, msg: 'Must be at least 10 chars long.' };
          }
          return { valid: true, msg: '' };
        };
        mockItemData = { id: 1, gender: 'male', isActive: true };

        editor = new SelectEditor(editorArguments, true);
        editor.applyValue(mockItemData, 'female');

        expect(mockItemData).toEqual({ id: 1, gender: '', isActive: true });
      });

      it('should apply the value to the gender property as an array with multiple when the input value is a CSV string', () => {
        mockColumn.internalColumnEditor.validator = null;
        mockItemData = { id: 1, gender: 'male', isActive: true };

        editor = new SelectEditor(editorArguments, true);
        editor.applyValue(mockItemData, 'male,other');

        expect(mockItemData).toEqual({ id: 1, gender: ['male', 'other'], isActive: true });
      });

      it('should parse the value as a float when field type is defined as float then apply the value', () => {
        mockColumn = { id: 'age', field: 'age', type: FieldType.boolean, editable: true, editor: { model: Editors.multipleSelect }, internalColumnEditor: {} } as Column;
        mockItemData = { id: 1, gender: 'male', isActive: true, age: 26 };
        mockColumn.internalColumnEditor.collection = [{ value: 20, label: '20' }, { value: 25, label: '25' }];

        editorArguments.column = mockColumn;
        editor = new SelectEditor(editorArguments, true);
        editor.applyValue(mockItemData, 25);

        expect(mockItemData).toEqual({ id: 1, gender: 'male', isActive: true, age: 25 });
      });
    });

    describe('serializeValue method', () => {
      it('should return serialized value as a string', () => {
        mockItemData = { id: 1, gender: 'male', isActive: true };

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual(['male']);
      });

      it('should return serialized value as an empty array when item value is also an empty string', () => {
        mockItemData = { id: 1, gender: '', isActive: true };

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual([]);
      });

      it('should return serialized value as an empty string when item value is null', () => {
        mockItemData = { id: 1, gender: null, isActive: true };

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual([]);
      });

      it('should return value as a string when using a dot (.) notation for complex object with a collection of string values', () => {
        mockColumn.field = 'employee.gender';
        mockColumn.internalColumnEditor.collection = ['male', 'female'];
        mockItemData = { id: 1, employee: { id: 24, gender: 'male' }, isActive: true };

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual(['male']);
      });

      it('should return object value when using a dot (.) notation for complex object with a collection of option/label pair', () => {
        mockColumn.field = 'employee.gender';
        mockItemData = { id: 1, employee: { id: 24, gender: ['male', 'other'] }, isActive: true };
        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual([{ label: 'male', value: 'male' }, { label: 'other', value: 'other' }]);
      });

      it('should return object value when using a dot (.) notation and we override the object path using "complexObjectPath" to find correct values', () => {
        mockColumn.field = 'employee.bio';
        mockItemData = { id: 1, employee: { id: 24, bio: { gender: ['male', 'other'] } }, isActive: true };
        mockColumn.internalColumnEditor.complexObjectPath = 'employee.bio.gender';
        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        const output = editor.serializeValue();

        expect(output).toEqual([{ label: 'male', value: 'male' }, { label: 'other', value: 'other' }]);
      });
    });

    describe('save method', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should call "getEditorLock" method when "hasAutoCommitEdit" is enabled', () => {
        mockItemData = { id: 1, gender: 'male', isActive: true };
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        editor.save();

        expect(spy).toHaveBeenCalled();
      });

      it('should not call anything when "hasAutoCommitEdit" is disabled', () => {
        mockItemData = { id: 1, gender: 'male', isActive: true };
        gridOptionMock.autoCommitEdit = false;
        const spy = jest.spyOn(editorArguments, 'commitChanges');

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should not call anything when the input value is empty but is required', () => {
        mockItemData = { id: 1, gender: '', isActive: true };
        mockColumn.internalColumnEditor.required = true;
        gridOptionMock.autoCommitEdit = true;
        const spy = jest.spyOn(gridStub.getEditorLock(), 'commitCurrentEdit');

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        editor.save();

        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('validate method', () => {
      it('should return False when field is required and field is empty', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new SelectEditor(editorArguments, true);
        const validation = editor.validate('');

        expect(validation).toEqual({ valid: false, msg: 'Field is required' });
      });

      it('should return True when field is required and input is a valid input value', () => {
        mockColumn.internalColumnEditor.required = true;
        editor = new SelectEditor(editorArguments, true);
        const validation = editor.validate('text');

        expect(validation).toEqual({ valid: true, msg: null });
      });
    });

    describe('initialize with collection', () => {
      it('should create the multi-select filter with a default search term when passed as a filter argument even with collection an array of strings', () => {
        mockColumn.internalColumnEditor.collection = ['male', 'female'];

        editor = new SelectEditor(editorArguments, true);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=checkbox]`);
        const editorOkElm = divContainer.querySelector<HTMLButtonElement>(`[name=editor-gender].ms-drop .ms-ok-button`);
        editorBtnElm.click();
        editorOkElm.click();

        expect(editorListElm.length).toBe(2);
        expect(editorListElm[0].value).toBe('male');
        expect(editorListElm[1].value).toBe('female');
      });
    });

    describe('collectionSortBy setting', () => {
      it('should create the multi-select filter and sort the string collection when "collectionSortBy" is set', () => {
        mockColumn.internalColumnEditor = {
          collection: ['other', 'male', 'female'],
          collectionSortBy: {
            sortDesc: true,
            fieldType: FieldType.string
          }
        };

        editor = new SelectEditor(editorArguments, true);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=checkbox]`);
        editorBtnElm.click();

        expect(editorListElm.length).toBe(3);
        expect(editorListElm[0].value).toBe('other');
        expect(editorListElm[1].value).toBe('male');
        expect(editorListElm[2].value).toBe('female');
      });

      it('should create the multi-select filter and sort the value/label pair collection when "collectionSortBy" is set', () => {
        mockColumn.internalColumnEditor = {
          collection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }],
          collectionSortBy: {
            property: 'value',
            sortDesc: false,
            fieldType: FieldType.string
          },
          customStructure: {
            value: 'value',
            label: 'description',
          },
        };

        editor = new SelectEditor(editorArguments, true);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=checkbox]`);
        editorBtnElm.click();

        expect(editorListElm.length).toBe(3);
        expect(editorListElm[0].value).toBe('female');
        expect(editorListElm[1].value).toBe('male');
        expect(editorListElm[2].value).toBe('other');
      });
    });

    describe('collectionFilterBy setting', () => {
      it('should create the multi-select filter and filter the string collection when "collectionFilterBy" is set', () => {
        mockColumn.internalColumnEditor = {
          collection: ['other', 'male', 'female'],
          collectionFilterBy: {
            operator: OperatorType.equal,
            value: 'other'
          }
        };

        editor = new SelectEditor(editorArguments, true);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=checkbox]`);
        editorBtnElm.click();

        expect(editorListElm.length).toBe(1);
        expect(editorListElm[0].value).toBe('other');
      });

      it('should create the multi-select filter and filter the value/label pair collection when "collectionFilterBy" is set', () => {
        mockColumn.internalColumnEditor = {
          collection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }],
          collectionFilterBy: [
            { property: 'value', operator: OperatorType.notEqual, value: 'other' },
            { property: 'value', operator: OperatorType.notEqual, value: 'male' }
          ],
          customStructure: {
            value: 'value',
            label: 'description',
          },
        };

        editor = new SelectEditor(editorArguments, true);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=checkbox]`);
        editorBtnElm.click();

        expect(editorListElm.length).toBe(1);
        expect(editorListElm[0].value).toBe('female');
      });

      it('should create the multi-select filter and filter the value/label pair collection when "collectionFilterBy" is set and "filterResultAfterEachPass" is set to "merge"', () => {
        mockColumn.internalColumnEditor = {
          collection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }],
          collectionFilterBy: [
            { property: 'value', operator: OperatorType.equal, value: 'other' },
            { property: 'value', operator: OperatorType.equal, value: 'male' }
          ],
          collectionOptions: {
            filterResultAfterEachPass: 'merge'
          },
          customStructure: {
            value: 'value',
            label: 'description',
          },
        };

        editor = new SelectEditor(editorArguments, true);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=checkbox]`);
        editorBtnElm.click();

        expect(editorListElm.length).toBe(2);
        expect(editorListElm[0].value).toBe('other');
        expect(editorListElm[1].value).toBe('male');
      });
    });

    describe('collectionInsideObjectProperty setting', () => {
      it('should create the multi-select editor with a value/label pair collection that is inside an object when "collectionInsideObjectProperty" is defined with a dot notation', () => {
        mockColumn.internalColumnEditor = {
          // @ts-ignore
          collection: { deep: { myCollection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }] } },
          collectionOptions: {
            collectionInsideObjectProperty: 'deep.myCollection'
          },
          customStructure: {
            value: 'value',
            label: 'description',
          },
        };

        editor = new SelectEditor(editorArguments, true);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li input[type=checkbox]`);
        editorBtnElm.click();

        expect(editorListElm.length).toBe(3);
        expect(editorListElm[0].value).toBe('other');
        expect(editorListElm[1].value).toBe('male');
        expect(editorListElm[2].value).toBe('female');
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

        editor = new SelectEditor(editorArguments, true);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li span`);
        editorBtnElm.click();

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

        editor = new SelectEditor(editorArguments, true);
        editor.loadValue(mockItemData);
        editor.setValue([false]);
        const editorBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.editor-gender button.ms-choice');
        const editorListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=editor-gender].ms-drop ul>li span`);
        editorBtnElm.click();

        expect(editor.getValue()).toEqual(['']);
        expect(editorListElm.length).toBe(2);
        expect(editorListElm[0].innerHTML).toBe('<i class="fa fa-check"></i> : True');
      });
    });
  });
});
