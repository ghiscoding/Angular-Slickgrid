import { Component, Injectable, OnInit } from '@angular/core';
import { AngularGridInstance, Column, Editors, FieldType, Formatters, GridOption } from './../modules/angular-slickgrid';

@Component({
  templateUrl: './grid-rowselection.component.html'
})
@Injectable()
export class GridRowSelectionComponent implements OnInit {
  title = 'Example 10: Multiple Grids with Row Selection';
  subTitle = `
    Row selection, single or multi-select (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Row-Selection" target="_blank">Wiki docs</a>).
    <ul>
      <li>Single Select, you can click on any cell to make the row active</li>
      <li>Multiple Selections, you need to specifically click on the checkbox to make 1 or more selections</li>
      <li>Note that "enableExcelCopyBuffer" cannot be used at the same time as Row Selection because there can exist only 1 SelectionModel at a time</li>
    </ul>
  `;

  angularGrid1: AngularGridInstance;
  angularGrid2: AngularGridInstance;
  columnDefinitions1: Column[];
  columnDefinitions2: Column[];
  gridOptions1: GridOption;
  gridOptions2: GridOption;
  dataset1: any[];
  dataset2: any[];
  gridObj1: any;
  gridObj2: any;
  selectedTitles: any[];
  selectedTitle: any;

  ngOnInit(): void {
    this.prepareGrid();
  }

  angularGridReady1(angularGrid: AngularGridInstance) {
    this.angularGrid1 = angularGrid;
    this.gridObj1 = angularGrid && angularGrid.slickGrid || {};
  }

  angularGridReady2(angularGrid: AngularGridInstance) {
    this.angularGrid2 = angularGrid;
    this.gridObj2 = angularGrid && angularGrid.slickGrid || {};
  }

  prepareGrid() {
    this.columnDefinitions1 = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, type: FieldType.string, editor: { model: Editors.longText } },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number, editor: { model: Editors.integer } },
      { id: 'complete', name: '% Complete', field: 'percentComplete', formatter: Formatters.percentCompleteBar, type: FieldType.number, sortable: true },
      { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso, sortable: true, type: FieldType.dateIso, editor: { model: Editors.date } },
      { id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso, sortable: true, type: FieldType.date, editor: { model: Editors.date }, exportWithFormatter: true },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', formatter: Formatters.checkmark, type: FieldType.number, sortable: true }
    ];

    this.columnDefinitions2 = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, type: FieldType.string },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number },
      { id: 'complete', name: '% Complete', field: 'percentComplete', formatter: Formatters.percentCompleteBar, type: FieldType.number, sortable: true },
      { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso, sortable: true, type: FieldType.dateIso, exportWithFormatter: true  },
      { id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso, sortable: true, type: FieldType.date, exportWithFormatter: true },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', formatter: Formatters.checkmark, type: FieldType.number, sortable: true }
    ];

    this.gridOptions1 = {
      editable: true,
      autoEdit: false,
      enableAutoResize: false,
      enableCellNavigation: true,
      enableCheckboxSelector: true,
      enableRowSelection: true,
      checkboxSelector: {
        // remove the unnecessary "Select All" checkbox in header when in single selection mode
        hideSelectAllCheckbox: true
      },
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: true
      },
    };

    this.gridOptions2 = {
      enableAutoResize: false,
      enableCellNavigation: true,
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false
      },
      preselectedRows: [0, 2],
      enableCheckboxSelector: true,
      enableRowSelection: true,
    };

    this.dataset1 = this.prepareData();
    this.dataset2 = this.prepareData();
  }

  prepareData() {
    // mock a dataset
    const mockDataset = [];
    for (let i = 0; i < 500; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      mockDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        effortDriven: (i % 5 === 0)
      };
    }
    return mockDataset;
  }

  handleSelectedRowsChanged1(e, args) {
    if (Array.isArray(args.rows)) {
      this.selectedTitle = args.rows.map(idx => {
        const item = this.gridObj1.getDataItem(idx);
        return item.title || '';
      });
    }
  }

  handleSelectedRowsChanged2(e, args) {
    if (Array.isArray(args.rows)) {
      this.selectedTitles = args.rows.map(idx => {
        const item = this.gridObj2.getDataItem(idx);
        return item.title || '';
      });
    }
  }
}
