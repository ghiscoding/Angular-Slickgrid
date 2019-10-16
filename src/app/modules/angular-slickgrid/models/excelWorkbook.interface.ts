import { ExcelWorksheet } from './excelWorksheet.interface';
import { ExcelStylesheet } from './excelStylesheet.interface';

export interface ExcelWorkbook {
  addDrawings: (drawings: any) => any;
  addTable: (table: any) => any;
  addWorksheet: (worksheet: any) => any;
  addMedia: (type: any, fileName: any, fileData: any, contentType: any) => any;
  createContentTypes: () => any;
  createWorksheet: (config: any) => ExcelWorksheet;
  createWorkbookRelationship: () => any;
  generateFiles: () => any;
  getStyleSheet: () => ExcelStylesheet;
  setPrintTitleTop: (inSheet: any, inRowCount: any) => any;
  setPrintTitleLeft: (inSheet: any, inRowCount: any) => any;
  toXML: () => any;
}
