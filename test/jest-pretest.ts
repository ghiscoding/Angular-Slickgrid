import * as jQuery from 'jquery';
import Sortable from 'sortablejs';

(global as any).$ = (global as any).jQuery = jQuery;
(window as any).$ = (window as any).jQuery = jQuery;
// (global as any).Storage = window.localStorage;
(global as any).navigator = { userAgent: 'node.js' };
(global as any).Slick = (window as any).Slick = {};
(global as any).Sortable = (window as any).Sortable = Sortable;

require('slickgrid/slick.core');
require('slickgrid/slick.interactions');
require('slickgrid/slick.dataview');
require('slickgrid/slick.grid');
