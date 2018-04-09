import { ExportService } from './../modules/angular-slickgrid/services/export.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Column, DelimiterType, FileType, FilterType, Formatter, Formatters, GridOption } from './../modules/angular-slickgrid';

@Component({
  templateUrl: './grid-localization.component.html'
})
@Injectable()
export class GridLocalizationComponent implements OnInit {
  title = 'Example 12: Localization (i18n)';
  subTitle = `Support multiple locales with the i18next plugin, following these steps (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Localization" target="_blank">Wiki docs</a>)
  <ol class="small">
    <li>You first need to "enableTranslate" in the Grid Options</li>
    <li>In the Column Definitions, you have following options</li>
    <ul>
      <li>To translate a header title, use "headerKey" with a translate key (headerKey: 'TITLE')</li>
      <li>For the cell values, you need to use a Formatter, there's 2 ways of doing it</li>
      <ul>
        <li>formatter: myCustomTranslateFormatter <b>&lt;= "Title" column uses it</b></li>
        <li>formatter: Formatters.translate, params: { i18n: this.translateService } <b>&lt;= "Completed" column uses it</b></li>
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

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  selectedLanguage: string;

  constructor(private exportService: ExportService, private translate: TranslateService) {
    this.selectedLanguage = this.translate.getDefaultLang();
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'id', headerKey: 'TITLE', formatter: this.taskTranslateFormatter, sortable: true, minWidth: 100, filterable: true, params: { useFormatterOuputToFilter: true } },
      { id: 'description', name: 'Description', field: 'description', filterable: true, sortable: true, minWidth: 80 },
      { id: 'duration', name: 'Duration (days)', field: 'duration', headerKey: 'DURATION', sortable: true, minWidth: 100, filterable: true },
      { id: 'start', name: 'Start', field: 'start', headerKey: 'START', formatter: Formatters.dateIso, minWidth: 100, filterable: true },
      { id: 'finish', name: 'Finish', field: 'finish', headerKey: 'FINISH', formatter: Formatters.dateIso, minWidth: 100, filterable: true },
      { id: 'completedBool', name: 'Completed', field: 'completedBool', headerKey: 'COMPLETED', minWidth: 100,
        sortable: true,
        formatter: Formatters.checkmark,
        exportCustomFormatter: Formatters.translateBoolean,
        filterable: true,
        filter: {
          collection: [ { value: '', label: '' }, { value: true, labelKey: 'TRUE' }, { value: false, labelKey: 'FALSE' } ],
          type: FilterType.singleSelect,
          enableTranslateLabel: true,
          filterOptions: {
            autoDropWidth: true
          }
        }
      },
      { id: 'completed', name: 'Completed', field: 'completed', headerKey: 'COMPLETED', formatter: Formatters.translate, sortable: true,
        minWidth: 100,
        exportWithFormatter: true, // you can set this property in the column definition OR in the grid options, column def has priority over grid options
        filterable: true,
        filter: {
          collection: [ { value: '', label: '' }, { value: 'TRUE', labelKey: 'TRUE' }, { value: 'FALSE', labelKey: 'FALSE' } ],
          collectionSortBy: {
            property: 'labelKey' // will sort by translated value since "enableTranslateLabel" is true
          },
          enableTranslateLabel: true,
          type: FilterType.singleSelect,
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
      enableFiltering: true,
      enableTranslate: true,
      exportOptions: {
        // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
        exportWithFormatter: true,
      },
      gridMenu: {
        showExportCsvCommand: true,           // true by default, so it's optional
        showExportTextDelimitedCommand: true  // false by default, so if you want it, you will need to enable it
      },
      params: {
        i18n: this.translate
      }
    };

    this.loadData();
  }

  // mock a dataset
  loadData() {
    this.dataset = [];
    for (let i = 0; i < 1000; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
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

  exportToFile(type = 'csv') {
    this.exportService.exportToFile({
      delimiter: (type === 'csv') ? DelimiterType.comma : DelimiterType.tab,
      filename: 'myExport',
      format: (type === 'csv') ? FileType.csv : FileType.txt
    });
  }

  switchLanguage() {
    this.selectedLanguage = (this.selectedLanguage === 'en') ? 'fr' : 'en';
    this.translate.use(this.selectedLanguage);
  }

  // create a custom translate Formatter
  taskTranslateFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
    return this.translate.instant('TASK_X', { x: value });
  }
}
