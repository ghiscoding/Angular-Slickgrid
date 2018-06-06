import { Component, Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AngularGridInstance,
  Column,
  CustomEditorValidator,
  EditorType,
  FieldType,
  Formatters,
  GridOption,
  OnEventArgs,
  OperatorType
} from './../modules/angular-slickgrid';
import { CustomInputEditor } from './custom-inputEditor';

// using external non-typed js libraries
declare var Slick: any;

// you can create custom validator to pass to an inline editor
const myCustomTitleValidator: CustomEditorValidator = (value) => {
  if (value == null || value === undefined || !value.length) {
    return { valid: false, msg: 'This is a required field' };
  } else if (!/^Task\s\d+$/.test(value)) {
    return { valid: false, msg: 'Your title is invalid, it must start with "Task" followed by a number' };
  } else {
    return { valid: true, msg: '' };
  }
};

@Component({
  templateUrl: './grid-editor.component.html'
})
@Injectable()
export class GridEditorComponent implements OnInit {
  title = 'Example 3: Editors';
  subTitle = `
  Grid with Inline Editors and onCellClick actions (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Editors" target="_blank">Wiki docs</a>).
  <ul>
    <li>When using "enableCellNavigation: true", clicking on a cell will automatically make it active &amp; selected.</li>
    <ul><li>If you don't want this behavior, then you should disable "enableCellNavigation"</li></ul>
    <li>Inline Editors requires "enableCellNavigation: true" (not sure why though)</li>
    <li>
        Support Excel Copy Buffer (SlickGrid Copy Manager Plugin), you can use it by simply enabling "enableExcelCopyBuffer" flag.
        Note that it will only evaluate Formatter when the "exportWithFormatter" flag is enabled (through "ExportOptions" or the column definition)
    </li>
  </ul>
  `;

  private _commandQueue = [];
  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  gridObj: any;
  isAutoEdit = true;
  alertWarning: any;
  updatedObject: any;
  selectedLanguage = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.prepareGrid();
  }

  prepareGrid() {
    this.columnDefinitions = [{
      id: 'edit',
      field: 'id',
      excludeFromHeaderMenu: true,
      formatter: Formatters.editIcon,
      minWidth: 30,
      maxWidth: 30,
      // use column onCellClick OR (sgOnClick)="onCellClicked()" you can see down below
      onCellClick: (e: Event, args: OnEventArgs) => {
        console.log(args);
        this.alertWarning = `Editing: ${args.dataContext.title}`;
        this.angularGrid.gridService.highlightRow(args.row, 1500);
        this.angularGrid.gridService.setSelectedRow(args.row);
        // e.stopImmediatePropagation();
      }
    }, {
      id: 'delete',
      field: 'id',
      excludeFromHeaderMenu: true,
      formatter: Formatters.deleteIcon,
      minWidth: 30,
      maxWidth: 30,
      // use column onCellClick OR (sgOnClick)="onCellClicked()" you can see down below
      /*
      onCellClick: (e: Event, args: OnEventArgs) => {
        console.log(args);
        this.alertWarning = `Deleting: ${args.dataContext.title}`;
      }
      */
    }, {
      id: 'title',
      name: 'Title',
      field: 'title',
      sortable: true,
      type: FieldType.string,
      editor: {
        type: EditorType.longText,
      },
      validator: myCustomTitleValidator, // use a custom validator
      minWidth: 100,
      onCellChange: (e: Event, args: OnEventArgs) => {
        console.log(args);
        this.alertWarning = `Updated Title: ${args.dataContext.title}`;
      }
    }, {
      id: 'title2',
      name: 'Title, Custom Editor',
      field: 'title',
      sortable: true,
      type: FieldType.string,
      editor: {
        type: EditorType.custom,
        customEditor: CustomInputEditor
      },
      validator: myCustomTitleValidator, // use a custom validator
      minWidth: 70
    }, {
      id: 'duration',
      name: 'Duration (days)',
      field: 'duration',
      sortable: true,
      type: FieldType.number,
      editor: {
        // default is 0 decimals, if no decimals is passed it will accept 0 or more decimals
        // however if you pass the decimalPlaces, it will validate with that maximum
        // the default validation error message is in English but you can override it by using validatorErrorMessage in params
        type: EditorType.float,
        params: { decimalPlaces: 2, validatorErrorMessage: this.translate.instant('INVALID_FLOAT', { maxDecimal: 2 }) },
      },
      minWidth: 100
    }, {
      id: 'complete',
      name: '% Complete',
      field: 'percentComplete',
      formatter: Formatters.multiple,
      type: FieldType.number,
      editor: {
        type: EditorType.singleSelect,
        collection: Array.from(Array(101).keys()).map(k => ({ value: k, label: k })),
        collectionFilterBy: {
          property: 'value',
          value: 0,
          operator: OperatorType.notEqual
        },
        collectionSortBy: {
          property: 'label',
          sortDesc: true
        }
      },
      minWidth: 100,
      params: {
        formatters: [ Formatters.collectionEditor, Formatters.percentCompleteBar ]
      }
    }, {
      id: 'start',
      name: 'Start',
      field: 'start',
      formatter: Formatters.dateIso,
      sortable: true,
      minWidth: 100,
      type: FieldType.date,
      editor: {
        type: EditorType.date
      }
    }, {
      id: 'finish',
      name: 'Finish',
      field: 'finish',
      formatter: Formatters.dateIso,
      sortable: true,
      minWidth: 100,
      type: FieldType.date,
      editor: {
        type: EditorType.date
      }
    }, {
      id: 'effort-driven',
      name: 'Effort Driven',
      field: 'effortDriven',
      formatter: Formatters.checkmark,
      type: FieldType.number,
      editor: {
        type: EditorType.checkbox
      },
      minWidth: 60
    }, {
      id: 'prerequisites',
      name: 'Prerequisites',
      field: 'prerequisites',
      sortable: true,
      type: FieldType.string,
      editor: {
        type: EditorType.multipleSelect,
        collection: Array.from(Array(12).keys()).map(k => ({ value: `Task ${k}`, label: `Task ${k}` })),
        collectionSortBy: {
          property: 'label',
          sortDesc: true
        },
        collectionFilterBy: {
          property: 'label',
          value: [ 'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5', 'Task 6' ],
          operator: OperatorType.contains
        }
      },
      minWidth: 100
    }];

    this.gridOptions = {
      asyncEditorLoading: false,
      autoEdit: this.isAutoEdit,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      editable: true,
      enableCellNavigation: true,
      enableColumnPicker: true,
      enableExcelCopyBuffer: true,
      enableCheckboxSelector: true,
      enableRowSelection: true,
      editCommandHandler: (item, column, editCommand) => {
        this._commandQueue.push(editCommand);
        editCommand.execute();
      },
      i18n: this.translate
    };

    this.getData();
  }

  getData() {
    // mock a dataset
    const mockedDataset = [];
    for (let i = 0; i < 1000; i++) {
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
        effortDriven: (i % 5 === 0),
        prerequisites: (i % 2 === 0) && i !== 0 && i < 12 ? [`Task ${i}`, `Task ${i - 1}`] : []
      };
    }
    this.dataset = mockedDataset;
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  gridReady(grid) {
    this.gridObj = grid;
  }

  onCellChanged(e, args) {
    this.updatedObject = args.item;
  }

  onCellClicked(e, args) {
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
        this.angularGrid.gridService.deleteDataGridItemById(metadata.dataContext.id);
      }
    }
  }

  onCellValidation(e, args) {
    alert(args.validationResults.msg);
  }

  setAutoEdit(isAutoEdit) {
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
}
