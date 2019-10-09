# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.11.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.11.2...v2.11.3) (2019-10-08)


### Features

* **example:** add Bootstrap Dropdown Action demo, closes [#304](https://github.com/ghiscoding/angular-slickgrid/issues/304) ([ba6082c](https://github.com/ghiscoding/angular-slickgrid/commit/ba6082c))
* **export:** add delimiter/listSeparator override to use with GraphQL ([de52614](https://github.com/ghiscoding/angular-slickgrid/commit/de52614))

### [2.11.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.11.1...v2.11.2) (2019-10-07)


### Bug Fixes

* **gridService:** upsertItem(s) should trigger onItemAdded/Updated event ([df9af21](https://github.com/ghiscoding/angular-slickgrid/commit/df9af21))
* **pagination:** when item is added it should trigger pagination changed ([c953a23](https://github.com/ghiscoding/angular-slickgrid/commit/c953a23))
* **pagination:** don't reset page 1 after manually adding items to grid ([f61285d](https://github.com/ghiscoding/angular-slickgrid/commit/f61285d))


### Features

* **example:** add programmatically Pagination change sample ([a150807](https://github.com/ghiscoding/angular-slickgrid/commit/a150807))

### [2.11.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.11.0...v2.11.1) (2019-10-04)


### Bug Fixes

* **styling:** styling issue in Firefox after col reordering, fixes [#297](https://github.com/ghiscoding/angular-slickgrid/issues/297) ([a2c7e39](https://github.com/ghiscoding/angular-slickgrid/commit/a2c7e39))


### Features

* **backend:** extract Pagination into its own Service to expose methods ([4a4a708](https://github.com/ghiscoding/angular-slickgrid/commit/4a4a708))

## [2.11.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.10.5...v2.11.0) (2019-10-02)


### Bug Fixes

* **build:** use latest SlickGrid version which might fix ES2015 build ([ff9f9d8](https://github.com/ghiscoding/angular-slickgrid/commit/ff9f9d8))
* **editors:** complex objects should work with all editors ([01f53ed](https://github.com/ghiscoding/angular-slickgrid/commit/01f53ed))
* **insert:** add item to bottom position should highlight correctly ([9f9e6eb](https://github.com/ghiscoding/angular-slickgrid/commit/9f9e6eb))


### Features

* **insert:** add option to insert item at bottom of grid ([32764fb](https://github.com/ghiscoding/angular-slickgrid/commit/32764fb))
* **metrics:** deprecated Statistic and renamed to Metrics ([aea60a9](https://github.com/ghiscoding/angular-slickgrid/commit/aea60a9))
* **odata:** add "enableCount" flag to add to OData query, closes [#287](https://github.com/ghiscoding/angular-slickgrid/issues/287) ([1d70037](https://github.com/ghiscoding/angular-slickgrid/commit/1d70037))
* **tests:** add AutoComplete Filter test suite ([8ccea92](https://github.com/ghiscoding/angular-slickgrid/commit/8ccea92))
* **tests:** add AutoComplete missing test ([313da78](https://github.com/ghiscoding/angular-slickgrid/commit/313da78))
* **tests:** add missing AutoComplete unit tests ([24487a4](https://github.com/ghiscoding/angular-slickgrid/commit/24487a4))
* **tests:** add missing unit tests for all Editors ([c275b87](https://github.com/ghiscoding/angular-slickgrid/commit/c275b87))
* **tests:** add more Single & MultipleSelectEditor unit tests ([9dc1abe](https://github.com/ghiscoding/angular-slickgrid/commit/9dc1abe))
* **tests:** add some tests for the AutoComplete Editor ([360da3e](https://github.com/ghiscoding/angular-slickgrid/commit/360da3e))
* **upsert:** add option to upsert item at bottom of grid & view scroll ([7b25dd7](https://github.com/ghiscoding/angular-slickgrid/commit/7b25dd7))

### [2.10.5](https://github.com/ghiscoding/angular-slickgrid/compare/v2.10.4...v2.10.5) (2019-08-29)

### [2.10.4](https://github.com/ghiscoding/angular-slickgrid/compare/v2.10.3...v2.10.4) (2019-08-29)

### [2.10.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.10.2...v2.10.3) (2019-08-29)


### Bug Fixes

* **core:** dowgrade to previous SlickGrid version to fix issues ([1fd11ab](https://github.com/ghiscoding/angular-slickgrid/commit/1fd11ab))


### Features

* **tests:** add CompoundDate Filter unit tests ([45348a0](https://github.com/ghiscoding/angular-slickgrid/commit/45348a0))
* **tests:** add CompoundSlider Filter unit tests ([06abb3d](https://github.com/ghiscoding/angular-slickgrid/commit/06abb3d))
* **tests:** add NativeSelect Filter unit tests & tweak some Filters ([4b952c9](https://github.com/ghiscoding/angular-slickgrid/commit/4b952c9))
* **tests:** add slider unit tests ([5ae1a85](https://github.com/ghiscoding/angular-slickgrid/commit/5ae1a85))

### [2.10.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.10.1...v2.10.2) (2019-08-26)


### Bug Fixes

* **backend:** queries should not include pagination option when disabled ([d648b80](https://github.com/ghiscoding/angular-slickgrid/commit/d648b80))
* **test:** fix a Cypress flaky test that was sometime failing ([4ed5a29](https://github.com/ghiscoding/angular-slickgrid/commit/4ed5a29))


### Features

* **tests:** add SelectFilter unit tests ([5115e08](https://github.com/ghiscoding/angular-slickgrid/commit/5115e08))

## [2.10.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.9.9...v2.10.0) (2019-08-19)


### Bug Fixes

* **dom:** ColumnPicker & GridMenu were creating multiple DOM elements ([8916f90](https://github.com/ghiscoding/angular-slickgrid/commit/8916f90))
* **gridMenu:** add more type checks to avoid console error, fixes [#268](https://github.com/ghiscoding/angular-slickgrid/issues/268) ([328c9af](https://github.com/ghiscoding/angular-slickgrid/commit/328c9af))
* **odata:** use contains with OData version 4 ([e936f33](https://github.com/ghiscoding/angular-slickgrid/commit/e936f33))
* **presets:** Grid State & Presets stopped working for columns ([4e0b528](https://github.com/ghiscoding/angular-slickgrid/commit/4e0b528))
* **styling:** fix some Bootstrap 4 styling ([ee4931c](https://github.com/ghiscoding/angular-slickgrid/commit/ee4931c))


### Build System

* **deps:** bump fstream from 1.0.11 to 1.0.12 ([6813234](https://github.com/ghiscoding/angular-slickgrid/commit/6813234))
* **deps:** bump jquery from 3.3.1 to 3.4.0 ([4175f25](https://github.com/ghiscoding/angular-slickgrid/commit/4175f25))
* **deps:** bump lodash.mergewith from 4.6.1 to 4.6.2 ([f538320](https://github.com/ghiscoding/angular-slickgrid/commit/f538320))


### Features

* **filter:** add a few input/compoundInput filters ([190176a](https://github.com/ghiscoding/angular-slickgrid/commit/190176a))
* **filter:** add Cypress E2E tests for the Filter by Range grid ([7da17f8](https://github.com/ghiscoding/angular-slickgrid/commit/7da17f8))
* **filter:** add DateRange Filter unit test & refactor code ([308082f](https://github.com/ghiscoding/angular-slickgrid/commit/308082f))
* **filter:** add input search range functionality, ref issue [#240](https://github.com/ghiscoding/angular-slickgrid/issues/240) ([7273cf8](https://github.com/ghiscoding/angular-slickgrid/commit/7273cf8))
* **filter:** add new rangeDate Filter ([0878569](https://github.com/ghiscoding/angular-slickgrid/commit/0878569))
* **filter:** add new SliderRange Filter ([26dc63c](https://github.com/ghiscoding/angular-slickgrid/commit/26dc63c))
* **filter:** add optional placeholder to multiple select ([1b1274b](https://github.com/ghiscoding/angular-slickgrid/commit/1b1274b))
* **filter:** add SliderRange Filter unit tests & fix searchTerms input ([be136be](https://github.com/ghiscoding/angular-slickgrid/commit/be136be))
* **locales:** add unit tests when using locales with enableTranslate ([413ea71](https://github.com/ghiscoding/angular-slickgrid/commit/413ea71))
* **locales:** add unit tests when using locales with enableTranslate ([ae48ddf](https://github.com/ghiscoding/angular-slickgrid/commit/ae48ddf))
* **sorters:** consolidate & provide all date sorters ([fdc1155](https://github.com/ghiscoding/angular-slickgrid/commit/fdc1155))
* **tests:** add Cypress E2E tests to cover hidden columns, closes [#250](https://github.com/ghiscoding/angular-slickgrid/issues/250) ([22868f5](https://github.com/ghiscoding/angular-slickgrid/commit/22868f5))
* **translate:** add optional Locale functionality ([8f24d2d](https://github.com/ghiscoding/angular-slickgrid/commit/8f24d2d))
* **translate:** make ngx-translate an optional dependency ([86b1214](https://github.com/ghiscoding/angular-slickgrid/commit/86b1214))
* **translate:** make ngx-translate optional in all necessary Editors ([5eb1ec1](https://github.com/ghiscoding/angular-slickgrid/commit/5eb1ec1))
* **translate:** make translate optional in SlickPagination component ([0d6b2e2](https://github.com/ghiscoding/angular-slickgrid/commit/0d6b2e2))
