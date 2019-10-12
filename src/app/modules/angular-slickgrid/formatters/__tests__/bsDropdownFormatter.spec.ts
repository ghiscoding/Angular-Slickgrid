import { Column } from '../../models';
import { bsDropdownFormatter } from '../bsDropdownFormatter';

describe('the Bootstrap dropdown Formatter', () => {
  it('should throw an error when omitting to pass "propertyNames" to "params"', () => {
    expect(() => bsDropdownFormatter(0, 0, 'anything', {} as Column, {}))
      .toThrowError('You must provide the "label" or "formatterLabel" via the generic "params"');
  });

  it('should always return a dropdown template with the label provided in the "label" property from "params"', () => {
    const input = null;
    const label = 'Action';
    const row = 0;
    const cell = 0;
    const result = bsDropdownFormatter(row, cell, input, { field: 'user', params: { label } } as Column, {});

    expect(result).toBe(`<div id="myDrop-r${row}-c${cell}" class="dropdown pointer">
    <a class="dropdown-toggle">
      ${label}
      <span class="caret"></span>
    </a>
  </div>`);

  });

  it('should always return a a dropdown template with the label provided in the "formatterLabel" property from "params"', () => {
    const input = null;
    const label = 'Action';
    const row = 0;
    const cell = 0;
    const result = bsDropdownFormatter(row, cell, input, { field: 'user', params: { label } } as Column, {});

    expect(result).toBe(`<div id="myDrop-r${row}-c${cell}" class="dropdown pointer">
    <a class="dropdown-toggle">
      ${label}
      <span class="caret"></span>
    </a>
  </div>`);

  });
});
