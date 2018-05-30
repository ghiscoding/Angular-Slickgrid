export enum FieldType {
  unknown,
  string,
  boolean,
  integer,
  float,

  /** number includes Integer and Float */
  number,

  /** new Date(), javascript Date object */
  date,

  /** Format: 'YYYY-MM-DD' => 2001-01-01 */
  dateIso,

  /** Format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' => 2001-01-01T14:00:00.123Z */
  dateUtc,

  /** new Date(), javacript Date Object with Time */
  dateTime,

  /** Format: 'YYYY-MM-DD HH:mm:ss' => 2001-01-01 14:01:01 */
  dateTimeIso,

  /** Format: 'YYYY-MM-DD h:mm:ss a' => 2001-01-01 11:01:01 pm */
  dateTimeIsoAmPm,

  /** Format: 'YYYY-MM-DD h:mm:ss A' => 2001-01-01 11:01:01 PM */
  dateTimeIsoAM_PM,

  /** Format: 'MM/DD/YYYY' => 02/28/2001 */
  dateUs,

  /** Format: 'M/D/YY' => 2/28/12 */
  dateUsShort,

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
  dateTimeUsShortAM_PM
}
