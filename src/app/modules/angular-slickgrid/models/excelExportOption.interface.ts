import { FileType } from './index';

export interface ExcelExportOption {
  /** Defaults to false, which leads to all Formatters of the grid being evaluated on export. You can also override a column by changing the propery on the column itself */
  exportWithFormatter?: boolean;

  /** filename (without extension) */
  filename?: string;

  /** file type format, .xls/.xlsx (this will provide the extension) */
  format?: FileType;

  /** The column header title (at A0 in Excel) of the Group by. If nothing is provided it will use "Group By" (which is a translated value of GROUP_BY i18n) */
  groupingColumnHeaderTitle?: string;

  /** The default text to display in 1st column of the File Export, which will identify that the current row is a Grouping Aggregator */
  groupingAggregatorRowText?: string;

  /** Defaults to false, which leads to Sanitizing all data (striping out any HTML tags) when being evaluated on export. */
  sanitizeDataExport?: boolean;

  /** Defaults to "Sheet1", Excel Sheet Name */
  sheetName?: string;

  /**
   * If you want to use UTF-8 and unicode, in most case it's better to use it with BOM.
   * This will basically add a special string  at the beginning of the file "ï»¿" which will tell the application that it is UTF-8 format.
   */
  useUtf8WithBom?: boolean;
}
