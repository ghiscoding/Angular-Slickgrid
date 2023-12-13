### index
- [demo](#demo)
- [SASS styling](#sass-styling)
- [How to use Select Filter](#how-to-use-select-filter)
- [Default Search Terms](#default-search-terms)
- [How to add Translation](#how-to-add-translation)
- [How to filter empty values](#how-to-filter-empty-values)
- Collection Options
   - [Add Blank Entry](#collection-add-blank-entry)
   - [Add Custom Entry at Beginning/End of Collection](#collection-add-custom-entry-at-the-beginningend-of-the-collection)
   - [Custom Structure](#custom-structure-keylabel-pair)
   - [Custom Structure with Translation](#custom-structure-with-translation)
   - [Collection filterBy/sortBy](#collection-filterbysortby)
   - [Collection Label Prefix/Suffix](#collection-label-prefixsuffix)
   - [Collection Label Render HTML](#collection-label-render-html)
   - [Collection Async Load](#collection-async-load)
   - [Collection Watch](#collection-watch)
- [`multiple-select.js` Options](#multiple-selectjs-options)
  - [Filter Options (`MultipleSelectOption` interface)](#filter-options-multipleselectoption-interface)
  - [Display shorter selected label text](#display-shorter-selected-label-text)
- [Query against a different field](#query-against-another-field-property)
- [Update Filters Dynamically](Input-Filter.md#update-filters-dynamically)

### Demo
[Demo Page](https://ghiscoding.github.io/slickgrid-universal/#/example10) / [Demo Component](https://github.com/ghiscoding/slickgrid-universal/blob/master/examples/webpack-demo-vanilla-bundle/src/examples/example10.ts)

### Description
Multiple Select (dropdown) filter is useful when we want to filter the grid 1 or more search term value.

#### Note
For this filter to work you will need to add [Multiple-Select.js](http://wenzhixin.net.cn/p/multiple-select) to your project. This is a customized version of the original (thought all the original [lib options](http://wenzhixin.net.cn/p/multiple-select/docs/) are available so you can still consult the original site for all options). Couple of small options were added to suit SlickGrid-Universal needs, which is why it points to `slickgrid-universal/dist/lib` folder. This lib is required if you plan to use `multipleSelect` or `singleSelect` Filters. What was customized to (compare to the original)
- `okButton` option was added to add an OK button for simpler closing of the dropdown after selecting multiple options.
  - `okButtonText` was also added for locale (i18n)
- `offsetLeft` option was added to make it possible to offset the dropdown. By default it is set to 0 and is aligned to the left of the select element. This option is particularly helpful when used as the last right column, not to fall off the screen.
- `autoDropWidth` option was added to automatically resize the dropdown with the same width as the select filter element.

##### UI Sample
Scroll down below to see the [UI Print Screens](#ui-sample-1)

### Types
There are 3 types of select filter
1. `Filters.singleSelect` which will filter the dataset with 1 value (uses `EQ` internally) with checkbox icons.
2. `Filters.multipleSelect` which will do a search with 1 or more values (uses `IN` internally) with radio icons.

##### Less recommended
3. `Filters.select` which will filter the dataset with 1 value (uses `EQ` internally), same as `singleSelect` but uses styling from the browser setup.
  - this one is less recommended, it is a simple and plain select dropdown. There are no styling applied and will be different in every browser. If you want a more consistent visual UI, it's suggested to use the other 2 filters (`multipleSelect` or `singleSelect`)

### SASS Styling
You can change the `multipleSelect` and `singleSelect` styling with SASS [variables](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/styles/_variables.scss#L736) for styling. For more info on how to use SASS in your project, read the [Wiki - Styling](/ghiscoding/slickgrid-universal/wiki/Styling)

### How to use Select Filter
Simply set the flag `filterable` to True and and enable the filters in the Grid Options. Here is an example with a full column definition:
```ts
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title' },
  { id: 'description', name: 'Description', field: 'description', filterable: true },
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: [ { value: '', label: '' }, { value: true, label: 'true' }, { value: false, label: 'false' } ],
       model: Filters.multipleSelect,

       // you can add "multiple-select" plugin options like styling the first row
       filterOptions: {
          offsetLeft: 14,
          width: 100
       } as MultipleSelectOption,

       // you can also add an optional placeholder
       placeholder: 'choose an option'
   }
];

// you also need to enable the filters in the Grid Options
this.gridOptions = {
   enableFiltering: true
};
```

### Default Search Term(s)
If you want to load the grid with certain default filter(s), you can use the following optional property:
- `searchTerms` (array of values)

#### Note
Even though the option of `searchTerms` it is much better to use the more powerful `presets` grid options, please refer to the [Grid State & Presets](../../grid-functionalities/Grid-State-&-Preset#grid-presets) for more info.

**NOTE**
If you also have `presets` in the grid options, then your `searchTerms` will be ignored completely (even if it's a different column) since `presets` have higher priority over `searchTerms`. See [Grid State & Grid Presets](../../grid-functionalities/Grid-State-&-Preset.md) from more info.

#### Sample
```ts
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title' },
  { id: 'description', name: 'Description', field: 'description', filterable: true },
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: [ { value: '', label: '' }, { value: true, label: 'true' }, { value: false, label: 'false' } ],
       model: Filters.multipleSelect,
       searchTerms: [true],
   }
];
```

### How to add Translation?
#### LabelKey
For the Select (dropdown) filter, you can fill in the "labelKey" property, if found it will translate it right away. If no `labelKey` is provided nothing will be translated (unless you have `enableTranslateLabel` set to true), else it will use "label"
```typescript
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmark,
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: [ { value: '', label: '' }, { value: true, labelKey: 'TRUE' }, { value: false, label: 'FALSE' } ],
       model: Filters.singleSelect,
   }
];
```

#### enableTranslateLabel
You could also use the `enableTranslateLabel` which will translate regardless of the label key name (so it could be used with `label`, `labelKey` or even a `customStructure` label).
```typescript
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmark,
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: [ { value: '', label: '' }, { value: true, label: 'true' }, { value: false, label: 'false' } ],
       model: Filters.singleSelect,
       enableTranslateLabel: true
   }
];
```

### Custom Structure (key/label pair)
What if your select options (collection) have totally different value/label pair? In this case, you can use the `customStructure` to change the property name(s) to use. You can change the label and/or the value, they can be passed independently.
```typescript
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmark,
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: [
         { customValue: '', customLabel: '' },
         { customValue: true, customLabel: 'true' },
         { customValue: false, customLabel: 'false' }
       ],
       customStructure: {
         label: 'customLabel',
         value: 'customValue'
       },
       model: Filters.multipleSelect,
   }
];
```

### Custom Structure with Translation
What if you want to use `customStructure` and translate the labels? Simply pass the flag `enableTranslateLabel: true`

```typescript
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmark,
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: [
         { customValue: '', customLabel: '' },
         { customValue: true, customLabel: 'TRUE' },
         { customValue: false, customLabel: 'FALSE' }
       ],
       customStructure: {
         label: 'customLabel',
         value: 'customValue'
       },
       enableTranslateLabel: true,
       model: Filters.multipleSelect,
   }
];
```

### How to filter empty values?
By default you cannot filter empty dataset values (unless you use a `multipleSelect` Filter). You might be wondering, why though? By default an empty value in a `singleSelect` Filter is equal to returning **all values**. You could however use this option `emptySearchTermReturnAllValues` set to `false` to add the ability to really search only empty values.

Note: the defaults for single & multiple select filters are different
- single select filter default is `emptySearchTermReturnAllValues: true`
- multiple select filter default is `emptySearchTermReturnAllValues: false`

```ts
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmark,
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: [ { value: '', label: '' }, { value: true, labelKey: 'TRUE' }, { value: false, label: 'FALSE' } ],
       model: Filters.singleSelect,
       emptySearchTermReturnAllValues: false, // False when we really want to filter empty values
   }
];
```

### Collection FilterBy/SortBy
You can also pre-sort or pre-filter the collection given to the multipleSelect/singleSelect Filters. Also note that if the `enableTranslateLabel` flag is set to `True`, it will use the translated value to filter or sort the collection. The supported filters are
1. `equal`: filters the collection for only the value provided in `collectionFilterBy.value`
2. `notEqual`: filters the collection for every value **EXCEPT** the value provided in `collectionFilterBy.value`
3. `in`: supports `collectionFilterBy.property` as a nested array, and if the `collectionFilterBy.value` exists in the nested array, the parent item will remain in the collection (**NOT** be filtered from the collection). For example: `columnDef.filter.collection: [{ foo: ['bar'] }, { foo: ['foo'] }]`, `collectionFilterBy.property: 'foo'`, `collectionFilterBy.value: 'bar'` will return the first item in the collection only
4. `notIn`:opposite of `in`
5. `contains`: assumes the `collectionFilterBy.value` is an array and will check if any of those values exists in the `collectionFilterBy.property`. For example: `collection: [{ foo: 'bar' }, { foo: 'foo' }]`, `collectionFilterBy.property: 'foo'`, `collectionFilterBy.value: [ 'bar', 'foo' ]` will return bot items

Full example:
```typescript
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmark,
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: [
         { value: '', label: '' },
         { value: true, label: 'true' },
         { value: false, label: 'false' },
         { value: undefined, label: 'undefined' }
       ],
       collectionFilterBy: {
          property: 'effortDriven',
          operator: OperatorType.notEqual,
          value: undefined
       },
       collectionSortBy: {
          property: 'effortDriven',    // will sort by translated value since "enableTranslateLabel" is true
          sortDesc: false,             // defaults to "false" when not provided
          fieldType: FieldType.boolean // defaults to FieldType.string when not provided
       },
       model: Filters.multipleSelect
   }
];
```

#### Multiple FilterBy/SortBy
You can also pass multiple `collectionFilterBy` or `collectionSortBy` simply by changing these object to array of objects.

```typescript
// prepare a multiple-select array to filter with
const multiSelectFilterArray = [];
for (let i = 0; i < 365; i++) {
  multiSelectFilterArray.push({ value: i, label: i, labelSuffix: ' days' });
}

this.columnDefinitions = [
  { id: 'duration', name: 'Duration', field: 'duration',
    formatter: Formatters.checkmark,
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: multiSelectFilterArray,
       collectionFilterBy: [{
          property: 'value',
          operator: OperatorType.notEqual, // remove day 1
          value: 1
       }, {
          property: 'value',
          operator: OperatorType.notEqual, // remove day 365
          value: 365
       }],
       model: Filters.multipleSelect
     }
   }
];
```
However please note that by default the `collectionFilterBy` will **not** merge the result after each pass, it will instead chain them and use the new returned collection after each pass (which means that if original collection is 100 items and 20 items are returned after 1st pass, then the 2nd pass will filter out of these 20 items and so on).

What if you wanted to merge the results instead? Then in this case, you can change the `filterResultAfterEachPass` flag defined in `collectionOptions

```typescript
this.columnDefinitions = [
  { id: 'duration', name: 'Duration', field: 'duration',
    filter: {
      collection: [yourCollection],
      collectionFilterBy: [
        // ...
      ],
      collectionOptions: {
        filterResultAfterEachPass: 'chain' // options are "merge" or "chain" (defaults to "chain")
      },
      model: Filters.multipleSelect
    }
  }
];
```

#### LabelPrefix / LabelSuffix
`labelPrefix` and `labelSuffix` were recently added, they are also supported by the `customStructure` and can also be overridden. See [Collection Label Prefix/Suffix](#collection-label-prefixsuffix)

### Custom Structure with Translation
What if you want to use `customStructure` and translate the labels? Simply pass the flag `enableTranslateLabel: true`

```typescript
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmark,
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: [
         { customValue: '', customLabel: '' },
         { customValue: true, customLabel: 'TRUE' },
         { customValue: false, customLabel: 'FALSE' }
       ],
       customStructure: {
         label: 'customLabel',
         value: 'customValue'
       },
       enableTranslateLabel: true,
       model: Filters.multipleSelect,
   }
];
```

### Collection FilterBy/SortBy
You can also pre-sort or pre-filter the collection given to the multipleSelect/singleSelect Filters. Also note that if the `enableTranslateLabel` flag is set to `True`, it will use the translated value to filter or sort the collection. For example:
```typescript
// define you columns, in this demo Effort Driven will use a Select Filter
this.columnDefinitions = [
  { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmark,
    type: FieldType.boolean,
    filterable: true,
    filter: {
       collection: [
         { value: '', label: '' },
         { value: true, label: 'true' },
         { value: false, label: 'false' },
         { value: undefined, label: 'undefined' }
       ],
       collectionFilterBy: {
          property: 'effortDriven',
          operator: OperatorType.equal, // defaults to equal when not provided
          value: undefined
       },
       collectionSortBy: {
          property: 'effortDriven',    // will sort by translated value since "enableTranslateLabel" is true
          sortDesc: false,             // defaults to "false" when not provided
          fieldType: FieldType.boolean // defaults to FieldType.string when not provided
       },
       model: Filters.multipleSelect
   }
];
```

### Collection Label Prefix/Suffix
You can use `labelPrefix` and/or `labelSuffix` which will concatenate the multiple properties together (`labelPrefix` + `label` + `labelSuffix`) which will used by each Select Filter option label. You can also use the property `separatorBetweenTextLabels` to define a separator between prefix, label & suffix.

**Note**
If `enableTranslateLabel` flag is set to `True`, it will also try to translate the Prefix / Suffix / OptionLabel texts.

For example, say you have this collection
```typescript
const currencies = [
  { symbol: '$', currency: 'USD', country: 'USA' },
  { symbol: '$', currency: 'CAD', country: 'Canada' }
];
```

You can display all of these properties inside your dropdown labels, say you want to show (symbol with abbreviation and country name). Now you can.

So you can create the  `multipleSelect` Filter with a `customStructure` by using the symbol as prefix, and country as suffix. That would make up something like this:
- $ USD USA
- $ CAD Canada

with a `customStructure` defined as
```typescript
filter: {
  collection: this.currencies,
  customStructure: {
    value: 'currency',
    label: 'currency',
    labelPrefix: 'symbol',
    labelSuffix: 'country',
  },
  collectionOptions: {
    separatorBetweenTextLabels: ' ' // add white space between each text
  },
  model: Filters.multipleSelect
}
```


### Collection Label Render HTML
By default HTML is not rendered and the `label` will simply show HTML as text. But in some cases you might want to render it, you can do so by enabling the `enableRenderHtml` flag.

**NOTE:** this is currently only used by the Filters that have a `collection` which are the `MultipleSelect` & `SingleSelect` Filters.

```typescript
this.columnDefinitions = [
  {
    id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmark,
    type: FieldType.boolean,
    filterable: true,
    filter: {
      // display checkmark icon when True
      enableRenderHtml: true,
      collection: [{ value: '', label: '' }, { value: true, label: 'True', labelPrefix: `<i class="fa fa-check"></i> ` }, { value: false, label: 'False' }],
      model: Filters.singleSelect
    }
  }
];
```

#### Change Default DOMPurify Options (sanitize html)
If you find that the HTML that you passed is being sanitized and you wish to change it, then you can change the default `sanitizeHtmlOptions` property defined in the Global Grid Options, for more info on how to change these global options, see the [Wiki - Global Grid Options](/ghiscoding/slickgrid-universal/wiki/Global-Options) and also take a look at the [GitHub - DOMPurify](https://github.com/cure53/DOMPurify#can-i-configure-it) configurations.


### Collection Add Blank Entry
In some cases a blank entry at the beginning of the collection could be useful, the most common example for this is to use the first option as a blank entry to tell our Filter to show everything. So for that we can use the `addBlankEntry` flag in `collectionOptions

```typescript
this.columnDefinitions = [
  { id: 'duration', name: 'Duration', field: 'duration',
    filter: {
      collection: [yourCollection],
      collectionOptions: {
        addBlankEntry: true
      },
      model: Filters.multipleSelect
    }
  }
];
```

### Collection Add Custom Entry at the Beginning/End of the Collection
We can optionally add a custom entry at the beginning of the collection, the most common example for this is to use the first option as a blank entry to tell our Filter to show everything. So for that we can use the `addCustomFirstEntry` or `addCustomLastEntry` flag in `collectionOptions

```typescript
this.columnDefinitions = [
  { id: 'duration', name: 'Duration', field: 'duration',
    filter: {
      collection: [yourCollection],
      collectionOptions: {
        addCustomFirstEntry: { value: '', label: '--n/a--' }

        // or at the end
        addCustomLastEntry: { value: 'end', label: 'end' }
      },
      model: Filters.multipleSelect
    }
  }
];
```

### Collection Async Load
You can also load the collection asynchronously, but for that you will have to use the `collectionAsync` property, which expect a Promise to be passed (it actually accepts 3 types: `HttpClient`, `FetchClient` or regular `Promise`).

#### Load the collection through an Http call

```ts
this.columnDefinitions = [
    {
    id: 'prerequisites', name: 'Prerequisites', field: 'prerequisites',
    filterable: true,
    filter: {
      collectionAsync: this.http.fetch('api/data/pre-requisites'),
      model: Filters.multipleSelect,
    }
  }
];
```

#### Using Async Load when Collection is inside an Object Property
What if my collection is nested under the response object? For that you can use `collectionInsideObjectProperty` to let the filter know how to get the collection.

```ts
this.columnDefinitions = [
    {
    id: 'prerequisites', name: 'Prerequisites', field: 'prerequisites',
    filterable: true,
    filter: {
      model: Filters.multipleSelect,

      // this async call will return the collection inside the response object in this format
      // { data: { myCollection: [ /*...*/ ] } }
      collectionAsync: this.http.fetch('api/data/pre-requisites'),
      collectionOptions: {
        collectionInsideObjectProperty: 'data.myCollection' // with/without dot notation
      }
    }
  }
];
```

#### Modifying the collection afterward
If you want to modify the `collection` afterward, you simply need to find the associated Column reference from the Column Definition and modify the `collection` property (not `collectionAsync` since that is only meant to be used on page load).

For example
```ts
  addItem() {
    const lastRowIndex = this.dataset.length;
    const newRows = this.mockData(1, lastRowIndex);

    // wrap into a timer to simulate a backend async call
    setTimeout(() => {
      const requisiteColumnDef = this.columnDefinitions.find((column: Column) => column.id === 'prerequisites');
      if (requisiteColumnDef) {
        const filterCollection = requisiteColumnDef.filter.collection;

        if (Array.isArray(collectionFilterAsync)) {
          // add the new row to the grid
          this.aureliaGrid.gridService.addItemToDatagrid(newRows[0]);

          // then refresh the Filter "collection", we have 2 ways of doing it

          // 1- Push to the Filter "collection"
          filterCollection.push({ value: lastRowIndex, label: lastRowIndex, prefix: 'Task' });

          // or 2- replace the entire "collection"
          filterCollection = [...collection, ...[{ value: lastRowIndex, label: lastRowIndex }]];
        }
      }
    }, 250);
  }
```

### Collection Watch
We can enable the collection watch via the column filter `enableCollectionWatch` flag, or if you use a `collectionAsync` then this will be enabled by default. The collection watch will basically watch for any changes applied to the collection (any mutation changes like `push`, `pop`, `unshift`, ...) and will also watch for the `filter.collection` array replace, when any changes happens then it will re-render the Select Filter with the updated collection list.

```ts
this.columnDefinitions = [
  {
    id: 'title', name: 'Title', field: 'title',
    filterable: true,
    filter: {
      collection: [ /* ... */ ],
      model: Filters.singleSelect,
      enableCollectionWatch: true,
    }
  }
];
```

### Filter Options (`MultipleSelectOption` interface)
All the available options that can be provided as `filterOptions` to your column definitions can be found under this [multipleSelectOption interface](/ghiscoding/slickgrid-universal/tree/master/packages/common/src/interfaces/multipleSelectOption.interface.ts) and you should cast your `filterOptions` to that interface to make sure that you use only valid options of the `multiple-select.js` library.

```ts
filter: {
  model: Filters.singleSelect,
  filterOptions: {
    maxHeight: 400
  } as MultipleSelectOption
}
```

### Multiple-select.js Options
You can use any options from [Multiple-Select.js](http://wenzhixin.net.cn/p/multiple-select) and add them to your `filterOptions` property. However please note that this is a customized version of the original (all original [lib options](http://wenzhixin.net.cn/p/multiple-select/docs/) are available so you can still consult the original site for all options).

Couple of small options were added to suit SlickGrid-Universal needs, which is why we are using a fork [ghiscoding/multiple-select-modified](https://github.com/ghiscoding/multiple-select-modified) folder (which is our customized version of the original). This lib is required if you plan to use `multipleSelect` or `singleSelect` Filters. What was customized to (compare to the original) is the following:
- `okButton` option was added to add an OK button for simpler closing of the dropdown after selecting multiple options.
  - `okButtonText` was also added for locale (i18n)
- `offsetLeft` option was added to make it possible to offset the dropdown. By default it is set to 0 and is aligned to the left of the select element. This option is particularly helpful when used as the last right column, not to fall off the screen.
- `autoDropWidth` option was added to automatically resize the dropdown with the same width as the select filter element.
- `autoAdjustDropHeight` (defaults to true), when set will automatically adjust the drop (up or down) height
- `autoAdjustDropPosition` (defaults to true), when set will automatically calculate the area with the most available space and use best possible choise for the drop to show (up or down)
- `autoAdjustDropWidthByTextSize` (defaults to true), when set will automatically adjust the drop (up or down) width by the text size (it will use largest text width)
- to extend the previous 3 autoAdjustX flags, the following options can be helpful
   - `minWidth` (defaults to null, to use when `autoAdjustDropWidthByTextSize` is enabled)
   - `maxWidth` (defaults to 500, to use when `autoAdjustDropWidthByTextSize` is enabled)
   - `adjustHeightPadding` (defaults to 10, to use when `autoAdjustDropHeight` is enabled), when using `autoAdjustDropHeight` we might want to add a bottom (or top) padding instead of taking the entire available space
   - `maxHeight` (defaults to 275, to use when `autoAdjustDropHeight` is enabled)
- useSelectOptionLabel` to show different selected label text (on the input select element itself)
   - `useSelectOptionLabelToHtml` is also available if you wish to render label text as HTML for these to work, you have define the `optionLabel` in the `customStructure`

##### Code
```typescript
this.columnDefinitions = [
  {
    id: 'isActive', name: 'Is Active', field: 'isActive',
    filterable: true,
    filter: {
      collection: [{ value: '', label: '' }, { value: true, label: 'true' }, { value: false, label: 'false' }],
      model: Filters.singleSelect,
      filterOptions: {
        // add any multiple-select.js options (from original or custom version)
        autoAdjustDropPosition: false, // by default set to True, but you can disable it
        position: 'top'
      } as MultipleSelectOption
    }
  }
];
```

#### Display shorter selected label text
If we find that our text shown as selected text is too wide, we can choose change that by using `optionLabel` in Custom Structure.
```typescript
this.columnDefinitions = [
  {
    id: 'isActive', name: 'Is Active', field: 'isActive',
    filterable: true,
    filter: {
      collection: [
        { value: 1, label: '1', suffix: 'day' },
        { value: 2, label: '2', suffix: 'days' },
        { value: 3, label: '3', suffix: 'days' },
        // ...
      ],
      model: Filters.multipleSelect,
      customStructure: {
        label: 'label',
        labelSuffix: 'suffix',
        value: 'value',
        optionLabel: 'value', // use value instead to show "1, 2" instead of "1 day, 2 days"
      },
      filterOptions: {
        // use different label to show as selected text
        // please note the Custom Structure with optionLabel defined
        // or use "useSelectOptionLabelToHtml" to render HTML
        useSelectOptionLabel: true
      } as MultipleSelectOption
    }
  }
];
```

### Query against another field property
What if your grid is displaying a certain `field` but you wish to query against another field? Well you could do that with 1 of the following 3 options:
- `queryField` (query on a specific field for both the Filter and Sort)
- `queryFieldFilter` (query on a specific field for only the Filter)
- `queryFieldSorter` (query on a specific field for only the Sort)

##### Example
```ts
this.columnDefinitions = [
  {
    id: 'salesRepName',
    field: 'salesRepName',          // display in Grid the sales rep name with "field"
    queryFieldFilter: 'salesRepId', // but query against a different field for our multi-select to work
    filterable: true,
    filter: {
      collection: this.salesRepList, // an array of Sales Rep
      model: Filters.multipleSelect,
      customStructure: {
        label: 'salesRepName',
        value: 'salesRepId'
      }
    }
  }
];
```
