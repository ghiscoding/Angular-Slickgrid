/* eslint-disable @typescript-eslint/no-unused-vars */
import { GridOdataService, OdataServiceApi, OdataOption } from '@slickgrid-universal/odata';
import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AngularGridInstance,
  Column,
  FieldType,
  Filters,
  GridOption,
  GridStateChange,
  Metrics,
  OperatorType,
  Pagination,
} from './../modules/angular-slickgrid';

const defaultPageSize = 20;
const sampleDataRoot = 'assets/data';

@Component({
  templateUrl: './grid-odata.component.html'
})
export class GridOdataComponent implements OnInit {
  title = 'Example 5: Grid connected to Backend Server with OData';
  subTitle = `
    Sorting/Paging connected to a Backend OData Service (<a href="https://github.com/slickclub/Angular-Slickgrid/wiki/OData" target="_blank">Wiki docs</a>).
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
      <li>You can also preload a grid with certain "presets" like Filters / Sorters / Pagination <a href="https://github.com/slickclub/Angular-Slickgrid/wiki/Grid-State-&-Preset" target="_blank">Wiki - Grid Preset</a>
      <li><span class="text-danger">NOTE:</span> For demo purposes, the last column (filter & sort) will always throw an
        error and its only purpose is to demo what would happen when you encounter a backend server error
        (the UI should rollback to previous state before you did the action).
        Also changing Page Size to 50,000 will also throw which again is for demo purposes.
      </li>
    </ul>
  `;
  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  gridOptions!: GridOption;
  dataset = [];
  metrics!: Metrics;
  paginationOptions!: Pagination;

  isCountEnabled = true;
  isSelectEnabled = false;
  isExpandEnabled = false;
  odataVersion = 2;
  odataQuery = '';
  processing = true;
  errorStatus = '';
  isPageErrorTest = false;
  status = { text: 'processing...', class: 'alert alert-danger' };

  constructor(private readonly cd: ChangeDetectorRef, private http: HttpClient) { }

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
        id: 'gender', name: 'Gender', field: 'gender', filterable: true, sortable: true,
        filter: {
          model: Filters.singleSelect,
          collection: [{ value: '', label: '' }, { value: 'male', label: 'male' }, { value: 'female', label: 'female' }]
        }
      },
      { id: 'company', name: 'Company', field: 'company', filterable: true, sortable: true },
      { id: 'category_name', name: 'Category', field: 'category/name', filterable: true, sortable: true },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      autoResize: {
        container: '#demo-container',
        rightPadding: 10
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
      enablePagination: true, // you could optionally disable the Pagination
      pagination: {
        pageSizes: [10, 20, 50, 100, 500, 50000],
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
        pagination: { pageNumber: 2, pageSize: defaultPageSize }
      },
      backendServiceApi: {
        service: new GridOdataService(),
        options: {
          enableCount: this.isCountEnabled, // add the count in the OData query, which will return a property named "__count" (v2) or "@odata.count" (v4)
          enableSelect: this.isSelectEnabled,
          enableExpand: this.isExpandEnabled,
          version: this.odataVersion        // defaults to 2, the query string is slightly different between OData 2 and 4
        },
        onError: (error: Error) => {
          this.errorStatus = error.message;
          this.displaySpinner(false, true);
        },
        preProcess: () => {
          this.errorStatus = '';
          this.displaySpinner(true);
        },
        process: (query) => this.getCustomerApiCall(query),
        postProcess: (response) => {
          this.metrics = response.metrics;
          this.displaySpinner(false);
          this.getCustomerCallback(response);
          this.cd.detectChanges();
        }
      } as OdataServiceApi
    };
  }

  displaySpinner(isProcessing: boolean, isError?: boolean) {
    this.processing = isProcessing;
    if (isError) {
      this.status = { text: 'ERROR!!!', class: 'alert alert-danger' };
    } else {
      this.status = (isProcessing)
        ? { text: 'loading', class: 'alert alert-warning' }
        : { text: 'finished', class: 'alert alert-success' };
    }
  }

  getCustomerCallback(data: any) {
    // totalItems property needs to be filled for pagination to work correctly
    // however we need to force Angular to do a dirty check, doing a clone object will do just that
    let totalItemCount: number = data['totalRecordCount']; // you can use "totalRecordCount" or any name or "odata.count" when "enableCount" is set
    if (this.isCountEnabled) {
      totalItemCount = (this.odataVersion === 4) ? data['@odata.count'] : data['d']['__count'];
    }
    if (this.metrics) {
      this.metrics.totalItemCount = totalItemCount;
    }

    // once pagination totalItems is filled, we can update the dataset
    this.paginationOptions = { ...this.gridOptions.pagination, totalItems: totalItemCount } as Pagination;
    this.dataset = this.odataVersion === 4 ? data.value : data.d.results;
    this.odataQuery = data['query'];
  }

  getCustomerApiCall(query: string) {
    // in your case, you will call your WebAPI function (wich needs to return a Promise)
    // for the demo purpose, we will call a mock WebAPI function
    return this.getCustomerDataApiMock(query);
  }

  goToFirstPage() {
    this.angularGrid.paginationService!.goToFirstPage();
  }

  goToLastPage() {
    this.angularGrid.paginationService!.goToLastPage();
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
  getCustomerDataApiMock(query: string): Promise<any> {
    // the mock is returning a Promise, just like a WebAPI typically does
    return new Promise((resolve, reject) => {
      const queryParams = query.toLowerCase().split('&');
      let top: number;
      let skip = 0;
      let orderBy = '';
      let countTotalItems = 100;
      const columnFilters = {};

      if (this.isPageErrorTest) {
        this.isPageErrorTest = false;
        throw new Error('Server timed out trying to retrieve data for the last page');
      }

      for (const param of queryParams) {
        if (param.includes('$top=')) {
          top = +(param.substring('$top='.length));
          if (top === 50000) {
            throw new Error('Server timed out retrieving 50,000 rows');
          }
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
            const fieldName = filterMatch![1].trim();
            (columnFilters as any)[fieldName] = { type: 'substring', term: filterMatch![2].trim() };
          }
          if (filterBy.includes('substringof')) {
            const filterMatch = filterBy.match(/substringof\('(.*?)',\s([a-zA-Z\/]+)/);
            const fieldName = filterMatch![2].trim();
            (columnFilters as any)[fieldName] = { type: 'substring', term: filterMatch![1].trim() };
          }
          for (const operator of ['eq', 'ne', 'le', 'lt', 'gt', 'ge']) {
            if (filterBy.includes(operator)) {
              const re = new RegExp(`([a-zA-Z ]*) ${operator} \'(.*?)\'`);
              const filterMatch = re.exec(filterBy);
              if (Array.isArray(filterMatch)) {
                const fieldName = filterMatch[1].trim();
                (columnFilters as any)[fieldName] = { type: operator, term: filterMatch[2].trim() };
              }
            }
          }
          if (filterBy.includes('startswith')) {
            const filterMatch = filterBy.match(/startswith\(([a-zA-Z ]*),\s?'(.*?)'/);
            const fieldName = filterMatch![1].trim();
            (columnFilters as any)[fieldName] = { type: 'starts', term: filterMatch![2].trim() };
          }
          if (filterBy.includes('endswith')) {
            const filterMatch = filterBy.match(/endswith\(([a-zA-Z ]*),\s?'(.*?)'/);
            const fieldName = filterMatch![1].trim();
            (columnFilters as any)[fieldName] = { type: 'ends', term: filterMatch![2].trim() };
          }

          // simulate a backend error when trying to sort on the "Company" field
          if (filterBy.includes('company')) {
            throw new Error('Server could not filter using the field "Company"');
          }
        }
      }

      // simulate a backend error when trying to sort on the "Company" field
      if (orderBy.includes('company')) {
        throw new Error('Server could not sort using the field "Company"');
      }

      this.http.get(`${sampleDataRoot}/customers_100.json`).subscribe(response => {
        let data = response as any[];

        // Sort the data
        if (orderBy?.length > 0) {
          const orderByClauses = orderBy.split(',');
          for (const orderByClause of orderByClauses) {
            const orderByParts = orderByClause.split(' ');
            const orderByField = orderByParts[0];

            let selector = (obj: any): string => obj;
            for (const orderByFieldPart of orderByField.split('/')) {
              const prevSelector = selector;
              selector = (obj: any) => {
                return prevSelector(obj)[orderByFieldPart as any];
              };
            }

            const sort = orderByParts[1] ?? 'asc';
            switch (sort.toLocaleLowerCase()) {
              case 'asc':
                data = data.sort((a, b) => selector(a).localeCompare(selector(b)));
                break;
              case 'desc':
                data = data.sort((a, b) => selector(b).localeCompare(selector(a)));
                break;
            }
          }
        }

        // Read the result field from the JSON response.
        const firstRow = skip;
        let filteredData = data;
        if (columnFilters) {
          for (const columnId in columnFilters) {
            if (columnFilters.hasOwnProperty(columnId)) {
              filteredData = filteredData.filter(column => {
                const filterType = (columnFilters as any)[columnId].type;
                const searchTerm = (columnFilters as any)[columnId].term;
                let colId = columnId;
                if (columnId && columnId.indexOf(' ') !== -1) {
                  const splitIds = columnId.split(' ');
                  colId = splitIds[splitIds.length - 1];
                }

                let filterTerm;
                let col = column;
                for (const part of colId.split('/')) {
                  filterTerm = (col as any)[part];
                  col = filterTerm;
                }

                if (filterTerm) {
                  switch (filterType) {
                    case 'eq': return filterTerm.toLowerCase() === searchTerm;
                    case 'ne': return filterTerm.toLowerCase() !== searchTerm;
                    case 'le': return filterTerm.toLowerCase() <= searchTerm;
                    case 'lt': return filterTerm.toLowerCase() < searchTerm;
                    case 'gt': return filterTerm.toLowerCase() > searchTerm;
                    case 'ge': return filterTerm.toLowerCase() >= searchTerm;
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
        const updatedData = filteredData.slice(firstRow, firstRow + top!);

        setTimeout(() => {
          const backendResult: any = { query };
          if (!this.isCountEnabled) {
            backendResult['totalRecordCount'] = countTotalItems;
          }

          if (this.odataVersion === 4) {
            backendResult['value'] = updatedData;
            if (this.isCountEnabled) {
              backendResult['@odata.count'] = countTotalItems;
            }
          } else {
            backendResult['d'] = { results: updatedData };
            if (this.isCountEnabled) {
              backendResult['d']['__count'] = countTotalItems;
            }
          }

          // console.log('Backend Result', backendResult);
          resolve(backendResult);
        }, 100);
      });
    });
  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridStateChanges: GridStateChange) {
    // console.log('Client sample, Grid State changed:: ', gridStateChanges);
    console.log('Client sample, Grid State changed:: ', gridStateChanges.change);
  }

  throwPageChangeError() {
    this.isPageErrorTest = true;
    this.angularGrid?.paginationService?.goToLastPage();
  }

  // YOU CAN CHOOSE TO PREVENT EVENT FROM BUBBLING IN THE FOLLOWING 3x EVENTS
  // note however that internally the cancelling the search is more of a rollback
  handleOnBeforeSort(e: Event) {
    // e.preventDefault();
    // return false;
    return true;
  }

  handleOnBeforeSearchChange(e: Event) {
    // e.preventDefault();
    // return false;
    return true;
  }

  handleOnBeforePaginationChange(e: Event) {
    // e.preventDefault();
    // return false;
    return true;
  }

  // THE FOLLOWING METHODS ARE ONLY FOR DEMO PURPOSES DO NOT USE THIS CODE
  // ---

  changeCountEnableFlag() {
    this.isCountEnabled = !this.isCountEnabled;
    this.resetOptions({ enableCount: this.isCountEnabled });
    return true;
  }

  changeEnableSelectFlag() {
    this.isSelectEnabled = !this.isSelectEnabled;
    this.resetOptions({ enableSelect: this.isSelectEnabled });
    return true;
  }

  changeEnableExpandFlag() {
    this.isExpandEnabled = !this.isExpandEnabled;
    this.resetOptions({ enableExpand: this.isExpandEnabled });
    return true;
  }

  setOdataVersion(version: number) {
    this.odataVersion = version;
    this.resetOptions({ version: this.odataVersion });
    return true;
  }

  private resetOptions(options: Partial<OdataOption>) {
    const odataService = this.gridOptions.backendServiceApi!.service as GridOdataService;
    odataService.updateOptions(options);
    odataService.clearFilters();
    this.angularGrid?.filterService.clearFilters();
  }
}
