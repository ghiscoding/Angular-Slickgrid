import { Column } from '../../models';
import { yesNoFormatter } from '../yesNoFormatter';

describe('the Uppercase Formatter', () => {
  it('should return a "Yes" string when value is passed', () => {
    const output = yesNoFormatter(1, 1, 'blah', {} as Column, {});
    expect(output).toBe('Yes');
  });

  it('should return the string "No" string when empty string provided', () => {
    const output = yesNoFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('No');
  });

  it('should return the string "No" string when value is null', () => {
    const output = yesNoFormatter(1, 1, null, {} as Column, {});
    expect(output).toBe('No');
  });
});
