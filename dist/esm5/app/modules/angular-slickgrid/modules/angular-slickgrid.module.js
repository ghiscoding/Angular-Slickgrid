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
var AngularSlickgridModule = /** @class */ (function () {
    function AngularSlickgridModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    AngularSlickgridModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
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
    };
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
    return AngularSlickgridModule;
}());
export { AngularSlickgridModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlja2dyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFcEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFHdEY7SUFBQTtJQTRCQSxDQUFDOzs7OztJQVpRLDhCQUFPOzs7O0lBQWQsVUFBZSxNQUF1QjtRQUF2Qix1QkFBQSxFQUFBLFdBQXVCO1FBQ3BDLE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDdkMsaUJBQWlCO2dCQUNqQixhQUFhO2dCQUNiLGNBQWM7Z0JBQ2QsZ0JBQWdCO2FBQ2pCO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQTNCRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTtxQkFDaEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHlCQUF5Qjt3QkFDekIsd0JBQXdCO3FCQUN6QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AseUJBQXlCO3dCQUN6Qix3QkFBd0I7cUJBQ3pCO29CQUNELGVBQWUsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUM3Qzs7SUFjRCw2QkFBQztDQUFBLEFBNUJELElBNEJDO1NBYlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IEFuZ3VsYXJTbGlja2dyaWRDb21wb25lbnQgfSBmcm9tICcuLy4uL2NvbXBvbmVudHMvYW5ndWxhci1zbGlja2dyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2NvbGxlY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEZpbHRlckZhY3RvcnkgfSBmcm9tICcuLi9maWx0ZXJzL2ZpbHRlckZhY3RvcnknO1xyXG5pbXBvcnQgeyBHcmFwaHFsU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZ3JhcGhxbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JpZE9kYXRhU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZ3JpZC1vZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JpZE9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2dyaWRPcHRpb24uaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgU2xpY2tQYWdpbmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9jb21wb25lbnRzL3NsaWNrLXBhZ2luYXRpb24uY29tcG9uZW50JztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFRyYW5zbGF0ZU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBBbmd1bGFyU2xpY2tncmlkQ29tcG9uZW50LFxyXG4gICAgU2xpY2tQYWdpbmF0aW9uQ29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBBbmd1bGFyU2xpY2tncmlkQ29tcG9uZW50LFxyXG4gICAgU2xpY2tQYWdpbmF0aW9uQ29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtBbmd1bGFyU2xpY2tncmlkQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhclNsaWNrZ3JpZE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBHcmlkT3B0aW9uID0ge30pIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBBbmd1bGFyU2xpY2tncmlkTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7IHByb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogY29uZmlnIH0sXHJcbiAgICAgICAgQ29sbGVjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgRmlsdGVyRmFjdG9yeSxcclxuICAgICAgICBHcmFwaHFsU2VydmljZSxcclxuICAgICAgICBHcmlkT2RhdGFTZXJ2aWNlXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==