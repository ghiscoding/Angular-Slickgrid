import { SortDirectionNumber } from '../../models/sortDirectionNumber.enum';
import { dateEuroShortSorter } from '../dateEuroShortSorter';

describe('the Date Euro Short Sorter', () => {
  it('should return an array of Euro dates sorted ascending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['8/8/98', '8/10/98', '8/8/98', '01/01/18', '14/12/98'];
    inputArray.sort((value1, value2) => dateEuroShortSorter(value1, value2, direction));
    expect(inputArray).toEqual(['8/8/98', '8/8/98', '8/10/98', '14/12/98', '01/01/18']);
  });

  it('should return an array of Euro dates sorted descending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['8/8/98', '8/10/98', null, '8/8/98', '01/01/18', '14/12/98'];
    inputArray.sort((value1, value2) => dateEuroShortSorter(value1, value2, direction));
    expect(inputArray).toEqual(['01/01/18', '14/12/98', '8/10/98', '8/8/98', '8/8/98', null]);
  });

  it(`should return an array with unsorted characters showing at the beginning
    then comes numbers sorted ascending when digits and chars are provided`, () => {
      const direction = SortDirectionNumber.asc;
      const inputArray = ['8/10/98', 'y', '8/8/98', '01/01/18', '14/12/98'];
      inputArray.sort((value1, value2) => dateEuroShortSorter(value1, value2, direction));
      expect(inputArray).toEqual(['y', '8/8/98', '8/10/98', '14/12/98', '01/01/18']);
    });

  it(`should return an array with dates sorted descending showing at the beginning then characters`, () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['8/10/98', null, '8/8/98', '01/01/18', '14/12/98'];
    inputArray.sort((value1, value2) => dateEuroShortSorter(value1, value2, direction));
    expect(inputArray).toEqual(['01/01/18', '14/12/98', '8/10/98', '8/8/98', null]);
  });
});
