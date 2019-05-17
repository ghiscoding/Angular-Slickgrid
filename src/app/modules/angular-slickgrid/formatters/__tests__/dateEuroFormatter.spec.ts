import { Column } from '../../models';
import { Formatters } from '../index';

describe('the DateEuro Formatter', () => {
  it('should return null when no value is provided', () => {
    const value = null;
    const result = Formatters.dateEuro(0, 0, value, {} as Column, {});
    expect(result).toBe(null);
  });

  it('should return original string when input value provided is not a valid date', () => {
    const value = 'TBD';
    const result = Formatters.dateEuro(0, 0, value, {} as Column, {});
    expect(result).toBe('TBD');
  });

  it('should return a formatted date value without time when valid date value is provided', () => {
    const value = new Date('2019-05-03T00:00:01');
    const result = Formatters.dateEuro(0, 0, value, {} as Column, {});
    expect(result).toBe('03/05/2019');
  });

  it('should return a formatted date value without time when valid date value is provided', () => {
    const value = new Date('2019-05-01T02:36:07');
    const result = Formatters.dateEuro(0, 0, value, {} as Column, {});
    expect(result).toBe('01/05/2019');
  });
});
