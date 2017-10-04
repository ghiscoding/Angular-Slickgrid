# Angular-Slickgrid
One of the best javascript datagrid [SlickGrid](https://github.com/mleibman/SlickGrid) which was originally developed by @mleibman is now available to Angular. I have used a few datagrids and slickgrid beats most of them in terms of functionalities and performance (it can easily deal with even a million row).

### SlickGrid Source
We will be using [6pac SlickGrid fork](https://github.com/6pac/SlickGrid/) (the most active fork since the original @mleibman fork closed it for personal reasons).

### Goal
The goal is of course to be able to run SlickGrid within Angular 4+ but also to incorporate as much as possible the entire list of functionalities that SlickGrid offers (you can see a vast list of samples on the [6pac SlickGrid examples](https://github.com/6pac/SlickGrid/wiki/Examples) website).

### NPM Package
[Aurelia-Slickgrid on NPM](https://www.npmjs.com/package/angular-slickgrid)

<a name="main-features"></a>
## Main features
You can see some screenshots below and the instructions down below.

This is a work in progress, but so far here are some of the features that `angular-slickgrid` brings (on top of Slickgrid itself):
- Easier use of SlickGrid within `Angular` as it is just a component (simply pass a column definitions and a dataset and you're good to go)
- Bootstrap Theme with SASS variables for extra customization (if you create a theme, then please make a PR)
- Auto-resize, a boolean flag, will resize the datagrid viewport with available space even on browser resize (basically takes available space by the given div container)
- Server side filtering/sorting
- Server side pagination (which is another Angular component used internally)
- Server side functionalities are expandables and ships with a simple OData service
  - customizable with your own services by using `onFilterChanged()` `onPaginationChanged()` and `onSortChanged()`.
  - extra services might come in the future
- Some Features of SlickGrid itself which are working out of the gate
  - Sort/Multi-Sort (client/server side)
  - Header Row with Filters (currently support Input and Select dropdown, multi-select is planned)
  - Formatters (a few default ones were added, and you can easily create custom ones too)
  - Optimized DataView (even server side data is saved into the SlickGrid DataView)
- ... more to come

<a name="missing-features"></a>
## Missing features (planned items)
The following are SlickGrid features which are not yet included in this library
- Inline Editors
- Filters to support multi-select dropdown and eventually custom filters
- Plugins (Header Menu, Grid Menu, Column Header Buttons)


## Screenshots

Screenshots from the demo app with the `Bootstrap` theme (that is the only available theme, but there is a lot of SASS variables to make it look like Material, or others, if you wish to).

**Slickgrid example with Formatters (last column is a custom Formatter)**
![Default Slickgrid Example](/screenshots/formatters.png)

**Filter and Sort**
![Slickgrid Server Side](/screenshots/filter_and_sort.png)

**Slickgrid Example with Server Side (sorting/pagination)**
![Slickgrid Server Side](/screenshots/pagination.png)

## How to use Angular-Slickgrid?
`Angular-Slickgrid` is built with TypeScript and comes with a set of Interfaces/Models that you can use within your application. For example:

Some of the interface models are
```javascript
import { Column, ColumnFilter, FieldType, Formatter, FormElementType, GridOption } from 'angular-slickgrid';
```

Some of the models which include functions (like Formatters)
```javascript
import { ColumnFilters, FilterTemplates, Formatters, Sorters } from 'angular-slickgrid';
```

## Installation
You can refer to the [demo](https://github.com/ghiscoding/angular-slickgrid/tree/master/demo) folder or follow the instructions below. All the instructions are written for `Angular-CLI`.

### Angular-CLI
Install the `Angular-Slickgrid`, `Slickgrid`, `Bootstrap 3.x`, `Font-Awesome` and `jQuery 3.x` NPM packages with
```bash
npm install --save angular-slickgrid slickgrid jquery bootstrap font-awesome # or yarn add
```
Then modify your `.angular-cli.json` file with the following Styles and Scripts:
```json
"styles": [
    "../node_modules/bootstrap/dist/css/bootstrap.css",
    "../node_modules/font-awesome/css/font-awesome.css",
    "styles.scss"
],
"scripts": [
    "../node_modules/jquery/dist/jquery.js",
    "../node_modules/bootstrap/dist/js/bootstrap.js",
    "../node_modules/slickgrid/lib/jquery-ui-1.11.3.js",
    "../node_modules/slickgrid/lib/jquery.event.drag-2.3.0.js",
    "../node_modules/slickgrid/slick.core.js",
    "../node_modules/slickgrid/slick.dataview.js",
    "../node_modules/slickgrid/slick.grid.js",
    "../node_modules/slickgrid/slick.dataview.js",
    "../node_modules/slickgrid/plugins/slick.rowselectionmodel.js",
    "../node_modules/slickgrid/controls/slick.pager.js",
    "../node_modules/slickgrid/controls/slick.columnpicker.js"
]
```

#### Your App Module (main)
Include `AngularSlickgridModule` in your App Module (app.module.ts)
```javascript
import { AngularSlickgridModule } from 'angular-slickgrid';

@NgModule({
  declarations: [AppComponent],
  imports: [AngularSlickgridModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
And finally use it your code, for example let's create a `grid-basic.component.html` example.
```html
<div class="container">
  <angular-slickgrid gridId="grid1"
            [columnDefinitions]="columnDefinitions"
            [gridOptions]="gridOptions"
            [dataset]="dataset">
  </angular-slickgrid>
</div>
```
and then configure the Column Definitions, Grid Options and pass a Dataset to the grid:
```javascript
import { Component, OnInit } from '@angular/core';
import { Column, GridOption } from 'angular-slickgrid';

@Component({
  templateUrl: './grid-basic.component.html'
})
export class GridBasicComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', sortable: true },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true },
      { id: 'start', name: 'Start', field: 'start' },
      { id: 'finish', name: 'Finish', field: 'finish' },
      { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', sortable: true }
    ];
    this.gridOptions = {
      enableAutoResize: true,       // true by default
      enableCellNavigation: true,
      sortable: true,
    };

    // fill the dataset with your data
    // VERY IMPORTANT, Angular-Slickgrid uses Slickgrid DataView which REQUIRES a unique "id" and it has to be lowercase "id" and be part of the dataset
    this.dataset = [];

    // for demo purpose, let's mock a 1000 lines of data
    for (let i = 0; i < 1000; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 28));
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: i, // again VERY IMPORTANT to fill the "id" with unique values
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        start: `${randomMonth}/${randomDay}/${randomYear}`,
        finish: `${randomMonth}/${randomDay}/${randomYear}`,
        effortDriven: (i % 5 === 0)
      };
    }
  }
}
```

## Styling
Load the default Bootstrap theme style and/or customize it to your taste (if you use SASS) with any of the available SASS variables defined in the file [_variables.scss](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/styles/_variables.scss).

### CSS
Default compiled `css` (if you use the plain Bootstrap Theme CSS, then add it to your `.angular-cli.json` file)
```json
"styles": [
    "../node_modules/bootstrap/dist/css/bootstrap.css",
    "../node_modules/font-awesome/css/font-awesome.css",
    "styles.scss",
    "../node_modules/angular-slickgrid/styles/css/slickgrid-theme-bootstrap.css"
],
```

### SASS (scss)
You could also compile the SASS files with your customization, for that simply take any of the `_variables.scss` (without the `!default` flag, for example: `$grid-border-color: black`) variable file and make sure to import the Bootstrap Theme afterward. For example, you could modify your `style.scss` with the following:

```scss
/* for example, let's change the mouse hover color */
$cell-odd-background-color: lightyellow;
$selected-hover-color: lightgreen;

/* make sure to add the @import the SlickGrid Bootstrap Theme AFTER the variables changes */
@import '../node_modules/angular-slickgrid/styles/sass/slickgrid-theme-bootstrap.scss';
```

#### Note
The pagination SASS variables are unfortunately not configurable because of a limitation by the packager that I use ([angular-library-starter](https://github.com/robisim74/angular-library-starter)) which does not support `templateUrl` neither `styleUrl` as described in this [issue](https://github.com/robisim74/angular-library-starter/issues/1)). At the beginning tried [ng-packager](https://github.com/dherges/ng-packagr) but never got it to fully export all my interfaces/models so I gave up on that one (if someone could help me fix it, I wouldn't mind giving it another try).
