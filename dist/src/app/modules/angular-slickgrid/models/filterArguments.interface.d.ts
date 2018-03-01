import { TranslateService } from '@ngx-translate/core';
import { Column, FilterCallback, SearchTerm } from './../models/index';
export interface FilterArguments {
    grid: any;
    columnDef: Column;
    callback: FilterCallback;
    searchTerm?: SearchTerm;
    searchTerms?: SearchTerm[];
    i18n?: TranslateService;
    params?: any | any[];
}
