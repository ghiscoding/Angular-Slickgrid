## SlickGrid is now jQuery free 🌊

In our previous v5.0 release (see [Migration to v5.0](https://github.com/ghiscoding/angular-slickgrid/wiki/Migration-to-5.x)), we dropped jQueryUI and now in v6.0 we are going even further and are now dropping [jQuery](https://jquery.com/) entirely. You can still use jQuery but it's no longer a dependency. There are multiple benefits in dropping jQuery and go the vanilla route, the biggest advantages are:

1. it should provide better performance (browser native)
2. build size should be smaller (see table below) 

#### Major Changes - Quick Summary
- minimum requirements bump
  - Angular `>=16.0.0`
  - RxJS `>=8.7.1`
- we dropped jQuery requirement
  - it also required us to rewrite the `multiple-select` (jQuery based lib) into a brand new [`multiple-select-vanilla`](https://github.com/ghiscoding/multiple-select-vanilla) lib which is now native and has zero dependency

---

**NOTE:** if you come from an earlier version other than 5.x, please make sure to follow each migration in their respected order

## Changes

### Dynamically Loading Component via `AngularUtilService`
as shown in ([Example 21 - Row Detail](https://ghiscoding.github.io/Angular-Slickgrid/#/rowdetail) / [Example 22 - Angular Components](https://ghiscoding.github.io/Angular-Slickgrid/#/angular-components))

In our `AngularUtilService` we were dynamically creating component by using `ComponentFactoryResolver` but that got removed in Angular 16 and so we had to replace it with `ViewContainerRef` and for that to work you might need to add `providers` to use it as a singleton

When using AngularUtilService, you might need to add it in your `providers` list
```diff
@Component({
  // ...
+  providers: [AngularUtilService]
})
export class GridComponent
```

#### `createAngularComponentAppendToDom` signature change (starting from `v6.3.0`)
Also in the same `AngularUtilService`, the method signature arguments `createAngularComponentAppendToDom` changed slightly, the 3rd argument was previously `clearTargetContent`, to match the signature of `createAngularComponent`, but is now replaced by `data` so that you can provide data to the new Component instance. The `clearTargetContent` was dropped because it is no longer needed since we should always replace the entire html content and that is now the default. 

The new signature, in `v6.3.0`, for both `createAngularComponent` and `createAngularComponentAppendToDom` is now the following:
```ts
// the `CreateComponentOption` are the options you can provide to `ViewContainerRef.createComponent`
createAngularComponent<C>(component: Type<C>, targetElement?: HTMLElement, data?: any, createCompOptions?: CreateComponentOption) {}
createAngularComponentAppendToDom<C>(component: Type<C>, targetElement?: HTMLElement, data?: any, createCompOptions?: CreateComponentOption) {}
```

### replaced `multiple-select` with [`multiple-select-vanilla`](https://github.com/ghiscoding/multiple-select-vanilla)
This change was required because the previous library was a jQuery based lib, so I rewrote the lib as a new native lib to drop jQuery. However with this change, there were a couple of options that were dropped and/or modified. 

```diff
// you can load `MultipleSelectOption` from either the new Multiple-Select-Vanilla lib or from Angular-Slickgrid (which is a re-export)
  import { MultipleSelectOption } from 'angular-slickgrid';       // still works, but is a re-export of the import shown below
+ import { MultipleSelectOption } from 'multiple-select-vanilla'; // preferred

filterOptions: { 
-  autoDropWidth: true, // removed and no longer required
} as MultipleSelectOption
```

The new lib also offers a bunch of new options as well, you can see the full interface at [MultipleSelectOption](https://github.com/ghiscoding/multiple-select-vanilla/blob/main/lib/src/interfaces/multipleSelectOption.interface.ts)

### Slickgrid-Universal
If you use any of the Slickgrid-Universal extra dependencies then make sure to upgrade them to the new major `3.0.0` version so that they work with Angular-Slickgrid `6.0.0`

```diff
  "dependencies": {
-   "@slickgrid-universal/excel-export": "^2.6.4",
+   "@slickgrid-universal/excel-export": "^3.0.0",
-   "angular-slickgrid": "^5.6.4",
+   "angular-slickgrid": "^6.0.0",
}
```

### `angular.json` config
Since we dropped jQuery, you can also remove it from your `angular.json` list of scripts as well and anywhere else that might be referencing it. Also the `multiple-select-modified` now uses SASS and is now imported directly in Slickgrid-Universal, so CSS imports are no longer needed

```diff
# angular.json
{ 
   // ...
    "allowedCommonJsDependencies": [
      "assign-deep",
      "autocompleter",
      "dompurify",
      "excel-builder-webpacker",
      "flatpickr",
-     "jquery",
      "stream"
    ],
 
   // ...
   "styles": [
     "node_modules/bootstrap/dist/css/bootstrap.min.css",
     "node_modules/flatpickr/dist/flatpickr.min.css",
-    "node_modules/multiple-select-modified/src/multiple-select.css",
     "src/styles.scss"
   ],
   "scripts": [
     "node_modules/bootstrap/dist/js/bootstrap.min.js",
-    "node_modules/jquery/dist/jquery.min.js",
-    "node_modules/multiple-select-modified/src/multiple-select.js",
     "node_modules/sortablejs/Sortable.min.js"
   ],
```

### Editor/Filter `params` should be using `editorOptions`/`filterOptions`
For better TypeScript support, we now recommend to use either `editorOptions` or `filterOptions` depending if it's an Editor or a Filter.

```diff
this.columnDefinitions = [{
  id: 'cost', name: 'Cost', field: 'cost',
  editor: {
    model: Editors.slider,
-    params: { hideSliderNumber: false }
+    editorOptions: { hideSliderNumber: false } as SliderOption
  },
  filter: {
    model: Filters.slider,
-    params: { hideSliderNumber: false }
+    filterOptions: { hideSliderNumber: false } as SliderOption
  },
```

### Final Note
and that's about it, the migration is relatively simple as you can see :)

---

### File Size Comparisons
While comparing with the folder properties with "size on disk" on Windows, we're averaging 4-5% smaller size in our new release by removing jQuery with this new release.