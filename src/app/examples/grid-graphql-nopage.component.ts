import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AngularGridInstance,
  Column,
  Filters,
  Formatters,
  GraphqlResult,
  GraphqlService,
  GraphqlServiceApi,
  GridOption,
  Metrics,
  MultipleSelectOption,
  OperatorType,
} from './../modules/angular-slickgrid';
import { Observable } from 'rxjs';

const COUNTRIES_API = 'https://countries.trevorblades.com/';

@Component({
  templateUrl: './grid-graphql-nopage.component.html',
  styleUrls: ['./grid-graphql-nopage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@Injectable()
export class GridGraphqlWithoutPaginationComponent implements OnInit {
  title = 'Example 27: GraphQL Basic API without Pagination';
  subTitle = `
  Use it as a basic GraphQL API with any external public APIs (<a href="https://github.com/ghiscoding/Angular-Slickgrid/wiki/GraphQL" target="_blank">Wiki docs</a>).
  <ul>
    <li>This Examples uses a Public GraphQL API that you can find at this link <a href="https://countries.trevorblades.com/" target="_blank">https://countries.trevorblades.com/</a></li>
    <li>Compare to the regular and default GraphQL implementation, you will find the following differenecs</li>
    <ul>
      <li>There are no Pagination and we only use GraphQL once to load the data</li>
      <li>We enabled the following 2 flags "useLocalFiltering" and "useLocalSorting" to use regular (in memory) DataView filtering/sorting</li>
    </ul>
    <li>NOTE - This Example calls multiple GraphQL queries, this is ONLY for demo purposes, you would typically only call 1 query (which is what GraphQL is good at)</li>
    <li>This demo is mainly to show the use of GraphqlService to build the query and retrieve the data but also to show how to mix that with usage of local Filtering/Sorting strategies</li>
  </ul>
  `;
  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset = [];
  metrics: Metrics;

  graphqlQuery = '';
  processing = true;
  status = { text: 'processing...', class: 'alert alert-danger' };
  isDataLoaded = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'countryCode', field: 'code', name: 'Code', maxWidth: 90, sortable: true, filterable: true, columnGroup: 'Country' },
      { id: 'countryName', field: 'name', name: 'Name', width: 60, sortable: true, filterable: true, columnGroup: 'Country' },
      { id: 'countryNative', field: 'native', name: 'Native', width: 60, sortable: true, filterable: true, columnGroup: 'Country' },
      { id: 'countryPhone', field: 'phone', name: 'Phone Area Code', maxWidth: 110, sortable: true, filterable: true, columnGroup: 'Country' },
      { id: 'countryCurrency', field: 'currency', name: 'Currency', maxWidth: 90, sortable: true, filterable: true, columnGroup: 'Country' },
      { id: 'countryEmoji', field: 'emoji', name: 'Emoji', maxWidth: 90, sortable: true, columnGroup: 'Country' },
      {
        id: 'continentCode', field: 'continent.code', name: 'Code', maxWidth: 90,
        sortable: true,
        filterable: true,
        filter: {
          model: Filters.singleSelect,
          collectionAsync: this.getContinents(),
          collectionOptions: {
            // the data is not at the root of the array, so we must tell the Select Filter where to pull the data
            collectionInsideObjectProperty: 'data.continents',
            addBlankEntry: true,
            separatorBetweenTextLabels: ': ',
          },
          customStructure: {
            value: 'code',
            label: 'code',
            labelSuffix: 'name',
          }
        },
        formatter: Formatters.complexObject, columnGroup: 'Continent',
      },
      {
        id: 'continentName', field: 'continent.name', name: 'Name', width: 60, sortable: true,
        filterable: true, formatter: Formatters.complexObject, columnGroup: 'Continent'
      },
      {
        id: 'languageCode', field: 'languages.code', name: 'Codes', maxWidth: 100,
        formatter: Formatters.arrayObjectToCsv, params: { propertyNames: ['code'], useFormatterOuputToFilter: true }, columnGroup: 'Language',
        filterable: true,
      },
      {
        id: 'languageName', field: 'languages.name', name: 'Names', width: 60,
        formatter: Formatters.arrayObjectToCsv, columnGroup: 'Language',
        params: { propertyNames: ['name'], useFormatterOuputToFilter: true },
        filterable: true,
        // this Filter is a bit more tricky than others since the values are an array of objects
        // what we can do is use the Formatter to search from the CSV string coming from the Formatter (with "useFormatterOuputToFilter: true")
        // we also need to use the Operator IN_CONTAINS
        filter: {
          model: Filters.multipleSelect,
          collectionAsync: this.getLanguages(),
          operator: OperatorType.inContains,
          collectionOptions: {
            addBlankEntry: true,
            // the data is not at the root of the array, so we must tell the Select Filter where to pull the data
            collectionInsideObjectProperty: 'data.languages'
          },
          collectionFilterBy: [
            // filter out any empty values
            { property: 'name', value: '', operator: 'NE' },
            { property: 'name', value: null, operator: 'NE' },
          ],
          collectionSortBy: {
            property: 'name'
          },
          customStructure: {
            value: 'name',
            label: 'name',
          },
          filterOptions: {
            filter: true
          } as MultipleSelectOption
        },
      },
      {
        id: 'languageNative', field: 'languages.native', name: 'Native', width: 60,
        formatter: Formatters.arrayObjectToCsv, params: { propertyNames: ['native'] }, columnGroup: 'Language',
      },
    ];

    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableFiltering: true,
      enableCellNavigation: true,
      enablePagination: false,
      enableTranslate: true,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 28,
      datasetIdPropertyName: 'code',
      backendServiceApi: {
        // use the GraphQL Service to build the query but use local (in memory) Filtering/Sorting strategies
        // the useLocalFiltering/useLocalSorting flags can be enabled independently
        service: new GraphqlService(),
        useLocalFiltering: true,
        useLocalSorting: true,

        options: {
          datasetName: 'countries', // the only REQUIRED property
        },
        // you can define the onInit callback OR enable the "executeProcessCommandOnInit" flag in the service init
        preProcess: () => !this.isDataLoaded ? this.displaySpinner(true) : '',
        process: (query) => this.getCountries(query),
        postProcess: (result: GraphqlResult) => {
          this.metrics = result.metrics;
          this.displaySpinner(false);
          this.isDataLoaded = true;
        }
      } as GraphqlServiceApi
    };
  }

  displaySpinner(isProcessing) {
    this.processing = isProcessing;
    this.status = (isProcessing)
      ? { text: 'processing...', class: 'alert alert-danger' }
      : { text: 'done', class: 'alert alert-success' };
  }

  // --
  // NOTE - Demo Code ONLY
  // This Example calls multiple GraphQL queries, this is ONLY for demo purposes, you would typically only call 1 query (which is what GraphQL is good at)
  // This demo is mainly to show the use of GraphqlService to build the query and retrieve the data but also to show how to mix that with usage of local Filtering/Sorting strategies
  // --

  /** Calling the GraphQL backend API to get the Countries with the Query created by the "process" method of GraphqlService  */
  getCountries(query: string): Observable<GraphqlResult> {
    return this.http.post<GraphqlResult>(COUNTRIES_API, { query });
  }

  /**
   * Calling again the GraphQL backend API, however in this case we cannot use the GraphQL Service to build the query
   * So we will have to write, by hand, the query to get the continents code & name
   * We also need to resolve the data in a flat array (singleSelect/multipleSelect Filters only accept data at the root of the array)
   */
  getContinents() {
    const continentQuery = `query { continents { code, name  }}`;
    return this.http.post<GraphqlResult>(COUNTRIES_API, { query: continentQuery });
  }

  /**
   * Calling again the GraphQL backend API, however in this case we cannot use the GraphQL Service to build the query
   * So we will have to write, by hand, the query to get the languages code & name
   * We also need to resolve the data in a flat array (singleSelect/multipleSelect Filters only accept data at the root of the array)
   */
  getLanguages() {
    const languageQuery = `query { languages { code, name  }}`;
    return this.http.post<GraphqlResult>(COUNTRIES_API, { query: languageQuery });
  }
}
