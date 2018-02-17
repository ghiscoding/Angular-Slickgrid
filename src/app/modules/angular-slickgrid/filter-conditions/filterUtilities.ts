import { FieldType } from '../models';

export const testFilterCondition = (operator: string, value1: any, value2: any): boolean => {
  switch (operator) {
    case '<':
    case 'LT': return (value1 < value2);
    case '<=':
    case 'LE': return (value1 <= value2);
    case '>':
    case 'GT': return (value1 > value2);
    case '>=':
    case 'GE': return (value1 >= value2);
    case '!=':
    case '<>':
    case 'NE': return (value1 !== value2);
    case '=':
    case '==':
    case 'EQ': return (value1 === value2);
    case 'IN': return ((value2 && value2.includes) ? (value2.includes(value1)) : false);
  }
  return true;
};
