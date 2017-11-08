import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularSlickgridComponent } from './../components/angular-slickgrid.component';
import { ControlAndPluginService } from '../services/controlAndPlugin.service';
import { Formatters } from './../formatters';
import { FilterService } from './../services/filter.service';
import { GridEventService } from './../services/gridEvent.service';
import { GraphqlService } from './../services/graphql.service';
import { OdataService } from './../services/odata.service';
import { ResizerService } from './../services/resizer.service';
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
    ControlAndPluginService,
    GraphqlService,
    GridEventService,
    OdataService,
    FilterService,
    SortService,
    ResizerService
  ]
})
export class AngularSlickgridModule { }
