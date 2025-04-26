export function randomNumber(min: number, max: number, floor = true) {
  const number = Math.random() * (max - min + 1) + min;
  return floor ? Math.floor(number) : number;
}

export function zeroPadding(input: string | number) {
  const number = parseInt(input as string, 10);
  return number < 10 ? `0${number}` : number;
}
