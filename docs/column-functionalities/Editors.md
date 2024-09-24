#### index
- [Inline Editors](#how-to-use-inline-editors)
   - [Demo with Float Editor & Dollar Formatter](#demo-with-float-editor-and-dollar-currency-formatter)
   - [Editor `outputType` and `saveOutputType`](#editor-output-type--save-output-type)
   - [Custom Editor](#custom-inline-editor)
- [Perform an Action after Inline Edit](#perform-an-action-after-inline-edit)
- [How to prevent Editor from going to the next bottom cell](#how-to-prevent-editor-from-going-to-the-next-bottom-cell)
- [onClick Action Editor (icon click)](#onclick-action-editor-icon-click)
- [AutoComplete Editor](editors/AutoComplete-Editor.md)
- [Select (single/multi) Editors](editors/Select-Dropdown-Editor-(single,multiple).md)
- [Editor Options](#editor-options)
- [Validators](#validators)
   - [Custom Validator](#custom-validator)
- [Disabling specific cell Edit](#disabling-specific-cell-edit)
- [Editors on Mobile Phone](#editors-on-mobile-phone)
- [Dynamically Change Column Editor](#dynamically-change-column-editor)

## Description
`Slickgrid-Universal` ships with a few default inline editors (checkbox, dateEditor, float, integer, text, longText).

**Note:** For the Float Editor, you can provide decimal places with `params: { decimals: 2 }` to your column definition else it will be 0 decimal places by default.

### Required Grid Option
Editors won't work without these 2 flags `enableCellNavigation: true` and `editable: true` enabled in your Grid Options, so make sure to always to always defined them. Also note that you can toggle the grid to read only (not editable) via the `editable` grid option flag.

### Demo
##### with plain javascript/jQuery
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/editor) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-editor.component.ts)

##### with Angular Component
[Demo](https://ghiscoding.github.io/Angular-Slickgrid/#/angular-components) / [Demo Client Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-angular.component.ts)

### How to use Inline Editors
Simply call the editor in your column definition with the `Editors` you want, as for example (`editor: { model: Editors.text }`). Here is an example with a full column definition:
```ts
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'title', type: FieldType.string, editor: { model: Editors.longText } },
  { id: 'duration', name: 'Duration (days)', field: 'duration', type: FieldType.number, editor: { model: Editors.text } },
  { id: 'complete', name: '% Complete', field: 'percentComplete', type: FieldType.number, editor: { model: Editors.integer } },
  { id: 'start', name: 'Start', field: 'start', type: FieldType.date, editor: { model: Editors.date } },
  {
    id: 'finish', name: 'Finish', field: 'finish', type: FieldType.date,
    editor: {
      model: Editors.date,

      // you can also add an optional placeholder
      placeholder: 'choose a date'
    }
  },
  {
    id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', formatter: Formatters.checkmarkMaterial,
    type: FieldType.number, editor: { model: Editors.checkbox }
  }
];

this.gridOptions {
  enableCellNavigation: true, // <<-- VERY IMPORTANT, it won't work without this flag enabled
  editable: true,
};
```

#### Demo with Float Editor and Dollar Currency Formatter
This probably comes often, so here's all the setting you would need for displaying & editing a dollar currency value with 2 decimal places.
```ts
this.columnDefinitions = [
  {
    id: 'cost', name: 'Cost', field: 'cost',
    type: FieldType.float,
    formatter: Formatters.dollar, // the Dollar Formatter will default to 2 decimals unless you provide a minDecimal/maxDecimal
    // params: { minDecimal: 2, maxDecimal: 4, }, // optionally provide different decimal places

    // the float editor has its own settings, `decimal` that will be used only in the editor
    // note: that it has nothing to do with the Dollar Formatter
    editor: { model: Editors.float, decimal: 2 },
  },
];
```

#### Editor Output Type & Save Output Type
You could also define an `outputType` and a `saveOutputType` to an inline editor. There is only 1 built-in Editor with this functionality for now which is the `dateEditor`. For example, on a date field, we can call this `outputType: FieldType.dateIso` (by default it uses `dateUtc` as the output):
```typescript
this.columnDefinitions = [
 {
   id: 'start', name: 'Start', field: 'start',
   type: FieldType.date,
   editor: { model: Editors.date },
   type: FieldType.date,              // dataset cell input format
   // outputType: FieldType.dateUs,   // date picker format
   saveOutputType: FieldType.dateUtc, // save output date format
  }
];
```

So to make it more clear, the `saveOutputType` is the format that will be sent to the `onCellChange` event, then the `outputType` is how the date will show up in the date picker (Vanilla-Calendar) and finally the `type` is basically the input format (coming from your dataset). Note however that each property are cascading, if 1 property is missing it will go to the next one until 1 is found... for example, on the `onCellChange` if you aren't defining `saveOutputType`, it will try to use `outputType`, if again none is provided it will try to use `type` and finally if none is provided it will use `FieldType.dateIso` as the default.

## AutoComplete Editor
The AutoComplete Editor has the same configuration (except for the `model: Editors.autoComplete`) as the AutoComplete Filter, so you can refer to the [AutoComplete Filter Wiki](filters/Autocomplete-Filter-(Kraaden-lib).md) for more info on how to use it.

## Select Editors
The library ships with two select editors: `singleSelectEditor` and the `multipleSelectEditor`. Both support the [Multiple-Select-Vanilla](https://github.com/ghiscoding/multiple-select-vanilla) library, but fallback to the bootstrap form-control style if you decide to exclude this library from your build. These editors will work with a list of foreign key values (custom structure not supported) and can be displayed properly with the [collectionFormatter](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/formatters/collectionFormatter.ts). [example 3](https://ghiscoding.github.io/Angular-Slickgrid/#/editor) has all the details for you to get started with these editors.

Here's an example with a `collection`, `collectionFilterBy` and `collectionSortBy`

```typescript
this.columnDefinitions = [
  {
    id: 'prerequisites', name: 'Prerequisites', field: 'prerequisites',
    type: FieldType.string,
    editor: {
      model: Editors.multipleSelect,
      collection: Array.from(Array(12).keys()).map(k => ({ value: `Task ${k}`, label: `Task ${k}` })),
      collectionSortBy: {
        property: 'label',
        sortDesc: true
      },
      collectionFilterBy: {
        property: 'label',
        value: 'Task 2'
      }
    }
  }
];
```

### Editor Options (`MultipleSelectOption` interface)
All the available options that can be provided as `editorOptions` to your column definitions can be found under this [multipleSelectOption interface](https://ghiscoding.github.io/multiple-select-vanilla/) and you should cast your `editorOptions` to that interface to make sure that you use only valid options of the `multiple-select-vanilla` library.

```ts
editor: {
  model: Editors.SingleSelect,
  editorOptions: {
    maxHeight: 400
  } as MultipleSelectOption
}
```

### Collection Async Load
You can also load the collection asynchronously, but for that you will have to use the `collectionAsync` property, which expect an Observable (`HttpClient`) to be passed.

#### Load the collection through an Http call

```typescript
this.columnDefinitions = [
    {
    id: 'prerequisites', name: 'Prerequisites', field: 'prerequisites',
    filterable: true,
    editor: {
      collectionAsync: this.http.get<{ value: string; label: string; }[]>('api/data/pre-requisites'),
      model: Editors.multipleSelect,
    }
  }
];
```

#### Modifying the collection afterward
If you want to modify the `collection` afterward (can be `collection` or even `collectionAsync`), you can simply push or modify the `collection` directly. You just need to find in your Column Definition and Angular-Slickgrid will take care of the rest for you.

For example
```typescript
  addItem() {
    const lastRowIndex = this.dataset.length;
    const newRows = this.mockData(1, lastRowIndex);

    // wrap into a timer to simulate a backend async call
    setTimeout(() => {
      const requisiteColumnDef = this.columnDefinitions.find((column: Column) => column.id === 'prerequisites');
      if (requisiteColumnDef) {
        const collection = requisiteColumnDef.editor.collection;

        if (Array.isArray(collection )) {
          // add the new row to the grid
          this.angularGrid.gridService.addItemToDatagrid(newRows[0]);

          // then refresh the Filter "collection", we have 2 ways of doing it

          // 1- Push to the Filter "collection"
          collection.push({ value: lastRowIndex, label: lastRowIndex, prefix: 'Task' });

          // or 2- replace the entire "collection"
          // requisiteColumnDef.editor.collection = [...collection, ...[{ value: lastRowIndex, label: lastRowIndex }]];
        }
      }
    }, 250);
  }
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
editor: {
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
  model: Editors.multipleSelect
}
```

### Collection Label Render HTML
By default HTML is not rendered and the `label` will simply show HTML as text. But in some cases you might want to render it, you can do so by enabling the `enableRenderHtml` flag.

**NOTE:** this is currently only used by the Editors that have a `collection` which are the `MultipleSelect` & `SingleSelect` Editors.

```typescript
this.columnDefinitions = [
  {
    id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmarkMaterial,
    type: FieldType.boolean,
    editor: {
      // display checkmark icon when True
      enableRenderHtml: true,
      collection: [{ value: '', label: '' }, { value: true, label: 'True', labelPrefix: `<i class="mdi mdi-check"></i> ` }, { value: false, label: 'False' }],
      model: Editors.singleSelect
    }
  }
];
```

#### Default Sanitize-Html Options
If you find that the HTML that you passed is being sanitized and you wish to change it, then you can change the default `sanitizeHtmlOptions` property defined in the Global Grid Options, for more info on how to change these global options, see the [Wiki - Global Grid Options](../grid-functionalities/Global-Options.md). The current defaults are:

```typescript
sanitizeHtmlOptions: {
    allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'span' ],
    allowedAttributes: { '*': ['*'] }
},
```

### `multiple-select-vanilla` Options
You can use any options from [Multiple-Select-Vanilla](https://github.com/ghiscoding/multiple-select-vanilla) and add them to your `filterOptions` property. However please note that this is a customized version of the original (all original [lib options](https://ghiscoding.github.io/multiple-select-vanilla/) are available so you can still consult the original site for all options).

Couple of small options were added to suit Angular-SlickGrid needs, which is why it points to `angular-slickgrid/lib` folder (which is our customized version of the original). This lib is required if you plan to use `multipleSelect` or `singleSelect` Filters. What was customized to (compare to the original) is the following:
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

##### Code
```typescript
this.columnDefinitions = [
  {
    id: 'isActive', name: 'Is Active', field: 'isActive',
    filterable: true,
    editor: {
      collection: [{ value: '', label: '' }, { value: true, label: 'true' }, { value: false, label: 'false' }],
      model: Editors.singleSelect,
      elementOptions: {
        // add any multiple-select.js options (from original or custom version)
        autoAdjustDropPosition: false, // by default set to True, but you can disable it
        position: 'top'
      }
    }
  }
];
```

## Perform an action after inline edit
#### Recommended way
What is ideal is to bind to a SlickGrid Event, for that you can take a look at this [Wiki - On Events](../events//Grid-&-DataView-Events.md)

#### Not recommended
You could also, perform an action after the item changed event with `onCellChange`. However, this is not the recommended way, since it would require to add a `onCellChange` on every every single column definition (while you can do with 1 onEvent).

### Custom Inline Editor
To create a Custom Editor, you need to create a `class` that will extend the [`Editors` interface](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/editor.interface.ts) and then use it in your grid with `editor: { model: myCustomEditor }` and that should be it.

**NOTE** Custom Editor accepts **only** regular HTML and/or `jQuery` 3rd party lib. It will **not work** with any Angular lib or template. I have no time to invest in this and not much use either since all embedded Editors are enough for my usage. However, if you wish to create a PR to support Angular lib/template, I certainly welcome PR (Pull Request).

Once you are done with the class, just reference it's class name as the `editor`, for example:

##### Class implementing Editor
```typescript
export class IntegerEditor implements Editor {
  constructor(private args: any) {
    this.init();
  }

  init(): void {}
  destroy() {}
  focus() {}
  loadValue(item: any) {}
  serializeValue() {}
  applyValue(item: any, state: any) {}
  isValueChanged() {}
  validate() {}
}
```

##### Use it in your Column Definition
For Custom Editor class example, take a look at [custom-inputEditor.ts](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/custom-inputEditor.ts)

```typescript
this.columnDefinitions = [
  {
    id: 'title2', name: 'Title, Custom Editor', field: 'title',
    type: FieldType.string,
    editor: {
      model: CustomInputEditor // reference your custom editor class
    },
  }
];
```

## Custom Editor with Angular Components
You can see them in [Example 22](https://ghiscoding.github.io/Angular-Slickgrid/#/angular-components) which have both Custom Editors & Filters which uses Angular Components. The 2nd column "Assignee" is the column that uses both (it uses `ng-select` 3rd party lib wrapped in an Angular Components [here](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/editor-ng-select.component.ts)) and you need to create a Custom Editor like [here](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/custom-angularComponentEditor.ts) and use that Custom Editor in your column definition like

Personally I don't find this very straightforward and I don't recommend using Angular Components for Editors/Filters as it adds a lot of boilerplate (compare to 1 step with a jQuery Custom Editor) but if you really wish to go that route, it's now possible following the steps shown below.

The steps to use an Angular Component as a Custom Editor are the following:
1. Create a Custom Editor that will handle the creation or compilation of the Angular Component into a SlickGrid Editors. For that you can take a look at this [Custom Editor](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/custom-angularComponentEditor.ts)
2. Define your Angular Component, for example take a look at this simple [ng-select Editor](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/editor-ng-select.component.ts)
3. Use the Custom Editor inside your Column Definitions, for that you can see previous paragraph

## How to prevent Editor from going to the next bottom cell?
The default behavior or SlickGrid is to go to the next cell at the bottom of the current cell that you are editing. You can change and remove this behavior by enabling `autoCommitEdit` which will save current editor and remain in the same cell

```ts
this.gridOptions = {
  autoCommitEdit: true,
  editable: true,
}
```

### OnClick Editor (icon click)
Instead of an inline editor, you might want to simply click on an edit icon that could call a modal window, or a redirect URL, or whatever you wish to do. For that you can use the inline `onCellClick` event and define a callback function for the action (you could also create your [Custom Formatter](../column-functionalities/Formatters.md)).
- The `Formatters.editIcon` will give you a pen icon, while a `Formatters.deleteIcon` is an "x" icon
```typescript
this.columnDefinitions = [
   {
      id: 'edit', field: 'id',
      formatter: Formatters.editIcon,
      maxWidth: 30,
      onCellClick: (args: OnEventArgs) => {
        console.log(args);
      }
   },
   // ...
];
```
The `args` returned to the `onCellClick` callback is of type `OnEventArgs` which is the following:
```typescript
export interface OnEventArgs {
  row: number;
  cell: number;
  columnDef: Column;
  dataContext: any;
  dataView: any;
  grid: any;
  gridDefinition: GridOption;
}
```

### Event through Slick Grid object
You can also use the Slick Grid events as shown below

##### View
```html
<angular-slickgrid gridId="grid2"
     (onAngularGridCreated)="angularGridReady($event.detail)"
     (onCellChange)="onCellChanged($event.detail.eventData, $event.detail.args)"
     (onClick)="onCellClicked($event.detail.eventData, $event.detail.args)"
     [columnDefinitions]="columnDefinitions" [gridOptions]="gridOptions" [dataset]="dataset">
</angular-slickgrid>
```

##### Component
```typescript
  onCellChanged(e, args) {
    this.updatedObject = args.item;
    this.angularGrid.resizerService.resizeGrid(10);
  }

  onCellClicked(e, args) {
    const metadata = this.angularGrid.gridService.getColumnFromEventArguments(args);

    if (metadata.columnDef.id === 'edit') {
      this.alertWarning = `open a modal window to edit: ${metadata.dataContext.title}`;

      // highlight the row, to customize the color, you can change the SASS variable $row-highlight-background-color
      this.angularGrid.gridService.highlightRow(args.row, 1500);

      // you could also select the row, when using "enableCellNavigation: true", it automatically selects the row
      // this.angularGrid.gridService.setSelectedRow(args.row);
    } else if (metadata.columnDef.id === 'delete') {
      if (confirm('Are you sure?')) {
        this.angularGrid.gridService.deleteDataGridItemById(metadata.dataContext.id);
      }
    }
  }
```

## Editor Options

#### Column Editor `editorOptions`
Some of the Editors could receive extra options, which is mostly the case for Editors using external dependencies (e.g. `autocompleter`, `date`, `multipleSelect`, ...) you can provide options via the `editorOptions`, for example

```ts
this.columnDefinitions = [{
  id: 'start', name: 'Start Date', field: 'start',
  editor: {
    model: Editors.date,
    editorOptions: { minDate: 'today' }
  }
}];
```

#### Grid Option `defaultEditorOptions
You could also define certain options as a global level (for the entire grid or even all grids) by taking advantage of the `defaultEditorOptions` Grid Option. Note that they are set via the editor type as a key name (`autocompleter`, `date`, ...) and then the content is the same as `editorOptions` (also note that each key is already typed with the correct editor option interface), for example

```ts
this.gridOptions = {
  defaultEditorOptions: {
    autocompleter: { debounceWaitMs: 150 }, // typed as AutocompleterOption
    date: { minDate: 'today' },
    longText: { cols: 50, rows: 5 }
  }
}
```

## Validators
Each Editor needs to implement the `validate()` method which will be executed and validated before calling the `save()` method. Most Editor will simply validate that the value passed is correctly formed. The Float Editor is one of the more complex one and will first check if the number is a valid float then also check if `minValue` or `maxValue` was passed and if so validate against them. If any errors is found it will return an object of type `EditorValidatorOutput` (see the signature on top).

### Custom Validator
If you want more complex validation then you can implement your own Custom Validator as long as it implements the following  signature.
```ts
export type EditorValidator = (value: any, args?: EditorArgs) => EditorValidatorOutput;
```
So the `value` can be anything but the `args` is interesting since it provides multiple properties that you can hook into, which are the following
```ts
export interface EditorArgs {
  column: Column;
  container: any;
  grid: any;
  gridPosition: ElementPosition;
  item: any;
  position: ElementPosition;
  cancelChanges?: () => void;
  commitChanges?: () => void;
}
```
And finally the Validator Output has the following signature
```ts
export interface EditorValidatorOutput {
  valid: boolean;
  msg?: string | null;
}
```

So if we take all of these informations and we want to create our own Custom Editor to validate a Title field, we could create something like this:
#### Component
```ts
const myCustomTitleValidator: EditorValidator = (value: any, args: EditorArgs) => {
  // you can get the Editor Args which can be helpful, e.g. we can get the Translate Service from it
  const grid = args && args.grid;
  const columnDef = args.column;
  const dataContext = args.item;
  const gridOptions = (grid && grid.getOptions) ? grid.getOptions() : {};
  const i18n = gridOptions.i18n;

  if (value == null || value === undefined || !value.length) {
    return { valid: false, msg: 'This is a required field' };
  } else if (!/^Task\s\d+$/.test(value)) {
    return { valid: false, msg: 'Your title is invalid, it must start with "Task" followed by a number' };
    // OR use the Translate Service with your custom message
    // return { valid: false, msg: i18n.tr('YOUR_ERROR', { x: value }) };
  } else {
    return { valid: true, msg: '' };
  }
};
```
and use it in our Columns Definition like this:
```ts
this.columnDefinition = [
  {
    id: 'title', name: 'Title', field: 'title',
    editor: {
      model: Editors.longText,
      validator: myCustomTitleValidator, // use our custom validator
    },
    onCellChange: (e: Event, args: OnEventArgs) => {
      // do something
      console.log(args.dataContext.title);
    }
  }
];
```

## Disabling specific cell edit
This can be answered by searching on Stack Overflow Stack Overflow and this is the best [answer](https://stackoverflow.com/questions/10491676/disabling-specific-cell-edit-in-slick-grid) found.

Based on that, the only difference in Angular-Slickgrid is that all SlickGrid event needs the `sg` prefix to differentiate SlickGrid Events (`sg` prefix) versus Angular-Slickgrid Events (`asg` prefix). More info can be found in this [Wiki - Grid & DataView Events](../events/Grid-&-DataView-Events.md).

With that in mind and the code from the SO answer, we end up with the following code.

#### View
```html
<angular-slickgrid gridId="grid1"
  [columnDefinitions]="columnDefinitions"
  [gridOptions]="gridOptions"
  (onBeforeEditCell)="verifyCellIsEditableBeforeEditing($event.detail.eventData, $event.detail.args)"
  >
</angular-slickgrid>
```

#### Component
```ts
  verifyCellIsEditableBeforeEditing(e, args): boolean {
    // you can call `event.preventDefault()` to make cell not editable
    // args contains the dataContext and other Slickgrid arguments
  }
```

### Editors on Mobile Phone
If your grid uses the `autoResize` and you use Editors in your grid on a mobile phone, Android for example, you might have undesired behaviors. It might call a grid resize (and lose input focus) since the touch keyboard appears. This in term, is a bad user experience to your user, but there is a way to avoid this, you could use the `pauseResizer`

##### View
```html
<div id="grid1">
   <angular-slickgrid gridId="grid1"
         [columnDefinitions]="columnDefinitions"
         [gridOptions]="gridOptions"
         [dataset]="dataset"
         (onBeforeEditCell)="onBeforeEditCell($event)"
         (onBeforeCellEditorDestroy)="onAfterEditCell($event)"
         (onAngularGridCreated)="angularGridReady($event.detail)">
   </angular-slickgrid>
</div>
```
##### Component
```ts
angularGridReady(angularGrid: AngularGridInstance) {
  this.angularGrid = angularGrid;
}

onAfterEditCell($event) {
  // resume autoResize feature,  and after leaving cell editing mode
  // force a resize to make sure the grid fits the current dimensions
  this.angularGrid.resizerService.pauseResizer(false);
  this.angularGrid.resizerService.resizeGrid();
}

onBeforeEditCell($event) {
  this.angularGrid.resizerService.pauseResizer(true);
}
```

## Turning individual rows into edit mode
Using the [Row Based Editing Plugin](../grid-functionalities/Row-based-edit.md) you can let the user toggle either one or multiple rows into edit mode, keep track of cell changes and either discard or save them on an individual basis using a custom `onBeforeRowUpdated` hook.

## Dynamically change Column Editor

You can dynamically change a column editor by taking advantage of the `onBeforeEditCell` event and change the editor just before the cell editor opens. However please note that the library keeps 2 references and you need to update both references as shown below. 

With the code sample shown below, we are using an input checkbox to toggle the Editor between `Editors.longText` to `Editors.text` and vice/versa

```ts
changeToInputTextEditor(checked: boolean) {
    this.isInputTextEditor = checked;
}

handleOnBeforeEditCell(args: CustomEvent<OnBeforeEditCellEventArgs>) {
  const args = event?.detail?.args;
  const { grid, column } = args;
  column.editor.model = this.isInputTextEditor ? Editors.text : Editors.longText;
  column.editorClass = column.editor.model;
  return true;
}
```
