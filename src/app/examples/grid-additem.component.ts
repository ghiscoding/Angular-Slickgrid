import { Component, OnInit, Injectable } from '@angular/core';
import { Column, Editors, FieldType, Formatters, GridExtraService, GridOption, OnEventArgs } from './../modules/angular-slickgrid';

@Component({
  templateUrl: './grid-additem.component.html'
})
@Injectable()
export class GridAddItemComponent implements OnInit {
  title = 'Example 11: Add / Update / Highlight a Datagrid Item';
  subTitle = `
  Add / Update / Hightlight an Item from the Datagrid (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Add,-Update-or-Highlight-a-Datagrid-Item" target="_blank">Wiki link</a>).
  <ul>
    <li><b>Note:</b> this demo is <b>only</b> on the datagrid (client) side, you still need to deal with the backend yourself</li>
    <li>Adding an item, will always be showing as the 1st item in the grid because that is the best visual place to add it</li>
    <li>Add/Update an item requires a valid Slickgrid Selection Model, you have 2 choices to deal with this:</li>
    <ul><li>You can enable "enableCheckboxSelector" or "enableRowSelection" to True</li></ul>
    <li>Click on any of the buttons below to test this out</li>
    <li>You can change the highlighted color &amp; animation by changing the SASS variables:</li>
    <ul>
      <li>"$row-highlight-background-color" or "$row-highlight-fade-animation"</li>
      <li>Take a look at the available <a href="https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/modules/angular-slickgrid/styles/_variables.scss" target="_blank">SASS Variables</a></li>
    </ul>
  </ul>
  `;

  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  updatedObject: any;

  constructor(private gridExtraService: GridExtraService) {}

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', sortable: true, type: FieldType.string, editor: Editors.longText },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number, editor: Editors.text,
        onCellChange: (args: OnEventArgs) => {
        alert('onCellChange directly attached to the column definition');
        console.log(args);
        }
      },
      { id: 'complete', name: '% Complete', field: 'percentComplete', formatter: Formatters.percentCompleteBar, type: FieldType.number, editor: Editors.integer },
      { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso, sortable: true, type: FieldType.date/*, editor: Editors.date*/ },
      { id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso, sortable: true, type: FieldType.date },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', formatter: Formatters.checkmark, type: FieldType.number, editor: Editors.checkbox }
    ];

    this.gridOptions = {
      asyncEditorLoading: false,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      editable: true,
      enableColumnPicker: true,
      enableCellNavigation: true,
      enableRowSelection: true
    };

    // mock a dataset
    const mockedDataset = [];
    for (let i = 0; i < 1000; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      mockedDataset[i] = {
        id: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        effortDriven: (i % 5 === 0)
      };
    }
    this.dataset = mockedDataset;
  }

  addNewItem() {
    const newId = this.dataset.length;
    const randomYear = 2000 + Math.floor(Math.random() * 10);
    const randomMonth = Math.floor(Math.random() * 11);
    const randomDay = Math.floor((Math.random() * 29));
    const randomPercent = Math.round(Math.random() * 100);

    const newItem = {
      id: newId,
      title: 'Task ' + newId,
      duration: Math.round(Math.random() * 100) + '',
      percentComplete: randomPercent,
      percentCompleteNumber: randomPercent,
      start: new Date(randomYear, randomMonth, randomDay),
      finish: new Date(randomYear, (randomMonth + 2), randomDay),
      effortDriven: true
    };
    this.gridExtraService.addItemToDatagrid(newItem);
  }

  highlighFifthRow() {
    this.gridExtraService.highlightRow(4, 1500);
  }

  updateSecondItem() {
    const firstItem = this.gridExtraService.getDataItemByRowNumber(1);
    firstItem.duration = Math.round(Math.random() * 100);
    this.gridExtraService.updateDataGridItem(firstItem);
  }
}
