import { Column } from '../../models';
import { hyperlinkFormatter } from '../hyperlinkFormatter';

describe('the Hyperlink Formatter', () => {
  it('should return empty string when value is not an hyperlink and is empty', () => {
    const result = hyperlinkFormatter(0, 0, '', {} as Column, {});
    expect(result).toBe('');
  });

  it('should return original value when value is not an hyperlink', () => {
    const result = hyperlinkFormatter(0, 0, 'anything', {} as Column, {});
    expect(result).toBe('anything');
  });

  it('should return original value when URL passed through the generic params "hyperlinkUrl" is not a valid hyperlink', () => {
    const hyperlinkUrl1 = '';
    const inputValue = 'Company Name';
    const result1 = hyperlinkFormatter(0, 0, inputValue, { params: { hyperlinkUrl: hyperlinkUrl1 } } as Column, {});
    expect(result1).toBe(inputValue);
  });

  it('should not permit sanitize/remove any bad script code', () => {
    const inputValue = 'http://<script>alert("test")</script>company.com';
    const sanitizedValue = 'http://company.com';
    const result = hyperlinkFormatter(0, 0, inputValue, {} as Column, {});
    expect(result).toBe(`<a href="${sanitizedValue}">${sanitizedValue}</a>`);
  });

  it('should return original value when value is not a valid hyperlink', () => {
    const inputValue1 = 'http:/something.com';
    const inputValue2 = 'https//something.com';
    const inputValue3 = 'ftpp://something.com';

    const result1 = hyperlinkFormatter(0, 0, inputValue1, {} as Column, {});
    const result2 = hyperlinkFormatter(0, 0, inputValue2, {} as Column, {});
    const result3 = hyperlinkFormatter(0, 0, inputValue3, {} as Column, {});

    expect(result1).toBe(inputValue1);
    expect(result2).toBe(inputValue2);
    expect(result3).toBe(inputValue3);
  });

  it('should return an href link when input value is a valid hyperlink', () => {
    const inputValue1 = 'http://something.com';
    const inputValue2 = 'https://something.com';
    const inputValue3 = 'ftp://something.com';

    const result1 = hyperlinkFormatter(0, 0, inputValue1, {} as Column, {});
    const result2 = hyperlinkFormatter(0, 0, inputValue2, {} as Column, {});
    const result3 = hyperlinkFormatter(0, 0, inputValue3, {} as Column, {});


    expect(result1).toBe(`<a href="${inputValue1}">${inputValue1}</a>`);
    expect(result2).toBe(`<a href="${inputValue2}">${inputValue2}</a>`);
    expect(result3).toBe(`<a href="${inputValue3}">${inputValue3}</a>`);
  });

  it('should return an href link with a different text when input value is a valid hyperlink and has the generic params "hyperlinkText" provided', () => {
    const inputValue1 = 'http://something.com';
    const inputValue2 = 'https://something.com';
    const inputValue3 = 'ftp://something.com';
    const linkText = 'Company Website';

    const result1 = hyperlinkFormatter(0, 0, inputValue1, { params: { hyperlinkText: linkText } } as Column, {});
    const result2 = hyperlinkFormatter(0, 0, inputValue2, { params: { hyperlinkText: linkText } } as Column, {});
    const result3 = hyperlinkFormatter(0, 0, inputValue3, { params: { hyperlinkText: linkText } } as Column, {});


    expect(result1).toBe(`<a href="${inputValue1}">${linkText}</a>`);
    expect(result2).toBe(`<a href="${inputValue2}">${linkText}</a>`);
    expect(result3).toBe(`<a href="${inputValue3}">${linkText}</a>`);
  });

  it('should return an href link with a different url than value it is provided as a valid hyperlink through the generic params "hyperlinkUrl"', () => {
    const hyperlinkUrl1 = 'http://something.com';
    const hyperlinkUrl2 = 'https://something.com';
    const hyperlinkUrl3 = 'ftp://something.com';
    const inputValue = 'Company Name';

    const result1 = hyperlinkFormatter(0, 0, inputValue, { params: { hyperlinkUrl: hyperlinkUrl1 } } as Column, {});
    const result2 = hyperlinkFormatter(0, 0, inputValue, { params: { hyperlinkUrl: hyperlinkUrl2 } } as Column, {});
    const result3 = hyperlinkFormatter(0, 0, inputValue, { params: { hyperlinkUrl: hyperlinkUrl3 } } as Column, {});


    expect(result1).toBe(`<a href="${hyperlinkUrl1}">${inputValue}</a>`);
    expect(result2).toBe(`<a href="${hyperlinkUrl2}">${inputValue}</a>`);
    expect(result3).toBe(`<a href="${hyperlinkUrl3}">${inputValue}</a>`);
  });

  it('should return an href link when hyperlink URL & Text are provided through the generic params "hyperlinkUrl" and "hyperlinkText"', () => {
    const hyperlinkUrl1 = 'http://something.com';
    const hyperlinkUrl2 = 'https://something.com';
    const hyperlinkUrl3 = 'ftp://something.com';
    const linkText1 = 'Company ABC';
    const linkText2 = 'Company DEF';
    const linkText3 = 'Company XYZ';
    const inputValue = 'anything';

    const result1 = hyperlinkFormatter(0, 0, inputValue, { params: { hyperlinkUrl: hyperlinkUrl1, hyperlinkText: linkText1 } } as Column, {});
    const result2 = hyperlinkFormatter(0, 0, inputValue, { params: { hyperlinkUrl: hyperlinkUrl2, hyperlinkText: linkText2 } } as Column, {});
    const result3 = hyperlinkFormatter(0, 0, inputValue, { params: { hyperlinkUrl: hyperlinkUrl3, hyperlinkText: linkText3 } } as Column, {}); 3

    expect(result1).toBe(`<a href="${hyperlinkUrl1}">${linkText1}</a>`);
    expect(result2).toBe(`<a href="${hyperlinkUrl2}">${linkText2}</a>`);
    expect(result3).toBe(`<a href="${hyperlinkUrl3}">${linkText3}</a>`);
  });
});
