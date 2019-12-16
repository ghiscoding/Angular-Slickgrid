import { Component, Injectable, OnInit } from '@angular/core';
import {
  AngularGridInstance,
  Aggregators,
  Column,
  DelimiterType,
  FieldType,
  FileType,
  Filters,
  Formatters,
  GridOption,
  Grouping,
  GroupTotalFormatters,
  SortDirectionNumber,
  Sorters,
} from './../modules/angular-slickgrid';

@Injectable()
@Component({
  templateUrl: './grid-draggrouping.component.html'
})
export class GridDraggableGroupingComponent implements OnInit {
  title = 'Example 19: Draggable Grouping & Aggregators';
  subTitle = `
      <ul>
        <li><a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grouping-&-Aggregators" target="_blank">Wiki docs</a></li>
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

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  dataset: any[];
  dataviewObj: any;
  draggableGroupingPlugin: any;
  durationOrderByCount = false;
  gridObj: any;
  gridOptions: GridOption;
  processing = false;
  selectedGroupingFields: string[] = ['', '', ''];

  constructor() {
    // define the grid options & columns and then create the grid itself
    this.loadData(500);
    this.defineGrid();
  }

  ngOnInit(): void {
    // populate the dataset once the grid is ready
    this.defineGrid();
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
        id: 'title', name: 'Title', field: 'title',
        width: 70, minWidth: 50,
        cssClass: 'cell-title',
        filterable: true,
        sortable: true,
        grouping: {
          getter: 'title',
          formatter: (g) => `Title: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: false,
          collapsed: false
        }
      },
      {
        id: 'duration', name: 'Duration', field: 'duration',
        width: 70,
        sortable: true,
        filterable: true,
        filter: { model: Filters.slider, operator: '>=' },
        type: FieldType.number,
        groupTotalsFormatter: GroupTotalFormatters.sumTotals,
        grouping: {
          getter: 'duration',
          formatter: (g) => `Duration: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          comparer: (a, b) => {
            return this.durationOrderByCount ? (a.count - b.count) : Sorters.numeric(a.value, b.value, SortDirectionNumber.asc);
          },
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: false,
          collapsed: false
        }
      },
      {
        id: 'percentComplete', name: '% Complete', field: 'percentComplete',
        minWidth: 70, width: 90,
        formatter: Formatters.percentCompleteBar,
        type: FieldType.number,
        filterable: true,
        filter: { model: Filters.compoundSlider },
        sortable: true,
        groupTotalsFormatter: GroupTotalFormatters.avgTotalsPercentage,
        grouping: {
          getter: 'percentComplete',
          formatter: (g) => `% Complete:  ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: false,
          collapsed: false
        },
        params: { groupFormatterPrefix: '<i>Avg</i>: ' }
      },
      {
        id: 'start', name: 'Start', field: 'start', minWidth: 60,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
        type: FieldType.dateUtc,
        outputType: FieldType.dateIso,
        exportWithFormatter: true,
        grouping: {
          getter: 'start',
          formatter: (g) => `Start: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: false,
          collapsed: false
        }
      },
      {
        id: 'finish', name: 'Finish', field: 'finish',
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
          formatter: (g) => `Finish: ${g.value} <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: false,
          collapsed: false
        }
      },
      {
        id: 'cost', name: 'Cost', field: 'cost',
        width: 90,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInput },
        formatter: Formatters.dollar,
        groupTotalsFormatter: GroupTotalFormatters.sumTotalsDollar,
        type: FieldType.number,
        grouping: {
          getter: 'cost',
          formatter: (g) => `Cost: ${g.value} <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: true,
          collapsed: true
        }
      },
      {
        id: 'effortDriven', name: 'Effort Driven', field: 'effortDriven',
        width: 80, minWidth: 20, maxWidth: 100,
        cssClass: 'cell-effort-driven',
        sortable: true,
        filterable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: true, label: 'True' }, { value: false, label: 'False' }],
          model: Filters.singleSelect
        },
        formatter: Formatters.checkmark,
        grouping: {
          getter: 'effortDriven',
          formatter: (g) => `Effort-Driven: ${g.value ? 'True' : 'False'} <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          collapsed: false
        }
      }
    ];

    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableDraggableGrouping: true,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 40,
      enableFiltering: true,
      enableSorting: true,
      enableColumnReorder: true,
      exportOptions: {
        sanitizeDataExport: true
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
        // groupIconCssClass: 'fa fa-outdent',
        deleteIconCssClass: 'fa fa-times',
        onGroupChanged: (e, args) => this.onGroupChanged(args),
        onExtensionRegistered: (extension) => this.draggableGroupingPlugin = extension,
      }
    };

    this.loadData(500);
  }

  loadData(rowCount: number) {
    // mock a dataset
    this.dataset = [];
    for (let i = 0; i < rowCount; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: 'id_' + i,
        num: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        cost: (i % 33 === 0) ? null : Math.round(Math.random() * 10000) / 100,
        effortDriven: (i % 5 === 0)
      };
    }
  }

  clearGroupsAndSelects() {
    this.clearGroupingSelects();
    this.clearGrouping();
  }

  clearGrouping() {
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      this.draggableGroupingPlugin.clearDroppedGroups();
    }
  }

  clearGroupingSelects() {
    this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = '');
  }

  collapseAllGroups() {
    this.dataviewObj.collapseAllGroups();
  }

  expandAllGroups() {
    this.dataviewObj.expandAllGroups();
  }

  exportToExcel() {
    this.angularGrid.excelExportService.exportToExcel({
      filename: 'Export',
      format: FileType.xlsx
    });
  }

  exportToCsv(type = 'csv') {
    this.angularGrid.exportService.exportToFile({
      delimiter: (type === 'csv') ? DelimiterType.comma : DelimiterType.tab,
      filename: 'myExport',
      format: (type === 'csv') ? FileType.csv : FileType.txt
    });
  }

  groupByDuration() {
    this.clearGrouping();
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      this.showPreHeader();
      this.draggableGroupingPlugin.setDroppedGroups('duration');
      this.gridObj.invalidate();
      this.gridObj.render();
    }
  }

  groupByDurationOrderByCount(isOrderingByCount = false) {
    this.durationOrderByCount = isOrderingByCount;
    this.clearGrouping();
    this.groupByDuration();
  }

  groupByDurationEffortDriven() {
    this.clearGrouping();
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      this.showPreHeader();
      this.draggableGroupingPlugin.setDroppedGroups(['duration', 'effortDriven']);
      this.gridObj.invalidate();
      this.gridObj.render();
    }
  }

  groupByFieldName(fieldName, index) {
    this.clearGrouping();
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      // get the field names from Group By select(s) dropdown, but filter out any empty fields
      const groupedFields = this.selectedGroupingFields.filter((g) => g !== '');

      this.showPreHeader();
      this.draggableGroupingPlugin.setDroppedGroups(groupedFields);
      this.gridObj.invalidate();
      this.gridObj.render();
    }
  }

  onGroupChanged(change: { caller?: string; groupColumns: Grouping[] }) {
    // the "caller" property might not be in the SlickGrid core lib yet, reference PR https://github.com/6pac/SlickGrid/pull/303
    const caller = change && change.caller || [];
    const groups = change && change.groupColumns || [];

    if (Array.isArray(this.selectedGroupingFields) && Array.isArray(groups) && groups.length > 0) {
      // update all Group By select dropdown
      this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = groups[i] && groups[i].getter || '');
    } else if (groups.length === 0 && caller === 'remove-group') {
      this.clearGroupingSelects();
    }
  }

  showPreHeader() {
    this.gridObj.setPreHeaderPanelVisibility(true);
  }

  selectTrackByFn(index, item) {
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
    this.gridObj.setPreHeaderPanelVisibility(!this.gridObj.getOptions().showPreHeaderPanel);
  }
}
