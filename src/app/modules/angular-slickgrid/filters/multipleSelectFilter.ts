import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from './../services/collection.service';
import { SelectFilter } from './selectFilter';

export class MultipleSelectFilter extends SelectFilter {
  /**
   * Initialize the Filter
   */
  constructor(protected translate: TranslateService, protected collectionService: CollectionService) {
    super(translate, collectionService, true);
  }
}
