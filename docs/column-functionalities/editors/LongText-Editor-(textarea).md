##### index
- [Editor Options](#editor-options)
- [Custom Validator](#custom-validator)
- See the [Editors - Wiki](../Editors.md) for more general info about Editors (validators, event handlers, ...)

### Demo
[Demo Page](https://ghiscoding.github.io/slickgrid-universal/#/example12) | [Demo Component](https://github.com/ghiscoding/slickgrid-universal/blob/master/examples/webpack-demo-vanilla-bundle/src/examples/example12.ts) - ("Title" column to be more specific)

### Editor Options
You can change button texts, textarea size (cols, rows) and also change position of the textarea (auto is the default which will try to automatically find best place to position the textarea).

#### [LongTextEditorOption](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/longTextEditorOption.interface.ts) Interface.

```ts
defineGrid() {
  this.columnDefinitions = [
    {
      id: 'title', name: 'Title', field: 'title',
      editor: {
        model: Editors.longText,
        required: true, maxLength: 12,
        editorOptions: {
          cols: 45,
          rows: 6,
          position: 'auto', // defaults to "auto" but you can change to "top", "bottom", "left" or "right"
          buttonTexts: {
            // you can change the button texts
            cancel: 'Close',
            save: 'Done'

            // or if you use translation you can use the properties with `Key` suffix
            // cancelKey: 'CANCEL',
            // saveKey: 'SAVE',
          }
        } as LongTextEditorOption,
      },
    },
  ];
}
```

### Custom Validator
You can add a Custom Validator, from an external function or inline.
```ts
// you can create custom validator to pass to an inline editor
const myCustomTitleValidator = (value, args) => {
  if ((value === null || value === undefined || !value.length) && (args.compositeEditorOptions?.modalType === 'create' || args.compositeEditorOptions.modalType === 'edit')) {
    // we will only check if the field is supplied when it's an inline editing OR a composite editor of type create/edit
    return { valid: false, msg: 'This is a required field.' };
  } else if (!/^(task\s\d+)*$/i.test(value)) {
    return { valid: false, msg: 'Your title is invalid, it must start with "Task" followed by a number.' };
  }
  return { valid: true, msg: '' };
};

defineGrid() {
  this.columnDefinitions = [
    {
      id: 'title', name: 'Title', field: 'title',
      editor: {
        model: Editors.longText,
        required: true,
        validator: myCustomTitleValidator,
      },
    },
  ];
}
```