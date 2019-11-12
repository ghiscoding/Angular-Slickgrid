import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { GridService, ExtensionService, FilterService, GridStateService, SortService } from '..';
import { CellArgs, Column, OnEventArgs, GridOption } from './../../models';

declare var Slick: any;

const mockSelectionModel = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn()
}));

jest.mock('slickgrid/plugins/slick.rowselectionmodel', () => mockSelectionModel);
Slick.RowSelectionModel = mockSelectionModel;

const extensionServiceStub = {
  getAllColumns: jest.fn(),
} as unknown as ExtensionService;

const filterServiceStub = {
  clearFilters: jest.fn(),
} as unknown as FilterService;

const gridStateServiceStub = {
  resetColumns: jest.fn(),
} as unknown as GridStateService;

const sortServiceStub = {
  clearSorting: jest.fn(),
} as unknown as SortService;

const dataviewStub = {
  addItem: jest.fn(),
  deleteItem: jest.fn(),
  getIdxById: jest.fn(),
  getItem: jest.fn(),
  getRowById: jest.fn(),
  insertItem: jest.fn(),
  reSort: jest.fn(),
  updateItem: jest.fn(),
};

const gridStub = {
  autosizeColumns: jest.fn(),
  insertItem: jest.fn(),
  invalidate: jest.fn(),
  getDataItem: jest.fn(),
  getOptions: jest.fn(),
  getColumns: jest.fn(),
  getSelectionModel: jest.fn(),
  setSelectionModel: jest.fn(),
  getSelectedRows: jest.fn(),
  navigateBottom: jest.fn(),
  navigateTop: jest.fn(),
  render: jest.fn(),
  setColumns: jest.fn(),
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
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should throw an error when 1st argument for the item object is missing', () => {
      expect(() => service.upsertItem(null)).toThrowError('Calling Upsert of an item requires the item to include an "id" property');
    });

    it('should expect the service to call the "addItem" when calling "upsertItem" with the item not being found in the grid', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(undefined);
      const serviceSpy = jest.spyOn(service, 'addItem');
      const rxSpy = jest.spyOn(service.onItemUpserted, 'next');

      const upsertRow = service.upsertItem(mockItem);

      expect(upsertRow).toEqual({ added: 0, updated: undefined });
      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(dataviewSpy).toHaveBeenCalledWith(0);
      expect(serviceSpy).toHaveBeenCalledWith(mockItem, { highlightRow: true, position: 'top', resortGrid: false, selectRow: false, triggerEvent: true });
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the service to call the DataView "addItem" when calling "upsertItem" with an item and the option "position" set to "bottom"', () => {
      const expectationNewRowPosition = 1000;
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      jest.spyOn(dataviewStub, 'getRowById').mockReturnValueOnce(undefined).mockReturnValueOnce(expectationNewRowPosition);
      const addSpy = jest.spyOn(dataviewStub, 'addItem');
      const scrollSpy = jest.spyOn(gridStub, 'scrollRowIntoView');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      const upsertRow = service.upsertItem(mockItem, { position: 'bottom' });

      expect(upsertRow).toEqual({ added: 1000, updated: undefined });
      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(mockItem);
      expect(scrollSpy).toHaveBeenCalledWith(expectationNewRowPosition);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the service to call the "updateItem" multiple times when calling "upsertItems" with the items found in the grid', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(1);
      const serviceUpsertSpy = jest.spyOn(service, 'upsertItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxUpsertSpy = jest.spyOn(service.onItemUpserted, 'next');
      const rxAddedSpy = jest.spyOn(service.onItemAdded, 'next');
      const rxUpdatedSpy = jest.spyOn(service.onItemUpdated, 'next');

      const upsertRows = service.upsertItems(mockItems);

      expect(upsertRows).toEqual([{ added: undefined, updated: 0 }, { added: undefined, updated: 1 }]);
      expect(dataviewSpy).toHaveBeenCalledTimes(4); // called 4x times, 2x by the upsert itself and 2x by the updateItem
      expect(serviceUpsertSpy).toHaveBeenCalledTimes(2);
      expect(serviceUpsertSpy).toHaveBeenNthCalledWith(1, mockItems[0], { highlightRow: false, position: 'top', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceUpsertSpy).toHaveBeenNthCalledWith(2, mockItems[1], { highlightRow: false, position: 'top', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceHighlightSpy).toHaveBeenCalledWith([0, 1]);
      expect(rxUpsertSpy).toHaveBeenCalledWith(mockItems);
      expect(rxAddedSpy).toHaveBeenCalledTimes(0);
      expect(rxUpdatedSpy).toHaveBeenCalledTimes(1);
      expect(rxUpdatedSpy).toHaveBeenCalledWith([{ added: undefined, updated: 0 }, { added: undefined, updated: 1 }]);
    });

    it('should expect the service to call both "addItem" and "updateItem" when calling "upsertItems" with first item found but second not found', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableAutoResize: true, enableRowSelection: true } as GridOption);
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(undefined).mockReturnValueOnce(undefined).mockReturnValueOnce(15).mockReturnValueOnce(15);
      const serviceUpsertSpy = jest.spyOn(service, 'upsertItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxUpsertSpy = jest.spyOn(service.onItemUpserted, 'next');
      const rxAddedSpy = jest.spyOn(service.onItemAdded, 'next');
      const rxUpdatedSpy = jest.spyOn(service.onItemUpdated, 'next');
      const selectSpy = jest.spyOn(service, 'setSelectedRows');

      const upsertRows = service.upsertItems(mockItems, { selectRow: true });

      expect(upsertRows).toEqual([{ added: 0, updated: undefined }, { added: undefined, updated: 15 }]);
      expect(dataviewSpy).toHaveBeenCalledTimes(3); // called 4x times, 2x by the upsert itself and 2x by the updateItem
      expect(serviceUpsertSpy).toHaveBeenCalledTimes(2);
      expect(serviceUpsertSpy).toHaveBeenNthCalledWith(1, mockItems[0], { highlightRow: false, position: 'top', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceUpsertSpy).toHaveBeenNthCalledWith(2, mockItems[1], { highlightRow: false, position: 'top', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceHighlightSpy).toHaveBeenCalledWith([0, 15]);
      expect(rxUpsertSpy).toHaveBeenCalledWith(mockItems);
      expect(rxAddedSpy).toHaveBeenCalledTimes(1);
      expect(rxUpdatedSpy).toHaveBeenCalledTimes(1);
      expect(rxAddedSpy).toHaveBeenCalledWith([{ added: 0, updated: undefined }]);
      expect(rxUpdatedSpy).toHaveBeenCalledWith([{ added: undefined, updated: 15 }]);
      expect(selectSpy).toHaveBeenCalledWith([0, 15]);
    });

    it('should expect the service to call the "upsertItem" when calling "upsertItems" with a single item object and without triggering an event', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(1);
      const serviceUpsertSpy = jest.spyOn(service, 'upsertItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxUpsertSpy = jest.spyOn(service.onItemUpserted, 'next');
      const rxAddedSpy = jest.spyOn(service.onItemAdded, 'next');
      const rxUpdatedSpy = jest.spyOn(service.onItemUpdated, 'next');
      const selectSpy = jest.spyOn(service, 'setSelectedRow');

      const upsertRows = service.upsertItems(mockItem, { highlightRow: false, resortGrid: true, selectRow: false, triggerEvent: false });

      expect(upsertRows).toEqual([{ added: undefined, updated: 0 }]);
      expect(dataviewSpy).toHaveBeenCalledTimes(2);
      expect(serviceUpsertSpy).toHaveBeenCalledTimes(1);
      expect(serviceUpsertSpy).toHaveBeenCalledWith(mockItem, { highlightRow: false, position: 'top', resortGrid: true, selectRow: false, triggerEvent: false });
      expect(serviceHighlightSpy).not.toHaveBeenCalled();
      expect(rxUpsertSpy).not.toHaveBeenCalled();
      expect(rxAddedSpy).toHaveBeenCalledTimes(0);
      expect(rxUpdatedSpy).toHaveBeenCalledTimes(0);
      expect(selectSpy).not.toHaveBeenCalled();
    });

    it('should expect the row to be selected when calling "upsertItems" with an item when setting the "selecRow" flag and the grid option "enableRowSelection" is set', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableAutoResize: true, enableRowSelection: true } as GridOption);
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById');
      const serviceUpsertSpy = jest.spyOn(service, 'upsertItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const selectSpy = jest.spyOn(service, 'setSelectedRows');
      service.upsertItems([mockItem], { selectRow: true });

      expect(dataviewSpy).toHaveBeenCalledTimes(2);
      expect(serviceUpsertSpy).toHaveBeenCalledTimes(1);
      expect(serviceUpsertSpy).toHaveBeenCalledWith(mockItem, { highlightRow: false, position: 'top', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceHighlightSpy).toHaveBeenCalled();
      expect(selectSpy).toHaveBeenCalledWith([1]);
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
      expect(serviceAddItemSpy).toHaveBeenCalledWith(mockItem, { highlightRow: true, position: 'top', resortGrid: false, selectRow: false, triggerEvent: true });
      expect(serviceHighlightSpy).toHaveBeenCalledWith(0);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should call the "upsertItemById" method and expect it to call the "addItem" with different boolean flags provided as arguments', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(undefined);
      const serviceAddItemSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItemById(0, mockItem, { highlightRow: false, resortGrid: true, selectRow: true, triggerEvent: false });

      expect(dataviewSpy).toHaveBeenCalledWith(0);
      expect(serviceAddItemSpy).toHaveBeenCalled();
      expect(serviceAddItemSpy).toHaveBeenCalledWith(mockItem, { highlightRow: false, position: 'top', resortGrid: true, selectRow: true, triggerEvent: false });
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
      expect(serviceUpdateSpy).toHaveBeenCalledWith(mockItem, { highlightRow: true, selectRow: false, triggerEvent: true });
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
      expect(updateSpy).toHaveBeenCalledWith(mockItem.id, mockItem, { highlightRow: true, selectRow: false, scrollRowIntoView: false, triggerEvent: true });
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the service to call the "updateItemById" when calling "updateItem" and setting the "selecRow" flag and the grid option "enableRowSelection" is set', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const getRowIdSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(mockItem.id);
      const getRowIndexSpy = jest.spyOn(dataviewStub, 'getIdxById').mockReturnValue(mockItem.id);
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpdated, 'next');

      service.updateItemById(0, mockItem, { selectRow: true });

      expect(getRowIdSpy).toHaveBeenCalledWith(0);
      expect(getRowIndexSpy).toHaveBeenCalledWith(0);
      expect(serviceHighlightSpy).toHaveBeenCalledWith(0);
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
      expect(serviceUpdateSpy).toHaveBeenNthCalledWith(1, mockItems[0].id, mockItems[0], { highlightRow: false, selectRow: false, scrollRowIntoView: false, triggerEvent: false });
      expect(serviceUpdateSpy).toHaveBeenNthCalledWith(2, mockItems[1].id, mockItems[1], { highlightRow: false, selectRow: false, scrollRowIntoView: false, triggerEvent: false });
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

      service.updateItems(mockItem, { highlightRow: false, selectRow: false, triggerEvent: true });

      expect(getRowIdSpy).toHaveBeenCalledTimes(1);
      expect(getRowIndexSpy).toHaveBeenCalledTimes(1);
      expect(serviceUpdateSpy).toHaveBeenCalledTimes(1);
      expect(serviceUpdateSpy).toHaveBeenCalledWith(mockItem, { highlightRow: false, selectRow: false, scrollRowIntoView: false, triggerEvent: true });
      expect(serviceHighlightSpy).not.toHaveBeenCalled();
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the row to be selected when calling "updateItems" with an item when setting the "selecRow" flag and the grid option "enableRowSelection" is set', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableAutoResize: true, enableRowSelection: true } as GridOption);
      const updateSpy = jest.spyOn(service, 'updateItem');
      const selectSpy = jest.spyOn(service, 'setSelectedRows');
      const rxSpy = jest.spyOn(service.onItemUpdated, 'next');

      service.updateItems([mockItem], { selectRow: true });

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith(mockItem, { highlightRow: false, selectRow: false, scrollRowIntoView: false, triggerEvent: false });
      expect(selectSpy).toHaveBeenCalledWith([0]);
      expect(rxSpy).toHaveBeenCalledWith([mockItem]);
    });

    it('should call the "updateItem" method and expect it to call the "updateItemById" with different boolean flags provided as arguments', () => {
      const mockItemId = 72;
      const mockRowNumber = 8;
      const mockItem = { id: mockItemId, user: { firstName: 'John', lastName: 'Doe' } };
      const getRowIdSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(mockRowNumber);
      const getRowIndexSpy = jest.spyOn(dataviewStub, 'getIdxById').mockReturnValue(mockRowNumber);
      const scrollSpy = jest.spyOn(gridStub, 'scrollRowIntoView');
      const updateByIdSpy = jest.spyOn(service, 'updateItemById');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemUpdated, 'next');

      service.updateItem(mockItem, { highlightRow: false, selectRow: true, scrollRowIntoView: true, triggerEvent: true });

      expect(getRowIdSpy).toHaveBeenCalledWith(mockItemId);
      expect(getRowIndexSpy).toHaveBeenCalledWith(mockItemId);
      expect(scrollSpy).toHaveBeenCalledWith(mockRowNumber);
      expect(updateByIdSpy).toHaveBeenCalled();
      expect(updateByIdSpy).toHaveBeenCalledWith(mockItem.id, mockItem, { highlightRow: false, selectRow: true, scrollRowIntoView: true, triggerEvent: true });
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
      const scrollSpy = jest.spyOn(gridStub, 'scrollRowIntoView');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItem(mockItem);

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(0, mockItem);
      expect(scrollSpy).toHaveBeenCalledWith(0);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the row to be selected when calling "addItem" with an item when setting the "selecRow" flag and the grid option "enableRowSelection" is set', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0);
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableAutoResize: true, enableRowSelection: true } as GridOption);
      const addSpy = jest.spyOn(dataviewStub, 'insertItem');
      const selectSpy = jest.spyOn(gridStub, 'setSelectedRows');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItem(mockItem, { selectRow: true });

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(0, mockItem);
      expect(selectSpy).toHaveBeenCalledWith([0]);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the service to call the DataView "addItem" when calling "addItem" with an item and the option "position" set to "bottom"', () => {
      const expectationNewRowPosition = 1000;
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(expectationNewRowPosition);
      const addSpy = jest.spyOn(dataviewStub, 'addItem');
      const scrollSpy = jest.spyOn(gridStub, 'scrollRowIntoView');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItem(mockItem, { position: 'bottom' });

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(mockItem);
      expect(scrollSpy).toHaveBeenCalledWith(expectationNewRowPosition);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the service to call the "addItem" multiple times when calling "addItems" with an array of items', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(1);
      const serviceAddSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItems(mockItems);

      expect(serviceAddSpy).toHaveBeenCalledTimes(2);
      expect(serviceAddSpy).toHaveBeenNthCalledWith(1, mockItems[0], { highlightRow: false, position: 'top', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceAddSpy).toHaveBeenNthCalledWith(2, mockItems[1], { highlightRow: false, position: 'top', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceHighlightSpy).toHaveBeenCalledTimes(1);
      expect(serviceHighlightSpy).toHaveBeenCalledWith([0, 1]);
      expect(rxSpy).toHaveBeenCalledWith(mockItems);
    });

    it('should expect the service to call the "addItem" multiple times when calling "addItems" with an array of items and the option "position" set to "bottom"', () => {
      const expectationNewRowPosition1 = 1000;
      const expectationNewRowPosition2 = 1001;
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      jest.spyOn(dataviewStub, 'getRowById')
        .mockReturnValueOnce(expectationNewRowPosition1).mockReturnValueOnce(expectationNewRowPosition1)
        .mockReturnValueOnce(expectationNewRowPosition2).mockReturnValueOnce(expectationNewRowPosition2);
      const serviceAddSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItems(mockItems, { position: 'bottom' });

      expect(serviceAddSpy).toHaveBeenCalledTimes(2);
      expect(serviceAddSpy).toHaveBeenNthCalledWith(1, mockItems[0], { highlightRow: false, position: 'bottom', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceAddSpy).toHaveBeenNthCalledWith(2, mockItems[1], { highlightRow: false, position: 'bottom', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceHighlightSpy).toHaveBeenCalledTimes(1);
      expect(serviceHighlightSpy).toHaveBeenCalledWith([expectationNewRowPosition1, expectationNewRowPosition2]);
      expect(rxSpy).toHaveBeenCalledWith(mockItems);
    });

    it('should expect the service to call the "addItem" when calling "addItems" with a single item which is not an array', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const serviceAddSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItems(mockItem);

      expect(serviceAddSpy).toHaveBeenCalledTimes(1);
      expect(serviceAddSpy).toHaveBeenCalledWith(mockItem, { highlightRow: true, position: 'top', selectRow: false, resortGrid: false, triggerEvent: true });
      expect(serviceHighlightSpy).toHaveBeenCalledTimes(1);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should add a single item by calling "addItems" method and expect to call a grid resort but without highlighting neither triggering an event', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const serviceAddSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const resortSpy = jest.spyOn(dataviewStub, 'reSort');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItems(mockItem, { highlightRow: false, selectRow: false, resortGrid: true, triggerEvent: false });

      expect(serviceAddSpy).toHaveBeenCalled();
      expect(resortSpy).toHaveBeenCalled();
      expect(serviceAddSpy).toHaveBeenCalledWith(mockItem, { highlightRow: false, position: 'top', resortGrid: true, selectRow: false, triggerEvent: false });
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

      service.addItems(mockItems, { highlightRow: true, selectRow: false, resortGrid: true, triggerEvent: false });

      expect(serviceAddSpy).toHaveBeenCalled();
      expect(resortSpy).toHaveBeenCalled();
      expect(serviceAddSpy).toHaveBeenNthCalledWith(1, mockItems[0], { highlightRow: false, position: 'top', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceAddSpy).toHaveBeenNthCalledWith(2, mockItems[1], { highlightRow: false, position: 'top', resortGrid: false, selectRow: false, triggerEvent: false });
      expect(serviceHighlightSpy).toHaveBeenCalledTimes(1);
      expect(getRowByIdSpy).toHaveBeenCalledTimes(2);
      expect(rxSpy).not.toHaveBeenCalled();
    });

    it('should expect the row to be selected when calling "addItems" with an item when setting the "selecRow" flag and the grid option "enableRowSelection" is set', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0);
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableAutoResize: true, enableRowSelection: true } as GridOption);
      const addSpy = jest.spyOn(dataviewStub, 'insertItem');
      const selectSpy = jest.spyOn(service, 'setSelectedRows');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItems([mockItem], { selectRow: true });

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(0, mockItem);
      expect(selectSpy).toHaveBeenCalledWith([0]);
      expect(rxSpy).toHaveBeenCalledWith([mockItem]);
    });

    it('should expect the row to be selected when calling "addItems" with an item wich is not an array when setting the "selecRow" flag and the grid option "enableRowSelection" is set', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0);
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({
        enableRowSelection: true,
        selectRow: true
      } as GridOption);
      const addSpy = jest.spyOn(dataviewStub, 'insertItem');
      const selectSpy = jest.spyOn(service, 'setSelectedRow');
      const rxSpy = jest.spyOn(service.onItemAdded, 'next');

      service.addItems(mockItem, { selectRow: true });

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(0, mockItem);
      expect(selectSpy).toHaveBeenCalledWith(0);
      expect(rxSpy).toHaveBeenCalledWith(mockItem);
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
      const selectionSpy = jest.spyOn(service, 'setSelectedRows');

      service.deleteItemById(mockItem.id);

      expect(selectionSpy).toHaveBeenCalledWith([]);
    });

    it('should remove any row selection when the grid option "enableRowSelection" is enabled', () => {
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableRowSelection: true } as GridOption);
      const mockItem = { id: 4, user: { firstName: 'John', lastName: 'Doe' } };
      const selectionSpy = jest.spyOn(service, 'setSelectedRows');

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
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(1, mockItems[0], { triggerEvent: false });
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(2, mockItems[1], { triggerEvent: false });
      expect(rxSpy).toHaveBeenCalledWith(mockItems);
    });

    it('should expect the service to call the "deleteItem" when calling "deleteItems" with a single item which is not an array', () => {
      const mockItem = { id: 4, user: { firstName: 'John', lastName: 'Doe' } };
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItem');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItems(mockItem);

      expect(output).toEqual([4]);
      expect(serviceDeleteSpy).toHaveBeenCalledTimes(1);
      expect(serviceDeleteSpy).toHaveBeenCalledWith(mockItem, { triggerEvent: true });
      expect(rxSpy).toHaveBeenCalledWith(mockItem.id);
    });

    it('should delete a single item by calling "deleteItems" method without triggering an event', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItem');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItems(mockItem, { triggerEvent: false });

      expect(output).toEqual([0]);
      expect(serviceDeleteSpy).toHaveBeenCalled();
      expect(serviceDeleteSpy).toHaveBeenCalledWith(mockItem, { triggerEvent: false });
      expect(rxSpy).not.toHaveBeenCalled();
    });

    it('should delete a single item by calling "deleteItems" method and expect to trigger a single an event', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItem');
      const dataviewDeleteSpy = jest.spyOn(dataviewStub, 'deleteItem');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItems(mockItems, { triggerEvent: true });

      expect(output).toEqual([0, 5]);
      expect(serviceDeleteSpy).toHaveBeenCalled();
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(1, mockItems[0], { triggerEvent: false });
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(2, mockItems[1], { triggerEvent: false });
      expect(dataviewDeleteSpy).toHaveBeenCalledTimes(2);
      expect(rxSpy).toHaveBeenCalledTimes(1);
    });

    it('should delete a single item by calling "deleteItemByIds" method without triggering an event', () => {
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItemById');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItemByIds([3], { triggerEvent: false });

      expect(output).toEqual([3]);
      expect(serviceDeleteSpy).toHaveBeenCalled();
      expect(serviceDeleteSpy).toHaveBeenCalledWith(3, { triggerEvent: false });
      expect(rxSpy).not.toHaveBeenCalled();
    });

    it('should delete a single item by calling "deleteItemByIds" method and expect to trigger a single an event', () => {
      const serviceDeleteSpy = jest.spyOn(service, 'deleteItemById');
      const dataviewDeleteSpy = jest.spyOn(dataviewStub, 'deleteItem');
      const rxSpy = jest.spyOn(service.onItemDeleted, 'next');

      const output = service.deleteItemByIds([0, 5], { triggerEvent: true });

      expect(output).toEqual([0, 5]);
      expect(serviceDeleteSpy).toHaveBeenCalled();
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(1, 0, { triggerEvent: false });
      expect(serviceDeleteSpy).toHaveBeenNthCalledWith(2, 5, { triggerEvent: false });
      expect(dataviewDeleteSpy).toHaveBeenCalledTimes(2);
      expect(rxSpy).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when argument is not an array of IDs to delete', () => {
      // @ts-ignore:2345
      const output = service.deleteItemByIds(5, { triggerEvent: true });
      expect(output).toEqual([]);
    });
  });

  describe('clearAllFiltersAndSorts method', () => {
    it('should clear sorting & filters via the Sort & Filter Services, while the clear sort is specifically not triggering any sort event', () => {
      const sortSpy = jest.spyOn(sortServiceStub, 'clearSorting');
      const filterSpy = jest.spyOn(filterServiceStub, 'clearFilters');

      service.clearAllFiltersAndSorts();

      expect(sortSpy).toBeCalledWith(false);
      expect(filterSpy).toBeCalledWith();
    });
  });

  describe('getColumnFromEventArguments method', () => {
    it('should throw an error when slickgrid getColumns method is not available', () => {
      gridStub.getColumns = undefined;
      expect(() => service.getColumnFromEventArguments({} as CellArgs))
        .toThrowError('To get the column definition and data, we need to have these arguments passed as objects (row, cell, grid)');

      gridStub.getColumns = jest.fn(); // put it back as a valid mock for later tests
    });

    it('should throw an error when slickgrid getDataItem method is not available', () => {
      gridStub.getDataItem = undefined;
      expect(() => service.getColumnFromEventArguments({} as CellArgs))
        .toThrowError('To get the column definition and data, we need to have these arguments passed as objects (row, cell, grid)');

      gridStub.getDataItem = jest.fn(); // put it back as a valid mock for later tests
    });

    it('should return an object including all extra properties', () => {
      const mockColumns = [{ id: 'field1', width: 100 }, { id: 'field2', width: 150 }, { id: 'field3', field: 'field3' }] as Column[];
      const mockItem = { id: 3, user: { firstName: 'John', lastName: 'Doe' } };
      const args = { row: 3, cell: 1, grid: gridStub } as CellArgs;
      const mockOutput = { row: 3, cell: 1, columnDef: mockColumns[1], dataContext: mockItem, dataView: dataviewStub, grid: gridStub } as OnEventArgs;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
      jest.spyOn(gridStub, 'getDataItem').mockReturnValue(mockItem);

      const output = service.getColumnFromEventArguments(args);

      expect(output).toEqual(mockOutput);
    });
  });

  describe('getDataItemByRowNumber method', () => {
    it('should throw an error when slickgrid "getDataItem" method is not available', () => {
      gridStub.getDataItem = undefined;
      expect(() => service.getDataItemByRowNumber(0)).toThrowError(`We could not find SlickGrid Grid object or it's "getDataItem" method`);
      gridStub.getDataItem = jest.fn(); // put it back as a valid mock for later tests
    });

    it('should call the grid "getDataItem" method and return that output', () => {
      const rowNumber = 2;
      const mockItem = { id: 3, user: { firstName: 'John', lastName: 'Doe' } };
      const spy = jest.spyOn(gridStub, 'getDataItem').mockReturnValue(mockItem);

      const output = service.getDataItemByRowNumber(rowNumber);

      expect(spy).toHaveBeenCalledWith(rowNumber);
      expect(output).toEqual(mockItem);
    });
  });

  describe('getItemRowMetadataToHighlight method', () => {
    const options = { groupItemMetadataProvider: { getGroupRowMetadata: jest.fn(), getTotalsRowMetadata: jest.fn() } };
    const columnDefinitions = [
      { id: 'field1', width: 100, __group: {}, __groupTotals: {} },
      { id: 'field2', width: 150, rowClass: 'red' },
      { id: 'field3', field: 'field3', cssClasses: 'highlight', _dirty: true }
    ];

    // this mock is a typical callback function returned by SlickGrid internally, without anything changed to it's logic
    const mockItemMetadataFn = (i: number) => {
      const columnDef = columnDefinitions[i];
      if (columnDef === undefined) {
        return null;
      }
      if (columnDef.__group) { // overrides for grouping rows
        return options.groupItemMetadataProvider.getGroupRowMetadata(columnDef);
      }
      if (columnDef.__groupTotals) { // overrides for totals rows
        return options.groupItemMetadataProvider.getTotalsRowMetadata(columnDef);
      }
      return null;
    };

    it('should return a callback function when method is called', () => {
      const callback = service.getItemRowMetadataToHighlight(mockItemMetadataFn);
      expect(typeof callback === 'function').toBe(true);
    });

    it('should return an Item Metadata object with empty "cssClasses" property after executing the callback function', () => {
      const rowNumber = 0;
      const dataviewSpy = jest.spyOn(dataviewStub, 'getItem').mockReturnValue(columnDefinitions[rowNumber]);

      const callback = service.getItemRowMetadataToHighlight(mockItemMetadataFn);
      const output = callback(rowNumber); // execute callback with a row number

      expect(dataviewSpy).toHaveBeenCalled();
      expect(typeof callback === 'function').toBe(true);
      expect(output).toEqual({ cssClasses: '' });
    });

    it('should return an Item Metadata object with a "dirty" string in the "cssClasses" property after executing the callback function', () => {
      const rowNumber = 2;
      const dataviewSpy = jest.spyOn(dataviewStub, 'getItem').mockReturnValue(columnDefinitions[rowNumber]);

      const callback = service.getItemRowMetadataToHighlight(mockItemMetadataFn);
      const output = callback(rowNumber); // execute callback with a row number

      expect(dataviewSpy).toHaveBeenCalled();
      expect(typeof callback === 'function').toBe(true);
      expect(output).toEqual({ cssClasses: ' dirty' });
    });

    it('should return an Item Metadata object with filled "cssClasses" property when callback provided already returns a "cssClasses" property', () => {
      const rowNumber = 2;
      const dataviewSpy = jest.spyOn(dataviewStub, 'getItem').mockReturnValue(columnDefinitions[rowNumber]);

      const callback = service.getItemRowMetadataToHighlight(() => {
        return { cssClasses: 'highlight' };
      });
      const output = callback(rowNumber); // execute callback with a row number

      expect(dataviewSpy).toHaveBeenCalled();
      expect(typeof callback === 'function').toBe(true);
      expect(output).toEqual({ cssClasses: 'highlight dirty' });
    });

    it(`should return an Item Metadata object with filled "cssClasses" property including a row number in the string
    when the column definition has a "rowClass" property and when callback provided already returns a "cssClasses" property`, () => {
      const rowNumber = 1;
      const dataviewSpy = jest.spyOn(dataviewStub, 'getItem').mockReturnValue(columnDefinitions[rowNumber]);

      const callback = service.getItemRowMetadataToHighlight(mockItemMetadataFn);
      const output = callback(rowNumber); // execute callback with a row number

      expect(dataviewSpy).toHaveBeenCalled();
      expect(typeof callback === 'function').toBe(true);
      expect(output).toEqual({ cssClasses: ' red row1' });
    });
  });

  describe('highlightRowByMetadata method', () => {
    it('should hightlight a row with a fading start & end delay', (done) => {
      const mockColumn = { id: 'field2', field: 'field2', width: 150, rowClass: 'red' } as Column;
      const getItemSpy = jest.spyOn(dataviewStub, 'getItem').mockReturnValue(mockColumn);
      const getIndexSpy = jest.spyOn(dataviewStub, 'getIdxById').mockReturnValue(0);
      const updateSpy = jest.spyOn(dataviewStub, 'updateItem');
      const renderSpy = jest.spyOn(service, 'renderGrid');

      service.highlightRowByMetadata(2, 1, 1);

      setTimeout(() => {
        expect(getItemSpy).toHaveBeenCalledWith(2);
        expect(updateSpy).toHaveBeenCalledTimes(3);
        expect(updateSpy).toHaveBeenCalledWith(mockColumn.id, mockColumn);
        expect(renderSpy).toHaveBeenCalled();
        expect(getIndexSpy).toHaveBeenCalled();
        done();
      }, 5);
    });
  });

  describe('getDataItemByRowIndex method', () => {
    afterEach(() => {
      gridStub.getDataItem = jest.fn(); // put it back as a valid mock for later tests
    });

    it('should throw an error when the grid "getDataItem" method is not available', () => {
      gridStub.getDataItem = undefined;
      expect(() => service.getDataItemByRowIndex(0))
        .toThrowError('We could not find SlickGrid Grid object and/or "getDataItem" method');
    });

    it('should return data item object when method is called', () => {
      const mockColumn = { id: 'field2', field: 'field2', width: 150, rowClass: 'red' } as Column;
      const spy = jest.spyOn(gridStub, 'getDataItem').mockReturnValue(mockColumn);

      const output = service.getDataItemByRowIndex(0);

      expect(spy).toHaveBeenCalled();
      expect(output).toEqual(mockColumn);
    });
  });

  describe('getDataItemByRowIndexes method', () => {
    afterEach(() => {
      gridStub.getDataItem = jest.fn(); // put it back as a valid mock for later tests
    });

    it('should throw an error when the grid "getDataItem" method is not available', () => {
      gridStub.getDataItem = undefined;
      expect(() => service.getDataItemByRowIndexes([0]))
        .toThrowError('We could not find SlickGrid Grid object and/or "getDataItem" method');
    });

    it('should return data item object when method is called', () => {
      const mockColumns = [{ id: 'field1', width: 100 }, { id: 'field2', width: 150 }, { id: 'field3', field: 'field3' }] as Column[];
      const spy = jest.spyOn(gridStub, 'getDataItem').mockReturnValueOnce(mockColumns[0]).mockReturnValueOnce(mockColumns[2]);

      const output = service.getDataItemByRowIndexes([0, 2]);

      expect(spy).toHaveBeenCalled();
      expect(output).toEqual([{ id: 'field1', width: 100 }, { id: 'field3', field: 'field3' }]);
    });
  });

  describe('getSelectedRows method', () => {
    afterEach(() => {
      gridStub.getSelectedRows = jest.fn(); // put it back as a valid mock for later tests
    });

    it('should throw an error when the grid "getSelectedRows" method is not available', () => {
      gridStub.getSelectedRows = undefined;
      expect(() => service.getSelectedRows())
        .toThrowError('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
    });

    it('should return selected row indexes', () => {
      const spy = jest.spyOn(gridStub, 'getSelectedRows').mockReturnValue([0, 1]);
      const output = service.getSelectedRows();

      expect(spy).toHaveBeenCalled();
      expect(output).toEqual([0, 1]);
    });
  });

  describe('getSelectedRowsDataItem method', () => {
    afterEach(() => {
      gridStub.getSelectedRows = jest.fn(); // put it back as a valid mock for later tests
    });

    it('should throw an error when the grid "getSelectedRows" method is not available', () => {
      gridStub.getSelectedRows = undefined;
      expect(() => service.getSelectedRowsDataItem())
        .toThrowError('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
    });

    it('should return selected row indexes', () => {
      const mockColumns = [{ id: 'field1', width: 100 }, { id: 'field2', width: 150 }, { id: 'field3', field: 'field3' }] as Column[];
      const mockSelectedColumns = [{ id: 'field1', width: 100 }, { id: 'field3', field: 'field3' }] as Column[];
      const gridSpy = jest.spyOn(gridStub, 'getSelectedRows').mockReturnValue([0, 2]);
      const serviceSpy = jest.spyOn(service, 'getDataItemByRowIndexes').mockReturnValue(mockSelectedColumns);

      const output = service.getSelectedRowsDataItem();

      expect(gridSpy).toHaveBeenCalled();
      expect(serviceSpy).toHaveBeenCalled();
      expect(output).toEqual(mockSelectedColumns);
    });
  });

  describe('setSelectedRow method', () => {
    it('should select the row with index provided', () => {
      const spy = jest.spyOn(gridStub, 'setSelectedRows');
      service.setSelectedRow(2);
      expect(spy).toHaveBeenCalledWith([2]);
    });
  });

  describe('setSelectedRows method', () => {
    it('should select the row with index provided', () => {
      const spy = jest.spyOn(gridStub, 'setSelectedRows');
      service.setSelectedRows([0, 2, 5]);
      expect(spy).toHaveBeenCalledWith([0, 2, 5]);
    });
  });

  describe('renderGrid method', () => {
    it('should invalidate the grid and call render after', () => {
      const invalidateSpy = jest.spyOn(gridStub, 'invalidate');
      const renderSpy = jest.spyOn(gridStub, 'render');

      service.renderGrid();

      expect(invalidateSpy).toHaveBeenCalled();
      expect(renderSpy).toHaveBeenCalled();
      expect(gridStub.invalidate).toHaveBeenCalledBefore(gridStub.render);
    });
  });

  describe('resetGrid method', () => {
    it('should call a reset and expect a few grid methods to be called', () => {
      const mockColumns = [{ id: 'field1', width: 100 }, { id: 'field2', width: 150 }, { id: 'field3', field: 'field3' }] as Column[];
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableAutoResize: true, enableAutoSizeColumns: true } as GridOption);
      const extensionSpy = jest.spyOn(extensionServiceStub, 'getAllColumns').mockReturnValue(mockColumns);
      const setColSpy = jest.spyOn(gridStub, 'setColumns');
      const autosizeSpy = jest.spyOn(gridStub, 'autosizeColumns');
      const gridStateSpy = jest.spyOn(gridStateServiceStub, 'resetColumns');
      const filterSpy = jest.spyOn(filterServiceStub, 'clearFilters');
      const sortSpy = jest.spyOn(sortServiceStub, 'clearSorting');

      service.resetGrid();

      expect(extensionSpy).toHaveBeenCalled();
      expect(setColSpy).toHaveBeenCalled();
      expect(autosizeSpy).toHaveBeenCalled();
      expect(gridStateSpy).toHaveBeenCalled();
      expect(filterSpy).toHaveBeenCalled();
      expect(sortSpy).toHaveBeenCalled();
    });

    it('should call a reset and expect the grid "resetColumns" method to be called with the column definitions provided to the method', () => {
      const mockColumns = [{ id: 'field1', width: 100 }, { id: 'field2', width: 150 }, { id: 'field3', field: 'field3' }] as Column[];
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableAutoResize: true, enableAutoSizeColumns: true } as GridOption);
      const extensionSpy = jest.spyOn(extensionServiceStub, 'getAllColumns').mockReturnValue(mockColumns);
      const gridStateSpy = jest.spyOn(gridStateServiceStub, 'resetColumns');

      service.resetGrid(mockColumns);

      expect(extensionSpy).toHaveBeenCalled();
      expect(gridStateSpy).toHaveBeenCalledWith(mockColumns);
    });
  });

  // --
  // DEPRECATED methods, to be removed eventually
  // ----------------------

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
