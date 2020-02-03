import { Component, OnInit } from '@angular/core';
import { Column, GridOption } from './../modules/angular-slickgrid';

const NB_ITEMS = 995;

@Component({
  templateUrl: './grid-basic.component.html'
})
export class GridBasicComponent implements OnInit {
  title = 'Example 1: Basic Grids';
  subTitle = `
    Basic Grids with fixed sizes (800 x 225) set by "gridHeight" &amp; "gridWidth"
    <ul>
      <li><a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/HOWTO---Step-by-Step" target="_blank">Wiki HOWTO link</a></li>
    </ul>
  `;

  columnDefinitions1: Column[];
  columnDefinitions2: Column[];
  gridOptions1: GridOption;
  gridOptions2: GridOption;
  dataset1: any[];
  dataset2: any[];

  ngOnInit(): void {
    this.columnDefinitions1 = [
      { id: 'title', name: 'Title', field: 'title', sortable: true },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true },
      { id: 'start', name: 'Start', field: 'start' },
      { id: 'finish', name: 'Finish', field: 'finish' },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', sortable: true }
    ];
    this.gridOptions1 = {
      enableAutoResize: false,
      enableSorting: true,
    };

    // copy the same Grid Options and Column Definitions to 2nd grid
    // but also add Pagination in this grid
    this.columnDefinitions2 = this.columnDefinitions1;
    this.gridOptions2 = {
      ...this.gridOptions1,
      ...{
        enablePagination: true,
        pagination: {
          pageSizes: [5, 10, 15, 20, 25, 50, 75, 100],
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
        start: `${randomMonth}/${randomDay}/${randomYear}`,
        finish: `${randomMonth}/${randomDay}/${randomYear}`,
        effortDriven: (i % 5 === 0)
      };
    }

    return mockDataset;
  }
}
