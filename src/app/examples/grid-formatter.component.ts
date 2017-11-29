import { Component, OnInit } from '@angular/core';
import { Column, FieldType, Formatter, Formatters, GridExtraService, GridOption } from './../modules/angular-slickgrid';

// create my custom Formatter with the Formatter type
const myCustomCheckmarkFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
  value ? `<i class="fa fa-fire" aria-hidden="true"></i>` : '<i class="fa fa-snowflake-o" aria-hidden="true"></i>';

@Component({
  templateUrl: './grid-formatter.component.html'
})
export class GridFormatterComponent implements OnInit {
  title = 'Example 2: Grid with Formatters';
  subTitle = `
    Grid with Custom and/or included Slickgrid Formatters (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Formatters" target="_blank">Wiki link</a>).
  `;

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
    this.columnDefinitions = [
      {id: 'title', name: 'Title', field: 'title', sortable: true, type: FieldType.string},
      {id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number},
      {id: 'complete', name: '% Complete', field: 'percentComplete', formatter: Formatters.percentCompleteBar, type: FieldType.number, sortable: true},
      {id: 'percent2', name: '% Complete', field: 'percentComplete2', formatter: Formatters.progressBar, type: FieldType.number, sortable: true},
      {id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso, sortable: true, type: FieldType.dateIso },
      {id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso, sortable: true, type: FieldType.date },
      {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', formatter: myCustomCheckmarkFormatter, type: FieldType.number, sortable: true}
    ];
    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      }
    };

    // mock a dataset
    this.dataset = [];
    for (let i = 0; i < 500; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentComplete2: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        effortDriven: (i % 5 === 0)
      };
    }
  }
}
