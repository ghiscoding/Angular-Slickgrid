import { Subscription } from 'rxjs/Subscription';
import { CustomInputFilter } from './custom-inputFilter';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Column, FieldType, FilterType, Formatters, GridOption, GridStateChange, GridStateService, OperatorType } from './../modules/angular-slickgrid';
import { TranslateService } from '@ngx-translate/core';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const NB_ITEMS = 500;

@Component({
  templateUrl: './grid-clientside.component.html'
})
export class GridClientSideComponent implements OnInit {
  title = 'Example 4: Client Side Sort/Filter';
  subTitle = `
    Sort/Filter on client side only using SlickGrid DataView (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Sorting" target="_blank">Wiki link</a>)
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
      <li>Custom Filter are now possible, "Description" column below, is a customized InputFilter with different placeholder. See <a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Custom-Filter" target="_blank">Wiki - Custom Filter</a>
    </ul>
  `;

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  constructor(private gridStateService: GridStateService, private translate: TranslateService) {
  }

  ngOnInit(): void {
    // prepare a multiple-select array to filter with
    const multiSelectFilterArray = [];
    for (let i = 0; i < NB_ITEMS; i++) {
      multiSelectFilterArray.push({ value: i, label: i });
    }

    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', filterable: true, sortable: true, type: FieldType.string, minWidth: 45 },
      { id: 'description', name: 'Description', field: 'description', filterable: true, sortable: true, minWidth: 80,
        type: FieldType.string,
        filter: {
          type: FilterType.custom,
          customFilter: new CustomInputFilter() // create a new instance to make each Filter independent from each other
        }
      },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number, exportCsvForceToKeepAsString: true,
        minWidth: 55,
        filterable: true,
        filter: {
          collection: multiSelectFilterArray,
          type: FilterType.multipleSelect,
          searchTerms: [1, 33, 50], // default selection

          // we could add certain option(s) to the "multiple-select" plugin
          filterOptions: {
            maxHeight: 250,
            width: 175
          }
        }
      },
      { id: 'complete', name: '% Complete', field: 'percentComplete', formatter: Formatters.percentCompleteBar, minWidth: 70, type: FieldType.number, sortable: true,
        filterable: true, filter: { type: FilterType.compoundInput }
      },
      { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso, sortable: true, minWidth: 75, exportWithFormatter: true,
        type: FieldType.date, filterable: true, filter: { type: FilterType.compoundDate }
      },
      { id: 'usDateShort', name: 'US Date Short', field: 'usDateShort', sortable: true, minWidth: 70, width: 70,
        type: FieldType.dateUsShort, filterable: true, filter: { type: FilterType.compoundDate }
      },
      { id: 'utcDate', name: 'UTC Date', field: 'utcDate', formatter: Formatters.dateTimeIsoAmPm, sortable: true, minWidth: 115,
        type: FieldType.dateUtc, outputType: FieldType.dateTimeIsoAmPm, filterable: true, filter: { type: FilterType.compoundDate } },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', minWidth: 85, maxWidth: 85, formatter: Formatters.checkmark,
        type: FieldType.boolean,
        sortable: true,
        filterable: true,
        filter: {
          collection: [ { value: '', label: '' }, { value: true, label: 'True' }, { value: false, label: 'False' } ],
          type: FilterType.singleSelect,

          // we could add certain option(s) to the "multiple-select" plugin
          filterOptions: {
            autoDropWidth: true
          },
        }
      }
    ];
    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableFiltering: true,
      params: {
        i18n: this.translate
      },

      // use columnDef searchTerms OR use presets as shown below
      presets: {
        filters: [
          { columnId: 'duration', searchTerms: [2, 22, 44] },
          // { columnId: 'complete', searchTerm: '5', operator: '>' },
          { columnId: 'usDateShort', operator: '<', searchTerm: '4/20/25' },
          // { columnId: 'effort-driven', searchTerm: true }
        ],
        sorters: [
          { columnId: 'duration', direction: 'DESC' },
          { columnId: 'complete', direction: 'ASC' }
        ],
      }
    };

    // mock a dataset
    this.dataset = [];
    for (let i = 0; i < NB_ITEMS; i++) {
      const randomDuration = Math.round(Math.random() * 100);
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
        description: (i % 5) ? 'desc ' + i : null, // also add some random to test NULL field
        duration: randomDuration,
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),          // provide a Date format
        usDateShort: `${randomMonth}/${randomDay}/${randomYearShort}`, // provide a date US Short in the dataset
        utcDate: `${randomYear}-${randomMonthStr}-${randomDay}T${randomHour}:${randomTime}:${randomTime}Z`,
        effortDriven: (i % 3 === 0)
      };
    }
  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridState: GridStateChange) {
    console.log('Client sample, Grid State changed:: ', gridState);
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState(grid) {
    console.log('Client sample, last Grid State:: ', this.gridStateService.getCurrentGridState());
  }
}
