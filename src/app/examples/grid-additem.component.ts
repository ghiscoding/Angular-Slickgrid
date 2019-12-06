import { Component, OnInit, Injectable, ViewEncapsulation } from '@angular/core';
import {
  AngularGridInstance,
  Column,
  Editors,
  FieldType,
  FileType,
  Formatter,
  Formatters,
  GridOption,
  GridService,
  OnEventArgs
} from './../modules/angular-slickgrid';
import { TranslateService } from '@ngx-translate/core';

// custom formatter to display priority (from 1 to 3) loop through that count and display them as x number of icon(s)
const customPriorityFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  if (!value) {
    return '';
  }
  let output = '';
  const count = +(value >= 3 ? 3 : value);
  const color = count === 3 ? 'red' : (count === 2 ? 'orange' : 'grey');
  const icon = `<i class="fa fa-fire ${color}" aria-hidden="true"></i>`;

  for (let i = 1; i <= count; i++) {
    output += icon;
  }
  return output;
};

@Component({
  templateUrl: './grid-additem.component.html',
  styleUrls: ['./grid-additem.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@Injectable()
export class GridAddItemComponent implements OnInit {
  title = 'Example 11: Add / Update / Highlight a Datagrid Item';
  subTitle = `
  Add / Update / Hightlight an Item from the Datagrid (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Add,-Update-or-Highlight-a-Datagrid-Item" target="_blank">Wiki docs</a>).
  <ul>
    <li><b>Note:</b> this demo is <b>only</b> on the datagrid (client) side, you still need to deal with the backend yourself</li>
    <li>Adding an item, will always be showing as the 1st item in the grid because that is the best visual place to add it</li>
    <li>Add/Update an item requires a valid Slickgrid Selection Model, you have 2 choices to deal with this:</li>
    <ul><li>You can enable "enableCheckboxSelector" or "enableRowSelection" to True</li></ul>
    <li>Click on any of the buttons below to test this out</li>
    <li>You can change the highlighted color &amp; animation by changing the <a href="https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/modules/angular-slickgrid/styles/_variables.scss" target="_blank">SASS Variables</a>:</li>
    <ul>
      <li>"$row-highlight-background-color" or "$row-highlight-fade-animation"</li>
    </ul>
    <li>You can also add CSS class(es) on the fly (or on page load) on rows with certain criteria, (e.g. click on last button)
    <ul>
      <li>Example, click on button "Highlight Rows with Duration over 50" to see row styling changing. <a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Dynamically-Add-CSS-Classes-to-Item-Rows" target="_blank">Wiki doc</a></li>
    </ul>
    <li><b>Context Menu</b> Mouse Right+Click over any row to open a Context Menu with certain commands or over the Priority column to optionally change the "Priority" field from the Context Menu</li>
  </ul>
  `;

  angularGrid: AngularGridInstance;
  grid: any;
  gridService: GridService;
  dataView: any;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  updatedObject: any;

  constructor(private translate: TranslateService) {
    // mock a dataset
    this.dataset = this.mockDataset(1000);
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.dataView = angularGrid.dataView;
    this.grid = angularGrid.slickGrid;
    this.gridService = angularGrid.gridService;

    // if you want to change background color of Duration over 50 right after page load,
    // you would put the code here, also make sure to re-render the grid for the styling to be applied right away
    /*
    this.dataView.getItemMetadata = this.updateItemMetadataForDurationOver50(this.dataView.getItemMetadata);
    this.grid.invalidate();
    this.grid.render();
    */

    const contextMenu = {
      // all titles optionally support translation keys, if you wish to use that feature then use the title properties with the 'Key' suffix (e.g: titleKey)
      // example "commandTitle" for a plain string OR "commandTitleKey" to use a translation key
      optionTitle: 'Change Priority',
      commandTitleKey: 'COMMANDS',
      optionItems: [
        { option: 0, positionOrder: 0, title: 'none', cssClass: 'italic' },
        // { option: '', divider: true, positionOrder: 1 },
        { option: 1, positionOrder: 2, iconCssClass: 'fa fa-fire grey', titleKey: 'LOW' },
        { option: 3, positionOrder: 4, iconCssClass: 'fa fa-fire red', titleKey: 'HIGH' },
        { option: 2, positionOrder: 2, iconCssClass: 'fa fa-fire orange', titleKey: 'MEDIUM' },
        { option: 4, positionOrder: 5, iconCssClass: 'fa fa-fire', title: 'Extreme', disabled: true },
      ],
      commandItems: [
        { command: 'export-excel', titleKey: 'EXPORT_TO_EXCEL', iconCssClass: 'fa fa-file-excel-o text-success', positionOrder: 1, cssClass: '' },
        { command: 'delete-row', title: 'Delete Row', positionOrder: 4, cssClass: 'red' },
        { command: 'help', titleKey: 'HELP', iconCssClass: 'fa fa-question-circle', positionOrder: 2 },
        { divider: true, command: '', positionOrder: 3 },
      ],
    };

    let editorOptions = '';
    const contextMenuOptionList = contextMenu.optionItems.sort((item1, item2) => item1.positionOrder - item2.positionOrder);
    for (let i = 0; i < contextMenuOptionList.length; i++) {
      if (contextMenuOptionList.hasOwnProperty(i)) {
        let cssClasses = '';
        const contextItem = contextMenuOptionList[i];
        if (contextItem) {
          cssClasses += contextItem.hasOwnProperty('cssClass') ? contextItem.cssClass : '';
          cssClasses += contextItem.hasOwnProperty('disabled') ? ' slick-context-menuitem-disabled' : '';
          const titleLabel = contextItem.hasOwnProperty('titleKey') ? this.translate.instant(contextItem.titleKey) : contextItem.title;

          if (contextItem.hasOwnProperty('iconCssClass')) {
            editorOptions += `<li class="slick-context-menu-optionitem ${cssClasses}" data-option="${contextItem.option}">
                <div class="slick-context-menu-icon ${contextItem.iconCssClass}"></div>
                ${titleLabel}
              </li>`;
          } else if (contextItem.hasOwnProperty('divider')) {
            editorOptions += `<li class="slick-context-menu-optionitem slick-context-menuitem-divider"></li>`;
          } else {
            editorOptions += `<li class="slick-context-menu-optionitem ${cssClasses}" data-option="${contextItem.option}">${titleLabel}</li>`;
          }
        }
      }
    }

    let commandOptions = '';
    const contextMenuCommandList = contextMenu.commandItems.sort((item1, item2) => item1.positionOrder - item2.positionOrder);
    for (let i = 0; i < contextMenuCommandList.length; i++) {
      if (contextMenuCommandList.hasOwnProperty(i)) {
        let cssClasses = '';
        const contextItem = contextMenuCommandList[i];

        if (contextItem) {
          cssClasses += contextItem.hasOwnProperty('cssClass') ? contextItem.cssClass : '';
          cssClasses += contextItem.hasOwnProperty('disabled') ? ' slick-context-menuitem-disabled' : '';
          const titleLabel = contextItem.hasOwnProperty('titleKey') ? this.translate.instant(contextItem.titleKey) : contextItem.title;

          if (contextItem.hasOwnProperty('iconCssClass')) {
            commandOptions += `<li class="slick-context-menu-commanditem ${cssClasses}" data-command="${contextItem.command}">
                <div class="slick-context-menu-icon ${contextItem.iconCssClass}"></div>
                ${titleLabel}
              </li>`;
          } else if (contextItem.hasOwnProperty('divider')) {
            commandOptions += `<li class="slick-context-menu-commanditem slick-context-menuitem-divider"></li>`;
          } else if (contextItem.hasOwnProperty('disabled')) {
            commandOptions += `<li class="slick-context-menu-commanditem ${cssClasses}" data-option="${contextItem.command}">${titleLabel}</li>`;
          } else {
            commandOptions += `<li class="slick-context-menu-commanditem ${cssClasses}" data-command="${contextItem.command}">${titleLabel}</li>`;
          }
        }
      }
    }

    let editorOptionHtmlString = '';
    if (contextMenuOptionList.length > 0) {
      // @ts-ignore
      const titleLabel = contextMenu.hasOwnProperty('optionTitleKey') ? this.translate.instant(contextMenu.optionTitleKey) : contextMenu.optionTitle;
      editorOptionHtmlString = `<div class="slick-context-menu-option-list">
        <span class="title">${titleLabel}</span>
        ${editorOptions}
      </div>`;
    }

    let commandOptionHtmlString = '';
    if (contextMenuCommandList.length > 0) {
      // @ts-ignore
      const titleLabel = contextMenu.hasOwnProperty('commandTitleKey') ? this.translate.instant(contextMenu.commandTitleKey) : contextMenu.commandTitle;
      commandOptionHtmlString = `<div class="slick-context-menu-custom">
          <span class="title">${titleLabel}</span>
          ${commandOptions}
        </div>`;
    }

    const htmlString = `<ul class="slick-context-menu">
      ${editorOptionHtmlString}
      ${commandOptionHtmlString}
   </ul>`;

    // create context menu, hide it & append it to the body
    const contextElm = $(htmlString);
    contextElm.css('display', 'none');
    contextElm.appendTo($('body'));

    contextElm.click((e: any) => {
      if (!$(e.target).is('li')) {
        return;
      }
      if (!this.grid.getEditorLock().commitCurrentEdit()) {
        return;
      }
      const row = contextElm.data('row');
      const cell = contextElm.data('cell');

      const grid = this.angularGrid.slickGrid;
      const columnDef = grid.getColumns()[cell];
      const dataContext = grid.getDataItem(row);

      console.log(cell, columnDef, dataContext);

      const targetElm = $(e.target);
      const dataCommand = targetElm.attr('data-command');
      const dataOption = targetElm.attr('data-option');
      // data[row].priority = $(e.target).attr('data');
      if (dataCommand) {
        switch (dataCommand) {
          case 'export-excel':
            this.angularGrid.excelExportService.exportToExcel({
              filename: 'Export',
              format: FileType.xlsx
            });
            break;
          case 'delete-row':
            if (confirm('Are you sure?')) {
              this.angularGrid.gridService.deleteItemById(dataContext.id);
            }
            break;
          case 'help':
            alert('Please Help!');
            break;
        }
      } else if (dataOption) {
        dataContext.priority = dataOption;
        this.grid.updateRow(row);
      }

      // callback, user might want to do something else
    });
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      {
        id: 'delete',
        field: 'id',
        excludeFromHeaderMenu: true,
        formatter: Formatters.deleteIcon,
        minWidth: 30,
        maxWidth: 30,
        // use onCellClick OR grid.onClick.subscribe which you can see down below
        onCellClick: (e: Event, args: OnEventArgs) => {
          console.log(args);
          if (confirm('Are you sure?')) {
            this.angularGrid.gridService.deleteItemById(args.dataContext.id);
          }
        }
      },
      {
        id: 'title', name: 'Title', field: 'title',
        sortable: true,
        type: FieldType.string,
        editor: {
          model: Editors.longText
        }
      },
      {
        id: 'duration', name: 'Duration (days)', field: 'duration',
        sortable: true,
        type: FieldType.number,
        editor: {
          model: Editors.text
        },
        onCellChange: (e: Event, args: OnEventArgs) => {
          alert('onCellChange directly attached to the column definition');
          console.log(args);
        }
      },
      {
        id: 'complete', name: '% Complete', field: 'percentComplete',
        formatter: Formatters.percentCompleteBar,
        type: FieldType.number,
        editor: {
          model: Editors.integer
        }
      },
      {
        id: 'start', name: 'Start', field: 'start',
        formatter: Formatters.dateIso,
        sortable: true,
        type: FieldType.date,
        /*
        editor: {
          model: Editors.date
        }
        */
      },
      {
        id: 'finish', name: 'Finish', field: 'finish',
        formatter: Formatters.dateIso, sortable: true,
        type: FieldType.date
      },
      {
        id: 'priority',
        name: 'Priority',
        field: 'priority',
        minWidth: 100,
        filterable: true,
        sortable: true,
        formatter: customPriorityFormatter,
      },
      {
        id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
        formatter: Formatters.checkmark,
        type: FieldType.number,
        editor: {
          model: Editors.checkbox
        }
      }
    ];

    this.gridOptions = {
      asyncEditorLoading: false,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      editable: true,
      enableColumnPicker: true,
      enableCellNavigation: true,
      enableRowSelection: true
    };
  }

  mockDataset(itemCount: number) {
    // mock a dataset
    const mockedDataset = [];
    for (let i = 0; i < itemCount; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);
      mockedDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        priority: i % 3 ? 1 : (i % 2 ? 2 : 3),
        effortDriven: (i % 5 === 0)
      };
    }
    return mockedDataset;
  }

  addNewItem(insertPosition?: 'top' | 'bottom') {
    const newId = this.dataset.length;
    const randomYear = 2000 + Math.floor(Math.random() * 10);
    const randomMonth = Math.floor(Math.random() * 11);
    const randomDay = Math.floor((Math.random() * 29));
    const randomPercent = Math.round(Math.random() * 100);

    const newItem = {
      id: newId,
      title: 'Task ' + newId,
      duration: Math.round(Math.random() * 100) + '',
      percentComplete: randomPercent,
      percentCompleteNumber: randomPercent,
      start: new Date(randomYear, randomMonth, randomDay),
      finish: new Date(randomYear, (randomMonth + 2), randomDay),
      priority: 1,
      effortDriven: true
    };
    this.angularGrid.gridService.addItem(newItem, { position: insertPosition });
  }

  highlighFifthRow() {
    this.scrollGridTop();
    this.angularGrid.gridService.highlightRow(4, 1500);
  }

  /** Change the Duration Rows Background Color */
  changeDurationBackgroundColor() {
    this.dataView.getItemMetadata = this.updateItemMetadataForDurationOver50(this.dataView.getItemMetadata);

    // also re-render the grid for the styling to be applied right away
    this.grid.invalidate();
    this.grid.render();

    // or use the Angular-SlickGrid GridService
    // this.gridService.renderGrid();
  }

  /**
   * Change the SlickGrid Item Metadata, we will add a CSS class on all rows with a Duration over 50
   * For more info, you can see this SO https://stackoverflow.com/a/19985148/1212166
   */
  updateItemMetadataForDurationOver50(previousItemMetadata: any) {
    const newCssClass = 'duration-bg';

    return (rowNumber: number) => {
      const item = this.dataView.getItem(rowNumber);
      let meta = {
        cssClasses: ''
      };
      if (typeof previousItemMetadata === 'object') {
        meta = previousItemMetadata(rowNumber);
      }

      if (meta && item && item.duration) {
        const duration = +item.duration; // convert to number
        if (duration > 50) {
          meta.cssClasses = (meta.cssClasses || '') + ' ' + newCssClass;
        }
      }

      return meta;
    };
  }

  updateSecondItem() {
    this.scrollGridTop();
    const updatedItem = this.angularGrid.gridService.getDataItemByRowNumber(1);
    updatedItem.duration = Math.round(Math.random() * 100);
    this.angularGrid.gridService.updateItem(updatedItem);

    // OR by id
    // this.angularGrid.gridService.updateItemById(updatedItem.id, updatedItem);

    // OR multiple changes
    /*
    const updatedItem1 = this.angularGrid.gridService.getDataItemByRowNumber(1);
    const updatedItem2 = this.angularGrid.gridService.getDataItemByRowNumber(2);
    updatedItem1.duration = Math.round(Math.random() * 100);
    updatedItem2.duration = Math.round(Math.random() * 100);
    this.angularGrid.gridService.updateItems([updatedItem1, updatedItem2], true);
    */
  }

  scrollGridBottom() {
    this.angularGrid.slickGrid.navigateBottom();
  }

  scrollGridTop() {
    this.angularGrid.slickGrid.navigateTop();
  }

  onContextMenu(e) {
    e.preventDefault();
    const grid = this.angularGrid.slickGrid;
    const cell = grid.getCellFromEvent(e);
    const columnDef = grid.getColumns()[cell.cell];
    const columnId = columnDef && columnDef.id;

    // select & highlight the row that the user requested the Context Menu from
    this.angularGrid.gridService.setSelectedRows([cell.row]);

    // we can decide to show the Context Menu only when originated cell is Priority or from any other cell
    // display Context Menu editable option list only on Priority field
    const editableOptionListElm = $('.slick-context-menu-option-list');
    if (columnId === 'priority') {
      editableOptionListElm.show();
    } else {
      editableOptionListElm.hide();
    }


    const contextElm = $('.slick-context-menu');
    // reposition the context menu where we right+clicked
    contextElm
      .data('cell', cell.cell)
      .data('row', cell.row)
      .css('top', e.pageY)
      .css('left', e.pageX)
      .show();

    // hide the context menu once user choose an option or click elsewhere
    $('body').one('click', () => contextElm.hide());
  }
}
