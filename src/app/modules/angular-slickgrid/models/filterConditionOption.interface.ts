import { FieldType } from './fieldType';

export interface FilterConditionOption {
  operator: string;
  cellValue: any;
  fieldType: FieldType;
  listTerm?: string[] | number[];
  searchTerm?: string;
  filterSearchType?: FieldType;
  cellValueLastChar?: string;
}
