import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AngularGridInstance, Column, GridOption } from './../modules/angular-slickgrid';

// create a custom Formatter to highlight negative values in red
let columns1WithHighlightingById: any = {};
let columns2WithHighlightingById: any = {};

@Component({
  styleUrls: ['./grid-headerbutton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './grid-headerbutton.component.html',
})
export class GridHeaderButtonComponent implements OnInit {
  title = 'Example 7: Header Button Plugin';
  subTitle = `
    This example demonstrates using the <b>Slick.Plugins.HeaderButtons</b> plugin to easily add buttons to colum headers.
    These buttons can be specified directly in the column definition, and are very easy to configure and use.
    (<a href="https://ghiscoding.gitbook.io/angular-slickgrid/grid-functionalities/header-menu-and-header-buttons" target="_blank">Wiki docs</a>)
    <ul>
      <li>Resize the 1st column to see all icon/command</li>
      <li>Mouse hover the 2nd column to see it's icon/command</li>
      <li>For all the other columns, click on top-right red circle icon to enable highlight of negative numbers.</li>
      <li>Use override callback functions to change the properties of show/hide, enable/disable the menu or certain item(s) from the list</li>
      <ol>
        <li>These callbacks are: "itemVisibilityOverride", "itemUsabilityOverride"</li>
        <li>for example the "Column E" does not show the header button via "itemVisibilityOverride"</li>
        <li>for example the "Column J" header button is displayed but it not usable via "itemUsabilityOverride"</li>
      </ol>
    </ul>
  `;

  columnDefinitions1: Column[] = [];
  columnDefinitions2: Column[] = [];
  gridOptions1!: GridOption;
  gridOptions2!: GridOption;
  dataset1: any[] = [];
  dataset2: any[] = [];
  angularGrid1!: AngularGridInstance;
  angularGrid2!: AngularGridInstance;
  hideSubTitle = false;

  constructor() {
    columns1WithHighlightingById = {};
    columns2WithHighlightingById = {};
  }

  ngOnInit(): void {
    this.defineGrid();

    // populate the dataset once the grid is ready
    this.dataset1 = this.loadData(200, 1);
    this.dataset2 = this.loadData(200, 2);
  }

  angularGrid1Ready(angularGrid: AngularGridInstance) {
    this.angularGrid1 = angularGrid;
  }

  angularGrid2Ready(angularGrid: AngularGridInstance) {
    this.angularGrid2 = angularGrid;
  }

  defineGrid() {
    this.gridOptions1 = {
      enableAutoResize: true,
      enableHeaderButton: true,
      enableHeaderMenu: false,
      autoResize: {
        container: '#demo-container',
        rightPadding: 10,
      },
      enableFiltering: false,
      enableExcelCopyBuffer: true,
      excelCopyBufferOptions: {
        onCopyCells: (e, args) => console.log('onCopyCells', e, args),
        onPasteCells: (e, args) => console.log('onPasteCells', e, args),
        onCopyCancelled: (e, args) => console.log('onCopyCancelled', e, args),
      },
      enableCellNavigation: true,
      gridHeight: 275,
      headerButton: {
        // you can use the "onCommand" (in Grid Options) and/or the "action" callback (in Column Definition)
        onCommand: (_e, args) => this.handleOnCommand(_e, args, 1),
      },
    };

    // grid 2 options, same as grid 1 + extras
    this.gridOptions2 = {
      ...this.gridOptions1,
      enableHeaderMenu: true,
      enableFiltering: true,
      // frozenColumn: 2,
      // frozenRow: 2,
      headerButton: {
        // when floating to left, you might want to inverse the icon orders
        onCommand: (_e, args) => this.handleOnCommand(_e, args, 2),
      },
    };
  }

  handleOnCommand(_e: any, args: any, gridNo: 1 | 2) {
    const column = args.column;
    const button = args.button;
    const command = args.command;

    if (command === 'toggle-highlight') {
      if (button.cssClass === 'mdi mdi-lightbulb-on text-danger') {
        if (gridNo === 1) {
          delete columns1WithHighlightingById[column.id];
        } else {
          delete columns2WithHighlightingById[column.id];
        }
        button.cssClass = 'mdi mdi-lightbulb-outline text-warning faded';
        button.tooltip = 'Highlight negative numbers.';
      } else {
        if (gridNo === 1) {
          columns1WithHighlightingById[column.id] = true;
        } else {
          columns2WithHighlightingById[column.id] = true;
        }
        button.cssClass = 'mdi mdi-lightbulb-on text-danger';
        button.tooltip = 'Remove highlight.';
      }
      ((this as any)[`angularGrid${gridNo}`] as AngularGridInstance).slickGrid.invalidate();
    }
  }

  loadData(count: number, gridNo: 1 | 2) {
    // Set up some test columns.
    for (let i = 0; i < 10; i++) {
      (this as any)[`columnDefinitions${gridNo}`].push({
        id: i,
        name: 'Column ' + String.fromCharCode('A'.charCodeAt(0) + i),
        field: i + '',
        width: i === 0 ? 70 : 100, // have the 2 first columns wider
        filterable: true,
        sortable: true,
        formatter: (_row: number, _cell: number, value: any, columnDef: Column) => {
          if (gridNo === 1 && columns1WithHighlightingById[columnDef.id] && value < 0) {
            return `<div style="color:red; font-weight:bold;">${value}</div>`;
          } else if (gridNo === 2 && columns2WithHighlightingById[columnDef.id] && value < 0) {
            return `<div style="color:red; font-weight:bold;">${value}</div>`;
          }
          return value;
        },
        header: {
          buttons: [
            {
              cssClass: 'mdi mdi-lightbulb-outline text-warning faded',
              command: 'toggle-highlight',
              tooltip: 'Highlight negative numbers.',
              itemVisibilityOverride: (args: any) => {
                // for example don't show the header button on column "E"
                return args.column.name !== 'Column E';
              },
              itemUsabilityOverride: (args: any) => {
                // for example the button usable everywhere except on last column ='J"
                return args.column.name !== 'Column J';
              },
              action: (_e: Event, args: any) => {
                // you can use the "action" callback and/or subscribe to the "onCallback" event, they both have the same arguments
                // do something
                console.log(`execute a callback action to "${args.command}" on ${args.column.name}`);
              },
            },
          ],
        },
      });
    }

    // Set multiple buttons on the first column to demonstrate overflow.
    (this as any)[`columnDefinitions${gridNo}`][0].name = 'Resize me!';
    (this as any)[`columnDefinitions${gridNo}`][0].header = {
      buttons: [
        {
          cssClass: 'mdi mdi-message-text',
          handler: () => {
            alert('Tag');
          },
        },
        {
          cssClass: 'mdi mdi-forum-outline',
          handler: () => {
            alert('Comment');
          },
        },
        {
          cssClass: 'mdi mdi-information',
          handler: () => {
            alert('Info');
          },
        },
        {
          cssClass: 'mdi mdi-help-circle',
          handler: () => {
            alert('Help');
          },
        },
      ],
    };

    // when floating to left, you might want to inverse the icon orders
    if (gridNo === 2) {
      this.columnDefinitions2[0].header?.buttons?.reverse();
    }

    // Set a button on the second column to demonstrate hover.
    (this as any)[`columnDefinitions${gridNo}`][1].name = 'Hover me!';
    (this as any)[`columnDefinitions${gridNo}`][1].header = {
      buttons: [
        {
          cssClass: 'mdi mdi-help-circle',
          showOnHover: true,
          tooltip: 'This button only appears on hover.',
          handler: () => {
            alert('Help');
          },
        },
      ],
    };

    // mock a dataset
    const mockDataset = [];
    for (let i = 0; i < count; i++) {
      const d: any = (mockDataset[i] = {});
      d['id'] = i;
      for (let j = 0; j < (this as any)[`columnDefinitions${gridNo}`].length; j++) {
        d[j] = Math.round(Math.random() * 10) - 5;
      }
    }
    return mockDataset;
  }
}
