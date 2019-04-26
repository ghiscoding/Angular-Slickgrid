import { Column } from '../models';
import { checkmarkFormatter } from './checkmarkFormatter';

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

  it('should return the Font Awesome Checkmark icon when input is True', () => {
    const value = true;
    const result = checkmarkFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('<i class="fa fa-check checkmark-icon" aria-hidden="true"></i>');
  });

  it('should return the Font Awesome Checkmark icon when input is filled with any string', () => {
    const value = 'anything';
    const result = checkmarkFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('<i class="fa fa-check checkmark-icon" aria-hidden="true"></i>');
  });
});
