import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {
  AngularGridInstance,
  Column,
  FieldType,
  Filters,
  Formatters,
  GridOption,
  GridStateChange,
} from './../modules/angular-slickgrid';

@Component({
  templateUrl: './grid-rowselection.component.html',
  styles: ['.alert { padding: 8px; margin-bottom: 10px }', '.col-sm-1{ max-width: 70px }'],
})
export class GridRowSelectionComponent implements OnInit {
  title = 'Example 10: Multiple Grids with Row Selection';
  subTitle = `
    Row selection, single or multi-select (<a href="https://ghiscoding.gitbook.io/angular-slickgrid/grid-functionalities/row-selection" target="_blank">Wiki docs</a>).
    <ul>
      <li>Single Select, you can click on any cell to make the row active</li>
      <li>Multiple Selections, you need to specifically click on the checkbox to make 1 or more selections</li>
      <li>You can use "selectableOverride()" callback to override logic to display checkbox on every row (for example only show it every 2nd row)</li>
      <li>NOTE: Any Row Selection(s) will be reset when using Pagination and changing Page (you will need to set it back manually if you want it back)</li>
    </ul>
  `;

  angularGrid1!: AngularGridInstance;
  angularGrid2!: AngularGridInstance;
  columnDefinitions1!: Column[];
  columnDefinitions2!: Column[];
  gridOptions1!: GridOption;
  gridOptions2!: GridOption;
  dataset1!: any[];
  dataset2!: any[];
  gridObj1!: any;
  gridObj2!: any;
  hideSubTitle = false;
  isGrid2WithPagination = true;
  selectedTitles = '';
  selectedTitle = '';
  selectedGrid2IDs!: number[];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.prepareGrid();
  }

  angularGridReady1(angularGrid: AngularGridInstance) {
    this.angularGrid1 = angularGrid;
    this.gridObj1 = angularGrid?.slickGrid || {};
  }

  angularGridReady2(angularGrid: AngularGridInstance) {
    this.angularGrid2 = angularGrid;
    this.gridObj2 = angularGrid?.slickGrid || {};
  }

  prepareGrid() {
    this.columnDefinitions1 = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, type: FieldType.string, filterable: true },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number, filterable: true },
      {
        id: 'complete',
        name: '% Complete',
        field: 'percentComplete',
        formatter: Formatters.percentCompleteBar,
        type: FieldType.number,
        filterable: true,
        sortable: true,
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        formatter: Formatters.dateIso,
        exportWithFormatter: true,
        type: FieldType.date,
        filterable: true,
        sortable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        formatter: Formatters.dateIso,
        exportWithFormatter: true,
        type: FieldType.date,
        filterable: true,
        sortable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'effort-driven',
        name: 'Effort Driven',
        field: 'effortDriven',
        formatter: Formatters.checkmarkMaterial,
        type: FieldType.boolean,
        sortable: true,
        filterable: true,
        filter: {
          collection: [
            { value: '', label: '' },
            { value: true, label: 'true' },
            { value: false, label: 'false' },
          ],
          model: Filters.singleSelect,
        },
      },
    ];

    this.columnDefinitions2 = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, type: FieldType.string, filterable: true },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number, filterable: true },
      {
        id: 'complete',
        name: '% Complete',
        field: 'percentComplete',
        formatter: Formatters.percentCompleteBar,
        type: FieldType.number,
        filterable: true,
        sortable: true,
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        formatter: Formatters.dateIso,
        exportWithFormatter: true,
        type: FieldType.date,
        filterable: true,
        sortable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        formatter: Formatters.dateIso,
        exportWithFormatter: true,
        type: FieldType.date,
        filterable: true,
        sortable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'effort-driven',
        name: 'Effort Driven',
        field: 'effortDriven',
        formatter: Formatters.checkmarkMaterial,
        type: FieldType.boolean,
        sortable: true,
        filterable: true,
        filter: {
          collection: [
            { value: '', label: '' },
            { value: true, label: 'true' },
            { value: false, label: 'false' },
          ],
          model: Filters.singleSelect,
        },
      },
    ];

    this.gridOptions1 = {
      gridHeight: 225,
      gridWidth: 800,
      enableAutoResize: false,
      enableCellNavigation: true,
      enableRowSelection: true,
      enableCheckboxSelector: true,
      enableFiltering: true,
      checkboxSelector: {
        // optionally change the column index position of the icon (defaults to 0)
        // columnIndexPosition: 1,

        // remove the unnecessary "Select All" checkbox in header when in single selection mode
        hideSelectAllCheckbox: true,

        // you can override the logic for showing (or not) the expand icon
        // for example, display the expand icon only on every 2nd row
        // selectableOverride: (row: number, dataContext: any, grid: SlickGrid) => (dataContext.id % 2 === 1)
      },
      multiSelect: false,
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: true,
      },
      columnPicker: {
        hideForceFitButton: true,
      },
      gridMenu: {
        hideForceFitButton: true,
      },
      enablePagination: true,
      pagination: {
        pageSizes: [5, 10, 15, 20, 25, 50, 75, 100],
        pageSize: 5,
      },
      // we can use some Presets, for the example Pagination
      presets: {
        pagination: { pageNumber: 2, pageSize: 5 },
      },
    };

    this.gridOptions2 = {
      gridHeight: 255,
      gridWidth: 800,
      enableAutoResize: false,
      enableCellNavigation: true,
      enableFiltering: true,
      checkboxSelector: {
        // you can toggle these 2 properties to show the "select all" checkbox in different location
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true,
        applySelectOnAllPages: true, // when clicking "Select All", should we apply it to all pages (defaults to true)
      },
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false,
      },
      enableCheckboxSelector: true,
      enableRowSelection: true,
      enablePagination: true,
      pagination: {
        pageSizes: [5, 10, 15, 20, 25, 50, 75, 100],
        pageSize: 5,
      },
      // 1. pre-select some grid row indexes (less recommended, better use the Presets, see below)
      // preselectedRows: [0, 2],

      // 2. or use the Presets to pre-select some rows
      presets: {
        // you can presets row selection here as well, you can choose 1 of the following 2 ways of setting the selection
        // by their index position in the grid (UI) or by the object IDs, the default is "dataContextIds" and if provided it will use it and disregard "gridRowIndexes"
        // the RECOMMENDED is to use "dataContextIds" since that will always work even with Pagination, while "gridRowIndexes" is only good for 1 page
        rowSelection: {
          // gridRowIndexes: [2],           // the row position of what you see on the screen (UI)
          dataContextIds: [3, 12, 13, 522], // (recommended) select by your data object IDs
        },
      },
    };

    this.dataset1 = this.prepareData(495);
    this.dataset2 = this.prepareData(525);
  }

  prepareData(count: number) {
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
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, randomMonth + 1, randomDay),
        effortDriven: i % 5 === 0,
      };
    }
    return mockDataset;
  }

  goToGrid1FirstPage() {
    this.angularGrid1.paginationService!.goToFirstPage();
  }

  goToGrid1LastPage() {
    this.angularGrid1.paginationService!.goToLastPage();
  }

  goToGrid2FirstPage() {
    this.angularGrid2.paginationService!.goToFirstPage();
  }

  goToGrid2LastPage() {
    this.angularGrid2.paginationService!.goToLastPage();
  }

  /** Dispatched event of a Grid State Changed event */
  grid1StateChanged(gridStateChanges: GridStateChange) {
    console.log('Grid State changed:: ', gridStateChanges);
    console.log('Grid State changed:: ', gridStateChanges.change);
  }

  /** Dispatched event of a Grid State Changed event */
  grid2StateChanged(gridStateChanges: GridStateChange) {
    console.log('Grid State changed:: ', gridStateChanges);
    console.log('Grid State changed:: ', gridStateChanges.change);

    if (gridStateChanges!.gridState!.rowSelection) {
      this.selectedGrid2IDs = (gridStateChanges!.gridState!.rowSelection.filteredDataContextIds || []) as number[];
      this.selectedGrid2IDs = this.selectedGrid2IDs.sort((a, b) => a - b); // sort by ID
      this.selectedTitles = this.selectedGrid2IDs.map((dataContextId) => `Task ${dataContextId}`).join(',');
      if (this.selectedTitles.length > 293) {
        this.selectedTitles = this.selectedTitles.substring(0, 293) + '...';
      }
      this.cd.detectChanges();
    }
  }

  // Toggle the Pagination of Grid2
  // IMPORTANT, the Pagination MUST BE CREATED on initial page load before you can start toggling it
  // Basically you cannot toggle a Pagination that doesn't exist (must created at the time as the grid)
  togglePaginationGrid2() {
    this.isGrid2WithPagination = !this.isGrid2WithPagination;
    this.angularGrid2.paginationService!.togglePaginationVisibility(this.isGrid2WithPagination);
  }

  handleSelectedRowsChanged1(e: Event, args: any) {
    if (Array.isArray(args.rows) && this.gridObj1) {
      this.selectedTitle = args.rows.map((idx: number) => {
        const item = this.gridObj1.getDataItem(idx);
        return item.title || '';
      });
    }
  }
}
