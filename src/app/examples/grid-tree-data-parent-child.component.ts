import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AngularGridInstance,
  Column,
  FieldType,
  Filters,
  Formatters,
  GridOption,
} from './../modules/angular-slickgrid';

const NB_ITEMS = 500;

@Component({
  templateUrl: './grid-tree-data-parent-child.component.html',
  styleUrls: ['grid-tree-data-parent-child.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridTreeDataParentChildComponent implements OnInit {
  title = 'Example 28: Tree Data <small>(from a flat dataset with <code>parentId</code> references)</small>';
  subTitle = `<ul>
    <li>It is assumed that your dataset will have Parent/Child references AND also Tree Level (indent) property.</li>
    <ul>
      <li>If you do not have the Tree Level (indent), you could call "convertParentChildArrayToHierarchicalView()" then call "convertHierarchicalViewToParentChildArray()"</li>
      <li>You could also pass the result of "convertParentChildArrayToHierarchicalView()" to "dataset-hierarchical.bind" as defined in the next Hierarchical Example</li>
    </ul>
    <li><b>Styling - Material Theme</b></li>
    <ul>
      <li>The Material Theme was created with SASS and compiled in CSS (<a href="https://github.com/ghiscoding/Angular-Slickgrid/blob/master/src/app/modules/angular-slickgrid/styles/slickgrid-theme-material.scss" target="_blank">slickgrid-theme-material.scss</a>), you can override any of its SASS variables</li>
      <li>We use a small subset of <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a></li>
      <li>you might need to refresh the page to clear the browser cache and see the correct theme</li>
    </ul>
  </ul>`;

  angularGrid!: AngularGridInstance;
  dataViewObj: any;
  gridObj: any;
  gridOptions!: GridOption;
  columnDefinitions!: Column[];
  dataset!: any[];
  datasetHierarchical: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // define the grid options & columns and then create the grid itself
    this.defineGrid();

    // mock a dataset
    this.dataset = this.loadData(NB_ITEMS);
  }

  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'title', name: 'Title', field: 'title', width: 220, cssClass: 'cell-title',
        filterable: true, sortable: true, exportWithFormatter: false,
        queryFieldSorter: 'id', type: FieldType.string,
        formatter: Formatters.tree, exportCustomFormatter: Formatters.treeExport

      },
      { id: 'duration', name: 'Duration', field: 'duration', minWidth: 90, filterable: true },
      {
        id: 'percentComplete', name: '% Complete', field: 'percentComplete',
        minWidth: 120, maxWidth: 200, exportWithFormatter: false,
        sortable: true, filterable: true, filter: { model: Filters.compoundSlider, operator: '>=' },
        formatter: Formatters.percentCompleteBar, type: FieldType.number,
      },
      {
        id: 'start', name: 'Start', field: 'start', minWidth: 60,
        type: FieldType.dateIso, filterable: true, sortable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
      },
      {
        id: 'finish', name: 'Finish', field: 'finish', minWidth: 60,
        type: FieldType.dateIso, filterable: true, sortable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
      },
      {
        id: 'effortDriven', name: 'Effort Driven', width: 80, minWidth: 20, maxWidth: 80, cssClass: 'cell-effort-driven', field: 'effortDriven',
        exportWithFormatter: false,
        formatter: Formatters.checkmark, cannotTriggerInsert: true,
        filterable: true,
        filter: {
          collection: [{ value: '', label: '' }, { value: true, label: 'True' }, { value: false, label: 'False' }],
          model: Filters.singleSelect
        }
      }
    ];

    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 10
      },
      enableAutoSizeColumns: true,
      enableAutoResize: true,
      enableExcelExport: true,
      exportOptions: { exportWithFormatter: true },
      excelExportOptions: { exportWithFormatter: true },
      enableFiltering: true,
      showCustomFooter: true, // display some metrics in the bottom custom footer
      enableTreeData: true, // you must enable this flag for the filtering & sorting to work as expected
      treeDataOptions: {
        columnId: 'title',
        parentPropName: 'parentId',
        // this is optional, you can define the tree level property name that will be used for the sorting/indentation, internally it will use "__treeLevel"
        levelPropName: 'treeLevel',
        indentMarginLeft: 15,

        // you can optionally sort by a different column and/or sort direction
        // this is the recommend approach, unless you are 100% that your original array is already sorted (in most cases it's not)
        initialSort: {
          columnId: 'title',
          direction: 'ASC'
        },
        // we can also add a custom Formatter just for the title text portion
        titleFormatter: (_row, _cell, value, _def, dataContext) => {
          let prefix = '';
          if (dataContext.treeLevel > 0) {
            prefix = `<span class="mdi mdi-subdirectory-arrow-right mdi-v-align-sub color-se-secondary"></span>`;
          }
          return `${prefix}<span class="bold">${value}</span> <span style="font-size:11px; margin-left: 15px;">(parentId: ${dataContext.parentId})</span>`;
        },
      },
      multiColumnSort: false, // multi-column sorting is not supported with Tree Data, so you need to disable it
      presets: {
        filters: [{ columnId: 'percentComplete', searchTerms: [25], operator: '>=' }]
      },
      // change header/cell row height for material design theme
      headerRowHeight: 45,
      rowHeight: 40,
      // if you're dealing with lots of data, it is recommended to use the filter debounce
      filterTypingDebounce: 250,

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
      }
    };
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.dataViewObj = angularGrid.dataView;
  }

  /**
   * A simple method to add a new item inside the first group that we find (it's random and is only for demo purposes).
   * After adding the item, it will sort by parent/child recursively
   */
  addNewRow() {
    const newId = this.dataViewObj.getItemCount();
    const parentPropName = 'parentId';
    const treeLevelPropName = 'treeLevel'; // if undefined in your options, the default prop name is "__treeLevel"
    const newTreeLevel = 1;

    // find first parent object and add the new item as a child
    const childItemFound = this.dataViewObj.getItems().find((item: any) => item[treeLevelPropName] === newTreeLevel);
    const parentItemFound = this.dataViewObj.getItemByIdx(childItemFound[parentPropName]);

    if (childItemFound && parentItemFound) {
      const newItem = {
        id: newId,
        parentId: parentItemFound.id,
        title: `Task ${newId}`,
        duration: '1 day',
        percentComplete: 99,
        start: new Date(),
        finish: new Date(),
        effortDriven: false
      };

      // use the Grid Service to insert the item,
      // it will also internally take care of updating & resorting the hierarchical dataset
      this.angularGrid.gridService.addItem(newItem);
    }
  }

  collapseAll() {
    this.angularGrid.treeDataService.toggleTreeDataCollapse(true);
  }

  expandAll() {
    this.angularGrid.treeDataService.toggleTreeDataCollapse(false);
  }

  dynamicallyChangeFilter() {
    // const randomPercentage = Math.floor((Math.random() * 99));
    this.angularGrid.filterService.updateFilters([{ columnId: 'percentComplete', operator: '<', searchTerms: [40] }]);
  }

  logHierarchicalStructure() {
    console.log('exploded array', this.angularGrid.treeDataService.datasetHierarchical);
  }

  logFlatStructure() {
    console.log('flat array', this.angularGrid.treeDataService.dataset);
  }

  loadData(rowCount: number) {
    let indent = 0;
    const parents = [];
    const data = [];

    // prepare the data
    for (let i = 0; i < rowCount; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const item: any = (data[i] = {});
      let parentId;

      // for implementing filtering/sorting, don't go over indent of 2
      if (Math.random() > 0.8 && i > 0 && indent < 3) {
        indent++;
        parents.push(i - 1);
      } else if (Math.random() < 0.3 && indent > 0) {
        indent--;
        parents.pop();
      }

      if (parents.length > 0) {
        parentId = parents[parents.length - 1];
      } else {
        parentId = null;
      }

      item['id'] = i;
      item['parentId'] = parentId;
      item['title'] = `Task ${i}`;
      item['duration'] = '5 days';
      item['percentComplete'] = Math.round(Math.random() * 100);
      item['start'] = new Date(randomYear, randomMonth, randomDay);
      item['finish'] = new Date(randomYear, (randomMonth + 1), randomDay);
      item['effortDriven'] = (i % 5 === 0);
    }
    this.dataset = data;

    return data;
  }
}
