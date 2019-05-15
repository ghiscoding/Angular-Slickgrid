import { Column } from '../../models';
import { lowercaseFormatter } from '../lowercaseFormatter';

describe('the Lowercase Formatter', () => {
  it('should return an empty string when no value is passed', async () => {
    const output = lowercaseFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should return a string all in lowercase', () => {
    const output = lowercaseFormatter(1, 1, 'HeLlo', {} as Column, {});
    expect(output).toBe('hello');
  });

  it('should return a number as a string', () => {
    const output = lowercaseFormatter(1, 1, 99, {} as Column, {});
    expect(output).toBe('99');
  });

  it('should return a boolean as a string all in lowercase', () => {
    const output = lowercaseFormatter(1, 1, false, {} as Column, {});
    expect(output).toBe('false');
  });
});
