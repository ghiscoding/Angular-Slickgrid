import { Component, OnInit, Injectable } from '@angular/core';
import { AngularGridInstance, Column, FieldType, Filters, Formatters, GridOption } from './../modules/angular-slickgrid';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './grid-menu.component.html'
})
@Injectable()
export class GridMenuComponent implements OnInit {
  title = 'Example 9: Grid Menu Control';
  subTitle = `
    This example demonstrates using the <b>Slick.Controls.GridMenu</b> plugin to easily add a Grid Menu (aka hamburger menu) on the top right corner of the grid.
    (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-Menu" target="_blank">Wiki docs</a>)
    <br/>
    <ul>
      <li>The Grid Menu uses the following icon by default "fa-bars"&nbsp;&nbsp;<span class="fa fa-bars"></span>&nbsp;&nbsp;(which looks like a hamburger, hence the name)</li>
      <ul><li>Another icon which you could use is "fa-ellipsis-v"&nbsp;&nbsp;<span class="fa fa-ellipsis-v"></span>&nbsp;&nbsp;(which is shown in this example)</li></ul>
      <li>By default the Grid Menu shows all columns which you can show/hide</li>
      <li>You can configure multiple "commands" to show up in the Grid Menu and use the "onGridMenuCommand()" callback</li>
      <li>Doing a "right+click" over any column header will also provide a way to show/hide a column (via the Column Picker Plugin)</li>
    </ul>
  `;

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  selectedLanguage: string;
  visibleColumns: Column[];

  constructor(private translate: TranslateService) {
    this.selectedLanguage = this.translate.getDefaultLang();
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', headerKey: 'TITLE', filterable: true, type: FieldType.string },
      { id: 'duration', name: 'Duration', field: 'duration', headerKey: 'DURATION', sortable: true, filterable: true, type: FieldType.string },
      {
        id: '%', name: '% Complete', field: 'percentComplete', sortable: true, filterable: true,
        type: FieldType.number,
        formatter: Formatters.percentCompleteBar,
        filter: { model: Filters.compoundSlider, params: { hideSliderNumber: false } }
      },
      { id: 'start', name: 'Start', field: 'start', headerKey: 'START', filterable: true, type: FieldType.string },
      { id: 'finish', name: 'Finish', field: 'finish', headerKey: 'FINISH', filterable: true, type: FieldType.string },
      {
        id: 'effort-driven', name: 'Completed', field: 'effortDriven', headerKey: 'COMPLETED', maxWidth: 80, formatter: Formatters.checkmark,
        type: FieldType.boolean,
        minWidth: 100,
        sortable: true,
        filterable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: true, label: 'true' }, { value: false, label: 'false' }],
          model: Filters.singleSelect,
          filterOptions: {
            // you can add "multiple-select" plugin options like styling the first row
            offsetLeft: 14,
            width: 100
          },
        }
      }
    ];

    this.visibleColumns = this.columnDefinitions;

    this.gridOptions = {
      columnPicker: {
        hideForceFitButton: true,
        hideSyncResizeButton: true,
        onColumnsChanged: (e, args) => {
          console.log('Column selection changed from Column Picker, visible columns: ', args.columns);
        }
      },
      enableAutoResize: true,
      enableGridMenu: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableFiltering: true,
      enableCellNavigation: true,
      gridMenu: {
        // all titles optionally support translation keys, if you wish to use that feature then use the title properties finishing by 'Key'
        // example "customTitle" for a plain string OR "customTitleKey" to use a translation key
        customTitleKey: 'CUSTOM_COMMANDS',
        iconCssClass: 'fa fa-ellipsis-v',
        hideForceFitButton: true,
        hideSyncResizeButton: true,
        hideToggleFilterCommand: false, // show/hide internal custom commands
        menuWidth: 17,
        resizeOnShowHeaderRow: true,
        customItems: [
          // add Custom Items Commands at the bottom of the already existing internal custom items
          // you cannot override an internal items but you can hide them and create your own
          // also note that the internal custom commands are in the positionOrder range of 50-60,
          // if you want yours at the bottom then start with 61, below 50 will make your command(s) on top
          {
            iconCssClass: 'fa fa-question-circle',
            titleKey: 'HELP',
            disabled: false,
            command: 'help',
            positionOrder: 99
          },
          {
            title: 'Disabled command',
            disabled: true,
            command: 'disabled-command',
            positionOrder: 98
          }
        ],
        onCommand: (e, args) => {
          if (args.command === 'help') {
            alert('Please help!!!');
          }
        },
        onColumnsChanged: (e, args) => {
          console.log('Column selection changed from Grid Menu, visible columns: ', args.columns);
        }
      },
      enableTranslate: true,
      i18n: this.translate
    };

    this.getData();
  }

  angularGridReady(angularGrid: any) {
    this.angularGrid = angularGrid;
  }

  getData() {
    // Set up some test columns.
    const mockDataset = [];
    for (let i = 0; i < 500; i++) {
      mockDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 25) + ' days',
        percentComplete: Math.round(Math.random() * 100),
        start: '01/01/2009',
        finish: '01/05/2009',
        effortDriven: (i % 5 === 0)
      };
    }
    this.dataset = mockDataset;
  }

  switchLanguage() {
    this.selectedLanguage = (this.selectedLanguage === 'en') ? 'fr' : 'en';
    this.translate.use(this.selectedLanguage);
  }
}
