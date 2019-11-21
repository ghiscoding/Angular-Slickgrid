# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.14.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.13.1...v2.14.0) (2019-11-21)


### Features

* **cypress:** add Dynamic Filters feature E2E Cypress tests ([043ce89](https://github.com/ghiscoding/angular-slickgrid/commit/043ce895ba3b6db33de55b58378bb6f92a24ab9a))
* **filters:** allow to bypass changed events when calling updateFilters ([62c807e](https://github.com/ghiscoding/angular-slickgrid/commit/62c807e85a2c8203f32826075e271523f702a4c8))
* **filters:** provide method to apply grid filters dynamically ([8c10e5a](https://github.com/ghiscoding/angular-slickgrid/commit/8c10e5af9b34448c0d9cda6b42e4acc063074a68))
* **sorting:** allow to bypass changed events when calling updateSorting ([35936ad](https://github.com/ghiscoding/angular-slickgrid/commit/35936addc7d8b9287bb04c16489fbd927d5623ec))
* **sorting:** provide method to apply grid sorting dynamically ([9a99ca0](https://github.com/ghiscoding/angular-slickgrid/commit/9a99ca04b1d18624614a4f310e32a1f9f08ab654))
* **tests:** add Jest & Cypress tests for Dynamic Sorting feature ([d0fa65e](https://github.com/ghiscoding/angular-slickgrid/commit/d0fa65e186c77ffbfe1d471d580a926e299669f9))


### Bug Fixes

* **picker:** make sure picker addon is available before translating ([e295c26](https://github.com/ghiscoding/angular-slickgrid/commit/e295c26b99a59664219fd457215308f305933d6a))

### [2.13.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.13.0...v2.13.1) (2019-11-12)


### Bug Fixes

* **filter:** add missing radius (right) on compound input filters ([e1aaefd](https://github.com/ghiscoding/angular-slickgrid/commit/e1aaefd1937fda39e7554303e69acd570f8c2b38))
* **firefox:** thousand separator regex lookbehind not allow, fixes [#336](https://github.com/ghiscoding/angular-slickgrid/issues/336) ([4c3ed76](https://github.com/ghiscoding/angular-slickgrid/commit/4c3ed76e0df75dd792d498a4a162c76cc9f35ed3))
* **pagination:** never display page 0, minimum should be page 1 ([a44af9f](https://github.com/ghiscoding/angular-slickgrid/commit/a44af9f3aa1dff44862d2e01ead8698711339954))

## [2.13.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.12.3...v2.13.0) (2019-11-07)


### Features

* **cypress:** upgrade to latest version of Cypress ([0f1fd87](https://github.com/ghiscoding/angular-slickgrid/commit/0f1fd873582ffe75b3abd0ad376a0e6ae2103265))
* **formatterOptions:** add decimal,thousand separator to all Formatters ([20345bb](https://github.com/ghiscoding/angular-slickgrid/commit/20345bba13ac8c678a8318995cb1cd2856901c98))
* **tests:** add missing unit tests for Excel Export Service ([eb0a536](https://github.com/ghiscoding/angular-slickgrid/commit/eb0a536df7bc305a7ed91c04213fa162ed4bfcaa))
* **tests:** add more Angular-Slickgrid component unit tests ([01bfd6f](https://github.com/ghiscoding/angular-slickgrid/commit/01bfd6f7bd56efe679ebbff35d424f3488f1aa24))
* **tests:** Angular-Slickgrid Component add missing unit tests ([0094494](https://github.com/ghiscoding/angular-slickgrid/commit/0094494d7f715fa527bb347b5dbc78a91c3f524d))

### [2.12.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.12.2...v2.12.3) (2019-10-29)


### Features

* **cypress:** add Pagination Service E2E tests ([72f6df3](https://github.com/ghiscoding/angular-slickgrid/commit/72f6df309b834180709de70fbbae37b4a19f2184))
* **styling:** improve header menu styling ([ba28d2b](https://github.com/ghiscoding/angular-slickgrid/commit/ba28d2b466169f82d9bd785497e85960db022e20))
* **tests:** add Angular-Slickgrid component tests ([1e84911](https://github.com/ghiscoding/angular-slickgrid/commit/1e84911c69949de469f3b0d797f3a04e46a418d7))
* **tests:** add more Angular-Slickgrid unit tests ([60192cd](https://github.com/ghiscoding/angular-slickgrid/commit/60192cd9c1c6d537da81863f723b94bbe99702eb))
* **tests:** starting adding Slick-Pagination Component unit tests ([b48ee06](https://github.com/ghiscoding/angular-slickgrid/commit/b48ee0616047d3077ebb5afb13d4ee109c48839a))


### Bug Fixes

* **editor:** use editorOptions only ([08b1930](https://github.com/ghiscoding/angular-slickgrid/commit/08b19302d0c852aef8e0d0e6bd709aef6eee40e2))
* **graphql:** pagination offset should never be below zero ([41e321f](https://github.com/ghiscoding/angular-slickgrid/commit/41e321f2f8a2f62cc70c7b05cf73e27690b3c5e0))
* **graphql:** translate pagination texts on initial load ([3ecd9b9](https://github.com/ghiscoding/angular-slickgrid/commit/3ecd9b91c771e90284ecd5b3eb900b4892cec361))
* **odata:** filter with single quote should be escaped, fixes [#328](https://github.com/ghiscoding/angular-slickgrid/issues/328) ([1cd0b47](https://github.com/ghiscoding/angular-slickgrid/commit/1cd0b47e6b355ca601330dc35ac597b22a4b726a))
* **styling:** hidden menu visible in BS4 for Picker/Grid Menu, fix [#321](https://github.com/ghiscoding/angular-slickgrid/issues/321) ([9d597c4](https://github.com/ghiscoding/angular-slickgrid/commit/9d597c4b71ac83b32ccae75e88c6ee472d7e6bdc))

### [2.12.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.12.1...v2.12.2) (2019-10-21)


### Bug Fixes

* **frozen:** fix header grouping grid with frozen columns, fixes [#290](https://github.com/ghiscoding/angular-slickgrid/issues/290) ([b851224](https://github.com/ghiscoding/angular-slickgrid/commit/b851224))

### [2.12.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.12.0...v2.12.1) (2019-10-21)


### Bug Fixes

* **editor:** autocommit should not save if value is the same as before ([a07d239](https://github.com/ghiscoding/angular-slickgrid/commit/a07d239))
* **editor:** provide complex object override path for select editor ([a93a53d](https://github.com/ghiscoding/angular-slickgrid/commit/a93a53d))


### Features

* **rowDetail:** expose public all render/redraw methods of Row Detail ([de0b3e9](https://github.com/ghiscoding/angular-slickgrid/commit/de0b3e9))

## [2.12.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.11.3...v2.12.0) (2019-10-17)


### Bug Fixes

* **gridService:** addItem/updatedItemById must pass an array to setSelectedRows ([#308](https://github.com/ghiscoding/Angular-Slickgrid/pull/308))
* **excel:** exporting to Excel should also work from Grid Menu ([b2f0680](https://github.com/ghiscoding/angular-slickgrid/commit/b2f0680))
* **filter:** should be able to filter even on hidden columns, fixes [#310](https://github.com/ghiscoding/angular-slickgrid/issues/310) ([47a1ab7](https://github.com/ghiscoding/angular-slickgrid/commit/47a1ab7))


### Features

* **bootstrap:** add Bootstrap Action Dropdown example ([0b96746](https://github.com/ghiscoding/angular-slickgrid/commit/0b96746))
* **excel:** add Excel Export feature and add full unit test suite ([d787131](https://github.com/ghiscoding/angular-slickgrid/commit/d787131))
* **export:** add Export to Excel feature ([f06977f](https://github.com/ghiscoding/angular-slickgrid/commit/f06977f))
* **tests:** add more grid service unit tests ([a2ddab2](https://github.com/ghiscoding/angular-slickgrid/commit/a2ddab2))

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
