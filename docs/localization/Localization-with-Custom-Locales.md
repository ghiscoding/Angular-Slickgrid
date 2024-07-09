###### Requires at least version `2.10.x`

## Description
Most of example that you will find across this library were made with `ngx-translate` (dynamic translation) support. However a few users of the lib only use 1 locale (English or any other locale). Since not all users requires multiple translations, as of version `2.13.0`, it is now possible to use `Angular-Slickgrid` without `ngx-translate`. What is the difference with/without `ngx-translate`? Not much, the only difference is that `ngx-translate` is now an optional dependency (thanks to Angular [@Optional Dependency](https://angular.io/guide/singleton-services), via `@Optional() TranslateService`), so if you don't provide `ngx-translate`, it will simply try to use Custom Locales, you can provide your own locales (see instruction below), or if none are provided it will use English locales by default.

## Code Sample
[Demo Component](https://github.com/ghiscoding/angular-slickgrid-demos/tree/master/bootstrap3-demo-with-locales/src/app/locales)

## Installation
There are 2 ways of using and defining Custom Locales, see below on how to achieve that.

### 1. Define your Custom Locales
#### English Locale
English is the default, if that is the locale you want to use then there's nothing to do, move along...

#### Any other Locales (not English)
To use any other Locales, you will need to create a TypeScript file of all the Locale Texts required for the library to work properly (if you forget to define a locale text, it will simply show up in English). For example, if we define a French Locale, it would look like this (for the complete list of required field take a look at the default [English Locale](https://github.com/ghiscoding/angular-slickgrid-demos/blob/master/bootstrap5-demo-with-locales/src/app/locales/en.ts))
```ts
// localeFrench.ts or fr.ts
export const localeFrench = {
  // texte requis
  TEXT_ALL_SELECTED: 'Tout sélectionnés',
  TEXT_CANCEL: 'Annuler',
  TEXT_CLEAR_ALL_FILTERS: 'Supprimer tous les filtres',
  TEXT_CLEAR_ALL_SORTING: 'Supprimer tous les tris',
  // ... the rest of the text
```

#### 2. Use the Custom Locales
##### Through the `forRoot()` (globally)
This will literally configure Custom Locales for the entire project, so if you want to do it once, that is the place to do it.
```ts
// app.module.ts
@NgModule({
  imports: [
    AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want

      // Provide a custom locales set
      locales: localeFrench,
    })
  ]
});
```
##### Through the Grid Option of any grid
You can alternatively provide Custom Locales through any grid declaration through the `locales` Grid Options (it's the same as the global one, except that it's per grid)

```ts
import { localeFrench } from 'locales/fr';

export class MyGridComponent {
  prepareGrid() {
    this.columnDefinitions = [ /* ... */ ];

    this.gridOptions = {
      enableAutoResize: true,

      // provide Custom Locale to this grid only
      locales: localeFrench
    };
  }
}
```

#### 3. Use the lib (without ngx-translate)
There's nothing else to do, just use the library without defining or providing TranslateService and you're good to go. Read through the Wiki of the [Quick Start](../getting-started/quick-start.md) for basic grid samples.