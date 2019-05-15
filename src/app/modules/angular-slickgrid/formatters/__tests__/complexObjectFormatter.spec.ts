import { Column } from '../../models';
import { complexObjectFormatter } from '../complexObjectFormatter';

describe('the ComplexObject Formatter', () => {
  const allRoles = [{ roleId: 0, name: 'Administrator' }, { roleId: 1, name: 'Regular User' }];

  const dataset = [
    { id: 0, firstName: 'John', lastName: 'Smith', email: 'john.smith@movie.com', role: allRoles[0] },
    { id: 1, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@movie.com', role: allRoles[1] },
    { id: 2, firstName: 'Bob', lastName: 'Cane', email: 'bob.cane@movie.com', role: null },
  ];

  it('should throw an error when omitting to pass "complexFieldLabel" to "params"', () => {
    expect(() => complexObjectFormatter(0, 0, 'anything', {} as Column, {}))
      .toThrowError('For the Formatters.complexObject to work properly');
  });

  it('should return empty string when no column definition is provided', () => {
    const result = complexObjectFormatter(0, 0, 'anything', null as Column, {});
    expect(result).toBe('');
  });

  it('should return original input value when the "field" property does not include a not ".", neither "complexFieldLabel"', () => {
    const result = complexObjectFormatter(0, 0, 'anything', { field: 'role' } as Column, {});
    expect(result).toBe('anything');
  });

  it('should return original input value when the "field" property was not found in the data context object', () => {
    const result = complexObjectFormatter(0, 0, 'anything', { field: 'invalid.object' } as Column, dataset[2]);
    expect(result).toBe('anything');
  });

  it('should return original input value when the "complexFieldLabel" does not include a not "." within its string', () => {
    const params = { complexFieldLabel: 'name' };
    const result = complexObjectFormatter(0, 0, 'anything', { field: 'role', params } as Column, {});
    expect(result).toBe('anything');
  });

  it('should return original input value when the "complexFieldLabel" was not found in the data context object', () => {
    const params = { complexFieldLabel: 'invalid.object' };
    const result = complexObjectFormatter(0, 0, 'anything', { field: 'role', params } as Column, dataset[2]);
    expect(result).toBe('anything');
  });

  it('should return the value from the complex object when "field" property with dot notation was found in the data context object', () => {
    const expectedOutput = 'Administrator';
    const result = complexObjectFormatter(0, 0, 'anything', { field: 'role.name' } as Column, dataset[0]);
    expect(result).toBe(expectedOutput);
  });

  it('should return the value from the complex object when "complexFieldLabel" property with dot notation was found in the data context object', () => {
    const params = { complexFieldLabel: 'role.name' };
    const expectedOutput = 'Administrator';
    const result = complexObjectFormatter(0, 0, 'anything', { field: 'role', params } as Column, dataset[0]);
    expect(result).toBe(expectedOutput);
  });

  it('should return the value from the complex object when "complexFieldLabel" is not dot notation but has a "labelKey" was found in the data context object', () => {
    const params = { complexFieldLabel: 'role' };
    const expectedOutput = 'Administrator';
    const result = complexObjectFormatter(0, 0, 'anything', { field: 'role', labelKey: 'name', params } as Column, dataset[0]);
    expect(result).toBe(expectedOutput);
  });
});
