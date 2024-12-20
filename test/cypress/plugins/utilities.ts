export function changeTimezone(date: Date, tz: string) {
  // suppose the date is 12:00 UTC
  const invdate = new Date(
    date.toLocaleString('en-US', {
      timeZone: tz,
    })
  );

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  const diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() + diff);
}

export function removeExtraSpaces(text: string) {
  return `${text}`.replace(/\s+/g, ' ').trim();
}

export function removeWhitespaces(text: string) {
  return `${text}`.replace(/\s+/g, '');
}

export function zeroPadding(input: string | number) {
  const number = parseInt(input as string, 10);
  return number < 10 ? `0${number}` : number;
}
