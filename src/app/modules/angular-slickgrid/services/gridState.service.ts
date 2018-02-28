import { Injectable } from '@angular/core';
import {
  CurrentFilter,
  CurrentPagination,
  CurrentSorter,
  GridOption,
  GridState
} from './../models/index';
import { FilterService, SortService } from './../services/index';
import $ from 'jquery';

@Injectable()
export class GridStateService {
  private _grid: any;
  private _gridOptions: GridOption;
  private _preset: GridState;
  private filterService: FilterService;
  private sortService: SortService;

  /**
   * Initialize the Export Service
   * @param grid
   * @param gridOptions
   * @param dataView
   */
  init(grid: any, filterService: FilterService, sortService: SortService): void {
    this._grid = grid;
    this.filterService = filterService;
    this.sortService = sortService;
    this._gridOptions = (grid && grid.getOptions) ? grid.getOptions() : {};
  }

  getCurrentGridState(): GridState {
    const gridState: GridState = {
      filters: this.getCurrentFilters(),
      sorters: this.getCurrentSorters()
    };

    const currentPagination = this.getCurrentPagination();
    if (currentPagination) {
      gridState.pagination = currentPagination;
    }
    return gridState;
  }

  getCurrentFilters(): CurrentFilter[] {
    if (this._gridOptions && this._gridOptions.backendServiceApi) {
      const backendService = this._gridOptions.backendServiceApi.service;
      if (backendService) {
        return backendService.getCurrentFilters() as CurrentFilter[];
      }
    } else {
      return this.filterService.getCurrentLocalFilters();
    }
    return null;
  }

  getCurrentPagination(): CurrentPagination {
    if (this._gridOptions && this._gridOptions.backendServiceApi) {
      const backendService = this._gridOptions.backendServiceApi.service;
      if (backendService) {
        return backendService.getCurrentPagination();
      }
    } else {
      // TODO implement this whenever local pagination gets implemented
    }
    return null;
  }

  getCurrentSorters(): CurrentSorter[] {
    if (this._gridOptions && this._gridOptions.backendServiceApi) {
      const backendService = this._gridOptions.backendServiceApi.service;
      if (backendService) {
        return backendService.getCurrentSorters() as CurrentSorter[];
      }
    } else {
      return this.sortService.getCurrentLocalSorters();
    }
    return null;
  }
}
