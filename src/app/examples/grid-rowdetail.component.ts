import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AngularGridInstance,
  Column,
  Editors,
  FieldType,
  Filters,
  Formatters,
  GridOption,
  SlickRowDetailView,
} from './../modules/angular-slickgrid';
import { RowDetailViewComponent } from './rowdetail-view.component';
import { RowDetailPreloadComponent } from './rowdetail-preload.component';

const FAKE_SERVER_DELAY = 250;
const NB_ITEMS = 1000;

@Component({
  templateUrl: './grid-rowdetail.component.html',
})
export class GridRowDetailComponent implements OnDestroy, OnInit {
  private _darkMode = false;
  title = 'Example 21: Row Detail View';
  subTitle = `
    Add functionality to show extra information with a Row Detail View, (<a href="https://ghiscoding.gitbook.io/angular-slickgrid/grid-functionalities/row-detail" target="_blank">Wiki docs</a>)
    <ul>
      <li>Click on the row "+" icon or anywhere on the row to open it (the latter can be changed via property "useRowClick: false")</li>
      <li>Pass a View/Model as a Template to the Row Detail</li>
      <li>You can use "expandableOverride()" callback to override logic to display expand icon on every row (for example only show it every 2nd row)</li>
    </ul>
  `;

  angularGrid!: AngularGridInstance;
  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset: any[] = [];
  detailViewRowCount = 9;
  hideSubTitle = false;
  flashAlertType = 'info';
  message = '';
  serverWaitDelay = FAKE_SERVER_DELAY;

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  get rowDetailInstance(): SlickRowDetailView {
    // you can get the SlickGrid RowDetail plugin (addon) instance via 2 ways

    // option 1
    return this.angularGrid.extensions.rowDetailView?.instance || {};

    // OR option 2
    // return this.angularGrid?.extensionService.getExtensionInstanceByName(ExtensionName.rowDetailView) || {};
  }

  ngOnInit(): void {
    this.defineGrid();
  }

  ngOnDestroy(): void {
    document.querySelector('.panel-wm-content')!.classList.remove('dark-mode');
    document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'light';
  }

  /* Define grid Options and Columns */
  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'title',
        name: 'Title',
        field: 'title',
        sortable: true,
        type: FieldType.string,
        width: 70,
        filterable: true,
        editor: { model: Editors.text },
      },
      {
        id: 'duration',
        name: 'Duration (days)',
        field: 'duration',
        formatter: Formatters.decimal,
        params: { minDecimal: 1, maxDecimal: 2 },
        sortable: true,
        type: FieldType.number,
        minWidth: 90,
        filterable: true,
      },
      {
        id: 'percent2',
        name: '% Complete',
        field: 'percentComplete2',
        editor: { model: Editors.slider },
        formatter: Formatters.progressBar,
        type: FieldType.number,
        sortable: true,
        minWidth: 100,
        filterable: true,
        filter: { model: Filters.slider, operator: '>' },
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        formatter: Formatters.dateIso,
        sortable: true,
        type: FieldType.date,
        minWidth: 90,
        exportWithFormatter: true,
        filterable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        formatter: Formatters.dateIso,
        sortable: true,
        type: FieldType.date,
        minWidth: 90,
        exportWithFormatter: true,
        filterable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'effort-driven',
        name: 'Effort Driven',
        field: 'effortDriven',
        minWidth: 100,
        formatter: Formatters.checkmarkMaterial,
        type: FieldType.boolean,
        filterable: true,
        sortable: true,
        filter: {
          collection: [
            { value: '', label: '' },
            { value: true, label: 'True' },
            { value: false, label: 'False' },
          ],
          model: Filters.singleSelect,
        },
      },
    ];

    this.gridOptions = {
      autoResize: {
        container: '#demo-container',
        rightPadding: 10,
      },
      enableFiltering: true,
      enableRowDetailView: true,
      darkMode: this._darkMode,
      datasetIdPropertyName: 'rowId', // optionally use a different "id"
      rowDetailView: {
        // optionally change the column index position of the icon (defaults to 0)
        // columnIndexPosition: 1,

        // We can load the "process" asynchronously in 2 different ways (httpClient OR even Promise)
        process: (item) => this.simulateServerAsyncCall(item),
        // process: (item) => this.http.get(`api/item/${item.id}`),

        // load only once and reuse the same item detail without calling process method
        loadOnce: true,

        // limit expanded row to only 1 at a time
        singleRowExpand: false,

        // false by default, clicking anywhere on the row will open the detail view
        // when set to false, only the "+" icon would open the row detail
        // if you use editor or cell navigation you would want this flag set to false (default)
        useRowClick: true,

        // how many grid rows do we want to use for the row detail panel (this is only set once and will be used for all row detail)
        // also note that the detail view adds an extra 1 row for padding purposes
        // so if you choose 4 panelRows, the display will in fact use 5 rows
        panelRows: this.detailViewRowCount,

        // you can override the logic for showing (or not) the expand icon
        // for example, display the expand icon only on every 2nd row
        // expandableOverride: (row: number, dataContext: any) => (dataContext.rowId % 2 === 1),

        // Preload View Component
        preloadComponent: RowDetailPreloadComponent,

        // View Component to load when row detail data is ready
        viewComponent: RowDetailViewComponent,

        // Optionally pass your Parent Component reference to your Child Component (row detail component)
        parent: this,

        onBeforeRowDetailToggle: (e, args) => {
          // you coud cancel opening certain rows
          // if (args.item.rowId === 1) {
          //   e.preventDefault();
          //   return false;
          // }
          console.log('before toggling row detail', args.item);
          return true;
        },
      },
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: true,
      },

      // You could also enable Row Selection as well, but just make sure to disable `useRowClick: false`
      // enableCheckboxSelector: true,
      // enableRowSelection: true,
      // checkboxSelector: {
      //   hideInFilterHeaderRow: false,
      //   hideSelectAllCheckbox: true,
      // },
    };

    this.getData();
  }

  getData() {
    // mock a dataset
    const tmpData: any[] = [];
    for (let i = 0; i < NB_ITEMS; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 29);
      const randomPercent = Math.round(Math.random() * 100);

      tmpData[i] = {
        rowId: i,
        title: 'Task ' + i,
        duration: i % 33 === 0 ? null : Math.random() * 100 + '',
        percentComplete: randomPercent,
        percentComplete2: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, randomMonth + 1, randomDay),
        effortDriven: i % 5 === 0,
      };
    }
    this.dataset = tmpData;
  }

  changeDetailViewRowCount() {
    if (this.angularGrid?.extensionService) {
      const options = this.rowDetailInstance.getOptions();
      if (options?.panelRows) {
        options.panelRows = this.detailViewRowCount; // change number of rows dynamically
        this.rowDetailInstance.setOptions(options);
      }
    }
  }

  changeEditableGrid() {
    this.rowDetailInstance.collapseAll();
    this.rowDetailInstance.addonOptions.useRowClick = false;
    this.gridOptions.autoCommitEdit = !this.gridOptions.autoCommitEdit;
    this.angularGrid?.slickGrid.setOptions({
      editable: true,
      autoEdit: true,
      enableCellNavigation: true,
    });
    return true;
  }

  closeAllRowDetail() {
    if (this.angularGrid?.extensionService) {
      this.rowDetailInstance.collapseAll();
    }
  }

  showFlashMessage(message: string, alertType = 'info') {
    this.message = message;
    this.flashAlertType = alertType;
  }

  /** Just for demo purposes, we will simulate an async server call and return more details on the selected row item */
  simulateServerAsyncCall(item: any) {
    // random set of names to use for more item detail
    const randomNames = [
      'John Doe',
      'Jane Doe',
      'Chuck Norris',
      'Bumblebee',
      'Jackie Chan',
      'Elvis Presley',
      'Bob Marley',
      'Mohammed Ali',
      'Bruce Lee',
      'Rocky Balboa',
    ];

    // fill the template on async delay
    return new Promise((resolve) => {
      window.setTimeout(() => {
        const itemDetail = item;

        // let's add some extra properties to our item for a better async simulation
        itemDetail.assignee = randomNames[this.randomNumber(0, 9)] || '';
        itemDetail.reporter = randomNames[this.randomNumber(0, 9)] || '';

        // resolve the data after delay specified
        resolve(itemDetail);
      }, this.serverWaitDelay);
    });
  }

  toggleDarkMode() {
    this._darkMode = !this._darkMode;
    this.toggleBodyBackground();
    this.angularGrid.slickGrid?.setOptions({ darkMode: this._darkMode });
    this.closeAllRowDetail();
  }

  toggleBodyBackground() {
    if (this._darkMode) {
      document.querySelector<HTMLDivElement>('.panel-wm-content')!.classList.add('dark-mode');
      document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'dark';
    } else {
      document.querySelector('.panel-wm-content')!.classList.remove('dark-mode');
      document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'light';
    }
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }

  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
