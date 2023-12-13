## Overview

The data is passed to the grid via the constructor and can also be accessed using the `setData(data)` and `getData()` methods.  Data itself can be either an array-like object with a `length` property and an indexer (`data[index]`) or a custom data provider implementing the following interface:

* `getLength()` - returns the number of data items in the set
* `getItem(index)` - returns the item at a given index
* `getItemMetadata(index)` - returns the metadata for the item at a given index (optional)

## Item Metadata

`getItemMetadata` provides a powerful way of specifying additional information about a data item that let the grid customize the appearance and handling of a particular data item.  The method should return `null` if the item requires no special handling, or an object in the following general format:

    {
      // properties describing metadata related to the item (i.e. grid row) itself
      "<property>": value,
      "<property>": value,

      // properties describing metadata related to individual columns
      "columns":  {
        "<column index>":  {
          // metadata indexed by column index
          "<property>": value,
          "<property>": value
        },

        "<column id>":  {
          // metadata indexed by column id
          "<property>": value,
          "<property>": value
        }
      }
    }

### Row-level properties

* `cssClasses` (string) - One or more (space-separated) CSS classes to be added to the entire row.
* `focusable` (boolean) - Whether or not any cells in the row can be set as "active".
* `selectable` (boolean) - Whether or not a row or any cells in it can be selected.

### Column-level properties

* `focusable` (boolean) - Whether or not a cell can be set as "active".
* `selectable` (boolean) - Whether or not a cell can be selected.
* `formatter` (Function) - A custom cell formatter.
* `editor` (Function) - A custom cell editor.
* `colspan` (number|string) - Number of columns this cell will span.  Can also contain "*" to indicate that the cell should span the rest of the row.

### Order of checks

When looking up a property, the grid checks in the following order:

1. Row-level item metadata.
2. Column-level item metadata by column id.
3. Column-level item metadata by column index.
4. Column definition.
5. Grid options.
5. Grid defaults.

## Examples

See [colspan example](https://ghiscoding.github.io/Angular-Slickgrid/#/colspan).