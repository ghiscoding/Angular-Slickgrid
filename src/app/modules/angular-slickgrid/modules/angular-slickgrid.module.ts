import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularUtilService } from '../services/angularUtil.service';
import { AngularSlickgridComponent } from './../components/angular-slickgrid.component';
import { CollectionService } from './../services/collection.service';
import { FilterFactory } from '../filters/filterFactory';
import { GraphqlService } from './../services/graphql.service';
import { GridOdataService } from './../services/grid-odata.service';
import { GridOption } from './../models/gridOption.interface';
import { SlickPaginationComponent } from './../components/slick-pagination.component';
import { BsDropDownService } from '../services/bsDropdown.service';

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
  ],
  entryComponents: [AngularSlickgridComponent]
})
export class AngularSlickgridModule {
  static forRoot(config: GridOption = {}) {
    return {
      ngModule: AngularSlickgridModule,
      providers: [
        { provide: 'config', useValue: config },
        AngularUtilService,
        BsDropDownService,
        CollectionService,
        FilterFactory,
        GraphqlService,
        GridOdataService,
      ]
    };
  }
}
