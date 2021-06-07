import { Column, FieldType, Formatter, GridOption, FormatterOption, ExportOption, ExcelExportOption } from '../models/index';
import { mapMomentDateFormatWithFieldType } from '../services/utilities';
import * as moment_ from 'moment-mini';
const moment = (moment_ as any)['default'] || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

/**
 * Find the option value from the following (in order of execution)
 * 1- Column Definition "params"
 * 2- Grid Options "formatterOptions"
 * 3- nothing found, return default value provided
 */
export function getValueFromParamsOrFormatterOptions(optionName: string, columnDef: Column, grid: any, defaultValue?: any) {
  const gridOptions = ((grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {}) as GridOption;
  const params = columnDef && columnDef.params;

  if (params && params.hasOwnProperty(optionName)) {
    return params[optionName];
  } else if (gridOptions.formatterOptions?.hasOwnProperty(optionName)) {
    return (gridOptions.formatterOptions as any)[optionName];
  }
  return defaultValue;
}

/** From a FieldType, return the associated date Formatter */
export function getAssociatedDateFormatter(fieldType: typeof FieldType[keyof typeof FieldType], defaultSeparator: string): Formatter {
  const defaultDateFormat = mapMomentDateFormatWithFieldType(fieldType);

  return (_row: number, _cell: number, value: any, columnDef: Column, _dataContext: any, grid: any) => {
    const gridOptions = ((grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {}) as GridOption;
    const customSeparator = gridOptions?.formatterOptions?.dateSeparator ?? defaultSeparator;
    const inputType = columnDef?.type ?? FieldType.date;
    const inputDateFormat = mapMomentDateFormatWithFieldType(inputType);
    const isParsingAsUtc = columnDef?.params?.parseDateAsUtc ?? false;

    const isDateValid = moment(value, inputDateFormat, false).isValid();
    let outputDate = value;
    if (value && isDateValid) {
      outputDate = isParsingAsUtc ? moment.utc(value).format(defaultDateFormat) : moment(value).format(defaultDateFormat);
    }

    // user can customize the separator through the "formatterOptions"
    // if that is the case we need to replace the default "/" to the new separator
    if (outputDate && customSeparator !== defaultSeparator) {
      const regex = new RegExp(defaultSeparator, 'ig'); // find separator globally
      outputDate = outputDate.replace(regex, customSeparator);
    }

    return outputDate;
  };
}


/**
 * Goes through every possible ways to find and apply a Formatter when found,
 * it will first check if a `exportCustomFormatter` is defined else it will check if there's a regular `formatter` and `exportWithFormatter` is enabled.
 * This function is similar to `applyFormatterWhenDefined()` except that it execute any `exportCustomFormatter` while `applyFormatterWhenDefined` does not.
 * @param {Number} row - grid row index
 * @param {Number} col - grid column index
 * @param {Object} dataContext - item data context object
 * @param {Object} columnDef - column definition
 * @param {Object} grid - Slick Grid object
 * @param {Object} exportOptions - Excel or Text Export Options
 * @returns formatted string output or empty string
 */
export function exportWithFormatterWhenDefined<T = any>(row: number, col: number, columnDef: Column<T>, dataContext: T, grid: any, exportOptions?: ExportOption | ExcelExportOption) {
  let isEvaluatingFormatter = false;

  // first check if there are any export options provided (as Grid Options)
  if (exportOptions && exportOptions.hasOwnProperty('exportWithFormatter')) {
    isEvaluatingFormatter = !!exportOptions.exportWithFormatter;
  }

  // second check if "exportWithFormatter" is provided in the column definition, if so it will have precendence over the Grid Options exportOptions
  if (columnDef && columnDef.hasOwnProperty('exportWithFormatter')) {
    isEvaluatingFormatter = !!columnDef.exportWithFormatter;
  }

  let formatter: Formatter | undefined;
  if (dataContext && columnDef.exportCustomFormatter) {
    // did the user provide a Custom Formatter for the export
    formatter = columnDef.exportCustomFormatter;
  } else if (isEvaluatingFormatter && columnDef.formatter) {
    // or else do we have a column Formatter AND are we evaluating it?
    formatter = columnDef.formatter;
  }

  return parseFormatterWhenExist(formatter, row, col, columnDef, dataContext, grid);
}

/**
 * Takes a Formatter function, execute and return the formatted output
 * @param {Function} formatter - formatter function
 * @param {Number} row - grid row index
 * @param {Number} col - grid column index
 * @param {Object} dataContext - item data context object
 * @param {Object} columnDef - column definition
 * @param {Object} grid - Slick Grid object
 * @returns formatted string output or empty string
 */
export function parseFormatterWhenExist<T = any>(formatter: Formatter | undefined, row: number, col: number, columnDef: Column<T>, dataContext: T, grid: any): string {
  let output = '';

  // does the field have the dot (.) notation and is a complex object? if so pull the first property name
  const fieldId = columnDef.field || columnDef.id || '';
  let fieldProperty = fieldId;
  if (typeof columnDef.field === 'string' && columnDef.field.indexOf('.') > 0) {
    const props = columnDef.field.split('.');
    fieldProperty = (props.length > 0) ? props[0] : columnDef.field;
  }

  const cellValue = (dataContext as any).hasOwnProperty(fieldProperty) ? (dataContext as any)[fieldProperty] : null;

  if (typeof formatter === 'function') {
    const formattedData = formatter(row, col, cellValue, columnDef, dataContext, grid);
    output = formattedData as string;
    if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
      output = formattedData.text;
    }
    if (output === null || output === undefined) {
      output = '';
    }
  } else {
    output = (!(dataContext as any).hasOwnProperty(fieldProperty)) ? '' : cellValue;
    if (output === null || output === undefined) {
      output = '';
    }
  }

  // if at the end we have an empty object, then replace it with an empty string
  if (typeof output === 'object' && Object.entries(output).length === 0) {
    output = '';
  }

  return output;
}
