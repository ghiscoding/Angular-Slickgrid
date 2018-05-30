import { FieldType } from './fieldType.enum';

export interface FilterConditionOption {
  operator: string;
  cellValue: any;
  cellValueLastChar?: string;
  fieldType: FieldType;
  filterSearchType?: FieldType;
  searchTerms?: string[] | number[];
}
