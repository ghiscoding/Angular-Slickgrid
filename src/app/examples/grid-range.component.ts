import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AngularGridInstance, Column, FieldType, Filters, Formatters, GridOption, GridStateChange, OperatorType, Statistic } from '../modules/angular-slickgrid';
import { CustomInputFilter } from './custom-inputFilter';
import * as moment from 'moment-mini';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const NB_ITEMS = 500;
const URL_SAMPLE_COLLECTION_DATA = 'assets/data/collection_500_numbers.json';

@Component({
  templateUrl: './grid-range.component.html'
})
export class GridRangeComponent implements OnInit {
  title = 'Example 25: Filtering from Range of Search Values';
  subTitle = `
    This demo shows how to use Filters with Range of Search Values (for example, shown below, filters by duration of 1 to 5 days)
    <br/>
    <ul class="small">
      <li>All input filters support the following operators: (>, >=, <, <=, <>, !=, =, ==, *)
      <li>All Filters supporting range will be using the 2 dots (..) to represent a range, even for dates to be consistent when using the "presets"</li>
      <ul>
        <li>For the range in a text input filters, you can use 2 dots (..) to represent a range</li>
        <li>example: type "5..10" to filter between 5 and 10 (non-inclusive)</li>
      </ul>
      <ul>
        <li>by default the range are not inclusive but if you wish to be inclusive, you can see the Operator to "operator: 'RangeInclusive'" or "operator: OperatoryType.rangeIncluside"</li>
        <li>you can also set the inverse (and default) to "operator: 'RangeExclusive'" or "operator: OperatoryType.rangeExclusive"</li>
      </ul>
      <li>Date Range with Flatpickr Date Picker</li>
    </ul>
  `;

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  statistics: Statistic;

  constructor(private http: HttpClient, private translate: TranslateService) { }

  ngOnInit(): void {
    this.columnDefinitions = [
      {
        id: 'title', name: 'Title', field: 'title', sortable: true, minWidth: 55,
        type: FieldType.string, filterable: true, filter: { model: Filters.compoundInputText }
      },
      {
        id: 'description', name: 'Description', field: 'description', filterable: true, sortable: true, minWidth: 80,
        type: FieldType.string,
        filter: {
          model: new CustomInputFilter(), // create a new instance to make each Filter independent from each other
          enableTrimWhiteSpace: true // or use global "enableFilterTrimWhiteSpace" to trim on all Filters
        }
      },
      {
        id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number, exportCsvForceToKeepAsString: true,
        minWidth: 55,
        filterable: true,
        filter: {
          collectionAsync: this.http.get<{ option: string; value: string; }[]>(URL_SAMPLE_COLLECTION_DATA),
          customStructure: {
            value: 'value',
            label: 'label',
            optionLabel: 'value', // if selected text is too long, we can use option labels instead
            labelSuffix: 'text',
          },
          collectionOptions: {
            separatorBetweenTextLabels: ' ',
            filterResultAfterEachPass: 'chain' // options are "merge" or "chain" (defaults to "chain")
          },
          model: Filters.multipleSelect,

          // we could add certain option(s) to the "multiple-select" plugin
          filterOptions: {
            maxHeight: 250,
            width: 175,

            // if we want to display shorter text as the selected text (on the select filter itself, parent element)
            // we can use "useSelectOptionLabel" or "useSelectOptionLabelToHtml" the latter will parse html
            useSelectOptionLabelToHtml: true
          }
        }
      },
      {
        id: 'complete', name: '% Complete', field: 'percentComplete', minWidth: 70, type: FieldType.number, sortable: true,
        filterable: true, filter: {
          model: Filters.input,
          operator: OperatorType.rangeExclusive // defaults to exclusive
        }
      },
      {
        id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso, sortable: true, minWidth: 75, exportWithFormatter: true,
        type: FieldType.date, filterable: true, filter: { model: Filters.compoundDate }
      },
      {
        id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso, sortable: true, minWidth: 75, exportWithFormatter: true,
        type: FieldType.date,
        filterable: true,
        filter: {
          model: Filters.rangeDate,
        }
      },
      {
        id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven.isEffort', minWidth: 85, maxWidth: 85,
        exportWithFormatter: true, // you can set this property in the column definition OR in the grid options, column def has priority over grid options
        filterable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: true, label: 'TRUE' }, { value: false, labelKey: 'False' }],
          model: Filters.singleSelect,
          filterOptions: {
            autoDropWidth: true
          }
        }
      }
    ];

    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableExcelCopyBuffer: true,
      enableFiltering: true,
      // enableFilterTrimWhiteSpace: true,
      i18n: this.translate,

      // use columnDef searchTerms OR use presets as shown below
      presets: {
        filters: [
          // { columnId: 'duration', searchTerms: [10, 220] },
          { columnId: 'complete', searchTerms: ['15..75'] },
          { columnId: 'finish', operator: 'RangeInclusive', searchTerms: [`${moment().add(-2, 'days').format('YYYY-MM-DD')}..${moment().add(20, 'days').format('YYYY-MM-DD')}`] },
          // { columnId: 'effort-driven', searchTerms: [true] }
        ],
        sorters: [
          { columnId: 'duration', direction: 'DESC' },
          { columnId: 'complete', direction: 'ASC' }
        ],
      }
    };

    // mock a dataset
    this.dataset = this.mockData(NB_ITEMS);
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  mockData(itemCount, startingIndex = 0): any[] {
    // mock a dataset
    const tempDataset = [];
    for (let i = startingIndex; i < (startingIndex + itemCount); i++) {
      const randomDuration = Math.round(Math.random() * 100);
      const randomYear = randomBetween(moment().year(), moment().year() + 1);
      const randomMonth = randomBetween(1, 12);
      const randomDay = randomBetween(10, 28);
      const randomPercent = randomBetween(0, 100);

      tempDataset.push({
        id: i,
        title: 'Task ' + i,
        description: (i % 5) ? 'desc ' + i : null, // also add some random to test NULL field
        duration: randomDuration,
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: (i % 4) ? null : new Date(randomYear, randomMonth, randomDay),          // provide a Date format
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        effortDriven: (i % 5 === 0) ? true : false,
      });
    }

    return tempDataset;
  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridState: GridStateChange) {
    console.log('Client sample, Grid State changed:: ', gridState);
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState(grid) {
    console.log('Client sample, last Grid State:: ', this.angularGrid.gridStateService.getCurrentGridState());
  }

  refreshStatistics(e, args) {
    if (args && args.current > 0) {
      setTimeout(() => {
        this.statistics = {
          startTime: new Date(),
          itemCount: args && args.current,
          totalItemCount: this.dataset.length
        };
      });
    }
  }
}
