import { Column, Formatter } from './../models/index';

/** Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"  */
export const hyperlinkUriPrefixFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  let uriPrefix = (columnDef && columnDef.params && columnDef.params.uriPrefix) ? columnDef.params.uriPrefix : '';
  if (!uriPrefix) {
    throw new Error(`HyperlinkUriPrefix Formatter require a "uriPrefix" that can be passed through params. e.g.:: formatter: Formatters.hyperlinkUriPrefix, params: { uriPrefix: '/users/' }`);
  }
  if (value && uriPrefix && typeof uriPrefix === 'string' && !uriPrefix.includes('<script>')) {
    uriPrefix += value;
    return '<a href="' + uriPrefix + '">' + value + '</a>';
  }
  return '';
};
