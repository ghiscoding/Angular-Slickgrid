export function changeTimezone(date, tz) {
  // suppose the date is 12:00 UTC
  var invdate = new Date(date.toLocaleString('en-US', {
    timeZone: tz
  }));

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  var diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() + diff);
};

export function zeroPadding(input) {
  let number = parseInt(input, 10);
  return number < 10 ? `0${number}` : number;
}
