import { Column } from '../../models';
import { collectionEditorFormatter } from '../collectionEditorFormatter';
import { Editors } from '../../editors';

describe('the CollectionEditor Formatter', () => {
  let columnDef: Column;

  beforeEach(() => {
    columnDef = {
      editor: {
        model: Editors.singleSelect,
        collection: [{ value: 1, label: 'foo' }, { value: 2, label: 'bar' }]
      }
    } as Column;
    columnDef.internalColumnEditor = columnDef.editor;
  });

  it('should return same output when no value is passed', () => {
    const valueArray = null;
    const result = collectionEditorFormatter(0, 0, valueArray, {} as Column, {});
    expect(result).toBe(null);
  });

  it('should return an empty array when value passed is an empty array', () => {
    const valueArray = [];
    const result = collectionEditorFormatter(0, 0, valueArray, {} as Column, {});
    expect(result).toEqual([]);
  });

  it('should return original value when input is not an array', () => {
    const inputValue = 'anything';
    const result = collectionEditorFormatter(0, 0, inputValue, {} as Column, {});
    expect(result).toBe(inputValue);
  });

  it('should return a CSV string when provided collection is an array of objects', () => {
    const valueArray = [1, 2];
    const result = collectionEditorFormatter(0, 0, valueArray, columnDef, {});
    const outputCsv = 'foo, bar';
    expect(result).toBe(`<span title="${outputCsv}">${outputCsv}</span>`);
  });

  it('should return a CSV string when provided collection is an array of strings', () => {
    const valueArray = ['foo', 'bar'];
    columnDef.editor.collection = ['foo', 'bar', 'apple'];

    const result = collectionEditorFormatter(0, 0, valueArray, columnDef, {});

    const outputCsv = 'foo, bar';
    expect(result).toBe(`<span title="${outputCsv}">${outputCsv}</span>`);
  });

  it('should return a CSV string when provided collection is an array of objects', () => {
    const valueArray = [1, 2];
    columnDef.editor.collection = [{ id: 1, name: 'John' }, { id: 2, name: 'Bob' }];
    columnDef.editor.customStructure = { label: 'name', value: 'id' };

    const result = collectionEditorFormatter(0, 0, valueArray, columnDef, {});

    const outputCsv = 'John, Bob';
    expect(result).toBe(`<span title="${outputCsv}">${outputCsv}</span>`);
  });

  it('should return a string when provided input value is an object', () => {
    const inputValue = 2;
    const result = collectionEditorFormatter(0, 0, inputValue, columnDef, {});
    expect(result).toBe('bar');
  });

  it('should return an empty string when provided input value is an object that is not part of the collection', () => {
    const inputValue = 4;
    const result = collectionEditorFormatter(0, 0, inputValue, columnDef, {});
    expect(result).toBe('');
  });
});
