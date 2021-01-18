import { TranslateService } from '@ngx-translate/core';

import { EmptyWarning, GridOption, SlickGrid } from '../../models/index';
import { SlickEmptyWarningComponent } from '../slick-empty-warning.component';
import { TranslateServiceStub } from '../../../../../../test/translateServiceStub';

const GRID_UID = 'slickgrid_123456';

const mockGridOptions = {
  enableTranslate: false,
  frozenColumn: 0,
} as GridOption;

const gridStub = {
  getGridPosition: () => mockGridOptions,
  getOptions: () => mockGridOptions,
  getUID: () => GRID_UID,
  registerPlugin: jest.fn(),
} as unknown as SlickGrid;

describe('Slick-Empty-Warning Component', () => {
  let component: SlickEmptyWarningComponent;
  let div: HTMLDivElement;
  let translate: TranslateService;

  beforeEach(() => {
    div = document.createElement('div');
    const paneLeft = document.createElement('div');
    paneLeft.className = 'slick-pane slick-pane-top slick-pane-left';
    paneLeft.style.height = '44px';
    const paneRight = document.createElement('div');
    paneRight.className = 'slick-pane slick-pane-top slick-pane-right';
    paneRight.style.height = '44px';
    const canvasLeft = document.createElement('div');
    const canvasRight = document.createElement('div');
    canvasLeft.className = 'grid-canvas grid-canvas-left';
    canvasRight.className = 'grid-canvas grid-canvas-right';
    div.className = `slickgrid-container ${GRID_UID}`;
    div.appendChild(paneLeft);
    div.appendChild(paneRight);
    paneLeft.appendChild(canvasLeft);
    paneRight.appendChild(canvasRight);
    document.body.appendChild(div);

    translate = new TranslateServiceStub() as unknown as TranslateService;

    mockGridOptions.emptyDataWarning = {
      message: 'No data to display.',
      messageKey: 'EMPTY_DATA_WARNING_MESSAGE'
    };
  });

  describe('Integration Tests', () => {
    afterEach(() => {
      // clear all the spyOn mocks to not influence next test
      jest.clearAllMocks();
      component.dispose();
    });

    it('should expect the Slick-Empty-Warning to return False when calling the "showEmptyDataMessage" method without a grid object defined', () => {
      component = new SlickEmptyWarningComponent();
      const output = component.showEmptyDataMessage(false);

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(output).toBeFalse();
    });

    it('should expect the Slick-Empty-Warning to be created and NOT be rendered when passing False and component was never rendered', () => {
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(false);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeFalsy();
      expect(componentRightElm).toBeFalsy();
    });

    it('should expect the Slick-Empty-Warning to be created in both viewports and rendered and passing true', () => {
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(true);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('block');
      expect(componentRightElm.style.display).toBe('block');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
    });

    it('should expect the Slick-Empty-Warning to be created but not shown after calling the method twice with False on 2nd time', () => {
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(true);
      component.showEmptyDataMessage(false);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('none');
      expect(componentRightElm.style.display).toBe('none');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
    });

    it('should expect the Slick-Empty-Warning to be created in both viewports when using Frozen Grid but NOT displayed on left when "hideFrozenLeftWarning" flag is enabled', () => {
      mockGridOptions.frozenColumn = 2;
      (mockGridOptions.emptyDataWarning as EmptyWarning).hideFrozenLeftWarning = true;
      (mockGridOptions.emptyDataWarning as EmptyWarning).hideFrozenRightWarning = false;
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(true);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('none');
      expect(componentRightElm.style.display).toBe('block');
      expect(componentLeftElm.style.marginLeft).toBe('0px');
      expect(componentRightElm.style.marginLeft).toBe('0px');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
    });

    it('should expect the Slick-Empty-Warning to be created and use different left margin when "leftViewportMarginLeft" is set', () => {
      mockGridOptions.frozenColumn = -1;
      (mockGridOptions.emptyDataWarning as EmptyWarning).leftViewportMarginLeft = '40%';
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(true);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('block');
      expect(componentRightElm.style.display).toBe('block');
      expect(componentLeftElm.style.marginLeft).toBe('40%');
      expect(componentRightElm.style.marginLeft).toBe('0px');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
    });

    it('should expect the Slick-Empty-Warning to be created with proper height when defining a grid that has the "autoHeight" grid option', () => {
      mockGridOptions.frozenColumn = -1;
      (mockGridOptions.emptyDataWarning as EmptyWarning).leftViewportMarginLeft = '40%';
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      mockGridOptions.autoHeight = true;
      mockGridOptions.rowHeight = 55;
      component.showEmptyDataMessage(true);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;
      const gridPaneElm = document.querySelector<HTMLDivElement>('.slick-pane.slick-pane-top.slick-pane-left');

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('block');
      expect(componentRightElm.style.display).toBe('block');
      expect(componentLeftElm.style.marginLeft).toBe('40%');
      expect(componentRightElm.style.marginLeft).toBe('0px');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
      expect(gridPaneElm.style.minHeight).toBe('44px');
      expect(gridPaneElm.style.height).toBe('44px');
    });

    it('should expect the Slick-Empty-Warning to be created with calculated height including preHeader & filter headerRow when they are both defined in the grid options with "autoHeight" as well', () => {
      mockGridOptions.frozenColumn = -1;
      (mockGridOptions.emptyDataWarning as EmptyWarning).leftViewportMarginLeft = '40%';
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      mockGridOptions.autoHeight = true;
      mockGridOptions.createPreHeaderPanel = true;
      mockGridOptions.enableFiltering = true;
      mockGridOptions.rowHeight = 55;
      mockGridOptions.preHeaderPanelHeight = 33;
      mockGridOptions.headerRowHeight = 40;
      component.showEmptyDataMessage(true);
      component.showEmptyDataMessage(false);
      component.showEmptyDataMessage(true);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;
      const gridPaneElm = document.querySelector<HTMLDivElement>('.slick-pane.slick-pane-top.slick-pane-left');

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('block');
      expect(componentRightElm.style.display).toBe('block');
      expect(componentLeftElm.style.marginLeft).toBe('40%');
      expect(componentRightElm.style.marginLeft).toBe('0px');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
      expect(gridPaneElm.style.minHeight).toBe('117px');
      expect(gridPaneElm.style.height).toBe('44px');
    });

    it('should expect the Slick-Empty-Warning to be created when defining a grid that has the "autoHeight" grid option but hidden when calling it the show warning with True then False', () => {
      mockGridOptions.frozenColumn = -1;
      (mockGridOptions.emptyDataWarning as EmptyWarning).leftViewportMarginLeft = '40%';
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      mockGridOptions.autoHeight = true;
      mockGridOptions.createPreHeaderPanel = false;
      mockGridOptions.enableFiltering = false;
      mockGridOptions.rowHeight = 55;
      component.showEmptyDataMessage(true);
      component.showEmptyDataMessage(false);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;
      const gridPaneElm = document.querySelector<HTMLDivElement>('.slick-pane.slick-pane-top.slick-pane-left');

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('none');
      expect(componentRightElm.style.display).toBe('none');
      expect(componentLeftElm.style.marginLeft).toBe('40%');
      expect(componentRightElm.style.marginLeft).toBe('0px');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
      expect(gridPaneElm.style.minHeight).toBe('44px');
      expect(gridPaneElm.style.height).toBe('44px');
    });

    it('should expect the Slick-Empty-Warning to be created and use different left margin when "rightViewportMarginLeft" is set', () => {
      mockGridOptions.frozenColumn = -1;
      (mockGridOptions.emptyDataWarning as EmptyWarning).rightViewportMarginLeft = '40%';
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(mockGridOptions);

      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(true);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('block');
      expect(componentRightElm.style.display).toBe('block');
      expect(componentLeftElm.style.marginLeft).toBe('0px');
      expect(componentRightElm.style.marginLeft).toBe('40%');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
    });

    it('should expect the Slick-Empty-Warning to be created in both viewports and use different left margin when "frozenLeftViewportMarginLeft" is set', () => {
      mockGridOptions.frozenColumn = 2;
      (mockGridOptions.emptyDataWarning as EmptyWarning).leftViewportMarginLeft = '40%';
      (mockGridOptions.emptyDataWarning as EmptyWarning).frozenLeftViewportMarginLeft = '15px';
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(true);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('block');
      expect(componentRightElm.style.display).toBe('block');
      expect(componentLeftElm.style.marginLeft).toBe('15px');
      expect(componentRightElm.style.marginLeft).toBe('0px');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
    });

    it('should expect the Slick-Empty-Warning to be created in both viewports and use different left margin when "frozenRightViewportMarginLeft" is set', () => {
      mockGridOptions.frozenColumn = 2;
      (mockGridOptions.emptyDataWarning as EmptyWarning).leftViewportMarginLeft = '40%';
      (mockGridOptions.emptyDataWarning as EmptyWarning).frozenRightViewportMarginLeft = '22px';
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(true);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('block');
      expect(componentRightElm.style.display).toBe('block');
      expect(componentLeftElm.style.marginLeft).toBe('0px');
      expect(componentRightElm.style.marginLeft).toBe('22px');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
    });

    it('should expect the Slick-Empty-Warning to be created in both viewports when using Frozen Grid but NOT displayed on right when "hideFrozenRightWarning" flag is enabled', () => {
      mockGridOptions.frozenColumn = 2;
      (mockGridOptions.emptyDataWarning as EmptyWarning).hideFrozenLeftWarning = false;
      (mockGridOptions.emptyDataWarning as EmptyWarning).hideFrozenRightWarning = true;
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(true);

      const componentLeftElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-left .slick-empty-data-warning') as HTMLSelectElement;
      const componentRightElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas.grid-canvas-right .slick-empty-data-warning') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentLeftElm).toBeTruthy();
      expect(componentLeftElm.style.display).toBe('block');
      expect(componentRightElm.style.display).toBe('none');
      expect(componentLeftElm.textContent).toBe('No data to display.');
      expect(componentRightElm.textContent).toBe('No data to display.');
    });

    it('should expect the Slick-Empty-Warning to change some options and display a different message when provided as an option', () => {
      const mockOptions = { message: '<span class="fa fa-warning"></span> No Record found.', className: 'custom-class', marginTop: 22, marginLeft: 11 };
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(true, mockOptions);

      const componentElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas .custom-class') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentElm).toBeTruthy();
      expect(componentElm.style.display).toBe('block');
      expect(componentElm.classList.contains('custom-class')).toBeTruthy();
      expect(componentElm.innerHTML).toBe('<span class="fa fa-warning"></span> No Record found.');
    });

    it('should expect the Slick-Empty-Warning provide html text and expect script to be sanitized out of the final html', () => {
      const mockOptions = { message: `<script>alert('test')></script><span class="fa fa-warning"></span> No Record found.`, className: 'custom-class', marginTop: 22, marginLeft: 11 };
      component = new SlickEmptyWarningComponent();
      component.grid = gridStub;
      component.showEmptyDataMessage(true, mockOptions);

      const componentElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas .custom-class') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentElm).toBeTruthy();
      expect(componentElm.style.display).toBe('block');
      expect(componentElm.classList.contains('custom-class')).toBeTruthy();
      expect(componentElm.innerHTML).toBe('<span class="fa fa-warning"></span> No Record found.');
    });

    it('should expect the Slick-Empty-Warning message to be translated to French when providing a Translater Service and "messageKey" property', () => {
      mockGridOptions.enableTranslate = true;
      translate.use('fr');

      component = new SlickEmptyWarningComponent(translate);
      component.grid = gridStub;
      component.showEmptyDataMessage(true);
      const componentElm = document.querySelector<HTMLSelectElement>('div.slickgrid_123456 .grid-canvas .slick-empty-data-warning') as HTMLSelectElement;

      expect(component).toBeTruthy();
      expect(component.constructor).toBeDefined();
      expect(componentElm).toBeTruthy();
      expect(componentElm.style.display).toBe('block');
      expect(componentElm.textContent).toBe('Aucune donnée à afficher.');
    });
  });
});
