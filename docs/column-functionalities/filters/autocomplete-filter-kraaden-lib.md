###### _requires Angular-Slickgrid >=5.0.0_

#### Index
- [Using `collection` or `collectionAsync`](#using-collection-or-collectionasync)
- [Filter Options (`AutocompleterOption` interface)](#filter-options-autocompleteroption-interface)
- [Using Remote API](#using-external-remote-api)
- [Force User Input](#autocomplete---force-user-input)
- [Update Filters Dynamically](../../column-functionalities/filters/input-filter.md#update-filters-dynamically)
- [Animated Gif Demo](#animated-gif-demo)

### Demo
[Demo Page](https://ghiscoding.github.io/angular-slickgrid-bs4-demo/#/editor) | [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-editor.component.ts)

### Introduction
AutoComplete is a functionality that let the user start typing characters and the autocomplete will try to give suggestions according to the characters entered. The collection can be a JSON files (collection of strings or objects) or can also be an external resource like a JSONP query to an external API. For a demo of what that could look like, take a look at the [animated gif demo](#animated-gif-demo) below.

We use an external lib named [Autocomplete](https://github.com/kraaden/autocomplete) (aka `autocompleter` on npm) by Kraaden.

## Using `collection` or `collectionAsync`
If you want to pass the entire list to the AutoComplete (like a JSON file or a Web API call), you can do so using the `collection` or the `collectionAsync` (the latter will load it asynchronously). You can also see that the Editor and Filter have almost the exact same configuration (apart from the `model` that is obviously different).

```html
<angular-slickgrid gridId="grid2"
     [columnDefinitions]="columnDefinitions"
     [gridOptions]="gridOptions"
     [dataset]="dataset">
</angular-slickgrid>
```

##### Component
```typescript
import { Component, OnInit} from '@angular/core';

export class GridBasicComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
      // your columns definition
    this.columnDefinitions = [
      {
        id: 'countryOfOrigin', name: 'Country of Origin', field: 'countryOfOrigin',
        formatter: Formatters.complexObject,
        dataKey: 'code', // our list of objects has the structure { code: 'CA', name: 'Canada' }, since we want to use the code`, we will set the dataKey to "code"
        labelKey: 'name', // while the displayed value is "name"
        type: FieldType.object,
        sorter: Sorters.objectString, // since we have set dataKey to "code" our output type will be a string, and so we can use this objectString, this sorter always requires the dataKey
        filterable: true,
        sortable: true,
        minWidth: 100,
        editor: {
          model: Editors.autocompleter,
          customStructure: { label: 'name', value: 'code' },
          collectionAsync: this.http.get('assets/data/countries.json'), // this demo will load the JSON file asynchronously
        },
        filter: {
          model: Filters.autocompleter,
          customStructure: { label: 'name', value: 'code' },
          collectionAsync: this.http.get('assets/data/countries.json'),
        }
      }
    ];

    this.gridOptions = {
      // your grid options config
    }
  }
}
```

### Filter Options (`AutocompleterOption` interface)
All the available options that can be provided as `filterOptions` to your column definitions can be found under this [AutocompleterOption interface](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/autocompleterOption.interface.ts) and you should cast your `filterOptions` to that interface to make sure that you use only valid options of the autocomplete library.

```ts
filter: {
  model: Filters.autocompleter,
  filterOptions: {
    minLength: 3,
  } as AutocompleterOption
}
```

## Using External Remote API
You could also use external 3rd party Web API (can be JSONP query or regular JSON). This will make a much shorter result since it will only return a small subset of what will be displayed in the AutoComplete Editor or Filter. For example, we could use GeoBytes which provide a JSONP Query API for the cities of the world, you can imagine the entire list of cities would be way too big to download locally, so this is why we use such API.

#### Note
I don't have time to invest in finding how to use JSONP + CORS in Angular, if someone wants to submit a PR (Pull Request) with the proper Angular code, I would be happy to merge the code and update the Wiki. For now, I'll simply make a quick and easy example with the jQuery `$.ajax` call just for you to get the idea of how it works.

```html
<angular-slickgrid gridId="grid2"
     [columnDefinitions]="columnDefinitions"
     [gridOptions]="gridOptions"
     [dataset]="dataset">
</angular-slickgrid>
```

##### Component
```typescript
import { Component, OnInit} from '@angular/core';

export class GridBasicComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
      // your columns definition
    this.columnDefinitions = [
      {
        id: 'cityOfOrigin', name: 'City of Origin', field: 'cityOfOrigin',
        filterable: true,
        minWidth: 100,
        editor: {
          model: Editors.autocompleter,
          placeholder: 'search city', //  you can provide an optional placeholder to help your users

          // use your own autocomplete options, instead of $.ajax, use http
          // here we use $.ajax just because I'm not sure how to configure http with JSONP and CORS
          editorOptions: {
            minLength: 3, // minimum count of character that the user needs to type before it queries to the remote
            fetch: (searchText, updateCallback) => {
              // assuming your API call returns a label/value pair
              yourAsyncApiCall(searchText) // typically you'll want to return no more than 10 results
                 .then(result => updateCallback((results.length > 0) ? results : [{ label: 'No match found.', value: '' }]))
                 .catch(error => console.log('Error:', error));
            }
          },
        },
        filter: {
          model: Filters.autocompleter,
          // placeholder: '&#128269; search city', // &#128269; is a search icon, this provide an option placeholder

          // use your own autocomplete options, instead of $.ajax, use http
          // here we use $.ajax just because I'm not sure how to configure http with JSONP and CORS
          filterOptions: {
            minLength: 3, // minimum count of character that the user needs to type before it queries to the remote
            fetch: (searchText, updateCallback) => {
              // assuming your API call returns a label/value pair
              yourAsyncApiCall(searchText) // typically you'll want to return no more than 10 results
                 .then(result => updateCallback((results.length > 0) ? results : [{ label: 'No match found.', value: '' }]))
                 .catch(error => console.log('Error:', error));
            },
          }
        }
      }
    ];

    this.gridOptions = {
      // your grid options config
    }
  }
}
```
## Autocomplete - force user input
##### Requires version `2.6.0+`
If you want to add the autocomplete functionality but want the user to be able to input a new option, then follow the example below:

```ts
  this.columnDefinitions = [{
        id: 'area',
        name: 'Area',
        field: 'area',
        type: FieldType.string,
        editor: {
          model: Editors.autocompleter,
          editorOptions: {
            minLength: 0,
            forceUserInput: true,
            fetch: (searchText, updateCallback) => {
              updateCallback(this.areas); // add here the array
            },
          }
        }
      },
  ];
```
You can also use the `minLength` to limit the autocomplete text to `0` characters or more, the default number is `3`.

## Animated Gif Demo
![](https://user-images.githubusercontent.com/643976/50624023-d5e16c80-0ee9-11e9-809c-f98967953ba4.gif)
