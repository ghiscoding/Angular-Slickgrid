import { DelimiterType } from './delimiterType.enum';
import { FileType } from './fileType.enum';

export interface ExportOption {
  /** Defaults to false, which leads to Formatters being evaluated on export */
  exportWithFormatter?: boolean;

  /** array of column field names that we want to exclude/skip from the export */
  excludedColumns?: string[];

  /** export delimiter, can be (comma, tab, ... or even custom string). */
  delimiter: DelimiterType | string;

  /** filename (without extension) */
  filename: string;

  /** file type format, typically csv or txt (this will provide the extension) */
  format: FileType;

  /** do we want to include the column named "id" in our export? Skipped by default */
  isIdColumnIncluded?: boolean;

  /**
   * If you want to use UTF-8 and unicode, in most case it's better use it with BOM.
   * This will basically add a special string  at the beginning of the file "ï»¿" which will tell the application that it is UTF-8 format.
   */
  useUtf8WithBom?: boolean;
}
