#### Index
- [Usage](#usage)
- [Sorting Complex Objects](#how-to-sort-complex-objects)
- [Custom Sort Comparer](#custom-sort-comparer)
- [Update Sorting Dynamically](#update-sorting-dynamically)
- [Dynamic Query Field](#dynamic-query-field)

### Demo
[Demo Page](https://ghiscoding.github.io/slickgrid-universal/#/example01) / [Demo ViewModel](https://github.com/ghiscoding/slickgrid-universal/blob/master/examples/vite-demo-vanilla-bundle/src/examples/example01.ts)

### Description
Sorting on the client side is really easy, you simply need to enable `sortable` (when not provided, it is considered as disabled) on each columns you want to sort and it will sort as a type string. Oh but wait, sorting as string might not always be ideal, what if we want to sort by number or by date? The answer is to simply pass a `type` as shown below.

### Usage
To use any of them, you can use the `FieldType` interface or enter a type via a string as shown below. Also please note that `FieldType.string` is the default and you don't necessarily need to define it, though you could if you wish to see it in your column definition.

```ts
import { FieldType } from 'angular-slickgrid';

export class GridBasicComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', sortable: true },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, type: FieldType.number },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true, type: FieldType.float},
      { id: 'start', name: 'Start', field: 'start', sortable: true, type: FieldType.dateIso },
      { id: 'finish', name: 'Finish', field: 'finish', sortable: true, type: FieldType.dateIso },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', sortable: true }
    ];
  }
}
```

### How to Sort Complex Objects?
You can sort complex objects using the dot (.) notation inside the `field` property defined in your Columns Definition.

For example, let say that we have this dataset
```typescript
const dataset = [
 { item: 'HP Desktop', buyer: { id: 1234, address: { street: '123 Belleville', zip: 123456 }} },
 { item: 'Lenovo Mouse', buyer: { id: 456, address: { street: '456 Hollywood blvd', zip: 789123 }} }
];
```

We can now filter the zip code from the buyer's address using this filter:
```typescript
this.columnDefinitions = [
  {
    // the zip is a property of a complex object which is under the "buyer" property
    // it will use the "field" property to explode (from "." notation) and find the child value
    id: 'zip', name: 'Zip Code', field: 'buyer.address.zip', sortable: true
  }
  // { id: 'street',  ... },
];
```

### Custom Sort Comparer
If the builtin sort comparer methods are not sufficient for your use case, you could add your own custom Sort Comparer in your Column Definitions as shown below. Note that we are only showing a simple numeric sort, just adjust it to your needs.

```ts
this.columnDefinitions = [{
  id: 'myField', name: 'My Field',
  sorter: (a, b) => a > b ? 1 : -1,
}];
```

similarly with a complex object

```ts
// data = { user: { firstName: 'John', lastName: 'Doe', fullName: 'John Doe' }, address: { zip: 123456 } }};

this.columnDefinitions = [{
  id: 'firstName', name: 'First Name', field: 'user.firstName',
  sorter: (a, b) => a.fullName > b.fullName ? 1 : -1,
}];
```

### Update Sorting Dynamically
You can update/change the Sorting dynamically (on the fly) via the `updateSorting` method from the `SortService`. Note that calling this method will override all sorting (sorters) and replace them with the new array of sorters provided. For example, you could update the sorting from a button click or a select dropdown list with predefined filter set.

##### View
```html
<button class="btn btn-default btn-sm" data-test="set-dynamic-sorting" (click)="setSortingDynamically()">
    Set Sorting Dynamically
</button>

<angular-slickgrid gridId="grid1"
   [columnDefinitions]="columnDefinitions"
   [gridOptions]="gridOptions"
   [dataset]="dataset"
   (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>
```

##### Component
```ts
export class Example {
  angularGrid: AngularGridInstance;

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  setSortingDynamically() {
    this.angularGrid.sortService.updateSorting([
      // orders matter, whichever is first in array will be the first sorted column
      { columnId: 'duration', direction: 'ASC' },
      { columnId: 'start', direction: 'DESC' },
    ]);
  }
}
```

#### Extra Arguments
The `updateSorting` method has 2 extra arguments:
- 2nd argument, defaults to true, is to emit a sort changed event (the GridStateService uses this event)
  - optional and defaults to true `updateSorting([], true)`
- 3rd argument is to trigger a backend query (when using a Backend Service like OData/GraphQL), this could be useful when using updateFilters & updateSorting and you wish to only send the backend query once.
  - optional and defaults to true `updateSorting([], true, true)`

### Dynamic Query Field
What if you a field that you only know which field to query only at run time and depending on the item object (`dataContext`)?
We can defined a `queryFieldNameGetterFn` callback that will be executed on each row when Filtering and/or Sorting.
```ts
queryFieldNameGetterFn: (dataContext) => {
  // do your logic and return the field name will be queried
  // for example let say that we query "profitRatio" when we have a profit else we query "lossRatio"
  return dataContext.profit > 0 ? 'profitRatio' : 'lossRatio';
},
```