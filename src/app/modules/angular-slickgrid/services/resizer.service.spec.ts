import { GridOption } from './../models/gridOption.interface';
import { ResizerService } from './resizer.service';

const DATAGRID_MIN_HEIGHT = 180;
const DATAGRID_MIN_WIDTH = 300;
const DATAGRID_BOTTOM_PADDING = 20;
const DATAGRID_PAGINATION_HEIGHT = 35;
const gridId = 'grid1';
const gridUid = 'slickgrid_124343';
const containerId = 'demo-container';

const gridOptionMock = {
  gridId,
  gridContainerId: `slickGridContainer-${gridId}`,
  autoResize: { containerId },
  enableAutoResize: true
} as GridOption;

const gridStub = {
  autosizeColumns: jest.fn(),
  getScrollbarDimensions: jest.fn(),
  getOptions: () => gridOptionMock,
  getUID: () => gridUid,
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

  beforeEach(() => {
    const div = document.createElement('div');
    div.innerHTML = template;
    document.body.appendChild(div);

    service = new ResizerService();
    service.init(gridStub);
  });

  afterEach(() => {
    service.dispose();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error when there is no grid object defined', () => {
    service = new ResizerService();
    service.init(null);
    expect(() => service.resizeGrid()).toThrowError('Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined');
  });

  it('should throw an error when there is no grid options defined', () => {
    service = new ResizerService();
    service.init({ getOptions: () => null });
    expect(() => service.resizeGrid()).toThrowError('Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined');
  });

  it('should trigger a grid resize when a window resize event occurs', () => {
    // arrange
    const newHeight = 500;
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
    const dimensionResult = { height: newHeight - DATAGRID_BOTTOM_PADDING, width: DATAGRID_MIN_WIDTH };

    // assert
    expect(gridSpy).toHaveBeenCalled();
    expect(serviceResizeSpy).toHaveBeenCalled();
    expect(window.innerHeight).not.toEqual(previousHeight);
    expect(serviceCalculateSpy).toReturnWith(dimensionResult);
    expect(lastDimensions).toEqual(dimensionResult);
    expect(subjectBeforeSpy).toHaveBeenCalledWith(true);
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
    const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
    window.dispatchEvent(new Event('resize'));
    service.calculateGridNewDimensions(gridOptionMock);

    // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
    expect(serviceCalculateSpy).toReturnWith({ height: (newHeight - DATAGRID_BOTTOM_PADDING), width: DATAGRID_MIN_WIDTH });
  });

  it('should calculate new dimensions minus a padding when "bottomPadding" is defined in "autoResize" and calculateGridNewDimensions is called', () => {
    const newHeight = 422;
    const inputBottomPadding = 13;
    const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
    window.dispatchEvent(new Event('resize'));
    service.calculateGridNewDimensions({ ...gridOptionMock, autoResize: { bottomPadding: inputBottomPadding } });

    // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
    expect(serviceCalculateSpy).toReturnWith({ height: (newHeight - inputBottomPadding), width: DATAGRID_MIN_WIDTH });
  });

  it('should calculate new dimensions minus the pagination height when pagination is enabled and resizeGrid is called with a delay', (done) => {
    const newHeight = 440;
    const newOptions = { ...gridOptionMock, enablePagination: true };
    const newGridStub = { ...gridStub, getOptions: () => newOptions };
    service.init(newGridStub);
    const serviceCalculateSpy = jest.spyOn(service, 'calculateGridNewDimensions');

    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
    window.dispatchEvent(new Event('resize'));
    service.resizeGrid(100).then((newGridDimensions) => {
      // same comment as previous test, the height dimension will work because calculateGridNewDimensions() uses "window.innerHeight"
      const calculatedDimensions = { height: (newHeight - DATAGRID_BOTTOM_PADDING - DATAGRID_PAGINATION_HEIGHT), width: DATAGRID_MIN_WIDTH };
      expect(serviceCalculateSpy).toReturnWith(calculatedDimensions);
      expect(newGridDimensions).toEqual({ ...calculatedDimensions, heightWithPagination: (calculatedDimensions.height + DATAGRID_PAGINATION_HEIGHT) });
      done();
    });
  });

  it('should calculate new dimensions by using the container dimensions (instead of the window dimensions) when calculateAvailableSizeBy is set to container', () => {
    const newHeight = 500;
    const spy = jest.spyOn(service, 'calculateGridNewDimensions');

    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight });
    window.dispatchEvent(new Event('resize'));
    service.calculateGridNewDimensions({ ...gridOptionMock, autoResize: { calculateAvailableSizeBy: 'container' } });

    // with JSDOM the height is always 0 so we can assume that the height will be the minimum height (without the padding)
    expect(spy).toReturnWith({ height: DATAGRID_MIN_HEIGHT, width: DATAGRID_MIN_WIDTH });
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
});
