import * as jQuery from 'jquery';

(global as any).$ = (global as any).jQuery = jQuery;
(window as any).$ = (window as any).jQuery = jQuery;
// (global as any).Storage = window.localStorage;
(global as any).navigator = { userAgent: 'node.js' };
(global as any).Slick = (window as any).Slick = {};
require('jquery-ui-dist/jquery-ui');
require('slickgrid/lib/jquery.event.drag-2.3.0');
require('slickgrid/slick.core');
require('slickgrid/slick.dataview');
require('slickgrid/slick.grid');
