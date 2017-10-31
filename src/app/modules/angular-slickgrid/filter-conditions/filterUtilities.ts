import { FieldType } from '../models/index';

export const testFilterCondition = (operator: string, value1: any, value2: any): boolean => {
  switch (operator) {
    case '<': return (value1 < value2);
    case '<=': return (value1 <= value2);
    case '>': return (value1 > value2);
    case '>=': return (value1 >= value2);
    case '!=':
    case '<>': return (value1 !== value2);
    case '=':
    case '==': return (value1 === value2);
  }
  return true;
};
