import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { GridService, ExtensionService, FilterService, GridStateService, SortService } from '..';
import { GridOption } from '../..';

declare var Slick: any;
const HIGHLIGHT_TIMEOUT = 1500;

const mockSelectionModel = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn()
}));

jest.mock('slickgrid/plugins/slick.rowselectionmodel', () => mockSelectionModel);
Slick.RowSelectionModel = mockSelectionModel;

let extensionServiceStub = {
} as ExtensionService;

let filterServiceStub = {
} as FilterService;

let gridStateServiceStub = {
} as GridStateService;

let sortServiceStub = {
} as SortService;

const dataviewStub = {
  deleteItem: jest.fn(),
  getIdxById: jest.fn(),
  getItem: jest.fn(),
  getRowById: jest.fn(),
  insertItem: jest.fn(),
  reSort: jest.fn(),
  updateItem: jest.fn(),
};

const gridStub = {
  insertItem: jest.fn(),
  getOptions: jest.fn(),
  getColumns: jest.fn(),
  getSelectionModel: jest.fn(),
  setSelectionModel: jest.fn(),
  setSelectedRows: jest.fn(),
  scrollRowIntoView: jest.fn(),
  updateRow: jest.fn(),
};

describe('Grid Service', () => {
  let service: GridService;
  let translate: TranslateService;
  jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableAutoResize: true } as GridOption);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ExtensionService, useValue: extensionServiceStub },
        { provide: FilterService, useValue: filterServiceStub },
        { provide: GridStateService, useValue: gridStateServiceStub },
        { provide: SortService, useValue: sortServiceStub },
        GridService,
      ],
      imports: [TranslateModule.forRoot()]
    });
    translate = TestBed.get(TranslateService);
    service = TestBed.get(GridService);
    service.init(gridStub, dataviewStub);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('upsertItem methods', () => {
    it('should throw an error when 1st argument for the item object is missing', () => {
      expect(() => service.upsertItem(null)).toThrowError('Calling Upsert of an item requires the item to include an "id" property');
    });

    it('should expect the service to call the "addItem" when calling "upsertItem" with the item not being found in the grid', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(undefined);
      const serviceSpy = jest.spyOn(service, 'addItem');
      const rxSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItem(mockItem);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(dataviewSpy).toHaveBeenCalledWith(0);
      expect(serviceSpy).toHaveBeenCalledWith(mockItem, true, false, true);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the service to call the "addItem" multiple times when calling "upsertItems" with the items not being found in the grid', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(1);
      const serviceUpsertSpy = jest.spyOn(service, 'upsertItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItems(mockItems);

      expect(dataviewSpy).toHaveBeenCalledTimes(4); // called 4x times, 2x by the upsert itself and 2x by the addItem
      expect(serviceUpsertSpy).toHaveBeenCalledTimes(2);
      expect(serviceUpsertSpy).toHaveBeenNthCalledWith(1, mockItems[0], false, false, false);
      expect(serviceUpsertSpy).toHaveBeenNthCalledWith(2, mockItems[1], false, false, false);
      expect(serviceHighlightSpy).toHaveBeenCalledWith([0, 1]);
      expect(rxSpy).toHaveBeenCalledWith(mockItems);
    });

    it('should expect the service to call the "upsertItem" when calling "upsertItems" with a single item which is not an array', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById');
      const serviceUpsertSpy = jest.spyOn(service, 'upsertItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItems(mockItem, false, true, false);

      expect(dataviewSpy).toHaveBeenCalledTimes(2);
      expect(serviceUpsertSpy).toHaveBeenCalledTimes(1);
      expect(serviceUpsertSpy).toHaveBeenCalledWith(mockItem, false, true, false);
      expect(serviceHighlightSpy).not.toHaveBeenCalled();
      expect(rxSpy).not.toHaveBeenCalled();
    });

    it('should throw an error when calling "upsertItemById" without a valid "id"', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      expect(() => service.upsertItemById(undefined, mockItem)).toThrowError('Calling Upsert of an item requires the item to include a valid and unique "id" property');
    });

    it('should call the "upsertItemById" method and expect it to call the "addItem" with default boolean flags', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(undefined);
      const serviceAddItemSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItemById(0, mockItem);

      expect(dataviewSpy).toHaveBeenCalledWith(0);
      expect(serviceAddItemSpy).toHaveBeenCalled();
      expect(serviceAddItemSpy).toHaveBeenCalledWith(mockItem, true, false, true);
      expect(serviceHighlightSpy).toHaveBeenCalledWith(0);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should call the "upsertItemById" method and expect it to call the "addItem" with different boolean flags provided as arguments', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(undefined);
      const serviceAddItemSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItemById(0, mockItem, false, true, false);

      expect(dataviewSpy).toHaveBeenCalledWith(0);
      expect(serviceAddItemSpy).toHaveBeenCalled();
      expect(serviceAddItemSpy).toHaveBeenCalledWith(mockItem, false, true, false);
      expect(serviceHighlightSpy).not.toHaveBeenCalled();
      expect(rxSpy).not.toHaveBeenCalled();
    });

    it('should call the "upsertItemById" method and expect it to call the "updateItem" when the item already exist in the grid', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0);
      const serviceAddItemSpy = jest.spyOn(service, 'addItem');
      const serviceUpdateSpy = jest.spyOn(service, 'updateItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItemById(0, mockItem);

      expect(dataviewSpy).toHaveBeenCalledWith(0);
      expect(serviceAddItemSpy).not.toHaveBeenCalled();
      expect(serviceUpdateSpy).toHaveBeenCalled();
      expect(serviceUpdateSpy).toHaveBeenCalledWith(mockItem, true, true);
      expect(serviceHighlightSpy).not.toHaveBeenCalled();
      expect(rxSpy).toHaveBeenCalled();
    });
  });

  describe('updateItem methods', () => {
    it('should throw an error when 1st argument for the item object is missing', () => {
      expect(() => service.updateItem(null)).toThrowError('Calling Update of an item requires the item to include an "id" property');
    });

    it('should expect the service to call the "updateItemById" when calling "updateItem"', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const getRowIdSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(mockItem.id);
      const getRowIndexSpy = jest.spyOn(dataviewStub, 'getIdxById').mockReturnValue(mockItem.id);
      const updateSpy = jest.spyOn(service, 'updateItemById');
      const rxSpy = jest.spyOn(service.onItemUpdated, 'next');

      service.updateItem(mockItem);

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(getRowIdSpy).toHaveBeenCalledWith(0);
      expect(getRowIndexSpy).toHaveBeenCalledWith(0);
      expect(updateSpy).toHaveBeenCalledWith(mockItem.id, mockItem, true, true);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the service to call the "updateItemById" multiple times when calling "updateItems" with an array of items', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      const getRowIdSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0).mockReturnValueOnce(0).mockReturnValueOnce(1);
      const getRowIndexSpy = jest.spyOn(dataviewStub, 'getIdxById').mockReturnValue(0).mockReturnValueOnce(0).mockReturnValueOnce(1);
      const serviceUpdateSpy = jest.spyOn(service, 'updateItemById');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpdated, 'next');

      service.updateItems(mockItems);

      expect(getRowIdSpy).toHaveBeenCalledTimes(2);
      expect(getRowIndexSpy).toHaveBeenCalledTimes(2);
      expect(serviceUpdateSpy).toHaveBeenCalledTimes(2);
      expect(serviceUpdateSpy).toHaveBeenNthCalledWith(1, mockItems[0].id, mockItems[0], false, false);
      expect(serviceUpdateSpy).toHaveBeenNthCalledWith(2, mockItems[1].id, mockItems[1], false, false);
      expect(serviceHighlightSpy).toHaveBeenCalledWith([0, 1]);
      expect(rxSpy).toHaveBeenCalledWith(mockItems);
    });

    it('should expect the service to call the "updateItem" when calling "updateItems" with a single item which is not an array', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const getRowIdSpy = jest.spyOn(dataviewStub, 'getRowById');
      const getRowIndexSpy = jest.spyOn(dataviewStub, 'getIdxById');
      const serviceUpdateSpy = jest.spyOn(service, 'updateItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpdated, 'next');

      service.updateItems(mockItem, false, true);

      expect(getRowIdSpy).toHaveBeenCalledTimes(1);
      expect(getRowIndexSpy).toHaveBeenCalledTimes(1);
      expect(serviceUpdateSpy).toHaveBeenCalledTimes(1);
      expect(serviceUpdateSpy).toHaveBeenCalledWith(mockItem, false, true);
      expect(serviceHighlightSpy).not.toHaveBeenCalled();
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should call the "updateItem" method and expect it to call the "updateItemById" with different boolean flags provided as arguments', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const getRowIdSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0);
      const getRowIndexSpy = jest.spyOn(dataviewStub, 'getIdxById').mockReturnValue(0);
      const updateByIdSpy = jest.spyOn(service, 'updateItemById');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpdated, 'next');

      service.updateItem(mockItem, false, true);

      expect(getRowIdSpy).toHaveBeenCalledWith(0);
      expect(getRowIndexSpy).toHaveBeenCalledWith(0);
      expect(updateByIdSpy).toHaveBeenCalled();
      expect(updateByIdSpy).toHaveBeenCalledWith(mockItem.id, mockItem, false, true);
      expect(serviceHighlightSpy).not.toHaveBeenCalled();
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should throw an error when calling "updateItemById" without a valid "id"', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      expect(() => service.updateItemById(undefined, mockItem)).toThrowError('Cannot update a row without a valid "id"');
    });

    it('should throw an error when calling "updateItemById" and not finding the item in the grid', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(undefined);
      expect(() => service.updateItemById(5, mockItem)).toThrowError('The item to update in the grid was not found with id: 5');
    });
  });

  describe('addItem methods', () => {
    it('should throw an error when 1st argument for the item object is missing', () => {
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(undefined);
      expect(() => service.addItem(null)).toThrowError('We could not find SlickGrid Grid, DataView objects');
    });

    it('should throw an error when 1st argument for the item object is missing or "id" is missing', () => {
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableAutoResize: true } as GridOption);
      expect(() => service.addItem(null)).toThrowError('Adding an item requires the item to include an "id" property');
      expect(() => service.addItem({ user: 'John' })).toThrowError('Adding an item requires the item to include an "id" property');
    });

    it('should expect the service to call the DataView "insertItem" when calling "addItem" with an item', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const addSpy = jest.spyOn(dataviewStub, 'insertItem');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItem(mockItem);

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(0, mockItem);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the service to call the "addItem" multiple times when calling "addItems" with an array of items', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      const serviceAddSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItems(mockItems);

      expect(serviceAddSpy).toHaveBeenCalledTimes(2);
      expect(serviceAddSpy).toHaveBeenNthCalledWith(1, mockItems[0], false, false, false);
      expect(serviceAddSpy).toHaveBeenNthCalledWith(2, mockItems[1], false, false, false);
      expect(serviceHighlightSpy).toHaveBeenCalledTimes(1);
      expect(serviceHighlightSpy).toHaveBeenCalledWith([0, 1]);
      expect(rxSpy).toHaveBeenCalledWith(mockItems);
    });

    it('should expect the service to call the "addItem" when calling "addItems" with a single item which is not an array', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const serviceAddSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItems(mockItem);

      expect(serviceAddSpy).toHaveBeenCalledTimes(1);
      expect(serviceAddSpy).toHaveBeenCalledWith(mockItem, true, false, true);
      expect(serviceHighlightSpy).toHaveBeenCalledTimes(1);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should add a single item by calling "addItems" method and expect to call a grid resort but without highlighting neither triggering an event', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const serviceAddSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const resortSpy = jest.spyOn(dataviewStub, 'reSort');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItems(mockItem, false, true, false);

      expect(serviceAddSpy).toHaveBeenCalled();
      expect(resortSpy).toHaveBeenCalled();
      expect(serviceAddSpy).toHaveBeenCalledWith(mockItem, false, true, false);
      expect(serviceHighlightSpy).not.toHaveBeenCalled();
      expect(rxSpy).not.toHaveBeenCalled();
    });

    it('should add a single item by calling "addItems" method and expect to call a grid resort & highlight but without triggering an event', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      const serviceAddSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const resortSpy = jest.spyOn(dataviewStub, 'reSort');
      const getRowByIdSpy = jest.spyOn(dataviewStub, 'getRowById');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItems(mockItems, true, true, false);

      expect(serviceAddSpy).toHaveBeenCalled();
      expect(resortSpy).toHaveBeenCalled();
      expect(serviceAddSpy).toHaveBeenNthCalledWith(1, mockItems[0], false, false, false);
      expect(serviceAddSpy).toHaveBeenNthCalledWith(2, mockItems[1], false, false, false);
      expect(serviceHighlightSpy).toHaveBeenCalledTimes(1);
      expect(getRowByIdSpy).toHaveBeenCalledTimes(2);
      expect(rxSpy).not.toHaveBeenCalled();
    });
  });

  describe('deleteItem methods', () => {
    it('should throw an error when calling "deleteItem" method and 1st argument for the item object is missing or "id" is missing', () => {
      expect(() => service.deleteItem(null)).toThrowError('Deleting an item requires the item to include an "id" property');
      expect(() => service.deleteItem({ user: 'John' })).toThrowError('Deleting an item requires the item to include an "id" property');
    });

    it('should throw an error when calling "deleteItemById" without a valid "id" as argument', () => {
      expect(() => service.deleteItemById(null)).toThrowError('Cannot delete a row without a valid "id"');
      expect(() => service.deleteItemById(undefined)).toThrowError('Cannot delete a row without a valid "id"');
    });

    it('should expect the service to call "deleteItemById" method when calling "deleteItem" with an item', () => {
      const mockItem = { id: 4, user: { firstName: 'John', lastName: 'Doe' } };
      const deleteByIdSpy = jest.spyOn(service, 'deleteItemById');

      const output = service.deleteItem(mockItem);

      expect(output).toEqual(4);
      expect(deleteByIdSpy).toHaveBeenCalled();
    });

    it('should expect the service to call the DataView "deleteItem" when calling "deleteItem" with an item', () => {
      const mockItem = { id: 4, user: { firstName: 'John', lastName: 'Doe' } };
      const deleteSpy = jest.spyOn(dataviewStub, 'deleteItem');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItemById(mockItem.id);

      expect(output).toEqual(4);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(mockItem.id);
      expect(rxSpy).toHaveBeenCalledWith(mockItem.id);
    });

    it('should remove any row selection when the grid option "enableCheckboxSelector" is enabled', () => {
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableCheckboxSelector: true } as GridOption);
      const mockItem = { id: 4, user: { firstName: 'John', lastName: 'Doe' } };
      const selectionSpy = jest.spyOn(gridStub, 'setSelectedRows');

      service.deleteItemById(mockItem.id);

      expect(selectionSpy).toHaveBeenCalledWith([]);
    });

    it('should remove any row selection when the grid option "enableRowSelection" is enabled', () => {
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableRowSelection: true } as GridOption);
      const mockItem = { id: 4, user: { firstName: 'John', lastName: 'Doe' } };
      const selectionSpy = jest.spyOn(gridStub, 'setSelectedRows');

      service.deleteItemById(mockItem.id);

      expect(selectionSpy).toHaveBeenCalledWith([]);
    });

    it('should expect the service to call the "deleteItem" multiple times when calling "deleteItems" with an array of items', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItem');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItems(mockItems);

      expect(output).toEqual([0, 5]);
      expect(serviceDeleteSpy).toHaveBeenCalledTimes(2);
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(1, mockItems[0], false);
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(2, mockItems[1], false);
      expect(rxSpy).toHaveBeenCalledWith(mockItems);
    });

    it('should expect the service to call the "deleteItem" when calling "deleteItems" with a single item which is not an array', () => {
      const mockItem = { id: 4, user: { firstName: 'John', lastName: 'Doe' } };
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItem');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItems(mockItem);

      expect(output).toEqual([4]);
      expect(serviceDeleteSpy).toHaveBeenCalledTimes(1);
      expect(serviceDeleteSpy).toHaveBeenCalledWith(mockItem, true);
      expect(rxSpy).toHaveBeenCalledWith(mockItem.id);
    });

    it('should delete a single item by calling "deleteItems" method without triggering an event', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItem');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItems(mockItem, false);

      expect(output).toEqual([0]);
      expect(serviceDeleteSpy).toHaveBeenCalled();
      expect(serviceDeleteSpy).toHaveBeenCalledWith(mockItem, false);
      expect(rxSpy).not.toHaveBeenCalled();
    });

    it('should delete a single item by calling "deleteItems" method and expect to trigger a single an event', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItem');
      const dataviewDeleteSpy = jest.spyOn(dataviewStub, 'deleteItem');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItems(mockItems, true);

      expect(output).toEqual([0, 5]);
      expect(serviceDeleteSpy).toHaveBeenCalled();
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(1, mockItems[0], false);
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(2, mockItems[1], false);
      expect(dataviewDeleteSpy).toHaveBeenCalledTimes(2);
      expect(rxSpy).toHaveBeenCalledTimes(1);
    });

    it('should delete a single item by calling "deleteItemByIds" method without triggering an event', () => {
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItemById');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItemByIds([3], false);

      expect(output).toEqual([3]);
      expect(serviceDeleteSpy).toHaveBeenCalled();
      expect(serviceDeleteSpy).toHaveBeenCalledWith(3, false);
      expect(rxSpy).not.toHaveBeenCalled();
    });

    it('should delete a single item by calling "deleteItemByIds" method and expect to trigger a single an event', () => {
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItemById');
      const dataviewDeleteSpy = jest.spyOn(dataviewStub, 'deleteItem');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItemByIds([0, 5], true);

      expect(output).toEqual([0, 5]);
      expect(serviceDeleteSpy).toHaveBeenCalled();
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(1, 0, false);
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(2, 5, false);
      expect(dataviewDeleteSpy).toHaveBeenCalledTimes(2);
      expect(rxSpy).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when argument is not an array of IDs to delete', () => {
      // @ts-ignore:2345
      const output = service.deleteItemByIds(5, true);
      expect(output).toEqual([]);
    });
  });

  describe('deprecated methods', () => {
    it('should call "addItem" when "addItemToDatagrid" is originally called', () => {
      const mockItem = { id: 0 };
      const spy = jest.spyOn(service, 'addItem');
      service.addItemToDatagrid(mockItem);
      expect(spy).toHaveBeenCalled();
    });

    it('should call "addItem" when "addItemsToDatagrid" is originally called', () => {
      const mockItems = [{ id: 0 }];
      const spy = jest.spyOn(service, 'addItems');
      service.addItemsToDatagrid(mockItems);
      expect(spy).toHaveBeenCalled();
    });

    it('should call "updateItem" when "updateDataGridItem" is originally called', () => {
      const mockItem = { id: 0 };
      const spy = jest.spyOn(service, 'updateItem');
      jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(mockItem.id);
      jest.spyOn(dataviewStub, 'getIdxById').mockReturnValue(mockItem.id);

      service.updateDataGridItem(mockItem);

      expect(spy).toHaveBeenCalled();
    });

    it('should call "updateItems" when "updateDataGridItems" is originally called', () => {
      const mockItem = { id: 0 };
      const spy = jest.spyOn(service, 'updateItems');
      jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(mockItem.id);
      jest.spyOn(dataviewStub, 'getIdxById').mockReturnValue(mockItem.id);

      service.updateDataGridItems([mockItem]);

      expect(spy).toHaveBeenCalled();
    });

    it('should call "updateItemById" when "updateDataGridItemById" is originally called', () => {
      const mockItem = { id: 0 };
      const spy = jest.spyOn(service, 'updateItemById');
      jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(mockItem.id);
      jest.spyOn(dataviewStub, 'getIdxById').mockReturnValue(mockItem.id);

      service.updateDataGridItemById(0, mockItem);

      expect(spy).toHaveBeenCalled();
    });

    it('should call "deleteItem" when "deleteDataGridItem" is originally called', () => {
      const spy = jest.spyOn(service, 'deleteItem');
      service.deleteDataGridItem({ id: 0 });
      expect(spy).toHaveBeenCalled();
    });

    it('should call "deleteItems" when "deleteDataGridItems" is originally called', () => {
      const spy = jest.spyOn(service, 'deleteItems');
      service.deleteDataGridItems([{ id: 0 }]);
      expect(spy).toHaveBeenCalled();
    });

    it('should call "deleteItemById" when "deleteDataGridItemById" is originally called', () => {
      const spy = jest.spyOn(service, 'deleteItemById');
      service.deleteDataGridItemById(5);
      expect(spy).toHaveBeenCalled();
    });

    it('should call "deleteItemByIds" when "deleteDataGridItemByIds" is originally called', () => {
      const spy = jest.spyOn(service, 'deleteItemByIds');
      service.deleteDataGridItemByIds([5]);
      expect(spy).toHaveBeenCalled();
    });
  });
});
