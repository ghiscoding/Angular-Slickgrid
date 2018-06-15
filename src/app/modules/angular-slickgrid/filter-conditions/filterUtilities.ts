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
    case 'NIN':
    case 'NOT_IN':
      return ((value2 && value2.includes) ? (!value2.includes(value1)) : false);
    case 'IN_CONTAINS':
      if (value2 && Array.isArray(value2) && value2.findIndex) {
        return ((value2.findIndex((val) => value1.indexOf(val) > -1)) > -1);
      }
      return false;
    case 'NIN_CONTAINS':
    case 'NOT_IN_CONTAINS':
    if (value2 && Array.isArray(value2) && value2.findIndex) {
      return !((value2.findIndex((val) => value1.indexOf(val) > -1)) > -1);
    }
    return false;
}
return true;
};
