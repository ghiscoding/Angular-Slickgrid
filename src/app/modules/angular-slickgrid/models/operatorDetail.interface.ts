import { OperatorString, OperatorType } from './index';

/** Operator with its Description */
export interface OperatorDetail {
  operator: OperatorString | OperatorType;
  description: string;
}
