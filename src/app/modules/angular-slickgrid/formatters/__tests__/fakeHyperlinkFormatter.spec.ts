import { fakeHyperlinkFormatter } from '../fakeHyperlinkFormatter';

describe('the Edit Icon Formatter', () => {
  it('should return a span with the "fake-hyperlink" class when a value is provided', () => {
    const value = 'Custom Value';
    const result = fakeHyperlinkFormatter(0, 0, value);
    expect(result).toBe('<span class="fake-hyperlink">Custom Value</span>');
  });

  it('should return an empty string formatter when no value is provided', () => {
    const value = null;
    const result = fakeHyperlinkFormatter(0, 0, value);
    expect(result).toBe('');
  });
});
