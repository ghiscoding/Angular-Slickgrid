import { Editors } from '../../editors/editors.index';
import { Column, FieldType } from '../../models';
import { GridOption } from '../../models/gridOption.interface';
import { ResizerService } from '../resizer.service';

const DATAGRID_MIN_HEIGHT = 180;
const DATAGRID_MIN_WIDTH = 300;
const DATAGRID_BOTTOM_PADDING = 20;
const DATAGRID_FOOTER_HEIGHT = 20;
const DATAGRID_PAGINATION_HEIGHT = 35;
const gridId = 'grid1';
const gridUid = 'slickgrid_124343';
const containerId = 'demo-container';
declare const Slick: any;

const gridOptionMock = {
  gridId,
  gridContainerId: `slickGridContainer-${gridId}`,
  autoResize: {
    containerId,
    maxHeight: 800,
    maxWidth: 1200,
    sidePadding: 10,
  },
  enableAutoResize: true
} as GridOption;

const mockDataView = {
  constructor: jest.fn(),
  init: jest.fn(),
  destroy: jest.fn(),
  getItemMetadata: jest.fn(),
  getItems: jest.fn(),
};

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumns: jest.fn(),
  getContainerNode: jest.fn(),
  getScrollbarDimensions: jest.fn(),
  getViewports: jest.fn(),
  resizeCanvas: jest.fn(),
  getData: () => mockDataView,
  getOptions: () => gridOptionMock,
  getUID: () => gridUid,
  reRenderColumns: jest.fn(),
  setColumns: jest.fn(),
  onColumnsResizeDblClick: new Slick.Event(),
  onSort: new Slick.Event(),
};

// define a <div> container to simulate the grid container
const template =
  `<div id="${containerId}" style="height: 800px; width: 600px; overflow: hidden; display: block;">
    <div id="slickGridContainer-${gridId}" class="gridPane" style="width: 100%;">
    <div id="${gridId}" class="${gridUid}" style="width: 100%"></div>
    </div>
  </div>`;

// --- NOTE ---
// with JSDOM our container or element height/width will always be 0 (JSDOM does not render like a real browser)
// we can only mock the window height/width, we cannot mock an element height/width
// I tried various hack but nothing worked, this one for example https://github.com/jsdom/jsdom/issues/135#issuecomment-68191941

describe('Resizer Service', () => {
  let service: ResizerService;
  let div;
  let mockGridOptions: GridOption;

  beforeEach(() => {
    div = document.createElement('div');
    div.innerHTML = template;
    document.body.appendChild(div);

    mockGridOptions = {
      enableAutoResize: true,
      autoResize: {
        container: '.grid1'
      },
      enableFiltering: true,
      headerRowHeight: 30,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 20,
      resizeByContentOptions: {},
    } as GridOption;
    jest.spyOn(gridStub, 'getOptions').mockReturnValue(mockGridOptions);
    jest.spyOn(gridStub, 'getContainerNode').mockReturnValue(div.querySelector(`#${gridId}`));
    service = new ResizerService();
  });

  afterEach(() => {
    service.dispose();
    jest.clearAllMocks();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error when there is no grid object defined', () => {
    service = new ResizerService();
    expect(() => service.init(null)).toThrowError('Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined');
  });

  xit('should throw an error when there is no grid options defined', () => {
    service = new ResizerService();
    service.init({ getOptions: () => null });
    expect(() => service.resizeGrid()).toThrowError('Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined');
  });

  describe('resizeGrid method', () => {
    beforeEach(() => {
      beforeEach(() => {
        // @ts-ignore
        navigator.__defineGetter__('userAgent', () => 'Netscape');
        gridOptionMock.gridId = 'grid1';
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return null when calling "bindAutoResizeDataGrid" method with a gridId that is not found in the DOM', () => {
      jest.spyOn(gridStub, 'getContainerNode').mockReturnValue(null);
      service.init(gridStub);
      const output = service.bindAutoResizeDataGrid();
      expect(output).toBe(null);
    });

    it('should return null when calling "calculateGridNewDimensions" method with a gridId that is not found in the DOM', () => {
      jest.spyOn(gridStub, 'getContainerNode').mockReturnValue(null);
      service.init(gridStub);
      const output = service.calculateGridNewDimensions(gridOptionMock);
      expect(output).toBe(null);
    });

    it('should trigger a grid resize when a window resize event occurs', () => {
      // arrange
      const newHeight = 500;
      const fixedWidth = 800;
      service.init(gridStub, { width: fixedWidth });
      const previousHeight = window.innerHeight;
      const subjectBeforeSpy = jest.spyOn(service.onGridBeforeResize, 'next');
      const subjectAfterSpy = jest.spyOn(service.onGridAfterResize, 'next');
      const gridSpy = jest.spyOn(gridStub, 'getOptions');
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');
      const serviceResizeSpy = jest.spyOn(service, 'resizeGrid');

      // act
      // bind window resize & call a viewport resize
      service.bindAutoResizeDataGrid();
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));
      const lastDimensions = service.getLastResizeDimensions();

      // so the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight" while the width it uses the container width
      // for that reason, we can only verify the height, while the width should be set as the minimum width from the constant because 0 is override by the constant
      const dimensionResult = { height: newHeight - DATAGRID_BOTTOM_PADDING, width: fixedWidth };

      // assert
      expect(gridSpy).toHaveBeenCalled();
      expect(serviceResizeSpy).toHaveBeenCalled();
      expect(window.innerHeight).not.toEqual(previousHeight);
      expect(serviceCalculateSpy).toReturnWith(dimensionResult);
      expect(lastDimensions).toEqual(dimensionResult);
      expect(subjectBeforeSpy).toHaveBeenCalledWith(expect.any(Object));
      expect(subjectAfterSpy).toHaveBeenCalledWith(dimensionResult);
    });

    it('should resize grid to a defined height and width when fixed dimensions are provided to the init method', () => {
      const fixedHeight = 330;
      const fixedWidth = 412;
      const windowHeight = 840;
      service.init(gridStub, { height: fixedHeight, width: fixedWidth });
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: windowHeight });
      window.dispatchEvent(new Event('resize'));
      service.calculateGridNewDimensions(gridOptionMock);

      // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
      expect(serviceCalculateSpy).toReturnWith({ height: fixedHeight, width: fixedWidth });
    });

    it('should calculate new dimensions when calculateGridNewDimensions is called', () => {
      const newHeight = 440;
      const fixedWidth = 800;
      service.init(gridStub, { width: fixedWidth });
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));
      service.calculateGridNewDimensions(gridOptionMock);

      // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
      expect(serviceCalculateSpy).toReturnWith({ height: (newHeight - DATAGRID_BOTTOM_PADDING), width: fixedWidth });
    });

    it('should calculate new dimensions, minus the custom footer height, when calculateGridNewDimensions is called', () => {
      const newHeight = 440;
      const fixedWidth = 800;
      const newOptions = { ...gridOptionMock, enablePagination: false, showCustomFooter: true } as GridOption;
      const newGridStub = { ...gridStub, getOptions: () => newOptions };
      service.init(newGridStub, { width: fixedWidth });
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));
      service.calculateGridNewDimensions(newOptions);

      // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
      expect(serviceCalculateSpy).toReturnWith({ height: (newHeight - DATAGRID_BOTTOM_PADDING - DATAGRID_FOOTER_HEIGHT), width: fixedWidth });
    });

    it('should calculate new dimensions, minus the custom footer height passed in grid options, when calculateGridNewDimensions is called', () => {
      const newHeight = 440;
      const fixedWidth = 800;
      const footerHeight = 25;
      const newOptions = { ...gridOptionMock, enablePagination: false, showCustomFooter: true, customFooterOptions: { footerHeight } } as GridOption;
      const newGridStub = { ...gridStub, getOptions: () => newOptions };
      service.init(newGridStub, { width: fixedWidth });
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));
      service.calculateGridNewDimensions(newOptions);

      // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
      expect(serviceCalculateSpy).toReturnWith({ height: (newHeight - DATAGRID_BOTTOM_PADDING - footerHeight), width: fixedWidth });
    });

    it('should use maxHeight when new dimensions are higher than maximum defined', () => {
      const newHeight = 1000;
      const fixedWidth = 800;
      service.init(gridStub, { width: fixedWidth });
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));
      service.calculateGridNewDimensions(gridOptionMock);

      // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
      expect(serviceCalculateSpy).toReturnWith({ height: gridOptionMock.autoResize!.maxHeight, width: fixedWidth });
    });

    it('should use maxWidth when new dimensions are higher than maximum defined', () => {
      const newWidth = 2000;
      const fixedHeight = 500;
      service.init(gridStub, { height: fixedHeight });
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: newWidth });
      window.dispatchEvent(new Event('resize'));
      service.calculateGridNewDimensions(gridOptionMock);

      // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
      expect(serviceCalculateSpy).toReturnWith({ height: fixedHeight, width: gridOptionMock.autoResize!.maxWidth });
    });

    it('should use minWidth constant when new dimensions are lower than minimum defined', () => {
      const newWidth = 20;
      const fixedHeight = 500;
      service.init(gridStub, { height: fixedHeight });
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: newWidth });
      window.dispatchEvent(new Event('resize'));
      service.calculateGridNewDimensions(gridOptionMock);

      // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
      expect(serviceCalculateSpy).toReturnWith({ height: fixedHeight, width: DATAGRID_MIN_WIDTH });
    });

    it('should calculate new width dimensions minus a padding when "sidePadding" is defined', () => {
      const newWidth = 800;
      const fixedHeight = 500;
      service.init(gridStub, { height: fixedHeight });
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: newWidth });
      window.dispatchEvent(new Event('resize'));
      service.calculateGridNewDimensions(gridOptionMock);

      // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
      expect(serviceCalculateSpy).toReturnWith({ height: fixedHeight, width: newWidth - gridOptionMock.autoResize!.sidePadding! });
    });

    it('should calculate new dimensions minus a padding when "bottomPadding" is defined in "autoResize" and calculateGridNewDimensions is called', () => {
      const newHeight = 422;
      const fixedWidth = 800;
      const inputBottomPadding = 13;
      service.init(gridStub, { width: fixedWidth });
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));
      service.calculateGridNewDimensions({ ...gridOptionMock, autoResize: { bottomPadding: inputBottomPadding } });

      // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
      expect(serviceCalculateSpy).toReturnWith({ height: (newHeight - inputBottomPadding), width: fixedWidth });
    });

    it('should use new dimensions when passed as argument to the "resizeGrid" method', (done) => {
      const newHeight = 422;
      const newWidth = 804;
      service.init(gridStub);

      service.resizeGrid(0, { height: newHeight, width: newWidth }).then((newDimensions) => {
        expect(newDimensions).toEqual({ height: newHeight, width: newWidth });
        done();
      });
    });

    it('should calculate new dimensions minus the pagination height when pagination is enabled and resizeGrid is called with a delay', (done) => {
      const newHeight = 440;
      const fixedWidth = 800;
      const newOptions = { ...gridOptionMock, enablePagination: true };
      const newGridStub = { ...gridStub, getOptions: () => newOptions };
      service.init(newGridStub, { width: fixedWidth });
      const subjectAfterSpy = jest.spyOn(service.onGridAfterResize, 'next');
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));
      service.resizeGrid(2).then((newGridDimensions) => {
        // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
        const calculatedDimensions = { height: (newHeight - DATAGRID_BOTTOM_PADDING - DATAGRID_PAGINATION_HEIGHT), width: fixedWidth };
        expect(serviceCalculateSpy).toReturnWith(calculatedDimensions);
        expect(newGridDimensions).toEqual({ ...calculatedDimensions, heightWithPagination: (calculatedDimensions.height + DATAGRID_PAGINATION_HEIGHT) });
        expect(subjectAfterSpy).toHaveBeenCalledWith(newGridDimensions);
        done();
      });
    });

    it('should calculate new dimensions by using the container dimensions (instead of the window dimensions) when calculateAvailableSizeBy is set to container', () => {
      const newHeight = 500;
      const fixedWidth = 800;
      const spy = jest.spyOn(service, 'calculateGridNewDimensions');
      service.init(gridStub, { width: fixedWidth });
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));
      service.calculateGridNewDimensions({ ...gridOptionMock, autoResize: { calculateAvailableSizeBy: 'container' } });

      // with JSDOM the height is always 0 so we can assume that the height will be the minimum height (without the padding)
      expect(spy).toReturnWith({ height: DATAGRID_MIN_HEIGHT, width: fixedWidth });
    });

    it('should call the autosizeColumns from the core lib when "enableAutoSizeColumns" is set and the new width is wider than prior width', () => {
      const newHeight = 500;
      const newOptions = { ...gridOptionMock, enableAutoSizeColumns: true };
      const newGridStub = { ...gridStub, getOptions: () => newOptions };
      service.init(newGridStub);
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');
      const gridAutosizeSpy = jest.spyOn(newGridStub, 'autosizeColumns');

      service.bindAutoResizeDataGrid();
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));

      // with JSDOM the height is always 0 so we can assume that the height will be the minimum height (without the padding)
      expect(serviceCalculateSpy).toHaveBeenCalled();
      expect(gridAutosizeSpy).toHaveBeenCalled();
    });

    it('should call "onGridAfterResize" event and expect "resizeColumnsByCellContent" to be called when "enableAutoResizeColumnsByCellContent" is set', () => {
      const newHeight = 500;
      const resizeContentSpy = jest.spyOn(service, 'resizeColumnsByCellContent');
      const newOptions = { ...gridOptionMock, enableAutoResizeColumnsByCellContent: true };
      const newGridStub = { ...gridStub, getOptions: () => newOptions };

      service.init(newGridStub);

      service.bindAutoResizeDataGrid();
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));
      // service.resizeGrid();
      // const instance = service.getAddonInstance();
      // instance.onGridAfterResize.notify({ grid: gridStub, dimensions: { height: 200, width: 800 } }, new Slick.EventData(), gridStub);

      expect(resizeContentSpy).toHaveBeenCalled();
    });

    it('should stop resizing when user called "pauseResizer" with true', () => {
      service.bindAutoResizeDataGrid();
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 450 });
      window.dispatchEvent(new Event('resize'));

      service.pauseResizer(true);
      const spy = jest.spyOn(service, 'resizeGrid');

      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 550 });
      window.dispatchEvent(new Event('resize'));

      expect(spy).not.toHaveBeenCalled();
    });

    it('should call a grid "resizeCanvas" when browser is not IE', () => {
      const newHeight = 500;
      const newGridStub = { ...gridStub, getOptions: () => gridOptionMock };
      service.init(newGridStub);
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');
      const resizeCanvasSpy = jest.spyOn(newGridStub, 'resizeCanvas');

      service.bindAutoResizeDataGrid();
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));

      // with JSDOM the height is always 0 so we can assume that the height will be the minimum height (without the padding)
      expect(serviceCalculateSpy).toHaveBeenCalled();
      expect(resizeCanvasSpy).toHaveBeenCalled();
    });


    describe('resizeColumnsByCellContent method', () => {
      let mockColDefs: Column[];
      let mockData: any[];

      afterEach(() => {
        service.dispose();
        jest.clearAllMocks();
      });

      beforeEach(() => {
        mockGridOptions.resizeByContentOptions!.cellCharWidthInPx = 7;
        mockGridOptions.resizeByContentOptions!.cellPaddingWidthInPx = 6;
        mockGridOptions.resizeByContentOptions!.formatterPaddingWidthInPx = 5;
        mockGridOptions.resizeByContentOptions!.defaultRatioForStringType = 0.88;
        mockGridOptions.resizeByContentOptions!.alwaysRecalculateColumnWidth = false;
        mockGridOptions.resizeByContentOptions!.maxItemToInspectCellContentWidth = 4;
        mockColDefs = [
          // typically the `originalWidth` is set by the columnDefinitiosn setter in vanilla grid bundle but we can mock it for our test
          { id: 'userId', field: 'userId', width: 30, originalWidth: 30 },
          { id: 'firstName', field: 'firstName', editor: { model: Editors.text }, minWidth: 50 },
          { id: 'lastName', field: 'lastName', editor: { model: Editors.text }, minWidth: 50 },
          { id: 'gender', field: 'gender', resizeCalcWidthRatio: 1.2 },
          { id: 'age', field: 'age', type: FieldType.number, resizeExtraWidthPadding: 2 },
          { id: 'street', field: 'street', maxWidth: 15 },
          { id: 'country', field: 'country', maxWidth: 15, resizeMaxWidthThreshold: 14, rerenderOnResize: true },
          { id: 'zip', field: 'zip', width: 20, type: 'number' },
        ] as Column[];
        mockData = [
          { userId: 1, firstName: 'John', lastName: 'Doe', gender: 'male', age: 20, street: '478 Kunze Land', country: 'United States of America', zip: 123456 },
          { userId: 2, firstName: 'Destinee', lastName: 'Shanahan', gender: 'female', age: 25, street: '20519 Watson Lodge', country: 'Australia', zip: 223344 },
          { userId: 3, firstName: 'Sarai', lastName: 'Altenwerth', gender: 'female', age: 30, street: '184 Preston Pine', country: 'United States of America', zip: 334433 },
          { userId: 4, firstName: 'Tyshawn', lastName: 'Hyatt', gender: 'male', age: 35, street: '541 Senger Drives', country: 'Canada', zip: 444455 },
          { userId: 5, firstName: 'Alvina', lastName: 'Franecki', gender: 'female', age: 100, street: '20229 Tia Turnpike', country: 'United States of America', zip: 777555 },
          { userId: 6, firstName: 'Therese', lastName: 'Brakus', gender: 'female', age: 99, street: '34767 Lindgren Dam', country: 'Bosnia', zip: 654321 },
        ];

        jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColDefs);
        jest.spyOn(mockDataView, 'getItems').mockReturnValue(mockData);
      });

      it('should call handleSingleColumnResizeByContent when "onHeaderMenuColumnResizeByContent" gets triggered', () => {
        const reRenderSpy = jest.spyOn(gridStub, 'reRenderColumns');
        const onSingleColResizeSpy = jest.spyOn(service, 'handleSingleColumnResizeByContent');

        mockGridOptions.enableColumnResizeOnDoubleClick = true;

        service.init(gridStub);
        gridStub.onColumnsResizeDblClick.notify({ triggeredByColumn: 'zip', grid: gridStub });

        expect(reRenderSpy).toHaveBeenCalledWith(false);
        expect(onSingleColResizeSpy).toBeCalledTimes(1);
        expect(mockColDefs[7].width).toBe(48); // longest number "777555" (length 6 * charWidth(7)) + cellPadding(6) = 48
      });

      it('should call handleSingleColumnResizeByContent when "onHeaderMenuColumnResizeByContent" gets triggered but expect a resized column width when left section width becomes greater than full viewport width', () => {
        const viewportLeft = document.createElement('div');
        viewportLeft.className = 'slick-viewport-left';
        Object.defineProperty(viewportLeft, 'clientWidth', { writable: true, configurable: true, value: 250 });

        const viewportRight = document.createElement('div');
        viewportRight.className = 'slick-viewport-right';
        Object.defineProperty(viewportRight, 'clientWidth', { writable: true, configurable: true, value: 27 });

        jest.spyOn(gridStub, 'getViewports').mockReturnValue([viewportLeft, viewportRight]);
        const reRenderSpy = jest.spyOn(gridStub, 'reRenderColumns');
        const onSingleColResizeSpy = jest.spyOn(service, 'handleSingleColumnResizeByContent');

        mockGridOptions.frozenColumn = 7;
        mockGridOptions.enableColumnResizeOnDoubleClick = true;
        mockGridOptions.resizeByContentOptions!.widthToRemoveFromExceededWidthReadjustment = 20;
        service.init(gridStub);
        gridStub.onColumnsResizeDblClick.notify({ triggeredByColumn: 'zip', grid: gridStub });

        expect(reRenderSpy).toHaveBeenCalledWith(false);
        expect(onSingleColResizeSpy).toBeCalledTimes(1);
        expect(mockColDefs[7].width).toBeLessThan(30);
      });

      it('should call the resize and expect first column have a fixed width while other will have a calculated width when resizing by their content', () => {
        const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');
        const reRenderColumnsSpy = jest.spyOn(gridStub, 'reRenderColumns');

        service.init(gridStub);
        service.resizeColumnsByCellContent(true);

        expect(setColumnsSpy).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({ id: 'userId', width: 30 }),
            expect.objectContaining({ id: 'firstName', width: 56 }), // longest word "Destinee" (length 8 * charWidth(7) * ratio(0.88)) + cellPadding(6) = 55.28 ceil to => 56
            expect.objectContaining({ id: 'lastName', width: 68 }), // longest word "Altenwerth" (length 10 * charWidth(7) * ratio(0.88)) + cellPadding(6) = 67.6 ceil to => 68
            expect.objectContaining({ id: 'gender', width: 57 }), // longest word "female" (length 6 * charWidth(7) * customRatio(1.2)) + cellPadding(6) = 56.4 ceil to 57
            expect.objectContaining({ id: 'age', width: 29 }), // longest number 100 (length 3 * charWidth(7) * ratio(1)) + cellPadding(6) + extraPadding(2) = 44.96 ceil to 45
            expect.objectContaining({ id: 'street', width: 15 }), // longest text "20229 Tia Turnpike" goes over maxWidth so we fallback to it
            expect.objectContaining({ id: 'country', width: 14 }), // longest text "United States of America" goes over resizeMaxWidthThreshold so we fallback to it
            expect.objectContaining({ id: 'zip', width: 48 }), // longest number "777555"
          ]));
        expect(reRenderColumnsSpy).toHaveBeenCalledWith(true);
      });

      it('should call the resize and expect first column have a fixed width while other will have a calculated width when resizing by their content and grid is editable', () => {
        const setColumnsSpy = jest.spyOn(gridStub, 'setColumns');
        const reRenderColumnsSpy = jest.spyOn(gridStub, 'reRenderColumns');

        mockGridOptions.editable = true;
        service.init(gridStub);
        service.resizeColumnsByCellContent(true);

        // same as previous except firstName/lastName have editors with padding of 5px
        expect(setColumnsSpy).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({ id: 'userId', width: 30 }),
            expect.objectContaining({ id: 'firstName', width: 61 }), // longest word "Destinee" (length 8 * charWidth(7) * ratio(0.88)) + cellPadding(6) + editorPadding(5) = 60.28 ceil to => 61
            expect.objectContaining({ id: 'lastName', width: 73 }), // longest word "Altenwerth" (length 10 * charWidth(7) * ratio(0.88)) + cellPadding(6) + editorPadding(5) = 72.6 ceil to => 73
            expect.objectContaining({ id: 'gender', width: 57 }), // longest word "female" (length 6 * charWidth(7) * customRatio(1.2)) + cellPadding(6) = 56.4 ceil to 57
            expect.objectContaining({ id: 'age', width: 29 }), // longest number 100 (length 3 * charWidth(7) * ratio(1)) + cellPadding(6) + extraPadding(2) = 44.96 ceil to 45
            expect.objectContaining({ id: 'street', width: 15 }), // longest text "20229 Tia Turnpike" goes over maxWidth so we fallback to it
            expect.objectContaining({ id: 'country', width: 14 }), // longest text "United States of America" goes over resizeMaxWidthThreshold so we fallback to it
            expect.objectContaining({ id: 'zip', width: 48 }), // longest number "777555"
          ]));
        expect(reRenderColumnsSpy).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('Tests for IE', () => {
    beforeEach(() => {
      // @ts-ignore
      navigator.__defineGetter__('userAgent', () => 'MSIE 8');
    });

    it('should NOT call a grid "resizeCanvas" when browser is IE6-10', () => {
      const newHeight = 500;
      service.init(gridStub);
      const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');
      const resizeCanvasSpy = jest.spyOn(gridStub, 'resizeCanvas');

      service.bindAutoResizeDataGrid();
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
      window.dispatchEvent(new Event('resize'));

      // with JSDOM the height is always 0 so we can assume that the height will be the minimum height (without the padding)
      expect(serviceCalculateSpy).toHaveBeenCalled();
      expect(resizeCanvasSpy).not.toHaveBeenCalled();
    });
  });

  describe('dispose method', () => {
    it('should unsubscribe all event from the event handler', () => {
      const eventHandler = service.eventHandler;
      const spy = jest.spyOn(eventHandler, 'unsubscribeAll');

      service.dispose();

      expect(spy).toHaveBeenCalled();
    });
  });
});
