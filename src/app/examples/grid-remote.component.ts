import 'slickgrid/lib/jquery.jsonp-2.4.min';
import 'slickgrid/slick.remotemodel'; // SlickGrid Remote Plugin

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularGridInstance, Column, Formatter, GridOption  } from './../modules/angular-slickgrid';

declare var Slick: any;

const brandFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  return dataContext && dataContext.brand && dataContext.brand.name || '';
};

const mpnFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  let link = '';
  if (dataContext && dataContext.octopart_url && dataContext.mpn) {
    link = `<a href="${dataContext.octopart_url}" target="_blank">${dataContext.mpn}</a>`;
  }
  return link;
};

@Component({
  templateUrl: './grid-remote.component.html'
})
export class GridRemoteComponent implements OnDestroy, OnInit {
  private _eventHandler: any = new Slick.EventHandler();

  title = 'Example 18: Octopart Catalog Search - Remote Model Plugin';
  subTitle = `
    This example demonstrates how to use "slick.remotemodel.js" or any Remote implementation through an external Remote Service
    <ul>
      <li>
        Your browser (Chrome) might block access to the Octopart query, if you get "block content" then just unblock it
        or try with different browser like Firefox or Edge
      </li>
      <li>If the demo throws some errors, try again later (there's a limit per day).</li>
      <li>
        Uses <a href="https://github.com/6pac/SlickGrid/blob/master/slick.remotemodel.js" target="_blank">slick.remotemodel.js</a>
        which is hooked up to load search results from Octopart, but can easily be extended
        to support any JSONP-compatible backend that accepts paging parameters.
      </li>
      <li>
        This demo implements a custom DataView, however please note that you are on your own to implement all necessary DataView methods
        for Sorting, Filtering, etc...
      </li>
      <li>
        Soure code for this example is available <a href="https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/grid-remote.component.ts" target="_blank">here</a>
      </li>
    </ul>
  `;

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  customDataView: any;
  gridObj: any;
  gridOptions: GridOption;
  dataset = [];
  loaderDataView: any;
  loading = false; // spinner when loading data
  search = 'switch';

  constructor() {
    this.loaderDataView = new Slick.Data.RemoteModel();
    this.customDataView = this.loaderDataView && this.loaderDataView.data;
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid; // grid object
    this.loaderDataView.setSort('score', -1);
    this.gridObj.setSortColumn('score', false);

    // notify of a change to preload the first page
    this.gridObj.onViewportChanged.notify();
  }

  ngOnDestroy() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();
  }

  ngOnInit(): void {
    this.defineGrid();
    this.hookAllLoaderEvents();
    this.loaderDataView.setSearch(this.search);
  }

  defineGrid() {
    this.columnDefinitions = [
      { id: 'mpn', name: 'MPN', field: 'mpn', formatter: mpnFormatter, width: 100, sortable: true },
      { id: 'brand', name: 'Brand', field: 'brand.name', formatter: brandFormatter, width: 100, sortable: true },
      { id: 'short_description', name: 'Description', field: 'short_description', width: 520 },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableCellNavigation: true,
      enableColumnReorder: false,
      enableGridMenu: false,
      multiColumnSort: false
    };
  }

  hookAllLoaderEvents() {
    if (this._eventHandler && this._eventHandler.subscribe && this.loaderDataView && this.loaderDataView.onDataLoading && this.loaderDataView.onDataLoaded) {
      this._eventHandler.subscribe(this.loaderDataView.onDataLoading, (e: Event, args: any) => {
        this.loading = true;
      });

      this._eventHandler.subscribe(this.loaderDataView.onDataLoaded, (e: Event, args: any) => {
        if (args && this.gridObj && this.gridObj.invalidateRow && this.gridObj.updateRowCount && this.gridObj.render) {
          for (let i = args.from; i <= args.to; i++) {
            this.gridObj.invalidateRow(i);
          }
          this.gridObj.updateRowCount();
          this.gridObj.render();
          this.loading = false;
        }
      });
    }
  }

  onSort(e, args) {
    if (this.gridObj && this.gridObj.getViewport && this.loaderDataView && this.loaderDataView.ensureData && this.loaderDataView.setSort) {
      const vp = this.gridObj.getViewport();
      if (args && args.sortCol && args.sortCol.field) {
        this.loaderDataView.setSort(args.sortCol.field, args.sortAsc ? 1 : -1);
      }
      this.loaderDataView.ensureData(vp.top, vp.bottom);
    }
  }

  onViewportChanged(e, args) {
    if (this.gridObj && this.gridObj.getViewport && this.loaderDataView && this.loaderDataView.ensureData) {
      const vp = this.gridObj.getViewport();
      this.loaderDataView.ensureData(vp.top, vp.bottom);
    }
  }

  searchChanged(newValue: string) {
    if (newValue && this.gridObj && this.gridObj.getViewport && this.loaderDataView && this.loaderDataView.ensureData && this.loaderDataView.setSearch) {
      const vp = this.gridObj.getViewport();
      this.loaderDataView.setSearch(newValue);
      this.loaderDataView.ensureData(vp.top, vp.bottom);
    }
  }
}
