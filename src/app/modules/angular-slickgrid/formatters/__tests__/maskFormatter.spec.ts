import { Column } from '../../models';
import { maskFormatter } from '../maskFormatter';

describe('the ArrayObjectToCsv Formatter', () => {
  it('should throw an error when omitting to pass "propertyNames" to "params"', () => {
    expect(() => maskFormatter(0, 0, 'anything', {} as Column, {}))
      .toThrowError('You must provide a "mask" via the generic "params" options');
  });

  it('should throw an error when omitting to pass "propertyNames" to "params"', () => {
    const params = { mask: '' };
    expect(() => maskFormatter(0, 0, 'anything', { field: 'user', params } as Column, {}))
      .toThrowError('You must provide a "mask" via the generic "params" options');
  });

  it('should return null when no value is provided', () => {
    const input = null;
    const params = { mask: '(000) 000-0000' };
    const result = maskFormatter(0, 0, input, { field: 'user', params } as Column, {});
    expect(result).toBe(null);
  });

  it('should return formatted output according to mask when mask includes only numbers', () => {
    const params = { mask: '(000) 000-0000' };
    const inputValue = '123456789013';
    const result = maskFormatter(0, 0, inputValue, { field: 'user', params } as Column, {});
    expect(result).toBe('(123) 456-7890');
  });

  it('should return formatted output without extra digits that are not included in the mask', () => {
    const params = { mask: '(000) 000-0000' };
    const inputValue = '1234567890135455454';
    const result = maskFormatter(0, 0, inputValue, { field: 'user', params } as Column, {});
    expect(result).toBe('(123) 456-7890');
  });

  it('should return partially formatted output when input (digits only) length is shorter than mask', () => {
    const params = { mask: '(000) 000-0000' };
    const inputValue = '123456';
    const result = maskFormatter(0, 0, inputValue, { field: 'user', params } as Column, {});
    expect(result).toBe('(123) 456-');
  });

  it('should return formatted output (postal code) according to mask when mask includes both numbers and characters', () => {
    const params = { mask: 'A0A 0A0' };
    const inputValue = 'H0H0H0';
    const result = maskFormatter(0, 0, inputValue, { field: 'user', params } as Column, {});
    expect(result).toBe('H0H 0H0');
  });

  it('should return formatted output (postal code) without extra characters that are not included in the mask', () => {
    const params = { mask: 'A0A 0A0' };
    const inputValue = 'H0H0H0324343asdds';
    const result = maskFormatter(0, 0, inputValue, { field: 'user', params } as Column, {});
    expect(result).toBe('H0H 0H0');
  });

  it('should return partially formatted output when input (characters only) length is shorter than mask', () => {
    const params = { mask: 'A0A 0A0' };
    const inputValue = 'H0H0';
    const result = maskFormatter(0, 0, inputValue, { field: 'user', params } as Column, {});
    expect(result).toBe('H0H 0');
  });
});
