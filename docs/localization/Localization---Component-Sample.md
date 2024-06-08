#### Class sample
You need to add a translation key via the property `nameKey` to each column definition, for example: `nameKey: 'TITLE'`

##### Translation Files
If you want to manually re-create the translation in your own files, the list of translations that you will need are displayed in the [asset i18n](https://github.com/ghiscoding/angular-slickgrid/tree/master/src/assets/i18n) translation folder (from that file, you need all translations shown before the translation 'BILLING', the next few ones are for the demo page only). If you need more information on how to import translations, please review the other [docs](../localization/Localization-with-ngx-translate.md#locales) page.

##### Note
For the `Select` Filter, you will use `labelKey` instead of `label`. Anytime a translation key will come in play, we will add the word `key` to the end (hence `nameKey`, `labelKey`, more to come...)
```typescript
import { Component, OnInit, Injectable } from '@angular/core';
import { Column, Editors, FieldType, Formatter, Formatters, GridExtraService, GridExtraUtils, GridOption, OnEventArgs, ResizerService } from './../modules/angular-slickgrid';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './grid-localization.component.html'
})
@Injectable()
export class Example implements OnInit {
  gridOptions: GridOption;
  columnDefinitions: Column[];
  dataset: any[];

  constructor(private translate: TranslateService) {
    // define the grid options & columns and then create the grid itself
    this.defineGrid();
  }

  // Define grid Options and Columns
  // provide a nameKey for each column and enableTranslate to True in GridOption
  defineGrid() {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', nameKey: 'TITLE', formatter: this.taskTranslateFormatter, sortable: true, minWidth: 100 },
      { id: 'duration', name: 'Duration (days)', field: 'duration', nameKey: 'DURATION', sortable: true, minWidth: 100 },
      { id: 'start', name: 'Start', field: 'start', nameKey: 'START', formatter: Formatters.dateIso, minWidth: 100 },
      { id: 'finish', name: 'Finish', field: 'finish', nameKey: 'FINISH', formatter: Formatters.dateIso, minWidth: 100 },
      { id: 'completed', name: 'Completed', field: 'completed', nameKey: 'COMPLETED', formatter: Formatters.translate, sortable: true, minWidth: 100 }
      // OR via your own custom translate formatter
      // { id: 'completed', name: 'Completed', field: 'completed', nameKey: 'COMPLETED', formatter: translateFormatter, sortable: true, minWidth: 100 }
    ];
    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableAutoResize: true,
      enableTranslate: true,
      i18n: this.translate
    };
  }
}

  // create a custom translate Formatter
  taskTranslateFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
    return this.translate('TASK_X', { x: value });
  }
```

#### Custom Formatter (cell values)
You can define your own custom Formatter by providing the `i18n` Service into the Formatter and using the `.tr()` function to translate the cell value.
```typescript
taskTranslateFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
    return this.translate.instant('TASK_X', { x: value });
}
```

#### Filtering with Translated cell value (`translateFormatter`)
Since the cell value is to be translated, the regular filtering might behave differently than excepted (it will filter against a translation key instead of filtering against the formatted output which is what we want). If you want to filter against the formatted output (`translateFormatter` or even a custom formatter), you need to fill in the `i18n` property in the Grid Options and set `useFormatterOuputToFilter` to True, for more info please see [Wiki - input filter with localization](../column-functionalities/filters/input-filter.md#filtering-with-localization-i18n)

#### Using Angular-Slickgrid Formatters.Translate
Instead of defining a custom formatter over and over, you could also use the built-in Angular-Slickgrid `Formatters.translate`. However for the formatter to work, you need to provide the `ngx-translate` Service instance, to the Grid Options property `i18n`, as shown below.

```typescript
this.columnDefinitions = [
  {
    id: 'title',
    name: 'Title',
    field: 'title',
    nameKey: 'TITLE',
    formatter: Formatters.translate
  }
];

this.gridOptions = {
  enableTranslate: true,
  i18n: this.translate  // provide the `ngx-translate instance through the params.i18n property
}
```
