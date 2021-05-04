import { Injectable } from '@angular/core';

import { Column, ColumnSort, GridOption, SlickEventHandler, TreeDataOption } from '../models/index';
import { SharedService } from './shared.service';
import { SortService } from './sort.service';
import { convertParentChildArrayToHierarchicalView } from './utilities';

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

    if (this.gridOptions?.multiColumnSort && this.gridOptions?.enableTreeData) {
      throw new Error('[Angular-Slickgrid] Tree Data does not currently support multi-column sorting, you can disable it via "multiColumnSort: false" grid option and/or help in providing support for this feature.');
    }

    // subscribe to the SlickGrid event and call the backend execution
    this._eventHandler.subscribe(grid.onClick, this.handleOnCellClick.bind(this));
  }

  /** Takes a flat dataset, converts it into a hierarchical dataset, sort it by recursion and finally return back the final and sorted flat array */
  initializeHierarchicalDataset(flatDataset: any[], columnDefinitions: Column[]) {
    // 1- convert the flat array into a hierarchical array
    const datasetHierarchical = this.convertFlatDatasetConvertToHierarhicalView(flatDataset);

    // 2- sort the hierarchical array recursively by an optional "initialSort" OR if nothing is provided we'll sort by the column defined as the Tree column
    // also note that multi-column is not currently supported with Tree Data
    const treeDataOptions = this.gridOptions?.treeDataOptions;
    const initialColumnSort = treeDataOptions?.initialSort ?? { columnId: treeDataOptions?.columnId ?? '', direction: 'ASC' };
    const columnSort: ColumnSort = {
      columnId: initialColumnSort.columnId,
      sortAsc: initialColumnSort?.direction?.toUpperCase() !== 'DESC',
      sortCol: columnDefinitions[this._grid.getColumnIndex(initialColumnSort.columnId || '')],
    };
    const datasetSortResult = this.sortService.sortHierarchicalDataset(datasetHierarchical, [columnSort]);

    // and finally add the sorting icon (this has to be done manually in SlickGrid) to the column we used for the sorting
    this._grid.setSortColumns([columnSort]);

    return datasetSortResult;
  }

  convertFlatDatasetConvertToHierarhicalView(flatDataset: any[]): any[] {
    const dataViewIdIdentifier = this.gridOptions?.datasetIdPropertyName ?? 'id';
    const treeDataOpt: TreeDataOption = this.gridOptions?.treeDataOptions ?? { columnId: 'id' };
    const treeDataOptions = { ...treeDataOpt, identifierPropName: treeDataOpt.identifierPropName ?? dataViewIdIdentifier };
    return convertParentChildArrayToHierarchicalView(flatDataset, treeDataOptions);
  }

  handleOnCellClick(event: any, args: any) {
    if (event && args) {
      const targetElm = event.target || {};
      const treeDataOptions = this.gridOptions.treeDataOptions;
      const collapsedPropName = treeDataOptions && treeDataOptions.collapsedPropName || '__collapsed';
      const idPropName = this.gridOptions.datasetIdPropertyName || 'id';

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

  toggleTreeDataCollapse(collapsing: boolean) {
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
  }
}
