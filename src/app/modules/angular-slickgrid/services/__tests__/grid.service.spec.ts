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
  getIdxById: jest.fn(),
  getItem: jest.fn(),
  getRowById: jest.fn(),
  insertItem: jest.fn(),
  reSort: jest.fn(),
};

const gridStub = {
  getOptions: jest.fn(),
  getColumns: jest.fn(),
  getSelectionModel: jest.fn(),
  setSelectionModel: jest.fn(),
  setSelectedRows: jest.fn(),
  scrollRowIntoView: jest.fn(),
};

describe('Grid Service', () => {
  let service: GridService;
  let translate: TranslateService;
  const gridSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableAutoResize: true } as GridOption);

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

  describe('upsertItem method', () => {
    it('should throw an error when 1st argument for the item object is missing', () => {
      expect(() => service.upsertItem(null)).toThrowError('Calling Upsert of an item requires the item to include an "id" property');
    });

    it('should expect the service to call the "addItem" when calling "upsertItem" with the item not being found in the grid', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(undefined);
      const serviceSpy = jest.spyOn(service, 'addItem');
      const rxOnUpsertSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItem(mockItem);

      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(dataviewSpy).toHaveBeenCalledWith(0);
      expect(serviceSpy).toHaveBeenCalledWith(mockItem, true, false, true);
      expect(rxOnUpsertSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should expect the service to call the "addItem" when calling "upsertItems" with the items not being found in the grid', () => {
      const mockItems = [{ id: 0, user: { firstName: 'John', lastName: 'Doe' } }, { id: 5, user: { firstName: 'Jane', lastName: 'Doe' } }];
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(1);
      const serviceUpsertSpy = jest.spyOn(service, 'upsertItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxOnUpsertSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItems(mockItems);

      expect(dataviewSpy).toHaveBeenCalledTimes(4); // called 4x times, 2x by the upsert itself and 2x by the addItem
      expect(serviceUpsertSpy).toHaveBeenCalledTimes(2);
      expect(serviceUpsertSpy).toHaveBeenNthCalledWith(1, mockItems[0], false, false, false);
      expect(serviceUpsertSpy).toHaveBeenNthCalledWith(2, mockItems[1], false, false, false);
      expect(serviceHighlightSpy).toHaveBeenCalledWith([0, 1]);
      expect(rxOnUpsertSpy).toHaveBeenCalledWith(mockItems);
    });

    it('should expect the service to call the "upsertItem" when calling "upsertItems" with a single item which is not an array', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById');
      const serviceUpsertSpy = jest.spyOn(service, 'upsertItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxOnUpsertSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItems(mockItem, false, true, false);

      expect(dataviewSpy).toHaveBeenCalledTimes(2);
      expect(serviceUpsertSpy).toHaveBeenCalledTimes(1);
      expect(serviceUpsertSpy).toHaveBeenCalledWith(mockItem, false, true, false);
      expect(serviceHighlightSpy).not.toHaveBeenCalled();
      expect(rxOnUpsertSpy).not.toHaveBeenCalled();
    });

    it('should call the "upsertItemById" method and expect it to call the "addItem"', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      expect(() => service.upsertItemById(undefined, mockItem)).toThrowError('Calling Upsert of an item requires the item to include a valid and unique "id" property');
    });

    it('should call the "upsertItemById" method and expect it to call the "addItem" with default boolean flags', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(undefined);
      const serviceAddItemSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxOnUpsertSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItemById(0, mockItem);

      expect(dataviewSpy).toHaveBeenCalledWith(0);
      expect(serviceAddItemSpy).toHaveBeenCalled();
      expect(serviceAddItemSpy).toHaveBeenCalledWith(mockItem, true, false, true);
      expect(serviceHighlightSpy).toHaveBeenCalledWith(0, HIGHLIGHT_TIMEOUT);
      expect(rxOnUpsertSpy).toHaveBeenCalledWith(mockItem);
    });

    it('should call the "upsertItemById" method and expect it to call the "addItem" with different boolean flag provided as arguments', () => {
      const mockItem = { id: 0, user: { firstName: 'John', lastName: 'Doe' } };
      const dataviewSpy = jest.spyOn(dataviewStub, 'getRowById').mockReturnValue(undefined);
      const serviceAddItemSpy = jest.spyOn(service, 'addItem');
      const serviceHighlightSpy = jest.spyOn(service, 'highlightRow');
      const rxOnUpsertSpy = jest.spyOn(service.onItemUpserted, 'next');

      service.upsertItemById(0, mockItem, false, true, false);

      expect(dataviewSpy).toHaveBeenCalledWith(0);
      expect(serviceAddItemSpy).toHaveBeenCalled();
      expect(serviceAddItemSpy).toHaveBeenCalledWith(mockItem, false, true, false);
      expect(serviceHighlightSpy).not.toHaveBeenCalled();
      expect(rxOnUpsertSpy).not.toHaveBeenCalled();
    });
  });
});
