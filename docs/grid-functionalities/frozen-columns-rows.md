#### Index
- [Columns/Rows Pinning Basic](#columnsrows-pinning-basic)
- [Rows Pinning starting from Bottom](#rows-pinning-starting-from-bottom)
- [Change Pinning Dynamically](#change-pinning-dynamically)
- [Animated Gif Demo](#animated-gif-demo)

### Demo
[Demo Page](https://ghiscoding.github.io/angular-slickgrid-bs4-demo/#/frozen) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-frozen.component.ts)

### Introduction
One of the requested features, columns or rows pinning (aka frozen). You can pin 1 or more Columns and/or 1 or more Rows. Columns can only be pinned starting from the left side, while Rows can be pinned starting from the Top (default) or Bottom. You can also change the pinning dynamically with `setOptions()`.

## Columns/Rows Pinning basic
To set a pinning for the entire duration of the grid, simply use the Grid Options `frozenColumn` (starting from top) and `frozenRow` (starting from left), which are both `number` types.

```html
<angular-slickgrid gridId="grid2"
     [columnDefinitions]="columnDefinitions"
     [gridOptions]="gridOptions"
     [dataset]="dataset">
</angular-slickgrid>
```

##### Component
```typescript
import { Component, OnInit} from '@angular/core';

export class GridBasicComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
      // your columns definition
    this.columnDefinitions = [];

    this.gridOptions = {
      alwaysShowVerticalScroll: false, // disable scroll since we don't want it to show on the left pinned columns
      frozenColumn: 2, // number of pinned columns starting from the left
      frozenRow: 3,    // number of pinned columns starting from the top
    }
  }
}
```

## Rows Pinning starting from bottom
This is basically the same thing as previous code sample, except that you will set the Grid Option property `frozenBottom` to true and that it's.
##### Component
```ts
import { Component, OnInit} from '@angular/core';

export class GridBasicComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
      // your columns definition
    this.columnDefinitions = [];

    this.gridOptions = {
      alwaysShowVerticalScroll: false, // disable scroll since we don't want it to show on the left pinned columns
      frozenColumn: 2,    // number of pinned columns starting from the left
      frozenRow: 3,       // number of pinned columns (starting from bottom with next property)
      frozenBottom: true, // this will make rows to be pinned starting from the bottom and the number of rows will be 3
    }
  }
}
```

## Change Pinning Dynamically
You can change the number of pinned columns/rows and even the pinning of columns from top to bottom. For a demo of what that could look like, take a look at the [Animated Gif Demo](#animated-gif-demo) below.

```html
<div class="row col-sm-12">
    <span>
        <label for="">Pinned Rows: </label>
        <input type="number" [(ngModel)]="frozenRowCount">
        <button class="btn btn-default btn-xs" (click)="changeFrozenRowCount()">
            Set
        </button>
    </span>
    <span style="margin-left: 10px">
        <label for="">Pinned Columns: </label>
        <input type="number" [(ngModel)]="frozenColumnCount">
        <button class="btn btn-default btn-xs" (click)="changeFrozenColumnCount()">
            Set
        </button>
    </span>
    <span style="margin-left: 15px">
        <button class="btn btn-default btn-sm" (click)="toggleFrozenBottomRows()">
            <i class="mdi mdi-flip-vertical"></i> Toggle Pinned Rows
        </button>
        <span style="font-weight: bold;">: {{ isFrozenBottom ? 'Bottom' : 'Top' }}</span>
    </span>
</div>

<angular-slickgrid gridId="grid2"
     [columnDefinitions]="columnDefinitions"
     [gridOptions]="gridOptions"
     [dataset]="dataset"
     (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>
```

##### Component
```ts
import { Component, OnInit} from '@angular/core';
import { AngularGridInstance } from 'angular-slickgrid';

export class GridBasicComponent implements OnInit {
  columnDefinitions: Column[];
  dataset: any[];
  gridOptions: GridOption;
  gridObj: any;
  isFrozenBottom = false;

  ngOnInit(): void {
      // your columns definition
    this.columnDefinitions = [];

    this.gridOptions = {
      alwaysShowVerticalScroll: false, // disable scroll since we don't want it to show on the left pinned columns
      frozenColumn: 2, // number of pinned columns starting from the left
      frozenRow: 3,    // number of pinned columns starting from the top
    }
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.gridObj = angularGrid.slickGrid;
  }

  /** change dynamically, through slickgrid "setOptions()" the number of pinned columns */
  changeFrozenColumnCount() {
    if (this.gridObj && this.gridObj.setOptions) {
      this.gridObj.setOptions({
        frozenColumn: this.frozenColumnCount
      });
    }
  }

  /** change dynamically, through slickgrid "setOptions()" the number of pinned rows */
  changeFrozenRowCount() {
    if (this.gridObj && this.gridObj.setOptions) {
      this.gridObj.setOptions({
        frozenRow: this.frozenRowCount
      });
    }
  }

  /** toggle dynamically, through slickgrid "setOptions()" the top/bottom pinned location */
  toggleFrozenBottomRows() {
    if (this.gridObj && this.gridObj.setOptions) {
      this.gridObj.setOptions({
        frozenBottom: !this.isFrozenBottom
      });
      this.isFrozenBottom = !this.isFrozenBottom; // toggle the variable
    }
  }
}
```

## Animated Gif Demo
![](https://user-images.githubusercontent.com/643976/50852303-28d57c80-134d-11e9-859c-aeb55af24c24.gif)