import { CommonModule } from '@angular/common';
import { type ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AngularSlickgridComponent } from './../components/angular-slickgrid.component';
import { GridOption } from './../models/gridOption.interface';
import { AngularUtilService } from '../services/angularUtil.service';
import { ContainerService } from '../services/container.service';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [AngularSlickgridComponent],
  exports: [AngularSlickgridComponent],
})
export class AngularSlickgridModule {
  static forRoot(config: GridOption = {}): ModuleWithProviders<AngularSlickgridModule> {
    return {
      ngModule: AngularSlickgridModule,
      providers: [
        { provide: 'config', useValue: config },
        { provide: 'externalService', useValue: null },
        AngularUtilService,
        ContainerService,
      ],
    };
  }
}
