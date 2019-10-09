import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import {
  GridOption,
  ExtensionName,
  ExtensionModel,
  Column,
} from '../../models';
import {
  AutoTooltipExtension,
  CellExternalCopyManagerExtension,
  CheckboxSelectorExtension,
  ColumnPickerExtension,
  DraggableGroupingExtension,
  GridMenuExtension,
  GroupItemMetaProviderExtension,
  HeaderButtonExtension,
  HeaderMenuExtension,
  RowDetailViewExtension,
  RowMoveManagerExtension,
  RowSelectionExtension
} from '../../extensions';
import { ExtensionService, SharedService } from '..';

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getScrollbarDimensions: jest.fn(),
  getOptions: jest.fn(),
  getColumns: jest.fn(),
  setColumns: jest.fn(),
  onColumnsReordered: jest.fn(),
  onColumnsResized: jest.fn(),
  registerPlugin: jest.fn(),
  setSelectedRows: jest.fn(),
};

const extensionStub = {
  create: jest.fn(),
  dispose: jest.fn(),
  getAddonInstance: jest.fn(),
  register: jest.fn()
};
const extensionGroupItemMetaStub = { ...extensionStub };
const extensionGridMenuStub = {
  ...extensionStub,
  refreshBackendDataset: jest.fn(),
  translateGridMenu: jest.fn()
};
const extensionColumnPickerStub = {
  ...extensionStub,
  translateColumnPicker: jest.fn()
};
const extensionHeaderMenuStub = {
  ...extensionStub,
  translateHeaderMenu: jest.fn()
};

describe('ExtensionService', () => {
  let service: ExtensionService;
  let sharedService: SharedService;
  let translate: TranslateService;

  describe('with ngx-translate', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          // services
          ExtensionService,
          TranslateService,
          SharedService,

          // extensions
          { provide: AutoTooltipExtension, useValue: extensionStub },
          { provide: ColumnPickerExtension, useValue: extensionColumnPickerStub },
          { provide: CellExternalCopyManagerExtension, useValue: extensionStub },
          { provide: CheckboxSelectorExtension, useValue: extensionStub },
          { provide: DraggableGroupingExtension, useValue: extensionStub },
          { provide: GridMenuExtension, useValue: extensionGridMenuStub },
          { provide: GroupItemMetaProviderExtension, useValue: extensionGroupItemMetaStub },
          { provide: HeaderButtonExtension, useValue: extensionStub },
          { provide: HeaderMenuExtension, useValue: extensionHeaderMenuStub },
          { provide: RowDetailViewExtension, useValue: extensionStub },
          { provide: RowMoveManagerExtension, useValue: extensionStub },
          { provide: RowSelectionExtension, useValue: extensionStub },
        ],
        imports: [TranslateModule.forRoot()]
      });
      service = TestBed.get(ExtensionService);
      sharedService = TestBed.get(SharedService);
      translate = TestBed.get(TranslateService);
      translate.setTranslation('fr', { HELLO: 'Bonjour', WORLD: 'Monde' });
      translate.setTranslation('en', { HELLO: 'Hello', WORLD: 'World' });
      translate.use('fr');
    });

    afterEach(() => {
      jest.clearAllMocks();
      service.dispose();
    });

    it('should create the service', () => {
      expect(service).toBeTruthy();
    });

    it('should return "allColumns" from the SharedService when "getAllColumns" method is called', () => {
      const spy = jest.spyOn(SharedService.prototype, 'allColumns', 'get');
      service.getAllColumns();
      expect(spy).toHaveBeenCalled();
    });

    it('should return "visibleColumns" from the SharedService when "getVisibleColumns" method is called', () => {
      const spy = jest.spyOn(SharedService.prototype, 'visibleColumns', 'get');
      service.getVisibleColumns();
      expect(spy).toHaveBeenCalled();
    });

    it('should return "autosizeColumns" from the SharedService Grid object when "autoResizeColumns" method is called', () => {
      const spy = jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      service.autoResizeColumns();
      expect(spy).toHaveBeenCalled();
    });

    it('should return empty array when "getAllExtensions" method is called', () => {
      const spy = jest.spyOn(service, 'getAllExtensions');
      service.getAllExtensions();
      expect(spy).toHaveReturnedWith([]);
    });

    describe('getSlickgridAddonInstance method', () => {
      it('should return null when method is called with an invalid and non instantiated addon', () => {
        const extensionMock = { name: ExtensionName.columnPicker, addon: null, instance: null, class: null } as ExtensionModel;
        const spy = jest.spyOn(service, 'getExtensionByName').mockReturnValue(extensionMock);

        const output = service.getSlickgridAddonInstance(ExtensionName.columnPicker);

        expect(spy).toHaveBeenCalled();
        expect(output).toBeNull();

      });

      it('should return extension addon when method is called with a valid and instantiated addon', () => {
        const instanceMock = { onColumnsChanged: jest.fn() };
        const extensionMock = { name: ExtensionName.columnPicker, addon: instanceMock, instance: instanceMock, class: {} } as ExtensionModel;
        const spy = jest.spyOn(service, 'getExtensionByName').mockReturnValue(extensionMock);

        const output = service.getSlickgridAddonInstance(ExtensionName.columnPicker);

        expect(spy).toHaveBeenCalled();
        expect(output).toEqual(instanceMock);
      });

      it('should register any addon and expect the instance returned from "getExtensionByName" equal the one returned from "getSlickgridAddonInstance"', () => {
        const instanceMock = { onColumnsChanged: jest.fn() };
        const gridOptionsMock = { enableGridMenu: true } as GridOption;
        const extSpy = jest.spyOn(extensionGridMenuStub, 'register').mockReturnValue(instanceMock);
        const getAddonSpy = jest.spyOn(extensionGridMenuStub, 'getAddonInstance').mockReturnValue(instanceMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.gridMenu);
        const instance = service.getSlickgridAddonInstance(ExtensionName.gridMenu);

        expect(gridSpy).toHaveBeenCalled();
        expect(getAddonSpy).toHaveBeenCalled();
        expect(extSpy).toHaveBeenCalled();
        expect(output.instance).toEqual(instance);
        expect(output).toEqual({ name: ExtensionName.gridMenu, addon: instanceMock, instance: instanceMock, class: extensionGridMenuStub } as ExtensionModel);
      });
    });

    describe('bindDifferentExtensions method', () => {
      const instanceMock = { onColumnsChanged: jest.fn() };

      it('should call "translateItems" method is "enableTranslate" is set to true in the grid options, then column name property should be translated', () => {
        const gridOptionsMock = { enableTranslate: true } as GridOption;
        const columnBeforeTranslate = { id: 'field1', field: 'field1', name: 'Hello', headerKey: 'HELLO' };
        const columnAfterTranslate = { id: 'field1', field: 'field1', name: 'Bonjour', headerKey: 'HELLO' };
        const columnsMock = [columnBeforeTranslate] as Column[];
        const columnSpy = jest.spyOn(SharedService.prototype, 'allColumns', 'get').mockReturnValue(columnsMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();

        expect(columnSpy).toHaveBeenCalled();
        expect(gridSpy).toHaveBeenCalled();
        expect(columnsMock).toEqual([columnAfterTranslate]);
      });

      it('should register the AutoTooltip addon when "enableAutoTooltip" is set in the grid options', () => {
        const gridOptionsMock = { enableAutoTooltip: true } as GridOption;
        const extSpy = jest.spyOn(extensionStub, 'register').mockReturnValue(instanceMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.autoTooltip);

        expect(gridSpy).toHaveBeenCalled();
        expect(extSpy).toHaveBeenCalled();
        expect(output).toEqual({ name: ExtensionName.autoTooltip, addon: instanceMock, instance: instanceMock, class: extensionStub } as ExtensionModel);
      });

      it('should register the ColumnPicker addon when "enableColumnPicker" is set in the grid options', () => {
        const gridOptionsMock = { enableColumnPicker: true } as GridOption;
        const extSpy = jest.spyOn(extensionColumnPickerStub, 'register').mockReturnValue(instanceMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.columnPicker);

        expect(gridSpy).toHaveBeenCalled();
        expect(extSpy).toHaveBeenCalled();
        expect(output).toEqual({ name: ExtensionName.columnPicker, addon: instanceMock, instance: instanceMock, class: extensionColumnPickerStub } as ExtensionModel);
      });

      it('should register the DraggableGrouping addon when "enableDraggableGrouping" is set in the grid options', () => {
        const gridOptionsMock = { enableDraggableGrouping: true } as GridOption;
        const ext1Spy = jest.spyOn(extensionStub, 'register').mockReturnValue({ ...instanceMock });
        const ext2Spy = jest.spyOn(extensionGroupItemMetaStub, 'register').mockReturnValue({ ...instanceMock });
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output1 = service.getExtensionByName(ExtensionName.draggableGrouping);
        const output2 = service.getExtensionByName(ExtensionName.groupItemMetaProvider);

        expect(gridSpy).toHaveBeenCalled();
        expect(ext1Spy).toHaveBeenCalled();
        expect(ext2Spy).toHaveBeenCalled();
        expect(output1).toEqual({ name: ExtensionName.draggableGrouping, addon: instanceMock, instance: instanceMock, class: extensionStub } as ExtensionModel);
        expect(output2).toEqual({ name: ExtensionName.groupItemMetaProvider, addon: instanceMock, instance: instanceMock, class: extensionStub } as ExtensionModel);
      });

      it('should register the GridMenu addon when "enableGridMenu" is set in the grid options', () => {
        const gridOptionsMock = { enableGridMenu: true } as GridOption;
        const extSpy = jest.spyOn(extensionGridMenuStub, 'register').mockReturnValue(instanceMock);
        const getAddonSpy = jest.spyOn(extensionGridMenuStub, 'getAddonInstance').mockReturnValue(instanceMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.gridMenu);
        const instance = service.getSlickgridAddonInstance(ExtensionName.gridMenu);

        expect(gridSpy).toHaveBeenCalled();
        expect(getAddonSpy).toHaveBeenCalled();
        expect(extSpy).toHaveBeenCalled();
        expect(output.instance).toEqual(instance);
        expect(output).toEqual({ name: ExtensionName.gridMenu, addon: instanceMock, instance: instanceMock, class: extensionGridMenuStub } as ExtensionModel);
      });

      it('should register the GroupItemMetaProvider addon when "enableGrouping" is set in the grid options', () => {
        const gridOptionsMock = { enableGrouping: true } as GridOption;
        const extSpy = jest.spyOn(extensionGroupItemMetaStub, 'register').mockReturnValue(instanceMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.groupItemMetaProvider);

        expect(gridSpy).toHaveBeenCalled();
        expect(extSpy).toHaveBeenCalled();
        expect(output).toEqual({ name: ExtensionName.groupItemMetaProvider, addon: instanceMock, instance: instanceMock, class: extensionGroupItemMetaStub } as ExtensionModel);
      });

      it('should register the CheckboxSelector addon when "enableCheckboxSelector" is set in the grid options', () => {
        const columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }] as Column[];
        const gridOptionsMock = { enableCheckboxSelector: true } as GridOption;
        const extCreateSpy = jest.spyOn(extensionStub, 'create').mockReturnValue(instanceMock);
        const extRegisterSpy = jest.spyOn(extensionStub, 'register');
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.createExtensionsBeforeGridCreation(columnsMock, gridOptionsMock);
        service.bindDifferentExtensions();
        const rowSelectionInstance = service.getExtensionByName(ExtensionName.rowSelection);
        const output = service.getExtensionByName(ExtensionName.checkboxSelector);

        expect(gridSpy).toHaveBeenCalled();
        expect(extCreateSpy).toHaveBeenCalledWith(columnsMock, gridOptionsMock);
        expect(extRegisterSpy).toHaveBeenCalled();
        expect(rowSelectionInstance).not.toBeNull();
        expect(output).toEqual({ name: ExtensionName.checkboxSelector, addon: instanceMock, instance: instanceMock, class: extensionStub } as ExtensionModel);
      });

      it('should register the RowDetailView addon when "enableRowDetailView" is set in the grid options', () => {
        const columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }] as Column[];
        const gridOptionsMock = { enableRowDetailView: true } as GridOption;
        const extCreateSpy = jest.spyOn(extensionStub, 'create').mockReturnValue(instanceMock);
        const extRegisterSpy = jest.spyOn(extensionStub, 'register');
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.createExtensionsBeforeGridCreation(columnsMock, gridOptionsMock);
        service.bindDifferentExtensions();
        const rowSelectionInstance = service.getExtensionByName(ExtensionName.rowSelection);
        const output = service.getExtensionByName(ExtensionName.rowDetailView);

        expect(gridSpy).toHaveBeenCalled();
        expect(extCreateSpy).toHaveBeenCalledWith(columnsMock, gridOptionsMock);
        expect(rowSelectionInstance).not.toBeNull();
        expect(extRegisterSpy).toHaveBeenCalled(); expect(output).toEqual({ name: ExtensionName.rowDetailView, addon: instanceMock, instance: instanceMock, class: extensionStub } as ExtensionModel);
      });

      it('should register the RowMoveManager addon when "enableRowMoveManager" is set in the grid options', () => {
        const gridOptionsMock = { enableRowMoveManager: true } as GridOption;
        const extSpy = jest.spyOn(extensionStub, 'register').mockReturnValue(instanceMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.rowMoveManager);

        expect(gridSpy).toHaveBeenCalled();
        expect(extSpy).toHaveBeenCalled();
        expect(output).toEqual({ name: ExtensionName.rowMoveManager, addon: instanceMock, instance: instanceMock, class: extensionStub } as ExtensionModel);
      });

      it('should register the RowSelection addon when "enableCheckboxSelector" (false) and "enableRowSelection" (true) are set in the grid options', () => {
        const gridOptionsMock = { enableCheckboxSelector: false, enableRowSelection: true } as GridOption;
        const extSpy = jest.spyOn(extensionStub, 'register').mockReturnValue(instanceMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.rowSelection);

        expect(gridSpy).toHaveBeenCalled();
        expect(extSpy).toHaveBeenCalled();
        expect(output).toEqual({ name: ExtensionName.rowSelection, addon: instanceMock, instance: instanceMock, class: extensionStub } as ExtensionModel);
      });

      it('should register the HeaderButton addon when "enableHeaderButton" is set in the grid options', () => {
        const gridOptionsMock = { enableHeaderButton: true } as GridOption;
        const extSpy = jest.spyOn(extensionStub, 'register').mockReturnValue(instanceMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.headerButton);

        expect(gridSpy).toHaveBeenCalled();
        expect(extSpy).toHaveBeenCalled();
        expect(output).toEqual({ name: ExtensionName.headerButton, addon: instanceMock, instance: instanceMock, class: extensionStub } as ExtensionModel);
      });

      it('should register the HeaderMenu addon when "enableHeaderMenu" is set in the grid options', () => {
        const gridOptionsMock = { enableHeaderMenu: true } as GridOption;
        const extSpy = jest.spyOn(extensionHeaderMenuStub, 'register').mockReturnValue(instanceMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.headerMenu);

        expect(gridSpy).toHaveBeenCalled();
        expect(extSpy).toHaveBeenCalled();
        expect(output).toEqual({ name: ExtensionName.headerMenu, addon: instanceMock, instance: instanceMock, class: extensionHeaderMenuStub } as ExtensionModel);
      });

      it('should register the ExcelCopyBuffer addon when "enableExcelCopyBuffer" is set in the grid options', () => {
        const gridOptionsMock = { enableExcelCopyBuffer: true } as GridOption;
        const extSpy = jest.spyOn(extensionStub, 'register').mockReturnValue(instanceMock);
        const gridSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.cellExternalCopyManager);

        expect(gridSpy).toHaveBeenCalled();
        expect(extSpy).toHaveBeenCalled();
        expect(output).toEqual({ name: ExtensionName.cellExternalCopyManager, addon: instanceMock, instance: instanceMock, class: extensionStub } as ExtensionModel);
      });

      it('should be able to Register external plugins from an array', () => {
        const pluginMock = { name: 'extraPlugin', doSomething: () => { } };
        const gridOptionsMock = { registerPlugins: [pluginMock] } as GridOption;
        const gridSpy = jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
        const optionSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin').mockReturnValue(instanceMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.noname);

        expect(gridSpy).toHaveBeenCalled();
        expect(optionSpy).toHaveBeenCalled();
        expect(pluginSpy).toHaveBeenCalledTimes(1);
        expect(pluginSpy).toHaveBeenCalledWith(pluginMock);
        expect(output).toEqual({ name: ExtensionName.noname, class: null, addon: instanceMock, instance: instanceMock } as ExtensionModel);
      });

      it('should be able to Register one external plugins from an object', () => {
        const pluginMock = { name: 'extraPlugin', doSomething: () => { } };
        const gridOptionsMock = { registerPlugins: pluginMock } as GridOption;
        const gridSpy = jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
        const optionSpy = jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin').mockReturnValue(instanceMock);

        service.bindDifferentExtensions();
        const output = service.getExtensionByName(ExtensionName.noname);

        expect(gridSpy).toHaveBeenCalled();
        expect(optionSpy).toHaveBeenCalled();
        expect(pluginSpy).toHaveBeenCalledWith(pluginMock);
        expect(output).toEqual({ name: ExtensionName.noname, class: null, addon: instanceMock, instance: instanceMock } as ExtensionModel);
      });
    });

    describe('createExtensionsBeforeGridCreation method', () => {
      let instanceMock;

      beforeEach(() => {
        instanceMock = { onColumnsChanged: () => { } };
      });

      it('should call checkboxSelectorExtension create when "enableCheckboxSelector" is set in the grid options provided', () => {
        const columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }] as Column[];
        const gridOptionsMock = { enableCheckboxSelector: true } as GridOption;
        const extSpy = jest.spyOn(extensionStub, 'create').mockReturnValue(instanceMock);

        service.createExtensionsBeforeGridCreation(columnsMock, gridOptionsMock);

        expect(extSpy).toHaveBeenCalledWith(columnsMock, gridOptionsMock);
      });

      it('should call rowDetailViewExtension create when "enableRowDetailView" is set in the grid options provided', () => {
        const columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }] as Column[];
        const gridOptionsMock = { enableRowDetailView: true } as GridOption;
        const extSpy = jest.spyOn(extensionStub, 'create').mockReturnValue(instanceMock);

        service.createExtensionsBeforeGridCreation(columnsMock, gridOptionsMock);

        expect(extSpy).toHaveBeenCalledWith(columnsMock, gridOptionsMock);
      });

      it('should call draggableGroupingExtension create when "enableDraggableGrouping" is set in the grid options provided', () => {
        const columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }] as Column[];
        const gridOptionsMock = { enableDraggableGrouping: true } as GridOption;
        const extSpy = jest.spyOn(extensionStub, 'create').mockReturnValue(instanceMock);

        service.createExtensionsBeforeGridCreation(columnsMock, gridOptionsMock);

        expect(extSpy).toHaveBeenCalledWith(gridOptionsMock);
      });
    });

    it('should call hideColumn and expect "visibleColumns" to be updated accordingly', () => {
      const columnsMock = [{ id: 'field1', width: 100 }, { id: 'field2', width: 150 }, { id: 'field3', field: 'field3' }] as Column[];
      const updatedColumnsMock = [{ id: 'field1', width: 100 }, { id: 'field3', field: 'field3' }] as Column[];
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      jest.spyOn(gridStub, 'getColumnIndex').mockReturnValue(1);
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(columnsMock);
      const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');
      const visibleSpy = jest.spyOn(SharedService.prototype, 'visibleColumns', 'set');

      service.hideColumn(columnsMock[1]);

      expect(visibleSpy).toHaveBeenCalledWith(updatedColumnsMock);
      expect(setColumnsSpy).toHaveBeenCalledWith(updatedColumnsMock);
    });

    it('should call the refreshBackendDataset method on the GridMenu Extension when service with same method name is called', () => {
      const gridOptionsMock = { enableGridMenu: true } as GridOption;
      const extSpy = jest.spyOn(extensionGridMenuStub, 'refreshBackendDataset');
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

      service.refreshBackendDataset();
      service.refreshBackendDataset(gridOptionsMock);

      expect(extSpy).toHaveBeenNthCalledWith(1, undefined);
      expect(extSpy).toHaveBeenNthCalledWith(2, gridOptionsMock);
    });

    it('should call removeColumnByIndex and return original input when it is not an array provided', () => {
      const input = { foo: 'bar' };
      // @ts-ignore:2345
      const output = service.removeColumnByIndex(input, 1);
      expect(output).toEqual(input);
    });

    it('should call removeColumnByIndex and return input array without the item at index position', () => {
      const columnsMock = [{ id: 'field1', width: 100 }, { id: 'field2', width: 150 }, { id: 'field3', field: 'field3' }] as Column[];
      const updatedColumnsMock = [{ id: 'field1', width: 100 }, { id: 'field3', field: 'field3' }] as Column[];
      const output = service.removeColumnByIndex(columnsMock, 1);
      expect(output).toEqual(updatedColumnsMock);
    });

    it('should call the translateColumnPicker method on the ColumnPicker Extension when service with same method name is called', () => {
      const extSpy = jest.spyOn(extensionColumnPickerStub, 'translateColumnPicker');
      service.translateColumnPicker();
      expect(extSpy).toHaveBeenCalled();
    });

    it('should call the translateGridMenu method on the GridMenu Extension when service with same method name is called', () => {
      const extSpy = jest.spyOn(extensionGridMenuStub, 'translateGridMenu');
      service.translateGridMenu();
      expect(extSpy).toHaveBeenCalled();
    });

    it('should call the translateHeaderMenu method on the HeaderMenu Extension when service with same method name is called', () => {
      const extSpy = jest.spyOn(extensionHeaderMenuStub, 'translateHeaderMenu');
      service.translateHeaderMenu();
      expect(extSpy).toHaveBeenCalled();
    });

    describe('translateColumnHeaders method', () => {
      it('should translate items with default locale when no arguments is passed to the method', () => {
        const columnsBeforeTranslateMock = [{ id: 'field1', field: 'field1', name: 'Hello', headerKey: 'HELLO' }] as Column[];
        const columnsAfterTranslateMock = [{ id: 'field1', field: 'field1', name: 'Bonjour', headerKey: 'HELLO' }] as Column[];
        jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue(columnsBeforeTranslateMock);
        const columnSpy = jest.spyOn(SharedService.prototype, 'allColumns', 'get').mockReturnValue(columnsBeforeTranslateMock);
        const renderSpy = jest.spyOn(service, 'renderColumnHeaders');

        service.translateColumnHeaders();

        expect(columnSpy).toHaveBeenCalled();
        expect(renderSpy).toHaveBeenCalledWith(columnsAfterTranslateMock);
        expect(columnsBeforeTranslateMock).toEqual(columnsAfterTranslateMock);
      });

      it('should translate items with locale provided as argument to the method', () => {
        const columnsBeforeTranslateMock = [{ id: 'field1', field: 'field1', headerKey: 'HELLO' }] as Column[];
        const columnsAfterTranslateMock = [{ id: 'field1', field: 'field1', name: 'Hello', headerKey: 'HELLO' }] as Column[];
        jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue(columnsBeforeTranslateMock);
        const columnSpy = jest.spyOn(SharedService.prototype, 'allColumns', 'get').mockReturnValue(columnsBeforeTranslateMock);
        const renderSpy = jest.spyOn(service, 'renderColumnHeaders');

        service.translateColumnHeaders('en');

        expect(columnSpy).toHaveBeenCalled();
        expect(renderSpy).toHaveBeenCalledWith(columnsAfterTranslateMock);
        expect(columnsBeforeTranslateMock).toEqual(columnsAfterTranslateMock);
      });

      it('should translate items with locale & column definitions provided as arguments to the method', () => {
        const columnsBeforeTranslateMock = [{ id: 'field1', field: 'field1', headerKey: 'HELLO' }] as Column[];
        const columnsAfterTranslateMock = [{ id: 'field1', field: 'field1', name: 'Hello', headerKey: 'HELLO' }] as Column[];
        const colDefSpy = jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get');
        const columnSpy = jest.spyOn(SharedService.prototype, 'allColumns', 'get').mockReturnValue(columnsBeforeTranslateMock);
        const renderSpy = jest.spyOn(service, 'renderColumnHeaders');

        service.translateColumnHeaders('en', columnsBeforeTranslateMock);

        expect(columnSpy).toHaveBeenCalled();
        expect(colDefSpy).not.toHaveBeenCalled();
        expect(renderSpy).toHaveBeenCalledWith(columnsAfterTranslateMock);
        expect(columnsBeforeTranslateMock).toEqual(columnsAfterTranslateMock);
      });
    });

    describe('renderColumnHeaders method', () => {
      beforeEach(() => {
        const columnsMock = [{ id: 'field1', field: 'field1', headerKey: 'HELLO' }] as Column[];
        jest.spyOn(SharedService.prototype, 'allColumns', 'get').mockReturnValue(columnsMock);
      });

      it('should call "setColumns" on the Shared Service with the Shared "columnDefinitions" when no arguments is provided', () => {
        const columnsMock = [{ id: 'field1', field: 'field1', headerKey: 'HELLO' }] as Column[];
        jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
        const colSpy = jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue(columnsMock);
        const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');

        service.renderColumnHeaders();

        expect(colSpy).toHaveBeenCalled();
        expect(setColumnsSpy).toHaveBeenCalledWith(columnsMock);
      });

      it('should override "allColumns" on the Shared Service and call "setColumns" with the collection provided as argument', () => {
        const columnsMock = [
          { id: 'field1', field: 'field1', headerKey: 'HELLO' },
          { id: 'field2', field: 'field2', headerKey: 'WORLD' }
        ] as Column[];
        jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
        const allColsSpy = jest.spyOn(SharedService.prototype, 'allColumns', 'set');
        const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');

        service.renderColumnHeaders(columnsMock);

        expect(setColumnsSpy).toHaveBeenCalledWith(columnsMock);
        expect(allColsSpy).toHaveBeenCalledWith(columnsMock);
      });

      it(`should call "setColumns" with the collection provided as argument but NOT override "allColumns" on the Shared Service
    when collection provided is smaller than "allColumns" that already exists`, () => {
          const columnsMock = [
            { id: 'field1', field: 'field1', headerKey: 'HELLO' }
          ] as Column[];
          jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
          const spyAllCols = jest.spyOn(SharedService.prototype, 'allColumns', 'set');
          const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');

          service.renderColumnHeaders(columnsMock);

          expect(setColumnsSpy).toHaveBeenCalledWith(columnsMock);
          expect(spyAllCols).not.toHaveBeenCalled();
        });

      it('should re-register the Column Picker when enable and method is called with new column definition collection provided as argument', () => {
        const instanceMock = { onColumnsChanged: jest.fn() };
        const extensionMock = { name: ExtensionName.columnPicker, addon: null, instance: null, class: null } as ExtensionModel;
        const expectedExtension = { name: ExtensionName.columnPicker, addon: instanceMock, instance: instanceMock, class: null } as ExtensionModel;
        const gridOptionsMock = { enableColumnPicker: true } as GridOption;
        const columnsMock = [
          { id: 'field1', field: 'field1', headerKey: 'HELLO' },
          { id: 'field2', field: 'field2', headerKey: 'WORLD' }
        ] as Column[];
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
        const spyGetExt = jest.spyOn(service, 'getExtensionByName').mockReturnValue(extensionMock);
        const spyCpDispose = jest.spyOn(extensionColumnPickerStub, 'dispose');
        const spyCpRegister = jest.spyOn(extensionColumnPickerStub, 'register');
        const spyAllCols = jest.spyOn(SharedService.prototype, 'allColumns', 'set');
        const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');

        service.renderColumnHeaders(columnsMock);

        expect(spyCpDispose).toHaveBeenCalled();
        expect(spyCpRegister).toHaveBeenCalled();
        expect(spyAllCols).toHaveBeenCalledWith(columnsMock);
        expect(setColumnsSpy).toHaveBeenCalledWith(columnsMock);
      });

      it('should re-register the Grid Menu when enable and method is called with new column definition collection provided as argument', () => {
        const instanceMock = { onColumnsChanged: jest.fn() };
        const extensionMock = { name: ExtensionName.gridMenu, addon: null, instance: null, class: null } as ExtensionModel;
        const expectedExtension = { name: ExtensionName.gridMenu, addon: instanceMock, instance: instanceMock, class: null } as ExtensionModel;
        const gridOptionsMock = { enableGridMenu: true } as GridOption;
        const columnsMock = [
          { id: 'field1', field: 'field1', headerKey: 'HELLO' },
          { id: 'field2', field: 'field2', headerKey: 'WORLD' }
        ] as Column[];
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
        const spyGetExt = jest.spyOn(service, 'getExtensionByName').mockReturnValue(extensionMock);
        const spyGmDispose = jest.spyOn(extensionGridMenuStub, 'dispose');
        const spyGmRegister = jest.spyOn(extensionGridMenuStub, 'register').mockReturnValue(instanceMock);
        const spyAllCols = jest.spyOn(SharedService.prototype, 'allColumns', 'set');
        const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');

        service.renderColumnHeaders(columnsMock);

        expect(expectedExtension).toEqual(expectedExtension);
        expect(spyGetExt).toHaveBeenCalled();
        expect(expectedExtension).toEqual(expectedExtension);
        expect(spyGetExt).toHaveBeenCalled();
        expect(spyGmDispose).toHaveBeenCalled();
        expect(spyGmRegister).toHaveBeenCalled();
        expect(spyAllCols).toHaveBeenCalledWith(columnsMock);
        expect(setColumnsSpy).toHaveBeenCalledWith(columnsMock);
      });
    });
  });

  describe('without ngx-translate', () => {
    beforeEach(() => {
      translate = null;
      service = new ExtensionService(
        // extensions
        extensionStub as unknown as AutoTooltipExtension,
        extensionStub as unknown as CellExternalCopyManagerExtension,
        extensionStub as unknown as CheckboxSelectorExtension,
        extensionColumnPickerStub as unknown as ColumnPickerExtension,
        extensionStub as unknown as DraggableGroupingExtension,
        extensionGridMenuStub as unknown as GridMenuExtension,
        extensionGroupItemMetaStub as unknown as GroupItemMetaProviderExtension,
        extensionStub as unknown as HeaderButtonExtension,
        extensionHeaderMenuStub as unknown as HeaderMenuExtension,
        extensionStub as unknown as RowDetailViewExtension,
        extensionStub as unknown as RowMoveManagerExtension,
        extensionStub as unknown as RowSelectionExtension,
        sharedService,
        translate,
      );

      const gridOptionsMock = { enableTranslate: true } as GridOption;
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
    });

    it('should throw an error if "enableTranslate" is set but the Translate Service is null and "translateColumnHeaders" method is called', () => {
      expect(() => service.translateColumnHeaders())
        .toThrowError('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured');
    });

    it('should throw an error if "enableTranslate" is set but the Translate Service is null and "translateItems" private method is called', (done) => {
      try {
        const gridOptionsMock = { enableTranslate: true } as GridOption;
        const columnBeforeTranslate = { id: 'field1', field: 'field1', name: 'Hello', headerKey: 'HELLO' };
        const columnsMock = [columnBeforeTranslate] as Column[];
        jest.spyOn(SharedService.prototype, 'allColumns', 'get').mockReturnValue(columnsMock);
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        service.bindDifferentExtensions();
      } catch (e) {
        expect(e.message).toContain('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured');
        done();
      }
    });
  });
});
