import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AngularGridInstance,
  Column,
  Editors,
  FieldType,
  GridOption,
  OnCellChangeEventArgs,
} from './../modules/angular-slickgrid';

const NB_ITEMS = 100;

@Component({
  templateUrl: './grid-footer-totals.component.html',
})
export class GridFooterTotalsComponent implements OnDestroy, OnInit {
  private _darkMode = false;
  title = 'Example 37: Footer Totals Row';
  subTitle = `Display a totals row at the end of the grid.`;

  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset!: any[];
  angularGrid!: AngularGridInstance;
  hideSubTitle = false;

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.updateAllTotals();
  }

  ngOnInit(): void {
    this.defineGrid();

    // mock a dataset
    this.dataset = this.loadData(NB_ITEMS);
  }

  ngOnDestroy() {
    document.querySelector('.panel-wm-content')!.classList.remove('dark-mode');
    document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'light';
  }

  /* Define grid Options and Columns */
  defineGrid() {
    const columnDefs: Column[] = [];
    for (let i = 0; i < 10; i++) {
      columnDefs.push({
        id: i,
        name: String.fromCharCode('A'.charCodeAt(0) + i),
        field: String(i),
        type: FieldType.number,
        width: 58,
        editor: { model: Editors.integer },
      });
    }
    this.columnDefinitions = columnDefs;

    this.gridOptions = {
      autoEdit: true,
      autoCommitEdit: true,
      editable: true,
      darkMode: this._darkMode,
      gridHeight: 450,
      gridWidth: 800,
      enableCellNavigation: true,
      rowHeight: 30,
      createFooterRow: true,
      showFooterRow: true,
      footerRowHeight: 28,
    };
  }

  loadData(itemCount: number) {
    // mock a dataset
    const datasetTmp: any[] = [];
    for (let i = 0; i < itemCount; i++) {
      const d = (datasetTmp[i] = {} as any);
      d.id = i;
      for (let j = 0; j < this.columnDefinitions.length; j++) {
        d[j] = Math.round(Math.random() * 10);
      }
    }

    return datasetTmp;
  }

  handleOnCellChange(_e: Event, args: OnCellChangeEventArgs) {
    this.updateTotal(args.cell);
  }

  handleOnColumnsReordered() {
    this.updateAllTotals();
  }

  toggleDarkMode() {
    this._darkMode = !this._darkMode;
    this.toggleBodyBackground();
    this.angularGrid.slickGrid?.setOptions({ darkMode: this._darkMode });
    this.updateAllTotals();
  }

  toggleBodyBackground() {
    if (this._darkMode) {
      document.querySelector<HTMLDivElement>('.panel-wm-content')!.classList.add('dark-mode');
      document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'dark';
    } else {
      document.querySelector('.panel-wm-content')!.classList.remove('dark-mode');
      document.querySelector<HTMLDivElement>('#demo-container')!.dataset.bsTheme = 'light';
    }
  }

  updateAllTotals() {
    let columnIdx = this.angularGrid.slickGrid?.getColumns().length || 0;
    while (columnIdx--) {
      this.updateTotal(columnIdx);
    }
  }

  updateTotal(cell: number) {
    const columnId = this.angularGrid.slickGrid?.getColumns()[cell].id as number;

    let total = 0;
    let i = this.dataset.length;
    while (i--) {
      total += parseInt(this.dataset[i][columnId], 10) || 0;
    }
    const columnElement = this.angularGrid.slickGrid?.getFooterRowColumn(columnId);
    if (columnElement) {
      columnElement.textContent = `Sum: ${total}`;
    }
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
