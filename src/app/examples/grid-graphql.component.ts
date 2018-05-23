import { Subscription } from 'rxjs/Subscription';
import { Component, Injectable, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularGridInstance, Column, FieldType, FilterType, Formatters, GraphqlResult, GraphqlService, GraphqlServiceOption, GridOption, OperatorType, SearchTerm, SortDirection, GridStateService } from './../modules/angular-slickgrid';

const defaultPageSize = 20;
const GRAPHQL_QUERY_DATASET_NAME = 'users';

@Component({
  templateUrl: './grid-graphql.component.html'
})
@Injectable()
export class GridGraphqlComponent implements OnInit, OnDestroy {
  title = 'Example 6: Grid connected to Backend Server with GraphQL';
  subTitle = `
    Sorting/Paging connected to a Backend GraphQL Service (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/GraphQL" target="_blank">Wiki docs</a>).
    <br/>
    <ul class="small">
      <li><span class="red">(*) NO DATA SHOWING</span> - just change Filters &amp; Pages and look at the "GraphQL Query" changing :)</li>
      <li>Only "Name" field is sortable for the demo (because we use JSON files), however "multiColumnSort: true" is also supported</li>
      <li>String column also support operator (>, >=, <, <=, <>, !=, =, ==, *)
      <ul>
        <li>The (*) can be used as startsWith (ex.: "abc*" => startsWith "abc") / endsWith (ex.: "*xyz" => endsWith "xyz")</li>
        <li>The other operators can be used on column type number for example: ">=100" (bigger or equal than 100)</li>
      </ul>
      <li>You can also preload a grid with certain "presets" like Filters / Sorters / Pagination <a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-State-&-Preset" target="_blank">Wiki - Grid Preset</a>
    </ul>
  `;
  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset = [];

  graphqlQuery = '';
  processing = true;
  status = { text: 'processing...', class: 'alert alert-danger' };
  isWithCursor = false;
  selectedLanguage: string;
  gridStateSub: Subscription;

  constructor(private translate: TranslateService) {
    this.selectedLanguage = this.translate.getDefaultLang();
  }

  ngOnDestroy() {
    this.gridStateSub.unsubscribe();
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'name', field: 'name', headerKey: 'NAME', filterable: true, sortable: true, type: FieldType.string, width: 60 },
      {
        id: 'gender', field: 'gender', headerKey: 'GENDER', filterable: true, sortable: true, width: 60,
        filter: {
          type: FilterType.singleSelect,
          collection: [{ value: '', label: '' }, { value: 'male', label: 'male', labelKey: 'MALE' }, { value: 'female', label: 'female', labelKey: 'FEMALE' }]
        }
      },
      {
        id: 'company', field: 'company', headerKey: 'COMPANY', width: 60,
        sortable: true,
        filterable: true,
        filter: {
          type: FilterType.multipleSelect,
          collection: [{ value: 'acme', label: 'Acme'}, { value: 'abc', label: 'Company ABC'}, { value: 'xyz', label: 'Company XYZ'}]
        }
      },
      { id: 'billing.address.street', field: 'billing.address.street', headerKey: 'BILLING.ADDRESS.STREET', width: 60, filterable: true, sortable: true },
      {
        id: 'billing.address.zip', field: 'billing.address.zip', headerKey: 'BILLING.ADDRESS.ZIP', width: 60,
        type: FieldType.number,
        filterable: true, sortable: true,
        filter: {
          type: FilterType.compoundInput
        },
        formatter: Formatters.multiple, params: { formatters: [Formatters.complexObject, Formatters.translate] } },
    ];

    this.gridOptions = {
      autoHeight: false,
      enableAutoResize: false,
      enableFiltering: true,
      enableCellNavigation: true,
      enableCheckboxSelector: true,
      enableRowSelection: true,
      enableTranslate: true,
      gridMenu: {
        resizeOnShowHeaderRow: true,
      },
      pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: defaultPageSize,
        totalItems: 0
      },
      params: {
        i18n: this.translate
      },
      presets: {
        // you can also type operator as string, e.g.: operator: 'EQ'
        filters: [
          { columnId: 'gender', searchTerms: ['male'], operator: OperatorType.equal },
          { columnId: 'name', searchTerms: ['John Doe'], operator: OperatorType.contains },
          { columnId: 'company', searchTerms: ['xyz'], operator: 'IN' }
        ],
        sorters: [
          // direction can typed as 'asc' (uppercase or lowercase) and/or use the SortDirection type
          { columnId: 'name', direction: 'asc' },
          { columnId: 'company', direction: SortDirection.DESC }
        ],
        pagination: { pageNumber: 2, pageSize: 20 }
      },
      backendServiceApi: {
        service: new GraphqlService(),
        options: this.getBackendOptions(this.isWithCursor),
        // you can define the onInit callback OR enable the "executeProcessCommandOnInit" flag in the service init
        // onInit: (query) => this.getCustomerApiCall(query)
        preProcess: () => this.displaySpinner(true),
        process: (query) => this.getCustomerApiCall(query),
        postProcess: (result: GraphqlResult) => this.displaySpinner(false)
      }
    };
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridStateSub = this.angularGrid.gridStateService.onGridStateChanged.subscribe((data) => console.log(data));
  }

  displaySpinner(isProcessing) {
    this.processing = isProcessing;
    this.status = (isProcessing)
      ? { text: 'processing...', class: 'alert alert-danger' }
      : { text: 'done', class: 'alert alert-success' };
  }

  getBackendOptions(withCursor: boolean): GraphqlServiceOption {
    // with cursor, paginationOptions can be: { first, last, after, before }
    // without cursor, paginationOptions can be: { first, last, offset }
    return {
      columnDefinitions: this.columnDefinitions,
      datasetName: GRAPHQL_QUERY_DATASET_NAME,
      isWithCursor: withCursor,
      addLocaleIntoQuery: true,
      extraQueryArguments: [{
        field: 'userId',
        value: 123
      }],

      // when dealing with complex objects, we want to keep our field name with double quotes
      // example with gender: query { users (orderBy:[{field:"gender",direction:ASC}]) {}
      keepArgumentFieldDoubleQuotes: true
    };
  }

  /**
   * Calling your GraphQL backend server should always return a Promise or Observable of type GraphqlResult
   *
   * @param query
   * @return Promise<GraphqlResult> | Observable<GraphqlResult>
   */
  getCustomerApiCall(query: string): Promise<GraphqlResult> {
    // in your case, you will call your WebAPI function (wich needs to return a Promise)
    // for the demo purpose, we will call a mock WebAPI function
    const mockedResult = {
      // the dataset name is the only unknown property
      // will be the same defined in your GraphQL Service init, in our case GRAPHQL_QUERY_DATASET_NAME
      data: {
        [GRAPHQL_QUERY_DATASET_NAME]: {
          nodes: [],
          pageInfo: {
            hasNextPage: true
          },
          totalCount: 100
        }
      }
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.graphqlQuery = this.angularGrid.backendService.buildQuery();
        resolve(mockedResult);
      }, 500);
    });
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState(grid) {
    console.log('GraphQL current grid state', this.angularGrid.gridStateService.getCurrentGridState());
  }

  switchLanguage() {
    this.selectedLanguage = (this.selectedLanguage === 'en') ? 'fr' : 'en';
    this.translate.use(this.selectedLanguage);
  }
}
