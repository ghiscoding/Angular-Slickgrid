#### index
- [Default Usage](#default-usage)
- [Action Callback Methods](#action-callback-methods-preferred-approach)
- [Override Callback Methods](#override-callback-methods)
- [How to add Translations](#how-to-add-translations)
- [How to Disable Cell Menu](#how-to-disable-the-cell-menu)
- [UI Sample](#ui-sample)

### Demo
[Demo](https://ghiscoding.github.io/slickgrid-universal/#/example12) / [Demo Component](https://github.com/ghiscoding/slickgrid-universal/blob/master/examples/webpack-demo-vanilla-bundle/src/examples/example12.ts)

### Description
A Cell Menu, most often used as an Action Menu and is more oriented on a row action (e.g. delete current row), it could be defined on 1 or more columns (defined in a column definition) and is triggered by a cell click or touch. The menu can show a list of Commands (to execute an action) and/or Options (to change the value of a field). Also note that the Commands list is following the same structure used in the [Context Menu](../grid-functionalities/Context-Menu.md), [Header Menu](../grid-functionalities/Header-Menu-&-Header-Buttons.md) & [Grid Menu](../grid-functionalities/Grid-Menu.md). The Cell Menu is very similar to the [Context Menu](../grid-functionalities/Context-Menu.md), both were create as SlickGrid plugins during the same period, their main difference is that they get triggered differently (cell click vs mouse right+click) and they serve different purposes. The Cell Menu is more oriented on a row action (e.g. delete current row) while the Context Menu is all about actions for the entire grid (e.g. export to Excel).

This extensions is wrapped around the new SlickGrid Plugin **SlickCellMenu**

### Default Usage
To use the Cell Menu, you will need to enable it in the Grid Options and also define its structure in the chose column. You can customize the menu with 2 different lists, Commands and/or Options, they can be used separately or at the same time (same as [Context Menu](../grid-functionalities/Context-Menu.md)). However please note that you will also need to use a Custom Formatter to display the Action button/text, it's easy enough as you can see below. Also note that even though the code shown below makes a separation between the Commands and Options, you can mix them in the same Cell Menu.

#### with Commands
```ts
this.columnDefinitions = [
  { id: 'firstName', field: 'firstName', name: 'First Name' },
  { id: 'lastName', field: 'lastName', name: 'Last Name' },
  // ... more column defs
  {
    id: 'action', name: 'Action', field: 'action', width: 110, maxWidth: 200,
    excludeFromExport: true,    // you typically don't want this column exported
    formatter: actionFormatter, // your Custom Formatter
    cellMenu: {
      commandTitle: 'Commands', // optional title
      commandItems: [
        // array of command item objects, you can also use the "positionOrder" that will be used to sort the items in the list
        {
          command: 'command1', title: 'Command 1', positionOrder: 61,
          // you can use the "action" callback and/or use "onCommand" callback from the grid options, they both have the same arguments
          action: (e, args) => {
            console.log(args.dataContext, args.column); // action callback.. do something
          }
        },
        { command: 'help', title: 'HELP', iconCssClass: 'fa fa-question-circle', positionOrder: 62 },
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
  }
]
```

#### with Options
That is when you want to define a list of Options (only 1 list) that the user can choose from and once an option is selected we would do something (for example change the value of a cell in the grid).
```ts
this.columnDefinitions = [
  { id: 'firstName', field: 'firstName', name: 'First Name' },
  { id: 'lastName', field: 'lastName', name: 'Last Name' },
  // ... more column defs
  {
    id: 'action', name: 'Action', field: 'action', width: 110, maxWidth: 200,
    excludeFromExport: true,    // you typically don't want this column exported
    formatter: actionFormatter, // your Custom Formatter
    cellMenu: {
      optionTitle: 'Change Effort Driven Flag', // optional, add title
      optionItems: [
        { option: true, title: 'True', iconCssClass: 'fa fa-check-square-o' },
        { option: false, title: 'False', iconCssClass: 'fa fa-square-o' },
        { divider: true, command: '', positionOrder: 60 },
      ],
      // subscribe to Context Menu onOptionSelected event (or use the "action" callback on each option)
      action: (e, args) => {
        console.log(args.dataContext, args.column); // action callback.. do something
      }
    }
  }
};
```

### Action Callback Methods (preferred approach)
There are 2 ways to execute an action after a Command is clicked (or an Option is selected), you could do it via the `action` callback or via the `onCommand` callback. You might be wondering why 2 and what's the difference? Well, the `action` would have to be defined on every single Command/Option while the `onCommand` (or `onOptionSelected`) is more of a global subscriber which gets triggered every time any of the Command/Option is clicked/selected, so for that, you would typically need to use `if/else` or a `switch/case`... hmm ok but I still don't understand when would I use the `onCommand`? Let say you combine the Cell Menu with the [Context Menu](../grid-functionalities/Context-Menu.md) and some of the commands are the same, well, in that case, it might be better to use the `onCommand` and centralize your commands in that callback, while in most other cases if you wish to do only 1 thing with a command, then using the `action` might be better. Also, note that they could also both be used if you wish.

So if you decide to use the `action` callback, then your code would look like this
##### with `action` callback
```ts
this.columnDefinitions = [
  { id: 'action', field: 'action', name: 'Action',
    cellMenu: {
      commandItems: [
        { command: 'command1', title: 'Command 1', action: (e, args) => console.log(args) },
        { command: 'command2', title: 'Command 2', action: (e, args) => console.log(args) }
        // ...
      ]
    }
  }
];
```

##### with `onCommand` callback
The `onCommand` (or `onOptionSelected`) **must** be defined in the Grid Options

```ts
this.columnDefinitions = [
  { id: 'action', field: 'action', name: 'Action',
    cellMenu: {
      commandItems: [
        { command: 'command1', title: 'Command 1' },
        { command: 'command2', title: 'Command 2' }
        // ...
      ]
    }
  }
];

this.gridOptions = {
  enableCellMenu: true,
  cellMenu: {
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
};
```

### Override Callback Methods
What if you want to dynamically disable or hide a Command/Option or even disable the entire menu in certain circumstances? For these cases, you would use the override callback methods, the method must return a `boolean`. The list of override available are the following
- `menuUsabilityOverride` returning false would make the Cell Menu unavailable to the user
- `itemVisibilityOverride` returning false would hide the item (command/option) from the list
- `itemUsabilityOverride` return false would disabled the item (command/option) from the list
  - **note** there is also a `disabled` property that you could use, however it is defined at the beginning while the override is meant to be used with certain logic dynamically.

For example, say we want the Cell Menu to only be available on the first 20 rows of the grid, we could use the override this way
```ts
this.columnDefinitions = [
  { id: 'action', field: 'action', name: 'Action',
    cellMenu: {
      menuUsabilityOverride: (args) => {
        const dataContext = args && args.dataContext;
        return (dataContext.id < 21); // say we want to display the menu only from Task 0 to 20
      },
    }
  }
];
```

To give another example, with Options this time, we could say that we enable the `n/a` option only when the row is Completed. So we could do it this way
```ts
this.columnDefinitions = [
  { id: 'action', field: 'action', name: 'Action',
    cellMenu: {
      optionItems: [
      {
        option: 0, title: 'n/a', textCssClass: 'italic',
        // only enable this option when the task is Not Completed
        itemUsabilityOverride: (args) => {
          const dataContext = args && args.dataContext;
          return !dataContext.completed;
        },
        { option: 1, iconCssClass: 'fa fa-star-o yellow', title: 'Low' },
        { option: 2, iconCssClass: 'fa fa-star-half-o orange', title: 'Medium' },
        { option: 3, iconCssClass: 'fa fa-star red', title: 'High' },
      ]
    }
  }
];
```

### How to add Translations?
It works exactly like the rest of the library when `enableTranslate` is set, all we have to do is to provide translations with the `Key` suffix, so for example without translations, we would use `title` and that would become `titleKey` with translations, that;'s easy enough. So for example, a list of Options could be defined as follow:
```ts
this.columnDefinitions = [
  { id: 'action', field: 'action', name: 'Action',
    cellMenu: {
      optionTitleKey: 'COMMANDS', // optionally pass a title to show over the Options
      optionItems: [
        { option: 1, titleKey: 'LOW', iconCssClass: 'fa fa-star-o yellow' },
        { option: 2, titleKey: 'MEDIUM', iconCssClass: 'fa fa-star-half-o orange' },
        { option: 3, titleKey: 'HIGH', iconCssClass: 'fa fa-star red' },
      ]
    }
  }
];
```

### How to Disable the Cell Menu?
You can disable the Cell Menu, by calling `enableCellMenu: false` from the Grid Options.
```ts
this.gridOptions = {
   enableCellMenu: false
};
```

### UI Sample
![image](https://user-images.githubusercontent.com/643976/71301668-3aead800-2370-11ea-8ae5-acd124aff054.png)