import { Component, OnInit, ViewChild, ModuleWithProviders, NgModule, ViewContainerRef, ComponentFactoryResolver, OnChanges, AfterContentInit, AfterViewChecked, ElementRef, Renderer ,EventEmitter,
    Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import {SwtCommonGridComponent} from './swt-common-grid.component';
import {SwtCommonGridPaginationComponent} from './swt-common-grid-pagination.component';
import { FilterChangedArgs, PaginationChangedArgs, SortChangedArgs } from '../modules/angular-slickgrid';

import { Logger } from './swt-logger.service';

@Component({
  selector: 'swt-common-grid-test',
  templateUrl: './swt-common-grid-test.component.html'
})
export class SwtCommonGridTestComponent implements OnInit {
    componentFactory: any;

    // Base Data Request URL, an example of the result is found in the bottom of this class (json, pagination_samples)
    testurl:string = '/getData.do?';
    
    @ViewChild('commonGrid1') commonGrid: SwtCommonGridComponent;
    @ViewChild('commonGridPag1') commonGridPag: SwtCommonGridPaginationComponent;
    
    private logger: Logger = null;
    
    constructor(private httpClient: HttpClient,
            private viewContainerRef: ViewContainerRef,  
            private componentFactoryResolver: ComponentFactoryResolver) {
        this.logger = new Logger('test', null);
      
    }
    
    ngOnInit() {
        // Link pagination component into the current Grid
        if(this.commonGridPag){
            //this.commonGridPag.datagrid = tcommonGridhis.;
            this.commonGrid.paginationComponent = this.commonGridPag;
        }
        
        // Init datagrid example:
        this.commonGridPag.processing = true;
        this.httpClient.get(this.testurl+"&currentPage=1").subscribe(
            (data: any) => {
                this.commonGrid.CustomGrid(data.pagination_samples.grid.metadata);
                this.commonGrid.gridData = data.pagination_samples.grid.rows;
                this.commonGridPag.pageCount = data.pagination_samples.singletons.maxpage;
                this.commonGridPag.processing = false;
            }
        );
    }
    
    filterChanged(event: FilterChangedArgs){
        this.commonGridPag.processing = true;
        this.updateGridData(this.testurl+"&currentPage="+this.commonGrid.currentPage+"&selectedSort="+this.commonGrid.sortedGridColumn+"&selectedFilter="+this.commonGrid.filteredGridColumns);
    }
    
    paginationChanged(event: PaginationChangedArgs){
        this.commonGridPag.processing = true;
        this.updateGridData(this.testurl+"&currentPage="+this.commonGrid.currentPage+"&selectedSort="+this.commonGrid.sortedGridColumn+"&selectedFilter="+this.commonGrid.filteredGridColumns);
    }
    
    sortChanged(event: SortChangedArgs){
        this.commonGridPag.processing = true;
        this.updateGridData(this.testurl+"&currentPage="+this.commonGrid.currentPage+"&selectedSort="+this.commonGrid.sortedGridColumn+"&selectedFilter="+this.commonGrid.filteredGridColumns);
    }
    
    
    updateGridData(url: string){
        this.httpClient.get(url).subscribe(
            (data: any) => {
                this.commonGrid.gridData = data.pagination_samples?data.pagination_samples.grid.rows:[];
                this.commonGridPag.pageCount = data.pagination_samples?data.pagination_samples.singletons.maxpage:1;
                this.commonGridPag.processing = false;
            }
        );
    }
}

/*
{
    "pagination_samples": {
        "grid": {
            "metadata": {
                "columns": {
                    "column": [{
                        "sort": true,
                        "visible": true,
                        "filterable": false,
                        "width": 60,
                        "format": "",
                        "type": "image",
                        "dataelement": "hasNote",
                        "visible_default": true,
                        "draggable": false,
                        "columnorder": 1,
                        "heading": "Note"
                    },
                    {
                        "sort": true,
                        "visible": true,
                        "filterable": true,
                        "width": 125,
                        "format": "",
                        "type": "str",
                        "dataelement": "status",
                        "visible_default": true,
                        "draggable": true,
                        "columnorder": 2,
                        "heading": "Status"
                    },
                    {
                        "sort": true,
                        "visible": true,
                        "filterable": true,
                        "width": 125,
                        "format": "",
                        "type": "str",
                        "dataelement": "currency",
                        "visible_default": true,
                        "draggable": true,
                        "columnorder": 3,
                        "heading": "Currency"
                    },
                    {
                        "sort": true,
                        "visible": true,
                        "filterable": true,
                        "width": 125,
                        "format": "",
                        "type": "num",
                        "dataelement": "amount",
                        "visible_default": true,
                        "draggable": true,
                        "columnorder": 4,
                        "heading": "Amount"
                    },
                    {
                        "sort": true,
                        "visible": true,
                        "filterable": true,
                        "width": 125,
                        "format": "",
                        "type": "date",
                        "dataelement": "inputDate",
                        "visible_default": true,
                        "draggable": true,
                        "columnorder": 5,
                        "heading": "Input Date"
                    },
                    {
                        "sort": true,
                        "visible": true,
                        "filterable": true,
                        "width": 125,
                        "format": "",
                        "type": "date",
                        "dataelement": "inputTime",
                        "visible_default": true,
                        "draggable": true,
                        "columnorder": 6,
                        "heading": "Input Time"
                    }]
                }
            },
            "rows": {
                "row": [{
                    "currency": {
                        "content": "EUR",
                        "clickable": false,
                        "negative": false
                    },
                    "amount": {
                        "content": "2 203 677,000",
                        "clickable": false,
                        "negative": false,
                        "code": 2203677
                    },
                    "startTime": {
                        "content": "06/19/2017 11:52:51",
                        "clickable": false,
                        "negative": false
                    },
                    "inputDate": {
                        "content": "06/19/2017",
                        "clickable": false,
                        "negative": false
                    },
                    "status": {
                        "content": "New",
                        "clickable": false,
                        "negative": false,
                        "code": "new"
                    },
                    "inputTime": {
                        "content": "11:52:51",
                        "clickable": false,
                        "negative": false
                    },
                    "hasNote": {
                        "content": "false",
                        "clickable": false,
                        "negative": false,
                        "code": "N"
                    }
                },
                ],
                "size": 481,
                "maxpage": "5"
            }
        }
    }
}


*/