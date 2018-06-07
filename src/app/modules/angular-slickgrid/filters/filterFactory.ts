import { Injector, Injectable } from '@angular/core';
import { CompoundDateFilter } from '../filters/compoundDateFilter';
import { Filter } from '../models/filter.interface';

@Injectable()
export class FilterFactory {
  constructor(private injector: Injector) {  }

  // Uses the User model to create a new User
  create(filterType: string) {
    let filter: Filter;

    switch (filterType) {
      case 'date':
        filter = this.injector.get(CompoundDateFilter);
        break;
    }
    return filter;
  }

}
