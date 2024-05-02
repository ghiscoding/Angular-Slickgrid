##### index
- [Editor Options](#editor-options)
- [Custom Validator](#custom-validator)
- See the [Editors - Wiki](../Editors.md) for more general info about Editors (validators, event handlers, ...)

### Information
The Date Editor is provided through an external library named [Vanilla-Calendar-Picker](https://github.com/ghiscoding/vanilla-calendar-picker) (a fork of [Vanilla-Calendar-Pro](https://vanilla-calendar.pro)) and all options from that library can be added to your `editorOptions` (see below), so in order to add things like minimum date, disabling dates, ... just review all the [Vanilla-Calendar-Pro](https://vanilla-calendar.pro/docs/reference/additionally/settings) and then add them into `editorOptions`. Also just so you know, `editorOptions` is use by all other editors as well to expose external library like Autocompleter, Multiple-Select, etc...

### Demo
[Demo Page](https://ghiscoding.github.io/slickgrid-universal/#/example12) | [Demo Component](https://github.com/ghiscoding/slickgrid-universal/blob/master/examples/webpack-demo-vanilla-bundle/src/examples/example12.ts)

### Editor Options
You can use any of the Vanilla-Calendar [settings](https://vanilla-calendar.pro/docs/reference/additionally/settings) by adding them to `editorOptions` as shown below.

> **Note** for easier implementation, you should import `VanillaCalendarOption` from Slickgrid-Universal common package.

```ts
import { type VanillaCalendarOption } from '@slickgrid-universal/common';

prepareGrid() {
  this.columnDefinitions = [
    {
      id: 'title', name: 'Title', field: 'title',
      editor: {
        model: Editors.date,
        editorOptions: {
          range: {
            max: 'today',
            disabled: ['2022-08-15', '2022-08-20'],
          }
        } as VanillaCalendarOption,
      },
    },
  ];
}
```

#### Grid Option `defaultEditorOptions
You could also define certain options as a global level (for the entire grid or even all grids) by taking advantage of the `defaultEditorOptions` Grid Option. Note that they are set via the editor type as a key name (`autocompleter`, `date`, ...) and then the content is the same as `editorOptions` (also note that each key is already typed with the correct editor option interface), for example

```ts
this.gridOptions = {
  defaultEditorOptions: {
    date: { range: { min: 'today' } }, // typed as VanillaCalendarOption
  }
}
```

### Custom Validator
You can add a Custom Validator from an external function or inline (inline is shown below and comes from [Example 12](https://ghiscoding.github.io/slickgrid-universal/#/example12))
```ts
initializeGrid() {
  this.columnDefinitions = [
    {
      id: 'title', name: 'Title', field: 'title',
      editor: {
        model: Editors.date,
        required: true,
        validator: (value, args) => {
          const dataContext = args && args.item;
          if (dataContext && (dataContext.completed && !value)) {
            return { valid: false, msg: 'You must provide a "Finish" date when "Completed" is checked.' };
          }
          return { valid: true, msg: '' };
        }
      },
    },
  ];
}
```