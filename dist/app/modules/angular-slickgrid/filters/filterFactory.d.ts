import { Injector } from '@angular/core';
import { Filter } from '../models/filter.interface';
import { ColumnFilter } from '../models';
import { SlickgridConfig } from '../slickgrid-config';
import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from '../services/collection.service';
export declare class FilterFactory {
    private injector;
    private config;
    private translate;
    private collectionService;
    /**
     * The options from the SlickgridConfig
     */
    private _options;
    constructor(injector: Injector, config: SlickgridConfig, translate: TranslateService, collectionService: CollectionService);
    createFilter(columnFilter: ColumnFilter | undefined): Filter | undefined;
    private createInjector(service);
}
