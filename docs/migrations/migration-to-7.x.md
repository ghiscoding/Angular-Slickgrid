## Merging SlickGrid into `Slickgrid-Universal` (dropping `6pac/slickgrid` dep)
### The aim of this release is to be standalone, improve best practices & move towards CSP compliance while also making the project leaner.

There are a few changes, but it's for good reasons 😉

This new major release is dropping SlickGrid dependency (`6pac/slickgrid`) dependency entirely and no longer relies on external SlickGrid code. All core files are now included into the Slickgrid-Universal project instead of being an external dependency which was sometime hard to troubleshoot (which was the case for the past couple years). The main reason to move the core lib into the Slickgrid-Universal project is for simplicity but it also allows us to drop code that we never really used in Slickgrid-Universal (e.g. SlickGrid had its own `autosize` which is different than our implementation in `ResizerService`, see Slickgrid-Universal [Example 31](https://ghiscoding.github.io/Angular-Slickgrid/#/resize-by-content)). Migrating SlickGrid to native JS (dropping jQuery) also required a few DOM utils that were duplicated in both projects, with this release we can now deduplicate these methods. It was hard or impossible to achieve earlier because SlickGrid was always written as a JavaScript library while our project was written in TypeScript, but now that SlickGrid core lib was also migrated to TypeScript (I'm actually the person who worked on that), this is now allowing me to simply copy the new TypeScript code and merge it in here without too much effort. It's also been tested in the wild for couple months already and all bugs were discovered and fixed already, so I know the new code is also stable already.

Another great feature of this new major release is that I made a lot of improvements on the library for CSP (Content Security Policy) compliance, or at least provide ways to be compliant. One of the biggest change in that regard is that you can now create custom Formatters to return native HTML element (I rewrote a few built-in Formatters with that approach) and this is mostly to avoid the use of `innerHTML` which is not CSP safe by default.

With this new major version release, we can now say that the journey to modernize the project is now, for the most part, completed (in summary the following was achieved in Slickgrid-Universal: 1. dropped jQueryUI in v2, dropped jQuery v3 and now in v4 Slickgrid-Universal is no longer relying on external 6pac/SlickGrid dependency and is fully written in TypeScript with full ESM builds) and with that said, I do not expect any major changes (aka breaking) for the foreseeable future... we're pretty much done with the big changes!!! This new release should be a little more performant too with more native code, e.g. some Formatters were rewritten as native.

#### Major Changes - Quick Summary
- minimum requirements bump
  - Node 18 is now required
  - Slickgrid-Universal >= 4.x is now required
  - TypeScript builds are now targeting ES2021 (bumped from ES2018)
  - more CSP (Content Security Policy) safe
  - you can create custom Formatter with native HTML element (to be more CSP safe), HTML strings are still accepted
  - migrate to [Excel-Builder-Vanilla](https://github.com/ghiscoding/excel-builder-vanilla) (since >=4.4.0)
    - for CSP safe, you also need to add `worker-src 'self' blob:;`

> **Note** for the full internal list of code changes applied in this Slickgrid-Universal release, you can take a look at the [Discussion - Roadmap to 4.0](https://github.com/ghiscoding/slickgrid-universal/discussions/1108)

---

**NOTE:** if you come from an earlier version, please make sure to follow each migration in their respected order (see Wiki index)

> **Note** after following the migration, if you have some build errors with missing `slickgrid` that is because you did not upgrade all Slickgrid-Universal dependencies that you may have. So in short **do not install SlickGrid** manually, this is wrong and we are no longer depending on 6pac/slickgrid since Slickgrid-Universal now has its own SlickGrid/SlickDataView core files.

## Changes

### Slickgrid-Universal
If you use any of the Slickgrid-Universal extra dependencies then make sure to upgrade them as well to the new major `4.0.0` version so that they work with Angular-Slickgrid `7.0.0`

```diff
  "dependencies": {
-   "@slickgrid-universal/excel-export": "^3.7.1",
+   "@slickgrid-universal/excel-export": "^4.0.1",
-   "angular-slickgrid": "^6.6.0",
+   "angular-slickgrid": "^7.0.0",
}
```

### `angular.json` config
Since we moved all the code into the Slickgrid-Universal project and it is now written in TypeScript, we can now say for certain that SlickGrid is no longer detected as CommonJS, we also no longer need SortableJS to be preloaded. So you can do the following changes to your `angular.json` config

```diff
# angular.json
{
  "allowedCommonJsDependencies": [
    "autocompleter",
    "dompurify",
-   "excel-builder-webpacker",
    "flatpickr",
-   "slickgrid",
    "stream"
  ],
  // ...
  "scripts": [
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
-    "node_modules/sortablejs/Sortable.min.js"
  ],
  // ...
}
```

### Distribution folder
The `dist/commonjs` folder was renamed as `dist/cjs` to make it shorter and also to follow the new convention used in the JS world.
- this should be transparent for most users

#### `Slick` namespace on the `window` object is gone
By migrating the SlickGrid core files into the project, we are now taking full advantage of TypeScript classes but that is also indirectly drops the `Slick` namespace on the `window` object. The main usage of the `Slick` namespace for most users, is when you have an editable grid with the "undo" functionality, you will need to update your code as shown below.

```diff
+ { SlickEventHandler, SlickGlobalEditorLock }  from '@slickgrid-universal/common';
- declare const Slick: SlickNamespace;

// ..
- eventHandler = Slick.EventHandler();
+ eventHandler = SlickEventHandler();

// ..
undo() {
    const command = this.editCommandQueue.pop();
-    if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
+    if (command && SlickGlobalEditorLock.cancelCurrentEdit()) {
      command.undo();
    }
}
```

### Composite Editor
The `CompositeEditor` class got renamed to `SlickCompositeEditor`, so if you were using it with an `instanceof` then you will have to update your code.
```diff
- if (args.editor instanceof Slick.CompositeEditor) {
+ if (args.editor instanceof SlickCompositeEditor) {
  // ...
}
```

### Deprecated code removed/renamed
##### Column
- `exportColumnWidth` was removed, just use `excelExportOptions` instead

##### Grid Options
- `defaultComponentEventPrefix` - no longer available
- `defaultSlickgridEventPrefix` - no longer available
- `sanitizeHtmlOptions` was renamed to `sanitizerOptions` (can be useful to provide extra sanitizer options like DOMPurify)
- `registerExternalResources` was renamed to `externalResources`

```diff
this.gridOptions = {
- registerExternalResources: [new ExcelExportService()]
+ externalResources: [new ExcelExportService()]
}
```

##### GraphQL Service
- `isWithCursor` was renamed to `useCursor`

##### Header Menu
- `items` list was renamed as `commandItems` to align with all other Menu extensions

##### Filter/Editor
Any Editor/Filter options (internal or 3rd party lib like Flatpickr, Autocompleter, ...) were migrated from `params` to `filterOptions` or `editorOptions`. You can still use `params` for other usage though.
```diff
this.columnDefinitions = {
{
  id: 'duration', name: 'Duration', field: 'duration',
  filterable: true,
  filter: {
    model: Filters.slider,
-   params: { hideSliderNumber: true } as SliderOption
+   filterOptions: { hideSliderNumber: true } as SliderOption
  },
  editor: {
    model: Editors.slider,
-   params: { hideSliderNumber: true } as SliderOption
+   editorOptions: { hideSliderNumber: true } as SliderOption
  },
}
```

### Package Location Change
_This should be transparent and irrelevant to most users..._

- `BindingEventService` moved from `@slickgrid-universal/common` to `@slickgrid-universal/binding`, you will also need to check your dependencies and apply changes if you have it installed.
```diff
- import { BindingEventService } from '@slickgrid-universal/common';
+ import { BindingEventService } from '@slickgrid-universal/binding';
```

### Removed functions
_This should be transparent and irrelevant to most users..._
- remove leftover jQuery slide/fade animations in all toggle methods, use CSS animation instead. We are removing the last `animate` boolean argument that was previously available on all of these methods:
  - `setTopPanelVisibility`, `setHeaderRowVisibility`, `setColumnHeaderVisibility`, `setFooterRowVisibility`, `setPreHeaderPanelVisibility`

### Rename Util functions (shorter names)
_This should be transparent and irrelevant to most users..._

Some of the DomUtils Service function were renamed, if you use any of them then rename them (the first 2 are used in multiple places)
- `getHtmlElementOffset` renamed to `getOffset`
- `sanitizeHtmlToText` reimplemented as `stripTags`
- `destroyObjectDomElementProps` renamed to `destroyAllElementProps`
- `getElementOffsetRelativeToParent` renamed to `getOffsetRelativeToParent`
- `findFirstElementAttribute` renamed to `findFirstAttribute`
- `htmlEncodedStringWithPadding` renamed to `htmlEncodeWithPadding`

### Excel Export
_requires version >=7.4.0_

Migrate to a new [Excel-Builder-Vanilla](https://github.com/ghiscoding/excel-builder-vanilla) which is a fork of the `excel-builder.js` library. The new fork is all about modernizing Excel-Builder, it drops `Q`, `Lodash` and also replace `JSZip` to `fflate`.

By migrating from `JSZip` to `fflate`, the users should remove any `JSZip` references (like `tsconfig.json`)

```diff
{
  "compilerOptions": {
-    "paths": {
-      "jszip": [
-        "node_modules/jszip/dist/jszip.min.js"
-      ]
-    }
  }
}
```

Also note that `fflate` could use Web Worker for performance reasons and by doing this you might have new CSP errors thrown. You simply need to add a CSP rule to avoid the error `worker-src 'self' blob:;`

## Formatters / CSP (Content Security Policy) Compliance
### Formatters Cleanup & Removals
I decided to remove a bunch of Formatters (like `Formatters.bold`, `Formatters.uppercase`, ...) because they could and should be using the column `cssClass` option. Basically, I did not myself use the best practice available when creating soo many Formatters and I did not realized that we could simply use `cssClass` which is a much more efficient way and so I'm correcting this inadvertence in this new release. With that in mind, I decided to do a big cleanup in the list of Formatters to make the project a little more lightweight with less code to support and replace some of them with more generic alternatives (see below).

The benefits of using `cssClass` are non negligible since it will slightly decrease the project size and code to support, but most importantly it is a lot more efficient, because applying CSS is a lot quicker in comparison to parse and apply a formatter on each cell. See below for the list of deleted (or replaced) Formatters and their equivalent Column `cssClass` property to use (when available).

> **Note** the CSS class name to use might be different depending on which framework you use in your project, i.e. Bootstrap/Bulma/Material

```diff
this.columnDefinitions = [
  {
    id: 'firstName', name: 'First Name', field: 'firstName',
-   formatter: Formatters.bold
+   cssClass: 'text-bold'
  },
  {
    id: 'lastName', name: 'Last Name', field: 'lastName',
-   formatter: Formatters.multiple, params: { formatters: [Formatters.uppercase, Formatters.bold] },
+   cssClass: 'text-uppercase text-bold'
  },
  {
    id: 'deleteIcon', name: '', field: '',
-   formatter: Formatters.deleteIcon,
    // NOTE: we previously accepted "icon" and "formatterIcon" in the past but these names are now removed
+   formatter: Formatters.icon, params: { iconCssClass: 'fa fa-trash pointer' }
  },
];
```
| Formatter removed | `cssClass` equivalent | alternative |
| ------------------|-----------------------|------------------------|
| `Formatters.bold` | `cssClass: 'text-bold'` or `fw-bold` |
| `Formatters.center` | `cssClass: 'text-center'` |
| `Formatters.italic` | `cssClass: 'text-italic'` or `fst-italic` |
| `Formatters.alignRight` | `cssClass: 'text-right'` or `text-end` |
| `Formatters.lowercase` | `cssClass: 'text-lowercase'`|
| `Formatters.uppercase` | `cssClass: 'text-uppercase'`|
| `Formatters.fakeHyperlink` | `cssClass: 'text-underline cursor'` | `cssClass: 'fake-hyperlink'` |
| `Formatters.checkbox` | n/a ... removed | use the `Formatters.iconBoolean` |
| `Formatters.deleteIcon` | n/a ... removed | use the `Formatters.icon` (see above) |
| `Formatters.editIcon` | n/a ... removed | use the `Formatters.icon` (see above) |
| `Formatters.infoIcon` | n/a ... removed | use the `Formatters.icon` (see above) |
| `Formatters.yesNo` | n/a ... rarely used, so it was removed |  create a custom Formatter |

### All Formatters were rewritten as native HTML (CSP Safe)
The previous Formatters implementation were all returning HTML strings (or `FormatterResultObject`), however that approach was not CSP safe by default and we have to do some extra transformations in order to be CSP safe. The transformation is to take the HTML string, sanitize it (DOMPurify is used by default unless a custom `sanitizer` is provided, for example in Salesforce DOMPurify doesn't work so a custom sanitizer is provided) and if you do use DOMPurify then its transformation will return `TrustedHTML` (when enabled with `RETURN_TRUSTED_TYPE: true` which is the default in here) which is CSP safe and we can finally assign it the cell content via `innerHTML` but as you can see, that required couple of extra steps. With that in mind, if we were to return native HTML directly from our Formatter, we could then bypass any transformations and simply use `.appendChild()` and that is exactly why I decided to rewrite some built-in Formatters as native code, the bonus is that this is much more efficient (no transformation) and is also 100% CSP safe since it's already native. For the most part this change shouldn't affect you too much **unless** you chained some of these Formatters (e.g. with `Formatters.multiple`) or if you were expecting an HTML string that you were then concatenating another string to a built-in Formatter result, then that might break your UI and you will have to update your code.

> **Note** prior to this release, Slickgrid-Universal only supported returning HTML string (or via an object of type `FormatterResultObject`). With this release, we still support returning HTML string but now we also support returning native HTML in addition (or as `FormatterResultWithHtml`)

**Since all Formatters were rewritten as HTML, you might get unexpected behavior in your UI, you will have to inspect your UI and make changes accordingly**. For example, I had to adjust [Example 30](https://ghiscoding.github.io/Angular-Slickgrid/#/composite-editor) `customEditableInputFormatter` because it was expecting all Formatters to return an HTML string and I was concatenating them to an HTML string but that code was now resulting in `[object HTMLElement]`, so I had to update the code and detect if Formatter output is a native element then do something or else do something else... Below is the adjustment I had to do to fix my own demo (your use case may vary)

> **Note** some Formatters now return `HTMLElement` or `DocumentFragment`, you can add a condition check with `instanceof HTMLElement` or `instanceof DocumentFragment`, however please also note that a `DocumentFragment` does not have `innerHTML`/`outerHTML` (you can write a simple function for loop to get them, see this [SO](https://stackoverflow.com/a/51017093/1212166) or use `getHTMLFromFragment(elm)` from Slickgrid-Universal)

```diff
const customEditableInputFormatter: Formatter = (_row, _cell, value, columnDef, dataContext, grid) => {
  const isEditableLine = checkItemIsEditable(dataContext, columnDef, grid);
  value = (value === null || value === undefined) ? '' : value;
-  return isEditableLine ? `<div class="editing-field">${value}</div>` : value;
+  const divElm = document.createElement('div');
+  divElm.className = 'editing-field';
+  if (value instanceof HTMLElement) {
+    divElm.appendChild(value);
+  } else {
+    divElm.textContent = value;
+  }
};

init() {
  // ...
  this.gridOptions = {
    editable: true,
    autoAddCustomEditorFormatter: customEditableInputFormatter,
  }
}
```
here's also another use case from [Example 18](https://ghiscoding.github.io/slickgrid-universal/#/example18) using a `DocumentFragment`
```diff
const priceFormatter: Formatter = (_cell, _row, value, _col, dataContext) => {
  const direction = dataContext.priceChange >= 0 ? 'up' : 'down';
-  return `<span class="mdi mdi-arrow-${direction} color-${direction === 'up' ? 'success' : 'danger'}"></span> ${value}`;
+  const fragment = document.createDocumentFragment();
+  const spanElm = document.createElement('span');
+  spanElm.className = `mdi mdi-arrow-${direction} color-${direction === 'up' ? 'success' : 'danger'}`;
+  fragment.appendChild(spanElm);
+  if (value instanceof HTMLElement) {
+    fragment.appendChild(value);
+  }
+  return fragment;
};

init() {
 this.columnDefinitions = [
   {
      id: 'priceChange', name: 'Change', field: 'priceChange', filterable: true, sortable: true, minWidth: 80, width: 80,
      filter: { model: Filters.compoundInputNumber }, type: FieldType.number,
      formatter: Formatters.multiple,
      params: {
        formatters: [Formatters.dollarColored, priceFormatter],
        maxDecimal: 2,
      }
    },
  },
];
```

> **Note** you might be wondering, why do we use a `DocumentFragment` and not just `HTMLElement`? The reason is simply because in some cases you might just want to return multiple elements but without having to wrap them inside a div container... and so you probably guessed it that a `DocumentFragment` allows you to do just that. However please note that it might not be supported by all environment (e.g. Salesforce doesn't support it yet), so a grid option `preventDocumentFragmentUsage` flag was provided and it will instead wrap the elements inside a `span` instead of the fragment (e.g. Tree Formatter uses this technique).
