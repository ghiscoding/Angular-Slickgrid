import { Component, OnInit } from '@angular/core';
import { AngularGridInstance, Column, FieldType, Formatter, Formatters, GridOption } from './../modules/angular-slickgrid';

interface DataItem {
  id: number;
  title: string;
  duration: string;
  percentComplete: number;
  percentComplete2: number;
  start: Date;
  finish: Date;
  effortDriven: boolean;
  phone: string;
  completed: number;
}

// create my custom Formatter with the Formatter type
const myCustomCheckmarkFormatter: Formatter<DataItem> = (_row, _cell, value) => {
  // you can return a string of a object (of type FormatterResultObject), the 2 types are shown below
  return value
    ? `<i class="mdi mdi-fire red" aria-hidden="true"></i>`
    : { text: '<i class="mdi mdi-snowflake" aria-hidden="true"></i>', addClasses: 'lightblue', toolTip: 'Freezing' };
};

const customEnableButtonFormatter: Formatter<DataItem> = (_row: number, _cell: number, value: any) => {
  return `<span style="margin-left: 5px">
      <button class="btn btn-xs btn-default btn-icon">
        <i class="mdi ${value ? 'mdi-check-circle' : 'mdi-circle'}" style="color: ${value ? 'black' : 'lavender'}"></i>
      </button>
    </span>`;
};

@Component({
  templateUrl: './grid-formatter.component.html',
})
export class GridFormatterComponent implements OnInit {
  title = 'Example 2: Grid with Formatters';
  subTitle = `
    Grid with Custom and/or included Slickgrid Formatters (<a href="https://ghiscoding.gitbook.io/angular-slickgrid/column-functionalities/formatters" target="_blank">Wiki docs</a>).
    <ul>
      <li>The 2 last columns are using Custom Formatters</li>
      <ul><li>The "Completed" column uses a the "onCellClick" event and a formatter to simulate a toggle action</li></ul>
      <li>
        Support Excel Copy Buffer (SlickGrid Copy Manager Plugin), you can use it by simply enabling "enableExcelCopyBuffer" flag.
        Note that it will only evaluate Formatter when the "exportWithFormatter" flag is enabled (through "ExportOptions" or the column definition)
      </li>
      <li>This example also has auto-resize enabled, and we also demo how you can pause the resizer if you wish to</li>
    </ul>
  `;

  columnDefinitions: Column<DataItem>[] = [];
  gridOptions!: GridOption;
  dataset!: any[];
  angularGrid!: AngularGridInstance;
  hideSubTitle = false;
  resizerPaused = false;

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, type: FieldType.string, width: 70 },
      {
        id: 'phone',
        name: 'Phone Number using mask',
        field: 'phone',
        sortable: true,
        type: FieldType.number,
        minWidth: 100,
        formatter: Formatters.mask,
        params: { mask: '(000) 000-0000' },
      },
      {
        id: 'duration',
        name: 'Duration (days)',
        field: 'duration',
        formatter: Formatters.decimal,
        params: { minDecimal: 1, maxDecimal: 2 },
        sortable: true,
        type: FieldType.number,
        minWidth: 90,
        exportWithFormatter: true,
      },
      {
        id: 'complete',
        name: '% Complete',
        field: 'percentComplete',
        formatter: Formatters.percentCompleteBar,
        type: FieldType.number,
        sortable: true,
        minWidth: 100,
      },
      {
        id: 'percent2',
        name: '% Complete',
        field: 'percentComplete2',
        formatter: Formatters.progressBar,
        type: FieldType.number,
        sortable: true,
        minWidth: 100,
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        formatter: Formatters.dateIso,
        sortable: true,
        type: FieldType.date,
        minWidth: 90,
        exportWithFormatter: true,
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        formatter: Formatters.dateIso,
        sortable: true,
        type: FieldType.date,
        minWidth: 90,
        exportWithFormatter: true,
      },
      {
        id: 'effort-driven',
        name: 'Effort Driven',
        field: 'effortDriven',
        formatter: myCustomCheckmarkFormatter,
        type: FieldType.number,
        sortable: true,
        minWidth: 100,
      },
      {
        id: 'completed',
        name: 'Completed',
        field: 'completed',
        type: FieldType.number,
        sortable: true,
        minWidth: 100,
        formatter: customEnableButtonFormatter,
        onCellClick: (_e, args) => {
          this.toggleCompletedProperty(args?.dataContext);
        },
      },
    ];

    this.gridOptions = {
      autoResize: {
        container: '#demo-container',
        rightPadding: 10,
      },
      enableAutoResize: true,
      enableCellNavigation: true,
      showCustomFooter: true, // display some metrics in the bottom custom footer
      customFooterOptions: {
        // optionally display some text on the left footer container
        leftFooterText: 'custom footer text',
        hideTotalItemCount: true,
        hideLastUpdateTimestamp: true,
      },

      // you customize all formatter at once certain options through "formatterOptions" in the Grid Options
      // or independently through the column definition "params", the option names are the same
      /*
      formatterOptions: {
        dateSeparator: '.',
        decimalSeparator: ',',
        displayNegativeNumberWithParentheses: true,
        minDecimal: 0,
        maxDecimal: 2,
        thousandSeparator: '_'
      },
      */

      // when using the ExcelCopyBuffer, you can see what the selection range is
      enableExcelCopyBuffer: true,
      // excelCopyBufferOptions: {
      //   onCopyCells: (e, args: { ranges: SelectedRange[] }) => console.log('onCopyCells', args.ranges),
      //   onPasteCells: (e, args: { ranges: SelectedRange[] }) => console.log('onPasteCells', args.ranges),
      //   onCopyCancelled: (e, args: { ranges: SelectedRange[] }) => console.log('onCopyCancelled', args.ranges),
      // }
    };

    // mock a dataset
    const tmpData = [];
    for (let i = 0; i < 500; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 29);
      const randomPercent = Math.round(Math.random() * 100);

      tmpData[i] = {
        id: i,
        title: 'Task ' + i,
        phone: this.generatePhoneNumber(),
        duration: i % 33 === 0 ? null : Math.random() * 100 + '',
        percentComplete: randomPercent,
        percentComplete2: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, randomMonth + 1, randomDay),
        effortDriven: i % 5 === 0,
      };
    }
    this.dataset = tmpData;
  }

  generatePhoneNumber(): string {
    let phone = '';
    for (let i = 0; i < 10; i++) {
      phone += Math.round(Math.random() * 9) + '';
    }
    return phone;
  }

  togglePauseResizer() {
    this.resizerPaused = !this.resizerPaused;
    this.angularGrid.resizerService.pauseResizer(this.resizerPaused);
  }

  toggleCompletedProperty(item: any) {
    // toggle property
    if (typeof item === 'object') {
      item.completed = !item.completed;

      // simulate a backend http call and refresh the grid row after delay
      window.setTimeout(() => {
        this.angularGrid.gridService.updateItemById(item.id, item, { highlightRow: false });
      }, 250);
    }
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
