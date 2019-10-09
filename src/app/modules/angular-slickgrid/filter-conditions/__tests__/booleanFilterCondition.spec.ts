import { FieldType, FilterConditionOption } from '../../models/index';
import { booleanFilterCondition } from '../booleanFilterCondition';
import { executeMappedCondition } from '../executeMappedCondition';

/** will return True in all cases with only 1 exception when the only searchTerm is inversed to the cell value */

describe('booleanFilterCondition method', () => {
  it('should return True when no cell value is provided, neither search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '', fieldType: FieldType.boolean } as FilterConditionOption;
    const output = booleanFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when any cell value is provided', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 'foo', fieldType: FieldType.boolean } as FilterConditionOption;
    const output = booleanFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when boolean value True is provided as cell value and called from the "executeMappedCondition"', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 'true', fieldType: FieldType.boolean, searchTerms: ['true'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when boolean value True is provided as cell value', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 'true', fieldType: FieldType.boolean, searchTerms: ['true'] } as FilterConditionOption;
    const output = booleanFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when boolean value provided is equal to the searchTerms even when it is a string type', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: true, fieldType: FieldType.boolean, searchTerms: ['true'] } as FilterConditionOption;
    const output = booleanFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when the cell value is equal to at least 1 of the searchTerms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: true, fieldType: FieldType.boolean, searchTerms: ['true', 'false'] } as FilterConditionOption;
    const output = booleanFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when cell value is inversed to the searchTerm', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: false, fieldType: FieldType.boolean, searchTerms: ['true'] } as FilterConditionOption;
    const output = booleanFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when Operator is Not Equal because condition is always a strict equal check', () => {
    const options = { dataKey: '', operator: 'NE', cellValue: false, fieldType: FieldType.boolean, searchTerms: ['true'] } as FilterConditionOption;
    const output = booleanFilterCondition(options);
    expect(output).toBe(false);
  });
});
