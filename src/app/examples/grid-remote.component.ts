import 'slickgrid/lib/jquery.jsonp-2.4.min';
import 'slickgrid/slick.remotemodel'; // SlickGrid Remote Plugin

import { Component, OnInit } from '@angular/core';
import { AngularGridInstance, Column, Formatter, GridOption  } from './../modules/angular-slickgrid';

declare var $: any;
declare var Slick: any;

const brandFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  return dataContext && dataContext.brand && dataContext.brand.name || '';
};

const mpnFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  let link = '';
  if (dataContext && dataContext.octopart_url && dataContext.mpn)  {
    link = `<a href="${dataContext.octopart_url}" target="_blank">${dataContext.mpn}</a>`;
  }
  return link;
};

@Component({
  templateUrl: './grid-remote.component.html'
})
export class GridRemoteComponent implements OnInit {
  title = 'Example 18: Remote Model Plugin';
  subTitle = `
  This example demonstrates how to use "slick.remotemodel.js" or any Remote implementation through an external Remote Service
  <ul>
    <li>
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

  constructor() {
    this.loaderDataView = new Slick.Data.RemoteModel();
    this.customDataView = this.loaderDataView && this.loaderDataView.data;
  }

  angularGridReady(angularGrid: any) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid; // grid object

    this.loaderDataView.setSort('score', -1);
    this.gridObj.setSortColumn('score', false);
    // load the first page
    this.gridObj.onViewportChanged.notify();
  }

  ngOnInit(): void {
    this.prepareDataGrid();
    this.hookAllLoaderEvents();
    this.hookSearch();
  }

  prepareDataGrid() {
    this.columnDefinitions = [
      {id: 'mpn', name: 'MPN', field: 'mpn', formatter: mpnFormatter, width: 100, sortable: true },
      {id: 'brand', name: 'Brand', field: 'brand.name', formatter: brandFormatter, width: 100, sortable: true },
      {id: 'short_description', name: 'Description', field: 'short_description', width: 520 },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableCellNavigation: true,
      enableColumnReorder: false
    };

    this.getData();
  }

  getData() {
    // Set up some test columns.
    const mockDataset = [];
    for (let i = 0; i < 500; i++) {
      mockDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: '5 days',
        percentComplete: Math.round(Math.random() * 100),
        start: '01/01/2009',
        finish: '01/05/2009',
        effortDriven: (i % 5 === 0)
      };
    }
    this.dataset = mockDataset;
  }

  hookAllLoaderEvents() {
    this.loaderDataView.onDataLoading.subscribe((e, args) => {
      this.loading = true;
   });

    this.loaderDataView.onDataLoaded.subscribe((e, args) => {
      for (let i = args.from; i <= args.to; i++) {
        this.gridObj.invalidateRow(i);
      }
      this.gridObj.updateRowCount();
      this.gridObj.render();
      this.loading = false;
     });
  }

  hookSearch() {
    $('#txtSearch').keyup((e) => {
      if (e.which === 13) {
        this.loaderDataView.setSearch(e.target.value);
        const vp = this.gridObj.getViewport();
        this.loaderDataView.ensureData(vp.top, vp.bottom);
      }
    });
    this.loaderDataView.setSearch($('#txtSearch').val());
  }

  onSort(e, args) {
    const vp = this.gridObj.getViewport();
    if (args && args.sortCol && args.sortCol.field) {
      this.loaderDataView.setSort(args.sortCol.field, args.sortAsc ? 1 : -1);
    }
    this.loaderDataView.ensureData(vp.top, vp.bottom);
  }

  onViewportChanged(e, args) {
    const vp = this.gridObj.getViewport();
    this.loaderDataView.ensureData(vp.top, vp.bottom);
  }
}
