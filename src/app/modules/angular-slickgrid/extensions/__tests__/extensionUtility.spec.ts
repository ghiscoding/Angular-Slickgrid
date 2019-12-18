import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { ExtensionUtility } from '../extensionUtility';
import { ExtensionName, GridOption } from '../../models';
import { SharedService } from '../../services/shared.service';

declare var Slick: any;

const mockAddon = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn()
}));

jest.mock('slickgrid/slick.groupitemmetadataprovider', () => mockAddon);
jest.mock('slickgrid/controls/slick.columnpicker', () => mockAddon);
jest.mock('slickgrid/controls/slick.gridmenu', () => mockAddon);
jest.mock('slickgrid/plugins/slick.autotooltips', () => mockAddon);
jest.mock('slickgrid/plugins/slick.cellmenu', () => mockAddon);
jest.mock('slickgrid/plugins/slick.cellexternalcopymanager', () => mockAddon);
jest.mock('slickgrid/plugins/slick.contextmenu', () => mockAddon);
jest.mock('slickgrid/plugins/slick.draggablegrouping', () => mockAddon);
jest.mock('slickgrid/plugins/slick.headerbuttons', () => mockAddon);
jest.mock('slickgrid/plugins/slick.headermenu', () => mockAddon);
jest.mock('slickgrid/plugins/slick.rowselectionmodel', () => mockAddon);
jest.mock('slickgrid/plugins/slick.rowdetailview', () => mockAddon);
jest.mock('slickgrid/plugins/slick.rowmovemanager', () => mockAddon);

Slick = {
  AutoTooltips: mockAddon,
  DraggableGrouping: mockAddon,
  RowMoveManager: mockAddon,
  RowSelectionModel: mockAddon,
  Controls: {
    ColumnPicker: mockAddon,
    GridMenu: mockAddon,
  },
  Data: {
    GroupItemMetadataProvider: mockAddon
  },
  Plugins: {
    CellMenu: mockAddon,
    ContextMenu: mockAddon,
    CellExternalCopyManager: mockAddon,
    HeaderButtons: mockAddon,
    HeaderMenu: mockAddon,
    RowDetailView: mockAddon,
  }
};

describe('ExtensionUtility', () => {
  describe('with ngx-translate', () => {

    let translate: TranslateService;
    let utility: ExtensionUtility;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ExtensionUtility, SharedService],
        imports: [TranslateModule.forRoot()]
      });
      utility = TestBed.get(ExtensionUtility);
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
      translate.setTranslation('en', {
        TITLE: 'Title',
        COMMANDS: 'Commands',
        COLUMNS: 'Columns',
        FORCE_FIT_COLUMNS: 'Force fit columns',
        SYNCHRONOUS_RESIZE: 'Synchronous resize',
        HIDE_COLUMN: 'Hide Column',
        REMOVE_FILTER: 'Remove Filter',
        REMOVE_SORT: 'Remove Sort',
        SORT_ASCENDING: 'Sort Ascending',
        SORT_DESCENDING: 'Sort Descending',
      });
      translate.use('fr');
    });

    describe('arrayRemoveItemByIndex method', () => {
      it('should remove an item from the array', () => {
        const input = [{ field: 'field1', name: 'Field 1' }, { field: 'field2', name: 'Field 2' }, { field: 'field3', name: 'Field 3' }];
        const expected = [{ field: 'field1', name: 'Field 1' }, { field: 'field3', name: 'Field 3' }];

        const output = utility.arrayRemoveItemByIndex(input, 1);
        expect(output).toEqual(expected);
      });
    });

    describe('loadExtensionDynamically method', () => {
      it('should check that autoTooltip gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.autoTooltip);
        const autoTooltip = new Slick.AutoTooltips();
        expect(mockAddon).toHaveBeenCalled();
        expect(autoTooltip).not.toBeNull();
      });

      it('should check that cellExternalCopyManager gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.cellExternalCopyManager);
        const autoTooltip = new Slick.Plugins.CellExternalCopyManager();
        expect(mockAddon).toHaveBeenCalled();
        expect(autoTooltip).not.toBeNull();
      });

      it('should check that cellMenu gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.cellMenu);
        const cellMenu = new Slick.Plugins.CellMenu();
        expect(mockAddon).toHaveBeenCalled();
        expect(cellMenu).not.toBeNull();
      });

      it('should check that columnPicker gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.columnPicker);
        const columnPicker = new Slick.Controls.ColumnPicker();
        expect(mockAddon).toHaveBeenCalled();
        expect(columnPicker).not.toBeNull();
      });

      it('should check that contextMenu gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.contextMenu);
        const contextMenu = new Slick.Plugins.ContextMenu();
        expect(mockAddon).toHaveBeenCalled();
        expect(contextMenu).not.toBeNull();
      });

      it('should check that draggableGrouping gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.draggableGrouping);
        const draggableGrouping = new Slick.DraggableGrouping();
        expect(mockAddon).toHaveBeenCalled();
        expect(draggableGrouping).not.toBeNull();
      });

      it('should check that gridMenu gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.gridMenu);
        const gridMenu = new Slick.Controls.GridMenu();
        expect(mockAddon).toHaveBeenCalled();
        expect(gridMenu).not.toBeNull();
      });

      it('should check that groupItemMetaProvider gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.groupItemMetaProvider);
        const groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
        expect(mockAddon).toHaveBeenCalled();
        expect(groupItemMetadataProvider).not.toBeNull();
      });

      it('should check that headerButton gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.headerButton);
        const headerButton = new Slick.Plugins.HeaderButtons();
        expect(mockAddon).toHaveBeenCalled();
        expect(headerButton).not.toBeNull();
      });

      it('should check that headerMenu gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.headerMenu);
        const headerMenu = new Slick.Plugins.HeaderMenu();
        expect(mockAddon).toHaveBeenCalled();
        expect(headerMenu).not.toBeNull();
      });

      it('should check that rowSelection gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.rowSelection);
        const rowSelection = new Slick.RowSelectionModel();
        expect(mockAddon).toHaveBeenCalled();
        expect(rowSelection).not.toBeNull();
      });

      it('should check that rowDetail gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.rowDetailView);
        const rowDetailView = new Slick.Plugins.RowDetailView();
        expect(mockAddon).toHaveBeenCalled();
        expect(rowDetailView).not.toBeNull();
      });

      it('should check that rowMoveManager gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.rowMoveManager);
        const rowMoveManager = new Slick.RowMoveManager();
        expect(mockAddon).toHaveBeenCalled();
        expect(rowMoveManager).not.toBeNull();
      });
    });

    describe('getPickerTitleOutputString method', () => {
      it('should translate titleKey when there is one', () => {
        const gridOptionsMock = { enableTranslate: true, enableGridMenu: true, gridMenu: { hideForceFitButton: false, hideSyncResizeButton: true, columnTitleKey: 'TITLE' } } as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        const output = utility.getPickerTitleOutputString('columnTitle', 'gridMenu');

        expect(output).toEqual('Titre');
      });

      it('should return undefined when the given property is not found', () => {
        const gridOptionsMock = { enableTranslate: true, enableGridMenu: true, gridMenu: { hideForceFitButton: false, hideSyncResizeButton: true } } as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

        const output = utility.getPickerTitleOutputString('unknown', 'gridMenu');

        expect(output).toEqual(undefined);
      });
    });

    describe('sortItems method', () => {
      it('should sort the items by their order property', () => {
        const inputArray = [{ field: 'field1', order: 3 }, { field: 'field2', order: 1 }, { field: 'field3', order: 2 }];
        const expectedArray = [{ field: 'field2', order: 1 }, { field: 'field3', order: 2 }, { field: 'field1', order: 3 }];

        utility.sortItems(inputArray, 'order');

        expect(inputArray).toEqual(expectedArray);
      });

      it('should sort the items by their order property when found and then return the object without the property', () => {
        const inputArray = [{ field: 'field1', order: 3 }, { field: 'field3', order: 2 }, { field: 'field2' }];
        const expectedArray = [{ field: 'field3', order: 2 }, { field: 'field1', order: 3 }, { field: 'field2' }];

        utility.sortItems(inputArray, 'order');

        expect(inputArray).toEqual(expectedArray);
      });
    });

    describe('translateWhenEnabledAndServiceExist method', () => {
      it('should translate using the Translate Service', () => {
        const output = utility.translateWhenEnabledAndServiceExist('COMMANDS', 'TEXT_COMMANDS');
        expect(output).toBe('Commandes');
      });
    });
  });

  describe('without ngx-translate', () => {
    let utility: ExtensionUtility;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ExtensionUtility, SharedService],
        imports: []
      });
      utility = TestBed.get(ExtensionUtility);
    });

    it('should throw an error if "enableTranslate" is set but the Translate Service is null', () => {
      const gridOptionsMock = { enableTranslate: true, enableGridMenu: true, gridMenu: { hideForceFitButton: false, hideSyncResizeButton: true, columnTitleKey: 'TITLE' } } as GridOption;
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

      expect(() => utility.getPickerTitleOutputString('columnTitle', 'gridMenu')).toThrowError('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured');
    });

    describe('translateWhenEnabledAndServiceExist method', () => {
      it('should use the Locales Constants when found', () => {
        const gridOptionsMock = { enableTranslate: false, enableGridMenu: true, gridMenu: { hideForceFitButton: false, hideSyncResizeButton: true, columnTitle: 'Columns' } } as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        const output = utility.translateWhenEnabledAndServiceExist('COMMANDS', 'TEXT_COMMANDS');
        expect(output).toBe('Commands');
      });

      it('should return the same key passed as argument when not found in the Locales Constants', () => {
        const gridOptionsMock = { enableTranslate: false, enableGridMenu: true, gridMenu: { hideForceFitButton: false, hideSyncResizeButton: true, columnTitle: 'Columns' } } as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        const output = utility.translateWhenEnabledAndServiceExist('COMMANDS', 'NOT_EXIST');
        expect(output).toBe('NOT_EXIST');
      });
    });
  });
});
