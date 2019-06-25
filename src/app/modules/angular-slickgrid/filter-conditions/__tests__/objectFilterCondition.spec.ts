import { FieldType, FilterConditionOption, OperatorType } from '../../models/index';
import { objectFilterCondition } from '../objectFilterCondition';
import { executeMappedCondition } from '../executeMappedCondition';

describe('objectFilterCondition method', () => {
  let mockRow;

  beforeEach(() => {
    mockRow = { name: 'Canada', code: 'CA' };
  });

  it('should return True when there are no input value neither search terms', () => {
    const options = { dataKey: '', cellValue: '', fieldType: FieldType.object } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when no cell input value is provided which is equal to the default search term, neither search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '', fieldType: FieldType.object } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when cell input value is null and is equal to the default search term, neither search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: null, fieldType: FieldType.object } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when any cell input value is provided without any search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: mockRow, fieldType: FieldType.object } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value provided is equal, using "=" to the searchTerms', () => {
    const options = { dataKey: '', operator: '=', cellValue: mockRow, fieldType: FieldType.object, searchTerms: [mockRow] } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal, using "==" to the searchTerms', () => {
    const options = { dataKey: '', operator: '==', cellValue: mockRow, fieldType: FieldType.object, searchTerms: [mockRow] } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal, using "EQ" to the searchTerms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: mockRow, fieldType: FieldType.object, searchTerms: [mockRow] } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when using the "dataKey" to compare the object with the searchTerms', () => {
    const options = { dataKey: 'code', operator: 'EQ', cellValue: mockRow, fieldType: FieldType.object, searchTerms: [mockRow] } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when using the "dataKey" to compare the object with the searchTerms and is called by "executeMappedCondition"', () => {
    const options = { dataKey: 'code', operator: 'EQ', cellValue: mockRow, fieldType: FieldType.object, searchTerms: [mockRow] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms even though there are no Operator provided (it will use EQ as default)', () => {
    const options = { dataKey: '', cellValue: mockRow, fieldType: FieldType.object, searchTerms: [mockRow] } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when the cell value is equal to at least 1 of the searchTerms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: mockRow, fieldType: FieldType.object, searchTerms: ['bar', mockRow, 'John'] } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when cell value is inversed to the searchTerm', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: mockRow, fieldType: FieldType.object, searchTerms: ['bar'] } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True even when Operator is "!=" because condition is always a strict equal check', () => {
    const options = { dataKey: '', operator: '!=', cellValue: mockRow, fieldType: FieldType.object, searchTerms: [mockRow] } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True even when Operator is "<>" because condition is always a strict equal check', () => {
    const options = { dataKey: '', operator: '<>', cellValue: mockRow, fieldType: FieldType.object, searchTerms: [mockRow] } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True even when Operator is Not Equal because condition is always a strict equal check', () => {
    const options = { dataKey: '', operator: 'NE', cellValue: mockRow, fieldType: FieldType.object, searchTerms: [mockRow] } as FilterConditionOption;
    const output = objectFilterCondition(options);
    expect(output).toBe(false);
  });
});
