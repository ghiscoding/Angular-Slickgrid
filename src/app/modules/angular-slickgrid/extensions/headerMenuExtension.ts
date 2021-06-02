import 'slickgrid/plugins/slick.headermenu';
import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../constants';
import {
  Column,
  ColumnSort,
  CurrentSorter,
  EmitterType,
  Extension,
  GridOption,
  HeaderMenu,
  Locale,
  MenuCommandItem,
  MenuCommandItemCallbackArgs,
  SlickEventHandler,
} from '../models/index';
import { FilterService } from '../services/filter.service';
import { ResizerService } from '../services/resizer.service';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { arrayRemoveItemByIndex, getTranslationPrefix } from '../services/utilities';
import { ExtensionUtility } from './extensionUtility';

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class HeaderMenuExtension implements Extension {
  private _addon: any;
  private _eventHandler: SlickEventHandler;
  private _locales!: Locale;

  constructor(
    private readonly extensionUtility: ExtensionUtility,
    private readonly filterService: FilterService,
    private readonly resizerService: ResizerService,
    private readonly sharedService: SharedService,
    private readonly sortService: SortService,
    @Optional() private readonly translate: TranslateService,
  ) {
    this._eventHandler = new Slick.EventHandler();
  }

  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();

    if (this._addon && this._addon.destroy) {
      this._addon.destroy();
    }
    this._addon = null;
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  /**
   * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
   * @param grid
   * @param dataView
   * @param columnDefinitions
   */
  register(): any {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate && (!this.translate || !this.translate.instant)) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // get locales provided by user in forRoot or else use default English locales via the Constants
      this._locales = this.sharedService.gridOptions && this.sharedService.gridOptions.locales || Constants.locales;

      this.sharedService.gridOptions.headerMenu = { ...this.getDefaultHeaderMenuOptions(), ...this.sharedService.gridOptions.headerMenu };
      if (this.sharedService.gridOptions.enableHeaderMenu) {
        this.sharedService.gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this.sharedService.gridOptions, this.sharedService.columnDefinitions);
      }

      this._addon = new Slick.Plugins.HeaderMenu(this.sharedService.gridOptions.headerMenu);
      this.sharedService.grid.registerPlugin(this._addon);

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.headerMenu) {
        if (this.sharedService.gridOptions.headerMenu.onExtensionRegistered) {
          this.sharedService.gridOptions.headerMenu.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onCommand, (e: any, args: MenuCommandItemCallbackArgs) => {
          this.executeHeaderMenuInternalCommands(e, args);
          if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
            this.sharedService.gridOptions.headerMenu.onCommand(e, args);
          }
        });
        if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
          this._eventHandler.subscribe(this._addon.onBeforeMenuShow, (e: Event, args: { grid: any; column: Column; menu: any; }) => {
            if (this.sharedService.gridOptions.headerMenu && this.sharedService.gridOptions.headerMenu.onBeforeMenuShow) {
              this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
            }
          });
        }
        if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onAfterMenuShow === 'function') {
          this._eventHandler.subscribe(this._addon.onAfterMenuShow, (e: Event, args: { grid: any; column: Column; menu: any; }) => {
            if (this.sharedService.gridOptions.headerMenu && this.sharedService.gridOptions.headerMenu.onAfterMenuShow) {
              this.sharedService.gridOptions.headerMenu.onAfterMenuShow(e, args);
            }
          });
        }
      }
      return this._addon;
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
    const gridOptions = this.sharedService.gridOptions;
    const translationPrefix = getTranslationPrefix(gridOptions);

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

          const columnHeaderMenuItems: Array<MenuCommandItem | 'divider'> = columnDef?.header?.menu?.items ?? [];

          // Freeze Column (pinning)
          let hasFrozenOrResizeCommand = false;
          if (headerMenuOptions && !headerMenuOptions.hideFreezeColumnsCommand) {
            hasFrozenOrResizeCommand = true;
            if (columnHeaderMenuItems.filter(item => item !== 'divider' && item.hasOwnProperty('command') && item.command === 'freeze-columns').length === 0) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconFreezeColumns || 'fa fa-thumb-tack',
                title: options.enableTranslate ? this.translate.instant(`${translationPrefix}FREEZE_COLUMNS`) : this._locales && this._locales.TEXT_FREEZE_COLUMNS,
                command: 'freeze-columns',
                positionOrder: 47
              });
            }
          }
          // Column Resize by Content (column autofit)
          if (headerMenuOptions && !headerMenuOptions.hideColumnResizeByContentCommand && this.sharedService.gridOptions.enableColumnResizeOnDoubleClick) {
            hasFrozenOrResizeCommand = true;
            if (!columnHeaderMenuItems.some(item => item !== 'divider' && item.hasOwnProperty('command') && item.command === 'column-resize-by-content')) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconColumnResizeByContentCommand || 'fa fa-arrows-h',
                title: this.extensionUtility.translateWhenEnabledAndServiceExist(`${translationPrefix}COLUMN_RESIZE_BY_CONTENT`, 'TEXT_COLUMN_RESIZE_BY_CONTENT'),
                command: 'column-resize-by-content',
                positionOrder: 48
              });
            }
          }

          // add a divider (separator) between the top freeze columns commands and the rest of the commands
          if (hasFrozenOrResizeCommand && !columnHeaderMenuItems.some(item => item !== 'divider' && item.positionOrder === 49)) {
            columnHeaderMenuItems.push({ divider: true, command: '', positionOrder: 49 });
          }

          // Sorting Commands
          if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
            if (columnHeaderMenuItems.filter(item => item !== 'divider' && item.hasOwnProperty('command') && item.command === 'sort-asc').length === 0) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                title: options.enableTranslate ? this.translate.instant(`${translationPrefix}SORT_ASCENDING`) : this._locales && this._locales.TEXT_SORT_ASCENDING,
                command: 'sort-asc',
                positionOrder: 50
              });
            }
            if (columnHeaderMenuItems.filter(item => item !== 'divider' && item.hasOwnProperty('command') && item.command === 'sort-desc').length === 0) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                title: options.enableTranslate ? this.translate.instant(`${translationPrefix}SORT_DESCENDING`) : this._locales && this._locales.TEXT_SORT_DESCENDING,
                command: 'sort-desc',
                positionOrder: 51
              });
            }

            // add a divider (separator) between the top sort commands and the other clear commands
            if (columnHeaderMenuItems.filter(item => item !== 'divider' && item.hasOwnProperty('command') && item.positionOrder === 52).length === 0) {
              columnHeaderMenuItems.push({ divider: true, command: '', positionOrder: 52 });
            }

            if (!headerMenuOptions.hideClearSortCommand && columnHeaderMenuItems.filter(item => item !== 'divider' && item.hasOwnProperty('command') && item.command === 'clear-sort').length === 0) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconClearSortCommand || 'fa fa-unsorted',
                title: options.enableTranslate ? this.translate.instant(`${translationPrefix}REMOVE_SORT`) : this._locales && this._locales.TEXT_REMOVE_SORT,
                command: 'clear-sort',
                positionOrder: 54
              });
            }
          }

          // Filtering Commands
          if (options.enableFiltering && columnDef.filterable && headerMenuOptions && !headerMenuOptions.hideFilterCommands) {
            if (!headerMenuOptions.hideClearFilterCommand && columnHeaderMenuItems.filter(item => item !== 'divider' && item.hasOwnProperty('command') && item.command === 'clear-filter').length === 0) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconClearFilterCommand || 'fa fa-filter',
                title: options.enableTranslate ? this.translate.instant(`${translationPrefix}REMOVE_FILTER`) : this._locales && this._locales.TEXT_REMOVE_FILTER,
                command: 'clear-filter',
                positionOrder: 53
              });
            }
          }

          // Hide Column Command
          if (headerMenuOptions && !headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter(item => item !== 'divider' && item.hasOwnProperty('command') && item.command === 'hide').length === 0) {
            columnHeaderMenuItems.push({
              iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
              title: options.enableTranslate ? this.translate.instant(`${translationPrefix}HIDE_COLUMN`) : this._locales && this._locales.TEXT_HIDE_COLUMN,
              command: 'hide',
              positionOrder: 55
            });
          }

          this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
          this.extensionUtility.sortItems(columnHeaderMenuItems, 'positionOrder');
        }
      });
    }
    return headerMenuOptions;
  }

  /** Hide a column from the grid */
  hideColumn(column: Column) {
    if (this.sharedService?.grid?.getColumnIndex) {
      const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
      const currentVisibleColumns = this.sharedService.grid.getColumns() as Column[];

      // if we're using frozen columns, we need to readjust pinning when the new hidden column is on the left pinning container
      // we need to do this because SlickGrid freezes by index and has no knowledge of the columns themselves
      const frozenColumnIndex = this.sharedService.gridOptions.frozenColumn !== undefined ? this.sharedService.gridOptions.frozenColumn : -1;
      if (frozenColumnIndex >= 0 && frozenColumnIndex >= columnIndex) {
        this.sharedService.gridOptions.frozenColumn = frozenColumnIndex - 1;
        this.sharedService.grid.setOptions({ frozenColumn: this.sharedService.gridOptions.frozenColumn });
      }

      // then proceed with hiding the column in SlickGrid & trigger an event when done
      const visibleColumns = arrayRemoveItemByIndex(currentVisibleColumns, columnIndex);
      this.sharedService.visibleColumns = visibleColumns;
      this.sharedService.grid.setColumns(visibleColumns);
      this.sharedService.onHeaderMenuHideColumns.next(visibleColumns);
    }
  }

  /**
   * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
   */
  translateHeaderMenu() {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
      this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
    }
  }

  // --
  // private functions
  // ------------------

  /** @return default Header Menu options */
  private getDefaultHeaderMenuOptions(): HeaderMenu {
    return {
      autoAlignOffset: 12,
      minWidth: 140,
      hideColumnHideCommand: false,
      hideSortCommands: false,
      title: ''
    };
  }

  /**
   * Reset all the internal Menu options which have text to translate
   * @param header menu object
   */
  private resetHeaderMenuTranslations(columnDefinitions: Column[]) {
    const gridOptions = this.sharedService.gridOptions;
    const translationPrefix = getTranslationPrefix(gridOptions);

    columnDefinitions.forEach((columnDef: Column) => {
      if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
        if (!columnDef.excludeFromHeaderMenu) {
          const columnHeaderMenuItems: Array<MenuCommandItem | 'divider'> = columnDef.header.menu.items || [];
          columnHeaderMenuItems.forEach(item => {
            if (item !== 'divider' && item.hasOwnProperty('command')) {
              switch (item.command) {
                case 'column-resize-by-content':
                  item.title = this.translate.instant(`${translationPrefix}COLUMN_RESIZE_BY_CONTENT`) || this._locales && this._locales.TEXT_COLUMN_RESIZE_BY_CONTENT;
                  break;
                case 'clear-filter':
                  item.title = this.translate.instant(`${translationPrefix}REMOVE_FILTER`) || this._locales && this._locales.TEXT_REMOVE_FILTER;
                  break;
                case 'clear-sort':
                  item.title = this.translate.instant(`${translationPrefix}REMOVE_SORT`) || this._locales && this._locales.TEXT_REMOVE_SORT;
                  break;
                case 'freeze-columns':
                  item.title = this.translate.instant(`${translationPrefix}FREEZE_COLUMNS`) || this._locales && this._locales.TEXT_FREEZE_COLUMNS;
                  break;
                case 'sort-asc':
                  item.title = this.translate.instant(`${translationPrefix}SORT_ASCENDING`) || this._locales && this._locales.TEXT_SORT_ASCENDING;
                  break;
                case 'sort-desc':
                  item.title = this.translate.instant(`${translationPrefix}SORT_DESCENDING`) || this._locales && this._locales.TEXT_SORT_DESCENDING;
                  break;
                case 'hide':
                  item.title = this.translate.instant(`${translationPrefix}HIDE_COLUMN`) || this._locales && this._locales.TEXT_HIDE_COLUMN;
                  break;
              }
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

  /** Clear the Filter on the current column (if it's actually filtered) */
  private clearColumnFilter(event: Event, args: MenuCommandItemCallbackArgs) {
    if (args && args.column) {
      this.filterService.clearFilterByColumnId(event, args.column.id);
    }
  }

  /** Clear the Sort on the current column (if it's actually sorted) */
  private clearColumnSort(event: Event, args: MenuCommandItemCallbackArgs) {
    if (args && args.column && this.sharedService) {
      this.sortService.clearSortByColumnId(event, args.column.id);
    }
  }

  /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
  private executeHeaderMenuInternalCommands(event: Event, args: MenuCommandItemCallbackArgs) {
    if (args && args.command) {
      switch (args.command) {
        case 'hide':
          this.hideColumn(args.column);
          if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
            this.sharedService.grid.autosizeColumns();
          }
          break;
        case 'clear-filter':
          this.clearColumnFilter(event, args);
          break;
        case 'clear-sort':
          this.clearColumnSort(event, args);
          break;
        case 'column-resize-by-content':
          this.resizerService.handleSingleColumnResizeByContent(`${args.column.id}`);
          break;
        case 'freeze-columns':
          const visibleColumns = [...this.sharedService.visibleColumns];
          const columnPosition = visibleColumns.findIndex((col) => col.id === args.column.id);
          const newGridOptions = { frozenColumn: columnPosition, enableMouseWheelScrollHandler: true };

          // to circumvent a bug in SlickGrid core lib, let's keep the columns positions ref and re-apply them after calling setOptions
          // the bug is highlighted in this issue comment:: https://github.com/6pac/SlickGrid/issues/592#issuecomment-822885069
          const previousColumnDefinitions = this.sharedService.grid.getColumns();

          this.sharedService.grid.setOptions(newGridOptions, false, true); // suppress the setColumns (3rd argument) since we'll do that ourselves
          this.sharedService.gridOptions.frozenColumn = newGridOptions.frozenColumn;
          this.sharedService.gridOptions.enableMouseWheelScrollHandler = newGridOptions.enableMouseWheelScrollHandler;
          this.sharedService.frozenVisibleColumnId = args.column.id;

          // to freeze columns, we need to take only the visible columns and we also need to use setColumns() when some of them are hidden
          // to make sure that we only use the visible columns, not doing this will have the undesired effect of showing back some of the hidden columns
          if (this.sharedService.hasColumnsReordered || (Array.isArray(this.sharedService.allColumns) && visibleColumns.length !== this.sharedService.allColumns.length)) {
            this.sharedService.grid.setColumns(visibleColumns);
          } else {
            // to circumvent a bug in SlickGrid core lib re-apply same column definitions that were backend up before calling setOptions()
            this.sharedService.grid.setColumns(previousColumnDefinitions);
          }

          // we also need to autosize columns if the option is enabled
          const gridOptions = this.sharedService.grid.getOptions();
          if (gridOptions.enableAutoSizeColumns) {
            this.sharedService.grid.autosizeColumns();
          }
          break;
        case 'sort-asc':
        case 'sort-desc':
          const isSortingAsc = (args.command === 'sort-asc');
          this.sortColumn(event, args, isSortingAsc);
          break;
        default:
          break;
      }
    }
  }

  /** Sort the current column */
  private sortColumn(event: Event, args: MenuCommandItemCallbackArgs, isSortingAsc = true) {
    if (args && args.column) {
      // get previously sorted columns
      const columnDef = args.column;

      // 1- get the sort columns without the current column, in the case of a single sort that would equal to an empty array
      const tmpSortedColumns = !this.sharedService.gridOptions.multiColumnSort ? [] : this.sortService.getCurrentColumnSorts(columnDef.id + '');

      let emitterType: EmitterType = EmitterType.local;

      // 2- add to the column array, the new sorted column by the header menu
      tmpSortedColumns.push({ columnId: `${columnDef.id}`, sortCol: columnDef, sortAsc: isSortingAsc });

      if (this.sharedService.gridOptions.backendServiceApi) {
        this.sortService.onBackendSortChanged(event, { multiColumnSort: true, sortCols: tmpSortedColumns, grid: this.sharedService.grid });
        emitterType = EmitterType.remote;
      } else if (this.sharedService.dataView) {
        this.sortService.onLocalSortChanged(this.sharedService.grid, tmpSortedColumns);
        emitterType = EmitterType.local;
      } else {
        // when using customDataView, we will simply send it as a onSort event with notify
        args.grid.onSort.notify(tmpSortedColumns);
      }

      // update the sharedService.grid sortColumns array which will at the same add the visual sort icon(s) on the UI
      const newSortColumns = tmpSortedColumns.map(col => {
        return {
          columnId: col?.sortCol?.id ?? '',
          sortAsc: col?.sortAsc ?? true,
        };
      });

      // add sort icon in UI
      this.sharedService.grid.setSortColumns(newSortColumns);

      // if we have an emitter type set, we will emit a sort changed
      // for the Grid State Service to see the change.
      // We also need to pass current sorters changed to the emitSortChanged method
      if (emitterType) {
        const currentLocalSorters: CurrentSorter[] = [];
        newSortColumns.forEach((sortCol) => {
          currentLocalSorters.push({
            columnId: sortCol.columnId + '',
            direction: sortCol.sortAsc ? 'ASC' : 'DESC'
          });
        });
        this.sortService.emitSortChanged(emitterType, currentLocalSorters);
      }
    }
  }
}
