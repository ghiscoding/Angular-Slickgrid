#### index
- [Filter Complex Object](input-filter.md#filter-complex-object)
- [Update Filters Dynamically](input-filter.md#update-filters-dynamically)
- [Custom Filter with Angular Components](#custom-filter-with-angular-components)

### Demo
##### with plain javascript/jQuery
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/clientside) / [Demo Client Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-clientside.component.ts) / [Custom InputFilter.ts](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/custom-inputFilter.ts)

##### with Angular Component
[Demo](https://ghiscoding.github.io/Angular-Slickgrid/#/angular-components) / [Demo Client Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-angular.component.ts)

### Description
You can also create your own Custom Filter with any html/css you want and/or jQuery library you wish to use. Latest version now supports Custom Filter with Angular Component, see [Example 22](https://ghiscoding.github.io/Angular-Slickgrid/#/angular-components)

#### Limitations
- as mentioned in the description, only html/css and/or jQuery libraries are supported.
  - this mainly mean that Angular templates (components) are not supported (feel free to contribute).
- SlickGrid uses `table-cell` as CSS for it to display a consistent height for each rows (this keeps the same row height/line-height to always be the same).
  - all this to say that you might be in a situation were your filter shows in the back of the grid. The best approach to overcome this is to use a modal if you can or if the library support `append to body container`. For example, you can see that `multiple-select-vanilla` supports a `container`

### How to use Custom Filter?
1. You first need to create a `class` using the [Filter interface](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/filter.interface.ts). Make sure to create all necessary public properties and functions.
 - You can see a demo with a [custom-inputFilter.ts](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/custom-inputFilter.ts) that is used in the [demo - example 4](https://ghiscoding.github.io/Angular-Slickgrid/#/clientside)
2. Simply set the `columnDefinition.filter.model` to your new custom Filter class and instantiate it with `new` (you can also use dependency injection in the constructor if you wish). Here is an example with a custom input filter:
```typescript
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title' },
  { id: 'description', name: 'Description', field: 'description', type: FieldType.string,
    filterable: true,
    filter: {
       model: CustomInputFilter // create a new instance to make each Filter independent from each other
    }
  }
];

// you also need to enable the filters in the Grid Options
this.gridOptions = {
   enableFiltering: true
};
```

### Default Search Term(s)
If you want to load the grid with certain default filter(s), you can use the following optional properties:
- `searchTerms` (array of values)

For example, setting a default value into an `input` element, you can simply get the search term with `columnDef.filter.searchTerms` and set the default value in jquery with `$(filterElm).val(this.searchTerms);`

### Collection
If you want to pass a `collection` to your filter (for example, a multiple-select needs a select list of options), you can then use it in your custom filter through `columnDef.filter.collection`

#### `key/label` pair
By default a `collection` uses the `label/value` pair. You can loop through your `collection` and use the `label/value` properties. For example:
```typescript
// loop through collection to create select option
this.columnDef.filter.collection.forEach((option: SelectOption) => {
  // use the option value & label
  options += `<option value="${option.value}">${option.label}</option>`;
});
```

#### Custom Structure (key/label pair)
What if your `collection` have totally different value/label pair? In this case, you can use the `customStructure` to change the property name(s) to use. You can change the label and/or the value, they can be passed independently.
For example:
```typescript
// use custom structure value/label pair
const labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
const valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';

this.columnDef.filter.collection.forEach((option: SelectOption) => {
  // use the option value & translated label
  options += `<option value="${option[valueName]}">${option[labelName]}</option>`;
});
```

### How to add Translation?

#### LabelKey
By default a `collection` uses the `label/value` pair without translation or `labelKey/value` pair with translation usage. So if you want to use translations, then you can loop through your `collection` and use the `labelKey/value` properties. For example:
```typescript
this.columnDef.filter.collection.forEach((option: SelectOption) => {
  // translate label
  const textLabel = (option.labelKey && typeof this.i18n.tr === 'function') ? this.i18n.tr(option.labelKey || ' ') : option.labelKey;

  // use the option value & translated label
  options += `<option value="${option.value}">${textLabel}</option>`;
});
```

### Custom Structure with Translation
What if you want to use `customStructure` and translate the labels? Simply pass the flag `enableTranslateLabel: true`

For example:
```typescript
// use custom structure value/label pair
const labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
const valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';

this.columnDef.filter.collection.forEach((option: SelectOption) => {
  // translate label
  const textLabel = (option.labelKey && typeof this.i18n.tr === 'function') ? this.i18n.tr(option[labelName] || ' ') : option[labelName];

  // use the option value & translated label
  options += `<option value="${option[valueName]}">${textLabel}</option>`;
});
```

## Custom Filter with Angular Components
You can see them in [Example 22](https://ghiscoding.github.io/Angular-Slickgrid/#/angular-components) which have both Custom Editors & Filters which uses Angular Components. The 2nd column "Assignee" is the column that uses both (it uses `ng-select` 3rd party lib wrapped in an Angular Components [here](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/filter-ng-select.component.ts)) and you need to create a Custom Filter like [here](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/custom-angularComponentFilter.ts) and use that Custom Filter in your column definition like [here](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-angular.component.ts#L109).

Personally I don't find this very straightforward and I don't recommend using Angular Components for Editors/Filters as it adds a lot of boilerplate (compare to 1 step with a jQuery Custom Filter) but if you really wish to go that route, it's now possible following the steps shown below.

The steps to use an Angular Component as a Custom Filter are the following:
1. Create a Custom Filter that will handle the creation or compilation of the Angular Component into a SlickGrid Editors. For that you can take a look at this [Custom Filter](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/custom-angularComponentFilter.ts)
2. Define your Angular Component, for example take a look at this simple [ng-select Filter](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/filter-ng-select.component.ts)
3. Use the Custom Filter inside your Column Definitions, for that you can see previous paragraph [here](#how-to-use-custom-filter)