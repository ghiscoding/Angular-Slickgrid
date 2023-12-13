#### index
- [Using built-in Themes](#using-built-in-themes)
- [Bare and Lite versions](#bare-and-lite-versions)
- [Using SVG with SASS](#using-custom-svgs-with-sass)
- [How to change SVG color?](#how-to-change-svg-color)
- [List of included Material SVG Icons](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/styles/material-svg-icons.scss)
  - We only included the most popular icons, about 100 out of the 4000 available [Material Design icons](https://materialdesignicons.com/)
- [SVG Colors CSS Classes](#svg-colors---css-classes)

### Description
Angular-Slickgrid was built with a Font set, mainly Font-Awesome 4, and if you use SASS it was easy enough to replace Font-Awesome to any other Font based set. The question is how do we use SVG instead of a Font? Most frameworks are switching to SVGs instead of Fonts (for smaller size and also efficiency). Angular-Slickgrid now has 2/3 Styling Themes that support SVGs which are Material Design & Salesforce Themes. These 2 new Themes use a subset of [Material Design Icons](https://materialdesignicons.com/) SVGs (even a portion of the Salesforce theme). There are no Font-Awesome 5, I wouldn't mind adding a new Theme for that and if you wish to contribute then please open a new issue.

If you use SASS, you will find out that it's super easy to use either (Font) or (SVG), you simply have to replace the SASS necessary variables, more on that later.

### Demo
- Material Theme - [demo](https://ghiscoding.github.io/Angular-Slickgrid/#/tree-data-parent-child)
- Salesforce Theme - [demo](https://ghiscoding.github.io/Angular-Slickgrid/#/tree-data-hierarchical)

### Using built-in Themes
The Material & Salesforce Themes are now using SVGs for the icons used by the grid. Each built-in Themes have CSS and SASS files associated with each theme. To take benefit of this, just import whichever CSS/SASS file associated with the Theme you wish to use.

##### with CSS
```scss
/* style.css */
@import 'angular-slickgrid/styles/css/slickgrid-theme-bootstrap.css';

// or other Themes
// @import 'angular-slickgrid/styles/css/slickgrid-theme-material.css';
// @import 'angular-slickgrid/styles/css/slickgrid-theme-salesforce.css';
```

##### with SASS
```scss
/* change any SASS variables before loading the theme */
$slick-primary-color: green;

/* style.scss */
@import 'angular-slickgrid/styles/sass/slickgrid-theme-bootstrap.scss';

// or other Themes
// @import 'angular-slickgrid/styles/sass/slickgrid-theme-material.scss';
// @import 'angular-slickgrid/styles/sass/slickgrid-theme-salesforce.scss';
```

### Bare and Lite versions
If you wish to have a lighter CSS file and not include the `colors.scss` shown below, you could use the new `bare` versions which doesn't include any non-essential styling (it doesn't have any SVG/Color, Flatpickr & Multiple-Select styling, e.g. `slickgrid-theme-material.bare.css`),  there's also a `lite` version which is roughly the same as the `bare` version except that it adds the SVG/Colors to it (e.g. `slickgrid-theme-material.lite.css`) while the regular version have it all that is (SVG/Color, Flatpickr & Multiple-Select styling, e.g.`slickgrid-theme-material.css`). 

### Using Custom SVGs with SASS
You could use Custom SVGs and create your own Theme and/or a different set of SVG Icons, each of the icons used in Angular-Slickgrid has an associated SASS variables which allow you to override any one of them. All grid of the icons are loaded with the `content` property of the `:before` pseudo (for example, see this [line](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/modules/angular-slickgrid/styles/slick-bootstrap.scss#L323)) and the difference between Font and SVG is simple, if you want to use a Font then you use the Font unicode but if you want an SVG then you use a `url` with `svg+xml` as shown below. 

##### with Font
```scss
$slick-primary-color: blue;
$slick-icon-sort-color:       $slick-primary-color
$slick-icon-sort-asc:         "\f0d8";
$slick-icon-sort-desc:        "\f0d7";
$slick-icon-sort-font-size:   13px;
$slick-icon-sort-width:       13px;

// then on the last line, import the Theme that you wish to override
@import 'angular-slickgrid/styles/sass/slickgrid-theme-bootstrap.scss';
```

##### with SVG
```scss
// a simple utility that will encode a color with hash sign into a valid HTML URL (e.g. #red => %23red)
// you could also skip the use of this and simply manually change # symbol to %23
@import 'angular-slickgrid/styles/sass/sass-utilities';

$slick-primary-color: blue;

$slick-icon-sort-color:       $slick-primary-color
$slick-icon-sort-asc:         url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="#{encodecolor($slick-icon-sort-color)}" viewBox="0 0 24 24"><path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"></path></svg>');
$slick-icon-sort-desc:        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="#{encodecolor($slick-icon-sort-color)}" viewBox="0 0 24 24"><path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"></path></svg>');
$slick-icon-sort-font-size:   13px;
$slick-icon-sort-width:       13px;

// then on the last line, import the Theme that you wish to override
@import 'angular-slickgrid/styles/sass/slickgrid-theme-material.scss';
```

### How to change SVG color?
#### The following works for both CSS and SASS
So there's a known caveat with using embedded SVG (which is what this lib does), you can only add color once with the `fill` property and for that I added SASS variables for each icon (for example `$slick-icon-sort-color` for the Sort icon color, or `$slick-icon-color` for all icons) but once you do that it will apply that same color across the document (want it or not).

##### for CSS and SASS
After lot of research, I found a way to hack it via this SO answer [change any SVGs color via CSS `filter`](https://stackoverflow.com/a/53336754/1212166), for example if we wish to apply a red color on the `mdi-close` icon (for the Draggable Grouping feat), we'll have to do this `filter`
```css
.slick-groupby-remove.mdi-close {
  /* close icon - red */
  filter: invert(32%) sepia(96%) saturate(7466%) hue-rotate(356deg) brightness(97%) contrast(120%);
}
```
You might be thinking, like I did, but how to get this long `filter` calculation???
For that you can visit the following blog post and use its **[color filter converter](https://dev.to/jsm91/css-filter-generator-to-convert-from-black-to-target-hex-color-188h)** that was posted to answer this SO [question](https://stackoverflow.com/q/42966641/1212166)

##### for SASS only
There is also a SASS Mixin to convert the color using only SASS as posted [here](https://stackoverflow.com/a/62880368/1212166) in the same SO question. That will be part of the lib soon enough and we'll be able to use it this way (much cleaner):
```scss
.slick-groupby-remove.mdi-close {
  /* close icon - red */
  @include recolor(#ff0000, 0.8);
}
```
Note that even though the code looks smaller and more human readable, in reality the code produced will still be a `filter`

`@include recolor(#ff0000, 0.8);` will in fact be converted to `filter: invert(32%) sepia(96%) saturate(7466%) hue-rotate(356deg) brightness(97%) contrast(120%);`

### SVG Colors - CSS Classes
To help with all of this, we added a few icon colors (basically took the same colors used by Bootstrap [here](https://getbootstrap.com/docs/4.5/utilities/colors/) using CSS `filter` and we also added a `light` and `dark` shades for of each colors (except `color-light`, `color-dark` since there's no need), they both use a 6% lighter/darker shades (you can override the shade with `$color-lighten-percentage` and the same for darken). These colors can be used with the `color-X` (for example `color-primary`), also note that the primary color will follow your `$slick-primary-color` that you might have override (it could also be different in each styling theme, shown below is the Salesforce theme colors). If you find that the colors are not exactly the colors you're looking for, we've also took some colors taken from [UiKit](https://getuikit.com/) and tagged them as `color-alt-X`.

**NOTE:** You can use these colors on Icon and/or Text **but** remember that we're using CSS `filter` here which is very different compare to using regular CSS `color` or `background-color`.
 
**NOTE 2:** The `colors.scss` is **only** included in the Material and Salesforce Themes since those are the only 2 themes currently using SVGs. If you wish to use these colors then simply add the necessary css/scss file.

![image](https://user-images.githubusercontent.com/643976/90325971-5b475280-df50-11ea-9791-f02ea33af2d8.png)

```scss
// SASS colors 
$color-primary: $slick-primary-color;
$color-secondary: #6c757d;
$color-success: #28a745;
$color-danger: #dc3545;
$color-warning: #ffc107;
$color-info: #17a2b8;
$color-light: #f8f9fa;
$color-dark: #343a40;
$color-body: #212529;
$color-muted: #6c757d;
$color-white: #ffffff;
$color-alt-default: #1e87f0;
$color-alt-warning: #faa05a;
$color-alt-danger: #f0506e;
$color-alt-success: #32d296;

// lighter/darker shades
$color-lighten-percentage: 6%;
$color-darken-percentage: 6%;
```

##### HTML Color Test
```html
<div>
  <span class="color-primary">color-primary <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-primary-light">color-primary-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-primary-dark">color-primary-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-secondary">color-secondary <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-secondary-light">color-secondary-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-secondary-dark">color-secondary-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-success">color-success <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-success-light">color-success-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-success-dark">color-success-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-danger">color-danger <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-danger-light">color-danger-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-danger-dark">color-danger-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-warning">color-warning <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-warning-light">color-warning-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-warning-dark">color-warning-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-info">color-info <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-info-light">color-info-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-info-dark">color-info-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-body">color-body <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-body-light">color-body-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-body-dark">color-body-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-muted">color-muted <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-muted-light">color-muted-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-muted-dark">color-muted-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-dark">color-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div style="background-color: rgb(34, 34, 34)">
  <span class="color-light">color-light <i class="mdi mdi-help-circle"></i></span>
</div>
<div style="background-color: rgb(34, 34, 34)">
  <span class="color-white">color-white <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-alt-default">color-alt-default <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-alt-default-light">color-alt-default-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-alt-default-dark">color-alt-default-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-alt-warning">color-alt-warning <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-alt-warning-light">color-alt-warning-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-alt-warning-dark">color-alt-warning-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-alt-success">color-alt-success <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-alt-success-light">color-alt-success-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-alt-success-dark">color-alt-success-dark <i class="mdi mdi-help-circle"></i></span>
</div>
<div>
  <span class="color-alt-danger">color-alt-danger <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-alt-danger-light">color-alt-danger-light <i class="mdi mdi-help-circle"></i></span> -
  <span class="color-alt-danger-dark">color-alt-danger-dark <i class="mdi mdi-help-circle"></i></span>
</div>
```