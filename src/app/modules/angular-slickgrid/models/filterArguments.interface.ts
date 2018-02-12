import { Column } from './column.interface';
import { TranslateService } from '@ngx-translate/core';
import { FilterCallback } from './filterCallback.interface';

export interface FilterArguments {
  grid: any;
  columnDef: Column;
  callback: FilterCallback;
  searchTerm?: string | number | boolean;
  searchTerms?: string[] | number[] | boolean[];
  i18n?: TranslateService;
  params?: any | any[];
}
