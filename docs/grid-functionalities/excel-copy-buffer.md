### Description
Just like Excel you can select multiple cell and copy (`Ctrl+C`) and paste to Excel (`Ctrl+V`). However what you must know is that this plugin evaluate every single cell by their values (the raw value unless you specify otherwise, continue reading for more info). 

### Demo
#### with Inline Editor
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/editor) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-editor.component.ts)

#### with Localization
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/localization) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-localization.component.ts)

### Usage
All you need to do is enable the Grid Option `enableExcelCopyBuffer: true` and give it a try. From your grid, start selecting multiple cells with the mouse then copy (with `Ctrl+C`) and paste to Excel (with `Ctrl+V`)

##### Component
```typescript
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'id' },
  { id: 'description', name: 'Description', field: 'description' },
  { id: 'duration', name: 'Duration (days)', field: 'duration', type: FieldType.number },
];
this.gridOptions = {
  enableExcelCopyBuffer: true,
};
```

### Copy & Paste with Cell Formatter
What if you have a date in UTC format in your dataset but your grid shows it as a Date ISO format? In that case, you are using a Formatter (e.g. `formatter: Formatters.dateIso`) and you wish to use that formatter. Good news, that is supported with and to make is simpler for the implementation, we will use a flag that already exist which is `exportWithFormatter` and is used by the `Export to File` service (for more info, read [Wiki - Export to File](Export-to-Text-File.md)

The `exportWithFormatter` can be used in 2 ways, on each column definition independently or for the entire grid through it's grid option. 
##### `exportWithFormatter` through each Column Definition
```typescript
this.columnDefinitions = [
  { 
    id: 'start', name: 'Start', field: 'start', 
    formatter: Formatters.dateIso, 
    exportWithFormatter: true 
  },
  { 
    id: 'finish', name: 'Finish', field: 'finish', 
    formatter: Formatters.dateIso, 
    exportWithFormatter: true 
  },
];

this.gridOptions = {
  enableExcelCopyBuffer: true,
};
```

##### `exportWithFormatter` through Grid Options
```typescript
this.columnDefinitions = [
  { id: 'start', name: 'Start', field: 'start', formatter: Formatters.dateIso },
  { id: 'finish', name: 'Finish', field: 'finish', formatter: Formatters.dateIso },
];

this.gridOptions = {
  enableExcelCopyBuffer: true,
  exportOptions: {
    // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
    exportWithFormatter: true
  },
};
```
#### Sanitize Formatter Ouput
In some cases a Formatter can be formed of HTML and that will end up showing in your Copy+Paste. You can simply use the `sanitizeDataExport` flag which will remove any HTML tags from the output. For an example below, let say that our first Title column are all displayed in bold in the grid (e.g. `<b>Title 1</b>`), we want to sanitize that output a regular text output (e.g. `Title 1`)

##### `exportWithFormatter` through each Column Definition
```typescript
this.columnDefinitions = [
  { 
    id: 'title', name: 'Title', field: 'id', 
    formatter: Formatters.bold,
    exportWithFormatter: true, 
    sanitizeDataExport: true 
  }
];

this.gridOptions = {
  enableExcelCopyBuffer: true
};
```

##### `exportWithFormatter` through Grid Options
```typescript
this.columnDefinitions = [
  { id: 'title', name: 'Title', field: 'id', formatter: Formatters.bold }
];

this.gridOptions = {
  enableExcelCopyBuffer: true,
  exportOptions: {
    exportWithFormatter: true,
    sanitizeDataExport: true
  },
};
```

### Disable pasting on specific columns
If you want to disable pasting values for specific columns you can deactivate it using the denyPaste property on the Column config.

```typescript
this.columnDefinitions = [
  { 
    id: 'colA', name: 'Col A', field: 'col_a', 
    formatter: Formatters.bold,
    exportWithFormatter: true, 
    sanitizeDataExport: true,
    denyPaste: true // <------------
  }
];
```

This will even work in situations where your table copy buffer stretches over disabled cells, by simply skipping them. So for the following config (x = paste disabled; o = paste enabled), pasting a 3 cell stretching table buffer will result in Col A and C being updated but ColB ignoring the paste and keeping its original value

Col A | Col B | Col C \
\---------------------\
&nbsp;&nbsp; o &nbsp;&nbsp;  | &nbsp;&nbsp;&nbsp; x &nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; o \
NEW | &nbsp;&nbsp;&nbsp; x &nbsp;&nbsp; | &nbsp;NEW

### Disable pasting on specific cells
If you need even more fine grained control, you can make use of the gridOption `onBeforePasteCell`:

```typescript
this.gridOptions = {
  enableExcelCopyBuffer: true,
  excelCopyBufferOptions: {
    onBeforePasteCell: (e, args) => {
      // e.g deny paste on first cell
      return args.cell > 0;
    }
  }
};
```

This way you have full control, via the args parameters, to get a ref to the current row and cell being updated. Also keep in mind that while performing a buffered table paste (e.g three cols at once) and only one of them has a denying condition, the other cells paste will pass successfully.

### Handling quoted multiline pastes
When copying Excel cells, where the value is a multiline text, the copy buffer will result in a quoted text buffer. Slickgrid will properly handle the case when this content itself contains `\n` characters, to not break onto multiple rows as well as not split on the next column if `\t` characters are contained.

You can control if the newlines should be replaced with a specific value by defining it in `replaceNewlinesWith`. As an example you could set it to `' '`.

Additionally, you can define that the quoted string is pasted without the quotes by setting `removeDoubleQuotesOnPaste` to true.

> Note: requires v8.2.0 and higher
