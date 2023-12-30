#### index
- Frequently asked questions
  - [Merging grid options with applied defaults](#merging-grid-options-with-applied-defaults)

### Description
When working with the grid, you might want to Add / Update or Hightlight an item row from the Datagrid.

**Note:** This is strictly a client side event, you still have to implement any backend change yourself.

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/additem) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-additem.component.ts)

## Frequently asked questions
### Merging grid options with applied defaults
When you pass gridOptions to the `angular-slickgrid` component, keep in mind that they get overloaded with the [Default Grid Options](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/modules/angular-slickgrid/global-grid-options.ts). In contrast to what might be expected, this change won't overwrite your provided object.

In cases, where depending on your data you might want to update the options (e.g. make columns readonly based on permissions) make sure to update your reference in the onAngularGridCreated event handler as shown below:

#### View
```html
<angular-slickgrid
     gridId="grid1"
     [columnDefinitions]="columnDefinitions"
     [gridOptions]="gridOptions"
     [dataset]="dataset"
     (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>
```

#### Component
```typescript
import { Component, OnInit} from '@angular/core';
import { AngularGridInstance } from 'angular-slickgrid';

export class GridBasicComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption = {
    // your initial settings
  };
  dataset: any[];

  ngOnInit(): void {
    this.columnDefinitions = [];
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;

    // update your reference to make use of applied defaults
    this.gridOptions = this.angularGrid.slickGrid.getOptions() as GridOption;
  }
}
```
