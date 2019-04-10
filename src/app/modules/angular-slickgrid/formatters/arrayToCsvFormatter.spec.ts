import { Column } from '../models';
import { arrayToCsvFormatter } from './arrayToCsvFormatter';

describe('the ArrayToCsv Formatter', () => {
  it('should return an empty string when no value is passed', () => {
    const valueArray = null;
    const result = arrayToCsvFormatter(0, 0, valueArray, {} as Column, {});
    expect(result).toBe('');
  });

  it('should return an empty string when value passed is an empty array', () => {
    const valueArray = [];
    const result = arrayToCsvFormatter(0, 0, valueArray, {} as Column, {});
    expect(result).toBe('');
  });

  it('should return a CSV string when value passed is an array of string', () => {
    const valueArray = ['john', 'doe'];
    const result = arrayToCsvFormatter(0, 0, valueArray, {} as Column, {});
    expect(result).toBe(`<span title="${valueArray.join(', ')}">${valueArray.join(', ')}</span>`);
  });
});
