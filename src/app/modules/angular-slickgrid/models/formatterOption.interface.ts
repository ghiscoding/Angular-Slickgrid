export interface FormatterOption {
  /** What separator to use to display a Date, for example using "." it could be "2002.01.01" */
  dateSeparator?: '/' | '-' | '.' | ' ' | '';

  /** Defaults to dot ".", separator to use as the decimal separator, example $123.55 or $123,55 */
  decimalSeparator?: '.' | ',';

  /** Defaults to false, option to display negative numbers wrapped in parentheses, example: -$12.50 becomes ($12.50) */
  displayNegativeNumberWithParentheses?: boolean;

  /** Defaults to undefined, minimum number of decimals */
  minDecimal?: number;

  /** Defaults to undefined, maximum number of decimals */
  maxDecimal?: number;

  /** Defaults to empty string, thousand separator on a number. Example: 12345678 becomes 12,345,678 */
  thousandSeparator?: ',' | '_' | '.' | ' ' | '';
}
