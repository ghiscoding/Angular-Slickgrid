import { Column } from '../../models';
import { deleteIconFormatter } from '../deleteIconFormatter';

describe('the Delete Icon Formatter', () => {
  it('should always return the Font Awesome Trash icon even when False is provided', () => {
    const value = false;
    const result = deleteIconFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('<i class="fa fa-trash pointer delete-icon" aria-hidden="true"></i>');
  });

  it('should return the Font Awesome Trash icon when input is filled with any string', () => {
    const value = 'anything';
    const result = deleteIconFormatter(0, 0, value, {} as Column, {});
    expect(result).toBe('<i class="fa fa-trash pointer delete-icon" aria-hidden="true"></i>');
  });
});
