import { FieldType, FilterConditionOption } from '../../models/index';
import { executeFilterConditionTest } from '../filterConditionProcesses';
import { executeNumberFilterCondition, getFilterParsedNumbers } from '../numberFilterCondition';

describe('executeNumberFilterCondition method', () => {
  it('should return False when no cell value is provided, neither search terms', () => {
    const searchTerms = undefined;
    const options = { dataKey: '', operator: 'EQ', cellValue: '', fieldType: FieldType.number } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });

  it('should return True when input cell value equals the default search term', () => {
    const searchTerms = undefined;
    const options = { dataKey: '', operator: 'EQ', cellValue: 0, fieldType: FieldType.number } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return True when first searchTerm is undefined provided neither an operator when executing "executeFilterConditionTest" method', () => {
    const searchTerms = [undefined];
    const options = { dataKey: '', cellValue: 0, fieldType: FieldType.number } as FilterConditionOption;
    const output = executeFilterConditionTest(options, searchTerms);
    expect(output).toBe(true);
  });

  it('should return False when any cell value is provided without any search terms', () => {
    const searchTerms = [];
    const options = { dataKey: '', operator: 'EQ', cellValue: 'foo', fieldType: FieldType.number } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });

  it('should return True when input value True is provided as cell value', () => {
    const searchTerms = [3];
    const options = { dataKey: '', operator: 'EQ', cellValue: '3', fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms', () => {
    const searchTerms = [3];
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms and is called by "executeFilterConditionTest" with fieldType.number', () => {
    const searchTerms = [3];
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeFilterConditionTest(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms and is called by "executeFilterConditionTest"  with fieldType.float', () => {
    const searchTerms = [3];
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.float, searchTerms } as FilterConditionOption;
    const output = executeFilterConditionTest(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms and is called by "executeFilterConditionTest"  with fieldType.integer', () => {
    const searchTerms = [3];
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.integer, searchTerms } as FilterConditionOption;
    const output = executeFilterConditionTest(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return False when the cell value is not equal to the first search term', () => {
    const searchTerms = ['1', '2', '3'];
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });

  it('should return False when cell value is inversed to the searchTerm', () => {
    const searchTerms = [1];
    const options = { dataKey: '', operator: 'EQ', cellValue: 2, fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });

  it('should return False even when Operator is Not Equal because condition is always a strict equal check', () => {
    const searchTerms = [2];
    const options = { dataKey: '', operator: 'NE', cellValue: 2, fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });

  it('should return False when there are no operator and the searchTerm is not equal to cell value', () => {
    const searchTerms = [0];
    const options = { dataKey: '', cellValue: 2, fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });

  it('should return True when there are no search term and no operator and the cell value is 0 which equals the default search term', () => {
    const searchTerms = undefined;
    const options = { dataKey: '', cellValue: 0, fieldType: FieldType.number } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return False when there are a valid number search term but without operator', () => {
    const searchTerms = [1];
    const options = { dataKey: '', cellValue: 2, fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });

  it('should return True when input value is in the range of search terms using 2 dots (..) notation', () => {
    const searchTerms = ['1..5'];
    const options = { dataKey: '', operator: 'EQ', cellValue: '3', fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return False when input value is not in the range of search terms using 2 dots (..) notation', () => {
    const searchTerms = ['1..5'];
    const options = { dataKey: '', operator: 'EQ', cellValue: '15', fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });

  it('should return True when input value equals the search terms min inclusive value and operator is set to "rangeInclusive" using 2 dots (..) notation', () => {
    const searchTerms = ['1..5'];
    const options = { dataKey: '', operator: 'RangeInclusive', cellValue: '1', fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return False when input value equals the search terms min inclusive value and operator is set to "RangeExclusive" using 2 dots (..) notation', () => {
    const searchTerms = ['1..5'];
    const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '1', fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });

  it('should return True when input value is in the range of search terms array', () => {
    const searchTerms = [1, 5];
    const options = { dataKey: '', operator: 'EQ', cellValue: '3', fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return False when input value is not in the range of search terms array', () => {
    const searchTerms = [1, 5];
    const options = { dataKey: '', operator: 'EQ', cellValue: '15', fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });

  it('should return True when input value equals the search terms min (first array term) inclusive value and operator is set to "rangeInclusive"', () => {
    const searchTerms = [1, 5];
    const options = { dataKey: '', operator: 'RangeInclusive', cellValue: '1', fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(true);
  });

  it('should return False when input value equals the search terms min (first array term) inclusive value and operator is set to "RangeExclusive"', () => {
    const searchTerms = [1, 5];
    const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '1', fieldType: FieldType.number, searchTerms } as FilterConditionOption;
    const output = executeNumberFilterCondition(options, getFilterParsedNumbers(searchTerms));
    expect(output).toBe(false);
  });
});
