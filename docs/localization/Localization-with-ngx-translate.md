### Why use ngx-translate and not i18n?
We use `ngx-translate` because the `i18n` from Angular core is yet to support dynamic translation (without reloading the page) which is a must for our project. However it is ~~suppose to land in Angular `6.x`~~ (still postponed) as the `ngx-translate` author wrote [here](https://github.com/ngx-translate/core/issues/495#issuecomment-325570932), he is also 1 of the guy working on implementing it in the Angular core. When the `i18n` Service supports dynamic translation, I will revisit this implementation but in the mean time we will stick with `ngx-translate`.

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/localization) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-localization.component.ts) / [Translation Files](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/assets/i18n)

#### ngx-translate setup
[Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app)

### Angular Versions
##### Angular 7
Angular 7 should be fine with current dependencies in the lib, they are set at `@ngx-translate/core` version `11.x` and `@ngx-translate/http-loader` at version `4.x`

##### Angular 4-5-6
Use `@ngx-translate/core` version `9.x` for Angular 4-5 and version `10.x` for Angular 6. While `@ngx-translate/http-loader` has version `2.x` for Angular 4-5 and version `3.x` for Angular 6.
```
npm install @ngx-translate/core@9.1.1 # change to the version that works for you
npm install @ngx-translate/http-loader@2.0.0 # change to the version that works for you
```

### Minimal installation (~even if you are not using any other locales~)
~#### If you are only using 1 locale, you still need to import/configure `ngx-translate` to use `Angular-Slickgrid`~
~Since `ngx-translate` is now a dependency of `Angular-Slickgrid`, you will need to add `ngx-translate` to your bundle and import/configure it in your App Module. The minimum setup is the following:~

Actually, this is no longer true, if you use only 1 locale, you can now disregard `ngx-translate` completely, head over to the new [Wiki - Providing Custom Locale](Localization-with-Custom-Locales.md). But if you still wish to install the minimum installation to get `ngx-translate` then continue the reading.

##### Install NPM package
```typescript
npm install @ngx-translate/core
```
##### App Module
```typescript
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSlickgridModule } from 'angular-slickgrid';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Regular Installation
#### NPM
You need to make sure that you have `@ngx-translate/core` installed. Then optionally, you will need a loader, the most recommended one is `@ngx-translate/http-loader`. For more installation and usage information, you can visit the official [ngx-translate site](https://github.com/ngx-translate/core#installation)
```bash
npm install @ngx-translate/core @ngx-translate/http-loader

## OR with yarn
yarn add @ngx-translate/core @ngx-translate/http-loader
```

#### App initializer (optional)
If you use the recommended `http-loader`, you might encounter some async problem with `Angular-Slickgrid`. The reason is simple, `SlickGrid` is a `jQuery` lib and it's Formatters and everything else needs to return data instantly (not asynchronously) and `Angular-Slickgrid` uses the `.instant(key)` function and the data must be loaded prior to performing the `.instant()`. So to avoid such async problem, it is recommended to use an App Initializer as documented [here](https://github.com/ngx-translate/core/issues/517#issuecomment-299637956), this will make sure that you will start loading the page once all the translation data is ready.

#### App Module
As mentioned in previous paragraph, you can choose multiple type of loader. However, if you choose the recommended `http-loader` and the `App Initializer` describe earlier, then your App module should have something along these lines
```typescript
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injector, APP_INITIALIZER, NgModule } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// use an Initializer Factory as describe here: https://github.com/ngx-translate/core/issues/517#issuecomment-299637956
export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const langToSet = 'en';
      translate.setDefaultLang('en');
      translate.use(langToSet).subscribe(() => {
        // console.info(`Successfully initialized '${langToSet}' language.'`);
      }, err => {
        console.error(`Problem with '${langToSet}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
    GridOdataService,
    ResizerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Angular 7
The new updated version of `ng-packagr` use strict metadata and you might get errors about `Lambda not supported`, to bypass this problem you can add the `@dynamic` over the `@NgModule` as so:
```ts
// @dynamic
@NgModule({
  ...
})
```

#### Locales
The final step is that you need the actual translations. Note that `ngx-translate` does not support multiple files, with that in mind see below for the following options that you have.
1. Manually copy the translation keys/values
2. Manually copy the JSON files to your `src/assets` folder
2. Modify `angular-cli.json` to copy the JSON files to your `src/assets` folder.
   - I tried following these [instructions](https://github.com/angular/angular-cli/issues/3555#issuecomment-351772402) but that didn't work
3. Modify your `package.json` and add a script to copy the JSON files to your `src/assets` folder
   - install NPM packages `cross-env` and `copyfiles`
   - add a new script in your `package.json`
   - run the below script **once** with `npm run copy:i18n` and you should now have the JSON files in your `src/assets` folder
```typescript
"copy:i18n": "cross-env copyfiles -f node_modules/angular-slickgrid/i18n/*.json src/assets/i18n"
```
If you want to manually re-create the translation in your own files, the list of translations that you will need are displayed in the [asset i18n](https://github.com/ghiscoding/angular-slickgrid/tree/master/src/assets/i18n) translation folder (from that file, you need all translations shown before the 'BILLING', the next few ones are for the demo page only)
