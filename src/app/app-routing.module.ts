import { HomeComponent } from './examples/home.component';
import { GridAddItemComponent } from './examples/grid-additem.component';
import { GridAngularComponent } from './examples/grid-angular.component';
import { GridAutoHeightComponent } from './examples/grid-autoheight.component';
import { GridBasicComponent } from './examples/grid-basic.component';
import { GridBaseRowEditingComponent } from './examples/grid-base-row-editing.component';
import { GridClientSideComponent } from './examples/grid-clientside.component';
import { GridColspanComponent } from './examples/grid-colspan.component';
import { GridCompositeEditorComponent } from './examples/grid-composite-editor.component';
import { GridContextMenuComponent } from './examples/grid-contextmenu.component';
import { GridCustomPaginationComponent } from './examples/grid-custom-pagination.component';
import { GridCustomTooltipComponent } from './examples/grid-custom-tooltip.component';
import { GridDraggableGroupingComponent } from './examples/grid-draggrouping.component';
import { GridDragRecycleComponent } from './examples/grid-drag-recycle.component';
import { GridEditorComponent } from './examples/grid-editor.component';
import { GridFooterTotalsComponent } from './examples/grid-footer-totals.component';
import { GridExcelFormulaComponent } from './examples/grid-excel-formula.component';
import { GridFormatterComponent } from './examples/grid-formatter.component';
import { GridFrozenComponent } from './examples/grid-frozen.component';
import { GridGraphqlComponent } from './examples/grid-graphql.component';
import { GridGraphqlWithoutPaginationComponent } from './examples/grid-graphql-nopage.component';
import { GridGroupingComponent } from './examples/grid-grouping.component';
import { GridInfiniteGraphqlComponent } from './examples/grid-infinite-graphql.component';
import { GridInfiniteJsonComponent } from './examples/grid-infinite-json.component';
import { GridInfiniteOdataComponent } from './examples/grid-infinite-odata.component';
import { GridHeaderButtonComponent } from './examples/grid-headerbutton.component';
import { GridHeaderFooterComponent } from './examples/grid-header-footer.component';
import { GridHeaderMenuComponent } from './examples/grid-headermenu.component';
import { GridLocalizationComponent } from './examples/grid-localization.component';
import { GridMenuComponent } from './examples/grid-menu.component';
import { GridOdataComponent } from './examples/grid-odata.component';
import { GridRangeComponent } from './examples/grid-range.component';
import { GridRemoteComponent } from './examples/grid-remote.component';
import { GridResizeByContentComponent } from './examples/grid-resize-by-content.component';
import { GridRowDetailComponent } from './examples/grid-rowdetail.component';
import { GridRowMoveComponent } from './examples/grid-rowmove.component';
import { GridRowSelectionComponent } from './examples/grid-rowselection.component';
import { GridStateComponent } from './examples/grid-state.component';
import { GridTabsComponent } from './examples/grid-tabs.component';
import { GridTradingComponent } from './examples/grid-trading.component';
import { GridTreeDataHierarchicalComponent } from './examples/grid-tree-data-hierarchical.component';
import { GridTreeDataParentChildComponent } from './examples/grid-tree-data-parent-child.component';
import { Grid43Component } from './examples/grid43.component';
import { SwtCommonGridTestComponent } from './examples/swt-common-grid-test.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'angular-components', component: GridAngularComponent },
  { path: 'additem', component: GridAddItemComponent },
  { path: 'base-row-editing', component: GridBaseRowEditingComponent },
  { path: 'autoheight', component: GridAutoHeightComponent },
  { path: 'basic', component: GridBasicComponent },
  { path: 'colspan', component: GridColspanComponent },
  { path: 'composite-editor', component: GridCompositeEditorComponent },
  { path: 'context', component: GridContextMenuComponent },
  { path: 'custom-pagination', component: GridCustomPaginationComponent },
  { path: 'custom-tooltip', component: GridCustomTooltipComponent },
  { path: 'csv-grid', component: Grid43Component },
  { path: 'drag-recycle', component: GridDragRecycleComponent },
  { path: 'editor', component: GridEditorComponent },
  { path: 'excel-formula', component: GridExcelFormulaComponent },
  { path: 'footer-totals', component: GridFooterTotalsComponent },
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
  { path: 'header-footer', component: GridHeaderFooterComponent },
  { path: 'infinite-graphql', component: GridInfiniteGraphqlComponent },
  { path: 'infinite-json', component: GridInfiniteJsonComponent },
  { path: 'infinite-odata', component: GridInfiniteOdataComponent },
  { path: 'localization', component: GridLocalizationComponent },
  { path: 'clientside', component: GridClientSideComponent },
  { path: 'odata', component: GridOdataComponent },
  { path: 'range', component: GridRangeComponent },
  { path: 'remote', component: GridRemoteComponent },
  { path: 'resize-by-content', component: GridResizeByContentComponent },
  { path: 'rowdetail', component: GridRowDetailComponent },
  { path: 'rowmove', component: GridRowMoveComponent },
  { path: 'selection', component: GridRowSelectionComponent },
  { path: 'trading', component: GridTradingComponent },
  { path: 'tree-data-parent-child', component: GridTreeDataParentChildComponent },
  { path: 'tree-data-hierarchical', component: GridTreeDataHierarchicalComponent },
  { path: 'swt', component: SwtCommonGridTestComponent },
  { path: '', redirectTo: '/trading', pathMatch: 'full' },
  { path: '**', redirectTo: '/trading', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class AppRoutingRoutingModule { }
