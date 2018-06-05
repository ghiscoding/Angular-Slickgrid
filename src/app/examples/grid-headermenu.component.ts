import { Component, OnInit, Injectable } from '@angular/core';
import { AngularGridInstance, Column, ColumnSort, GridOption } from './../modules/angular-slickgrid';

@Component({
  templateUrl: './grid-headermenu.component.html'
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
    </ul>
  `;

  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  gridObj: any;
  dataviewObj: any;

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title' },
      { id: 'duration', name: 'Duration', field: 'duration', sortable: true },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true },
      { id: 'start', name: 'Start', field: 'start' },
      { id: 'finish', name: 'Finish', field: 'finish' },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven' }
    ];

    this.columnDefinitions.forEach((columnDef) => {
      columnDef.header = {
        menu: {
          items: [
            // add Custom Header Menu Item Commands at the bottom of the already existing internal custom items
            // you cannot override an internal command but you can hide them and create your own
            // also note that the internal custom commands are in the positionOrder range of 50-60,
            // if you want yours at the bottom then start with 61, below 50 will make your command(s) on top
            {
              iconCssClass: 'fa fa-question-circle',
              disabled: (columnDef.id === 'effort-driven'), // you can disable a command with certain logic
              title: 'Help',
              command: 'help',
              positionOrder: 99
            }
          ]
        }
      };
    });

    this.gridOptions = {
      enableAutoResize: true,
      enableHeaderMenu: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableFiltering: false,
      enableCellNavigation: true,
      headerMenu: {
        hideSortCommands: false,
        hideColumnHideCommand: false,
        onCommand: (e, args) => {
          if (args.command === 'help') {
            alert('Please help!!!');
          }
        }
      }
    };

    this.getData();
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

  angularGridReady(angularGrid: any) {
    this.angularGrid = angularGrid;
  }

  gridReady(grid) {
    this.gridObj = grid;
  }
  dataviewReady(dataview) {
    this.dataviewObj = dataview;
  }
}
