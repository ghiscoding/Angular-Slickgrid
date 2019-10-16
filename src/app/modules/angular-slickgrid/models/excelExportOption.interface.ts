import { ExcelWorksheet } from './excelWorksheet.interface';
import { ExcelWorkbook } from './excelWorkbook.interface';
import { FileType } from './fileType.enum';

export interface ExcelExportOption {
  /** Defaults to true, when grid is using Grouping, it will show indentation of the text with collapsed/expanded symbol as well */
  addGroupIndentation?: boolean;

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

  /** Symbol use to show that the group title is collapsed (you can use unicode like '\u25B9' or '\u25B7') */
  groupCollapsedSymbol?: string;

  /** Symbol use to show that the group title is expanded (you can use unicode like '\u25BF' or '\u25BD') */
  groupExpandedSymbol?: string;

  /** Defaults to false, which leads to Sanitizing all data (striping out any HTML tags) when being evaluated on export. */
  sanitizeDataExport?: boolean;

  /** Defaults to "Sheet1", Excel Sheet Name */
  sheetName?: string;

  /** Add a Custom Excel Header on first row of the Excel Sheet */
  customExcelHeader?: (workbook: ExcelWorkbook, sheet: ExcelWorksheet) => void;
}
