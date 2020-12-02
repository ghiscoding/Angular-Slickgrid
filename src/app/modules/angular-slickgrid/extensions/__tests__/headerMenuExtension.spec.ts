import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { GridOption } from '../../models/gridOption.interface';
import { HeaderMenuExtension } from '../headerMenuExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';
import { Column, ColumnSort } from '../../models';
import { FilterService, SortService } from '../../services';

declare const Slick: any;

const filterServiceStub = {
  clearFilterByColumnId: jest.fn(),
} as unknown as FilterService;

const sortServiceStub = {
  clearSortByColumnId: jest.fn(),
  clearSorting: jest.fn(),
  emitSortChanged: jest.fn(),
  getCurrentColumnSorts: jest.fn(),
  onBackendSortChanged: jest.fn(),
  onLocalSortChanged: jest.fn(),
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
  setOptions: jest.fn(),
  setHeaderRowVisibility: jest.fn(),
  setTopPanelVisibility: jest.fn(),
  setPreHeaderPanelVisibility: jest.fn(),
  setSortColumns: jest.fn(),
  onSort: new Slick.Event(),
};

const mockAddon = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn(),
  onAfterMenuShow: new Slick.Event(),
  onBeforeMenuShow: new Slick.Event(),
  onColumnsChanged: new Slick.Event(),
  onCommand: new Slick.Event(),
}));

jest.mock('slickgrid/plugins/slick.headermenu', () => mockAddon);
Slick.Plugins = {
  HeaderMenu: mockAddon
};

describe('headerMenuExtension', () => {
  const columnsMock: Column[] = [{ id: 'field1', field: 'field1', width: 100, nameKey: 'TITLE' }, { id: 'field2', field: 'field2', width: 75 }];
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
      hideFreezeColumnsCommand: false,
      hideForceFitButton: false,
      hideSyncResizeButton: true,
      onExtensionRegistered: jest.fn(),
      onCommand: () => { },
      onBeforeMenuShow: () => { },
      onAfterMenuShow: () => { },
    },
    multiColumnSort: true,
    pagination: {
      totalItems: 0
    },
    showHeaderRow: false,
    showTopPanel: false,
    showPreHeaderPanel: false
  } as unknown as GridOption;

  describe('with ngx-translate', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          HeaderMenuExtension,
          ExtensionUtility,
          SharedService,
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
        FREEZE_COLUMNS: 'Geler les colonnes',
        SYNCHRONOUS_RESIZE: 'Redimension synchrone',
        HIDE_COLUMN: 'Cacher la colonne',
        REMOVE_FILTER: 'Supprimer le filtre',
        REMOVE_SORT: 'Supprimer le tri',
        SORT_ASCENDING: 'Trier par ordre croissant',
        SORT_DESCENDING: 'Trier par ordre décroissant',
      });
      translate.setTranslation('en', {
        TITLE: 'Title',
        COMMANDS: 'Commands',
        COLUMNS: 'Columns',
        FORCE_FIT_COLUMNS: 'Force fit columns',
        FREEZE_COLUMNS: 'Freeze Columns',
        SYNCHRONOUS_RESIZE: 'Synchronous resize',
        HIDE_COLUMN: 'Hide Column',
        REMOVE_FILTER: 'Remove Filter',
        REMOVE_SORT: 'Remove Sort',
        SORT_ASCENDING: 'Sort Ascending',
        SORT_DESCENDING: 'Sort Descending',
      });
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
        const addonInstance = extension.getAddonInstance();

        expect(instance).toBeTruthy();
        expect(instance).toEqual(addonInstance);
        expect(mockAddon).toHaveBeenCalledWith({
          autoAlignOffset: 12,
          minWidth: 140,
          hideColumnHideCommand: false,
          hideForceFitButton: false,
          hideFreezeColumnsCommand: false,
          hideSyncResizeButton: true,
          hideSortCommands: false,
          title: '',
          onCommand: expect.anything(),
          onAfterMenuShow: expect.anything(),
          onBeforeMenuShow: expect.anything(),
          onExtensionRegistered: expect.anything(),
        });
        expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
        expect(pluginSpy).toHaveBeenCalledWith(instance);
      });

      it('should call internal event handler subscribe and expect the "onBeforeMenuShow" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onAfterSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onAfterMenuShow');
        const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onBeforeMenuShow');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');

        const instance = extension.register();
        instance.onBeforeMenuShow.notify({ grid: gridStub, menu: {} }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(3);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onBeforeSpy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, menu: {} });
        expect(onAfterSpy).not.toHaveBeenCalled();
        expect(onCommandSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onAfterMenuShow" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onAfterSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onAfterMenuShow');
        const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onBeforeMenuShow');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');

        const instance = extension.register();
        instance.onAfterMenuShow.notify({ grid: gridStub, menu: {} }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(3);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onAfterSpy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, menu: {} });
        expect(onBeforeSpy).not.toHaveBeenCalled();
        expect(onCommandSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onCommand" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onAfterSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onAfterMenuShow');
        const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onBeforeMenuShow');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'help' }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(3);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onCommandSpy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, command: 'help' });
        expect(onBeforeSpy).not.toHaveBeenCalled();
        expect(onAfterSpy).not.toHaveBeenCalled();
      });

      it('should dispose of the addon', () => {
        const instance = extension.register();
        const destroySpy = jest.spyOn(instance, 'destroy');

        extension.dispose();

        expect(destroySpy).toHaveBeenCalled();
      });
    });

    describe('addHeaderMenuCustomCommands method', () => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, nameKey: 'TITLE', sortable: true, filterable: true } as any;

      beforeEach(() => {
        jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue([mockColumn]);
      });
      afterEach(() => {
        mockColumn.header = undefined;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
      });

      it('should have the commands "frozen-columns" and "hide" in the header menu list', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, headerMenu: { hideFreezeColumnsCommand: false } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();

        expect(mockColumn.header.menu.items).not.toBeNull();
        expect(mockColumn.header.menu.items).toEqual([
          { iconCssClass: 'fa fa-thumb-tack', title: 'Geler les colonnes', command: 'freeze-columns', positionOrder: 48 },
          { divider: true, command: '', positionOrder: 49 },
          { iconCssClass: 'fa fa-times', title: 'Cacher la colonne', command: 'hide', positionOrder: 55 }
        ]);
      });

      it('should have the command "hide-column" in the header menu list', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, headerMenu: { hideFreezeColumnsCommand: true, hideColumnHideCommand: false } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();

        expect(mockColumn.header.menu.items).not.toBeNull();
        expect(mockColumn.header.menu.items).toEqual([
          { iconCssClass: 'fa fa-times', title: 'Cacher la colonne', command: 'hide', positionOrder: 55 }
        ]);
      });

      it('should expect all menu related to Sorting when "enableSorting" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableSorting: true, headerMenu: { hideFreezeColumnsCommand: true, hideColumnHideCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);

        extension.register();

        const headerMenuExpected = [
          { iconCssClass: 'fa fa-sort-asc', title: 'Trier par ordre croissant', command: 'sort-asc', positionOrder: 50 },
          { iconCssClass: 'fa fa-sort-desc', title: 'Trier par ordre décroissant', command: 'sort-desc', positionOrder: 51 },
          { divider: true, command: '', positionOrder: 52 },
          { iconCssClass: 'fa fa-unsorted', title: 'Supprimer le tri', command: 'clear-sort', positionOrder: 54 }
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
          { iconCssClass: 'fa fa-thumb-tack', title: 'Geler les colonnes', command: 'freeze-columns', positionOrder: 48 },
          { divider: true, command: '', positionOrder: 49 },
          { iconCssClass: 'fa fa-times', title: 'Cacher la colonne', command: 'hide', positionOrder: 55 }
        ]);
      });

      it('should expect all menu related to Filtering when "enableFiltering" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableFiltering: true, headerMenu: { hideFreezeColumnsCommand: true, hideColumnHideCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);

        extension.register();

        const headerMenuExpected = [{ iconCssClass: 'fa fa-filter', title: 'Supprimer le filtre', command: 'clear-filter', positionOrder: 53 }];
        expect(mockColumn.header.menu.items).not.toBeNull();
        expect(mockColumn.header.menu.items).toEqual(headerMenuExpected);

        // double-check that registering again won't add duplicate commands
        extension.register();
        expect(mockColumn.header.menu.items).toEqual(headerMenuExpected);
      });
    });

    describe('hideColumn method', () => {
      it('should call hideColumn and expect "visibleColumns" to be updated accordingly', () => {
        jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
        jest.spyOn(gridStub, 'getColumnIndex').mockReturnValue(1);
        jest.spyOn(gridStub, 'getColumns').mockReturnValue(columnsMock);
        const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');
        const setOptionSpy = jest.spyOn(gridStub, 'setOptions');
        const visibleSpy = jest.spyOn(SharedService.prototype, 'visibleColumns', 'set');
        const updatedColumnsMock = [{
          id: 'field1', field: 'field1', nameKey: 'TITLE', width: 100,
          header: {
            menu: {
              items: [
                { iconCssClass: 'fa fa-thumb-tack', title: 'Geler les colonnes', command: 'freeze-columns', positionOrder: 48 },
                { divider: true, command: '', positionOrder: 49 },
                { command: 'hide', iconCssClass: 'fa fa-times', positionOrder: 55, title: 'Cacher la colonne' }
              ]
            }
          }
        }] as Column[];

        extension.hideColumn(columnsMock[1]);

        expect(setOptionSpy).not.toHaveBeenCalled();
        expect(visibleSpy).toHaveBeenCalledWith(updatedColumnsMock);
        expect(setColumnsSpy).toHaveBeenCalledWith(updatedColumnsMock);
      });

      it('should call hideColumn and expect "setOptions" to be called with new "frozenColumn" index when the grid is detected to be a frozen grid', () => {
        gridOptionsMock.frozenColumn = 1;
        jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
        jest.spyOn(gridStub, 'getColumnIndex').mockReturnValue(1);
        jest.spyOn(gridStub, 'getColumns').mockReturnValue(columnsMock);
        const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');
        const setOptionSpy = jest.spyOn(gridStub, 'setOptions');
        const visibleSpy = jest.spyOn(SharedService.prototype, 'visibleColumns', 'set');
        const updatedColumnsMock = [{
          id: 'field1', field: 'field1', nameKey: 'TITLE', width: 100,
          header: {
            menu: {
              items: [
                { iconCssClass: 'fa fa-thumb-tack', title: 'Geler les colonnes', command: 'freeze-columns', positionOrder: 48 },
                { divider: true, command: '', positionOrder: 49 },
                { command: 'hide', iconCssClass: 'fa fa-times', positionOrder: 55, title: 'Cacher la colonne' }
              ]
            }
          }
        }] as Column[];

        extension.hideColumn(columnsMock[1]);

        expect(setOptionSpy).toHaveBeenCalledWith({ frozenColumn: 0 });
        expect(visibleSpy).toHaveBeenCalledWith(updatedColumnsMock);
        expect(setColumnsSpy).toHaveBeenCalledWith(updatedColumnsMock);
      });
    });

    describe('translateHeaderMenu method', () => {
      it('should call the resetHeaderMenuTranslations and have all header menu translated', () => {
        const mockColumns: Column[] = [{
          id: 'field1', field: 'field1', width: 100,
          header: {
            menu: {
              items: [
                { iconCssClass: 'fa fa-thumb-tack', title: 'Geler les colonnes', command: 'freeze-columns', positionOrder: 48 },
                { divider: true, command: '', positionOrder: 49 },
                { iconCssClass: 'fa fa-sort-asc', title: 'Trier par ordre croissant', command: 'sort-asc', positionOrder: 50 },
                { iconCssClass: 'fa fa-sort-desc', title: 'Trier par ordre décroissant', command: 'sort-desc', positionOrder: 51 },
                { divider: true, command: '', positionOrder: 52 },
                { iconCssClass: 'fa fa-filter', title: 'Supprimer le filtre', command: 'clear-filter', positionOrder: 53 },
                { iconCssClass: 'fa fa-unsorted', title: 'Supprimer le tri', command: 'clear-sort', positionOrder: 54 },
                { iconCssClass: 'fa fa-times', command: 'hide', positionOrder: 55, title: 'Cacher la colonne' },
              ]
            }
          }
        }];
        jest.spyOn(SharedService.prototype, 'visibleColumns', 'get').mockReturnValue(mockColumns);

        translate.use('en');
        extension.translateHeaderMenu();

        expect(mockColumns).toEqual([{
          id: 'field1', field: 'field1', width: 100,
          header: {
            menu: {
              items: [
                { iconCssClass: 'fa fa-thumb-tack', title: 'Freeze Columns', command: 'freeze-columns', positionOrder: 48 },
                { divider: true, command: '', positionOrder: 49 },
                { iconCssClass: 'fa fa-sort-asc', title: 'Sort Ascending', command: 'sort-asc', positionOrder: 50 },
                { iconCssClass: 'fa fa-sort-desc', title: 'Sort Descending', command: 'sort-desc', positionOrder: 51 },
                { divider: true, command: '', positionOrder: 52 },
                { iconCssClass: 'fa fa-filter', title: 'Remove Filter', command: 'clear-filter', positionOrder: 53 },
                { iconCssClass: 'fa fa-unsorted', title: 'Remove Sort', command: 'clear-sort', positionOrder: 54 },
                { iconCssClass: 'fa fa-times', command: 'hide', positionOrder: 55, title: 'Hide Column' },
              ]
            }
          }
        }]);
      });
    });

    describe('executeHeaderMenuInternalCommands method', () => {
      it('should trigger the command "freeze-columns" and grid "setOptions" method to be called with current column position', () => {
        const setOptionsSpy = jest.spyOn(gridStub, 'setOptions');
        const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ column: columnsMock[0], grid: gridStub, command: 'freeze-columns' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(setOptionsSpy).toHaveBeenCalledWith({ frozenColumn: 0 });
        expect(setColumnsSpy).toHaveBeenCalled();
      });

      it('should trigger the command "freeze-columns" and grid "setOptions" method to be called with frozen column of -1 because the column found is not visible', () => {
        const setOptionsSpy = jest.spyOn(gridStub, 'setOptions');
        const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ column: columnsMock[1], grid: gridStub, command: 'freeze-columns' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(setOptionsSpy).toHaveBeenCalledWith({ frozenColumn: -1 });
        expect(setColumnsSpy).toHaveBeenCalled();
      });

      it('should trigger the command "hide" and expect the grid "autosizeColumns" method being called', () => {
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');
        const autosizeSpy = jest.spyOn(SharedService.prototype.grid, 'autosizeColumns');

        const instance = extension.register();
        instance.onCommand.notify({ column: columnsMock[0], grid: gridStub, command: 'hide' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(autosizeSpy).toHaveBeenCalled();
      });

      it('should trigger the command "clear-filter" and expect "clearColumnFilter" method being called with dataview refresh', () => {
        const filterSpy = jest.spyOn(filterServiceStub, 'clearFilterByColumnId');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ column: columnsMock[0], grid: gridStub, command: 'clear-filter' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(filterSpy).toHaveBeenCalledWith(expect.anything(), columnsMock[0].id);
      });

      it('should trigger the command "clear-sort" and expect "clearSortByColumnId" being called with event and column id', () => {
        const clearSortSpy = jest.spyOn(sortServiceStub, 'clearSortByColumnId');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ column: columnsMock[0], grid: gridStub, command: 'clear-sort' }, new Slick.EventData(), gridStub);

        expect(clearSortSpy).toHaveBeenCalledWith(expect.anything(), columnsMock[0].id);
        expect(onCommandSpy).toHaveBeenCalled();
      });

      it('should trigger the command "sort-asc" and expect Sort Service to call "onBackendSortChanged" being called without the sorted column', () => {
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        const mockSortedCols: ColumnSort[] = [{ columnId: 'field1', sortAsc: true, sortCol: { id: 'field1', field: 'field1' } }, { columnId: 'field2', sortAsc: false, sortCol: { id: 'field2', field: 'field2' } }];
        const mockSortedOuput: ColumnSort[] = [{ columnId: 'field1', sortAsc: true, sortCol: { id: 'field1', field: 'field1' } }, { columnId: 'field2', sortAsc: true, sortCol: { id: 'field2', field: 'field2' } }];
        const previousSortSpy = jest.spyOn(sortServiceStub, 'getCurrentColumnSorts').mockReturnValue([mockSortedCols[0]]);
        const backendSortSpy = jest.spyOn(sortServiceStub, 'onBackendSortChanged');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');
        const setSortSpy = jest.spyOn(SharedService.prototype.grid, 'setSortColumns');

        const instance = extension.register();
        instance.onCommand.notify({ column: mockSortedCols[1].sortCol, grid: gridStub, command: 'sort-asc' }, new Slick.EventData(), gridStub);

        expect(previousSortSpy).toHaveBeenCalled();
        expect(backendSortSpy).toHaveBeenCalledWith(expect.anything(), { multiColumnSort: true, sortCols: mockSortedOuput, grid: gridStub });
        expect(onCommandSpy).toHaveBeenCalled();
        expect(setSortSpy).toHaveBeenCalled();
      });

      it('should trigger the command "sort-desc" and expect Sort Service to call "onBackendSortChanged" being called without the sorted column', () => {
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        const mockSortedCols: ColumnSort[] = [{ columnId: 'field1', sortAsc: true, sortCol: { id: 'field1', field: 'field1' } }, { columnId: 'field2', sortAsc: true, sortCol: { id: 'field2', field: 'field2' } }];
        const mockSortedOuput: ColumnSort[] = [{ columnId: 'field1', sortAsc: true, sortCol: { id: 'field1', field: 'field1' } }, { columnId: 'field2', sortAsc: false, sortCol: { id: 'field2', field: 'field2' } }];
        const previousSortSpy = jest.spyOn(sortServiceStub, 'getCurrentColumnSorts').mockReturnValue([mockSortedCols[0]]);
        const backendSortSpy = jest.spyOn(sortServiceStub, 'onBackendSortChanged');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');
        const setSortSpy = jest.spyOn(SharedService.prototype.grid, 'setSortColumns');

        const instance = extension.register();
        instance.onCommand.notify({ column: mockSortedCols[1].sortCol, grid: gridStub, command: 'sort-desc' }, new Slick.EventData(), gridStub);

        expect(previousSortSpy).toHaveBeenCalled();
        expect(backendSortSpy).toHaveBeenCalledWith(expect.anything(), { multiColumnSort: true, sortCols: mockSortedOuput, grid: gridStub });
        expect(onCommandSpy).toHaveBeenCalled();
        expect(setSortSpy).toHaveBeenCalled();
      });

      it('should trigger the command "sort-desc" and expect Sort Service to call "onLocalSortChanged" being called without the sorted column', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, backendServiceApi: undefined } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'dataView', 'get').mockReturnValue(dataViewStub);
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        const mockSortedCols: ColumnSort[] = [{ columnId: 'field1', sortAsc: true, sortCol: { id: 'field1', field: 'field1' } }, { columnId: 'field2', sortAsc: true, sortCol: { id: 'field2', field: 'field2' } }];
        const mockSortedOuput: ColumnSort[] = [{ columnId: 'field1', sortAsc: true, sortCol: { id: 'field1', field: 'field1' } }, { columnId: 'field2', sortAsc: false, sortCol: { id: 'field2', field: 'field2' } }];
        const previousSortSpy = jest.spyOn(sortServiceStub, 'getCurrentColumnSorts').mockReturnValue([mockSortedCols[0]]);
        const localSortSpy = jest.spyOn(sortServiceStub, 'onLocalSortChanged');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');
        const setSortSpy = jest.spyOn(SharedService.prototype.grid, 'setSortColumns');

        const instance = extension.register();
        instance.onCommand.notify({ column: mockSortedCols[1].sortCol, grid: gridStub, command: 'sort-desc' }, new Slick.EventData(), gridStub);

        expect(previousSortSpy).toHaveBeenCalled();
        expect(localSortSpy).toHaveBeenCalledWith(gridStub, mockSortedOuput);
        expect(onCommandSpy).toHaveBeenCalled();
        expect(setSortSpy).toHaveBeenCalled();
      });

      it('should trigger the command "sort-desc" and expect "onSort" event triggered when no DataView is provided', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, backendServiceApi: undefined } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'dataView', 'get').mockReturnValue(undefined);
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        const mockSortedCols: ColumnSort[] = [{ columnId: 'field1', sortAsc: true, sortCol: { id: 'field1', field: 'field1' } }, { columnId: 'field2', sortAsc: true, sortCol: { id: 'field2', field: 'field2' } }];
        const mockSortedOuput: ColumnSort[] = [{ columnId: 'field1', sortAsc: true, sortCol: { id: 'field1', field: 'field1' } }, { columnId: 'field2', sortAsc: false, sortCol: { id: 'field2', field: 'field2' } }];
        const previousSortSpy = jest.spyOn(sortServiceStub, 'getCurrentColumnSorts').mockReturnValue([mockSortedCols[0]]);
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.headerMenu, 'onCommand');
        const setSortSpy = jest.spyOn(SharedService.prototype.grid, 'setSortColumns');
        const gridSortSpy = jest.spyOn(gridStub.onSort, 'notify');

        const instance = extension.register();
        instance.onCommand.notify({ column: mockSortedCols[1].sortCol, grid: gridStub, command: 'sort-desc' }, new Slick.EventData(), gridStub);

        expect(previousSortSpy).toHaveBeenCalled();
        expect(gridSortSpy).toHaveBeenCalledWith(mockSortedOuput);
        expect(onCommandSpy).toHaveBeenCalled();
        expect(setSortSpy).toHaveBeenCalled();
      });
    });
  });

  describe('without ngx-translate', () => {
    beforeEach(() => {
      translate = null;
      extension = new HeaderMenuExtension({} as ExtensionUtility, {} as FilterService, { gridOptions: { enableTranslate: true } } as SharedService, {} as SortService, translate);
    });

    it('should throw an error if "enableTranslate" is set but the Translate Service is null', () => {
      expect(() => extension.register()).toThrowError('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured');
    });
  });
});
