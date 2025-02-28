In some cases you might want a feature that is not yet available in `Angular-Slickgrid` but exists in the original `SlickGrid`, what should you do? Fear not, we got you covered. `Angular-Slickgrid` exposes the SlickGrid `Grid` and `DataView` objects through Event Emitters, these objects are created when Angular-Slickgrid initialize the grid (with `ngAfterViewInit`). The ones we want to use for our usage would be `onGridCreated` and `onDataviewCreated`, depending on which object you want to obtain.

**The new preferred way is now to use the `AngularGridInstance` via the `onAngularGridCreated` Event Emitter**

### Event Emitter
Angular-Slickgrid have the following Event Emitters that you can hook to
- `onAngularGridCreated`
- `onDataviewCreated`
- `onGridCreated`
- `onBeforeGridCreate`
- `onBeforeGridDestroy`
- `onAfterGridDestroyed`

The ones we want to use for our usage would be `onGridCreated` and `onDataviewCreated`, depending on which object you want to obtain.

### Grid & DataView objects through `onAngularGridCreated`
Since version `1.x`, we can now access the Slick `Grid` & `DataView` objects directly from the `AngularGridInstance` through the `(onAngularGridCreated)` Event Emitter, for example:

##### View
```html
<span id="radioAutoEdit">
    <label class="radio-inline control-label" for="radioTrue">
        <input type="radio" name="inlineRadioOptions" id="radioTrue" checked [value]="isAutoEdit" (change)="setAutoEdit(true)"> ON (single-click)
    </label>
    <label class="radio-inline control-label" for="radioFalse">
        <input type="radio" name="inlineRadioOptions" id="radioFalse" [value]="isAutoEdit" (change)="setAutoEdit(false)"> OFF (double-click)
    </label>
</span>

<angular-slickgrid gridId="grid2"
          [columnDefinitions]="columnDefinitions"
          [gridOptions]="gridOptions"
          [dataset]="dataset"
          (onAngularGridCreated)="angularGridReady($event.detail">
</angular-slickgrid>
```

##### Component
```typescript
import { AngularGridInstance, Column, GridOption } from 'angular-slickgrid';

export class MyApp {
  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  isAutoEdit = true;
  gridObj: any;
  dataViewObj: any;


  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.dataViewObj = angularGrid.dataView;
  }

  /** Change dynamically `autoEdit` grid options */
  setAutoEdit(isAutoEdit) {
    this.isAutoEdit = isAutoEdit;
    this.gridObj.setOptions({ autoEdit: isAutoEdit }); // change the grid option dynamically
    return true;
  }

  collapseAllGroups() {
    this.dataviewObj.collapseAllGroups();
  }

  expandAllGroups() {
    this.dataviewObj.expandAllGroups();
  }
}
```

### SlickGrid Events (original SlickGrid)
You have access to all original SlickGrid events which you can subscribe, for more info refer to the [Docs - Grid & DataView Events](../events/Grid-&-DataView-Events.md)

### Usage
There's already all the necessary information on how to use this on the [Docs - Grid & DataView Events](../events/Grid-&-DataView-Events.md#view) page, so I suggest you to head over to that Documentation page on how to use the `SlickGrid` and `DataView` objects
