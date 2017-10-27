import { Component, OnInit } from '@angular/core';
import { Editors, Formatters } from './../modules/angular-slickgrid';
import { OnCellClickArgs, Column, FieldType, Formatter, GridOption } from './../modules/angular-slickgrid/models';

@Component({
  templateUrl: './grid-formatter.component.html'
})
export class GridEditorComponent implements OnInit {
  title = 'Example 4: Editors';
  subTitle = `inline editors (not yet implement) and onCellClick editor (execute an action, e.g: open a modal window)`;

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'id', field: 'id',
        formatter: Formatters.editPencil,
        maxWidth: 30,
        onCellClick: (args: OnCellClickArgs) => {
          console.log(args);
          console.log(this);
        }
      },
      { id: 'title', name: 'Title', field: 'title', sortable: true, type: FieldType.string, editor: Editors.longText },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number, editor: Editors.text },
      { id: 'complete', name: '% Complete', field: 'percentComplete', formatter: Formatters.percentCompleteBar, type: FieldType.number, editor: Editors.integer, sortable: true },
      { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso, sortable: true, type: FieldType.dateIso, editor: Editors.date },
      { id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso, sortable: true, type: FieldType.date },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', formatter: Formatters.checkmark, type: FieldType.number, sortable: true }
    ];

    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      editable: true,
      enableCellNavigation: true,
      asyncEditorLoading: false,
      autoEdit: true
    };

    // mock a dataset
    this.dataset = [];
    for (let i = 0; i < 5; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
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
  }
}
