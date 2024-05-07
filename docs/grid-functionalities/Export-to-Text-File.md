#### index
- [Grid Options](#grid-options)
- [Column Definition & Options](#column-definition-and-options)
- [Export from Button Click](#export-from-a-button-click-event)
- [Event Aggregators](#event-aggregators)
- [Show Loading Process Spinner](#show-loading-process-spinner)
- [UI Sample](#ui-sample)

### Description
You can Export to File in 2 formats (csv/txt), the following formats are currently supported
- Export to CSV format (`.csv`)
- Export to Text file (`.txt`) with a delimiter of your choice (Tab delimited is a good one to use)

**NOTE:** this is an opt-in Service, you must download the necessary Service from `@slickgrid-universal/text-export` and instantiate it in your grid options via `registerExternalResources`, see multiple examples below.

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/localization) / [Demo Component](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/grid-localization.component.ts)

### Grid Menu (hamburger menu)
The Grid Menu already has the "Export to CSV" enabled by default, so you will see it automatically in your Grid Menu. You still have the options to show or hide the 2 types of export
- `showExportCsvCommand` true by default, so it's optional
- `showExportTextDelimitedCommand` false by default, so if you want it, you will need to enable it

### Grid Options
You can set certain options for the entire grid, for example if you set `exportWithFormatter` it will evaluate the Formatter (when exist) output to export. The Grid Menu also has the "Export to CSV" enabled by default.
```ts
import { TextExportService } from '@slickgrid-universal/text-export';

export class MyGrid {
  defineGrid() {
    this.gridOptions = {
      // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
      textExportOptions: {
        exportWithFormatter: true
      },
      externalResources: [new TextExportService()],
      gridMenu: {
        showExportCsvCommand: true,           // true by default, so it's optional
        showExportTextDelimitedCommand: true  // false by default, so if you want it, you will need to enable it
      }
    };
  }
}
```

### Column Definition and Options
#### Options
Inside the column definition there are couple of flags you can set and also some behavior that should be aware of:
- `excludeFromExport` flag, which as it's name suggest will skip that column from the export
- `exportWithFormatter` flag (same as Grid Options but this flag defined in the Column Definition has higher priority).
  - So basically, if `exportWithFormatter` is set to True in the `textExportOptions` of the Grid Options, but is set to False in the Column Definition, then the result will be False and will not evaluate it's Formatter.
- `exportCustomFormatter` will let you choose a different Formatter when exporting
  - For example, you might have `formatter: Formatters.checkmark` but you want to see a boolean translated value, in this case you would define an extra property of `exportCustomFormatter: Formatters.translateBoolean`.
- you can set `exportCsvForceToKeepAsString` flag, this one will wrap the cell value into double quotes and add an equal sign in the front, this is especially useful on a column that could be turned into an exponential number by Excel. For example, we could have "1E06" and without this flag will become (1.0E06) in Excel, unless we enable the flag which will become `="1E06"` which will keep it as a string, also note that it will be shown as "1E06" but if you click on the cell value, you will see `="1E06"`
- set `sanitizeDataExport` to remove any HTML/Script code from being export. For example if your value is `<span class="mdi mdi-check">True</span>` will export `True` without any HTML (data is sanitized).
   - this flag can be used in the Grid Options (all columns) or in a Column Definition (per column).

#### Behaviors
- If you have a `headerKey` defined (for Translate (i18n)), it will use the translated value as the Header Title
- The file will automatically have the UTF-8 BOM encoding so that it works with Latin and even Unicode characters (see [UI Sample](#ui-sample).
> The UTF-8 BOM is a sequence of bytes (EF BB BF) that allows the reader to identify a file as being encoded in UTF-8.

```ts
import { TextExportService } from '@slickgrid-universal/text-export';

defineGrid() {
  this.columnDefinitions = [
    { id: 'id', name: 'ID', field: 'id',
      excludeFromExport: true // skip the "id" column from the export
    },
    { id: 'title', name: 'Title', field: 'id', headerKey: 'TITLE',
      formatter: myCustomTitleFormatter,
      exportWithFormatter: false // this Formatter will not be evaluated
    },
    { id: 'start', name: 'Start', field: 'start',
      headerKey: 'START',
      formatter: Formatters.dateIso // this formatter will be used for the export
    },
    { id: 'finish', name: 'Finish', field: 'start',
      headerKey: 'FINISH',
      formatter: Formatters.dateIso // this formatter will be used for the export
    },
    { id: 'completed', name: 'Completed', field: 'completed', headerKey: 'COMPLETED',
      formatter: Formatters.checkmarkMaterial,              // will display a checkmark icon in the UI
      customFormatter: Formatters.translateBoolean, // will export a translated value, e.g. in French, True would show as 'Vrai'
    }
  ];

  this.gridOptions = {
    // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
    textExportOptions: {
      exportWithFormatter: true
    },
    externalResources: [new TextExportService()],
  };
```

What we can see from the example, is that it will use all Formatters (when exist) on this grid, except for the last column "Completed" since that column has explicitly defined `exportWithFormatter: false`

### Export from a Button Click Event
You can use the export from the Grid Menu and/or you can simply create your own buttons to export.
#### View
```html
<button class="btn btn-default btn-sm" (click)="exportToFile('csv')">
   Download to CSV
</button>
<button class="btn btn-default btn-sm" (click)="exportToFile('txt')">
    Download to Text
</button>
```

##### ViewModel
The code below is just an example and it can be configured in many ways, the delimiter used can also be anything you want.
```ts
import { TextExportService } from '@slickgrid-universal/text-export';

export class MySample {
  textExportService = new TextExportService();

  defineGrid() {
    this.gridOptions = {
      enableTextExport: true,
      externalResources: [this.textExportService],
    };
  }

  exportToFile(type = 'csv') {
    this.textExportService.exportToFile({
      delimiter: (type === 'csv') ? DelimiterType.comma : DelimiterType.tab,
      filename: 'myExport',
      format: (type === 'csv') ? FileType.csv : FileType.txt
    });
  }
}
```

### Show Loading Process Spinner
If you have lots of data, you might want to show a spinner telling the user that something is happening. You can use the Event Emitters `(onBeforeExportToTextFile)` to start your spinner and then `(onAfterExportToTextFile)` to stop the spinner once the process is done. You can see a this [Grouping Example](https://ghiscoding.github.io/Angular-Slickgrid/#/grouping) demo which has this feature enabled.

#### View
```html
<span [hidden]="!processing">
   <i class="mdi mdi-sync mdi-spin-1s"></i>
</span>

<angular-slickgrid gridId="grid2"
                     [dataset]="dataset"
                     [columnDefinitions]="columnDefinitions"
                     [gridOptions]="gridOptions"
                     (onBeforeExportToTextFile)="processing = true"
                     (onAfterExportToTextFile)="processing = false"
                     (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>
```

##### Component
```ts
export class MyComponent() implements OnInit {
  processing = false;
}
```

### UI Sample
The Export to Text File handles all characters quite well, from Latin, to Unicode and even Unicorn emoji, it all works on all browsers (`Chrome`, `Firefox`, even `IE11`, I don't have access to older versions). Here's a demo
![export-to-file](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/screenshots/export-to-file.png)