import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExcelExportService } from '@slickgrid-universal/excel-export';

import {
  addWhiteSpaces,
  AngularGridInstance,
  Aggregators,
  Column,
  decimalFormatted,
  FieldType,
  Filters,
  findItemInTreeStructure,
  Formatter,
  Formatters,
  GridOption,
  isNumber,
  SlickDataView,
} from './../modules/angular-slickgrid';

@Component({
  templateUrl: './grid-tree-data-hierarchical.component.html',
  styleUrls: ['grid-tree-data-hierarchical.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridTreeDataHierarchicalComponent implements OnInit {
  angularGrid!: AngularGridInstance;
  dataViewObj: any;
  gridObj: any;
  gridOptions!: GridOption;
  columnDefinitions!: Column[];
  datasetHierarchical: any[] = [];
  hideSubTitle = false;
  isExcludingChildWhenFiltering = false;
  isAutoApproveParentItemWhenTreeColumnIsValid = true;
  isAutoRecalcTotalsOnFilterChange = false;
  isRemoveLastInsertedPopSongDisabled = true;
  lastInsertedPopSongId: number | undefined;
  searchString = '';

  ngOnInit(): void {
    // define the grid options & columns and then create the grid itself
    this.defineGrid();

    // mock a dataset
    this.datasetHierarchical = this.mockDataset();
  }

  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'file',
        name: 'Files',
        field: 'file',
        type: FieldType.string,
        width: 150,
        formatter: this.treeFormatter,
        filterable: true,
        sortable: true,
      },
      {
        id: 'dateModified',
        name: 'Date Modified',
        field: 'dateModified',
        formatter: Formatters.dateIso,
        type: FieldType.dateUtc,
        outputType: FieldType.dateIso,
        minWidth: 90,
        exportWithFormatter: true,
        filterable: true,
        filter: { model: Filters.compoundDate },
      },
      {
        id: 'description',
        name: 'Description',
        field: 'description',
        minWidth: 90,
        filterable: true,
        sortable: true,
      },
      {
        id: 'size',
        name: 'Size',
        field: 'size',
        minWidth: 90,
        type: FieldType.number,
        exportWithFormatter: true,
        excelExportOptions: { autoDetectCellFormat: false },
        filterable: true,
        filter: { model: Filters.compoundInputNumber },

        // Formatter option #1 (treeParseTotalFormatters)
        // if you wish to use any of the GroupTotalFormatters (or even regular Formatters), we can do so with the code below
        // use `treeTotalsFormatter` or `groupTotalsFormatter` to show totals in a Tree Data grid
        // provide any regular formatters inside the params.formatters

        // formatter: Formatters.treeParseTotals,
        // treeTotalsFormatter: GroupTotalFormatters.sumTotalsBold,
        // // groupTotalsFormatter: GroupTotalFormatters.sumTotalsBold,
        // params: {
        //   // we can also supply extra params for Formatters/GroupTotalFormatters like min/max decimals
        //   groupFormatterSuffix: ' MB', minDecimal: 0, maxDecimal: 2,
        // },

        // OR option #2 (custom Formatter)
        formatter: (_row, _cell, value, column, dataContext) => {
          // parent items will a "__treeTotals" property (when creating the Tree and running Aggregation, it mutates all items, all extra props starts with "__" prefix)
          const fieldId = column.field;

          // Tree Totals, if exists, will be found under `__treeTotals` prop
          if (dataContext?.__treeTotals !== undefined) {
            const treeLevel = dataContext[this.gridOptions?.treeDataOptions?.levelPropName || '__treeLevel'];
            const sumVal = dataContext?.__treeTotals?.['sum'][fieldId];
            const avgVal = dataContext?.__treeTotals?.['avg'][fieldId];

            if (avgVal !== undefined && sumVal !== undefined) {
              // when found Avg & Sum, we'll display both
              return isNaN(sumVal)
                ? ''
                : `<span class="text-primary bold">sum: ${decimalFormatted(sumVal, 0, 2)} MB</span> / <span class="avg-total">avg: ${decimalFormatted(avgVal, 0, 2)} MB</span> <span class="total-suffix">(${treeLevel === 0 ? 'total' : 'sub-total'})</span>`;
            } else if (sumVal !== undefined) {
              // or when only Sum is aggregated, then just show Sum
              return isNaN(sumVal)
                ? ''
                : `<span class="text-primary bold">sum: ${decimalFormatted(sumVal, 0, 2)} MB</span> <span class="total-suffix">(${treeLevel === 0 ? 'total' : 'sub-total'})</span>`;
            }
          }
          // reaching this line means it's a regular dataContext without totals, so regular formatter output will be used
          return !isNumber(value) ? '' : `${value} MB`;
        },
      },
    ];

    this.gridOptions = {
      autoResize: {
        autoHeight: false,
        container: '#demo-container',
        rightPadding: 10,
      },
      enableAutoSizeColumns: true,
      enableAutoResize: true,
      enableExcelExport: true,
      excelExportOptions: {
        exportWithFormatter: true,
        sanitizeDataExport: true,
      },
      externalResources: [new ExcelExportService()],
      enableFiltering: true,
      enableTreeData: true, // you must enable this flag for the filtering & sorting to work as expected
      multiColumnSort: false, // multi-column sorting is not supported with Tree Data, so you need to disable it
      treeDataOptions: {
        columnId: 'file',
        childrenPropName: 'files',
        excludeChildrenWhenFilteringTree: this.isExcludingChildWhenFiltering, // defaults to false

        // skip any other filter criteria(s) if the column holding the Tree (file) passes its own filter criteria
        // (e.g. filtering with "Files = music AND Size > 7", the row "Music" and children will only show up when this flag is enabled
        // this flag only works with the other flag set to `excludeChildrenWhenFilteringTree: false`
        autoApproveParentItemWhenTreeColumnIsValid: this.isAutoApproveParentItemWhenTreeColumnIsValid,

        // you can also optionally sort by a different column and/or change sort direction
        // initialSort: {
        //   columnId: 'file',
        //   direction: 'DESC'
        // },

        // Aggregators are also supported and must always be an array even when single one is provided
        // Note: only 5 are currently supported: Avg, Sum, Min, Max and Count
        // Note 2: also note that Avg Aggregator will automatically give you the "avg", "count" and "sum" so if you need these 3 then simply calling Avg will give you better perf
        // aggregators: [new Aggregators.Sum('size')]
        aggregators: [
          new Aggregators.Avg('size'),
          new Aggregators.Sum('size') /* , new Aggregators.Min('size'), new Aggregators.Max('size') */,
        ],

        // should we auto-recalc Tree Totals (when using Aggregators) anytime a filter changes
        // it is disabled by default for perf reason, by default it will only calculate totals on first load
        autoRecalcTotalsOnFilterChange: this.isAutoRecalcTotalsOnFilterChange,

        // add optional debounce time to limit number of execution that recalc is called, mostly useful on large dataset
        // autoRecalcTotalsDebounce: 250
      },
      // change header/cell row height
      headerRowHeight: 35,
      rowHeight: 33,
      showCustomFooter: true,

      // we can also preset collapsed items via Grid Presets (parentId: 4 => is the "pdf" folder)
      presets: {
        treeData: { toggledItems: [{ itemId: 4, isCollapsed: true }] },
      },
      // use Material Design SVG icons
      contextMenu: {
        iconCollapseAllGroupsCommand: 'mdi mdi-arrow-collapse',
        iconExpandAllGroupsCommand: 'mdi mdi-arrow-expand',
        iconClearGroupingCommand: 'mdi mdi-close',
        iconCopyCellValueCommand: 'mdi mdi-content-copy',
        iconExportCsvCommand: 'mdi mdi-download',
        iconExportExcelCommand: 'mdi mdi-file-excel-outline',
        iconExportTextDelimitedCommand: 'mdi mdi-download',
      },
      gridMenu: {
        iconCssClass: 'mdi mdi-menu',
        iconClearAllFiltersCommand: 'mdi mdi-filter-remove-outline',
        iconClearAllSortingCommand: 'mdi mdi-swap-vertical',
        iconExportCsvCommand: 'mdi mdi-download',
        iconExportExcelCommand: 'mdi mdi-file-excel-outline',
        iconExportTextDelimitedCommand: 'mdi mdi-download',
        iconRefreshDatasetCommand: 'mdi mdi-sync',
        iconToggleFilterCommand: 'mdi mdi-flip-vertical',
        iconTogglePreHeaderCommand: 'mdi mdi-flip-vertical',
      },
      headerMenu: {
        iconClearFilterCommand: 'mdi mdi mdi-filter-remove-outline',
        iconClearSortCommand: 'mdi mdi-swap-vertical',
        iconSortAscCommand: 'mdi mdi-sort-ascending',
        iconSortDescCommand: 'mdi mdi-flip-v mdi-sort-descending',
        iconColumnHideCommand: 'mdi mdi-close',
      },
    };
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.dataViewObj = angularGrid.dataView;
  }

  changeAutoApproveParentItem() {
    this.isAutoApproveParentItemWhenTreeColumnIsValid = !this.isAutoApproveParentItemWhenTreeColumnIsValid;
    this.gridOptions.treeDataOptions!.autoApproveParentItemWhenTreeColumnIsValid =
      this.isAutoApproveParentItemWhenTreeColumnIsValid;
    this.angularGrid.slickGrid.setOptions(this.gridOptions);
    this.angularGrid.filterService.refreshTreeDataFilters();
    return true;
  }

  changeAutoRecalcTotalsOnFilterChange() {
    this.isAutoRecalcTotalsOnFilterChange = !this.isAutoRecalcTotalsOnFilterChange;
    this.gridOptions.treeDataOptions!.autoRecalcTotalsOnFilterChange = this.isAutoRecalcTotalsOnFilterChange;
    this.angularGrid.slickGrid?.setOptions(this.gridOptions);

    // since it doesn't take current filters in consideration, we better clear them
    this.angularGrid.filterService.clearFilters();
    this.angularGrid.treeDataService.enableAutoRecalcTotalsFeature();
    return true;
  }

  changeExcludeChildWhenFiltering() {
    this.isExcludingChildWhenFiltering = !this.isExcludingChildWhenFiltering;
    this.gridOptions.treeDataOptions!.excludeChildrenWhenFilteringTree = this.isExcludingChildWhenFiltering;
    this.angularGrid.slickGrid.setOptions(this.gridOptions);
    this.angularGrid.filterService.refreshTreeDataFilters();
    return true;
  }

  clearSearch() {
    this.searchString = '';
    this.updateFilter();
  }

  searchStringChanged() {
    this.updateFilter();
  }

  updateFilter() {
    this.angularGrid.filterService.updateFilters([{ columnId: 'file', searchTerms: [this.searchString] }], true, false, true);
  }

  treeFormatter: Formatter = (_row, _cell, value, _columnDef, dataContext, grid) => {
    const gridOptions = grid.getOptions();
    const treeLevelPropName = (gridOptions.treeDataOptions && gridOptions.treeDataOptions.levelPropName) || '__treeLevel';
    if (value === null || value === undefined || dataContext === undefined) {
      return '';
    }
    const dataView = grid.getData<SlickDataView>();
    const data = dataView.getItems();
    const identifierPropName = dataView.getIdPropertyName() || 'id';
    const idx = dataView.getIdxById(dataContext[identifierPropName]) as number;
    const prefix = this.getFileIcon(value);
    const treeLevel = dataContext[treeLevelPropName];
    const exportIndentationLeadingChar = '.';

    value = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const spacer = `<span style="display:inline-block; width:${15 * treeLevel}px;"></span>`;
    const indentSpacer = addWhiteSpaces(5 * treeLevel);

    if (data[idx + 1]?.[treeLevelPropName] > data[idx][treeLevelPropName] || data[idx]['__hasChildren']) {
      const folderPrefix = `<span class="mdi icon ${dataContext.__collapsed ? 'mdi-folder' : 'mdi-folder-open'}"></span>`;
      if (dataContext.__collapsed) {
        return `<span class="hidden">${exportIndentationLeadingChar}</span>${spacer}${indentSpacer} <span class="slick-group-toggle collapsed" level="${treeLevel}"></span>${folderPrefix} ${prefix} ${value}`;
      } else {
        return `<span class="hidden">${exportIndentationLeadingChar}</span>${spacer}${indentSpacer} <span class="slick-group-toggle expanded" level="${treeLevel}"></span>${folderPrefix} ${prefix} ${value}`;
      }
    } else {
      return `<span class="hidden">${exportIndentationLeadingChar}</span>${spacer}${indentSpacer} <span class="slick-group-toggle" level="${treeLevel}"></span>${prefix} ${value}`;
    }
  };

  getFileIcon(value: string) {
    let prefix = '';
    if (value.includes('.pdf')) {
      prefix = '<span class="mdi icon mdi-file-pdf-outline"></span>';
    } else if (value.includes('.txt')) {
      prefix = '<span class="mdi icon mdi-file-document-outline"></span>';
    } else if (value.includes('.xls')) {
      prefix = '<span class="mdi icon mdi-file-excel-outline"></span>';
    } else if (value.includes('.mp3')) {
      prefix = '<span class="mdi icon mdi-file-music-outline"></span>';
    }
    return prefix;
  }

  /**
   * A simple method to add a new item inside the first group that we find.
   * After adding the item, it will sort by parent/child recursively
   */
  addNewFile() {
    const newId = this.dataViewObj.getLength() + 50;

    // find first parent object and add the new item as a child
    const tmpDatasetHierarchical = [...this.datasetHierarchical];
    const popFolderItem = findItemInTreeStructure(tmpDatasetHierarchical, (x) => x.file === 'pop', 'files');

    if (popFolderItem && Array.isArray(popFolderItem.files)) {
      popFolderItem.files.push({
        id: newId,
        file: `pop-${newId}.mp3`,
        dateModified: new Date(),
        size: newId + 3,
      });
      this.lastInsertedPopSongId = newId;
      this.isRemoveLastInsertedPopSongDisabled = false;

      // overwrite hierarchical dataset which will also trigger a grid sort and rendering
      this.datasetHierarchical = tmpDatasetHierarchical;

      // scroll into the position, after insertion cycle, where the item was added
      window.setTimeout(() => {
        const rowIndex = this.dataViewObj.getRowById(popFolderItem.id);
        this.gridObj.scrollRowIntoView(rowIndex + 3);
      }, 10);
    }
  }

  deleteFile() {
    const tmpDatasetHierarchical = [...this.datasetHierarchical];
    const popFolderItem = findItemInTreeStructure(this.datasetHierarchical, (x) => x.file === 'pop', 'files');
    const songItemFound = findItemInTreeStructure(this.datasetHierarchical, (x) => x.id === this.lastInsertedPopSongId, 'files');

    if (popFolderItem && songItemFound) {
      const songIdx = popFolderItem.files.findIndex((f: any) => f.id === songItemFound.id);
      if (songIdx >= 0) {
        popFolderItem.files.splice(songIdx, 1);
        this.lastInsertedPopSongId = undefined;
        this.isRemoveLastInsertedPopSongDisabled = true;

        // overwrite hierarchical dataset which will also trigger a grid sort and rendering
        this.datasetHierarchical = tmpDatasetHierarchical;
      }
    }
  }

  clearFilters() {
    this.angularGrid.filterService.clearFilters();
  }

  collapseAll() {
    this.angularGrid.treeDataService.toggleTreeDataCollapse(true);
  }

  expandAll() {
    this.angularGrid.treeDataService.toggleTreeDataCollapse(false);
  }

  logHierarchicalStructure() {
    console.log('exploded array', this.angularGrid.treeDataService.datasetHierarchical);
  }

  logFlatStructure() {
    console.log('flat array', this.angularGrid.treeDataService.dataset);
  }

  mockDataset() {
    return [
      { id: 24, file: 'bucket-list.txt', dateModified: '2012-03-05T12:44:00.123Z', size: 0.5 },
      { id: 18, file: 'something.txt', dateModified: '2015-03-03T03:50:00.123Z', size: 90 },
      {
        id: 21,
        file: 'documents',
        files: [
          {
            id: 2,
            file: 'txt',
            files: [
              {
                id: 3,
                file: 'todo.txt',
                description: 'things to do someday maybe',
                dateModified: '2015-05-12T14:50:00.123Z',
                size: 0.7,
              },
            ],
          },
          {
            id: 4,
            file: 'pdf',
            files: [
              { id: 22, file: 'map2.pdf', dateModified: '2015-07-21T08:22:00.123Z', size: 2.9 },
              { id: 5, file: 'map.pdf', dateModified: '2015-05-21T10:22:00.123Z', size: 3.1 },
              { id: 6, file: 'internet-bill.pdf', dateModified: '2015-05-12T14:50:00.123Z', size: 1.3 },
              { id: 23, file: 'phone-bill.pdf', dateModified: '2015-05-01T07:50:00.123Z', size: 1.5 },
            ],
          },
          {
            id: 9,
            file: 'misc',
            files: [{ id: 10, file: 'warranties.txt', dateModified: '2015-02-26T16:50:00.123Z', size: 0.4 }],
          },
          {
            id: 7,
            file: 'xls',
            files: [{ id: 8, file: 'compilation.xls', dateModified: '2014-10-02T14:50:00.123Z', size: 2.3 }],
          },
          { id: 55, file: 'unclassified.csv', dateModified: '2015-04-08T03:44:12.333Z', size: 0.25 },
          { id: 56, file: 'unresolved.csv', dateModified: '2015-04-03T03:21:12.000Z', size: 0.79 },
          { id: 57, file: 'zebra.dll', dateModified: '2016-12-08T13:22:12.432', size: 1.22 },
        ],
      },
      {
        id: 11,
        file: 'music',
        files: [
          {
            id: 12,
            file: 'mp3',
            files: [
              { id: 16, file: 'rock', files: [{ id: 17, file: 'soft.mp3', dateModified: '2015-05-13T13:50:00Z', size: 98 }] },
              {
                id: 14,
                file: 'pop',
                files: [
                  { id: 15, file: 'theme.mp3', description: 'Movie Theme Song', dateModified: '2015-03-01T17:05:00Z', size: 47 },
                  { id: 25, file: 'song.mp3', description: 'it is a song...', dateModified: '2016-10-04T06:33:44Z', size: 6.3 },
                ],
              },
              { id: 33, file: 'other', files: [] },
            ],
          },
        ],
      },
      {
        id: 26,
        file: 'recipes',
        description: 'Cake Recipes',
        dateModified: '2012-03-05T12:44:00.123Z',
        files: [
          {
            id: 29,
            file: 'cheesecake',
            description: 'strawberry cheesecake',
            dateModified: '2012-04-04T13:52:00.123Z',
            size: 0.2,
          },
          {
            id: 30,
            file: 'chocolate-cake',
            description: 'tasty sweet chocolate cake',
            dateModified: '2012-05-05T09:22:00.123Z',
            size: 0.2,
          },
          {
            id: 31,
            file: 'coffee-cake',
            description: 'chocolate coffee cake',
            dateModified: '2012-01-01T08:08:48.123Z',
            size: 0.2,
          },
        ],
      },
    ];
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
