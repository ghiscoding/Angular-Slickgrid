import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AngularGridInstance,
  Column,
  FieldType,
  Formatters,
  GridOption,
  OperatorString,
  SlickDataView,
  SlickGrid,
} from './../modules/angular-slickgrid';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./grid-autoheight.component.scss'],
  templateUrl: './grid-autoheight.component.html',
})
export class GridAutoHeightComponent implements OnInit {
  title = 'Example 23: Grid AutoHeight';
  subTitle = `
  The SlickGrid option "autoHeight" can be used if you wish to keep the full height of the grid without any scrolling
  <ul>
  <li>You define a fixed grid width via "gridWidth" in the View</li>
  <li>You can still use the "autoResize" for the width to be resized automatically (the height will never change in this case)</li>
  <li>This dataset has 25 rows, if you scroll down the page you can see the entire set is shown without any grid scrolling (though you might have browser scrolling)</li>
  </ul>
  `;

  angularGrid!: AngularGridInstance;
  grid!: SlickGrid;
  dataView!: SlickDataView;
  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset!: any[];
  operatorList: OperatorString[] = ['=', '<', '<=', '>', '>=', '<>', 'StartsWith', 'EndsWith'];
  selectedOperator = '=';
  searchValue = '';
  selectedColumn?: Column;
  hideSubTitle = false;

  ngOnInit() {
    this.prepareGrid();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  prepareGrid() {
    this.columnDefinitions = [
      {
        id: 'title',
        name: 'Title',
        field: 'title',
        sortable: true,
        type: FieldType.string,
      },
      {
        id: 'duration',
        name: 'Duration (days)',
        field: 'duration',
        sortable: true,
        type: FieldType.number,
      },
      {
        id: 'complete',
        name: '% Complete',
        field: 'percentComplete',
        formatter: Formatters.percentCompleteBar,
        sortable: true,
        type: FieldType.number,
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        formatter: Formatters.dateIso,
        sortable: true,
        type: FieldType.date,
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        formatter: Formatters.dateIso,
        sortable: true,
        type: FieldType.date,
      },
      {
        id: 'effort-driven',
        name: 'Effort Driven',
        field: 'effortDriven',
        formatter: Formatters.checkmarkMaterial,
        sortable: true,
        type: FieldType.number,
      },
    ];
    this.selectedColumn = this.columnDefinitions[0];

    this.gridOptions = {
      // if you want to disable autoResize and use a fixed width which requires horizontal scrolling
      // it's advised to disable the autoFitColumnsOnFirstLoad as well
      // enableAutoResize: false,
      // autoFitColumnsOnFirstLoad: false,

      autoHeight: true,
      autoResize: {
        container: '#demo-container',
        rightPadding: 10,
      },

      // enable the filtering but hide the user filter row since we use our own single filter
      enableFiltering: true,
      showHeaderRow: false, // hide the filter row (header row)

      alwaysShowVerticalScroll: false,
      enableColumnPicker: true,
      enableCellNavigation: true,
      enableRowSelection: true,
    };

    // mock a dataset
    const mockedDataset = [];
    for (let i = 0; i < 25; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 29);
      const randomPercent = Math.round(Math.random() * 100);

      mockedDataset[i] = {
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
    this.dataset = mockedDataset;
  }

  //
  // -- if any of the Search form input changes, we'll call the updateFilter() method
  //

  clearGridSearchInput() {
    this.searchValue = '';
    this.updateFilter();
  }

  updateFilter() {
    this.angularGrid.filterService.updateSingleFilter({
      columnId: `${this.selectedColumn!.id || ''}`,
      operator: this.selectedOperator as OperatorString,
      searchTerms: [this.searchValue || ''],
    });
  }
}
