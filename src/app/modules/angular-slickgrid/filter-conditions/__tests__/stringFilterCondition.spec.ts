import { FieldType, FilterConditionOption, OperatorType } from '../../models/index';
import { stringFilterCondition } from '../stringFilterCondition';
import { executeMappedCondition } from '../executeMappedCondition';

describe('stringFilterCondition method', () => {
  it('should return True when no cell input value is provided which is equal to the default search term, neither search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: '', fieldType: FieldType.string } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when cell input value is null and is equal to the default search term, neither search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: null, fieldType: FieldType.string } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when any cell input value is provided without any search terms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 'foo', fieldType: FieldType.string } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value True is provided as cell value', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 3, fieldType: FieldType.string, searchTerms: ['3'] } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['foo'] } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms and is called by "executeMappedCondition"', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['foo'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms even though there are no Operator provided (it will use EQ as default)', () => {
    const options = { dataKey: '', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['foo'] } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when the cell value is equal to at least 1 of the searchTerms', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['bar', 'foo', 'John'] } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False when cell value is inversed to the searchTerm', () => {
    const options = { dataKey: '', operator: 'EQ', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['bar'] } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when Operator is Not Equal because condition is always a strict equal check', () => {
    const options = { dataKey: '', operator: 'NE', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['foo'] } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value provided starts with same substring and the operator is startsWith', () => {
    const options = { dataKey: '', operator: OperatorType.startsWith, cellValue: 'abbostford', fieldType: FieldType.string, searchTerms: ['abb'] } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided starts with same substring and the operator is empty string', () => {
    const options = { dataKey: '', operator: '', cellValue: 'abbostford', fieldType: FieldType.string, searchTerms: ['abb'] } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided starts with same substring and the operator is empty string & option "cellValueLastChar" is asterisk (*)', () => {
    const options = { dataKey: '', operator: '', cellValueLastChar: '*', cellValue: 'abbostford', fieldType: FieldType.string, searchTerms: ['abb'] } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided ends with same substring and the operator is endsWith', () => {
    const options = { dataKey: '', operator: OperatorType.endsWith, cellValue: 'John Smith', fieldType: FieldType.string, searchTerms: ['Smith'] } as FilterConditionOption;
    const output = stringFilterCondition(options);
    expect(output).toBe(true);
  });
});
