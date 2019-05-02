import { Column } from '../models';
import { dollarColoredFormatter } from './dollarColoredFormatter';

describe('the DollarColored Formatter', () => {
  it('should return an empty string when no value is provided', () => {
    const output = dollarColoredFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should display original string when non-numeric value is provided', () => {
    const output = dollarColoredFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('hello');
  });

  it('should display a green number with dollar symbol formatter when number 0 is provided', () => {
    const input = 0;
    const output = dollarColoredFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style="color:green;">$${input}</span>`);
  });

  it('should display a red number with dollar symbol when value is a negative number', () => {
    const input = -15;
    const output = dollarColoredFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style="color:red;">$${input}</span>`);
  });

  it('should display a green number with dollar symbol when value greater or equal to 70 and is a type string', () => {
    const input = '70';
    const output = dollarColoredFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style="color:green;">$${input}</span>`);
  });

  it('should display a green number with dollar symbol with percentage of 100% when number is greater than 100 is provided', () => {
    const input = 125;
    const output = dollarColoredFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style="color:green;">$${input}</span>`);
  });

  it('should display a number with dollar sign and use minimum decimal set', () => {
    const input = 99.1;
    const output = dollarColoredFormatter(1, 1, input, { params: { minDecimal: 2 } } as Column, {});
    expect(output).toBe(`<span style="color:green;">$99.10</span>`);
  });

  it('should display a number with dollar sign and use maximum decimal set', () => {
    const input = 88.156789;
    const output = dollarColoredFormatter(1, 1, input, { params: { maxDecimal: 3 } } as Column, {});
    expect(output).toBe(`<span style="color:green;">$88.157</span>`);
  });
});
