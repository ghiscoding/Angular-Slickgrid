#### Index
- [Update Filters Dynamically](input-filter.md#update-filters-dynamically)
- [Custom Filter Predicate](input-filter.md#custom-filter-predicate)

### Description
Some users might want to have 1 main single search for filtering the grid data instead of using multiple column filters. You can see a demo of that below

### Code Sample
#### View
```html
<angular-slickgrid gridId="grid23" [columnDefinitions]="columnDefinitions" [gridOptions]="gridOptions"
   [dataset]="dataset" (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>

<form class="form-inline">
    <div class="form-group">
        <label>Single Search: </label>
        <select class="form-control" name="selectedColumn" [(ngModel)]="selectedColumn"
            (ngModelChange)="updateFilter()">
            <option [ngValue]="field" *ngFor="let field of columnDefinitions">{{field.name}}</option>
        </select>
        <select class="form-control" name="selectedOperator" [(ngModel)]="selectedOperator"
            (ngModelChange)="updateFilter()">
            <option [ngValue]="operator" *ngFor="let operator of operatorList">{{operator}}</option>
            </select>

        <input type="text" class="form-control" name="searchValue" placeholder="search value" autocomplete="off"
                (input)="updateFilter()" [(ngModel)]="searchValue">
    </div>
</form>
```

##### ViewModel
```ts
export class MyComponent {
  angularGrid: AngularGridInstance;
  grid: any;
  dataView: any;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  operatorList: OperatorString[] = ['=', '<', '<=', '>', '>=', '<>'];
  selectedOperator = '=';
  searchValue = '';
  selectedColumn: Column;

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  updateFilter() {
    if (this.selectedColumn && this.selectedOperator) {
      const fieldName = this.selectedColumn.field;
      const filter = {};
      const filterArg: FilterCallbackArg = {
        columnDef: this.selectedColumn,
        operator: this.selectedOperator as OperatorString, // or fix one yourself like '='
        searchTerms: [this.searchValue || '']
      };

      if (this.searchValue) {
        // pass a columnFilter object as an object which it's property name must be a column field name (e.g.: 'duration': {...} )
        filter[fieldName] = filterArg;
      }

      this.angularGrid.dataView.setFilterArgs({
        columnFilters: filter,
        grid: this.angularGrid.slickGrid
      });
      this.angularGrid.dataView.refresh();
    }
  }
}
```

## Sample
![2019-04-16_15-42-05](https://user-images.githubusercontent.com/643976/56239148-3b530680-605e-11e9-99a2-e9a163abdd0c.gif)