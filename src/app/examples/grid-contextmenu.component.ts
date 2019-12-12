import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularGridInstance, Column, GridOption, FieldType, Formatter, Formatters } from './../modules/angular-slickgrid';

const actionFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  if (dataContext.priority === 3) { // option 3 is High
    return `<div class="fake-hyperlink">Action <i class="fa fa-caret-down"></i></div>`;
  }
  return `<div class="disabled">Action <i class="fa fa-caret-down"></i></div>`;
};

const priorityFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  if (!value) {
    return '';
  }
  const gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
  const translate = gridOptions.i18n;
  const count = +(value >= 3 ? 3 : value);
  const key = count === 3 ? 'HIGH' : (count === 2 ? 'MEDIUM' : 'LOW');
  return translate && translate.instant && translate.instant(key || ' ');
};

const taskTranslateFormatter: Formatter = (row: number, cell: number, value: any, columnDef: any, dataContext: any, grid: any) => {
  const gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
  const translate = gridOptions.i18n;

  return translate && translate.instant && translate.instant('TASK_X', { x: value });
};

@Component({
  templateUrl: './grid-contextmenu.component.html',
  styleUrls: ['./grid-contextmenu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridContextMenuComponent implements OnInit {
  title = 'Example 26: Cell Menu / Context Menu';
  subTitle = `Add Cell Menu and Context Menu
    <ul>
      <li><b>Cell Menu</b> can be used by a cell menu click, like an 'Action' cell click.</li>
      <li><b>Context Menu</b> shown after a mouse right+click.</li>
      <li>There 2 ways to execute a Command/Option</li>
      <ol>
        <li>via onCommand/onOptionSelected (use a switch/case to parse command/option and do something with it)</li>
        <li>via action callback (must be defined on each command/option)</li>
      </ol>
    </ul>`;

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  selectedLanguage: string;

  constructor(private translate: TranslateService) {
    // always start with English for Cypress E2E tests to be consistent
    const defaultLang = 'en';
    this.translate.use(defaultLang);
    this.selectedLanguage = defaultLang;
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      {
        id: 'title', name: 'Title', field: 'id', headerKey: 'TITLE', minWidth: 100,
        formatter: taskTranslateFormatter,
        sortable: true, type: FieldType.string
      },
      { id: 'percentComplete', headerKey: 'PERCENT_COMPLETE', field: 'percentComplete', formatter: Formatters.percentCompleteBar, type: FieldType.number, sortable: true, minWidth: 100 },
      { id: 'start', headerKey: 'START', field: 'start', formatter: Formatters.dateIso, sortable: true, type: FieldType.date, minWidth: 90, exportWithFormatter: true },
      { id: 'finish', headerKey: 'FINISH', field: 'finish', formatter: Formatters.dateIso, sortable: true, type: FieldType.date, minWidth: 90, exportWithFormatter: true },
      { id: 'priority', headerKey: 'PRIORITY', field: 'priority', formatter: priorityFormatter },
      { id: 'completed', headerKey: 'COMPLETED', field: 'completed', formatter: Formatters.checkmark },
      {
        id: 'action', name: 'Action', field: 'action',
        formatter: actionFormatter,
        cellMenu: {
          // you can override the logic of when the menu is usable
          // for example say that we want to show a menu only when then Priority is set to 'High'.
          // Note that this ONLY overrides the usability itself NOT the text displayed in the cell,
          // if you wish to change the cell text (or hide it)
          // then you SHOULD use it in combination with a custom formatter (actionFormatter) and use the same logic in that formatter
          menuUsabilityOverride: (row, dataContext, grid) => {
            return (dataContext.priority === 3); // option 3 is High
          },
          commandTitleKey: 'COMMANDS',
          commandItems: [
            { command: 'command1', title: 'Command 1', cssClass: 'orange' },
            {
              command: 'command2', title: 'Command 2',
              // you can use the "action" callback and/or use "onCallback" callback from the grid options, they both have the same arguments
              action: (e, args) => {
                console.log(args.dataContext, args.columnDef);
                // action callback.. do something
              },
              // only enable command when the task is not completed
              itemUsabilityOverride: (row, dataContext, grid) => {
                return !dataContext.completed;
              }
            },
            {
              command: 'delete-row', titleKey: 'DELETE_ROW',
              iconCssClass: 'fa fa-times', cssClass: 'red', textCssClass: 'bold',
              // only show command to 'Delete Row' when the task is not completed
              itemVisibilityOverride: (row, dataContext, grid) => {
                return !dataContext.completed;
              }
            },
            // you can pass divider as a string or an object with a boolean
            // 'divider',
            { divider: true, command: '' },

            {
              command: 'help',
              titleKey: 'HELP', // use "title" without translation and "titleKey" with TranslateService
              iconCssClass: 'fa fa-question-circle'
            },
            { command: 'something', titleKey: 'DISABLED_COMMAND', disabled: true }
          ],
          optionTitleKey: 'CHANGE_COMPLETED_FLAG',
          optionItems: [
            { option: true, titleKey: 'TRUE', iconCssClass: 'fa fa-check-square-o' },
            { option: false, titleKey: 'FALSE', iconCssClass: 'fa fa-square-o' },
            {
              option: null, title: 'null', cssClass: 'italic',
              // you can use the "action" callback and/or use "onCallback" callback from the grid options, they both have the same arguments
              action: (e, args) => {
                // action callback.. do something
              },
              // only enable Action menu when the Priority is set to High
              itemUsabilityOverride: (row, dataContext, grid) => {
                return (dataContext.priority === 3);
              },
              // only show command to 'Delete Row' when the task is not completed
              itemVisibilityOverride: (row, dataContext, grid) => {
                return !dataContext.completed;
              }
            },
          ]
        }
      },
    ];

    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableCellNavigation: true,
      enableTranslate: true,
      i18n: this.translate,

      // when using the cellMenu, you can change some of the default options and all use some of the callback methods
      enableCellMenu: true,
      cellMenu: {
        // minWidth: 200,
        onCommand: (e, args) => this.executeCommand(e, args),
        onOptionSelected: (e, args) => {
          // change Completed flag
          const dataContext = args && args.dataContext;
          if (dataContext && dataContext.hasOwnProperty('completed')) {
            dataContext.completed = args.item.option;
            this.angularGrid.gridService.updateItem(dataContext);
          }
        },
        onBeforeMenuShow: ((e, args) => {
          // for example, you could select the row it was clicked by calling
          // this.angularGrid.gridService.setSelectedRows([args.row]);
          console.log('Before the Cell Menu is shown', args);
        }),
        onBeforeMenuClose: ((e, args) => console.log('Cell Menu is closing', args)),
      }
    };

    this.dataset = this.getData(1000);
  }

  executeCommand(e, args) {
    const columnDef = args.columnDef;
    const command = args.command;
    const dataContext = args.dataContext;

    switch (command) {
      case 'command1':
        alert('Command 1');
        break;
      case 'command2':
        alert('Command 2');
        break;
      case 'copy-text':
        this.copyCellValue(args.value);
        break;
      case 'help':
        alert('Please help!');
        break;
      case 'delete-row':
        if (confirm(`Do you really want to delete row ${args.row + 1} with ${dataContext.title}?`)) {
          this.angularGrid.dataView.deleteItem(dataContext.id);
        }
        break;
    }
  }

  copyCellValue(textToCopy) {
    try {
      const range = document.createRange();
      const tmpElem = $('<div>')
        .css({ position: 'absolute', left: '-1000px', top: '-1000px' })
        .text(textToCopy);
      $('body').append(tmpElem);
      range.selectNodeContents(tmpElem.get(0));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      const success = document.execCommand('copy', false, null);
      if (success) {
        tmpElem.remove();
      }
    } catch (e) { }
  }

  getData(count: number) {
    // mock a dataset
    const tmpData = [];
    for (let i = 0; i < count; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));

      tmpData[i] = {
        id: i,
        duration: Math.floor(Math.random() * 25) + ' days',
        percentComplete: Math.floor(Math.random() * 100),
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        priority: i % 3 ? 2 : (i % 5 ? 3 : 1),
        completed: (i % 4 === 0),
      };
    }
    return tmpData;
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  switchLanguage() {
    this.selectedLanguage = (this.selectedLanguage === 'en') ? 'fr' : 'en';
    this.translate.use(this.selectedLanguage);
  }
}
