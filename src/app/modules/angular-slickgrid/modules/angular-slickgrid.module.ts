import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Formatters } from './../formatters';
import { FilterService } from './../services/filter.service';
import { MouseService } from './../services/mouse.service';
import { GraphqlService } from './../services/graphql.service';
import { OdataService } from './../services/odata.service';
import { ResizerService } from './../services/resizer.service';
import { AngularSlickgridComponent } from './../components/angular-slickgrid.component';
import { SlickPaginationComponent } from './../components/slick-pagination.component';
import { SortService } from './../services/sort.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AngularSlickgridComponent,
    SlickPaginationComponent
  ],
  exports: [
    AngularSlickgridComponent,
    SlickPaginationComponent
  ],
  providers: [
    GraphqlService,
    MouseService,
    OdataService,
    FilterService,
    SortService,
    ResizerService
  ]
})
export class AngularSlickgridModule { }
