#### Index
- [Using an Inclusive Range](#using-an-inclusive-range-default-is-exclusive)
- [Using 2 dots (..) notation](#using-2-dots--notation)
- [Using a Slider Range](#using-a-slider-range-filter)
  - [Filter Options](#filter-options)
- [Using a Date Range](#using-a-date-range-filter)
- [Update Filters Dynamically](input-filter.md#update-filters-dynamically)
- [Custom Filter Predicate](input-filter.md#custom-filter-predicate)
- [Filter Shortcuts](input-filter.md#filter-shortcuts)

### Introduction
Range filters allows you to search for a value between 2 min/max values, the 2 most common use case would be to filter between 2 numbers or dates, you can do that with the Slider & Date Range Filters. The range can also be defined as inclusive (`>= 0 and <= 10`) or exclusive (`> 0 and < 10`), the default is exclusive but you can change that, see below for more info.

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
import { Filters, Formatters, GridOption, OperatorType } from '@slickgrid-universal/common';

export class GridBasicComponent {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  attached(): void {
    // your columns definition
    this.columnDefinitions = [
      {
        id: 'duration', field: 'duration', name: 'Duration',
        type: 'number', // you can optionally specify that the data are numbers
        filterable: true,

        // input filter is the default, so you can skip this unless you want to specify the `operator`
        filter: {
          model: 'input',
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
import { Filters, Formatters, GridOption, SliderRangeOption, OperatorType } from '@slickgrid-universal/commomn';

export class GridBasicComponent {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  attached(): void {
    // your columns definition
    this.columnDefinitions = [
      {
        id: 'complete', name: '% Complete', field: 'percentComplete', headerKey: 'PERCENT_COMPLETE', minWidth: 120,
        sortable: true,
        formatter: Formatters.progressBar,
        type: 'number',
        filterable: true,
        filter: {
          model: Filters.sliderRange,
          maxValue: 100, // or you can use the filterOptions as well
          operator: OperatorType.rangeInclusive, // optional, defaults to exclusive
          params: { hideSliderNumbers: false }, // you can hide/show the slider numbers on both side

          // you can also optionally pass any option of the Slider filter
          filterOptions: { sliderStartValue: 5 } as SliderRangeOption
        }
      },
    ];

    this.gridOptions = {
      // your grid options config
    }
  }
}
```

##### Filter Options
All the available options that can be provided as `filterOptions` to your column definitions and you should try to cast your `filterOptions` to the specific interface as much as possible to make sure that you use only valid options of allowed by the targeted filter

```ts
filter: {
  model: Filters.sliderRange,
  filterOptions: {
    sliderStartValue: 5
  } as SliderOption
}
```

#### Grid Option `defaultFilterOptions
You could also define certain options as a global level (for the entire grid or even all grids) by taking advantage of the `defaultFilterOptions` Grid Option. Note that they are set via the filter type as a key name (`autocompleter`, `date`, ...) and then the content is the same as `filterOptions` (also note that each key is already typed with the correct filter option interface), for example

```ts
this.gridOptions = {
  defaultFilterOptions: {
    // Note: that `date`, `select` and `slider` are combining both compound & range filters together
    date: { range: { min: 'today' } },
    select: { minHeight: 350 }, // typed as MultipleSelectOption
    slider: { sliderStartValue: 10 }
  }
}
```

### Using a Date Range Filter
The date range filter allows you to search data between 2 dates, it uses the [Vanilla-Calendar Range](https://vanilla-calendar.pro/) feature.

> **Note** we use [Tempo](https://tempo.formkit.com/) to parse and format Dates to the chosen format via the `type` option when provided in your column definition.

##### Component
import { Filters, Formatters, GridOption, OperatorType, VanillaCalendarOption } from '@slickgrid-universal/common';

```typescript
export class GridBasicComponent {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  attached(): void {
    // your columns definition
    this.columnDefinitions = [
      {
        id: 'finish', name: 'Finish', field: 'finish', headerKey: 'FINISH',
        minWidth: 75, width: 120, exportWithFormatter: true,
        formatter: Formatters.dateIso, sortable: true,
        type: FieldType.date,
        filterable: true,
        filter: {
          model: Filters.dateRange,

          // override any of the Vanilla-Calendar options through "filterOptions"
          filterOptions: { range: { min: 'today' } } as VanillaCalendarOption
        }
      },
    ];

    this.gridOptions = {
      // your grid options config
    }
  }
}
```

#### Filter Options (`VanillaCalendarOption` interface)
All the available options that can be provided as `filterOptions` to your column definitions can be found under this [VanillaCalendarOption interface](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/vanillaCalendarOption.interface.ts) and you should cast your `filterOptions` with the expected interface to make sure that you use only valid settings of the [Vanilla-Calendar](https://vanilla-calendar.pro/docs/reference/additionally/settings) library.

```ts
filter: {
  model: Filters.compoundDate,
  filterOptions: {
    range: { min: 'today' }
  } as VanillaCalendarOption
}
```
