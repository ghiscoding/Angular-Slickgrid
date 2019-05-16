import { SortDirectionNumber } from '../../models/sortDirectionNumber.enum';
import { dateEuroSorter } from '../dateEuroSorter';

describe('the Date Euro Sorter', () => {
  it('should return an array of Euro dates sorted ascending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['08/08/1998', '08/10/1998', '08/08/1998', '01/01/2000', '14/12/1998'];
    inputArray.sort((value1, value2) => dateEuroSorter(value1, value2, direction));
    expect(inputArray).toEqual(['08/08/1998', '08/08/1998', '08/10/1998', '14/12/1998', '01/01/2000']);
  });

  it('should return an array of Euro dates sorted descending when only valid dates are provided', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['08/08/1998', '08/10/1998', null, '08/08/1998', '01/01/2000', '14/12/1998'];
    inputArray.sort((value1, value2) => dateEuroSorter(value1, value2, direction));
    expect(inputArray).toEqual(['01/01/2000', '14/12/1998', '08/10/1998', '08/08/1998', '08/08/1998', null]);
  });

  it(`should return an array with unsorted characters showing at the beginning
    then comes numbers sorted ascending when digits and chars are provided`, () => {
      const direction = SortDirectionNumber.asc;
      const inputArray = ['08/10/1998', 'y', '08/08/1998', '01/01/2000', '14/12/1998'];
      inputArray.sort((value1, value2) => dateEuroSorter(value1, value2, direction));
      expect(inputArray).toEqual(['y', '08/08/1998', '08/10/1998', '14/12/1998', '01/01/2000']);
    });

  it(`should return an array with dates sorted descending showing at the beginning then characters`, () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['08/10/1998', null, '08/08/1998', '01/01/2000', '14/12/1998'];
    inputArray.sort((value1, value2) => dateEuroSorter(value1, value2, direction));
    expect(inputArray).toEqual(['01/01/2000', '14/12/1998', '08/10/1998', '08/08/1998', null]);
  });
});
