import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AngularGridInstance,
  Column,
  FieldType,
  Filters,
  GridOdataService,
  GridOption,
  GridStateChange,
  Metrics,
  OdataOption,
  OperatorType,
} from './../modules/angular-slickgrid';

const defaultPageSize = 20;
const sampleDataRoot = 'assets/data';

@Component({
  templateUrl: './grid-odata.component.html'
})
@Injectable()
export class GridOdataComponent implements OnInit {
  title = 'Example 5: Grid connected to Backend Server with OData';
  subTitle = `
    Sorting/Paging connected to a Backend OData Service (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/OData" target="_blank">Wiki docs</a>).
    <br/>
    <ul class="small">
      <li>Only "Name" field is sortable for the demo (because we use JSON files), however "multiColumnSort: true" is also supported</li>
      <li>This example also demos the Grid State feature, open the console log to see the changes</li>
      <li>String column also support operator (>, >=, <, <=, <>, !=, =, ==, *)
      <ul>
        <li>The (*) can be used as startsWith (ex.: "abc*" => startsWith "abc") / endsWith (ex.: "*xyz" => endsWith "xyz")</li>
        <li>The other operators can be used on column type number for example: ">=100" (bigger or equal than 100)</li>
      </ul>
      <li>OData Service could be replaced by other Service type in the future (GraphQL or whichever you provide)</li>
      <li>You can also preload a grid with certain "presets" like Filters / Sorters / Pagination <a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-State-&-Preset" target="_blank">Wiki - Grid Preset</a>
    </ul>
  `;
  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset = [];
  metrics: Metrics;

  isCountEnabled = true;
  odataVersion = 2;
  odataQuery = '';
  processing = true;
  status = { text: 'processing...', class: 'alert alert-danger' };

  constructor(private http: HttpClient) { }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      {
        id: 'name', name: 'Name', field: 'name', sortable: true,
        type: FieldType.string,
        filterable: true,
        filter: {
          model: Filters.compoundInput
        }
      },
      {
        id: 'gender', name: 'Gender', field: 'gender', filterable: true,
        filter: {
          model: Filters.singleSelect,
          collection: [{ value: '', label: '' }, { value: 'male', label: 'male' }, { value: 'female', label: 'female' }]
        }
      },
      { id: 'company', name: 'Company', field: 'company' },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      checkboxSelector: {
        // you can toggle these 2 properties to show the "select all" checkbox in different location
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true
      },
      enableCellNavigation: true,
      enableFiltering: true,
      enableCheckboxSelector: true,
      enableRowSelection: true,
      pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: defaultPageSize,
        totalItems: 0
      },
      presets: {
        // you can also type operator as string, e.g.: operator: 'EQ'
        filters: [
          { columnId: 'gender', searchTerms: ['male'], operator: OperatorType.equal },
        ],
        sorters: [
          // direction can be written as 'asc' (uppercase or lowercase) and/or use the SortDirection type
          { columnId: 'name', direction: 'asc' }
        ],
        pagination: { pageNumber: 2, pageSize: 20 }
      },
      backendServiceApi: {
        service: new GridOdataService(),
        options: {
          enableCount: this.isCountEnabled, // add the count in the OData query, which will return a property named "odata.count" (v2) or "@odata.count" (v4)
          version: this.odataVersion        // defaults to 2, the query string is slightly different between OData 2 and 4
        } as OdataOption,
        preProcess: () => this.displaySpinner(true),
        process: (query) => this.getCustomerApiCall(query),
        postProcess: (response) => {
          this.metrics = response.metrics;
          this.displaySpinner(false);
          this.getCustomerCallback(response);
        }
      }
    };
  }

  displaySpinner(isProcessing) {
    this.processing = isProcessing;
    this.status = (isProcessing)
      ? { text: 'processing...', class: 'alert alert-danger' }
      : { text: 'done', class: 'alert alert-success' };
  }

  getCustomerCallback(data) {
    // totalItems property needs to be filled for pagination to work correctly
    // however we need to force Angular to do a dirty check, doing a clone object will do just that
    let countPropName = 'totalRecordCount'; // you can use "totalRecordCount" or any name or "odata.count" when "enableCount" is set
    if (this.isCountEnabled) {
      countPropName = (this.odataVersion === 4) ? '@odata.count' : 'odata.count';
    }
    this.gridOptions.pagination.totalItems = data[countPropName];
    if (this.metrics) {
      this.metrics.totalItemCount = data[countPropName];
    }
    this.gridOptions = Object.assign({}, this.gridOptions);

    // once pagination totalItems is filled, we can update the dataset
    this.dataset = data['items'];
    this.odataQuery = data['query'];
  }

  getCustomerApiCall(query) {
    // in your case, you will call your WebAPI function (wich needs to return a Promise)
    // for the demo purpose, we will call a mock WebAPI function
    return this.getCustomerDataApiMock(query);
  }

  goToFirstPage() {
    this.angularGrid.paginationService.goToFirstPage();
  }

  goToLastPage() {
    this.angularGrid.paginationService.goToLastPage();
  }

  setFiltersDynamically() {
    // we can Set Filters Dynamically (or different filters) afterward through the FilterService
    this.angularGrid.filterService.updateFilters([
      // { columnId: 'gender', searchTerms: ['male'], operator: OperatorType.equal },
      { columnId: 'name', searchTerms: ['A'], operator: 'a*' },
    ]);
  }

  setSortingDynamically() {
    this.angularGrid.sortService.updateSorting([
      { columnId: 'name', direction: 'DESC' },
    ]);
  }

  /** This function is only here to mock a WebAPI call (since we are using a JSON file for the demo)
   *  in your case the getCustomer() should be a WebAPI function returning a Promise
   */
  getCustomerDataApiMock(query) {
    // the mock is returning a Promise, just like a WebAPI typically does
    return new Promise((resolve, reject) => {
      const queryParams = query.toLowerCase().split('&');
      let top: number;
      let skip = 0;
      let orderBy = '';
      let countTotalItems = 100;
      const columnFilters = {};

      for (const param of queryParams) {
        if (param.includes('$top=')) {
          top = +(param.substring('$top='.length));
        }
        if (param.includes('$skip=')) {
          skip = +(param.substring('$skip='.length));
        }
        if (param.includes('$orderby=')) {
          orderBy = param.substring('$orderby='.length);
        }
        if (param.includes('$filter=')) {
          const filterBy = param.substring('$filter='.length).replace('%20', ' ');
          if (filterBy.includes('contains')) {
            const filterMatch = filterBy.match(/contains\(([a-zA-Z\/]+),\s?'(.*?)'/);
            const fieldName = filterMatch[1].trim();
            columnFilters[fieldName] = { type: 'substring', term: filterMatch[2].trim() };
          }
          if (filterBy.includes('substringof')) {
            const filterMatch = filterBy.match(/substringof\('(.*?)',([a-zA-Z ]*)/);
            const fieldName = filterMatch[2].trim();
            columnFilters[fieldName] = { type: 'substring', term: filterMatch[1].trim() };
          }
          if (filterBy.includes('eq')) {
            const filterMatch = filterBy.match(/([a-zA-Z ]*) eq '(.*?)'/);
            if (Array.isArray(filterMatch)) {
              const fieldName = filterMatch[1].trim();
              columnFilters[fieldName] = { type: 'equal', term: filterMatch[2].trim() };
            }
          }
          if (filterBy.includes('startswith')) {
            const filterMatch = filterBy.match(/startswith\(([a-zA-Z ]*),\s?'(.*?)'/);
            const fieldName = filterMatch[1].trim();
            columnFilters[fieldName] = { type: 'starts', term: filterMatch[2].trim() };
          }
          if (filterBy.includes('endswith')) {
            const filterMatch = filterBy.match(/endswith\(([a-zA-Z ]*),\s?'(.*?)'/);
            const fieldName = filterMatch[1].trim();
            columnFilters[fieldName] = { type: 'ends', term: filterMatch[2].trim() };
          }
        }
      }

      const sort = orderBy.includes('asc')
        ? 'ASC'
        : orderBy.includes('desc')
          ? 'DESC'
          : '';

      let url;
      switch (sort) {
        case 'ASC':
          url = `${sampleDataRoot}/customers_100_ASC.json`;
          break;
        case 'DESC':
          url = `${sampleDataRoot}/customers_100_DESC.json`;
          break;
        default:
          url = `${sampleDataRoot}/customers_100.json`;
          break;
      }

      this.http.get(url).subscribe(data => {
        const dataArray = <any[]>data;

        // Read the result field from the JSON response.
        const firstRow = skip;
        let filteredData = dataArray;
        if (columnFilters) {
          for (const columnId in columnFilters) {
            if (columnFilters.hasOwnProperty(columnId)) {
              filteredData = filteredData.filter(column => {
                const filterType = columnFilters[columnId].type;
                const searchTerm = columnFilters[columnId].term;
                let colId = columnId;
                if (columnId && columnId.indexOf(' ') !== -1) {
                  const splitIds = columnId.split(' ');
                  colId = splitIds[splitIds.length - 1];
                }
                const filterTerm = column[colId];
                if (filterTerm) {
                  switch (filterType) {
                    case 'equal': return filterTerm.toLowerCase() === searchTerm;
                    case 'ends': return filterTerm.toLowerCase().endsWith(searchTerm);
                    case 'starts': return filterTerm.toLowerCase().startsWith(searchTerm);
                    case 'substring': return filterTerm.toLowerCase().includes(searchTerm);
                  }
                }
              });
            }
          }
          countTotalItems = filteredData.length;
        }
        const updatedData = filteredData.slice(firstRow, firstRow + top);

        setTimeout(() => {
          let countPropName = 'totalRecordCount';
          if (this.isCountEnabled) {
            countPropName = (this.odataVersion === 4) ? '@odata.count' : 'odata.count';
          }
          const backendResult = { items: updatedData, [countPropName]: countTotalItems, query };
          console.log('Backend Result', backendResult);
          resolve(backendResult);
        }, 250);
      });
    });
  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridStateChanges: GridStateChange) {
    console.log('Client sample, Grid State changed:: ', gridStateChanges);
  }

  // THE FOLLOWING METHODS ARE ONLY FOR DEMO PURPOSES DO NOT USE THIS CODE
  // ---

  changeCountEnableFlag() {
    this.isCountEnabled = !this.isCountEnabled;
    const odataService = this.gridOptions.backendServiceApi.service;

    // @ts-ignore
    odataService.updateOptions({ enableCount: this.isCountEnabled } as OdataOption);
    odataService.clearFilters();
    this.angularGrid.filterService.clearFilters();
    return true;
  }

  setOdataVersion(version: number) {
    this.odataVersion = version;
    const odataService = this.gridOptions.backendServiceApi.service;
    // @ts-ignore
    odataService.updateOptions({ version: this.odataVersion } as OdataOption);
    odataService.clearFilters();
    this.angularGrid.filterService.clearFilters();
    return true;
  }
}
