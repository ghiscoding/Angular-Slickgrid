export interface SelectedRange {
  /** Selection start from which cell? */
  fromCell: number;

  /** Selection start from which row? */
  fromRow: number;

  /** Selection goes to which cell? */
  toCell: number;

  /** Selection goes to which row? */
  toRow: number;

  /** Does the selection contain a row & cell number? */
  contains?: (row: number, cell: number) => boolean;

  /** Is it a Single Cell Selection? */
  isSingleCell?: () => boolean;

  /** Is it a Single Row Selection? */
  isSingleRow?: () => boolean;

  /** Output print to string */
  toString?: () => string;
}
