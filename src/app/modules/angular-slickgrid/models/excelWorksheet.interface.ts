export interface ExcelWorksheet {
  relations: any;
  columnFormats: any[];
  data: any[];
  mergedCells: any[];
  columns: any[];
  sheetProtection: boolean;
  hyperlinks: any[];
  sheetView: any;
  showZeros: boolean;

  initialize: (config: any) => any;
  compilePageDetailPackage: (data: any) => any;
  compilePageDetailPiece: (data: any) => any;
  exportFooter: (doc: any) => any;
  exportHeader: (doc: any) => any;
  collectSharedStrings: () => any[];
  exportColumns: (doc: any) => any;
  exportPageSettings: (doc: any, worksheet: any) => any;
  exportData: () => any;
  addDrawings: (drawings: any) => void;
  addTable: (table: any) => void;
  freezePane: (column: number, row: number, cell: string) => void;
  importData: (data: any) => void;
  mergeCells: (cell1: string, cell2: string) => void;
  setColumns: (columns: any[]) => void;
  setColumnFormats: (columnFormats: any[]) => void;
  setData: (data: any[]) => void;
  setFooter: (footers: any) => void;
  setHeader: (headers: any) => void;
  setPageOrientation: (orientation: any) => void;
  setPageMargin: (input: any) => void;
  setSharedStringCollection: (collection: string[]) => void;
  setRowInstructions: (row: number, instructions: any) => void;
  toXML: () => any;
}
