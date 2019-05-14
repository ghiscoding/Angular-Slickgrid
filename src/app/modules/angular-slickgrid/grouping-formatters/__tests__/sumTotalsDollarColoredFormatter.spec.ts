import { Column } from '../../models';
import { sumTotalsDollarColoredFormatter } from '../sumTotalsDollarColoredFormatter';

describe('sumTotalsDollarColoredFormatter', () => {
  it('should display an empty string when no value is provided', () => {
    const output = sumTotalsDollarColoredFormatter({}, {} as Column);
    expect(output).toBe('');
  });

  it('should display an empty string when the "sum" does not find the field property in its object', () => {
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { sum: { column1: 123, column2: 345 } };
    const output = sumTotalsDollarColoredFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the sum property is null', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { sum: { column1: null } };
    const output = sumTotalsDollarColoredFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the average input is not a number', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { sum: { column1: 'abc' } };
    const output = sumTotalsDollarColoredFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display a negative sum with at least 2 decimals in red when its input is negative', () => {
    const totals = { sum: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = sumTotalsDollarColoredFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = sumTotalsDollarColoredFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2 } } as Column, {});

    expect(output1).toBe('<span style="color:red">-$123.00</span>');
    expect(output2).toBe('<span style="color:red">-$34.57</span>');
  });

  it('should display a negative sum in red with at least 2 decimals in parentheses instead of the negative sign when its input is negative', () => {
    const totals = { sum: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = sumTotalsDollarColoredFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeWithParentheses: true } } as Column, {});
    const output2 = sumTotalsDollarColoredFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeWithParentheses: true } } as Column, {});

    expect(output1).toBe('<span style="color:red">($123.00)</span>');
    expect(output2).toBe('<span style="color:red">($34.57)</span>');
  });

  it('should display a positive sum number with at least 2 decimals, even when displayNegativeWithParentheses is enabled', () => {
    const totals = { sum: { column1: 123, column2: 34.5678, column3: 2.4 } };

    const output1 = sumTotalsDollarColoredFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeWithParentheses: true } } as Column, {});
    const output2 = sumTotalsDollarColoredFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeWithParentheses: true } } as Column, {});

    expect(output1).toBe('<span style="color:green">$123.00</span>');
    expect(output2).toBe('<span style="color:green">$34.57</span>');
  });

  it('should display the same sum value in green with at least 2 decimals when a number with decimals is provided', () => {
    const totals = { sum: { column1: 123.55678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsDollarColoredFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = sumTotalsDollarColoredFormatter(totals, { id: 'column2', field: 'column2' } as Column, {});

    expect(output1).toBe('<span style="color:green">$123.5568</span>');
    expect(output2).toBe('<span style="color:green">$345.20</span>');
  });

  it('should display a sum number in correct color with at least 2 decimals when user provided minimum & maximum decimal count', () => {
    const totals = { sum: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsDollarColoredFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2 } } as Column, {});
    const output2 = sumTotalsDollarColoredFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0 } } as Column, {});
    const output3 = sumTotalsDollarColoredFormatter(totals, { id: 'column3', field: 'column3', params: { minDecimal: 3, displayNegativeWithParentheses: true } } as Column, {});

    expect(output1).toBe('<span style="color:green">$123.46</span>');
    expect(output2).toBe('<span style="color:green">$345.2</span>');
    expect(output3).toBe('<span style="color:red">($2.450)</span>');
  });

  it('should display a sum number with at least 2 decimals with prefix and suffix', () => {
    const totals = { sum: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsDollarColoredFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'sum: ' } } as Column, {});
    const output2 = sumTotalsDollarColoredFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (max)' } } as Column, {});
    const output3 = sumTotalsDollarColoredFormatter(
      totals, {
        id: 'column3',
        field: 'column3',
        params: { minDecimal: 3, displayNegativeWithParentheses: true, groupFormatterPrefix: 'sum: ', groupFormatterSuffix: '/item' }
      } as Column
    );

    expect(output1).toBe('<span style="color:green">sum: $123.46</span>');
    expect(output2).toBe('<span style="color:green">$345.2 (max)</span>');
    expect(output3).toBe('<span style="color:red">sum: ($2.450)/item</span>');
  });
});
