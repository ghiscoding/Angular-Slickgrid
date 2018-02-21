import { DelimiterType } from './delimiterType.enum';
import { FileType } from './fileType.enum';

export interface ExportOption {
  /** export delimiter, can be (comma, tab, ... or even custom string). */
  delimiter?: DelimiterType | string;

  /** filename (without extension) */
  filename?: string;

  /** file type format, typically csv or txt (this will provide the extension) */
  format?: FileType;

  /**
   * If you want to use UTF-8 and unicode, in most case it's better to use it with BOM.
   * This will basically add a special string  at the beginning of the file "ï»¿" which will tell the application that it is UTF-8 format.
   */
  useUtf8WithBom?: boolean;
}
