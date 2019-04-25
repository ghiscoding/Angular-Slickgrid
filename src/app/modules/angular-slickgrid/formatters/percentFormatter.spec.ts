import { Column } from '../models';
import { percentFormatter } from './percentFormatter';

describe('the Percent Symbol Formatter', () => {
  it('should display an empty string when no value is provided', async () => {
    const output = percentFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should display original string when non-numeric value is provided', async () => {
    const output = percentFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('hello');
  });

  it('should display 0% when number 0 is provided', async () => {
    const input = 0;
    const output = percentFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`${input}%`);
  });

  it('should display -15% when the negative number -.15 is provided', async () => {
    const input = -.15;
    const output = percentFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe('-15%');
  });

  it('should display 99.5% when number 0.995 is provided', async () => {
    const input = 0.995;
    const output = percentFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe('99.5%');
  });

  it('should display 88% when the string "0.88" is provided', async () => {
    const input = '0.88';
    const output = percentFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe('88%');
  });
});
