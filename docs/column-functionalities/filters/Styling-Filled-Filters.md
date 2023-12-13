You can style any (or all) of the Filter(s) when they have value, the lib will automatically add a `filled` CSS class which you can style as your wish. There is no style by default, if you wish to add styling, you will be required to add your own. 

## Styled Example 
![grid_filled_styling](https://user-images.githubusercontent.com/643976/51334569-14306d00-1a4e-11e9-816c-439796eb8a59.png)

## Code example
For example, the print screen shown earlier was styled using this piece of SASS (`.scss`) code. Also note that the demo adds a Font-Awesome icon which can be used with `font-family: "FontAwesome"` and the relevent unicode character, for example the filter icon is `content: " \f0b0"`. You can basically add a lot of different styling to your populated filters. 

```scss
$filter-filled-bg-color: darkorange;

.search-filter.filled {
  // color: rgb(189, 104, 1);
  // font-weight: bold;
  background-color: $filter-filled-bg-color;
  .ms-choice {
    // color: rgb(189, 104, 1);
    // font-weight: bold;
    background-color: $filter-filled-bg-color;
  }


  input, input.flatpickr-input {
    // border: 1px solid darken(rgb(204, 204, 204), 15%) !important;
    // color: rgb(189, 104, 1);
    // font-weight: bold;
    background-color: $filter-filled-bg-color !important;
  }
  /*
  &.ms-parent, .flatpickr > input, .input-group > input {
    border: 1px solid darken(rgb(204, 204, 204), 15%) !important;
  }
  */

  div.flatpickr:after, button > div:after, & + span:after, .input-group > span:after {
    font-family: "FontAwesome";
    font-size: 75%;
    content: " \f0b0";
    position: absolute;
    top: 2px;
    right: 5px;
    z-index: 1000;
    color: #ca880f;
  }

  .ms-choice > div:after {
    top: -4px;
    right: 16px;
  }
  & + span:after {
    top: 6px;
    right: 10px;
  }
}
```
