You can style any (or all) of the Filter(s) when they have value, the lib will automatically add a `filled` CSS class which you can style as you see fit. There is no style by default, if you wish to add styling, you will be required to add your own.

## Styled Example
![grid_filled_styling](https://user-images.githubusercontent.com/643976/51334569-14306d00-1a4e-11e9-816c-439796eb8a59.png)

## Code example
For example, the print screen shown earlier was styled using this piece of SASS (`.scss`) code. You can customize the styling to your liking.

```scss
$slick-filled-filter-color:       $slick-form-control-focus-border-color;
$slick-filled-filter-border:      $slick-form-control-border;
$slick-filled-filter-box-shadow:  $slick-form-control-focus-border-color;
$slick-filled-filter-font-weight: 400;

.slick-headerrow {
  input.search-filter.filled,
  .search-filter.filled input,
  .search-filter.filled .date-picker input,
  .search-filter.filled .input-group-addon.slider-value,
  .search-filter.filled .input-group-addon.slider-range-value,
  .search-filter.filled .input-group-addon select {
    color: $slick-filled-filter-color;
    font-weight: $slick-filled-filter-font-weight;
    border: $slick-filled-filter-border;
    box-shadow: $slick-filled-filter-box-shadow;
    &.input-group-prepend {
      border-right: 0;
    }
    &.input-group-append {
      border-left: 0;
    }
  }
  .search-filter.filled .input-group-prepend select {
    border-right: 0;
  }
  .search-filter.filled .ms-choice {
    box-shadow: $slick-filled-filter-box-shadow;
    border:$slick-filled-filter-border;
    span {
      font-weight: $slick-filled-filter-font-weight;
      color: $slick-filled-filter-color;
    }
  }
}
```
