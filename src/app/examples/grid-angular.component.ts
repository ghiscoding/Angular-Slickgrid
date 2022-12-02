import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  AngularGridInstance,
  AngularUtilService,
  Column,
  Editors,
  FieldType,
  Filters,
  Formatters,
  GridOption,
  OnEventArgs,
  SlickNamespace,
} from './../modules/angular-slickgrid';
import { EditorNgSelectComponent } from './editor-ng-select.component';
import { CustomAngularComponentEditor } from './custom-angularComponentEditor';
import { CustomAngularComponentFilter } from './custom-angularComponentFilter';
import { CustomTitleFormatterComponent } from './custom-titleFormatter.component';
import { FilterNgSelectComponent } from './filter-ng-select.component';

// using external non-typed js libraries
declare const Slick: SlickNamespace;
declare const $: any;

const NB_ITEMS = 100;

@Component({
  templateUrl: './grid-angular.component.html',
  styleUrls: ['./grid-angular.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridAngularComponent implements OnInit {
  title = 'Example 22: Use of Angular Components';
  subTitle = `
  <h3>Filters, Editors, AsyncPostRender with Angular Components</h3>
  Grid with usage of Angular Components as Editor &amp; AsyncPostRender (similar to Formatter).
  <ul>
    <li>Support of Angular Component as Custom Editor (click on any "Assignee" name cell)</li>
    <ul>
      <li>That column uses <a href="https://github.com/ng-select/ng-select" target="_blank">ng-select</a> as a custom editor as an Angular Component
      <li>Increased Grid Options "rowHeight" &amp; "headerRowHeight" to 45 so that the "ng-select" fits in the cell. Ideally it would be better to override the ng-select css styling to change it's max height</li>
    </ul>
    <li>Support of Angular Component as Custom Filter ("Assignee" columns), which also uses "ng-select"
    <li>The 2nd "Assignee" column (showing in bold text) uses "asyncPostRender" with an Angular Component</li>
    <ul>
      <li>Why can't we use Angular Component as Customer Formatter and why do I see a slight delay in loading the data?</li>
      <li>It's totally normal since SlickGrid Formatters only accept strings (synchronously),
      so we cannot use that (Angular requires at least 1 full cycle to render the element), so we are left with SlickGrid "asyncPostRender" and
      it works but as the name suggest it's async users might see noticeable delay in loading the data
      </li>
    </ul>
  </ul>
  `;

  private _commandQueue: any[] = [];
  angularGrid!: AngularGridInstance;
  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset!: any[];
  gridObj: any;
  isAutoEdit = true;
  alertWarning: any;
  updatedObject: any;
  selectedLanguage = 'en';
  assignees = [
    { id: '', name: '' },
    { id: '1', name: 'John' },
    { id: '2', name: 'Pierre' },
    { id: '3', name: 'Paul' },
  ];

  constructor(private angularUtilService: AngularUtilService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.prepareGrid();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
  }

  prepareGrid() {
    this.columnDefinitions = [
      {
        id: 'title',
        name: 'Title',
        field: 'title',
        minWidth: 100,
        filterable: true,
        sortable: true,
        type: FieldType.string,
        editor: {
          model: Editors.longText,
          minLength: 5,
          maxLength: 255,
        },
        onCellChange: (e: Event, args: OnEventArgs) => {
          console.log(args);
          this.alertWarning = `Updated Title: ${args.dataContext.title}`;
        }
      }, {
        id: 'assignee',
        name: 'Assignee',
        field: 'assignee',
        minWidth: 100,
        filterable: true,
        sortable: true,
        filter: {
          model: new CustomAngularComponentFilter(), // create a new instance to make each Filter independent from each other
          collection: this.assignees,
          params: {
            component: FilterNgSelectComponent,
          }
        },
        queryFieldFilter: 'assignee.id', // for a complex object it's important to tell the Filter which field to query and our CustomAngularComponentFilter returns the "id" property
        queryFieldSorter: 'assignee.name',
        formatter: Formatters.complexObject,
        params: {
          complexFieldLabel: 'assignee.name',
        },
        exportWithFormatter: true,
        editor: {
          model: CustomAngularComponentEditor,
          collection: this.assignees,
          params: {
            component: EditorNgSelectComponent,
          }
        },
        onCellChange: (e: Event, args: OnEventArgs) => {
          console.log(args);
          this.alertWarning = `Updated Title: ${args.dataContext.title}`;
        }
      }, {
        id: 'assignee2',
        name: 'Assignee with Angular Component',
        field: 'assignee',
        minWidth: 125,
        filterable: true,
        sortable: true,
        filter: {
          model: new CustomAngularComponentFilter(), // create a new instance to make each Filter independent from each other
          collection: this.assignees,
          params: {
            component: FilterNgSelectComponent,
          }
        },
        queryFieldFilter: 'assignee.id', // for a complex object it's important to tell the Filter which field to query and our CustomAngularComponentFilter returns the "id" property
        queryFieldSorter: 'assignee.name',

        // loading formatter, text to display while Post Render gets processed
        formatter: () => '...',

        // to load an Angular Component, you cannot use a Formatter since Angular needs at least 1 cycle to render everything
        // you can use a PostRenderer but you will visually see the data appearing,
        // which is why it's still better to use regular Formatter (with jQuery if need be) instead of Angular Component
        asyncPostRender: this.renderAngularComponent.bind(this),
        params: {
          component: CustomTitleFormatterComponent,
          angularUtilService: this.angularUtilService,
          complexFieldLabel: 'assignee.name' // for the exportCustomFormatter
        },
        exportCustomFormatter: Formatters.complexObject,
      }, {
        id: 'complete',
        name: '% Complete',
        field: 'percentComplete',
        minWidth: 100,
        filterable: true,
        formatter: Formatters.multiple,
        type: FieldType.number,
        editor: {
          model: Editors.singleSelect,

          // We can also add HTML text to be rendered (any bad script will be sanitized) but we have to opt-in, else it will be sanitized
          enableRenderHtml: true,
          collection: Array.from(Array(101).keys()).map(k => ({ value: k, label: k, symbol: '<i class="fa fa-percent" style="color:cadetblue"></i>' })),
          customStructure: {
            value: 'value',
            label: 'label',
            labelSuffix: 'symbol'
          },
          editorOptions: {
            maxHeight: 400
          }
        },
        filter: {
          model: Filters.slider,
          operator: '>=',
          params: { hideSliderNumber: false }
        },
        params: {
          formatters: [Formatters.collectionEditor, Formatters.percentCompleteBar],
        }
      }, {
        id: 'start',
        name: 'Start',
        field: 'start',
        minWidth: 100,
        filterable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
        exportWithFormatter: true,
        sortable: true,
        type: FieldType.date,
        editor: {
          model: Editors.date
        },
      }, {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        minWidth: 100,
        filterable: true,
        sortable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
        exportWithFormatter: true,
        type: FieldType.date,
        editor: {
          model: Editors.date
        },
      },
      {
        id: 'action',
        name: 'Action',
        field: 'id',
        maxWidth: 100,
        formatter: () => `<div class="cell-menu-dropdown">Action<i class="fa fa-caret-down"></i></div>`,
        cellMenu: {
          commandTitle: 'Commands',
          commandItems: [
            {
              command: 'help',
              title: 'Help',
              iconCssClass: 'fa fa-question-circle text-info',
              positionOrder: 66,
              action: () => alert('Please Help!'),
            },
            {
              command: 'delete-row', title: 'Delete Row', positionOrder: 64,
              iconCssClass: 'fa fa-times color-danger', cssClass: 'red', textCssClass: 'text-italic color-danger-light',
              action: (_event, args) => this.angularGrid.gridService.deleteItemById(args.dataContext.id)
            },
          ]
        }
      }
    ];

    this.gridOptions = {
      asyncEditorLoading: false,
      autoEdit: this.isAutoEdit,
      autoCommitEdit: false,
      autoResize: {
        container: '#demo-container',
        rightPadding: 10
      },
      headerRowHeight: 45,
      rowHeight: 45, // increase row height so that the ng-select fits in the cell
      editable: true,
      enableCellMenu: true,
      enableCellNavigation: true,
      enableColumnPicker: true,
      enableExcelCopyBuffer: true,
      enableFiltering: true,
      enableAsyncPostRender: true, // for the Angular PostRenderer, don't forget to enable it
      asyncPostRenderDelay: 0,    // also make sure to remove any delay to render it
      editCommandHandler: (item, column, editCommand) => {
        this._commandQueue.push(editCommand);
        editCommand.execute();
      },
      i18n: this.translate,
      params: {
        angularUtilService: this.angularUtilService // provide the service to all at once (Editor, Filter, AsyncPostRender)
      }
    };

    this.dataset = this.mockData(NB_ITEMS);
  }

  mockData(itemCount: number, startingIndex = 0) {
    // mock a dataset
    const tempDataset = [];
    for (let i = startingIndex; i < (startingIndex + itemCount); i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      tempDataset.push({
        id: i,
        title: 'Task ' + i,
        assignee: i % 3 ? this.assignees[3] : i % 2 ? this.assignees[2] : this.assignees[1],
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        effortDriven: (i % 5 === 0),
      });
    }
    return tempDataset;
  }

  onCellChanged(e: Event, args: any) {
    this.updatedObject = args.item;
  }

  onCellClicked(e: Event, args: any) {
    const metadata = this.angularGrid.gridService.getColumnFromEventArguments(args);
    console.log(metadata);

    if (metadata.columnDef.id === 'edit') {
      this.alertWarning = `open a modal window to edit: ${metadata.dataContext.title}`;

      // highlight the row, to customize the color, you can change the SASS variable $row-highlight-background-color
      this.angularGrid.gridService.highlightRow(args.row, 1500);

      // you could also select the row, when using "enableCellNavigation: true", it automatically selects the row
      // this.angularGrid.gridService.setSelectedRow(args.row);
    } else if (metadata.columnDef.id === 'delete') {
      if (confirm('Are you sure?')) {
        this.angularGrid.gridService.deleteItemById(metadata.dataContext.id);
      }
    }
  }

  onCellValidationError(e: Event, args: any) {
    alert(args.validationResults.msg);
  }

  changeAutoCommit() {
    this.gridOptions.autoCommitEdit = !this.gridOptions.autoCommitEdit;
    this.gridObj.setOptions({
      autoCommitEdit: this.gridOptions.autoCommitEdit
    });
    return true;
  }

  setAutoEdit(isAutoEdit: boolean) {
    this.isAutoEdit = isAutoEdit;
    this.gridObj.setOptions({ autoEdit: isAutoEdit }); // change the grid option dynamically
    return true;
  }

  undo() {
    const command = this._commandQueue.pop();
    if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
      command.undo();
      this.gridObj.gotoCell(command.row, command.cell, false);
    }
  }

  renderAngularComponent(cellNode: HTMLElement, row: number, dataContext: any, colDef: Column) {
    if (colDef.params.component) {
      const componentOutput = this.angularUtilService.createAngularComponent(colDef.params.component);
      Object.assign(componentOutput.componentRef.instance, { item: dataContext });

      // use a delay to make sure Angular ran at least a full cycle and make sure it finished rendering the Component
      setTimeout(() => $(cellNode).empty().html(componentOutput.domElement));
    }
  }

  /* Create an Action Dropdown Menu */
  deleteCell(rowNumber: number) {
    const item = this.angularGrid.dataView.getItem(rowNumber);
    this.angularGrid.gridService.deleteItemById(item.id);
  }
}
