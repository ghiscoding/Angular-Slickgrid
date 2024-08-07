# Angular-Slickgrid

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![NPM downloads](https://img.shields.io/npm/dy/angular-slickgrid)](https://npmjs.org/package/angular-slickgrid)
[![npm](https://img.shields.io/npm/v/angular-slickgrid.svg?logo=npm&logoColor=fff&label=npm)](https://www.npmjs.com/package/angular-slickgrid)
<!--[![npm bundle size](https://img.shields.io/bundlephobia/minzip/angular-slickgrid?color=success&label=gzip)](https://bundlephobia.com/result?p=angular-slickgrid)-->

[![Actions Status](https://github.com/ghiscoding/Angular-Slickgrid/workflows/CI%20Build/badge.svg)](https://github.com/ghiscoding/Angular-Slickgrid/actions)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg?logo=cypress)](https://www.cypress.io/)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![codecov](https://codecov.io/gh/ghiscoding/Angular-Slickgrid/branch/master/graph/badge.svg)](https://codecov.io/gh/ghiscoding/Angular-Slickgrid)

### Brief introduction
One of the best JavasSript datagrid [SlickGrid](https://github.com/mleibman/SlickGrid), which was originally developed by @mleibman, is now available to the Angular world. SlickGrid beats most other datagrids in terms of features, customizability and performance (running smoothly with even a million rows). Angular-Slickgrid is a wrapper on top of [Slickgrid-Universal](https://github.com/ghiscoding/slickgrid-universal/) (which is required), in the early beginning we used the `6pac/SlickGrid` fork but that was dropped in >=[v7.0](https://github.com/ghiscoding/Angular-Slickgrid/releases/tag/v7.0.3) since Slickgrid-Universal is now a standalone project. SlickGrid was also recently rewritten with browser native code (no more ~jQuery~ 🎉).

### License
[MIT License](LICENSE)

## Documentation
📕 [Documentation](https://ghiscoding.gitbook.io/angular-slickgrid/getting-started/quick-start) website powered by GitBook for version 7+ (_or use the [Wikis](https://github.com/ghiscoding/Angular-Slickgrid/wiki) for older versions_).

For common issues, see the [Troubleshooting Section](#troubleshooting-section) below

## Installation
[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https:///pr.new/ghiscoding/angular-slickgrid)

A good starting point is the **[Docs - Quick Start](https://ghiscoding.gitbook.io/angular-slickgrid/getting-started/quick-start)** and/or simply clone the [Angular-Slickgrid Demos](https://github.com/ghiscoding/angular-slickgrid-demos) repository. Please review all documentation and closed issues before opening any new issue, also consider asking installation and/or general questions on [Stack Overflow](https://stackoverflow.com/search?tab=newest&q=slickgrid) unless you think there's a bug with the library.

```sh
npm install angular-slickgrid
```

### Demo page
`Angular-Slickgrid` works with all `Bootstrap` versions, you can see a demo of each one below. It also works well with any other frameworks like Material or Bulma and there are also couple of extra styling themes based on Material & Salesforce which are also available. You can also use different SVG icons, you may want to look at the [Docs - SVG Icons](https://ghiscoding.gitbook.io/angular-slickgrid/styling/svg-icons)

[Angular-Slickgrid-Demos](https://github.com/ghiscoding/angular-slickgrid-demos) includes the following:
- [Bootstrap 5 demo](https://ghiscoding.github.io/Angular-Slickgrid) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap5-demo-with-translate) - Code samples which uses `ngx-translate` to support multiple locales.
- [Bootstrap 5 (single Locale)](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap5-demo-with-locales) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap5-demo-with-locales) - Code Sample with a single Locale (without `ngx-translate`)

#### Working Demo
For a complete set of working demos (40+ examples), we strongly suggest you clone [Angular-Slickgrid Demos](https://github.com/ghiscoding/angular-slickgrid-demos) repository (instructions are provided in the demo repo). The repo provides multiple demos and they are updated for every new project release, so it is updated frequently and is also used as the GitHub live demo page for both the [Bootstrap 5 demo](https://ghiscoding.github.io/Angular-Slickgrid) and [Bootstrap 5 demo (single Locale)](https://ghiscoding.github.io/angular-slickgrid-demos).

```sh
git clone https://github.com/ghiscoding/angular-slickgrid-demos
cd bootstrap5-demo-with-translate # or any of the other demos
npm install
npm start
```

### Like it? ⭐ it
You like to use **Angular-Slickgrid**? Be sure to upvote ⭐ and maybe support me with caffeine [☕](https://ko-fi.com/ghiscoding) and feel free to contribute. 👷👷‍♀️

<a href='https://ko-fi.com/ghiscoding' target='_blank'><img height='32' style='border:0px;height:32px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' />

### Contributions
If you wish to contribute then make sure to follow the steps shown in the [CONTRIBUTING](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/CONTRIBUTING.md) guide.

## Latest News & Releases
Check out the [Releases](https://github.com/ghiscoding/Angular-Slickgrid/releases) section for all latest News & Releases.

## Angular Compatibility

> **Note** please be aware that only the latest version of Angular-Slickgrid is supported and will receive bug fixes. The reason older versions are not supported is simply because it's already a lot of work to maintain for a single developer.

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

**Note** For a full compatibility table of Angular-Slickgrid with Slickgrid-Universal, please take a look at the [Versions Compatibility Table - Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Versions-Compatibility-Table).

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

### Tested with [Jest](https://jestjs.io/) (Unit Tests) - [Cypress](https://www.cypress.io/) (E2E Tests)
Slickgrid-Universal has **100%** Unit Test Coverage and all Angular-Slickgrid Examples are tested with [Cypress](https://www.cypress.io/) as E2E tests.

## Troubleshooting Section

- [Angular 12 with WebPack 5 - how to fix polyfill error](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Versions-Compatibility-Table#angular-12-with-webpack-5---how-to-fix-polyfill-error)
- [`ngcc` Build Warnings (Angular >=8.0 && <16.0)](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Versions-Compatibility-Table#ngcc-build-warnings-angular-80--160)
- [`strictTemplates` error](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Versions-Compatibility-Table#stricttemplates-error)
