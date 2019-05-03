import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
import { numericSorter } from './numericSorter';

describe('the Numeric Sorter', () => {
  it('should return an array of numbers sorted ascending when only numbers are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = [4, 39, 1, -15, -2, 0, 5, 500, 50];
    inputArray.sort((value1, value2) => numericSorter(value1, value2, direction));
    expect(inputArray).toEqual([-15, -2, 0, 1, 4, 5, 39, 50, 500]);
  });

  it('should return an array of numbers sorted descending when only numbers are provided', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = [4, 39, 1, -15, -2, 0, 5, 500, 50];
    inputArray.sort((value1, value2) => numericSorter(value1, value2, direction));
    expect(inputArray).toEqual([500, 50, 39, 5, 4, 1, 0, -2, -15]);
  });

  it(`should return an array with unsorted characters showing at the beginning
    then comes numbers sorted ascending when digits and chars are provided`, () => {
      const direction = SortDirectionNumber.asc;
      const inputArray = ['a', 4, 'b', 39, 1, -15, -2, 0, 5, 500, 50];
      inputArray.sort((value1, value2) => numericSorter(value1, value2, direction));
      expect(inputArray).toEqual(['a', 'b', -15, -2, 0, 1, 4, 5, 39, 50, 500]);
    });

  it(`should return an array with numbers sorted descending showing at the beginning
    then comes characters with a reverse order of how they were entered`, () => {
      const direction = SortDirectionNumber.desc;
      const inputArray = ['a', 4, 'b', 39, 1, -15, -2, 0, 5, 500, 50];
      inputArray.sort((value1, value2) => numericSorter(value1, value2, direction));
      expect(inputArray).toEqual([500, 50, 39, 5, 4, 1, 0, -2, -15, 'b', 'a']);
    });

  it('should original array unsorted when different characters other than numbers are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['z', 'a', '', null];
    inputArray.sort((value1, value2) => numericSorter(value1, value2, direction));
    expect(inputArray).toEqual(['z', 'a', '', null]);
  });
});
