# Angular-Slickgrid

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![NPM downloads](https://img.shields.io/npm/dy/angular-slickgrid)](https://npmjs.org/package/angular-slickgrid)
[![npm](https://img.shields.io/npm/v/angular-slickgrid.svg?logo=npm&logoColor=fff&label=npm)](https://www.npmjs.com/package/angular-slickgrid)

[![Actions Status](https://github.com/ghiscoding/Angular-Slickgrid/workflows/CI%20Build/badge.svg)](https://github.com/ghiscoding/Angular-Slickgrid/actions)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg?logo=cypress)](https://www.cypress.io/)
[![Vitest](https://img.shields.io/badge/tested%20with-vitest-fcc72b.svg?logo=vitest)](https://vitest.dev/)
[![codecov](https://codecov.io/gh/ghiscoding/Angular-Slickgrid/branch/master/graph/badge.svg)](https://codecov.io/gh/ghiscoding/Angular-Slickgrid)


### Brief introduction
One of the best JavasSript data grid [SlickGrid](https://github.com/mleibman/SlickGrid), which was originally developed by @mleibman, is now available to the Angular world. SlickGrid beats most other data grids in terms of features, customizability and performance (running smoothly with even a million rows). Angular-Slickgrid is a wrapper on top of [Slickgrid-Universal](https://github.com/ghiscoding/slickgrid-universal/) (which is a dependency), in the early beginning we used the `6pac/SlickGrid` fork but that was dropped in >=[v7.0](https://github.com/ghiscoding/Angular-Slickgrid/releases/tag/v7.0.3) since Slickgrid-Universal is now a standalone project. SlickGrid was also recently rewritten with browser native code (no more ~jQuery~ 🎉).

### License
[MIT License](LICENSE)

## Documentation
📕 [Documentation](https://ghiscoding.gitbook.io/angular-slickgrid/getting-started/quick-start) website powered by GitBook for version 7+ (_or use the [Wikis](https://github.com/ghiscoding/Angular-Slickgrid/wiki) for older versions_).

For common issues, see the [Troubleshooting Section](#troubleshooting-section) below

## Installation
Available in Stackblitz (Codeflow) below, this can also be used to provide an issue repro.

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https:///pr.new/ghiscoding/angular-slickgrid)

A good starting point is the **[Docs - Quick Start](https://ghiscoding.gitbook.io/angular-slickgrid/getting-started/quick-start)** and/or simply clone the [Angular-Slickgrid Demos](https://github.com/ghiscoding/angular-slickgrid-demos) repository. Please review all documentation and closed issues before opening any new issue, also consider asking installation and/or general questions on [Stack Overflow](https://stackoverflow.com/search?tab=newest&q=slickgrid) unless you think there's a bug with the library.

```sh
npm install angular-slickgrid
```

#### Basic Grid

```ts
import { type Column, type GridOption } from 'angular-slickgrid';

export class GridComponent implements OnInit {
  columnDefinitions: Column[] = [];
  gridOptions: GridOption;
  dataset: any[] = [];

  onInit() {
    this.columnDefinitions = [
      { id: 'firstName', name: 'First Name', field: 'firstName', sortable: true },
      { id: 'lastName', name: 'Last Name', field: 'lastName', sortable: true },
      { id: 'age', name: 'Age', field: 'age', type: 'number', sortable: true }
    ];
    this.dataset = [
      { id: 1, firstName: 'John', lastName: 'Doe', age: 20 },
      { id: 2, firstName: 'Jane', lastName: 'Smith', age: 21 }
    ];
    this.gridOptions = { /*...*/ }; // optional grid options
  }
}
```

```html
<angular-slickgrid gridId="grid2"
    [columnDefinitions]="columnDefinitions"
    [gridOptions]="gridOptions"
    [dataset]="dataset">
</angular-slickgrid>
```
### Troubleshooting

> [!WARNING]
> Because of its use of native Custom Event, this project **does not** work well with `strictTemplates`, so please make sure to either disable `strictTemplates` or cast your event as `any` (see this [discussion](https://github.com/ghiscoding/Angular-Slickgrid/discussions/815) for more info)

### Styling Themes

Multiple styling themes are available
- Default (UI agnostic)
- Bootstrap (see all Angular-Slickgrid [live demos](https://ghiscoding.github.io/Angular-Slickgrid/))
- Material (see [Slickgrid-Universal](https://ghiscoding.github.io/slickgrid-universal/#/example07))
- Salesforce (see [Slickgrid-Universal](https://ghiscoding.github.io/slickgrid-universal/#/example16))

Also note that all of these themes also have **Dark Theme** equivalent and even though Bootstrap is often used for live demos, it does work as well with any other UI framework like Bulma, Material, ...

### Demo page
`Angular-Slickgrid` works with all `Bootstrap` versions, you can see a demo of each one below. It also works well with any other frameworks like Material or Bulma and there are also couple of extra styling themes based on Material & Salesforce which are also available. You can also use different SVG icons, you may want to look at the [Docs - SVG Icons](https://ghiscoding.gitbook.io/angular-slickgrid/styling/svg-icons) for more info.

[Angular-Slickgrid-Demos](https://github.com/ghiscoding/angular-slickgrid-demos) includes the following:
- [Bootstrap 5 demo](https://ghiscoding.github.io/Angular-Slickgrid) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap5-demo-with-translate) - Code samples which uses `ngx-translate` to support multiple locales.
- [Bootstrap 5 (single Locale)](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap5-demo-with-locales) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap5-demo-with-locales) - Code Sample with a single Locale (without `ngx-translate`)

#### Working Demo
For a complete set of working demos (40+ examples), we strongly suggest you clone [Angular-Slickgrid Demos](https://github.com/ghiscoding/angular-slickgrid-demos) repository (instructions are provided inside it). The demo repo provides multiple examples and are updated on every new project release, so it is updated frequently and is also the GitHub live demo page for both the [Bootstrap 5 demo](https://ghiscoding.github.io/Angular-Slickgrid) and [Bootstrap 5 demo (single Locale)](https://ghiscoding.github.io/angular-slickgrid-demos).

```sh
git clone https://github.com/ghiscoding/angular-slickgrid-demos
cd bootstrap5-demo-with-translate # or any of the other demos
npm install
npm start
```

### Like it? ⭐ it
You like to use **Angular-Slickgrid**? Be sure to upvote ⭐ and perhaps support me with caffeine [☕](https://ko-fi.com/ghiscoding) or GitHub sponsoring and feel free to contribute.

<a href='https://ko-fi.com/ghiscoding' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi3.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

### Contributions
If you wish to contribute, please make sure to follow the steps shown in the [CONTRIBUTING](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/CONTRIBUTING.md) guide.

## Latest News & Releases
Make sure to check out the [Releases](https://github.com/ghiscoding/Angular-Slickgrid/releases) section for all latest News & Releases.

## Angular Compatibility

> **Note** please be aware that only the latest major version of Angular-Slickgrid will be supported and receive bug fixes (it's already a lot of work for a single developer like me to support).

| Angular-Slickgrid | Angular version | Migration Guide | Notes |
|-------------------|-----------------|-----------------|-------|
| 8.x               | >=18.0 | [Migration 8.x](https://ghiscoding.gitbook.io/angular-slickgrid/migrations/migration-to-8.x)     | Modern UI / Dark Mode, requires Slickgrid-Universal [5.x](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v5.0.0) version |
| 7.x               | >=17.0 | [Migration 7.x](https://ghiscoding.gitbook.io/angular-slickgrid/migrations/migration-to-7.x)     | merge SlickGrid into Slickgrid-Universal, requires Slickgrid-Universal [4.x](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v4.0.2) version |
| 6.x               | >=16.0 | [Migration 6.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-6.x)     | removal of jQuery (now uses browser native code), requires Slickgrid-Universal [3.x](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v3.0.0) version |
| 5.x               | >=14.0 | [Migration 5.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-5.x)     | removal of jQueryUI, requires Slickgrid-Universal [2.x](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v2.0.0) version |
| 4.x               | >=13.0 | [Migration 4.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-4.x)     | for Ivy build only, requires Slickgrid-Universal [1.x](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v1.1.1) version |
| 3.x               | >=12.0 | [Migration 3.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-3.x) | the lib now uses [Slickgrid-Universal](https://github.com/ghiscoding/slickgrid-universal) monorepo [v0.19.2](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v0.19.2). Also, IE11 is EOL and no longer supported. |
| 2.x               | 7-11.x | [Migration 2.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-2.x) | support multiple grids on same page     |
| 1.x               | 4-6.x  |                 |      |

**Note** For a full compatibility table of every Angular-Slickgrid versions with Slickgrid-Universal, please take a look at the [Versions Compatibility Table - Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Versions-Compatibility-Table).

For Angular 12+ see the instructions below - [Angular 12 with WebPack 5 - polyfill issue](#angular-12-with-webpack-5---how-to-fix-polyfill-error).

### ngx-translate Compatibility

Angular-Slickgrid uses `ngx-translate` library to support Locales, it is also required that is even when using a single Locale. The reason is because, we use `@Optional() TranslateService` in the lib and for that to work, it requires `ngx-translate` to be installed. Once you run the build and if you are using a single Locale then the tree shaking process should remove these optional dependencies. See their version compatibility table below for more info

| Angular Version | @ngx-translate/core |
|-----------------|---------------------|
|  16+            |        15.x         |
|  13+ (Ivy only) |        14.x         |
|  10-13          |        13.x         |
|  8-9            |        12.x         |
|  7              |        11.x         |

### Tested with [Vitest](https://vitest.dev/) (Unit Tests) - [Cypress](https://www.cypress.io/) (E2E Tests)
Slickgrid-Universal has **100%** Unit Test Coverage and all Angular-Slickgrid Examples are tested with [Cypress](https://www.cypress.io/) as E2E tests.

## Troubleshooting Section

- [Angular 12 with WebPack 5 - how to fix polyfill error](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Versions-Compatibility-Table#angular-12-with-webpack-5---how-to-fix-polyfill-error)
- [`ngcc` Build Warnings (Angular >=8.0 && <16.0)](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Versions-Compatibility-Table#ngcc-build-warnings-angular-80--160)
- [`strictTemplates` error](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Versions-Compatibility-Table#stricttemplates-error)

## Sponsors

Thanks to all my sponsors!

<div>
  <span>
    <a href="https://github.com/wundergraph" class="Link" title="Wundergraph" target="_blank"><img src="https://avatars.githubusercontent.com/u/64281914" width="50" height="50" valign="middle" /></a>
  </span>
  &nbsp;
  <span>
    <a href="https://github.com/johnsoncodehk" class="Link" title="johnsoncodehk (Volar)" target="_blank"><img src="https://avatars.githubusercontent.com/u/16279759" width="50" height="50" valign="middle" /></a>
  </span>
   &nbsp;
  <span>
    <a href="https://github.com/kevinburkett" class="Link" title="kevinburkett" target="_blank"><img class="circle avatar-user" src="https://avatars.githubusercontent.com/u/48218815?s=52&amp;v=4" width="45" height="45" valign="middle" /></a>
  </span>
  &nbsp;
  <span>
    <a href="https://github.com/anton-gustafsson" class="Link" title="anton-gustafsson" target="_blank"><img src="https://avatars.githubusercontent.com/u/22906905?s=52&v=4" width="50" height="50" valign="middle" /></a>
  </span>
  &nbsp;
  <span>
    <a href="https://github.com/gibson552" class="Link" title="gibson552" target="_blank"><img src="https://avatars.githubusercontent.com/u/84058359?s=52&v=4" width="50" height="50" valign="middle" /></a>
  </span>
</div>
