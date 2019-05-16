export interface FormatterOption {
  /** defaults to false, option to display negative numbers in parentheses, example: -$12.50 becomes ($12.50) */
  displayNegativeNumberWithParentheses?: boolean;

  /** defaults to undefined, minimum number of decimals */
  minDecimal?: number;

  /** defaults to undefined, maximum number of decimals */
  maxDecimal?: number;
}
