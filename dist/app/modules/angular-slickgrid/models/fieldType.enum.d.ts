export declare enum FieldType {
    unknown = 0,
    string = 1,
    boolean = 2,
    integer = 3,
    float = 4,
    /** number includes Integer and Float */
    number = 5,
    /** new Date(), javascript Date object */
    date = 6,
    /** Format: 'YYYY-MM-DD' => 2001-01-01 */
    dateIso = 7,
    /** Format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' => 2001-01-01T14:00:00.123Z */
    dateUtc = 8,
    /** new Date(), javacript Date Object with Time */
    dateTime = 9,
    /** Format: 'YYYY-MM-DD HH:mm:ss' => 2001-01-01 14:01:01 */
    dateTimeIso = 10,
    /** Format: 'YYYY-MM-DD h:mm:ss a' => 2001-01-01 11:01:01 pm */
    dateTimeIsoAmPm = 11,
    /** Format: 'YYYY-MM-DD h:mm:ss A' => 2001-01-01 11:01:01 PM */
    dateTimeIsoAM_PM = 12,
    /** Format: 'YYYY-MM-DD HH:mm' => 2001-01-01 14:01 */
    dateTimeShortIso = 13,
    /** Format: 'MM/DD/YYYY' => 02/28/2001 */
    dateUs = 14,
    /** Format: 'M/D/YY' => 2/28/12 */
    dateUsShort = 15,
    /** Format: 'MM/DD/YYYY HH:mm' => 02/28/2001 13:01 */
    dateTimeShortUs = 16,
    /** Format: 'MM/DD/YYYY HH:mm:ss' => 02/28/2001 13:01:01 */
    dateTimeUs = 17,
    /** Format: 'MM/DD/YYYY hh:mm:ss a' => 02/28/2001 11:01:01 pm */
    dateTimeUsAmPm = 18,
    /** Format: 'MM/DD/YYYY hh:mm:ss A' => 02/28/2001 11:01:01 PM */
    dateTimeUsAM_PM = 19,
    /** Format: 'M/D/YY H:m:s' => 2/28/14 14:1:2 */
    dateTimeUsShort = 20,
    /** Format: 'M/D/YY h:m:s a' => 2/28/14 1:2:10 pm */
    dateTimeUsShortAmPm = 21,
    /** Format: 'M/D/YY h:m:s A' => 2/28/14 14:1:1 PM */
    dateTimeUsShortAM_PM = 22,
}
