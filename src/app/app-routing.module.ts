import { GridMenuComponent } from './examples/grid-menu.component';
import { GridBasicComponent } from './examples/grid-basic.component';
import { GridClientSideComponent } from './examples/grid-clientside.component';
import { GridEditorComponent } from './examples/grid-editor.component';
import { GridFormatterComponent } from './examples/grid-formatter.component';
import { GridHeaderButtonComponent } from './examples/grid-headerbutton.component';
import { GridHeaderMenuComponent } from './examples/grid-headermenu.component';
import { GridOdataComponent } from './examples/grid-odata.component';
import { GridGraphqlComponent } from './examples/grid-graphql.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'basic', component: GridBasicComponent },
  { path: 'editor', component: GridEditorComponent },
  { path: 'formatter', component: GridFormatterComponent },
  { path: 'headerbutton', component: GridHeaderButtonComponent },
  { path: 'headermenu', component: GridHeaderMenuComponent },
  { path: 'gridmenu', component: GridMenuComponent },
  { path: 'clientside', component: GridClientSideComponent },
  { path: 'odata', component: GridOdataComponent },
  { path: 'gridgraphql', component: GridGraphqlComponent },
  { path: '', redirectTo: '/basic', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingRoutingModule { }
