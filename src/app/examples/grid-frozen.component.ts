import { Component, OnInit } from '@angular/core';
import { AngularGridInstance, Column, FieldType, Formatters, Filters, GridOption } from './../modules/angular-slickgrid';

@Component({
  templateUrl: './grid-frozen.component.html',
  styleUrls: ['./grid-frozen.component.scss']
})
export class GridFrozenComponent implements OnInit {
  title = 'Example 20: Pinned (frozen) Columns/Rows';
  subTitle = `
    This example demonstrates the use of Pinned (aka frozen) Columns and/or Rows<br/>
    <ul>
      <li>You can dynamically change the frozen columns or rows</li>
    </ul>
  `;

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  frozenColumnCount = 2;
  frozenRowCount = 3;
  gridObj: any;

  ngOnInit(): void {
    this.prepareDataGrid();
  }

  angularGridReady(angularGrid: any) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
  }

  prepareDataGrid() {
    this.columnDefinitions = [
      {
        id: 'sel', name: '#', field: 'id',
        minWidth: 35, width: 35, maxWidth: 35,
        cannotTriggerInsert: true,
        resizable: false,
        unselectable: true,
      },
      {
        id: 'title', name: 'Title', field: 'title',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      },
      {
        id: 'duration', name: 'Duration', field: 'duration',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      },
      {
        id: 'percentComplete', name: '% Complete', field: 'percentComplete',
        resizable: false,
        minWidth: 130, width: 140,
        formatter: Formatters.percentCompleteBar,
        type: FieldType.number,
        filterable: true,
        filter: { model: Filters.slider, operator: '>=' },
        sortable: true
      },
      {
        id: 'start', name: 'Start', field: 'start',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      },
      {
        id: 'finish', name: 'Finish', field: 'finish',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      },
      {
        id: 'effortDriven', name: 'Effort Driven', field: 'effortDriven',
        minWidth: 100, width: 120,
        formatter: Formatters.checkmark,
        filterable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: true, label: 'True' }, { value: false, label: 'False' }],
          model: Filters.singleSelect
        },
        sortable: true
      },
      {
        id: 'title1', name: 'Title1', field: 'title1',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      },
      {
        id: 'title2', name: 'Title2', field: 'title2',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      },
      {
        id: 'title3', name: 'Title3', field: 'title3',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      },
      {
        id: 'title4', name: 'Title4', field: 'title4',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true
      }
    ];

    this.gridOptions = {
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      alwaysShowVerticalScroll: false,
      enableCellNavigation: true,
      enableFiltering: true,
      asyncEditorLoading: true,
      forceFitColumns: false,
      autoEdit: false,
      frozenColumn: this.frozenColumnCount,
      frozenRow: this.frozenRowCount,
      showHeaderRow: true,
      syncColumnCellResize: false,
    };

    // mock a dataset
    this.dataset = this.getData();
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
        effortDriven: (i % 5 === 0),
        title1: Math.round(Math.random() * 25),
        title2: Math.round(Math.random() * 25),
        title3: Math.round(Math.random() * 25),
        title4: Math.round(Math.random() * 25),
      };
    }
    return mockDataset;
  }

  // wire up model events to drive the grid
  onRowCountChanged(e, args) {
    if (this.gridObj) {
      this.gridObj.updateRowCount();
      this.gridObj.render();
    }
  }

  changeFrozenColumnCount() {
    if (this.gridObj) {
      this.gridObj.setOptions({
        frozenColumn: this.frozenColumnCount
      });
    }
  }

  changeFrozenRowCount() {
    if (this.gridObj) {
      this.gridObj.setOptions({
        frozenRow: this.frozenRowCount
      });
    }
  }
}
