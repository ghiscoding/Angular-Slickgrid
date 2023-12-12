import Sortable from 'sortablejs';

// (global as any).Storage = window.localStorage;
(global as any).navigator = { userAgent: 'node.js' };
(global as any).Sortable = (window as any).Sortable = Sortable;
