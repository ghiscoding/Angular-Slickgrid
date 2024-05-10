## Bye Bye jQueryUI... 👋🏻 welcome [SortableJS](https://sortablejs.github.io/Sortable/) 🚀

This new release is rather small for the developer, but a lot changed internally and SortableJS will improve performance and usability since it also works great with touch. The main change for the developer would be if you use the `Editors.autoComplete` since that changed to `Editors.autocompleter` (same goes for associated Filters)... and that's about it for changes since the rest are mostly removal of deprecated things. If you want to know more about the reason behind the removal of jQueryUI (internally), then read the "Why replace jQueryUI with SortableJS?" section below (hint, the next major version will probably remove jQuery as well). 

#### Major Changes - Quick Summary
- minimum requirements
  - Angular `>=14.0.0`
  - RxJS `>=7.5.0`
- replaced jQueryUI with [SortableJS](https://sortablejs.github.io/Sortable/)
  - it required us to replace jQueryUI Autocomplete Editor/Filter, see [Kraaden Autocomplete](#replace-jqueryui-autocomplete-with-kraaden-autocomplete) below
- [Why replace jQueryUI with SortableJS?](#why-replace-jqueryui-with-sortablejs)

---

**NOTE:** if you come from a version earlier than 4.x, it is very important that you follow each migration in the respected order

### Removed Code
1. ~Since we dropped jQueryUI, and we were using jQueryUI Slider for the `Filters.SliderRange`, we had to remove the Slider Range and we don't currently have a replacement at the moment, though it might come in the future.~ The Slider Range Filter got rewritten in pure JS and is back in version **[v5.1.0](https://github.com/ghiscoding/angular-slickgrid/releases/tag/v5.1.0)** release (see [Example 25](https://ghiscoding.github.io/Angular-Slickgrid/#/range)).
2. `BsDropdownService` was also removed, the alternative is simply to use the built-in [Cell Menu](/ghiscoding/angular-slickgrid/wiki/Cell-Menu)

### @deprecated Code
##### Text Export Service (see [code change](#text-export-service) sample below)
- `enableExport` was renamed to `enableTextExport`
- `exportOptions` was renamed to `textExportOptions`

##### SASS - Autocomplete 
Since we replaced the jQueryUI Autocomplete with the 3rd party lib [Kraaden Autocomplete](https://github.com/kraaden/autocomplete) (see below), there are a few SASS/CSS variables that we no longer need and were removed.

###### variables removed
- `$slick-autocomplete-box-shadow`
- `$slick-autocomplete-border-radius`
- `$slick-autocomplete-hover-color`
- `$slick-autocomplete-hover-border-color`
- `$slick-autocomplete-loading-input-bg-color`
- `$slick-autocomplete-min-width`
- `$slick-autocomplete-overflow-x`
- `$slick-autocomplete-overflow-y`
- `$slick-autocomplete-text-color`
- `$slick-autocomplete-text-overflow`
- `$slick-autocomplete-text-padding`

## Changes

### Text Export Service

Here's an example of the code change that you need to do
```diff
this.gridOptions = {
- enableExport: true,
- exportOptions: {
+ enableTextExport: true,
+ textExportOptions: {
    sanitizeDataExport: true
  },
```

### Slickgrid-Universal
If you use any of the Slickgrid-Universal extra dependencies then make sure to upgrade them to `2.0.0` so that they work with Angular-Slickgrid `5.0.0`

```diff
  "dependencies": {
-   "@slickgrid-universal/excel-export": "^1.4.0",
+   "@slickgrid-universal/excel-export": "^2.0.0",
-   "angular-slickgrid": "^4.3.4",
+   "angular-slickgrid": "^5.0.0",
}
```

### `angular.json` config
Since we dropped jQueryUI, you then need to remove it from your `angular.json` and anywhere else that might reference it, but you also need to add SortableJS 

```diff
# angular.json
{ 
   // ...
    "allowedCommonJsDependencies": [
      "assign-deep",
+     "autocompleter",
      "dompurify",
      "excel-builder-webpacker",
      "flatpickr",
      "jquery",
-     "jquery-ui",
      "stream"
    ],
 
  // ...
     "scripts": [
         "node_modules/jquery/dist/jquery.min.js",
-        "node_modules/jquery-ui/dist/jquery-ui.min.js",
-        "node_modules/slickgrid/lib/jquery.event.drag-2.3.0.js",
         "node_modules/bootstrap/dist/js/bootstrap.min.js",
         "node_modules/multiple-select-modified/src/multiple-select.js",
+        "node_modules/sortablejs/Sortable.min.js"
     ],
```

### Replaced JqueryUI Autocomplete with [Kraaden Autocomplete](https://github.com/kraaden/autocomplete)
Since we dropped jQueryUI, we had to find an alternative for the AutoComplete Editor/Filter and we settled on the 3rd party lib [Kraaden Autocomplete](https://github.com/kraaden/autocomplete) which does nearly everything that the jQueryUI one was providing. There are subtle changes requiring few line of code change (see below). We also have a new [Autocomplete Editor (Kraaden)](https://github.com/ghiscoding/angular-slickgrid/wiki/Autocomplete-Editor-(Kraaden-lib)) Wiki (and we kept a reference to the old jQueryUI AutoComplete Wiki for users of older Angular-Slickgrid versions).

You will notice that the Editor/Filter `model` name is quite similar, there are only 2 chars that are different to make it clear that there's a change for the developer (a lower `c` and a `r` at the end of the word which is forming the new name `model: Editors.autocompleter` and the same goes for `AutocompleterOption`)

If you were using the Autocomplete `onSelect` callback, it got renamed to `onSelectItem`. If you were using `openSearchListOnFocus`, then that is now simply `showOnFocus` with the Kraaden Autocomplete (refer to Kraaden Autocomplete [options](https://github.com/kraaden/autocomplete#options), to use them in `editorOptions` or `filterOptions`)

```diff
import {
-  AutocompleteOption,
+  AutocompleterOption,
} from '@slickgrid-universal/common';

prepareGrid() {
  this.columnDefinitions = [{
    id: 'cityOfOrigin', name: 'City of Origin', field: 'cityOfOrigin',
    filterable: true,
    editor: {
-     model: Editors.autoComplete,
+     model: Editors.autocompleter,
      editorOptions: {
        minLength: 3,
        forceUserInput: true,
-       source: (request, response) => {
+       fetch: (searchText, updateCallback) => {
          $.ajax({
            url: 'http://gd.geobytes.com/AutoCompleteCity',
            dataType: 'jsonp',
            data: {
-             q: request.term
+             q: searchText
            },
            success: (data) => {
-             response(data);
+             updateCallback(data);
            }
          });
        }
-     } as AutocompleteOption,
+     } as AutocompleterOption,
    filter: {
-     model: Filters.autoComplete,
+     model: Filters.autocompleter,
      filterOptions: {
        // ... the rest is the same as the Editor
      }
    }
  }
}
```

### Why replace [jQueryUI](https://jqueryui.com/) with [SortableJS](https://sortablejs.github.io/Sortable/)?
Prior to this new version, jQueryUI had to be installed, that was even for a basic grid, but the fact was that the only jQueryUI feature we needed in SlickGrid was [jQueryUI - Sortable](https://jqueryui.com/sortable/) for column reordering. Considering that SlickGrid required jQueryUI at 281Kb (js+css) just to get column reordering, we figured it was a rather large request, don't you think? We did use jQueryUI Autocomplete & Slider as well but the jQueryUI lib is rather large, is barely maintained and is now quite outdated. [SortableJS](https://sortablejs.github.io/Sortable/) is now the dependency used by SlickGrid and is a lot smaller and more up to date in the JS world.

#### jQueryUI Cons
 - old and outdated, barely supported and rather large (probably because it was written when IE5 was a thing)
 - it does not support Touch that well (mobile devices)
 - it is rather large at 250Kb (min.js) + 31Kb (min.css)
#### SortableJS Pros
 - much smaller at 44Kb (`min.js` doesn't require any css)
 - touch friendly (mobile devices)
 - much smoother UX and better performance
 - written in pure JS without any dependencies