import { Component, OnInit } from '@angular/core';
import { ExcelExportService } from '@slickgrid-universal/excel-export';

import { AngularGridInstance, Column, FieldType, GridOption, ItemMetadata } from './../modules/angular-slickgrid';

@Component({
  templateUrl: './grid-colspan.component.html',
  styleUrls: ['./grid-colspan.component.scss'],
})
export class GridColspanComponent implements OnInit {
  title = 'Example 15: Column Span & Header Grouping';
  subTitle = `
  This example demonstrates how to easily span a row over multiple columns & how to group header titles.
  <ul>
    <li>Note that you can add Sort but remember that it will sort by the data which the row contains, even if the data is visually hidden by colspan it will still sort it</li>
    <li>
      Header Grouping spanning accross multiple columns is working but has some UI issues on window resize.
      If anyone can fix it, probably some CSS issues, please let us know.
    </li>
  </ul>
  `;

  angularGrid2!: AngularGridInstance;
  gridObj2: any;
  columnDefinitions1!: Column[];
  columnDefinitions2!: Column[];
  gridOptions1!: GridOption;
  gridOptions2!: GridOption;
  dataset1: any[] = [];
  dataset2: any[] = [];
  hideSubTitle = false;

  ngOnInit(): void {
    this.prepareGrid1();
    this.prepareGrid2();
  }

  angularGridReady2(angularGrid: AngularGridInstance) {
    this.angularGrid2 = angularGrid;
    this.gridObj2 = angularGrid.slickGrid;
  }

  prepareGrid1() {
    this.columnDefinitions1 = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, columnGroup: 'Common Factor' },
      { id: 'duration', name: 'Duration', field: 'duration', columnGroup: 'Common Factor' },
      { id: 'start', name: 'Start', field: 'start', columnGroup: 'Period' },
      { id: 'finish', name: 'Finish', field: 'finish', columnGroup: 'Period' },
      { id: '%', name: '% Complete', field: 'percentComplete', selectable: false, columnGroup: 'Analysis' },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', type: FieldType.boolean, columnGroup: 'Analysis' },
    ];

    this.gridOptions1 = {
      gridHeight: 275,
      gridWidth: 800,
      enableAutoResize: false,
      enableCellNavigation: true,
      enableSorting: true,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 28,
      explicitInitialization: true,
      dataView: {
        globalItemMetadataProvider: {
          getRowMetadata: (item: any, row: any) => this.renderDifferentColspan(item, row),
        },
      },
      gridMenu: {
        iconButtonContainer: 'preheader', // we can display the grid menu icon in either the preheader or in the column header (default)
      },
      enableExcelExport: true,
      excelExportOptions: {
        exportWithFormatter: false,
      },
      externalResources: [new ExcelExportService()],
    };

    this.dataset1 = this.getData(500);
  }

  prepareGrid2() {
    this.columnDefinitions2 = [
      {
        id: 'sel',
        name: '#',
        field: 'num',
        behavior: 'select',
        cssClass: 'cell-selection',
        width: 40,
        resizable: false,
        selectable: false,
      },
      { id: 'title', name: 'Title', field: 'title', sortable: true, columnGroup: 'Common Factor' },
      { id: 'duration', name: 'Duration', field: 'duration', columnGroup: 'Common Factor' },
      { id: 'start', name: 'Start', field: 'start', columnGroup: 'Period' },
      { id: 'finish', name: 'Finish', field: 'finish', columnGroup: 'Period' },
      { id: '%', name: '% Complete', field: 'percentComplete', selectable: false, columnGroup: 'Analysis' },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', type: FieldType.boolean, columnGroup: 'Analysis' },
    ];

    this.gridOptions2 = {
      gridHeight: 275,
      gridWidth: 800,
      enableCellNavigation: true,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 25,
      explicitInitialization: true,
      frozenColumn: 2,
      gridMenu: { hideClearFrozenColumnsCommand: false },
      headerMenu: { hideFreezeColumnsCommand: false },
      enableExcelExport: true,
      excelExportOptions: {
        exportWithFormatter: false,
      },
      externalResources: [new ExcelExportService()],
    };

    this.dataset2 = this.getData(500);
  }

  getData(count: number) {
    // Set up some test columns.
    const mockDataset = [];
    for (let i = 0; i < count; i++) {
      mockDataset[i] = {
        id: i,
        num: i,
        title: 'Task ' + i,
        duration: '5 days',
        percentComplete: Math.round(Math.random() * 100),
        start: '01/01/2009',
        finish: '01/05/2009',
        effortDriven: i % 5 === 0,
      };
    }
    return mockDataset;
  }

  setFrozenColumns2(frozenCols: number) {
    this.gridObj2.setOptions({ frozenColumn: frozenCols });
    this.gridOptions2 = this.gridObj2.getOptions();
  }

  /**
   * A callback to render different row column span
   * Your callback will always have the "item" argument which you can use to decide on the colspan
   * Your return must always be in the form of:: return { columns: {}}
   */
  renderDifferentColspan(item: any, row: number): ItemMetadata {
    if (item.id % 2 === 1 || row % 2 === 1) {
      return {
        columns: {
          duration: {
            colspan: 3, // "duration" will span over 3 columns
          },
        },
      };
    }
    return {
      columns: {
        0: {
          colspan: '*', // starting at column index 0, we will span accross all column (*)
        },
      },
    };
  }
}
