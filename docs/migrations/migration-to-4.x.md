**NOTE:** if you come from an earlier 2.x version, you first have to follow the [Migration Guide to 3.x](https://github.com/ghiscoding/angular-slickgrid/wiki/Migration-to-3.x), if that is too much work, you can always go the easy route to simply clone the [Angular-Slickgrid-Demos](https://github.com/ghiscoding/angular-slickgrid-demos)

## Major Changes List
- [controls/plugins (extensions)](#slickgrid-controlsplugins-extensions)... read below for more info
  - replace Grid Menu `customItems` by `commandItems`, see [here](#grid-menu-customitems-renamed-to-commanditems)
  - remove all `image` options in favor of CSS classes only, see [here](#images-are-removed-in-favor-of-css-classes)
- [CSS/SASS Styling Changes](#csssass-styling-changes)


### @deprecated Code (removed)
##### Grid Menu / Column Picker
- `onColumnsChanged` removed `columns` property from Column Picker options, rename to `visibleColumns` instead.
- `onColumnsChanged` removed `columns` property from Grid Menu options, rename to `visibleColumns` instead.
##### Tree Data
- removed `findItemInHierarchicalStructure()` method, use `findItemInTreeStructure` instead.

## Changes

### SlickGrid Controls/Plugins (Extensions)
Every SlickGrid controls/plugins were rewritten and moved into Slickgrid-Universal (prior to this new release, we were using them directly from SlickGrid repo and we had Extension bridges/wrappers in Slickgrid-Universal but that is now thing of the past since their entire code exist in Slickgrid-Universal), they were also rewritten as plain vanilla JS (basically there's no more jQuery code with exception of Draggable Grouping which still require jQueryUI). It's also much easier to maintain (we no longer have to wait for the SlickGrid project to release a version) and we can also modify and add extra features, styling, etc...

Because of all the rewriting, it makes sense to rename the method `getSlickgridAddonInstance` to `getExtensionInstanceByName` and it now returns the instance directly **and** as a bonus it now also automatically infers the correct return instance class as well.

Here's an example of the code change that you need to do
```diff
 toggleGridMenu(e: Event) {
    if (this.angularGrid?.extensionService) {
-     const gridMenuInstance = this.angularGrid.extensionService.getSlickgridAddonInstance(ExtensionName.gridMenu); // return type was `any`
+     const gridMenuInstance = this.angularGrid.extensionService.getExtensionInstanceByName(ExtensionName.gridMenu); // return type now infers `SlickGridMenu` instance
      gridMenuInstance.showGridMenu(e);
    }
  }

```

#### Grid Menu `customItems` renamed to `commandItems`
Replace all `custom...` properties to `command...` properties to align with all other menu plugins (CellMenu, ContextMenu, GridMenu, HeaderMenu are all using commands)
- replace `customItems` by `commandItems`
- replace `customTitle` by `commandTitle`
- replace `customTitleKey` by `commandTitleKey`

#### Images are removed in favor of CSS classes
Another change possible the full plugin rewrite, all images related code were removed in favor of CSS classes only (that already existed and was always favored).

- removed `deleteIconImage`, just use `deleteIconCssClass` instead.
- removed `groupIconImage`, just use `groupIconCssClass` instead.
- removed `buttonImage`, just use `buttonCssClass` instead.
- removed `iconImage`, just use `iconCssClass` instead
- removed `image`, just use `cssClass` instead

##### What if you still want images?
If you really want to use image, you can still work around that the new limitation by adding a CSS class similar to this:
`background-image: url(images/my-image.gif);`

## CSS/SASS Styling Changes
#### All SASS variables were renamed to add the `$slick-...` prefix
- the prefix is to avoid conflicts with other frameworks (CSS variables were already including this prefix, so no changes there)
- there is only 1 small exception with `$primary-color` (to avoid too many styling changes) but even then there's also a new variable `$slick-primary-color`

#### Simplify CSS
To simplify and merge all menu styling together (now doable since all controls/plugins now exists in the lib source code), all the following CSS class names got changed with what is shown below
- rename `title` to `slick-menu-title` (to avoid other framework conflicts)
- rename `slick-cell-menu-command-list` to `slick-menu-command-list`
- rename `slick-cell-menu-option-list` to `slick-menu-option-list`
- rename `slick-cell-menu-item` to `slick-menu-item`
- rename `slick-cell-menu-content` to `slick-menu-content`
- rename `slick-context-menu-command-list` to `slick-menu-command-list`
- rename `slick-context-menu-option-list` to `slick-menu-option-list`
- rename `slick-context-menu-item` to `slick-menu-item`
- rename `slick-context-menu-content` to `slick-menu-content`
- rename `slick-header-menu-item` to `slick-menu-item`
- rename `slick-header-menu-content` to `slick-menu-content`
- rename `slick-grid-menu-item` to `slick-menu-item`
- rename `slick-grid-menu-content` to `slick-menu-content`
- rename `slick-grid-menu-command-list` to `slick-menu-command-list`
- rename `slick-grid-menu-option-list` to `slick-menu-option-list`
- rename `slick-grid-menu-list` to `slick-column-picker-list`
- rename `slick-columnpicker` to `slick-column-picker`
- rename `slick-columnpicker-list` to `slick-column-picker-list`
- remove or rename `slick-gridmenu-list` to `slick-column-picker-list`
   - we merge the Column Picker & Grid Menu column picker classes, read the note below

#### NOTE: for simplification, it also means that all SASS/CSS variables got merged as well (e.g.: `$slick-cell-menu-item-disabled-color` got merged to a common `$slick-menu-item-disabled-color`), another change was to merge all the Grid Menu column picker & Column Picker variables with same styling (e.g.: `$slick-grid-menu-checkbox-icon-checked` is now `$slick-column-picker-checkbox-icon-checked` for both extensions)