# Angular-Slickgrid

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![NPM downloads](https://img.shields.io/npm/dy/angular-slickgrid)](https://npmjs.org/package/angular-slickgrid)
[![npm](https://img.shields.io/npm/v/angular-slickgrid.svg?logo=npm&logoColor=fff&label=npm)](https://www.npmjs.com/package/angular-slickgrid)

[![Actions Status](https://github.com/ghiscoding/Angular-Slickgrid/workflows/CI%20Build/badge.svg)](https://github.com/ghiscoding/Angular-Slickgrid/actions)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![codecov](https://codecov.io/gh/ghiscoding/Angular-Slickgrid/branch/master/graph/badge.svg)](https://codecov.io/gh/ghiscoding/Angular-Slickgrid)

### Brief introduction
One of the best javascript datagrid [SlickGrid](https://github.com/mleibman/SlickGrid) which was originally developed by @mleibman is now available to Angular. I have used a few datagrids and SlickGrid beats most of them in terms of functionalities and performance (it can easily deal with even a million row). We will be using the [6pac/SlickGrid](https://github.com/6pac/SlickGrid/) fork, it is the most active fork since the original author @mleibman stopped working on his original repo. Also worth knowing that I have contributed a lot to the 6pac/SlickGrid fork for the benefit of Angular-Slickgrid... also a reminder, this is a wrapper of a jQuery lib (SlickGrid) and a big portion of the lib (like Editors, Filters and others) are written in jQuery/JavaScript, so just keep that in mind and it also mean that jQuery is a dependency.

### License
[MIT License](LICENSE)

## Installation
Refer to the **[Wiki - HOWTO Step by Step](https://github.com/ghiscoding/angular-slickgrid/wiki/HOWTO---Step-by-Step)** and/or clone the [Angular-Slickgrid Demos](https://github.com/ghiscoding/angular-slickgrid-demos) repository. Please consult all Wikis before opening new issues, also consider asking installation and/or general questions on [Stack Overflow](https://stackoverflow.com/search?tab=newest&q=slickgrid) unless you think there's a bug with the library.

```sh
npm install angular-slickgrid
```

### Demo page
`Angular-Slickgrid` works with all `Bootstrap` versions, you can see a demo of each one below. There are also 2 new styling Themes, Material & Salesforce which are also available. You can also use different SVG icons, you may want to look at the [Wiki - SVG Icons](https://github.com/ghiscoding/Angular-Slickgrid/wiki/SVG-Icons)
- [Bootstrap 5 demo](https://ghiscoding.github.io/Angular-Slickgrid) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap5-demo-with-translate)
- [Bootstrap 4 demo](https://ghiscoding.github.io/angular-slickgrid-demos) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap4-demo-with-translate)

#### Working Demo
For a complete & working local demo (30+ examples), you can (and should) clone the [Angular-Slickgrid Demos](https://github.com/ghiscoding/angular-slickgrid-demos) repository to get started. That repo is updated frequently and is used to update the GitHub demo page for both the [Bootstrap 5 demo](https://ghiscoding.github.io/Angular-Slickgrid) and [Bootstrap 4 demo](https://ghiscoding.github.io/angular-slickgrid-demos).
```bash
git clone https://github.com/ghiscoding/angular-slickgrid-demos
cd bootstrap4-demo-with-translate # or any of the 4 demos
npm install
npm start
```

### Like it? :star: it
You like to use **Angular-Slickgrid**? Be sure to upvote :star:, maybe support me with cafeine :coffee: and feel free to contribute. 👷👷‍♀️

<a href='https://ko-fi.com/ghiscoding' target='_blank'><img height='32' style='border:0px;height:32px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' />

## Latest News & Releases
Check out the [Releases](https://github.com/ghiscoding/Angular-Slickgrid/releases) section for all latest News & Releases.

## Angular Compatibility
- version `1.x.x` for Angular 4-6
- version `2.x.x` for Angular 7-11
- version `3.x.x` for Angular 12+ and RxJS 7+ ([migration guide to 3.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-3.x))
  - IE11 is EOL and **no longer supported**, if you still need to support it stay with version 2.x
  - uses new [Slickgrid-Universal](https://github.com/ghiscoding/slickgrid-universal) monorepo version 0.19.2
- version `4.x.x` for Angular 13+, RxJS 7+ and **Ivy ONLY** ([migration guide to 4.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-4.x))
  - for Ivy build only (no more UMD bundle & output >= ES2017), IE not supported.
  - requires Slickgrid-Universal [1.x](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v1.1.1) version
- version `5.x.x` for Angular 14+, RxJS >=7.5.0 and **Ivy ONLY** ([migration guide to 5.x](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-5.x))
  - removal of jQueryUI dependency (replaced internally by SortableJS, a smaller and touch friendly lib).
  - requires Slickgrid-Universal [2.x](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v2.0.0) version

**Note** For a full compatibility table of Angular-Slickgrid with Slickgrid-Universal, you can consult the [Versions Compatibility Table - Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Versions-Compatibility-Table)

For Angular 12+ see the instructions below - [Angular 12 with WebPack 5 - polyfill issue](https://github.com/ghiscoding/Angular-Slickgrid#angular-12-with-webpack-5---how-to-fix-polyfill-error)

### ngx-translate Compatibility

If you are facing any issues with `ngx-translate` library while building your Angular Project. You need to make sure that `@ngx-translate/core` is part of your dependencies, that is also true even when using a single Locale, that is because it is a `peerDependency` of Angular-Slickgrid. The reason is because, we use `@Optional() TranslateService` in the lib and for that to work, we still need it to be installed, but don't worry it should still be removed by the tree shaking process after a running a production build. See their version compatibility table below

| Angular Version | @ngx-translate/core |
|-----------------|---------------------|
|  13+ (Ivy only) |        14.x+        |
|  10-13          |        13.x+        |
|  8-9            |        12.x+        |
|  7              |        11.x+        |

### Build Warnings (Angular 8+)
You might get warnings about SlickGrid while doing a production build, most of them are fine and the best way to fix them, is to simply remove/ignore the warnings, all you have to do is to add a file named `ngcc.config.js` in your project root (same location as the `angular.json` file) with the following content (you can also see this [commit](https://github.com/ghiscoding/angular-slickgrid-demos/commit/1fe8092bcd2e99ede5ab048f4a7ebe6254e4bee0) which fixes the Angular-Slickgrid-Demos prod build):
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
      "assign-deep",
      "excel-builder-webpacker",
      "stream"
    ],
```

### Fully Tested with [Jest](https://jestjs.io/) (Unit Tests) - [Cypress](https://www.cypress.io/) (E2E Tests)
Angular-Slickgrid and Slickgrid-Universal both have **100%** Unit Test Coverage, we are talking about +15,000 lines of code (+3,750 unit tests) that are fully tested with [Jest](https://jestjs.io/). On the UI side, all Angular-Slickgrid Examples are tested with [Cypress](https://www.cypress.io/), there are over +500 Cypress E2E tests.

#### How to load data with `HttpClient`?
You might notice that all demos are coded with mocked dataset in each of the examples, that is mainly for demo purposes, but you might be wondering how to connect this with an `HttpClient`? Easy... just replace the mocked data, assigned to the `dataset` property, by your `HttpClient` call it and that's it. The `dataset` property can be changed or refreshed at any time, which is why you can use local data and/or connect it to a `Promise` or an `Observable` with `HttpClient` (internally it's just a SETTER that refreshes the grid). See [Example 24](https://ghiscoding.github.io/Angular-Slickgrid/#/gridtabs) for a demo showing how to load a JSON file with `HttpClient`.

## Wiki / Documentation
The Wiki is where all the documentation and instructions will go, so please consult the [Angular-Slickgrid - Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki) before opening any issues. The [Wiki - HOWTO](https://github.com/ghiscoding/Angular-Slickgrid/wiki/HOWTO---Step-by-Step) is a great place to start with. You can also take a look at the [Demo page](https://ghiscoding.github.io/Angular-Slickgrid), it includes sample for most of the features and it keeps growing (so you might want to consult it whenever a new version comes out).

## Main features
You can see some screenshots below and the instructions down below and if that is not enough for you to decide, head over to the [Wiki - Main Features](https://github.com/ghiscoding/Angular-Slickgrid/wiki).

## Missing features
What if `Angular-Slickgrid` is missing feature(s) compare to the original core library [6pac/SlickGrid](https://github.com/6pac/SlickGrid/)?

Fear not, you can simply reference the `SlickGrid` and `DataView` objects, just like in the core lib (they are exposed through Custom Events). For more info continue reading on [Wiki - SlickGrid & DataView objects](/ghiscoding/Angular-Slickgrid/wiki/SlickGrid-&-DataView-Objects) and [Wiki - Grid & DataView Events](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-&-DataView-Events)


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
