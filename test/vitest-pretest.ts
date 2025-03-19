import 'jsdom-global/register';
import 'whatwg-fetch';

// (global as any).Storage = window.localStorage;
(global as any).navigator = { userAgent: 'node.js' };
