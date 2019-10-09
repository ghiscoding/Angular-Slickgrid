import { FieldType, FilterConditionOption } from '../../models/index';
import { numberFilterCondition } from '../numberFilterCondition';
import { executeMappedCondition } from '../executeMappedCondition';

describe('numberFilterCondition method', () => {
  it('should return False when no cell value is provided, neither search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '', fieldType: FieldType.number } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input cell value equals the default search term', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 0, fieldType: FieldType.string } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when any cell value is provided without any search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 'foo', fieldType: FieldType.number } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value True is provided as cell value', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '3', fieldType: FieldType.number, searchTerms: [3] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.number, searchTerms: [3] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms and is called by "executeMappedCondition" with fieldType.number', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.number, searchTerms: [3] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms and is called by "executeMappedCondition"  with fieldType.float', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.float, searchTerms: [3] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms and is called by "executeMappedCondition"  with fieldType.integer', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.integer, searchTerms: [3] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when the cell value is not equal to the first search term', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.number, searchTerms: ['1', '2', '3'] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when cell value is inversed to the searchTerm', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 2, fieldType: FieldType.number, searchTerms: [1] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when Operator is Not Equal because condition is always a strict equal check', () => {
    const options = { dataKey: '', operator: 'NE', cellValue: 2, fieldType: FieldType.number, searchTerms: [2] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when there are no search term and no operator', () => {
    const options = { dataKey: '', cellValue: 2, fieldType: FieldType.number, searchTerms: [0] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when there are a valid number search term but without operator', () => {
    const options = { dataKey: '', cellValue: 2, fieldType: FieldType.number, searchTerms: [1] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value is in the range of search terms using 2 dots (..) notation', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '3', fieldType: FieldType.number, searchTerms: ['1..5'] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when input value is not in the range of search terms using 2 dots (..) notation', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '15', fieldType: FieldType.number, searchTerms: ['1..5'] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value equals the search terms min inclusive value and operator is set to "rangeInclusive" using 2 dots (..) notation', () => {
    const options = { dataKey: '', operator: 'RangeInclusive', cellValue: '1', fieldType: FieldType.number, searchTerms: ['1..5'] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when input value equals the search terms min inclusive value and operator is set to "RangeExclusive" using 2 dots (..) notation', () => {
    const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '1', fieldType: FieldType.number, searchTerms: ['1..5'] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value is in the range of search terms array', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '3', fieldType: FieldType.number, searchTerms: [1, 5] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when input value is not in the range of search terms array', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '15', fieldType: FieldType.number, searchTerms: [1, 5] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value equals the search terms min (first array term) inclusive value and operator is set to "rangeInclusive"', () => {
    const options = { dataKey: '', operator: 'RangeInclusive', cellValue: '1', fieldType: FieldType.number, searchTerms: [1, 5] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when input value equals the search terms min (first array term) inclusive value and operator is set to "RangeExclusive"', () => {
    const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '1', fieldType: FieldType.number, searchTerms: [1, 5] } as FilterConditionOption;
    const output = numberFilterCondition(options);
    expect(output).toBe(false);
  });
});
