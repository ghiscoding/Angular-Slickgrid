import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { GridOption } from '../../models/gridOption.interface';
import { ContextMenuExtension } from '../contextMenuExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';
import { Column, DelimiterType, FileType, MenuCommandItemCallbackArgs, MenuOptionItemCallbackArgs, MenuCommandItem } from '../../models';
import { ExcelExportService, ExportService } from '../../services';

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
  closeMenu: jest.fn(),
  setOptions: jest.fn(),
  onBeforeMenuClose: new Slick.Event(),
  onBeforeMenuShow: new Slick.Event(),
  onColumnsChanged: new Slick.Event(),
  onCommand: new Slick.Event(),
  onOptionSelected: new Slick.Event(),
}));

jest.mock('slickgrid/plugins/slick.contextmenu', () => mockAddon);
Slick.Plugins = {
  ContextMenu: mockAddon
};

// define a <div> container to simulate the grid container
const template =
  `<div id="${containerId}" style="height: 800px; width: 600px;">
    <div id="slickGridContainer-${gridId}" class="gridPane" style="width: 100%;">
    <div id="${gridId}" class="${gridUid}" style="width: 100%"></div>
    </div>
  </div>`;

describe('contextMenuExtension', () => {
  const columnsMock: Column[] = [{ id: 'field1', field: 'field1', width: 100, headerKey: 'TITLE' }, { id: 'field2', field: 'field2', width: 75 }];
  let extensionUtility: ExtensionUtility;
  let translate: TranslateService;
  let extension: ContextMenuExtension;
  const gridOptionsMock = {
    enableAutoSizeColumns: true,
    enableContextMenu: true,
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
    contextMenu: {
      commandItems: [],
      autoAdjustDrop: true,
      autoAlignSide: true,
      hideCloseButton: false,
      hideClearGrouping: false,
      hideCollapseAllGroups: false,
      hideCommandSection: false,
      hideCopyCellValueCommand: false,
      hideExpandAllGroups: false,
      hideExportCsvCommand: false,
      hideExportExcelCommand: false,
      hideExportTextDelimitedCommand: true,
      hideMenuOnScroll: true,
      hideOptionSection: false,
      onExtensionRegistered: jest.fn(),
      onCommand: (e, args: MenuCommandItemCallbackArgs) => { },
      onBeforeMenuShow: (e, args: { cell: number; row: number; grid: any; }) => { },
      onBeforeMenuClose: (e, args: { cell: number; row: number; grid: any; menu: any; }) => { },
      onOptionSelected: (e, args: MenuOptionItemCallbackArgs) => { },
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
          ContextMenuExtension,
          ExtensionUtility,
          SharedService,
          { provide: ExcelExportService, useValue: excelExportServiceStub },
          { provide: ExportService, useValue: exportServiceStub },
        ],
        imports: [TranslateModule.forRoot()]
      });
      extension = TestBed.get(ContextMenuExtension);
      extensionUtility = TestBed.get(ExtensionUtility);
      translate = TestBed.get(TranslateService);
      translate.setTranslation('fr', {
        TITLE: 'Titre',
        COPY: 'Copier',
        CLEAR_ALL_GROUPING: 'Supprimer tous les groupes',
        COLLAPSE_ALL_GROUPS: 'Réduire tous les groupes',
        EXPAND_ALL_GROUPS: 'Étendre tous les groupes',
        EXPORT_TO_CSV: 'Exporter en format CSV',
        EXPORT_TO_EXCEL: 'Exporter vers Excel',
        EXPORT_TO_TAB_DELIMITED: 'Exporter en format texte (délimité par tabulation)',
        HELP: 'Aide',
        COMMANDS: 'Commandes',
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
        const onRegisteredSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onExtensionRegistered');

        const instance = extension.register();
        const addonInstance = extension.getAddonInstance();

        expect(instance).toBeTruthy();
        expect(instance).toEqual(addonInstance);
        expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
        expect(mockAddon).toHaveBeenCalledWith({
          'commandItems': [{
            action: expect.anything(),
            command: 'copy',
            disabled: false,
            iconCssClass: 'fa fa-clone',
            itemUsabilityOverride: expect.anything(),
            positionOrder: 50,
            title: 'Copier',
          }],
          commandTitle: 'Commands',
          autoAdjustDrop: true,
          autoAlignSide: true,
          hideCloseButton: false,
          hideClearGrouping: false,
          hideCollapseAllGroups: false,
          hideCommandSection: false,
          hideCopyCellValueCommand: false,
          hideExpandAllGroups: false,
          hideExportCsvCommand: false,
          hideExportExcelCommand: false,
          hideExportTextDelimitedCommand: true,
          hideMenuOnScroll: true,
          hideOptionSection: false,
          onCommand: expect.anything(),
          onOptionSelected: expect.anything(),
          onBeforeMenuClose: expect.anything(),
          onBeforeMenuShow: expect.anything(),
          onExtensionRegistered: expect.anything(),
        });
      });

      it('should call internal event handler subscribe and expect the "onBeforeMenuShow" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onb4CloseSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onBeforeMenuClose');
        const onb4ShowSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onBeforeMenuShow');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onCommand');
        const onOptionSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onOptionSelected');

        const instance = extension.register();
        instance.onBeforeMenuShow.notify({ cell: 0, row: 0, grid: gridStub }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(4);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onb4ShowSpy).toHaveBeenCalledWith(expect.anything(), { cell: 0, row: 0, grid: gridStub });
        expect(onb4CloseSpy).not.toHaveBeenCalled();
        expect(onCommandSpy).not.toHaveBeenCalled();
        expect(onOptionSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onBeforeMenuClose" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onb4CloseSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onBeforeMenuClose');
        const onb4ShowSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onBeforeMenuShow');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onCommand');
        const onOptionSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onOptionSelected');

        const menuElm = document.createElement('div');
        const instance = extension.register();
        instance.onBeforeMenuClose.notify({ cell: 0, row: 0, grid: gridStub, menu: menuElm }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(4);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onb4CloseSpy).toHaveBeenCalledWith(expect.anything(), { cell: 0, row: 0, grid: gridStub, menu: menuElm });
        expect(onb4ShowSpy).not.toHaveBeenCalled();
        expect(onCommandSpy).not.toHaveBeenCalled();
        expect(onOptionSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onCommand" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onb4CloseSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onBeforeMenuClose');
        const onb4ShowSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onBeforeMenuShow');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onCommand');
        const onOptionSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onOptionSelected');

        const instance = extension.register();
        instance.onCommand.notify({ grid: gridStub, command: 'help' }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(4);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onCommandSpy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, command: 'help' });
        expect(onOptionSpy).not.toHaveBeenCalled();
        expect(onb4CloseSpy).not.toHaveBeenCalled();
        expect(onb4ShowSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onOptionSelected" option to be called when addon notify is called', () => {
        const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
        const onb4CloseSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onBeforeMenuClose');
        const onb4ShowSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onBeforeMenuShow');
        const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onCommand');
        const onOptionSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onOptionSelected');

        const instance = extension.register();
        instance.onOptionSelected.notify({ grid: gridStub, command: 'help' }, new Slick.EventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalledTimes(4);
        expect(handlerSpy).toHaveBeenCalledWith(
          { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          expect.anything()
        );
        expect(onOptionSpy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, command: 'help' });
        expect(onCommandSpy).not.toHaveBeenCalled();
        expect(onb4CloseSpy).not.toHaveBeenCalled();
        expect(onb4ShowSpy).not.toHaveBeenCalled();
      });

      it('should dispose of the addon', () => {
        const instance = extension.register();
        const destroySpy = jest.spyOn(instance, 'destroy');

        extension.dispose();

        expect(destroySpy).toHaveBeenCalled();
      });
    });

    describe('addContextMenuCommandCommands method', () => {
      afterEach(() => {
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
      });

      it('should expect an empty "commandItems" array when "hideCopyCellValueCommand" is set True', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, contextMenu: { hideCopyCellValueCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([]);
      });

      it('should have the "copy"  menu command when "hideCopyCellValueCommand" is set to False', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, contextMenu: { hideCopyCellValueCommand: false } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { action: expect.anything(), iconCssClass: 'fa fa-clone', title: 'Copier', disabled: false, command: 'copy', positionOrder: 50, itemUsabilityOverride: expect.anything() }
        ]);
      });

      it('should have the "export-csv" menu command when "enableExport" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableExport: true, contextMenu: { hideCopyCellValueCommand: true, hideExportExcelCommand: true, hideExportTextDelimitedCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { action: expect.anything(), iconCssClass: 'fa fa-download', title: 'Exporter en format CSV', disabled: false, command: 'export-csv', positionOrder: 51 }
        ]);
      });

      it('should not have the "export-csv" menu command when "enableExport" and "hideExportCsvCommand" are set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableExport: true, contextMenu: { hideCopyCellValueCommand: true, hideExportExcelCommand: true, hideExportCsvCommand: true, hideExportTextDelimitedCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([]);
      });

      it('should have the "export-excel" menu command when "enableExport" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableExcelExport: true, enableExport: false, contextMenu: { hideCopyCellValueCommand: true, hideExportCsvCommand: true, hideExportExcelCommand: false } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { action: expect.anything(), iconCssClass: 'fa fa-file-excel-o text-success', title: 'Exporter vers Excel', disabled: false, command: 'export-excel', positionOrder: 52 }
        ]);
      });

      it('should have the "export-text-delimited" menu command when "enableExport" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableExport: true, contextMenu: { hideCopyCellValueCommand: true, hideExportCsvCommand: true, hideExportExcelCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { action: expect.anything(), iconCssClass: 'fa fa-download', title: 'Exporter en format texte (délimité par tabulation)', disabled: false, command: 'export-text-delimited', positionOrder: 53 }
        ]);
      });

      it('should not have the "export-text-delimited" menu command when "enableExport" and "hideExportCsvCommand" are set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableExport: true, contextMenu: { hideCopyCellValueCommand: true, hideExportExcelCommand: true, hideExportCsvCommand: true, hideExportTextDelimitedCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([]);
      });

      it('should have the "clear-grouping" menu command when "enableDraggableGrouping" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableDraggableGrouping: true, contextMenu: { hideCopyCellValueCommand: true, hideCollapseAllGroups: true, hideExpandAllGroups: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { divider: true, command: '', positionOrder: 54 },
          { action: expect.anything(), iconCssClass: 'fa fa-times', title: 'Supprimer tous les groupes', disabled: false, command: 'clear-grouping', positionOrder: 55, itemUsabilityOverride: expect.anything() }
        ]);
      });

      it('should have the "clear-grouping" menu command when "enableGrouping" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableGrouping: true, contextMenu: { hideCopyCellValueCommand: true, hideCollapseAllGroups: true, hideExpandAllGroups: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { divider: true, command: '', positionOrder: 54 },
          { action: expect.anything(), iconCssClass: 'fa fa-times', title: 'Supprimer tous les groupes', disabled: false, command: 'clear-grouping', positionOrder: 55, itemUsabilityOverride: expect.anything() }
        ]);
      });

      it('should not have the "clear-grouping" menu command when "enableGrouping" and "hideClearGrouping" are set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableGrouping: true, contextMenu: { hideCopyCellValueCommand: true, hideCollapseAllGroups: true, hideExpandAllGroups: true, hideClearGrouping: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([{ divider: true, command: '', positionOrder: 54 }]);
      });

      it('should have the "collapse-all-groups" menu command when "enableGrouping" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableGrouping: true, contextMenu: { hideCopyCellValueCommand: true, hideClearGrouping: true, hideCollapseAllGroups: false, hideExpandAllGroups: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { divider: true, command: '', positionOrder: 54 },
          { action: expect.anything(), iconCssClass: 'fa fa-compress', title: 'Réduire tous les groupes', disabled: false, command: 'collapse-all-groups', positionOrder: 56, itemUsabilityOverride: expect.anything() }
        ]);
      });

      it('should not have the "collapse-all-groups" menu command when "enableGrouping" and "hideClearGrouping" are set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableGrouping: true, contextMenu: { hideCopyCellValueCommand: true, hideClearGrouping: true, hideCollapseAllGroups: true, hideExpandAllGroups: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([{ divider: true, command: '', positionOrder: 54 }]);
      });

      it('should have the "expand-all-groups" menu command when "enableGrouping" is set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableGrouping: true, contextMenu: { hideCopyCellValueCommand: true, hideClearGrouping: true, hideCollapseAllGroups: true, hideExpandAllGroups: false } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { divider: true, command: '', positionOrder: 54 },
          { action: expect.anything(), iconCssClass: 'fa fa-expand', title: 'Étendre tous les groupes', disabled: false, command: 'expand-all-groups', positionOrder: 57, itemUsabilityOverride: expect.anything() }
        ]);
      });

      it('should not have the "expand-all-groups" menu command when "enableGrouping" and "hideClearGrouping" are set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableGrouping: true, contextMenu: { hideCopyCellValueCommand: true, hideClearGrouping: true, hideCollapseAllGroups: true, hideExpandAllGroups: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([{ divider: true, command: '', positionOrder: 54 }]);
      });

      it('should have all 3 Grouping commands (clear, collapse, expand) when grouping is enabled and none of the hidden flags are set', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableGrouping: true, contextMenu: { hideCopyCellValueCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { divider: true, command: '', positionOrder: 54 },
          { action: expect.anything(), iconCssClass: 'fa fa-times', title: 'Supprimer tous les groupes', disabled: false, command: 'clear-grouping', positionOrder: 55, itemUsabilityOverride: expect.anything() },
          { action: expect.anything(), iconCssClass: 'fa fa-compress', title: 'Réduire tous les groupes', disabled: false, command: 'collapse-all-groups', positionOrder: 56, itemUsabilityOverride: expect.anything() },
          { action: expect.anything(), iconCssClass: 'fa fa-expand', title: 'Étendre tous les groupes', disabled: false, command: 'expand-all-groups', positionOrder: 57, itemUsabilityOverride: expect.anything() }
        ]);
      });

      it('should have all 3 Grouping commands (clear, collapse, expand) & the copy command when there no hidden flags in the contextMenu object', () => {
        const copyGridOptionsMock = { ...gridOptionsMock, enableGrouping: true } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { action: expect.anything(), iconCssClass: 'fa fa-clone', title: 'Copier', disabled: false, command: 'copy', positionOrder: 50, itemUsabilityOverride: expect.anything() },
          { divider: true, command: '', positionOrder: 54 },
          { action: expect.anything(), iconCssClass: 'fa fa-times', title: 'Supprimer tous les groupes', disabled: false, command: 'clear-grouping', positionOrder: 55, itemUsabilityOverride: expect.anything() },
          { action: expect.anything(), iconCssClass: 'fa fa-compress', title: 'Réduire tous les groupes', disabled: false, command: 'collapse-all-groups', positionOrder: 56, itemUsabilityOverride: expect.anything() },
          { action: expect.anything(), iconCssClass: 'fa fa-expand', title: 'Étendre tous les groupes', disabled: false, command: 'expand-all-groups', positionOrder: 57, itemUsabilityOverride: expect.anything() }
        ]);
      });
    });

    describe('adding Context Menu Command Items', () => {
      const commandItemsMock = [{
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
          contextMenu: {
            commandItems: commandItemsMock,
            hideCopyCellValueCommand: true,
            hideExportCsvCommand: false,
            hideExportExcelCommand: false,
            hideExportTextDelimitedCommand: true,
            hideClearGrouping: true,
            hideCollapseAllGroups: true,
            hideExpandAllGroups: true,
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

      it('should have user Context Menu Command items', () => {
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { action: expect.anything(), command: 'export-csv', disabled: false, iconCssClass: 'fa fa-download', positionOrder: 51, title: 'Exporter en format CSV' },
          // { action: expect.anything(), command: 'export-excel', disabled: false, iconCssClass: 'fa fa-file-excel-o text-success', positionOrder: 54, title: 'Exporter vers Excel' },
          { command: 'help', disabled: false, iconCssClass: 'fa fa-question-circle', positionOrder: 99, title: 'Aide', titleKey: 'HELP' },
        ]);
      });

      it('should have same user Context Menu Command items even when Context Menu extension is registered multiple times', () => {
        extension.register();
        extension.register();
        expect(SharedService.prototype.gridOptions.contextMenu.commandItems).toEqual([
          { action: expect.anything(), command: 'export-csv', disabled: false, iconCssClass: 'fa fa-download', positionOrder: 51, title: 'Exporter en format CSV' },
          // { action: expect.anything(), command: 'export-excel', disabled: false, iconCssClass: 'fa fa-file-excel-o text-success', positionOrder: 54, title: 'Exporter vers Excel' },
          { command: 'help', disabled: false, iconCssClass: 'fa fa-question-circle', positionOrder: 99, title: 'Aide', titleKey: 'HELP' },
        ]);
      });
    });

    describe('executeContextMenuInternalCommandCommands method', () => {
      // xit('should call "clearFilters" and dataview refresh when the command triggered is "clear-filter"', () => {
      //   const filterSpy = jest.spyOn(filterServiceStub, 'clearFilters');
      //   const refreshSpy = jest.spyOn(SharedService.prototype.dataView, 'refresh');
      //   const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onCommand');

      //   const instance = extension.register();
      //   instance.onCommand.notify({ grid: gridStub, command: 'clear-filter' }, new Slick.EventData(), gridStub);

      //   expect(onCommandSpy).toHaveBeenCalled();
      //   expect(filterSpy).toHaveBeenCalled();
      //   expect(refreshSpy).toHaveBeenCalled();
      // });

      // xit('should call "clearSorting" and dataview refresh when the command triggered is "clear-sorting"', () => {
      //   const sortSpy = jest.spyOn(sortServiceStub, 'clearSorting');
      //   const refreshSpy = jest.spyOn(SharedService.prototype.dataView, 'refresh');
      //   const onCommandSpy = jest.spyOn(SharedService.prototype.gridOptions.contextMenu, 'onCommand');

      //   const instance = extension.register();
      //   instance.onCommand.notify({ grid: gridStub, command: 'clear-sorting' }, new Slick.EventData(), gridStub);

      //   expect(onCommandSpy).toHaveBeenCalled();
      //   expect(sortSpy).toHaveBeenCalled();
      //   expect(refreshSpy).toHaveBeenCalled();
      // });

      it('should call "exportToExcel" when the command triggered is "export-excel"', () => {
        const excelExportSpy = jest.spyOn(excelExportServiceStub, 'exportToExcel');
        const copyGridOptionsMock = { ...gridOptionsMock, enableExcelExport: true, enableExport: false, contextMenu: { hideCopyCellValueCommand: true, hideExportCsvCommand: true, hideExportExcelCommand: false } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();

        const menuItemExport = copyGridOptionsMock.contextMenu.commandItems.find((item: MenuCommandItem) => item.command === 'export-excel') as MenuCommandItem;
        menuItemExport.action();

        expect(excelExportSpy).toHaveBeenCalledWith({
          filename: 'export',
          format: FileType.xlsx,
        });
      });

      it('should call "exportToFile" with CSV set when the command triggered is "export-csv"', () => {
        const exportSpy = jest.spyOn(exportServiceStub, 'exportToFile');
        const copyGridOptionsMock = { ...gridOptionsMock, enableExcelExport: false, enableExport: true, contextMenu: { hideCopyCellValueCommand: true, hideExportCsvCommand: false, hideExportExcelCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();

        const menuItemExport = copyGridOptionsMock.contextMenu.commandItems.find((item: MenuCommandItem) => item.command === 'export-csv') as MenuCommandItem;
        menuItemExport.action();

        expect(exportSpy).toHaveBeenCalledWith({
          delimiter: DelimiterType.comma,
          filename: 'export',
          format: FileType.csv,
          useUtf8WithBom: true
        });
      });

      it('should call "exportToFile" with CSV set when the command triggered is "export-text-delimited"', () => {
        const exportSpy = jest.spyOn(exportServiceStub, 'exportToFile');
        const copyGridOptionsMock = { ...gridOptionsMock, enableExcelExport: false, enableExport: true, contextMenu: { hideCopyCellValueCommand: true, hideExportCsvCommand: false, hideExportExcelCommand: true } } as unknown as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(copyGridOptionsMock);
        extension.register();

        const menuItemExport = copyGridOptionsMock.contextMenu.commandItems.find((item: MenuCommandItem) => item.command === 'export-text-delimited') as MenuCommandItem;
        menuItemExport.action();

        expect(exportSpy).toHaveBeenCalledWith({
          delimiter: DelimiterType.tab,
          filename: 'export',
          format: FileType.txt,
          useUtf8WithBom: true
        });
      });
    });

    describe('translateContextMenu method', () => {
      xit('should translate the necessary titles', () => {
        const utilitySpy = jest.spyOn(extensionUtility, 'getPickerTitleOutputString');
        const translateSpy = jest.spyOn(extensionUtility, 'translateItems');

        const instance = extension.register();
        extension.translateContextMenu();
        const updateColsSpy = jest.spyOn(instance, 'updateAllTitles');

        expect(utilitySpy).toHaveBeenCalled();
        expect(translateSpy).toHaveBeenCalled();
        expect(updateColsSpy).toHaveBeenCalledWith(SharedService.prototype.gridOptions.contextMenu);
        expect(SharedService.prototype.gridOptions.contextMenu.commandTitle).toBe('Commandes');
        expect(columnsMock).toEqual([
          { id: 'field1', field: 'field1', width: 100, name: 'Titre', headerKey: 'TITLE' },
          { id: 'field2', field: 'field2', width: 75 }
        ]);
      });
    });
  });

  describe('without ngx-translate', () => {
    beforeEach(() => {
      translate = null;
      extension = new ContextMenuExtension({} as ExcelExportService, {} as ExportService, {} as ExtensionUtility, { gridOptions: { enableTranslate: true } } as SharedService, translate);
    });

    it('should throw an error if "enableTranslate" is set but the I18N Service is null', () => {
      expect(() => extension.register()).toThrowError('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured');
    });
  });
});
