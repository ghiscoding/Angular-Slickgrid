import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import { TextExportService } from '@slickgrid-universal/text-export';
import { Subscription } from 'rxjs';

import {
  AngularGridInstance,
  Column,
  DelimiterType,
  FieldType,
  FileType,
  Filters,
  Formatter,
  Formatters,
  GridOption,
  GridStateChange,
  unsubscribeAllObservables,
} from './../modules/angular-slickgrid';

const NB_ITEMS = 1500;

// create a custom translate Formatter (typically you would move that a separate file, for separation of concerns)
const taskTranslateFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  const gridOptions = grid.getOptions() as GridOption;
  const translate = gridOptions.i18n as TranslateService;

  return translate.instant('TASK_X', { x: value });
};

@Component({
  templateUrl: './grid-localization.component.html',
})
export class GridLocalizationComponent implements OnInit, OnDestroy {
  title = 'Example 12: Localization (i18n)';
  subTitle = `Support multiple locales with the ngx-translate plugin, following these steps (<a href="https://ghiscoding.gitbook.io/angular-slickgrid/localization/localization-with-ngx-translate" target="_blank">Wiki docs</a>)
  <ol class="small">
    <li>You first need to "enableTranslate" in the Grid Options</li>
    <li>In the Column Definitions, you have following options</li>
    <ul>
      <li>To translate a header title, use "nameKey" with a translate key (nameKey: 'TITLE')</li>
      <li>For the cell values, you need to use a Formatter, there's 2 ways of doing it</li>
      <ul>
        <li>formatter: myCustomTranslateFormatter <b>&lt;= "Title" column uses it</b></li>
        <li>formatter: Formatters.translate, i18n: this.translateService <b>&lt;= "Completed" column uses it</b></li>
      </ul>
    </ul>
    <li>For date localization, you need to create your own custom formatter. </li>
    <ul>
      <li>You can easily implement logic to switch between Formatters "dateIso" or "dateUs", depending on current locale.</li>
    </ul>
    <li>For the Select (dropdown) filter, you can fill in the "labelKey" property, if found it will use it, else it will use "label"</li>
      <ul>
        <li>What if your select options have totally different value/label pair? In this case, you can use the <b>customStructure: { label: 'customLabel', value: 'customValue'}</b> to change the property name(s) to use.'</li>
        <li>What if you want to use "customStructure" and translation? Simply pass this flag <b>enableTranslateLabel: true</b></li>
        <li>More info on the Select Filter <a href="https://ghiscoding.gitbook.io/angular-slickgrid/column-functionalities/filters/select-filter" target="_blank">Wiki page</a></li>
      </ul>
    <li>For more info about "Download to File", read the <a href="https://ghiscoding.gitbook.io/angular-slickgrid/grid-functionalities/export-to-text-file" target="_blank">Wiki page</a></li>
    </ol>
  `;

  private subscriptions: Subscription[] = [];
  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  gridOptions!: GridOption;
  dataset!: any[];
  hideSubTitle = false;
  selectedLanguage: string;
  duplicateTitleHeaderCount = 1;
  gridObj: any;
  excelExportService = new ExcelExportService();
  textExportService = new TextExportService();

  constructor(private translate: TranslateService) {
    // always start with English for Cypress E2E tests to be consistent
    const defaultLang = 'en';
    this.translate.use(defaultLang);
    this.selectedLanguage = defaultLang;
  }

  ngOnDestroy() {
    // also unsubscribe all Angular Subscriptions
    unsubscribeAllObservables(this.subscriptions);
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      {
        id: 'title',
        name: 'Title',
        field: 'id',
        nameKey: 'TITLE',
        minWidth: 100,
        formatter: taskTranslateFormatter,
        sortable: true,
        filterable: true,
        params: { useFormatterOuputToFilter: true },
      },
      { id: 'description', name: 'Description', field: 'description', filterable: true, sortable: true, minWidth: 80 },
      {
        id: 'duration',
        name: 'Duration (days)',
        field: 'duration',
        nameKey: 'DURATION',
        sortable: true,
        formatter: Formatters.percentCompleteBar,
        minWidth: 100,
        exportWithFormatter: false,
        filterable: true,
        type: FieldType.number,
        filter: { model: Filters.slider, /* operator: '=',*/ filterOptions: { hideSliderNumber: true } },
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        nameKey: 'START',
        minWidth: 100,
        formatter: Formatters.dateIso,
        outputType: FieldType.dateIso,
        type: FieldType.date,
        exportWithFormatter: true,
        filterable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        nameKey: 'FINISH',
        formatter: Formatters.dateIso,
        outputType: FieldType.dateIso,
        type: FieldType.date,
        minWidth: 100,
        filterable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'completedBool',
        name: 'Completed',
        field: 'completedBool',
        nameKey: 'COMPLETED',
        minWidth: 100,
        sortable: true,
        formatter: Formatters.checkmarkMaterial,
        exportCustomFormatter: Formatters.translateBoolean,
        filterable: true,
        filter: {
          collection: [
            { value: '', label: '' },
            { value: true, labelKey: 'TRUE' },
            { value: false, labelKey: 'FALSE' },
          ],
          model: Filters.singleSelect,
          enableTranslateLabel: true,
        },
      },
      {
        id: 'completed',
        name: 'Completed',
        field: 'completed',
        nameKey: 'COMPLETED',
        formatter: Formatters.translate,
        sortable: true,
        minWidth: 100,
        exportWithFormatter: true, // you can set this property in the column definition OR in the grid options, column def has priority over grid options
        filterable: true,
        filter: {
          collection: [
            { value: '', label: '' },
            { value: 'TRUE', labelKey: 'TRUE' },
            { value: 'FALSE', labelKey: 'FALSE' },
          ],
          collectionSortBy: {
            property: 'labelKey', // will sort by translated value since "enableTranslateLabel" is true
          },
          enableTranslateLabel: true,
          model: Filters.singleSelect,
        },
      },
      // OR via your own custom translate formatter
      // { id: 'completed', name: 'Completed', field: 'completed', nameKey: 'COMPLETED', formatter: translateFormatter, sortable: true, minWidth: 100 }
    ];
    this.gridOptions = {
      autoResize: {
        container: '#demo-container',
        rightPadding: 10,
      },
      enableAutoResize: true,
      enableExcelCopyBuffer: true,
      enableFiltering: true,
      enableTranslate: true,
      i18n: this.translate,
      checkboxSelector: {
        // you can toggle these 2 properties to show the "select all" checkbox in different location
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true,
      },
      enableCheckboxSelector: true,
      enableRowSelection: true,
      showCustomFooter: true, // display some metrics in the bottom custom footer
      customFooterOptions: {
        metricTexts: {
          // default text displayed in the metrics section on the right
          // all texts optionally support translation keys,
          // if you wish to use that feature then use the text properties with the 'Key' suffix (e.g: itemsKey, ofKey, lastUpdateKey)
          // example "items" for a plain string OR "itemsKey" to use a translation key
          itemsKey: 'ITEMS',
          ofKey: 'OF',
          lastUpdateKey: 'LAST_UPDATE',
        },
        dateFormat: 'YYYY-MM-DD, hh:mm a',
        hideTotalItemCount: false,
        hideLastUpdateTimestamp: false,
      },
      excelExportOptions: {
        // optionally pass a custom header to the Excel Sheet
        // a lot of the info can be found on Excel-Builder-Vanilla
        // https://ghiscoding.gitbook.io/excel-builder-vanilla/cookbook/fonts-and-colors
        customExcelHeader: (workbook, sheet) => {
          const customTitle =
            this.translate.currentLang === 'fr'
              ? 'Titre qui est suffisament long pour être coupé'
              : 'My header that is long enough to wrap';
          const stylesheet = workbook.getStyleSheet();
          const aFormatDefn = {
            font: { size: 12, fontName: 'Calibri', bold: true, color: 'FF0000FF' }, // every color starts with FF, then regular HTML color
            alignment: { wrapText: true },
          };
          const formatterId = stylesheet.createFormat(aFormatDefn);
          sheet.setRowInstructions(0, { height: 30 }); // change height of row 0

          // excel cells start with A1 which is upper left corner
          sheet.mergeCells('B1', 'D1');
          const cols = [];
          // push empty data on A1
          cols.push({ value: '' });
          // push data in B1 cell with metadata formatter
          cols.push({ value: customTitle, metadata: { style: formatterId.id } });
          sheet.data.push(cols);
        },
      },
      gridMenu: {
        hideExportCsvCommand: false, // false by default, so it's optional
        hideExportTextDelimitedCommand: false, // true by default, so if you want it, you will need to disable the flag
      },
      enableExcelExport: true,
      enableTextExport: true,
      textExportOptions: {
        // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
        exportWithFormatter: true,
        sanitizeDataExport: true,
      },
      externalResources: [this.excelExportService, this.textExportService],
    };

    this.loadData(NB_ITEMS);
  }

  // mock a dataset
  loadData(count: number) {
    const tmpData = [];
    for (let i = 0; i < count; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 30);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 29);

      tmpData[i] = {
        id: i,
        description: i % 5 ? 'desc ' + i : '🚀🦄 español', // also add some random to test NULL field
        duration: Math.round(Math.random() * 100) + '',
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, randomMonth + 1, randomDay),
        completedBool: i % 5 === 0 ? true : false,
        completed: i % 5 === 0 ? 'TRUE' : 'FALSE',
      };
    }
    this.dataset = tmpData;
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
  }

  dynamicallyAddTitleHeader() {
    // you can dynamically add your column to your column definitions
    // and then use the spread operator [...cols] OR slice to force Angular to review the changes
    const newCol = {
      id: `title${this.duplicateTitleHeaderCount++}`,
      field: 'id',
      nameKey: 'TITLE',
      formatter: taskTranslateFormatter,
      sortable: true,
      minWidth: 100,
      filterable: true,
      params: { useFormatterOuputToFilter: true },
    };
    this.columnDefinitions.push(newCol);
    this.columnDefinitions = this.columnDefinitions.slice(); // or use spread operator [...cols]

    // NOTE if you use an Extensions (Checkbox Selector, Row Detail, ...) that modifies the column definitions in any way
    // you MUST use "getAllColumnDefinitions()" from the GridService, using this will be ALL columns including the 1st column that is created internally
    // for example if you use the Checkbox Selector (row selection), you MUST use the code below
    /*
    const allColumns = this.angularGrid.gridService.getAllColumnDefinitions();
    allColumns.push(newCol);
    this.columnDefinitions = [...allColumns]; // (or use slice) reassign to column definitions for Angular to do dirty checking
    */
  }

  exportToExcel() {
    this.excelExportService.exportToExcel({
      filename: 'Export',
      format: FileType.xlsx,
    });
  }

  exportToFile(type = 'csv') {
    this.textExportService.exportToFile({
      delimiter: type === 'csv' ? DelimiterType.comma : DelimiterType.tab,
      filename: 'myExport',
      format: type === 'csv' ? FileType.csv : FileType.txt,
    });
  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridStateChanges: GridStateChange) {
    console.log('Grid State changed:: ', gridStateChanges);
    console.log('Grid State changed:: ', gridStateChanges.change);
  }

  switchLanguage() {
    const nextLanguage = this.selectedLanguage === 'en' ? 'fr' : 'en';
    this.subscriptions.push(
      this.translate.use(nextLanguage).subscribe(() => {
        this.selectedLanguage = nextLanguage;
      })
    );
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
