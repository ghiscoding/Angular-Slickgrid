import { Column, GridOption } from '../models/index';

export function exportWithFormatterWhenDefined(col: number, row: number, dataContext: any, columnDef: Column, grid: any, gridOptions: GridOption) {
  let output = '';
  const fieldName = columnDef.field;
  let isEvaluatingFormatter = false;
  if (gridOptions && (gridOptions.exportOptions || gridOptions.excelExportOptions)) {
    isEvaluatingFormatter = gridOptions.exportOptions.exportWithFormatter || gridOptions.excelExportOptions.exportWithFormatter;
  }
  if (columnDef.hasOwnProperty('exportWithFormatter')) {
    isEvaluatingFormatter = columnDef.exportWithFormatter;
  }

  if (dataContext && dataContext.hasOwnProperty(fieldName) && columnDef.exportCustomFormatter !== undefined && columnDef.exportCustomFormatter !== undefined) {
    const formattedData = columnDef.exportCustomFormatter(row, col, dataContext[fieldName], columnDef, dataContext, grid);
    output = formattedData as string;
    if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
      output = formattedData.text;
    }
    if (output === null || output === undefined) {
      output = '';
    }
  } else if (isEvaluatingFormatter && dataContext.hasOwnProperty(fieldName) && columnDef.formatter) {
    const formattedData = columnDef.formatter(row, col, dataContext[fieldName], columnDef, dataContext, grid);
    output = formattedData as string;
    if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
      output = formattedData.text;
    }
    if (output === null || output === undefined) {
      output = '';
    }
  } else {
    output = (!dataContext.hasOwnProperty(fieldName)) ? '' : dataContext[fieldName];
    if (output === null || output === undefined) {
      output = '';
    }
  }

  return output;
}
