# Angular-Slickgrid
One of the best javascript datagrid [SlickGrid](https://github.com/mleibman/SlickGrid) which was originally developed by @mleibman is now available to Angular. I have used a few datagrids and slickgrid beats most of them in terms of functionalities and performance (it can easily deal with even a million row).

### SlickGrid Source
We will be using [6pac SlickGrid fork](https://github.com/6pac/SlickGrid/) (the most active fork since the original @mleibman fork was closed some time ago by his author personal reasons).

### Goal
The goal is of course to be able to run SlickGrid within Angular 4+ but also to incorporate as much as possible the entire list of functionalities (and more) that SlickGrid offers (you can see a vast list of samples on the [6pac SlickGrid examples](https://github.com/6pac/SlickGrid/wiki/Examples) website).

### Demo page
[https://ghiscoding.github.io/Angular-Slickgrid](https://ghiscoding.github.io/Angular-Slickgrid)

### NPM Package
[Angular-Slickgrid on NPM](https://www.npmjs.com/package/angular-slickgrid)

### Installation
Refer to the [Wiki - HOWTO Step by Step](https://github.com/ghiscoding/angular-slickgrid/wiki/HOWTO---Step-by-Step)

## Wiki / Documentation
The Wiki is where all the documentation and instructions will go, so please consult the [Angular-Slickgrid - Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki) before opening any issues. The [Wiki - HOWTO](https://github.com/ghiscoding/Angular-Slickgrid/wiki/HOWTO---Step-by-Step) is a great place to start with. You can also take a look at the [Demo page](https://ghiscoding.github.io/Angular-Slickgrid), it includes sample for most of the features and it keeps growing (so you might want to consult it whenever a new version comes out).


## Main features
You can see some screenshots below and the instructions down below.

This is a work in progress, but so far here are some of the features that `angular-slickgrid` brings (on top of Slickgrid itself):
- Easier use of SlickGrid within `Angular` as it is just a component (simply pass a column definitions and a dataset and you're good to go)
- Bootstrap Theme with SASS variables for extra customization (if you create a theme, then please make a PR)
- Auto-resize (boolean flag), will resize the datagrid viewport with available space even on browser resize (basically takes available space of it's container)
- Inline Editors (number, float, text, longText, date, ... you can also create your own custom ones)
- Formatters to display something different in UI, for example a boolean flag can be shown as a Font-Awesome checkmark icon
- Filters (input text, select, multi-select, single-select & even custom filter)
  - input text also support operators at the beginning of the input text:
    - `<`, `<=`, `>`, `>=`, `<>`, `!=`, `==`, `*`
    - `*` can be used for startsWith and endsWith
- Support all the SlickGrid [Controls](https://github.com/6pac/SlickGrid/tree/master/controls) and [Plugins](https://github.com/6pac/SlickGrid/tree/master/plugins)
- Row(s) Selection
- Server side (backend) Services (filtering, sorting, pagination)
    - [GraphQL](https://github.com/ghiscoding/Angular-Slikgrid/wiki/GraphQL)
    - [OData](https://github.com/ghiscoding/Angular-Slickgrid/wiki/OData)
- Some Features of SlickGrid itself which are working out of the gate
  - Sort/Multi-Sort (client/server side)
  - Header Row with Filters (currently support `Input` and `Select` dropdown, multi-select is planned)
  - Formatters (a few default ones were added, and you can easily create custom ones too)
  - Optimized DataView which brings a lot of functionalities (sort, grouping, and more)
    - even server side data is saved into the SlickGrid DataView
  - All the [SlickGrid Events](https://github.com/6pac/SlickGrid/wiki/Grid-Events) are supported, see the [Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-&-DataView-Events)
- Localization support with `ngx-translate`, please read the [Wiki - Localization](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Localization)
- Export to CSV, Tab Delimited or Semicolon Delimited
- ... more to come

## Missing features (planned items, not necessarily in order of execution)
The following are SlickGrid features which are not yet included in this library but will be in the eventual future.

- Grouping

**NOTE**
What if `Angular-Slickgrid` is missing feature(s) versus the original `SlickGrid`? Fear not and directly use the `SlickGrid` and `DataView` objects that are expose from the start through Event Emitters. For more info continue reading on [Wiki - SlickGrid & DataView objects](/ghiscoding/Angular-Slickgrid/wiki/SlickGrid-&-DataView-Objects) and [Wiki - Grid & DataView Events](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-&-DataView-Events)

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

![Default Slickgrid Example](/screenshots/formatters.png)

### Filter and Sort (clientside with DataView)

![Slickgrid Server Side](/screenshots/filter_and_sort.png)

### Slickgrid Example with Server Side (Filter/Sort/Pagination)

![Slickgrid Server Side](/screenshots/pagination.png)