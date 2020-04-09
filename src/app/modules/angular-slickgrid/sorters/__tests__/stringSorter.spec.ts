import { Column, SortDirectionNumber } from '../../models';
import { stringSorter } from '../stringSorter';

describe('the String Sorter', () => {
  it('should return original unsorted array when no direction is provided', () => {
    const direction = null;
    const inputArray = ['amazon', 'zebra', 'amazon', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
    expect(inputArray).toEqual(['amazon', 'zebra', 'amazon', 'John', 'Abe', 'abc']);
  });

  it('should return original unsorted array when neutral (0) direction is provided', () => {
    const direction = SortDirectionNumber.neutral;
    const inputArray = ['amazon', 'zebra', 'amazon', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
    expect(inputArray).toEqual(['amazon', 'zebra', 'amazon', 'John', 'Abe', 'abc']);
  });

  it('should return an array of strings sorted ascending with strings starting with uppercase showing first because of ASCII index', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['amazon', 'zebra', 'amazon', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
    expect(inputArray).toEqual(['Abe', 'John', 'abc', 'amazon', 'amazon', 'zebra']);
  });

  it('should return an array of strings sorted descending with strings starting with uppercase showing first because of ASCII index', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['amazon', 'zebra', 'amazon', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
    expect(inputArray).toEqual(['zebra', 'amazon', 'amazon', 'abc', 'John', 'Abe']);
  });

  it('should return an array of different type of characters sorted ascending with latin characters sorted first, then symbol, then empty string, then null', () => {
    const direction = SortDirectionNumber.asc;
    const inputArray = ['amazon', null, 'zebra', null, '', '@at', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
    expect(inputArray).toEqual([null, null, '', '@at', 'Abe', 'John', 'abc', 'amazon', 'zebra']);
  });

  it('should return an array of different type of characters sorted descending with latin characters sorted first, then symbol, then empty string, then null', () => {
    const direction = SortDirectionNumber.desc;
    const inputArray = ['amazon', null, 'zebra', '', null, '@at', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction));
    expect(inputArray).toEqual(['zebra', 'amazon', 'abc', 'John', 'Abe', '@at', '', null, null]);
  });

  it('should return a sorted ascending array and move the undefined values to the end of the array when "valueCouldBeUndefined" is set', () => {
    // from MDN specification quote: All undefined elements are sorted to the end of the array.
    const columnDef = { id: 'name', field: 'name', valueCouldBeUndefined: true } as Column;
    const direction = SortDirectionNumber.asc;
    const inputArray = ['amazon', undefined, 'zebra', undefined, '', '@at', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction, columnDef));
    expect(inputArray).toEqual(['', '@at', 'Abe', 'John', 'abc', 'amazon', 'zebra', undefined, undefined]);
  });

  it('should return a sorted descending array and move the undefined values to the end of the array when "valueCouldBeUndefined" is set', () => {
    // from MDN specification quote: All undefined elements are sorted to the end of the array.
    const columnDef = { id: 'name', field: 'name', valueCouldBeUndefined: true } as Column;
    const direction = SortDirectionNumber.desc;
    const inputArray = ['amazon', undefined, 'zebra', undefined, '', '@at', 'John', 'Abe', 'abc'];
    inputArray.sort((value1, value2) => stringSorter(value1, value2, direction, columnDef));
    expect(inputArray).toEqual(['zebra', 'amazon', 'abc', 'John', 'Abe', '@at', '', undefined, undefined]);
  });
});
