import { Column } from '../../models';
import { checkmarkFormatter } from '../checkmarkFormatter';

describe('the Checkmark Formatter', () => {
  it('should return an empty string when no value is passed', () => {
    const value = null;
    const result = checkmarkFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('');
  });

  it('should return an empty string when False is provided', () => {
    const value = false;
    const result = checkmarkFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('');
  });

  it('should return an empty string when the string "FALSE" (case insensitive) is provided', () => {
    const value = 'FALSE';
    const result1 = checkmarkFormatter(0, 0, value.toLowerCase(), {} as Column, {});
    const result2 = checkmarkFormatter(0, 0, value.toUpperCase(), {} as Column, {});
    expect(result1).toBe('');
    expect(result2).toBe('');
  });

  it('should return the Font Awesome Checkmark icon when the string "True" (case insensitive) is provided', () => {
    const value = 'True';
    const result1 = checkmarkFormatter(0, 0, value.toLowerCase(), {} as Column, {});
    const result2 = checkmarkFormatter(0, 0, value.toUpperCase(), {} as Column, {});
    expect(result1).toBe('<i class="fa fa-check checkmark-icon" aria-hidden="true"></i>');
    expect(result2).toBe('<i class="fa fa-check checkmark-icon" aria-hidden="true"></i>');
  });

  it('should return the Font Awesome Checkmark icon when input is True', () => {
    const value = true;
    const result = checkmarkFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('<i class="fa fa-check checkmark-icon" aria-hidden="true"></i>');
  });
});
