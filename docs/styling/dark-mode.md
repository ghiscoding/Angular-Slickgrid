## Dark Mode

When enabled (defaults to false), it will show the grid in Dark Mode by adding `slick-dark-mode` CSS class to the grid. Note that it is defined as a grid option because the grid uses a few elements that could be appended to the DOM `body` (e.g. ColumnPicker, GridMenu, LongTextEditor, CompositeEditorModal, ...) and when Dark Mode is enabled, it needs to inform all of these features that we are using Dark Mode (or Light Mode by default). So whenever any of these features are in play, and before it is appended to the `body`, it will add a `slick-dark-mode` (or `ms-dark-mode` for ms-select) CSS class to that element to let it know that we are in Dark Mode.


### Toggle Light/Dark Mode

You can easily toggle light/dark mode by using `grid.setOptions()`

```ts
export class MyDemo {
  isDarkModeEnabled = false;
  gridOptions: GridOption;

  prepareGrid() {
    this.gridOptions = {
      // ...
      darkMode: this.isDarkModeEnabled;
    }
  }

  toggleDarkMode() {
    this.isDarkModeEnabled = !this.isDarkModeEnabled;
    this.sgb.slickGrid?.setOptions({ darkMode: this.isDarkModeEnabled });

    // optionally update your local grid options as well
    this.gridOptions = { ...this.gridOptions, darkMode: this.isDarkModeEnabled };
  }
}
```

### How to Auto-Detect Dark Mode?

By default the grid will **not** automatically enable Dark Mode, neither read the browser's color scheme (the reason are mentioned in the description above). However, you could implement your own code to detect the color scheme (for modern browser only) when loading your browser and set it in your grid options. You can see a demo of that in the first grid of [Example 1](https://ghiscoding.github.io/Angular-Slickgrid/#/basic)

```ts
export class MyDemo {
  gridOptions: GridOption;

  // auto-detect browser's color scheme function
  isBrowserDarkModeEnabled() {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  prepareGrid() {
    this.gridOptions = {
      // ...
      darkMode: this.isBrowserDarkModeEnabled();
    }
  }
}
```

### Composite Editor Modal (for Bootstrap users)

For `Bootstrap` users, it will also require the developer to add a `data-bs-theme="dark"` attribute which is also another reason why we added `darkMode` as a grid option. So for Bootstrap users, you will have to add this required attribute by yourself for the Dark Mode to display properly. If you forget to add this attribute, you might see some of the filter inputs and other sections displayed with a white background instead of an expected dark gray backgroud.

> **Note** the `onRendered` is a new lifecycle callback of Composite Editor Modal that was added specifically for this Bootstrap use case

```ts
this.compositeEditorInstance?.openDetails({
  // ...
  onRendered: (modalElm) => modalElm.dataset.bsTheme = 'dark',
});
```

### Grid Menu
By default there is no command for toggling the Dark Mode from the Grid Menu, however you can show the command at any time via the following settings:

```ts
export class MyDemo {
  isDarkModeEnabled = false;

  defineGrid() {
    this.gridOptions = {
      darkMode: this.isDarkModeEnabled,
      gridMenu: {
        hideToggleDarkModeCommand: false, // hidden by default

        // you can optionally add extra command to toggle your own page styling as well
        onCommand: (_, args) => {
          // ...
        },

        // you can also change the icon and/or command name
        iconToggleDarkModeCommand: 'mdi mdi-brightness-4',
        commandLabels: {
          toggleDarkModeCommand: 'Toggle Dark Mode',
        },
      }
    };
  }
}
```

### Tweaking Some Colors

The Dark Mode Theme was created by setting a few CSS variables, in some cases you might need to tweak some of these variables. Take a look at the Slickgrid-Universal [CSS variables](https://github.com/ghiscoding/slickgrid-universal/blob/670946dcedd330a70d2e88127a0042474e7a5348/packages/common/src/styles/_variables.scss#L976-L985) to see which variables were reassigned. Also note that if you're using other Themes like Material or Salesforce, then there's also other variables that are set (see [Material variables](https://github.com/ghiscoding/slickgrid-universal/blob/670946dcedd330a70d2e88127a0042474e7a5348/packages/common/src/styles/_variables-theme-material.scss#L159-L189) or [Salesforce variables](https://github.com/ghiscoding/slickgrid-universal/blob/670946dcedd330a70d2e88127a0042474e7a5348/packages/common/src/styles/_variables-theme-salesforce.scss#L202-L219))

> **Note** to support both Light and Dark Mode in the same Theme, we use CSS variables **only**. There some dedicated SASS variables for Dark Mode but very few, you can see them from the `_variables.scss` file at this [line](https://github.com/ghiscoding/slickgrid-universal/blob/dc5d402db61460a25e8921efeebda37ac1c18791/packages/common/src/styles/_variables.scss#L944-L953), if that is not enough then you'll want to override some colors for Dark Mode via the CSS variables. The best way to find the CSS variable assigned is to simply use your browser's debugger tool (F12).
