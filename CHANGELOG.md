# Change Log
All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [8.13.4](https://github.com/ghiscoding/angular-slickgrid/compare/v8.13.3...v8.13.4) (2025-04-02)

### Bug Fixes

* findItemInTreeStructure() shouldn't throw w/large dataset ([ae48ea5](https://github.com/ghiscoding/angular-slickgrid/commit/ae48ea54b40caaaf52667ea1f5ff6e0346c97965))

## [8.13.3](https://github.com/ghiscoding/angular-slickgrid/compare/v8.13.2...v8.13.3) (2025-03-29)

### Bug Fixes

* shift + a should not select all cells upwards ([1bf2e96](https://github.com/ghiscoding/angular-slickgrid/commit/1bf2e964baa5e44514f45fb0b3314aea1eb301db))

## [8.13.2](https://github.com/ghiscoding/angular-slickgrid/compare/v8.13.1...v8.13.2) (2025-03-19)

### Bug Fixes

* Row Detail redraw all should work as expected ([dd4beab](https://github.com/ghiscoding/angular-slickgrid/commit/dd4beab0d47d70e1c34dbd97aa7a23268d53a10e))
* Row Detail should also work with fixed grid height or no autoHeight ([e56d435](https://github.com/ghiscoding/angular-slickgrid/commit/e56d4353690890d2ca3c020dfe14b3f3ec272334))

## [8.13.1](https://github.com/ghiscoding/angular-slickgrid/compare/v8.13.0...v8.13.1) (2025-03-01)

### Bug Fixes

* add sanitizer to Row Detail create dynamic component ([363065a](https://github.com/ghiscoding/angular-slickgrid/commit/363065ad66dc12da0d082e4ceb6cae99ddd1b99d))
* **deps:** update all non-major dependencies ([f276e6b](https://github.com/ghiscoding/angular-slickgrid/commit/f276e6b16adabc62559432891785a9d4da007b35))
* Row Detail preload comp should call destroy lifecycle ([fd0185e](https://github.com/ghiscoding/angular-slickgrid/commit/fd0185edd1e4abd6f5115fed38f79945dcd6569e))
* Row Detail with inner grids ([193b366](https://github.com/ghiscoding/angular-slickgrid/commit/193b3664f5fdfa84bb7c28314d5229e40223b550))

## [8.13.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.12.1...v8.13.0) (2025-02-08)

### Features

* expose displayEmptyDataWarning ([4b917af](https://github.com/ghiscoding/angular-slickgrid/commit/4b917af0fb371331119b5d93845cbbbf6079643c))

## [8.12.1](https://github.com/ghiscoding/angular-slickgrid/compare/v8.12.0...v8.12.1) (2025-01-25)

### Bug Fixes

* add `autoResize.autoHeight` to resize by dataset length ([26838d9](https://github.com/ghiscoding/angular-slickgrid/commit/26838d96191b46c2876887df3db164cf2c176a75))
* RowSpan should work with Excel Export and merge cells ([e41fe93](https://github.com/ghiscoding/angular-slickgrid/commit/e41fe932f6e43ed2e53183d57d3639a5219fa4c2))

## [8.12.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.11.0...v8.12.0) (2025-01-21)

### Features

* add `rowspan` implementation ([d583887](https://github.com/ghiscoding/angular-slickgrid/commit/d583887f9ed8601b3796098ea9dbba1295f93a20))

## [8.11.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.10.2...v8.11.0) (2024-12-14)

### Features

* allow using AngularSlickgrid component w/o grid options ([d4e60ac](https://github.com/ghiscoding/angular-slickgrid/commit/d4e60ac503d4d2c20e8a3b0cb4b5a5228f81add0))
* dynamically create grid from imported CSV data ([4a9c2eb](https://github.com/ghiscoding/angular-slickgrid/commit/4a9c2ebc5c61664a68a3b4ba26248c0f91d82774))

## [8.10.2](https://github.com/ghiscoding/angular-slickgrid/compare/v8.10.1...v8.10.2) (2024-11-30)

### Bug Fixes

* add missing peer dep on Angular ([eaf4cd7](https://github.com/ghiscoding/angular-slickgrid/commit/eaf4cd70fb2b8ddc44b54dccd34d12dbd3d829fe))
* DOMPurify now has built-in types & no longer require CJS bypass ([1ccb96f](https://github.com/ghiscoding/angular-slickgrid/commit/1ccb96f9ecdf00e98a04d6eb948ad3c49f5668f4))
* update Slickgrid-Universal to fix a few UI issues ([ba55081](https://github.com/ghiscoding/angular-slickgrid/commit/ba55081de3e094c1ee7377df0a7d40bb98b6a463))

## [8.10.1](https://github.com/ghiscoding/angular-slickgrid/compare/v8.10.0...v8.10.1) (2024-11-09)

### Bug Fixes

* few more Styling Theme fixes & Grid Service fixes ([20b2e70](https://github.com/ghiscoding/angular-slickgrid/commit/20b2e7044db4f35bbf5f43926a18d5e65f9dd021))

## [8.10.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.9.0...v8.10.0) (2024-11-02)

### Features

* switch to SASS `@use` and remove any `@import` to fix deprecations ([7669196](https://github.com/ghiscoding/angular-slickgrid/commit/7669196168174102bb75c91465ba232c9828a87c))

### Bug Fixes

* more styling fixes after switching to `@use` instead of `@imports` ([099f132](https://github.com/ghiscoding/angular-slickgrid/commit/099f13257587d1ecbee65d8408f36049314f9bef))

## [8.9.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.8.1...v8.9.0) (2024-10-19)


### Features

* allow providing a Custom Pagination Component ([b677009](https://github.com/ghiscoding/angular-slickgrid/commit/b6770090a80483cbe594ceeb37ba55a51a5c354a))


### Bug Fixes

* Row Detail redraw all Views when GridMenu/ColPicker columns changes ([039260c](https://github.com/ghiscoding/angular-slickgrid/commit/039260ca9f48900a24450a59b8679e9801769b0c))

## [8.8.1](https://github.com/ghiscoding/angular-slickgrid/compare/v8.7.0...v8.8.1) (2024-09-29)


### Features

* option to improve Date Sorting by pre-parsing date items only once ([60539e7](https://github.com/ghiscoding/angular-slickgrid/commit/60539e76b1c155abc4289a68cce93352daaead62))


### Bug Fixes

* redraw all open row details whenever the grid is re-rendered ([fbb5383](https://github.com/ghiscoding/angular-slickgrid/commit/fbb5383d9aeed71cba428f95fb7cdf2c1457f69d))

## [8.7.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.6.2...v8.7.0) (2024-09-14)

## [8.6.2](https://github.com/ghiscoding/angular-slickgrid/compare/v8.6.1...v8.6.2) (2024-09-14)


### Performance Improvements

* don't invalidate grid rows more than once ([c0d4fbe](https://github.com/ghiscoding/angular-slickgrid/commit/c0d4fbe999a788faf865c1d9a4467614d32474fe))
* upgrade Slickgrid-Universal with perf improvements ([5d60da1](https://github.com/ghiscoding/angular-slickgrid/commit/5d60da1fb603cd723af680fd19a0bb5f8e5c265a))

## [8.6.1](https://github.com/ghiscoding/angular-slickgrid/compare/v8.6.0...v8.6.1) (2024-08-31)


### Bug Fixes

* unflattening tree->flat array multiple times ([7740bd4](https://github.com/ghiscoding/angular-slickgrid/commit/7740bd4e74b9016507e909897f6c52745efdc2d5))

## [8.6.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.5.2...v8.6.0) (2024-08-24)


### Features

* migrate back to Vanilla-Calendar-Pro ([e51eb06](https://github.com/ghiscoding/angular-slickgrid/commit/e51eb067bc379ade555cab8a67e3c2d9f4a12652))
* new Drag to Recycle Bin demo ([93750d8](https://github.com/ghiscoding/angular-slickgrid/commit/93750d82afb485367332450e4767f63b3d951b36))


### Bug Fixes

* NG0406: This instance of the `ApplicationRef` has already been destroyed ([c73fac5](https://github.com/ghiscoding/angular-slickgrid/commit/c73fac59c6cd9901c75c714e1736c54d605e1caa))
* register RowDetail and dispose of it only once ([73485ba](https://github.com/ghiscoding/angular-slickgrid/commit/73485bab8a831de46602e822a655fe8e2807be8f))

## [8.5.2](https://github.com/ghiscoding/angular-slickgrid/compare/v8.5.1...v8.5.2) (2024-08-17)


### Bug Fixes

* use setTimeout/setInterval from window object with correct TS type ([1050774](https://github.com/ghiscoding/angular-slickgrid/commit/1050774198e180e66753ce6726ef5ff81a8cf00f))

## [8.5.1](https://github.com/ghiscoding/angular-slickgrid/compare/v8.5.0...v8.5.1) (2024-08-17)


### Bug Fixes

* Tree Data should work without initial sort ([5afdd5b](https://github.com/ghiscoding/angular-slickgrid/commit/5afdd5b65f8f05b7056d2634af25f11ef51d098a))

## [8.5.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.4.0...v8.5.0) (2024-08-07)


### Features

* Infinite Scroll for Backend Services (OData/GraphQL) ([13e2697](https://github.com/ghiscoding/angular-slickgrid/commit/13e26979ab2b7a189f20096895bd45fd0ca1e35c))
* Infinite Scroll for JSON data ([251a984](https://github.com/ghiscoding/angular-slickgrid/commit/251a984beb1384a49f8eaee7879d6c6fc07f5293))

## [8.4.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.3.2...v8.4.0) (2024-07-20)


### Features

* add `columnPickerLabel` for custom label, also fix [#1442](https://github.com/ghiscoding/angular-slickgrid/issues/1442) ([45b0f7f](https://github.com/ghiscoding/angular-slickgrid/commit/45b0f7f77db11fc5d137f59d4e4eaf7ce0c6ddf9))


### Bug Fixes

* `filterQueryOverride` provide all search values ([0eef5c0](https://github.com/ghiscoding/angular-slickgrid/commit/0eef5c0c405fd55947c58e68cdf398361a9f94c6))

## [8.3.2](https://github.com/ghiscoding/angular-slickgrid/compare/v8.3.1...v8.3.2) (2024-07-13)


### Bug Fixes

* SASS warnings & other unit test fixes ([227e538](https://github.com/ghiscoding/angular-slickgrid/commit/227e53806ae260930c12e89546394c0da48132f9))

## [8.3.1](https://github.com/ghiscoding/angular-slickgrid/compare/v8.3.0...v8.3.1) (2024-07-06)


### Bug Fixes

* Composite Editor should work with Cell Menu ([a28a62d](https://github.com/ghiscoding/angular-slickgrid/commit/a28a62d6f576f035df6b976d4e3f57b8761c7575))

## [8.3.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.2.0...v8.3.0) (2024-06-29)


### Features

* add onPreHeaderContextMenu for Column Picker usage ([c5be4a8](https://github.com/ghiscoding/angular-slickgrid/commit/c5be4a8f298c1badaca5b665cb76cef6b89583c9))


### Bug Fixes

* setting date picker should always work ([050deb8](https://github.com/ghiscoding/angular-slickgrid/commit/050deb8f4ff02ae37b740f085b6e766010b11977))

## [8.2.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.1.0...v8.2.0) (2024-06-18)


### Features

* add Footer Totals Row and fix footer styling ([17e798f](https://github.com/ghiscoding/angular-slickgrid/commit/17e798f55ea72968e404607738579eee09384d12))
* add new optional `filterShortcuts` to Column Filter ([b284785](https://github.com/ghiscoding/angular-slickgrid/commit/b28478509c33eb9fd5a31949540163c77921313e))
* paste multiline content as single cell ([7c9fdc0](https://github.com/ghiscoding/angular-slickgrid/commit/7c9fdc06451fe7a805a7699029af853b490baa0e))

## [8.1.0](https://github.com/ghiscoding/angular-slickgrid/compare/v8.0.0...v8.1.0) (2024-06-08)


### Features

* add `filterQueryOverride` to GraphQL Service ([7151d43](https://github.com/ghiscoding/angular-slickgrid/commit/7151d43cefe4c45b5b324411f27846ff2ca00ef2))
* add `filterQueryOverride` to OData Service ([2ccdaf0](https://github.com/ghiscoding/angular-slickgrid/commit/2ccdaf0ede68004c11b78b92c8c7a3d612ca8e9c))
* add local data StartsWith/EndsWith (`a*z`) filter combo ([69bc186](https://github.com/ghiscoding/angular-slickgrid/commit/69bc1869a980cbb5734cea99509120ae7e9eab8c))
* add optional Top-Header for Draggable Grouping & Header Grouping ([99c4cf2](https://github.com/ghiscoding/angular-slickgrid/commit/99c4cf2ed63c05dec7bcdff33907e4e75f120d7a))
* add StartsWith/EndsWith (`a*z`) to OData/GraphQL ([e2f5439](https://github.com/ghiscoding/angular-slickgrid/commit/e2f5439b2b947a06bb2a6f7e43a57875b8c87815))
* **export:** enhanced `valueParserCallback` with dataContext & new demo ([bd057e5](https://github.com/ghiscoding/angular-slickgrid/commit/bd057e5950957d044e3d2e34b695a5153f67f96b))
* **filters:** add a `filterPredicate` option for user customization ([2a7ebba](https://github.com/ghiscoding/angular-slickgrid/commit/2a7ebba4c9204390616b60ca57805ce06951c8b5))


### Bug Fixes

* **demo:** out of boundaries page Grid Preset should be unset ([7e4e3b8](https://github.com/ghiscoding/angular-slickgrid/commit/7e4e3b801c09129ee35e0fab69c0c7bb1f519a3e))
* **TreeData:** addItem should keep current sorted column ([7f1bbe0](https://github.com/ghiscoding/angular-slickgrid/commit/7f1bbe0c96116e64bc53ebd32f6df3a99e9cd16c))

## [8.0.0](https://github.com/ghiscoding/angular-slickgrid/compare/v7.7.0...v8.0.0) (2024-05-23)

> [!NOTE]
> #### Follow the [Migration 8.x Guide](https://github.com/ghiscoding/angular-slickgrid/wiki/Migration-to-8.x) 📖 for all the changes and take a look at the [v8.0.0](https://github.com/ghiscoding/Angular-Slickgrid/releases/tag/v8.0.0) release for the announcement and quick info.


### ⚠ BREAKING CHANGES

* upgrade to Angular 18
* make DOMPurify as optional
* migrate from Moment to Tempo
* remove Font-Awesome and use new SVG icons
* **common:** migrate from Flatpickr to Vanilla-Calendar

### Features

* **common:** migrate from Flatpickr to Vanilla-Calendar ([109f155](https://github.com/ghiscoding/angular-slickgrid/commit/109f155ec0a81a604a8ac157d6d4c2e7144df4ec))
* make DOMPurify as optional ([8bb566e](https://github.com/ghiscoding/angular-slickgrid/commit/8bb566eb901e4f44b98414444fc9e53e6f4462aa))
* migrate from Moment to Tempo ([a27b6e9](https://github.com/ghiscoding/angular-slickgrid/commit/a27b6e9cc3c600d33f88bbea523e171b03a41d67))
* remove Font-Awesome and use new SVG icons ([d73cc9c](https://github.com/ghiscoding/angular-slickgrid/commit/d73cc9c9b5b750f63cbad13f875defe45ca775bb))
* upgrade to Angular 18 ([97b27e4](https://github.com/ghiscoding/angular-slickgrid/commit/97b27e494dabef77c4f53a1ecf9f762e3a3badf0))


### Bug Fixes

* **deps:** update all non-major dependencies ([7f4e145](https://github.com/ghiscoding/angular-slickgrid/commit/7f4e1452196a16e75a4ecc5d5f39eb081740ba50))
* small styling issues & better primary color support w/Dark Mode ([01a16e2](https://github.com/ghiscoding/angular-slickgrid/commit/01a16e26d68e2b614d1eaad234fb90f4ecd34433))

# [7.7.0](https://github.com/ghiscoding/angular-slickgrid/compare/v7.6.1...v7.7.0) (2024-04-20)


### Features

* add global `defaultEditorOptions` & `defaultFilterOptions` ([4c6d1de](https://github.com/ghiscoding/angular-slickgrid/commit/4c6d1de6c80dd462511ceea726a52ac82256fdc0))

## [7.6.1](https://github.com/ghiscoding/angular-slickgrid/compare/v7.6.0...v7.6.1) (2024-04-01)


### Bug Fixes

* allow multiple tooltips per grid cell ([85cabd7](https://github.com/ghiscoding/angular-slickgrid/commit/85cabd70066b5421aaae621670e742c492be86a2))

# [7.6.0](https://github.com/ghiscoding/angular-slickgrid/compare/v7.5.0...v7.6.0) (2024-03-23)


### Bug Fixes

* Filter `model` is now `FilterConstructor` and shouldn't be newed ([6831c53](https://github.com/ghiscoding/angular-slickgrid/commit/6831c53b4fc4c9c7ec23358a088a0050e2c9b7a9))
* hide Toggle Dark Mode from Grid Menu by default ([6ccd6f3](https://github.com/ghiscoding/angular-slickgrid/commit/6ccd6f35f7eb0e27d76ddd0dcf598bf14ca9a55d))


### Features

* rename SG `editorClass` & deprecate `internalColumnEditor` ([e9664e0](https://github.com/ghiscoding/angular-slickgrid/commit/e9664e0525d2bcd7f7e7ce7c504597fd88c58528))

# [7.5.0](https://github.com/ghiscoding/angular-slickgrid/compare/v7.4.1...v7.5.0) (2024-03-05)


### Bug Fixes

* remove width style on grid container for CSP safe, fixes [#1368](https://github.com/ghiscoding/angular-slickgrid/issues/1368) ([81e5fe1](https://github.com/ghiscoding/angular-slickgrid/commit/81e5fe13eb6aee4a274832560c6eb8dccb08d197))
* switch to `isomorphic-dompurify` for SSR support ([5b2f29d](https://github.com/ghiscoding/angular-slickgrid/commit/5b2f29d1f5703dcf0670de2d8b4b1d261ec8a983)), closes [/github.com/ghiscoding/Angular-Slickgrid/discussions/838#discussioncomment-8574215](https://github.com//github.com/ghiscoding/Angular-Slickgrid/discussions/838/issues/discussioncomment-8574215)


### Features

* add Dark Mode grid option ([91c2726](https://github.com/ghiscoding/angular-slickgrid/commit/91c2726281571180e012c2a3a4419abab76d4bae))

## [7.4.1](https://github.com/ghiscoding/angular-slickgrid/compare/v7.4.0...v7.4.1) (2024-02-13)


### Bug Fixes

* **build:** add compilation mode to fix npm publish ([278531b](https://github.com/ghiscoding/angular-slickgrid/commit/278531b9a4a7dfc4b7f4c22c0f58dcb75aa72524))
* update to latest Slickgrid-Universal v4.4.1 ([0e35d1b](https://github.com/ghiscoding/angular-slickgrid/commit/0e35d1bddee39e8857bfb8ecfe29cf10f77f3414))

# [7.4.0](https://github.com/ghiscoding/angular-slickgrid/compare/v7.3.1...v7.4.0) (2024-02-13)


### Bug Fixes

* **build:** add compilation mode to fix npm publish ([3e4dc70](https://github.com/ghiscoding/angular-slickgrid/commit/3e4dc7084c4757930e51c7fe9909fb816fefafec))
* change namespace imports to ESM default imports. Fixes Angular esbuild error on DomPurify with rowDetailView and no pre/post template [#1362](https://github.com/ghiscoding/angular-slickgrid/issues/1362) ([fac2b37](https://github.com/ghiscoding/angular-slickgrid/commit/fac2b37a179f0f601ec36608c5bc2454a5073d34))
* **demo:** change trading demo full screen z-index lower than ms-select ([ae57fbe](https://github.com/ghiscoding/angular-slickgrid/commit/ae57fbeda1d07577f32df2716cb2c38ea346ca81))


### Features

* **ExcelExport:** migrate to Excel-Builder-Vanilla (ESM) ([823317b](https://github.com/ghiscoding/angular-slickgrid/commit/823317bf67d4b2bb05c9d986f893f36e95cc5c8b))

## [7.3.1](https://github.com/ghiscoding/angular-slickgrid/compare/v7.3.0...v7.3.1) (2024-01-27)


### Performance Improvements

* decrease number of calls to translate all extensions only once ([21a5016](https://github.com/ghiscoding/angular-slickgrid/commit/21a501608359466d5aaf76392b5e392f3e357123))

# [7.3.0](https://github.com/ghiscoding/angular-slickgrid/compare/v7.2.0...v7.3.0) (2024-01-21)


### Features

* **plugin:** new Row Based Editing ([1f768a5](https://github.com/ghiscoding/angular-slickgrid/commit/1f768a575d011fb5ba487988567e6b959a4bdfcd))


### Performance Improvements

* **resizer:** `autosizeColumns` is called too many times on page load ([591c0c7](https://github.com/ghiscoding/angular-slickgrid/commit/591c0c74572650b2f0f4c4bb68ed5338e2f63a7d))

# [7.2.0](https://github.com/ghiscoding/angular-slickgrid/compare/v7.1.0...v7.2.0) (2023-12-30)


### Bug Fixes

* sync row defatil grid option to fix build ([870cf47](https://github.com/ghiscoding/angular-slickgrid/commit/870cf47589cc095dd2e87b504fe537193c3b9588))


### Features

* (re)add option to cancel Row Detail opening ([03c2c64](https://github.com/ghiscoding/angular-slickgrid/commit/03c2c6498cf1ac62f21c2db62a215b3c63deed1e))

# [7.1.0](https://github.com/ghiscoding/angular-slickgrid/compare/v7.0.3...v7.1.0) (2023-12-21)


### Features

* add example for custom header and footer ([2d816da](https://github.com/ghiscoding/angular-slickgrid/commit/2d816daa03a48aea87c0fbf30c02ad8882904145))
* reimplement highlight row, node-extend also fixes [#1332](https://github.com/ghiscoding/angular-slickgrid/issues/1332), [#1333](https://github.com/ghiscoding/angular-slickgrid/issues/1333) ([5809965](https://github.com/ghiscoding/angular-slickgrid/commit/5809965dab53035d7ad4e5067281e7d951b2e415)), closes [#1334](https://github.com/ghiscoding/angular-slickgrid/issues/1334)
* render header and footer content children ([9203b0b](https://github.com/ghiscoding/angular-slickgrid/commit/9203b0bec1474f88a874cb1ae4438e092a0adc6a))

## [7.0.3](https://github.com/ghiscoding/angular-slickgrid/compare/v7.0.2...v7.0.3) (2023-12-16)


### Bug Fixes

* **deps:** update all Slickgrid-Universal dependencies ([fdc5fa8](https://github.com/ghiscoding/angular-slickgrid/commit/fdc5fa894e5c301be756d06a42cf4a1c4274d01e))

## [7.0.2](https://github.com/ghiscoding/angular-slickgrid/compare/v7.0.1...v7.0.2) (2023-12-16)


### Bug Fixes

* read external resource when required ([6e9af2a](https://github.com/ghiscoding/angular-slickgrid/commit/6e9af2aa3424bb3d01a4cda6d7926d3f8dfcf820)), closes [#1320](https://github.com/ghiscoding/angular-slickgrid/issues/1320)

## [7.0.1](https://github.com/ghiscoding/angular-slickgrid/compare/v7.0.0...v7.0.1) (2023-12-15)


### Bug Fixes

* regression externalResouces should work globally, fix [#1329](https://github.com/ghiscoding/angular-slickgrid/issues/1329) ([72fb260](https://github.com/ghiscoding/angular-slickgrid/commit/72fb260bcc88e0adf2ae41c6053ef6a34454fcc3)), closes [#1320](https://github.com/ghiscoding/angular-slickgrid/issues/1320)

# [7.0.0](https://github.com/ghiscoding/angular-slickgrid/compare/v6.6.5...v7.0.0) (2023-12-15)
### Follow the [Migration 7.x Guide](https://ghiscoding.gitbook.io/angular-slickgrid/migrations/migration-to-7.x)

### ⚠ BREAKING CHANGES
* migrate to Slickgrid-Universal v4.0 new major version PR (#1325) ([65aac1c](https://github.com/ghiscoding/Angular-Slickgrid/commit/65aac1c3e71ffc890dbdc97fcbbaa352fc527a32))
* upgrade to Angular 17 (#1328) ([b72a828](https://github.com/ghiscoding/Angular-Slickgrid/pull/1328))


## [6.6.5](https://github.com/ghiscoding/angular-slickgrid/compare/v6.6.4...v6.6.5) (2023-12-12)


### Bug Fixes

* `devMode` should be `false` or an object & use `!important` on text CSS utils ([271ab1b](https://github.com/ghiscoding/angular-slickgrid/commit/271ab1b431275712218c2d6bf9f5cd5deb5a6ff7))

## [6.6.4](https://github.com/ghiscoding/angular-slickgrid/compare/v6.6.3...v6.6.4) (2023-12-08)


### Features

* introduce devMode to support nodejs based unit testing ([fe76745](https://github.com/ghiscoding/angular-slickgrid/commit/fe76745803ecee6420f8d391a07eca443adee46b))

## [6.6.3](https://github.com/ghiscoding/angular-slickgrid/compare/v6.6.2...v6.6.3) (2023-12-08)


### Bug Fixes

* registered external resouces should keep singleton ref ([2724c97](https://github.com/ghiscoding/angular-slickgrid/commit/2724c9741cbac30164976632b422de68bf21dcdf))

## [6.6.2](https://github.com/ghiscoding/angular-slickgrid/compare/v6.6.1...v6.6.2) (2023-11-26)

## [6.6.1](https://github.com/ghiscoding/angular-slickgrid/compare/v6.6.0...v6.6.1) (2023-11-26)


### Bug Fixes

* add npm publish with provenance support ([30f959c](https://github.com/ghiscoding/angular-slickgrid/commit/30f959c8b42a43a22d8b7b5b3baae11225030801))

# Change Log
All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [6.6.0](https://github.com/ghiscoding/angular-slickgrid/compare/v6.5.1...v6.6.0) (2023-11-26)


### Features

* **GraphQL:** .excludeFieldFromQuery, exclude field but keep fields ([61482dc](https://github.com/ghiscoding/angular-slickgrid/commit/61482dcf1ce59f2d4859526799ff06f495059638))

## [6.5.1](https://github.com/ghiscoding/angular-slickgrid/compare/v6.5.0...v6.5.1) (2023-11-13)


### Bug Fixes

* add ms-select-vanilla missing type & improve pkg exports ([eab7e7e](https://github.com/ghiscoding/angular-slickgrid/commit/eab7e7e1738b0b7f90edab17b88e9ab4b50196ce)), closes [#1313](https://github.com/ghiscoding/angular-slickgrid/issues/1313)

# [6.5.0](https://github.com/ghiscoding/angular-slickgrid/compare/v6.4.0...v6.5.0) (2023-11-11)


### Bug Fixes

* SlickCellRangeSelector stopped event bubbling in editor, fix [#1303](https://github.com/ghiscoding/angular-slickgrid/issues/1303) ([e6581db](https://github.com/ghiscoding/angular-slickgrid/commit/e6581dbfdb004812c4a043889569e1ce33b5c1a5))

# [6.4.0](https://github.com/ghiscoding/angular-slickgrid/compare/v6.3.1...v6.4.0) (2023-11-02)


### Features

* add new api for creating interactive angular component formatters ([71d2132](https://github.com/ghiscoding/angular-slickgrid/commit/71d21320d9ca930f92d8d94df1aaefad99250beb))
* add sub-menus to all Menu extensions/plugins ([b779ef1](https://github.com/ghiscoding/angular-slickgrid/commit/b779ef14186481ebbd3ff32c1167729989feb3cf))
* update GraphQL demo with cursor pagination ([2ba991c](https://github.com/ghiscoding/angular-slickgrid/commit/2ba991c2587494e4046f01a9efc7b41d41dc7cc5))
* update sample with an interactive title column ([8b96324](https://github.com/ghiscoding/angular-slickgrid/commit/8b963247ddaa1dae73bde8d46c71347fb9a5c214))

## [6.3.1](https://github.com/ghiscoding/angular-slickgrid/compare/v6.3.0...v6.3.1) (2023-10-06)


### Bug Fixes

* **graphql:** column with complex object could throw null pointer exception ([15d2246](https://github.com/ghiscoding/angular-slickgrid/commit/15d2246b0260716bbba4087f7e625e51f276149c))

# [6.3.0](https://github.com/ghiscoding/angular-slickgrid/compare/v6.2.2...v6.3.0) (2023-10-05)


### Bug Fixes

* avoid setTimeout after creating dynamic component, fixes [#1273](https://github.com/ghiscoding/angular-slickgrid/issues/1273) ([9436b68](https://github.com/ghiscoding/angular-slickgrid/commit/9436b682ccea391df8466585642a3250c219174d))
* remove component after copying innerHTML ([c4ba24a](https://github.com/ghiscoding/angular-slickgrid/commit/c4ba24a361869339bc03343402f698b65f6abd62))


### Features

* add pageUp/pageDown/home/end to SlickCellSelection ([7d08128](https://github.com/ghiscoding/angular-slickgrid/commit/7d081289d064fb7fc65a60ec9956834a4be4e335))

## [6.2.2](https://github.com/ghiscoding/angular-slickgrid/compare/v6.2.1...v6.2.2) (2023-09-24)


### Bug Fixes

* bump Slickgrid-Universal w/auto-resize w/o container, fixes [#1266](https://github.com/ghiscoding/angular-slickgrid/issues/1266) ([c8a9317](https://github.com/ghiscoding/angular-slickgrid/commit/c8a931717254cda1b30222427311a838856bb066))

## [6.2.1](https://github.com/ghiscoding/angular-slickgrid/compare/v6.2.0...v6.2.1) (2023-09-05)


### Bug Fixes

* **common:** Select Filter/Editor enableRenderHtml incorrect, fix [#1240](https://github.com/ghiscoding/angular-slickgrid/issues/1240) ([0b8b52b](https://github.com/ghiscoding/angular-slickgrid/commit/0b8b52b98d7ad8024cd5b6f122600815a3228c82))

# [6.2.0](https://github.com/ghiscoding/angular-slickgrid/compare/v6.1.0...v6.2.0) (2023-08-21)


### Bug Fixes

* adding dataset hierarchical item shouldn't cause scroll flickering ([4c5864f](https://github.com/ghiscoding/angular-slickgrid/commit/4c5864f376e9e645c10668e7f12dfe5ad44332bf))


### Features

* **TreeData:** add optional Aggregators for Tree Data totals calc ([236add4](https://github.com/ghiscoding/angular-slickgrid/commit/236add4ea8aa6ad744c07221272e2542f0b220a3))



# [6.1.0](https://github.com/ghiscoding/angular-slickgrid/compare/v6.0.1...v6.1.0) (2023-07-21)


### Features

* **common:** add `scrollIntoView` to GridService `addItems`, fix [#1201](https://github.com/ghiscoding/angular-slickgrid/issues/1201) ([f93f5bf](https://github.com/ghiscoding/angular-slickgrid/commit/f93f5bf29a7d6f3804e12c58a06e70b01f4cf99f))

## [6.0.1](https://github.com/ghiscoding/angular-slickgrid/compare/v6.0.0...v6.0.1) (2023-07-01)


### Bug Fixes

* **grouping:** DraggableGrouping could throw when leaving page ([6ff7f98](https://github.com/ghiscoding/angular-slickgrid/commit/6ff7f98f22fc019dd395d1538d75bcdbfccf1706))
* using esbuild requires to specify type imports ([e694a6b](https://github.com/ghiscoding/angular-slickgrid/commit/e694a6b3b0334f60641646b32af247468d31d53c))

# Change Log
All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [6.0.0](https://github.com/ghiscoding/angular-slickgrid/compare/v5.6.4...v6.0.0) (2023-05-29)

### Follow the [Migration 6.x Guide](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Migration-to-6.x)

### ⚠ BREAKING CHANGES

* drop jQuery requirement & use ms-select-vanilla dependency (#1150)

## [5.6.4](https://github.com/ghiscoding/angular-slickgrid/compare/v5.6.3...v5.6.4) (2023-05-20)


### Bug Fixes

* **export:** fix negative number exports to Excel, fixes [#1135](https://github.com/ghiscoding/angular-slickgrid/issues/1135) ([f52dc8a](https://github.com/ghiscoding/angular-slickgrid/commit/f52dc8aea6c8f26a6a0a9072521c609223b3a033))

## [5.6.3](https://github.com/ghiscoding/angular-slickgrid/compare/v5.6.1...v5.6.3) (2023-03-23)


### Bug Fixes

* **deps:** update all non-major dependencies to ~2.6.3 ([90a2ce2](https://github.com/ghiscoding/angular-slickgrid/commit/90a2ce20851ab7e1d2519bd6fa84c3fa3ce1e087))
* **presets:** dynamic columns should be auto-inserted with Grid Presets ([8091790](https://github.com/ghiscoding/angular-slickgrid/commit/80917904c3a30d8aee42b4b2ea0a8c6e4ccb32e0)), closes [#1092](https://github.com/ghiscoding/angular-slickgrid/issues/1092)

## [5.6.1](https://github.com/ghiscoding/angular-slickgrid/compare/v5.6.0...v5.6.1) (2023-03-03)


### Bug Fixes

* draggable grouping shouldn't throw error when dynamically changing columns ([b0791ec](https://github.com/ghiscoding/angular-slickgrid/commit/b0791ec35f2fde9b33c9500e5b154571e3229d72))

# [5.6.0](https://github.com/ghiscoding/angular-slickgrid/compare/v5.5.1...v5.6.0) (2023-02-24)


### Bug Fixes

* Edit cell mouseout should save & excel copy should work, fix [#1103](https://github.com/ghiscoding/angular-slickgrid/issues/1103) ([295c81c](https://github.com/ghiscoding/angular-slickgrid/commit/295c81c8ffdaa90439096e4b770659117e766395))

## [5.5.1](https://github.com/ghiscoding/angular-slickgrid/compare/v5.5.0...v5.5.1) (2023-02-17)

# [5.5.0](https://github.com/ghiscoding/angular-slickgrid/compare/v5.4.1...v5.5.0) (2023-02-17)


### Bug Fixes

* **RowDetail:** Row Detail extension should work with editable grid ([85cde68](https://github.com/ghiscoding/angular-slickgrid/commit/85cde68ddf7e78e24da8eda19154e3b5d9396a70))

## [5.4.1](https://github.com/ghiscoding/angular-slickgrid/compare/v5.4.0...v5.4.1) (2023-02-04)

# [5.4.0](https://github.com/ghiscoding/angular-slickgrid/compare/v5.3.0...v5.4.0) (2023-02-04)


### Features

* **dataView:** add option to apply row selection to all pages ([e6335be](https://github.com/ghiscoding/angular-slickgrid/commit/e6335be01875e2e1223039f2daa11cea23643843))

# [5.3.0](https://github.com/ghiscoding/angular-slickgrid/compare/v5.2.2...v5.3.0) (2023-01-21)


### Bug Fixes

* **rxjs:** make unsubscribe more generic to avoid RxJS update issue ([14484ba](https://github.com/ghiscoding/angular-slickgrid/commit/14484bacd48acad7d3f9c3c236cdd2ff3e633c88))

## [5.2.2](https://github.com/ghiscoding/angular-slickgrid/compare/v5.2.1...v5.2.2) (2022-12-24)


### Bug Fixes

* **common:** cell selection in Firefox not working ([45c5791](https://github.com/ghiscoding/angular-slickgrid/commit/45c5791c9b8fefdf1ae1b14d70b1f398500c8adf))

## [5.2.1](https://github.com/ghiscoding/angular-slickgrid/compare/v5.2.0...v5.2.1) (2022-12-22)


### Bug Fixes

* **styling:** make Grid Menu item full width instead of max-content ([b79a6ae](https://github.com/ghiscoding/angular-slickgrid/commit/b79a6ae51ec2346bcd21d4e9e35317116a57b84d))

# [5.2.0](https://github.com/ghiscoding/angular-slickgrid/compare/v5.1.3...v5.2.0) (2022-12-22)


### Features

* **exports:** add auto-detect and Excel custom cell (column) styling ([5413e94](https://github.com/ghiscoding/angular-slickgrid/commit/5413e94734986b6482f64e52e2b2ae2228db9fe9))

# Change Log
All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.3](https://github.com/ghiscoding/angular-slickgrid/compare/v5.1.2...v5.1.3) (2022-12-08)


### Bug Fixes

* **pinning:** cols reorder & freezing shouldn't affect order ([a81f92a](https://github.com/ghiscoding/angular-slickgrid/commit/a81f92a8392c514b35f5b460205070c838c2aec4))
* **sorting:** update Slickgrid-Universal, fixes date sort shuffling ([4f70ada](https://github.com/ghiscoding/angular-slickgrid/commit/4f70adaa5e0c19715b369acd3e815d68b7b44631))

## [5.1.2](https://github.com/ghiscoding/angular-slickgrid/compare/v5.1.1...v5.1.2) (2022-12-02)


### Bug Fixes

* **addons:** onGroupChanged callback should be executed with Draggable ([ff08f4b](https://github.com/ghiscoding/angular-slickgrid/commit/ff08f4b7b6fcd5ecf0b2345d13f5fb4e4049c2dd))
* **core:** grid service `resetGrid` method wasn't always resetting ([a5bf5f1](https://github.com/ghiscoding/angular-slickgrid/commit/a5bf5f14d9e9c6131f92bbc2caf2e9068dc7f5af))

## [5.1.1](https://github.com/ghiscoding/angular-slickgrid/compare/v5.1.0...v5.1.1) (2022-11-19)

# Change Log
All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.1.0](https://github.com/ghiscoding/angular-slickgrid/compare/v5.0.2...v5.1.0) (2022-11-17)


### Bug Fixes

* **deps:** update dependency dompurify to ^2.4.1 ([84ecc9d](https://github.com/ghiscoding/angular-slickgrid/commit/84ecc9d80ef26b7bf4b4d9acd2e96f7b5567d154))


### Features

* **common:** add "targetSelector" to onFilterChanged & Grid State ([cd9bec4](https://github.com/ghiscoding/angular-slickgrid/commit/cd9bec49e985e38e7d810dd88d0f148065f0d716))
* **core:** expose EventPubSub Service on AngularGridInstance ([a1c5ad5](https://github.com/ghiscoding/angular-slickgrid/commit/a1c5ad534118d27ac6eaf61cfb0cc551fd899bed))
* **filters:** add back Slider Range filter in pure JS ([271da15](https://github.com/ghiscoding/angular-slickgrid/commit/271da15066f3a6b5ded8fd04278366202f5c2910))
* **plugins:** sync column definitions to user after plugin adds column ([2359171](https://github.com/ghiscoding/angular-slickgrid/commit/235917157ad1b8ffe6e5b075762f55edb56507fa)), closes [#1018](https://github.com/ghiscoding/angular-slickgrid/issues/1018)

## [5.0.2](https://github.com/ghiscoding/angular-slickgrid/compare/v5.0.1...v5.0.2) (2022-10-18)


### Bug Fixes

* load SortableJS via `angular.json` instead of component ([69f14de](https://github.com/ghiscoding/angular-slickgrid/commit/69f14deab289f4c8cf6be9343f7bc590425ef8b5))

## [5.0.1](https://github.com/ghiscoding/angular-slickgrid/compare/v5.0.0...v5.0.1) (2022-10-18)


# [5.0.0](https://github.com/ghiscoding/angular-slickgrid/compare/v5.0.0-alpha.0...v5.0.0) (2022-10-17)


# [5.0.0-alpha.0](https://github.com/ghiscoding/angular-slickgrid/compare/v4.3.1...v5.0.0-alpha.0) (2022-10-15)


### [4.3.1](https://github.com/ghiscoding/angular-slickgrid/compare/v4.3.0...v4.3.1) (2022-09-12)


### Bug Fixes

* **deps:** downgrade to Angular 13 to avoid breaking changes, fixes [#994](https://github.com/ghiscoding/angular-slickgrid/issues/994) ([a64e914](https://github.com/ghiscoding/angular-slickgrid/commit/a64e914dece6d54174dfca08cc32fc2252f23fd4))
* **deps:** downgrade to Angular 13 to avoid breaking changes, fixes [#994](https://github.com/ghiscoding/angular-slickgrid/issues/994) ([c0a3816](https://github.com/ghiscoding/angular-slickgrid/commit/c0a381654e969f5fc912fe9c13173ce378d25cd0))

## [4.3.0](https://github.com/ghiscoding/angular-slickgrid/compare/v4.2.7...v4.3.0) (2022-08-15)


### ⚠ BREAKING CHANGES

* **deps:** switch from `jquery-ui-dist` to the official `jquery-ui`

### Bug Fixes

* **collectionAsync:** hidden column does not load edit field selection ([0b2db3d](https://github.com/ghiscoding/angular-slickgrid/commit/0b2db3d3d54e980806659da5441110a83e0ac49c))
* **deps:** switch from `jquery-ui-dist` to the official `jquery-ui` ([29f3ba6](https://github.com/ghiscoding/angular-slickgrid/commit/29f3ba64924bdd9e25aecf0b3b11a9984eb055b7))

### [4.2.7](https://github.com/ghiscoding/angular-slickgrid/compare/v4.2.6...v4.2.7) (2022-08-02)


### Bug Fixes

* **version:** update to latest Slickgrid-Universal versions ([c37f4b6](https://github.com/ghiscoding/angular-slickgrid/commit/c37f4b6422ea1863597d261260d1cf99bd7a0778))

### [4.2.6](https://github.com/ghiscoding/angular-slickgrid/compare/v4.2.5...v4.2.6) (2022-07-28)


### Bug Fixes

* **deps:** loosen up RxJS min version to avoid interface out of sync ([a29b4e5](https://github.com/ghiscoding/angular-slickgrid/commit/a29b4e59a8f739ba164a3dd2c5f7813ef23bc3f5))

### [4.2.5](https://github.com/ghiscoding/angular-slickgrid/compare/v4.2.4...v4.2.5) (2022-07-28)


### Bug Fixes

* **build:** use patch version when releasing from slickgrid-universal ([4c58560](https://github.com/ghiscoding/angular-slickgrid/commit/4c58560f66fad1972c327d073a91aed823754d55))

### [4.2.4](https://github.com/ghiscoding/angular-slickgrid/compare/v4.2.3...v4.2.4) (2022-07-07)


### Bug Fixes

* **build:** version of Slickgrid-Universal are out of sync, fixes [#956](https://github.com/ghiscoding/angular-slickgrid/issues/956) ([b4e0a76](https://github.com/ghiscoding/angular-slickgrid/commit/b4e0a762768dcaddd8d54f2e599104b1fda98d88))
* **deps:** update all non-major dependencies to v1.3.3 ([3e81ef2](https://github.com/ghiscoding/angular-slickgrid/commit/3e81ef2644e2f057754f254732eb6d3413cf1ba3))

### [4.2.3](https://github.com/ghiscoding/angular-slickgrid/compare/v4.2.2...v4.2.3) (2022-07-06)


### Bug Fixes

* **composite:** selected row count always 0 on mass-selected, fix [#951](https://github.com/ghiscoding/angular-slickgrid/issues/951) ([757155f](https://github.com/ghiscoding/angular-slickgrid/commit/757155f839a023bfb83b05d25d6ce1b9d3a23ce6))

### [4.2.2](https://github.com/ghiscoding/angular-slickgrid/compare/v4.2.1...v4.2.2) (2022-07-05)


### Bug Fixes

* **plugin:** Row Detail column sorting was offset, fixes [#949](https://github.com/ghiscoding/angular-slickgrid/issues/949) ([09cc298](https://github.com/ghiscoding/angular-slickgrid/commit/09cc298abc15adaa58c500ac9f7052156dc97c27))

### [4.2.1](https://github.com/ghiscoding/angular-slickgrid/compare/v4.2.0...v4.2.1) (2022-06-18)

## [4.2.0](https://github.com/ghiscoding/angular-slickgrid/compare/v4.1.4...v4.2.0) (2022-06-18)


### Features

* **core:** upgrade to jQuery 3.6 and jQuery-UI 1.13 ([7e7f24c](https://github.com/ghiscoding/angular-slickgrid/commit/7e7f24c8fdd62b2aff1fd28449b122cc629bc52f))


### Bug Fixes

* **core:** throw error when `[gridOptions]` missing, fixes [#910](https://github.com/ghiscoding/angular-slickgrid/issues/910) ([974be12](https://github.com/ghiscoding/angular-slickgrid/commit/974be124bbb3210d71b86cb6d93a35e8e2e60405))

### [4.1.4](https://github.com/ghiscoding/angular-slickgrid/compare/v4.1.3...v4.1.4) (2022-04-28)


### Bug Fixes

* **rxjs:** use same RxJS version as Slickgrid-Universal ([9f68103](https://github.com/ghiscoding/angular-slickgrid/commit/9f681031614c976758c8bd148e7ed5ff1b17bd14))

### [4.1.3](https://github.com/ghiscoding/angular-slickgrid/compare/v4.1.2...v4.1.3) (2022-04-28)

### [4.1.2](https://github.com/ghiscoding/angular-slickgrid/compare/v4.1.1...v4.1.2) (2022-02-15)


### Bug Fixes

* **core:** pagination set in global config should work, fixes [#879](https://github.com/ghiscoding/angular-slickgrid/issues/879) ([7237a23](https://github.com/ghiscoding/angular-slickgrid/commit/7237a238d0eef14abc57afb42114b1eea9dcfe66))

### [4.1.1](https://github.com/ghiscoding/angular-slickgrid/compare/v4.1.0...v4.1.1) (2022-01-19)


### Bug Fixes

* **demo:** small leak fix when leaving the page ([b488757](https://github.com/ghiscoding/angular-slickgrid/commit/b488757d9f7c897c12722771b485cb47a5d70f3f))
* **graphql:** fix range filtering with ".." ([cfcd16e](https://github.com/ghiscoding/angular-slickgrid/commit/cfcd16eed644457cdfccf7d69c9c08dee9afae2a))
* **odata:** fix range filtering with ".." ([817ca59](https://github.com/ghiscoding/angular-slickgrid/commit/817ca59dad49620d7a392b79668269a61e636f88))

## [4.1.0](https://github.com/ghiscoding/angular-slickgrid/compare/v4.0.0...v4.1.0) (2022-01-06)


### Features

* **demo:** add new Example 33 to demo Realtime Trading ([75987b4](https://github.com/ghiscoding/angular-slickgrid/commit/75987b4c7eea85a8e233930053e6507170fa157b))
* **OData:** add `$select` and `$expand` query options ([b445a79](https://github.com/ghiscoding/angular-slickgrid/commit/b445a79b72e4a707070b3871677d3caa76d6a3e2))


### Bug Fixes

* **build:** should use `EventSubscription` to be unsubscribed ([ee81db3](https://github.com/ghiscoding/angular-slickgrid/commit/ee81db3c13e562948171d80c60453c11a905b350))

## [4.0.0](https://github.com/ghiscoding/angular-slickgrid/compare/v3.3.2...v4.0.0) (2021-12-11)


### ⚠ BREAKING CHANGES

* upgrade to Slickgrid-Universal official 1.x major version
* upgrade Angular 13 using Ivy build without UMD bundles

### Features

* **plugins:** use new internal slickgrid-universal plugins ([9ef4651](https://github.com/ghiscoding/angular-slickgrid/commit/9ef46511eab80ab923ff983b02830da0a5f287c1))


### Bug Fixes

* **styling:** better support of auto width on drop menu ([44a979d](https://github.com/ghiscoding/angular-slickgrid/commit/44a979df8e44bfeddb5b709991507998bb121207))


* Merge pull request #864 from ghiscoding/feat/slickgrid-universal-plugins ([ee3bf0e](https://github.com/ghiscoding/angular-slickgrid/commit/ee3bf0ec311ece5836234087668db6b6a9fe0dc7)), closes [#864](https://github.com/ghiscoding/angular-slickgrid/issues/864)
* Merge pull request #857 from ghiscoding/feat/angular13 ([9774b80](https://github.com/ghiscoding/angular-slickgrid/commit/9774b80a7b37940cad5b40a4f060415b0967750b)), closes [#857](https://github.com/ghiscoding/angular-slickgrid/issues/857)

### [3.3.2](https://github.com/ghiscoding/angular-slickgrid/compare/v3.3.1...v3.3.2) (2021-11-20)


### Bug Fixes

* **build:** add DOM purify optional default import to fix rollup builds ([25091d0](https://github.com/ghiscoding/angular-slickgrid/commit/25091d03af771c9e8e5e94fbdccd6228247710c1))

### [3.3.1](https://github.com/ghiscoding/angular-slickgrid/compare/v3.3.0...v3.3.1) (2021-11-16)

## [3.3.0](https://github.com/ghiscoding/angular-slickgrid/compare/v3.2.0...v3.3.0) (2021-10-28)


### Features

* **plugin:** add example for new Custom Tooltip plugin ([44dd1cd](https://github.com/ghiscoding/angular-slickgrid/commit/44dd1cdccf82d9ff1c4ffd164ba2120fdbca01be))
* **plugin:** add row move shadow item while moving/dragging row ([9cf714f](https://github.com/ghiscoding/angular-slickgrid/commit/9cf714f99ec25ac880da8b9662a16e0de55e619c))

## [3.2.0](https://github.com/ghiscoding/angular-slickgrid/compare/v3.1.0...v3.2.0) (2021-09-29)


### Features

* **core:** use Slickgrid-Universal Pagination reusable component ([9c47112](https://github.com/ghiscoding/angular-slickgrid/commit/9c471125a6111d41582bcc7e514ac28d2a82704f))
* **tree:** demo new `excludeChildrenWhenFilteringTree` flag ([7aa3d84](https://github.com/ghiscoding/angular-slickgrid/commit/7aa3d848355dbb69e118dbd5854c12d51e2a1916))
* **resizer:** remove redundant bindAutoResizeDataGrid call ([#839](https://github.com/ghiscoding/angular-slickgrid/issues/839)) ([cee71c8](https://github.com/ghiscoding/Angular-Slickgrid/commit/cee71c884a6325222bd856c07171e82a005c4b25))

## [3.1.0](https://github.com/ghiscoding/angular-slickgrid/compare/v3.0.5...v3.1.0) (2021-09-09)


### Features

* **backend:** rollback on error & add cancellable events ([d3f31d7](https://github.com/ghiscoding/angular-slickgrid/commit/d3f31d773322e51b667164826ddde1dbd62de4e3))
* **tree:** add `dynamicallyToggledItemState` method to toggle parent(s) ([afb61cf](https://github.com/ghiscoding/angular-slickgrid/commit/afb61cf9caee78f6620550c1e6f00a841c9a1d83))


### Bug Fixes

* **composite:** calling Edit change shouldn't affect Mass-Update ([b25d56d](https://github.com/ghiscoding/angular-slickgrid/commit/b25d56d4a52785de186f03d2d8db481b07af7925))
* custom pagination should work & also fix Cypress test ([2d8bf08](https://github.com/ghiscoding/angular-slickgrid/commit/2d8bf081df693a0daced0a3138399fb72725be66))
* **footer): usefix(footer:** use `getFilteredItemCount` to show correct item count ([fbee1a1](https://github.com/ghiscoding/angular-slickgrid/commit/fbee1a12f321f0020c8f68cfddd934de5bf7b5ca)), closes [#469](https://github.com/ghiscoding/angular-slickgrid/issues/469) [#469](https://github.com/ghiscoding/angular-slickgrid/issues/469) [#469](https://github.com/ghiscoding/angular-slickgrid/issues/469)
* **grid:** invalidate grid after setItems to re-render grid ([4feebc8](https://github.com/ghiscoding/angular-slickgrid/commit/4feebc877acaa2e2781bd09e8694db4f52a3123e)), closes [#820](https://github.com/ghiscoding/angular-slickgrid/issues/820)
* **grouping:** Draggable Grouping should clear preheader when called ([8621c67](https://github.com/ghiscoding/angular-slickgrid/commit/8621c678a80bcdb4c45522788ad9b6f32b6f115b))

### [3.0.5](https://github.com/ghiscoding/angular-slickgrid/compare/v3.0.4...v3.0.5) (2021-07-23)

### [3.0.4](https://github.com/ghiscoding/angular-slickgrid/compare/v3.0.3...v3.0.4) (2021-07-20)

### [3.0.1](https://github.com/ghiscoding/angular-slickgrid/compare/v3.0.0...v3.0.1) (2021-07-20)


### Bug Fixes

* **build:** revert to previous ng-packgr build config ([34890ca](https://github.com/ghiscoding/angular-slickgrid/commit/34890cadea255dd9ed033e0e6714b695f8193d02))

## [3.0.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.30.2...v3.0.0) (2021-07-20)


### ⚠ BREAKING CHANGES

* use Slickgrid-Universal monorepo next major 3.0

### Features

* add Composite Editor Modal example ([3e2a4a2](https://github.com/ghiscoding/angular-slickgrid/commit/3e2a4a2ab2ff9915929e506412a5270ff77d1389))
* **core:** use Slickgrid-Universal Aggregators ([86a4e32](https://github.com/ghiscoding/angular-slickgrid/commit/86a4e32a357a20361897b72553fd7b254ff19eeb))
* **core:** use Slickgrid-Universal Editors ([a57edf8](https://github.com/ghiscoding/angular-slickgrid/commit/a57edf8252703a5e4a962216326ec0751d50f0df))
* **core:** use Slickgrid-Universal Formatters and Grouping Formatters ([8648a88](https://github.com/ghiscoding/angular-slickgrid/commit/8648a88fb5b6354e63640476f6d8799ffabc2e19))
* **footer:** reuse Footer Component from Slickgrid-Universal ([3932032](https://github.com/ghiscoding/angular-slickgrid/commit/393203249c0820fe21eb774b751fb570fdd6da9e))


### Bug Fixes

* **tree:** same dataset length but w/different prop should refresh Tree ([1798a48](https://github.com/ghiscoding/angular-slickgrid/commit/1798a487413130becf3b6a87feaa7fac4ceef1ea))


* Merge pull request #803 from ghiscoding/feat/version-next-universal ([dae384c](https://github.com/ghiscoding/angular-slickgrid/commit/dae384c5d0b9fda5a71ffc4c9b70ee073355563d)), closes [#803](https://github.com/ghiscoding/angular-slickgrid/issues/803)

### [2.30.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.30.1...v2.30.2) (2021-06-30)


### Bug Fixes

* **editors:** date editor close button not showing ([61bc6ca](https://github.com/ghiscoding/angular-slickgrid/commit/61bc6ca1a9d71f3fe50811ee9234ddd4968e19ea))

### [2.30.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.30.0...v2.30.1) (2021-06-29)

## [2.30.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.29.1...v2.30.0) (2021-06-29)


### Features

* **deps:** migrate from TSLint to ESLint ([a60432b](https://github.com/ghiscoding/angular-slickgrid/commit/a60432bc3754cfe909d8fe38e23b1dbac7ab5414))
* **editors:** convert jQuery to native element for few Editors ([f1a8c60](https://github.com/ghiscoding/angular-slickgrid/commit/f1a8c60a0ad3d1c188801cc215705c0e2771e4d9))
* **editors:** convert jQuery to native element on longText Editor ([cd3bf5e](https://github.com/ghiscoding/angular-slickgrid/commit/cd3bf5eebf167bb54edec10f0ec8f202b69568a7))
* **editors:** convert jQuery to native element on slider editor ([871f86b](https://github.com/ghiscoding/angular-slickgrid/commit/871f86bbd708c6a96aaadc0b6e911af8e9f36e58))
* **editors:** replace jQuery with native element on date editor ([149c05f](https://github.com/ghiscoding/angular-slickgrid/commit/149c05f9772181f12ba1da2e2061aefcc2af061c))
* **editors:** use class inheritance to extend main input editor ([9478692](https://github.com/ghiscoding/angular-slickgrid/commit/947869204f1e64d133494464edca483384b83eef))
* **filters:** build multiple-select options from native dom elements ([92813b3](https://github.com/ghiscoding/angular-slickgrid/commit/92813b3ea62e1088580624c64a69714c5314a6d6))
* **filters:** convert jQuery to native element on compound filter ([fa8c174](https://github.com/ghiscoding/angular-slickgrid/commit/fa8c1745248be7c8debbf6dfe78d12b1a60dff31))
* **filters:** convert jQuery to native element on date filters ([67840e3](https://github.com/ghiscoding/angular-slickgrid/commit/67840e3946662893b071e6998891b6262be336bb))
* **filters:** convert jQuery to native element on more filters ([fd064cf](https://github.com/ghiscoding/angular-slickgrid/commit/fd064cf411a44e01ac5e71c54fe5cd94ca0c5525))
* **services:** convert jQuery to native elements ([fc2132f](https://github.com/ghiscoding/angular-slickgrid/commit/fc2132f487e05dacc1c6d1f51ea157dc2820ee41))
* **tests:** upgrade `jest-preset-angular` with Jest 27 ([c68a5e6](https://github.com/ghiscoding/angular-slickgrid/commit/c68a5e61d9bad28920f7648260165a88bc585046))
* **tests:** upgrade jest-preset-angular with Jest 27 ([e2447ba](https://github.com/ghiscoding/angular-slickgrid/commit/e2447ba63cbf0ffee6fd9a7c08ee0a133e682557))
* **tree:** add Tree Collapse Grid State/Preset ([87d5c2a](https://github.com/ghiscoding/angular-slickgrid/commit/87d5c2a41fab6fce8825fd5fc8b73269e876a24d))
* **editors:**  add new Input Password Editor which uses common inputEditor ([66535fd](https://github.com/ghiscoding/angular-slickgrid/commit/66535fd9ea2602838c1d53c14134ea23749815c6))
* **filters:**  convert jQuery to native element on few more filters ([331accf](https://github.com/ghiscoding/angular-slickgrid/commit/331accffe94aa3286e5e540e96e6f06f7a5e7349))


### Bug Fixes

* **addon:** providing columnIndexPosition should always work ([4ff9935](https://github.com/ghiscoding/angular-slickgrid/commit/4ff9935cec586009d08a224c7c1b58270c767033))
* **demo:** we should be able to move row(s) and keep selections ([50e235c](https://github.com/ghiscoding/angular-slickgrid/commit/50e235c38224cd3260e790874974991b6a62df69))
* **editors:** longText Editor (textarea) was scrolling to page bottom ([e6d3a31](https://github.com/ghiscoding/angular-slickgrid/commit/e6d3a3169f9009ebbab3a82cbeb603aade8edc61))
* **editors:** select dropdown value is undefined it shouldn't call save ([17555f2](https://github.com/ghiscoding/angular-slickgrid/commit/17555f24943cc880e35a8fe8bf29cc28417c253c))
* **export:** expanded Row Detail shouldn't be exported ([b6299e4](https://github.com/ghiscoding/angular-slickgrid/commit/b6299e43a0741e95cdb61cb2fd2104ca044ae7c7))
* **filters:** filtering with IN_CONTAINS should also work with spaces ([579e13f](https://github.com/ghiscoding/angular-slickgrid/commit/579e13fcddc455a84ff9c533a7e9260c588945bd))
* **formatters:** shouldn't auto-add editor formatter multiple times ([6c0cf5f](https://github.com/ghiscoding/angular-slickgrid/commit/6c0cf5fa4fae380ed18e9abb4f86fcfb031a68ad))
* **frozen:** in some occasion column pinning changes column positions ([0764013](https://github.com/ghiscoding/angular-slickgrid/commit/07640132079efca63f359107b7a86b28f348a75c))
* **menu:** toggle filter bar could be out of sync w/horizontal scroll ([5ed2ea9](https://github.com/ghiscoding/angular-slickgrid/commit/5ed2ea90047958397b5d5e5fad3c9d61621e5ff0))
* **pagination:** should be able to toggle Pagination ([4272b18](https://github.com/ghiscoding/angular-slickgrid/commit/4272b18301beb7d62a527f2393d65f32351bdf83))
* **plugin:** row move shouldn't go further when onBefore returns false ([97c5f59](https://github.com/ghiscoding/angular-slickgrid/commit/97c5f59363675634732d03e8953bbaaa40eaddcd))
* **state:** changeColumnsArrangement should work w/columnIndexPosition ([831773b](https://github.com/ghiscoding/angular-slickgrid/commit/831773b8070ea766dd13a37f1ff8a4b1c2018d08))
* **state:** Grid View/Columns dynamically should work w/row selection ([65bf5dc](https://github.com/ghiscoding/angular-slickgrid/commit/65bf5dc9791797088715d704b2aa64feae0d5be4))
* **state:** Grid View/Columns dynamically work w/row move/detail ([d0bf315](https://github.com/ghiscoding/angular-slickgrid/commit/d0bf315aedcd45f4f67e47831eda2b4ee6c00e37))
* **styling:** header title should show ellipsis if too long ([50c7078](https://github.com/ghiscoding/angular-slickgrid/commit/50c7078c660dcfb21ae8f46c8a140e1da9f92d2c))
* **tree:** using `initiallyCollapsed` change internal toggled state ([91c48a2](https://github.com/ghiscoding/angular-slickgrid/commit/91c48a2c550db4c94d0a349777efdd071170ee3f))
* **tree:**  initial grid state should also include toggled presets ([2c0cec8](https://github.com/ghiscoding/angular-slickgrid/commit/2c0cec87749bd2e1a8f52e404727454717b16d2b))
* **tree:** calling updateItems should not lose the Tree collapsing icon ([399f770](https://github.com/ghiscoding/angular-slickgrid/commit/399f77039a4d4387cc959df8c176626a3b288f23))
* **editors:**  don't use nodejs type to avoid build issue ([177b68f](https://github.com/ghiscoding/angular-slickgrid/commit/177b68fd9d139959c47a86bc97126f28a485621e))
* **core:**  make sure new dataset is an array before getting length ([1d7fd03](https://github.com/ghiscoding/angular-slickgrid/commit/1d7fd03b22f6c64b23500a94ff92fe6948c74641))
* **pagination:**  toggle enablePagination flag only after setPagingOptions called ([67c4f9e](https://github.com/ghiscoding/angular-slickgrid/commit/67c4f9ec776046ed68a6b84e7abf7070350ab1f7))

### [2.29.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.29.0...v2.29.1) (2021-05-21)


### Bug Fixes

* **backend:** able to preset filters on hidden columns & all queried ([e10f723](https://github.com/ghiscoding/angular-slickgrid/commit/e10f7232a1738ad87a1f7bf1438ffa572edf0a53))
* **resizer:** fix a regression bug caused by previous ([1e47ed2](https://github.com/ghiscoding/angular-slickgrid/commit/1e47ed216d6c0c0e0b11cd03b11d29118f4b098d))
* **sorting:** multi-column sort shouldn't work when option is disabled ([9841155](https://github.com/ghiscoding/angular-slickgrid/commit/984115559fd537aed0cdd2b3a297b9e9aef8cb08))

## [2.29.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.28.2...v2.29.0) (2021-05-19)


### Features

* **addon:** provide grid menu labels for all built-in commands ([b8b5aa2](https://github.com/ghiscoding/angular-slickgrid/commit/b8b5aa2071cd85252b8fec476c7cfdd62bef8e16))
* **editors:** add ways to preload date without closing date picker ([a544a76](https://github.com/ghiscoding/angular-slickgrid/commit/a544a76642a8b3a0018e96a4bb20ff703e7c50a0))
* **resizer:** add `resizeByContentOnlyOnFirstLoad` grid option ([135771e](https://github.com/ghiscoding/angular-slickgrid/commit/135771e67afcce885623c0b89766bc45538170ae))
* **resizer:** add single Column Resize by Content dblClick & headerMenu ([183f33f](https://github.com/ghiscoding/angular-slickgrid/commit/183f33f70070665da1fc068e74be0a5875662e99))
* **styling:** switch from node-sass to dart-sass (sass) ([3dcf7c9](https://github.com/ghiscoding/angular-slickgrid/commit/3dcf7c9766a24beaa4ae965206eedb2149cfd30f))
* **tree:** improve Tree Data speed considerably & fix more issues ([900cd59](https://github.com/ghiscoding/angular-slickgrid/commit/900cd5966ff298f88805f075151fd3b65e8fedf2))


### Bug Fixes

* **editors:** select editor inline blur save before destroy, fixes [#752](https://github.com/ghiscoding/angular-slickgrid/issues/752) ([aa27c56](https://github.com/ghiscoding/angular-slickgrid/commit/aa27c567ff10dc1a5a0df368b9e7c492e8f5dd1f))
* **resizer:** remove delay to call resize by content to avoid flickering ([ea4a196](https://github.com/ghiscoding/angular-slickgrid/commit/ea4a196ca399235fa1fe6fe508b63d2fa048cac6)), closes [#341](https://github.com/ghiscoding/angular-slickgrid/issues/341)
* **services:** fix resizer issue found in `changeColumnsArrangement` ([288e364](https://github.com/ghiscoding/angular-slickgrid/commit/288e3648f58ac5ba161fa060d66cd340bfdba578))
* addItem from grid service should work with tree data ([94f83ca](https://github.com/ghiscoding/angular-slickgrid/commit/94f83cafd094a82995442c1c12f2d9b5b744df89))
* export to file/excel should also have tree indentation ([4450bc4](https://github.com/ghiscoding/angular-slickgrid/commit/4450bc4fd7836668823c01b5306e213c5cba3830))
* **styling:** add a better search filter magnify glass icon as placeholder ([dc87beb](https://github.com/ghiscoding/angular-slickgrid/commit/dc87bebae76278923fa925724cc852932ca902db))
* **tree:** couple of issues found in Tree Data ([0b120f4](https://github.com/ghiscoding/angular-slickgrid/commit/0b120f4038a0ea33fedfa0765027ae9336e4b1fa))

### [2.28.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.28.1...v2.28.2) (2021-04-26)


### Bug Fixes

* **footer:** add correct implementation of locale usage in custom footer ([5dcac2f](https://github.com/ghiscoding/angular-slickgrid/commit/5dcac2ff2c64b03c66fcb5f0f06c3aed1cb0cbac))
* **observables:** http cancellable Subject should be unsubscribed ([c439324](https://github.com/ghiscoding/angular-slickgrid/commit/c439324fc0dff4298a5a7cda0d33c6cc1ed6c849))
* **selection:** full row selection should be selected w/show hidden row ([131ada5](https://github.com/ghiscoding/angular-slickgrid/commit/131ada51cb6d52522990e6974ce0d779467bbae9)), closes [#739](https://github.com/ghiscoding/angular-slickgrid/issues/739)

### [2.28.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.28.0...v2.28.1) (2021-04-22)

## [2.28.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.27.0...v2.28.0) (2021-04-22)


### Features

* **filters:** add option to filter empty values for select filter ([7c9ce5a](https://github.com/ghiscoding/angular-slickgrid/commit/7c9ce5a2c0b6835514ac71f431185d1e996513d6))
* **filters:** option to add custom compound operator list, fix [#733](https://github.com/ghiscoding/angular-slickgrid/issues/733) ([a86d3c5](https://github.com/ghiscoding/angular-slickgrid/commit/a86d3c579690f336c5a76d6796e8c3cceac4f276))
* **footer:** add row selection count to the footer component ([5604669](https://github.com/ghiscoding/angular-slickgrid/commit/56046691f6eeaddf6d5a166f73c093123dba11a7))
* **resize:** add column resize by cell content ([c198686](https://github.com/ghiscoding/angular-slickgrid/commit/c1986867334675209da20d6dac89d67e3cb25a7c))
* **typing:** add missing item metadata interface ([c3eefd0](https://github.com/ghiscoding/angular-slickgrid/commit/c3eefd0851c6350604f0ccc594ac33974fcd2712))


### Bug Fixes

* **exports:** grid with colspan should be export accordingly ([00989ab](https://github.com/ghiscoding/angular-slickgrid/commit/00989ab0076b2a4e143b01b449b9ca36a795de30))

## [2.27.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.26.1...v2.27.0) (2021-03-23)


### Features

* **editors:** add `onSelect` callback to Autocomplete Editor ([#718](https://github.com/ghiscoding/angular-slickgrid/issues/718)) ([392304c](https://github.com/ghiscoding/angular-slickgrid/commit/392304c37556e5426d41cc088fa24e57118cd8ed))
* **filters:** add IN_COLLECTION operator to search cell value as Array ([#722](https://github.com/ghiscoding/angular-slickgrid/issues/722)) ([cd494ce](https://github.com/ghiscoding/angular-slickgrid/commit/cd494ced5be447a3c6f19ab30b84d06f0743a039))
* **filters:** add optional `filterTypingDebounce` for filters w/keyup ([#720](https://github.com/ghiscoding/angular-slickgrid/issues/720)) ([b4deea9](https://github.com/ghiscoding/angular-slickgrid/commit/b4deea95e67694a3e35f5978635e6cd982d60c37))
* **filters:** add possibility to filter by text range like "a..e" ([#711](https://github.com/ghiscoding/angular-slickgrid/issues/711)) ([aa4fa03](https://github.com/ghiscoding/angular-slickgrid/commit/aa4fa0313523da8b1754d8d63dabc134f54501e9))
* **filters:** display operator into input text filter from Grid Presets ([#719](https://github.com/ghiscoding/angular-slickgrid/issues/719)) ([cf6593a](https://github.com/ghiscoding/angular-slickgrid/commit/cf6593aa40fbca900b2ac2c0ac1cde377e3d270d))
* **state:** add Pinning (frozen) to Grid State & Presets ([b47f2a0](https://github.com/ghiscoding/angular-slickgrid/commit/b47f2a019c2bb20bc38118b974596a9b7f62138f))


### Bug Fixes

* **filters:** add more variable checking in multiple-select external lib ([#710](https://github.com/ghiscoding/angular-slickgrid/issues/710)) ([ced4a1e](https://github.com/ghiscoding/angular-slickgrid/commit/ced4a1e186fef682acab590e9b47bd457db51a73))
* **filters:** SearchTerms shouldn't come back after calling clearFilters ([b986cb9](https://github.com/ghiscoding/angular-slickgrid/commit/b986cb9d81b5ea9f6f93e72d04ca5877531eab67))
* **filters:** string <> should be Not Contains instead of Not Equal ([#709](https://github.com/ghiscoding/angular-slickgrid/issues/709)) ([e50a060](https://github.com/ghiscoding/angular-slickgrid/commit/e50a060103cd7a48d03e257ffebae37fe311e3d7))
* **metrics:** use `onRowCountChanged` event to refresh metrics fix [#715](https://github.com/ghiscoding/angular-slickgrid/issues/715) ([#716](https://github.com/ghiscoding/angular-slickgrid/issues/716)) ([f123854](https://github.com/ghiscoding/angular-slickgrid/commit/f1238540bb3ff2d1ac02ad17998ab2852fdcc44b))
* **pinning:** reordering cols position freezing cols shouldn't affect ([#708](https://github.com/ghiscoding/angular-slickgrid/issues/708)) ([e24c6de](https://github.com/ghiscoding/angular-slickgrid/commit/e24c6de0947644f1561188410f3c39d59318de7e))
* **plugin:** Grid Menu Clear Frozen Cols shouldn't change cols positions ([#721](https://github.com/ghiscoding/angular-slickgrid/issues/721)) ([ee07d79](https://github.com/ghiscoding/angular-slickgrid/commit/ee07d790fb0ab6141c1f6406b1c3b16f7db0f40f))
* **presets:** Multiple Select Filter Grid Presets values should be shown ([6f06d1d](https://github.com/ghiscoding/angular-slickgrid/commit/6f06d1d46b2c9bba29ab55ddfd80fd71fbbe44ef))

### [2.26.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.26.0...v2.26.1) (2021-03-01)


### Bug Fixes

* **build:** enable tsconfig strict mode tsconfig, fixes [#675](https://github.com/ghiscoding/angular-slickgrid/issues/675) ([#702](https://github.com/ghiscoding/angular-slickgrid/issues/702)) ([7219249](https://github.com/ghiscoding/angular-slickgrid/commit/7219249d99f63f839c19ae7d37191945b74d1215))
* **filters:** make sure Select Editor/Filter collection is filled ([#700](https://github.com/ghiscoding/angular-slickgrid/issues/700)) ([61e6599](https://github.com/ghiscoding/angular-slickgrid/commit/61e65998d0ae1c0a4d957cf923a45f855733aec9))
* **filters:** use defaultFilterOperator in range when none provided ([#705](https://github.com/ghiscoding/angular-slickgrid/issues/705)) ([a176037](https://github.com/ghiscoding/angular-slickgrid/commit/a17603764dace78e6ed5bffcce5ec0e3b1bf264f))
* **helpers:** should be able to highlight first row (0) ([#701](https://github.com/ghiscoding/angular-slickgrid/issues/701)) ([269f1e9](https://github.com/ghiscoding/angular-slickgrid/commit/269f1e9f68f89617ab78591baa159e2fc63396c0))
* **plugins:** do not recreate header button plugin after re-render ([#706](https://github.com/ghiscoding/angular-slickgrid/issues/706)) ([da62a48](https://github.com/ghiscoding/angular-slickgrid/commit/da62a48ce540ccf973f376028c1c47f9296f38b2))

## [2.26.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.25.1...v2.26.0) (2021-02-16)


### Features

* **filters:** add updateSingleFilter for a single external filter ([#699](https://github.com/ghiscoding/angular-slickgrid/issues/699)) ([677beb4](https://github.com/ghiscoding/angular-slickgrid/commit/677beb4016f03a6a2086a516cceac8117f24ea4a))
* **perf:** huge filtering execution speed improvements ([#694](https://github.com/ghiscoding/angular-slickgrid/issues/694)) ([f93a24d](https://github.com/ghiscoding/angular-slickgrid/commit/f93a24db90a1155995fbbf3c20b11a97a504fbc5))
* **perf:** improve date sorting speed ([#691](https://github.com/ghiscoding/angular-slickgrid/issues/691)) ([1040352](https://github.com/ghiscoding/angular-slickgrid/commit/1040352922d6c3922327d6a5ba5ed594846ad4bf))
* **services:** add bulk transactions in Grid Service CRUD methods ([#687](https://github.com/ghiscoding/angular-slickgrid/issues/687)) ([277e627](https://github.com/ghiscoding/angular-slickgrid/commit/277e6275f71340ebcaea43b03aadb595bc973cad))
* **tests:** add Cypress E2E tests to Bootstrap Tabs Example ([#698](https://github.com/ghiscoding/angular-slickgrid/issues/698)) ([b8d1d14](https://github.com/ghiscoding/angular-slickgrid/commit/b8d1d145c13abf0458d63c3aa5c91534ac6e59aa))


### Bug Fixes

* **backend:** incorrect item with GraphQL and useLocalFiltering ([#697](https://github.com/ghiscoding/angular-slickgrid/issues/697)) ([aa78e76](https://github.com/ghiscoding/angular-slickgrid/commit/aa78e7600f6088a59913d8bad41b75e1beffa21c))
* **exports:** Excel Export custom width applies the width to next column ([#683](https://github.com/ghiscoding/angular-slickgrid/issues/683)) ([fffa711](https://github.com/ghiscoding/angular-slickgrid/commit/fffa711660fb6a62515da693f53425263bac916a))
* **filters:** don't use indexOf NOT_IN_CONTAINS ([#693](https://github.com/ghiscoding/angular-slickgrid/issues/693)) ([844e167](https://github.com/ghiscoding/angular-slickgrid/commit/844e167317d349df0b50fe9a3a4c4a76ef9e21de))
* **frozen:** hiding multiple columns when using pinning gets out of sync ([#684](https://github.com/ghiscoding/angular-slickgrid/issues/684)) ([a453d76](https://github.com/ghiscoding/angular-slickgrid/commit/a453d763e90280ad5b0f2c963c8d0ad348d66e1e))
* **plugin:** recreate header menu w/adding column dynamically, fix [#689](https://github.com/ghiscoding/angular-slickgrid/issues/689) ([#690](https://github.com/ghiscoding/angular-slickgrid/issues/690)) ([1b89e2f](https://github.com/ghiscoding/angular-slickgrid/commit/1b89e2fa079acfcf14ea77744ca9a7de40bcceaa))

### [2.25.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.25.0...v2.25.1) (2021-01-25)


### Features

* **editors:** change all private keyword to protected for extensability ([#680](https://github.com/ghiscoding/angular-slickgrid/issues/680)) ([029a90c](https://github.com/ghiscoding/angular-slickgrid/commit/029a90ce2f776f606e6947dc9a95b24ca3d17dfa))
* **filters:** change all private keyword to protected for extensability ([#679](https://github.com/ghiscoding/angular-slickgrid/issues/679)) ([e5b5e8d](https://github.com/ghiscoding/angular-slickgrid/commit/e5b5e8d9a3d40870135058d39154786962e7675c))


### Bug Fixes

* **comp:** empty data warning should work with autoheight grid, fix [#671](https://github.com/ghiscoding/angular-slickgrid/issues/671) ([58c593b](https://github.com/ghiscoding/angular-slickgrid/commit/58c593bcac753140e9abc788cdf927a283ae5349))
* **filters:** Grid State filters should always include an operator ([#676](https://github.com/ghiscoding/angular-slickgrid/issues/676)) ([9ded204](https://github.com/ghiscoding/angular-slickgrid/commit/9ded20477272781a46a5f2996144896ca3110944))
* **metrics:** refresh metrics also when providing new data to DataView ([#677](https://github.com/ghiscoding/angular-slickgrid/issues/677)) ([7b95401](https://github.com/ghiscoding/angular-slickgrid/commit/7b9540183fe80c6bd3acf8d4f63a93f9f89ac5d1))
* **metrics:** use onRowsOrCountChanged to refresh metrics ([#681](https://github.com/ghiscoding/angular-slickgrid/issues/681)) ([ceb0d77](https://github.com/ghiscoding/angular-slickgrid/commit/ceb0d772c8bbb8cef82a280fb0b5a268859923b1))
* **pinning:** recalculate frozen idx properly when column shown changes ([#682](https://github.com/ghiscoding/angular-slickgrid/issues/682)) ([996125d](https://github.com/ghiscoding/angular-slickgrid/commit/996125d9c116a276a389fdab46f43f937ed6c62c))
* **plugins:** throw when Tree Data used with Pagination, closes [#658](https://github.com/ghiscoding/angular-slickgrid/issues/658) ([672db5f](https://github.com/ghiscoding/angular-slickgrid/commit/672db5f903d2a696e74cc04bf76d74ae7a6214de))
* **typings:** add specific file type to export service options ([b99c6e4](https://github.com/ghiscoding/angular-slickgrid/commit/b99c6e44b8564c5a8423078e1865a7ac9d89b6fa))

## [2.25.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.24.1...v2.25.0) (2021-01-06)


### Features

* **core:** export Editors, Filters & Formatters as Public ([e244218](https://github.com/ghiscoding/angular-slickgrid/commit/e2442184f11e313150208f2b580ceb73fd3700f5))
* **core:** methods to change column positions/visibilities dynamically ([49ab5e5](https://github.com/ghiscoding/angular-slickgrid/commit/49ab5e589b12eada71c214054920e7a2e9e02404))
* **editors:** add Column Editor collectionOverride option ([96cbd78](https://github.com/ghiscoding/angular-slickgrid/commit/96cbd7861765da28bf425666960404cf03c5dcad))
* **styling:** add support for Bootstrap 5 ([afb79e7](https://github.com/ghiscoding/Angular-Slickgrid/commit/afb79e769644e4b0c126f2b1d30a82ff64376708))


### Bug Fixes

* **backend:** GraphQL queries with input filter ([8465610](https://github.com/ghiscoding/angular-slickgrid/commit/8465610439a31bb77362c92dc92c35a707e0a641)), closes [#656](https://github.com/ghiscoding/angular-slickgrid/issues/656)
* **backend:** OData queries with input filter ([5822de1](https://github.com/ghiscoding/angular-slickgrid/commit/5822de1c12133841a2ba563d3969ce4b9c5c6856))
* **build:** import Flatpickr Locale on demand via regular imports ([ef06543](https://github.com/ghiscoding/angular-slickgrid/commit/ef065436b40bee8fc175214b74d52f9a79db1a93))
* **core:** add console error if any of column def id includes dot ([b1aa321](https://github.com/ghiscoding/angular-slickgrid/commit/b1aa32140b80945ee151b9bc9191d9f46e0d11ee))
* **core:** range default should be inclusive instead of exclusive ([4990162](https://github.com/ghiscoding/angular-slickgrid/commit/499016236ed7d584769b8128d10d12c927d7f1e2)), closes [#650](https://github.com/ghiscoding/angular-slickgrid/issues/650)
* **core:** use regular imports instead of require to load plugins ([b5204e5](https://github.com/ghiscoding/angular-slickgrid/commit/b5204e5156f51d5e549d48d0532b99a11498fb7c))
* **editors:** slider value not shown with undefined & fix small styling ([b85c6c5](https://github.com/ghiscoding/angular-slickgrid/commit/b85c6c59609bd8ad2b663510242316cc052102b9))
* **exports:** should be able to change export file name, fixes [#655](https://github.com/ghiscoding/angular-slickgrid/issues/655) ([7b2a9ef](https://github.com/ghiscoding/angular-slickgrid/commit/7b2a9ef7b13893cb74040bb2a8c95b08b3a7d8bb))
* **plugin:** Row Detail loses html content when used with Row Selection ([93b59c7](https://github.com/ghiscoding/angular-slickgrid/commit/93b59c766665bc8f4b60786edbf48497aec06962))
* **sorting:** add cellValueCouldBeUndefined in grid option for sorting ([24584b1](https://github.com/ghiscoding/angular-slickgrid/commit/24584b13369a95cf111f790f27213f3692e04061))

### [2.24.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.24.0...v2.24.1) (2020-12-10)


### Bug Fixes

* **filters:** use offset left to calculate multi-select auto position (left/right) ([9d79e2d](https://github.com/ghiscoding/angular-slickgrid/commit/9d79e2d149b21fb8766e0ad40cbbd4cf4f6572e6))

## [2.24.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.23.3...v2.24.0) (2020-12-10)


### Features

* **editors:** add few editor options to LongText (textarea) Editor ([38c7442](https://github.com/ghiscoding/angular-slickgrid/commit/38c7442792afd1d8512da7c5a1e5886e2d93c4a4))
* **filters:** add auto position (left/right) to multiple-select lib ([1b23b84](https://github.com/ghiscoding/angular-slickgrid/commit/1b23b84f7d9d099301b757ec9d59bf254e13b837))


### Bug Fixes

* **core:** make @types/jquery as a dependency to avoid build error ([966ebb0](https://github.com/ghiscoding/angular-slickgrid/commit/966ebb0f68fa0a06d84e7551ad72420156e2ccf8))
* **editors:** Select Editor option to return flat data w/complex object ([a3e6427](https://github.com/ghiscoding/angular-slickgrid/commit/a3e6427928035cb353e1586660066dd622f3e736))
* **exports:** when cell value is empty object return empty string ([0534d13](https://github.com/ghiscoding/angular-slickgrid/commit/0534d1304680d0e87b52bad8c29b341c878bb359))

### [2.23.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.23.2...v2.23.3) (2020-12-02)


### Features

* **core:** add enableMouseWheelScrollHandler grid option ([3150124](https://github.com/ghiscoding/angular-slickgrid/commit/31501249701458e07fa8e914b9efee48f8c4e036))


### Bug Fixes

* **core:** showing/hiding column shouldn't affect its freezing position ([7907cb8](https://github.com/ghiscoding/angular-slickgrid/commit/7907cb8c89de067b0a0cb009f7aa110a417b14e7))
* **formatters:** date formatters should accept ISO input & output to US ([482d0f5](https://github.com/ghiscoding/angular-slickgrid/commit/482d0f5d2c9d6ae561d36081917beaf420971726))

### [2.23.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.23.1...v2.23.2) (2020-11-20)


### Bug Fixes

* nullify grid/dataView/gridOptions when destroying to avoid leak ([b995b65](https://github.com/ghiscoding/angular-slickgrid/commit/b995b65fad93b293516630e974bf5a4988b53fdc))
* **core:** header columns grouping misbehave after hiding column ([c89a21b](https://github.com/ghiscoding/angular-slickgrid/commit/c89a21b245107d4377b1d74c2aa970f17efdb0fe))
* **extensions:** CellExternalCopyBuffer onKeyDown event leak, fix [#635](https://github.com/ghiscoding/angular-slickgrid/issues/635) ([#636](https://github.com/ghiscoding/angular-slickgrid/issues/636)) ([9ce8326](https://github.com/ghiscoding/angular-slickgrid/commit/9ce8326d046b9097965c5658a11da43b2bf2e0f6))

### [2.23.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.23.0...v2.23.1) (2020-11-18)


### Features

* **core:** add "Empty Data" warning message when grid is empty ([#631](https://github.com/ghiscoding/angular-slickgrid/issues/631)) ([8f72e38](https://github.com/ghiscoding/angular-slickgrid/commit/8f72e387a0e16fa205160e60fb31a55e6f9fadd1))
* **formatters:** add a fake hyperlink formatter ([#630](https://github.com/ghiscoding/angular-slickgrid/issues/630)) ([694f0ea](https://github.com/ghiscoding/angular-slickgrid/commit/694f0eaecf50db6f77f734cfd0b4ce0ddeae4e25))
* **formatters:** add AlignRight and AlignCenter Formatters ([#634](https://github.com/ghiscoding/angular-slickgrid/issues/634)) ([3645d60](https://github.com/ghiscoding/angular-slickgrid/commit/3645d6055ed617a84ee28fccdad944fc1a538ffe))
* **services:** add 2x new methods hideColumnById or ..byIds ([#633](https://github.com/ghiscoding/angular-slickgrid/issues/633)) ([e4455a9](https://github.com/ghiscoding/angular-slickgrid/commit/e4455a9aa052d0f01ff8715a029e8534f2b73395))


### Bug Fixes

* **backend:** OData/GraphQL pagination should display warning on empty ([#632](https://github.com/ghiscoding/angular-slickgrid/issues/632)) ([7d32bac](https://github.com/ghiscoding/angular-slickgrid/commit/7d32bac0e78afd4a48b1403a49d0fb614762ce0c))
* **core:** clear dataset when destroying & fix few unsubscribed events ([#629](https://github.com/ghiscoding/angular-slickgrid/issues/629)) ([0ee3421](https://github.com/ghiscoding/angular-slickgrid/commit/0ee3421b86374616533e2e9ebc2945d13705782b))
* **core:** Flatpickr is not destroyed properly & leaks detached elements ([#627](https://github.com/ghiscoding/angular-slickgrid/issues/627)) ([a9f7027](https://github.com/ghiscoding/angular-slickgrid/commit/a9f7027dbaf6d520ecb2fd868a55e96d7c1bff7b)), closes [#625](https://github.com/ghiscoding/angular-slickgrid/issues/625)
* **core:** mem leaks w/orphan DOM elements when disposing, fixes [#625](https://github.com/ghiscoding/angular-slickgrid/issues/625) ([#626](https://github.com/ghiscoding/angular-slickgrid/issues/626)) ([d1e284f](https://github.com/ghiscoding/angular-slickgrid/commit/d1e284fcb1fffec7f15bd3056f857f394db38aa0))
* **core:** properly dispose plugins to avoid detached DOM elements ([#628](https://github.com/ghiscoding/angular-slickgrid/issues/628)) ([3b4ccc4](https://github.com/ghiscoding/angular-slickgrid/commit/3b4ccc4891fa5bb983adff9f446adf77c9c84409))

## [2.23.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.22.5...v2.23.0) (2020-11-02)


### Features

* **core:** update project lib to Angular 8 with newer ng-packagr ([#617](https://github.com/ghiscoding/angular-slickgrid/issues/617)) ([edae737](https://github.com/ghiscoding/angular-slickgrid/commit/edae737f744f78e1857a90dc02b37d25cc5c6899))


### Bug Fixes

* **core:** revert to use WebPack to run Cypress E2E tests ([3b3c643](https://github.com/ghiscoding/angular-slickgrid/commit/3b3c64399c76186577b88e6005834e07a2b9e49b))
* **extensions:** import jQuery mousewheel only with frozen, fixes [#618](https://github.com/ghiscoding/angular-slickgrid/issues/618) ([#619](https://github.com/ghiscoding/angular-slickgrid/issues/619)) ([c3b52db](https://github.com/ghiscoding/angular-slickgrid/commit/c3b52db384fb967a2ad0c8a33093b7dae1a09209))
* **filters:** slider filter setValues really change input value ([#621](https://github.com/ghiscoding/angular-slickgrid/issues/621)) ([212c275](https://github.com/ghiscoding/angular-slickgrid/commit/212c275c7f3303b3462296d03e748b73760c30d6))

### [2.22.5](https://github.com/ghiscoding/angular-slickgrid/compare/v2.22.4...v2.22.5) (2020-10-29)


### Features

* **chore:** update Cypress reporter call with mochawesome ([#614](https://github.com/ghiscoding/angular-slickgrid/issues/614)) ([07bd99a](https://github.com/ghiscoding/angular-slickgrid/commit/07bd99a486004c290fe44bc8a57c8246ae30b1a9))


### Bug Fixes

* **core:** unsubscribe every possible events ([#611](https://github.com/ghiscoding/angular-slickgrid/issues/611)) ([2a92e78](https://github.com/ghiscoding/angular-slickgrid/commit/2a92e78cf0cabf53210bc6c4ac51132eb7f5a116)), closes [#610](https://github.com/ghiscoding/angular-slickgrid/issues/610)
* **interfaces:** column types in GridStateChange ([#609](https://github.com/ghiscoding/angular-slickgrid/issues/609)) ([8705aac](https://github.com/ghiscoding/angular-slickgrid/commit/8705aaca18232a639e9d4cd767740f97f8b9665c))
* **styling:** add missing pointer cursor to flatpickr inputs ([32cd122](https://github.com/ghiscoding/angular-slickgrid/commit/32cd122df3d5646be583dc8926f6ce8371593c83))
* **styling:** flatpickr bg-color should be using SASS variable ([#616](https://github.com/ghiscoding/angular-slickgrid/issues/616)) ([8a613d4](https://github.com/ghiscoding/angular-slickgrid/commit/8a613d43899dff20fffac26f439b07e12b00fbef))

### [2.22.4](https://github.com/ghiscoding/angular-slickgrid/compare/v2.22.3...v2.22.4) (2020-10-14)

### [2.22.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.22.2...v2.22.3) (2020-10-14)

### [2.22.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.22.1...v2.22.2) (2020-10-14)


### Features

* **styling:** add frozen on all possible elements with SASS variables ([#599](https://github.com/ghiscoding/angular-slickgrid/issues/599)) ([a6f292c](https://github.com/ghiscoding/angular-slickgrid/commit/a6f292c8c4ef90cd6bca606b0609efdf4ceab1e1))


### Bug Fixes

* **core:** don't override alwaysShowVerticalScroll flag ([#600](https://github.com/ghiscoding/angular-slickgrid/issues/600)) ([4eb9237](https://github.com/ghiscoding/angular-slickgrid/commit/4eb923772f80c224c9b93fe051c39e4578c0645f)), closes [#537](https://github.com/ghiscoding/angular-slickgrid/issues/537) [6pac/SlickGrid#537](https://github.com/6pac/SlickGrid/issues/537) [#537](https://github.com/ghiscoding/angular-slickgrid/issues/537) [6pac/SlickGrid#537](https://github.com/6pac/SlickGrid/issues/537)
* **core:** hide Grid Menu Filter/Sort cmd when disabling functionality ([#607](https://github.com/ghiscoding/angular-slickgrid/issues/607)) ([6a68e23](https://github.com/ghiscoding/angular-slickgrid/commit/6a68e239dc832c293282454e2a6cbf7470f83eae))

### [2.22.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.22.0...v2.22.1) (2020-10-02)


### Bug Fixes

* **styling:** Compound Filter Operator dropdown too wide in BS4 ([#598](https://github.com/ghiscoding/angular-slickgrid/issues/598)) ([cb48247](https://github.com/ghiscoding/angular-slickgrid/commit/cb482478384e5f83625082bce390f914ad015d03))

## [2.22.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.21.3...v2.22.0) (2020-10-02)


### Features

* **core:** add custom entry to Select Editor/Filter collections ([#592](https://github.com/ghiscoding/angular-slickgrid/issues/592)) ([43e483e](https://github.com/ghiscoding/angular-slickgrid/commit/43e483e5fed154fcf602e501b0344102fa75bd4d))
* **editors:** add Clear Date button to Date Editor ([#580](https://github.com/ghiscoding/angular-slickgrid/issues/580)) ([f2059a2](https://github.com/ghiscoding/angular-slickgrid/commit/f2059a2add5502798057fa6717c5ada050a59a7e))
* **services:** add Toggle Filtering/Sorting & Hide Column methods ([#587](https://github.com/ghiscoding/angular-slickgrid/issues/587)) ([b9cf7f9](https://github.com/ghiscoding/angular-slickgrid/commit/b9cf7f984c51e8cf4be8b4d97cc3bc49b42b99eb))
* **styling:** add description to Compound Filter Operators ([#588](https://github.com/ghiscoding/angular-slickgrid/issues/588)) ([56588d1](https://github.com/ghiscoding/angular-slickgrid/commit/56588d1e8851623f657265883cf84f9794d247e2))
* **styling:** add Pagination button height sass variable ([#596](https://github.com/ghiscoding/angular-slickgrid/issues/596)) ([5db78c2](https://github.com/ghiscoding/angular-slickgrid/commit/5db78c226dffaa8ce14a4c8ecd93eaecb0f88856))
* **tests:** add more Cypress E2E tests for grouping ([#584](https://github.com/ghiscoding/angular-slickgrid/issues/584)) ([90d47e6](https://github.com/ghiscoding/angular-slickgrid/commit/90d47e6b2a0f73a6e4f375e356d36283469f3393))


### Bug Fixes

* **editors:** add blank entry on Select Editor should happen once ([#591](https://github.com/ghiscoding/angular-slickgrid/issues/591)) ([f847e43](https://github.com/ghiscoding/angular-slickgrid/commit/f847e4396e311055166eca8b1a774aa22e6b57b9))
* **editors:** update to latest Flatpickr version ([#577](https://github.com/ghiscoding/angular-slickgrid/issues/577)) ([0675b31](https://github.com/ghiscoding/angular-slickgrid/commit/0675b319e1df55e34464a2d9f05fa0757092acce))
* **filters:** disregard time when filtering date only format ([#593](https://github.com/ghiscoding/angular-slickgrid/issues/593)) ([9e3acdc](https://github.com/ghiscoding/angular-slickgrid/commit/9e3acdc30e4432978142912b1c2958883a255c2e))
* **filters:** tree data presets caused regression in any grid w/presets ([#597](https://github.com/ghiscoding/angular-slickgrid/issues/597)) ([74d611d](https://github.com/ghiscoding/angular-slickgrid/commit/74d611df081d9222e2f395bf27d4884769e79cae))
* **pinning:** put back vertical scroll on grid after removing freezing ([#581](https://github.com/ghiscoding/angular-slickgrid/issues/581)) ([f07ff75](https://github.com/ghiscoding/angular-slickgrid/commit/f07ff75cef99c1f435744741ee718b3e47377da8))
* **select:** make a collection array copy to avoid change by ref ([#595](https://github.com/ghiscoding/angular-slickgrid/issues/595)) ([4d6a395](https://github.com/ghiscoding/angular-slickgrid/commit/4d6a395493a5a14d1289872f6e3a9a4db31a5669))
* **styling:** grouping with checkbox should be aligned left ([#582](https://github.com/ghiscoding/angular-slickgrid/issues/582)) ([18289d3](https://github.com/ghiscoding/angular-slickgrid/commit/18289d3f647b68ebfae48b25c38aefe951148e11))
* **styling:** support other unit of measure in SASS ([#590](https://github.com/ghiscoding/angular-slickgrid/issues/590)) ([666e6ee](https://github.com/ghiscoding/angular-slickgrid/commit/666e6ee189e73b25ddfc32e49415733fd1e1380b))

### [2.21.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.21.2...v2.21.3) (2020-09-08)

### [2.21.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.21.1...v2.21.2) (2020-09-08)


### Bug Fixes

* **editors:** all Editors should call commitChanges even when invalid, fixes [#571](https://github.com/ghiscoding/angular-slickgrid/issues/571) ([#574](https://github.com/ghiscoding/angular-slickgrid/issues/574)) ([fd052d1](https://github.com/ghiscoding/angular-slickgrid/commit/fd052d156999b9113e33ac5102b877fadfe610b6))
* **styling:** refactor Material/Salesforce styling theme ([#573](https://github.com/ghiscoding/angular-slickgrid/issues/573)) ([e2b138d](https://github.com/ghiscoding/angular-slickgrid/commit/e2b138d314238008d5033a0774e1c036f5e89bfc))

### [2.21.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.21.0...v2.21.1) (2020-09-03)


### Bug Fixes

* **styling:** extra styling shouldn't override default bootstrap style ([#570](https://github.com/ghiscoding/angular-slickgrid/issues/570)) ([5cdc4d9](https://github.com/ghiscoding/angular-slickgrid/commit/5cdc4d9e2072e16b0d948e4f05cb0c4cbb75c0a0))

## [2.21.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.20.2...v2.21.0) (2020-09-02)


### Features

* **autocomplete:** add much more functionalities to the AutoComplete ([#559](https://github.com/ghiscoding/angular-slickgrid/issues/559)) ([326ec5f](https://github.com/ghiscoding/angular-slickgrid/commit/326ec5f0e49a18d45e0947989f1333173012c961))
* **core:** add loading spinner to AutoComplete Editor/Filter ([#556](https://github.com/ghiscoding/angular-slickgrid/issues/556)) ([9a44225](https://github.com/ghiscoding/angular-slickgrid/commit/9a44225bec239f6c52060e99e498144dd67bea1d))
* **core:** update npm packages & move ngx-translate to peer dependencies ([#567](https://github.com/ghiscoding/angular-slickgrid/issues/567)) ([023a7e0](https://github.com/ghiscoding/angular-slickgrid/commit/023a7e0588481cdf59af8f92f92a6dd375a3ddc6))
* **styling:** add extra SASS utilities and icon colors ([#562](https://github.com/ghiscoding/angular-slickgrid/issues/562)) ([529a15c](https://github.com/ghiscoding/angular-slickgrid/commit/529a15c2818761c32d71ae7be137fd896b076567))
* **styling:** find way to add colors to SVGs used by the lib ([#557](https://github.com/ghiscoding/angular-slickgrid/issues/557)) ([b551caa](https://github.com/ghiscoding/angular-slickgrid/commit/b551caaf055965eb756500d1e75b578e40b3f94f))
* **tests:** add more Cypress E2E tests for Language change ([082ed22](https://github.com/ghiscoding/angular-slickgrid/commit/082ed227ca7f453a45be809e6dd3c4ea1935bf50))
* **tests:** add more Cypress E2E tests for Pagination Lang change ([dc1a96c](https://github.com/ghiscoding/angular-slickgrid/commit/dc1a96c42b34fc996a8e05b019c03be94b2e0a97))


### Bug Fixes

* **core:** latest Flatpickr breaks Date Filters/Editors ([#558](https://github.com/ghiscoding/angular-slickgrid/issues/558)) ([d6e0bef](https://github.com/ghiscoding/angular-slickgrid/commit/d6e0befa28a95df44c87148411d4822f5f42dab7))
* **editor:** SingleSelect Editor should show pick false value ([#560](https://github.com/ghiscoding/angular-slickgrid/issues/560)) ([0222d09](https://github.com/ghiscoding/angular-slickgrid/commit/0222d09b9f50843da9cf28a24cff06c76e019890))
* **editors:** AutoComplete Editor might have undefined object label ([#555](https://github.com/ghiscoding/angular-slickgrid/issues/555)) ([a8b9248](https://github.com/ghiscoding/angular-slickgrid/commit/a8b9248493347eea89ec530bde54d6575d310904))
* **editors:** fix couple of small editor bugs found ([#563](https://github.com/ghiscoding/angular-slickgrid/issues/563)) ([0894f16](https://github.com/ghiscoding/angular-slickgrid/commit/0894f16333f0cb588d57ca7df0de8d68dc9a5360))
* **styling:** remove unwanted source map from css output files ([#564](https://github.com/ghiscoding/angular-slickgrid/issues/564)) ([e9fd212](https://github.com/ghiscoding/angular-slickgrid/commit/e9fd2124ca7ed2b5985af95f7f36b1a70115c267))

### [2.20.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.20.1...v2.20.2) (2020-08-03)


### Features

* **examples:** add fetch to autoComplete sample ([#549](https://github.com/ghiscoding/angular-slickgrid/issues/549)) ([3941ba7](https://github.com/ghiscoding/angular-slickgrid/commit/3941ba797448b0b457fef9121cd18ad5f511dd8a))


### Bug Fixes

* **core:** add missing `inlineFilters` DataView optional flag ([#551](https://github.com/ghiscoding/angular-slickgrid/issues/551)) ([a5ae4da](https://github.com/ghiscoding/angular-slickgrid/commit/a5ae4da368aad5720c7e1e51363abad7d90de9bf))
* **extension:** Row Detail gets blanked out for no reason, fixes [#546](https://github.com/ghiscoding/angular-slickgrid/issues/546) ([#552](https://github.com/ghiscoding/angular-slickgrid/issues/552)) ([0087dd2](https://github.com/ghiscoding/angular-slickgrid/commit/0087dd2709d5be6adceca5983d4818bfdb229725))
* **extensions:** adding Context Menu custom commands was not working ([#548](https://github.com/ghiscoding/angular-slickgrid/issues/548)) ([45bf561](https://github.com/ghiscoding/angular-slickgrid/commit/45bf5611e0be4d167fd4b1ff84fcf5b074f360ed))
* **extensions:** Row Detail not always refreshing w/customId, fixes [#546](https://github.com/ghiscoding/angular-slickgrid/issues/546) ([#550](https://github.com/ghiscoding/angular-slickgrid/issues/550)) ([324f490](https://github.com/ghiscoding/angular-slickgrid/commit/324f490aeab9c6be370a90479234097ea1d96aa4))

### [2.20.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.20.0...v2.20.1) (2020-07-30)

## [2.20.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.19.1...v2.20.0) (2020-07-30)


### Features

* **core:** expose all addon instances ([#545](https://github.com/ghiscoding/angular-slickgrid/issues/545)) ([3578d9e](https://github.com/ghiscoding/angular-slickgrid/commit/3578d9eea2d12999bc10010416ccb24188637dd6))
* **editors:** add min/max length options to text editors ([#542](https://github.com/ghiscoding/angular-slickgrid/issues/542)) ([cc17d36](https://github.com/ghiscoding/angular-slickgrid/commit/cc17d369c6eec67be4fe25b834979fe50040297c))


### Bug Fixes

* **editors:** Editors should work with undefined item properties ([#540](https://github.com/ghiscoding/angular-slickgrid/issues/540)) ([5c33a48](https://github.com/ghiscoding/angular-slickgrid/commit/5c33a48b745b3344661bdf6ceca89e1c32428861))
* **footer:** remove unnecessary row class to avoid negative margins ([#541](https://github.com/ghiscoding/angular-slickgrid/issues/541)) ([34ed648](https://github.com/ghiscoding/angular-slickgrid/commit/34ed6483dfb3178222a15a178512a7c098e2913f))
* **interfaces:** grid option enableColumnReorder can also be a function ([#543](https://github.com/ghiscoding/angular-slickgrid/issues/543)) ([82b064d](https://github.com/ghiscoding/angular-slickgrid/commit/82b064daa26e5dc15814613d528592df92a7c0d1))
* **styling:** tweak styling so that we won't need to use css !important ([#544](https://github.com/ghiscoding/angular-slickgrid/issues/544)) ([13abe5b](https://github.com/ghiscoding/angular-slickgrid/commit/13abe5b395647666902af20be10d85d46035d956))

### [2.19.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.19.0...v2.19.1) (2020-07-20)


### Features

* **badge:** add Cypress badge ([7c6c8e1](https://github.com/ghiscoding/angular-slickgrid/commit/7c6c8e1f2619a3b440b09ffaa6cd7e41869b21b7))
* **core:** use DataView transactions with multiple item changes ([#527](https://github.com/ghiscoding/angular-slickgrid/issues/527)) ([154bfb1](https://github.com/ghiscoding/angular-slickgrid/commit/154bfb1cc1697717deb107fb87773980a58ef6d1))
* **styling:** add custom footer font-size SASS variable ([#519](https://github.com/ghiscoding/angular-slickgrid/issues/519)) ([bc56030](https://github.com/ghiscoding/angular-slickgrid/commit/bc560306ec2e7ef77df65e816265ed3e3c1ad052))
* **tests:** add more Cypress E2E tests for grid with Editors ([#532](https://github.com/ghiscoding/angular-slickgrid/issues/532)) ([701b624](https://github.com/ghiscoding/angular-slickgrid/commit/701b62451019f45c1e04bd332ba7b8cdad3904db))
* **tests:** add more Cypress E2E tests for Tree Data ([#525](https://github.com/ghiscoding/angular-slickgrid/issues/525)) ([36f958d](https://github.com/ghiscoding/angular-slickgrid/commit/36f958d22859ccf8b166ce17d18a604236abe050))


### Bug Fixes

* **editors:** add saveOutputType to finally have proper save format ([#535](https://github.com/ghiscoding/angular-slickgrid/issues/535)) ([cc8c31d](https://github.com/ghiscoding/angular-slickgrid/commit/cc8c31dce9118e8f1a2367f568be6052652bdf3a))
* **filter:** Grid Preset Filters should work with Tree Data View ([#522](https://github.com/ghiscoding/angular-slickgrid/issues/522)) ([f574fe4](https://github.com/ghiscoding/angular-slickgrid/commit/f574fe4ef6d63b21dadd407b9a2efdceeb58522b))
* **footer:** tweak date format in custom footer for redability ([#518](https://github.com/ghiscoding/angular-slickgrid/issues/518)) ([b2a0823](https://github.com/ghiscoding/angular-slickgrid/commit/b2a0823304747d3ec1ce7757786685adbe4bd478))
* **menu:** context menu to copy cell with queryFieldNameGetterFn ([#537](https://github.com/ghiscoding/angular-slickgrid/issues/537)) ([7e0640e](https://github.com/ghiscoding/angular-slickgrid/commit/7e0640ef62e04043e98e90b5fde491046d610057))
* **security:** update standard-version npm pack to fix security warning ([9d2a9f5](https://github.com/ghiscoding/angular-slickgrid/commit/9d2a9f5faca1c632f3c62b3af06ca7d625635c36))
* **styling:** sass variable should be interpolate before using calc ([#536](https://github.com/ghiscoding/angular-slickgrid/issues/536)) ([14f2fa0](https://github.com/ghiscoding/angular-slickgrid/commit/14f2fa00b352997c6d0ddb1c3b965d217c82984f))

## [2.19.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.18.7...v2.19.0) (2020-06-29)


### Features

* **editor:** use better error message for inclusive values ([#499](https://github.com/ghiscoding/angular-slickgrid/issues/499)) ([6f7b569](https://github.com/ghiscoding/angular-slickgrid/commit/6f7b56923f18c82c237cd4b0c926946eb6634d07))
* **pinning:** add "Frozen Columns" to header menu ([#494](https://github.com/ghiscoding/angular-slickgrid/issues/494)) ([7782ad3](https://github.com/ghiscoding/angular-slickgrid/commit/7782ad313997615db781b1e88d9989b4a05860c7))
* **sorting:** header menu clear sort, reset sorting when nothing left ([#509](https://github.com/ghiscoding/angular-slickgrid/issues/509)) ([5898c18](https://github.com/ghiscoding/angular-slickgrid/commit/5898c18678e52e3e608bc76a82fe1a8bd1b24907))
* **typing:** add SlickGrid and DataView interfaces ([#483](https://github.com/ghiscoding/angular-slickgrid/issues/483)) ([2cee037](https://github.com/ghiscoding/angular-slickgrid/commit/2cee0378b005d9f58b2738b632626947c5a22975))
* **typings:** add more TS Generic Types ([#489](https://github.com/ghiscoding/angular-slickgrid/issues/489)) ([a379837](https://github.com/ghiscoding/angular-slickgrid/commit/a3798374bbcf49ea8cf920472ba3be78d4cdd69a))


### Bug Fixes

* **core:** add missing use of custom datasetIdPropertyName ([#476](https://github.com/ghiscoding/angular-slickgrid/issues/476)) ([9be8fbf](https://github.com/ghiscoding/angular-slickgrid/commit/9be8fbfb9eb10b5ac28b959487e832f6f64e202d))
* **editor:** float validator should accept decimal even without 0 suffix ([#510](https://github.com/ghiscoding/angular-slickgrid/issues/510)) ([04b4465](https://github.com/ghiscoding/angular-slickgrid/commit/04b446515f4197e11baa23b2feee08fd6377a4d1))
* **editor:** shouldn't call cell changed when cell value is undefined ([211a2b9](https://github.com/ghiscoding/angular-slickgrid/commit/211a2b9615959f7231cd77233f6804f61ab56fbf))
* **editor:** shouldn't call cell changed when cell value is undefined ([#516](https://github.com/ghiscoding/angular-slickgrid/issues/516)) ([0aaeb02](https://github.com/ghiscoding/angular-slickgrid/commit/0aaeb02416389e236b86b6c47e3de858798bed40))
* **example:** use highest id as new id in addItem example, fixes [#495](https://github.com/ghiscoding/angular-slickgrid/issues/495) ([#497](https://github.com/ghiscoding/angular-slickgrid/issues/497)) ([1550d9d](https://github.com/ghiscoding/angular-slickgrid/commit/1550d9de85ff7455cf7bfb096b1ae6eed4c7e097))
* **excel:** Excel Export add mime type to work in Firefox, fixes [#500](https://github.com/ghiscoding/angular-slickgrid/issues/500) ([#501](https://github.com/ghiscoding/angular-slickgrid/issues/501)) ([56c8e17](https://github.com/ghiscoding/angular-slickgrid/commit/56c8e17f8f6ffedecfbc3f70b9e38362366f5a6e))
* **extension:** registerPlugin not implemented correctly ([#482](https://github.com/ghiscoding/angular-slickgrid/issues/482)) ([92ffa3d](https://github.com/ghiscoding/angular-slickgrid/commit/92ffa3d8299ddaae622216d2dc02f1d9eed014b5))
* **filter:** recreate filter when toggling header row, fixes [#493](https://github.com/ghiscoding/angular-slickgrid/issues/493) ([#496](https://github.com/ghiscoding/angular-slickgrid/issues/496)) ([56d74ae](https://github.com/ghiscoding/angular-slickgrid/commit/56d74ae7590b4557af59c6dcfd605dd60da21a9f))
* **filter:** Select Filter should use default locale without translation ([#503](https://github.com/ghiscoding/angular-slickgrid/issues/503)) ([5284ada](https://github.com/ghiscoding/angular-slickgrid/commit/5284ada21e97ac28aec7d8f01eb845b89b3abbd3))
* **formatter:** add possibility to parse a date formatter as a UTC date ([#511](https://github.com/ghiscoding/angular-slickgrid/issues/511)) ([53cc371](https://github.com/ghiscoding/angular-slickgrid/commit/53cc3713513895daa0016f6c488574663d3f087b))
* **header:** re-create header grouping title after changing picker cols ([#502](https://github.com/ghiscoding/angular-slickgrid/issues/502)) ([f03c6f9](https://github.com/ghiscoding/angular-slickgrid/commit/f03c6f91dd6e898484342d4afec2c41d4d8d0014))
* **lint:** adhere to strict triple equality check ([#477](https://github.com/ghiscoding/angular-slickgrid/issues/477)) ([c49f950](https://github.com/ghiscoding/angular-slickgrid/commit/c49f9506677ce3389bcf5b83e4f807aeb2a8ca91))
* **pagination:** disabled page buttons should not be clickable ([#506](https://github.com/ghiscoding/angular-slickgrid/issues/506)) ([fbe0d5f](https://github.com/ghiscoding/angular-slickgrid/commit/fbe0d5fdab6b6680814c858b9aad442042e2a01e))
* **picker:** add missing pre-header title grouping extractor ([#498](https://github.com/ghiscoding/angular-slickgrid/issues/498)) ([ffcbf55](https://github.com/ghiscoding/angular-slickgrid/commit/ffcbf5594115c135b4953c168d664c3fe93a0c2e))
* **presets:** compound filters operator not working correctly w/presets ([#507](https://github.com/ghiscoding/angular-slickgrid/issues/507)) ([f7b5270](https://github.com/ghiscoding/angular-slickgrid/commit/f7b5270aec48f5ac72dafe8cfe25c26fbf56924d))
* **styling:** cell/context menus get re-position below the grid ([#479](https://github.com/ghiscoding/angular-slickgrid/issues/479)) ([eba2d0f](https://github.com/ghiscoding/angular-slickgrid/commit/eba2d0f431f66ecec4d24115a2d76dc0681255ba))
* **treeData:** should support use of custom datasetIdPropertyName ([#475](https://github.com/ghiscoding/angular-slickgrid/issues/475)) ([7aa4f97](https://github.com/ghiscoding/angular-slickgrid/commit/7aa4f97fcaa1d12d4968d086f7b4f137211f8ac9))
* **types:** add missing option flags in grouping interface ([#481](https://github.com/ghiscoding/angular-slickgrid/issues/481)) ([a1fe38e](https://github.com/ghiscoding/angular-slickgrid/commit/a1fe38e982ae64f223a2c69e943e9708480d2349))

### [2.18.7](https://github.com/ghiscoding/angular-slickgrid/compare/v2.18.6...v2.18.7) (2020-05-26)


### Features

* **gridMenu:** update SlickGrid & add new Grid Menu options, fixes [#464](https://github.com/ghiscoding/angular-slickgrid/issues/464) ([#473](https://github.com/ghiscoding/angular-slickgrid/issues/473)) ([10f0b7d](https://github.com/ghiscoding/angular-slickgrid/commit/10f0b7d94f81569d238d411153aac4a559242302))


### Bug Fixes

* **footer:** custom footer metric texts could not be changed, fixes [#470](https://github.com/ghiscoding/angular-slickgrid/issues/470) ([#472](https://github.com/ghiscoding/angular-slickgrid/issues/472)) ([2681596](https://github.com/ghiscoding/angular-slickgrid/commit/2681596620d238eb738658f28dfb8d35968dd904))
* **gridMenu:** command "Toggle Filter Row" header row ([#466](https://github.com/ghiscoding/angular-slickgrid/issues/466)) ([4858794](https://github.com/ghiscoding/angular-slickgrid/commit/48587941e758d9396f38f0d2edf2da8a22ebb93d)), closes [#448](https://github.com/ghiscoding/angular-slickgrid/issues/448)
* **locale:** use correct locale text operator tooltip, closes [#468](https://github.com/ghiscoding/angular-slickgrid/issues/468) ([#469](https://github.com/ghiscoding/angular-slickgrid/issues/469)) ([d978946](https://github.com/ghiscoding/angular-slickgrid/commit/d978946391fd21bf1f30fdf9a612fe0621922ae7))
* **odata:** encode URI also for IN/NIN operators, fixes [#463](https://github.com/ghiscoding/angular-slickgrid/issues/463) ([#471](https://github.com/ghiscoding/angular-slickgrid/issues/471)) ([92bf9e3](https://github.com/ghiscoding/angular-slickgrid/commit/92bf9e3498173cdc6bd9b0307328b7809c11263f))
* **resizer:** check for undefined option instead of fallback ([#474](https://github.com/ghiscoding/angular-slickgrid/issues/474)) ([59975f0](https://github.com/ghiscoding/angular-slickgrid/commit/59975f042002eab4b49cde6b867dff3cdd881cc9))

### [2.18.6](https://github.com/ghiscoding/angular-slickgrid/compare/v2.18.5...v2.18.6) (2020-05-19)


### Bug Fixes

* **styling:** remove fixed header height ([9cef192](https://github.com/ghiscoding/angular-slickgrid/commit/9cef192a93aa9152f4954eca1ef4ac3c0f7a2d96))

### [2.18.5](https://github.com/ghiscoding/angular-slickgrid/compare/v2.18.4...v2.18.5) (2020-05-19)

### [2.18.4](https://github.com/ghiscoding/angular-slickgrid/compare/v2.18.3...v2.18.4) (2020-05-19)

### [2.18.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.18.2...v2.18.3) (2020-05-19)

### [2.18.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.12...v2.18.2) (2020-05-19)

### [2.18.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.11...v2.18.1) (2020-05-19)


### Features

* **editor:** add new Dual Input Editor & extract all Editor Validators ([#446](https://github.com/ghiscoding/angular-slickgrid/issues/446)) ([06f5dc9](https://github.com/ghiscoding/angular-slickgrid/commit/06f5dc9ba4826e2b018e71d4991ba04f6bec17a4))
* **extension:** add column position option for checkbox row selector ([fc72ba0](https://github.com/ghiscoding/angular-slickgrid/commit/fc72ba0217712f5c085b2274dd0dbf3f41a6b6d4))
* **extension:** add column position option for Row Detail icon ([#419](https://github.com/ghiscoding/angular-slickgrid/issues/419)) ([36bdcd1](https://github.com/ghiscoding/angular-slickgrid/commit/36bdcd1e9ff9cd6e931967445240e234dad86bbd))
* **extension:** add latest slickgrid with RowMove improvements ([#428](https://github.com/ghiscoding/angular-slickgrid/issues/428)) ([4f4b231](https://github.com/ghiscoding/angular-slickgrid/commit/4f4b2316c668f23460212de5b7480d7f7f72dce4)), closes [#256](https://github.com/ghiscoding/angular-slickgrid/issues/256)
* **grouping:** add missing Grouping interface properties, closes [#430](https://github.com/ghiscoding/angular-slickgrid/issues/430) ([#432](https://github.com/ghiscoding/angular-slickgrid/issues/432)) ([fe7a65a](https://github.com/ghiscoding/angular-slickgrid/commit/fe7a65add869f7b708dc8dbb75d3c39b5e753a8c))
* **query:** add queryFieldNameGetterFn callback know which field to use ([#434](https://github.com/ghiscoding/angular-slickgrid/issues/434)) ([0d5a150](https://github.com/ghiscoding/angular-slickgrid/commit/0d5a150c324e000e1de5bc7ebeb846c6c48ba122))
* **sort:** add valueCouldBeUndefined column flag to help sorting ([#429](https://github.com/ghiscoding/angular-slickgrid/issues/429)) ([dcd7a41](https://github.com/ghiscoding/angular-slickgrid/commit/dcd7a410602313dc65559091a0945cca599f8269))
* **style:** add Sort icon hint on hover when column is sortable ([#435](https://github.com/ghiscoding/angular-slickgrid/issues/435)) ([a746c2d](https://github.com/ghiscoding/angular-slickgrid/commit/a746c2d5e3f78a5c7f759ae94b2d0c1c698231ee))
* **styling:** add CSS/SASS Material Design & Salesforce styling themes ([#454](https://github.com/ghiscoding/angular-slickgrid/issues/454)) ([0030763](https://github.com/ghiscoding/angular-slickgrid/commit/00307637bed9dd575f250af3919a4949f6902ce3))
* **translate:** add namespace prefix + separator grid option ([#462](https://github.com/ghiscoding/angular-slickgrid/issues/462)) ([c23370e](https://github.com/ghiscoding/angular-slickgrid/commit/c23370ed12e36edd64e1d897210f09ec8f2827f3))
* **treeData:** add new Tree Data View feature, closes [#178](https://github.com/ghiscoding/angular-slickgrid/issues/178) ([#455](https://github.com/ghiscoding/angular-slickgrid/issues/455)) ([3250bde](https://github.com/ghiscoding/angular-slickgrid/commit/3250bde0696a81913d196a2f97dfca5f6e53ab5b))


### Bug Fixes

* **editor:** disregard Flatpickr error on Date Editor and fix output format ([#445](https://github.com/ghiscoding/angular-slickgrid/issues/445)) ([96e2973](https://github.com/ghiscoding/angular-slickgrid/commit/96e2973745b77237306fdbb7cd3ed504224a5147))
* **export:** add grouped header title (from pre-header) into exports ([#436](https://github.com/ghiscoding/angular-slickgrid/issues/436)) ([a315f85](https://github.com/ghiscoding/angular-slickgrid/commit/a315f859ca842db7ef8cb53205bfd7117c802f48))
* **export:** remove unsupported file type, closes [#452](https://github.com/ghiscoding/angular-slickgrid/issues/452) ([#458](https://github.com/ghiscoding/angular-slickgrid/issues/458)) ([c00b6ab](https://github.com/ghiscoding/angular-slickgrid/commit/c00b6ab3915eb02dafed48d9bf51fa6b29e285f3))
* **filter:** string filter should also work when using Contains ([#427](https://github.com/ghiscoding/angular-slickgrid/issues/427)) ([2c0765b](https://github.com/ghiscoding/angular-slickgrid/commit/2c0765bcc95c22620645d82810e021fc9f622d93))
* **filter:** when entering filter operator it shouldn't do any filtering ([#431](https://github.com/ghiscoding/angular-slickgrid/issues/431)) ([9d53315](https://github.com/ghiscoding/angular-slickgrid/commit/9d5331505fab44c5f1d977631d85092c84329675))
* **formatter:** exportWithFormatter should work with undefined item prop ([#457](https://github.com/ghiscoding/angular-slickgrid/issues/457)) ([3cfcab1](https://github.com/ghiscoding/angular-slickgrid/commit/3cfcab1f63b1bfa5625bceb4151e0ac6aa02675c))
* **gridMenu:** column picker list should include grouped header titles ([#460](https://github.com/ghiscoding/angular-slickgrid/issues/460)) ([e4a34a0](https://github.com/ghiscoding/angular-slickgrid/commit/e4a34a0dff7c330afaa746b3b79a4ce7e0425a7d))
* **gridMenu:** command "Togge Filter" disappeared, fixes [#438](https://github.com/ghiscoding/angular-slickgrid/issues/438) ([#448](https://github.com/ghiscoding/angular-slickgrid/issues/448)) ([b10c5be](https://github.com/ghiscoding/angular-slickgrid/commit/b10c5bee31129263df9fcd7c17c5a6e4e06eb9d1))
* **gridService:** crud methods should support custom dataset id ([#453](https://github.com/ghiscoding/angular-slickgrid/issues/453)) ([2c91f35](https://github.com/ghiscoding/angular-slickgrid/commit/2c91f353537de738d71e7d7fd97151831d167943))
* **pagination:** passing custom pagination sizes should work, fixes [#456](https://github.com/ghiscoding/angular-slickgrid/issues/456) ([#459](https://github.com/ghiscoding/angular-slickgrid/issues/459)) ([0367625](https://github.com/ghiscoding/angular-slickgrid/commit/0367625b926ea05d4afee970ce0b02c5939d15e2))
* **resizer:** remove scrollbar measure compensate patch ([#424](https://github.com/ghiscoding/angular-slickgrid/issues/424)) ([bca1f0b](https://github.com/ghiscoding/angular-slickgrid/commit/bca1f0b5520cd9ed1b97ce1730feaeeda7953cb4))
* **rowDetail:** use latest SlickGrid to fix issue with id, fixes [#440](https://github.com/ghiscoding/angular-slickgrid/issues/440) ([#449](https://github.com/ghiscoding/angular-slickgrid/issues/449)) ([8f16559](https://github.com/ghiscoding/angular-slickgrid/commit/8f1655940d9359b17307bc874301cc7ff86d0ecd))
* **sort:** header menu sorting should include columnId property ([0c47038](https://github.com/ghiscoding/angular-slickgrid/commit/0c47038367d4d5aa4b0dd572b860e7de87901650))

### [2.17.11](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.10...v2.17.11) (2020-03-18)


### Features

* **sort:** add default sort field as grid option ([00b0751](https://github.com/ghiscoding/angular-slickgrid/commit/00b0751277a7d1c4311e56e282700a745c34275f))


### Bug Fixes

* **formatters:** decimalSeparator & thousandSeparator work tgt, fix [#411](https://github.com/ghiscoding/angular-slickgrid/issues/411) ([67318d5](https://github.com/ghiscoding/angular-slickgrid/commit/67318d53f4828a6631a3bf6c5174260005031399))
* **tests:** fix failing Cypress E2E from last commit ([72870f4](https://github.com/ghiscoding/angular-slickgrid/commit/72870f4cdddd97f092aaff2fc3e6d312b1b54879))
* **types:** fix TS type warnings ([af146fb](https://github.com/ghiscoding/angular-slickgrid/commit/af146fb73e30ed9bae2cb067fd653d06b5016cf8))

### [2.17.10](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.9...v2.17.10) (2020-03-03)


### Bug Fixes

* **columns:** remove columns dynamically with Editors, fixes [#406](https://github.com/ghiscoding/angular-slickgrid/issues/406) ([903473d](https://github.com/ghiscoding/angular-slickgrid/commit/903473d280b6d9f4992603c1b867a442a50ffa99))

### [2.17.9](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.8...v2.17.9) (2020-03-02)


### Bug Fixes

* **columns:** add/remove columns dynamically, fixes [#406](https://github.com/ghiscoding/angular-slickgrid/issues/406) ([324cb1a](https://github.com/ghiscoding/angular-slickgrid/commit/324cb1a97fcd8e0362e2c656a091f3289e155119))
* **example:** should re-render after clearing groups, fixes [#407](https://github.com/ghiscoding/angular-slickgrid/issues/407) ([7752abd](https://github.com/ghiscoding/angular-slickgrid/commit/7752abd27933a51d5e58c3e305ceff791400ea88))

### [2.17.8](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.7...v2.17.8) (2020-02-27)


### Bug Fixes

* **mousewheel:** add jquery mousewheel lib to fix scroll in frozen grid ([d2bc0e7](https://github.com/ghiscoding/angular-slickgrid/commit/d2bc0e7afd9fd507c4214e12289cf2ef39930c29))

### [2.17.7](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.6...v2.17.7) (2020-02-27)

### [2.17.6](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.5...v2.17.6) (2020-02-27)


### Bug Fixes

* **editor:** LongText Editor save button that was not working properly ([90beeac](https://github.com/ghiscoding/angular-slickgrid/commit/90beeacebdc03d8bdfdb163c9813a54a7d2e68b6))

### [2.17.5](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.4...v2.17.5) (2020-02-21)


### Features

* **excel:** add some extra styling & width options for Excel export ([#403](https://github.com/ghiscoding/angular-slickgrid/issues/403)) ([d87ce2c](https://github.com/ghiscoding/angular-slickgrid/commit/d87ce2c89aa9fc8142a0a694e445f193a92ea19e))
* **tests:** update to latest Cypress version ([dc3afa9](https://github.com/ghiscoding/angular-slickgrid/commit/dc3afa93751761c06c222b9765c44dd9afb18525))

### [2.17.4](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.3...v2.17.4) (2020-02-06)


### Bug Fixes

* **selection:** row selection always be kept, closes [#295](https://github.com/ghiscoding/angular-slickgrid/issues/295) again ([#399](https://github.com/ghiscoding/angular-slickgrid/issues/399)) ([5e8f1df](https://github.com/ghiscoding/angular-slickgrid/commit/5e8f1df472b899e488fa9b930bedca8895f5e8f4))

### [2.17.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.2...v2.17.3) (2020-02-05)


### Bug Fixes

* **pagination:** on filter change pagination should reset to 1st page ([#397](https://github.com/ghiscoding/angular-slickgrid/issues/397)) ([af64dd6](https://github.com/ghiscoding/angular-slickgrid/commit/af64dd61523363cc7677a0e6d5813cfa753d2213))
* **selection:** filter data should work with row selection, closes [#295](https://github.com/ghiscoding/angular-slickgrid/issues/295) ([#393](https://github.com/ghiscoding/angular-slickgrid/issues/393)) ([f36a4f7](https://github.com/ghiscoding/angular-slickgrid/commit/f36a4f794458f68434de4edad4a52a93dcbafc51))

### [2.17.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.1...v2.17.2) (2020-02-03)

### [2.17.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.17.0...v2.17.1) (2020-02-03)


### Bug Fixes

* **backend:** updateOptions can be use with partial options - TS type ([80bdaa5](https://github.com/ghiscoding/angular-slickgrid/commit/80bdaa5270aa613a1bbc6794c7d97950089a3e2e))
* **footer:** custom footer should work anytime pagination is disabled ([7d9798a](https://github.com/ghiscoding/angular-slickgrid/commit/7d9798aedf25653375f0344afa04297fb2c7ef69))
* **locales:** fix some Locales not showing up when not using Translate ([#392](https://github.com/ghiscoding/angular-slickgrid/issues/392)) ([4d5e65b](https://github.com/ghiscoding/angular-slickgrid/commit/4d5e65b0697276cb827f1bc0355e8dff378304b1))

## [2.17.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.16.5...v2.17.0) (2020-01-31)


### Features

* **menus:** add "onAfterMenuShow" event to all possible menu plugins ([#389](https://github.com/ghiscoding/angular-slickgrid/issues/389)) ([141d01a](https://github.com/ghiscoding/angular-slickgrid/commit/141d01ac9aa52ffe182453c31318456f67c74788))
* **selection:** add flag to disable syncGridSelection w/BackendService ([#390](https://github.com/ghiscoding/angular-slickgrid/issues/390)) ([f29c6f0](https://github.com/ghiscoding/angular-slickgrid/commit/f29c6f0298d02f4eddf528d034afa0e5dd2747a6))
* **selection:** preserve row selection & add it to Grid State & Presets ([#388](https://github.com/ghiscoding/angular-slickgrid/issues/388)) ([a50d489](https://github.com/ghiscoding/angular-slickgrid/commit/a50d489080a11490d54b728962849408f6ae091a)), closes [#295](https://github.com/ghiscoding/angular-slickgrid/issues/295)

### [2.16.5](https://github.com/ghiscoding/angular-slickgrid/compare/v2.16.4...v2.16.5) (2020-01-23)


### Bug Fixes

* **state:** Clear Sort should trigger only 1 event & fix Pagination ([8e4f931](https://github.com/ghiscoding/angular-slickgrid/commit/8e4f93102329173f65e2e6054dec54824bd0b85a))

### [2.16.4](https://github.com/ghiscoding/angular-slickgrid/compare/v2.16.3...v2.16.4) (2020-01-23)


### Bug Fixes

* **backend:** fix build warnings ([c72ccc9](https://github.com/ghiscoding/angular-slickgrid/commit/c72ccc92ede37504efc7e19798082765e486bdfc))
* **columns:** Column Grouping should re-render after cols reordering ([bd991f0](https://github.com/ghiscoding/angular-slickgrid/commit/bd991f06ee6b891f9d26e28325e32a9e1ad38c11))
* **formatter:** refine condition to display a checkmark icon ([507b299](https://github.com/ghiscoding/angular-slickgrid/commit/507b2995f10f0c1475e41044a959244b3b928980))

### [2.16.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.16.2...v2.16.3) (2020-01-22)


### Bug Fixes

* **build:** remove extensionUtility DI to fix build ([42cc4b4](https://github.com/ghiscoding/angular-slickgrid/commit/42cc4b44917bccdb189e571c369403047ac69f01))

### [2.16.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.16.1...v2.16.2) (2020-01-22)


### Features

* **columnGroup:** add columnGroupKey property in order to use translate ([147470f](https://github.com/ghiscoding/angular-slickgrid/commit/147470febe5327f36e569fb934a883059ba76a30))


### Bug Fixes

* **tests:** fix a Cypress E2E flaky test ([8fb09e2](https://github.com/ghiscoding/angular-slickgrid/commit/8fb09e21660b8a02ce420aa08ed62bcefb735f8f))

### [2.16.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.16.0...v2.16.1) (2020-01-21)


### Bug Fixes

* **build:** create & use separate excel-builder package to fix security ([c114ae0](https://github.com/ghiscoding/angular-slickgrid/commit/c114ae0df149ebef361701d25253a570ed43077f))
* **footer:** fix Custom Footer styling issues with Bootstrap 4 ([658a9fd](https://github.com/ghiscoding/angular-slickgrid/commit/658a9fdd3aee12071396aa455901fd22f61c0352))
* **pagination:** should be empty (0) when filtering an empty dataset ([7409832](https://github.com/ghiscoding/angular-slickgrid/commit/74098325661b012f90acb9c57cf4aac2fe47e04b))

## [2.16.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.15.4...v2.16.0) (2020-01-20)


### Features

* **backend:** add OData & GraphQL Service API interfaces ([43d3a00](https://github.com/ghiscoding/angular-slickgrid/commit/43d3a00deed0e0ab8ecda3fa10f5cb2a7cb47973))
* **backend:** add OData & GraphQL Service API interfaces ([11cc71c](https://github.com/ghiscoding/angular-slickgrid/commit/11cc71cb23bc173494c7af1a87364e452cc9854e))
* **backend:** add option to use local filtering/sorting strategy ([73c288b](https://github.com/ghiscoding/angular-slickgrid/commit/73c288b9faccdd93e17b7b67d1df984adcd51725))
* **examples:** add new GraphQL without Pagination Example ([f02ac2d](https://github.com/ghiscoding/angular-slickgrid/commit/f02ac2d4c6519a6267aa398ccc745c1e02b21901))
* **footer:** add custom footer to show metrics ([2054319](https://github.com/ghiscoding/angular-slickgrid/commit/205431935e33e81f82332dabd85f94a74a9a0fb6))
* **pagination:** add Pagination to local grid ([53aa9dc](https://github.com/ghiscoding/angular-slickgrid/commit/53aa9dc0c3fd8209c8a667ad27c9ef2e0f88340f))
* **rowDetail:** add few object instances that can be used in child comp ([9cc52c3](https://github.com/ghiscoding/angular-slickgrid/commit/9cc52c331dcfc7af413783518e739e44674c426c))
* **rowDetail:** add Parent property to pass ref to parent comp ([dd8c1cd](https://github.com/ghiscoding/angular-slickgrid/commit/dd8c1cdb4bbd0a867dfca61adb2ddb2f3b674afe))
* **tests:** add Cypress E2E for Local Pagination and fix new bugs found ([b7b1a73](https://github.com/ghiscoding/angular-slickgrid/commit/b7b1a7362a50e0994a585c9e57a6df50342fd774))


### Bug Fixes

* **backend:** cancel prior http calls to avoid inconsistent data shown ([f9aaf54](https://github.com/ghiscoding/angular-slickgrid/commit/f9aaf545d3f5f9444f606a9a706245fb6cc5f0af))
* **build:** TS warning on a missing Type ([b894ee1](https://github.com/ghiscoding/angular-slickgrid/commit/b894ee1606363c891615cd87ef9a4182ea07c78b))
* **cypress:** fix failing Cypress E2E test ([e78b2d9](https://github.com/ghiscoding/angular-slickgrid/commit/e78b2d96a499db4ecedc196c80ad3c3db0e44dab))
* **examples:** use spinner only when loading data ([d0b4820](https://github.com/ghiscoding/angular-slickgrid/commit/d0b48201637870d33a3b12664a22bfc0903a1c39))
* **examples:** use valid date format ([f66703a](https://github.com/ghiscoding/angular-slickgrid/commit/f66703adf4e9b4f9f0d46e648d829b761c1a9b6e))
* **filter:** creating blank entry should only be entered once ([3b769a4](https://github.com/ghiscoding/angular-slickgrid/commit/3b769a4ee2005d4ea240050699e2323e78112a8e))
* **filters:** remove filter DOM element IDs to avoid duplicate IDs ([4b83133](https://github.com/ghiscoding/angular-slickgrid/commit/4b83133ff717f1f839bf2912b5b14ff9ef38bec2))
* **header:** column header grouping should be re-render after a resize ([beda628](https://github.com/ghiscoding/angular-slickgrid/commit/beda628ce4b1ef61c2565f514e1356480b3c29be))
* **menu:** remove unused code in Context Menu to select cell ([a2ae4bb](https://github.com/ghiscoding/angular-slickgrid/commit/a2ae4bba4bde279d0174aeb6bb91699f686a6612))
* **pagination:** reload local grid with pagination presests w/same data ([80eef1a](https://github.com/ghiscoding/angular-slickgrid/commit/80eef1aa2b66e1e310d821b09ec856e5ea22bad8))
* **pagination:** should work with page number defined in presets ([95428ad](https://github.com/ghiscoding/angular-slickgrid/commit/95428ad7d94660fc3138b0e97955f9b1753608f0))
* **resizer:** grid size fix for backend service with pagination disabled ([6c4bcca](https://github.com/ghiscoding/angular-slickgrid/commit/6c4bccaa4fdb877a4526c3feea42c7be469ba93e))
* **styling:** add missing SASS variable import ([6de44e6](https://github.com/ghiscoding/angular-slickgrid/commit/6de44e610696a2489d38e53d58bf808d60caaa37))
* **styling:** fix some styling issues found with menu dividers ([6f375c9](https://github.com/ghiscoding/angular-slickgrid/commit/6f375c9c9c71f73631685ab0bb8461f744c2e899))
* **test:** fix failing Cypress E2E test after GraphQL changes ([dc50117](https://github.com/ghiscoding/angular-slickgrid/commit/dc50117505dfad9bfa7f62befe42966d4963cac2))
* **test:** fix Jest failing unit test ([761fa4a](https://github.com/ghiscoding/angular-slickgrid/commit/761fa4ad91c44debd6ed3f3d2b2ed7d35bf906ae))

### [2.15.4](https://github.com/ghiscoding/angular-slickgrid/compare/v2.15.3...v2.15.4) (2020-01-10)


### Bug Fixes

* **build:** TS warning on a missing Type ([97b25f7](https://github.com/ghiscoding/angular-slickgrid/commit/97b25f72cd448a348f3adf1a795cfde541268621))

### [2.15.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.15.2...v2.15.3) (2020-01-10)


### Bug Fixes

* **styling:** use latest SlickGrid version and fix some styling issues ([dc0a688](https://github.com/ghiscoding/angular-slickgrid/commit/dc0a688cc982113ce298f9f22d6fecdc0e131b00))

### [2.15.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.15.1...v2.15.2) (2020-01-07)


### Bug Fixes

* **security:** update DOMpurify to fix potential xss vulnerability ([63c1ddc](https://github.com/ghiscoding/angular-slickgrid/commit/63c1ddc748932671c4b168fbeab09278715dfcf9))

### [2.15.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.15.0...v2.15.1) (2020-01-06)


### Features

* **styling:** add more SASS variables to header menu ([373641f](https://github.com/ghiscoding/angular-slickgrid/commit/373641f33f27eacec43068ed81aeb24d65d91601))

## [2.15.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.14.5...v2.15.0) (2020-01-06)


### Features

* **cellMenu:** starting adding new CellMenu Extension ([5ab64a1](https://github.com/ghiscoding/angular-slickgrid/commit/5ab64a12406ee7eb1374ca2d284250f12cea89c5))
* **github:** change issue templates and add auto close bot ([90271bf](https://github.com/ghiscoding/angular-slickgrid/commit/90271bf1fa5079f9a481f196717ee1d520e8a7ae))
* **menu:** add action & override callbacks to all Menu plugins ([a7967bb](https://github.com/ghiscoding/angular-slickgrid/commit/a7967bbae769b73f9a21e8454542a39b6a43660e))
* **menu:** add Context Menu feature POC ([8d04406](https://github.com/ghiscoding/angular-slickgrid/commit/8d04406545cb4687966784128bf8279055374b07))
* **menu:** starting adding new ContextMenu Extension ([95d3227](https://github.com/ghiscoding/angular-slickgrid/commit/95d322782f1eff77dc8e084a12ad6aab50c8bdb2))
* **styling:** change Column Picker & Grid Menu styling ([b9dc977](https://github.com/ghiscoding/angular-slickgrid/commit/b9dc977a03e9bd4ed1740430d1c22934453bc4a6))
* **styling:** change Column Picker & Grid Menu styling ([d91086b](https://github.com/ghiscoding/angular-slickgrid/commit/d91086bf1734b392adaf4c13cb5e42672cb5eb8e))


### Bug Fixes

* **graphql:** disable pagination should remove any page info from query ([63190c8](https://github.com/ghiscoding/angular-slickgrid/commit/63190c8bdca3312a317480772c48fdf7bd7edb50))
* **sort:** add sort icons to grouping examples ([0bb9844](https://github.com/ghiscoding/angular-slickgrid/commit/0bb98444a9be52d20e0f77e78b61c163ca7c0a82))
* **translations:** align all Export translations and add missing locales ([d3e45bc](https://github.com/ghiscoding/angular-slickgrid/commit/d3e45bc799aa7fad0b7fe615effd1a0a6b502786))

### [2.14.4](https://github.com/ghiscoding/angular-slickgrid/compare/v2.14.3...v2.14.4) (2019-12-06)


### Features

* **build:** add Build Demo site to CircleCI task ([62ed009](https://github.com/ghiscoding/angular-slickgrid/commit/62ed009c73c4d6b2f1583e2246da894b2f9c0538))


### Bug Fixes

* **backend:** make sure pagination object exist before using it ([07dbbb1](https://github.com/ghiscoding/angular-slickgrid/commit/07dbbb18622d8af02335bf58609fa3334e70c172))

### [2.14.3](https://github.com/ghiscoding/angular-slickgrid/compare/v2.14.2...v2.14.3) (2019-11-29)


### Bug Fixes

* **filter:** Date Filters using Flatpickr throw error w/invalid locale ([7c55a26](https://github.com/ghiscoding/angular-slickgrid/commit/7c55a26b35969d1071f3af28389564d6a39c6e4d)), closes [#346](https://github.com/ghiscoding/angular-slickgrid/issues/346)
* **filter:** default operator of input filter should be empty ([17c905d](https://github.com/ghiscoding/angular-slickgrid/commit/17c905da02fcf53c9c1ffac95569babbf09b4c80))
* **filter:** number filter condition, parse number before comparing ([55f5fc9](https://github.com/ghiscoding/angular-slickgrid/commit/55f5fc9e87a5f3d73cec680f0e19245a3e38d432))

### [2.14.2](https://github.com/ghiscoding/angular-slickgrid/compare/v2.14.1...v2.14.2) (2019-11-27)


### Features

* **tests:** add missing unit tests to have 100% test coverage ([99736fc](https://github.com/ghiscoding/angular-slickgrid/commit/99736fc39476428c08914aa4438af185642008d8))
* **tests:** add more unit tests & cleanup some code ([644e1dc](https://github.com/ghiscoding/angular-slickgrid/commit/644e1dc14b3bb09b29901955514c413639c51e0e))


### Bug Fixes

* **editor:** Select Editor with option "0" were incorrectly filtered out ([e116340](https://github.com/ghiscoding/angular-slickgrid/commit/e116340bbc0c2af17ba22b63053a886b220f48b7))

### [2.14.1](https://github.com/ghiscoding/angular-slickgrid/compare/v2.14.0...v2.14.1) (2019-11-26)


### Bug Fixes

* **filter:** updateFilters w/BackendService should call query only once ([8228799](https://github.com/ghiscoding/angular-slickgrid/commit/82287995eb103088d3acf671594363ad74059074))

## [2.14.0](https://github.com/ghiscoding/angular-slickgrid/compare/v2.13.1...v2.14.0) (2019-11-21)


### Features

* **cypress:** add Dynamic Filters feature E2E Cypress tests ([043ce89](https://github.com/ghiscoding/angular-slickgrid/commit/043ce895ba3b6db33de55b58378bb6f92a24ab9a))
* **filters:** allow to bypass changed events when calling updateFilters ([62c807e](https://github.com/ghiscoding/angular-slickgrid/commit/62c807e85a2c8203f32826075e271523f702a4c8))
* **filters:** provide method to apply grid filters dynamically ([8c10e5a](https://github.com/ghiscoding/angular-slickgrid/commit/8c10e5af9b34448c0d9cda6b42e4acc063074a68))
* **sorting:** allow to bypass changed events when calling updateSorting ([35936ad](https://github.com/ghiscoding/angular-slickgrid/commit/35936addc7d8b9287bb04c16489fbd927d5623ec))
* **sorting:** provide method to apply grid sorting dynamically ([9a99ca0](https://github.com/ghiscoding/angular-slickgrid/commit/9a99ca04b1d18624614a4f310e32a1f9f08ab654))
* **tests:** add Jest & Cypress tests for Dynamic Sorting feature ([d0fa65e](https://github.com/ghiscoding/angular-slickgrid/commit/d0fa65e186c77ffbfe1d471d580a926e299669f9))


### Bug Fixes

* **odata:** no single quote escape required for IN operator for non-string column ([6e4a855](https://github.com/ghiscoding/Angular-Slickgrid/pull/341/commits/6e4a85537dbb628c3f174d939fca888f7d443e45))
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
