import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import {
  AngularGridInstance,
  AutocompleteOption,
  Column,
  Editors,
  EditorArgs,
  EditorValidator,
  FieldType,
  Filters,
  FlatpickrOption,
  Formatters,
  GridOption,
  OnEventArgs,
  OperatorType,
  Sorters,
} from './../modules/angular-slickgrid';
import { CustomInputEditor } from './custom-inputEditor';
import { CustomInputFilter } from './custom-inputFilter';
import { Subject } from 'rxjs';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

const NB_ITEMS = 100;
const URL_SAMPLE_COLLECTION_DATA = 'assets/data/collection_100_numbers.json';
const URL_COUNTRIES_COLLECTION = 'assets/data/countries.json';
const URL_COUNTRY_NAMES = 'assets/data/country_names.json';

// you can create custom validator to pass to an inline editor
const myCustomTitleValidator: EditorValidator = (value: any, args: EditorArgs) => {
  // you can get the Editor Args which can be helpful, e.g. we can get the Translate Service from it
  const grid = args && args.grid;
  const gridOptions = (grid && grid.getOptions) ? grid.getOptions() : {};
  const translate = gridOptions.i18n;

  // to get the editor object, you'll need to use "internalColumnEditor"
  // don't use "editor" property since that one is what SlickGrid uses internally by it's editor factory
  const columnEditor = args && args.column && args.column.internalColumnEditor;

  if (value == null || value === undefined || !value.length) {
    return { valid: false, msg: 'This is a required field' };
  } else if (!/^Task\s\d+$/.test(value)) {
    return { valid: false, msg: 'Your title is invalid, it must start with "Task" followed by a number' };
    // OR use the Translate Service with your custom message
    // return { valid: false, msg: translate.instant('YOUR_ERROR', { x: value }) };
  } else {
    return { valid: true, msg: '' };
  }
};

// create a custom Formatter to show the Task + value
const taskFormatter = (row, cell, value, columnDef, dataContext) => {
  if (value && Array.isArray(value)) {
    const taskValues = value.map((val) => `Task ${val}`);
    const values = taskValues.join(', ');
    return `<span title="${values}">${values}</span>`;
  }
  return '';
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
    <li>Multiple Editors & Filters are available: AutoComplete, Checkbox, Date, Slider, SingleSelect, MultipleSelect, Float, Text, LongText... even Custom Editor</li>
    <li>When using "enableCellNavigation: true", clicking on a cell will automatically make it active &amp; selected.</li>
    <ul><li>If you don't want this behavior, then you should disable "enableCellNavigation"</li></ul>
    <li>Inline Editors requires "enableCellNavigation: true" (not sure why though)</li>
    <li>
        Support Excel Copy Buffer (SlickGrid Copy Manager Plugin), you can use it by simply enabling "enableExcelCopyBuffer" flag.
        Note that it will only evaluate Formatter when the "exportWithFormatter" flag is enabled (through "ExportOptions" or the column definition)
    </li>
    <li>MultipleSelect & SingeSelect Editors & Filters can use a regular "collection" or "collectionAsync" to load it asynchronously</li>
    <ul>
      <li>Click on "Add Item" and see the Editor/Filter or the "Prerequesites" column change</li>
      <li>Any Editor/Filter with a "collection" can be changed dynamically later in the future</li>
    </ul>
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
  duplicateTitleHeaderCount = 1;

  constructor(private http: HttpClient, private translate: TranslateService) { }

  ngOnInit() {
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
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
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
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
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
        minWidth: 100,
        filterable: true,
        sortable: true,
        type: FieldType.string,
        editor: {
          model: Editors.longText,
          required: true,
          validator: myCustomTitleValidator, // use a custom validator
        },
        onCellChange: (e: Event, args: OnEventArgs) => {
          console.log(args);
          this.alertWarning = `Updated Title: ${args.dataContext.title}`;
        }
      }, {
        id: 'title2',
        name: 'Title, Custom Editor',
        field: 'title',
        minWidth: 70,
        filterable: true,
        sortable: true,
        type: FieldType.string,
        editor: {
          model: CustomInputEditor,
          placeholder: 'custom',
          validator: myCustomTitleValidator, // use a custom validator
        },
        filter: {
          model: CustomInputFilter,
          placeholder: '&#128269; custom',
        },
      }, {
        id: 'duration',
        name: 'Duration (days)',
        field: 'duration',
        minWidth: 100,
        filterable: true,
        sortable: true,
        formatter: Formatters.complexObject,
        type: FieldType.number,
        exportWithFormatter: true,
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
          alwaysSaveOnEnterKey: true, // defaults to False, when set to true and user presses ENTER it will always call a Save even if value is empty
          model: Editors.float,
          placeholder: 'enter number',
          title: 'Your number must be bigger than 5', // add a custom title, to see it as a real tooltip you'll need to implement something like tipsy jquery lib
          minValue: 5,
          maxValue: 365,
          // the default validation error message is in English but you can override it by using "errorMessage"
          // errorMessage: this.i18n.tr('INVALID_FLOAT', { maxDecimal: 2 }),
          params: { decimalPlaces: 2 },
        },
        */
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

          // collection: Array.from(Array(101).keys()).map(k => ({ value: k, label: k, labelSuffix: '%' })),
          collectionSortBy: {
            property: 'label',
            sortDesc: true
          },
          collectionFilterBy: {
            property: 'value',
            value: 0,
            operator: OperatorType.notEqual
          },
          editorOptions: {
            maxHeight: 400
          }
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
        formatter: Formatters.multiple,
        params: {
          formatters: [Formatters.complexObject, Formatters.dateIso]
        },
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
          model: Editors.date,
          // override any of the Flatpickr options through "editorOptions"
          // please note that there's no TSlint on this property since it's generic for any filter, so make sure you entered the correct filter option(s)
          editorOptions: { minDate: 'today' } as FlatpickrOption
        },
      }, {
        id: 'cityOfOrigin', name: 'City of Origin', field: 'cityOfOrigin',
        filterable: true,
        minWidth: 100,
        editor: {
          model: Editors.autoComplete,
          placeholder: '&#128269; search city',

          // We can use the autocomplete through 3 ways "collection", "collectionAsync" or with your own autocomplete options
          // use your own autocomplete options, instead of $.ajax, use http
          // here we use $.ajax just because I'm not sure how to configure http with JSONP and CORS
          editorOptions: {
            forceUserInput: true,
            minLength: 3,
            source: (request, response) => {
              $.ajax({
                url: 'http://gd.geobytes.com/AutoCompleteCity',
                dataType: 'jsonp',
                data: {
                  q: request.term
                },
                success: (data) => response(data)
              });
            }
          } as AutocompleteOption,
        },
        filter: {
          model: Filters.autoComplete,
          // placeholder: '&#128269; search city',

          // We can use the autocomplete through 3 ways "collection", "collectionAsync" or with your own autocomplete options
          // collectionAsync: this.http.get(URL_COUNTRIES_COLLECTION),

          // OR use your own autocomplete options, instead of $.ajax, use http
          // here we use $.ajax just because I'm not sure how to configure http with JSONP and CORS
          filterOptions: {
            minLength: 3,
            source: (request, response) => {
              $.ajax({
                url: 'http://gd.geobytes.com/AutoCompleteCity',
                dataType: 'jsonp',
                data: {
                  q: request.term
                },
                success: (data) => response(data)
              });
            }
          } as AutocompleteOption,
        }
      }, {
        id: 'countryOfOrigin', name: 'Country of Origin', field: 'countryOfOrigin',
        formatter: Formatters.complexObject,
        exportWithFormatter: true,
        dataKey: 'code',
        labelKey: 'name',
        type: FieldType.object,
        sorter: Sorters.objectString, // this sorter requires the dataKey and assume that obj1[dataKey] will be a string so it can sort it that way
        filterable: true,
        sortable: true,
        minWidth: 100,
        editor: {
          model: Editors.autoComplete,
          customStructure: { label: 'name', value: 'code' },
          collectionAsync: this.http.get(URL_COUNTRIES_COLLECTION),
        },
        filter: {
          model: Filters.autoComplete,
          customStructure: { label: 'name', value: 'code' },
          collectionAsync: this.http.get(URL_COUNTRIES_COLLECTION),
        }
      }, {
        id: 'countryOfOriginName', name: 'Country of Origin Name', field: 'countryOfOriginName',
        filterable: true,
        sortable: true,
        minWidth: 100,
        editor: {
          model: Editors.autoComplete,
          collectionAsync: this.http.get(URL_COUNTRY_NAMES),
        },
        filter: {
          model: Filters.autoComplete,
          collectionAsync: this.http.get(URL_COUNTRY_NAMES),
        }
      }, {
        id: 'effort-driven',
        name: 'Effort Driven',
        field: 'effortDriven',
        minWidth: 70,
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
      }, {
        id: 'prerequisites',
        name: 'Prerequisites',
        field: 'prerequisites',
        minWidth: 100,
        filterable: true,
        formatter: taskFormatter,
        sortable: true,
        type: FieldType.string,
        editor: {
          placeholder: 'choose option',
          collectionAsync: this.http.get<{ value: string; label: string; }[]>(URL_SAMPLE_COLLECTION_DATA),
          // OR a regular collection load
          // collection: Array.from(Array(100).keys()).map(k => ({ value: k, prefix: 'Task', label: k })),
          collectionSortBy: {
            property: 'label',
            sortDesc: true
          },
          customStructure: {
            label: 'label',
            value: 'value',
            labelPrefix: 'prefix',
          },
          collectionOptions: {
            separatorBetweenTextLabels: ' '
          },
          model: Editors.multipleSelect,
          required: true
        },
        filter: {
          collectionAsync: this.http.get<{ value: string; label: string; }[]>(URL_SAMPLE_COLLECTION_DATA),
          // OR a regular collection load
          // collection: Array.from(Array(100).keys()).map(k => ({ value: k, prefix: 'Task', label: k })),
          collectionSortBy: {
            property: 'label',
            sortDesc: true
          },
          customStructure: {
            label: 'label',
            value: 'value',
            labelPrefix: 'prefix',
          },
          collectionOptions: {
            separatorBetweenTextLabels: ' '
          },
          model: Filters.multipleSelect,
          operator: OperatorType.inContains,
        }
      }
    ];

    this.gridOptions = {
      asyncEditorLoading: false,
      autoEdit: this.isAutoEdit,
      autoCommitEdit: false,
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

    this.dataset = this.mockData(NB_ITEMS);
  }

  /** Add a new row to the grid and refresh the Filter collection.
   * Note that because Filter elements are always displayed on the screen, we need to tell the Filter,
   * we do this via a Subject .next(), that it's collection got changed
   * as for the Editor, there's nothing to do since the element is not shown and it will have latest collection next time it shows up
   */
  addItem() {
    const lastRowIndex = this.dataset.length;
    const newRows = this.mockData(1, lastRowIndex);

    // wrap into a timer to simulate a backend async call
    setTimeout(() => {
      const requisiteColumnDef = this.columnDefinitions.find((column: Column) => column.id === 'prerequisites');
      if (requisiteColumnDef) {
        const filterCollectionAsync = requisiteColumnDef.filter.collectionAsync;
        const editorCollection = requisiteColumnDef.editor.collection;

        if (Array.isArray(editorCollection)) {
          // add the new row to the grid
          this.angularGrid.gridService.addItemToDatagrid(newRows[0]);

          // then refresh the Editor "collection", we have 2 ways of doing it

          // Push to the Editor "collection"
          editorCollection.push({ value: lastRowIndex, label: lastRowIndex, prefix: 'Task' });

          // or replace entire "collection"
          // durationColumnDef.editor.collection = [...collection, ...[{ value: lastRowIndex, label: lastRowIndex }]];

          // for the Filter only, we have a trigger an RxJS/Subject change with the new collection
          // we do this because Filter(s) are shown at all time, while on Editor it's unnecessary since they are only shown when opening them
          if (filterCollectionAsync instanceof Subject) {
            filterCollectionAsync.next(editorCollection);
          }
        }
      }
    }, 250);
  }

  /**
   * Delete last inserted row.
   * Note that because Filter elements are always displayed on the screen, we need to tell the Filter,
   * we do this via a Subject .next(), that it's collection got changed
   * as for the Editor, there's nothing to do since the element is not shown and it will have latest collection next time it shows up
   */
  deleteItem() {
    const requisiteColumnDef = this.columnDefinitions.find((column: Column) => column.id === 'prerequisites');
    if (requisiteColumnDef) {
      const filterCollectionAsync = requisiteColumnDef.filter.collectionAsync;
      const filterCollection = requisiteColumnDef.filter.collection;

      if (Array.isArray(filterCollection)) {
        // sort collection in descending order and take out last collection option
        const selectCollectionObj = this.sortCollectionDescending(filterCollection).pop();

        // then we will delete that item from the grid
        this.angularGrid.gridService.deleteDataGridItemById(selectCollectionObj.value);

        // for the Filter only, we have a trigger an RxJS/Subject change with the new collection
        // we do this because Filter(s) are shown at all time, while on Editor it's unnecessary since they are only shown when opening them
        if (filterCollectionAsync instanceof Subject) {
          filterCollectionAsync.next(filterCollection);
        }
      }
    }
  }

  sortCollectionDescending(collection) {
    return collection.sort((item1, item2) => item1.value - item2.value);
  }

  mockData(itemCount, startingIndex = 0) {
    // mock a dataset
    const tempDataset = [];
    for (let i = startingIndex; i < (startingIndex + itemCount); i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomFinishYear = (new Date().getFullYear() - 3) + Math.floor(Math.random() * 10); // use only years not lower than 3 years ago
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);
      const randomFinish = new Date(randomFinishYear, (randomMonth + 1), randomDay);

      tempDataset.push({
        id: i,
        title: 'Task ' + i,
        duration: (i % 33 === 0) ? null : Math.round(Math.random() * 100) + '',
        start: new Date(randomYear, randomMonth, randomDay),
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        finish: randomFinish < new Date() ? '' : randomFinish, // make sure the random date is earlier than today
        effortDriven: (i % 5 === 0),
        prerequisites: (i % 2 === 0) && i !== 0 && i < 12 ? [i, i - 1] : [],
        countryOfOrigin: (i % 2) ? { code: 'CA', name: 'Canada' } : { code: 'US', name: 'United States' },
        countryOfOriginName: (i % 2) ? 'Canada' : 'United States',
        cityOfOrigin: (i % 2) ? 'Vancouver, BC, Canada' : 'Boston, MA, United States',
      });
    }
    return tempDataset;
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

  changeAutoCommit() {
    this.gridOptions.autoCommitEdit = !this.gridOptions.autoCommitEdit;
    this.gridObj.setOptions({
      autoCommitEdit: this.gridOptions.autoCommitEdit
    });
    return true;
  }

  dynamicallyAddTitleHeader() {
    const newCol = {
      id: `title${this.duplicateTitleHeaderCount++}`,
      name: 'Title',
      field: 'title',
      editor: {
        model: Editors.text,
        required: true,
        validator: myCustomTitleValidator, // use a custom validator
      },
      sortable: true, minWidth: 100, filterable: true, params: { useFormatterOuputToFilter: true }
    };
    this.columnDefinitions.push(newCol);
    this.columnDefinitions = this.columnDefinitions.slice();
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
