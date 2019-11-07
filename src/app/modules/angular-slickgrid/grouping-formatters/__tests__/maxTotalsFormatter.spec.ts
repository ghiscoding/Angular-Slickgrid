import { Column, GridOption } from '../../models';
import { maxTotalsFormatter } from '../maxTotalsFormatter';

describe('maxTotalsFormatter', () => {
  // stub some methods of the SlickGrid Grid instance
  const gridStub = {
    getOptions: jest.fn()
  };

  it('should display an empty string when no value is provided', () => {
    const output = maxTotalsFormatter({}, {} as Column);
    expect(output).toBe('');
  });

  it('should display an empty string when the "max" does not find the field property in its object', () => {
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { max: { column1: 123, column2: 345 } };
    const output = maxTotalsFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the maximum number is null', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { max: { column1: null } };
    const output = maxTotalsFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the average input is not a number', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { max: { column1: 'abc' } };
    const output = maxTotalsFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display a negative maximum when its input is negative', () => {
    const totals = { max: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = maxTotalsFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2 } } as Column, {});

    expect(output1).toBe('-123');
    expect(output2).toBe('-34.57');
  });

  it('should display a negative maximum and thousand separator when its input is negative', () => {
    const totals = { max: { column1: -12345678, column2: -345678.5678, column3: -2.4 } };

    const output1 = maxTotalsFormatter(totals, { id: 'column1', field: 'column1', params: { thousandSeparator: ',' } } as Column, {});
    const output2 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, thousandSeparator: ',' } } as Column, {});
    const output3 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});

    expect(output1).toBe('-12,345,678');
    expect(output2).toBe('-345,678.57');
    expect(output3).toBe('-345_678,57');
  });

  it('should display a negative maximum with parentheses instead of the negative sign when its input is negative', () => {
    const totals = { max: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = maxTotalsFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    const output2 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('(123)');
    expect(output2).toBe('(34.57)');
  });

  it('should display a negative maximum with thousand separator and parentheses instead of the negative sign when its input is negative', () => {
    const totals = { max: { column1: -12345678, column2: -345678.5678, column3: -2.4 } };

    const output1 = maxTotalsFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    const output2 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    const output3 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true, decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});

    expect(output1).toBe('(12,345,678)');
    expect(output2).toBe('(345,678.57)');
    expect(output3).toBe('(345_678,57)');
  });

  it('should display a negative sum with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true } } as GridOption);
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { max: { column1: 123, column2: 345, column3: -2.4 } };
    const output = maxTotalsFormatter(totals, columnDef, gridStub);
    expect(output).toBe('(2.4)');
  });

  it('should display a positive maximum number even when displayNegativeNumberWithParentheses is enabled', () => {
    const totals = { max: { column1: 123, column2: 34.5678, column3: 2.4 } };

    const output1 = maxTotalsFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    const output2 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('123');
    expect(output2).toBe('34.57');
  });

  it('should display the same maximum value when a number with decimals is provided', () => {
    const totals = { max: { column1: 123.55678, column2: 345.2, column3: -2.45 } };

    const output1 = maxTotalsFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2' } as Column, {});

    expect(output1).toBe('123.55678');
    expect(output2).toBe('345.2');
  });

  it('should display an sum number with user defined minimum & maximum decimal count in his grid option', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { minDecimal: 0, maxDecimal: 3, displayNegativeNumberWithParentheses: true } } as GridOption);
    const totals = { max: { column1: 123.45678, column2: 345, column3: -2.45 } };

    const output1 = maxTotalsFormatter(totals, { id: 'column1', field: 'column1' } as Column, gridStub);
    const output2 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2' } as Column, gridStub);
    const output3 = maxTotalsFormatter(totals, { id: 'column3', field: 'column3' } as Column, gridStub);

    expect(output1).toBe('123.457');
    expect(output2).toBe('345');
    expect(output3).toBe('(2.45)');
  });

  it('should display a maximum number with user defined minimum & maximum decimal count', () => {
    const totals = { max: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = maxTotalsFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2 } } as Column, {});
    const output2 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0 } } as Column, {});
    const output3 = maxTotalsFormatter(totals, { id: 'column3', field: 'column3', params: { minDecimal: 3, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('123.46');
    expect(output2).toBe('345.2');
    expect(output3).toBe('(2.450)');
  });

  it('should display a maximum number a prefix and suffix', () => {
    const totals = { max: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = maxTotalsFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'Max: ' } } as Column, {});
    const output2 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (max)' } } as Column, {});
    const output3 = maxTotalsFormatter(
      totals, {
        id: 'column3',
        field: 'column3',
        params: { minDecimal: 3, displayNegativeNumberWithParentheses: true, groupFormatterPrefix: 'Max: ', groupFormatterSuffix: '/item' }
      } as Column
    );

    expect(output1).toBe('Max: 123.46');
    expect(output2).toBe('345.2 (max)');
    expect(output3).toBe('Max: (2.450)/item');
  });

  it('should display a max number with prefix, suffix and thousand separator', () => {
    const totals = { max: { column1: 12345678.45678, column2: 345678.2, column3: -345678.45 } };

    const output1 = maxTotalsFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'Max: ', decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});
    const output2 = maxTotalsFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (max)', decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});
    const output3 = maxTotalsFormatter(
      totals, {
        id: 'column3', field: 'column3',
        params: { minDecimal: 3, displayNegativeNumberWithParentheses: true, groupFormatterPrefix: 'Max: ', groupFormatterSuffix: '/item', decimalSeparator: ',', thousandSeparator: '_' }
      } as Column);

    expect(output1).toBe('Max: 12_345_678,46');
    expect(output2).toBe('345_678,2 (max)');
    expect(output3).toBe('Max: (345_678,450)/item');
  });
});
