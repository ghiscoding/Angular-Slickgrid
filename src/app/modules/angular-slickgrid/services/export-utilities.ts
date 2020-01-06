import { Column, ExportOption, ExcelExportOption, Formatter } from '../models/index';

export function exportWithFormatterWhenDefined(row: number, col: number, dataContext: any, columnDef: Column, grid: any, exportOptions?: ExportOption | ExcelExportOption) {
  let output = '';
  let isEvaluatingFormatter = false;

  // first check if there are any export options provided (as Grid Options)
  if (exportOptions && exportOptions.hasOwnProperty('exportWithFormatter')) {
    isEvaluatingFormatter = !!exportOptions.exportWithFormatter;
  }

  // second check if "exportWithFormatter" is provided in the column definition, if so it will have precendence over the Grid Options exportOptions
  if (columnDef && columnDef.hasOwnProperty('exportWithFormatter')) {
    isEvaluatingFormatter = !!columnDef.exportWithFormatter;
  }

  // did the user provide a Custom Formatter for the export
  const exportCustomFormatter: Formatter | undefined = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;

  // does the field have the dot (.) notation and is a complex object? if so pull the first property name
  const fieldId = columnDef.field || columnDef.id || '';
  let fieldProperty = fieldId;
  if (typeof columnDef.field === 'string' && columnDef.field.indexOf('.') > 0) {
    const props = columnDef.field.split('.');
    fieldProperty = (props.length > 0) ? props[0] : columnDef.field;
  }

  if (dataContext && dataContext.hasOwnProperty(fieldProperty) && exportCustomFormatter !== undefined) {
    const formattedData = exportCustomFormatter(row, col, dataContext[fieldProperty], columnDef, dataContext, grid);
    output = formattedData as string;
    if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
      output = formattedData.text;
    }
    if (output === null || output === undefined) {
      output = '';
    }
  } else if (isEvaluatingFormatter && dataContext.hasOwnProperty(fieldProperty) && columnDef.formatter) {
    const formattedData = columnDef.formatter(row, col, dataContext[fieldProperty], columnDef, dataContext, grid);
    output = formattedData as string;
    if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
      output = formattedData.text;
    }
    if (output === null || output === undefined) {
      output = '';
    }
  } else {
    output = (!dataContext.hasOwnProperty(fieldProperty)) ? '' : dataContext[fieldProperty];
    if (output === null || output === undefined) {
      output = '';
    }
  }

  return output;
}
