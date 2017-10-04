import { GridBasicComponent } from './examples/grid-basic.component';
import { GridBackendComponent } from './examples/grid-backend.component';
import { GridClientSideComponent } from './examples/grid-clientside.component';
import { GridFormatterComponent } from './examples/grid-formatter.component';
import { GridOdataComponent } from './examples/grid-odata.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'basic', component: GridBasicComponent },
  { path: 'formatter', component: GridFormatterComponent },
  { path: 'clientside', component: GridClientSideComponent },
  { path: 'backend', component: GridBackendComponent },
  { path: 'odata', component: GridOdataComponent },
  { path: '', redirectTo: '/formatter', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingRoutingModule { }
