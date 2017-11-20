import { Component, OnInit } from '@angular/core';
import { Column, FieldType, Formatter, Formatters, GridExtraService, GridOption } from './../modules/angular-slickgrid';

@Component({
  selector: 'grid-single-selection',
  templateUrl: './grid-single-selection.component.html'
})
export class GridSingleSelectionComponent implements OnInit {
  title = 'Example 10: Grid with Row Selection';
  subTitle = `
    Row selection, single or multi-select (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Row-Selection" target="_blank">Wiki link</a>).
  `;

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  gridObj: any;
  dataviewObj: any;
  isMultiSelect = true;

  constructor(private gridExtraService: GridExtraService) {}

  ngOnInit(): void {
    this.prepareGrid();
  }

  prepareGrid() {
    this.columnDefinitions = [
      {id: 'title', name: 'Title', field: 'title', sortable: true, type: FieldType.string},
      {id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number},
      {id: 'complete', name: '% Complete', field: 'percentComplete', formatter: Formatters.percentCompleteBar, type: FieldType.number, sortable: true},
      {id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso, sortable: true, type: FieldType.dateIso },
      {id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso, sortable: true, type: FieldType.date },
      {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', formatter: Formatters.checkmark, type: FieldType.number, sortable: true}
    ];
    this.gridOptions = {
      enableAutoResize: false,
      enableCellNavigation: true,
      enableCheckboxSelector: false
    };

    this.dataset = this.prepareData();
  }

  prepareData() {
    // mock a dataset
    const mockDataset = [];
    for (let i = 0; i < 500; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      mockDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        effortDriven: (i % 5 === 0)
      };
    }
    return mockDataset;
  }

  gridReady(grid) {
    this.gridObj = grid;
  }
  dataviewReady(dataview) {
    this.dataviewObj = dataview;
  }
}
