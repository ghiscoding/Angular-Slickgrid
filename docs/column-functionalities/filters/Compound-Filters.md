#### index
- [Available Types](#available-types)
- [SASS Styling](#sass-styling)
- [Compound Input Filter](#how-to-use-compoundinput-filter)
- [Compound Date Filter](#how-to-use-compounddate-filter)
  - [Filter Options (`FlatpickrOption` interface)](#filter-options-flatpickroption-interface)
- [Compound Operator List (custom list)](#compound-operator-list-custom-list)
- [Compound Operator Alternate Texts](#compound-operator-alternate-texts)
- [Filter Complex Object](../Input-Filter.md#how-to-filter-complex-objects)
- [Update Filters Dynamically](../Input-Filter.md#update-filters-dynamically)
- [How to avoid filtering when only Operator dropdown is changed?](#how-to-avoid-filtering-when-only-operator-dropdown-is-changed)

### Description
Compound filters are a combination of 2 elements (Operator Select + Input Filter) used as a filter on a column. This is very useful to make it obvious to the user that there are Operator available and even more useful with a date picker (`Flatpickr`).

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/clientside) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-clientside.component.ts)

### Available Types
There are multiple types of compound filters available
1. `Filters.compoundInputText` adds an Operator combine to an Input of type `text` (alias to `Filters.compoundInput`).
2. `Filters.compoundInputNumber` adds an Operator combine to an Input of type `number`.
3. `Filters.compoundInputPassword` adds an Operator combine to an Input of type `password.
4. `Filters.compoundDate` adds an Operator combine to a Date Picker (flatpickr).
5. `Filters.compoundSlider` adds an Operator combine to a Slider Filter.

### SASS Styling
You can change the `$flatpickr-bgcolor` and any of the `$compound-filter-X` SASS [variables](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/styles/_variables.scss#L660) for styling. For more info on how to use SASS in your project, read the [Wiki - Styling](../../styling/styling.md)

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
Again set the column definition flag `filterable: true` and use the filter type `Filters.compoundDate`. Here is an example with a full column definition:
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
  { id: 'utcDate', name: 'UTC Date', field: 'utcDate',
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

#### Filter Options (`FlatpickrOption` interface)
All the available options that can be provided as `filterOptions` to your column definitions can be found under this [FlatpickrOption interface](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/flatpickrOption.interface.ts) and you should cast your `filterOptions` to that interface to make sure that you use only valid options of the [Flatpickr](https://flatpickr.js.org/) library.

```ts
filter: {
  model: Filters.compoundDate,
  filterOptions: {
    minDate: 'today'
  } as FlatpickrOption
}
```

### Date Picker - Flatpickr Localization
In order to use different locale, you will have to import whichever Flatpickr locale you need. The best place to do these imports is in your App Module so it's global and you do it only once. In some rare cases it might not be sufficient, you move the import into your first entry component, typically the App Component

```ts
import { AngularSlickgridModule } from 'angular-slickgrid';

// load necessary Flatpickr Locale(s), but make sure it's imported AFTER the SlickgridModule import
import 'flatpickr/dist/l10n/fr';

@NgModule({
  declarations: [/*...*/],
  imports: [
    // ...
    AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want
    })
  ],
  providers: [/*...*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

or in the App Component
```ts
import { Component } from '@angular/core';
import 'flatpickr/dist/l10n/fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular SlickGrid Demo';
}
```

#### Grid Option `defaultFilterOptions
You could also define certain options as a global level (for the entire grid or even all grids) by taking advantage of the `defaultFilterOptions` Grid Option. Note that they are set via the filter type as a key name (`autocompleter`, `date`, ...) and then the content is the same as `filterOptions` (also note that each key is already typed with the correct filter option interface), for example

```ts
this.gridOptions = {
  defaultFilterOptions: { 
    // Note: that `date`, `select` and `slider` are combining both compound & range filters together
    date: { minDate: 'today' },
    select: { minHeight: 350 }, // typed as MultipleSelectOption
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
        { operator: '', description: '' },
        { operator: '=', description: 'Equal to' },
        { operator: '<', description: 'Less than' },
        { operator: '>', description: 'Greater than' },
      ]
    }
  }
];
```

### Compound Operator Alternate Texts
You can change any of the compound operator text or description shown in the select dropdown list by using `compoundOperatorAltTexts` to provide alternate texts.

**Note** make sure to not use more than 2 or 3 characters for the operator text, exceeding that will require CSS style changes.

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