import { exportWithFormatterWhenDefined, getAssociatedDateFormatter, getValueFromParamsOrFormatterOptions } from '../formatterUtilities';
import { FieldType, Column, GridOption, Formatter } from '../../models';

describe('formatterUtilities', () => {
  const gridStub = {
    getOptions: jest.fn()
  };

  describe('getValueFromParamsOrGridOptions method', () => {
    it('should return options found in the Grid Option when not found in Column Definition "params" property', () => {
      const gridOptions = { formatterOptions: { minDecimal: 2 } } as GridOption;
      const gridSpy = gridStub.getOptions.mockReturnValue(gridOptions);

      const output = getValueFromParamsOrFormatterOptions('minDecimal', {} as Column, gridStub, -1);

      expect(gridSpy).toHaveBeenCalled();
      expect(output).toBe(2);
    });

    it('should return options found in the Column Definition "params" even if exist in the Grid Option as well', () => {
      const gridOptions = { formatterOptions: { minDecimal: 2 } } as GridOption;
      const gridSpy = gridStub.getOptions.mockReturnValue(gridOptions);

      const output = getValueFromParamsOrFormatterOptions('minDecimal', { params: { minDecimal: 3 } } as Column, gridStub, -1);

      expect(gridSpy).toHaveBeenCalled();
      expect(output).toBe(3);
    });

    it('should return default value when not found in "params" (columnDef) neither the "formatterOptions" (gridOption)', () => {
      const defaultValue = 5;
      const output = getValueFromParamsOrFormatterOptions('minDecimal', { field: 'column1' } as Column, {}, defaultValue);
      expect(output).toBe(defaultValue);
    });
  });

  describe('getAssociatedDateFormatter method', () => {
    it('should return a Formatter function', () => {
      const formatterFn = getAssociatedDateFormatter(FieldType.dateIso, '-');
      const isFunction = typeof formatterFn === 'function';
      expect(isFunction).toBe(true);
    });

    it('should return a formatted Date when calling the Formatter function', () => {
      const formatterFn = getAssociatedDateFormatter(FieldType.dateIso, '-');
      const gridSpy = jest.spyOn(gridStub, 'getOptions');

      const output = formatterFn(1, 1, '2002-01-01T00:01:01', { type: FieldType.dateIso } as Column, {}, gridStub);

      expect(gridSpy).toHaveBeenCalled();
      expect(output).toBe('2002-01-01');
    });

    it('should return a formatted Date with a different separator when changing setting the "dateSeparator" in "formatterOptions"', () => {
      const formatterFn = getAssociatedDateFormatter(FieldType.dateIso, '-');
      const gridOptions = { formatterOptions: { dateSeparator: '.' } } as GridOption;
      const gridSpy = gridStub.getOptions.mockReturnValue(gridOptions);

      const output = formatterFn(1, 1, '2002-01-01T00:01:01', { type: FieldType.dateIso } as Column, {}, gridStub);

      expect(gridSpy).toHaveBeenCalled();
      expect(output).toBe('2002.01.01');
    });
  });

  describe('Export Utilities', () => {
    let mockItem: any;
    let mockColumn: Column;
    const myBoldHtmlFormatter: Formatter = (_row, _cell, value) => value !== null ? { text: value ? `<b>${value}</b>` : '' } : null as any;
    const myUppercaseFormatter: Formatter = (_row, _cell, value) => value ? { text: value.toUpperCase() } : null as any;

    beforeEach(() => {
      mockItem = { firstName: 'John', lastName: 'Doe', age: 45, address: { zip: 12345 }, empty: {} };
      mockColumn = { id: 'firstName', name: 'First Name', field: 'firstName', formatter: myUppercaseFormatter };
    });

    describe('exportWithFormatterWhenDefined method', () => {
      it('should NOT enable exportWithFormatter and expect the firstName to returned', () => {
        const output = exportWithFormatterWhenDefined(1, 1, mockColumn, mockItem, gridStub, { exportWithFormatter: false });
        expect(output).toBe('John');
      });

      it('should provide a column definition field defined with a dot (.) notation and expect a complex object result', () => {
        const output = exportWithFormatterWhenDefined(1, 1, { ...mockColumn, field: 'address.zip' }, mockItem, gridStub, {});
        expect(output).toEqual({ zip: 12345 });
      });

      it('should provide a column definition field defined with a dot (.) notation and expect an empty string when the complex result is an empty object', () => {
        const output = exportWithFormatterWhenDefined(1, 1, { ...mockColumn, field: 'empty' }, mockItem, gridStub, {});
        expect(output).toEqual('');
      });

      it('should provide a exportCustomFormatter in the column definition and expect the output to be formatted', () => {
        const output = exportWithFormatterWhenDefined(1, 1, { ...mockColumn, exportCustomFormatter: myBoldHtmlFormatter }, mockItem, gridStub, { exportWithFormatter: true });
        expect(output).toBe('<b>John</b>');
      });

      it('should provide a exportCustomFormatter in the column definition and expect empty string when associated item property is null', () => {
        const output = exportWithFormatterWhenDefined(1, 1, { ...mockColumn, exportCustomFormatter: myBoldHtmlFormatter }, { ...mockItem, firstName: null }, gridStub, { exportWithFormatter: true });
        expect(output).toBe('');
      });

      it('should provide a exportCustomFormatter in the column definition and expect empty string when associated item property is undefined', () => {
        const output = exportWithFormatterWhenDefined(1, 1, { ...mockColumn, exportCustomFormatter: myBoldHtmlFormatter }, { ...mockItem, firstName: undefined }, gridStub, { exportWithFormatter: true });
        expect(output).toBe('');
      });

      it('should enable exportWithFormatter as an exportOption and expect the firstName to be formatted', () => {
        const output = exportWithFormatterWhenDefined(1, 1, mockColumn, mockItem, gridStub, { exportWithFormatter: true });
        expect(output).toBe('JOHN');
      });

      it('should enable exportWithFormatter as a grid option and expect the firstName to be formatted', () => {
        mockColumn.exportWithFormatter = true;
        const output = exportWithFormatterWhenDefined(1, 1, mockColumn, mockItem, gridStub, { exportWithFormatter: true });
        expect(output).toBe('JOHN');
      });

      it('should enable exportWithFormatter as a grid option and expect empty string when associated item property is null', () => {
        mockColumn.exportWithFormatter = true;
        const output = exportWithFormatterWhenDefined(1, 1, mockColumn, { ...mockItem, firstName: null }, gridStub, { exportWithFormatter: true });
        expect(output).toBe('');
      });

      it('should enable exportWithFormatter as a grid option and expect empty string when associated item property is undefined', () => {
        mockColumn.exportWithFormatter = true;
        const output = exportWithFormatterWhenDefined(1, 1, mockColumn, { ...mockItem, firstName: undefined }, gridStub, { exportWithFormatter: true });
        expect(output).toBe('');
      });

      it('should expect empty string when associated item property is undefined and has no formatter defined', () => {
        const output = exportWithFormatterWhenDefined(1, 1, mockColumn, { ...mockItem, firstName: undefined }, gridStub, {});
        expect(output).toBe('');
      });
    });
  });
});
