import { Injectable } from '@angular/core';
import { Constants } from '../constants';

import { Column, ColumnSort, GridOption, SlickDataView, SlickEventData, SlickEventHandler, SlickGrid, ToggleStateChangeType, ToggleStateChangeTypeString, TreeDataOption, TreeToggledItem, TreeToggleStateChange } from '../models/index';
import { SharedService } from './shared.service';
import { SortService } from './sort.service';
import { findItemInTreeStructure, unflattenParentChildArrayToTree } from './utilities';

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class TreeDataService {
  private _isLastFullToggleCollapsed = false;
  private _lastToggleStateChange: Omit<TreeToggleStateChange, 'fromItemId'> = {
    type: this.gridOptions?.treeDataOptions?.initiallyCollapsed ? 'full-collapse' : 'full-expand',
    previousFullToggleType: this.gridOptions?.treeDataOptions?.initiallyCollapsed ? 'full-collapse' : 'full-expand',
    toggledItems: null
  };
  private _currentToggledItems: TreeToggledItem[] = [];
  private _grid!: any;
  private _eventHandler: SlickEventHandler;

  constructor(private sharedService: SharedService, private sortService: SortService) {
    this._eventHandler = new Slick.EventHandler();
  }

  set currentToggledItems(newToggledItems: TreeToggledItem[]) {
    this._currentToggledItems = newToggledItems;
  }
  get dataset(): any[] {
    return this.dataView?.getItems();
  }

  get datasetHierarchical(): any[] | undefined {
    return this.sharedService.hierarchicalDataset;
  }

  /** Getter of SlickGrid DataView object */
  get dataView(): SlickDataView {
    return this._grid?.getData?.() ?? {} as SlickDataView;
  }

  /** Getter of the SlickGrid Event Handler */
  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  get gridOptions(): GridOption {
    return this._grid?.getOptions?.() ?? {};
  }

  get treeDataOptions(): TreeDataOption {
    return this.gridOptions.treeDataOptions as TreeDataOption;
  }

  dispose() {
    // unsubscribe all SlickGrid events
    if (this._eventHandler?.unsubscribeAll) {
      this._eventHandler.unsubscribeAll();
    }
  }

  init(grid: any) {
    this._grid = grid;
    this._isLastFullToggleCollapsed = this.gridOptions?.treeDataOptions?.initiallyCollapsed ?? false;
    this._currentToggledItems = this.gridOptions.presets?.treeData?.toggledItems ?? [];


    // there's a few limitations with Tree Data, we'll just throw error when that happens
    if (this.gridOptions?.enableTreeData) {
      if (this.gridOptions?.multiColumnSort) {
        throw new Error('[Angular-Slickgrid] Tree Data does not currently support multi-column sorting, you can disable it via "multiColumnSort: false" grid option and/or help in providing support for this feature.');
      }

      if (!this.gridOptions?.enableFiltering) {
        throw new Error('[Angular-Slickgrid] It looks like you are trying to use Tree Data without using the filtering option, unfortunately that is not possible with Tree Data since it relies heavily on the filters to expand/collapse the tree. You need to enable it via "enableFiltering: true"');
      }

      if (this.gridOptions?.backendServiceApi || this.gridOptions?.enablePagination) {
        throw new Error('[Angular-Slickgrid] It looks like you are trying to use Tree Data with Pagination and/or a Backend Service (OData, GraphQL) but unfortunately that is simply not supported because of its complexity.');
      }

      if (!this.gridOptions.treeDataOptions || !this.gridOptions.treeDataOptions.columnId) {
        throw new Error('[Angular-Slickgrid] When enabling tree data, you must also provide the "treeDataOption" property in your Grid Options with "childrenPropName" or "parentPropName" (depending if your array is hierarchical or flat) for the Tree Data to work properly.');
      }
    }

    // subscribe to the SlickGrid event and call the backend execution
    this._eventHandler.subscribe(grid.onClick, this.handleOnCellClick.bind(this));
  }

  /**
   * Apply different tree toggle state changes by providing an array of parentIds that are designated as collapsed (or not).
   * User will have to provide an array of `parentId` and `isCollapsed` boolean and the code will only apply the ones that are tagged as collapsed, everything else will be expanded
   * @param {Array<TreeToggledItem>} treeToggledItems - array of parentId which are tagged as changed
   */
  applyToggledItemStateChanges(treeToggledItems: TreeToggledItem[], previousFullToggleType?: Exclude<ToggleStateChangeType, 'toggle'> | Exclude<ToggleStateChangeTypeString, 'toggle'>) {
    if (Array.isArray(treeToggledItems)) {
      const collapsedPropName = this.getTreeDataOptionPropName('collapsedPropName');
      const hasChildrenPropName = this.getTreeDataOptionPropName('hasChildrenPropName');

      // for the rows we identified as collapsed, we'll send them to the DataView with the new updated collapsed flag
      // and we'll refresh the DataView to see the collapsing applied in the grid
      this.dataView.beginUpdate(true);

      // we first need to put back the previous full toggle state (whether it was a full collapse or expand) by collapsing/expanding everything depending on the last toggled that was called `isLastFullToggleCollapsed`
      const previousFullToggle = previousFullToggleType ?? this._lastToggleStateChange.previousFullToggleType;
      const shouldCollapseAll = previousFullToggle === 'full-collapse';
      (this.dataView.getItems() || []).forEach((item: any) => {
        // collapse/expand the item but only when it's a parent item with children
        if (item[hasChildrenPropName]) {
          item[collapsedPropName] = shouldCollapseAll;
        }
      });

      // then we reapply only the ones that changed (provided as argument to the function)
      for (const collapsedItem of treeToggledItems) {
        const item = this.dataView.getItemById(collapsedItem.itemId);
        this.updateToggledItem(item, collapsedItem.isCollapsed);
      }

      // close the update transaction & call a refresh which will trigger a re-render with filters applied (including expand/collapse)
      this.dataView.endUpdate();
      this.dataView.refresh();
    }
  }

  /**
   * Get the current toggle state that includes the type (toggle, full-expand, full-collapse) and toggled items (only applies when it's a parent toggle)
   * @returns {TreeToggleStateChange} treeDataToggledItems - items that were toggled (array of `parentId` and `isCollapsed` flag)
   */
  getCurrentToggleState(): Omit<TreeToggleStateChange, 'fromItemId'> {
    return this._lastToggleStateChange;
  }

  getInitialSort(columnDefinitions: Column[], gridOptions: GridOption): ColumnSort {
    const treeDataOptions = gridOptions?.treeDataOptions;
    const initialColumnSorting = treeDataOptions?.initialSort ?? { columnId: treeDataOptions?.columnId ?? '', direction: 'ASC' };
    const initialSortColumn = columnDefinitions.find(col => col.id === initialColumnSorting.columnId);

    return {
      columnId: initialColumnSorting.columnId,
      sortAsc: initialColumnSorting?.direction?.toUpperCase() !== 'DESC',
      sortCol: initialSortColumn as Column,
    };
  }

  /**
   * Get the current list of Tree Data item(s) that got toggled in the grid (basically the parents that the user clicked on the toggle icon to expand/collapse the child)
   * @returns {Array<TreeToggledItem>} treeDataToggledItems - items that were toggled (array of `parentId` and `isCollapsed` flag)
   */
  getToggledItems(): TreeToggledItem[] {
    return this._currentToggledItems;
  }

  /** Find the associated property name from the Tree Data option when found or return a default property name that we defined internally */
  getTreeDataOptionPropName(optionName: keyof TreeDataOption): string {
    let propName = '';
    switch (optionName) {
      case 'childrenPropName':
        propName = this.treeDataOptions?.childrenPropName ?? Constants.treeDataProperties.CHILDREN_PROP;
        break;
      case 'collapsedPropName':
        propName = this.treeDataOptions?.collapsedPropName ?? Constants.treeDataProperties.COLLAPSED_PROP;
        break;
      case 'hasChildrenPropName':
        propName = this.treeDataOptions?.hasChildrenPropName ?? Constants.treeDataProperties.HAS_CHILDREN_PROP;
        break;
      case 'identifierPropName':
        propName = this.treeDataOptions?.identifierPropName ?? this.gridOptions?.datasetIdPropertyName ?? 'id';
        break;
      case 'levelPropName':
        propName = this.treeDataOptions?.levelPropName ?? Constants.treeDataProperties.TREE_LEVEL_PROP;
        break;
      case 'parentPropName':
        propName = this.treeDataOptions?.parentPropName ?? Constants.treeDataProperties.PARENT_PROP;
        break;
    }
    return propName;
  }

  /**
   * Takes a flat dataset, converts it into a hierarchical dataset, sort it by recursion and finally return back the final and sorted flat array
   * @param {Array<Object>} flatDataset - parent/child flat dataset
   * @param {Object} gridOptions - grid options
   * @returns {Array<Object>} - tree dataset
   */
  convertFlatParentChildToTreeDatasetAndSort<P, T extends P & { [childrenPropName: string]: T[] }>(flatDataset: P[], columnDefinitions: Column[], gridOptions: GridOption) {
    // 1- convert the flat array into a hierarchical array
    const datasetHierarchical = this.convertFlatParentChildToTreeDataset(flatDataset, gridOptions);

    // 2- sort the hierarchical array recursively by an optional "initialSort" OR if nothing is provided we'll sort by the column defined as the Tree column
    // also note that multi-column is not currently supported with Tree Data
    const columnSort = this.getInitialSort(columnDefinitions, gridOptions);
    const datasetSortResult = this.sortService.sortHierarchicalDataset(datasetHierarchical, [columnSort]);

    // and finally add the sorting icon (this has to be done manually in SlickGrid) to the column we used for the sorting
    this._grid?.setSortColumns([columnSort]);

    return datasetSortResult;
  }

  /**
   * Takes a flat dataset, converts it into a hierarchical dataset
   * @param {Array<Object>} flatDataset - parent/child flat dataset
   * @param {Object} gridOptions - grid options
   * @returns {Array<Object>} - tree dataset
   */
  convertFlatParentChildToTreeDataset<P, T extends P & { [childrenPropName: string]: P[] }>(flatDataset: P[], gridOptions: GridOption): T[] {
    const dataViewIdIdentifier = gridOptions?.datasetIdPropertyName ?? 'id';
    const treeDataOpt: TreeDataOption = gridOptions?.treeDataOptions ?? { columnId: 'id' };
    const treeDataOptions = { ...treeDataOpt, identifierPropName: treeDataOpt.identifierPropName ?? dataViewIdIdentifier };
    return unflattenParentChildArrayToTree(flatDataset, treeDataOptions);
  }

  /**
   * Takes a hierarchical (tree) input array and sort it (if an `initialSort` exist, it will use that to sort)
   * @param {Array<Object>} hierarchicalDataset - inpu
   * @returns {Object} sort result object that includes both the flat & tree data arrays
   */
  sortHierarchicalDataset<T>(hierarchicalDataset: T[], inputColumnSorts?: ColumnSort | ColumnSort[]) {
    const columnSorts = inputColumnSorts ?? this.getInitialSort(this.sharedService.allColumns, this.gridOptions);
    const finalColumnSorts = Array.isArray(columnSorts) ? columnSorts : [columnSorts];
    return this.sortService.sortHierarchicalDataset(hierarchicalDataset, finalColumnSorts);
  }

  /**
   * Toggle the collapsed values of all parent items (the ones with children), we can optionally provide a flag to force a collapse or expand
   * @param {Boolean} collapsing - optionally force a collapse/expand (True => collapse all, False => expand all)
   * @param {Boolean} shouldTriggerEvent - defaults to true, should we trigger an event? For example, we could disable this to avoid a Grid State change event.
   * @returns {Promise<void>} - returns a void Promise, the reason we use a Promise is simply to make sure that when we add a spinner, it doesn't start/stop only at the end of the process
   */
  async toggleTreeDataCollapse(collapsing: boolean, shouldTriggerEvent = true): Promise<void> {
    if (this.gridOptions?.enableTreeData) {
      const hasChildrenPropName = this.getTreeDataOptionPropName('hasChildrenPropName');

      // emit an event when full toggle starts (useful to show a spinner)
      if (shouldTriggerEvent) {
        this.sharedService.onTreeFullToggleStart.next({ collapsing });
      }

      // do a bulk change data update to toggle all necessary parents (the ones with children) to the new collapsed flag value
      this.dataView.beginUpdate(true);

      // toggle the collapsed flag but only when it's a parent item with children
      (this.dataView.getItems() || []).forEach((item: any) => {
        if (item[hasChildrenPropName]) {
          this.updateToggledItem(item, collapsing);
        }
      });

      this.dataView.endUpdate();
      this.dataView.refresh();
      this._isLastFullToggleCollapsed = collapsing;
    }

    const toggleType = collapsing ? ToggleStateChangeType.fullCollapse : ToggleStateChangeType.fullExpand;

    this._lastToggleStateChange = {
      type: toggleType,
      previousFullToggleType: toggleType,
      toggledItems: null
    } as TreeToggleStateChange;

    // emit an event when full toggle ends
    if (shouldTriggerEvent) {
      this.sharedService.onTreeFullToggleEnd.next(this._lastToggleStateChange);
    }
  }

  // --
  // private functions
  // ------------------

  private handleOnCellClick(event: any, args: any) {
    if (event && args) {
      const targetElm: any = event.target || {};
      const idPropName = this.gridOptions.datasetIdPropertyName ?? 'id';
      const collapsedPropName = this.getTreeDataOptionPropName('collapsedPropName');
      const childrenPropName = this.getTreeDataOptionPropName('childrenPropName');

      if (targetElm?.className) {
        const hasToggleClass = targetElm.className.indexOf('toggle') >= 0 || false;
        if (hasToggleClass) {
          const item = this.dataView.getItem(args.row);
          if (item) {
            item[collapsedPropName] = !item[collapsedPropName]; // toggle the collapsed flag
            const isCollapsed = item[collapsedPropName];
            const itemId = item[idPropName];
            const parentFoundIdx = this._currentToggledItems.findIndex(treeChange => treeChange.itemId === itemId);
            if (parentFoundIdx >= 0) {
              this._currentToggledItems[parentFoundIdx].isCollapsed = isCollapsed;
            } else {
              this._currentToggledItems.push({ itemId, isCollapsed });
            }

            this.dataView.updateItem(itemId, item);

            // since we always keep 2 arrays as reference (flat + hierarchical)
            // we also need to update the hierarchical array with the new toggle flag
            const searchTreePredicate = (treeItemToSearch: any) => treeItemToSearch[idPropName] === itemId;
            const treeItemFound = findItemInTreeStructure(this.sharedService.hierarchicalDataset || [], searchTreePredicate, childrenPropName);
            if (treeItemFound) {
              treeItemFound[collapsedPropName] = isCollapsed;
            }

            // and finally we can invalidate the grid to re-render the UI
            this._grid.invalidate();

            this._lastToggleStateChange = {
              type: isCollapsed ? ToggleStateChangeType.toggleCollapse : ToggleStateChangeType.toggleExpand,
              previousFullToggleType: this._isLastFullToggleCollapsed ? 'full-collapse' : 'full-expand',
              toggledItems: this._currentToggledItems
            };
            this.sharedService.onTreeItemToggled.next({ ...this._lastToggleStateChange, fromItemId: itemId } as TreeToggleStateChange);
          }
          event.stopImmediatePropagation();
        }
      }
    }
  }

  private updateToggledItem(item: any, isCollapsed: boolean) {
    const dataViewIdIdentifier = this.gridOptions?.datasetIdPropertyName ?? 'id';
    const childrenPropName = this.getTreeDataOptionPropName('childrenPropName');
    const collapsedPropName = this.getTreeDataOptionPropName('collapsedPropName');

    if (item) {
      // update the flat dataset item
      item[collapsedPropName] = isCollapsed;
      this.dataView.updateItem(item[dataViewIdIdentifier], item);

      // also update the hierarchical tree item
      const searchTreePredicate = (treeItemToSearch: any) => treeItemToSearch[dataViewIdIdentifier] === item[dataViewIdIdentifier];
      const treeItemFound = findItemInTreeStructure(this.sharedService.hierarchicalDataset || [], searchTreePredicate, childrenPropName);
      if (treeItemFound) {
        treeItemFound[collapsedPropName] = isCollapsed;
      }
    }
  }
}
