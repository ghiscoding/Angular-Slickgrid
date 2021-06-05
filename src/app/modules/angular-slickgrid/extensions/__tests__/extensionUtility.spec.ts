import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { ExtensionUtility } from '../extensionUtility';
import { Column, GridOption, SlickGrid } from '../../models';
import { SharedService } from '../../services/shared.service';

declare let Slick: any;

const gridStub = {
  getOptions: jest.fn(),
  setColumns: jest.fn(),
  setOptions: jest.fn(),
  registerPlugin: jest.fn(),
} as unknown as SlickGrid;

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

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [ExtensionUtility, SharedService],
        imports: [TranslateModule.forRoot()]
      });
      utility = TestBed.inject(ExtensionUtility);
      translate = TestBed.inject(TranslateService);
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

    describe('readjustFrozenColumnIndexWhenNeeded method', () => {
      let gridOptionsMock: GridOption;

      beforeEach(() => {
        gridOptionsMock = { frozenColumn: 1 } as GridOption;
        jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        jest.spyOn(SharedService.prototype, 'frozenVisibleColumnId', 'get').mockReturnValue('field2');
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should increase "frozenColumn" from 0 to 1 when showing a column that was previously hidden and its index is lower or equal to provided argument of frozenColumnIndex', () => {
        const allColumns = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3' }] as Column[];
        const visibleColumns = [{ id: 'field1' }, { id: 'field2' }] as Column[];
        const setOptionSpy = jest.spyOn(SharedService.prototype.grid, 'setOptions');

        utility.readjustFrozenColumnIndexWhenNeeded(0, allColumns, visibleColumns);

        expect(setOptionSpy).toHaveBeenCalledWith({ frozenColumn: 1 });
      });

      it('should keep "frozenColumn" at 1 when showing a column that was previously hidden and its index is greater than provided argument of frozenColumnIndex', () => {
        const allColumns = [{ id: 'field1' }, { id: 'field2' }] as Column[];
        const visibleColumns = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3' }] as Column[];
        const setOptionSpy = jest.spyOn(SharedService.prototype.grid, 'setOptions');

        utility.readjustFrozenColumnIndexWhenNeeded(1, allColumns, visibleColumns);

        expect(setOptionSpy).not.toHaveBeenCalled();
      });

      it('should decrease "frozenColumn" from 1 to 0 when hiding a column that was previously shown and its index is lower or equal to provided argument of frozenColumnIndex', () => {
        const allColumns = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3' }] as Column[];
        const visibleColumns = [{ id: 'field2' }] as Column[];
        const setOptionSpy = jest.spyOn(SharedService.prototype.grid, 'setOptions');

        utility.readjustFrozenColumnIndexWhenNeeded(1, allColumns, visibleColumns);

        expect(setOptionSpy).toHaveBeenCalledWith({ frozenColumn: 0 });
      });

      it('should keep "frozenColumn" at 1 when hiding a column that was previously hidden and its index is greater than provided argument of frozenColumnIndex', () => {
        const allColumns = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3' }] as Column[];
        const visibleColumns = [{ id: 'field1' }, { id: 'field2' }] as Column[];
        const setOptionSpy = jest.spyOn(SharedService.prototype.grid, 'setOptions');

        utility.readjustFrozenColumnIndexWhenNeeded(1, allColumns, visibleColumns);

        expect(setOptionSpy).not.toHaveBeenCalled();
      });

      it('should not change "frozenColumn" when showing a column that was not found in the visibleColumns columns array', () => {
        const allColumns = [{ id: 'field1' }, { id: 'field2' }, { id: 'field3' }] as Column[];
        const visibleColumns = [{ id: 'field1' }, { field: 'field2' }] as unknown as Column[];
        const setOptionSpy = jest.spyOn(SharedService.prototype.grid, 'setOptions');

        utility.readjustFrozenColumnIndexWhenNeeded(0, allColumns, visibleColumns);

        expect(setOptionSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('without ngx-translate', () => {
    let utility: ExtensionUtility;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [ExtensionUtility, SharedService],
        imports: []
      });
      utility = TestBed.inject(ExtensionUtility);
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

      it('should return the same text when provided as the 3rd argument', () => {
        const gridOptionsMock = { enableTranslate: false, enableGridMenu: true, gridMenu: { hideForceFitButton: false, hideSyncResizeButton: true, columnTitle: 'Columns' } } as GridOption;
        jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
        const output = utility.translateWhenEnabledAndServiceExist('COMMANDS', 'NOT_EXIST', 'last argument wins');
        expect(output).toBe('last argument wins');
      });
    });
  });
});
