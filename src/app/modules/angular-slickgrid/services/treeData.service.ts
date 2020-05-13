import { GridOption, SlickEventHandler } from '../models/index';
import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class TreeDataService {
  _grid: any;
  private _eventHandler: SlickEventHandler;

  constructor(private sharedService: SharedService) {
    this._eventHandler = new Slick.EventHandler();
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

    // subscribe to the SlickGrid event and call the backend execution
    this._eventHandler.subscribe(grid.onClick, this.handleOnCellClick.bind(this));
  }

  handleOnCellClick(event: any, args: any) {
    if (event && args) {
      const targetElm = event.target || {};
      const treeDataOptions = this.gridOptions.treeDataOptions;
      const collapsedPropName = treeDataOptions && treeDataOptions.collapsedPropName || '__collapsed';

      if (targetElm && targetElm.className) {
        const hasToggleClass = targetElm.className.indexOf('toggle') >= 0 || false;
        if (hasToggleClass) {
          const item = this.dataView.getItem(args.row);
          if (item) {
            item[collapsedPropName] = !item[collapsedPropName] ? true : false;
            this.dataView.updateItem(item.id, item);
            this._grid.invalidate();
          }
          event.stopImmediatePropagation();
        }
      }
    }
  }

  toggleTreeDataCollapse(collapsing: boolean) {
    if (this.sharedService) {
      const grid = this.sharedService.grid;
      const dataView = this.sharedService.dataView;
      const gridOptions = this.sharedService.gridOptions;
      const treeDataOptions = gridOptions && gridOptions.treeDataOptions;

      if (gridOptions.enableTreeData) {
        const items: any[] = dataView.getItems() || [];
        const collapsedPropName = treeDataOptions && treeDataOptions.collapsedPropName || '__collapsed';
        items.forEach((item: any) => item[collapsedPropName] = collapsing);
        dataView.setItems(items);
        grid.invalidate();
      }
    }
  }
}
