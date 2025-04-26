import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SlickCustomTooltip } from '@slickgrid-universal/custom-tooltip-plugin';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import {
  AngularGridInstance,
  Column,
  EditCommand,
  Editors,
  FieldType,
  Filters,
  Formatter,
  Formatters,
  GridOption,
  MenuCommandItemCallbackArgs,
  OperatorType,
  SlickGrid,
} from '../modules/angular-slickgrid';

const NB_ITEMS = 1000;

@Component({
  templateUrl: './grid-custom-tooltip.component.html',
  styleUrls: ['./grid-custom-tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridCustomTooltipComponent implements OnInit {
  title = 'Example 32: Regular & Custom Tooltips';
  subTitle = `
  This demo shows how to create Regular & Custom Tooltips (<a href="https://ghiscoding.gitbook.io/angular-slickgrid/grid-functionalities/custom-tooltip-plugin" target="_blank">Wiki docs</a>)
  <br/>
  <ul class="small">
    <li>optionally parse regular [title] attributes and transform them into tooltips</li>
    <li>create your own Custom Tooltip via a Custom Formatter</li>
    <li>create an Async Custom Tooltip (Promise/Observable) to allowing fetching data from an API</li>
    <li>optionally add Custom Tooltip on Column Header & Column Header-Row (filters)</li>
  </ul>
  `;
  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  editCommandQueue: EditCommand[] = [];
  gridOptions!: GridOption;
  dataset!: any[];
  serverApiDelay = 500;
  showLazyLoading = false;
  hideSubTitle = false;

  ngOnInit(): void {
    this.initializeGrid();

    // mock a dataset
    this.dataset = this.loadData(NB_ITEMS);
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  initializeGrid() {
    this.columnDefinitions = [
      {
        id: 'title',
        name: 'Title',
        field: 'title',
        sortable: true,
        type: FieldType.string,
        editor: {
          model: Editors.longText,
          required: true,
          alwaysSaveOnEnterKey: true,
          minLength: 5,
          maxLength: 255,
        },
        filterable: true,
        customTooltip: {
          position: 'right-align', // defaults to "auto"
          // you can use the Custom Tooltip in 2 ways (synchronous or asynchronous)
          // example 1 (sync):
          // formatter: this.tooltipTaskFormatter,

          // example 2 (async):
          // when using async, the `formatter` will contain the loading spinner
          // you will need to provide an `asyncPost` function returning a Promise and also `asyncPostFormatter` formatter to display the result once the Promise resolves
          formatter: () => `<div><span class="mdi mdi-load mdi-spin-1s"></span> loading...</div>`,
          asyncProcess: () =>
            new Promise((resolve) => {
              window.setTimeout(
                () => resolve({ ratio: (Math.random() * 10) / 10, lifespan: Math.random() * 100 }),
                this.serverApiDelay
              );
            }),
          asyncPostFormatter: this.tooltipTaskAsyncFormatter as Formatter,

          // optional conditional usability callback
          // usabilityOverride: (args) => !!(args.dataContext?.id % 2) // show it only every second row
        },
      },
      {
        id: 'duration',
        name: 'Duration',
        field: 'duration',
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
        formatter: (row, cell, value) => (value > 1 ? `${value} days` : `${value} day`),
        type: FieldType.number,
      },
      {
        id: 'desc',
        name: `<span title='custom title tooltip text'>Description</span>`,
        field: 'description',
        width: 100,
        filterable: true,
        editor: {
          model: Editors.longText,
          required: true,
          alwaysSaveOnEnterKey: true,
          minLength: 5,
          maxLength: 255,
        },
        formatter: (row: number, cell: number, value: any, column: Column, dataContext) =>
          `<span title="regular tooltip (from title attribute)\r${dataContext.title} cell value:\r${value || ''}">${value || ''}</span>`,
        // define tooltip options here OR for the entire grid via the grid options (cell tooltip options will have precedence over grid options)
        customTooltip: {
          useRegularTooltip: true, // note regular tooltip will try to find a "title" attribute in the cell formatter (it won't work without a cell formatter)
          useRegularTooltipFromCellTextOnly: true,
        },
      },
      {
        id: 'desc2',
        name: `<span title='custom title tooltip text'>Description 2</span>`,
        field: 'description',
        width: 100,
        filterable: true,
        editor: {
          model: Editors.longText,
          required: true,
          alwaysSaveOnEnterKey: true,
          minLength: 5,
          maxLength: 255,
        },
        formatter: (row: number, cell: number, value: any, column: Column, dataContext) =>
          `<span title="regular tooltip (from title attribute)\r${dataContext.title} cell value:\r\r${value || ''}">${value || ''}</span>`,
        // define tooltip options here OR for the entire grid via the grid options (cell tooltip options will have precedence over grid options)
        customTooltip: {
          useRegularTooltip: true, // note regular tooltip will try to find a "title" attribute in the cell formatter (it won't work without a cell formatter)
          useRegularTooltipFromFormatterOnly: true,
          // renderRegularTooltipAsHtml: true, // defaults to false, regular "title" tooltip won't be rendered as html unless specified via this flag (also "\r\n" will be replaced by <br>)
          // maxWidth: 75,
          // maxHeight: 30,
        },
      },
      {
        id: 'cost',
        name: '<span title="custom cost title tooltip text">Cost</span>',
        field: 'cost',
        width: 90,
        sortable: true,
        filterable: true,
        // filter: { model: Filters.compoundInput },
        // formatter: Formatters.dollar,
        formatter: Formatters.multiple,
        // params: { formatters: [Formatters.dollar, (row, cell, value) => `<span title="regular tooltip, cost: ${value}">${value || ''}</span>`] },
        params: {
          formatters: [
            Formatters.dollar,
            (_row: number, _cell: number, value: any) =>
              `<span title="regular tooltip (from title attribute) -\rcell value:\n\n${value || ''}">${value || ''}</span>`,
          ] as Formatter[],
        },
        customTooltip: {
          useRegularTooltip: true,
          useRegularTooltipFromFormatterOnly: true,
        },
        type: FieldType.number,
      },
      {
        id: 'percentComplete',
        name: '% Complete',
        field: 'percentComplete',
        type: FieldType.number,
        editor: {
          model: Editors.slider,
          minValue: 0,
          maxValue: 100,
          // editorOptions: { hideSliderNumber: true },
        },
        formatter: Formatters.percentCompleteBar,
        sortable: true,
        filterable: true,
        filter: { model: Filters.slider, operator: '>=' },
        customTooltip: {
          position: 'center',
          formatter: (_row, _cell, value) => (typeof value === 'string' && value.includes('%') ? value : `${value}%`),
          headerFormatter: undefined,
          headerRowFormatter: undefined,
        },
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        sortable: true,
        // formatter: Formatters.dateIso,
        type: FieldType.date,
        outputType: FieldType.dateIso,
        filterable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
        editor: { model: Editors.date },
        // we can delay a tooltip via the async process
        customTooltip: {
          // 1- loading formatter
          formatter: () => ``, // return empty so it won't show any pre-tooltip

          // 2- delay the opening by a simple Promise and `setTimeout`
          asyncProcess: () =>
            new Promise((resolve) => {
              window.setTimeout(() => resolve({}), this.serverApiDelay); // delayed by half a second
            }),
          asyncPostFormatter: this.tooltipFormatter.bind(this) as Formatter,
        },
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        sortable: true,
        editor: { model: Editors.date, editorOptions: { range: { min: 'today' } } },
        // formatter: Formatters.dateIso,
        type: FieldType.date,
        outputType: FieldType.dateIso,
        formatter: Formatters.dateIso,
        filterable: true,
        filter: { model: Filters.dateRange },
        // you could disable the custom/regular tooltip via either of the following 2 options
        disableTooltip: true,
        // customTooltip: {
        //   usabilityOverride: (args) => false,
        // },
      },
      {
        id: 'effortDriven',
        name: 'Effort Driven',
        field: 'effortDriven',
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
        exportWithFormatter: false,
        formatter: Formatters.checkmarkMaterial,
      },
      {
        id: 'prerequisites',
        name: 'Prerequisites',
        field: 'prerequisites',
        filterable: true,
        formatter: (_row, _cell, value) => {
          if (value && Array.isArray(value)) {
            const values = value.map((val) => `Task ${val}`).join(', ');
            return `<span title="${values}">${values}</span>`;
          }
          return '';
        },
        customTooltip: {
          useRegularTooltip: true,
          maxWidth: 500,
        },
        exportWithFormatter: true,
        sanitizeDataExport: true,
        minWidth: 100,
        sortable: true,
        type: FieldType.string,
        editor: {
          // OR 1- use "fetch client", they are both supported
          // collectionAsync: fetch(URL_SAMPLE_COLLECTION_DATA),

          // OR 2- use a Promise
          collectionAsync: new Promise<any>((resolve) => {
            window.setTimeout(() => {
              resolve(
                Array.from(Array(this.dataset.length).keys()).map((k) => ({ value: k, label: k, prefix: 'Task', suffix: 'days' }))
              );
            }, 500);
          }),
          customStructure: {
            label: 'label',
            value: 'value',
            labelPrefix: 'prefix',
          },
          collectionOptions: {
            separatorBetweenTextLabels: ' ',
          },
          model: Editors.multipleSelect,
        },
        filter: {
          // collectionAsync: fetch(SAMPLE_COLLECTION_DATA_URL),
          // collectionAsync: new Promise((resolve) => {
          //   window.setTimeout(() => {
          //     resolve(Array.from(Array(dataset.value?.length).keys()).map((k) => ({ value: k, label: `Task ${k}` })));
          //   });
          // }),
          collectionLazy: () => {
            this.showLazyLoading = true;

            return new Promise((resolve) => {
              window.setTimeout(() => {
                this.showLazyLoading = false;
                resolve(Array.from(Array((this.dataset || []).length).keys()).map((k) => ({ value: k, label: `Task ${k}` })));
              }, this.serverApiDelay);
            });
          },
          // onInstantiated: (msSelect) => console.log('ms-select instance', msSelect),
          customStructure: {
            label: 'label',
            value: 'value',
            labelPrefix: 'prefix',
          },
          collectionOptions: {
            separatorBetweenTextLabels: ' ',
          },
          filterOptions: {
            minHeight: 70,
          },
          model: Filters.multipleSelect,
          operator: OperatorType.inContains,
        },
      },
      {
        id: 'action',
        name: 'Action',
        field: 'action',
        width: 70,
        minWidth: 70,
        maxWidth: 70,
        formatter: () =>
          `<div class="button-style margin-auto" style="width: 35px;"><span class="mdi mdi-dots-vertical text-primary"></span></div>`,
        excludeFromExport: true,
        cellMenu: {
          hideCloseButton: false,
          commandTitle: 'Commands',
          commandItems: [
            // array of command item objects, you can also use the "positionOrder" that will be used to sort the items in the list
            {
              command: 'command2',
              title: 'Command 2',
              positionOrder: 62,
              // you can use the "action" callback and/or use "onCallback" callback from the grid options, they both have the same arguments
              action: (_e, args) => {
                console.log(args.dataContext, args.column);
                // action callback.. do something
              },
              // only enable command when the task is not completed
              itemUsabilityOverride: (args) => {
                return !args.dataContext.completed;
              },
            },
            { command: 'command1', title: 'Command 1', cssClass: 'orange', positionOrder: 61 },
            {
              command: 'delete-row',
              title: 'Delete Row',
              positionOrder: 64,
              iconCssClass: 'mdi mdi-close',
              cssClass: 'red',
              textCssClass: 'bold',
              // only show command to 'Delete Row' when the task is not completed
              itemVisibilityOverride: (args) => {
                return !args.dataContext.completed;
              },
            },
            // you can pass divider as a string or an object with a boolean (if sorting by position, then use the object)
            // note you should use the "divider" string only when items array is already sorted and positionOrder are not specified
            { divider: true, command: '', positionOrder: 63 },
            // 'divider',
            {
              command: 'help',
              title: 'Help',
              iconCssClass: 'mdi mdi-help-circle-outline',
              positionOrder: 66,
            },
            { command: 'something', title: 'Disabled Command', disabled: true, positionOrder: 67 },
          ],
        },
      },
    ];

    this.gridOptions = {
      autoEdit: true, // true single click (false for double-click)
      autoCommitEdit: true,
      editable: true,
      autoResize: {
        container: '#demo-container',
      },
      enableAutoSizeColumns: true,
      enableAutoResize: true,
      enableCellNavigation: true,
      enableExcelExport: true,
      excelExportOptions: {
        exportWithFormatter: true,
      },
      // Custom Tooltip options can be defined in a Column or Grid Options or a mixed of both (first options found wins)
      externalResources: [new SlickCustomTooltip(), new ExcelExportService()],
      customTooltip: {
        formatter: this.tooltipFormatter.bind(this) as Formatter,
        headerFormatter: this.headerFormatter,
        headerRowFormatter: this.headerRowFormatter,
        usabilityOverride: (args) => args.cell !== 0 && args?.column?.id !== 'action', // don't show on first/last columns
        // hideArrow: true, // defaults to False
      },
      presets: {
        filters: [{ columnId: 'prerequisites', searchTerms: [1, 3, 5, 7, 9, 12, 15, 18, 21, 25, 28, 29, 30, 32, 34] }],
      },
      rowHeight: 33,
      enableFiltering: true,
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false,
      },
      showCustomFooter: true,
      enableCheckboxSelector: true,
      enableRowSelection: true,
      checkboxSelector: {
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true,
      },
      editCommandHandler: (_item: any, _column: Column, editCommand: EditCommand) => {
        this.editCommandQueue.push(editCommand);
        editCommand.execute();
      },
      // when using the cellMenu, you can change some of the default options and all use some of the callback methods
      enableCellMenu: true,
      cellMenu: {
        // all the Cell Menu callback methods (except the action callback)
        // are available under the grid options as shown below
        onCommand: (e, args) => this.executeCommand(e, args),
        onOptionSelected: (_e, args) => {
          // change "Completed" property with new option selected from the Cell Menu
          const dataContext = args && args.dataContext;
          if (dataContext && 'completed' in dataContext) {
            dataContext.completed = args.item.option;
            this.angularGrid.gridService.updateItem(dataContext);
          }
        },
      },
    };
  }

  loadData(itemCount: number): any[] {
    // mock a dataset
    // mock data
    const tmpArray = [];
    for (let i = 0; i < itemCount; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomFinishYear = new Date().getFullYear() - 3 + Math.floor(Math.random() * 10); // use only years not lower than 3 years ago
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 29);
      const randomFinish = new Date(randomFinishYear, randomMonth + 1, randomDay);

      tmpArray[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100),
        description: `This is a sample task description.\nIt can be multiline\r\rAnother line...`,
        percentComplete: Math.floor(Math.random() * (100 - 5 + 1) + 5),
        start: new Date(randomYear, randomMonth, randomDay),
        finish: randomFinish < new Date() ? '' : randomFinish, // make sure the random date is earlier than today
        cost: i % 33 === 0 ? null : Math.round(Math.random() * 10000) / 100,
        effortDriven: i % 5 === 0,
        prerequisites: i % 2 === 0 && i !== 0 && i < 50 ? [i, i - 1] : [],
      };
    }

    return tmpArray;
  }

  executeCommand(_e: any, args: MenuCommandItemCallbackArgs) {
    // const columnDef = args.column;
    const command = args.command;
    const dataContext = args.dataContext;

    switch (command) {
      case 'command1':
        alert('Command 1');
        break;
      case 'command2':
        alert('Command 2');
        break;
      case 'help':
        alert('Please help!');
        break;
      case 'delete-row':
        if (confirm(`Do you really want to delete row (${(args.row || 0) + 1}) with "${dataContext.title}"`)) {
          this.angularGrid?.gridService.deleteItemById(dataContext.id);
        }
        break;
    }
  }

  headerFormatter(row: number, cell: number, value: any, column: Column) {
    const tooltipTitle = 'Custom Tooltip - Header';
    return `<div class="header-tooltip-title">${tooltipTitle}</div>
    <div class="tooltip-2cols-row"><div>Column:</div> <div>${column.name}</div></div>`;
  }

  headerRowFormatter(row: number, cell: number, value: any, column: Column) {
    const tooltipTitle = 'Custom Tooltip - Header Row (filter)';
    return `<div class="headerrow-tooltip-title">${tooltipTitle}</div>
    <div class="tooltip-2cols-row"><div>Column:</div> <div>${column.field}</div></div>`;
  }

  tooltipFormatter(row: number, cell: number, value: any, column: Column, dataContext: any, grid: SlickGrid) {
    const tooltipTitle = 'Custom Tooltip';
    const effortDrivenHtml = Formatters.checkmarkMaterial(
      row,
      cell,
      dataContext.effortDriven,
      column,
      dataContext,
      grid
    ) as HTMLElement;

    return `<div class="header-tooltip-title">${tooltipTitle}</div>
    <div class="tooltip-2cols-row"><div>Id:</div> <div>${dataContext.id}</div></div>
    <div class="tooltip-2cols-row"><div>Title:</div> <div>${dataContext.title}</div></div>
    <div class="tooltip-2cols-row"><div>Effort Driven:</div> <div>${effortDrivenHtml.outerHTML || ''}</div></div>
    <div class="tooltip-2cols-row"><div>Completion:</div> <div>${this.loadCompletionIcons(dataContext.percentComplete)}</div></div>
    `;
  }

  tooltipTaskAsyncFormatter(row: number, cell: number, value: any, column: Column, dataContext: any, grid: SlickGrid) {
    const tooltipTitle = `Task ${dataContext.id} - (async tooltip)`;

    // use a 2nd Formatter to get the percent completion
    // any properties provided from the `asyncPost` will end up in the `__params` property (unless a different prop name is provided via `asyncParamsPropName`)
    const completionBar = Formatters.percentCompleteBarWithText(
      row,
      cell,
      dataContext.percentComplete,
      column,
      dataContext,
      grid
    ) as HTMLElement;
    const out = `<div class="color-sf-primary-dark header-tooltip-title">${tooltipTitle}</div>
      <div class="tooltip-2cols-row"><div>Completion:</div> <div>${completionBar.outerHTML || ''}</div></div>
      <div class="tooltip-2cols-row"><div>Lifespan:</div> <div>${dataContext.__params.lifespan.toFixed(2)}</div></div>
      <div class="tooltip-2cols-row"><div>Ratio:</div> <div>${dataContext.__params.ratio.toFixed(2)}</div></div>
    `;
    return out;
  }

  loadCompletionIcons(percentComplete: number) {
    let output = '';
    let iconCount = 0;
    if (percentComplete > 5 && percentComplete < 25) {
      iconCount = 1;
    } else if (percentComplete >= 25 && percentComplete < 50) {
      iconCount = 2;
    } else if (percentComplete >= 50 && percentComplete < 75) {
      iconCount = 3;
    } else if (percentComplete >= 75 && percentComplete < 100) {
      iconCount = 4;
    } else if (percentComplete === 100) {
      iconCount = 5;
    }
    for (let i = 0; i < iconCount; i++) {
      const iconColor = iconCount === 5 ? 'text-success' : iconCount >= 3 ? 'text-warning' : 'text-secondary';
      output += `<span class="mdi mdi-check-circle-outline ${iconColor}"></span>`;
    }
    return output;
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
