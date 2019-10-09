import { Injectable, Optional } from '@angular/core';
import { Filter } from '../models/filter.interface';
import { ColumnFilter } from '../models';
import { SlickgridConfig } from '../slickgrid-config';
import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from '../services/collection.service';

@Injectable()
export class FilterFactory {
  /**
   * The options from the SlickgridConfig
   */
  private _options: any;

  constructor(private config: SlickgridConfig, @Optional() private translate: TranslateService, private collectionService: CollectionService) {
    this._options = this.config.options;
  }

  // Uses the User model to create a new User
  createFilter(columnFilter: ColumnFilter | undefined): Filter | undefined {
    let filter: Filter | undefined;

    if (columnFilter && columnFilter.model) {
      filter = typeof columnFilter.model === 'function' ? new columnFilter.model(this.translate, this.collectionService) : columnFilter.model;
    }

    // fallback to the default filter
    if (!filter && this._options.defaultFilter) {
      filter = new this._options.defaultFilter(this.translate, this.collectionService);
    }

    return filter;
  }
}
