import { Column, GridOption } from '../../models';
import { percentFormatter } from '../percentFormatter';

describe('the Percent Symbol Formatter', () => {
  const gridStub = {
    getOptions: jest.fn()
  };

  it('should display an empty string when no value is provided', () => {
    const output = percentFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should display original string when non-numeric value is provided', () => {
    const output = percentFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('hello');
  });

  it('should display 0% when number 0 is provided', () => {
    const input = 0;
    const output = percentFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`${input}%`);
  });

  it('should display -15% when the negative number -.15 is provided', () => {
    const input = -.15;
    const output = percentFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe('-15%');
  });

  it('should display 99.5% when number 0.995 is provided', () => {
    const input = 0.995;
    const output = percentFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe('99.5%');
  });

  it('should display 88% when the string "0.88" is provided', () => {
    const input = '0.88';
    const output = percentFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe('88%');
  });

  it('should display thousand separated percentage when the thousand separator is provided', () => {
    const input = '345678';
    const output = percentFormatter(1, 1, input, { params: { thousandSeparator: ',' } } as Column, {});
    expect(output).toBe('34,567,800%');
  });

  it('should display a negative number with parentheses when "displayNegativeNumberWithParentheses" is enabled in the "params"', () => {
    const input = -0.024;
    const output = percentFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    expect(output).toBe(`(2.4%)`);
  });

  it('should display a negative number with thousand separator and parentheses when "displayNegativeNumberWithParentheses" is enabled in the "params"', () => {
    const input = -345678.024;
    const output = percentFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    expect(output).toBe(`(34,567,802.4%)`);
  });

  it('should display a negative average with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true, minDecimal: 2 } } as GridOption);
    const input = -0.024;
    const output = percentFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`(2.40%)`);
  });

  it('should display a negative average with thousand separator and parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true, minDecimal: 2, decimalSeparator: ',', thousandSeparator: '_' } } as GridOption);
    const input = -345678.024;
    const output = percentFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`(34_567_802,40%)`);
  });
});
