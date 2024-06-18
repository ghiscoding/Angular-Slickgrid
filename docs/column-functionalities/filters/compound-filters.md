#### index
- [Available Types](#available-types)
- [SASS Styling](#sass-styling)
- [Compound Input Filter](#how-to-use-compoundinput-filter)
- [Compound Date Filter](#how-to-use-compounddate-filter)
- [Compound Operator List (custom list)](#compound-operator-list-custom-list)
- [Compound Operator Alternate Texts](#compound-operator-alternate-texts)
- [Filter Complex Object](input-filter.md#how-to-filter-complex-objects)
- [Update Filters Dynamically](input-filter.md#update-filters-dynamically)
- [How to avoid filtering when only Operator dropdown is changed?](#how-to-avoid-filtering-when-only-operator-dropdown-is-changed)
- [Custom Filter Predicate](input-filter.md#custom-filter-predicate)
- [Filter Shortcuts](input-filter.md#filter-shortcuts)

### Description
Compound filters are a combination of 2 elements (Operator Select + Input Filter) used as a filter on a column. This is very useful to make it obvious to the user that there are Operator available and even more useful with a date picker (`Vanilla-Calendar`).

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/clientside) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-clientside.component.ts)

### Available Types
There are multiple types of compound filters available
1. `Filters.compoundInputText` adds an Operator combine to an Input of type `text` (alias to `Filters.compoundInput`).
2. `Filters.compoundInputNumber` adds an Operator combine to an Input of type `number`.
3. `Filters.compoundInputPassword` adds an Operator combine to an Input of type `password.
4. `Filters.compoundDate` adds an Operator combine to a Date Picker.
5. `Filters.compoundSlider` adds an Operator combine to a Slider Filter.

### How to use CompoundInput Filter
Simply set the flag `filterable` to True and use the filter type `Filters.compoundInput`. Here is an example with a full column definition:
```ts
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title' },
  { id: 'description', name: 'Description', field: 'description', filterable: true },
  { id: 'complete', name: '% Complete', field: 'percentComplete',
    formatter: Formatters.percentCompleteBar,
    type: 'number',
    filterable: true,
    filter: { model: Filters.compoundInput }
  }
];

// you also need to enable the filters in the Grid Options
this.gridOptions = {
   enableFiltering: true
};
```
#### Notes
The column definition `type` will affect the list of Operators shown, for example if you have `type: FieldType.string`, it will display the operators (`=`, `a*`, `*z`) where `a*` means StartsWith and `*z` means EndsWith. The current logic implemented is that any types that are not String, will display the list of Operators (` `, `=`, `<`, `<=`, `>`, `>=`, `<>`)


### How to use CompoundDate Filter
As any other columns, set the column definition flag `filterable: true` and use the filter type `Filters.compoundDate`. Here is an example with a full column definition:

```ts
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title' },
  { id: 'description', name: 'Description', field: 'description', filterable: true },
  { id: 'usDateShort', name: 'US Date Short', field: 'usDateShort',
    type: 'dateUsShort',
    filterable: true,
    filter: {
      model: Filters.compoundDate,

      // you can also add an optional placeholder
      placeholder: 'filter by date'
    }
  }
];

// you also need to enable the filters in the Grid Options
this.gridOptions = {
   enableFiltering: true
};
```

> **Note** we use [Tempo](https://tempo.formkit.com/) to parse and format Dates to the chosen format via the `type` option when provided in your column definition.

#### Dealing with different input/ouput dates (example: UTC)
What if your date input (from your dataset) has a different output on the screen (UI)?
In that case, you will most probably have a Formatter and type representing the input type, we also provided an `outputType` that can be used to deal with that case.

For example, if we have an input date in UTC format and we want to display a Date ISO format to the screen (UI) in the date picker.

```ts
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title' },
  { id: 'description', name: 'Description', field: 'description', filterable: true },
  { id: 'utcDate', name: 'UTC Date', field: 'utcDate',
    type: 'dateUtc',           // format used in the dataset (input)
    formatter: Formatters.dateTimeIso, // format to show in the cell on each row (formatter)
    outputType: 'dateTimeIso', // format to show in the date picker
    filterable: true, filter: { model: Filters.compoundDate }
  }
];

// you also need to enable the filters in the Grid Options
this.gridOptions = {
   enableFiltering: true
};
```

#### Date and Time
The date picker will automatically detect if the `type` or `outputType` has time inside, if it does then it will add a time picker at the bottom of the date picker.

For example, if we have an input date in UTC format and we want to display a Date ISO format with time to the screen (UI) and the date picker.

```ts
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title' },
  { id: 'description', name: 'Description', field: 'description', filterable: true },
  { id: 'utcDate', name: 'UTC Date', field: 'utcDate', // if your type has hours/minutes, then the date picker will include date+time
    type: 'dateUtc',
    formatter: Formatters.dateTimeIsoAmPm,
    outputType: 'dateTimeIsoAmPm',
    filterable: true, filter: { model: Filters.compoundDate }
  }
];

// you also need to enable the filters in the Grid Options
this.gridOptions = {
   enableFiltering: true
};
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

#### Grid Option `defaultFilterOptions
You could also define certain options as a global level (for the entire grid or even all grids) by taking advantage of the `defaultFilterOptions` Grid Option. Note that they are set via the filter type as a key name (`autocompleter`, `date`, ...) and then the content is the same as `filterOptions` (also note that each key is already typed with the correct filter option interface), for example

```ts
this.gridOptions = {
  defaultFilterOptions: {
    // Note: that `date`, `select` and `slider` are combining both compound & range filters together
    date: { range: { min: 'today' } },  // typed as VanillaCalendarOption
    select: { minHeight: 350 },         // typed as MultipleSelectOption
    slider: { sliderStartValue: 10 }
  }
}
```

### Compound Operator List (custom list)
Each Compound Filter will try to define the best possible Operator List depending on what Field Type you may have (for example we can have StartsWith Operator on a string but not on a number). If you want to provide your own custom Operator List to a Compound Filter, you can do that via the `compoundOperatorList` property (also note that your Operator must be a valid OperatorType/OperatorString).

```ts
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title' },
  { id: 'description', name: 'Description', field: 'description', filterable: true },
  { id: 'utcDate', name: 'UTC Date', field: 'utcDate',
    type: 'dateUtc',
    formatter: Formatters.dateTimeIsoAmPm,
    outputType: 'dateTimeIsoAmPm',
    filterable: true, filter: {
      model: Filters.compoundSlider,
      // here is our custom list that will override default list
      compoundOperatorList: [
        { operator: '', desc: '' },
        { operator: '=', desc: 'Equal to' },
        { operator: '<', desc: 'Less than' },
        { operator: '>', desc: 'Greater than' },
      ]
    }
  }
];
```

### Compound Operator Alternate Texts
You can change any of the compound operator text or description shown in the select dropdown list by using `compoundOperatorAltTexts` to provide alternate texts.

The texts are separated into 2 groups (`numeric` or `text`) so that the alternate texts can be applied to all assigned filters, hence the type will vary depending on which Filter you choose as shown below:
- `numeric`
  - `Filters.compoundDate`
  - `Filters.compoundInputNumber`
  - `Filters.compoundSlider`
- `text`
  - `Filters.compoundInput`
  - `Filters.compoundInputPassword`
  - `Filters.compoundInputText`

> **Note** avoid using text with more than 2 or 3 characters for the operator text (which is roughly the width of the compound operator select dropdown), exceeding this limit will require CSS style changes.

```ts
this.gridOptions = {
  compoundOperatorAltTexts: {
    // where '=' is any of the `OperatorString` type shown above
    numeric: { '=': { operatorAlt: 'eq', descAlt: 'alternate numeric equal description' } },
    text: { '=': { operatorAlt: 'eq', descAlt: 'alternate text equal description' } }
  },
}
```

![image](https://github.com/ghiscoding/slickgrid-universal/assets/643976/8f5cb431-d148-4c78-92fc-f1e3e48e64c4)

### How to avoid filtering when only Operator dropdown is changed?
Starting with version `>=2.1.x`, you can now enable `skipCompoundOperatorFilterWithNullInput` that can be provided to your Grid Options (or via global grid options) and/or your Column Definition.

What will this option do really?
- skip filtering (in other words do nothing) will occur when:
  - Operator select dropdown (left side) is changed without any value provided in the filter input (right).
- start filtering when:
  - Operator select dropdown is changed **and** we have a value provided in the filter input, it will start filtering
  - Operator select dropdown is empty **but** we have a value provided in the filter input, it will start filtering

> **Note** the Compound Date Filter is the only filter that has this option enabled by default.

###### Code
```ts
this.columnDefinitions = [{
  id: 'name', field: 'name',
  filter: {
    model: Filters.compoundInput,
    skipCompoundOperatorFilterWithNullInput: true // change via column def, always has higher specificity over grid options
  }
}];

// or change for all compound filters of the same grid
this.gridOptions = {
  skipCompoundOperatorFilterWithNullInput: true,
};
```