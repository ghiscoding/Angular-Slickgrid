import { Column, GridOption, HeaderMenu, HeaderMenuItem, HeaderMenuOnCommandArgs, HeaderMenuOnBeforeMenuShowArgs, ColumnSort, } from '../models';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { translateItems, arrayRemoveItemByIndex } from './extensionUtilities';
import { SortService } from '../services/sort.service';

// using external non-typed js libraries
declare var Slick: any;

export class HeaderMenuPlugin {
  constructor(
    private grid: any,
    private gridOptions: GridOption,
    private columnDefinitions: Column[],
    private dataView: any,
    private sortService: SortService,
    private translate: TranslateService,
    private visibleColumns: Column[]
    ) {}

  /**
   * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
   * @param grid
   * @param dataView
   * @param columnDefinitions
   */
  register() {
    this.gridOptions.headerMenu = { ...this.getDefaultHeaderMenuOptions(), ...this.gridOptions.headerMenu };
    if (this.gridOptions.enableHeaderMenu) {
      this.gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this.gridOptions, this.columnDefinitions);
    }
    const headerMenuPlugin = new Slick.Plugins.HeaderMenu(this.gridOptions.headerMenu);

    this.grid.registerPlugin(headerMenuPlugin);
    headerMenuPlugin.onCommand.subscribe((e: Event, args: HeaderMenuOnCommandArgs) => {
      this.executeHeaderMenuInternalCommands(e, args);
      if (this.gridOptions.headerMenu && typeof this.gridOptions.headerMenu.onCommand === 'function') {
        this.gridOptions.headerMenu.onCommand(e, args);
      }
    });
    headerMenuPlugin.onBeforeMenuShow.subscribe((e: Event, args: HeaderMenuOnBeforeMenuShowArgs) => {
      if (this.gridOptions.headerMenu && typeof this.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
        this.gridOptions.headerMenu.onBeforeMenuShow(e, args);
      }
    });

    return headerMenuPlugin;
  }

  /**
   * Create Header Menu with Custom Commands if user has enabled Header Menu
   * @param options
   * @param columnDefinitions
   * @return header menu
   */
  private addHeaderMenuCustomCommands(options: GridOption, columnDefinitions: Column[]): HeaderMenu {
    const headerMenuOptions = options.headerMenu;

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
          const columnHeaderMenuItems: HeaderMenuItem[] = columnDef.header.menu.items || [];

          // Sorting Commands
          if (options.enableSorting && columnDef.sortable && !headerMenuOptions.hideSortCommands) {
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
          }

          // Hide Column Command
          if (!headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter((item: HeaderMenuItem) => item.command === 'hide').length === 0) {
            columnHeaderMenuItems.push({
              iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
              title: options.enableTranslate ? this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
              command: 'hide',
              positionOrder: 52
            });
          }

          translateItems(this.translate, columnHeaderMenuItems, 'titleKey', 'title');

          // sort the custom items by their position in the list
          columnHeaderMenuItems.sort((itemA, itemB) => {
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
          if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
            this.grid.autosizeColumns();
          }
          break;
        case 'sort-asc':
        case 'sort-desc':
          // get previously sorted columns
          const cols: ColumnSort[] = this.sortService.getPreviousColumnSorts(args.column.id + '');

          // add to the column array, the column sorted by the header menu
          cols.push({ sortCol: args.column, sortAsc: (args.command === 'sort-asc') });
          if (this.gridOptions.backendServiceApi) {
            this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid: this.grid });
          } else {
            this.sortService.onLocalSortChanged(this.grid, this.dataView, cols);
          }

          // update the this.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
          const newSortColumns: ColumnSort[] = cols.map((col) => {
            return { columnId: col.sortCol.id, sortAsc: col.sortAsc };
          });
          this.grid.setSortColumns(newSortColumns); // add sort icon in UI
          break;
        default:
          break;
      }
    }
  }

  /** Hide a column from the grid */
  hideColumn(column: Column) {
    if (this.grid && this.grid.getColumns && this.grid.setColumns) {
      const columnIndex = this.grid.getColumnIndex(column.id);
      this.visibleColumns = arrayRemoveItemByIndex(this.grid.getColumns(), columnIndex);
      this.grid.setColumns(this.visibleColumns);
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
              case 'sort-desc':
                item.title = this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                break;
              case 'hide':
                item.title = this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                break;
            }

            // re-translate if there's a "titleKey"
            if (this.gridOptions && this.gridOptions.enableTranslate) {
              translateItems(this.translate, columnHeaderMenuItems, 'titleKey', 'title');
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
    if (this.gridOptions && this.gridOptions.headerMenu) {
      this.resetHeaderMenuTranslations(this.visibleColumns);
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
}
