#### index
- [Default Usage](#default-usage)
- [Action Callback Methods](#action-callback-methods)
- [Override Callback Methods](#override-callback-methods)
- [How to add Translations](#how-to-add-translations)
- [Default Internal Commands](#default-internal-commands)
- [Show only over Certain Columns](https://github.com#show-menu-only-over-certain-columns)
- [How to Disable Context Menu](#how-to-disable-the-context-menu)
- [UI Sample](#ui-sample)

### Demo

#### Context Menu with Grouping
[Context Menu Demo](https://ghiscoding.github.io/Angular-Slickgrid/#/context) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-contextmenu.component.ts)

[Grouping Demo](https://ghiscoding.github.io/Angular-Slickgrid/#/grouping) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-grouping.component.ts)

### Description
A Context Menu is triggered by a mouse right+click and can show a list of Commands (to execute an action) and/or Options (to change the value of a field). The lib comes with a default list of custom commands (copy cell, export & grouping commands). Also note that the Commands list is following the same structure used in the [Cell Menu](../column-functionalities/Cell-Menu.md), [Header Menu](Header-Menu-&-Header-Buttons.md) & [Grid Menu](Grid-Menu.md). Very similar to the [Cell Menu](../column-functionalities/Cell-Menu.md), they were both created as SlickGrid plugins during the same period, their main difference is that they get triggered differently (mouse right+click vs cell click) and they serve different purposes. The Cell Menu is more oriented on a row action (e.g. delete current row) while the Context Menu is all about actions for the entire grid (e.g. export to Excel).

This extensions is wrapped around the new SlickGrid Plugin **SlickContextMenu**

### Default Usage
Technically, the Context Menu is enabled by default (copy, export) and so you don't have anything to do to enjoy it (you could disable it at any time). However, if you want to customize the content of the Context Menu, then continue reading. You can customize the menu with 2 different lists, Commands and/or Options, they can be used separately or at the same time. Also note that even though the code shown below makes a separation between the Commands and Options, you can mix them in the same Context Menu.

#### with Commands

```ts
this.gridOptions = {
  enableFiltering: true,
  enableContextMenu: true, // enabled by default
  contextMenu: {
    hideCloseButton: false,
    commandTitle: 'Commands', // optional, add title
    commandItems: [
      'divider',
      { divider: true, command: '', positionOrder: 60 },
      {
        command: 'command1', title: 'Command 1', positionOrder: 61,
        // you can use the "action" callback and/or use "onCommand" callback from the grid options, they both have the same arguments
        action: (e, args) => {
          console.log(args.dataContext, args.column); // action callback.. do something
        }
      },
      { command: 'help', title: 'HELP', iconCssClass: 'mdi mdi-help-circle', positionOrder: 62 },
      // you can add sub-menus by adding nested `commandItems`
      {
         // we can also have multiple nested sub-menus
         command: 'export', title: 'Exports', positionOrder: 99,
         commandItems: [
           { command: 'exports-txt', title: 'Text (tab delimited)' },
           {
              command: 'sub-menu', title: 'Excel', cssClass: 'green', subMenuTitle: 'available formats', subMenuTitleCssClass: 'text-italic orange',
              commandItems: [
                { command: 'exports-csv', title: 'Excel (csv)' },
                { command: 'exports-xlsx', title: 'Excel (xlsx)' },
             ]
           }
         ]
      },
    ],
  }
};
```

#### with Options
That is when you want to define a list of Options (only 1 list) that the user can choose from and once is selected we would do something (for example change the value of a cell in the grid).

```ts
this.gridOptions = {
  contextMenu: {
    hideCloseButton: false,
    optionTitle: 'Change Effort Driven Flag', // optional, add title
    optionItems: [
      { option: true, title: 'True', iconCssClass: 'mdi mdi-check-box-outline' },
      { option: false, title: 'False', iconCssClass: 'mdi mdi-checkbox-blank-outline' },
      { divider: true, command: '', positionOrder: 60 },
    ],
    // subscribe to Context Menu onOptionSelected event (or use the "action" callback on each option)
    onOptionSelected: (e, args) => {
      // change Priority
      const dataContext = args && args.dataContext;
      if (dataContext && dataContext.hasOwnProperty('priority')) {
        dataContext.priority = args.item.option;
        this.sgb.gridService.updateItem(dataContext);
      }
    },
  }
};
```

### Action Callback Methods
There are 2 ways to execute an action after a Command is clicked (or an Option is selected), you could do it via the `action` callback or via the `onCommand` callback. You might be wondering why 2 and what's the difference? Well the `action` would have to be defined on every single Command/Option while the `onCommand` (or `onOptionSelected`) is more of a global subscriber which gets triggered every time any of the Command/Option is clicked/selected, so for that, you would typically need to use `if/else` or a `switch/case`... hmm ok but I still don't understand when would I use the `onCommand`? Let say you combine the Context Menu with the (Action) [Cell Menu](Cell-Menu.md) and some of the commands are the same, well, in that case, it might be better to use the `onCommand` and centralize your commands in that callback, while in most other cases if you wish to do only 1 thing with a command, then using the `action` might be better. Also, note that they could also both be used at the same time if you wish.

So if you decide to use the `action` callback, then your code would look like this
##### with `action` callback

```ts
contextMenu: {
  commandItems: [
    { command: 'command1', title: 'Command 1', action: (e, args) => console.log(args) }
    { command: 'command2', title: 'Command 2', action: (e, args) => console.log(args) }
    // ...
  ]
}
```

##### with `onCommand` callback
```ts
contextMenu: {
  commandItems: [
    { command: 'command1', title: 'Command 1' }
    { command: 'command2', title: 'Command 2' }
    // ...
  ],
  onCommand(e, args) => {
    const columnDef = args.columnDef;
    const command = args.command;
    const dataContext = args.dataContext;

    switch (command) {
      case 'command1': alert('Command 1'); break;
      case 'command2': alert('Command 2'); break;
      default: break;
    }
  }
}
```

### Override Callback Methods
What if you want to dynamically disable or hide a Command/Option or even disable the entire menu in certain circumstances? For these cases, you would use the override callback methods, the method must return a `boolean`. The list of override available are the following
- `menuUsabilityOverride` returning false would make the Context Menu unavailable to the user
- `itemVisibilityOverride` returning false would hide the item (command/option) from the list
- `itemUsabilityOverride` return false would disabled the item (command/option) from the list
  - **note** there is also a `disabled` property that you could use, however it is defined at the beginning while the override is meant to be used with certain logic dynamically.

For example, say we want the Context Menu to only be available on the first 20 rows of the grid, we could use the override this way

```ts
contextMenu: {
  menuUsabilityOverride: (args) => {
    const dataContext = args && args.dataContext;
    return (dataContext.id < 21); // say we want to display the menu only from Task 0 to 20
  },
},
```

To give another example, with Options this time, we could say that we enable the `n/a` option only when the row is Completed. So we could do it this way
```ts
contextMenu: {
  optionItems: [
    {
      option: 0, title: 'n/a', textCssClass: 'italic',
      // only enable this option when the task is Not Completed
      itemUsabilityOverride: (args) => {
        const dataContext = args && args.dataContext;
        return !dataContext.completed;
      },
    },
    { option: 1, iconCssClass: 'mdi mdi-star-outline yellow', title: 'Low' },
    { option: 2, iconCssClass: 'mdi mdi-star orange', title: 'Medium' },
    { option: 3, iconCssClass: 'mdi mdi-star red', title: 'High' },
  ]
}
```

### How to add Translations?
It works exactly like the rest of the library when `enableTranslate` is set, all we have to do is to provide translations with the `Key` suffix, so for example without translations, we would use `title` and that would become `titleKey` with translations, that;'s easy enough. So for example, a list of Options could be defined as follow:
```ts
contextMenu: {
  optionTitleKey: 'COMMANDS', // optionally pass a title to show over the Options
  optionItems: [
    { option: 1, titleKey: 'LOW', iconCssClass: 'mdi mdi-star-outline yellow' },
    { option: 2, titleKey: 'MEDIUM', iconCssClass: 'mdi mdi-star orange' },
    { option: 3, titleKey: 'HIGH', iconCssClass: 'mdi mdi-star red' },
  ]
}
```

### Show Menu only over Certain Columns
Say you want to show the Context Menu only when the user is over certain columns of the grid. For that, you could use the `commandShownOverColumnIds` (or `optionShownOverColumnIds`) array, by default these arrays are empty and when that is the case then the menu will be accessible from any columns. So if we want to have the Context Menu available only over the first 2 columns, we would have an array of those 2 column ids. For example, the following would show the Context Menu everywhere except the last 2 columns (priority, action) since they are not part of the array.
```ts
cellMenu: {
  commandShownOverColumnIds: ['title', 'percentComplete', 'start', 'finish', 'completed'. /* 'priority', 'action' */],
}
```

### Default Internal Commands
By defaults, the Context Menu will come with a few different preset Commands (copy, export). The Copy is straightforward, it allows you to copy the cell value, on the other hand, the export command(s) is dependent on the flags you have enabled in your Grid Options. For example, if you have only `enableExport` then you will get the `Export to CSV` and you might get as well `Export Tab-Delimited`, again that depends on which Grid Options you have enabled. Note that all internal commands have a `positionOrder` in the range of 50 to 60 (which is used to sort the Commands list), this allows you to append or prepend Commands to the list.

Another set of possible Commands would be related to Grouping, so if you are using Grouping in your grid then you will get 3 extra Commands (clear grouping, collapse groups, expand groups).

All of these internal commands, you can choose to hide them and/or change their icons, the default global options are the following and you can change any of them.
```ts
contextMenu: {
  autoAdjustDrop: true,
  autoAlignSide: true,
  hideCloseButton: true,
  hideClearAllGrouping: false,
  hideCollapseAllGroups: false,
  hideCommandSection: false,
  hideCopyCellValueCommand: false,
  hideExpandAllGroups: false,
  hideExportCsvCommand: false,
  hideExportExcelCommand: false,
  hideExportTextDelimitedCommand: true,
  hideMenuOnScroll: true,
  hideOptionSection: false,
  iconCopyCellValueCommand: 'mdi mdi-content-copy',
  iconExportCsvCommand: 'mdi mdi-download',
  iconExportExcelCommand: 'mdi mdi-file-excel-outline text-success',
  iconExportTextDelimitedCommand: 'mdi mdi-download',
  width: 200,
},
```

### How to Disable the Context Menu?
You can disable the Context Menu, by calling `enableContextMenu: false` from the Grid Options.
```typescript
this.gridOptions = {
   enableContextMenu: false
};
```

### UI Sample
![image](https://user-images.githubusercontent.com/643976/71301652-024afe80-2370-11ea-909d-bb802d69edc1.png)
