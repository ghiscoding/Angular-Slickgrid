import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

/** Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"  */
export const hyperlinkUriPrefixFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  let uriPrefix = (columnDef && columnDef.params && columnDef.params.uriPrefix) ? columnDef.params.uriPrefix : '';
  if (value && uriPrefix && typeof uriPrefix === 'string' && !uriPrefix.includes('<script>')) {
    uriPrefix += value;
    return '<a href="' + uriPrefix + '">' + value + '</a>';
  }
  return '';
};
