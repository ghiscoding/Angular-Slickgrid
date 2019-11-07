import { getAssociatedDateFormatter, getValueFromParamsOrFormatterOptions } from '../formatterUtilities';
import { FieldType, Column, GridOption } from '../../models';

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
});
