import { Component, OnInit } from '@angular/core';
import {
  type AngularGridInstance,
  Aggregators,
  type Column,
  FieldType,
  Filters,
  Formatters,
  type GridOption,
  type Grouping,
  type Metrics,
  type OnRowCountChangedEventArgs,
  SortComparers,
  SortDirectionNumber,
} from '../modules/angular-slickgrid';
import { ExcelExportService } from '@slickgrid-universal/excel-export';

import { randomNumber } from './utilities';

const FETCH_SIZE = 50;

@Component({
  templateUrl: './grid-infinite-json.component.html',
})
export class GridInfiniteJsonComponent implements OnInit {
  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  dataset: any[] = [];
  hideSubTitle = false;
  gridOptions!: GridOption;
  metrics!: Partial<Metrics>;
  shouldResetOnSort = false;

  ngOnInit(): void {
    this.defineGrid();
    this.dataset = this.loadData(0, FETCH_SIZE);
    this.metrics = {
      itemCount: FETCH_SIZE,
      totalItemCount: FETCH_SIZE,
    };
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  defineGrid() {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, minWidth: 100, filterable: true },
      {
        id: 'duration',
        name: 'Duration (days)',
        field: 'duration',
        sortable: true,
        minWidth: 100,
        filterable: true,
        type: FieldType.number,
      },
      {
        id: 'percentComplete',
        name: '% Complete',
        field: 'percentComplete',
        sortable: true,
        minWidth: 100,
        filterable: true,
        type: FieldType.number,
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        type: FieldType.date,
        outputType: FieldType.dateIso, // for date picker format
        formatter: Formatters.date,
        exportWithFormatter: true,
        params: { dateFormat: 'MMM DD, YYYY' },
        sortable: true,
        filterable: true,
        filter: {
          model: Filters.compoundDate,
        },
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        type: FieldType.date,
        outputType: FieldType.dateIso, // for date picker format
        formatter: Formatters.date,
        exportWithFormatter: true,
        params: { dateFormat: 'MMM DD, YYYY' },
        sortable: true,
        filterable: true,
        filter: {
          model: Filters.compoundDate,
        },
      },
      {
        id: 'effort-driven',
        name: 'Effort Driven',
        field: 'effortDriven',
        sortable: true,
        minWidth: 100,
        filterable: true,
        formatter: Formatters.checkmarkMaterial,
      },
    ];

    this.gridOptions = {
      autoResize: {
        container: '#demo-container',
        rightPadding: 10,
      },
      enableAutoResize: true,
      enableFiltering: true,
      enableGrouping: true,
      editable: false,
      rowHeight: 33,
      enableExcelExport: true,
      externalResources: [new ExcelExportService()],
    };
  }

  // add onScroll listener which will detect when we reach the scroll end
  // if so, then append items to the dataset
  handleOnScroll(args: any) {
    const viewportElm = args.grid.getViewportNode();
    if (
      ['mousewheel', 'scroll'].includes(args.triggeredBy || '') &&
      viewportElm.scrollTop > 0 &&
      Math.ceil(viewportElm.offsetHeight + args.scrollTop) >= args.scrollHeight
    ) {
      console.log('onScroll end reached, add more items');
      const startIdx = this.angularGrid.dataView?.getItemCount() || 0;
      const newItems = this.loadData(startIdx, FETCH_SIZE);
      this.angularGrid.dataView?.addItems(newItems);
    }
  }

  // do we want to reset the dataset when Sorting?
  // if answering Yes then use the code below
  handleOnSort() {
    if (this.shouldResetOnSort) {
      const newData = this.loadData(0, FETCH_SIZE);
      this.angularGrid.slickGrid?.scrollTo(0); // scroll back to top to avoid unwanted onScroll end triggered
      this.angularGrid.dataView?.setItems(newData);
      this.angularGrid.dataView?.reSort();
    }
  }

  groupByDuration() {
    this.angularGrid?.dataView?.setGrouping({
      getter: 'duration',
      formatter: (g) => `Duration: ${g.value} <span class="text-green">(${g.count} items)</span>`,
      comparer: (a, b) => SortComparers.numeric(a.value, b.value, SortDirectionNumber.asc),
      aggregators: [new Aggregators.Avg('percentComplete'), new Aggregators.Sum('cost')],
      aggregateCollapsed: false,
      lazyTotalsCalculation: true,
    } as Grouping);

    // you need to manually add the sort icon(s) in UI
    this.angularGrid?.slickGrid?.setSortColumns([{ columnId: 'duration', sortAsc: true }]);
    this.angularGrid?.slickGrid?.invalidate(); // invalidate all rows and re-render
  }

  loadData(startIdx: number, count: number) {
    const tmpData: any[] = [];
    for (let i = startIdx; i < startIdx + count; i++) {
      tmpData.push(this.newItem(i));
    }

    return tmpData;
  }

  newItem(idx: number) {
    return {
      id: idx,
      title: 'Task ' + idx,
      duration: Math.round(Math.random() * 100) + '',
      percentComplete: randomNumber(1, 12),
      start: new Date(2020, randomNumber(1, 11), randomNumber(1, 28)),
      finish: new Date(2022, randomNumber(1, 11), randomNumber(1, 28)),
      effortDriven: idx % 5 === 0,
    };
  }

  onSortReset(shouldReset: boolean) {
    this.shouldResetOnSort = shouldReset;
  }

  clearAllFiltersAndSorts() {
    if (this.angularGrid?.gridService) {
      this.angularGrid.gridService.clearAllFiltersAndSorts();
    }
  }

  setFiltersDynamically() {
    // we can Set Filters Dynamically (or different filters) afterward through the FilterService
    this.angularGrid?.filterService.updateFilters([{ columnId: 'start', searchTerms: ['2020-08-25'], operator: '<=' }]);
  }

  handleOnRowCountChanged(args: OnRowCountChangedEventArgs) {
    if (this.angularGrid && args?.current >= 0) {
      // we probably want to re-sort the data when we get new items
      this.angularGrid.dataView?.reSort();

      // update metrics
      this.metrics.itemCount = this.angularGrid.dataView?.getFilteredItemCount() || 0;
      this.metrics.totalItemCount = args.itemCount || 0;
    }
  }

  setSortingDynamically() {
    this.angularGrid?.sortService.updateSorting([{ columnId: 'title', direction: 'DESC' }]);
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
