import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const hyperlinkFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  if (value && typeof value === 'string') {
    const matchUrl = value.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i);
    if (matchUrl && Array.isArray(matchUrl)) {
      return `<a href="${matchUrl[0]}">' + value + '</a>`;
    }
  }
  return '';
};
