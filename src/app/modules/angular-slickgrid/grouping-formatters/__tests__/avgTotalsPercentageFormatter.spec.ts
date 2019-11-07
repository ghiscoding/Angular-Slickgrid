import { Column, GridOption } from '../../models';
import { avgTotalsPercentageFormatter } from '../avgTotalsPercentageFormatter';

describe('avgTotalsPercentageFormatter', () => {
  // stub some methods of the SlickGrid Grid instance
  const gridStub = {
    getOptions: jest.fn()
  };

  it('should display an empty string when no value is provided', () => {
    const output = avgTotalsPercentageFormatter({}, {} as Column);
    expect(output).toBe('');
  });

  it('should display an empty string when the "avg" does not find the field property in its object', () => {
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { avg: { column1: 123, column2: 345 } };
    const output = avgTotalsPercentageFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the average number is null', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { avg: { column1: null } };
    const output = avgTotalsPercentageFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the average input is not a number', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { avg: { column1: 'abc' } };
    const output = avgTotalsPercentageFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display a negative percentage average when its input is negative', () => {
    const totals = { avg: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = avgTotalsPercentageFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2 } } as Column, {});

    expect(output1).toBe('-123%');
    expect(output2).toBe('-34.57%');
  });

  it('should display a negative percentage average and thousand separator when its input is negative', () => {
    const totals = { avg: { column1: -12345678, column2: -345678.5678, column3: -2.4 } };

    const output1 = avgTotalsPercentageFormatter(totals, { id: 'column1', field: 'column1', params: { thousandSeparator: ',' } } as Column, {});
    const output2 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, thousandSeparator: ',' } } as Column, {});
    const output3 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});

    expect(output1).toBe('-12,345,678%');
    expect(output2).toBe('-345,678.57%');
    expect(output3).toBe('-345_678,57%');
  });

  it('should display a negative percentage average with parentheses instead of the negative sign when its input is negative', () => {
    const totals = { avg: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = avgTotalsPercentageFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    const output2 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('(123%)');
    expect(output2).toBe('(34.57%)');
  });

  it('should display a negative percentage average and thousand separator with parentheses instead of the negative sign when its input is negative', () => {
    const totals = { avg: { column1: -12345678, column2: -345678.5678, column3: -2.4 } };

    const output1 = avgTotalsPercentageFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    const output2 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    const output3 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true, decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});

    expect(output1).toBe('(12,345,678%)');
    expect(output2).toBe('(345,678.57%)');
    expect(output3).toBe('(345_678,57%)');
  });

  it('should display a negative average with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true } } as GridOption);
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { avg: { column1: 123, column2: 345, column3: -2.4 } };
    const output = avgTotalsPercentageFormatter(totals, columnDef, gridStub);
    expect(output).toBe('(2%)');
  });

  it('should display a rounded percentage average number without decimals when no min/maxDecimal is defined and a number with decimals is provided', () => {
    const totals = { avg: { column1: 123.55678, column2: 345.2, column3: -2.45 } };

    const output1 = avgTotalsPercentageFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2' } as Column, {});

    expect(output1).toBe('124%');
    expect(output2).toBe('345%');
  });

  it('should display a percentage average number with user defined minimum & maximum decimal count', () => {
    const totals = { avg: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = avgTotalsPercentageFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2 } } as Column, {});
    const output2 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0 } } as Column, {});
    const output3 = avgTotalsPercentageFormatter(totals, { id: 'column3', field: 'column3', params: { minDecimal: 3, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('123.46%');
    expect(output2).toBe('345.2%');
    expect(output3).toBe('(2.450%)');
  });

  it('should display an average number with user defined minimum & maximum decimal count in his grid option', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { minDecimal: 0, maxDecimal: 3, displayNegativeNumberWithParentheses: true } } as GridOption);
    const totals = { avg: { column1: 123.45678, column2: 345, column3: -2.45 } };

    const output1 = avgTotalsPercentageFormatter(totals, { id: 'column1', field: 'column1' } as Column, gridStub);
    const output2 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2' } as Column, gridStub);
    const output3 = avgTotalsPercentageFormatter(totals, { id: 'column3', field: 'column3' } as Column, gridStub);

    expect(output1).toBe('123.457%');
    expect(output2).toBe('345%');
    expect(output3).toBe('(2.45%)');
  });

  it('should display a percentage average number a prefix and suffix', () => {
    const totals = { avg: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = avgTotalsPercentageFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'Avg: ' } } as Column, {});
    const output2 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (avg)' } } as Column, {});
    const output3 = avgTotalsPercentageFormatter(
      totals, {
        id: 'column3',
        field: 'column3',
        params: { minDecimal: 3, displayNegativeNumberWithParentheses: true, groupFormatterPrefix: 'Avg: ', groupFormatterSuffix: '/item' }
      } as Column
    );

    expect(output1).toBe('Avg: 123.46%');
    expect(output2).toBe('345.2% (avg)');
    expect(output3).toBe('Avg: (2.450%)/item');
  });

  it('should display an average number with prefix, suffix and thousand separator', () => {
    const totals = { avg: { column1: 12345678.45678, column2: 345678.2, column3: -345678.45 } };

    const output1 = avgTotalsPercentageFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'Avg: ', decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});
    const output2 = avgTotalsPercentageFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (avg)', decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});
    const output3 = avgTotalsPercentageFormatter(
      totals, {
        id: 'column3', field: 'column3',
        params: { minDecimal: 3, displayNegativeNumberWithParentheses: true, groupFormatterPrefix: 'Avg: ', groupFormatterSuffix: '/item', decimalSeparator: ',', thousandSeparator: '_' }
      } as Column);

    expect(output1).toBe('Avg: 12_345_678,46%');
    expect(output2).toBe('345_678,2% (avg)');
    expect(output3).toBe('Avg: (345_678,450%)/item');
  });
});
