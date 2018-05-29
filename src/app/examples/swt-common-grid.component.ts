import { Component, OnInit, Injectable, ViewContainerRef, ComponentFactoryResolver,
         ComponentFactory, ComponentRef, AfterContentChecked, AfterViewChecked,
         AfterViewInit, Input, EventEmitter, Output, ViewChild ,
         ElementRef, Renderer} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularSlickgridComponent, Column, FieldType, Formatter, Formatters,
         GridOption, OnEventArgs, BackendService,
         BackendServiceOption, FilterChangedArgs, PaginationChangedArgs, SortChangedArgs, Pagination} from '../modules/angular-slickgrid';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from './swt-logger.service';
import { SwtCommonGridPaginationComponent } from './swt-common-grid-pagination.component';

/**
 * Custom wrapper of angular-slickgrid components, allows easily interacting with SwtCommonGridPaginationComponent
 *
 * @author Saber Chebka, saber.chebka@gmail.com
 */

let timer: any;
const DEFAULT_FILTER_TYPING_DEBOUNCE = 750;

@Component({
  selector: 'swt-common-grid',
  template: `<angular-slickgrid gridId='common-grid'
                      #angularSlickGrid
                      (onDataviewCreated)="dataviewReady($event)"
                      (onGridCreated)="gridReady($event)"
                      [columnDefinitions]="columnDefinitions"
                      [gridOptions]="gridOptions"
                      [dataset]="dataset"
                      >
                      </angular-slickgrid>`,
  styles: [`
       :host ::ng-deep .gridPane{
            width: 100%!important;
        }
        :host ::ng-deep .slickgrid-container{
            width: 100%!important;
         }
    `]
})

@Injectable()
export class SwtCommonGridComponent implements OnInit, AfterViewInit, BackendService {

    private logger: Logger = null;
    private defaultPageSize = 20;

    @Input() gridHeight = 100;
    @Input() gridWidth = 600;

    gridHeightString: string;
    gridWidthString: string;

    @ViewChild('angularSlickGrid') angularSlickGrid: AngularSlickgridComponent;

    columnDefinitions: Column[] = [];
    dataset: any[];
    gridObj: any;
    dataviewObj: any;
    isAutoEdit = false;
    updatedObject: any;
    isMultiSelect = true;
    selectedObjects: any[];
    selectedObject: any;

    // Slick grid
    metaData: any;
    columnData: any;
    rowsData: any;
    selects: any;
    id: any;

    options: BackendServiceOption;
    pagination: Pagination;


    @Output('onFilterChanged') onFilterChanged_: EventEmitter<FilterChangedArgs> = new EventEmitter<FilterChangedArgs>();
    @Output('onPaginationChanged') onPaginationChanged_: EventEmitter<PaginationChangedArgs> = new EventEmitter<PaginationChangedArgs>();
    @Output('onSortChanged') onSortChanged_: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();

    sortedGridColumn = '';
    currentPage = 1;
    filteredGridColumns = '';

    // Data


    // Injected functions
    private _onRowDoubleClick: Function = new Function();
    private _onRowClick: Function = new Function();


    private _selectedRow: any;


    gridOptions: GridOption = {
        asyncEditorLoading: false,
        autoEdit: this.isAutoEdit,
        autoResize: {
          containerId: 'common-grid-container',
          sidePadding: 15
        },
        // locale: 'fr',
        enableColumnPicker: true,
        enableCellNavigation: true,
        enableRowSelection: true,
        enableCheckboxSelector: false,
        enableFiltering: true ,
        rowHeight: 23,
        forceFitColumns: true,
        enableAutoTooltip: true,
        enableGridMenu: true,
        enablePagination: false
    };

    // Initialized to a fake pagination object
    private _paginationComponent: any = {
         processing: false,
         realPagination: false
    };

    @Input('pagination')
    set paginationComponent(value: SwtCommonGridPaginationComponent) {
        this.logger.info('method [pagination] - START, assigned datagrid pagination object: ', value.realPagination );
        if (value.realPagination) {
            this._paginationComponent = value;
            this.gridOptions.backendServiceApi = {
              service: this,
              preProcess: () => {},
              process: (query) => {
                return null;
              },
              postProcess: (response) => {}
            };
            this._paginationComponent.gridPaginationOptions = this.gridOptions;
            this.angularSlickGrid.createBackendApiInternalPostProcessCallback(this.gridOptions);
        }
        this.logger.info('method [pagination] - START');
    }

    get paginationComponent(): SwtCommonGridPaginationComponent {
        return this._paginationComponent;
    }

    /**
     *
     * @param gridService
     * @param resizer
     * @param httpClient
     */
    constructor(private httpClient: HttpClient, private translate: TranslateService,
            private el: ElementRef, private renderer: Renderer) {
        this.logger = new Logger('grid', httpClient);

        this.logger.info('method [constructor] - START/END');
    }



    /**
     *
     */
    ngOnInit() {
        this.logger.info('method [ngOnInit] - START/END');
        // this.gridHeightString = `${this.gridHeight}px`;
        // this.gridWidthString = `${this.gridWidth}px`;
    }


    /**
     *
     */
    ngAfterViewInit() {
       this.logger.info('method [ngAfterViewInit] - START/END');
    }

    /**
    * CustomGrid constructor
    * @param columnData
    */
    CustomGrid(columnData: any) {
        this.logger.info('method [CustomGrid] - START');

        this.id = 'grid' + Math.floor(Math.random() * Math.floor(100));

        // get metadata from input JSON
        this.metaData = columnData;

        // COLUMNS DATA
        const rowData: any = [];

        // check if allcolumns tag contains any children
        if (this.metaData.columns.column  ) {

            // set columnsData and columnDefinitions
            this.columnData = this.metaData.columns.column ;

            for (let index = 0; index < this.columnData.length; index++) {

                const type       = FieldType.string;
                const editor     = null;
                const formatter  = null;
                const filter     = null;
                const outputType = null;
                const params     = null;

                const col = {    id:         this.columnData[index].dataelement,
                                 name:       this.columnData[index].heading,
                                 field:      this.columnData[index].dataelement,
                                 sortable:   this.columnData[index].sort,
                                 filterable: this.columnData[index].filterable,
                                 type,
                                 editor,
                                 formatter,
                                 filter,
                                 outputType,
                                 params ,
                                 width:      this.columnData[index].width
                             };

                this.columnDefinitions.push(col);
                rowData[col.id] = '';
            }

            // Columns are not visible, seems to be a bug ? next line fixed it..
            this.gridObj.setColumns(this.columnDefinitions);
            this.angularSlickGrid.showPagination = false;

            // Show filters when grid starts; this could be parametrized
            // this.gridObj.setHeaderRowVisibility(false);
            // this.gridObj.setTopPanelVisibility(false);
        }

        // Dummy dataset
        this.dataset = rowData;

        this.logger.info('method [CustomGrid] - END, this.columnDefinitions=', this.columnDefinitions);
    }

   /**
    * CommonGrid constructor
    * @param columnsData
    * @param lockedColumnCount
    * @param uniqueColumn
    * @param baseURL
    * @param programId
    * @param componentId
    * @param enableRenders
    * @param colValidationMap
    * @param checkHeader
    * @param cboLinked
    */
    CommonGrid(columnsData: any, lockedColumnCount: number, uniqueColumn: string, baseURL: string, programId: string, componentId: string, enableRenders: boolean= true, colValidationMap: any= null, checkHeader: boolean= false, cboLinked: boolean= false) {
    }


    set gridData(rawData: any) {
        this.logger.info('method [gridData] - START');
        const dataProvider: any = [];

        for (let index = 0; rawData.row && index < rawData.row.length; index++) {
            const row = <Object> rawData.row[index];
            const idObj = {
               id : index
            };

            let key: string;
            const rowData: any = [];
            for (key in row) {
                if (row.hasOwnProperty(key)) {
                    rowData[key] = row[key].content;
                }
            }
            dataProvider[index] = Object.assign(rowData, idObj);
        }

        this.dataset = dataProvider;
        this.paginationComponent.processing = false;
        this.logger.info('method [gridData] - END, all data size=' + (rawData && rawData.hasOwnProperty('size') ? rawData.size : 0));

        // this.gridObj.setSortColumn('excludeType', true);
        // this.dataviewObj.reSort();
        // this.gridObj.setSortColumns([{'columnId':'excludeType','sortAsc':true}]);

        // this.gridObj.invalidate();
        // this.gridObj.render();
    }

    get gridData(): any {
        return this.dataset;
    }

    gridReady(grid) {
        this.logger.info('method [gridReady] - START');
        this.gridObj = grid;
        this.logger.info('method [gridReady] - END');
    }

    dataviewReady(dataview) {
        this.logger.info('method [dataviewReady] - START/END', dataview);
        this.dataviewObj = dataview;
    }




    /********************************************************/
    /******** Pagination+Sot+Filter service : START *********/
    /********************************************************/
    buildQuery(): string {
        return 'buildQuery...';
    }

    init( serviceOptions: BackendServiceOption, pagination?: Pagination ): void {
        this.options = serviceOptions;
        this.pagination = pagination;
    }


    resetPaginationOptions() {

    }

    updateOptions( serviceOptions?: BackendServiceOption ) {
        this.options = { ...this.options, ...serviceOptions };
    }


    /**
     * FILTERING EMIT EVENT
     * @param event
     * @param args
     */
    processOnFilterChanged( event: Event, args: FilterChangedArgs ): Promise<string> {
        this.logger.info('method [onFilterChanged] - START', args);
        this.filteredGridColumns = '';
        let timing = 0;
        if (event.type === 'keyup' || event.type === 'keydown') {
            timing = DEFAULT_FILTER_TYPING_DEBOUNCE;
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            this.filteredGridColumns = '';
            for (let idx = 0; idx < this.columnDefinitions.length; idx++) {
                if (args.columnFilters.hasOwnProperty(this.columnDefinitions[idx].field)) {
                    this.filteredGridColumns += args.columnFilters[this.columnDefinitions[idx].field].searchTerms[0] + '|';
                } else {
                    this.filteredGridColumns += 'All|';
                }
            }

            // Reset to the first page
            this.paginationComponent.pageNumber = 1;
            this.currentPage = 1;

            // dispatch event
            this.onFilterChanged_.emit(args);
            this.logger.info('method [onFilterChanged] - onFilterChanged_.emit(args) performed, filteredGridColumns=' + this.filteredGridColumns);
        }, timing);

        this.logger.info('method [onFilterChanged] - END');
        return null;
    }


    /**
     * PAGINATION EMIT EVENT
     * @param event
     * @param args
     */
    processOnPaginationChanged( event: Event, args: PaginationChangedArgs ) {
        this.logger.info('method [onPaginationChanged] - START');
        this.currentPage = args.newPage;
        this.onPaginationChanged_.emit(args);
        this.logger.info('method [onPaginationChanged] - END, currentPage=' + this.currentPage);
        return 'onPaginationChanged';
    }

    /**
     * SORT EMIT EVENT
     * @param event
     * @param args
     */
    processOnSortChanged( event: Event, args: SortChangedArgs ) {
        this.logger.info('method [onSortChanged] - START');
        this.sortedGridColumn = '';
        const sortDirection = '|' + args.sortCols[0].sortAsc + '|';
        for (let idx = 0; idx < this.columnDefinitions.length; idx++) {
            if (this.columnDefinitions[idx].field === args.sortCols[0].sortCol.field) {
                this.sortedGridColumn = '' + idx + sortDirection;
            }
        }
        this.onSortChanged_.emit(args);
        this.logger.info('method [onSortChanged] - END, sortedGridColumn=' + this.sortedGridColumn);
        return 'onSortChanged';
    }



    getFilteredGridColumns() {
        return this.filteredGridColumns;
    }

    getSortedGridColumn() {
        return this.sortedGridColumn;
    }

    /******** Pagination+Sot+Filter service: END *****************/







    // Getters and Setters
    get selectedRow() {
        return this._selectedRow;
    }
    set selectedRow(row: any) {
        this._selectedRow = row;
    }

    get onRowDoubleClick() {
        return this._onRowDoubleClick;
    }
    set onRowDoubleClick(event: Function) {
        this._onRowDoubleClick = event;
    }

    get onRowClick() {
        return this._onRowClick;
    }
    set onRowClick(event: Function) {
        this._onRowClick = event;
    }

}
