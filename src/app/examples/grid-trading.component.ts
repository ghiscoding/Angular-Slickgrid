import { Component, OnDestroy, OnInit, ViewEncapsulation, } from '@angular/core';
import { faker } from '@faker-js/faker';
import sparkline from '@fnando/sparkline';
import {
  Aggregators,
  AngularGridInstance,
  Column,
  deepCopy,
  FieldType,
  Filters,
  Formatter,
  Formatters,
  GridOption,
  GroupTotalFormatters,
} from '../modules/angular-slickgrid';

const NB_ROWS = 200;

const currencyFormatter: Formatter = (cell: number, row: number, value: string) =>
  `<img src="https://flags.fmcdn.net/data/flags/mini/${value.substr(0, 2).toLowerCase()}.png" width="20"/> ${value}`;

const priceFormatter: Formatter = (cell: number, row: number, value: number, col: Column, dataContext: any) => {
  const direction = dataContext.priceChange >= 0 ? 'up' : 'down';
  return `<span class="fa fa-arrow-${direction} text-${direction === 'up' ? 'success' : 'danger'}"></span> ${value}`;
};

const transactionTypeFormatter: Formatter = (row: number, cell: number, value: string) =>
  `<span <span class="fa fa-${value === 'Buy' ? 'plus' : 'minus'}-circle ${value === 'Buy' ? 'text-info' : 'text-warning'}"></span> ${value}`;

const historicSparklineFormatter: Formatter = (row: number, cell: number, value: string, col: Column, dataContext: any) => {
  const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElem.setAttributeNS(null, 'width', '135');
  svgElem.setAttributeNS(null, 'height', '30');
  svgElem.setAttributeNS(null, 'stroke-width', '2');
  svgElem.classList.add('sparkline');
  sparkline(svgElem, dataContext.historic, { interactive: true });
  return svgElem.outerHTML;
};

@Component({
  templateUrl: './grid-trading.component.html',
  styleUrls: ['./grid-trading.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridTradingComponent implements OnDestroy, OnInit {
  title = 'Example 33: Real-Time Trading Platform';
  subTitle = `Simulate a stock trading platform with lot of price changes
    <ul>
      <li>you can start/stop the simulation</li>
      <li>optionally change random numbers, between 0 and 10 symbols, per cycle (higher numbers means more changes)</li>
      <li>optionally change the simulation changes refresh rate in ms (lower number means more changes).</li>
      <li>you can Group by 1 of these columns: Currency, Market or Type</li>
      <li>to show SlickGrid HUGE PERF., do the following: (1) lower Changes Rate (2) increase both Changes per Cycle and (3) lower Highlight Duration
    </ul>`;
  angularGrid!: AngularGridInstance;
  gridOptions!: GridOption;
  columnDefinitions: Column[] = [];
  dataset: any[] = [];
  isFullScreen = false;
  highlightDuration = 150;
  itemCount = 200;
  minChangePerCycle = 0;
  maxChangePerCycle = 10;
  refreshRate = 75;
  timer: any;

  ngOnInit(): void {
    this.defineGrid();

    // mock a dataset
    this.dataset = this.loadData(NB_ROWS);

    setTimeout(() => {
      this.startSimulation();
    }, this.refreshRate);
  }

  ngOnDestroy(): void {
    this.stopSimulation();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  /* Define grid Options and Columns */
  defineGrid() {
    // the columns field property is type-safe, try to add a different string not representing one of DataItems properties
    this.columnDefinitions = [
      {
        id: 'currency', name: 'Currency', field: 'currency', filterable: true, sortable: true, minWidth: 65, width: 65,
        formatter: currencyFormatter,
        filter: {
          model: Filters.singleSelect,
          collection: [{ label: '', value: '' }, { label: 'CAD', value: 'CAD' }, { label: 'USD', value: 'USD' }]
        },
        grouping: {
          getter: 'currency',
          formatter: (g) => `Currency: <span style="color: #003597; font-weight: bold;">${g.value}</span>  <span style="color: #659bff;">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('amount')
          ],
          aggregateCollapsed: true,
          collapsed: false
        }
      },
      { id: 'symbol', name: 'Symbol', field: 'symbol', filterable: true, sortable: true, minWidth: 65, width: 65 },
      {
        id: 'market', name: 'Market', field: 'market', filterable: true, sortable: true, minWidth: 75, width: 75,
        grouping: {
          getter: 'market',
          formatter: (g) => `Market: <span style="color: #003597; font-weight: bold;">${g.value}</span>  <span style="color: #659bff;">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('amount')
          ],
          aggregateCollapsed: true,
          collapsed: false
        }
      },
      { id: 'company', name: 'Company', field: 'company', filterable: true, sortable: true, minWidth: 80, width: 130 },
      {
        id: 'trsnType', name: 'Type', field: 'trsnType', filterable: true, sortable: true, minWidth: 60, width: 60,
        formatter: transactionTypeFormatter,
        filter: {
          model: Filters.singleSelect,
          collection: [{ label: '', value: '' }, { label: 'Buy', value: 'Buy' }, { label: 'Sell', value: 'Sell' }]
        },
        grouping: {
          getter: 'trsnType',
          formatter: (g) => `Type: <span style="color: #003597; font-weight: bold;">${g.value}</span>  <span style="color: #659bff;">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('amount')
          ],
          aggregateCollapsed: true,
          collapsed: false
        }
      },
      {
        id: 'priceChange', name: 'Change', field: 'priceChange', filterable: true, sortable: true, minWidth: 80, width: 80,
        filter: { model: Filters.compoundInputNumber }, type: FieldType.number,
        formatter: Formatters.multiple,
        params: {
          formatters: [Formatters.dollarColored, priceFormatter],
          maxDecimal: 2,
        }

      },
      {
        id: 'price', name: 'Price', field: 'price', filterable: true, sortable: true, minWidth: 70, width: 70,
        filter: { model: Filters.compoundInputNumber }, type: FieldType.number,
        formatter: Formatters.dollar, params: { maxDecimal: 2 }
      },
      {
        id: 'quantity', name: 'Quantity', field: 'quantity', filterable: true, sortable: true, minWidth: 70, width: 70,
        filter: { model: Filters.compoundInputNumber }, type: FieldType.number,
      },
      {
        id: 'amount', name: 'Amount', field: 'amount', filterable: true, sortable: true, minWidth: 70, width: 60,
        filter: { model: Filters.compoundInputNumber }, type: FieldType.number,
        formatter: Formatters.dollar, params: { maxDecimal: 2 },
        groupTotalsFormatter: GroupTotalFormatters.sumTotalsDollarBold,
      },
      { id: 'historic', name: 'Price History', field: 'historic', minWidth: 100, width: 150, maxWidth: 150, formatter: historicSparklineFormatter },
      {
        id: 'execution', name: 'Execution Timestamp', field: 'execution', filterable: true, sortable: true, minWidth: 125,
        formatter: Formatters.dateTimeIsoAmPm, exportWithFormatter: true,
        type: FieldType.dateTimeIsoAM_PM, filter: { model: Filters.compoundDate }
      },
    ];

    this.gridOptions = {
      autoResize: {
        container: '.trading-platform',
        rightPadding: 0,
        bottomPadding: 10,
      },
      formatterOptions: {
        displayNegativeNumberWithParentheses: true,
        thousandSeparator: ','
      },
      draggableGrouping: {
        dropPlaceHolderText: 'Drop a column header here to group by any of these available columns: Currency, Market or Type',
        deleteIconCssClass: 'fa fa-times',
      },
      enableDraggableGrouping: true,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 40,
      enableCellNavigation: true,
      enableFiltering: true,
      cellHighlightCssClass: 'changed',
    };
  }

  loadData(itemCount: number): any[] {
    // mock a dataset
    const tmpDataset = [];
    for (let i = 0; i < itemCount; i++) {
      const randomPercent = Math.round(Math.random() * 100);
      const randomLowQty = this.randomNumber(1, 50);
      const randomHighQty = this.randomNumber(125, 255);
      const priceChange = this.randomNumber(-25, 35, false);
      const price = this.randomNumber(priceChange, 300);
      const quantity = price < 5 ? randomHighQty : randomLowQty;
      const amount = price * quantity;
      const now = new Date();
      now.setHours(9, 30, 0);
      const currency = (Math.floor(Math.random() * 10)) % 2 ? 'CAD' : 'USD';
      const company = faker.company.name();

      tmpDataset[i] = {
        id: i,
        currency,
        trsnType: (Math.round(Math.random() * 100)) % 2 ? 'Buy' : 'Sell',
        company,
        symbol: currency === 'CAD' ? company.substr(0, 3).toUpperCase() + '.TO' : company.substr(0, 4).toUpperCase(),
        market: currency === 'CAD' ? 'TSX' : price > 200 ? 'Nasdaq' : 'S&P 500',
        duration: (i % 33 === 0) ? null : Math.random() * 100 + '',
        percentCompleteNumber: randomPercent,
        priceChange,
        price,
        quantity,
        amount,
        execution: now,
        historic: [price]
      };
    }

    return tmpDataset;
  }

  startSimulation() {
    const changes: any = {};
    const numberOfUpdates = this.randomNumber(this.minChangePerCycle, this.maxChangePerCycle);

    for (let i = 0; i < numberOfUpdates; i++) {
      const randomLowQty = this.randomNumber(1, 50);
      const randomHighQty = this.randomNumber(125, 255);
      const rowNumber = Math.round(Math.random() * (this.dataset.length - 1));
      const priceChange = this.randomNumber(-25, 25, false);
      const prevItem = deepCopy(this.dataset[rowNumber]);
      const itemTmp = { ...this.dataset[rowNumber] };
      itemTmp.priceChange = priceChange;
      itemTmp.price = ((itemTmp.price + priceChange) < 0) ? 0 : itemTmp.price + priceChange;
      itemTmp.quantity = itemTmp.price < 5 ? randomHighQty : randomLowQty;
      itemTmp.amount = itemTmp.price * itemTmp.quantity;
      itemTmp.trsnType = (Math.round(Math.random() * 100)) % 2 ? 'Buy' : 'Sell';
      itemTmp.execution = new Date();
      itemTmp.historic.push(itemTmp.price);
      itemTmp.historic = itemTmp.historic.slice(-20); // keep a max of X historic values

      if (!changes[rowNumber]) {
        changes[rowNumber] = {};
      }

      // highlight whichever cell is being changed
      changes[rowNumber]['id'] = 'changed';
      this.renderCellHighlighting(itemTmp, this.findColumnById('priceChange'), priceChange);
      if ((prevItem.priceChange < 0 && itemTmp.priceChange > 0) || (prevItem.priceChange > 0 && itemTmp.priceChange < 0)) {
        this.renderCellHighlighting(itemTmp, this.findColumnById('price'), priceChange);
      }
      // if (prevItem.trsnType !== itemTmp.trsnType) {
      //   this.renderCellHighlighting(itemTmp, this.findColumnById('trsnType'), priceChange);
      // }

      // update the data
      this.angularGrid.dataView.updateItem(itemTmp.id, itemTmp);
      // NOTE: we should also invalidate/render the row after updating cell data to see the new data rendered in the UI
      // but the cell highlight actually does that for us so we can skip it
    }

    this.timer = setTimeout(this.startSimulation.bind(this), this.refreshRate || 0);
  }

  stopSimulation() {
    clearTimeout(this.timer);
  }

  findColumnById(columnName: string): Column {
    return this.columnDefinitions.find(col => col.field === columnName) as Column;
  }

  renderCellHighlighting(item: any, column: Column, priceChange: number) {
    if (item && column) {
      const row = this.angularGrid.dataView.getRowByItem(item) as number;
      if (row >= 0) {
        const hash = { [row]: { [column.id]: priceChange >= 0 ? 'changed-gain' : 'changed-loss' } };
        this.angularGrid.slickGrid.setCellCssStyles(`highlight_${[column.id]}${row}`, hash);

        // remove highlight after x amount of time
        setTimeout(() => this.removeCellStyling(item, column, row), this.highlightDuration);
      }
    }
  }

  /** remove change highlight css class from that cell */
  removeCellStyling(_item: any, column: Column, row: number) {
    this.angularGrid?.slickGrid?.removeCellCssStyles(`highlight_${[column.id]}${row}`);
  }

  toggleFullScreen() {
    const container = document.querySelector('.trading-platform');
    if (container?.classList.contains('full-screen')) {
      container.classList.remove('full-screen');
      this.isFullScreen = false;
    } else if (container) {
      container.classList.add('full-screen');
      this.isFullScreen = true;
    }
    this.angularGrid.resizerService.resizeGrid();
  }

  private randomNumber(min: number, max: number, floor = true) {
    const number = Math.random() * (max - min + 1) + min;
    return floor ? Math.floor(number) : number;
  }
}
