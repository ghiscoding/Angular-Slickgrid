import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { GridOption } from '../../models/gridOption.interface';
import { CheckboxSelectorExtension } from '../checkboxSelectorExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';
import { Column } from '../../models';

declare var Slick: any;

const gridStub = {
  getOptions: jest.fn(),
  getSelectionModel: jest.fn(),
  registerPlugin: jest.fn(),
  setSelectionModel: jest.fn(),
};

const mockAddon = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn(),
  getColumnDefinition: jest.fn(),
  selectRows: jest.fn(),
}));

const mockSelectionModel = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn()
}));

jest.mock('slickgrid/plugins/slick.checkboxselectcolumn', () => mockAddon);
Slick.CheckboxSelectColumn = mockAddon;

jest.mock('slickgrid/plugins/slick.rowselectionmodel', () => mockSelectionModel);
Slick.RowSelectionModel = mockSelectionModel;

describe('checkboxSelectorExtension', () => {
  let translate: TranslateService;
  let extension: CheckboxSelectorExtension;
  const gridOptionsMock = { enableCheckboxSelector: true } as GridOption;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckboxSelectorExtension, ExtensionUtility, SharedService],
      imports: [TranslateModule.forRoot()]
    });
    extension = TestBed.get(CheckboxSelectorExtension);
    translate = TestBed.get(TranslateService);
  });

  it('should return null after calling "create" method when either the column definitions or the grid options is missing', () => {
    const output = extension.create([] as Column[], null);
    expect(output).toBeNull();
  });

  it('should return null after calling "register" method when either the grid object or the grid options is missing', () => {
    const output = extension.register();
    expect(output).toBeNull();
  });

  describe('registered addon', () => {
    let columnSelectionMock: Column;
    let columnsMock: Column[];

    beforeEach(() => {
      columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }];
      columnSelectionMock = { id: '_checkbox_selector', field: 'sel' };
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
    });

    it('should register the addon', () => {
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');

      const instance = extension.create(columnsMock, gridOptionsMock);
      const addonInstance = extension.getAddonInstance();
      const selectionModel = extension.register();

      expect(instance).toBeTruthy();
      expect(instance).toEqual(addonInstance);
      expect(selectionModel).not.toBeNull();
      expect(mockAddon).toHaveBeenCalledWith({});
      expect(mockSelectionModel).toHaveBeenCalledWith({});
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should register the addon with the registered plugin provided as argument', () => {
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');
      const selectionSpy = jest.spyOn(SharedService.prototype.grid, 'getSelectionModel');

      const instance = extension.create(columnsMock, gridOptionsMock);
      const selectionModel = extension.register();
      const selectionModel2 = extension.register(selectionModel);

      expect(selectionModel).not.toBeNull();
      expect(selectionModel2).not.toBeNull();
      expect(mockAddon).toHaveBeenCalledWith({});
      expect(selectionSpy).toHaveBeenCalled();
      expect(mockSelectionModel).toHaveBeenCalledWith({});
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should dispose of the addon', () => {
      const instance = extension.create(columnsMock, gridOptionsMock);
      const destroySpy = jest.spyOn(instance, 'destroy');

      extension.dispose();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should provide addon options and expect them to be called in the addon constructor', () => {
      const optionMock = { selectActiveRow: true };
      const selectionModelOptions = { ...gridOptionsMock, rowSelectionOptions: optionMock };
      const selectionColumn = { ...columnSelectionMock, excludeFromExport: true, excludeFromColumnPicker: true, excludeFromGridMenu: true, excludeFromQuery: true, excludeFromHeaderMenu: true };
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(selectionModelOptions);

      // we can only spy after 1st "create" call, we'll only get a valid selectionColumn on 2nd "create" call
      const instance = extension.create(columnsMock, gridOptionsMock);
      jest.spyOn(instance, 'getColumnDefinition').mockReturnValue(columnSelectionMock);
      expect(columnsMock[0]).not.toEqual(selectionColumn);

      // do our expect here after 2nd "create" call, the selectionColumn flags will change only after this 2nd call
      extension.create(columnsMock, gridOptionsMock);
      extension.register();

      expect(mockSelectionModel).toHaveBeenCalledWith(optionMock);
      expect(columnsMock[0]).toEqual(selectionColumn);
    });

    it('should be able to pre-select rows', (done) => {
      const selectionModelOptions = { ...gridOptionsMock, preselectedRows: [0], rowSelectionOptions: { selectActiveRow: true } };
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(selectionModelOptions);
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');
      const selectionSpy = jest.spyOn(SharedService.prototype.grid, 'getSelectionModel').mockReturnValue(true);

      const instance = extension.create(columnsMock, gridOptionsMock);
      const rowSpy = jest.spyOn(instance, 'selectRows');
      const selectionModel = extension.register();

      expect(selectionModel).not.toBeNull();
      expect(mockAddon).toHaveBeenCalledWith({});
      expect(selectionSpy).toHaveBeenCalled();
      expect(mockSelectionModel).toHaveBeenCalledWith({});
      expect(pluginSpy).toHaveBeenCalledWith(instance);
      setTimeout(() => {
        expect(rowSpy).toHaveBeenCalledWith(selectionModelOptions.preselectedRows);
        done();
      });
    });
  });
});
