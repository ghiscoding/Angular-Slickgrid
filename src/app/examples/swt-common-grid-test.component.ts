import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injectable,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SwtCommonGridComponent } from './swt-common-grid.component';
import { SwtCommonGridPaginationComponent } from './swt-common-grid-pagination.component';
import { FilterChangedArgs, PaginationChangedArgs, SortChangedArgs } from '../modules/angular-slickgrid';

import { Logger } from './swt-logger.service';
/**
 * Main test Component
 *
 * @author Saber Chebka, saber.chebka@gmail.com
 */
@Component({
  selector: 'swt-common-grid-test',
  templateUrl: './swt-common-grid-test.component.html'
})
@Injectable()
export class SwtCommonGridTestComponent implements OnInit, AfterViewInit {
  title = 'Example 13: Custom Backend Server Pagination';
  subTitle = `A simple component to show that it is possible to create a custom Backend Service for any other backend querying, the example below is for Oracle.`;
  componentFactory: any;
  testurl = 'http://127.0.0.1:8080/grid!display.do?';
  currentUrl = this.testurl;

  @ViewChild('commonGrid1', { static: true }) commonGrid: SwtCommonGridComponent;
  @ViewChild('commonGridPag1', { static: true }) commonGridPag: SwtCommonGridPaginationComponent;

  private logger: Logger = null;

  constructor(private httpClient: HttpClient,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.logger = new Logger('test', null);

  }

  ngOnInit() {
    // Link pagination component into the current Grid
    if (this.commonGridPag) {
      this.commonGrid.paginationComponent = this.commonGridPag;
    }

  }

  ngAfterViewInit() {
    this.logger.info('method [ngAfterViewInit] - START');

    setTimeout(() => {
      // Init datagrid example:
      this.commonGridPag.processing = true;

      // Real HTTP call
      this.currentUrl = this.testurl + '&currentPage=1';
      /*
      this.httpClient.get(this.currentUrl).subscribe(
          (data: any) => {
              this.commonGrid.CustomGrid(data.suspectManagement.grid.metadata);
              this.commonGrid.gridData = data.suspectManagement.grid.rows;
              this.commonGridPag.pageCount = data.suspectManagement.singletons.maxpage;
              this.commonGridPag.processing = false;
          }
      );
      */
      this.commonGrid.CustomGrid(data_sample.pagination_samples.grid.metadata);
      this.commonGrid.gridData = data_sample.pagination_samples.grid.rows;
      this.commonGridPag.pageCount = data_sample.pagination_samples.grid.rows.maxpage;

      this.commonGridPag.processing = false;
    }, 0);
    this.logger.info('method [ngAfterViewInit] - END');
  }

  filterChanged(event: FilterChangedArgs) {
    this.commonGridPag.processing = true;
    this.updateGridData();
  }

  paginationChanged(event: PaginationChangedArgs) {
    this.commonGridPag.processing = true;
    this.updateGridData();
  }

  sortChanged(event: SortChangedArgs) {
    this.commonGridPag.processing = true;
    this.updateGridData();
  }


  updateGridData() {
    this.currentUrl = this.testurl + '&currentPage=' + this.commonGrid.currentPage + '&selectedSort=' + this.commonGrid.sortedGridColumn + '&selectedFilter=' + this.commonGrid.filteredGridColumns;
    // Real HTTP call
    /*this.httpClient.get(this.currentUrl).subscribe(
        (data: any) => {
            this.commonGrid.gridData = data.suspectManagement?data.suspectManagement.grid.rows:[];
            this.commonGridPag.pageCount = data.suspectManagement?data.suspectManagement.singletons.maxpage:1;
            this.commonGridPag.processing = false;
        }
    );*/
    setTimeout(() => {
      this.commonGrid.gridData = data_sample.pagination_samples.grid.rows;
      this.commonGridPag.pageCount = data_sample.pagination_samples.grid.rows.maxpage;
    }, 750);
  }
}


export const data_sample = {
  'pagination_samples': {
    'grid': {
      'metadata': {
        'columns': {
          'column': [{
            'sort': true,
            'filterable': false,
            'width': 60,
            'dataelement': 'hasNote',
            'heading': 'Note'
          },
          {
            'sort': true,
            'filterable': true,
            'width': 125,
            'dataelement': 'status',
            'heading': 'Status'
          },
          {
            'sort': true,
            'visible': true,
            'filterable': true,
            'width': 125,
            'dataelement': 'currency',
            'heading': 'Currency'
          },
          {
            'sort': true,
            'visible': true,
            'filterable': true,
            'width': 125,
            'dataelement': 'amount',
            'heading': 'Amount'
          },
          {
            'sort': true,
            'visible': true,
            'filterable': true,
            'width': 125,
            'dataelement': 'inputDate',
            'heading': 'Input Date'
          },
          {
            'sort': true,
            'visible': true,
            'filterable': true,
            'width': 125,
            'dataelement': 'inputTime',
            'heading': 'Input Time'
          }]
        }
      },
      'rows': {
        'row': [{
          'currency': {
            'content': 'EUR'
          },
          'amount': {
            'content': '2 203 677,000'
          },
          'startTime': {
            'content': '06/19/2017 11:52:51'
          },
          'inputDate': {
            'content': '06/19/2017'
          },
          'status': {
            'content': 'New'
          },
          'inputTime': {
            'content': '11:52:51'
          },
          'hasNote': {
            'content': 'False'
          }
        },
        {
          'currency': {
            'content': 'USD'
          },
          'amount': {
            'content': '6 203 677,000'
          },
          'startTime': {
            'content': '06/28/2017 10:42:00'
          },
          'inputDate': {
            'content': '06/28/2017'
          },
          'status': {
            'content': 'New'
          },
          'inputTime': {
            'content': '10:40:12'
          },
          'hasNote': {
            'content': 'True'
          }
        }
        ],
        'maxpage': 5
      }
    }
  }
};
