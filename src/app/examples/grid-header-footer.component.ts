import { Component, OnInit } from '@angular/core';
import { Column, GridOption, Formatters } from './../modules/angular-slickgrid';

const NB_ITEMS = 995;

@Component({
  template: `<button (click)="clickMe()">I'm a button from an Angular component (click me)</button>
    <div *ngIf="clickedTimes">You've clicked me {{ clickedTimes }} time(s)</div>`,
  selector: 'custom-footer',
})
export class CustomFooterComponent {
  clickedTimes = 0;

  clickMe() {
    this.clickedTimes++;
  }
}

@Component({
  templateUrl: './grid-header-footer.component.html',
})
export class GridHeaderFooterComponent implements OnInit {
  title = 'Example 34: Custom header & footer Templates';
  subTitle = `
    Basic Grid with templates for custom headers and footers
    <ul>
      <li>Pass in custom templates to be rendered at predefined header and footer destinations</li>
    </ul>
  `;

  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset!: any[];
  hideSubTitle = false;

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', sortable: true },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true },
      { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso },
      { id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', sortable: true },
    ];
    this.gridOptions = {
      enableAutoResize: false,
      enableSorting: true,
      gridHeight: 225,
      gridWidth: 800,
    };

    this.dataset = this.mockData(NB_ITEMS);
  }

  mockData(count: number) {
    // mock a dataset
    const mockDataset = [];
    for (let i = 0; i < count; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 29);
      const randomPercent = Math.round(Math.random() * 100);

      mockDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        start: new Date(randomYear, randomMonth + 1, randomDay),
        finish: new Date(randomYear + 1, randomMonth + 1, randomDay),
        effortDriven: i % 5 === 0,
      };
    }

    return mockDataset;
  }
}
