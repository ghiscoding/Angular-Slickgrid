import { FieldType, FilterConditionOption } from '../../models/index';
import { executeBooleanFilterCondition, getFilterParsedBoolean } from '../booleanFilterCondition';
import { executeFilterConditionTest } from '../filterConditionProcesses';

/** will return True in all cases with only 1 exception when the only searchTerm is inversed to the cell value */

describe('executeBooleanFilterCondition method', () => {
  it('should return True when no cell value is provided, neither search terms', () => {
    const searchTerms = undefined;
    const options = { dataKey: '', operator: 'EQ', cellValue: '', fieldType: FieldType.boolean } as FilterConditionOption;
    const output = executeBooleanFilterCondition(options, getFilterParsedBoolean(searchTerms));
    expect(output).toBe(true);
  });

  it('should return True when any cell value is provided', () => {
    const searchTerms = undefined;
    const options = { dataKey: '', operator: 'EQ', cellValue: 'foo', fieldType: FieldType.boolean } as FilterConditionOption;
    const output = executeBooleanFilterCondition(options, getFilterParsedBoolean(searchTerms));
    expect(output).toBe(true);
  });

  it('should return True when boolean value True is provided as cell value and called from the "executeFilterConditionTest"', () => {
    const searchTerms = ['true'];
    const options = { dataKey: '', operator: 'EQ', cellValue: 'true', fieldType: FieldType.boolean, searchTerms } as FilterConditionOption;
    const output = executeFilterConditionTest(options, getFilterParsedBoolean(searchTerms));
    expect(output).toBe(true);
  });

  it('should return True when boolean value True is provided as cell value', () => {
    const searchTerms = ['true'];
    const options = { dataKey: '', operator: 'EQ', cellValue: 'true', fieldType: FieldType.boolean, searchTerms } as FilterConditionOption;
    const output = executeBooleanFilterCondition(options, getFilterParsedBoolean(searchTerms));
    expect(output).toBe(true);
  });

  it('should return True when boolean value provided is equal to the searchTerms even when it is a string type', () => {
    const searchTerms = ['true'];
    const options = { dataKey: '', operator: 'EQ', cellValue: true, fieldType: FieldType.boolean, searchTerms } as FilterConditionOption;
    const output = executeBooleanFilterCondition(options, getFilterParsedBoolean(searchTerms));
    expect(output).toBe(true);
  });

  it('should return True when the cell value is equal to at least 1 of the searchTerms', () => {
    const searchTerms = ['true', 'false'];
    const options = { dataKey: '', operator: 'EQ', cellValue: true, fieldType: FieldType.boolean, searchTerms } as FilterConditionOption;
    const output = executeBooleanFilterCondition(options, getFilterParsedBoolean(searchTerms));
    expect(output).toBe(true);
  });

  it('should return False when cell value is inversed to the searchTerm', () => {
    const searchTerms = ['true'];
    const options = { dataKey: '', operator: 'EQ', cellValue: false, fieldType: FieldType.boolean, searchTerms } as FilterConditionOption;
    const output = executeBooleanFilterCondition(options, getFilterParsedBoolean(searchTerms));
    expect(output).toBe(false);
  });

  it('should return False even when Operator is Not Equal because condition is always a strict equal check', () => {
    const searchTerms = ['true'];
    const options = { dataKey: '', operator: 'NE', cellValue: false, fieldType: FieldType.boolean, searchTerms } as FilterConditionOption;
    const output = executeBooleanFilterCondition(options, getFilterParsedBoolean(searchTerms));
    expect(output).toBe(false);
  });
});
