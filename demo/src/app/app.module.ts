import { GridOdataService } from 'angular-slickgrid';
import { HttpClientModule } from '@angular/common/http';
import { GridBasicComponent } from './examples/grid-basic.component';
import { GridFormatterComponent } from './examples/grid-formatter.component';
import { GridClientSideComponent } from './examples/grid-clientside.component';
import { GridBackendComponent } from './examples/grid-backend.component';
import { GridOdataComponent } from './examples/grid-odata.component';
import { AppRoutingRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
// import { AngularSlickgridModule } from '../../../src/modules/angular-slickgrid.module';

@NgModule({
  declarations: [
    AppComponent,
    GridBasicComponent,
    GridClientSideComponent,
    GridFormatterComponent,
    GridBackendComponent,
    GridOdataComponent
  ],
  imports: [
    AppRoutingRoutingModule,
    BrowserModule,
    HttpClientModule,
    AngularSlickgridModule
  ],
  providers: [GridOdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
