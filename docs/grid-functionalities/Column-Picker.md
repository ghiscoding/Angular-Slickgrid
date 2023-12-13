## Column Picker
Enable by default and provides the list of available fields by simply doing a `right+click` over any column header, you can then hide/show the column(s) you want. 

#### Grid Options
To enable/disable the Column Picker, simply call the `enableColumnPicker` flag in the Grid Options (enabled by default).

```ts
this.gridOptions = {
  enableColumnPicker: true,

  // you can also enable/disable options and also use event for it
  columnPicker: { 
    hideForceFitButton: true, 
    hideSyncResizeButton: true, 
    onColumnsChanged: (e, args) => { 
      console.log('Column selection changed from Column Picker, visible columns: ', args.visibleColumns); 
    } 
  },
}
```
#### UI Sample
![image](https://user-images.githubusercontent.com/643976/71301681-6cfc3a00-2370-11ea-9c84-be880f345bcd.png)