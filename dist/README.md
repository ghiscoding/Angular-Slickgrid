# Angular-Slickgrid
One of the best javascript datagrid [SlickGrid](https://github.com/mleibman/SlickGrid) which was originally developed by @mleibman is now available to Angular. I have used a few datagrids and slickgrid beats most of them in terms of functionalities and performance (it can easily deal with even a million row).

### SlickGrid Source
This is a clone of the [6pac SlickGrid fork](https://github.com/6pac/SlickGrid/) (the most active fork since @mleibman closed his fork for personal reasons).

### Goal
The goal is of course be able to run SlickGrid within Angular 4+ but also to incorporate as much as possible the entire list of functionalities that SlickGrid offers (you can see the entire list of examples from [6pac SlickGrid examples](https://github.com/6pac/SlickGrid/wiki/Examples) website).

## Screenshots

Screenshots from the demo app with the `Bootstrap` theme.

**Default Slickgrid example**
![Default Slickgrid Example](/screenshots/example1.png)

**Slickgrid Example with Server Side (sorting/pagination)**
![Slickgrid Server Side](/screenshots/exampleServerSide.png)

<a name="main-features"></a>
## `Aurelia-Slickgrid` - Main features
This is a work in progress, but so far here is some of the features that `aurelia-slickgrid` brings (on top of Slickgrid itself):
- Easier use of `plugin()` within `Aurelia`
- Auto-resize datagrid viewport with available space (basically take space available by the given div container)
- Server side sorting
- Server side pagination (pager is an Aurelia custom element)
- ... more to come

## How to use Aurelia-Slickgrid?
`Aurelia-Slickgrid` is a wrapper of `Slickgrid-ES6` with extra features (like grid autoResize, backend sorting/pagination). These extra features (specifically coded for Aurelia) are under `SlickgridService`, however all the classes of `Slickgrid-ES6` are also available. The full list of classes that are available from `aurelia-slickgrid` are:

```javascript
import {Slick, SlickService, Editors, Formatters, Data, Grid, FrozenGrid, Plugins} from 'aurelia-slickgrid';
```

## Installation
You can run the examples or build your own by doing the following.

### Aurelia-CLI / Webpack
```bash
npm install --save aurelia-slickgrid
```
#### Aurelia-CLI
For `CLI` you will need to add both plugins (`aurelia-slickgrid` and `slickgrid-es6`) to your `aurelia.json` file
```javascript
{
  "name": "aurelia-slickgrid",
  "path": "../node_modules/aurelia-slickgrid/dist/amd",
  "main": "index",
  "resources": ["**/*.{css,html}"]
},
{
    "name": "slickgrid-es6",
    "path": "../node_modules/angular-slickgrid-es6/dist",
    "main": "slick.es6.min",
    "resources": ["**/*.{css,html}"]
}
```

#### Aurelia (main)
Make the plugin available globally in your `main.js` file.
```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-slickgrid')
    .feature('resources');

  aurelia.start().then(() => aurelia.setRoot());
}
```
And finally use it your code
```javascript
import {inject} from 'aurelia-framework';
import {SlickService} from 'aurelia-slickgrid';

@inject(SlickService)
export class List {
  gridOptions = {}; // define your grid Options
  gridColumns = {}; // define your grid columns

  constructor(slickService) {
    this.slickgrid = slickService;
  }

  attached() {
    this.slickgrid.createGrid('myGrid', this.gridColumns, this.gridOptions, data);
  }
}
```

## Examples
I now have a working set of 10 Examples (however 4 & 6 are broken because of Plugins that is not bundled correctly in `Slickgrid-ES6`).

### Aurelia-CLI
```bash
git clone https://github.com/ghiscoding/aurelia-slickgrid
cd aurelia-slickgrid/client-cli
npm install
au run --watch
```

### Aurelia-Webpack
```bash
git clone https://github.com/ghiscoding/aurelia-slickgrid
cd aurelia-slickgrid/client-wp
npm install
npm start
```

## Styling
Load the default Bootstrap theme style
### css
Default compiled `css`
```html
<!-- Bootstrap theme -->
<link rel="stylesheet" type="text/css" href="../node_modules/aurelia-slickgrid/dist/styles/css/slickgrid-theme-bootstrap.css">

<!-- OR the default old slickgrid theme -->
<link rel="stylesheet" type="text/css" href="../node_modules/aurelia-slickgrid/dist/styles/css/slickgrid.css">
```
### scss (SASS)
You could also compile the SASS file with your customization, for that simply load the `_slick-grid-variables.scss` variable file then the main `slickgrid.scss` which should call the variables.

## Notes
If you are not intending to use any features (described in [Main Features](#main-features)), then you could simply your code by calling `Slickgrid-ES6` functionalities directly. For example
```javascript
import {Grid} from 'slickgrid-es6';
...
this.grid = new Grid(`#myGrid`, this.data, this.columnDefinition, this.gridOptions);
```