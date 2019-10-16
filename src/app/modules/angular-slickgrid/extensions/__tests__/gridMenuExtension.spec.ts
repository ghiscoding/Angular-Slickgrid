import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { GridOption } from '../../models/gridOption.interface';
import { GridMenuExtension } from '../gridMenuExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';
import { Column, DelimiterType, FileType } from '../../models';
import { ExcelExportService, ExportService, FilterService, SortService } from '../../services';

declare var Slick: any;

const gridId = 'grid1';
const gridUid = 'slickgrid_124343';
const containerId = 'demo-container';

const excelExportServiceStub = {
  exportToExcel: jest.fn(),
} as unknown as ExcelExportService;

const exportServiceStub = {
  exportToFile: jest.fn(),
} as unknown as ExportService;

const filterServiceStub = {
  clearFilters: jest.fn(),
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
  getUID: () => gridUid,
  registerPlugin: jest.fn(),
  setColumns: jest.fn(),
  setHeaderRowVisibility: jest.fn(),
  setTopPanelVisibility: jest.fn(),
  setPreHeaderPanelVisibility: jest.fn(),
};

const mockAddon = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn(),
  showGridMenu: jest.fn(),
  updateAllTitles: jest.fn(),
  onColumnsChanged: new Slick.Event(),
  onCommand: new Slick.Event(),
  onBeforeMenuShow: new Slick.Event(),
  onMenuClose: new Slick.Event(),
}));

jest.mock('slickgrid/controls/slick.gridmenu', () => mockAddon);
Slick.Controls = {
  GridMenu: mockAddon
};

// define a <div> container to simulate the grid container
const template =
  `<div id="${containerId}" style="height: 800px; width: 600px;">
    <div id="slickGridContainer-${gridId}" class="gridPane" style="width: 100%;">
    <div id="${gridId}" class="${gridUid}" style="width: 100%"></div>
    </div>
  </div>`;

describe('gridMenuExtension', () => {
  const columnsMock: Column[] = [{ id: 'field1', field: 'field1', width: 100, headerKey: 'TITLE' }, { id: 'field2', field: 'field2', width: 75 }];
  let extensionUtility: ExtensionUtility;
  let translate: TranslateService;
  let extension: GridMenuExtension;
  const gridOptionsMock = {
    enableAutoSizeColumns: true,
    enableGridMenu: true,
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
    gridMenu: {
      customItems: [],
      hideClearAllFiltersCommand: false,
      hideForceFitButton: false,
      hideSyncResizeButton: true,
      onExtensionRegistered: jest.fn(),
      onCommand: (e, args: { command: any, item: any, grid: any }) => { },
      onColumnsChanged: (e, args: { columns: Column[], grid: any }) => { },
      onBeforeMenuShow: (e, args: { menu: any, grid: any }) => { },
      onMenuClose: (e, args: { menu: any, grid: any }) => { },
    },
    pagination: {
      totalItems: 0
    },
    showHeaderRow: false,
    showTopPanel: false,
    showPreHeaderPanel: false
  } as unknown as GridOption;

  describe('with ngx-translate', () => {
    beforeEach(() => {
      const div = document.createElement('div');
      div.innerHTML = template;
      document.body.appendChild(div);

      TestBed.configureTestingModule({
        providers: [
          GridMenuExtension,
          ExtensionUtility,
          SharedService,
          { provide: ExcelExportService, useValue: excelExportServiceStub },
          { provide: ExportService, useValue: exportServiceStub },
          { provide: FilterService, useValue: filterServiceStub },
          { provide: SortService, useValue: sortServiceStub },
        ],
        imports: [TranslateModule.forRoot()]
      });
      extension = TestBed.get(GridMenuExtension);
      extensionUtility = TestBed.get(ExtensionUtility);
      translate = TestBed.get(TranslateService);
      translate.setTranslation('fr', {
        TITLE: 'Titre',
        CLEAR_ALL_FILTERS: 'Supprimer tous les filtres',
        CLEAR_ALL_SORTING: 'Supprimer tous les tris',
        EXPORT_TO_CSV: 'Exporter en format CSV',
        EXPORT_TO_EXCEL: 'Exporter vers Excel',
        EXPORT_TO_TAB_DELIMITED: 'Exporter en format texte (délimité par tabulation)',
        HELP: 'Aide',
        COMMANDS: 'Commandes',
        COLUMNS: 'Colonnes',
        FORCE_FIT_COLUMNS: 'Ajustement forcé des colonnes',
        SYNCHRONOUS_RESIZE: 'Redimension synchrone',
        TOGGLE_FILTER_ROW: 'Basculer la ligne des filtres',
        REFRESH_DATASET: 'Rafraîchir les données',
        TOGGLE_PRE_HEADER_ROW: 'Basculer la ligne de pré-en-tête',

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
        jest.spyOn(SharedService.prototype, 'visibleColumns', 'get').mockReturnValue(columnsMock.slice(0, 1));
        jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue(columnsMock);
      });

      it('should register the addon', () => {
        const onRegisteredSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onExtensionRegistered');

        const instance = extension.register();
        const addonInstance = extension.getAddonInstance();

        expect(instance).toBeTruthy();
        expect(instance).toEqual(addonInstance);
        expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
        expect(mockAddon).toHaveBeenCalledWith(columnsMock, gridStub, gridOptionsMock);
      });

      it('should call internal event handler subscribe and expect the "onColumnsChanged" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onColumnSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onColumnsChanged');
        const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onBeforeMenuShow');
        const onCloseSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onMenuClose');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');
        const visibleColsSpy = jest.spyOn(SharedService.prototype, 'visibleColumns', 'set');

        const instance = extension.register();
        instance.onColumnsChanged.notify({ columns: columnsMock.slice(0, 1), grid: gridStub }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(4);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onColumnSpy).toHaveBeenCalledWith(expect.anything(), { columns: columnsMock.slice(0, 1), grid: gridStub });
        expect(onBeforeSpy).not.toHaveBeenCalled();
        expect(onCloseSpy).not.toHaveBeenCalled();
        expect(onCommandSpy).not.toHaveBeenCalled();
        expect(visibleColsSpy).not.toHaveBeenCalled();
      });

      it(`should call internal event handler subscribe and expect the "onColumnsChanged" option to be called
    and it should override "visibleColumns" when array passed as arguments is bigger than previous visible columns`, () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onColumnSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onColumnsChanged');
        const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onBeforeMenuShow');
        const onCloseSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onMenuClose');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');
        const visibleColsSpy = jest.spyOn(SharedService.prototype, 'visibleColumns', 'set');

        const instance = extension.register();
        instance.onColumnsChanged.notify({ columns: columnsMock, grid: gridStub }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(4);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onColumnSpy).toHaveBeenCalledWith(expect.anything(), { columns: columnsMock, grid: gridStub });
        expect(onBeforeSpy).not.toHaveBeenCalled();
        expect(onCloseSpy).not.toHaveBeenCalled();
        expect(onCommandSpy).not.toHaveBeenCalled();
        expect(visibleColsSpy).toHaveBeenCalledWith(columnsMock);
      });

      it('should call internal event handler subscribe and expect the "onBeforeMenuShow" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onColumnSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onColumnsChanged');
        const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onBeforeMenuShow');
        const onCloseSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onMenuClose');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onBeforeMenuShow.notify({ grid: gridStub, menu: {} }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(4);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onBeforeSpy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, menu: {} });
        expect(onColumnSpy).not.toHaveBeenCalled();
        expect(onCloseSpy).not.toHaveBeenCalled();
        expect(onCommandSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onMenuClose" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onColumnSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onColumnsChanged');
        const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onBeforeMenuShow');
        const onCloseSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onMenuClose');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onMenuClose.notify({ grid: gridStub, menu: {} }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(4);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onCloseSpy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, menu: {} });
        expect(onColumnSpy).not.toHaveBeenCalled();
        expect(onBeforeSpy).not.toHaveBeenCalled();
        expect(onCommandSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onCommand" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onColumnSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onColumnsChanged');
        const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onBeforeMenuShow');
        const onCloseSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onMenuClose');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'help' }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(4);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onCommandSpy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, command: 'help' });
        expect(onColumnSpy).not.toHaveBeenCalled();
        expect(onBeforeSpy).not.toHaveBeenCalled();
        expect(onCloseSpy).not.toHaveBeenCalled();
      });

      it('should call "autosizeColumns" method when the "onMenuClose" event was triggered and the columns are different', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onColumnSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onColumnsChanged');
        const onCloseSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onMenuClose');
        const autoSizeSpy = jest.spyOn(gridStub, 'autosizeColumns');

        const instance = extension.register();
        instance.onColumnsChanged.notify(columnsMock.slice(0, 1), new Slick.EventData(), gridStub);
        instance.onMenuClose.notify({ grid: gridStub, menu: {} }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalled();
        expect(onCloseSpy).toHaveBeenCalled();
        expect(onColumnSpy).toHaveBeenCalled();
        expect(autoSizeSpy).toHaveBeenCalled();
      });

      it('should dispose of the addon', () => {
        const instance = extension.register();
        const destroySpy = jest.spyOn(instance, 'destroy');

        extension.dispose();

        expect(destroySpy).toHaveBeenCalled();
      });
    });

    describe('addGridMenuCustomCommands method', () => {
      afterEach(() => {
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
      });

      it('should expect an empty "customItems" array when both Filter & Sort are disabled', () => {
        extension.register();
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([]);
      });

      it('should expect all menu related to Filter when "enableFilering" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableFiltering: true } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        extension.register(); // calling 2x register to make sure it doesn't duplicate commands
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { iconCssClass: 'fa fa-filter text-danger', title: 'Supprimer tous les filtres', disabled: false, command: 'clear-filter', positionOrder: 50 },
          { iconCssClass: 'fa fa-random', title: 'Basculer la ligne des filtres', disabled: false, command: 'toggle-filter', positionOrder: 52 },
          { iconCssClass: 'fa fa-refresh', title: 'Rafraîchir les données', disabled: false, command: 'refresh-dataset', positionOrder: 56 }
        ]);
      });

      it('should have only 1 menu "clear-filter" when all other menus are defined as hidden & when "enableFilering" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableFiltering: true, gridMenu: { hideToggleFilterCommand: true, hideRefreshDatasetCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        extension.register(); // calling 2x register to make sure it doesn't duplicate commands
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { iconCssClass: 'fa fa-filter text-danger', title: 'Supprimer tous les filtres', disabled: false, command: 'clear-filter', positionOrder: 50 }
        ]);
      });

      it('should have only 1 menu "toggle-filter" when all other menus are defined as hidden & when "enableFilering" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableFiltering: true, gridMenu: { hideClearAllFiltersCommand: true, hideRefreshDatasetCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        extension.register(); // calling 2x register to make sure it doesn't duplicate commands
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { iconCssClass: 'fa fa-random', title: 'Basculer la ligne des filtres', disabled: false, command: 'toggle-filter', positionOrder: 52 },
        ]);
      });

      it('should have only 1 menu "refresh-dataset" when all other menus are defined as hidden & when "enableFilering" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableFiltering: true, gridMenu: { hideClearAllFiltersCommand: true, hideToggleFilterCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        extension.register(); // calling 2x register to make sure it doesn't duplicate commands
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { iconCssClass: 'fa fa-refresh', title: 'Rafraîchir les données', disabled: false, command: 'refresh-dataset', positionOrder: 56 }
        ]);
      });

      it('should have the "toggle-preheader" menu command when "showPreHeaderPanel" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, showPreHeaderPanel: true } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        extension.register(); // calling 2x register to make sure it doesn't duplicate commands
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { iconCssClass: 'fa fa-random', title: 'Basculer la ligne de pré-en-tête', disabled: false, command: 'toggle-preheader', positionOrder: 52 }
        ]);
      });

      it('should not have the "toggle-preheader" menu command when "showPreHeaderPanel" and "hideTogglePreHeaderCommand" are set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, showPreHeaderPanel: true, gridMenu: { hideTogglePreHeaderCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([]);
      });

      it('should have the "clear-sorting" menu command when "enableSorting" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableSorting: true } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        extension.register(); // calling 2x register to make sure it doesn't duplicate commands
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { iconCssClass: 'fa fa-unsorted text-danger', title: 'Supprimer tous les tris', disabled: false, command: 'clear-sorting', positionOrder: 51 }
        ]);
      });

      it('should not have the "clear-sorting" menu command when "enableSorting" and "hideClearAllSortingCommand" are set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableSorting: true, gridMenu: { hideClearAllSortingCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([]);
      });

      it('should have the "export-csv" menu command when "enableExport" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableExport: true, gridMenu: { hideExportExcelCommand: true, hideExportTextDelimitedCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        extension.register(); // calling 2x register to make sure it doesn't duplicate commands
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { iconCssClass: 'fa fa-download', title: 'Exporter en format CSV', disabled: false, command: 'export-csv', positionOrder: 53 }
        ]);
      });

      it('should not have the "export-csv" menu command when "enableExport" and "hideExportCsvCommand" are set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableExport: true, gridMenu: { hideExportExcelCommand: true, hideExportCsvCommand: true, hideExportTextDelimitedCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([]);
      });

      it('should have the "export-excel" menu command when "enableExport" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableExcelExport: true, enableExport: false, gridMenu: { hideExportCsvCommand: true, hideExportExcelCommand: false } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        extension.register(); // calling 2x register to make sure it doesn't duplicate commands
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { iconCssClass: 'fa fa-file-excel-o text-success', title: 'Exporter vers Excel', disabled: false, command: 'export-excel', positionOrder: 54 }
        ]);
      });

      it('should have the "export-text-delimited" menu command when "enableExport" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableExport: true, gridMenu: { hideExportCsvCommand: true, hideExportExcelCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        extension.register(); // calling 2x register to make sure it doesn't duplicate commands
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { iconCssClass: 'fa fa-download', title: 'Exporter en format texte (délimité par tabulation)', disabled: false, command: 'export-text-delimited', positionOrder: 55 }
        ]);
      });

      it('should not have the "export-text-delimited" menu command when "enableExport" and "hideExportCsvCommand" are set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableExport: true, gridMenu: { hideExportExcelCommand: true, hideExportCsvCommand: true, hideExportTextDelimitedCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([]);
      });
    });

    describe('adding Grid Menu Custom Items', () => {
      const customItemsMock = [{
        iconCssClass: 'fa fa-question-circle',
        titleKey: 'HELP',
        disabled: false,
        command: 'help',
        positionOrder: 99
      }];

      beforeEach(() => {
        const copyGridOptionsMock = {
          ...gridOptionsMock,
          enableExport: true,
          gridMenu: {
            customItems: customItemsMock,
            hideExportCsvCommand: false,
            hideExportExcelCommand: false,
            hideExportTextDelimitedCommand: true,
            hideRefreshDatasetCommand: true,
            hideSyncResizeButton: true,
            hideToggleFilterCommand: true,
            hideTogglePreHeaderCommand: true
          }
        } as unknown as GridOption;

        jest.spyOn(SharedService.prototype, 'dataView', 'get').mockReturnValue(dataViewStub);
        jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        jest.spyOn(SharedService.prototype, 'allColumns', 'get').mockReturnValue(columnsMock);
        jest.spyOn(SharedService.prototype, 'visibleColumns', 'get').mockReturnValue(columnsMock);
        jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue(columnsMock);
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
      });

      afterEach(() => {
        extension.dispose();
      });

      it('should have user grid menu custom items', () => {
        extension.register();
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { command: 'export-csv', disabled: false, iconCssClass: 'fa fa-download', positionOrder: 53, title: 'Exporter en format CSV' },
          // { command: 'export-excel', disabled: false, iconCssClass: 'fa fa-file-excel-o text-success', positionOrder: 54, title: 'Exporter vers Excel' },
          { command: 'help', disabled: false, iconCssClass: 'fa fa-question-circle', positionOrder: 99, title: 'Aide', titleKey: 'HELP' },
        ]);
      });

      it('should have same user grid menu custom items even when grid menu extension is registered multiple times', () => {
        extension.register();
        extension.register();
        expect(SharedService.prototype.gridOptions.gridMenu.customItems).toEqual([
          { command: 'export-csv', disabled: false, iconCssClass: 'fa fa-download', positionOrder: 53, title: 'Exporter en format CSV' },
          { command: 'help', disabled: false, iconCssClass: 'fa fa-question-circle', positionOrder: 99, title: 'Aide', titleKey: 'HELP' },
        ]);
      });
    });

    describe('refreshBackendDataset method', () => {
      afterEach(() => {
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
      });

      it('should throw an error when backendServiceApi is not provided in the grid options', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, backendServiceApi: {} } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        expect(() => extension.refreshBackendDataset()).toThrowError(`BackendServiceApi requires at least a "process" function and a "service" defined`);
      });

      it('should call the backend service API to refresh the dataset', (done) => {
        const now = new Date();
        const query = `query { users (first:20,offset:0) { totalCount, nodes { id,name,gender,company } } }`;
        const processResult = {
          data: { users: { nodes: [] }, pageInfo: { hasNextPage: true }, totalCount: 0 },
          metrics: { startTime: now, endTime: now, executionTime: 0, totalItemCount: 0 }
        };
        const preSpy = jest.spyOn(gridOptionsMock.backendServiceApi, 'preProcess');
        const postSpy = jest.spyOn(gridOptionsMock.backendServiceApi, 'postProcess');
        const promise = new Promise((resolve) => setTimeout(() => resolve(processResult), 1));
        const processSpy = jest.spyOn(gridOptionsMock.backendServiceApi, 'process').mockReturnValue(promise);
        jest.spyOn(gridOptionsMock.backendServiceApi.service, 'buildQuery').mockReturnValue(query);
        extension.refreshBackendDataset({ enableAddRow: true });
        expect(preSpy).toHaveBeenCalled();
        expect(processSpy).toHaveBeenCalled();
        promise.then(() => {
          expect(postSpy).toHaveBeenCalledWith(processResult);
          done();
        });
      });
    });

    describe('executeGridMenuInternalCustomCommands method', () => {
      it('should call "clearFilters" and dataview refresh when the command triggered is "clear-filter"', () => {
        const filterSpy = jest.spyOn(filterServiceStub, 'clearFilters');
        const refreshSpy = jest.spyOn(SharedService.prototype.dataView, 'refresh');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'clear-filter' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(filterSpy).toHaveBeenCalled();
        expect(refreshSpy).toHaveBeenCalled();
      });

      it('should call "clearSorting" and dataview refresh when the command triggered is "clear-sorting"', () => {
        const sortSpy = jest.spyOn(sortServiceStub, 'clearSorting');
        const refreshSpy = jest.spyOn(SharedService.prototype.dataView, 'refresh');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'clear-sorting' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(sortSpy).toHaveBeenCalled();
        expect(refreshSpy).toHaveBeenCalled();
      });

      it('should call "exportToExcel" with CSV set when the command triggered is "export-csv"', () => {
        const excelExportSpy = jest.spyOn(excelExportServiceStub, 'exportToExcel');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'export-excel' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(excelExportSpy).toHaveBeenCalledWith({
          filename: 'export',
          format: FileType.xlsx,
        });
      });

      it('should call "exportToFile" with CSV set when the command triggered is "export-csv"', () => {
        const exportSpy = jest.spyOn(exportServiceStub, 'exportToFile');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'export-csv' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(exportSpy).toHaveBeenCalledWith({
          delimiter: DelimiterType.comma,
          filename: 'export',
          format: FileType.csv,
          useUtf8WithBom: true
        });
      });

      it('should call "exportToFile" with CSV set when the command triggered is "export-text-delimited"', () => {
        const exportSpy = jest.spyOn(exportServiceStub, 'exportToFile');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'export-text-delimited' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(exportSpy).toHaveBeenCalledWith({
          delimiter: DelimiterType.tab,
          filename: 'export',
          format: FileType.txt,
          useUtf8WithBom: true
        });
      });

      it('should call the grid "setHeaderRowVisibility" method when the command triggered is "toggle-filter"', () => {
        gridOptionsMock.showHeaderRow = false;
        const gridSpy = jest.spyOn(SharedService.prototype.grid, 'setHeaderRowVisibility');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'toggle-filter' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(gridSpy).toHaveBeenCalledWith(true);

        gridOptionsMock.showHeaderRow = true;
        instance.onCommand.notify({ grid: gridStub, command: 'toggle-filter' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(gridSpy).toHaveBeenCalledWith(false);
      });

      it('should call the grid "setTopPanelVisibility" method when the command triggered is "toggle-toppanel"', () => {
        gridOptionsMock.showTopPanel = false;
        const gridSpy = jest.spyOn(SharedService.prototype.grid, 'setTopPanelVisibility');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'toggle-toppanel' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(gridSpy).toHaveBeenCalledWith(true);

        gridOptionsMock.showTopPanel = true;
        instance.onCommand.notify({ grid: gridStub, command: 'toggle-toppanel' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(gridSpy).toHaveBeenCalledWith(false);
      });

      it('should call the grid "setPreHeaderPanelVisibility" method when the command triggered is "toggle-preheader"', () => {
        gridOptionsMock.showPreHeaderPanel = false;
        const gridSpy = jest.spyOn(SharedService.prototype.grid, 'setPreHeaderPanelVisibility');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'toggle-preheader' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(gridSpy).toHaveBeenCalledWith(true);

        gridOptionsMock.showPreHeaderPanel = true;
        instance.onCommand.notify({ grid: gridStub, command: 'toggle-preheader' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(gridSpy).toHaveBeenCalledWith(false);
      });

      it('should call "refreshBackendDataset" method when the command triggered is "refresh-dataset"', () => {
        const refreshSpy = jest.spyOn(extension, 'refreshBackendDataset');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.gridMenu, 'onCommand');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'refresh-dataset' }, new Slick.EventData(), gridStub);

        expect(onCommandSpy).toHaveBeenCalled();
        expect(refreshSpy).toHaveBeenCalled();
      });
    });

    describe('translateGridMenu method', () => {
      it('should translate the column picker header titles', () => {
        const utilitySpy = jest.spyOn(extensionUtility, 'getPickerTitleOutputString');
        const translateSpy = jest.spyOn(extensionUtility, 'translateItems');

        const instance = extension.register();
        extension.translateGridMenu();
        const updateColsSpy = jest.spyOn(instance, 'updateAllTitles');

        expect(utilitySpy).toHaveBeenCalled();
        expect(translateSpy).toHaveBeenCalled();
        expect(updateColsSpy).toHaveBeenCalledWith(SharedService.prototype.gridOptions.gridMenu);
        expect(SharedService.prototype.gridOptions.gridMenu.columnTitle).toBe('Colonnes');
        expect(SharedService.prototype.gridOptions.gridMenu.forceFitTitle).toBe('Ajustement forcé des colonnes');
        expect(SharedService.prototype.gridOptions.gridMenu.syncResizeTitle).toBe('Redimension synchrone');
        expect(columnsMock).toEqual([
          { id: 'field1', field: 'field1', width: 100, name: 'Titre', headerKey: 'TITLE' },
          { id: 'field2', field: 'field2', width: 75 }
        ]);
      });
    });

    describe('showGridMenu method', () => {
      it('should call the show grid menu', () => {
        const instance = extension.register();

        const showSpy = jest.spyOn(instance, 'showGridMenu');
        extension.showGridMenu(null);

        expect(showSpy).toHaveBeenCalled();
      });
    });
  });

  describe('without ngx-translate', () => {
    beforeEach(() => {
      translate = null;
      extension = new GridMenuExtension({} as ExcelExportService, {} as ExportService, {} as ExtensionUtility, {} as FilterService, { gridOptions: { enableTranslate: true } } as SharedService, {} as SortService, translate);
    });

    it('should throw an error if "enableTranslate" is set but the I18N Service is null', () => {
      expect(() => extension.register()).toThrowError('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured');
    });
  });
});
