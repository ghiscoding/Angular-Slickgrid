import { Column } from '../../models';
import { collectionFormatter } from '../collectionFormatter';

describe('the Collection Formatter', () => {
  it('should return same output when no value is passed', () => {
    const valueArray = null;
    const result = collectionFormatter(0, 0, valueArray, {} as Column, {});
    expect(result).toBe(null);
  });

  it('should return an empty array when value passed is an empty array', () => {
    const valueArray = [];
    const result = collectionFormatter(0, 0, valueArray, {} as Column, {});
    expect(result).toEqual([]);
  });

  it('should return original value when input is not an array', () => {
    const inputValue = 'anything';
    const result = collectionFormatter(0, 0, inputValue, {} as Column, {});
    expect(result).toBe(inputValue);
  });

  it('should return a CSV string when value passed is an array of objects', () => {
    const valueArray = [1, 2];
    const columnDef = { params: { collection: [{ value: 1, label: 'foo' }, { value: 2, label: 'bar' }] } } as Column;
    const result = collectionFormatter(0, 0, valueArray, columnDef, {});
    const outputCsv = 'foo, bar';
    expect(result).toBe(`<span title="${outputCsv}">${outputCsv}</span>`);
  });

  it('should return a CSV string when value passed is an array of objects', () => {
    const valueArray = [1, 2];
    const columnDef = {
      params: {
        collection: [{ id: 1, name: 'John' }, { id: 2, name: 'Bob' }],
        customStructure: { label: 'name', value: 'id' }
      }
    } as Column;
    const result = collectionFormatter(0, 0, valueArray, columnDef, {});
    const outputCsv = 'John, Bob';
    expect(result).toBe(`<span title="${outputCsv}">${outputCsv}</span>`);
  });

  it('should return a string when value passed is an object', () => {
    const inputValue = 2;
    const columnDef = { params: { collection: [{ value: 1, label: 'foo' }, { value: 2, label: 'bar' }] } } as Column;
    const result = collectionFormatter(0, 0, inputValue, columnDef, {});
    expect(result).toBe('bar');
  });

  it('should return an empty string when value passed is an object that is not part of the collection', () => {
    const inputValue = 4;
    const columnDef = { params: { collection: [{ value: 1, label: 'foo' }, { value: 2, label: 'bar' }] } } as Column;
    const result = collectionFormatter(0, 0, inputValue, columnDef, {});
    expect(result).toBe('');
  });
});
