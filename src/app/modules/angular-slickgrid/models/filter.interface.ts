import { TranslateService } from '@ngx-translate/core';
import { FilterCallback } from './filterCallback.interface';
import { Column } from './column.interface';
import { FilterArguments } from './filterArguments.interface';

// export type Filter = (searchTerms: string | number | string[] | number[], columnDef: Column, params?: any) => string;
export interface Filter {
  columnDef: Column;
  callback: FilterCallback;
  grid: any;
  searchTerm?: string | number;
  searchTerms?: string[] | number[];

  init: (args: FilterArguments) => void;
  clear: () => void;
  destroy: () => void;
}
