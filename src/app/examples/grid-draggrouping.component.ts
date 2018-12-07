import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import {
  AngularGridInstance,
  Aggregators,
  Column,
  FieldType,
  Filters,
  Formatters,
  GridOption,
  Grouping,
  GroupTotalFormatters,
  SortDirectionNumber,
  Sorters
} from './../modules/angular-slickgrid';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
@Component({
  templateUrl: './grid-draggrouping.component.html'
})
export class GridDraggableGroupingComponent implements OnInit, OnDestroy {
    title = 'Example 19: Draggable Grouping & Aggregators';
    subTitle = `
      <ul>
        <li><a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grouping-&-Aggregators" target="_blank">Wiki docs</a></li>
        <li>Drag any Column Header on the top placeholder to group by that column (support multi-columns grouping by adding more columns).</li>
        <li>Fully dynamic and interactive multi-level grouping with filtering and aggregates over 50'000 items</li>
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
    subOnBeforeExport: Subscription;
    subOnAfterExport: Subscription;

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
            formatter: (g) => {
              return `Title:  ${g.value}  <span style="color:green">(${g.count} items)</span>`;
            },
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
            formatter: (g) => {
              return `Duration:  ${g.value}  <span style="color:green">(${g.count} items)</span>`;
            },
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
            formatter: (g) => {
              return `% Complete:  ${g.value}  <span style="color:green">(${g.count} items)</span>`;
            },
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
            formatter: (g) => {
              return `Start: ${g.value}  <span style="color:green">(${g.count} items)</span>`;
            },
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
            formatter: (g) => {
              return `Finish: ${g.value} <span style="color:green">(${g.count} items)</span>`;
            },
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
            formatter: (g) => {
              return `Cost: ${g.value} <span style="color:green">(${g.count} items)</span>`;
            },
            aggregators: [
              new Aggregators.Sum('cost')
            ],
            aggregateCollapsed: false,
            collapsed: false
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
            formatter: (g) => {
              return `Effort-Driven: ${g.value ? 'True' : 'False'} <span style="color:green">(${g.count} items)</span>`;
            },
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
          onGroupChanged: (e, args) => this.onGroupChanged(args && args.groupColumns),
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

    clearGroups() {
      this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = '');
      this.clearGrouping();
    }

    clearGrouping() {
      if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
        this.draggableGroupingPlugin.clearDroppedGroups();
      }
    }

    collapseAllGroups() {
      this.dataviewObj.collapseAllGroups();
    }

    expandAllGroups() {
      this.dataviewObj.expandAllGroups();
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

    changeFirstGroupBy() {
      this.selectedGroupingFields[0] = 'title';
    }

    onGroupChanged(groups: Grouping[]) {
      if (Array.isArray(this.selectedGroupingFields) && Array.isArray(groups) && groups.length > 0) {
        // update all Group By select dropdown
        this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = groups[i] && groups[i].getter || '');
      }
    }

    showPreHeader() {
      this.gridObj.setPreHeaderPanelVisibility(true);
    }

    toggleDraggableGroupingRow() {
      this.clearGrouping();
      this.gridObj.setPreHeaderPanelVisibility(!this.gridObj.getOptions().showPreHeaderPanel);
    }
  }
