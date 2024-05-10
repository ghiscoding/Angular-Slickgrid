Before you start, make sure that you don't have any console log warnings (most of the deprecated code from `2.x` were already displaying some console warnings to advise you of what's being removed). So it will be easier to fix the console warnings first, then move on to the list of changes below.

**NOTE:** Last Angular-Slickgrid 3.x version is [v3.3.2](https://github.com/ghiscoding/angular-slickgrid/releases/tag/v3.3.2) and is compatible **only** with Slickgrid-Universal [v0.19.2](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v0.19.2)
- Slickgrid-Universal 1.x versions only works with Angular-Slickgrid 4.x ([Migration Guide 4.x](Migration-to-4.x.md))

## Biggest Breaking Changes
1. Export to File & Export to Excel are now decoupled and opt-in (see [Export Services](#export-services) below)
   - since both exports are opt-in, they are now also both disabled by default
2. Backend Service APIs are now decoupled and opt-in (see [Backend Service API](#backend-service-apis) below)
3. Remove `sg` event name prefix (in other words `(sgOnBeforeEditCell)` becomes `(onBeforeEditCell)`)
   - You can however put them back, in your grid options, to avoid having a lot of refactoring (see [Grid Events](#grid-events) below)
4. Event Emitters are replaced with Custom Events (see [Event Emitters](#event-emitters-are-replaced-with-custom-events-event-data-accessibility-also-changes) below)
   - the optional data, when provided, must now be accessed via `($event.detail)` instead of previously `($event)`
5. Styling (css/sass) main files are now under the `@slickgrid-universal/common` monorepo (see [Stylings](#stylings) below)
6. RxJS 7 is now the minimum version
   - the biggest change that I saw so far was the [`toPromise` deprecation](https://rxjs.dev/deprecations/to-promise) and that was easy enough to replace with `firstValueFrom`

### @deprecated Code (removed)
_note: most of the deprecated code already sends you console warnings, so check your console first._
- removed all Grid Service methods having the word "toDatagrid" in their names
   - for example, `addItemToDatagrid`, `deleteDataGridItem`, ...
   - simply use the newer methods (named as `addItem`, `deleteItemById`, `updateItem`, ...), which have a lot more features and options.
- removed `registerPlugins` Grid Option since all useful plugins/controls already exist in the lib.
- removed `hideColumn(column)` please use `hideColumnById` or `hideColumnByIds` instead
- removed `hideColumnByIndex(idx)` please use `hideColumnById` or `hideColumnByIds` instead
- removed `BackendServiceOption` property named `columnDefinitions`, this is no longer a valid property which means that you cannot use it anymore with OData/GraphQL. This is no longer necessary since the Services can get the columns definition directly from the grid object.
- removed SASS variables
   - `$large-editor-textarea-height`
   - `$large-editor-textarea-width`

## Changes

### 3rd Party Libs
The 3rd party lib named `multiple-select.js` is no longer included within Angular-Slickgrid, it is now a separate npm package named [multiple-select-modified](https://www.npmjs.com/package/multiple-select-modified)

You will have to update the lib path in your `angular.json`, simply update the path as shown below (note that the Slickgrid Bootstrap Theme CSS path portion is optional when using SASS)
##### `angular.json`
```diff
"styles": [
    "node_modules/flatpickr/dist/flatpickr.css",
-   "node_modules/angular-slickgrid/lib/multiple-select/multiple-select.css",
-   "node_modules/angular-slickgrid/styles/css/slickgrid-theme-bootstrap.css",
+   "node_modules/multiple-select-modified/src/multiple-select.css",
+   "node_modules/@slickgrid-universal/common/dist/styles/css/slickgrid-theme-bootstrap.css",
],
"scripts": [
    "node_modules/jquery/dist/jquery.js",
    "node_modules/jquery-ui-dist/jquery-ui.min.js",
    "node_modules/slickgrid/lib/jquery.event.drag-2.3.0.js",
    "node_modules/bootstrap/dist/js/bootstrap.js",
-   "node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js"
+   "node_modules/multiple-select-modified/src/multiple-select.js",
],
```
##### Allowed CommonJS Dependencies (`angular.json`)
You also need to modify the `allowedCommonJsDependencies` option include `assign-deep`, `jquery-ui` (and `stream` for WebPack 5) while `angular-slickgrid` itself can be removed, so your updated option should be (for a full sample, take a look at this [angular.json](https://github.com/ghiscoding/angular-slickgrid-demos/blob/master/bootstrap5-demo-with-translate/angular.json#L20) from 1 of the demo)
```diff
"allowedCommonJsDependencies": [
+  "assign-deep",
   "excel-builder-webpacker",
+  "jquery-ui",
+  "stream"
]
```
and you should also update/create the `ngcc.config.js` in the root of your project (or copy the code live [demo](https://github.com/ghiscoding/angular-slickgrid-demos/blob/master/bootstrap5-demo-with-translate/ngcc.config.js))
```diff
module.exports = {
  packages: {
    'angular-slickgrid': {
      ignorableDeepImportMatchers: [
+       /assign-deep/,
        /slickgrid\//,
        /flatpickr/,
+       /dequal/,
+       /jquery-ui\//,
      ]
    },
  }
};
```

### Interfaces
- renamed `CheckboxSelector` interface to `CheckboxSelectorOption`
- renamed `EditorValidatorOutput` interface to `EditorValidationResult`
- renamed `Sorter` interface to `SortComparer`
- renamed `Sorters` to `SortComparers` (often used when using the Grouping feature)

#### Backend Service APIs
Note that the `BackendServiceApi` is no longer exposed in the `AngularGridInstance`, so if you wish to reference it (for example when you want to use it with an external export button), then create a reference while instantiating it or get it via the grid option `this.gridOptions.backendServiceApi.service`

### Column Definitions
- `headerKey` was replaced by `nameKey` (to align with SlickGrid `name` property when using I18N with translations)

### Grid Events
Removed grid events prefixes SlickGrid (`sg`).
**However** please note that you can always add them back to avoid having to refactor all your grids at once, the main changes are in the global grid options:
```diff
export const GlobalGridOptions: Partial<GridOption> = {
+  eventNamingStyle: EventNamingStyle.camelCase,
}
```

##### _Optional (not recommended)_
_In case you wish to keep `sg` prefix (only for SlickGrid/DataView events) to avoid too many refactoring, then could optionally add them back in your grid options via this option:_
```ts
this.gridOptions = {
  defaultSlickgridEventPrefix: 'sg',
  // ...
}
```

### Event Emitters are replaced with Custom Events (event data accessibility also changes)
Every events available from Angular-Slickgrid (the events that didn't start with the `sg` prefix, for example `angularGridReady`) are no longer exported as Event Emitter, they are instead available as Custom Events so that all Events (regardless or where they come from, that is from Angular-Slickgrid, SlickGrid or the DataView) are now **all** exported as Custom Events and this also means that the optional data is now accessed the same way across **all events** via the event detail property. So you will need to change some of your events
```diff
- (onAngularGridCreated)="angularGridReady($event)"
+ (onAngularGridCreated)="angularGridReady($event.detail)"
```


#### Event Naming Convention (defaults to camel case)
You might have notice the `eventNamingStyle` grid option, it is indeed a new option and with it you can change the names of the events following a defined naming convention. The default is camel case but you could also use the all lower case option (which is an acceptable ES6 syntax), if you take that for example that would become:

So the **default is camelCase** event naming:
```ts
<angular-slickgrid (onClick)="handleOnClick($event.detail)">
```

##### _Optional (not recommended)_
_But if you wish to use all lower case, you can change your grid options with_
```diff
this.gridOptions {
+  eventNamingStyle: EventNamingStyle.lowerCase,
}
```
_That would result in all lower case names_
```diff
<angular-slickgrid
-  (onClick)="handleOnClick($event.detail)">
+  (onclick)="handleOnClick($event.detail)">
```

_Again note that the entire documentation is written with event names following the default camel case format (`onClick`)._

### Grid Options
- Grid Height/Width should now be passed through the Grid Options instead of the View, for example:
```diff
<angular-slickgrid gridId="grid1" [columnDefinitions]="columnDefinitions" [gridOptions]="gridOptions" [dataset]="dataset"
-                   gridHeight="225"
-                   gridWidth="800">
</angular-slickgrid>
```
were moved to the Grid Options in the ViewModel
```diff
this.gridOptions = {
+   gridHeight: 225,
+   gridWidth: 800 // or as a string like '100%'
};
```

### Header Menu
  - renamed `hideFilterCommands` to singular `hideFilterCommand` since there can only be 1 filter per column

### Stylings
The CSS/SASS Stylings now come from the `@slickgrid-universal/common` monorepo package, you need to adjust your imports

##### with CSS (`angular.json`)
```diff
"styles": [
    "node_modules/flatpickr/dist/flatpickr.css",
-   "node_modules/angular-slickgrid/lib/multiple-select/multiple-select.css",
-   "node_modules/node_modules/angular-slickgrid/styles/css/slickgrid-theme-bootstrap.css",
+   "node_modules/multiple-select-modified/src/multiple-select.css",
+   "node_modules/@slickgrid-universal/common/dist/styles/css/slickgrid-theme-bootstrap.css",
],
```

##### with SASS `.scss` (`styles.scss`)
```diff
# with SASS
- @import 'angular-slickgrid/styles/sass/slickgrid-theme-bootstrap.scss';
+ @import '@slickgrid-universal/common/dist/styles/sass/slickgrid-theme-bootstrap.scss';
```

## Services

### Grid Service
- `updateItem()` will no longer highlight the row by default (to get back this behavior add the option `highlightRow: true`)

#### OData Service
The `GridOdataService` is now an opt-in Service and is no longer exposed in the `AngularGridInstance`, you need create a reference while instantiating it or get it via the grid option `this.gridOptions.backendServiceApi.service`
```diff
- import { GridOdataService, OdataServiceApi, OdataOption } from 'angular-slickgrid';
+ import { GridOdataService, OdataServiceApi, OdataOption } from '@slickgrid-universal/odata';

export class MyExample {
  prepareGrid {
    this.columnDefinitions = [ /*...*/ ];
    this.gridOptions = {
      backendServiceApi: {
        service: new GridOdataService(),
        options: { /*...*/ } as OdataServiceApi
    }
  }
}
```

#### GraphQL Service
The `GraphqlService` is now an opt-in Service and is no longer exposed in the `AngularGridInstance`, you need create a reference while instantiating it or get it via the grid option `this.gridOptions.backendServiceApi.service`
```diff
- import { GraphqlService, GraphqlPaginatedResult, GraphqlServiceApi, } from 'angular-slickgrid';
+ import { GraphqlService, GraphqlPaginatedResult, GraphqlServiceApi, } from '@slickgrid-universal/graphql';

export class MyExample {
  prepareGrid {
    this.columnDefinitions = [ /*...*/ ];
    this.gridOptions = {
      backendServiceApi: {
        service: new GraphqlService(),
        options: { /*...*/ } as GraphqlServiceApi
    }
  }
}
```

### Export Services
#### Text File Export Service
Export Service was renamed to `TextExportService` (export extensions are `.txt`, `.csv`) and is now an opt-in Servicem it is also no longer exposed in the `AngularGridInstance`. You need to use the new `@slickgrid-universal/text-export` packages and register the service(s) in your grid options as shown below.

Also note that Text Export Service grid options changed as well, a few options got deprecated and renamed to have the word "textExport" instead of just "export". Also to be clear, it's deprecated but still exist, this will give you time to refactor your code. Here's the list
- deprecate `exportOptions` and renamed to `textExportOptions`
- deprecate `enableExport` flag and renamed to `enableTextExport`
- the onBefore/onAfter events got renamed as well:
   - `onGridBeforeExportToExcel` renamed to `onBeforeExportToExcel`
   - `onGridAfterExportToExcel` renamed to `onAfterExportToExcel`
   - `onGridBeforeExportToFile` renamed to `onBeforeExportToTextFile`
   - `onGridAfterExportToFile` renamed to `onAfterExportToTextFile`

```diff
import { Column, GridOption } from 'angular-slickgrid';
+ import { ExcelExportService } from '@slickgrid-universal/excel-export';
+ import { TextExportService } from '@slickgrid-universal/text-export';

export class MyExample {
  prepareGrid {
    this.columnDefinitions = [ /*...*/ ];
    this.gridOptions = {
      enableExcelExport: true,
      excelExportOptions: { sanitizeDataExport: true },
-     enableExport: true,
-     exportOptions: { sanitizeDataExport: true },
+     enableTextExport: true,
+     textExportOptions: { sanitizeDataExport: true },

      // add 2x Export Services (you can add a single or both export services, it should always be an array
+     registerExternalResources: [new ExcelExportService(), new TextExportService()],
    }
  }
}
```

#### Excel Export Service
The `ExcelExportService` is also an opt-in Service and is no longer exposed in the `AngularGridInstance`, so if you wish to reference it (for example when you want to use it with an external export button), then create a reference while instantiating it (the `excelExportOptions` are the same as before).
```diff
import { Column, GridOption } from 'angular-slickgrid';
+ import { ExcelExportService } from '@slickgrid-universal/excel-export';

export class MyExample {
+  excelExportService = new ExcelExportService(); // create a variable ref when you need to access it later

  prepareGrid {
    this.columnDefinitions = [ /*...*/ ];
    this.gridOptions = {
      enableExcelExport: true,
      excelExportOptions: { sanitizeDataExport: true },
+     registerExternalResources: [this.excelExportService],
    }
  }

  exportToExcel() {
-    this.angularGrid.excelExportService.exportToExcel({ filename: 'Export', format: FileType.xlsx });
+    this.excelExportService.exportToExcel({ filename: 'export', format: FileType.xlsx });
  }
}
```

### Custom Footer
The Custom Footer component is now an external reusable component coming from Slickgrid-Universal and the `dateFormat` changed, it is now using the MomentJS date format (which is the same as all other Date Formatter) instead of the previous Angular date format. The changes in the global grid options is shown below, if you had it defined in your own grid options then make sure to use the correct format

```diff
customFooterOptions: {
-  dateFormat: 'yyyy-MM-dd, hh:mm aaaaa\'m\'',
+  dateFormat: 'YYYY-MM-DD, hh:mm a',
   // ...
}
```