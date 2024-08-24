##### index
- [Editor Options](#editor-options)
- [Custom Validator](#custom-validator)
- [Date Format](#date-format)
- See the [Editors - Wiki](../Editors.md) for more general info about Editors (validators, event handlers, ...)

### Information
The Date Editor is provided through an external library named [Vanilla-Calendar-Pro](https://vanilla-calendar.pro) and all options from that library can be added to your `editorOptions` (see below), so in order to add things like minimum date, disabling dates, ... just review all the [Vanilla-Calendar-Pro](https://vanilla-calendar.pro/docs/reference/additionally/settings) and then add them into `editorOptions`. We use [Tempo](https://tempo.formkit.com/) to parse and format Dates to the chosen format (when `type`, `outputType` and/or `saveType` are provided in your column definition)

> **Note** Also just so you know, `editorOptions` is used by all other editors as well to expose external library like Autocompleter, Multiple-Select, etc...

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
      type: 'dateIso', // if your type has hours/minutes, then the date picker will include date+time
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

### Date Format
Your column definitions may include a `type` to tell Formatters how to formate your date, this `type` is also used by the Editor when saving.

##### What if I want to use a different format when saving?
There are 3 types you can provide to inform the Editor on how to save:
1. `type` inform the entire column what its type is (used by Formatter, Filter, Editor, Export)
2. `outputType` what type to display in the Editor vs saving format.
3. `saveOutputType` the type to use when saving which is different than the one used on cell input (rarely used).


The `type` and `outputType` are often used when you want to save something different compare to what you show to the user (for example, show a date in the US Format but save it as ISO or UTC).

The difference between `outputType` and `saveOutputType` when you wish to display a certain format in the date editor input (while editing), but wish to save in a different format. You will rarely need the `saveOutputType` and for most use cases, the use of both `type` and `outputType` should be enough.

> **Note** the type detection when saving is the inverse of the list above, whichever comes first from 3 to 1.