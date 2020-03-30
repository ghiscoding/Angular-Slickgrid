import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularGridInstance, Column, GridOption } from './../modules/angular-slickgrid';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './grid-headermenu.component.html',
  styleUrls: ['./grid-headermenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridHeaderMenuComponent implements OnInit {
  title = 'Example 8: Header Menu Plugin';
  subTitle = `
    This example demonstrates using the <b>Slick.Plugins.HeaderMenu</b> plugin to easily add menus to colum headers.<br/>
    These menus can be specified directly in the column definition, and are very easy to configure and use.
    (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Header-Menu-&-Header-Buttons" target="_blank">Wiki docs</a>)
    <ul>
      <li>Now enabled by default in the Global Grid Options, it will add the default commands of (hide column, sort asc/desc)</li>
      <li>Hover over any column header to see an arrow showing up on the right</li>
      <li>Try Sorting (multi-sort) the 2 columns "Duration" and "% Complete" (the other ones are disabled)</li>
      <li>Try hiding any columns (you use the "Column Picker" plugin by doing a right+click on the header to show the column back)</li>
      <li>Note: The "Header Button" & "Header Menu" Plugins cannot be used at the same time</li>
      <li>You can change the menu icon via SASS variables as shown in this demo (check all SASS variables)</li>
      <li>Use override callback functions to change the properties of show/hide, enable/disable the menu or certain item(s) from the list</li>
      <ol>
        <li>These callbacks are: "itemVisibilityOverride", "itemUsabilityOverride"</li>
        <li>for example if we want to disable the "Help" command over the "Title" and "Completed" column</li>
        <li>for example don't show Help on column "% Complete"</li>
      </ol>
    </ul>
  `;

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  selectedLanguage: string;

  constructor(private translate: TranslateService) {
    this.selectedLanguage = this.translate.getDefaultLang();
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', nameKey: 'TITLE' },
      { id: 'duration', name: 'Duration', field: 'duration', nameKey: 'DURATION', sortable: true },
      { id: 'percentComplete', name: '% Complete', field: 'percentComplete', nameKey: 'PERCENT_COMPLETE', sortable: true },
      { id: 'start', name: 'Start', field: 'start', nameKey: 'START' },
      { id: 'finish', name: 'Finish', field: 'finish', nameKey: 'FINISH' },
      { id: 'completed', name: 'Completed', field: 'completed', nameKey: 'COMPLETED' }
    ];

    this.columnDefinitions.forEach((columnDef) => {
      columnDef.header = {
        menu: {
          items: [
            // add Custom Header Menu Item Commands which will be appended to the existing internal custom items
            // you cannot override an internal command but you can hide them and create your own
            // also note that the internal custom commands are in the positionOrder range of 50-60,
            // if you want yours at the bottom then start with 61, below 50 will make your command(s) show on top
            {
              iconCssClass: 'fa fa-question-circle',

              // you can disable a command with certain logic
              // HOWEVER note that if you use "itemUsabilityOverride" has precedence when it is defined
              // disabled: (columnDef.id === 'completed'),

              titleKey: 'HELP', // use "title" as plain string OR "titleKey" when using a translation key
              command: 'help',
              tooltip: 'Need assistance?',
              cssClass: 'bold',     // container css class
              textCssClass: (columnDef.id === 'title' || columnDef.id === 'completed') ? '' : 'blue', // just the text css class
              positionOrder: 99,
              itemUsabilityOverride: (args) => {
                // for example if we want to disable the "Help" command over the "Title" and "Completed" column
                return !(args.column.id === 'title' || args.column.id === 'completed');
              },
              itemVisibilityOverride: (args) => {
                // for example don't show Help on column "% Complete"
                return (args.column.id !== 'percentComplete');
              },
              action: (e, args) => {
                // you can use the "action" callback and/or subscribe to the "onCallback" event, they both have the same arguments
                console.log('execute an action on Help', args);
              }
            },
            // you can also add divider between commands (command is a required property but you can set it to empty string)
            { divider: true, command: '', positionOrder: 98 },

            // you can use "divider" as a string too, but if you do then make sure it's the correct position in the list
            // (since there's no positionOrder when using 'divider')
            // 'divider',
          ]
        }
      };
    });

    this.gridOptions = {
      enableAutoResize: true,
      enableHeaderMenu: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 10
      },
      enableFiltering: false,
      enableCellNavigation: true,
      headerMenu: {
        hideSortCommands: false,
        hideColumnHideCommand: false,
        // you can use the "onCommand" (in Grid Options) and/or the "action" callback (in Column Definition)
        onCommand: (e, args) => {
          if (args.command === 'help') {
            alert('Please help!!!');
          }
        }
      },
      enableTranslate: true,
      i18n: this.translate
    };

    this.getData();
  }

  getData() {
    // Set up some test columns.
    const mockDataset = [];
    for (let i = 0; i < 1000; i++) {
      mockDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 25) + ' days',
        percentComplete: Math.round(Math.random() * 100),
        start: '01/01/2009',
        finish: '01/05/2009',
        completed: (i % 5 === 0)
      };
    }
    this.dataset = mockDataset;
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  switchLanguage() {
    const nextLanguage = (this.selectedLanguage === 'en') ? 'fr' : 'en';
    this.translate.use(nextLanguage).subscribe(() => {
      this.selectedLanguage = nextLanguage;
    });
  }
}
