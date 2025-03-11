import { faker } from '@faker-js/faker';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularGridInstance, Column, GridOption, SlickRowDetailView } from './../modules/angular-slickgrid';

import { type Distributor, Grid45DetailComponent, type OrderData } from './grid45-detail.component';
import { RowDetailPreloadComponent } from './rowdetail-preload.component';

const FAKE_SERVER_DELAY = 250;
const NB_ITEMS = 995;

@Component({
  styleUrls: ['grid45.component.scss'],
  templateUrl: './grid45.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class Grid45Component implements OnDestroy, OnInit {
  private _darkMode = false;
  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  angularGrid!: AngularGridInstance;
  dataset: Distributor[] = [];
  detailViewRowCount = 9;
  showSubTitle = true;
  isUsingInnerGridStatePresets = false;
  serverWaitDelay = FAKE_SERVER_DELAY;

  get rowDetailInstance(): SlickRowDetailView {
    return this.angularGrid.extensions.rowDetailView?.instance || {};
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  ngOnDestroy(): void {
    console.log('destroying row detail component');
    document.querySelector('.panel-wm-content')!.classList.remove('dark-mode');
    document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'light';
  }

  ngOnInit(): void {
    // define the grid options & columns and then create the grid itself
    this.defineGrid();

    // mock a dataset
    this.dataset = this.getData(NB_ITEMS);
  }

  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'companyId',
        name: 'ID',
        field: 'companyId',
        cssClass: 'text-end',
        minWidth: 50,
        maxWidth: 50,
        filterable: true,
        sortable: true,
        type: 'number',
      },
      {
        id: 'companyName',
        name: 'Company Name',
        field: 'companyName',
        width: 90,
        filterable: true,
        sortable: true,
      },
      {
        id: 'streetAddress',
        name: 'Street Address',
        field: 'streetAddress',
        minWidth: 120,
        filterable: true,
      },
      {
        id: 'city',
        name: 'City',
        field: 'city',
        minWidth: 120,
        filterable: true,
      },
      {
        id: 'zipCode',
        name: 'Zip Code',
        field: 'zipCode',
        minWidth: 120,
        filterable: true,
      },
      {
        id: 'country',
        name: 'Country',
        field: 'country',
        minWidth: 120,
        filterable: true,
      },
    ];

    this.gridOptions = {
      autoResize: {
        container: '#demo-container',
        autoHeight: false, // works with/without autoHeight
        bottomPadding: 20,
      },
      autoHeight: false,
      enableFiltering: true,
      enableRowDetailView: true,
      darkMode: this._darkMode,
      rowHeight: 33,
      rowDetailView: {
        process: (item: any) => this.simulateServerAsyncCall(item),
        loadOnce: false, // you can't use loadOnce with inner grid because only HTML template are re-rendered, not JS events
        useRowClick: false,
        // how many grid rows do we want to use for the row detail panel
        panelRows: this.detailViewRowCount,
        // optionally expose the functions that you want to use from within the row detail Child Component
        parent: this,
        // Preload View Template
        preloadComponent: RowDetailPreloadComponent,
        // ViewModel Template to load when row detail data is ready
        viewComponent: Grid45DetailComponent,
      },
    };
  }

  getData(count: number) {
    // mock a dataset
    const mockDataset: Distributor[] = [];
    for (let i = 0; i < count; i++) {
      mockDataset[i] = {
        id: i,
        companyId: i,
        companyName: faker.company.name(),
        city: faker.location.city(),
        streetAddress: faker.location.streetAddress(),
        zipCode: faker.location.zipCode('######'),
        country: faker.location.country(),
        orderData: [],
        isUsingInnerGridStatePresets: false,
      };
    }

    return mockDataset;
  }

  changeDetailViewRowCount() {
    if (this.angularGrid?.extensionService) {
      const options = this.rowDetailInstance.getOptions();
      if (options?.panelRows) {
        options.panelRows = this.detailViewRowCount; // change number of rows dynamically
        this.rowDetailInstance.setOptions(options);
      }
    }
  }

  changeUsingInnerGridStatePresets() {
    this.isUsingInnerGridStatePresets = !this.isUsingInnerGridStatePresets;
    this.closeAllRowDetail();
    return true;
  }

  closeAllRowDetail() {
    this.rowDetailInstance?.collapseAll();
  }

  redrawAllRowDetail() {
    this.rowDetailInstance?.redrawAllViewComponents(true);
  }

  /** Just for demo purposes, we will simulate an async server call and return more details on the selected row item */
  simulateServerAsyncCall(item: Distributor) {
    let orderData: OrderData[] = [];
    // let's mock some data but make it predictable for easier Cypress E2E testing
    if (item.id % 3) {
      orderData = [
        { orderId: '10261', shipCity: 'Rio de Janeiro', freight: 3.05, shipName: 'Que Delícia' },
        { orderId: '10267', shipCity: 'München', freight: 208.58, shipName: 'Frankenversand' },
        { orderId: '10281', shipCity: 'Madrid', freight: 2.94, shipName: 'Romero y tomillo' },
      ];
    } else if (item.id % 4) {
      orderData = [
        { orderId: '10251', shipCity: 'Lyon', freight: 41.34, shipName: 'Victuailles en stock' },
        { orderId: '10253', shipCity: 'Rio de Janeiro', freight: 58.17, shipName: 'Hanari Carnes' },
        { orderId: '10256', shipCity: 'Resende', freight: 13.97, shipName: 'Wellington Importadora' },
      ];
    } else if (item.id % 5) {
      orderData = [
        { orderId: '10265', shipCity: 'Strasbourg', freight: 55.28, shipName: 'Blondel père et fils' },
        { orderId: '10277', shipCity: 'Leipzig', freight: 125.77, shipName: 'Morgenstern Gesundkost' },
        { orderId: '10280', shipCity: 'Luleå', freight: 8.98, shipName: 'Berglunds snabbköp' },
        { orderId: '10295', shipCity: 'Reims', freight: 1.15, shipName: 'Vins et alcools Chevalier' },
      ];
    } else if (item.id % 2) {
      orderData = [
        { orderId: '10258', shipCity: 'Graz', freight: 140.51, shipName: 'Ernst Handel' },
        { orderId: '10270', shipCity: 'Oulu', freight: 136.54, shipName: 'Wartian Herkku' },
      ];
    } else {
      orderData = [{ orderId: '10255', shipCity: 'Genève', freight: 148.33, shipName: 'Richter Supermarkt' }];
    }

    // fill the template on async delay
    return new Promise((resolve) => {
      window.setTimeout(() => {
        const itemDetail = item;
        itemDetail.orderData = orderData;
        itemDetail.isUsingInnerGridStatePresets = this.isUsingInnerGridStatePresets;
        // resolve the data after delay specified
        resolve(itemDetail);
      }, this.serverWaitDelay);
    });
  }

  toggleDarkMode() {
    this._darkMode = !this._darkMode;
    this.toggleBodyBackground();
    this.angularGrid.slickGrid?.setOptions({ darkMode: this._darkMode });
    this.closeAllRowDetail();
  }

  toggleBodyBackground() {
    if (this._darkMode) {
      document.querySelector<HTMLDivElement>('.panel-wm-content')!.classList.add('dark-mode');
      document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'dark';
    } else {
      document.querySelector('.panel-wm-content')!.classList.remove('dark-mode');
      document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'light';
    }
  }

  toggleSubTitle() {
    this.showSubTitle = !this.showSubTitle;
    this.angularGrid.resizerService?.resizeGrid(1);
  }
}
