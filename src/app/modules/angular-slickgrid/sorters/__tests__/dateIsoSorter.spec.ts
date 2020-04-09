import { sortByFieldType } from '../sorterUtilities';
import { Column, FieldType, SortDirectionNumber } from '../../models';

describe('the Date ISO (without time) Sorter', () => {
  it('should return an array of US dates sorted ascending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['1998-08-08', '1998-10-08', '1998-08-08', '2001-01-01', '1998-12-14'];
    inputArray.sort((value1, value2) => sortByFieldType(FieldType.dateIso, value1, value2, direction));
    expect(inputArray).toEqual(['1998-08-08', '1998-08-08', '1998-10-08', '1998-12-14', '2001-01-01']);
  });

  it('should return an array of US dates sorted descending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['1998-08-08', '1998-10-08', null, '1998-08-08', '2001-01-01', '1998-12-14'];
    inputArray.sort((value1, value2) => sortByFieldType(FieldType.dateIso, value1, value2, direction));
    expect(inputArray).toEqual(['2001-01-01', '1998-12-14', '1998-10-08', '1998-08-08', '1998-08-08', null]);
  });

  it(`should return an array with unsorted characters showing at the beginning
    then comes numbers sorted ascending when digits and chars are provided`, () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['1998-10-08', 'y', '1998-08-08', '2001-01-01', '1998-12-14'];
    inputArray.sort((value1, value2) => sortByFieldType(FieldType.dateIso, value1, value2, direction));
    expect(inputArray).toEqual(['y', '1998-08-08', '1998-10-08', '1998-12-14', '2001-01-01']);
  });

  it(`should return an array with dates sorted descending showing at the beginning then characters`, () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['1998-10-08', null, '1998-08-08', '2001-01-01', '1998-12-14'];
    inputArray.sort((value1, value2) => sortByFieldType(FieldType.dateIso, value1, value2, direction));
    expect(inputArray).toEqual(['2001-01-01', '1998-12-14', '1998-10-08', '1998-08-08', null]);
  });

  it('should return a sorted ascending array and move the undefined values to the end of the array when "valueCouldBeUndefined" is set', () => {
    // from MDN specification quote: All undefined elements are sorted to the end of the array.
    const columnDef = { id: 'name', field: 'name', valueCouldBeUndefined: true } as Column;
    const direction = SortDirectionNumber.asc;
    const inputArray = ['1998-10-08', undefined, '1998-08-08', '2001-01-01', '1998-12-14'];
    inputArray.sort((value1, value2) => sortByFieldType(FieldType.dateIso, value1, value2, direction, columnDef));
    expect(inputArray).toEqual(['1998-08-08', '1998-10-08', '1998-12-14', '2001-01-01', undefined]);
  });

  it('should return a sorted descending array and move the undefined values to the end of the array when "valueCouldBeUndefined" is set', () => {
    // from MDN specification quote: All undefined elements are sorted to the end of the array.
    const columnDef = { id: 'name', field: 'name', valueCouldBeUndefined: true } as Column;
    const direction = SortDirectionNumber.desc;
    const inputArray = ['1998-10-08', undefined, '1998-08-08', '2001-01-01', '1998-12-14'];
    inputArray.sort((value1, value2) => sortByFieldType(FieldType.dateIso, value1, value2, direction, columnDef));
    expect(inputArray).toEqual(['2001-01-01', '1998-12-14', '1998-10-08', '1998-08-08', undefined]);
  });
});
