import { Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface RowDetailView {
  /** A CSS class to be added to the row detail */
  cssClass?: string;

  /** Defaults to true, which will collapse all row detail views when user calls a sort. Unless user implements a sort to deal with padding */
  collapseAllOnSort?: boolean;

  /** Extra classes to be added to the collapse Toggle */
  collapsedClass?: string;

  /** Extra classes to be added to the expanded Toggle */
  expandedClass?: string;

  /** Defaults to '_', prefix used for all the plugin metadata added to the item object (meta e.g.: padding, collapsed, parent) */
  keyPrefix?: string;

  /** Defaults to false, when True will load the data once and then reuse it. */
  loadOnce?: boolean;

  /**
   * How many grid rows do we want to use for the detail panel view
   * also note that the detail view adds an extra 1 row for padding purposes
   * so if you choose 4 panelRows, the display will in fact use 5 rows
   */
  panelRows: number;

  /** Defaults to false, when True will open the row detail on a row click (from any column) */
  useRowClick?: boolean;

  /** Defaults to true, which will save the row detail view in a cache when it detects that it will become out of the viewport buffer */
  saveDetailViewOnScroll?: boolean;

  /** Defaults to false, which will limit expanded row to only 1 at a time (it will close all other rows before opening new one). */
  singleRowExpand?: boolean;

  /**
   * Defaults to false, which will use a simpler way of calculating when rows become out (or back) of viewport range.
   * It is recommended to enable this flag since it seems to work correctly with Angular-Slickgrid while the inverse is misbehaving
   */
  useSimpleViewportCalc?: boolean;

  /** View Component of the preload template (typically a spinner) which shows after opening on the row detail but before the row detail is ready */
  preloadComponent?: Type<object>;

  /** View Component that will be loaded in the row detail after the async function completed */
  viewComponent: Type<object>;

  // --
  // Callback Methods

  /**
   * HTML Preload Template that will be used before the async process (typically used to show a spinner/loading)
   * It's preferable to use the "preloadView" property to use an Angular View instead of plain HTML.
   * If you still wish to use these methods, we strongly suggest you to sanitize your HTML, e.g. "DOMPurify.sanitize()"
   */
  preTemplate?: () => string;

  /**
   * HTML Post Template (when Row Detail data is available) that will be loaded once the async function finishes
   * It's preferable to use the "preloadView" property to use an Angular View instead of plain HTML
   * If you still wish to use these methods, we strongly suggest you to sanitize your HTML, e.g. "DOMPurify.sanitize()"
   */
  postTemplate?: (item: any) => string;

  /** Async server function call */
  process: (item: any) => Promise<any> | Observable<any> | Subject<any>;

  /** Override the logic for showing (or not) the expand icon (use case example: only every 2nd row is expandable) */
  expandableOverride?: (row: number, dataContext: any, grid: any) => boolean;

  // --
  // SlickGrid Events

  /** Fired after extension (plugin) is registered by SlickGrid */
  onExtensionRegistered?: (plugin: any) => void;

  /** This event must be used with the "notify" by the end user once the Asynchronous Server call returns the item detail */
  onAsyncResponse?: (e: Event, args: { item: any; detailView?: any }) => void;

  /** Fired when the async response finished */
  onAsyncEndUpdate?: (e: Event, args: { item: any; grid: any; }) => void;

  /** Fired after the row detail gets toggled */
  onAfterRowDetailToggle?: (e: Event, args: { item: any; expandedRows: any[]; grid: any; }) => void;

  /** Fired before the row detail gets toggled */
  onBeforeRowDetailToggle?: (e: Event, args: { item: any; grid: any; }) => void;

  /** Fired after the row detail gets toggled */
  onRowBackToViewportRange?: (e: Event, args: { item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; grid: any; }) => void;

  /** Fired after a row becomes out of viewport range (user can't see the row anymore) */
  onRowOutOfViewportRange?: (e: Event, args: { item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; grid: any; }) => void;
}
