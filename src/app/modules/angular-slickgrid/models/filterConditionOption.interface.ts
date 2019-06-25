import { FieldType } from './fieldType.enum';
import { OperatorString } from './operatorString';
import { OperatorType } from './operatorType.enum';

export interface FilterConditionOption {
  dataKey?: string;
  operator: OperatorString | OperatorType;
  cellValue: any;
  cellValueLastChar?: string;
  fieldType: FieldType;
  filterSearchType?: FieldType;
  searchTerms?: string[] | number[];
}
