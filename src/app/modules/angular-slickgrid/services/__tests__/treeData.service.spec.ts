import 'jest-extended';

import { Constants } from '../../constants';
import { GridOption, SlickEventHandler, Column, BackendService } from '../../models/index';
import { SharedService } from '../shared.service';
import { SortService } from '../sort.service';
import { TreeDataService } from '../treeData.service';

declare const Slick: any;

const gridOptionsMock = {
  multiColumnSort: false,
  enableFiltering: true,
  enableTreeData: true,
  treeDataOptions: {
    columnId: 'file'
  }
} as GridOption;

const backendServiceStub = {
  buildQuery: jest.fn(),
  clearFilters: jest.fn(),
  getCurrentFilters: jest.fn(),
  getCurrentPagination: jest.fn(),
  updateFilters: jest.fn(),
  processOnFilterChanged: () => 'backend query',
} as unknown as BackendService;

const dataViewStub = {
  beginUpdate: jest.fn(),
  endUpdate: jest.fn(),
  getItem: jest.fn(),
  getItemById: jest.fn(),
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
    gridOptionsMock.backendServiceApi = undefined;
    gridOptionsMock.enableFiltering = true;
    gridOptionsMock.enablePagination = false;
    gridOptionsMock.multiColumnSort = false;
    gridOptionsMock.treeDataOptions = {
      columnId: 'file'
    };
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

  it('should throw an error when used without filter grid option', (done) => {
    try {
      gridOptionsMock.enableFiltering = false;
      service.init(gridStub);
    } catch (e) {
      expect(e.toString()).toContain('[Angular-Slickgrid] It looks like you are trying to use Tree Data without using the filtering option');
      done();
    }
  });

  it('should throw an error when enableTreeData is enabled with Pagination since that is not supported', (done) => {
    try {
      gridOptionsMock.enablePagination = true;
      service.init(gridStub);
    } catch (e) {
      expect(e.toString()).toContain('[Angular-Slickgrid] It looks like you are trying to use Tree Data with Pagination and/or a Backend Service (OData, GraphQL) but unfortunately that is simply not supported because of its complexity.');
      done();
    }
  });

  it('should throw an error when used with a backend service (OData, GraphQL)', (done) => {
    try {
      gridOptionsMock.backendServiceApi = {
        filterTypingDebounce: 0,
        service: backendServiceStub,
        process: () => new Promise((resolve) => resolve(jest.fn())),
      };
      service.init(gridStub);
    } catch (e) {
      expect(e.toString()).toContain('[Angular-Slickgrid] It looks like you are trying to use Tree Data with Pagination and/or a Backend Service (OData, GraphQL) but unfortunately that is simply not supported because of its complexity.');
      done();
    }
  });

  it('should throw an error when enableTreeData is enabled without passing a "columnId"', (done) => {
    try {
      gridOptionsMock.treeDataOptions = {} as any;
      service.init(gridStub);
    } catch (e) {
      expect(e.toString()).toContain('[Angular-Slickgrid] When enabling tree data, you must also provide the "treeDataOption" property in your Grid Options with "childrenPropName" or "parentPropName"');
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

  describe('getTreeDataOptionPropName method', () => {
    it('should return default constant children prop name', () => {
      const output = service.getTreeDataOptionPropName('childrenPropName');
      expect(output).toBe(Constants.treeDataProperties.CHILDREN_PROP);
    });

    it('should return default constant collapsed prop name', () => {
      const output = service.getTreeDataOptionPropName('collapsedPropName');
      expect(output).toBe(Constants.treeDataProperties.COLLAPSED_PROP);
    });

    it('should return default constant hasChildren prop name', () => {
      const output = service.getTreeDataOptionPropName('hasChildrenPropName');
      expect(output).toBe(Constants.treeDataProperties.HAS_CHILDREN_PROP);
    });

    it('should return default constant level prop name', () => {
      const output = service.getTreeDataOptionPropName('levelPropName');
      expect(output).toBe(Constants.treeDataProperties.TREE_LEVEL_PROP);
    });

    it('should return default constant parent prop name', () => {
      const output = service.getTreeDataOptionPropName('parentPropName');
      expect(output).toBe(Constants.treeDataProperties.PARENT_PROP);
    });

    it('should return "id" as default identifier prop name', () => {
      const output = service.getTreeDataOptionPropName('identifierPropName');
      expect(output).toBe('id');
    });
  });

  describe('handleOnCellClick method', () => {
    let div: HTMLDivElement;
    let mockColumn: Column;
    let mockRowData: any;

    beforeEach(() => {
      div = document.createElement('div');
      div.innerHTML = `<div class="slick-cell">Text</div>`;
      document.body.appendChild(div);
      mockColumn = { id: 'file', field: 'file', onCellClick: jest.fn() } as Column;
      mockRowData = { id: 123, file: 'myFile.txt', size: 0.5, };
    });

    afterEach(() => {
      jest.clearAllMocks();
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
      expect(service.getToggledItems().length).toBe(1);
      expect(service.getCurrentToggleState()).toEqual({ type: 'toggle-expand', previousFullToggleType: 'full-expand', toggledItems: [{ isCollapsed: false, itemId: 123 }] });
      expect(spyUptItem).toHaveBeenCalledWith(123, { ...mockRowData, __collapsed: false });
    });

    it('should toggle 2x times the "__collapsed" to False when the class name was found to be True prior', () => {
      mockRowData.__collapsed = true;
      jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
      const spyGetItem = jest.spyOn(dataViewStub, 'getItem').mockReturnValue(mockRowData);
      jest.spyOn(SharedService.prototype, 'hierarchicalDataset', 'get').mockReturnValue([mockRowData]);
      const spyUptItem = jest.spyOn(dataViewStub, 'updateItem');
      const spyInvalidate = jest.spyOn(gridStub, 'invalidate');

      service.init(gridStub);
      const eventData = new Slick.EventData();
      div.className = 'toggle';
      Object.defineProperty(eventData, 'target', { writable: true, value: div });
      service.currentToggledItems = [{ itemId: 123, isCollapsed: true }];

      gridStub.onClick.notify({ cell: 0, row: 0, grid: gridStub }, eventData, gridStub);

      expect(service.getToggledItems().length).toBe(1);
      expect(spyGetItem).toHaveBeenCalled();
      expect(spyInvalidate).toHaveBeenCalled();
      expect(service.getCurrentToggleState()).toEqual({ type: 'toggle-expand', previousFullToggleType: 'full-expand', toggledItems: [{ isCollapsed: false, itemId: 123 }] });
      expect(spyUptItem).toHaveBeenCalledWith(123, { ...mockRowData, __collapsed: false });
      expect(service.getToggledItems()).toEqual([{ itemId: 123, isCollapsed: false }]);
      expect(SharedService.prototype.hierarchicalDataset![0].file).toBe('myFile.txt');
      expect(SharedService.prototype.hierarchicalDataset![0].__collapsed).toBeFalse();
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
      expect(service.getToggledItems().length).toBe(1);
      expect(service.getCurrentToggleState()).toEqual({ type: 'toggle-expand', previousFullToggleType: 'full-expand', toggledItems: [{ isCollapsed: false, itemId: 123 }] });
      expect(spyUptItem).toHaveBeenCalledWith(123, { ...mockRowData, customCollapsed: false });
    });

    describe('toggleTreeDataCollapse method', () => {
      let mockFlatDataset: any[];
      let mockHierarchical: any[];

      beforeEach(() => {
        jest.clearAllMocks();
        mockFlatDataset = [
          { id: 0, file: 'TXT', size: 5.8, __hasChildren: true },
          { id: 1, file: 'myFile.txt', size: 0.5 },
          { id: 2, file: 'myMusic.txt', size: 5.3 },
          { id: 4, file: 'MP3', size: 3.4, __hasChildren: true },
          { id: 5, file: 'relaxation.mp3', size: 3.4 }
        ];
        mockHierarchical = [
          { id: 0, file: 'TXT', files: [{ id: 1, file: 'myFile.txt', size: 0.5, }, { id: 2, file: 'myMusic.txt', size: 5.3, }] },
          { id: 4, file: 'MP3', files: [{ id: 5, file: 'relaxation.mp3', size: 3.4, }] }
        ];
        gridOptionsMock.treeDataOptions = { columnId: 'file' };
      });

      it('should collapse all items when calling the method with collapsing True', () => {
        const dataGetItemsSpy = jest.spyOn(dataViewStub, 'getItems').mockReturnValue(mockFlatDataset);
        jest.spyOn(SharedService.prototype, 'hierarchicalDataset', 'get').mockReturnValue(mockHierarchical);
        const beginUpdateSpy = jest.spyOn(dataViewStub, 'beginUpdate');
        const endUpdateSpy = jest.spyOn(dataViewStub, 'endUpdate');
        const updateItemSpy = jest.spyOn(dataViewStub, 'updateItem');
        // const pubSubSpy = jest.spyOn(pubSubServiceStub, 'publish');

        service.init(gridStub);
        service.toggleTreeDataCollapse(true);

        // expect(pubSubSpy).toHaveBeenCalledWith(`onTreeFullToggleStart`, { collapsing: true });
        // expect(pubSubSpy).toHaveBeenCalledWith(`onTreeFullToggleEnd`, { type: 'full-collapse', previousFullToggleType: 'full-collapse', toggledItems: null, });
        expect(dataGetItemsSpy).toHaveBeenCalled();
        expect(beginUpdateSpy).toHaveBeenCalled();
        expect(updateItemSpy).toHaveBeenNthCalledWith(1, 0, { __collapsed: true, __hasChildren: true, id: 0, file: 'TXT', size: 5.8 });
        expect(updateItemSpy).toHaveBeenNthCalledWith(2, 4, { __collapsed: true, __hasChildren: true, id: 4, file: 'MP3', size: 3.4 });
        expect(SharedService.prototype.hierarchicalDataset![0].file).toBe('TXT');
        expect(SharedService.prototype.hierarchicalDataset![0].__collapsed).toBeTrue();
        expect(SharedService.prototype.hierarchicalDataset![1].file).toBe('MP3');
        expect(SharedService.prototype.hierarchicalDataset![1].__collapsed).toBeTrue();
        expect(endUpdateSpy).toHaveBeenCalled();
      });

      it('should collapse all items with a custom collapsed property when calling the method with collapsing True', () => {
        gridOptionsMock.treeDataOptions!.collapsedPropName = 'customCollapsed';
        const dataGetItemsSpy = jest.spyOn(dataViewStub, 'getItems').mockReturnValue(mockFlatDataset);
        const beginUpdateSpy = jest.spyOn(dataViewStub, 'beginUpdate');
        const endUpdateSpy = jest.spyOn(dataViewStub, 'endUpdate');
        const updateItemSpy = jest.spyOn(dataViewStub, 'updateItem');
        // const pubSubSpy = jest.spyOn(pubSubServiceStub, 'publish');

        service.init(gridStub);
        service.toggleTreeDataCollapse(true);

        // expect(pubSubSpy).toHaveBeenCalledWith(`onTreeFullToggleStart`, { collapsing: true });
        // expect(pubSubSpy).toHaveBeenCalledWith(`onTreeFullToggleEnd`, { type: 'full-collapse', previousFullToggleType: 'full-collapse', toggledItems: null, });
        expect(dataGetItemsSpy).toHaveBeenCalled();
        expect(dataGetItemsSpy).toHaveBeenCalled();
        expect(beginUpdateSpy).toHaveBeenCalled();
        expect(updateItemSpy).toHaveBeenNthCalledWith(1, 0, { customCollapsed: true, __hasChildren: true, id: 0, file: 'TXT', size: 5.8 });
        expect(updateItemSpy).toHaveBeenNthCalledWith(2, 4, { customCollapsed: true, __hasChildren: true, id: 4, file: 'MP3', size: 3.4 });
        expect(endUpdateSpy).toHaveBeenCalled();
      });

      it('should expand all items when calling the method with collapsing False', () => {
        const dataGetItemsSpy = jest.spyOn(dataViewStub, 'getItems').mockReturnValue(mockFlatDataset);
        const beginUpdateSpy = jest.spyOn(dataViewStub, 'beginUpdate');
        const endUpdateSpy = jest.spyOn(dataViewStub, 'endUpdate');
        const updateItemSpy = jest.spyOn(dataViewStub, 'updateItem');
        // const pubSubSpy = jest.spyOn(pubSubServiceStub, 'publish');

        service.init(gridStub);
        service.toggleTreeDataCollapse(false);

        // expect(pubSubSpy).toHaveBeenCalledWith(`onTreeFullToggleStart`, { collapsing: false });
        // expect(pubSubSpy).toHaveBeenCalledWith(`onTreeFullToggleEnd`, { type: 'full-expand', previousFullToggleType: 'full-expand', toggledItems: null, });
        expect(dataGetItemsSpy).toHaveBeenCalled();
        expect(beginUpdateSpy).toHaveBeenCalled();
        expect(updateItemSpy).toHaveBeenNthCalledWith(1, 0, { __collapsed: false, __hasChildren: true, id: 0, file: 'TXT', size: 5.8 });
        expect(updateItemSpy).toHaveBeenNthCalledWith(2, 4, { __collapsed: false, __hasChildren: true, id: 4, file: 'MP3', size: 3.4 });
        expect(endUpdateSpy).toHaveBeenCalled();
      });

      describe('applyToggledItemStateChanges method', () => {
        it('should execute the method', () => {
          const dataGetItemsSpy = jest.spyOn(dataViewStub, 'getItems').mockReturnValue(mockFlatDataset);
          jest.spyOn(dataViewStub, 'getItemById').mockReturnValue(mockFlatDataset[3]);
          jest.spyOn(SharedService.prototype, 'hierarchicalDataset', 'get').mockReturnValue(mockHierarchical);
          const beginUpdateSpy = jest.spyOn(dataViewStub, 'beginUpdate');
          const endUpdateSpy = jest.spyOn(dataViewStub, 'endUpdate');
          const updateItemSpy = jest.spyOn(dataViewStub, 'updateItem');

          service.init(gridStub);
          service.applyToggledItemStateChanges([{ itemId: 4, isCollapsed: true }]);

          expect(dataGetItemsSpy).toHaveBeenCalled();
          expect(beginUpdateSpy).toHaveBeenCalled();
          expect(updateItemSpy).toHaveBeenNthCalledWith(1, 4, { __collapsed: true, __hasChildren: true, id: 4, file: 'MP3', size: 3.4 });
          expect(endUpdateSpy).toHaveBeenCalled();
        });
      });
    });
  });

  describe('convertFlatParentChildToTreeDatasetAndSort method', () => {
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
      jest.spyOn(sortServiceStub, 'sortHierarchicalDataset').mockReturnValue({ flat: mockFlatDataset as any[], hierarchical: mockHierarchical as any[] });

      service.init(gridStub);
      const result = service.convertFlatParentChildToTreeDatasetAndSort(mockFlatDataset, mockColumns, gridOptionsMock);

      expect(setSortSpy).toHaveBeenCalledWith([{
        columnId: 'file',
        sortAsc: true,
        sortCol: mockColumns[0]
      }]);
      expect(result).toEqual({ flat: mockFlatDataset as any[], hierarchical: mockHierarchical as any[] });
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
      jest.spyOn(sortServiceStub, 'sortHierarchicalDataset').mockReturnValue({ flat: mockFlatDataset as any[], hierarchical: mockHierarchical as any[] });

      service.init(gridStub);
      const result = service.convertFlatParentChildToTreeDatasetAndSort(mockFlatDataset, mockColumns, gridOptionsMock);

      expect(setSortSpy).toHaveBeenCalledWith([{
        columnId: 'size',
        sortAsc: false,
        sortCol: mockColumns[1]
      }]);
      expect(result).toEqual({ flat: mockFlatDataset as any[], hierarchical: mockHierarchical as any[] });
    });
  });

  describe('sortHierarchicalDataset method', () => {
    it('should call sortHierarchicalDataset from the sort service', () => {
      const mockColumns = [{ id: 'file', field: 'file', }, { id: 'size', field: 'size', }] as Column[];
      const mockHierarchical = [{
        id: 0,
        file: 'documents',
        files: [{ id: 2, file: 'todo.txt', size: 2.3, }, { id: 1, file: 'vacation.txt', size: 1.2, }]
      }];
      const mockColumnSort = { columnId: 'size', sortAsc: true, sortCol: mockColumns[1], }
      jest.spyOn(SharedService.prototype, 'allColumns', 'get').mockReturnValue(mockColumns);
      const getInitialSpy = jest.spyOn(service, 'getInitialSort').mockReturnValue(mockColumnSort);
      const sortHierarchySpy = jest.spyOn(sortServiceStub, 'sortHierarchicalDataset');

      service.init(gridStub);
      service.sortHierarchicalDataset(mockHierarchical);

      expect(getInitialSpy).toHaveBeenCalledWith(mockColumns, gridOptionsMock);
      expect(sortHierarchySpy).toHaveBeenCalledWith(mockHierarchical, [mockColumnSort]);
    });
  });
});
