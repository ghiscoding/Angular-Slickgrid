import { OperatorType } from './operatorType.enum';
export interface GraphqlFilteringOption {
  field: string;
  operator: OperatorType;
  value: any | any[];
}
