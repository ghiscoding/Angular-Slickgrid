export enum FieldType {
  /** unknown type */
  unknown,

  /** string type */
  string,

  /** boolean type (true/false) */
  boolean,

  /** integer number type (1,2,99) */
  integer,

  /** float number (with decimal) type */
  float,

  /** number includes Integer and Float */
  number,

  /** new Date(), javascript Date object */
  date,

  /** Format: 'YYYY-MM-DD' => 2001-02-28 */
  dateIso,

  /** Format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' => 2001-02-28T14:00:00.123Z */
  dateUtc,

  /** new Date(), javacript Date Object with Time */
  dateTime,

  /** Format: 'YYYY-MM-DD HH:mm:ss' => 2001-02-28 14:01:01 */
  dateTimeIso,

  /** Format: 'YYYY-MM-DD h:mm:ss a' => 2001-02-28 11:01:01 pm */
  dateTimeIsoAmPm,

  /** Format: 'YYYY-MM-DD h:mm:ss A' => 2001-02-28 11:01:01 PM */
  dateTimeIsoAM_PM,

  /** Format: 'YYYY-MM-DD HH:mm' => 2001-02-28 14:01 */
  dateTimeShortIso,

  /** Format (Euro): 'DD/MM/YYYY' => 28/02/2001 */
  dateEuro,

  /** Format (Euro): 'D/M/YY' => 28/2/12 */
  dateEuroShort,

  /** Format (Euro): 'DD/MM/YYYY HH:mm' => 28/02/2001 13:01 */
  dateTimeShortEuro,

  /** Format (Euro): 'DD/MM/YYYY HH:mm:ss' => 02/28/2001 13:01:01 */
  dateTimeEuro,

  /** Format (Euro): 'DD/MM/YYYY hh:mm:ss a' => 28/02/2001 11:01:01 pm */
  dateTimeEuroAmPm,

  /** Format (Euro): 'DD/MM/YYYY hh:mm:ss A' => 28/02/2001 11:01:01 PM */
  dateTimeEuroAM_PM,

  /** Format (Euro): 'D/M/YY H:m:s' => 28/2/14 14:1:2 */
  dateTimeEuroShort,

  /** Format (Euro): 'D/M/YY h:m:s a' => 28/2/14 1:2:10 pm */
  dateTimeEuroShortAmPm,

  /** Format (Euro): 'D/M/YY h:m:s A' => 28/2/14 14:1:1 PM */
  dateTimeEuroShortAM_PM,

  /** Format: 'MM/DD/YYYY' => 02/28/2001 */
  dateUs,

  /** Format: 'M/D/YY' => 2/28/12 */
  dateUsShort,

  /** Format: 'MM/DD/YYYY HH:mm' => 02/28/2001 13:01 */
  dateTimeShortUs,

  /** Format: 'MM/DD/YYYY HH:mm:ss' => 02/28/2001 13:01:01 */
  dateTimeUs,

  /** Format: 'MM/DD/YYYY hh:mm:ss a' => 02/28/2001 11:01:01 pm */
  dateTimeUsAmPm,

  /** Format: 'MM/DD/YYYY hh:mm:ss A' => 02/28/2001 11:01:01 PM */
  dateTimeUsAM_PM,

  /** Format: 'M/D/YY H:m:s' => 2/28/14 14:1:2 */
  dateTimeUsShort,

  /** Format: 'M/D/YY h:m:s a' => 2/28/14 1:2:10 pm */
  dateTimeUsShortAmPm,

  /** Format: 'M/D/YY h:m:s A' => 2/28/14 14:1:1 PM */
  dateTimeUsShortAM_PM,

  /** complex object with various properties */
  object,
}
