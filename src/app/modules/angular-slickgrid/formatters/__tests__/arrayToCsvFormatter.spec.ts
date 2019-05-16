import { Column } from '../../models';
import { arrayToCsvFormatter } from '../arrayToCsvFormatter';

describe('the ArrayToCsv Formatter', () => {
  it('should return same output when no value is passed', () => {
    const valueArray = null;
    const result = arrayToCsvFormatter(0, 0, valueArray, {} as Column, {});
    expect(result).toBe(null);
  });

  it('should return an empty array when value passed is an empty array', () => {
    const valueArray = [];
    const result = arrayToCsvFormatter(0, 0, valueArray, {} as Column, {});
    expect(result).toEqual([]);
  });

  it('should return original value when input is not an array', () => {
    const inputValue = 'anything';
    const result = arrayToCsvFormatter(0, 0, inputValue, {} as Column, {});
    expect(result).toBe(inputValue);
  });

  it('should return a CSV string when value passed is an array of string', () => {
    const valueArray = ['john', 'doe'];
    const result = arrayToCsvFormatter(0, 0, valueArray, {} as Column, {});
    expect(result).toBe(`<span title="${valueArray.join(', ')}">${valueArray.join(', ')}</span>`);
  });
});
