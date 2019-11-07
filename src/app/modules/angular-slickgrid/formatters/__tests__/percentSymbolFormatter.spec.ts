import { Column, GridOption } from '../../models';
import { percentSymbolFormatter } from '../percentSymbolFormatter';

describe('the Percent Symbol Formatter', () => {
  const gridStub = {
    getOptions: jest.fn()
  };

  it('should display an empty string when no value is provided', () => {
    const output = percentSymbolFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should display original string when non-numeric value is provided', () => {
    const output = percentSymbolFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('hello');
  });

  it('should display 0% when number 0 is provided', () => {
    const input = 0;
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`0%`);
  });

  it('should display a number with negative percentage sign when a negative number is provided', () => {
    const input = -15;
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`-15%`);
  });

  it('should display a number with thousand separator and negative percentage sign when a negative number is provided', () => {
    const input = -15;
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`-15%`);
  });

  it('should display a number with percentage sign when a number is provided', () => {
    const input = 99;
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`99%`);
  });

  it('should display a number with thousand separator and  percentage sign when a number is provided', () => {
    const input = 2345678;
    const output = percentSymbolFormatter(1, 1, input, { params: { thousandSeparator: ',' } } as Column, {});
    expect(output).toBe(`2,345,678%`);
  });

  it('should display a number with percentage sign when a string number is provided', () => {
    const input = '99';
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`99%`);
  });

  it('should display a number with thousand separator and  percentage sign when a string number is provided', () => {
    const input = '2345678';
    const output = percentSymbolFormatter(1, 1, input, { params: { thousandSeparator: ',' } } as Column, {});
    expect(output).toBe(`2,345,678%`);
  });

  it('should display a negative number with parentheses when "displayNegativeNumberWithParentheses" is enabled in the "params"', () => {
    const input = -2.4;
    const output = percentSymbolFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    expect(output).toBe(`(2.4%)`);
  });

  it('should display a negative number with thousand separator and parentheses when "displayNegativeNumberWithParentheses" is enabled in the "params"', () => {
    const input = -2345678.4;
    const output = percentSymbolFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    expect(output).toBe(`(2,345,678.4%)`);
  });

  it('should display a negative average with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true, minDecimal: 2 } } as GridOption);
    const input = -2.4;
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`(2.40%)`);
  });

  it('should display a negative average with thousand separator and parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true, minDecimal: 2, decimalSeparator: ',', thousandSeparator: '_' } } as GridOption);
    const input = -2345678.4;
    const output = percentSymbolFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`(2_345_678,40%)`);
  });
});
