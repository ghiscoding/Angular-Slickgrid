import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AngularGridInstance,
  Column,
  FieldType,
  Filters,
  Formatters,
  GraphqlResult,
  GraphqlService,
  GraphqlServiceOption,
  GridOption,
  GridStateChange,
  JQueryUiSliderOption,
  MultipleSelectOption,
  OperatorType,
  SortDirection,
  Statistic
} from './../modules/angular-slickgrid';
import * as moment from 'moment-mini';
import { Subscription } from 'rxjs';

const defaultPageSize = 20;
const GRAPHQL_QUERY_DATASET_NAME = 'users';
const LOCAL_STORAGE_KEY = 'gridStateGraphql';

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
      <li>This example also demos the Grid State feature, open the console log to see the changes</li>
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
  statistics: Statistic;

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
          model: Filters.singleSelect,
          collection: [{ value: '', label: '' }, { value: 'male', label: 'male', labelKey: 'MALE' }, { value: 'female', label: 'female', labelKey: 'FEMALE' }]
        }
      },
      {
        id: 'company', field: 'company', headerKey: 'COMPANY', width: 60,
        sortable: true,
        filterable: true,
        filter: {
          model: Filters.multipleSelect,
          collection: [{ value: 'acme', label: 'Acme' }, { value: 'abc', label: 'Company ABC' }, { value: 'xyz', label: 'Company XYZ' }],
          filterOptions: {
            filter: true // adds a filter on top of the multi-select dropdown
          } as MultipleSelectOption
        }
      },
      { id: 'billing.address.street', field: 'billing.address.street', headerKey: 'BILLING.ADDRESS.STREET', width: 60, filterable: true, sortable: true },
      {
        id: 'billing.address.zip', field: 'billing.address.zip', headerKey: 'BILLING.ADDRESS.ZIP', width: 60,
        type: FieldType.number,
        filterable: true, sortable: true,
        filter: {
          model: Filters.compoundInput
        },
        formatter: Formatters.multiple, params: { formatters: [Formatters.complexObject, Formatters.translate] }
      },
      {
        id: 'duration', field: 'duration', name: 'Duration', maxWidth: 90,
        type: FieldType.number,
        sortable: true,
        filterable: true, filter: {
          model: Filters.input,
          operator: OperatorType.rangeInclusive // defaults to exclusive
        }
      },
      {
        id: 'finish', name: 'Finish', field: 'finish', headerKey: 'FINISH', formatter: Formatters.dateIso, sortable: true, minWidth: 75, width: 120, exportWithFormatter: true,
        type: FieldType.date,
        filterable: true,
        filter: {
          model: Filters.dateRange,
        }
      },
      {
        id: 'complete', name: '% Complete', field: 'complete', headerKey: 'PERCENT_COMPLETE', minWidth: 120,
        sortable: true,
        formatter: Formatters.progressBar,
        type: FieldType.number,
        filterable: true,
        filter: {
          model: Filters.sliderRange,
          maxValue: 100, // or you can use the filterOptions as well
          operator: OperatorType.rangeInclusive, // defaults to exclusive
          params: { hideSliderNumbers: false }, // you can hide/show the slider numbers on both side
          filterOptions: { min: 0, step: 5 } as JQueryUiSliderOption // you can also optionally pass any option of the jQuery UI Slider
        }
      },
    ];

    const presetLowestDay = moment().add(-2, 'days').format('YYYY-MM-DD');
    const presetHighestDay = moment().add(20, 'days').format('YYYY-MM-DD');

    this.gridOptions = {
      enableFiltering: true,
      enableCellNavigation: true,
      enableCheckboxSelector: true,
      enableRowSelection: true,
      enableTranslate: true,
      i18n: this.translate,
      gridMenu: {
        resizeOnShowHeaderRow: true,
        customItems: [
          {
            iconCssClass: 'fa fa-times text-danger',
            title: 'Reset Grid',
            disabled: false,
            command: 'reset-grid',
            positionOrder: 60
          }
        ],
        onCommand: (e, args) => {
          if (args.command === 'reset-grid') {
            this.angularGrid.gridService.resetGrid(this.columnDefinitions);
            localStorage[LOCAL_STORAGE_KEY] = null;
          }
        }
      },
      pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: defaultPageSize,
        totalItems: 0
      },
      presets: {
        columns: [
          { columnId: 'name', width: 120 },
          { columnId: 'gender', width: 55 },
          { columnId: 'company' },
          { columnId: 'billing.address.zip' }, // flip column position of Street/Zip to Zip/Street
          { columnId: 'billing.address.street', width: 120 },
          { columnId: 'duration', width: 100 },
          { columnId: 'finish', width: 100 },
          { columnId: 'complete', width: 100 },
        ],
        // you can also type operator as string, e.g.: operator: 'EQ'
        filters: [
          // { columnId: 'gender', searchTerms: ['male'], operator: OperatorType.equal },
          // { columnId: 'name', searchTerms: ['John Doe'], operator: OperatorType.contains },
          // { columnId: 'company', searchTerms: ['xyz'], operator: 'IN' }

          // or you could also use 2 searchTerms values, instead of using the 2 dots (only works with SliderRange & DateRange Filters)
          { columnId: 'duration', searchTerms: ['4..88'] },
          { columnId: 'complete', searchTerms: [5, 80], operator: 'RangeInclusive' }, // same result with searchTerms: ['5..80']
          { columnId: 'finish', operator: 'RangeInclusive', searchTerms: [presetLowestDay, presetHighestDay] },
        ],
        sorters: [
          // direction can written as 'asc' (uppercase or lowercase) and/or use the SortDirection type
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
        postProcess: (result: GraphqlResult) => {
          this.statistics = result.statistics;
          this.displaySpinner(false);
        }
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

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridStateChanges: GridStateChange) {
    console.log('Client sample, Grid State changed:: ', gridStateChanges);
    localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(gridStateChanges.gridState);
  }

  clearAllFiltersAndSorts() {
    if (this.angularGrid && this.angularGrid.gridService) {
      this.angularGrid.gridService.clearAllFiltersAndSorts();
    }
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
