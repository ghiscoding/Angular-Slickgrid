##### index
- [Editor Options](#editor-options)
- [Custom Validator](#custom-validator)
- See the [Editors - Wiki](../Editors.md) for more general info about Editors (validators, event handlers, ...)

### Information
The Date Editor is provided through an external library named [Flatpickr](https://flatpickr.js.org/examples/) and all options from that library can be added to your `editorOptions` (see below), so in order to add things like minimum date, disabling dates, ... just review all the [Flatpickr Examples](https://flatpickr.js.org/examples/) and then add them into `editorOptions`. Also just so you know, `editorOptions` is use by all other editors as well to expose external library like Flatpickr, Multiple-Select.js, etc...

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/editor) | [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-editor.component.ts)

### Editor Options
You can use any of the Flatpickr [options](https://flatpickr.js.org/options/) by adding them to `editorOptions` as shown below.

#### [FlatpickrOption](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/flatpickrOption.interface.ts) Interface.

```ts
defineGrid() {
  this.columnDefinitions = [
    {
      id: 'title', name: 'Title', field: 'title',
      editor: {
        model: Editors.date,
        editorOptions: {
          minDate: 'today',
          disable: [(date: Date) => this.isWeekendDay(date)], // disable weekend days (Sat, Sunday)
        } as FlatpickrOption,
      },
    },
  ];
}

/** Returns true when it's a weekend day (Saturday, Sunday) */
isWeekendDay(date: Date): boolean {
  return (date.getDay() === 0 || date.getDay() === 6);
}
```

#### Grid Option `defaultEditorOptions
You could also define certain options as a global level (for the entire grid or even all grids) by taking advantage of the `defaultEditorOptions` Grid Option. Note that they are set via the editor type as a key name (`autocompleter`, `date`, ...) and then the content is the same as `editorOptions` (also note that each key is already typed with the correct editor option interface), for example

```ts
this.gridOptions = {
  defaultEditorOptions: { 
    date: { minDate: 'today' }, // typed as FlatpickrOption
  }
}
```

### Custom Validator
You can add a Custom Validator from an external function or inline (inline is shown below and comes from [Example 3](https://ghiscoding.github.io/Angular-Slickgrid/#/editor))
```ts
defineGrid() {
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