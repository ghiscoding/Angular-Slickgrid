import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
import { dateUsShortSorter } from './dateUsShortSorter';

describe('the Date US Short Sorter', () => {
  it('should return an array of US dates sorted ascending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['8/8/98', '10/8/98', '8/8/98', '01/01/18', '12/14/98'];
    inputArray.sort((value1, value2) => dateUsShortSorter(value1, value2, direction));
    expect(inputArray).toEqual(['8/8/98', '8/8/98', '10/8/98', '12/14/98', '01/01/18']);
  });

  it('should return an array of US dates sorted descending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['8/8/98', '10/8/98', null, '8/8/98', '01/01/18', '12/14/98'];
    inputArray.sort((value1, value2) => dateUsShortSorter(value1, value2, direction));
    expect(inputArray).toEqual(['01/01/18', '12/14/98', '10/8/98', '8/8/98', '8/8/98', null]);
  });

  it(`should return an array with unsorted characters showing at the beginning
    then comes numbers sorted ascending when digits and chars are provided`, () => {
      const direction = SortDirectionNumber.asc;
      const inputArray = ['a', '10/8/98', 'y', 'b', '8/8/98', '01/01/18', '12/14/98'];
      inputArray.sort((value1, value2) => dateUsShortSorter(value1, value2, direction));
      expect(inputArray).toEqual(['a', 'y', 'b', '8/8/98', '10/8/98', '12/14/98', '01/01/18']);
    });

  it(`should return an array with dates sorted descending showing at the beginning then characters`, () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['10/8/98', 'y', null, '8/8/98', '01/01/18', '12/14/98'];
    inputArray.sort((value1, value2) => dateUsShortSorter(value1, value2, direction));
    expect(inputArray).toEqual(['01/01/18', '12/14/98', '10/8/98', '8/8/98', null, 'y']);
  });

  it('should original array unsorted when different characters other than dates are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['z', 'a', '', null];
    inputArray.sort((value1, value2) => dateUsShortSorter(value1, value2, direction));
    expect(inputArray).toEqual(['z', 'a', '', null]);
  });
});
