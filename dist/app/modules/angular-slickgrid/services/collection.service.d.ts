import { TranslateService } from '@ngx-translate/core';
import { CollectionFilterBy, CollectionSortBy } from './../models/index';
export declare class CollectionService {
    private translate;
    constructor(translate: TranslateService);
    /**
     * Filter items from a collection
     * @param collection
     * @param filterBy
     */
    filterCollection(collection: any[], filterBy: CollectionFilterBy): any[];
    /**
     * Sort items in a collection
     * @param collection
     * @param sortBy
     * @param enableTranslateLabel
     */
    sortCollection(collection: any[], sortBy: CollectionSortBy, enableTranslateLabel?: boolean): any[];
}
