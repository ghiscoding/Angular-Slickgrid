### Description
You can use and show the Custom Footer with 2 left/right containers and will by default display filtered item count & total count on the right side. Also if it detects that you use row selection, it will also show the row selection count on the left footer side. You can also override both left/right side texts.

**NOTE:** The Custom Footer cannot be used in combination with Pagination, you can only show 1 or the other.

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/formatter) / [Demo Component](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/examples/grid-formatter.component.ts)

### Usage

```ts
defineGrid() {
  this.columnDefinitions = [ /*...*/ ];

  this.gridOptions = {
    // ...
    showCustomFooter: true, // display some metrics in the bottom custom footer
    customFooterOptions: {
      // optionally display some text on the left footer container
      leftFooterText: 'Grid created with <a href="https://github.com/ghiscoding/slickgrid-universal" target="_blank">Slickgrid-Universal</a>',
      hideMetrics: false,
      hideTotalItemCount: false,
      hideLastUpdateTimestamp: false
    },
  };
}
```

#### CustomFooterOption Interface
Below is the list of all options available with the Custom Footer, you can visit the [customFooterOption.interface.ts](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/customFooterOption.interface.ts) to see latest code in case the code below is not up to date.
```ts
export interface CustomFooterOption {
  /** Optionally provide some text to be displayed on the left side of the footer (in the "left-footer" css class) */
  leftFooterText?: string;

  /** CSS class used for the left container */
  leftContainerClass?: string;

  /** Date format used when showing the "Last Update" timestamp in the metrics section. */
  dateFormat?: string;

  /** Defaults to 25, height of the Custom Footer in pixels, it could be a number (25) or a string ("25px") but it has to be in pixels. It will be used by the auto-resizer calculations. */
  footerHeight?: number | string;

  /**
   * Defaults to false, which will hide the selected rows count on the bottom left of the footer.
   * NOTE: if users defined a `leftFooterText`, then the selected rows count will NOT show up.
   */
  hideRowSelectionCount?: boolean;

  /** Defaults to false, do we want to hide the last update timestamp (endTime)? */
  hideLastUpdateTimestamp?: boolean;

  /**
   * Defaults to false, do we want to hide the metrics (right section) when the footer is displayed?
   * That could be used when we want to display only the left section with custom text
   */
  hideMetrics?: boolean;

  /** Defaults to false, do we want to hide the total item count of the entire dataset (the count exclude any filtered data) */
  hideTotalItemCount?: boolean;

  /** Defaults to "|", separator between the timestamp and the total count */
  metricSeparator?: string;

  /** Text shown in the custom footer on the far right for the metrics */
  metricTexts?: MetricTexts;

  /** CSS class used for the right container */
  rightContainerClass?: string;

  /** Optionally provide some text to be displayed on the right side of the footer (in the "right-footer" css class) */
  rightFooterText?: string;
}
```

#### Screenshot Demo
Below is a print screen of the demo, you can see the full advantage of the custom footer with custom text on the left and filtered item count + timestamp on the right.

![image](https://user-images.githubusercontent.com/643976/122082196-ca3e4380-cdcd-11eb-84ed-4d2f4eb8057b.png)