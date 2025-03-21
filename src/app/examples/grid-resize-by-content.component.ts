import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExcelExportService } from '@slickgrid-universal/excel-export';

import {
  type AngularGridInstance,
  type Column,
  type GridOption,
  Filters,
  type Formatter,
  type LongTextEditorOption,
  FieldType,
  Editors,
  Formatters,
  type AutocompleterOption,
  type EditCommand,
  formatNumber,
  SortComparers,
  type SlickGrid,
  SlickGlobalEditorLock,
  type VanillaCalendarOption,
  type SearchTerm,
} from '../modules/angular-slickgrid';

const URL_COUNTRIES_COLLECTION = 'assets/data/countries.json';

/**
 * Check if the current item (cell) is editable or not
 * @param {*} dataContext - item data context object
 * @param {*} columnDef - column definition
 * @param {*} grid - slickgrid grid object
 * @returns {boolean} isEditable
 */
function checkItemIsEditable(dataContext: any, columnDef: Column, grid: SlickGrid) {
  const gridOptions = grid.getOptions();
  const hasEditor = columnDef.editor;
  const isGridEditable = gridOptions.editable;
  let isEditable = !!(isGridEditable && hasEditor);

  if (dataContext && columnDef && gridOptions && gridOptions.editable) {
    switch (columnDef.id) {
      case 'finish':
        isEditable = !!dataContext?.completed;
        break;
    }
  }
  return isEditable;
}

const customEditableInputFormatter: Formatter = (_row, _cell, value, columnDef, _dataContext, grid) => {
  const gridOptions = grid.getOptions();
  const isEditableLine = gridOptions.editable && columnDef.editor;
  value = value === null || value === undefined ? '' : value;
  return isEditableLine ? { text: value, addClasses: 'editable-field', toolTip: 'Click to Edit' } : value;
};

// you can create custom validator to pass to an inline editor
const myCustomTitleValidator = (value: any) => {
  if (value === null || value === undefined || !value.length) {
    // we will only check if the field is supplied when it's an inline editing
    return { valid: false, msg: 'This is a required field.' };
  } else if (!/^(task\s\d+)*$/i.test(value)) {
    return { valid: false, msg: 'Your title is invalid, it must start with "Task" followed by a number.' };
  }
  return { valid: true, msg: '' };
};

@Component({
  templateUrl: './grid-resize-by-content.component.html',
  styleUrls: ['./grid-resize-by-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridResizeByContentComponent implements OnInit {
  title = 'Example 31: Columns Resize by Content';
  subTitle = `The grid below uses the optional resize by cell content (with a fixed 950px for demo purposes), you can click on the 2 buttons to see the difference. The "autosizeColumns" is really the default option used by Angular-SlickGrid, the resize by cell content is optional because it requires to read the first thousand rows and do extra width calculation.`;

  angularGrid!: AngularGridInstance;
  gridOptions!: GridOption;
  columnDefinitions: Column[] = [];
  dataset: any[] = [];
  editQueue: any[] = [];
  editedItems: any = {};
  hideSubTitle = false;
  isUsingDefaultResize = false;
  isGridEditable = true;
  isMassSelectionDisabled = true;
  complexityLevelList = [
    { value: 0, label: 'Very Simple' },
    { value: 1, label: 'Simple' },
    { value: 2, label: 'Straightforward' },
    { value: 3, label: 'Complex' },
    { value: 4, label: 'Very Complex' },
  ];

  constructor(private http: HttpClient) {}

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  ngOnInit(): void {
    this.defineGrid();
    this.dataset = this.loadData(400);
  }

  // Grid2 definition
  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'title',
        name: 'Title',
        field: 'title',
        sortable: true,
        type: FieldType.string,
        minWidth: 65,
        // you can adjust the resize calculation via multiple options
        resizeExtraWidthPadding: 4,
        resizeCharWidthInPx: 7.6,
        resizeCalcWidthRatio: 1,
        resizeMaxWidthThreshold: 200,
        columnGroup: 'Common Factor',
        cssClass: 'text-uppercase fw-bold',
        filterable: true,
        filter: {
          model: Filters.inputText,
          // you can use your own custom filter predicate when built-in filters aren't working for you
          // for example the example below will function similarly to an SQL LIKE to answer this SO: https://stackoverflow.com/questions/78471412/angular-slickgrid-filter
          filterPredicate: (dataContext, searchFilterArgs) => {
            const searchVals = (searchFilterArgs.parsedSearchTerms || []) as SearchTerm[];
            if (searchVals?.length) {
              const columnId = searchFilterArgs.columnId;
              const searchVal = searchVals[0] as string;
              const cellValue = dataContext[columnId].toLowerCase();
              const results = searchVal.matchAll(/^%([^%\r\n]+)[^%\r\n]*$|(.*)%(.+)%(.*)|(.+)%(.+)|([^%\r\n]+)%$/gi);
              const arrayOfMatches = Array.from(results);
              const matches = arrayOfMatches.length ? arrayOfMatches[0] : [];
              const [_, endW, containSW, contain, containEndW, comboSW, comboEW, startW] = matches;

              if (endW) {
                // example: "%001" ends with A
                return cellValue.endsWith(endW.toLowerCase());
              } else if (containSW && contain) {
                // example: "%Ti%001", contains A + ends with B
                return cellValue.startsWith(containSW.toLowerCase()) && cellValue.includes(contain.toLowerCase());
              } else if (contain && containEndW) {
                // example: "%Ti%001", contains A + ends with B
                return cellValue.includes(contain) && cellValue.endsWith(containEndW.toLowerCase());
              } else if (contain && !containEndW) {
                // example: "%Ti%", contains A anywhere
                return cellValue.includes(contain.toLowerCase());
              } else if (comboSW && comboEW) {
                // example: "Ti%001", combo starts with A + ends with B
                return cellValue.startsWith(comboSW.toLowerCase()) && cellValue.endsWith(comboEW.toLowerCase());
              } else if (startW) {
                // example: "Ti%", starts with A
                return cellValue.startsWith(startW.toLowerCase());
              }
              // anything else
              return cellValue.includes(searchVal.toLowerCase());
            }

            // if we fall here then the value is not filtered out
            return true;
          },
        },
        editor: {
          model: Editors.longText,
          required: true,
          alwaysSaveOnEnterKey: true,
          maxLength: 12,
          editorOptions: {
            cols: 45,
            rows: 6,
            buttonTexts: {
              cancel: 'Close',
              save: 'Done',
            },
          } as LongTextEditorOption,
          validator: myCustomTitleValidator,
        },
      },
      {
        id: 'duration',
        name: 'Duration',
        field: 'duration',
        sortable: true,
        filterable: true,
        minWidth: 65,
        type: FieldType.number,
        columnGroup: 'Common Factor',
        formatter: (_row, _cell, value) => {
          if (value === null || value === undefined || value === '') {
            return '';
          }
          return value > 1 ? `${value} days` : `${value} day`;
        },
        editor: {
          model: Editors.float,
          decimal: 2,
          valueStep: 1,
          minValue: 0,
          maxValue: 10000,
          alwaysSaveOnEnterKey: true,
          required: true,
        },
      },
      {
        id: 'cost',
        name: 'Cost',
        field: 'cost',
        minWidth: 65,
        sortable: true,
        filterable: true,
        type: FieldType.number,
        columnGroup: 'Analysis',
        filter: { model: Filters.compoundInputNumber },
        formatter: Formatters.dollar,
      },
      {
        id: 'percentComplete',
        name: '% Complete',
        field: 'percentComplete',
        minWidth: 100,
        type: FieldType.number,
        sortable: true,
        filterable: true,
        columnGroup: 'Analysis',
        filter: { model: Filters.compoundSlider, operator: '>=' },
        editor: {
          model: Editors.slider,
          minValue: 0,
          maxValue: 100,
        },
      },
      {
        id: 'complexity',
        name: 'Complexity',
        field: 'complexity',
        resizeCalcWidthRatio: 0.82, // default calc ratio is 1 or 0.95 for field type of string
        sortable: true,
        filterable: true,
        columnGroup: 'Analysis',
        formatter: (_row, _cell, value) => this.complexityLevelList[value]?.label,
        exportCustomFormatter: (_row, _cell, value) => this.complexityLevelList[value]?.label,
        filter: {
          model: Filters.multipleSelect,
          collection: this.complexityLevelList,
        },
        editor: {
          model: Editors.singleSelect,
          collection: this.complexityLevelList,
        },
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        sortable: true,
        formatter: Formatters.dateUs,
        columnGroup: 'Period',
        exportCustomFormatter: Formatters.dateUs,
        type: FieldType.date,
        outputType: FieldType.dateUs,
        saveOutputType: FieldType.dateUtc,
        filterable: true,
        filter: { model: Filters.compoundDate },
        editor: { model: Editors.date, params: { hideClearButton: false } },
      },
      {
        id: 'completed',
        name: 'Completed',
        field: 'completed',
        width: 80,
        minWidth: 75,
        maxWidth: 100,
        cssClass: 'text-center',
        columnGroup: 'Period',
        formatter: Formatters.checkmarkMaterial,
        exportWithFormatter: false,
        filterable: true,
        sortable: true,
        filter: {
          collection: [
            { value: '', label: '' },
            { value: true, label: 'True' },
            { value: false, label: 'False' },
          ],
          model: Filters.singleSelect,
        },
        editor: { model: Editors.checkbox },
        // editor: { model: Editors.singleSelect, collection: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }], },
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        sortable: true,
        formatter: Formatters.dateUs,
        columnGroup: 'Period',
        type: FieldType.date,
        outputType: FieldType.dateUs,
        saveOutputType: FieldType.dateUtc,
        filterable: true,
        filter: { model: Filters.compoundDate },
        exportCustomFormatter: Formatters.dateUs,
        editor: {
          model: Editors.date,
          editorOptions: { range: { min: 'today' } } as VanillaCalendarOption,
          validator: (value, args) => {
            const dataContext = args && args.item;
            if (dataContext && dataContext.completed && !value) {
              return { valid: false, msg: 'You must provide a "Finish" date when "Completed" is checked.' };
            }
            return { valid: true, msg: '' };
          },
        },
      },
      {
        id: 'product',
        name: 'Product',
        field: 'product',
        filterable: true,
        columnGroup: 'Item',
        minWidth: 100,
        resizeCharWidthInPx: 8,
        exportWithFormatter: true,
        dataKey: 'id',
        labelKey: 'itemName',
        formatter: Formatters.complexObject,
        exportCustomFormatter: Formatters.complex, // without the Editing cell Formatter
        type: FieldType.object,
        sortComparer: SortComparers.objectString,
        editor: {
          model: Editors.autocompleter,
          alwaysSaveOnEnterKey: true,

          // example with a Remote API call
          editorOptions: {
            minLength: 1,
            fetch: (searchTerm: string, callback: (items: false | any[]) => void) => {
              // const items = require('c://TEMP/items.json');
              const products = this.mockProducts();
              callback(products.filter((product) => product.itemName.toLowerCase().includes(searchTerm.toLowerCase())));
            },
            renderItem: {
              // layout: 'twoRows',
              // templateCallback: (item: any) => this.renderItemCallbackWith2Rows(item),

              layout: 'fourCorners',
              templateCallback: (item: any) => this.renderItemCallbackWith4Corners(item),
            },
          } as AutocompleterOption,
        },
        filter: {
          model: Filters.inputText,
          // placeholder: '🔎︎ search product',
          type: FieldType.string,
          queryField: 'product.itemName',
        },
      },
      {
        id: 'origin',
        name: 'Country of Origin',
        field: 'origin',
        formatter: Formatters.complexObject,
        columnGroup: 'Item',
        exportCustomFormatter: Formatters.complex, // without the Editing cell Formatter
        dataKey: 'code',
        labelKey: 'name',
        type: FieldType.object,
        sortComparer: SortComparers.objectString,
        filterable: true,
        sortable: true,
        minWidth: 100,
        editor: {
          model: Editors.autocompleter,
          customStructure: { label: 'name', value: 'code' },
          collectionAsync: this.http.get(URL_COUNTRIES_COLLECTION),
        },
        filter: {
          model: Filters.inputText,
          type: FieldType.string,
          queryField: 'origin.name',
        },
      },
      {
        id: 'action',
        name: 'Action',
        field: 'action',
        width: 70,
        minWidth: 70,
        maxWidth: 70,
        excludeFromExport: true,
        formatter: () =>
          `<div class="button-style margin-auto" style="width: 35px;"><span class="mdi mdi-chevron-down text-primary"></span></div>`,
        cellMenu: {
          hideCloseButton: false,
          commandTitle: 'Commands',
          commandItems: [
            {
              command: 'help',
              title: 'Help!',
              iconCssClass: 'mdi mdi-help-circle',
              positionOrder: 66,
              action: () => alert('Please Help!'),
            },
            'divider',
            {
              command: 'delete-row',
              title: 'Delete Row',
              positionOrder: 64,
              iconCssClass: 'mdi mdi-close color-danger',
              cssClass: 'red',
              textCssClass: 'text-italic color-danger-light',
              // only show command to 'Delete Row' when the task is not completed
              itemVisibilityOverride: (args) => {
                return !args.dataContext?.completed;
              },
              action: (_event, args) => {
                const dataContext = args.dataContext;
                const row = args?.row ?? 0;
                if (confirm(`Do you really want to delete row (${row + 1}) with "${dataContext.title}"`)) {
                  this.angularGrid.gridService.deleteItemById(dataContext.id);
                }
              },
            },
          ],
        },
      },
    ];

    this.gridOptions = {
      editable: true,
      autoAddCustomEditorFormatter: customEditableInputFormatter,
      enableCellNavigation: true,
      autoEdit: true,
      autoCommitEdit: true,
      autoResize: {
        container: '#smaller-container',
        rightPadding: 10,
      },
      enableAutoResize: true,
      enablePagination: true,
      pagination: {
        pageSize: 10,
        pageSizes: [10, 200, 500, 5000],
      },

      // resizing by cell content is opt-in
      // we first need to disable the 2 default flags to autoFit/autosize
      autoFitColumnsOnFirstLoad: false,
      enableAutoSizeColumns: false,
      // then enable resize by content with these 2 flags
      autosizeColumnsByCellContentOnFirstLoad: true,
      enableAutoResizeColumnsByCellContent: true,

      resizeByContentOptions: {
        // optional resize calculation options
        defaultRatioForStringType: 0.92,
        formatterPaddingWidthInPx: 8, // optional editor formatter padding for resize calculation
      },

      enableExcelExport: true,
      excelExportOptions: {
        exportWithFormatter: false,
      },
      externalResources: [new ExcelExportService()],
      enableFiltering: true,
      enableRowSelection: true,
      enableCheckboxSelector: true,
      checkboxSelector: {
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true,
      },
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false,
      },
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 28,
      rowHeight: 33,
      headerRowHeight: 35,
      editCommandHandler: (item, column, editCommand) => {
        const prevSerializedValues = Array.isArray(editCommand.prevSerializedValue)
          ? editCommand.prevSerializedValue
          : [editCommand.prevSerializedValue];
        const serializedValues = Array.isArray(editCommand.serializedValue)
          ? editCommand.serializedValue
          : [editCommand.serializedValue];
        const editorColumns = this.columnDefinitions.filter((col) => col.editor !== undefined);

        const modifiedColumns: Column[] = [];
        prevSerializedValues.forEach((_val, index) => {
          const prevSerializedValue = prevSerializedValues[index];
          const serializedValue = serializedValues[index];

          if (prevSerializedValue !== serializedValue) {
            const finalColumn = Array.isArray(editCommand.prevSerializedValue) ? editorColumns[index] : column;
            this.editedItems[this.gridOptions.datasetIdPropertyName || 'id'] = item; // keep items by their row indexes, if the row got edited twice then we'll keep only the last change
            this.angularGrid.slickGrid.invalidate();
            editCommand.execute();

            this.renderUnsavedCellStyling(item, finalColumn, editCommand);
            modifiedColumns.push(finalColumn);
          }
        });

        // queued editor, so we'll push only 1 change at the end but with all columns modified
        // this way we can undo the entire row change (for example if user changes 3 field in the editor modal, then doing a undo last change will undo all 3 in 1 shot)
        this.editQueue.push({ item, columns: modifiedColumns, editCommand });
      },
      // when using the cellMenu, you can change some of the default options and all use some of the callback methods
      enableCellMenu: true,
    };
  }

  loadData(count: number) {
    // mock data
    const tmpArray: any[] = [];
    for (let i = 0; i < count; i++) {
      const randomItemId = Math.floor(Math.random() * this.mockProducts().length);
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomFinishYear = new Date().getFullYear() + Math.floor(Math.random() * 10); // use only years not lower than 3 years ago
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 29);
      const randomTime = Math.floor(Math.random() * 59);
      const randomFinish = new Date(randomFinishYear, randomMonth + 1, randomDay, randomTime, randomTime, randomTime);
      const randomPercentComplete = Math.floor(Math.random() * 100) + 15; // make it over 15 for E2E testing purposes
      const percentCompletion = randomPercentComplete > 100 ? (i > 5 ? 100 : 88) : randomPercentComplete; // don't use 100 unless it's over index 5, for E2E testing purposes
      const isCompleted = percentCompletion === 100;

      tmpArray[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.floor(Math.random() * 100) + 10,
        percentComplete: percentCompletion,
        analysis: {
          percentComplete: percentCompletion,
        },
        complexity: i % 3 ? 0 : 2,
        start: new Date(randomYear, randomMonth, randomDay, randomDay, randomTime, randomTime, randomTime),
        finish:
          isCompleted || (i % 3 === 0 && randomFinish > new Date() && i > 3) ? (isCompleted ? new Date() : randomFinish) : '', // make sure the random date is earlier than today and it's index is bigger than 3
        cost: i % 33 === 0 ? null : Math.round(Math.random() * 10000) / 100,
        completed: isCompleted || (i % 3 === 0 && randomFinish > new Date() && i > 3),
        product: { id: this.mockProducts()[randomItemId]?.id, itemName: this.mockProducts()[randomItemId]?.itemName },
        origin: i % 2 ? { code: 'CA', name: 'Canada' } : { code: 'US', name: 'United States' },
      };

      if (!(i % 8)) {
        delete tmpArray[i].finish; // also test with undefined properties
        delete tmpArray[i].percentComplete; // also test with undefined properties
      }
    }
    return tmpArray;
  }

  handleValidationError(_e: Event, args: any) {
    if (args.validationResults) {
      alert(args.validationResults.msg);
    }
    return false;
  }

  handleItemDeleted(_e: Event, args: any) {
    console.log('item deleted with id:', args.itemId);
  }

  handleOnBeforeEditCell(e: Event, args: any) {
    const { column, item, grid } = args;

    if (column && item) {
      if (!checkItemIsEditable(item, column, grid)) {
        e.preventDefault(); // OR eventData.preventDefault();
        return false;
      }
    }
    return false;
  }

  handleOnCellChange(_e: Event, args: any) {
    const dataContext = args?.item;

    // when the field "completed" changes to false, we also need to blank out the "finish" date
    if (dataContext && !dataContext.completed) {
      dataContext.finish = null;
      this.angularGrid.gridService.updateItem(dataContext);
    }
  }

  handlePaginationChanged() {
    this.removeAllUnsavedStylingFromCell();
    this.renderUnsavedStylingOnAllVisibleCells();
  }

  handleDefaultResizeColumns() {
    // just for demo purposes, set it back to its original width
    const columns = this.angularGrid.slickGrid.getColumns() as Column[];
    columns.forEach((col) => (col.width = col.originalWidth));
    this.angularGrid.slickGrid.setColumns(columns);
    this.angularGrid.slickGrid.autosizeColumns();
    this.isUsingDefaultResize = true;
  }

  handleNewResizeColumns() {
    this.angularGrid.resizerService.resizeColumnsByCellContent(true);
    this.isUsingDefaultResize = false;
  }

  handleOnSelectedRowIdsChanged(args: any) {
    console.log('Selected Ids:', args.selectedRowIds);
  }

  toggleGridEditReadonly() {
    // first need undo all edits
    this.undoAllEdits();

    // then change a single grid options to make the grid non-editable (readonly)
    this.isGridEditable = !this.isGridEditable;
    if (!this.isGridEditable) {
      this.isMassSelectionDisabled = true;
    }
    // dynamically change SlickGrid editable grid option
    this.angularGrid.slickGrid.setOptions({ editable: this.isGridEditable });
  }

  removeUnsavedStylingFromCell(_item: any, column: Column, row: number) {
    // remove unsaved css class from that cell
    this.angularGrid.slickGrid.removeCellCssStyles(`unsaved_highlight_${[column.id]}${row}`);
  }

  removeAllUnsavedStylingFromCell() {
    for (const lastEdit of this.editQueue) {
      const lastEditCommand = lastEdit?.editCommand;
      if (lastEditCommand) {
        // remove unsaved css class from that cell
        for (const lastEditColumn of lastEdit.columns) {
          this.removeUnsavedStylingFromCell(lastEdit.item, lastEditColumn, lastEditCommand.row);
        }
      }
    }
  }

  renderUnsavedStylingOnAllVisibleCells() {
    for (const lastEdit of this.editQueue) {
      if (lastEdit) {
        const { item, columns, editCommand } = lastEdit;
        if (Array.isArray(columns)) {
          columns.forEach((col) => {
            this.renderUnsavedCellStyling(item, col, editCommand);
          });
        }
      }
    }
  }

  renderUnsavedCellStyling(item: any, column: Column, editCommand: EditCommand) {
    if (editCommand && item && column) {
      const row = this.angularGrid.dataView.getRowByItem(item) as number;
      if (row >= 0) {
        const hash = { [row]: { [column.id]: 'unsaved-editable-field' } };
        this.angularGrid.slickGrid.setCellCssStyles(`unsaved_highlight_${[column.id]}${row}`, hash);
      }
    }
  }

  // change row selection dynamically and apply it to the DataView and the Grid UI
  setSelectedRowIds() {
    // change row selection even across multiple pages via DataView
    this.angularGrid.dataView?.setSelectedIds([3, 4, 11]);

    // you can also provide optional options (all defaults to true)
    // this.sgb.dataView?.setSelectedIds([4, 5, 8, 10], {
    //   isRowBeingAdded: true,
    //   shouldTriggerEvent: true,
    //   applyGridRowSelection: true
    // });
  }

  saveAll() {
    // Edit Queue (array increases every time a cell is changed, regardless of item object)
    console.log(this.editQueue);

    // Edit Items only keeps the merged data (an object with row index as the row properties)
    // if you change 2 different cells on 2 different cells then this editedItems will only contain 1 property
    // example: editedItems = { 0: { title: task 0, duration: 50, ... }}
    // ...means that row index 0 got changed and the final merged object is { title: task 0, duration: 50, ... }
    console.log(this.editedItems);
    // console.log(`We changed ${Object.keys(this.editedItems).length} rows`);

    // since we saved, we can now remove all the unsaved color styling and reset our array/object
    this.removeAllUnsavedStylingFromCell();
    this.editQueue = [];
    this.editedItems = {};
  }

  undoLastEdit(showLastEditor = false) {
    const lastEdit = this.editQueue.pop();
    const lastEditCommand = lastEdit?.editCommand;
    if (lastEdit && lastEditCommand && SlickGlobalEditorLock.cancelCurrentEdit()) {
      lastEditCommand.undo();

      // remove unsaved css class from that cell
      for (const lastEditColumn of lastEdit.columns) {
        this.removeUnsavedStylingFromCell(lastEdit.item, lastEditColumn, lastEditCommand.row);
      }
      this.angularGrid.slickGrid.invalidate();

      // optionally open the last cell editor associated
      if (showLastEditor) {
        this.angularGrid?.slickGrid.gotoCell(lastEditCommand.row, lastEditCommand.cell, false);
      }
    }
  }

  undoAllEdits() {
    for (const lastEdit of this.editQueue) {
      const lastEditCommand = lastEdit?.editCommand;
      if (lastEditCommand && SlickGlobalEditorLock.cancelCurrentEdit()) {
        lastEditCommand.undo();

        // remove unsaved css class from that cell
        for (const lastEditColumn of lastEdit.columns) {
          this.removeUnsavedStylingFromCell(lastEdit.item, lastEditColumn, lastEditCommand.row);
        }
      }
    }
    this.angularGrid.slickGrid.invalidate(); // re-render the grid only after every cells got rolled back
    this.editQueue = [];
  }

  mockProducts() {
    return [
      {
        id: 0,
        itemName: 'Sleek Metal Computer',
        itemNameTranslated: 'some fantastic sleek metal computer description',
        listPrice: 2100.23,
        itemTypeName: 'I',
        image: 'http://i.stack.imgur.com/pC1Tv.jpg',
        icon: `mdi ${this.getRandomIcon(0)}`,
      },
      {
        id: 1,
        itemName: 'Tasty Granite Table',
        itemNameTranslated: 'an extremely huge and heavy table',
        listPrice: 3200.12,
        itemTypeName: 'I',
        image: 'https://i.imgur.com/Fnm7j6h.jpg',
        icon: `mdi ${this.getRandomIcon(1)}`,
      },
      {
        id: 2,
        itemName: 'Awesome Wooden Mouse',
        itemNameTranslated: 'super old mouse',
        listPrice: 15.0,
        itemTypeName: 'I',
        image: 'https://i.imgur.com/RaVJuLr.jpg',
        icon: `mdi ${this.getRandomIcon(2)}`,
      },
      {
        id: 3,
        itemName: 'Gorgeous Fresh Shirt',
        itemNameTranslated: 'what a gorgeous shirt seriously',
        listPrice: 25.76,
        itemTypeName: 'I',
        image: 'http://i.stack.imgur.com/pC1Tv.jpg',
        icon: `mdi ${this.getRandomIcon(3)}`,
      },
      {
        id: 4,
        itemName: 'Refined Cotton Table',
        itemNameTranslated: 'super light table that will fall apart amazingly fast',
        listPrice: 13.35,
        itemTypeName: 'I',
        image: 'https://i.imgur.com/Fnm7j6h.jpg',
        icon: `mdi ${this.getRandomIcon(4)}`,
      },
      {
        id: 5,
        itemName: 'Intelligent Wooden Pizza',
        itemNameTranslated: 'wood not included',
        listPrice: 23.33,
        itemTypeName: 'I',
        image: 'https://i.imgur.com/RaVJuLr.jpg',
        icon: `mdi ${this.getRandomIcon(5)}`,
      },
      {
        id: 6,
        itemName: 'Licensed Cotton Chips',
        itemNameTranslated: 'not sure what that is',
        listPrice: 71.21,
        itemTypeName: 'I',
        image: 'http://i.stack.imgur.com/pC1Tv.jpg',
        icon: `mdi ${this.getRandomIcon(6)}`,
      },
      {
        id: 7,
        itemName: 'Ergonomic Rubber Soap',
        itemNameTranslated: `so good you'll want to use it every night`,
        listPrice: 2.43,
        itemTypeName: 'I',
        image: 'https://i.imgur.com/Fnm7j6h.jpg',
        icon: `mdi ${this.getRandomIcon(7)}`,
      },
      {
        id: 8,
        itemName: 'Handcrafted Steel Car',
        itemNameTranslated: `aka tesla truck`,
        listPrice: 31288.39,
        itemTypeName: 'I',
        image: 'https://i.imgur.com/RaVJuLr.jpg',
        icon: `mdi ${this.getRandomIcon(8)}`,
      },
    ];
  }

  /** List of icons that are supported in this lib Material Design Icons */
  getRandomIcon(iconIndex?: number) {
    const icons = [
      'mdi-arrow-collapse',
      'mdi-arrow-expand',
      'mdi-cancel',
      'mdi-check',
      'mdi-checkbox-blank-outline',
      'mdi-check-box-outline',
      'mdi-checkbox-marked',
      'mdi-close',
      'mdi-close-circle',
      'mdi-close-circle-outline',
      'mdi-close-thick',
      'mdi-content-copy',
      'mdi-database-refresh',
      'mdi-download',
      'mdi-file-document-outline',
      'mdi-file-excel-outline',
      'mdi-file-music-outline',
      'mdi-file-pdf-outline',
      'mdi-filter-remove-outline',
      'mdi-flip-vertical',
      'mdi-folder',
      'mdi-folder-open',
      'mdi-help-circle',
      'mdi-help-circle-outline',
      'mdi-history',
      'mdi-information',
      'mdi-information-outline',
      'mdi-link',
      'mdi-link-variant',
      'mdi-menu',
      'mdi-microsoft-excel',
      'mdi-minus',
      'mdi-page-first',
      'mdi-page-last',
      'mdi-paperclip',
      'mdi-pin-off-outline',
      'mdi-pin-outline',
      'mdi-playlist-plus',
      'mdi-playlist-remove',
      'mdi-plus',
      'mdi-redo',
      'mdi-refresh',
      'mdi-shape-square-plus',
      'mdi-sort-ascending',
      'mdi-sort-descending',
      'mdi-swap-horizontal',
      'mdi-swap-vertical',
      'mdi-sync',
      'mdi-table-edit',
      'mdi-table-refresh',
      'mdi-undo',
    ];
    const randomNumber = Math.floor(Math.random() * icons.length - 1);
    return icons[iconIndex ?? randomNumber];
  }

  renderItemCallbackWith2Rows(item: any): string {
    return `<div class="autocomplete-container-list">
      <div class="autocomplete-left">
        <!--<img src="http://i.stack.imgur.com/pC1Tv.jpg" width="50" />-->
        <span class="fa ${item.icon}"></span>
      </div>
      <div>
        <span class="autocomplete-top-left">
          <span class="mdfai ${item.itemTypeName === 'I' ? 'mdi-information-outline' : 'mdi-content-copy'}"></span>
          ${item.itemName}
        </span>
      <div>
    </div>
    <div>
      <div class="autocomplete-bottom-left">${item.itemNameTranslated}</div>
    </div>`;
  }

  renderItemCallbackWith4Corners(item: any): string {
    return `<div class="autocomplete-container-list">
          <div class="autocomplete-left">
            <!--<img src="http://i.stack.imgur.com/pC1Tv.jpg" width="50" />-->
            <span class="fa ${item.icon}"></span>
          </div>
          <div>
            <span class="autocomplete-top-left">
              <span class="fa ${item.itemTypeName === 'I' ? 'mdi-information-outline' : 'mdi-content-copy'}"></span>
              ${item.itemName}
            </span>
            <span class="autocomplete-top-right">${formatNumber(item.listPrice, 2, 2, false, '$')}</span>
          <div>
        </div>
        <div>
          <div class="autocomplete-bottom-left">${item.itemNameTranslated}</div>
          <span class="autocomplete-bottom-right">Type: <b>${item.itemTypeName === 'I' ? 'Item' : item.itemTypeName === 'C' ? 'PdCat' : 'Cat'}</b></span>
        </div>`;
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
