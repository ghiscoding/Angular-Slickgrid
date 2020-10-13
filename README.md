# Angular-Slickgrid

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![npm version](https://badge.fury.io/js/angular-slickgrid.svg)](//npmjs.com/package/angular-slickgrid)
[![NPM downloads](https://img.shields.io/npm/dy/angular-slickgrid.svg)](https://npmjs.org/package/angular-slickgrid)
[![gzip size](http://img.badgesize.io/https://npmcdn.com/angular-slickgrid/bundles/angular-slickgrid.umd.js?compression=gzip)](https://npmcdn.com/angular-slickgrid/bundles/angular-slickgrid.umd.js)

[![CircleCI](https://circleci.com/gh/ghiscoding/Angular-Slickgrid/tree/master.svg?style=shield)](https://circleci.com/gh/ghiscoding/workflows/Angular-Slickgrid/tree/master)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![codecov](https://codecov.io/gh/ghiscoding/Angular-Slickgrid/branch/master/graph/badge.svg)](https://codecov.io/gh/ghiscoding/Angular-Slickgrid)

### Brief introduction
One of the best javascript datagrid [SlickGrid](https://github.com/mleibman/SlickGrid) which was originally developed by @mleibman is now available to Angular. I have used a few datagrids and SlickGrid beats most of them in terms of functionalities and performance (it can easily deal with even a million row). We will be using the [6pac/SlickGrid](https://github.com/6pac/SlickGrid/) fork, this is the most active fork since the original @mleibman fork was closed some time ago by his author for personal reasons. Also worth to know, I also contributed a lot to the 6pac/SlickGrid fork for the benefit of Angular-Slickgrid... also a reminder, this is a wrapper of a jQuery lib (SlickGrid), a big portion of the lib (like Editors, Filters and others) are written in jQuery/JavaScript, so just keep that in mind and it also means that jQuery is a dependecy. 

### NPM Package
[Angular-Slickgrid on NPM](https://www.npmjs.com/package/angular-slickgrid)

### License
[MIT License](LICENSE)

### Like it? :star: it
You like and use this great library `Angular-Slickgrid`? Be sure to upvote :star: and feel free to contribute. :construction_worker:

### Like my work?
If you like my work, you can also support me with caffeine :coffee:
[Buy Me a Coffee](https://ko-fi.com/N4N679OT)

I certainly drank many coffees to build and keep adding features for this great library.

## Latest News & Releases
Check out the [Releases](https://github.com/ghiscoding/Angular-Slickgrid/releases) section for all latest News & Releases.

## Angular Compatibility
- version `1.x.x` for Angular 4 to 6 
   - Angular 6, is only supported through `rxjs-compat` as shown in this [post](https://github.com/ghiscoding/Angular-Slickgrid/issues/36#issuecomment-395710915). It's preferable to upgrade to Angular 7+ to avoid using the `rxjs-compat` package. 
- version `2.x.x` for Angular 7+ 
  - since version `2.11.0`, you can also change your build `target` to `ES2015` for modern browser.

### ngx-translate Compatibility

If you are facing any issue with `ngx-translate` library while building your Angular Project. You need to make sure `@ngx-translate/core` is part of your dependencies, even if you just use 1 Locale, because it is a `peerDependency` of Angular-Slickgrid (we use `@Optional() TranslateService` in the lib and for that to work, we still need it to be installed, but don't worry it should be removed by tree shaking process after a running a build). See their version compatibility table below

| Angular Version | @ngx-translate/core |
|-----------------|---------------------|
|        10       |        13.x+        |
|        9        |        12.x+        |
|        8        |        12.x+        |
|        7        |        11.x+        |

### Build Warnings (Angular 8+)
Since Angular 8+, a few warnings started to appear when doing a Prod build and that was asked in a few separate issues. These warnings are **fine**, the reason is because Angular-Slickgrid loads all of the SlickGrid extensions dynamically [here](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/modules/angular-slickgrid/extensions/extensionUtility.ts#L29) depending on which flags you use in the grid options, with `require('slickgrid/plugins/slick....');` and Angular is complaining about the use of `require` (even though in our case we load dynamically to avoid adding plugins code in your build that you might not even use).

These warnings are **normal** so the best way to fix this, is to simply remove the warnings, all you have to do is to add a file named `ngcc.config.js` in your project root (same location as the `angular.json` file) with the following content (you can also see this [commit](https://github.com/ghiscoding/angular-slickgrid-demos/commit/1fe8092bcd2e99ede5ab048f4a7ebe6254e4bee0) which fixes the Angular-Slickgrid-Demos prod build):
```js
module.exports = {
  packages: {
    'angular-slickgrid': {
      ignorableDeepImportMatchers: [
        /slickgrid\//,
        /flatpickr/,
        /jquery-ui-dist\//,
      ]
    },
  }
};
```

### Fully Tested with [Jest](https://jestjs.io/) (Unit Tests) - [Cypress](https://www.cypress.io/) (E2E Tests)
Angular-Slickgrid reached **100%** Unit Test Coverage, we are talking about +10,000 lines of code (+2,700 unit tests) that are now fully tested with [Jest](https://jestjs.io/). There are also over +350 Cypress E2E tests to cover most UI functionalities on nearly all Examples of Angular-Slickgrid.

## Installation
Refer to the **[Wiki - HOWTO Step by Step](https://github.com/ghiscoding/angular-slickgrid/wiki/HOWTO---Step-by-Step)** and/or clone the [Angular-Slickgrid Demos](https://github.com/ghiscoding/angular-slickgrid-demos) repository. Please don't open any issue unless you have followed these steps (from the Wiki), and if any of the steps are incorrect or confusing, then please let me know.

**NOTE:** if you have any question, please consider asking installation and/or general questions on [Stack Overflow](https://stackoverflow.com/search?tab=newest&q=slickgrid)

### Demo page
`Angular-Slickgrid` supports both `Bootstrap 3` and `Bootstrap 4`, you can see a demo of each one below.
- [Bootstrap 3 demo](https://ghiscoding.github.io/Angular-Slickgrid) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap3-demo-with-translate)
- [Bootstrap 4 demo](https://ghiscoding.github.io/angular-slickgrid-demos) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap4-demo-with-translate)

There are also 2 new Themes, Material & Salesforce that are available as well and if you wish to use SVG then take a look at the [Wiki - SVG Icons](https://github.com/ghiscoding/Angular-Slickgrid/wiki/SVG-Icons)

#### Working Demo
For a complete and working local demo, you can clone the [Angular-Slickgrid Demos](https://github.com/ghiscoding/angular-slickgrid-demos) repository. That repo is updated frequently and is used for demoing both the [Bootstrap 3 demo](https://ghiscoding.github.io/Angular-Slickgrid) and [Bootstrap 4 demo](https://ghiscoding.github.io/angular-slickgrid-demos).
```bash
git clone https://github.com/ghiscoding/angular-slickgrid-demos
cd bootstrap4-demo-with-translate
npm install
npm start
```

#### How to load data with `HttpClient`?
You might notice that all demos are coded with mocked dataset in each examples, that is mainly for demo purposes, but you might be wondering how to connect this with an `HttpClient`? Easy... just replace the mocked data, assigned to the `dataset` property, by your `HttpClient` call and that's it. The `dataset` property can be changed or refreshed at any time, which is why you can use local data and/or connect it to a `Promise` or an `Observable` with `HttpClient` (internally it's just a SETTER that refreshes the grid). See [Example 24](https://ghiscoding.github.io/Angular-Slickgrid/#/gridtabs) for a demo showing how to load a JSON file with `HttpClient`.

### You want to help and contribute?
You like the library and would like contribute? That would be awesome, the first thing you can do is head over to the [Version 2.x - Project](https://github.com/ghiscoding/Angular-Slickgrid/projects/1), there are some tasks that I would gladly like receiving help with. One of the biggest task is to increase Jest unit tests code coverage and/or more Cypress E2E tests.

## Wiki / Documentation
The Wiki is where all the documentation and instructions will go, so please consult the [Angular-Slickgrid - Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki) before opening any issues. The [Wiki - HOWTO](https://github.com/ghiscoding/Angular-Slickgrid/wiki/HOWTO---Step-by-Step) is a great place to start with. You can also take a look at the [Demo page](https://ghiscoding.github.io/Angular-Slickgrid), it includes sample for most of the features and it keeps growing (so you might want to consult it whenever a new version comes out).

## Main features
You can see some screenshots below and the instructions down below and if that is not enough for you to decide, head over to the [Wiki - Main Features](https://github.com/ghiscoding/Angular-Slickgrid/wiki).

## Missing features
What if `Angular-Slickgrid` is missing feature(s) compare to the original core library [6pac/SlickGrid](https://github.com/6pac/SlickGrid/)?

Fear not, and just simply reference the `SlickGrid` and `DataView` objects, just like in the core lib, those are exposed through Event Emitters. For more info continue reading on [Wiki - SlickGrid & DataView objects](/ghiscoding/Angular-Slickgrid/wiki/SlickGrid-&-DataView-Objects) and [Wiki - Grid & DataView Events](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-&-DataView-Events)


## Screenshots

Screenshots from the demo app with the `Bootstrap` theme.

### Slickgrid example with Formatters (last column shown is a custom Formatter)

#### You can also see the Grid Menu opened (aka hambuger menu)

![Default Slickgrid Example](/screenshots/formatters.png)

### Filter and Sort (clientside with DataView)

![Filter and Sort](/screenshots/filter_and_sort.png)

### Editors and/or onCellClick

![Editors](/screenshots/editors.png)

### Pinned (aka frozen) Columns/Rows

![Pinned Columns/Rows](/screenshots/frozen.png)

### Draggable Grouping & Aggregators

![Draggable Grouping](/screenshots/draggable-grouping.png)

### Slickgrid Example with Server Side (Filter/Sort/Pagination)
#### Comes with OData & GraphQL support (you can implement custom too)

![Slickgrid Server Side](/screenshots/pagination.png)
