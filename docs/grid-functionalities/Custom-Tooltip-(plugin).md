#### index
- [Column Definition - Custom Tooltip](#via-column-definition)
- [Grid Options - Custom Tooltip](#via-grid-options)
- [Alignment](#alignment)
- Tooltip Type
  - [on Cell](#cell-custom-tooltip-with-formatter) with `formatter`
  - [on Cell Async Tooltip](#cell-async-custom-tooltip-with-formatter-and-asyncpostformatter-async-api-call) (Async API call from Promise/Observable)
  - [on Column Header (title)](#column-header-custom-tooltip-with-headerformatter) with `headerFormatter`
  - [on Column Header row (filter)](#column-header-custom-tooltip-with-headerrowformatter) with `headerRowFormatter`
  - [with regular `[title]` attribute](#regular-tooltip-with-a-title-attribute)
  - [tooltip text length](#regular-tooltip-max-length)
- [How to delay the opening of a tooltip?](#how-to-delay-the-opening-of-a-tooltip)
  - [delay a tooltip with Formatter](#delay-a-tooltip-with-formatter)
  - [delay a Regular Tooltip](#delay-a-regular-tooltip)
- `customTooltip` options
   - too many to list, consult the [CustomTooltipOption](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/column.interface.ts) interface for all possible options
- [UI Sample](#ui-sample)

### Description
A plugin to add Custom Tooltip when hovering a cell, it subscribes to the cell `onMouseEnter` and `onMouseLeave` events.
The `customTooltip` is defined in the Column Definition OR Grid Options (the first found will have priority over the second)
To specify a tooltip when hovering a cell

**NOTE:** this is an opt-in plugin, you must import the necessary plugin from `@slickgrid-universal/custom-tooltip-plugin` and instantiate it in your grid options via `registerExternalResources`, see multiple examples below.

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/custom-tooltip) / [Demo Component](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/grid-custom-tooltip.component.ts)

### via Column Definition
You can set or change option of an individual column definition custom tooltip.
```ts
import { SlickCustomTooltip } from '@slickgrid-universal/custom-tooltip-plugin';

defineGrid() {
  this.columnDefinitions = [{
      id: "title", name: "Title", field: "title", formatter: titleFormatter,
      customTooltip: {
        formatter: tooltipTaskFormatter,
        // ...
      }
  }];

  // make sure to register the plugin in your grid options
  this.gridOptions = {
    externalResources: [new SlickCustomTooltip()],
  };
}
```

### via Grid Options
You can set certain options for the entire grid, for example if you set `exportWithFormatter` it will evaluate the Formatter (when exist) output to export each cell. The Grid Menu also has the "Export to Excel" enabled by default.
```ts
import { SlickCustomTooltip } from '@slickgrid-universal/custom-tooltip-plugin';

defineGrid() {
  this.gridOptions = {
    externalResources: [new SlickCustomTooltip()],
    customTooltip: {
      formatter: tooltipTaskFormatter,

      // optionally skip tooltip on some of the column(s) (like 1st column when using row selection)
      usabilityOverride: (args) => (args.cell !== 0 && args?.column?.id !== 'action'), // disable on 1st and also "action" column
    },
  };
}
```

## Alignment
The default alignment is "auto" (which will align to the left by default or on the right when there's not enough room). You can change the alignment on any of the cell (or all of them via grid option) by simply providing a value to the `position`.

The available position are: `'auto' | 'top' | 'bottom' | 'left-align' | 'right-align' | 'center'` (note that "center" was only added recently)

```ts
// define your custom tooltip in a Column Definition OR Grid Options
customTooltip: {
  position: 'left-align'
},
```

## Tooltip Types
### Cell Custom Tooltip with `formatter`
You can create a Custom Tooltip which will show up when hovering a cell by simply providing a `formatter` [via a Column Definition](#via-column-definition) (per column) OR [via Grid Options](#via-grid-options) (all columns of the grid), the formatter is the same structure as a regular formatter and accepts html string.
```ts
// define your custom tooltip in a Column Definition OR Grid Options
customTooltip: {
  formatter: this.tooltipFormatter,
},
```
here's a simple formatter (you can see the result in the [UI Sample](#ui-sample) gif below)
```ts
tooltipFormatter(row, cell, value, column, dataContext, grid) {
    const tooltipTitle = 'Custom Tooltip';
    const effortDrivenHtml = Formatters.checkmarkMaterial(row, cell, dataContext.effortDriven, column, dataContext, grid);

    return `<div class="header-tooltip-title">${tooltipTitle}</div>
    <div class="tooltip-2cols-row"><div>Id:</div> <div>${dataContext.id}</div></div>
    <div class="tooltip-2cols-row"><div>Title:</div> <div>${dataContext.title}</div></div>
    <div class="tooltip-2cols-row"><div>Effort Driven:</div> <div>${effortDrivenHtml}</div></div>
    <div class="tooltip-2cols-row"><div>Completion:</div> <div>${dataContext.percentComplete}</div></div>`;
}
```

### Cell Async Custom Tooltip with `formatter` and `asyncPostFormatter` (Async API call)
You can create an Async Custom Tooltip which is a delayed tooltip (for example when you call an API to fetch some info), will show up when hovering a cell it will require a bit more setup. The `formatter` will be use to show any form of "loading..." and your final tooltip will be shown via the `asyncPostFormatter` both formatters use the same structure as a regular formatter and accepts html string. It will also require you to provide an `asyncProcess` of your API call (it could be a Promise or Observable), it also provides the same arguments as a regular formatter.
```ts
// define your custom tooltip in a Column Definition OR Grid Options
customTooltip: {
  // 1- loading formatter
  formatter: () => `loading...</div>`,

  // 2- post process formatter
  asyncProcess: (row, cell, val, column, dataContext) => fetch(`/user/${dataContext.id}`), // could be a Promise/Observable
  asyncPostFormatter: this.userFullDetailAsyncFormatter,
},
```
here's the final post process async formatter
```ts
userFullDetailAsyncFormatter(row, cell, value, column, dataContext, grid) {
    const tooltipTitle = 'User Detail - Async Tooltip';
    return `<div class="header-tooltip-title">${tooltipTitle}</div>
    <div class="tooltip-2cols-row"><div>Id:</div> <div>${dataContext.id}</div></div>
    <div class="tooltip-2cols-row"><div>First Name:</div> <div>${dataContext.firstName}</div></div>
    <div class="tooltip-2cols-row"><div>Last Name:</div> <div>${dataContext.lastName}</div></div>
    <div class="tooltip-2cols-row"><div>Age:</div> <div>${dataContext.age}</div></div>
    <div class="tooltip-2cols-row"><div>Gender:</div> <div>${dataContext.gender}</div></div>
    <div class="tooltip-2cols-row"><div>Title:</div> <div>${dataContext.title}</div></div>
    <div class="tooltip-2cols-row"><div>Seniority:</div> <div>${dataContext.seniority}</div></div>`;
}
```

### Column Header Custom Tooltip with `headerFormatter`
You can create a Custom Tooltip which will show up when hovering a column header (title) by simply providing a `headerFormatter` [via a Column Definition](#via-column-definition) (per column) OR [via Grid Options](#via-grid-options) (all columns of the grid), the formatter is the same structure as a regular formatter and accepts html string.
```ts
// define your custom tooltip in a Column Definition OR Grid Options
customTooltip: {
  headerFormatter: this.headerFormatter,
},
```
here's a simple formatter
```ts
headerFormatter(row, cell, value, column) {
    const tooltipTitle = 'Custom Tooltip - Header';
    return `<div class="header-tooltip-title">${tooltipTitle}</div>
    <div class="tooltip-2cols-row"><div>Column:</div> <div>${column.name}</div></div>`;
}
```

### Column Header Custom Tooltip with `headerRowFormatter`
You can create a Custom Tooltip which will show up when hovering a column header (title) by simply providing a `headerRowFormatter` [via a Column Definition](#via-column-definition) (per column) OR [via Grid Options](#via-grid-options) (all columns of the grid), the formatter is the same structure as a regular formatter and accepts html string.
```ts
// define your custom tooltip in a Column Definition OR Grid Options
customTooltip: {
  headerRowFormatter: this.headerRowFormatter,
},
```
here's a simple formatter
```ts
headerRowFormatter(row, cell, value, column) {
    const tooltipTitle = 'Custom Tooltip - Header Row (filter)';
    return `<div class="headerrow-tooltip-title">${tooltipTitle}</div>
    <div class="tooltip-2cols-row"><div>Column:</div> <div>${column.field}</div></div>`;
  }
```

### Regular Tooltip with a `[title]` attribute
You can create a regular tooltip simply by enabling `useRegularTooltip: true`, it will parse the regular cell formatter in search for a `title="..."` attribute (it won't work without a cell formatter, unless the cell text content is larger than the cell width when ellipsis shows up "some text..." and that will automatically create a tooltip, that could however be disabled if you wish).

This feature is very useful so you probably want to enable this flag globally, but you could also still choose to add only [via a Column Definition](#via-column-definition) (per column) OR [via Grid Options](#via-grid-options) (all columns of the grid).

NOTE: regular tooltip, as opposed to other type of custom tooltip, will be rendered as plain text. You could however change that by enabling this flag `renderRegularTooltipAsHtml: true`

```ts
// define your custom tooltip in a Column Definition OR Grid Options
customTooltip: {
  useRegularTooltip: true, // a regular tooltip will search for a "title" attribute in the cell formatter (it won't work without a cell formatter)

  // if you wish to disable auto-tooltip creation when ellipsis (...) shows up, can use this flag
  // useRegularTooltipFromFormatterOnly: true,
},
```

#### Regular tooltip max length
By default the custom tooltip text will be limited, and potentially truncated, to 650 characters in order to keep the tooltip with a size that is not too large. You could change the grid option setting with this

```ts
this.gridOptions = {
  customTooltip: {
    tooltipTextMaxLength: 650,
  },
}
```

### How to delay the opening of a tooltip?
#### delay a Tooltip with Formatter
There are no built-in option to delay a custom tooltip because it would add too much code complexity to the codebase, however you can simply do that by taking advantage of the Async Custom Tooltip. The only thing you might want to do though is to have the first custom tooltip `formatter` to return an empty string (so it won't show a loading tooltip) and then use the `asyncPostFormatter` for the tooltip (note that it will **not** read the cell formatter, if you have requirement for that then simply combined formatter into an external formatter function, see 2nd examples below).
```ts
// define your custom tooltip in a Column Definition OR Grid Options
customTooltip: {
  // 1- loading formatter
  formatter: () => ``, // return empty so it won't show any pre-tooltip

  // 2- delay the opening by a simple Promise and `setTimeout`
  asyncProcess: () => new Promise(resolve => {
    setTimeout(() => resolve({}), 500); // delayed by half a second
  }),
  asyncPostFormatter: this.userFullDetailAsyncFormatter,
},
```
#### delay a Regular Tooltip
It is possible to also delay a regular tooltip (when using `useRegularTooltip`) even when using the optional `useRegularTooltipFromFormatterOnly` but it requires a bit of code change. For example, let say you want to parse the `title` from a formatter but delay it, you could do it as shown below but please note that it will read the `asyncPostFormatter`, not the cell `formatter`, and so you should probably create an external formatter function to make simpler code.

##### tooltip text output will be: "show this tooltip title text"
```ts
// define your custom tooltip in a Column Definition OR Grid Options
this.columnDefinitions = [{
  id: 'firstName', field: 'firstName', name: 'First Name',
  customTooltip: {
    // 1- loading formatter
    formatter: () => ``, // return empty so it won't show any pre-tooltip

    // 2- delay the opening by a simple Promise and `setTimeout`
    asyncProcess: () => new Promise(resolve => setTimeout(() => resolve(null), 500)), // delayed by half a second
    asyncPostFormatter: `<span title="show this tooltip title text">cell value</span>`, // this will be read as tooltip
  },
  formatter: `<span title="another tooltip title text">cell value</span>`, // this won't be read as tooltip
}];
```
the previous code could be refactored to have only 1 common formatter that is referenced in both cell `formatter` and tooltip `asyncPostFormatter`
##### tooltip text output will be: "show this tooltip title text"
```ts
const myFormatter = () => `<span title="show this tooltip title text">cell value</span>`;

// define your custom tooltip in a Column Definition OR Grid Options
this.columnDefinitions = [{
  id: 'firstName', field: 'firstName', name: 'First Name',
  customTooltip: {
    // 1- loading formatter
    formatter: () => ``, // return empty so it won't show any pre-tooltip

    // 2- delay the opening by a simple Promise and `setTimeout`
    asyncProcess: () => new Promise(resolve => setTimeout(() => resolve(null), 500)), // delayed by half a second
    asyncPostFormatter: myFormatter
  },
  formatter: myFormatter
}];
```
### UI Sample
The Export to Excel handles all characters quite well, from Latin, to Unicode and even Unicorn emoji, it all works on all browsers (`Chrome`, `Firefox`, even `IE11`, I don't have access to older versions). Here's a demo

![image](https://user-images.githubusercontent.com/643976/138971279-b835b8f5-93f1-4e77-bd90-f86599e199e9.png)

auto tooltip on large text, that is when ellipsis (...) shows up on large text

![image](https://user-images.githubusercontent.com/643976/139088036-9168e632-1ae6-4c69-8302-f9df8510ec4b.png)

Async Custom Tooltip (API call Promise/Observable)

![ganSbcmm8v](https://user-images.githubusercontent.com/643976/139093922-987b953d-984f-4ec3-badb-941cc2ec78ec.gif)
