import { Column, GridOption } from '../../models';
import { percentCompleteFormatter } from '../percentCompleteFormatter';

describe('the Percent Complete Formatter', () => {
  const gridStub = {
    getOptions: jest.fn()
  };

  it('should return an empty string when no value is provided', () => {
    const output = percentCompleteFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should return original string when non-numeric value is provided', () => {
    const output = percentCompleteFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('hello');
  });

  it('should display a red color percentage when number 0 is provided', () => {
    const input = 0;
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style='color:red'>0%</span>`);
  });

  it('should display a red color percentage when a negative number is provided', () => {
    const input = -15;
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style='color:red'>-15%</span>`);
  });

  it('should display a green color percentage when a positive number greater or equal to 50 is provided', () => {
    const input = 50;
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style='color:green'>50%</span>`);
  });

  it('should display a green color percentage when a positive number greater than 50 and is a type string is provided', () => {
    const input = '99';
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style='color:green'>99%</span>`);
  });

  it('should display a green color percentage of 100% when number is greater than 100 is provided', () => {
    const input = 125;
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style='color:green'>100%</span>`);
  });

  it('should display a negative percentage with parentheses when "displayNegativeNumberWithParentheses" is enabled in the "params"', () => {
    const input = -2.4;
    const output = percentCompleteFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    expect(output).toBe(`<span style='color:red'>(2.4%)</span>`);
  });

  it('should display a negative number with thousand separator and parentheses when "displayNegativeNumberWithParentheses" is enabled in the "params"', () => {
    const input = -345678.024;
    const output = percentCompleteFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    expect(output).toBe(`<span style='color:red'>(345,678.024%)</span>`);
  });

  it('should display a negative percentage with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true, minDecimal: 2 } } as GridOption);
    const input = -2.4;
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`<span style='color:red'>(2.40%)</span>`);
  });

  it('should display a negative average with thousand separator and parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true, minDecimal: 2, decimalSeparator: ',', thousandSeparator: '_' } } as GridOption);
    const input = -345678.024;
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`<span style='color:red'>(345_678,02%)</span>`);
  });
});
