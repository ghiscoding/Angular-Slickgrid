import { Column } from '../models';
import { dollarFormatter } from './dollarFormatter';

describe('the Dollar Formatter', () => {
  it('should display an empty string when no value is provided', () => {
    const output = dollarFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should display original string when non-numeric value is provided', () => {
    const output = dollarFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('hello');
  });

  it('should display $0 when number 0 is provided', () => {
    const input = 0;
    const output = dollarFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`$${input}`);
  });

  it('should display a number with negative dollar sign when a negative number is provided', () => {
    const input = -15;
    const output = dollarFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`$${input}`);
  });

  it('should display a number with dollar sign when a number is provided', () => {
    const input = 99;
    const output = dollarFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`$${input}`);
  });

  it('should display a number with dollar sign when a string number is provided', () => {
    const input = '99';
    const output = dollarFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`$${input}`);
  });

  it('should display a number with dollar sign and use minimum decimal set', () => {
    const input = 99.1;
    const output = dollarFormatter(1, 1, input, { params: { minDecimal: 2 } } as Column, {});
    expect(output).toBe(`$99.10`);
  });

  it('should display a number with dollar sign and use maximum decimal set', () => {
    const input = 88.156789;
    const output = dollarFormatter(1, 1, input, { params: { maxDecimal: 3 } } as Column, {});
    expect(output).toBe(`$88.157`);
  });
});
