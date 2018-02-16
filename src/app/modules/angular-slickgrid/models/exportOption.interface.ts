export interface ExportOption {
  /** export delimiter, can be (comma, tab, ...). Please note that Tab is written as "\t" */
  delimiter: string;

  /** filename (without extension) */
  filename: string;

  /** file format, typically csv or txt (this will provide the extension) */
  format: string;

  /** do we want to include the column named "id" in our export? Skipped by default */
  isIdColumnIncluded?: boolean;

  /** array of column names that we want to exclude from the export */
  skipColumns?: string[];

  /** If you have a problem with getting ï»¿ (UTF-8 BOM) as the first few characters in an Excel spreadsheet after csv import, you can try setting */
  exporterOlderExcelCompatibility?: boolean;
}
