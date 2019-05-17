export interface FormatterOption {
  /** What separator to use to display a Date, for example using "." it could be "2002.01.01" */
  dateSeparator?: '/' | '-' | '.' | ' ';

  /** Defaults to false, option to display negative numbers wrapped in parentheses, example: -$12.50 becomes ($12.50) */
  displayNegativeNumberWithParentheses?: boolean;

  /** Defaults to undefined, minimum number of decimals */
  minDecimal?: number;

  /** Defaults to undefined, maximum number of decimals */
  maxDecimal?: number;
}
