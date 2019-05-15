import { Column } from '../../models';
import { arrayObjectToCsvFormatter } from '../arrayObjectToCsvFormatter';

describe('the ArrayObjectToCsv Formatter', () => {
  const allRoles = [{ roleId: 0, name: 'Administrator' }, { roleId: 1, name: 'Regular User' }];

  const dataset = [
    { id: 0, firstName: 'John', lastName: 'Smith', email: 'john.smith@movie.com', roles: allRoles },
    { id: 1, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@movie.com', roles: [allRoles[1]] },
    { id: 2, firstName: 'Bob', lastName: 'Cane', email: 'bob.cane@movie.com', roles: [] },
  ];

  it('should throw an error when omitting to pass "propertyNames" to "params"', () => {
    expect(() => arrayObjectToCsvFormatter(0, 0, 'anything', {} as Column, {}))
      .toThrowError('Formatters.arrayObjectToCsv requires you to pass an array of "propertyNames"');
  });

  it('should return original input value when the "propertyNames" is not found in the given object', () => {
    const params = { propertyNames: ['name'] };
    const result = arrayObjectToCsvFormatter(0, 0, 'anything', { field: 'roles', params } as Column, {});
    expect(result).toBe('anything');
  });

  it('should return original input value when the "propertyNames" is found to be holding an empty array', () => {
    const params = { propertyNames: ['name'] };
    const result = arrayObjectToCsvFormatter(0, 0, 'anything', { field: 'roles', params } as Column, dataset[2]);
    expect(result).toBe('anything');
  });

  it('should return csv string in a span (with it\'s content and title attribute to be the same) when multiple input values are passed', () => {
    const params = { propertyNames: ['name'] };
    const expectedOutput = 'Administrator, Regular User';
    const result = arrayObjectToCsvFormatter(0, 0, 'anything', { field: 'roles', params } as Column, dataset[0]);
    expect(result).toBe(`<span title="${expectedOutput}">${expectedOutput}</span>`);
  });

  it('should return regular string in a span (with it\'s content and title attribute to be the same) when 1 input value is passed', () => {
    const params = { propertyNames: ['name'] };
    const expectedOutput = 'Regular User';
    const result = arrayObjectToCsvFormatter(0, 0, 'anything', { field: 'roles', params } as Column, dataset[1]);
    expect(result).toBe(`<span title="${expectedOutput}">${expectedOutput}</span>`);
  });

  it(`should return csv string in a span when multiple input values are passed
    and user provide a different "dataContextProperty" to pull the data from a different field of the dataContext object`, () => {
      const params = { dataContextProperty: 'roles', propertyNames: ['name'] };
      const expectedOutput = 'Administrator, Regular User';
      const result = arrayObjectToCsvFormatter(0, 0, 'anything', { field: 'email', params } as Column, dataset[0]);
      expect(result).toBe(`<span title="${expectedOutput}">${expectedOutput}</span>`);
    });
});
