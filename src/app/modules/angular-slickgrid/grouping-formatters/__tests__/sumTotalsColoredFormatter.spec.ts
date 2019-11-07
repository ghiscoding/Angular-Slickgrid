import { Column, GridOption } from '../../models';
import { sumTotalsColoredFormatter } from '../sumTotalsColoredFormatter';

describe('sumTotalsColoredFormatter', () => {
  // stub some methods of the SlickGrid Grid instance
  const gridStub = {
    getOptions: jest.fn()
  };

  it('should display an empty string when no value is provided', () => {
    const output = sumTotalsColoredFormatter({}, {} as Column);
    expect(output).toBe('');
  });

  it('should display an empty string when the "sum" does not find the field property in its object', () => {
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { sum: { column1: 123, column2: 345 } };
    const output = sumTotalsColoredFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the sum property is null', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { sum: { column1: null } };
    const output = sumTotalsColoredFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the average input is not a number', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { sum: { column1: 'abc' } };
    const output = sumTotalsColoredFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display a negative sum in red when its input is negative', () => {
    const totals = { sum: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = sumTotalsColoredFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2 } } as Column, {});

    expect(output1).toBe('<span style="color:red">-123</span>');
    expect(output2).toBe('<span style="color:red">-34.57</span>');
  });

  it('should display a negative sum and thousand separator when its input is negative', () => {
    const totals = { sum: { column1: -12345678, column2: -345678.5678, column3: -2.4 } };

    const output1 = sumTotalsColoredFormatter(totals, { id: 'column1', field: 'column1', params: { thousandSeparator: ',' } } as Column, {});
    const output2 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, thousandSeparator: ',' } } as Column, {});
    const output3 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});

    expect(output1).toBe('<span style="color:red">-12,345,678</span>');
    expect(output2).toBe('<span style="color:red">-345,678.57</span>');
    expect(output3).toBe('<span style="color:red">-345_678,57</span>');
  });

  it('should display a negative sum with parentheses instead of the negative sign when its input is negative', () => {
    const totals = { sum: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = sumTotalsColoredFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    const output2 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('<span style="color:red">(123)</span>');
    expect(output2).toBe('<span style="color:red">(34.57)</span>');
  });

  it('should display a negative sum with thousand separator and parentheses instead of the negative sign when its input is negative', () => {
    const totals = { sum: { column1: -12345678, column2: -345678.5678, column3: -2.4 } };

    const output1 = sumTotalsColoredFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    const output2 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    const output3 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true, decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});

    expect(output1).toBe('<span style="color:red">(12,345,678)</span>');
    expect(output2).toBe('<span style="color:red">(345,678.57)</span>');
    expect(output3).toBe('<span style="color:red">(345_678,57)</span>');
  });

  it('should display a negative sum with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true } } as GridOption);
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { sum: { column1: 123, column2: 345, column3: -2.4 } };
    const output = sumTotalsColoredFormatter(totals, columnDef, gridStub);
    expect(output).toBe('<span style="color:red">(2.4)</span>');
  });

  it('should display a positive green sum number even when displayNegativeNumberWithParentheses is enabled', () => {
    const totals = { sum: { column1: 123, column2: 34.5678, column3: 2.4 } };

    const output1 = sumTotalsColoredFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    const output2 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('<span style="color:green">123</span>');
    expect(output2).toBe('<span style="color:green">34.57</span>');
  });

  it('should display the same sum value in green when a number with decimals is provided', () => {
    const totals = { sum: { column1: 123.55678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsColoredFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2' } as Column, {});

    expect(output1).toBe('<span style="color:green">123.55678</span>');
    expect(output2).toBe('<span style="color:green">345.2</span>');
  });

  it('should display an sum number with user defined minimum & maximum decimal count in his grid option', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { minDecimal: 0, maxDecimal: 3, displayNegativeNumberWithParentheses: true } } as GridOption);
    const totals = { sum: { column1: 123.45678, column2: 345, column3: -2.45 } };

    const output1 = sumTotalsColoredFormatter(totals, { id: 'column1', field: 'column1' } as Column, gridStub);
    const output2 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2' } as Column, gridStub);
    const output3 = sumTotalsColoredFormatter(totals, { id: 'column3', field: 'column3' } as Column, gridStub);

    expect(output1).toBe('<span style="color:green">123.457</span>');
    expect(output2).toBe('<span style="color:green">345</span>');
    expect(output3).toBe('<span style="color:red">(2.45)</span>');
  });

  it('should display a sum number in green (or red for negative) with user defined minimum & maximum decimal count', () => {
    const totals = { sum: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsColoredFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2 } } as Column, {});
    const output2 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0 } } as Column, {});
    const output3 = sumTotalsColoredFormatter(totals, { id: 'column3', field: 'column3', params: { minDecimal: 3, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('<span style="color:green">123.46</span>');
    expect(output2).toBe('<span style="color:green">345.2</span>');
    expect(output3).toBe('<span style="color:red">(2.450)</span>');
  });

  it('should display a sum number a prefix and suffix', () => {
    const totals = { sum: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsColoredFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'sum: ' } } as Column, {});
    const output2 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (max)' } } as Column, {});
    const output3 = sumTotalsColoredFormatter(
      totals, {
        id: 'column3',
        field: 'column3',
        params: { minDecimal: 3, displayNegativeNumberWithParentheses: true, groupFormatterPrefix: 'sum: ', groupFormatterSuffix: '/item' }
      } as Column
    );

    expect(output1).toBe('<span style="color:green">sum: 123.46</span>');
    expect(output2).toBe('<span style="color:green">345.2 (max)</span>');
    expect(output3).toBe('<span style="color:red">sum: (2.450)/item</span>');
  });

  it('should display a sum number with prefix, suffix and thousand separator', () => {
    const totals = { sum: { column1: 12345678.45678, column2: 345678.2, column3: -345678.45 } };

    const output1 = sumTotalsColoredFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'Sum: ', decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});
    const output2 = sumTotalsColoredFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (sum)', decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});
    const output3 = sumTotalsColoredFormatter(
      totals, {
        id: 'column3', field: 'column3',
        params: { minDecimal: 3, displayNegativeNumberWithParentheses: true, groupFormatterPrefix: 'Sum: ', groupFormatterSuffix: '/item', decimalSeparator: ',', thousandSeparator: '_' }
      } as Column);

    expect(output1).toBe('<span style="color:green">Sum: 12_345_678,46</span>');
    expect(output2).toBe('<span style="color:green">345_678,2 (sum)</span>');
    expect(output3).toBe('<span style="color:red">Sum: (345_678,450)/item</span>');
  });
});
