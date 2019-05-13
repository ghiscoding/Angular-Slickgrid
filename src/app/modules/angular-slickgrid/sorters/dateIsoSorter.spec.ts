import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
import { dateIsoSorter } from './dateIsoSorter';

describe('the Date ISO (without time) Sorter', () => {
  it('should return an array of US dates sorted ascending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['1998-08-08', '1998-10-08', '1998-08-08', '2001-01-01', '1998-12-14'];
    inputArray.sort((value1, value2) => dateIsoSorter(value1, value2, direction));
    expect(inputArray).toEqual(['1998-08-08', '1998-08-08', '1998-10-08', '1998-12-14', '2001-01-01']);
  });

  it('should return an array of US dates sorted descending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['1998-08-08', '1998-10-08', null, '1998-08-08', '2001-01-01', '1998-12-14'];
    inputArray.sort((value1, value2) => dateIsoSorter(value1, value2, direction));
    expect(inputArray).toEqual(['2001-01-01', '1998-12-14', '1998-10-08', '1998-08-08', '1998-08-08', null]);
  });

  it(`should return an array with unsorted characters showing at the beginning
    then comes numbers sorted ascending when digits and chars are provided`, () => {
      const direction = SortDirectionNumber.asc;
      const inputArray = ['a', '1998-10-08', 'y', 'b', '1998-08-08', '2001-01-01', '1998-12-14'];
      inputArray.sort((value1, value2) => dateIsoSorter(value1, value2, direction));
      expect(inputArray).toEqual(['a', 'y', 'b', '1998-08-08', '1998-10-08', '1998-12-14', '2001-01-01']);
    });

  it(`should return an array with dates sorted descending showing at the beginning then characters`, () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['1998-10-08', 'y', null, '1998-08-08', '2001-01-01', '1998-12-14'];
    inputArray.sort((value1, value2) => dateIsoSorter(value1, value2, direction));
    expect(inputArray).toEqual(['2001-01-01', '1998-12-14', '1998-10-08', '1998-08-08', null, 'y']);
  });

  it('should original array unsorted when different characters other than dates are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['z', 'a', '', null];
    inputArray.sort((value1, value2) => dateIsoSorter(value1, value2, direction));
    expect(inputArray).toEqual(['z', 'a', '', null]);
  });
});
