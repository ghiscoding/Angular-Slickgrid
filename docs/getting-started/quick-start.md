# Quick start

> **NOTE** The Documentations shown on this website are meant for Angular-Slickgrid v7.x and higher, for older versions please refer to the project [Wikis](https://github.com/ghiscoding/Angular-Slickgrid/wiki).

### 1. Install NPM Package
Install the `Angular-Slickgrid`, and other external packages like `Bootstrap`
(Bootstrap is optional, you can choose other framework if you wish)
```bash
npm install --save angular-slickgrid bootstrap # the last dep is optional
```
#### Important note about `ngx-translate`
#### Now optional
`ngx-translate` is now optional as of version `2.10.0`, see more info below at [step 5](#5-installsetup-ngx-translate-for-localization-optional)
**NOTE** however, please note that `@ngx-translate` is still going to be installed behind the scene just to make DI (dependency injection) build properly because of our use of `@Optional()` but it should be removed by the build tree shaking process once you run a production build. See their version compatibility table below

| Angular Version     | @ngx-translate/core |
|---------------------|---------------------|
|  16+                |        15.x         |
|  13+ (**Ivy only**) |        14.x         |
|  10-13              |        13.x         |
|  8-9                |        12.x         |
|  7                  |        11.x         |

### 2. Modify the `angular.json` and `tsconfig.app.json` files
#### previous Angular versions were using `.angular-cli.json`
Then modify your `angular.json` file with the following Styles and Scripts:

```js
"styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css",    // optional, install when you use Bootstrap
    "styles.css"
],
"scripts": [
    "node_modules/bootstrap/dist/js/bootstrap.js",           // optional, install when you use Bootstrap
],
```

<a name="step3"></a>
### 3. CSS / SASS Styles
Load the default Bootstrap theme style and/or customize it to your taste (either by using SASS or CSS variables)

#### CSS
Default compiled `css` (if you use the plain Bootstrap Theme CSS, you could simply add it to your `.angular-cli.json` file and be done with it).

**Note:** If you are also using `Bootstrap-SASS`, then there is no need to include the `bootstrap.css` in the `styles: []` section.

```json
"styles": [
    "node_modules/bootstrap/dist/css/bootstrap.css",
    "styles.css",
    "node_modules/@slickgrid-universal/common/dist/styles/css/slickgrid-theme-bootstrap.css"
],
```

> **Note** Bootstrap is optional, you can use any other framework, other themes are also available as CSS and SCSS file extensions
> `slickgrid-theme-default.css`, `slickgrid-theme-bootstrap.css`, `slickgrid-theme-material.css`, `slickgrid-theme-salesforce.css`

#### SASS (scss)
You could also compile the SASS files with your own customization, for that simply take any of the [_variables.scss](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/styles/_variables.scss) (without the `!default` flag) variable file and make sure to import the Bootstrap Theme afterward. For example, you could modify your `style.scss` with the following changes:

```scss
/* for example, let's change the mouse hover color */
@use '@slickgrid-universal/common/dist/styles/sass/slickgrid-theme-default.scss' with (
  $cell-odd-background-color: lightyellow,
  $row-mouse-hover-color: lightgreen
);
```

### 4. Include it in your App Module (or App Config for Standalone)
Below are 2 different setups (with App Module (legacy) or Standalone) but in both cases the `AngularSlickgridModule.forRoot()` is **required**, so make sure to include it. Also note that the GitHub demo is strictly built with an App Module which is considered the legacy approach.

#### App Module (legacy)
Include `AngularSlickgridModule` in your App Module (`app.module.ts`)
**Note**
Make sure to add the `forRoot` since it will throw an error in the console when missing.

```typescript
import { AngularSlickgridModule } from 'angular-slickgrid';

@NgModule({
  declarations: [AppComponent],
  imports: [AngularSlickgridModule.forRoot()], // forRoot() is REQUIRED
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Standalone (App Config)
> #### see this Stack Overflow [answer](https://stackoverflow.com/a/78527155/1212166) for more details and Stackblitz demo

If your app is using standalone style, go to `app.config.ts`

```ts
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AngularSlickgridModule } from 'angular-slickgrid';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(AngularSlickgridModule.forRoot()), // <- notice!
  ],
};
```

Then import the `AngularSlickgridModule` to the `app.component.ts`

```ts
import { RouterOutlet } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Column, GridOption, AngularSlickgridModule } from 'angular-slickgrid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularSlickgridModule], // <- notice!
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
    // ...
```

#### Angular 7+
The new updated version of `ng-packagr` use strict metadata and you might get errors about `Lambda not supported`, to bypass this problem you can add the `@dynamic` comment over the `@NgModule` as shown below:
```ts
// @dynamic
@NgModule({
  ...
})
```

### 5. Install/Setup `ngx-translate` for Localization (optional)
#### If you don't want to use any Translate Service and use only 1 Locale then take a look at this [demo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap4-demo-with-locales)
To provide locales other than English (default locale), you have 2 options that you can go with. If you only use English, there is nothing to do (you can still change some of the texts in the grid via option 1.)
1. Using [Custom Locale](../localization/Localization-with-Custom-Locales.md), that is when you use **only 1** locale (other than English)... this is a new feature starting from version `2.10.0` and up.
2. Using [Localization with I18N](../localization/Localization-with-ngx-translate.md), that is when you want to use multiple locales dynamically.
3. **NOTE** you still need to install `@ngx-translate` (since it is a peer dependency) but it should be removed after doing a production build since it's optional.

##### Translation Keys
Also note that every time you want to use a translation key, you simply have to use a property with the `Key` suffix. For example if you wish to have a column definition `name` with a translation, just use the `nameKey: 'TRANSLATE_KEY'` instead of `name`. Below is a list of keys that can be used in the lib

| without Translate | with Translate |
| ----------------- | -------------- |
| name              | nameKey        |
| label             | labelKey       |
| title             | titleKey       |
| columnGroup       | columnGroupKey |
| optionTitle       | optionTitleKey |

### 6. Create a basic grid
And finally, you are now ready to use it in your project, for example let's create both html/ts files for a `grid-basic.component` example, configure the Column Definitions, Grid Options and pass a Dataset to the grid:
```ts
import { Column, GridOption } from 'angular-slickgrid';

export class GridBasicComponent {
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];

  constructor() {
    this.prepareGrid();
  }

  prepareGrid() {
    this.columnDefinitions = [
      { id: 'title', name: 'Title', field: 'title', sortable: true },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true },
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true },
      { id: 'start', name: 'Start', field: 'start' },
      { id: 'finish', name: 'Finish', field: 'finish' },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true
    };

    // fill the dataset with your data (or read it from the DB)
    this.dataset = [
      { id: 0, title: 'Task 1', duration: 45, percentComplete: 5, start: '2001-01-01', finish: '2001-01-31' },
      { id: 1, title: 'Task 2', duration: 33, percentComplete: 34, start: '2001-01-11', finish: '2001-02-04' },
    ];
  }
}
```

define Angular-Slickgrid in your View
```html
<div class="container">
  <angular-slickgrid gridId="grid1"
            [columnDefinitions]="columnDefinitions"
            [gridOptions]="gridOptions"
            [dataset]="dataset">
  </angular-slickgrid>
</div>
```

### 7. Explore the Documentation
The last step is really to explore all the pages that are available in the documentation, everything you need to use the library should be available in here and so you should visit it often. For example a good starter is to look at the following

- for all the `Grid Options`, take a look at all the [Grid Options](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/gridOption.interface.ts) interface.
- [Formatters](../column-functionalities/Formatters.md)
- [Editors](../column-functionalities/Editors.md)
- [Filters](../column-functionalities/filters/select-filter.md)
- [Grid Menu](../grid-functionalities/Grid-Menu.md)
... and much more, just explore the Documentation through all the available pages.

### 8. How to load data with `HttpClient`?
You might notice that all demos are made with mocked dataset that are embedded in each examples, that is mainly for demo purposes, but you might be wondering how to connect this with an `HttpClient`? Easy... just replace the mocked data, assigned to the `dataset` property, by your `HttpClient` call and that's it. The `dataset` property can be changed at any time, which is why you can use local data and/or connect it to a `Promise` or an `Observable` with `HttpClient` (internally it's just a SETTER that refreshes the grid). See [Example 24](https://ghiscoding.github.io/Angular-Slickgrid/#/gridtabs) for a demo showing how to load a JSON file with `HttpClient`.

### 9. Live Demo - Clone the Examples
The best way to get started is to clone the [Angular-Slickgrid-demos](https://github.com/ghiscoding/angular-slickgrid-demos), it has multiple examples and it is also updated frequently since it is used for the GitHub Bootstrap 5 demo page. `Angular-Slickgrid` has 3 `Bootstrap` repos, you can see a demo of each ones below.
- [Bootstrap 5 demo](https://ghiscoding.github.io/angular-slickgrid-bs5-demo) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap5-demo-with-translate) (using `ngx-translate`)
- [Bootstrap 5 - examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap5-demo-with-locales) (single Locale, without using `ngx-translate`)

##### All Live Demo Examples have links to the actual code
If you would like to see the code to a particular Example, just click on the "see code" which is available in all live examples.

### 10. CSP Compliance
The project supports Content Security Policy (CSP) as long as you provide an optional `sanitizer` in your grid options (we recommend DOMPurify). Review the [CSP Compliance](../developer-guides/csp-compliance.md) documentation for more info.

### 11. Missing Features compared to SlickGrid?
What if `Angular-Slickgrid` is missing feature(s) versus the original `SlickGrid`? Fear not and just use the `SlickGrid` and `DataView` objects directly, which are expose from the start through Custom Events. For more info continue reading on [Docs - SlickGrid & DataView objects](../slick-grid-dataview-objects/SlickGrid-&-DataView-Objects.md)

### 12. Troubleshooting - Build Errors/Warnings
Visit the [Troubleshooting](./troubleshooting.md) section for more common errors.