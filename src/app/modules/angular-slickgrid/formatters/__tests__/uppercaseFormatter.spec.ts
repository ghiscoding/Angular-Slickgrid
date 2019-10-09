import { Column } from '../../models';
import { uppercaseFormatter } from '../uppercaseFormatter';

describe('the Uppercase Formatter', () => {
  it('should return an empty string when no value is passed', () => {
    const output = uppercaseFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should return a string all in uppercase', () => {
    const output = uppercaseFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('HELLO');
  });

  it('should return a number as a string', () => {
    const output = uppercaseFormatter(1, 1, 99, {} as Column, {});
    expect(output).toBe('99');
  });

  it('should return a boolean as a string all in uppercase', () => {
    const output = uppercaseFormatter(1, 1, false, {} as Column, {});
    expect(output).toBe('FALSE');
  });
});
