import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSlickgridComponent } from './../components/angular-slickgrid.component';
import { ControlAndPluginService } from '../services/controlAndPlugin.service';
import { ExportService } from '../services/export.service';
import { FilterService } from './../services/filter.service';
import { GridOdataService } from './../services/grid-odata.service';
import { GridOption } from './../models/gridOption.interface';
import { GridEventService } from './../services/gridEvent.service';
import { GridExtraService } from './../services/gridExtra.service';
import { GridStateService } from './../services/gridState.service';
import { GraphqlService } from './../services/graphql.service';
import { OdataService } from './../services/odata.service';
import { ResizerService } from './../services/resizer.service';
import { SlickPaginationComponent } from './../components/slick-pagination.component';
import { SortService } from './../services/sort.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    AngularSlickgridComponent,
    SlickPaginationComponent
  ],
  exports: [
    AngularSlickgridComponent,
    SlickPaginationComponent
  ]
})
export class AngularSlickgridModule {
  static forRoot(config: GridOption = {}) {
    return {
      ngModule: AngularSlickgridModule,
      providers: [
        {provide: 'config', useValue: config},
        ControlAndPluginService,
        ExportService,
        FilterService,
        GraphqlService,
        GridEventService,
        GridExtraService,
        GridOdataService,
        GridStateService,
        OdataService,
        ResizerService,
        SortService
      ]
    };
  }
}
