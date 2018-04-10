import { Injectable } from '@angular/core';
import {
  CellArgs,
  ColumnSort,
  CustomGridMenu,
  Column,
  DelimiterType,
  GraphqlResult,
  GridMenu,
  GridOption,
  HeaderButtonOnCommandArgs,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuOnCommandArgs,
  HeaderMenuOnBeforeMenuShowArgs,
  FileType
} from './../models/index';
import { TranslateService } from '@ngx-translate/core';
import { castToPromise, sanitizeHtmlToText } from './../services/utilities';
import { FilterService } from './filter.service';
import { ExportService } from './export.service';
import { SharedService } from './shared.service';
import { SortService } from './sort.service';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

@Injectable()
export class ControlAndPluginService {
  private _dataView: any;
  private _grid: any;
  private _gridOptions: GridOption;
  private _columnDefinitions: Column[];
  visibleColumns: Column[];

  // controls & plugins
  autoTooltipPlugin: any;
  checkboxSelectorPlugin: any;
  columnPickerControl: any;
  headerButtonsPlugin: any;
  headerMenuPlugin: any;
  gridMenuControl: any;
  rowSelectionPlugin: any;
  undoRedoBuffer: any;

  constructor(
    private exportService: ExportService,
    private filterService: FilterService,
    private sharedService: SharedService,
    private sortService: SortService,
    private translate: TranslateService
  ) {}

  /** Auto-resize all the column in the grid to fit the grid width */
  autoResizeColumns() {
    this._grid.autosizeColumns();
  }

  /**
   * Attach/Create different Controls or Plugins after the Grid is created
   * @param grid
   * @param columnDefinitions
   * @param options
   * @param dataView
   */
  attachDifferentControlOrPlugins() {
    this._grid = this.sharedService.grid;
    this._gridOptions = this.sharedService.gridOptions;
    this._dataView = this.sharedService.dataView;
    this._columnDefinitions = this.sharedService.columnDefinitions;
    this.visibleColumns = this.sharedService.columnDefinitions;

    // Column Picker Plugin
    if (this._gridOptions.enableColumnPicker) {
      this.columnPickerControl = this.createColumnPicker(this._grid, this._columnDefinitions, this._gridOptions);
    }

    // Grid Menu Plugin
    if (this._gridOptions.enableGridMenu) {
      this.gridMenuControl = this.createGridMenu(this._grid, this._columnDefinitions, this._gridOptions);
    }

    // Auto Tooltip Plugin
    if (this._gridOptions.enableAutoTooltip) {
      this.autoTooltipPlugin = new Slick.AutoTooltips(this._gridOptions.autoTooltipOptions || {});
      this._grid.registerPlugin(this.autoTooltipPlugin);
    }

    // Grouping Plugin
    // register the group item metadata provider to add expand/collapse group handlers
    if (this._gridOptions.enableGrouping) {
      const groupItemMetaProvider = this.sharedService.groupItemMetadataProvider || {};
      this._grid.registerPlugin(groupItemMetaProvider);
    }

    // Checkbox Selector Plugin
    if (this._gridOptions.enableCheckboxSelector) {
      // when enabling the Checkbox Selector Plugin, we need to also watch onClick events to perform certain actions
      // the selector column has to be create BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
      this._grid.registerPlugin(this.checkboxSelectorPlugin);

      // this also requires the Row Selection Model to be registered as well
      if (!this.rowSelectionPlugin) {
        this.rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
        this._grid.setSelectionModel(this.rowSelectionPlugin);
      }
    }

    // Row Selection Plugin
    if (this._gridOptions.enableRowSelection) {
      this.rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
      this._grid.setSelectionModel(this.rowSelectionPlugin);
    }

    // Header Button Plugin
    if (this._gridOptions.enableHeaderButton) {
      this.headerButtonsPlugin = new Slick.Plugins.HeaderButtons(this._gridOptions.headerButton || {});
      this._grid.registerPlugin(this.headerButtonsPlugin);
      this.headerButtonsPlugin.onCommand.subscribe((e: Event, args: HeaderButtonOnCommandArgs) => {
        if (this._gridOptions.headerButton && typeof this._gridOptions.headerButton.onCommand === 'function') {
          this._gridOptions.headerButton.onCommand(e, args);
        }
      });
    }

    // Header Menu Plugin
    if (this._gridOptions.enableHeaderMenu) {
      this.headerMenuPlugin = this.createHeaderMenu(this._grid, this._dataView, this._columnDefinitions, this._gridOptions);
    }

    // Cell External Copy Manager Plugin (Excel Like)
    if (this._gridOptions.enableExcelCopyBuffer) {
      this.createUndoRedoBuffer();
      this.hookUndoShortcutKey();
      this.createCellExternalCopyManagerPlugin(this._grid, this._gridOptions);
    }

    // manually register other plugins
    if (this._gridOptions.registerPlugins !== undefined) {
      if (Array.isArray(this._gridOptions.registerPlugins)) {
        this._gridOptions.registerPlugins.forEach((plugin) => {
          this._grid.registerPlugin(plugin);
        });
      } else {
        this._grid.registerPlugin(this._gridOptions.registerPlugins);
      }
    }
  }

  /**
   * Attach/Create different plugins before the Grid creation.
   * For example the multi-select have to be added to the column definition before the grid is created to work properly
   * @param columnDefinitions
   * @param options
   */
  createPluginBeforeGridCreation(columnDefinitions: Column[], options: GridOption) {
    if (options.enableCheckboxSelector) {
      this.checkboxSelectorPlugin = new Slick.CheckboxSelectColumn(options.checkboxSelector || {});
      const selectionColumn: Column = this.checkboxSelectorPlugin.getColumnDefinition();
      selectionColumn.excludeFromExport = true;
      selectionColumn.excludeFromQuery = true;
      columnDefinitions.unshift(selectionColumn);
    }
  }

  /** Create the Excel like copy manager */
  createCellExternalCopyManagerPlugin(grid: any, gridOptions: GridOption) {
    let newRowIds = 0;
    const pluginOptions = {
      clipboardCommandHandler: (editCommand) => {
        this.undoRedoBuffer.queueAndExecuteCommand.call(this.undoRedoBuffer, editCommand);
      },
      dataItemColumnValueExtractor: (item, columnDef) => {
        // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
        // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
        if (!gridOptions.editable || !columnDef.editor) {
          const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : gridOptions.exportOptions.exportWithFormatter;
          if (columnDef.formatter && isEvaluatingFormatter) {
            const formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, this._grid);
            if (columnDef.sanitizeDataExport || (gridOptions.exportOptions && gridOptions.exportOptions.sanitizeDataExport)) {
              return sanitizeHtmlToText(formattedOutput);
            }
            return formattedOutput;
          }
        }

        // else use the default "dataItemColumnValueExtractor" from the plugin itself
        // we can do that by setting back the getter with null
        return null;
      },
      readOnlyMode: false,
      includeHeaderWhenCopying: false,
      newRowCreator: (count) => {
        for (let i = 0; i < count; i++) {
          const item = {
            id: 'newRow_' + newRowIds++
          };
          grid.getData().addItem(item);
        }
      }
    };

    grid.setSelectionModel(new Slick.CellSelectionModel());
    grid.registerPlugin(new Slick.CellExternalCopyManager(pluginOptions));
  }

  /**
   * Create the Column Picker and expose all the available hooks that user can subscribe (onColumnsChanged)
   * @param grid
   * @param columnDefinitions
   * @param options
   */
  createColumnPicker(grid: any, columnDefinitions: Column[], options: GridOption) {
    // localization support for the picker
    const forceFitTitle = options.enableTranslate ? this.translate.instant('FORCE_FIT_COLUMNS') : 'Force fit columns';
    const syncResizeTitle = options.enableTranslate ? this.translate.instant('SYNCHRONOUS_RESIZE') : 'Synchronous resize';

    options.columnPicker = options.columnPicker || {};
    options.columnPicker.forceFitTitle = options.columnPicker.forceFitTitle || forceFitTitle;
    options.columnPicker.syncResizeTitle = options.columnPicker.syncResizeTitle || syncResizeTitle;

    this.columnPickerControl = new Slick.Controls.ColumnPicker(columnDefinitions, grid, options);
    if (grid && options.enableColumnPicker) {
      this.columnPickerControl.onColumnsChanged.subscribe((e: Event, args: CellArgs) => {
        if (options.columnPicker && typeof options.columnPicker.onColumnsChanged === 'function') {
          options.columnPicker.onColumnsChanged(e, args);
        }
      });
    }
  }

  /**
   * Create (or re-create) Grid Menu and expose all the available hooks that user can subscribe (onCommand, onMenuClose, ...)
   * @param grid
   * @param columnDefinitions
   * @param options
   */
  createGridMenu(grid: any, columnDefinitions: Column[], options: GridOption) {
    options.gridMenu = { ...this.getDefaultGridMenuOptions(), ...options.gridMenu };
    this.addGridMenuCustomCommands(grid, options);

    const gridMenuControl = new Slick.Controls.GridMenu(columnDefinitions, grid, options);
    if (grid && options.gridMenu) {
      gridMenuControl.onBeforeMenuShow.subscribe((e: Event, args: CellArgs) => {
        if (options.gridMenu && typeof options.gridMenu.onBeforeMenuShow === 'function') {
          options.gridMenu.onBeforeMenuShow(e, args);
        }
      });
      gridMenuControl.onColumnsChanged.subscribe((e: Event, args: CellArgs) => {
        if (options.gridMenu && typeof options.gridMenu.onColumnsChanged === 'function') {
          options.gridMenu.onColumnsChanged(e, args);
        }
      });
      gridMenuControl.onCommand.subscribe((e: Event, args: CellArgs) => {
        if (options.gridMenu && typeof options.gridMenu.onCommand === 'function') {
          options.gridMenu.onCommand(e, args);
        }
      });
      gridMenuControl.onMenuClose.subscribe((e: Event, args: CellArgs) => {
        if (options.gridMenu && typeof options.gridMenu.onMenuClose === 'function') {
          options.gridMenu.onMenuClose(e, args);
        }

        // we also want to resize the columns if the user decided to hide certain column(s)
        if (grid && typeof grid.autosizeColumns === 'function') {
          // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
          const gridUid = grid.getUID();
          if (gridUid && $(`.${gridUid}`).length > 0) {
            grid.autosizeColumns();
          }
        }
      });
    }
    return gridMenuControl;
  }

  /**
   * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
   * @param grid
   * @param columnDefinitions
   * @param options
   */
  createHeaderMenu(grid: any, dataView: any, columnDefinitions: Column[], options: GridOption) {
    options.headerMenu = { ...this.getDefaultHeaderMenuOptions(), ...options.headerMenu };
    if (options.enableHeaderMenu) {
      options.headerMenu = this.addHeaderMenuCustomCommands(grid, dataView, options, columnDefinitions);
    }

    const headerMenuPlugin = new Slick.Plugins.HeaderMenu(options.headerMenu);

    grid.registerPlugin(headerMenuPlugin);
    headerMenuPlugin.onCommand.subscribe((e: Event, args: HeaderMenuOnCommandArgs) => {
      if (options.headerMenu && typeof options.headerMenu.onCommand === 'function') {
        options.headerMenu.onCommand(e, args);
      }
    });
    headerMenuPlugin.onCommand.subscribe((e: Event, args: HeaderMenuOnBeforeMenuShowArgs) => {
      if (options.headerMenu && typeof options.headerMenu.onBeforeMenuShow === 'function') {
        options.headerMenu.onBeforeMenuShow(e, args);
      }
    });

    return headerMenuPlugin;
  }

  /** Create an undo redo buffer used by the Excel like copy */
  createUndoRedoBuffer() {
    const commandQueue = [];
    let commandCtr = 0;

    this.undoRedoBuffer = {
      queueAndExecuteCommand: (editCommand) => {
        commandQueue[commandCtr] = editCommand;
        commandCtr++;
        editCommand.execute();
      },
      undo: () => {
        if (commandCtr === 0) { return; }
        commandCtr--;
        const command = commandQueue[commandCtr];
        if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
          command.undo();
        }
      },
      redo: () => {
        if (commandCtr >= commandQueue.length) { return; }
        const command = commandQueue[commandCtr];
        commandCtr++;
        if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
          command.execute();
        }
      }
    };
  }

  /** Hide a column from the grid */
  hideColumn(column: Column) {
    if (this._grid && this.visibleColumns) {
      const columnIndex = this._grid.getColumnIndex(column.id);
      this.visibleColumns = this.removeColumnByIndex(this.visibleColumns, columnIndex);
      this._grid.setColumns(this.visibleColumns);
    }
  }

  /** Attach an undo shortcut key hook that will redo/undo the copy buffer */
  hookUndoShortcutKey() {
    // undo shortcut
    $(document).keydown((e) => {
      if (e.which === 90 && (e.ctrlKey || e.metaKey)) {    // CTRL + (shift) + Z
        if (e.shiftKey) {
          this.undoRedoBuffer.redo();
        } else {
          this.undoRedoBuffer.undo();
        }
      }
    });
  }

  /** Dispose of all the controls & plugins */
  dispose() {
    this._grid = null;
    this._dataView = null;
    this.visibleColumns = [];

    if (this.columnPickerControl) {
      this.columnPickerControl.destroy();
      this.columnPickerControl = null;
    }
    if (this.gridMenuControl) {
      this.gridMenuControl.destroy();
      this.gridMenuControl = null;
    }
    if (this.rowSelectionPlugin) {
      this.rowSelectionPlugin.destroy();
      this.rowSelectionPlugin = null;
    }
    if (this.checkboxSelectorPlugin) {
      this.checkboxSelectorPlugin.destroy();
      this.checkboxSelectorPlugin = null;
    }
    if (this.autoTooltipPlugin) {
      this.autoTooltipPlugin.destroy();
      this.autoTooltipPlugin = null;
    }
    if (this.headerButtonsPlugin) {
      this.headerButtonsPlugin.destroy();
      this.headerButtonsPlugin = null;
    }
    if (this.headerMenuPlugin) {
      this.headerMenuPlugin.destroy();
      this.headerMenuPlugin = null;
    }
  }

  /**
   * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
   * @param grid
   * @param options
   * @return gridMenu
   */
  private addGridMenuCustomCommands(grid: any, options: GridOption) {
    const backendApi = options.backendServiceApi || options.onBackendEventApi || null;

    if (options.enableFiltering) {
      // show grid menu: clear all filters
      if (options && options.gridMenu && options.gridMenu.showClearAllFiltersCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'clear-filter').length === 0) {
        options.gridMenu.customItems.push(
          {
            iconCssClass: options.gridMenu.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
            title: options.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : 'Clear All Filters',
            disabled: false,
            command: 'clear-filter',
            positionOrder: 50
          }
        );
      }

      // show grid menu: toggle filter row
      if (options && options.gridMenu && options.gridMenu.showToggleFilterCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'toggle-filter').length === 0) {
        options.gridMenu.customItems.push(
          {
            iconCssClass: options.gridMenu.iconToggleFilterCommand || 'fa fa-random',
            title: options.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : 'Toggle Filter Row',
            disabled: false,
            command: 'toggle-filter',
            positionOrder: 52
          }
        );
      }

      // show grid menu: refresh dataset
      if (options && options.gridMenu && options.gridMenu.showRefreshDatasetCommand && backendApi && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'refresh-dataset').length === 0) {
        options.gridMenu.customItems.push(
          {
            iconCssClass: options.gridMenu.iconRefreshDatasetCommand || 'fa fa-refresh',
            title: options.enableTranslate ? this.translate.instant('REFRESH_DATASET') : 'Refresh Dataset',
            disabled: false,
            command: 'refresh-dataset',
            positionOrder: 54
          }
        );
      }
    }

    if (options.enableSorting) {
      // show grid menu: clear all sorting
      if (options && options.gridMenu && options.gridMenu.showClearAllSortingCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'clear-sorting').length === 0) {
        options.gridMenu.customItems.push(
          {
            iconCssClass: options.gridMenu.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
            title: options.enableTranslate ? this.translate.instant('CLEAR_ALL_SORTING') : 'Clear All Sorting',
            disabled: false,
            command: 'clear-sorting',
            positionOrder: 51
          }
        );
      }
    }

    // show grid menu: export to file
    if (options && options.enableExport && options.gridMenu && options.gridMenu.showExportCsvCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'export-csv').length === 0) {
      options.gridMenu.customItems.push(
        {
          iconCssClass: options.gridMenu.iconExportCsvCommand || 'fa fa-download',
          title: options.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : 'Export in CSV format',
          disabled: false,
          command: 'export-csv',
          positionOrder: 53
        }
      );
    }
    // show grid menu: export to text file as tab delimited
    if (options && options.enableExport && options.gridMenu && options.gridMenu.showExportTextDelimitedCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'export-text-delimited').length === 0) {
      options.gridMenu.customItems.push(
        {
          iconCssClass: options.gridMenu.iconExportTextDelimitedCommand || 'fa fa-download',
          title: options.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : 'Export in Text format (Tab delimited)',
          disabled: false,
          command: 'export-text-delimited',
          positionOrder: 54
        }
      );
    }

    // Command callback, what will be executed after command is clicked
    if (options.gridMenu && options.gridMenu.customItems.length > 0) {
      options.gridMenu.onCommand = (e, args) => {
        if (args && args.command) {
          switch (args.command) {
            case 'clear-filter':
              this.filterService.clearFilters();
              this._dataView.refresh();
              break;
            case 'clear-sorting':
              this.sortService.clearSorting();
              this._dataView.refresh();
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
              grid.setHeaderRowVisibility(!grid.getOptions().showHeaderRow);
              break;
            case 'toggle-toppanel':
              grid.setTopPanelVisibility(!grid.getOptions().showTopPanel);
              break;
            case 'refresh-dataset':
              this.refreshBackendDataset();
              break;
            default:
              alert('Command: ' + args.command);
              break;
          }
        }
      };
    }

    // add the custom "Commands" title if there are any commands
    if (options && options.gridMenu && options.gridMenu.customItems && options.gridMenu.customItems.length > 0) {
      const customTitle = options.enableTranslate ? this.translate.instant('COMMANDS') : 'Commands';
      options.gridMenu.customTitle = options.gridMenu.customTitle || customTitle;

      // sort the custom items by their position in the list
      options.gridMenu.customItems.sort((itemA, itemB) => {
        if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
          return itemA.positionOrder - itemB.positionOrder;
        }
        return 0;
      });
    }
  }

  /**
   * Create Header Menu with Custom Commands if user has enabled Header Menu
   * @param grid
   * @param dataView
   * @param options
   * @param columnDefinitions
   * @return header menu
   */
  private addHeaderMenuCustomCommands(grid: any, dataView: any, options: GridOption, columnDefinitions: Column[]): HeaderMenu {
    const headerMenuOptions = options.headerMenu;

    if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
      columnDefinitions.forEach((columnDef: Column) => {
        if (columnDef) {
          if (!columnDef.header || !columnDef.header.menu) {
            columnDef.header = {
              menu: {
                items: []
              }
            };
          }
          const columnHeaderMenuItems: HeaderMenuItem[] = columnDef.header.menu.items || [];

          // Sorting Commands
          if (options.enableSorting && columnDef.sortable && headerMenuOptions.showSortCommands) {
            if (columnHeaderMenuItems.filter((item: HeaderMenuItem) => item.command === 'sort-asc').length === 0) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                title: options.enableTranslate ? this.translate.instant('SORT_ASCENDING') : 'Sort Ascending',
                command: 'sort-asc'
              });
            }
            if (columnHeaderMenuItems.filter((item: HeaderMenuItem) => item.command === 'sort-desc').length === 0) {
              columnHeaderMenuItems.push({
                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                title: options.enableTranslate ? this.translate.instant('SORT_DESCENDING') : 'Sort Descending',
                command: 'sort-desc'
              });
            }
          }

          // Hide Column Command
          if (headerMenuOptions.showColumnHideCommand && columnHeaderMenuItems.filter((item: HeaderMenuItem) => item.command === 'hide').length === 0) {
            columnHeaderMenuItems.push({
              iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
              title: options.enableTranslate ? this.translate.instant('HIDE_COLUMN') : 'Hide Column',
              command: 'hide'
            });
          }
        }
      });

      // Command callback, what will be executed after command is clicked
      if (headerMenuOptions) {
        headerMenuOptions.onCommand = (e, args) => {
          if (args && args.command) {
            switch (args.command) {
              case 'hide':
              this.hideColumn(args.column);
              this.autoResizeColumns();
                break;
              case 'sort-asc':
              case 'sort-desc':
                // get previously sorted columns
                const cols: ColumnSort[] = this.sortService.getPreviousColumnSorts(args.column.id + '');

                // add to the column array, the column sorted by the header menu
                cols.push({ sortCol: args.column, sortAsc: (args.command === 'sort-asc') });
                if (options.backendServiceApi) {
                  this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid });
                } else {
                  this.sortService.onLocalSortChanged(grid, options, dataView, cols);
                }

                // update the this.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                const newSortColumns: ColumnSort[] = cols.map((col) => {
                  return { columnId: col.sortCol.id, sortAsc: col.sortAsc };
                });
                grid.setSortColumns(newSortColumns); // add sort icon in UI
                break;
              default:
                alert('Command: ' + args.command);
                break;
            }
          }
        };
      }
    }

    return headerMenuOptions;
  }

  /** Refresh the dataset through the Backend Service */
  refreshBackendDataset() {
    let query;
    const backendApi = this._gridOptions.backendServiceApi || this._gridOptions.onBackendEventApi;
    if (!backendApi || !backendApi.service || !backendApi.process) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }

    if (backendApi.service) {
      query = backendApi.service.buildQuery();
    }

    if (query && query !== '') {
      if (backendApi.preProcess) {
        backendApi.preProcess();
      }

      // the process could be an Observable (like HttpClient) or a Promise
      // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
      const observableOrPromise = backendApi.process(query);

      castToPromise(observableOrPromise).then((processResult: GraphqlResult | any) => {
        // from the result, call our internal post process to update the Dataset and Pagination info
        if (processResult && backendApi.internalPostProcess) {
          backendApi.internalPostProcess(processResult);
        }

        // send the response process to the postProcess callback
        if (backendApi.postProcess) {
          backendApi.postProcess(processResult);
        }
      });
    }
  }

  /** Remove a column from the grid by it's index in the grid */
  removeColumnByIndex(array: any[], index: number) {
    return array.filter((el: any, i: number) => {
      return index !== i;
    });
  }

  /**
   * Translate the Column Picker and it's last 2 checkboxes
   * Note that the only way that seems to work is to destroy and re-create the Column Picker
   * Changing only the columnPicker.columnTitle with i18n translate was not enough.
   */
  translateColumnPicker() {
    // destroy and re-create the Column Picker which seems to be the only way to translate properly
    if (this.columnPickerControl) {
      this.columnPickerControl.destroy();
      this.columnPickerControl = null;
    }

    this._gridOptions.columnPicker = undefined;
    this.createColumnPicker(this._grid, this.visibleColumns, this._gridOptions);
  }

  /**
   * Translate the Grid Menu ColumnTitle and CustomTitle.
   * Note that the only way that seems to work is to destroy and re-create the Grid Menu
   * Changing only the gridMenu.columnTitle with i18n translate was not enough.
   */
  translateGridMenu() {
    // destroy and re-create the Grid Menu which seems to be the only way to translate properly
    this.gridMenuControl.destroy();

    // reset all Grid Menu options that have translation text & then re-create the Grid Menu and also the custom items array
    if (this._gridOptions && this._gridOptions.gridMenu) {
      this._gridOptions.gridMenu = this.resetGridMenuTranslations(this._gridOptions.gridMenu);
    }
    this.createGridMenu(this._grid, this.visibleColumns, this._gridOptions);
  }

  /**
   * Translate manually the header titles.
   * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
   * @param locale locale to use
   */
  translateHeaders(locale?: string) {
    if (locale) {
      this.translate.use(locale);
    }

    for (const column of this._columnDefinitions) {
      if (column.headerKey) {
        column.name = this.translate.instant(column.headerKey);
      }
    }

    // calling setColumns() will trigger a grid re-render
    this._grid.setColumns(this._columnDefinitions);
  }

  /**
   * @return default Grid Menu options
   */
  private getDefaultGridMenuOptions(): GridMenu {
    return {
      columnTitle: this.translate.instant('COLUMNS') || 'Columns',
      forceFitTitle: this.translate.instant('FORCE_FIT_COLUMNS') || 'Force fit columns',
      syncResizeTitle: this.translate.instant('SYNCHRONOUS_RESIZE') || 'Synchronous resize',
      iconCssClass: 'fa fa-bars',
      menuWidth: 18,
      customTitle: undefined,
      customItems: [],
      showClearAllFiltersCommand: true,
      showRefreshDatasetCommand: true,
      showToggleFilterCommand: true
    };
  }

  /**
   * @return default Header Menu options
   */
  private getDefaultHeaderMenuOptions(): HeaderMenu {
    return {
      autoAlignOffset: 12,
      minWidth: 140,
      showColumnHideCommand: true,
      showSortCommands: true
    };
  }

  /**
   * Reset all the Grid Menu options which have text to translate
   * @param grid menu object
   */
  private resetGridMenuTranslations(gridMenu: GridMenu): GridMenu {
    // we will reset the custom items array since the commands title have to be translated too (no worries, we will re-create it later)
    gridMenu.customItems = [];
    delete gridMenu.customTitle;

    gridMenu.columnTitle = this.translate.instant('COLUMNS') || 'Columns';
    gridMenu.forceFitTitle = this.translate.instant('FORCE_FIT_COLUMNS') || 'Force fit columns';
    gridMenu.syncResizeTitle = this.translate.instant('SYNCHRONOUS_RESIZE') || 'Synchronous resize';

    return gridMenu;
  }
}
