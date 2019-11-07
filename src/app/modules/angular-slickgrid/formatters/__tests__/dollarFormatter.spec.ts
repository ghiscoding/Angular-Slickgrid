import { Column, GridOption } from '../../models';
import { dollarFormatter } from '../dollarFormatter';

describe('the Dollar Formatter', () => {
  const gridStub = {
    getOptions: jest.fn()
  };

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
    expect(output).toBe(`$0.00`);
  });

  it('should display a number with negative dollar sign when a negative number is provided', () => {
    const input = -15;
    const output = dollarFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`-$15.00`);
  });

  it('should display a number with negative dollar sign when a negative number and thousand separator is provided', () => {
    const input = -12345678;
    const output = dollarFormatter(1, 1, input, { params: { thousandSeparator: ',' } } as Column, {});
    expect(output).toBe(`-$12,345,678.00`);
  });

  it('should display a number with dollar sign when a number is provided', () => {
    const input = 99;
    const output = dollarFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`$99.00`);
  });

  it('should display a number with dollar sign when a string number is provided', () => {
    const input = '99';
    const output = dollarFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`$99.00`);
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

  it('should display a negative number with parentheses when "displayNegativeNumberWithParentheses" is enabled in the "params"', () => {
    const input = -2.4;
    const output = dollarFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    expect(output).toBe(`($2.40)`);
  });

  it('should display a negative number with parentheses when "displayNegativeNumberWithParentheses" is enabled and thousand separator in the "params"', () => {
    const input = -12345678.4;
    const output = dollarFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    expect(output).toBe(`($12,345,678.40)`);
  });

  it('should display a negative average with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true } } as GridOption);
    const input = -2.4;
    const output = dollarFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`($2.40)`);
  });

  it('should display a negative average with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled and thousand separator in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true, decimalSeparator: ',', thousandSeparator: ' ' } } as GridOption);
    const input = -12345678.4;
    const output = dollarFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`($12 345 678,40)`);
  });
});
