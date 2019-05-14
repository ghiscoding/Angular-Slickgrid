import { Column } from '../../models';
import { sumTotalsDollarBoldFormatter } from '../sumTotalsDollarBoldFormatter';

describe('sumTotalsDollarBoldFormatter', () => {
  it('should display an empty string when no value is provided', () => {
    const output = sumTotalsDollarBoldFormatter({}, {} as Column);
    expect(output).toBe('');
  });

  it('should display an empty string when the "sum" does not find the field property in its object', () => {
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { sum: { column1: 123, column2: 345 } };
    const output = sumTotalsDollarBoldFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the sum property is null', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { sum: { column1: null } };
    const output = sumTotalsDollarBoldFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the average input is not a number', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { sum: { column1: 'abc' } };
    const output = sumTotalsDollarBoldFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display a negative sum with at least 2 decimals in red when its input is negative', () => {
    const totals = { sum: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = sumTotalsDollarBoldFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = sumTotalsDollarBoldFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2 } } as Column, {});

    expect(output1).toBe('<b>-$123.00</b>');
    expect(output2).toBe('<b>-$34.57</b>');
  });

  it('should display a negative sum in red with at least 2 decimals in parentheses instead of the negative sign when its input is negative', () => {
    const totals = { sum: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = sumTotalsDollarBoldFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeWithParentheses: true } } as Column, {});
    const output2 = sumTotalsDollarBoldFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeWithParentheses: true } } as Column, {});

    expect(output1).toBe('<b>($123.00)</b>');
    expect(output2).toBe('<b>($34.57)</b>');
  });

  it('should display a positive sum number with at least 2 decimals, even when displayNegativeWithParentheses is enabled', () => {
    const totals = { sum: { column1: 123, column2: 34.5678, column3: 2.4 } };

    const output1 = sumTotalsDollarBoldFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeWithParentheses: true } } as Column, {});
    const output2 = sumTotalsDollarBoldFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeWithParentheses: true } } as Column, {});

    expect(output1).toBe('<b>$123.00</b>');
    expect(output2).toBe('<b>$34.57</b>');
  });

  it('should display the same sum value in green with at least 2 decimals when a number with decimals is provided', () => {
    const totals = { sum: { column1: 123.55678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsDollarBoldFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = sumTotalsDollarBoldFormatter(totals, { id: 'column2', field: 'column2' } as Column, {});

    expect(output1).toBe('<b>$123.5568</b>');
    expect(output2).toBe('<b>$345.20</b>');
  });

  it('should display a sum number in correct color with at least 2 decimals when user provided minimum & maximum decimal count', () => {
    const totals = { sum: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsDollarBoldFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2 } } as Column, {});
    const output2 = sumTotalsDollarBoldFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0 } } as Column, {});
    const output3 = sumTotalsDollarBoldFormatter(totals, { id: 'column3', field: 'column3', params: { minDecimal: 3, displayNegativeWithParentheses: true } } as Column, {});

    expect(output1).toBe('<b>$123.46</b>');
    expect(output2).toBe('<b>$345.2</b>');
    expect(output3).toBe('<b>($2.450)</b>');
  });

  it('should display a sum number with at least 2 decimals with prefix and suffix', () => {
    const totals = { sum: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsDollarBoldFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'sum: ' } } as Column, {});
    const output2 = sumTotalsDollarBoldFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (max)' } } as Column, {});
    const output3 = sumTotalsDollarBoldFormatter(
      totals, {
        id: 'column3',
        field: 'column3',
        params: { minDecimal: 3, displayNegativeWithParentheses: true, groupFormatterPrefix: 'sum: ', groupFormatterSuffix: '/item' }
      } as Column
    );

    expect(output1).toBe('<b>sum: $123.46</b>');
    expect(output2).toBe('<b>$345.2 (max)</b>');
    expect(output3).toBe('<b>sum: ($2.450)/item</b>');
  });
});
