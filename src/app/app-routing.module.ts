import { GridBasicComponent } from './examples/grid-basic.component';
import { GridClientSideComponent } from './examples/grid-clientside.component';
import { GridFormatterComponent } from './examples/grid-formatter.component';
import { GridOdataComponent } from './examples/grid-odata.component';
import { GridGraphqlComponent } from './examples/grid-graphql.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'basic', component: GridBasicComponent },
  { path: 'formatter', component: GridFormatterComponent },
  { path: 'clientside', component: GridClientSideComponent },
  { path: 'odata', component: GridOdataComponent },
  { path: 'graphql', component: GridGraphqlComponent },
  { path: '', redirectTo: '/basic', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingRoutingModule { }
