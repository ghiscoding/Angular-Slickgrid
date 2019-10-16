import { Component, OnInit, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AngularGridInstance,
  Column,
  DelimiterType,
  FieldType,
  FileType,
  Filters,
  Formatter,
  Formatters,
  GridOption
} from './../modules/angular-slickgrid';

// create a custom translate Formatter (typically you would move that a separate file, for separation of concerns)
const taskTranslateFormatter: Formatter = (row: number, cell: number, value: any, columnDef: any, dataContext: any, grid: any) => {
  const gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
  const translate = gridOptions.i18n;

  return translate.instant('TASK_X', { x: value });
};

@Component({
  templateUrl: './grid-localization.component.html'
})
@Injectable()
export class GridLocalizationComponent implements OnInit {
  title = 'Example 12: Localization (i18n)';
  subTitle = `Support multiple locales with the ngx-translate plugin, following these steps (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Localization" target="_blank">Wiki docs</a>)
  <ol class="small">
    <li>You first need to "enableTranslate" in the Grid Options</li>
    <li>In the Column Definitions, you have following options</li>
    <ul>
      <li>To translate a header title, use "headerKey" with a translate key (headerKey: 'TITLE')</li>
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
        <li>More info on the Select Filter <a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Select-Filter" target="_blank">Wiki page</a>
      </ul>
    <li>For more info about "Download to File", read the <a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Export-to-File" target="_blank">Wiki page</a></li>
    </ol>
  `;

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  selectedLanguage: string;
  duplicateTitleHeaderCount = 1;

  constructor(private translate: TranslateService) {
    this.selectedLanguage = this.translate.getDefaultLang();
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      {
        id: 'title', name: 'Title', field: 'id', headerKey: 'TITLE', minWidth: 100,
        formatter: taskTranslateFormatter,
        sortable: true,
        filterable: true,
        params: { useFormatterOuputToFilter: true }
      },
      { id: 'description', name: 'Description', field: 'description', filterable: true, sortable: true, minWidth: 80 },
      {
        id: 'duration', name: 'Duration (days)', field: 'duration', headerKey: 'DURATION', sortable: true,
        formatter: Formatters.percentCompleteBar, minWidth: 100,
        exportWithFormatter: false,
        filterable: true,
        type: FieldType.number,
        filter: { model: Filters.slider, /* operator: '>=',*/ params: { hideSliderNumber: true } }
      },
      {
        id: 'start', name: 'Start', field: 'start', headerKey: 'START', minWidth: 100,
        formatter: Formatters.dateIso, outputType: FieldType.dateIso, type: FieldType.date, exportWithFormatter: true,
        filterable: true, filter: { model: Filters.compoundDate }
      },
      { id: 'finish', name: 'Finish', field: 'finish', headerKey: 'FINISH', formatter: Formatters.dateIso, outputType: FieldType.dateIso, type: FieldType.date, minWidth: 100, filterable: true, filter: { model: Filters.compoundDate } },
      {
        id: 'completedBool', name: 'Completed', field: 'completedBool', headerKey: 'COMPLETED', minWidth: 100,
        sortable: true,
        formatter: Formatters.checkmark,
        exportCustomFormatter: Formatters.translateBoolean,
        filterable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: true, labelKey: 'TRUE' }, { value: false, labelKey: 'FALSE' }],
          model: Filters.singleSelect,
          enableTranslateLabel: true,
          filterOptions: {
            autoDropWidth: true
          }
        }
      },
      {
        id: 'completed', name: 'Completed', field: 'completed', headerKey: 'COMPLETED', formatter: Formatters.translate, sortable: true,
        minWidth: 100,
        exportWithFormatter: true, // you can set this property in the column definition OR in the grid options, column def has priority over grid options
        filterable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: 'TRUE', labelKey: 'TRUE' }, { value: 'FALSE', labelKey: 'FALSE' }],
          collectionSortBy: {
            property: 'labelKey' // will sort by translated value since "enableTranslateLabel" is true
          },
          enableTranslateLabel: true,
          model: Filters.singleSelect,
          filterOptions: {
            autoDropWidth: true
          }
        }
      }
      // OR via your own custom translate formatter
      // { id: 'completed', name: 'Completed', field: 'completed', headerKey: 'COMPLETED', formatter: translateFormatter, sortable: true, minWidth: 100 }
    ];
    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableAutoResize: true,
      enableExcelCopyBuffer: true,
      enableExcelExport: true,
      enableExport: true,
      enableFiltering: true,
      enableTranslate: true,
      i18n: this.translate,
      excelExportOptions: {
        // optionally pass a custom header to the Excel Sheet
        // a lot of the info can be found on Web Archive of Excel-Builder
        // http://web.archive.org/web/20160907052007/http://excelbuilderjs.com/cookbook/fontsAndColors.html
        customExcelHeader: (workbook, sheet) => {
          const customTitle = this.translate.currentLang === 'fr' ? 'Titre qui est suffisament long pour être coupé' : 'My header that is long enough to wrap';
          const stylesheet = workbook.getStyleSheet();
          const aFormatDefn = {
            'font': { 'size': 12, 'fontName': 'Calibri', 'bold': true, color: 'FF0000FF' }, // every color starts with FF, then regular HTML color
            'alignment': { 'wrapText': true }
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
        }
      },
      exportOptions: {
        // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
        exportWithFormatter: true,
        sanitizeDataExport: true
      },
      gridMenu: {
        hideExportCsvCommand: false,           // false by default, so it's optional
        hideExportTextDelimitedCommand: false  // true by default, so if you want it, you will need to disable the flag
      }
    };

    this.loadData(1000);
  }

  // mock a dataset
  loadData(count: number) {
    this.dataset = [];
    for (let i = 0; i < count; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 30);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));

      this.dataset[i] = {
        id: i,
        description: (i % 5) ? 'desc ' + i : '🚀🦄 español', // also add some random to test NULL field
        duration: Math.round(Math.random() * 100) + '',
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        completedBool: (i % 5 === 0) ? true : false,
        completed: (i % 5 === 0) ? 'TRUE' : 'FALSE'
      };
    }
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  dynamicallyAddTitleHeader() {
    const newCol = { id: `title${this.duplicateTitleHeaderCount++}`, field: 'id', headerKey: 'TITLE', formatter: taskTranslateFormatter, sortable: true, minWidth: 100, filterable: true, params: { useFormatterOuputToFilter: true } };
    this.columnDefinitions.push(newCol);
    this.columnDefinitions = this.columnDefinitions.slice();
  }

  exportToExcel() {
    this.angularGrid.excelExportService.exportToExcel({
      filename: 'Export',
      format: FileType.xlsx
    });
  }

  exportToFile(type = 'csv') {
    this.angularGrid.exportService.exportToFile({
      delimiter: (type === 'csv') ? DelimiterType.comma : DelimiterType.tab,
      filename: 'myExport',
      format: (type === 'csv') ? FileType.csv : FileType.txt
    });
  }

  switchLanguage() {
    this.selectedLanguage = (this.selectedLanguage === 'en') ? 'fr' : 'en';
    this.translate.use(this.selectedLanguage);
  }
}
