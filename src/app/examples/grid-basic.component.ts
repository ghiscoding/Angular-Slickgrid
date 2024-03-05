import { Component, OnDestroy, OnInit } from '@angular/core';
import { Column, GridOption, Formatters, AngularGridInstance } from './../modules/angular-slickgrid';

const NB_ITEMS = 995;

@Component({
  templateUrl: './grid-basic.component.html'
})
export class GridBasicComponent implements OnDestroy, OnInit {
  private _darkModeGrid1 = false;
  title = 'Example 1: Basic Grids';
  subTitle = `
    Basic Grids with fixed sizes (800 x 225) set by "gridHeight" &amp; "gridWidth"
    <ul>
      <li><a href="https://ghiscoding.gitbook.io/angular-slickgrid/getting-started/quick-start" target="_blank">Wiki HOWTO link</a></li>
    </ul>
  `;

  angularGrid1!: AngularGridInstance;
  columnDefinitions1: Column[] = [];
  columnDefinitions2: Column[] = [];
  gridOptions1!: GridOption;
  gridOptions2!: GridOption;
  dataset1!: any[];
  dataset2!: any[];

  ngOnInit(): void {
    this.prepareGrid();
  }

  ngOnDestroy() {
    document.querySelector('.panel-wm-content')!.classList.remove('dark-mode');
    document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'light';
  }

  angularGridReady1(angularGrid: AngularGridInstance) {
    this.angularGrid1 = angularGrid;
  }

  isBrowserDarkModeEnabled() {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  prepareGrid() {
    this.columnDefinitions1 = [
      { id: 'title', name: 'Title', field: 'title', sortable: true },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true },
      { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso },
      { id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', sortable: true }
    ];
    this._darkModeGrid1 = this.isBrowserDarkModeEnabled();
    this.gridOptions1 = {
      darkMode: this._darkModeGrid1,
      enableAutoResize: false,
      enableSorting: true,
      gridHeight: 225,
      gridWidth: 800,
    };

    // copy the same Grid Options and Column Definitions to 2nd grid
    // but also add Pagination in this grid
    this.columnDefinitions2 = this.columnDefinitions1;
    this.gridOptions2 = {
      ...this.gridOptions1,
      ...{
        darkMode: false,
        enablePagination: true,
        pagination: {
          pageSizes: [5, 10, 20, 25, 50],
          pageSize: 5
        },
      }
    };

    // mock some data (different in each dataset)
    this.dataset1 = this.mockData(NB_ITEMS);
    this.dataset2 = this.mockData(NB_ITEMS);
  }

  mockData(count: number) {
    // mock a dataset
    const mockDataset = [];
    for (let i = 0; i < count; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      mockDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        start: new Date(randomYear, randomMonth + 1, randomDay),
        finish: new Date(randomYear + 1, randomMonth + 1, randomDay),
        effortDriven: (i % 5 === 0)
      };
    }

    return mockDataset;
  }

  toggleDarkModeGrid1() {
    this._darkModeGrid1 = !this._darkModeGrid1;
    if (this._darkModeGrid1) {
      document.querySelector('.grid-container1')?.classList.add('dark-mode');
    } else {
      document.querySelector('.grid-container1')?.classList.remove('dark-mode');
    }
    this.angularGrid1.slickGrid?.setOptions({ darkMode: this._darkModeGrid1 });
  }
}
