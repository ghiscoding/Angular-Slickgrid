## Version 5 - Better UI and Dark Mode with Pure CSS SVG icons ✨
This new release brings a lot of changes oriented towards better UI/UX, our SVG icons are now pure CSS and can be colorized like any other text via the native CSS `color` property (which helps a lot to improve the Dark Mode Theme).

Another noticeable UI change is the migration from [Flatpickr](https://flatpickr.js.org/) to [Vanilla-Calendar-Picker](https://github.com/ghiscoding/vanilla-calendar-picker) (which is a fork of [Vanilla-Calendar-Pro](https://vanilla-calendar.pro/) and we'll hopefully drop the fork in the near future if possible), there are multiple reasons to migrate our date picker to another library as shown below. Another change that is mostly internal but is also indirectly connected to the date picker is the migration from MomentJS to [Tempo](https://tempo.formkit.com/) which is modern and is packaged as ESM which is great for Tree Shaking.

##### Flatpickr cons:
  - barely supported (lots of opened PR but nothing merged for the past 2 years)
  - not fully ESM ready (it's only partially ESM, for example it is detected as CJS in Angular-Slickgrid and requires an exception in `allowedCommonJsDependencies`)
  - styling could be a bit more modern (the use of native select/input to change year/month/time is a bit outdated and basic)
  - date range selection is not very user friendly (UX)

##### Vanilla-Calendar (VC)
  - pros:
    - ESM ready
    - modern styling and also includes Dark Mode theme
    - date range selection is a lot easier by displaying 2 months at a time in the picker
  - cons:
    - build size is slightly larger but its UI/UX is awesome (especially when changing month/year)
    - settings are named differently and are not using flat config (complex object settings) and requires code change
      - for example Flatpickr `minDate: 'today'` is instead `range: { min: 'today' }` in VC
    - some settings were missing, like the `'today'` shortcut which is why I forked the VC project
      - I did open a few PRs on the main project, so the hope is to drop the fork in the future while being a totally transparent change to you when it happens.

To summarize, the goal of this new release was mainly to improve UI/UX (mostly for Dark Mode) and also to make it fully ESM ready. Also noteworthy, the project is smaller in size (~100Kb smaller) compared to what it was in v2.x (that was when the user had to install jQuery/jQueryUI separately). So, considering that we're no longer requiring the install of jQuery/jQueryUI, and also considering that these 2 dependencies had a total of well over 200kb. We can safely assume that our project build size is in fact a lot smaller than it was 2 years ago, that is really nice to know considering that we kept adding features (like Dark Mode and other features) while still decreasing its size over the years :)

With this release, and after 7 years of development as a 1 man show (myself @ghiscoding), I believe that I have achieved all goals and even more than I originally planned to accomplish. So with that being said, I am not foreseeing any new major releases for a while. As a recap, I think that the biggest challenge was the removal of jQuery/jQueryUI and transitioning to native code, that took 2-3 years to accomplish, and I am of course very proud to have achieved. All dependencies are now also all ESM and the project is now CSP compliant as well.

#### Major Changes - Quick Summary
- minimum requirements bump
  - Node v18.0+
  - Bootstrap v5.0+ (or any other UI framework)
  - SASS v1.35+ (`dart-sass`)
  - migrated from Flatpickr to Vanilla-Calendar (visit [Vanilla-Calendar-Pro](https://vanilla-calendar.pro/) for demos and docs)
  - migrated from MomentJS to [Tempo](https://tempo.formkit.com/) (by the FormKit
team)

> **Note** for the entire list of tasks & code changes applied in this release, you may want to take a look at the [Roadmap to 5.0](https://github.com/ghiscoding/slickgrid-universal/discussions/1482) Discussion.

For most breaking changes, a quick Search & Replace in your code editor should suffice.

> **Note:** if you come from an earlier version, please make sure to follow each migrations in their respected order (review previous migration guides)

## Changes

### Styling

#### CSS classes `.color-xx` are all removed (use `.text-color-xx` or native `color` instead)
> **Note** these extra colors are only available in the Material & Salesforce Themes (it is not included in the Bootstrap Theme since Bootstrap have their own coloring utils).

Since the SVG icons are now pure CSS, we can now colorize any of them the same way that we would do for any other text via the `color` CSS property 🌈. For that reason, we no longer need any of the `.color-xx` CSS classes (which were created via CSS [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)). They were useful to override the SVG icon colors (by using CSS `filter`), but since we can now use the regular CSS `color` property, the `color-xx` are no longer necessary and were all removed (just use `text-color-xx` instead or plain CSS `color`s).

```diff
<button class="button is-small">
-  <span class="mdi mdi-undo color-primary"></span>
+  <span class="mdi mdi-undo text-color-primary"></span>
   <span class="text-color-primary">Undo Last Edit</span>
</button>
```
or move the class to the parent container and have both the icon & the text `inherit` the color :)
```diff
+ <button class="button is-small text-color-primary">
-   <span class="mdi mdi-undo color-primary"></span>
+   <span class="mdi mdi-undo"></span>
-   <span class="text-color-primary">Undo Last Edit</span>
  </button>
```

#### SASS variables
A lot of SASS variables were changed, we recommend that you take a look at the [_variables.scss](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/styles/_variables.scss) file to compare them with your SASS overrides and fix any SASS build issues. For example a lot of the ms-select variables and all Flatpickr related variables were deleted (note that Vanilla-Calendar doesn't actually have any variables). Also a lot of the icon related variables were renamed and updated (icons now all have the suffix `-icon-svg-path` for the SVG vector path, you can easily change them with SASS).

> **Note** if you want to create your own SVGs icons in pure CSS, you could use the `generateSvgStyle()` SASS function from Slickgrid-Universal [`svg-utilities.scss`](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/styles/svg-utilities.scss) (take a look at the [`slickgrid-icons.scss`](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/styles/slickgrid-icons.scss) for some usage)

#### SASS (dart-sass) `math` polyfills are removed
When SASS (dart-sass) released their version 1.33 (~3 years ago), it caused a ton of console warnings (and a lot of unhappy users) in projects that were using `/` in their SASS files (for math division) instead of their new `math.div()` function. To avoid seeing all these warnings, I added a temporary polyfill at the time (that piece of code was actually copied from the Bootstrap project). That polyfill patch was put in place about 3 years ago, so I'm assuming that most users have already upgraded their SASS version and already fixed all of these warnings... So, I think it's now safe to remove this polyfill, because like I said earlier, it was really meant to be a temp patch. If you see any warnings coming back, then a suggestion would be to use the SASS CLI `--quiet-upstream` option.

For reference, below is an example of these old Math warnings which were coming up when using the SASS CLI

```sh
Recommendation: math.div($m, $columns)
More info and automated migrator: https://sass-lang.com/d/slash-div
╷
94 │ margin-right: $m / $columns * 100%
│ ^^^^^^^^^^^^^^^^^^
```

#### Font-Awesome references are all removed
Since this release introduces pure CSS SVG icons, I went ahead and deleted all Font-Awesome references (which were mostly in the Bootstrap Theme). The reason is simple, the built-in icons are now all pure CSS SVG icons (sort, grouping, row detail, row move, row selection). You can also change these icons via SASS (or CSS variables with a bit more work). However, please note that there are a few plugins which use external icons via CSS classes (mostly all menu plugins like Header Menu, Grid Menu, Content Menu, ...) and for that reason **all Styling Themes** now include the Slickgrid-Universal Material icons subset (~200 icons) by default (not just Material & Salesforce but now also the Bootstrap Theme as well). In short, the grid is now using SVG icons by default and Font-Awesome icons will no longer be used internally (you can still use it in your project but it won't be used by the grid itself unless you set them in your grid options).

If you no longer need Font-Awesome, then consider removing it completely

```diff
# package.json
{
  dependencies: {
-   "font-awesome": "^4.7.0"
  }
}
```

What if you don't want to use the [Slickgrid-Universal icons](https://ghiscoding.github.io/slickgrid-universal/#/icons) (`.mdi`) subset and would rather use a different font/SVG library? In that case, I would suggest that you use the "lite" Themes (which do not include the colors & icons subset) and then make sure to update all the menu plugins with the correct CSS classes. For example the global grid options of the Grid Menu is now configured with the following icon classes (notice that we no longer provide any Font-Awesome "fa" icon references in our global grid options). Also note that what is shown below is just 1 of the multiple menu plugins to configure, make sure to review them all (you can review the [global-grid-options.ts](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/global-grid-options.ts) file).

```ts
// default global grid options
export const GlobalGridOptions = {
  gridMenu: {
    iconCssClass: 'mdi mdi-menu',
    iconClearAllFiltersCommand: 'mdi mdi-filter-remove-outline',
    iconClearAllSortingCommand: 'mdi mdi-sort-variant-off',
    iconClearFrozenColumnsCommand: 'mdi mdi-pin-off-outline',
    iconExportCsvCommand: 'mdi mdi-download',
    iconExportExcelCommand: 'mdi mdi-file-excel-outline',
    iconExportTextDelimitedCommand: 'mdi mdi-download',
    iconRefreshDatasetCommand: 'mdi mdi-sync',
    iconToggleDarkModeCommand: 'mdi mdi-brightness-4',
    iconToggleFilterCommand: 'mdi mdi-flip-vertical',
    iconTogglePreHeaderCommand: 'mdi mdi-flip-vertical',
  },
  headerMenu: {
    // icon...
  }
}
```

and below is a quick snapshot of the file size diff with the "lite" themes (without icons) vs the default themes (with colors & icons subset). However note that the built-in icons are of course always included even in the "lite" themes.

![image](https://github.com/ghiscoding/Angular-Slickgrid/assets/643976/ea7542b9-3c7e-4a6f-ae4d-355138f74188)

### Deprecated code removed/renamed
##### `getHTMLFromFragment()` removed
The util `getHTMLFromFragment()` function was removed in favor of `getHtmlStringOutput()`, the new function will auto-detect if it's a DocumentFragment, an HTMLElement or an HTML string and will execute the appropriate action.

##### jQueryUI CSS classes leftovers
There were a few remaining traces of jQueryUI CSS classes like `.ui-state-default` and other similar classes in the core lib, they were all removed in this release. If you were querying any of them in CSS for styling purposes, you can simply rename them to `.slick-state-*`

```diff
- .ui-state-default, .ui-state-hover {
+ .slick-state-default, .slick-state-hover {
}
```

### Formatters Cleanup & Removals

Since we now use SVGs everywhere and we got rid of any Font usage (no more Font-Awesome code anywhere), the `checkmark` Formatter no longer has any reason to exist and was removed. If you were using it and still plan to use Font-Awesome in your project, then you'll have to either recreate the Formatter yourself or use alternatives. You could use the `Formatters.icon` or `Formatters.iconBoolean` which require the CSS classes to be provided via `params`. Or as a last alternative, and if you are importing the optional SVG icons `.mdi` subset, then we recommend you simply switch to the `checkmarkMaterial` Formatter.

```diff
this.columnDefinitions = [
  {
    id: 'isActive', name: 'Active', field: 'isActive',
-   formatter: Formatters.checkmark
+   formatter: Formatters.checkmarkMaterial
  },
];
```

or create a Custom Formatter

```ts
// create a custom Formatter and returning a string and/or an object of type FormatterResultObject
const myCheckmarkFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  // via native HTML (for CSP safe), you could also use our `createDomElement()` util for 1 liner
  const iconElm = document.createElement('i');
  iconElm.className = value ? 'mdi mdi-check' : '';
  return iconElm;

  // or via simple HTML string
  return value ? '<i class="mdi mdi-check"></i>' : '';
}
```

## Column Functionalities

### Native Select Filter (removed)
I would be very surprised if anyone had ever used the `Filters.select`, which was a native `<select>`, and so it was removed in this release. You should simply use the `Filters.singleSelect` or `Filters.multipleSelect`

```diff
prepareGrid() {
  this.columnDefinitions = [{
    id: 'isActive', name: 'Active', field: 'isActive',
    filter: {
-      model: Filters.select,
+      model: Filters.singleSelect,
       collection: [ { value: '', label: '' }, { value: true, label: 'true' }, { value: false, label: 'false' } ],
    }
  }];
}
```

### Date Editor/Filter
Since we migrated from Flatpicker to Vanilla-Calendar, this requires some changes on your side because the setting option names are different. Same changes will be required for both the Filter and the Editor.

The biggest change that you will most probably have to update is the min/max date setting when using the `'today'` shortcut as shown below:

```diff
- import { type FlatpickrOption } from '@slickgrid-universal/common';
+ import { type VanillaCalendarOption } from '@slickgrid-universal/common';

prepareGrid() {
  this.columnDefinitions = [{
    id: 'finish', field: 'finish', name: 'Finish',
    editor: {
      model: Editors.date,
-      editorOptions: { minDate: 'today' } as FlatpickrOption,
+      editorOptions: { range: { min: 'today' } } as VanillaCalendarOption,
    }
  }];
}
```

> **Note** the `'today'` shortcut currently only exist in `Vanilla-Calendar-Picker` fork (a PR has also been opened on the original lib), however the rest of the settings should be the same, visit `Vanilla-Calendar-Pro` [settings](https://vanilla-calendar.pro/docs/reference/additionally/settings) website for all other options. The hope is to hopefully drop the fork whenever the original project receives all missing features.

> **Note** to keep docs available for older as well as newer versions, I renamed the old one doc as [Date-Picker (flatpickr)](https://ghiscoding.gitbook.io/slickgrid-universal/column-functionalities/editors/date-editor-flatpickr) and created a new one named [Date-Picker (vanilla-calendar)](https://ghiscoding.gitbook.io/slickgrid-universal/column-functionalities/editors/date-editor-vanilla-calendar).

### `internalColumnEditor` is completely removed
The work on this subject started over a month ago in version [v4.6.0](https://github.com/ghiscoding/slickgrid-universal/releases/tag/v4.6.0) to progressively remove `internalColumnEditor` because it was confusing and with this new release, it is now completely removed. This mean that the column `editor` property will remain untouched (in previous releases, the `editor` was moved to an `internalColumnEditor` prop and `editor` was then overriden with the `editor.model` and that was for SlickGrid to work properly... but that was extremely confusing to the user). So in short, the `internalColumnEditor` is now completely removed and the associated confusion is also gone with it.

A good example of the previous `internalColumnEditor` usage, was when you wanted to modify or push a new item to the editor collection array (see below). In the past, you could not simply push to the `collection.editor.collection` because the property was swapped internally. What you really had to do was to use the mapped `collection.internalColumnEditor.collection` 😵... and this is now thankfully gone, you can now use the same and original `collection.editor.collection` 👍

For example, previously, to add an item to the editor/filter collection
```diff
this.columnDefinitions = [{ id: 'complexity', editor: { model: Editors.singleSelect, collection: [{ value: 1, label: 'Simple' }, { value: 2, label: 'Hard' }] } }];

// then adding an item was previously requiring to use the `internalColumnEditor`
// that is, after the grid init our `editor` became `internalColumnEditor
- const complexityEditor = this.columnDefinitions[0].internalColumnEditor;
complexityEditor.collection.push({ value: 9, label: 'Hard' });

// NOW with this new release, adding a new item to the collection is as simple as referencing the original object
+ const complexityEditor = this.columnDefinitions[0].editor;
complexityEditor.collection.push({ value: 9, label: 'Hard' });
```

if you want to reference the Editor class (e.g. `Editors.longText`), you can now get it from either `column.editor.model` or `column.editorClass`

## Grid Functionalities

### Sanitizer (DOMPurify)
`DOMPurify` is now completely optional via the `sanitizer` grid option and you must now provide it yourself. The main reason to make it optional is because even though most users would prefer to use `dompurify`, some might prefer to use `isomorphic-dompurify` for SSR support. Consider that it is now optional, you could also technically speaking skip the `sanitizer` configuration completely, but that is not at all recommended.

> **⚠ Note** even if the `sanitizer` is now optional, we **strongly suggest** that you configure it as a global grid option to avoid any XSS attacks from your data and also to remain CSP compliant. Also note that for Salesforce users, you do not have to configure it since Salesforce already use DOMPurify internally.

```diff
// prefer the global grid options if possible
this.gridOptions = {
  sanitizer: (dirtyHtml) => DOMPurify.sanitize(dirtyHtml, { ADD_ATTR: ['level'], RETURN_TRUSTED_TYPE: true })
};
```

> **Note** If you're wondering about the `ADD_ATTR: ['level']`, the "level" is a custom attribute used by SlickGrid Grouping/Draggable Grouping to track the grouping level depth and it must be kept for the group indentation to work properly.

### From MomentJS to [Tempo](https://tempo.formkit.com/)
I really wanted to replace MomentJS for a long timeeee... (it's been deprecated for years and is CJS only), but it was really hard to find a good replacement (I tried many alternatives like `DayJS`, `Luxon`, `date-fns` and they all had problems at least for a datagrid use case where parsing & formatting is important)... and here comes [Tempo](https://tempo.formkit.com/)! With Tempo, I was finally able to migrate by taking advantage of their `parse()` and `format()` functions, which are the most important in a datagrid usage. The library also has plenty of extra, and optional, functions as well, for example `addDay()`, `diffDays()`, ... Another great thing about Tempo is that they use the same format/parse [tokens](https://tempo.formkit.com/#format-tokens) as MomentJS, so the conversion on that side was super easy.

The migration to Tempo should be transparent to most users like you. **However** if you are currently using MomentJS in your project, then I would suggest you to consider trying [Tempo](https://tempo.formkit.com/) in order to modernize your project and also lower your dependencies count. The other great advantage of Tempo is that it's ESM and it helped a lot in decreasing our build size footprint because ESM also means that it is Tree Shakable (only import and build what you use). By using Bundlephobia and comparing [@slickgrid-universal@4.7.0](https://bundlephobia.com/package/@slickgrid-universal/common@4.7.0) we can see that `moment-mini` is taking 41.5Kb, while Tempo takes only 16.6Kb in [@slickgrid-universal@5.0.0](https://bundlephobia.com/package/@slickgrid-universal/common@5.0.0), that is a decrease of almost 25Kb (ESM makes a huge difference).

### Smaller Size - Full ESM

To compare size, you can take a look at BundlePhobia for the older [v1.4.0](https://bundlephobia.com/package/@slickgrid-universal/common@1.4.0) (when we required jQuery/jQueryUI) and [v5.0.0](https://bundlephobia.com/package/@slickgrid-universal/common@1.4.0) and you'll see that the gzip version went down by 17Kb (or 8.9%) and that's just for 1 dependency of the Slickgrid-Universal workspace (there's a few more installed behind the scene, like the footer component, binding, utils, ...). From that website you can also see that removing MomentJS & Flatpickr had a significant impact especially since the replacements are ESM and tree shakable.
