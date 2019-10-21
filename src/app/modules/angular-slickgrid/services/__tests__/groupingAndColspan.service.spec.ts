import { GroupingAndColspanService } from '../groupingAndColspan.service';
import { GridOption, SlickEventHandler, Column } from '../../models';

declare var Slick: any;
const gridId = 'grid1';
const gridUid = 'slickgrid_124343';
const containerId = 'demo-container';

const gridOptionMock = {
  enablePagination: true,
  createPreHeaderPanel: true,
} as GridOption;

const dataViewStub = {
  refresh: jest.fn(),
  sort: jest.fn(),
  onRowCountChanged: new Slick.Event(),
  reSort: jest.fn(),
};

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getHeadersWidth: jest.fn(),
  getHeaderColumnWidthDiff: jest.fn(),
  getPreHeaderPanel: jest.fn(),
  getPreHeaderPanelLeft: jest.fn(),
  getPreHeaderPanelRight: jest.fn(),
  getSortColumns: jest.fn(),
  invalidate: jest.fn(),
  onColumnsResized: new Slick.Event(),
  onSort: new Slick.Event(),
  render: jest.fn(),
  setSortColumns: jest.fn(),
};

jest.useFakeTimers();

// define a <div> container to simulate the grid container
const template =
  `<div id="${containerId}" style="height: 800px; width: 600px; overflow: hidden; display: block;">
    <div id="slickGridContainer-${gridId}" class="gridPane" style="width: 100%;">
      <div id="${gridId}" class="${gridUid}" style="width: 100%">
      <div class="slick-pane slick-pane-header slick-pane-left" tabindex="0" style="width: 100%;">
        <div class="slick-preheader-panel ui-state-default slick-header" style="overflow:hidden;position:relative;">
          <div style="width: 2815px; left: -1000px;" class="slick-header-columns">All your colums div here</div>
        </div>
      </div>
    </div>
  </div>`;

describe('GroupingAndColspanService', () => {
  let service: GroupingAndColspanService;
  let slickgridEventHandler: SlickEventHandler;

  beforeEach(() => {
    const div = document.createElement('div');
    div.innerHTML = template;
    document.body.appendChild(div);

    service = new GroupingAndColspanService();
    slickgridEventHandler = service.eventHandler;
  });

  afterEach(() => {
    jest.clearAllMocks();
    service.dispose();
    gridStub.getOptions = () => gridOptionMock;
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should dispose of the event handler', () => {
    const spy = jest.spyOn(slickgridEventHandler, 'unsubscribeAll');
    service.dispose();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call the "renderPreHeaderRowGroupingTitles" when there are no grid options', () => {
    gridStub.getOptions = undefined;
    const spy = jest.spyOn(service, 'renderPreHeaderRowGroupingTitles');
    service.init(gridStub, dataViewStub);
    expect(spy).not.toHaveBeenCalled();
  });

  describe('init method', () => {
    let mockColumns: Column[];

    beforeEach(() => {
      mockColumns = [
        { id: 'title', name: 'Title', field: 'title', sortable: true, columnGroup: 'Common Factor' },
        { id: 'duration', name: 'Duration', field: 'duration', width: 100, columnGroup: 'Common Factor' },
        { id: 'category', name: 'Category', field: 'category', columnGroup: 'Common Factor' },
        { id: 'start', name: 'Start', field: 'start' },
      ];
      gridStub.getColumns = jest.fn();
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
      jest.spyOn(gridStub, 'getPreHeaderPanel').mockReturnValue(`<div style="width: 2815px; left: -1000px;" class="slick-header-columns"></div>`);
    });

    it('should call the "renderPreHeaderRowGroupingTitles" on initial load even when there are no column definitions', () => {
      const spy = jest.spyOn(service, 'renderPreHeaderRowGroupingTitles');
      gridStub.getColumns = undefined;

      service.init(gridStub, dataViewStub);
      jest.runAllTimers(); // fast-forward timer

      expect(spy).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
    });

    it('should call the "renderPreHeaderRowGroupingTitles" after triggering a grid "onSort"', () => {
      const spy = jest.spyOn(service, 'renderPreHeaderRowGroupingTitles');

      service.init(gridStub, dataViewStub);
      gridStub.onSort.notify({ impactedColumns: mockColumns }, new Slick.EventData(), gridStub);
      jest.runAllTimers(); // fast-forward timer

      expect(spy).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
    });

    it('should call the "renderPreHeaderRowGroupingTitles" after triggering a grid "onColumnsResized"', () => {
      const spy = jest.spyOn(service, 'renderPreHeaderRowGroupingTitles');

      service.init(gridStub, dataViewStub);
      gridStub.onColumnsResized.notify({}, new Slick.EventData(), gridStub);
      jest.runAllTimers(); // fast-forward timer

      expect(spy).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
    });

    it('should call the "renderPreHeaderRowGroupingTitles" after triggering a dataView "onColumnsResized"', () => {
      const spy = jest.spyOn(service, 'renderPreHeaderRowGroupingTitles');

      service.init(gridStub, dataViewStub);
      dataViewStub.onRowCountChanged.notify({ previous: 1, current: 2, dataView: dataViewStub, callingOnRowsChanged: 1 }, new Slick.EventData(), gridStub);
      jest.runAllTimers(); // fast-forward timer

      expect(spy).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
    });

    it('should render the pre-header row grouping title DOM element', () => {
      const spy = jest.spyOn(service, 'renderPreHeaderRowGroupingTitles');
      const divHeaderColumns = document.getElementsByClassName('slick-header-columns');

      service.init(gridStub, dataViewStub);
      jest.runAllTimers(); // fast-forward timer

      expect(spy).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
      expect(divHeaderColumns.length).toBeGreaterThan(2);
      expect(divHeaderColumns[0].outerHTML).toEqual(`<div style="width: 2815px; left: -1000px;" class="slick-header-columns">All your colums div here</div>`);
    });

    it('should render the pre-header twice (for both left & right viewports) row grouping title DOM element', () => {
      const frozenColumns = 2;
      gridOptionMock.frozenColumn = frozenColumns;
      const headerGroupSpy = jest.spyOn(service, 'renderHeaderGroups');
      const preHeaderLeftSpy = jest.spyOn(gridStub, 'getPreHeaderPanelLeft');
      const preHeaderRightSpy = jest.spyOn(gridStub, 'getPreHeaderPanelRight');
      const divHeaderColumns = document.getElementsByClassName('slick-header-columns');

      service.init(gridStub, dataViewStub);
      jest.runAllTimers(); // fast-forward timer

      expect(preHeaderLeftSpy).toHaveBeenCalledTimes(1);
      expect(preHeaderRightSpy).toHaveBeenCalledTimes(1);
      expect(headerGroupSpy).toHaveBeenNthCalledWith(1, expect.anything(), 0, (frozenColumns + 1));
      expect(headerGroupSpy).toHaveBeenNthCalledWith(2, expect.anything(), (frozenColumns + 1), mockColumns.length);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
      expect(divHeaderColumns.length).toBeGreaterThan(2);
      expect(divHeaderColumns[0].outerHTML).toEqual(`<div style="width: 2815px; left: -1000px;" class="slick-header-columns">All your colums div here</div>`);
    });
  });
});
