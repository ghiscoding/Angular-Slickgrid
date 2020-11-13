import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularGridInstance, Column, ExtensionName, Filters, Formatters, GridOption } from './../modules/angular-slickgrid';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './grid-rowmove.component.html'
})
export class GridRowMoveComponent implements OnInit, OnDestroy {
  title = 'Example 17: Row Move & Checkbox Selector';
  subTitle = `This example demonstrates using the <b>Slick.Plugins.RowMoveManager</b> plugin to easily move a row in the grid.<br/>
    <ul>
      <li>Click to select, Ctrl+Click to toggle selection, Shift+Click to select a range.</li>
      <li>Drag one or more rows by the handle (icon) to reorder</li>
      <li>If you plan to use Row Selection + Row Move, then use "singleRowMove: true" and "disableRowSelection: true"</li>
      <li>You can change "columnIndexPosition" to move the icon position of any extension (RowMove, RowDetail or RowSelector icon)</li>
      <ul>
        <li>You will also want to enable the DataView "syncGridSelection: true" to keep row selection even after a row move</li>
      </ul>
      <li>If you plan to use only Row Move, then you could keep default values (or omit them completely) of "singleRowMove: false" and "disableRowSelection: false"</li>
      <ul>
        <li>SingleRowMove has the name suggest will only move 1 row at a time, by default it will move any row(s) that are selected unless you disable the flag</li>
      </ul>
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

  get rowMoveInstance(): any {
    return this.angularGrid && this.angularGrid.extensionService.getSlickgridAddonInstance(ExtensionName.rowMoveManager) || {};
  }

  ngOnDestroy() {
    // nullify the callbacks to avoid mem leaks
    this.onBeforeMoveRow = null;
    this.onMoveRows = null;
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', filterable: true, },
      { id: 'duration', name: 'Duration', field: 'duration', filterable: true, sortable: true },
      { id: '%', name: '% Complete', field: 'percentComplete', filterable: true, sortable: true },
      {
        id: 'start', name: 'Start', field: 'start', filterable: true, sortable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'finish', name: 'Finish', field: 'finish',
        filterable: true, sortable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'effort-driven', name: 'Completed', field: 'effortDriven',
        formatter: Formatters.checkmark,
        filterable: true, sortable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: true, label: 'True' }, { value: false, label: 'False' }],
          model: Filters.singleSelect
        },
      }
    ];

    this.gridOptions = {
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 10
      },
      enableCellNavigation: true,
      enableFiltering: true,
      enableCheckboxSelector: true,
      checkboxSelector: {
        // you can toggle these 2 properties to show the "select all" checkbox in different location
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true
      },
      enableRowSelection: true,
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false
      },
      dataView: {
        syncGridSelection: true, // enable this flag so that the row selection follows the row even if we move it to another position
      },
      enableRowMoveManager: true,
      rowMoveManager: {
        // when using Row Move + Row Selection, you want to enable the following 2 flags so it doesn't cancel row selection
        singleRowMove: true,
        disableRowSelection: true,
        cancelEditOnDrag: true,
        width: 30,
        onBeforeMoveRows: this.onBeforeMoveRow,
        onMoveRows: this.onMoveRows.bind(this),

        // you can change the move icon position of any extension (RowMove, RowDetail or RowSelector icon)
        // note that you might have to play with the position when using multiple extension
        // since it really depends on which extension get created first to know what their real position are
        // columnIndexPosition: 1,

        // you can also override the usability of the rows, for example make every 2nd row the only moveable rows,
        // usabilityOverride: (row, dataContext, grid) => dataContext.id % 2 === 1
      },
      enableTranslate: true,
      i18n: this.translate
    };

    this.getData();
  }

  getData() {
    // Set up some test columns.
    const mockDataset = [];
    for (let i = 0; i < 500; i++) {
      mockDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 25) + ' days',
        percentComplete: Math.round(Math.random() * 100),
        start: '01/01/2009',
        finish: '01/05/2009',
        effortDriven: (i % 5 === 0)
      };
    }
    this.dataset = mockDataset;
  }

  onBeforeMoveRow(e, data) {
    for (let i = 0; i < data.rows.length; i++) {
      // no point in moving before or after itself
      if (data.rows[i] === data.insertBefore || data.rows[i] === data.insertBefore - 1) {
        e.stopPropagation();
        return false;
      }
    }
    return true;
  }

  onMoveRows(e, args) {
    const extractedRows = [];
    const rows = args.rows;
    const insertBefore = args.insertBefore;
    const left = this.dataset.slice(0, insertBefore);
    const right = this.dataset.slice(insertBefore, this.dataset.length);
    rows.sort((a, b) => a - b);
    for (let i = 0; i < rows.length; i++) {
      extractedRows.push(this.dataset[rows[i]]);
    }
    rows.reverse();
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row < insertBefore) {
        left.splice(row, 1);
      } else {
        right.splice(row - insertBefore, 1);
      }
    }
    const tmpDataset = left.concat(extractedRows.concat(right));
    const selectedRows = [];
    for (let i = 0; i < rows.length; i++) {
      selectedRows.push(left.length + i);
    }
    args.grid.resetActiveCell();
    this.dataset = tmpDataset;
  }

  hideDurationColumnDynamically() {
    const columnIndex = this.angularGrid.slickGrid.getColumns().findIndex(col => col.id === 'duration');
    if (columnIndex >= 0) {
      this.angularGrid.gridService.hideColumnByIndex(columnIndex);
    }
  }

  // Disable/Enable Filtering/Sorting functionalities
  // --------------------------------------------------

  disableFilters() {
    this.angularGrid.filterService.disableFilterFunctionality(true);
  }

  disableSorting() {
    this.angularGrid.sortService.disableSortFunctionality(true);
  }

  // or Toggle Filtering/Sorting functionalities
  // ---------------------------------------------

  toggleFilter() {
    this.angularGrid.filterService.toggleFilterFunctionality();
  }

  toggleSorting() {
    this.angularGrid.sortService.toggleSortFunctionality();
  }
}
