import { Column } from '../../models/column.interface';
import { alignRightFormatter } from '../alignRightFormatter';

describe('Right Alignment Formatter', () => {
  it('should return an empty string when no value is passed', () => {
    const output = alignRightFormatter(1, 1, '', {} as Column, {}, {});
    expect(output).toBe('<div style="float: right"></div>');
  });

  it('should return an empty string when value is null or undefined', () => {
    const output1 = alignRightFormatter(1, 1, null, {} as Column, {}, {});
    const output2 = alignRightFormatter(1, 1, undefined, {} as Column, {}, {});

    expect(output1).toBe('<div style="float: right"></div>');
    expect(output2).toBe('<div style="float: right"></div>');
  });

  it('should return a string all in uppercase', () => {
    const output = alignRightFormatter(1, 1, 'hello', {} as Column, {}, {});
    expect(output).toBe('<div style="float: right">hello</div>');
  });

  it('should return a number as a string', () => {
    const output = alignRightFormatter(1, 1, 99, {} as Column, {}, {});
    expect(output).toBe('<div style="float: right">99</div>');
  });

  it('should return a boolean as a string all in uppercase', () => {
    const output = alignRightFormatter(1, 1, false, {} as Column, {}, {});
    expect(output).toBe('<div style="float: right">false</div>');
  });
});
