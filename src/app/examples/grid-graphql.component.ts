import { Component, EventEmitter, Injectable, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { CaseType, Column, FormElementType, GridOption } from './../modules/angular-slickgrid/models';
import { FieldType, Formatters } from './../modules/angular-slickgrid';
import { GraphqlService } from './../modules/angular-slickgrid/services/graphql.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { GraphqlResult } from '../modules/angular-slickgrid/models/graphqlResult.interface';

const defaultPageSize = 20;
const sampleDataRoot = '/assets/data';
const GRAPHQL_QUERY_DATASET_NAME = 'users';

@Component({
  templateUrl: './grid-graphql.component.html'
})
@Injectable()
export class GridGraphqlComponent implements OnInit {
  title = 'Example 6: Grid connected to Backend Server with GraphQL';
  subTitle = `
    Sorting/Paging connected to a Backend GraphQL Service (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/GraphQL" target="_blank">Wiki link</a>).
    <br/>
    <ul class="small">
      <li><span class="red">(*) NO DATA SHOWING</span> - just change Filters &amp; Pages and look at the "GraphQL Query" changing :)</li>
      <li>Only "Name" field is sortable for the demo (because we use JSON files), however "multiColumnSort: true" is also supported</li>
      <li>String column also support operator (>, >=, <, <=, <>, !=, =, ==, *)
      <ul>
        <li>The (*) can be used as startsWith (ex.: "abc*" => startsWith "abc") / endsWith (ex.: "*xyz" => endsWith "xyz")</li>
        <li>The other operators can be used on column type number for example: ">=100" (bigger or equal than 100)</li>
      </ul>
    </ul>
  `;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset = [];

  graphqlQuery = '';
  processing = false;
  status = { text: '', class: '' };
  isWithCursor = false;
  selectedLanguage: string;

  constructor(private http: HttpClient, private graphqlService: GraphqlService, private translate: TranslateService) {
    this.selectedLanguage = this.translate.getDefaultLang();
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'name', name: 'Name', field: 'name', headerKey: 'NAME', filterable: true, sortable: true, type: FieldType.string },
      { id: 'gender', name: 'Gender', field: 'gender', headerKey: 'GENDER', filterable: true, sortable: true,
        filter: {
          searchTerm: '', // default selection
          type: FormElementType.select,
          selectOptions: [ { value: '', label: '' }, { value: 'male', label: 'male', labelKey: 'MALE' }, { value: 'female', label: 'female', labelKey: 'FEMALE' } ]
        }
      },
      { id: 'company', name: 'Company', field: 'company', headerKey: 'COMPANY', filterable: true },
      { id: 'billing.address.street', name: 'Billing Address Street', field: 'billing.address.street', headerKey: 'BILLING.ADDRESS.STREET', filterable: true, sortable: true },
      { id: 'billing.address.zip', name: 'Billing Address Zip', field: 'billing.address.zip', headerKey: 'BILLING.ADDRESS.ZIP', filterable: true, sortable: true },
    ];

    this.gridOptions = {
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableFiltering: true,
      enableCellNavigation: true,
      enablePagination: true,
      enableTranslate: true,
      pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: defaultPageSize,
        totalItems: 0
      },
      onBackendEventApi: {
        // you can define the onInit callback OR enable the "executeProcessCommandOnInit" flag in the service init
        // onInit: (query) => this.getCustomerApiCall(query)
        preProcess: () => this.displaySpinner(true),
        process: (query) => this.getCustomerApiCall(query),
        postProcess: (result: GraphqlResult) => this.displaySpinner(false),
        service: this.graphqlService
      }
    };

    const initOptions = this.getBackendOptions(this.isWithCursor);
    this.graphqlService.initOptions(initOptions);
  }

  displaySpinner(isProcessing) {
    this.processing = isProcessing;
    this.status = (isProcessing)
      ? { text: 'processing...', class: 'alert alert-danger' }
      : { text: 'done', class: 'alert alert-success' };
  }

  filterChange() {
    console.log('filter change');
  }

  filterChangeAfter() {
    console.log('after filter change');
    this.displaySpinner(false);
  }

  onWithCursorChange(isWithCursor) {
    this.isWithCursor = isWithCursor;
    const paginationOption = this.getBackendOptions(isWithCursor);
    this.graphqlService.initOptions(paginationOption);
    this.graphqlQuery = this.graphqlService.buildQuery();
  }

  getBackendOptions(isWithCursor: boolean) {
    let paginationOption;

    if (isWithCursor) {
      // with cursor, paginationOptions can be: { first, last, after, before }
      paginationOption = {
        columnDefinitions: this.columnDefinitions,
        datasetName: GRAPHQL_QUERY_DATASET_NAME,
        isWithCursor: true,
        paginationOptions: {
          first: defaultPageSize
        },
        executeProcessCommandOnInit: true
      };
    } else {
      // without cursor, paginationOptions can be: { first, last, offset }
      paginationOption = {
        columnDefinitions: this.columnDefinitions,
        datasetName: GRAPHQL_QUERY_DATASET_NAME,
        isWithCursor: false,
        paginationOptions: {
          first: defaultPageSize,
          offset: 0
        },
        executeProcessCommandOnInit: true
      };
    }
    // when dealing with complex objects, we want to keep our field name with double quotes
    // example with gender: query { users (orderBy:[{field:"gender",direction:ASC}]) {}
    paginationOption.keepArgumentFieldDoubleQuotes = true;
    return paginationOption;
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
        this.graphqlQuery = this.graphqlService.buildQuery();
        resolve(mockedResult);
      }, 500);
    });
  }

  switchLanguage() {
    this.selectedLanguage = (this.selectedLanguage === 'en') ? 'fr' : 'en';
    this.translate.use(this.selectedLanguage);
  }
}
