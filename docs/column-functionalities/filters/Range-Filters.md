#### Index
- [Using an Inclusive Range](#using-an-inclusive-range-default-is-exclusive)
- [Using 2 dots (..) notation](#using-2-dots--notation)
- [Using a Slider Range](#using-a-slider-range-filter)
  - [Filter Options (`JQueryUiSliderOption` interface)](#filter-options-jqueryuislideroption-interface)
- [Using a Date Range](#using-a-date-range-filter)
   - [Filter Options (`FlatpickrOption` interface)](#filter-options-flatpickroption-interface)
- [Update Filters Dynamically](Input-Filter.md#update-filters-dynamically)

### Introduction
Range filters allows you to search for a value between 2 min/max values, the 2 most common use case would be to filter between 2 numbers or dates, you can do that with the new Slider & Date Range Filters. The range can also be defined as inclusive (`>= 0 and <= 10`) or exclusive (`> 0 and < 10`), the default is exclusive but you can change that, see below for more info.

### Using an Inclusive Range (default is Exclusive)
By default all the range filters are with exclusive range, which mean between value `x` and `y` but without including them. If you wish to include the `x` and `y` values, you can change that through the `operator` property.

For example
```ts
// your columns definition
this.columnDefinitions = [
  {
    id: 'duration', field: 'duration', name: 'Duration',
    filterable: true,
    filter: {
      model: Filters.input,
      operator: OperatorType.rangeInclusive // defaults to exclusive

      // or use the string (case sensitive)
      operator: 'RangeInclusive', // defaults to exclusive
    }
  },
];
```

## Using 2 dots (..) notation
You can use a regular input filter with the 2 dots (..) notation to represent a range, for example `5..90` would search between the value 5 and 90 (exclusive search unless specified).

##### Component
```ts
import { Filters, Formatters, GridOption, OperatorType } from 'angular-slickgrid';

export class GridBasicComponent implement OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
    // your columns definition
    this.columnDefinitions = [
      {
        id: 'duration', field: 'duration', name: 'Duration',
        type: FieldType.number, // you can optionally specify that the data are numbers
        filterable: true,

        // input filter is the default, so you can skip this unless you want to specify the `operator`
        filter: {
          model: Filters.input,
          operator: OperatorType.rangeInclusive // defaults to exclusive
        }
      },
    ];

    this.gridOptions = {
      // your grid options config
    }
  }
}
```

### Using a Slider Range Filter
The slider range filter is very useful if you can just want to use the mouse to drag/slide a cursor, you can also optionally show/hide the slider values on screen (hiding them would giving you more room without but without the precision).

##### Component
```ts
import { Filters, Formatters, GridOption, JQueryUiSliderOption, OperatorType } from 'angular-slickgrid';

export class GridBasicComponent implement OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
    // your columns definition
    this.columnDefinitions = [
      {
        id: 'complete', name: '% Complete', field: 'percentComplete', nameKey: 'PERCENT_COMPLETE', minWidth: 120,
        sortable: true,
        formatter: Formatters.progressBar,
        type: FieldType.number,
        filterable: true,
        filter: {
          model: Filters.sliderRange,
          maxValue: 100, // or you can use the filterOptions as well
          operator: OperatorType.rangeInclusive, // optional, defaults to exclusive
          params: { hideSliderNumbers: false }, // you can hide/show the slider numbers on both side

          // you can also optionally pass any option of the jQuery UI Slider
          // however you can't override the `change` and `slide` events since they are used by the lib
          filterOptions: { min: 0, step: 5 } as JQueryUiSliderOption
        }
      },
    ];

    this.gridOptions = {
      // your grid options config
    }
  }
}
```

##### Filter Options (`JQueryUiSliderOption` interface)
All the available options that can be provided as `filterOptions` to your column definitions can be found under this [FlatpickrOption interface](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/jQueryUiSliderOption.interface.ts) and you should cast your `filterOptions` to that interface to make sure that you use only valid options of the jQueryUI Slider library.

```ts
filter: {
  model: Filters.sliderRange,
  filterOptions: {
    min: 0,
    step: 5
  } as JQueryUiSliderOption
}
```

### Using a Date Range Filter
The date range filter allows you to search data between 2 dates (it uses [Flatpickr Range](https://flatpickr.js.org/examples/#range-calendar) feature).

##### Component
import { Filters, FlatpickrOption, Formatters, GridOption, OperatorType } from '@slickgrid-universal/common';

```typescript
export class GridBasicComponent implement OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
    // your columns definition
    this.columnDefinitions = [
      {
        id: 'finish', name: 'Finish', field: 'finish', nameKey: 'FINISH', formatter: Formatters.dateIso, sortable: true, minWidth: 75, width: 120, exportWithFormatter: true,
        type: FieldType.date,
        filterable: true,
        filter: {
          model: Filters.dateRange,

          // override any of the Flatpickr options through "filterOptions"
          editorOptions: { minDate: 'today' } as FlatpickrOption
        }
      },
    ];

    this.gridOptions = {
      // your grid options config
    }
  }
}
```

##### Filter Options (`FlatpickrOption` interface)
All the available options that can be provided as `filterOptions` to your column definitions can be found under this [FlatpickrOption interface](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/flatpickrOption.interface.ts) and you should cast your `filterOptions` to that interface to make sure that you use only valid options of the [Flatpickr](https://flatpickr.js.org/) library.

```ts
filter: {
  model: Filters.dateRange,
  filterOptions: {
    minDate: 'today'
  } as FlatpickrOption
}
```
