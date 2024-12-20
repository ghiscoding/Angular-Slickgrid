/*
 * copied and rewritten as ESM (just a simple rewrite as ESM to avoid loading a CJS package)
 * https://github.com/camsong/fetch-jsonp/blob/master/src/fetch-jsonp.js
 */

interface JsonpOptions {
  timeout: number;
  jsonpCallback: string;
  jsonpCallbackFunction: string;
  charset: string;
  nonce: string;
  referrerPolicy: string;
  crossorigin: boolean;
}

const defaultOptions = {
  timeout: 5000,
  jsonpCallback: 'callback',
  jsonpCallbackFunction: null,
};
const generateCallbackFunction = () => `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
const clearFunction = (functionName: string) => delete (window as any)[functionName];
const removeScript = (scriptId: string) => {
  const script = document.getElementById(scriptId);
  if (script) {
    document.getElementsByTagName('head')[0].removeChild(script);
  }
};

function fetchJsonp<T = any>(
  _url: string,
  options: Partial<JsonpOptions> = {}
): Promise<{ ok: boolean; json: () => Promise<T> }> {
  // to avoid param reassign
  let url = _url;
  const timeout = options.timeout || defaultOptions.timeout;
  const jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;
  let timeoutId: any;

  return new Promise((resolve, reject) => {
    const callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
    const scriptId = `${jsonpCallback}_${callbackFunction}`;

    (window as any)[callbackFunction] = (response: T) => {
      // keep consistent with fetch API
      resolve({ ok: true, json: () => Promise.resolve(response) });
      if (timeoutId) clearTimeout(timeoutId);
      removeScript(scriptId);
      clearFunction(callbackFunction);
    };

    // Check if the user set their own params, and if not add a ? to start a list of params
    url += url.indexOf('?') === -1 ? '?' : '&';

    const jsonpScript = document.createElement('script');
    jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`);
    if (options.charset) {
      jsonpScript.setAttribute('charset', options.charset);
    }
    if (options.nonce) {
      jsonpScript.setAttribute('nonce', options.nonce);
    }
    if (options.referrerPolicy) {
      jsonpScript.setAttribute('referrerPolicy', options.referrerPolicy);
    }
    if (options.crossorigin) {
      jsonpScript.setAttribute('crossorigin', 'true');
    }
    jsonpScript.id = scriptId;
    document.getElementsByTagName('head')[0].appendChild(jsonpScript);

    timeoutId = setTimeout(() => {
      reject(new Error(`JSONP request to ${_url} timed out`));

      clearFunction(callbackFunction);
      removeScript(scriptId);
      (window as any)[callbackFunction] = () => {
        clearFunction(callbackFunction);
      };
    }, timeout);

    // Caught if got 404/500
    jsonpScript.onerror = () => {
      reject(new Error(`JSONP request to ${_url} failed`));
      clearFunction(callbackFunction);
      removeScript(scriptId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  });
}

export default fetchJsonp;
