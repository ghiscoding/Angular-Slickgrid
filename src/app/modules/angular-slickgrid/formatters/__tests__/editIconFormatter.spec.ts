import { Column } from '../../models';
import { editIconFormatter } from '../editIconFormatter';

describe('the Edit Icon Formatter', () => {
  it('should always return the Font Awesome Pencil icon even when False is provided', () => {
    const value = false;
    const result = editIconFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('<i class="fa fa-pencil pointer edit-icon" aria-hidden="true"></i>');
  });

  it('should return the Font Awesome Pencil icon when input is filled with any string', () => {
    const value = 'anything';
    const result = editIconFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('<i class="fa fa-pencil pointer edit-icon" aria-hidden="true"></i>');
  });
});
