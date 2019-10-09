import { Column } from '../../models';
import { checkboxFormatter } from '../checkboxFormatter';

describe('the Checkbox Formatter', () => {
  it('should return an empty string when no value is passed', () => {
    const value = null;
    const result = checkboxFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('');
  });

  it('should return an empty string when False is provided', () => {
    const value = false;
    const result = checkboxFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('');
  });

  it('should return the unicode value of a checkbox when input is True', () => {
    const value = true;
    const result = checkboxFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('&#x2611;');
  });

  it('should return the unicode value of a checkbox when input is filled with any string', () => {
    const value = 'anything';
    const result = checkboxFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('&#x2611;');
  });
});
