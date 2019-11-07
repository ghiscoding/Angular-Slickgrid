import { Column, GridOption } from '../../models';
import { dollarColoredFormatter } from '../dollarColoredFormatter';

describe('the DollarColored Formatter', () => {
  const gridStub = {
    getOptions: jest.fn()
  };

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
    expect(output).toBe(`<span style="color:green">$0.00</span>`);
  });

  it('should display a red number with dollar symbol when value is a negative number', () => {
    const input = -15;
    const output = dollarColoredFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style="color:red">-$15.00</span>`);
  });

  it('should display a red number with dollar symbol and thousand separator when value is a negative number', () => {
    const input = -12345678;
    const output = dollarColoredFormatter(1, 1, input, { params: { thousandSeparator: ',' } } as Column, {});
    expect(output).toBe(`<span style="color:red">-$12,345,678.00</span>`);
  });

  it('should display a green number with dollar symbol when value greater or equal to 70 and is a type string', () => {
    const input = '70';
    const output = dollarColoredFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style="color:green">$70.00</span>`);
  });

  it('should display a green number with dollar symbol with percentage of 100% when number is greater than 100 is provided', () => {
    const input = 125;
    const output = dollarColoredFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style="color:green">$125.00</span>`);
  });

  it('should display a number with dollar sign and use minimum decimal set', () => {
    const input = 99.1;
    const output = dollarColoredFormatter(1, 1, input, { params: { minDecimal: 2 } } as Column, {});
    expect(output).toBe(`<span style="color:green">$99.10</span>`);
  });

  it('should display a number with dollar sign and use maximum decimal set', () => {
    const input = 88.156789;
    const output = dollarColoredFormatter(1, 1, input, { params: { maxDecimal: 3 } } as Column, {});
    expect(output).toBe(`<span style="color:green">$88.157</span>`);
  });

  it('should display a negative number with parentheses when "displayNegativeNumberWithParentheses" is enabled in the "params"', () => {
    const input = -2.4;
    const output = dollarColoredFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    expect(output).toBe(`<span style="color:red">($2.40)</span>`);
  });

  it('should display a negative number with parentheses when "displayNegativeNumberWithParentheses" is enabled and thousand separator in the "params"', () => {
    const input = -12345678.4;
    const output = dollarColoredFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    expect(output).toBe(`<span style="color:red">($12,345,678.40)</span>`);
  });

  it('should display a negative average with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true } } as GridOption);
    const input = -2.4;
    const output = dollarColoredFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`<span style="color:red">($2.40)</span>`);
  });
  it('should display a negative average with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled and thousand separator in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true, decimalSeparator: ',', thousandSeparator: ' ' } } as GridOption);
    const input = -12345678.4;
    const output = dollarColoredFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`<span style="color:red">($12 345 678,40)</span>`);
  });
});
