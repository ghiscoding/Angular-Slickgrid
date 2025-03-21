import { GridOdataService, type OdataServiceApi } from '@slickgrid-universal/odata';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Aggregators,
  AngularGridInstance,
  Column,
  FieldType,
  Filters,
  GridOption,
  Grouping,
  Metrics,
  OnRowCountChangedEventArgs,
  SortComparers,
} from './../modules/angular-slickgrid';

const sampleDataRoot = 'assets/data';
const CARET_HTML_ESCAPED = '%5E';
const PERCENT_HTML_ESCAPED = '%25';

@Component({
  styleUrls: ['./grid-infinite-odata.component.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './grid-infinite-odata.component.html',
})
export class GridInfiniteOdataComponent implements OnInit {
  angularGrid!: AngularGridInstance;
  backendService: GridOdataService;
  columnDefinitions!: Column[];
  gridOptions!: GridOption;
  dataset: any[] = [];
  hideSubTitle = false;
  isPageErrorTest = false;
  metrics!: Partial<Metrics>;
  tagDataClass = '';
  odataQuery = '';
  processing = false;
  errorStatus = '';
  errorStatusClass = 'hidden';
  status = { text: 'processing...', class: 'alert alert-danger' };

  constructor(
    private readonly cd: ChangeDetectorRef,
    private http: HttpClient
  ) {
    this.backendService = new GridOdataService();
  }

  ngOnInit(): void {
    this.initializeGrid();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  initializeGrid() {
    this.columnDefinitions = [
      {
        id: 'name',
        name: 'Name',
        field: 'name',
        sortable: true,
        type: FieldType.string,
        filterable: true,
        filter: { model: Filters.compoundInput },
      },
      {
        id: 'gender',
        name: 'Gender',
        field: 'gender',
        filterable: true,
        sortable: true,
        filter: {
          model: Filters.singleSelect,
          collection: [
            { value: '', label: '' },
            { value: 'male', label: 'male' },
            { value: 'female', label: 'female' },
          ],
        },
      },
      { id: 'company', name: 'Company', field: 'company', filterable: true, sortable: true },
      {
        id: 'category_name',
        name: 'Category',
        field: 'category/name',
        filterable: true,
        sortable: true,
        formatter: (_row, _cell, _val, _colDef, dataContext) => dataContext['category']?.['name'] || '',
      },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      autoResize: {
        container: '#demo-container',
        rightPadding: 10,
      },
      checkboxSelector: {
        // you can toggle these 2 properties to show the "select all" checkbox in different location
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true,
      },
      enableCellNavigation: true,
      enableFiltering: true,
      enableCheckboxSelector: true,
      enableRowSelection: true,
      enableGrouping: true,
      headerMenu: {
        hideFreezeColumnsCommand: false,
      },
      presets: {
        // NOTE: pagination preset is NOT supported with infinite scroll
        // filters: [{ columnId: 'gender', searchTerms: ['female'] }]
      },
      backendServiceApi: {
        service: this.backendService,
        options: {
          // enable infinite via Boolean OR via { fetchSize: number }
          infiniteScroll: { fetchSize: 30 }, // or use true, in that case it would use default size of 25
          enableCount: true,
          version: 4,
        },
        onError: (error: Error) => {
          this.errorStatus = error.message;
          this.errorStatusClass = 'visible notification is-light is-danger is-small is-narrow';
          this.displaySpinner(false, true);
        },
        preProcess: () => {
          this.errorStatus = '';
          this.errorStatusClass = 'hidden';
          this.displaySpinner(true);
        },
        process: (query) => this.getCustomerApiCall(query),
        postProcess: (response) => {
          this.metrics = response.metrics;
          this.displaySpinner(false);
          this.getCustomerCallback(response);
          this.cd.detectChanges();
        },
        // we could use local in-memory Filtering (please note that it only filters against what is currently loaded)
        // that is when we want to avoid reloading the entire dataset every time
        // useLocalFiltering: true,
      } as OdataServiceApi,
    };
  }

  displaySpinner(isProcessing: boolean, isError?: boolean) {
    this.processing = isProcessing;
    if (isError) {
      this.status = { text: 'ERROR!!!', class: 'alert alert-danger' };
    } else {
      this.status = isProcessing
        ? { text: 'loading', class: 'alert alert-warning' }
        : { text: 'finished', class: 'alert alert-success' };
    }
    this.cd.detectChanges();
  }

  getCustomerCallback(data: {
    '@odata.count': number;
    infiniteScrollBottomHit: boolean;
    metrics: Metrics;
    query: string;
    value: any[];
  }) {
    // totalItems property needs to be filled for pagination to work correctly
    // however we need to force a dirty check, doing a clone object will do just that
    const totalItemCount: number = data['@odata.count'];
    this.metrics.totalItemCount = totalItemCount;

    // even if we're not showing pagination, it is still used behind the scene to fetch next set of data (next page basically)
    // once pagination totalItems is filled, we can update the dataset

    // infinite scroll has an extra data property to determine if we hit an infinite scroll and there's still more data (in that case we need append data)
    // or if we're on first data fetching (no scroll bottom ever occured yet)
    if (!data.infiniteScrollBottomHit) {
      // initial load not scroll hit yet, full dataset assignment
      this.angularGrid.slickGrid?.scrollTo(0); // scroll back to top to avoid unwanted onScroll end triggered
      this.dataset = data.value;
      this.metrics.itemCount = data.value.length;
    } else {
      // scroll hit, for better perf we can simply use the DataView directly for better perf (which is better compare to replacing the entire dataset)
      this.angularGrid.dataView?.addItems(data.value);
    }

    this.odataQuery = data['query'];

    // NOTE: you can get currently loaded item count via the `onRowCountChanged`slick event, see `refreshMetrics()` below
    // OR you could also calculate it yourself or get it via: `this.sgb.dataView.getItemCount() === totalItemCount`
    // console.log('is data fully loaded: ', this.sgb.dataView?.getItemCount() === totalItemCount);
  }

  getCustomerApiCall(query: string) {
    // in your case, you will call your WebAPI function (wich needs to return a Promise)
    // for the demo purpose, we will call a mock WebAPI function
    return this.getCustomerDataApiMock(query);
  }

  /**
   * This function is only here to mock a WebAPI call (since we are using a JSON file for the demo)
   *  in your case the getCustomer() should be a WebAPI function returning a Promise
   */
  getCustomerDataApiMock(query: string): Promise<any> {
    this.errorStatusClass = 'hidden';

    // the mock is returning a Promise, just like a WebAPI typically does
    return new Promise((resolve) => {
      const queryParams = query.toLowerCase().split('&');
      let top = 0;
      let skip = 0;
      let orderBy = '';
      let countTotalItems = 100;
      const columnFilters: any = {};

      if (this.isPageErrorTest) {
        this.isPageErrorTest = false;
        throw new Error('Server timed out trying to retrieve data for the last page');
      }

      for (const param of queryParams) {
        if (param.includes('$top=')) {
          top = +param.substring('$top='.length);
          if (top === 50000) {
            throw new Error('Server timed out retrieving 50,000 rows');
          }
        }
        if (param.includes('$skip=')) {
          skip = +param.substring('$skip='.length);
        }
        if (param.includes('$orderby=')) {
          orderBy = param.substring('$orderby='.length);
        }
        if (param.includes('$filter=')) {
          const filterBy = param.substring('$filter='.length).replace('%20', ' ');
          if (filterBy.includes('matchespattern')) {
            const regex = new RegExp(`matchespattern\\(([a-zA-Z]+),\\s'${CARET_HTML_ESCAPED}(.*?)'\\)`, 'i');
            const filterMatch = filterBy.match(regex) || [];
            const fieldName = filterMatch[1].trim();
            columnFilters[fieldName] = { type: 'matchespattern', term: '^' + filterMatch[2].trim() };
          }
          if (filterBy.includes('contains')) {
            const filterMatch = filterBy.match(/contains\(([a-zA-Z/]+),\s?'(.*?)'/) || [];
            const fieldName = filterMatch[1].trim();
            columnFilters[fieldName] = { type: 'substring', term: filterMatch[2].trim() };
          }
          if (filterBy.includes('substringof')) {
            const filterMatch = filterBy.match(/substringof\('(.*?)',\s([a-zA-Z/]+)/) || [];
            const fieldName = filterMatch[2].trim();
            columnFilters[fieldName] = { type: 'substring', term: filterMatch[1].trim() };
          }
          for (const operator of ['eq', 'ne', 'le', 'lt', 'gt', 'ge']) {
            if (filterBy.includes(operator)) {
              const re = new RegExp(`([a-zA-Z ]*) ${operator} '(.*?)'`);
              const filterMatch = re.exec(filterBy);
              if (Array.isArray(filterMatch)) {
                const fieldName = filterMatch[1].trim();
                columnFilters[fieldName] = { type: operator, term: filterMatch[2].trim() };
              }
            }
          }
          if (filterBy.includes('startswith') && filterBy.includes('endswith')) {
            const filterStartMatch = filterBy.match(/startswith\(([a-zA-Z ]*),\s?'(.*?)'/) || [];
            const filterEndMatch = filterBy.match(/endswith\(([a-zA-Z ]*),\s?'(.*?)'/) || [];
            const fieldName = filterStartMatch[1].trim();
            columnFilters[fieldName] = { type: 'starts+ends', term: [filterStartMatch[2].trim(), filterEndMatch[2].trim()] };
          } else if (filterBy.includes('startswith')) {
            const filterMatch = filterBy.match(/startswith\(([a-zA-Z ]*),\s?'(.*?)'/) || [];
            const fieldName = filterMatch[1].trim();
            columnFilters[fieldName] = { type: 'starts', term: filterMatch[2].trim() };
          } else if (filterBy.includes('endswith')) {
            const filterMatch = filterBy.match(/endswith\(([a-zA-Z ]*),\s?'(.*?)'/) || [];
            const fieldName = filterMatch[1].trim();
            columnFilters[fieldName] = { type: 'ends', term: filterMatch[2].trim() };
          }

          // simular a backend error when trying to sort on the "Company" field
          if (filterBy.includes('company')) {
            throw new Error('Server could not filter using the field "Company"');
          }
        }
      }

      // simulate a backend error when trying to sort on the "Company" field
      if (orderBy.includes('company')) {
        throw new Error('Server could not sort using the field "Company"');
      }

      this.http.get(`${sampleDataRoot}/customers_100.json`).subscribe((response) => {
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
        let firstRow = skip;
        let filteredData = data;
        if (columnFilters) {
          for (const columnId in columnFilters) {
            if (columnId in columnFilters) {
              filteredData = filteredData.filter((column) => {
                const filterType = columnFilters[columnId].type;
                const searchTerm = columnFilters[columnId].term;
                let colId = columnId;
                if (columnId?.indexOf(' ') !== -1) {
                  const splitIds = columnId.split(' ');
                  colId = splitIds[splitIds.length - 1];
                }

                let filterTerm;
                let col = column;
                for (const part of colId.split('/')) {
                  filterTerm = col[part];
                  col = filterTerm;
                }

                if (filterTerm) {
                  const [term1, term2] = Array.isArray(searchTerm) ? searchTerm : [searchTerm];

                  switch (filterType) {
                    case 'eq':
                      return filterTerm.toLowerCase() === term1;
                    case 'ne':
                      return filterTerm.toLowerCase() !== term1;
                    case 'le':
                      return filterTerm.toLowerCase() <= term1;
                    case 'lt':
                      return filterTerm.toLowerCase() < term1;
                    case 'gt':
                      return filterTerm.toLowerCase() > term1;
                    case 'ge':
                      return filterTerm.toLowerCase() >= term1;
                    case 'ends':
                      return filterTerm.toLowerCase().endsWith(term1);
                    case 'starts':
                      return filterTerm.toLowerCase().startsWith(term1);
                    case 'starts+ends':
                      return filterTerm.toLowerCase().startsWith(term1) && filterTerm.toLowerCase().endsWith(term2);
                    case 'substring':
                      return filterTerm.toLowerCase().includes(term1);
                    case 'matchespattern':
                      return new RegExp((term1 as string).replaceAll(PERCENT_HTML_ESCAPED, '.*'), 'i').test(filterTerm);
                  }
                }
              });
            }
          }
          countTotalItems = filteredData.length;
        }

        // make sure page skip is not out of boundaries, if so reset to first page & remove skip from query
        if (firstRow > filteredData.length) {
          query = query.replace(`$skip=${firstRow}`, '');
          firstRow = 0;
        }
        const updatedData = filteredData.slice(firstRow, firstRow + top);

        window.setTimeout(() => {
          const backendResult: any = { query };
          backendResult['value'] = updatedData;
          backendResult['@odata.count'] = countTotalItems;

          // console.log('Backend Result', backendResult);
          resolve(backendResult);
        }, 100);
      });
    });
  }

  groupByGender() {
    this.angularGrid?.dataView?.setGrouping({
      getter: 'gender',
      formatter: (g) => `Gender: ${g.value} <span class="text-green">(${g.count} items)</span>`,
      comparer: (a, b) => SortComparers.string(a.value, b.value),
      aggregators: [new Aggregators.Sum('gemder')],
      aggregateCollapsed: false,
      lazyTotalsCalculation: true,
    } as Grouping);

    // you need to manually add the sort icon(s) in UI
    this.angularGrid?.slickGrid.setSortColumns([{ columnId: 'duration', sortAsc: true }]);
    this.angularGrid?.slickGrid.invalidate(); // invalidate all rows and re-render
  }

  clearAllFiltersAndSorts() {
    if (this.angularGrid?.gridService) {
      this.angularGrid.gridService.clearAllFiltersAndSorts();
    }
  }

  setFiltersDynamically() {
    // we can Set Filters Dynamically (or different filters) afterward through the FilterService
    this.angularGrid?.filterService.updateFilters([{ columnId: 'gender', searchTerms: ['female'] }]);
  }

  refreshMetrics(args: OnRowCountChangedEventArgs) {
    if (args?.current >= 0) {
      this.metrics.itemCount = this.angularGrid.dataView?.getFilteredItemCount() || 0;
      this.tagDataClass = this.metrics.itemCount === this.metrics.totalItemCount ? 'fully-loaded' : 'partial-load';
    }
  }

  setSortingDynamically() {
    this.angularGrid?.sortService.updateSorting([{ columnId: 'name', direction: 'DESC' }]);
  }

  toggleSubTitle() {
    this.hideSubTitle = !this.hideSubTitle;
    const action = this.hideSubTitle ? 'add' : 'remove';
    document.querySelector('.subtitle')?.classList[action]('hidden');
    this.angularGrid.resizerService.resizeGrid(2);
  }
}
