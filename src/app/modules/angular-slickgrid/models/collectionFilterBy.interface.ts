import { OperatorType } from './operatorType.enum';

export interface CollectionFilterBy {
  /** Object Property name when the collection is an array of objects */
  property?: string;

  /** Value to filter from the collection */
  value: any;

  /** Operator to use when filtering the value from the collection, we can only use  */
  operator?: OperatorType.equal | OperatorType.notEqual | OperatorType.contains | OperatorType.notContains | 'EQ' | 'NE' | 'Contains' | 'NOT_CONTAINS' | 'Not_Contains';
}
