import { Column, DataView, GridOption, SlickGrid } from '../../models/index';
import { treeFormatter } from '../treeFormatter';

const dataViewStub = {
  getIdxById: jest.fn(),
  getItemByIdx: jest.fn(),
  getIdPropertyName: jest.fn(),
} as unknown as DataView;

const gridStub = {
  getData: jest.fn(),
  getOptions: jest.fn(),
} as unknown as SlickGrid;

describe('the Uppercase Formatter', () => {
  let dataset;
  let mockGridOptions: GridOption;

  beforeEach(() => {
    dataset = [
      { id: 0, firstName: 'John', lastName: 'Smith', fullName: 'John Smith', email: 'john.smith@movie.com', address: { zip: 123456 }, parentId: null, indent: 0 },
      { id: 1, firstName: 'Jane', lastName: 'Doe', fullName: 'Jane Doe', email: 'jane.doe@movie.com', address: { zip: 222222 }, parentId: 0, indent: 1 },
      { id: 2, firstName: 'Bob', lastName: 'Cane', fullName: 'Bob Cane', email: 'bob.cane@movie.com', address: { zip: 333333 }, parentId: 1, indent: 2, __collapsed: true },
      { id: 3, firstName: 'Barbara', lastName: 'Cane', fullName: 'Barbara Cane', email: 'barbara.cane@movie.com', address: { zip: 444444 }, parentId: null, indent: 0, __collapsed: true },
      { id: 4, firstName: 'Anonymous', lastName: 'Doe', fullName: 'Anonymous < Doe', email: 'anonymous.doe@anom.com', address: { zip: 556666 }, parentId: null, indent: 0, __collapsed: true },
    ];
    mockGridOptions = {
      treeDataOptions: { levelPropName: 'indent' }
    } as GridOption;
    jest.spyOn(gridStub, 'getOptions').mockReturnValue(mockGridOptions);
  });

  it('should throw an error when oarams are mmissing', () => {
    expect(() => treeFormatter(1, 1, 'blah', {} as Column, {}, gridStub))
      .toThrowError('You must provide valid "treeDataOptions" in your Grid Options and it seems that there are no tree level found in this row');
  });

  it('should return empty string when DataView is not correctly formed', () => {
    const output = treeFormatter(1, 1, '', {} as Column, dataset[1], gridStub);
    expect(output).toBe('');
  });

  it('should return empty string when value is null', () => {
    const output = treeFormatter(1, 1, null, {} as Column, dataset[1], gridStub);
    expect(output).toBe('');
  });

  it('should return empty string when value is undefined', () => {
    const output = treeFormatter(1, 1, undefined, {} as Column, dataset[1], gridStub);
    expect(output).toBe('');
  });

  it('should return empty string when item is undefined', () => {
    const output = treeFormatter(1, 1, 'blah', {} as Column, undefined, gridStub);
    expect(output).toBe('');
  });

  it('should return a span without any icon and ', () => {
    jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
    jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(1);
    jest.spyOn(dataViewStub, 'getItemByIdx').mockReturnValue(dataset[0]);

    const output = treeFormatter(1, 1, dataset[0]['firstName'], {} as Column, dataset[0], gridStub);
    expect(output).toBe(`<span style="display:inline-block; width:0px;"></span><span class="slick-group-toggle"></span>&nbsp;John`);
  });

  it('should return a span without any icon and 15px indentation of a tree level 1', () => {
    jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
    jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(1);
    jest.spyOn(dataViewStub, 'getItemByIdx').mockReturnValue(dataset[1]);

    const output = treeFormatter(1, 1, dataset[1]['firstName'], {} as Column, dataset[1], gridStub);
    expect(output).toBe(`<span style="display:inline-block; width:15px;"></span><span class="slick-group-toggle"></span>&nbsp;Jane`);
  });

  it('should return a span without any icon and 30px indentation of a tree level 2', () => {
    jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
    jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(1);
    jest.spyOn(dataViewStub, 'getItemByIdx').mockReturnValue(dataset[1]);

    const output = treeFormatter(1, 1, dataset[2]['firstName'], {} as Column, dataset[2], gridStub);
    expect(output).toBe(`<span style="display:inline-block; width:30px;"></span><span class="slick-group-toggle"></span>&nbsp;Bob`);
  });

  it('should return a span with expanded icon and 15px indentation of a tree level 1 when current item is greater than next item', () => {
    jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
    jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(1);
    jest.spyOn(dataViewStub, 'getItemByIdx').mockReturnValue(dataset[2]);

    const output = treeFormatter(1, 1, dataset[1]['firstName'], {} as Column, dataset[1], gridStub);
    expect(output).toBe(`<span style="display:inline-block; width:15px;"></span><span class="slick-group-toggle expanded"></span>&nbsp;Jane`);
  });

  it('should return a span with collapsed icon and 0px indentation of a tree level 0 when current item is lower than next item', () => {
    jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
    jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(1);
    jest.spyOn(dataViewStub, 'getItemByIdx').mockReturnValue(dataset[1]);

    const output = treeFormatter(1, 1, dataset[3]['firstName'], {} as Column, dataset[3], gridStub);
    expect(output).toBe(`<span style="display:inline-block; width:0px;"></span><span class="slick-group-toggle collapsed"></span>&nbsp;Barbara`);
  });

  it('should execute "queryFieldNameGetterFn" callback to get field name to use when it is defined', () => {
    jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
    jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(1);
    jest.spyOn(dataViewStub, 'getItemByIdx').mockReturnValue(dataset[1]);

    const mockColumn = { id: 'firstName', field: 'firstName', queryFieldNameGetterFn: (dataContext) => 'fullName' } as Column;
    const output = treeFormatter(1, 1, null, mockColumn as Column, dataset[3], gridStub);
    expect(output).toBe(`<span style="display:inline-block; width:0px;"></span><span class="slick-group-toggle collapsed"></span>&nbsp;Barbara Cane`);
  });

  it('should execute "queryFieldNameGetterFn" callback to get field name and also apply html encoding when output value includes a character that should be encoded', () => {
    jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
    jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(2);
    jest.spyOn(dataViewStub, 'getItemByIdx').mockReturnValue(dataset[2]);

    const mockColumn = { id: 'firstName', field: 'firstName', queryFieldNameGetterFn: (dataContext) => 'fullName' } as Column;
    const output = treeFormatter(1, 1, null, mockColumn as Column, dataset[4], gridStub);
    expect(output).toBe(`<span style="display:inline-block; width:0px;"></span><span class="slick-group-toggle collapsed"></span>&nbsp;Anonymous &lt; Doe`);
  });

  it('should execute "queryFieldNameGetterFn" callback to get field name, which has (.) dot notation reprensenting complex object', () => {
    jest.spyOn(gridStub, 'getData').mockReturnValue(dataViewStub);
    jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(1);
    jest.spyOn(dataViewStub, 'getItemByIdx').mockReturnValue(dataset[1]);

    const mockColumn = { id: 'zip', field: 'zip', queryFieldNameGetterFn: (dataContext) => 'address.zip' } as Column;
    const output = treeFormatter(1, 1, null, mockColumn as Column, dataset[3], gridStub);
    expect(output).toBe(`<span style="display:inline-block; width:0px;"></span><span class="slick-group-toggle collapsed"></span>&nbsp;444444`);
  });
});
