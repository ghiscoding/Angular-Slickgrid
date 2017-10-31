import { Component, OnInit } from '@angular/core';
import { Formatters } from './../modules/angular-slickgrid';
import { Column, FieldType, Formatter, FormElementType, GridOption } from './../modules/angular-slickgrid/models/index';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

@Component({
  templateUrl: './grid-clientside.component.html'
})
export class GridClientSideComponent implements OnInit {
  title = 'Client Side Sort/Filter';
  subTitle = `
  Sort/Filter on client side only using SlickGrid DataView
  <br/>
  <ul class="small">
    <li>Support multi-sort (by default), hold "Shift" key and click on the next column to sort.
    <li>All column types support the following operators: (>, >=, <, <=, <>, !=, =, ==, *)
    <ul>
      <li>Example: >100 ... >=2001-01-01 ... >02/28/17</li>
      <li><b>Note:</b> For filters to work properly (default is string), make sure to provide a FieldType (type is against the dataset, not the Formatter)</li>
    </ul>
    <li>Date Filters</li>
    <ul>
      <li>FieldType of dateUtc/date (from dataset) can use an extra option of "filterSearchType" to let user filter more easily. For example, in the "UTC Date" field below, you can type "&gt;02/28/2017", also when dealing with UTC you have to take the time difference in consideration.</li>
    </ul>
    <li>On String filters, (*) can be used as startsWith (Hello* => matches "Hello Word") ... endsWith (*Doe => matches: "John Doe")</li>
  </ul>
`;

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', filterable: true, sortable: true, type: FieldType.string },
      { id: 'duration', name: 'Duration (days)', field: 'duration', filterable: true, sortable: true, type: FieldType.number },
      { id: 'complete', name: '% Complete', field: 'percentComplete', formatter: Formatters.percentCompleteBar, type: FieldType.number, filterable: true, sortable: true },
      { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso, filterable: true, sortable: true, type: FieldType.date },
      { id: 'usDateShort', name: 'US Date Short', field: 'usDateShort', filterable: true, sortable: true, type: FieldType.dateUsShort },
      { id: 'utcDate', name: 'UTC Date', field: 'utcDate', formatter: Formatters.dateTimeIsoAmPm, filterable: true, sortable: true, minWidth: 115, type: FieldType.dateUtc, filterSearchType: FieldType.dateTimeIso },
      { id: 'utcDate2', name: 'UTC Date (filterSearchType: dateUS)', field: 'utcDate', filterable: true, sortable: true, minWidth: 115, type: FieldType.dateUtc, filterSearchType: FieldType.dateUs },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', maxWidth: 80, formatter: Formatters.checkmark,
        type: FieldType.boolean,
        sortable: true,
        filterable: true,
        filter: {
          searchTerm: '', // default selection
          type: FormElementType.select,
          selectOptions: [ { value: '', label: '' }, { value: true, label: 'true' }, { value: false, label: 'false' } ]
        }
      }
    ];
    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableFiltering: true,
      enableCellNavigation: true
    };

    // mock a dataset
    this.dataset = [];
    for (let i = 0; i < 1000; i++) {
      const randomYear = randomBetween(2000, 2025);
      const randomYearShort = randomBetween(10, 25);
      const randomMonth = randomBetween(1, 12);
      const randomMonthStr = (randomMonth < 10) ? `0${randomMonth}` : randomMonth;
      const randomDay = randomBetween(10, 28);
      const randomPercent = randomBetween(0, 100);
      const randomHour = randomBetween(10, 23);
      const randomTime = randomBetween(10, 59);

      this.dataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),          // provide a Date format
        usDateShort: `${randomMonth}/${randomDay}/${randomYearShort}`, // provide a date US Short in the dataset
        utcDate: `${randomYear}-${randomMonthStr}-${randomDay}T${randomHour}:${randomTime}:${randomTime}Z`,
        effortDriven: (i % 3 === 0)
      };
    }
  }
}
