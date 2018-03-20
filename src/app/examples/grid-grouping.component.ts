import { Component, OnInit } from '@angular/core';
import { Column, FieldType, Formatter, Formatters, GridOption, Editors } from './../modules/angular-slickgrid';

// using external non-typed js libraries
declare var Slick: any;

// create my custom Formatter with the Formatter type
const myCustomCheckmarkFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
  value ? `<i class="fa fa-fire" aria-hidden="true"></i>` : '<i class="fa fa-snowflake-o" aria-hidden="true"></i>';

@Component({
  templateUrl: './grid-grouping.component.html'
})
export class GridGroupingComponent implements OnInit {
  title = 'Example 14: Grouping';
  subTitle = `
  <ul>
    <li>Fully dynamic and interactive multi-level grouping with filtering and aggregates over 50'000 items</li>
    <li>Each grouping level can have its own aggregates (over child rows, child groups, or all descendant rows)..</li>
  </ul>
  `;

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  gridObj: any;
  dataviewObj: any;
  sortcol = 'title';
  sortdir = 1;
  percentCompleteThreshold = 0;
  prevPercentCompleteThreshold = 0;

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'sel', name: '#', field: 'num', width: 40, maxWidth: 70, resizable: true, selectable: false, focusable: false },
      { id: 'title', name: 'Title', field: 'title', width: 70, minWidth: 50, cssClass: 'cell-title', sortable: true, editor: Editors.text },
      { id: 'duration', name: 'Duration', field: 'duration', width: 70, sortable: true, groupTotalsFormatter: this.sumTotalsFormatter },
      { id: '%', name: '% Complete', field: 'percentComplete', width: 80, formatter: Formatters.percentCompleteBar, sortable: true, groupTotalsFormatter: this.avgTotalsFormatter },
      { id: 'start', name: 'Start', field: 'start', minWidth: 60, sortable: true, formatter: Formatters.dateIso },
      { id: 'finish', name: 'Finish', field: 'finish', minWidth: 60, sortable: true, formatter: Formatters.dateIso },
      { id: 'cost', name: 'Cost', field: 'cost', width: 90, sortable: true, groupTotalsFormatter: this.sumTotalsFormatter },
      { id: 'effort-driven', name: 'Effort Driven', width: 80, minWidth: 20, maxWidth: 80, cssClass: 'cell-effort-driven', field: 'effortDriven', formatter: Formatters.checkmark, sortable: true }
    ];
    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableGrouping: true
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
        cost: Math.round(Math.random() * 10000) / 100,
        effortDriven: (i % 5 === 0)
      };
    }
  }

  gridReady(grid) {
    this.gridObj = grid;
  }

  dataviewReady(dataview) {
    this.dataviewObj = dataview;
  }

  clearGrouping() {
    this.dataviewObj.setGrouping([]);
  }

  collapseAllGroups() {
    this.dataviewObj.collapseAllGroups();
  }

  expandAllGroups() {
    this.dataviewObj.expandAllGroups();
  }

  avgTotalsFormatter(totals, columnDef) {
    const val = totals.avg && totals.avg[columnDef.field];
    if (val != null) {
      return 'avg: ' + Math.round(val) + '%';
    }
    return '';
  }
  sumTotalsFormatter(totals, columnDef) {
    const val = totals.sum && totals.sum[columnDef.field];
    if (val != null) {
      return 'total: ' + ((Math.round(parseFloat(val) * 100) / 100));
    }
    return '';
  }
  myFilter(item, args) {
    return item['percentComplete'] >= args.percentComplete;
  }
  percentCompleteSort(a, b) {
    return a['percentComplete'] - b['percentComplete'];
  }
  comparer(a: any, b: any) {
    const x = a[this.sortcol], y = b[this.sortcol];
    return (x === y ? 0 : (x > y ? 1 : -1));
  }
  groupByDuration() {
    this.dataviewObj.setGrouping({
      getter: 'duration',
      formatter: (g) => {
        return `Duration:  ${g.value} <span style="color:green">(${g.count} items)</span>`;
      },
      aggregators: [
        new Slick.Data.Aggregators.Avg('percentComplete'),
        new Slick.Data.Aggregators.Sum('cost')
      ],
      aggregateCollapsed: false,
      lazyTotalsCalculation: true
    });
  }
  groupByDurationOrderByCount(aggregateCollapsed) {
    this.dataviewObj.setGrouping({
      getter: 'duration',
      formatter: (g) => {
        return `Duration:  ${g.value} <span style="color:green">(${g.count} items)</span>`;
      },
      comparer: (a, b) => {
        return a.count - b.count;
      },
      aggregators: [
        new Slick.Data.Aggregators.Avg('percentComplete'),
        new Slick.Data.Aggregators.Sum('cost')
      ],
      aggregateCollapsed,
      lazyTotalsCalculation: true
    });
  }
  groupByDurationEffortDriven() {
    this.dataviewObj.setGrouping([
      {
        getter: 'duration',
        formatter: (g) => {
          return `Duration:  ${g.value}  <span style="color:green">(${g.count} items)</span>`;
        },
        aggregators: [
          new Slick.Data.Aggregators.Sum('duration'),
          new Slick.Data.Aggregators.Sum('cost')
        ],
        aggregateCollapsed: true,
        lazyTotalsCalculation: true
      },
      {
        getter: 'effortDriven',
        formatter: (g) => {
          return `Effort-Driven:  ${(g.value ? 'True' : 'False')} <span style="color:green">(${g.count} items)</span>`;
        },
        aggregators: [
          new Slick.Data.Aggregators.Avg('percentComplete'),
          new Slick.Data.Aggregators.Sum('cost')
        ],
        collapsed: true,
        lazyTotalsCalculation: true
      }
    ]);
  }
  groupByDurationEffortDrivenPercent() {
    this.dataviewObj.setGrouping([
      {
        getter: 'duration',
        formatter: (g) => {
          return `Duration:  ${g.value}  <span style="color:green">(${g.count} items)</span>`;
        },
        aggregators: [
          new Slick.Data.Aggregators.Sum('duration'),
          new Slick.Data.Aggregators.Sum('cost')
        ],
        aggregateCollapsed: true,
        lazyTotalsCalculation: true
      },
      {
        getter: 'effortDriven',
        formatter: (g) => {
          return `Effort-Driven:  ${(g.value ? 'True' : 'False')}  <span style="color:green">(${g.count} items)</span>`;
        },
        aggregators: [
          new Slick.Data.Aggregators.Sum('duration'),
          new Slick.Data.Aggregators.Sum('cost')
        ],
        lazyTotalsCalculation: true
      },
      {
        getter: 'percentComplete',
        formatter: (g) => {
          return `% Complete:  ${g.value}  <span style="color:green">(${g.count} items)</span>`;
        },
        aggregators: [
          new Slick.Data.Aggregators.Avg('percentComplete')
        ],
        aggregateCollapsed: true,
        collapsed: true,
        lazyTotalsCalculation: true
      }
    ]);
  }
}
