import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import { TextExportService } from '@slickgrid-universal/text-export';

import {
  AngularGridInstance,
  Aggregators,
  Column,
  Editors,
  FieldType,
  FileType,
  Filters,
  Formatters,
  GridOption,
  Grouping,
  GroupingGetterFunction,
  GroupTotalFormatters,
  SortDirectionNumber,
  SortComparers,
} from './../modules/angular-slickgrid';

@Component({
  templateUrl: './grid-draggrouping.component.html',
})
export class GridDraggableGroupingComponent implements OnInit, OnDestroy {
  private _darkMode = false;
  title = 'Example 19: Draggable Grouping & Aggregators';
  subTitle = `
      <ul>
        <li><a href="https://ghiscoding.gitbook.io/angular-slickgrid/grid-functionalities/grouping-and-aggregators" target="_blank">Wiki docs</a></li>
        <li>This example shows 3 ways of grouping</li>
        <ol>
          <li>Drag any Column Header on the top placeholder to group by that column (support moti-columns grouping by adding more columns to the drop area).</li>
          <li>Use buttons and defined functions to group by wichever field you want</li>
          <li>Use the Select dropdown to group, the position of the Selects represent the grouping level</li>
        </ol>
        <li>Fully dynamic and interactive multi-level grouping with filtering and aggregates ovor 50'000 items</li>
        <li>Each grouping level can have its own aggregates (over child rows, child groups, or all descendant rows)..</li>
        <li>Use "Aggregators" and "GroupTotalFormatters" directly from Angular-Slickgrid</li>
      </ul>
    `;

  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  dataset!: any[];
  dataviewObj: any;
  draggableGroupingPlugin: any;
  durationOrderByCount = false;
  gridObj: any;
  gridOptions!: GridOption;
  hideSubTitle = false;
  processing = false;
  selectedGroupingFields: Array<string | GroupingGetterFunction> = ['', '', ''];
  excelExportService = new ExcelExportService();
  textExportService = new TextExportService();

  constructor() {
    // define the grid options & columns and then create the grid itself
    this.loadData(500);
    this.defineGrid();
  }

  ngOnInit(): void {
    // populate the dataset once the grid is ready
    this.defineGrid();
  }

  ngOnDestroy() {
    document.querySelector('.panel-wm-content')!.classList.remove('dark-mode');
    document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'light';
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid; // grid object
    this.dataviewObj = angularGrid.dataView;
  }

  /* Define grid Options and Columns */
  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'title',
        name: 'Title',
        field: 'title',
        columnGroup: 'Common Factor',
        width: 70,
        minWidth: 50,
        cssClass: 'cell-title',
        filterable: true,
        sortable: true,
        grouping: {
          getter: 'title',
          formatter: (g) => `Title: ${g.value}  <span class="text-primary">(${g.count} items)</span>`,
          aggregators: [new Aggregators.Sum('cost')],
          aggregateCollapsed: false,
          collapsed: false,
        },
      },
      {
        id: 'duration',
        name: 'Duration',
        field: 'duration',
        columnGroup: 'Common Factor',
        width: 70,
        sortable: true,
        filterable: true,
        editor: {
          model: Editors.float,
          // required: true,
          decimal: 2,
          valueStep: 1,
          maxValue: 10000,
          alwaysSaveOnEnterKey: true,
        },
        filter: { model: Filters.slider, operator: '>=' },
        type: FieldType.number,
        groupTotalsFormatter: GroupTotalFormatters.sumTotals,
        grouping: {
          getter: 'duration',
          formatter: (g) => `Duration: ${g.value}  <span class="text-primary">(${g.count} items)</span>`,
          comparer: (a, b) => {
            return this.durationOrderByCount
              ? a.count - b.count
              : SortComparers.numeric(a.value, b.value, SortDirectionNumber.asc);
          },
          aggregators: [new Aggregators.Sum('duration'), new Aggregators.Sum('cost')],
          aggregateCollapsed: false,
          collapsed: false,
        },
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        columnGroup: 'Period',
        minWidth: 60,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
        type: FieldType.dateUtc,
        outputType: FieldType.dateIso,
        exportWithFormatter: true,
        grouping: {
          getter: 'start',
          formatter: (g) => `Start: ${g.value}  <span class="text-primary">(${g.count} items)</span>`,
          aggregators: [new Aggregators.Sum('cost')],
          aggregateCollapsed: false,
          collapsed: false,
        },
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        columnGroup: 'Period',
        minWidth: 60,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
        type: FieldType.dateUtc,
        outputType: FieldType.dateIso,
        exportWithFormatter: true,
        grouping: {
          getter: 'finish',
          formatter: (g) => `Finish: ${g.value} <span class="text-primary">(${g.count} items)</span>`,
          aggregators: [new Aggregators.Sum('cost')],
          aggregateCollapsed: false,
          collapsed: false,
        },
      },
      {
        id: 'cost',
        name: 'Cost',
        field: 'cost',
        columnGroup: 'Analysis',
        width: 90,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        formatter: Formatters.dollar,
        groupTotalsFormatter: GroupTotalFormatters.sumTotalsDollar,
        type: FieldType.number,
        grouping: {
          getter: 'cost',
          formatter: (g) => `Cost: ${g.value} <span class="text-primary">(${g.count} items)</span>`,
          aggregators: [new Aggregators.Sum('cost')],
          aggregateCollapsed: true,
          collapsed: true,
        },
      },
      {
        id: 'percentComplete',
        name: '% Complete',
        field: 'percentComplete',
        columnGroup: 'Analysis',
        minWidth: 70,
        width: 90,
        formatter: Formatters.percentCompleteBar,
        type: FieldType.number,
        filterable: true,
        filter: { model: Filters.compoundSlider },
        sortable: true,
        groupTotalsFormatter: GroupTotalFormatters.avgTotalsPercentage,
        grouping: {
          getter: 'percentComplete',
          formatter: (g) => `% Complete: ${g.value}  <span class="text-primary">(${g.count} items)</span>`,
          aggregators: [new Aggregators.Sum('cost')],
          aggregateCollapsed: false,
          collapsed: false,
        },
        params: { groupFormatterPrefix: '<i>Avg</i>: ' },
      },
      {
        id: 'effortDriven',
        name: 'Effort-Driven',
        field: 'effortDriven',
        columnGroup: 'Analysis',
        width: 80,
        minWidth: 20,
        maxWidth: 100,
        cssClass: 'cell-effort-driven',
        sortable: true,
        filterable: true,
        filter: {
          collection: [
            { value: '', label: '' },
            { value: true, label: 'True' },
            { value: false, label: 'False' },
          ],
          model: Filters.singleSelect,
        },
        formatter: Formatters.checkmarkMaterial,
        grouping: {
          getter: 'effortDriven',
          formatter: (g) => `Effort-Driven: ${g.value ? 'True' : 'False'} <span class="text-primary">(${g.count} items)</span>`,
          aggregators: [new Aggregators.Sum('duration'), new Aggregators.Sum('cost')],
          collapsed: false,
        },
      },
    ];

    this.gridOptions = {
      autoResize: {
        container: '#demo-container',
        rightPadding: 10,
      },
      enableDraggableGrouping: true,
      autoEdit: true, // true single click (false for double-click)
      autoCommitEdit: true,
      editable: true,
      enableCellNavigation: true,

      // pre-header will include our Header Grouping (i.e. "Common Factor")
      // Draggable Grouping could be located in either the Pre-Header OR the new Top-Header
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 30,

      // when Top-Header is created, it will be used by the Draggable Grouping (otherwise the Pre-Header will be used)
      createTopHeaderPanel: true,
      showTopHeaderPanel: true,
      topHeaderPanelHeight: 35,

      showCustomFooter: true,
      enableFiltering: true,
      // you could debounce/throttle the input text filter if you have lots of data
      // filterTypingDebounce: 250,
      enableSorting: true,
      textExportOptions: {
        sanitizeDataExport: true,
      },
      gridMenu: {
        onCommand: (e, args) => {
          if (args.command === 'toggle-preheader') {
            // in addition to the grid menu pre-header toggling (internally), we will also clear grouping
            this.clearGrouping();
          }
        },
      },
      draggableGrouping: {
        dropPlaceHolderText: 'Drop a column header here to group by the column',
        // groupIconCssClass: 'mdi mdi-drag-vertical',
        deleteIconCssClass: 'mdi mdi-close text-color-danger',
        sortAscIconCssClass: 'mdi mdi-arrow-up',
        sortDescIconCssClass: 'mdi mdi-arrow-down',
        onGroupChanged: (e, args) => this.onGroupChanged(args),
        onExtensionRegistered: (extension) => (this.draggableGroupingPlugin = extension),
      },
      darkMode: this._darkMode,
      enableTextExport: true,
      enableExcelExport: true,
      excelExportOptions: { sanitizeDataExport: true },
      externalResources: [this.excelExportService, this.textExportService],
    };

    this.loadData(500);
  }

  loadData(rowCount: number) {
    // mock a dataset
    const tmpData = [];
    for (let i = 0; i < rowCount; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 29);
      const randomPercent = Math.round(Math.random() * 100);
      const randomCost = Math.round(Math.random() * 10000) / 100;

      tmpData[i] = {
        id: 'id_' + i,
        num: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, randomMonth + 1, randomDay),
        cost: i % 33 === 0 ? -randomCost : randomCost,
        effortDriven: i % 5 === 0,
      };
    }
    this.dataset = tmpData;
  }

  clearGroupsAndSelects() {
    this.clearGroupingSelects();
    this.clearGrouping();
  }

  clearGrouping(invalidateRows = true) {
    this.draggableGroupingPlugin?.clearDroppedGroups();
    if (invalidateRows) {
      this.gridObj?.invalidate(); // invalidate all rows and re-render
    }
  }

  clearGroupingSelects() {
    this.selectedGroupingFields.forEach((g, i) => (this.selectedGroupingFields[i] = ''));
  }

  collapseAllGroups() {
    this.dataviewObj.collapseAllGroups();
  }

  expandAllGroups() {
    this.dataviewObj.expandAllGroups();
  }

  exportToExcel() {
    this.excelExportService.exportToExcel({
      filename: 'Export',
      format: FileType.xlsx,
    });
  }

  groupByDurationOrderByCount(sortedByCount = false) {
    this.durationOrderByCount = sortedByCount;
    this.clearGrouping(false);

    if (this.draggableGroupingPlugin?.setDroppedGroups) {
      this.showPreHeader();
      this.draggableGroupingPlugin.setDroppedGroups('duration');

      // you need to manually add the sort icon(s) in UI
      const sortColumns = sortedByCount ? [] : [{ columnId: 'duration', sortAsc: true }];
      this.gridObj?.setSortColumns(sortColumns);
      this.gridObj?.invalidate(); // invalidate all rows and re-render
    }
  }

  groupByDurationEffortDriven() {
    this.clearGrouping(false);
    if (this.draggableGroupingPlugin?.setDroppedGroups) {
      this.showPreHeader();
      this.draggableGroupingPlugin.setDroppedGroups(['duration', 'effortDriven']);
      this.gridObj?.invalidate(); // invalidate all rows and re-render
    }
  }

  groupByFieldName(_fieldName: string, _index: number) {
    this.clearGrouping();
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      // get the field names from Group By select(s) dropdown, but filter out any empty fields
      const groupedFields = this.selectedGroupingFields.filter((g) => g !== '');

      this.showPreHeader();
      this.draggableGroupingPlugin.setDroppedGroups(groupedFields);
      this.gridObj.invalidate(); // invalidate all rows and re-render
    }
  }

  onGroupChanged(change: { caller?: string; groupColumns: Grouping[] }) {
    // the "caller" property might not be in the SlickGrid core lib yet, reference PR https://github.com/6pac/SlickGrid/pull/303
    const caller = (change && change.caller) || [];
    const groups = (change && change.groupColumns) || [];

    if (Array.isArray(this.selectedGroupingFields) && Array.isArray(groups) && groups.length > 0) {
      // update all Group By select dropdown
      this.selectedGroupingFields.forEach((g, i) => (this.selectedGroupingFields[i] = (groups[i] && groups[i].getter) || ''));
    } else if (groups.length === 0 && caller === 'remove-group') {
      this.clearGroupingSelects();
    }
  }

  onCellChanged() {
    // when user changes a cell, we need to advise the DataView for the grouping to update its totals
    this.angularGrid.dataView?.refresh();
  }

  showPreHeader() {
    this.gridObj.setPreHeaderPanelVisibility(true);
  }

  selectTrackByFn(index: number, _item: any) {
    return index;
  }

  setFiltersDynamically() {
    // we can Set Filters Dynamically (or different filters) afterward through the FilterService
    this.angularGrid.filterService.updateFilters([
      { columnId: 'percentComplete', operator: '>=', searchTerms: ['55'] },
      { columnId: 'cost', operator: '<', searchTerms: ['80'] },
    ]);
  }

  setSortingDynamically() {
    this.angularGrid.sortService.updateSorting([
      // orders matter, whichever is first in array will be the first sorted column
      { columnId: 'percentComplete', direction: 'ASC' },
    ]);
  }

  toggleDraggableGroupingRow() {
    this.clearGrouping();
    this.gridObj.setTopHeaderPanelVisibility(!this.gridObj.getOptions().showTopHeaderPanel);
  }

  toggleDarkMode() {
    this._darkMode = !this._darkMode;
    this.toggleBodyBackground();
    this.angularGrid.slickGrid?.setOptions({ darkMode: this._darkMode });
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
}
