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
Slick.Data = {
  GroupItemMetadataProvider: mockAddon
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
      // we can test only the GroupItemMetadataProvider which is not tested in any other extension test
      it('should check that groupItemMetaProvider gets loaded', () => {
        utility.loadExtensionDynamically(ExtensionName.groupItemMetaProvider);
        const groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
        expect(mockAddon).toHaveBeenCalled();
        expect(groupItemMetadataProvider).not.toBeNull();
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
  });
});
