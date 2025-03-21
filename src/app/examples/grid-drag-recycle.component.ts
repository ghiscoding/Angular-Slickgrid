import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AngularGridInstance,
  Column,
  Editors,
  Formatters,
  GridOption,
  SlickGlobalEditorLock,
} from '../modules/angular-slickgrid';

@Component({
  templateUrl: './grid-drag-recycle.component.html',
  styleUrls: ['./grid-drag-recycle.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridDragRecycleComponent implements OnInit {
  angularGrid!: AngularGridInstance;
  gridOptions!: GridOption;
  columnDefinitions!: Column[];
  dataset!: any[];
  dragHelper?: HTMLElement;
  dragRows: number[] = [];
  dragMode = '';
  hideSubTitle = false;

  ngOnInit(): void {
    this.defineGrids();

    // mock a dataset
    this.dataset = this.mockData();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  isBrowserDarkModeEnabled() {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  /* Define grid Options and Columns */
  defineGrids() {
    this.columnDefinitions = [
      {
        id: 'name',
        name: 'Name',
        field: 'name',
        width: 300,
        cssClass: 'cell-title',
        editor: { model: Editors.Text },
        validator: this.requiredFieldValidator,
      },
      {
        id: 'complete',
        name: 'Complete',
        width: 60,
        cssClass: 'cell-effort-driven',
        field: 'complete',
        cannotTriggerInsert: true,
        formatter: Formatters.checkmarkMaterial,
        editor: { model: Editors.Checkbox },
      },
    ];

    this.gridOptions = {
      enableAutoResize: false,
      gridHeight: 225,
      gridWidth: 800,
      rowHeight: 33,
      enableCellNavigation: true,
      enableRowSelection: true,
      enableRowMoveManager: true,
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false,
      },
      rowMoveManager: {
        columnIndexPosition: 0,
        cancelEditOnDrag: true,
        disableRowSelection: true,
        hideRowMoveShadow: false,
        onBeforeMoveRows: this.onBeforeMoveRows.bind(this),
        onMoveRows: this.onMoveRows.bind(this),

        // you can also override the usability of the rows, for example make every 2nd row the only moveable rows,
        // usabilityOverride: (row, dataContext, grid) => dataContext.id % 2 === 1
      },
    };
  }

  mockData() {
    return [
      { id: 0, name: 'Make a list', complete: true },
      { id: 1, name: 'Check it twice', complete: false },
      { id: 2, name: `Find out who's naughty`, complete: false },
      { id: 3, name: `Find out who's nice`, complete: false },
    ];
  }

  onBeforeMoveRows(e: MouseEvent | TouchEvent, data: { rows: number[]; insertBefore: number }) {
    for (const dataRow of data.rows) {
      // no point in moving before or after itself
      if (dataRow === data.insertBefore || dataRow === data.insertBefore - 1) {
        e.stopPropagation();
        return false;
      }
    }
    return true;
  }

  onMoveRows(_e: MouseEvent | TouchEvent, args: { rows: number[]; insertBefore: number }) {
    const extractedRows: any[] = [];
    const rows = args.rows;
    const insertBefore = args.insertBefore;
    const left = this.dataset.slice(0, insertBefore);
    const right = this.dataset.slice(insertBefore, this.dataset.length);

    rows.sort((a, b) => a - b);

    for (const row of rows) {
      extractedRows.push(this.dataset[row]);
    }

    rows.reverse();

    for (const row of rows) {
      if (row < insertBefore) {
        left.splice(row, 1);
      } else {
        right.splice(row - insertBefore, 1);
      }
    }

    this.dataset = left.concat(extractedRows.concat(right));

    const selectedRows: number[] = [];
    for (let i = 0; i < rows.length; i++) {
      selectedRows.push(left.length + i);
    }

    this.angularGrid.slickGrid?.resetActiveCell();
    this.dataset = [...this.dataset];
  }

  handleOnDragInit(e: CustomEvent) {
    // prevent the grid from cancelling drag'n'drop by default
    e.stopImmediatePropagation();
  }

  handleOnDragStart(e: CustomEvent) {
    const cell = this.angularGrid.slickGrid?.getCellFromEvent(e);

    if (!cell || cell.cell === 0) {
      this.dragMode = '';
      return;
    }

    const row = cell.row;
    if (!this.dataset[row]) {
      return;
    }

    if (SlickGlobalEditorLock.isActive()) {
      return;
    }

    e.stopImmediatePropagation();
    this.dragMode = 'recycle';

    let selectedRows: number[] = this.angularGrid.slickGrid?.getSelectedRows() || [];

    if (!selectedRows.length || selectedRows.findIndex((row) => row === row) === -1) {
      selectedRows = [row];
      this.angularGrid.slickGrid?.setSelectedRows(selectedRows);
    }

    this.dragRows = selectedRows;
    const dragCount = selectedRows.length;

    const dragMsgElm = document.createElement('span');
    dragMsgElm.className = 'drag-message';
    dragMsgElm.textContent = `Drag to Recycle Bin to delete ${dragCount} selected row(s)`;
    this.dragHelper = dragMsgElm;
    document.body.appendChild(dragMsgElm);
    document.querySelector<HTMLDivElement>('#dropzone')?.classList.add('drag-dropzone');

    return dragMsgElm;
  }

  handleOnDrag(e: MouseEvent, args: any) {
    if (this.dragMode !== 'recycle') {
      return;
    }
    if (this.dragHelper instanceof HTMLElement) {
      this.dragHelper.style.top = `${e.pageY + 5}px`;
      this.dragHelper.style.left = `${e.pageX + 5}px`;
    }

    // add/remove pink background color when hovering recycle bin
    const dropzoneElm = document.querySelector<HTMLDivElement>('#dropzone')!;
    if (args.target instanceof HTMLElement && (args.target.id === 'dropzone' || args.target === dropzoneElm)) {
      dropzoneElm.classList.add('drag-hover'); // OR: dd.target.style.background = 'pink';
    } else {
      dropzoneElm.classList.remove('drag-hover');
    }
  }

  handleOnDragEnd(e: CustomEvent, args: any) {
    if (this.dragMode != 'recycle') {
      return;
    }
    this.dragHelper?.remove();
    document.querySelector<HTMLDivElement>('#dropzone')?.classList.remove('drag-dropzone', 'drag-hover');

    if (this.dragMode != 'recycle' || args.target.id !== 'dropzone') {
      return;
    }

    // reaching here means that we'll remove the row that we started dragging from the dataset
    const rowsToDelete = this.dragRows.sort().reverse();
    for (const rowToDelete of rowsToDelete) {
      this.dataset.splice(rowToDelete, 1);
    }
    this.angularGrid.slickGrid?.invalidate();
    this.angularGrid.slickGrid?.setSelectedRows([]);
    this.dataset = [...this.dataset];
  }

  requiredFieldValidator(value: any) {
    if (value == null || value == undefined || !value.length) {
      return { valid: false, msg: 'This is a required field' };
    } else {
      return { valid: true, msg: null };
    }
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
