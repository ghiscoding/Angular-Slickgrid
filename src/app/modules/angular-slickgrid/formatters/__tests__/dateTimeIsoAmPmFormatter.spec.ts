import { Column } from '../../models';
import { Formatters } from '../index';

describe('the DateTimeIsoAmPm Formatter', () => {
  it('should return null when no value is provided', () => {
    const value = null;
    const result = Formatters.dateTimeIsoAmPm(0, 0, value, {} as Column, {});
    expect(result).toBe(null);
  });

  it('should return original string when input value provided is not a valid date', () => {
    const value = 'TBD';
    const result = Formatters.dateTimeIsoAmPm(0, 0, value, {} as Column, {});
    expect(result).toBe('TBD');
  });

  it('should return a formatted date value in the morning when valid date value is provided', () => {
    const value = new Date('2019-05-01T02:36:07');
    const result = Formatters.dateTimeIsoAmPm(0, 0, value, {} as Column, {});
    expect(result).toBe('2019-05-01 02:36:07 am');
  });

  it('should return a formatted date value in the afternoon when valid date value is provided', () => {
    const value = new Date('2019-05-01T20:36:07');
    const result = Formatters.dateTimeIsoAmPm(0, 0, value, {} as Column, {});
    expect(result).toBe('2019-05-01 08:36:07 pm');
  });
});
