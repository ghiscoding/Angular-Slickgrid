import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AngularGridInstance,
  Column,
  FieldType,
  Filters,
  Formatters,
  GridOption,
  GridState,
  GridStateChange,
  MultipleSelectOption
} from './../modules/angular-slickgrid';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const LOCAL_STORAGE_KEY = 'gridState';
const NB_ITEMS = 500;

@Component({
  templateUrl: './grid-state.component.html'
})
export class GridStateComponent implements OnInit {
  title = 'Example 16: Grid State & Presets using Local Storage';
  subTitle = `
    Grid State & Preset (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-State-&-Preset" target="_blank">Wiki docs</a>)
    <br/>
    <ul class="small">
      <li>Uses Local Storage to persist the Grid State and uses Grid Options "presets" to put the grid back to it's previous state</li>
      <ul>
        <li>to demo this, simply change any columns (position reorder, visibility, size, filter, sort), then refresh your browser with (F5)</li>
      </ul>
      <li>Local Storage is just one option, you can use whichever is more convenient for you (Local Storage, Session Storage, DB, ...)</li>
    </ul>
  `;

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  selectedLanguage: string;

  constructor(private translate: TranslateService) {
    this.selectedLanguage = this.translate.getDefaultLang();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  ngOnInit(): void {
    const presets = JSON.parse(localStorage[LOCAL_STORAGE_KEY] || null);

    // use some Grid State preset defaults if you wish or just restore from Locale Storage
    // presets = presets || this.useDefaultPresets();
    this.defineGrid(presets);

    // always start with English for Cypress E2E tests to be consistent
    const defaultLang = 'en';
    this.translate.use(defaultLang);
    this.selectedLanguage = defaultLang;
  }

  /** Clear the Grid State from Local Storage and reset the grid to it's original state */
  clearGridStateFromLocalStorage() {
    localStorage[LOCAL_STORAGE_KEY] = null;
    this.angularGrid.gridService.resetGrid(this.columnDefinitions);
  }

  /* Define grid Options and Columns */
  defineGrid(gridStatePresets?: GridState) {
    // prepare a multiple-select array to filter with
    const multiSelectFilterArray = [];
    for (let i = 0; i < NB_ITEMS; i++) {
      multiSelectFilterArray.push({ value: i, label: i });
    }

    this.columnDefinitions = [
      {
        id: 'title',
        name: 'Title',
        field: 'title',
        headerKey: 'TITLE',
        filterable: true,
        sortable: true,
        type: FieldType.string,
        minWidth: 45, width: 100,
        filter: {
          model: Filters.compoundInput
        }
      },
      {
        id: 'description', name: 'Description', field: 'description', filterable: true, sortable: true, minWidth: 80, width: 100,
        type: FieldType.string,
        filter: {
          model: Filters.input
        }
      },
      {
        id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number, exportCsvForceToKeepAsString: true,
        minWidth: 55, width: 100,
        headerKey: 'DURATION',
        filterable: true,
        filter: {
          collection: multiSelectFilterArray,
          model: Filters.multipleSelect,
          // we could add certain option(s) to the "multiple-select" plugin
          filterOptions: {
            maxHeight: 250,
            width: 175
          } as MultipleSelectOption
        }
      },
      {
        id: 'complete', name: '% Complete', field: 'percentComplete', headerKey: 'PERCENT_COMPLETE', minWidth: 70, type: FieldType.number, sortable: true, width: 100,
        formatter: Formatters.percentCompleteBar, filterable: true, filter: { model: Filters.slider, operator: '>' }
      },
      {
        id: 'start', name: 'Start', field: 'start', headerKey: 'START', formatter: Formatters.dateIso, sortable: true, minWidth: 75, exportWithFormatter: true, width: 100,
        type: FieldType.date, filterable: true, filter: { model: Filters.compoundDate }
      },
      {
        id: 'completed', field: 'completed', headerKey: 'COMPLETED', minWidth: 85, maxWidth: 85, formatter: Formatters.checkmark, width: 100,
        type: FieldType.boolean,
        sortable: true,
        filterable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: true, label: 'True' }, { value: false, label: 'False' }],
          model: Filters.singleSelect,

          // we could add certain option(s) to the "multiple-select" plugin
          filterOptions: { autoDropWidth: true } as MultipleSelectOption,
        }
      }
    ];

    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableCheckboxSelector: true,
      enableFiltering: true,
      enableTranslate: true,
      i18n: this.translate,
      columnPicker: {
        hideForceFitButton: true
      },
      gridMenu: {
        hideForceFitButton: true
      },
    };

    // reload the Grid State with the grid options presets
    if (gridStatePresets) {
      this.gridOptions.presets = gridStatePresets;
    }

    this.getData();
  }

  getData() {
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
        etc: 'Something hidden ' + i,
        description: (i % 5) ? 'desc ' + i : null, // also add some random to test NULL field
        duration: randomDuration,
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),          // provide a Date format
        usDateShort: `${randomMonth}/${randomDay}/${randomYearShort}`, // provide a date US Short in the dataset
        utcDate: `${randomYear}-${randomMonthStr}-${randomDay}T${randomHour}:${randomTime}:${randomTime}Z`,
        completed: (i % 3 === 0)
      };
    }
  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridStateChanges: GridStateChange) {
    console.log('Client sample, Grid State changed:: ', gridStateChanges);
    localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(gridStateChanges.gridState);
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState(grid) {
    const gridState: GridState = this.angularGrid.gridStateService.getCurrentGridState();
    console.log('Client sample, last Grid State:: ', gridState);
    localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(gridState);
  }

  switchLanguage() {
    const nextLocale = (this.selectedLanguage === 'en') ? 'fr' : 'en';
    this.translate.use(nextLocale).subscribe(() => this.selectedLanguage = nextLocale);
  }

  useDefaultPresets() {
    // use columnDef searchTerms OR use presets as shown below
    return {
      columns: [
        { columnId: 'description', width: 170 }, // flip column position of Title/Description to Description/Title
        { columnId: 'title', width: 55 },
        { columnId: 'duration' },
        { columnId: 'complete' },
        { columnId: 'start' },
        { columnId: 'usDateShort' },
        { columnId: 'utcDate' },
        // { columnId: 'completed' }, // to HIDE a column, simply ommit it from the preset array
      ],
      filters: [
        { columnId: 'duration', searchTerms: [2, 22, 44] },
        // { columnId: 'complete', searchTerms: ['5'], operator: '>' },
        { columnId: 'usDateShort', operator: '<', searchTerms: ['4/20/25'] },
        // { columnId: 'completed', searchTerms: [true] }
      ],
      sorters: [
        { columnId: 'duration', direction: 'DESC' },
        { columnId: 'complete', direction: 'ASC' }
      ],
    };
  }
}
