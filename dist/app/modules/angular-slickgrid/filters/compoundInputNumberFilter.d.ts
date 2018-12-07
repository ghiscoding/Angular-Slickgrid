import { TranslateService } from '@ngx-translate/core';
import { CompoundInputFilter } from './compoundInputFilter';
export declare class CompoundInputNumberFilter extends CompoundInputFilter {
    protected translate: TranslateService;
    /** Initialize the Filter */
    constructor(translate: TranslateService);
}
