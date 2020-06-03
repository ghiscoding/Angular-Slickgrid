import { TranslateService } from '@ngx-translate/core';
import { Column, FilterCallback, OperatorString, OperatorType, SearchTerm, SlickGrid } from './../models/index';

export interface FilterArguments {
  columnDef: Column;
  callback: FilterCallback;
  grid: SlickGrid;
  operator?: OperatorType | OperatorString;
  searchTerms?: SearchTerm[];
  i18n?: TranslateService;
  params?: any | any[];
}
