# Angular-Slickgrid

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![NPM downloads](https://img.shields.io/npm/dy/angular-slickgrid)](https://npmjs.org/package/angular-slickgrid)
[![npm](https://img.shields.io/npm/v/angular-slickgrid.svg?logo=npm&logoColor=fff&label=npm)](https://www.npmjs.com/package/angular-slickgrid)

[![Actions Status](https://github.com/ghiscoding/Angular-Slickgrid/workflows/CI%20Build/badge.svg)](https://github.com/ghiscoding/Angular-Slickgrid/actions)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg?logo=cypress)](https://www.cypress.io/)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![codecov](https://codecov.io/gh/ghiscoding/Angular-Slickgrid/branch/master/graph/badge.svg)](https://codecov.io/gh/ghiscoding/Angular-Slickgrid)

### Brief introduction
One of the best JavasSript datagrid [SlickGrid](https://github.com/mleibman/SlickGrid), which was originally developed by @mleibman, is now available to Angular. SlickGrid beats most other datagrids in terms of features, customizability and performance (it can easily deal with even a million row). Angular-Slickgrid is a wrapper on top of SlickGrid and we are using the [6pac/SlickGrid](https://github.com/6pac/SlickGrid/) fork which is the most active one since the original one was put on pause by its original author for personal reasons. Also worth to know, that I also contributed a lot to the 6pac/SlickGrid fork over the years for the benefit of all the SlickGrid libraries that I maintain including this one here... SlickGrid was recently refactored to be browser native, which means that jQuery is no longer required in Angular-Slickgrid [v6.0](https://github.com/ghiscoding/Angular-Slickgrid/releases/tag/v6.0.0) and higher.

### License
[MIT License](LICENSE)

## Installation
A good starting point is the **[Wiki - HOWTO Step by Step](https://github.com/ghiscoding/angular-slickgrid/wiki/HOWTO---Step-by-Step)** and/or simply clone the [Angular-Slickgrid Demos](https://github.com/ghiscoding/angular-slickgrid-demos) repository. Please review all Wikis and closed issues before opening any new issue, also consider asking installation and/or general questions on [Stack Overflow](https://stackoverflow.com/search?tab=newest&q=slickgrid) unless you think there's a bug with the library.

```sh
npm install angular-slickgrid
```

### Demo page
`Angular-Slickgrid` works with all `Bootstrap` versions, you can see a demo of each one below. There are also extra styling themes for not just Bootstrap but also Material & Salesforce which are also available. You can also use different SVG icons, you may want to look at the [Wiki - SVG Icons](https://github.com/ghiscoding/Angular-Slickgrid/wiki/SVG-Icons)
- [Bootstrap 5 demo](https://ghiscoding.github.io/Angular-Slickgrid) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap5-demo-with-translate)
- [Bootstrap 4 demo](https://ghiscoding.github.io/angular-slickgrid-demos) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap4-demo-with-translate)

#### Working Demo
For a complete set of working demos (over 30 examples), we strongly suggest you to clone the [Angular-Slickgrid Demos](https://github.com/ghiscoding/angular-slickgrid-demos) repository (instructions are provided in the demo repo). The repo provides multiple demos and they are updated every time a new version is out, so it is updated frequently and is also used as the GitHub live demo page for both the [Bootstrap 5 demo](https://ghiscoding.github.io/Angular-Slickgrid) and [Bootstrap 4 demo](https://ghiscoding.github.io/angular-slickgrid-demos).

```sh
git clone https://github.com/ghiscoding/angular-slickgrid-demos
cd bootstrap4-demo-with-translate # or any of the 4 demos
npm install
npm start
```

### Like it? :star: it
You like to use **Angular-Slickgrid**? Be sure to upvote :star: and maybe support me with caffeine :coffee: and feel free to contribute. 👷👷‍♀️

<a href='https://ko-fi.com/ghiscoding' target='_blank'><img height='32' style='border:0px;height:32px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' />

### Contributions
If you wish to contribute then make sure to follow these steps (note that we use [Yarn classic](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) in this project):
```sh
# step 1, install with Yarn classic
yarn install

# step 2, run in dev and test your code change
yarn start

# step 3.a, build plugin (lib)
yarn build

# step 3.b, optional website build as well
yarn build:demo
```

## Latest News & Releases
Check out the [Releases](https://github.com/ghiscoding/Angular-Slickgrid/releases) section for all latest News & Releases.

## Troubleshooting / Documentation
The Wiki is where all the documentation and instructions will go, so please consult the [Angular-Slickgrid - Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki) before opening any issues. The [Wiki - HOWTO](https://github.com/ghiscoding/Angular-Slickgrid/wiki/HOWTO---Step-by-Step) is a great place to start with. You can also take a look at the [Demo page](https://ghiscoding.github.io/Angular-Slickgrid), it includes sample for most of the features and it keeps growing (so you might want to consult it whenever a new version comes out).

For common issues, see the [Troubleshooting Section](#troubleshooting-section) below

## Angular Compatibility

> **Note** please be aware that only the latest version of Angular-Slickgrid is supported and will receive bug fixes. The reason older versions are not supported is simply because it's already a lot of work to maintain for a single developer.

| Angular-Slickgrid | Angular version | Migration Guide | Notes |
|-------------------|-----------------------|-----------------|------|
| 6.x               | >=16.0               | [Migration 6.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-6.x)     | removal of jQuery (now uses browser native code), requires Slickgrid-Universal [3.x](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v3.0.0) version |
| 5.x               | >=14.0               | [Migration 5.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-5.x)     | removal of jQueryUI, requires Slickgrid-Universal [2.x](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v2.0.0) version |
| 4.x               | >=13.0               | [Migration 4.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-4.x)     | for Ivy build only, requires Slickgrid-Universal [1.x](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v1.1.1) version |
| 3.x               | >=12.0                | [Migration 3.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-3.x) | the lib now uses [Slickgrid-Universal](https://github.com/ghiscoding/slickgrid-universal) monorepo [v0.19.2](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v0.19.2). Also, IE11 is EOL and no longer supported. |
| 2.x               | 7-11.x           | [Migration 2.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-2.x) | support multiple grids on same page     |
| 1.x               | 4-6.x                 |                 |      |

**Note** For a full compatibility table of Angular-Slickgrid with Slickgrid-Universal, please take a look at the [Versions Compatibility Table - Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Versions-Compatibility-Table).

For Angular 12+ see the instructions below - [Angular 12 with WebPack 5 - polyfill issue](#angular-12-with-webpack-5---how-to-fix-polyfill-error).

### ngx-translate Compatibility

Angular-Slickgrid uses `ngx-translate` library to support Locales, it is also required even when using a single Locale. The reason is because, we use `@Optional() TranslateService` in the lib and for that to work, it requires `ngx-translate` to installed. Once you run the build and if you are using a single Locale then the tree shaking process should remove these optional dependencies. See their version compatibility table below for more info

| Angular Version | @ngx-translate/core |
|-----------------|---------------------|
|  16+            |        15.x         |
|  13+ (Ivy only) |        14.x         |
|  10-13          |        13.x         |
|  8-9            |        12.x         |
|  7              |        11.x         |

### Fully Tested with [Jest](https://jestjs.io/) (Unit Tests) - [Cypress](https://www.cypress.io/) (E2E Tests)
Angular-Slickgrid and Slickgrid-Universal both have **100%** Unit Test Coverage, we are talking about +15,000 lines of code (+3,750 unit tests) that are fully tested with [Jest](https://jestjs.io/). On the UI side, all Angular-Slickgrid Examples are tested with [Cypress](https://www.cypress.io/), there are over +500 Cypress E2E tests.

#### How to load data with `HttpClient`?
You might notice that all demos are coded with mocked dataset in each of the examples, that is mainly for demo purposes, but you might be wondering how to connect this with an `HttpClient`? Easy... just replace the mocked data, assigned to the `dataset` property, by your `HttpClient` call it and that's it. The `dataset` property can be changed or refreshed at any time, which is why you can use local data and/or connect it to a `Promise` or an `Observable` with `HttpClient` (internally it's just a SETTER that refreshes the grid). See [Example 24](https://ghiscoding.github.io/Angular-Slickgrid/#/gridtabs) for a demo showing how to load a JSON file with `HttpClient`.

## Main features
You can see some screenshots below and the instructions down below and if that is not enough for you to decide, head over to the [Wiki - Main Features](https://github.com/ghiscoding/Angular-Slickgrid/wiki).

## Troubleshooting Section

### Angular 12 with WebPack 5 - how to fix polyfill error
Since Angular 12 switched to WebPack 5, you might get some new errors and you will need to add some polyfills manually to get the Excel Builder (Excel Export) to work.

#### The error you might get

```text
BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.
```

#### Steps to fix it
1. `npm install stream-browserify`
2. Add a path mapping in `tsconfig.json`:
```
{
  ...
  "compilerOptions": {
    "paths": {
      "stream": [ "./node_modules/stream-browserify" ]
    },
```
3. Add `stream` to `allowedCommonJsDependencies` in `angular.json`:
```
  "options": {
    "allowedCommonJsDependencies": [
      "excel-builder-webpacker",
      "stream"
    ],
```

### `ngcc` Build Warnings (Angular >=8.0 && <16.0)
You might get warnings about SlickGrid while doing a production build, most of them are fine and the best way to fix them, is to simply remove/ignore the warnings to CommonJS packages, all you have to do is to add a file named `ngcc.config.js` in your project root (same location as the `angular.json` file) with the following content (you can also see this [commit](https://github.com/ghiscoding/angular-slickgrid-demos/commit/1fe8092bcd2e99ede5ab048f4a7ebe6254e4bee0) which fixes the Angular-Slickgrid-Demos prod build):
```js
module.exports = {
  packages: {
    'angular-slickgrid': {
      ignorableDeepImportMatchers: [
        /assign-deep/,
        /slickgrid\//,
        /flatpickr/,
        /dequal/,
      ]
    },
  }
};
```
You should also add `Angular-Slickgrid` as an allowed CommonJS dependency to your `angular.json` file to silence the warnings.
```json
"options": {
  "allowedCommonJsDependencies": ["angular-slickgrid"]
}
```

#### `strictTemplates` error
In Angular 14 and higher, Angular has a `strictTemplates` flag in your `tsconfig.json` file (enabled by default when creating new projects from CLI) which causes issues with Angular-Slickgrid events with errors similar to this:

> Property 'detail' does not exist on type 'Event'. (onAngularGridCreated)="angularGridReady($event.detail)"

The reason is because Angular-Slickgrid uses Custom Event for all its events and Angular complains because these Custom Events aren't typed. In order to fix this issue, you have 3 viable approach:

1. disabled `strictTemplates` in your `tsconfig.json` config
2. cast the event in the View template to `$any` type 
  - `$any($event)` for example `$any($event).detail.eventData`
3. cast the event in the component ViewModel to `CustomEvent`
```html
<angular-slickgrid gridId="grid28"
    [columnDefinitions]="columnDefinitions"
    [gridOptions]="gridOptions"
    [dataset]="dataset"                    
    (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>
```

```ts
angularGridReady(event: CustomEvent) {
  this.angularGrid = event.detail as AngularGridInstance;
  this.gridObj = this.angularGrid.slickGrid;
}
```

The simplest is obviously the option 1 but you lose the strictness on the view templates, more details can found under the discussion [(`strictTemplates`) Template error ](https://github.com/ghiscoding/Angular-Slickgrid/discussions/815), I have also opened a similar Stack Overflow question myself: 
[How to use Custom Event (not Event Emitter) without `strictTemplates` to complain about `$event` not being a Custom Event type?](https://stackoverflow.com/questions/68490848/how-to-use-custom-event-not-event-emitter-without-stricttemplates-to-complai).

## Screenshots

Screenshots from the demo app with the `Bootstrap` theme.

_Note that the styling changed a bit, the best is to simply head over to the [Live Demo](https://ghiscoding.github.io/Angular-Slickgrid) page._

### Slickgrid example with Formatters (last column shown is a custom Formatter)

#### _You can also see the Grid Menu opened (aka hambuger menu)_

![Default Slickgrid Example](/screenshots/formatters.png)

### Filters and Multi-Column Sort

![Filter and Sort](/screenshots/filter_and_sort.png)

### Inline Editing

![Editors](/screenshots/editors.png)

### Pinned (aka frozen) Columns/Rows

![Pinned Columns/Rows](/screenshots/frozen.png)

### Draggable Grouping & Aggregators

![Draggable Grouping](/screenshots/draggable-grouping.png)

### Slickgrid Example with Server Side (Filter/Sort/Pagination)
#### Comes with OData & GraphQL support (you can implement custom ones too)

![Slickgrid Server Side](/screenshots/pagination.png)

### Composite Editor Modal Windows
![Composite Editor Modal](/screenshots/composite-editor.png)
