import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from './../services/collection.service';
import { SelectFilter } from './selectFilter';

export class SingleSelectFilter extends SelectFilter {
  /**
   * Initialize the Filter
   */
  constructor(protected readonly translate: TranslateService, protected readonly collectionService: CollectionService) {
    super(translate, collectionService, false);
  }
}
