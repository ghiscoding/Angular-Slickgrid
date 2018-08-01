import { Component, Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AngularGridInstance,
  Column,
  EditorValidator,
  Editors,
  FieldType,
  Filters,
  Formatters,
  GridOption,
  OnEventArgs,
  OperatorType
} from './../modules/angular-slickgrid';
import { CustomInputEditor } from './custom-inputEditor';

// using external non-typed js libraries
declare var Slick: any;

// you can create custom validator to pass to an inline editor
const myCustomTitleValidator: EditorValidator = (value) => {
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

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
  }

  prepareGrid() {
    this.columnDefinitions = [
      {
        id: 'edit',
        field: 'id',
        excludeFromHeaderMenu: true,
        formatter: Formatters.editIcon,
        minWidth: 30,
        maxWidth: 30,
        // use onCellClick OR grid.onClick.subscribe which you can see down below
        onCellClick: (e: Event, args: OnEventArgs) => {
          console.log(args);
          this.alertWarning = `Editing: ${args.dataContext.title}`;
          this.angularGrid.gridService.highlightRow(args.row, 1500);
          this.angularGrid.gridService.setSelectedRow(args.row);
        }
      }, {
        id: 'delete',
        field: 'id',
        excludeFromHeaderMenu: true,
        formatter: Formatters.deleteIcon,
        minWidth: 30,
        maxWidth: 30,
        // use onCellClick OR grid.onClick.subscribe which you can see down below
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
        filterable: true,
        sortable: true,
        type: FieldType.string,
        editor: {
          model: Editors.longText,
          validator: myCustomTitleValidator, // use a custom validator
        },
        minWidth: 100,
        onCellChange: (e: Event, args: OnEventArgs) => {
          console.log(args);
          this.alertWarning = `Updated Title: ${args.dataContext.title}`;
        }
      }, {
        id: 'title2',
        name: 'Title, Custom Editor',
        field: 'title',
        filterable: true,
        sortable: true,
        type: FieldType.string,
        editor: {
          model: CustomInputEditor,
          validator: myCustomTitleValidator, // use a custom validator
        },
        minWidth: 70
      }, {
        id: 'duration',
        name: 'Duration (days)',
        field: 'duration',
        filterable: true,
        sortable: true,
        type: FieldType.number,
        filter: { model: Filters.slider, params: { hideSliderNumber: false } },
        editor: {
          model: Editors.slider,
          minValue: 0,
          maxValue: 100,
          // params: { hideSliderNumber: true },
        },
        /*
        editor: {
          // default is 0 decimals, if no decimals is passed it will accept 0 or more decimals
          // however if you pass the "decimalPlaces", it will validate with that maximum
          model: Editors.float,
          minValue: 0,
          maxValue: 365,
          // the default validation error message is in English but you can override it by using "errorMessage"
          // errorMessage: this.i18n.tr('INVALID_FLOAT', { maxDecimal: 2 }),
          params: { decimalPlaces: 2 },
        },
        */
        minWidth: 100
      }, {
        id: 'complete',
        name: '% Complete',
        field: 'percentComplete',
        filterable: true,
        formatter: Formatters.multiple,
        type: FieldType.number,
        editor: {
          model: Editors.singleSelect,

          // We can also add HTML text to be rendered (any bad script will be sanitized) but we have to opt-in, else it will be sanitized
          enableRenderHtml: true,
          collection: Array.from(Array(101).keys()).map(k => ({ value: k, label: k, labelSuffix: '<i class="fa fa-percent" style="color:cadetblue"></i>' })),

          // collection: Array.from(Array(101).keys()).map(k => ({ value: k, label: k, labelSuffix: '%' })),
          collectionSortBy: {
            property: 'label',
            sortDesc: true
          },
          collectionFilterBy: {
            property: 'value',
            value: 0,
            operator: OperatorType.notEqual
          }
        },
        minWidth: 100,
        params: {
          formatters: [Formatters.collectionEditor, Formatters.percentCompleteBar],
        }
      }, {
        id: 'start',
        name: 'Start',
        field: 'start',
        filterable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
        sortable: true,
        minWidth: 100,
        type: FieldType.date,
        editor: {
          model: Editors.date
        },
      }, {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        filterable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
        sortable: true,
        minWidth: 100,
        type: FieldType.date,
        editor: {
          model: Editors.date
        },
      }, {
        id: 'effort-driven',
        name: 'Effort Driven',
        field: 'effortDriven',
        filterable: true,
        type: FieldType.boolean,
        filter: {
          model: Filters.singleSelect,
          collection: [{ value: '', label: '' }, { value: true, label: 'True' }, { value: false, label: 'False' }],
        },
        formatter: Formatters.checkmark,
        editor: {
          model: Editors.checkbox,
        },
        minWidth: 70
      }, {
        id: 'prerequisites',
        name: 'Prerequisites',
        field: 'prerequisites',
        filterable: true,
        minWidth: 100,
        sortable: true,
        type: FieldType.string,
        editor: {
          model: Editors.multipleSelect,
          collection: Array.from(Array(12).keys()).map(k => ({ value: `Task ${k}`, label: `Task ${k}` })),
          collectionSortBy: {
            property: 'label',
            sortDesc: true
          },
          collectionFilterBy: {
            property: 'label',
            value: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5', 'Task 6'],
            operator: OperatorType.contains
          }
        },
        filter: {
          model: Filters.multipleSelect,
          filterOptions: {
            autoDropWidth: true
          },
          operator: OperatorType.inContains,
          collection: Array.from(Array(12).keys()).map(k => ({ value: `Task ${k}`, label: `Task ${k}` })),
        }
      }
    ];

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
      enableFiltering: true,
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
