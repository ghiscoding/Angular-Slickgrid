## CSP Compliance
The library is for the most part CSP (Content Security Policy) compliant since `v7.0` **but** only if you configure the `sanitizer` grid option. We were previously using `DOMPurify` internally in the project (in version <=7.x) but it was made optional in version 8 and higher. The main reason to make it optional was because some users who require SSR support could not use `dompuriy` but would rather need to use `isomorphic-dompurify`. You could also skip the `sanitizer` configuration, but that is not recommended.

> **Note** even if the `sanitizer` is optional, we **strongly suggest** that you configure it as a global grid option to avoid possible XSS attacks from your data and also to be CSP compliant. Note that for Salesforce users, you do not have to configure it since Salesforce is already using DOMPurify internally for any HTML templates.

As mentioned above, the project is mostly CSP compliant, however there are some exceptions to be aware of. When using any html string as template (for example with Custom Formatter returning an html string), you will not be fully compliant unless you return `TrustedHTML`. You can achieve this by using the `sanitizer` method in combo with [DOMPurify](https://github.com/cure53/DOMPurify) to return `TrustedHTML` as shown below and with that in place you should be CSP compliant.

```ts
// prefer the global grid options if possible
this.gridOptions = {
  sanitizer: (dirtyHtml) => DOMPurify.sanitize(dirtyHtml, { ADD_ATTR: ['level'], RETURN_TRUSTED_TYPE: true })
};
```

> **Note** If you're wondering about the `ADD_ATTR: ['level']`, well the "level" is a custom attribute used by SlickGrid Grouping/Draggable Grouping to track the grouping level depth and it must be kept.

> **Note** the DataView is not CSP safe by default, it is opt-in via the `useCSPSafeFilter` option.

```typescript
import DOMPurify from 'dompurify';
import { Slicker, SlickVanillaGridBundle } from '@slickgrid-universal/vanilla-bundle';

// DOM Purify is already configured in Slickgrid-Universal with the configuration shown below
this.gridOptions = {
  sanitizer: (html) => DOMPurify.sanitize(html, { RETURN_TRUSTED_TYPE: true }),
  // you could also optionally use the sanitizerOptions instead
  // sanitizerOptions: { RETURN_TRUSTED_TYPE: true }
}
this.sgb = new Slicker.GridBundle(gridContainerElm, this.columnDefinitions, this.gridOptions, this.dataset);
```

with this code in place, we can use the following CSP meta tag (which is what we use in the lib demo, ref: [index.html](https://github.com/ghiscoding/slickgrid-universal/blob/master/examples/vite-demo-vanilla-bundle/index.html#L8-L14))
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'nonce-random-string'; require-trusted-types-for 'script'; trusted-types dompurify">
```

#### DataView
Since we use the DataView, you will also need to enable a new `useCSPSafeFilter` flag to be CSP safe as the name suggest. This option is opt-in because it has a slight performance impact when enabling this option (it shouldn't be noticeable unless you use a very large dataset).

```typescript
import DOMPurify from 'dompurify';
import { GridOption } from 'angular-slickgrid';

export class Example1 {
  gridOptions: GridOption;

  prepareGrid() {
    // ...

    this.gridOptions = {
      // you could also optionally use the sanitizerOptions instead
      // sanitizerOptions: { RETURN_TRUSTED_TYPE: true }
      dataView: {
        useCSPSafeFilter: true
      },
    }
  }
}
```

### Custom Formatter using native HTML
We now also allow passing native HTML Element as a Custom Formatter instead of HTML string in order to avoid the use of `innerHTML` and stay CSP safe. We also have a new grid option named `enableHtmlRendering`, which is enabled by default and is allowing the use of `innerHTML` in the library (by Formatters and others), however when disabled it will totally restrict the use of `innerHTML` which will help to stay CSP safe.

You can take a look at the original SlickGrid library with this new [Filtered DataView with HTML Formatter - CSP Header (Content Security Policy)](https://6pac.github.io/SlickGrid/examples/example4-model-html-formatters.html) example which uses this new approach. There was no new Example created in Slickgrid-Universal specifically for this but the approach is the same.
