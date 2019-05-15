import { Column, GridOption } from '../../models';
import { avgTotalsDollarFormatter } from '../avgTotalsDollarFormatter';

describe('avgTotalsDollarFormatter', () => {
  // stub some methods of the SlickGrid Grid instance
  const gridStub = {
    getOptions: jest.fn()
  };

  it('should display an empty string when no value is provided', () => {
    const output = avgTotalsDollarFormatter({}, {} as Column);
    expect(output).toBe('');
  });

  it('should display an empty string when the "avg" does not find the field property in its object', () => {
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { avg: { column1: 123, column2: 345 } };
    const output = avgTotalsDollarFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the average number is null', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { avg: { column1: null } };
    const output = avgTotalsDollarFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the average input is not a number', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { avg: { column1: 'abc' } };
    const output = avgTotalsDollarFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display a negative average with dollar sign when its input is negative', () => {
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { avg: { column1: 123, column2: 345, column3: -2.45 } };
    const output = avgTotalsDollarFormatter(totals, columnDef, {});
    expect(output).toBe('-$2.45');
  });

  it('should display a negative average with parentheses instead of the negative sign with dollar sign when its input is negative', () => {
    const columnDef = { id: 'column3', field: 'column3', params: { displayNegativeNumberWithParentheses: true } } as Column;
    const totals = { avg: { column1: 123, column2: 345, column3: -2.4 } };
    const output = avgTotalsDollarFormatter(totals, columnDef, {});
    expect(output).toBe('($2.40)');
  });

  it('should display a negative average with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Grid Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true } } as GridOption);
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { avg: { column1: 123, column2: 345, column3: -2.4 } };
    const output = avgTotalsDollarFormatter(totals, columnDef, gridStub);
    expect(output).toBe('($2.40)');
  });

  it('should display an average number with at least 2 decimals but no more than 4 by default, and dollar sign when a positive number is provided', () => {
    const totals = { avg: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = avgTotalsDollarFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = avgTotalsDollarFormatter(totals, { id: 'column2', field: 'column2' } as Column, {});

    expect(output1).toBe('$123.4568');
    expect(output2).toBe('$345.20');
  });

  it('should display an average number with user defined minimum & maximum decimal count', () => {
    const totals = { avg: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = avgTotalsDollarFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2 } } as Column, {});
    const output2 = avgTotalsDollarFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0 } } as Column, {});
    const output3 = avgTotalsDollarFormatter(totals, { id: 'column3', field: 'column3', params: { minDecimal: 3, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('$123.46');
    expect(output2).toBe('$345.2');
    expect(output3).toBe('($2.450)');
  });

  it('should display an average number with user defined minimum & maximum decimal count in his grid option', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { minDecimal: 0, maxDecimal: 3, displayNegativeNumberWithParentheses: true } } as GridOption);
    const totals = { avg: { column1: 123.45678, column2: 345, column3: -2.45 } };

    const output1 = avgTotalsDollarFormatter(totals, { id: 'column1', field: 'column1' } as Column, gridStub);
    const output2 = avgTotalsDollarFormatter(totals, { id: 'column2', field: 'column2' } as Column, gridStub);
    const output3 = avgTotalsDollarFormatter(totals, { id: 'column3', field: 'column3' } as Column, gridStub);

    expect(output1).toBe('$123.457');
    expect(output2).toBe('$345');
    expect(output3).toBe('($2.45)');
  });

  it('should display an average number with prefix and suffix', () => {
    const totals = { avg: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = avgTotalsDollarFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'Avg: ' } } as Column, {});
    const output2 = avgTotalsDollarFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (avg)' } } as Column, {});
    const output3 = avgTotalsDollarFormatter(
      totals, {
        id: 'column3', field: 'column3',
        params: { minDecimal: 3, displayNegativeNumberWithParentheses: true, groupFormatterPrefix: 'Avg: ', groupFormatterSuffix: '/item' }
      } as Column);

    expect(output1).toBe('Avg: $123.46');
    expect(output2).toBe('$345.2 (avg)');
    expect(output3).toBe('Avg: ($2.450)/item');
  });
});
