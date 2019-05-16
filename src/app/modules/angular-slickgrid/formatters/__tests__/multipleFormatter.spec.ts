import { Column } from '../../models';
import { boldFormatter } from '../boldFormatter';
import { italicFormatter } from '../italicFormatter';
import { multipleFormatter } from '../multipleFormatter';

describe('the Multiple Formatter', () => {
  it('should return text output wrapped first as bold then wrapped as italic html formatted string', () => {
    const value = 'john';
    const params = { formatters: [boldFormatter, italicFormatter] };
    const result = multipleFormatter(0, 0, value, { params } as Column, {});
    expect(result).toBe(`<i><b>${value}</b></i>`);
  });

  it('should expect the first formatter to be the last wrapped format and not the other way around', () => {
    const value = 'john';
    const params = { formatters: [boldFormatter, italicFormatter] };
    const result = multipleFormatter(0, 0, value, { params } as Column, {});
    expect(result).toBe(`<i><b>${value}</b></i>`);
    expect(result).not.toBe(`<b><i>${value}</i></b>`);
  });

  it('should throw an error when "formatters" is missing from the column definition "params"', () => {
    expect(() => multipleFormatter(1, 1, null, {} as Column, {})).toThrowError('The multiple formatter requires the "formatters" to be provided');
  });
});
