import { Component, OnInit } from '@angular/core';
import {
  AngularGridInstance,
  AngularUtilService,
  Column,
  FieldType,
  Filters,
  Formatters,
  GridOption,
  MultipleSelectOption,
  OperatorType,
  SliderRangeOption,
} from './../modules/angular-slickgrid';
import { CustomPagerComponent } from './grid-custom-pager.component';

const NB_ITEMS = 5000;

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

@Component({
  templateUrl: './grid-custom-pagination.component.html',
  providers: [AngularUtilService],
})
export class GridCustomPaginationComponent implements OnInit {
  pageSize = 50;
  columnDefinitions: Column[] = [];
  gridContainerElm!: HTMLDivElement;
  gridOptions!: GridOption;
  dataset: any[] = [];
  paginationPosition: 'bottom' | 'top' = 'top';
  angularGrid!: AngularGridInstance;
  hideSubTitle = false;

  constructor(protected readonly angularUtilService: AngularUtilService) {}

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  ngOnInit(): void {
    this.defineGrid();

    // mock a dataset
    this.dataset = this.loadData(NB_ITEMS);
  }

  /* Define grid Options and Columns */
  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'title',
        name: 'Title',
        field: 'id',
        minWidth: 100,
        sortable: true,
        filterable: true,
        formatter: (_row, _cell, val) => `Task ${val}`,
        params: { useFormatterOuputToFilter: true },
      },
      {
        id: 'description',
        name: 'Description',
        field: 'description',
        filterable: true,
        sortable: true,
        minWidth: 80,
        type: FieldType.string,
      },
      {
        id: 'percentComplete',
        name: '% Complete',
        field: 'percentComplete',
        minWidth: 120,
        sortable: true,
        customTooltip: { position: 'center' },
        formatter: Formatters.progressBar,
        type: FieldType.number,
        filterable: true,
        filter: {
          model: Filters.sliderRange,
          maxValue: 100, // or you can use the filterOptions as well
          operator: OperatorType.rangeInclusive, // defaults to inclusive
          filterOptions: {
            hideSliderNumbers: false, // you can hide/show the slider numbers on both side
            min: 0,
            step: 5,
          } as SliderRangeOption,
        },
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        formatter: Formatters.dateIso,
        sortable: true,
        minWidth: 75,
        width: 100,
        exportWithFormatter: true,
        type: FieldType.date,
        filterable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        formatter: Formatters.dateIso,
        sortable: true,
        minWidth: 75,
        width: 120,
        exportWithFormatter: true,
        type: FieldType.date,
        filterable: true,
        filter: {
          model: Filters.dateRange,
        },
      },
      {
        id: 'duration',
        field: 'duration',
        name: 'Duration',
        maxWidth: 90,
        type: FieldType.number,
        sortable: true,
        filterable: true,
        filter: {
          model: Filters.input,
          operator: OperatorType.rangeExclusive, // defaults to exclusive
        },
      },
      {
        id: 'completed',
        name: 'Completed',
        field: 'completed',
        minWidth: 85,
        maxWidth: 90,
        formatter: Formatters.checkmarkMaterial,
        exportWithFormatter: true, // you can set this property in the column definition OR in the grid options, column def has priority over grid options
        filterable: true,
        filter: {
          collection: [
            { value: '', label: '' },
            { value: true, label: 'True' },
            { value: false, label: 'False' },
          ],
          model: Filters.singleSelect,
          filterOptions: { autoAdjustDropHeight: true } as MultipleSelectOption,
        },
      },
    ];

    this.gridOptions = {
      autoResize: {
        container: '#demo-container',
        bottomPadding: this.paginationPosition === 'top' ? -1 : 38, // use a negative bottom padding since we've prepended custom pagination
      },
      enableExcelCopyBuffer: true,
      enableFiltering: true,
      customPaginationComponent: CustomPagerComponent, // load our Custom Pagination Component
      enablePagination: true,
      pagination: {
        pageSize: this.pageSize,
      },
      rowHeight: 40,
    };
  }

  loadData(itemCount: number): any[] {
    // mock a dataset
    const tempDataset: any[] = [];
    for (let i = 0, ln = itemCount; i < ln; i++) {
      const randomDuration = randomBetween(0, 365);
      const randomYear = randomBetween(new Date().getFullYear(), new Date().getFullYear() + 1);
      const randomMonth = randomBetween(0, 12);
      const randomDay = randomBetween(10, 28);
      const randomPercent = randomBetween(0, 100);

      tempDataset.push({
        id: i,
        title: 'Task ' + i,
        description: i % 5 ? 'desc ' + i : null, // also add some random to test NULL field
        duration: randomDuration,
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: i % 4 ? null : new Date(randomYear, randomMonth, randomDay), // provide a Date format
        finish: new Date(randomYear, randomMonth, randomDay),
        completed: randomPercent === 100 ? true : false,
      });
    }

    return tempDataset;
  }

  setPaginationSize(pageSize: number) {
    this.angularGrid.paginationService?.changeItemPerPage(pageSize);
  }

  togglePaginationPosition() {
    const gridContainerElm = document.querySelector(`#${this.gridOptions.gridContainerId || ''}`) as HTMLElement;
    this.paginationPosition = this.paginationPosition === 'top' ? 'bottom' : 'top';
    (this.angularGrid.paginationComponent as CustomPagerComponent)?.disposeElement();
    (this.angularGrid.paginationComponent as CustomPagerComponent)?.renderPagination(gridContainerElm, this.paginationPosition);
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
