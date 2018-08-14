import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from './../services/collection.service';
import { SelectFilter } from './selectFilter';
export declare class SingleSelectFilter extends SelectFilter {
    protected translate: TranslateService;
    protected collectionService: CollectionService;
    /**
     * Initialize the Filter
     */
    constructor(translate: TranslateService, collectionService: CollectionService);
}
