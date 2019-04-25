import { Column } from '../models';
import { percentSymbolFormatter } from './percentSymbolFormatter';

describe('the Percent Symbol Formatter', () => {
  it('should display an empty string when no value is provided', async () => {
    const output = percentSymbolFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should display original string when non-numeric value is provided', async () => {
    const output = percentSymbolFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('hello');
  });

  it('should display 0% when number 0 is provided', async () => {
    const input = 0;
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`${input}%`);
  });

  it('should display a number with negative percentage sign when a negative number is provided', async () => {
    const input = -15;
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`${input}%`);
  });

  it('should display a number with percentage sign when a number is provided', async () => {
    const input = 99;
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`${input}%`);
  });

  it('should display a number with percentage sign when a string number is provided', async () => {
    const input = '99';
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`${input}%`);
  });
});
