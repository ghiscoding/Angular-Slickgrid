import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import {
  Column,
  ColumnSort,
  Extension,
  ExtensionName,
  GridOption,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuOnCommandArgs,
  HeaderMenuOnBeforeMenuShowArgs,
} from '../models/index';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { ExtensionUtility } from './extensionUtility';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class HeaderMenuExtension implements Extension {
  private _eventHandler: any = new Slick.EventHandler();
  private _extension: any;

  constructor(
    private extensionUtility: ExtensionUtility,
    private sharedService: SharedService,
    private sortService: SortService,
    private translate: TranslateService,
  ) { }

  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();
    if (this._extension && this._extension.destroy) {
      this._extension.destroy();
    }
  }

  /**
  * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
  * @param grid
  * @param dataView
  * @param columnDefinitions
  */
  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // dynamically import the SlickGrid plugin with requireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.headerMenu);
      this.sharedService.gridOptions.headerMenu = { ...this.getDefaultHeaderMenuOptions(), ...this.sharedService.gridOptions.headerMenu };
      if (this.sharedService.gridOptions.enableHeaderMenu) {
        this.sharedService.gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this.sharedService.gridOptions, this.sharedService.columnDefinitions);
      }

      this._extension = new Slick.Plugins.HeaderMenu(this.sharedService.gridOptions.headerMenu);
      this.sharedService.grid.registerPlugin(this._extension);
      this._eventHandler.subscribe(this._extension.onCommand, (e: any, args: HeaderMenuOnCommandArgs) => {
        this.executeHeaderMenuInternalCommands(e, args);
        if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
          this.sharedService.gridOptions.headerMenu.onCommand(e, args);
        }
      });

      this._eventHandler.subscribe(this._extension.onBeforeMenuShow, (e: any, args: HeaderMenuOnBeforeMenuShowArgs) => {
        if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
          this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
        }
      });

      return this._extension;
    }
    return null;
  }

 /**
  * Create Header Menu with Custom Commands if user has enabled Header Menu
  * @param options
  * @param columnDefinitions
  * @return header menu
  */
  private addHeaderMenuCustomCommands(options: GridOption, columnDefinitions: Column[]): HeaderMenu {
    const headerMenuOptions = options.headerMenu || {};

    if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
      columnDefinitions.forEach((columnDef: Column) => {
        if (columnDef && !columnDef.excludeFromHeaderMenu) {
          if (!columnDef.header || !columnDef.header.menu) {
            columnDef.header = {
              menu: {
                items: []
              }
            };
          }

          const columnHeaderMenuItems: HeaderMenuItem[] = columnDef && columnDef.header && columnDef.header.menu && columnDef.header.menu.items || [];

          // Sorting Commands
          if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
            if (columnHeaderMenuItems.filter((item: HeaderMenuItem) => item.command === 'sort-asc').length === 0) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                title: options.enableTranslate ? this.translate.instant('SORT_ASCENDING') : Constants.TEXT_SORT_ASCENDING,
                command: 'sort-asc',
                positionOrder: 50
              });
            }
            if (columnHeaderMenuItems.filter((item: HeaderMenuItem) => item.command === 'sort-desc').length === 0) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                title: options.enableTranslate ? this.translate.instant('SORT_DESCENDING') : Constants.TEXT_SORT_DESCENDING,
                command: 'sort-desc',
                positionOrder: 51
              });
            }
            if (!headerMenuOptions.hideClearSortCommand && columnHeaderMenuItems.filter((item: HeaderMenuItem) => item.command === 'clear-sort').length === 0) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconClearSortCommand || 'fa fa-unsorted',
                title: options.enableTranslate ? this.translate.instant('CLEAR_SORT') : Constants.TEXT_CLEAR_SORT,
                command: 'clear-sort',
                positionOrder: 52
              });
            }
          }

          // Hide Column Command
          if (headerMenuOptions && !headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter((item: HeaderMenuItem) => item.command === 'hide').length === 0) {
            columnHeaderMenuItems.push({
              iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
              title: options.enableTranslate ? this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
              command: 'hide',
              positionOrder: 53
            });
          }

          this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
          // sort the custom items by their position in the list
          columnHeaderMenuItems.sort((itemA: any, itemB: any) => {
            if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
              return itemA.positionOrder - itemB.positionOrder;
            }
            return 0;
          });
        }
      });
    }
    return headerMenuOptions;
  }

  /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
  executeHeaderMenuInternalCommands(e: Event, args: HeaderMenuOnCommandArgs) {
    if (args && args.command) {
      switch (args.command) {
        case 'hide':
          this.hideColumn(args.column);
          if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
            this.sharedService.grid.autosizeColumns();
          }
          break;
        case 'clear-sort':
          this.clearColumnSort(e, args);
          break;
        case 'sort-asc':
        case 'sort-desc':
          const isSortingAsc = (args.command === 'sort-asc');
          this.sortColumn(e, args, isSortingAsc);
          break;
        default:
          break;
      }
    }
  }

  /** Hide a column from the grid */
  hideColumn(column: Column) {
    if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
      const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
      this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
      this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
    }
  }

  /**
   * Reset all the Grid Menu options which have text to translate
   * @param grid menu object
   */
  resetHeaderMenuTranslations(columnDefinitions: Column[]) {
    columnDefinitions.forEach((columnDef: Column) => {
      if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
        if (!columnDef.excludeFromHeaderMenu) {
          const columnHeaderMenuItems: HeaderMenuItem[] = columnDef.header.menu.items || [];
          columnHeaderMenuItems.forEach((item) => {
            switch (item.command) {
              case 'sort-asc':
                item.title = this.translate.instant('SORT_ASCENDING') || Constants.TEXT_SORT_ASCENDING;
                break;
              case 'clear-sort':
                item.title = this.translate.instant('CLEAR_SORT') || Constants.TEXT_CLEAR_SORT;
                break;
              case 'sort-desc':
                item.title = this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                break;
              case 'hide':
                item.title = this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                break;
            }

            // re-translate if there's a "titleKey"
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate) {
              this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
            }
          });
        }
      }
    });
  }

  /**
   * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
   */
  translateHeaderMenu() {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
      this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
    }
  }

  /**
   * @return default Header Menu options
   */
  private getDefaultHeaderMenuOptions(): HeaderMenu {
    return {
      autoAlignOffset: 12,
      minWidth: 140,
      hideColumnHideCommand: false,
      hideSortCommands: false,
      title: ''
    };
  }

  /** Sort the current column */
  private sortColumn(e: Event, args: HeaderMenuOnCommandArgs, isSortingAsc = true) {
    // get previously sorted columns
    const cols: ColumnSort[] = this.sortService.getPreviousColumnSorts(args.column.id + '');

    // add to the column array, the column sorted by the header menu
    cols.push({ sortCol: args.column, sortAsc: isSortingAsc });
    if (this.sharedService.gridOptions.backendServiceApi) {
      this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid: this.sharedService.grid });
    } else if (this.sharedService.dataView) {
      this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, cols);
    } else {
      // when using customDataView, we will simply send it as a onSort event with notify
      const isMultiSort = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
      const sortOutput = isMultiSort ? cols : cols[0];
      args.grid.onSort.notify(sortOutput);
    }

    // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
    const newSortColumns: ColumnSort[] = cols.map((col) => {
      return {
        columnId: col && col.sortCol && col.sortCol.id,
        sortAsc: col && col.sortAsc
      };
    });
    this.sharedService.grid.setSortColumns(newSortColumns); // add sort icon in UI
  }

  /** Clear the Sort on the current column (if it's actually sorted) */
  private clearColumnSort(e: Event, args: HeaderMenuOnCommandArgs) {
    // get previously sorted columns
    const allSortedCols: ColumnSort[] = this.sortService.getPreviousColumnSorts();
    const sortedColsWithoutCurrent: ColumnSort[] = this.sortService.getPreviousColumnSorts(args.column.id + '');

    if (allSortedCols.length !== sortedColsWithoutCurrent.length) {
      if (this.sharedService.gridOptions.backendServiceApi) {
        this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: sortedColsWithoutCurrent, grid: this.sharedService.grid });
      } else if (this.sharedService.dataView) {
        this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, sortedColsWithoutCurrent, true);
      } else {
        // when using customDataView, we will simply send it as a onSort event with notify
        const isMultiSort = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
        const sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
        args.grid.onSort.notify(sortOutput);
      }

      // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
      const updatedSortColumns: ColumnSort[] = sortedColsWithoutCurrent.map((col) => {
        return {
          columnId: col && col.sortCol && col.sortCol.id,
          sortAsc: col && col.sortAsc
        };
      });
      this.sharedService.grid.setSortColumns(updatedSortColumns); // add sort icon in UI
    }
  }
}
