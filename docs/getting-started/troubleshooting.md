## Troubleshooting

### `ngcc` Build Warnings (Angular >=8.0 && <16.0)
You might get warnings about SlickGrid while doing a production build, most of them are fine and the best way to fix them, is to simply remove/ignore the warnings, all you have to do is to add a file named `ngcc.config.js` in your project root (same location as the `angular.json` file) with the following content (you can also see this [commit](https://github.com/ghiscoding/angular-slickgrid-demos/commit/1fe8092bcd2e99ede5ab048f4a7ebe6254e4bee0) which fixes the Angular-Slickgrid-Demos prod build):
```js
module.exports = {
  packages: {
    'angular-slickgrid': {
      ignorableDeepImportMatchers: [
        /assign-deep/,
        /dequal/,
        /slickgrid\//,
        /flatpickr/,
      ]
    },
  }
};
```

### Angular 12 with WebPack 5 - how to fix polyfill error
Since Angular 12 switched to WebPack 5, you might get some new errors and you will need to add some polyfills manually to get the Excel Builder (Excel Export) to work.

#### The error you might get

```text
BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.
```

#### Steps to fix it
1. `npm install stream-browserify`
2. Add a path mapping in `tsconfig.json`:
```ts
{
  ...
  "compilerOptions": {
    "paths": {
      "stream": [ "./node_modules/stream-browserify" ]
    },
  }
}
```
3. Add `stream` (and any other CJS deps) to `allowedCommonJsDependencies` in your `angular.json` config:
```ts
"options": {
  "allowedCommonJsDependencies": [
    "stream"
  ],
},
```

#### `strictTemplates` error
In Angular 14 and higher, Angular has a `strictTemplates` flag in your `tsconfig.json` file (enabled by default when creating new projects from CLI) which causes issues with Angular-Slickgrid events with errors similar to this:

> Property 'detail' does not exist on type 'Event'. (onAngularGridCreated)="angularGridReady($event.detail)"

The reason is because Angular-Slickgrid uses Custom Event for all its events and Angular complains because these Custom Events aren't typed. In order to fix this issue, you have 3 viable approaches:

1. disabled `strictTemplates` in your `tsconfig.json` config
2. cast the event in the View template to `$any` type
   - `$any($event)` for example `$any($event).detail.eventData`
3. cast the event in the component ViewModel to `CustomEvent`
```html
<angular-slickgrid gridId="grid28"
    [columnDefinitions]="columnDefinitions"
    [gridOptions]="gridOptions"
    [dataset]="dataset"
    (onAngularGridCreated)="angularGridReady($event.detail)">
</angular-slickgrid>
```

```ts
angularGridReady(event: CustomEvent<AngularGridInstance>) {
  this.angularGrid = event.detail;
  this.gridObj = this.angularGrid.slickGrid;
}
```

The simplest is obviously the option 1 but you lose the strictness on the view templates, more details can found under the discussion [(`strictTemplates`) Template error ](https://github.com/ghiscoding/Angular-Slickgrid/discussions/815), I have also opened a similar Stack Overflow question myself:
[How to use Custom Event (not Event Emitter) without `strictTemplates` to complain about `$event` not being a Custom Event type?](https://stackoverflow.com/questions/68490848/how-to-use-custom-event-not-event-emitter-without-stricttemplates-to-complai).