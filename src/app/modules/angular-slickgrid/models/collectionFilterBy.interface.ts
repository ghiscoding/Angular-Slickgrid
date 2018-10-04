import { OperatorType } from './operatorType.enum';

export interface CollectionFilterBy {
  property: string;
  value: any;
  operator?: OperatorType.equal | OperatorType.notEqual | OperatorType.contains | OperatorType.notContains;
}
