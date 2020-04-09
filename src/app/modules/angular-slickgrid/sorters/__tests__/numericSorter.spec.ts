import { Column, SortDirectionNumber } from '../../models';
import { numericSorter } from '../numericSorter';

describe('the Numeric Sorter', () => {
  it('should return an array of numbers sorted ascending when only numbers are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = [4, 39, 1, null, -15, -2, 0, 5, 500, 50];
    inputArray.sort((value1, value2) => numericSorter(value1, value2, direction));
    expect(inputArray).toEqual([null, -15, -2, 0, 1, 4, 5, 39, 50, 500]);
  });

  it('should return an array of numbers sorted descending when only numbers are provided', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = [4, 39, 1, null, -15, -2, 0, 5, 500, 50];
    inputArray.sort((value1, value2) => numericSorter(value1, value2, direction));
    expect(inputArray).toEqual([500, 50, 39, 5, 4, 1, 0, -2, -15, null]);
  });

  it(`should return an array with unsorted characters showing at the beginning
    then comes numbers sorted ascending when digits and chars are provided`, () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = [4, 'y', 39, 1, -15, -2, 0, 5, 500, 50];
    inputArray.sort((value1, value2) => numericSorter(value1, value2, direction));
    expect(inputArray).toEqual(['y', -15, -2, 0, 1, 4, 5, 39, 50, 500]);
  });

  it(`should return an array with numbers sorted descending showing at the beginning then characters`, () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = [4, 'y', 39, 1, -15, -2, 0, 5, 500, 50];
    inputArray.sort((value1, value2) => numericSorter(value1, value2, direction));
    expect(inputArray).toEqual([500, 50, 39, 5, 4, 1, 0, -2, -15, 'y']);
  });

  it('should original array unsorted when different characters other than numbers are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['z', 'a', '', null];
    inputArray.sort((value1, value2) => numericSorter(value1, value2, direction));
    expect(inputArray).toEqual(['z', 'a', '', null]);
  });

  it('should return a sorted ascending array and move the undefined values to the end of the array when "valueCouldBeUndefined" is set', () => {
    // from MDN specification quote: All undefined elements are sorted to the end of the array.
    const columnDef = { id: 'name', field: 'name', valueCouldBeUndefined: true } as Column;
    const direction = SortDirectionNumber.asc;
    const inputArray = [4, undefined, 39, 1, -15, -2, 0, 5, 500, 50];
    inputArray.sort((value1, value2) => numericSorter(value1, value2, direction, columnDef));
    expect(inputArray).toEqual([-15, -2, 0, 1, 4, 5, 39, 50, 500, undefined]);
  });

  it('should return a sorted descending array and move the undefined values to the end of the array when "valueCouldBeUndefined" is set', () => {
    // from MDN specification quote: All undefined elements are sorted to the end of the array.
    const columnDef = { id: 'name', field: 'name', valueCouldBeUndefined: true } as Column;
    const direction = SortDirectionNumber.desc;
    const inputArray = [4, undefined, 39, 1, -15, -2, 0, 5, 500, 50];
    inputArray.sort((value1, value2) => numericSorter(value1, value2, direction, columnDef));
    expect(inputArray).toEqual([500, 50, 39, 5, 4, 1, 0, -2, -15, undefined]);
  });
});
