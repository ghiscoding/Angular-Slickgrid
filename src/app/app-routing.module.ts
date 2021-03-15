import { HomeComponent } from './examples/home.component';
import { GridAddItemComponent } from './examples/grid-additem.component';
import { GridAngularComponent } from './examples/grid-angular.component';
import { GridAutoHeightComponent } from './examples/grid-autoheight.component';
import { GridBasicComponent } from './examples/grid-basic.component';
import { GridClientSideComponent } from './examples/grid-clientside.component';
import { GridColspanComponent } from './examples/grid-colspan.component';
import { GridContextMenuComponent } from './examples/grid-contextmenu.component';
import { GridDraggableGroupingComponent } from './examples/grid-draggrouping.component';
import { GridEditorComponent } from './examples/grid-editor.component';
import { GridFormatterComponent } from './examples/grid-formatter.component';
import { GridFrozenComponent } from './examples/grid-frozen.component';
import { GridGraphqlComponent } from './examples/grid-graphql.component';
import { GridGraphqlWithoutPaginationComponent } from './examples/grid-graphql-nopage.component';
import { GridGroupingComponent } from './examples/grid-grouping.component';
import { GridHeaderButtonComponent } from './examples/grid-headerbutton.component';
import { GridHeaderMenuComponent } from './examples/grid-headermenu.component';
import { GridLocalizationComponent } from './examples/grid-localization.component';
import { GridMenuComponent } from './examples/grid-menu.component';
import { GridOdataComponent } from './examples/grid-odata.component';
import { GridRangeComponent } from './examples/grid-range.component';
import { GridRemoteComponent } from './examples/grid-remote.component';
import { GridRowDetailComponent } from './examples/grid-rowdetail.component';
import { GridRowMoveComponent } from './examples/grid-rowmove.component';
import { GridRowSelectionComponent } from './examples/grid-rowselection.component';
import { GridStateComponent } from './examples/grid-state.component';
import { GridTabsComponent } from './examples/grid-tabs.component';
import { GridTreeDataHierarchicalComponent } from './examples/grid-tree-data-hierarchical.component';
import { GridTreeDataParentChildComponent } from './examples/grid-tree-data-parent-child.component';
import { SwtCommonGridTestComponent } from './examples/swt-common-grid-test.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'angular-components', component: GridAngularComponent },
  { path: 'additem', component: GridAddItemComponent },
  { path: 'autoheight', component: GridAutoHeightComponent },
  { path: 'basic', component: GridBasicComponent },
  { path: 'colspan', component: GridColspanComponent },
  { path: 'context', component: GridContextMenuComponent },
  { path: 'editor', component: GridEditorComponent },
  { path: 'formatter', component: GridFormatterComponent },
  { path: 'frozen', component: GridFrozenComponent },
  { path: 'headerbutton', component: GridHeaderButtonComponent },
  { path: 'headermenu', component: GridHeaderMenuComponent },
  { path: 'gridgraphql', component: GridGraphqlComponent },
  { path: 'graphql-nopage', component: GridGraphqlWithoutPaginationComponent },
  { path: 'gridmenu', component: GridMenuComponent },
  { path: 'gridstate', component: GridStateComponent },
  { path: 'gridtabs', component: GridTabsComponent },
  { path: 'draggrouping', component: GridDraggableGroupingComponent },
  { path: 'grouping', component: GridGroupingComponent },
  { path: 'localization', component: GridLocalizationComponent },
  { path: 'clientside', component: GridClientSideComponent },
  { path: 'odata', component: GridOdataComponent },
  { path: 'range', component: GridRangeComponent },
  { path: 'remote', component: GridRemoteComponent },
  { path: 'rowdetail', component: GridRowDetailComponent },
  { path: 'rowmove', component: GridRowMoveComponent },
  { path: 'selection', component: GridRowSelectionComponent },
  { path: 'tree-data-parent-child', component: GridTreeDataParentChildComponent },
  { path: 'tree-data-hierarchical', component: GridTreeDataHierarchicalComponent },
  { path: 'swt', component: SwtCommonGridTestComponent },
  { path: '', redirectTo: '/basic', pathMatch: 'full' },
  { path: '**', redirectTo: '/basic', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class AppRoutingRoutingModule { }
