import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { translateBooleanFormatter } from '../translateBooleanFormatter';
import { Column } from '../../models';

describe('the Translate Formatter', () => {
  let translate: TranslateService;

  // stub some methods of the SlickGrid Grid instance
  const gridStub = {
    getOptions: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    });
    translate = TestBed.get(TranslateService);
    translate.setTranslation('fr', { TRUE: 'Vrai', FALSE: 'Faux' });
    translate.use('fr');
  });

  it('should return an empty string when null value is passed', () => {
    translate.use('en');
    gridStub.getOptions.mockReturnValueOnce({ i18n: translate });
    const output = translateBooleanFormatter(1, 1, null, {} as Column, {}, gridStub);
    expect(output).toBe('');
  });

  it('should return an empty string when empty string value is passed', () => {
    translate.use('en');
    gridStub.getOptions.mockReturnValueOnce({ i18n: translate });
    const output = translateBooleanFormatter(1, 1, '', {} as Column, {}, gridStub);
    expect(output).toBe('');
  });

  it('should return the translated value when value passed is boolean', () => {
    gridStub.getOptions.mockReturnValueOnce({ i18n: translate });
    const output = translateBooleanFormatter(1, 1, true, {} as Column, {}, gridStub);
    expect(output).toBe('Vrai');
  });

  it('should return the translated value when value passed is a string', () => {
    gridStub.getOptions.mockReturnValueOnce({ i18n: translate });
    const output = translateBooleanFormatter(1, 1, 'TRUE', {} as Column, {}, gridStub);
    expect(output).toBe('Vrai');
  });

  it('should return the translated value when value passed is a string and ngx-translate service is passed as a ColumnDef Params', () => {
    gridStub.getOptions.mockReturnValueOnce({});
    const output = translateBooleanFormatter(1, 1, 'TRUE', { params: { i18n: translate } } as Column, {}, gridStub);
    expect(output).toBe('Vrai');
  });

  it('should return the translated value when value passed is a string and ngx-translate service is passed as a ColumnDef Params without any Grid object', () => {
    const output = translateBooleanFormatter(1, 1, 'TRUE', { params: { i18n: translate } } as Column, {});
    expect(output).toBe('Vrai');
  });

  it('should convert any type of value to string', () => {
    gridStub.getOptions.mockReturnValueOnce({ i18n: translate });
    const output = translateBooleanFormatter(1, 1, 99, {} as Column, {}, gridStub);
    expect(output).toBe('99');
  });

  it('should throw an error when no ngx-translate service is not provided to Column Definition and/or Grid Options', () => {
    gridStub.getOptions.mockReturnValueOnce({});
    expect(() => translateBooleanFormatter(1, 1, null, {} as Column, {}, gridStub)).toThrowError('formatter requires the "ngx-translate" Service to be provided');
  });
});
