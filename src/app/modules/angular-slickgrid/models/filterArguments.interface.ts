import { Column } from './column.interface';
import { TranslateService } from '@ngx-translate/core';
import { FilterCallback } from './filterCallback.interface';

// export type Filter = (searchTerms: string | number | string[] | number[], columnDef: Column, params?: any) => string;
export interface FilterArguments {
  grid: any;
  columnDef: Column;
  callback: FilterCallback;
  searchTerm?: string | number;
  searchTerms?: string[] | number[];
  i18n?: TranslateService;
  params?: any | any[];
}
