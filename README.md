# Angular-Slickgrid
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![npm version](https://badge.fury.io/js/angular-slickgrid.svg)](//npmjs.com/package/angular-slickgrid)
[![NPM downloads](https://img.shields.io/npm/dt/angular-slickgrid.svg)](https://npmjs.org/package/angular-slickgrid)

One of the best javascript datagrid [SlickGrid](https://github.com/mleibman/SlickGrid) which was originally developed by @mleibman is now available to Angular. I have used a few datagrids and slickgrid beats most of them in terms of functionalities and performance (it can easily deal with even a million row).

### Angular Compatibility
- version `1.x.x` for Angular 4 to 6 
   - Angular 6, is only supported through `rxjs-compat` as shown in this [post](https://github.com/ghiscoding/Angular-Slickgrid/issues/36#issuecomment-395710915). It's preferable to upgrade to Angular 7+ as soon as possible. 
- version `2.x.x` for Angular 7+

### SlickGrid Source
We will be using [6pac SlickGrid fork](https://github.com/6pac/SlickGrid/), this the most active fork since the original @mleibman fork was closed some time ago by his author personal reasons. Also worth to know, I also contributed a lot to that fork to benefit Angular-Slickgrid.

### Goal
The goal is of course to be able to run SlickGrid within Angular 4+ but also to incorporate as much as possible the entire list of functionalities (and more) that SlickGrid offers (you can see a vast list of samples on the [6pac SlickGrid examples](https://github.com/6pac/SlickGrid/wiki/Examples) website).

### NPM Package
[Angular-Slickgrid on NPM](https://www.npmjs.com/package/angular-slickgrid)

### Demo page
`Angular-Slickgrid` supports both `Bootstrap 3` and `Bootstrap 4`, you can see a demo of each one below.
- [Bootstrap 3 demo](https://ghiscoding.github.io/Angular-Slickgrid) / [examples repo](https://github.com/ghiscoding/Angular-Slickgrid/tree/master/src/app/examples)
- [Bootstrap 4 demo](https://ghiscoding.github.io/angular-slickgrid-bs4-demo) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-bs4-demo/tree/master/src/app/examples)

#### Working Demo
For a complete and working local demo, you can clone the [Angular-Slickgrid Bootstrap 4](https://github.com/ghiscoding/angular-slickgrid-bs4-demo) repository. That repo is updated frequently and is the actual [Bootstrap 4 demo](https://ghiscoding.github.io/angular-slickgrid-bs4-demo).
```bash
git clone https://github.com/ghiscoding/angular-slickgrid-bs4-demo
npm install
npm start
```

#### Material Theme
Technically speaking, `Material` theme is not provided, but it should still work. 
The styling might need some adjustments to make it look like `Material` but there's over 300+ [SASS variables](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/dist/styles/sass/_variables.scss), 
so I'm sure making a Material Theme is totally doable and if you do, please contribute it as a new theme to the project. Thank you. 

### Installation
Refer to the [Wiki - HOWTO Step by Step](https://github.com/ghiscoding/angular-slickgrid/wiki/HOWTO---Step-by-Step)

## Wiki / Documentation
The Wiki is where all the documentation and instructions will go, so please consult the [Angular-Slickgrid - Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki) before opening any issues. The [Wiki - HOWTO](https://github.com/ghiscoding/Angular-Slickgrid/wiki/HOWTO---Step-by-Step) is a great place to start with. You can also take a look at the [Demo page](https://ghiscoding.github.io/Angular-Slickgrid), it includes sample for most of the features and it keeps growing (so you might want to consult it whenever a new version comes out).

## Main features
You can see some screenshots below and the instructions down below.

See a quick look at the features that `angular-slickgrid` brings (on top of Slickgrid itself):
- Easier use of SlickGrid within `Angular` as it is just a component (simply pass a column definitions and a dataset and you're good to go)
- Bootstrap Theme with SASS variables for extra customization (if you create a new theme, then please make a PR)
- Auto-resize (boolean flag), will resize the datagrid viewport with available space even on browser resize (basically takes available space of it's container)
- Inline Editors (number, float, text, longText, date picker, ... you can also create your own custom ones)
- Formatters to display something different in UI. For example, a boolean flag can be shown as a Font-Awesome checkmark icon
- Filters & Compound Filters (input text, single & multi select, slider, auto-complete, & even custom filter)
  - input text also support operators at the beginning of the input text:
    - `<`, `<=`, `>`, `>=`, `<>`, `!=`, `==`, `*`
    - `*` can be used for startsWith and endsWith
- Grouping & Aggregators
- Grouping by Column Dragging
- Support all the SlickGrid [Controls](https://github.com/6pac/SlickGrid/tree/master/controls) and [Plugins](https://github.com/6pac/SlickGrid/tree/master/plugins)
- Row(s) Selection
- Row Detail View
- Server side (backend) Services (filtering, sorting, pagination)
    - [GraphQL](https://github.com/ghiscoding/Angular-Slikgrid/wiki/GraphQL)
    - [OData](https://github.com/ghiscoding/Angular-Slickgrid/wiki/OData)
- Some Features of SlickGrid itself which are working out of the gate
  - Formatters (a few default ones were added, and you can easily create custom ones too)
  - Optimized DataView which brings a lot of functionalities (sort, grouping, and more)
    - even server side data is saved into the SlickGrid DataView
  - Expose all the [SlickGrid Events](https://github.com/6pac/SlickGrid/wiki/Grid-Events), see the [Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-&-DataView-Events)
- Localization support with `ngx-translate`, please read the [Wiki - Localization](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Localization)
- [Export to File](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Export-to-File) CSV or Text file (Tab Delimited or Semicolon Delimited)
  - support Unicode as well, even unicorn emoji shows up in the export and it even works with IE11.
- Pinned (aka frozen) Columns/Rows, see the [Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Pinned-(aka-Frozen)-Columns-Rows)

## Missing features
What if `Angular-Slickgrid` is missing feature(s) versus the original `SlickGrid`?

Fear not and simply and use the `SlickGrid` and `DataView` objects, just like in the core lib, these are exposed  through Event Emitters. For more info continue reading on [Wiki - SlickGrid & DataView objects](/ghiscoding/Angular-Slickgrid/wiki/SlickGrid-&-DataView-Objects) and [Wiki - Grid & DataView Events](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-&-DataView-Events)

### License
[MIT License](LICENSE)

## Use it, like it?
You like and use this great library `Angular-Slickgrid`? You can always upvote :star: and/or contribute :)

## Like my work?
If you like my work, you can also support me with caffeine :smile:
[Buy Me a Coffee](https://ko-fi.com/N4N679OT)

## Screenshots

Screenshots from the demo app with the `Bootstrap` theme (that is the only available theme, but there is a lot of SASS variables to make it look like Material, or other theme if you wish to. If you create a new theme, please submit a PR).

### Slickgrid example with Formatters (last column shown is a custom Formatter)

#### You can also see the Grid Menu opened (aka hambuger menu)

![Default Slickgrid Example](/screenshots/formatters.png)

### Filter and Sort (clientside with DataView)

![Slickgrid Server Side](/screenshots/filter_and_sort.png)

### Editors and/or onCellClick

![Editors](/screenshots/editors.png)

### Pinned (aka frozen) Columns/Rows

![Slickgrid Server Side](/screenshots/frozen.png)

### Slickgrid Example with Server Side (Filter/Sort/Pagination)
#### Comes with OData & GraphQL support (you can implement custom too)

![Slickgrid Server Side](/screenshots/pagination.png)
