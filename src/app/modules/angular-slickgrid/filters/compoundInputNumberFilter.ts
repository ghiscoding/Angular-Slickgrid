import { TranslateService } from '@ngx-translate/core';
import { CompoundInputFilter } from './compoundInputFilter';

export class CompoundInputNumberFilter extends CompoundInputFilter {
  /** Initialize the Filter */
  constructor(protected translate: TranslateService) {
    super(translate);
    this.inputType = 'number';
  }
}
