#### Index
- [Using fixed `collection` or `collectionAsync`](#using-collection-or-collectionasync)
- [Editor Options (`AutocompleterOption` interface)](#editor-options-autocompleteroption-interface)
- [Using Remote API](#using-external-remote-api)
  - [Basic Usage](#remote-api-basic)
  - [Basic Usage with Object Result (**preferred way**)](#remote-api-basic-with-object-result)
  - [with `renderItem` + custom Layout (`twoRows` or `fourCorners`)](#remote-api-renderitem-callback--custom-layout-tworows-or-fourcorners)
  - [Custom Styling - SASS variables](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/styles/_variables.scss#L141)
- [Force User Input](#autocomplete---force-user-input)
- [How to change drop container dimensions?](#how-to-change-drop-container-dimensions)
- [Animated Gif Demo](#animated-gif-demo)
  - See the [Editors - Wiki](../Editors.md) for more general info about Editors (validators, event handlers, ...)

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/editor) | [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-editor.component.ts)

### Introduction
AutoComplete is a functionality that let the user start typing characters and the autocomplete will try to give suggestions according to the characters entered. The collection can be a fixed JSON files (collection of strings or objects) or can also be an external remote resource to an external API. For a demo of what that could look like, take a look at the [animated gif demo](#animated-gif-demo) below.

We use an external lib named [Autocomplete](https://github.com/kraaden/autocomplete) (aka `autocompleter` on npm) by Kraaden.

## Using `collection` or `collectionAsync`
If you want to pass the entire list to the AutoComplete (like a JSON file or a Web API call), you can do so using the `collection` or the `collectionAsync` (the latter will load it asynchronously). You can also see that the Editor and Filter have almost the exact same configuration (apart from the `model` that is obviously different).

##### Component
```typescript
export class GridBasicComponent {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  defineGrid(): void {
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

### Collection Label Render HTML
By default HTML is not rendered and the `label` will simply show HTML as text. But in some cases you might want to render it, you can do so by enabling the `enableRenderHtml` flag.

**NOTE:** this is currently only used by the Editors that have a `collection` which are the `MultipleSelect` & `SingleSelect` Editors.

```typescript
this.columnDefinitions = [
  {
    id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven',
    formatter: Formatters.checkmarkMaterial,
    type: FieldType.boolean,
    editor: {
      model: Editors.autocompleter,
      placeholder: '&#128269; search city',
      type: FieldType.string,

      // example with a fixed Collection (or collectionAsync)
      editorOptions: {
        showOnFocus: true, // display the list on focus of the autocomplete (without the need to type anything)
      } as AutocompleterOption,
      enableRenderHtml: true, // this flag only works with a fixed Collection
      // collectionAsync: this.http.get(URL_COUNTRIES_COLLECTION),
      collection: [
        { value: '', label: '' },
        { value: true, label: 'True', labelPrefix: `<i class="mdi mdi-plus"></i> ` },
        { value: false, label: 'False', labelPrefix: `<i class="mdi mdi-minus"></i> ` }
      ],
    }
  }
];
```

### Editor Options (`AutocompleterOption` interface)
All the available options that can be provided as `editorOptions` to your column definitions can be found under this [AutocompleterOption interface](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/interfaces/autocompleterOption.interface.ts) and you should cast your `editorOptions` to that interface to make sure that you use only valid options of the autocomplete library.

```ts
editor: {
  model: Editors.autocompleter,
  editorOptions: {
    minLength: 3,
  } as AutocompleterOption
}
```

#### Grid Option `defaultEditorOptions
You could also define certain options as a global level (for the entire grid or even all grids) by taking advantage of the `defaultEditorOptions` Grid Option. Note that they are set via the editor type as a key name (`autocompleter`, `date`, ...) and then the content is the same as `editorOptions` (also note that each key is already typed with the correct editor option interface), for example

```ts
this.gridOptions = {
  defaultEditorOptions: {
    autocompleter: { debounceWaitMs: 150 }, // typed as AutocompleterOption
  }
}
```

## Using External Remote API
You could also use external 3rd party Web API (can be JSONP query or regular JSON). This will make a much shorter result since it will only return a small subset of what will be displayed in the AutoComplete Editor or Filter. For example, we could use GeoBytes which provide a JSONP Query API for the cities of the world, you can imagine the entire list of cities would be way too big to download locally, so this is why we use such API.

### Remote API (basic)
The basic functionality will use built-in 3rd party lib styling that is to display a label/value pair item result.

##### Component
```typescript
export class GridBasicComponent {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  defineGrid() {
    // your columns definition
    this.columnDefinitions = [
      {
        id: 'product', name: 'Product', field: 'product',
        filterable: true,
        minWidth: 100,
        editor: {
          model: Editors.autocompleter,
          alwaysSaveOnEnterKey: true,
          editorOptions: {
            showOnFocus: true,
            minLength: 1,
            fetch: (searchText, updateCallback) => {
              // assuming your API call returns a label/value pair
              yourAsyncApiCall(searchText) // typically you'll want to return no more than 10 results
                 .then(result => updateCallback((results.length > 0) ? results : [{ label: 'No match found.', value: '' }]))
                 .catch(error => console.log('Error:', error));
            },
          }
        } as AutocompleterOption,
      },
    ];

    this.gridOptions = {
      // your grid options config
    }
  }
}
```

### Remote API (basic with object result)
This is the preferred way of dealing with the AutoComplete, the main reason is because the AutoComplete uses an `<input/>` and that means we can only keep 1 value and if we do then we lose the text label and so using an Object Result makes more sense. Note however that you'll need a bit more code that is because we'll use the `FieldType.Object` and so we need to provide a custom `SortComparer` and also a custom `Formatters` and for them to work we also need to provide a `dataKey` (the value) and a `labelKey` (text label) as shown below.
```ts
this.columnDefinitions = [
  {
    id: 'product', name: 'Product', field: 'product',
    dataKey: 'id',
    labelKey: 'name', // (id/name) pair to override default (value/label) pair
    editor: {
      model: Editors.autocompleter,
      alwaysSaveOnEnterKey: true,
      type: 'object',
      sortComparer: SortComparers.objectString,
      editorOptions: {
        showOnFocus: true,
        minLength: 1,
        fetch: (searchText, updateCallback) => {
          // assuming your API call returns a label/value pair
          yourAsyncApiCall(searchText) // typically you'll want to return no more than 10 results
            .then(result => updateCallback((results.length > 0) ? results : [{ label: 'No match found.', value: '' }]))
            .catch(error => console.log('Error:', error));
        }
      },
    } as AutocompleterOption,
  }
];
```

### Remote API with `renderItem` + custom layout (`twoRows` or `fourCorners`)
#### See animated gif ([twoRows](#with-tworows-custom-layout-without-optional-left-icon) or [fourCorners](#with-fourcorners-custom-layout-with-extra-optional-left-icon))
The lib comes with 2 built-in custom layouts, these 2 layouts also have SASS variables if anyone wants to style it differently. When using the `renderItem`, it will require the user to provide a `layout` (2 possible options `twoRows` or `fourCorners`) and also a `templateCallback` that will be executed when rendering the AutoComplete Search List Item. For example:

##### Component
```typescript
export class GridBasicComponent {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  defineGrid() {
    // your columns definition
    this.columnDefinitions = [
      {
        id: 'product', name: 'Product', field: 'product',
        filterable: true,
        minWidth: 100,
        editor: {
          model: Editors.autocompleter,
          alwaysSaveOnEnterKey: true,
          customStructure: {
            label: 'itemName',
            value: 'id'
          },
          editorOptions: {
            showOnFocus: true,
            minLength: 1,
            fetch: (searchText, updateCallback) => {
              yourAsyncApiCall(searchText) // typically you'll want to return no more than 10 results
                 .then(result => updateCallback((results.length > 0) ? results : [{ label: 'No match found.', value: '' }]))
                 .catch(error => console.log('Error:', error));
            }
          },
          renderItem: {
            layout: 'twoRows',
            templateCallback: (item: any) => `<div class="autocomplete-container-list">
              <div class="autocomplete-left">
                <span class="mdi ${item.icon} mdi-26px"></span>
              </div>
              <div>
                <span class="autocomplete-top-left">
                  <span class="mdi ${item.itemTypeName === 'I' ? 'mdi-information-outline' : 'mdi-content-copy'} mdi-14px"></span>
                  ${item.itemName}
                </span>
              <div>
            </div>
            <div>
              <div class="autocomplete-bottom-left">${item.itemNameTranslated}</div>
            </div>`,
          },
        } as AutocompleterOption,
      },
    ];

    this.gridOptions = {
      // your grid options config
    }
  }
}
```

### Remote API `renderItem` callback + custom layout (`twoRows` or `fourCorners`)
#### See animated gif ([twoRows](#with-tworows-custom-layout-without-optional-left-icon) or [fourCorners](#with-fourcorners-custom-layout-with-extra-optional-left-icon))
The previous example can also be written using the `renderItem` callback and adding `classes`, this is actually what Slickgrid-Universal does internally, you can do it yourself if you wish to have more control on the render callback result.

##### Component
```typescript
export class GridBasicComponent {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  defineGrid() {
      // your columns definition
    this.columnDefinitions = [
      {
        id: 'product', name: 'Product', field: 'product',
        filterable: true,
        minWidth: 100,
        editor: {
          model: Editors.autocompleter,
          alwaysSaveOnEnterKey: true,
          customStructure: {
            label: 'itemName',
            value: 'id'
          },
          editorOptions: {
            showOnFocus: true,
            minLength: 1,
            classes: {
              // choose a custom style layout
              // 'ui-autocomplete': 'autocomplete-custom-two-rows',
              'ui-autocomplete': 'autocomplete-custom-four-corners',
            },
            fetch: (searchText, updateCallback) => {
              yourAsyncApiCall(searchText) // typically you'll want to return no more than 10 results
                 .then(result => updateCallback((results.length > 0) ? results : [{ label: 'No match found.', value: '' }]))
                 .catch(error => console.log('Error:', error);
            },
            renderItem: {
              layout: 'twoRows',
              templateCallback: (item: any) => `<div class="autocomplete-container-list">
                <div class="autocomplete-left">
                  <span class="mdi ${item.icon} mdi-26px"></span>
                </div>
                <div>
                  <span class="autocomplete-top-left">
                    <span class="mdi ${item.itemTypeName === 'I' ? 'mdi-information-outline' : 'mdi-content-copy'} mdi-14px"></span>
                    ${item.itemName}
                  </span>
                <div>
              </div>
              <div>
                <div class="autocomplete-bottom-left">${item.itemNameTranslated}</div>
              </div>`,
            },
          } as AutocompleterOption,
          callbacks: {
             // callback on the AutoComplete on the instance
             renderItem: {
                templateCallback: (item: any) => {
                  return `<div class="autocomplete-container-list">
                    <div class="autocomplete-left">
                      <!--<img src="http://i.stack.imgur.com/pC1Tv.jpg" width="50" />-->
                      <span class="mdi ${item.icon} mdi-26px"></span>
                    </div>
                    <div>
                      <span class="autocomplete-top-left">
                        <span class="mdi ${item.itemTypeName === 'I' ? 'mdi-information-outline' : 'mdi-content-copy'} mdi-14px"></span>
                        ${item.itemName}
                      </span>
                      <span class="autocomplete-top-right">${formatNumber(item.listPrice, 2, 2, false, '$')}</span>
                    <div>
                  </div>
                  <div>
                    <div class="autocomplete-bottom-left">${item.itemNameTranslated}</div>
                    <span class="autocomplete-bottom-right">Type: <b>${item.itemTypeName === 'I' ? 'Item' : item.itemTypeName === 'C' ? 'PdCat' : 'Cat'}</b></span>
                  </div>`;
              }
          },
        },
      }
    ];

    this.gridOptions = {
      // your grid options config
    }
  }
}
```

#### with JSONP
Example from an external remote API (geobytes) returning a JSONP response.

##### Component
```typescript
export class GridBasicComponent {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  defineGrid(): void {
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
          model: Editors.autocompleter,
          // placeholder: '&#128269; search city', // &#128269; is a search icon, this provide an option placeholder

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

### How to change drop container dimensions?
You might want to change the dimensions of the drop container, this 3rd party library has a `customize` method to deal with such a thing. Slickgrid-Universal itself is removing the width using this method, you can however override this method to change the drop container dimensions

```ts
this.columnDefinitions = [
  {
    id: 'product', name: 'Product', field: 'product', filterable: true,
    editor: {
      model: Editors.autocompleter,
      alwaysSaveOnEnterKey: true,

      // example with a Remote API call
      editorOptions: {
        minLength: 1,
        fetch: (searchTerm, callback) => {
          // ...
        },
        customize: (_input, _inputRect, container) => {
          // change drop container dimensions
          container.style.width = '250px';
          container.style.height = '325px';
        },
      } as AutocompleterOption,
    },
  }
];
```

## Animated Gif Demo
### Basic (default layout)
![](https://user-images.githubusercontent.com/643976/50624023-d5e16c80-0ee9-11e9-809c-f98967953ba4.gif)

### with `twoRows` custom layout (without optional left icon)
![](https://i.imgur.com/V9XzVXS.gif)

### with `fourCorners` custom layout (with extra optional left icon)
![](https://i.imgur.com/LirGZFm.gif)