export function zeroPadding(input: string | number) {
  const number = parseInt(input as string, 10);
  return number < 10 ? `0${number}` : number;
}