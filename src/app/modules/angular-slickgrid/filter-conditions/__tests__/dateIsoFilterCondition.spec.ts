import { FieldType, FilterConditionOption } from '../../models/index';
import { executeDateFilterCondition, getFilterParsedDates } from '../dateFilterCondition';
import { executeFilterConditionTest, getParsedSearchTermsByFieldType } from '../filterConditionProcesses';

describe('dateIsoFilterCondition method', () => {
  describe('when using executeFilterConditionTest method', () => {
    describe('single date filtering', () => {
      it('should return False when no cell value is provided, neither search terms', () => {
        const searchTerms = undefined;
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '' } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return False when any cell value is provided without any search terms', () => {
        const searchTerms = undefined;
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '2000-12-25' } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return False when search term is not a valid date', () => {
        const searchTerms = ['2000-14-25'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '2000-12-25', searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return True when input value provided is equal to the searchTerms', () => {
        const searchTerms = ['1993-12-25'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(true);
      });

      it('should return True when input value provided is equal to the searchTerms', () => {
        const searchTerms = ['1993-12-25'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(true);
      });

      it('should return True when input value provided is equal to the searchTerms, even when passing Date+Time in cell value', () => {
        const searchTerms = ['1993-12-25'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: new Date('1993-12-25T14:02:02.103Z'), searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(true);
      });

      it('should return True when input value provided is equal to the searchTerms, even when passing Date+Time in search value', () => {
        const searchTerms = [new Date('1993-12-25T14:02:02.103Z')];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(true);
      });

      it('should return False when cell value is not the same value as the searchTerm', () => {
        const searchTerms = ['2003-03-14'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return False even when the cell value is found in the searchTerms since it only compares first term', () => {
        const searchTerms = ['2003-03-14', '1993-12-25'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return False even when Operator is Not Equal and cell value equals the search term', () => {
        const searchTerms = ['1993-12-25'];
        const options = { dataKey: '', operator: 'NE', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return True even when Operator is Not Equal and cell value is different than the search term', () => {
        const searchTerms = ['2002-12-25'];
        const options = { dataKey: '', operator: 'NE', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(true);
      });

      it('should return False when there are no search term and no operator', () => {
        const searchTerms = [null as any];
        const options = { dataKey: '', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return False when search and cell values are different and there are no operator passed, it will use default EQ operator', () => {
        const searchTerms = ['1993-12-27'];
        const options = { dataKey: '', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });
    });

    describe('date range', () => {
      it('should return True when input value is in the range of search terms', () => {
        const searchTerms = ['1993-12-01..1993-12-31'];
        const options = { dataKey: '', operator: 'EQ', cellValue: '1993-12-25', fieldType: FieldType.dateIso, searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(true);
      });

      it('should return False when input value is not in the range of search terms', () => {
        const searchTerms = ['1993-12-01..1993-12-31'];
        const options = { dataKey: '', operator: 'EQ', cellValue: '1993-11-25', fieldType: FieldType.dateIso, searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return True when input value equals the search terms min inclusive value and operator is set to "rangeInclusive"', () => {
        const searchTerms = ['1993-12-01..1993-12-31'];
        const options = { dataKey: '', operator: 'RangeInclusive', cellValue: '1993-12-01', fieldType: FieldType.dateIso, searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(true);
      });

      it('should return False when input value equals the search terms min inclusive value and operator is set to "RangeExclusive"', () => {
        const searchTerms = ['1993-12-01..1993-12-31'];
        const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '1993-12-01', fieldType: FieldType.dateIso, searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return False when any of the 2 search term value is not a valid date', () => {
        const searchTerms = ['1993-12-01..1993-12-60'];
        const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '1993-12-05', fieldType: FieldType.dateIso, searchTerms } as FilterConditionOption;
        const output = executeFilterConditionTest(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });
    });
  });

  describe('when using executeDateFilterCondition method', () => {
    describe('single date filtering', () => {
      it('should return False when no cell value is provided, neither search terms', () => {
        const searchTerms = [undefined];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '' } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(false);
      });

      it('should return False when any cell value is provided without any search terms', () => {
        const searchTerms = [undefined];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '2000-12-25' } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(false);
      });

      it('should return False when search term is not a valid date', () => {
        const searchTerms = ['2000-14-25'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '2000-12-25', searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(false);
      });

      it('should return True when input value provided is equal to the searchTerms', () => {
        const searchTerms = ['1993-12-25'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(true);
      });

      it('should return True when input value provided is equal to the searchTerms', () => {
        const searchTerms = ['1993-12-25'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(true);
      });

      it('should return True when input value provided is equal to the searchTerms, even when passing Date+Time in cell value', () => {
        const searchTerms = ['1993-12-25'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: new Date('1993-12-25T14:02:02.103Z'), searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(true);
      });

      it('should return True when input value provided is equal to the searchTerms, even when passing Date+Time in search value', () => {
        const searchTerms = [new Date('1993-12-25T14:02:02.103Z')];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(true);
      });

      it('should return False when cell value is not the same value as the searchTerm', () => {
        const searchTerms = ['2003-03-14'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(false);
      });

      it('should return False even when the cell value is found in the searchTerms since it only compares first term', () => {
        const searchTerms = ['2003-03-14', '1993-12-25'];
        const options = { dataKey: '', operator: 'EQ', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(false);
      });

      it('should return False even when Operator is Not Equal and cell value equals the search term', () => {
        const searchTerms = ['1993-12-25'];
        const options = { dataKey: '', operator: 'NE', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(false);
      });

      it('should return True even when Operator is Not Equal and cell value is different than the search term', () => {
        const searchTerms = ['2002-12-25'];
        const options = { dataKey: '', operator: 'NE', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(true);
      });

      it('should return False when there are no search term and no operator', () => {
        const searchTerms = [null as any];
        const options = { dataKey: '', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(false);
      });

      it('should return False when search and cell values are different and there are no operator passed, it will use default EQ operator', () => {
        const searchTerms = ['1993-12-27'];
        const options = { dataKey: '', fieldType: FieldType.dateIso, cellValue: '1993-12-25', searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getParsedSearchTermsByFieldType(searchTerms, FieldType.dateIso) as any[]);
        expect(output).toBe(false);
      });
    });

    describe('date range', () => {
      it('should return True when input value is in the range of search terms', () => {
        const searchTerms = ['1993-12-01..1993-12-31'];
        const options = { dataKey: '', operator: 'EQ', cellValue: '1993-12-25', fieldType: FieldType.dateIso, searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(true);
      });

      it('should return False when input value is not in the range of search terms', () => {
        const searchTerms = ['1993-12-01..1993-12-31'];
        const options = { dataKey: '', operator: 'EQ', cellValue: '1993-11-25', fieldType: FieldType.dateIso, searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return True when input value equals the search terms min inclusive value and operator is set to "rangeInclusive"', () => {
        const searchTerms = ['1993-12-01..1993-12-31'];
        const options = { dataKey: '', operator: 'RangeInclusive', cellValue: '1993-12-01', fieldType: FieldType.dateIso, searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(true);
      });

      it('should return False when input value equals the search terms min inclusive value and operator is set to "RangeExclusive"', () => {
        const searchTerms = ['1993-12-01..1993-12-31'];
        const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '1993-12-01', fieldType: FieldType.dateIso, searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });

      it('should return False when any of the 2 search term value is not a valid date', () => {
        const searchTerms = ['1993-12-01..1993-12-60'];
        const options = { dataKey: '', operator: 'RangeExclusive', cellValue: '1993-12-05', fieldType: FieldType.dateIso, searchTerms } as FilterConditionOption;
        const output = executeDateFilterCondition(options, getFilterParsedDates(searchTerms, FieldType.dateIso));
        expect(output).toBe(false);
      });
    });
  });
});
