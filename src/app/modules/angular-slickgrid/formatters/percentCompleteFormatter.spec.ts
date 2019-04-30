import { Column } from '../models';
import { percentCompleteFormatter } from './percentCompleteFormatter';

describe('the Percent Complete Formatter', () => {
  it('should return an empty string when no value is provided', () => {
    const output = percentCompleteFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should return original string when non-numeric value is provided', () => {
    const output = percentCompleteFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('hello');
  });

  it('should display a red color percentage when number 0 is provided', () => {
    const input = 0;
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style='color:red;font-weight:bold;'>${input}%</span>`);
  });

  it('should display a red color percentage when a negative number is provided', () => {
    const input = -15;
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style='color:red;font-weight:bold;'>${input}%</span>`);
  });

  it('should display a green color percentage when a positive number greater or equal to 50 is provided', () => {
    const input = 50;
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style='color:green'>${input}%</span>`);
  });

  it('should display a green color percentage when a positive number greater than 50 and is a type string is provided', () => {
    const input = '99';
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style='color:green'>${input}%</span>`);
  });

  it('should display a green color percentage of 100% when number is greater than 100 is provided', () => {
    const input = 125;
    const output = percentCompleteFormatter(1, 1, input, {} as Column, {});
    expect(output).toBe(`<span style='color:green'>100%</span>`);
  });
});
