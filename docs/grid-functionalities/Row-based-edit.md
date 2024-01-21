#### index
- [The action column](#the-action-column)
- [Multiple Row Selections](#multiple-row-selections)
- [Change Dynamically Single/Multiple Selections](#changing-dynamically-from-single-to-multiple-selections-and-vice-versa)
- [Mixing Single & Multiple Row Selections](#mixing-single--multiple-row-selections)
- [Disable Custom Rows Selections via `selectableOverride`](#disable-custom-rows-selections-via-selectableoverride)
- [Disable External Button when having Empty Selection](#disable-external-button-when-having-empty-selection)
- [Change Row Selections](#change-row-selections)
- Troubleshooting
  - [Adding a Column dynamically is removing the Row Selection, why is that?](#adding-a-column-dynamically-is-removing-the-row-selection-why-is-that)

### Description
The Row based editing plugin makes it possible to keep the grid readonly except for rows which the user explicitely toggles into edit mode.

**Note:** This plugin enforces the use of the `autoEdit` option and will turn it on with a console warning if its not already.

### Demo
[Demo](https://ghiscoding.github.io/Angular-Slickgrid/#/base-row-editing) / [Demo Component](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/grid-base-row-editing.component.ts)

## The action column
A new column is rendered that shows an edit/delete button. If the user clicks on edit, a save and cancel button are shown instead and the row toggles into edit mode. By default as the last column but you can override it with the option `columnIndexPosition`. Additionally it's default column id can be overriden using the opiton `columnId`. Furthermore, you can also override the columns label via the `actionsColumnLabel` property.

### Single or multiple editable rows
By default you can only toggle a single row into edit mode. If you set the option `allowMultipleRows` to `true` on the other hand, you can toggle as many as you want.

### Configuring the action buttons
You can override the styling, the hover text as well as whether a prompt — and with what text — should be shown. It is done by overriding the `actionButtons` property of the [plugins options](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/rowBasedEditOption.interface.ts).

## Support for the Excel Copy Buffer Plugin
If the [Excel Copy Buffer Plugin](excel-copy-buffer.md) is configured, the Row based editing pluging will override it's behavior by denying pastes on all cells not within a edit mode row. Nevertheless, any existing `BeforePasteCellHandler` will be respected.

## How the plugin works
The idea of the plugin is to focus the users editing experience on specific individual rows and and save them individually. This is achieved by letting the user toggle one or more rows into edit mode.
When a that happens a potentially registered `onBeforeEditMode` callback is executed to handle various preparation or cleanup tasks. Now changes can be made to those rows and will be highlighted and tracked. The user may cancel the edit mode at any time and revert all cells changes. If the save button is pressed on the other hand an `onBeforeRowUpdated` hook, which you define via plugin options, is called and expects a `Promise<boolean>`. In that method you'd typically write the changes to your backend and return either true or false based on the operations outcome. If a negative boolean is returned the edit mode is kept, otherwise the row applies the changes and toggles back into readonly mode. That means, no modifications can be done on the grid.

Here's the respective code shown in Example22:

#### ViewModel
```ts
onBeforeRowUpdated(args) {
  const { effortDriven, percentComplete, finish, start, duration, title } = args.dataContext;

  if (duration > 40) {
    alert('Sorry, 40 is the maximum allowed duration.');
    return Promise.resolve(false);
  }

  return fakeFetch('your-backend-api/endpoint', {
    method: 'POST',
    body: JSON.stringify({ effortDriven, percentComplete, finish, start, duration, title }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).catch(err => {
    console.error(err);
    return false;
  })
  .then(response => {
    if (response === false) {  // <---- the negative response, e.g validation failed, keep the row as is
      return false;
    }
    if (typeof response === 'object') {
      return response!.json();
    }
  })
  .then(json => {
    alert(json.message);
    return true;  // <--- all good, apply changes in grid and toggle row into readonly mode
  });
},
```
