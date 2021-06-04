import jQuery from 'jquery';

(global as any).$ = (global as any).jQuery = jQuery;
(window as any).$ = (window as any).jQuery = jQuery;
(global as any).navigator = { userAgent: 'node.js' };
(global as any).Slick = (window as any).Slick = {};
import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.grid';
