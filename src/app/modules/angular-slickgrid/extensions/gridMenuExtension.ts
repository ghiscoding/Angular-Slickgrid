import { Column, GridOption, HeaderMenuItem, HeaderMenuOnCommandArgs, ColumnSort, GridMenu, GridMenuItem, CellArgs, DelimiterType, FileType, GraphqlResult, } from '../models';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { translateItems, arrayRemoveItemByIndex, getPickerTitleOutputString, sortItems } from './extensionUtilities';
import { ExportService } from '../services/export.service';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { castToPromise } from '../services/utilities';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

export class GridMenuExtension {
  areVisibleColumnDifferent = false;
  extension: any;
  userOriginalGridMenu: GridMenu;

  constructor(
    private grid: any,
    private gridOptions: GridOption,
    private allColumns: Column[],
    private columnDefinitions: Column[],
    private dataView: any,
    private exportService: ExportService,
    private filterService: FilterService,
    private sortService: SortService,
    private translate: TranslateService,
    private visibleColumns: Column[]
    ) {}

  /** Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...) */
  register() {
    // keep original user grid menu, useful when switching locale to translate
    this.userOriginalGridMenu = { ...this.gridOptions.gridMenu };

    if (this.gridOptions && this.gridOptions.gridMenu) {
      this.gridOptions.gridMenu = { ...this.getDefaultGridMenuOptions(), ...this.gridOptions.gridMenu };

      // merge original user grid menu items with internal items
      // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
      this.gridOptions.gridMenu.customItems = [...this.userOriginalGridMenu.customItems || [], ...this.addGridMenuCustomCommands()];
      translateItems(this.translate, this.gridOptions.gridMenu.customItems, 'titleKey', 'title');
      sortItems(this.gridOptions.gridMenu.customItems, 'positionOrder');

      this.extension = new Slick.Controls.GridMenu(this.columnDefinitions, this.grid, this.gridOptions);
      if (this.grid && this.gridOptions.gridMenu) {
        this.extension.onBeforeMenuShow.subscribe((e: Event, args: CellArgs) => {
          if (this.gridOptions.gridMenu && typeof this.gridOptions.gridMenu.onBeforeMenuShow === 'function') {
            this.gridOptions.gridMenu.onBeforeMenuShow(e, args);
          }
        });
        this.extension.onColumnsChanged.subscribe((e: Event, args: CellArgs) => {
          this.areVisibleColumnDifferent = true;
          if (this.gridOptions.gridMenu && typeof this.gridOptions.gridMenu.onColumnsChanged === 'function') {
            this.gridOptions.gridMenu.onColumnsChanged(e, args);
          }
        });
        this.extension.onCommand.subscribe((e: Event, args: GridMenuItem) => {
          this.executeGridMenuInternalCustomCommands(e, args);
          if (this.gridOptions.gridMenu && typeof this.gridOptions.gridMenu.onCommand === 'function') {
            this.gridOptions.gridMenu.onCommand(e, args);
          }
        });
        this.extension.onMenuClose.subscribe((e: Event, args: CellArgs) => {
          if (this.gridOptions.gridMenu && typeof this.gridOptions.gridMenu.onMenuClose === 'function') {
            this.gridOptions.gridMenu.onMenuClose(e, args);
          }

          // we also want to resize the columns if the user decided to hide certain column(s)
          if (this.grid && typeof this.grid.autosizeColumns === 'function') {
            // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
            const gridUid = this.grid.getUID();
            if (this.areVisibleColumnDifferent && gridUid && $(`.${gridUid}`).length > 0) {
              if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
                this.grid.autosizeColumns();
              }
              this.areVisibleColumnDifferent = false;
            }
          }
        });
      }
      return this.extension;
    }
    return null;
  }

    /**
   * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
   * These are the default internal custom commands
   * @param event
   * @param GridMenuItem args
   */
  executeGridMenuInternalCustomCommands(e: Event, args: GridMenuItem) {
    if (args && args.command) {
      switch (args.command) {
        case 'clear-filter':
          this.filterService.clearFilters();
          this.dataView.refresh();
          break;
        case 'clear-sorting':
          this.sortService.clearSorting();
          this.dataView.refresh();
          break;
        case 'export-csv':
          this.exportService.exportToFile({
            delimiter: DelimiterType.comma,
            filename: 'export',
            format: FileType.csv,
            useUtf8WithBom: true
          });
          break;
        case 'export-text-delimited':
          this.exportService.exportToFile({
            delimiter: DelimiterType.tab,
            filename: 'export',
            format: FileType.txt,
            useUtf8WithBom: true
          });
          break;
        case 'toggle-filter':
          this.grid.setHeaderRowVisibility(!this.grid.getOptions().showHeaderRow);
          break;
        case 'toggle-toppanel':
          this.grid.setTopPanelVisibility(!this.grid.getOptions().showTopPanel);
          break;
        case 'refresh-dataset':
          this.refreshBackendDataset();
          break;
        default:
          break;
      }
    }
  }

  /** Refresh the dataset through the Backend Service */
  refreshBackendDataset(gridOptions?: GridOption) {
    let query = '';

    // user can pass new set of grid options which will override current ones
    if (gridOptions) {
      this.gridOptions = { ...this.gridOptions, ...gridOptions };
    }

    const backendApi = this.gridOptions.backendServiceApi;
    if (!backendApi || !backendApi.service || !backendApi.process) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }

    if (backendApi.service) {
      query = backendApi.service.buildQuery();
    }

    if (query && query !== '') {
      // keep start time & end timestamps & return it after process execution
      const startTime = new Date();

      if (backendApi.preProcess) {
        backendApi.preProcess();
      }

      // the process could be an Observable (like HttpClient) or a Promise
      // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
      const observableOrPromise = backendApi.process(query);

      castToPromise(observableOrPromise).then((processResult: GraphqlResult | any) => {
        const endTime = new Date();

        // from the result, call our internal post process to update the Dataset and Pagination info
        if (processResult && backendApi.internalPostProcess) {
          backendApi.internalPostProcess(processResult);
        }

        // send the response process to the postProcess callback
        if (backendApi.postProcess) {
          if (processResult instanceof Object) {
            processResult.statistics = {
              startTime,
              endTime,
              executionTime: endTime.valueOf() - startTime.valueOf(),
              totalItemCount: this.gridOptions && this.gridOptions.pagination && this.gridOptions.pagination.totalItems
            };
          }
          backendApi.postProcess(processResult);
        }
      });
    }
  }

  /** Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL) */
  private addGridMenuCustomCommands() {
    const backendApi = this.gridOptions.backendServiceApi || null;
    const gridMenuCustomItems: GridMenuItem[] = [];

    if (this.gridOptions && this.gridOptions.enableFiltering) {
      // show grid menu: clear all filters
      if (this.gridOptions && this.gridOptions.gridMenu && !this.gridOptions.gridMenu.hideClearAllFiltersCommand) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this.gridOptions.gridMenu.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
            title: this.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : Constants.TEXT_CLEAR_ALL_FILTERS,
            disabled: false,
            command: 'clear-filter',
            positionOrder: 50
          }
        );
      }

      // show grid menu: toggle filter row
      if (this.gridOptions && this.gridOptions.gridMenu && !this.gridOptions.gridMenu.hideToggleFilterCommand) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this.gridOptions.gridMenu.iconToggleFilterCommand || 'fa fa-random',
            title: this.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : Constants.TEXT_TOGGLE_FILTER_ROW,
            disabled: false,
            command: 'toggle-filter',
            positionOrder: 52
          }
        );
      }

      // show grid menu: refresh dataset
      if (this.gridOptions && this.gridOptions.gridMenu && !this.gridOptions.gridMenu.hideRefreshDatasetCommand && backendApi) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this.gridOptions.gridMenu.iconRefreshDatasetCommand || 'fa fa-refresh',
            title: this.gridOptions.enableTranslate ? this.translate.instant('REFRESH_DATASET') : Constants.TEXT_REFRESH_DATASET,
            disabled: false,
            command: 'refresh-dataset',
            positionOrder: 54
          }
        );
      }
    }

    if (this.gridOptions.enableSorting) {
      // show grid menu: clear all sorting
      if (this.gridOptions && this.gridOptions.gridMenu && !this.gridOptions.gridMenu.hideClearAllSortingCommand) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this.gridOptions.gridMenu.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
            title: this.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_SORTING') : Constants.TEXT_CLEAR_ALL_SORTING,
            disabled: false,
            command: 'clear-sorting',
            positionOrder: 51
          }
        );
      }
    }

    // show grid menu: export to file
    if (this.gridOptions && this.gridOptions.enableExport && this.gridOptions.gridMenu && !this.gridOptions.gridMenu.hideExportCsvCommand) {
      gridMenuCustomItems.push(
        {
          iconCssClass: this.gridOptions.gridMenu.iconExportCsvCommand || 'fa fa-download',
          title: this.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : Constants.TEXT_EXPORT_IN_CSV_FORMAT,
          disabled: false,
          command: 'export-csv',
          positionOrder: 53
        }
      );
    }
    // show grid menu: export to text file as tab delimited
    if (this.gridOptions && this.gridOptions.enableExport && this.gridOptions.gridMenu && !this.gridOptions.gridMenu.hideExportTextDelimitedCommand) {
      gridMenuCustomItems.push(
        {
          iconCssClass: this.gridOptions.gridMenu.iconExportTextDelimitedCommand || 'fa fa-download',
          title: this.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : Constants.TEXT_EXPORT_IN_TEXT_FORMAT,
          disabled: false,
          command: 'export-text-delimited',
          positionOrder: 54
        }
      );
    }

    // add the custom "Commands" title if there are any commands
    if (this.gridOptions && this.gridOptions.gridMenu && (gridMenuCustomItems.length > 0 || this.gridOptions.gridMenu.customItems.length > 0)) {
      this.gridOptions.gridMenu.customTitle = this.gridOptions.gridMenu.customTitle || getPickerTitleOutputString(this.translate, 'customTitle', 'gridMenu');
    }

    return gridMenuCustomItems;
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

  /** Translate the Grid Menu titles and column picker */
  translateGridMenu() {
    // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
    // we also need to call the control init so that it takes the new Grid object with latest values
    if (this.gridOptions && this.gridOptions.gridMenu) {
      this.gridOptions.gridMenu.customItems = [];
      this.emptyGridMenuTitles();

      // merge original user grid menu items with internal items
      // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
      this.gridOptions.gridMenu.customItems = [...this.userOriginalGridMenu.customItems || [], ...this.addGridMenuCustomCommands()];
      translateItems(this.translate, this.gridOptions.gridMenu.customItems, 'titleKey', 'title');
      sortItems(this.gridOptions.gridMenu.customItems, 'positionOrder');

      this.gridOptions.gridMenu.columnTitle = getPickerTitleOutputString(this.translate, 'columnTitle', 'gridMenu');
      this.gridOptions.gridMenu.forceFitTitle = getPickerTitleOutputString(this.translate, 'forceFitTitle', 'gridMenu');
      this.gridOptions.gridMenu.syncResizeTitle = getPickerTitleOutputString(this.translate, 'syncResizeTitle', 'gridMenu');

      // translate all columns (including non-visible)
      translateItems(this.translate, this.allColumns, 'headerKey', 'name');

      // re-initialize the Grid Menu, that will recreate all the menus & list
      // doing an "init()" won't drop any existing command attached
      if (this.extension.init) {
        this.extension.init(this.grid);
      }
    }
  }

  private emptyGridMenuTitles() {
    this.gridOptions.gridMenu.customTitle = '';
    this.gridOptions.gridMenu.columnTitle = '';
    this.gridOptions.gridMenu.forceFitTitle = '';
    this.gridOptions.gridMenu.syncResizeTitle = '';
  }

  /**
   * @return default Grid Menu options
   */
  private getDefaultGridMenuOptions(): GridMenu {
    return {
      customTitle: undefined,
      columnTitle: getPickerTitleOutputString(this.translate, 'columnTitle', 'gridMenu'),
      forceFitTitle: getPickerTitleOutputString(this.translate, 'forceFitTitle', 'gridMenu'),
      syncResizeTitle: getPickerTitleOutputString(this.translate, 'syncResizeTitle', 'gridMenu'),
      iconCssClass: 'fa fa-bars',
      menuWidth: 18,
      customItems: [],
      hideClearAllFiltersCommand: false,
      hideRefreshDatasetCommand: false,
      hideToggleFilterCommand: false,
    };
  }
}
