import { Column } from '../../models';
import { progressBarFormatter } from '../progressBarFormatter';

describe('the Progress Bar Formatter', () => {
  it('should return an empty string when no value is provided', () => {
    const output = progressBarFormatter(1, 1, '', {} as Column, {});
    expect(output).toBe('');
  });

  it('should return empty string when non-numeric value is provided', () => {
    const output = progressBarFormatter(1, 1, 'hello', {} as Column, {});
    expect(output).toBe('');
  });

  it('should display a red color bar formatter when number 0 is provided', () => {
    const inputValue = 0;
    const barType = 'danger';
    const template = `<div class="progress">
      <div class="progress-bar progress-bar-${barType} bg-${barType}" role="progressbar" aria-valuenow="${inputValue}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${inputValue}%;">
      ${inputValue}%
      </div> </div>`;
    const output = progressBarFormatter(1, 1, inputValue, {} as Column, {});
    expect(output).toBe(template.replace(/\s{2,}/g, ' ').trim());
  });

  it('should display a red color bar when value is a negative number', () => {
    const inputValue = -15;
    const barType = 'danger';
    const template = `<div class="progress">
      <div class="progress-bar progress-bar-${barType} bg-${barType}" role="progressbar" aria-valuenow="${inputValue}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${inputValue}%;">
      ${inputValue}%
      </div> </div>`;
    const output = progressBarFormatter(1, 1, inputValue, {} as Column, {});
    expect(output).toBe(template.replace(/\s{2,}/g, ' ').trim());
  });

  it('should display a red color bar when value is between 30 and 69', () => {
    const inputValue1 = 30;
    const inputValue2 = 69;
    const barType = 'warning';
    const template1 = `<div class="progress">
      <div class="progress-bar progress-bar-${barType} bg-${barType}" role="progressbar" aria-valuenow="${inputValue1}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${inputValue1}%;">
      ${inputValue1}%
      </div> </div>`;

    const template2 = `<div class="progress">
      <div class="progress-bar progress-bar-${barType} bg-${barType}" role="progressbar" aria-valuenow="${inputValue2}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${inputValue2}%;">
      ${inputValue2}%
      </div> </div>`;

    const output1 = progressBarFormatter(1, 1, inputValue1, {} as Column, {});
    const output2 = progressBarFormatter(1, 1, inputValue2, {} as Column, {});

    expect(output1).toBe(template1.replace(/\s{2,}/g, ' ').trim());
    expect(output2).toBe(template2.replace(/\s{2,}/g, ' ').trim());
  });

  it('should display a green color bar when value greater or equal to 70 and is a type string', () => {
    const inputValue = '70';
    const barType = 'success';
    const template = `<div class="progress">
      <div class="progress-bar progress-bar-${barType} bg-${barType}" role="progressbar" aria-valuenow="${inputValue}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${inputValue}%;">
      ${inputValue}%
      </div> </div>`;
    const output = progressBarFormatter(1, 1, inputValue, {} as Column, {});
    expect(output).toBe(template.replace(/\s{2,}/g, ' ').trim());
  });

  it('should display a green color percentage of 100% when number is greater than 100 is provided', () => {
    const inputValue = 125;
    const inputMaxValue = 100;
    const barType = 'success';
    const template = `<div class="progress">
      <div class="progress-bar progress-bar-${barType} bg-${barType}" role="progressbar" aria-valuenow="${inputMaxValue}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${inputMaxValue}%;">
      ${inputMaxValue}%
      </div> </div>`;
    const output = progressBarFormatter(1, 1, inputValue, {} as Column, {});
    expect(output).toBe(template.replace(/\s{2,}/g, ' ').trim());
  });
});
