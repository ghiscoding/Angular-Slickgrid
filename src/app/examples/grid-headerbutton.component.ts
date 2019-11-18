import { Component, OnInit, OnDestroy } from '@angular/core';
import { Column, GridOption } from './../modules/angular-slickgrid';

// create a custom Formatter to highlight negative values in red
let columnsWithHighlightingById = {};
const highlightingFormatter = (row, cell, value, columnDef, dataContext) => {
  if (columnsWithHighlightingById && columnsWithHighlightingById[columnDef.id] && value < 0) {
    return `<div style="color:red; font-weight:bold;">${value}</div>`;
  } else {
    return value;
  }
};

@Component({
  templateUrl: './grid-headerbutton.component.html'
})
export class GridHeaderButtonComponent implements OnInit, OnDestroy {
  title = 'Example 7: Header Button Plugin';
  subTitle = `
    This example demonstrates using the <b>Slick.Plugins.HeaderButtons</b> plugin to easily add buttons to colum headers.
    These buttons can be specified directly in the column definition, and are very easy to configure and use.
    (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Header-Menu-&-Header-Buttons" target="_blank">Wiki docs</a>)
    <ul>
      <li>Resize the 1st column to see all icon/command</li>
      <li>Mouse hover the 2nd column to see it's icon/command</li>
      <li>For all the other columns, click on top-right red circle icon to enable highlight of negative numbers.</li>
      <li>Note: The "Header Button" & "Header Menu" Plugins cannot be used at the same time</li>
    </ul>
  `;

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  gridObj: any;
  dataviewObj: any;
  visibleColumns: Column[];

  ngOnInit(): void {
    this.columnDefinitions = [];
    this.gridOptions = {
      enableAutoResize: true,
      enableHeaderButton: true,
      enableHeaderMenu: false,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableFiltering: false,
      enableCellNavigation: true,
      headerButton: {
        onCommand: (e, args) => {
          const column = args.column;
          const button = args.button;
          const command = args.command;
          if (!columnsWithHighlightingById) {
            columnsWithHighlightingById = {};
          }

          if (command === 'toggle-highlight') {
            if (button.cssClass === 'fa fa-circle red') {
              delete columnsWithHighlightingById[column.id];
              button.cssClass = 'fa fa-circle-o red faded';
              button.tooltip = 'Highlight negative numbers.';
            } else {
              columnsWithHighlightingById[column.id] = true;
              button.cssClass = 'fa fa-circle red';
              button.tooltip = 'Remove highlight.';
            }

            this.gridObj.invalidate();
          }
        }
      }
    };

    this.getData();
  }

  ngOnDestroy() {
    columnsWithHighlightingById = null;
  }

  getData() {
    // Set up some test columns.
    for (let i = 0; i < 9; i++) {
      this.columnDefinitions.push({
        id: i,
        name: 'Column' + (i + 1),
        field: i + '',
        width: 100, // have the 2 first columns wider
        sortable: true,
        formatter: highlightingFormatter,
        header: {
          buttons: [
            {
              cssClass: 'fa fa-circle-o red faded',
              command: 'toggle-highlight',
              tooltip: 'Highlight negative numbers.'
            }
          ]
        }
      });
    }

    // Set multiple buttons on the first column to demonstrate overflow.
    this.columnDefinitions[0].name = 'Resize me!';
    this.columnDefinitions[0].header = {
      buttons: [
        {
          cssClass: 'fa fa-tag',
          handler: (e) => {
            alert('Tag');
          }
        },
        {
          cssClass: 'fa fa-comment',
          handler: (e) => {
            alert('Comment');
          }
        },
        {
          cssClass: 'fa fa-info-circle',
          handler: (e) => {
            alert('Info');
          }
        },
        {
          cssClass: 'fa fa-question-circle',
          handler: (e) => {
            alert('Help');
          }
        }
      ]
    };

    // Set a button on the second column to demonstrate hover.
    this.columnDefinitions[1].name = 'Hover me!';
    this.columnDefinitions[1].header = {
      buttons: [
        {
          cssClass: 'fa fa-question-circle',
          showOnHover: true,
          tooltip: 'This button only appears on hover.',
          handler: (e) => {
            alert('Help');
          }
        }
      ]
    };

    // mock a dataset
    const mockDataset = [];
    for (let i = 0; i < 100; i++) {
      const d = (mockDataset[i] = {});
      d['id'] = i;
      for (let j = 0; j < this.columnDefinitions.length; j++) {
        d[j] = Math.round(Math.random() * 10) - 5;
      }
    }
    this.dataset = mockDataset;
  }

  gridReady(grid) {
    this.gridObj = grid;
  }
  dataviewReady(dataview) {
    this.dataviewObj = dataview;
  }
}
