import { Column, GridOption, SlickGrid } from '../../models/index';
import { treeExportFormatter } from '../treeExportFormatter';

const gridStub = {
  getData: jest.fn(),
  getOptions: jest.fn(),
} as unknown as SlickGrid;

describe('Tree Export Formatter', () => {
  let dataset: any[];
  let mockGridOptions: GridOption;

  beforeEach(() => {
    dataset = [
      { id: 0, firstName: 'John', lastName: 'Smith', fullName: 'John Smith', email: 'john.smith@movie.com', address: { zip: 123456 }, parentId: null, indent: 0, __collapsed: false, __hasChildren: true },
      { id: 1, firstName: 'Jane', lastName: 'Doe', fullName: 'Jane Doe', email: 'jane.doe@movie.com', address: { zip: 222222 }, parentId: 0, indent: 1, __collapsed: false, __hasChildren: true },
      { id: 2, firstName: 'Bob', lastName: 'Cane', fullName: 'Bob Cane', email: 'bob.cane@movie.com', address: { zip: 333333 }, parentId: 1, indent: 2, __collapsed: true, __hasChildren: true },
      { id: 3, firstName: 'Barbara', lastName: 'Cane', fullName: 'Barbara Cane', email: 'barbara.cane@movie.com', address: { zip: 444444 }, parentId: null, indent: 0, __hasChildren: false },
      { id: 4, firstName: 'Anonymous', lastName: 'Doe', fullName: 'Anonymous < Doe', email: 'anonymous.doe@anom.com', address: { zip: 556666 }, parentId: null, indent: 0, __collapsed: true, __hasChildren: true },
      { id: 5, firstName: 'Sponge', lastName: 'Bob', fullName: 'Sponge Bob', email: 'sponge.bob@cartoon.com', address: { zip: 888888 }, parentId: 2, indent: 3, __hasChildren: false },
      { id: 6, firstName: 'Bobby', lastName: 'Blown', fullName: 'Bobby Blown', email: 'bobby.blown@dynamite.com', address: { zip: 998877 }, parentId: 4, indent: 1, __hasChildren: false },
    ];
    mockGridOptions = {
      treeDataOptions: { levelPropName: 'indent' }
    } as GridOption;
    jest.spyOn(gridStub, 'getOptions').mockReturnValue(mockGridOptions);
  });

  it('should throw an error when oarams are mmissing', () => {
    expect(() => treeExportFormatter(1, 1, 'blah', {} as Column, {}, gridStub))
      .toThrowError('[Slickgrid-Universal] You must provide valid "treeDataOptions" in your Grid Options, however it seems that we could not find any tree level info on the current item datacontext row.');
  });

  it('should return empty string when value is null', () => {
    const output = treeExportFormatter(1, 1, null, {} as Column, dataset[1], gridStub);
    expect(output).toBe('');
  });

  it('should return empty string when value is undefined', () => {
    const output = treeExportFormatter(1, 1, undefined, {} as Column, dataset[1], gridStub);
    expect(output).toBe('');
  });

  it('should return empty string when item is undefined', () => {
    const output = treeExportFormatter(1, 1, 'blah', {} as Column, undefined, gridStub);
    expect(output).toBe('');
  });

  it('should return a span without any toggle icon which include leading char and 4 spaces to cover width of collapsing icons', () => {
    const output = treeExportFormatter(1, 1, dataset[3]['firstName'], {} as Column, dataset[3], gridStub);
    expect(output).toBe(`.    Barbara`); // 3x spaces for exportIndentationLeadingSpaceCount + 1x space for space after collapsing icon in final string output
  });

  it('should return a span without any toggle icon and 15px indentation of a tree level 1', () => {
    const output = treeExportFormatter(1, 1, dataset[6]['firstName'], {} as Column, dataset[6], gridStub);
    expect(output).toBe(`.           Bobby`);
  });

  it('should return a span without any toggle icon and 45px indentation of a tree level 3', () => {
    const output = treeExportFormatter(1, 1, dataset[5]['firstName'], {} as Column, dataset[5], gridStub);
    expect(output).toBe(`.                     Sponge`);
  });

  it('should return a span with expanded icon and 15px indentation of a tree level 1 when current item is a parent that is expanded', () => {
    const output = treeExportFormatter(1, 1, dataset[1]['firstName'], {} as Column, dataset[1], gridStub);
    expect(output).toBe(`.     ⮟ Jane`);
  });

  it('should return a span with collapsed icon and 0px indentation of a tree level 0 when current item is a parent that is collapsed', () => {
    const output = treeExportFormatter(1, 1, dataset[4]['firstName'], {} as Column, dataset[4], gridStub);
    expect(output).toBe(`⮞ Anonymous`);
  });

  it('should execute "queryFieldNameGetterFn" callback to get field name to use when it is defined', () => {
    const mockColumn = { id: 'firstName', field: 'firstName', queryFieldNameGetterFn: () => 'fullName' } as Column;
    const output = treeExportFormatter(1, 1, null, mockColumn as Column, dataset[4], gridStub);
    expect(output).toBe(`⮞ Anonymous < Doe`);
  });

  it('should execute "queryFieldNameGetterFn" callback to get field name and also apply html encoding when output value includes a character that should be encoded', () => {
    const mockColumn = { id: 'firstName', field: 'firstName', queryFieldNameGetterFn: () => 'fullName' } as Column;
    const output = treeExportFormatter(1, 1, null, mockColumn as Column, dataset[4], gridStub);
    expect(output).toBe(`⮞ Anonymous < Doe`);
  });

  it('should execute "queryFieldNameGetterFn" callback to get field name, which has (.) dot notation reprensenting complex object', () => {
    const mockColumn = { id: 'zip', field: 'zip', queryFieldNameGetterFn: () => 'address.zip' } as Column;
    const output = treeExportFormatter(1, 1, null, mockColumn as Column, dataset[3], gridStub);
    expect(output).toBe(`.    444444`);
  });

  it('should return a span with expanded icon and 15px indentation of a tree level 1 with a value prefix when provided', () => {
    mockGridOptions.treeDataOptions!.levelPropName = 'indent';
    mockGridOptions.treeDataOptions!.titleFormatter = (_row, _cell, value, _def) => `++${value}++`;

    const output = treeExportFormatter(1, 1, dataset[3]['firstName'], { field: 'firstName' } as Column, dataset[3], gridStub);
    expect(output).toEqual(`.    ++Barbara++`);
  });

  it('should return a span with expanded icon and expected indentation and expanded icon of a tree level 1 with a value prefix when provided', () => {
    mockGridOptions.treeDataOptions!.levelPropName = 'indent';
    mockGridOptions.treeDataOptions!.titleFormatter = (_row, _cell, value, _def, dataContext) => {
      if (dataContext.indent > 0) {
        return `++${value}++`;
      }
      return value || '';
    };

    const output = treeExportFormatter(1, 1, { ...dataset[1]['firstName'], indent: 1 }, { field: 'firstName' } as Column, dataset[1], gridStub);
    expect(output).toEqual(`.     ⮟ ++Jane++`);
  });
});
