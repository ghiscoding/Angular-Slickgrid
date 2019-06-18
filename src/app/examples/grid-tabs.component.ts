import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularGridInstance, Column, GridOption, Filters } from '../modules/angular-slickgrid';

const URL_CUSTOMERS = 'assets/data/customers_100.json';

@Component({
  templateUrl: './grid-tabs.component.html'
})
@Injectable()
export class GridTabsComponent implements OnInit {
  title = 'Example 24: Grids in Bootstrap Tabs';
  subTitle = `This example demonstrate the creation of multiple grids in Bootstrap Tabs
   <ol>
    <li>Regular mocked data with javascript</li>
    <li>Load dataset through Http-Client. Also note we need to call a "resizeGrid()" after focusing on this tab</li>
  </ol>`;

  angularGrid2: AngularGridInstance;
  columnDefinitions1: Column[];
  columnDefinitions2: Column[];
  gridOptions1: GridOption;
  gridOptions2: GridOption;
  dataset1: any[];
  dataset2: any[];

  constructor(private http: HttpClient) { }

  angularGrid2Ready(angularGrid: AngularGridInstance) {
    this.angularGrid2 = angularGrid;
  }

  ngOnInit(): void {
    this.defineGrid1();
    this.defineGrid2();

    // mock some data (different in each dataset)
    this.dataset1 = this.mockData();

    // load data with Http-Client
    this.http.get((URL_CUSTOMERS)).subscribe((data: any[]) => this.dataset2 = data);
  }

  // Grid2 definition
  defineGrid1() {
    this.columnDefinitions1 = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, minWidth: 100 },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, minWidth: 100 },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true, minWidth: 100 },
      { id: 'start', name: 'Start', field: 'start', minWidth: 100 },
      { id: 'finish', name: 'Finish', field: 'finish', minWidth: 100 },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', sortable: true, minWidth: 100 }
    ];
    this.gridOptions1 = {
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableSorting: true
    };
  }

  // Grid2 definition
  defineGrid2() {
    this.columnDefinitions2 = [
      { id: 'name', name: 'Name', field: 'name', filterable: true, sortable: true, },
      {
        id: 'gender', name: 'Gender', field: 'gender', filterable: true, sortable: true,
        filter: {
          model: Filters.singleSelect,
          collection: [{ value: '', label: '' }, { value: 'male', label: 'male' }, { value: 'female', label: 'female' }]
        }
      },
      { id: 'company', name: 'Company', field: 'company', filterable: true, sortable: true }
    ];

    this.gridOptions2 = {
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableFiltering: true,
      enableSorting: true
    };
  }

  mockData() {
    // mock a dataset
    const mockDataset = [];
    for (let i = 0; i < 1000; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      mockDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        start: `${randomMonth}/${randomDay}/${randomYear}`,
        finish: `${randomMonth}/${randomDay}/${randomYear}`,
        effortDriven: (i % 5 === 0)
      };
    }

    return mockDataset;
  }

  resizeGrid2() {
    this.angularGrid2.resizerService.resizeGrid();
  }
}
