import { sortByFieldType } from '../sorterUtilities';
import { FieldType, SortDirectionNumber } from '../../models';

describe('the Date Sorter (ISO format with optional time included)', () => {
  it('should return an array of ISO dates sorted ascending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['1998-08-08', '1998-08-09 01:01:10', null, '1998-08-08', '2000-01-01 23:00:05', '1998-08-09 01:01:11'];
    inputArray.sort((value1, value2) => sortByFieldType(FieldType.date, value1, value2, direction));
    expect(inputArray).toEqual([null, '1998-08-08', '1998-08-08', '1998-08-09 01:01:10', '1998-08-09 01:01:11', '2000-01-01 23:00:05']);
  });

  it('should return an array of ISO dates sorted descending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['1998-08-08', '1998-08-09 01:01:10', null, '1998-08-08', '2000-01-01 23:00:05', '1998-08-09 01:01:11'];
    inputArray.sort((value1, value2) => sortByFieldType(FieldType.date, value1, value2, direction));
    expect(inputArray).toEqual(['2000-01-01 23:00:05', '1998-08-09 01:01:11', '1998-08-09 01:01:10', '1998-08-08', '1998-08-08', null]);
  });

  it(`should return an array with unsorted characters showing at the beginning
    then comes numbers sorted ascending when digits and chars are provided`, () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['1998-08-09 01:01:10', 'y', '1998-08-08', '2000-01-01 23:00:05', '1998-08-09 01:01:11'];
    inputArray.sort((value1, value2) => sortByFieldType(FieldType.date, value1, value2, direction));
    expect(inputArray).toEqual(['y', '1998-08-08', '1998-08-09 01:01:10', '1998-08-09 01:01:11', '2000-01-01 23:00:05']);
  });

  it(`should return an array with dates sorted descending showing at the beginning then characters`, () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['1998-08-09 01:01:10', null, '1998-08-08', '2000-01-01 23:00:05', '1998-08-09 01:01:11'];
    inputArray.sort((value1, value2) => sortByFieldType(FieldType.date, value1, value2, direction));
    expect(inputArray).toEqual(['2000-01-01 23:00:05', '1998-08-09 01:01:11', '1998-08-09 01:01:10', '1998-08-08', null]);
  });
});
