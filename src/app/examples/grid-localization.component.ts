import { Component, OnInit, Injectable } from '@angular/core';
import { Column, Editors, FieldType, FilterType, Formatter, Formatters, GridExtraService, GridExtraUtils, GridOption, OnEventArgs, ResizerService } from './../modules/angular-slickgrid';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './grid-localization.component.html'
})
@Injectable()
export class GridLocalizationComponent implements OnInit {
  title = 'Example 12: Localization (i18n)';
  subTitle = `Support multiple locales with the i18next plugin, following these steps (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Localization" target="_blank">Wiki link</a>)
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
    </ol>
  `;

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  selectedLanguage: string;

  constructor(private gridExtraService: GridExtraService, private translate: TranslateService) {
    this.selectedLanguage = this.translate.getDefaultLang();
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'id', headerKey: 'TITLE', formatter: this.taskTranslateFormatter, sortable: true, minWidth: 100, filterable: true, params: { useFormatterOuputToFilter: true } },
      { id: 'duration', name: 'Duration (days)', field: 'duration', headerKey: 'DURATION', sortable: true, minWidth: 100, filterable: true },
      { id: 'start', name: 'Start', field: 'start', headerKey: 'START', formatter: Formatters.dateIso, minWidth: 100, filterable: true },
      { id: 'finish', name: 'Finish', field: 'finish', headerKey: 'FINISH', formatter: Formatters.dateIso, minWidth: 100, filterable: true },
      { id: 'completed', name: 'Completed', field: 'completed', headerKey: 'COMPLETED', formatter: Formatters.translate, params: { i18n: this.translate }, sortable: true,
        minWidth: 100,
        filterable: true,
        filter: {
          collection: [ { value: '', label: '' }, { value: 'TRUE', labelKey: 'TRUE' }, { value: 'FALSE', labelKey: 'FALSE' } ],
          type: FilterType.singleSelect,
          filterOptions: {
            width: 150
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
      enableTranslate: true
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
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: i,
        duration: Math.round(Math.random() * 100) + '',
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        completed: (i % 5 === 0) ? 'TRUE' : 'FALSE'
      };
    }
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
