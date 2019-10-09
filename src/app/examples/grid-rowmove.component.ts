import { Component, OnInit } from '@angular/core';
import { AngularGridInstance, Column, Formatters, GridOption } from './../modules/angular-slickgrid';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './grid-rowmove.component.html'
})
export class GridRowMoveComponent implements OnInit {
  title = 'Example 17: Row Move Plugin';
  subTitle = `This example demonstrates using the <b>Slick.Plugins.RowMoveManager</b> plugin to easily move a row in the grid.<br/>
    <ul>
      <li>Click to select, Ctrl+Click to toggle selection, Shift+Click to select a range.</li>
      <li>Drag one or more rows by the handle (icon) to reorder</li>
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
    this.columnDefinitions = [
      {
        id: '#', field: '', name: '', width: 40,
        behavior: 'selectAndMove',
        selectable: false, resizable: false,
        cssClass: 'cell-reorder dnd',
        excludeFromExport: true,
        excludeFromColumnPicker: true,
        excludeFromHeaderMenu: true,
        excludeFromGridMenu: true
      },
      { id: 'title', name: 'Title', field: 'title' },
      { id: 'duration', name: 'Duration', field: 'duration', sortable: true },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true },
      { id: 'start', name: 'Start', field: 'start' },
      { id: 'finish', name: 'Finish', field: 'finish' },
      { id: 'effort-driven', name: 'Completed', field: 'effortDriven', formatter: Formatters.checkmark }
    ];

    this.gridOptions = {
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableCellNavigation: true,
      enableRowMoveManager: true,
      gridMenu: {
        iconCssClass: 'fa fa-ellipsis-v',
      },
      rowMoveManager: {
        onBeforeMoveRows: (e, args) => this.onBeforeMoveRow(e, args),
        onMoveRows: (e, args) => this.onMoveRows(e, args),
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
    let left;
    let right;
    const rows = args.rows;
    const insertBefore = args.insertBefore;
    left = this.dataset.slice(0, insertBefore);
    right = this.dataset.slice(insertBefore, this.dataset.length);
    rows.sort((a, b) => {
      return a - b;
    });

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
    this.dataset = left.concat(extractedRows.concat(right));
    const selectedRows = [];

    for (let i = 0; i < rows.length; i++) {
      selectedRows.push(left.length + i);
    }

    this.angularGrid.slickGrid.resetActiveCell();
    this.angularGrid.slickGrid.setData(this.dataset);
    this.angularGrid.slickGrid.setSelectedRows(selectedRows);
    this.angularGrid.slickGrid.render();
  }
}
