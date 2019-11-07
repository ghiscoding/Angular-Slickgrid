import { Column, GridOption } from '../../models';
import { decimalFormatter } from '../decimalFormatter';

describe('the Decimal Formatter', () => {
  const gridStub = {
    getOptions: jest.fn()
  };

  it('should display an empty string when no value is provided', () => {
    const output = decimalFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should display original string when non-numeric value is provided', () => {
    const output = decimalFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('hello');
  });

  it('should display $0 when number 0 is provided', () => {
    const input = 0;
    const output = decimalFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe('0.00');
  });

  it('should display a number with negative dollar sign when a negative number is provided', () => {
    const input = -15;
    const output = decimalFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe('-15.00');
  });

  it('should display a number with dollar sign when a number is provided', () => {
    const input = 99;
    const output = decimalFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe('99.00');
  });

  it('should display a number with dollar sign when a string number is provided', () => {
    const input = '99';
    const output = decimalFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe('99.00');
  });

  it('should display a number with dollar sign and use "minDecimal" params', () => {
    const input = 99.1;
    const output = decimalFormatter(1, 1, input, { params: { minDecimal: 2 } } as Column, {});
    expect(output).toBe('99.10');
  });

  it('should display a number with dollar sign and use "minDecimalPlaces" (or the deprecated "decimalPlaces") params', () => {
    const input = 12345678.1;

    const output1 = decimalFormatter(1, 1, input, { params: { minDecimalPlaces: 2 } } as Column, {});
    const output2 = decimalFormatter(1, 1, input, { params: { decimalPlaces: 2 } } as Column, {});
    const output3 = decimalFormatter(1, 1, input, { params: { decimalPlaces: 2, thousandSeparator: ',' } } as Column, {});
    const output4 = decimalFormatter(1, 1, input, { params: { decimalPlaces: 2, decimalSeparator: ',', thousandSeparator: ' ' } } as Column, {});

    expect(output1).toBe('12345678.10');
    expect(output2).toBe('12345678.10');
    expect(output3).toBe('12,345,678.10');
    expect(output4).toBe('12 345 678,10');
  });

  it('should display a number with dollar sign and use "maxDecimal" params', () => {
    const input = 88.156789;
    const output = decimalFormatter(1, 1, input, { params: { maxDecimal: 3 } } as Column, {});
    expect(output).toBe(`88.157`);
  });

  it('should display a number with dollar sign and use "maxDecimalPlaces" params', () => {
    const input = 88.156789;
    const output = decimalFormatter(1, 1, input, { params: { maxDecimalPlaces: 3 } } as Column, {});
    expect(output).toBe(`88.157`);
  });

  it('should display a negative number with parentheses when "displayNegativeNumberWithParentheses" is enabled in the "params"', () => {
    const input = -2.4;
    const output = decimalFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    expect(output).toBe(`(2.40)`);
  });

  it('should display a negative number with parentheses when "displayNegativeNumberWithParentheses" is enabled and thousand separator in the "params"', () => {
    const input = -12345678.4;
    const output = decimalFormatter(1, 1, input, { params: { displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    expect(output).toBe(`(12,345,678.40)`);
  });

  it('should display a negative average with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true, minDecimal: 2 } } as GridOption);
    const input = -2.4;
    const output = decimalFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`(2.40)`);
  });

  it('should display a negative average with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled and thousand separator in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true, decimalSeparator: ',', thousandSeparator: ' ' } } as GridOption);
    const input = -12345678.4;
    const output = decimalFormatter(1, 1, input, {} as Column, {}, gridStub);
    expect(output).toBe(`(12 345 678,40)`);
  });
});
