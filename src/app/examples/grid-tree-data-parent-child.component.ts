import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExcelExportService } from '@slickgrid-universal/excel-export';

import {
  AngularGridInstance,
  Column,
  FieldType,
  Filters,
  Formatters,
  GridOption,
  GridStateChange,
  GridStateType,
  TreeToggledItem,
  TreeToggleStateChange,
} from './../modules/angular-slickgrid';

const NB_ITEMS = 500;

@Component({
  templateUrl: './grid-tree-data-parent-child.component.html',
  styleUrls: ['grid-tree-data-parent-child.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridTreeDataParentChildComponent implements OnInit {
  angularGrid!: AngularGridInstance;
  dataViewObj: any;
  gridObj: any;
  gridOptions!: GridOption;
  columnDefinitions!: Column[];
  dataset!: any[];
  loadingClass = '';
  hideSubTitle = false;
  isLargeDataset = false;
  hasNoExpandCollapseChanged = true;
  treeToggleItems: TreeToggledItem[] = [];

  constructor(private cdref: ChangeDetectorRef) {}

  ngOnInit(): void {
    // define the grid options & columns and then create the grid itself
    this.defineGrid();

    // mock a dataset
    this.dataset = this.loadData(NB_ITEMS);
  }

  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'title',
        name: 'Title',
        field: 'title',
        width: 220,
        cssClass: 'cell-title',
        filterable: true,
        sortable: true,
        exportWithFormatter: false,
        queryFieldSorter: 'id',
        type: FieldType.string,
        formatter: Formatters.tree,
        exportCustomFormatter: Formatters.treeExport,
      },
      { id: 'duration', name: 'Duration', field: 'duration', minWidth: 90, filterable: true },
      {
        id: 'percentComplete',
        name: '% Complete',
        field: 'percentComplete',
        minWidth: 120,
        maxWidth: 200,
        exportWithFormatter: false,
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundSlider, operator: '>=' },
        formatter: Formatters.percentCompleteBarWithText,
        type: FieldType.number,
      },
      {
        id: 'start',
        name: 'Start',
        field: 'start',
        minWidth: 60,
        type: FieldType.dateIso,
        filterable: true,
        sortable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
      },
      {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        minWidth: 60,
        type: FieldType.dateIso,
        filterable: true,
        sortable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
      },
      {
        id: 'effortDriven',
        name: 'Effort Driven',
        width: 80,
        minWidth: 20,
        maxWidth: 80,
        cssClass: 'cell-effort-driven',
        field: 'effortDriven',
        exportWithFormatter: false,
        formatter: Formatters.checkmarkMaterial,
        cannotTriggerInsert: true,
        filterable: true,
        filter: {
          collection: [
            { value: '', label: '' },
            { value: true, label: 'True' },
            { value: false, label: 'False' },
          ],
          model: Filters.singleSelect,
        },
      },
    ];

    this.gridOptions = {
      autoResize: {
        container: '#demo-container',
        rightPadding: 10,
      },
      enableAutoSizeColumns: true,
      enableAutoResize: true,
      enableExcelExport: true,
      excelExportOptions: { exportWithFormatter: true, sanitizeDataExport: true },
      externalResources: [new ExcelExportService()],
      enableFiltering: true,
      showCustomFooter: true, // display some metrics in the bottom custom footer
      enableTreeData: true, // you must enable this flag for the filtering & sorting to work as expected
      treeDataOptions: {
        columnId: 'title',
        parentPropName: 'parentId',
        // this is optional, you can define the tree level property name that will be used for the sorting/indentation, internally it will use "__treeLevel"
        levelPropName: 'treeLevel',
        indentMarginLeft: 15,
        initiallyCollapsed: true,

        // you can optionally sort by a different column and/or sort direction
        // this is the recommend approach, unless you are 100% that your original array is already sorted (in most cases it's not)
        // initialSort: {
        //   columnId: 'title',
        //   direction: 'ASC'
        // },
        // we can also add a custom Formatter just for the title text portion
        titleFormatter: (_row, _cell, value, _def, dataContext) => {
          let prefix = '';
          if (dataContext.treeLevel > 0) {
            prefix = `<span class="mdi mdi-subdirectory-arrow-right"></span>`;
          }
          return `${prefix}<span class="bold">${value}</span> <span style="font-size:11px; margin-left: 15px;">(parentId: ${dataContext.parentId})</span>`;
        },
      },
      multiColumnSort: false, // multi-column sorting is not supported with Tree Data, so you need to disable it
      presets: {
        filters: [{ columnId: 'percentComplete', searchTerms: [25], operator: '>=' }],
        // treeData: { toggledItems: [{ itemId: 1, isCollapsed: false }] },
      },

      // change header/cell row height
      headerRowHeight: 45,
      rowHeight: 40,
      // if you're dealing with lots of data, it is recommended to use the filter debounce
      filterTypingDebounce: 250,
    };
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.dataViewObj = angularGrid.dataView;
  }

  /**
   * A simple method to add a new item inside the first group that has children which is "Task 1"
   * After adding the item, it will resort by parent/child recursively but keep current sort column
   */
  addNewRow() {
    const newId = this.dataViewObj.getItemCount();
    // find "Task 1" which has `id = 1`
    const parentItemFound = this.dataViewObj.getItemById(1);

    if (parentItemFound?.__hasChildren) {
      const newItem = {
        id: newId,
        parentId: parentItemFound.id,
        title: `Task ${newId}`,
        duration: '1 day',
        percentComplete: 99,
        start: new Date(),
        finish: new Date(),
        effortDriven: false,
      };

      // use the Grid Service to insert the item,
      // it will also internally take care of updating & resorting the hierarchical dataset
      this.angularGrid.gridService.addItem(newItem);
    }
  }

  updateFirstRow() {
    // to update any of the grid rows, we CANNOT simply pass a new updated object
    // we MUST read it from the DataView first (that will include all mutated Tree Data props, like `__treeLevel`, `__parentId`, ...) and then update it
    const item = this.angularGrid.dataView.getItemById<any>(0);

    // option 1
    /*
    // now that we have the extra Tree Data props, we can update any of the object properties (while keeping the Tree Data props)
    item.duration = `11 days`;
    item.percentComplete = 77;
    item.start = new Date();
    item.finish = new Date();
    item.effortDriven = false;

    // finally we can now update the item which includes our updated props + the Tree Data props (`__treeLevel`, ...)
    this.angularGrid.gridService.updateItem(item);
    */

    // optiona 2 - alternative
    // we could also simply use the spread operator directly
    this.angularGrid.gridService.updateItem({
      ...item,
      duration: `11 days`,
      percentComplete: 77,
      start: new Date(),
      finish: new Date(),
      effortDriven: false,
    });
  }

  collapseAll() {
    this.angularGrid.treeDataService.toggleTreeDataCollapse(true);
  }

  collapseAllWithoutEvent() {
    this.angularGrid.treeDataService.toggleTreeDataCollapse(true, false);
  }

  expandAll() {
    this.angularGrid.treeDataService.toggleTreeDataCollapse(false);
  }

  dynamicallyChangeFilter() {
    // const randomPercentage = Math.floor((Math.random() * 99));
    this.angularGrid.filterService.updateFilters([{ columnId: 'percentComplete', operator: '<', searchTerms: [40] }]);
  }

  hideSpinner() {
    window.setTimeout(() => (this.loadingClass = ''), 200); // delay the hide spinner a bit to avoid show/hide too quickly
  }

  showSpinner() {
    if (this.isLargeDataset) {
      this.loadingClass = 'mdi mdi-load mdi-spin-1s mdi-24px';
    }
  }

  logHierarchicalStructure() {
    console.log('exploded array', this.angularGrid.treeDataService.datasetHierarchical);
  }

  logFlatStructure() {
    console.log('flat array', this.angularGrid.treeDataService.dataset);
  }

  loadData(rowCount: number) {
    this.isLargeDataset = rowCount > 5000; // we'll show a spinner when it's large, else don't show show since it should be fast enough
    let indent = 0;
    const parents = [];
    const data = [];
    // prepare the data
    for (let i = 0; i < rowCount; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor(Math.random() * 29);
      const item: any = (data[i] = {});
      let parentId;

      /*
        for demo & E2E testing purposes, let's make "Task 0" empty and then "Task 1" a parent that contains at least "Task 2" and "Task 3" which the latter will also contain "Task 4" (as shown below)
        also for all other rows don't go over indent tree level depth of 2
        Task 0
        Task 1
          Task 2
          Task 3
            Task 4
        ...
       */
      if (i === 1 || i === 0) {
        indent = 0;
        parents.pop();
      }
      if (i === 3) {
        indent = 1;
      } else if (i === 2 || i === 4 || (Math.random() > 0.8 && i > 0 && indent < 3 && i - 1 !== 0 && i - 1 !== 2)) {
        // also make sure Task 0, 2 remains empty
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
      item['finish'] = new Date(randomYear, randomMonth + 1, randomDay);
      item['effortDriven'] = i % 5 === 0;
    }
    this.dataset = data;
    return data;
  }

  handleOnTreeFullToggleEnd(treeToggleExecution: TreeToggleStateChange) {
    console.log('Tree Data changes', treeToggleExecution);
    this.hideSpinner();
  }

  /** Whenever a parent is being toggled, we'll keep a reference of all of these changes so that we can reapply them whenever we want */
  handleOnTreeItemToggled(treeToggleExecution: TreeToggleStateChange) {
    this.hasNoExpandCollapseChanged = false;
    this.cdref.detectChanges();
    this.treeToggleItems = treeToggleExecution.toggledItems as TreeToggledItem[];
    console.log('Tree Data changes', treeToggleExecution);
  }

  handleOnGridStateChanged(gridStateChange: GridStateChange) {
    this.hasNoExpandCollapseChanged = false;
    this.cdref.detectChanges();

    if (gridStateChange?.change?.type === GridStateType.treeData) {
      console.log('Tree Data gridStateChange', gridStateChange?.gridState?.treeData);
      this.treeToggleItems = gridStateChange?.gridState?.treeData?.toggledItems as TreeToggledItem[];
    }
  }

  logTreeDataToggledItems() {
    console.log(this.angularGrid.treeDataService.getToggledItems());
  }

  dynamicallyToggledFirstParent() {
    const parentPropName = 'parentId';
    const treeLevelPropName = 'treeLevel'; // if undefined in your options, the default prop name is "__treeLevel"
    const newTreeLevel = 1;

    // find first parent object and toggle it
    const childItemFound = this.dataset.find((item) => item[treeLevelPropName] === newTreeLevel);
    const parentItemFound = this.angularGrid.dataView.getItemByIdx(childItemFound[parentPropName]);

    if (childItemFound && parentItemFound) {
      this.angularGrid.treeDataService.dynamicallyToggleItemState([
        { itemId: parentItemFound.id, isCollapsed: !parentItemFound.__collapsed },
      ]);
    }
  }

  reapplyToggledItems() {
    this.angularGrid.treeDataService.applyToggledItemStateChanges(this.treeToggleItems);
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
