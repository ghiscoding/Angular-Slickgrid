import { FieldType } from './fieldType.enum';
import { OperatorString } from './operatorString';

export interface FilterConditionOption {
  dataKey?: string;
  operator: OperatorString;
  cellValue: any;
  cellValueLastChar?: string;
  fieldType: FieldType;
  filterSearchType?: FieldType;
  searchTerms?: string[] | number[];
}
