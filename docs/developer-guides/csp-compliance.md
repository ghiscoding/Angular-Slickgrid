## CSP Compliance
The library is now, at least mostly, CSP (Content Security Policy) compliant since `v4.0`, however there are some exceptions to be aware of. When using any html string as template (for example with Custom Formatter returning an html string), you will not be fully compliant unless you return `TrustedHTML`. You can achieve this by using the `sanitizer` method in combo with [DOMPurify](https://github.com/cure53/DOMPurify) to return `TrustedHTML` as shown below and with that in place you should be CSP compliant.

> **Note** the default sanitizer in Slickgrid-Universal is actually already configured to return `TrustedHTML` but the CSP safe in the DataView is opt-in via `useCSPSafeFilter`

```typescript
import DOMPurify from 'dompurify';
import { GridOption } from 'angular-slickgrid';

export class Example1 {
  gridOptions: GridOption;

  prepareGrid() {
    // ...

    this.gridOptions = {
      // NOTE: DOM Purify is already configured in Slickgrid-Universal with the configuration shown below
      sanitizer: (html) => DOMPurify.sanitize(html, { RETURN_TRUSTED_TYPE: true }),
      // you could also optionally use the sanitizerOptions instead
      // sanitizerOptions: { RETURN_TRUSTED_TYPE: true }
    }
  }
}
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