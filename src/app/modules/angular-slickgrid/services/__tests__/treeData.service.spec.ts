import { GridOption, SlickEventHandler, Column } from '../../models/index';
import { SharedService } from '../shared.service';
import { SortService } from '../sort.service';
import { TreeDataService } from '../treeData.service';

declare const Slick: any;

const gridOptionsMock = {
  multiColumnSort: false,
  enableTreeData: true,
  treeDataOptions: {
    columnId: 'file'
  }
} as GridOption;

const dataViewStub = {
  getItem: jest.fn(),
  getItems: jest.fn(),
  refresh: jest.fn(),
  sort: jest.fn(),
  reSort: jest.fn(),
  setItems: jest.fn(),
  updateItem: jest.fn(),
};

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getData: jest.fn(),
  getOptions: () => gridOptionsMock,
  getColumns: jest.fn(),
  getSortColumns: jest.fn(),
  invalidate: jest.fn(),
  onLocalSortChanged: jest.fn(),
  onClick: new Slick.Event(),
  render: jest.fn(),
  setSortColumns: jest.fn(),
};

const sortServiceStub = {
  clearSorting: jest.fn(),
  sortHierarchicalDataset: jest.fn(),
} as unknown as SortService;

describe('SortService', () => {
  let service: TreeDataService;
  let slickgridEventHandler: SlickEventHandler;
  const sharedService = new SharedService();

  beforeEach(() => {
    gridOptionsMock.multiColumnSort = false;
    service = new TreeDataService(sharedService, sortServiceStub);
    slickgridEventHandler = service.eventHandler;
    jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
  });

  afterEach(() => {
    jest.clearAllMocks();
    service.dispose();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error when used with multi-column sorting', (done) => {
    try {
      gridOptionsMock.multiColumnSort = true;
      service.init(gridStub);
    } catch (e) {
      expect(e.toString()).toContain('[Angular-Slickgrid] Tree Data does not currently support multi-column sorting');
      done();
    }
  });

  it('should dispose of the event handler', () => {
    const spy = jest.spyOn(slickgridEventHandler, 'unsubscribeAll');
    service.dispose();
    expect(spy).toHaveBeenCalled();
  });

  it('should return dataset when defined', () => {
    const mockDataset = [{ file: 'documents' }, { file: 'vacation.txt' }];
    const spyGetItem = jest.spyOn(dataViewStub, 'getItems').mockReturnValue(mockDataset);

    service.init(gridStub);
    const output = service.dataset;

    expect(spyGetItem).toHaveBeenCalled();
    expect(output).toEqual(mockDataset);
  });

  it('should return hierarchical dataset when defined', () => {
    const mockHierarchical = [{ file: 'documents', files: [{ file: 'vacation.txt' }] }];
    jest.spyOn(SharedService.prototype, 'hierarchicalDataset', 'get').mockReturnValue(mockHierarchical);
    expect(service.datasetHierarchical).toEqual(mockHierarchical);
  });

  describe('handleOnCellClick method', () => {
    let div: HTMLDivElement;
    let mockColumn: Column;
    let mockRowData: any;

    beforeEach(() => {
      div = document.createElement('div');
      div.innerHTML = `<div class="slick-cell">Text</div>`;
      document.body.appendChild(div);
      mockColumn = { id: 'firstName', field: 'firstName', onCellClick: jest.fn() } as Column;
      mockRowData = { id: 123, firstName: 'John', lastName: 'Doe' };
    });

    it('should not do anything when "cell" property is missing', () => {
      const spyGetCols = jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn]);

      service.init(gridStub);
      const eventData = new Slick.EventData();
      eventData.target = div;
      gridStub.onClick.notify({ cell: undefined, row: undefined }, eventData, gridStub);

      expect(spyGetCols).not.toHaveBeenCalled();
    });

    it('should toggle the "__collapsed" to True when the "toggle" class name was found without a collapsed class', () => {
      jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
      const spyGetItem = jest.spyOn(dataViewStub, 'getItem').mockReturnValue(mockRowData);
      const spyUptItem = jest.spyOn(dataViewStub, 'updateItem');
      const spyInvalidate = jest.spyOn(gridStub, 'invalidate');

      service.init(gridStub);
      const eventData = new Slick.EventData();
      div.className = 'toggle';
      eventData.target = div;
      gridStub.onClick.notify({ cell: 0, row: 0 }, eventData, gridStub);

      expect(spyGetItem).toHaveBeenCalled();
      expect(spyInvalidate).toHaveBeenCalled();
      expect(spyUptItem).toHaveBeenCalledWith(123, { ...mockRowData, __collapsed: true });
    });

    it('should toggle the "__collapsed" to False when the class name was found to be True prior', () => {
      mockRowData.__collapsed = true;
      jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
      const spyGetItem = jest.spyOn(dataViewStub, 'getItem').mockReturnValue(mockRowData);
      const spyUptItem = jest.spyOn(dataViewStub, 'updateItem');
      const spyInvalidate = jest.spyOn(gridStub, 'invalidate');

      service.init(gridStub);
      const eventData = new Slick.EventData();
      div.className = 'toggle';
      eventData.target = div;
      gridStub.onClick.notify({ cell: 0, row: 0 }, eventData, gridStub);

      expect(spyGetItem).toHaveBeenCalled();
      expect(spyInvalidate).toHaveBeenCalled();
      expect(spyUptItem).toHaveBeenCalledWith(123, { ...mockRowData, __collapsed: false });
    });

    it('should toggle the collapsed custom class name to False when that custom class name was found to be True prior', () => {
      mockRowData.customCollapsed = true;
      gridOptionsMock.treeDataOptions!.collapsedPropName = 'customCollapsed';
      const spyGetItem = jest.spyOn(dataViewStub, 'getItem').mockReturnValue(mockRowData);
      const spyUptItem = jest.spyOn(dataViewStub, 'updateItem');
      const spyInvalidate = jest.spyOn(gridStub, 'invalidate');

      service.init(gridStub);
      const eventData = new Slick.EventData();
      div.className = 'toggle';
      eventData.target = div;
      gridStub.onClick.notify({ cell: 0, row: 0 }, eventData, gridStub);

      expect(spyGetItem).toHaveBeenCalled();
      expect(spyInvalidate).toHaveBeenCalled();
      expect(spyUptItem).toHaveBeenCalledWith(123, { ...mockRowData, customCollapsed: false });
    });

    describe('toggleTreeDataCollapse method', () => {
      let itemsMock: any;

      beforeEach(() => {
        itemsMock = [{ file: 'myFile.txt', size: 0.5 }, { file: 'myMusic.txt', size: 5.3 }];
        gridOptionsMock.treeDataOptions = { columnId: 'file' };
        jest.clearAllMocks();
      });

      it('should collapse all items when calling the method with collapsing True', () => {
        const dataGetItemsSpy = jest.spyOn(dataViewStub, 'getItems').mockReturnValue(itemsMock);
        const dataSetItemsSpy = jest.spyOn(dataViewStub, 'setItems');

        service.init(gridStub);
        service.toggleTreeDataCollapse(true);

        expect(dataGetItemsSpy).toHaveBeenCalled();
        expect(dataSetItemsSpy).toHaveBeenCalledWith([
          { __collapsed: true, file: 'myFile.txt', size: 0.5, },
          { __collapsed: true, file: 'myMusic.txt', size: 5.3, },
        ]);
      });

      it('should collapse all items with a custom collapsed property when calling the method with collapsing True', () => {
        gridOptionsMock.treeDataOptions!.collapsedPropName = 'customCollapsed';
        const dataGetItemsSpy = jest.spyOn(dataViewStub, 'getItems').mockReturnValue(itemsMock);
        const dataSetItemsSpy = jest.spyOn(dataViewStub, 'setItems');

        service.init(gridStub);
        service.toggleTreeDataCollapse(true);

        expect(dataGetItemsSpy).toHaveBeenCalled();
        expect(dataSetItemsSpy).toHaveBeenCalledWith([
          { customCollapsed: true, file: 'myFile.txt', size: 0.5, },
          { customCollapsed: true, file: 'myMusic.txt', size: 5.3, },
        ]);
      });

      it('should expand all items when calling the method with collapsing False', () => {
        const dataGetItemsSpy = jest.spyOn(dataViewStub, 'getItems').mockReturnValue(itemsMock);
        const dataSetItemsSpy = jest.spyOn(dataViewStub, 'setItems');

        service.init(gridStub);
        service.toggleTreeDataCollapse(false);

        expect(dataGetItemsSpy).toHaveBeenCalled();
        expect(dataSetItemsSpy).toHaveBeenCalledWith([
          { __collapsed: false, file: 'myFile.txt', size: 0.5, },
          { __collapsed: false, file: 'myMusic.txt', size: 5.3, },
        ]);
      });
    });

    describe('initializeHierarchicalDataset method', () => {
      let mockColumns: Column[];
      let mockFlatDataset: any;

      beforeEach(() => {
        mockColumns = [{ id: 'file', field: 'file', }, { id: 'size', field: 'size', }] as Column[];
        mockFlatDataset = [{ id: 0, file: 'documents' }, { id: 1, file: 'vacation.txt', size: 1.2, parentId: 0 }, { id: 2, file: 'todo.txt', size: 2.3, parentId: 0 }];
        gridOptionsMock.treeDataOptions = { columnId: 'file', parentPropName: 'parentId' };
        jest.clearAllMocks();
      });

      it('should sort by the Tree column when there is no initial sort provided', () => {
        const mockHierarchical = [{
          id: 0,
          file: 'documents',
          files: [{ id: 2, file: 'todo.txt', size: 2.3, }, { id: 1, file: 'vacation.txt', size: 1.2, }]
        }];
        const setSortSpy = jest.spyOn(gridStub, 'setSortColumns');
        jest.spyOn(gridStub, 'getColumnIndex').mockReturnValue(0);
        jest.spyOn(sortServiceStub, 'sortHierarchicalDataset').mockReturnValue({ flat: mockFlatDataset, hierarchical: mockHierarchical });

        service.init(gridStub);
        const result = service.initializeHierarchicalDataset(mockFlatDataset, [mockColumn]);

        expect(setSortSpy).toHaveBeenCalledWith([{
          columnId: 'file',
          sortAsc: true,
          sortCol: mockColumn
        }]);
        expect(result).toEqual({ flat: mockFlatDataset, hierarchical: mockHierarchical });
      });

      it('should sort by the Tree column by the "initialSort" provided', () => {
        gridOptionsMock.treeDataOptions!.initialSort = {
          columnId: 'size',
          direction: 'desc'
        };
        const mockHierarchical = [{
          id: 0,
          file: 'documents',
          files: [{ id: 1, file: 'vacation.txt', size: 1.2, }, { id: 2, file: 'todo.txt', size: 2.3, }]
        }];
        const setSortSpy = jest.spyOn(gridStub, 'setSortColumns');
        jest.spyOn(gridStub, 'getColumnIndex').mockReturnValue(0);
        jest.spyOn(sortServiceStub, 'sortHierarchicalDataset').mockReturnValue({ flat: mockFlatDataset, hierarchical: mockHierarchical });

        service.init(gridStub);
        const result = service.initializeHierarchicalDataset(mockFlatDataset, [mockColumn]);

        expect(setSortSpy).toHaveBeenCalledWith([{
          columnId: 'size',
          sortAsc: false,
          sortCol: mockColumn
        }]);
        expect(result).toEqual({ flat: mockFlatDataset, hierarchical: mockHierarchical });
      });
    });
  });
});
