import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
import { stringSorter } from './stringSorter';

describe('the String Sorter', () => {
  it('should return an array of strings sorted ascending with strings starting with uppercase showing first because of ASCII index', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['amazon', 'zebra', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
    expect(inputArray).toEqual(['Abe', 'John', 'abc', 'amazon', 'zebra']);
  });

  it('should return an array of strings sorted descending with strings starting with uppercase showing first because of ASCII index', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['amazon', 'zebra', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
    expect(inputArray).toEqual(['zebra', 'amazon', 'abc', 'John', 'Abe']);
  });

  it('should return an array of different type of characters sorted ascending with latin characters sorted first, then symbol, then empty string, then null', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['amazon', null, 'zebra', '', '@at', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
    expect(inputArray).toEqual([null, '', '@at', 'Abe', 'John', 'abc', 'amazon', 'zebra']);
  });

  it('should return an array of different type of characters sorted descending with latin characters sorted first, then symbol, then empty string, then null', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['amazon', null, 'zebra', '', '@at', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
    expect(inputArray).toEqual(['zebra', 'amazon', 'abc', 'John', 'Abe', '@at', '', null]);
  });

  // it('should return an array of numbers sorted descending when only numbers are provided', () => {
  //   const direction = SortDirectionNumber.desc;
  //   const inputArray = [4, 39, 1, -15, -2, 0, 5, 500, 50];
  //   inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
  //   expect(inputArray).toEqual([500, 50, 39, 5, 4, 1, 0, -2, -15]);
  // });

  // it(`should return an array with unsorted characters showing at the beginning
  //   then comes numbers which those are sorted ascending when digits and chars are provided`, () => {
  //     const direction = SortDirectionNumber.asc;
  //     const inputArray = ['a', 4, 'b', 39, 1, -15, -2, 0, 5, 500, 50];
  //     inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
  //     expect(inputArray).toEqual(['a', 'b', -15, -2, 0, 1, 4, 5, 39, 50, 500]);
  //   });

  // it('should original array unsorted when different characters other than numbers are provided', () => {
  //   const direction = SortDirectionNumber.asc;
  //   const inputArray = ['z', 'a', '', null];
  //   inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
  //   expect(inputArray).toEqual(['z', 'a', '', null]);
  // });
});
