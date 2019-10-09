import { Column } from '../../models';
import { boldFormatter } from '../boldFormatter';

describe('the Bold Formatter', () => {
  it('should return an empty string when no value is passed', () => {
    const value = null;
    const result = boldFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('');
  });

  it('should return a bold html formatted string when value is filled', () => {
    const value = 'john';
    const result = boldFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe(`<b>${value}</b>`);
  });
});
