import { OperatorType } from './operatorType.enum';
import { OperatorString } from './operatorString';

export interface GraphqlFilteringOption {
  field: string;
  operator: OperatorType | OperatorString;
  value: any | any[];
}
