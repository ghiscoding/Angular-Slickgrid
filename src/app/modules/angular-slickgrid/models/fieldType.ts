export enum FieldType {
  unknown,
  string,
  boolean,
  number,
  date,             // new Date()
  dateIso,          // 2001-01-01
  dateUtc,          // 2001-01-01T11:00:00Z
  dateTime,         // new Date()
  dateTimeIso,      // 2001-01-01 11:00:00
  dateUs,           // 2/2/2002
  dateUsShort,      // 1/20/14
  dateTimeUs,       // 12/22/2002 11:00:00
  dateTimeUsShort   // 2/2/14 11:00:00
}
