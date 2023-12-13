#### index
- [Grid Options](#grid-options)
- [Column Definition & Options](#column-definition-and-options)
- [Custom Column Width](#custom-column-width)
- [Custom Cell Styling](#custom-cell-styling)
  - [Cell Value Parser](#cell-value-parser)
- [Cell Format Auto-Detect Disable](#cell-format-auto-detect-disable)
- [Styling the Header Titles](#styling-the-header-titles)
- [Provide Custom Header Title](#provide-a-custom-header-title)
- [Export from Button Click](#export-from-a-button-click-event)
- [Show Loading Process Spinner](#show-loading-process-spinner)
- [UI Sample](#ui-sample)

### Description
You can Export to Excel, it will create an Excel file with the `.xlsx` default extension (you can also change it to be `.xls`). If you wish to export to CSV or other delimiter like Tab Delimited, you can refer to the other [Wiki - Export to File](Export-to-Text-File.md).

**NOTE:** this is an opt-in Service, you must download the necessary Service from `@slickgrid-universal/excel-export` and instantiate it in your grid options via `registerExternalResources`, see multiple examples below.

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/localization) / [Demo Component](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/grid-localization.component.ts)

### Grid Menu (hamburger menu)
The Grid Menu already has the "Export to Excel" enabled by default, so you will see it automatically in your Grid Menu. You still have the options to show/hide from the Grid Menu if you wish
- `hideExportExcelCommand` false by default, so it's optional

### Grid Options
You can set certain options for the entire grid, for example if you set `exportWithFormatter` it will evaluate the Formatter (when exist) output to export each cell. The Grid Menu also has the "Export to Excel" enabled by default.
```ts
import { ExcelExportService } from '@slickgrid-universal/excel-export';

defineGrid() {
  this.gridOptions = {
    enableExcelExport: true,
    // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
    excelExportOptions: {
      exportWithFormatter: true
    },
    externalResources: [new ExcelExportService()],
    gridMenu: {
      hideExportExcelCommand: false,        // false by default, so it's optional
    }
  };
```

### Column Definition and Options
#### Column Definition
- `excludeFromExport` flag, which as it's name suggest will skip that column from the export
- `exportWithFormatter` flag (same as Grid Options but this flag defined in the Column Definition has higher priority).
  - So basically, if `exportWithFormatter` is set to True in the `excelExportOptions` of the Grid Options, but is set to False in the Column Definition, then the result will be False and will not evaluate it's Formatter.
- `exportCustomFormatter` will let you choose a different Formatter when exporting
  - For example, you might have `formatter: Formatters.checkmark` but you want to see a boolean translated value, in this case you would define an extra property of `customFormatter: Formatters.translateBoolean`.
- set `sanitizeDataExport` to remove any HTML/Script code from being export. For example if your value is `<span class="fa fa-check">True</span>` will export `True` without any HTML (data is sanitized).
   - this flag can be used in the Grid Options (all columns) or in a Column Definition (per column).

#### Grid Options
Inside the column definition there are couple of flags you can set in `excelExportOptions` in your Grid Options. You can also see the [excelExportOption.interface](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/excelExportOption.interface.ts) in case the following list is not up to date.
- `addGroupIndentation` flag, enabled by default will add indentation and collapsed/expanded symbols when using grouping feature
   - `groupCollapsedSymbol` will let you choose a different group collapsed symbol, it must be a unicode string (for example "\u25B9" or "\u25B7")
   - `groupExpandedSymbol` will let you choose a different group collapsed symbol, it must be a unicode string (for example "\u25BF" or "\u25BD")
- `exportWithFormatter` flag (same as Grid Options but this flag defined in the Column Definition has higher priority).
  - So basically, if `exportWithFormatter` is set to True in the `excelExportOptions` of the Grid Options, but is set to False in the Column Definition, then the result will be False and will not evaluate it's Formatter.
- `filename` name of the Excel file export (without extension)
- `format` file extension format `.xls`/`.xlsx`
- `sheetName` allows you to change the Excel Sheet Name (defaults to "Sheet1")
- `groupingColumnHeaderTitle` The column header title (at A0 in Excel) of the Group by. If nothing is provided it will use "Group By"
- `groupingAggregatorRowText` The default text to display in 1st column of the File Export, which will identify that the current row is a Grouping Aggregator
- set `sanitizeDataExport` to remove any HTML/Script code from being export. For example if your value is `<span class="fa fa-check">True</span>` will export `True` without any HTML (data is sanitized).
   - this flag can be used in the Grid Options (all columns) or in a Column Definition (per column).
- `customExcelHeader` is a callback method that can be used to provide a custom Header Title to your Excel File

#### Behaviors
- If you have a `headerKey` defined (for Translate (i18n)), it will use the translated value as the Header Title

```ts
import { ExcelExportService } from '@slickgrid-universal/excel-export';

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
      formatter: Formatters.checkmark,              // will display a checkmark icon in the UI
      customFormatter: Formatters.translateBoolean, // will export a translated value, e.g. in French, True would show as 'Vrai'
    }
  ];

  this.gridOptions = {
    // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
    excelExportOptions: {
      exportWithFormatter: true
    },
    externalResources: [new ExcelExportService()],
  };
```

What we can see from the example, is that it will use all Formatters (when exist) on this grid, except for the last column "Completed" since that column has explicitly defined `exportWithFormatter: false`

### Custom Column Width

**NOTE** now deprecated, please use [Custom Cell Styling](#custom-cell-styling) instead

You can define a custom Excel column width (the width Excel's own width which is not in pixel). You can define a custom width per column (in your column definitions) and/or for the entire grid (in your grid options).

#### Per Column
You could set a custom width per column
```ts
this.columnDefinitions = [
  { id: 'firstName', name: 'FirstName', exportColumnWidth: 10, },
  // ...
];
```

#### For the entire Grid
You could also set a custom width for the entire grid export via the `excelExportOptions`
```ts
this.gridOptions = {
  // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
  excelExportOptions: {
    customColumnWidth: 15,
  },
  externalResources: [new ExcelExportService()],
};
```

### Styling the Header Titles
By default the header titles (first row) will be styled as Bold text, however you can choose to style them differently with custom styles as shown below. To find out what styling you can use, you can take a look [Web Archive - Excel Builder](http://web.archive.org/web/20160907052007/http://excelbuilderjs.com/cookbook/fontsAndColors.html) website. The code shown below is used in [Example 26](https://ghiscoding.github.io/Angular-Slickgrid/#/context) if you wish to see the result.

```ts
this.gridOptions = {
  // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
  excelExportOptions: {
    // you can customize how the header titles will be styled (defaults to Bold)
    columnHeaderStyle: { font: { bold: true, italic: true } }
  },
  externalResources: [new ExcelExportService()],
};
```

### Provide a Custom Header Title
You can optionally add a custom header title, you can see the UI Sample below, (that will be shown on first row of the Excel file) through the `customExcelHeader` callback method. We use the library `Excel-Builder` to create the export, however note that this library is no longer supported (but still the best) and the documentation site no longer exist but you can find all info on [Web Archive - Excel Builder](http://web.archive.org/web/20160907052007/http://excelbuilderjs.com/cookbook/fontsAndColors.html)

The example below shows a title which uses a merged cell from "B1" to "D1" with a red bold color (pay attention to the color code, you need to add an extra "FF" in front of an html color code).
#### ViewModel
```ts
export class MyExample {
  prepareGrid() {
    this.columnDefinitions = [];

    this.gridOptions = {
      externalResources: [new ExcelExportService()],
      excelExportOptions: {
        // optionally pass a custom header to the Excel Sheet
        // a lot of the info can be found on Web Archive of Excel-Builder
        // http://web.archive.org/web/20160907052007/http://excelbuilderjs.com/cookbook/fontsAndColors.html
        customExcelHeader: (workbook, sheet) => {
          const customTitle = this.translate.currentLang === 'fr' ? 'Titre qui est suffisament long pour être coupé' : 'My header that is long enough to wrap';
          const stylesheet = workbook.getStyleSheet();
          const aFormatDefn = {
            'font': { 'size': 12, 'fontName': 'Calibri', 'bold': true, color: 'FF0000FF' }, // every color starts with FF, then regular HTML color
            'alignment': { 'wrapText': true }
          };
          const formatterId = stylesheet.createFormat(aFormatDefn);
          sheet.setRowInstructions(0, { height: 30 }); // change height of row 0

          // excel cells start with A1 which is upper left corner
          sheet.mergeCells('B1', 'D1');
          const cols = [];
          // push empty data on A1
          cols.push({ value: '' });
          // push data in B1 cell with metadata formatter
          cols.push({ value: customTitle, metadata: { style: formatterId.id } });
          sheet.data.push(cols);
        }
      },
    }
  }
```

### Export from a Button Click Event
You can use the export from the Grid Menu and/or you can simply create your own buttons to export.
#### View
```html
<button class="btn btn-default btn-sm" (click)="exportToExcel()">
   Download to Excel
</button>
```

##### ViewModel
The code below is just an example and it can be configured in many ways, see the `excelExportOptions`.
```ts
import { ExcelExportService } from '@slickgrid-universal/excel-export';

export class MySample {
  excelExportService = new ExcelExportService();

  defineGrid() {
    this.gridOptions = {
      enableExcelExport: true,
      externalResources: [this.excelExportService],
    };
  }

  exportToFile() {
    this.excelExportService.exportToExcel({
      filename: 'myExport',
      format: FileType.xlsx
    });
  }
}
```

### Show Loading Process Spinner
If you have lots of data, you might want to show a spinner telling the user that something is happening. You can use the Event Emitters `(onBeforeExportToExcel)` to start your spinner and then `(onAfterExportToExcel)` to stop the spinner once the process is done. You can see a this [Grouping Example](https://ghiscoding.github.io/Angular-Slickgrid/#/grouping) demo which has this feature enabled. 

#### View
```html
<span [hidden]="!processing">
   <i class="fa fa-refresh fa-spin fa-lg fa-fw"></i>
</span>

<angular-slickgrid gridId="grid2"
                     [dataset]="dataset"
                     [columnDefinitions]="columnDefinitions"
                     [gridOptions]="gridOptions"
                     (onBeforeExportToExcel)="processing = true"
                     (onAfterExportToExcel)="processing = false"
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
The Export to Excel handles all characters quite well, from Latin, to Unicode and even Unicorn emoji, it all works on all browsers (`Chrome`, `Firefox`, even `IE11`, I don't have access to older versions). Here's a demo

![image](https://user-images.githubusercontent.com/643976/67049215-b1b2ed00-f103-11e9-8119-04f84d3e45c2.png)

### Custom Cell Styling
You can customize the cell styling via `excelExportOptions` and `groupTotalsExcelExportOptions`

Please note the following
- custom stylings & formats are applied on the entire column (not by cell).
- custom stylings will override any format that might have been detected by the system
- adding more custom stylings can impact file download time (especially on large dataset)
  - in other words, it is recommended to only customize styling/format on the most important columns
- see all custom stylings & formats available in [excelExportOption.interface.ts](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/excelExportOption.interface.ts)

#### How does it work?
Internally, the lib will detect the correct Excel cell format for each column, it will do this only once per column and keep a reference of the Excel format it found for each column field. For every other rows afterward, it will reapply the previously saved format reference.

##### ViewModel
```ts
this.columnDefinitions = [
  {
    id: 'cost', name: 'Cost', field: 'cost', width: 80,
    type: FieldType.number,
    formatter: Formatters.currency,
    groupTotalsFormatter: GroupTotalFormatters.sumTotalsCurrency,
    params: { displayNegativeNumberWithParentheses: true, currencyPrefix: '€', groupFormatterCurrencyPrefix: '€', minDecimal: 2, maxDecimal: 4, groupFormatterPrefix: '<b>Total</b>: ' },
    excelExportOptions: {
      style: {
        font: { outline: true, italic: true },
        format: '€0.00##;[Red](€0.00##)',
      },
      width: 18
    },
    groupTotalsExcelExportOptions: {
      style: {
        alignment: { horizontal: 'center' },
        font: { bold: true, color: 'FF005289', underline: 'single', fontName: 'Consolas', size: 10 },
        fill: { type: 'pattern', patternType: 'solid', fgColor: 'FFE6F2F6' },
        border: {
          top: { color: 'FFa500ff', style: 'thick', },
          left: { color: 'FFa500ff', style: 'medium', },
          right: { color: 'FFa500ff', style: 'dotted', },
          bottom: { color: 'FFa500ff', style: 'double', },
        },
        format: '"Total: "€0.00##;[Red]"Total: "(€0.00##)'
      },
    },
  }
];

this.gridOptions = {
  enableGrouping: true,
  enableExcelExport: true,
  excelExportOptions: {
    filename: 'my-export',
    sanitizeDataExport: true,
    exportWithExcelFormat: true,
    columnHeaderStyle: {
      font: { color: 'FFFFFFFF' },
      fill: { type: 'pattern', patternType: 'solid', fgColor: 'FF4a6c91' }
    }
  },
  externalResources: [new ExcelExportService()],
};
```

##### Export Preview
Below is a preview of the previous customizations shown above

![image](https://user-images.githubusercontent.com/643976/208590003-b637dcda-5164-42cc-bfad-e921a22c1837.png)

### Cell Value Parser
This is not recommended but if you have no other ways, you can also provide a cell value parser function callback to override what the system detected.

```ts
this.columnDefinitions = [
  {
    id: 'cost', name: 'Cost', field: 'cost', width: 80,
    type: FieldType.number,
    formatter: Formatters.currency,
    groupTotalsFormatter: GroupTotalFormatters.sumTotalsCurrency,
    params: { displayNegativeNumberWithParentheses: true, currencyPrefix: '€', groupFormatterCurrencyPrefix: '€', minDecimal: 2, maxDecimal: 4, groupFormatterPrefix: '<b>Total</b>: ' },
    excelExportOptions: {
      valueParserCallback: (data, col, excelFormatterId, excelStylesheet) => {
        // when returned as string, it will skip Excel style format
        return `Total: ${data}`;

        // to keep Excel style format, you can use detected "excelFormatterId" OR use "excelStylesheet.createFormat()"
        return {
          value: isNaN(data as number) ? data : +data,
          metadata: { style: excelFormatterId } // the excelFormatterId was created internally from the custom format
        };
      }
    },
    groupTotalsExcelExportOptions: {
      valueParserCallback: (totals, columnDef) => {
        const groupType = 'sum';
        const fieldName = columnDef.field;
        return totals[groupType][fieldName];
    },
  }
];
```

### Cell Format Auto-Detect Disable
##### requires `v3.2.0` or higher
The system will auto-detect the Excel format to use for Date and Number field types, if for some reason you wish to disable it then you provide the excel export options below

```ts
// via column
this.columnDefinitions = [
  {
    id: 'cost', name: 'Cost', field: 'cost', type: FieldType.number
    excelExportOptions: { autoDetectCellFormat: false }
  }
];

// OR via grid options (column option always win)
this.gridOptions = {
  // ...
  excelExportOptions: { autoDetectCellFormat: false }
};
```