SlickGrid is very flexible and it allows you to change or add CSS Class(es) dynamically (or on page load) by changing it's `Item Metadata` (see [SlickGrid Wiki - Item Metadata](providing-grid-data.md)). There is also a Stack Overflow [answer](https://stackoverflow.com/a/19985148/1212166), which this code below is based from.

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/additem) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-additem.component.ts)

### Dynamically Change CSS Classes
##### View
```html
<button class="btn btn-sm btn-default" (click)="changeDurationBackgroundColor()">Highlight Rows with Duration over 50</button>

<angular-slickgrid gridId="grid2" 
  [columnDefinitions]="columnDefinitions" 
  [gridOptions]="gridOptions" 
  [dataset]="dataset"
  (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>
```

##### Component
```typescript
// VERY IMPORTANT
// changing CSS Styles only seems to work with Encapsulation set to None
@Component({
  styles: ['.duration-bg { background-color: #e9d4f1 !important }'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './grid-additem.component.html'
})
export class Example {
  // get the SlickGrid Grid & DataView object references
  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.dataView = angularGrid.dataView;
    this.grid = angularGrid.slickGrid;
  }

  /** 
   * Change the Duration Rows Background Color 
   * You need to get previous SlickGrid DataView Item Metadata and override it
   */
  changeDurationBackgroundColor() {
    this.dataView.getItemMetadata = this.updateItemMetadataForDurationOver50(this.dataView.getItemMetadata);

    // also re-render the grid for the styling to be applied right away
    this.grid.invalidate();
    this.grid.render();
  }

  /**
   * Override the SlickGrid Item Metadata, we will add a CSS class on all rows with a Duration over 50
   * For more info, you can see this SO https://stackoverflow.com/a/19985148/1212166
   */
  updateItemMetadataForDurationOver50(previousItemMetadata: any) {
    const newCssClass = 'duration-bg';

    return (rowNumber: number) => {
      const item = this.dataView.getItem(rowNumber);
      let meta = {
        cssClasses: ''
      };
      if (typeof previousItemMetadata === 'object') {
        meta = previousItemMetadata(rowNumber);
      }

      // our condition to check Duration over 50
      if (meta && item && item.duration) {
        const duration = +item.duration; // convert to number
        if (duration > 50) {
          meta.cssClasses = (meta.cssClasses || '') + ' ' + newCssClass;
        }
      }

      return meta;
    };
  }
}
```

### On Page Load
Or if you want to apply the styling right after the page load

##### Component
```typescript
export class Example {

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.dataView = angularGrid.dataView;
    this.grid = angularGrid.slickGrid;

    // if you want to change background color of Duration over 50 right after page load,
    // you would put the code here, also make sure to re-render the grid for the styling to be applied right away
    this.dataView.getItemMetadata = this.updateItemMetadataForDurationOver50(this.dataView.getItemMetadata);
    this.grid.invalidate();
    this.grid.render();
  }

  /**
   * Change the SlickGrid Item Metadata, we will add a CSS class on all rows with a Duration over 50
   * For more info, you can see this SO https://stackoverflow.com/a/19985148/1212166
   */
  updateItemMetadataForDurationOver50(previousItemMetadata: any) {
    const newCssClass = 'duration-bg';

    return (rowNumber: number) => {
      const item = this.dataView.getItem(rowNumber);
      let meta = {
        cssClasses: ''
      };
      if (typeof previousItemMetadata === 'object') {
        meta = previousItemMetadata(rowNumber);
      }

      if (meta && item && item.duration) {
        const duration = +item.duration; // convert to number
        if (duration > 50) {
          meta.cssClasses = (meta.cssClasses || '') + ' ' + newCssClass;
        }
      }

      return meta;
    };
  }
}
```