import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { GridOption } from '../../models/gridOption.interface';
import { HeaderMenuExtension } from '../headerMenuExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';
import { Column, DelimiterType, FileType } from '../../models';
import { ExportService, FilterService, SortService } from '../../services';

declare var Slick: any;

const exportServiceStub = {
  exportToFile: jest.fn(),
} as unknown as ExportService;

const filterServiceStub = {
  clearFilterByColumnId: jest.fn(),
} as unknown as FilterService;

const sortServiceStub = {
  clearSorting: jest.fn(),
} as unknown as SortService;

const dataViewStub = {
  refresh: jest.fn(),
};

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getColumns: jest.fn(),
  getOptions: jest.fn(),
  registerPlugin: jest.fn(),
  setColumns: jest.fn(),
  setHeaderRowVisibility: jest.fn(),
  setTopPanelVisibility: jest.fn(),
  setPreHeaderPanelVisibility: jest.fn(),
};

const mockAddon = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn(),
  onBeforeMenuShow: new Slick.Event(),
  onColumnsChanged: new Slick.Event(),
  onCommand: new Slick.Event(),
}));

jest.mock('slickgrid/plugins/slick.headermenu', () => mockAddon);
Slick.Plugins = {
  HeaderMenu: mockAddon
};

describe('headerMenuExtension', () => {
  const columnsMock: Column[] = [{ id: 'field1', field: 'field1', width: 100, headerKey: 'TITLE' }, { id: 'field2', field: 'field2', width: 75 }];
  let extensionUtility: ExtensionUtility;
  let translate: TranslateService;
  let extension: HeaderMenuExtension;
  const gridOptionsMock = {
    enableAutoSizeColumns: true,
    enableHeaderMenu: true,
    enableTranslate: true,
    backendServiceApi: {
      service: {
        buildQuery: jest.fn(),
      },
      internalPostProcess: jest.fn(),
      preProcess: jest.fn(),
      process: jest.fn(),
      postProcess: jest.fn(),
    },
    headerMenu: {
      hideForceFitButton: false,
      hideSyncResizeButton: true,
      onExtensionRegistered: jest.fn(),
      onCommand: (e, args: { command: any, item: any, grid: any }) => { },
      onBeforeMenuShow: (e, args: { menu: any, grid: any }) => { },
    },
    pagination: {
      totalItems: 0
    },
    showHeaderRow: false,
    showTopPanel: false,
    showPreHeaderPanel: false
  } as unknown as GridOption;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeaderMenuExtension,
        ExtensionUtility,
        SharedService,
        { provide: ExportService, useValue: exportServiceStub },
        { provide: FilterService, useValue: filterServiceStub },
        { provide: SortService, useValue: sortServiceStub },
      ],
      imports: [TranslateModule.forRoot()]
    });
    extension = TestBed.get(HeaderMenuExtension);
    extensionUtility = TestBed.get(ExtensionUtility);
    translate = TestBed.get(TranslateService);
    translate.setTranslation('fr', {
      TITLE: 'Titre',
      COMMANDS: 'Commandes',
      COLUMNS: 'Colonnes',
      FORCE_FIT_COLUMNS: 'Ajustement forcé des colonnes',
      SYNCHRONOUS_RESIZE: 'Redimension synchrone',
      HIDE_COLUMN: 'Cacher la colonne',
      REMOVE_FILTER: 'Supprimer le filtre',
      REMOVE_SORT: 'Supprimer le tri',
      SORT_ASCENDING: 'Trier par ordre croissant',
      SORT_DESCENDING: 'Trier par ordre décroissant',
    });
    translate.setTranslation('en', { TITLE: 'Title', COMMANDS: 'Commands', COLUMNS: 'Columns', FORCE_FIT_COLUMNS: 'Force fit columns', SYNCHRONOUS_RESIZE: 'Synchronous resize' });
    translate.use('fr');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null when either the grid object or the grid options is missing', () => {
    const output = extension.register();
    expect(output).toBeNull();
  });

  describe('registered addon', () => {
    beforeEach(() => {
      jest.spyOn(SharedService.prototype, 'dataView', 'get').mockReturnValue(dataViewStub);
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
      jest.spyOn(SharedService.prototype, 'allColumns', 'get').mockReturnValue(columnsMock);
      jest.spyOn(SharedService.prototype, 'visibleColumns', 'get').mockReturnValue(columnsMock);
      jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue(columnsMock);
    });

    it('should register the addon', () => {
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');
      const onRegisteredSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onExtensionRegistered');

      const instance = extension.register();

      expect(mockAddon).toHaveBeenCalledWith({
        autoAlignOffset: 12,
        minWidth: 140,
        hideColumnHideCommand: false,
        hideForceFitButton: false,
        hideSyncResizeButton: true,
        hideSortCommands: false,
        title: '',
        onCommand: expect.anything(),
        onBeforeMenuShow: expect.anything(),
        onExtensionRegistered: expect.anything(),
      });
      expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should call internal event handler subscribe and expect the "onBeforeMenuShow" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onBeforeMenuShow');
      const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');

      const instance = extension.register();
      instance.onBeforeMenuShow.notify({ grid: gridStub, menu: {} }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(2);
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onBeforeSpy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, menu: {} });
      expect(onCommandSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onCommand" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onBeforeMenuShow');
      const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');

      const instance = extension.register();
      instance.onCommand.notify({ grid: gridStub, command: 'help' }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(2);
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onCommandSpy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, command: 'help' });
      expect(onBeforeSpy).not.toHaveBeenCalled();
    });

    it('should dispose of the addon', () => {
      const instance = extension.register();
      const destroySpy = jest.spyOn(instance, 'destroy');

      extension.dispose();

      expect(destroySpy).toHaveBeenCalled();
    });
  });

  describe('addHeaderMenuCustomCommands method', () => {
    const mockColumn = { id: 'field1', field: 'field1', width: 100, headerKey: 'TITLE', sortable: true, filterable: true } as any;

    beforeEach(() => {
      jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue([mockColumn]);
    });
    afterEach(() => {
      mockColumn.header = undefined;
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
    });

    it('should have the command "hide-column" in the header menu list', () => {
      const copyGridOptionsMock = { ...gridOptionsMock } as unknown as GridOption;
      copyGridOptionsMock.headerMenu.hideColumnHideCommand = false;
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
      extension.register();

      expect(mockColumn.header.menu.items).not.toBeNull();
      expect(mockColumn.header.menu.items).toEqual([
        { iconCssClass: 'fa fa-times', title: 'Cacher la colonne', command: 'hide', positionOrder: 55 }
      ]);
    });

    it('should expect all menu related to Sorting when "enableSorting" is set', () => {
      const copyGridOptionsMock = { ...gridOptionsMock, enableSorting: true } as unknown as GridOption;
      copyGridOptionsMock.headerMenu.hideColumnHideCommand = true;
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);

      extension.register();

      const headerMenuExpected = [
        { iconCssClass: 'fa fa-sort-asc', title: 'Trier par ordre croissant', command: 'sort-asc', positionOrder: 50 },
        { iconCssClass: 'fa fa-sort-desc', title: 'Trier par ordre décroissant', command: 'sort-desc', positionOrder: 51 },
        { divider: true, command: '', positionOrder: 52 },
        { iconCssClass: 'fa fa-unsorted', title: 'Supprimer le tri', command: 'clear-sort', positionOrder: 53 }
      ];
      expect(mockColumn.header.menu.items).not.toBeNull();
      expect(mockColumn.header.menu.items).toEqual(headerMenuExpected);

      // double-check that registering again won't add duplicate commands
      extension.register();
      expect(mockColumn.header.menu.items).toEqual(headerMenuExpected);
    });

    it('should expect only the "hide-column" command in the menu when "enableSorting" and "hideSortCommands" are set', () => {
      const copyGridOptionsMock = { ...gridOptionsMock, enableSorting: true } as unknown as GridOption;
      copyGridOptionsMock.headerMenu.hideColumnHideCommand = false;
      copyGridOptionsMock.headerMenu.hideSortCommands = true;
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);

      extension.register();

      expect(mockColumn.header.menu.items).not.toBeNull();
      expect(mockColumn.header.menu.items).toEqual([
        { iconCssClass: 'fa fa-times', title: 'Cacher la colonne', command: 'hide', positionOrder: 55 }
      ]);
    });

    it('should expect all menu related to Filtering when "enableFiltering" is set', () => {
      const copyGridOptionsMock = { ...gridOptionsMock, enableFiltering: true } as unknown as GridOption;
      copyGridOptionsMock.headerMenu.hideColumnHideCommand = true;
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);

      extension.register();

      const headerMenuExpected = [{ iconCssClass: 'fa fa-filter', title: 'Supprimer le filtre', command: 'clear-filter', positionOrder: 52 }];
      expect(mockColumn.header.menu.items).not.toBeNull();
      expect(mockColumn.header.menu.items).toEqual(headerMenuExpected);

      // double-check that registering again won't add duplicate commands
      extension.register();
      expect(mockColumn.header.menu.items).toEqual(headerMenuExpected);
    });
  });

  describe('executeHeaderMenuInternalCommands method', () => {
    it('should call "clearColumnFilter" and dataview refresh when the command triggered is "clear-filter"', () => {
      const filterSpy = jest.spyOn(filterServiceStub, 'clearFilterByColumnId');
      const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');

      const instance = extension.register();
      instance.onCommand.notify({ column: columnsMock[0], grid: gridStub, command: 'clear-filter' }, new Slick.EventData(), gridStub);

      expect(onCommandSpy).toHaveBeenCalled();
      expect(filterSpy).toHaveBeenCalledWith(expect.anything(), columnsMock[0].id);
    });
  });
});
