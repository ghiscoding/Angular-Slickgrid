import { FieldType } from './fieldType';

export interface FilterConditionOption {
  operator: string;
  cellValue: any;
  fieldType: FieldType;
  searchTerm?: string | number;
  searchTerms?: string[] | number[];
  filterSearchType?: FieldType;
  cellValueLastChar?: string;
}
