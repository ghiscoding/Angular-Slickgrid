import { OperatorType } from './operatorType';
export interface GraphqlFilteringOption {
  field: string;
  operator: OperatorType;
  value: any | any[];
}
