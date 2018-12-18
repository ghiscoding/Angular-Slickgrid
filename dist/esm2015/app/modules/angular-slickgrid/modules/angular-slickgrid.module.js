/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSlickgridComponent } from './../components/angular-slickgrid.component';
import { CollectionService } from './../services/collection.service';
import { FilterFactory } from '../filters/filterFactory';
import { GraphqlService } from './../services/graphql.service';
import { GridOdataService } from './../services/grid-odata.service';
import { SlickPaginationComponent } from './../components/slick-pagination.component';
export class AngularSlickgridModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: AngularSlickgridModule,
            providers: [
                { provide: 'config', useValue: config },
                CollectionService,
                FilterFactory,
                GraphqlService,
                GridOdataService
            ]
        };
    }
}
AngularSlickgridModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlja2dyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFcEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFrQnRGLE1BQU0sT0FBTyxzQkFBc0I7Ozs7O0lBQ2pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBcUIsRUFBRTtRQUNwQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQ3ZDLGlCQUFpQjtnQkFDakIsYUFBYTtnQkFDYixjQUFjO2dCQUNkLGdCQUFnQjthQUNqQjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUEzQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGVBQWU7aUJBQ2hCO2dCQUNELFlBQVksRUFBRTtvQkFDWix5QkFBeUI7b0JBQ3pCLHdCQUF3QjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHlCQUF5QjtvQkFDekIsd0JBQXdCO2lCQUN6QjtnQkFDRCxlQUFlLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQzthQUM3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBBbmd1bGFyU2xpY2tncmlkQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9jb21wb25lbnRzL2FuZ3VsYXItc2xpY2tncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJGYWN0b3J5IH0gZnJvbSAnLi4vZmlsdGVycy9maWx0ZXJGYWN0b3J5JztcclxuaW1wb3J0IHsgR3JhcGhxbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyYXBocWwuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRPZGF0YVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyaWQtb2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRPcHRpb24gfSBmcm9tICcuLy4uL21vZGVscy9ncmlkT3B0aW9uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFNsaWNrUGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vLi4vY29tcG9uZW50cy9zbGljay1wYWdpbmF0aW9uLmNvbXBvbmVudCc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudCxcclxuICAgIFNsaWNrUGFnaW5hdGlvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudCxcclxuICAgIFNsaWNrUGFnaW5hdGlvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJTbGlja2dyaWRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogR3JpZE9wdGlvbiA9IHt9KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogQW5ndWxhclNsaWNrZ3JpZE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZyB9LFxyXG4gICAgICAgIENvbGxlY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIEZpbHRlckZhY3RvcnksXHJcbiAgICAgICAgR3JhcGhxbFNlcnZpY2UsXHJcbiAgICAgICAgR3JpZE9kYXRhU2VydmljZVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=