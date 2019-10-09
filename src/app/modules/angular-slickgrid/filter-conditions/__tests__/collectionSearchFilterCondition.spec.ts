import { FieldType, FilterConditionOption } from '../../models/index';
import { collectionSearchFilterCondition } from '../collectionSearchFilterCondition';
import { executeMappedCondition } from '../executeMappedCondition';

describe('collectionSearchFilterCondition method', () => {
  it('should return False when searchTerms is empty', () => {
    const options = { dataKey: '', operator: 'IN', cellValue: 3, fieldType: FieldType.string } as FilterConditionOption;
    const output = collectionSearchFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value is in the searchTerms', () => {
    const options = { dataKey: '', operator: 'IN', cellValue: 3, fieldType: FieldType.string, searchTerms: ['3'] } as FilterConditionOption;
    const output = collectionSearchFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms', () => {
    const options = { dataKey: '', operator: 'IN', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['foo'] } as FilterConditionOption;
    const output = collectionSearchFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when input value provided is equal to the searchTerms even though there are no Operator provided (it will use EQ as default)', () => {
    const options = { dataKey: '', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['foo'] } as FilterConditionOption;
    const output = collectionSearchFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when the cell value is equal to at least 1 of the searchTerms', () => {
    const options = { dataKey: '', operator: 'IN', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['bar', 'foo', 'John'] } as FilterConditionOption;
    const output = collectionSearchFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return True when the cell value is equal to at least 1 of the searchTerms and called by the "executeMappedCondition"', () => {
    const options = { dataKey: '', operator: 'IN', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['bar', 'foo', 'John'] } as FilterConditionOption;
    const output = executeMappedCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when cell value is not within the searchTerms', () => {
    const options = { dataKey: '', operator: 'IN', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['bar'] } as FilterConditionOption;
    const output = collectionSearchFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when Operator is Not IN because condition is always a strict equal check', () => {
    const options = { dataKey: '', operator: 'NOT_IN', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['foo'] } as FilterConditionOption;
    const output = collectionSearchFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return False even when Operator is NIN because condition is always a strict equal check', () => {
    const options = { dataKey: '', operator: 'NIN', cellValue: 'foo', fieldType: FieldType.string, searchTerms: ['foo'] } as FilterConditionOption;
    const output = collectionSearchFilterCondition(options);
    expect(output).toBe(false);
  });

  it('should return True when input value contains searchTerms content', () => {
    const options = { dataKey: '', operator: 'IN_CONTAINS', cellValue: 'Task2,Task3', fieldType: FieldType.string, searchTerms: ['Task2', 'Task3'] } as FilterConditionOption;
    const output = collectionSearchFilterCondition(options);
    expect(output).toBe(true);
  });

  it('should return False when input value not in contains searchTerms content', () => {
    const options = { dataKey: '', operator: 'NIN_CONTAINS', cellValue: 'Task2,Task3', fieldType: FieldType.string, searchTerms: ['Task2', 'Task3'] } as FilterConditionOption;
    const output = collectionSearchFilterCondition(options);
    expect(output).toBe(false);
  });
});
