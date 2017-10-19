import { GridOdataService } from './modules/angular-slickgrid/services';
import { AppRoutingRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridBasicComponent } from './examples/grid-basic.component';
import { GridBackendComponent } from './examples/grid-backend.component';
import { GridClientSideComponent } from './examples/grid-clientside.component';
import { GridFormatterComponent } from './examples/grid-formatter.component';
import { GridOdataComponent } from './examples/grid-odata.component';
import { GridGraphqlComponent } from './examples/grid-graphql.component';

// import our custom module, library created using this article
// https://medium.com/@ngl817/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e
import { AngularSlickgridModule } from './modules/angular-slickgrid/modules/angular-slickgrid.module';
// import { SlickgridModule } from 'angular-slickgrid';

@NgModule({
  declarations: [
    AppComponent,
    GridBasicComponent,
    GridClientSideComponent,
    GridFormatterComponent,
    GridBackendComponent,
    GridOdataComponent,
    GridGraphqlComponent
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
