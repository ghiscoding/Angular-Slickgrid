import { Injector, Injectable } from '@angular/core';
import { Filter } from '../models/filter.interface';
import { ColumnFilter } from '../models';
import { SlickgridConfig } from '../slickgrid-config';
import { TranslateService } from '@ngx-translate/core';
import { Filters } from '.';
import { CollectionService } from '../services/collection.service';

@Injectable()
export class FilterFactory {
  /**
   * The options from the SlickgridConfig
   */
  private _options: any;

  constructor(private injector: Injector, private config: SlickgridConfig, private translate: TranslateService, private collectionService: CollectionService) {
    this._options = this.config.options;
  }

  // Uses the User model to create a new User
  createFilter(columnFilter: ColumnFilter | undefined): Filter | undefined {
    let filter: Filter | undefined;

    if (columnFilter && columnFilter.model) {
      // the model either needs to be retrieved or is already instantiated
      // filter = typeof columnFilter.model === 'function' ? this.injector.get(columnFilter.model) : columnFilter.model;
      const filterInstance = columnFilter.model;
      const filterName = typeof columnFilter.model === 'function' ? filterInstance.name : '';
/*
      if (filterName) {
        switch (filterName) {
          case 'InputFilter':
            filter = new Filters.input();
            break;
          case 'SelectFilter':
            filter = new Filters.select(this.translate);
            break;
          case 'MultipleSelectFilter':
            filter = new Filters.multipleSelect(this.translate, this.collectionService);
            break;
          case 'SingleSelectFilter':
            filter = new Filters.singleSelect(this.translate, this.collectionService);
            break;
          case 'CompoundDateFilter':
            filter = new Filters.compoundDate(this.translate);
            break;
          case 'CompoundInputFilter':
            filter = new Filters.compoundInput(this.translate);
            break;
          default:
            break;
        }
      } else {
        filter = columnFilter.model;
      }*/
      // filter = typeof columnFilter.model === 'function' ? this.injector.get(this.translate, this.collectionService) : columnFilter.model;
      filter = typeof columnFilter.model === 'function' ? new columnFilter.model(this.translate, this.collectionService) : columnFilter.model;
    }

    // fallback to the default filter
    if (!filter && this._options.defaultFilter) {
      // filter = this.injector.get(this._options.defaultFilter);
      filter = new this._options.defaultFilter(this.translate, this.collectionService);
    }

    return filter;
  }

  private createInjector(service: any) {
    const injector = Injector.create([{provide: service, deps: [TranslateService]}]);
    // let injector = ReflectiveInjector.resolveAndCreate([service]);
    // injector = injector.resolveAndCreateChild([service]);
    return injector.get(service);
  }
}
