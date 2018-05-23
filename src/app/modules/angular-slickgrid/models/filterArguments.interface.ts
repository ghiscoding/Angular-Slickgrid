import { TranslateService } from '@ngx-translate/core';
import { Column, FilterCallback, OperatorString, OperatorType, SearchTerm } from './../models/index';

export interface FilterArguments {
  grid: any;
  columnDef: Column;
  callback: FilterCallback;
  operator?: OperatorType | OperatorString;
  searchTerms?: SearchTerm[];
  i18n?: TranslateService;
  params?: any | any[];
}
