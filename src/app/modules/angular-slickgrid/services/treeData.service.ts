import { Injectable } from '@angular/core';

import { Column, ColumnSort, GridOption, SlickEventData, SlickEventHandler, TreeDataOption } from '../models/index';
import { SharedService } from './shared.service';
import { SortService } from './sort.service';
import { unflattenParentChildArrayToTree } from './utilities';

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class TreeDataService {
  private _grid: any;
  private _eventHandler: SlickEventHandler;

  constructor(private sharedService: SharedService, private sortService: SortService) {
    this._eventHandler = new Slick.EventHandler();
  }

  get dataset(): any[] {
    return this.dataView && this.dataView.getItems && this.dataView.getItems();
  }

  get datasetHierarchical(): any[] | undefined {
    return this.sharedService.hierarchicalDataset;
  }

  get dataView(): any {
    return this._grid && this._grid.getData && this._grid.getData();
  }

  get gridOptions(): GridOption {
    return this._grid && this._grid.getOptions && this._grid.getOptions() || {};
  }

  /** Getter of the SlickGrid Event Handler */
  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  dispose() {
    // unsubscribe all SlickGrid events
    if (this._eventHandler && this._eventHandler.unsubscribeAll) {
      this._eventHandler.unsubscribeAll();
    }
  }

  init(grid: any) {
    this._grid = grid;

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

  handleOnCellClick(event: any, args: any) {
    if (event && args) {
      const targetElm: any = event.target || {};
      const treeDataOptions = this.gridOptions.treeDataOptions;
      const collapsedPropName = treeDataOptions && treeDataOptions.collapsedPropName || '__collapsed';
      const idPropName = this.gridOptions.datasetIdPropertyName ?? 'id';

      if (targetElm && targetElm.className) {
        const hasToggleClass = targetElm.className.indexOf('toggle') >= 0 || false;
        if (hasToggleClass) {
          const item = this.dataView.getItem(args.row);
          if (item) {
            item[collapsedPropName] = !item[collapsedPropName] ? true : false;
            this.dataView.updateItem(item[idPropName], item);
            this._grid.invalidate();
          }
          event.stopImmediatePropagation();
        }
      }
    }
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

  async toggleTreeDataCollapse(collapsing: boolean): Promise<boolean> {
    if (this.gridOptions) {
      const treeDataOptions = this.gridOptions.treeDataOptions;

      if (this.gridOptions.enableTreeData) {
        const items: any[] = this.dataView.getItems() || [];
        const collapsedPropName = treeDataOptions && treeDataOptions.collapsedPropName || '__collapsed';
        items.forEach((item: any) => item[collapsedPropName] = collapsing);
        this.dataView.setItems(items);
        this._grid.invalidate();
      }
    }

    return true;
  }
}
