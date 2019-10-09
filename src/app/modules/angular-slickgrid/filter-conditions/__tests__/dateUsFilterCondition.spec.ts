import { FilterConditionOption, FieldType } from '../../models/index';
import { executeMappedCondition } from '../executeMappedCondition';

describe('dateUsFilterCondition method', () => {
  it('should return False when no cell value is provided, neither search terms', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateUs, cellValue: '' } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when any cell value is provided without any search terms', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateUs, cellValue: '12/25/2000' } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when search term is not a valid date', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateUs, cellValue: '12/25/2000', searchTerms: ['25/14/2000'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value provided is equal to the searchTerms', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateUs, cellValue: '12/25/1993', searchTerms: ['12/25/1993'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms and is called by "executeMappedCondition"', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateUs, cellValue: '12/25/1993', searchTerms: ['12/25/1993'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when cell value is not the same value as the searchTerm', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateUs, cellValue: '12/25/1993', searchTerms: ['03/03/2003'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when the cell value is found in the searchTerms since it only compares first term', () => {
    const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateUs, cellValue: '12/25/1993', searchTerms: ['03/14/2003', '12/25/1993'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when Operator is Not Equal and cell value equals the search term', () => {
    const options = { dataKey: '', operator: 'NE', fieldType: FieldType.dateUs, cellValue: '12/25/1993', searchTerms: ['12/25/1993'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return True even when Operator is Not Equal and cell value is different than the search term', () => {
    const options = { dataKey: '', operator: 'NE', fieldType: FieldType.dateUs, cellValue: '12/25/1993', searchTerms: ['12/25/2002'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when there are no search term and no operator', () => {
    const options = { dataKey: '', fieldType: FieldType.dateUs, cellValue: '12/25/1993', searchTerms: [null] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when search and cell values are different and there are no operator passed, it will use default EQ operator', () => {
    const options = { dataKey: '', fieldType: FieldType.dateUs, cellValue: '12/25/1993', searchTerms: ['12/27/1993'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value is in the range of search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '12/25/1993', fieldType: FieldType.dateUs, searchTerms: ['12/01/1993..12/31/1993'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when input value is not in the range of search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '11/25/1993', fieldType: FieldType.dateUs, searchTerms: ['12/01/1993..12/31/1993'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value equals the search terms min inclusive value and operator is set to "rangeInclusive"', () => {
    const options = { dataKey: '', operator: 'RangeInclusive', cellValue: '12/01/1993', fieldType: FieldType.dateUs, searchTerms: ['12/01/1993..12/31/1993'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when input value equals the search terms min inclusive value and operator is set to "RangeExclusive"', () => {
    const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '12/01/1993', fieldType: FieldType.dateUs, searchTerms: ['12/01/1993..12/31/1993'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when any of the 2 search term value is not a valid date', () => {
    const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '12/05/1993', fieldType: FieldType.dateUs, searchTerms: ['12/01/1993..12/60/1993'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(false);
  });
});
